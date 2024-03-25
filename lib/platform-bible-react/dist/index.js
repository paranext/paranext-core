import { jsxs as se, jsx as b, Fragment as Xr } from "react/jsx-runtime";
import * as ae from "react";
import { forwardRef as Yr, useState as xe, useRef as Qe, useCallback as we, useMemo as _n, useEffect as on } from "react";
import { getChaptersForBook as xr, offsetBook as Fn, FIRST_SCR_BOOK_NUM as Kr, offsetChapter as Ln, FIRST_SCR_CHAPTER_NUM as Jr, offsetVerse as Un, FIRST_SCR_VERSE_NUM as Zr } from "platform-bible-utils";
import * as K from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Qr, Check as et, Circle as nt, History as rt, Tally1 as tt } from "lucide-react";
import ot, { clsx as at } from "clsx";
import { twMerge as it } from "tailwind-merge";
import { Button as st, Autocomplete as ct, TextField as kr, FormControlLabel as Gn, FormLabel as lt, Checkbox as ut, MenuItem as dt, Grid as Sr, IconButton as Er, Paper as pt, Slider as ft, Snackbar as ht, Switch as mt, AppBar as gt, Toolbar as bt, Drawer as yt } from "@mui/material";
import vt, { SelectColumn as wt } from "react-data-grid";
import xt, { ThemeContext as kt, internal_processStyles as St } from "@mui/styled-engine";
var Et = Object.defineProperty, Ct = (e, n, r) => n in e ? Et(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, P = (e, n, r) => (Ct(e, typeof n != "symbol" ? n + "" : n, r), r);
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
], Cr = [
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
], Hn = Mt();
function Le(e, n = !0) {
  return n && (e = e.toUpperCase()), e in Hn ? Hn[e] : 0;
}
function On(e) {
  return Le(e) > 0;
}
function Tt(e) {
  const n = typeof e == "string" ? Le(e) : e;
  return n >= 40 && n <= 66;
}
function _t(e) {
  return (typeof e == "string" ? Le(e) : e) <= 39;
}
function Tr(e) {
  return e <= 66;
}
function Nt(e) {
  const n = typeof e == "string" ? Le(e) : e;
  return Or(n) && !Tr(n);
}
function* Ot() {
  for (let e = 1; e <= Oe.length; e++)
    yield e;
}
const $t = 1, _r = Oe.length;
function Rt() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function $n(e, n = "***") {
  const r = e - 1;
  return r < 0 || r >= Oe.length ? n : Oe[r];
}
function Nr(e) {
  return e <= 0 || e > _r ? "******" : Cr[e - 1];
}
function At(e) {
  return Nr(Le(e));
}
function Or(e) {
  const n = typeof e == "number" ? $n(e) : e;
  return On(n) && !Nn.includes(n);
}
function It(e) {
  const n = typeof e == "number" ? $n(e) : e;
  return On(n) && Nn.includes(n);
}
function Pt(e) {
  return Cr[e - 1].includes("*obsolete*");
}
function Mt() {
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
  isBookNT: Tt,
  isBookOT: _t,
  isBookOTNT: Tr,
  isBookDC: Nt,
  allBookNumbers: Ot,
  firstBook: $t,
  lastBook: _r,
  extraBooks: Rt,
  bookNumberToId: $n,
  bookNumberToEnglishName: Nr,
  bookIdToEnglishName: At,
  isCanonical: Or,
  isExtraMaterial: It,
  isObsolete: Pt
};
var Ee = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ee || {});
const Ne = class {
  // private versInfo: Versification;
  constructor(e) {
    if (P(this, "name"), P(this, "fullPath"), P(this, "isPresent"), P(this, "hasVerseSegments"), P(this, "isCustomized"), P(this, "baseVersification"), P(this, "scriptureBooks"), P(this, "_type"), e != null)
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
let le = Ne;
P(le, "Original", new Ne(Ee.Original)), P(le, "Septuagint", new Ne(Ee.Septuagint)), P(le, "Vulgate", new Ne(Ee.Vulgate)), P(le, "English", new Ne(Ee.English)), P(le, "RussianProtestant", new Ne(Ee.RussianProtestant)), P(le, "RussianOrthodox", new Ne(Ee.RussianOrthodox));
function Wn(e, n) {
  const r = n[0];
  for (let t = 1; t < n.length; t++)
    e = e.split(n[t]).join(r);
  return e.split(r);
}
var $r = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))($r || {});
const I = class {
  constructor(e, n, r, t) {
    if (P(this, "firstChapter"), P(this, "lastChapter"), P(this, "lastVerse"), P(this, "hasSegmentsDefined"), P(this, "text"), P(this, "BBBCCCVVVS"), P(this, "longHashCode"), P(this, "versification"), P(this, "rtlMark", "‏"), P(this, "_bookNum", 0), P(this, "_chapterNum", 0), P(this, "_verseNum", 0), P(this, "_verse"), r == null && t == null)
      if (e != null && typeof e == "string") {
        const o = e, a = n != null && n instanceof le ? n : void 0;
        this.setEmpty(a), this.parse(o);
      } else if (e != null && typeof e == "number") {
        const o = n != null && n instanceof le ? n : void 0;
        this.setEmpty(o), this._verseNum = e % I.chapterDigitShifter, this._chapterNum = Math.floor(
          e % I.bookDigitShifter / I.chapterDigitShifter
        ), this._bookNum = Math.floor(e / I.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof I) {
          const o = e;
          this._bookNum = o.bookNum, this._chapterNum = o.chapterNum, this._verseNum = o.verseNum, this._verse = o.verse, this.versification = o.versification;
        } else {
          if (e == null)
            return;
          const o = e instanceof le ? e : I.defaultVersification;
          this.setEmpty(o);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(t), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = t ?? I.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, n = I.defaultVersification) {
    const r = new I(n);
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
      return n = I.parse(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Ue)
        return n = new I(), { success: !1, verseRef: n };
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
    return e % I.bcvMaxValue * I.bookDigitShifter + (n >= 0 ? n % I.bcvMaxValue * I.chapterDigitShifter : 0) + (r >= 0 ? r % I.bcvMaxValue : 0);
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
      if (n = n * 10 + +r - +"0", n > I.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(I.verseRangeSeparator) || this._verse.includes(I.verseSequenceIndicator));
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
    const { success: n, vNum: r } = I.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = I.tryGetVerseNum(this._verse));
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
    return this.validateVerse(I.verseRangeSeparators, I.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return I.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return I.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new le(Ee[a]);
        } catch {
          throw new Ue("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Ue("Invalid reference : " + e);
    const r = n[1].split(":"), t = +r[0];
    if (r.length !== 2 || Z.bookIdToNumber(n[0]) === 0 || !Number.isInteger(t) || t < 0 || !I.isVerseParseable(r[1]))
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
    return new I(this);
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
  allVerses(e = !1, n = I.verseRangeSeparators, r = I.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const t = [], o = Wn(this._verse, r);
    for (const a of o.map((i) => Wn(i, n))) {
      const i = this.clone();
      i.verse = a[0];
      const u = i.verseNum;
      if (t.push(i), a.length > 1) {
        const s = this.clone();
        if (s.verse = a[1], !e)
          for (let c = u + 1; c < s.verseNum; c++) {
            const l = new I(
              this._bookNum,
              this._chapterNum,
              c,
              this.versification
            );
            this.isExcluded || t.push(l);
          }
        t.push(s);
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
  setEmpty(e = I.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = Z.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
let ve = I;
P(ve, "defaultVersification", le.English), P(ve, "verseRangeSeparator", "-"), P(ve, "verseSequenceIndicator", ","), P(ve, "verseRangeSeparators", [I.verseRangeSeparator]), P(ve, "verseSequenceIndicators", [I.verseSequenceIndicator]), P(ve, "chapterDigitShifter", 1e3), P(ve, "bookDigitShifter", I.chapterDigitShifter * I.chapterDigitShifter), P(ve, "bcvMaxValue", I.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
P(ve, "ValidStatusType", $r);
class Ue extends Error {
}
function de(...e) {
  return it(at(e));
}
const Bt = K.Root, Dt = K.Trigger, zt = ae.forwardRef(({ className: e, inset: n, children: r, ...t }, o) => /* @__PURE__ */ se(
  K.SubTrigger,
  {
    ref: o,
    className: de(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      n && "pr-pl-8",
      e
    ),
    ...t,
    children: [
      r,
      /* @__PURE__ */ b(Qr, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
zt.displayName = K.SubTrigger.displayName;
const jt = ae.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ b(
  K.SubContent,
  {
    ref: r,
    className: de(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
));
jt.displayName = K.SubContent.displayName;
const Rr = ae.forwardRef(({ className: e, sideOffset: n = 4, ...r }, t) => /* @__PURE__ */ b(K.Portal, { children: /* @__PURE__ */ b(
  K.Content,
  {
    ref: t,
    sideOffset: n,
    className: de(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
Rr.displayName = K.Content.displayName;
const Ar = ae.forwardRef(({ className: e, inset: n, ...r }, t) => /* @__PURE__ */ b(
  K.Item,
  {
    ref: t,
    className: de(
      // removed: pr-relative pr-flex
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      n && "pr-pl-8",
      e
    ),
    ...r
  }
));
Ar.displayName = K.Item.displayName;
const Vt = ae.forwardRef(({ className: e, children: n, checked: r, ...t }, o) => /* @__PURE__ */ se(
  K.CheckboxItem,
  {
    ref: o,
    className: de(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...t,
    children: [
      /* @__PURE__ */ b("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ b(K.ItemIndicator, { children: /* @__PURE__ */ b(et, { className: "pr-h-4 pr-w-4" }) }) }),
      n
    ]
  }
));
Vt.displayName = K.CheckboxItem.displayName;
const Ft = ae.forwardRef(({ className: e, children: n, ...r }, t) => /* @__PURE__ */ se(
  K.RadioItem,
  {
    ref: t,
    className: de(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ b("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ b(K.ItemIndicator, { children: /* @__PURE__ */ b(nt, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      n
    ]
  }
));
Ft.displayName = K.RadioItem.displayName;
const Ir = ae.forwardRef(({ className: e, inset: n, ...r }, t) => /* @__PURE__ */ b(
  K.Label,
  {
    ref: t,
    className: de("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", n && "pr-pl-8", e),
    ...r
  }
));
Ir.displayName = K.Label.displayName;
const Pr = ae.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ b(
  K.Separator,
  {
    ref: r,
    className: de("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...n
  }
));
Pr.displayName = K.Separator.displayName;
const Mr = ae.forwardRef(
  ({ className: e, type: n, ...r }, t) => /* @__PURE__ */ b(
    "input",
    {
      type: n,
      className: de(
        "pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: t,
      ...r
    }
  )
);
Mr.displayName = "Input";
const Lt = Yr(
  ({ handleSearch: e, handleKeyDown: n, ...r }, t) => /* @__PURE__ */ se("div", { style: { position: "relative", display: "inline-block" }, children: [
    /* @__PURE__ */ b(
      Mr,
      {
        ...r,
        style: { outline: 0, paddingRight: "40px" },
        type: "text",
        className: "pr-box-border pr-rounded-lg pr-bg-white pr-text-slate-700 pr-shadow-none",
        onChange: (o) => e(o.target.value),
        onKeyUp: n,
        ref: t
      }
    ),
    /* @__PURE__ */ b(
      "div",
      {
        style: {
          position: "absolute",
          transform: "translateY(-50%)",
          top: "20px",
          right: "16px"
        },
        className: "pr-cursor-pointer",
        children: /* @__PURE__ */ b(
          rt,
          {
            size: 16,
            onClick: () => {
              console.log("back in history");
            }
          }
        )
      }
    )
  ] })
);
function Ut({ endChapter: e, activeChapter: n, handleSelectChapter: r }) {
  const t = Array.from({ length: e }, (o, a) => a + 1);
  return /* @__PURE__ */ b("div", { className: "pr-flex pr-flex-wrap pr-content-start pr-items-start pr-self-stretch pr-bg-amber-50", children: t.map((o) => (
    // When adding onClick to <div> get error: Visible, non-interactive elements with click handlers must have at least one keyboard listener.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    /* @__PURE__ */ b(
      "div",
      {
        className: de(
          "pr-h-5 pr-w-5 pr-cursor-pointer pr-items-center pr-justify-center pr-rounded pr-p-2 pr-text-amber-800",
          "hover:pr-bg-amber-200",
          `${o === n}`
        ),
        onClick: () => r(o),
        children: o
      },
      o
    )
  )) });
}
function Gt({
  bookId: e,
  handleSelectBook: n,
  isSelected: r,
  bookType: t,
  children: o
}) {
  return /* @__PURE__ */ se(
    Ar,
    {
      textValue: e,
      className: de("pr-font-sans pr-font-normal pr-text-slate-700", r ?? "selected"),
      onSelect: (a) => {
        a.preventDefault(), n(e);
      },
      children: [
        /* @__PURE__ */ b(tt, { className: de("pr-mr-2.5 pr-h-4 pr-w-0.5", `${t.toLowerCase()}`) }),
        Z.bookIdToEnglishName(e),
        r && /* @__PURE__ */ b("div", { children: o }),
        " "
      ]
    },
    e
  );
}
const Ht = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Wt = ["OT", "NT", "DC"];
function Li({ scrRef: e, handleSubmit: n }) {
  const { allBookIds: r } = Z, [t, o] = xe(""), [a, i] = xe(""), [u, s] = xe(!1), c = Qe(void 0), l = we(
    (C) => ({
      OT: r.filter((E) => Z.isBookOT(E)),
      NT: r.filter((E) => Z.isBookNT(E)),
      DC: r.filter((E) => Z.isBookDC(E))
    })[C],
    [r]
  ), f = we(
    (C) => l(C).filter(
      (T) => Z.bookIdToEnglishName(T).toLowerCase().includes(t.toLowerCase()) || T.toLowerCase().includes(t.toLowerCase())
    ),
    [l, t]
  ), d = (C) => {
    o(C);
  }, v = we((C) => xr(Z.bookIdToNumber(C)), []), y = (C) => {
    i(a !== C ? C : ""), v(C) === -1 && (n({
      bookNum: Z.bookIdToNumber(C),
      chapterNum: 1,
      verseNum: 1
    }), s(!1), o(""));
  }, h = (C) => {
    n({
      bookNum: Z.bookIdToNumber(a),
      chapterNum: C,
      verseNum: 1
    }), s(!1), o("");
  }, p = we((C) => {
    !C && document.activeElement === c.current ? s(!0) : s(C);
  }, []), S = we(() => c.current.focus(), []);
  return /* @__PURE__ */ b("div", { children: /* @__PURE__ */ se(Bt, { modal: !1, open: u, onOpenChange: p, children: [
    /* @__PURE__ */ b(Dt, { asChild: !0, children: /* @__PURE__ */ b(
      Lt,
      {
        ref: c,
        value: t,
        handleSearch: d,
        handleKeyDown: () => s(!0),
        placeholder: `${Z.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ b(
      Rr,
      {
        className: "pr-overflow-y-auto pr-font-sans pr-font-normal pr-text-slate-700",
        style: { width: "300px", maxHeight: "500px" },
        onKeyDown: S,
        children: Wt.map((C) => /* @__PURE__ */ se("div", { children: [
          /* @__PURE__ */ b(Ir, { className: "pr-font-semibold pr-text-slate-700", children: Ht[C] }),
          f(C).map((T) => /* @__PURE__ */ b("div", { children: /* @__PURE__ */ b(
            Gt,
            {
              bookId: T,
              handleSelectBook: () => y(T),
              isSelected: a === T,
              bookType: C,
              children: /* @__PURE__ */ b(
                Ut,
                {
                  handleSelectChapter: h,
                  endChapter: v(T),
                  activeChapter: e.bookNum === Z.bookIdToNumber(T) ? e.chapterNum : 0
                }
              )
            }
          ) }, T)),
          C === "OT" || C === "NT" ? /* @__PURE__ */ b(Pr, {}) : void 0
        ] }, C))
      }
    )
  ] }) });
}
function Ae({
  id: e,
  isDisabled: n = !1,
  className: r,
  onClick: t,
  onContextMenu: o,
  children: a
}) {
  return /* @__PURE__ */ b(
    st,
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
  options: u = [],
  className: s,
  value: c,
  onChange: l,
  onFocus: f,
  onBlur: d,
  getOptionLabel: v
}) {
  return /* @__PURE__ */ b(
    ct,
    {
      id: e,
      disablePortal: !0,
      disabled: r,
      disableClearable: !t,
      fullWidth: a,
      options: u,
      className: `papi-combo-box ${o ? "error" : ""} ${s ?? ""}`,
      value: c,
      onChange: l,
      onFocus: f,
      onBlur: d,
      getOptionLabel: v,
      renderInput: (y) => /* @__PURE__ */ b(
        kr,
        {
          ...y,
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
function Ui({
  startChapter: e,
  endChapter: n,
  handleSelectStartChapter: r,
  handleSelectEndChapter: t,
  isDisabled: o,
  chapterCount: a
}) {
  const i = _n(
    () => Array.from({ length: a }, (c, l) => l + 1),
    [a]
  ), u = (c, l) => {
    r(l), l > n && t(l);
  }, s = (c, l) => {
    t(l), l < e && r(l);
  };
  return /* @__PURE__ */ se(Xr, { children: [
    /* @__PURE__ */ b(
      Gn,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ b(
          En,
          {
            onChange: (c, l) => u(c, l),
            className: "book-selection-chapter",
            isClearable: !1,
            options: i,
            getOptionLabel: (c) => c.toString(),
            value: e,
            isDisabled: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ b(
      Gn,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ b(
          En,
          {
            onChange: (c, l) => s(c, l),
            className: "book-selection-chapter",
            isClearable: !1,
            options: i,
            getOptionLabel: (c) => c.toString(),
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
var ze = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(ze || {});
function qt({
  id: e,
  isChecked: n,
  labelText: r = "",
  labelPosition: t = ze.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: u = !1,
  className: s,
  onChange: c
}) {
  const l = /* @__PURE__ */ b(
    ut,
    {
      id: e,
      checked: n,
      indeterminate: o,
      defaultChecked: a,
      disabled: i,
      className: `papi-checkbox ${u ? "error" : ""} ${s ?? ""}`,
      onChange: c
    }
  );
  let f;
  if (r) {
    const d = t === ze.Before || t === ze.Above, v = /* @__PURE__ */ b("span", { className: `papi-checkbox-label ${u ? "error" : ""} ${s ?? ""}`, children: r }), y = t === ze.Before || t === ze.After, h = y ? v : /* @__PURE__ */ b("div", { children: v }), p = y ? l : /* @__PURE__ */ b("div", { children: l });
    f = /* @__PURE__ */ se(
      lt,
      {
        className: `papi-checkbox ${t.toString()}`,
        disabled: i,
        error: u,
        children: [
          d && h,
          p,
          !d && h
        ]
      }
    );
  } else
    f = l;
  return f;
}
function Xt(e) {
  const {
    onClick: n,
    name: r,
    hasAutoFocus: t = !1,
    className: o,
    isDense: a = !0,
    hasDisabledGutters: i = !1,
    hasDivider: u = !1,
    focusVisibleClassName: s,
    id: c,
    children: l
  } = e;
  return /* @__PURE__ */ b(
    dt,
    {
      autoFocus: t,
      className: o,
      dense: a,
      disableGutters: i,
      divider: u,
      focusVisibleClassName: s,
      onClick: n,
      id: c,
      children: r || l
    }
  );
}
function Yt({ commandHandler: e, name: n, className: r, items: t, id: o }) {
  return /* @__PURE__ */ se(Sr, { id: o, item: !0, xs: "auto", className: `papi-menu-column ${r ?? ""}`, children: [
    /* @__PURE__ */ b("h3", { className: `papi-menu ${r ?? ""}`, children: n }),
    t.map((a, i) => /* @__PURE__ */ b(
      Xt,
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
function Kt({ commandHandler: e, className: n, columns: r, id: t }) {
  return /* @__PURE__ */ b(
    Sr,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${n ?? ""}`,
      columns: r.length,
      id: t,
      children: r.map((o, a) => /* @__PURE__ */ b(
        Yt,
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
function Gi({
  id: e,
  label: n,
  isDisabled: r = !1,
  tooltip: t,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: u,
  onClick: s,
  children: c
}) {
  return /* @__PURE__ */ b(
    Er,
    {
      id: e,
      disabled: r,
      edge: a,
      size: i,
      "aria-label": n,
      title: o ? void 0 : t ?? n,
      className: `papi-icon-button ${u ?? ""}`,
      onClick: s,
      children: c
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
  placeholder: u,
  isRequired: s = !1,
  className: c,
  defaultValue: l,
  value: f,
  onChange: d,
  onFocus: v,
  onBlur: y
}) {
  return /* @__PURE__ */ b(
    kr,
    {
      variant: e,
      id: n,
      disabled: r,
      error: t,
      fullWidth: o,
      helperText: a,
      label: i,
      placeholder: u,
      required: s,
      className: `papi-textfield ${c ?? ""}`,
      defaultValue: l,
      value: f,
      onChange: d,
      onFocus: v,
      onBlur: y
    }
  );
}
let hn;
const mn = () => (hn || (hn = Z.allBookIds.map((e) => ({
  bookId: e,
  label: Z.bookIdToEnglishName(e)
}))), hn);
function Hi({ scrRef: e, handleSubmit: n, id: r }) {
  const t = (s) => {
    n(s);
  }, o = (s, c) => {
    const f = { bookNum: Z.bookIdToNumber(c.bookId), chapterNum: 1, verseNum: 1 };
    t(f);
  }, a = (s) => {
    n({ ...e, chapterNum: +s.target.value });
  }, i = (s) => {
    n({ ...e, verseNum: +s.target.value });
  }, u = _n(() => mn()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ se("span", { id: r, children: [
    /* @__PURE__ */ b(
      En,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: u,
        options: mn(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ b(
      Ae,
      {
        onClick: () => t(Fn(e, -1)),
        isDisabled: e.bookNum <= Kr,
        children: "<"
      }
    ),
    /* @__PURE__ */ b(
      Ae,
      {
        onClick: () => t(Fn(e, 1)),
        isDisabled: e.bookNum >= mn().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ b(
      en,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ b(
      Ae,
      {
        onClick: () => n(Ln(e, -1)),
        isDisabled: e.chapterNum <= Jr,
        children: "<"
      }
    ),
    /* @__PURE__ */ b(
      Ae,
      {
        onClick: () => n(Ln(e, 1)),
        isDisabled: e.chapterNum >= xr(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ b(
      en,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ b(
      Ae,
      {
        onClick: () => n(Un(e, -1)),
        isDisabled: e.verseNum <= Zr,
        children: "<"
      }
    ),
    /* @__PURE__ */ b(Ae, { onClick: () => n(Un(e, 1)), children: ">" })
  ] });
}
function Wi({ onSearch: e, placeholder: n, isFullWidth: r }) {
  const [t, o] = xe(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ b(pt, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ b(
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
function qi({
  id: e,
  isDisabled: n = !1,
  orientation: r = "horizontal",
  min: t = 0,
  max: o = 100,
  step: a = 1,
  showMarks: i = !1,
  defaultValue: u,
  value: s,
  valueLabelDisplay: c = "off",
  className: l,
  onChange: f,
  onChangeCommitted: d
}) {
  return /* @__PURE__ */ b(
    ft,
    {
      id: e,
      disabled: n,
      orientation: r,
      min: t,
      max: o,
      step: a,
      marks: i,
      defaultValue: u,
      value: s,
      valueLabelDisplay: c,
      className: `papi-slider ${r} ${l ?? ""}`,
      onChange: f,
      onChangeCommitted: d
    }
  );
}
function Xi({
  autoHideDuration: e = void 0,
  id: n,
  isOpen: r = !1,
  className: t,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: i,
  children: u
}) {
  const s = {
    action: (i == null ? void 0 : i.action) || u,
    message: i == null ? void 0 : i.message,
    className: t
  };
  return /* @__PURE__ */ b(
    ht,
    {
      autoHideDuration: e ?? void 0,
      open: r,
      onClose: o,
      anchorOrigin: a,
      id: n,
      ContentProps: s
    }
  );
}
function Yi({
  id: e,
  isChecked: n,
  isDisabled: r = !1,
  hasError: t = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ b(
    mt,
    {
      id: e,
      checked: n,
      disabled: r,
      className: `papi-switch ${t ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function qn({ onRowChange: e, row: n, column: r }) {
  const t = (o) => {
    e({ ...n, [r.key]: o.target.value });
  };
  return /* @__PURE__ */ b(en, { defaultValue: n[r.key], onChange: t });
}
const Jt = ({ onChange: e, disabled: n, checked: r, ...t }) => /* @__PURE__ */ b(
  qt,
  {
    ...t,
    isChecked: r,
    isDisabled: n,
    onChange: (a) => {
      e(a.target.checked, a.nativeEvent.shiftKey);
    }
  }
);
function Ki({
  columns: e,
  sortColumns: n,
  onSortColumnsChange: r,
  onColumnResize: t,
  defaultColumnWidth: o,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: i,
  defaultColumnSortable: u = !0,
  defaultColumnResizable: s = !0,
  rows: c,
  enableSelectColumn: l,
  selectColumnWidth: f = 50,
  rowKeyGetter: d,
  rowHeight: v = 35,
  headerRowHeight: y = 35,
  selectedRows: h,
  onSelectedRowsChange: p,
  onRowsChange: S,
  onCellClick: C,
  onCellDoubleClick: T,
  onCellContextMenu: E,
  onCellKeyDown: m,
  direction: ee = "ltr",
  enableVirtualization: te = !0,
  onCopy: ge,
  onPaste: fe,
  onScroll: N,
  className: q
  // id,
}) {
  const Q = _n(() => {
    const oe = e.map((G) => typeof G.editable == "function" ? {
      ...G,
      editable: (ne) => !!G.editable(ne),
      renderEditCell: G.renderEditCell || qn
    } : G.editable && !G.renderEditCell ? { ...G, renderEditCell: qn } : G.renderEditCell && !G.editable ? { ...G, editable: !1 } : G);
    return l ? [{ ...wt, minWidth: f }, ...oe] : oe;
  }, [e, l, f]);
  return /* @__PURE__ */ b(
    vt,
    {
      columns: Q,
      defaultColumnOptions: {
        width: o,
        minWidth: a,
        maxWidth: i,
        sortable: u,
        resizable: s
      },
      sortColumns: n,
      onSortColumnsChange: r,
      onColumnResize: t,
      rows: c,
      rowKeyGetter: d,
      rowHeight: v,
      headerRowHeight: y,
      selectedRows: h,
      onSelectedRowsChange: p,
      onRowsChange: S,
      onCellClick: C,
      onCellDoubleClick: T,
      onCellContextMenu: E,
      onCellKeyDown: m,
      direction: ee,
      enableVirtualization: te,
      onCopy: ge,
      onPaste: fe,
      onScroll: N,
      renderers: { renderCheckbox: Jt },
      className: q ?? "rdg-light"
    }
  );
}
function z() {
  return z = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var r = arguments[n];
      for (var t in r)
        Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
    }
    return e;
  }, z.apply(this, arguments);
}
function Ce(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Br(e) {
  if (!Ce(e))
    return e;
  const n = {};
  return Object.keys(e).forEach((r) => {
    n[r] = Br(e[r]);
  }), n;
}
function me(e, n, r = {
  clone: !0
}) {
  const t = r.clone ? z({}, e) : e;
  return Ce(e) && Ce(n) && Object.keys(n).forEach((o) => {
    o !== "__proto__" && (Ce(n[o]) && o in e && Ce(e[o]) ? t[o] = me(e[o], n[o], r) : r.clone ? t[o] = Ce(n[o]) ? Br(n[o]) : n[o] : t[o] = n[o]);
  }), t;
}
function Zt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Cn = { exports: {} }, Ke = { exports: {} }, V = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xn;
function Qt() {
  if (Xn)
    return V;
  Xn = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, s = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, l = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, p = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
  function T(m) {
    if (typeof m == "object" && m !== null) {
      var ee = m.$$typeof;
      switch (ee) {
        case n:
          switch (m = m.type, m) {
            case s:
            case c:
            case t:
            case a:
            case o:
            case f:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case u:
                case l:
                case y:
                case v:
                case i:
                  return m;
                default:
                  return ee;
              }
          }
        case r:
          return ee;
      }
    }
  }
  function E(m) {
    return T(m) === c;
  }
  return V.AsyncMode = s, V.ConcurrentMode = c, V.ContextConsumer = u, V.ContextProvider = i, V.Element = n, V.ForwardRef = l, V.Fragment = t, V.Lazy = y, V.Memo = v, V.Portal = r, V.Profiler = a, V.StrictMode = o, V.Suspense = f, V.isAsyncMode = function(m) {
    return E(m) || T(m) === s;
  }, V.isConcurrentMode = E, V.isContextConsumer = function(m) {
    return T(m) === u;
  }, V.isContextProvider = function(m) {
    return T(m) === i;
  }, V.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === n;
  }, V.isForwardRef = function(m) {
    return T(m) === l;
  }, V.isFragment = function(m) {
    return T(m) === t;
  }, V.isLazy = function(m) {
    return T(m) === y;
  }, V.isMemo = function(m) {
    return T(m) === v;
  }, V.isPortal = function(m) {
    return T(m) === r;
  }, V.isProfiler = function(m) {
    return T(m) === a;
  }, V.isStrictMode = function(m) {
    return T(m) === o;
  }, V.isSuspense = function(m) {
    return T(m) === f;
  }, V.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === t || m === c || m === a || m === o || m === f || m === d || typeof m == "object" && m !== null && (m.$$typeof === y || m.$$typeof === v || m.$$typeof === i || m.$$typeof === u || m.$$typeof === l || m.$$typeof === p || m.$$typeof === S || m.$$typeof === C || m.$$typeof === h);
  }, V.typeOf = T, V;
}
var F = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yn;
function eo() {
  return Yn || (Yn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, s = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, l = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, p = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
    function T(w) {
      return typeof w == "string" || typeof w == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      w === t || w === c || w === a || w === o || w === f || w === d || typeof w == "object" && w !== null && (w.$$typeof === y || w.$$typeof === v || w.$$typeof === i || w.$$typeof === u || w.$$typeof === l || w.$$typeof === p || w.$$typeof === S || w.$$typeof === C || w.$$typeof === h);
    }
    function E(w) {
      if (typeof w == "object" && w !== null) {
        var ce = w.$$typeof;
        switch (ce) {
          case n:
            var k = w.type;
            switch (k) {
              case s:
              case c:
              case t:
              case a:
              case o:
              case f:
                return k;
              default:
                var Re = k && k.$$typeof;
                switch (Re) {
                  case u:
                  case l:
                  case y:
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
    var m = s, ee = c, te = u, ge = i, fe = n, N = l, q = t, Q = y, oe = v, G = r, he = a, ne = o, ye = f, _e = !1;
    function $e(w) {
      return _e || (_e = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), g(w) || E(w) === s;
    }
    function g(w) {
      return E(w) === c;
    }
    function x(w) {
      return E(w) === u;
    }
    function A(w) {
      return E(w) === i;
    }
    function $(w) {
      return typeof w == "object" && w !== null && w.$$typeof === n;
    }
    function _(w) {
      return E(w) === l;
    }
    function M(w) {
      return E(w) === t;
    }
    function O(w) {
      return E(w) === y;
    }
    function R(w) {
      return E(w) === v;
    }
    function B(w) {
      return E(w) === r;
    }
    function j(w) {
      return E(w) === a;
    }
    function D(w) {
      return E(w) === o;
    }
    function re(w) {
      return E(w) === f;
    }
    F.AsyncMode = m, F.ConcurrentMode = ee, F.ContextConsumer = te, F.ContextProvider = ge, F.Element = fe, F.ForwardRef = N, F.Fragment = q, F.Lazy = Q, F.Memo = oe, F.Portal = G, F.Profiler = he, F.StrictMode = ne, F.Suspense = ye, F.isAsyncMode = $e, F.isConcurrentMode = g, F.isContextConsumer = x, F.isContextProvider = A, F.isElement = $, F.isForwardRef = _, F.isFragment = M, F.isLazy = O, F.isMemo = R, F.isPortal = B, F.isProfiler = j, F.isStrictMode = D, F.isSuspense = re, F.isValidElementType = T, F.typeOf = E;
  }()), F;
}
var Kn;
function Dr() {
  return Kn || (Kn = 1, process.env.NODE_ENV === "production" ? Ke.exports = Qt() : Ke.exports = eo()), Ke.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var gn, Jn;
function no() {
  if (Jn)
    return gn;
  Jn = 1;
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
      for (var i = {}, u = 0; u < 10; u++)
        i["_" + String.fromCharCode(u)] = u;
      var s = Object.getOwnPropertyNames(i).map(function(l) {
        return i[l];
      });
      if (s.join("") !== "0123456789")
        return !1;
      var c = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(l) {
        c[l] = l;
      }), Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return gn = o() ? Object.assign : function(a, i) {
    for (var u, s = t(a), c, l = 1; l < arguments.length; l++) {
      u = Object(arguments[l]);
      for (var f in u)
        n.call(u, f) && (s[f] = u[f]);
      if (e) {
        c = e(u);
        for (var d = 0; d < c.length; d++)
          r.call(u, c[d]) && (s[c[d]] = u[c[d]]);
      }
    }
    return s;
  }, gn;
}
var bn, Zn;
function Rn() {
  if (Zn)
    return bn;
  Zn = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return bn = e, bn;
}
var yn, Qn;
function zr() {
  return Qn || (Qn = 1, yn = Function.call.bind(Object.prototype.hasOwnProperty)), yn;
}
var vn, er;
function ro() {
  if (er)
    return vn;
  er = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var n = Rn(), r = {}, t = zr();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, u, s, c) {
    if (process.env.NODE_ENV !== "production") {
      for (var l in a)
        if (t(a, l)) {
          var f;
          try {
            if (typeof a[l] != "function") {
              var d = Error(
                (s || "React class") + ": " + u + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            f = a[l](i, l, s, u, null, n);
          } catch (y) {
            f = y;
          }
          if (f && !(f instanceof Error) && e(
            (s || "React class") + ": type specification of " + u + " `" + l + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in r)) {
            r[f.message] = !0;
            var v = c ? c() : "";
            e(
              "Failed " + u + " type: " + f.message + (v ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, vn = o, vn;
}
var wn, nr;
function to() {
  if (nr)
    return wn;
  nr = 1;
  var e = Dr(), n = no(), r = Rn(), t = zr(), o = ro(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(u) {
    var s = "Warning: " + u;
    typeof console < "u" && console.error(s);
    try {
      throw new Error(s);
    } catch {
    }
  });
  function i() {
    return null;
  }
  return wn = function(u, s) {
    var c = typeof Symbol == "function" && Symbol.iterator, l = "@@iterator";
    function f(g) {
      var x = g && (c && g[c] || g[l]);
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
      any: C(),
      arrayOf: T,
      element: E(),
      elementType: m(),
      instanceOf: ee,
      node: N(),
      objectOf: ge,
      oneOf: te,
      oneOfType: fe,
      shape: Q,
      exact: oe
    };
    function y(g, x) {
      return g === x ? g !== 0 || 1 / g === 1 / x : g !== g && x !== x;
    }
    function h(g, x) {
      this.message = g, this.data = x && typeof x == "object" ? x : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function p(g) {
      if (process.env.NODE_ENV !== "production")
        var x = {}, A = 0;
      function $(M, O, R, B, j, D, re) {
        if (B = B || d, D = D || R, re !== r) {
          if (s) {
            var w = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw w.name = "Invariant Violation", w;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ce = B + ":" + R;
            !x[ce] && // Avoid spamming the console because they are often not actionable except for lib authors
            A < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + D + "` prop on `" + B + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), x[ce] = !0, A++);
          }
        }
        return O[R] == null ? M ? O[R] === null ? new h("The " + j + " `" + D + "` is marked as required " + ("in `" + B + "`, but its value is `null`.")) : new h("The " + j + " `" + D + "` is marked as required in " + ("`" + B + "`, but its value is `undefined`.")) : null : g(O, R, B, j, D);
      }
      var _ = $.bind(null, !1);
      return _.isRequired = $.bind(null, !0), _;
    }
    function S(g) {
      function x(A, $, _, M, O, R) {
        var B = A[$], j = ne(B);
        if (j !== g) {
          var D = ye(B);
          return new h(
            "Invalid " + M + " `" + O + "` of type " + ("`" + D + "` supplied to `" + _ + "`, expected ") + ("`" + g + "`."),
            { expectedType: g }
          );
        }
        return null;
      }
      return p(x);
    }
    function C() {
      return p(i);
    }
    function T(g) {
      function x(A, $, _, M, O) {
        if (typeof g != "function")
          return new h("Property `" + O + "` of component `" + _ + "` has invalid PropType notation inside arrayOf.");
        var R = A[$];
        if (!Array.isArray(R)) {
          var B = ne(R);
          return new h("Invalid " + M + " `" + O + "` of type " + ("`" + B + "` supplied to `" + _ + "`, expected an array."));
        }
        for (var j = 0; j < R.length; j++) {
          var D = g(R, j, _, M, O + "[" + j + "]", r);
          if (D instanceof Error)
            return D;
        }
        return null;
      }
      return p(x);
    }
    function E() {
      function g(x, A, $, _, M) {
        var O = x[A];
        if (!u(O)) {
          var R = ne(O);
          return new h("Invalid " + _ + " `" + M + "` of type " + ("`" + R + "` supplied to `" + $ + "`, expected a single ReactElement."));
        }
        return null;
      }
      return p(g);
    }
    function m() {
      function g(x, A, $, _, M) {
        var O = x[A];
        if (!e.isValidElementType(O)) {
          var R = ne(O);
          return new h("Invalid " + _ + " `" + M + "` of type " + ("`" + R + "` supplied to `" + $ + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return p(g);
    }
    function ee(g) {
      function x(A, $, _, M, O) {
        if (!(A[$] instanceof g)) {
          var R = g.name || d, B = $e(A[$]);
          return new h("Invalid " + M + " `" + O + "` of type " + ("`" + B + "` supplied to `" + _ + "`, expected ") + ("instance of `" + R + "`."));
        }
        return null;
      }
      return p(x);
    }
    function te(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function x(A, $, _, M, O) {
        for (var R = A[$], B = 0; B < g.length; B++)
          if (y(R, g[B]))
            return null;
        var j = JSON.stringify(g, function(re, w) {
          var ce = ye(w);
          return ce === "symbol" ? String(w) : w;
        });
        return new h("Invalid " + M + " `" + O + "` of value `" + String(R) + "` " + ("supplied to `" + _ + "`, expected one of " + j + "."));
      }
      return p(x);
    }
    function ge(g) {
      function x(A, $, _, M, O) {
        if (typeof g != "function")
          return new h("Property `" + O + "` of component `" + _ + "` has invalid PropType notation inside objectOf.");
        var R = A[$], B = ne(R);
        if (B !== "object")
          return new h("Invalid " + M + " `" + O + "` of type " + ("`" + B + "` supplied to `" + _ + "`, expected an object."));
        for (var j in R)
          if (t(R, j)) {
            var D = g(R, j, _, M, O + "." + j, r);
            if (D instanceof Error)
              return D;
          }
        return null;
      }
      return p(x);
    }
    function fe(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var x = 0; x < g.length; x++) {
        var A = g[x];
        if (typeof A != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + _e(A) + " at index " + x + "."
          ), i;
      }
      function $(_, M, O, R, B) {
        for (var j = [], D = 0; D < g.length; D++) {
          var re = g[D], w = re(_, M, O, R, B, r);
          if (w == null)
            return null;
          w.data && t(w.data, "expectedType") && j.push(w.data.expectedType);
        }
        var ce = j.length > 0 ? ", expected one of type [" + j.join(", ") + "]" : "";
        return new h("Invalid " + R + " `" + B + "` supplied to " + ("`" + O + "`" + ce + "."));
      }
      return p($);
    }
    function N() {
      function g(x, A, $, _, M) {
        return G(x[A]) ? null : new h("Invalid " + _ + " `" + M + "` supplied to " + ("`" + $ + "`, expected a ReactNode."));
      }
      return p(g);
    }
    function q(g, x, A, $, _) {
      return new h(
        (g || "React class") + ": " + x + " type `" + A + "." + $ + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + _ + "`."
      );
    }
    function Q(g) {
      function x(A, $, _, M, O) {
        var R = A[$], B = ne(R);
        if (B !== "object")
          return new h("Invalid " + M + " `" + O + "` of type `" + B + "` " + ("supplied to `" + _ + "`, expected `object`."));
        for (var j in g) {
          var D = g[j];
          if (typeof D != "function")
            return q(_, M, O, j, ye(D));
          var re = D(R, j, _, M, O + "." + j, r);
          if (re)
            return re;
        }
        return null;
      }
      return p(x);
    }
    function oe(g) {
      function x(A, $, _, M, O) {
        var R = A[$], B = ne(R);
        if (B !== "object")
          return new h("Invalid " + M + " `" + O + "` of type `" + B + "` " + ("supplied to `" + _ + "`, expected `object`."));
        var j = n({}, A[$], g);
        for (var D in j) {
          var re = g[D];
          if (t(g, D) && typeof re != "function")
            return q(_, M, O, D, ye(re));
          if (!re)
            return new h(
              "Invalid " + M + " `" + O + "` key `" + D + "` supplied to `" + _ + "`.\nBad object: " + JSON.stringify(A[$], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(g), null, "  ")
            );
          var w = re(R, D, _, M, O + "." + D, r);
          if (w)
            return w;
        }
        return null;
      }
      return p(x);
    }
    function G(g) {
      switch (typeof g) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !g;
        case "object":
          if (Array.isArray(g))
            return g.every(G);
          if (g === null || u(g))
            return !0;
          var x = f(g);
          if (x) {
            var A = x.call(g), $;
            if (x !== g.entries) {
              for (; !($ = A.next()).done; )
                if (!G($.value))
                  return !1;
            } else
              for (; !($ = A.next()).done; ) {
                var _ = $.value;
                if (_ && !G(_[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function he(g, x) {
      return g === "symbol" ? !0 : x ? x["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && x instanceof Symbol : !1;
    }
    function ne(g) {
      var x = typeof g;
      return Array.isArray(g) ? "array" : g instanceof RegExp ? "object" : he(x, g) ? "symbol" : x;
    }
    function ye(g) {
      if (typeof g > "u" || g === null)
        return "" + g;
      var x = ne(g);
      if (x === "object") {
        if (g instanceof Date)
          return "date";
        if (g instanceof RegExp)
          return "regexp";
      }
      return x;
    }
    function _e(g) {
      var x = ye(g);
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
    function $e(g) {
      return !g.constructor || !g.constructor.name ? d : g.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, wn;
}
var xn, rr;
function oo() {
  if (rr)
    return xn;
  rr = 1;
  var e = Rn();
  function n() {
  }
  function r() {
  }
  return r.resetWarningCache = n, xn = function() {
    function t(i, u, s, c, l, f) {
      if (f !== e) {
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
  var ao = Dr(), io = !0;
  Cn.exports = to()(ao.isElement, io);
} else
  Cn.exports = oo()();
var so = Cn.exports;
const H = /* @__PURE__ */ Zt(so);
function Ve(e) {
  let n = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    n += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + n + " for the full message.";
}
var Tn = { exports: {} }, L = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tr;
function co() {
  if (tr)
    return L;
  tr = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), u = Symbol.for("react.server_context"), s = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function h(p) {
    if (typeof p == "object" && p !== null) {
      var S = p.$$typeof;
      switch (S) {
        case e:
          switch (p = p.type, p) {
            case r:
            case o:
            case t:
            case c:
            case l:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case u:
                case i:
                case s:
                case d:
                case f:
                case a:
                  return p;
                default:
                  return S;
              }
          }
        case n:
          return S;
      }
    }
  }
  return L.ContextConsumer = i, L.ContextProvider = a, L.Element = e, L.ForwardRef = s, L.Fragment = r, L.Lazy = d, L.Memo = f, L.Portal = n, L.Profiler = o, L.StrictMode = t, L.Suspense = c, L.SuspenseList = l, L.isAsyncMode = function() {
    return !1;
  }, L.isConcurrentMode = function() {
    return !1;
  }, L.isContextConsumer = function(p) {
    return h(p) === i;
  }, L.isContextProvider = function(p) {
    return h(p) === a;
  }, L.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === e;
  }, L.isForwardRef = function(p) {
    return h(p) === s;
  }, L.isFragment = function(p) {
    return h(p) === r;
  }, L.isLazy = function(p) {
    return h(p) === d;
  }, L.isMemo = function(p) {
    return h(p) === f;
  }, L.isPortal = function(p) {
    return h(p) === n;
  }, L.isProfiler = function(p) {
    return h(p) === o;
  }, L.isStrictMode = function(p) {
    return h(p) === t;
  }, L.isSuspense = function(p) {
    return h(p) === c;
  }, L.isSuspenseList = function(p) {
    return h(p) === l;
  }, L.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === r || p === o || p === t || p === c || p === l || p === v || typeof p == "object" && p !== null && (p.$$typeof === d || p.$$typeof === f || p.$$typeof === a || p.$$typeof === i || p.$$typeof === s || p.$$typeof === y || p.getModuleId !== void 0);
  }, L.typeOf = h, L;
}
var U = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var or;
function lo() {
  return or || (or = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), u = Symbol.for("react.server_context"), s = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), y = !1, h = !1, p = !1, S = !1, C = !1, T;
    T = Symbol.for("react.module.reference");
    function E(k) {
      return !!(typeof k == "string" || typeof k == "function" || k === r || k === o || C || k === t || k === c || k === l || S || k === v || y || h || p || typeof k == "object" && k !== null && (k.$$typeof === d || k.$$typeof === f || k.$$typeof === a || k.$$typeof === i || k.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      k.$$typeof === T || k.getModuleId !== void 0));
    }
    function m(k) {
      if (typeof k == "object" && k !== null) {
        var Re = k.$$typeof;
        switch (Re) {
          case e:
            var Ye = k.type;
            switch (Ye) {
              case r:
              case o:
              case t:
              case c:
              case l:
                return Ye;
              default:
                var Vn = Ye && Ye.$$typeof;
                switch (Vn) {
                  case u:
                  case i:
                  case s:
                  case d:
                  case f:
                  case a:
                    return Vn;
                  default:
                    return Re;
                }
            }
          case n:
            return Re;
        }
      }
    }
    var ee = i, te = a, ge = e, fe = s, N = r, q = d, Q = f, oe = n, G = o, he = t, ne = c, ye = l, _e = !1, $e = !1;
    function g(k) {
      return _e || (_e = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function x(k) {
      return $e || ($e = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(k) {
      return m(k) === i;
    }
    function $(k) {
      return m(k) === a;
    }
    function _(k) {
      return typeof k == "object" && k !== null && k.$$typeof === e;
    }
    function M(k) {
      return m(k) === s;
    }
    function O(k) {
      return m(k) === r;
    }
    function R(k) {
      return m(k) === d;
    }
    function B(k) {
      return m(k) === f;
    }
    function j(k) {
      return m(k) === n;
    }
    function D(k) {
      return m(k) === o;
    }
    function re(k) {
      return m(k) === t;
    }
    function w(k) {
      return m(k) === c;
    }
    function ce(k) {
      return m(k) === l;
    }
    U.ContextConsumer = ee, U.ContextProvider = te, U.Element = ge, U.ForwardRef = fe, U.Fragment = N, U.Lazy = q, U.Memo = Q, U.Portal = oe, U.Profiler = G, U.StrictMode = he, U.Suspense = ne, U.SuspenseList = ye, U.isAsyncMode = g, U.isConcurrentMode = x, U.isContextConsumer = A, U.isContextProvider = $, U.isElement = _, U.isForwardRef = M, U.isFragment = O, U.isLazy = R, U.isMemo = B, U.isPortal = j, U.isProfiler = D, U.isStrictMode = re, U.isSuspense = w, U.isSuspenseList = ce, U.isValidElementType = E, U.typeOf = m;
  }()), U;
}
process.env.NODE_ENV === "production" ? Tn.exports = co() : Tn.exports = lo();
var ar = Tn.exports;
const uo = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function po(e) {
  const n = `${e}`.match(uo);
  return n && n[1] || "";
}
function jr(e, n = "") {
  return e.displayName || e.name || po(e) || n;
}
function ir(e, n, r) {
  const t = jr(n);
  return e.displayName || (t !== "" ? `${r}(${t})` : r);
}
function fo(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return jr(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ar.ForwardRef:
          return ir(e, e.render, "ForwardRef");
        case ar.Memo:
          return ir(e, e.type, "memo");
        default:
          return;
      }
  }
}
function be(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ve(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Vr(e, n) {
  const r = z({}, n);
  return Object.keys(e).forEach((t) => {
    if (t.toString().match(/^(components|slots)$/))
      r[t] = z({}, e[t], r[t]);
    else if (t.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[t] || {}, a = n[t];
      r[t] = {}, !a || !Object.keys(a) ? r[t] = o : !o || !Object.keys(o) ? r[t] = a : (r[t] = z({}, a), Object.keys(o).forEach((i) => {
        r[t][i] = Vr(o[i], a[i]);
      }));
    } else
      r[t] === void 0 && (r[t] = e[t]);
  }), r;
}
function ho(e, n, r = void 0) {
  const t = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      t[o] = e[o].reduce((a, i) => {
        if (i) {
          const u = n(i);
          u !== "" && a.push(u), r && r[i] && a.push(r[i]);
        }
        return a;
      }, []).join(" ");
    }
  ), t;
}
const sr = (e) => e, mo = () => {
  let e = sr;
  return {
    configure(n) {
      e = n;
    },
    generate(n) {
      return e(n);
    },
    reset() {
      e = sr;
    }
  };
}, go = mo(), bo = go, yo = {
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
function An(e, n, r = "Mui") {
  const t = yo[n];
  return t ? `${r}-${t}` : `${bo.generate(e)}-${n}`;
}
function vo(e, n, r = "Mui") {
  const t = {};
  return n.forEach((o) => {
    t[o] = An(e, o, r);
  }), t;
}
function wo(e, n = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(n, Math.min(e, r));
}
function Se(e, n) {
  if (e == null)
    return {};
  var r = {}, t = Object.keys(e), o, a;
  for (a = 0; a < t.length; a++)
    o = t[a], !(n.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const xo = ["values", "unit", "step"], ko = (e) => {
  const n = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return n.sort((r, t) => r.val - t.val), n.reduce((r, t) => z({}, r, {
    [t.key]: t.val
  }), {});
};
function So(e) {
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
  } = e, o = Se(e, xo), a = ko(n), i = Object.keys(a);
  function u(d) {
    return `@media (min-width:${typeof n[d] == "number" ? n[d] : d}${r})`;
  }
  function s(d) {
    return `@media (max-width:${(typeof n[d] == "number" ? n[d] : d) - t / 100}${r})`;
  }
  function c(d, v) {
    const y = i.indexOf(v);
    return `@media (min-width:${typeof n[d] == "number" ? n[d] : d}${r}) and (max-width:${(y !== -1 && typeof n[i[y]] == "number" ? n[i[y]] : v) - t / 100}${r})`;
  }
  function l(d) {
    return i.indexOf(d) + 1 < i.length ? c(d, i[i.indexOf(d) + 1]) : u(d);
  }
  function f(d) {
    const v = i.indexOf(d);
    return v === 0 ? u(i[1]) : v === i.length - 1 ? s(i[v]) : c(d, i[i.indexOf(d) + 1]).replace("@media", "@media not all and");
  }
  return z({
    keys: i,
    values: a,
    up: u,
    down: s,
    between: c,
    only: l,
    not: f,
    unit: r
  }, o);
}
const Eo = {
  borderRadius: 4
}, Co = Eo, To = process.env.NODE_ENV !== "production" ? H.oneOfType([H.number, H.string, H.object, H.array]) : {}, Te = To;
function He(e, n) {
  return n ? me(e, n, {
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
}, cr = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${In[e]}px)`
};
function ke(e, n, r) {
  const t = e.theme || {};
  if (Array.isArray(n)) {
    const a = t.breakpoints || cr;
    return n.reduce((i, u, s) => (i[a.up(a.keys[s])] = r(n[s]), i), {});
  }
  if (typeof n == "object") {
    const a = t.breakpoints || cr;
    return Object.keys(n).reduce((i, u) => {
      if (Object.keys(a.values || In).indexOf(u) !== -1) {
        const s = a.up(u);
        i[s] = r(n[u], u);
      } else {
        const s = u;
        i[s] = n[s];
      }
      return i;
    }, {});
  }
  return r(n);
}
function _o(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((t, o) => {
    const a = e.up(o);
    return t[a] = {}, t;
  }, {})) || {};
}
function No(e, n) {
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
function J(e) {
  const {
    prop: n,
    cssProperty: r = e.prop,
    themeKey: t,
    transform: o
  } = e, a = (i) => {
    if (i[n] == null)
      return null;
    const u = i[n], s = i.theme, c = an(s, t) || {};
    return ke(i, u, (f) => {
      let d = nn(c, o, f);
      return f === d && typeof f == "string" && (d = nn(c, o, `${n}${f === "default" ? "" : be(f)}`, f)), r === !1 ? d : {
        [r]: d
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [n]: Te
  } : {}, a.filterProps = [n], a;
}
function Oo(e) {
  const n = {};
  return (r) => (n[r] === void 0 && (n[r] = e(r)), n[r]);
}
const $o = {
  m: "margin",
  p: "padding"
}, Ro = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, lr = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Ao = Oo((e) => {
  if (e.length > 2)
    if (lr[e])
      e = lr[e];
    else
      return [e];
  const [n, r] = e.split(""), t = $o[n], o = Ro[r] || "";
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
function Fr(e) {
  return qe(e, "spacing", 8, "spacing");
}
function Xe(e, n) {
  if (typeof n == "string" || n == null)
    return n;
  const r = Math.abs(n), t = e(r);
  return n >= 0 ? t : typeof t == "number" ? -t : `-${t}`;
}
function Po(e, n) {
  return (r) => e.reduce((t, o) => (t[o] = Xe(n, r), t), {});
}
function Mo(e, n, r, t) {
  if (n.indexOf(r) === -1)
    return null;
  const o = Ao(r), a = Po(o, t), i = e[r];
  return ke(e, i, a);
}
function Lr(e, n) {
  const r = Fr(e.theme);
  return Object.keys(e).map((t) => Mo(e, n, t, r)).reduce(He, {});
}
function X(e) {
  return Lr(e, sn);
}
X.propTypes = process.env.NODE_ENV !== "production" ? sn.reduce((e, n) => (e[n] = Te, e), {}) : {};
X.filterProps = sn;
function Y(e) {
  return Lr(e, cn);
}
Y.propTypes = process.env.NODE_ENV !== "production" ? cn.reduce((e, n) => (e[n] = Te, e), {}) : {};
Y.filterProps = cn;
process.env.NODE_ENV !== "production" && Io.reduce((e, n) => (e[n] = Te, e), {});
function Bo(e = 8) {
  if (e.mui)
    return e;
  const n = Fr({
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
function pe(e, n) {
  return J({
    prop: e,
    themeKey: "borders",
    transform: n
  });
}
const Do = pe("border", ue), zo = pe("borderTop", ue), jo = pe("borderRight", ue), Vo = pe("borderBottom", ue), Fo = pe("borderLeft", ue), Lo = pe("borderColor"), Uo = pe("borderTopColor"), Go = pe("borderRightColor"), Ho = pe("borderBottomColor"), Wo = pe("borderLeftColor"), qo = pe("outline", ue), Xo = pe("outlineColor"), un = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const n = qe(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (t) => ({
      borderRadius: Xe(n, t)
    });
    return ke(e, e.borderRadius, r);
  }
  return null;
};
un.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Te
} : {};
un.filterProps = ["borderRadius"];
ln(Do, zo, jo, Vo, Fo, Lo, Uo, Go, Ho, Wo, un, qo, Xo);
const dn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const n = qe(e.theme, "spacing", 8, "gap"), r = (t) => ({
      gap: Xe(n, t)
    });
    return ke(e, e.gap, r);
  }
  return null;
};
dn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: Te
} : {};
dn.filterProps = ["gap"];
const pn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const n = qe(e.theme, "spacing", 8, "columnGap"), r = (t) => ({
      columnGap: Xe(n, t)
    });
    return ke(e, e.columnGap, r);
  }
  return null;
};
pn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: Te
} : {};
pn.filterProps = ["columnGap"];
const fn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const n = qe(e.theme, "spacing", 8, "rowGap"), r = (t) => ({
      rowGap: Xe(n, t)
    });
    return ke(e, e.rowGap, r);
  }
  return null;
};
fn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: Te
} : {};
fn.filterProps = ["rowGap"];
const Yo = J({
  prop: "gridColumn"
}), Ko = J({
  prop: "gridRow"
}), Jo = J({
  prop: "gridAutoFlow"
}), Zo = J({
  prop: "gridAutoColumns"
}), Qo = J({
  prop: "gridAutoRows"
}), ea = J({
  prop: "gridTemplateColumns"
}), na = J({
  prop: "gridTemplateRows"
}), ra = J({
  prop: "gridTemplateAreas"
}), ta = J({
  prop: "gridArea"
});
ln(dn, pn, fn, Yo, Ko, Jo, Zo, Qo, ea, na, ra, ta);
function je(e, n) {
  return n === "grey" ? n : e;
}
const oa = J({
  prop: "color",
  themeKey: "palette",
  transform: je
}), aa = J({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: je
}), ia = J({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: je
});
ln(oa, aa, ia);
function ie(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const sa = J({
  prop: "width",
  transform: ie
}), Pn = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const n = (r) => {
      var t, o;
      const a = ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null ? void 0 : t[r]) || In[r];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: ie(r)
      };
    };
    return ke(e, e.maxWidth, n);
  }
  return null;
};
Pn.filterProps = ["maxWidth"];
const ca = J({
  prop: "minWidth",
  transform: ie
}), la = J({
  prop: "height",
  transform: ie
}), ua = J({
  prop: "maxHeight",
  transform: ie
}), da = J({
  prop: "minHeight",
  transform: ie
});
J({
  prop: "size",
  cssProperty: "width",
  transform: ie
});
J({
  prop: "size",
  cssProperty: "height",
  transform: ie
});
const pa = J({
  prop: "boxSizing"
});
ln(sa, Pn, ca, la, ua, da, pa);
const fa = {
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
    style: Y
  },
  pt: {
    style: Y
  },
  pr: {
    style: Y
  },
  pb: {
    style: Y
  },
  pl: {
    style: Y
  },
  px: {
    style: Y
  },
  py: {
    style: Y
  },
  padding: {
    style: Y
  },
  paddingTop: {
    style: Y
  },
  paddingRight: {
    style: Y
  },
  paddingBottom: {
    style: Y
  },
  paddingLeft: {
    style: Y
  },
  paddingX: {
    style: Y
  },
  paddingY: {
    style: Y
  },
  paddingInline: {
    style: Y
  },
  paddingInlineStart: {
    style: Y
  },
  paddingInlineEnd: {
    style: Y
  },
  paddingBlock: {
    style: Y
  },
  paddingBlockStart: {
    style: Y
  },
  paddingBlockEnd: {
    style: Y
  },
  m: {
    style: X
  },
  mt: {
    style: X
  },
  mr: {
    style: X
  },
  mb: {
    style: X
  },
  ml: {
    style: X
  },
  mx: {
    style: X
  },
  my: {
    style: X
  },
  margin: {
    style: X
  },
  marginTop: {
    style: X
  },
  marginRight: {
    style: X
  },
  marginBottom: {
    style: X
  },
  marginLeft: {
    style: X
  },
  marginX: {
    style: X
  },
  marginY: {
    style: X
  },
  marginInline: {
    style: X
  },
  marginInlineStart: {
    style: X
  },
  marginInlineEnd: {
    style: X
  },
  marginBlock: {
    style: X
  },
  marginBlockStart: {
    style: X
  },
  marginBlockEnd: {
    style: X
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
    style: fn
  },
  columnGap: {
    style: pn
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
    transform: ie
  },
  maxWidth: {
    style: Pn
  },
  minWidth: {
    transform: ie
  },
  height: {
    transform: ie
  },
  maxHeight: {
    transform: ie
  },
  minHeight: {
    transform: ie
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
}, Mn = fa;
function ha(...e) {
  const n = e.reduce((t, o) => t.concat(Object.keys(o)), []), r = new Set(n);
  return e.every((t) => r.size === Object.keys(t).length);
}
function ma(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function ga() {
  function e(r, t, o, a) {
    const i = {
      [r]: t,
      theme: o
    }, u = a[r];
    if (!u)
      return {
        [r]: t
      };
    const {
      cssProperty: s = r,
      themeKey: c,
      transform: l,
      style: f
    } = u;
    if (t == null)
      return null;
    if (c === "typography" && t === "inherit")
      return {
        [r]: t
      };
    const d = an(o, c) || {};
    return f ? f(i) : ke(i, t, (y) => {
      let h = nn(d, l, y);
      return y === h && typeof y == "string" && (h = nn(d, l, `${r}${y === "default" ? "" : be(y)}`, y)), s === !1 ? h : {
        [s]: h
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
    const i = (t = a.unstable_sxConfig) != null ? t : Mn;
    function u(s) {
      let c = s;
      if (typeof s == "function")
        c = s(a);
      else if (typeof s != "object")
        return s;
      if (!c)
        return null;
      const l = _o(a.breakpoints), f = Object.keys(l);
      let d = l;
      return Object.keys(c).forEach((v) => {
        const y = ma(c[v], a);
        if (y != null)
          if (typeof y == "object")
            if (i[v])
              d = He(d, e(v, y, a, i));
            else {
              const h = ke({
                theme: a
              }, y, (p) => ({
                [v]: p
              }));
              ha(h, y) ? d[v] = n({
                sx: y,
                theme: a
              }) : d = He(d, h);
            }
          else
            d = He(d, e(v, y, a, i));
      }), No(f, d);
    }
    return Array.isArray(o) ? o.map(u) : u(o);
  }
  return n;
}
const Ur = ga();
Ur.filterProps = ["sx"];
const Bn = Ur, ba = ["breakpoints", "palette", "spacing", "shape"];
function Dn(e = {}, ...n) {
  const {
    breakpoints: r = {},
    palette: t = {},
    spacing: o,
    shape: a = {}
  } = e, i = Se(e, ba), u = So(r), s = Bo(o);
  let c = me({
    breakpoints: u,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: z({
      mode: "light"
    }, t),
    spacing: s,
    shape: z({}, Co, a)
  }, i);
  return c = n.reduce((l, f) => me(l, f), c), c.unstable_sxConfig = z({}, Mn, i == null ? void 0 : i.unstable_sxConfig), c.unstable_sx = function(f) {
    return Bn({
      sx: f,
      theme: this
    });
  }, c;
}
function ya(e) {
  return Object.keys(e).length === 0;
}
function va(e = null) {
  const n = ae.useContext(kt);
  return !n || ya(n) ? e : n;
}
const wa = Dn();
function xa(e = wa) {
  return va(e);
}
const ka = ["variant"];
function ur(e) {
  return e.length === 0;
}
function Gr(e) {
  const {
    variant: n
  } = e, r = Se(e, ka);
  let t = n || "";
  return Object.keys(r).sort().forEach((o) => {
    o === "color" ? t += ur(t) ? e[o] : be(e[o]) : t += `${ur(t) ? o : be(o)}${be(e[o].toString())}`;
  }), t;
}
const Sa = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Ea(e) {
  return Object.keys(e).length === 0;
}
function Ca(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const Ta = (e, n) => n.components && n.components[e] && n.components[e].styleOverrides ? n.components[e].styleOverrides : null, rn = (e) => {
  let n = 0;
  const r = {};
  return e && e.forEach((t) => {
    let o = "";
    typeof t.props == "function" ? (o = `callback${n}`, n += 1) : o = Gr(t.props), r[o] = t.style;
  }), r;
}, _a = (e, n) => {
  let r = [];
  return n && n.components && n.components[e] && n.components[e].variants && (r = n.components[e].variants), rn(r);
}, tn = (e, n, r) => {
  const {
    ownerState: t = {}
  } = e, o = [];
  let a = 0;
  return r && r.forEach((i) => {
    let u = !0;
    if (typeof i.props == "function") {
      const s = z({}, e, t);
      u = i.props(s);
    } else
      Object.keys(i.props).forEach((s) => {
        t[s] !== i.props[s] && e[s] !== i.props[s] && (u = !1);
      });
    u && (typeof i.props == "function" ? o.push(n[`callback${a}`]) : o.push(n[Gr(i.props)])), typeof i.props == "function" && (a += 1);
  }), o;
}, Na = (e, n, r, t) => {
  var o;
  const a = r == null || (o = r.components) == null || (o = o[t]) == null ? void 0 : o.variants;
  return tn(e, n, a);
};
function Je(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Oa = Dn(), dr = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Ze({
  defaultTheme: e,
  theme: n,
  themeId: r
}) {
  return Ea(n) ? e : n[r] || n;
}
function $a(e) {
  return e ? (n, r) => r[e] : null;
}
const pr = ({
  styledArg: e,
  props: n,
  defaultTheme: r,
  themeId: t
}) => {
  const o = e(z({}, n, {
    theme: Ze(z({}, n, {
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
function Ra(e = {}) {
  const {
    themeId: n,
    defaultTheme: r = Oa,
    rootShouldForwardProp: t = Je,
    slotShouldForwardProp: o = Je
  } = e, a = (i) => Bn(z({}, i, {
    theme: Ze(z({}, i, {
      defaultTheme: r,
      themeId: n
    }))
  }));
  return a.__mui_systemSx = !0, (i, u = {}) => {
    St(i, (E) => E.filter((m) => !(m != null && m.__mui_systemSx)));
    const {
      name: s,
      slot: c,
      skipVariantsResolver: l,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = $a(dr(c))
    } = u, v = Se(u, Sa), y = l !== void 0 ? l : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      c && c !== "Root" && c !== "root" || !1
    ), h = f || !1;
    let p;
    process.env.NODE_ENV !== "production" && s && (p = `${s}-${dr(c || "Root")}`);
    let S = Je;
    c === "Root" || c === "root" ? S = t : c ? S = o : Ca(i) && (S = void 0);
    const C = xt(i, z({
      shouldForwardProp: S,
      label: p
    }, v)), T = (E, ...m) => {
      const ee = m ? m.map((N) => {
        if (typeof N == "function" && N.__emotion_real !== N)
          return (q) => pr({
            styledArg: N,
            props: q,
            defaultTheme: r,
            themeId: n
          });
        if (Ce(N)) {
          let q = N, Q;
          return N && N.variants && (Q = N.variants, delete q.variants, q = (oe) => {
            let G = N;
            return tn(oe, rn(Q), Q).forEach((ne) => {
              G = me(G, ne);
            }), G;
          }), q;
        }
        return N;
      }) : [];
      let te = E;
      if (Ce(E)) {
        let N;
        E && E.variants && (N = E.variants, delete te.variants, te = (q) => {
          let Q = E;
          return tn(q, rn(N), N).forEach((G) => {
            Q = me(Q, G);
          }), Q;
        });
      } else
        typeof E == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        E.__emotion_real !== E && (te = (N) => pr({
          styledArg: E,
          props: N,
          defaultTheme: r,
          themeId: n
        }));
      s && d && ee.push((N) => {
        const q = Ze(z({}, N, {
          defaultTheme: r,
          themeId: n
        })), Q = Ta(s, q);
        if (Q) {
          const oe = {};
          return Object.entries(Q).forEach(([G, he]) => {
            oe[G] = typeof he == "function" ? he(z({}, N, {
              theme: q
            })) : he;
          }), d(N, oe);
        }
        return null;
      }), s && !y && ee.push((N) => {
        const q = Ze(z({}, N, {
          defaultTheme: r,
          themeId: n
        }));
        return Na(N, _a(s, q), q, s);
      }), h || ee.push(a);
      const ge = ee.length - m.length;
      if (Array.isArray(E) && ge > 0) {
        const N = new Array(ge).fill("");
        te = [...E, ...N], te.raw = [...E.raw, ...N];
      }
      const fe = C(te, ...ee);
      if (process.env.NODE_ENV !== "production") {
        let N;
        s && (N = `${s}${be(c || "")}`), N === void 0 && (N = `Styled(${fo(i)})`), fe.displayName = N;
      }
      return i.muiName && (fe.muiName = i.muiName), fe;
    };
    return C.withConfig && (T.withConfig = C.withConfig), T;
  };
}
function Aa(e) {
  const {
    theme: n,
    name: r,
    props: t
  } = e;
  return !n || !n.components || !n.components[r] || !n.components[r].defaultProps ? t : Vr(n.components[r].defaultProps, t);
}
function Ia({
  props: e,
  name: n,
  defaultTheme: r,
  themeId: t
}) {
  let o = xa(r);
  return t && (o = o[t] || o), Aa({
    theme: o,
    name: n,
    props: e
  });
}
function Hr(e, n = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < n || e > r) && console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`), wo(e, n, r);
}
function Pa(e) {
  e = e.slice(1);
  const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(n);
  return r && r[0].length === 1 && (r = r.map((t) => t + t)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((t, o) => o < 3 ? parseInt(t, 16) : Math.round(parseInt(t, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Fe(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Fe(Pa(e));
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
function zn(e) {
  const {
    type: n,
    colorSpace: r
  } = e;
  let {
    values: t
  } = e;
  return n.indexOf("rgb") !== -1 ? t = t.map((o, a) => a < 3 ? parseInt(o, 10) : o) : n.indexOf("hsl") !== -1 && (t[1] = `${t[1]}%`, t[2] = `${t[2]}%`), n.indexOf("color") !== -1 ? t = `${r} ${t.join(" ")}` : t = `${t.join(", ")}`, `${n}(${t})`;
}
function Ma(e) {
  e = Fe(e);
  const {
    values: n
  } = e, r = n[0], t = n[1] / 100, o = n[2] / 100, a = t * Math.min(o, 1 - o), i = (c, l = (c + r / 30) % 12) => o - a * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  let u = "rgb";
  const s = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (u += "a", s.push(n[3])), zn({
    type: u,
    values: s
  });
}
function fr(e) {
  e = Fe(e);
  let n = e.type === "hsl" || e.type === "hsla" ? Fe(Ma(e)).values : e.values;
  return n = n.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3));
}
function hr(e, n) {
  const r = fr(e), t = fr(n);
  return (Math.max(r, t) + 0.05) / (Math.min(r, t) + 0.05);
}
function Ba(e, n) {
  if (e = Fe(e), n = Hr(n), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - n;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - n;
  return zn(e);
}
function Da(e, n) {
  if (e = Fe(e), n = Hr(n), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * n;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * n;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * n;
  return zn(e);
}
function za(e, n) {
  return z({
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
const ja = {
  black: "#000",
  white: "#fff"
}, We = ja, Va = {
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
}, Fa = Va, La = {
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
}, Ie = La, Ua = {
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
}, Pe = Ua, Ga = {
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
}, Ge = Ga, Ha = {
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
}, Me = Ha, Wa = {
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
}, Be = Wa, qa = {
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
}, De = qa, Xa = ["mode", "contrastThreshold", "tonalOffset"], mr = {
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
function gr(e, n, r, t) {
  const o = t.light || t, a = t.dark || t * 1.5;
  e[n] || (e.hasOwnProperty(r) ? e[n] = e[r] : n === "light" ? e.light = Da(e.main, o) : n === "dark" && (e.dark = Ba(e.main, a)));
}
function Ya(e = "light") {
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
function Ka(e = "light") {
  return e === "dark" ? {
    main: Ie[200],
    light: Ie[50],
    dark: Ie[400]
  } : {
    main: Ie[500],
    light: Ie[300],
    dark: Ie[700]
  };
}
function Ja(e = "light") {
  return e === "dark" ? {
    main: Pe[500],
    light: Pe[300],
    dark: Pe[700]
  } : {
    main: Pe[700],
    light: Pe[400],
    dark: Pe[800]
  };
}
function Za(e = "light") {
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
function Qa(e = "light") {
  return e === "dark" ? {
    main: De[400],
    light: De[300],
    dark: De[700]
  } : {
    main: De[800],
    light: De[500],
    dark: De[900]
  };
}
function ei(e = "light") {
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
function ni(e) {
  const {
    mode: n = "light",
    contrastThreshold: r = 3,
    tonalOffset: t = 0.2
  } = e, o = Se(e, Xa), a = e.primary || Ya(n), i = e.secondary || Ka(n), u = e.error || Ja(n), s = e.info || Za(n), c = e.success || Qa(n), l = e.warning || ei(n);
  function f(h) {
    const p = hr(h, kn.text.primary) >= r ? kn.text.primary : mr.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const S = hr(h, p);
      S < 3 && console.error([`MUI: The contrast ratio of ${S}:1 for ${p} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return p;
  }
  const d = ({
    color: h,
    name: p,
    mainShade: S = 500,
    lightShade: C = 300,
    darkShade: T = 700
  }) => {
    if (h = z({}, h), !h.main && h[S] && (h.main = h[S]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${p ? ` (${p})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.` : Ve(11, p ? ` (${p})` : "", S));
    if (typeof h.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${p ? ` (${p})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Ve(12, p ? ` (${p})` : "", JSON.stringify(h.main)));
    return gr(h, "light", C, t), gr(h, "dark", T, t), h.contrastText || (h.contrastText = f(h.main)), h;
  }, v = {
    dark: kn,
    light: mr
  };
  return process.env.NODE_ENV !== "production" && (v[n] || console.error(`MUI: The palette mode \`${n}\` is not supported.`)), me(z({
    // A collection of common colors.
    common: z({}, We),
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
      color: u,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: d({
      color: l,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: d({
      color: s,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: d({
      color: c,
      name: "success"
    }),
    // The grey colors.
    grey: Fa,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: d,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: t
  }, v[n]), o);
}
const ri = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function ti(e) {
  return Math.round(e * 1e5) / 1e5;
}
const br = {
  textTransform: "uppercase"
}, yr = '"Roboto", "Helvetica", "Arial", sans-serif';
function oi(e, n) {
  const r = typeof n == "function" ? n(e) : n, {
    fontFamily: t = yr,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: u = 500,
    fontWeightBold: s = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: c = 16,
    // Apply the CSS properties to all the variants.
    allVariants: l,
    pxToRem: f
  } = r, d = Se(r, ri);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof c != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const v = o / 14, y = f || ((S) => `${S / c * v}rem`), h = (S, C, T, E, m) => z({
    fontFamily: t,
    fontWeight: S,
    fontSize: y(C),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: T
  }, t === yr ? {
    letterSpacing: `${ti(E / C)}em`
  } : {}, m, l), p = {
    h1: h(a, 96, 1.167, -1.5),
    h2: h(a, 60, 1.2, -0.5),
    h3: h(i, 48, 1.167, 0),
    h4: h(i, 34, 1.235, 0.25),
    h5: h(i, 24, 1.334, 0),
    h6: h(u, 20, 1.6, 0.15),
    subtitle1: h(i, 16, 1.75, 0.15),
    subtitle2: h(u, 14, 1.57, 0.1),
    body1: h(i, 16, 1.5, 0.15),
    body2: h(i, 14, 1.43, 0.15),
    button: h(u, 14, 1.75, 0.4, br),
    caption: h(i, 12, 1.66, 0.4),
    overline: h(i, 12, 2.66, 1, br),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return me(z({
    htmlFontSize: c,
    pxToRem: y,
    fontFamily: t,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: u,
    fontWeightBold: s
  }, p), d, {
    clone: !1
    // No need to clone deep
  });
}
const ai = 0.2, ii = 0.14, si = 0.12;
function W(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${ai})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ii})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${si})`].join(",");
}
const ci = ["none", W(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), W(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), W(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), W(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), W(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), W(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), W(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), W(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), W(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), W(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), W(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), W(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), W(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), W(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), W(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), W(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), W(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), W(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), W(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), W(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), W(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), W(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), W(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), W(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], li = ci, ui = ["duration", "easing", "delay"], di = {
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
function vr(e) {
  return `${Math.round(e)}ms`;
}
function fi(e) {
  if (!e)
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function hi(e) {
  const n = z({}, di, e.easing), r = z({}, pi, e.duration);
  return z({
    getAutoHeightDuration: fi,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: u = n.easeInOut,
        delay: s = 0
      } = a, c = Se(a, ui);
      if (process.env.NODE_ENV !== "production") {
        const l = (d) => typeof d == "string", f = (d) => !isNaN(parseFloat(d));
        !l(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(i) && !l(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), l(u) || console.error('MUI: Argument "easing" must be a string.'), !f(s) && !l(s) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(c).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((l) => `${l} ${typeof i == "string" ? i : vr(i)} ${u} ${typeof s == "string" ? s : vr(s)}`).join(",");
    }
  }, e, {
    easing: n,
    duration: r
  });
}
const mi = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, gi = mi, bi = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function yi(e = {}, ...n) {
  const {
    mixins: r = {},
    palette: t = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = Se(e, bi);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ve(18));
  const u = ni(t), s = Dn(e);
  let c = me(s, {
    mixins: za(s.breakpoints, r),
    palette: u,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: li.slice(),
    typography: oi(u, a),
    transitions: hi(o),
    zIndex: z({}, gi),
    applyDarkStyles(l) {
      return this.vars ? {
        [this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/, ":where($1)")]: l
      } : this.palette.mode === "dark" ? l : {};
    }
  });
  if (c = me(c, i), c = n.reduce((l, f) => me(l, f), c), process.env.NODE_ENV !== "production") {
    const l = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (d, v) => {
      let y;
      for (y in d) {
        const h = d[y];
        if (l.indexOf(y) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const p = An("", y);
            console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(d, null, 2), "", `Instead, you need to use the '&.${p}' syntax:`, JSON.stringify({
              root: {
                [`&.${p}`]: h
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          d[y] = {};
        }
      }
    };
    Object.keys(c.components).forEach((d) => {
      const v = c.components[d].styleOverrides;
      v && d.indexOf("Mui") === 0 && f(v, d);
    });
  }
  return c.unstable_sxConfig = z({}, Mn, i == null ? void 0 : i.unstable_sxConfig), c.unstable_sx = function(f) {
    return Bn({
      sx: f,
      theme: this
    });
  }, c;
}
const vi = yi(), Wr = vi, qr = "$$material";
function wi({
  props: e,
  name: n
}) {
  return Ia({
    props: e,
    name: n,
    defaultTheme: Wr,
    themeId: qr
  });
}
const xi = (e) => Je(e) && e !== "classes", ki = Ra({
  themeId: qr,
  defaultTheme: Wr,
  rootShouldForwardProp: xi
}), Si = ki;
function Ei(e) {
  return An("MuiSvgIcon", e);
}
vo("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Ci = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Ti = (e) => {
  const {
    color: n,
    fontSize: r,
    classes: t
  } = e, o = {
    root: ["root", n !== "inherit" && `color${be(n)}`, `fontSize${be(r)}`]
  };
  return ho(o, Ei, t);
}, _i = Si("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: r
    } = e;
    return [n.root, r.color !== "inherit" && n[`color${be(r.color)}`], n[`fontSize${be(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var r, t, o, a, i, u, s, c, l, f, d, v, y;
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
      medium: ((u = e.typography) == null || (s = u.pxToRem) == null ? void 0 : s.call(u, 24)) || "1.5rem",
      large: ((c = e.typography) == null || (l = c.pxToRem) == null ? void 0 : l.call(c, 35)) || "2.1875rem"
    }[n.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (f = (d = (e.vars || e).palette) == null || (d = d[n.color]) == null ? void 0 : d.main) != null ? f : {
      action: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.active,
      disabled: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[n.color]
  };
}), jn = /* @__PURE__ */ ae.forwardRef(function(n, r) {
  const t = wi({
    props: n,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: u = "svg",
    fontSize: s = "medium",
    htmlColor: c,
    inheritViewBox: l = !1,
    titleAccess: f,
    viewBox: d = "0 0 24 24"
  } = t, v = Se(t, Ci), y = /* @__PURE__ */ ae.isValidElement(o) && o.type === "svg", h = z({}, t, {
    color: i,
    component: u,
    fontSize: s,
    instanceFontSize: n.fontSize,
    inheritViewBox: l,
    viewBox: d,
    hasSvgAsChild: y
  }), p = {};
  l || (p.viewBox = d);
  const S = Ti(h);
  return /* @__PURE__ */ se(_i, z({
    as: u,
    className: ot(S.root, a),
    focusable: "false",
    color: c,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: r
  }, p, v, y && o.props, {
    ownerState: h,
    children: [y ? o.props.children : o, f ? /* @__PURE__ */ b("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (jn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: H.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: H.object,
  /**
   * @ignore
   */
  className: H.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: H.oneOfType([H.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), H.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: H.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: H.oneOfType([H.oneOf(["inherit", "large", "medium", "small"]), H.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: H.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: H.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: H.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: H.oneOfType([H.arrayOf(H.oneOfType([H.func, H.object, H.bool])), H.func, H.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: H.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: H.string
});
jn.muiName = "SvgIcon";
const wr = jn;
function Ni(e, n) {
  function r(t, o) {
    return /* @__PURE__ */ b(wr, z({
      "data-testid": `${n}Icon`,
      ref: o
    }, t, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${n}Icon`), r.muiName = wr.muiName, /* @__PURE__ */ ae.memo(/* @__PURE__ */ ae.forwardRef(r));
}
const Oi = Ni(/* @__PURE__ */ b("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Ji({
  menu: e,
  dataHandler: n,
  commandHandler: r,
  className: t,
  id: o,
  children: a
}) {
  const [i, u] = xe(!1), [s, c] = xe(!1), l = we(() => {
    i && u(!1), c(!1);
  }, [i]), f = we((S) => {
    S.stopPropagation(), u((C) => {
      const T = !C;
      return T && S.shiftKey ? c(!0) : T || c(!1), T;
    });
  }, []), d = Qe(void 0), [v, y] = xe(0);
  on(() => {
    i && d.current && y(d.current.clientHeight);
  }, [i]);
  const h = we(
    (S) => (l(), r(S)),
    [r, l]
  );
  let p = e;
  return !p && n && (p = n(s)), /* @__PURE__ */ b("div", { ref: d, style: { position: "relative" }, children: /* @__PURE__ */ b(gt, { position: "static", id: o, children: /* @__PURE__ */ se(bt, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    p ? /* @__PURE__ */ b(
      Er,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: f,
        children: /* @__PURE__ */ b(Oi, {})
      }
    ) : void 0,
    a ? /* @__PURE__ */ b("div", { className: "papi-menu-children", children: a }) : void 0,
    p ? /* @__PURE__ */ b(
      yt,
      {
        className: `papi-menu-drawer ${t ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: i,
        onClose: l,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: v
          }
        },
        children: /* @__PURE__ */ b(Kt, { commandHandler: h, columns: p.columns })
      }
    ) : void 0
  ] }) }) });
}
const Zi = (e, n) => {
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
function $i(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Ri = (e, n, r = {}) => {
  const t = Qe(n);
  t.current = n;
  const o = Qe(r);
  o.current = $i(o.current);
  const [a, i] = xe(() => t.current), [u, s] = xe(!0);
  return on(() => {
    let c = !0;
    return s(!!e), (async () => {
      if (e) {
        const l = await e();
        c && (i(() => l), s(!1));
      }
    })(), () => {
      c = !1, o.current.preserveValue || i(() => t.current);
    };
  }, [e]), [a, u];
}, Sn = () => !1, Qi = (e, n) => {
  const [r] = Ri(
    we(async () => {
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
function Ai(e, n = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), t = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), n === "top" && t ? r.insertBefore(o, t) : r.appendChild(o);
}
Ai(`.papi-button {
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
.pr-mr-2 {
    margin-right: 0.5rem;
}
.pr-mr-2\\.5 {
    margin-right: 0.625rem;
}
.pr-box-border {
    box-sizing: border-box;
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
.pr-h-5 {
    height: 1.25rem;
}
.pr-h-px {
    height: 1px;
}
.pr-w-0 {
    width: 0px;
}
.pr-w-0\\.5 {
    width: 0.125rem;
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
.pr-w-full {
    width: 100%;
}
.pr-min-w-\\[8rem\\] {
    min-width: 8rem;
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
.pr-flex-wrap {
    flex-wrap: wrap;
}
.pr-content-start {
    align-content: flex-start;
}
.pr-items-start {
    align-items: flex-start;
}
.pr-items-center {
    align-items: center;
}
.pr-justify-center {
    justify-content: center;
}
.pr-self-stretch {
    align-self: stretch;
}
.pr-overflow-hidden {
    overflow: hidden;
}
.pr-overflow-y-auto {
    overflow-y: auto;
}
.pr-rounded {
    border-radius: 0.25rem;
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
.pr-bg-muted {
    background-color: hsl(var(--muted));
}
.pr-bg-popover {
    background-color: hsl(var(--popover));
}
.pr-bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.pr-fill-current {
    fill: currentColor;
}
.pr-p-1 {
    padding: 0.25rem;
}
.pr-p-2 {
    padding: 0.5rem;
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
.pr-font-sans {
    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.pr-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.pr-text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}
.pr-font-normal {
    font-weight: 400;
}
.pr-font-semibold {
    font-weight: 600;
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
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
}
.pr-text-slate-700 {
    --tw-text-opacity: 1;
    color: rgb(51 65 85 / var(--tw-text-opacity));
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
.hover\\:pr-bg-amber-200:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(253 230 138 / var(--tw-bg-opacity));
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
}.papi-combo-box {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.selected {
  color: #78350F;
  background-color: #FFFBEB;
}

.ot {
  background-color: #FCA5A5;
}

.nt {
  background-color: #E9D5FF;
}

.dc {
  background-color: #C7D2FE;
}
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
  Li as BookChapterControl,
  Ae as Button,
  Ui as ChapterRangeSelector,
  qt as Checkbox,
  En as ComboBox,
  Kt as GridMenu,
  Gi as IconButton,
  ze as LabelPosition,
  Xt as MenuItem,
  Hi as RefSelector,
  Wi as SearchBar,
  qi as Slider,
  Xi as Snackbar,
  Yi as Switch,
  Ki as Table,
  en as TextField,
  Ji as Toolbar,
  Zi as useEvent,
  Qi as useEventAsync,
  Ri as usePromise
};
//# sourceMappingURL=index.js.map
