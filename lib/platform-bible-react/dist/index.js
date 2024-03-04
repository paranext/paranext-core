import { jsxs as te, jsx as y, Fragment as Yr } from "react/jsx-runtime";
import * as ie from "react";
import { forwardRef as Kr, useState as Ee, useRef as Qe, useCallback as Ne, useMemo as _n, useEffect as on } from "react";
import { getChaptersForBook as Sr, offsetBook as Ln, FIRST_SCR_BOOK_NUM as Jr, offsetChapter as Un, FIRST_SCR_CHAPTER_NUM as Zr, offsetVerse as Gn, FIRST_SCR_VERSE_NUM as Qr } from "platform-bible-utils";
import * as Y from "@radix-ui/react-dropdown-menu";
import { ChevronRight as et, Check as nt, Circle as rt, History as tt, Tally1 as Hn, ChevronUp as ot } from "lucide-react";
import at, { clsx as it } from "clsx";
import { twMerge as st } from "tailwind-merge";
import { Button as ct, Autocomplete as lt, TextField as Er, FormControlLabel as Wn, FormLabel as ut, Checkbox as dt, MenuItem as ft, Grid as Cr, IconButton as Tr, Paper as pt, Slider as ht, Snackbar as mt, Switch as gt, AppBar as bt, Toolbar as yt, Drawer as vt } from "@mui/material";
import wt, { SelectColumn as xt } from "react-data-grid";
import kt, { ThemeContext as St, internal_processStyles as Et } from "@mui/styled-engine";
var Ct = Object.defineProperty, Tt = (e, n, r) => n in e ? Ct(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, A = (e, n, r) => (Tt(e, typeof n != "symbol" ? n + "" : n, r), r);
const Oe = [
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
], Nn = [
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
], _r = [
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
], qn = Bt();
function Le(e, n = !0) {
  return n && (e = e.toUpperCase()), e in qn ? qn[e] : 0;
}
function On(e) {
  return Le(e) > 0;
}
function _t(e) {
  const n = typeof e == "string" ? Le(e) : e;
  return n >= 40 && n <= 66;
}
function Nt(e) {
  return (typeof e == "string" ? Le(e) : e) <= 39;
}
function Nr(e) {
  return e <= 66;
}
function Ot(e) {
  const n = typeof e == "string" ? Le(e) : e;
  return Rr(n) && !Nr(n);
}
function* $t() {
  for (let e = 1; e <= Oe.length; e++)
    yield e;
}
const Rt = 1, Or = Oe.length;
function At() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function $n(e, n = "***") {
  const r = e - 1;
  return r < 0 || r >= Oe.length ? n : Oe[r];
}
function $r(e) {
  return e <= 0 || e > Or ? "******" : _r[e - 1];
}
function Pt(e) {
  return $r(Le(e));
}
function Rr(e) {
  const n = typeof e == "number" ? $n(e) : e;
  return On(n) && !Nn.includes(n);
}
function It(e) {
  const n = typeof e == "number" ? $n(e) : e;
  return On(n) && Nn.includes(n);
}
function Mt(e) {
  return _r[e - 1].includes("*obsolete*");
}
function Bt() {
  const e = {};
  for (let n = 0; n < Oe.length; n++)
    e[Oe[n]] = n + 1;
  return e;
}
const Z = {
  allBookIds: Oe,
  nonCanonicalIds: Nn,
  bookIdToNumber: Le,
  isBookIdValid: On,
  isBookNT: _t,
  isBookOT: Nt,
  isBookOTNT: Nr,
  isBookDC: Ot,
  allBookNumbers: $t,
  firstBook: Rt,
  lastBook: Or,
  extraBooks: At,
  bookNumberToId: $n,
  bookNumberToEnglishName: $r,
  bookIdToEnglishName: Pt,
  isCanonical: Rr,
  isExtraMaterial: It,
  isObsolete: Mt
};
var ke = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(ke || {});
const _e = class {
  // private versInfo: Versification;
  constructor(e) {
    if (A(this, "name"), A(this, "fullPath"), A(this, "isPresent"), A(this, "hasVerseSegments"), A(this, "isCustomized"), A(this, "baseVersification"), A(this, "scriptureBooks"), A(this, "_type"), e != null)
      typeof e == "string" ? this.name = e : this._type = e;
    else
      throw new Error("Argument null");
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
let le = _e;
A(le, "Original", new _e(ke.Original)), A(le, "Septuagint", new _e(ke.Septuagint)), A(le, "Vulgate", new _e(ke.Vulgate)), A(le, "English", new _e(ke.English)), A(le, "RussianProtestant", new _e(ke.RussianProtestant)), A(le, "RussianOrthodox", new _e(ke.RussianOrthodox));
function Xn(e, n) {
  const r = n[0];
  for (let t = 1; t < n.length; t++)
    e = e.split(n[t]).join(r);
  return e.split(r);
}
var Ar = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ar || {});
const R = class {
  constructor(e, n, r, t) {
    if (A(this, "firstChapter"), A(this, "lastChapter"), A(this, "lastVerse"), A(this, "hasSegmentsDefined"), A(this, "text"), A(this, "BBBCCCVVVS"), A(this, "longHashCode"), A(this, "versification"), A(this, "rtlMark", "‏"), A(this, "_bookNum", 0), A(this, "_chapterNum", 0), A(this, "_verseNum", 0), A(this, "_verse"), r == null && t == null)
      if (e != null && typeof e == "string") {
        const o = e, a = n != null && n instanceof le ? n : void 0;
        this.setEmpty(a), this.parse(o);
      } else if (e != null && typeof e == "number") {
        const o = n != null && n instanceof le ? n : void 0;
        this.setEmpty(o), this._verseNum = e % R.chapterDigitShifter, this._chapterNum = Math.floor(
          e % R.bookDigitShifter / R.chapterDigitShifter
        ), this._bookNum = Math.floor(e / R.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof R) {
          const o = e;
          this._bookNum = o.bookNum, this._chapterNum = o.chapterNum, this._verseNum = o.verseNum, this._verse = o.verse, this.versification = o.versification;
        } else {
          if (e == null)
            return;
          const o = e instanceof le ? e : R.defaultVersification;
          this.setEmpty(o);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(t), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = t ?? R.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, n = R.defaultVersification) {
    const r = new R(n);
    return r.parse(e), r;
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(e) {
    return e.length > 0 && "0123456789".includes(e[0]) && !e.endsWith(this.verseRangeSeparator) && !e.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(e) {
    let n;
    try {
      return n = R.parse(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Ue)
        return n = new R(), { success: !1, verseRef: n };
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
  static getBBBCCCVVV(e, n, r) {
    return e % R.bcvMaxValue * R.bookDigitShifter + (n >= 0 ? n % R.bcvMaxValue * R.chapterDigitShifter : 0) + (r >= 0 ? r % R.bcvMaxValue : 0);
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let n;
    if (!e)
      return n = -1, { success: !0, vNum: n };
    n = 0;
    let r;
    for (let t = 0; t < e.length; t++) {
      if (r = e[t], r < "0" || r > "9")
        return t === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +r - +"0", n > R.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(R.verseRangeSeparator) || this._verse.includes(R.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return Z.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = Z.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const n = +e;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: n, vNum: r } = R.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = R.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > Z.lastBook)
      throw new Ue(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = e;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(e) {
    this.chapterNum = e;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(e) {
    this._verseNum = e;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var e;
    return (e = this.versification) == null ? void 0 : e.name;
  }
  set versificationStr(e) {
    this.versification = this.versification != null ? new le(e) : void 0;
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
    return this.validateVerse(R.verseRangeSeparators, R.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return R.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return R.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
  parse(e) {
    if (e = e.replace(this.rtlMark, ""), e.includes("/")) {
      const o = e.split("/");
      if (e = o[0], o.length > 1)
        try {
          const a = +o[1].trim();
          this.versification = new le(ke[a]);
        } catch {
          throw new Ue("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Ue("Invalid reference : " + e);
    const r = n[1].split(":"), t = +r[0];
    if (r.length !== 2 || Z.bookIdToNumber(n[0]) === 0 || !Number.isInteger(t) || t < 0 || !R.isVerseParseable(r[1]))
      throw new Ue("Invalid reference : " + e);
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
    return new R(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - `VerseRef` to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(e) {
    return e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e._verse === this._verse && e.versification != null && this.versification != null && e.versification.equals(this.versification);
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
  allVerses(e = !1, n = R.verseRangeSeparators, r = R.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const t = [], o = Xn(this._verse, r);
    for (const a of o.map((i) => Xn(i, n))) {
      const i = this.clone();
      i.verse = a[0];
      const l = i.verseNum;
      if (t.push(i), a.length > 1) {
        const c = this.clone();
        if (c.verse = a[1], !e)
          for (let s = l + 1; s < c.verseNum; s++) {
            const u = new R(
              this._bookNum,
              this._chapterNum,
              s,
              this.versification
            );
            this.isExcluded || t.push(u);
          }
        t.push(c);
      }
    }
    return t;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let r = 0;
    for (const t of this.allVerses(!0, e, n)) {
      const o = t.internalValid;
      if (o !== 0)
        return o;
      const a = t.BBBCCCVVV;
      if (r > a)
        return 3;
      if (r === a)
        return 4;
      r = a;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Z.lastBook ? 2 : 0;
  }
  setEmpty(e = R.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = Z.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
let ye = R;
A(ye, "defaultVersification", le.English), A(ye, "verseRangeSeparator", "-"), A(ye, "verseSequenceIndicator", ","), A(ye, "verseRangeSeparators", [R.verseRangeSeparator]), A(ye, "verseSequenceIndicators", [R.verseSequenceIndicator]), A(ye, "chapterDigitShifter", 1e3), A(ye, "bookDigitShifter", R.chapterDigitShifter * R.chapterDigitShifter), A(ye, "bcvMaxValue", R.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
A(ye, "ValidStatusType", Ar);
class Ue extends Error {
}
function we(...e) {
  return st(it(e));
}
const zt = Y.Root, Dt = Y.Trigger, jt = ie.forwardRef(({ className: e, inset: n, children: r, ...t }, o) => /* @__PURE__ */ te(
  Y.SubTrigger,
  {
    ref: o,
    className: we(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      n && "pr-pl-8",
      e
    ),
    ...t,
    children: [
      r,
      /* @__PURE__ */ y(et, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
jt.displayName = Y.SubTrigger.displayName;
const Vt = ie.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ y(
  Y.SubContent,
  {
    ref: r,
    className: we(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
));
Vt.displayName = Y.SubContent.displayName;
const Pr = ie.forwardRef(({ className: e, sideOffset: n = 4, ...r }, t) => /* @__PURE__ */ y(Y.Portal, { children: /* @__PURE__ */ y(
  Y.Content,
  {
    ref: t,
    sideOffset: n,
    className: we(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
Pr.displayName = Y.Content.displayName;
const Rn = ie.forwardRef(({ className: e, inset: n, ...r }, t) => /* @__PURE__ */ y(
  Y.Item,
  {
    ref: t,
    className: we(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      n && "pr-pl-8",
      e
    ),
    ...r
  }
));
Rn.displayName = Y.Item.displayName;
const Ft = ie.forwardRef(({ className: e, children: n, checked: r, ...t }, o) => /* @__PURE__ */ te(
  Y.CheckboxItem,
  {
    ref: o,
    className: we(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...t,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(Y.ItemIndicator, { children: /* @__PURE__ */ y(nt, { className: "pr-h-4 pr-w-4" }) }) }),
      n
    ]
  }
));
Ft.displayName = Y.CheckboxItem.displayName;
const Lt = ie.forwardRef(({ className: e, children: n, ...r }, t) => /* @__PURE__ */ te(
  Y.RadioItem,
  {
    ref: t,
    className: we(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(Y.ItemIndicator, { children: /* @__PURE__ */ y(rt, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      n
    ]
  }
));
Lt.displayName = Y.RadioItem.displayName;
const Ir = ie.forwardRef(({ className: e, inset: n, ...r }, t) => /* @__PURE__ */ y(
  Y.Label,
  {
    ref: t,
    className: we("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", n && "pr-pl-8", e),
    ...r
  }
));
Ir.displayName = Y.Label.displayName;
const Mr = ie.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ y(
  Y.Separator,
  {
    ref: r,
    className: we("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...n
  }
));
Mr.displayName = Y.Separator.displayName;
const Br = ie.forwardRef(
  ({ className: e, type: n, ...r }, t) => /* @__PURE__ */ y(
    "input",
    {
      type: n,
      className: we(
        "pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: t,
      ...r
    }
  )
);
Br.displayName = "Input";
const Ut = Kr(
  ({ handleSearch: e, ...n }, r) => /* @__PURE__ */ te("div", { children: [
    /* @__PURE__ */ y(
      Br,
      {
        ...n,
        type: "text",
        className: "book-chapter-input",
        onChange: (t) => e(t.target.value),
        ref: r
      }
    ),
    /* @__PURE__ */ y(
      tt,
      {
        style: {
          cursor: "pointer",
          height: "16px",
          width: "16px"
        },
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function Gt({ endChapter: e, activeChapter: n, handleSelectChapter: r }) {
  const t = Array.from({ length: e }, (o, a) => a + 1);
  return /* @__PURE__ */ y("div", { className: "chapter-select", children: t.map((o) => (
    // When adding onClick to <div> get error: Visible, non-interactive elements with click handlers must have at least one keyboard listener.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    /* @__PURE__ */ y(
      "div",
      {
        className: `chapter ${o === n ? "active" : void 0}`,
        onClick: () => r(o),
        children: o
      },
      o
    )
  )) });
}
function Ht({
  bookId: e,
  handleSelectBook: n,
  isSelected: r,
  bookType: t,
  children: o
}) {
  return /* @__PURE__ */ te("div", { children: [
    /* @__PURE__ */ te(
      Rn,
      {
        textValue: e,
        className: r ? "selected-menu-item" : "menu-item",
        onSelect: (a) => {
          a.preventDefault(), n(e);
        },
        children: [
          r ? /* @__PURE__ */ y(
            Hn,
            {
              style: { marginRight: "10px" },
              className: `selected-book-color-label ${t.toLowerCase()}`
            }
          ) : /* @__PURE__ */ y(
            Hn,
            {
              style: { marginRight: "10px" },
              className: `book-color-label ${t.toLowerCase()}`
            }
          ),
          Z.bookIdToEnglishName(e),
          r && /* @__PURE__ */ y(ot, { name: "chevron-up" })
        ]
      },
      e
    ),
    r && o
  ] });
}
const Wt = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, qt = ["OT", "NT", "DC"];
function Ui({ scrRef: e, handleSubmit: n }) {
  const { allBookIds: r } = Z, [t, o] = Ee(""), [a, i] = Ee(""), l = Qe(void 0), c = Ne(
    (m) => ({
      OT: r.filter((f) => Z.isBookOT(f)),
      NT: r.filter((f) => Z.isBookNT(f)),
      DC: r.filter((f) => Z.isBookDC(f))
    })[m],
    [r]
  ), s = Ne(
    (m) => c(m).filter(
      (p) => Z.bookIdToEnglishName(p).toLowerCase().includes(t.toLowerCase()) || p.toLowerCase().includes(t.toLowerCase())
    ),
    [c, t]
  ), u = (m) => {
    o(m);
  }, h = Ne((m) => Sr(Z.bookIdToNumber(m)), []), d = (m) => {
    i(a !== m ? m : ""), h(m) === -1 && n({
      bookNum: Z.bookIdToNumber(m),
      chapterNum: 1,
      verseNum: 1
    });
  }, v = (m) => {
    n({
      bookNum: Z.bookIdToNumber(a),
      chapterNum: m,
      verseNum: 1
    });
  };
  return /* @__PURE__ */ te("div", { children: [
    /* @__PURE__ */ te(zt, { children: [
      /* @__PURE__ */ y(Dt, { asChild: !0, children: /* @__PURE__ */ y(
        Ut,
        {
          ref: l,
          value: t,
          handleSearch: u,
          placeholder: `${Z.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
        }
      ) }),
      /* @__PURE__ */ te(Pr, { style: { width: "300px", height: "500px", overflowY: "auto" }, children: [
        /* @__PURE__ */ y(
          Rn,
          {
            onSelect: (m) => {
              m.preventDefault(), l.current.focus(), console.log("Attempt to give focus to input");
            },
            children: "Give focus to input"
          }
        ),
        qt.map((m) => /* @__PURE__ */ te("div", { children: [
          /* @__PURE__ */ y(Ir, { children: Wt[m] }),
          s(m).map((p) => /* @__PURE__ */ y("div", { children: /* @__PURE__ */ y(
            Ht,
            {
              bookId: p,
              handleSelectBook: () => d(p),
              isSelected: a === p,
              bookType: m,
              children: /* @__PURE__ */ y(
                Gt,
                {
                  handleSelectChapter: v,
                  endChapter: h(p),
                  activeChapter: e.bookNum === Z.bookIdToNumber(p) ? e.chapterNum : 0
                }
              )
            }
          ) }, p)),
          m === "OT" || m === "NT" ? /* @__PURE__ */ y(Mr, {}) : void 0
        ] }, m))
      ] })
    ] }),
    /* @__PURE__ */ y(
      "button",
      {
        type: "button",
        onClick: () => {
          l.current.focus();
        },
        children: "Focus input"
      }
    )
  ] });
}
function Ae({
  id: e,
  isDisabled: n = !1,
  className: r,
  onClick: t,
  onContextMenu: o,
  children: a
}) {
  return /* @__PURE__ */ y(
    ct,
    {
      id: e,
      disabled: n,
      className: `papi-button ${r ?? ""}`,
      onClick: t,
      onContextMenu: o,
      children: a
    }
  );
}
function En({
  id: e,
  title: n,
  isDisabled: r = !1,
  isClearable: t = !0,
  hasError: o = !1,
  isFullWidth: a = !1,
  width: i,
  options: l = [],
  className: c,
  value: s,
  onChange: u,
  onFocus: h,
  onBlur: d,
  getOptionLabel: v
}) {
  return /* @__PURE__ */ y(
    lt,
    {
      id: e,
      disablePortal: !0,
      disabled: r,
      disableClearable: !t,
      fullWidth: a,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: s,
      onChange: u,
      onFocus: h,
      onBlur: d,
      getOptionLabel: v,
      renderInput: (m) => /* @__PURE__ */ y(
        Er,
        {
          ...m,
          error: o,
          fullWidth: a,
          disabled: r,
          label: n,
          style: { width: i }
        }
      )
    }
  );
}
function Gi({
  startChapter: e,
  endChapter: n,
  handleSelectStartChapter: r,
  handleSelectEndChapter: t,
  isDisabled: o,
  chapterCount: a
}) {
  const i = _n(
    () => Array.from({ length: a }, (s, u) => u + 1),
    [a]
  ), l = (s, u) => {
    r(u), u > n && t(u);
  }, c = (s, u) => {
    t(u), u < e && r(u);
  };
  return /* @__PURE__ */ te(Yr, { children: [
    /* @__PURE__ */ y(
      Wn,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ y(
          En,
          {
            onChange: (s, u) => l(s, u),
            className: "book-selection-chapter",
            isClearable: !1,
            options: i,
            getOptionLabel: (s) => s.toString(),
            value: e,
            isDisabled: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ y(
      Wn,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ y(
          En,
          {
            onChange: (s, u) => c(s, u),
            className: "book-selection-chapter",
            isClearable: !1,
            options: i,
            getOptionLabel: (s) => s.toString(),
            value: n,
            isDisabled: o
          },
          "end chapter"
        ),
        label: "to",
        labelPlacement: "start"
      }
    )
  ] });
}
var De = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(De || {});
function Xt({
  id: e,
  isChecked: n,
  labelText: r = "",
  labelPosition: t = De.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: s
}) {
  const u = /* @__PURE__ */ y(
    dt,
    {
      id: e,
      checked: n,
      indeterminate: o,
      defaultChecked: a,
      disabled: i,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: s
    }
  );
  let h;
  if (r) {
    const d = t === De.Before || t === De.Above, v = /* @__PURE__ */ y("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), m = t === De.Before || t === De.After, p = m ? v : /* @__PURE__ */ y("div", { children: v }), f = m ? u : /* @__PURE__ */ y("div", { children: u });
    h = /* @__PURE__ */ te(
      ut,
      {
        className: `papi-checkbox ${t.toString()}`,
        disabled: i,
        error: l,
        children: [
          d && p,
          f,
          !d && p
        ]
      }
    );
  } else
    h = u;
  return h;
}
function Yt(e) {
  const {
    onClick: n,
    name: r,
    hasAutoFocus: t = !1,
    className: o,
    isDense: a = !0,
    hasDisabledGutters: i = !1,
    hasDivider: l = !1,
    focusVisibleClassName: c,
    id: s,
    children: u
  } = e;
  return /* @__PURE__ */ y(
    ft,
    {
      autoFocus: t,
      className: o,
      dense: a,
      disableGutters: i,
      divider: l,
      focusVisibleClassName: c,
      onClick: n,
      id: s,
      children: r || u
    }
  );
}
function Kt({ commandHandler: e, name: n, className: r, items: t, id: o }) {
  return /* @__PURE__ */ te(Cr, { id: o, item: !0, xs: "auto", className: `papi-menu-column ${r ?? ""}`, children: [
    /* @__PURE__ */ y("h3", { className: `papi-menu ${r ?? ""}`, children: n }),
    t.map((a, i) => /* @__PURE__ */ y(
      Yt,
      {
        className: `papi-menu-item ${a.className}`,
        onClick: () => {
          e(a);
        },
        ...a
      },
      i
    ))
  ] });
}
function Jt({ commandHandler: e, className: n, columns: r, id: t }) {
  return /* @__PURE__ */ y(
    Cr,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${n ?? ""}`,
      columns: r.length,
      id: t,
      children: r.map((o, a) => /* @__PURE__ */ y(
        Kt,
        {
          commandHandler: e,
          name: o.name,
          className: n,
          items: o.items
        },
        a
      ))
    }
  );
}
function Hi({
  id: e,
  label: n,
  isDisabled: r = !1,
  tooltip: t,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: c,
  children: s
}) {
  return /* @__PURE__ */ y(
    Tr,
    {
      id: e,
      disabled: r,
      edge: a,
      size: i,
      "aria-label": n,
      title: o ? void 0 : t ?? n,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: s
    }
  );
}
function en({
  variant: e = "outlined",
  id: n,
  isDisabled: r = !1,
  hasError: t = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: i,
  placeholder: l,
  isRequired: c = !1,
  className: s,
  defaultValue: u,
  value: h,
  onChange: d,
  onFocus: v,
  onBlur: m
}) {
  return /* @__PURE__ */ y(
    Er,
    {
      variant: e,
      id: n,
      disabled: r,
      error: t,
      fullWidth: o,
      helperText: a,
      label: i,
      placeholder: l,
      required: c,
      className: `papi-textfield ${s ?? ""}`,
      defaultValue: u,
      value: h,
      onChange: d,
      onFocus: v,
      onBlur: m
    }
  );
}
let hn;
const mn = () => (hn || (hn = Z.allBookIds.map((e) => ({
  bookId: e,
  label: Z.bookIdToEnglishName(e)
}))), hn);
function Wi({ scrRef: e, handleSubmit: n, id: r }) {
  const t = (c) => {
    n(c);
  }, o = (c, s) => {
    const h = { bookNum: Z.bookIdToNumber(s.bookId), chapterNum: 1, verseNum: 1 };
    t(h);
  }, a = (c) => {
    n({ ...e, chapterNum: +c.target.value });
  }, i = (c) => {
    n({ ...e, verseNum: +c.target.value });
  }, l = _n(() => mn()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ te("span", { id: r, children: [
    /* @__PURE__ */ y(
      En,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: mn(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ y(
      Ae,
      {
        onClick: () => t(Ln(e, -1)),
        isDisabled: e.bookNum <= Jr,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(
      Ae,
      {
        onClick: () => t(Ln(e, 1)),
        isDisabled: e.bookNum >= mn().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ y(
      en,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ y(
      Ae,
      {
        onClick: () => n(Un(e, -1)),
        isDisabled: e.chapterNum <= Zr,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(
      Ae,
      {
        onClick: () => n(Un(e, 1)),
        isDisabled: e.chapterNum >= Sr(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ y(
      en,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ y(
      Ae,
      {
        onClick: () => n(Gn(e, -1)),
        isDisabled: e.verseNum <= Qr,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(Ae, { onClick: () => n(Gn(e, 1)), children: ">" })
  ] });
}
function qi({ onSearch: e, placeholder: n, isFullWidth: r }) {
  const [t, o] = Ee(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ y(pt, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ y(
    en,
    {
      isFullWidth: r,
      className: "search-bar-input",
      placeholder: n,
      value: t,
      onChange: (i) => a(i.target.value)
    }
  ) });
}
function Xi({
  id: e,
  isDisabled: n = !1,
  orientation: r = "horizontal",
  min: t = 0,
  max: o = 100,
  step: a = 1,
  showMarks: i = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: s = "off",
  className: u,
  onChange: h,
  onChangeCommitted: d
}) {
  return /* @__PURE__ */ y(
    ht,
    {
      id: e,
      disabled: n,
      orientation: r,
      min: t,
      max: o,
      step: a,
      marks: i,
      defaultValue: l,
      value: c,
      valueLabelDisplay: s,
      className: `papi-slider ${r} ${u ?? ""}`,
      onChange: h,
      onChangeCommitted: d
    }
  );
}
function Yi({
  autoHideDuration: e = void 0,
  id: n,
  isOpen: r = !1,
  className: t,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: i,
  children: l
}) {
  const c = {
    action: (i == null ? void 0 : i.action) || l,
    message: i == null ? void 0 : i.message,
    className: t
  };
  return /* @__PURE__ */ y(
    mt,
    {
      autoHideDuration: e ?? void 0,
      open: r,
      onClose: o,
      anchorOrigin: a,
      id: n,
      ContentProps: c
    }
  );
}
function Ki({
  id: e,
  isChecked: n,
  isDisabled: r = !1,
  hasError: t = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ y(
    gt,
    {
      id: e,
      checked: n,
      disabled: r,
      className: `papi-switch ${t ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function Yn({ onRowChange: e, row: n, column: r }) {
  const t = (o) => {
    e({ ...n, [r.key]: o.target.value });
  };
  return /* @__PURE__ */ y(en, { defaultValue: n[r.key], onChange: t });
}
const Zt = ({ onChange: e, disabled: n, checked: r, ...t }) => /* @__PURE__ */ y(
  Xt,
  {
    ...t,
    isChecked: r,
    isDisabled: n,
    onChange: (a) => {
      e(a.target.checked, a.nativeEvent.shiftKey);
    }
  }
);
function Ji({
  columns: e,
  sortColumns: n,
  onSortColumnsChange: r,
  onColumnResize: t,
  defaultColumnWidth: o,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: i,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: s,
  enableSelectColumn: u,
  selectColumnWidth: h = 50,
  rowKeyGetter: d,
  rowHeight: v = 35,
  headerRowHeight: m = 35,
  selectedRows: p,
  onSelectedRowsChange: f,
  onRowsChange: S,
  onCellClick: J,
  onCellDoubleClick: z,
  onCellContextMenu: C,
  onCellKeyDown: g,
  direction: ee = "ltr",
  enableVirtualization: oe = !0,
  onCopy: me,
  onPaste: fe,
  onScroll: T,
  className: W
  // id,
}) {
  const Q = _n(() => {
    const ae = e.map((U) => typeof U.editable == "function" ? {
      ...U,
      editable: (ne) => !!U.editable(ne),
      renderEditCell: U.renderEditCell || Yn
    } : U.editable && !U.renderEditCell ? { ...U, renderEditCell: Yn } : U.renderEditCell && !U.editable ? { ...U, editable: !1 } : U);
    return u ? [{ ...xt, minWidth: h }, ...ae] : ae;
  }, [e, u, h]);
  return /* @__PURE__ */ y(
    wt,
    {
      columns: Q,
      defaultColumnOptions: {
        width: o,
        minWidth: a,
        maxWidth: i,
        sortable: l,
        resizable: c
      },
      sortColumns: n,
      onSortColumnsChange: r,
      onColumnResize: t,
      rows: s,
      rowKeyGetter: d,
      rowHeight: v,
      headerRowHeight: m,
      selectedRows: p,
      onSelectedRowsChange: f,
      onRowsChange: S,
      onCellClick: J,
      onCellDoubleClick: z,
      onCellContextMenu: C,
      onCellKeyDown: g,
      direction: ee,
      enableVirtualization: oe,
      onCopy: me,
      onPaste: fe,
      onScroll: T,
      renderers: { renderCheckbox: Zt },
      className: W ?? "rdg-light"
    }
  );
}
function B() {
  return B = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var r = arguments[n];
      for (var t in r)
        Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
    }
    return e;
  }, B.apply(this, arguments);
}
function Se(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function zr(e) {
  if (!Se(e))
    return e;
  const n = {};
  return Object.keys(e).forEach((r) => {
    n[r] = zr(e[r]);
  }), n;
}
function he(e, n, r = {
  clone: !0
}) {
  const t = r.clone ? B({}, e) : e;
  return Se(e) && Se(n) && Object.keys(n).forEach((o) => {
    o !== "__proto__" && (Se(n[o]) && o in e && Se(e[o]) ? t[o] = he(e[o], n[o], r) : r.clone ? t[o] = Se(n[o]) ? zr(n[o]) : n[o] : t[o] = n[o]);
  }), t;
}
function Qt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Cn = { exports: {} }, Ke = { exports: {} }, j = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kn;
function eo() {
  if (Kn)
    return j;
  Kn = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, h = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, p = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, J = e ? Symbol.for("react.scope") : 60119;
  function z(g) {
    if (typeof g == "object" && g !== null) {
      var ee = g.$$typeof;
      switch (ee) {
        case n:
          switch (g = g.type, g) {
            case c:
            case s:
            case t:
            case a:
            case o:
            case h:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case l:
                case u:
                case m:
                case v:
                case i:
                  return g;
                default:
                  return ee;
              }
          }
        case r:
          return ee;
      }
    }
  }
  function C(g) {
    return z(g) === s;
  }
  return j.AsyncMode = c, j.ConcurrentMode = s, j.ContextConsumer = l, j.ContextProvider = i, j.Element = n, j.ForwardRef = u, j.Fragment = t, j.Lazy = m, j.Memo = v, j.Portal = r, j.Profiler = a, j.StrictMode = o, j.Suspense = h, j.isAsyncMode = function(g) {
    return C(g) || z(g) === c;
  }, j.isConcurrentMode = C, j.isContextConsumer = function(g) {
    return z(g) === l;
  }, j.isContextProvider = function(g) {
    return z(g) === i;
  }, j.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === n;
  }, j.isForwardRef = function(g) {
    return z(g) === u;
  }, j.isFragment = function(g) {
    return z(g) === t;
  }, j.isLazy = function(g) {
    return z(g) === m;
  }, j.isMemo = function(g) {
    return z(g) === v;
  }, j.isPortal = function(g) {
    return z(g) === r;
  }, j.isProfiler = function(g) {
    return z(g) === a;
  }, j.isStrictMode = function(g) {
    return z(g) === o;
  }, j.isSuspense = function(g) {
    return z(g) === h;
  }, j.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === t || g === s || g === a || g === o || g === h || g === d || typeof g == "object" && g !== null && (g.$$typeof === m || g.$$typeof === v || g.$$typeof === i || g.$$typeof === l || g.$$typeof === u || g.$$typeof === f || g.$$typeof === S || g.$$typeof === J || g.$$typeof === p);
  }, j.typeOf = z, j;
}
var V = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jn;
function no() {
  return Jn || (Jn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, h = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, p = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, J = e ? Symbol.for("react.scope") : 60119;
    function z(w) {
      return typeof w == "string" || typeof w == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      w === t || w === s || w === a || w === o || w === h || w === d || typeof w == "object" && w !== null && (w.$$typeof === m || w.$$typeof === v || w.$$typeof === i || w.$$typeof === l || w.$$typeof === u || w.$$typeof === f || w.$$typeof === S || w.$$typeof === J || w.$$typeof === p);
    }
    function C(w) {
      if (typeof w == "object" && w !== null) {
        var ce = w.$$typeof;
        switch (ce) {
          case n:
            var k = w.type;
            switch (k) {
              case c:
              case s:
              case t:
              case a:
              case o:
              case h:
                return k;
              default:
                var Re = k && k.$$typeof;
                switch (Re) {
                  case l:
                  case u:
                  case m:
                  case v:
                  case i:
                    return Re;
                  default:
                    return ce;
                }
            }
          case r:
            return ce;
        }
      }
    }
    var g = c, ee = s, oe = l, me = i, fe = n, T = u, W = t, Q = m, ae = v, U = r, pe = a, ne = o, be = h, Te = !1;
    function $e(w) {
      return Te || (Te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), b(w) || C(w) === c;
    }
    function b(w) {
      return C(w) === s;
    }
    function x(w) {
      return C(w) === l;
    }
    function $(w) {
      return C(w) === i;
    }
    function N(w) {
      return typeof w == "object" && w !== null && w.$$typeof === n;
    }
    function E(w) {
      return C(w) === u;
    }
    function P(w) {
      return C(w) === t;
    }
    function _(w) {
      return C(w) === m;
    }
    function O(w) {
      return C(w) === v;
    }
    function I(w) {
      return C(w) === r;
    }
    function D(w) {
      return C(w) === a;
    }
    function M(w) {
      return C(w) === o;
    }
    function re(w) {
      return C(w) === h;
    }
    V.AsyncMode = g, V.ConcurrentMode = ee, V.ContextConsumer = oe, V.ContextProvider = me, V.Element = fe, V.ForwardRef = T, V.Fragment = W, V.Lazy = Q, V.Memo = ae, V.Portal = U, V.Profiler = pe, V.StrictMode = ne, V.Suspense = be, V.isAsyncMode = $e, V.isConcurrentMode = b, V.isContextConsumer = x, V.isContextProvider = $, V.isElement = N, V.isForwardRef = E, V.isFragment = P, V.isLazy = _, V.isMemo = O, V.isPortal = I, V.isProfiler = D, V.isStrictMode = M, V.isSuspense = re, V.isValidElementType = z, V.typeOf = C;
  }()), V;
}
var Zn;
function Dr() {
  return Zn || (Zn = 1, process.env.NODE_ENV === "production" ? Ke.exports = eo() : Ke.exports = no()), Ke.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var gn, Qn;
function ro() {
  if (Qn)
    return gn;
  Qn = 1;
  var e = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function t(a) {
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
      var c = Object.getOwnPropertyNames(i).map(function(u) {
        return i[u];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var s = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        s[u] = u;
      }), Object.keys(Object.assign({}, s)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return gn = o() ? Object.assign : function(a, i) {
    for (var l, c = t(a), s, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var h in l)
        n.call(l, h) && (c[h] = l[h]);
      if (e) {
        s = e(l);
        for (var d = 0; d < s.length; d++)
          r.call(l, s[d]) && (c[s[d]] = l[s[d]]);
      }
    }
    return c;
  }, gn;
}
var bn, er;
function An() {
  if (er)
    return bn;
  er = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return bn = e, bn;
}
var yn, nr;
function jr() {
  return nr || (nr = 1, yn = Function.call.bind(Object.prototype.hasOwnProperty)), yn;
}
var vn, rr;
function to() {
  if (rr)
    return vn;
  rr = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var n = An(), r = {}, t = jr();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, l, c, s) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in a)
        if (t(a, u)) {
          var h;
          try {
            if (typeof a[u] != "function") {
              var d = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            h = a[u](i, u, c, l, null, n);
          } catch (m) {
            h = m;
          }
          if (h && !(h instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof h + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), h instanceof Error && !(h.message in r)) {
            r[h.message] = !0;
            var v = s ? s() : "";
            e(
              "Failed " + l + " type: " + h.message + (v ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, vn = o, vn;
}
var wn, tr;
function oo() {
  if (tr)
    return wn;
  tr = 1;
  var e = Dr(), n = ro(), r = An(), t = jr(), o = to(), a = function() {
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
  return wn = function(l, c) {
    var s = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function h(b) {
      var x = b && (s && b[s] || b[u]);
      if (typeof x == "function")
        return x;
    }
    var d = "<<anonymous>>", v = {
      array: S("array"),
      bigint: S("bigint"),
      bool: S("boolean"),
      func: S("function"),
      number: S("number"),
      object: S("object"),
      string: S("string"),
      symbol: S("symbol"),
      any: J(),
      arrayOf: z,
      element: C(),
      elementType: g(),
      instanceOf: ee,
      node: T(),
      objectOf: me,
      oneOf: oe,
      oneOfType: fe,
      shape: Q,
      exact: ae
    };
    function m(b, x) {
      return b === x ? b !== 0 || 1 / b === 1 / x : b !== b && x !== x;
    }
    function p(b, x) {
      this.message = b, this.data = x && typeof x == "object" ? x : {}, this.stack = "";
    }
    p.prototype = Error.prototype;
    function f(b) {
      if (process.env.NODE_ENV !== "production")
        var x = {}, $ = 0;
      function N(P, _, O, I, D, M, re) {
        if (I = I || d, M = M || O, re !== r) {
          if (c) {
            var w = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw w.name = "Invariant Violation", w;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ce = I + ":" + O;
            !x[ce] && // Avoid spamming the console because they are often not actionable except for lib authors
            $ < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + M + "` prop on `" + I + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), x[ce] = !0, $++);
          }
        }
        return _[O] == null ? P ? _[O] === null ? new p("The " + D + " `" + M + "` is marked as required " + ("in `" + I + "`, but its value is `null`.")) : new p("The " + D + " `" + M + "` is marked as required in " + ("`" + I + "`, but its value is `undefined`.")) : null : b(_, O, I, D, M);
      }
      var E = N.bind(null, !1);
      return E.isRequired = N.bind(null, !0), E;
    }
    function S(b) {
      function x($, N, E, P, _, O) {
        var I = $[N], D = ne(I);
        if (D !== b) {
          var M = be(I);
          return new p(
            "Invalid " + P + " `" + _ + "` of type " + ("`" + M + "` supplied to `" + E + "`, expected ") + ("`" + b + "`."),
            { expectedType: b }
          );
        }
        return null;
      }
      return f(x);
    }
    function J() {
      return f(i);
    }
    function z(b) {
      function x($, N, E, P, _) {
        if (typeof b != "function")
          return new p("Property `" + _ + "` of component `" + E + "` has invalid PropType notation inside arrayOf.");
        var O = $[N];
        if (!Array.isArray(O)) {
          var I = ne(O);
          return new p("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + E + "`, expected an array."));
        }
        for (var D = 0; D < O.length; D++) {
          var M = b(O, D, E, P, _ + "[" + D + "]", r);
          if (M instanceof Error)
            return M;
        }
        return null;
      }
      return f(x);
    }
    function C() {
      function b(x, $, N, E, P) {
        var _ = x[$];
        if (!l(_)) {
          var O = ne(_);
          return new p("Invalid " + E + " `" + P + "` of type " + ("`" + O + "` supplied to `" + N + "`, expected a single ReactElement."));
        }
        return null;
      }
      return f(b);
    }
    function g() {
      function b(x, $, N, E, P) {
        var _ = x[$];
        if (!e.isValidElementType(_)) {
          var O = ne(_);
          return new p("Invalid " + E + " `" + P + "` of type " + ("`" + O + "` supplied to `" + N + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return f(b);
    }
    function ee(b) {
      function x($, N, E, P, _) {
        if (!($[N] instanceof b)) {
          var O = b.name || d, I = $e($[N]);
          return new p("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + E + "`, expected ") + ("instance of `" + O + "`."));
        }
        return null;
      }
      return f(x);
    }
    function oe(b) {
      if (!Array.isArray(b))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function x($, N, E, P, _) {
        for (var O = $[N], I = 0; I < b.length; I++)
          if (m(O, b[I]))
            return null;
        var D = JSON.stringify(b, function(re, w) {
          var ce = be(w);
          return ce === "symbol" ? String(w) : w;
        });
        return new p("Invalid " + P + " `" + _ + "` of value `" + String(O) + "` " + ("supplied to `" + E + "`, expected one of " + D + "."));
      }
      return f(x);
    }
    function me(b) {
      function x($, N, E, P, _) {
        if (typeof b != "function")
          return new p("Property `" + _ + "` of component `" + E + "` has invalid PropType notation inside objectOf.");
        var O = $[N], I = ne(O);
        if (I !== "object")
          return new p("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + E + "`, expected an object."));
        for (var D in O)
          if (t(O, D)) {
            var M = b(O, D, E, P, _ + "." + D, r);
            if (M instanceof Error)
              return M;
          }
        return null;
      }
      return f(x);
    }
    function fe(b) {
      if (!Array.isArray(b))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var x = 0; x < b.length; x++) {
        var $ = b[x];
        if (typeof $ != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Te($) + " at index " + x + "."
          ), i;
      }
      function N(E, P, _, O, I) {
        for (var D = [], M = 0; M < b.length; M++) {
          var re = b[M], w = re(E, P, _, O, I, r);
          if (w == null)
            return null;
          w.data && t(w.data, "expectedType") && D.push(w.data.expectedType);
        }
        var ce = D.length > 0 ? ", expected one of type [" + D.join(", ") + "]" : "";
        return new p("Invalid " + O + " `" + I + "` supplied to " + ("`" + _ + "`" + ce + "."));
      }
      return f(N);
    }
    function T() {
      function b(x, $, N, E, P) {
        return U(x[$]) ? null : new p("Invalid " + E + " `" + P + "` supplied to " + ("`" + N + "`, expected a ReactNode."));
      }
      return f(b);
    }
    function W(b, x, $, N, E) {
      return new p(
        (b || "React class") + ": " + x + " type `" + $ + "." + N + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + E + "`."
      );
    }
    function Q(b) {
      function x($, N, E, P, _) {
        var O = $[N], I = ne(O);
        if (I !== "object")
          return new p("Invalid " + P + " `" + _ + "` of type `" + I + "` " + ("supplied to `" + E + "`, expected `object`."));
        for (var D in b) {
          var M = b[D];
          if (typeof M != "function")
            return W(E, P, _, D, be(M));
          var re = M(O, D, E, P, _ + "." + D, r);
          if (re)
            return re;
        }
        return null;
      }
      return f(x);
    }
    function ae(b) {
      function x($, N, E, P, _) {
        var O = $[N], I = ne(O);
        if (I !== "object")
          return new p("Invalid " + P + " `" + _ + "` of type `" + I + "` " + ("supplied to `" + E + "`, expected `object`."));
        var D = n({}, $[N], b);
        for (var M in D) {
          var re = b[M];
          if (t(b, M) && typeof re != "function")
            return W(E, P, _, M, be(re));
          if (!re)
            return new p(
              "Invalid " + P + " `" + _ + "` key `" + M + "` supplied to `" + E + "`.\nBad object: " + JSON.stringify($[N], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(b), null, "  ")
            );
          var w = re(O, M, E, P, _ + "." + M, r);
          if (w)
            return w;
        }
        return null;
      }
      return f(x);
    }
    function U(b) {
      switch (typeof b) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !b;
        case "object":
          if (Array.isArray(b))
            return b.every(U);
          if (b === null || l(b))
            return !0;
          var x = h(b);
          if (x) {
            var $ = x.call(b), N;
            if (x !== b.entries) {
              for (; !(N = $.next()).done; )
                if (!U(N.value))
                  return !1;
            } else
              for (; !(N = $.next()).done; ) {
                var E = N.value;
                if (E && !U(E[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function pe(b, x) {
      return b === "symbol" ? !0 : x ? x["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && x instanceof Symbol : !1;
    }
    function ne(b) {
      var x = typeof b;
      return Array.isArray(b) ? "array" : b instanceof RegExp ? "object" : pe(x, b) ? "symbol" : x;
    }
    function be(b) {
      if (typeof b > "u" || b === null)
        return "" + b;
      var x = ne(b);
      if (x === "object") {
        if (b instanceof Date)
          return "date";
        if (b instanceof RegExp)
          return "regexp";
      }
      return x;
    }
    function Te(b) {
      var x = be(b);
      switch (x) {
        case "array":
        case "object":
          return "an " + x;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + x;
        default:
          return x;
      }
    }
    function $e(b) {
      return !b.constructor || !b.constructor.name ? d : b.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, wn;
}
var xn, or;
function ao() {
  if (or)
    return xn;
  or = 1;
  var e = An();
  function n() {
  }
  function r() {
  }
  return r.resetWarningCache = n, xn = function() {
    function t(i, l, c, s, u, h) {
      if (h !== e) {
        var d = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw d.name = "Invariant Violation", d;
      }
    }
    t.isRequired = t;
    function o() {
      return t;
    }
    var a = {
      array: t,
      bigint: t,
      bool: t,
      func: t,
      number: t,
      object: t,
      string: t,
      symbol: t,
      any: t,
      arrayOf: o,
      element: t,
      elementType: t,
      instanceOf: o,
      node: t,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: r,
      resetWarningCache: n
    };
    return a.PropTypes = a, a;
  }, xn;
}
if (process.env.NODE_ENV !== "production") {
  var io = Dr(), so = !0;
  Cn.exports = oo()(io.isElement, so);
} else
  Cn.exports = ao()();
var co = Cn.exports;
const G = /* @__PURE__ */ Qt(co);
function Ve(e) {
  let n = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    n += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + n + " for the full message.";
}
var Tn = { exports: {} }, F = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ar;
function lo() {
  if (ar)
    return F;
  ar = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function p(f) {
    if (typeof f == "object" && f !== null) {
      var S = f.$$typeof;
      switch (S) {
        case e:
          switch (f = f.type, f) {
            case r:
            case o:
            case t:
            case s:
            case u:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case l:
                case i:
                case c:
                case d:
                case h:
                case a:
                  return f;
                default:
                  return S;
              }
          }
        case n:
          return S;
      }
    }
  }
  return F.ContextConsumer = i, F.ContextProvider = a, F.Element = e, F.ForwardRef = c, F.Fragment = r, F.Lazy = d, F.Memo = h, F.Portal = n, F.Profiler = o, F.StrictMode = t, F.Suspense = s, F.SuspenseList = u, F.isAsyncMode = function() {
    return !1;
  }, F.isConcurrentMode = function() {
    return !1;
  }, F.isContextConsumer = function(f) {
    return p(f) === i;
  }, F.isContextProvider = function(f) {
    return p(f) === a;
  }, F.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === e;
  }, F.isForwardRef = function(f) {
    return p(f) === c;
  }, F.isFragment = function(f) {
    return p(f) === r;
  }, F.isLazy = function(f) {
    return p(f) === d;
  }, F.isMemo = function(f) {
    return p(f) === h;
  }, F.isPortal = function(f) {
    return p(f) === n;
  }, F.isProfiler = function(f) {
    return p(f) === o;
  }, F.isStrictMode = function(f) {
    return p(f) === t;
  }, F.isSuspense = function(f) {
    return p(f) === s;
  }, F.isSuspenseList = function(f) {
    return p(f) === u;
  }, F.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === r || f === o || f === t || f === s || f === u || f === v || typeof f == "object" && f !== null && (f.$$typeof === d || f.$$typeof === h || f.$$typeof === a || f.$$typeof === i || f.$$typeof === c || f.$$typeof === m || f.getModuleId !== void 0);
  }, F.typeOf = p, F;
}
var L = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ir;
function uo() {
  return ir || (ir = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), m = !1, p = !1, f = !1, S = !1, J = !1, z;
    z = Symbol.for("react.module.reference");
    function C(k) {
      return !!(typeof k == "string" || typeof k == "function" || k === r || k === o || J || k === t || k === s || k === u || S || k === v || m || p || f || typeof k == "object" && k !== null && (k.$$typeof === d || k.$$typeof === h || k.$$typeof === a || k.$$typeof === i || k.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      k.$$typeof === z || k.getModuleId !== void 0));
    }
    function g(k) {
      if (typeof k == "object" && k !== null) {
        var Re = k.$$typeof;
        switch (Re) {
          case e:
            var Ye = k.type;
            switch (Ye) {
              case r:
              case o:
              case t:
              case s:
              case u:
                return Ye;
              default:
                var Fn = Ye && Ye.$$typeof;
                switch (Fn) {
                  case l:
                  case i:
                  case c:
                  case d:
                  case h:
                  case a:
                    return Fn;
                  default:
                    return Re;
                }
            }
          case n:
            return Re;
        }
      }
    }
    var ee = i, oe = a, me = e, fe = c, T = r, W = d, Q = h, ae = n, U = o, pe = t, ne = s, be = u, Te = !1, $e = !1;
    function b(k) {
      return Te || (Te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function x(k) {
      return $e || ($e = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function $(k) {
      return g(k) === i;
    }
    function N(k) {
      return g(k) === a;
    }
    function E(k) {
      return typeof k == "object" && k !== null && k.$$typeof === e;
    }
    function P(k) {
      return g(k) === c;
    }
    function _(k) {
      return g(k) === r;
    }
    function O(k) {
      return g(k) === d;
    }
    function I(k) {
      return g(k) === h;
    }
    function D(k) {
      return g(k) === n;
    }
    function M(k) {
      return g(k) === o;
    }
    function re(k) {
      return g(k) === t;
    }
    function w(k) {
      return g(k) === s;
    }
    function ce(k) {
      return g(k) === u;
    }
    L.ContextConsumer = ee, L.ContextProvider = oe, L.Element = me, L.ForwardRef = fe, L.Fragment = T, L.Lazy = W, L.Memo = Q, L.Portal = ae, L.Profiler = U, L.StrictMode = pe, L.Suspense = ne, L.SuspenseList = be, L.isAsyncMode = b, L.isConcurrentMode = x, L.isContextConsumer = $, L.isContextProvider = N, L.isElement = E, L.isForwardRef = P, L.isFragment = _, L.isLazy = O, L.isMemo = I, L.isPortal = D, L.isProfiler = M, L.isStrictMode = re, L.isSuspense = w, L.isSuspenseList = ce, L.isValidElementType = C, L.typeOf = g;
  }()), L;
}
process.env.NODE_ENV === "production" ? Tn.exports = lo() : Tn.exports = uo();
var sr = Tn.exports;
const fo = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function po(e) {
  const n = `${e}`.match(fo);
  return n && n[1] || "";
}
function Vr(e, n = "") {
  return e.displayName || e.name || po(e) || n;
}
function cr(e, n, r) {
  const t = Vr(n);
  return e.displayName || (t !== "" ? `${r}(${t})` : r);
}
function ho(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Vr(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case sr.ForwardRef:
          return cr(e, e.render, "ForwardRef");
        case sr.Memo:
          return cr(e, e.type, "memo");
        default:
          return;
      }
  }
}
function ge(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ve(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Fr(e, n) {
  const r = B({}, n);
  return Object.keys(e).forEach((t) => {
    if (t.toString().match(/^(components|slots)$/))
      r[t] = B({}, e[t], r[t]);
    else if (t.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[t] || {}, a = n[t];
      r[t] = {}, !a || !Object.keys(a) ? r[t] = o : !o || !Object.keys(o) ? r[t] = a : (r[t] = B({}, a), Object.keys(o).forEach((i) => {
        r[t][i] = Fr(o[i], a[i]);
      }));
    } else
      r[t] === void 0 && (r[t] = e[t]);
  }), r;
}
function mo(e, n, r = void 0) {
  const t = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      t[o] = e[o].reduce((a, i) => {
        if (i) {
          const l = n(i);
          l !== "" && a.push(l), r && r[i] && a.push(r[i]);
        }
        return a;
      }, []).join(" ");
    }
  ), t;
}
const lr = (e) => e, go = () => {
  let e = lr;
  return {
    configure(n) {
      e = n;
    },
    generate(n) {
      return e(n);
    },
    reset() {
      e = lr;
    }
  };
}, bo = go(), yo = bo, vo = {
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
function Pn(e, n, r = "Mui") {
  const t = vo[n];
  return t ? `${r}-${t}` : `${yo.generate(e)}-${n}`;
}
function wo(e, n, r = "Mui") {
  const t = {};
  return n.forEach((o) => {
    t[o] = Pn(e, o, r);
  }), t;
}
function xo(e, n = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(n, Math.min(e, r));
}
function xe(e, n) {
  if (e == null)
    return {};
  var r = {}, t = Object.keys(e), o, a;
  for (a = 0; a < t.length; a++)
    o = t[a], !(n.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const ko = ["values", "unit", "step"], So = (e) => {
  const n = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return n.sort((r, t) => r.val - t.val), n.reduce((r, t) => B({}, r, {
    [t.key]: t.val
  }), {});
};
function Eo(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: n = {
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
    step: t = 5
  } = e, o = xe(e, ko), a = So(n), i = Object.keys(a);
  function l(d) {
    return `@media (min-width:${typeof n[d] == "number" ? n[d] : d}${r})`;
  }
  function c(d) {
    return `@media (max-width:${(typeof n[d] == "number" ? n[d] : d) - t / 100}${r})`;
  }
  function s(d, v) {
    const m = i.indexOf(v);
    return `@media (min-width:${typeof n[d] == "number" ? n[d] : d}${r}) and (max-width:${(m !== -1 && typeof n[i[m]] == "number" ? n[i[m]] : v) - t / 100}${r})`;
  }
  function u(d) {
    return i.indexOf(d) + 1 < i.length ? s(d, i[i.indexOf(d) + 1]) : l(d);
  }
  function h(d) {
    const v = i.indexOf(d);
    return v === 0 ? l(i[1]) : v === i.length - 1 ? c(i[v]) : s(d, i[i.indexOf(d) + 1]).replace("@media", "@media not all and");
  }
  return B({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: s,
    only: u,
    not: h,
    unit: r
  }, o);
}
const Co = {
  borderRadius: 4
}, To = Co, _o = process.env.NODE_ENV !== "production" ? G.oneOfType([G.number, G.string, G.object, G.array]) : {}, Ce = _o;
function He(e, n) {
  return n ? he(e, n, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const In = {
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
}, ur = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${In[e]}px)`
};
function ve(e, n, r) {
  const t = e.theme || {};
  if (Array.isArray(n)) {
    const a = t.breakpoints || ur;
    return n.reduce((i, l, c) => (i[a.up(a.keys[c])] = r(n[c]), i), {});
  }
  if (typeof n == "object") {
    const a = t.breakpoints || ur;
    return Object.keys(n).reduce((i, l) => {
      if (Object.keys(a.values || In).indexOf(l) !== -1) {
        const c = a.up(l);
        i[c] = r(n[l], l);
      } else {
        const c = l;
        i[c] = n[c];
      }
      return i;
    }, {});
  }
  return r(n);
}
function No(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((t, o) => {
    const a = e.up(o);
    return t[a] = {}, t;
  }, {})) || {};
}
function Oo(e, n) {
  return e.reduce((r, t) => {
    const o = r[t];
    return (!o || Object.keys(o).length === 0) && delete r[t], r;
  }, n);
}
function an(e, n, r = !0) {
  if (!n || typeof n != "string")
    return null;
  if (e && e.vars && r) {
    const t = `vars.${n}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (t != null)
      return t;
  }
  return n.split(".").reduce((t, o) => t && t[o] != null ? t[o] : null, e);
}
function nn(e, n, r, t = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || t : o = an(e, r) || t, n && (o = n(o, t, e)), o;
}
function K(e) {
  const {
    prop: n,
    cssProperty: r = e.prop,
    themeKey: t,
    transform: o
  } = e, a = (i) => {
    if (i[n] == null)
      return null;
    const l = i[n], c = i.theme, s = an(c, t) || {};
    return ve(i, l, (h) => {
      let d = nn(s, o, h);
      return h === d && typeof h == "string" && (d = nn(s, o, `${n}${h === "default" ? "" : ge(h)}`, h)), r === !1 ? d : {
        [r]: d
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [n]: Ce
  } : {}, a.filterProps = [n], a;
}
function $o(e) {
  const n = {};
  return (r) => (n[r] === void 0 && (n[r] = e(r)), n[r]);
}
const Ro = {
  m: "margin",
  p: "padding"
}, Ao = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, dr = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Po = $o((e) => {
  if (e.length > 2)
    if (dr[e])
      e = dr[e];
    else
      return [e];
  const [n, r] = e.split(""), t = Ro[n], o = Ao[r] || "";
  return Array.isArray(o) ? o.map((a) => t + a) : [t + o];
}), sn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], cn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Io = [...sn, ...cn];
function qe(e, n, r, t) {
  var o;
  const a = (o = an(e, n, !1)) != null ? o : r;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${t} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${n}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Lr(e) {
  return qe(e, "spacing", 8, "spacing");
}
function Xe(e, n) {
  if (typeof n == "string" || n == null)
    return n;
  const r = Math.abs(n), t = e(r);
  return n >= 0 ? t : typeof t == "number" ? -t : `-${t}`;
}
function Mo(e, n) {
  return (r) => e.reduce((t, o) => (t[o] = Xe(n, r), t), {});
}
function Bo(e, n, r, t) {
  if (n.indexOf(r) === -1)
    return null;
  const o = Po(r), a = Mo(o, t), i = e[r];
  return ve(e, i, a);
}
function Ur(e, n) {
  const r = Lr(e.theme);
  return Object.keys(e).map((t) => Bo(e, n, t, r)).reduce(He, {});
}
function q(e) {
  return Ur(e, sn);
}
q.propTypes = process.env.NODE_ENV !== "production" ? sn.reduce((e, n) => (e[n] = Ce, e), {}) : {};
q.filterProps = sn;
function X(e) {
  return Ur(e, cn);
}
X.propTypes = process.env.NODE_ENV !== "production" ? cn.reduce((e, n) => (e[n] = Ce, e), {}) : {};
X.filterProps = cn;
process.env.NODE_ENV !== "production" && Io.reduce((e, n) => (e[n] = Ce, e), {});
function zo(e = 8) {
  if (e.mui)
    return e;
  const n = Lr({
    spacing: e
  }), r = (...t) => (process.env.NODE_ENV !== "production" && (t.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)), (t.length === 0 ? [1] : t).map((a) => {
    const i = n(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return r.mui = !0, r;
}
function ln(...e) {
  const n = e.reduce((t, o) => (o.filterProps.forEach((a) => {
    t[a] = o;
  }), t), {}), r = (t) => Object.keys(t).reduce((o, a) => n[a] ? He(o, n[a](t)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((t, o) => Object.assign(t, o.propTypes), {}) : {}, r.filterProps = e.reduce((t, o) => t.concat(o.filterProps), []), r;
}
function ue(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function de(e, n) {
  return K({
    prop: e,
    themeKey: "borders",
    transform: n
  });
}
const Do = de("border", ue), jo = de("borderTop", ue), Vo = de("borderRight", ue), Fo = de("borderBottom", ue), Lo = de("borderLeft", ue), Uo = de("borderColor"), Go = de("borderTopColor"), Ho = de("borderRightColor"), Wo = de("borderBottomColor"), qo = de("borderLeftColor"), Xo = de("outline", ue), Yo = de("outlineColor"), un = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const n = qe(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (t) => ({
      borderRadius: Xe(n, t)
    });
    return ve(e, e.borderRadius, r);
  }
  return null;
};
un.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Ce
} : {};
un.filterProps = ["borderRadius"];
ln(Do, jo, Vo, Fo, Lo, Uo, Go, Ho, Wo, qo, un, Xo, Yo);
const dn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const n = qe(e.theme, "spacing", 8, "gap"), r = (t) => ({
      gap: Xe(n, t)
    });
    return ve(e, e.gap, r);
  }
  return null;
};
dn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: Ce
} : {};
dn.filterProps = ["gap"];
const fn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const n = qe(e.theme, "spacing", 8, "columnGap"), r = (t) => ({
      columnGap: Xe(n, t)
    });
    return ve(e, e.columnGap, r);
  }
  return null;
};
fn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: Ce
} : {};
fn.filterProps = ["columnGap"];
const pn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const n = qe(e.theme, "spacing", 8, "rowGap"), r = (t) => ({
      rowGap: Xe(n, t)
    });
    return ve(e, e.rowGap, r);
  }
  return null;
};
pn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: Ce
} : {};
pn.filterProps = ["rowGap"];
const Ko = K({
  prop: "gridColumn"
}), Jo = K({
  prop: "gridRow"
}), Zo = K({
  prop: "gridAutoFlow"
}), Qo = K({
  prop: "gridAutoColumns"
}), ea = K({
  prop: "gridAutoRows"
}), na = K({
  prop: "gridTemplateColumns"
}), ra = K({
  prop: "gridTemplateRows"
}), ta = K({
  prop: "gridTemplateAreas"
}), oa = K({
  prop: "gridArea"
});
ln(dn, fn, pn, Ko, Jo, Zo, Qo, ea, na, ra, ta, oa);
function je(e, n) {
  return n === "grey" ? n : e;
}
const aa = K({
  prop: "color",
  themeKey: "palette",
  transform: je
}), ia = K({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: je
}), sa = K({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: je
});
ln(aa, ia, sa);
function se(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const ca = K({
  prop: "width",
  transform: se
}), Mn = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const n = (r) => {
      var t, o;
      const a = ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null ? void 0 : t[r]) || In[r];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: se(r)
      };
    };
    return ve(e, e.maxWidth, n);
  }
  return null;
};
Mn.filterProps = ["maxWidth"];
const la = K({
  prop: "minWidth",
  transform: se
}), ua = K({
  prop: "height",
  transform: se
}), da = K({
  prop: "maxHeight",
  transform: se
}), fa = K({
  prop: "minHeight",
  transform: se
});
K({
  prop: "size",
  cssProperty: "width",
  transform: se
});
K({
  prop: "size",
  cssProperty: "height",
  transform: se
});
const pa = K({
  prop: "boxSizing"
});
ln(ca, Mn, la, ua, da, fa, pa);
const ha = {
  // borders
  border: {
    themeKey: "borders",
    transform: ue
  },
  borderTop: {
    themeKey: "borders",
    transform: ue
  },
  borderRight: {
    themeKey: "borders",
    transform: ue
  },
  borderBottom: {
    themeKey: "borders",
    transform: ue
  },
  borderLeft: {
    themeKey: "borders",
    transform: ue
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
    transform: ue
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: un
  },
  // palette
  color: {
    themeKey: "palette",
    transform: je
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: je
  },
  backgroundColor: {
    themeKey: "palette",
    transform: je
  },
  // spacing
  p: {
    style: X
  },
  pt: {
    style: X
  },
  pr: {
    style: X
  },
  pb: {
    style: X
  },
  pl: {
    style: X
  },
  px: {
    style: X
  },
  py: {
    style: X
  },
  padding: {
    style: X
  },
  paddingTop: {
    style: X
  },
  paddingRight: {
    style: X
  },
  paddingBottom: {
    style: X
  },
  paddingLeft: {
    style: X
  },
  paddingX: {
    style: X
  },
  paddingY: {
    style: X
  },
  paddingInline: {
    style: X
  },
  paddingInlineStart: {
    style: X
  },
  paddingInlineEnd: {
    style: X
  },
  paddingBlock: {
    style: X
  },
  paddingBlockStart: {
    style: X
  },
  paddingBlockEnd: {
    style: X
  },
  m: {
    style: q
  },
  mt: {
    style: q
  },
  mr: {
    style: q
  },
  mb: {
    style: q
  },
  ml: {
    style: q
  },
  mx: {
    style: q
  },
  my: {
    style: q
  },
  margin: {
    style: q
  },
  marginTop: {
    style: q
  },
  marginRight: {
    style: q
  },
  marginBottom: {
    style: q
  },
  marginLeft: {
    style: q
  },
  marginX: {
    style: q
  },
  marginY: {
    style: q
  },
  marginInline: {
    style: q
  },
  marginInlineStart: {
    style: q
  },
  marginInlineEnd: {
    style: q
  },
  marginBlock: {
    style: q
  },
  marginBlockStart: {
    style: q
  },
  marginBlockEnd: {
    style: q
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
    style: dn
  },
  rowGap: {
    style: pn
  },
  columnGap: {
    style: fn
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
    transform: se
  },
  maxWidth: {
    style: Mn
  },
  minWidth: {
    transform: se
  },
  height: {
    transform: se
  },
  maxHeight: {
    transform: se
  },
  minHeight: {
    transform: se
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
}, Bn = ha;
function ma(...e) {
  const n = e.reduce((t, o) => t.concat(Object.keys(o)), []), r = new Set(n);
  return e.every((t) => r.size === Object.keys(t).length);
}
function ga(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function ba() {
  function e(r, t, o, a) {
    const i = {
      [r]: t,
      theme: o
    }, l = a[r];
    if (!l)
      return {
        [r]: t
      };
    const {
      cssProperty: c = r,
      themeKey: s,
      transform: u,
      style: h
    } = l;
    if (t == null)
      return null;
    if (s === "typography" && t === "inherit")
      return {
        [r]: t
      };
    const d = an(o, s) || {};
    return h ? h(i) : ve(i, t, (m) => {
      let p = nn(d, u, m);
      return m === p && typeof m == "string" && (p = nn(d, u, `${r}${m === "default" ? "" : ge(m)}`, m)), c === !1 ? p : {
        [c]: p
      };
    });
  }
  function n(r) {
    var t;
    const {
      sx: o,
      theme: a = {}
    } = r || {};
    if (!o)
      return null;
    const i = (t = a.unstable_sxConfig) != null ? t : Bn;
    function l(c) {
      let s = c;
      if (typeof c == "function")
        s = c(a);
      else if (typeof c != "object")
        return c;
      if (!s)
        return null;
      const u = No(a.breakpoints), h = Object.keys(u);
      let d = u;
      return Object.keys(s).forEach((v) => {
        const m = ga(s[v], a);
        if (m != null)
          if (typeof m == "object")
            if (i[v])
              d = He(d, e(v, m, a, i));
            else {
              const p = ve({
                theme: a
              }, m, (f) => ({
                [v]: f
              }));
              ma(p, m) ? d[v] = n({
                sx: m,
                theme: a
              }) : d = He(d, p);
            }
          else
            d = He(d, e(v, m, a, i));
      }), Oo(h, d);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return n;
}
const Gr = ba();
Gr.filterProps = ["sx"];
const zn = Gr, ya = ["breakpoints", "palette", "spacing", "shape"];
function Dn(e = {}, ...n) {
  const {
    breakpoints: r = {},
    palette: t = {},
    spacing: o,
    shape: a = {}
  } = e, i = xe(e, ya), l = Eo(r), c = zo(o);
  let s = he({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: B({
      mode: "light"
    }, t),
    spacing: c,
    shape: B({}, To, a)
  }, i);
  return s = n.reduce((u, h) => he(u, h), s), s.unstable_sxConfig = B({}, Bn, i == null ? void 0 : i.unstable_sxConfig), s.unstable_sx = function(h) {
    return zn({
      sx: h,
      theme: this
    });
  }, s;
}
function va(e) {
  return Object.keys(e).length === 0;
}
function wa(e = null) {
  const n = ie.useContext(St);
  return !n || va(n) ? e : n;
}
const xa = Dn();
function ka(e = xa) {
  return wa(e);
}
const Sa = ["variant"];
function fr(e) {
  return e.length === 0;
}
function Hr(e) {
  const {
    variant: n
  } = e, r = xe(e, Sa);
  let t = n || "";
  return Object.keys(r).sort().forEach((o) => {
    o === "color" ? t += fr(t) ? e[o] : ge(e[o]) : t += `${fr(t) ? o : ge(o)}${ge(e[o].toString())}`;
  }), t;
}
const Ea = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Ca(e) {
  return Object.keys(e).length === 0;
}
function Ta(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const _a = (e, n) => n.components && n.components[e] && n.components[e].styleOverrides ? n.components[e].styleOverrides : null, rn = (e) => {
  let n = 0;
  const r = {};
  return e && e.forEach((t) => {
    let o = "";
    typeof t.props == "function" ? (o = `callback${n}`, n += 1) : o = Hr(t.props), r[o] = t.style;
  }), r;
}, Na = (e, n) => {
  let r = [];
  return n && n.components && n.components[e] && n.components[e].variants && (r = n.components[e].variants), rn(r);
}, tn = (e, n, r) => {
  const {
    ownerState: t = {}
  } = e, o = [];
  let a = 0;
  return r && r.forEach((i) => {
    let l = !0;
    if (typeof i.props == "function") {
      const c = B({}, e, t);
      l = i.props(c);
    } else
      Object.keys(i.props).forEach((c) => {
        t[c] !== i.props[c] && e[c] !== i.props[c] && (l = !1);
      });
    l && (typeof i.props == "function" ? o.push(n[`callback${a}`]) : o.push(n[Hr(i.props)])), typeof i.props == "function" && (a += 1);
  }), o;
}, Oa = (e, n, r, t) => {
  var o;
  const a = r == null || (o = r.components) == null || (o = o[t]) == null ? void 0 : o.variants;
  return tn(e, n, a);
};
function Je(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const $a = Dn(), pr = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Ze({
  defaultTheme: e,
  theme: n,
  themeId: r
}) {
  return Ca(n) ? e : n[r] || n;
}
function Ra(e) {
  return e ? (n, r) => r[e] : null;
}
const hr = ({
  styledArg: e,
  props: n,
  defaultTheme: r,
  themeId: t
}) => {
  const o = e(B({}, n, {
    theme: Ze(B({}, n, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  let a;
  if (o && o.variants && (a = o.variants, delete o.variants), a) {
    const i = tn(n, rn(a), a);
    return [o, ...i];
  }
  return o;
};
function Aa(e = {}) {
  const {
    themeId: n,
    defaultTheme: r = $a,
    rootShouldForwardProp: t = Je,
    slotShouldForwardProp: o = Je
  } = e, a = (i) => zn(B({}, i, {
    theme: Ze(B({}, i, {
      defaultTheme: r,
      themeId: n
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    Et(i, (C) => C.filter((g) => !(g != null && g.__mui_systemSx)));
    const {
      name: c,
      slot: s,
      skipVariantsResolver: u,
      skipSx: h,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = Ra(pr(s))
    } = l, v = xe(l, Ea), m = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      s && s !== "Root" && s !== "root" || !1
    ), p = h || !1;
    let f;
    process.env.NODE_ENV !== "production" && c && (f = `${c}-${pr(s || "Root")}`);
    let S = Je;
    s === "Root" || s === "root" ? S = t : s ? S = o : Ta(i) && (S = void 0);
    const J = kt(i, B({
      shouldForwardProp: S,
      label: f
    }, v)), z = (C, ...g) => {
      const ee = g ? g.map((T) => {
        if (typeof T == "function" && T.__emotion_real !== T)
          return (W) => hr({
            styledArg: T,
            props: W,
            defaultTheme: r,
            themeId: n
          });
        if (Se(T)) {
          let W = T, Q;
          return T && T.variants && (Q = T.variants, delete W.variants, W = (ae) => {
            let U = T;
            return tn(ae, rn(Q), Q).forEach((ne) => {
              U = he(U, ne);
            }), U;
          }), W;
        }
        return T;
      }) : [];
      let oe = C;
      if (Se(C)) {
        let T;
        C && C.variants && (T = C.variants, delete oe.variants, oe = (W) => {
          let Q = C;
          return tn(W, rn(T), T).forEach((U) => {
            Q = he(Q, U);
          }), Q;
        });
      } else
        typeof C == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        C.__emotion_real !== C && (oe = (T) => hr({
          styledArg: C,
          props: T,
          defaultTheme: r,
          themeId: n
        }));
      c && d && ee.push((T) => {
        const W = Ze(B({}, T, {
          defaultTheme: r,
          themeId: n
        })), Q = _a(c, W);
        if (Q) {
          const ae = {};
          return Object.entries(Q).forEach(([U, pe]) => {
            ae[U] = typeof pe == "function" ? pe(B({}, T, {
              theme: W
            })) : pe;
          }), d(T, ae);
        }
        return null;
      }), c && !m && ee.push((T) => {
        const W = Ze(B({}, T, {
          defaultTheme: r,
          themeId: n
        }));
        return Oa(T, Na(c, W), W, c);
      }), p || ee.push(a);
      const me = ee.length - g.length;
      if (Array.isArray(C) && me > 0) {
        const T = new Array(me).fill("");
        oe = [...C, ...T], oe.raw = [...C.raw, ...T];
      }
      const fe = J(oe, ...ee);
      if (process.env.NODE_ENV !== "production") {
        let T;
        c && (T = `${c}${ge(s || "")}`), T === void 0 && (T = `Styled(${ho(i)})`), fe.displayName = T;
      }
      return i.muiName && (fe.muiName = i.muiName), fe;
    };
    return J.withConfig && (z.withConfig = J.withConfig), z;
  };
}
function Pa(e) {
  const {
    theme: n,
    name: r,
    props: t
  } = e;
  return !n || !n.components || !n.components[r] || !n.components[r].defaultProps ? t : Fr(n.components[r].defaultProps, t);
}
function Ia({
  props: e,
  name: n,
  defaultTheme: r,
  themeId: t
}) {
  let o = ka(r);
  return t && (o = o[t] || o), Pa({
    theme: o,
    name: n,
    props: e
  });
}
function Wr(e, n = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < n || e > r) && console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`), xo(e, n, r);
}
function Ma(e) {
  e = e.slice(1);
  const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(n);
  return r && r[0].length === 1 && (r = r.map((t) => t + t)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((t, o) => o < 3 ? parseInt(t, 16) : Math.round(parseInt(t, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Fe(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Fe(Ma(e));
  const n = e.indexOf("("), r = e.substring(0, n);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Ve(9, e));
  let t = e.substring(n + 1, e.length - 1), o;
  if (r === "color") {
    if (t = t.split(" "), o = t.shift(), t.length === 4 && t[3].charAt(0) === "/" && (t[3] = t[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Ve(10, o));
  } else
    t = t.split(",");
  return t = t.map((a) => parseFloat(a)), {
    type: r,
    values: t,
    colorSpace: o
  };
}
function jn(e) {
  const {
    type: n,
    colorSpace: r
  } = e;
  let {
    values: t
  } = e;
  return n.indexOf("rgb") !== -1 ? t = t.map((o, a) => a < 3 ? parseInt(o, 10) : o) : n.indexOf("hsl") !== -1 && (t[1] = `${t[1]}%`, t[2] = `${t[2]}%`), n.indexOf("color") !== -1 ? t = `${r} ${t.join(" ")}` : t = `${t.join(", ")}`, `${n}(${t})`;
}
function Ba(e) {
  e = Fe(e);
  const {
    values: n
  } = e, r = n[0], t = n[1] / 100, o = n[2] / 100, a = t * Math.min(o, 1 - o), i = (s, u = (s + r / 30) % 12) => o - a * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(n[3])), jn({
    type: l,
    values: c
  });
}
function mr(e) {
  e = Fe(e);
  let n = e.type === "hsl" || e.type === "hsla" ? Fe(Ba(e)).values : e.values;
  return n = n.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3));
}
function gr(e, n) {
  const r = mr(e), t = mr(n);
  return (Math.max(r, t) + 0.05) / (Math.min(r, t) + 0.05);
}
function za(e, n) {
  if (e = Fe(e), n = Wr(n), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - n;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - n;
  return jn(e);
}
function Da(e, n) {
  if (e = Fe(e), n = Wr(n), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * n;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * n;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * n;
  return jn(e);
}
function ja(e, n) {
  return B({
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
  }, n);
}
const Va = {
  black: "#000",
  white: "#fff"
}, We = Va, Fa = {
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
}, La = Fa, Ua = {
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
}, Pe = Ua, Ga = {
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
}, Ie = Ga, Ha = {
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
}, Ge = Ha, Wa = {
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
}, Me = Wa, qa = {
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
}, Be = qa, Xa = {
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
}, ze = Xa, Ya = ["mode", "contrastThreshold", "tonalOffset"], br = {
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
    paper: We.white,
    default: We.white
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
}, kn = {
  text: {
    primary: We.white,
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
    active: We.white,
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
function yr(e, n, r, t) {
  const o = t.light || t, a = t.dark || t * 1.5;
  e[n] || (e.hasOwnProperty(r) ? e[n] = e[r] : n === "light" ? e.light = Da(e.main, o) : n === "dark" && (e.dark = za(e.main, a)));
}
function Ka(e = "light") {
  return e === "dark" ? {
    main: Me[200],
    light: Me[50],
    dark: Me[400]
  } : {
    main: Me[700],
    light: Me[400],
    dark: Me[800]
  };
}
function Ja(e = "light") {
  return e === "dark" ? {
    main: Pe[200],
    light: Pe[50],
    dark: Pe[400]
  } : {
    main: Pe[500],
    light: Pe[300],
    dark: Pe[700]
  };
}
function Za(e = "light") {
  return e === "dark" ? {
    main: Ie[500],
    light: Ie[300],
    dark: Ie[700]
  } : {
    main: Ie[700],
    light: Ie[400],
    dark: Ie[800]
  };
}
function Qa(e = "light") {
  return e === "dark" ? {
    main: Be[400],
    light: Be[300],
    dark: Be[700]
  } : {
    main: Be[700],
    light: Be[500],
    dark: Be[900]
  };
}
function ei(e = "light") {
  return e === "dark" ? {
    main: ze[400],
    light: ze[300],
    dark: ze[700]
  } : {
    main: ze[800],
    light: ze[500],
    dark: ze[900]
  };
}
function ni(e = "light") {
  return e === "dark" ? {
    main: Ge[400],
    light: Ge[300],
    dark: Ge[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Ge[500],
    dark: Ge[900]
  };
}
function ri(e) {
  const {
    mode: n = "light",
    contrastThreshold: r = 3,
    tonalOffset: t = 0.2
  } = e, o = xe(e, Ya), a = e.primary || Ka(n), i = e.secondary || Ja(n), l = e.error || Za(n), c = e.info || Qa(n), s = e.success || ei(n), u = e.warning || ni(n);
  function h(p) {
    const f = gr(p, kn.text.primary) >= r ? kn.text.primary : br.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const S = gr(p, f);
      S < 3 && console.error([`MUI: The contrast ratio of ${S}:1 for ${f} on ${p}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return f;
  }
  const d = ({
    color: p,
    name: f,
    mainShade: S = 500,
    lightShade: J = 300,
    darkShade: z = 700
  }) => {
    if (p = B({}, p), !p.main && p[S] && (p.main = p[S]), !p.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${f ? ` (${f})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.` : Ve(11, f ? ` (${f})` : "", S));
    if (typeof p.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${f ? ` (${f})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(p.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Ve(12, f ? ` (${f})` : "", JSON.stringify(p.main)));
    return yr(p, "light", J, t), yr(p, "dark", z, t), p.contrastText || (p.contrastText = h(p.main)), p;
  }, v = {
    dark: kn,
    light: br
  };
  return process.env.NODE_ENV !== "production" && (v[n] || console.error(`MUI: The palette mode \`${n}\` is not supported.`)), he(B({
    // A collection of common colors.
    common: B({}, We),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: n,
    // The colors used to represent primary interface elements for a user.
    primary: d({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: d({
      color: i,
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
      color: s,
      name: "success"
    }),
    // The grey colors.
    grey: La,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: h,
    // Generate a rich color object.
    augmentColor: d,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: t
  }, v[n]), o);
}
const ti = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function oi(e) {
  return Math.round(e * 1e5) / 1e5;
}
const vr = {
  textTransform: "uppercase"
}, wr = '"Roboto", "Helvetica", "Arial", sans-serif';
function ai(e, n) {
  const r = typeof n == "function" ? n(e) : n, {
    fontFamily: t = wr,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: s = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: h
  } = r, d = xe(r, ti);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof s != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const v = o / 14, m = h || ((S) => `${S / s * v}rem`), p = (S, J, z, C, g) => B({
    fontFamily: t,
    fontWeight: S,
    fontSize: m(J),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: z
  }, t === wr ? {
    letterSpacing: `${oi(C / J)}em`
  } : {}, g, u), f = {
    h1: p(a, 96, 1.167, -1.5),
    h2: p(a, 60, 1.2, -0.5),
    h3: p(i, 48, 1.167, 0),
    h4: p(i, 34, 1.235, 0.25),
    h5: p(i, 24, 1.334, 0),
    h6: p(l, 20, 1.6, 0.15),
    subtitle1: p(i, 16, 1.75, 0.15),
    subtitle2: p(l, 14, 1.57, 0.1),
    body1: p(i, 16, 1.5, 0.15),
    body2: p(i, 14, 1.43, 0.15),
    button: p(l, 14, 1.75, 0.4, vr),
    caption: p(i, 12, 1.66, 0.4),
    overline: p(i, 12, 2.66, 1, vr),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return he(B({
    htmlFontSize: s,
    pxToRem: m,
    fontFamily: t,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: l,
    fontWeightBold: c
  }, f), d, {
    clone: !1
    // No need to clone deep
  });
}
const ii = 0.2, si = 0.14, ci = 0.12;
function H(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${ii})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${si})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${ci})`].join(",");
}
const li = ["none", H(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), H(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), H(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), H(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), H(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), H(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), H(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), H(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), H(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), H(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), H(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), H(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), H(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), H(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), H(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), H(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), H(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), H(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), H(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), H(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), H(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), H(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), H(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), H(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], ui = li, di = ["duration", "easing", "delay"], fi = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, pi = {
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
function xr(e) {
  return `${Math.round(e)}ms`;
}
function hi(e) {
  if (!e)
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function mi(e) {
  const n = B({}, fi, e.easing), r = B({}, pi, e.duration);
  return B({
    getAutoHeightDuration: hi,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: l = n.easeInOut,
        delay: c = 0
      } = a, s = xe(a, di);
      if (process.env.NODE_ENV !== "production") {
        const u = (d) => typeof d == "string", h = (d) => !isNaN(parseFloat(d));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !h(i) && !u(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !h(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(s).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(s).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof i == "string" ? i : xr(i)} ${l} ${typeof c == "string" ? c : xr(c)}`).join(",");
    }
  }, e, {
    easing: n,
    duration: r
  });
}
const gi = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, bi = gi, yi = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function vi(e = {}, ...n) {
  const {
    mixins: r = {},
    palette: t = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = xe(e, yi);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ve(18));
  const l = ri(t), c = Dn(e);
  let s = he(c, {
    mixins: ja(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ui.slice(),
    typography: ai(l, a),
    transitions: mi(o),
    zIndex: B({}, bi),
    applyDarkStyles(u) {
      return this.vars ? {
        [this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/, ":where($1)")]: u
      } : this.palette.mode === "dark" ? u : {};
    }
  });
  if (s = he(s, i), s = n.reduce((u, h) => he(u, h), s), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], h = (d, v) => {
      let m;
      for (m in d) {
        const p = d[m];
        if (u.indexOf(m) !== -1 && Object.keys(p).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const f = Pn("", m);
            console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${m}\` internal state.`, "You can not override it like this: ", JSON.stringify(d, null, 2), "", `Instead, you need to use the '&.${f}' syntax:`, JSON.stringify({
              root: {
                [`&.${f}`]: p
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          d[m] = {};
        }
      }
    };
    Object.keys(s.components).forEach((d) => {
      const v = s.components[d].styleOverrides;
      v && d.indexOf("Mui") === 0 && h(v, d);
    });
  }
  return s.unstable_sxConfig = B({}, Bn, i == null ? void 0 : i.unstable_sxConfig), s.unstable_sx = function(h) {
    return zn({
      sx: h,
      theme: this
    });
  }, s;
}
const wi = vi(), qr = wi, Xr = "$$material";
function xi({
  props: e,
  name: n
}) {
  return Ia({
    props: e,
    name: n,
    defaultTheme: qr,
    themeId: Xr
  });
}
const ki = (e) => Je(e) && e !== "classes", Si = Aa({
  themeId: Xr,
  defaultTheme: qr,
  rootShouldForwardProp: ki
}), Ei = Si;
function Ci(e) {
  return Pn("MuiSvgIcon", e);
}
wo("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Ti = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], _i = (e) => {
  const {
    color: n,
    fontSize: r,
    classes: t
  } = e, o = {
    root: ["root", n !== "inherit" && `color${ge(n)}`, `fontSize${ge(r)}`]
  };
  return mo(o, Ci, t);
}, Ni = Ei("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: r
    } = e;
    return [n.root, r.color !== "inherit" && n[`color${ge(r.color)}`], n[`fontSize${ge(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var r, t, o, a, i, l, c, s, u, h, d, v, m;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: n.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (r = e.transitions) == null || (t = r.create) == null ? void 0 : t.call(r, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((a = e.typography) == null || (i = a.pxToRem) == null ? void 0 : i.call(a, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((s = e.typography) == null || (u = s.pxToRem) == null ? void 0 : u.call(s, 35)) || "2.1875rem"
    }[n.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (h = (d = (e.vars || e).palette) == null || (d = d[n.color]) == null ? void 0 : d.main) != null ? h : {
      action: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.active,
      disabled: (m = (e.vars || e).palette) == null || (m = m.action) == null ? void 0 : m.disabled,
      inherit: void 0
    }[n.color]
  };
}), Vn = /* @__PURE__ */ ie.forwardRef(function(n, r) {
  const t = xi({
    props: n,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: s,
    inheritViewBox: u = !1,
    titleAccess: h,
    viewBox: d = "0 0 24 24"
  } = t, v = xe(t, Ti), m = /* @__PURE__ */ ie.isValidElement(o) && o.type === "svg", p = B({}, t, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: n.fontSize,
    inheritViewBox: u,
    viewBox: d,
    hasSvgAsChild: m
  }), f = {};
  u || (f.viewBox = d);
  const S = _i(p);
  return /* @__PURE__ */ te(Ni, B({
    as: l,
    className: at(S.root, a),
    focusable: "false",
    color: s,
    "aria-hidden": h ? void 0 : !0,
    role: h ? "img" : void 0,
    ref: r
  }, f, v, m && o.props, {
    ownerState: p,
    children: [m ? o.props.children : o, h ? /* @__PURE__ */ y("title", {
      children: h
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Vn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: G.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: G.object,
  /**
   * @ignore
   */
  className: G.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: G.oneOfType([G.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), G.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: G.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: G.oneOfType([G.oneOf(["inherit", "large", "medium", "small"]), G.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: G.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: G.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: G.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: G.oneOfType([G.arrayOf(G.oneOfType([G.func, G.object, G.bool])), G.func, G.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: G.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: G.string
});
Vn.muiName = "SvgIcon";
const kr = Vn;
function Oi(e, n) {
  function r(t, o) {
    return /* @__PURE__ */ y(kr, B({
      "data-testid": `${n}Icon`,
      ref: o
    }, t, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${n}Icon`), r.muiName = kr.muiName, /* @__PURE__ */ ie.memo(/* @__PURE__ */ ie.forwardRef(r));
}
const $i = Oi(/* @__PURE__ */ y("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Zi({
  menu: e,
  dataHandler: n,
  commandHandler: r,
  className: t,
  id: o,
  children: a
}) {
  const [i, l] = Ee(!1), [c, s] = Ee(!1), u = Ne(() => {
    i && l(!1), s(!1);
  }, [i]), h = Ne((S) => {
    S.stopPropagation(), l((J) => {
      const z = !J;
      return z && S.shiftKey ? s(!0) : z || s(!1), z;
    });
  }, []), d = Qe(void 0), [v, m] = Ee(0);
  on(() => {
    i && d.current && m(d.current.clientHeight);
  }, [i]);
  const p = Ne(
    (S) => (u(), r(S)),
    [r, u]
  );
  let f = e;
  return !f && n && (f = n(c)), /* @__PURE__ */ y("div", { ref: d, style: { position: "relative" }, children: /* @__PURE__ */ y(bt, { position: "static", id: o, children: /* @__PURE__ */ te(yt, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    f ? /* @__PURE__ */ y(
      Tr,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: h,
        children: /* @__PURE__ */ y($i, {})
      }
    ) : void 0,
    a ? /* @__PURE__ */ y("div", { className: "papi-menu-children", children: a }) : void 0,
    f ? /* @__PURE__ */ y(
      vt,
      {
        className: `papi-menu-drawer ${t ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: i,
        onClose: u,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: v
          }
        },
        children: /* @__PURE__ */ y(Jt, { commandHandler: p, columns: f.columns })
      }
    ) : void 0
  ] }) }) });
}
const Qi = (e, n) => {
  on(() => {
    if (!e)
      return () => {
      };
    const r = e(n);
    return () => {
      r();
    };
  }, [e, n]);
};
function Ri(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Ai = (e, n, r = {}) => {
  const t = Qe(n);
  t.current = n;
  const o = Qe(r);
  o.current = Ri(o.current);
  const [a, i] = Ee(() => t.current), [l, c] = Ee(!0);
  return on(() => {
    let s = !0;
    return c(!!e), (async () => {
      if (e) {
        const u = await e();
        s && (i(() => u), c(!1));
      }
    })(), () => {
      s = !1, o.current.preserveValue || i(() => t.current);
    };
  }, [e]), [a, l];
}, Sn = () => !1, es = (e, n) => {
  const [r] = Ai(
    Ne(async () => {
      if (!e)
        return Sn;
      const t = await Promise.resolve(e(n));
      return async () => t();
    }, [n, e]),
    Sn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  on(() => () => {
    r !== Sn && r();
  }, [r]);
};
function Pi(e, n = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), t = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), n === "top" && t ? r.insertBefore(o, t) : r.appendChild(o);
}
Pi(`.papi-checkbox {
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
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  background-color: #f9f9f9;
  color: black;
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
  line-height: 0.8;
}

.papi-menu-item.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-menu-item.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
}

.papi-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-button.secondary {
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
  color: #333;
}

.papi-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-button.video {
  background-color: red;
  color: white;
}

.papi-button.video a,
.papi-button.video a:visited {
  color: white;
  text-decoration: none;
}

.papi-button.video a:hover {
  color: white;
  text-decoration: underline;
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
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-right: 3px;
}

.papi-menu {
  background-color: rgb(145, 145, 145);
  font-size: 11pt;
  font-weight: 600;
  margin-top: 1px;
  padding-bottom: 2px;
  padding-left: 24px;
  padding-top: 2px;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.paratext {
  background-color: darkgreen;
  color: greenyellow;
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

.papi-menu-children {
  padding: 10px;
  position: relative;
}
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

/*
Remove the default font size and weight for headings.
*/

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

/*
Add the correct font weight in Edge and Safari.
*/

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

/*
Add the correct font size in all browsers.
*/

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

/*
Use the modern Firefox focus style for all focusable elements.
*/

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

/*
Add the correct display in Chrome and Safari.
*/

/*
Removes the default spacing and border for appropriate elements.
*/

/*
Reset default styling for dialogs.
*/

/*
Prevent resizing textareas horizontally by default.
*/

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

/*
Set the default cursor for buttons.
*/

/*
Make sure disabled buttons don't get the pointer cursor.
*/

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

/* Make elements with the HTML hidden attribute stay hidden by default */
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
.pr-z-50 {
    z-index: 50;
}
.pr--mx-1 {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
}
.pr-my-1 {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
.pr-ml-auto {
    margin-left: auto;
}
.pr-flex {
    display: flex;
}
.pr-h-10 {
    height: 2.5rem;
}
.pr-h-2 {
    height: 0.5rem;
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
.pr-h-px {
    height: 1px;
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
.pr-w-full {
    width: 100%;
}
.pr-min-w-\\[8rem\\] {
    min-width: 8rem;
}
.pr-cursor-default {
    cursor: default;
}
.pr-select-none {
    user-select: none;
}
.pr-items-center {
    align-items: center;
}
.pr-justify-center {
    justify-content: center;
}
.pr-overflow-hidden {
    overflow: hidden;
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
.pr-bg-background {
    background-color: hsl(var(--background));
}
.pr-bg-muted {
    background-color: hsl(var(--muted));
}
.pr-bg-popover {
    background-color: hsl(var(--popover));
}
.pr-fill-current {
    fill: currentColor;
}
.pr-p-1 {
    padding: 0.25rem;
}
.pr-px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.pr-px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
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
.pr-pl-8 {
    padding-left: 2rem;
}
.pr-pr-2 {
    padding-right: 0.5rem;
}
.pr-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.pr-text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}
.pr-font-semibold {
    font-weight: 600;
}
.pr-tracking-widest {
    letter-spacing: 0.1em;
}
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
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
.pr-outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.pr-ring-offset-background {
    --tw-ring-offset-color: hsl(var(--background));
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
.focus\\:pr-bg-accent:focus {
    background-color: hsl(var(--accent));
}
.focus\\:pr-text-accent-foreground:focus {
    color: hsl(var(--accent-foreground));
}
.disabled\\:pr-cursor-not-allowed:disabled {
    cursor: not-allowed;
}
.disabled\\:pr-opacity-50:disabled {
    opacity: 0.5;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
    pointer-events: none;
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
    background-color: hsl(var(--accent));
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
    opacity: 0.5;
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
}.chapter-select {
  display: flex;
  padding: 0 8px 0 24px;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  background: hsl(0, 0%, 96%);
}

.chapter {
  display: flex;
  width: 16px;
  height: 16px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.chapter:hover {
  background: yellow;
}

.active {
  border-radius: 4px;
  background: yellow;
}

/* .chapterSelector {
  display: flex;
  padding: 0px 8px 0px 24px;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  background-color: whitesmoke;
}
.chapterSelector.focus\\:bg-accent:focus {
  background-color: whitesmoke;
}
.chapterSelector > * {
  display: flex;
  width: 36px;
  padding: 8px 12px 8px 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
.chapterSelector > *.active {
  background-color: #fef3c7;
}
.chapterSelector > *:hover {
  background-color: hsl(48 100% 96.1%);
} */

/* State=default, type=default */
.menu-item {
  font-size: 14px;
}

.selected-menu-item {
  font-size: 14px;
  background: #f9f9f9;
}

.tally-div {
  margin-right: 24px;
  margin-left: -24px;
}

.book-color-label {
  height: 16px;
  width: 2px;
}

.selected-book-color-label {
  height: 16px;
  width: 2px;
}

.book-color-label.ot {
  background-color: orange;
}

.selected-book-color-label.ot {
  background-color: orangered;
}

.book-color-label.nt {
  background-color: lightpink;
}

.selected-book-color-label.nt {
  background-color: pink;
}

.book-color-label.dc {
  background-color: lightskyblue;
}

.selected-book-color-label.dc {
  background-color: skyblue;
}
.book-chapter-input {
  width: 300px;
  height: 36px;
}

/* navigation menu item */
/*
box-sizing: border-box;

 Auto layout
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 12px 8px 16px;
gap: 10px;

width: 153px;
height: 36px;

background: #FFFFFF;
border: 1px solid #000000;
border-radius: 6px;

/* Inside auto layout
flex: none;
order: 0;
flex-grow: 0; */
@layer rdg.MeasuringCell {.m1l09lto7-0-0-beta-34 {
    contain: strict;
    grid-row: 1;
    visibility: hidden
}
  }


@layer rdg.Cell {.c1wupbe7-0-0-beta-34 {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning, layout/paint containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    contain: style;
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none
}

    .c1wupbe7-0-0-beta-34[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }

.cd0kgiy7-0-0-beta-34 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}

.c1730fa47-0-0-beta-34 {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3)
}
  }


@layer rdg.CheckboxLabel {.c1hs68w07-0-0-beta-34 {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px /* align checkbox in row group cell */
}
  }

@layer rdg.CheckboxInput {

.cojpd0n7-0-0-beta-34 {
    all: unset
}
  }

@layer rdg.CheckboxIcon {

.cwsfieb7-0-0-beta-34 {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color)
}

    .cojpd0n7-0-0-beta-34:checked + .cwsfieb7-0-0-beta-34 {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .cojpd0n7-0-0-beta-34:focus + .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }

@layer rdg.CheckboxLabel {

.c1fgadbl7-0-0-beta-34 {
    cursor: default
}

    .c1fgadbl7-0-0-beta-34 .cwsfieb7-0-0-beta-34 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }


@layer rdg.GroupCellContent {.g1w3c5217-0-0-beta-34 {
    outline: none
}
  }

@layer rdg.GroupCellCaret {

.cm5tyhw7-0-0-beta-34 {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle
}

    .cm5tyhw7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


@layer rdg.DragHandle {.cadd3bp7-0-0-beta-34 {
    cursor: move;
    position: absolute;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 8px;
    block-size: 8px;
    background-color: var(--rdg-selection-color)
}

    .cadd3bp7-0-0-beta-34:hover {
      inline-size: 16px;
      block-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }


@layer rdg.EditCell {.c1tngyp17-0-0-beta-34 {
    padding: 0
}
  }


@layer rdg.Row {.r1otpg647-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color)
}

    .r1otpg647-0-0-beta-34:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    .r1otpg647-0-0-beta-34[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);
    }

      .r1otpg647-0-0-beta-34[aria-selected='true']:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
  }

@layer rdg.FocusSink {

.rel5gk27-0-0-beta-34 {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px
}
    .r1qymf1z7-0-0-beta-34::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }


@layer rdg.GroupedRow {
    .gyxx7e97-0-0-beta-34:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    .gyxx7e97-0-0-beta-34 > .c1wupbe7-0-0-beta-34:not(:last-child):not(.c1730fa47-0-0-beta-34) {
      border-inline-end: none;
    }
  }


@layer rdg.SortableHeaderCell {.hizp7y17-0-0-beta-34 {
    cursor: pointer;
    display: flex
}

    .hizp7y17-0-0-beta-34:focus {
      outline: none;
    }
  }

@layer rdg.SortableHeaderCellName {

.h14cojrm7-0-0-beta-34 {
    flex-grow: 1;
    overflow: hidden;
    overflow: clip;
    text-overflow: ellipsis
}
  }


@layer rdg.HeaderCell {.celq7o97-0-0-beta-34 {
    touch-action: none
}

    .celq7o97-0-0-beta-34::after {
      content: '';
      cursor: col-resize;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
      inline-size: 10px;
    }
  }


@layer rdg.HeaderRow {.h197vzie7-0-0-beta-34 {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold
}

    .h197vzie7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      /* Should have a higher value than 0 to show up above regular cells */
      z-index: 1;
      position: sticky;
      inset-block-start: 0;
    }

    .h197vzie7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }


@layer rdg.Cell {.ccpfvsn7-0-0-beta-34 {
    background-color: #ccccff
}

.c1bmg16t7-0-0-beta-34 {
    background-color: #ccccff
}

    .c1bmg16t7-0-0-beta-34.ccpfvsn7-0-0-beta-34 {
      background-color: #9999ff;
    }
  }


@layer rdg.SortIcon {.a1mygwml7-0-0-beta-34 {
    fill: currentColor
}

    .a1mygwml7-0-0-beta-34 > path {
      transition: d 0.1s;
    }
  }


@layer rdg {
    @layer Defaults,
      FocusSink,
      CheckboxInput,
      CheckboxIcon,
      CheckboxLabel,
      Cell,
      HeaderCell,
      SummaryCell,
      EditCell,
      Row,
      HeaderRow,
      SummaryRow,
      GroupedRow,
      Root;

    @layer Defaults {
      .r104f42s7-0-0-beta-34 *,
      .r104f42s7-0-0-beta-34 *::before,
      .r104f42s7-0-0-beta-34 *::after {
        box-sizing: inherit;
      }
    }

    @layer Root {.r104f42s7-0-0-beta-34 {
      --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
      --rdg-selection-color: #66afe9;
      --rdg-font-size: 14px;

      display: grid;

      color-scheme: var(--rdg-color-scheme, light dark);

      /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
      /* We set a stacking context so internal elements don't render on top of external elements. */
      /* size containment is not used as it could break "width: min-content" for example, and the grid would infinitely resize on Chromium browsers */
      contain: content;
      content-visibility: auto;
      block-size: 350px;
      border: 1px solid var(--rdg-border-color);
      box-sizing: border-box;
      overflow: auto;
      background-color: var(--rdg-background-color);
      color: var(--rdg-color);
      font-size: var(--rdg-font-size)

      /* needed on Firefox */
}
      .r104f42s7-0-0-beta-34::before {
        content: '';
        grid-column: 1/-1;
        grid-row: 1/-1;
      }

      .r104f42s7-0-0-beta-34.rdg-dark {
        --rdg-color-scheme: dark;
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }

      .r104f42s7-0-0-beta-34.rdg-light {
        --rdg-color-scheme: light;
      }

      @media (prefers-color-scheme: dark) {
        .r104f42s7-0-0-beta-34:not(.rdg-light) {
          --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
        }
      }
    }
  }

@layer rdg.Root {

.v7ly7s7-0-0-beta-34 {
    user-select: none
}

    .v7ly7s7-0-0-beta-34 .r1otpg647-0-0-beta-34 {
      cursor: move;
    }
  }

@layer rdg.FocusSink {

.fc4f4zb7-0-0-beta-34 {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 2 to show up above header row */
    z-index: 3
}
  }


@layer rdg.SummaryCell {.s1n3hxke7-0-0-beta-34 {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom)
}
  }


@layer rdg.SummaryRow {.snfqesz7-0-0-beta-34 {
    line-height: var(--rdg-summary-row-height)
}

    .snfqesz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      position: sticky;
    }
    .t1jijrjz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
    .t14bmecc7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
    .b1odhhml7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }


@layer rdg.TextEditor {.tlmcuo07-0-0-beta-34 {
    appearance: none;

    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    padding-block: 0;
    padding-inline: 6px;
    border: 2px solid #ccc;
    vertical-align: top;
    color: var(--rdg-color);
    background-color: var(--rdg-background-color);

    font-family: inherit;
    font-size: var(--rdg-font-size)
}

    .tlmcuo07-0-0-beta-34:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    .tlmcuo07-0-0-beta-34::placeholder {
      color: #999;
      opacity: 1;
    }
  }

`, "top");
export {
  Ui as BookChapterControl,
  Ae as Button,
  Gi as ChapterRangeSelector,
  Xt as Checkbox,
  En as ComboBox,
  Jt as GridMenu,
  Hi as IconButton,
  De as LabelPosition,
  Yt as MenuItem,
  Wi as RefSelector,
  qi as SearchBar,
  Xi as Slider,
  Yi as Snackbar,
  Ki as Switch,
  Ji as Table,
  en as TextField,
  Zi as Toolbar,
  Qi as useEvent,
  es as useEventAsync,
  Ai as usePromise
};
//# sourceMappingURL=index.js.map
