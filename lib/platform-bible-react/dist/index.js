import ol, { jsxs as te, jsx as b, Fragment as rr } from "react/jsx-runtime";
import * as E from "react";
import ie, { forwardRef as rs, useCallback as Me, useState as Ee, useRef as Tt, useEffect as Yt, useLayoutEffect as ei, useMemo as ao } from "react";
import { getChaptersForBook as il } from "platform-bible-utils";
import * as he from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as sl } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as al, Check as os, Circle as ll, History as ul, ArrowDownWideNarrow as cl, Clock as pl, Bookmark as dl, ChevronDown as is, ChevronUp as fl, ArrowLeftIcon as gl, ChevronLeftIcon as ml, ChevronRightIcon as hl, ArrowRightIcon as vl, FilterIcon as wl } from "lucide-react";
import Pe, { clsx as bl } from "clsx";
import { twMerge as yl } from "tailwind-merge";
import { Slot as xl } from "@radix-ui/react-slot";
import { cva as ss } from "class-variance-authority";
import * as ye from "@radix-ui/react-select";
import { Autocomplete as Sl, TextField as El, FormControlLabel as ti, FormLabel as Cl, Checkbox as Rl, MenuItem as Tl, ListItemText as Pl, ListItemIcon as as, Menu as Ol, Grid as ls, List as kl, IconButton as us, Drawer as Nl, Slider as _l, Snackbar as $l, Switch as Ml, AppBar as Il, Toolbar as Al } from "@mui/material";
import Fl, { ThemeContext as Dl, internal_processStyles as Vl } from "@mui/styled-engine";
import * as Ll from "react-dom";
import An from "react-dom";
import * as cs from "@radix-ui/react-label";
import * as Fe from "@radix-ui/react-tabs";
var Bl = Object.defineProperty, jl = (e, t, n) => t in e ? Bl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, se = (e, t, n) => jl(e, typeof t != "symbol" ? t + "" : t, n);
const Ot = [
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
], lo = [
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
], ps = [
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
], ni = Jl();
function Kt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ni ? ni[e] : 0;
}
function uo(e) {
  return Kt(e) > 0;
}
function zl(e) {
  const t = typeof e == "string" ? Kt(e) : e;
  return t >= 40 && t <= 66;
}
function Hl(e) {
  return (typeof e == "string" ? Kt(e) : e) <= 39;
}
function ds(e) {
  return e <= 66;
}
function Gl(e) {
  const t = typeof e == "string" ? Kt(e) : e;
  return ms(t) && !ds(t);
}
function* Ul() {
  for (let e = 1; e <= Ot.length; e++)
    yield e;
}
const ql = 1, fs = Ot.length;
function Wl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function co(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Ot.length ? t : Ot[n];
}
function gs(e) {
  return e <= 0 || e > fs ? "******" : ps[e - 1];
}
function Xl(e) {
  return gs(Kt(e));
}
function ms(e) {
  const t = typeof e == "number" ? co(e) : e;
  return uo(t) && !lo.includes(t);
}
function Yl(e) {
  const t = typeof e == "number" ? co(e) : e;
  return uo(t) && lo.includes(t);
}
function Kl(e) {
  return ps[e - 1].includes("*obsolete*");
}
function Jl() {
  const e = {};
  for (let t = 0; t < Ot.length; t++)
    e[Ot[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: Ot,
  nonCanonicalIds: lo,
  bookIdToNumber: Kt,
  isBookIdValid: uo,
  isBookNT: zl,
  isBookOT: Hl,
  isBookOTNT: ds,
  isBookDC: Gl,
  allBookNumbers: Ul,
  firstBook: ql,
  lastBook: fs,
  extraBooks: Wl,
  bookNumberToId: co,
  bookNumberToEnglishName: gs,
  bookIdToEnglishName: Xl,
  isCanonical: ms,
  isExtraMaterial: Yl,
  isObsolete: Kl
};
var Je = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Je || {});
const Le = class {
  // private versInfo: Versification;
  constructor(t) {
    if (se(this, "name"), se(this, "fullPath"), se(this, "isPresent"), se(this, "hasVerseSegments"), se(this, "isCustomized"), se(this, "baseVersification"), se(this, "scriptureBooks"), se(this, "_type"), t == null)
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
se(Le, "Original", new Le(Je.Original)), se(Le, "Septuagint", new Le(Je.Septuagint)), se(Le, "Vulgate", new Le(Je.Vulgate)), se(Le, "English", new Le(Je.English)), se(Le, "RussianProtestant", new Le(Je.RussianProtestant)), se(Le, "RussianOrthodox", new Le(Je.RussianOrthodox));
let St = Le;
function ri(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var hs = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(hs || {});
const $e = class ue {
  constructor(t, n, r, o) {
    if (se(this, "firstChapter"), se(this, "lastChapter"), se(this, "lastVerse"), se(this, "hasSegmentsDefined"), se(this, "text"), se(this, "BBBCCCVVVS"), se(this, "longHashCode"), se(this, "versification"), se(this, "rtlMark", "‏"), se(this, "_bookNum", 0), se(this, "_chapterNum", 0), se(this, "_verseNum", 0), se(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof St ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof St ? n : void 0;
        this.setEmpty(i), this._verseNum = t % ue.chapterDigitShifter, this._chapterNum = Math.floor(
          t % ue.bookDigitShifter / ue.chapterDigitShifter
        ), this._bookNum = Math.floor(t / ue.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof ue) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null)
            return;
          const i = t instanceof St ? t : ue.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? ue.defaultVersification;
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
      return n = new ue(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof rn)
        return n = new ue(), { success: !1, verseRef: n };
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
    return t % ue.bcvMaxValue * ue.bookDigitShifter + (n >= 0 ? n % ue.bcvMaxValue * ue.chapterDigitShifter : 0) + (r >= 0 ? r % ue.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: o, verse: i, versificationStr: s } = t, a = i || o.toString();
    let u;
    return s && (u = new St(s)), n ? new ue(n, r.toString(), a, u) : new ue();
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
      if (n = n * 10 + +r - 0, n > ue.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(ue.verseRangeSeparator) || this._verse.includes(ue.verseSequenceIndicator));
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
    const { success: n, vNum: r } = ue.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ue.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > me.lastBook)
      throw new rn(
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
    return this.validateVerse(ue.verseRangeSeparators, ue.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return ue.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return ue.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new St(Je[s]);
        } catch {
          throw new rn("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new rn("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || me.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ue.isVerseParseable(r[1]))
      throw new rn("Invalid reference : " + t);
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
    return new ue(this);
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
    return t instanceof ue ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, n = ue.verseRangeSeparators, r = ue.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = ri(this._verse, r);
    for (const s of i.map((a) => ri(a, n))) {
      const a = this.clone();
      a.verse = s[0];
      const u = a.verseNum;
      if (o.push(a), s.length > 1) {
        const c = this.clone();
        if (c.verse = s[1], !t)
          for (let p = u + 1; p < c.verseNum; p++) {
            const g = new ue(
              this._bookNum,
              this._chapterNum,
              p,
              this.versification
            );
            this.isExcluded || o.push(g);
          }
        o.push(c);
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
  setEmpty(t = ue.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = me.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
se($e, "defaultVersification", St.English), se($e, "verseRangeSeparator", "-"), se($e, "verseSequenceIndicator", ","), se($e, "verseRangeSeparators", [$e.verseRangeSeparator]), se($e, "verseSequenceIndicators", [$e.verseSequenceIndicator]), se($e, "chapterDigitShifter", 1e3), se($e, "bookDigitShifter", $e.chapterDigitShifter * $e.chapterDigitShifter), se($e, "bcvMaxValue", $e.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
se($e, "ValidStatusType", hs);
class rn extends Error {
}
function re(...e) {
  return yl(bl(e));
}
const vs = he.Root, Zl = he.Trigger, zh = he.Group, Hh = he.Portal, Gh = he.Sub, Uh = he.RadioGroup, Ql = ie.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ te(
  he.SubTrigger,
  {
    ref: o,
    className: re(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ b(al, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Ql.displayName = he.SubTrigger.displayName;
const eu = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  he.SubContent,
  {
    ref: n,
    className: re(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
eu.displayName = he.SubContent.displayName;
const po = ie.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ b(he.Portal, { children: /* @__PURE__ */ b(
  he.Content,
  {
    ref: r,
    sideOffset: t,
    className: re(
      /* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
po.displayName = he.Content.displayName;
const ws = ie.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ b(
  he.Item,
  {
    ref: r,
    className: re(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
ws.displayName = he.Item.displayName;
const bs = ie.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ te(
  he.CheckboxItem,
  {
    ref: o,
    className: re(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ b("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ b(he.ItemIndicator, { children: /* @__PURE__ */ b(os, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
bs.displayName = he.CheckboxItem.displayName;
const tu = ie.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ te(
  he.RadioItem,
  {
    ref: r,
    className: re(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ b("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ b(he.ItemIndicator, { children: /* @__PURE__ */ b(ll, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
tu.displayName = he.RadioItem.displayName;
const or = ie.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ b(
  he.Label,
  {
    ref: r,
    className: re("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
or.displayName = he.Label.displayName;
const fo = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  he.Separator,
  {
    ref: n,
    className: re("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
fo.displayName = he.Separator.displayName;
function nu({ className: e, ...t }) {
  return /* @__PURE__ */ b(
    "span",
    {
      className: re("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
nu.displayName = "DropdownMenuShortcut";
const go = ie.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ b(
    "input",
    {
      type: t,
      className: re(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
go.displayName = "Input";
const ru = rs(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ te("div", { className: "pr-relative", children: [
    /* @__PURE__ */ b(
      go,
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
    /* @__PURE__ */ b(
      ul,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function ou({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (a, u) => u + 1), s = Me(
    (a) => {
      o(a);
    },
    [o]
  );
  return /* @__PURE__ */ b("div", { className: re("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((a) => /* @__PURE__ */ b(
    "div",
    {
      className: re(
        "pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
        {
          "pr-font-semibold pr-text-amber-900": a === n,
          "pr-bg-amber-200": a === r
        }
      ),
      onClick: (u) => {
        u.preventDefault(), u.stopPropagation(), e(a);
      },
      role: "button",
      onKeyDown: (u) => {
        u.key === "Enter" && e(a);
      },
      tabIndex: 0,
      onMouseMove: () => s(a),
      children: a
    },
    a
  )) });
}
const iu = rs(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, a) => /* @__PURE__ */ te(
    ws,
    {
      ref: a,
      textValue: e,
      className: re("pr-font-normal pr-text-slate-700", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100": n
      }),
      onSelect: (u) => {
        u.preventDefault(), t();
      },
      onKeyDown: (u) => {
        o(u);
      },
      onFocus: r,
      onMouseMove: r,
      children: [
        /* @__PURE__ */ b(
          "span",
          {
            className: re(
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
        n && /* @__PURE__ */ b("div", { children: s })
      ]
    },
    e
  )
);
function su({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ te(or, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ b("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ te("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ b(
        cl,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ b(
        pl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ b(
        dl,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const gn = me.allBookIds, au = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, oi = ["OT", "NT", "DC"], lu = 32 + 32 + 32, uu = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], cu = (e) => ({
  OT: gn.filter((n) => me.isBookOT(n)),
  NT: gn.filter((n) => me.isBookNT(n)),
  DC: gn.filter((n) => me.isBookDC(n))
})[e], on = (e) => il(me.bookIdToNumber(e));
function pu() {
  return gn.map((t) => me.bookIdToEnglishName(t));
}
function du(e) {
  return pu().includes(e);
}
function fu(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (du(t))
    return gn.find((r) => me.bookIdToEnglishName(r) === t);
}
function qh({ scrRef: e, handleSubmit: t }) {
  const [n, r] = Ee(""), [o, i] = Ee(
    me.bookNumberToId(e.bookNum)
  ), [s, a] = Ee(e.chapterNum ?? 0), [u, c] = Ee(
    me.bookNumberToId(e.bookNum)
  ), [p, g] = Ee(!1), [f, d] = Ee(p), h = Tt(void 0), m = Tt(void 0), v = Tt(void 0), y = Me(
    (P) => cu(P).filter(($) => {
      const M = me.bookIdToEnglishName($).toLowerCase(), L = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return M.includes(L) || // Match book name
      $.toLowerCase().includes(L);
    }),
    [n]
  ), O = (P) => {
    r(P);
  }, x = Tt(!1), S = Me((P) => {
    if (x.current) {
      x.current = !1;
      return;
    }
    g(P);
  }, []), w = Me(
    (P, $, M, L) => {
      if (a(
        me.bookNumberToId(e.bookNum) !== P ? 1 : e.chapterNum
      ), $ || on(P) === -1) {
        t({
          bookNum: me.bookIdToNumber(P),
          chapterNum: M || 1,
          verseNum: L || 1
        }), g(!1), r("");
        return;
      }
      i(o !== P ? P : ""), g(!$);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), T = (P) => {
    P <= 0 || P > on(o) || w(o, !0, P);
  }, k = Me(() => {
    uu.forEach((P) => {
      const $ = n.match(P);
      if ($) {
        const [M, L = void 0, B = void 0] = $.slice(1), _ = fu(M);
        (me.isBookIdValid(M) || _) && w(
          _ ?? M,
          !0,
          L ? parseInt(L, 10) : 1,
          B ? parseInt(B, 10) : 1
        );
      }
    });
  }, [w, n]), F = Me(
    (P) => {
      p ? (P.key === "ArrowDown" || P.key === "ArrowUp") && (typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null ? v.current.focus() : typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null && m.current.focus(), P.preventDefault()) : g(!0);
    },
    [p]
  ), D = (P) => {
    const { key: $ } = P;
    $ === "ArrowRight" || $ === "ArrowLeft" || $ === "ArrowDown" || $ === "ArrowUp" || $ === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: $ })), h.current.focus());
  }, V = (P) => {
    const { key: $ } = P;
    if (u === o) {
      if ($ === "Enter") {
        P.preventDefault(), w(o, !0, s);
        return;
      }
      let M = 0;
      if ($ === "ArrowRight")
        if (s < on(u))
          M = 1;
        else {
          P.preventDefault();
          return;
        }
      else if ($ === "ArrowLeft")
        if (s > 1)
          M = -1;
        else {
          P.preventDefault();
          return;
        }
      else
        $ === "ArrowDown" ? M = 6 : $ === "ArrowUp" && (M = -6);
      s + M <= 0 || s + M > on(u) ? a(0) : M !== 0 && (a(s + M), P.preventDefault());
    }
  };
  return Yt(() => {
    o === u ? o === me.bookNumberToId(e.bookNum) ? a(e.chapterNum) : a(1) : a(0);
  }, [u, e.bookNum, e.chapterNum, o]), ei(() => {
    d(p);
  }, [p]), ei(() => {
    const P = setTimeout(() => {
      if (f && m.current && v.current) {
        const M = v.current.offsetTop - lu;
        m.current.scrollTo({ top: M, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(P);
    };
  }, [f]), /* @__PURE__ */ b("div", { className: "pr-flex", children: /* @__PURE__ */ te(vs, { modal: !1, open: p, onOpenChange: S, children: [
    /* @__PURE__ */ b(Zl, { asChild: !0, children: /* @__PURE__ */ b(
      ru,
      {
        ref: h,
        value: n,
        handleSearch: O,
        handleKeyDown: F,
        handleOnClick: () => {
          i(me.bookNumberToId(e.bookNum)), c(me.bookNumberToId(e.bookNum)), a(e.chapterNum > 0 ? e.chapterNum : 0), g(!0), h.current.focus();
        },
        onFocus: () => {
          x.current = !0;
        },
        handleSubmit: k,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ te(
      po,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: D,
        align: "start",
        ref: m,
        children: [
          /* @__PURE__ */ b(
            su,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          oi.map(
            (P, $) => y(P).length > 0 && /* @__PURE__ */ te("div", { children: [
              /* @__PURE__ */ b(or, { className: "pr-font-semibold pr-text-slate-700", children: au[P] }),
              y(P).map((M) => /* @__PURE__ */ b("div", { children: /* @__PURE__ */ b(
                iu,
                {
                  bookId: M,
                  handleSelectBook: () => w(M, !1),
                  isSelected: o === M,
                  handleHighlightBook: () => c(M),
                  handleKeyDown: V,
                  bookType: P,
                  ref: (L) => {
                    o === M && (v.current = L);
                  },
                  children: /* @__PURE__ */ b(
                    ou,
                    {
                      handleSelectChapter: T,
                      endChapter: on(M),
                      activeChapter: e.bookNum === me.bookIdToNumber(M) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (L) => {
                        a(L);
                      }
                    }
                  )
                }
              ) }, M)),
              oi.length - 1 !== $ ? /* @__PURE__ */ b(fo, {}) : void 0
            ] }, P)
          )
        ]
      }
    )
  ] }) });
}
/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function ft(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function je(e, t) {
  return (n) => {
    t.setState((r) => ({
      ...r,
      [e]: ft(n, r[e])
    }));
  };
}
function ir(e) {
  return e instanceof Function;
}
function gu(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function mu(e, t) {
  const n = [], r = (o) => {
    o.forEach((i) => {
      n.push(i);
      const s = t(i);
      s != null && s.length && r(s);
    });
  };
  return r(e), n;
}
function Y(e, t, n) {
  let r = [], o;
  return (i) => {
    let s;
    n.key && n.debug && (s = Date.now());
    const a = e(i);
    if (!(a.length !== r.length || a.some((p, g) => r[g] !== p)))
      return o;
    r = a;
    let c;
    if (n.key && n.debug && (c = Date.now()), o = t(...a), n == null || n.onChange == null || n.onChange(o), n.key && n.debug && n != null && n.debug()) {
      const p = Math.round((Date.now() - s) * 100) / 100, g = Math.round((Date.now() - c) * 100) / 100, f = g / 16, d = (h, m) => {
        for (h = String(h); h.length < m; )
          h = " " + h;
        return h;
      };
      console.info(`%c⏱ ${d(g, 5)} /${d(p, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * f, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
    }
    return o;
  };
}
function K(e, t, n, r) {
  return {
    debug: () => {
      var o;
      return (o = e == null ? void 0 : e.debugAll) != null ? o : e[t];
    },
    key: process.env.NODE_ENV === "development" && n,
    onChange: r
  };
}
function hu(e, t, n, r) {
  const o = () => {
    var s;
    return (s = i.getValue()) != null ? s : e.options.renderFallbackValue;
  }, i = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: o,
    getContext: Y(() => [e, n, t, i], (s, a, u, c) => ({
      table: s,
      column: a,
      row: u,
      cell: c,
      getValue: c.getValue,
      renderValue: c.renderValue
    }), K(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((s) => {
    s.createCell == null || s.createCell(i, n, t, e);
  }, {}), i;
}
function vu(e, t, n, r) {
  var o, i;
  const a = {
    ...e._getDefaultColumnDef(),
    ...t
  }, u = a.accessorKey;
  let c = (o = (i = a.id) != null ? i : u ? u.replace(".", "_") : void 0) != null ? o : typeof a.header == "string" ? a.header : void 0, p;
  if (a.accessorFn ? p = a.accessorFn : u && (u.includes(".") ? p = (f) => {
    let d = f;
    for (const m of u.split(".")) {
      var h;
      d = (h = d) == null ? void 0 : h[m], process.env.NODE_ENV !== "production" && d === void 0 && console.warn(`"${m}" in deeply nested key "${u}" returned undefined.`);
    }
    return d;
  } : p = (f) => f[a.accessorKey]), !c)
    throw process.env.NODE_ENV !== "production" ? new Error(a.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let g = {
    id: `${String(c)}`,
    accessorFn: p,
    parent: r,
    depth: n,
    columnDef: a,
    columns: [],
    getFlatColumns: Y(() => [!0], () => {
      var f;
      return [g, ...(f = g.columns) == null ? void 0 : f.flatMap((d) => d.getFlatColumns())];
    }, K(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: Y(() => [e._getOrderColumnsFn()], (f) => {
      var d;
      if ((d = g.columns) != null && d.length) {
        let h = g.columns.flatMap((m) => m.getLeafColumns());
        return f(h);
      }
      return [g];
    }, K(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const f of e._features)
    f.createColumn == null || f.createColumn(g, e);
  return g;
}
const Te = "debugHeaders";
function ii(e, t, n) {
  var r;
  let i = {
    id: (r = n.id) != null ? r : t.id,
    column: t,
    index: n.index,
    isPlaceholder: !!n.isPlaceholder,
    placeholderId: n.placeholderId,
    depth: n.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const s = [], a = (u) => {
        u.subHeaders && u.subHeaders.length && u.subHeaders.map(a), s.push(u);
      };
      return a(i), s;
    },
    getContext: () => ({
      table: e,
      header: i,
      column: t
    })
  };
  return e._features.forEach((s) => {
    s.createHeader == null || s.createHeader(i, e);
  }), i;
}
const wu = {
  createTable: (e) => {
    e.getHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, s;
      const a = (i = r == null ? void 0 : r.map((g) => n.find((f) => f.id === g)).filter(Boolean)) != null ? i : [], u = (s = o == null ? void 0 : o.map((g) => n.find((f) => f.id === g)).filter(Boolean)) != null ? s : [], c = n.filter((g) => !(r != null && r.includes(g.id)) && !(o != null && o.includes(g.id)));
      return Fn(t, [...a, ...c, ...u], e);
    }, K(e.options, Te, "getHeaderGroups")), e.getCenterHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), Fn(t, n, e, "center")), K(e.options, Te, "getCenterHeaderGroups")), e.getLeftHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return Fn(t, i, e, "left");
    }, K(e.options, Te, "getLeftHeaderGroups")), e.getRightHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return Fn(t, i, e, "right");
    }, K(e.options, Te, "getRightHeaderGroups")), e.getFooterGroups = Y(() => [e.getHeaderGroups()], (t) => [...t].reverse(), K(e.options, Te, "getFooterGroups")), e.getLeftFooterGroups = Y(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), K(e.options, Te, "getLeftFooterGroups")), e.getCenterFooterGroups = Y(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), K(e.options, Te, "getCenterFooterGroups")), e.getRightFooterGroups = Y(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), K(e.options, Te, "getRightFooterGroups")), e.getFlatHeaders = Y(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), K(e.options, Te, "getFlatHeaders")), e.getLeftFlatHeaders = Y(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), K(e.options, Te, "getLeftFlatHeaders")), e.getCenterFlatHeaders = Y(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), K(e.options, Te, "getCenterFlatHeaders")), e.getRightFlatHeaders = Y(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), K(e.options, Te, "getRightFlatHeaders")), e.getCenterLeafHeaders = Y(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), K(e.options, Te, "getCenterLeafHeaders")), e.getLeftLeafHeaders = Y(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), K(e.options, Te, "getLeftLeafHeaders")), e.getRightLeafHeaders = Y(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), K(e.options, Te, "getRightLeafHeaders")), e.getLeafHeaders = Y(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var o, i, s, a, u, c;
      return [...(o = (i = t[0]) == null ? void 0 : i.headers) != null ? o : [], ...(s = (a = n[0]) == null ? void 0 : a.headers) != null ? s : [], ...(u = (c = r[0]) == null ? void 0 : c.headers) != null ? u : []].map((p) => p.getLeafHeaders()).flat();
    }, K(e.options, Te, "getLeafHeaders"));
  }
};
function Fn(e, t, n, r) {
  var o, i;
  let s = 0;
  const a = function(f, d) {
    d === void 0 && (d = 1), s = Math.max(s, d), f.filter((h) => h.getIsVisible()).forEach((h) => {
      var m;
      (m = h.columns) != null && m.length && a(h.columns, d + 1);
    }, 0);
  };
  a(e);
  let u = [];
  const c = (f, d) => {
    const h = {
      depth: d,
      id: [r, `${d}`].filter(Boolean).join("_"),
      headers: []
    }, m = [];
    f.forEach((v) => {
      const y = [...m].reverse()[0], O = v.column.depth === h.depth;
      let x, S = !1;
      if (O && v.column.parent ? x = v.column.parent : (x = v.column, S = !0), y && (y == null ? void 0 : y.column) === x)
        y.subHeaders.push(v);
      else {
        const w = ii(n, x, {
          id: [r, d, x.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: S,
          placeholderId: S ? `${m.filter((T) => T.column === x).length}` : void 0,
          depth: d,
          index: m.length
        });
        w.subHeaders.push(v), m.push(w);
      }
      h.headers.push(v), v.headerGroup = h;
    }), u.push(h), d > 0 && c(m, d - 1);
  }, p = t.map((f, d) => ii(n, f, {
    depth: s,
    index: d
  }));
  c(p, s - 1), u.reverse();
  const g = (f) => f.filter((h) => h.column.getIsVisible()).map((h) => {
    let m = 0, v = 0, y = [0];
    h.subHeaders && h.subHeaders.length ? (y = [], g(h.subHeaders).forEach((x) => {
      let {
        colSpan: S,
        rowSpan: w
      } = x;
      m += S, y.push(w);
    })) : m = 1;
    const O = Math.min(...y);
    return v = v + O, h.colSpan = m, h.rowSpan = v, {
      colSpan: m,
      rowSpan: v
    };
  });
  return g((o = (i = u[0]) == null ? void 0 : i.headers) != null ? o : []), u;
}
const mo = (e, t, n, r, o, i, s) => {
  let a = {
    id: t,
    index: r,
    original: n,
    depth: o,
    parentId: s,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (u) => {
      if (a._valuesCache.hasOwnProperty(u))
        return a._valuesCache[u];
      const c = e.getColumn(u);
      if (c != null && c.accessorFn)
        return a._valuesCache[u] = c.accessorFn(a.original, r), a._valuesCache[u];
    },
    getUniqueValues: (u) => {
      if (a._uniqueValuesCache.hasOwnProperty(u))
        return a._uniqueValuesCache[u];
      const c = e.getColumn(u);
      if (c != null && c.accessorFn)
        return c.columnDef.getUniqueValues ? (a._uniqueValuesCache[u] = c.columnDef.getUniqueValues(a.original, r), a._uniqueValuesCache[u]) : (a._uniqueValuesCache[u] = [a.getValue(u)], a._uniqueValuesCache[u]);
    },
    renderValue: (u) => {
      var c;
      return (c = a.getValue(u)) != null ? c : e.options.renderFallbackValue;
    },
    subRows: i ?? [],
    getLeafRows: () => mu(a.subRows, (u) => u.subRows),
    getParentRow: () => a.parentId ? e.getRow(a.parentId, !0) : void 0,
    getParentRows: () => {
      let u = [], c = a;
      for (; ; ) {
        const p = c.getParentRow();
        if (!p)
          break;
        u.push(p), c = p;
      }
      return u.reverse();
    },
    getAllCells: Y(() => [e.getAllLeafColumns()], (u) => u.map((c) => hu(e, a, c, c.id)), K(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: Y(() => [a.getAllCells()], (u) => u.reduce((c, p) => (c[p.column.id] = p, c), {}), K(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let u = 0; u < e._features.length; u++) {
    const c = e._features[u];
    c == null || c.createRow == null || c.createRow(a, e);
  }
  return a;
}, bu = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, ys = (e, t, n) => {
  var r;
  const o = n.toLowerCase();
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null || (r = r.toLowerCase()) == null) && r.includes(o));
};
ys.autoRemove = (e) => Ke(e);
const xs = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
xs.autoRemove = (e) => Ke(e);
const Ss = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
Ss.autoRemove = (e) => Ke(e);
const Es = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
Es.autoRemove = (e) => Ke(e) || !(e != null && e.length);
const Cs = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
Cs.autoRemove = (e) => Ke(e) || !(e != null && e.length);
const Rs = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Rs.autoRemove = (e) => Ke(e) || !(e != null && e.length);
const Ts = (e, t, n) => e.getValue(t) === n;
Ts.autoRemove = (e) => Ke(e);
const Ps = (e, t, n) => e.getValue(t) == n;
Ps.autoRemove = (e) => Ke(e);
const ho = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
ho.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, s = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > s) {
    const a = i;
    i = s, s = a;
  }
  return [i, s];
};
ho.autoRemove = (e) => Ke(e) || Ke(e[0]) && Ke(e[1]);
const it = {
  includesString: ys,
  includesStringSensitive: xs,
  equalsString: Ss,
  arrIncludes: Es,
  arrIncludesAll: Cs,
  arrIncludesSome: Rs,
  equals: Ts,
  weakEquals: Ps,
  inNumberRange: ho
};
function Ke(e) {
  return e == null || e === "";
}
const yu = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: je("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      return typeof r == "string" ? it.includesString : typeof r == "number" ? it.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? it.equals : Array.isArray(r) ? it.arrIncludes : it.weakEquals;
    }, e.getFilterFn = () => {
      var n, r;
      return ir(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (r = t.options.filterFns) == null ? void 0 : r[e.columnDef.filterFn]) != null ? n : it[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var n, r, o;
      return ((n = e.columnDef.enableColumnFilter) != null ? n : !0) && ((r = t.options.enableColumnFilters) != null ? r : !0) && ((o = t.options.enableFilters) != null ? o : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var n;
      return (n = t.getState().columnFilters) == null || (n = n.find((r) => r.id === e.id)) == null ? void 0 : n.value;
    }, e.getFilterIndex = () => {
      var n, r;
      return (n = (r = t.getState().columnFilters) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? n : -1;
    }, e.setFilterValue = (n) => {
      t.setColumnFilters((r) => {
        const o = e.getFilterFn(), i = r == null ? void 0 : r.find((p) => p.id === e.id), s = ft(n, i ? i.value : void 0);
        if (si(o, s, e)) {
          var a;
          return (a = r == null ? void 0 : r.filter((p) => p.id !== e.id)) != null ? a : [];
        }
        const u = {
          id: e.id,
          value: s
        };
        if (i) {
          var c;
          return (c = r == null ? void 0 : r.map((p) => p.id === e.id ? u : p)) != null ? c : [];
        }
        return r != null && r.length ? [...r, u] : [u];
      });
    };
  },
  createRow: (e, t) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (t) => {
      const n = e.getAllLeafColumns(), r = (o) => {
        var i;
        return (i = ft(t, o)) == null ? void 0 : i.filter((s) => {
          const a = n.find((u) => u.id === s.id);
          if (a) {
            const u = a.getFilterFn();
            if (si(u, s.value, a))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(r);
    }, e.resetColumnFilters = (t) => {
      var n, r;
      e.setColumnFilters(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.columnFilters) != null ? n : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function si(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const xu = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), Su = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, Eu = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, Cu = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const s = i.getValue(e);
    s != null && (r === void 0 ? s >= s && (r = o = s) : (r > s && (r = s), o < s && (o = s)));
  }), [r, o];
}, Ru = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n)
    return r / n;
}, Tu = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!gu(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, s) => i - s);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, Pu = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), Ou = (e, t) => new Set(t.map((n) => n.getValue(e))).size, ku = (e, t) => t.length, Er = {
  sum: xu,
  min: Su,
  max: Eu,
  extent: Cu,
  mean: Ru,
  median: Tu,
  unique: Pu,
  uniqueCount: Ou,
  count: ku
}, Nu = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var t, n;
      return (t = (n = e.getValue()) == null || n.toString == null ? void 0 : n.toString()) != null ? t : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: je("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, t) => {
    e.toggleGrouping = () => {
      t.setGrouping((n) => n != null && n.includes(e.id) ? n.filter((r) => r !== e.id) : [...n ?? [], e.id]);
    }, e.getCanGroup = () => {
      var n, r;
      return ((n = e.columnDef.enableGrouping) != null ? n : !0) && ((r = t.options.enableGrouping) != null ? r : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
    }, e.getIsGrouped = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.includes(e.id);
    }, e.getGroupedIndex = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const n = e.getCanGroup();
      return () => {
        n && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      if (typeof r == "number")
        return Er.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return Er.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return ir(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : Er[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (t) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(t), e.resetGrouping = (t) => {
      var n, r;
      e.setGrouping(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.grouping) != null ? n : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, t) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (n) => {
      if (e._groupingValuesCache.hasOwnProperty(n))
        return e._groupingValuesCache[n];
      const r = t.getColumn(n);
      return r != null && r.columnDef.getGroupingValue ? (e._groupingValuesCache[n] = r.columnDef.getGroupingValue(e.original), e._groupingValuesCache[n]) : e.getValue(n);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, t, n, r) => {
    e.getIsGrouped = () => t.getIsGrouped() && t.id === n.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && t.getIsGrouped(), e.getIsAggregated = () => {
      var o;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((o = n.subRows) != null && o.length);
    };
  }
};
function _u(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((s) => s.id === i)).filter(Boolean), ...r];
}
const $u = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: je("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = Y((n) => [mn(t, n)], (n) => n.findIndex((r) => r.id === e.id), K(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = mn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const o = mn(t, n);
      return ((r = o[o.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = Y(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (o) => {
      let i = [];
      if (!(t != null && t.length))
        i = o;
      else {
        const s = [...t], a = [...o];
        for (; a.length && s.length; ) {
          const u = s.shift(), c = a.findIndex((p) => p.id === u);
          c > -1 && i.push(a.splice(c, 1)[0]);
        }
        i = [...i, ...a];
      }
      return _u(i, n, r);
    }, K(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Cr = () => ({
  left: [],
  right: []
}), Mu = {
  getInitialState: (e) => ({
    columnPinning: Cr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: je("columnPinning", e)
  }),
  createColumn: (e, t) => {
    e.pin = (n) => {
      const r = e.getLeafColumns().map((o) => o.id).filter(Boolean);
      t.setColumnPinning((o) => {
        var i, s;
        if (n === "right") {
          var a, u;
          return {
            left: ((a = o == null ? void 0 : o.left) != null ? a : []).filter((g) => !(r != null && r.includes(g))),
            right: [...((u = o == null ? void 0 : o.right) != null ? u : []).filter((g) => !(r != null && r.includes(g))), ...r]
          };
        }
        if (n === "left") {
          var c, p;
          return {
            left: [...((c = o == null ? void 0 : o.left) != null ? c : []).filter((g) => !(r != null && r.includes(g))), ...r],
            right: ((p = o == null ? void 0 : o.right) != null ? p : []).filter((g) => !(r != null && r.includes(g)))
          };
        }
        return {
          left: ((i = o == null ? void 0 : o.left) != null ? i : []).filter((g) => !(r != null && r.includes(g))),
          right: ((s = o == null ? void 0 : o.right) != null ? s : []).filter((g) => !(r != null && r.includes(g)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((r) => {
      var o, i, s;
      return ((o = r.columnDef.enablePinning) != null ? o : !0) && ((i = (s = t.options.enableColumnPinning) != null ? s : t.options.enablePinning) != null ? i : !0);
    }), e.getIsPinned = () => {
      const n = e.getLeafColumns().map((a) => a.id), {
        left: r,
        right: o
      } = t.getState().columnPinning, i = n.some((a) => r == null ? void 0 : r.includes(a)), s = n.some((a) => o == null ? void 0 : o.includes(a));
      return i ? "left" : s ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var n, r;
      const o = e.getIsPinned();
      return o ? (n = (r = t.getState().columnPinning) == null || (r = r[o]) == null ? void 0 : r.indexOf(e.id)) != null ? n : -1 : 0;
    };
  },
  createRow: (e, t) => {
    e.getCenterVisibleCells = Y(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return n.filter((s) => !i.includes(s.column.id));
    }, K(t.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = Y(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, r) => (r ?? []).map((i) => n.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), K(t.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = Y(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((i) => n.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), K(t.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, r;
      return e.setColumnPinning(t ? Cr() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : Cr());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const r = e.getState().columnPinning;
      if (!t) {
        var o, i;
        return !!((o = r.left) != null && o.length || (i = r.right) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e.getLeftLeafColumns = Y(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), K(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = Y(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), K(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = Y(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const o = [...n ?? [], ...r ?? []];
      return t.filter((i) => !o.includes(i.id));
    }, K(e.options, "debugColumns", "getCenterLeafColumns"));
  }
}, Dn = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Rr = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Iu = {
  getDefaultColumnDef: () => Dn,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Rr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: je("columnSizing", e),
    onColumnSizingInfoChange: je("columnSizingInfo", e)
  }),
  createColumn: (e, t) => {
    e.getSize = () => {
      var n, r, o;
      const i = t.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Dn.minSize, (r = i ?? e.columnDef.size) != null ? r : Dn.size), (o = e.columnDef.maxSize) != null ? o : Dn.maxSize);
    }, e.getStart = Y((n) => [n, mn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((o, i) => o + i.getSize(), 0), K(t.options, "debugColumns", "getStart")), e.getAfter = Y((n) => [n, mn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((o, i) => o + i.getSize(), 0), K(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
      t.setColumnSizing((n) => {
        let {
          [e.id]: r,
          ...o
        } = n;
        return o;
      });
    }, e.getCanResize = () => {
      var n, r;
      return ((n = e.columnDef.enableResizing) != null ? n : !0) && ((r = t.options.enableColumnResizing) != null ? r : !0);
    }, e.getIsResizing = () => t.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, t) => {
    e.getSize = () => {
      let n = 0;
      const r = (o) => {
        if (o.subHeaders.length)
          o.subHeaders.forEach(r);
        else {
          var i;
          n += (i = o.column.getSize()) != null ? i : 0;
        }
      };
      return r(e), n;
    }, e.getStart = () => {
      if (e.index > 0) {
        const n = e.headerGroup.headers[e.index - 1];
        return n.getStart() + n.getSize();
      }
      return 0;
    }, e.getResizeHandler = (n) => {
      const r = t.getColumn(e.column.id), o = r == null ? void 0 : r.getCanResize();
      return (i) => {
        if (!r || !o || (i.persist == null || i.persist(), Tr(i) && i.touches && i.touches.length > 1))
          return;
        const s = e.getSize(), a = e ? e.getLeafHeaders().map((y) => [y.column.id, y.column.getSize()]) : [[r.id, r.getSize()]], u = Tr(i) ? Math.round(i.touches[0].clientX) : i.clientX, c = {}, p = (y, O) => {
          typeof O == "number" && (t.setColumnSizingInfo((x) => {
            var S, w;
            const T = t.options.columnResizeDirection === "rtl" ? -1 : 1, k = (O - ((S = x == null ? void 0 : x.startOffset) != null ? S : 0)) * T, F = Math.max(k / ((w = x == null ? void 0 : x.startSize) != null ? w : 0), -0.999999);
            return x.columnSizingStart.forEach((D) => {
              let [V, P] = D;
              c[V] = Math.round(Math.max(P + P * F, 0) * 100) / 100;
            }), {
              ...x,
              deltaOffset: k,
              deltaPercentage: F
            };
          }), (t.options.columnResizeMode === "onChange" || y === "end") && t.setColumnSizing((x) => ({
            ...x,
            ...c
          })));
        }, g = (y) => p("move", y), f = (y) => {
          p("end", y), t.setColumnSizingInfo((O) => ({
            ...O,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, d = n || typeof document < "u" ? document : null, h = {
          moveHandler: (y) => g(y.clientX),
          upHandler: (y) => {
            d == null || d.removeEventListener("mousemove", h.moveHandler), d == null || d.removeEventListener("mouseup", h.upHandler), f(y.clientX);
          }
        }, m = {
          moveHandler: (y) => (y.cancelable && (y.preventDefault(), y.stopPropagation()), g(y.touches[0].clientX), !1),
          upHandler: (y) => {
            var O;
            d == null || d.removeEventListener("touchmove", m.moveHandler), d == null || d.removeEventListener("touchend", m.upHandler), y.cancelable && (y.preventDefault(), y.stopPropagation()), f((O = y.touches[0]) == null ? void 0 : O.clientX);
          }
        }, v = Au() ? {
          passive: !1
        } : !1;
        Tr(i) ? (d == null || d.addEventListener("touchmove", m.moveHandler, v), d == null || d.addEventListener("touchend", m.upHandler, v)) : (d == null || d.addEventListener("mousemove", h.moveHandler, v), d == null || d.addEventListener("mouseup", h.upHandler, v)), t.setColumnSizingInfo((y) => ({
          ...y,
          startOffset: u,
          startSize: s,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: a,
          isResizingColumn: r.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (t) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(t), e.setColumnSizingInfo = (t) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(t), e.resetColumnSizing = (t) => {
      var n;
      e.setColumnSizing(t ? {} : (n = e.initialState.columnSizing) != null ? n : {});
    }, e.resetHeaderSizeInfo = (t) => {
      var n;
      e.setColumnSizingInfo(t ? Rr() : (n = e.initialState.columnSizingInfo) != null ? n : Rr());
    }, e.getTotalSize = () => {
      var t, n;
      return (t = (n = e.getHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getLeftTotalSize = () => {
      var t, n;
      return (t = (n = e.getLeftHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getCenterTotalSize = () => {
      var t, n;
      return (t = (n = e.getCenterHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getRightTotalSize = () => {
      var t, n;
      return (t = (n = e.getRightHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    };
  }
};
let Vn = null;
function Au() {
  if (typeof Vn == "boolean")
    return Vn;
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    }, n = () => {
    };
    window.addEventListener("test", n, t), window.removeEventListener("test", n);
  } catch {
    e = !1;
  }
  return Vn = e, Vn;
}
function Tr(e) {
  return e.type === "touchstart";
}
const Fu = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: je("columnVisibility", e)
  }),
  createColumn: (e, t) => {
    e.toggleVisibility = (n) => {
      e.getCanHide() && t.setColumnVisibility((r) => ({
        ...r,
        [e.id]: n ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var n, r;
      const o = e.columns;
      return (n = o.length ? o.some((i) => i.getIsVisible()) : (r = t.getState().columnVisibility) == null ? void 0 : r[e.id]) != null ? n : !0;
    }, e.getCanHide = () => {
      var n, r;
      return ((n = e.columnDef.enableHiding) != null ? n : !0) && ((r = t.options.enableHiding) != null ? r : !0);
    }, e.getToggleVisibilityHandler = () => (n) => {
      e.toggleVisibility == null || e.toggleVisibility(n.target.checked);
    };
  },
  createRow: (e, t) => {
    e._getAllVisibleCells = Y(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), K(t.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = Y(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, o) => [...n, ...r, ...o], K(t.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const t = (n, r) => Y(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), K(e.options, "debugColumns", n));
    e.getVisibleFlatColumns = t("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = t("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = t("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = t("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = t("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (n) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(n), e.resetColumnVisibility = (n) => {
      var r;
      e.setColumnVisibility(n ? {} : (r = e.initialState.columnVisibility) != null ? r : {});
    }, e.toggleAllColumnsVisible = (n) => {
      var r;
      n = (r = n) != null ? r : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((o, i) => ({
        ...o,
        [i.id]: n || !(i.getCanHide != null && i.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((n) => !(n.getIsVisible != null && n.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((n) => n.getIsVisible == null ? void 0 : n.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (n) => {
      var r;
      e.toggleAllColumnsVisible((r = n.target) == null ? void 0 : r.checked);
    };
  }
};
function mn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const Du = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Vu = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: je("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (t) => {
      var n;
      const r = (n = e.getCoreRowModel().flatRows[0]) == null || (n = n._getAllCellsByColumnId()[t.id]) == null ? void 0 : n.getValue();
      return typeof r == "string" || typeof r == "number";
    }
  }),
  createColumn: (e, t) => {
    e.getCanGlobalFilter = () => {
      var n, r, o, i;
      return ((n = e.columnDef.enableGlobalFilter) != null ? n : !0) && ((r = t.options.enableGlobalFilter) != null ? r : !0) && ((o = t.options.enableFilters) != null ? o : !0) && ((i = t.options.getColumnCanGlobalFilter == null ? void 0 : t.options.getColumnCanGlobalFilter(e)) != null ? i : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => it.includesString, e.getGlobalFilterFn = () => {
      var t, n;
      const {
        globalFilterFn: r
      } = e.options;
      return ir(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : it[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, Lu = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: je("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetExpanded = () => {
      var r, o;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((r = (o = e.options.autoResetAll) != null ? o : e.options.autoResetExpanded) != null ? r : !e.options.manualExpanding) {
        if (n)
          return;
        n = !0, e._queue(() => {
          e.resetExpanded(), n = !1;
        });
      }
    }, e.setExpanded = (r) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(r), e.toggleAllRowsExpanded = (r) => {
      r ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (r) => {
      var o, i;
      e.setExpanded(r ? {} : (o = (i = e.initialState) == null ? void 0 : i.expanded) != null ? o : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((r) => r.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (r) => {
      r.persist == null || r.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const r = e.getState().expanded;
      return r === !0 || Object.values(r).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const r = e.getState().expanded;
      return typeof r == "boolean" ? r === !0 : !(!Object.keys(r).length || e.getRowModel().flatRows.some((o) => !o.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let r = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((i) => {
        const s = i.split(".");
        r = Math.max(r, s.length);
      }), r;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, t) => {
    e.toggleExpanded = (n) => {
      t.setExpanded((r) => {
        var o;
        const i = r === !0 ? !0 : !!(r != null && r[e.id]);
        let s = {};
        if (r === !0 ? Object.keys(t.getRowModel().rowsById).forEach((a) => {
          s[a] = !0;
        }) : s = r, n = (o = n) != null ? o : !i, !i && n)
          return {
            ...s,
            [e.id]: !0
          };
        if (i && !n) {
          const {
            [e.id]: a,
            ...u
          } = s;
          return u;
        }
        return r;
      });
    }, e.getIsExpanded = () => {
      var n;
      const r = t.getState().expanded;
      return !!((n = t.options.getIsRowExpanded == null ? void 0 : t.options.getIsRowExpanded(e)) != null ? n : r === !0 || r != null && r[e.id]);
    }, e.getCanExpand = () => {
      var n, r, o;
      return (n = t.options.getRowCanExpand == null ? void 0 : t.options.getRowCanExpand(e)) != null ? n : ((r = t.options.enableExpanding) != null ? r : !0) && !!((o = e.subRows) != null && o.length);
    }, e.getIsAllParentsExpanded = () => {
      let n = !0, r = e;
      for (; n && r.parentId; )
        r = t.getRow(r.parentId, !0), n = r.getIsExpanded();
      return n;
    }, e.getToggleExpandedHandler = () => {
      const n = e.getCanExpand();
      return () => {
        n && e.toggleExpanded();
      };
    };
  }
}, Hr = 0, Gr = 10, Pr = () => ({
  pageIndex: Hr,
  pageSize: Gr
}), Bu = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Pr(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: je("pagination", e)
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetPageIndex = () => {
      var r, o;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((r = (o = e.options.autoResetAll) != null ? o : e.options.autoResetPageIndex) != null ? r : !e.options.manualPagination) {
        if (n)
          return;
        n = !0, e._queue(() => {
          e.resetPageIndex(), n = !1;
        });
      }
    }, e.setPagination = (r) => {
      const o = (i) => ft(r, i);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(o);
    }, e.resetPagination = (r) => {
      var o;
      e.setPagination(r ? Pr() : (o = e.initialState.pagination) != null ? o : Pr());
    }, e.setPageIndex = (r) => {
      e.setPagination((o) => {
        let i = ft(r, o.pageIndex);
        const s = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return i = Math.max(0, Math.min(i, s)), {
          ...o,
          pageIndex: i
        };
      });
    }, e.resetPageIndex = (r) => {
      var o, i;
      e.setPageIndex(r ? Hr : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : Hr);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? Gr : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : Gr);
    }, e.setPageSize = (r) => {
      e.setPagination((o) => {
        const i = Math.max(1, ft(r, o.pageSize)), s = o.pageSize * o.pageIndex, a = Math.floor(s / i);
        return {
          ...o,
          pageIndex: a,
          pageSize: i
        };
      });
    }, e.setPageCount = (r) => e.setPagination((o) => {
      var i;
      let s = ft(r, (i = e.options.pageCount) != null ? i : -1);
      return typeof s == "number" && (s = Math.max(-1, s)), {
        ...o,
        pageCount: s
      };
    }), e.getPageOptions = Y(() => [e.getPageCount()], (r) => {
      let o = [];
      return r && r > 0 && (o = [...new Array(r)].fill(null).map((i, s) => s)), o;
    }, K(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: r
      } = e.getState().pagination, o = e.getPageCount();
      return o === -1 ? !0 : o === 0 ? !1 : r < o - 1;
    }, e.previousPage = () => e.setPageIndex((r) => r - 1), e.nextPage = () => e.setPageIndex((r) => r + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var r;
      return (r = e.options.pageCount) != null ? r : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var r;
      return (r = e.options.rowCount) != null ? r : e.getPrePaginationRowModel().rows.length;
    };
  }
}, Or = () => ({
  top: [],
  bottom: []
}), ju = {
  getInitialState: (e) => ({
    rowPinning: Or(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: je("rowPinning", e)
  }),
  createRow: (e, t) => {
    e.pin = (n, r, o) => {
      const i = r ? e.getLeafRows().map((u) => {
        let {
          id: c
        } = u;
        return c;
      }) : [], s = o ? e.getParentRows().map((u) => {
        let {
          id: c
        } = u;
        return c;
      }) : [], a = /* @__PURE__ */ new Set([...s, e.id, ...i]);
      t.setRowPinning((u) => {
        var c, p;
        if (n === "bottom") {
          var g, f;
          return {
            top: ((g = u == null ? void 0 : u.top) != null ? g : []).filter((m) => !(a != null && a.has(m))),
            bottom: [...((f = u == null ? void 0 : u.bottom) != null ? f : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)]
          };
        }
        if (n === "top") {
          var d, h;
          return {
            top: [...((d = u == null ? void 0 : u.top) != null ? d : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)],
            bottom: ((h = u == null ? void 0 : u.bottom) != null ? h : []).filter((m) => !(a != null && a.has(m)))
          };
        }
        return {
          top: ((c = u == null ? void 0 : u.top) != null ? c : []).filter((m) => !(a != null && a.has(m))),
          bottom: ((p = u == null ? void 0 : u.bottom) != null ? p : []).filter((m) => !(a != null && a.has(m)))
        };
      });
    }, e.getCanPin = () => {
      var n;
      const {
        enableRowPinning: r,
        enablePinning: o
      } = t.options;
      return typeof r == "function" ? r(e) : (n = r ?? o) != null ? n : !0;
    }, e.getIsPinned = () => {
      const n = [e.id], {
        top: r,
        bottom: o
      } = t.getState().rowPinning, i = n.some((a) => r == null ? void 0 : r.includes(a)), s = n.some((a) => o == null ? void 0 : o.includes(a));
      return i ? "top" : s ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var n, r;
      const o = e.getIsPinned();
      if (!o)
        return -1;
      const i = (n = o === "top" ? t.getTopRows() : t.getBottomRows()) == null ? void 0 : n.map((s) => {
        let {
          id: a
        } = s;
        return a;
      });
      return (r = i == null ? void 0 : i.indexOf(e.id)) != null ? r : -1;
    };
  },
  createTable: (e) => {
    e.setRowPinning = (t) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(t), e.resetRowPinning = (t) => {
      var n, r;
      return e.setRowPinning(t ? Or() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : Or());
    }, e.getIsSomeRowsPinned = (t) => {
      var n;
      const r = e.getState().rowPinning;
      if (!t) {
        var o, i;
        return !!((o = r.top) != null && o.length || (i = r.bottom) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e._getPinnedRows = (t, n, r) => {
      var o;
      return ((o = e.options.keepPinnedRows) == null || o ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (n ?? []).map((s) => {
          const a = e.getRow(s, !0);
          return a.getIsAllParentsExpanded() ? a : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (n ?? []).map((s) => t.find((a) => a.id === s))
      )).filter(Boolean).map((s) => ({
        ...s,
        position: r
      }));
    }, e.getTopRows = Y(() => [e.getRowModel().rows, e.getState().rowPinning.top], (t, n) => e._getPinnedRows(t, n, "top"), K(e.options, "debugRows", "getTopRows")), e.getBottomRows = Y(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (t, n) => e._getPinnedRows(t, n, "bottom"), K(e.options, "debugRows", "getBottomRows")), e.getCenterRows = Y(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const o = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((i) => !o.has(i.id));
    }, K(e.options, "debugRows", "getCenterRows"));
  }
}, zu = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: je("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (t) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(t), e.resetRowSelection = (t) => {
      var n;
      return e.setRowSelection(t ? {} : (n = e.initialState.rowSelection) != null ? n : {});
    }, e.toggleAllRowsSelected = (t) => {
      e.setRowSelection((n) => {
        t = typeof t < "u" ? t : !e.getIsAllRowsSelected();
        const r = {
          ...n
        }, o = e.getPreGroupedRowModel().flatRows;
        return t ? o.forEach((i) => {
          i.getCanSelect() && (r[i.id] = !0);
        }) : o.forEach((i) => {
          delete r[i.id];
        }), r;
      });
    }, e.toggleAllPageRowsSelected = (t) => e.setRowSelection((n) => {
      const r = typeof t < "u" ? t : !e.getIsAllPageRowsSelected(), o = {
        ...n
      };
      return e.getRowModel().rows.forEach((i) => {
        Ur(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = Y(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? kr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, K(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = Y(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? kr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, K(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = Y(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? kr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, K(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
      const t = e.getFilteredRowModel().flatRows, {
        rowSelection: n
      } = e.getState();
      let r = !!(t.length && Object.keys(n).length);
      return r && t.some((o) => o.getCanSelect() && !n[o.id]) && (r = !1), r;
    }, e.getIsAllPageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows.filter((o) => o.getCanSelect()), {
        rowSelection: n
      } = e.getState();
      let r = !!t.length;
      return r && t.some((o) => !n[o.id]) && (r = !1), r;
    }, e.getIsSomeRowsSelected = () => {
      var t;
      const n = Object.keys((t = e.getState().rowSelection) != null ? t : {}).length;
      return n > 0 && n < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : t.filter((n) => n.getCanSelect()).some((n) => n.getIsSelected() || n.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (t) => {
      e.toggleAllRowsSelected(t.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (t) => {
      e.toggleAllPageRowsSelected(t.target.checked);
    };
  },
  createRow: (e, t) => {
    e.toggleSelected = (n, r) => {
      const o = e.getIsSelected();
      t.setRowSelection((i) => {
        var s;
        if (n = typeof n < "u" ? n : !o, e.getCanSelect() && o === n)
          return i;
        const a = {
          ...i
        };
        return Ur(a, e.id, n, (s = r == null ? void 0 : r.selectChildren) != null ? s : !0, t), a;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return vo(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return qr(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return qr(e, n) === "all";
    }, e.getCanSelect = () => {
      var n;
      return typeof t.options.enableRowSelection == "function" ? t.options.enableRowSelection(e) : (n = t.options.enableRowSelection) != null ? n : !0;
    }, e.getCanSelectSubRows = () => {
      var n;
      return typeof t.options.enableSubRowSelection == "function" ? t.options.enableSubRowSelection(e) : (n = t.options.enableSubRowSelection) != null ? n : !0;
    }, e.getCanMultiSelect = () => {
      var n;
      return typeof t.options.enableMultiRowSelection == "function" ? t.options.enableMultiRowSelection(e) : (n = t.options.enableMultiRowSelection) != null ? n : !0;
    }, e.getToggleSelectedHandler = () => {
      const n = e.getCanSelect();
      return (r) => {
        var o;
        n && e.toggleSelected((o = r.target) == null ? void 0 : o.checked);
      };
    };
  }
}, Ur = (e, t, n, r, o) => {
  var i;
  const s = o.getRow(t, !0);
  n ? (s.getCanMultiSelect() || Object.keys(e).forEach((a) => delete e[a]), s.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = s.subRows) != null && i.length && s.getCanSelectSubRows() && s.subRows.forEach((a) => Ur(e, a.id, n, r, o));
};
function kr(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(s, a) {
    return s.map((u) => {
      var c;
      const p = vo(u, n);
      if (p && (r.push(u), o[u.id] = u), (c = u.subRows) != null && c.length && (u = {
        ...u,
        subRows: i(u.subRows)
      }), p)
        return u;
    }).filter(Boolean);
  };
  return {
    rows: i(t.rows),
    flatRows: r,
    rowsById: o
  };
}
function vo(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function qr(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length))
    return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((s) => {
    if (!(i && !o) && (s.getCanSelect() && (vo(s, t) ? i = !0 : o = !1), s.subRows && s.subRows.length)) {
      const a = qr(s, t);
      a === "all" ? i = !0 : (a === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const Wr = /([0-9]+)/gm, Hu = (e, t, n) => Os(ht(e.getValue(n)).toLowerCase(), ht(t.getValue(n)).toLowerCase()), Gu = (e, t, n) => Os(ht(e.getValue(n)), ht(t.getValue(n))), Uu = (e, t, n) => wo(ht(e.getValue(n)).toLowerCase(), ht(t.getValue(n)).toLowerCase()), qu = (e, t, n) => wo(ht(e.getValue(n)), ht(t.getValue(n))), Wu = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, Xu = (e, t, n) => wo(e.getValue(n), t.getValue(n));
function wo(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function ht(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Os(e, t) {
  const n = e.split(Wr).filter(Boolean), r = t.split(Wr).filter(Boolean);
  for (; n.length && r.length; ) {
    const o = n.shift(), i = r.shift(), s = parseInt(o, 10), a = parseInt(i, 10), u = [s, a].sort();
    if (isNaN(u[0])) {
      if (o > i)
        return 1;
      if (i > o)
        return -1;
      continue;
    }
    if (isNaN(u[1]))
      return isNaN(s) ? -1 : 1;
    if (s > a)
      return 1;
    if (a > s)
      return -1;
  }
  return n.length - r.length;
}
const sn = {
  alphanumeric: Hu,
  alphanumericCaseSensitive: Gu,
  text: Uu,
  textCaseSensitive: qu,
  datetime: Wu,
  basic: Xu
}, Yu = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: je("sorting", e),
    isMultiSortEvent: (t) => t.shiftKey
  }),
  createColumn: (e, t) => {
    e.getAutoSortingFn = () => {
      const n = t.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const o of n) {
        const i = o == null ? void 0 : o.getValue(e.id);
        if (Object.prototype.toString.call(i) === "[object Date]")
          return sn.datetime;
        if (typeof i == "string" && (r = !0, i.split(Wr).length > 1))
          return sn.alphanumeric;
      }
      return r ? sn.text : sn.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return ir(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : sn[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, r) => {
      const o = e.getNextSortingOrder(), i = typeof n < "u" && n !== null;
      t.setSorting((s) => {
        const a = s == null ? void 0 : s.find((d) => d.id === e.id), u = s == null ? void 0 : s.findIndex((d) => d.id === e.id);
        let c = [], p, g = i ? n : o === "desc";
        if (s != null && s.length && e.getCanMultiSort() && r ? a ? p = "toggle" : p = "add" : s != null && s.length && u !== s.length - 1 ? p = "replace" : a ? p = "toggle" : p = "replace", p === "toggle" && (i || o || (p = "remove")), p === "add") {
          var f;
          c = [...s, {
            id: e.id,
            desc: g
          }], c.splice(0, c.length - ((f = t.options.maxMultiSortColCount) != null ? f : Number.MAX_SAFE_INTEGER));
        } else
          p === "toggle" ? c = s.map((d) => d.id === e.id ? {
            ...d,
            desc: g
          } : d) : p === "remove" ? c = s.filter((d) => d.id !== e.id) : c = [{
            id: e.id,
            desc: g
          }];
        return c;
      });
    }, e.getFirstSortDir = () => {
      var n, r;
      return ((n = (r = e.columnDef.sortDescFirst) != null ? r : t.options.sortDescFirst) != null ? n : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (n) => {
      var r, o;
      const i = e.getFirstSortDir(), s = e.getIsSorted();
      return s ? s !== i && ((r = t.options.enableSortingRemoval) == null || r) && // If enableSortRemove, enable in general
      (!(n && (o = t.options.enableMultiRemove) != null) || o) ? !1 : s === "desc" ? "asc" : "desc" : i;
    }, e.getCanSort = () => {
      var n, r;
      return ((n = e.columnDef.enableSorting) != null ? n : !0) && ((r = t.options.enableSorting) != null ? r : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var n, r;
      return (n = (r = e.columnDef.enableMultiSort) != null ? r : t.options.enableMultiSort) != null ? n : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var n;
      const r = (n = t.getState().sorting) == null ? void 0 : n.find((o) => o.id === e.id);
      return r ? r.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var n, r;
      return (n = (r = t.getState().sorting) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? n : -1;
    }, e.clearSorting = () => {
      t.setSorting((n) => n != null && n.length ? n.filter((r) => r.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const n = e.getCanSort();
      return (r) => {
        n && (r.persist == null || r.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? t.options.isMultiSortEvent == null ? void 0 : t.options.isMultiSortEvent(r) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (t) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(t), e.resetSorting = (t) => {
      var n, r;
      e.setSorting(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.sorting) != null ? n : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, Ku = [
  wu,
  Fu,
  $u,
  Mu,
  bu,
  yu,
  Du,
  //depends on ColumnFaceting
  Vu,
  //depends on ColumnFiltering
  Yu,
  Nu,
  //depends on RowSorting
  Lu,
  Bu,
  ju,
  zu,
  Iu
];
function Ju(e) {
  var t, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const r = [...Ku, ...(t = e._features) != null ? t : []];
  let o = {
    _features: r
  };
  const i = o._features.reduce((f, d) => Object.assign(f, d.getDefaultOptions == null ? void 0 : d.getDefaultOptions(o)), {}), s = (f) => o.options.mergeOptions ? o.options.mergeOptions(i, f) : {
    ...i,
    ...f
  };
  let u = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  o._features.forEach((f) => {
    var d;
    u = (d = f.getInitialState == null ? void 0 : f.getInitialState(u)) != null ? d : u;
  });
  const c = [];
  let p = !1;
  const g = {
    _features: r,
    options: {
      ...i,
      ...e
    },
    initialState: u,
    _queue: (f) => {
      c.push(f), p || (p = !0, Promise.resolve().then(() => {
        for (; c.length; )
          c.shift()();
        p = !1;
      }).catch((d) => setTimeout(() => {
        throw d;
      })));
    },
    reset: () => {
      o.setState(o.initialState);
    },
    setOptions: (f) => {
      const d = ft(f, o.options);
      o.options = s(d);
    },
    getState: () => o.options.state,
    setState: (f) => {
      o.options.onStateChange == null || o.options.onStateChange(f);
    },
    _getRowId: (f, d, h) => {
      var m;
      return (m = o.options.getRowId == null ? void 0 : o.options.getRowId(f, d, h)) != null ? m : `${h ? [h.id, d].join(".") : d}`;
    },
    getCoreRowModel: () => (o._getCoreRowModel || (o._getCoreRowModel = o.options.getCoreRowModel(o)), o._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => o.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (f, d) => {
      let h = (d ? o.getPrePaginationRowModel() : o.getRowModel()).rowsById[f];
      if (!h && (h = o.getCoreRowModel().rowsById[f], !h))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${f}`) : new Error();
      return h;
    },
    _getDefaultColumnDef: Y(() => [o.options.defaultColumn], (f) => {
      var d;
      return f = (d = f) != null ? d : {}, {
        header: (h) => {
          const m = h.header.column.columnDef;
          return m.accessorKey ? m.accessorKey : m.accessorFn ? m.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (h) => {
          var m, v;
          return (m = (v = h.renderValue()) == null || v.toString == null ? void 0 : v.toString()) != null ? m : null;
        },
        ...o._features.reduce((h, m) => Object.assign(h, m.getDefaultColumnDef == null ? void 0 : m.getDefaultColumnDef()), {}),
        ...f
      };
    }, K(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: Y(() => [o._getColumnDefs()], (f) => {
      const d = function(h, m, v) {
        return v === void 0 && (v = 0), h.map((y) => {
          const O = vu(o, y, v, m), x = y;
          return O.columns = x.columns ? d(x.columns, O, v + 1) : [], O;
        });
      };
      return d(f);
    }, K(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: Y(() => [o.getAllColumns()], (f) => f.flatMap((d) => d.getFlatColumns()), K(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: Y(() => [o.getAllFlatColumns()], (f) => f.reduce((d, h) => (d[h.id] = h, d), {}), K(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: Y(() => [o.getAllColumns(), o._getOrderColumnsFn()], (f, d) => {
      let h = f.flatMap((m) => m.getLeafColumns());
      return d(h);
    }, K(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (f) => {
      const d = o._getAllFlatColumnsById()[f];
      return process.env.NODE_ENV !== "production" && !d && console.error(`[Table] Column with id '${f}' does not exist.`), d;
    }
  };
  Object.assign(o, g);
  for (let f = 0; f < o._features.length; f++) {
    const d = o._features[f];
    d == null || d.createTable == null || d.createTable(o);
  }
  return o;
}
function Zu() {
  return (e) => Y(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, s) {
      i === void 0 && (i = 0);
      const a = [];
      for (let c = 0; c < o.length; c++) {
        const p = mo(e, e._getRowId(o[c], c, s), o[c], c, i, void 0, s == null ? void 0 : s.id);
        if (n.flatRows.push(p), n.rowsById[p.id] = p, a.push(p), e.options.getSubRows) {
          var u;
          p.originalSubRows = e.options.getSubRows(o[c], c), (u = p.originalSubRows) != null && u.length && (p.subRows = r(p.originalSubRows, i + 1, p));
        }
      }
      return a;
    };
    return n.rows = r(t), n;
  }, K(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function Qu(e) {
  const t = [], n = (r) => {
    var o;
    t.push(r), (o = r.subRows) != null && o.length && r.getIsExpanded() && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function ec(e, t, n) {
  return n.options.filterFromLeafRows ? tc(e, t, n) : nc(e, t, n);
}
function tc(e, t, n) {
  var r;
  const o = [], i = {}, s = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, a = function(u, c) {
    c === void 0 && (c = 0);
    const p = [];
    for (let f = 0; f < u.length; f++) {
      var g;
      let d = u[f];
      const h = mo(n, d.id, d.original, d.index, d.depth, void 0, d.parentId);
      if (h.columnFilters = d.columnFilters, (g = d.subRows) != null && g.length && c < s) {
        if (h.subRows = a(d.subRows, c + 1), d = h, t(d) && !h.subRows.length) {
          p.push(d), i[d.id] = d, o.push(d);
          continue;
        }
        if (t(d) || h.subRows.length) {
          p.push(d), i[d.id] = d, o.push(d);
          continue;
        }
      } else
        d = h, t(d) && (p.push(d), i[d.id] = d, o.push(d));
    }
    return p;
  };
  return {
    rows: a(e),
    flatRows: o,
    rowsById: i
  };
}
function nc(e, t, n) {
  var r;
  const o = [], i = {}, s = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, a = function(u, c) {
    c === void 0 && (c = 0);
    const p = [];
    for (let f = 0; f < u.length; f++) {
      let d = u[f];
      if (t(d)) {
        var g;
        if ((g = d.subRows) != null && g.length && c < s) {
          const m = mo(n, d.id, d.original, d.index, d.depth, void 0, d.parentId);
          m.subRows = a(d.subRows, c + 1), d = m;
        }
        p.push(d), o.push(d), i[d.id] = d;
      }
    }
    return p;
  };
  return {
    rows: a(e),
    flatRows: o,
    rowsById: i
  };
}
function rc() {
  return (e) => Y(() => [e.getPreFilteredRowModel(), e.getState().columnFilters, e.getState().globalFilter], (t, n, r) => {
    if (!t.rows.length || !(n != null && n.length) && !r) {
      for (let f = 0; f < t.flatRows.length; f++)
        t.flatRows[f].columnFilters = {}, t.flatRows[f].columnFiltersMeta = {};
      return t;
    }
    const o = [], i = [];
    (n ?? []).forEach((f) => {
      var d;
      const h = e.getColumn(f.id);
      if (!h)
        return;
      const m = h.getFilterFn();
      if (!m) {
        process.env.NODE_ENV !== "production" && console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${h.id}.`);
        return;
      }
      o.push({
        id: f.id,
        filterFn: m,
        resolvedValue: (d = m.resolveFilterValue == null ? void 0 : m.resolveFilterValue(f.value)) != null ? d : f.value
      });
    });
    const s = (n ?? []).map((f) => f.id), a = e.getGlobalFilterFn(), u = e.getAllLeafColumns().filter((f) => f.getCanGlobalFilter());
    r && a && u.length && (s.push("__global__"), u.forEach((f) => {
      var d;
      i.push({
        id: f.id,
        filterFn: a,
        resolvedValue: (d = a.resolveFilterValue == null ? void 0 : a.resolveFilterValue(r)) != null ? d : r
      });
    }));
    let c, p;
    for (let f = 0; f < t.flatRows.length; f++) {
      const d = t.flatRows[f];
      if (d.columnFilters = {}, o.length)
        for (let h = 0; h < o.length; h++) {
          c = o[h];
          const m = c.id;
          d.columnFilters[m] = c.filterFn(d, m, c.resolvedValue, (v) => {
            d.columnFiltersMeta[m] = v;
          });
        }
      if (i.length) {
        for (let h = 0; h < i.length; h++) {
          p = i[h];
          const m = p.id;
          if (p.filterFn(d, m, p.resolvedValue, (v) => {
            d.columnFiltersMeta[m] = v;
          })) {
            d.columnFilters.__global__ = !0;
            break;
          }
        }
        d.columnFilters.__global__ !== !0 && (d.columnFilters.__global__ = !1);
      }
    }
    const g = (f) => {
      for (let d = 0; d < s.length; d++)
        if (f.columnFilters[s[d]] === !1)
          return !1;
      return !0;
    };
    return ec(t.rows, g, e);
  }, K(e.options, "debugTable", "getFilteredRowModel", () => e._autoResetPageIndex()));
}
function oc(e) {
  return (t) => Y(() => [t.getState().pagination, t.getPrePaginationRowModel(), t.options.paginateExpandedRows ? void 0 : t.getState().expanded], (n, r) => {
    if (!r.rows.length)
      return r;
    const {
      pageSize: o,
      pageIndex: i
    } = n;
    let {
      rows: s,
      flatRows: a,
      rowsById: u
    } = r;
    const c = o * i, p = c + o;
    s = s.slice(c, p);
    let g;
    t.options.paginateExpandedRows ? g = {
      rows: s,
      flatRows: a,
      rowsById: u
    } : g = Qu({
      rows: s,
      flatRows: a,
      rowsById: u
    }), g.flatRows = [];
    const f = (d) => {
      g.flatRows.push(d), d.subRows.length && d.subRows.forEach(f);
    };
    return g.rows.forEach(f), g;
  }, K(t.options, "debugTable", "getPaginationRowModel"));
}
function ic() {
  return (e) => Y(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
    if (!n.rows.length || !(t != null && t.length))
      return n;
    const r = e.getState().sorting, o = [], i = r.filter((u) => {
      var c;
      return (c = e.getColumn(u.id)) == null ? void 0 : c.getCanSort();
    }), s = {};
    i.forEach((u) => {
      const c = e.getColumn(u.id);
      c && (s[u.id] = {
        sortUndefined: c.columnDef.sortUndefined,
        invertSorting: c.columnDef.invertSorting,
        sortingFn: c.getSortingFn()
      });
    });
    const a = (u) => {
      const c = u.map((p) => ({
        ...p
      }));
      return c.sort((p, g) => {
        for (let d = 0; d < i.length; d += 1) {
          var f;
          const h = i[d], m = s[h.id], v = m.sortUndefined, y = (f = h == null ? void 0 : h.desc) != null ? f : !1;
          let O = 0;
          if (v) {
            const x = p.getValue(h.id), S = g.getValue(h.id), w = x === void 0, T = S === void 0;
            if (w || T) {
              if (v === "first")
                return w ? -1 : 1;
              if (v === "last")
                return w ? 1 : -1;
              O = w && T ? 0 : w ? v : -v;
            }
          }
          if (O === 0 && (O = m.sortingFn(p, g, h.id)), O !== 0)
            return y && (O *= -1), m.invertSorting && (O *= -1), O;
        }
        return p.index - g.index;
      }), c.forEach((p) => {
        var g;
        o.push(p), (g = p.subRows) != null && g.length && (p.subRows = a(p.subRows));
      }), c;
    };
    return {
      rows: a(n.rows),
      flatRows: o,
      rowsById: n.rowsById
    };
  }, K(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
}
/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function ai(e, t) {
  return e ? sc(e) ? /* @__PURE__ */ E.createElement(e, t) : e : null;
}
function sc(e) {
  return ac(e) || typeof e == "function" || lc(e);
}
function ac(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function lc(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function uc(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = E.useState(() => ({
    current: Ju(t)
  })), [r, o] = E.useState(() => n.current.initialState);
  return n.current.setOptions((i) => ({
    ...i,
    ...e,
    state: {
      ...r,
      ...e.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (s) => {
      o(s), e.onStateChange == null || e.onStateChange(s);
    }
  })), n.current;
}
const ks = ie.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ b("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ b(
    "table",
    {
      ref: n,
      className: re("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
ks.displayName = "Table";
const Ns = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b("thead", { ref: n, className: re("[&_tr]:pr-border-b", e), ...t }));
Ns.displayName = "TableHeader";
const _s = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b("tbody", { ref: n, className: re("[&_tr:last-child]:pr-border-0", e), ...t }));
_s.displayName = "TableBody";
const cc = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  "tfoot",
  {
    ref: n,
    className: re("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
cc.displayName = "TableFooter";
const Gn = ie.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ b(
    "tr",
    {
      ref: n,
      className: re(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
Gn.displayName = "TableRow";
const $s = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  "th",
  {
    ref: n,
    className: re(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
$s.displayName = "TableHead";
const Xr = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  "td",
  {
    ref: n,
    className: re("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
Xr.displayName = "TableCell";
const pc = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  "caption",
  {
    ref: n,
    className: re("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
pc.displayName = "TableCaption";
const dc = ss(
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
), gt = ie.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ b(r ? xl : "button", { className: re(dc({ variant: t, size: n, className: e })), ref: i, ...o })
);
gt.displayName = "Button";
const fc = ye.Root, Wh = ye.Group, gc = ye.Value, Ms = ie.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ te(
  ye.Trigger,
  {
    ref: r,
    className: re(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ b(ye.Icon, { asChild: !0, children: /* @__PURE__ */ b(is, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Ms.displayName = ye.Trigger.displayName;
const Is = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  ye.ScrollUpButton,
  {
    ref: n,
    className: re("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ b(fl, { className: "pr-h-4 pr-w-4" })
  }
));
Is.displayName = ye.ScrollUpButton.displayName;
const As = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  ye.ScrollDownButton,
  {
    ref: n,
    className: re("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ b(is, { className: "pr-h-4 pr-w-4" })
  }
));
As.displayName = ye.ScrollDownButton.displayName;
const Fs = ie.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ b(ye.Portal, { children: /* @__PURE__ */ te(
  ye.Content,
  {
    ref: o,
    className: re(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ b(Is, {}),
      /* @__PURE__ */ b(
        ye.Viewport,
        {
          className: re(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ b(As, {})
    ]
  }
) }));
Fs.displayName = ye.Content.displayName;
const mc = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  ye.Label,
  {
    ref: n,
    className: re("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
mc.displayName = ye.Label.displayName;
const Ds = ie.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ te(
  ye.Item,
  {
    ref: r,
    className: re(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ b("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ b(ye.ItemIndicator, { children: /* @__PURE__ */ b(os, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ b(ye.ItemText, { children: t })
    ]
  }
));
Ds.displayName = ye.Item.displayName;
const hc = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  ye.Separator,
  {
    ref: n,
    className: re("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
hc.displayName = ye.Separator.displayName;
function vc({ table: e }) {
  return /* @__PURE__ */ b("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ te("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ te("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ te("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ b("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ te(
        fc,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ b(Ms, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ b(gc, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ b(Fs, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ b(Ds, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ te("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ te("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ te(
        gt,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ b("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ b(gl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ te(
        gt,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ b("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ b(ml, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ te(
        gt,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ b("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ b(hl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ te(
        gt,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ b("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ b(vl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function wc({ table: e }) {
  return /* @__PURE__ */ te(vs, { children: [
    /* @__PURE__ */ b(sl, { asChild: !0, children: /* @__PURE__ */ te(gt, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ b(wl, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ te(po, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ b(or, { children: "Toggle columns" }),
      /* @__PURE__ */ b(fo, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ b(
        bs,
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
function Xh({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var m;
  const [s, a] = Ee([]), [u, c] = Ee([]), [p, g] = Ee({}), [f, d] = Ee({}), h = uc({
    data: t,
    columns: e,
    getCoreRowModel: Zu(),
    ...n && { getPaginationRowModel: oc() },
    onSortingChange: a,
    getSortedRowModel: ic(),
    onColumnFiltersChange: c,
    getFilteredRowModel: rc(),
    onColumnVisibilityChange: g,
    onRowSelectionChange: d,
    state: {
      sorting: s,
      columnFilters: u,
      columnVisibility: p,
      rowSelection: f
    }
  });
  return /* @__PURE__ */ te("div", { children: [
    o && /* @__PURE__ */ b(wc, { table: h }),
    /* @__PURE__ */ b("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ te(ks, { children: [
      /* @__PURE__ */ b(Ns, { children: h.getHeaderGroups().map((v) => /* @__PURE__ */ b(Gn, { children: v.headers.map((y) => /* @__PURE__ */ b($s, { children: y.isPlaceholder ? void 0 : ai(y.column.columnDef.header, y.getContext()) }, y.id)) }, v.id)) }),
      /* @__PURE__ */ b(_s, { children: (m = h.getRowModel().rows) != null && m.length ? h.getRowModel().rows.map((v) => /* @__PURE__ */ b(
        Gn,
        {
          onClick: () => i(v, h),
          "data-state": v.getIsSelected() && "selected",
          children: v.getVisibleCells().map((y) => /* @__PURE__ */ b(Xr, { children: ai(y.column.columnDef.cell, y.getContext()) }, y.id))
        },
        v.id
      )) : /* @__PURE__ */ b(Gn, { children: /* @__PURE__ */ b(Xr, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    n && /* @__PURE__ */ te("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ b(
        gt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.previousPage(),
          disabled: !h.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ b(
        gt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.nextPage(),
          disabled: !h.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ b(vc, { table: h })
  ] });
}
function li({
  id: e,
  title: t,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: s,
  options: a = [],
  className: u,
  value: c,
  onChange: p,
  onFocus: g,
  onBlur: f,
  getOptionLabel: d
}) {
  return /* @__PURE__ */ b(
    Sl,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: a,
      className: `papi-combo-box ${o ? "error" : ""} ${u ?? ""}`,
      value: c,
      onChange: p,
      onFocus: g,
      onBlur: f,
      getOptionLabel: d,
      renderInput: (h) => /* @__PURE__ */ b(
        El,
        {
          ...h,
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
function Yh({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, i] = Ee(1), [s, a] = Ee(r), [u, c] = Ee(
    Array.from({ length: r }, (f, d) => d + 1)
  );
  Yt(() => {
    i(1), e(1), a(r), t(r), c(Array.from({ length: r }, (f, d) => d + 1));
  }, [r, t, e]);
  const p = (f, d) => {
    i(d), e(d), d > s && (a(d), t(d));
  }, g = (f, d) => {
    a(d), t(d), d < o && (i(d), e(d));
  };
  return /* @__PURE__ */ te(rr, { children: [
    /* @__PURE__ */ b(
      ti,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ b(
          li,
          {
            onChange: (f, d) => p(f, d),
            className: "book-selection-chapter",
            isClearable: !1,
            options: u,
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
    /* @__PURE__ */ b(
      ti,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ b(
          li,
          {
            onChange: (f, d) => g(f, d),
            className: "book-selection-chapter",
            isClearable: !1,
            options: u,
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
var Bt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Bt || {});
function bc({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Bt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: a = !1,
  className: u,
  onChange: c
}) {
  const p = /* @__PURE__ */ b(
    Rl,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: i,
      disabled: s,
      className: `papi-checkbox ${a ? "error" : ""} ${u ?? ""}`,
      onChange: c
    }
  );
  let g;
  if (n) {
    const f = r === Bt.Before || r === Bt.Above, d = /* @__PURE__ */ b("span", { className: `papi-checkbox-label ${a ? "error" : ""} ${u ?? ""}`, children: n }), h = r === Bt.Before || r === Bt.After, m = h ? d : /* @__PURE__ */ b("div", { children: d }), v = h ? p : /* @__PURE__ */ b("div", { children: p });
    g = /* @__PURE__ */ te(
      Cl,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: a,
        children: [
          f && m,
          v,
          !f && m
        ]
      }
    );
  } else
    g = p;
  return g;
}
function Kh({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s
}) {
  return /* @__PURE__ */ te("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ b("legend", { children: n }),
    r.map((a) => /* @__PURE__ */ b(
      bc,
      {
        className: "check-item",
        isChecked: o.includes(a),
        labelText: s ? s(a) : a,
        onChange: () => i(a)
      },
      a
    ))
  ] });
}
function ge(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function C() {
  return C = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, C.apply(this, arguments);
}
function yc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function xc(e) {
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
var Yr = { exports: {} }, Ln = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ui;
function Sc() {
  if (ui)
    return ce;
  ui = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
  function x(w) {
    if (typeof w == "object" && w !== null) {
      var T = w.$$typeof;
      switch (T) {
        case t:
          switch (w = w.type, w) {
            case u:
            case c:
            case r:
            case i:
            case o:
            case g:
              return w;
            default:
              switch (w = w && w.$$typeof, w) {
                case a:
                case p:
                case h:
                case d:
                case s:
                  return w;
                default:
                  return T;
              }
          }
        case n:
          return T;
      }
    }
  }
  function S(w) {
    return x(w) === c;
  }
  return ce.AsyncMode = u, ce.ConcurrentMode = c, ce.ContextConsumer = a, ce.ContextProvider = s, ce.Element = t, ce.ForwardRef = p, ce.Fragment = r, ce.Lazy = h, ce.Memo = d, ce.Portal = n, ce.Profiler = i, ce.StrictMode = o, ce.Suspense = g, ce.isAsyncMode = function(w) {
    return S(w) || x(w) === u;
  }, ce.isConcurrentMode = S, ce.isContextConsumer = function(w) {
    return x(w) === a;
  }, ce.isContextProvider = function(w) {
    return x(w) === s;
  }, ce.isElement = function(w) {
    return typeof w == "object" && w !== null && w.$$typeof === t;
  }, ce.isForwardRef = function(w) {
    return x(w) === p;
  }, ce.isFragment = function(w) {
    return x(w) === r;
  }, ce.isLazy = function(w) {
    return x(w) === h;
  }, ce.isMemo = function(w) {
    return x(w) === d;
  }, ce.isPortal = function(w) {
    return x(w) === n;
  }, ce.isProfiler = function(w) {
    return x(w) === i;
  }, ce.isStrictMode = function(w) {
    return x(w) === o;
  }, ce.isSuspense = function(w) {
    return x(w) === g;
  }, ce.isValidElementType = function(w) {
    return typeof w == "string" || typeof w == "function" || w === r || w === c || w === i || w === o || w === g || w === f || typeof w == "object" && w !== null && (w.$$typeof === h || w.$$typeof === d || w.$$typeof === s || w.$$typeof === a || w.$$typeof === p || w.$$typeof === v || w.$$typeof === y || w.$$typeof === O || w.$$typeof === m);
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
var ci;
function Ec() {
  return ci || (ci = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
    function x(I) {
      return typeof I == "string" || typeof I == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      I === r || I === c || I === i || I === o || I === g || I === f || typeof I == "object" && I !== null && (I.$$typeof === h || I.$$typeof === d || I.$$typeof === s || I.$$typeof === a || I.$$typeof === p || I.$$typeof === v || I.$$typeof === y || I.$$typeof === O || I.$$typeof === m);
    }
    function S(I) {
      if (typeof I == "object" && I !== null) {
        var Q = I.$$typeof;
        switch (Q) {
          case t:
            var N = I.type;
            switch (N) {
              case u:
              case c:
              case r:
              case i:
              case o:
              case g:
                return N;
              default:
                var le = N && N.$$typeof;
                switch (le) {
                  case a:
                  case p:
                  case h:
                  case d:
                  case s:
                    return le;
                  default:
                    return Q;
                }
            }
          case n:
            return Q;
        }
      }
    }
    var w = u, T = c, k = a, F = s, D = t, V = p, P = r, $ = h, M = d, L = n, B = i, _ = o, j = g, ne = !1;
    function ee(I) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), R(I) || S(I) === u;
    }
    function R(I) {
      return S(I) === c;
    }
    function A(I) {
      return S(I) === a;
    }
    function H(I) {
      return S(I) === s;
    }
    function X(I) {
      return typeof I == "object" && I !== null && I.$$typeof === t;
    }
    function z(I) {
      return S(I) === p;
    }
    function G(I) {
      return S(I) === r;
    }
    function q(I) {
      return S(I) === h;
    }
    function W(I) {
      return S(I) === d;
    }
    function U(I) {
      return S(I) === n;
    }
    function J(I) {
      return S(I) === i;
    }
    function Z(I) {
      return S(I) === o;
    }
    function ae(I) {
      return S(I) === g;
    }
    pe.AsyncMode = w, pe.ConcurrentMode = T, pe.ContextConsumer = k, pe.ContextProvider = F, pe.Element = D, pe.ForwardRef = V, pe.Fragment = P, pe.Lazy = $, pe.Memo = M, pe.Portal = L, pe.Profiler = B, pe.StrictMode = _, pe.Suspense = j, pe.isAsyncMode = ee, pe.isConcurrentMode = R, pe.isContextConsumer = A, pe.isContextProvider = H, pe.isElement = X, pe.isForwardRef = z, pe.isFragment = G, pe.isLazy = q, pe.isMemo = W, pe.isPortal = U, pe.isProfiler = J, pe.isStrictMode = Z, pe.isSuspense = ae, pe.isValidElementType = x, pe.typeOf = S;
  }()), pe;
}
var pi;
function Vs() {
  return pi || (pi = 1, process.env.NODE_ENV === "production" ? Ln.exports = Sc() : Ln.exports = Ec()), Ln.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Nr, di;
function Cc() {
  if (di)
    return Nr;
  di = 1;
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
      for (var s = {}, a = 0; a < 10; a++)
        s["_" + String.fromCharCode(a)] = a;
      var u = Object.getOwnPropertyNames(s).map(function(p) {
        return s[p];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var c = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(p) {
        c[p] = p;
      }), Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Nr = o() ? Object.assign : function(i, s) {
    for (var a, u = r(i), c, p = 1; p < arguments.length; p++) {
      a = Object(arguments[p]);
      for (var g in a)
        t.call(a, g) && (u[g] = a[g]);
      if (e) {
        c = e(a);
        for (var f = 0; f < c.length; f++)
          n.call(a, c[f]) && (u[c[f]] = a[c[f]]);
      }
    }
    return u;
  }, Nr;
}
var _r, fi;
function bo() {
  if (fi)
    return _r;
  fi = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return _r = e, _r;
}
var $r, gi;
function Ls() {
  return gi || (gi = 1, $r = Function.call.bind(Object.prototype.hasOwnProperty)), $r;
}
var Mr, mi;
function Rc() {
  if (mi)
    return Mr;
  mi = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = bo(), n = {}, r = Ls();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(i, s, a, u, c) {
    if (process.env.NODE_ENV !== "production") {
      for (var p in i)
        if (r(i, p)) {
          var g;
          try {
            if (typeof i[p] != "function") {
              var f = Error(
                (u || "React class") + ": " + a + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            g = i[p](s, p, u, a, null, t);
          } catch (h) {
            g = h;
          }
          if (g && !(g instanceof Error) && e(
            (u || "React class") + ": type specification of " + a + " `" + p + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof g + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), g instanceof Error && !(g.message in n)) {
            n[g.message] = !0;
            var d = c ? c() : "";
            e(
              "Failed " + a + " type: " + g.message + (d ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Mr = o, Mr;
}
var Ir, hi;
function Tc() {
  if (hi)
    return Ir;
  hi = 1;
  var e = Vs(), t = Cc(), n = bo(), r = Ls(), o = Rc(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(a) {
    var u = "Warning: " + a;
    typeof console < "u" && console.error(u);
    try {
      throw new Error(u);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return Ir = function(a, u) {
    var c = typeof Symbol == "function" && Symbol.iterator, p = "@@iterator";
    function g(R) {
      var A = R && (c && R[c] || R[p]);
      if (typeof A == "function")
        return A;
    }
    var f = "<<anonymous>>", d = {
      array: y("array"),
      bigint: y("bigint"),
      bool: y("boolean"),
      func: y("function"),
      number: y("number"),
      object: y("object"),
      string: y("string"),
      symbol: y("symbol"),
      any: O(),
      arrayOf: x,
      element: S(),
      elementType: w(),
      instanceOf: T,
      node: V(),
      objectOf: F,
      oneOf: k,
      oneOfType: D,
      shape: $,
      exact: M
    };
    function h(R, A) {
      return R === A ? R !== 0 || 1 / R === 1 / A : R !== R && A !== A;
    }
    function m(R, A) {
      this.message = R, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function v(R) {
      if (process.env.NODE_ENV !== "production")
        var A = {}, H = 0;
      function X(G, q, W, U, J, Z, ae) {
        if (U = U || f, Z = Z || W, ae !== n) {
          if (u) {
            var I = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw I.name = "Invariant Violation", I;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Q = U + ":" + W;
            !A[Q] && // Avoid spamming the console because they are often not actionable except for lib authors
            H < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + U + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[Q] = !0, H++);
          }
        }
        return q[W] == null ? G ? q[W] === null ? new m("The " + J + " `" + Z + "` is marked as required " + ("in `" + U + "`, but its value is `null`.")) : new m("The " + J + " `" + Z + "` is marked as required in " + ("`" + U + "`, but its value is `undefined`.")) : null : R(q, W, U, J, Z);
      }
      var z = X.bind(null, !1);
      return z.isRequired = X.bind(null, !0), z;
    }
    function y(R) {
      function A(H, X, z, G, q, W) {
        var U = H[X], J = _(U);
        if (J !== R) {
          var Z = j(U);
          return new m(
            "Invalid " + G + " `" + q + "` of type " + ("`" + Z + "` supplied to `" + z + "`, expected ") + ("`" + R + "`."),
            { expectedType: R }
          );
        }
        return null;
      }
      return v(A);
    }
    function O() {
      return v(s);
    }
    function x(R) {
      function A(H, X, z, G, q) {
        if (typeof R != "function")
          return new m("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var W = H[X];
        if (!Array.isArray(W)) {
          var U = _(W);
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an array."));
        }
        for (var J = 0; J < W.length; J++) {
          var Z = R(W, J, z, G, q + "[" + J + "]", n);
          if (Z instanceof Error)
            return Z;
        }
        return null;
      }
      return v(A);
    }
    function S() {
      function R(A, H, X, z, G) {
        var q = A[H];
        if (!a(q)) {
          var W = _(q);
          return new m("Invalid " + z + " `" + G + "` of type " + ("`" + W + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return v(R);
    }
    function w() {
      function R(A, H, X, z, G) {
        var q = A[H];
        if (!e.isValidElementType(q)) {
          var W = _(q);
          return new m("Invalid " + z + " `" + G + "` of type " + ("`" + W + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return v(R);
    }
    function T(R) {
      function A(H, X, z, G, q) {
        if (!(H[X] instanceof R)) {
          var W = R.name || f, U = ee(H[X]);
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected ") + ("instance of `" + W + "`."));
        }
        return null;
      }
      return v(A);
    }
    function k(R) {
      if (!Array.isArray(R))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function A(H, X, z, G, q) {
        for (var W = H[X], U = 0; U < R.length; U++)
          if (h(W, R[U]))
            return null;
        var J = JSON.stringify(R, function(ae, I) {
          var Q = j(I);
          return Q === "symbol" ? String(I) : I;
        });
        return new m("Invalid " + G + " `" + q + "` of value `" + String(W) + "` " + ("supplied to `" + z + "`, expected one of " + J + "."));
      }
      return v(A);
    }
    function F(R) {
      function A(H, X, z, G, q) {
        if (typeof R != "function")
          return new m("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var W = H[X], U = _(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an object."));
        for (var J in W)
          if (r(W, J)) {
            var Z = R(W, J, z, G, q + "." + J, n);
            if (Z instanceof Error)
              return Z;
          }
        return null;
      }
      return v(A);
    }
    function D(R) {
      if (!Array.isArray(R))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var A = 0; A < R.length; A++) {
        var H = R[A];
        if (typeof H != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ne(H) + " at index " + A + "."
          ), s;
      }
      function X(z, G, q, W, U) {
        for (var J = [], Z = 0; Z < R.length; Z++) {
          var ae = R[Z], I = ae(z, G, q, W, U, n);
          if (I == null)
            return null;
          I.data && r(I.data, "expectedType") && J.push(I.data.expectedType);
        }
        var Q = J.length > 0 ? ", expected one of type [" + J.join(", ") + "]" : "";
        return new m("Invalid " + W + " `" + U + "` supplied to " + ("`" + q + "`" + Q + "."));
      }
      return v(X);
    }
    function V() {
      function R(A, H, X, z, G) {
        return L(A[H]) ? null : new m("Invalid " + z + " `" + G + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return v(R);
    }
    function P(R, A, H, X, z) {
      return new m(
        (R || "React class") + ": " + A + " type `" + H + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function $(R) {
      function A(H, X, z, G, q) {
        var W = H[X], U = _(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var J in R) {
          var Z = R[J];
          if (typeof Z != "function")
            return P(z, G, q, J, j(Z));
          var ae = Z(W, J, z, G, q + "." + J, n);
          if (ae)
            return ae;
        }
        return null;
      }
      return v(A);
    }
    function M(R) {
      function A(H, X, z, G, q) {
        var W = H[X], U = _(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        var J = t({}, H[X], R);
        for (var Z in J) {
          var ae = R[Z];
          if (r(R, Z) && typeof ae != "function")
            return P(z, G, q, Z, j(ae));
          if (!ae)
            return new m(
              "Invalid " + G + " `" + q + "` key `" + Z + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(H[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(R), null, "  ")
            );
          var I = ae(W, Z, z, G, q + "." + Z, n);
          if (I)
            return I;
        }
        return null;
      }
      return v(A);
    }
    function L(R) {
      switch (typeof R) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !R;
        case "object":
          if (Array.isArray(R))
            return R.every(L);
          if (R === null || a(R))
            return !0;
          var A = g(R);
          if (A) {
            var H = A.call(R), X;
            if (A !== R.entries) {
              for (; !(X = H.next()).done; )
                if (!L(X.value))
                  return !1;
            } else
              for (; !(X = H.next()).done; ) {
                var z = X.value;
                if (z && !L(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function B(R, A) {
      return R === "symbol" ? !0 : A ? A["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && A instanceof Symbol : !1;
    }
    function _(R) {
      var A = typeof R;
      return Array.isArray(R) ? "array" : R instanceof RegExp ? "object" : B(A, R) ? "symbol" : A;
    }
    function j(R) {
      if (typeof R > "u" || R === null)
        return "" + R;
      var A = _(R);
      if (A === "object") {
        if (R instanceof Date)
          return "date";
        if (R instanceof RegExp)
          return "regexp";
      }
      return A;
    }
    function ne(R) {
      var A = j(R);
      switch (A) {
        case "array":
        case "object":
          return "an " + A;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + A;
        default:
          return A;
      }
    }
    function ee(R) {
      return !R.constructor || !R.constructor.name ? f : R.constructor.name;
    }
    return d.checkPropTypes = o, d.resetWarningCache = o.resetWarningCache, d.PropTypes = d, d;
  }, Ir;
}
var Ar, vi;
function Pc() {
  if (vi)
    return Ar;
  vi = 1;
  var e = bo();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Ar = function() {
    function r(s, a, u, c, p, g) {
      if (g !== e) {
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
  }, Ar;
}
if (process.env.NODE_ENV !== "production") {
  var Oc = Vs(), kc = !0;
  Yr.exports = Tc()(Oc.isElement, kc);
} else
  Yr.exports = Pc()();
var Nc = Yr.exports;
const l = /* @__PURE__ */ yc(Nc);
function Jt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function Rt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Bs(e) {
  if (!Rt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Bs(e[n]);
  }), t;
}
function st(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? C({}, e) : e;
  return Rt(e) && Rt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Rt(t[o]) && o in e && Rt(e[o]) ? r[o] = st(e[o], t[o], n) : n.clone ? r[o] = Rt(t[o]) ? Bs(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function _c(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function js(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  const u = i.type;
  return typeof u == "function" && !_c(u) && (a = "Did you accidentally use a plain function component for an element instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const zs = Jt(l.element, js);
zs.isRequired = Jt(l.element.isRequired, js);
const Rn = zs;
function $c(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Mc(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  return typeof i == "function" && !$c(i) && (a = "Did you accidentally provide a plain function component instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Ic = Jt(l.elementType, Mc), Ac = "exact-prop: ​";
function Hs(e) {
  return process.env.NODE_ENV === "production" ? e : C({}, e, {
    [Ac]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Ht(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Kr = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wi;
function Fc() {
  if (wi)
    return de;
  wi = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function m(v) {
    if (typeof v == "object" && v !== null) {
      var y = v.$$typeof;
      switch (y) {
        case e:
          switch (v = v.type, v) {
            case n:
            case o:
            case r:
            case c:
            case p:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case a:
                case s:
                case u:
                case f:
                case g:
                case i:
                  return v;
                default:
                  return y;
              }
          }
        case t:
          return y;
      }
    }
  }
  return de.ContextConsumer = s, de.ContextProvider = i, de.Element = e, de.ForwardRef = u, de.Fragment = n, de.Lazy = f, de.Memo = g, de.Portal = t, de.Profiler = o, de.StrictMode = r, de.Suspense = c, de.SuspenseList = p, de.isAsyncMode = function() {
    return !1;
  }, de.isConcurrentMode = function() {
    return !1;
  }, de.isContextConsumer = function(v) {
    return m(v) === s;
  }, de.isContextProvider = function(v) {
    return m(v) === i;
  }, de.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, de.isForwardRef = function(v) {
    return m(v) === u;
  }, de.isFragment = function(v) {
    return m(v) === n;
  }, de.isLazy = function(v) {
    return m(v) === f;
  }, de.isMemo = function(v) {
    return m(v) === g;
  }, de.isPortal = function(v) {
    return m(v) === t;
  }, de.isProfiler = function(v) {
    return m(v) === o;
  }, de.isStrictMode = function(v) {
    return m(v) === r;
  }, de.isSuspense = function(v) {
    return m(v) === c;
  }, de.isSuspenseList = function(v) {
    return m(v) === p;
  }, de.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === n || v === o || v === r || v === c || v === p || v === d || typeof v == "object" && v !== null && (v.$$typeof === f || v.$$typeof === g || v.$$typeof === i || v.$$typeof === s || v.$$typeof === u || v.$$typeof === h || v.getModuleId !== void 0);
  }, de.typeOf = m, de;
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
var bi;
function Dc() {
  return bi || (bi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), h = !1, m = !1, v = !1, y = !1, O = !1, x;
    x = Symbol.for("react.module.reference");
    function S(N) {
      return !!(typeof N == "string" || typeof N == "function" || N === n || N === o || O || N === r || N === c || N === p || y || N === d || h || m || v || typeof N == "object" && N !== null && (N.$$typeof === f || N.$$typeof === g || N.$$typeof === i || N.$$typeof === s || N.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      N.$$typeof === x || N.getModuleId !== void 0));
    }
    function w(N) {
      if (typeof N == "object" && N !== null) {
        var le = N.$$typeof;
        switch (le) {
          case e:
            var Ce = N.type;
            switch (Ce) {
              case n:
              case o:
              case r:
              case c:
              case p:
                return Ce;
              default:
                var Ne = Ce && Ce.$$typeof;
                switch (Ne) {
                  case a:
                  case s:
                  case u:
                  case f:
                  case g:
                  case i:
                    return Ne;
                  default:
                    return le;
                }
            }
          case t:
            return le;
        }
      }
    }
    var T = s, k = i, F = e, D = u, V = n, P = f, $ = g, M = t, L = o, B = r, _ = c, j = p, ne = !1, ee = !1;
    function R(N) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(N) {
      return ee || (ee = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function H(N) {
      return w(N) === s;
    }
    function X(N) {
      return w(N) === i;
    }
    function z(N) {
      return typeof N == "object" && N !== null && N.$$typeof === e;
    }
    function G(N) {
      return w(N) === u;
    }
    function q(N) {
      return w(N) === n;
    }
    function W(N) {
      return w(N) === f;
    }
    function U(N) {
      return w(N) === g;
    }
    function J(N) {
      return w(N) === t;
    }
    function Z(N) {
      return w(N) === o;
    }
    function ae(N) {
      return w(N) === r;
    }
    function I(N) {
      return w(N) === c;
    }
    function Q(N) {
      return w(N) === p;
    }
    fe.ContextConsumer = T, fe.ContextProvider = k, fe.Element = F, fe.ForwardRef = D, fe.Fragment = V, fe.Lazy = P, fe.Memo = $, fe.Portal = M, fe.Profiler = L, fe.StrictMode = B, fe.Suspense = _, fe.SuspenseList = j, fe.isAsyncMode = R, fe.isConcurrentMode = A, fe.isContextConsumer = H, fe.isContextProvider = X, fe.isElement = z, fe.isForwardRef = G, fe.isFragment = q, fe.isLazy = W, fe.isMemo = U, fe.isPortal = J, fe.isProfiler = Z, fe.isStrictMode = ae, fe.isSuspense = I, fe.isSuspenseList = Q, fe.isValidElementType = S, fe.typeOf = w;
  }()), fe;
}
process.env.NODE_ENV === "production" ? Kr.exports = Fc() : Kr.exports = Dc();
var Yn = Kr.exports;
const Vc = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Lc(e) {
  const t = `${e}`.match(Vc);
  return t && t[1] || "";
}
function Gs(e, t = "") {
  return e.displayName || e.name || Lc(e) || t;
}
function yi(e, t, n) {
  const r = Gs(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Bc(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Gs(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Yn.ForwardRef:
          return yi(e, e.render, "ForwardRef");
        case Yn.Memo:
          return yi(e, e.type, "memo");
        default:
          return;
      }
  }
}
function at(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const jc = l.oneOfType([l.func, l.object]), yo = jc;
function Qe(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ht(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Jr(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Us(e, t = 166) {
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
function zc(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const a = o || "<<anonymous>>", u = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${u}\` of \`${a}\` is deprecated. ${t}`) : null;
  };
}
function Hc(e, t) {
  var n, r;
  return /* @__PURE__ */ E.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Oe(e) {
  return e && e.ownerDocument || document;
}
function Gt(e) {
  return Oe(e).defaultView || window;
}
function Gc(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? C({}, t.propTypes) : null;
  return (o) => (i, s, a, u, c, ...p) => {
    const g = c || s, f = n == null ? void 0 : n[g];
    if (f) {
      const d = f(i, s, a, u, c, ...p);
      if (d)
        return d;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${g}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Kn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Uc = typeof window < "u" ? E.useLayoutEffect : E.useEffect, kt = Uc;
let xi = 0;
function qc(e) {
  const [t, n] = E.useState(e), r = e || t;
  return E.useEffect(() => {
    t == null && (xi += 1, n(`mui-${xi}`));
  }, [t]), r;
}
const Si = E["useId".toString()];
function qs(e) {
  if (Si !== void 0) {
    const t = Si();
    return e ?? t;
  }
  return qc(e);
}
function Wc(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function Ws({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = E.useRef(e !== void 0), [i, s] = E.useState(t), a = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    E.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: c
    } = E.useRef(t);
    E.useEffect(() => {
      !o && c !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const u = E.useCallback((c) => {
    o || s(c);
  }, []);
  return [a, u];
}
function yn(e) {
  const t = E.useRef(e);
  return kt(() => {
    t.current = e;
  }), E.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function qe(...e) {
  return E.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Kn(n, t);
    });
  }, e);
}
const Ei = {};
function Xc(e, t) {
  const n = E.useRef(Ei);
  return n.current === Ei && (n.current = e(t)), n;
}
const Yc = [];
function Kc(e) {
  E.useEffect(e, Yc);
}
class Tn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Tn();
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
function pn() {
  const e = Xc(Tn.create).current;
  return Kc(e.disposeEffect), e;
}
let sr = !0, Zr = !1;
const Jc = new Tn(), Zc = {
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
function Qc(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Zc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function ep(e) {
  e.metaKey || e.altKey || e.ctrlKey || (sr = !0);
}
function Fr() {
  sr = !1;
}
function tp() {
  this.visibilityState === "hidden" && Zr && (sr = !0);
}
function np(e) {
  e.addEventListener("keydown", ep, !0), e.addEventListener("mousedown", Fr, !0), e.addEventListener("pointerdown", Fr, !0), e.addEventListener("touchstart", Fr, !0), e.addEventListener("visibilitychange", tp, !0);
}
function rp(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return sr || Qc(t);
}
function Xs() {
  const e = E.useCallback((o) => {
    o != null && np(o.ownerDocument);
  }, []), t = E.useRef(!1);
  function n() {
    return t.current ? (Zr = !0, Jc.start(100, () => {
      Zr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return rp(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Ys(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function op(e) {
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
function ip(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const sp = Number.isInteger || ip;
function Ks(e, t, n, r) {
  const o = e[t];
  if (o == null || !sp(o)) {
    const i = op(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function Js(e, t, ...n) {
  return e[t] === void 0 ? null : Ks(e, t, ...n);
}
function Qr() {
  return null;
}
Js.isRequired = Ks;
Qr.isRequired = Qr;
const Zs = process.env.NODE_ENV === "production" ? Qr : Js;
function Qs(e, t) {
  const n = C({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = C({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = C({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = Qs(o[s], i[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function ct(e, t, n = void 0) {
  const r = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = e[o].reduce((i, s) => {
        if (s) {
          const a = t(s);
          a !== "" && i.push(a), n && n[s] && i.push(n[s]);
        }
        return i;
      }, []).join(" ");
    }
  ), r;
}
const Ci = (e) => e, ap = () => {
  let e = Ci;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ci;
    }
  };
}, lp = ap(), ea = lp, ta = {
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
function tt(e, t, n = "Mui") {
  const r = ta[t];
  return r ? `${n}-${r}` : `${ea.generate(e)}-${t}`;
}
function vt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = tt(e, o, n);
  }), r;
}
function up(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function na(e) {
  return typeof e == "string";
}
function dn(e, t, n) {
  return e === void 0 || na(e) ? t : C({}, t, {
    ownerState: C({}, t.ownerState, n)
  });
}
const cp = {
  disableDefaultClasses: !1
}, pp = /* @__PURE__ */ E.createContext(cp);
function dp(e) {
  const {
    disableDefaultClasses: t
  } = E.useContext(pp);
  return (n) => t ? "" : e(n);
}
function ra(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function fp(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Ri(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function gp(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const d = Pe(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), h = C({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = C({}, n, o, r);
    return d.length > 0 && (m.className = d), Object.keys(h).length > 0 && (m.style = h), {
      props: m,
      internalRef: void 0
    };
  }
  const s = ra(C({}, o, r)), a = Ri(r), u = Ri(o), c = t(s), p = Pe(c == null ? void 0 : c.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), g = C({}, c == null ? void 0 : c.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = C({}, c, n, u, a);
  return p.length > 0 && (f.className = p), Object.keys(g).length > 0 && (f.style = g), {
    props: f,
    internalRef: c.ref
  };
}
const mp = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Nt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = ge(e, mp), a = i ? {} : fp(r, o), {
    props: u,
    internalRef: c
  } = gp(C({}, s, {
    externalSlotProps: a
  })), p = qe(c, a == null ? void 0 : a.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return dn(n, C({}, u, {
    ref: p
  }), o);
}
const oa = "base";
function hp(e) {
  return `${oa}--${e}`;
}
function vp(e, t) {
  return `${oa}-${e}-${t}`;
}
function ia(e, t) {
  const n = ta[t];
  return n ? hp(n) : vp(e, t);
}
function wp(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = ia(e, r);
  }), n;
}
const bp = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function yp(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function xp(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Sp(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || xp(e));
}
function Ep(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(bp)).forEach((r, o) => {
    const i = yp(r);
    i === -1 || !Sp(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Cp() {
  return !0;
}
function Jn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Ep,
    isEnabled: s = Cp,
    open: a
  } = e, u = E.useRef(!1), c = E.useRef(null), p = E.useRef(null), g = E.useRef(null), f = E.useRef(null), d = E.useRef(!1), h = E.useRef(null), m = qe(t.ref, h), v = E.useRef(null);
  E.useEffect(() => {
    !a || !h.current || (d.current = !n);
  }, [n, a]), E.useEffect(() => {
    if (!a || !h.current)
      return;
    const x = Oe(h.current);
    return h.current.contains(x.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), d.current && h.current.focus()), () => {
      o || (g.current && g.current.focus && (u.current = !0, g.current.focus()), g.current = null);
    };
  }, [a]), E.useEffect(() => {
    if (!a || !h.current)
      return;
    const x = Oe(h.current), S = (k) => {
      v.current = k, !(r || !s() || k.key !== "Tab") && x.activeElement === h.current && k.shiftKey && (u.current = !0, p.current && p.current.focus());
    }, w = () => {
      const k = h.current;
      if (k === null)
        return;
      if (!x.hasFocus() || !s() || u.current) {
        u.current = !1;
        return;
      }
      if (k.contains(x.activeElement) || r && x.activeElement !== c.current && x.activeElement !== p.current)
        return;
      if (x.activeElement !== f.current)
        f.current = null;
      else if (f.current !== null)
        return;
      if (!d.current)
        return;
      let F = [];
      if ((x.activeElement === c.current || x.activeElement === p.current) && (F = i(h.current)), F.length > 0) {
        var D, V;
        const P = !!((D = v.current) != null && D.shiftKey && ((V = v.current) == null ? void 0 : V.key) === "Tab"), $ = F[0], M = F[F.length - 1];
        typeof $ != "string" && typeof M != "string" && (P ? M.focus() : $.focus());
      } else
        k.focus();
    };
    x.addEventListener("focusin", w), x.addEventListener("keydown", S, !0);
    const T = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && w();
    }, 50);
    return () => {
      clearInterval(T), x.removeEventListener("focusin", w), x.removeEventListener("keydown", S, !0);
    };
  }, [n, r, o, s, a, i]);
  const y = (x) => {
    g.current === null && (g.current = x.relatedTarget), d.current = !0, f.current = x.target;
    const S = t.props.onFocus;
    S && S(x);
  }, O = (x) => {
    g.current === null && (g.current = x.relatedTarget), d.current = !0;
  };
  return /* @__PURE__ */ te(E.Fragment, {
    children: [/* @__PURE__ */ b("div", {
      tabIndex: a ? 0 : -1,
      onFocus: O,
      ref: c,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ E.cloneElement(t, {
      ref: m,
      onFocus: y
    }), /* @__PURE__ */ b("div", {
      tabIndex: a ? 0 : -1,
      onFocus: O,
      ref: p,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Jn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: Rn,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: l.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: l.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: l.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: l.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: l.func,
  /**
   * If `true`, focus is locked.
   */
  open: l.bool.isRequired
});
process.env.NODE_ENV !== "production" && (Jn["propTypes"] = Hs(Jn.propTypes));
function Rp(e) {
  return typeof e == "function" ? e() : e;
}
const xn = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, a] = E.useState(null), u = qe(/* @__PURE__ */ E.isValidElement(r) ? r.ref : null, n);
  if (kt(() => {
    i || a(Rp(o) || document.body);
  }, [o, i]), kt(() => {
    if (s && !i)
      return Kn(n, s), () => {
        Kn(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ E.isValidElement(r)) {
      const c = {
        ref: u
      };
      return /* @__PURE__ */ E.cloneElement(r, c);
    }
    return /* @__PURE__ */ b(E.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ b(E.Fragment, {
    children: s && /* @__PURE__ */ Ll.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (xn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: l.node,
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
  container: l.oneOfType([at, l.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: l.bool
});
process.env.NODE_ENV !== "production" && (xn["propTypes"] = Hs(xn.propTypes));
function Tp(e) {
  const t = Oe(e);
  return t.body === e ? Gt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function hn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Ti(e) {
  return parseInt(Gt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Pp(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Pi(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const a = i.indexOf(s) === -1, u = !Pp(s);
    a && u && hn(s, o);
  });
}
function Dr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Op(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Tp(r)) {
      const s = Ys(Oe(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Ti(r) + s}px`;
      const a = Oe(r).querySelectorAll(".mui-fixed");
      [].forEach.call(a, (u) => {
        n.push({
          value: u.style.paddingRight,
          property: "padding-right",
          el: u
        }), u.style.paddingRight = `${Ti(u) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Oe(r).body;
    else {
      const s = r.parentElement, a = Gt(r);
      i = (s == null ? void 0 : s.nodeName) === "HTML" && a.getComputedStyle(s).overflowY === "scroll" ? s : r;
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
      property: a
    }) => {
      i ? s.style.setProperty(a, i) : s.style.removeProperty(a);
    });
  };
}
function kp(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Np {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && hn(t.modalRef, !1);
    const o = kp(n);
    Pi(n, t.mount, t.modalRef, o, !0);
    const i = Dr(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Dr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Op(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Dr(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && hn(t.modalRef, n), Pi(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && hn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function _p(e) {
  return typeof e == "function" ? e() : e;
}
function $p(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Mp = new Np();
function Ip(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Mp,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: a,
    children: u,
    onClose: c,
    open: p,
    rootRef: g
  } = e, f = E.useRef({}), d = E.useRef(null), h = E.useRef(null), m = qe(h, g), [v, y] = E.useState(!p), O = $p(u);
  let x = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (x = !1);
  const S = () => Oe(d.current), w = () => (f.current.modalRef = h.current, f.current.mount = d.current, f.current), T = () => {
    o.mount(w(), {
      disableScrollLock: r
    }), h.current && (h.current.scrollTop = 0);
  }, k = yn(() => {
    const _ = _p(t) || S().body;
    o.add(w(), _), h.current && T();
  }), F = E.useCallback(() => o.isTopModal(w()), [o]), D = yn((_) => {
    d.current = _, _ && (p && F() ? T() : h.current && hn(h.current, x));
  }), V = E.useCallback(() => {
    o.remove(w(), x);
  }, [x, o]);
  E.useEffect(() => () => {
    V();
  }, [V]), E.useEffect(() => {
    p ? k() : (!O || !i) && V();
  }, [p, V, O, i, k]);
  const P = (_) => (j) => {
    var ne;
    (ne = _.onKeyDown) == null || ne.call(_, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !F()) && (n || (j.stopPropagation(), c && c(j, "escapeKeyDown")));
  }, $ = (_) => (j) => {
    var ne;
    (ne = _.onClick) == null || ne.call(_, j), j.target === j.currentTarget && c && c(j, "backdropClick");
  };
  return {
    getRootProps: (_ = {}) => {
      const j = ra(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const ne = C({}, j, _);
      return C({
        role: "presentation"
      }, ne, {
        onKeyDown: P(ne),
        ref: m
      });
    },
    getBackdropProps: (_ = {}) => {
      const j = _;
      return C({
        "aria-hidden": !0
      }, j, {
        onClick: $(j),
        open: p
      });
    },
    getTransitionProps: () => {
      const _ = () => {
        y(!1), s && s();
      }, j = () => {
        y(!0), a && a(), i && V();
      };
      return {
        onEnter: Jr(_, u == null ? void 0 : u.props.onEnter),
        onExited: Jr(j, u == null ? void 0 : u.props.onExited)
      };
    },
    rootRef: m,
    portalRef: D,
    isTopModal: F,
    exited: v,
    hasTransition: O
  };
}
var Ie = "top", We = "bottom", Xe = "right", Ae = "left", xo = "auto", Pn = [Ie, We, Xe, Ae], Ut = "start", Sn = "end", Ap = "clippingParents", sa = "viewport", an = "popper", Fp = "reference", Oi = /* @__PURE__ */ Pn.reduce(function(e, t) {
  return e.concat([t + "-" + Ut, t + "-" + Sn]);
}, []), aa = /* @__PURE__ */ [].concat(Pn, [xo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Ut, t + "-" + Sn]);
}, []), Dp = "beforeRead", Vp = "read", Lp = "afterRead", Bp = "beforeMain", jp = "main", zp = "afterMain", Hp = "beforeWrite", Gp = "write", Up = "afterWrite", qp = [Dp, Vp, Lp, Bp, jp, zp, Hp, Gp, Up];
function et(e) {
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
function _t(e) {
  var t = ze(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ue(e) {
  var t = ze(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function So(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = ze(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Wp(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Ue(i) || !et(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var a = o[s];
      a === !1 ? i.removeAttribute(s) : i.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function Xp(e) {
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
      var o = t.elements[r], i = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), a = s.reduce(function(u, c) {
        return u[c] = "", u;
      }, {});
      !Ue(o) || !et(o) || (Object.assign(o.style, a), Object.keys(i).forEach(function(u) {
        o.removeAttribute(u);
      }));
    });
  };
}
const Yp = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Wp,
  effect: Xp,
  requires: ["computeStyles"]
};
function Ze(e) {
  return e.split("-")[0];
}
var Pt = Math.max, Zn = Math.min, qt = Math.round;
function eo() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function la() {
  return !/^((?!chrome|android).)*safari/i.test(eo());
}
function Wt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Ue(e) && (o = e.offsetWidth > 0 && qt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && qt(r.height) / e.offsetHeight || 1);
  var s = _t(e) ? ze(e) : window, a = s.visualViewport, u = !la() && n, c = (r.left + (u && a ? a.offsetLeft : 0)) / o, p = (r.top + (u && a ? a.offsetTop : 0)) / i, g = r.width / o, f = r.height / i;
  return {
    width: g,
    height: f,
    top: p,
    right: c + g,
    bottom: p + f,
    left: c,
    x: c,
    y: p
  };
}
function Eo(e) {
  var t = Wt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function ua(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && So(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function lt(e) {
  return ze(e).getComputedStyle(e);
}
function Kp(e) {
  return ["table", "td", "th"].indexOf(et(e)) >= 0;
}
function wt(e) {
  return ((_t(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function ar(e) {
  return et(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (So(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    wt(e)
  );
}
function ki(e) {
  return !Ue(e) || // https://github.com/popperjs/popper-core/issues/837
  lt(e).position === "fixed" ? null : e.offsetParent;
}
function Jp(e) {
  var t = /firefox/i.test(eo()), n = /Trident/i.test(eo());
  if (n && Ue(e)) {
    var r = lt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = ar(e);
  for (So(o) && (o = o.host); Ue(o) && ["html", "body"].indexOf(et(o)) < 0; ) {
    var i = lt(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function On(e) {
  for (var t = ze(e), n = ki(e); n && Kp(n) && lt(n).position === "static"; )
    n = ki(n);
  return n && (et(n) === "html" || et(n) === "body" && lt(n).position === "static") ? t : n || Jp(e) || t;
}
function Co(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function vn(e, t, n) {
  return Pt(e, Zn(t, n));
}
function Zp(e, t, n) {
  var r = vn(e, t, n);
  return r > n ? n : r;
}
function ca() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function pa(e) {
  return Object.assign({}, ca(), e);
}
function da(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Qp = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, pa(typeof t != "number" ? t : da(t, Pn));
};
function ed(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, a = Ze(n.placement), u = Co(a), c = [Ae, Xe].indexOf(a) >= 0, p = c ? "height" : "width";
  if (!(!i || !s)) {
    var g = Qp(o.padding, n), f = Eo(i), d = u === "y" ? Ie : Ae, h = u === "y" ? We : Xe, m = n.rects.reference[p] + n.rects.reference[u] - s[u] - n.rects.popper[p], v = s[u] - n.rects.reference[u], y = On(i), O = y ? u === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, x = m / 2 - v / 2, S = g[d], w = O - f[p] - g[h], T = O / 2 - f[p] / 2 + x, k = vn(S, T, w), F = u;
    n.modifiersData[r] = (t = {}, t[F] = k, t.centerOffset = k - T, t);
  }
}
function td(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ua(t.elements.popper, o) && (t.elements.arrow = o));
}
const nd = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: ed,
  effect: td,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Xt(e) {
  return e.split("-")[1];
}
var rd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function od(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: qt(n * o) / o || 0,
    y: qt(r * o) / o || 0
  };
}
function Ni(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, a = e.position, u = e.gpuAcceleration, c = e.adaptive, p = e.roundOffsets, g = e.isFixed, f = s.x, d = f === void 0 ? 0 : f, h = s.y, m = h === void 0 ? 0 : h, v = typeof p == "function" ? p({
    x: d,
    y: m
  }) : {
    x: d,
    y: m
  };
  d = v.x, m = v.y;
  var y = s.hasOwnProperty("x"), O = s.hasOwnProperty("y"), x = Ae, S = Ie, w = window;
  if (c) {
    var T = On(n), k = "clientHeight", F = "clientWidth";
    if (T === ze(n) && (T = wt(n), lt(T).position !== "static" && a === "absolute" && (k = "scrollHeight", F = "scrollWidth")), T = T, o === Ie || (o === Ae || o === Xe) && i === Sn) {
      S = We;
      var D = g && T === w && w.visualViewport ? w.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[k]
      );
      m -= D - r.height, m *= u ? 1 : -1;
    }
    if (o === Ae || (o === Ie || o === We) && i === Sn) {
      x = Xe;
      var V = g && T === w && w.visualViewport ? w.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        T[F]
      );
      d -= V - r.width, d *= u ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: a
  }, c && rd), $ = p === !0 ? od({
    x: d,
    y: m
  }, ze(n)) : {
    x: d,
    y: m
  };
  if (d = $.x, m = $.y, u) {
    var M;
    return Object.assign({}, P, (M = {}, M[S] = O ? "0" : "", M[x] = y ? "0" : "", M.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + m + "px)" : "translate3d(" + d + "px, " + m + "px, 0)", M));
  }
  return Object.assign({}, P, (t = {}, t[S] = O ? m + "px" : "", t[x] = y ? d + "px" : "", t.transform = "", t));
}
function id(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, a = n.roundOffsets, u = a === void 0 ? !0 : a, c = {
    placement: Ze(t.placement),
    variation: Xt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ni(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: u
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ni(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: u
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const sd = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: id,
  data: {}
};
var Bn = {
  passive: !0
};
function ad(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, a = s === void 0 ? !0 : s, u = ze(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && c.forEach(function(p) {
    p.addEventListener("scroll", n.update, Bn);
  }), a && u.addEventListener("resize", n.update, Bn), function() {
    i && c.forEach(function(p) {
      p.removeEventListener("scroll", n.update, Bn);
    }), a && u.removeEventListener("resize", n.update, Bn);
  };
}
const ld = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ad,
  data: {}
};
var ud = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Un(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return ud[t];
  });
}
var cd = {
  start: "end",
  end: "start"
};
function _i(e) {
  return e.replace(/start|end/g, function(t) {
    return cd[t];
  });
}
function Ro(e) {
  var t = ze(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function To(e) {
  return Wt(wt(e)).left + Ro(e).scrollLeft;
}
function pd(e, t) {
  var n = ze(e), r = wt(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, a = 0, u = 0;
  if (o) {
    i = o.width, s = o.height;
    var c = la();
    (c || !c && t === "fixed") && (a = o.offsetLeft, u = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a + To(e),
    y: u
  };
}
function dd(e) {
  var t, n = wt(e), r = Ro(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = Pt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Pt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), a = -r.scrollLeft + To(e), u = -r.scrollTop;
  return lt(o || n).direction === "rtl" && (a += Pt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: a,
    y: u
  };
}
function Po(e) {
  var t = lt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function fa(e) {
  return ["html", "body", "#document"].indexOf(et(e)) >= 0 ? e.ownerDocument.body : Ue(e) && Po(e) ? e : fa(ar(e));
}
function wn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = fa(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = ze(r), s = o ? [i].concat(i.visualViewport || [], Po(r) ? r : []) : r, a = t.concat(s);
  return o ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(wn(ar(s)))
  );
}
function to(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function fd(e, t) {
  var n = Wt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function $i(e, t, n) {
  return t === sa ? to(pd(e, n)) : _t(t) ? fd(t, n) : to(dd(wt(e)));
}
function gd(e) {
  var t = wn(ar(e)), n = ["absolute", "fixed"].indexOf(lt(e).position) >= 0, r = n && Ue(e) ? On(e) : e;
  return _t(r) ? t.filter(function(o) {
    return _t(o) && ua(o, r) && et(o) !== "body";
  }) : [];
}
function md(e, t, n, r) {
  var o = t === "clippingParents" ? gd(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], a = i.reduce(function(u, c) {
    var p = $i(e, c, r);
    return u.top = Pt(p.top, u.top), u.right = Zn(p.right, u.right), u.bottom = Zn(p.bottom, u.bottom), u.left = Pt(p.left, u.left), u;
  }, $i(e, s, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function ga(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ze(r) : null, i = r ? Xt(r) : null, s = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, u;
  switch (o) {
    case Ie:
      u = {
        x: s,
        y: t.y - n.height
      };
      break;
    case We:
      u = {
        x: s,
        y: t.y + t.height
      };
      break;
    case Xe:
      u = {
        x: t.x + t.width,
        y: a
      };
      break;
    case Ae:
      u = {
        x: t.x - n.width,
        y: a
      };
      break;
    default:
      u = {
        x: t.x,
        y: t.y
      };
  }
  var c = o ? Co(o) : null;
  if (c != null) {
    var p = c === "y" ? "height" : "width";
    switch (i) {
      case Ut:
        u[c] = u[c] - (t[p] / 2 - n[p] / 2);
        break;
      case Sn:
        u[c] = u[c] + (t[p] / 2 - n[p] / 2);
        break;
    }
  }
  return u;
}
function En(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, a = n.boundary, u = a === void 0 ? Ap : a, c = n.rootBoundary, p = c === void 0 ? sa : c, g = n.elementContext, f = g === void 0 ? an : g, d = n.altBoundary, h = d === void 0 ? !1 : d, m = n.padding, v = m === void 0 ? 0 : m, y = pa(typeof v != "number" ? v : da(v, Pn)), O = f === an ? Fp : an, x = e.rects.popper, S = e.elements[h ? O : f], w = md(_t(S) ? S : S.contextElement || wt(e.elements.popper), u, p, s), T = Wt(e.elements.reference), k = ga({
    reference: T,
    element: x,
    strategy: "absolute",
    placement: o
  }), F = to(Object.assign({}, x, k)), D = f === an ? F : T, V = {
    top: w.top - D.top + y.top,
    bottom: D.bottom - w.bottom + y.bottom,
    left: w.left - D.left + y.left,
    right: D.right - w.right + y.right
  }, P = e.modifiersData.offset;
  if (f === an && P) {
    var $ = P[o];
    Object.keys(V).forEach(function(M) {
      var L = [Xe, We].indexOf(M) >= 0 ? 1 : -1, B = [Ie, We].indexOf(M) >= 0 ? "y" : "x";
      V[M] += $[B] * L;
    });
  }
  return V;
}
function hd(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, a = n.flipVariations, u = n.allowedAutoPlacements, c = u === void 0 ? aa : u, p = Xt(r), g = p ? a ? Oi : Oi.filter(function(h) {
    return Xt(h) === p;
  }) : Pn, f = g.filter(function(h) {
    return c.indexOf(h) >= 0;
  });
  f.length === 0 && (f = g);
  var d = f.reduce(function(h, m) {
    return h[m] = En(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[Ze(m)], h;
  }, {});
  return Object.keys(d).sort(function(h, m) {
    return d[h] - d[m];
  });
}
function vd(e) {
  if (Ze(e) === xo)
    return [];
  var t = Un(e);
  return [_i(e), t, _i(t)];
}
function wd(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !0 : s, u = n.fallbackPlacements, c = n.padding, p = n.boundary, g = n.rootBoundary, f = n.altBoundary, d = n.flipVariations, h = d === void 0 ? !0 : d, m = n.allowedAutoPlacements, v = t.options.placement, y = Ze(v), O = y === v, x = u || (O || !h ? [Un(v)] : vd(v)), S = [v].concat(x).reduce(function(z, G) {
      return z.concat(Ze(G) === xo ? hd(t, {
        placement: G,
        boundary: p,
        rootBoundary: g,
        padding: c,
        flipVariations: h,
        allowedAutoPlacements: m
      }) : G);
    }, []), w = t.rects.reference, T = t.rects.popper, k = /* @__PURE__ */ new Map(), F = !0, D = S[0], V = 0; V < S.length; V++) {
      var P = S[V], $ = Ze(P), M = Xt(P) === Ut, L = [Ie, We].indexOf($) >= 0, B = L ? "width" : "height", _ = En(t, {
        placement: P,
        boundary: p,
        rootBoundary: g,
        altBoundary: f,
        padding: c
      }), j = L ? M ? Xe : Ae : M ? We : Ie;
      w[B] > T[B] && (j = Un(j));
      var ne = Un(j), ee = [];
      if (i && ee.push(_[$] <= 0), a && ee.push(_[j] <= 0, _[ne] <= 0), ee.every(function(z) {
        return z;
      })) {
        D = P, F = !1;
        break;
      }
      k.set(P, ee);
    }
    if (F)
      for (var R = h ? 3 : 1, A = function(G) {
        var q = S.find(function(W) {
          var U = k.get(W);
          if (U)
            return U.slice(0, G).every(function(J) {
              return J;
            });
        });
        if (q)
          return D = q, "break";
      }, H = R; H > 0; H--) {
        var X = A(H);
        if (X === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[r]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const bd = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: wd,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Mi(e, t, n) {
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
function Ii(e) {
  return [Ie, Xe, We, Ae].some(function(t) {
    return e[t] >= 0;
  });
}
function yd(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = En(t, {
    elementContext: "reference"
  }), a = En(t, {
    altBoundary: !0
  }), u = Mi(s, r), c = Mi(a, o, i), p = Ii(u), g = Ii(c);
  t.modifiersData[n] = {
    referenceClippingOffsets: u,
    popperEscapeOffsets: c,
    isReferenceHidden: p,
    hasPopperEscaped: g
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": g
  });
}
const xd = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: yd
};
function Sd(e, t, n) {
  var r = Ze(e), o = [Ae, Ie].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], a = i[1];
  return s = s || 0, a = (a || 0) * o, [Ae, Xe].indexOf(r) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function Ed(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = aa.reduce(function(p, g) {
    return p[g] = Sd(g, t.rects, i), p;
  }, {}), a = s[t.placement], u = a.x, c = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += u, t.modifiersData.popperOffsets.y += c), t.modifiersData[r] = s;
}
const Cd = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ed
};
function Rd(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = ga({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Td = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Rd,
  data: {}
};
function Pd(e) {
  return e === "x" ? "y" : "x";
}
function Od(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !1 : s, u = n.boundary, c = n.rootBoundary, p = n.altBoundary, g = n.padding, f = n.tether, d = f === void 0 ? !0 : f, h = n.tetherOffset, m = h === void 0 ? 0 : h, v = En(t, {
    boundary: u,
    rootBoundary: c,
    padding: g,
    altBoundary: p
  }), y = Ze(t.placement), O = Xt(t.placement), x = !O, S = Co(y), w = Pd(S), T = t.modifiersData.popperOffsets, k = t.rects.reference, F = t.rects.popper, D = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, V = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, $ = {
    x: 0,
    y: 0
  };
  if (T) {
    if (i) {
      var M, L = S === "y" ? Ie : Ae, B = S === "y" ? We : Xe, _ = S === "y" ? "height" : "width", j = T[S], ne = j + v[L], ee = j - v[B], R = d ? -F[_] / 2 : 0, A = O === Ut ? k[_] : F[_], H = O === Ut ? -F[_] : -k[_], X = t.elements.arrow, z = d && X ? Eo(X) : {
        width: 0,
        height: 0
      }, G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ca(), q = G[L], W = G[B], U = vn(0, k[_], z[_]), J = x ? k[_] / 2 - R - U - q - V.mainAxis : A - U - q - V.mainAxis, Z = x ? -k[_] / 2 + R + U + W + V.mainAxis : H + U + W + V.mainAxis, ae = t.elements.arrow && On(t.elements.arrow), I = ae ? S === "y" ? ae.clientTop || 0 : ae.clientLeft || 0 : 0, Q = (M = P == null ? void 0 : P[S]) != null ? M : 0, N = j + J - Q - I, le = j + Z - Q, Ce = vn(d ? Zn(ne, N) : ne, j, d ? Pt(ee, le) : ee);
      T[S] = Ce, $[S] = Ce - j;
    }
    if (a) {
      var Ne, xe = S === "x" ? Ie : Ae, yt = S === "x" ? We : Xe, _e = T[w], nt = w === "y" ? "height" : "width", De = _e + v[xe], rt = _e - v[yt], Re = [Ie, Ae].indexOf(y) !== -1, Mt = (Ne = P == null ? void 0 : P[w]) != null ? Ne : 0, xt = Re ? De : _e - k[nt] - F[nt] - Mt + V.altAxis, Zt = Re ? _e + k[nt] + F[nt] - Mt - V.altAxis : rt, $n = d && Re ? Zp(xt, _e, Zt) : vn(d ? xt : De, _e, d ? Zt : rt);
      T[w] = $n, $[w] = $n - _e;
    }
    t.modifiersData[r] = $;
  }
}
const kd = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Od,
  requiresIfExists: ["offset"]
};
function Nd(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function _d(e) {
  return e === ze(e) || !Ue(e) ? Ro(e) : Nd(e);
}
function $d(e) {
  var t = e.getBoundingClientRect(), n = qt(t.width) / e.offsetWidth || 1, r = qt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Md(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ue(t), o = Ue(t) && $d(t), i = wt(t), s = Wt(e, o, n), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((et(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Po(i)) && (a = _d(t)), Ue(t) ? (u = Wt(t, !0), u.x += t.clientLeft, u.y += t.clientTop) : i && (u.x = To(i))), {
    x: s.left + a.scrollLeft - u.x,
    y: s.top + a.scrollTop - u.y,
    width: s.width,
    height: s.height
  };
}
function Id(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function(a) {
      if (!n.has(a)) {
        var u = t.get(a);
        u && o(u);
      }
    }), r.push(i);
  }
  return e.forEach(function(i) {
    n.has(i.name) || o(i);
  }), r;
}
function Ad(e) {
  var t = Id(e);
  return qp.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Fd(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Dd(e) {
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
var Ai = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Fi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Vd(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? Ai : o;
  return function(a, u, c) {
    c === void 0 && (c = i);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ai, i),
      modifiersData: {},
      elements: {
        reference: a,
        popper: u
      },
      attributes: {},
      styles: {}
    }, g = [], f = !1, d = {
      state: p,
      setOptions: function(y) {
        var O = typeof y == "function" ? y(p.options) : y;
        m(), p.options = Object.assign({}, i, p.options, O), p.scrollParents = {
          reference: _t(a) ? wn(a) : a.contextElement ? wn(a.contextElement) : [],
          popper: wn(u)
        };
        var x = Ad(Dd([].concat(r, p.options.modifiers)));
        return p.orderedModifiers = x.filter(function(S) {
          return S.enabled;
        }), h(), d.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var y = p.elements, O = y.reference, x = y.popper;
          if (Fi(O, x)) {
            p.rects = {
              reference: Md(O, On(x), p.options.strategy === "fixed"),
              popper: Eo(x)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(V) {
              return p.modifiersData[V.name] = Object.assign({}, V.data);
            });
            for (var S = 0; S < p.orderedModifiers.length; S++) {
              if (p.reset === !0) {
                p.reset = !1, S = -1;
                continue;
              }
              var w = p.orderedModifiers[S], T = w.fn, k = w.options, F = k === void 0 ? {} : k, D = w.name;
              typeof T == "function" && (p = T({
                state: p,
                options: F,
                name: D,
                instance: d
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Fd(function() {
        return new Promise(function(v) {
          d.forceUpdate(), v(p);
        });
      }),
      destroy: function() {
        m(), f = !0;
      }
    };
    if (!Fi(a, u))
      return d;
    d.setOptions(c).then(function(v) {
      !f && c.onFirstUpdate && c.onFirstUpdate(v);
    });
    function h() {
      p.orderedModifiers.forEach(function(v) {
        var y = v.name, O = v.options, x = O === void 0 ? {} : O, S = v.effect;
        if (typeof S == "function") {
          var w = S({
            state: p,
            name: y,
            instance: d,
            options: x
          }), T = function() {
          };
          g.push(w || T);
        }
      });
    }
    function m() {
      g.forEach(function(v) {
        return v();
      }), g = [];
    }
    return d;
  };
}
var Ld = [ld, Td, sd, Yp, Cd, bd, kd, nd, xd], Bd = /* @__PURE__ */ Vd({
  defaultModifiers: Ld
});
const ma = "Popper";
function jd(e) {
  return ia(ma, e);
}
wp(ma, ["root"]);
const zd = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Hd = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Gd(e, t) {
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
function Qn(e) {
  return typeof e == "function" ? e() : e;
}
function lr(e) {
  return e.nodeType !== void 0;
}
function Ud(e) {
  return !lr(e);
}
const qd = () => ct({
  root: ["root"]
}, dp(jd)), Wd = {}, Xd = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: a,
    modifiers: u,
    open: c,
    placement: p,
    popperOptions: g,
    popperRef: f,
    slotProps: d = {},
    slots: h = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, v = ge(t, zd), y = E.useRef(null), O = qe(y, n), x = E.useRef(null), S = qe(x, f), w = E.useRef(S);
  kt(() => {
    w.current = S;
  }, [S]), E.useImperativeHandle(f, () => x.current, []);
  const T = Gd(p, s), [k, F] = E.useState(T), [D, V] = E.useState(Qn(o));
  E.useEffect(() => {
    x.current && x.current.forceUpdate();
  }), E.useEffect(() => {
    o && V(Qn(o));
  }, [o]), kt(() => {
    if (!D || !c)
      return;
    const B = (ne) => {
      F(ne.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && lr(D) && D.nodeType === 1) {
      const ne = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ne.top === 0 && ne.left === 0 && ne.right === 0 && ne.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let _ = [{
      name: "preventOverflow",
      options: {
        altBoundary: a
      }
    }, {
      name: "flip",
      options: {
        altBoundary: a
      }
    }, {
      name: "onUpdate",
      enabled: !0,
      phase: "afterWrite",
      fn: ({
        state: ne
      }) => {
        B(ne);
      }
    }];
    u != null && (_ = _.concat(u)), g && g.modifiers != null && (_ = _.concat(g.modifiers));
    const j = Bd(D, y.current, C({
      placement: T
    }, g, {
      modifiers: _
    }));
    return w.current(j), () => {
      j.destroy(), w.current(null);
    };
  }, [D, a, u, c, g, T]);
  const P = {
    placement: k
  };
  m !== null && (P.TransitionProps = m);
  const $ = qd(), M = (r = h.root) != null ? r : "div", L = Nt({
    elementType: M,
    externalSlotProps: d.root,
    externalForwardedProps: v,
    additionalProps: {
      role: "tooltip",
      ref: O
    },
    ownerState: t,
    className: $.root
  });
  return /* @__PURE__ */ b(M, C({}, L, {
    children: typeof i == "function" ? i(P) : i
  }));
}), ha = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: a = !1,
    keepMounted: u = !1,
    modifiers: c,
    open: p,
    placement: g = "bottom",
    popperOptions: f = Wd,
    popperRef: d,
    style: h,
    transition: m = !1,
    slotProps: v = {},
    slots: y = {}
  } = t, O = ge(t, Hd), [x, S] = E.useState(!0), w = () => {
    S(!1);
  }, T = () => {
    S(!0);
  };
  if (!u && !p && (!m || x))
    return null;
  let k;
  if (i)
    k = i;
  else if (r) {
    const V = Qn(r);
    k = V && lr(V) ? Oe(V).body : Oe(null).body;
  }
  const F = !p && u && (!m || x) ? "none" : void 0, D = m ? {
    in: p,
    onEnter: w,
    onExited: T
  } : void 0;
  return /* @__PURE__ */ b(xn, {
    disablePortal: a,
    container: k,
    children: /* @__PURE__ */ b(Xd, C({
      anchorEl: r,
      direction: s,
      disablePortal: a,
      modifiers: c,
      ref: n,
      open: m ? !x : p,
      placement: g,
      popperOptions: f,
      popperRef: d,
      slotProps: v,
      slots: y
    }, O, {
      style: C({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: F
      }, h),
      TransitionProps: D,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (ha.propTypes = {
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
  anchorEl: Jt(l.oneOfType([at, l.object, l.func]), (e) => {
    if (e.open) {
      const t = Qn(e.anchorEl);
      if (t && lr(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Ud(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: l.oneOfType([l.node, l.func]),
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
  container: l.oneOfType([at, l.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: l.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: l.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: l.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: l.arrayOf(l.shape({
    data: l.object,
    effect: l.func,
    enabled: l.bool,
    fn: l.func,
    name: l.any,
    options: l.object,
    phase: l.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: l.arrayOf(l.string),
    requiresIfExists: l.arrayOf(l.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: l.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: l.shape({
    modifiers: l.array,
    onFirstUpdate: l.func,
    placement: l.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: l.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: yo,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: l.shape({
    root: l.oneOfType([l.func, l.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: l.shape({
    root: l.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: l.bool
});
const Yd = ["values", "unit", "step"], Kd = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => C({}, n, {
    [r.key]: r.val
  }), {});
};
function Jd(e) {
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
  } = e, o = ge(e, Yd), i = Kd(t), s = Object.keys(i);
  function a(f) {
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n})`;
  }
  function u(f) {
    return `@media (max-width:${(typeof t[f] == "number" ? t[f] : f) - r / 100}${n})`;
  }
  function c(f, d) {
    const h = s.indexOf(d);
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n}) and (max-width:${(h !== -1 && typeof t[s[h]] == "number" ? t[s[h]] : d) - r / 100}${n})`;
  }
  function p(f) {
    return s.indexOf(f) + 1 < s.length ? c(f, s[s.indexOf(f) + 1]) : a(f);
  }
  function g(f) {
    const d = s.indexOf(f);
    return d === 0 ? a(s[1]) : d === s.length - 1 ? u(s[d]) : c(f, s[s.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  return C({
    keys: s,
    values: i,
    up: a,
    down: u,
    between: c,
    only: p,
    not: g,
    unit: n
  }, o);
}
const Zd = {
  borderRadius: 4
}, Qd = Zd, ef = process.env.NODE_ENV !== "production" ? l.oneOfType([l.number, l.string, l.object, l.array]) : {}, bt = ef;
function bn(e, t) {
  return t ? st(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Oo = {
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
}, Di = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Oo[e]}px)`
};
function ut(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Di;
    return t.reduce((s, a, u) => (s[i.up(i.keys[u])] = n(t[u]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || Di;
    return Object.keys(t).reduce((s, a) => {
      if (Object.keys(i.values || Oo).indexOf(a) !== -1) {
        const u = i.up(a);
        s[u] = n(t[a], a);
      } else {
        const u = a;
        s[u] = t[u];
      }
      return s;
    }, {});
  }
  return n(t);
}
function tf(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function nf(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function ur(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function er(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = ur(e, n) || r, t && (o = t(o, r, e)), o;
}
function Se(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const a = s[t], u = s.theme, c = ur(u, r) || {};
    return ut(s, a, (g) => {
      let f = er(c, o, g);
      return g === f && typeof g == "string" && (f = er(c, o, `${t}${g === "default" ? "" : Qe(g)}`, g)), n === !1 ? f : {
        [n]: f
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: bt
  } : {}, i.filterProps = [t], i;
}
function rf(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const of = {
  m: "margin",
  p: "padding"
}, sf = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Vi = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, af = rf((e) => {
  if (e.length > 2)
    if (Vi[e])
      e = Vi[e];
    else
      return [e];
  const [t, n] = e.split(""), r = of[t], o = sf[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), cr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], pr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], lf = [...cr, ...pr];
function kn(e, t, n, r) {
  var o;
  const i = (o = ur(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function va(e) {
  return kn(e, "spacing", 8, "spacing");
}
function Nn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function uf(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = Nn(t, n), r), {});
}
function cf(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = af(n), i = uf(o, r), s = e[n];
  return ut(e, s, i);
}
function wa(e, t) {
  const n = va(e.theme);
  return Object.keys(e).map((r) => cf(e, t, r, n)).reduce(bn, {});
}
function we(e) {
  return wa(e, cr);
}
we.propTypes = process.env.NODE_ENV !== "production" ? cr.reduce((e, t) => (e[t] = bt, e), {}) : {};
we.filterProps = cr;
function be(e) {
  return wa(e, pr);
}
be.propTypes = process.env.NODE_ENV !== "production" ? pr.reduce((e, t) => (e[t] = bt, e), {}) : {};
be.filterProps = pr;
process.env.NODE_ENV !== "production" && lf.reduce((e, t) => (e[t] = bt, e), {});
function pf(e = 8) {
  if (e.mui)
    return e;
  const t = va({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function dr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? bn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Ge(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ye(e, t) {
  return Se({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const df = Ye("border", Ge), ff = Ye("borderTop", Ge), gf = Ye("borderRight", Ge), mf = Ye("borderBottom", Ge), hf = Ye("borderLeft", Ge), vf = Ye("borderColor"), wf = Ye("borderTopColor"), bf = Ye("borderRightColor"), yf = Ye("borderBottomColor"), xf = Ye("borderLeftColor"), Sf = Ye("outline", Ge), Ef = Ye("outlineColor"), fr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = kn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Nn(t, r)
    });
    return ut(e, e.borderRadius, n);
  }
  return null;
};
fr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: bt
} : {};
fr.filterProps = ["borderRadius"];
dr(df, ff, gf, mf, hf, vf, wf, bf, yf, xf, fr, Sf, Ef);
const gr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = kn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Nn(t, r)
    });
    return ut(e, e.gap, n);
  }
  return null;
};
gr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: bt
} : {};
gr.filterProps = ["gap"];
const mr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = kn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Nn(t, r)
    });
    return ut(e, e.columnGap, n);
  }
  return null;
};
mr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: bt
} : {};
mr.filterProps = ["columnGap"];
const hr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = kn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Nn(t, r)
    });
    return ut(e, e.rowGap, n);
  }
  return null;
};
hr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: bt
} : {};
hr.filterProps = ["rowGap"];
const Cf = Se({
  prop: "gridColumn"
}), Rf = Se({
  prop: "gridRow"
}), Tf = Se({
  prop: "gridAutoFlow"
}), Pf = Se({
  prop: "gridAutoColumns"
}), Of = Se({
  prop: "gridAutoRows"
}), kf = Se({
  prop: "gridTemplateColumns"
}), Nf = Se({
  prop: "gridTemplateRows"
}), _f = Se({
  prop: "gridTemplateAreas"
}), $f = Se({
  prop: "gridArea"
});
dr(gr, mr, hr, Cf, Rf, Tf, Pf, Of, kf, Nf, _f, $f);
function zt(e, t) {
  return t === "grey" ? t : e;
}
const Mf = Se({
  prop: "color",
  themeKey: "palette",
  transform: zt
}), If = Se({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: zt
}), Af = Se({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: zt
});
dr(Mf, If, Af);
function Be(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Ff = Se({
  prop: "width",
  transform: Be
}), ko = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Oo[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Be(n)
      };
    };
    return ut(e, e.maxWidth, t);
  }
  return null;
};
ko.filterProps = ["maxWidth"];
const Df = Se({
  prop: "minWidth",
  transform: Be
}), Vf = Se({
  prop: "height",
  transform: Be
}), Lf = Se({
  prop: "maxHeight",
  transform: Be
}), Bf = Se({
  prop: "minHeight",
  transform: Be
});
Se({
  prop: "size",
  cssProperty: "width",
  transform: Be
});
Se({
  prop: "size",
  cssProperty: "height",
  transform: Be
});
const jf = Se({
  prop: "boxSizing"
});
dr(Ff, ko, Df, Vf, Lf, Bf, jf);
const zf = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ge
  },
  borderTop: {
    themeKey: "borders",
    transform: Ge
  },
  borderRight: {
    themeKey: "borders",
    transform: Ge
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ge
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ge
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
    transform: Ge
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: fr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: zt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: zt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: zt
  },
  // spacing
  p: {
    style: be
  },
  pt: {
    style: be
  },
  pr: {
    style: be
  },
  pb: {
    style: be
  },
  pl: {
    style: be
  },
  px: {
    style: be
  },
  py: {
    style: be
  },
  padding: {
    style: be
  },
  paddingTop: {
    style: be
  },
  paddingRight: {
    style: be
  },
  paddingBottom: {
    style: be
  },
  paddingLeft: {
    style: be
  },
  paddingX: {
    style: be
  },
  paddingY: {
    style: be
  },
  paddingInline: {
    style: be
  },
  paddingInlineStart: {
    style: be
  },
  paddingInlineEnd: {
    style: be
  },
  paddingBlock: {
    style: be
  },
  paddingBlockStart: {
    style: be
  },
  paddingBlockEnd: {
    style: be
  },
  m: {
    style: we
  },
  mt: {
    style: we
  },
  mr: {
    style: we
  },
  mb: {
    style: we
  },
  ml: {
    style: we
  },
  mx: {
    style: we
  },
  my: {
    style: we
  },
  margin: {
    style: we
  },
  marginTop: {
    style: we
  },
  marginRight: {
    style: we
  },
  marginBottom: {
    style: we
  },
  marginLeft: {
    style: we
  },
  marginX: {
    style: we
  },
  marginY: {
    style: we
  },
  marginInline: {
    style: we
  },
  marginInlineStart: {
    style: we
  },
  marginInlineEnd: {
    style: we
  },
  marginBlock: {
    style: we
  },
  marginBlockStart: {
    style: we
  },
  marginBlockEnd: {
    style: we
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
    style: gr
  },
  rowGap: {
    style: hr
  },
  columnGap: {
    style: mr
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
    style: ko
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
}, No = zf;
function Hf(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Gf(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Uf() {
  function e(n, r, o, i) {
    const s = {
      [n]: r,
      theme: o
    }, a = i[n];
    if (!a)
      return {
        [n]: r
      };
    const {
      cssProperty: u = n,
      themeKey: c,
      transform: p,
      style: g
    } = a;
    if (r == null)
      return null;
    if (c === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const f = ur(o, c) || {};
    return g ? g(s) : ut(s, r, (h) => {
      let m = er(f, p, h);
      return h === m && typeof h == "string" && (m = er(f, p, `${n}${h === "default" ? "" : Qe(h)}`, h)), u === !1 ? m : {
        [u]: m
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
    const s = (r = i.unstable_sxConfig) != null ? r : No;
    function a(u) {
      let c = u;
      if (typeof u == "function")
        c = u(i);
      else if (typeof u != "object")
        return u;
      if (!c)
        return null;
      const p = tf(i.breakpoints), g = Object.keys(p);
      let f = p;
      return Object.keys(c).forEach((d) => {
        const h = Gf(c[d], i);
        if (h != null)
          if (typeof h == "object")
            if (s[d])
              f = bn(f, e(d, h, i, s));
            else {
              const m = ut({
                theme: i
              }, h, (v) => ({
                [d]: v
              }));
              Hf(m, h) ? f[d] = t({
                sx: h,
                theme: i
              }) : f = bn(f, m);
            }
          else
            f = bn(f, e(d, h, i, s));
      }), nf(g, f);
    }
    return Array.isArray(o) ? o.map(a) : a(o);
  }
  return t;
}
const ba = Uf();
ba.filterProps = ["sx"];
const _o = ba;
function qf(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const Wf = ["breakpoints", "palette", "spacing", "shape"];
function $o(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = ge(e, Wf), a = Jd(n), u = pf(o);
  let c = st({
    breakpoints: a,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: C({
      mode: "light"
    }, r),
    spacing: u,
    shape: C({}, Qd, i)
  }, s);
  return c.applyStyles = qf, c = t.reduce((p, g) => st(p, g), c), c.unstable_sxConfig = C({}, No, s == null ? void 0 : s.unstable_sxConfig), c.unstable_sx = function(g) {
    return _o({
      sx: g,
      theme: this
    });
  }, c;
}
function Xf(e) {
  return Object.keys(e).length === 0;
}
function ya(e = null) {
  const t = E.useContext(Dl);
  return !t || Xf(t) ? e : t;
}
const Yf = $o();
function xa(e = Yf) {
  return ya(e);
}
const Kf = ["ownerState"], Jf = ["variants"], Zf = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Qf(e) {
  return Object.keys(e).length === 0;
}
function eg(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function qn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const tg = $o(), Li = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function jn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Qf(t) ? e : t[n] || t;
}
function ng(e) {
  return e ? (t, n) => n[e] : null;
}
function Wn(e, t) {
  let {
    ownerState: n
  } = t, r = ge(t, Kf);
  const o = typeof e == "function" ? e(C({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Wn(i, C({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let a = ge(o, Jf);
    return i.forEach((u) => {
      let c = !0;
      typeof u.props == "function" ? c = u.props(C({
        ownerState: n
      }, r, n)) : Object.keys(u.props).forEach((p) => {
        (n == null ? void 0 : n[p]) !== u.props[p] && r[p] !== u.props[p] && (c = !1);
      }), c && (Array.isArray(a) || (a = [a]), a.push(typeof u.style == "function" ? u.style(C({
        ownerState: n
      }, r, n)) : u.style));
    }), a;
  }
  return o;
}
function rg(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = tg,
    rootShouldForwardProp: r = qn,
    slotShouldForwardProp: o = qn
  } = e, i = (s) => _o(C({}, s, {
    theme: jn(C({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, a = {}) => {
    Vl(s, (w) => w.filter((T) => !(T != null && T.__mui_systemSx)));
    const {
      name: u,
      slot: c,
      skipVariantsResolver: p,
      skipSx: g,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = ng(Li(c))
    } = a, d = ge(a, Zf), h = p !== void 0 ? p : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      c && c !== "Root" && c !== "root" || !1
    ), m = g || !1;
    let v;
    process.env.NODE_ENV !== "production" && u && (v = `${u}-${Li(c || "Root")}`);
    let y = qn;
    c === "Root" || c === "root" ? y = r : c ? y = o : eg(s) && (y = void 0);
    const O = Fl(s, C({
      shouldForwardProp: y,
      label: v
    }, d)), x = (w) => typeof w == "function" && w.__emotion_real !== w || Rt(w) ? (T) => Wn(w, C({}, T, {
      theme: jn({
        theme: T.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : w, S = (w, ...T) => {
      let k = x(w);
      const F = T ? T.map(x) : [];
      u && f && F.push((P) => {
        const $ = jn(C({}, P, {
          defaultTheme: n,
          themeId: t
        }));
        if (!$.components || !$.components[u] || !$.components[u].styleOverrides)
          return null;
        const M = $.components[u].styleOverrides, L = {};
        return Object.entries(M).forEach(([B, _]) => {
          L[B] = Wn(_, C({}, P, {
            theme: $
          }));
        }), f(P, L);
      }), u && !h && F.push((P) => {
        var $;
        const M = jn(C({}, P, {
          defaultTheme: n,
          themeId: t
        })), L = M == null || ($ = M.components) == null || ($ = $[u]) == null ? void 0 : $.variants;
        return Wn({
          variants: L
        }, C({}, P, {
          theme: M
        }));
      }), m || F.push(i);
      const D = F.length - T.length;
      if (Array.isArray(w) && D > 0) {
        const P = new Array(D).fill("");
        k = [...w, ...P], k.raw = [...w.raw, ...P];
      }
      const V = O(k, ...F);
      if (process.env.NODE_ENV !== "production") {
        let P;
        u && (P = `${u}${Qe(c || "")}`), P === void 0 && (P = `Styled(${Bc(s)})`), V.displayName = P;
      }
      return s.muiName && (V.muiName = s.muiName), V;
    };
    return O.withConfig && (S.withConfig = O.withConfig), S;
  };
}
function og(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Qs(t.components[n].defaultProps, r);
}
function ig({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = xa(n);
  return r && (o = o[r] || o), og({
    theme: o,
    name: t,
    props: e
  });
}
function Mo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), up(e, t, n);
}
function sg(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function $t(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return $t(sg(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Ht(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Ht(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function vr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function ag(e) {
  e = $t(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (c, p = (c + n / 30) % 12) => o - i * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  let a = "rgb";
  const u = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (a += "a", u.push(t[3])), vr({
    type: a,
    values: u
  });
}
function Bi(e) {
  e = $t(e);
  let t = e.type === "hsl" || e.type === "hsla" ? $t(ag(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function ji(e, t) {
  const n = Bi(e), r = Bi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function tr(e, t) {
  return e = $t(e), t = Mo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, vr(e);
}
function lg(e, t) {
  if (e = $t(e), t = Mo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return vr(e);
}
function ug(e, t) {
  if (e = $t(e), t = Mo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return vr(e);
}
function cg(e, t) {
  return C({
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
const pg = {
  black: "#000",
  white: "#fff"
}, Cn = pg, dg = {
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
}, fg = dg, gg = {
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
}, It = gg, mg = {
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
}, At = mg, hg = {
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
}, ln = hg, vg = {
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
}, Ft = vg, wg = {
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
}, Dt = wg, bg = {
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
}, Vt = bg, yg = ["mode", "contrastThreshold", "tonalOffset"], zi = {
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
    paper: Cn.white,
    default: Cn.white
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
}, Vr = {
  text: {
    primary: Cn.white,
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
    active: Cn.white,
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
function Hi(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = ug(e.main, o) : t === "dark" && (e.dark = lg(e.main, i)));
}
function xg(e = "light") {
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
function Sg(e = "light") {
  return e === "dark" ? {
    main: It[200],
    light: It[50],
    dark: It[400]
  } : {
    main: It[500],
    light: It[300],
    dark: It[700]
  };
}
function Eg(e = "light") {
  return e === "dark" ? {
    main: At[500],
    light: At[300],
    dark: At[700]
  } : {
    main: At[700],
    light: At[400],
    dark: At[800]
  };
}
function Cg(e = "light") {
  return e === "dark" ? {
    main: Dt[400],
    light: Dt[300],
    dark: Dt[700]
  } : {
    main: Dt[700],
    light: Dt[500],
    dark: Dt[900]
  };
}
function Rg(e = "light") {
  return e === "dark" ? {
    main: Vt[400],
    light: Vt[300],
    dark: Vt[700]
  } : {
    main: Vt[800],
    light: Vt[500],
    dark: Vt[900]
  };
}
function Tg(e = "light") {
  return e === "dark" ? {
    main: ln[400],
    light: ln[300],
    dark: ln[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: ln[500],
    dark: ln[900]
  };
}
function Pg(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = ge(e, yg), i = e.primary || xg(t), s = e.secondary || Sg(t), a = e.error || Eg(t), u = e.info || Cg(t), c = e.success || Rg(t), p = e.warning || Tg(t);
  function g(m) {
    const v = ji(m, Vr.text.primary) >= n ? Vr.text.primary : zi.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const y = ji(m, v);
      y < 3 && console.error([`MUI: The contrast ratio of ${y}:1 for ${v} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return v;
  }
  const f = ({
    color: m,
    name: v,
    mainShade: y = 500,
    lightShade: O = 300,
    darkShade: x = 700
  }) => {
    if (m = C({}, m), !m.main && m[y] && (m.main = m[y]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.` : Ht(11, v ? ` (${v})` : "", y));
    if (typeof m.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Ht(12, v ? ` (${v})` : "", JSON.stringify(m.main)));
    return Hi(m, "light", O, r), Hi(m, "dark", x, r), m.contrastText || (m.contrastText = g(m.main)), m;
  }, d = {
    dark: Vr,
    light: zi
  };
  return process.env.NODE_ENV !== "production" && (d[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), st(C({
    // A collection of common colors.
    common: C({}, Cn),
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
      color: a,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: f({
      color: p,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: f({
      color: u,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: f({
      color: c,
      name: "success"
    }),
    // The grey colors.
    grey: fg,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: g,
    // Generate a rich color object.
    augmentColor: f,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, d[t]), o);
}
const Og = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function kg(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Gi = {
  textTransform: "uppercase"
}, Ui = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ng(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Ui,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: a = 500,
    fontWeightBold: u = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: c = 16,
    // Apply the CSS properties to all the variants.
    allVariants: p,
    pxToRem: g
  } = n, f = ge(n, Og);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof c != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const d = o / 14, h = g || ((y) => `${y / c * d}rem`), m = (y, O, x, S, w) => C({
    fontFamily: r,
    fontWeight: y,
    fontSize: h(O),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: x
  }, r === Ui ? {
    letterSpacing: `${kg(S / O)}em`
  } : {}, w, p), v = {
    h1: m(i, 96, 1.167, -1.5),
    h2: m(i, 60, 1.2, -0.5),
    h3: m(s, 48, 1.167, 0),
    h4: m(s, 34, 1.235, 0.25),
    h5: m(s, 24, 1.334, 0),
    h6: m(a, 20, 1.6, 0.15),
    subtitle1: m(s, 16, 1.75, 0.15),
    subtitle2: m(a, 14, 1.57, 0.1),
    body1: m(s, 16, 1.5, 0.15),
    body2: m(s, 14, 1.43, 0.15),
    button: m(a, 14, 1.75, 0.4, Gi),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, Gi),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return st(C({
    htmlFontSize: c,
    pxToRem: h,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: a,
    fontWeightBold: u
  }, v), f, {
    clone: !1
    // No need to clone deep
  });
}
const _g = 0.2, $g = 0.14, Mg = 0.12;
function ve(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${_g})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${$g})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Mg})`].join(",");
}
const Ig = ["none", ve(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ve(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ve(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ve(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ve(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ve(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ve(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ve(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ve(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ve(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ve(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ve(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ve(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ve(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ve(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ve(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ve(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ve(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ve(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ve(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ve(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ve(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ve(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ve(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ag = Ig, Fg = ["duration", "easing", "delay"], Dg = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Vg = {
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
function qi(e) {
  return `${Math.round(e)}ms`;
}
function Lg(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Bg(e) {
  const t = C({}, Dg, e.easing), n = C({}, Vg, e.duration);
  return C({
    getAutoHeightDuration: Lg,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: a = t.easeInOut,
        delay: u = 0
      } = i, c = ge(i, Fg);
      if (process.env.NODE_ENV !== "production") {
        const p = (f) => typeof f == "string", g = (f) => !isNaN(parseFloat(f));
        !p(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !g(s) && !p(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), p(a) || console.error('MUI: Argument "easing" must be a string.'), !g(u) && !p(u) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(c).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof s == "string" ? s : qi(s)} ${a} ${typeof u == "string" ? u : qi(u)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const jg = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, zg = jg, Hg = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Gg(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = ge(e, Hg);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ht(18));
  const a = Pg(r), u = $o(e);
  let c = st(u, {
    mixins: cg(u.breakpoints, n),
    palette: a,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ag.slice(),
    typography: Ng(a, i),
    transitions: Bg(o),
    zIndex: C({}, zg)
  });
  if (c = st(c, s), c = t.reduce((p, g) => st(p, g), c), process.env.NODE_ENV !== "production") {
    const p = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], g = (f, d) => {
      let h;
      for (h in f) {
        const m = f[h];
        if (p.indexOf(h) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const v = tt("", h);
            console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${v}' syntax:`, JSON.stringify({
              root: {
                [`&.${v}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          f[h] = {};
        }
      }
    };
    Object.keys(c.components).forEach((f) => {
      const d = c.components[f].styleOverrides;
      d && f.indexOf("Mui") === 0 && g(d, f);
    });
  }
  return c.unstable_sxConfig = C({}, No, s == null ? void 0 : s.unstable_sxConfig), c.unstable_sx = function(g) {
    return _o({
      sx: g,
      theme: this
    });
  }, c;
}
const Ug = Gg(), Io = Ug, Ao = "$$material", Sa = (e) => qn(e) && e !== "classes", qg = rg({
  themeId: Ao,
  defaultTheme: Io,
  rootShouldForwardProp: Sa
}), ke = qg;
function _n() {
  const e = xa(Io);
  return process.env.NODE_ENV !== "production" && E.useDebugValue(e), e[Ao] || e;
}
function pt({
  props: e,
  name: t
}) {
  return ig({
    props: e,
    name: t,
    defaultTheme: Io,
    themeId: Ao
  });
}
function no(e, t) {
  return no = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, no(e, t);
}
function Wg(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, no(e, t);
}
const Wi = {
  disabled: !1
};
var Xg = process.env.NODE_ENV !== "production" ? l.oneOfType([l.number, l.shape({
  enter: l.number,
  exit: l.number,
  appear: l.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && l.oneOfType([l.string, l.shape({
  enter: l.string,
  exit: l.string,
  active: l.string
}), l.shape({
  enter: l.string,
  enterDone: l.string,
  enterActive: l.string,
  exit: l.string,
  exitDone: l.string,
  exitActive: l.string
})]);
const Ea = ie.createContext(null);
var Yg = function(t) {
  return t.scrollTop;
}, fn = "unmounted", Et = "exited", Ct = "entering", jt = "entered", ro = "exiting", dt = /* @__PURE__ */ function(e) {
  Wg(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, a = s && !s.isMounting ? r.enter : r.appear, u;
    return i.appearStatus = null, r.in ? a ? (u = Et, i.appearStatus = Ct) : u = jt : r.unmountOnExit || r.mountOnEnter ? u = fn : u = Et, i.state = {
      status: u
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === fn ? {
      status: Et
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== Ct && s !== jt && (i = Ct) : (s === Ct || s === jt) && (i = ro);
    }
    this.updateStatus(!1, i);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, i, s, a;
    return i = s = a = o, o != null && typeof o != "number" && (i = o.exit, s = o.enter, a = o.appear !== void 0 ? o.appear : s), {
      exit: i,
      enter: s,
      appear: a
    };
  }, n.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === Ct) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : An.findDOMNode(this);
          s && Yg(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Et && this.setState({
        status: fn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, a = this.context ? this.context.isMounting : o, u = this.props.nodeRef ? [a] : [An.findDOMNode(this), a], c = u[0], p = u[1], g = this.getTimeouts(), f = a ? g.appear : g.enter;
    if (!o && !s || Wi.disabled) {
      this.safeSetState({
        status: jt
      }, function() {
        i.props.onEntered(c);
      });
      return;
    }
    this.props.onEnter(c, p), this.safeSetState({
      status: Ct
    }, function() {
      i.props.onEntering(c, p), i.onTransitionEnd(f, function() {
        i.safeSetState({
          status: jt
        }, function() {
          i.props.onEntered(c, p);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), a = this.props.nodeRef ? void 0 : An.findDOMNode(this);
    if (!i || Wi.disabled) {
      this.safeSetState({
        status: Et
      }, function() {
        o.props.onExited(a);
      });
      return;
    }
    this.props.onExit(a), this.safeSetState({
      status: ro
    }, function() {
      o.props.onExiting(a), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: Et
        }, function() {
          o.props.onExited(a);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(o, i) {
    i = this.setNextCallback(i), this.setState(o, i);
  }, n.setNextCallback = function(o) {
    var i = this, s = !0;
    return this.nextCallback = function(a) {
      s && (s = !1, i.nextCallback = null, o(a));
    }, this.nextCallback.cancel = function() {
      s = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var s = this.props.nodeRef ? this.props.nodeRef.current : An.findDOMNode(this), a = o == null && !this.props.addEndListener;
    if (!s || a) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var u = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], c = u[0], p = u[1];
      this.props.addEndListener(c, p);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === fn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var a = ge(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ ie.createElement(Ea.Provider, {
        value: null
      }, typeof s == "function" ? s(o, a) : ie.cloneElement(ie.Children.only(s), a))
    );
  }, t;
}(ie.Component);
dt.contextType = Ea;
dt.propTypes = process.env.NODE_ENV !== "production" ? {
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
  nodeRef: l.shape({
    current: typeof Element > "u" ? l.any : function(e, t, n, r, o, i) {
      var s = e[t];
      return l.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, i);
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
  children: l.oneOfType([l.func.isRequired, l.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: l.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: l.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: l.bool,
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
  appear: l.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: l.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: l.bool,
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
    var n = Xg;
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
  addEndListener: l.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: l.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: l.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: l.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: l.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: l.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: l.func
} : {};
function Lt() {
}
dt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Lt,
  onEntering: Lt,
  onEntered: Lt,
  onExit: Lt,
  onExiting: Lt,
  onExited: Lt
};
dt.UNMOUNTED = fn;
dt.EXITED = Et;
dt.ENTERING = Ct;
dt.ENTERED = jt;
dt.EXITING = ro;
const Ca = dt, Ra = (e) => e.scrollTop;
function nr(e, t) {
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
const Kg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function oo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Jg = {
  entering: {
    opacity: 1,
    transform: oo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Lr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Fo = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: a,
    onEnter: u,
    onEntered: c,
    onEntering: p,
    onExit: g,
    onExited: f,
    onExiting: d,
    style: h,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: v = Ca
  } = t, y = ge(t, Kg), O = pn(), x = E.useRef(), S = _n(), w = E.useRef(null), T = qe(w, i.ref, n), k = (B) => (_) => {
    if (B) {
      const j = w.current;
      _ === void 0 ? B(j) : B(j, _);
    }
  }, F = k(p), D = k((B, _) => {
    Ra(B);
    const {
      duration: j,
      delay: ne,
      easing: ee
    } = nr({
      style: h,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let R;
    m === "auto" ? (R = S.transitions.getAutoHeightDuration(B.clientHeight), x.current = R) : R = j, B.style.transition = [S.transitions.create("opacity", {
      duration: R,
      delay: ne
    }), S.transitions.create("transform", {
      duration: Lr ? R : R * 0.666,
      delay: ne,
      easing: ee
    })].join(","), u && u(B, _);
  }), V = k(c), P = k(d), $ = k((B) => {
    const {
      duration: _,
      delay: j,
      easing: ne
    } = nr({
      style: h,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let ee;
    m === "auto" ? (ee = S.transitions.getAutoHeightDuration(B.clientHeight), x.current = ee) : ee = _, B.style.transition = [S.transitions.create("opacity", {
      duration: ee,
      delay: j
    }), S.transitions.create("transform", {
      duration: Lr ? ee : ee * 0.666,
      delay: Lr ? j : j || ee * 0.333,
      easing: ne
    })].join(","), B.style.opacity = 0, B.style.transform = oo(0.75), g && g(B);
  }), M = k(f);
  return /* @__PURE__ */ b(v, C({
    appear: o,
    in: a,
    nodeRef: w,
    onEnter: D,
    onEntered: V,
    onEntering: F,
    onExit: $,
    onExited: M,
    onExiting: P,
    addEndListener: (B) => {
      m === "auto" && O.start(x.current || 0, B), r && r(w.current, B);
    },
    timeout: m === "auto" ? null : m
  }, y, {
    children: (B, _) => /* @__PURE__ */ E.cloneElement(i, C({
      style: C({
        opacity: 0,
        transform: oo(0.75),
        visibility: B === "exited" && !a ? "hidden" : void 0
      }, Jg[B], h, i.props.style),
      ref: T
    }, _))
  }));
});
process.env.NODE_ENV !== "production" && (Fo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: l.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: l.bool,
  /**
   * A single child content element.
   */
  children: Rn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: l.oneOfType([l.shape({
    enter: l.string,
    exit: l.string
  }), l.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: l.bool,
  /**
   * @ignore
   */
  onEnter: l.func,
  /**
   * @ignore
   */
  onEntered: l.func,
  /**
   * @ignore
   */
  onEntering: l.func,
  /**
   * @ignore
   */
  onExit: l.func,
  /**
   * @ignore
   */
  onExited: l.func,
  /**
   * @ignore
   */
  onExiting: l.func,
  /**
   * @ignore
   */
  style: l.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: l.oneOfType([l.oneOf(["auto"]), l.number, l.shape({
    appear: l.number,
    enter: l.number,
    exit: l.number
  })])
});
Fo.muiSupportAuto = !0;
const io = Fo, Zg = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Xi = Zg, Qg = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], em = ke(ha, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ta = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r;
  const o = ya(), i = pt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: a,
    components: u,
    componentsProps: c,
    container: p,
    disablePortal: g,
    keepMounted: f,
    modifiers: d,
    open: h,
    placement: m,
    popperOptions: v,
    popperRef: y,
    transition: O,
    slots: x,
    slotProps: S
  } = i, w = ge(i, Qg), T = (r = x == null ? void 0 : x.root) != null ? r : u == null ? void 0 : u.Root, k = C({
    anchorEl: s,
    container: p,
    disablePortal: g,
    keepMounted: f,
    modifiers: d,
    open: h,
    placement: m,
    popperOptions: v,
    popperRef: y,
    transition: O
  }, w);
  return /* @__PURE__ */ b(em, C({
    as: a,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: T
    },
    slotProps: S ?? c
  }, k, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Ta.propTypes = {
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
  anchorEl: l.oneOfType([at, l.object, l.func]),
  /**
   * Popper render function or node.
   */
  children: l.oneOfType([l.node, l.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: l.shape({
    Root: l.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: l.shape({
    root: l.oneOfType([l.func, l.object])
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
  container: l.oneOfType([at, l.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: l.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: l.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: l.arrayOf(l.shape({
    data: l.object,
    effect: l.func,
    enabled: l.bool,
    fn: l.func,
    name: l.any,
    options: l.object,
    phase: l.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: l.arrayOf(l.string),
    requiresIfExists: l.arrayOf(l.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: l.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: l.shape({
    modifiers: l.array,
    onFirstUpdate: l.func,
    placement: l.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: l.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: yo,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: l.shape({
    root: l.oneOfType([l.func, l.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: l.shape({
    root: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: l.bool
});
const Pa = Ta;
function tm(e) {
  return tt("MuiTooltip", e);
}
const nm = vt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), mt = nm, rm = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function om(e) {
  return Math.round(e * 1e5) / 1e5;
}
const im = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Qe(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return ct(s, tm, t);
}, sm = ke(Pa, {
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
}) => C({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${mt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${mt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${mt.arrow}`]: C({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${mt.arrow}`]: C({}, t.isRtl ? {
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
})), am = ke("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Qe(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : tr(e.palette.grey[700], 0.92),
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
  lineHeight: `${om(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${mt.popper}[data-popper-placement*="left"] &`]: C({
    transformOrigin: "right center"
  }, t.isRtl ? C({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : C({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${mt.popper}[data-popper-placement*="right"] &`]: C({
    transformOrigin: "left center"
  }, t.isRtl ? C({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : C({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${mt.popper}[data-popper-placement*="top"] &`]: C({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${mt.popper}[data-popper-placement*="bottom"] &`]: C({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), lm = ke("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : tr(e.palette.grey[700], 0.9),
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
let zn = !1;
const Yi = new Tn();
let un = {
  x: 0,
  y: 0
};
function Hn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Oa = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i, s, a, u, c, p, g, f, d, h, m, v, y, O, x, S, w;
  const T = pt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: k = !1,
    children: F,
    components: D = {},
    componentsProps: V = {},
    describeChild: P = !1,
    disableFocusListener: $ = !1,
    disableHoverListener: M = !1,
    disableInteractive: L = !1,
    disableTouchListener: B = !1,
    enterDelay: _ = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: ne = 700,
    followCursor: ee = !1,
    id: R,
    leaveDelay: A = 0,
    leaveTouchDelay: H = 1500,
    onClose: X,
    onOpen: z,
    open: G,
    placement: q = "bottom",
    PopperComponent: W,
    PopperProps: U = {},
    slotProps: J = {},
    slots: Z = {},
    title: ae,
    TransitionComponent: I = io,
    TransitionProps: Q
  } = T, N = ge(T, rm), le = /* @__PURE__ */ E.isValidElement(F) ? F : /* @__PURE__ */ b("span", {
    children: F
  }), Ce = _n(), Ne = Ce.direction === "rtl", [xe, yt] = E.useState(), [_e, nt] = E.useState(null), De = E.useRef(!1), rt = L || ee, Re = pn(), Mt = pn(), xt = pn(), Zt = pn(), [$n, Bo] = Ws({
    controlled: G,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let ot = $n;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: oe
    } = E.useRef(G !== void 0);
    E.useEffect(() => {
      xe && xe.disabled && !oe && ae !== "" && xe.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ae, xe, oe]);
  }
  const wr = qs(R), Qt = E.useRef(), Mn = yn(() => {
    Qt.current !== void 0 && (document.body.style.WebkitUserSelect = Qt.current, Qt.current = void 0), Zt.clear();
  });
  E.useEffect(() => Mn, [Mn]);
  const jo = (oe) => {
    Yi.clear(), zn = !0, Bo(!0), z && !ot && z(oe);
  }, In = yn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (oe) => {
      Yi.start(800 + A, () => {
        zn = !1;
      }), Bo(!1), X && ot && X(oe), Re.start(Ce.transitions.duration.shortest, () => {
        De.current = !1;
      });
    }
  ), br = (oe) => {
    De.current && oe.type !== "touchstart" || (xe && xe.removeAttribute("title"), Mt.clear(), xt.clear(), _ || zn && j ? Mt.start(zn ? j : _, () => {
      jo(oe);
    }) : jo(oe));
  }, zo = (oe) => {
    Mt.clear(), xt.start(A, () => {
      In(oe);
    });
  }, {
    isFocusVisibleRef: Ho,
    onBlur: qa,
    onFocus: Wa,
    ref: Xa
  } = Xs(), [, Go] = E.useState(!1), Uo = (oe) => {
    qa(oe), Ho.current === !1 && (Go(!1), zo(oe));
  }, qo = (oe) => {
    xe || yt(oe.currentTarget), Wa(oe), Ho.current === !0 && (Go(!0), br(oe));
  }, Wo = (oe) => {
    De.current = !0;
    const Ve = le.props;
    Ve.onTouchStart && Ve.onTouchStart(oe);
  }, Xo = br, Yo = zo, Ya = (oe) => {
    Wo(oe), xt.clear(), Re.clear(), Mn(), Qt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Zt.start(ne, () => {
      document.body.style.WebkitUserSelect = Qt.current, br(oe);
    });
  }, Ka = (oe) => {
    le.props.onTouchEnd && le.props.onTouchEnd(oe), Mn(), xt.start(H, () => {
      In(oe);
    });
  };
  E.useEffect(() => {
    if (!ot)
      return;
    function oe(Ve) {
      (Ve.key === "Escape" || Ve.key === "Esc") && In(Ve);
    }
    return document.addEventListener("keydown", oe), () => {
      document.removeEventListener("keydown", oe);
    };
  }, [In, ot]);
  const Ja = qe(le.ref, Xa, yt, n);
  !ae && ae !== 0 && (ot = !1);
  const yr = E.useRef(), Za = (oe) => {
    const Ve = le.props;
    Ve.onMouseMove && Ve.onMouseMove(oe), un = {
      x: oe.clientX,
      y: oe.clientY
    }, yr.current && yr.current.update();
  }, en = {}, xr = typeof ae == "string";
  P ? (en.title = !ot && xr && !M ? ae : null, en["aria-describedby"] = ot ? wr : null) : (en["aria-label"] = xr ? ae : null, en["aria-labelledby"] = ot && !xr ? wr : null);
  const He = C({}, en, N, le.props, {
    className: Pe(N.className, le.props.className),
    onTouchStart: Wo,
    ref: Ja
  }, ee ? {
    onMouseMove: Za
  } : {});
  process.env.NODE_ENV !== "production" && (He["data-mui-internal-clone-element"] = !0, E.useEffect(() => {
    xe && !xe.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [xe]));
  const tn = {};
  B || (He.onTouchStart = Ya, He.onTouchEnd = Ka), M || (He.onMouseOver = Hn(Xo, He.onMouseOver), He.onMouseLeave = Hn(Yo, He.onMouseLeave), rt || (tn.onMouseOver = Xo, tn.onMouseLeave = Yo)), $ || (He.onFocus = Hn(qo, He.onFocus), He.onBlur = Hn(Uo, He.onBlur), rt || (tn.onFocus = qo, tn.onBlur = Uo)), process.env.NODE_ENV !== "production" && le.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${le.props.title}\` or the Tooltip component.`].join(`
`));
  const Qa = E.useMemo(() => {
    var oe;
    let Ve = [{
      name: "arrow",
      enabled: !!_e,
      options: {
        element: _e,
        padding: 4
      }
    }];
    return (oe = U.popperOptions) != null && oe.modifiers && (Ve = Ve.concat(U.popperOptions.modifiers)), C({}, U.popperOptions, {
      modifiers: Ve
    });
  }, [_e, U]), nn = C({}, T, {
    isRtl: Ne,
    arrow: k,
    disableInteractive: rt,
    placement: q,
    PopperComponentProp: W,
    touch: De.current
  }), Sr = im(nn), Ko = (r = (o = Z.popper) != null ? o : D.Popper) != null ? r : sm, Jo = (i = (s = (a = Z.transition) != null ? a : D.Transition) != null ? s : I) != null ? i : io, Zo = (u = (c = Z.tooltip) != null ? c : D.Tooltip) != null ? u : am, Qo = (p = (g = Z.arrow) != null ? g : D.Arrow) != null ? p : lm, el = dn(Ko, C({}, U, (f = J.popper) != null ? f : V.popper, {
    className: Pe(Sr.popper, U == null ? void 0 : U.className, (d = (h = J.popper) != null ? h : V.popper) == null ? void 0 : d.className)
  }), nn), tl = dn(Jo, C({}, Q, (m = J.transition) != null ? m : V.transition), nn), nl = dn(Zo, C({}, (v = J.tooltip) != null ? v : V.tooltip, {
    className: Pe(Sr.tooltip, (y = (O = J.tooltip) != null ? O : V.tooltip) == null ? void 0 : y.className)
  }), nn), rl = dn(Qo, C({}, (x = J.arrow) != null ? x : V.arrow, {
    className: Pe(Sr.arrow, (S = (w = J.arrow) != null ? w : V.arrow) == null ? void 0 : S.className)
  }), nn);
  return /* @__PURE__ */ te(E.Fragment, {
    children: [/* @__PURE__ */ E.cloneElement(le, He), /* @__PURE__ */ b(Ko, C({
      as: W ?? Pa,
      placement: q,
      anchorEl: ee ? {
        getBoundingClientRect: () => ({
          top: un.y,
          left: un.x,
          right: un.x,
          bottom: un.y,
          width: 0,
          height: 0
        })
      } : xe,
      popperRef: yr,
      open: xe ? ot : !1,
      id: wr,
      transition: !0
    }, tn, el, {
      popperOptions: Qa,
      children: ({
        TransitionProps: oe
      }) => /* @__PURE__ */ b(Jo, C({
        timeout: Ce.transitions.duration.shorter
      }, oe, tl, {
        children: /* @__PURE__ */ te(Zo, C({}, nl, {
          children: [ae, k ? /* @__PURE__ */ b(Qo, C({}, rl, {
            ref: nt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Oa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: l.bool,
  /**
   * Tooltip reference element.
   */
  children: Rn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: l.shape({
    Arrow: l.elementType,
    Popper: l.elementType,
    Tooltip: l.elementType,
    Transition: l.elementType
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
  componentsProps: l.shape({
    arrow: l.object,
    popper: l.object,
    tooltip: l.object,
    transition: l.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: l.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: l.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: l.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: l.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: l.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: l.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: l.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: l.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: l.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: l.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: l.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: l.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: l.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: l.func,
  /**
   * If `true`, the component is shown.
   */
  open: l.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: l.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: l.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: l.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: l.shape({
    arrow: l.object,
    popper: l.object,
    tooltip: l.object,
    transition: l.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: l.shape({
    arrow: l.elementType,
    popper: l.elementType,
    tooltip: l.elementType,
    transition: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: l.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: l.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: l.object
});
const um = Oa;
var Do = {}, ka = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ka);
var cm = ka.exports, Br = {};
function pm(e) {
  return tt("MuiSvgIcon", e);
}
vt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const dm = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], fm = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Qe(t)}`, `fontSize${Qe(n)}`]
  };
  return ct(o, pm, r);
}, gm = ke("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Qe(n.color)}`], t[`fontSize${Qe(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, s, a, u, c, p, g, f, d, h;
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
      medium: ((a = e.typography) == null || (u = a.pxToRem) == null ? void 0 : u.call(a, 24)) || "1.5rem",
      large: ((c = e.typography) == null || (p = c.pxToRem) == null ? void 0 : p.call(c, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (g = (f = (e.vars || e).palette) == null || (f = f[t.color]) == null ? void 0 : f.main) != null ? g : {
      action: (d = (e.vars || e).palette) == null || (d = d.action) == null ? void 0 : d.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Vo = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const r = pt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: a = "svg",
    fontSize: u = "medium",
    htmlColor: c,
    inheritViewBox: p = !1,
    titleAccess: g,
    viewBox: f = "0 0 24 24"
  } = r, d = ge(r, dm), h = /* @__PURE__ */ E.isValidElement(o) && o.type === "svg", m = C({}, r, {
    color: s,
    component: a,
    fontSize: u,
    instanceFontSize: t.fontSize,
    inheritViewBox: p,
    viewBox: f,
    hasSvgAsChild: h
  }), v = {};
  p || (v.viewBox = f);
  const y = fm(m);
  return /* @__PURE__ */ te(gm, C({
    as: a,
    className: Pe(y.root, i),
    focusable: "false",
    color: c,
    "aria-hidden": g ? void 0 : !0,
    role: g ? "img" : void 0,
    ref: n
  }, v, d, h && o.props, {
    ownerState: m,
    children: [h ? o.props.children : o, g ? /* @__PURE__ */ b("title", {
      children: g
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Vo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: l.oneOfType([l.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), l.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: l.oneOfType([l.oneOf(["inherit", "large", "medium", "small"]), l.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: l.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: l.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: l.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: l.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: l.string
});
Vo.muiName = "SvgIcon";
const Ki = Vo;
function Na(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ b(Ki, C({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Ki.muiName, /* @__PURE__ */ E.memo(/* @__PURE__ */ E.forwardRef(n));
}
const mm = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ea.configure(e);
  }
}, hm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Qe,
  createChainedFunction: Jr,
  createSvgIcon: Na,
  debounce: Us,
  deprecatedPropType: zc,
  isMuiElement: Hc,
  ownerDocument: Oe,
  ownerWindow: Gt,
  requirePropFactory: Gc,
  setRef: Kn,
  unstable_ClassNameGenerator: mm,
  unstable_useEnhancedEffect: kt,
  unstable_useId: qs,
  unsupportedProp: Wc,
  useControlled: Ws,
  useEventCallback: yn,
  useForkRef: qe,
  useIsFocusVisible: Xs
}, Symbol.toStringTag, { value: "Module" })), vm = /* @__PURE__ */ xc(hm);
var Ji;
function wm() {
  return Ji || (Ji = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = vm;
  }(Br)), Br;
}
var bm = cm;
Object.defineProperty(Do, "__esModule", {
  value: !0
});
var _a = Do.default = void 0, ym = bm(wm()), xm = ol;
_a = Do.default = (0, ym.default)(/* @__PURE__ */ (0, xm.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Zi(e, t, n) {
  return e ? /* @__PURE__ */ b(as, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ b("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function $a(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: i = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: a = !1,
    className: u,
    isDisabled: c = !1,
    isDense: p = !0,
    isSubMenuParent: g = !1,
    hasDisabledGutters: f = !1,
    hasDivider: d = !1,
    focusVisibleClassName: h,
    id: m,
    children: v
  } = e, y = /* @__PURE__ */ b(
    Tl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: a,
      className: u,
      disabled: c,
      dense: p,
      disableGutters: f,
      divider: d,
      focusVisibleClassName: h,
      onClick: t,
      id: m,
      children: n ? /* @__PURE__ */ te(rr, { children: [
        Zi(i, n, !0),
        /* @__PURE__ */ b(Pl, { primary: n, inset: !i && o }),
        g ? /* @__PURE__ */ b(as, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ b(_a, {}) }) : Zi(s, n, !1)
      ] }) : v
    }
  );
  return r ? /* @__PURE__ */ b(um, { title: r, placement: "right", children: /* @__PURE__ */ b("div", { children: y }) }) : y;
}
function Ma(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Sm(e) {
  const [t, n] = Ee(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (c) => {
    n(c.currentTarget);
  }, a = () => {
    n(void 0);
  }, u = () => {
    let c = Ma(i).filter((p) => "menuItem" in p.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return c = c.filter(
      (p) => "menuItem" in p.group && p.group.menuItem === r.id
    ), /* @__PURE__ */ b(Lo, { ...e, includedGroups: c });
  };
  return /* @__PURE__ */ te(rr, { children: [
    /* @__PURE__ */ b($a, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ b(
      Ol,
      {
        anchorEl: t,
        open: !!t,
        onClose: a,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left"
        },
        children: u()
      },
      r.id
    )
  ] });
}
const Em = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function Lo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = ao(() => {
    const p = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ma(t).filter((h) => !("menuItem" in h.group))
    ), g = Object.values(p).sort(
      (h, m) => (h.group.order || 0) - (m.group.order || 0)
    ), f = [];
    g.forEach((h) => {
      Em(h.id, t.items).forEach(
        (m) => f.push({ item: m, isLastItemInGroup: !1 })
      ), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !0);
    }), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !1);
    const d = f.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: f, allowForLeadingIcons: d };
  }, [o, t]), a = ({ item: p, isLastItemInGroup: g }) => ({
    className: "papi-menu-item",
    label: p.label,
    tooltip: p.tooltip,
    iconPathBefore: "iconPathBefore" in p ? p.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in p ? p.iconPathAfter : void 0,
    hasDivider: g,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [u] = i;
  if (!u)
    return /* @__PURE__ */ b("div", {});
  const c = u.item.group;
  return /* @__PURE__ */ b("div", { role: "menu", "aria-label": c, children: i.map((p, g) => {
    const { item: f } = p, d = a(p);
    if ("command" in f) {
      const h = f.group + g;
      return /* @__PURE__ */ b(
        $a,
        {
          onClick: (m) => {
            n == null || n(m), r(f);
          },
          ...d
        },
        h
      );
    }
    return /* @__PURE__ */ b(
      Sm,
      {
        parentMenuItem: f,
        parentItemProps: d,
        ...e
      },
      c + f.id
    );
  }) }, c);
}
function Cm(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, a]) => ({ id: s, group: a })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ b(Lo, { ...e, includedGroups: i });
}
function Rm({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ te(
    ls,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ b("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ b(kl, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ b(
          Cm,
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
function Tm({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = ao(() => {
    const s = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((a) => {
      if (a === "isExtensible")
        return;
      const u = a, c = o[u];
      typeof c == "object" && typeof c.order == "number" && !Number.isNaN(c.order) ? s.set(c.order, { id: u, metadata: c }) : console.warn(
        `Property ${a} (${typeof c}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((a, u) => (a.metadata.order || 0) - (u.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ b(
    ls,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, a) => /* @__PURE__ */ b(
        Rm,
        {
          commandHandler: e,
          menuDefinition: n,
          ...s,
          className: t
        },
        a
      ))
    }
  );
}
const Ia = /* @__PURE__ */ E.createContext({});
process.env.NODE_ENV !== "production" && (Ia.displayName = "ListContext");
const Pm = Ia;
function Om(e) {
  return tt("MuiList", e);
}
vt("MuiList", ["root", "padding", "dense", "subheader"]);
const km = ["children", "className", "component", "dense", "disablePadding", "subheader"], Nm = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return ct({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Om, t);
}, _m = ke("ul", {
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
}) => C({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), Aa = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const r = pt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: a = !1,
    disablePadding: u = !1,
    subheader: c
  } = r, p = ge(r, km), g = E.useMemo(() => ({
    dense: a
  }), [a]), f = C({}, r, {
    component: s,
    dense: a,
    disablePadding: u
  }), d = Nm(f);
  return /* @__PURE__ */ b(Pm.Provider, {
    value: g,
    children: /* @__PURE__ */ te(_m, C({
      as: s,
      className: Pe(d.root, i),
      ref: n,
      ownerState: f
    }, p, {
      children: [c, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Aa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: l.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: l.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: l.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object])
});
const $m = Aa, Mm = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function jr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function Qi(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Fa(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function cn(e, t, n, r, o, i) {
  let s = !1, a = o(e, t, t ? n : !1);
  for (; a; ) {
    if (a === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const u = r ? !1 : a.disabled || a.getAttribute("aria-disabled") === "true";
    if (!a.hasAttribute("tabindex") || !Fa(a, i) || u)
      a = o(e, a, n);
    else
      return a.focus(), !0;
  }
  return !1;
}
const Da = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: s,
    className: a,
    disabledItemsFocusable: u = !1,
    disableListWrap: c = !1,
    onKeyDown: p,
    variant: g = "selectedMenu"
  } = t, f = ge(t, Mm), d = E.useRef(null), h = E.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  kt(() => {
    o && d.current.focus();
  }, [o]), E.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (x, S) => {
      const w = !d.current.style.width;
      if (x.clientHeight < d.current.clientHeight && w) {
        const T = `${Ys(Oe(x))}px`;
        d.current.style[S.direction === "rtl" ? "paddingLeft" : "paddingRight"] = T, d.current.style.width = `calc(100% + ${T})`;
      }
      return d.current;
    }
  }), []);
  const m = (x) => {
    const S = d.current, w = x.key, T = Oe(S).activeElement;
    if (w === "ArrowDown")
      x.preventDefault(), cn(S, T, c, u, jr);
    else if (w === "ArrowUp")
      x.preventDefault(), cn(S, T, c, u, Qi);
    else if (w === "Home")
      x.preventDefault(), cn(S, null, c, u, jr);
    else if (w === "End")
      x.preventDefault(), cn(S, null, c, u, Qi);
    else if (w.length === 1) {
      const k = h.current, F = w.toLowerCase(), D = performance.now();
      k.keys.length > 0 && (D - k.lastTime > 500 ? (k.keys = [], k.repeating = !0, k.previousKeyMatched = !0) : k.repeating && F !== k.keys[0] && (k.repeating = !1)), k.lastTime = D, k.keys.push(F);
      const V = T && !k.repeating && Fa(T, k);
      k.previousKeyMatched && (V || cn(S, T, !1, u, jr, k)) ? x.preventDefault() : k.previousKeyMatched = !1;
    }
    p && p(x);
  }, v = qe(d, n);
  let y = -1;
  E.Children.forEach(s, (x, S) => {
    if (!/* @__PURE__ */ E.isValidElement(x)) {
      y === S && (y += 1, y >= s.length && (y = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Yn.isFragment(x) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), x.props.disabled || (g === "selectedMenu" && x.props.selected || y === -1) && (y = S), y === S && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (y += 1, y >= s.length && (y = -1));
  });
  const O = E.Children.map(s, (x, S) => {
    if (S === y) {
      const w = {};
      return i && (w.autoFocus = !0), x.props.tabIndex === void 0 && g === "selectedMenu" && (w.tabIndex = 0), /* @__PURE__ */ E.cloneElement(x, w);
    }
    return x;
  });
  return /* @__PURE__ */ b($m, C({
    role: "menu",
    ref: v,
    className: a,
    onKeyDown: m,
    tabIndex: o ? 0 : -1
  }, f, {
    children: O
  }));
});
process.env.NODE_ENV !== "production" && (Da.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: l.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: l.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: l.node,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: l.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: l.bool,
  /**
   * @ignore
   */
  onKeyDown: l.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: l.oneOf(["menu", "selectedMenu"])
});
const Im = Da, Am = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Fm = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Va = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const r = _n(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: a,
    easing: u,
    in: c,
    onEnter: p,
    onEntered: g,
    onEntering: f,
    onExit: d,
    onExited: h,
    onExiting: m,
    style: v,
    timeout: y = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: O = Ca
  } = t, x = ge(t, Am), S = E.useRef(null), w = qe(S, a.ref, n), T = (L) => (B) => {
    if (L) {
      const _ = S.current;
      B === void 0 ? L(_) : L(_, B);
    }
  }, k = T(f), F = T((L, B) => {
    Ra(L);
    const _ = nr({
      style: v,
      timeout: y,
      easing: u
    }, {
      mode: "enter"
    });
    L.style.webkitTransition = r.transitions.create("opacity", _), L.style.transition = r.transitions.create("opacity", _), p && p(L, B);
  }), D = T(g), V = T(m), P = T((L) => {
    const B = nr({
      style: v,
      timeout: y,
      easing: u
    }, {
      mode: "exit"
    });
    L.style.webkitTransition = r.transitions.create("opacity", B), L.style.transition = r.transitions.create("opacity", B), d && d(L);
  }), $ = T(h);
  return /* @__PURE__ */ b(O, C({
    appear: s,
    in: c,
    nodeRef: S,
    onEnter: F,
    onEntered: D,
    onEntering: k,
    onExit: P,
    onExited: $,
    onExiting: V,
    addEndListener: (L) => {
      i && i(S.current, L);
    },
    timeout: y
  }, x, {
    children: (L, B) => /* @__PURE__ */ E.cloneElement(a, C({
      style: C({
        opacity: 0,
        visibility: L === "exited" && !c ? "hidden" : void 0
      }, Fm[L], v, a.props.style),
      ref: w
    }, B))
  }));
});
process.env.NODE_ENV !== "production" && (Va.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: l.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: l.bool,
  /**
   * A single child content element.
   */
  children: Rn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: l.oneOfType([l.shape({
    enter: l.string,
    exit: l.string
  }), l.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: l.bool,
  /**
   * @ignore
   */
  onEnter: l.func,
  /**
   * @ignore
   */
  onEntered: l.func,
  /**
   * @ignore
   */
  onEntering: l.func,
  /**
   * @ignore
   */
  onExit: l.func,
  /**
   * @ignore
   */
  onExited: l.func,
  /**
   * @ignore
   */
  onExiting: l.func,
  /**
   * @ignore
   */
  style: l.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: l.oneOfType([l.number, l.shape({
    appear: l.number,
    enter: l.number,
    exit: l.number
  })])
});
const Dm = Va;
function Vm(e) {
  return tt("MuiBackdrop", e);
}
vt("MuiBackdrop", ["root", "invisible"]);
const Lm = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Bm = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return ct({
    root: ["root", n && "invisible"]
  }, Vm, t);
}, jm = ke("div", {
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
}) => C({
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
})), La = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i;
  const s = pt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: a,
    className: u,
    component: c = "div",
    components: p = {},
    componentsProps: g = {},
    invisible: f = !1,
    open: d,
    slotProps: h = {},
    slots: m = {},
    TransitionComponent: v = Dm,
    transitionDuration: y
  } = s, O = ge(s, Lm), x = C({}, s, {
    component: c,
    invisible: f
  }), S = Bm(x), w = (r = h.root) != null ? r : g.root;
  return /* @__PURE__ */ b(v, C({
    in: d,
    timeout: y
  }, O, {
    children: /* @__PURE__ */ b(jm, C({
      "aria-hidden": !0
    }, w, {
      as: (o = (i = m.root) != null ? i : p.Root) != null ? o : c,
      className: Pe(S.root, u, w == null ? void 0 : w.className),
      ownerState: C({}, x, w == null ? void 0 : w.ownerState),
      classes: S,
      ref: n,
      children: a
    }))
  }));
});
process.env.NODE_ENV !== "production" && (La.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: l.shape({
    Root: l.elementType
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
  componentsProps: l.shape({
    root: l.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: l.bool,
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: l.shape({
    root: l.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: l.shape({
    root: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: l.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: l.oneOfType([l.number, l.shape({
    appear: l.number,
    enter: l.number,
    exit: l.number
  })])
});
const zm = La;
function Hm(e) {
  return tt("MuiModal", e);
}
vt("MuiModal", ["root", "hidden", "backdrop"]);
const Gm = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Um = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return ct({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, Hm, r);
}, qm = ke("div", {
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
}) => C({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), Wm = ke(zm, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Ba = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i, s, a, u;
  const c = pt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: p = Wm,
    BackdropProps: g,
    className: f,
    closeAfterTransition: d = !1,
    children: h,
    container: m,
    component: v,
    components: y = {},
    componentsProps: O = {},
    disableAutoFocus: x = !1,
    disableEnforceFocus: S = !1,
    disableEscapeKeyDown: w = !1,
    disablePortal: T = !1,
    disableRestoreFocus: k = !1,
    disableScrollLock: F = !1,
    hideBackdrop: D = !1,
    keepMounted: V = !1,
    onBackdropClick: P,
    open: $,
    slotProps: M,
    slots: L
    // eslint-disable-next-line react/prop-types
  } = c, B = ge(c, Gm), _ = C({}, c, {
    closeAfterTransition: d,
    disableAutoFocus: x,
    disableEnforceFocus: S,
    disableEscapeKeyDown: w,
    disablePortal: T,
    disableRestoreFocus: k,
    disableScrollLock: F,
    hideBackdrop: D,
    keepMounted: V
  }), {
    getRootProps: j,
    getBackdropProps: ne,
    getTransitionProps: ee,
    portalRef: R,
    isTopModal: A,
    exited: H,
    hasTransition: X
  } = Ip(C({}, _, {
    rootRef: n
  })), z = C({}, _, {
    exited: H
  }), G = Um(z), q = {};
  if (h.props.tabIndex === void 0 && (q.tabIndex = "-1"), X) {
    const {
      onEnter: Q,
      onExited: N
    } = ee();
    q.onEnter = Q, q.onExited = N;
  }
  const W = (r = (o = L == null ? void 0 : L.root) != null ? o : y.Root) != null ? r : qm, U = (i = (s = L == null ? void 0 : L.backdrop) != null ? s : y.Backdrop) != null ? i : p, J = (a = M == null ? void 0 : M.root) != null ? a : O.root, Z = (u = M == null ? void 0 : M.backdrop) != null ? u : O.backdrop, ae = Nt({
    elementType: W,
    externalSlotProps: J,
    externalForwardedProps: B,
    getSlotProps: j,
    additionalProps: {
      ref: n,
      as: v
    },
    ownerState: z,
    className: Pe(f, J == null ? void 0 : J.className, G == null ? void 0 : G.root, !z.open && z.exited && (G == null ? void 0 : G.hidden))
  }), I = Nt({
    elementType: U,
    externalSlotProps: Z,
    additionalProps: g,
    getSlotProps: (Q) => ne(C({}, Q, {
      onClick: (N) => {
        P && P(N), Q != null && Q.onClick && Q.onClick(N);
      }
    })),
    className: Pe(Z == null ? void 0 : Z.className, g == null ? void 0 : g.className, G == null ? void 0 : G.backdrop),
    ownerState: z
  });
  return !V && !$ && (!X || H) ? null : /* @__PURE__ */ b(xn, {
    ref: R,
    container: m,
    disablePortal: T,
    children: /* @__PURE__ */ te(W, C({}, ae, {
      children: [!D && p ? /* @__PURE__ */ b(U, C({}, I)) : null, /* @__PURE__ */ b(Jn, {
        disableEnforceFocus: S,
        disableAutoFocus: x,
        disableRestoreFocus: k,
        isEnabled: A,
        open: $,
        children: /* @__PURE__ */ E.cloneElement(h, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ba.propTypes = {
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
  BackdropComponent: l.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: l.object,
  /**
   * A single child content element.
   */
  children: Rn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: l.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: l.shape({
    Backdrop: l.elementType,
    Root: l.elementType
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
  componentsProps: l.shape({
    backdrop: l.oneOfType([l.func, l.object]),
    root: l.oneOfType([l.func, l.object])
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
  container: l.oneOfType([at, l.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: l.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: l.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: l.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: l.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: l.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: l.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: l.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: l.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: l.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: l.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: l.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: l.func,
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: l.shape({
    backdrop: l.oneOfType([l.func, l.object]),
    root: l.oneOfType([l.func, l.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: l.shape({
    backdrop: l.elementType,
    root: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object])
});
const Xm = Ba;
function Ym(e) {
  return tt("MuiPaper", e);
}
vt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Km = ["className", "component", "elevation", "square", "variant"], Jm = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return ct(i, Ym, o);
}, Zm = ke("div", {
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
  return C({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && C({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${tr("#fff", Xi(t.elevation))}, ${tr("#fff", Xi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), ja = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const r = pt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: a = !1,
    variant: u = "elevation"
  } = r, c = ge(r, Km), p = C({}, r, {
    component: i,
    elevation: s,
    square: a,
    variant: u
  }), g = Jm(p);
  return process.env.NODE_ENV !== "production" && _n().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ b(Zm, C({
    as: i,
    ownerState: p,
    className: Pe(g.root, o),
    ref: n
  }, c));
});
process.env.NODE_ENV !== "production" && (ja.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Jt(Zs, (e) => {
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
  square: l.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: l.oneOfType([l.oneOf(["elevation", "outlined"]), l.string])
});
const Qm = ja;
function eh(e) {
  return tt("MuiPopover", e);
}
vt("MuiPopover", ["root", "paper"]);
const th = ["onEntering"], nh = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], rh = ["slotProps"];
function es(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function ts(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function ns(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Xn(e) {
  return typeof e == "function" ? e() : e;
}
const oh = (e) => {
  const {
    classes: t
  } = e;
  return ct({
    root: ["root"],
    paper: ["paper"]
  }, eh, t);
}, ih = ke(Xm, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), za = ke(Qm, {
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
}), Ha = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i;
  const s = pt({
    props: t,
    name: "MuiPopover"
  }), {
    action: a,
    anchorEl: u,
    anchorOrigin: c = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: p,
    anchorReference: g = "anchorEl",
    children: f,
    className: d,
    container: h,
    elevation: m = 8,
    marginThreshold: v = 16,
    open: y,
    PaperProps: O = {},
    slots: x,
    slotProps: S,
    transformOrigin: w = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: T = io,
    transitionDuration: k = "auto",
    TransitionProps: {
      onEntering: F
    } = {},
    disableScrollLock: D = !1
  } = s, V = ge(s.TransitionProps, th), P = ge(s, nh), $ = (r = S == null ? void 0 : S.paper) != null ? r : O, M = E.useRef(), L = qe(M, $.ref), B = C({}, s, {
    anchorOrigin: c,
    anchorReference: g,
    elevation: m,
    marginThreshold: v,
    externalPaperSlotProps: $,
    transformOrigin: w,
    TransitionComponent: T,
    transitionDuration: k,
    TransitionProps: V
  }), _ = oh(B), j = E.useCallback(() => {
    if (g === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (p || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), p;
    const Q = Xn(u), N = Q && Q.nodeType === 1 ? Q : Oe(M.current).body, le = N.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Ce = N.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Ce.top === 0 && Ce.left === 0 && Ce.right === 0 && Ce.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: le.top + es(le, c.vertical),
      left: le.left + ts(le, c.horizontal)
    };
  }, [u, c.horizontal, c.vertical, p, g]), ne = E.useCallback((Q) => ({
    vertical: es(Q, w.vertical),
    horizontal: ts(Q, w.horizontal)
  }), [w.horizontal, w.vertical]), ee = E.useCallback((Q) => {
    const N = {
      width: Q.offsetWidth,
      height: Q.offsetHeight
    }, le = ne(N);
    if (g === "none")
      return {
        top: null,
        left: null,
        transformOrigin: ns(le)
      };
    const Ce = j();
    let Ne = Ce.top - le.vertical, xe = Ce.left - le.horizontal;
    const yt = Ne + N.height, _e = xe + N.width, nt = Gt(Xn(u)), De = nt.innerHeight - v, rt = nt.innerWidth - v;
    if (v !== null && Ne < v) {
      const Re = Ne - v;
      Ne -= Re, le.vertical += Re;
    } else if (v !== null && yt > De) {
      const Re = yt - De;
      Ne -= Re, le.vertical += Re;
    }
    if (process.env.NODE_ENV !== "production" && N.height > De && N.height && De && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${N.height - De}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), v !== null && xe < v) {
      const Re = xe - v;
      xe -= Re, le.horizontal += Re;
    } else if (_e > rt) {
      const Re = _e - rt;
      xe -= Re, le.horizontal += Re;
    }
    return {
      top: `${Math.round(Ne)}px`,
      left: `${Math.round(xe)}px`,
      transformOrigin: ns(le)
    };
  }, [u, g, j, ne, v]), [R, A] = E.useState(y), H = E.useCallback(() => {
    const Q = M.current;
    if (!Q)
      return;
    const N = ee(Q);
    N.top !== null && (Q.style.top = N.top), N.left !== null && (Q.style.left = N.left), Q.style.transformOrigin = N.transformOrigin, A(!0);
  }, [ee]);
  E.useEffect(() => (D && window.addEventListener("scroll", H), () => window.removeEventListener("scroll", H)), [u, D, H]);
  const X = (Q, N) => {
    F && F(Q, N), H();
  }, z = () => {
    A(!1);
  };
  E.useEffect(() => {
    y && H();
  }), E.useImperativeHandle(a, () => y ? {
    updatePosition: () => {
      H();
    }
  } : null, [y, H]), E.useEffect(() => {
    if (!y)
      return;
    const Q = Us(() => {
      H();
    }), N = Gt(u);
    return N.addEventListener("resize", Q), () => {
      Q.clear(), N.removeEventListener("resize", Q);
    };
  }, [u, y, H]);
  let G = k;
  k === "auto" && !T.muiSupportAuto && (G = void 0);
  const q = h || (u ? Oe(Xn(u)).body : void 0), W = (o = x == null ? void 0 : x.root) != null ? o : ih, U = (i = x == null ? void 0 : x.paper) != null ? i : za, J = Nt({
    elementType: U,
    externalSlotProps: C({}, $, {
      style: R ? $.style : C({}, $.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: m,
      ref: L
    },
    ownerState: B,
    className: Pe(_.paper, $ == null ? void 0 : $.className)
  }), Z = Nt({
    elementType: W,
    externalSlotProps: (S == null ? void 0 : S.root) || {},
    externalForwardedProps: P,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: q,
      open: y
    },
    ownerState: B,
    className: Pe(_.root, d)
  }), {
    slotProps: ae
  } = Z, I = ge(Z, rh);
  return /* @__PURE__ */ b(W, C({}, I, !na(W) && {
    slotProps: ae,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ b(T, C({
      appear: !0,
      in: y,
      onEntering: X,
      onExited: z,
      timeout: G
    }, V, {
      children: /* @__PURE__ */ b(U, C({}, J, {
        children: f
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ha.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: yo,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Jt(l.oneOfType([at, l.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Xn(e.anchorEl);
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
  anchorOrigin: l.shape({
    horizontal: l.oneOfType([l.oneOf(["center", "left", "right"]), l.number]).isRequired,
    vertical: l.oneOfType([l.oneOf(["bottom", "center", "top"]), l.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: l.shape({
    left: l.number.isRequired,
    top: l.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: l.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: l.oneOfType([at, l.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: l.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Zs,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: l.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: l.func,
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: l.shape({
    component: Ic
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: l.shape({
    paper: l.oneOfType([l.func, l.object]),
    root: l.oneOfType([l.func, l.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: l.shape({
    paper: l.elementType,
    root: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
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
  transformOrigin: l.shape({
    horizontal: l.oneOfType([l.oneOf(["center", "left", "right"]), l.number]).isRequired,
    vertical: l.oneOfType([l.oneOf(["bottom", "center", "top"]), l.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: l.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: l.oneOfType([l.oneOf(["auto"]), l.number, l.shape({
    appear: l.number,
    enter: l.number,
    exit: l.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: l.object
});
const sh = Ha;
function ah(e) {
  return tt("MuiMenu", e);
}
vt("MuiMenu", ["root", "paper", "list"]);
const lh = ["onEntering"], uh = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], ch = {
  vertical: "top",
  horizontal: "right"
}, ph = {
  vertical: "top",
  horizontal: "left"
}, dh = (e) => {
  const {
    classes: t
  } = e;
  return ct({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, ah, t);
}, fh = ke(sh, {
  shouldForwardProp: (e) => Sa(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), gh = ke(za, {
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
}), mh = ke(Im, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Ga = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o;
  const i = pt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: a,
    className: u,
    disableAutoFocusItem: c = !1,
    MenuListProps: p = {},
    onClose: g,
    open: f,
    PaperProps: d = {},
    PopoverClasses: h,
    transitionDuration: m = "auto",
    TransitionProps: {
      onEntering: v
    } = {},
    variant: y = "selectedMenu",
    slots: O = {},
    slotProps: x = {}
  } = i, S = ge(i.TransitionProps, lh), w = ge(i, uh), T = _n(), k = T.direction === "rtl", F = C({}, i, {
    autoFocus: s,
    disableAutoFocusItem: c,
    MenuListProps: p,
    onEntering: v,
    PaperProps: d,
    transitionDuration: m,
    TransitionProps: S,
    variant: y
  }), D = dh(F), V = s && !c && f, P = E.useRef(null), $ = (ee, R) => {
    P.current && P.current.adjustStyleForScrollbar(ee, T), v && v(ee, R);
  }, M = (ee) => {
    ee.key === "Tab" && (ee.preventDefault(), g && g(ee, "tabKeyDown"));
  };
  let L = -1;
  E.Children.map(a, (ee, R) => {
    /* @__PURE__ */ E.isValidElement(ee) && (process.env.NODE_ENV !== "production" && Yn.isFragment(ee) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), ee.props.disabled || (y === "selectedMenu" && ee.props.selected || L === -1) && (L = R));
  });
  const B = (r = O.paper) != null ? r : gh, _ = (o = x.paper) != null ? o : d, j = Nt({
    elementType: O.root,
    externalSlotProps: x.root,
    ownerState: F,
    className: [D.root, u]
  }), ne = Nt({
    elementType: B,
    externalSlotProps: _,
    ownerState: F,
    className: D.paper
  });
  return /* @__PURE__ */ b(fh, C({
    onClose: g,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: k ? "right" : "left"
    },
    transformOrigin: k ? ch : ph,
    slots: {
      paper: B,
      root: O.root
    },
    slotProps: {
      root: j,
      paper: ne
    },
    open: f,
    ref: n,
    transitionDuration: m,
    TransitionProps: C({
      onEntering: $
    }, S),
    ownerState: F
  }, w, {
    classes: h,
    children: /* @__PURE__ */ b(mh, C({
      onKeyDown: M,
      actions: P,
      autoFocus: s && (L === -1 || c),
      autoFocusItem: V,
      variant: y
    }, p, {
      className: Pe(D.list, p.className),
      children: a
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ga.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: l.oneOfType([at, l.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: l.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: l.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: l.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: l.func,
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: l.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: l.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: l.shape({
    paper: l.oneOfType([l.func, l.object]),
    root: l.oneOfType([l.func, l.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: l.shape({
    paper: l.elementType,
    root: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: l.oneOfType([l.oneOf(["auto"]), l.number, l.shape({
    appear: l.number,
    enter: l.number,
    exit: l.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: l.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: l.oneOf(["menu", "selectedMenu"])
});
const hh = Ga;
function Jh({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var c;
  const [o, i] = ie.useState(void 0), s = Me(
    (p) => {
      p.preventDefault(), i(
        o === void 0 ? {
          mouseX: p.clientX + 2,
          mouseY: p.clientY - 6
        } : (
          // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          void 0
        )
      );
    },
    [o]
  ), a = Me(() => {
    i(void 0);
  }, []), u = ao(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((c = n == null ? void 0 : n.items) == null ? void 0 : c.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ te(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ b(
          hh,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: a,
            anchorReference: "anchorPosition",
            anchorPosition: u,
            children: /* @__PURE__ */ b(
              Lo,
              {
                menuDefinition: n,
                commandHandler: t,
                onClick: a
              }
            )
          }
        )
      ]
    }
  );
}
const vh = Na(/* @__PURE__ */ b("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function wh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const so = (e, t, n = {}) => {
  const r = Tt(t);
  r.current = t;
  const o = Tt(n);
  o.current = wh(o.current);
  const [i, s] = Ee(() => r.current), [a, u] = Ee(!0);
  return Yt(() => {
    let c = !0;
    return u(!!e), (async () => {
      if (e) {
        const p = await e();
        c && (s(() => p), u(!1));
      }
    })(), () => {
      c = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [i, a];
};
function bh({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: a
}) {
  const [u, c] = Ee(!1), [p, g] = Ee(!1), f = Me(() => {
    u && c(!1), g(!1);
  }, [u]), d = Me((S) => {
    S.stopPropagation(), c((w) => {
      const T = !w;
      return T && S.shiftKey ? g(!0) : T || g(!1), T;
    });
  }, []), h = Me(
    (S) => (f(), r(S)),
    [r, f]
  ), [m, v] = Ee({ top: 1, left: 1 });
  Yt(() => {
    if (u) {
      const S = o == null ? void 0 : o.current;
      if (S) {
        const w = S.getBoundingClientRect(), T = window.scrollY, k = window.scrollX, F = w.top + T + S.clientHeight, D = w.left + k;
        v({ top: F, left: D });
      }
    }
  }, [u, o]);
  const [y] = so(
    Me(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, u]),
    t
  ), [O] = so(
    Me(async () => (e == null ? void 0 : e(!0)) ?? n ?? y, [e, n, y, u]),
    n ?? y
  ), x = p && O ? O : y;
  return /* @__PURE__ */ te(rr, { children: [
    /* @__PURE__ */ b(
      us,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${i ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: d,
        children: a ?? /* @__PURE__ */ b(vh, {})
      }
    ),
    /* @__PURE__ */ b(
      Nl,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: u,
        onClose: f,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: m.top,
            left: m.left
          }
        },
        children: x ? /* @__PURE__ */ b(
          Tm,
          {
            className: i,
            id: `${s ?? ""} main menu`,
            commandHandler: h,
            multiColumnMenu: x
          }
        ) : void 0
      }
    )
  ] });
}
function Zh({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: s = "medium",
  className: a,
  onClick: u,
  children: c
}) {
  return /* @__PURE__ */ b(
    us,
    {
      id: e,
      disabled: n,
      edge: i,
      size: s,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${a ?? ""}`,
      onClick: u,
      children: c
    }
  );
}
const yh = ss(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Ua = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(cs.Root, { ref: n, className: re(yh(), e), ...t }));
Ua.displayName = cs.Root.displayName;
function xh({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: i,
  placeholder: s,
  isRequired: a = !1,
  className: u,
  defaultValue: c,
  value: p,
  onChange: g,
  onFocus: f,
  onBlur: d
}) {
  return /* @__PURE__ */ te("div", { className: re("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ b(
      Ua,
      {
        htmlFor: e,
        className: re({
          "pr-text-red-600": n,
          "pr-hidden": !i
        }),
        children: `${i}${a ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ b(
      go,
      {
        id: e,
        disabled: t,
        placeholder: s,
        required: a,
        className: re(u, { "pr-border-red-600": n }),
        defaultValue: c,
        value: p,
        onChange: g,
        onFocus: f,
        onBlur: d
      }
    ),
    /* @__PURE__ */ b("p", { className: re({ "pr-hidden": !o }), children: o })
  ] });
}
function Qh({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = Ee(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ b(
    xh,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  );
}
function ev({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: s = !1,
  defaultValue: a,
  value: u,
  valueLabelDisplay: c = "off",
  className: p,
  onChange: g,
  onChangeCommitted: f
}) {
  return /* @__PURE__ */ b(
    _l,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: i,
      marks: s,
      defaultValue: a,
      value: u,
      valueLabelDisplay: c,
      className: `papi-slider ${n} ${p ?? ""}`,
      onChange: g,
      onChangeCommitted: f
    }
  );
}
function tv({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: a
}) {
  const u = {
    action: (s == null ? void 0 : s.action) || a,
    message: s == null ? void 0 : s.message,
    className: r
  };
  return /* @__PURE__ */ b(
    $l,
    {
      autoHideDuration: e ?? void 0,
      open: n,
      onClose: o,
      anchorOrigin: i,
      id: t,
      ContentProps: u
    }
  );
}
function nv({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ b(
    Ml,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function rv({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = Tt(void 0);
  return /* @__PURE__ */ b("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ b(Il, { position: "static", id: r, children: /* @__PURE__ */ te(Al, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ b(
      bh,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ b("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const ov = Fe.Root, Sh = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Fe.List,
  {
    ref: n,
    className: re(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Sh.displayName = Fe.List.displayName;
const Eh = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Fe.Trigger,
  {
    ref: n,
    className: re(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
Eh.displayName = Fe.Trigger.displayName;
const Ch = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Fe.Content,
  {
    ref: n,
    className: re(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Ch.displayName = Fe.Content.displayName;
const Rh = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Fe.Root,
  {
    orientation: "vertical",
    ref: n,
    className: re("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Rh.displayName = Fe.List.displayName;
const Th = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Fe.List,
  {
    ref: n,
    className: re(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Th.displayName = Fe.List.displayName;
const iv = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Fe.Trigger,
  {
    ref: n,
    ...t,
    className: re(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Ph = ie.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Fe.Content,
  {
    ref: n,
    className: re(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Ph.displayName = Fe.Content.displayName;
const sv = (e, t) => {
  Yt(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, zr = () => !1, av = (e, t) => {
  const [n] = so(
    Me(async () => {
      if (!e)
        return zr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    zr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Yt(() => () => {
    n !== zr && n();
  }, [n]);
};
function Oh(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Oh(`.papi-switch {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
`, "top");
export {
  qh as BookChapterControl,
  gt as Button,
  Yh as ChapterRangeSelector,
  bc as Checkbox,
  Kh as Checklist,
  li as ComboBox,
  Jh as ContextMenu,
  Xh as DataTable,
  vs as DropdownMenu,
  bs as DropdownMenuCheckboxItem,
  po as DropdownMenuContent,
  zh as DropdownMenuGroup,
  ws as DropdownMenuItem,
  or as DropdownMenuLabel,
  Hh as DropdownMenuPortal,
  Uh as DropdownMenuRadioGroup,
  tu as DropdownMenuRadioItem,
  fo as DropdownMenuSeparator,
  nu as DropdownMenuShortcut,
  Gh as DropdownMenuSub,
  eu as DropdownMenuSubContent,
  Ql as DropdownMenuSubTrigger,
  Zl as DropdownMenuTrigger,
  Tm as GridMenu,
  bh as HamburgerMenuButton,
  Zh as IconButton,
  go as Input,
  Bt as LabelPosition,
  $a as MenuItem,
  Qh as SearchBar,
  fc as Select,
  Fs as SelectContent,
  Wh as SelectGroup,
  Ds as SelectItem,
  mc as SelectLabel,
  As as SelectScrollDownButton,
  Is as SelectScrollUpButton,
  hc as SelectSeparator,
  Ms as SelectTrigger,
  gc as SelectValue,
  ev as Slider,
  tv as Snackbar,
  nv as Switch,
  ks as Table,
  _s as TableBody,
  pc as TableCaption,
  Xr as TableCell,
  cc as TableFooter,
  $s as TableHead,
  Ns as TableHeader,
  Gn as TableRow,
  ov as Tabs,
  Ch as TabsContent,
  Sh as TabsList,
  Eh as TabsTrigger,
  xh as TextField,
  rv as Toolbar,
  Rh as VerticalTabs,
  Ph as VerticalTabsContent,
  Th as VerticalTabsList,
  iv as VerticalTabsTrigger,
  dc as buttonVariants,
  sv as useEvent,
  av as useEventAsync,
  so as usePromise
};
//# sourceMappingURL=index.js.map
