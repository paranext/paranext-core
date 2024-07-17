import Os, { jsxs as U, jsx as d, Fragment as Kr } from "react/jsx-runtime";
import * as T from "react";
import J, { forwardRef as za, useCallback as $e, useState as de, useRef as wt, useEffect as Ye, useLayoutEffect as jo, useMemo as Wn } from "react";
import { getChaptersForBook as Cs, split as Ss } from "platform-bible-utils";
import * as me from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Ps } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Rs, Check as Ua, Circle as $s, History as _s, ArrowDownWideNarrow as Ms, Clock as Is, Bookmark as As, ChevronDown as Ha, ChevronUp as Ds, ArrowLeftIcon as js, ChevronLeftIcon as Bs, ChevronRightIcon as Ls, ArrowRightIcon as Vs, FilterIcon as Fs, CircleCheckIcon as Bo, CircleXIcon as Lo, CircleHelpIcon as Vo, ArrowUpIcon as zs, ArrowDownIcon as Us, ArrowUpDownIcon as Hs } from "lucide-react";
import Ne, { clsx as Ws } from "clsx";
import { extendTailwindMerge as Xs } from "tailwind-merge";
import { useReactTable as qs, getCoreRowModel as Ys, getPaginationRowModel as Gs, getSortedRowModel as Ks, getFilteredRowModel as Js, flexRender as Fo } from "@tanstack/react-table";
import { Slot as Zs } from "@radix-ui/react-slot";
import { cva as Xn } from "class-variance-authority";
import * as ye from "@radix-ui/react-select";
import { Autocomplete as Qs, TextField as el, FormControlLabel as zo, FormLabel as tl, Checkbox as rl, MenuItem as nl, ListItemText as ol, ListItemIcon as Wa, Menu as al, Grid as Xa, List as il, IconButton as qa, Drawer as sl, Slider as ll, Snackbar as cl, Switch as pl, AppBar as ul, Toolbar as dl } from "@mui/material";
import fl, { ThemeContext as hl, internal_processStyles as ml } from "@mui/styled-engine";
import * as gl from "react-dom";
import Sr from "react-dom";
import * as Ya from "@radix-ui/react-label";
import * as Ie from "@radix-ui/react-tabs";
import * as nr from "@radix-ui/react-slider";
import * as Rn from "@radix-ui/react-switch";
var bl = Object.defineProperty, vl = (e, t, r) => t in e ? bl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => vl(e, typeof t != "symbol" ? t + "" : t, r);
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
], qn = [
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
], Ga = [
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
], Uo = Sl();
function Ht(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Uo ? Uo[e] : 0;
}
function Yn(e) {
  return Ht(e) > 0;
}
function yl(e) {
  const t = typeof e == "string" ? Ht(e) : e;
  return t >= 40 && t <= 66;
}
function wl(e) {
  return (typeof e == "string" ? Ht(e) : e) <= 39;
}
function Ka(e) {
  return e <= 66;
}
function xl(e) {
  const t = typeof e == "string" ? Ht(e) : e;
  return Qa(t) && !Ka(t);
}
function* El() {
  for (let e = 1; e <= Et.length; e++)
    yield e;
}
const Tl = 1, Ja = Et.length;
function kl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Gn(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= Et.length ? t : Et[r];
}
function Za(e) {
  return e <= 0 || e > Ja ? "******" : Ga[e - 1];
}
function Nl(e) {
  return Za(Ht(e));
}
function Qa(e) {
  const t = typeof e == "number" ? Gn(e) : e;
  return Yn(t) && !qn.includes(t);
}
function Ol(e) {
  const t = typeof e == "number" ? Gn(e) : e;
  return Yn(t) && qn.includes(t);
}
function Cl(e) {
  return Ga[e - 1].includes("*obsolete*");
}
function Sl() {
  const e = {};
  for (let t = 0; t < Et.length; t++)
    e[Et[t]] = t + 1;
  return e;
}
const he = {
  allBookIds: Et,
  nonCanonicalIds: qn,
  bookIdToNumber: Ht,
  isBookIdValid: Yn,
  isBookNT: yl,
  isBookOT: wl,
  isBookOTNT: Ka,
  isBookDC: xl,
  allBookNumbers: El,
  firstBook: Tl,
  lastBook: Ja,
  extraBooks: kl,
  bookNumberToId: Gn,
  bookNumberToEnglishName: Za,
  bookIdToEnglishName: Nl,
  isCanonical: Qa,
  isExtraMaterial: Ol,
  isObsolete: Cl
};
var qe = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(qe || {});
const je = class {
  // private versInfo: Versification;
  constructor(t) {
    if (oe(this, "name"), oe(this, "fullPath"), oe(this, "isPresent"), oe(this, "hasVerseSegments"), oe(this, "isCustomized"), oe(this, "baseVersification"), oe(this, "scriptureBooks"), oe(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = qe[t]) : (this._type = t, this.name = qe[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
oe(je, "Original", new je(qe.Original)), oe(je, "Septuagint", new je(qe.Septuagint)), oe(je, "Vulgate", new je(qe.Vulgate)), oe(je, "English", new je(qe.English)), oe(je, "RussianProtestant", new je(qe.RussianProtestant)), oe(je, "RussianOrthodox", new je(qe.RussianOrthodox));
let gt = je;
function Ho(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++)
    e = e.split(t[n]).join(r);
  return e.split(r);
}
var ei = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(ei || {});
const Re = class se {
  constructor(t, r, n, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), n == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, s = r != null && r instanceof gt ? r : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = r != null && r instanceof gt ? r : void 0;
        this.setEmpty(a), this._verseNum = t % se.chapterDigitShifter, this._chapterNum = Math.floor(
          t % se.bookDigitShifter / se.chapterDigitShifter
        ), this._bookNum = Math.floor(t / se.bookDigitShifter);
      } else if (r == null)
        if (t != null && t instanceof se) {
          const a = t;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (t == null)
            return;
          const a = t instanceof gt ? t : se.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && r != null && n != null)
      if (typeof t == "string" && typeof r == "string" && typeof n == "string")
        this.setEmpty(o), this.updateInternal(t, r, n);
      else if (typeof t == "number" && typeof r == "number" && typeof n == "number")
        this._bookNum = t, this._chapterNum = r, this._verseNum = n, this.versification = o ?? se.defaultVersification;
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
      return r = new se(t), { success: !0, verseRef: r };
    } catch (n) {
      if (n instanceof Jt)
        return r = new se(), { success: !1, verseRef: r };
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
    return t % se.bcvMaxValue * se.bookDigitShifter + (r >= 0 ? r % se.bcvMaxValue * se.chapterDigitShifter : 0) + (n >= 0 ? n % se.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: r, chapterNum: n, verseNum: o, verse: a, versificationStr: s } = t, l = a || o.toString();
    let c;
    return s && (c = new gt(s)), r ? new se(r, n.toString(), l, c) : new se();
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
      if (r = r * 10 + +n - 0, r > se.bcvMaxValue)
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
    const { success: r, vNum: n } = se.tryGetVerseNum(t);
    this._verse = r ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = se.tryGetVerseNum(this._verse));
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
      const a = t.split("/");
      if (t = a[0], a.length > 1)
        try {
          const s = +a[1].trim();
          this.versification = new gt(qe[s]);
        } catch {
          throw new Jt("Invalid reference : " + t);
        }
    }
    const r = t.trim().split(" ");
    if (r.length !== 2)
      throw new Jt("Invalid reference : " + t);
    const n = r[1].split(":"), o = +n[0];
    if (n.length !== 2 || he.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !se.isVerseParseable(n[1]))
      throw new Jt("Invalid reference : " + t);
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
  allVerses(t = !1, r = se.verseRangeSeparators, n = se.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = Ho(this._verse, n);
    for (const s of a.map((l) => Ho(l, r))) {
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
  validateVerse(t, r) {
    if (!this.verse)
      return this.internalValid;
    let n = 0;
    for (const o of this.allVerses(!0, t, r)) {
      const a = o.internalValid;
      if (a !== 0)
        return a;
      const s = o.BBBCCCVVV;
      if (n > s)
        return 3;
      if (n === s)
        return 4;
      n = s;
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
  updateInternal(t, r, n) {
    this.bookNum = he.bookIdToNumber(t), this.chapter = r, this.verse = n;
  }
};
oe(Re, "defaultVersification", gt.English), oe(Re, "verseRangeSeparator", "-"), oe(Re, "verseSequenceIndicator", ","), oe(Re, "verseRangeSeparators", [Re.verseRangeSeparator]), oe(Re, "verseSequenceIndicators", [Re.verseSequenceIndicator]), oe(Re, "chapterDigitShifter", 1e3), oe(Re, "bookDigitShifter", Re.chapterDigitShifter * Re.chapterDigitShifter), oe(Re, "bcvMaxValue", Re.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(Re, "ValidStatusType", ei);
class Jt extends Error {
}
const Pl = Xs({ prefix: "pr-" });
function G(...e) {
  return Pl(Ws(e));
}
const ti = me.Root, Rl = me.Trigger, Vm = me.Group, Fm = me.Portal, zm = me.Sub, Um = me.RadioGroup, $l = J.forwardRef(({ className: e, inset: t, children: r, ...n }, o) => /* @__PURE__ */ U(
  me.SubTrigger,
  {
    ref: o,
    className: G(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ d(Rs, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
$l.displayName = me.SubTrigger.displayName;
const _l = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  me.SubContent,
  {
    ref: r,
    className: G(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
_l.displayName = me.SubContent.displayName;
const Kn = J.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ d(me.Portal, { children: /* @__PURE__ */ d(
  me.Content,
  {
    ref: n,
    sideOffset: t,
    className: G(
      /* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
Kn.displayName = me.Content.displayName;
const ri = J.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ d(
  me.Item,
  {
    ref: n,
    className: G(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...r
  }
));
ri.displayName = me.Item.displayName;
const ni = J.forwardRef(({ className: e, children: t, checked: r, ...n }, o) => /* @__PURE__ */ U(
  me.CheckboxItem,
  {
    ref: o,
    className: G(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(me.ItemIndicator, { children: /* @__PURE__ */ d(Ua, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
ni.displayName = me.CheckboxItem.displayName;
const Ml = J.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ U(
  me.RadioItem,
  {
    ref: n,
    className: G(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(me.ItemIndicator, { children: /* @__PURE__ */ d($s, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Ml.displayName = me.RadioItem.displayName;
const Jr = J.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ d(
  me.Label,
  {
    ref: n,
    className: G("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...r
  }
));
Jr.displayName = me.Label.displayName;
const Jn = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  me.Separator,
  {
    ref: r,
    className: G("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Jn.displayName = me.Separator.displayName;
function Il({ className: e, ...t }) {
  return /* @__PURE__ */ d(
    "span",
    {
      className: G("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
Il.displayName = "DropdownMenuShortcut";
const Zr = J.forwardRef(
  ({ className: e, type: t, ...r }, n) => /* @__PURE__ */ d(
    "input",
    {
      type: t,
      className: G(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: n,
      ...r
    }
  )
);
Zr.displayName = "Input";
const Al = za(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: r, handleSubmit: n, ...o }, a) => /* @__PURE__ */ U("div", { className: "pr-relative", children: [
    /* @__PURE__ */ d(
      Zr,
      {
        ...o,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",
        onChange: (s) => e(s.target.value),
        onKeyDown: (s) => {
          s.key === "Enter" && n(), t(s);
        },
        onClick: r,
        ref: a
      }
    ),
    /* @__PURE__ */ d(
      _s,
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
  activeChapter: r,
  highlightedChapter: n,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (l, c) => c + 1), s = $e(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ d("div", { className: G("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ d(
    "div",
    {
      className: G(
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
      onMouseMove: () => s(l),
      children: l
    },
    l
  )) });
}
const jl = za(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: r,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: s
  }, l) => /* @__PURE__ */ U(
    ri,
    {
      ref: l,
      textValue: e,
      className: G("pr-font-normal pr-text-slate-700", {
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
            className: G(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": r,
                "pr-border-l-red-200": a.toLowerCase() === "ot",
                "pr-border-l-purple-200": a.toLowerCase() === "nt",
                "pr-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: he.bookIdToEnglishName(e)
          }
        ),
        r && /* @__PURE__ */ d("div", { children: s })
      ]
    },
    e
  )
);
function Bl({ handleSort: e, handleLocationHistory: t, handleBookmarks: r }) {
  return /* @__PURE__ */ U(Jr, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ d("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ U("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ d(
        Ms,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ d(
        Is,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ d(
        As,
        {
          onClick: r,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const sr = he.allBookIds, Ll = {
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
  OT: sr.filter((r) => he.isBookOT(r)),
  NT: sr.filter((r) => he.isBookNT(r)),
  DC: sr.filter((r) => he.isBookDC(r))
})[e], Zt = (e) => Cs(he.bookIdToNumber(e));
function Ul() {
  return sr.map((t) => he.bookIdToEnglishName(t));
}
function Hl(e) {
  return Ul().includes(e);
}
function Wl(e) {
  const t = e.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (Hl(t))
    return sr.find((n) => he.bookIdToEnglishName(n) === t);
}
function Hm({ scrRef: e, handleSubmit: t }) {
  const [r, n] = de(""), [o, a] = de(
    he.bookNumberToId(e.bookNum)
  ), [s, l] = de(e.chapterNum ?? 0), [c, p] = de(
    he.bookNumberToId(e.bookNum)
  ), [u, h] = de(!1), [f, b] = de(u), y = wt(void 0), v = wt(void 0), m = wt(void 0), x = $e(
    (C) => zl(C).filter((_) => {
      const M = he.bookIdToEnglishName(_).toLowerCase(), B = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return M.includes(B) || // Match book name
      _.toLowerCase().includes(B);
    }),
    [r]
  ), I = (C) => {
    n(C);
  }, w = wt(!1), E = $e((C) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    h(C);
  }, []), g = $e(
    (C, _, M, B) => {
      if (l(
        he.bookNumberToId(e.bookNum) !== C ? 1 : e.chapterNum
      ), _ || Zt(C) === -1) {
        t({
          bookNum: he.bookIdToNumber(C),
          chapterNum: M || 1,
          verseNum: B || 1
        }), h(!1), n("");
        return;
      }
      a(o !== C ? C : ""), h(!_);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), O = (C) => {
    C <= 0 || C > Zt(o) || g(o, !0, C);
  }, S = $e(() => {
    Fl.forEach((C) => {
      const _ = r.match(C);
      if (_) {
        const [M, B = void 0, z = void 0] = _.slice(1), P = Wl(M);
        (he.isBookIdValid(M) || P) && g(
          P ?? M,
          !0,
          B ? parseInt(B, 10) : 1,
          z ? parseInt(z, 10) : 1
        );
      }
    });
  }, [g, r]), L = $e(
    (C) => {
      u ? (C.key === "ArrowDown" || C.key === "ArrowUp") && (typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null ? m.current.focus() : typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null && v.current.focus(), C.preventDefault()) : h(!0);
    },
    [u]
  ), D = (C) => {
    const { key: _ } = C;
    _ === "ArrowRight" || _ === "ArrowLeft" || _ === "ArrowDown" || _ === "ArrowUp" || _ === "Enter" || (y.current.dispatchEvent(new KeyboardEvent("keydown", { key: _ })), y.current.focus());
  }, V = (C) => {
    const { key: _ } = C;
    if (c === o) {
      if (_ === "Enter") {
        C.preventDefault(), g(o, !0, s);
        return;
      }
      let M = 0;
      if (_ === "ArrowRight")
        if (s < Zt(c))
          M = 1;
        else {
          C.preventDefault();
          return;
        }
      else if (_ === "ArrowLeft")
        if (s > 1)
          M = -1;
        else {
          C.preventDefault();
          return;
        }
      else
        _ === "ArrowDown" ? M = 6 : _ === "ArrowUp" && (M = -6);
      s + M <= 0 || s + M > Zt(c) ? l(0) : M !== 0 && (l(s + M), C.preventDefault());
    }
  };
  return Ye(() => {
    o === c ? o === he.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), jo(() => {
    b(u);
  }, [u]), jo(() => {
    const C = setTimeout(() => {
      if (f && v.current && m.current) {
        const M = m.current.offsetTop - Vl;
        v.current.scrollTo({ top: M, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(C);
    };
  }, [f]), /* @__PURE__ */ d("div", { className: "pr-flex", children: /* @__PURE__ */ U(ti, { modal: !1, open: u, onOpenChange: E, children: [
    /* @__PURE__ */ d(Rl, { asChild: !0, children: /* @__PURE__ */ d(
      Al,
      {
        ref: y,
        value: r,
        handleSearch: I,
        handleKeyDown: L,
        handleOnClick: () => {
          a(he.bookNumberToId(e.bookNum)), p(he.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), h(!0), y.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: S,
        placeholder: `${he.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ U(
      Kn,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: D,
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
            (C, _) => x(C).length > 0 && /* @__PURE__ */ U("div", { children: [
              /* @__PURE__ */ d(Jr, { className: "pr-font-semibold pr-text-slate-700", children: Ll[C] }),
              x(C).map((M) => /* @__PURE__ */ d("div", { children: /* @__PURE__ */ d(
                jl,
                {
                  bookId: M,
                  handleSelectBook: () => g(M, !1),
                  isSelected: o === M,
                  handleHighlightBook: () => p(M),
                  handleKeyDown: V,
                  bookType: C,
                  ref: (B) => {
                    o === M && (m.current = B);
                  },
                  children: /* @__PURE__ */ d(
                    Dl,
                    {
                      handleSelectChapter: O,
                      endChapter: Zt(M),
                      activeChapter: e.bookNum === he.bookIdToNumber(M) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (B) => {
                        l(B);
                      }
                    }
                  )
                }
              ) }, M)),
              Wo.length - 1 !== _ ? /* @__PURE__ */ d(Jn, {}) : void 0
            ] }, C)
          )
        ]
      }
    )
  ] }) });
}
const Zn = J.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ d(
    "table",
    {
      ref: r,
      className: G("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
Zn.displayName = "Table";
const Qn = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("thead", { ref: r, className: G("[&_tr]:pr-border-b", e), ...t }));
Qn.displayName = "TableHeader";
const eo = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("tbody", { ref: r, className: G("[&_tr:last-child]:pr-border-0", e), ...t }));
eo.displayName = "TableBody";
const Xl = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "tfoot",
  {
    ref: r,
    className: G("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Xl.displayName = "TableFooter";
const Dt = J.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "tr",
    {
      ref: r,
      className: G(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
Dt.displayName = "TableRow";
const Lr = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "th",
  {
    ref: r,
    className: G(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
Lr.displayName = "TableHead";
const dr = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "td",
  {
    ref: r,
    className: G("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
dr.displayName = "TableCell";
const ql = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "caption",
  {
    ref: r,
    className: G("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
ql.displayName = "TableCaption";
const Yl = Xn(
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
), ke = J.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...o }, a) => /* @__PURE__ */ d(n ? Zs : "button", { className: G(Yl({ variant: t, size: r, className: e })), ref: a, ...o })
);
ke.displayName = "Button";
const $n = ye.Root, Wm = ye.Group, _n = ye.Value, Vr = J.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ U(
  ye.Trigger,
  {
    ref: n,
    className: G(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ d(ye.Icon, { asChild: !0, children: /* @__PURE__ */ d(Ha, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Vr.displayName = ye.Trigger.displayName;
const oi = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  ye.ScrollUpButton,
  {
    ref: r,
    className: G("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ d(Ds, { className: "pr-h-4 pr-w-4" })
  }
));
oi.displayName = ye.ScrollUpButton.displayName;
const ai = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  ye.ScrollDownButton,
  {
    ref: r,
    className: G("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ d(Ha, { className: "pr-h-4 pr-w-4" })
  }
));
ai.displayName = ye.ScrollDownButton.displayName;
const Fr = J.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ d(ye.Portal, { children: /* @__PURE__ */ U(
  ye.Content,
  {
    ref: o,
    className: G(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      r === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: r,
    ...n,
    children: [
      /* @__PURE__ */ d(oi, {}),
      /* @__PURE__ */ d(
        ye.Viewport,
        {
          className: G(
            "pr-p-1",
            r === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ d(ai, {})
    ]
  }
) }));
Fr.displayName = ye.Content.displayName;
const Gl = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  ye.Label,
  {
    ref: r,
    className: G("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Gl.displayName = ye.Label.displayName;
const rt = J.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ U(
  ye.Item,
  {
    ref: n,
    className: G(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(ye.ItemIndicator, { children: /* @__PURE__ */ d(Ua, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ d(ye.ItemText, { children: t })
    ]
  }
));
rt.displayName = ye.Item.displayName;
const Kl = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  ye.Separator,
  {
    ref: r,
    className: G("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Kl.displayName = ye.Separator.displayName;
function Jl({ table: e }) {
  return /* @__PURE__ */ d("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ U("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ U("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ U("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ d("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ U(
        $n,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ d(Vr, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ d(_n, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ d(Fr, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ d(rt, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ U("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ U("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ U(
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
      /* @__PURE__ */ U(
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
      /* @__PURE__ */ U(
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
      /* @__PURE__ */ U(
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
  return /* @__PURE__ */ U(ti, { children: [
    /* @__PURE__ */ d(Ps, { asChild: !0, children: /* @__PURE__ */ U(ke, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ d(Fs, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ U(Kn, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ d(Jr, { children: "Toggle columns" }),
      /* @__PURE__ */ d(Jn, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ d(
        ni,
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
function Ql({
  columns: e,
  data: t,
  enablePagination: r = !1,
  showPaginationControls: n = !1,
  showColumnVisibilityControls: o = !1,
  onRowClickHandler: a = () => {
  }
}) {
  var v;
  const [s, l] = de([]), [c, p] = de([]), [u, h] = de({}), [f, b] = de({}), y = qs({
    data: t,
    columns: e,
    getCoreRowModel: Ys(),
    ...r && { getPaginationRowModel: Gs() },
    onSortingChange: l,
    getSortedRowModel: Ks(),
    onColumnFiltersChange: p,
    getFilteredRowModel: Js(),
    onColumnVisibilityChange: h,
    onRowSelectionChange: b,
    state: {
      sorting: s,
      columnFilters: c,
      columnVisibility: u,
      rowSelection: f
    }
  });
  return /* @__PURE__ */ U("div", { children: [
    o && /* @__PURE__ */ d(Zl, { table: y }),
    /* @__PURE__ */ d("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ U(Zn, { children: [
      /* @__PURE__ */ d(Qn, { children: y.getHeaderGroups().map((m) => /* @__PURE__ */ d(Dt, { children: m.headers.map((x) => /* @__PURE__ */ d(Lr, { children: x.isPlaceholder ? void 0 : Fo(x.column.columnDef.header, x.getContext()) }, x.id)) }, m.id)) }),
      /* @__PURE__ */ d(eo, { children: (v = y.getRowModel().rows) != null && v.length ? y.getRowModel().rows.map((m) => /* @__PURE__ */ d(
        Dt,
        {
          onClick: () => a(m, y),
          "data-state": m.getIsSelected() && "selected",
          children: m.getVisibleCells().map((x) => /* @__PURE__ */ d(dr, { children: Fo(x.column.columnDef.cell, x.getContext()) }, x.id))
        },
        m.id
      )) : /* @__PURE__ */ d(Dt, { children: /* @__PURE__ */ d(dr, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    r && /* @__PURE__ */ U("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
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
    r && n && /* @__PURE__ */ d(Jl, { table: y })
  ] });
}
function Xo({
  id: e,
  title: t,
  isDisabled: r = !1,
  isClearable: n = !0,
  hasError: o = !1,
  isFullWidth: a = !1,
  width: s,
  options: l = [],
  className: c,
  value: p,
  onChange: u,
  onFocus: h,
  onBlur: f,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ d(
    Qs,
    {
      id: e,
      disablePortal: !0,
      disabled: r,
      disableClearable: !n,
      fullWidth: a,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: p,
      onChange: u,
      onFocus: h,
      onBlur: f,
      getOptionLabel: b,
      renderInput: (y) => /* @__PURE__ */ d(
        el,
        {
          ...y,
          error: o,
          fullWidth: a,
          disabled: r,
          label: t,
          style: { width: s }
        }
      )
    }
  );
}
function Xm({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: r = !1,
  chapterCount: n
}) {
  const [o, a] = de(1), [s, l] = de(n), [c, p] = de(
    Array.from({ length: n }, (f, b) => b + 1)
  );
  Ye(() => {
    a(1), e(1), l(n), t(n), p(Array.from({ length: n }, (f, b) => b + 1));
  }, [n, t, e]);
  const u = (f, b) => {
    a(b), e(b), b > s && (l(b), t(b));
  }, h = (f, b) => {
    l(b), t(b), b < o && (a(b), e(b));
  };
  return /* @__PURE__ */ U(Kr, { children: [
    /* @__PURE__ */ d(
      zo,
      {
        className: "book-selection-chapter-form-label start",
        disabled: r,
        control: /* @__PURE__ */ d(
          Xo,
          {
            onChange: (f, b) => u(f, b),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (f) => f.toString(),
            value: o,
            isDisabled: r
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
        disabled: r,
        control: /* @__PURE__ */ d(
          Xo,
          {
            onChange: (f, b) => h(f, b),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (f) => f.toString(),
            value: s,
            isDisabled: r
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
function ec({
  id: e,
  isChecked: t,
  labelText: r = "",
  labelPosition: n = It.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: s = !1,
  hasError: l = !1,
  className: c,
  onChange: p
}) {
  const u = /* @__PURE__ */ d(
    rl,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: a,
      disabled: s,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: p
    }
  );
  let h;
  if (r) {
    const f = n === It.Before || n === It.Above, b = /* @__PURE__ */ d("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), y = n === It.Before || n === It.After, v = y ? b : /* @__PURE__ */ d("div", { children: b }), m = y ? u : /* @__PURE__ */ d("div", { children: u });
    h = /* @__PURE__ */ U(
      tl,
      {
        className: `papi-checkbox ${n.toString()}`,
        disabled: s,
        error: l,
        children: [
          f && v,
          m,
          !f && v
        ]
      }
    );
  } else
    h = u;
  return h;
}
function qm({
  id: e,
  className: t,
  legend: r,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: s
}) {
  return /* @__PURE__ */ U("fieldset", { id: e, className: t, children: [
    r && /* @__PURE__ */ d("legend", { children: r }),
    n.map((l) => /* @__PURE__ */ d(
      ec,
      {
        className: "check-item",
        isChecked: o.includes(l),
        labelText: s ? s(l) : l,
        onChange: () => a(l)
      },
      l
    ))
  ] });
}
function fe(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, a;
  for (a = 0; a < n.length; a++)
    o = n[a], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function N() {
  return N = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, N.apply(this, arguments);
}
function tc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function rc(e) {
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
var Mn = { exports: {} }, Pr = { exports: {} }, le = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qo;
function nc() {
  if (qo)
    return le;
  qo = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, h = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
  function w(g) {
    if (typeof g == "object" && g !== null) {
      var O = g.$$typeof;
      switch (O) {
        case t:
          switch (g = g.type, g) {
            case c:
            case p:
            case n:
            case a:
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
        case r:
          return O;
      }
    }
  }
  function E(g) {
    return w(g) === p;
  }
  return le.AsyncMode = c, le.ConcurrentMode = p, le.ContextConsumer = l, le.ContextProvider = s, le.Element = t, le.ForwardRef = u, le.Fragment = n, le.Lazy = y, le.Memo = b, le.Portal = r, le.Profiler = a, le.StrictMode = o, le.Suspense = h, le.isAsyncMode = function(g) {
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
    return w(g) === n;
  }, le.isLazy = function(g) {
    return w(g) === y;
  }, le.isMemo = function(g) {
    return w(g) === b;
  }, le.isPortal = function(g) {
    return w(g) === r;
  }, le.isProfiler = function(g) {
    return w(g) === a;
  }, le.isStrictMode = function(g) {
    return w(g) === o;
  }, le.isSuspense = function(g) {
    return w(g) === h;
  }, le.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === n || g === p || g === a || g === o || g === h || g === f || typeof g == "object" && g !== null && (g.$$typeof === y || g.$$typeof === b || g.$$typeof === s || g.$$typeof === l || g.$$typeof === u || g.$$typeof === m || g.$$typeof === x || g.$$typeof === I || g.$$typeof === v);
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
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, h = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
    function w(A) {
      return typeof A == "string" || typeof A == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      A === n || A === p || A === a || A === o || A === h || A === f || typeof A == "object" && A !== null && (A.$$typeof === y || A.$$typeof === b || A.$$typeof === s || A.$$typeof === l || A.$$typeof === u || A.$$typeof === m || A.$$typeof === x || A.$$typeof === I || A.$$typeof === v);
    }
    function E(A) {
      if (typeof A == "object" && A !== null) {
        var re = A.$$typeof;
        switch (re) {
          case t:
            var $ = A.type;
            switch ($) {
              case c:
              case p:
              case n:
              case a:
              case o:
              case h:
                return $;
              default:
                var ie = $ && $.$$typeof;
                switch (ie) {
                  case l:
                  case u:
                  case y:
                  case b:
                  case s:
                    return ie;
                  default:
                    return re;
                }
            }
          case r:
            return re;
        }
      }
    }
    var g = c, O = p, S = l, L = s, D = t, V = u, C = n, _ = y, M = b, B = r, z = a, P = o, j = h, te = !1;
    function Q(A) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), k(A) || E(A) === c;
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
    function q(A) {
      return typeof A == "object" && A !== null && A.$$typeof === t;
    }
    function H(A) {
      return E(A) === u;
    }
    function W(A) {
      return E(A) === n;
    }
    function Y(A) {
      return E(A) === y;
    }
    function K(A) {
      return E(A) === b;
    }
    function X(A) {
      return E(A) === r;
    }
    function Z(A) {
      return E(A) === a;
    }
    function ee(A) {
      return E(A) === o;
    }
    function ae(A) {
      return E(A) === h;
    }
    ce.AsyncMode = g, ce.ConcurrentMode = O, ce.ContextConsumer = S, ce.ContextProvider = L, ce.Element = D, ce.ForwardRef = V, ce.Fragment = C, ce.Lazy = _, ce.Memo = M, ce.Portal = B, ce.Profiler = z, ce.StrictMode = P, ce.Suspense = j, ce.isAsyncMode = Q, ce.isConcurrentMode = k, ce.isContextConsumer = R, ce.isContextProvider = F, ce.isElement = q, ce.isForwardRef = H, ce.isFragment = W, ce.isLazy = Y, ce.isMemo = K, ce.isPortal = X, ce.isProfiler = Z, ce.isStrictMode = ee, ce.isSuspense = ae, ce.isValidElementType = w, ce.typeOf = E;
  }()), ce;
}
var Go;
function ii() {
  return Go || (Go = 1, process.env.NODE_ENV === "production" ? Pr.exports = nc() : Pr.exports = oc()), Pr.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var bn, Ko;
function ac() {
  if (Ko)
    return bn;
  Ko = 1;
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
  return bn = o() ? Object.assign : function(a, s) {
    for (var l, c = n(a), p, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var h in l)
        t.call(l, h) && (c[h] = l[h]);
      if (e) {
        p = e(l);
        for (var f = 0; f < p.length; f++)
          r.call(l, p[f]) && (c[p[f]] = l[p[f]]);
      }
    }
    return c;
  }, bn;
}
var vn, Jo;
function to() {
  if (Jo)
    return vn;
  Jo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return vn = e, vn;
}
var yn, Zo;
function si() {
  return Zo || (Zo = 1, yn = Function.call.bind(Object.prototype.hasOwnProperty)), yn;
}
var wn, Qo;
function ic() {
  if (Qo)
    return wn;
  Qo = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = to(), r = {}, n = si();
    e = function(a) {
      var s = "Warning: " + a;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(a, s, l, c, p) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in a)
        if (n(a, u)) {
          var h;
          try {
            if (typeof a[u] != "function") {
              var f = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            h = a[u](s, u, c, l, null, t);
          } catch (y) {
            h = y;
          }
          if (h && !(h instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof h + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), h instanceof Error && !(h.message in r)) {
            r[h.message] = !0;
            var b = p ? p() : "";
            e(
              "Failed " + l + " type: " + h.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, wn = o, wn;
}
var xn, ea;
function sc() {
  if (ea)
    return xn;
  ea = 1;
  var e = ii(), t = ac(), r = to(), n = si(), o = ic(), a = function() {
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
  return xn = function(l, c) {
    var p = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function h(k) {
      var R = k && (p && k[p] || k[u]);
      if (typeof R == "function")
        return R;
    }
    var f = "<<anonymous>>", b = {
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
      oneOf: S,
      oneOfType: D,
      shape: _,
      exact: M
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
      function q(W, Y, K, X, Z, ee, ae) {
        if (X = X || f, ee = ee || K, ae !== r) {
          if (c) {
            var A = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw A.name = "Invariant Violation", A;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var re = X + ":" + K;
            !R[re] && // Avoid spamming the console because they are often not actionable except for lib authors
            F < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + X + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), R[re] = !0, F++);
          }
        }
        return Y[K] == null ? W ? Y[K] === null ? new v("The " + Z + " `" + ee + "` is marked as required " + ("in `" + X + "`, but its value is `null`.")) : new v("The " + Z + " `" + ee + "` is marked as required in " + ("`" + X + "`, but its value is `undefined`.")) : null : k(Y, K, X, Z, ee);
      }
      var H = q.bind(null, !1);
      return H.isRequired = q.bind(null, !0), H;
    }
    function x(k) {
      function R(F, q, H, W, Y, K) {
        var X = F[q], Z = P(X);
        if (Z !== k) {
          var ee = j(X);
          return new v(
            "Invalid " + W + " `" + Y + "` of type " + ("`" + ee + "` supplied to `" + H + "`, expected ") + ("`" + k + "`."),
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
      function R(F, q, H, W, Y) {
        if (typeof k != "function")
          return new v("Property `" + Y + "` of component `" + H + "` has invalid PropType notation inside arrayOf.");
        var K = F[q];
        if (!Array.isArray(K)) {
          var X = P(K);
          return new v("Invalid " + W + " `" + Y + "` of type " + ("`" + X + "` supplied to `" + H + "`, expected an array."));
        }
        for (var Z = 0; Z < K.length; Z++) {
          var ee = k(K, Z, H, W, Y + "[" + Z + "]", r);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return m(R);
    }
    function E() {
      function k(R, F, q, H, W) {
        var Y = R[F];
        if (!l(Y)) {
          var K = P(Y);
          return new v("Invalid " + H + " `" + W + "` of type " + ("`" + K + "` supplied to `" + q + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(k);
    }
    function g() {
      function k(R, F, q, H, W) {
        var Y = R[F];
        if (!e.isValidElementType(Y)) {
          var K = P(Y);
          return new v("Invalid " + H + " `" + W + "` of type " + ("`" + K + "` supplied to `" + q + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(k);
    }
    function O(k) {
      function R(F, q, H, W, Y) {
        if (!(F[q] instanceof k)) {
          var K = k.name || f, X = Q(F[q]);
          return new v("Invalid " + W + " `" + Y + "` of type " + ("`" + X + "` supplied to `" + H + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return m(R);
    }
    function S(k) {
      if (!Array.isArray(k))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function R(F, q, H, W, Y) {
        for (var K = F[q], X = 0; X < k.length; X++)
          if (y(K, k[X]))
            return null;
        var Z = JSON.stringify(k, function(ae, A) {
          var re = j(A);
          return re === "symbol" ? String(A) : A;
        });
        return new v("Invalid " + W + " `" + Y + "` of value `" + String(K) + "` " + ("supplied to `" + H + "`, expected one of " + Z + "."));
      }
      return m(R);
    }
    function L(k) {
      function R(F, q, H, W, Y) {
        if (typeof k != "function")
          return new v("Property `" + Y + "` of component `" + H + "` has invalid PropType notation inside objectOf.");
        var K = F[q], X = P(K);
        if (X !== "object")
          return new v("Invalid " + W + " `" + Y + "` of type " + ("`" + X + "` supplied to `" + H + "`, expected an object."));
        for (var Z in K)
          if (n(K, Z)) {
            var ee = k(K, Z, H, W, Y + "." + Z, r);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return m(R);
    }
    function D(k) {
      if (!Array.isArray(k))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var R = 0; R < k.length; R++) {
        var F = k[R];
        if (typeof F != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + te(F) + " at index " + R + "."
          ), s;
      }
      function q(H, W, Y, K, X) {
        for (var Z = [], ee = 0; ee < k.length; ee++) {
          var ae = k[ee], A = ae(H, W, Y, K, X, r);
          if (A == null)
            return null;
          A.data && n(A.data, "expectedType") && Z.push(A.data.expectedType);
        }
        var re = Z.length > 0 ? ", expected one of type [" + Z.join(", ") + "]" : "";
        return new v("Invalid " + K + " `" + X + "` supplied to " + ("`" + Y + "`" + re + "."));
      }
      return m(q);
    }
    function V() {
      function k(R, F, q, H, W) {
        return B(R[F]) ? null : new v("Invalid " + H + " `" + W + "` supplied to " + ("`" + q + "`, expected a ReactNode."));
      }
      return m(k);
    }
    function C(k, R, F, q, H) {
      return new v(
        (k || "React class") + ": " + R + " type `" + F + "." + q + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + H + "`."
      );
    }
    function _(k) {
      function R(F, q, H, W, Y) {
        var K = F[q], X = P(K);
        if (X !== "object")
          return new v("Invalid " + W + " `" + Y + "` of type `" + X + "` " + ("supplied to `" + H + "`, expected `object`."));
        for (var Z in k) {
          var ee = k[Z];
          if (typeof ee != "function")
            return C(H, W, Y, Z, j(ee));
          var ae = ee(K, Z, H, W, Y + "." + Z, r);
          if (ae)
            return ae;
        }
        return null;
      }
      return m(R);
    }
    function M(k) {
      function R(F, q, H, W, Y) {
        var K = F[q], X = P(K);
        if (X !== "object")
          return new v("Invalid " + W + " `" + Y + "` of type `" + X + "` " + ("supplied to `" + H + "`, expected `object`."));
        var Z = t({}, F[q], k);
        for (var ee in Z) {
          var ae = k[ee];
          if (n(k, ee) && typeof ae != "function")
            return C(H, W, Y, ee, j(ae));
          if (!ae)
            return new v(
              "Invalid " + W + " `" + Y + "` key `" + ee + "` supplied to `" + H + "`.\nBad object: " + JSON.stringify(F[q], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(k), null, "  ")
            );
          var A = ae(K, ee, H, W, Y + "." + ee, r);
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
            var F = R.call(k), q;
            if (R !== k.entries) {
              for (; !(q = F.next()).done; )
                if (!B(q.value))
                  return !1;
            } else
              for (; !(q = F.next()).done; ) {
                var H = q.value;
                if (H && !B(H[1]))
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
    function te(k) {
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
    function Q(k) {
      return !k.constructor || !k.constructor.name ? f : k.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, xn;
}
var En, ta;
function lc() {
  if (ta)
    return En;
  ta = 1;
  var e = to();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, En = function() {
    function n(s, l, c, p, u, h) {
      if (h !== e) {
        var f = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw f.name = "Invariant Violation", f;
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
  }, En;
}
if (process.env.NODE_ENV !== "production") {
  var cc = ii(), pc = !0;
  Mn.exports = sc()(cc.isElement, pc);
} else
  Mn.exports = lc()();
var uc = Mn.exports;
const i = /* @__PURE__ */ tc(uc);
function Wt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...n) {
    return e(...n) || t(...n);
  };
}
function yt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function li(e) {
  if (!yt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = li(e[r]);
  }), t;
}
function nt(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? N({}, e) : e;
  return yt(e) && yt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (yt(t[o]) && o in e && yt(e[o]) ? n[o] = nt(e[o], t[o], r) : r.clone ? n[o] = yt(t[o]) ? li(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
function dc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ci(e, t, r, n, o) {
  const a = e[t], s = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !dc(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const pi = Wt(i.element, ci);
pi.isRequired = Wt(i.element.isRequired, ci);
const vr = pi;
function fc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function hc(e, t, r, n, o) {
  const a = e[t], s = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !fc(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const mc = Wt(i.elementType, hc), gc = "exact-prop: ​";
function ui(e) {
  return process.env.NODE_ENV === "production" ? e : N({}, e, {
    [gc]: (t) => {
      const r = Object.keys(t).filter((n) => !e.hasOwnProperty(n));
      return r.length > 0 ? new Error(`The following props are not supported: ${r.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Bt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var In = { exports: {} }, pe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ra;
function bc() {
  if (ra)
    return pe;
  ra = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function v(m) {
    if (typeof m == "object" && m !== null) {
      var x = m.$$typeof;
      switch (x) {
        case e:
          switch (m = m.type, m) {
            case r:
            case o:
            case n:
            case p:
            case u:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case s:
                case c:
                case f:
                case h:
                case a:
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
  return pe.ContextConsumer = s, pe.ContextProvider = a, pe.Element = e, pe.ForwardRef = c, pe.Fragment = r, pe.Lazy = f, pe.Memo = h, pe.Portal = t, pe.Profiler = o, pe.StrictMode = n, pe.Suspense = p, pe.SuspenseList = u, pe.isAsyncMode = function() {
    return !1;
  }, pe.isConcurrentMode = function() {
    return !1;
  }, pe.isContextConsumer = function(m) {
    return v(m) === s;
  }, pe.isContextProvider = function(m) {
    return v(m) === a;
  }, pe.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, pe.isForwardRef = function(m) {
    return v(m) === c;
  }, pe.isFragment = function(m) {
    return v(m) === r;
  }, pe.isLazy = function(m) {
    return v(m) === f;
  }, pe.isMemo = function(m) {
    return v(m) === h;
  }, pe.isPortal = function(m) {
    return v(m) === t;
  }, pe.isProfiler = function(m) {
    return v(m) === o;
  }, pe.isStrictMode = function(m) {
    return v(m) === n;
  }, pe.isSuspense = function(m) {
    return v(m) === p;
  }, pe.isSuspenseList = function(m) {
    return v(m) === u;
  }, pe.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === r || m === o || m === n || m === p || m === u || m === b || typeof m == "object" && m !== null && (m.$$typeof === f || m.$$typeof === h || m.$$typeof === a || m.$$typeof === s || m.$$typeof === c || m.$$typeof === y || m.getModuleId !== void 0);
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
var na;
function vc() {
  return na || (na = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y = !1, v = !1, m = !1, x = !1, I = !1, w;
    w = Symbol.for("react.module.reference");
    function E($) {
      return !!(typeof $ == "string" || typeof $ == "function" || $ === r || $ === o || I || $ === n || $ === p || $ === u || x || $ === b || y || v || m || typeof $ == "object" && $ !== null && ($.$$typeof === f || $.$$typeof === h || $.$$typeof === a || $.$$typeof === s || $.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      $.$$typeof === w || $.getModuleId !== void 0));
    }
    function g($) {
      if (typeof $ == "object" && $ !== null) {
        var ie = $.$$typeof;
        switch (ie) {
          case e:
            var Ee = $.type;
            switch (Ee) {
              case r:
              case o:
              case n:
              case p:
              case u:
                return Ee;
              default:
                var Se = Ee && Ee.$$typeof;
                switch (Se) {
                  case l:
                  case s:
                  case c:
                  case f:
                  case h:
                  case a:
                    return Se;
                  default:
                    return ie;
                }
            }
          case t:
            return ie;
        }
      }
    }
    var O = s, S = a, L = e, D = c, V = r, C = f, _ = h, M = t, B = o, z = n, P = p, j = u, te = !1, Q = !1;
    function k($) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function R($) {
      return Q || (Q = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function F($) {
      return g($) === s;
    }
    function q($) {
      return g($) === a;
    }
    function H($) {
      return typeof $ == "object" && $ !== null && $.$$typeof === e;
    }
    function W($) {
      return g($) === c;
    }
    function Y($) {
      return g($) === r;
    }
    function K($) {
      return g($) === f;
    }
    function X($) {
      return g($) === h;
    }
    function Z($) {
      return g($) === t;
    }
    function ee($) {
      return g($) === o;
    }
    function ae($) {
      return g($) === n;
    }
    function A($) {
      return g($) === p;
    }
    function re($) {
      return g($) === u;
    }
    ue.ContextConsumer = O, ue.ContextProvider = S, ue.Element = L, ue.ForwardRef = D, ue.Fragment = V, ue.Lazy = C, ue.Memo = _, ue.Portal = M, ue.Profiler = B, ue.StrictMode = z, ue.Suspense = P, ue.SuspenseList = j, ue.isAsyncMode = k, ue.isConcurrentMode = R, ue.isContextConsumer = F, ue.isContextProvider = q, ue.isElement = H, ue.isForwardRef = W, ue.isFragment = Y, ue.isLazy = K, ue.isMemo = X, ue.isPortal = Z, ue.isProfiler = ee, ue.isStrictMode = ae, ue.isSuspense = A, ue.isSuspenseList = re, ue.isValidElementType = E, ue.typeOf = g;
  }()), ue;
}
process.env.NODE_ENV === "production" ? In.exports = bc() : In.exports = vc();
var zr = In.exports;
const yc = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function wc(e) {
  const t = `${e}`.match(yc);
  return t && t[1] || "";
}
function di(e, t = "") {
  return e.displayName || e.name || wc(e) || t;
}
function oa(e, t, r) {
  const n = di(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function xc(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return di(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case zr.ForwardRef:
          return oa(e, e.render, "ForwardRef");
        case zr.Memo:
          return oa(e, e.type, "memo");
        default:
          return;
      }
  }
}
function ot(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], s = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${n} \`${s}\` supplied to \`${r}\`. Expected an HTMLElement.`) : null;
}
const Ec = i.oneOfType([i.func, i.object]), ro = Ec;
function Ke(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Bt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function An(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function fi(e, t = 166) {
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
function Tc(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, a, s) => {
    const l = o || "<<anonymous>>", c = s || n;
    return typeof r[n] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function kc(e, t) {
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
function Lt(e) {
  return Oe(e).defaultView || window;
}
function Nc(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? N({}, t.propTypes) : null;
  return (o) => (a, s, l, c, p, ...u) => {
    const h = p || s, f = r == null ? void 0 : r[h];
    if (f) {
      const b = f(a, s, l, c, p, ...u);
      if (b)
        return b;
    }
    return typeof a[s] < "u" && !a[o] ? new Error(`The prop \`${h}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Ur(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Oc = typeof window < "u" ? T.useLayoutEffect : T.useEffect, Tt = Oc;
let aa = 0;
function Cc(e) {
  const [t, r] = T.useState(e), n = e || t;
  return T.useEffect(() => {
    t == null && (aa += 1, r(`mui-${aa}`));
  }, [t]), n;
}
const ia = T["useId".toString()];
function hi(e) {
  if (ia !== void 0) {
    const t = ia();
    return e ?? t;
  }
  return Cc(e);
}
function Sc(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function mi({
  controlled: e,
  default: t,
  name: r,
  state: n = "value"
}) {
  const {
    current: o
  } = T.useRef(e !== void 0), [a, s] = T.useState(t), l = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    T.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${n} state of ${r} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [n, r, e]);
    const {
      current: p
    } = T.useRef(t);
    T.useEffect(() => {
      !o && p !== t && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = T.useCallback((p) => {
    o || s(p);
  }, []);
  return [l, c];
}
function fr(e) {
  const t = T.useRef(e);
  return Tt(() => {
    t.current = e;
  }), T.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function Ue(...e) {
  return T.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((r) => {
      Ur(r, t);
    });
  }, e);
}
const sa = {};
function Pc(e, t) {
  const r = T.useRef(sa);
  return r.current === sa && (r.current = e(t)), r;
}
const Rc = [];
function $c(e) {
  T.useEffect(e, Rc);
}
class yr {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new yr();
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
function or() {
  const e = Pc(yr.create).current;
  return $c(e.disposeEffect), e;
}
let Qr = !0, Dn = !1;
const _c = new yr(), Mc = {
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
function Ic(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && Mc[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Ac(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Qr = !0);
}
function Tn() {
  Qr = !1;
}
function Dc() {
  this.visibilityState === "hidden" && Dn && (Qr = !0);
}
function jc(e) {
  e.addEventListener("keydown", Ac, !0), e.addEventListener("mousedown", Tn, !0), e.addEventListener("pointerdown", Tn, !0), e.addEventListener("touchstart", Tn, !0), e.addEventListener("visibilitychange", Dc, !0);
}
function Bc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Qr || Ic(t);
}
function gi() {
  const e = T.useCallback((o) => {
    o != null && jc(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function r() {
    return t.current ? (Dn = !0, _c.start(100, () => {
      Dn = !1;
    }), t.current = !1, !0) : !1;
  }
  function n(o) {
    return Bc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function bi(e) {
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
function vi(e, t, r, n) {
  const o = e[t];
  if (o == null || !Fc(o)) {
    const a = Lc(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function yi(e, t, ...r) {
  return e[t] === void 0 ? null : vi(e, t, ...r);
}
function jn() {
  return null;
}
yi.isRequired = vi;
jn.isRequired = jn;
const wi = process.env.NODE_ENV === "production" ? jn : yi;
function xi(e, t) {
  const r = N({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = N({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = t[n];
      r[n] = {}, !a || !Object.keys(a) ? r[n] = o : !o || !Object.keys(o) ? r[n] = a : (r[n] = N({}, a), Object.keys(o).forEach((s) => {
        r[n][s] = xi(o[s], a[s]);
      }));
    } else
      r[n] === void 0 && (r[n] = e[n]);
  }), r;
}
function st(e, t, r = void 0) {
  const n = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      n[o] = e[o].reduce((a, s) => {
        if (s) {
          const l = t(s);
          l !== "" && a.push(l), r && r[s] && a.push(r[s]);
        }
        return a;
      }, []).join(" ");
    }
  ), n;
}
const la = (e) => e, zc = () => {
  let e = la;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = la;
    }
  };
}, Uc = zc(), Ei = Uc, Ti = {
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
  const n = Ti[t];
  return n ? `${r}-${n}` : `${Ei.generate(e)}-${t}`;
}
function ut(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = Ze(e, o, r);
  }), n;
}
function Hc(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, r));
}
function ki(e) {
  return typeof e == "string";
}
function ar(e, t, r) {
  return e === void 0 || ki(e) ? t : N({}, t, {
    ownerState: N({}, t.ownerState, r)
  });
}
const Wc = {
  disableDefaultClasses: !1
}, Xc = /* @__PURE__ */ T.createContext(Wc);
function qc(e) {
  const {
    disableDefaultClasses: t
  } = T.useContext(Xc);
  return (r) => t ? "" : e(r);
}
function Ni(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function Yc(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
function ca(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function Gc(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const b = Ne(r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), y = N({}, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), v = N({}, r, o, n);
    return b.length > 0 && (v.className = b), Object.keys(y).length > 0 && (v.style = y), {
      props: v,
      internalRef: void 0
    };
  }
  const s = Ni(N({}, o, n)), l = ca(n), c = ca(o), p = t(s), u = Ne(p == null ? void 0 : p.className, r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), h = N({}, p == null ? void 0 : p.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), f = N({}, p, r, c, l);
  return u.length > 0 && (f.className = u), Object.keys(h).length > 0 && (f.style = h), {
    props: f,
    internalRef: p.ref
  };
}
const Kc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function kt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, s = fe(e, Kc), l = a ? {} : Yc(n, o), {
    props: c,
    internalRef: p
  } = Gc(N({}, s, {
    externalSlotProps: l
  })), u = Ue(p, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return ar(r, N({}, c, {
    ref: u
  }), o);
}
const Oi = "base";
function Jc(e) {
  return `${Oi}--${e}`;
}
function Zc(e, t) {
  return `${Oi}-${e}-${t}`;
}
function Ci(e, t) {
  const r = Ti[t];
  return r ? Jc(r) : Zc(e, t);
}
function Qc(e, t) {
  const r = {};
  return t.forEach((n) => {
    r[n] = Ci(e, n);
  }), r;
}
const ep = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function tp(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function rp(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function np(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || rp(e));
}
function op(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(ep)).forEach((n, o) => {
    const a = tp(n);
    a === -1 || !np(n) || (a === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: a,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function ap() {
  return !0;
}
function Hr(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = op,
    isEnabled: s = ap,
    open: l
  } = e, c = T.useRef(!1), p = T.useRef(null), u = T.useRef(null), h = T.useRef(null), f = T.useRef(null), b = T.useRef(!1), y = T.useRef(null), v = Ue(t.ref, y), m = T.useRef(null);
  T.useEffect(() => {
    !l || !y.current || (b.current = !r);
  }, [r, l]), T.useEffect(() => {
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
    const w = Oe(y.current), E = (S) => {
      m.current = S, !(n || !s() || S.key !== "Tab") && w.activeElement === y.current && S.shiftKey && (c.current = !0, u.current && u.current.focus());
    }, g = () => {
      const S = y.current;
      if (S === null)
        return;
      if (!w.hasFocus() || !s() || c.current) {
        c.current = !1;
        return;
      }
      if (S.contains(w.activeElement) || n && w.activeElement !== p.current && w.activeElement !== u.current)
        return;
      if (w.activeElement !== f.current)
        f.current = null;
      else if (f.current !== null)
        return;
      if (!b.current)
        return;
      let L = [];
      if ((w.activeElement === p.current || w.activeElement === u.current) && (L = a(y.current)), L.length > 0) {
        var D, V;
        const C = !!((D = m.current) != null && D.shiftKey && ((V = m.current) == null ? void 0 : V.key) === "Tab"), _ = L[0], M = L[L.length - 1];
        typeof _ != "string" && typeof M != "string" && (C ? M.focus() : _.focus());
      } else
        S.focus();
    };
    w.addEventListener("focusin", g), w.addEventListener("keydown", E, !0);
    const O = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && g();
    }, 50);
    return () => {
      clearInterval(O), w.removeEventListener("focusin", g), w.removeEventListener("keydown", E, !0);
    };
  }, [r, n, o, s, l, a]);
  const x = (w) => {
    h.current === null && (h.current = w.relatedTarget), b.current = !0, f.current = w.target;
    const E = t.props.onFocus;
    E && E(w);
  }, I = (w) => {
    h.current === null && (h.current = w.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ U(T.Fragment, {
    children: [/* @__PURE__ */ d("div", {
      tabIndex: l ? 0 : -1,
      onFocus: I,
      ref: p,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: v,
      onFocus: x
    }), /* @__PURE__ */ d("div", {
      tabIndex: l ? 0 : -1,
      onFocus: I,
      ref: u,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Hr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: vr,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: i.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: i.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: i.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: i.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: i.func,
  /**
   * If `true`, focus is locked.
   */
  open: i.bool.isRequired
});
process.env.NODE_ENV !== "production" && (Hr["propTypes"] = ui(Hr.propTypes));
function ip(e) {
  return typeof e == "function" ? e() : e;
}
const hr = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = t, [s, l] = T.useState(null), c = Ue(/* @__PURE__ */ T.isValidElement(n) ? n.ref : null, r);
  if (Tt(() => {
    a || l(ip(o) || document.body);
  }, [o, a]), Tt(() => {
    if (s && !a)
      return Ur(r, s), () => {
        Ur(r, null);
      };
  }, [r, s, a]), a) {
    if (/* @__PURE__ */ T.isValidElement(n)) {
      const p = {
        ref: c
      };
      return /* @__PURE__ */ T.cloneElement(n, p);
    }
    return /* @__PURE__ */ d(T.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ d(T.Fragment, {
    children: s && /* @__PURE__ */ gl.createPortal(n, s)
  });
});
process.env.NODE_ENV !== "production" && (hr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: i.node,
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
  container: i.oneOfType([ot, i.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: i.bool
});
process.env.NODE_ENV !== "production" && (hr["propTypes"] = ui(hr.propTypes));
function sp(e) {
  const t = Oe(e);
  return t.body === e ? Lt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function lr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function pa(e) {
  return parseInt(Lt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function lp(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function ua(e, t, r, n, o) {
  const a = [t, r, ...n];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1, c = !lp(s);
    l && c && lr(s, o);
  });
}
function kn(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function cp(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (sp(n)) {
      const s = bi(Oe(n));
      r.push({
        value: n.style.paddingRight,
        property: "padding-right",
        el: n
      }), n.style.paddingRight = `${pa(n) + s}px`;
      const l = Oe(n).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        r.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${pa(c) + s}px`;
      });
    }
    let a;
    if (n.parentNode instanceof DocumentFragment)
      a = Oe(n).body;
    else {
      const s = n.parentElement, l = Lt(n);
      a = (s == null ? void 0 : s.nodeName) === "HTML" && l.getComputedStyle(s).overflowY === "scroll" ? s : n;
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
      el: s,
      property: l
    }) => {
      a ? s.style.setProperty(l, a) : s.style.removeProperty(l);
    });
  };
}
function pp(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class up {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && lr(t.modalRef, !1);
    const o = pp(r);
    ua(r, t.mount, t.modalRef, o, !0);
    const a = kn(this.containers, (s) => s.container === r);
    return a !== -1 ? (this.containers[a].modals.push(t), n) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: o
    }), n);
  }
  mount(t, r) {
    const n = kn(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[n];
    o.restore || (o.restore = cp(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = kn(this.containers, (s) => s.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(n, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && lr(t.modalRef, r), ua(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = a.modals[a.modals.length - 1];
      s.modalRef && lr(s.modalRef, !1);
    }
    return n;
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
const hp = new up();
function mp(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = hp,
    closeAfterTransition: a = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: p,
    open: u,
    rootRef: h
  } = e, f = T.useRef({}), b = T.useRef(null), y = T.useRef(null), v = Ue(y, h), [m, x] = T.useState(!u), I = fp(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const E = () => Oe(b.current), g = () => (f.current.modalRef = y.current, f.current.mount = b.current, f.current), O = () => {
    o.mount(g(), {
      disableScrollLock: n
    }), y.current && (y.current.scrollTop = 0);
  }, S = fr(() => {
    const P = dp(t) || E().body;
    o.add(g(), P), y.current && O();
  }), L = T.useCallback(() => o.isTopModal(g()), [o]), D = fr((P) => {
    b.current = P, P && (u && L() ? O() : y.current && lr(y.current, w));
  }), V = T.useCallback(() => {
    o.remove(g(), w);
  }, [w, o]);
  T.useEffect(() => () => {
    V();
  }, [V]), T.useEffect(() => {
    u ? S() : (!I || !a) && V();
  }, [u, V, I, a, S]);
  const C = (P) => (j) => {
    var te;
    (te = P.onKeyDown) == null || te.call(P, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !L()) && (r || (j.stopPropagation(), p && p(j, "escapeKeyDown")));
  }, _ = (P) => (j) => {
    var te;
    (te = P.onClick) == null || te.call(P, j), j.target === j.currentTarget && p && p(j, "backdropClick");
  };
  return {
    getRootProps: (P = {}) => {
      const j = Ni(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const te = N({}, j, P);
      return N({
        role: "presentation"
      }, te, {
        onKeyDown: C(te),
        ref: v
      });
    },
    getBackdropProps: (P = {}) => {
      const j = P;
      return N({
        "aria-hidden": !0
      }, j, {
        onClick: _(j),
        open: u
      });
    },
    getTransitionProps: () => {
      const P = () => {
        x(!1), s && s();
      }, j = () => {
        x(!0), l && l(), a && V();
      };
      return {
        onEnter: An(P, c == null ? void 0 : c.props.onEnter),
        onExited: An(j, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: v,
    portalRef: D,
    isTopModal: L,
    exited: m,
    hasTransition: I
  };
}
var _e = "top", He = "bottom", We = "right", Me = "left", no = "auto", wr = [_e, He, We, Me], Vt = "start", mr = "end", gp = "clippingParents", Si = "viewport", Qt = "popper", bp = "reference", da = /* @__PURE__ */ wr.reduce(function(e, t) {
  return e.concat([t + "-" + Vt, t + "-" + mr]);
}, []), Pi = /* @__PURE__ */ [].concat(wr, [no]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Vt, t + "-" + mr]);
}, []), vp = "beforeRead", yp = "read", wp = "afterRead", xp = "beforeMain", Ep = "main", Tp = "afterMain", kp = "beforeWrite", Np = "write", Op = "afterWrite", Cp = [vp, yp, wp, xp, Ep, Tp, kp, Np, Op];
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
function Sp(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, a = t.elements[r];
    !ze(a) || !Je(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function Pp(e) {
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
      var o = t.elements[n], a = t.attributes[n] || {}, s = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]), l = s.reduce(function(c, p) {
        return c[p] = "", c;
      }, {});
      !ze(o) || !Je(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Rp = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Sp,
  effect: Pp,
  requires: ["computeStyles"]
};
function Ge(e) {
  return e.split("-")[0];
}
var xt = Math.max, Wr = Math.min, Ft = Math.round;
function Bn() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ri() {
  return !/^((?!chrome|android).)*safari/i.test(Bn());
}
function zt(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  t && ze(e) && (o = e.offsetWidth > 0 && Ft(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Ft(n.height) / e.offsetHeight || 1);
  var s = Nt(e) ? Le(e) : window, l = s.visualViewport, c = !Ri() && r, p = (n.left + (c && l ? l.offsetLeft : 0)) / o, u = (n.top + (c && l ? l.offsetTop : 0)) / a, h = n.width / o, f = n.height / a;
  return {
    width: h,
    height: f,
    top: u,
    right: p + h,
    bottom: u + f,
    left: p,
    x: p,
    y: u
  };
}
function ao(e) {
  var t = zt(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function $i(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && oo(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function at(e) {
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
function en(e) {
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
function fa(e) {
  return !ze(e) || // https://github.com/popperjs/popper-core/issues/837
  at(e).position === "fixed" ? null : e.offsetParent;
}
function _p(e) {
  var t = /firefox/i.test(Bn()), r = /Trident/i.test(Bn());
  if (r && ze(e)) {
    var n = at(e);
    if (n.position === "fixed")
      return null;
  }
  var o = en(e);
  for (oo(o) && (o = o.host); ze(o) && ["html", "body"].indexOf(Je(o)) < 0; ) {
    var a = at(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function xr(e) {
  for (var t = Le(e), r = fa(e); r && $p(r) && at(r).position === "static"; )
    r = fa(r);
  return r && (Je(r) === "html" || Je(r) === "body" && at(r).position === "static") ? t : r || _p(e) || t;
}
function io(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function cr(e, t, r) {
  return xt(e, Wr(t, r));
}
function Mp(e, t, r) {
  var n = cr(e, t, r);
  return n > r ? r : n;
}
function _i() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Mi(e) {
  return Object.assign({}, _i(), e);
}
function Ii(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var Ip = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, Mi(typeof t != "number" ? t : Ii(t, wr));
};
function Ap(e) {
  var t, r = e.state, n = e.name, o = e.options, a = r.elements.arrow, s = r.modifiersData.popperOffsets, l = Ge(r.placement), c = io(l), p = [Me, We].indexOf(l) >= 0, u = p ? "height" : "width";
  if (!(!a || !s)) {
    var h = Ip(o.padding, r), f = ao(a), b = c === "y" ? _e : Me, y = c === "y" ? He : We, v = r.rects.reference[u] + r.rects.reference[c] - s[c] - r.rects.popper[u], m = s[c] - r.rects.reference[c], x = xr(a), I = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, w = v / 2 - m / 2, E = h[b], g = I - f[u] - h[y], O = I / 2 - f[u] / 2 + w, S = cr(E, O, g), L = c;
    r.modifiersData[n] = (t = {}, t[L] = S, t.centerOffset = S - O, t);
  }
}
function Dp(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || $i(t.elements.popper, o) && (t.elements.arrow = o));
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
  var r = e.x, n = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Ft(r * o) / o || 0,
    y: Ft(n * o) / o || 0
  };
}
function ha(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, a = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, p = e.adaptive, u = e.roundOffsets, h = e.isFixed, f = s.x, b = f === void 0 ? 0 : f, y = s.y, v = y === void 0 ? 0 : y, m = typeof u == "function" ? u({
    x: b,
    y: v
  }) : {
    x: b,
    y: v
  };
  b = m.x, v = m.y;
  var x = s.hasOwnProperty("x"), I = s.hasOwnProperty("y"), w = Me, E = _e, g = window;
  if (p) {
    var O = xr(r), S = "clientHeight", L = "clientWidth";
    if (O === Le(r) && (O = dt(r), at(O).position !== "static" && l === "absolute" && (S = "scrollHeight", L = "scrollWidth")), O = O, o === _e || (o === Me || o === We) && a === mr) {
      E = He;
      var D = h && O === g && g.visualViewport ? g.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        O[S]
      );
      v -= D - n.height, v *= c ? 1 : -1;
    }
    if (o === Me || (o === _e || o === He) && a === mr) {
      w = We;
      var V = h && O === g && g.visualViewport ? g.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        O[L]
      );
      b -= V - n.width, b *= c ? 1 : -1;
    }
  }
  var C = Object.assign({
    position: l
  }, p && Bp), _ = u === !0 ? Lp({
    x: b,
    y: v
  }, Le(r)) : {
    x: b,
    y: v
  };
  if (b = _.x, v = _.y, c) {
    var M;
    return Object.assign({}, C, (M = {}, M[E] = I ? "0" : "", M[w] = x ? "0" : "", M.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + v + "px)" : "translate3d(" + b + "px, " + v + "px, 0)", M));
  }
  return Object.assign({}, C, (t = {}, t[E] = I ? v + "px" : "", t[w] = x ? b + "px" : "", t.transform = "", t));
}
function Vp(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, a = r.adaptive, s = a === void 0 ? !0 : a, l = r.roundOffsets, c = l === void 0 ? !0 : l, p = {
    placement: Ge(t.placement),
    variation: Ut(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ha(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ha(Object.assign({}, p, {
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
var Rr = {
  passive: !0
};
function zp(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, s = n.resize, l = s === void 0 ? !0 : s, c = Le(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && p.forEach(function(u) {
    u.addEventListener("scroll", r.update, Rr);
  }), l && c.addEventListener("resize", r.update, Rr), function() {
    a && p.forEach(function(u) {
      u.removeEventListener("scroll", r.update, Rr);
    }), l && c.removeEventListener("resize", r.update, Rr);
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
function Ar(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Hp[t];
  });
}
var Wp = {
  start: "end",
  end: "start"
};
function ma(e) {
  return e.replace(/start|end/g, function(t) {
    return Wp[t];
  });
}
function so(e) {
  var t = Le(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function lo(e) {
  return zt(dt(e)).left + so(e).scrollLeft;
}
function Xp(e, t) {
  var r = Le(e), n = dt(e), o = r.visualViewport, a = n.clientWidth, s = n.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    var p = Ri();
    (p || !p && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: l + lo(e),
    y: c
  };
}
function qp(e) {
  var t, r = dt(e), n = so(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = xt(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = xt(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -n.scrollLeft + lo(e), c = -n.scrollTop;
  return at(o || r).direction === "rtl" && (l += xt(r.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: l,
    y: c
  };
}
function co(e) {
  var t = at(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function Ai(e) {
  return ["html", "body", "#document"].indexOf(Je(e)) >= 0 ? e.ownerDocument.body : ze(e) && co(e) ? e : Ai(en(e));
}
function pr(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = Ai(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), a = Le(n), s = o ? [a].concat(a.visualViewport || [], co(n) ? n : []) : n, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(pr(en(s)))
  );
}
function Ln(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Yp(e, t) {
  var r = zt(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function ga(e, t, r) {
  return t === Si ? Ln(Xp(e, r)) : Nt(t) ? Yp(t, r) : Ln(qp(dt(e)));
}
function Gp(e) {
  var t = pr(en(e)), r = ["absolute", "fixed"].indexOf(at(e).position) >= 0, n = r && ze(e) ? xr(e) : e;
  return Nt(n) ? t.filter(function(o) {
    return Nt(o) && $i(o, n) && Je(o) !== "body";
  }) : [];
}
function Kp(e, t, r, n) {
  var o = t === "clippingParents" ? Gp(e) : [].concat(t), a = [].concat(o, [r]), s = a[0], l = a.reduce(function(c, p) {
    var u = ga(e, p, n);
    return c.top = xt(u.top, c.top), c.right = Wr(u.right, c.right), c.bottom = Wr(u.bottom, c.bottom), c.left = xt(u.left, c.left), c;
  }, ga(e, s, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Di(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? Ge(n) : null, a = n ? Ut(n) : null, s = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, c;
  switch (o) {
    case _e:
      c = {
        x: s,
        y: t.y - r.height
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
  var p = o ? io(o) : null;
  if (p != null) {
    var u = p === "y" ? "height" : "width";
    switch (a) {
      case Vt:
        c[p] = c[p] - (t[u] / 2 - r[u] / 2);
        break;
      case mr:
        c[p] = c[p] + (t[u] / 2 - r[u] / 2);
        break;
    }
  }
  return c;
}
function gr(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, a = r.strategy, s = a === void 0 ? e.strategy : a, l = r.boundary, c = l === void 0 ? gp : l, p = r.rootBoundary, u = p === void 0 ? Si : p, h = r.elementContext, f = h === void 0 ? Qt : h, b = r.altBoundary, y = b === void 0 ? !1 : b, v = r.padding, m = v === void 0 ? 0 : v, x = Mi(typeof m != "number" ? m : Ii(m, wr)), I = f === Qt ? bp : Qt, w = e.rects.popper, E = e.elements[y ? I : f], g = Kp(Nt(E) ? E : E.contextElement || dt(e.elements.popper), c, u, s), O = zt(e.elements.reference), S = Di({
    reference: O,
    element: w,
    strategy: "absolute",
    placement: o
  }), L = Ln(Object.assign({}, w, S)), D = f === Qt ? L : O, V = {
    top: g.top - D.top + x.top,
    bottom: D.bottom - g.bottom + x.bottom,
    left: g.left - D.left + x.left,
    right: D.right - g.right + x.right
  }, C = e.modifiersData.offset;
  if (f === Qt && C) {
    var _ = C[o];
    Object.keys(V).forEach(function(M) {
      var B = [We, He].indexOf(M) >= 0 ? 1 : -1, z = [_e, He].indexOf(M) >= 0 ? "y" : "x";
      V[M] += _[z] * B;
    });
  }
  return V;
}
function Jp(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, a = r.rootBoundary, s = r.padding, l = r.flipVariations, c = r.allowedAutoPlacements, p = c === void 0 ? Pi : c, u = Ut(n), h = u ? l ? da : da.filter(function(y) {
    return Ut(y) === u;
  }) : wr, f = h.filter(function(y) {
    return p.indexOf(y) >= 0;
  });
  f.length === 0 && (f = h);
  var b = f.reduce(function(y, v) {
    return y[v] = gr(e, {
      placement: v,
      boundary: o,
      rootBoundary: a,
      padding: s
    })[Ge(v)], y;
  }, {});
  return Object.keys(b).sort(function(y, v) {
    return b[y] - b[v];
  });
}
function Zp(e) {
  if (Ge(e) === no)
    return [];
  var t = Ar(e);
  return [ma(e), t, ma(t)];
}
function Qp(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, a = o === void 0 ? !0 : o, s = r.altAxis, l = s === void 0 ? !0 : s, c = r.fallbackPlacements, p = r.padding, u = r.boundary, h = r.rootBoundary, f = r.altBoundary, b = r.flipVariations, y = b === void 0 ? !0 : b, v = r.allowedAutoPlacements, m = t.options.placement, x = Ge(m), I = x === m, w = c || (I || !y ? [Ar(m)] : Zp(m)), E = [m].concat(w).reduce(function(H, W) {
      return H.concat(Ge(W) === no ? Jp(t, {
        placement: W,
        boundary: u,
        rootBoundary: h,
        padding: p,
        flipVariations: y,
        allowedAutoPlacements: v
      }) : W);
    }, []), g = t.rects.reference, O = t.rects.popper, S = /* @__PURE__ */ new Map(), L = !0, D = E[0], V = 0; V < E.length; V++) {
      var C = E[V], _ = Ge(C), M = Ut(C) === Vt, B = [_e, He].indexOf(_) >= 0, z = B ? "width" : "height", P = gr(t, {
        placement: C,
        boundary: u,
        rootBoundary: h,
        altBoundary: f,
        padding: p
      }), j = B ? M ? We : Me : M ? He : _e;
      g[z] > O[z] && (j = Ar(j));
      var te = Ar(j), Q = [];
      if (a && Q.push(P[_] <= 0), l && Q.push(P[j] <= 0, P[te] <= 0), Q.every(function(H) {
        return H;
      })) {
        D = C, L = !1;
        break;
      }
      S.set(C, Q);
    }
    if (L)
      for (var k = y ? 3 : 1, R = function(W) {
        var Y = E.find(function(K) {
          var X = S.get(K);
          if (X)
            return X.slice(0, W).every(function(Z) {
              return Z;
            });
        });
        if (Y)
          return D = Y, "break";
      }, F = k; F > 0; F--) {
        var q = R(F);
        if (q === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[n]._skip = !0, t.placement = D, t.reset = !0);
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
function ba(e, t, r) {
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
function va(e) {
  return [_e, We, He, Me].some(function(t) {
    return e[t] >= 0;
  });
}
function tu(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, s = gr(t, {
    elementContext: "reference"
  }), l = gr(t, {
    altBoundary: !0
  }), c = ba(s, n), p = ba(l, o, a), u = va(c), h = va(p);
  t.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: p,
    isReferenceHidden: u,
    hasPopperEscaped: h
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": h
  });
}
const ru = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: tu
};
function nu(e, t, r) {
  var n = Ge(e), o = [Me, _e].indexOf(n) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, s = a[0], l = a[1];
  return s = s || 0, l = (l || 0) * o, [Me, We].indexOf(n) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function ou(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, a = o === void 0 ? [0, 0] : o, s = Pi.reduce(function(u, h) {
    return u[h] = nu(h, t.rects, a), u;
  }, {}), l = s[t.placement], c = l.x, p = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += p), t.modifiersData[n] = s;
}
const au = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ou
};
function iu(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = Di({
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
  fn: iu,
  data: {}
};
function lu(e) {
  return e === "x" ? "y" : "x";
}
function cu(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, a = o === void 0 ? !0 : o, s = r.altAxis, l = s === void 0 ? !1 : s, c = r.boundary, p = r.rootBoundary, u = r.altBoundary, h = r.padding, f = r.tether, b = f === void 0 ? !0 : f, y = r.tetherOffset, v = y === void 0 ? 0 : y, m = gr(t, {
    boundary: c,
    rootBoundary: p,
    padding: h,
    altBoundary: u
  }), x = Ge(t.placement), I = Ut(t.placement), w = !I, E = io(x), g = lu(E), O = t.modifiersData.popperOffsets, S = t.rects.reference, L = t.rects.popper, D = typeof v == "function" ? v(Object.assign({}, t.rects, {
    placement: t.placement
  })) : v, V = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), C = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, _ = {
    x: 0,
    y: 0
  };
  if (O) {
    if (a) {
      var M, B = E === "y" ? _e : Me, z = E === "y" ? He : We, P = E === "y" ? "height" : "width", j = O[E], te = j + m[B], Q = j - m[z], k = b ? -L[P] / 2 : 0, R = I === Vt ? S[P] : L[P], F = I === Vt ? -L[P] : -S[P], q = t.elements.arrow, H = b && q ? ao(q) : {
        width: 0,
        height: 0
      }, W = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : _i(), Y = W[B], K = W[z], X = cr(0, S[P], H[P]), Z = w ? S[P] / 2 - k - X - Y - V.mainAxis : R - X - Y - V.mainAxis, ee = w ? -S[P] / 2 + k + X + K + V.mainAxis : F + X + K + V.mainAxis, ae = t.elements.arrow && xr(t.elements.arrow), A = ae ? E === "y" ? ae.clientTop || 0 : ae.clientLeft || 0 : 0, re = (M = C == null ? void 0 : C[E]) != null ? M : 0, $ = j + Z - re - A, ie = j + ee - re, Ee = cr(b ? Wr(te, $) : te, j, b ? xt(Q, ie) : Q);
      O[E] = Ee, _[E] = Ee - j;
    }
    if (l) {
      var Se, we = E === "x" ? _e : Me, ht = E === "x" ? He : We, Pe = O[g], Qe = g === "y" ? "height" : "width", Ae = Pe + m[we], et = Pe - m[ht], Te = [_e, Me].indexOf(x) !== -1, Ct = (Se = C == null ? void 0 : C[g]) != null ? Se : 0, mt = Te ? Ae : Pe - S[Qe] - L[Qe] - Ct + V.altAxis, Xt = Te ? Pe + S[Qe] + L[Qe] - Ct - V.altAxis : et, Nr = b && Te ? Mp(mt, Pe, Xt) : cr(b ? mt : Ae, Pe, b ? Xt : et);
      O[g] = Nr, _[g] = Nr - Pe;
    }
    t.modifiersData[n] = _;
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
  var t = e.getBoundingClientRect(), r = Ft(t.width) / e.offsetWidth || 1, n = Ft(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function hu(e, t, r) {
  r === void 0 && (r = !1);
  var n = ze(t), o = ze(t) && fu(t), a = dt(t), s = zt(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((Je(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  co(a)) && (l = du(t)), ze(t) ? (c = zt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = lo(a))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function mu(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function o(a) {
    r.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function(l) {
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
function gu(e) {
  var t = mu(e);
  return Cp.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function bu(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function vu(e) {
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
var ya = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function wa() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function yu(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, o = t.defaultOptions, a = o === void 0 ? ya : o;
  return function(l, c, p) {
    p === void 0 && (p = a);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ya, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, h = [], f = !1, b = {
      state: u,
      setOptions: function(x) {
        var I = typeof x == "function" ? x(u.options) : x;
        v(), u.options = Object.assign({}, a, u.options, I), u.scrollParents = {
          reference: Nt(l) ? pr(l) : l.contextElement ? pr(l.contextElement) : [],
          popper: pr(c)
        };
        var w = gu(vu([].concat(n, u.options.modifiers)));
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
        if (!f) {
          var x = u.elements, I = x.reference, w = x.popper;
          if (wa(I, w)) {
            u.rects = {
              reference: hu(I, xr(w), u.options.strategy === "fixed"),
              popper: ao(w)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(V) {
              return u.modifiersData[V.name] = Object.assign({}, V.data);
            });
            for (var E = 0; E < u.orderedModifiers.length; E++) {
              if (u.reset === !0) {
                u.reset = !1, E = -1;
                continue;
              }
              var g = u.orderedModifiers[E], O = g.fn, S = g.options, L = S === void 0 ? {} : S, D = g.name;
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
      update: bu(function() {
        return new Promise(function(m) {
          b.forceUpdate(), m(u);
        });
      }),
      destroy: function() {
        v(), f = !0;
      }
    };
    if (!wa(l, c))
      return b;
    b.setOptions(p).then(function(m) {
      !f && p.onFirstUpdate && p.onFirstUpdate(m);
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
var wu = [Up, su, Fp, Rp, au, eu, pu, jp, ru], xu = /* @__PURE__ */ yu({
  defaultModifiers: wu
});
const ji = "Popper";
function Eu(e) {
  return Ci(ji, e);
}
Qc(ji, ["root"]);
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
function Xr(e) {
  return typeof e == "function" ? e() : e;
}
function tn(e) {
  return e.nodeType !== void 0;
}
function Ou(e) {
  return !tn(e);
}
const Cu = () => st({
  root: ["root"]
}, qc(Eu)), Su = {}, Pu = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n;
  const {
    anchorEl: o,
    children: a,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: p,
    placement: u,
    popperOptions: h,
    popperRef: f,
    slotProps: b = {},
    slots: y = {},
    TransitionProps: v
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, m = fe(t, Tu), x = T.useRef(null), I = Ue(x, r), w = T.useRef(null), E = Ue(w, f), g = T.useRef(E);
  Tt(() => {
    g.current = E;
  }, [E]), T.useImperativeHandle(f, () => w.current, []);
  const O = Nu(u, s), [S, L] = T.useState(O), [D, V] = T.useState(Xr(o));
  T.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), T.useEffect(() => {
    o && V(Xr(o));
  }, [o]), Tt(() => {
    if (!D || !p)
      return;
    const z = (te) => {
      L(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && tn(D) && D.nodeType === 1) {
      const te = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && te.top === 0 && te.left === 0 && te.right === 0 && te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: te
      }) => {
        z(te);
      }
    }];
    c != null && (P = P.concat(c)), h && h.modifiers != null && (P = P.concat(h.modifiers));
    const j = xu(D, x.current, N({
      placement: O
    }, h, {
      modifiers: P
    }));
    return g.current(j), () => {
      j.destroy(), g.current(null);
    };
  }, [D, l, c, p, h, O]);
  const C = {
    placement: S
  };
  v !== null && (C.TransitionProps = v);
  const _ = Cu(), M = (n = y.root) != null ? n : "div", B = kt({
    elementType: M,
    externalSlotProps: b.root,
    externalForwardedProps: m,
    additionalProps: {
      role: "tooltip",
      ref: I
    },
    ownerState: t,
    className: _.root
  });
  return /* @__PURE__ */ d(M, N({}, B, {
    children: typeof a == "function" ? a(C) : a
  }));
}), Bi = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    anchorEl: n,
    children: o,
    container: a,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: p,
    open: u,
    placement: h = "bottom",
    popperOptions: f = Su,
    popperRef: b,
    style: y,
    transition: v = !1,
    slotProps: m = {},
    slots: x = {}
  } = t, I = fe(t, ku), [w, E] = T.useState(!0), g = () => {
    E(!1);
  }, O = () => {
    E(!0);
  };
  if (!c && !u && (!v || w))
    return null;
  let S;
  if (a)
    S = a;
  else if (n) {
    const V = Xr(n);
    S = V && tn(V) ? Oe(V).body : Oe(null).body;
  }
  const L = !u && c && (!v || w) ? "none" : void 0, D = v ? {
    in: u,
    onEnter: g,
    onExited: O
  } : void 0;
  return /* @__PURE__ */ d(hr, {
    disablePortal: l,
    container: S,
    children: /* @__PURE__ */ d(Pu, N({
      anchorEl: n,
      direction: s,
      disablePortal: l,
      modifiers: p,
      ref: r,
      open: v ? !w : u,
      placement: h,
      popperOptions: f,
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
process.env.NODE_ENV !== "production" && (Bi.propTypes = {
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
  anchorEl: Wt(i.oneOfType([ot, i.object, i.func]), (e) => {
    if (e.open) {
      const t = Xr(e.anchorEl);
      if (t && tn(t) && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
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
  children: i.oneOfType([i.node, i.func]),
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
  container: i.oneOfType([ot, i.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: i.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: i.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: i.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: i.arrayOf(i.shape({
    data: i.object,
    effect: i.func,
    enabled: i.bool,
    fn: i.func,
    name: i.any,
    options: i.object,
    phase: i.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: i.arrayOf(i.string),
    requiresIfExists: i.arrayOf(i.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: i.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: i.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: i.shape({
    modifiers: i.array,
    onFirstUpdate: i.func,
    placement: i.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: i.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: ro,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: i.shape({
    root: i.oneOfType([i.func, i.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: i.shape({
    root: i.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: i.bool
});
const Ru = ["values", "unit", "step"], $u = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => N({}, r, {
    [n.key]: n.val
  }), {});
};
function _u(e) {
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
  } = e, o = fe(e, Ru), a = $u(t), s = Object.keys(a);
  function l(f) {
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${r})`;
  }
  function c(f) {
    return `@media (max-width:${(typeof t[f] == "number" ? t[f] : f) - n / 100}${r})`;
  }
  function p(f, b) {
    const y = s.indexOf(b);
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${r}) and (max-width:${(y !== -1 && typeof t[s[y]] == "number" ? t[s[y]] : b) - n / 100}${r})`;
  }
  function u(f) {
    return s.indexOf(f) + 1 < s.length ? p(f, s[s.indexOf(f) + 1]) : l(f);
  }
  function h(f) {
    const b = s.indexOf(f);
    return b === 0 ? l(s[1]) : b === s.length - 1 ? c(s[b]) : p(f, s[s.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  return N({
    keys: s,
    values: a,
    up: l,
    down: c,
    between: p,
    only: u,
    not: h,
    unit: r
  }, o);
}
const Mu = {
  borderRadius: 4
}, Iu = Mu, Au = process.env.NODE_ENV !== "production" ? i.oneOfType([i.number, i.string, i.object, i.array]) : {}, ft = Au;
function ur(e, t) {
  return t ? nt(e, t, {
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
}, xa = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${po[e]}px)`
};
function it(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const a = n.breakpoints || xa;
    return t.reduce((s, l, c) => (s[a.up(a.keys[c])] = r(t[c]), s), {});
  }
  if (typeof t == "object") {
    const a = n.breakpoints || xa;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || po).indexOf(l) !== -1) {
        const c = a.up(l);
        s[c] = r(t[l], l);
      } else {
        const c = l;
        s[c] = t[c];
      }
      return s;
    }, {});
  }
  return r(t);
}
function Du(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function ju(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function rn(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (n != null)
      return n;
  }
  return t.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function qr(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = rn(e, r) || n, t && (o = t(o, n, e)), o;
}
function xe(e) {
  const {
    prop: t,
    cssProperty: r = e.prop,
    themeKey: n,
    transform: o
  } = e, a = (s) => {
    if (s[t] == null)
      return null;
    const l = s[t], c = s.theme, p = rn(c, n) || {};
    return it(s, l, (h) => {
      let f = qr(p, o, h);
      return h === f && typeof h == "string" && (f = qr(p, o, `${t}${h === "default" ? "" : Ke(h)}`, h)), r === !1 ? f : {
        [r]: f
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: ft
  } : {}, a.filterProps = [t], a;
}
function Bu(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
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
}, Ea = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Fu = Bu((e) => {
  if (e.length > 2)
    if (Ea[e])
      e = Ea[e];
    else
      return [e];
  const [t, r] = e.split(""), n = Lu[t], o = Vu[r] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), nn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], on = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], zu = [...nn, ...on];
function Er(e, t, r, n) {
  var o;
  const a = (o = rn(e, t, !1)) != null ? o : r;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Li(e) {
  return Er(e, "spacing", 8, "spacing");
}
function Tr(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function Uu(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = Tr(t, r), n), {});
}
function Hu(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = Fu(r), a = Uu(o, n), s = e[r];
  return it(e, s, a);
}
function Vi(e, t) {
  const r = Li(e.theme);
  return Object.keys(e).map((n) => Hu(e, t, n, r)).reduce(ur, {});
}
function be(e) {
  return Vi(e, nn);
}
be.propTypes = process.env.NODE_ENV !== "production" ? nn.reduce((e, t) => (e[t] = ft, e), {}) : {};
be.filterProps = nn;
function ve(e) {
  return Vi(e, on);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? on.reduce((e, t) => (e[t] = ft, e), {}) : {};
ve.filterProps = on;
process.env.NODE_ENV !== "production" && zu.reduce((e, t) => (e[t] = ft, e), {});
function Wu(e = 8) {
  if (e.mui)
    return e;
  const t = Li({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const s = t(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return r.mui = !0, r;
}
function an(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((a) => {
    n[a] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, a) => t[a] ? ur(o, t[a](n)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), r;
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
const Xu = Xe("border", Fe), qu = Xe("borderTop", Fe), Yu = Xe("borderRight", Fe), Gu = Xe("borderBottom", Fe), Ku = Xe("borderLeft", Fe), Ju = Xe("borderColor"), Zu = Xe("borderTopColor"), Qu = Xe("borderRightColor"), ed = Xe("borderBottomColor"), td = Xe("borderLeftColor"), rd = Xe("outline", Fe), nd = Xe("outlineColor"), sn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Er(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: Tr(t, n)
    });
    return it(e, e.borderRadius, r);
  }
  return null;
};
sn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ft
} : {};
sn.filterProps = ["borderRadius"];
an(Xu, qu, Yu, Gu, Ku, Ju, Zu, Qu, ed, td, sn, rd, nd);
const ln = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Er(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: Tr(t, n)
    });
    return it(e, e.gap, r);
  }
  return null;
};
ln.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ft
} : {};
ln.filterProps = ["gap"];
const cn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Er(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: Tr(t, n)
    });
    return it(e, e.columnGap, r);
  }
  return null;
};
cn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ft
} : {};
cn.filterProps = ["columnGap"];
const pn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Er(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: Tr(t, n)
    });
    return it(e, e.rowGap, r);
  }
  return null;
};
pn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ft
} : {};
pn.filterProps = ["rowGap"];
const od = xe({
  prop: "gridColumn"
}), ad = xe({
  prop: "gridRow"
}), id = xe({
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
an(ln, cn, pn, od, ad, id, sd, ld, cd, pd, ud, dd);
function jt(e, t) {
  return t === "grey" ? t : e;
}
const fd = xe({
  prop: "color",
  themeKey: "palette",
  transform: jt
}), hd = xe({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: jt
}), md = xe({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: jt
});
an(fd, hd, md);
function Be(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const gd = xe({
  prop: "width",
  transform: Be
}), uo = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      var n, o;
      const a = ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[r]) || po[r];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Be(r)
      };
    };
    return it(e, e.maxWidth, t);
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
an(gd, uo, bd, vd, yd, wd, xd);
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
    style: sn
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
    style: ln
  },
  rowGap: {
    style: pn
  },
  columnGap: {
    style: cn
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
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function kd(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Nd() {
  function e(r, n, o, a) {
    const s = {
      [r]: n,
      theme: o
    }, l = a[r];
    if (!l)
      return {
        [r]: n
      };
    const {
      cssProperty: c = r,
      themeKey: p,
      transform: u,
      style: h
    } = l;
    if (n == null)
      return null;
    if (p === "typography" && n === "inherit")
      return {
        [r]: n
      };
    const f = rn(o, p) || {};
    return h ? h(s) : it(s, n, (y) => {
      let v = qr(f, u, y);
      return y === v && typeof y == "string" && (v = qr(f, u, `${r}${y === "default" ? "" : Ke(y)}`, y)), c === !1 ? v : {
        [c]: v
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
    const s = (n = a.unstable_sxConfig) != null ? n : fo;
    function l(c) {
      let p = c;
      if (typeof c == "function")
        p = c(a);
      else if (typeof c != "object")
        return c;
      if (!p)
        return null;
      const u = Du(a.breakpoints), h = Object.keys(u);
      let f = u;
      return Object.keys(p).forEach((b) => {
        const y = kd(p[b], a);
        if (y != null)
          if (typeof y == "object")
            if (s[b])
              f = ur(f, e(b, y, a, s));
            else {
              const v = it({
                theme: a
              }, y, (m) => ({
                [b]: m
              }));
              Td(v, y) ? f[b] = t({
                sx: y,
                theme: a
              }) : f = ur(f, v);
            }
          else
            f = ur(f, e(b, y, a, s));
      }), ju(h, f);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Fi = Nd();
Fi.filterProps = ["sx"];
const ho = Fi;
function Od(e, t) {
  const r = this;
  return r.vars && typeof r.getColorSchemeSelector == "function" ? {
    [r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : r.palette.mode === e ? t : {};
}
const Cd = ["breakpoints", "palette", "spacing", "shape"];
function mo(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, s = fe(e, Cd), l = _u(r), c = Wu(o);
  let p = nt({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: N({
      mode: "light"
    }, n),
    spacing: c,
    shape: N({}, Iu, a)
  }, s);
  return p.applyStyles = Od, p = t.reduce((u, h) => nt(u, h), p), p.unstable_sxConfig = N({}, fo, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(h) {
    return ho({
      sx: h,
      theme: this
    });
  }, p;
}
function Sd(e) {
  return Object.keys(e).length === 0;
}
function zi(e = null) {
  const t = T.useContext(hl);
  return !t || Sd(t) ? e : t;
}
const Pd = mo();
function Ui(e = Pd) {
  return zi(e);
}
const Rd = ["ownerState"], $d = ["variants"], _d = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Md(e) {
  return Object.keys(e).length === 0;
}
function Id(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Dr(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Ad = mo(), Ta = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function $r({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return Md(t) ? e : t[r] || t;
}
function Dd(e) {
  return e ? (t, r) => r[e] : null;
}
function jr(e, t) {
  let {
    ownerState: r
  } = t, n = fe(t, Rd);
  const o = typeof e == "function" ? e(N({
    ownerState: r
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => jr(a, N({
      ownerState: r
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = fe(o, $d);
    return a.forEach((c) => {
      let p = !0;
      typeof c.props == "function" ? p = c.props(N({
        ownerState: r
      }, n, r)) : Object.keys(c.props).forEach((u) => {
        (r == null ? void 0 : r[u]) !== c.props[u] && n[u] !== c.props[u] && (p = !1);
      }), p && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(N({
        ownerState: r
      }, n, r)) : c.style));
    }), l;
  }
  return o;
}
function jd(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = Ad,
    rootShouldForwardProp: n = Dr,
    slotShouldForwardProp: o = Dr
  } = e, a = (s) => ho(N({}, s, {
    theme: $r(N({}, s, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (s, l = {}) => {
    ml(s, (g) => g.filter((O) => !(O != null && O.__mui_systemSx)));
    const {
      name: c,
      slot: p,
      skipVariantsResolver: u,
      skipSx: h,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = Dd(Ta(p))
    } = l, b = fe(l, _d), y = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      p && p !== "Root" && p !== "root" || !1
    ), v = h || !1;
    let m;
    process.env.NODE_ENV !== "production" && c && (m = `${c}-${Ta(p || "Root")}`);
    let x = Dr;
    p === "Root" || p === "root" ? x = n : p ? x = o : Id(s) && (x = void 0);
    const I = fl(s, N({
      shouldForwardProp: x,
      label: m
    }, b)), w = (g) => typeof g == "function" && g.__emotion_real !== g || yt(g) ? (O) => jr(g, N({}, O, {
      theme: $r({
        theme: O.theme,
        defaultTheme: r,
        themeId: t
      })
    })) : g, E = (g, ...O) => {
      let S = w(g);
      const L = O ? O.map(w) : [];
      c && f && L.push((C) => {
        const _ = $r(N({}, C, {
          defaultTheme: r,
          themeId: t
        }));
        if (!_.components || !_.components[c] || !_.components[c].styleOverrides)
          return null;
        const M = _.components[c].styleOverrides, B = {};
        return Object.entries(M).forEach(([z, P]) => {
          B[z] = jr(P, N({}, C, {
            theme: _
          }));
        }), f(C, B);
      }), c && !y && L.push((C) => {
        var _;
        const M = $r(N({}, C, {
          defaultTheme: r,
          themeId: t
        })), B = M == null || (_ = M.components) == null || (_ = _[c]) == null ? void 0 : _.variants;
        return jr({
          variants: B
        }, N({}, C, {
          theme: M
        }));
      }), v || L.push(a);
      const D = L.length - O.length;
      if (Array.isArray(g) && D > 0) {
        const C = new Array(D).fill("");
        S = [...g, ...C], S.raw = [...g.raw, ...C];
      }
      const V = I(S, ...L);
      if (process.env.NODE_ENV !== "production") {
        let C;
        c && (C = `${c}${Ke(p || "")}`), C === void 0 && (C = `Styled(${xc(s)})`), V.displayName = C;
      }
      return s.muiName && (V.muiName = s.muiName), V;
    };
    return I.withConfig && (E.withConfig = I.withConfig), E;
  };
}
function Bd(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : xi(t.components[r].defaultProps, n);
}
function Ld({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = Ui(r);
  return n && (o = o[n] || o), Bd({
    theme: o,
    name: t,
    props: e
  });
}
function go(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), Hc(e, t, r);
}
function Vd(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ot(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Ot(Vd(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Bt(9, e));
  let n = e.substring(t + 1, e.length - 1), o;
  if (r === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Bt(10, o));
  } else
    n = n.split(",");
  return n = n.map((a) => parseFloat(a)), {
    type: r,
    values: n,
    colorSpace: o
  };
}
function un(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function Fd(e) {
  e = Ot(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, a = n * Math.min(o, 1 - o), s = (p, u = (p + r / 30) % 12) => o - a * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), un({
    type: l,
    values: c
  });
}
function ka(e) {
  e = Ot(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Ot(Fd(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Na(e, t) {
  const r = ka(e), n = ka(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function Yr(e, t) {
  return e = Ot(e), t = go(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, un(e);
}
function zd(e, t) {
  if (e = Ot(e), t = go(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return un(e);
}
function Ud(e, t) {
  if (e = Ot(e), t = go(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return un(e);
}
function Hd(e, t) {
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
const Wd = {
  black: "#000",
  white: "#fff"
}, br = Wd, Xd = {
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
}, St = Yd, Gd = {
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
}, er = Kd, Jd = {
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
}, _t = Qd, ef = ["mode", "contrastThreshold", "tonalOffset"], Oa = {
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
    paper: br.white,
    default: br.white
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
}, Nn = {
  text: {
    primary: br.white,
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
    active: br.white,
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
function Ca(e, t, r, n) {
  const o = n.light || n, a = n.dark || n * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = Ud(e.main, o) : t === "dark" && (e.dark = zd(e.main, a)));
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
function rf(e = "light") {
  return e === "dark" ? {
    main: St[200],
    light: St[50],
    dark: St[400]
  } : {
    main: St[500],
    light: St[300],
    dark: St[700]
  };
}
function nf(e = "light") {
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
    main: _t[400],
    light: _t[300],
    dark: _t[700]
  } : {
    main: _t[800],
    light: _t[500],
    dark: _t[900]
  };
}
function sf(e = "light") {
  return e === "dark" ? {
    main: er[400],
    light: er[300],
    dark: er[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: er[500],
    dark: er[900]
  };
}
function lf(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = fe(e, ef), a = e.primary || tf(t), s = e.secondary || rf(t), l = e.error || nf(t), c = e.info || of(t), p = e.success || af(t), u = e.warning || sf(t);
  function h(v) {
    const m = Na(v, Nn.text.primary) >= r ? Nn.text.primary : Oa.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const x = Na(v, m);
      x < 3 && console.error([`MUI: The contrast ratio of ${x}:1 for ${m} on ${v}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return m;
  }
  const f = ({
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
    return Ca(v, "light", I, n), Ca(v, "dark", w, n), v.contrastText || (v.contrastText = h(v.main)), v;
  }, b = {
    dark: Nn,
    light: Oa
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), nt(N({
    // A collection of common colors.
    common: N({}, br),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: f({
      color: a,
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
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: h,
    // Generate a rich color object.
    augmentColor: f,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: n
  }, b[t]), o);
}
const cf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function pf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Sa = {
  textTransform: "uppercase"
}, Pa = '"Roboto", "Helvetica", "Arial", sans-serif';
function uf(e, t) {
  const r = typeof t == "function" ? t(e) : t, {
    fontFamily: n = Pa,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: p = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: h
  } = r, f = fe(r, cf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof p != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, y = h || ((x) => `${x / p * b}rem`), v = (x, I, w, E, g) => N({
    fontFamily: n,
    fontWeight: x,
    fontSize: y(I),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, n === Pa ? {
    letterSpacing: `${pf(E / I)}em`
  } : {}, g, u), m = {
    h1: v(a, 96, 1.167, -1.5),
    h2: v(a, 60, 1.2, -0.5),
    h3: v(s, 48, 1.167, 0),
    h4: v(s, 34, 1.235, 0.25),
    h5: v(s, 24, 1.334, 0),
    h6: v(l, 20, 1.6, 0.15),
    subtitle1: v(s, 16, 1.75, 0.15),
    subtitle2: v(l, 14, 1.57, 0.1),
    body1: v(s, 16, 1.5, 0.15),
    body2: v(s, 14, 1.43, 0.15),
    button: v(l, 14, 1.75, 0.4, Sa),
    caption: v(s, 12, 1.66, 0.4),
    overline: v(s, 12, 2.66, 1, Sa),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return nt(N({
    htmlFontSize: p,
    pxToRem: y,
    fontFamily: n,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, m), f, {
    clone: !1
    // No need to clone deep
  });
}
const df = 0.2, ff = 0.14, hf = 0.12;
function ge(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${df})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ff})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${hf})`].join(",");
}
const mf = ["none", ge(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ge(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ge(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ge(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ge(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ge(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ge(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ge(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ge(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ge(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ge(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ge(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ge(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ge(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ge(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ge(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ge(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ge(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ge(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ge(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ge(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ge(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ge(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ge(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], gf = mf, bf = ["duration", "easing", "delay"], vf = {
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
function Ra(e) {
  return `${Math.round(e)}ms`;
}
function wf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function xf(e) {
  const t = N({}, vf, e.easing), r = N({}, yf, e.duration);
  return N({
    getAutoHeightDuration: wf,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, p = fe(a, bf);
      if (process.env.NODE_ENV !== "production") {
        const u = (f) => typeof f == "string", h = (f) => !isNaN(parseFloat(f));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !h(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !h(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(p).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : Ra(s)} ${l} ${typeof c == "string" ? c : Ra(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: r
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
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, s = fe(e, kf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Bt(18));
  const l = lf(n), c = mo(e);
  let p = nt(c, {
    mixins: Hd(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: gf.slice(),
    typography: uf(l, a),
    transitions: xf(o),
    zIndex: N({}, Tf)
  });
  if (p = nt(p, s), p = t.reduce((u, h) => nt(u, h), p), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], h = (f, b) => {
      let y;
      for (y in f) {
        const v = f[y];
        if (u.indexOf(y) !== -1 && Object.keys(v).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const m = Ze("", y);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${m}' syntax:`, JSON.stringify({
              root: {
                [`&.${m}`]: v
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
      b && f.indexOf("Mui") === 0 && h(b, f);
    });
  }
  return p.unstable_sxConfig = N({}, fo, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(h) {
    return ho({
      sx: h,
      theme: this
    });
  }, p;
}
const Of = Nf(), bo = Of, vo = "$$material", Hi = (e) => Dr(e) && e !== "classes", Cf = jd({
  themeId: vo,
  defaultTheme: bo,
  rootShouldForwardProp: Hi
}), Ce = Cf;
function kr() {
  const e = Ui(bo);
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
function Vn(e, t) {
  return Vn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, Vn(e, t);
}
function Sf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Vn(e, t);
}
const $a = {
  disabled: !1
};
var Pf = process.env.NODE_ENV !== "production" ? i.oneOfType([i.number, i.shape({
  enter: i.number,
  exit: i.number,
  appear: i.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && i.oneOfType([i.string, i.shape({
  enter: i.string,
  exit: i.string,
  active: i.string
}), i.shape({
  enter: i.string,
  enterDone: i.string,
  enterActive: i.string,
  exit: i.string,
  exitDone: i.string,
  exitActive: i.string
})]);
const Wi = J.createContext(null);
var Rf = function(t) {
  return t.scrollTop;
}, ir = "unmounted", bt = "exited", vt = "entering", At = "entered", Fn = "exiting", ct = /* @__PURE__ */ function(e) {
  Sf(t, e);
  function t(n, o) {
    var a;
    a = e.call(this, n, o) || this;
    var s = o, l = s && !s.isMounting ? n.enter : n.appear, c;
    return a.appearStatus = null, n.in ? l ? (c = bt, a.appearStatus = vt) : c = At : n.unmountOnExit || n.mountOnEnter ? c = ir : c = bt, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var s = o.in;
    return s && a.status === ir ? {
      status: bt
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== vt && s !== At && (a = vt) : (s === vt || s === At) && (a = Fn);
    }
    this.updateStatus(!1, a);
  }, r.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, r.getTimeouts = function() {
    var o = this.props.timeout, a, s, l;
    return a = s = l = o, o != null && typeof o != "number" && (a = o.exit, s = o.enter, l = o.appear !== void 0 ? o.appear : s), {
      exit: a,
      enter: s,
      appear: l
    };
  }, r.updateStatus = function(o, a) {
    if (o === void 0 && (o = !1), a !== null)
      if (this.cancelNextCallback(), a === vt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Sr.findDOMNode(this);
          s && Rf(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === bt && this.setState({
        status: ir
      });
  }, r.performEnter = function(o) {
    var a = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Sr.findDOMNode(this), l], p = c[0], u = c[1], h = this.getTimeouts(), f = l ? h.appear : h.enter;
    if (!o && !s || $a.disabled) {
      this.safeSetState({
        status: At
      }, function() {
        a.props.onEntered(p);
      });
      return;
    }
    this.props.onEnter(p, u), this.safeSetState({
      status: vt
    }, function() {
      a.props.onEntering(p, u), a.onTransitionEnd(f, function() {
        a.safeSetState({
          status: At
        }, function() {
          a.props.onEntered(p, u);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, a = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Sr.findDOMNode(this);
    if (!a || $a.disabled) {
      this.safeSetState({
        status: bt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Fn
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: bt
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
    var a = this, s = !0;
    return this.nextCallback = function(l) {
      s && (s = !1, a.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      s = !1;
    }, this.nextCallback;
  }, r.onTransitionEnd = function(o, a) {
    this.setNextCallback(a);
    var s = this.props.nodeRef ? this.props.nodeRef.current : Sr.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!s || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], p = c[0], u = c[1];
      this.props.addEndListener(p, u);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, r.render = function() {
    var o = this.state.status;
    if (o === ir)
      return null;
    var a = this.props, s = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = fe(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ J.createElement(Wi.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : J.cloneElement(J.Children.only(s), l))
    );
  }, t;
}(J.Component);
ct.contextType = Wi;
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
  nodeRef: i.shape({
    current: typeof Element > "u" ? i.any : function(e, t, r, n, o, a) {
      var s = e[t];
      return i.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(e, t, r, n, o, a);
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
  children: i.oneOfType([i.func.isRequired, i.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: i.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: i.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: i.bool,
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
  appear: i.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: i.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: i.bool,
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
    var r = Pf;
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
  addEndListener: i.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: i.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: i.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: i.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: i.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: i.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: i.func
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
ct.UNMOUNTED = ir;
ct.EXITED = bt;
ct.ENTERING = vt;
ct.ENTERED = At;
ct.EXITING = Fn;
const Xi = ct, qi = (e) => e.scrollTop;
function Gr(e, t) {
  var r, n;
  const {
    timeout: o,
    easing: a,
    style: s = {}
  } = e;
  return {
    duration: (r = s.transitionDuration) != null ? r : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (n = s.transitionTimingFunction) != null ? n : typeof a == "object" ? a[t.mode] : a,
    delay: s.transitionDelay
  };
}
const $f = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function zn(e) {
  return `scale(${e}, ${e ** 2})`;
}
const _f = {
  entering: {
    opacity: 1,
    transform: zn(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, On = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), yo = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    addEndListener: n,
    appear: o = !0,
    children: a,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: p,
    onEntering: u,
    onExit: h,
    onExited: f,
    onExiting: b,
    style: y,
    timeout: v = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: m = Xi
  } = t, x = fe(t, $f), I = or(), w = T.useRef(), E = kr(), g = T.useRef(null), O = Ue(g, a.ref, r), S = (z) => (P) => {
    if (z) {
      const j = g.current;
      P === void 0 ? z(j) : z(j, P);
    }
  }, L = S(u), D = S((z, P) => {
    qi(z);
    const {
      duration: j,
      delay: te,
      easing: Q
    } = Gr({
      style: y,
      timeout: v,
      easing: s
    }, {
      mode: "enter"
    });
    let k;
    v === "auto" ? (k = E.transitions.getAutoHeightDuration(z.clientHeight), w.current = k) : k = j, z.style.transition = [E.transitions.create("opacity", {
      duration: k,
      delay: te
    }), E.transitions.create("transform", {
      duration: On ? k : k * 0.666,
      delay: te,
      easing: Q
    })].join(","), c && c(z, P);
  }), V = S(p), C = S(b), _ = S((z) => {
    const {
      duration: P,
      delay: j,
      easing: te
    } = Gr({
      style: y,
      timeout: v,
      easing: s
    }, {
      mode: "exit"
    });
    let Q;
    v === "auto" ? (Q = E.transitions.getAutoHeightDuration(z.clientHeight), w.current = Q) : Q = P, z.style.transition = [E.transitions.create("opacity", {
      duration: Q,
      delay: j
    }), E.transitions.create("transform", {
      duration: On ? Q : Q * 0.666,
      delay: On ? j : j || Q * 0.333,
      easing: te
    })].join(","), z.style.opacity = 0, z.style.transform = zn(0.75), h && h(z);
  }), M = S(f);
  return /* @__PURE__ */ d(m, N({
    appear: o,
    in: l,
    nodeRef: g,
    onEnter: D,
    onEntered: V,
    onEntering: L,
    onExit: _,
    onExited: M,
    onExiting: C,
    addEndListener: (z) => {
      v === "auto" && I.start(w.current || 0, z), n && n(g.current, z);
    },
    timeout: v === "auto" ? null : v
  }, x, {
    children: (z, P) => /* @__PURE__ */ T.cloneElement(a, N({
      style: N({
        opacity: 0,
        transform: zn(0.75),
        visibility: z === "exited" && !l ? "hidden" : void 0
      }, _f[z], y, a.props.style),
      ref: O
    }, P))
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
  addEndListener: i.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: i.bool,
  /**
   * A single child content element.
   */
  children: vr.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: i.oneOfType([i.shape({
    enter: i.string,
    exit: i.string
  }), i.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: i.bool,
  /**
   * @ignore
   */
  onEnter: i.func,
  /**
   * @ignore
   */
  onEntered: i.func,
  /**
   * @ignore
   */
  onEntering: i.func,
  /**
   * @ignore
   */
  onExit: i.func,
  /**
   * @ignore
   */
  onExited: i.func,
  /**
   * @ignore
   */
  onExiting: i.func,
  /**
   * @ignore
   */
  style: i.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: i.oneOfType([i.oneOf(["auto"]), i.number, i.shape({
    appear: i.number,
    enter: i.number,
    exit: i.number
  })])
});
yo.muiSupportAuto = !0;
const Un = yo, Mf = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, _a = Mf, If = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Af = Ce(Bi, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Yi = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n;
  const o = zi(), a = lt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: p,
    container: u,
    disablePortal: h,
    keepMounted: f,
    modifiers: b,
    open: y,
    placement: v,
    popperOptions: m,
    popperRef: x,
    transition: I,
    slots: w,
    slotProps: E
  } = a, g = fe(a, If), O = (n = w == null ? void 0 : w.root) != null ? n : c == null ? void 0 : c.Root, S = N({
    anchorEl: s,
    container: u,
    disablePortal: h,
    keepMounted: f,
    modifiers: b,
    open: y,
    placement: v,
    popperOptions: m,
    popperRef: x,
    transition: I
  }, g);
  return /* @__PURE__ */ d(Af, N({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: O
    },
    slotProps: E ?? p
  }, S, {
    ref: r
  }));
});
process.env.NODE_ENV !== "production" && (Yi.propTypes = {
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
  anchorEl: i.oneOfType([ot, i.object, i.func]),
  /**
   * Popper render function or node.
   */
  children: i.oneOfType([i.node, i.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: i.shape({
    Root: i.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: i.shape({
    root: i.oneOfType([i.func, i.object])
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
  container: i.oneOfType([ot, i.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: i.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: i.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: i.arrayOf(i.shape({
    data: i.object,
    effect: i.func,
    enabled: i.bool,
    fn: i.func,
    name: i.any,
    options: i.object,
    phase: i.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: i.arrayOf(i.string),
    requiresIfExists: i.arrayOf(i.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: i.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: i.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: i.shape({
    modifiers: i.array,
    onFirstUpdate: i.func,
    placement: i.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: i.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: ro,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: i.shape({
    root: i.oneOfType([i.func, i.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: i.shape({
    root: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: i.bool
});
const Gi = Yi;
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
    disableInteractive: r,
    arrow: n,
    touch: o,
    placement: a
  } = e, s = {
    popper: ["popper", !r && "popperInteractive", n && "popperArrow"],
    tooltip: ["tooltip", n && "tooltipArrow", o && "touch", `tooltipPlacement${Ke(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return st(s, Df, t);
}, Ff = Ce(Gi, {
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
}) => N({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !r && {
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
})), zf = Ce("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.tooltip, r.touch && t.touch, r.arrow && t.tooltipArrow, t[`tooltipPlacement${Ke(r.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => N({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Yr(e.palette.grey[700], 0.92),
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
})), Uf = Ce("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Yr(e.palette.grey[700], 0.9),
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
let _r = !1;
const Ma = new yr();
let tr = {
  x: 0,
  y: 0
};
function Mr(e, t) {
  return (r) => {
    t && t(r), e(r);
  };
}
const Ki = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a, s, l, c, p, u, h, f, b, y, v, m, x, I, w, E, g;
  const O = lt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: S = !1,
    children: L,
    components: D = {},
    componentsProps: V = {},
    describeChild: C = !1,
    disableFocusListener: _ = !1,
    disableHoverListener: M = !1,
    disableInteractive: B = !1,
    disableTouchListener: z = !1,
    enterDelay: P = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: te = 700,
    followCursor: Q = !1,
    id: k,
    leaveDelay: R = 0,
    leaveTouchDelay: F = 1500,
    onClose: q,
    onOpen: H,
    open: W,
    placement: Y = "bottom",
    PopperComponent: K,
    PopperProps: X = {},
    slotProps: Z = {},
    slots: ee = {},
    title: ae,
    TransitionComponent: A = Un,
    TransitionProps: re
  } = O, $ = fe(O, Bf), ie = /* @__PURE__ */ T.isValidElement(L) ? L : /* @__PURE__ */ d("span", {
    children: L
  }), Ee = kr(), Se = Ee.direction === "rtl", [we, ht] = T.useState(), [Pe, Qe] = T.useState(null), Ae = T.useRef(!1), et = B || Q, Te = or(), Ct = or(), mt = or(), Xt = or(), [Nr, To] = mi({
    controlled: W,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let tt = Nr;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = T.useRef(W !== void 0);
    T.useEffect(() => {
      we && we.disabled && !ne && ae !== "" && we.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ae, we, ne]);
  }
  const dn = hi(k), qt = T.useRef(), Or = fr(() => {
    qt.current !== void 0 && (document.body.style.WebkitUserSelect = qt.current, qt.current = void 0), Xt.clear();
  });
  T.useEffect(() => Or, [Or]);
  const ko = (ne) => {
    Ma.clear(), _r = !0, To(!0), H && !tt && H(ne);
  }, Cr = fr(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      Ma.start(800 + R, () => {
        _r = !1;
      }), To(!1), q && tt && q(ne), Te.start(Ee.transitions.duration.shortest, () => {
        Ae.current = !1;
      });
    }
  ), fn = (ne) => {
    Ae.current && ne.type !== "touchstart" || (we && we.removeAttribute("title"), Ct.clear(), mt.clear(), P || _r && j ? Ct.start(_r ? j : P, () => {
      ko(ne);
    }) : ko(ne));
  }, No = (ne) => {
    Ct.clear(), mt.start(R, () => {
      Cr(ne);
    });
  }, {
    isFocusVisibleRef: Oo,
    onBlur: hs,
    onFocus: ms,
    ref: gs
  } = gi(), [, Co] = T.useState(!1), So = (ne) => {
    hs(ne), Oo.current === !1 && (Co(!1), No(ne));
  }, Po = (ne) => {
    we || ht(ne.currentTarget), ms(ne), Oo.current === !0 && (Co(!0), fn(ne));
  }, Ro = (ne) => {
    Ae.current = !0;
    const De = ie.props;
    De.onTouchStart && De.onTouchStart(ne);
  }, $o = fn, _o = No, bs = (ne) => {
    Ro(ne), mt.clear(), Te.clear(), Or(), qt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Xt.start(te, () => {
      document.body.style.WebkitUserSelect = qt.current, fn(ne);
    });
  }, vs = (ne) => {
    ie.props.onTouchEnd && ie.props.onTouchEnd(ne), Or(), mt.start(F, () => {
      Cr(ne);
    });
  };
  T.useEffect(() => {
    if (!tt)
      return;
    function ne(De) {
      (De.key === "Escape" || De.key === "Esc") && Cr(De);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [Cr, tt]);
  const ys = Ue(ie.ref, gs, ht, r);
  !ae && ae !== 0 && (tt = !1);
  const hn = T.useRef(), ws = (ne) => {
    const De = ie.props;
    De.onMouseMove && De.onMouseMove(ne), tr = {
      x: ne.clientX,
      y: ne.clientY
    }, hn.current && hn.current.update();
  }, Yt = {}, mn = typeof ae == "string";
  C ? (Yt.title = !tt && mn && !M ? ae : null, Yt["aria-describedby"] = tt ? dn : null) : (Yt["aria-label"] = mn ? ae : null, Yt["aria-labelledby"] = tt && !mn ? dn : null);
  const Ve = N({}, Yt, $, ie.props, {
    className: Ne($.className, ie.props.className),
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
  z || (Ve.onTouchStart = bs, Ve.onTouchEnd = vs), M || (Ve.onMouseOver = Mr($o, Ve.onMouseOver), Ve.onMouseLeave = Mr(_o, Ve.onMouseLeave), et || (Gt.onMouseOver = $o, Gt.onMouseLeave = _o)), _ || (Ve.onFocus = Mr(Po, Ve.onFocus), Ve.onBlur = Mr(So, Ve.onBlur), et || (Gt.onFocus = Po, Gt.onBlur = So)), process.env.NODE_ENV !== "production" && ie.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));
  const xs = T.useMemo(() => {
    var ne;
    let De = [{
      name: "arrow",
      enabled: !!Pe,
      options: {
        element: Pe,
        padding: 4
      }
    }];
    return (ne = X.popperOptions) != null && ne.modifiers && (De = De.concat(X.popperOptions.modifiers)), N({}, X.popperOptions, {
      modifiers: De
    });
  }, [Pe, X]), Kt = N({}, O, {
    isRtl: Se,
    arrow: S,
    disableInteractive: et,
    placement: Y,
    PopperComponentProp: K,
    touch: Ae.current
  }), gn = Vf(Kt), Mo = (n = (o = ee.popper) != null ? o : D.Popper) != null ? n : Ff, Io = (a = (s = (l = ee.transition) != null ? l : D.Transition) != null ? s : A) != null ? a : Un, Ao = (c = (p = ee.tooltip) != null ? p : D.Tooltip) != null ? c : zf, Do = (u = (h = ee.arrow) != null ? h : D.Arrow) != null ? u : Uf, Es = ar(Mo, N({}, X, (f = Z.popper) != null ? f : V.popper, {
    className: Ne(gn.popper, X == null ? void 0 : X.className, (b = (y = Z.popper) != null ? y : V.popper) == null ? void 0 : b.className)
  }), Kt), Ts = ar(Io, N({}, re, (v = Z.transition) != null ? v : V.transition), Kt), ks = ar(Ao, N({}, (m = Z.tooltip) != null ? m : V.tooltip, {
    className: Ne(gn.tooltip, (x = (I = Z.tooltip) != null ? I : V.tooltip) == null ? void 0 : x.className)
  }), Kt), Ns = ar(Do, N({}, (w = Z.arrow) != null ? w : V.arrow, {
    className: Ne(gn.arrow, (E = (g = Z.arrow) != null ? g : V.arrow) == null ? void 0 : E.className)
  }), Kt);
  return /* @__PURE__ */ U(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(ie, Ve), /* @__PURE__ */ d(Mo, N({
      as: K ?? Gi,
      placement: Y,
      anchorEl: Q ? {
        getBoundingClientRect: () => ({
          top: tr.y,
          left: tr.x,
          right: tr.x,
          bottom: tr.y,
          width: 0,
          height: 0
        })
      } : we,
      popperRef: hn,
      open: we ? tt : !1,
      id: dn,
      transition: !0
    }, Gt, Es, {
      popperOptions: xs,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ d(Io, N({
        timeout: Ee.transitions.duration.shorter
      }, ne, Ts, {
        children: /* @__PURE__ */ U(Ao, N({}, ks, {
          children: [ae, S ? /* @__PURE__ */ d(Do, N({}, Ns, {
            ref: Qe
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Ki.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: i.bool,
  /**
   * Tooltip reference element.
   */
  children: vr.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: i.shape({
    Arrow: i.elementType,
    Popper: i.elementType,
    Tooltip: i.elementType,
    Transition: i.elementType
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
  componentsProps: i.shape({
    arrow: i.object,
    popper: i.object,
    tooltip: i.object,
    transition: i.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: i.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: i.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: i.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: i.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: i.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: i.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: i.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: i.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: i.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: i.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: i.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: i.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: i.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: i.func,
  /**
   * If `true`, the component is shown.
   */
  open: i.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: i.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: i.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: i.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: i.shape({
    arrow: i.object,
    popper: i.object,
    tooltip: i.object,
    transition: i.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: i.shape({
    arrow: i.elementType,
    popper: i.elementType,
    tooltip: i.elementType,
    transition: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: i.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: i.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: i.object
});
const Hf = Ki;
var wo = {}, Ji = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ji);
var Wf = Ji.exports, Cn = {};
function Xf(e) {
  return Ze("MuiSvgIcon", e);
}
ut("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const qf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Yf = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ke(t)}`, `fontSize${Ke(r)}`]
  };
  return st(o, Xf, n);
}, Gf = Ce("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "inherit" && t[`color${Ke(r.color)}`], t[`fontSize${Ke(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r, n, o, a, s, l, c, p, u, h, f, b, y;
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
      small: ((a = e.typography) == null || (s = a.pxToRem) == null ? void 0 : s.call(a, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((p = e.typography) == null || (u = p.pxToRem) == null ? void 0 : u.call(p, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (h = (f = (e.vars || e).palette) == null || (f = f[t.color]) == null ? void 0 : f.main) != null ? h : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[t.color]
  };
}), xo = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = lt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: s = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: p,
    inheritViewBox: u = !1,
    titleAccess: h,
    viewBox: f = "0 0 24 24"
  } = n, b = fe(n, qf), y = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", v = N({}, n, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: u,
    viewBox: f,
    hasSvgAsChild: y
  }), m = {};
  u || (m.viewBox = f);
  const x = Yf(v);
  return /* @__PURE__ */ U(Gf, N({
    as: l,
    className: Ne(x.root, a),
    focusable: "false",
    color: p,
    "aria-hidden": h ? void 0 : !0,
    role: h ? "img" : void 0,
    ref: r
  }, m, b, y && o.props, {
    ownerState: v,
    children: [y ? o.props.children : o, h ? /* @__PURE__ */ d("title", {
      children: h
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
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: i.oneOfType([i.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), i.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: i.oneOfType([i.oneOf(["inherit", "large", "medium", "small"]), i.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: i.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: i.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: i.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: i.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: i.string
});
xo.muiName = "SvgIcon";
const Ia = xo;
function Zi(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ d(Ia, N({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = Ia.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(r));
}
const Kf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Ei.configure(e);
  }
}, Jf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ke,
  createChainedFunction: An,
  createSvgIcon: Zi,
  debounce: fi,
  deprecatedPropType: Tc,
  isMuiElement: kc,
  ownerDocument: Oe,
  ownerWindow: Lt,
  requirePropFactory: Nc,
  setRef: Ur,
  unstable_ClassNameGenerator: Kf,
  unstable_useEnhancedEffect: Tt,
  unstable_useId: hi,
  unsupportedProp: Sc,
  useControlled: mi,
  useEventCallback: fr,
  useForkRef: Ue,
  useIsFocusVisible: gi
}, Symbol.toStringTag, { value: "Module" })), Zf = /* @__PURE__ */ rc(Jf);
var Aa;
function Qf() {
  return Aa || (Aa = 1, function(e) {
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
  }(Cn)), Cn;
}
var eh = Wf;
Object.defineProperty(wo, "__esModule", {
  value: !0
});
var Qi = wo.default = void 0, th = eh(Qf()), rh = Os;
Qi = wo.default = (0, th.default)(/* @__PURE__ */ (0, rh.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Da(e, t, r) {
  return e ? /* @__PURE__ */ d(Wa, { className: `papi-menu-icon-${r ? "leading" : "trailing"}`, children: /* @__PURE__ */ d("img", { src: e, alt: `${r ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function es(e) {
  const {
    onClick: t,
    label: r,
    tooltip: n,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: p = !1,
    isDense: u = !0,
    isSubMenuParent: h = !1,
    hasDisabledGutters: f = !1,
    hasDivider: b = !1,
    focusVisibleClassName: y,
    id: v,
    children: m
  } = e, x = /* @__PURE__ */ d(
    nl,
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
      children: r ? /* @__PURE__ */ U(Kr, { children: [
        Da(a, r, !0),
        /* @__PURE__ */ d(ol, { primary: r, inset: !a && o }),
        h ? /* @__PURE__ */ d(Wa, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ d(Qi, {}) }) : Da(s, r, !1)
      ] }) : m
    }
  );
  return n ? /* @__PURE__ */ d(Hf, { title: n, placement: "right", children: /* @__PURE__ */ d("div", { children: x }) }) : x;
}
function ts(e) {
  return Object.entries(e.groups).map(([r, n]) => ({ id: r, group: n }));
}
function nh(e) {
  const [t, r] = de(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, s = (p) => {
    r(p.currentTarget);
  }, l = () => {
    r(void 0);
  }, c = () => {
    let p = ts(a).filter((u) => "menuItem" in u.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return p = p.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === n.id
    ), /* @__PURE__ */ d(Eo, { ...e, includedGroups: p });
  };
  return /* @__PURE__ */ U(Kr, { children: [
    /* @__PURE__ */ d(es, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ d(
      al,
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
const oh = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Eo(e) {
  const { menuDefinition: t, onClick: r, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: s } = Wn(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      ts(t).filter((y) => !("menuItem" in y.group))
    ), h = Object.values(u).sort(
      (y, v) => (y.group.order || 0) - (v.group.order || 0)
    ), f = [];
    h.forEach((y) => {
      oh(y.id, t.items).forEach(
        (v) => f.push({ item: v, isLastItemInGroup: !1 })
      ), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !0);
    }), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !1);
    const b = f.some(
      (y) => "iconPathBefore" in y.item && y.item.iconPathBefore
    );
    return { items: f, allowForLeadingIcons: b };
  }, [o, t]), l = ({ item: u, isLastItemInGroup: h }) => ({
    className: "papi-menu-item",
    label: u.label,
    tooltip: u.tooltip,
    iconPathBefore: "iconPathBefore" in u ? u.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in u ? u.iconPathAfter : void 0,
    hasDivider: h,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ d("div", {});
  const p = c.item.group;
  return /* @__PURE__ */ d("div", { role: "menu", "aria-label": p, children: a.map((u, h) => {
    const { item: f } = u, b = l(u);
    if ("command" in f) {
      const y = f.group + h;
      return /* @__PURE__ */ d(
        es,
        {
          onClick: (v) => {
            r == null || r(v), n(f);
          },
          ...b
        },
        y
      );
    }
    return /* @__PURE__ */ d(
      nh,
      {
        parentMenuItem: f,
        parentItemProps: b,
        ...e
      },
      p + f.id
    );
  }) }, p);
}
function ah(e) {
  const { menuDefinition: t, columnId: r } = e;
  let a = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return r && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[r] && (a = a.filter(
    (s) => "column" in s.group && s.group.column === r
  )), /* @__PURE__ */ d(Eo, { ...e, includedGroups: a });
}
function ih({
  commandHandler: e,
  menuDefinition: t,
  id: r,
  metadata: n,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ U(
    Xa,
    {
      id: r,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": r,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ d("h3", { "aria-label": n.label, className: `papi-menu-column-header ${a ?? ""}`, children: n.label }),
        /* @__PURE__ */ d(il, { id: r, dense: !0, className: a ?? "", children: /* @__PURE__ */ d(
          ah,
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
function sh({
  commandHandler: e,
  className: t,
  multiColumnMenu: r,
  id: n
}) {
  const { columns: o } = r, a = Wn(() => {
    const s = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, p = o[c];
      typeof p == "object" && typeof p.order == "number" && !Number.isNaN(p.order) ? s.set(p.order, { id: c, metadata: p }) : console.warn(
        `Property ${l} (${typeof p}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, n]);
  return /* @__PURE__ */ d(
    Xa,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: n,
      children: a.map((s, l) => /* @__PURE__ */ d(
        ih,
        {
          commandHandler: e,
          menuDefinition: r,
          ...s,
          className: t
        },
        l
      ))
    }
  );
}
const rs = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (rs.displayName = "ListContext");
const lh = rs;
function ch(e) {
  return Ze("MuiList", e);
}
ut("MuiList", ["root", "padding", "dense", "subheader"]);
const ph = ["children", "className", "component", "dense", "disablePadding", "subheader"], uh = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return st({
    root: ["root", !r && "padding", n && "dense", o && "subheader"]
  }, ch, t);
}, dh = Ce("ul", {
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
})), ns = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = lt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: s = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: p
  } = n, u = fe(n, ph), h = T.useMemo(() => ({
    dense: l
  }), [l]), f = N({}, n, {
    component: s,
    dense: l,
    disablePadding: c
  }), b = uh(f);
  return /* @__PURE__ */ d(lh.Provider, {
    value: h,
    children: /* @__PURE__ */ U(dh, N({
      as: s,
      className: Ne(b.root, a),
      ref: r,
      ownerState: f
    }, u, {
      children: [p, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (ns.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: i.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: i.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: i.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object])
});
const fh = ns, hh = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Sn(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function ja(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function os(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.indexOf(t.keys.join("")) === 0;
}
function rr(e, t, r, n, o, a) {
  let s = !1, l = o(e, t, t ? r : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const c = n ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !os(l, a) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const as = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: n,
    autoFocus: o = !1,
    autoFocusItem: a = !1,
    children: s,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: p = !1,
    onKeyDown: u,
    variant: h = "selectedMenu"
  } = t, f = fe(t, hh), b = T.useRef(null), y = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Tt(() => {
    o && b.current.focus();
  }, [o]), T.useImperativeHandle(n, () => ({
    adjustStyleForScrollbar: (w, E) => {
      const g = !b.current.style.width;
      if (w.clientHeight < b.current.clientHeight && g) {
        const O = `${bi(Oe(w))}px`;
        b.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = O, b.current.style.width = `calc(100% + ${O})`;
      }
      return b.current;
    }
  }), []);
  const v = (w) => {
    const E = b.current, g = w.key, O = Oe(E).activeElement;
    if (g === "ArrowDown")
      w.preventDefault(), rr(E, O, p, c, Sn);
    else if (g === "ArrowUp")
      w.preventDefault(), rr(E, O, p, c, ja);
    else if (g === "Home")
      w.preventDefault(), rr(E, null, p, c, Sn);
    else if (g === "End")
      w.preventDefault(), rr(E, null, p, c, ja);
    else if (g.length === 1) {
      const S = y.current, L = g.toLowerCase(), D = performance.now();
      S.keys.length > 0 && (D - S.lastTime > 500 ? (S.keys = [], S.repeating = !0, S.previousKeyMatched = !0) : S.repeating && L !== S.keys[0] && (S.repeating = !1)), S.lastTime = D, S.keys.push(L);
      const V = O && !S.repeating && os(O, S);
      S.previousKeyMatched && (V || rr(E, O, !1, c, Sn, S)) ? w.preventDefault() : S.previousKeyMatched = !1;
    }
    u && u(w);
  }, m = Ue(b, r);
  let x = -1;
  T.Children.forEach(s, (w, E) => {
    if (!/* @__PURE__ */ T.isValidElement(w)) {
      x === E && (x += 1, x >= s.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && zr.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (h === "selectedMenu" && w.props.selected || x === -1) && (x = E), x === E && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (x += 1, x >= s.length && (x = -1));
  });
  const I = T.Children.map(s, (w, E) => {
    if (E === x) {
      const g = {};
      return a && (g.autoFocus = !0), w.props.tabIndex === void 0 && h === "selectedMenu" && (g.tabIndex = 0), /* @__PURE__ */ T.cloneElement(w, g);
    }
    return w;
  });
  return /* @__PURE__ */ d(fh, N({
    role: "menu",
    ref: m,
    className: l,
    onKeyDown: v,
    tabIndex: o ? 0 : -1
  }, f, {
    children: I
  }));
});
process.env.NODE_ENV !== "production" && (as.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: i.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: i.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: i.node,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: i.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: i.bool,
  /**
   * @ignore
   */
  onKeyDown: i.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: i.oneOf(["menu", "selectedMenu"])
});
const mh = as, gh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], bh = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, is = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = kr(), o = {
    enter: n.transitions.duration.enteringScreen,
    exit: n.transitions.duration.leavingScreen
  }, {
    addEndListener: a,
    appear: s = !0,
    children: l,
    easing: c,
    in: p,
    onEnter: u,
    onEntered: h,
    onEntering: f,
    onExit: b,
    onExited: y,
    onExiting: v,
    style: m,
    timeout: x = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: I = Xi
  } = t, w = fe(t, gh), E = T.useRef(null), g = Ue(E, l.ref, r), O = (B) => (z) => {
    if (B) {
      const P = E.current;
      z === void 0 ? B(P) : B(P, z);
    }
  }, S = O(f), L = O((B, z) => {
    qi(B);
    const P = Gr({
      style: m,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    B.style.webkitTransition = n.transitions.create("opacity", P), B.style.transition = n.transitions.create("opacity", P), u && u(B, z);
  }), D = O(h), V = O(v), C = O((B) => {
    const z = Gr({
      style: m,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    B.style.webkitTransition = n.transitions.create("opacity", z), B.style.transition = n.transitions.create("opacity", z), b && b(B);
  }), _ = O(y);
  return /* @__PURE__ */ d(I, N({
    appear: s,
    in: p,
    nodeRef: E,
    onEnter: L,
    onEntered: D,
    onEntering: S,
    onExit: C,
    onExited: _,
    onExiting: V,
    addEndListener: (B) => {
      a && a(E.current, B);
    },
    timeout: x
  }, w, {
    children: (B, z) => /* @__PURE__ */ T.cloneElement(l, N({
      style: N({
        opacity: 0,
        visibility: B === "exited" && !p ? "hidden" : void 0
      }, bh[B], m, l.props.style),
      ref: g
    }, z))
  }));
});
process.env.NODE_ENV !== "production" && (is.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: i.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: i.bool,
  /**
   * A single child content element.
   */
  children: vr.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: i.oneOfType([i.shape({
    enter: i.string,
    exit: i.string
  }), i.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: i.bool,
  /**
   * @ignore
   */
  onEnter: i.func,
  /**
   * @ignore
   */
  onEntered: i.func,
  /**
   * @ignore
   */
  onEntering: i.func,
  /**
   * @ignore
   */
  onExit: i.func,
  /**
   * @ignore
   */
  onExited: i.func,
  /**
   * @ignore
   */
  onExiting: i.func,
  /**
   * @ignore
   */
  style: i.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: i.oneOfType([i.number, i.shape({
    appear: i.number,
    enter: i.number,
    exit: i.number
  })])
});
const vh = is;
function yh(e) {
  return Ze("MuiBackdrop", e);
}
ut("MuiBackdrop", ["root", "invisible"]);
const wh = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], xh = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return st({
    root: ["root", r && "invisible"]
  }, yh, t);
}, Eh = Ce("div", {
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
})), ss = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a;
  const s = lt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: p = "div",
    components: u = {},
    componentsProps: h = {},
    invisible: f = !1,
    open: b,
    slotProps: y = {},
    slots: v = {},
    TransitionComponent: m = vh,
    transitionDuration: x
  } = s, I = fe(s, wh), w = N({}, s, {
    component: p,
    invisible: f
  }), E = xh(w), g = (n = y.root) != null ? n : h.root;
  return /* @__PURE__ */ d(m, N({
    in: b,
    timeout: x
  }, I, {
    children: /* @__PURE__ */ d(Eh, N({
      "aria-hidden": !0
    }, g, {
      as: (o = (a = v.root) != null ? a : u.Root) != null ? o : p,
      className: Ne(E.root, c, g == null ? void 0 : g.className),
      ownerState: N({}, w, g == null ? void 0 : g.ownerState),
      classes: E,
      ref: r,
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
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: i.shape({
    Root: i.elementType
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
  componentsProps: i.shape({
    root: i.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: i.bool,
  /**
   * If `true`, the component is shown.
   */
  open: i.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: i.shape({
    root: i.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: i.shape({
    root: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: i.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: i.oneOfType([i.number, i.shape({
    appear: i.number,
    enter: i.number,
    exit: i.number
  })])
});
const Th = ss;
function kh(e) {
  return Ze("MuiModal", e);
}
ut("MuiModal", ["root", "hidden", "backdrop"]);
const Nh = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Oh = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return st({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, kh, n);
}, Ch = Ce("div", {
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
}) => N({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), Sh = Ce(Th, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), ls = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a, s, l, c;
  const p = lt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: u = Sh,
    BackdropProps: h,
    className: f,
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
    disableRestoreFocus: S = !1,
    disableScrollLock: L = !1,
    hideBackdrop: D = !1,
    keepMounted: V = !1,
    onBackdropClick: C,
    open: _,
    slotProps: M,
    slots: B
    // eslint-disable-next-line react/prop-types
  } = p, z = fe(p, Nh), P = N({}, p, {
    closeAfterTransition: b,
    disableAutoFocus: w,
    disableEnforceFocus: E,
    disableEscapeKeyDown: g,
    disablePortal: O,
    disableRestoreFocus: S,
    disableScrollLock: L,
    hideBackdrop: D,
    keepMounted: V
  }), {
    getRootProps: j,
    getBackdropProps: te,
    getTransitionProps: Q,
    portalRef: k,
    isTopModal: R,
    exited: F,
    hasTransition: q
  } = mp(N({}, P, {
    rootRef: r
  })), H = N({}, P, {
    exited: F
  }), W = Oh(H), Y = {};
  if (y.props.tabIndex === void 0 && (Y.tabIndex = "-1"), q) {
    const {
      onEnter: re,
      onExited: $
    } = Q();
    Y.onEnter = re, Y.onExited = $;
  }
  const K = (n = (o = B == null ? void 0 : B.root) != null ? o : x.Root) != null ? n : Ch, X = (a = (s = B == null ? void 0 : B.backdrop) != null ? s : x.Backdrop) != null ? a : u, Z = (l = M == null ? void 0 : M.root) != null ? l : I.root, ee = (c = M == null ? void 0 : M.backdrop) != null ? c : I.backdrop, ae = kt({
    elementType: K,
    externalSlotProps: Z,
    externalForwardedProps: z,
    getSlotProps: j,
    additionalProps: {
      ref: r,
      as: m
    },
    ownerState: H,
    className: Ne(f, Z == null ? void 0 : Z.className, W == null ? void 0 : W.root, !H.open && H.exited && (W == null ? void 0 : W.hidden))
  }), A = kt({
    elementType: X,
    externalSlotProps: ee,
    additionalProps: h,
    getSlotProps: (re) => te(N({}, re, {
      onClick: ($) => {
        C && C($), re != null && re.onClick && re.onClick($);
      }
    })),
    className: Ne(ee == null ? void 0 : ee.className, h == null ? void 0 : h.className, W == null ? void 0 : W.backdrop),
    ownerState: H
  });
  return !V && !_ && (!q || F) ? null : /* @__PURE__ */ d(hr, {
    ref: k,
    container: v,
    disablePortal: O,
    children: /* @__PURE__ */ U(K, N({}, ae, {
      children: [!D && u ? /* @__PURE__ */ d(X, N({}, A)) : null, /* @__PURE__ */ d(Hr, {
        disableEnforceFocus: E,
        disableAutoFocus: w,
        disableRestoreFocus: S,
        isEnabled: R,
        open: _,
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
  BackdropComponent: i.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: i.object,
  /**
   * A single child content element.
   */
  children: vr.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: i.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: i.shape({
    Backdrop: i.elementType,
    Root: i.elementType
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
  componentsProps: i.shape({
    backdrop: i.oneOfType([i.func, i.object]),
    root: i.oneOfType([i.func, i.object])
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
  container: i.oneOfType([ot, i.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: i.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: i.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: i.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: i.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: i.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: i.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: i.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: i.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: i.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: i.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: i.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: i.func,
  /**
   * If `true`, the component is shown.
   */
  open: i.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: i.shape({
    backdrop: i.oneOfType([i.func, i.object]),
    root: i.oneOfType([i.func, i.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: i.shape({
    backdrop: i.elementType,
    root: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object])
});
const Ph = ls;
function Rh(e) {
  return Ze("MuiPaper", e);
}
ut("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const $h = ["className", "component", "elevation", "square", "variant"], _h = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, a = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return st(a, Rh, o);
}, Mh = Ce("div", {
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
    backgroundImage: `linear-gradient(${Yr("#fff", _a(t.elevation))}, ${Yr("#fff", _a(t.elevation))})`
  }, e.vars && {
    backgroundImage: (r = e.vars.overlays) == null ? void 0 : r[t.elevation]
  }));
}), cs = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = lt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, p = fe(n, $h), u = N({}, n, {
    component: a,
    elevation: s,
    square: l,
    variant: c
  }), h = _h(u);
  return process.env.NODE_ENV !== "production" && kr().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ d(Mh, N({
    as: a,
    ownerState: u,
    className: Ne(h.root, o),
    ref: r
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
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Wt(wi, (e) => {
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
  square: i.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: i.oneOfType([i.oneOf(["elevation", "outlined"]), i.string])
});
const Ih = cs;
function Ah(e) {
  return Ze("MuiPopover", e);
}
ut("MuiPopover", ["root", "paper"]);
const Dh = ["onEntering"], jh = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Bh = ["slotProps"];
function Ba(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function La(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function Va(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Br(e) {
  return typeof e == "function" ? e() : e;
}
const Lh = (e) => {
  const {
    classes: t
  } = e;
  return st({
    root: ["root"],
    paper: ["paper"]
  }, Ah, t);
}, Vh = Ce(Ph, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ps = Ce(Ih, {
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
}), us = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a;
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
    children: f,
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
    TransitionComponent: O = Un,
    transitionDuration: S = "auto",
    TransitionProps: {
      onEntering: L
    } = {},
    disableScrollLock: D = !1
  } = s, V = fe(s.TransitionProps, Dh), C = fe(s, jh), _ = (n = E == null ? void 0 : E.paper) != null ? n : I, M = T.useRef(), B = Ue(M, _.ref), z = N({}, s, {
    anchorOrigin: p,
    anchorReference: h,
    elevation: v,
    marginThreshold: m,
    externalPaperSlotProps: _,
    transformOrigin: g,
    TransitionComponent: O,
    transitionDuration: S,
    TransitionProps: V
  }), P = Lh(z), j = T.useCallback(() => {
    if (h === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (u || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), u;
    const re = Br(c), $ = re && re.nodeType === 1 ? re : Oe(M.current).body, ie = $.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Ee = $.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Ee.top === 0 && Ee.left === 0 && Ee.right === 0 && Ee.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: ie.top + Ba(ie, p.vertical),
      left: ie.left + La(ie, p.horizontal)
    };
  }, [c, p.horizontal, p.vertical, u, h]), te = T.useCallback((re) => ({
    vertical: Ba(re, g.vertical),
    horizontal: La(re, g.horizontal)
  }), [g.horizontal, g.vertical]), Q = T.useCallback((re) => {
    const $ = {
      width: re.offsetWidth,
      height: re.offsetHeight
    }, ie = te($);
    if (h === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Va(ie)
      };
    const Ee = j();
    let Se = Ee.top - ie.vertical, we = Ee.left - ie.horizontal;
    const ht = Se + $.height, Pe = we + $.width, Qe = Lt(Br(c)), Ae = Qe.innerHeight - m, et = Qe.innerWidth - m;
    if (m !== null && Se < m) {
      const Te = Se - m;
      Se -= Te, ie.vertical += Te;
    } else if (m !== null && ht > Ae) {
      const Te = ht - Ae;
      Se -= Te, ie.vertical += Te;
    }
    if (process.env.NODE_ENV !== "production" && $.height > Ae && $.height && Ae && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${$.height - Ae}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), m !== null && we < m) {
      const Te = we - m;
      we -= Te, ie.horizontal += Te;
    } else if (Pe > et) {
      const Te = Pe - et;
      we -= Te, ie.horizontal += Te;
    }
    return {
      top: `${Math.round(Se)}px`,
      left: `${Math.round(we)}px`,
      transformOrigin: Va(ie)
    };
  }, [c, h, j, te, m]), [k, R] = T.useState(x), F = T.useCallback(() => {
    const re = M.current;
    if (!re)
      return;
    const $ = Q(re);
    $.top !== null && (re.style.top = $.top), $.left !== null && (re.style.left = $.left), re.style.transformOrigin = $.transformOrigin, R(!0);
  }, [Q]);
  T.useEffect(() => (D && window.addEventListener("scroll", F), () => window.removeEventListener("scroll", F)), [c, D, F]);
  const q = (re, $) => {
    L && L(re, $), F();
  }, H = () => {
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
    const re = fi(() => {
      F();
    }), $ = Lt(c);
    return $.addEventListener("resize", re), () => {
      re.clear(), $.removeEventListener("resize", re);
    };
  }, [c, x, F]);
  let W = S;
  S === "auto" && !O.muiSupportAuto && (W = void 0);
  const Y = y || (c ? Oe(Br(c)).body : void 0), K = (o = w == null ? void 0 : w.root) != null ? o : Vh, X = (a = w == null ? void 0 : w.paper) != null ? a : ps, Z = kt({
    elementType: X,
    externalSlotProps: N({}, _, {
      style: k ? _.style : N({}, _.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: v,
      ref: B
    },
    ownerState: z,
    className: Ne(P.paper, _ == null ? void 0 : _.className)
  }), ee = kt({
    elementType: K,
    externalSlotProps: (E == null ? void 0 : E.root) || {},
    externalForwardedProps: C,
    additionalProps: {
      ref: r,
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
    slotProps: ae
  } = ee, A = fe(ee, Bh);
  return /* @__PURE__ */ d(K, N({}, A, !ki(K) && {
    slotProps: ae,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ d(O, N({
      appear: !0,
      in: x,
      onEntering: q,
      onExited: H,
      timeout: W
    }, V, {
      children: /* @__PURE__ */ d(X, N({}, Z, {
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
  action: ro,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Wt(i.oneOfType([ot, i.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Br(e.anchorEl);
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
  anchorOrigin: i.shape({
    horizontal: i.oneOfType([i.oneOf(["center", "left", "right"]), i.number]).isRequired,
    vertical: i.oneOfType([i.oneOf(["bottom", "center", "top"]), i.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: i.shape({
    left: i.number.isRequired,
    top: i.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: i.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: i.oneOfType([ot, i.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: i.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: wi,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: i.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: i.func,
  /**
   * If `true`, the component is shown.
   */
  open: i.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: i.shape({
    component: mc
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: i.shape({
    paper: i.oneOfType([i.func, i.object]),
    root: i.oneOfType([i.func, i.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: i.shape({
    paper: i.elementType,
    root: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
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
  transformOrigin: i.shape({
    horizontal: i.oneOfType([i.oneOf(["center", "left", "right"]), i.number]).isRequired,
    vertical: i.oneOfType([i.oneOf(["bottom", "center", "top"]), i.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: i.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: i.oneOfType([i.oneOf(["auto"]), i.number, i.shape({
    appear: i.number,
    enter: i.number,
    exit: i.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: i.object
});
const Fh = us;
function zh(e) {
  return Ze("MuiMenu", e);
}
ut("MuiMenu", ["root", "paper", "list"]);
const Uh = ["onEntering"], Hh = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Wh = {
  vertical: "top",
  horizontal: "right"
}, Xh = {
  vertical: "top",
  horizontal: "left"
}, qh = (e) => {
  const {
    classes: t
  } = e;
  return st({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, zh, t);
}, Yh = Ce(Fh, {
  shouldForwardProp: (e) => Hi(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Gh = Ce(ps, {
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
}), Kh = Ce(mh, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), ds = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o;
  const a = lt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: l,
    className: c,
    disableAutoFocusItem: p = !1,
    MenuListProps: u = {},
    onClose: h,
    open: f,
    PaperProps: b = {},
    PopoverClasses: y,
    transitionDuration: v = "auto",
    TransitionProps: {
      onEntering: m
    } = {},
    variant: x = "selectedMenu",
    slots: I = {},
    slotProps: w = {}
  } = a, E = fe(a.TransitionProps, Uh), g = fe(a, Hh), O = kr(), S = O.direction === "rtl", L = N({}, a, {
    autoFocus: s,
    disableAutoFocusItem: p,
    MenuListProps: u,
    onEntering: m,
    PaperProps: b,
    transitionDuration: v,
    TransitionProps: E,
    variant: x
  }), D = qh(L), V = s && !p && f, C = T.useRef(null), _ = (Q, k) => {
    C.current && C.current.adjustStyleForScrollbar(Q, O), m && m(Q, k);
  }, M = (Q) => {
    Q.key === "Tab" && (Q.preventDefault(), h && h(Q, "tabKeyDown"));
  };
  let B = -1;
  T.Children.map(l, (Q, k) => {
    /* @__PURE__ */ T.isValidElement(Q) && (process.env.NODE_ENV !== "production" && zr.isFragment(Q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Q.props.disabled || (x === "selectedMenu" && Q.props.selected || B === -1) && (B = k));
  });
  const z = (n = I.paper) != null ? n : Gh, P = (o = w.paper) != null ? o : b, j = kt({
    elementType: I.root,
    externalSlotProps: w.root,
    ownerState: L,
    className: [D.root, c]
  }), te = kt({
    elementType: z,
    externalSlotProps: P,
    ownerState: L,
    className: D.paper
  });
  return /* @__PURE__ */ d(Yh, N({
    onClose: h,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: S ? "right" : "left"
    },
    transformOrigin: S ? Wh : Xh,
    slots: {
      paper: z,
      root: I.root
    },
    slotProps: {
      root: j,
      paper: te
    },
    open: f,
    ref: r,
    transitionDuration: v,
    TransitionProps: N({
      onEntering: _
    }, E),
    ownerState: L
  }, g, {
    classes: y,
    children: /* @__PURE__ */ d(Kh, N({
      onKeyDown: M,
      actions: C,
      autoFocus: s && (B === -1 || p),
      autoFocusItem: V,
      variant: x
    }, u, {
      className: Ne(D.list, u.className),
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
  anchorEl: i.oneOfType([ot, i.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: i.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: i.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: i.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: i.func,
  /**
   * If `true`, the component is shown.
   */
  open: i.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: i.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: i.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: i.shape({
    paper: i.oneOfType([i.func, i.object]),
    root: i.oneOfType([i.func, i.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: i.shape({
    paper: i.elementType,
    root: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: i.oneOfType([i.oneOf(["auto"]), i.number, i.shape({
    appear: i.number,
    enter: i.number,
    exit: i.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: i.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: i.oneOf(["menu", "selectedMenu"])
});
const Jh = ds;
function Ym({
  className: e,
  commandHandler: t,
  menuDefinition: r,
  children: n
}) {
  var p;
  const [o, a] = J.useState(void 0), s = $e(
    (u) => {
      u.preventDefault(), a(
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
    a(void 0);
  }, []), c = Wn(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((p = r == null ? void 0 : r.items) == null ? void 0 : p.length) ?? 0) === 0 || !n ? n : /* @__PURE__ */ U(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        n,
        /* @__PURE__ */ d(
          Jh,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ d(
              Eo,
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
const Zh = Zi(/* @__PURE__ */ d("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Qh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Hn = (e, t, r = {}) => {
  const n = wt(t);
  n.current = t;
  const o = wt(r);
  o.current = Qh(o.current);
  const [a, s] = de(() => n.current), [l, c] = de(!0);
  return Ye(() => {
    let p = !0;
    return c(!!e), (async () => {
      if (e) {
        const u = await e();
        p && (s(() => u), c(!1));
      }
    })(), () => {
      p = !1, o.current.preserveValue || s(() => n.current);
    };
  }, [e]), [a, l];
};
function em({
  menuProvider: e,
  normalMenu: t,
  fullMenu: r,
  commandHandler: n,
  containerRef: o,
  className: a,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, p] = de(!1), [u, h] = de(!1), f = $e(() => {
    c && p(!1), h(!1);
  }, [c]), b = $e((E) => {
    E.stopPropagation(), p((g) => {
      const O = !g;
      return O && E.shiftKey ? h(!0) : O || h(!1), O;
    });
  }, []), y = $e(
    (E) => (f(), n(E)),
    [n, f]
  ), [v, m] = de({ top: 1, left: 1 });
  Ye(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const g = E.getBoundingClientRect(), O = window.scrollY, S = window.scrollX, L = g.top + O + E.clientHeight, D = g.left + S;
        m({ top: L, left: D });
      }
    }
  }, [c, o]);
  const [x] = Hn(
    $e(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [I] = Hn(
    $e(async () => (e == null ? void 0 : e(!0)) ?? r ?? x, [e, r, x, c]),
    r ?? x
  ), w = u && I ? I : x;
  return /* @__PURE__ */ U(Kr, { children: [
    /* @__PURE__ */ d(
      qa,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: b,
        children: l ?? /* @__PURE__ */ d(Zh, {})
      }
    ),
    /* @__PURE__ */ d(
      sl,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
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
          sh,
          {
            className: a,
            id: `${s ?? ""} main menu`,
            commandHandler: y,
            multiColumnMenu: w
          }
        ) : void 0
      }
    )
  ] });
}
function Gm({
  id: e,
  label: t,
  isDisabled: r = !1,
  tooltip: n,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: s = "medium",
  className: l,
  onClick: c,
  children: p
}) {
  return /* @__PURE__ */ d(
    qa,
    {
      id: e,
      disabled: r,
      edge: a,
      size: s,
      "aria-label": t,
      title: o ? void 0 : n ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: p
    }
  );
}
const tm = Xn(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), fs = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(Ya.Root, { ref: r, className: G(tm(), e), ...t }));
fs.displayName = Ya.Root.displayName;
function rm({
  id: e,
  isDisabled: t = !1,
  hasError: r = !1,
  isFullWidth: n = !1,
  helperText: o,
  label: a,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: p,
  value: u,
  onChange: h,
  onFocus: f,
  onBlur: b
}) {
  return /* @__PURE__ */ U("div", { className: G("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ d(
      fs,
      {
        htmlFor: e,
        className: G({
          "pr-text-red-600": r,
          "pr-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ d(
      Zr,
      {
        id: e,
        disabled: t,
        placeholder: s,
        required: l,
        className: G(c, { "pr-border-red-600": r }),
        defaultValue: p,
        value: u,
        onChange: h,
        onFocus: f,
        onBlur: b
      }
    ),
    /* @__PURE__ */ d("p", { className: G({ "pr-hidden": !o }), children: o })
  ] });
}
function Km({ onSearch: e, placeholder: t, isFullWidth: r }) {
  const [n, o] = de(""), a = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ d(
    rm,
    {
      isFullWidth: r,
      className: "search-bar-input",
      placeholder: t,
      value: n,
      onChange: (s) => a(s.target.value)
    }
  );
}
function Jm({
  id: e,
  isDisabled: t = !1,
  orientation: r = "horizontal",
  min: n = 0,
  max: o = 100,
  step: a = 1,
  showMarks: s = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: p = "off",
  className: u,
  onChange: h,
  onChangeCommitted: f
}) {
  return /* @__PURE__ */ d(
    ll,
    {
      id: e,
      disabled: t,
      orientation: r,
      min: n,
      max: o,
      step: a,
      marks: s,
      defaultValue: l,
      value: c,
      valueLabelDisplay: p,
      className: `papi-slider ${r} ${u ?? ""}`,
      onChange: h,
      onChangeCommitted: f
    }
  );
}
function Zm({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: r = !1,
  className: n,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: l
}) {
  const c = {
    action: (s == null ? void 0 : s.action) || l,
    message: s == null ? void 0 : s.message,
    className: n
  };
  return /* @__PURE__ */ d(
    cl,
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
function Qm({
  id: e,
  isChecked: t,
  isDisabled: r = !1,
  hasError: n = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ d(
    pl,
    {
      id: e,
      checked: t,
      disabled: r,
      className: `papi-switch ${n ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function eg({
  menuProvider: e,
  commandHandler: t,
  className: r,
  id: n,
  children: o
}) {
  const a = wt(void 0);
  return /* @__PURE__ */ d("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ d(ul, { position: "static", id: n, children: /* @__PURE__ */ U(dl, { className: `papi-toolbar ${r ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ d(
      em,
      {
        commandHandler: t,
        containerRef: a,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ d("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const tg = Ie.Root, nm = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ie.List,
  {
    ref: r,
    className: G(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
nm.displayName = Ie.List.displayName;
const om = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ie.Trigger,
  {
    ref: r,
    className: G(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
om.displayName = Ie.Trigger.displayName;
const am = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ie.Content,
  {
    ref: r,
    className: G(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
am.displayName = Ie.Content.displayName;
const im = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ie.Root,
  {
    orientation: "vertical",
    ref: r,
    className: G("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
im.displayName = Ie.List.displayName;
const sm = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ie.List,
  {
    ref: r,
    className: G(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
sm.displayName = Ie.List.displayName;
const rg = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ie.Trigger,
  {
    ref: r,
    ...t,
    className: G(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), lm = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ie.Content,
  {
    ref: r,
    className: G(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
lm.displayName = Ie.Content.displayName;
const Ir = (e) => e === "asc" ? /* @__PURE__ */ d(zs, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ d(Us, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ d(Hs, { className: "pr-ml-2 pr-h-4 pr-w-4" }), cm = (e, t, r, n, o) => [
  {
    accessorKey: "character",
    header: ({ column: a }) => /* @__PURE__ */ U(ke, { onClick: () => a.toggleSorting(void 0), children: [
      e,
      Ir(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "unicodeValue",
    header: ({ column: a }) => /* @__PURE__ */ U(ke, { onClick: () => a.toggleSorting(void 0), children: [
      t,
      Ir(a.getIsSorted())
    ] }),
    cell: ({ row: a }) => a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
  },
  {
    accessorKey: "count",
    header: ({ column: a }) => /* @__PURE__ */ U(ke, { onClick: () => a.toggleSorting(void 0), children: [
      r,
      Ir(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: a, table: s }) => {
      const l = s.getSelectedRowModel().rows, c = [];
      return l.forEach((p) => {
        c.push(p.getValue("character"));
      }), /* @__PURE__ */ U("div", { children: [
        /* @__PURE__ */ d("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ U(ke, { onClick: () => a.toggleSorting(void 0), children: [
          n,
          Ir(a.getIsSorted())
        ] }) }),
        /* @__PURE__ */ U("div", { className: "pr-flex pr-justify-center", children: [
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
    cell: ({ row: a }) => {
      const s = a.getValue("status");
      return s === !0 ? /* @__PURE__ */ d(Bo, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : s === !1 ? /* @__PURE__ */ d(Lo, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ d(Vo, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
];
function pm({
  tableData: e,
  onStatusChange: t,
  onSelectCharacter: r,
  localizedStrings: n
}) {
  const o = n["%webView_inventory_table_header_character%"], a = n["%webView_inventory_table_header_unicode_value%"], s = n["%webView_inventory_table_header_count%"], l = n["%webView_inventory_table_header_status%"], c = (p, u) => {
    u.toggleAllRowsSelected(!1), p.toggleSelected(void 0), r(p.getValue("character"));
  };
  return /* @__PURE__ */ d("div", { className: "pr-overflow-y-auto", children: /* @__PURE__ */ d(
    Ql,
    {
      columns: cm(
        o,
        a,
        s,
        l,
        t
      ),
      data: e,
      onRowClickHandler: c
    }
  ) });
}
const Fa = (e, t, r) => {
  if (!e || e === "" || t === "")
    return [];
  const n = [], o = e.split(`
`);
  let a = "0", s = "0", l = 0;
  return o.forEach((c) => {
    const p = c.split(/\s+/);
    c.startsWith("\\c") && ([, a] = p, s = "0"), c.startsWith("\\v") && ([, s] = p, a === "0" && (a = r.chapterNum.toString()));
    for (let u = 0; u < p.length; u++)
      if (p[u].includes(t)) {
        const h = Math.max(0, u - 2), f = Math.min(p.length, u + 3), b = p.slice(h, f).join(" "), y = {
          reference: { ...r, chapterNum: +a, verseNum: +s },
          snippet: b,
          key: l
        };
        l += 1, n.push(y);
      }
  }), n;
};
function um({
  selectedCharacter: e,
  text: t,
  scriptureReference: r,
  setScriptureReference: n,
  localizedStrings: o
}) {
  const a = o["%webView_inventory_occurrences_table_header_reference%"], s = o["%webView_inventory_occurrences_table_header_occurrence%"], [l, c] = de(
    Fa(t, e, r)
  );
  return Ye(
    () => c(Fa(t, e, r)),
    [t, e, r]
  ), /* @__PURE__ */ U(Zn, { children: [
    /* @__PURE__ */ d(Qn, { children: /* @__PURE__ */ U(Dt, { children: [
      /* @__PURE__ */ d(Lr, { children: a }),
      /* @__PURE__ */ d(Lr, { children: s })
    ] }) }),
    /* @__PURE__ */ d(eo, { children: l.map((p) => /* @__PURE__ */ U(
      Dt,
      {
        onClick: () => {
          n(p.reference);
        },
        children: [
          /* @__PURE__ */ d(dr, { children: `${he.bookNumberToEnglishName(p.reference.bookNum)} ${p.reference.chapterNum}:${p.reference.verseNum}` }),
          /* @__PURE__ */ d(dr, { children: p.snippet })
        ]
      },
      p.key
    )) })
  ] });
}
const dm = async (e, t, r, n, o) => {
  const a = [];
  return Ss(e, "").forEach((s) => {
    if (r !== "" && !s.includes(r))
      return;
    const l = a.find((c) => c.character === s);
    if (l)
      l.count += 1;
    else {
      let c;
      if (n.includes(s) && (c = !0), o.includes(s) && (c = !1), t === "all" || t === "approved" && c === !0 || t === "unapproved" && c === !1 || t === "unknown" && c === void 0) {
        const p = {
          character: s,
          count: 1,
          status: c
        };
        a.push(p);
      }
    }
  }), a;
};
function ng({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: r,
  projectId: n,
  getSetting: o,
  setSetting: a,
  getText: s
}) {
  const l = r["%webView_characterInventory_characters_all%"], c = r["%webView_characterInventory_characters_approved%"], p = r["%webView_characterInventory_characters_unapproved%"], u = r["%webView_characterInventory_characters_unknown%"], h = r["%webView_inventory_scope_book%"], f = r["%webView_inventory_scope_chapter%"], b = r["%webView_inventory_scope_verse%"], y = r["%webView_inventory_filter_text%"], [v, m] = de([]), [x, I] = de([]), [w, E] = de(void 0), [g, O] = de("book"), [S, L] = de("all"), [D, V] = de(""), [C, _] = de([]), [M, B] = de(""), z = (P, j) => {
    _((te) => {
      let Q = [];
      return P.forEach((k) => {
        Q = te.map((R) => R.character === k && R.status !== j ? { ...R, status: j } : R);
      }), m((k) => {
        let R = [...k];
        return P.forEach((F) => {
          j === !0 ? R.includes(F) || R.push(F) : R = R.filter((q) => q !== F);
        }), a("validCharacters", n, R), R;
      }), I((k) => {
        let R = [...k];
        return P.forEach((F) => {
          j === !1 ? R.includes(F) || R.push(F) : R = R.filter(
            (q) => q !== F
          );
        }), a("invalidCharacters", n, R), R;
      }), Q;
    });
  };
  return Ye(() => {
    (async () => {
      try {
        m(await o("validCharacters", n)), I(await o("invalidCharacters", n));
      } catch {
        throw new Error("Failed to fetch characters from project settings");
      }
    })();
  }, [n, o]), Ye(() => {
    (async () => {
      try {
        const j = await s(n, e, g);
        E(j);
      } catch {
        throw new Error("Failed getting scripture text");
      }
    })();
  }, [n, e, g, s]), Ye(() => {
    if (!w) {
      _([]);
      return;
    }
    (async () => {
      try {
        _(
          await dm(w, S, D, v, x)
        );
      } catch {
        throw new Error("Failed building table data");
      }
    })();
  }, [v, x, w, S, D]), /* @__PURE__ */ U("div", { className: "pr-twp pr-font-sans", children: [
    /* @__PURE__ */ U("div", { className: "pr-flex", children: [
      /* @__PURE__ */ U($n, { onValueChange: (P) => L(P), defaultValue: S, children: [
        /* @__PURE__ */ d(Vr, { children: /* @__PURE__ */ d(_n, { placeholder: "Select filter" }) }),
        /* @__PURE__ */ U(Fr, { className: "pr-font-sans", children: [
          /* @__PURE__ */ d(rt, { value: "all", children: l }),
          /* @__PURE__ */ d(rt, { value: "approved", children: c }),
          /* @__PURE__ */ d(rt, { value: "unapproved", children: p }),
          /* @__PURE__ */ d(rt, { value: "unknown", children: u })
        ] })
      ] }),
      /* @__PURE__ */ U($n, { onValueChange: (P) => O(P), defaultValue: g, children: [
        /* @__PURE__ */ d(Vr, { children: /* @__PURE__ */ d(_n, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ U(Fr, { className: "pr-font-sans", children: [
          /* @__PURE__ */ d(rt, { value: "book", children: h }),
          /* @__PURE__ */ d(rt, { value: "chapter", children: f }),
          /* @__PURE__ */ d(rt, { value: "verse", children: b })
        ] })
      ] }),
      /* @__PURE__ */ d(
        Zr,
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
    /* @__PURE__ */ d(
      "div",
      {
        className: `pr-overflow-y-auto pr-rounded-md pr-border ${M !== "" && "pr-max-h-96"}`,
        children: /* @__PURE__ */ d(
          pm,
          {
            tableData: C,
            onStatusChange: z,
            onSelectCharacter: (P) => {
              B(P);
            },
            localizedStrings: r
          }
        )
      }
    ),
    M !== "" && /* @__PURE__ */ d("div", { className: "pr-mt-4 pr-rounded-md pr-border", children: /* @__PURE__ */ d(
      um,
      {
        selectedCharacter: M,
        text: w,
        scriptureReference: e,
        setScriptureReference: (P) => t(P),
        localizedStrings: r
      }
    ) })
  ] });
}
const og = (e, t) => {
  Ye(() => {
    if (!e)
      return () => {
      };
    const r = e(t);
    return () => {
      r();
    };
  }, [e, t]);
}, Pn = () => !1, ag = (e, t) => {
  const [r] = Hn(
    $e(async () => {
      if (!e)
        return Pn;
      const n = await Promise.resolve(e(t));
      return async () => n();
    }, [t, e]),
    Pn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Ye(() => () => {
    r !== Pn && r();
  }, [r]);
}, fm = J.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "div",
    {
      ref: r,
      className: G(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
fm.displayName = "Card";
const hm = J.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "div",
    {
      ref: r,
      className: G("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
hm.displayName = "CardHeader";
const mm = J.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "h3",
    {
      ref: r,
      className: G("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
mm.displayName = "CardTitle";
const gm = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("p", { ref: r, className: G("pr-text-sm pr-text-muted-foreground", e), ...t }));
gm.displayName = "CardDescription";
const bm = J.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: G("pr-p-6 pr-pt-0", e), ...t })
);
bm.displayName = "CardContent";
const vm = J.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: G("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
vm.displayName = "CardFooter";
const ym = Xn(
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
), wm = J.forwardRef(({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ d("div", { ref: n, role: "alert", className: G(ym({ variant: t }), e), ...r }));
wm.displayName = "Alert";
const xm = J.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ U(
    "h5",
    {
      ref: r,
      className: G("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
xm.displayName = "AlertTitle";
const Em = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: G("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
Em.displayName = "AlertDescription";
const Tm = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ U(
  nr.Root,
  {
    ref: r,
    className: G(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ d(nr.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ d(nr.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ d(nr.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
Tm.displayName = nr.Root.displayName;
const km = J.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Rn.Root,
  {
    className: G(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ d(
      Rn.Thumb,
      {
        className: G(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
km.displayName = Rn.Root.displayName;
function Nm(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && n ? r.insertBefore(o, n) : r.appendChild(o);
}
Nm(`/*
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
`, "top");
export {
  wm as Alert,
  Em as AlertDescription,
  xm as AlertTitle,
  Hm as BookChapterControl,
  ke as Button,
  fm as Card,
  bm as CardContent,
  gm as CardDescription,
  vm as CardFooter,
  hm as CardHeader,
  mm as CardTitle,
  Xm as ChapterRangeSelector,
  ng as CharacterInventory,
  ec as Checkbox,
  qm as Checklist,
  Xo as ComboBox,
  Ym as ContextMenu,
  Ql as DataTable,
  ti as DropdownMenu,
  ni as DropdownMenuCheckboxItem,
  Kn as DropdownMenuContent,
  Vm as DropdownMenuGroup,
  ri as DropdownMenuItem,
  Jr as DropdownMenuLabel,
  Fm as DropdownMenuPortal,
  Um as DropdownMenuRadioGroup,
  Ml as DropdownMenuRadioItem,
  Jn as DropdownMenuSeparator,
  Il as DropdownMenuShortcut,
  zm as DropdownMenuSub,
  _l as DropdownMenuSubContent,
  $l as DropdownMenuSubTrigger,
  Rl as DropdownMenuTrigger,
  sh as GridMenu,
  em as HamburgerMenuButton,
  Gm as IconButton,
  Zr as Input,
  It as LabelPosition,
  es as MenuItem,
  Km as SearchBar,
  $n as Select,
  Fr as SelectContent,
  Wm as SelectGroup,
  rt as SelectItem,
  Gl as SelectLabel,
  ai as SelectScrollDownButton,
  oi as SelectScrollUpButton,
  Kl as SelectSeparator,
  Vr as SelectTrigger,
  _n as SelectValue,
  Tm as ShadCnSlider,
  km as ShadCnSwitch,
  Jm as Slider,
  Zm as Snackbar,
  Qm as Switch,
  Zn as Table,
  eo as TableBody,
  ql as TableCaption,
  dr as TableCell,
  Xl as TableFooter,
  Lr as TableHead,
  Qn as TableHeader,
  Dt as TableRow,
  tg as Tabs,
  am as TabsContent,
  nm as TabsList,
  om as TabsTrigger,
  rm as TextField,
  eg as Toolbar,
  im as VerticalTabs,
  lm as VerticalTabsContent,
  sm as VerticalTabsList,
  rg as VerticalTabsTrigger,
  Yl as buttonVariants,
  og as useEvent,
  ag as useEventAsync,
  Hn as usePromise
};
//# sourceMappingURL=index.js.map
