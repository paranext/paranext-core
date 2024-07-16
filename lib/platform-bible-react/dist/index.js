import us, { jsxs as de, jsx as y, Fragment as Wn } from "react/jsx-runtime";
import * as k from "react";
import re, { forwardRef as Pi, useCallback as Pe, useState as Ee, useRef as bt, useEffect as Ft, useLayoutEffect as No, useMemo as mn } from "react";
import { getChaptersForBook as Ri, offsetBook as So, FIRST_SCR_BOOK_NUM as ds, offsetChapter as Co, FIRST_SCR_CHAPTER_NUM as fs, offsetVerse as Po, FIRST_SCR_VERSE_NUM as hs } from "platform-bible-utils";
import * as he from "@radix-ui/react-dropdown-menu";
import { ChevronRight as ms, Check as gs, Circle as bs, History as vs, ArrowDownWideNarrow as ys, Clock as ws, Bookmark as xs } from "lucide-react";
import ke, { clsx as Es } from "clsx";
import { twMerge as ks } from "tailwind-merge";
import { Slot as Ts } from "@radix-ui/react-slot";
import { cva as Br } from "class-variance-authority";
import { Autocomplete as Os, TextField as Ns, FormControlLabel as Ro, FormLabel as Ss, Checkbox as Cs, MenuItem as Ps, ListItemText as Rs, ListItemIcon as $i, Menu as $s, Grid as Mi, List as Ms, IconButton as Ii, Drawer as Is, Slider as _s, Snackbar as As, Switch as Ds, AppBar as js, Toolbar as Bs } from "@mui/material";
import Ls, { ThemeContext as Fs, internal_processStyles as Vs } from "@mui/styled-engine";
import * as zs from "react-dom";
import Nn from "react-dom";
import * as _i from "@radix-ui/react-label";
import Us, { SelectColumn as Hs } from "react-data-grid";
import * as Me from "@radix-ui/react-tabs";
import * as en from "@radix-ui/react-slider";
import * as Tr from "@radix-ui/react-switch";
var Ws = Object.defineProperty, qs = (e, t, n) => t in e ? Ws(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ne = (e, t, n) => qs(e, typeof t != "symbol" ? t + "" : t, n);
const yt = [
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
], Lr = [
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
], Ai = [
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
], $o = nl();
function Vt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in $o ? $o[e] : 0;
}
function Fr(e) {
  return Vt(e) > 0;
}
function Xs(e) {
  const t = typeof e == "string" ? Vt(e) : e;
  return t >= 40 && t <= 66;
}
function Ys(e) {
  return (typeof e == "string" ? Vt(e) : e) <= 39;
}
function Di(e) {
  return e <= 66;
}
function Gs(e) {
  const t = typeof e == "string" ? Vt(e) : e;
  return Li(t) && !Di(t);
}
function* Ks() {
  for (let e = 1; e <= yt.length; e++)
    yield e;
}
const Js = 1, ji = yt.length;
function Zs() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Vr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= yt.length ? t : yt[n];
}
function Bi(e) {
  return e <= 0 || e > ji ? "******" : Ai[e - 1];
}
function Qs(e) {
  return Bi(Vt(e));
}
function Li(e) {
  const t = typeof e == "number" ? Vr(e) : e;
  return Fr(t) && !Lr.includes(t);
}
function el(e) {
  const t = typeof e == "number" ? Vr(e) : e;
  return Fr(t) && Lr.includes(t);
}
function tl(e) {
  return Ai[e - 1].includes("*obsolete*");
}
function nl() {
  const e = {};
  for (let t = 0; t < yt.length; t++)
    e[yt[t]] = t + 1;
  return e;
}
const ue = {
  allBookIds: yt,
  nonCanonicalIds: Lr,
  bookIdToNumber: Vt,
  isBookIdValid: Fr,
  isBookNT: Xs,
  isBookOT: Ys,
  isBookOTNT: Di,
  isBookDC: Gs,
  allBookNumbers: Ks,
  firstBook: Js,
  lastBook: ji,
  extraBooks: Zs,
  bookNumberToId: Vr,
  bookNumberToEnglishName: Bi,
  bookIdToEnglishName: Qs,
  isCanonical: Li,
  isExtraMaterial: el,
  isObsolete: tl
};
var We = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(We || {});
const Ae = class {
  // private versInfo: Versification;
  constructor(t) {
    if (ne(this, "name"), ne(this, "fullPath"), ne(this, "isPresent"), ne(this, "hasVerseSegments"), ne(this, "isCustomized"), ne(this, "baseVersification"), ne(this, "scriptureBooks"), ne(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = We[t]) : (this._type = t, this.name = We[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
ne(Ae, "Original", new Ae(We.Original)), ne(Ae, "Septuagint", new Ae(We.Septuagint)), ne(Ae, "Vulgate", new Ae(We.Vulgate)), ne(Ae, "English", new Ae(We.English)), ne(Ae, "RussianProtestant", new Ae(We.RussianProtestant)), ne(Ae, "RussianOrthodox", new Ae(We.RussianOrthodox));
let dt = Ae;
function Mo(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Fi = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Fi || {});
const Ce = class ae {
  constructor(t, n, r, o) {
    if (ne(this, "firstChapter"), ne(this, "lastChapter"), ne(this, "lastVerse"), ne(this, "hasSegmentsDefined"), ne(this, "text"), ne(this, "BBBCCCVVVS"), ne(this, "longHashCode"), ne(this, "versification"), ne(this, "rtlMark", "‏"), ne(this, "_bookNum", 0), ne(this, "_chapterNum", 0), ne(this, "_verseNum", 0), ne(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof dt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof dt ? n : void 0;
        this.setEmpty(i), this._verseNum = t % ae.chapterDigitShifter, this._chapterNum = Math.floor(
          t % ae.bookDigitShifter / ae.chapterDigitShifter
        ), this._bookNum = Math.floor(t / ae.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof ae) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null)
            return;
          const i = t instanceof dt ? t : ae.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? ae.defaultVersification;
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
      return n = new ae(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Yt)
        return n = new ae(), { success: !1, verseRef: n };
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
    return t % ae.bcvMaxValue * ae.bookDigitShifter + (n >= 0 ? n % ae.bcvMaxValue * ae.chapterDigitShifter : 0) + (r >= 0 ? r % ae.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: o, verse: i, versificationStr: s } = t, l = i || o.toString();
    let c;
    return s && (c = new dt(s)), n ? new ae(n, r.toString(), l, c) : new ae();
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
      if (n = n * 10 + +r - 0, n > ae.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(ae.verseRangeSeparator) || this._verse.includes(ae.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ue.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = ue.bookIdToNumber(t);
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
    const { success: n, vNum: r } = ae.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ae.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > ue.lastBook)
      throw new Yt(
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
    this.versification = this.versification != null ? new dt(t) : void 0;
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
    return this.validateVerse(ae.verseRangeSeparators, ae.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return ae.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return ae.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new dt(We[s]);
        } catch {
          throw new Yt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Yt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ue.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ae.isVerseParseable(r[1]))
      throw new Yt("Invalid reference : " + t);
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
    return new ae(this);
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
    return t instanceof ae ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, n = ae.verseRangeSeparators, r = ae.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = Mo(this._verse, r);
    for (const s of i.map((l) => Mo(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const p = this.clone();
        if (p.verse = s[1], !t)
          for (let u = c + 1; u < p.verseNum; u++) {
            const f = new ae(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || o.push(f);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ue.lastBook ? 2 : (ue.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = ae.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = ue.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
ne(Ce, "defaultVersification", dt.English), ne(Ce, "verseRangeSeparator", "-"), ne(Ce, "verseSequenceIndicator", ","), ne(Ce, "verseRangeSeparators", [Ce.verseRangeSeparator]), ne(Ce, "verseSequenceIndicators", [Ce.verseSequenceIndicator]), ne(Ce, "chapterDigitShifter", 1e3), ne(Ce, "bookDigitShifter", Ce.chapterDigitShifter * Ce.chapterDigitShifter), ne(Ce, "bcvMaxValue", Ce.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
ne(Ce, "ValidStatusType", Fi);
class Yt extends Error {
}
function te(...e) {
  return ks(Es(e));
}
const rl = he.Root, ol = he.Trigger, nm = he.Group, rm = he.Portal, om = he.Sub, im = he.RadioGroup, il = re.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ de(
  he.SubTrigger,
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
      /* @__PURE__ */ y(ms, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
il.displayName = he.SubTrigger.displayName;
const al = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  he.SubContent,
  {
    ref: n,
    className: te(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
al.displayName = he.SubContent.displayName;
const Vi = re.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ y(he.Portal, { children: /* @__PURE__ */ y(
  he.Content,
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
Vi.displayName = he.Content.displayName;
const zi = re.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ y(
  he.Item,
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
zi.displayName = he.Item.displayName;
const sl = re.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ de(
  he.CheckboxItem,
  {
    ref: o,
    className: te(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(he.ItemIndicator, { children: /* @__PURE__ */ y(gs, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
sl.displayName = he.CheckboxItem.displayName;
const ll = re.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ de(
  he.RadioItem,
  {
    ref: r,
    className: te(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(he.ItemIndicator, { children: /* @__PURE__ */ y(bs, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
ll.displayName = he.RadioItem.displayName;
const zr = re.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ y(
  he.Label,
  {
    ref: r,
    className: te("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
zr.displayName = he.Label.displayName;
const Ui = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  he.Separator,
  {
    ref: n,
    className: te("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Ui.displayName = he.Separator.displayName;
function cl({ className: e, ...t }) {
  return /* @__PURE__ */ y(
    "span",
    {
      className: te("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
cl.displayName = "DropdownMenuShortcut";
const Ur = re.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ y(
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
Ur.displayName = "Input";
const pl = Pi(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ de("div", { className: "pr-relative", children: [
    /* @__PURE__ */ y(
      Ur,
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
    /* @__PURE__ */ y(
      vs,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function ul({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (l, c) => c + 1), s = Pe(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ y("div", { className: te("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((l) => /* @__PURE__ */ y(
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
const dl = Pi(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, l) => /* @__PURE__ */ de(
    zi,
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
        /* @__PURE__ */ y(
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
            children: ue.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ y("div", { children: s })
      ]
    },
    e
  )
);
function fl({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ de(zr, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ y("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ de("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ y(
        ys,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ y(
        ws,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ y(
        xs,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const on = ue.allBookIds, hl = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Io = ["OT", "NT", "DC"], ml = 32 + 32 + 32, gl = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], bl = (e) => ({
  OT: on.filter((n) => ue.isBookOT(n)),
  NT: on.filter((n) => ue.isBookNT(n)),
  DC: on.filter((n) => ue.isBookDC(n))
})[e], Gt = (e) => Ri(ue.bookIdToNumber(e));
function vl() {
  return on.map((t) => ue.bookIdToEnglishName(t));
}
function yl(e) {
  return vl().includes(e);
}
function wl(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (yl(t))
    return on.find((r) => ue.bookIdToEnglishName(r) === t);
}
function am({ scrRef: e, handleSubmit: t }) {
  const [n, r] = Ee(""), [o, i] = Ee(
    ue.bookNumberToId(e.bookNum)
  ), [s, l] = Ee(e.chapterNum ?? 0), [c, p] = Ee(
    ue.bookNumberToId(e.bookNum)
  ), [u, f] = Ee(!1), [d, g] = Ee(u), v = bt(void 0), b = bt(void 0), h = bt(void 0), E = Pe(
    (S) => bl(S).filter((R) => {
      const $ = ue.bookIdToEnglishName(R).toLowerCase(), j = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return $.includes(j) || // Match book name
      R.toLowerCase().includes(j);
    }),
    [n]
  ), I = (S) => {
    r(S);
  }, w = bt(!1), x = Pe((S) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    f(S);
  }, []), m = Pe(
    (S, R, $, j) => {
      if (l(
        ue.bookNumberToId(e.bookNum) !== S ? 1 : e.chapterNum
      ), R || Gt(S) === -1) {
        t({
          bookNum: ue.bookIdToNumber(S),
          chapterNum: $ || 1,
          verseNum: j || 1
        }), f(!1), r("");
        return;
      }
      i(o !== S ? S : ""), f(!R);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), N = (S) => {
    S <= 0 || S > Gt(o) || m(o, !0, S);
  }, C = Pe(() => {
    gl.forEach((S) => {
      const R = n.match(S);
      if (R) {
        const [$, j = void 0, D = void 0] = R.slice(1), M = wl($);
        (ue.isBookIdValid($) || M) && m(
          M ?? $,
          !0,
          j ? parseInt(j, 10) : 1,
          D ? parseInt(D, 10) : 1
        );
      }
    });
  }, [m, n]), L = Pe(
    (S) => {
      u ? (S.key === "ArrowDown" || S.key === "ArrowUp") && (typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null ? h.current.focus() : typeof b < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      b.current !== null && b.current.focus(), S.preventDefault()) : f(!0);
    },
    [u]
  ), B = (S) => {
    const { key: R } = S;
    R === "ArrowRight" || R === "ArrowLeft" || R === "ArrowDown" || R === "ArrowUp" || R === "Enter" || (v.current.dispatchEvent(new KeyboardEvent("keydown", { key: R })), v.current.focus());
  }, F = (S) => {
    const { key: R } = S;
    if (c === o) {
      if (R === "Enter") {
        S.preventDefault(), m(o, !0, s);
        return;
      }
      let $ = 0;
      if (R === "ArrowRight")
        if (s < Gt(c))
          $ = 1;
        else {
          S.preventDefault();
          return;
        }
      else if (R === "ArrowLeft")
        if (s > 1)
          $ = -1;
        else {
          S.preventDefault();
          return;
        }
      else
        R === "ArrowDown" ? $ = 6 : R === "ArrowUp" && ($ = -6);
      s + $ <= 0 || s + $ > Gt(c) ? l(0) : $ !== 0 && (l(s + $), S.preventDefault());
    }
  };
  return Ft(() => {
    o === c ? o === ue.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), No(() => {
    g(u);
  }, [u]), No(() => {
    const S = setTimeout(() => {
      if (d && b.current && h.current) {
        const $ = h.current.offsetTop - ml;
        b.current.scrollTo({ top: $, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(S);
    };
  }, [d]), /* @__PURE__ */ y("div", { className: "pr-flex", children: /* @__PURE__ */ de(rl, { modal: !1, open: u, onOpenChange: x, children: [
    /* @__PURE__ */ y(ol, { asChild: !0, children: /* @__PURE__ */ y(
      pl,
      {
        ref: v,
        value: n,
        handleSearch: I,
        handleKeyDown: L,
        handleOnClick: () => {
          i(ue.bookNumberToId(e.bookNum)), p(ue.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), f(!0), v.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: C,
        placeholder: `${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ de(
      Vi,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: B,
        align: "start",
        ref: b,
        children: [
          /* @__PURE__ */ y(
            fl,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          Io.map(
            (S, R) => E(S).length > 0 && /* @__PURE__ */ de("div", { children: [
              /* @__PURE__ */ y(zr, { className: "pr-font-semibold pr-text-slate-700", children: hl[S] }),
              E(S).map(($) => /* @__PURE__ */ y("div", { children: /* @__PURE__ */ y(
                dl,
                {
                  bookId: $,
                  handleSelectBook: () => m($, !1),
                  isSelected: o === $,
                  handleHighlightBook: () => p($),
                  handleKeyDown: F,
                  bookType: S,
                  ref: (j) => {
                    o === $ && (h.current = j);
                  },
                  children: /* @__PURE__ */ y(
                    ul,
                    {
                      handleSelectChapter: N,
                      endChapter: Gt($),
                      activeChapter: e.bookNum === ue.bookIdToNumber($) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (j) => {
                        l(j);
                      }
                    }
                  )
                }
              ) }, $)),
              Io.length - 1 !== R ? /* @__PURE__ */ y(Ui, {}) : void 0
            ] }, S)
          )
        ]
      }
    )
  ] }) });
}
const xl = Br(
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
), ft = re.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ y(r ? Ts : "button", { className: te(xl({ variant: t, size: n, className: e })), ref: i, ...o })
);
ft.displayName = "Button";
function Or({
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
  onFocus: f,
  onBlur: d,
  getOptionLabel: g
}) {
  return /* @__PURE__ */ y(
    Os,
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
      onFocus: f,
      onBlur: d,
      getOptionLabel: g,
      renderInput: (v) => /* @__PURE__ */ y(
        Ns,
        {
          ...v,
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
function sm({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, i] = Ee(1), [s, l] = Ee(r), [c, p] = Ee(
    Array.from({ length: r }, (d, g) => g + 1)
  );
  Ft(() => {
    i(1), e(1), l(r), t(r), p(Array.from({ length: r }, (d, g) => g + 1));
  }, [r, t, e]);
  const u = (d, g) => {
    i(g), e(g), g > s && (l(g), t(g));
  }, f = (d, g) => {
    l(g), t(g), g < o && (i(g), e(g));
  };
  return /* @__PURE__ */ de(Wn, { children: [
    /* @__PURE__ */ y(
      Ro,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ y(
          Or,
          {
            onChange: (d, g) => u(d, g),
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
    /* @__PURE__ */ y(
      Ro,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ y(
          Or,
          {
            onChange: (d, g) => f(d, g),
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
var $t = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))($t || {});
function Hi({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = $t.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: l = !1,
  className: c,
  onChange: p
}) {
  const u = /* @__PURE__ */ y(
    Cs,
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
  let f;
  if (n) {
    const d = r === $t.Before || r === $t.Above, g = /* @__PURE__ */ y("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), v = r === $t.Before || r === $t.After, b = v ? g : /* @__PURE__ */ y("div", { children: g }), h = v ? u : /* @__PURE__ */ y("div", { children: u });
    f = /* @__PURE__ */ de(
      Ss,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: l,
        children: [
          d && b,
          h,
          !d && b
        ]
      }
    );
  } else
    f = u;
  return f;
}
function lm({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s
}) {
  return /* @__PURE__ */ de("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ y("legend", { children: n }),
    r.map((l) => /* @__PURE__ */ y(
      Hi,
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
function T() {
  return T = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, T.apply(this, arguments);
}
function El(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function kl(e) {
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
var Nr = { exports: {} }, Sn = { exports: {} }, se = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _o;
function Tl() {
  if (_o)
    return se;
  _o = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, g = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, b = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
  function w(m) {
    if (typeof m == "object" && m !== null) {
      var N = m.$$typeof;
      switch (N) {
        case t:
          switch (m = m.type, m) {
            case c:
            case p:
            case r:
            case i:
            case o:
            case f:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case u:
                case v:
                case g:
                case s:
                  return m;
                default:
                  return N;
              }
          }
        case n:
          return N;
      }
    }
  }
  function x(m) {
    return w(m) === p;
  }
  return se.AsyncMode = c, se.ConcurrentMode = p, se.ContextConsumer = l, se.ContextProvider = s, se.Element = t, se.ForwardRef = u, se.Fragment = r, se.Lazy = v, se.Memo = g, se.Portal = n, se.Profiler = i, se.StrictMode = o, se.Suspense = f, se.isAsyncMode = function(m) {
    return x(m) || w(m) === c;
  }, se.isConcurrentMode = x, se.isContextConsumer = function(m) {
    return w(m) === l;
  }, se.isContextProvider = function(m) {
    return w(m) === s;
  }, se.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === t;
  }, se.isForwardRef = function(m) {
    return w(m) === u;
  }, se.isFragment = function(m) {
    return w(m) === r;
  }, se.isLazy = function(m) {
    return w(m) === v;
  }, se.isMemo = function(m) {
    return w(m) === g;
  }, se.isPortal = function(m) {
    return w(m) === n;
  }, se.isProfiler = function(m) {
    return w(m) === i;
  }, se.isStrictMode = function(m) {
    return w(m) === o;
  }, se.isSuspense = function(m) {
    return w(m) === f;
  }, se.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === r || m === p || m === i || m === o || m === f || m === d || typeof m == "object" && m !== null && (m.$$typeof === v || m.$$typeof === g || m.$$typeof === s || m.$$typeof === l || m.$$typeof === u || m.$$typeof === h || m.$$typeof === E || m.$$typeof === I || m.$$typeof === b);
  }, se.typeOf = w, se;
}
var le = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ao;
function Ol() {
  return Ao || (Ao = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, g = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, b = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
    function w(_) {
      return typeof _ == "string" || typeof _ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      _ === r || _ === p || _ === i || _ === o || _ === f || _ === d || typeof _ == "object" && _ !== null && (_.$$typeof === v || _.$$typeof === g || _.$$typeof === s || _.$$typeof === l || _.$$typeof === u || _.$$typeof === h || _.$$typeof === E || _.$$typeof === I || _.$$typeof === b);
    }
    function x(_) {
      if (typeof _ == "object" && _ !== null) {
        var J = _.$$typeof;
        switch (J) {
          case t:
            var P = _.type;
            switch (P) {
              case c:
              case p:
              case r:
              case i:
              case o:
              case f:
                return P;
              default:
                var ie = P && P.$$typeof;
                switch (ie) {
                  case l:
                  case u:
                  case v:
                  case g:
                  case s:
                    return ie;
                  default:
                    return J;
                }
            }
          case n:
            return J;
        }
      }
    }
    var m = c, N = p, C = l, L = s, B = t, F = u, S = r, R = v, $ = g, j = n, D = i, M = o, V = f, Q = !1;
    function Z(_) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(_) || x(_) === c;
    }
    function O(_) {
      return x(_) === p;
    }
    function A(_) {
      return x(_) === l;
    }
    function U(_) {
      return x(_) === s;
    }
    function Y(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === t;
    }
    function z(_) {
      return x(_) === u;
    }
    function H(_) {
      return x(_) === r;
    }
    function q(_) {
      return x(_) === v;
    }
    function X(_) {
      return x(_) === g;
    }
    function W(_) {
      return x(_) === n;
    }
    function G(_) {
      return x(_) === i;
    }
    function K(_) {
      return x(_) === o;
    }
    function oe(_) {
      return x(_) === f;
    }
    le.AsyncMode = m, le.ConcurrentMode = N, le.ContextConsumer = C, le.ContextProvider = L, le.Element = B, le.ForwardRef = F, le.Fragment = S, le.Lazy = R, le.Memo = $, le.Portal = j, le.Profiler = D, le.StrictMode = M, le.Suspense = V, le.isAsyncMode = Z, le.isConcurrentMode = O, le.isContextConsumer = A, le.isContextProvider = U, le.isElement = Y, le.isForwardRef = z, le.isFragment = H, le.isLazy = q, le.isMemo = X, le.isPortal = W, le.isProfiler = G, le.isStrictMode = K, le.isSuspense = oe, le.isValidElementType = w, le.typeOf = x;
  }()), le;
}
var Do;
function Wi() {
  return Do || (Do = 1, process.env.NODE_ENV === "production" ? Sn.exports = Tl() : Sn.exports = Ol()), Sn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var cr, jo;
function Nl() {
  if (jo)
    return cr;
  jo = 1;
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
  return cr = o() ? Object.assign : function(i, s) {
    for (var l, c = r(i), p, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var f in l)
        t.call(l, f) && (c[f] = l[f]);
      if (e) {
        p = e(l);
        for (var d = 0; d < p.length; d++)
          n.call(l, p[d]) && (c[p[d]] = l[p[d]]);
      }
    }
    return c;
  }, cr;
}
var pr, Bo;
function Hr() {
  if (Bo)
    return pr;
  Bo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return pr = e, pr;
}
var ur, Lo;
function qi() {
  return Lo || (Lo = 1, ur = Function.call.bind(Object.prototype.hasOwnProperty)), ur;
}
var dr, Fo;
function Sl() {
  if (Fo)
    return dr;
  Fo = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Hr(), n = {}, r = qi();
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
          var f;
          try {
            if (typeof i[u] != "function") {
              var d = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            f = i[u](s, u, c, l, null, t);
          } catch (v) {
            f = v;
          }
          if (f && !(f instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in n)) {
            n[f.message] = !0;
            var g = p ? p() : "";
            e(
              "Failed " + l + " type: " + f.message + (g ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, dr = o, dr;
}
var fr, Vo;
function Cl() {
  if (Vo)
    return fr;
  Vo = 1;
  var e = Wi(), t = Nl(), n = Hr(), r = qi(), o = Sl(), i = function() {
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
  return fr = function(l, c) {
    var p = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function f(O) {
      var A = O && (p && O[p] || O[u]);
      if (typeof A == "function")
        return A;
    }
    var d = "<<anonymous>>", g = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: I(),
      arrayOf: w,
      element: x(),
      elementType: m(),
      instanceOf: N,
      node: F(),
      objectOf: L,
      oneOf: C,
      oneOfType: B,
      shape: R,
      exact: $
    };
    function v(O, A) {
      return O === A ? O !== 0 || 1 / O === 1 / A : O !== O && A !== A;
    }
    function b(O, A) {
      this.message = O, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    b.prototype = Error.prototype;
    function h(O) {
      if (process.env.NODE_ENV !== "production")
        var A = {}, U = 0;
      function Y(H, q, X, W, G, K, oe) {
        if (W = W || d, K = K || X, oe !== n) {
          if (c) {
            var _ = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw _.name = "Invariant Violation", _;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var J = W + ":" + X;
            !A[J] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + K + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[J] = !0, U++);
          }
        }
        return q[X] == null ? H ? q[X] === null ? new b("The " + G + " `" + K + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new b("The " + G + " `" + K + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : O(q, X, W, G, K);
      }
      var z = Y.bind(null, !1);
      return z.isRequired = Y.bind(null, !0), z;
    }
    function E(O) {
      function A(U, Y, z, H, q, X) {
        var W = U[Y], G = M(W);
        if (G !== O) {
          var K = V(W);
          return new b(
            "Invalid " + H + " `" + q + "` of type " + ("`" + K + "` supplied to `" + z + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return h(A);
    }
    function I() {
      return h(s);
    }
    function w(O) {
      function A(U, Y, z, H, q) {
        if (typeof O != "function")
          return new b("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var X = U[Y];
        if (!Array.isArray(X)) {
          var W = M(X);
          return new b("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an array."));
        }
        for (var G = 0; G < X.length; G++) {
          var K = O(X, G, z, H, q + "[" + G + "]", n);
          if (K instanceof Error)
            return K;
        }
        return null;
      }
      return h(A);
    }
    function x() {
      function O(A, U, Y, z, H) {
        var q = A[U];
        if (!l(q)) {
          var X = M(q);
          return new b("Invalid " + z + " `" + H + "` of type " + ("`" + X + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(O);
    }
    function m() {
      function O(A, U, Y, z, H) {
        var q = A[U];
        if (!e.isValidElementType(q)) {
          var X = M(q);
          return new b("Invalid " + z + " `" + H + "` of type " + ("`" + X + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(O);
    }
    function N(O) {
      function A(U, Y, z, H, q) {
        if (!(U[Y] instanceof O)) {
          var X = O.name || d, W = Z(U[Y]);
          return new b("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected ") + ("instance of `" + X + "`."));
        }
        return null;
      }
      return h(A);
    }
    function C(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function A(U, Y, z, H, q) {
        for (var X = U[Y], W = 0; W < O.length; W++)
          if (v(X, O[W]))
            return null;
        var G = JSON.stringify(O, function(oe, _) {
          var J = V(_);
          return J === "symbol" ? String(_) : _;
        });
        return new b("Invalid " + H + " `" + q + "` of value `" + String(X) + "` " + ("supplied to `" + z + "`, expected one of " + G + "."));
      }
      return h(A);
    }
    function L(O) {
      function A(U, Y, z, H, q) {
        if (typeof O != "function")
          return new b("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var X = U[Y], W = M(X);
        if (W !== "object")
          return new b("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an object."));
        for (var G in X)
          if (r(X, G)) {
            var K = O(X, G, z, H, q + "." + G, n);
            if (K instanceof Error)
              return K;
          }
        return null;
      }
      return h(A);
    }
    function B(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var A = 0; A < O.length; A++) {
        var U = O[A];
        if (typeof U != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Q(U) + " at index " + A + "."
          ), s;
      }
      function Y(z, H, q, X, W) {
        for (var G = [], K = 0; K < O.length; K++) {
          var oe = O[K], _ = oe(z, H, q, X, W, n);
          if (_ == null)
            return null;
          _.data && r(_.data, "expectedType") && G.push(_.data.expectedType);
        }
        var J = G.length > 0 ? ", expected one of type [" + G.join(", ") + "]" : "";
        return new b("Invalid " + X + " `" + W + "` supplied to " + ("`" + q + "`" + J + "."));
      }
      return h(Y);
    }
    function F() {
      function O(A, U, Y, z, H) {
        return j(A[U]) ? null : new b("Invalid " + z + " `" + H + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return h(O);
    }
    function S(O, A, U, Y, z) {
      return new b(
        (O || "React class") + ": " + A + " type `" + U + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function R(O) {
      function A(U, Y, z, H, q) {
        var X = U[Y], W = M(X);
        if (W !== "object")
          return new b("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var G in O) {
          var K = O[G];
          if (typeof K != "function")
            return S(z, H, q, G, V(K));
          var oe = K(X, G, z, H, q + "." + G, n);
          if (oe)
            return oe;
        }
        return null;
      }
      return h(A);
    }
    function $(O) {
      function A(U, Y, z, H, q) {
        var X = U[Y], W = M(X);
        if (W !== "object")
          return new b("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        var G = t({}, U[Y], O);
        for (var K in G) {
          var oe = O[K];
          if (r(O, K) && typeof oe != "function")
            return S(z, H, q, K, V(oe));
          if (!oe)
            return new b(
              "Invalid " + H + " `" + q + "` key `" + K + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(U[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var _ = oe(X, K, z, H, q + "." + K, n);
          if (_)
            return _;
        }
        return null;
      }
      return h(A);
    }
    function j(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(j);
          if (O === null || l(O))
            return !0;
          var A = f(O);
          if (A) {
            var U = A.call(O), Y;
            if (A !== O.entries) {
              for (; !(Y = U.next()).done; )
                if (!j(Y.value))
                  return !1;
            } else
              for (; !(Y = U.next()).done; ) {
                var z = Y.value;
                if (z && !j(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function D(O, A) {
      return O === "symbol" ? !0 : A ? A["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && A instanceof Symbol : !1;
    }
    function M(O) {
      var A = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : D(A, O) ? "symbol" : A;
    }
    function V(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var A = M(O);
      if (A === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return A;
    }
    function Q(O) {
      var A = V(O);
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
    function Z(O) {
      return !O.constructor || !O.constructor.name ? d : O.constructor.name;
    }
    return g.checkPropTypes = o, g.resetWarningCache = o.resetWarningCache, g.PropTypes = g, g;
  }, fr;
}
var hr, zo;
function Pl() {
  if (zo)
    return hr;
  zo = 1;
  var e = Hr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, hr = function() {
    function r(s, l, c, p, u, f) {
      if (f !== e) {
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
  }, hr;
}
if (process.env.NODE_ENV !== "production") {
  var Rl = Wi(), $l = !0;
  Nr.exports = Cl()(Rl.isElement, $l);
} else
  Nr.exports = Pl()();
var Ml = Nr.exports;
const a = /* @__PURE__ */ El(Ml);
function zt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function gt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Xi(e) {
  if (!gt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Xi(e[n]);
  }), t;
}
function Qe(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? T({}, e) : e;
  return gt(e) && gt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (gt(t[o]) && o in e && gt(e[o]) ? r[o] = Qe(e[o], t[o], n) : n.clone ? r[o] = gt(t[o]) ? Xi(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function Il(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Yi(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !Il(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Gi = zt(a.element, Yi);
Gi.isRequired = zt(a.element.isRequired, Yi);
const gn = Gi;
function _l(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Al(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !_l(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Dl = zt(a.elementType, Al), jl = "exact-prop: ​";
function Ki(e) {
  return process.env.NODE_ENV === "production" ? e : T({}, e, {
    [jl]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function _t(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Sr = { exports: {} }, ce = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uo;
function Bl() {
  if (Uo)
    return ce;
  Uo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function b(h) {
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
                case d:
                case f:
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
  return ce.ContextConsumer = s, ce.ContextProvider = i, ce.Element = e, ce.ForwardRef = c, ce.Fragment = n, ce.Lazy = d, ce.Memo = f, ce.Portal = t, ce.Profiler = o, ce.StrictMode = r, ce.Suspense = p, ce.SuspenseList = u, ce.isAsyncMode = function() {
    return !1;
  }, ce.isConcurrentMode = function() {
    return !1;
  }, ce.isContextConsumer = function(h) {
    return b(h) === s;
  }, ce.isContextProvider = function(h) {
    return b(h) === i;
  }, ce.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, ce.isForwardRef = function(h) {
    return b(h) === c;
  }, ce.isFragment = function(h) {
    return b(h) === n;
  }, ce.isLazy = function(h) {
    return b(h) === d;
  }, ce.isMemo = function(h) {
    return b(h) === f;
  }, ce.isPortal = function(h) {
    return b(h) === t;
  }, ce.isProfiler = function(h) {
    return b(h) === o;
  }, ce.isStrictMode = function(h) {
    return b(h) === r;
  }, ce.isSuspense = function(h) {
    return b(h) === p;
  }, ce.isSuspenseList = function(h) {
    return b(h) === u;
  }, ce.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === p || h === u || h === g || typeof h == "object" && h !== null && (h.$$typeof === d || h.$$typeof === f || h.$$typeof === i || h.$$typeof === s || h.$$typeof === c || h.$$typeof === v || h.getModuleId !== void 0);
  }, ce.typeOf = b, ce;
}
var pe = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ho;
function Ll() {
  return Ho || (Ho = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), v = !1, b = !1, h = !1, E = !1, I = !1, w;
    w = Symbol.for("react.module.reference");
    function x(P) {
      return !!(typeof P == "string" || typeof P == "function" || P === n || P === o || I || P === r || P === p || P === u || E || P === g || v || b || h || typeof P == "object" && P !== null && (P.$$typeof === d || P.$$typeof === f || P.$$typeof === i || P.$$typeof === s || P.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      P.$$typeof === w || P.getModuleId !== void 0));
    }
    function m(P) {
      if (typeof P == "object" && P !== null) {
        var ie = P.$$typeof;
        switch (ie) {
          case e:
            var we = P.type;
            switch (we) {
              case n:
              case o:
              case r:
              case p:
              case u:
                return we;
              default:
                var Ne = we && we.$$typeof;
                switch (Ne) {
                  case l:
                  case s:
                  case c:
                  case d:
                  case f:
                  case i:
                    return Ne;
                  default:
                    return ie;
                }
            }
          case t:
            return ie;
        }
      }
    }
    var N = s, C = i, L = e, B = c, F = n, S = d, R = f, $ = t, j = o, D = r, M = p, V = u, Q = !1, Z = !1;
    function O(P) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(P) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(P) {
      return m(P) === s;
    }
    function Y(P) {
      return m(P) === i;
    }
    function z(P) {
      return typeof P == "object" && P !== null && P.$$typeof === e;
    }
    function H(P) {
      return m(P) === c;
    }
    function q(P) {
      return m(P) === n;
    }
    function X(P) {
      return m(P) === d;
    }
    function W(P) {
      return m(P) === f;
    }
    function G(P) {
      return m(P) === t;
    }
    function K(P) {
      return m(P) === o;
    }
    function oe(P) {
      return m(P) === r;
    }
    function _(P) {
      return m(P) === p;
    }
    function J(P) {
      return m(P) === u;
    }
    pe.ContextConsumer = N, pe.ContextProvider = C, pe.Element = L, pe.ForwardRef = B, pe.Fragment = F, pe.Lazy = S, pe.Memo = R, pe.Portal = $, pe.Profiler = j, pe.StrictMode = D, pe.Suspense = M, pe.SuspenseList = V, pe.isAsyncMode = O, pe.isConcurrentMode = A, pe.isContextConsumer = U, pe.isContextProvider = Y, pe.isElement = z, pe.isForwardRef = H, pe.isFragment = q, pe.isLazy = X, pe.isMemo = W, pe.isPortal = G, pe.isProfiler = K, pe.isStrictMode = oe, pe.isSuspense = _, pe.isSuspenseList = J, pe.isValidElementType = x, pe.typeOf = m;
  }()), pe;
}
process.env.NODE_ENV === "production" ? Sr.exports = Bl() : Sr.exports = Ll();
var Dn = Sr.exports;
const Fl = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Vl(e) {
  const t = `${e}`.match(Fl);
  return t && t[1] || "";
}
function Ji(e, t = "") {
  return e.displayName || e.name || Vl(e) || t;
}
function Wo(e, t, n) {
  const r = Ji(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function zl(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Ji(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Dn.ForwardRef:
          return Wo(e, e.render, "ForwardRef");
        case Dn.Memo:
          return Wo(e, e.type, "memo");
        default:
          return;
      }
  }
}
function et(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Ul = a.oneOfType([a.func, a.object]), Wr = Ul;
function Xe(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : _t(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Cr(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Zi(e, t = 166) {
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
function Hl(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Wl(e, t) {
  var n, r;
  return /* @__PURE__ */ k.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Te(e) {
  return e && e.ownerDocument || document;
}
function At(e) {
  return Te(e).defaultView || window;
}
function ql(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? T({}, t.propTypes) : null;
  return (o) => (i, s, l, c, p, ...u) => {
    const f = p || s, d = n == null ? void 0 : n[f];
    if (d) {
      const g = d(i, s, l, c, p, ...u);
      if (g)
        return g;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function jn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Xl = typeof window < "u" ? k.useLayoutEffect : k.useEffect, wt = Xl;
let qo = 0;
function Yl(e) {
  const [t, n] = k.useState(e), r = e || t;
  return k.useEffect(() => {
    t == null && (qo += 1, n(`mui-${qo}`));
  }, [t]), r;
}
const Xo = k["useId".toString()];
function Qi(e) {
  if (Xo !== void 0) {
    const t = Xo();
    return e ?? t;
  }
  return Yl(e);
}
function Gl(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function ea({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = k.useRef(e !== void 0), [i, s] = k.useState(t), l = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    k.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: p
    } = k.useRef(t);
    k.useEffect(() => {
      !o && p !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = k.useCallback((p) => {
    o || s(p);
  }, []);
  return [l, c];
}
function pn(e) {
  const t = k.useRef(e);
  return wt(() => {
    t.current = e;
  }), k.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Ve(...e) {
  return k.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      jn(n, t);
    });
  }, e);
}
const Yo = {};
function Kl(e, t) {
  const n = k.useRef(Yo);
  return n.current === Yo && (n.current = e(t)), n;
}
const Jl = [];
function Zl(e) {
  k.useEffect(e, Jl);
}
class bn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new bn();
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
function tn() {
  const e = Kl(bn.create).current;
  return Zl(e.disposeEffect), e;
}
let qn = !0, Pr = !1;
const Ql = new bn(), ec = {
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
function tc(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && ec[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function nc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (qn = !0);
}
function mr() {
  qn = !1;
}
function rc() {
  this.visibilityState === "hidden" && Pr && (qn = !0);
}
function oc(e) {
  e.addEventListener("keydown", nc, !0), e.addEventListener("mousedown", mr, !0), e.addEventListener("pointerdown", mr, !0), e.addEventListener("touchstart", mr, !0), e.addEventListener("visibilitychange", rc, !0);
}
function ic(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return qn || tc(t);
}
function ta() {
  const e = k.useCallback((o) => {
    o != null && oc(o.ownerDocument);
  }, []), t = k.useRef(!1);
  function n() {
    return t.current ? (Pr = !0, Ql.start(100, () => {
      Pr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return ic(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function na(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function ac(e) {
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
function sc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const lc = Number.isInteger || sc;
function ra(e, t, n, r) {
  const o = e[t];
  if (o == null || !lc(o)) {
    const i = ac(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function oa(e, t, ...n) {
  return e[t] === void 0 ? null : ra(e, t, ...n);
}
function Rr() {
  return null;
}
oa.isRequired = ra;
Rr.isRequired = Rr;
const ia = process.env.NODE_ENV === "production" ? Rr : oa;
function aa(e, t) {
  const n = T({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = T({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = T({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = aa(o[s], i[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function rt(e, t, n = void 0) {
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
const Go = (e) => e, cc = () => {
  let e = Go;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Go;
    }
  };
}, pc = cc(), sa = pc, la = {
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
function Ge(e, t, n = "Mui") {
  const r = la[t];
  return r ? `${n}-${r}` : `${sa.generate(e)}-${t}`;
}
function st(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Ge(e, o, n);
  }), r;
}
function uc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function ca(e) {
  return typeof e == "string";
}
function nn(e, t, n) {
  return e === void 0 || ca(e) ? t : T({}, t, {
    ownerState: T({}, t.ownerState, n)
  });
}
const dc = {
  disableDefaultClasses: !1
}, fc = /* @__PURE__ */ k.createContext(dc);
function hc(e) {
  const {
    disableDefaultClasses: t
  } = k.useContext(fc);
  return (n) => t ? "" : e(n);
}
function pa(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function mc(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Ko(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function gc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const g = ke(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = T({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), b = T({}, n, o, r);
    return g.length > 0 && (b.className = g), Object.keys(v).length > 0 && (b.style = v), {
      props: b,
      internalRef: void 0
    };
  }
  const s = pa(T({}, o, r)), l = Ko(r), c = Ko(o), p = t(s), u = ke(p == null ? void 0 : p.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = T({}, p == null ? void 0 : p.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), d = T({}, p, n, c, l);
  return u.length > 0 && (d.className = u), Object.keys(f).length > 0 && (d.style = f), {
    props: d,
    internalRef: p.ref
  };
}
const bc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function xt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = fe(e, bc), l = i ? {} : mc(r, o), {
    props: c,
    internalRef: p
  } = gc(T({}, s, {
    externalSlotProps: l
  })), u = Ve(p, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return nn(n, T({}, c, {
    ref: u
  }), o);
}
const ua = "base";
function vc(e) {
  return `${ua}--${e}`;
}
function yc(e, t) {
  return `${ua}-${e}-${t}`;
}
function da(e, t) {
  const n = la[t];
  return n ? vc(n) : yc(e, t);
}
function wc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = da(e, r);
  }), n;
}
const xc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Ec(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function kc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Tc(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || kc(e));
}
function Oc(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(xc)).forEach((r, o) => {
    const i = Ec(r);
    i === -1 || !Tc(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Nc() {
  return !0;
}
function Bn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Oc,
    isEnabled: s = Nc,
    open: l
  } = e, c = k.useRef(!1), p = k.useRef(null), u = k.useRef(null), f = k.useRef(null), d = k.useRef(null), g = k.useRef(!1), v = k.useRef(null), b = Ve(t.ref, v), h = k.useRef(null);
  k.useEffect(() => {
    !l || !v.current || (g.current = !n);
  }, [n, l]), k.useEffect(() => {
    if (!l || !v.current)
      return;
    const w = Te(v.current);
    return v.current.contains(w.activeElement) || (v.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), v.current.setAttribute("tabIndex", "-1")), g.current && v.current.focus()), () => {
      o || (f.current && f.current.focus && (c.current = !0, f.current.focus()), f.current = null);
    };
  }, [l]), k.useEffect(() => {
    if (!l || !v.current)
      return;
    const w = Te(v.current), x = (C) => {
      h.current = C, !(r || !s() || C.key !== "Tab") && w.activeElement === v.current && C.shiftKey && (c.current = !0, u.current && u.current.focus());
    }, m = () => {
      const C = v.current;
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
      if (!g.current)
        return;
      let L = [];
      if ((w.activeElement === p.current || w.activeElement === u.current) && (L = i(v.current)), L.length > 0) {
        var B, F;
        const S = !!((B = h.current) != null && B.shiftKey && ((F = h.current) == null ? void 0 : F.key) === "Tab"), R = L[0], $ = L[L.length - 1];
        typeof R != "string" && typeof $ != "string" && (S ? $.focus() : R.focus());
      } else
        C.focus();
    };
    w.addEventListener("focusin", m), w.addEventListener("keydown", x, !0);
    const N = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && m();
    }, 50);
    return () => {
      clearInterval(N), w.removeEventListener("focusin", m), w.removeEventListener("keydown", x, !0);
    };
  }, [n, r, o, s, l, i]);
  const E = (w) => {
    f.current === null && (f.current = w.relatedTarget), g.current = !0, d.current = w.target;
    const x = t.props.onFocus;
    x && x(w);
  }, I = (w) => {
    f.current === null && (f.current = w.relatedTarget), g.current = !0;
  };
  return /* @__PURE__ */ de(k.Fragment, {
    children: [/* @__PURE__ */ y("div", {
      tabIndex: l ? 0 : -1,
      onFocus: I,
      ref: p,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ k.cloneElement(t, {
      ref: b,
      onFocus: E
    }), /* @__PURE__ */ y("div", {
      tabIndex: l ? 0 : -1,
      onFocus: I,
      ref: u,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Bn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: gn,
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
process.env.NODE_ENV !== "production" && (Bn["propTypes"] = Ki(Bn.propTypes));
function Sc(e) {
  return typeof e == "function" ? e() : e;
}
const un = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, l] = k.useState(null), c = Ve(/* @__PURE__ */ k.isValidElement(r) ? r.ref : null, n);
  if (wt(() => {
    i || l(Sc(o) || document.body);
  }, [o, i]), wt(() => {
    if (s && !i)
      return jn(n, s), () => {
        jn(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ k.isValidElement(r)) {
      const p = {
        ref: c
      };
      return /* @__PURE__ */ k.cloneElement(r, p);
    }
    return /* @__PURE__ */ y(k.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ y(k.Fragment, {
    children: s && /* @__PURE__ */ zs.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (un.propTypes = {
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
  container: a.oneOfType([et, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool
});
process.env.NODE_ENV !== "production" && (un["propTypes"] = Ki(un.propTypes));
function Cc(e) {
  const t = Te(e);
  return t.body === e ? At(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function an(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Jo(e) {
  return parseInt(At(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Pc(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Zo(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1, c = !Pc(s);
    l && c && an(s, o);
  });
}
function gr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Rc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Cc(r)) {
      const s = na(Te(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Jo(r) + s}px`;
      const l = Te(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${Jo(c) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Te(r).body;
    else {
      const s = r.parentElement, l = At(r);
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
function $c(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Mc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && an(t.modalRef, !1);
    const o = $c(n);
    Zo(n, t.mount, t.modalRef, o, !0);
    const i = gr(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = gr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Rc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = gr(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && an(t.modalRef, n), Zo(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && an(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Ic(e) {
  return typeof e == "function" ? e() : e;
}
function _c(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Ac = new Mc();
function Dc(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Ac,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: p,
    open: u,
    rootRef: f
  } = e, d = k.useRef({}), g = k.useRef(null), v = k.useRef(null), b = Ve(v, f), [h, E] = k.useState(!u), I = _c(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const x = () => Te(g.current), m = () => (d.current.modalRef = v.current, d.current.mount = g.current, d.current), N = () => {
    o.mount(m(), {
      disableScrollLock: r
    }), v.current && (v.current.scrollTop = 0);
  }, C = pn(() => {
    const M = Ic(t) || x().body;
    o.add(m(), M), v.current && N();
  }), L = k.useCallback(() => o.isTopModal(m()), [o]), B = pn((M) => {
    g.current = M, M && (u && L() ? N() : v.current && an(v.current, w));
  }), F = k.useCallback(() => {
    o.remove(m(), w);
  }, [w, o]);
  k.useEffect(() => () => {
    F();
  }, [F]), k.useEffect(() => {
    u ? C() : (!I || !i) && F();
  }, [u, F, I, i, C]);
  const S = (M) => (V) => {
    var Q;
    (Q = M.onKeyDown) == null || Q.call(M, V), !(V.key !== "Escape" || V.which === 229 || // Wait until IME is settled.
    !L()) && (n || (V.stopPropagation(), p && p(V, "escapeKeyDown")));
  }, R = (M) => (V) => {
    var Q;
    (Q = M.onClick) == null || Q.call(M, V), V.target === V.currentTarget && p && p(V, "backdropClick");
  };
  return {
    getRootProps: (M = {}) => {
      const V = pa(e);
      delete V.onTransitionEnter, delete V.onTransitionExited;
      const Q = T({}, V, M);
      return T({
        role: "presentation"
      }, Q, {
        onKeyDown: S(Q),
        ref: b
      });
    },
    getBackdropProps: (M = {}) => {
      const V = M;
      return T({
        "aria-hidden": !0
      }, V, {
        onClick: R(V),
        open: u
      });
    },
    getTransitionProps: () => {
      const M = () => {
        E(!1), s && s();
      }, V = () => {
        E(!0), l && l(), i && F();
      };
      return {
        onEnter: Cr(M, c == null ? void 0 : c.props.onEnter),
        onExited: Cr(V, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: b,
    portalRef: B,
    isTopModal: L,
    exited: h,
    hasTransition: I
  };
}
var Re = "top", ze = "bottom", Ue = "right", $e = "left", qr = "auto", vn = [Re, ze, Ue, $e], Dt = "start", dn = "end", jc = "clippingParents", fa = "viewport", Kt = "popper", Bc = "reference", Qo = /* @__PURE__ */ vn.reduce(function(e, t) {
  return e.concat([t + "-" + Dt, t + "-" + dn]);
}, []), ha = /* @__PURE__ */ [].concat(vn, [qr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Dt, t + "-" + dn]);
}, []), Lc = "beforeRead", Fc = "read", Vc = "afterRead", zc = "beforeMain", Uc = "main", Hc = "afterMain", Wc = "beforeWrite", qc = "write", Xc = "afterWrite", Yc = [Lc, Fc, Vc, zc, Uc, Hc, Wc, qc, Xc];
function Ye(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function je(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Et(e) {
  var t = je(e).Element;
  return e instanceof t || e instanceof Element;
}
function Fe(e) {
  var t = je(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Xr(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = je(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Gc(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Fe(i) || !Ye(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function Kc(e) {
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
      !Fe(o) || !Ye(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Jc = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Gc,
  effect: Kc,
  requires: ["computeStyles"]
};
function qe(e) {
  return e.split("-")[0];
}
var vt = Math.max, Ln = Math.min, jt = Math.round;
function $r() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ma() {
  return !/^((?!chrome|android).)*safari/i.test($r());
}
function Bt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Fe(e) && (o = e.offsetWidth > 0 && jt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && jt(r.height) / e.offsetHeight || 1);
  var s = Et(e) ? je(e) : window, l = s.visualViewport, c = !ma() && n, p = (r.left + (c && l ? l.offsetLeft : 0)) / o, u = (r.top + (c && l ? l.offsetTop : 0)) / i, f = r.width / o, d = r.height / i;
  return {
    width: f,
    height: d,
    top: u,
    right: p + f,
    bottom: u + d,
    left: p,
    x: p,
    y: u
  };
}
function Yr(e) {
  var t = Bt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function ga(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Xr(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function tt(e) {
  return je(e).getComputedStyle(e);
}
function Zc(e) {
  return ["table", "td", "th"].indexOf(Ye(e)) >= 0;
}
function lt(e) {
  return ((Et(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Xn(e) {
  return Ye(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Xr(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    lt(e)
  );
}
function ei(e) {
  return !Fe(e) || // https://github.com/popperjs/popper-core/issues/837
  tt(e).position === "fixed" ? null : e.offsetParent;
}
function Qc(e) {
  var t = /firefox/i.test($r()), n = /Trident/i.test($r());
  if (n && Fe(e)) {
    var r = tt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Xn(e);
  for (Xr(o) && (o = o.host); Fe(o) && ["html", "body"].indexOf(Ye(o)) < 0; ) {
    var i = tt(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function yn(e) {
  for (var t = je(e), n = ei(e); n && Zc(n) && tt(n).position === "static"; )
    n = ei(n);
  return n && (Ye(n) === "html" || Ye(n) === "body" && tt(n).position === "static") ? t : n || Qc(e) || t;
}
function Gr(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function sn(e, t, n) {
  return vt(e, Ln(t, n));
}
function ep(e, t, n) {
  var r = sn(e, t, n);
  return r > n ? n : r;
}
function ba() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function va(e) {
  return Object.assign({}, ba(), e);
}
function ya(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var tp = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, va(typeof t != "number" ? t : ya(t, vn));
};
function np(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, l = qe(n.placement), c = Gr(l), p = [$e, Ue].indexOf(l) >= 0, u = p ? "height" : "width";
  if (!(!i || !s)) {
    var f = tp(o.padding, n), d = Yr(i), g = c === "y" ? Re : $e, v = c === "y" ? ze : Ue, b = n.rects.reference[u] + n.rects.reference[c] - s[c] - n.rects.popper[u], h = s[c] - n.rects.reference[c], E = yn(i), I = E ? c === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, w = b / 2 - h / 2, x = f[g], m = I - d[u] - f[v], N = I / 2 - d[u] / 2 + w, C = sn(x, N, m), L = c;
    n.modifiersData[r] = (t = {}, t[L] = C, t.centerOffset = C - N, t);
  }
}
function rp(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ga(t.elements.popper, o) && (t.elements.arrow = o));
}
const op = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: np,
  effect: rp,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Lt(e) {
  return e.split("-")[1];
}
var ip = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function ap(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: jt(n * o) / o || 0,
    y: jt(r * o) / o || 0
  };
}
function ti(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, p = e.adaptive, u = e.roundOffsets, f = e.isFixed, d = s.x, g = d === void 0 ? 0 : d, v = s.y, b = v === void 0 ? 0 : v, h = typeof u == "function" ? u({
    x: g,
    y: b
  }) : {
    x: g,
    y: b
  };
  g = h.x, b = h.y;
  var E = s.hasOwnProperty("x"), I = s.hasOwnProperty("y"), w = $e, x = Re, m = window;
  if (p) {
    var N = yn(n), C = "clientHeight", L = "clientWidth";
    if (N === je(n) && (N = lt(n), tt(N).position !== "static" && l === "absolute" && (C = "scrollHeight", L = "scrollWidth")), N = N, o === Re || (o === $e || o === Ue) && i === dn) {
      x = ze;
      var B = f && N === m && m.visualViewport ? m.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        N[C]
      );
      b -= B - r.height, b *= c ? 1 : -1;
    }
    if (o === $e || (o === Re || o === ze) && i === dn) {
      w = Ue;
      var F = f && N === m && m.visualViewport ? m.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        N[L]
      );
      g -= F - r.width, g *= c ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: l
  }, p && ip), R = u === !0 ? ap({
    x: g,
    y: b
  }, je(n)) : {
    x: g,
    y: b
  };
  if (g = R.x, b = R.y, c) {
    var $;
    return Object.assign({}, S, ($ = {}, $[x] = I ? "0" : "", $[w] = E ? "0" : "", $.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + b + "px)" : "translate3d(" + g + "px, " + b + "px, 0)", $));
  }
  return Object.assign({}, S, (t = {}, t[x] = I ? b + "px" : "", t[w] = E ? g + "px" : "", t.transform = "", t));
}
function sp(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, p = {
    placement: qe(t.placement),
    variation: Lt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ti(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ti(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const lp = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: sp,
  data: {}
};
var Cn = {
  passive: !0
};
function cp(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = je(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && p.forEach(function(u) {
    u.addEventListener("scroll", n.update, Cn);
  }), l && c.addEventListener("resize", n.update, Cn), function() {
    i && p.forEach(function(u) {
      u.removeEventListener("scroll", n.update, Cn);
    }), l && c.removeEventListener("resize", n.update, Cn);
  };
}
const pp = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: cp,
  data: {}
};
var up = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Mn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return up[t];
  });
}
var dp = {
  start: "end",
  end: "start"
};
function ni(e) {
  return e.replace(/start|end/g, function(t) {
    return dp[t];
  });
}
function Kr(e) {
  var t = je(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Jr(e) {
  return Bt(lt(e)).left + Kr(e).scrollLeft;
}
function fp(e, t) {
  var n = je(e), r = lt(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    var p = ma();
    (p || !p && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: l + Jr(e),
    y: c
  };
}
function hp(e) {
  var t, n = lt(e), r = Kr(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = vt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = vt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Jr(e), c = -r.scrollTop;
  return tt(o || n).direction === "rtl" && (l += vt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function Zr(e) {
  var t = tt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function wa(e) {
  return ["html", "body", "#document"].indexOf(Ye(e)) >= 0 ? e.ownerDocument.body : Fe(e) && Zr(e) ? e : wa(Xn(e));
}
function ln(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = wa(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = je(r), s = o ? [i].concat(i.visualViewport || [], Zr(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(ln(Xn(s)))
  );
}
function Mr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function mp(e, t) {
  var n = Bt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ri(e, t, n) {
  return t === fa ? Mr(fp(e, n)) : Et(t) ? mp(t, n) : Mr(hp(lt(e)));
}
function gp(e) {
  var t = ln(Xn(e)), n = ["absolute", "fixed"].indexOf(tt(e).position) >= 0, r = n && Fe(e) ? yn(e) : e;
  return Et(r) ? t.filter(function(o) {
    return Et(o) && ga(o, r) && Ye(o) !== "body";
  }) : [];
}
function bp(e, t, n, r) {
  var o = t === "clippingParents" ? gp(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], l = i.reduce(function(c, p) {
    var u = ri(e, p, r);
    return c.top = vt(u.top, c.top), c.right = Ln(u.right, c.right), c.bottom = Ln(u.bottom, c.bottom), c.left = vt(u.left, c.left), c;
  }, ri(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function xa(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? qe(r) : null, i = r ? Lt(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Re:
      c = {
        x: s,
        y: t.y - n.height
      };
      break;
    case ze:
      c = {
        x: s,
        y: t.y + t.height
      };
      break;
    case Ue:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case $e:
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
  var p = o ? Gr(o) : null;
  if (p != null) {
    var u = p === "y" ? "height" : "width";
    switch (i) {
      case Dt:
        c[p] = c[p] - (t[u] / 2 - n[u] / 2);
        break;
      case dn:
        c[p] = c[p] + (t[u] / 2 - n[u] / 2);
        break;
    }
  }
  return c;
}
function fn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? jc : l, p = n.rootBoundary, u = p === void 0 ? fa : p, f = n.elementContext, d = f === void 0 ? Kt : f, g = n.altBoundary, v = g === void 0 ? !1 : g, b = n.padding, h = b === void 0 ? 0 : b, E = va(typeof h != "number" ? h : ya(h, vn)), I = d === Kt ? Bc : Kt, w = e.rects.popper, x = e.elements[v ? I : d], m = bp(Et(x) ? x : x.contextElement || lt(e.elements.popper), c, u, s), N = Bt(e.elements.reference), C = xa({
    reference: N,
    element: w,
    strategy: "absolute",
    placement: o
  }), L = Mr(Object.assign({}, w, C)), B = d === Kt ? L : N, F = {
    top: m.top - B.top + E.top,
    bottom: B.bottom - m.bottom + E.bottom,
    left: m.left - B.left + E.left,
    right: B.right - m.right + E.right
  }, S = e.modifiersData.offset;
  if (d === Kt && S) {
    var R = S[o];
    Object.keys(F).forEach(function($) {
      var j = [Ue, ze].indexOf($) >= 0 ? 1 : -1, D = [Re, ze].indexOf($) >= 0 ? "y" : "x";
      F[$] += R[D] * j;
    });
  }
  return F;
}
function vp(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, p = c === void 0 ? ha : c, u = Lt(r), f = u ? l ? Qo : Qo.filter(function(v) {
    return Lt(v) === u;
  }) : vn, d = f.filter(function(v) {
    return p.indexOf(v) >= 0;
  });
  d.length === 0 && (d = f);
  var g = d.reduce(function(v, b) {
    return v[b] = fn(e, {
      placement: b,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[qe(b)], v;
  }, {});
  return Object.keys(g).sort(function(v, b) {
    return g[v] - g[b];
  });
}
function yp(e) {
  if (qe(e) === qr)
    return [];
  var t = Mn(e);
  return [ni(e), t, ni(t)];
}
function wp(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, p = n.padding, u = n.boundary, f = n.rootBoundary, d = n.altBoundary, g = n.flipVariations, v = g === void 0 ? !0 : g, b = n.allowedAutoPlacements, h = t.options.placement, E = qe(h), I = E === h, w = c || (I || !v ? [Mn(h)] : yp(h)), x = [h].concat(w).reduce(function(z, H) {
      return z.concat(qe(H) === qr ? vp(t, {
        placement: H,
        boundary: u,
        rootBoundary: f,
        padding: p,
        flipVariations: v,
        allowedAutoPlacements: b
      }) : H);
    }, []), m = t.rects.reference, N = t.rects.popper, C = /* @__PURE__ */ new Map(), L = !0, B = x[0], F = 0; F < x.length; F++) {
      var S = x[F], R = qe(S), $ = Lt(S) === Dt, j = [Re, ze].indexOf(R) >= 0, D = j ? "width" : "height", M = fn(t, {
        placement: S,
        boundary: u,
        rootBoundary: f,
        altBoundary: d,
        padding: p
      }), V = j ? $ ? Ue : $e : $ ? ze : Re;
      m[D] > N[D] && (V = Mn(V));
      var Q = Mn(V), Z = [];
      if (i && Z.push(M[R] <= 0), l && Z.push(M[V] <= 0, M[Q] <= 0), Z.every(function(z) {
        return z;
      })) {
        B = S, L = !1;
        break;
      }
      C.set(S, Z);
    }
    if (L)
      for (var O = v ? 3 : 1, A = function(H) {
        var q = x.find(function(X) {
          var W = C.get(X);
          if (W)
            return W.slice(0, H).every(function(G) {
              return G;
            });
        });
        if (q)
          return B = q, "break";
      }, U = O; U > 0; U--) {
        var Y = A(U);
        if (Y === "break")
          break;
      }
    t.placement !== B && (t.modifiersData[r]._skip = !0, t.placement = B, t.reset = !0);
  }
}
const xp = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: wp,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function oi(e, t, n) {
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
function ii(e) {
  return [Re, Ue, ze, $e].some(function(t) {
    return e[t] >= 0;
  });
}
function Ep(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = fn(t, {
    elementContext: "reference"
  }), l = fn(t, {
    altBoundary: !0
  }), c = oi(s, r), p = oi(l, o, i), u = ii(c), f = ii(p);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: p,
    isReferenceHidden: u,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": f
  });
}
const kp = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Ep
};
function Tp(e, t, n) {
  var r = qe(e), o = [$e, Re].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], l = i[1];
  return s = s || 0, l = (l || 0) * o, [$e, Ue].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Op(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = ha.reduce(function(u, f) {
    return u[f] = Tp(f, t.rects, i), u;
  }, {}), l = s[t.placement], c = l.x, p = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += p), t.modifiersData[r] = s;
}
const Np = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Op
};
function Sp(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = xa({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Cp = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Sp,
  data: {}
};
function Pp(e) {
  return e === "x" ? "y" : "x";
}
function Rp(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, p = n.rootBoundary, u = n.altBoundary, f = n.padding, d = n.tether, g = d === void 0 ? !0 : d, v = n.tetherOffset, b = v === void 0 ? 0 : v, h = fn(t, {
    boundary: c,
    rootBoundary: p,
    padding: f,
    altBoundary: u
  }), E = qe(t.placement), I = Lt(t.placement), w = !I, x = Gr(E), m = Pp(x), N = t.modifiersData.popperOffsets, C = t.rects.reference, L = t.rects.popper, B = typeof b == "function" ? b(Object.assign({}, t.rects, {
    placement: t.placement
  })) : b, F = typeof B == "number" ? {
    mainAxis: B,
    altAxis: B
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, B), S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (N) {
    if (i) {
      var $, j = x === "y" ? Re : $e, D = x === "y" ? ze : Ue, M = x === "y" ? "height" : "width", V = N[x], Q = V + h[j], Z = V - h[D], O = g ? -L[M] / 2 : 0, A = I === Dt ? C[M] : L[M], U = I === Dt ? -L[M] : -C[M], Y = t.elements.arrow, z = g && Y ? Yr(Y) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ba(), q = H[j], X = H[D], W = sn(0, C[M], z[M]), G = w ? C[M] / 2 - O - W - q - F.mainAxis : A - W - q - F.mainAxis, K = w ? -C[M] / 2 + O + W + X + F.mainAxis : U + W + X + F.mainAxis, oe = t.elements.arrow && yn(t.elements.arrow), _ = oe ? x === "y" ? oe.clientTop || 0 : oe.clientLeft || 0 : 0, J = ($ = S == null ? void 0 : S[x]) != null ? $ : 0, P = V + G - J - _, ie = V + K - J, we = sn(g ? Ln(Q, P) : Q, V, g ? vt(Z, ie) : Z);
      N[x] = we, R[x] = we - V;
    }
    if (l) {
      var Ne, ve = x === "x" ? Re : $e, pt = x === "x" ? ze : Ue, Se = N[m], Ke = m === "y" ? "height" : "width", Ie = Se + h[ve], Je = Se - h[pt], xe = [Re, $e].indexOf(E) !== -1, Tt = (Ne = S == null ? void 0 : S[m]) != null ? Ne : 0, ut = xe ? Ie : Se - C[Ke] - L[Ke] - Tt + F.altAxis, Ut = xe ? Se + C[Ke] + L[Ke] - Tt - F.altAxis : Je, kn = g && xe ? ep(ut, Se, Ut) : sn(g ? ut : Ie, Se, g ? Ut : Je);
      N[m] = kn, R[m] = kn - Se;
    }
    t.modifiersData[r] = R;
  }
}
const $p = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Rp,
  requiresIfExists: ["offset"]
};
function Mp(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Ip(e) {
  return e === je(e) || !Fe(e) ? Kr(e) : Mp(e);
}
function _p(e) {
  var t = e.getBoundingClientRect(), n = jt(t.width) / e.offsetWidth || 1, r = jt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Ap(e, t, n) {
  n === void 0 && (n = !1);
  var r = Fe(t), o = Fe(t) && _p(t), i = lt(t), s = Bt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Ye(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Zr(i)) && (l = Ip(t)), Fe(t) ? (c = Bt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = Jr(i))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Dp(e) {
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
function jp(e) {
  var t = Dp(e);
  return Yc.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Bp(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Lp(e) {
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
var ai = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function si() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Fp(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? ai : o;
  return function(l, c, p) {
    p === void 0 && (p = i);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ai, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], d = !1, g = {
      state: u,
      setOptions: function(E) {
        var I = typeof E == "function" ? E(u.options) : E;
        b(), u.options = Object.assign({}, i, u.options, I), u.scrollParents = {
          reference: Et(l) ? ln(l) : l.contextElement ? ln(l.contextElement) : [],
          popper: ln(c)
        };
        var w = jp(Lp([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = w.filter(function(x) {
          return x.enabled;
        }), v(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!d) {
          var E = u.elements, I = E.reference, w = E.popper;
          if (si(I, w)) {
            u.rects = {
              reference: Ap(I, yn(w), u.options.strategy === "fixed"),
              popper: Yr(w)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(F) {
              return u.modifiersData[F.name] = Object.assign({}, F.data);
            });
            for (var x = 0; x < u.orderedModifiers.length; x++) {
              if (u.reset === !0) {
                u.reset = !1, x = -1;
                continue;
              }
              var m = u.orderedModifiers[x], N = m.fn, C = m.options, L = C === void 0 ? {} : C, B = m.name;
              typeof N == "function" && (u = N({
                state: u,
                options: L,
                name: B,
                instance: g
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Bp(function() {
        return new Promise(function(h) {
          g.forceUpdate(), h(u);
        });
      }),
      destroy: function() {
        b(), d = !0;
      }
    };
    if (!si(l, c))
      return g;
    g.setOptions(p).then(function(h) {
      !d && p.onFirstUpdate && p.onFirstUpdate(h);
    });
    function v() {
      u.orderedModifiers.forEach(function(h) {
        var E = h.name, I = h.options, w = I === void 0 ? {} : I, x = h.effect;
        if (typeof x == "function") {
          var m = x({
            state: u,
            name: E,
            instance: g,
            options: w
          }), N = function() {
          };
          f.push(m || N);
        }
      });
    }
    function b() {
      f.forEach(function(h) {
        return h();
      }), f = [];
    }
    return g;
  };
}
var Vp = [pp, Cp, lp, Jc, Np, xp, $p, op, kp], zp = /* @__PURE__ */ Fp({
  defaultModifiers: Vp
});
const Ea = "Popper";
function Up(e) {
  return da(Ea, e);
}
wc(Ea, ["root"]);
const Hp = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Wp = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function qp(e, t) {
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
function Fn(e) {
  return typeof e == "function" ? e() : e;
}
function Yn(e) {
  return e.nodeType !== void 0;
}
function Xp(e) {
  return !Yn(e);
}
const Yp = () => rt({
  root: ["root"]
}, hc(Up)), Gp = {}, Kp = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: p,
    placement: u,
    popperOptions: f,
    popperRef: d,
    slotProps: g = {},
    slots: v = {},
    TransitionProps: b
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, h = fe(t, Hp), E = k.useRef(null), I = Ve(E, n), w = k.useRef(null), x = Ve(w, d), m = k.useRef(x);
  wt(() => {
    m.current = x;
  }, [x]), k.useImperativeHandle(d, () => w.current, []);
  const N = qp(u, s), [C, L] = k.useState(N), [B, F] = k.useState(Fn(o));
  k.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), k.useEffect(() => {
    o && F(Fn(o));
  }, [o]), wt(() => {
    if (!B || !p)
      return;
    const D = (Q) => {
      L(Q.placement);
    };
    if (process.env.NODE_ENV !== "production" && B && Yn(B) && B.nodeType === 1) {
      const Q = B.getBoundingClientRect();
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
        D(Q);
      }
    }];
    c != null && (M = M.concat(c)), f && f.modifiers != null && (M = M.concat(f.modifiers));
    const V = zp(B, E.current, T({
      placement: N
    }, f, {
      modifiers: M
    }));
    return m.current(V), () => {
      V.destroy(), m.current(null);
    };
  }, [B, l, c, p, f, N]);
  const S = {
    placement: C
  };
  b !== null && (S.TransitionProps = b);
  const R = Yp(), $ = (r = v.root) != null ? r : "div", j = xt({
    elementType: $,
    externalSlotProps: g.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: I
    },
    ownerState: t,
    className: R.root
  });
  return /* @__PURE__ */ y($, T({}, j, {
    children: typeof i == "function" ? i(S) : i
  }));
}), ka = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: p,
    open: u,
    placement: f = "bottom",
    popperOptions: d = Gp,
    popperRef: g,
    style: v,
    transition: b = !1,
    slotProps: h = {},
    slots: E = {}
  } = t, I = fe(t, Wp), [w, x] = k.useState(!0), m = () => {
    x(!1);
  }, N = () => {
    x(!0);
  };
  if (!c && !u && (!b || w))
    return null;
  let C;
  if (i)
    C = i;
  else if (r) {
    const F = Fn(r);
    C = F && Yn(F) ? Te(F).body : Te(null).body;
  }
  const L = !u && c && (!b || w) ? "none" : void 0, B = b ? {
    in: u,
    onEnter: m,
    onExited: N
  } : void 0;
  return /* @__PURE__ */ y(un, {
    disablePortal: l,
    container: C,
    children: /* @__PURE__ */ y(Kp, T({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: p,
      ref: n,
      open: b ? !w : u,
      placement: f,
      popperOptions: d,
      popperRef: g,
      slotProps: h,
      slots: E
    }, I, {
      style: T({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: L
      }, v),
      TransitionProps: B,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (ka.propTypes = {
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
  anchorEl: zt(a.oneOfType([et, a.object, a.func]), (e) => {
    if (e.open) {
      const t = Fn(e.anchorEl);
      if (t && Yn(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Xp(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: a.oneOfType([et, a.func]),
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
  popperRef: Wr,
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
const Jp = ["values", "unit", "step"], Zp = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => T({}, n, {
    [r.key]: r.val
  }), {});
};
function Qp(e) {
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
  } = e, o = fe(e, Jp), i = Zp(t), s = Object.keys(i);
  function l(d) {
    return `@media (min-width:${typeof t[d] == "number" ? t[d] : d}${n})`;
  }
  function c(d) {
    return `@media (max-width:${(typeof t[d] == "number" ? t[d] : d) - r / 100}${n})`;
  }
  function p(d, g) {
    const v = s.indexOf(g);
    return `@media (min-width:${typeof t[d] == "number" ? t[d] : d}${n}) and (max-width:${(v !== -1 && typeof t[s[v]] == "number" ? t[s[v]] : g) - r / 100}${n})`;
  }
  function u(d) {
    return s.indexOf(d) + 1 < s.length ? p(d, s[s.indexOf(d) + 1]) : l(d);
  }
  function f(d) {
    const g = s.indexOf(d);
    return g === 0 ? l(s[1]) : g === s.length - 1 ? c(s[g]) : p(d, s[s.indexOf(d) + 1]).replace("@media", "@media not all and");
  }
  return T({
    keys: s,
    values: i,
    up: l,
    down: c,
    between: p,
    only: u,
    not: f,
    unit: n
  }, o);
}
const eu = {
  borderRadius: 4
}, tu = eu, nu = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, ct = nu;
function cn(e, t) {
  return t ? Qe(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Qr = {
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
}, li = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Qr[e]}px)`
};
function nt(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || li;
    return t.reduce((s, l, c) => (s[i.up(i.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || li;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || Qr).indexOf(l) !== -1) {
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
function ru(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function ou(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function Gn(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Vn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = Gn(e, n) || r, t && (o = t(o, r, e)), o;
}
function ye(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const l = s[t], c = s.theme, p = Gn(c, r) || {};
    return nt(s, l, (f) => {
      let d = Vn(p, o, f);
      return f === d && typeof f == "string" && (d = Vn(p, o, `${t}${f === "default" ? "" : Xe(f)}`, f)), n === !1 ? d : {
        [n]: d
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: ct
  } : {}, i.filterProps = [t], i;
}
function iu(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const au = {
  m: "margin",
  p: "padding"
}, su = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, ci = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, lu = iu((e) => {
  if (e.length > 2)
    if (ci[e])
      e = ci[e];
    else
      return [e];
  const [t, n] = e.split(""), r = au[t], o = su[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Kn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Jn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], cu = [...Kn, ...Jn];
function wn(e, t, n, r) {
  var o;
  const i = (o = Gn(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Ta(e) {
  return wn(e, "spacing", 8, "spacing");
}
function xn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function pu(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = xn(t, n), r), {});
}
function uu(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = lu(n), i = pu(o, r), s = e[n];
  return nt(e, s, i);
}
function Oa(e, t) {
  const n = Ta(e.theme);
  return Object.keys(e).map((r) => uu(e, t, r, n)).reduce(cn, {});
}
function ge(e) {
  return Oa(e, Kn);
}
ge.propTypes = process.env.NODE_ENV !== "production" ? Kn.reduce((e, t) => (e[t] = ct, e), {}) : {};
ge.filterProps = Kn;
function be(e) {
  return Oa(e, Jn);
}
be.propTypes = process.env.NODE_ENV !== "production" ? Jn.reduce((e, t) => (e[t] = ct, e), {}) : {};
be.filterProps = Jn;
process.env.NODE_ENV !== "production" && cu.reduce((e, t) => (e[t] = ct, e), {});
function du(e = 8) {
  if (e.mui)
    return e;
  const t = Ta({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function Zn(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? cn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Le(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function He(e, t) {
  return ye({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const fu = He("border", Le), hu = He("borderTop", Le), mu = He("borderRight", Le), gu = He("borderBottom", Le), bu = He("borderLeft", Le), vu = He("borderColor"), yu = He("borderTopColor"), wu = He("borderRightColor"), xu = He("borderBottomColor"), Eu = He("borderLeftColor"), ku = He("outline", Le), Tu = He("outlineColor"), Qn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = wn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: xn(t, r)
    });
    return nt(e, e.borderRadius, n);
  }
  return null;
};
Qn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ct
} : {};
Qn.filterProps = ["borderRadius"];
Zn(fu, hu, mu, gu, bu, vu, yu, wu, xu, Eu, Qn, ku, Tu);
const er = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = wn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: xn(t, r)
    });
    return nt(e, e.gap, n);
  }
  return null;
};
er.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ct
} : {};
er.filterProps = ["gap"];
const tr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = wn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: xn(t, r)
    });
    return nt(e, e.columnGap, n);
  }
  return null;
};
tr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ct
} : {};
tr.filterProps = ["columnGap"];
const nr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = wn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: xn(t, r)
    });
    return nt(e, e.rowGap, n);
  }
  return null;
};
nr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ct
} : {};
nr.filterProps = ["rowGap"];
const Ou = ye({
  prop: "gridColumn"
}), Nu = ye({
  prop: "gridRow"
}), Su = ye({
  prop: "gridAutoFlow"
}), Cu = ye({
  prop: "gridAutoColumns"
}), Pu = ye({
  prop: "gridAutoRows"
}), Ru = ye({
  prop: "gridTemplateColumns"
}), $u = ye({
  prop: "gridTemplateRows"
}), Mu = ye({
  prop: "gridTemplateAreas"
}), Iu = ye({
  prop: "gridArea"
});
Zn(er, tr, nr, Ou, Nu, Su, Cu, Pu, Ru, $u, Mu, Iu);
function It(e, t) {
  return t === "grey" ? t : e;
}
const _u = ye({
  prop: "color",
  themeKey: "palette",
  transform: It
}), Au = ye({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: It
}), Du = ye({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: It
});
Zn(_u, Au, Du);
function De(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const ju = ye({
  prop: "width",
  transform: De
}), eo = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Qr[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: De(n)
      };
    };
    return nt(e, e.maxWidth, t);
  }
  return null;
};
eo.filterProps = ["maxWidth"];
const Bu = ye({
  prop: "minWidth",
  transform: De
}), Lu = ye({
  prop: "height",
  transform: De
}), Fu = ye({
  prop: "maxHeight",
  transform: De
}), Vu = ye({
  prop: "minHeight",
  transform: De
});
ye({
  prop: "size",
  cssProperty: "width",
  transform: De
});
ye({
  prop: "size",
  cssProperty: "height",
  transform: De
});
const zu = ye({
  prop: "boxSizing"
});
Zn(ju, eo, Bu, Lu, Fu, Vu, zu);
const Uu = {
  // borders
  border: {
    themeKey: "borders",
    transform: Le
  },
  borderTop: {
    themeKey: "borders",
    transform: Le
  },
  borderRight: {
    themeKey: "borders",
    transform: Le
  },
  borderBottom: {
    themeKey: "borders",
    transform: Le
  },
  borderLeft: {
    themeKey: "borders",
    transform: Le
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
    transform: Le
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Qn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: It
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: It
  },
  backgroundColor: {
    themeKey: "palette",
    transform: It
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
    style: ge
  },
  mt: {
    style: ge
  },
  mr: {
    style: ge
  },
  mb: {
    style: ge
  },
  ml: {
    style: ge
  },
  mx: {
    style: ge
  },
  my: {
    style: ge
  },
  margin: {
    style: ge
  },
  marginTop: {
    style: ge
  },
  marginRight: {
    style: ge
  },
  marginBottom: {
    style: ge
  },
  marginLeft: {
    style: ge
  },
  marginX: {
    style: ge
  },
  marginY: {
    style: ge
  },
  marginInline: {
    style: ge
  },
  marginInlineStart: {
    style: ge
  },
  marginInlineEnd: {
    style: ge
  },
  marginBlock: {
    style: ge
  },
  marginBlockStart: {
    style: ge
  },
  marginBlockEnd: {
    style: ge
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
    style: er
  },
  rowGap: {
    style: nr
  },
  columnGap: {
    style: tr
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
    transform: De
  },
  maxWidth: {
    style: eo
  },
  minWidth: {
    transform: De
  },
  height: {
    transform: De
  },
  maxHeight: {
    transform: De
  },
  minHeight: {
    transform: De
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
}, to = Uu;
function Hu(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Wu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function qu() {
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
      style: f
    } = l;
    if (r == null)
      return null;
    if (p === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const d = Gn(o, p) || {};
    return f ? f(s) : nt(s, r, (v) => {
      let b = Vn(d, u, v);
      return v === b && typeof v == "string" && (b = Vn(d, u, `${n}${v === "default" ? "" : Xe(v)}`, v)), c === !1 ? b : {
        [c]: b
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
    const s = (r = i.unstable_sxConfig) != null ? r : to;
    function l(c) {
      let p = c;
      if (typeof c == "function")
        p = c(i);
      else if (typeof c != "object")
        return c;
      if (!p)
        return null;
      const u = ru(i.breakpoints), f = Object.keys(u);
      let d = u;
      return Object.keys(p).forEach((g) => {
        const v = Wu(p[g], i);
        if (v != null)
          if (typeof v == "object")
            if (s[g])
              d = cn(d, e(g, v, i, s));
            else {
              const b = nt({
                theme: i
              }, v, (h) => ({
                [g]: h
              }));
              Hu(b, v) ? d[g] = t({
                sx: v,
                theme: i
              }) : d = cn(d, b);
            }
          else
            d = cn(d, e(g, v, i, s));
      }), ou(f, d);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Na = qu();
Na.filterProps = ["sx"];
const no = Na;
function Xu(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const Yu = ["breakpoints", "palette", "spacing", "shape"];
function ro(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = fe(e, Yu), l = Qp(n), c = du(o);
  let p = Qe({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: T({
      mode: "light"
    }, r),
    spacing: c,
    shape: T({}, tu, i)
  }, s);
  return p.applyStyles = Xu, p = t.reduce((u, f) => Qe(u, f), p), p.unstable_sxConfig = T({}, to, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(f) {
    return no({
      sx: f,
      theme: this
    });
  }, p;
}
function Gu(e) {
  return Object.keys(e).length === 0;
}
function Sa(e = null) {
  const t = k.useContext(Fs);
  return !t || Gu(t) ? e : t;
}
const Ku = ro();
function Ca(e = Ku) {
  return Sa(e);
}
const Ju = ["ownerState"], Zu = ["variants"], Qu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function ed(e) {
  return Object.keys(e).length === 0;
}
function td(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function In(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const nd = ro(), pi = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Pn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return ed(t) ? e : t[n] || t;
}
function rd(e) {
  return e ? (t, n) => n[e] : null;
}
function _n(e, t) {
  let {
    ownerState: n
  } = t, r = fe(t, Ju);
  const o = typeof e == "function" ? e(T({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => _n(i, T({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = fe(o, Zu);
    return i.forEach((c) => {
      let p = !0;
      typeof c.props == "function" ? p = c.props(T({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((u) => {
        (n == null ? void 0 : n[u]) !== c.props[u] && r[u] !== c.props[u] && (p = !1);
      }), p && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(T({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function od(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = nd,
    rootShouldForwardProp: r = In,
    slotShouldForwardProp: o = In
  } = e, i = (s) => no(T({}, s, {
    theme: Pn(T({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, l = {}) => {
    Vs(s, (m) => m.filter((N) => !(N != null && N.__mui_systemSx)));
    const {
      name: c,
      slot: p,
      skipVariantsResolver: u,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = rd(pi(p))
    } = l, g = fe(l, Qu), v = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      p && p !== "Root" && p !== "root" || !1
    ), b = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${pi(p || "Root")}`);
    let E = In;
    p === "Root" || p === "root" ? E = r : p ? E = o : td(s) && (E = void 0);
    const I = Ls(s, T({
      shouldForwardProp: E,
      label: h
    }, g)), w = (m) => typeof m == "function" && m.__emotion_real !== m || gt(m) ? (N) => _n(m, T({}, N, {
      theme: Pn({
        theme: N.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : m, x = (m, ...N) => {
      let C = w(m);
      const L = N ? N.map(w) : [];
      c && d && L.push((S) => {
        const R = Pn(T({}, S, {
          defaultTheme: n,
          themeId: t
        }));
        if (!R.components || !R.components[c] || !R.components[c].styleOverrides)
          return null;
        const $ = R.components[c].styleOverrides, j = {};
        return Object.entries($).forEach(([D, M]) => {
          j[D] = _n(M, T({}, S, {
            theme: R
          }));
        }), d(S, j);
      }), c && !v && L.push((S) => {
        var R;
        const $ = Pn(T({}, S, {
          defaultTheme: n,
          themeId: t
        })), j = $ == null || (R = $.components) == null || (R = R[c]) == null ? void 0 : R.variants;
        return _n({
          variants: j
        }, T({}, S, {
          theme: $
        }));
      }), b || L.push(i);
      const B = L.length - N.length;
      if (Array.isArray(m) && B > 0) {
        const S = new Array(B).fill("");
        C = [...m, ...S], C.raw = [...m.raw, ...S];
      }
      const F = I(C, ...L);
      if (process.env.NODE_ENV !== "production") {
        let S;
        c && (S = `${c}${Xe(p || "")}`), S === void 0 && (S = `Styled(${zl(s)})`), F.displayName = S;
      }
      return s.muiName && (F.muiName = s.muiName), F;
    };
    return I.withConfig && (x.withConfig = I.withConfig), x;
  };
}
function id(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : aa(t.components[n].defaultProps, r);
}
function ad({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = Ca(n);
  return r && (o = o[r] || o), id({
    theme: o,
    name: t,
    props: e
  });
}
function oo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), uc(e, t, n);
}
function sd(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function kt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return kt(sd(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : _t(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : _t(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function rr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function ld(e) {
  e = kt(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (p, u = (p + n / 30) % 12) => o - i * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), rr({
    type: l,
    values: c
  });
}
function ui(e) {
  e = kt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? kt(ld(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function di(e, t) {
  const n = ui(e), r = ui(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function zn(e, t) {
  return e = kt(e), t = oo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, rr(e);
}
function cd(e, t) {
  if (e = kt(e), t = oo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return rr(e);
}
function pd(e, t) {
  if (e = kt(e), t = oo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return rr(e);
}
function ud(e, t) {
  return T({
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
const dd = {
  black: "#000",
  white: "#fff"
}, hn = dd, fd = {
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
}, hd = fd, md = {
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
}, Ot = md, gd = {
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
}, Nt = gd, bd = {
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
}, Jt = bd, vd = {
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
}, St = vd, yd = {
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
}, Ct = yd, wd = {
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
}, Pt = wd, xd = ["mode", "contrastThreshold", "tonalOffset"], fi = {
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
    paper: hn.white,
    default: hn.white
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
}, br = {
  text: {
    primary: hn.white,
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
    active: hn.white,
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
function hi(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = pd(e.main, o) : t === "dark" && (e.dark = cd(e.main, i)));
}
function Ed(e = "light") {
  return e === "dark" ? {
    main: St[200],
    light: St[50],
    dark: St[400]
  } : {
    main: St[700],
    light: St[400],
    dark: St[800]
  };
}
function kd(e = "light") {
  return e === "dark" ? {
    main: Ot[200],
    light: Ot[50],
    dark: Ot[400]
  } : {
    main: Ot[500],
    light: Ot[300],
    dark: Ot[700]
  };
}
function Td(e = "light") {
  return e === "dark" ? {
    main: Nt[500],
    light: Nt[300],
    dark: Nt[700]
  } : {
    main: Nt[700],
    light: Nt[400],
    dark: Nt[800]
  };
}
function Od(e = "light") {
  return e === "dark" ? {
    main: Ct[400],
    light: Ct[300],
    dark: Ct[700]
  } : {
    main: Ct[700],
    light: Ct[500],
    dark: Ct[900]
  };
}
function Nd(e = "light") {
  return e === "dark" ? {
    main: Pt[400],
    light: Pt[300],
    dark: Pt[700]
  } : {
    main: Pt[800],
    light: Pt[500],
    dark: Pt[900]
  };
}
function Sd(e = "light") {
  return e === "dark" ? {
    main: Jt[400],
    light: Jt[300],
    dark: Jt[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Jt[500],
    dark: Jt[900]
  };
}
function Cd(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = fe(e, xd), i = e.primary || Ed(t), s = e.secondary || kd(t), l = e.error || Td(t), c = e.info || Od(t), p = e.success || Nd(t), u = e.warning || Sd(t);
  function f(b) {
    const h = di(b, br.text.primary) >= n ? br.text.primary : fi.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = di(b, h);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${h} on ${b}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const d = ({
    color: b,
    name: h,
    mainShade: E = 500,
    lightShade: I = 300,
    darkShade: w = 700
  }) => {
    if (b = T({}, b), !b.main && b[E] && (b.main = b[E]), !b.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : _t(11, h ? ` (${h})` : "", E));
    if (typeof b.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(b.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : _t(12, h ? ` (${h})` : "", JSON.stringify(b.main)));
    return hi(b, "light", I, r), hi(b, "dark", w, r), b.contrastText || (b.contrastText = f(b.main)), b;
  }, g = {
    dark: br,
    light: fi
  };
  return process.env.NODE_ENV !== "production" && (g[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Qe(T({
    // A collection of common colors.
    common: T({}, hn),
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
    grey: hd,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: d,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, g[t]), o);
}
const Pd = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Rd(e) {
  return Math.round(e * 1e5) / 1e5;
}
const mi = {
  textTransform: "uppercase"
}, gi = '"Roboto", "Helvetica", "Arial", sans-serif';
function $d(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = gi,
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
    pxToRem: f
  } = n, d = fe(n, Pd);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof p != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const g = o / 14, v = f || ((E) => `${E / p * g}rem`), b = (E, I, w, x, m) => T({
    fontFamily: r,
    fontWeight: E,
    fontSize: v(I),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, r === gi ? {
    letterSpacing: `${Rd(x / I)}em`
  } : {}, m, u), h = {
    h1: b(i, 96, 1.167, -1.5),
    h2: b(i, 60, 1.2, -0.5),
    h3: b(s, 48, 1.167, 0),
    h4: b(s, 34, 1.235, 0.25),
    h5: b(s, 24, 1.334, 0),
    h6: b(l, 20, 1.6, 0.15),
    subtitle1: b(s, 16, 1.75, 0.15),
    subtitle2: b(l, 14, 1.57, 0.1),
    body1: b(s, 16, 1.5, 0.15),
    body2: b(s, 14, 1.43, 0.15),
    button: b(l, 14, 1.75, 0.4, mi),
    caption: b(s, 12, 1.66, 0.4),
    overline: b(s, 12, 2.66, 1, mi),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Qe(T({
    htmlFontSize: p,
    pxToRem: v,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, h), d, {
    clone: !1
    // No need to clone deep
  });
}
const Md = 0.2, Id = 0.14, _d = 0.12;
function me(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Md})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Id})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${_d})`].join(",");
}
const Ad = ["none", me(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), me(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), me(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), me(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), me(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), me(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), me(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), me(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), me(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), me(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), me(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), me(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), me(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), me(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), me(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), me(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), me(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), me(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), me(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), me(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), me(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), me(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), me(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), me(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Dd = Ad, jd = ["duration", "easing", "delay"], Bd = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Ld = {
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
function bi(e) {
  return `${Math.round(e)}ms`;
}
function Fd(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Vd(e) {
  const t = T({}, Bd, e.easing), n = T({}, Ld, e.duration);
  return T({
    getAutoHeightDuration: Fd,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, p = fe(i, jd);
      if (process.env.NODE_ENV !== "production") {
        const u = (d) => typeof d == "string", f = (d) => !isNaN(parseFloat(d));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(p).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : bi(s)} ${l} ${typeof c == "string" ? c : bi(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const zd = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Ud = zd, Hd = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Wd(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = fe(e, Hd);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : _t(18));
  const l = Cd(r), c = ro(e);
  let p = Qe(c, {
    mixins: ud(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Dd.slice(),
    typography: $d(l, i),
    transitions: Vd(o),
    zIndex: T({}, Ud)
  });
  if (p = Qe(p, s), p = t.reduce((u, f) => Qe(u, f), p), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (d, g) => {
      let v;
      for (v in d) {
        const b = d[v];
        if (u.indexOf(v) !== -1 && Object.keys(b).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = Ge("", v);
            console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(d, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: b
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          d[v] = {};
        }
      }
    };
    Object.keys(p.components).forEach((d) => {
      const g = p.components[d].styleOverrides;
      g && d.indexOf("Mui") === 0 && f(g, d);
    });
  }
  return p.unstable_sxConfig = T({}, to, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(f) {
    return no({
      sx: f,
      theme: this
    });
  }, p;
}
const qd = Wd(), io = qd, ao = "$$material", Pa = (e) => In(e) && e !== "classes", Xd = od({
  themeId: ao,
  defaultTheme: io,
  rootShouldForwardProp: Pa
}), Oe = Xd;
function En() {
  const e = Ca(io);
  return process.env.NODE_ENV !== "production" && k.useDebugValue(e), e[ao] || e;
}
function ot({
  props: e,
  name: t
}) {
  return ad({
    props: e,
    name: t,
    defaultTheme: io,
    themeId: ao
  });
}
function Ir(e, t) {
  return Ir = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Ir(e, t);
}
function Yd(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ir(e, t);
}
const vi = {
  disabled: !1
};
var Gd = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
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
const Ra = re.createContext(null);
var Kd = function(t) {
  return t.scrollTop;
}, rn = "unmounted", ht = "exited", mt = "entering", Mt = "entered", _r = "exiting", it = /* @__PURE__ */ function(e) {
  Yd(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = ht, i.appearStatus = mt) : c = Mt : r.unmountOnExit || r.mountOnEnter ? c = rn : c = ht, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === rn ? {
      status: ht
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== mt && s !== Mt && (i = mt) : (s === mt || s === Mt) && (i = _r);
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
      if (this.cancelNextCallback(), i === mt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Nn.findDOMNode(this);
          s && Kd(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ht && this.setState({
        status: rn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Nn.findDOMNode(this), l], p = c[0], u = c[1], f = this.getTimeouts(), d = l ? f.appear : f.enter;
    if (!o && !s || vi.disabled) {
      this.safeSetState({
        status: Mt
      }, function() {
        i.props.onEntered(p);
      });
      return;
    }
    this.props.onEnter(p, u), this.safeSetState({
      status: mt
    }, function() {
      i.props.onEntering(p, u), i.onTransitionEnd(d, function() {
        i.safeSetState({
          status: Mt
        }, function() {
          i.props.onEntered(p, u);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Nn.findDOMNode(this);
    if (!i || vi.disabled) {
      this.safeSetState({
        status: ht
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: _r
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: ht
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Nn.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === rn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = fe(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ re.createElement(Ra.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : re.cloneElement(re.Children.only(s), l))
    );
  }, t;
}(re.Component);
it.contextType = Ra;
it.propTypes = process.env.NODE_ENV !== "production" ? {
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
    var n = Gd;
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
function Rt() {
}
it.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Rt,
  onEntering: Rt,
  onEntered: Rt,
  onExit: Rt,
  onExiting: Rt,
  onExited: Rt
};
it.UNMOUNTED = rn;
it.EXITED = ht;
it.ENTERING = mt;
it.ENTERED = Mt;
it.EXITING = _r;
const $a = it, Ma = (e) => e.scrollTop;
function Un(e, t) {
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
const Jd = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Ar(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Zd = {
  entering: {
    opacity: 1,
    transform: Ar(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, vr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), so = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: p,
    onEntering: u,
    onExit: f,
    onExited: d,
    onExiting: g,
    style: v,
    timeout: b = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = $a
  } = t, E = fe(t, Jd), I = tn(), w = k.useRef(), x = En(), m = k.useRef(null), N = Ve(m, i.ref, n), C = (D) => (M) => {
    if (D) {
      const V = m.current;
      M === void 0 ? D(V) : D(V, M);
    }
  }, L = C(u), B = C((D, M) => {
    Ma(D);
    const {
      duration: V,
      delay: Q,
      easing: Z
    } = Un({
      style: v,
      timeout: b,
      easing: s
    }, {
      mode: "enter"
    });
    let O;
    b === "auto" ? (O = x.transitions.getAutoHeightDuration(D.clientHeight), w.current = O) : O = V, D.style.transition = [x.transitions.create("opacity", {
      duration: O,
      delay: Q
    }), x.transitions.create("transform", {
      duration: vr ? O : O * 0.666,
      delay: Q,
      easing: Z
    })].join(","), c && c(D, M);
  }), F = C(p), S = C(g), R = C((D) => {
    const {
      duration: M,
      delay: V,
      easing: Q
    } = Un({
      style: v,
      timeout: b,
      easing: s
    }, {
      mode: "exit"
    });
    let Z;
    b === "auto" ? (Z = x.transitions.getAutoHeightDuration(D.clientHeight), w.current = Z) : Z = M, D.style.transition = [x.transitions.create("opacity", {
      duration: Z,
      delay: V
    }), x.transitions.create("transform", {
      duration: vr ? Z : Z * 0.666,
      delay: vr ? V : V || Z * 0.333,
      easing: Q
    })].join(","), D.style.opacity = 0, D.style.transform = Ar(0.75), f && f(D);
  }), $ = C(d);
  return /* @__PURE__ */ y(h, T({
    appear: o,
    in: l,
    nodeRef: m,
    onEnter: B,
    onEntered: F,
    onEntering: L,
    onExit: R,
    onExited: $,
    onExiting: S,
    addEndListener: (D) => {
      b === "auto" && I.start(w.current || 0, D), r && r(m.current, D);
    },
    timeout: b === "auto" ? null : b
  }, E, {
    children: (D, M) => /* @__PURE__ */ k.cloneElement(i, T({
      style: T({
        opacity: 0,
        transform: Ar(0.75),
        visibility: D === "exited" && !l ? "hidden" : void 0
      }, Zd[D], v, i.props.style),
      ref: N
    }, M))
  }));
});
process.env.NODE_ENV !== "production" && (so.propTypes = {
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
  children: gn.isRequired,
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
so.muiSupportAuto = !0;
const Dr = so, Qd = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, yi = Qd, ef = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], tf = Oe(ka, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ia = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r;
  const o = Sa(), i = ot({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: p,
    container: u,
    disablePortal: f,
    keepMounted: d,
    modifiers: g,
    open: v,
    placement: b,
    popperOptions: h,
    popperRef: E,
    transition: I,
    slots: w,
    slotProps: x
  } = i, m = fe(i, ef), N = (r = w == null ? void 0 : w.root) != null ? r : c == null ? void 0 : c.Root, C = T({
    anchorEl: s,
    container: u,
    disablePortal: f,
    keepMounted: d,
    modifiers: g,
    open: v,
    placement: b,
    popperOptions: h,
    popperRef: E,
    transition: I
  }, m);
  return /* @__PURE__ */ y(tf, T({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: N
    },
    slotProps: x ?? p
  }, C, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Ia.propTypes = {
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
  anchorEl: a.oneOfType([et, a.object, a.func]),
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
  container: a.oneOfType([et, a.func]),
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
  popperRef: Wr,
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
const _a = Ia;
function nf(e) {
  return Ge("MuiTooltip", e);
}
const rf = st("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), at = rf, of = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function af(e) {
  return Math.round(e * 1e5) / 1e5;
}
const sf = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Xe(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return rt(s, nf, t);
}, lf = Oe(_a, {
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
}) => T({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${at.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${at.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${at.arrow}`]: T({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${at.arrow}`]: T({}, t.isRtl ? {
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
})), cf = Oe("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Xe(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => T({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : zn(e.palette.grey[700], 0.92),
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
  lineHeight: `${af(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${at.popper}[data-popper-placement*="left"] &`]: T({
    transformOrigin: "right center"
  }, t.isRtl ? T({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : T({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${at.popper}[data-popper-placement*="right"] &`]: T({
    transformOrigin: "left center"
  }, t.isRtl ? T({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : T({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${at.popper}[data-popper-placement*="top"] &`]: T({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${at.popper}[data-popper-placement*="bottom"] &`]: T({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), pf = Oe("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : zn(e.palette.grey[700], 0.9),
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
let Rn = !1;
const wi = new bn();
let Zt = {
  x: 0,
  y: 0
};
function $n(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Aa = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i, s, l, c, p, u, f, d, g, v, b, h, E, I, w, x, m;
  const N = ot({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: C = !1,
    children: L,
    components: B = {},
    componentsProps: F = {},
    describeChild: S = !1,
    disableFocusListener: R = !1,
    disableHoverListener: $ = !1,
    disableInteractive: j = !1,
    disableTouchListener: D = !1,
    enterDelay: M = 100,
    enterNextDelay: V = 0,
    enterTouchDelay: Q = 700,
    followCursor: Z = !1,
    id: O,
    leaveDelay: A = 0,
    leaveTouchDelay: U = 1500,
    onClose: Y,
    onOpen: z,
    open: H,
    placement: q = "bottom",
    PopperComponent: X,
    PopperProps: W = {},
    slotProps: G = {},
    slots: K = {},
    title: oe,
    TransitionComponent: _ = Dr,
    TransitionProps: J
  } = N, P = fe(N, of), ie = /* @__PURE__ */ k.isValidElement(L) ? L : /* @__PURE__ */ y("span", {
    children: L
  }), we = En(), Ne = we.direction === "rtl", [ve, pt] = k.useState(), [Se, Ke] = k.useState(null), Ie = k.useRef(!1), Je = j || Z, xe = tn(), Tt = tn(), ut = tn(), Ut = tn(), [kn, uo] = ea({
    controlled: H,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Ze = kn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ee
    } = k.useRef(H !== void 0);
    k.useEffect(() => {
      ve && ve.disabled && !ee && oe !== "" && ve.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [oe, ve, ee]);
  }
  const or = Qi(O), Ht = k.useRef(), Tn = pn(() => {
    Ht.current !== void 0 && (document.body.style.WebkitUserSelect = Ht.current, Ht.current = void 0), Ut.clear();
  });
  k.useEffect(() => Tn, [Tn]);
  const fo = (ee) => {
    wi.clear(), Rn = !0, uo(!0), z && !Ze && z(ee);
  }, On = pn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ee) => {
      wi.start(800 + A, () => {
        Rn = !1;
      }), uo(!1), Y && Ze && Y(ee), xe.start(we.transitions.duration.shortest, () => {
        Ie.current = !1;
      });
    }
  ), ir = (ee) => {
    Ie.current && ee.type !== "touchstart" || (ve && ve.removeAttribute("title"), Tt.clear(), ut.clear(), M || Rn && V ? Tt.start(Rn ? V : M, () => {
      fo(ee);
    }) : fo(ee));
  }, ho = (ee) => {
    Tt.clear(), ut.start(A, () => {
      On(ee);
    });
  }, {
    isFocusVisibleRef: mo,
    onBlur: Qa,
    onFocus: es,
    ref: ts
  } = ta(), [, go] = k.useState(!1), bo = (ee) => {
    Qa(ee), mo.current === !1 && (go(!1), ho(ee));
  }, vo = (ee) => {
    ve || pt(ee.currentTarget), es(ee), mo.current === !0 && (go(!0), ir(ee));
  }, yo = (ee) => {
    Ie.current = !0;
    const _e = ie.props;
    _e.onTouchStart && _e.onTouchStart(ee);
  }, wo = ir, xo = ho, ns = (ee) => {
    yo(ee), ut.clear(), xe.clear(), Tn(), Ht.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Ut.start(Q, () => {
      document.body.style.WebkitUserSelect = Ht.current, ir(ee);
    });
  }, rs = (ee) => {
    ie.props.onTouchEnd && ie.props.onTouchEnd(ee), Tn(), ut.start(U, () => {
      On(ee);
    });
  };
  k.useEffect(() => {
    if (!Ze)
      return;
    function ee(_e) {
      (_e.key === "Escape" || _e.key === "Esc") && On(_e);
    }
    return document.addEventListener("keydown", ee), () => {
      document.removeEventListener("keydown", ee);
    };
  }, [On, Ze]);
  const os = Ve(ie.ref, ts, pt, n);
  !oe && oe !== 0 && (Ze = !1);
  const ar = k.useRef(), is = (ee) => {
    const _e = ie.props;
    _e.onMouseMove && _e.onMouseMove(ee), Zt = {
      x: ee.clientX,
      y: ee.clientY
    }, ar.current && ar.current.update();
  }, Wt = {}, sr = typeof oe == "string";
  S ? (Wt.title = !Ze && sr && !$ ? oe : null, Wt["aria-describedby"] = Ze ? or : null) : (Wt["aria-label"] = sr ? oe : null, Wt["aria-labelledby"] = Ze && !sr ? or : null);
  const Be = T({}, Wt, P, ie.props, {
    className: ke(P.className, ie.props.className),
    onTouchStart: yo,
    ref: os
  }, Z ? {
    onMouseMove: is
  } : {});
  process.env.NODE_ENV !== "production" && (Be["data-mui-internal-clone-element"] = !0, k.useEffect(() => {
    ve && !ve.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [ve]));
  const qt = {};
  D || (Be.onTouchStart = ns, Be.onTouchEnd = rs), $ || (Be.onMouseOver = $n(wo, Be.onMouseOver), Be.onMouseLeave = $n(xo, Be.onMouseLeave), Je || (qt.onMouseOver = wo, qt.onMouseLeave = xo)), R || (Be.onFocus = $n(vo, Be.onFocus), Be.onBlur = $n(bo, Be.onBlur), Je || (qt.onFocus = vo, qt.onBlur = bo)), process.env.NODE_ENV !== "production" && ie.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));
  const as = k.useMemo(() => {
    var ee;
    let _e = [{
      name: "arrow",
      enabled: !!Se,
      options: {
        element: Se,
        padding: 4
      }
    }];
    return (ee = W.popperOptions) != null && ee.modifiers && (_e = _e.concat(W.popperOptions.modifiers)), T({}, W.popperOptions, {
      modifiers: _e
    });
  }, [Se, W]), Xt = T({}, N, {
    isRtl: Ne,
    arrow: C,
    disableInteractive: Je,
    placement: q,
    PopperComponentProp: X,
    touch: Ie.current
  }), lr = sf(Xt), Eo = (r = (o = K.popper) != null ? o : B.Popper) != null ? r : lf, ko = (i = (s = (l = K.transition) != null ? l : B.Transition) != null ? s : _) != null ? i : Dr, To = (c = (p = K.tooltip) != null ? p : B.Tooltip) != null ? c : cf, Oo = (u = (f = K.arrow) != null ? f : B.Arrow) != null ? u : pf, ss = nn(Eo, T({}, W, (d = G.popper) != null ? d : F.popper, {
    className: ke(lr.popper, W == null ? void 0 : W.className, (g = (v = G.popper) != null ? v : F.popper) == null ? void 0 : g.className)
  }), Xt), ls = nn(ko, T({}, J, (b = G.transition) != null ? b : F.transition), Xt), cs = nn(To, T({}, (h = G.tooltip) != null ? h : F.tooltip, {
    className: ke(lr.tooltip, (E = (I = G.tooltip) != null ? I : F.tooltip) == null ? void 0 : E.className)
  }), Xt), ps = nn(Oo, T({}, (w = G.arrow) != null ? w : F.arrow, {
    className: ke(lr.arrow, (x = (m = G.arrow) != null ? m : F.arrow) == null ? void 0 : x.className)
  }), Xt);
  return /* @__PURE__ */ de(k.Fragment, {
    children: [/* @__PURE__ */ k.cloneElement(ie, Be), /* @__PURE__ */ y(Eo, T({
      as: X ?? _a,
      placement: q,
      anchorEl: Z ? {
        getBoundingClientRect: () => ({
          top: Zt.y,
          left: Zt.x,
          right: Zt.x,
          bottom: Zt.y,
          width: 0,
          height: 0
        })
      } : ve,
      popperRef: ar,
      open: ve ? Ze : !1,
      id: or,
      transition: !0
    }, qt, ss, {
      popperOptions: as,
      children: ({
        TransitionProps: ee
      }) => /* @__PURE__ */ y(ko, T({
        timeout: we.transitions.duration.shorter
      }, ee, ls, {
        children: /* @__PURE__ */ de(To, T({}, cs, {
          children: [oe, C ? /* @__PURE__ */ y(Oo, T({}, ps, {
            ref: Ke
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Aa.propTypes = {
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
  children: gn.isRequired,
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
const uf = Aa;
var lo = {}, Da = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Da);
var df = Da.exports, yr = {};
function ff(e) {
  return Ge("MuiSvgIcon", e);
}
st("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const hf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], mf = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Xe(t)}`, `fontSize${Xe(n)}`]
  };
  return rt(o, ff, r);
}, gf = Oe("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Xe(n.color)}`], t[`fontSize${Xe(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, s, l, c, p, u, f, d, g, v;
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
    color: (f = (d = (e.vars || e).palette) == null || (d = d[t.color]) == null ? void 0 : d.main) != null ? f : {
      action: (g = (e.vars || e).palette) == null || (g = g.action) == null ? void 0 : g.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[t.color]
  };
}), co = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = ot({
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
    titleAccess: f,
    viewBox: d = "0 0 24 24"
  } = r, g = fe(r, hf), v = /* @__PURE__ */ k.isValidElement(o) && o.type === "svg", b = T({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: u,
    viewBox: d,
    hasSvgAsChild: v
  }), h = {};
  u || (h.viewBox = d);
  const E = mf(b);
  return /* @__PURE__ */ de(gf, T({
    as: l,
    className: ke(E.root, i),
    focusable: "false",
    color: p,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, h, g, v && o.props, {
    ownerState: b,
    children: [v ? o.props.children : o, f ? /* @__PURE__ */ y("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (co.propTypes = {
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
co.muiName = "SvgIcon";
const xi = co;
function ja(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ y(xi, T({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = xi.muiName, /* @__PURE__ */ k.memo(/* @__PURE__ */ k.forwardRef(n));
}
const bf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), sa.configure(e);
  }
}, vf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Xe,
  createChainedFunction: Cr,
  createSvgIcon: ja,
  debounce: Zi,
  deprecatedPropType: Hl,
  isMuiElement: Wl,
  ownerDocument: Te,
  ownerWindow: At,
  requirePropFactory: ql,
  setRef: jn,
  unstable_ClassNameGenerator: bf,
  unstable_useEnhancedEffect: wt,
  unstable_useId: Qi,
  unsupportedProp: Gl,
  useControlled: ea,
  useEventCallback: pn,
  useForkRef: Ve,
  useIsFocusVisible: ta
}, Symbol.toStringTag, { value: "Module" })), yf = /* @__PURE__ */ kl(vf);
var Ei;
function wf() {
  return Ei || (Ei = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = yf;
  }(yr)), yr;
}
var xf = df;
Object.defineProperty(lo, "__esModule", {
  value: !0
});
var Ba = lo.default = void 0, Ef = xf(wf()), kf = us;
Ba = lo.default = (0, Ef.default)(/* @__PURE__ */ (0, kf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function ki(e, t, n) {
  return e ? /* @__PURE__ */ y($i, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ y("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function La(e) {
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
    isSubMenuParent: f = !1,
    hasDisabledGutters: d = !1,
    hasDivider: g = !1,
    focusVisibleClassName: v,
    id: b,
    children: h
  } = e, E = /* @__PURE__ */ y(
    Ps,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: p,
      dense: u,
      disableGutters: d,
      divider: g,
      focusVisibleClassName: v,
      onClick: t,
      id: b,
      children: n ? /* @__PURE__ */ de(Wn, { children: [
        ki(i, n, !0),
        /* @__PURE__ */ y(Rs, { primary: n, inset: !i && o }),
        f ? /* @__PURE__ */ y($i, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ y(Ba, {}) }) : ki(s, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ y(uf, { title: r, placement: "right", children: /* @__PURE__ */ y("div", { children: E }) }) : E;
}
function Fa(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Tf(e) {
  const [t, n] = Ee(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (p) => {
    n(p.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let p = Fa(i).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return p = p.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === r.id
    ), /* @__PURE__ */ y(po, { ...e, includedGroups: p });
  };
  return /* @__PURE__ */ de(Wn, { children: [
    /* @__PURE__ */ y(La, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ y(
      $s,
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
const Of = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function po(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = mn(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Fa(t).filter((v) => !("menuItem" in v.group))
    ), f = Object.values(u).sort(
      (v, b) => (v.group.order || 0) - (b.group.order || 0)
    ), d = [];
    f.forEach((v) => {
      Of(v.id, t.items).forEach(
        (b) => d.push({ item: b, isLastItemInGroup: !1 })
      ), d.length > 0 && (d[d.length - 1].isLastItemInGroup = !0);
    }), d.length > 0 && (d[d.length - 1].isLastItemInGroup = !1);
    const g = d.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: d, allowForLeadingIcons: g };
  }, [o, t]), l = ({ item: u, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: u.label,
    tooltip: u.tooltip,
    iconPathBefore: "iconPathBefore" in u ? u.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in u ? u.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ y("div", {});
  const p = c.item.group;
  return /* @__PURE__ */ y("div", { role: "menu", "aria-label": p, children: i.map((u, f) => {
    const { item: d } = u, g = l(u);
    if ("command" in d) {
      const v = d.group + f;
      return /* @__PURE__ */ y(
        La,
        {
          onClick: (b) => {
            n == null || n(b), r(d);
          },
          ...g
        },
        v
      );
    }
    return /* @__PURE__ */ y(
      Tf,
      {
        parentMenuItem: d,
        parentItemProps: g,
        ...e
      },
      p + d.id
    );
  }) }, p);
}
function Nf(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ y(po, { ...e, includedGroups: i });
}
function Sf({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ de(
    Mi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ y("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ y(Ms, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ y(
          Nf,
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
function Cf({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = mn(() => {
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
  return /* @__PURE__ */ y(
    Mi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, l) => /* @__PURE__ */ y(
        Sf,
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
const Va = /* @__PURE__ */ k.createContext({});
process.env.NODE_ENV !== "production" && (Va.displayName = "ListContext");
const Pf = Va;
function Rf(e) {
  return Ge("MuiList", e);
}
st("MuiList", ["root", "padding", "dense", "subheader"]);
const $f = ["children", "className", "component", "dense", "disablePadding", "subheader"], Mf = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return rt({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Rf, t);
}, If = Oe("ul", {
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
}) => T({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), za = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = ot({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: p
  } = r, u = fe(r, $f), f = k.useMemo(() => ({
    dense: l
  }), [l]), d = T({}, r, {
    component: s,
    dense: l,
    disablePadding: c
  }), g = Mf(d);
  return /* @__PURE__ */ y(Pf.Provider, {
    value: f,
    children: /* @__PURE__ */ de(If, T({
      as: s,
      className: ke(g.root, i),
      ref: n,
      ownerState: d
    }, u, {
      children: [p, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (za.propTypes = {
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
const _f = za, Af = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function wr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function Ti(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Ua(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function Qt(e, t, n, r, o, i) {
  let s = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !Ua(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Ha = /* @__PURE__ */ k.forwardRef(function(t, n) {
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
    variant: f = "selectedMenu"
  } = t, d = fe(t, Af), g = k.useRef(null), v = k.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  wt(() => {
    o && g.current.focus();
  }, [o]), k.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (w, x) => {
      const m = !g.current.style.width;
      if (w.clientHeight < g.current.clientHeight && m) {
        const N = `${na(Te(w))}px`;
        g.current.style[x.direction === "rtl" ? "paddingLeft" : "paddingRight"] = N, g.current.style.width = `calc(100% + ${N})`;
      }
      return g.current;
    }
  }), []);
  const b = (w) => {
    const x = g.current, m = w.key, N = Te(x).activeElement;
    if (m === "ArrowDown")
      w.preventDefault(), Qt(x, N, p, c, wr);
    else if (m === "ArrowUp")
      w.preventDefault(), Qt(x, N, p, c, Ti);
    else if (m === "Home")
      w.preventDefault(), Qt(x, null, p, c, wr);
    else if (m === "End")
      w.preventDefault(), Qt(x, null, p, c, Ti);
    else if (m.length === 1) {
      const C = v.current, L = m.toLowerCase(), B = performance.now();
      C.keys.length > 0 && (B - C.lastTime > 500 ? (C.keys = [], C.repeating = !0, C.previousKeyMatched = !0) : C.repeating && L !== C.keys[0] && (C.repeating = !1)), C.lastTime = B, C.keys.push(L);
      const F = N && !C.repeating && Ua(N, C);
      C.previousKeyMatched && (F || Qt(x, N, !1, c, wr, C)) ? w.preventDefault() : C.previousKeyMatched = !1;
    }
    u && u(w);
  }, h = Ve(g, n);
  let E = -1;
  k.Children.forEach(s, (w, x) => {
    if (!/* @__PURE__ */ k.isValidElement(w)) {
      E === x && (E += 1, E >= s.length && (E = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Dn.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (f === "selectedMenu" && w.props.selected || E === -1) && (E = x), E === x && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (E += 1, E >= s.length && (E = -1));
  });
  const I = k.Children.map(s, (w, x) => {
    if (x === E) {
      const m = {};
      return i && (m.autoFocus = !0), w.props.tabIndex === void 0 && f === "selectedMenu" && (m.tabIndex = 0), /* @__PURE__ */ k.cloneElement(w, m);
    }
    return w;
  });
  return /* @__PURE__ */ y(_f, T({
    role: "menu",
    ref: h,
    className: l,
    onKeyDown: b,
    tabIndex: o ? 0 : -1
  }, d, {
    children: I
  }));
});
process.env.NODE_ENV !== "production" && (Ha.propTypes = {
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
const Df = Ha, jf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Bf = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Wa = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = En(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: l,
    easing: c,
    in: p,
    onEnter: u,
    onEntered: f,
    onEntering: d,
    onExit: g,
    onExited: v,
    onExiting: b,
    style: h,
    timeout: E = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: I = $a
  } = t, w = fe(t, jf), x = k.useRef(null), m = Ve(x, l.ref, n), N = (j) => (D) => {
    if (j) {
      const M = x.current;
      D === void 0 ? j(M) : j(M, D);
    }
  }, C = N(d), L = N((j, D) => {
    Ma(j);
    const M = Un({
      style: h,
      timeout: E,
      easing: c
    }, {
      mode: "enter"
    });
    j.style.webkitTransition = r.transitions.create("opacity", M), j.style.transition = r.transitions.create("opacity", M), u && u(j, D);
  }), B = N(f), F = N(b), S = N((j) => {
    const D = Un({
      style: h,
      timeout: E,
      easing: c
    }, {
      mode: "exit"
    });
    j.style.webkitTransition = r.transitions.create("opacity", D), j.style.transition = r.transitions.create("opacity", D), g && g(j);
  }), R = N(v);
  return /* @__PURE__ */ y(I, T({
    appear: s,
    in: p,
    nodeRef: x,
    onEnter: L,
    onEntered: B,
    onEntering: C,
    onExit: S,
    onExited: R,
    onExiting: F,
    addEndListener: (j) => {
      i && i(x.current, j);
    },
    timeout: E
  }, w, {
    children: (j, D) => /* @__PURE__ */ k.cloneElement(l, T({
      style: T({
        opacity: 0,
        visibility: j === "exited" && !p ? "hidden" : void 0
      }, Bf[j], h, l.props.style),
      ref: m
    }, D))
  }));
});
process.env.NODE_ENV !== "production" && (Wa.propTypes = {
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
  children: gn.isRequired,
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
const Lf = Wa;
function Ff(e) {
  return Ge("MuiBackdrop", e);
}
st("MuiBackdrop", ["root", "invisible"]);
const Vf = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], zf = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return rt({
    root: ["root", n && "invisible"]
  }, Ff, t);
}, Uf = Oe("div", {
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
}) => T({
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
})), qa = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i;
  const s = ot({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: p = "div",
    components: u = {},
    componentsProps: f = {},
    invisible: d = !1,
    open: g,
    slotProps: v = {},
    slots: b = {},
    TransitionComponent: h = Lf,
    transitionDuration: E
  } = s, I = fe(s, Vf), w = T({}, s, {
    component: p,
    invisible: d
  }), x = zf(w), m = (r = v.root) != null ? r : f.root;
  return /* @__PURE__ */ y(h, T({
    in: g,
    timeout: E
  }, I, {
    children: /* @__PURE__ */ y(Uf, T({
      "aria-hidden": !0
    }, m, {
      as: (o = (i = b.root) != null ? i : u.Root) != null ? o : p,
      className: ke(x.root, c, m == null ? void 0 : m.className),
      ownerState: T({}, w, m == null ? void 0 : m.ownerState),
      classes: x,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (qa.propTypes = {
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
const Hf = qa;
function Wf(e) {
  return Ge("MuiModal", e);
}
st("MuiModal", ["root", "hidden", "backdrop"]);
const qf = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Xf = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return rt({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, Wf, r);
}, Yf = Oe("div", {
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
}) => T({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), Gf = Oe(Hf, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Xa = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i, s, l, c;
  const p = ot({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: u = Gf,
    BackdropProps: f,
    className: d,
    closeAfterTransition: g = !1,
    children: v,
    container: b,
    component: h,
    components: E = {},
    componentsProps: I = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: x = !1,
    disableEscapeKeyDown: m = !1,
    disablePortal: N = !1,
    disableRestoreFocus: C = !1,
    disableScrollLock: L = !1,
    hideBackdrop: B = !1,
    keepMounted: F = !1,
    onBackdropClick: S,
    open: R,
    slotProps: $,
    slots: j
    // eslint-disable-next-line react/prop-types
  } = p, D = fe(p, qf), M = T({}, p, {
    closeAfterTransition: g,
    disableAutoFocus: w,
    disableEnforceFocus: x,
    disableEscapeKeyDown: m,
    disablePortal: N,
    disableRestoreFocus: C,
    disableScrollLock: L,
    hideBackdrop: B,
    keepMounted: F
  }), {
    getRootProps: V,
    getBackdropProps: Q,
    getTransitionProps: Z,
    portalRef: O,
    isTopModal: A,
    exited: U,
    hasTransition: Y
  } = Dc(T({}, M, {
    rootRef: n
  })), z = T({}, M, {
    exited: U
  }), H = Xf(z), q = {};
  if (v.props.tabIndex === void 0 && (q.tabIndex = "-1"), Y) {
    const {
      onEnter: J,
      onExited: P
    } = Z();
    q.onEnter = J, q.onExited = P;
  }
  const X = (r = (o = j == null ? void 0 : j.root) != null ? o : E.Root) != null ? r : Yf, W = (i = (s = j == null ? void 0 : j.backdrop) != null ? s : E.Backdrop) != null ? i : u, G = (l = $ == null ? void 0 : $.root) != null ? l : I.root, K = (c = $ == null ? void 0 : $.backdrop) != null ? c : I.backdrop, oe = xt({
    elementType: X,
    externalSlotProps: G,
    externalForwardedProps: D,
    getSlotProps: V,
    additionalProps: {
      ref: n,
      as: h
    },
    ownerState: z,
    className: ke(d, G == null ? void 0 : G.className, H == null ? void 0 : H.root, !z.open && z.exited && (H == null ? void 0 : H.hidden))
  }), _ = xt({
    elementType: W,
    externalSlotProps: K,
    additionalProps: f,
    getSlotProps: (J) => Q(T({}, J, {
      onClick: (P) => {
        S && S(P), J != null && J.onClick && J.onClick(P);
      }
    })),
    className: ke(K == null ? void 0 : K.className, f == null ? void 0 : f.className, H == null ? void 0 : H.backdrop),
    ownerState: z
  });
  return !F && !R && (!Y || U) ? null : /* @__PURE__ */ y(un, {
    ref: O,
    container: b,
    disablePortal: N,
    children: /* @__PURE__ */ de(X, T({}, oe, {
      children: [!B && u ? /* @__PURE__ */ y(W, T({}, _)) : null, /* @__PURE__ */ y(Bn, {
        disableEnforceFocus: x,
        disableAutoFocus: w,
        disableRestoreFocus: C,
        isEnabled: A,
        open: R,
        children: /* @__PURE__ */ k.cloneElement(v, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Xa.propTypes = {
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
  children: gn.isRequired,
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
  container: a.oneOfType([et, a.func]),
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
const Kf = Xa;
function Jf(e) {
  return Ge("MuiPaper", e);
}
st("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Zf = ["className", "component", "elevation", "square", "variant"], Qf = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return rt(i, Jf, o);
}, eh = Oe("div", {
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
  return T({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && T({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${zn("#fff", yi(t.elevation))}, ${zn("#fff", yi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Ya = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = ot({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, p = fe(r, Zf), u = T({}, r, {
    component: i,
    elevation: s,
    square: l,
    variant: c
  }), f = Qf(u);
  return process.env.NODE_ENV !== "production" && En().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ y(eh, T({
    as: i,
    ownerState: u,
    className: ke(f.root, o),
    ref: n
  }, p));
});
process.env.NODE_ENV !== "production" && (Ya.propTypes = {
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
  elevation: zt(ia, (e) => {
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
const th = Ya;
function nh(e) {
  return Ge("MuiPopover", e);
}
st("MuiPopover", ["root", "paper"]);
const rh = ["onEntering"], oh = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], ih = ["slotProps"];
function Oi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Ni(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function Si(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function An(e) {
  return typeof e == "function" ? e() : e;
}
const ah = (e) => {
  const {
    classes: t
  } = e;
  return rt({
    root: ["root"],
    paper: ["paper"]
  }, nh, t);
}, sh = Oe(Kf, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ga = Oe(th, {
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
}), Ka = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i;
  const s = ot({
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
    anchorReference: f = "anchorEl",
    children: d,
    className: g,
    container: v,
    elevation: b = 8,
    marginThreshold: h = 16,
    open: E,
    PaperProps: I = {},
    slots: w,
    slotProps: x,
    transformOrigin: m = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: N = Dr,
    transitionDuration: C = "auto",
    TransitionProps: {
      onEntering: L
    } = {},
    disableScrollLock: B = !1
  } = s, F = fe(s.TransitionProps, rh), S = fe(s, oh), R = (r = x == null ? void 0 : x.paper) != null ? r : I, $ = k.useRef(), j = Ve($, R.ref), D = T({}, s, {
    anchorOrigin: p,
    anchorReference: f,
    elevation: b,
    marginThreshold: h,
    externalPaperSlotProps: R,
    transformOrigin: m,
    TransitionComponent: N,
    transitionDuration: C,
    TransitionProps: F
  }), M = ah(D), V = k.useCallback(() => {
    if (f === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (u || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), u;
    const J = An(c), P = J && J.nodeType === 1 ? J : Te($.current).body, ie = P.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const we = P.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && we.top === 0 && we.left === 0 && we.right === 0 && we.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: ie.top + Oi(ie, p.vertical),
      left: ie.left + Ni(ie, p.horizontal)
    };
  }, [c, p.horizontal, p.vertical, u, f]), Q = k.useCallback((J) => ({
    vertical: Oi(J, m.vertical),
    horizontal: Ni(J, m.horizontal)
  }), [m.horizontal, m.vertical]), Z = k.useCallback((J) => {
    const P = {
      width: J.offsetWidth,
      height: J.offsetHeight
    }, ie = Q(P);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Si(ie)
      };
    const we = V();
    let Ne = we.top - ie.vertical, ve = we.left - ie.horizontal;
    const pt = Ne + P.height, Se = ve + P.width, Ke = At(An(c)), Ie = Ke.innerHeight - h, Je = Ke.innerWidth - h;
    if (h !== null && Ne < h) {
      const xe = Ne - h;
      Ne -= xe, ie.vertical += xe;
    } else if (h !== null && pt > Ie) {
      const xe = pt - Ie;
      Ne -= xe, ie.vertical += xe;
    }
    if (process.env.NODE_ENV !== "production" && P.height > Ie && P.height && Ie && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${P.height - Ie}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), h !== null && ve < h) {
      const xe = ve - h;
      ve -= xe, ie.horizontal += xe;
    } else if (Se > Je) {
      const xe = Se - Je;
      ve -= xe, ie.horizontal += xe;
    }
    return {
      top: `${Math.round(Ne)}px`,
      left: `${Math.round(ve)}px`,
      transformOrigin: Si(ie)
    };
  }, [c, f, V, Q, h]), [O, A] = k.useState(E), U = k.useCallback(() => {
    const J = $.current;
    if (!J)
      return;
    const P = Z(J);
    P.top !== null && (J.style.top = P.top), P.left !== null && (J.style.left = P.left), J.style.transformOrigin = P.transformOrigin, A(!0);
  }, [Z]);
  k.useEffect(() => (B && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, B, U]);
  const Y = (J, P) => {
    L && L(J, P), U();
  }, z = () => {
    A(!1);
  };
  k.useEffect(() => {
    E && U();
  }), k.useImperativeHandle(l, () => E ? {
    updatePosition: () => {
      U();
    }
  } : null, [E, U]), k.useEffect(() => {
    if (!E)
      return;
    const J = Zi(() => {
      U();
    }), P = At(c);
    return P.addEventListener("resize", J), () => {
      J.clear(), P.removeEventListener("resize", J);
    };
  }, [c, E, U]);
  let H = C;
  C === "auto" && !N.muiSupportAuto && (H = void 0);
  const q = v || (c ? Te(An(c)).body : void 0), X = (o = w == null ? void 0 : w.root) != null ? o : sh, W = (i = w == null ? void 0 : w.paper) != null ? i : Ga, G = xt({
    elementType: W,
    externalSlotProps: T({}, R, {
      style: O ? R.style : T({}, R.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: b,
      ref: j
    },
    ownerState: D,
    className: ke(M.paper, R == null ? void 0 : R.className)
  }), K = xt({
    elementType: X,
    externalSlotProps: (x == null ? void 0 : x.root) || {},
    externalForwardedProps: S,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: q,
      open: E
    },
    ownerState: D,
    className: ke(M.root, g)
  }), {
    slotProps: oe
  } = K, _ = fe(K, ih);
  return /* @__PURE__ */ y(X, T({}, _, !ca(X) && {
    slotProps: oe,
    disableScrollLock: B
  }, {
    children: /* @__PURE__ */ y(N, T({
      appear: !0,
      in: E,
      onEntering: Y,
      onExited: z,
      timeout: H
    }, F, {
      children: /* @__PURE__ */ y(W, T({}, G, {
        children: d
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ka.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Wr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: zt(a.oneOfType([et, a.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = An(e.anchorEl);
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
  container: a.oneOfType([et, a.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: a.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: ia,
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
    component: Dl
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
const lh = Ka;
function ch(e) {
  return Ge("MuiMenu", e);
}
st("MuiMenu", ["root", "paper", "list"]);
const ph = ["onEntering"], uh = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], dh = {
  vertical: "top",
  horizontal: "right"
}, fh = {
  vertical: "top",
  horizontal: "left"
}, hh = (e) => {
  const {
    classes: t
  } = e;
  return rt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, ch, t);
}, mh = Oe(lh, {
  shouldForwardProp: (e) => Pa(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), gh = Oe(Ga, {
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
}), bh = Oe(Df, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Ja = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o;
  const i = ot({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: l,
    className: c,
    disableAutoFocusItem: p = !1,
    MenuListProps: u = {},
    onClose: f,
    open: d,
    PaperProps: g = {},
    PopoverClasses: v,
    transitionDuration: b = "auto",
    TransitionProps: {
      onEntering: h
    } = {},
    variant: E = "selectedMenu",
    slots: I = {},
    slotProps: w = {}
  } = i, x = fe(i.TransitionProps, ph), m = fe(i, uh), N = En(), C = N.direction === "rtl", L = T({}, i, {
    autoFocus: s,
    disableAutoFocusItem: p,
    MenuListProps: u,
    onEntering: h,
    PaperProps: g,
    transitionDuration: b,
    TransitionProps: x,
    variant: E
  }), B = hh(L), F = s && !p && d, S = k.useRef(null), R = (Z, O) => {
    S.current && S.current.adjustStyleForScrollbar(Z, N), h && h(Z, O);
  }, $ = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), f && f(Z, "tabKeyDown"));
  };
  let j = -1;
  k.Children.map(l, (Z, O) => {
    /* @__PURE__ */ k.isValidElement(Z) && (process.env.NODE_ENV !== "production" && Dn.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (E === "selectedMenu" && Z.props.selected || j === -1) && (j = O));
  });
  const D = (r = I.paper) != null ? r : gh, M = (o = w.paper) != null ? o : g, V = xt({
    elementType: I.root,
    externalSlotProps: w.root,
    ownerState: L,
    className: [B.root, c]
  }), Q = xt({
    elementType: D,
    externalSlotProps: M,
    ownerState: L,
    className: B.paper
  });
  return /* @__PURE__ */ y(mh, T({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: C ? "right" : "left"
    },
    transformOrigin: C ? dh : fh,
    slots: {
      paper: D,
      root: I.root
    },
    slotProps: {
      root: V,
      paper: Q
    },
    open: d,
    ref: n,
    transitionDuration: b,
    TransitionProps: T({
      onEntering: R
    }, x),
    ownerState: L
  }, m, {
    classes: v,
    children: /* @__PURE__ */ y(bh, T({
      onKeyDown: $,
      actions: S,
      autoFocus: s && (j === -1 || p),
      autoFocusItem: F,
      variant: E
    }, u, {
      className: ke(B.list, u.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ja.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: a.oneOfType([et, a.func]),
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
const vh = Ja;
function cm({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var p;
  const [o, i] = re.useState(void 0), s = Pe(
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
  ), l = Pe(() => {
    i(void 0);
  }, []), c = mn(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((p = n == null ? void 0 : n.items) == null ? void 0 : p.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ de(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ y(
          vh,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ y(
              po,
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
const yh = ja(/* @__PURE__ */ y("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function wh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const jr = (e, t, n = {}) => {
  const r = bt(t);
  r.current = t;
  const o = bt(n);
  o.current = wh(o.current);
  const [i, s] = Ee(() => r.current), [l, c] = Ee(!0);
  return Ft(() => {
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
function xh({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, p] = Ee(!1), [u, f] = Ee(!1), d = Pe(() => {
    c && p(!1), f(!1);
  }, [c]), g = Pe((x) => {
    x.stopPropagation(), p((m) => {
      const N = !m;
      return N && x.shiftKey ? f(!0) : N || f(!1), N;
    });
  }, []), v = Pe(
    (x) => (d(), r(x)),
    [r, d]
  ), [b, h] = Ee({ top: 1, left: 1 });
  Ft(() => {
    if (c) {
      const x = o == null ? void 0 : o.current;
      if (x) {
        const m = x.getBoundingClientRect(), N = window.scrollY, C = window.scrollX, L = m.top + N + x.clientHeight, B = m.left + C;
        h({ top: L, left: B });
      }
    }
  }, [c, o]);
  const [E] = jr(
    Pe(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [I] = jr(
    Pe(async () => (e == null ? void 0 : e(!0)) ?? n ?? E, [e, n, E, c]),
    n ?? E
  ), w = u && I ? I : E;
  return /* @__PURE__ */ de(Wn, { children: [
    /* @__PURE__ */ y(
      Ii,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${i ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: g,
        children: l ?? /* @__PURE__ */ y(yh, {})
      }
    ),
    /* @__PURE__ */ y(
      Is,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: d,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: b.top,
            left: b.left
          }
        },
        children: w ? /* @__PURE__ */ y(
          Cf,
          {
            className: i,
            id: `${s ?? ""} main menu`,
            commandHandler: v,
            multiColumnMenu: w
          }
        ) : void 0
      }
    )
  ] });
}
function pm({
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
  return /* @__PURE__ */ y(
    Ii,
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
const Eh = Br(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Za = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(_i.Root, { ref: n, className: te(Eh(), e), ...t }));
Za.displayName = _i.Root.displayName;
function Hn({
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
  onChange: f,
  onFocus: d,
  onBlur: g
}) {
  return /* @__PURE__ */ de("div", { className: te("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ y(
      Za,
      {
        htmlFor: e,
        className: te({
          "pr-text-red-600": n,
          "pr-hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ y(
      Ur,
      {
        id: e,
        disabled: t,
        placeholder: s,
        required: l,
        className: te(c, { "pr-border-red-600": n }),
        defaultValue: p,
        value: u,
        onChange: f,
        onFocus: d,
        onBlur: g
      }
    ),
    /* @__PURE__ */ y("p", { className: te({ "pr-hidden": !o }), children: o })
  ] });
}
let xr;
const Er = () => (xr || (xr = ue.allBookIds.map((e) => ({
  bookId: e,
  label: ue.bookIdToEnglishName(e)
}))), xr);
function um({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c, p) => {
    const f = { bookNum: ue.bookIdToNumber(p.bookId), chapterNum: 1, verseNum: 1 };
    r(f);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, s = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = mn(() => Er()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ de("span", { id: n, className: "pr-flex pr-place-items-center", children: [
    /* @__PURE__ */ y(
      Or,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: Er(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ y(
      ft,
      {
        onClick: () => r(So(e, -1)),
        disabled: e.bookNum <= ds,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(
      ft,
      {
        onClick: () => r(So(e, 1)),
        disabled: e.bookNum >= Er().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ y(
      Hn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ y(
      ft,
      {
        onClick: () => t(Co(e, -1)),
        disabled: e.chapterNum <= fs,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(
      ft,
      {
        onClick: () => t(Co(e, 1)),
        disabled: e.chapterNum >= Ri(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ y(
      Hn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ y(
      ft,
      {
        onClick: () => t(Po(e, -1)),
        disabled: e.verseNum <= hs,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(ft, { onClick: () => t(Po(e, 1)), children: ">" })
  ] });
}
function dm({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = Ee(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ y(
    Hn,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  );
}
function fm({
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
  onChange: f,
  onChangeCommitted: d
}) {
  return /* @__PURE__ */ y(
    _s,
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
      onChange: f,
      onChangeCommitted: d
    }
  );
}
function hm({
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
  return /* @__PURE__ */ y(
    As,
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
function mm({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ y(
    Ds,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Ci({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return (
    // `as keyof R` reminds TypeScript of what it actually is
    // `as string` is just asserting that the input is a string because this is the default editor
    // used for all values. It will probably break on non-strings
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    /* @__PURE__ */ y(Hn, { defaultValue: t[n.key], onChange: r })
  );
}
const kh = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ y(
  Hi,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function gm({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: n,
  onColumnResize: r,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: p,
  enableSelectColumn: u,
  selectColumnWidth: f = 50,
  rowKeyGetter: d,
  rowHeight: g = 35,
  headerRowHeight: v = 35,
  selectedRows: b,
  onSelectedRowsChange: h,
  onRowsChange: E,
  onCellClick: I,
  onCellDoubleClick: w,
  onCellContextMenu: x,
  onCellKeyDown: m,
  direction: N = "ltr",
  enableVirtualization: C = !0,
  onCopy: L,
  onPaste: B,
  onScroll: F,
  className: S,
  "data-testid": R
}) {
  const $ = mn(() => {
    const j = e.map((D) => typeof D.editable == "function" ? {
      ...D,
      editable: (V) => !!D.editable(V),
      renderEditCell: D.renderEditCell || Ci
    } : D.editable && !D.renderEditCell ? { ...D, renderEditCell: Ci } : D.renderEditCell && !D.editable ? { ...D, editable: !1 } : D);
    return u ? [{ ...Hs, minWidth: f }, ...j] : j;
  }, [e, u, f]);
  return /* @__PURE__ */ y(
    Us,
    {
      columns: $,
      defaultColumnOptions: {
        width: o,
        minWidth: i,
        maxWidth: s,
        sortable: l,
        resizable: c
      },
      sortColumns: t,
      onSortColumnsChange: n,
      onColumnResize: r,
      rows: p,
      rowKeyGetter: d,
      rowHeight: g,
      headerRowHeight: v,
      selectedRows: b,
      onSelectedRowsChange: h,
      onRowsChange: E,
      onCellClick: I,
      onCellDoubleClick: w,
      onCellContextMenu: x,
      onCellKeyDown: m,
      direction: N,
      enableVirtualization: C,
      onCopy: L,
      onPaste: B,
      onScroll: F,
      renderers: { renderCheckbox: kh },
      className: `papi-table ${S ?? "rdg-light"}`,
      "data-testid": R
    }
  );
}
function bm({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = bt(void 0);
  return /* @__PURE__ */ y("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ y(js, { position: "static", id: r, children: /* @__PURE__ */ de(Bs, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ y(
      xh,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ y("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const vm = (e, t) => {
  Ft(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, kr = () => !1, ym = (e, t) => {
  const [n] = jr(
    Pe(async () => {
      if (!e)
        return kr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    kr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Ft(() => () => {
    n !== kr && n();
  }, [n]);
}, wm = Me.Root, Th = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.List,
  {
    ref: n,
    className: te(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Th.displayName = Me.List.displayName;
const Oh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.Trigger,
  {
    ref: n,
    className: te(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
Oh.displayName = Me.Trigger.displayName;
const Nh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.Content,
  {
    ref: n,
    className: te(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Nh.displayName = Me.Content.displayName;
const Sh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.Root,
  {
    orientation: "vertical",
    ref: n,
    className: te("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Sh.displayName = Me.List.displayName;
const Ch = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.List,
  {
    ref: n,
    className: te(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Ch.displayName = Me.List.displayName;
const xm = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.Trigger,
  {
    ref: n,
    ...t,
    className: te(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Ph = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.Content,
  {
    ref: n,
    className: te(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Ph.displayName = Me.Content.displayName;
const Rh = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ y(
    "div",
    {
      ref: n,
      className: te(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
Rh.displayName = "Card";
const $h = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ y(
    "div",
    {
      ref: n,
      className: te("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
$h.displayName = "CardHeader";
const Mh = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ y(
    "h3",
    {
      ref: n,
      className: te("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
Mh.displayName = "CardTitle";
const Ih = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y("p", { ref: n, className: te("pr-text-sm pr-text-muted-foreground", e), ...t }));
Ih.displayName = "CardDescription";
const _h = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ y("div", { ref: n, className: te("pr-p-6 pr-pt-0", e), ...t })
);
_h.displayName = "CardContent";
const Ah = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ y("div", { ref: n, className: te("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
Ah.displayName = "CardFooter";
const Dh = Br(
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
), jh = re.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ y("div", { ref: r, role: "alert", className: te(Dh({ variant: t }), e), ...n }));
jh.displayName = "Alert";
const Bh = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ de(
    "h5",
    {
      ref: n,
      className: te("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
Bh.displayName = "AlertTitle";
const Lh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y("div", { ref: n, className: te("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
Lh.displayName = "AlertDescription";
const Fh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ de(
  en.Root,
  {
    ref: n,
    className: te(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ y(en.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ y(en.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ y(en.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
Fh.displayName = en.Root.displayName;
const Vh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Tr.Root,
  {
    className: te(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ y(
      Tr.Thumb,
      {
        className: te(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
Vh.displayName = Tr.Root.displayName;
function zh(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
zh(`.papi-icon-button {
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
.pr-h-6 {
  height: 1.5rem;
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
.pr-h-full {
  height: 100%;
}
.pr-h-px {
  height: 1px;
}
.pr-w-10 {
  width: 2.5rem;
}
.pr-w-11 {
  width: 2.75rem;
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
.pr-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.pr-w-\\[116px\\] {
  width: 116px;
}
.pr-w-\\[124px\\] {
  width: 124px;
}
.pr-w-full {
  width: 100%;
}
.pr-min-w-\\[8rem\\] {
  min-width: 8rem;
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
.pr-place-items-center {
  place-items: center;
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
.pr-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
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
.pr-bg-card {
  background-color: hsl(var(--card));
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
.pr-pt-4 {
  padding-top: 1rem;
}
.pr-text-left {
  text-align: left;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.search-bar-paper {
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
}

.mlln6zg7-0-0-beta-42 {
  @layer rdg.MeasuringCell {
    contain: strict;
    grid-row: 1;
    visibility: hidden;
  }
}


.cj343x07-0-0-beta-42 {
  @layer rdg.Cell {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning,
     * layout/paint/style containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none;

    &[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }
}

.csofj7r7-0-0-beta-42 {
  @layer rdg.Cell {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1;
  }
}

.ch2wcw87-0-0-beta-42 {
  @layer rdg.Cell {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
}


.c1bn88vv7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px; /* align checkbox in row group cell */
  }
}

.c1qt073l7-0-0-beta-42 {
  @layer rdg.CheckboxInput {
    all: unset;
  }
}

.cf71kmq7-0-0-beta-42 {
  @layer rdg.CheckboxIcon {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color);

    .c1qt073l7-0-0-beta-42:checked + & {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .c1qt073l7-0-0-beta-42:focus + & {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }
}

.c1lwve4p7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: default;

    .cf71kmq7-0-0-beta-42 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }
}


.g1s9ylgp7-0-0-beta-42 {
  @layer rdg.GroupCellContent {
    outline: none;
  }
}

.cz54e4y7-0-0-beta-42 {
  @layer rdg.GroupCellCaret {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle;

    > path {
      transition: d 0.1s;
    }
  }
}


.c1w9bbhr7-0-0-beta-42 {
  @layer rdg.DragHandle {
    --rdg-drag-handle-size: 8px;
    z-index: 0;
    cursor: move;
    inline-size: var(--rdg-drag-handle-size);
    block-size: var(--rdg-drag-handle-size);
    background-color: var(--rdg-selection-color);
    place-self: end;

    &:hover {
      --rdg-drag-handle-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }
}

.c1creorc7-0-0-beta-42 {
  @layer rdg.DragHandle {
    z-index: 1;
    position: sticky;
  }
}


.cis5rrm7-0-0-beta-42 {
  @layer rdg.EditCell {
    padding: 0;
  }
}


.h44jtk67-0-0-beta-42 {
  @layer rdg.SortableHeaderCell {
    display: flex;
  }
}

.hcgkhxz7-0-0-beta-42 {
  @layer rdg.SortableHeaderCellName {
    flex-grow: 1;
    overflow: clip;
    text-overflow: ellipsis;
  }
}


.c6l2wv17-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: pointer;
  }
}

.c1kqdw7y7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    touch-action: none;
  }
}

.r1y6ywlx7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: col-resize;
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 10px;
  }
}

.c1bezg5o7-0-0-beta-42 {
  opacity: 0.5;
}

.c1vc96037-0-0-beta-42 {
  background-color: var(--rdg-header-draggable-background-color);
}


.r1upfr807-0-0-beta-42 {
  @layer rdg.Row {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color);

    &:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    &[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);

      &:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
    }
  }
}

.r190mhd37-0-0-beta-42 {
  @layer rdg.FocusSink {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px;
  }
}

.r139qu9m7-0-0-beta-42 {
  @layer rdg.FocusSink {
    &::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }
}


.h10tskcx7-0-0-beta-42 {
  @layer rdg.HeaderRow {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold;

    & > .cj343x07-0-0-beta-42 {
      /* Should have a higher value than 1 to show up above regular cells and the focus sink */
      z-index: 2;
      position: sticky;
    }

    & > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}


.c6ra8a37-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;
  }
}

.cq910m07-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;

    &.c6ra8a37-0-0-beta-42 {
      background-color: #9999ff;
    }
  }
}


.a3ejtar7-0-0-beta-42 {
  @layer rdg.SortIcon {
    fill: currentColor;

    > path {
      transition: d 0.1s;
    }
  }
}


.rnvodz57-0-0-beta-42 {
  @layer rdg.Defaults {
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  @layer rdg.Root {
    --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 90.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
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
    font-size: var(--rdg-font-size);

    /* needed on Firefox to fix scrollbars */
    &::before {
      content: '';
      grid-column: 1/-1;
      grid-row: 1/-1;
    }

    &.rdg-dark {
      --rdg-color-scheme: dark;
      --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
    }

    &.rdg-light {
      --rdg-color-scheme: light;
    }

    @media (prefers-color-scheme: dark) {
      &:not(.rdg-light) {
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }
    }
  }
}

.vlqv91k7-0-0-beta-42 {
  @layer rdg.Root {
    user-select: none;

    & .r1upfr807-0-0-beta-42 {
      cursor: move;
    }
  }
}

.f1lsfrzw7-0-0-beta-42 {
  @layer rdg.FocusSink {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 1 to show up above regular frozen cells */
    z-index: 1;
  }
}

.f1cte0lg7-0-0-beta-42 {
  @layer rdg.FocusSink {
    /* Should have a higher value than 3 to show up above header and summary rows */
    z-index: 3;
  }
}


.s8wc6fl7-0-0-beta-42 {
  @layer rdg.SummaryCell {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom);
  }
}


.skuhp557-0-0-beta-42 {
  @layer rdg.SummaryRow {
    line-height: var(--rdg-summary-row-height);

    > .cj343x07-0-0-beta-42 {
      position: sticky;
    }
  }
}

.tf8l5ub7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      z-index: 2;
    }

    > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}

.tb9ughf7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }
}

.b1yssfnt7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }
}


.g1yxluv37-0-0-beta-42 {
  @layer rdg.GroupedRow {
    &:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    > .cj343x07-0-0-beta-42:not(:last-child):not(.ch2wcw87-0-0-beta-42) {
      border-inline-end: none;
    }
  }
}


.t7vyx3i7-0-0-beta-42 {
  @layer rdg.TextEditor {
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
    font-size: var(--rdg-font-size);

    &:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    &::placeholder {
      color: #999;
      opacity: 1;
    }
  }
}

`, "top");
export {
  jh as Alert,
  Lh as AlertDescription,
  Bh as AlertTitle,
  am as BookChapterControl,
  ft as Button,
  Rh as Card,
  _h as CardContent,
  Ih as CardDescription,
  Ah as CardFooter,
  $h as CardHeader,
  Mh as CardTitle,
  sm as ChapterRangeSelector,
  Hi as Checkbox,
  lm as Checklist,
  Or as ComboBox,
  cm as ContextMenu,
  rl as DropdownMenu,
  sl as DropdownMenuCheckboxItem,
  Vi as DropdownMenuContent,
  nm as DropdownMenuGroup,
  zi as DropdownMenuItem,
  zr as DropdownMenuLabel,
  rm as DropdownMenuPortal,
  im as DropdownMenuRadioGroup,
  ll as DropdownMenuRadioItem,
  Ui as DropdownMenuSeparator,
  cl as DropdownMenuShortcut,
  om as DropdownMenuSub,
  al as DropdownMenuSubContent,
  il as DropdownMenuSubTrigger,
  ol as DropdownMenuTrigger,
  Cf as GridMenu,
  xh as HamburgerMenuButton,
  pm as IconButton,
  Ur as Input,
  $t as LabelPosition,
  La as MenuItem,
  um as RefSelector,
  dm as SearchBar,
  Fh as ShadCnSlider,
  Vh as ShadCnSwitch,
  fm as Slider,
  hm as Snackbar,
  mm as Switch,
  gm as Table,
  wm as Tabs,
  Nh as TabsContent,
  Th as TabsList,
  Oh as TabsTrigger,
  Hn as TextField,
  bm as Toolbar,
  Sh as VerticalTabs,
  Ph as VerticalTabsContent,
  Ch as VerticalTabsList,
  xm as VerticalTabsTrigger,
  xl as buttonVariants,
  vm as useEvent,
  ym as useEventAsync,
  jr as usePromise
};
//# sourceMappingURL=index.js.map
