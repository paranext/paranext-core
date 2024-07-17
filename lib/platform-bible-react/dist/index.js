import Os, { jsxs as X, jsx as d, Fragment as Jn } from "react/jsx-runtime";
import * as T from "react";
import Z, { forwardRef as zi, useCallback as $e, useState as de, useRef as wt, useEffect as qe, useLayoutEffect as jo, useMemo as Wr } from "react";
import { getChaptersForBook as Ss, split as Cs } from "platform-bible-utils";
import * as he from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Ps } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Rs, Check as Ui, Circle as $s, History as Is, ArrowDownWideNarrow as Ms, Clock as _s, Bookmark as As, ChevronDown as Hi, ChevronUp as Ds, ArrowLeftIcon as js, ChevronLeftIcon as Bs, ChevronRightIcon as Ls, ArrowRightIcon as Vs, FilterIcon as Fs, ArrowUpIcon as zs, ArrowDownIcon as Us, ArrowUpDownIcon as Hs, CircleCheckIcon as Bo, CircleXIcon as Lo, CircleHelpIcon as Vo } from "lucide-react";
import Ne, { clsx as Ws } from "clsx";
import { extendTailwindMerge as Xs } from "tailwind-merge";
import { useReactTable as qs, getCoreRowModel as Ys, getPaginationRowModel as Gs, getSortedRowModel as Ks, getFilteredRowModel as Js, flexRender as Fo } from "@tanstack/react-table";
import { Slot as Zs } from "@radix-ui/react-slot";
import { cva as Xr } from "class-variance-authority";
import * as ye from "@radix-ui/react-select";
import { Autocomplete as Qs, TextField as el, FormControlLabel as zo, FormLabel as tl, Checkbox as nl, MenuItem as rl, ListItemText as ol, ListItemIcon as Wi, Menu as il, Grid as Xi, List as al, IconButton as qi, Drawer as sl, Slider as ll, Snackbar as cl, Switch as pl, AppBar as ul, Toolbar as dl } from "@mui/material";
import fl, { ThemeContext as ml, internal_processStyles as hl } from "@mui/styled-engine";
import * as gl from "react-dom";
import Pn from "react-dom";
import * as Yi from "@radix-ui/react-label";
import * as _e from "@radix-ui/react-tabs";
import * as rn from "@radix-ui/react-slider";
import * as Rr from "@radix-ui/react-switch";
var bl = Object.defineProperty, vl = (e, t, n) => t in e ? bl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oe = (e, t, n) => vl(e, typeof t != "symbol" ? t + "" : t, n);
const Et = [
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
], qr = [
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
], Gi = [
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
], Uo = Cl();
function Ht(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Uo ? Uo[e] : 0;
}
function Yr(e) {
  return Ht(e) > 0;
}
function yl(e) {
  const t = typeof e == "string" ? Ht(e) : e;
  return t >= 40 && t <= 66;
}
function wl(e) {
  return (typeof e == "string" ? Ht(e) : e) <= 39;
}
function Ki(e) {
  return e <= 66;
}
function xl(e) {
  const t = typeof e == "string" ? Ht(e) : e;
  return Qi(t) && !Ki(t);
}
function* El() {
  for (let e = 1; e <= Et.length; e++)
    yield e;
}
const Tl = 1, Ji = Et.length;
function kl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Gr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Et.length ? t : Et[n];
}
function Zi(e) {
  return e <= 0 || e > Ji ? "******" : Gi[e - 1];
}
function Nl(e) {
  return Zi(Ht(e));
}
function Qi(e) {
  const t = typeof e == "number" ? Gr(e) : e;
  return Yr(t) && !qr.includes(t);
}
function Ol(e) {
  const t = typeof e == "number" ? Gr(e) : e;
  return Yr(t) && qr.includes(t);
}
function Sl(e) {
  return Gi[e - 1].includes("*obsolete*");
}
function Cl() {
  const e = {};
  for (let t = 0; t < Et.length; t++)
    e[Et[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: Et,
  nonCanonicalIds: qr,
  bookIdToNumber: Ht,
  isBookIdValid: Yr,
  isBookNT: yl,
  isBookOT: wl,
  isBookOTNT: Ki,
  isBookDC: xl,
  allBookNumbers: El,
  firstBook: Tl,
  lastBook: Ji,
  extraBooks: kl,
  bookNumberToId: Gr,
  bookNumberToEnglishName: Zi,
  bookIdToEnglishName: Nl,
  isCanonical: Qi,
  isExtraMaterial: Ol,
  isObsolete: Sl
};
var Ye = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ye || {});
const je = class {
  // private versInfo: Versification;
  constructor(t) {
    if (oe(this, "name"), oe(this, "fullPath"), oe(this, "isPresent"), oe(this, "hasVerseSegments"), oe(this, "isCustomized"), oe(this, "baseVersification"), oe(this, "scriptureBooks"), oe(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Ye[t]) : (this._type = t, this.name = Ye[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
oe(je, "Original", new je(Ye.Original)), oe(je, "Septuagint", new je(Ye.Septuagint)), oe(je, "Vulgate", new je(Ye.Vulgate)), oe(je, "English", new je(Ye.English)), oe(je, "RussianProtestant", new je(Ye.RussianProtestant)), oe(je, "RussianOrthodox", new je(Ye.RussianOrthodox));
let gt = je;
function Ho(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var ea = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(ea || {});
const Re = class se {
  constructor(t, n, r, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof gt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof gt ? n : void 0;
        this.setEmpty(i), this._verseNum = t % se.chapterDigitShifter, this._chapterNum = Math.floor(
          t % se.bookDigitShifter / se.chapterDigitShifter
        ), this._bookNum = Math.floor(t / se.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof se) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null)
            return;
          const i = t instanceof gt ? t : se.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? se.defaultVersification;
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
      return n = new se(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Jt)
        return n = new se(), { success: !1, verseRef: n };
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
    return t % se.bcvMaxValue * se.bookDigitShifter + (n >= 0 ? n % se.bcvMaxValue * se.chapterDigitShifter : 0) + (r >= 0 ? r % se.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: o, verse: i, versificationStr: s } = t, l = i || o.toString();
    let c;
    return s && (c = new gt(s)), n ? new se(n, r.toString(), l, c) : new se();
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
      if (n = n * 10 + +r - 0, n > se.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(se.verseRangeSeparator) || this._verse.includes(se.verseSequenceIndicator));
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
    const { success: n, vNum: r } = se.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = se.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > me.lastBook)
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
    this.versification = this.versification != null ? new gt(t) : void 0;
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
    return this.validateVerse(se.verseRangeSeparators, se.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return se.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return se.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
      const i = t.split("/");
      if (t = i[0], i.length > 1)
        try {
          const s = +i[1].trim();
          this.versification = new gt(Ye[s]);
        } catch {
          throw new Jt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Jt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || me.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !se.isVerseParseable(r[1]))
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
    return new se(this);
  }
  toString() {
    const t = this.book;
    return t === "" ? "" : `${t} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let t = this.verse;
    return (t === "" || t === this.verseNum.toString()) && (t = void 0), {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: t,
      versificationStr: this.versificationStr
    };
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(t) {
    return t instanceof se ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, n = se.verseRangeSeparators, r = se.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = Ho(this._verse, r);
    for (const s of i.map((l) => Ho(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const p = this.clone();
        if (p.verse = s[1], !t)
          for (let u = c + 1; u < p.verseNum; u++) {
            const m = new se(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || o.push(m);
          }
        o.push(p);
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
      const i = o.internalValid;
      if (i !== 0)
        return i;
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > me.lastBook ? 2 : (me.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = se.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = me.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
oe(Re, "defaultVersification", gt.English), oe(Re, "verseRangeSeparator", "-"), oe(Re, "verseSequenceIndicator", ","), oe(Re, "verseRangeSeparators", [Re.verseRangeSeparator]), oe(Re, "verseSequenceIndicators", [Re.verseSequenceIndicator]), oe(Re, "chapterDigitShifter", 1e3), oe(Re, "bookDigitShifter", Re.chapterDigitShifter * Re.chapterDigitShifter), oe(Re, "bcvMaxValue", Re.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(Re, "ValidStatusType", ea);
class Jt extends Error {
}
const Pl = Xs({ prefix: "pr-" });
function K(...e) {
  return Pl(Ws(e));
}
const ta = he.Root, Rl = he.Trigger, Hh = he.Group, Wh = he.Portal, Xh = he.Sub, qh = he.RadioGroup, $l = Z.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ X(
  he.SubTrigger,
  {
    ref: o,
    className: K(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ d(Rs, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
$l.displayName = he.SubTrigger.displayName;
const Il = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  he.SubContent,
  {
    ref: n,
    className: K(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Il.displayName = he.SubContent.displayName;
const Kr = Z.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ d(he.Portal, { children: /* @__PURE__ */ d(
  he.Content,
  {
    ref: r,
    sideOffset: t,
    className: K(
      /* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Kr.displayName = he.Content.displayName;
const na = Z.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ d(
  he.Item,
  {
    ref: r,
    className: K(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
na.displayName = he.Item.displayName;
const ra = Z.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ X(
  he.CheckboxItem,
  {
    ref: o,
    className: K(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(he.ItemIndicator, { children: /* @__PURE__ */ d(Ui, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
ra.displayName = he.CheckboxItem.displayName;
const Ml = Z.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ X(
  he.RadioItem,
  {
    ref: r,
    className: K(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(he.ItemIndicator, { children: /* @__PURE__ */ d($s, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Ml.displayName = he.RadioItem.displayName;
const Zn = Z.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ d(
  he.Label,
  {
    ref: r,
    className: K("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
Zn.displayName = he.Label.displayName;
const Jr = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  he.Separator,
  {
    ref: n,
    className: K("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Jr.displayName = he.Separator.displayName;
function _l({ className: e, ...t }) {
  return /* @__PURE__ */ d(
    "span",
    {
      className: K("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
_l.displayName = "DropdownMenuShortcut";
const Qn = Z.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ d(
    "input",
    {
      type: t,
      className: K(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Qn.displayName = "Input";
const Al = zi(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ X("div", { className: "pr-relative", children: [
    /* @__PURE__ */ d(
      Qn,
      {
        ...o,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",
        onChange: (s) => e(s.target.value),
        onKeyDown: (s) => {
          s.key === "Enter" && r(), t(s);
        },
        onClick: n,
        ref: i
      }
    ),
    /* @__PURE__ */ d(
      Is,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function Dl({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (l, c) => c + 1), s = $e(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ d("div", { className: K("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((l) => /* @__PURE__ */ d(
    "div",
    {
      className: K(
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
      onMouseMove: () => s(l),
      children: l
    },
    l
  )) });
}
const jl = zi(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, l) => /* @__PURE__ */ X(
    na,
    {
      ref: l,
      textValue: e,
      className: K("pr-font-normal pr-text-slate-700", {
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
        /* @__PURE__ */ d(
          "span",
          {
            className: K(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": i.toLowerCase() === "ot",
                "pr-border-l-purple-200": i.toLowerCase() === "nt",
                "pr-border-l-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: me.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ d("div", { children: s })
      ]
    },
    e
  )
);
function Bl({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ X(Zn, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ d("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ X("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ d(
        Ms,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ d(
        _s,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ d(
        As,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const ln = me.allBookIds, Ll = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Wo = ["OT", "NT", "DC"], Vl = 32 + 32 + 32, Fl = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], zl = (e) => ({
  OT: ln.filter((n) => me.isBookOT(n)),
  NT: ln.filter((n) => me.isBookNT(n)),
  DC: ln.filter((n) => me.isBookDC(n))
})[e], Zt = (e) => Ss(me.bookIdToNumber(e));
function Ul() {
  return ln.map((t) => me.bookIdToEnglishName(t));
}
function Hl(e) {
  return Ul().includes(e);
}
function Wl(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Hl(t))
    return ln.find((r) => me.bookIdToEnglishName(r) === t);
}
function Yh({ scrRef: e, handleSubmit: t }) {
  const [n, r] = de(""), [o, i] = de(
    me.bookNumberToId(e.bookNum)
  ), [s, l] = de(e.chapterNum ?? 0), [c, p] = de(
    me.bookNumberToId(e.bookNum)
  ), [u, m] = de(!1), [f, b] = de(u), y = wt(void 0), v = wt(void 0), h = wt(void 0), E = $e(
    (S) => zl(S).filter((I) => {
      const R = me.bookIdToEnglishName(I).toLowerCase(), L = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return R.includes(L) || // Match book name
      I.toLowerCase().includes(L);
    }),
    [n]
  ), M = (S) => {
    r(S);
  }, w = wt(!1), x = $e((S) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    m(S);
  }, []), g = $e(
    (S, I, R, L) => {
      if (l(
        me.bookNumberToId(e.bookNum) !== S ? 1 : e.chapterNum
      ), I || Zt(S) === -1) {
        t({
          bookNum: me.bookIdToNumber(S),
          chapterNum: R || 1,
          verseNum: L || 1
        }), m(!1), r("");
        return;
      }
      i(o !== S ? S : ""), m(!I);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), O = (S) => {
    S <= 0 || S > Zt(o) || g(o, !0, S);
  }, C = $e(() => {
    Fl.forEach((S) => {
      const I = n.match(S);
      if (I) {
        const [R, L = void 0, z = void 0] = I.slice(1), $ = Wl(R);
        (me.isBookIdValid(R) || $) && g(
          $ ?? R,
          !0,
          L ? parseInt(L, 10) : 1,
          z ? parseInt(z, 10) : 1
        );
      }
    });
  }, [g, n]), V = $e(
    (S) => {
      u ? (S.key === "ArrowDown" || S.key === "ArrowUp") && (typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null ? h.current.focus() : typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null && v.current.focus(), S.preventDefault()) : m(!0);
    },
    [u]
  ), j = (S) => {
    const { key: I } = S;
    I === "ArrowRight" || I === "ArrowLeft" || I === "ArrowDown" || I === "ArrowUp" || I === "Enter" || (y.current.dispatchEvent(new KeyboardEvent("keydown", { key: I })), y.current.focus());
  }, F = (S) => {
    const { key: I } = S;
    if (c === o) {
      if (I === "Enter") {
        S.preventDefault(), g(o, !0, s);
        return;
      }
      let R = 0;
      if (I === "ArrowRight")
        if (s < Zt(c))
          R = 1;
        else {
          S.preventDefault();
          return;
        }
      else if (I === "ArrowLeft")
        if (s > 1)
          R = -1;
        else {
          S.preventDefault();
          return;
        }
      else
        I === "ArrowDown" ? R = 6 : I === "ArrowUp" && (R = -6);
      s + R <= 0 || s + R > Zt(c) ? l(0) : R !== 0 && (l(s + R), S.preventDefault());
    }
  };
  return qe(() => {
    o === c ? o === me.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), jo(() => {
    b(u);
  }, [u]), jo(() => {
    const S = setTimeout(() => {
      if (f && v.current && h.current) {
        const R = h.current.offsetTop - Vl;
        v.current.scrollTo({ top: R, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(S);
    };
  }, [f]), /* @__PURE__ */ d("div", { className: "pr-flex", children: /* @__PURE__ */ X(ta, { modal: !1, open: u, onOpenChange: x, children: [
    /* @__PURE__ */ d(Rl, { asChild: !0, children: /* @__PURE__ */ d(
      Al,
      {
        ref: y,
        value: n,
        handleSearch: M,
        handleKeyDown: V,
        handleOnClick: () => {
          i(me.bookNumberToId(e.bookNum)), p(me.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), m(!0), y.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: C,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ X(
      Kr,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: j,
        align: "start",
        ref: v,
        children: [
          /* @__PURE__ */ d(
            Bl,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          Wo.map(
            (S, I) => E(S).length > 0 && /* @__PURE__ */ X("div", { children: [
              /* @__PURE__ */ d(Zn, { className: "pr-font-semibold pr-text-slate-700", children: Ll[S] }),
              E(S).map((R) => /* @__PURE__ */ d("div", { children: /* @__PURE__ */ d(
                jl,
                {
                  bookId: R,
                  handleSelectBook: () => g(R, !1),
                  isSelected: o === R,
                  handleHighlightBook: () => p(R),
                  handleKeyDown: F,
                  bookType: S,
                  ref: (L) => {
                    o === R && (h.current = L);
                  },
                  children: /* @__PURE__ */ d(
                    Dl,
                    {
                      handleSelectChapter: O,
                      endChapter: Zt(R),
                      activeChapter: e.bookNum === me.bookIdToNumber(R) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (L) => {
                        l(L);
                      }
                    }
                  )
                }
              ) }, R)),
              Wo.length - 1 !== I ? /* @__PURE__ */ d(Jr, {}) : void 0
            ] }, S)
          )
        ]
      }
    )
  ] }) });
}
const Zr = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ d(
    "table",
    {
      ref: n,
      className: K("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
Zr.displayName = "Table";
const Qr = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("thead", { ref: n, className: K("[&_tr]:pr-border-b", e), ...t }));
Qr.displayName = "TableHeader";
const eo = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("tbody", { ref: n, className: K("[&_tr:last-child]:pr-border-0", e), ...t }));
eo.displayName = "TableBody";
const Xl = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  "tfoot",
  {
    ref: n,
    className: K("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Xl.displayName = "TableFooter";
const Dt = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d(
    "tr",
    {
      ref: n,
      className: K(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
Dt.displayName = "TableRow";
const Vn = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  "th",
  {
    ref: n,
    className: K(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
Vn.displayName = "TableHead";
const fn = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  "td",
  {
    ref: n,
    className: K("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
fn.displayName = "TableCell";
const ql = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  "caption",
  {
    ref: n,
    className: K("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
ql.displayName = "TableCaption";
const Yl = Xr(
  "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",
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
), ke = Z.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ d(r ? Zs : "button", { className: K(Yl({ variant: t, size: n, className: e })), ref: i, ...o })
);
ke.displayName = "Button";
const $r = ye.Root, Gh = ye.Group, Ir = ye.Value, Fn = Z.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ X(
  ye.Trigger,
  {
    ref: r,
    className: K(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ d(ye.Icon, { asChild: !0, children: /* @__PURE__ */ d(Hi, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Fn.displayName = ye.Trigger.displayName;
const oa = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  ye.ScrollUpButton,
  {
    ref: n,
    className: K("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ d(Ds, { className: "pr-h-4 pr-w-4" })
  }
));
oa.displayName = ye.ScrollUpButton.displayName;
const ia = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  ye.ScrollDownButton,
  {
    ref: n,
    className: K("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ d(Hi, { className: "pr-h-4 pr-w-4" })
  }
));
ia.displayName = ye.ScrollDownButton.displayName;
const zn = Z.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ d(ye.Portal, { children: /* @__PURE__ */ X(
  ye.Content,
  {
    ref: o,
    className: K(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ d(oa, {}),
      /* @__PURE__ */ d(
        ye.Viewport,
        {
          className: K(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ d(ia, {})
    ]
  }
) }));
zn.displayName = ye.Content.displayName;
const Gl = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  ye.Label,
  {
    ref: n,
    className: K("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Gl.displayName = ye.Label.displayName;
const nt = Z.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ X(
  ye.Item,
  {
    ref: r,
    className: K(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(ye.ItemIndicator, { children: /* @__PURE__ */ d(Ui, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ d(ye.ItemText, { children: t })
    ]
  }
));
nt.displayName = ye.Item.displayName;
const Kl = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  ye.Separator,
  {
    ref: n,
    className: K("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Kl.displayName = ye.Separator.displayName;
function Jl({ table: e }) {
  return /* @__PURE__ */ d("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ X("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ X("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ X("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ d("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ X(
        $r,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ d(Fn, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ d(Ir, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ d(zn, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ d(nt, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ X("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ X("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ X(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ d(js, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ X(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ d(Bs, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ X(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ d(Ls, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ X(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ d(Vs, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function Zl({ table: e }) {
  return /* @__PURE__ */ X(ta, { children: [
    /* @__PURE__ */ d(Ps, { asChild: !0, children: /* @__PURE__ */ X(ke, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ d(Fs, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ X(Kr, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ d(Zn, { children: "Toggle columns" }),
      /* @__PURE__ */ d(Jr, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ d(
        ra,
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
function Ql({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var v;
  const [s, l] = de([]), [c, p] = de([]), [u, m] = de({}), [f, b] = de({}), y = qs({
    data: t,
    columns: e,
    getCoreRowModel: Ys(),
    ...n && { getPaginationRowModel: Gs() },
    onSortingChange: l,
    getSortedRowModel: Ks(),
    onColumnFiltersChange: p,
    getFilteredRowModel: Js(),
    onColumnVisibilityChange: m,
    onRowSelectionChange: b,
    state: {
      sorting: s,
      columnFilters: c,
      columnVisibility: u,
      rowSelection: f
    }
  });
  return /* @__PURE__ */ X("div", { children: [
    o && /* @__PURE__ */ d(Zl, { table: y }),
    /* @__PURE__ */ d("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ X(Zr, { children: [
      /* @__PURE__ */ d(Qr, { children: y.getHeaderGroups().map((h) => /* @__PURE__ */ d(Dt, { children: h.headers.map((E) => /* @__PURE__ */ d(Vn, { children: E.isPlaceholder ? void 0 : Fo(E.column.columnDef.header, E.getContext()) }, E.id)) }, h.id)) }),
      /* @__PURE__ */ d(eo, { children: (v = y.getRowModel().rows) != null && v.length ? y.getRowModel().rows.map((h) => /* @__PURE__ */ d(
        Dt,
        {
          onClick: () => i(h, y),
          "data-state": h.getIsSelected() && "selected",
          children: h.getVisibleCells().map((E) => /* @__PURE__ */ d(fn, { children: Fo(E.column.columnDef.cell, E.getContext()) }, E.id))
        },
        h.id
      )) : /* @__PURE__ */ d(Dt, { children: /* @__PURE__ */ d(fn, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    n && /* @__PURE__ */ X("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ d(
        ke,
        {
          variant: "outline",
          size: "sm",
          onClick: () => y.previousPage(),
          disabled: !y.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ d(
        ke,
        {
          variant: "outline",
          size: "sm",
          onClick: () => y.nextPage(),
          disabled: !y.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ d(Jl, { table: y })
  ] });
}
function Xo({
  id: e,
  title: t,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: s,
  options: l = [],
  className: c,
  value: p,
  onChange: u,
  onFocus: m,
  onBlur: f,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ d(
    Qs,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: p,
      onChange: u,
      onFocus: m,
      onBlur: f,
      getOptionLabel: b,
      renderInput: (y) => /* @__PURE__ */ d(
        el,
        {
          ...y,
          error: o,
          fullWidth: i,
          disabled: n,
          label: t,
          style: { width: s }
        }
      )
    }
  );
}
function Kh({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, i] = de(1), [s, l] = de(r), [c, p] = de(
    Array.from({ length: r }, (f, b) => b + 1)
  );
  qe(() => {
    i(1), e(1), l(r), t(r), p(Array.from({ length: r }, (f, b) => b + 1));
  }, [r, t, e]);
  const u = (f, b) => {
    i(b), e(b), b > s && (l(b), t(b));
  }, m = (f, b) => {
    l(b), t(b), b < o && (i(b), e(b));
  };
  return /* @__PURE__ */ X(Jn, { children: [
    /* @__PURE__ */ d(
      zo,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ d(
          Xo,
          {
            onChange: (f, b) => u(f, b),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (f) => f.toString(),
            value: o,
            isDisabled: n
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ d(
      zo,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ d(
          Xo,
          {
            onChange: (f, b) => m(f, b),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (f) => f.toString(),
            value: s,
            isDisabled: n
          },
          "end chapter"
        ),
        label: "to",
        labelPlacement: "start"
      }
    )
  ] });
}
var _t = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(_t || {});
function ec({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = _t.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: l = !1,
  className: c,
  onChange: p
}) {
  const u = /* @__PURE__ */ d(
    nl,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: i,
      disabled: s,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: p
    }
  );
  let m;
  if (n) {
    const f = r === _t.Before || r === _t.Above, b = /* @__PURE__ */ d("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), y = r === _t.Before || r === _t.After, v = y ? b : /* @__PURE__ */ d("div", { children: b }), h = y ? u : /* @__PURE__ */ d("div", { children: u });
    m = /* @__PURE__ */ X(
      tl,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: l,
        children: [
          f && v,
          h,
          !f && v
        ]
      }
    );
  } else
    m = u;
  return m;
}
function Jh({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s
}) {
  return /* @__PURE__ */ X("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ d("legend", { children: n }),
    r.map((l) => /* @__PURE__ */ d(
      ec,
      {
        className: "check-item",
        isChecked: o.includes(l),
        labelText: s ? s(l) : l,
        onChange: () => i(l)
      },
      l
    ))
  ] });
}
function fe(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function k() {
  return k = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, k.apply(this, arguments);
}
function tc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function nc(e) {
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
var Mr = { exports: {} }, Rn = { exports: {} }, le = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qo;
function rc() {
  if (qo)
    return le;
  qo = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, m = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, M = e ? Symbol.for("react.scope") : 60119;
  function w(g) {
    if (typeof g == "object" && g !== null) {
      var O = g.$$typeof;
      switch (O) {
        case t:
          switch (g = g.type, g) {
            case c:
            case p:
            case r:
            case i:
            case o:
            case m:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case l:
                case u:
                case y:
                case b:
                case s:
                  return g;
                default:
                  return O;
              }
          }
        case n:
          return O;
      }
    }
  }
  function x(g) {
    return w(g) === p;
  }
  return le.AsyncMode = c, le.ConcurrentMode = p, le.ContextConsumer = l, le.ContextProvider = s, le.Element = t, le.ForwardRef = u, le.Fragment = r, le.Lazy = y, le.Memo = b, le.Portal = n, le.Profiler = i, le.StrictMode = o, le.Suspense = m, le.isAsyncMode = function(g) {
    return x(g) || w(g) === c;
  }, le.isConcurrentMode = x, le.isContextConsumer = function(g) {
    return w(g) === l;
  }, le.isContextProvider = function(g) {
    return w(g) === s;
  }, le.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === t;
  }, le.isForwardRef = function(g) {
    return w(g) === u;
  }, le.isFragment = function(g) {
    return w(g) === r;
  }, le.isLazy = function(g) {
    return w(g) === y;
  }, le.isMemo = function(g) {
    return w(g) === b;
  }, le.isPortal = function(g) {
    return w(g) === n;
  }, le.isProfiler = function(g) {
    return w(g) === i;
  }, le.isStrictMode = function(g) {
    return w(g) === o;
  }, le.isSuspense = function(g) {
    return w(g) === m;
  }, le.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === r || g === p || g === i || g === o || g === m || g === f || typeof g == "object" && g !== null && (g.$$typeof === y || g.$$typeof === b || g.$$typeof === s || g.$$typeof === l || g.$$typeof === u || g.$$typeof === h || g.$$typeof === E || g.$$typeof === M || g.$$typeof === v);
  }, le.typeOf = w, le;
}
var ce = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yo;
function oc() {
  return Yo || (Yo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, m = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, M = e ? Symbol.for("react.scope") : 60119;
    function w(A) {
      return typeof A == "string" || typeof A == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      A === r || A === p || A === i || A === o || A === m || A === f || typeof A == "object" && A !== null && (A.$$typeof === y || A.$$typeof === b || A.$$typeof === s || A.$$typeof === l || A.$$typeof === u || A.$$typeof === h || A.$$typeof === E || A.$$typeof === M || A.$$typeof === v);
    }
    function x(A) {
      if (typeof A == "object" && A !== null) {
        var ne = A.$$typeof;
        switch (ne) {
          case t:
            var P = A.type;
            switch (P) {
              case c:
              case p:
              case r:
              case i:
              case o:
              case m:
                return P;
              default:
                var ae = P && P.$$typeof;
                switch (ae) {
                  case l:
                  case u:
                  case y:
                  case b:
                  case s:
                    return ae;
                  default:
                    return ne;
                }
            }
          case n:
            return ne;
        }
      }
    }
    var g = c, O = p, C = l, V = s, j = t, F = u, S = r, I = y, R = b, L = n, z = i, $ = o, U = m, ee = !1;
    function Q(A) {
      return ee || (ee = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), N(A) || x(A) === c;
    }
    function N(A) {
      return x(A) === p;
    }
    function _(A) {
      return x(A) === l;
    }
    function D(A) {
      return x(A) === s;
    }
    function q(A) {
      return typeof A == "object" && A !== null && A.$$typeof === t;
    }
    function W(A) {
      return x(A) === u;
    }
    function G(A) {
      return x(A) === r;
    }
    function Y(A) {
      return x(A) === y;
    }
    function B(A) {
      return x(A) === b;
    }
    function H(A) {
      return x(A) === n;
    }
    function J(A) {
      return x(A) === i;
    }
    function te(A) {
      return x(A) === o;
    }
    function ie(A) {
      return x(A) === m;
    }
    ce.AsyncMode = g, ce.ConcurrentMode = O, ce.ContextConsumer = C, ce.ContextProvider = V, ce.Element = j, ce.ForwardRef = F, ce.Fragment = S, ce.Lazy = I, ce.Memo = R, ce.Portal = L, ce.Profiler = z, ce.StrictMode = $, ce.Suspense = U, ce.isAsyncMode = Q, ce.isConcurrentMode = N, ce.isContextConsumer = _, ce.isContextProvider = D, ce.isElement = q, ce.isForwardRef = W, ce.isFragment = G, ce.isLazy = Y, ce.isMemo = B, ce.isPortal = H, ce.isProfiler = J, ce.isStrictMode = te, ce.isSuspense = ie, ce.isValidElementType = w, ce.typeOf = x;
  }()), ce;
}
var Go;
function aa() {
  return Go || (Go = 1, process.env.NODE_ENV === "production" ? Rn.exports = rc() : Rn.exports = oc()), Rn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var br, Ko;
function ic() {
  if (Ko)
    return br;
  Ko = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var s = {}, l = 0; l < 10; l++)
        s["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(s).map(function(u) {
        return s[u];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var p = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        p[u] = u;
      }), Object.keys(Object.assign({}, p)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return br = o() ? Object.assign : function(i, s) {
    for (var l, c = r(i), p, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var m in l)
        t.call(l, m) && (c[m] = l[m]);
      if (e) {
        p = e(l);
        for (var f = 0; f < p.length; f++)
          n.call(l, p[f]) && (c[p[f]] = l[p[f]]);
      }
    }
    return c;
  }, br;
}
var vr, Jo;
function to() {
  if (Jo)
    return vr;
  Jo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return vr = e, vr;
}
var yr, Zo;
function sa() {
  return Zo || (Zo = 1, yr = Function.call.bind(Object.prototype.hasOwnProperty)), yr;
}
var wr, Qo;
function ac() {
  if (Qo)
    return wr;
  Qo = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = to(), n = {}, r = sa();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(i, s, l, c, p) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in i)
        if (r(i, u)) {
          var m;
          try {
            if (typeof i[u] != "function") {
              var f = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            m = i[u](s, u, c, l, null, t);
          } catch (y) {
            m = y;
          }
          if (m && !(m instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof m + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), m instanceof Error && !(m.message in n)) {
            n[m.message] = !0;
            var b = p ? p() : "";
            e(
              "Failed " + l + " type: " + m.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, wr = o, wr;
}
var xr, ei;
function sc() {
  if (ei)
    return xr;
  ei = 1;
  var e = aa(), t = ic(), n = to(), r = sa(), o = ac(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(l) {
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
  return xr = function(l, c) {
    var p = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function m(N) {
      var _ = N && (p && N[p] || N[u]);
      if (typeof _ == "function")
        return _;
    }
    var f = "<<anonymous>>", b = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: M(),
      arrayOf: w,
      element: x(),
      elementType: g(),
      instanceOf: O,
      node: F(),
      objectOf: V,
      oneOf: C,
      oneOfType: j,
      shape: I,
      exact: R
    };
    function y(N, _) {
      return N === _ ? N !== 0 || 1 / N === 1 / _ : N !== N && _ !== _;
    }
    function v(N, _) {
      this.message = N, this.data = _ && typeof _ == "object" ? _ : {}, this.stack = "";
    }
    v.prototype = Error.prototype;
    function h(N) {
      if (process.env.NODE_ENV !== "production")
        var _ = {}, D = 0;
      function q(G, Y, B, H, J, te, ie) {
        if (H = H || f, te = te || B, ie !== n) {
          if (c) {
            var A = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw A.name = "Invariant Violation", A;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ne = H + ":" + B;
            !_[ne] && // Avoid spamming the console because they are often not actionable except for lib authors
            D < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + te + "` prop on `" + H + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), _[ne] = !0, D++);
          }
        }
        return Y[B] == null ? G ? Y[B] === null ? new v("The " + J + " `" + te + "` is marked as required " + ("in `" + H + "`, but its value is `null`.")) : new v("The " + J + " `" + te + "` is marked as required in " + ("`" + H + "`, but its value is `undefined`.")) : null : N(Y, B, H, J, te);
      }
      var W = q.bind(null, !1);
      return W.isRequired = q.bind(null, !0), W;
    }
    function E(N) {
      function _(D, q, W, G, Y, B) {
        var H = D[q], J = $(H);
        if (J !== N) {
          var te = U(H);
          return new v(
            "Invalid " + G + " `" + Y + "` of type " + ("`" + te + "` supplied to `" + W + "`, expected ") + ("`" + N + "`."),
            { expectedType: N }
          );
        }
        return null;
      }
      return h(_);
    }
    function M() {
      return h(s);
    }
    function w(N) {
      function _(D, q, W, G, Y) {
        if (typeof N != "function")
          return new v("Property `" + Y + "` of component `" + W + "` has invalid PropType notation inside arrayOf.");
        var B = D[q];
        if (!Array.isArray(B)) {
          var H = $(B);
          return new v("Invalid " + G + " `" + Y + "` of type " + ("`" + H + "` supplied to `" + W + "`, expected an array."));
        }
        for (var J = 0; J < B.length; J++) {
          var te = N(B, J, W, G, Y + "[" + J + "]", n);
          if (te instanceof Error)
            return te;
        }
        return null;
      }
      return h(_);
    }
    function x() {
      function N(_, D, q, W, G) {
        var Y = _[D];
        if (!l(Y)) {
          var B = $(Y);
          return new v("Invalid " + W + " `" + G + "` of type " + ("`" + B + "` supplied to `" + q + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(N);
    }
    function g() {
      function N(_, D, q, W, G) {
        var Y = _[D];
        if (!e.isValidElementType(Y)) {
          var B = $(Y);
          return new v("Invalid " + W + " `" + G + "` of type " + ("`" + B + "` supplied to `" + q + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(N);
    }
    function O(N) {
      function _(D, q, W, G, Y) {
        if (!(D[q] instanceof N)) {
          var B = N.name || f, H = Q(D[q]);
          return new v("Invalid " + G + " `" + Y + "` of type " + ("`" + H + "` supplied to `" + W + "`, expected ") + ("instance of `" + B + "`."));
        }
        return null;
      }
      return h(_);
    }
    function C(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function _(D, q, W, G, Y) {
        for (var B = D[q], H = 0; H < N.length; H++)
          if (y(B, N[H]))
            return null;
        var J = JSON.stringify(N, function(ie, A) {
          var ne = U(A);
          return ne === "symbol" ? String(A) : A;
        });
        return new v("Invalid " + G + " `" + Y + "` of value `" + String(B) + "` " + ("supplied to `" + W + "`, expected one of " + J + "."));
      }
      return h(_);
    }
    function V(N) {
      function _(D, q, W, G, Y) {
        if (typeof N != "function")
          return new v("Property `" + Y + "` of component `" + W + "` has invalid PropType notation inside objectOf.");
        var B = D[q], H = $(B);
        if (H !== "object")
          return new v("Invalid " + G + " `" + Y + "` of type " + ("`" + H + "` supplied to `" + W + "`, expected an object."));
        for (var J in B)
          if (r(B, J)) {
            var te = N(B, J, W, G, Y + "." + J, n);
            if (te instanceof Error)
              return te;
          }
        return null;
      }
      return h(_);
    }
    function j(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var _ = 0; _ < N.length; _++) {
        var D = N[_];
        if (typeof D != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ee(D) + " at index " + _ + "."
          ), s;
      }
      function q(W, G, Y, B, H) {
        for (var J = [], te = 0; te < N.length; te++) {
          var ie = N[te], A = ie(W, G, Y, B, H, n);
          if (A == null)
            return null;
          A.data && r(A.data, "expectedType") && J.push(A.data.expectedType);
        }
        var ne = J.length > 0 ? ", expected one of type [" + J.join(", ") + "]" : "";
        return new v("Invalid " + B + " `" + H + "` supplied to " + ("`" + Y + "`" + ne + "."));
      }
      return h(q);
    }
    function F() {
      function N(_, D, q, W, G) {
        return L(_[D]) ? null : new v("Invalid " + W + " `" + G + "` supplied to " + ("`" + q + "`, expected a ReactNode."));
      }
      return h(N);
    }
    function S(N, _, D, q, W) {
      return new v(
        (N || "React class") + ": " + _ + " type `" + D + "." + q + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + W + "`."
      );
    }
    function I(N) {
      function _(D, q, W, G, Y) {
        var B = D[q], H = $(B);
        if (H !== "object")
          return new v("Invalid " + G + " `" + Y + "` of type `" + H + "` " + ("supplied to `" + W + "`, expected `object`."));
        for (var J in N) {
          var te = N[J];
          if (typeof te != "function")
            return S(W, G, Y, J, U(te));
          var ie = te(B, J, W, G, Y + "." + J, n);
          if (ie)
            return ie;
        }
        return null;
      }
      return h(_);
    }
    function R(N) {
      function _(D, q, W, G, Y) {
        var B = D[q], H = $(B);
        if (H !== "object")
          return new v("Invalid " + G + " `" + Y + "` of type `" + H + "` " + ("supplied to `" + W + "`, expected `object`."));
        var J = t({}, D[q], N);
        for (var te in J) {
          var ie = N[te];
          if (r(N, te) && typeof ie != "function")
            return S(W, G, Y, te, U(ie));
          if (!ie)
            return new v(
              "Invalid " + G + " `" + Y + "` key `" + te + "` supplied to `" + W + "`.\nBad object: " + JSON.stringify(D[q], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(N), null, "  ")
            );
          var A = ie(B, te, W, G, Y + "." + te, n);
          if (A)
            return A;
        }
        return null;
      }
      return h(_);
    }
    function L(N) {
      switch (typeof N) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !N;
        case "object":
          if (Array.isArray(N))
            return N.every(L);
          if (N === null || l(N))
            return !0;
          var _ = m(N);
          if (_) {
            var D = _.call(N), q;
            if (_ !== N.entries) {
              for (; !(q = D.next()).done; )
                if (!L(q.value))
                  return !1;
            } else
              for (; !(q = D.next()).done; ) {
                var W = q.value;
                if (W && !L(W[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function z(N, _) {
      return N === "symbol" ? !0 : _ ? _["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && _ instanceof Symbol : !1;
    }
    function $(N) {
      var _ = typeof N;
      return Array.isArray(N) ? "array" : N instanceof RegExp ? "object" : z(_, N) ? "symbol" : _;
    }
    function U(N) {
      if (typeof N > "u" || N === null)
        return "" + N;
      var _ = $(N);
      if (_ === "object") {
        if (N instanceof Date)
          return "date";
        if (N instanceof RegExp)
          return "regexp";
      }
      return _;
    }
    function ee(N) {
      var _ = U(N);
      switch (_) {
        case "array":
        case "object":
          return "an " + _;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + _;
        default:
          return _;
      }
    }
    function Q(N) {
      return !N.constructor || !N.constructor.name ? f : N.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, xr;
}
var Er, ti;
function lc() {
  if (ti)
    return Er;
  ti = 1;
  var e = to();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Er = function() {
    function r(s, l, c, p, u, m) {
      if (m !== e) {
        var f = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw f.name = "Invariant Violation", f;
      }
    }
    r.isRequired = r;
    function o() {
      return r;
    }
    var i = {
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
    return i.PropTypes = i, i;
  }, Er;
}
if (process.env.NODE_ENV !== "production") {
  var cc = aa(), pc = !0;
  Mr.exports = sc()(cc.isElement, pc);
} else
  Mr.exports = lc()();
var uc = Mr.exports;
const a = /* @__PURE__ */ tc(uc);
function Wt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function yt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function la(e) {
  if (!yt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = la(e[n]);
  }), t;
}
function rt(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? k({}, e) : e;
  return yt(e) && yt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (yt(t[o]) && o in e && yt(e[o]) ? r[o] = rt(e[o], t[o], n) : n.clone ? r[o] = yt(t[o]) ? la(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function dc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ca(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !dc(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const pa = Wt(a.element, ca);
pa.isRequired = Wt(a.element.isRequired, ca);
const yn = pa;
function fc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function mc(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !fc(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const hc = Wt(a.elementType, mc), gc = "exact-prop: ​";
function ua(e) {
  return process.env.NODE_ENV === "production" ? e : k({}, e, {
    [gc]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Bt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var _r = { exports: {} }, pe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ni;
function bc() {
  if (ni)
    return pe;
  ni = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function v(h) {
    if (typeof h == "object" && h !== null) {
      var E = h.$$typeof;
      switch (E) {
        case e:
          switch (h = h.type, h) {
            case n:
            case o:
            case r:
            case p:
            case u:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case s:
                case c:
                case f:
                case m:
                case i:
                  return h;
                default:
                  return E;
              }
          }
        case t:
          return E;
      }
    }
  }
  return pe.ContextConsumer = s, pe.ContextProvider = i, pe.Element = e, pe.ForwardRef = c, pe.Fragment = n, pe.Lazy = f, pe.Memo = m, pe.Portal = t, pe.Profiler = o, pe.StrictMode = r, pe.Suspense = p, pe.SuspenseList = u, pe.isAsyncMode = function() {
    return !1;
  }, pe.isConcurrentMode = function() {
    return !1;
  }, pe.isContextConsumer = function(h) {
    return v(h) === s;
  }, pe.isContextProvider = function(h) {
    return v(h) === i;
  }, pe.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, pe.isForwardRef = function(h) {
    return v(h) === c;
  }, pe.isFragment = function(h) {
    return v(h) === n;
  }, pe.isLazy = function(h) {
    return v(h) === f;
  }, pe.isMemo = function(h) {
    return v(h) === m;
  }, pe.isPortal = function(h) {
    return v(h) === t;
  }, pe.isProfiler = function(h) {
    return v(h) === o;
  }, pe.isStrictMode = function(h) {
    return v(h) === r;
  }, pe.isSuspense = function(h) {
    return v(h) === p;
  }, pe.isSuspenseList = function(h) {
    return v(h) === u;
  }, pe.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === p || h === u || h === b || typeof h == "object" && h !== null && (h.$$typeof === f || h.$$typeof === m || h.$$typeof === i || h.$$typeof === s || h.$$typeof === c || h.$$typeof === y || h.getModuleId !== void 0);
  }, pe.typeOf = v, pe;
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
var ri;
function vc() {
  return ri || (ri = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y = !1, v = !1, h = !1, E = !1, M = !1, w;
    w = Symbol.for("react.module.reference");
    function x(P) {
      return !!(typeof P == "string" || typeof P == "function" || P === n || P === o || M || P === r || P === p || P === u || E || P === b || y || v || h || typeof P == "object" && P !== null && (P.$$typeof === f || P.$$typeof === m || P.$$typeof === i || P.$$typeof === s || P.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      P.$$typeof === w || P.getModuleId !== void 0));
    }
    function g(P) {
      if (typeof P == "object" && P !== null) {
        var ae = P.$$typeof;
        switch (ae) {
          case e:
            var Ee = P.type;
            switch (Ee) {
              case n:
              case o:
              case r:
              case p:
              case u:
                return Ee;
              default:
                var Ce = Ee && Ee.$$typeof;
                switch (Ce) {
                  case l:
                  case s:
                  case c:
                  case f:
                  case m:
                  case i:
                    return Ce;
                  default:
                    return ae;
                }
            }
          case t:
            return ae;
        }
      }
    }
    var O = s, C = i, V = e, j = c, F = n, S = f, I = m, R = t, L = o, z = r, $ = p, U = u, ee = !1, Q = !1;
    function N(P) {
      return ee || (ee = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function _(P) {
      return Q || (Q = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function D(P) {
      return g(P) === s;
    }
    function q(P) {
      return g(P) === i;
    }
    function W(P) {
      return typeof P == "object" && P !== null && P.$$typeof === e;
    }
    function G(P) {
      return g(P) === c;
    }
    function Y(P) {
      return g(P) === n;
    }
    function B(P) {
      return g(P) === f;
    }
    function H(P) {
      return g(P) === m;
    }
    function J(P) {
      return g(P) === t;
    }
    function te(P) {
      return g(P) === o;
    }
    function ie(P) {
      return g(P) === r;
    }
    function A(P) {
      return g(P) === p;
    }
    function ne(P) {
      return g(P) === u;
    }
    ue.ContextConsumer = O, ue.ContextProvider = C, ue.Element = V, ue.ForwardRef = j, ue.Fragment = F, ue.Lazy = S, ue.Memo = I, ue.Portal = R, ue.Profiler = L, ue.StrictMode = z, ue.Suspense = $, ue.SuspenseList = U, ue.isAsyncMode = N, ue.isConcurrentMode = _, ue.isContextConsumer = D, ue.isContextProvider = q, ue.isElement = W, ue.isForwardRef = G, ue.isFragment = Y, ue.isLazy = B, ue.isMemo = H, ue.isPortal = J, ue.isProfiler = te, ue.isStrictMode = ie, ue.isSuspense = A, ue.isSuspenseList = ne, ue.isValidElementType = x, ue.typeOf = g;
  }()), ue;
}
process.env.NODE_ENV === "production" ? _r.exports = bc() : _r.exports = vc();
var Un = _r.exports;
const yc = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function wc(e) {
  const t = `${e}`.match(yc);
  return t && t[1] || "";
}
function da(e, t = "") {
  return e.displayName || e.name || wc(e) || t;
}
function oi(e, t, n) {
  const r = da(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function xc(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return da(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Un.ForwardRef:
          return oi(e, e.render, "ForwardRef");
        case Un.Memo:
          return oi(e, e.type, "memo");
        default:
          return;
      }
  }
}
function ot(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Ec = a.oneOfType([a.func, a.object]), no = Ec;
function Ke(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Bt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ar(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function fa(e, t = 166) {
  let n;
  function r(...o) {
    const i = () => {
      e.apply(this, o);
    };
    clearTimeout(n), n = setTimeout(i, t);
  }
  return r.clear = () => {
    clearTimeout(n);
  }, r;
}
function Tc(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function kc(e, t) {
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
function Lt(e) {
  return Oe(e).defaultView || window;
}
function Nc(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? k({}, t.propTypes) : null;
  return (o) => (i, s, l, c, p, ...u) => {
    const m = p || s, f = n == null ? void 0 : n[m];
    if (f) {
      const b = f(i, s, l, c, p, ...u);
      if (b)
        return b;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${m}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Hn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Oc = typeof window < "u" ? T.useLayoutEffect : T.useEffect, Tt = Oc;
let ii = 0;
function Sc(e) {
  const [t, n] = T.useState(e), r = e || t;
  return T.useEffect(() => {
    t == null && (ii += 1, n(`mui-${ii}`));
  }, [t]), r;
}
const ai = T["useId".toString()];
function ma(e) {
  if (ai !== void 0) {
    const t = ai();
    return e ?? t;
  }
  return Sc(e);
}
function Cc(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function ha({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = T.useRef(e !== void 0), [i, s] = T.useState(t), l = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    T.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: p
    } = T.useRef(t);
    T.useEffect(() => {
      !o && p !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = T.useCallback((p) => {
    o || s(p);
  }, []);
  return [l, c];
}
function mn(e) {
  const t = T.useRef(e);
  return Tt(() => {
    t.current = e;
  }), T.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Ue(...e) {
  return T.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Hn(n, t);
    });
  }, e);
}
const si = {};
function Pc(e, t) {
  const n = T.useRef(si);
  return n.current === si && (n.current = e(t)), n;
}
const Rc = [];
function $c(e) {
  T.useEffect(e, Rc);
}
class wn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new wn();
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
function on() {
  const e = Pc(wn.create).current;
  return $c(e.disposeEffect), e;
}
let er = !0, Dr = !1;
const Ic = new wn(), Mc = {
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
function _c(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Mc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Ac(e) {
  e.metaKey || e.altKey || e.ctrlKey || (er = !0);
}
function Tr() {
  er = !1;
}
function Dc() {
  this.visibilityState === "hidden" && Dr && (er = !0);
}
function jc(e) {
  e.addEventListener("keydown", Ac, !0), e.addEventListener("mousedown", Tr, !0), e.addEventListener("pointerdown", Tr, !0), e.addEventListener("touchstart", Tr, !0), e.addEventListener("visibilitychange", Dc, !0);
}
function Bc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return er || _c(t);
}
function ga() {
  const e = T.useCallback((o) => {
    o != null && jc(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function n() {
    return t.current ? (Dr = !0, Ic.start(100, () => {
      Dr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Bc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function ba(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Lc(e) {
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
function Vc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Fc = Number.isInteger || Vc;
function va(e, t, n, r) {
  const o = e[t];
  if (o == null || !Fc(o)) {
    const i = Lc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function ya(e, t, ...n) {
  return e[t] === void 0 ? null : va(e, t, ...n);
}
function jr() {
  return null;
}
ya.isRequired = va;
jr.isRequired = jr;
const wa = process.env.NODE_ENV === "production" ? jr : ya;
function xa(e, t) {
  const n = k({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = k({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = k({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = xa(o[s], i[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function st(e, t, n = void 0) {
  const r = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = e[o].reduce((i, s) => {
        if (s) {
          const l = t(s);
          l !== "" && i.push(l), n && n[s] && i.push(n[s]);
        }
        return i;
      }, []).join(" ");
    }
  ), r;
}
const li = (e) => e, zc = () => {
  let e = li;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = li;
    }
  };
}, Uc = zc(), Ea = Uc, Ta = {
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
function Ze(e, t, n = "Mui") {
  const r = Ta[t];
  return r ? `${n}-${r}` : `${Ea.generate(e)}-${t}`;
}
function ut(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Ze(e, o, n);
  }), r;
}
function Hc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function ka(e) {
  return typeof e == "string";
}
function an(e, t, n) {
  return e === void 0 || ka(e) ? t : k({}, t, {
    ownerState: k({}, t.ownerState, n)
  });
}
const Wc = {
  disableDefaultClasses: !1
}, Xc = /* @__PURE__ */ T.createContext(Wc);
function qc(e) {
  const {
    disableDefaultClasses: t
  } = T.useContext(Xc);
  return (n) => t ? "" : e(n);
}
function Na(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Yc(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function ci(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Gc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = Ne(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), y = k({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), v = k({}, n, o, r);
    return b.length > 0 && (v.className = b), Object.keys(y).length > 0 && (v.style = y), {
      props: v,
      internalRef: void 0
    };
  }
  const s = Na(k({}, o, r)), l = ci(r), c = ci(o), p = t(s), u = Ne(p == null ? void 0 : p.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = k({}, p == null ? void 0 : p.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = k({}, p, n, c, l);
  return u.length > 0 && (f.className = u), Object.keys(m).length > 0 && (f.style = m), {
    props: f,
    internalRef: p.ref
  };
}
const Kc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function kt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = fe(e, Kc), l = i ? {} : Yc(r, o), {
    props: c,
    internalRef: p
  } = Gc(k({}, s, {
    externalSlotProps: l
  })), u = Ue(p, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return an(n, k({}, c, {
    ref: u
  }), o);
}
const Oa = "base";
function Jc(e) {
  return `${Oa}--${e}`;
}
function Zc(e, t) {
  return `${Oa}-${e}-${t}`;
}
function Sa(e, t) {
  const n = Ta[t];
  return n ? Jc(n) : Zc(e, t);
}
function Qc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Sa(e, r);
  }), n;
}
const ep = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function tp(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function np(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function rp(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || np(e));
}
function op(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(ep)).forEach((r, o) => {
    const i = tp(r);
    i === -1 || !rp(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function ip() {
  return !0;
}
function Wn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = op,
    isEnabled: s = ip,
    open: l
  } = e, c = T.useRef(!1), p = T.useRef(null), u = T.useRef(null), m = T.useRef(null), f = T.useRef(null), b = T.useRef(!1), y = T.useRef(null), v = Ue(t.ref, y), h = T.useRef(null);
  T.useEffect(() => {
    !l || !y.current || (b.current = !n);
  }, [n, l]), T.useEffect(() => {
    if (!l || !y.current)
      return;
    const w = Oe(y.current);
    return y.current.contains(w.activeElement) || (y.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), y.current.setAttribute("tabIndex", "-1")), b.current && y.current.focus()), () => {
      o || (m.current && m.current.focus && (c.current = !0, m.current.focus()), m.current = null);
    };
  }, [l]), T.useEffect(() => {
    if (!l || !y.current)
      return;
    const w = Oe(y.current), x = (C) => {
      h.current = C, !(r || !s() || C.key !== "Tab") && w.activeElement === y.current && C.shiftKey && (c.current = !0, u.current && u.current.focus());
    }, g = () => {
      const C = y.current;
      if (C === null)
        return;
      if (!w.hasFocus() || !s() || c.current) {
        c.current = !1;
        return;
      }
      if (C.contains(w.activeElement) || r && w.activeElement !== p.current && w.activeElement !== u.current)
        return;
      if (w.activeElement !== f.current)
        f.current = null;
      else if (f.current !== null)
        return;
      if (!b.current)
        return;
      let V = [];
      if ((w.activeElement === p.current || w.activeElement === u.current) && (V = i(y.current)), V.length > 0) {
        var j, F;
        const S = !!((j = h.current) != null && j.shiftKey && ((F = h.current) == null ? void 0 : F.key) === "Tab"), I = V[0], R = V[V.length - 1];
        typeof I != "string" && typeof R != "string" && (S ? R.focus() : I.focus());
      } else
        C.focus();
    };
    w.addEventListener("focusin", g), w.addEventListener("keydown", x, !0);
    const O = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && g();
    }, 50);
    return () => {
      clearInterval(O), w.removeEventListener("focusin", g), w.removeEventListener("keydown", x, !0);
    };
  }, [n, r, o, s, l, i]);
  const E = (w) => {
    m.current === null && (m.current = w.relatedTarget), b.current = !0, f.current = w.target;
    const x = t.props.onFocus;
    x && x(w);
  }, M = (w) => {
    m.current === null && (m.current = w.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ X(T.Fragment, {
    children: [/* @__PURE__ */ d("div", {
      tabIndex: l ? 0 : -1,
      onFocus: M,
      ref: p,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: v,
      onFocus: E
    }), /* @__PURE__ */ d("div", {
      tabIndex: l ? 0 : -1,
      onFocus: M,
      ref: u,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Wn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: yn,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: a.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: a.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: a.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: a.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: a.func,
  /**
   * If `true`, focus is locked.
   */
  open: a.bool.isRequired
});
process.env.NODE_ENV !== "production" && (Wn["propTypes"] = ua(Wn.propTypes));
function ap(e) {
  return typeof e == "function" ? e() : e;
}
const hn = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, l] = T.useState(null), c = Ue(/* @__PURE__ */ T.isValidElement(r) ? r.ref : null, n);
  if (Tt(() => {
    i || l(ap(o) || document.body);
  }, [o, i]), Tt(() => {
    if (s && !i)
      return Hn(n, s), () => {
        Hn(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ T.isValidElement(r)) {
      const p = {
        ref: c
      };
      return /* @__PURE__ */ T.cloneElement(r, p);
    }
    return /* @__PURE__ */ d(T.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ d(T.Fragment, {
    children: s && /* @__PURE__ */ gl.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (hn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: a.node,
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
  container: a.oneOfType([ot, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool
});
process.env.NODE_ENV !== "production" && (hn["propTypes"] = ua(hn.propTypes));
function sp(e) {
  const t = Oe(e);
  return t.body === e ? Lt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function cn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function pi(e) {
  return parseInt(Lt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function lp(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function ui(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1, c = !lp(s);
    l && c && cn(s, o);
  });
}
function kr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function cp(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (sp(r)) {
      const s = ba(Oe(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${pi(r) + s}px`;
      const l = Oe(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${pi(c) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Oe(r).body;
    else {
      const s = r.parentElement, l = Lt(r);
      i = (s == null ? void 0 : s.nodeName) === "HTML" && l.getComputedStyle(s).overflowY === "scroll" ? s : r;
    }
    n.push({
      value: i.style.overflow,
      property: "overflow",
      el: i
    }, {
      value: i.style.overflowX,
      property: "overflow-x",
      el: i
    }, {
      value: i.style.overflowY,
      property: "overflow-y",
      el: i
    }), i.style.overflow = "hidden";
  }
  return () => {
    n.forEach(({
      value: i,
      el: s,
      property: l
    }) => {
      i ? s.style.setProperty(l, i) : s.style.removeProperty(l);
    });
  };
}
function pp(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class up {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && cn(t.modalRef, !1);
    const o = pp(n);
    ui(n, t.mount, t.modalRef, o, !0);
    const i = kr(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = kr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = cp(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = kr(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && cn(t.modalRef, n), ui(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && cn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function dp(e) {
  return typeof e == "function" ? e() : e;
}
function fp(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const mp = new up();
function hp(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = mp,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: p,
    open: u,
    rootRef: m
  } = e, f = T.useRef({}), b = T.useRef(null), y = T.useRef(null), v = Ue(y, m), [h, E] = T.useState(!u), M = fp(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const x = () => Oe(b.current), g = () => (f.current.modalRef = y.current, f.current.mount = b.current, f.current), O = () => {
    o.mount(g(), {
      disableScrollLock: r
    }), y.current && (y.current.scrollTop = 0);
  }, C = mn(() => {
    const $ = dp(t) || x().body;
    o.add(g(), $), y.current && O();
  }), V = T.useCallback(() => o.isTopModal(g()), [o]), j = mn(($) => {
    b.current = $, $ && (u && V() ? O() : y.current && cn(y.current, w));
  }), F = T.useCallback(() => {
    o.remove(g(), w);
  }, [w, o]);
  T.useEffect(() => () => {
    F();
  }, [F]), T.useEffect(() => {
    u ? C() : (!M || !i) && F();
  }, [u, F, M, i, C]);
  const S = ($) => (U) => {
    var ee;
    (ee = $.onKeyDown) == null || ee.call($, U), !(U.key !== "Escape" || U.which === 229 || // Wait until IME is settled.
    !V()) && (n || (U.stopPropagation(), p && p(U, "escapeKeyDown")));
  }, I = ($) => (U) => {
    var ee;
    (ee = $.onClick) == null || ee.call($, U), U.target === U.currentTarget && p && p(U, "backdropClick");
  };
  return {
    getRootProps: ($ = {}) => {
      const U = Na(e);
      delete U.onTransitionEnter, delete U.onTransitionExited;
      const ee = k({}, U, $);
      return k({
        role: "presentation"
      }, ee, {
        onKeyDown: S(ee),
        ref: v
      });
    },
    getBackdropProps: ($ = {}) => {
      const U = $;
      return k({
        "aria-hidden": !0
      }, U, {
        onClick: I(U),
        open: u
      });
    },
    getTransitionProps: () => {
      const $ = () => {
        E(!1), s && s();
      }, U = () => {
        E(!0), l && l(), i && F();
      };
      return {
        onEnter: Ar($, c == null ? void 0 : c.props.onEnter),
        onExited: Ar(U, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: v,
    portalRef: j,
    isTopModal: V,
    exited: h,
    hasTransition: M
  };
}
var Ie = "top", He = "bottom", We = "right", Me = "left", ro = "auto", xn = [Ie, He, We, Me], Vt = "start", gn = "end", gp = "clippingParents", Ca = "viewport", Qt = "popper", bp = "reference", di = /* @__PURE__ */ xn.reduce(function(e, t) {
  return e.concat([t + "-" + Vt, t + "-" + gn]);
}, []), Pa = /* @__PURE__ */ [].concat(xn, [ro]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Vt, t + "-" + gn]);
}, []), vp = "beforeRead", yp = "read", wp = "afterRead", xp = "beforeMain", Ep = "main", Tp = "afterMain", kp = "beforeWrite", Np = "write", Op = "afterWrite", Sp = [vp, yp, wp, xp, Ep, Tp, kp, Np, Op];
function Je(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Le(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Nt(e) {
  var t = Le(e).Element;
  return e instanceof t || e instanceof Element;
}
function ze(e) {
  var t = Le(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function oo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Le(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Cp(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !ze(i) || !Je(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function Pp(e) {
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
      var o = t.elements[r], i = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = s.reduce(function(c, p) {
        return c[p] = "", c;
      }, {});
      !ze(o) || !Je(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Rp = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Cp,
  effect: Pp,
  requires: ["computeStyles"]
};
function Ge(e) {
  return e.split("-")[0];
}
var xt = Math.max, Xn = Math.min, Ft = Math.round;
function Br() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ra() {
  return !/^((?!chrome|android).)*safari/i.test(Br());
}
function zt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && ze(e) && (o = e.offsetWidth > 0 && Ft(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Ft(r.height) / e.offsetHeight || 1);
  var s = Nt(e) ? Le(e) : window, l = s.visualViewport, c = !Ra() && n, p = (r.left + (c && l ? l.offsetLeft : 0)) / o, u = (r.top + (c && l ? l.offsetTop : 0)) / i, m = r.width / o, f = r.height / i;
  return {
    width: m,
    height: f,
    top: u,
    right: p + m,
    bottom: u + f,
    left: p,
    x: p,
    y: u
  };
}
function io(e) {
  var t = zt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function $a(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && oo(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function it(e) {
  return Le(e).getComputedStyle(e);
}
function $p(e) {
  return ["table", "td", "th"].indexOf(Je(e)) >= 0;
}
function dt(e) {
  return ((Nt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function tr(e) {
  return Je(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (oo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    dt(e)
  );
}
function fi(e) {
  return !ze(e) || // https://github.com/popperjs/popper-core/issues/837
  it(e).position === "fixed" ? null : e.offsetParent;
}
function Ip(e) {
  var t = /firefox/i.test(Br()), n = /Trident/i.test(Br());
  if (n && ze(e)) {
    var r = it(e);
    if (r.position === "fixed")
      return null;
  }
  var o = tr(e);
  for (oo(o) && (o = o.host); ze(o) && ["html", "body"].indexOf(Je(o)) < 0; ) {
    var i = it(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function En(e) {
  for (var t = Le(e), n = fi(e); n && $p(n) && it(n).position === "static"; )
    n = fi(n);
  return n && (Je(n) === "html" || Je(n) === "body" && it(n).position === "static") ? t : n || Ip(e) || t;
}
function ao(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function pn(e, t, n) {
  return xt(e, Xn(t, n));
}
function Mp(e, t, n) {
  var r = pn(e, t, n);
  return r > n ? n : r;
}
function Ia() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ma(e) {
  return Object.assign({}, Ia(), e);
}
function _a(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var _p = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Ma(typeof t != "number" ? t : _a(t, xn));
};
function Ap(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Ge(n.placement), c = ao(l), p = [Me, We].indexOf(l) >= 0, u = p ? "height" : "width";
  if (!(!i || !s)) {
    var m = _p(o.padding, n), f = io(i), b = c === "y" ? Ie : Me, y = c === "y" ? He : We, v = n.rects.reference[u] + n.rects.reference[c] - s[c] - n.rects.popper[u], h = s[c] - n.rects.reference[c], E = En(i), M = E ? c === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, w = v / 2 - h / 2, x = m[b], g = M - f[u] - m[y], O = M / 2 - f[u] / 2 + w, C = pn(x, O, g), V = c;
    n.modifiersData[r] = (t = {}, t[V] = C, t.centerOffset = C - O, t);
  }
}
function Dp(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || $a(t.elements.popper, o) && (t.elements.arrow = o));
}
const jp = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ap,
  effect: Dp,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ut(e) {
  return e.split("-")[1];
}
var Bp = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Lp(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Ft(n * o) / o || 0,
    y: Ft(r * o) / o || 0
  };
}
function mi(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, p = e.adaptive, u = e.roundOffsets, m = e.isFixed, f = s.x, b = f === void 0 ? 0 : f, y = s.y, v = y === void 0 ? 0 : y, h = typeof u == "function" ? u({
    x: b,
    y: v
  }) : {
    x: b,
    y: v
  };
  b = h.x, v = h.y;
  var E = s.hasOwnProperty("x"), M = s.hasOwnProperty("y"), w = Me, x = Ie, g = window;
  if (p) {
    var O = En(n), C = "clientHeight", V = "clientWidth";
    if (O === Le(n) && (O = dt(n), it(O).position !== "static" && l === "absolute" && (C = "scrollHeight", V = "scrollWidth")), O = O, o === Ie || (o === Me || o === We) && i === gn) {
      x = He;
      var j = m && O === g && g.visualViewport ? g.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        O[C]
      );
      v -= j - r.height, v *= c ? 1 : -1;
    }
    if (o === Me || (o === Ie || o === He) && i === gn) {
      w = We;
      var F = m && O === g && g.visualViewport ? g.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        O[V]
      );
      b -= F - r.width, b *= c ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: l
  }, p && Bp), I = u === !0 ? Lp({
    x: b,
    y: v
  }, Le(n)) : {
    x: b,
    y: v
  };
  if (b = I.x, v = I.y, c) {
    var R;
    return Object.assign({}, S, (R = {}, R[x] = M ? "0" : "", R[w] = E ? "0" : "", R.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + v + "px)" : "translate3d(" + b + "px, " + v + "px, 0)", R));
  }
  return Object.assign({}, S, (t = {}, t[x] = M ? v + "px" : "", t[w] = E ? b + "px" : "", t.transform = "", t));
}
function Vp(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, p = {
    placement: Ge(t.placement),
    variation: Ut(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, mi(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, mi(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Fp = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Vp,
  data: {}
};
var $n = {
  passive: !0
};
function zp(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Le(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && p.forEach(function(u) {
    u.addEventListener("scroll", n.update, $n);
  }), l && c.addEventListener("resize", n.update, $n), function() {
    i && p.forEach(function(u) {
      u.removeEventListener("scroll", n.update, $n);
    }), l && c.removeEventListener("resize", n.update, $n);
  };
}
const Up = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: zp,
  data: {}
};
var Hp = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Dn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Hp[t];
  });
}
var Wp = {
  start: "end",
  end: "start"
};
function hi(e) {
  return e.replace(/start|end/g, function(t) {
    return Wp[t];
  });
}
function so(e) {
  var t = Le(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function lo(e) {
  return zt(dt(e)).left + so(e).scrollLeft;
}
function Xp(e, t) {
  var n = Le(e), r = dt(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    var p = Ra();
    (p || !p && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: l + lo(e),
    y: c
  };
}
function qp(e) {
  var t, n = dt(e), r = so(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = xt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = xt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + lo(e), c = -r.scrollTop;
  return it(o || n).direction === "rtl" && (l += xt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function co(e) {
  var t = it(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Aa(e) {
  return ["html", "body", "#document"].indexOf(Je(e)) >= 0 ? e.ownerDocument.body : ze(e) && co(e) ? e : Aa(tr(e));
}
function un(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Aa(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Le(r), s = o ? [i].concat(i.visualViewport || [], co(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(un(tr(s)))
  );
}
function Lr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Yp(e, t) {
  var n = zt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function gi(e, t, n) {
  return t === Ca ? Lr(Xp(e, n)) : Nt(t) ? Yp(t, n) : Lr(qp(dt(e)));
}
function Gp(e) {
  var t = un(tr(e)), n = ["absolute", "fixed"].indexOf(it(e).position) >= 0, r = n && ze(e) ? En(e) : e;
  return Nt(r) ? t.filter(function(o) {
    return Nt(o) && $a(o, r) && Je(o) !== "body";
  }) : [];
}
function Kp(e, t, n, r) {
  var o = t === "clippingParents" ? Gp(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], l = i.reduce(function(c, p) {
    var u = gi(e, p, r);
    return c.top = xt(u.top, c.top), c.right = Xn(u.right, c.right), c.bottom = Xn(u.bottom, c.bottom), c.left = xt(u.left, c.left), c;
  }, gi(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Da(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ge(r) : null, i = r ? Ut(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Ie:
      c = {
        x: s,
        y: t.y - n.height
      };
      break;
    case He:
      c = {
        x: s,
        y: t.y + t.height
      };
      break;
    case We:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Me:
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
  var p = o ? ao(o) : null;
  if (p != null) {
    var u = p === "y" ? "height" : "width";
    switch (i) {
      case Vt:
        c[p] = c[p] - (t[u] / 2 - n[u] / 2);
        break;
      case gn:
        c[p] = c[p] + (t[u] / 2 - n[u] / 2);
        break;
    }
  }
  return c;
}
function bn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? gp : l, p = n.rootBoundary, u = p === void 0 ? Ca : p, m = n.elementContext, f = m === void 0 ? Qt : m, b = n.altBoundary, y = b === void 0 ? !1 : b, v = n.padding, h = v === void 0 ? 0 : v, E = Ma(typeof h != "number" ? h : _a(h, xn)), M = f === Qt ? bp : Qt, w = e.rects.popper, x = e.elements[y ? M : f], g = Kp(Nt(x) ? x : x.contextElement || dt(e.elements.popper), c, u, s), O = zt(e.elements.reference), C = Da({
    reference: O,
    element: w,
    strategy: "absolute",
    placement: o
  }), V = Lr(Object.assign({}, w, C)), j = f === Qt ? V : O, F = {
    top: g.top - j.top + E.top,
    bottom: j.bottom - g.bottom + E.bottom,
    left: g.left - j.left + E.left,
    right: j.right - g.right + E.right
  }, S = e.modifiersData.offset;
  if (f === Qt && S) {
    var I = S[o];
    Object.keys(F).forEach(function(R) {
      var L = [We, He].indexOf(R) >= 0 ? 1 : -1, z = [Ie, He].indexOf(R) >= 0 ? "y" : "x";
      F[R] += I[z] * L;
    });
  }
  return F;
}
function Jp(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, p = c === void 0 ? Pa : c, u = Ut(r), m = u ? l ? di : di.filter(function(y) {
    return Ut(y) === u;
  }) : xn, f = m.filter(function(y) {
    return p.indexOf(y) >= 0;
  });
  f.length === 0 && (f = m);
  var b = f.reduce(function(y, v) {
    return y[v] = bn(e, {
      placement: v,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[Ge(v)], y;
  }, {});
  return Object.keys(b).sort(function(y, v) {
    return b[y] - b[v];
  });
}
function Zp(e) {
  if (Ge(e) === ro)
    return [];
  var t = Dn(e);
  return [hi(e), t, hi(t)];
}
function Qp(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, p = n.padding, u = n.boundary, m = n.rootBoundary, f = n.altBoundary, b = n.flipVariations, y = b === void 0 ? !0 : b, v = n.allowedAutoPlacements, h = t.options.placement, E = Ge(h), M = E === h, w = c || (M || !y ? [Dn(h)] : Zp(h)), x = [h].concat(w).reduce(function(W, G) {
      return W.concat(Ge(G) === ro ? Jp(t, {
        placement: G,
        boundary: u,
        rootBoundary: m,
        padding: p,
        flipVariations: y,
        allowedAutoPlacements: v
      }) : G);
    }, []), g = t.rects.reference, O = t.rects.popper, C = /* @__PURE__ */ new Map(), V = !0, j = x[0], F = 0; F < x.length; F++) {
      var S = x[F], I = Ge(S), R = Ut(S) === Vt, L = [Ie, He].indexOf(I) >= 0, z = L ? "width" : "height", $ = bn(t, {
        placement: S,
        boundary: u,
        rootBoundary: m,
        altBoundary: f,
        padding: p
      }), U = L ? R ? We : Me : R ? He : Ie;
      g[z] > O[z] && (U = Dn(U));
      var ee = Dn(U), Q = [];
      if (i && Q.push($[I] <= 0), l && Q.push($[U] <= 0, $[ee] <= 0), Q.every(function(W) {
        return W;
      })) {
        j = S, V = !1;
        break;
      }
      C.set(S, Q);
    }
    if (V)
      for (var N = y ? 3 : 1, _ = function(G) {
        var Y = x.find(function(B) {
          var H = C.get(B);
          if (H)
            return H.slice(0, G).every(function(J) {
              return J;
            });
        });
        if (Y)
          return j = Y, "break";
      }, D = N; D > 0; D--) {
        var q = _(D);
        if (q === "break")
          break;
      }
    t.placement !== j && (t.modifiersData[r]._skip = !0, t.placement = j, t.reset = !0);
  }
}
const eu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Qp,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function bi(e, t, n) {
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
function vi(e) {
  return [Ie, We, He, Me].some(function(t) {
    return e[t] >= 0;
  });
}
function tu(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = bn(t, {
    elementContext: "reference"
  }), l = bn(t, {
    altBoundary: !0
  }), c = bi(s, r), p = bi(l, o, i), u = vi(c), m = vi(p);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: p,
    isReferenceHidden: u,
    hasPopperEscaped: m
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": m
  });
}
const nu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: tu
};
function ru(e, t, n) {
  var r = Ge(e), o = [Me, Ie].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], l = i[1];
  return s = s || 0, l = (l || 0) * o, [Me, We].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function ou(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = Pa.reduce(function(u, m) {
    return u[m] = ru(m, t.rects, i), u;
  }, {}), l = s[t.placement], c = l.x, p = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += p), t.modifiersData[r] = s;
}
const iu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ou
};
function au(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Da({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const su = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: au,
  data: {}
};
function lu(e) {
  return e === "x" ? "y" : "x";
}
function cu(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, p = n.rootBoundary, u = n.altBoundary, m = n.padding, f = n.tether, b = f === void 0 ? !0 : f, y = n.tetherOffset, v = y === void 0 ? 0 : y, h = bn(t, {
    boundary: c,
    rootBoundary: p,
    padding: m,
    altBoundary: u
  }), E = Ge(t.placement), M = Ut(t.placement), w = !M, x = ao(E), g = lu(x), O = t.modifiersData.popperOffsets, C = t.rects.reference, V = t.rects.popper, j = typeof v == "function" ? v(Object.assign({}, t.rects, {
    placement: t.placement
  })) : v, F = typeof j == "number" ? {
    mainAxis: j,
    altAxis: j
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, j), S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, I = {
    x: 0,
    y: 0
  };
  if (O) {
    if (i) {
      var R, L = x === "y" ? Ie : Me, z = x === "y" ? He : We, $ = x === "y" ? "height" : "width", U = O[x], ee = U + h[L], Q = U - h[z], N = b ? -V[$] / 2 : 0, _ = M === Vt ? C[$] : V[$], D = M === Vt ? -V[$] : -C[$], q = t.elements.arrow, W = b && q ? io(q) : {
        width: 0,
        height: 0
      }, G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ia(), Y = G[L], B = G[z], H = pn(0, C[$], W[$]), J = w ? C[$] / 2 - N - H - Y - F.mainAxis : _ - H - Y - F.mainAxis, te = w ? -C[$] / 2 + N + H + B + F.mainAxis : D + H + B + F.mainAxis, ie = t.elements.arrow && En(t.elements.arrow), A = ie ? x === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, ne = (R = S == null ? void 0 : S[x]) != null ? R : 0, P = U + J - ne - A, ae = U + te - ne, Ee = pn(b ? Xn(ee, P) : ee, U, b ? xt(Q, ae) : Q);
      O[x] = Ee, I[x] = Ee - U;
    }
    if (l) {
      var Ce, we = x === "x" ? Ie : Me, mt = x === "x" ? He : We, Pe = O[g], Qe = g === "y" ? "height" : "width", Ae = Pe + h[we], et = Pe - h[mt], Te = [Ie, Me].indexOf(E) !== -1, St = (Ce = S == null ? void 0 : S[g]) != null ? Ce : 0, ht = Te ? Ae : Pe - C[Qe] - V[Qe] - St + F.altAxis, Xt = Te ? Pe + C[Qe] + V[Qe] - St - F.altAxis : et, On = b && Te ? Mp(ht, Pe, Xt) : pn(b ? ht : Ae, Pe, b ? Xt : et);
      O[g] = On, I[g] = On - Pe;
    }
    t.modifiersData[r] = I;
  }
}
const pu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: cu,
  requiresIfExists: ["offset"]
};
function uu(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function du(e) {
  return e === Le(e) || !ze(e) ? so(e) : uu(e);
}
function fu(e) {
  var t = e.getBoundingClientRect(), n = Ft(t.width) / e.offsetWidth || 1, r = Ft(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function mu(e, t, n) {
  n === void 0 && (n = !1);
  var r = ze(t), o = ze(t) && fu(t), i = dt(t), s = zt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Je(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  co(i)) && (l = du(t)), ze(t) ? (c = zt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = lo(i))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function hu(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function(l) {
      if (!n.has(l)) {
        var c = t.get(l);
        c && o(c);
      }
    }), r.push(i);
  }
  return e.forEach(function(i) {
    n.has(i.name) || o(i);
  }), r;
}
function gu(e) {
  var t = hu(e);
  return Sp.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function bu(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function vu(e) {
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
var yi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function wi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function yu(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? yi : o;
  return function(l, c, p) {
    p === void 0 && (p = i);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, yi, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, m = [], f = !1, b = {
      state: u,
      setOptions: function(E) {
        var M = typeof E == "function" ? E(u.options) : E;
        v(), u.options = Object.assign({}, i, u.options, M), u.scrollParents = {
          reference: Nt(l) ? un(l) : l.contextElement ? un(l.contextElement) : [],
          popper: un(c)
        };
        var w = gu(vu([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = w.filter(function(x) {
          return x.enabled;
        }), y(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var E = u.elements, M = E.reference, w = E.popper;
          if (wi(M, w)) {
            u.rects = {
              reference: mu(M, En(w), u.options.strategy === "fixed"),
              popper: io(w)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(F) {
              return u.modifiersData[F.name] = Object.assign({}, F.data);
            });
            for (var x = 0; x < u.orderedModifiers.length; x++) {
              if (u.reset === !0) {
                u.reset = !1, x = -1;
                continue;
              }
              var g = u.orderedModifiers[x], O = g.fn, C = g.options, V = C === void 0 ? {} : C, j = g.name;
              typeof O == "function" && (u = O({
                state: u,
                options: V,
                name: j,
                instance: b
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: bu(function() {
        return new Promise(function(h) {
          b.forceUpdate(), h(u);
        });
      }),
      destroy: function() {
        v(), f = !0;
      }
    };
    if (!wi(l, c))
      return b;
    b.setOptions(p).then(function(h) {
      !f && p.onFirstUpdate && p.onFirstUpdate(h);
    });
    function y() {
      u.orderedModifiers.forEach(function(h) {
        var E = h.name, M = h.options, w = M === void 0 ? {} : M, x = h.effect;
        if (typeof x == "function") {
          var g = x({
            state: u,
            name: E,
            instance: b,
            options: w
          }), O = function() {
          };
          m.push(g || O);
        }
      });
    }
    function v() {
      m.forEach(function(h) {
        return h();
      }), m = [];
    }
    return b;
  };
}
var wu = [Up, su, Fp, Rp, iu, eu, pu, jp, nu], xu = /* @__PURE__ */ yu({
  defaultModifiers: wu
});
const ja = "Popper";
function Eu(e) {
  return Sa(ja, e);
}
Qc(ja, ["root"]);
const Tu = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], ku = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Nu(e, t) {
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
function qn(e) {
  return typeof e == "function" ? e() : e;
}
function nr(e) {
  return e.nodeType !== void 0;
}
function Ou(e) {
  return !nr(e);
}
const Su = () => st({
  root: ["root"]
}, qc(Eu)), Cu = {}, Pu = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: p,
    placement: u,
    popperOptions: m,
    popperRef: f,
    slotProps: b = {},
    slots: y = {},
    TransitionProps: v
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, h = fe(t, Tu), E = T.useRef(null), M = Ue(E, n), w = T.useRef(null), x = Ue(w, f), g = T.useRef(x);
  Tt(() => {
    g.current = x;
  }, [x]), T.useImperativeHandle(f, () => w.current, []);
  const O = Nu(u, s), [C, V] = T.useState(O), [j, F] = T.useState(qn(o));
  T.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), T.useEffect(() => {
    o && F(qn(o));
  }, [o]), Tt(() => {
    if (!j || !p)
      return;
    const z = (ee) => {
      V(ee.placement);
    };
    if (process.env.NODE_ENV !== "production" && j && nr(j) && j.nodeType === 1) {
      const ee = j.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ee.top === 0 && ee.left === 0 && ee.right === 0 && ee.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let $ = [{
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
        state: ee
      }) => {
        z(ee);
      }
    }];
    c != null && ($ = $.concat(c)), m && m.modifiers != null && ($ = $.concat(m.modifiers));
    const U = xu(j, E.current, k({
      placement: O
    }, m, {
      modifiers: $
    }));
    return g.current(U), () => {
      U.destroy(), g.current(null);
    };
  }, [j, l, c, p, m, O]);
  const S = {
    placement: C
  };
  v !== null && (S.TransitionProps = v);
  const I = Su(), R = (r = y.root) != null ? r : "div", L = kt({
    elementType: R,
    externalSlotProps: b.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: M
    },
    ownerState: t,
    className: I.root
  });
  return /* @__PURE__ */ d(R, k({}, L, {
    children: typeof i == "function" ? i(S) : i
  }));
}), Ba = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: p,
    open: u,
    placement: m = "bottom",
    popperOptions: f = Cu,
    popperRef: b,
    style: y,
    transition: v = !1,
    slotProps: h = {},
    slots: E = {}
  } = t, M = fe(t, ku), [w, x] = T.useState(!0), g = () => {
    x(!1);
  }, O = () => {
    x(!0);
  };
  if (!c && !u && (!v || w))
    return null;
  let C;
  if (i)
    C = i;
  else if (r) {
    const F = qn(r);
    C = F && nr(F) ? Oe(F).body : Oe(null).body;
  }
  const V = !u && c && (!v || w) ? "none" : void 0, j = v ? {
    in: u,
    onEnter: g,
    onExited: O
  } : void 0;
  return /* @__PURE__ */ d(hn, {
    disablePortal: l,
    container: C,
    children: /* @__PURE__ */ d(Pu, k({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: p,
      ref: n,
      open: v ? !w : u,
      placement: m,
      popperOptions: f,
      popperRef: b,
      slotProps: h,
      slots: E
    }, M, {
      style: k({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: V
      }, y),
      TransitionProps: j,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ba.propTypes = {
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
  anchorEl: Wt(a.oneOfType([ot, a.object, a.func]), (e) => {
    if (e.open) {
      const t = qn(e.anchorEl);
      if (t && nr(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Ou(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: a.oneOfType([a.node, a.func]),
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
  container: a.oneOfType([ot, a.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: a.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: a.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: a.arrayOf(a.shape({
    data: a.object,
    effect: a.func,
    enabled: a.bool,
    fn: a.func,
    name: a.any,
    options: a.object,
    phase: a.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: a.arrayOf(a.string),
    requiresIfExists: a.arrayOf(a.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: a.shape({
    modifiers: a.array,
    onFirstUpdate: a.func,
    placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: a.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: no,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: a.shape({
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: a.shape({
    root: a.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: a.bool
});
const Ru = ["values", "unit", "step"], $u = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => k({}, n, {
    [r.key]: r.val
  }), {});
};
function Iu(e) {
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
  } = e, o = fe(e, Ru), i = $u(t), s = Object.keys(i);
  function l(f) {
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n})`;
  }
  function c(f) {
    return `@media (max-width:${(typeof t[f] == "number" ? t[f] : f) - r / 100}${n})`;
  }
  function p(f, b) {
    const y = s.indexOf(b);
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n}) and (max-width:${(y !== -1 && typeof t[s[y]] == "number" ? t[s[y]] : b) - r / 100}${n})`;
  }
  function u(f) {
    return s.indexOf(f) + 1 < s.length ? p(f, s[s.indexOf(f) + 1]) : l(f);
  }
  function m(f) {
    const b = s.indexOf(f);
    return b === 0 ? l(s[1]) : b === s.length - 1 ? c(s[b]) : p(f, s[s.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  return k({
    keys: s,
    values: i,
    up: l,
    down: c,
    between: p,
    only: u,
    not: m,
    unit: n
  }, o);
}
const Mu = {
  borderRadius: 4
}, _u = Mu, Au = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, ft = Au;
function dn(e, t) {
  return t ? rt(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const po = {
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
}, xi = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${po[e]}px)`
};
function at(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || xi;
    return t.reduce((s, l, c) => (s[i.up(i.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || xi;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || po).indexOf(l) !== -1) {
        const c = i.up(l);
        s[c] = n(t[l], l);
      } else {
        const c = l;
        s[c] = t[c];
      }
      return s;
    }, {});
  }
  return n(t);
}
function Du(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function ju(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function rr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Yn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = rr(e, n) || r, t && (o = t(o, r, e)), o;
}
function xe(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const l = s[t], c = s.theme, p = rr(c, r) || {};
    return at(s, l, (m) => {
      let f = Yn(p, o, m);
      return m === f && typeof m == "string" && (f = Yn(p, o, `${t}${m === "default" ? "" : Ke(m)}`, m)), n === !1 ? f : {
        [n]: f
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: ft
  } : {}, i.filterProps = [t], i;
}
function Bu(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const Lu = {
  m: "margin",
  p: "padding"
}, Vu = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ei = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Fu = Bu((e) => {
  if (e.length > 2)
    if (Ei[e])
      e = Ei[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Lu[t], o = Vu[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), or = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], ir = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], zu = [...or, ...ir];
function Tn(e, t, n, r) {
  var o;
  const i = (o = rr(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function La(e) {
  return Tn(e, "spacing", 8, "spacing");
}
function kn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Uu(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = kn(t, n), r), {});
}
function Hu(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Fu(n), i = Uu(o, r), s = e[n];
  return at(e, s, i);
}
function Va(e, t) {
  const n = La(e.theme);
  return Object.keys(e).map((r) => Hu(e, t, r, n)).reduce(dn, {});
}
function be(e) {
  return Va(e, or);
}
be.propTypes = process.env.NODE_ENV !== "production" ? or.reduce((e, t) => (e[t] = ft, e), {}) : {};
be.filterProps = or;
function ve(e) {
  return Va(e, ir);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? ir.reduce((e, t) => (e[t] = ft, e), {}) : {};
ve.filterProps = ir;
process.env.NODE_ENV !== "production" && zu.reduce((e, t) => (e[t] = ft, e), {});
function Wu(e = 8) {
  if (e.mui)
    return e;
  const t = La({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function ar(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? dn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Fe(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Xe(e, t) {
  return xe({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Xu = Xe("border", Fe), qu = Xe("borderTop", Fe), Yu = Xe("borderRight", Fe), Gu = Xe("borderBottom", Fe), Ku = Xe("borderLeft", Fe), Ju = Xe("borderColor"), Zu = Xe("borderTopColor"), Qu = Xe("borderRightColor"), ed = Xe("borderBottomColor"), td = Xe("borderLeftColor"), nd = Xe("outline", Fe), rd = Xe("outlineColor"), sr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Tn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: kn(t, r)
    });
    return at(e, e.borderRadius, n);
  }
  return null;
};
sr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ft
} : {};
sr.filterProps = ["borderRadius"];
ar(Xu, qu, Yu, Gu, Ku, Ju, Zu, Qu, ed, td, sr, nd, rd);
const lr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Tn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: kn(t, r)
    });
    return at(e, e.gap, n);
  }
  return null;
};
lr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ft
} : {};
lr.filterProps = ["gap"];
const cr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Tn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: kn(t, r)
    });
    return at(e, e.columnGap, n);
  }
  return null;
};
cr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ft
} : {};
cr.filterProps = ["columnGap"];
const pr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Tn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: kn(t, r)
    });
    return at(e, e.rowGap, n);
  }
  return null;
};
pr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ft
} : {};
pr.filterProps = ["rowGap"];
const od = xe({
  prop: "gridColumn"
}), id = xe({
  prop: "gridRow"
}), ad = xe({
  prop: "gridAutoFlow"
}), sd = xe({
  prop: "gridAutoColumns"
}), ld = xe({
  prop: "gridAutoRows"
}), cd = xe({
  prop: "gridTemplateColumns"
}), pd = xe({
  prop: "gridTemplateRows"
}), ud = xe({
  prop: "gridTemplateAreas"
}), dd = xe({
  prop: "gridArea"
});
ar(lr, cr, pr, od, id, ad, sd, ld, cd, pd, ud, dd);
function jt(e, t) {
  return t === "grey" ? t : e;
}
const fd = xe({
  prop: "color",
  themeKey: "palette",
  transform: jt
}), md = xe({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: jt
}), hd = xe({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: jt
});
ar(fd, md, hd);
function Be(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const gd = xe({
  prop: "width",
  transform: Be
}), uo = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || po[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Be(n)
      };
    };
    return at(e, e.maxWidth, t);
  }
  return null;
};
uo.filterProps = ["maxWidth"];
const bd = xe({
  prop: "minWidth",
  transform: Be
}), vd = xe({
  prop: "height",
  transform: Be
}), yd = xe({
  prop: "maxHeight",
  transform: Be
}), wd = xe({
  prop: "minHeight",
  transform: Be
});
xe({
  prop: "size",
  cssProperty: "width",
  transform: Be
});
xe({
  prop: "size",
  cssProperty: "height",
  transform: Be
});
const xd = xe({
  prop: "boxSizing"
});
ar(gd, uo, bd, vd, yd, wd, xd);
const Ed = {
  // borders
  border: {
    themeKey: "borders",
    transform: Fe
  },
  borderTop: {
    themeKey: "borders",
    transform: Fe
  },
  borderRight: {
    themeKey: "borders",
    transform: Fe
  },
  borderBottom: {
    themeKey: "borders",
    transform: Fe
  },
  borderLeft: {
    themeKey: "borders",
    transform: Fe
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
    transform: Fe
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: sr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: jt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: jt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: jt
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
    style: lr
  },
  rowGap: {
    style: pr
  },
  columnGap: {
    style: cr
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
    transform: Be
  },
  maxWidth: {
    style: uo
  },
  minWidth: {
    transform: Be
  },
  height: {
    transform: Be
  },
  maxHeight: {
    transform: Be
  },
  minHeight: {
    transform: Be
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
}, fo = Ed;
function Td(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function kd(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Nd() {
  function e(n, r, o, i) {
    const s = {
      [n]: r,
      theme: o
    }, l = i[n];
    if (!l)
      return {
        [n]: r
      };
    const {
      cssProperty: c = n,
      themeKey: p,
      transform: u,
      style: m
    } = l;
    if (r == null)
      return null;
    if (p === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const f = rr(o, p) || {};
    return m ? m(s) : at(s, r, (y) => {
      let v = Yn(f, u, y);
      return y === v && typeof y == "string" && (v = Yn(f, u, `${n}${y === "default" ? "" : Ke(y)}`, y)), c === !1 ? v : {
        [c]: v
      };
    });
  }
  function t(n) {
    var r;
    const {
      sx: o,
      theme: i = {}
    } = n || {};
    if (!o)
      return null;
    const s = (r = i.unstable_sxConfig) != null ? r : fo;
    function l(c) {
      let p = c;
      if (typeof c == "function")
        p = c(i);
      else if (typeof c != "object")
        return c;
      if (!p)
        return null;
      const u = Du(i.breakpoints), m = Object.keys(u);
      let f = u;
      return Object.keys(p).forEach((b) => {
        const y = kd(p[b], i);
        if (y != null)
          if (typeof y == "object")
            if (s[b])
              f = dn(f, e(b, y, i, s));
            else {
              const v = at({
                theme: i
              }, y, (h) => ({
                [b]: h
              }));
              Td(v, y) ? f[b] = t({
                sx: y,
                theme: i
              }) : f = dn(f, v);
            }
          else
            f = dn(f, e(b, y, i, s));
      }), ju(m, f);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Fa = Nd();
Fa.filterProps = ["sx"];
const mo = Fa;
function Od(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const Sd = ["breakpoints", "palette", "spacing", "shape"];
function ho(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = fe(e, Sd), l = Iu(n), c = Wu(o);
  let p = rt({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: k({
      mode: "light"
    }, r),
    spacing: c,
    shape: k({}, _u, i)
  }, s);
  return p.applyStyles = Od, p = t.reduce((u, m) => rt(u, m), p), p.unstable_sxConfig = k({}, fo, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(m) {
    return mo({
      sx: m,
      theme: this
    });
  }, p;
}
function Cd(e) {
  return Object.keys(e).length === 0;
}
function za(e = null) {
  const t = T.useContext(ml);
  return !t || Cd(t) ? e : t;
}
const Pd = ho();
function Ua(e = Pd) {
  return za(e);
}
const Rd = ["ownerState"], $d = ["variants"], Id = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Md(e) {
  return Object.keys(e).length === 0;
}
function _d(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function jn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Ad = ho(), Ti = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function In({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Md(t) ? e : t[n] || t;
}
function Dd(e) {
  return e ? (t, n) => n[e] : null;
}
function Bn(e, t) {
  let {
    ownerState: n
  } = t, r = fe(t, Rd);
  const o = typeof e == "function" ? e(k({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Bn(i, k({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = fe(o, $d);
    return i.forEach((c) => {
      let p = !0;
      typeof c.props == "function" ? p = c.props(k({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((u) => {
        (n == null ? void 0 : n[u]) !== c.props[u] && r[u] !== c.props[u] && (p = !1);
      }), p && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(k({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function jd(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Ad,
    rootShouldForwardProp: r = jn,
    slotShouldForwardProp: o = jn
  } = e, i = (s) => mo(k({}, s, {
    theme: In(k({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, l = {}) => {
    hl(s, (g) => g.filter((O) => !(O != null && O.__mui_systemSx)));
    const {
      name: c,
      slot: p,
      skipVariantsResolver: u,
      skipSx: m,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = Dd(Ti(p))
    } = l, b = fe(l, Id), y = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      p && p !== "Root" && p !== "root" || !1
    ), v = m || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${Ti(p || "Root")}`);
    let E = jn;
    p === "Root" || p === "root" ? E = r : p ? E = o : _d(s) && (E = void 0);
    const M = fl(s, k({
      shouldForwardProp: E,
      label: h
    }, b)), w = (g) => typeof g == "function" && g.__emotion_real !== g || yt(g) ? (O) => Bn(g, k({}, O, {
      theme: In({
        theme: O.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : g, x = (g, ...O) => {
      let C = w(g);
      const V = O ? O.map(w) : [];
      c && f && V.push((S) => {
        const I = In(k({}, S, {
          defaultTheme: n,
          themeId: t
        }));
        if (!I.components || !I.components[c] || !I.components[c].styleOverrides)
          return null;
        const R = I.components[c].styleOverrides, L = {};
        return Object.entries(R).forEach(([z, $]) => {
          L[z] = Bn($, k({}, S, {
            theme: I
          }));
        }), f(S, L);
      }), c && !y && V.push((S) => {
        var I;
        const R = In(k({}, S, {
          defaultTheme: n,
          themeId: t
        })), L = R == null || (I = R.components) == null || (I = I[c]) == null ? void 0 : I.variants;
        return Bn({
          variants: L
        }, k({}, S, {
          theme: R
        }));
      }), v || V.push(i);
      const j = V.length - O.length;
      if (Array.isArray(g) && j > 0) {
        const S = new Array(j).fill("");
        C = [...g, ...S], C.raw = [...g.raw, ...S];
      }
      const F = M(C, ...V);
      if (process.env.NODE_ENV !== "production") {
        let S;
        c && (S = `${c}${Ke(p || "")}`), S === void 0 && (S = `Styled(${xc(s)})`), F.displayName = S;
      }
      return s.muiName && (F.muiName = s.muiName), F;
    };
    return M.withConfig && (x.withConfig = M.withConfig), x;
  };
}
function Bd(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : xa(t.components[n].defaultProps, r);
}
function Ld({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = Ua(n);
  return r && (o = o[r] || o), Bd({
    theme: o,
    name: t,
    props: e
  });
}
function go(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Hc(e, t, n);
}
function Vd(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ot(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Ot(Vd(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Bt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Bt(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function ur(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Fd(e) {
  e = Ot(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (p, u = (p + n / 30) % 12) => o - i * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), ur({
    type: l,
    values: c
  });
}
function ki(e) {
  e = Ot(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Ot(Fd(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ni(e, t) {
  const n = ki(e), r = ki(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Gn(e, t) {
  return e = Ot(e), t = go(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, ur(e);
}
function zd(e, t) {
  if (e = Ot(e), t = go(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return ur(e);
}
function Ud(e, t) {
  if (e = Ot(e), t = go(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return ur(e);
}
function Hd(e, t) {
  return k({
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
const Wd = {
  black: "#000",
  white: "#fff"
}, vn = Wd, Xd = {
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
}, qd = Xd, Yd = {
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
}, Ct = Yd, Gd = {
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
}, Pt = Gd, Kd = {
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
}, en = Kd, Jd = {
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
}, Rt = Jd, Zd = {
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
}, $t = Zd, Qd = {
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
}, It = Qd, ef = ["mode", "contrastThreshold", "tonalOffset"], Oi = {
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
    paper: vn.white,
    default: vn.white
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
}, Nr = {
  text: {
    primary: vn.white,
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
    active: vn.white,
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
function Si(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Ud(e.main, o) : t === "dark" && (e.dark = zd(e.main, i)));
}
function tf(e = "light") {
  return e === "dark" ? {
    main: Rt[200],
    light: Rt[50],
    dark: Rt[400]
  } : {
    main: Rt[700],
    light: Rt[400],
    dark: Rt[800]
  };
}
function nf(e = "light") {
  return e === "dark" ? {
    main: Ct[200],
    light: Ct[50],
    dark: Ct[400]
  } : {
    main: Ct[500],
    light: Ct[300],
    dark: Ct[700]
  };
}
function rf(e = "light") {
  return e === "dark" ? {
    main: Pt[500],
    light: Pt[300],
    dark: Pt[700]
  } : {
    main: Pt[700],
    light: Pt[400],
    dark: Pt[800]
  };
}
function of(e = "light") {
  return e === "dark" ? {
    main: $t[400],
    light: $t[300],
    dark: $t[700]
  } : {
    main: $t[700],
    light: $t[500],
    dark: $t[900]
  };
}
function af(e = "light") {
  return e === "dark" ? {
    main: It[400],
    light: It[300],
    dark: It[700]
  } : {
    main: It[800],
    light: It[500],
    dark: It[900]
  };
}
function sf(e = "light") {
  return e === "dark" ? {
    main: en[400],
    light: en[300],
    dark: en[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: en[500],
    dark: en[900]
  };
}
function lf(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = fe(e, ef), i = e.primary || tf(t), s = e.secondary || nf(t), l = e.error || rf(t), c = e.info || of(t), p = e.success || af(t), u = e.warning || sf(t);
  function m(v) {
    const h = Ni(v, Nr.text.primary) >= n ? Nr.text.primary : Oi.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = Ni(v, h);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${h} on ${v}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const f = ({
    color: v,
    name: h,
    mainShade: E = 500,
    lightShade: M = 300,
    darkShade: w = 700
  }) => {
    if (v = k({}, v), !v.main && v[E] && (v.main = v[E]), !v.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : Bt(11, h ? ` (${h})` : "", E));
    if (typeof v.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(v.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Bt(12, h ? ` (${h})` : "", JSON.stringify(v.main)));
    return Si(v, "light", M, r), Si(v, "dark", w, r), v.contrastText || (v.contrastText = m(v.main)), v;
  }, b = {
    dark: Nr,
    light: Oi
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), rt(k({
    // A collection of common colors.
    common: k({}, vn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: f({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: f({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: f({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: f({
      color: u,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: f({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: f({
      color: p,
      name: "success"
    }),
    // The grey colors.
    grey: qd,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: m,
    // Generate a rich color object.
    augmentColor: f,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, b[t]), o);
}
const cf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function pf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ci = {
  textTransform: "uppercase"
}, Pi = '"Roboto", "Helvetica", "Arial", sans-serif';
function uf(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Pi,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: p = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: m
  } = n, f = fe(n, cf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof p != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, y = m || ((E) => `${E / p * b}rem`), v = (E, M, w, x, g) => k({
    fontFamily: r,
    fontWeight: E,
    fontSize: y(M),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, r === Pi ? {
    letterSpacing: `${pf(x / M)}em`
  } : {}, g, u), h = {
    h1: v(i, 96, 1.167, -1.5),
    h2: v(i, 60, 1.2, -0.5),
    h3: v(s, 48, 1.167, 0),
    h4: v(s, 34, 1.235, 0.25),
    h5: v(s, 24, 1.334, 0),
    h6: v(l, 20, 1.6, 0.15),
    subtitle1: v(s, 16, 1.75, 0.15),
    subtitle2: v(l, 14, 1.57, 0.1),
    body1: v(s, 16, 1.5, 0.15),
    body2: v(s, 14, 1.43, 0.15),
    button: v(l, 14, 1.75, 0.4, Ci),
    caption: v(s, 12, 1.66, 0.4),
    overline: v(s, 12, 2.66, 1, Ci),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return rt(k({
    htmlFontSize: p,
    pxToRem: y,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, h), f, {
    clone: !1
    // No need to clone deep
  });
}
const df = 0.2, ff = 0.14, mf = 0.12;
function ge(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${df})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ff})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${mf})`].join(",");
}
const hf = ["none", ge(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ge(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ge(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ge(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ge(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ge(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ge(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ge(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ge(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ge(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ge(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ge(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ge(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ge(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ge(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ge(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ge(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ge(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ge(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ge(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ge(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ge(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ge(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ge(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], gf = hf, bf = ["duration", "easing", "delay"], vf = {
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
function Ri(e) {
  return `${Math.round(e)}ms`;
}
function wf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function xf(e) {
  const t = k({}, vf, e.easing), n = k({}, yf, e.duration);
  return k({
    getAutoHeightDuration: wf,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, p = fe(i, bf);
      if (process.env.NODE_ENV !== "production") {
        const u = (f) => typeof f == "string", m = (f) => !isNaN(parseFloat(f));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !m(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !m(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(p).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : Ri(s)} ${l} ${typeof c == "string" ? c : Ri(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Ef = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Tf = Ef, kf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Nf(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = fe(e, kf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Bt(18));
  const l = lf(r), c = ho(e);
  let p = rt(c, {
    mixins: Hd(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: gf.slice(),
    typography: uf(l, i),
    transitions: xf(o),
    zIndex: k({}, Tf)
  });
  if (p = rt(p, s), p = t.reduce((u, m) => rt(u, m), p), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], m = (f, b) => {
      let y;
      for (y in f) {
        const v = f[y];
        if (u.indexOf(y) !== -1 && Object.keys(v).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = Ze("", y);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: v
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          f[y] = {};
        }
      }
    };
    Object.keys(p.components).forEach((f) => {
      const b = p.components[f].styleOverrides;
      b && f.indexOf("Mui") === 0 && m(b, f);
    });
  }
  return p.unstable_sxConfig = k({}, fo, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(m) {
    return mo({
      sx: m,
      theme: this
    });
  }, p;
}
const Of = Nf(), bo = Of, vo = "$$material", Ha = (e) => jn(e) && e !== "classes", Sf = jd({
  themeId: vo,
  defaultTheme: bo,
  rootShouldForwardProp: Ha
}), Se = Sf;
function Nn() {
  const e = Ua(bo);
  return process.env.NODE_ENV !== "production" && T.useDebugValue(e), e[vo] || e;
}
function lt({
  props: e,
  name: t
}) {
  return Ld({
    props: e,
    name: t,
    defaultTheme: bo,
    themeId: vo
  });
}
function Vr(e, t) {
  return Vr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Vr(e, t);
}
function Cf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Vr(e, t);
}
const $i = {
  disabled: !1
};
var Pf = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
  enter: a.number,
  exit: a.number,
  appear: a.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && a.oneOfType([a.string, a.shape({
  enter: a.string,
  exit: a.string,
  active: a.string
}), a.shape({
  enter: a.string,
  enterDone: a.string,
  enterActive: a.string,
  exit: a.string,
  exitDone: a.string,
  exitActive: a.string
})]);
const Wa = Z.createContext(null);
var Rf = function(t) {
  return t.scrollTop;
}, sn = "unmounted", bt = "exited", vt = "entering", At = "entered", Fr = "exiting", ct = /* @__PURE__ */ function(e) {
  Cf(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = bt, i.appearStatus = vt) : c = At : r.unmountOnExit || r.mountOnEnter ? c = sn : c = bt, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === sn ? {
      status: bt
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== vt && s !== At && (i = vt) : (s === vt || s === At) && (i = Fr);
    }
    this.updateStatus(!1, i);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, i, s, l;
    return i = s = l = o, o != null && typeof o != "number" && (i = o.exit, s = o.enter, l = o.appear !== void 0 ? o.appear : s), {
      exit: i,
      enter: s,
      appear: l
    };
  }, n.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === vt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Pn.findDOMNode(this);
          s && Rf(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === bt && this.setState({
        status: sn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Pn.findDOMNode(this), l], p = c[0], u = c[1], m = this.getTimeouts(), f = l ? m.appear : m.enter;
    if (!o && !s || $i.disabled) {
      this.safeSetState({
        status: At
      }, function() {
        i.props.onEntered(p);
      });
      return;
    }
    this.props.onEnter(p, u), this.safeSetState({
      status: vt
    }, function() {
      i.props.onEntering(p, u), i.onTransitionEnd(f, function() {
        i.safeSetState({
          status: At
        }, function() {
          i.props.onEntered(p, u);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Pn.findDOMNode(this);
    if (!i || $i.disabled) {
      this.safeSetState({
        status: bt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Fr
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: bt
        }, function() {
          o.props.onExited(l);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(o, i) {
    i = this.setNextCallback(i), this.setState(o, i);
  }, n.setNextCallback = function(o) {
    var i = this, s = !0;
    return this.nextCallback = function(l) {
      s && (s = !1, i.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      s = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var s = this.props.nodeRef ? this.props.nodeRef.current : Pn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!s || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], p = c[0], u = c[1];
      this.props.addEndListener(p, u);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === sn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = fe(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Z.createElement(Wa.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : Z.cloneElement(Z.Children.only(s), l))
    );
  }, t;
}(Z.Component);
ct.contextType = Wa;
ct.propTypes = process.env.NODE_ENV !== "production" ? {
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
  nodeRef: a.shape({
    current: typeof Element > "u" ? a.any : function(e, t, n, r, o, i) {
      var s = e[t];
      return a.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, i);
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
  children: a.oneOfType([a.func.isRequired, a.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: a.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: a.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: a.bool,
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
  appear: a.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: a.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: a.bool,
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
    var n = Pf;
    t.addEndListener || (n = n.isRequired);
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
      o[i - 1] = arguments[i];
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
  addEndListener: a.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: a.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: a.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: a.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: a.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: a.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: a.func
} : {};
function Mt() {
}
ct.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Mt,
  onEntering: Mt,
  onEntered: Mt,
  onExit: Mt,
  onExiting: Mt,
  onExited: Mt
};
ct.UNMOUNTED = sn;
ct.EXITED = bt;
ct.ENTERING = vt;
ct.ENTERED = At;
ct.EXITING = Fr;
const Xa = ct, qa = (e) => e.scrollTop;
function Kn(e, t) {
  var n, r;
  const {
    timeout: o,
    easing: i,
    style: s = {}
  } = e;
  return {
    duration: (n = s.transitionDuration) != null ? n : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof i == "object" ? i[t.mode] : i,
    delay: s.transitionDelay
  };
}
const $f = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function zr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const If = {
  entering: {
    opacity: 1,
    transform: zr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Or = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), yo = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: p,
    onEntering: u,
    onExit: m,
    onExited: f,
    onExiting: b,
    style: y,
    timeout: v = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = Xa
  } = t, E = fe(t, $f), M = on(), w = T.useRef(), x = Nn(), g = T.useRef(null), O = Ue(g, i.ref, n), C = (z) => ($) => {
    if (z) {
      const U = g.current;
      $ === void 0 ? z(U) : z(U, $);
    }
  }, V = C(u), j = C((z, $) => {
    qa(z);
    const {
      duration: U,
      delay: ee,
      easing: Q
    } = Kn({
      style: y,
      timeout: v,
      easing: s
    }, {
      mode: "enter"
    });
    let N;
    v === "auto" ? (N = x.transitions.getAutoHeightDuration(z.clientHeight), w.current = N) : N = U, z.style.transition = [x.transitions.create("opacity", {
      duration: N,
      delay: ee
    }), x.transitions.create("transform", {
      duration: Or ? N : N * 0.666,
      delay: ee,
      easing: Q
    })].join(","), c && c(z, $);
  }), F = C(p), S = C(b), I = C((z) => {
    const {
      duration: $,
      delay: U,
      easing: ee
    } = Kn({
      style: y,
      timeout: v,
      easing: s
    }, {
      mode: "exit"
    });
    let Q;
    v === "auto" ? (Q = x.transitions.getAutoHeightDuration(z.clientHeight), w.current = Q) : Q = $, z.style.transition = [x.transitions.create("opacity", {
      duration: Q,
      delay: U
    }), x.transitions.create("transform", {
      duration: Or ? Q : Q * 0.666,
      delay: Or ? U : U || Q * 0.333,
      easing: ee
    })].join(","), z.style.opacity = 0, z.style.transform = zr(0.75), m && m(z);
  }), R = C(f);
  return /* @__PURE__ */ d(h, k({
    appear: o,
    in: l,
    nodeRef: g,
    onEnter: j,
    onEntered: F,
    onEntering: V,
    onExit: I,
    onExited: R,
    onExiting: S,
    addEndListener: (z) => {
      v === "auto" && M.start(w.current || 0, z), r && r(g.current, z);
    },
    timeout: v === "auto" ? null : v
  }, E, {
    children: (z, $) => /* @__PURE__ */ T.cloneElement(i, k({
      style: k({
        opacity: 0,
        transform: zr(0.75),
        visibility: z === "exited" && !l ? "hidden" : void 0
      }, If[z], y, i.props.style),
      ref: O
    }, $))
  }));
});
process.env.NODE_ENV !== "production" && (yo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: a.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: a.bool,
  /**
   * A single child content element.
   */
  children: yn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: a.oneOfType([a.shape({
    enter: a.string,
    exit: a.string
  }), a.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: a.bool,
  /**
   * @ignore
   */
  onEnter: a.func,
  /**
   * @ignore
   */
  onEntered: a.func,
  /**
   * @ignore
   */
  onEntering: a.func,
  /**
   * @ignore
   */
  onExit: a.func,
  /**
   * @ignore
   */
  onExited: a.func,
  /**
   * @ignore
   */
  onExiting: a.func,
  /**
   * @ignore
   */
  style: a.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: a.oneOfType([a.oneOf(["auto"]), a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })])
});
yo.muiSupportAuto = !0;
const Ur = yo, Mf = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Ii = Mf, _f = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Af = Se(Ba, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ya = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const o = za(), i = lt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: p,
    container: u,
    disablePortal: m,
    keepMounted: f,
    modifiers: b,
    open: y,
    placement: v,
    popperOptions: h,
    popperRef: E,
    transition: M,
    slots: w,
    slotProps: x
  } = i, g = fe(i, _f), O = (r = w == null ? void 0 : w.root) != null ? r : c == null ? void 0 : c.Root, C = k({
    anchorEl: s,
    container: u,
    disablePortal: m,
    keepMounted: f,
    modifiers: b,
    open: y,
    placement: v,
    popperOptions: h,
    popperRef: E,
    transition: M
  }, g);
  return /* @__PURE__ */ d(Af, k({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: O
    },
    slotProps: x ?? p
  }, C, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Ya.propTypes = {
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
  anchorEl: a.oneOfType([ot, a.object, a.func]),
  /**
   * Popper render function or node.
   */
  children: a.oneOfType([a.node, a.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: a.shape({
    Root: a.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: a.shape({
    root: a.oneOfType([a.func, a.object])
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
  container: a.oneOfType([ot, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: a.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: a.arrayOf(a.shape({
    data: a.object,
    effect: a.func,
    enabled: a.bool,
    fn: a.func,
    name: a.any,
    options: a.object,
    phase: a.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: a.arrayOf(a.string),
    requiresIfExists: a.arrayOf(a.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: a.shape({
    modifiers: a.array,
    onFirstUpdate: a.func,
    placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: a.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: no,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: a.shape({
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: a.shape({
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: a.bool
});
const Ga = Ya;
function Df(e) {
  return Ze("MuiTooltip", e);
}
const jf = ut("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), pt = jf, Bf = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Lf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Vf = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ke(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return st(s, Df, t);
}, Ff = Se(Ga, {
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
}) => k({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${pt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${pt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${pt.arrow}`]: k({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${pt.arrow}`]: k({}, t.isRtl ? {
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
})), zf = Se("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Ke(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => k({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Gn(e.palette.grey[700], 0.92),
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
  lineHeight: `${Lf(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${pt.popper}[data-popper-placement*="left"] &`]: k({
    transformOrigin: "right center"
  }, t.isRtl ? k({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : k({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${pt.popper}[data-popper-placement*="right"] &`]: k({
    transformOrigin: "left center"
  }, t.isRtl ? k({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : k({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${pt.popper}[data-popper-placement*="top"] &`]: k({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${pt.popper}[data-popper-placement*="bottom"] &`]: k({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), Uf = Se("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Gn(e.palette.grey[700], 0.9),
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
let Mn = !1;
const Mi = new wn();
let tn = {
  x: 0,
  y: 0
};
function _n(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Ka = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i, s, l, c, p, u, m, f, b, y, v, h, E, M, w, x, g;
  const O = lt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: C = !1,
    children: V,
    components: j = {},
    componentsProps: F = {},
    describeChild: S = !1,
    disableFocusListener: I = !1,
    disableHoverListener: R = !1,
    disableInteractive: L = !1,
    disableTouchListener: z = !1,
    enterDelay: $ = 100,
    enterNextDelay: U = 0,
    enterTouchDelay: ee = 700,
    followCursor: Q = !1,
    id: N,
    leaveDelay: _ = 0,
    leaveTouchDelay: D = 1500,
    onClose: q,
    onOpen: W,
    open: G,
    placement: Y = "bottom",
    PopperComponent: B,
    PopperProps: H = {},
    slotProps: J = {},
    slots: te = {},
    title: ie,
    TransitionComponent: A = Ur,
    TransitionProps: ne
  } = O, P = fe(O, Bf), ae = /* @__PURE__ */ T.isValidElement(V) ? V : /* @__PURE__ */ d("span", {
    children: V
  }), Ee = Nn(), Ce = Ee.direction === "rtl", [we, mt] = T.useState(), [Pe, Qe] = T.useState(null), Ae = T.useRef(!1), et = L || Q, Te = on(), St = on(), ht = on(), Xt = on(), [On, To] = ha({
    controlled: G,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let tt = On;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: re
    } = T.useRef(G !== void 0);
    T.useEffect(() => {
      we && we.disabled && !re && ie !== "" && we.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, we, re]);
  }
  const dr = ma(N), qt = T.useRef(), Sn = mn(() => {
    qt.current !== void 0 && (document.body.style.WebkitUserSelect = qt.current, qt.current = void 0), Xt.clear();
  });
  T.useEffect(() => Sn, [Sn]);
  const ko = (re) => {
    Mi.clear(), Mn = !0, To(!0), W && !tt && W(re);
  }, Cn = mn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (re) => {
      Mi.start(800 + _, () => {
        Mn = !1;
      }), To(!1), q && tt && q(re), Te.start(Ee.transitions.duration.shortest, () => {
        Ae.current = !1;
      });
    }
  ), fr = (re) => {
    Ae.current && re.type !== "touchstart" || (we && we.removeAttribute("title"), St.clear(), ht.clear(), $ || Mn && U ? St.start(Mn ? U : $, () => {
      ko(re);
    }) : ko(re));
  }, No = (re) => {
    St.clear(), ht.start(_, () => {
      Cn(re);
    });
  }, {
    isFocusVisibleRef: Oo,
    onBlur: ms,
    onFocus: hs,
    ref: gs
  } = ga(), [, So] = T.useState(!1), Co = (re) => {
    ms(re), Oo.current === !1 && (So(!1), No(re));
  }, Po = (re) => {
    we || mt(re.currentTarget), hs(re), Oo.current === !0 && (So(!0), fr(re));
  }, Ro = (re) => {
    Ae.current = !0;
    const De = ae.props;
    De.onTouchStart && De.onTouchStart(re);
  }, $o = fr, Io = No, bs = (re) => {
    Ro(re), ht.clear(), Te.clear(), Sn(), qt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Xt.start(ee, () => {
      document.body.style.WebkitUserSelect = qt.current, fr(re);
    });
  }, vs = (re) => {
    ae.props.onTouchEnd && ae.props.onTouchEnd(re), Sn(), ht.start(D, () => {
      Cn(re);
    });
  };
  T.useEffect(() => {
    if (!tt)
      return;
    function re(De) {
      (De.key === "Escape" || De.key === "Esc") && Cn(De);
    }
    return document.addEventListener("keydown", re), () => {
      document.removeEventListener("keydown", re);
    };
  }, [Cn, tt]);
  const ys = Ue(ae.ref, gs, mt, n);
  !ie && ie !== 0 && (tt = !1);
  const mr = T.useRef(), ws = (re) => {
    const De = ae.props;
    De.onMouseMove && De.onMouseMove(re), tn = {
      x: re.clientX,
      y: re.clientY
    }, mr.current && mr.current.update();
  }, Yt = {}, hr = typeof ie == "string";
  S ? (Yt.title = !tt && hr && !R ? ie : null, Yt["aria-describedby"] = tt ? dr : null) : (Yt["aria-label"] = hr ? ie : null, Yt["aria-labelledby"] = tt && !hr ? dr : null);
  const Ve = k({}, Yt, P, ae.props, {
    className: Ne(P.className, ae.props.className),
    onTouchStart: Ro,
    ref: ys
  }, Q ? {
    onMouseMove: ws
  } : {});
  process.env.NODE_ENV !== "production" && (Ve["data-mui-internal-clone-element"] = !0, T.useEffect(() => {
    we && !we.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [we]));
  const Gt = {};
  z || (Ve.onTouchStart = bs, Ve.onTouchEnd = vs), R || (Ve.onMouseOver = _n($o, Ve.onMouseOver), Ve.onMouseLeave = _n(Io, Ve.onMouseLeave), et || (Gt.onMouseOver = $o, Gt.onMouseLeave = Io)), I || (Ve.onFocus = _n(Po, Ve.onFocus), Ve.onBlur = _n(Co, Ve.onBlur), et || (Gt.onFocus = Po, Gt.onBlur = Co)), process.env.NODE_ENV !== "production" && ae.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));
  const xs = T.useMemo(() => {
    var re;
    let De = [{
      name: "arrow",
      enabled: !!Pe,
      options: {
        element: Pe,
        padding: 4
      }
    }];
    return (re = H.popperOptions) != null && re.modifiers && (De = De.concat(H.popperOptions.modifiers)), k({}, H.popperOptions, {
      modifiers: De
    });
  }, [Pe, H]), Kt = k({}, O, {
    isRtl: Ce,
    arrow: C,
    disableInteractive: et,
    placement: Y,
    PopperComponentProp: B,
    touch: Ae.current
  }), gr = Vf(Kt), Mo = (r = (o = te.popper) != null ? o : j.Popper) != null ? r : Ff, _o = (i = (s = (l = te.transition) != null ? l : j.Transition) != null ? s : A) != null ? i : Ur, Ao = (c = (p = te.tooltip) != null ? p : j.Tooltip) != null ? c : zf, Do = (u = (m = te.arrow) != null ? m : j.Arrow) != null ? u : Uf, Es = an(Mo, k({}, H, (f = J.popper) != null ? f : F.popper, {
    className: Ne(gr.popper, H == null ? void 0 : H.className, (b = (y = J.popper) != null ? y : F.popper) == null ? void 0 : b.className)
  }), Kt), Ts = an(_o, k({}, ne, (v = J.transition) != null ? v : F.transition), Kt), ks = an(Ao, k({}, (h = J.tooltip) != null ? h : F.tooltip, {
    className: Ne(gr.tooltip, (E = (M = J.tooltip) != null ? M : F.tooltip) == null ? void 0 : E.className)
  }), Kt), Ns = an(Do, k({}, (w = J.arrow) != null ? w : F.arrow, {
    className: Ne(gr.arrow, (x = (g = J.arrow) != null ? g : F.arrow) == null ? void 0 : x.className)
  }), Kt);
  return /* @__PURE__ */ X(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(ae, Ve), /* @__PURE__ */ d(Mo, k({
      as: B ?? Ga,
      placement: Y,
      anchorEl: Q ? {
        getBoundingClientRect: () => ({
          top: tn.y,
          left: tn.x,
          right: tn.x,
          bottom: tn.y,
          width: 0,
          height: 0
        })
      } : we,
      popperRef: mr,
      open: we ? tt : !1,
      id: dr,
      transition: !0
    }, Gt, Es, {
      popperOptions: xs,
      children: ({
        TransitionProps: re
      }) => /* @__PURE__ */ d(_o, k({
        timeout: Ee.transitions.duration.shorter
      }, re, Ts, {
        children: /* @__PURE__ */ X(Ao, k({}, ks, {
          children: [ie, C ? /* @__PURE__ */ d(Do, k({}, Ns, {
            ref: Qe
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Ka.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: a.bool,
  /**
   * Tooltip reference element.
   */
  children: yn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: a.shape({
    Arrow: a.elementType,
    Popper: a.elementType,
    Tooltip: a.elementType,
    Transition: a.elementType
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
  componentsProps: a.shape({
    arrow: a.object,
    popper: a.object,
    tooltip: a.object,
    transition: a.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: a.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: a.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: a.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: a.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: a.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: a.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: a.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: a.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: a.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: a.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: a.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: a.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: a.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: a.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: a.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: a.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: a.shape({
    arrow: a.object,
    popper: a.object,
    tooltip: a.object,
    transition: a.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: a.shape({
    arrow: a.elementType,
    popper: a.elementType,
    tooltip: a.elementType,
    transition: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: a.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: a.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: a.object
});
const Hf = Ka;
var wo = {}, Ja = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ja);
var Wf = Ja.exports, Sr = {};
function Xf(e) {
  return Ze("MuiSvgIcon", e);
}
ut("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const qf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Yf = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ke(t)}`, `fontSize${Ke(n)}`]
  };
  return st(o, Xf, r);
}, Gf = Se("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Ke(n.color)}`], t[`fontSize${Ke(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, s, l, c, p, u, m, f, b, y;
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
      small: ((i = e.typography) == null || (s = i.pxToRem) == null ? void 0 : s.call(i, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((p = e.typography) == null || (u = p.pxToRem) == null ? void 0 : u.call(p, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (m = (f = (e.vars || e).palette) == null || (f = f[t.color]) == null ? void 0 : f.main) != null ? m : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[t.color]
  };
}), xo = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = lt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: p,
    inheritViewBox: u = !1,
    titleAccess: m,
    viewBox: f = "0 0 24 24"
  } = r, b = fe(r, qf), y = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", v = k({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: u,
    viewBox: f,
    hasSvgAsChild: y
  }), h = {};
  u || (h.viewBox = f);
  const E = Yf(v);
  return /* @__PURE__ */ X(Gf, k({
    as: l,
    className: Ne(E.root, i),
    focusable: "false",
    color: p,
    "aria-hidden": m ? void 0 : !0,
    role: m ? "img" : void 0,
    ref: n
  }, h, b, y && o.props, {
    ownerState: v,
    children: [y ? o.props.children : o, m ? /* @__PURE__ */ d("title", {
      children: m
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (xo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: a.oneOfType([a.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), a.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: a.oneOfType([a.oneOf(["inherit", "large", "medium", "small"]), a.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: a.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: a.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: a.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: a.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: a.string
});
xo.muiName = "SvgIcon";
const _i = xo;
function Za(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ d(_i, k({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = _i.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(n));
}
const Kf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Ea.configure(e);
  }
}, Jf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ke,
  createChainedFunction: Ar,
  createSvgIcon: Za,
  debounce: fa,
  deprecatedPropType: Tc,
  isMuiElement: kc,
  ownerDocument: Oe,
  ownerWindow: Lt,
  requirePropFactory: Nc,
  setRef: Hn,
  unstable_ClassNameGenerator: Kf,
  unstable_useEnhancedEffect: Tt,
  unstable_useId: ma,
  unsupportedProp: Cc,
  useControlled: ha,
  useEventCallback: mn,
  useForkRef: Ue,
  useIsFocusVisible: ga
}, Symbol.toStringTag, { value: "Module" })), Zf = /* @__PURE__ */ nc(Jf);
var Ai;
function Qf() {
  return Ai || (Ai = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Zf;
  }(Sr)), Sr;
}
var em = Wf;
Object.defineProperty(wo, "__esModule", {
  value: !0
});
var Qa = wo.default = void 0, tm = em(Qf()), nm = Os;
Qa = wo.default = (0, tm.default)(/* @__PURE__ */ (0, nm.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Di(e, t, n) {
  return e ? /* @__PURE__ */ d(Wi, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ d("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function es(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: i = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: p = !1,
    isDense: u = !0,
    isSubMenuParent: m = !1,
    hasDisabledGutters: f = !1,
    hasDivider: b = !1,
    focusVisibleClassName: y,
    id: v,
    children: h
  } = e, E = /* @__PURE__ */ d(
    rl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: p,
      dense: u,
      disableGutters: f,
      divider: b,
      focusVisibleClassName: y,
      onClick: t,
      id: v,
      children: n ? /* @__PURE__ */ X(Jn, { children: [
        Di(i, n, !0),
        /* @__PURE__ */ d(ol, { primary: n, inset: !i && o }),
        m ? /* @__PURE__ */ d(Wi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ d(Qa, {}) }) : Di(s, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ d(Hf, { title: r, placement: "right", children: /* @__PURE__ */ d("div", { children: E }) }) : E;
}
function ts(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function rm(e) {
  const [t, n] = de(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (p) => {
    n(p.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let p = ts(i).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return p = p.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === r.id
    ), /* @__PURE__ */ d(Eo, { ...e, includedGroups: p });
  };
  return /* @__PURE__ */ X(Jn, { children: [
    /* @__PURE__ */ d(es, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ d(
      il,
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
const om = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function Eo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = Wr(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      ts(t).filter((y) => !("menuItem" in y.group))
    ), m = Object.values(u).sort(
      (y, v) => (y.group.order || 0) - (v.group.order || 0)
    ), f = [];
    m.forEach((y) => {
      om(y.id, t.items).forEach(
        (v) => f.push({ item: v, isLastItemInGroup: !1 })
      ), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !0);
    }), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !1);
    const b = f.some(
      (y) => "iconPathBefore" in y.item && y.item.iconPathBefore
    );
    return { items: f, allowForLeadingIcons: b };
  }, [o, t]), l = ({ item: u, isLastItemInGroup: m }) => ({
    className: "papi-menu-item",
    label: u.label,
    tooltip: u.tooltip,
    iconPathBefore: "iconPathBefore" in u ? u.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in u ? u.iconPathAfter : void 0,
    hasDivider: m,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ d("div", {});
  const p = c.item.group;
  return /* @__PURE__ */ d("div", { role: "menu", "aria-label": p, children: i.map((u, m) => {
    const { item: f } = u, b = l(u);
    if ("command" in f) {
      const y = f.group + m;
      return /* @__PURE__ */ d(
        es,
        {
          onClick: (v) => {
            n == null || n(v), r(f);
          },
          ...b
        },
        y
      );
    }
    return /* @__PURE__ */ d(
      rm,
      {
        parentMenuItem: f,
        parentItemProps: b,
        ...e
      },
      p + f.id
    );
  }) }, p);
}
function im(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ d(Eo, { ...e, includedGroups: i });
}
function am({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ X(
    Xi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ d("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ d(al, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ d(
          im,
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
function sm({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = Wr(() => {
    const s = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, p = o[c];
      typeof p == "object" && typeof p.order == "number" && !Number.isNaN(p.order) ? s.set(p.order, { id: c, metadata: p }) : console.warn(
        `Property ${l} (${typeof p}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ d(
    Xi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, l) => /* @__PURE__ */ d(
        am,
        {
          commandHandler: e,
          menuDefinition: n,
          ...s,
          className: t
        },
        l
      ))
    }
  );
}
const ns = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (ns.displayName = "ListContext");
const lm = ns;
function cm(e) {
  return Ze("MuiList", e);
}
ut("MuiList", ["root", "padding", "dense", "subheader"]);
const pm = ["children", "className", "component", "dense", "disablePadding", "subheader"], um = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return st({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, cm, t);
}, dm = Se("ul", {
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
}) => k({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), rs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = lt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: p
  } = r, u = fe(r, pm), m = T.useMemo(() => ({
    dense: l
  }), [l]), f = k({}, r, {
    component: s,
    dense: l,
    disablePadding: c
  }), b = um(f);
  return /* @__PURE__ */ d(lm.Provider, {
    value: m,
    children: /* @__PURE__ */ X(dm, k({
      as: s,
      className: Ne(b.root, i),
      ref: n,
      ownerState: f
    }, u, {
      children: [p, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (rs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: a.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: a.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: a.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object])
});
const fm = rs, mm = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Cr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function ji(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function os(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function nn(e, t, n, r, o, i) {
  let s = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !os(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const is = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: s,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: p = !1,
    onKeyDown: u,
    variant: m = "selectedMenu"
  } = t, f = fe(t, mm), b = T.useRef(null), y = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Tt(() => {
    o && b.current.focus();
  }, [o]), T.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (w, x) => {
      const g = !b.current.style.width;
      if (w.clientHeight < b.current.clientHeight && g) {
        const O = `${ba(Oe(w))}px`;
        b.current.style[x.direction === "rtl" ? "paddingLeft" : "paddingRight"] = O, b.current.style.width = `calc(100% + ${O})`;
      }
      return b.current;
    }
  }), []);
  const v = (w) => {
    const x = b.current, g = w.key, O = Oe(x).activeElement;
    if (g === "ArrowDown")
      w.preventDefault(), nn(x, O, p, c, Cr);
    else if (g === "ArrowUp")
      w.preventDefault(), nn(x, O, p, c, ji);
    else if (g === "Home")
      w.preventDefault(), nn(x, null, p, c, Cr);
    else if (g === "End")
      w.preventDefault(), nn(x, null, p, c, ji);
    else if (g.length === 1) {
      const C = y.current, V = g.toLowerCase(), j = performance.now();
      C.keys.length > 0 && (j - C.lastTime > 500 ? (C.keys = [], C.repeating = !0, C.previousKeyMatched = !0) : C.repeating && V !== C.keys[0] && (C.repeating = !1)), C.lastTime = j, C.keys.push(V);
      const F = O && !C.repeating && os(O, C);
      C.previousKeyMatched && (F || nn(x, O, !1, c, Cr, C)) ? w.preventDefault() : C.previousKeyMatched = !1;
    }
    u && u(w);
  }, h = Ue(b, n);
  let E = -1;
  T.Children.forEach(s, (w, x) => {
    if (!/* @__PURE__ */ T.isValidElement(w)) {
      E === x && (E += 1, E >= s.length && (E = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Un.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (m === "selectedMenu" && w.props.selected || E === -1) && (E = x), E === x && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (E += 1, E >= s.length && (E = -1));
  });
  const M = T.Children.map(s, (w, x) => {
    if (x === E) {
      const g = {};
      return i && (g.autoFocus = !0), w.props.tabIndex === void 0 && m === "selectedMenu" && (g.tabIndex = 0), /* @__PURE__ */ T.cloneElement(w, g);
    }
    return w;
  });
  return /* @__PURE__ */ d(fm, k({
    role: "menu",
    ref: h,
    className: l,
    onKeyDown: v,
    tabIndex: o ? 0 : -1
  }, f, {
    children: M
  }));
});
process.env.NODE_ENV !== "production" && (is.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: a.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: a.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: a.node,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: a.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: a.bool,
  /**
   * @ignore
   */
  onKeyDown: a.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: a.oneOf(["menu", "selectedMenu"])
});
const hm = is, gm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], bm = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, as = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = Nn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: l,
    easing: c,
    in: p,
    onEnter: u,
    onEntered: m,
    onEntering: f,
    onExit: b,
    onExited: y,
    onExiting: v,
    style: h,
    timeout: E = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: M = Xa
  } = t, w = fe(t, gm), x = T.useRef(null), g = Ue(x, l.ref, n), O = (L) => (z) => {
    if (L) {
      const $ = x.current;
      z === void 0 ? L($) : L($, z);
    }
  }, C = O(f), V = O((L, z) => {
    qa(L);
    const $ = Kn({
      style: h,
      timeout: E,
      easing: c
    }, {
      mode: "enter"
    });
    L.style.webkitTransition = r.transitions.create("opacity", $), L.style.transition = r.transitions.create("opacity", $), u && u(L, z);
  }), j = O(m), F = O(v), S = O((L) => {
    const z = Kn({
      style: h,
      timeout: E,
      easing: c
    }, {
      mode: "exit"
    });
    L.style.webkitTransition = r.transitions.create("opacity", z), L.style.transition = r.transitions.create("opacity", z), b && b(L);
  }), I = O(y);
  return /* @__PURE__ */ d(M, k({
    appear: s,
    in: p,
    nodeRef: x,
    onEnter: V,
    onEntered: j,
    onEntering: C,
    onExit: S,
    onExited: I,
    onExiting: F,
    addEndListener: (L) => {
      i && i(x.current, L);
    },
    timeout: E
  }, w, {
    children: (L, z) => /* @__PURE__ */ T.cloneElement(l, k({
      style: k({
        opacity: 0,
        visibility: L === "exited" && !p ? "hidden" : void 0
      }, bm[L], h, l.props.style),
      ref: g
    }, z))
  }));
});
process.env.NODE_ENV !== "production" && (as.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: a.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: a.bool,
  /**
   * A single child content element.
   */
  children: yn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: a.oneOfType([a.shape({
    enter: a.string,
    exit: a.string
  }), a.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: a.bool,
  /**
   * @ignore
   */
  onEnter: a.func,
  /**
   * @ignore
   */
  onEntered: a.func,
  /**
   * @ignore
   */
  onEntering: a.func,
  /**
   * @ignore
   */
  onExit: a.func,
  /**
   * @ignore
   */
  onExited: a.func,
  /**
   * @ignore
   */
  onExiting: a.func,
  /**
   * @ignore
   */
  style: a.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: a.oneOfType([a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })])
});
const vm = as;
function ym(e) {
  return Ze("MuiBackdrop", e);
}
ut("MuiBackdrop", ["root", "invisible"]);
const wm = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], xm = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return st({
    root: ["root", n && "invisible"]
  }, ym, t);
}, Em = Se("div", {
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
}) => k({
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
})), ss = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i;
  const s = lt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: p = "div",
    components: u = {},
    componentsProps: m = {},
    invisible: f = !1,
    open: b,
    slotProps: y = {},
    slots: v = {},
    TransitionComponent: h = vm,
    transitionDuration: E
  } = s, M = fe(s, wm), w = k({}, s, {
    component: p,
    invisible: f
  }), x = xm(w), g = (r = y.root) != null ? r : m.root;
  return /* @__PURE__ */ d(h, k({
    in: b,
    timeout: E
  }, M, {
    children: /* @__PURE__ */ d(Em, k({
      "aria-hidden": !0
    }, g, {
      as: (o = (i = v.root) != null ? i : u.Root) != null ? o : p,
      className: Ne(x.root, c, g == null ? void 0 : g.className),
      ownerState: k({}, w, g == null ? void 0 : g.ownerState),
      classes: x,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ss.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: a.shape({
    Root: a.elementType
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
  componentsProps: a.shape({
    root: a.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: a.bool,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: a.shape({
    root: a.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: a.shape({
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: a.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: a.oneOfType([a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })])
});
const Tm = ss;
function km(e) {
  return Ze("MuiModal", e);
}
ut("MuiModal", ["root", "hidden", "backdrop"]);
const Nm = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Om = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return st({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, km, r);
}, Sm = Se("div", {
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
}) => k({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), Cm = Se(Tm, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), ls = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i, s, l, c;
  const p = lt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: u = Cm,
    BackdropProps: m,
    className: f,
    closeAfterTransition: b = !1,
    children: y,
    container: v,
    component: h,
    components: E = {},
    componentsProps: M = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: x = !1,
    disableEscapeKeyDown: g = !1,
    disablePortal: O = !1,
    disableRestoreFocus: C = !1,
    disableScrollLock: V = !1,
    hideBackdrop: j = !1,
    keepMounted: F = !1,
    onBackdropClick: S,
    open: I,
    slotProps: R,
    slots: L
    // eslint-disable-next-line react/prop-types
  } = p, z = fe(p, Nm), $ = k({}, p, {
    closeAfterTransition: b,
    disableAutoFocus: w,
    disableEnforceFocus: x,
    disableEscapeKeyDown: g,
    disablePortal: O,
    disableRestoreFocus: C,
    disableScrollLock: V,
    hideBackdrop: j,
    keepMounted: F
  }), {
    getRootProps: U,
    getBackdropProps: ee,
    getTransitionProps: Q,
    portalRef: N,
    isTopModal: _,
    exited: D,
    hasTransition: q
  } = hp(k({}, $, {
    rootRef: n
  })), W = k({}, $, {
    exited: D
  }), G = Om(W), Y = {};
  if (y.props.tabIndex === void 0 && (Y.tabIndex = "-1"), q) {
    const {
      onEnter: ne,
      onExited: P
    } = Q();
    Y.onEnter = ne, Y.onExited = P;
  }
  const B = (r = (o = L == null ? void 0 : L.root) != null ? o : E.Root) != null ? r : Sm, H = (i = (s = L == null ? void 0 : L.backdrop) != null ? s : E.Backdrop) != null ? i : u, J = (l = R == null ? void 0 : R.root) != null ? l : M.root, te = (c = R == null ? void 0 : R.backdrop) != null ? c : M.backdrop, ie = kt({
    elementType: B,
    externalSlotProps: J,
    externalForwardedProps: z,
    getSlotProps: U,
    additionalProps: {
      ref: n,
      as: h
    },
    ownerState: W,
    className: Ne(f, J == null ? void 0 : J.className, G == null ? void 0 : G.root, !W.open && W.exited && (G == null ? void 0 : G.hidden))
  }), A = kt({
    elementType: H,
    externalSlotProps: te,
    additionalProps: m,
    getSlotProps: (ne) => ee(k({}, ne, {
      onClick: (P) => {
        S && S(P), ne != null && ne.onClick && ne.onClick(P);
      }
    })),
    className: Ne(te == null ? void 0 : te.className, m == null ? void 0 : m.className, G == null ? void 0 : G.backdrop),
    ownerState: W
  });
  return !F && !I && (!q || D) ? null : /* @__PURE__ */ d(hn, {
    ref: N,
    container: v,
    disablePortal: O,
    children: /* @__PURE__ */ X(B, k({}, ie, {
      children: [!j && u ? /* @__PURE__ */ d(H, k({}, A)) : null, /* @__PURE__ */ d(Wn, {
        disableEnforceFocus: x,
        disableAutoFocus: w,
        disableRestoreFocus: C,
        isEnabled: _,
        open: I,
        children: /* @__PURE__ */ T.cloneElement(y, Y)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (ls.propTypes = {
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
  BackdropComponent: a.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: a.object,
  /**
   * A single child content element.
   */
  children: yn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: a.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: a.shape({
    Backdrop: a.elementType,
    Root: a.elementType
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
  componentsProps: a.shape({
    backdrop: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
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
  container: a.oneOfType([ot, a.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: a.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: a.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: a.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: a.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: a.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: a.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: a.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: a.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: a.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: a.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: a.shape({
    backdrop: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: a.shape({
    backdrop: a.elementType,
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object])
});
const Pm = ls;
function Rm(e) {
  return Ze("MuiPaper", e);
}
ut("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const $m = ["className", "component", "elevation", "square", "variant"], Im = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return st(i, Rm, o);
}, Mm = Se("div", {
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
  return k({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && k({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${Gn("#fff", Ii(t.elevation))}, ${Gn("#fff", Ii(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), cs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = lt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, p = fe(r, $m), u = k({}, r, {
    component: i,
    elevation: s,
    square: l,
    variant: c
  }), m = Im(u);
  return process.env.NODE_ENV !== "production" && Nn().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ d(Mm, k({
    as: i,
    ownerState: u,
    className: Ne(m.root, o),
    ref: n
  }, p));
});
process.env.NODE_ENV !== "production" && (cs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Wt(wa, (e) => {
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
  square: a.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: a.oneOfType([a.oneOf(["elevation", "outlined"]), a.string])
});
const _m = cs;
function Am(e) {
  return Ze("MuiPopover", e);
}
ut("MuiPopover", ["root", "paper"]);
const Dm = ["onEntering"], jm = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Bm = ["slotProps"];
function Bi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Li(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function Vi(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Ln(e) {
  return typeof e == "function" ? e() : e;
}
const Lm = (e) => {
  const {
    classes: t
  } = e;
  return st({
    root: ["root"],
    paper: ["paper"]
  }, Am, t);
}, Vm = Se(Pm, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ps = Se(_m, {
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
}), us = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i;
  const s = lt({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: p = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: u,
    anchorReference: m = "anchorEl",
    children: f,
    className: b,
    container: y,
    elevation: v = 8,
    marginThreshold: h = 16,
    open: E,
    PaperProps: M = {},
    slots: w,
    slotProps: x,
    transformOrigin: g = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: O = Ur,
    transitionDuration: C = "auto",
    TransitionProps: {
      onEntering: V
    } = {},
    disableScrollLock: j = !1
  } = s, F = fe(s.TransitionProps, Dm), S = fe(s, jm), I = (r = x == null ? void 0 : x.paper) != null ? r : M, R = T.useRef(), L = Ue(R, I.ref), z = k({}, s, {
    anchorOrigin: p,
    anchorReference: m,
    elevation: v,
    marginThreshold: h,
    externalPaperSlotProps: I,
    transformOrigin: g,
    TransitionComponent: O,
    transitionDuration: C,
    TransitionProps: F
  }), $ = Lm(z), U = T.useCallback(() => {
    if (m === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (u || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), u;
    const ne = Ln(c), P = ne && ne.nodeType === 1 ? ne : Oe(R.current).body, ae = P.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Ee = P.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Ee.top === 0 && Ee.left === 0 && Ee.right === 0 && Ee.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: ae.top + Bi(ae, p.vertical),
      left: ae.left + Li(ae, p.horizontal)
    };
  }, [c, p.horizontal, p.vertical, u, m]), ee = T.useCallback((ne) => ({
    vertical: Bi(ne, g.vertical),
    horizontal: Li(ne, g.horizontal)
  }), [g.horizontal, g.vertical]), Q = T.useCallback((ne) => {
    const P = {
      width: ne.offsetWidth,
      height: ne.offsetHeight
    }, ae = ee(P);
    if (m === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Vi(ae)
      };
    const Ee = U();
    let Ce = Ee.top - ae.vertical, we = Ee.left - ae.horizontal;
    const mt = Ce + P.height, Pe = we + P.width, Qe = Lt(Ln(c)), Ae = Qe.innerHeight - h, et = Qe.innerWidth - h;
    if (h !== null && Ce < h) {
      const Te = Ce - h;
      Ce -= Te, ae.vertical += Te;
    } else if (h !== null && mt > Ae) {
      const Te = mt - Ae;
      Ce -= Te, ae.vertical += Te;
    }
    if (process.env.NODE_ENV !== "production" && P.height > Ae && P.height && Ae && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${P.height - Ae}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), h !== null && we < h) {
      const Te = we - h;
      we -= Te, ae.horizontal += Te;
    } else if (Pe > et) {
      const Te = Pe - et;
      we -= Te, ae.horizontal += Te;
    }
    return {
      top: `${Math.round(Ce)}px`,
      left: `${Math.round(we)}px`,
      transformOrigin: Vi(ae)
    };
  }, [c, m, U, ee, h]), [N, _] = T.useState(E), D = T.useCallback(() => {
    const ne = R.current;
    if (!ne)
      return;
    const P = Q(ne);
    P.top !== null && (ne.style.top = P.top), P.left !== null && (ne.style.left = P.left), ne.style.transformOrigin = P.transformOrigin, _(!0);
  }, [Q]);
  T.useEffect(() => (j && window.addEventListener("scroll", D), () => window.removeEventListener("scroll", D)), [c, j, D]);
  const q = (ne, P) => {
    V && V(ne, P), D();
  }, W = () => {
    _(!1);
  };
  T.useEffect(() => {
    E && D();
  }), T.useImperativeHandle(l, () => E ? {
    updatePosition: () => {
      D();
    }
  } : null, [E, D]), T.useEffect(() => {
    if (!E)
      return;
    const ne = fa(() => {
      D();
    }), P = Lt(c);
    return P.addEventListener("resize", ne), () => {
      ne.clear(), P.removeEventListener("resize", ne);
    };
  }, [c, E, D]);
  let G = C;
  C === "auto" && !O.muiSupportAuto && (G = void 0);
  const Y = y || (c ? Oe(Ln(c)).body : void 0), B = (o = w == null ? void 0 : w.root) != null ? o : Vm, H = (i = w == null ? void 0 : w.paper) != null ? i : ps, J = kt({
    elementType: H,
    externalSlotProps: k({}, I, {
      style: N ? I.style : k({}, I.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: v,
      ref: L
    },
    ownerState: z,
    className: Ne($.paper, I == null ? void 0 : I.className)
  }), te = kt({
    elementType: B,
    externalSlotProps: (x == null ? void 0 : x.root) || {},
    externalForwardedProps: S,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: Y,
      open: E
    },
    ownerState: z,
    className: Ne($.root, b)
  }), {
    slotProps: ie
  } = te, A = fe(te, Bm);
  return /* @__PURE__ */ d(B, k({}, A, !ka(B) && {
    slotProps: ie,
    disableScrollLock: j
  }, {
    children: /* @__PURE__ */ d(O, k({
      appear: !0,
      in: E,
      onEntering: q,
      onExited: W,
      timeout: G
    }, F, {
      children: /* @__PURE__ */ d(H, k({}, J, {
        children: f
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (us.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: no,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Wt(a.oneOfType([ot, a.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Ln(e.anchorEl);
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
  anchorOrigin: a.shape({
    horizontal: a.oneOfType([a.oneOf(["center", "left", "right"]), a.number]).isRequired,
    vertical: a.oneOfType([a.oneOf(["bottom", "center", "top"]), a.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: a.shape({
    left: a.number.isRequired,
    top: a.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: a.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([ot, a.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: a.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: wa,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: a.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: a.shape({
    component: hc
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: a.shape({
    paper: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: a.shape({
    paper: a.elementType,
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
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
  transformOrigin: a.shape({
    horizontal: a.oneOfType([a.oneOf(["center", "left", "right"]), a.number]).isRequired,
    vertical: a.oneOfType([a.oneOf(["bottom", "center", "top"]), a.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: a.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: a.oneOfType([a.oneOf(["auto"]), a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: a.object
});
const Fm = us;
function zm(e) {
  return Ze("MuiMenu", e);
}
ut("MuiMenu", ["root", "paper", "list"]);
const Um = ["onEntering"], Hm = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Wm = {
  vertical: "top",
  horizontal: "right"
}, Xm = {
  vertical: "top",
  horizontal: "left"
}, qm = (e) => {
  const {
    classes: t
  } = e;
  return st({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, zm, t);
}, Ym = Se(Fm, {
  shouldForwardProp: (e) => Ha(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Gm = Se(ps, {
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
}), Km = Se(hm, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), ds = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o;
  const i = lt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: l,
    className: c,
    disableAutoFocusItem: p = !1,
    MenuListProps: u = {},
    onClose: m,
    open: f,
    PaperProps: b = {},
    PopoverClasses: y,
    transitionDuration: v = "auto",
    TransitionProps: {
      onEntering: h
    } = {},
    variant: E = "selectedMenu",
    slots: M = {},
    slotProps: w = {}
  } = i, x = fe(i.TransitionProps, Um), g = fe(i, Hm), O = Nn(), C = O.direction === "rtl", V = k({}, i, {
    autoFocus: s,
    disableAutoFocusItem: p,
    MenuListProps: u,
    onEntering: h,
    PaperProps: b,
    transitionDuration: v,
    TransitionProps: x,
    variant: E
  }), j = qm(V), F = s && !p && f, S = T.useRef(null), I = (Q, N) => {
    S.current && S.current.adjustStyleForScrollbar(Q, O), h && h(Q, N);
  }, R = (Q) => {
    Q.key === "Tab" && (Q.preventDefault(), m && m(Q, "tabKeyDown"));
  };
  let L = -1;
  T.Children.map(l, (Q, N) => {
    /* @__PURE__ */ T.isValidElement(Q) && (process.env.NODE_ENV !== "production" && Un.isFragment(Q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Q.props.disabled || (E === "selectedMenu" && Q.props.selected || L === -1) && (L = N));
  });
  const z = (r = M.paper) != null ? r : Gm, $ = (o = w.paper) != null ? o : b, U = kt({
    elementType: M.root,
    externalSlotProps: w.root,
    ownerState: V,
    className: [j.root, c]
  }), ee = kt({
    elementType: z,
    externalSlotProps: $,
    ownerState: V,
    className: j.paper
  });
  return /* @__PURE__ */ d(Ym, k({
    onClose: m,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: C ? "right" : "left"
    },
    transformOrigin: C ? Wm : Xm,
    slots: {
      paper: z,
      root: M.root
    },
    slotProps: {
      root: U,
      paper: ee
    },
    open: f,
    ref: n,
    transitionDuration: v,
    TransitionProps: k({
      onEntering: I
    }, x),
    ownerState: V
  }, g, {
    classes: y,
    children: /* @__PURE__ */ d(Km, k({
      onKeyDown: R,
      actions: S,
      autoFocus: s && (L === -1 || p),
      autoFocusItem: F,
      variant: E
    }, u, {
      className: Ne(j.list, u.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ds.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: a.oneOfType([ot, a.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: a.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: a.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: a.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: a.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: a.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: a.shape({
    paper: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: a.shape({
    paper: a.elementType,
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: a.oneOfType([a.oneOf(["auto"]), a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: a.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: a.oneOf(["menu", "selectedMenu"])
});
const Jm = ds;
function Zh({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var p;
  const [o, i] = Z.useState(void 0), s = $e(
    (u) => {
      u.preventDefault(), i(
        o === void 0 ? {
          mouseX: u.clientX + 2,
          mouseY: u.clientY - 6
        } : (
          // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          void 0
        )
      );
    },
    [o]
  ), l = $e(() => {
    i(void 0);
  }, []), c = Wr(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((p = n == null ? void 0 : n.items) == null ? void 0 : p.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ X(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ d(
          Jm,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ d(
              Eo,
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
const Zm = Za(/* @__PURE__ */ d("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Qm(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Hr = (e, t, n = {}) => {
  const r = wt(t);
  r.current = t;
  const o = wt(n);
  o.current = Qm(o.current);
  const [i, s] = de(() => r.current), [l, c] = de(!0);
  return qe(() => {
    let p = !0;
    return c(!!e), (async () => {
      if (e) {
        const u = await e();
        p && (s(() => u), c(!1));
      }
    })(), () => {
      p = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [i, l];
};
function eh({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, p] = de(!1), [u, m] = de(!1), f = $e(() => {
    c && p(!1), m(!1);
  }, [c]), b = $e((x) => {
    x.stopPropagation(), p((g) => {
      const O = !g;
      return O && x.shiftKey ? m(!0) : O || m(!1), O;
    });
  }, []), y = $e(
    (x) => (f(), r(x)),
    [r, f]
  ), [v, h] = de({ top: 1, left: 1 });
  qe(() => {
    if (c) {
      const x = o == null ? void 0 : o.current;
      if (x) {
        const g = x.getBoundingClientRect(), O = window.scrollY, C = window.scrollX, V = g.top + O + x.clientHeight, j = g.left + C;
        h({ top: V, left: j });
      }
    }
  }, [c, o]);
  const [E] = Hr(
    $e(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [M] = Hr(
    $e(async () => (e == null ? void 0 : e(!0)) ?? n ?? E, [e, n, E, c]),
    n ?? E
  ), w = u && M ? M : E;
  return /* @__PURE__ */ X(Jn, { children: [
    /* @__PURE__ */ d(
      qi,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${i ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: b,
        children: l ?? /* @__PURE__ */ d(Zm, {})
      }
    ),
    /* @__PURE__ */ d(
      sl,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: f,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: v.top,
            left: v.left
          }
        },
        children: w ? /* @__PURE__ */ d(
          sm,
          {
            className: i,
            id: `${s ?? ""} main menu`,
            commandHandler: y,
            multiColumnMenu: w
          }
        ) : void 0
      }
    )
  ] });
}
function Qh({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: s = "medium",
  className: l,
  onClick: c,
  children: p
}) {
  return /* @__PURE__ */ d(
    qi,
    {
      id: e,
      disabled: n,
      edge: i,
      size: s,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: p
    }
  );
}
const th = Xr(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), fs = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(Yi.Root, { ref: n, className: K(th(), e), ...t }));
fs.displayName = Yi.Root.displayName;
function nh({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: i,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: p,
  value: u,
  onChange: m,
  onFocus: f,
  onBlur: b
}) {
  return /* @__PURE__ */ X("div", { className: K("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ d(
      fs,
      {
        htmlFor: e,
        className: K({
          "pr-text-red-600": n,
          "pr-hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ d(
      Qn,
      {
        id: e,
        disabled: t,
        placeholder: s,
        required: l,
        className: K(c, { "pr-border-red-600": n }),
        defaultValue: p,
        value: u,
        onChange: m,
        onFocus: f,
        onBlur: b
      }
    ),
    /* @__PURE__ */ d("p", { className: K({ "pr-hidden": !o }), children: o })
  ] });
}
function eg({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = de(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ d(
    nh,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  );
}
function tg({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: s = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: p = "off",
  className: u,
  onChange: m,
  onChangeCommitted: f
}) {
  return /* @__PURE__ */ d(
    ll,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: i,
      marks: s,
      defaultValue: l,
      value: c,
      valueLabelDisplay: p,
      className: `papi-slider ${n} ${u ?? ""}`,
      onChange: m,
      onChangeCommitted: f
    }
  );
}
function ng({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: l
}) {
  const c = {
    action: (s == null ? void 0 : s.action) || l,
    message: s == null ? void 0 : s.message,
    className: r
  };
  return /* @__PURE__ */ d(
    cl,
    {
      autoHideDuration: e ?? void 0,
      open: n,
      onClose: o,
      anchorOrigin: i,
      id: t,
      ContentProps: c
    }
  );
}
function rg({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ d(
    pl,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function og({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = wt(void 0);
  return /* @__PURE__ */ d("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ d(ul, { position: "static", id: r, children: /* @__PURE__ */ X(dl, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ d(
      eh,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ d("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const ig = _e.Root, rh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  _e.List,
  {
    ref: n,
    className: K(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
rh.displayName = _e.List.displayName;
const oh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  _e.Trigger,
  {
    ref: n,
    className: K(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
oh.displayName = _e.Trigger.displayName;
const ih = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  _e.Content,
  {
    ref: n,
    className: K(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
ih.displayName = _e.Content.displayName;
const ah = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  _e.Root,
  {
    orientation: "vertical",
    ref: n,
    className: K("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
ah.displayName = _e.List.displayName;
const sh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  _e.List,
  {
    ref: n,
    className: K(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
sh.displayName = _e.List.displayName;
const ag = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  _e.Trigger,
  {
    ref: n,
    ...t,
    className: K(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), lh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  _e.Content,
  {
    ref: n,
    className: K(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
lh.displayName = _e.Content.displayName;
function ch({ columns: e, tableData: t, onSelectItem: n }) {
  return /* @__PURE__ */ d("div", { className: "pr-overflow-y-auto", children: /* @__PURE__ */ d(Ql, { columns: e, data: t, onRowClickHandler: (o, i) => {
    i.toggleAllRowsSelected(!1), o.toggleSelected(void 0), n(o.getValue("item"));
  } }) });
}
const Fi = (e, t, n) => {
  if (!e || e === "" || t === "")
    return [];
  const r = [], o = e.split(`
`);
  let i = "0", s = "0", l = 0;
  return o.forEach((c) => {
    const p = c.split(/\s+/);
    c.startsWith("\\c") && ([, i] = p, s = "0"), c.startsWith("\\v") && ([, s] = p, i === "0" && (i = n.chapterNum.toString()));
    for (let u = 0; u < p.length; u++)
      if (p[u].includes(t)) {
        const m = Math.max(0, u - 2), f = Math.min(p.length, u + 3), b = p.slice(m, f).join(" "), y = {
          reference: { ...n, chapterNum: +i, verseNum: +s },
          snippet: b,
          key: l
        };
        l += 1, r.push(y);
      }
  }), r;
};
function ph({
  selectedItem: e,
  text: t,
  scriptureReference: n,
  setScriptureReference: r,
  localizedStrings: o
}) {
  const i = o["%webView_inventory_occurrences_table_header_reference%"], s = o["%webView_inventory_occurrences_table_header_occurrence%"], [l, c] = de(
    Fi(t, e, n)
  );
  return qe(
    () => c(Fi(t, e, n)),
    [t, e, n]
  ), /* @__PURE__ */ X(Zr, { children: [
    /* @__PURE__ */ d(Qr, { children: /* @__PURE__ */ X(Dt, { children: [
      /* @__PURE__ */ d(Vn, { children: i }),
      /* @__PURE__ */ d(Vn, { children: s })
    ] }) }),
    /* @__PURE__ */ d(eo, { children: l.map((p) => /* @__PURE__ */ X(
      Dt,
      {
        onClick: () => {
          r(p.reference);
        },
        children: [
          /* @__PURE__ */ d(fn, { children: `${me.bookNumberToEnglishName(p.reference.bookNum)} ${p.reference.chapterNum}:${p.reference.verseNum}` }),
          /* @__PURE__ */ d(fn, { children: p.snippet })
        ]
      },
      p.key
    )) })
  ] });
}
const uh = (e, t, n, r, o) => {
  const i = [];
  return e.forEach((s) => {
    if (n !== "" && !s.includes(n))
      return;
    const l = i.find((c) => c.item === s);
    if (l)
      l.count += 1;
    else {
      let c;
      if (r.includes(s) && (c = !0), o.includes(s) && (c = !1), t === "all" || t === "approved" && c === !0 || t === "unapproved" && c === !1 || t === "unknown" && c === void 0) {
        const p = {
          item: s,
          count: 1,
          status: c
        };
        i.push(p);
      }
    }
  }), i;
};
function dh({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  projectId: r,
  getSetting: o,
  setSetting: i,
  getText: s,
  approvedItemsKey: l,
  unapprovedItemsKey: c,
  convertTextToItems: p,
  columns: u
}) {
  const m = n["%webView_inventory_all%"], f = n["%webView_inventory_approved%"], b = n["%webView_inventory_unapproved%"], y = n["%webView_inventory_unknown%"], v = n["%webView_inventory_scope_book%"], h = n["%webView_inventory_scope_chapter%"], E = n["%webView_inventory_scope_verse%"], M = n["%webView_inventory_filter_text%"], [w, x] = de([]), [g, O] = de([]), [C, V] = de(""), [j, F] = de([]), [S, I] = de("book"), [R, L] = de("all"), [z, $] = de(""), [U, ee] = de([]), [Q, N] = de(""), _ = (D, q) => {
    ee((W) => {
      let G = [];
      return D.forEach((Y) => {
        G = W.map((B) => B.item === Y && B.status !== q ? { ...B, status: q } : B);
      }), x((Y) => {
        let B = [...Y];
        return D.forEach((H) => {
          q === !0 ? B.includes(H) || B.push(H) : B = B.filter((J) => J !== H);
        }), i(l, r, B), B;
      }), O((Y) => {
        let B = [...Y];
        return D.forEach((H) => {
          q === !1 ? B.includes(H) || B.push(H) : B = B.filter(
            (J) => J !== H
          );
        }), i(c, r, B), B;
      }), G;
    });
  };
  return qe(() => {
    (async () => {
      try {
        x(await o(l, r)), O(await o(c, r));
      } catch {
        throw new Error("Failed to fetch (un)approved items from project settings");
      }
    })();
  }, [r, o, l, c]), qe(() => {
    (async () => {
      try {
        const q = await s(r, e, S);
        V(q || "");
      } catch {
        throw new Error("Failed getting scripture text");
      }
    })();
  }, [r, e, S, s]), qe(() => {
    F(p(C));
  }, [p, C]), qe(() => {
    if (j.length === 0) {
      ee([]);
      return;
    }
    (() => {
      try {
        ee(
          uh(j, R, z, w, g)
        );
      } catch {
        throw new Error("Failed building table data");
      }
    })();
  }, [w, g, j, R, z]), /* @__PURE__ */ X("div", { className: "pr-twp pr-font-sans", children: [
    /* @__PURE__ */ X("div", { className: "pr-flex", children: [
      /* @__PURE__ */ X($r, { onValueChange: (D) => L(D), defaultValue: R, children: [
        /* @__PURE__ */ d(Fn, { children: /* @__PURE__ */ d(Ir, { placeholder: "Select filter" }) }),
        /* @__PURE__ */ X(zn, { className: "pr-font-sans", children: [
          /* @__PURE__ */ d(nt, { value: "all", children: m }),
          /* @__PURE__ */ d(nt, { value: "approved", children: f }),
          /* @__PURE__ */ d(nt, { value: "unapproved", children: b }),
          /* @__PURE__ */ d(nt, { value: "unknown", children: y })
        ] })
      ] }),
      /* @__PURE__ */ X($r, { onValueChange: (D) => I(D), defaultValue: S, children: [
        /* @__PURE__ */ d(Fn, { children: /* @__PURE__ */ d(Ir, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ X(zn, { className: "pr-font-sans", children: [
          /* @__PURE__ */ d(nt, { value: "book", children: v }),
          /* @__PURE__ */ d(nt, { value: "chapter", children: h }),
          /* @__PURE__ */ d(nt, { value: "verse", children: E })
        ] })
      ] }),
      /* @__PURE__ */ d(
        Qn,
        {
          className: "pr-rounded-md pr-border",
          placeholder: M,
          value: z,
          onChange: (D) => {
            $(D.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ d(
      "div",
      {
        className: `pr-overflow-y-auto pr-rounded-md pr-border ${Q !== "" && "pr-max-h-96"}`,
        children: /* @__PURE__ */ d(
          ch,
          {
            columns: u(_),
            tableData: U,
            onSelectItem: (D) => {
              N(D);
            }
          }
        )
      }
    ),
    Q !== "" && /* @__PURE__ */ d("div", { className: "pr-mt-4 pr-rounded-md pr-border", children: /* @__PURE__ */ d(
      ph,
      {
        selectedItem: Q,
        text: C,
        scriptureReference: e,
        setScriptureReference: (D) => t(D),
        localizedStrings: n
      }
    ) })
  ] });
}
const An = (e) => e === "asc" ? /* @__PURE__ */ d(zs, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ d(Us, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ d(Hs, { className: "pr-ml-2 pr-h-4 pr-w-4" }), fh = "validCharacters", mh = "invalidCharacters", hh = (e, t, n, r, o) => [
  {
    accessorKey: "item",
    header: ({ column: i }) => /* @__PURE__ */ X(ke, { onClick: () => i.toggleSorting(void 0), children: [
      e,
      An(i.getIsSorted())
    ] })
  },
  {
    accessorKey: "unicodeValue",
    header: ({ column: i }) => /* @__PURE__ */ X(ke, { onClick: () => i.toggleSorting(void 0), children: [
      t,
      An(i.getIsSorted())
    ] }),
    cell: ({ row: i }) => i.getValue("item").charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
  },
  {
    accessorKey: "count",
    header: ({ column: i }) => /* @__PURE__ */ X(ke, { onClick: () => i.toggleSorting(void 0), children: [
      n,
      An(i.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: i, table: s }) => {
      const l = s.getSelectedRowModel().rows, c = [];
      return l.forEach((p) => {
        c.push(p.getValue("item"));
      }), /* @__PURE__ */ X("div", { children: [
        /* @__PURE__ */ d("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ X(ke, { onClick: () => i.toggleSorting(void 0), children: [
          r,
          An(i.getIsSorted())
        ] }) }),
        /* @__PURE__ */ X("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ d(ke, { children: /* @__PURE__ */ d(
            Bo,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !0);
              }
            }
          ) }),
          /* @__PURE__ */ d(ke, { children: /* @__PURE__ */ d(
            Lo,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !1);
              }
            }
          ) }),
          /* @__PURE__ */ d(ke, { children: /* @__PURE__ */ d(
            Vo,
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
    cell: ({ row: i }) => {
      const s = i.getValue("status");
      return s === !0 ? /* @__PURE__ */ d(Bo, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : s === !1 ? /* @__PURE__ */ d(Lo, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ d(Vo, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
], gh = (e) => Cs(e, "");
function sg({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  projectId: r,
  getSetting: o,
  setSetting: i,
  getText: s
}) {
  const l = n["%webView_inventory_table_header_character%"], c = n["%webView_inventory_table_header_unicode_value%"], p = n["%webView_inventory_table_header_count%"], u = n["%webView_inventory_table_header_status%"];
  return /* @__PURE__ */ d("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ d(
    dh,
    {
      projectId: r,
      localizedStrings: n,
      scriptureReference: e,
      setScriptureReference: t,
      approvedItemsKey: fh,
      unapprovedItemsKey: mh,
      convertTextToItems: gh,
      getSetting: o,
      setSetting: i,
      getText: s,
      columns: (f) => hh(l, c, p, u, f)
    }
  ) });
}
const lg = (e, t) => {
  qe(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Pr = () => !1, cg = (e, t) => {
  const [n] = Hr(
    $e(async () => {
      if (!e)
        return Pr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Pr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  qe(() => () => {
    n !== Pr && n();
  }, [n]);
}, bh = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d(
    "div",
    {
      ref: n,
      className: K(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
bh.displayName = "Card";
const vh = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d(
    "div",
    {
      ref: n,
      className: K("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
vh.displayName = "CardHeader";
const yh = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d(
    "h3",
    {
      ref: n,
      className: K("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
yh.displayName = "CardTitle";
const wh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("p", { ref: n, className: K("pr-text-sm pr-text-muted-foreground", e), ...t }));
wh.displayName = "CardDescription";
const xh = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d("div", { ref: n, className: K("pr-p-6 pr-pt-0", e), ...t })
);
xh.displayName = "CardContent";
const Eh = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d("div", { ref: n, className: K("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
Eh.displayName = "CardFooter";
const Th = Xr(
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
), kh = Z.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ d("div", { ref: r, role: "alert", className: K(Th({ variant: t }), e), ...n }));
kh.displayName = "Alert";
const Nh = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ X(
    "h5",
    {
      ref: n,
      className: K("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
Nh.displayName = "AlertTitle";
const Oh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d("div", { ref: n, className: K("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
Oh.displayName = "AlertDescription";
const Sh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ X(
  rn.Root,
  {
    ref: n,
    className: K(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ d(rn.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ d(rn.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ d(rn.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
Sh.displayName = rn.Root.displayName;
const Ch = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ d(
  Rr.Root,
  {
    className: K(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ d(
      Rr.Thumb,
      {
        className: K(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
Ch.displayName = Rr.Root.displayName;
function Ph(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Ph(`.papi-switch {
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
.papi-combo-box {
  background-color: transparent;
}

.papi-combo-box.fullwidth {
  width: 100%;
}

.papi-combo-box.error {
  background-color: #f00;
}

.papi-combo-box.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-combo-box.paratext.bright {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --border: 220 13% 91%;
    --input: 161.3, 26.7%, 88.2%;
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
.pr-left-2 {
  left: 0.5rem;
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
.pr-mr-2 {
  margin-right: 0.5rem;
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
.pr-cursor-default {
  cursor: default;
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
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-whitespace-nowrap {
  white-space: nowrap;
}
.pr-text-nowrap {
  text-wrap: nowrap;
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
.pr-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
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
.pr-opacity-50 {
  opacity: 0.5;
}
.pr-opacity-60 {
  opacity: 0.6;
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
.pr-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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
.hover\\:pr-underline:hover {
  text-decoration-line: underline;
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
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground));
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
.\\[\\&_p\\]\\:pr-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
}
`, "top");
export {
  kh as Alert,
  Oh as AlertDescription,
  Nh as AlertTitle,
  Yh as BookChapterControl,
  ke as Button,
  bh as Card,
  xh as CardContent,
  wh as CardDescription,
  Eh as CardFooter,
  vh as CardHeader,
  yh as CardTitle,
  Kh as ChapterRangeSelector,
  sg as CharacterInventory,
  ec as Checkbox,
  Jh as Checklist,
  Xo as ComboBox,
  Zh as ContextMenu,
  Ql as DataTable,
  ta as DropdownMenu,
  ra as DropdownMenuCheckboxItem,
  Kr as DropdownMenuContent,
  Hh as DropdownMenuGroup,
  na as DropdownMenuItem,
  Zn as DropdownMenuLabel,
  Wh as DropdownMenuPortal,
  qh as DropdownMenuRadioGroup,
  Ml as DropdownMenuRadioItem,
  Jr as DropdownMenuSeparator,
  _l as DropdownMenuShortcut,
  Xh as DropdownMenuSub,
  Il as DropdownMenuSubContent,
  $l as DropdownMenuSubTrigger,
  Rl as DropdownMenuTrigger,
  sm as GridMenu,
  eh as HamburgerMenuButton,
  Qh as IconButton,
  Qn as Input,
  _t as LabelPosition,
  es as MenuItem,
  eg as SearchBar,
  $r as Select,
  zn as SelectContent,
  Gh as SelectGroup,
  nt as SelectItem,
  Gl as SelectLabel,
  ia as SelectScrollDownButton,
  oa as SelectScrollUpButton,
  Kl as SelectSeparator,
  Fn as SelectTrigger,
  Ir as SelectValue,
  Sh as ShadCnSlider,
  Ch as ShadCnSwitch,
  tg as Slider,
  ng as Snackbar,
  rg as Switch,
  Zr as Table,
  eo as TableBody,
  ql as TableCaption,
  fn as TableCell,
  Xl as TableFooter,
  Vn as TableHead,
  Qr as TableHeader,
  Dt as TableRow,
  ig as Tabs,
  ih as TabsContent,
  rh as TabsList,
  oh as TabsTrigger,
  nh as TextField,
  og as Toolbar,
  ah as VerticalTabs,
  lh as VerticalTabsContent,
  sh as VerticalTabsList,
  ag as VerticalTabsTrigger,
  Yl as buttonVariants,
  lg as useEvent,
  cg as useEventAsync,
  Hr as usePromise
};
//# sourceMappingURL=index.js.map
