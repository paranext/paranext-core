import { jsxs as H, jsx as f, Fragment as lt } from "react/jsx-runtime";
import * as Y from "react";
import { forwardRef as dt, useState as fe, useRef as ar, useCallback as ke, useMemo as Ir, useEffect as dr } from "react";
import { getChaptersForBook as Tn, offsetBook as Hr, FIRST_SCR_BOOK_NUM as ut, offsetChapter as Wr, FIRST_SCR_CHAPTER_NUM as pt, offsetVerse as qr, FIRST_SCR_VERSE_NUM as ft } from "platform-bible-utils";
import * as ne from "@radix-ui/react-dropdown-menu";
import { ChevronRight as mt, Check as _n, Circle as On, History as ht, Tally1 as gt, ChevronDown as Rn, ChevronUp as bt } from "lucide-react";
import yt, { clsx as vt } from "clsx";
import { twMerge as wt } from "tailwind-merge";
import * as We from "@radix-ui/react-slider";
import * as Ke from "@radix-ui/react-radio-group";
import * as re from "@radix-ui/react-select";
import { Button as xt, Autocomplete as kt, TextField as $n, FormControlLabel as Yr, FormLabel as St, Checkbox as Et, MenuItem as Ct, Grid as In, IconButton as An, Paper as Nt, Slider as Tt, Snackbar as _t, Switch as Ot, AppBar as Rt, Toolbar as $t, Drawer as It } from "@mui/material";
import At, { SelectColumn as Pt } from "react-data-grid";
import Mt, { ThemeContext as Bt, internal_processStyles as zt } from "@mui/styled-engine";
var Dt = Object.defineProperty, jt = (e, r, n) => r in e ? Dt(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[r] = n, P = (e, r, n) => (jt(e, typeof r != "symbol" ? r + "" : r, n), n);
const Re = [
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
], Ar = [
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
], Pn = [
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
], Kr = Yt();
function Ge(e, r = !0) {
  return r && (e = e.toUpperCase()), e in Kr ? Kr[e] : 0;
}
function Pr(e) {
  return Ge(e) > 0;
}
function Vt(e) {
  const r = typeof e == "string" ? Ge(e) : e;
  return r >= 40 && r <= 66;
}
function Ft(e) {
  return (typeof e == "string" ? Ge(e) : e) <= 39;
}
function Mn(e) {
  return e <= 66;
}
function Lt(e) {
  const r = typeof e == "string" ? Ge(e) : e;
  return Dn(r) && !Mn(r);
}
function* Ut() {
  for (let e = 1; e <= Re.length; e++)
    yield e;
}
const Gt = 1, Bn = Re.length;
function Xt() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Mr(e, r = "***") {
  const n = e - 1;
  return n < 0 || n >= Re.length ? r : Re[n];
}
function zn(e) {
  return e <= 0 || e > Bn ? "******" : Pn[e - 1];
}
function Ht(e) {
  return zn(Ge(e));
}
function Dn(e) {
  const r = typeof e == "number" ? Mr(e) : e;
  return Pr(r) && !Ar.includes(r);
}
function Wt(e) {
  const r = typeof e == "number" ? Mr(e) : e;
  return Pr(r) && Ar.includes(r);
}
function qt(e) {
  return Pn[e - 1].includes("*obsolete*");
}
function Yt() {
  const e = {};
  for (let r = 0; r < Re.length; r++)
    e[Re[r]] = r + 1;
  return e;
}
const oe = {
  allBookIds: Re,
  nonCanonicalIds: Ar,
  bookIdToNumber: Ge,
  isBookIdValid: Pr,
  isBookNT: Vt,
  isBookOT: Ft,
  isBookOTNT: Mn,
  isBookDC: Lt,
  allBookNumbers: Ut,
  firstBook: Gt,
  lastBook: Bn,
  extraBooks: Xt,
  bookNumberToId: Mr,
  bookNumberToEnglishName: zn,
  bookIdToEnglishName: Ht,
  isCanonical: Dn,
  isExtraMaterial: Wt,
  isObsolete: qt
};
var Ce = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ce || {});
const Oe = class {
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
let me = Oe;
P(me, "Original", new Oe(Ce.Original)), P(me, "Septuagint", new Oe(Ce.Septuagint)), P(me, "Vulgate", new Oe(Ce.Vulgate)), P(me, "English", new Oe(Ce.English)), P(me, "RussianProtestant", new Oe(Ce.RussianProtestant)), P(me, "RussianOrthodox", new Oe(Ce.RussianOrthodox));
function Jr(e, r) {
  const n = r[0];
  for (let t = 1; t < r.length; t++)
    e = e.split(r[t]).join(n);
  return e.split(n);
}
var jn = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(jn || {});
const I = class {
  constructor(e, r, n, t) {
    if (P(this, "firstChapter"), P(this, "lastChapter"), P(this, "lastVerse"), P(this, "hasSegmentsDefined"), P(this, "text"), P(this, "BBBCCCVVVS"), P(this, "longHashCode"), P(this, "versification"), P(this, "rtlMark", "‏"), P(this, "_bookNum", 0), P(this, "_chapterNum", 0), P(this, "_verseNum", 0), P(this, "_verse"), n == null && t == null)
      if (e != null && typeof e == "string") {
        const o = e, a = r != null && r instanceof me ? r : void 0;
        this.setEmpty(a), this.parse(o);
      } else if (e != null && typeof e == "number") {
        const o = r != null && r instanceof me ? r : void 0;
        this.setEmpty(o), this._verseNum = e % I.chapterDigitShifter, this._chapterNum = Math.floor(
          e % I.bookDigitShifter / I.chapterDigitShifter
        ), this._bookNum = Math.floor(e / I.bookDigitShifter);
      } else if (r == null)
        if (e != null && e instanceof I) {
          const o = e;
          this._bookNum = o.bookNum, this._chapterNum = o.chapterNum, this._verseNum = o.verseNum, this._verse = o.verse, this.versification = o.versification;
        } else {
          if (e == null)
            return;
          const o = e instanceof me ? e : I.defaultVersification;
          this.setEmpty(o);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && r != null && n != null)
      if (typeof e == "string" && typeof r == "string" && typeof n == "string")
        this.setEmpty(t), this.updateInternal(e, r, n);
      else if (typeof e == "number" && typeof r == "number" && typeof n == "number")
        this._bookNum = e, this._chapterNum = r, this._verseNum = n, this.versification = t ?? I.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, r = I.defaultVersification) {
    const n = new I(r);
    return n.parse(e), n;
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
    let r;
    try {
      return r = I.parse(e), { success: !0, verseRef: r };
    } catch (n) {
      if (n instanceof Xe)
        return r = new I(), { success: !1, verseRef: r };
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
  static getBBBCCCVVV(e, r, n) {
    return e % I.bcvMaxValue * I.bookDigitShifter + (r >= 0 ? r % I.bcvMaxValue * I.chapterDigitShifter : 0) + (n >= 0 ? n % I.bcvMaxValue : 0);
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let r;
    if (!e)
      return r = -1, { success: !0, vNum: r };
    r = 0;
    let n;
    for (let t = 0; t < e.length; t++) {
      if (n = e[t], n < "0" || n > "9")
        return t === 0 && (r = -1), { success: !1, vNum: r };
      if (r = r * 10 + +n - +"0", r > I.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(I.verseRangeSeparator) || this._verse.includes(I.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return oe.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = oe.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const r = +e;
    this._chapterNum = Number.isInteger(r) ? r : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: r, vNum: n } = I.tryGetVerseNum(e);
    this._verse = r ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = I.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > oe.lastBook)
      throw new Xe(
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
    this.versification = this.versification != null ? new me(e) : void 0;
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
          this.versification = new me(Ce[a]);
        } catch {
          throw new Xe("Invalid reference : " + e);
        }
    }
    const r = e.trim().split(" ");
    if (r.length !== 2)
      throw new Xe("Invalid reference : " + e);
    const n = r[1].split(":"), t = +n[0];
    if (n.length !== 2 || oe.bookIdToNumber(r[0]) === 0 || !Number.isInteger(t) || t < 0 || !I.isVerseParseable(n[1]))
      throw new Xe("Invalid reference : " + e);
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
  allVerses(e = !1, r = I.verseRangeSeparators, n = I.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const t = [], o = Jr(this._verse, n);
    for (const a of o.map((i) => Jr(i, r))) {
      const i = this.clone();
      i.verse = a[0];
      const l = i.verseNum;
      if (t.push(i), a.length > 1) {
        const c = this.clone();
        if (c.verse = a[1], !e)
          for (let s = l + 1; s < c.verseNum; s++) {
            const d = new I(
              this._bookNum,
              this._chapterNum,
              s,
              this.versification
            );
            this.isExcluded || t.push(d);
          }
        t.push(c);
      }
    }
    return t;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, r) {
    if (!this.verse)
      return this.internalValid;
    let n = 0;
    for (const t of this.allVerses(!0, e, r)) {
      const o = t.internalValid;
      if (o !== 0)
        return o;
      const a = t.BBBCCCVVV;
      if (n > a)
        return 3;
      if (n === a)
        return 4;
      n = a;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > oe.lastBook ? 2 : 0;
  }
  setEmpty(e = I.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, r, n) {
    this.bookNum = oe.bookIdToNumber(e), this.chapter = r, this.verse = n;
  }
};
let xe = I;
P(xe, "defaultVersification", me.English), P(xe, "verseRangeSeparator", "-"), P(xe, "verseSequenceIndicator", ","), P(xe, "verseRangeSeparators", [I.verseRangeSeparator]), P(xe, "verseSequenceIndicators", [I.verseSequenceIndicator]), P(xe, "chapterDigitShifter", 1e3), P(xe, "bookDigitShifter", I.chapterDigitShifter * I.chapterDigitShifter), P(xe, "bcvMaxValue", I.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
P(xe, "ValidStatusType", jn);
class Xe extends Error {
}
function W(...e) {
  return wt(vt(e));
}
const Kt = ne.Root, Jt = ne.Trigger, Zt = Y.forwardRef(({ className: e, inset: r, children: n, ...t }, o) => /* @__PURE__ */ H(
  ne.SubTrigger,
  {
    ref: o,
    className: W(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      r && "pr-pl-8",
      e
    ),
    ...t,
    children: [
      n,
      /* @__PURE__ */ f(mt, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Zt.displayName = ne.SubTrigger.displayName;
const Qt = Y.forwardRef(({ className: e, ...r }, n) => /* @__PURE__ */ f(
  ne.SubContent,
  {
    ref: n,
    className: W(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
));
Qt.displayName = ne.SubContent.displayName;
const Vn = Y.forwardRef(({ className: e, sideOffset: r = 4, ...n }, t) => /* @__PURE__ */ f(ne.Portal, { children: /* @__PURE__ */ f(
  ne.Content,
  {
    ref: t,
    sideOffset: r,
    className: W(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Vn.displayName = ne.Content.displayName;
const qe = Y.forwardRef(({ className: e, inset: r, ...n }, t) => /* @__PURE__ */ f(
  ne.Item,
  {
    ref: t,
    className: W(
      // removed: pr-relative pr-flex
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      r && "pr-pl-8",
      e
    ),
    ...n
  }
));
qe.displayName = ne.Item.displayName;
const eo = Y.forwardRef(({ className: e, children: r, checked: n, ...t }, o) => /* @__PURE__ */ H(
  ne.CheckboxItem,
  {
    ref: o,
    className: W(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...t,
    children: [
      /* @__PURE__ */ f("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ f(ne.ItemIndicator, { children: /* @__PURE__ */ f(_n, { className: "pr-h-4 pr-w-4" }) }) }),
      r
    ]
  }
));
eo.displayName = ne.CheckboxItem.displayName;
const ro = Y.forwardRef(({ className: e, children: r, ...n }, t) => /* @__PURE__ */ H(
  ne.RadioItem,
  {
    ref: t,
    className: W(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ f("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ f(ne.ItemIndicator, { children: /* @__PURE__ */ f(On, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      r
    ]
  }
));
ro.displayName = ne.RadioItem.displayName;
const Fn = Y.forwardRef(({ className: e, inset: r, ...n }, t) => /* @__PURE__ */ f(
  ne.Label,
  {
    ref: t,
    className: W("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", r && "pr-pl-8", e),
    ...n
  }
));
Fn.displayName = ne.Label.displayName;
const Ln = Y.forwardRef(({ className: e, ...r }, n) => /* @__PURE__ */ f(
  ne.Separator,
  {
    ref: n,
    className: W("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...r
  }
));
Ln.displayName = ne.Separator.displayName;
const Un = Y.forwardRef(({ className: e, ...r }, n) => /* @__PURE__ */ H(
  We.Root,
  {
    ref: n,
    className: W(
      "pr-relative pr-flex pr-w-3/4 pr-touch-none pr-select-none pr-items-center pr-justify-end",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ f(We.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ f(We.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ f(We.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
Un.displayName = We.Root.displayName;
const Gn = Y.forwardRef(
  ({ className: e, type: r, ...n }, t) => /* @__PURE__ */ f(
    "input",
    {
      type: r,
      className: W(
        "pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: t,
      ...n
    }
  )
);
Gn.displayName = "Input";
const no = dt(
  ({ handleSearch: e, handleKeyDown: r, ...n }, t) => /* @__PURE__ */ H("div", { style: { position: "relative", display: "inline-block" }, children: [
    /* @__PURE__ */ f(
      Gn,
      {
        ...n,
        style: { outline: 0, paddingRight: "40px" },
        type: "text",
        className: "pr-box-border pr-rounded-lg pr-bg-white pr-text-slate-700 pr-shadow-none",
        onChange: (o) => e(o.target.value),
        onKeyUp: r,
        ref: t
      }
    ),
    /* @__PURE__ */ f(
      "div",
      {
        style: {
          position: "absolute",
          transform: "translateY(-50%)",
          top: "20px",
          right: "16px"
        },
        className: "pr-cursor-pointer",
        children: /* @__PURE__ */ f(
          ht,
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
function to({ endChapter: e, activeChapter: r, handleSelectChapter: n }) {
  const t = Array.from({ length: e }, (o, a) => a + 1);
  return /* @__PURE__ */ f("div", { className: "pr-flex pr-flex-wrap pr-content-start pr-items-start pr-self-stretch pr-bg-amber-50", children: t.map((o) => (
    // When adding onClick to <div> get error: Visible, non-interactive elements with click handlers must have at least one keyboard listener.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    /* @__PURE__ */ f(
      "div",
      {
        className: W(
          "pr-h-5 pr-w-5 pr-cursor-pointer pr-items-center pr-justify-center pr-rounded pr-p-2 pr-text-amber-800",
          "hover:pr-bg-amber-200",
          `${o === r}`
        ),
        onClick: () => n(o),
        children: o
      },
      o
    )
  )) });
}
function oo({
  bookId: e,
  handleSelectBook: r,
  isSelected: n,
  bookType: t,
  children: o
}) {
  return /* @__PURE__ */ H(
    qe,
    {
      textValue: e,
      className: W("pr-font-sans pr-font-normal pr-text-slate-700", n ?? "selected"),
      onSelect: (a) => {
        a.preventDefault(), r(e);
      },
      children: [
        /* @__PURE__ */ f(gt, { className: W("pr-mr-2.5 pr-h-4 pr-w-0.5", `${t.toLowerCase()}`) }),
        oe.bookIdToEnglishName(e),
        n && /* @__PURE__ */ f("div", { children: o }),
        " "
      ]
    },
    e
  );
}
const Xn = Y.forwardRef(({ className: e, ...r }, n) => /* @__PURE__ */ f(Ke.Root, { className: W("pr-grid pr-gap-2", e), ...r, ref: n }));
Xn.displayName = Ke.Root.displayName;
const nr = Y.forwardRef(({ className: e, ...r }, n) => /* @__PURE__ */ f(
  Ke.Item,
  {
    ref: n,
    className: W(
      "pr-aspect-square pr-h-4 pr-w-4 pr-rounded-full pr-border pr-border-primary pr-text-primary pr-ring-offset-background focus:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
      e
    ),
    ...r,
    children: /* @__PURE__ */ f(Ke.Indicator, { className: "pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ f(On, { className: "pr-h-2.5 pr-w-2.5 pr-fill-current pr-text-current" }) })
  }
));
nr.displayName = Ke.Item.displayName;
const ao = re.Root, io = re.Group, so = re.Value, Hn = Y.forwardRef(({ className: e, children: r, ...n }, t) => /* @__PURE__ */ H(
  re.Trigger,
  {
    ref: t,
    className: W(
      "pr-flex pr-h-10 pr-w-3/4 pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ f(re.Icon, { asChild: !0, children: /* @__PURE__ */ f(Rn, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Hn.displayName = re.Trigger.displayName;
const Wn = Y.forwardRef(({ className: e, ...r }, n) => /* @__PURE__ */ f(
  re.ScrollUpButton,
  {
    ref: n,
    className: W("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...r,
    children: /* @__PURE__ */ f(bt, { className: "pr-h-4 pr-w-4" })
  }
));
Wn.displayName = re.ScrollUpButton.displayName;
const qn = Y.forwardRef(({ className: e, ...r }, n) => /* @__PURE__ */ f(
  re.ScrollDownButton,
  {
    ref: n,
    className: W("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...r,
    children: /* @__PURE__ */ f(Rn, { className: "pr-h-4 pr-w-4" })
  }
));
qn.displayName = re.ScrollDownButton.displayName;
const Yn = Y.forwardRef(({ className: e, children: r, position: n = "popper", ...t }, o) => /* @__PURE__ */ f(re.Portal, { children: /* @__PURE__ */ H(
  re.Content,
  {
    ref: o,
    className: W(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...t,
    children: [
      /* @__PURE__ */ f(Wn, {}),
      /* @__PURE__ */ f(
        re.Viewport,
        {
          className: W(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: r
        }
      ),
      /* @__PURE__ */ f(qn, {})
    ]
  }
) }));
Yn.displayName = re.Content.displayName;
const Kn = Y.forwardRef(({ className: e, ...r }, n) => /* @__PURE__ */ f(
  re.Label,
  {
    ref: n,
    className: W("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...r
  }
));
Kn.displayName = re.Label.displayName;
const je = Y.forwardRef(({ className: e, children: r, ...n }, t) => /* @__PURE__ */ H(
  re.Item,
  {
    ref: t,
    className: W(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ f("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ f(re.ItemIndicator, { children: /* @__PURE__ */ f(_n, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ f(re.ItemText, { children: r })
    ]
  }
));
je.displayName = re.Item.displayName;
const co = Y.forwardRef(({ className: e, ...r }, n) => /* @__PURE__ */ f(
  re.Separator,
  {
    ref: n,
    className: W("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...r
  }
));
co.displayName = re.Separator.displayName;
const lo = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, uo = ["OT", "NT", "DC"];
function is({ scrRef: e, handleSubmit: r }) {
  const { allBookIds: n } = oe, [t, o] = fe(""), [a, i] = fe(""), [l, c] = fe(100), [s, d] = fe(""), [m, u] = fe(""), [v, y] = fe(!1), h = ar(void 0), p = ke(
    (T) => ({
      OT: n.filter((E) => oe.isBookOT(E)),
      NT: n.filter((E) => oe.isBookNT(E)),
      DC: n.filter((E) => oe.isBookDC(E))
    })[T],
    [n]
  ), S = ke(
    (T) => p(T).filter(
      (J) => oe.bookIdToEnglishName(J).toLowerCase().includes(t.toLowerCase()) || J.toLowerCase().includes(t.toLowerCase())
    ),
    [p, t]
  ), K = (T) => {
    o(T);
  }, A = ke((T) => Tn(oe.bookIdToNumber(T)), []), C = (T) => {
    i(a !== T ? T : ""), A(T) === -1 && (r({
      bookNum: oe.bookIdToNumber(T),
      chapterNum: 1,
      verseNum: 1
    }), y(!1), o(""));
  }, g = (T) => {
    r({
      bookNum: oe.bookIdToNumber(a),
      chapterNum: T,
      verseNum: 1
    }), y(!1), o("");
  }, ae = ke((T) => {
    !T && document.activeElement === h.current ? y(!0) : y(T);
  }, []), se = ke(() => h.current.focus(), []);
  return /* @__PURE__ */ f("div", { children: /* @__PURE__ */ H(Kt, { modal: !1, open: v, onOpenChange: ae, children: [
    /* @__PURE__ */ f(Jt, { asChild: !0, children: /* @__PURE__ */ f(
      no,
      {
        ref: h,
        value: t,
        handleSearch: K,
        handleKeyDown: () => y(!0),
        placeholder: `${oe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ H(
      Vn,
      {
        className: "pr-overflow-y-auto pr-font-sans pr-font-normal pr-text-slate-700",
        style: { width: "300px", maxHeight: "500px" },
        onKeyDown: se,
        children: [
          /* @__PURE__ */ H(
            qe,
            {
              className: W(
                "pr-flex pr-justify-between pr-font-sans pr-font-normal pr-text-slate-700"
              ),
              children: [
                `Zoom: ${l}%`,
                /* @__PURE__ */ f(
                  Un,
                  {
                    defaultValue: [100],
                    value: [l],
                    min: 50,
                    max: 200,
                    step: 1,
                    onValueChange: ([T]) => {
                      c(T);
                    }
                  }
                )
              ]
            },
            1
          ),
          /* @__PURE__ */ H(
            qe,
            {
              className: W(
                "pr-flex pr-justify-between pr-font-sans pr-font-normal pr-text-slate-700"
              ),
              children: [
                "Fruit:",
                /* @__PURE__ */ H(
                  ao,
                  {
                    onValueChange: (T) => {
                      d(T);
                    },
                    value: s,
                    children: [
                      /* @__PURE__ */ f(Hn, { children: /* @__PURE__ */ f(so, { placeholder: "Select a fruit" }) }),
                      /* @__PURE__ */ f(Yn, { children: /* @__PURE__ */ H(io, { children: [
                        /* @__PURE__ */ f(Kn, { children: "Fruits" }),
                        /* @__PURE__ */ f(je, { value: "apple", children: "Apple" }),
                        /* @__PURE__ */ f(je, { value: "banana", children: "Banana" }),
                        /* @__PURE__ */ f(je, { value: "blueberry", children: "Blueberry" }),
                        /* @__PURE__ */ f(je, { value: "grapes", children: "Grapes" }),
                        /* @__PURE__ */ f(je, { value: "pineapple", children: "Pineapple" })
                      ] }) })
                    ]
                  }
                )
              ]
            },
            1
          ),
          /* @__PURE__ */ H(
            qe,
            {
              className: W(
                "pr-flex pr-justify-between pr-font-sans pr-font-normal pr-text-slate-700"
              ),
              children: [
                "Scroll with:",
                /* @__PURE__ */ H(
                  Xn,
                  {
                    orientation: "horizontal",
                    defaultValue: "a",
                    onValueChange: (T) => {
                      u(T);
                    },
                    value: m,
                    children: [
                      /* @__PURE__ */ H("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
                        /* @__PURE__ */ f(nr, { value: "a", id: "r1" }),
                        "A"
                      ] }),
                      /* @__PURE__ */ H("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
                        /* @__PURE__ */ f(nr, { value: "b", id: "r2" }),
                        "B"
                      ] }),
                      /* @__PURE__ */ H("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
                        /* @__PURE__ */ f(nr, { value: "c", id: "r3" }),
                        "C"
                      ] })
                    ]
                  }
                )
              ]
            },
            1
          ),
          uo.map((T) => /* @__PURE__ */ H("div", { children: [
            /* @__PURE__ */ f(Fn, { className: "pr-font-semibold pr-text-slate-700", children: lo[T] }),
            S(T).map((J) => /* @__PURE__ */ f("div", { children: /* @__PURE__ */ f(
              oo,
              {
                bookId: J,
                handleSelectBook: () => C(J),
                isSelected: a === J,
                bookType: T,
                children: /* @__PURE__ */ f(
                  to,
                  {
                    handleSelectChapter: g,
                    endChapter: A(J),
                    activeChapter: e.bookNum === oe.bookIdToNumber(J) ? e.chapterNum : 0
                  }
                )
              }
            ) }, J)),
            T === "OT" || T === "NT" ? /* @__PURE__ */ f(Ln, {}) : void 0
          ] }, T))
        ]
      }
    )
  ] }) });
}
function Ae({
  id: e,
  isDisabled: r = !1,
  className: n,
  onClick: t,
  onContextMenu: o,
  children: a
}) {
  return /* @__PURE__ */ f(
    xt,
    {
      id: e,
      disabled: r,
      className: `papi-button ${n ?? ""}`,
      onClick: t,
      onContextMenu: o,
      children: a
    }
  );
}
function Or({
  id: e,
  title: r,
  isDisabled: n = !1,
  isClearable: t = !0,
  hasError: o = !1,
  isFullWidth: a = !1,
  width: i,
  options: l = [],
  className: c,
  value: s,
  onChange: d,
  onFocus: m,
  onBlur: u,
  getOptionLabel: v
}) {
  return /* @__PURE__ */ f(
    kt,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !t,
      fullWidth: a,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: s,
      onChange: d,
      onFocus: m,
      onBlur: u,
      getOptionLabel: v,
      renderInput: (y) => /* @__PURE__ */ f(
        $n,
        {
          ...y,
          error: o,
          fullWidth: a,
          disabled: n,
          label: r,
          style: { width: i }
        }
      )
    }
  );
}
function ss({
  startChapter: e,
  endChapter: r,
  handleSelectStartChapter: n,
  handleSelectEndChapter: t,
  isDisabled: o,
  chapterCount: a
}) {
  const i = Ir(
    () => Array.from({ length: a }, (s, d) => d + 1),
    [a]
  ), l = (s, d) => {
    n(d), d > r && t(d);
  }, c = (s, d) => {
    t(d), d < e && n(d);
  };
  return /* @__PURE__ */ H(lt, { children: [
    /* @__PURE__ */ f(
      Yr,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ f(
          Or,
          {
            onChange: (s, d) => l(s, d),
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
    /* @__PURE__ */ f(
      Yr,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ f(
          Or,
          {
            onChange: (s, d) => c(s, d),
            className: "book-selection-chapter",
            isClearable: !1,
            options: i,
            getOptionLabel: (s) => s.toString(),
            value: r,
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
var Ve = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Ve || {});
function po({
  id: e,
  isChecked: r,
  labelText: n = "",
  labelPosition: t = Ve.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: s
}) {
  const d = /* @__PURE__ */ f(
    Et,
    {
      id: e,
      checked: r,
      indeterminate: o,
      defaultChecked: a,
      disabled: i,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: s
    }
  );
  let m;
  if (n) {
    const u = t === Ve.Before || t === Ve.Above, v = /* @__PURE__ */ f("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), y = t === Ve.Before || t === Ve.After, h = y ? v : /* @__PURE__ */ f("div", { children: v }), p = y ? d : /* @__PURE__ */ f("div", { children: d });
    m = /* @__PURE__ */ H(
      St,
      {
        className: `papi-checkbox ${t.toString()}`,
        disabled: i,
        error: l,
        children: [
          u && h,
          p,
          !u && h
        ]
      }
    );
  } else
    m = d;
  return m;
}
function fo(e) {
  const {
    onClick: r,
    name: n,
    hasAutoFocus: t = !1,
    className: o,
    isDense: a = !0,
    hasDisabledGutters: i = !1,
    hasDivider: l = !1,
    focusVisibleClassName: c,
    id: s,
    children: d
  } = e;
  return /* @__PURE__ */ f(
    Ct,
    {
      autoFocus: t,
      className: o,
      dense: a,
      disableGutters: i,
      divider: l,
      focusVisibleClassName: c,
      onClick: r,
      id: s,
      children: n || d
    }
  );
}
function mo({ commandHandler: e, name: r, className: n, items: t, id: o }) {
  return /* @__PURE__ */ H(In, { id: o, item: !0, xs: "auto", className: `papi-menu-column ${n ?? ""}`, children: [
    /* @__PURE__ */ f("h3", { className: `papi-menu ${n ?? ""}`, children: r }),
    t.map((a, i) => /* @__PURE__ */ f(
      fo,
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
function ho({ commandHandler: e, className: r, columns: n, id: t }) {
  return /* @__PURE__ */ f(
    In,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${r ?? ""}`,
      columns: n.length,
      id: t,
      children: n.map((o, a) => /* @__PURE__ */ f(
        mo,
        {
          commandHandler: e,
          name: o.name,
          className: r,
          items: o.items
        },
        a
      ))
    }
  );
}
function cs({
  id: e,
  label: r,
  isDisabled: n = !1,
  tooltip: t,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: c,
  children: s
}) {
  return /* @__PURE__ */ f(
    An,
    {
      id: e,
      disabled: n,
      edge: a,
      size: i,
      "aria-label": r,
      title: o ? void 0 : t ?? r,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: s
    }
  );
}
function ir({
  variant: e = "outlined",
  id: r,
  isDisabled: n = !1,
  hasError: t = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: i,
  placeholder: l,
  isRequired: c = !1,
  className: s,
  defaultValue: d,
  value: m,
  onChange: u,
  onFocus: v,
  onBlur: y
}) {
  return /* @__PURE__ */ f(
    $n,
    {
      variant: e,
      id: r,
      disabled: n,
      error: t,
      fullWidth: o,
      helperText: a,
      label: i,
      placeholder: l,
      required: c,
      className: `papi-textfield ${s ?? ""}`,
      defaultValue: d,
      value: m,
      onChange: u,
      onFocus: v,
      onBlur: y
    }
  );
}
let vr;
const wr = () => (vr || (vr = oe.allBookIds.map((e) => ({
  bookId: e,
  label: oe.bookIdToEnglishName(e)
}))), vr);
function ls({ scrRef: e, handleSubmit: r, id: n }) {
  const t = (c) => {
    r(c);
  }, o = (c, s) => {
    const m = { bookNum: oe.bookIdToNumber(s.bookId), chapterNum: 1, verseNum: 1 };
    t(m);
  }, a = (c) => {
    r({ ...e, chapterNum: +c.target.value });
  }, i = (c) => {
    r({ ...e, verseNum: +c.target.value });
  }, l = Ir(() => wr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ H("span", { id: n, children: [
    /* @__PURE__ */ f(
      Or,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: wr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ f(
      Ae,
      {
        onClick: () => t(Hr(e, -1)),
        isDisabled: e.bookNum <= ut,
        children: "<"
      }
    ),
    /* @__PURE__ */ f(
      Ae,
      {
        onClick: () => t(Hr(e, 1)),
        isDisabled: e.bookNum >= wr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ f(
      ir,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ f(
      Ae,
      {
        onClick: () => r(Wr(e, -1)),
        isDisabled: e.chapterNum <= pt,
        children: "<"
      }
    ),
    /* @__PURE__ */ f(
      Ae,
      {
        onClick: () => r(Wr(e, 1)),
        isDisabled: e.chapterNum >= Tn(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ f(
      ir,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ f(
      Ae,
      {
        onClick: () => r(qr(e, -1)),
        isDisabled: e.verseNum <= ft,
        children: "<"
      }
    ),
    /* @__PURE__ */ f(Ae, { onClick: () => r(qr(e, 1)), children: ">" })
  ] });
}
function ds({ onSearch: e, placeholder: r, isFullWidth: n }) {
  const [t, o] = fe(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ f(Nt, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ f(
    ir,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: r,
      value: t,
      onChange: (i) => a(i.target.value)
    }
  ) });
}
function us({
  id: e,
  isDisabled: r = !1,
  orientation: n = "horizontal",
  min: t = 0,
  max: o = 100,
  step: a = 1,
  showMarks: i = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: s = "off",
  className: d,
  onChange: m,
  onChangeCommitted: u
}) {
  return /* @__PURE__ */ f(
    Tt,
    {
      id: e,
      disabled: r,
      orientation: n,
      min: t,
      max: o,
      step: a,
      marks: i,
      defaultValue: l,
      value: c,
      valueLabelDisplay: s,
      className: `papi-slider ${n} ${d ?? ""}`,
      onChange: m,
      onChangeCommitted: u
    }
  );
}
function ps({
  autoHideDuration: e = void 0,
  id: r,
  isOpen: n = !1,
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
  return /* @__PURE__ */ f(
    _t,
    {
      autoHideDuration: e ?? void 0,
      open: n,
      onClose: o,
      anchorOrigin: a,
      id: r,
      ContentProps: c
    }
  );
}
function fs({
  id: e,
  isChecked: r,
  isDisabled: n = !1,
  hasError: t = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ f(
    Ot,
    {
      id: e,
      checked: r,
      disabled: n,
      className: `papi-switch ${t ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function Zr({ onRowChange: e, row: r, column: n }) {
  const t = (o) => {
    e({ ...r, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ f(ir, { defaultValue: r[n.key], onChange: t });
}
const go = ({ onChange: e, disabled: r, checked: n, ...t }) => /* @__PURE__ */ f(
  po,
  {
    ...t,
    isChecked: n,
    isDisabled: r,
    onChange: (a) => {
      e(a.target.checked, a.nativeEvent.shiftKey);
    }
  }
);
function ms({
  columns: e,
  sortColumns: r,
  onSortColumnsChange: n,
  onColumnResize: t,
  defaultColumnWidth: o,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: i,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: s,
  enableSelectColumn: d,
  selectColumnWidth: m = 50,
  rowKeyGetter: u,
  rowHeight: v = 35,
  headerRowHeight: y = 35,
  selectedRows: h,
  onSelectedRowsChange: p,
  onRowsChange: S,
  onCellClick: K,
  onCellDoubleClick: A,
  onCellContextMenu: C,
  onCellKeyDown: g,
  direction: ae = "ltr",
  enableVirtualization: se = !0,
  onCopy: T,
  onPaste: J,
  onScroll: E,
  className: Z
  // id,
}) {
  const ie = Ir(() => {
    const de = e.map((G) => typeof G.editable == "function" ? {
      ...G,
      editable: (ce) => !!G.editable(ce),
      renderEditCell: G.renderEditCell || Zr
    } : G.editable && !G.renderEditCell ? { ...G, renderEditCell: Zr } : G.renderEditCell && !G.editable ? { ...G, editable: !1 } : G);
    return d ? [{ ...Pt, minWidth: m }, ...de] : de;
  }, [e, d, m]);
  return /* @__PURE__ */ f(
    At,
    {
      columns: ie,
      defaultColumnOptions: {
        width: o,
        minWidth: a,
        maxWidth: i,
        sortable: l,
        resizable: c
      },
      sortColumns: r,
      onSortColumnsChange: n,
      onColumnResize: t,
      rows: s,
      rowKeyGetter: u,
      rowHeight: v,
      headerRowHeight: y,
      selectedRows: h,
      onSelectedRowsChange: p,
      onRowsChange: S,
      onCellClick: K,
      onCellDoubleClick: A,
      onCellContextMenu: C,
      onCellKeyDown: g,
      direction: ae,
      enableVirtualization: se,
      onCopy: T,
      onPaste: J,
      onScroll: E,
      renderers: { renderCheckbox: go },
      className: Z ?? "rdg-light"
    }
  );
}
function D() {
  return D = Object.assign ? Object.assign.bind() : function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var n = arguments[r];
      for (var t in n)
        Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
    }
    return e;
  }, D.apply(this, arguments);
}
function Ne(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const r = Object.getPrototypeOf(e);
  return (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Jn(e) {
  if (!Ne(e))
    return e;
  const r = {};
  return Object.keys(e).forEach((n) => {
    r[n] = Jn(e[n]);
  }), r;
}
function ye(e, r, n = {
  clone: !0
}) {
  const t = n.clone ? D({}, e) : e;
  return Ne(e) && Ne(r) && Object.keys(r).forEach((o) => {
    o !== "__proto__" && (Ne(r[o]) && o in e && Ne(e[o]) ? t[o] = ye(e[o], r[o], n) : n.clone ? t[o] = Ne(r[o]) ? Jn(r[o]) : r[o] : t[o] = r[o]);
  }), t;
}
function bo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Rr = { exports: {} }, rr = { exports: {} }, V = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qr;
function yo() {
  if (Qr)
    return V;
  Qr = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, m = e ? Symbol.for("react.suspense") : 60113, u = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, p = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, K = e ? Symbol.for("react.scope") : 60119;
  function A(g) {
    if (typeof g == "object" && g !== null) {
      var ae = g.$$typeof;
      switch (ae) {
        case r:
          switch (g = g.type, g) {
            case c:
            case s:
            case t:
            case a:
            case o:
            case m:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case l:
                case d:
                case y:
                case v:
                case i:
                  return g;
                default:
                  return ae;
              }
          }
        case n:
          return ae;
      }
    }
  }
  function C(g) {
    return A(g) === s;
  }
  return V.AsyncMode = c, V.ConcurrentMode = s, V.ContextConsumer = l, V.ContextProvider = i, V.Element = r, V.ForwardRef = d, V.Fragment = t, V.Lazy = y, V.Memo = v, V.Portal = n, V.Profiler = a, V.StrictMode = o, V.Suspense = m, V.isAsyncMode = function(g) {
    return C(g) || A(g) === c;
  }, V.isConcurrentMode = C, V.isContextConsumer = function(g) {
    return A(g) === l;
  }, V.isContextProvider = function(g) {
    return A(g) === i;
  }, V.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === r;
  }, V.isForwardRef = function(g) {
    return A(g) === d;
  }, V.isFragment = function(g) {
    return A(g) === t;
  }, V.isLazy = function(g) {
    return A(g) === y;
  }, V.isMemo = function(g) {
    return A(g) === v;
  }, V.isPortal = function(g) {
    return A(g) === n;
  }, V.isProfiler = function(g) {
    return A(g) === a;
  }, V.isStrictMode = function(g) {
    return A(g) === o;
  }, V.isSuspense = function(g) {
    return A(g) === m;
  }, V.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === t || g === s || g === a || g === o || g === m || g === u || typeof g == "object" && g !== null && (g.$$typeof === y || g.$$typeof === v || g.$$typeof === i || g.$$typeof === l || g.$$typeof === d || g.$$typeof === p || g.$$typeof === S || g.$$typeof === K || g.$$typeof === h);
  }, V.typeOf = A, V;
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
var en;
function vo() {
  return en || (en = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, m = e ? Symbol.for("react.suspense") : 60113, u = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, p = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, K = e ? Symbol.for("react.scope") : 60119;
    function A(w) {
      return typeof w == "string" || typeof w == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      w === t || w === s || w === a || w === o || w === m || w === u || typeof w == "object" && w !== null && (w.$$typeof === y || w.$$typeof === v || w.$$typeof === i || w.$$typeof === l || w.$$typeof === d || w.$$typeof === p || w.$$typeof === S || w.$$typeof === K || w.$$typeof === h);
    }
    function C(w) {
      if (typeof w == "object" && w !== null) {
        var pe = w.$$typeof;
        switch (pe) {
          case r:
            var k = w.type;
            switch (k) {
              case c:
              case s:
              case t:
              case a:
              case o:
              case m:
                return k;
              default:
                var Ie = k && k.$$typeof;
                switch (Ie) {
                  case l:
                  case d:
                  case y:
                  case v:
                  case i:
                    return Ie;
                  default:
                    return pe;
                }
            }
          case n:
            return pe;
        }
      }
    }
    var g = c, ae = s, se = l, T = i, J = r, E = d, Z = t, ie = y, de = v, G = n, be = a, ce = o, we = m, _e = !1;
    function $e(w) {
      return _e || (_e = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), b(w) || C(w) === c;
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
    function O(w) {
      return typeof w == "object" && w !== null && w.$$typeof === r;
    }
    function N(w) {
      return C(w) === d;
    }
    function M(w) {
      return C(w) === t;
    }
    function _(w) {
      return C(w) === y;
    }
    function R(w) {
      return C(w) === v;
    }
    function B(w) {
      return C(w) === n;
    }
    function j(w) {
      return C(w) === a;
    }
    function z(w) {
      return C(w) === o;
    }
    function le(w) {
      return C(w) === m;
    }
    F.AsyncMode = g, F.ConcurrentMode = ae, F.ContextConsumer = se, F.ContextProvider = T, F.Element = J, F.ForwardRef = E, F.Fragment = Z, F.Lazy = ie, F.Memo = de, F.Portal = G, F.Profiler = be, F.StrictMode = ce, F.Suspense = we, F.isAsyncMode = $e, F.isConcurrentMode = b, F.isContextConsumer = x, F.isContextProvider = $, F.isElement = O, F.isForwardRef = N, F.isFragment = M, F.isLazy = _, F.isMemo = R, F.isPortal = B, F.isProfiler = j, F.isStrictMode = z, F.isSuspense = le, F.isValidElementType = A, F.typeOf = C;
  }()), F;
}
var rn;
function Zn() {
  return rn || (rn = 1, process.env.NODE_ENV === "production" ? rr.exports = yo() : rr.exports = vo()), rr.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var xr, nn;
function wo() {
  if (nn)
    return xr;
  nn = 1;
  var e = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
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
      var c = Object.getOwnPropertyNames(i).map(function(d) {
        return i[d];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var s = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        s[d] = d;
      }), Object.keys(Object.assign({}, s)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return xr = o() ? Object.assign : function(a, i) {
    for (var l, c = t(a), s, d = 1; d < arguments.length; d++) {
      l = Object(arguments[d]);
      for (var m in l)
        r.call(l, m) && (c[m] = l[m]);
      if (e) {
        s = e(l);
        for (var u = 0; u < s.length; u++)
          n.call(l, s[u]) && (c[s[u]] = l[s[u]]);
      }
    }
    return c;
  }, xr;
}
var kr, tn;
function Br() {
  if (tn)
    return kr;
  tn = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return kr = e, kr;
}
var Sr, on;
function Qn() {
  return on || (on = 1, Sr = Function.call.bind(Object.prototype.hasOwnProperty)), Sr;
}
var Er, an;
function xo() {
  if (an)
    return Er;
  an = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = Br(), n = {}, t = Qn();
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
      for (var d in a)
        if (t(a, d)) {
          var m;
          try {
            if (typeof a[d] != "function") {
              var u = Error(
                (c || "React class") + ": " + l + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw u.name = "Invariant Violation", u;
            }
            m = a[d](i, d, c, l, null, r);
          } catch (y) {
            m = y;
          }
          if (m && !(m instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof m + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), m instanceof Error && !(m.message in n)) {
            n[m.message] = !0;
            var v = s ? s() : "";
            e(
              "Failed " + l + " type: " + m.message + (v ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Er = o, Er;
}
var Cr, sn;
function ko() {
  if (sn)
    return Cr;
  sn = 1;
  var e = Zn(), r = wo(), n = Br(), t = Qn(), o = xo(), a = function() {
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
  return Cr = function(l, c) {
    var s = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function m(b) {
      var x = b && (s && b[s] || b[d]);
      if (typeof x == "function")
        return x;
    }
    var u = "<<anonymous>>", v = {
      array: S("array"),
      bigint: S("bigint"),
      bool: S("boolean"),
      func: S("function"),
      number: S("number"),
      object: S("object"),
      string: S("string"),
      symbol: S("symbol"),
      any: K(),
      arrayOf: A,
      element: C(),
      elementType: g(),
      instanceOf: ae,
      node: E(),
      objectOf: T,
      oneOf: se,
      oneOfType: J,
      shape: ie,
      exact: de
    };
    function y(b, x) {
      return b === x ? b !== 0 || 1 / b === 1 / x : b !== b && x !== x;
    }
    function h(b, x) {
      this.message = b, this.data = x && typeof x == "object" ? x : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function p(b) {
      if (process.env.NODE_ENV !== "production")
        var x = {}, $ = 0;
      function O(M, _, R, B, j, z, le) {
        if (B = B || u, z = z || R, le !== n) {
          if (c) {
            var w = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw w.name = "Invariant Violation", w;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var pe = B + ":" + R;
            !x[pe] && // Avoid spamming the console because they are often not actionable except for lib authors
            $ < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + z + "` prop on `" + B + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), x[pe] = !0, $++);
          }
        }
        return _[R] == null ? M ? _[R] === null ? new h("The " + j + " `" + z + "` is marked as required " + ("in `" + B + "`, but its value is `null`.")) : new h("The " + j + " `" + z + "` is marked as required in " + ("`" + B + "`, but its value is `undefined`.")) : null : b(_, R, B, j, z);
      }
      var N = O.bind(null, !1);
      return N.isRequired = O.bind(null, !0), N;
    }
    function S(b) {
      function x($, O, N, M, _, R) {
        var B = $[O], j = ce(B);
        if (j !== b) {
          var z = we(B);
          return new h(
            "Invalid " + M + " `" + _ + "` of type " + ("`" + z + "` supplied to `" + N + "`, expected ") + ("`" + b + "`."),
            { expectedType: b }
          );
        }
        return null;
      }
      return p(x);
    }
    function K() {
      return p(i);
    }
    function A(b) {
      function x($, O, N, M, _) {
        if (typeof b != "function")
          return new h("Property `" + _ + "` of component `" + N + "` has invalid PropType notation inside arrayOf.");
        var R = $[O];
        if (!Array.isArray(R)) {
          var B = ce(R);
          return new h("Invalid " + M + " `" + _ + "` of type " + ("`" + B + "` supplied to `" + N + "`, expected an array."));
        }
        for (var j = 0; j < R.length; j++) {
          var z = b(R, j, N, M, _ + "[" + j + "]", n);
          if (z instanceof Error)
            return z;
        }
        return null;
      }
      return p(x);
    }
    function C() {
      function b(x, $, O, N, M) {
        var _ = x[$];
        if (!l(_)) {
          var R = ce(_);
          return new h("Invalid " + N + " `" + M + "` of type " + ("`" + R + "` supplied to `" + O + "`, expected a single ReactElement."));
        }
        return null;
      }
      return p(b);
    }
    function g() {
      function b(x, $, O, N, M) {
        var _ = x[$];
        if (!e.isValidElementType(_)) {
          var R = ce(_);
          return new h("Invalid " + N + " `" + M + "` of type " + ("`" + R + "` supplied to `" + O + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return p(b);
    }
    function ae(b) {
      function x($, O, N, M, _) {
        if (!($[O] instanceof b)) {
          var R = b.name || u, B = $e($[O]);
          return new h("Invalid " + M + " `" + _ + "` of type " + ("`" + B + "` supplied to `" + N + "`, expected ") + ("instance of `" + R + "`."));
        }
        return null;
      }
      return p(x);
    }
    function se(b) {
      if (!Array.isArray(b))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function x($, O, N, M, _) {
        for (var R = $[O], B = 0; B < b.length; B++)
          if (y(R, b[B]))
            return null;
        var j = JSON.stringify(b, function(le, w) {
          var pe = we(w);
          return pe === "symbol" ? String(w) : w;
        });
        return new h("Invalid " + M + " `" + _ + "` of value `" + String(R) + "` " + ("supplied to `" + N + "`, expected one of " + j + "."));
      }
      return p(x);
    }
    function T(b) {
      function x($, O, N, M, _) {
        if (typeof b != "function")
          return new h("Property `" + _ + "` of component `" + N + "` has invalid PropType notation inside objectOf.");
        var R = $[O], B = ce(R);
        if (B !== "object")
          return new h("Invalid " + M + " `" + _ + "` of type " + ("`" + B + "` supplied to `" + N + "`, expected an object."));
        for (var j in R)
          if (t(R, j)) {
            var z = b(R, j, N, M, _ + "." + j, n);
            if (z instanceof Error)
              return z;
          }
        return null;
      }
      return p(x);
    }
    function J(b) {
      if (!Array.isArray(b))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var x = 0; x < b.length; x++) {
        var $ = b[x];
        if (typeof $ != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + _e($) + " at index " + x + "."
          ), i;
      }
      function O(N, M, _, R, B) {
        for (var j = [], z = 0; z < b.length; z++) {
          var le = b[z], w = le(N, M, _, R, B, n);
          if (w == null)
            return null;
          w.data && t(w.data, "expectedType") && j.push(w.data.expectedType);
        }
        var pe = j.length > 0 ? ", expected one of type [" + j.join(", ") + "]" : "";
        return new h("Invalid " + R + " `" + B + "` supplied to " + ("`" + _ + "`" + pe + "."));
      }
      return p(O);
    }
    function E() {
      function b(x, $, O, N, M) {
        return G(x[$]) ? null : new h("Invalid " + N + " `" + M + "` supplied to " + ("`" + O + "`, expected a ReactNode."));
      }
      return p(b);
    }
    function Z(b, x, $, O, N) {
      return new h(
        (b || "React class") + ": " + x + " type `" + $ + "." + O + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + N + "`."
      );
    }
    function ie(b) {
      function x($, O, N, M, _) {
        var R = $[O], B = ce(R);
        if (B !== "object")
          return new h("Invalid " + M + " `" + _ + "` of type `" + B + "` " + ("supplied to `" + N + "`, expected `object`."));
        for (var j in b) {
          var z = b[j];
          if (typeof z != "function")
            return Z(N, M, _, j, we(z));
          var le = z(R, j, N, M, _ + "." + j, n);
          if (le)
            return le;
        }
        return null;
      }
      return p(x);
    }
    function de(b) {
      function x($, O, N, M, _) {
        var R = $[O], B = ce(R);
        if (B !== "object")
          return new h("Invalid " + M + " `" + _ + "` of type `" + B + "` " + ("supplied to `" + N + "`, expected `object`."));
        var j = r({}, $[O], b);
        for (var z in j) {
          var le = b[z];
          if (t(b, z) && typeof le != "function")
            return Z(N, M, _, z, we(le));
          if (!le)
            return new h(
              "Invalid " + M + " `" + _ + "` key `" + z + "` supplied to `" + N + "`.\nBad object: " + JSON.stringify($[O], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(b), null, "  ")
            );
          var w = le(R, z, N, M, _ + "." + z, n);
          if (w)
            return w;
        }
        return null;
      }
      return p(x);
    }
    function G(b) {
      switch (typeof b) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !b;
        case "object":
          if (Array.isArray(b))
            return b.every(G);
          if (b === null || l(b))
            return !0;
          var x = m(b);
          if (x) {
            var $ = x.call(b), O;
            if (x !== b.entries) {
              for (; !(O = $.next()).done; )
                if (!G(O.value))
                  return !1;
            } else
              for (; !(O = $.next()).done; ) {
                var N = O.value;
                if (N && !G(N[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function be(b, x) {
      return b === "symbol" ? !0 : x ? x["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && x instanceof Symbol : !1;
    }
    function ce(b) {
      var x = typeof b;
      return Array.isArray(b) ? "array" : b instanceof RegExp ? "object" : be(x, b) ? "symbol" : x;
    }
    function we(b) {
      if (typeof b > "u" || b === null)
        return "" + b;
      var x = ce(b);
      if (x === "object") {
        if (b instanceof Date)
          return "date";
        if (b instanceof RegExp)
          return "regexp";
      }
      return x;
    }
    function _e(b) {
      var x = we(b);
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
      return !b.constructor || !b.constructor.name ? u : b.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, Cr;
}
var Nr, cn;
function So() {
  if (cn)
    return Nr;
  cn = 1;
  var e = Br();
  function r() {
  }
  function n() {
  }
  return n.resetWarningCache = r, Nr = function() {
    function t(i, l, c, s, d, m) {
      if (m !== e) {
        var u = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw u.name = "Invariant Violation", u;
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
      checkPropTypes: n,
      resetWarningCache: r
    };
    return a.PropTypes = a, a;
  }, Nr;
}
if (process.env.NODE_ENV !== "production") {
  var Eo = Zn(), Co = !0;
  Rr.exports = ko()(Eo.isElement, Co);
} else
  Rr.exports = So()();
var No = Rr.exports;
const X = /* @__PURE__ */ bo(No);
function Le(e) {
  let r = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    r += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + r + " for the full message.";
}
var $r = { exports: {} }, L = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ln;
function To() {
  if (ln)
    return L;
  ln = 1;
  var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function h(p) {
    if (typeof p == "object" && p !== null) {
      var S = p.$$typeof;
      switch (S) {
        case e:
          switch (p = p.type, p) {
            case n:
            case o:
            case t:
            case s:
            case d:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case l:
                case i:
                case c:
                case u:
                case m:
                case a:
                  return p;
                default:
                  return S;
              }
          }
        case r:
          return S;
      }
    }
  }
  return L.ContextConsumer = i, L.ContextProvider = a, L.Element = e, L.ForwardRef = c, L.Fragment = n, L.Lazy = u, L.Memo = m, L.Portal = r, L.Profiler = o, L.StrictMode = t, L.Suspense = s, L.SuspenseList = d, L.isAsyncMode = function() {
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
    return h(p) === c;
  }, L.isFragment = function(p) {
    return h(p) === n;
  }, L.isLazy = function(p) {
    return h(p) === u;
  }, L.isMemo = function(p) {
    return h(p) === m;
  }, L.isPortal = function(p) {
    return h(p) === r;
  }, L.isProfiler = function(p) {
    return h(p) === o;
  }, L.isStrictMode = function(p) {
    return h(p) === t;
  }, L.isSuspense = function(p) {
    return h(p) === s;
  }, L.isSuspenseList = function(p) {
    return h(p) === d;
  }, L.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === n || p === o || p === t || p === s || p === d || p === v || typeof p == "object" && p !== null && (p.$$typeof === u || p.$$typeof === m || p.$$typeof === a || p.$$typeof === i || p.$$typeof === c || p.$$typeof === y || p.getModuleId !== void 0);
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
var dn;
function _o() {
  return dn || (dn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), y = !1, h = !1, p = !1, S = !1, K = !1, A;
    A = Symbol.for("react.module.reference");
    function C(k) {
      return !!(typeof k == "string" || typeof k == "function" || k === n || k === o || K || k === t || k === s || k === d || S || k === v || y || h || p || typeof k == "object" && k !== null && (k.$$typeof === u || k.$$typeof === m || k.$$typeof === a || k.$$typeof === i || k.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      k.$$typeof === A || k.getModuleId !== void 0));
    }
    function g(k) {
      if (typeof k == "object" && k !== null) {
        var Ie = k.$$typeof;
        switch (Ie) {
          case e:
            var er = k.type;
            switch (er) {
              case n:
              case o:
              case t:
              case s:
              case d:
                return er;
              default:
                var Xr = er && er.$$typeof;
                switch (Xr) {
                  case l:
                  case i:
                  case c:
                  case u:
                  case m:
                  case a:
                    return Xr;
                  default:
                    return Ie;
                }
            }
          case r:
            return Ie;
        }
      }
    }
    var ae = i, se = a, T = e, J = c, E = n, Z = u, ie = m, de = r, G = o, be = t, ce = s, we = d, _e = !1, $e = !1;
    function b(k) {
      return _e || (_e = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function x(k) {
      return $e || ($e = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function $(k) {
      return g(k) === i;
    }
    function O(k) {
      return g(k) === a;
    }
    function N(k) {
      return typeof k == "object" && k !== null && k.$$typeof === e;
    }
    function M(k) {
      return g(k) === c;
    }
    function _(k) {
      return g(k) === n;
    }
    function R(k) {
      return g(k) === u;
    }
    function B(k) {
      return g(k) === m;
    }
    function j(k) {
      return g(k) === r;
    }
    function z(k) {
      return g(k) === o;
    }
    function le(k) {
      return g(k) === t;
    }
    function w(k) {
      return g(k) === s;
    }
    function pe(k) {
      return g(k) === d;
    }
    U.ContextConsumer = ae, U.ContextProvider = se, U.Element = T, U.ForwardRef = J, U.Fragment = E, U.Lazy = Z, U.Memo = ie, U.Portal = de, U.Profiler = G, U.StrictMode = be, U.Suspense = ce, U.SuspenseList = we, U.isAsyncMode = b, U.isConcurrentMode = x, U.isContextConsumer = $, U.isContextProvider = O, U.isElement = N, U.isForwardRef = M, U.isFragment = _, U.isLazy = R, U.isMemo = B, U.isPortal = j, U.isProfiler = z, U.isStrictMode = le, U.isSuspense = w, U.isSuspenseList = pe, U.isValidElementType = C, U.typeOf = g;
  }()), U;
}
process.env.NODE_ENV === "production" ? $r.exports = To() : $r.exports = _o();
var un = $r.exports;
const Oo = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Ro(e) {
  const r = `${e}`.match(Oo);
  return r && r[1] || "";
}
function et(e, r = "") {
  return e.displayName || e.name || Ro(e) || r;
}
function pn(e, r, n) {
  const t = et(r);
  return e.displayName || (t !== "" ? `${n}(${t})` : n);
}
function $o(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return et(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case un.ForwardRef:
          return pn(e, e.render, "ForwardRef");
        case un.Memo:
          return pn(e, e.type, "memo");
        default:
          return;
      }
  }
}
function ve(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Le(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function rt(e, r) {
  const n = D({}, r);
  return Object.keys(e).forEach((t) => {
    if (t.toString().match(/^(components|slots)$/))
      n[t] = D({}, e[t], n[t]);
    else if (t.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[t] || {}, a = r[t];
      n[t] = {}, !a || !Object.keys(a) ? n[t] = o : !o || !Object.keys(o) ? n[t] = a : (n[t] = D({}, a), Object.keys(o).forEach((i) => {
        n[t][i] = rt(o[i], a[i]);
      }));
    } else
      n[t] === void 0 && (n[t] = e[t]);
  }), n;
}
function Io(e, r, n = void 0) {
  const t = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      t[o] = e[o].reduce((a, i) => {
        if (i) {
          const l = r(i);
          l !== "" && a.push(l), n && n[i] && a.push(n[i]);
        }
        return a;
      }, []).join(" ");
    }
  ), t;
}
const fn = (e) => e, Ao = () => {
  let e = fn;
  return {
    configure(r) {
      e = r;
    },
    generate(r) {
      return e(r);
    },
    reset() {
      e = fn;
    }
  };
}, Po = Ao(), Mo = Po, Bo = {
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
function zr(e, r, n = "Mui") {
  const t = Bo[r];
  return t ? `${n}-${t}` : `${Mo.generate(e)}-${r}`;
}
function zo(e, r, n = "Mui") {
  const t = {};
  return r.forEach((o) => {
    t[o] = zr(e, o, n);
  }), t;
}
function Do(e, r = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(r, Math.min(e, n));
}
function Ee(e, r) {
  if (e == null)
    return {};
  var n = {}, t = Object.keys(e), o, a;
  for (a = 0; a < t.length; a++)
    o = t[a], !(r.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const jo = ["values", "unit", "step"], Vo = (e) => {
  const r = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return r.sort((n, t) => n.val - t.val), r.reduce((n, t) => D({}, n, {
    [t.key]: t.val
  }), {});
};
function Fo(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: r = {
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
    step: t = 5
  } = e, o = Ee(e, jo), a = Vo(r), i = Object.keys(a);
  function l(u) {
    return `@media (min-width:${typeof r[u] == "number" ? r[u] : u}${n})`;
  }
  function c(u) {
    return `@media (max-width:${(typeof r[u] == "number" ? r[u] : u) - t / 100}${n})`;
  }
  function s(u, v) {
    const y = i.indexOf(v);
    return `@media (min-width:${typeof r[u] == "number" ? r[u] : u}${n}) and (max-width:${(y !== -1 && typeof r[i[y]] == "number" ? r[i[y]] : v) - t / 100}${n})`;
  }
  function d(u) {
    return i.indexOf(u) + 1 < i.length ? s(u, i[i.indexOf(u) + 1]) : l(u);
  }
  function m(u) {
    const v = i.indexOf(u);
    return v === 0 ? l(i[1]) : v === i.length - 1 ? c(i[v]) : s(u, i[i.indexOf(u) + 1]).replace("@media", "@media not all and");
  }
  return D({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: s,
    only: d,
    not: m,
    unit: n
  }, o);
}
const Lo = {
  borderRadius: 4
}, Uo = Lo, Go = process.env.NODE_ENV !== "production" ? X.oneOfType([X.number, X.string, X.object, X.array]) : {}, Te = Go;
function Ye(e, r) {
  return r ? ye(e, r, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Dr = {
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
}, mn = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Dr[e]}px)`
};
function Se(e, r, n) {
  const t = e.theme || {};
  if (Array.isArray(r)) {
    const a = t.breakpoints || mn;
    return r.reduce((i, l, c) => (i[a.up(a.keys[c])] = n(r[c]), i), {});
  }
  if (typeof r == "object") {
    const a = t.breakpoints || mn;
    return Object.keys(r).reduce((i, l) => {
      if (Object.keys(a.values || Dr).indexOf(l) !== -1) {
        const c = a.up(l);
        i[c] = n(r[l], l);
      } else {
        const c = l;
        i[c] = r[c];
      }
      return i;
    }, {});
  }
  return n(r);
}
function Xo(e = {}) {
  var r;
  return ((r = e.keys) == null ? void 0 : r.reduce((t, o) => {
    const a = e.up(o);
    return t[a] = {}, t;
  }, {})) || {};
}
function Ho(e, r) {
  return e.reduce((n, t) => {
    const o = n[t];
    return (!o || Object.keys(o).length === 0) && delete n[t], n;
  }, r);
}
function ur(e, r, n = !0) {
  if (!r || typeof r != "string")
    return null;
  if (e && e.vars && n) {
    const t = `vars.${r}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (t != null)
      return t;
  }
  return r.split(".").reduce((t, o) => t && t[o] != null ? t[o] : null, e);
}
function sr(e, r, n, t = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || t : o = ur(e, n) || t, r && (o = r(o, t, e)), o;
}
function te(e) {
  const {
    prop: r,
    cssProperty: n = e.prop,
    themeKey: t,
    transform: o
  } = e, a = (i) => {
    if (i[r] == null)
      return null;
    const l = i[r], c = i.theme, s = ur(c, t) || {};
    return Se(i, l, (m) => {
      let u = sr(s, o, m);
      return m === u && typeof m == "string" && (u = sr(s, o, `${r}${m === "default" ? "" : ve(m)}`, m)), n === !1 ? u : {
        [n]: u
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [r]: Te
  } : {}, a.filterProps = [r], a;
}
function Wo(e) {
  const r = {};
  return (n) => (r[n] === void 0 && (r[n] = e(n)), r[n]);
}
const qo = {
  m: "margin",
  p: "padding"
}, Yo = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, hn = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Ko = Wo((e) => {
  if (e.length > 2)
    if (hn[e])
      e = hn[e];
    else
      return [e];
  const [r, n] = e.split(""), t = qo[r], o = Yo[n] || "";
  return Array.isArray(o) ? o.map((a) => t + a) : [t + o];
}), pr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], fr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Jo = [...pr, ...fr];
function Ze(e, r, n, t) {
  var o;
  const a = (o = ur(e, r, !1)) != null ? o : n;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${t} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${r}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function nt(e) {
  return Ze(e, "spacing", 8, "spacing");
}
function Qe(e, r) {
  if (typeof r == "string" || r == null)
    return r;
  const n = Math.abs(r), t = e(n);
  return r >= 0 ? t : typeof t == "number" ? -t : `-${t}`;
}
function Zo(e, r) {
  return (n) => e.reduce((t, o) => (t[o] = Qe(r, n), t), {});
}
function Qo(e, r, n, t) {
  if (r.indexOf(n) === -1)
    return null;
  const o = Ko(n), a = Zo(o, t), i = e[n];
  return Se(e, i, a);
}
function tt(e, r) {
  const n = nt(e.theme);
  return Object.keys(e).map((t) => Qo(e, r, t, n)).reduce(Ye, {});
}
function Q(e) {
  return tt(e, pr);
}
Q.propTypes = process.env.NODE_ENV !== "production" ? pr.reduce((e, r) => (e[r] = Te, e), {}) : {};
Q.filterProps = pr;
function ee(e) {
  return tt(e, fr);
}
ee.propTypes = process.env.NODE_ENV !== "production" ? fr.reduce((e, r) => (e[r] = Te, e), {}) : {};
ee.filterProps = fr;
process.env.NODE_ENV !== "production" && Jo.reduce((e, r) => (e[r] = Te, e), {});
function ea(e = 8) {
  if (e.mui)
    return e;
  const r = nt({
    spacing: e
  }), n = (...t) => (process.env.NODE_ENV !== "production" && (t.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)), (t.length === 0 ? [1] : t).map((a) => {
    const i = r(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return n.mui = !0, n;
}
function mr(...e) {
  const r = e.reduce((t, o) => (o.filterProps.forEach((a) => {
    t[a] = o;
  }), t), {}), n = (t) => Object.keys(t).reduce((o, a) => r[a] ? Ye(o, r[a](t)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((t, o) => Object.assign(t, o.propTypes), {}) : {}, n.filterProps = e.reduce((t, o) => t.concat(o.filterProps), []), n;
}
function he(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function ge(e, r) {
  return te({
    prop: e,
    themeKey: "borders",
    transform: r
  });
}
const ra = ge("border", he), na = ge("borderTop", he), ta = ge("borderRight", he), oa = ge("borderBottom", he), aa = ge("borderLeft", he), ia = ge("borderColor"), sa = ge("borderTopColor"), ca = ge("borderRightColor"), la = ge("borderBottomColor"), da = ge("borderLeftColor"), ua = ge("outline", he), pa = ge("outlineColor"), hr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const r = Ze(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (t) => ({
      borderRadius: Qe(r, t)
    });
    return Se(e, e.borderRadius, n);
  }
  return null;
};
hr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Te
} : {};
hr.filterProps = ["borderRadius"];
mr(ra, na, ta, oa, aa, ia, sa, ca, la, da, hr, ua, pa);
const gr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const r = Ze(e.theme, "spacing", 8, "gap"), n = (t) => ({
      gap: Qe(r, t)
    });
    return Se(e, e.gap, n);
  }
  return null;
};
gr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: Te
} : {};
gr.filterProps = ["gap"];
const br = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const r = Ze(e.theme, "spacing", 8, "columnGap"), n = (t) => ({
      columnGap: Qe(r, t)
    });
    return Se(e, e.columnGap, n);
  }
  return null;
};
br.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: Te
} : {};
br.filterProps = ["columnGap"];
const yr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const r = Ze(e.theme, "spacing", 8, "rowGap"), n = (t) => ({
      rowGap: Qe(r, t)
    });
    return Se(e, e.rowGap, n);
  }
  return null;
};
yr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: Te
} : {};
yr.filterProps = ["rowGap"];
const fa = te({
  prop: "gridColumn"
}), ma = te({
  prop: "gridRow"
}), ha = te({
  prop: "gridAutoFlow"
}), ga = te({
  prop: "gridAutoColumns"
}), ba = te({
  prop: "gridAutoRows"
}), ya = te({
  prop: "gridTemplateColumns"
}), va = te({
  prop: "gridTemplateRows"
}), wa = te({
  prop: "gridTemplateAreas"
}), xa = te({
  prop: "gridArea"
});
mr(gr, br, yr, fa, ma, ha, ga, ba, ya, va, wa, xa);
function Fe(e, r) {
  return r === "grey" ? r : e;
}
const ka = te({
  prop: "color",
  themeKey: "palette",
  transform: Fe
}), Sa = te({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Fe
}), Ea = te({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Fe
});
mr(ka, Sa, Ea);
function ue(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Ca = te({
  prop: "width",
  transform: ue
}), jr = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const r = (n) => {
      var t, o;
      const a = ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null ? void 0 : t[n]) || Dr[n];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: ue(n)
      };
    };
    return Se(e, e.maxWidth, r);
  }
  return null;
};
jr.filterProps = ["maxWidth"];
const Na = te({
  prop: "minWidth",
  transform: ue
}), Ta = te({
  prop: "height",
  transform: ue
}), _a = te({
  prop: "maxHeight",
  transform: ue
}), Oa = te({
  prop: "minHeight",
  transform: ue
});
te({
  prop: "size",
  cssProperty: "width",
  transform: ue
});
te({
  prop: "size",
  cssProperty: "height",
  transform: ue
});
const Ra = te({
  prop: "boxSizing"
});
mr(Ca, jr, Na, Ta, _a, Oa, Ra);
const $a = {
  // borders
  border: {
    themeKey: "borders",
    transform: he
  },
  borderTop: {
    themeKey: "borders",
    transform: he
  },
  borderRight: {
    themeKey: "borders",
    transform: he
  },
  borderBottom: {
    themeKey: "borders",
    transform: he
  },
  borderLeft: {
    themeKey: "borders",
    transform: he
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
    transform: he
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: hr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Fe
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Fe
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Fe
  },
  // spacing
  p: {
    style: ee
  },
  pt: {
    style: ee
  },
  pr: {
    style: ee
  },
  pb: {
    style: ee
  },
  pl: {
    style: ee
  },
  px: {
    style: ee
  },
  py: {
    style: ee
  },
  padding: {
    style: ee
  },
  paddingTop: {
    style: ee
  },
  paddingRight: {
    style: ee
  },
  paddingBottom: {
    style: ee
  },
  paddingLeft: {
    style: ee
  },
  paddingX: {
    style: ee
  },
  paddingY: {
    style: ee
  },
  paddingInline: {
    style: ee
  },
  paddingInlineStart: {
    style: ee
  },
  paddingInlineEnd: {
    style: ee
  },
  paddingBlock: {
    style: ee
  },
  paddingBlockStart: {
    style: ee
  },
  paddingBlockEnd: {
    style: ee
  },
  m: {
    style: Q
  },
  mt: {
    style: Q
  },
  mr: {
    style: Q
  },
  mb: {
    style: Q
  },
  ml: {
    style: Q
  },
  mx: {
    style: Q
  },
  my: {
    style: Q
  },
  margin: {
    style: Q
  },
  marginTop: {
    style: Q
  },
  marginRight: {
    style: Q
  },
  marginBottom: {
    style: Q
  },
  marginLeft: {
    style: Q
  },
  marginX: {
    style: Q
  },
  marginY: {
    style: Q
  },
  marginInline: {
    style: Q
  },
  marginInlineStart: {
    style: Q
  },
  marginInlineEnd: {
    style: Q
  },
  marginBlock: {
    style: Q
  },
  marginBlockStart: {
    style: Q
  },
  marginBlockEnd: {
    style: Q
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
    style: yr
  },
  columnGap: {
    style: br
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
    transform: ue
  },
  maxWidth: {
    style: jr
  },
  minWidth: {
    transform: ue
  },
  height: {
    transform: ue
  },
  maxHeight: {
    transform: ue
  },
  minHeight: {
    transform: ue
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
}, Vr = $a;
function Ia(...e) {
  const r = e.reduce((t, o) => t.concat(Object.keys(o)), []), n = new Set(r);
  return e.every((t) => n.size === Object.keys(t).length);
}
function Aa(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function Pa() {
  function e(n, t, o, a) {
    const i = {
      [n]: t,
      theme: o
    }, l = a[n];
    if (!l)
      return {
        [n]: t
      };
    const {
      cssProperty: c = n,
      themeKey: s,
      transform: d,
      style: m
    } = l;
    if (t == null)
      return null;
    if (s === "typography" && t === "inherit")
      return {
        [n]: t
      };
    const u = ur(o, s) || {};
    return m ? m(i) : Se(i, t, (y) => {
      let h = sr(u, d, y);
      return y === h && typeof y == "string" && (h = sr(u, d, `${n}${y === "default" ? "" : ve(y)}`, y)), c === !1 ? h : {
        [c]: h
      };
    });
  }
  function r(n) {
    var t;
    const {
      sx: o,
      theme: a = {}
    } = n || {};
    if (!o)
      return null;
    const i = (t = a.unstable_sxConfig) != null ? t : Vr;
    function l(c) {
      let s = c;
      if (typeof c == "function")
        s = c(a);
      else if (typeof c != "object")
        return c;
      if (!s)
        return null;
      const d = Xo(a.breakpoints), m = Object.keys(d);
      let u = d;
      return Object.keys(s).forEach((v) => {
        const y = Aa(s[v], a);
        if (y != null)
          if (typeof y == "object")
            if (i[v])
              u = Ye(u, e(v, y, a, i));
            else {
              const h = Se({
                theme: a
              }, y, (p) => ({
                [v]: p
              }));
              Ia(h, y) ? u[v] = r({
                sx: y,
                theme: a
              }) : u = Ye(u, h);
            }
          else
            u = Ye(u, e(v, y, a, i));
      }), Ho(m, u);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return r;
}
const ot = Pa();
ot.filterProps = ["sx"];
const Fr = ot, Ma = ["breakpoints", "palette", "spacing", "shape"];
function Lr(e = {}, ...r) {
  const {
    breakpoints: n = {},
    palette: t = {},
    spacing: o,
    shape: a = {}
  } = e, i = Ee(e, Ma), l = Fo(n), c = ea(o);
  let s = ye({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: D({
      mode: "light"
    }, t),
    spacing: c,
    shape: D({}, Uo, a)
  }, i);
  return s = r.reduce((d, m) => ye(d, m), s), s.unstable_sxConfig = D({}, Vr, i == null ? void 0 : i.unstable_sxConfig), s.unstable_sx = function(m) {
    return Fr({
      sx: m,
      theme: this
    });
  }, s;
}
function Ba(e) {
  return Object.keys(e).length === 0;
}
function za(e = null) {
  const r = Y.useContext(Bt);
  return !r || Ba(r) ? e : r;
}
const Da = Lr();
function ja(e = Da) {
  return za(e);
}
const Va = ["variant"];
function gn(e) {
  return e.length === 0;
}
function at(e) {
  const {
    variant: r
  } = e, n = Ee(e, Va);
  let t = r || "";
  return Object.keys(n).sort().forEach((o) => {
    o === "color" ? t += gn(t) ? e[o] : ve(e[o]) : t += `${gn(t) ? o : ve(o)}${ve(e[o].toString())}`;
  }), t;
}
const Fa = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function La(e) {
  return Object.keys(e).length === 0;
}
function Ua(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const Ga = (e, r) => r.components && r.components[e] && r.components[e].styleOverrides ? r.components[e].styleOverrides : null, cr = (e) => {
  let r = 0;
  const n = {};
  return e && e.forEach((t) => {
    let o = "";
    typeof t.props == "function" ? (o = `callback${r}`, r += 1) : o = at(t.props), n[o] = t.style;
  }), n;
}, Xa = (e, r) => {
  let n = [];
  return r && r.components && r.components[e] && r.components[e].variants && (n = r.components[e].variants), cr(n);
}, lr = (e, r, n) => {
  const {
    ownerState: t = {}
  } = e, o = [];
  let a = 0;
  return n && n.forEach((i) => {
    let l = !0;
    if (typeof i.props == "function") {
      const c = D({}, e, t);
      l = i.props(c);
    } else
      Object.keys(i.props).forEach((c) => {
        t[c] !== i.props[c] && e[c] !== i.props[c] && (l = !1);
      });
    l && (typeof i.props == "function" ? o.push(r[`callback${a}`]) : o.push(r[at(i.props)])), typeof i.props == "function" && (a += 1);
  }), o;
}, Ha = (e, r, n, t) => {
  var o;
  const a = n == null || (o = n.components) == null || (o = o[t]) == null ? void 0 : o.variants;
  return lr(e, r, a);
};
function tr(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Wa = Lr(), bn = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function or({
  defaultTheme: e,
  theme: r,
  themeId: n
}) {
  return La(r) ? e : r[n] || r;
}
function qa(e) {
  return e ? (r, n) => n[e] : null;
}
const yn = ({
  styledArg: e,
  props: r,
  defaultTheme: n,
  themeId: t
}) => {
  const o = e(D({}, r, {
    theme: or(D({}, r, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  let a;
  if (o && o.variants && (a = o.variants, delete o.variants), a) {
    const i = lr(r, cr(a), a);
    return [o, ...i];
  }
  return o;
};
function Ya(e = {}) {
  const {
    themeId: r,
    defaultTheme: n = Wa,
    rootShouldForwardProp: t = tr,
    slotShouldForwardProp: o = tr
  } = e, a = (i) => Fr(D({}, i, {
    theme: or(D({}, i, {
      defaultTheme: n,
      themeId: r
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    zt(i, (C) => C.filter((g) => !(g != null && g.__mui_systemSx)));
    const {
      name: c,
      slot: s,
      skipVariantsResolver: d,
      skipSx: m,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: u = qa(bn(s))
    } = l, v = Ee(l, Fa), y = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      s && s !== "Root" && s !== "root" || !1
    ), h = m || !1;
    let p;
    process.env.NODE_ENV !== "production" && c && (p = `${c}-${bn(s || "Root")}`);
    let S = tr;
    s === "Root" || s === "root" ? S = t : s ? S = o : Ua(i) && (S = void 0);
    const K = Mt(i, D({
      shouldForwardProp: S,
      label: p
    }, v)), A = (C, ...g) => {
      const ae = g ? g.map((E) => {
        if (typeof E == "function" && E.__emotion_real !== E)
          return (Z) => yn({
            styledArg: E,
            props: Z,
            defaultTheme: n,
            themeId: r
          });
        if (Ne(E)) {
          let Z = E, ie;
          return E && E.variants && (ie = E.variants, delete Z.variants, Z = (de) => {
            let G = E;
            return lr(de, cr(ie), ie).forEach((ce) => {
              G = ye(G, ce);
            }), G;
          }), Z;
        }
        return E;
      }) : [];
      let se = C;
      if (Ne(C)) {
        let E;
        C && C.variants && (E = C.variants, delete se.variants, se = (Z) => {
          let ie = C;
          return lr(Z, cr(E), E).forEach((G) => {
            ie = ye(ie, G);
          }), ie;
        });
      } else
        typeof C == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        C.__emotion_real !== C && (se = (E) => yn({
          styledArg: C,
          props: E,
          defaultTheme: n,
          themeId: r
        }));
      c && u && ae.push((E) => {
        const Z = or(D({}, E, {
          defaultTheme: n,
          themeId: r
        })), ie = Ga(c, Z);
        if (ie) {
          const de = {};
          return Object.entries(ie).forEach(([G, be]) => {
            de[G] = typeof be == "function" ? be(D({}, E, {
              theme: Z
            })) : be;
          }), u(E, de);
        }
        return null;
      }), c && !y && ae.push((E) => {
        const Z = or(D({}, E, {
          defaultTheme: n,
          themeId: r
        }));
        return Ha(E, Xa(c, Z), Z, c);
      }), h || ae.push(a);
      const T = ae.length - g.length;
      if (Array.isArray(C) && T > 0) {
        const E = new Array(T).fill("");
        se = [...C, ...E], se.raw = [...C.raw, ...E];
      }
      const J = K(se, ...ae);
      if (process.env.NODE_ENV !== "production") {
        let E;
        c && (E = `${c}${ve(s || "")}`), E === void 0 && (E = `Styled(${$o(i)})`), J.displayName = E;
      }
      return i.muiName && (J.muiName = i.muiName), J;
    };
    return K.withConfig && (A.withConfig = K.withConfig), A;
  };
}
function Ka(e) {
  const {
    theme: r,
    name: n,
    props: t
  } = e;
  return !r || !r.components || !r.components[n] || !r.components[n].defaultProps ? t : rt(r.components[n].defaultProps, t);
}
function Ja({
  props: e,
  name: r,
  defaultTheme: n,
  themeId: t
}) {
  let o = ja(n);
  return t && (o = o[t] || o), Ka({
    theme: o,
    name: r,
    props: e
  });
}
function it(e, r = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < r || e > n) && console.error(`MUI: The value provided ${e} is out of range [${r}, ${n}].`), Do(e, r, n);
}
function Za(e) {
  e = e.slice(1);
  const r = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(r);
  return n && n[0].length === 1 && (n = n.map((t) => t + t)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((t, o) => o < 3 ? parseInt(t, 16) : Math.round(parseInt(t, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ue(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Ue(Za(e));
  const r = e.indexOf("("), n = e.substring(0, r);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Le(9, e));
  let t = e.substring(r + 1, e.length - 1), o;
  if (n === "color") {
    if (t = t.split(" "), o = t.shift(), t.length === 4 && t[3].charAt(0) === "/" && (t[3] = t[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Le(10, o));
  } else
    t = t.split(",");
  return t = t.map((a) => parseFloat(a)), {
    type: n,
    values: t,
    colorSpace: o
  };
}
function Ur(e) {
  const {
    type: r,
    colorSpace: n
  } = e;
  let {
    values: t
  } = e;
  return r.indexOf("rgb") !== -1 ? t = t.map((o, a) => a < 3 ? parseInt(o, 10) : o) : r.indexOf("hsl") !== -1 && (t[1] = `${t[1]}%`, t[2] = `${t[2]}%`), r.indexOf("color") !== -1 ? t = `${n} ${t.join(" ")}` : t = `${t.join(", ")}`, `${r}(${t})`;
}
function Qa(e) {
  e = Ue(e);
  const {
    values: r
  } = e, n = r[0], t = r[1] / 100, o = r[2] / 100, a = t * Math.min(o, 1 - o), i = (s, d = (s + n / 30) % 12) => o - a * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(r[3])), Ur({
    type: l,
    values: c
  });
}
function vn(e) {
  e = Ue(e);
  let r = e.type === "hsl" || e.type === "hsla" ? Ue(Qa(e)).values : e.values;
  return r = r.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3));
}
function wn(e, r) {
  const n = vn(e), t = vn(r);
  return (Math.max(n, t) + 0.05) / (Math.min(n, t) + 0.05);
}
function ei(e, r) {
  if (e = Ue(e), r = it(r), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - r;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - r;
  return Ur(e);
}
function ri(e, r) {
  if (e = Ue(e), r = it(r), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * r;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * r;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * r;
  return Ur(e);
}
function ni(e, r) {
  return D({
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
  }, r);
}
const ti = {
  black: "#000",
  white: "#fff"
}, Je = ti, oi = {
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
}, ai = oi, ii = {
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
}, Pe = ii, si = {
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
}, Me = si, ci = {
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
}, He = ci, li = {
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
}, Be = li, di = {
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
}, ze = di, ui = {
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
}, De = ui, pi = ["mode", "contrastThreshold", "tonalOffset"], xn = {
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
    paper: Je.white,
    default: Je.white
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
}, Tr = {
  text: {
    primary: Je.white,
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
    active: Je.white,
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
function kn(e, r, n, t) {
  const o = t.light || t, a = t.dark || t * 1.5;
  e[r] || (e.hasOwnProperty(n) ? e[r] = e[n] : r === "light" ? e.light = ri(e.main, o) : r === "dark" && (e.dark = ei(e.main, a)));
}
function fi(e = "light") {
  return e === "dark" ? {
    main: Be[200],
    light: Be[50],
    dark: Be[400]
  } : {
    main: Be[700],
    light: Be[400],
    dark: Be[800]
  };
}
function mi(e = "light") {
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
function hi(e = "light") {
  return e === "dark" ? {
    main: Me[500],
    light: Me[300],
    dark: Me[700]
  } : {
    main: Me[700],
    light: Me[400],
    dark: Me[800]
  };
}
function gi(e = "light") {
  return e === "dark" ? {
    main: ze[400],
    light: ze[300],
    dark: ze[700]
  } : {
    main: ze[700],
    light: ze[500],
    dark: ze[900]
  };
}
function bi(e = "light") {
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
function yi(e = "light") {
  return e === "dark" ? {
    main: He[400],
    light: He[300],
    dark: He[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: He[500],
    dark: He[900]
  };
}
function vi(e) {
  const {
    mode: r = "light",
    contrastThreshold: n = 3,
    tonalOffset: t = 0.2
  } = e, o = Ee(e, pi), a = e.primary || fi(r), i = e.secondary || mi(r), l = e.error || hi(r), c = e.info || gi(r), s = e.success || bi(r), d = e.warning || yi(r);
  function m(h) {
    const p = wn(h, Tr.text.primary) >= n ? Tr.text.primary : xn.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const S = wn(h, p);
      S < 3 && console.error([`MUI: The contrast ratio of ${S}:1 for ${p} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return p;
  }
  const u = ({
    color: h,
    name: p,
    mainShade: S = 500,
    lightShade: K = 300,
    darkShade: A = 700
  }) => {
    if (h = D({}, h), !h.main && h[S] && (h.main = h[S]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${p ? ` (${p})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.` : Le(11, p ? ` (${p})` : "", S));
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
} });` : Le(12, p ? ` (${p})` : "", JSON.stringify(h.main)));
    return kn(h, "light", K, t), kn(h, "dark", A, t), h.contrastText || (h.contrastText = m(h.main)), h;
  }, v = {
    dark: Tr,
    light: xn
  };
  return process.env.NODE_ENV !== "production" && (v[r] || console.error(`MUI: The palette mode \`${r}\` is not supported.`)), ye(D({
    // A collection of common colors.
    common: D({}, Je),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: r,
    // The colors used to represent primary interface elements for a user.
    primary: u({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: u({
      color: i,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: u({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: u({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: u({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: u({
      color: s,
      name: "success"
    }),
    // The grey colors.
    grey: ai,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: m,
    // Generate a rich color object.
    augmentColor: u,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: t
  }, v[r]), o);
}
const wi = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function xi(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Sn = {
  textTransform: "uppercase"
}, En = '"Roboto", "Helvetica", "Arial", sans-serif';
function ki(e, r) {
  const n = typeof r == "function" ? r(e) : r, {
    fontFamily: t = En,
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
    allVariants: d,
    pxToRem: m
  } = n, u = Ee(n, wi);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof s != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const v = o / 14, y = m || ((S) => `${S / s * v}rem`), h = (S, K, A, C, g) => D({
    fontFamily: t,
    fontWeight: S,
    fontSize: y(K),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: A
  }, t === En ? {
    letterSpacing: `${xi(C / K)}em`
  } : {}, g, d), p = {
    h1: h(a, 96, 1.167, -1.5),
    h2: h(a, 60, 1.2, -0.5),
    h3: h(i, 48, 1.167, 0),
    h4: h(i, 34, 1.235, 0.25),
    h5: h(i, 24, 1.334, 0),
    h6: h(l, 20, 1.6, 0.15),
    subtitle1: h(i, 16, 1.75, 0.15),
    subtitle2: h(l, 14, 1.57, 0.1),
    body1: h(i, 16, 1.5, 0.15),
    body2: h(i, 14, 1.43, 0.15),
    button: h(l, 14, 1.75, 0.4, Sn),
    caption: h(i, 12, 1.66, 0.4),
    overline: h(i, 12, 2.66, 1, Sn),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return ye(D({
    htmlFontSize: s,
    pxToRem: y,
    fontFamily: t,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: l,
    fontWeightBold: c
  }, p), u, {
    clone: !1
    // No need to clone deep
  });
}
const Si = 0.2, Ei = 0.14, Ci = 0.12;
function q(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Si})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Ei})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ci})`].join(",");
}
const Ni = ["none", q(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), q(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), q(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), q(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), q(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), q(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), q(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), q(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), q(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), q(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), q(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), q(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), q(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), q(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), q(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), q(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), q(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), q(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), q(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), q(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), q(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), q(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), q(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), q(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ti = Ni, _i = ["duration", "easing", "delay"], Oi = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Ri = {
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
function Cn(e) {
  return `${Math.round(e)}ms`;
}
function $i(e) {
  if (!e)
    return 0;
  const r = e / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function Ii(e) {
  const r = D({}, Oi, e.easing), n = D({}, Ri, e.duration);
  return D({
    getAutoHeightDuration: $i,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = n.standard,
        easing: l = r.easeInOut,
        delay: c = 0
      } = a, s = Ee(a, _i);
      if (process.env.NODE_ENV !== "production") {
        const d = (u) => typeof u == "string", m = (u) => !isNaN(parseFloat(u));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !m(i) && !d(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), d(l) || console.error('MUI: Argument "easing" must be a string.'), !m(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(s).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(s).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof i == "string" ? i : Cn(i)} ${l} ${typeof c == "string" ? c : Cn(c)}`).join(",");
    }
  }, e, {
    easing: r,
    duration: n
  });
}
const Ai = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Pi = Ai, Mi = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Bi(e = {}, ...r) {
  const {
    mixins: n = {},
    palette: t = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = Ee(e, Mi);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Le(18));
  const l = vi(t), c = Lr(e);
  let s = ye(c, {
    mixins: ni(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ti.slice(),
    typography: ki(l, a),
    transitions: Ii(o),
    zIndex: D({}, Pi),
    applyDarkStyles(d) {
      return this.vars ? {
        [this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/, ":where($1)")]: d
      } : this.palette.mode === "dark" ? d : {};
    }
  });
  if (s = ye(s, i), s = r.reduce((d, m) => ye(d, m), s), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], m = (u, v) => {
      let y;
      for (y in u) {
        const h = u[y];
        if (d.indexOf(y) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const p = zr("", y);
            console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(u, null, 2), "", `Instead, you need to use the '&.${p}' syntax:`, JSON.stringify({
              root: {
                [`&.${p}`]: h
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          u[y] = {};
        }
      }
    };
    Object.keys(s.components).forEach((u) => {
      const v = s.components[u].styleOverrides;
      v && u.indexOf("Mui") === 0 && m(v, u);
    });
  }
  return s.unstable_sxConfig = D({}, Vr, i == null ? void 0 : i.unstable_sxConfig), s.unstable_sx = function(m) {
    return Fr({
      sx: m,
      theme: this
    });
  }, s;
}
const zi = Bi(), st = zi, ct = "$$material";
function Di({
  props: e,
  name: r
}) {
  return Ja({
    props: e,
    name: r,
    defaultTheme: st,
    themeId: ct
  });
}
const ji = (e) => tr(e) && e !== "classes", Vi = Ya({
  themeId: ct,
  defaultTheme: st,
  rootShouldForwardProp: ji
}), Fi = Vi;
function Li(e) {
  return zr("MuiSvgIcon", e);
}
zo("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Ui = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Gi = (e) => {
  const {
    color: r,
    fontSize: n,
    classes: t
  } = e, o = {
    root: ["root", r !== "inherit" && `color${ve(r)}`, `fontSize${ve(n)}`]
  };
  return Io(o, Li, t);
}, Xi = Fi("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, r) => {
    const {
      ownerState: n
    } = e;
    return [r.root, n.color !== "inherit" && r[`color${ve(n.color)}`], r[`fontSize${ve(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: r
}) => {
  var n, t, o, a, i, l, c, s, d, m, u, v, y;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: r.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (n = e.transitions) == null || (t = n.create) == null ? void 0 : t.call(n, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((a = e.typography) == null || (i = a.pxToRem) == null ? void 0 : i.call(a, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((s = e.typography) == null || (d = s.pxToRem) == null ? void 0 : d.call(s, 35)) || "2.1875rem"
    }[r.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (m = (u = (e.vars || e).palette) == null || (u = u[r.color]) == null ? void 0 : u.main) != null ? m : {
      action: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.active,
      disabled: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[r.color]
  };
}), Gr = /* @__PURE__ */ Y.forwardRef(function(r, n) {
  const t = Di({
    props: r,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: s,
    inheritViewBox: d = !1,
    titleAccess: m,
    viewBox: u = "0 0 24 24"
  } = t, v = Ee(t, Ui), y = /* @__PURE__ */ Y.isValidElement(o) && o.type === "svg", h = D({}, t, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: r.fontSize,
    inheritViewBox: d,
    viewBox: u,
    hasSvgAsChild: y
  }), p = {};
  d || (p.viewBox = u);
  const S = Gi(h);
  return /* @__PURE__ */ H(Xi, D({
    as: l,
    className: yt(S.root, a),
    focusable: "false",
    color: s,
    "aria-hidden": m ? void 0 : !0,
    role: m ? "img" : void 0,
    ref: n
  }, p, v, y && o.props, {
    ownerState: h,
    children: [y ? o.props.children : o, m ? /* @__PURE__ */ f("title", {
      children: m
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Gr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: X.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: X.object,
  /**
   * @ignore
   */
  className: X.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: X.oneOfType([X.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), X.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: X.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: X.oneOfType([X.oneOf(["inherit", "large", "medium", "small"]), X.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: X.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: X.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: X.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: X.oneOfType([X.arrayOf(X.oneOfType([X.func, X.object, X.bool])), X.func, X.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: X.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: X.string
});
Gr.muiName = "SvgIcon";
const Nn = Gr;
function Hi(e, r) {
  function n(t, o) {
    return /* @__PURE__ */ f(Nn, D({
      "data-testid": `${r}Icon`,
      ref: o
    }, t, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${r}Icon`), n.muiName = Nn.muiName, /* @__PURE__ */ Y.memo(/* @__PURE__ */ Y.forwardRef(n));
}
const Wi = Hi(/* @__PURE__ */ f("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function hs({
  menu: e,
  dataHandler: r,
  commandHandler: n,
  className: t,
  id: o,
  children: a
}) {
  const [i, l] = fe(!1), [c, s] = fe(!1), d = ke(() => {
    i && l(!1), s(!1);
  }, [i]), m = ke((S) => {
    S.stopPropagation(), l((K) => {
      const A = !K;
      return A && S.shiftKey ? s(!0) : A || s(!1), A;
    });
  }, []), u = ar(void 0), [v, y] = fe(0);
  dr(() => {
    i && u.current && y(u.current.clientHeight);
  }, [i]);
  const h = ke(
    (S) => (d(), n(S)),
    [n, d]
  );
  let p = e;
  return !p && r && (p = r(c)), /* @__PURE__ */ f("div", { ref: u, style: { position: "relative" }, children: /* @__PURE__ */ f(Rt, { position: "static", id: o, children: /* @__PURE__ */ H($t, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    p ? /* @__PURE__ */ f(
      An,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: m,
        children: /* @__PURE__ */ f(Wi, {})
      }
    ) : void 0,
    a ? /* @__PURE__ */ f("div", { className: "papi-menu-children", children: a }) : void 0,
    p ? /* @__PURE__ */ f(
      It,
      {
        className: `papi-menu-drawer ${t ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: i,
        onClose: d,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: v
          }
        },
        children: /* @__PURE__ */ f(ho, { commandHandler: h, columns: p.columns })
      }
    ) : void 0
  ] }) }) });
}
const gs = (e, r) => {
  dr(() => {
    if (!e)
      return () => {
      };
    const n = e(r);
    return () => {
      n();
    };
  }, [e, r]);
};
function qi(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Yi = (e, r, n = {}) => {
  const t = ar(r);
  t.current = r;
  const o = ar(n);
  o.current = qi(o.current);
  const [a, i] = fe(() => t.current), [l, c] = fe(!0);
  return dr(() => {
    let s = !0;
    return c(!!e), (async () => {
      if (e) {
        const d = await e();
        s && (i(() => d), c(!1));
      }
    })(), () => {
      s = !1, o.current.preserveValue || i(() => t.current);
    };
  }, [e]), [a, l];
}, _r = () => !1, bs = (e, r) => {
  const [n] = Yi(
    ke(async () => {
      if (!e)
        return _r;
      const t = await Promise.resolve(e(r));
      return async () => t();
    }, [r, e]),
    _r,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  dr(() => () => {
    n !== _r && n();
  }, [n]);
};
function Ki(e, r = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), t = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), r === "top" && t ? n.insertBefore(o, t) : n.appendChild(o);
}
Ki(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.paratext {
  background-color: darkgreen;
  color: greenyellow;
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
.pr-block {
    display: block;
}
.pr-flex {
    display: flex;
}
.pr-grid {
    display: grid;
}
.pr-aspect-square {
    aspect-ratio: 1 / 1;
}
.pr-h-10 {
    height: 2.5rem;
}
.pr-h-2 {
    height: 0.5rem;
}
.pr-h-2\\.5 {
    height: 0.625rem;
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
.pr-w-0\\.5 {
    width: 0.125rem;
}
.pr-w-2 {
    width: 0.5rem;
}
.pr-w-2\\.5 {
    width: 0.625rem;
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
.pr-w-full {
    width: 100%;
}
.pr-min-w-\\[8rem\\] {
    min-width: 8rem;
}
.pr-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
    min-width: var(--radix-select-trigger-width);
}
.pr-grow {
    flex-grow: 1;
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
.pr-justify-end {
    justify-content: flex-end;
}
.pr-justify-center {
    justify-content: center;
}
.pr-justify-between {
    justify-content: space-between;
}
.pr-gap-2 {
    gap: 0.5rem;
}
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-border {
    border-width: 1px;
}
.pr-border-2 {
    border-width: 2px;
}
.pr-border-input {
    border-color: hsl(var(--input));
}
.pr-border-primary {
    border-color: hsl(var(--primary));
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
.pr-text-current {
    color: currentColor;
}
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
}
.pr-text-primary {
    color: hsl(var(--primary));
}
.pr-text-slate-700 {
    --tw-text-opacity: 1;
    color: rgb(51 65 85 / var(--tw-text-opacity));
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
}
.\\[\\&\\>span\\]\\:pr-line-clamp-1>span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}@layer rdg.MeasuringCell {.m1l09lto7-0-0-beta-34 {
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
`, "top");
export {
  is as BookChapterControl,
  Ae as Button,
  ss as ChapterRangeSelector,
  po as Checkbox,
  Or as ComboBox,
  ho as GridMenu,
  cs as IconButton,
  Ve as LabelPosition,
  fo as MenuItem,
  ls as RefSelector,
  ds as SearchBar,
  us as Slider,
  ps as Snackbar,
  fs as Switch,
  ms as Table,
  ir as TextField,
  hs as Toolbar,
  gs as useEvent,
  bs as useEventAsync,
  Yi as usePromise
};
//# sourceMappingURL=index.js.map
