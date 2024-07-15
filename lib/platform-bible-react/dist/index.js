import ks, { jsxs as H, jsx as f, Fragment as Kn } from "react/jsx-runtime";
import * as T from "react";
import re, { forwardRef as Li, useCallback as $e, useState as de, useRef as wt, useEffect as Ye, useLayoutEffect as Io, useMemo as Ur } from "react";
import { getChaptersForBook as Ns, split as Os } from "platform-bible-utils";
import * as me from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Ss } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Cs, Check as Vi, Circle as Ps, History as Rs, ArrowDownWideNarrow as $s, Clock as Ms, Bookmark as _s, ChevronDown as Fi, ChevronUp as Is, ArrowLeftIcon as As, ChevronLeftIcon as Ds, ChevronRightIcon as js, ArrowRightIcon as Bs, FilterIcon as Ls, CircleCheckIcon as Ao, CircleXIcon as Do, CircleHelpIcon as jo, ArrowUpIcon as Vs, ArrowDownIcon as Fs, ArrowUpDownIcon as zs } from "lucide-react";
import Ne, { clsx as Us } from "clsx";
import { twMerge as Hs } from "tailwind-merge";
import { useReactTable as Ws, getCoreRowModel as qs, getPaginationRowModel as Xs, getSortedRowModel as Ys, getFilteredRowModel as Gs, flexRender as Bo } from "@tanstack/react-table";
import { Slot as Ks } from "@radix-ui/react-slot";
import { cva as zi } from "class-variance-authority";
import * as ye from "@radix-ui/react-select";
import { Autocomplete as Js, TextField as Zs, FormControlLabel as Lo, FormLabel as Qs, Checkbox as el, MenuItem as tl, ListItemText as nl, ListItemIcon as Ui, Menu as rl, Grid as Hi, List as ol, IconButton as Wi, Drawer as il, Slider as al, Snackbar as sl, Switch as ll, AppBar as cl, Toolbar as pl } from "@mui/material";
import ul, { ThemeContext as dl, internal_processStyles as fl } from "@mui/styled-engine";
import * as hl from "react-dom";
import Cn from "react-dom";
import * as qi from "@radix-ui/react-label";
import * as Ie from "@radix-ui/react-tabs";
var ml = Object.defineProperty, gl = (e, t, n) => t in e ? ml(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oe = (e, t, n) => gl(e, typeof t != "symbol" ? t + "" : t, n);
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
], Hr = [
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
], Xi = [
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
], Vo = Ol();
function Ht(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Vo ? Vo[e] : 0;
}
function Wr(e) {
  return Ht(e) > 0;
}
function bl(e) {
  const t = typeof e == "string" ? Ht(e) : e;
  return t >= 40 && t <= 66;
}
function vl(e) {
  return (typeof e == "string" ? Ht(e) : e) <= 39;
}
function Yi(e) {
  return e <= 66;
}
function yl(e) {
  const t = typeof e == "string" ? Ht(e) : e;
  return Ji(t) && !Yi(t);
}
function* wl() {
  for (let e = 1; e <= Et.length; e++)
    yield e;
}
const xl = 1, Gi = Et.length;
function El() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function qr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Et.length ? t : Et[n];
}
function Ki(e) {
  return e <= 0 || e > Gi ? "******" : Xi[e - 1];
}
function Tl(e) {
  return Ki(Ht(e));
}
function Ji(e) {
  const t = typeof e == "number" ? qr(e) : e;
  return Wr(t) && !Hr.includes(t);
}
function kl(e) {
  const t = typeof e == "number" ? qr(e) : e;
  return Wr(t) && Hr.includes(t);
}
function Nl(e) {
  return Xi[e - 1].includes("*obsolete*");
}
function Ol() {
  const e = {};
  for (let t = 0; t < Et.length; t++)
    e[Et[t]] = t + 1;
  return e;
}
const he = {
  allBookIds: Et,
  nonCanonicalIds: Hr,
  bookIdToNumber: Ht,
  isBookIdValid: Wr,
  isBookNT: bl,
  isBookOT: vl,
  isBookOTNT: Yi,
  isBookDC: yl,
  allBookNumbers: wl,
  firstBook: xl,
  lastBook: Gi,
  extraBooks: El,
  bookNumberToId: qr,
  bookNumberToEnglishName: Ki,
  bookIdToEnglishName: Tl,
  isCanonical: Ji,
  isExtraMaterial: kl,
  isObsolete: Nl
};
var Xe = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Xe || {});
const je = class {
  // private versInfo: Versification;
  constructor(t) {
    if (oe(this, "name"), oe(this, "fullPath"), oe(this, "isPresent"), oe(this, "hasVerseSegments"), oe(this, "isCustomized"), oe(this, "baseVersification"), oe(this, "scriptureBooks"), oe(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Xe[t]) : (this._type = t, this.name = Xe[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
oe(je, "Original", new je(Xe.Original)), oe(je, "Septuagint", new je(Xe.Septuagint)), oe(je, "Vulgate", new je(Xe.Vulgate)), oe(je, "English", new je(Xe.English)), oe(je, "RussianProtestant", new je(Xe.RussianProtestant)), oe(je, "RussianOrthodox", new je(Xe.RussianOrthodox));
let gt = je;
function Fo(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Zi = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Zi || {});
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
    return he.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = he.bookIdToNumber(t);
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
    if (t <= 0 || t > he.lastBook)
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
          this.versification = new gt(Xe[s]);
        } catch {
          throw new Jt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Jt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || he.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !se.isVerseParseable(r[1]))
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
    const o = [], i = Fo(this._verse, r);
    for (const s of i.map((l) => Fo(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const p = this.clone();
        if (p.verse = s[1], !t)
          for (let u = c + 1; u < p.verseNum; u++) {
            const h = new se(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || o.push(h);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > he.lastBook ? 2 : (he.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = se.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = he.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
oe(Re, "defaultVersification", gt.English), oe(Re, "verseRangeSeparator", "-"), oe(Re, "verseSequenceIndicator", ","), oe(Re, "verseRangeSeparators", [Re.verseRangeSeparator]), oe(Re, "verseSequenceIndicators", [Re.verseSequenceIndicator]), oe(Re, "chapterDigitShifter", 1e3), oe(Re, "bookDigitShifter", Re.chapterDigitShifter * Re.chapterDigitShifter), oe(Re, "bcvMaxValue", Re.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(Re, "ValidStatusType", Zi);
class Jt extends Error {
}
function te(...e) {
  return Hs(Us(e));
}
const Qi = me.Root, Sl = me.Trigger, Nm = me.Group, Om = me.Portal, Sm = me.Sub, Cm = me.RadioGroup, Cl = re.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ H(
  me.SubTrigger,
  {
    ref: o,
    className: te(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ f(Cs, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Cl.displayName = me.SubTrigger.displayName;
const Pl = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  me.SubContent,
  {
    ref: n,
    className: te(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Pl.displayName = me.SubContent.displayName;
const Xr = re.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ f(me.Portal, { children: /* @__PURE__ */ f(
  me.Content,
  {
    ref: r,
    sideOffset: t,
    className: te(
      /* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Xr.displayName = me.Content.displayName;
const ea = re.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ f(
  me.Item,
  {
    ref: r,
    className: te(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
ea.displayName = me.Item.displayName;
const ta = re.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ H(
  me.CheckboxItem,
  {
    ref: o,
    className: te(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ f("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ f(me.ItemIndicator, { children: /* @__PURE__ */ f(Vi, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
ta.displayName = me.CheckboxItem.displayName;
const Rl = re.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ H(
  me.RadioItem,
  {
    ref: r,
    className: te(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ f("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ f(me.ItemIndicator, { children: /* @__PURE__ */ f(Ps, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Rl.displayName = me.RadioItem.displayName;
const Jn = re.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ f(
  me.Label,
  {
    ref: r,
    className: te("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
Jn.displayName = me.Label.displayName;
const Yr = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  me.Separator,
  {
    ref: n,
    className: te("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Yr.displayName = me.Separator.displayName;
function $l({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "span",
    {
      className: te("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
$l.displayName = "DropdownMenuShortcut";
const Zn = re.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ f(
    "input",
    {
      type: t,
      className: te(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Zn.displayName = "Input";
const Ml = Li(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ H("div", { className: "pr-relative", children: [
    /* @__PURE__ */ f(
      Zn,
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
    /* @__PURE__ */ f(
      Rs,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function _l({
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
  return /* @__PURE__ */ f("div", { className: te("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((l) => /* @__PURE__ */ f(
    "div",
    {
      className: te(
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
const Il = Li(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, l) => /* @__PURE__ */ H(
    ea,
    {
      ref: l,
      textValue: e,
      className: te("pr-font-normal pr-text-slate-700", {
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
        /* @__PURE__ */ f(
          "span",
          {
            className: te(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": i.toLowerCase() === "ot",
                "pr-border-l-purple-200": i.toLowerCase() === "nt",
                "pr-border-l-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: he.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ f("div", { children: s })
      ]
    },
    e
  )
);
function Al({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ H(Jn, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ f("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ H("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ f(
        $s,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ f(
        Ms,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ f(
        _s,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const sn = he.allBookIds, Dl = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, zo = ["OT", "NT", "DC"], jl = 32 + 32 + 32, Bl = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Ll = (e) => ({
  OT: sn.filter((n) => he.isBookOT(n)),
  NT: sn.filter((n) => he.isBookNT(n)),
  DC: sn.filter((n) => he.isBookDC(n))
})[e], Zt = (e) => Ns(he.bookIdToNumber(e));
function Vl() {
  return sn.map((t) => he.bookIdToEnglishName(t));
}
function Fl(e) {
  return Vl().includes(e);
}
function zl(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Fl(t))
    return sn.find((r) => he.bookIdToEnglishName(r) === t);
}
function Pm({ scrRef: e, handleSubmit: t }) {
  const [n, r] = de(""), [o, i] = de(
    he.bookNumberToId(e.bookNum)
  ), [s, l] = de(e.chapterNum ?? 0), [c, p] = de(
    he.bookNumberToId(e.bookNum)
  ), [u, h] = de(!1), [d, b] = de(u), y = wt(void 0), v = wt(void 0), m = wt(void 0), x = $e(
    (S) => Ll(S).filter((M) => {
      const _ = he.bookIdToEnglishName(M).toLowerCase(), B = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return _.includes(B) || // Match book name
      M.toLowerCase().includes(B);
    }),
    [n]
  ), I = (S) => {
    r(S);
  }, w = wt(!1), E = $e((S) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    h(S);
  }, []), g = $e(
    (S, M, _, B) => {
      if (l(
        he.bookNumberToId(e.bookNum) !== S ? 1 : e.chapterNum
      ), M || Zt(S) === -1) {
        t({
          bookNum: he.bookIdToNumber(S),
          chapterNum: _ || 1,
          verseNum: B || 1
        }), h(!1), r("");
        return;
      }
      i(o !== S ? S : ""), h(!M);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), O = (S) => {
    S <= 0 || S > Zt(o) || g(o, !0, S);
  }, C = $e(() => {
    Bl.forEach((S) => {
      const M = n.match(S);
      if (M) {
        const [_, B = void 0, z = void 0] = M.slice(1), P = zl(_);
        (he.isBookIdValid(_) || P) && g(
          P ?? _,
          !0,
          B ? parseInt(B, 10) : 1,
          z ? parseInt(z, 10) : 1
        );
      }
    });
  }, [g, n]), L = $e(
    (S) => {
      u ? (S.key === "ArrowDown" || S.key === "ArrowUp") && (typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null ? m.current.focus() : typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null && v.current.focus(), S.preventDefault()) : h(!0);
    },
    [u]
  ), D = (S) => {
    const { key: M } = S;
    M === "ArrowRight" || M === "ArrowLeft" || M === "ArrowDown" || M === "ArrowUp" || M === "Enter" || (y.current.dispatchEvent(new KeyboardEvent("keydown", { key: M })), y.current.focus());
  }, V = (S) => {
    const { key: M } = S;
    if (c === o) {
      if (M === "Enter") {
        S.preventDefault(), g(o, !0, s);
        return;
      }
      let _ = 0;
      if (M === "ArrowRight")
        if (s < Zt(c))
          _ = 1;
        else {
          S.preventDefault();
          return;
        }
      else if (M === "ArrowLeft")
        if (s > 1)
          _ = -1;
        else {
          S.preventDefault();
          return;
        }
      else
        M === "ArrowDown" ? _ = 6 : M === "ArrowUp" && (_ = -6);
      s + _ <= 0 || s + _ > Zt(c) ? l(0) : _ !== 0 && (l(s + _), S.preventDefault());
    }
  };
  return Ye(() => {
    o === c ? o === he.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), Io(() => {
    b(u);
  }, [u]), Io(() => {
    const S = setTimeout(() => {
      if (d && v.current && m.current) {
        const _ = m.current.offsetTop - jl;
        v.current.scrollTo({ top: _, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(S);
    };
  }, [d]), /* @__PURE__ */ f("div", { className: "pr-flex", children: /* @__PURE__ */ H(Qi, { modal: !1, open: u, onOpenChange: E, children: [
    /* @__PURE__ */ f(Sl, { asChild: !0, children: /* @__PURE__ */ f(
      Ml,
      {
        ref: y,
        value: n,
        handleSearch: I,
        handleKeyDown: L,
        handleOnClick: () => {
          i(he.bookNumberToId(e.bookNum)), p(he.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), h(!0), y.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: C,
        placeholder: `${he.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ H(
      Xr,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: D,
        align: "start",
        ref: v,
        children: [
          /* @__PURE__ */ f(
            Al,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          zo.map(
            (S, M) => x(S).length > 0 && /* @__PURE__ */ H("div", { children: [
              /* @__PURE__ */ f(Jn, { className: "pr-font-semibold pr-text-slate-700", children: Dl[S] }),
              x(S).map((_) => /* @__PURE__ */ f("div", { children: /* @__PURE__ */ f(
                Il,
                {
                  bookId: _,
                  handleSelectBook: () => g(_, !1),
                  isSelected: o === _,
                  handleHighlightBook: () => p(_),
                  handleKeyDown: V,
                  bookType: S,
                  ref: (B) => {
                    o === _ && (m.current = B);
                  },
                  children: /* @__PURE__ */ f(
                    _l,
                    {
                      handleSelectChapter: O,
                      endChapter: Zt(_),
                      activeChapter: e.bookNum === he.bookIdToNumber(_) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (B) => {
                        l(B);
                      }
                    }
                  )
                }
              ) }, _)),
              zo.length - 1 !== M ? /* @__PURE__ */ f(Yr, {}) : void 0
            ] }, S)
          )
        ]
      }
    )
  ] }) });
}
const Gr = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ f("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ f(
    "table",
    {
      ref: n,
      className: te("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
Gr.displayName = "Table";
const Kr = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f("thead", { ref: n, className: te("[&_tr]:pr-border-b", e), ...t }));
Kr.displayName = "TableHeader";
const Jr = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f("tbody", { ref: n, className: te("[&_tr:last-child]:pr-border-0", e), ...t }));
Jr.displayName = "TableBody";
const Ul = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  "tfoot",
  {
    ref: n,
    className: te("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Ul.displayName = "TableFooter";
const Dt = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ f(
    "tr",
    {
      ref: n,
      className: te(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
Dt.displayName = "TableRow";
const Ln = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  "th",
  {
    ref: n,
    className: te(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
Ln.displayName = "TableHead";
const dn = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  "td",
  {
    ref: n,
    className: te("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
dn.displayName = "TableCell";
const Hl = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  "caption",
  {
    ref: n,
    className: te("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Hl.displayName = "TableCaption";
const Wl = zi(
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
), ke = re.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ f(r ? Ks : "button", { className: te(Wl({ variant: t, size: n, className: e })), ref: i, ...o })
);
ke.displayName = "Button";
const Pr = ye.Root, Rm = ye.Group, Rr = ye.Value, Vn = re.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ H(
  ye.Trigger,
  {
    ref: r,
    className: te(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ f(ye.Icon, { asChild: !0, children: /* @__PURE__ */ f(Fi, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Vn.displayName = ye.Trigger.displayName;
const na = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  ye.ScrollUpButton,
  {
    ref: n,
    className: te("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ f(Is, { className: "pr-h-4 pr-w-4" })
  }
));
na.displayName = ye.ScrollUpButton.displayName;
const ra = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  ye.ScrollDownButton,
  {
    ref: n,
    className: te("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ f(Fi, { className: "pr-h-4 pr-w-4" })
  }
));
ra.displayName = ye.ScrollDownButton.displayName;
const Fn = re.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ f(ye.Portal, { children: /* @__PURE__ */ H(
  ye.Content,
  {
    ref: o,
    className: te(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ f(na, {}),
      /* @__PURE__ */ f(
        ye.Viewport,
        {
          className: te(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ f(ra, {})
    ]
  }
) }));
Fn.displayName = ye.Content.displayName;
const ql = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  ye.Label,
  {
    ref: n,
    className: te("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
ql.displayName = ye.Label.displayName;
const nt = re.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ H(
  ye.Item,
  {
    ref: r,
    className: te(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ f("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ f(ye.ItemIndicator, { children: /* @__PURE__ */ f(Vi, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ f(ye.ItemText, { children: t })
    ]
  }
));
nt.displayName = ye.Item.displayName;
const Xl = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  ye.Separator,
  {
    ref: n,
    className: te("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Xl.displayName = ye.Separator.displayName;
function Yl({ table: e }) {
  return /* @__PURE__ */ f("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ H("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ H("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ H("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ f("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ H(
        Pr,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ f(Vn, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ f(Rr, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ f(Fn, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ f(nt, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ H("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ H("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ H(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ f("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ f(As, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ H(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ f("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ f(Ds, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ H(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ f("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ f(js, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ H(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ f("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ f(Bs, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function Gl({ table: e }) {
  return /* @__PURE__ */ H(Qi, { children: [
    /* @__PURE__ */ f(Ss, { asChild: !0, children: /* @__PURE__ */ H(ke, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ f(Ls, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ H(Xr, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ f(Jn, { children: "Toggle columns" }),
      /* @__PURE__ */ f(Yr, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ f(
        ta,
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
function Kl({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var v;
  const [s, l] = de([]), [c, p] = de([]), [u, h] = de({}), [d, b] = de({}), y = Ws({
    data: t,
    columns: e,
    getCoreRowModel: qs(),
    ...n && { getPaginationRowModel: Xs() },
    onSortingChange: l,
    getSortedRowModel: Ys(),
    onColumnFiltersChange: p,
    getFilteredRowModel: Gs(),
    onColumnVisibilityChange: h,
    onRowSelectionChange: b,
    state: {
      sorting: s,
      columnFilters: c,
      columnVisibility: u,
      rowSelection: d
    }
  });
  return /* @__PURE__ */ H("div", { children: [
    o && /* @__PURE__ */ f(Gl, { table: y }),
    /* @__PURE__ */ f("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ H(Gr, { children: [
      /* @__PURE__ */ f(Kr, { children: y.getHeaderGroups().map((m) => /* @__PURE__ */ f(Dt, { children: m.headers.map((x) => /* @__PURE__ */ f(Ln, { children: x.isPlaceholder ? void 0 : Bo(x.column.columnDef.header, x.getContext()) }, x.id)) }, m.id)) }),
      /* @__PURE__ */ f(Jr, { children: (v = y.getRowModel().rows) != null && v.length ? y.getRowModel().rows.map((m) => /* @__PURE__ */ f(
        Dt,
        {
          onClick: () => i(m, y),
          "data-state": m.getIsSelected() && "selected",
          children: m.getVisibleCells().map((x) => /* @__PURE__ */ f(dn, { children: Bo(x.column.columnDef.cell, x.getContext()) }, x.id))
        },
        m.id
      )) : /* @__PURE__ */ f(Dt, { children: /* @__PURE__ */ f(dn, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    n && /* @__PURE__ */ H("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ f(
        ke,
        {
          variant: "outline",
          size: "sm",
          onClick: () => y.previousPage(),
          disabled: !y.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ f(
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
    n && r && /* @__PURE__ */ f(Yl, { table: y })
  ] });
}
function Uo({
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
  onFocus: h,
  onBlur: d,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ f(
    Js,
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
      onFocus: h,
      onBlur: d,
      getOptionLabel: b,
      renderInput: (y) => /* @__PURE__ */ f(
        Zs,
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
function $m({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, i] = de(1), [s, l] = de(r), [c, p] = de(
    Array.from({ length: r }, (d, b) => b + 1)
  );
  Ye(() => {
    i(1), e(1), l(r), t(r), p(Array.from({ length: r }, (d, b) => b + 1));
  }, [r, t, e]);
  const u = (d, b) => {
    i(b), e(b), b > s && (l(b), t(b));
  }, h = (d, b) => {
    l(b), t(b), b < o && (i(b), e(b));
  };
  return /* @__PURE__ */ H(Kn, { children: [
    /* @__PURE__ */ f(
      Lo,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ f(
          Uo,
          {
            onChange: (d, b) => u(d, b),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (d) => d.toString(),
            value: o,
            isDisabled: n
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ f(
      Lo,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ f(
          Uo,
          {
            onChange: (d, b) => h(d, b),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (d) => d.toString(),
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
var It = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(It || {});
function Jl({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = It.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: l = !1,
  className: c,
  onChange: p
}) {
  const u = /* @__PURE__ */ f(
    el,
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
  let h;
  if (n) {
    const d = r === It.Before || r === It.Above, b = /* @__PURE__ */ f("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), y = r === It.Before || r === It.After, v = y ? b : /* @__PURE__ */ f("div", { children: b }), m = y ? u : /* @__PURE__ */ f("div", { children: u });
    h = /* @__PURE__ */ H(
      Qs,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: l,
        children: [
          d && v,
          m,
          !d && v
        ]
      }
    );
  } else
    h = u;
  return h;
}
function Mm({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s
}) {
  return /* @__PURE__ */ H("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ f("legend", { children: n }),
    r.map((l) => /* @__PURE__ */ f(
      Jl,
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
function N() {
  return N = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, N.apply(this, arguments);
}
function Zl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ql(e) {
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
var $r = { exports: {} }, Pn = { exports: {} }, le = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ho;
function ec() {
  if (Ho)
    return le;
  Ho = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, h = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
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
            case h:
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
  function E(g) {
    return w(g) === p;
  }
  return le.AsyncMode = c, le.ConcurrentMode = p, le.ContextConsumer = l, le.ContextProvider = s, le.Element = t, le.ForwardRef = u, le.Fragment = r, le.Lazy = y, le.Memo = b, le.Portal = n, le.Profiler = i, le.StrictMode = o, le.Suspense = h, le.isAsyncMode = function(g) {
    return E(g) || w(g) === c;
  }, le.isConcurrentMode = E, le.isContextConsumer = function(g) {
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
    return w(g) === h;
  }, le.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === r || g === p || g === i || g === o || g === h || g === d || typeof g == "object" && g !== null && (g.$$typeof === y || g.$$typeof === b || g.$$typeof === s || g.$$typeof === l || g.$$typeof === u || g.$$typeof === m || g.$$typeof === x || g.$$typeof === I || g.$$typeof === v);
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
var Wo;
function tc() {
  return Wo || (Wo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, h = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
    function w(A) {
      return typeof A == "string" || typeof A == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      A === r || A === p || A === i || A === o || A === h || A === d || typeof A == "object" && A !== null && (A.$$typeof === y || A.$$typeof === b || A.$$typeof === s || A.$$typeof === l || A.$$typeof === u || A.$$typeof === m || A.$$typeof === x || A.$$typeof === I || A.$$typeof === v);
    }
    function E(A) {
      if (typeof A == "object" && A !== null) {
        var ee = A.$$typeof;
        switch (ee) {
          case t:
            var $ = A.type;
            switch ($) {
              case c:
              case p:
              case r:
              case i:
              case o:
              case h:
                return $;
              default:
                var ae = $ && $.$$typeof;
                switch (ae) {
                  case l:
                  case u:
                  case y:
                  case b:
                  case s:
                    return ae;
                  default:
                    return ee;
                }
            }
          case n:
            return ee;
        }
      }
    }
    var g = c, O = p, C = l, L = s, D = t, V = u, S = r, M = y, _ = b, B = n, z = i, P = o, j = h, Q = !1;
    function J(A) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), k(A) || E(A) === c;
    }
    function k(A) {
      return E(A) === p;
    }
    function R(A) {
      return E(A) === l;
    }
    function F(A) {
      return E(A) === s;
    }
    function X(A) {
      return typeof A == "object" && A !== null && A.$$typeof === t;
    }
    function U(A) {
      return E(A) === u;
    }
    function W(A) {
      return E(A) === r;
    }
    function Y(A) {
      return E(A) === y;
    }
    function G(A) {
      return E(A) === b;
    }
    function q(A) {
      return E(A) === n;
    }
    function K(A) {
      return E(A) === i;
    }
    function Z(A) {
      return E(A) === o;
    }
    function ie(A) {
      return E(A) === h;
    }
    ce.AsyncMode = g, ce.ConcurrentMode = O, ce.ContextConsumer = C, ce.ContextProvider = L, ce.Element = D, ce.ForwardRef = V, ce.Fragment = S, ce.Lazy = M, ce.Memo = _, ce.Portal = B, ce.Profiler = z, ce.StrictMode = P, ce.Suspense = j, ce.isAsyncMode = J, ce.isConcurrentMode = k, ce.isContextConsumer = R, ce.isContextProvider = F, ce.isElement = X, ce.isForwardRef = U, ce.isFragment = W, ce.isLazy = Y, ce.isMemo = G, ce.isPortal = q, ce.isProfiler = K, ce.isStrictMode = Z, ce.isSuspense = ie, ce.isValidElementType = w, ce.typeOf = E;
  }()), ce;
}
var qo;
function oa() {
  return qo || (qo = 1, process.env.NODE_ENV === "production" ? Pn.exports = ec() : Pn.exports = tc()), Pn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var gr, Xo;
function nc() {
  if (Xo)
    return gr;
  Xo = 1;
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
  return gr = o() ? Object.assign : function(i, s) {
    for (var l, c = r(i), p, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var h in l)
        t.call(l, h) && (c[h] = l[h]);
      if (e) {
        p = e(l);
        for (var d = 0; d < p.length; d++)
          n.call(l, p[d]) && (c[p[d]] = l[p[d]]);
      }
    }
    return c;
  }, gr;
}
var br, Yo;
function Zr() {
  if (Yo)
    return br;
  Yo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return br = e, br;
}
var vr, Go;
function ia() {
  return Go || (Go = 1, vr = Function.call.bind(Object.prototype.hasOwnProperty)), vr;
}
var yr, Ko;
function rc() {
  if (Ko)
    return yr;
  Ko = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Zr(), n = {}, r = ia();
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
          var h;
          try {
            if (typeof i[u] != "function") {
              var d = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            h = i[u](s, u, c, l, null, t);
          } catch (y) {
            h = y;
          }
          if (h && !(h instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof h + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), h instanceof Error && !(h.message in n)) {
            n[h.message] = !0;
            var b = p ? p() : "";
            e(
              "Failed " + l + " type: " + h.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, yr = o, yr;
}
var wr, Jo;
function oc() {
  if (Jo)
    return wr;
  Jo = 1;
  var e = oa(), t = nc(), n = Zr(), r = ia(), o = rc(), i = function() {
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
  return wr = function(l, c) {
    var p = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function h(k) {
      var R = k && (p && k[p] || k[u]);
      if (typeof R == "function")
        return R;
    }
    var d = "<<anonymous>>", b = {
      array: x("array"),
      bigint: x("bigint"),
      bool: x("boolean"),
      func: x("function"),
      number: x("number"),
      object: x("object"),
      string: x("string"),
      symbol: x("symbol"),
      any: I(),
      arrayOf: w,
      element: E(),
      elementType: g(),
      instanceOf: O,
      node: V(),
      objectOf: L,
      oneOf: C,
      oneOfType: D,
      shape: M,
      exact: _
    };
    function y(k, R) {
      return k === R ? k !== 0 || 1 / k === 1 / R : k !== k && R !== R;
    }
    function v(k, R) {
      this.message = k, this.data = R && typeof R == "object" ? R : {}, this.stack = "";
    }
    v.prototype = Error.prototype;
    function m(k) {
      if (process.env.NODE_ENV !== "production")
        var R = {}, F = 0;
      function X(W, Y, G, q, K, Z, ie) {
        if (q = q || d, Z = Z || G, ie !== n) {
          if (c) {
            var A = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw A.name = "Invariant Violation", A;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ee = q + ":" + G;
            !R[ee] && // Avoid spamming the console because they are often not actionable except for lib authors
            F < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + q + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), R[ee] = !0, F++);
          }
        }
        return Y[G] == null ? W ? Y[G] === null ? new v("The " + K + " `" + Z + "` is marked as required " + ("in `" + q + "`, but its value is `null`.")) : new v("The " + K + " `" + Z + "` is marked as required in " + ("`" + q + "`, but its value is `undefined`.")) : null : k(Y, G, q, K, Z);
      }
      var U = X.bind(null, !1);
      return U.isRequired = X.bind(null, !0), U;
    }
    function x(k) {
      function R(F, X, U, W, Y, G) {
        var q = F[X], K = P(q);
        if (K !== k) {
          var Z = j(q);
          return new v(
            "Invalid " + W + " `" + Y + "` of type " + ("`" + Z + "` supplied to `" + U + "`, expected ") + ("`" + k + "`."),
            { expectedType: k }
          );
        }
        return null;
      }
      return m(R);
    }
    function I() {
      return m(s);
    }
    function w(k) {
      function R(F, X, U, W, Y) {
        if (typeof k != "function")
          return new v("Property `" + Y + "` of component `" + U + "` has invalid PropType notation inside arrayOf.");
        var G = F[X];
        if (!Array.isArray(G)) {
          var q = P(G);
          return new v("Invalid " + W + " `" + Y + "` of type " + ("`" + q + "` supplied to `" + U + "`, expected an array."));
        }
        for (var K = 0; K < G.length; K++) {
          var Z = k(G, K, U, W, Y + "[" + K + "]", n);
          if (Z instanceof Error)
            return Z;
        }
        return null;
      }
      return m(R);
    }
    function E() {
      function k(R, F, X, U, W) {
        var Y = R[F];
        if (!l(Y)) {
          var G = P(Y);
          return new v("Invalid " + U + " `" + W + "` of type " + ("`" + G + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(k);
    }
    function g() {
      function k(R, F, X, U, W) {
        var Y = R[F];
        if (!e.isValidElementType(Y)) {
          var G = P(Y);
          return new v("Invalid " + U + " `" + W + "` of type " + ("`" + G + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(k);
    }
    function O(k) {
      function R(F, X, U, W, Y) {
        if (!(F[X] instanceof k)) {
          var G = k.name || d, q = J(F[X]);
          return new v("Invalid " + W + " `" + Y + "` of type " + ("`" + q + "` supplied to `" + U + "`, expected ") + ("instance of `" + G + "`."));
        }
        return null;
      }
      return m(R);
    }
    function C(k) {
      if (!Array.isArray(k))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function R(F, X, U, W, Y) {
        for (var G = F[X], q = 0; q < k.length; q++)
          if (y(G, k[q]))
            return null;
        var K = JSON.stringify(k, function(ie, A) {
          var ee = j(A);
          return ee === "symbol" ? String(A) : A;
        });
        return new v("Invalid " + W + " `" + Y + "` of value `" + String(G) + "` " + ("supplied to `" + U + "`, expected one of " + K + "."));
      }
      return m(R);
    }
    function L(k) {
      function R(F, X, U, W, Y) {
        if (typeof k != "function")
          return new v("Property `" + Y + "` of component `" + U + "` has invalid PropType notation inside objectOf.");
        var G = F[X], q = P(G);
        if (q !== "object")
          return new v("Invalid " + W + " `" + Y + "` of type " + ("`" + q + "` supplied to `" + U + "`, expected an object."));
        for (var K in G)
          if (r(G, K)) {
            var Z = k(G, K, U, W, Y + "." + K, n);
            if (Z instanceof Error)
              return Z;
          }
        return null;
      }
      return m(R);
    }
    function D(k) {
      if (!Array.isArray(k))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var R = 0; R < k.length; R++) {
        var F = k[R];
        if (typeof F != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Q(F) + " at index " + R + "."
          ), s;
      }
      function X(U, W, Y, G, q) {
        for (var K = [], Z = 0; Z < k.length; Z++) {
          var ie = k[Z], A = ie(U, W, Y, G, q, n);
          if (A == null)
            return null;
          A.data && r(A.data, "expectedType") && K.push(A.data.expectedType);
        }
        var ee = K.length > 0 ? ", expected one of type [" + K.join(", ") + "]" : "";
        return new v("Invalid " + G + " `" + q + "` supplied to " + ("`" + Y + "`" + ee + "."));
      }
      return m(X);
    }
    function V() {
      function k(R, F, X, U, W) {
        return B(R[F]) ? null : new v("Invalid " + U + " `" + W + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return m(k);
    }
    function S(k, R, F, X, U) {
      return new v(
        (k || "React class") + ": " + R + " type `" + F + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + U + "`."
      );
    }
    function M(k) {
      function R(F, X, U, W, Y) {
        var G = F[X], q = P(G);
        if (q !== "object")
          return new v("Invalid " + W + " `" + Y + "` of type `" + q + "` " + ("supplied to `" + U + "`, expected `object`."));
        for (var K in k) {
          var Z = k[K];
          if (typeof Z != "function")
            return S(U, W, Y, K, j(Z));
          var ie = Z(G, K, U, W, Y + "." + K, n);
          if (ie)
            return ie;
        }
        return null;
      }
      return m(R);
    }
    function _(k) {
      function R(F, X, U, W, Y) {
        var G = F[X], q = P(G);
        if (q !== "object")
          return new v("Invalid " + W + " `" + Y + "` of type `" + q + "` " + ("supplied to `" + U + "`, expected `object`."));
        var K = t({}, F[X], k);
        for (var Z in K) {
          var ie = k[Z];
          if (r(k, Z) && typeof ie != "function")
            return S(U, W, Y, Z, j(ie));
          if (!ie)
            return new v(
              "Invalid " + W + " `" + Y + "` key `" + Z + "` supplied to `" + U + "`.\nBad object: " + JSON.stringify(F[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(k), null, "  ")
            );
          var A = ie(G, Z, U, W, Y + "." + Z, n);
          if (A)
            return A;
        }
        return null;
      }
      return m(R);
    }
    function B(k) {
      switch (typeof k) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !k;
        case "object":
          if (Array.isArray(k))
            return k.every(B);
          if (k === null || l(k))
            return !0;
          var R = h(k);
          if (R) {
            var F = R.call(k), X;
            if (R !== k.entries) {
              for (; !(X = F.next()).done; )
                if (!B(X.value))
                  return !1;
            } else
              for (; !(X = F.next()).done; ) {
                var U = X.value;
                if (U && !B(U[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function z(k, R) {
      return k === "symbol" ? !0 : R ? R["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && R instanceof Symbol : !1;
    }
    function P(k) {
      var R = typeof k;
      return Array.isArray(k) ? "array" : k instanceof RegExp ? "object" : z(R, k) ? "symbol" : R;
    }
    function j(k) {
      if (typeof k > "u" || k === null)
        return "" + k;
      var R = P(k);
      if (R === "object") {
        if (k instanceof Date)
          return "date";
        if (k instanceof RegExp)
          return "regexp";
      }
      return R;
    }
    function Q(k) {
      var R = j(k);
      switch (R) {
        case "array":
        case "object":
          return "an " + R;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + R;
        default:
          return R;
      }
    }
    function J(k) {
      return !k.constructor || !k.constructor.name ? d : k.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, wr;
}
var xr, Zo;
function ic() {
  if (Zo)
    return xr;
  Zo = 1;
  var e = Zr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, xr = function() {
    function r(s, l, c, p, u, h) {
      if (h !== e) {
        var d = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw d.name = "Invariant Violation", d;
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
  }, xr;
}
if (process.env.NODE_ENV !== "production") {
  var ac = oa(), sc = !0;
  $r.exports = oc()(ac.isElement, sc);
} else
  $r.exports = ic()();
var lc = $r.exports;
const a = /* @__PURE__ */ Zl(lc);
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
function aa(e) {
  if (!yt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = aa(e[n]);
  }), t;
}
function rt(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? N({}, e) : e;
  return yt(e) && yt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (yt(t[o]) && o in e && yt(e[o]) ? r[o] = rt(e[o], t[o], n) : n.clone ? r[o] = yt(t[o]) ? aa(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function cc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function sa(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !cc(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const la = Wt(a.element, sa);
la.isRequired = Wt(a.element.isRequired, sa);
const vn = la;
function pc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function uc(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !pc(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const dc = Wt(a.elementType, uc), fc = "exact-prop: ​";
function ca(e) {
  return process.env.NODE_ENV === "production" ? e : N({}, e, {
    [fc]: (t) => {
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
var Mr = { exports: {} }, pe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qo;
function hc() {
  if (Qo)
    return pe;
  Qo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function v(m) {
    if (typeof m == "object" && m !== null) {
      var x = m.$$typeof;
      switch (x) {
        case e:
          switch (m = m.type, m) {
            case n:
            case o:
            case r:
            case p:
            case u:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case s:
                case c:
                case d:
                case h:
                case i:
                  return m;
                default:
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return pe.ContextConsumer = s, pe.ContextProvider = i, pe.Element = e, pe.ForwardRef = c, pe.Fragment = n, pe.Lazy = d, pe.Memo = h, pe.Portal = t, pe.Profiler = o, pe.StrictMode = r, pe.Suspense = p, pe.SuspenseList = u, pe.isAsyncMode = function() {
    return !1;
  }, pe.isConcurrentMode = function() {
    return !1;
  }, pe.isContextConsumer = function(m) {
    return v(m) === s;
  }, pe.isContextProvider = function(m) {
    return v(m) === i;
  }, pe.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, pe.isForwardRef = function(m) {
    return v(m) === c;
  }, pe.isFragment = function(m) {
    return v(m) === n;
  }, pe.isLazy = function(m) {
    return v(m) === d;
  }, pe.isMemo = function(m) {
    return v(m) === h;
  }, pe.isPortal = function(m) {
    return v(m) === t;
  }, pe.isProfiler = function(m) {
    return v(m) === o;
  }, pe.isStrictMode = function(m) {
    return v(m) === r;
  }, pe.isSuspense = function(m) {
    return v(m) === p;
  }, pe.isSuspenseList = function(m) {
    return v(m) === u;
  }, pe.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === n || m === o || m === r || m === p || m === u || m === b || typeof m == "object" && m !== null && (m.$$typeof === d || m.$$typeof === h || m.$$typeof === i || m.$$typeof === s || m.$$typeof === c || m.$$typeof === y || m.getModuleId !== void 0);
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
var ei;
function mc() {
  return ei || (ei = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y = !1, v = !1, m = !1, x = !1, I = !1, w;
    w = Symbol.for("react.module.reference");
    function E($) {
      return !!(typeof $ == "string" || typeof $ == "function" || $ === n || $ === o || I || $ === r || $ === p || $ === u || x || $ === b || y || v || m || typeof $ == "object" && $ !== null && ($.$$typeof === d || $.$$typeof === h || $.$$typeof === i || $.$$typeof === s || $.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      $.$$typeof === w || $.getModuleId !== void 0));
    }
    function g($) {
      if (typeof $ == "object" && $ !== null) {
        var ae = $.$$typeof;
        switch (ae) {
          case e:
            var Ee = $.type;
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
                  case d:
                  case h:
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
    var O = s, C = i, L = e, D = c, V = n, S = d, M = h, _ = t, B = o, z = r, P = p, j = u, Q = !1, J = !1;
    function k($) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function R($) {
      return J || (J = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function F($) {
      return g($) === s;
    }
    function X($) {
      return g($) === i;
    }
    function U($) {
      return typeof $ == "object" && $ !== null && $.$$typeof === e;
    }
    function W($) {
      return g($) === c;
    }
    function Y($) {
      return g($) === n;
    }
    function G($) {
      return g($) === d;
    }
    function q($) {
      return g($) === h;
    }
    function K($) {
      return g($) === t;
    }
    function Z($) {
      return g($) === o;
    }
    function ie($) {
      return g($) === r;
    }
    function A($) {
      return g($) === p;
    }
    function ee($) {
      return g($) === u;
    }
    ue.ContextConsumer = O, ue.ContextProvider = C, ue.Element = L, ue.ForwardRef = D, ue.Fragment = V, ue.Lazy = S, ue.Memo = M, ue.Portal = _, ue.Profiler = B, ue.StrictMode = z, ue.Suspense = P, ue.SuspenseList = j, ue.isAsyncMode = k, ue.isConcurrentMode = R, ue.isContextConsumer = F, ue.isContextProvider = X, ue.isElement = U, ue.isForwardRef = W, ue.isFragment = Y, ue.isLazy = G, ue.isMemo = q, ue.isPortal = K, ue.isProfiler = Z, ue.isStrictMode = ie, ue.isSuspense = A, ue.isSuspenseList = ee, ue.isValidElementType = E, ue.typeOf = g;
  }()), ue;
}
process.env.NODE_ENV === "production" ? Mr.exports = hc() : Mr.exports = mc();
var zn = Mr.exports;
const gc = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function bc(e) {
  const t = `${e}`.match(gc);
  return t && t[1] || "";
}
function pa(e, t = "") {
  return e.displayName || e.name || bc(e) || t;
}
function ti(e, t, n) {
  const r = pa(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function vc(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return pa(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case zn.ForwardRef:
          return ti(e, e.render, "ForwardRef");
        case zn.Memo:
          return ti(e, e.type, "memo");
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
const yc = a.oneOfType([a.func, a.object]), Qr = yc;
function Ke(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Bt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function _r(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function ua(e, t = 166) {
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
function wc(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function xc(e, t) {
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
function Ec(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? N({}, t.propTypes) : null;
  return (o) => (i, s, l, c, p, ...u) => {
    const h = p || s, d = n == null ? void 0 : n[h];
    if (d) {
      const b = d(i, s, l, c, p, ...u);
      if (b)
        return b;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${h}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Un(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Tc = typeof window < "u" ? T.useLayoutEffect : T.useEffect, Tt = Tc;
let ni = 0;
function kc(e) {
  const [t, n] = T.useState(e), r = e || t;
  return T.useEffect(() => {
    t == null && (ni += 1, n(`mui-${ni}`));
  }, [t]), r;
}
const ri = T["useId".toString()];
function da(e) {
  if (ri !== void 0) {
    const t = ri();
    return e ?? t;
  }
  return kc(e);
}
function Nc(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function fa({
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
function fn(e) {
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
      Un(n, t);
    });
  }, e);
}
const oi = {};
function Oc(e, t) {
  const n = T.useRef(oi);
  return n.current === oi && (n.current = e(t)), n;
}
const Sc = [];
function Cc(e) {
  T.useEffect(e, Sc);
}
class yn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new yn();
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
  const e = Oc(yn.create).current;
  return Cc(e.disposeEffect), e;
}
let Qn = !0, Ir = !1;
const Pc = new yn(), Rc = {
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
function $c(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Rc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Mc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Qn = !0);
}
function Er() {
  Qn = !1;
}
function _c() {
  this.visibilityState === "hidden" && Ir && (Qn = !0);
}
function Ic(e) {
  e.addEventListener("keydown", Mc, !0), e.addEventListener("mousedown", Er, !0), e.addEventListener("pointerdown", Er, !0), e.addEventListener("touchstart", Er, !0), e.addEventListener("visibilitychange", _c, !0);
}
function Ac(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Qn || $c(t);
}
function ha() {
  const e = T.useCallback((o) => {
    o != null && Ic(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function n() {
    return t.current ? (Ir = !0, Pc.start(100, () => {
      Ir = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Ac(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function ma(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Dc(e) {
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
function jc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Bc = Number.isInteger || jc;
function ga(e, t, n, r) {
  const o = e[t];
  if (o == null || !Bc(o)) {
    const i = Dc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function ba(e, t, ...n) {
  return e[t] === void 0 ? null : ga(e, t, ...n);
}
function Ar() {
  return null;
}
ba.isRequired = ga;
Ar.isRequired = Ar;
const va = process.env.NODE_ENV === "production" ? Ar : ba;
function ya(e, t) {
  const n = N({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = N({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = N({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = ya(o[s], i[s]);
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
const ii = (e) => e, Lc = () => {
  let e = ii;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = ii;
    }
  };
}, Vc = Lc(), wa = Vc, xa = {
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
  const r = xa[t];
  return r ? `${n}-${r}` : `${wa.generate(e)}-${t}`;
}
function ut(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Ze(e, o, n);
  }), r;
}
function Fc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function Ea(e) {
  return typeof e == "string";
}
function on(e, t, n) {
  return e === void 0 || Ea(e) ? t : N({}, t, {
    ownerState: N({}, t.ownerState, n)
  });
}
const zc = {
  disableDefaultClasses: !1
}, Uc = /* @__PURE__ */ T.createContext(zc);
function Hc(e) {
  const {
    disableDefaultClasses: t
  } = T.useContext(Uc);
  return (n) => t ? "" : e(n);
}
function Ta(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Wc(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function ai(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function qc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = Ne(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), y = N({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), v = N({}, n, o, r);
    return b.length > 0 && (v.className = b), Object.keys(y).length > 0 && (v.style = y), {
      props: v,
      internalRef: void 0
    };
  }
  const s = Ta(N({}, o, r)), l = ai(r), c = ai(o), p = t(s), u = Ne(p == null ? void 0 : p.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), h = N({}, p == null ? void 0 : p.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), d = N({}, p, n, c, l);
  return u.length > 0 && (d.className = u), Object.keys(h).length > 0 && (d.style = h), {
    props: d,
    internalRef: p.ref
  };
}
const Xc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function kt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = fe(e, Xc), l = i ? {} : Wc(r, o), {
    props: c,
    internalRef: p
  } = qc(N({}, s, {
    externalSlotProps: l
  })), u = Ue(p, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return on(n, N({}, c, {
    ref: u
  }), o);
}
const ka = "base";
function Yc(e) {
  return `${ka}--${e}`;
}
function Gc(e, t) {
  return `${ka}-${e}-${t}`;
}
function Na(e, t) {
  const n = xa[t];
  return n ? Yc(n) : Gc(e, t);
}
function Kc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Na(e, r);
  }), n;
}
const Jc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Zc(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Qc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function ep(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Qc(e));
}
function tp(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Jc)).forEach((r, o) => {
    const i = Zc(r);
    i === -1 || !ep(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function np() {
  return !0;
}
function Hn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = tp,
    isEnabled: s = np,
    open: l
  } = e, c = T.useRef(!1), p = T.useRef(null), u = T.useRef(null), h = T.useRef(null), d = T.useRef(null), b = T.useRef(!1), y = T.useRef(null), v = Ue(t.ref, y), m = T.useRef(null);
  T.useEffect(() => {
    !l || !y.current || (b.current = !n);
  }, [n, l]), T.useEffect(() => {
    if (!l || !y.current)
      return;
    const w = Oe(y.current);
    return y.current.contains(w.activeElement) || (y.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), y.current.setAttribute("tabIndex", "-1")), b.current && y.current.focus()), () => {
      o || (h.current && h.current.focus && (c.current = !0, h.current.focus()), h.current = null);
    };
  }, [l]), T.useEffect(() => {
    if (!l || !y.current)
      return;
    const w = Oe(y.current), E = (C) => {
      m.current = C, !(r || !s() || C.key !== "Tab") && w.activeElement === y.current && C.shiftKey && (c.current = !0, u.current && u.current.focus());
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
      if (w.activeElement !== d.current)
        d.current = null;
      else if (d.current !== null)
        return;
      if (!b.current)
        return;
      let L = [];
      if ((w.activeElement === p.current || w.activeElement === u.current) && (L = i(y.current)), L.length > 0) {
        var D, V;
        const S = !!((D = m.current) != null && D.shiftKey && ((V = m.current) == null ? void 0 : V.key) === "Tab"), M = L[0], _ = L[L.length - 1];
        typeof M != "string" && typeof _ != "string" && (S ? _.focus() : M.focus());
      } else
        C.focus();
    };
    w.addEventListener("focusin", g), w.addEventListener("keydown", E, !0);
    const O = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && g();
    }, 50);
    return () => {
      clearInterval(O), w.removeEventListener("focusin", g), w.removeEventListener("keydown", E, !0);
    };
  }, [n, r, o, s, l, i]);
  const x = (w) => {
    h.current === null && (h.current = w.relatedTarget), b.current = !0, d.current = w.target;
    const E = t.props.onFocus;
    E && E(w);
  }, I = (w) => {
    h.current === null && (h.current = w.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ H(T.Fragment, {
    children: [/* @__PURE__ */ f("div", {
      tabIndex: l ? 0 : -1,
      onFocus: I,
      ref: p,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: v,
      onFocus: x
    }), /* @__PURE__ */ f("div", {
      tabIndex: l ? 0 : -1,
      onFocus: I,
      ref: u,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Hn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: vn,
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
process.env.NODE_ENV !== "production" && (Hn["propTypes"] = ca(Hn.propTypes));
function rp(e) {
  return typeof e == "function" ? e() : e;
}
const hn = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, l] = T.useState(null), c = Ue(/* @__PURE__ */ T.isValidElement(r) ? r.ref : null, n);
  if (Tt(() => {
    i || l(rp(o) || document.body);
  }, [o, i]), Tt(() => {
    if (s && !i)
      return Un(n, s), () => {
        Un(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ T.isValidElement(r)) {
      const p = {
        ref: c
      };
      return /* @__PURE__ */ T.cloneElement(r, p);
    }
    return /* @__PURE__ */ f(T.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ f(T.Fragment, {
    children: s && /* @__PURE__ */ hl.createPortal(r, s)
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
process.env.NODE_ENV !== "production" && (hn["propTypes"] = ca(hn.propTypes));
function op(e) {
  const t = Oe(e);
  return t.body === e ? Lt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function ln(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function si(e) {
  return parseInt(Lt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function ip(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function li(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1, c = !ip(s);
    l && c && ln(s, o);
  });
}
function Tr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function ap(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (op(r)) {
      const s = ma(Oe(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${si(r) + s}px`;
      const l = Oe(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${si(c) + s}px`;
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
function sp(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class lp {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && ln(t.modalRef, !1);
    const o = sp(n);
    li(n, t.mount, t.modalRef, o, !0);
    const i = Tr(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Tr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = ap(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Tr(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && ln(t.modalRef, n), li(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && ln(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function cp(e) {
  return typeof e == "function" ? e() : e;
}
function pp(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const up = new lp();
function dp(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = up,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: p,
    open: u,
    rootRef: h
  } = e, d = T.useRef({}), b = T.useRef(null), y = T.useRef(null), v = Ue(y, h), [m, x] = T.useState(!u), I = pp(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const E = () => Oe(b.current), g = () => (d.current.modalRef = y.current, d.current.mount = b.current, d.current), O = () => {
    o.mount(g(), {
      disableScrollLock: r
    }), y.current && (y.current.scrollTop = 0);
  }, C = fn(() => {
    const P = cp(t) || E().body;
    o.add(g(), P), y.current && O();
  }), L = T.useCallback(() => o.isTopModal(g()), [o]), D = fn((P) => {
    b.current = P, P && (u && L() ? O() : y.current && ln(y.current, w));
  }), V = T.useCallback(() => {
    o.remove(g(), w);
  }, [w, o]);
  T.useEffect(() => () => {
    V();
  }, [V]), T.useEffect(() => {
    u ? C() : (!I || !i) && V();
  }, [u, V, I, i, C]);
  const S = (P) => (j) => {
    var Q;
    (Q = P.onKeyDown) == null || Q.call(P, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !L()) && (n || (j.stopPropagation(), p && p(j, "escapeKeyDown")));
  }, M = (P) => (j) => {
    var Q;
    (Q = P.onClick) == null || Q.call(P, j), j.target === j.currentTarget && p && p(j, "backdropClick");
  };
  return {
    getRootProps: (P = {}) => {
      const j = Ta(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const Q = N({}, j, P);
      return N({
        role: "presentation"
      }, Q, {
        onKeyDown: S(Q),
        ref: v
      });
    },
    getBackdropProps: (P = {}) => {
      const j = P;
      return N({
        "aria-hidden": !0
      }, j, {
        onClick: M(j),
        open: u
      });
    },
    getTransitionProps: () => {
      const P = () => {
        x(!1), s && s();
      }, j = () => {
        x(!0), l && l(), i && V();
      };
      return {
        onEnter: _r(P, c == null ? void 0 : c.props.onEnter),
        onExited: _r(j, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: v,
    portalRef: D,
    isTopModal: L,
    exited: m,
    hasTransition: I
  };
}
var Me = "top", He = "bottom", We = "right", _e = "left", eo = "auto", wn = [Me, He, We, _e], Vt = "start", mn = "end", fp = "clippingParents", Oa = "viewport", Qt = "popper", hp = "reference", ci = /* @__PURE__ */ wn.reduce(function(e, t) {
  return e.concat([t + "-" + Vt, t + "-" + mn]);
}, []), Sa = /* @__PURE__ */ [].concat(wn, [eo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Vt, t + "-" + mn]);
}, []), mp = "beforeRead", gp = "read", bp = "afterRead", vp = "beforeMain", yp = "main", wp = "afterMain", xp = "beforeWrite", Ep = "write", Tp = "afterWrite", kp = [mp, gp, bp, vp, yp, wp, xp, Ep, Tp];
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
function to(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Le(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Np(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !ze(i) || !Je(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function Op(e) {
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
const Sp = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Np,
  effect: Op,
  requires: ["computeStyles"]
};
function Ge(e) {
  return e.split("-")[0];
}
var xt = Math.max, Wn = Math.min, Ft = Math.round;
function Dr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ca() {
  return !/^((?!chrome|android).)*safari/i.test(Dr());
}
function zt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && ze(e) && (o = e.offsetWidth > 0 && Ft(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Ft(r.height) / e.offsetHeight || 1);
  var s = Nt(e) ? Le(e) : window, l = s.visualViewport, c = !Ca() && n, p = (r.left + (c && l ? l.offsetLeft : 0)) / o, u = (r.top + (c && l ? l.offsetTop : 0)) / i, h = r.width / o, d = r.height / i;
  return {
    width: h,
    height: d,
    top: u,
    right: p + h,
    bottom: u + d,
    left: p,
    x: p,
    y: u
  };
}
function no(e) {
  var t = zt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Pa(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && to(n)) {
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
function Cp(e) {
  return ["table", "td", "th"].indexOf(Je(e)) >= 0;
}
function dt(e) {
  return ((Nt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function er(e) {
  return Je(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (to(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    dt(e)
  );
}
function pi(e) {
  return !ze(e) || // https://github.com/popperjs/popper-core/issues/837
  it(e).position === "fixed" ? null : e.offsetParent;
}
function Pp(e) {
  var t = /firefox/i.test(Dr()), n = /Trident/i.test(Dr());
  if (n && ze(e)) {
    var r = it(e);
    if (r.position === "fixed")
      return null;
  }
  var o = er(e);
  for (to(o) && (o = o.host); ze(o) && ["html", "body"].indexOf(Je(o)) < 0; ) {
    var i = it(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function xn(e) {
  for (var t = Le(e), n = pi(e); n && Cp(n) && it(n).position === "static"; )
    n = pi(n);
  return n && (Je(n) === "html" || Je(n) === "body" && it(n).position === "static") ? t : n || Pp(e) || t;
}
function ro(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function cn(e, t, n) {
  return xt(e, Wn(t, n));
}
function Rp(e, t, n) {
  var r = cn(e, t, n);
  return r > n ? n : r;
}
function Ra() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function $a(e) {
  return Object.assign({}, Ra(), e);
}
function Ma(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var $p = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, $a(typeof t != "number" ? t : Ma(t, wn));
};
function Mp(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Ge(n.placement), c = ro(l), p = [_e, We].indexOf(l) >= 0, u = p ? "height" : "width";
  if (!(!i || !s)) {
    var h = $p(o.padding, n), d = no(i), b = c === "y" ? Me : _e, y = c === "y" ? He : We, v = n.rects.reference[u] + n.rects.reference[c] - s[c] - n.rects.popper[u], m = s[c] - n.rects.reference[c], x = xn(i), I = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, w = v / 2 - m / 2, E = h[b], g = I - d[u] - h[y], O = I / 2 - d[u] / 2 + w, C = cn(E, O, g), L = c;
    n.modifiersData[r] = (t = {}, t[L] = C, t.centerOffset = C - O, t);
  }
}
function _p(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Pa(t.elements.popper, o) && (t.elements.arrow = o));
}
const Ip = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Mp,
  effect: _p,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ut(e) {
  return e.split("-")[1];
}
var Ap = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Dp(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Ft(n * o) / o || 0,
    y: Ft(r * o) / o || 0
  };
}
function ui(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, p = e.adaptive, u = e.roundOffsets, h = e.isFixed, d = s.x, b = d === void 0 ? 0 : d, y = s.y, v = y === void 0 ? 0 : y, m = typeof u == "function" ? u({
    x: b,
    y: v
  }) : {
    x: b,
    y: v
  };
  b = m.x, v = m.y;
  var x = s.hasOwnProperty("x"), I = s.hasOwnProperty("y"), w = _e, E = Me, g = window;
  if (p) {
    var O = xn(n), C = "clientHeight", L = "clientWidth";
    if (O === Le(n) && (O = dt(n), it(O).position !== "static" && l === "absolute" && (C = "scrollHeight", L = "scrollWidth")), O = O, o === Me || (o === _e || o === We) && i === mn) {
      E = He;
      var D = h && O === g && g.visualViewport ? g.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        O[C]
      );
      v -= D - r.height, v *= c ? 1 : -1;
    }
    if (o === _e || (o === Me || o === He) && i === mn) {
      w = We;
      var V = h && O === g && g.visualViewport ? g.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        O[L]
      );
      b -= V - r.width, b *= c ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: l
  }, p && Ap), M = u === !0 ? Dp({
    x: b,
    y: v
  }, Le(n)) : {
    x: b,
    y: v
  };
  if (b = M.x, v = M.y, c) {
    var _;
    return Object.assign({}, S, (_ = {}, _[E] = I ? "0" : "", _[w] = x ? "0" : "", _.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + v + "px)" : "translate3d(" + b + "px, " + v + "px, 0)", _));
  }
  return Object.assign({}, S, (t = {}, t[E] = I ? v + "px" : "", t[w] = x ? b + "px" : "", t.transform = "", t));
}
function jp(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, p = {
    placement: Ge(t.placement),
    variation: Ut(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ui(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ui(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Bp = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: jp,
  data: {}
};
var Rn = {
  passive: !0
};
function Lp(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Le(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && p.forEach(function(u) {
    u.addEventListener("scroll", n.update, Rn);
  }), l && c.addEventListener("resize", n.update, Rn), function() {
    i && p.forEach(function(u) {
      u.removeEventListener("scroll", n.update, Rn);
    }), l && c.removeEventListener("resize", n.update, Rn);
  };
}
const Vp = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Lp,
  data: {}
};
var Fp = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function An(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Fp[t];
  });
}
var zp = {
  start: "end",
  end: "start"
};
function di(e) {
  return e.replace(/start|end/g, function(t) {
    return zp[t];
  });
}
function oo(e) {
  var t = Le(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function io(e) {
  return zt(dt(e)).left + oo(e).scrollLeft;
}
function Up(e, t) {
  var n = Le(e), r = dt(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    var p = Ca();
    (p || !p && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: l + io(e),
    y: c
  };
}
function Hp(e) {
  var t, n = dt(e), r = oo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = xt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = xt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + io(e), c = -r.scrollTop;
  return it(o || n).direction === "rtl" && (l += xt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function ao(e) {
  var t = it(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function _a(e) {
  return ["html", "body", "#document"].indexOf(Je(e)) >= 0 ? e.ownerDocument.body : ze(e) && ao(e) ? e : _a(er(e));
}
function pn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = _a(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Le(r), s = o ? [i].concat(i.visualViewport || [], ao(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(pn(er(s)))
  );
}
function jr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Wp(e, t) {
  var n = zt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function fi(e, t, n) {
  return t === Oa ? jr(Up(e, n)) : Nt(t) ? Wp(t, n) : jr(Hp(dt(e)));
}
function qp(e) {
  var t = pn(er(e)), n = ["absolute", "fixed"].indexOf(it(e).position) >= 0, r = n && ze(e) ? xn(e) : e;
  return Nt(r) ? t.filter(function(o) {
    return Nt(o) && Pa(o, r) && Je(o) !== "body";
  }) : [];
}
function Xp(e, t, n, r) {
  var o = t === "clippingParents" ? qp(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], l = i.reduce(function(c, p) {
    var u = fi(e, p, r);
    return c.top = xt(u.top, c.top), c.right = Wn(u.right, c.right), c.bottom = Wn(u.bottom, c.bottom), c.left = xt(u.left, c.left), c;
  }, fi(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Ia(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ge(r) : null, i = r ? Ut(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Me:
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
    case _e:
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
  var p = o ? ro(o) : null;
  if (p != null) {
    var u = p === "y" ? "height" : "width";
    switch (i) {
      case Vt:
        c[p] = c[p] - (t[u] / 2 - n[u] / 2);
        break;
      case mn:
        c[p] = c[p] + (t[u] / 2 - n[u] / 2);
        break;
    }
  }
  return c;
}
function gn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? fp : l, p = n.rootBoundary, u = p === void 0 ? Oa : p, h = n.elementContext, d = h === void 0 ? Qt : h, b = n.altBoundary, y = b === void 0 ? !1 : b, v = n.padding, m = v === void 0 ? 0 : v, x = $a(typeof m != "number" ? m : Ma(m, wn)), I = d === Qt ? hp : Qt, w = e.rects.popper, E = e.elements[y ? I : d], g = Xp(Nt(E) ? E : E.contextElement || dt(e.elements.popper), c, u, s), O = zt(e.elements.reference), C = Ia({
    reference: O,
    element: w,
    strategy: "absolute",
    placement: o
  }), L = jr(Object.assign({}, w, C)), D = d === Qt ? L : O, V = {
    top: g.top - D.top + x.top,
    bottom: D.bottom - g.bottom + x.bottom,
    left: g.left - D.left + x.left,
    right: D.right - g.right + x.right
  }, S = e.modifiersData.offset;
  if (d === Qt && S) {
    var M = S[o];
    Object.keys(V).forEach(function(_) {
      var B = [We, He].indexOf(_) >= 0 ? 1 : -1, z = [Me, He].indexOf(_) >= 0 ? "y" : "x";
      V[_] += M[z] * B;
    });
  }
  return V;
}
function Yp(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, p = c === void 0 ? Sa : c, u = Ut(r), h = u ? l ? ci : ci.filter(function(y) {
    return Ut(y) === u;
  }) : wn, d = h.filter(function(y) {
    return p.indexOf(y) >= 0;
  });
  d.length === 0 && (d = h);
  var b = d.reduce(function(y, v) {
    return y[v] = gn(e, {
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
function Gp(e) {
  if (Ge(e) === eo)
    return [];
  var t = An(e);
  return [di(e), t, di(t)];
}
function Kp(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, p = n.padding, u = n.boundary, h = n.rootBoundary, d = n.altBoundary, b = n.flipVariations, y = b === void 0 ? !0 : b, v = n.allowedAutoPlacements, m = t.options.placement, x = Ge(m), I = x === m, w = c || (I || !y ? [An(m)] : Gp(m)), E = [m].concat(w).reduce(function(U, W) {
      return U.concat(Ge(W) === eo ? Yp(t, {
        placement: W,
        boundary: u,
        rootBoundary: h,
        padding: p,
        flipVariations: y,
        allowedAutoPlacements: v
      }) : W);
    }, []), g = t.rects.reference, O = t.rects.popper, C = /* @__PURE__ */ new Map(), L = !0, D = E[0], V = 0; V < E.length; V++) {
      var S = E[V], M = Ge(S), _ = Ut(S) === Vt, B = [Me, He].indexOf(M) >= 0, z = B ? "width" : "height", P = gn(t, {
        placement: S,
        boundary: u,
        rootBoundary: h,
        altBoundary: d,
        padding: p
      }), j = B ? _ ? We : _e : _ ? He : Me;
      g[z] > O[z] && (j = An(j));
      var Q = An(j), J = [];
      if (i && J.push(P[M] <= 0), l && J.push(P[j] <= 0, P[Q] <= 0), J.every(function(U) {
        return U;
      })) {
        D = S, L = !1;
        break;
      }
      C.set(S, J);
    }
    if (L)
      for (var k = y ? 3 : 1, R = function(W) {
        var Y = E.find(function(G) {
          var q = C.get(G);
          if (q)
            return q.slice(0, W).every(function(K) {
              return K;
            });
        });
        if (Y)
          return D = Y, "break";
      }, F = k; F > 0; F--) {
        var X = R(F);
        if (X === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[r]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const Jp = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Kp,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function hi(e, t, n) {
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
function mi(e) {
  return [Me, We, He, _e].some(function(t) {
    return e[t] >= 0;
  });
}
function Zp(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = gn(t, {
    elementContext: "reference"
  }), l = gn(t, {
    altBoundary: !0
  }), c = hi(s, r), p = hi(l, o, i), u = mi(c), h = mi(p);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: p,
    isReferenceHidden: u,
    hasPopperEscaped: h
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": h
  });
}
const Qp = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Zp
};
function eu(e, t, n) {
  var r = Ge(e), o = [_e, Me].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], l = i[1];
  return s = s || 0, l = (l || 0) * o, [_e, We].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function tu(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = Sa.reduce(function(u, h) {
    return u[h] = eu(h, t.rects, i), u;
  }, {}), l = s[t.placement], c = l.x, p = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += p), t.modifiersData[r] = s;
}
const nu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: tu
};
function ru(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Ia({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const ou = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ru,
  data: {}
};
function iu(e) {
  return e === "x" ? "y" : "x";
}
function au(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, p = n.rootBoundary, u = n.altBoundary, h = n.padding, d = n.tether, b = d === void 0 ? !0 : d, y = n.tetherOffset, v = y === void 0 ? 0 : y, m = gn(t, {
    boundary: c,
    rootBoundary: p,
    padding: h,
    altBoundary: u
  }), x = Ge(t.placement), I = Ut(t.placement), w = !I, E = ro(x), g = iu(E), O = t.modifiersData.popperOffsets, C = t.rects.reference, L = t.rects.popper, D = typeof v == "function" ? v(Object.assign({}, t.rects, {
    placement: t.placement
  })) : v, V = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, M = {
    x: 0,
    y: 0
  };
  if (O) {
    if (i) {
      var _, B = E === "y" ? Me : _e, z = E === "y" ? He : We, P = E === "y" ? "height" : "width", j = O[E], Q = j + m[B], J = j - m[z], k = b ? -L[P] / 2 : 0, R = I === Vt ? C[P] : L[P], F = I === Vt ? -L[P] : -C[P], X = t.elements.arrow, U = b && X ? no(X) : {
        width: 0,
        height: 0
      }, W = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ra(), Y = W[B], G = W[z], q = cn(0, C[P], U[P]), K = w ? C[P] / 2 - k - q - Y - V.mainAxis : R - q - Y - V.mainAxis, Z = w ? -C[P] / 2 + k + q + G + V.mainAxis : F + q + G + V.mainAxis, ie = t.elements.arrow && xn(t.elements.arrow), A = ie ? E === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, ee = (_ = S == null ? void 0 : S[E]) != null ? _ : 0, $ = j + K - ee - A, ae = j + Z - ee, Ee = cn(b ? Wn(Q, $) : Q, j, b ? xt(J, ae) : J);
      O[E] = Ee, M[E] = Ee - j;
    }
    if (l) {
      var Ce, we = E === "x" ? Me : _e, ht = E === "x" ? He : We, Pe = O[g], Qe = g === "y" ? "height" : "width", Ae = Pe + m[we], et = Pe - m[ht], Te = [Me, _e].indexOf(x) !== -1, St = (Ce = S == null ? void 0 : S[g]) != null ? Ce : 0, mt = Te ? Ae : Pe - C[Qe] - L[Qe] - St + V.altAxis, qt = Te ? Pe + C[Qe] + L[Qe] - St - V.altAxis : et, Nn = b && Te ? Rp(mt, Pe, qt) : cn(b ? mt : Ae, Pe, b ? qt : et);
      O[g] = Nn, M[g] = Nn - Pe;
    }
    t.modifiersData[r] = M;
  }
}
const su = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: au,
  requiresIfExists: ["offset"]
};
function lu(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function cu(e) {
  return e === Le(e) || !ze(e) ? oo(e) : lu(e);
}
function pu(e) {
  var t = e.getBoundingClientRect(), n = Ft(t.width) / e.offsetWidth || 1, r = Ft(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function uu(e, t, n) {
  n === void 0 && (n = !1);
  var r = ze(t), o = ze(t) && pu(t), i = dt(t), s = zt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Je(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  ao(i)) && (l = cu(t)), ze(t) ? (c = zt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = io(i))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function du(e) {
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
function fu(e) {
  var t = du(e);
  return kp.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function hu(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function mu(e) {
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
var gi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function bi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function gu(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? gi : o;
  return function(l, c, p) {
    p === void 0 && (p = i);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, gi, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, h = [], d = !1, b = {
      state: u,
      setOptions: function(x) {
        var I = typeof x == "function" ? x(u.options) : x;
        v(), u.options = Object.assign({}, i, u.options, I), u.scrollParents = {
          reference: Nt(l) ? pn(l) : l.contextElement ? pn(l.contextElement) : [],
          popper: pn(c)
        };
        var w = fu(mu([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = w.filter(function(E) {
          return E.enabled;
        }), y(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!d) {
          var x = u.elements, I = x.reference, w = x.popper;
          if (bi(I, w)) {
            u.rects = {
              reference: uu(I, xn(w), u.options.strategy === "fixed"),
              popper: no(w)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(V) {
              return u.modifiersData[V.name] = Object.assign({}, V.data);
            });
            for (var E = 0; E < u.orderedModifiers.length; E++) {
              if (u.reset === !0) {
                u.reset = !1, E = -1;
                continue;
              }
              var g = u.orderedModifiers[E], O = g.fn, C = g.options, L = C === void 0 ? {} : C, D = g.name;
              typeof O == "function" && (u = O({
                state: u,
                options: L,
                name: D,
                instance: b
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: hu(function() {
        return new Promise(function(m) {
          b.forceUpdate(), m(u);
        });
      }),
      destroy: function() {
        v(), d = !0;
      }
    };
    if (!bi(l, c))
      return b;
    b.setOptions(p).then(function(m) {
      !d && p.onFirstUpdate && p.onFirstUpdate(m);
    });
    function y() {
      u.orderedModifiers.forEach(function(m) {
        var x = m.name, I = m.options, w = I === void 0 ? {} : I, E = m.effect;
        if (typeof E == "function") {
          var g = E({
            state: u,
            name: x,
            instance: b,
            options: w
          }), O = function() {
          };
          h.push(g || O);
        }
      });
    }
    function v() {
      h.forEach(function(m) {
        return m();
      }), h = [];
    }
    return b;
  };
}
var bu = [Vp, ou, Bp, Sp, nu, Jp, su, Ip, Qp], vu = /* @__PURE__ */ gu({
  defaultModifiers: bu
});
const Aa = "Popper";
function yu(e) {
  return Na(Aa, e);
}
Kc(Aa, ["root"]);
const wu = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], xu = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Eu(e, t) {
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
function tr(e) {
  return e.nodeType !== void 0;
}
function Tu(e) {
  return !tr(e);
}
const ku = () => st({
  root: ["root"]
}, Hc(yu)), Nu = {}, Ou = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: p,
    placement: u,
    popperOptions: h,
    popperRef: d,
    slotProps: b = {},
    slots: y = {},
    TransitionProps: v
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, m = fe(t, wu), x = T.useRef(null), I = Ue(x, n), w = T.useRef(null), E = Ue(w, d), g = T.useRef(E);
  Tt(() => {
    g.current = E;
  }, [E]), T.useImperativeHandle(d, () => w.current, []);
  const O = Eu(u, s), [C, L] = T.useState(O), [D, V] = T.useState(qn(o));
  T.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), T.useEffect(() => {
    o && V(qn(o));
  }, [o]), Tt(() => {
    if (!D || !p)
      return;
    const z = (Q) => {
      L(Q.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && tr(D) && D.nodeType === 1) {
      const Q = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Q.top === 0 && Q.left === 0 && Q.right === 0 && Q.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let P = [{
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
        z(Q);
      }
    }];
    c != null && (P = P.concat(c)), h && h.modifiers != null && (P = P.concat(h.modifiers));
    const j = vu(D, x.current, N({
      placement: O
    }, h, {
      modifiers: P
    }));
    return g.current(j), () => {
      j.destroy(), g.current(null);
    };
  }, [D, l, c, p, h, O]);
  const S = {
    placement: C
  };
  v !== null && (S.TransitionProps = v);
  const M = ku(), _ = (r = y.root) != null ? r : "div", B = kt({
    elementType: _,
    externalSlotProps: b.root,
    externalForwardedProps: m,
    additionalProps: {
      role: "tooltip",
      ref: I
    },
    ownerState: t,
    className: M.root
  });
  return /* @__PURE__ */ f(_, N({}, B, {
    children: typeof i == "function" ? i(S) : i
  }));
}), Da = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: p,
    open: u,
    placement: h = "bottom",
    popperOptions: d = Nu,
    popperRef: b,
    style: y,
    transition: v = !1,
    slotProps: m = {},
    slots: x = {}
  } = t, I = fe(t, xu), [w, E] = T.useState(!0), g = () => {
    E(!1);
  }, O = () => {
    E(!0);
  };
  if (!c && !u && (!v || w))
    return null;
  let C;
  if (i)
    C = i;
  else if (r) {
    const V = qn(r);
    C = V && tr(V) ? Oe(V).body : Oe(null).body;
  }
  const L = !u && c && (!v || w) ? "none" : void 0, D = v ? {
    in: u,
    onEnter: g,
    onExited: O
  } : void 0;
  return /* @__PURE__ */ f(hn, {
    disablePortal: l,
    container: C,
    children: /* @__PURE__ */ f(Ou, N({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: p,
      ref: n,
      open: v ? !w : u,
      placement: h,
      popperOptions: d,
      popperRef: b,
      slotProps: m,
      slots: x
    }, I, {
      style: N({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: L
      }, y),
      TransitionProps: D,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Da.propTypes = {
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
      if (t && tr(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Tu(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  popperRef: Qr,
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
const Su = ["values", "unit", "step"], Cu = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => N({}, n, {
    [r.key]: r.val
  }), {});
};
function Pu(e) {
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
  } = e, o = fe(e, Su), i = Cu(t), s = Object.keys(i);
  function l(d) {
    return `@media (min-width:${typeof t[d] == "number" ? t[d] : d}${n})`;
  }
  function c(d) {
    return `@media (max-width:${(typeof t[d] == "number" ? t[d] : d) - r / 100}${n})`;
  }
  function p(d, b) {
    const y = s.indexOf(b);
    return `@media (min-width:${typeof t[d] == "number" ? t[d] : d}${n}) and (max-width:${(y !== -1 && typeof t[s[y]] == "number" ? t[s[y]] : b) - r / 100}${n})`;
  }
  function u(d) {
    return s.indexOf(d) + 1 < s.length ? p(d, s[s.indexOf(d) + 1]) : l(d);
  }
  function h(d) {
    const b = s.indexOf(d);
    return b === 0 ? l(s[1]) : b === s.length - 1 ? c(s[b]) : p(d, s[s.indexOf(d) + 1]).replace("@media", "@media not all and");
  }
  return N({
    keys: s,
    values: i,
    up: l,
    down: c,
    between: p,
    only: u,
    not: h,
    unit: n
  }, o);
}
const Ru = {
  borderRadius: 4
}, $u = Ru, Mu = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, ft = Mu;
function un(e, t) {
  return t ? rt(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const so = {
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
}, vi = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${so[e]}px)`
};
function at(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || vi;
    return t.reduce((s, l, c) => (s[i.up(i.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || vi;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || so).indexOf(l) !== -1) {
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
function _u(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function Iu(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function nr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Xn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = nr(e, n) || r, t && (o = t(o, r, e)), o;
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
    const l = s[t], c = s.theme, p = nr(c, r) || {};
    return at(s, l, (h) => {
      let d = Xn(p, o, h);
      return h === d && typeof h == "string" && (d = Xn(p, o, `${t}${h === "default" ? "" : Ke(h)}`, h)), n === !1 ? d : {
        [n]: d
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: ft
  } : {}, i.filterProps = [t], i;
}
function Au(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const Du = {
  m: "margin",
  p: "padding"
}, ju = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, yi = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Bu = Au((e) => {
  if (e.length > 2)
    if (yi[e])
      e = yi[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Du[t], o = ju[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), rr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], or = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Lu = [...rr, ...or];
function En(e, t, n, r) {
  var o;
  const i = (o = nr(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ja(e) {
  return En(e, "spacing", 8, "spacing");
}
function Tn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Vu(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = Tn(t, n), r), {});
}
function Fu(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Bu(n), i = Vu(o, r), s = e[n];
  return at(e, s, i);
}
function Ba(e, t) {
  const n = ja(e.theme);
  return Object.keys(e).map((r) => Fu(e, t, r, n)).reduce(un, {});
}
function be(e) {
  return Ba(e, rr);
}
be.propTypes = process.env.NODE_ENV !== "production" ? rr.reduce((e, t) => (e[t] = ft, e), {}) : {};
be.filterProps = rr;
function ve(e) {
  return Ba(e, or);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? or.reduce((e, t) => (e[t] = ft, e), {}) : {};
ve.filterProps = or;
process.env.NODE_ENV !== "production" && Lu.reduce((e, t) => (e[t] = ft, e), {});
function zu(e = 8) {
  if (e.mui)
    return e;
  const t = ja({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function ir(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? un(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Fe(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function qe(e, t) {
  return xe({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Uu = qe("border", Fe), Hu = qe("borderTop", Fe), Wu = qe("borderRight", Fe), qu = qe("borderBottom", Fe), Xu = qe("borderLeft", Fe), Yu = qe("borderColor"), Gu = qe("borderTopColor"), Ku = qe("borderRightColor"), Ju = qe("borderBottomColor"), Zu = qe("borderLeftColor"), Qu = qe("outline", Fe), ed = qe("outlineColor"), ar = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = En(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Tn(t, r)
    });
    return at(e, e.borderRadius, n);
  }
  return null;
};
ar.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ft
} : {};
ar.filterProps = ["borderRadius"];
ir(Uu, Hu, Wu, qu, Xu, Yu, Gu, Ku, Ju, Zu, ar, Qu, ed);
const sr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = En(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Tn(t, r)
    });
    return at(e, e.gap, n);
  }
  return null;
};
sr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ft
} : {};
sr.filterProps = ["gap"];
const lr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = En(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Tn(t, r)
    });
    return at(e, e.columnGap, n);
  }
  return null;
};
lr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ft
} : {};
lr.filterProps = ["columnGap"];
const cr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = En(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Tn(t, r)
    });
    return at(e, e.rowGap, n);
  }
  return null;
};
cr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ft
} : {};
cr.filterProps = ["rowGap"];
const td = xe({
  prop: "gridColumn"
}), nd = xe({
  prop: "gridRow"
}), rd = xe({
  prop: "gridAutoFlow"
}), od = xe({
  prop: "gridAutoColumns"
}), id = xe({
  prop: "gridAutoRows"
}), ad = xe({
  prop: "gridTemplateColumns"
}), sd = xe({
  prop: "gridTemplateRows"
}), ld = xe({
  prop: "gridTemplateAreas"
}), cd = xe({
  prop: "gridArea"
});
ir(sr, lr, cr, td, nd, rd, od, id, ad, sd, ld, cd);
function jt(e, t) {
  return t === "grey" ? t : e;
}
const pd = xe({
  prop: "color",
  themeKey: "palette",
  transform: jt
}), ud = xe({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: jt
}), dd = xe({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: jt
});
ir(pd, ud, dd);
function Be(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const fd = xe({
  prop: "width",
  transform: Be
}), lo = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || so[n];
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
lo.filterProps = ["maxWidth"];
const hd = xe({
  prop: "minWidth",
  transform: Be
}), md = xe({
  prop: "height",
  transform: Be
}), gd = xe({
  prop: "maxHeight",
  transform: Be
}), bd = xe({
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
const vd = xe({
  prop: "boxSizing"
});
ir(fd, lo, hd, md, gd, bd, vd);
const yd = {
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
    style: ar
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
    style: sr
  },
  rowGap: {
    style: cr
  },
  columnGap: {
    style: lr
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
    style: lo
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
}, co = yd;
function wd(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function xd(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ed() {
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
      style: h
    } = l;
    if (r == null)
      return null;
    if (p === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const d = nr(o, p) || {};
    return h ? h(s) : at(s, r, (y) => {
      let v = Xn(d, u, y);
      return y === v && typeof y == "string" && (v = Xn(d, u, `${n}${y === "default" ? "" : Ke(y)}`, y)), c === !1 ? v : {
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
    const s = (r = i.unstable_sxConfig) != null ? r : co;
    function l(c) {
      let p = c;
      if (typeof c == "function")
        p = c(i);
      else if (typeof c != "object")
        return c;
      if (!p)
        return null;
      const u = _u(i.breakpoints), h = Object.keys(u);
      let d = u;
      return Object.keys(p).forEach((b) => {
        const y = xd(p[b], i);
        if (y != null)
          if (typeof y == "object")
            if (s[b])
              d = un(d, e(b, y, i, s));
            else {
              const v = at({
                theme: i
              }, y, (m) => ({
                [b]: m
              }));
              wd(v, y) ? d[b] = t({
                sx: y,
                theme: i
              }) : d = un(d, v);
            }
          else
            d = un(d, e(b, y, i, s));
      }), Iu(h, d);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const La = Ed();
La.filterProps = ["sx"];
const po = La;
function Td(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const kd = ["breakpoints", "palette", "spacing", "shape"];
function uo(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = fe(e, kd), l = Pu(n), c = zu(o);
  let p = rt({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: N({
      mode: "light"
    }, r),
    spacing: c,
    shape: N({}, $u, i)
  }, s);
  return p.applyStyles = Td, p = t.reduce((u, h) => rt(u, h), p), p.unstable_sxConfig = N({}, co, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(h) {
    return po({
      sx: h,
      theme: this
    });
  }, p;
}
function Nd(e) {
  return Object.keys(e).length === 0;
}
function Va(e = null) {
  const t = T.useContext(dl);
  return !t || Nd(t) ? e : t;
}
const Od = uo();
function Fa(e = Od) {
  return Va(e);
}
const Sd = ["ownerState"], Cd = ["variants"], Pd = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Rd(e) {
  return Object.keys(e).length === 0;
}
function $d(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Dn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Md = uo(), wi = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function $n({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Rd(t) ? e : t[n] || t;
}
function _d(e) {
  return e ? (t, n) => n[e] : null;
}
function jn(e, t) {
  let {
    ownerState: n
  } = t, r = fe(t, Sd);
  const o = typeof e == "function" ? e(N({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => jn(i, N({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = fe(o, Cd);
    return i.forEach((c) => {
      let p = !0;
      typeof c.props == "function" ? p = c.props(N({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((u) => {
        (n == null ? void 0 : n[u]) !== c.props[u] && r[u] !== c.props[u] && (p = !1);
      }), p && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(N({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Id(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Md,
    rootShouldForwardProp: r = Dn,
    slotShouldForwardProp: o = Dn
  } = e, i = (s) => po(N({}, s, {
    theme: $n(N({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, l = {}) => {
    fl(s, (g) => g.filter((O) => !(O != null && O.__mui_systemSx)));
    const {
      name: c,
      slot: p,
      skipVariantsResolver: u,
      skipSx: h,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = _d(wi(p))
    } = l, b = fe(l, Pd), y = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      p && p !== "Root" && p !== "root" || !1
    ), v = h || !1;
    let m;
    process.env.NODE_ENV !== "production" && c && (m = `${c}-${wi(p || "Root")}`);
    let x = Dn;
    p === "Root" || p === "root" ? x = r : p ? x = o : $d(s) && (x = void 0);
    const I = ul(s, N({
      shouldForwardProp: x,
      label: m
    }, b)), w = (g) => typeof g == "function" && g.__emotion_real !== g || yt(g) ? (O) => jn(g, N({}, O, {
      theme: $n({
        theme: O.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : g, E = (g, ...O) => {
      let C = w(g);
      const L = O ? O.map(w) : [];
      c && d && L.push((S) => {
        const M = $n(N({}, S, {
          defaultTheme: n,
          themeId: t
        }));
        if (!M.components || !M.components[c] || !M.components[c].styleOverrides)
          return null;
        const _ = M.components[c].styleOverrides, B = {};
        return Object.entries(_).forEach(([z, P]) => {
          B[z] = jn(P, N({}, S, {
            theme: M
          }));
        }), d(S, B);
      }), c && !y && L.push((S) => {
        var M;
        const _ = $n(N({}, S, {
          defaultTheme: n,
          themeId: t
        })), B = _ == null || (M = _.components) == null || (M = M[c]) == null ? void 0 : M.variants;
        return jn({
          variants: B
        }, N({}, S, {
          theme: _
        }));
      }), v || L.push(i);
      const D = L.length - O.length;
      if (Array.isArray(g) && D > 0) {
        const S = new Array(D).fill("");
        C = [...g, ...S], C.raw = [...g.raw, ...S];
      }
      const V = I(C, ...L);
      if (process.env.NODE_ENV !== "production") {
        let S;
        c && (S = `${c}${Ke(p || "")}`), S === void 0 && (S = `Styled(${vc(s)})`), V.displayName = S;
      }
      return s.muiName && (V.muiName = s.muiName), V;
    };
    return I.withConfig && (E.withConfig = I.withConfig), E;
  };
}
function Ad(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : ya(t.components[n].defaultProps, r);
}
function Dd({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = Fa(n);
  return r && (o = o[r] || o), Ad({
    theme: o,
    name: t,
    props: e
  });
}
function fo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Fc(e, t, n);
}
function jd(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ot(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Ot(jd(e));
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
function pr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Bd(e) {
  e = Ot(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (p, u = (p + n / 30) % 12) => o - i * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), pr({
    type: l,
    values: c
  });
}
function xi(e) {
  e = Ot(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Ot(Bd(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ei(e, t) {
  const n = xi(e), r = xi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Yn(e, t) {
  return e = Ot(e), t = fo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, pr(e);
}
function Ld(e, t) {
  if (e = Ot(e), t = fo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return pr(e);
}
function Vd(e, t) {
  if (e = Ot(e), t = fo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return pr(e);
}
function Fd(e, t) {
  return N({
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
const zd = {
  black: "#000",
  white: "#fff"
}, bn = zd, Ud = {
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
}, Hd = Ud, Wd = {
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
}, Ct = Wd, qd = {
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
}, Pt = qd, Xd = {
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
}, en = Xd, Yd = {
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
}, Rt = Yd, Gd = {
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
}, $t = Gd, Kd = {
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
}, Mt = Kd, Jd = ["mode", "contrastThreshold", "tonalOffset"], Ti = {
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
}, kr = {
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
function ki(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Vd(e.main, o) : t === "dark" && (e.dark = Ld(e.main, i)));
}
function Zd(e = "light") {
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
function Qd(e = "light") {
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
function ef(e = "light") {
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
function tf(e = "light") {
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
function nf(e = "light") {
  return e === "dark" ? {
    main: Mt[400],
    light: Mt[300],
    dark: Mt[700]
  } : {
    main: Mt[800],
    light: Mt[500],
    dark: Mt[900]
  };
}
function rf(e = "light") {
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
function of(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = fe(e, Jd), i = e.primary || Zd(t), s = e.secondary || Qd(t), l = e.error || ef(t), c = e.info || tf(t), p = e.success || nf(t), u = e.warning || rf(t);
  function h(v) {
    const m = Ei(v, kr.text.primary) >= n ? kr.text.primary : Ti.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const x = Ei(v, m);
      x < 3 && console.error([`MUI: The contrast ratio of ${x}:1 for ${m} on ${v}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return m;
  }
  const d = ({
    color: v,
    name: m,
    mainShade: x = 500,
    lightShade: I = 300,
    darkShade: w = 700
  }) => {
    if (v = N({}, v), !v.main && v[x] && (v.main = v[x]), !v.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.` : Bt(11, m ? ` (${m})` : "", x));
    if (typeof v.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(v.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Bt(12, m ? ` (${m})` : "", JSON.stringify(v.main)));
    return ki(v, "light", I, r), ki(v, "dark", w, r), v.contrastText || (v.contrastText = h(v.main)), v;
  }, b = {
    dark: kr,
    light: Ti
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), rt(N({
    // A collection of common colors.
    common: N({}, bn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: d({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: d({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: d({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: d({
      color: u,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: d({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: d({
      color: p,
      name: "success"
    }),
    // The grey colors.
    grey: Hd,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: h,
    // Generate a rich color object.
    augmentColor: d,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, b[t]), o);
}
const af = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function sf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ni = {
  textTransform: "uppercase"
}, Oi = '"Roboto", "Helvetica", "Arial", sans-serif';
function lf(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Oi,
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
    pxToRem: h
  } = n, d = fe(n, af);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof p != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, y = h || ((x) => `${x / p * b}rem`), v = (x, I, w, E, g) => N({
    fontFamily: r,
    fontWeight: x,
    fontSize: y(I),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, r === Oi ? {
    letterSpacing: `${sf(E / I)}em`
  } : {}, g, u), m = {
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
    button: v(l, 14, 1.75, 0.4, Ni),
    caption: v(s, 12, 1.66, 0.4),
    overline: v(s, 12, 2.66, 1, Ni),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return rt(N({
    htmlFontSize: p,
    pxToRem: y,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, m), d, {
    clone: !1
    // No need to clone deep
  });
}
const cf = 0.2, pf = 0.14, uf = 0.12;
function ge(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${cf})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${pf})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${uf})`].join(",");
}
const df = ["none", ge(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ge(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ge(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ge(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ge(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ge(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ge(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ge(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ge(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ge(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ge(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ge(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ge(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ge(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ge(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ge(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ge(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ge(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ge(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ge(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ge(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ge(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ge(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ge(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], ff = df, hf = ["duration", "easing", "delay"], mf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, gf = {
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
function Si(e) {
  return `${Math.round(e)}ms`;
}
function bf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function vf(e) {
  const t = N({}, mf, e.easing), n = N({}, gf, e.duration);
  return N({
    getAutoHeightDuration: bf,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, p = fe(i, hf);
      if (process.env.NODE_ENV !== "production") {
        const u = (d) => typeof d == "string", h = (d) => !isNaN(parseFloat(d));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !h(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !h(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(p).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : Si(s)} ${l} ${typeof c == "string" ? c : Si(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const yf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, wf = yf, xf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Ef(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = fe(e, xf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Bt(18));
  const l = of(r), c = uo(e);
  let p = rt(c, {
    mixins: Fd(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ff.slice(),
    typography: lf(l, i),
    transitions: vf(o),
    zIndex: N({}, wf)
  });
  if (p = rt(p, s), p = t.reduce((u, h) => rt(u, h), p), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], h = (d, b) => {
      let y;
      for (y in d) {
        const v = d[y];
        if (u.indexOf(y) !== -1 && Object.keys(v).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const m = Ze("", y);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(d, null, 2), "", `Instead, you need to use the '&.${m}' syntax:`, JSON.stringify({
              root: {
                [`&.${m}`]: v
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          d[y] = {};
        }
      }
    };
    Object.keys(p.components).forEach((d) => {
      const b = p.components[d].styleOverrides;
      b && d.indexOf("Mui") === 0 && h(b, d);
    });
  }
  return p.unstable_sxConfig = N({}, co, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(h) {
    return po({
      sx: h,
      theme: this
    });
  }, p;
}
const Tf = Ef(), ho = Tf, mo = "$$material", za = (e) => Dn(e) && e !== "classes", kf = Id({
  themeId: mo,
  defaultTheme: ho,
  rootShouldForwardProp: za
}), Se = kf;
function kn() {
  const e = Fa(ho);
  return process.env.NODE_ENV !== "production" && T.useDebugValue(e), e[mo] || e;
}
function lt({
  props: e,
  name: t
}) {
  return Dd({
    props: e,
    name: t,
    defaultTheme: ho,
    themeId: mo
  });
}
function Br(e, t) {
  return Br = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Br(e, t);
}
function Nf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Br(e, t);
}
const Ci = {
  disabled: !1
};
var Of = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
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
const Ua = re.createContext(null);
var Sf = function(t) {
  return t.scrollTop;
}, an = "unmounted", bt = "exited", vt = "entering", At = "entered", Lr = "exiting", ct = /* @__PURE__ */ function(e) {
  Nf(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = bt, i.appearStatus = vt) : c = At : r.unmountOnExit || r.mountOnEnter ? c = an : c = bt, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === an ? {
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
      this.props.in ? s !== vt && s !== At && (i = vt) : (s === vt || s === At) && (i = Lr);
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
          var s = this.props.nodeRef ? this.props.nodeRef.current : Cn.findDOMNode(this);
          s && Sf(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === bt && this.setState({
        status: an
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Cn.findDOMNode(this), l], p = c[0], u = c[1], h = this.getTimeouts(), d = l ? h.appear : h.enter;
    if (!o && !s || Ci.disabled) {
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
      i.props.onEntering(p, u), i.onTransitionEnd(d, function() {
        i.safeSetState({
          status: At
        }, function() {
          i.props.onEntered(p, u);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Cn.findDOMNode(this);
    if (!i || Ci.disabled) {
      this.safeSetState({
        status: bt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Lr
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Cn.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === an)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = fe(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ re.createElement(Ua.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : re.cloneElement(re.Children.only(s), l))
    );
  }, t;
}(re.Component);
ct.contextType = Ua;
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
    var n = Of;
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
function _t() {
}
ct.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: _t,
  onEntering: _t,
  onEntered: _t,
  onExit: _t,
  onExiting: _t,
  onExited: _t
};
ct.UNMOUNTED = an;
ct.EXITED = bt;
ct.ENTERING = vt;
ct.ENTERED = At;
ct.EXITING = Lr;
const Ha = ct, Wa = (e) => e.scrollTop;
function Gn(e, t) {
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
const Cf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Vr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Pf = {
  entering: {
    opacity: 1,
    transform: Vr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Nr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), go = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: p,
    onEntering: u,
    onExit: h,
    onExited: d,
    onExiting: b,
    style: y,
    timeout: v = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: m = Ha
  } = t, x = fe(t, Cf), I = rn(), w = T.useRef(), E = kn(), g = T.useRef(null), O = Ue(g, i.ref, n), C = (z) => (P) => {
    if (z) {
      const j = g.current;
      P === void 0 ? z(j) : z(j, P);
    }
  }, L = C(u), D = C((z, P) => {
    Wa(z);
    const {
      duration: j,
      delay: Q,
      easing: J
    } = Gn({
      style: y,
      timeout: v,
      easing: s
    }, {
      mode: "enter"
    });
    let k;
    v === "auto" ? (k = E.transitions.getAutoHeightDuration(z.clientHeight), w.current = k) : k = j, z.style.transition = [E.transitions.create("opacity", {
      duration: k,
      delay: Q
    }), E.transitions.create("transform", {
      duration: Nr ? k : k * 0.666,
      delay: Q,
      easing: J
    })].join(","), c && c(z, P);
  }), V = C(p), S = C(b), M = C((z) => {
    const {
      duration: P,
      delay: j,
      easing: Q
    } = Gn({
      style: y,
      timeout: v,
      easing: s
    }, {
      mode: "exit"
    });
    let J;
    v === "auto" ? (J = E.transitions.getAutoHeightDuration(z.clientHeight), w.current = J) : J = P, z.style.transition = [E.transitions.create("opacity", {
      duration: J,
      delay: j
    }), E.transitions.create("transform", {
      duration: Nr ? J : J * 0.666,
      delay: Nr ? j : j || J * 0.333,
      easing: Q
    })].join(","), z.style.opacity = 0, z.style.transform = Vr(0.75), h && h(z);
  }), _ = C(d);
  return /* @__PURE__ */ f(m, N({
    appear: o,
    in: l,
    nodeRef: g,
    onEnter: D,
    onEntered: V,
    onEntering: L,
    onExit: M,
    onExited: _,
    onExiting: S,
    addEndListener: (z) => {
      v === "auto" && I.start(w.current || 0, z), r && r(g.current, z);
    },
    timeout: v === "auto" ? null : v
  }, x, {
    children: (z, P) => /* @__PURE__ */ T.cloneElement(i, N({
      style: N({
        opacity: 0,
        transform: Vr(0.75),
        visibility: z === "exited" && !l ? "hidden" : void 0
      }, Pf[z], y, i.props.style),
      ref: O
    }, P))
  }));
});
process.env.NODE_ENV !== "production" && (go.propTypes = {
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
  children: vn.isRequired,
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
go.muiSupportAuto = !0;
const Fr = go, Rf = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Pi = Rf, $f = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Mf = Se(Da, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), qa = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const o = Va(), i = lt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: p,
    container: u,
    disablePortal: h,
    keepMounted: d,
    modifiers: b,
    open: y,
    placement: v,
    popperOptions: m,
    popperRef: x,
    transition: I,
    slots: w,
    slotProps: E
  } = i, g = fe(i, $f), O = (r = w == null ? void 0 : w.root) != null ? r : c == null ? void 0 : c.Root, C = N({
    anchorEl: s,
    container: u,
    disablePortal: h,
    keepMounted: d,
    modifiers: b,
    open: y,
    placement: v,
    popperOptions: m,
    popperRef: x,
    transition: I
  }, g);
  return /* @__PURE__ */ f(Mf, N({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: O
    },
    slotProps: E ?? p
  }, C, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (qa.propTypes = {
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
  popperRef: Qr,
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
const Xa = qa;
function _f(e) {
  return Ze("MuiTooltip", e);
}
const If = ut("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), pt = If, Af = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Df(e) {
  return Math.round(e * 1e5) / 1e5;
}
const jf = (e) => {
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
  return st(s, _f, t);
}, Bf = Se(Xa, {
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
}) => N({
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
  [`&[data-popper-placement*="right"] .${pt.arrow}`]: N({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${pt.arrow}`]: N({}, t.isRtl ? {
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
})), Lf = Se("div", {
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
}) => N({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Yn(e.palette.grey[700], 0.92),
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
  lineHeight: `${Df(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${pt.popper}[data-popper-placement*="left"] &`]: N({
    transformOrigin: "right center"
  }, t.isRtl ? N({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : N({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${pt.popper}[data-popper-placement*="right"] &`]: N({
    transformOrigin: "left center"
  }, t.isRtl ? N({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : N({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${pt.popper}[data-popper-placement*="top"] &`]: N({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${pt.popper}[data-popper-placement*="bottom"] &`]: N({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), Vf = Se("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Yn(e.palette.grey[700], 0.9),
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
const Ri = new yn();
let tn = {
  x: 0,
  y: 0
};
function _n(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Ya = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i, s, l, c, p, u, h, d, b, y, v, m, x, I, w, E, g;
  const O = lt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: C = !1,
    children: L,
    components: D = {},
    componentsProps: V = {},
    describeChild: S = !1,
    disableFocusListener: M = !1,
    disableHoverListener: _ = !1,
    disableInteractive: B = !1,
    disableTouchListener: z = !1,
    enterDelay: P = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: Q = 700,
    followCursor: J = !1,
    id: k,
    leaveDelay: R = 0,
    leaveTouchDelay: F = 1500,
    onClose: X,
    onOpen: U,
    open: W,
    placement: Y = "bottom",
    PopperComponent: G,
    PopperProps: q = {},
    slotProps: K = {},
    slots: Z = {},
    title: ie,
    TransitionComponent: A = Fr,
    TransitionProps: ee
  } = O, $ = fe(O, Af), ae = /* @__PURE__ */ T.isValidElement(L) ? L : /* @__PURE__ */ f("span", {
    children: L
  }), Ee = kn(), Ce = Ee.direction === "rtl", [we, ht] = T.useState(), [Pe, Qe] = T.useState(null), Ae = T.useRef(!1), et = B || J, Te = rn(), St = rn(), mt = rn(), qt = rn(), [Nn, wo] = fa({
    controlled: W,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let tt = Nn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = T.useRef(W !== void 0);
    T.useEffect(() => {
      we && we.disabled && !ne && ie !== "" && we.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, we, ne]);
  }
  const ur = da(k), Xt = T.useRef(), On = fn(() => {
    Xt.current !== void 0 && (document.body.style.WebkitUserSelect = Xt.current, Xt.current = void 0), qt.clear();
  });
  T.useEffect(() => On, [On]);
  const xo = (ne) => {
    Ri.clear(), Mn = !0, wo(!0), U && !tt && U(ne);
  }, Sn = fn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      Ri.start(800 + R, () => {
        Mn = !1;
      }), wo(!1), X && tt && X(ne), Te.start(Ee.transitions.duration.shortest, () => {
        Ae.current = !1;
      });
    }
  ), dr = (ne) => {
    Ae.current && ne.type !== "touchstart" || (we && we.removeAttribute("title"), St.clear(), mt.clear(), P || Mn && j ? St.start(Mn ? j : P, () => {
      xo(ne);
    }) : xo(ne));
  }, Eo = (ne) => {
    St.clear(), mt.start(R, () => {
      Sn(ne);
    });
  }, {
    isFocusVisibleRef: To,
    onBlur: ds,
    onFocus: fs,
    ref: hs
  } = ha(), [, ko] = T.useState(!1), No = (ne) => {
    ds(ne), To.current === !1 && (ko(!1), Eo(ne));
  }, Oo = (ne) => {
    we || ht(ne.currentTarget), fs(ne), To.current === !0 && (ko(!0), dr(ne));
  }, So = (ne) => {
    Ae.current = !0;
    const De = ae.props;
    De.onTouchStart && De.onTouchStart(ne);
  }, Co = dr, Po = Eo, ms = (ne) => {
    So(ne), mt.clear(), Te.clear(), On(), Xt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", qt.start(Q, () => {
      document.body.style.WebkitUserSelect = Xt.current, dr(ne);
    });
  }, gs = (ne) => {
    ae.props.onTouchEnd && ae.props.onTouchEnd(ne), On(), mt.start(F, () => {
      Sn(ne);
    });
  };
  T.useEffect(() => {
    if (!tt)
      return;
    function ne(De) {
      (De.key === "Escape" || De.key === "Esc") && Sn(De);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [Sn, tt]);
  const bs = Ue(ae.ref, hs, ht, n);
  !ie && ie !== 0 && (tt = !1);
  const fr = T.useRef(), vs = (ne) => {
    const De = ae.props;
    De.onMouseMove && De.onMouseMove(ne), tn = {
      x: ne.clientX,
      y: ne.clientY
    }, fr.current && fr.current.update();
  }, Yt = {}, hr = typeof ie == "string";
  S ? (Yt.title = !tt && hr && !_ ? ie : null, Yt["aria-describedby"] = tt ? ur : null) : (Yt["aria-label"] = hr ? ie : null, Yt["aria-labelledby"] = tt && !hr ? ur : null);
  const Ve = N({}, Yt, $, ae.props, {
    className: Ne($.className, ae.props.className),
    onTouchStart: So,
    ref: bs
  }, J ? {
    onMouseMove: vs
  } : {});
  process.env.NODE_ENV !== "production" && (Ve["data-mui-internal-clone-element"] = !0, T.useEffect(() => {
    we && !we.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [we]));
  const Gt = {};
  z || (Ve.onTouchStart = ms, Ve.onTouchEnd = gs), _ || (Ve.onMouseOver = _n(Co, Ve.onMouseOver), Ve.onMouseLeave = _n(Po, Ve.onMouseLeave), et || (Gt.onMouseOver = Co, Gt.onMouseLeave = Po)), M || (Ve.onFocus = _n(Oo, Ve.onFocus), Ve.onBlur = _n(No, Ve.onBlur), et || (Gt.onFocus = Oo, Gt.onBlur = No)), process.env.NODE_ENV !== "production" && ae.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));
  const ys = T.useMemo(() => {
    var ne;
    let De = [{
      name: "arrow",
      enabled: !!Pe,
      options: {
        element: Pe,
        padding: 4
      }
    }];
    return (ne = q.popperOptions) != null && ne.modifiers && (De = De.concat(q.popperOptions.modifiers)), N({}, q.popperOptions, {
      modifiers: De
    });
  }, [Pe, q]), Kt = N({}, O, {
    isRtl: Ce,
    arrow: C,
    disableInteractive: et,
    placement: Y,
    PopperComponentProp: G,
    touch: Ae.current
  }), mr = jf(Kt), Ro = (r = (o = Z.popper) != null ? o : D.Popper) != null ? r : Bf, $o = (i = (s = (l = Z.transition) != null ? l : D.Transition) != null ? s : A) != null ? i : Fr, Mo = (c = (p = Z.tooltip) != null ? p : D.Tooltip) != null ? c : Lf, _o = (u = (h = Z.arrow) != null ? h : D.Arrow) != null ? u : Vf, ws = on(Ro, N({}, q, (d = K.popper) != null ? d : V.popper, {
    className: Ne(mr.popper, q == null ? void 0 : q.className, (b = (y = K.popper) != null ? y : V.popper) == null ? void 0 : b.className)
  }), Kt), xs = on($o, N({}, ee, (v = K.transition) != null ? v : V.transition), Kt), Es = on(Mo, N({}, (m = K.tooltip) != null ? m : V.tooltip, {
    className: Ne(mr.tooltip, (x = (I = K.tooltip) != null ? I : V.tooltip) == null ? void 0 : x.className)
  }), Kt), Ts = on(_o, N({}, (w = K.arrow) != null ? w : V.arrow, {
    className: Ne(mr.arrow, (E = (g = K.arrow) != null ? g : V.arrow) == null ? void 0 : E.className)
  }), Kt);
  return /* @__PURE__ */ H(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(ae, Ve), /* @__PURE__ */ f(Ro, N({
      as: G ?? Xa,
      placement: Y,
      anchorEl: J ? {
        getBoundingClientRect: () => ({
          top: tn.y,
          left: tn.x,
          right: tn.x,
          bottom: tn.y,
          width: 0,
          height: 0
        })
      } : we,
      popperRef: fr,
      open: we ? tt : !1,
      id: ur,
      transition: !0
    }, Gt, ws, {
      popperOptions: ys,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ f($o, N({
        timeout: Ee.transitions.duration.shorter
      }, ne, xs, {
        children: /* @__PURE__ */ H(Mo, N({}, Es, {
          children: [ie, C ? /* @__PURE__ */ f(_o, N({}, Ts, {
            ref: Qe
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Ya.propTypes = {
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
  children: vn.isRequired,
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
const Ff = Ya;
var bo = {}, Ga = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ga);
var zf = Ga.exports, Or = {};
function Uf(e) {
  return Ze("MuiSvgIcon", e);
}
ut("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Hf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Wf = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ke(t)}`, `fontSize${Ke(n)}`]
  };
  return st(o, Uf, r);
}, qf = Se("svg", {
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
  var n, r, o, i, s, l, c, p, u, h, d, b, y;
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
    color: (h = (d = (e.vars || e).palette) == null || (d = d[t.color]) == null ? void 0 : d.main) != null ? h : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[t.color]
  };
}), vo = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
    titleAccess: h,
    viewBox: d = "0 0 24 24"
  } = r, b = fe(r, Hf), y = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", v = N({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: u,
    viewBox: d,
    hasSvgAsChild: y
  }), m = {};
  u || (m.viewBox = d);
  const x = Wf(v);
  return /* @__PURE__ */ H(qf, N({
    as: l,
    className: Ne(x.root, i),
    focusable: "false",
    color: p,
    "aria-hidden": h ? void 0 : !0,
    role: h ? "img" : void 0,
    ref: n
  }, m, b, y && o.props, {
    ownerState: v,
    children: [y ? o.props.children : o, h ? /* @__PURE__ */ f("title", {
      children: h
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (vo.propTypes = {
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
vo.muiName = "SvgIcon";
const $i = vo;
function Ka(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ f($i, N({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = $i.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(n));
}
const Xf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), wa.configure(e);
  }
}, Yf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ke,
  createChainedFunction: _r,
  createSvgIcon: Ka,
  debounce: ua,
  deprecatedPropType: wc,
  isMuiElement: xc,
  ownerDocument: Oe,
  ownerWindow: Lt,
  requirePropFactory: Ec,
  setRef: Un,
  unstable_ClassNameGenerator: Xf,
  unstable_useEnhancedEffect: Tt,
  unstable_useId: da,
  unsupportedProp: Nc,
  useControlled: fa,
  useEventCallback: fn,
  useForkRef: Ue,
  useIsFocusVisible: ha
}, Symbol.toStringTag, { value: "Module" })), Gf = /* @__PURE__ */ Ql(Yf);
var Mi;
function Kf() {
  return Mi || (Mi = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Gf;
  }(Or)), Or;
}
var Jf = zf;
Object.defineProperty(bo, "__esModule", {
  value: !0
});
var Ja = bo.default = void 0, Zf = Jf(Kf()), Qf = ks;
Ja = bo.default = (0, Zf.default)(/* @__PURE__ */ (0, Qf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function _i(e, t, n) {
  return e ? /* @__PURE__ */ f(Ui, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ f("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Za(e) {
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
    isSubMenuParent: h = !1,
    hasDisabledGutters: d = !1,
    hasDivider: b = !1,
    focusVisibleClassName: y,
    id: v,
    children: m
  } = e, x = /* @__PURE__ */ f(
    tl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: p,
      dense: u,
      disableGutters: d,
      divider: b,
      focusVisibleClassName: y,
      onClick: t,
      id: v,
      children: n ? /* @__PURE__ */ H(Kn, { children: [
        _i(i, n, !0),
        /* @__PURE__ */ f(nl, { primary: n, inset: !i && o }),
        h ? /* @__PURE__ */ f(Ui, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ f(Ja, {}) }) : _i(s, n, !1)
      ] }) : m
    }
  );
  return r ? /* @__PURE__ */ f(Ff, { title: r, placement: "right", children: /* @__PURE__ */ f("div", { children: x }) }) : x;
}
function Qa(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function eh(e) {
  const [t, n] = de(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (p) => {
    n(p.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let p = Qa(i).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return p = p.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === r.id
    ), /* @__PURE__ */ f(yo, { ...e, includedGroups: p });
  };
  return /* @__PURE__ */ H(Kn, { children: [
    /* @__PURE__ */ f(Za, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ f(
      rl,
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
const th = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function yo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = Ur(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Qa(t).filter((y) => !("menuItem" in y.group))
    ), h = Object.values(u).sort(
      (y, v) => (y.group.order || 0) - (v.group.order || 0)
    ), d = [];
    h.forEach((y) => {
      th(y.id, t.items).forEach(
        (v) => d.push({ item: v, isLastItemInGroup: !1 })
      ), d.length > 0 && (d[d.length - 1].isLastItemInGroup = !0);
    }), d.length > 0 && (d[d.length - 1].isLastItemInGroup = !1);
    const b = d.some(
      (y) => "iconPathBefore" in y.item && y.item.iconPathBefore
    );
    return { items: d, allowForLeadingIcons: b };
  }, [o, t]), l = ({ item: u, isLastItemInGroup: h }) => ({
    className: "papi-menu-item",
    label: u.label,
    tooltip: u.tooltip,
    iconPathBefore: "iconPathBefore" in u ? u.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in u ? u.iconPathAfter : void 0,
    hasDivider: h,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ f("div", {});
  const p = c.item.group;
  return /* @__PURE__ */ f("div", { role: "menu", "aria-label": p, children: i.map((u, h) => {
    const { item: d } = u, b = l(u);
    if ("command" in d) {
      const y = d.group + h;
      return /* @__PURE__ */ f(
        Za,
        {
          onClick: (v) => {
            n == null || n(v), r(d);
          },
          ...b
        },
        y
      );
    }
    return /* @__PURE__ */ f(
      eh,
      {
        parentMenuItem: d,
        parentItemProps: b,
        ...e
      },
      p + d.id
    );
  }) }, p);
}
function nh(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ f(yo, { ...e, includedGroups: i });
}
function rh({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ H(
    Hi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ f("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ f(ol, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ f(
          nh,
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
function oh({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = Ur(() => {
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
  return /* @__PURE__ */ f(
    Hi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, l) => /* @__PURE__ */ f(
        rh,
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
const es = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (es.displayName = "ListContext");
const ih = es;
function ah(e) {
  return Ze("MuiList", e);
}
ut("MuiList", ["root", "padding", "dense", "subheader"]);
const sh = ["children", "className", "component", "dense", "disablePadding", "subheader"], lh = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return st({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, ah, t);
}, ch = Se("ul", {
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
}) => N({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), ts = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
  } = r, u = fe(r, sh), h = T.useMemo(() => ({
    dense: l
  }), [l]), d = N({}, r, {
    component: s,
    dense: l,
    disablePadding: c
  }), b = lh(d);
  return /* @__PURE__ */ f(ih.Provider, {
    value: h,
    children: /* @__PURE__ */ H(ch, N({
      as: s,
      className: Ne(b.root, i),
      ref: n,
      ownerState: d
    }, u, {
      children: [p, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (ts.propTypes = {
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
const ph = ts, uh = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Sr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function Ii(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function ns(e, t) {
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
    if (!l.hasAttribute("tabindex") || !ns(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const rs = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
    variant: h = "selectedMenu"
  } = t, d = fe(t, uh), b = T.useRef(null), y = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Tt(() => {
    o && b.current.focus();
  }, [o]), T.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (w, E) => {
      const g = !b.current.style.width;
      if (w.clientHeight < b.current.clientHeight && g) {
        const O = `${ma(Oe(w))}px`;
        b.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = O, b.current.style.width = `calc(100% + ${O})`;
      }
      return b.current;
    }
  }), []);
  const v = (w) => {
    const E = b.current, g = w.key, O = Oe(E).activeElement;
    if (g === "ArrowDown")
      w.preventDefault(), nn(E, O, p, c, Sr);
    else if (g === "ArrowUp")
      w.preventDefault(), nn(E, O, p, c, Ii);
    else if (g === "Home")
      w.preventDefault(), nn(E, null, p, c, Sr);
    else if (g === "End")
      w.preventDefault(), nn(E, null, p, c, Ii);
    else if (g.length === 1) {
      const C = y.current, L = g.toLowerCase(), D = performance.now();
      C.keys.length > 0 && (D - C.lastTime > 500 ? (C.keys = [], C.repeating = !0, C.previousKeyMatched = !0) : C.repeating && L !== C.keys[0] && (C.repeating = !1)), C.lastTime = D, C.keys.push(L);
      const V = O && !C.repeating && ns(O, C);
      C.previousKeyMatched && (V || nn(E, O, !1, c, Sr, C)) ? w.preventDefault() : C.previousKeyMatched = !1;
    }
    u && u(w);
  }, m = Ue(b, n);
  let x = -1;
  T.Children.forEach(s, (w, E) => {
    if (!/* @__PURE__ */ T.isValidElement(w)) {
      x === E && (x += 1, x >= s.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && zn.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (h === "selectedMenu" && w.props.selected || x === -1) && (x = E), x === E && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (x += 1, x >= s.length && (x = -1));
  });
  const I = T.Children.map(s, (w, E) => {
    if (E === x) {
      const g = {};
      return i && (g.autoFocus = !0), w.props.tabIndex === void 0 && h === "selectedMenu" && (g.tabIndex = 0), /* @__PURE__ */ T.cloneElement(w, g);
    }
    return w;
  });
  return /* @__PURE__ */ f(ph, N({
    role: "menu",
    ref: m,
    className: l,
    onKeyDown: v,
    tabIndex: o ? 0 : -1
  }, d, {
    children: I
  }));
});
process.env.NODE_ENV !== "production" && (rs.propTypes = {
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
const dh = rs, fh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], hh = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, os = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = kn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: l,
    easing: c,
    in: p,
    onEnter: u,
    onEntered: h,
    onEntering: d,
    onExit: b,
    onExited: y,
    onExiting: v,
    style: m,
    timeout: x = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: I = Ha
  } = t, w = fe(t, fh), E = T.useRef(null), g = Ue(E, l.ref, n), O = (B) => (z) => {
    if (B) {
      const P = E.current;
      z === void 0 ? B(P) : B(P, z);
    }
  }, C = O(d), L = O((B, z) => {
    Wa(B);
    const P = Gn({
      style: m,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    B.style.webkitTransition = r.transitions.create("opacity", P), B.style.transition = r.transitions.create("opacity", P), u && u(B, z);
  }), D = O(h), V = O(v), S = O((B) => {
    const z = Gn({
      style: m,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    B.style.webkitTransition = r.transitions.create("opacity", z), B.style.transition = r.transitions.create("opacity", z), b && b(B);
  }), M = O(y);
  return /* @__PURE__ */ f(I, N({
    appear: s,
    in: p,
    nodeRef: E,
    onEnter: L,
    onEntered: D,
    onEntering: C,
    onExit: S,
    onExited: M,
    onExiting: V,
    addEndListener: (B) => {
      i && i(E.current, B);
    },
    timeout: x
  }, w, {
    children: (B, z) => /* @__PURE__ */ T.cloneElement(l, N({
      style: N({
        opacity: 0,
        visibility: B === "exited" && !p ? "hidden" : void 0
      }, hh[B], m, l.props.style),
      ref: g
    }, z))
  }));
});
process.env.NODE_ENV !== "production" && (os.propTypes = {
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
  children: vn.isRequired,
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
const mh = os;
function gh(e) {
  return Ze("MuiBackdrop", e);
}
ut("MuiBackdrop", ["root", "invisible"]);
const bh = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], vh = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return st({
    root: ["root", n && "invisible"]
  }, gh, t);
}, yh = Se("div", {
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
}) => N({
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
})), is = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i;
  const s = lt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: p = "div",
    components: u = {},
    componentsProps: h = {},
    invisible: d = !1,
    open: b,
    slotProps: y = {},
    slots: v = {},
    TransitionComponent: m = mh,
    transitionDuration: x
  } = s, I = fe(s, bh), w = N({}, s, {
    component: p,
    invisible: d
  }), E = vh(w), g = (r = y.root) != null ? r : h.root;
  return /* @__PURE__ */ f(m, N({
    in: b,
    timeout: x
  }, I, {
    children: /* @__PURE__ */ f(yh, N({
      "aria-hidden": !0
    }, g, {
      as: (o = (i = v.root) != null ? i : u.Root) != null ? o : p,
      className: Ne(E.root, c, g == null ? void 0 : g.className),
      ownerState: N({}, w, g == null ? void 0 : g.ownerState),
      classes: E,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (is.propTypes = {
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
const wh = is;
function xh(e) {
  return Ze("MuiModal", e);
}
ut("MuiModal", ["root", "hidden", "backdrop"]);
const Eh = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Th = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return st({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, xh, r);
}, kh = Se("div", {
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
}) => N({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), Nh = Se(wh, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), as = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i, s, l, c;
  const p = lt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: u = Nh,
    BackdropProps: h,
    className: d,
    closeAfterTransition: b = !1,
    children: y,
    container: v,
    component: m,
    components: x = {},
    componentsProps: I = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: g = !1,
    disablePortal: O = !1,
    disableRestoreFocus: C = !1,
    disableScrollLock: L = !1,
    hideBackdrop: D = !1,
    keepMounted: V = !1,
    onBackdropClick: S,
    open: M,
    slotProps: _,
    slots: B
    // eslint-disable-next-line react/prop-types
  } = p, z = fe(p, Eh), P = N({}, p, {
    closeAfterTransition: b,
    disableAutoFocus: w,
    disableEnforceFocus: E,
    disableEscapeKeyDown: g,
    disablePortal: O,
    disableRestoreFocus: C,
    disableScrollLock: L,
    hideBackdrop: D,
    keepMounted: V
  }), {
    getRootProps: j,
    getBackdropProps: Q,
    getTransitionProps: J,
    portalRef: k,
    isTopModal: R,
    exited: F,
    hasTransition: X
  } = dp(N({}, P, {
    rootRef: n
  })), U = N({}, P, {
    exited: F
  }), W = Th(U), Y = {};
  if (y.props.tabIndex === void 0 && (Y.tabIndex = "-1"), X) {
    const {
      onEnter: ee,
      onExited: $
    } = J();
    Y.onEnter = ee, Y.onExited = $;
  }
  const G = (r = (o = B == null ? void 0 : B.root) != null ? o : x.Root) != null ? r : kh, q = (i = (s = B == null ? void 0 : B.backdrop) != null ? s : x.Backdrop) != null ? i : u, K = (l = _ == null ? void 0 : _.root) != null ? l : I.root, Z = (c = _ == null ? void 0 : _.backdrop) != null ? c : I.backdrop, ie = kt({
    elementType: G,
    externalSlotProps: K,
    externalForwardedProps: z,
    getSlotProps: j,
    additionalProps: {
      ref: n,
      as: m
    },
    ownerState: U,
    className: Ne(d, K == null ? void 0 : K.className, W == null ? void 0 : W.root, !U.open && U.exited && (W == null ? void 0 : W.hidden))
  }), A = kt({
    elementType: q,
    externalSlotProps: Z,
    additionalProps: h,
    getSlotProps: (ee) => Q(N({}, ee, {
      onClick: ($) => {
        S && S($), ee != null && ee.onClick && ee.onClick($);
      }
    })),
    className: Ne(Z == null ? void 0 : Z.className, h == null ? void 0 : h.className, W == null ? void 0 : W.backdrop),
    ownerState: U
  });
  return !V && !M && (!X || F) ? null : /* @__PURE__ */ f(hn, {
    ref: k,
    container: v,
    disablePortal: O,
    children: /* @__PURE__ */ H(G, N({}, ie, {
      children: [!D && u ? /* @__PURE__ */ f(q, N({}, A)) : null, /* @__PURE__ */ f(Hn, {
        disableEnforceFocus: E,
        disableAutoFocus: w,
        disableRestoreFocus: C,
        isEnabled: R,
        open: M,
        children: /* @__PURE__ */ T.cloneElement(y, Y)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (as.propTypes = {
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
  children: vn.isRequired,
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
const Oh = as;
function Sh(e) {
  return Ze("MuiPaper", e);
}
ut("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Ch = ["className", "component", "elevation", "square", "variant"], Ph = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return st(i, Sh, o);
}, Rh = Se("div", {
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
  return N({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && N({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${Yn("#fff", Pi(t.elevation))}, ${Yn("#fff", Pi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), ss = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = lt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, p = fe(r, Ch), u = N({}, r, {
    component: i,
    elevation: s,
    square: l,
    variant: c
  }), h = Ph(u);
  return process.env.NODE_ENV !== "production" && kn().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ f(Rh, N({
    as: i,
    ownerState: u,
    className: Ne(h.root, o),
    ref: n
  }, p));
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
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Wt(va, (e) => {
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
const $h = ss;
function Mh(e) {
  return Ze("MuiPopover", e);
}
ut("MuiPopover", ["root", "paper"]);
const _h = ["onEntering"], Ih = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Ah = ["slotProps"];
function Ai(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Di(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function ji(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Bn(e) {
  return typeof e == "function" ? e() : e;
}
const Dh = (e) => {
  const {
    classes: t
  } = e;
  return st({
    root: ["root"],
    paper: ["paper"]
  }, Mh, t);
}, jh = Se(Oh, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ls = Se($h, {
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
}), cs = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
    anchorReference: h = "anchorEl",
    children: d,
    className: b,
    container: y,
    elevation: v = 8,
    marginThreshold: m = 16,
    open: x,
    PaperProps: I = {},
    slots: w,
    slotProps: E,
    transformOrigin: g = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: O = Fr,
    transitionDuration: C = "auto",
    TransitionProps: {
      onEntering: L
    } = {},
    disableScrollLock: D = !1
  } = s, V = fe(s.TransitionProps, _h), S = fe(s, Ih), M = (r = E == null ? void 0 : E.paper) != null ? r : I, _ = T.useRef(), B = Ue(_, M.ref), z = N({}, s, {
    anchorOrigin: p,
    anchorReference: h,
    elevation: v,
    marginThreshold: m,
    externalPaperSlotProps: M,
    transformOrigin: g,
    TransitionComponent: O,
    transitionDuration: C,
    TransitionProps: V
  }), P = Dh(z), j = T.useCallback(() => {
    if (h === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (u || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), u;
    const ee = Bn(c), $ = ee && ee.nodeType === 1 ? ee : Oe(_.current).body, ae = $.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Ee = $.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Ee.top === 0 && Ee.left === 0 && Ee.right === 0 && Ee.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: ae.top + Ai(ae, p.vertical),
      left: ae.left + Di(ae, p.horizontal)
    };
  }, [c, p.horizontal, p.vertical, u, h]), Q = T.useCallback((ee) => ({
    vertical: Ai(ee, g.vertical),
    horizontal: Di(ee, g.horizontal)
  }), [g.horizontal, g.vertical]), J = T.useCallback((ee) => {
    const $ = {
      width: ee.offsetWidth,
      height: ee.offsetHeight
    }, ae = Q($);
    if (h === "none")
      return {
        top: null,
        left: null,
        transformOrigin: ji(ae)
      };
    const Ee = j();
    let Ce = Ee.top - ae.vertical, we = Ee.left - ae.horizontal;
    const ht = Ce + $.height, Pe = we + $.width, Qe = Lt(Bn(c)), Ae = Qe.innerHeight - m, et = Qe.innerWidth - m;
    if (m !== null && Ce < m) {
      const Te = Ce - m;
      Ce -= Te, ae.vertical += Te;
    } else if (m !== null && ht > Ae) {
      const Te = ht - Ae;
      Ce -= Te, ae.vertical += Te;
    }
    if (process.env.NODE_ENV !== "production" && $.height > Ae && $.height && Ae && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${$.height - Ae}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), m !== null && we < m) {
      const Te = we - m;
      we -= Te, ae.horizontal += Te;
    } else if (Pe > et) {
      const Te = Pe - et;
      we -= Te, ae.horizontal += Te;
    }
    return {
      top: `${Math.round(Ce)}px`,
      left: `${Math.round(we)}px`,
      transformOrigin: ji(ae)
    };
  }, [c, h, j, Q, m]), [k, R] = T.useState(x), F = T.useCallback(() => {
    const ee = _.current;
    if (!ee)
      return;
    const $ = J(ee);
    $.top !== null && (ee.style.top = $.top), $.left !== null && (ee.style.left = $.left), ee.style.transformOrigin = $.transformOrigin, R(!0);
  }, [J]);
  T.useEffect(() => (D && window.addEventListener("scroll", F), () => window.removeEventListener("scroll", F)), [c, D, F]);
  const X = (ee, $) => {
    L && L(ee, $), F();
  }, U = () => {
    R(!1);
  };
  T.useEffect(() => {
    x && F();
  }), T.useImperativeHandle(l, () => x ? {
    updatePosition: () => {
      F();
    }
  } : null, [x, F]), T.useEffect(() => {
    if (!x)
      return;
    const ee = ua(() => {
      F();
    }), $ = Lt(c);
    return $.addEventListener("resize", ee), () => {
      ee.clear(), $.removeEventListener("resize", ee);
    };
  }, [c, x, F]);
  let W = C;
  C === "auto" && !O.muiSupportAuto && (W = void 0);
  const Y = y || (c ? Oe(Bn(c)).body : void 0), G = (o = w == null ? void 0 : w.root) != null ? o : jh, q = (i = w == null ? void 0 : w.paper) != null ? i : ls, K = kt({
    elementType: q,
    externalSlotProps: N({}, M, {
      style: k ? M.style : N({}, M.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: v,
      ref: B
    },
    ownerState: z,
    className: Ne(P.paper, M == null ? void 0 : M.className)
  }), Z = kt({
    elementType: G,
    externalSlotProps: (E == null ? void 0 : E.root) || {},
    externalForwardedProps: S,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: Y,
      open: x
    },
    ownerState: z,
    className: Ne(P.root, b)
  }), {
    slotProps: ie
  } = Z, A = fe(Z, Ah);
  return /* @__PURE__ */ f(G, N({}, A, !Ea(G) && {
    slotProps: ie,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ f(O, N({
      appear: !0,
      in: x,
      onEntering: X,
      onExited: U,
      timeout: W
    }, V, {
      children: /* @__PURE__ */ f(q, N({}, K, {
        children: d
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (cs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Qr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Wt(a.oneOfType([ot, a.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Bn(e.anchorEl);
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
  elevation: va,
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
    component: dc
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
const Bh = cs;
function Lh(e) {
  return Ze("MuiMenu", e);
}
ut("MuiMenu", ["root", "paper", "list"]);
const Vh = ["onEntering"], Fh = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], zh = {
  vertical: "top",
  horizontal: "right"
}, Uh = {
  vertical: "top",
  horizontal: "left"
}, Hh = (e) => {
  const {
    classes: t
  } = e;
  return st({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Lh, t);
}, Wh = Se(Bh, {
  shouldForwardProp: (e) => za(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), qh = Se(ls, {
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
}), Xh = Se(dh, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), ps = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
    onClose: h,
    open: d,
    PaperProps: b = {},
    PopoverClasses: y,
    transitionDuration: v = "auto",
    TransitionProps: {
      onEntering: m
    } = {},
    variant: x = "selectedMenu",
    slots: I = {},
    slotProps: w = {}
  } = i, E = fe(i.TransitionProps, Vh), g = fe(i, Fh), O = kn(), C = O.direction === "rtl", L = N({}, i, {
    autoFocus: s,
    disableAutoFocusItem: p,
    MenuListProps: u,
    onEntering: m,
    PaperProps: b,
    transitionDuration: v,
    TransitionProps: E,
    variant: x
  }), D = Hh(L), V = s && !p && d, S = T.useRef(null), M = (J, k) => {
    S.current && S.current.adjustStyleForScrollbar(J, O), m && m(J, k);
  }, _ = (J) => {
    J.key === "Tab" && (J.preventDefault(), h && h(J, "tabKeyDown"));
  };
  let B = -1;
  T.Children.map(l, (J, k) => {
    /* @__PURE__ */ T.isValidElement(J) && (process.env.NODE_ENV !== "production" && zn.isFragment(J) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), J.props.disabled || (x === "selectedMenu" && J.props.selected || B === -1) && (B = k));
  });
  const z = (r = I.paper) != null ? r : qh, P = (o = w.paper) != null ? o : b, j = kt({
    elementType: I.root,
    externalSlotProps: w.root,
    ownerState: L,
    className: [D.root, c]
  }), Q = kt({
    elementType: z,
    externalSlotProps: P,
    ownerState: L,
    className: D.paper
  });
  return /* @__PURE__ */ f(Wh, N({
    onClose: h,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: C ? "right" : "left"
    },
    transformOrigin: C ? zh : Uh,
    slots: {
      paper: z,
      root: I.root
    },
    slotProps: {
      root: j,
      paper: Q
    },
    open: d,
    ref: n,
    transitionDuration: v,
    TransitionProps: N({
      onEntering: M
    }, E),
    ownerState: L
  }, g, {
    classes: y,
    children: /* @__PURE__ */ f(Xh, N({
      onKeyDown: _,
      actions: S,
      autoFocus: s && (B === -1 || p),
      autoFocusItem: V,
      variant: x
    }, u, {
      className: Ne(D.list, u.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ps.propTypes = {
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
const Yh = ps;
function _m({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var p;
  const [o, i] = re.useState(void 0), s = $e(
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
  }, []), c = Ur(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((p = n == null ? void 0 : n.items) == null ? void 0 : p.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ H(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ f(
          Yh,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ f(
              yo,
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
const Gh = Ka(/* @__PURE__ */ f("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Kh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const zr = (e, t, n = {}) => {
  const r = wt(t);
  r.current = t;
  const o = wt(n);
  o.current = Kh(o.current);
  const [i, s] = de(() => r.current), [l, c] = de(!0);
  return Ye(() => {
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
function Jh({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, p] = de(!1), [u, h] = de(!1), d = $e(() => {
    c && p(!1), h(!1);
  }, [c]), b = $e((E) => {
    E.stopPropagation(), p((g) => {
      const O = !g;
      return O && E.shiftKey ? h(!0) : O || h(!1), O;
    });
  }, []), y = $e(
    (E) => (d(), r(E)),
    [r, d]
  ), [v, m] = de({ top: 1, left: 1 });
  Ye(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const g = E.getBoundingClientRect(), O = window.scrollY, C = window.scrollX, L = g.top + O + E.clientHeight, D = g.left + C;
        m({ top: L, left: D });
      }
    }
  }, [c, o]);
  const [x] = zr(
    $e(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [I] = zr(
    $e(async () => (e == null ? void 0 : e(!0)) ?? n ?? x, [e, n, x, c]),
    n ?? x
  ), w = u && I ? I : x;
  return /* @__PURE__ */ H(Kn, { children: [
    /* @__PURE__ */ f(
      Wi,
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
        children: l ?? /* @__PURE__ */ f(Gh, {})
      }
    ),
    /* @__PURE__ */ f(
      il,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: d,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: v.top,
            left: v.left
          }
        },
        children: w ? /* @__PURE__ */ f(
          oh,
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
function Im({
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
  return /* @__PURE__ */ f(
    Wi,
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
const Zh = zi(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), us = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(qi.Root, { ref: n, className: te(Zh(), e), ...t }));
us.displayName = qi.Root.displayName;
function Qh({
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
  onChange: h,
  onFocus: d,
  onBlur: b
}) {
  return /* @__PURE__ */ H("div", { className: te("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ f(
      us,
      {
        htmlFor: e,
        className: te({
          "pr-text-red-600": n,
          "pr-hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ f(
      Zn,
      {
        id: e,
        disabled: t,
        placeholder: s,
        required: l,
        className: te(c, { "pr-border-red-600": n }),
        defaultValue: p,
        value: u,
        onChange: h,
        onFocus: d,
        onBlur: b
      }
    ),
    /* @__PURE__ */ f("p", { className: te({ "pr-hidden": !o }), children: o })
  ] });
}
function Am({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = de(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ f(
    Qh,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  );
}
function Dm({
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
  onChange: h,
  onChangeCommitted: d
}) {
  return /* @__PURE__ */ f(
    al,
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
      onChange: h,
      onChangeCommitted: d
    }
  );
}
function jm({
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
  return /* @__PURE__ */ f(
    sl,
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
function Bm({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ f(
    ll,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Lm({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = wt(void 0);
  return /* @__PURE__ */ f("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ f(cl, { position: "static", id: r, children: /* @__PURE__ */ H(pl, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ f(
      Jh,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ f("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Vm = Ie.Root, em = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  Ie.List,
  {
    ref: n,
    className: te(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
em.displayName = Ie.List.displayName;
const tm = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  Ie.Trigger,
  {
    ref: n,
    className: te(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
tm.displayName = Ie.Trigger.displayName;
const nm = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  Ie.Content,
  {
    ref: n,
    className: te(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
nm.displayName = Ie.Content.displayName;
const rm = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  Ie.Root,
  {
    orientation: "vertical",
    ref: n,
    className: te("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
rm.displayName = Ie.List.displayName;
const om = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  Ie.List,
  {
    ref: n,
    className: te(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
om.displayName = Ie.List.displayName;
const Fm = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  Ie.Trigger,
  {
    ref: n,
    ...t,
    className: te(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), im = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ f(
  Ie.Content,
  {
    ref: n,
    className: te(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
im.displayName = Ie.Content.displayName;
const In = (e) => e === "asc" ? /* @__PURE__ */ f(Vs, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ f(Fs, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ f(zs, { className: "pr-ml-2 pr-h-4 pr-w-4" }), am = (e, t, n, r, o) => [
  {
    accessorKey: "character",
    header: ({ column: i }) => /* @__PURE__ */ H(ke, { onClick: () => i.toggleSorting(void 0), children: [
      e,
      In(i.getIsSorted())
    ] })
  },
  {
    accessorKey: "unicodeValue",
    header: ({ column: i }) => /* @__PURE__ */ H(ke, { onClick: () => i.toggleSorting(void 0), children: [
      t,
      In(i.getIsSorted())
    ] }),
    cell: ({ row: i }) => i.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
  },
  {
    accessorKey: "count",
    header: ({ column: i }) => /* @__PURE__ */ H(ke, { onClick: () => i.toggleSorting(void 0), children: [
      n,
      In(i.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: i, table: s }) => {
      const l = s.getSelectedRowModel().rows, c = [];
      return l.forEach((p) => {
        c.push(p.getValue("character"));
      }), /* @__PURE__ */ H("div", { children: [
        /* @__PURE__ */ f("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ H(ke, { onClick: () => i.toggleSorting(void 0), children: [
          r,
          In(i.getIsSorted())
        ] }) }),
        /* @__PURE__ */ H("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ f(ke, { children: /* @__PURE__ */ f(
            Ao,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !0);
              }
            }
          ) }),
          /* @__PURE__ */ f(ke, { children: /* @__PURE__ */ f(
            Do,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !1);
              }
            }
          ) }),
          /* @__PURE__ */ f(ke, { children: /* @__PURE__ */ f(
            jo,
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
      return s === !0 ? /* @__PURE__ */ f(Ao, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : s === !1 ? /* @__PURE__ */ f(Do, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ f(jo, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
];
function sm({
  tableData: e,
  onStatusChange: t,
  onSelectCharacter: n,
  localizedStrings: r
}) {
  const o = r["%webView_inventory_table_header_character%"], i = r["%webView_inventory_table_header_unicode_value%"], s = r["%webView_inventory_table_header_count%"], l = r["%webView_inventory_table_header_status%"], c = (p, u) => {
    u.toggleAllRowsSelected(!1), p.toggleSelected(void 0), n(p.getValue("character"));
  };
  return /* @__PURE__ */ f("div", { className: "pr-overflow-y-auto", children: /* @__PURE__ */ f(
    Kl,
    {
      columns: am(
        o,
        i,
        s,
        l,
        t
      ),
      data: e,
      onRowClickHandler: c
    }
  ) });
}
const Bi = (e, t, n) => {
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
        const h = Math.max(0, u - 2), d = Math.min(p.length, u + 3), b = p.slice(h, d).join(" "), y = {
          reference: { ...n, chapterNum: +i, verseNum: +s },
          snippet: b,
          key: l
        };
        l += 1, r.push(y);
      }
  }), r;
};
function lm({
  selectedCharacter: e,
  text: t,
  scriptureReference: n,
  setScriptureReference: r,
  localizedStrings: o
}) {
  const i = o["%webView_inventory_occurrences_table_header_reference%"], s = o["%webView_inventory_occurrences_table_header_occurrence%"], [l, c] = de(
    Bi(t, e, n)
  );
  return Ye(
    () => c(Bi(t, e, n)),
    [t, e, n]
  ), /* @__PURE__ */ H(Gr, { children: [
    /* @__PURE__ */ f(Kr, { children: /* @__PURE__ */ H(Dt, { children: [
      /* @__PURE__ */ f(Ln, { children: i }),
      /* @__PURE__ */ f(Ln, { children: s })
    ] }) }),
    /* @__PURE__ */ f(Jr, { children: l.map((p) => /* @__PURE__ */ H(
      Dt,
      {
        onClick: () => {
          r(p.reference);
        },
        children: [
          /* @__PURE__ */ f(dn, { children: `${he.bookNumberToEnglishName(p.reference.bookNum)} ${p.reference.chapterNum}:${p.reference.verseNum}` }),
          /* @__PURE__ */ f(dn, { children: p.snippet })
        ]
      },
      p.key
    )) })
  ] });
}
const cm = async (e, t, n, r, o) => {
  const i = [];
  return Os(e, "").forEach((s) => {
    if (n !== "" && !s.includes(n))
      return;
    const l = i.find((c) => c.character === s);
    if (l)
      l.count += 1;
    else {
      let c;
      if (r.includes(s) && (c = !0), o.includes(s) && (c = !1), t === "all" || t === "approved" && c === !0 || t === "unapproved" && c === !1 || t === "unknown" && c === void 0) {
        const p = {
          character: s,
          count: 1,
          status: c
        };
        i.push(p);
      }
    }
  }), i;
};
function zm({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  projectId: r,
  getSetting: o,
  setSetting: i,
  getText: s
}) {
  const l = n["%webView_characterInventory_characters_all%"], c = n["%webView_characterInventory_characters_approved%"], p = n["%webView_characterInventory_characters_unapproved%"], u = n["%webView_characterInventory_characters_unknown%"], h = n["%webView_inventory_scope_book%"], d = n["%webView_inventory_scope_chapter%"], b = n["%webView_inventory_scope_verse%"], y = n["%webView_inventory_filter_text%"], [v, m] = de([]), [x, I] = de([]), [w, E] = de(void 0), [g, O] = de("book"), [C, L] = de("all"), [D, V] = de(""), [S, M] = de([]), [_, B] = de(""), z = (P, j) => {
    M((Q) => {
      let J = [];
      return P.forEach((k) => {
        J = Q.map((R) => R.character === k && R.status !== j ? { ...R, status: j } : R);
      }), m((k) => {
        let R = [...k];
        return P.forEach((F) => {
          j === !0 ? R.includes(F) || R.push(F) : R = R.filter((X) => X !== F);
        }), i("validCharacters", r, R), R;
      }), I((k) => {
        let R = [...k];
        return P.forEach((F) => {
          j === !1 ? R.includes(F) || R.push(F) : R = R.filter(
            (X) => X !== F
          );
        }), i("invalidCharacters", r, R), R;
      }), J;
    });
  };
  return Ye(() => {
    (async () => {
      try {
        m(await o("validCharacters", r)), I(await o("invalidCharacters", r));
      } catch {
        throw new Error("Failed to fetch characters from project settings");
      }
    })();
  }, [r, o]), Ye(() => {
    (async () => {
      try {
        const j = await s(r, e, g);
        E(j);
      } catch {
        throw new Error("Failed getting scripture text");
      }
    })();
  }, [r, e, g, s]), Ye(() => {
    if (!w) {
      M([]);
      return;
    }
    (async () => {
      try {
        M(
          await cm(w, C, D, v, x)
        );
      } catch {
        throw new Error("Failed building table data");
      }
    })();
  }, [v, x, w, C, D]), /* @__PURE__ */ H("div", { className: "pr-twp pr-font-sans", children: [
    /* @__PURE__ */ H("div", { className: "pr-flex", children: [
      /* @__PURE__ */ H(Pr, { onValueChange: (P) => L(P), defaultValue: C, children: [
        /* @__PURE__ */ f(Vn, { children: /* @__PURE__ */ f(Rr, { placeholder: "Select filter" }) }),
        /* @__PURE__ */ H(Fn, { className: "pr-font-sans", children: [
          /* @__PURE__ */ f(nt, { value: "all", children: l }),
          /* @__PURE__ */ f(nt, { value: "approved", children: c }),
          /* @__PURE__ */ f(nt, { value: "unapproved", children: p }),
          /* @__PURE__ */ f(nt, { value: "unknown", children: u })
        ] })
      ] }),
      /* @__PURE__ */ H(Pr, { onValueChange: (P) => O(P), defaultValue: g, children: [
        /* @__PURE__ */ f(Vn, { children: /* @__PURE__ */ f(Rr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ H(Fn, { className: "pr-font-sans", children: [
          /* @__PURE__ */ f(nt, { value: "book", children: h }),
          /* @__PURE__ */ f(nt, { value: "chapter", children: d }),
          /* @__PURE__ */ f(nt, { value: "verse", children: b })
        ] })
      ] }),
      /* @__PURE__ */ f(
        Zn,
        {
          className: "pr-rounded-md pr-border",
          placeholder: y,
          value: D,
          onChange: (P) => {
            V(P.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ f(
      "div",
      {
        className: `pr-overflow-y-auto pr-rounded-md pr-border ${_ !== "" && "pr-max-h-96"}`,
        children: /* @__PURE__ */ f(
          sm,
          {
            tableData: S,
            onStatusChange: z,
            onSelectCharacter: (P) => {
              B(P);
            },
            localizedStrings: n
          }
        )
      }
    ),
    _ !== "" && /* @__PURE__ */ f("div", { className: "pr-mt-4 pr-rounded-md pr-border", children: /* @__PURE__ */ f(
      lm,
      {
        selectedCharacter: _,
        text: w,
        scriptureReference: e,
        setScriptureReference: (P) => t(P),
        localizedStrings: n
      }
    ) })
  ] });
}
const Um = (e, t) => {
  Ye(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Cr = () => !1, Hm = (e, t) => {
  const [n] = zr(
    $e(async () => {
      if (!e)
        return Cr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Cr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Ye(() => () => {
    n !== Cr && n();
  }, [n]);
};
function pm(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
pm(`.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.pr-h-px {
  height: 1px;
}
.pr-max-h-96 {
  max-height: 24rem;
}
.pr-w-10 {
  width: 2.5rem;
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
.pr-select-none {
  user-select: none;
}
.pr-flex-row {
  flex-direction: row;
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
.pr-rounded-lg {
  border-radius: var(--radius);
}
.pr-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.pr-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
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
.pr-border-input {
  border-color: hsl(var(--input));
}
.pr-border-muted {
  border-color: hsl(var(--muted));
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
.pr-bg-destructive {
  background-color: hsl(var(--destructive));
}
.pr-bg-muted {
  background-color: hsl(var(--muted));
}
.pr-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.pr-bg-popover {
  background-color: hsl(var(--popover));
}
.pr-bg-primary {
  background-color: hsl(var(--primary));
}
.pr-bg-secondary {
  background-color: hsl(var(--secondary));
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
.pr-text-current {
  color: currentColor;
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
.pr-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
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
.\\[\\&\\>tr\\]\\:last\\:pr-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
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
`, "top");
export {
  Pm as BookChapterControl,
  ke as Button,
  $m as ChapterRangeSelector,
  zm as CharacterInventory,
  Jl as Checkbox,
  Mm as Checklist,
  Uo as ComboBox,
  _m as ContextMenu,
  Kl as DataTable,
  Qi as DropdownMenu,
  ta as DropdownMenuCheckboxItem,
  Xr as DropdownMenuContent,
  Nm as DropdownMenuGroup,
  ea as DropdownMenuItem,
  Jn as DropdownMenuLabel,
  Om as DropdownMenuPortal,
  Cm as DropdownMenuRadioGroup,
  Rl as DropdownMenuRadioItem,
  Yr as DropdownMenuSeparator,
  $l as DropdownMenuShortcut,
  Sm as DropdownMenuSub,
  Pl as DropdownMenuSubContent,
  Cl as DropdownMenuSubTrigger,
  Sl as DropdownMenuTrigger,
  oh as GridMenu,
  Jh as HamburgerMenuButton,
  Im as IconButton,
  Zn as Input,
  It as LabelPosition,
  Za as MenuItem,
  Am as SearchBar,
  Pr as Select,
  Fn as SelectContent,
  Rm as SelectGroup,
  nt as SelectItem,
  ql as SelectLabel,
  ra as SelectScrollDownButton,
  na as SelectScrollUpButton,
  Xl as SelectSeparator,
  Vn as SelectTrigger,
  Rr as SelectValue,
  Dm as Slider,
  jm as Snackbar,
  Bm as Switch,
  Gr as Table,
  Jr as TableBody,
  Hl as TableCaption,
  dn as TableCell,
  Ul as TableFooter,
  Ln as TableHead,
  Kr as TableHeader,
  Dt as TableRow,
  Vm as Tabs,
  nm as TabsContent,
  em as TabsList,
  tm as TabsTrigger,
  Qh as TextField,
  Lm as Toolbar,
  rm as VerticalTabs,
  im as VerticalTabsContent,
  om as VerticalTabsList,
  Fm as VerticalTabsTrigger,
  Wl as buttonVariants,
  Um as useEvent,
  Hm as useEventAsync,
  zr as usePromise
};
//# sourceMappingURL=index.js.map
