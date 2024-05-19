import ss, { jsxs as pe, jsx as T, Fragment as Un } from "react/jsx-runtime";
import * as x from "react";
import $t, { forwardRef as ki, useCallback as xe, useLayoutEffect as ls, useState as je, useRef as ft, useEffect as fn, useMemo as Lt } from "react";
import { getChaptersForBook as Oi, offsetBook as Eo, FIRST_SCR_BOOK_NUM as cs, offsetChapter as To, FIRST_SCR_CHAPTER_NUM as us, offsetVerse as ko, FIRST_SCR_VERSE_NUM as ps } from "platform-bible-utils";
import * as ge from "@radix-ui/react-dropdown-menu";
import { ChevronRight as ds, Check as fs, Circle as hs, History as ms, ArrowDownWideNarrow as gs, Clock as bs, Bookmark as vs } from "lucide-react";
import Ee, { clsx as ys } from "clsx";
import { twMerge as ws } from "tailwind-merge";
import { Slot as xs } from "@radix-ui/react-slot";
import { cva as Si } from "class-variance-authority";
import { Autocomplete as Es, TextField as Ts, FormControlLabel as Oo, FormLabel as ks, Checkbox as Os, MenuItem as Ss, ListItemText as Cs, ListItemIcon as Ci, Menu as Ps, Grid as Pi, List as Ns, IconButton as Ni, Drawer as Rs, Paper as $s, Slider as Ms, Snackbar as Is, Switch as _s, AppBar as As, Toolbar as Ds } from "@mui/material";
import js, { ThemeContext as Bs, internal_processStyles as Ls } from "@mui/styled-engine";
import * as Fs from "react-dom";
import kn from "react-dom";
import * as Ri from "@radix-ui/react-label";
import Vs, { SelectColumn as zs } from "react-data-grid";
var Us = Object.defineProperty, Hs = (e, t, n) => t in e ? Us(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, te = (e, t, n) => (Hs(e, typeof t != "symbol" ? t + "" : t, n), n);
const mt = [
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
], So = el();
function Ft(e, t = !0) {
  return t && (e = e.toUpperCase()), e in So ? So[e] : 0;
}
function Dr(e) {
  return Ft(e) > 0;
}
function Ws(e) {
  const t = typeof e == "string" ? Ft(e) : e;
  return t >= 40 && t <= 66;
}
function qs(e) {
  return (typeof e == "string" ? Ft(e) : e) <= 39;
}
function Mi(e) {
  return e <= 66;
}
function Gs(e) {
  const t = typeof e == "string" ? Ft(e) : e;
  return Ai(t) && !Mi(t);
}
function* Ks() {
  for (let e = 1; e <= mt.length; e++)
    yield e;
}
const Xs = 1, Ii = mt.length;
function Ys() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function jr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= mt.length ? t : mt[n];
}
function _i(e) {
  return e <= 0 || e > Ii ? "******" : $i[e - 1];
}
function Js(e) {
  return _i(Ft(e));
}
function Ai(e) {
  const t = typeof e == "number" ? jr(e) : e;
  return Dr(t) && !Ar.includes(t);
}
function Zs(e) {
  const t = typeof e == "number" ? jr(e) : e;
  return Dr(t) && Ar.includes(t);
}
function Qs(e) {
  return $i[e - 1].includes("*obsolete*");
}
function el() {
  const e = {};
  for (let t = 0; t < mt.length; t++)
    e[mt[t]] = t + 1;
  return e;
}
const ce = {
  allBookIds: mt,
  nonCanonicalIds: Ar,
  bookIdToNumber: Ft,
  isBookIdValid: Dr,
  isBookNT: Ws,
  isBookOT: qs,
  isBookOTNT: Mi,
  isBookDC: Gs,
  allBookNumbers: Ks,
  firstBook: Xs,
  lastBook: Ii,
  extraBooks: Ys,
  bookNumberToId: jr,
  bookNumberToEnglishName: _i,
  bookIdToEnglishName: Js,
  isCanonical: Ai,
  isExtraMaterial: Zs,
  isObsolete: Qs
};
var rt = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(rt || {});
const Me = class {
  // private versInfo: Versification;
  constructor(t) {
    if (te(this, "name"), te(this, "fullPath"), te(this, "isPresent"), te(this, "hasVerseSegments"), te(this, "isCustomized"), te(this, "baseVersification"), te(this, "scriptureBooks"), te(this, "_type"), t != null)
      typeof t == "string" ? this.name = t : this._type = t;
    else
      throw new Error("Argument null");
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
te(Me, "Original", new Me(rt.Original)), te(Me, "Septuagint", new Me(rt.Septuagint)), te(Me, "Vulgate", new Me(rt.Vulgate)), te(Me, "English", new Me(rt.English)), te(Me, "RussianProtestant", new Me(rt.RussianProtestant)), te(Me, "RussianOrthodox", new Me(rt.RussianOrthodox));
let Pt = Me;
function Co(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Di = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Di || {});
const Ce = class oe {
  constructor(t, n, r, o) {
    if (te(this, "firstChapter"), te(this, "lastChapter"), te(this, "lastVerse"), te(this, "hasSegmentsDefined"), te(this, "text"), te(this, "BBBCCCVVVS"), te(this, "longHashCode"), te(this, "versification"), te(this, "rtlMark", "‏"), te(this, "_bookNum", 0), te(this, "_chapterNum", 0), te(this, "_verseNum", 0), te(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof Pt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof Pt ? n : void 0;
        this.setEmpty(i), this._verseNum = t % oe.chapterDigitShifter, this._chapterNum = Math.floor(
          t % oe.bookDigitShifter / oe.chapterDigitShifter
        ), this._bookNum = Math.floor(t / oe.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof oe) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null)
            return;
          const i = t instanceof Pt ? t : oe.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? oe.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(t, n = oe.defaultVersification) {
    const r = new oe(n);
    return r.parse(t), r;
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
      return n = oe.parse(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Gt)
        return n = new oe(), { success: !1, verseRef: n };
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
    return t % oe.bcvMaxValue * oe.bookDigitShifter + (n >= 0 ? n % oe.bcvMaxValue * oe.chapterDigitShifter : 0) + (r >= 0 ? r % oe.bcvMaxValue : 0);
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
      if (n = n * 10 + +r - +"0", n > oe.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(oe.verseRangeSeparator) || this._verse.includes(oe.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ce.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = ce.bookIdToNumber(t);
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
    const { success: n, vNum: r } = oe.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = oe.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > ce.lastBook)
      throw new Gt(
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
    this.versification = this.versification != null ? new Pt(t) : void 0;
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
    return this.validateVerse(oe.verseRangeSeparators, oe.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return oe.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return oe.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new Pt(rt[s]);
        } catch {
          throw new Gt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Gt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ce.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(r[1]))
      throw new Gt("Invalid reference : " + t);
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
    return new oe(this);
  }
  toString() {
    const t = this.book;
    return t === "" ? "" : `${t} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(t) {
    return t instanceof oe ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && t.versification != null && this.versification != null && t.versification.equals(this.versification) : !1;
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
  allVerses(t = !1, n = oe.verseRangeSeparators, r = oe.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = Co(this._verse, r);
    for (const s of i.map((l) => Co(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const u = this.clone();
        if (u.verse = s[1], !t)
          for (let p = c + 1; p < u.verseNum; p++) {
            const f = new oe(
              this._bookNum,
              this._chapterNum,
              p,
              this.versification
            );
            this.isExcluded || o.push(f);
          }
        o.push(u);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ce.lastBook ? 2 : (ce.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = oe.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = ce.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
te(Ce, "defaultVersification", Pt.English), te(Ce, "verseRangeSeparator", "-"), te(Ce, "verseSequenceIndicator", ","), te(Ce, "verseRangeSeparators", [Ce.verseRangeSeparator]), te(Ce, "verseSequenceIndicators", [Ce.verseSequenceIndicator]), te(Ce, "chapterDigitShifter", 1e3), te(Ce, "bookDigitShifter", Ce.chapterDigitShifter * Ce.chapterDigitShifter), te(Ce, "bcvMaxValue", Ce.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
te(Ce, "ValidStatusType", Di);
class Gt extends Error {
}
function ye(...e) {
  return ws(ys(e));
}
const tl = ge.Root, nl = ge.Trigger, rl = x.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ pe(
  ge.SubTrigger,
  {
    ref: o,
    className: ye(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ T(ds, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
rl.displayName = ge.SubTrigger.displayName;
const ol = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ T(
  ge.SubContent,
  {
    ref: n,
    className: ye(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
ol.displayName = ge.SubContent.displayName;
const ji = x.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ T(ge.Portal, { children: /* @__PURE__ */ T(
  ge.Content,
  {
    ref: r,
    sideOffset: t,
    className: ye(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
ji.displayName = ge.Content.displayName;
const Bi = x.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ T(
  ge.Item,
  {
    ref: r,
    className: ye(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
Bi.displayName = ge.Item.displayName;
const il = x.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ pe(
  ge.CheckboxItem,
  {
    ref: o,
    className: ye(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ T("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ T(ge.ItemIndicator, { children: /* @__PURE__ */ T(fs, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
il.displayName = ge.CheckboxItem.displayName;
const al = x.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ pe(
  ge.RadioItem,
  {
    ref: r,
    className: ye(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ T("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ T(ge.ItemIndicator, { children: /* @__PURE__ */ T(hs, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
al.displayName = ge.RadioItem.displayName;
const Br = x.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ T(
  ge.Label,
  {
    ref: r,
    className: ye("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
Br.displayName = ge.Label.displayName;
const Li = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ T(
  ge.Separator,
  {
    ref: n,
    className: ye("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Li.displayName = ge.Separator.displayName;
const Lr = x.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ T(
    "input",
    {
      type: t,
      className: ye(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Lr.displayName = "Input";
const sl = ki(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ pe("div", { className: "pr-relative", children: [
    /* @__PURE__ */ T(
      Lr,
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
    /* @__PURE__ */ T(
      ms,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function ll({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (l, c) => c + 1), s = xe(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ T("div", { className: ye("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((l) => /* @__PURE__ */ T(
    "div",
    {
      className: ye(
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
const cl = ki(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s,
    onMount: l
  }, c) => (ls(() => {
    l && l();
  }, []), /* @__PURE__ */ pe(
    Bi,
    {
      ref: c,
      textValue: e,
      className: ye("pr-font-normal pr-text-slate-700", {
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
        /* @__PURE__ */ T(
          "span",
          {
            className: ye(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": i.toLowerCase() === "ot",
                "pr-border-l-purple-200": i.toLowerCase() === "nt",
                "pr-border-l-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: ce.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ T("div", { children: s })
      ]
    },
    e
  ))
);
function ul({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ pe(Br, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ T("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ pe("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ T(
        gs,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ T(
        bs,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ T(
        vs,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const nn = ce.allBookIds, pl = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Po = ["OT", "NT", "DC"], dl = 32 + 32 + 32, fl = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], hl = (e) => ({
  OT: nn.filter((n) => ce.isBookOT(n)),
  NT: nn.filter((n) => ce.isBookNT(n)),
  DC: nn.filter((n) => ce.isBookDC(n))
})[e], Kt = (e) => Oi(ce.bookIdToNumber(e));
function ml() {
  return nn.map((t) => ce.bookIdToEnglishName(t));
}
function gl(e) {
  return ml().includes(e);
}
function bl(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (gl(t))
    return nn.find((r) => ce.bookIdToEnglishName(r) === t);
}
function Dh({ scrRef: e, handleSubmit: t }) {
  const [n, r] = je(""), [o, i] = je(
    ce.bookNumberToId(e.bookNum)
  ), [s, l] = je(e.chapterNum ?? 0), [c, u] = je(
    ce.bookNumberToId(e.bookNum)
  ), [p, f] = je(!1), d = ft(void 0), b = ft(void 0), v = ft(void 0), g = xe(
    (O) => hl(O).filter((N) => {
      const R = ce.bookIdToEnglishName(N).toLowerCase(), L = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return R.includes(L) || // Match book name
      N.toLowerCase().includes(L);
    }),
    [n]
  ), m = (O) => {
    r(O);
  }, E = ft(!1), M = xe((O) => {
    if (E.current) {
      E.current = !1;
      return;
    }
    f(O);
  }, []), y = xe(
    (O, N, R, L) => {
      if (l(
        ce.bookNumberToId(e.bookNum) !== O ? 1 : e.chapterNum
      ), N || Kt(O) === -1) {
        t({
          bookNum: ce.bookIdToNumber(O),
          chapterNum: R || 1,
          verseNum: L || 1
        }), f(!1), r("");
        return;
      }
      i(o !== O ? O : ""), f(!N);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), w = (O) => {
    O <= 0 || O > Kt(o) || y(o, !0, O);
  }, h = xe(() => {
    fl.forEach((O) => {
      const N = n.match(O);
      if (N) {
        const [R, L = void 0, V = void 0] = N.slice(1), D = bl(R);
        (ce.isBookIdValid(R) || D) && y(
          D ?? R,
          !0,
          L ? parseInt(L, 10) : 1,
          V ? parseInt(V, 10) : 1
        );
      }
    });
  }, [y, n]), C = xe(
    (O) => {
      p ? (O.key === "ArrowDown" || O.key === "ArrowUp") && (typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null ? v.current.focus() : typeof b < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      b.current !== null && b.current.focus(), O.preventDefault()) : f(!0);
    },
    [p]
  ), P = (O) => {
    const { key: N } = O;
    N === "ArrowRight" || N === "ArrowLeft" || N === "ArrowDown" || N === "ArrowUp" || N === "Enter" || (d.current.dispatchEvent(new KeyboardEvent("keydown", { key: N })), d.current.focus());
  }, B = (O) => {
    const { key: N } = O;
    if (c === o) {
      if (N === "Enter") {
        O.preventDefault(), y(o, !0, s);
        return;
      }
      let R = 0;
      if (N === "ArrowRight")
        if (s < Kt(c))
          R = 1;
        else {
          O.preventDefault();
          return;
        }
      else if (N === "ArrowLeft")
        if (s > 1)
          R = -1;
        else {
          O.preventDefault();
          return;
        }
      else
        N === "ArrowDown" ? R = 6 : N === "ArrowUp" && (R = -6);
      s + R <= 0 || s + R > Kt(c) ? l(0) : R !== 0 && (l(s + R), O.preventDefault());
    }
  };
  fn(() => {
    o === c ? o === ce.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]);
  const j = xe(() => {
    let O = b.current;
    if (v.current && (O || (O = v.current.closest("[data-radix-menu-content]"))), console.log(
      `contentRef.current: ${b.current}
contentElement: ${O}
menuItemRef.current: ${v.current}`
    ), O && v.current) {
      const N = v.current.offsetTop, R = N - dl;
      console.log(`contentElement.offsetTop: ${O.offsetTop}`), console.log(`menuItemOffsetTop: ${N}
scrollPosition: ${R}`), O.scrollTo({ top: R, behavior: "instant" });
    }
  }, []);
  return /* @__PURE__ */ T("div", { children: /* @__PURE__ */ pe(tl, { modal: !1, open: p, onOpenChange: M, children: [
    /* @__PURE__ */ T(nl, { asChild: !0, children: /* @__PURE__ */ T(
      sl,
      {
        ref: d,
        value: n,
        handleSearch: m,
        handleKeyDown: C,
        handleOnClick: () => {
          i(ce.bookNumberToId(e.bookNum)), u(ce.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), f(!0), d.current.focus();
        },
        onFocus: () => {
          E.current = !0;
        },
        handleSubmit: h,
        placeholder: `${ce.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ pe(
      ji,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: P,
        align: "start",
        ref: b,
        children: [
          /* @__PURE__ */ T(
            ul,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          Po.map(
            (O, N) => g(O).length > 0 && /* @__PURE__ */ pe("div", { children: [
              /* @__PURE__ */ T(Br, { className: "pr-font-semibold pr-text-slate-700", children: pl[O] }),
              g(O).map((R) => /* @__PURE__ */ T("div", { children: /* @__PURE__ */ T(
                cl,
                {
                  bookId: R,
                  handleSelectBook: () => y(R, !1),
                  isSelected: o === R,
                  handleHighlightBook: () => u(R),
                  handleKeyDown: B,
                  bookType: O,
                  ref: (L) => {
                    o === R && (v.current = L);
                  },
                  onMount: o === R ? j : void 0,
                  children: /* @__PURE__ */ T(
                    ll,
                    {
                      handleSelectChapter: w,
                      endChapter: Kt(R),
                      activeChapter: e.bookNum === ce.bookIdToNumber(R) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (L) => {
                        l(L);
                      }
                    }
                  )
                }
              ) }, R)),
              Po.length - 1 !== N ? /* @__PURE__ */ T(Li, {}) : void 0
            ] }, O)
          )
        ]
      }
    )
  ] }) });
}
const vl = Si(
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
), Fi = x.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ T(r ? xs : "button", { className: ye(vl({ variant: t, size: n, className: e })), ref: i, ...o })
);
Fi.displayName = "Button";
function xt({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ T(
    Fi,
    {
      id: e,
      disabled: t,
      className: ye("papi-button", n),
      onClick: r,
      onContextMenu: o,
      children: i
    }
  );
}
function Er({
  id: e,
  title: t,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: s,
  options: l = [],
  className: c,
  value: u,
  onChange: p,
  onFocus: f,
  onBlur: d,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ T(
    Es,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: u,
      onChange: p,
      onFocus: f,
      onBlur: d,
      getOptionLabel: b,
      renderInput: (v) => /* @__PURE__ */ T(
        Ts,
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
function jh({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o,
  chapterCount: i
}) {
  const s = Lt(
    () => Array.from({ length: i }, (u, p) => p + 1),
    [i]
  ), l = (u, p) => {
    n(p), p > t && r(p);
  }, c = (u, p) => {
    r(p), p < e && n(p);
  };
  return /* @__PURE__ */ pe(Un, { children: [
    /* @__PURE__ */ T(
      Oo,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ T(
          Er,
          {
            onChange: (u, p) => l(u, p),
            className: "book-selection-chapter",
            isClearable: !1,
            options: s,
            getOptionLabel: (u) => u.toString(),
            value: e,
            isDisabled: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ T(
      Oo,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ T(
          Er,
          {
            onChange: (u, p) => c(u, p),
            className: "book-selection-chapter",
            isClearable: !1,
            options: s,
            getOptionLabel: (u) => u.toString(),
            value: t,
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
var Nt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Nt || {});
function yl({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Nt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const p = /* @__PURE__ */ T(
    Os,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: i,
      disabled: s,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: u
    }
  );
  let f;
  if (n) {
    const d = r === Nt.Before || r === Nt.Above, b = /* @__PURE__ */ T("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), v = r === Nt.Before || r === Nt.After, g = v ? b : /* @__PURE__ */ T("div", { children: b }), m = v ? p : /* @__PURE__ */ T("div", { children: p });
    f = /* @__PURE__ */ pe(
      ks,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: l,
        children: [
          d && g,
          m,
          !d && g
        ]
      }
    );
  } else
    f = p;
  return f;
}
function ue(e, t) {
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
function wl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function xl(e) {
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
var Tr = { exports: {} }, On = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var No;
function El() {
  if (No)
    return ie;
  No = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, M = e ? Symbol.for("react.scope") : 60119;
  function y(h) {
    if (typeof h == "object" && h !== null) {
      var C = h.$$typeof;
      switch (C) {
        case t:
          switch (h = h.type, h) {
            case c:
            case u:
            case r:
            case i:
            case o:
            case f:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case p:
                case v:
                case b:
                case s:
                  return h;
                default:
                  return C;
              }
          }
        case n:
          return C;
      }
    }
  }
  function w(h) {
    return y(h) === u;
  }
  return ie.AsyncMode = c, ie.ConcurrentMode = u, ie.ContextConsumer = l, ie.ContextProvider = s, ie.Element = t, ie.ForwardRef = p, ie.Fragment = r, ie.Lazy = v, ie.Memo = b, ie.Portal = n, ie.Profiler = i, ie.StrictMode = o, ie.Suspense = f, ie.isAsyncMode = function(h) {
    return w(h) || y(h) === c;
  }, ie.isConcurrentMode = w, ie.isContextConsumer = function(h) {
    return y(h) === l;
  }, ie.isContextProvider = function(h) {
    return y(h) === s;
  }, ie.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, ie.isForwardRef = function(h) {
    return y(h) === p;
  }, ie.isFragment = function(h) {
    return y(h) === r;
  }, ie.isLazy = function(h) {
    return y(h) === v;
  }, ie.isMemo = function(h) {
    return y(h) === b;
  }, ie.isPortal = function(h) {
    return y(h) === n;
  }, ie.isProfiler = function(h) {
    return y(h) === i;
  }, ie.isStrictMode = function(h) {
    return y(h) === o;
  }, ie.isSuspense = function(h) {
    return y(h) === f;
  }, ie.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === r || h === u || h === i || h === o || h === f || h === d || typeof h == "object" && h !== null && (h.$$typeof === v || h.$$typeof === b || h.$$typeof === s || h.$$typeof === l || h.$$typeof === p || h.$$typeof === m || h.$$typeof === E || h.$$typeof === M || h.$$typeof === g);
  }, ie.typeOf = y, ie;
}
var ae = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ro;
function Tl() {
  return Ro || (Ro = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, M = e ? Symbol.for("react.scope") : 60119;
    function y(_) {
      return typeof _ == "string" || typeof _ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      _ === r || _ === u || _ === i || _ === o || _ === f || _ === d || typeof _ == "object" && _ !== null && (_.$$typeof === v || _.$$typeof === b || _.$$typeof === s || _.$$typeof === l || _.$$typeof === p || _.$$typeof === m || _.$$typeof === E || _.$$typeof === M || _.$$typeof === g);
    }
    function w(_) {
      if (typeof _ == "object" && _ !== null) {
        var J = _.$$typeof;
        switch (J) {
          case t:
            var $ = _.type;
            switch ($) {
              case c:
              case u:
              case r:
              case i:
              case o:
              case f:
                return $;
              default:
                var re = $ && $.$$typeof;
                switch (re) {
                  case l:
                  case p:
                  case v:
                  case b:
                  case s:
                    return re;
                  default:
                    return J;
                }
            }
          case n:
            return J;
        }
      }
    }
    var h = c, C = u, P = l, B = s, j = t, O = p, N = r, R = v, L = b, V = n, D = i, I = o, F = f, Q = !1;
    function Z(_) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), S(_) || w(_) === c;
    }
    function S(_) {
      return w(_) === u;
    }
    function A(_) {
      return w(_) === l;
    }
    function U(_) {
      return w(_) === s;
    }
    function K(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === t;
    }
    function z(_) {
      return w(_) === p;
    }
    function H(_) {
      return w(_) === r;
    }
    function q(_) {
      return w(_) === v;
    }
    function G(_) {
      return w(_) === b;
    }
    function W(_) {
      return w(_) === n;
    }
    function X(_) {
      return w(_) === i;
    }
    function Y(_) {
      return w(_) === o;
    }
    function ne(_) {
      return w(_) === f;
    }
    ae.AsyncMode = h, ae.ConcurrentMode = C, ae.ContextConsumer = P, ae.ContextProvider = B, ae.Element = j, ae.ForwardRef = O, ae.Fragment = N, ae.Lazy = R, ae.Memo = L, ae.Portal = V, ae.Profiler = D, ae.StrictMode = I, ae.Suspense = F, ae.isAsyncMode = Z, ae.isConcurrentMode = S, ae.isContextConsumer = A, ae.isContextProvider = U, ae.isElement = K, ae.isForwardRef = z, ae.isFragment = H, ae.isLazy = q, ae.isMemo = G, ae.isPortal = W, ae.isProfiler = X, ae.isStrictMode = Y, ae.isSuspense = ne, ae.isValidElementType = y, ae.typeOf = w;
  }()), ae;
}
var $o;
function Vi() {
  return $o || ($o = 1, process.env.NODE_ENV === "production" ? On.exports = El() : On.exports = Tl()), On.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var sr, Mo;
function kl() {
  if (Mo)
    return sr;
  Mo = 1;
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
      var c = Object.getOwnPropertyNames(s).map(function(p) {
        return s[p];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(p) {
        u[p] = p;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return sr = o() ? Object.assign : function(i, s) {
    for (var l, c = r(i), u, p = 1; p < arguments.length; p++) {
      l = Object(arguments[p]);
      for (var f in l)
        t.call(l, f) && (c[f] = l[f]);
      if (e) {
        u = e(l);
        for (var d = 0; d < u.length; d++)
          n.call(l, u[d]) && (c[u[d]] = l[u[d]]);
      }
    }
    return c;
  }, sr;
}
var lr, Io;
function Fr() {
  if (Io)
    return lr;
  Io = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return lr = e, lr;
}
var cr, _o;
function zi() {
  return _o || (_o = 1, cr = Function.call.bind(Object.prototype.hasOwnProperty)), cr;
}
var ur, Ao;
function Ol() {
  if (Ao)
    return ur;
  Ao = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Fr(), n = {}, r = zi();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(i, s, l, c, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var p in i)
        if (r(i, p)) {
          var f;
          try {
            if (typeof i[p] != "function") {
              var d = Error(
                (c || "React class") + ": " + l + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            f = i[p](s, p, c, l, null, t);
          } catch (v) {
            f = v;
          }
          if (f && !(f instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + p + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in n)) {
            n[f.message] = !0;
            var b = u ? u() : "";
            e(
              "Failed " + l + " type: " + f.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, ur = o, ur;
}
var pr, Do;
function Sl() {
  if (Do)
    return pr;
  Do = 1;
  var e = Vi(), t = kl(), n = Fr(), r = zi(), o = Ol(), i = function() {
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
  return pr = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, p = "@@iterator";
    function f(S) {
      var A = S && (u && S[u] || S[p]);
      if (typeof A == "function")
        return A;
    }
    var d = "<<anonymous>>", b = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: M(),
      arrayOf: y,
      element: w(),
      elementType: h(),
      instanceOf: C,
      node: O(),
      objectOf: B,
      oneOf: P,
      oneOfType: j,
      shape: R,
      exact: L
    };
    function v(S, A) {
      return S === A ? S !== 0 || 1 / S === 1 / A : S !== S && A !== A;
    }
    function g(S, A) {
      this.message = S, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function m(S) {
      if (process.env.NODE_ENV !== "production")
        var A = {}, U = 0;
      function K(H, q, G, W, X, Y, ne) {
        if (W = W || d, Y = Y || G, ne !== n) {
          if (c) {
            var _ = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw _.name = "Invariant Violation", _;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var J = W + ":" + G;
            !A[J] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Y + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[J] = !0, U++);
          }
        }
        return q[G] == null ? H ? q[G] === null ? new g("The " + X + " `" + Y + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new g("The " + X + " `" + Y + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : S(q, G, W, X, Y);
      }
      var z = K.bind(null, !1);
      return z.isRequired = K.bind(null, !0), z;
    }
    function E(S) {
      function A(U, K, z, H, q, G) {
        var W = U[K], X = I(W);
        if (X !== S) {
          var Y = F(W);
          return new g(
            "Invalid " + H + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected ") + ("`" + S + "`."),
            { expectedType: S }
          );
        }
        return null;
      }
      return m(A);
    }
    function M() {
      return m(s);
    }
    function y(S) {
      function A(U, K, z, H, q) {
        if (typeof S != "function")
          return new g("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var G = U[K];
        if (!Array.isArray(G)) {
          var W = I(G);
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an array."));
        }
        for (var X = 0; X < G.length; X++) {
          var Y = S(G, X, z, H, q + "[" + X + "]", n);
          if (Y instanceof Error)
            return Y;
        }
        return null;
      }
      return m(A);
    }
    function w() {
      function S(A, U, K, z, H) {
        var q = A[U];
        if (!l(q)) {
          var G = I(q);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + G + "` supplied to `" + K + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(S);
    }
    function h() {
      function S(A, U, K, z, H) {
        var q = A[U];
        if (!e.isValidElementType(q)) {
          var G = I(q);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + G + "` supplied to `" + K + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(S);
    }
    function C(S) {
      function A(U, K, z, H, q) {
        if (!(U[K] instanceof S)) {
          var G = S.name || d, W = Z(U[K]);
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected ") + ("instance of `" + G + "`."));
        }
        return null;
      }
      return m(A);
    }
    function P(S) {
      if (!Array.isArray(S))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function A(U, K, z, H, q) {
        for (var G = U[K], W = 0; W < S.length; W++)
          if (v(G, S[W]))
            return null;
        var X = JSON.stringify(S, function(ne, _) {
          var J = F(_);
          return J === "symbol" ? String(_) : _;
        });
        return new g("Invalid " + H + " `" + q + "` of value `" + String(G) + "` " + ("supplied to `" + z + "`, expected one of " + X + "."));
      }
      return m(A);
    }
    function B(S) {
      function A(U, K, z, H, q) {
        if (typeof S != "function")
          return new g("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var G = U[K], W = I(G);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an object."));
        for (var X in G)
          if (r(G, X)) {
            var Y = S(G, X, z, H, q + "." + X, n);
            if (Y instanceof Error)
              return Y;
          }
        return null;
      }
      return m(A);
    }
    function j(S) {
      if (!Array.isArray(S))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var A = 0; A < S.length; A++) {
        var U = S[A];
        if (typeof U != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Q(U) + " at index " + A + "."
          ), s;
      }
      function K(z, H, q, G, W) {
        for (var X = [], Y = 0; Y < S.length; Y++) {
          var ne = S[Y], _ = ne(z, H, q, G, W, n);
          if (_ == null)
            return null;
          _.data && r(_.data, "expectedType") && X.push(_.data.expectedType);
        }
        var J = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new g("Invalid " + G + " `" + W + "` supplied to " + ("`" + q + "`" + J + "."));
      }
      return m(K);
    }
    function O() {
      function S(A, U, K, z, H) {
        return V(A[U]) ? null : new g("Invalid " + z + " `" + H + "` supplied to " + ("`" + K + "`, expected a ReactNode."));
      }
      return m(S);
    }
    function N(S, A, U, K, z) {
      return new g(
        (S || "React class") + ": " + A + " type `" + U + "." + K + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function R(S) {
      function A(U, K, z, H, q) {
        var G = U[K], W = I(G);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var X in S) {
          var Y = S[X];
          if (typeof Y != "function")
            return N(z, H, q, X, F(Y));
          var ne = Y(G, X, z, H, q + "." + X, n);
          if (ne)
            return ne;
        }
        return null;
      }
      return m(A);
    }
    function L(S) {
      function A(U, K, z, H, q) {
        var G = U[K], W = I(G);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        var X = t({}, U[K], S);
        for (var Y in X) {
          var ne = S[Y];
          if (r(S, Y) && typeof ne != "function")
            return N(z, H, q, Y, F(ne));
          if (!ne)
            return new g(
              "Invalid " + H + " `" + q + "` key `" + Y + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(U[K], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(S), null, "  ")
            );
          var _ = ne(G, Y, z, H, q + "." + Y, n);
          if (_)
            return _;
        }
        return null;
      }
      return m(A);
    }
    function V(S) {
      switch (typeof S) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !S;
        case "object":
          if (Array.isArray(S))
            return S.every(V);
          if (S === null || l(S))
            return !0;
          var A = f(S);
          if (A) {
            var U = A.call(S), K;
            if (A !== S.entries) {
              for (; !(K = U.next()).done; )
                if (!V(K.value))
                  return !1;
            } else
              for (; !(K = U.next()).done; ) {
                var z = K.value;
                if (z && !V(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function D(S, A) {
      return S === "symbol" ? !0 : A ? A["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && A instanceof Symbol : !1;
    }
    function I(S) {
      var A = typeof S;
      return Array.isArray(S) ? "array" : S instanceof RegExp ? "object" : D(A, S) ? "symbol" : A;
    }
    function F(S) {
      if (typeof S > "u" || S === null)
        return "" + S;
      var A = I(S);
      if (A === "object") {
        if (S instanceof Date)
          return "date";
        if (S instanceof RegExp)
          return "regexp";
      }
      return A;
    }
    function Q(S) {
      var A = F(S);
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
    function Z(S) {
      return !S.constructor || !S.constructor.name ? d : S.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, pr;
}
var dr, jo;
function Cl() {
  if (jo)
    return dr;
  jo = 1;
  var e = Fr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, dr = function() {
    function r(s, l, c, u, p, f) {
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
  }, dr;
}
if (process.env.NODE_ENV !== "production") {
  var Pl = Vi(), Nl = !0;
  Tr.exports = Sl()(Pl.isElement, Nl);
} else
  Tr.exports = Cl()();
var Rl = Tr.exports;
const a = /* @__PURE__ */ wl(Rl);
function Vt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function dt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ui(e) {
  if (!dt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Ui(e[n]);
  }), t;
}
function Ye(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? k({}, e) : e;
  return dt(e) && dt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (dt(t[o]) && o in e && dt(e[o]) ? r[o] = Ye(e[o], t[o], n) : n.clone ? r[o] = dt(t[o]) ? Ui(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function $l(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Hi(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !$l(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Wi = Vt(a.element, Hi);
Wi.isRequired = Vt(a.element.isRequired, Hi);
const hn = Wi;
function Ml(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Il(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !Ml(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const _l = Vt(a.elementType, Il), Al = "exact-prop: ​";
function qi(e) {
  return process.env.NODE_ENV === "production" ? e : k({}, e, {
    [Al]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function It(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var kr = { exports: {} }, se = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bo;
function Dl() {
  if (Bo)
    return se;
  Bo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function g(m) {
    if (typeof m == "object" && m !== null) {
      var E = m.$$typeof;
      switch (E) {
        case e:
          switch (m = m.type, m) {
            case n:
            case o:
            case r:
            case u:
            case p:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case s:
                case c:
                case d:
                case f:
                case i:
                  return m;
                default:
                  return E;
              }
          }
        case t:
          return E;
      }
    }
  }
  return se.ContextConsumer = s, se.ContextProvider = i, se.Element = e, se.ForwardRef = c, se.Fragment = n, se.Lazy = d, se.Memo = f, se.Portal = t, se.Profiler = o, se.StrictMode = r, se.Suspense = u, se.SuspenseList = p, se.isAsyncMode = function() {
    return !1;
  }, se.isConcurrentMode = function() {
    return !1;
  }, se.isContextConsumer = function(m) {
    return g(m) === s;
  }, se.isContextProvider = function(m) {
    return g(m) === i;
  }, se.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, se.isForwardRef = function(m) {
    return g(m) === c;
  }, se.isFragment = function(m) {
    return g(m) === n;
  }, se.isLazy = function(m) {
    return g(m) === d;
  }, se.isMemo = function(m) {
    return g(m) === f;
  }, se.isPortal = function(m) {
    return g(m) === t;
  }, se.isProfiler = function(m) {
    return g(m) === o;
  }, se.isStrictMode = function(m) {
    return g(m) === r;
  }, se.isSuspense = function(m) {
    return g(m) === u;
  }, se.isSuspenseList = function(m) {
    return g(m) === p;
  }, se.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === n || m === o || m === r || m === u || m === p || m === b || typeof m == "object" && m !== null && (m.$$typeof === d || m.$$typeof === f || m.$$typeof === i || m.$$typeof === s || m.$$typeof === c || m.$$typeof === v || m.getModuleId !== void 0);
  }, se.typeOf = g, se;
}
var le = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lo;
function jl() {
  return Lo || (Lo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v = !1, g = !1, m = !1, E = !1, M = !1, y;
    y = Symbol.for("react.module.reference");
    function w($) {
      return !!(typeof $ == "string" || typeof $ == "function" || $ === n || $ === o || M || $ === r || $ === u || $ === p || E || $ === b || v || g || m || typeof $ == "object" && $ !== null && ($.$$typeof === d || $.$$typeof === f || $.$$typeof === i || $.$$typeof === s || $.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      $.$$typeof === y || $.getModuleId !== void 0));
    }
    function h($) {
      if (typeof $ == "object" && $ !== null) {
        var re = $.$$typeof;
        switch (re) {
          case e:
            var ve = $.type;
            switch (ve) {
              case n:
              case o:
              case r:
              case u:
              case p:
                return ve;
              default:
                var Oe = ve && ve.$$typeof;
                switch (Oe) {
                  case l:
                  case s:
                  case c:
                  case d:
                  case f:
                  case i:
                    return Oe;
                  default:
                    return re;
                }
            }
          case t:
            return re;
        }
      }
    }
    var C = s, P = i, B = e, j = c, O = n, N = d, R = f, L = t, V = o, D = r, I = u, F = p, Q = !1, Z = !1;
    function S($) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A($) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U($) {
      return h($) === s;
    }
    function K($) {
      return h($) === i;
    }
    function z($) {
      return typeof $ == "object" && $ !== null && $.$$typeof === e;
    }
    function H($) {
      return h($) === c;
    }
    function q($) {
      return h($) === n;
    }
    function G($) {
      return h($) === d;
    }
    function W($) {
      return h($) === f;
    }
    function X($) {
      return h($) === t;
    }
    function Y($) {
      return h($) === o;
    }
    function ne($) {
      return h($) === r;
    }
    function _($) {
      return h($) === u;
    }
    function J($) {
      return h($) === p;
    }
    le.ContextConsumer = C, le.ContextProvider = P, le.Element = B, le.ForwardRef = j, le.Fragment = O, le.Lazy = N, le.Memo = R, le.Portal = L, le.Profiler = V, le.StrictMode = D, le.Suspense = I, le.SuspenseList = F, le.isAsyncMode = S, le.isConcurrentMode = A, le.isContextConsumer = U, le.isContextProvider = K, le.isElement = z, le.isForwardRef = H, le.isFragment = q, le.isLazy = G, le.isMemo = W, le.isPortal = X, le.isProfiler = Y, le.isStrictMode = ne, le.isSuspense = _, le.isSuspenseList = J, le.isValidElementType = w, le.typeOf = h;
  }()), le;
}
process.env.NODE_ENV === "production" ? kr.exports = Dl() : kr.exports = jl();
var _n = kr.exports;
const Bl = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Ll(e) {
  const t = `${e}`.match(Bl);
  return t && t[1] || "";
}
function Gi(e, t = "") {
  return e.displayName || e.name || Ll(e) || t;
}
function Fo(e, t, n) {
  const r = Gi(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Fl(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Gi(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case _n.ForwardRef:
          return Fo(e, e.render, "ForwardRef");
        case _n.Memo:
          return Fo(e, e.type, "memo");
        default:
          return;
      }
  }
}
function Je(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Vl = a.oneOfType([a.func, a.object]), Vr = Vl;
function He(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : It(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Or(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Ki(e, t = 166) {
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
function zl(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Ul(e, t) {
  var n, r;
  return /* @__PURE__ */ x.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Te(e) {
  return e && e.ownerDocument || document;
}
function _t(e) {
  return Te(e).defaultView || window;
}
function Hl(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? k({}, t.propTypes) : null;
  return (o) => (i, s, l, c, u, ...p) => {
    const f = u || s, d = n == null ? void 0 : n[f];
    if (d) {
      const b = d(i, s, l, c, u, ...p);
      if (b)
        return b;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function An(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Wl = typeof window < "u" ? x.useLayoutEffect : x.useEffect, gt = Wl;
let Vo = 0;
function ql(e) {
  const [t, n] = x.useState(e), r = e || t;
  return x.useEffect(() => {
    t == null && (Vo += 1, n(`mui-${Vo}`));
  }, [t]), r;
}
const zo = x["useId".toString()];
function Xi(e) {
  if (zo !== void 0) {
    const t = zo();
    return e ?? t;
  }
  return ql(e);
}
function Gl(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function Yi({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = x.useRef(e !== void 0), [i, s] = x.useState(t), l = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    x.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: u
    } = x.useRef(t);
    x.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = x.useCallback((u) => {
    o || s(u);
  }, []);
  return [l, c];
}
function ln(e) {
  const t = x.useRef(e);
  return gt(() => {
    t.current = e;
  }), x.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Le(...e) {
  return x.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      An(n, t);
    });
  }, e);
}
const Uo = {};
function Kl(e, t) {
  const n = x.useRef(Uo);
  return n.current === Uo && (n.current = e(t)), n;
}
const Xl = [];
function Yl(e) {
  x.useEffect(e, Xl);
}
class mn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new mn();
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
function Qt() {
  const e = Kl(mn.create).current;
  return Yl(e.disposeEffect), e;
}
let Hn = !0, Sr = !1;
const Jl = new mn(), Zl = {
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
function Ql(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Zl[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function ec(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Hn = !0);
}
function fr() {
  Hn = !1;
}
function tc() {
  this.visibilityState === "hidden" && Sr && (Hn = !0);
}
function nc(e) {
  e.addEventListener("keydown", ec, !0), e.addEventListener("mousedown", fr, !0), e.addEventListener("pointerdown", fr, !0), e.addEventListener("touchstart", fr, !0), e.addEventListener("visibilitychange", tc, !0);
}
function rc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Hn || Ql(t);
}
function Ji() {
  const e = x.useCallback((o) => {
    o != null && nc(o.ownerDocument);
  }, []), t = x.useRef(!1);
  function n() {
    return t.current ? (Sr = !0, Jl.start(100, () => {
      Sr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return rc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Zi(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function oc(e) {
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
function ic(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const ac = Number.isInteger || ic;
function Qi(e, t, n, r) {
  const o = e[t];
  if (o == null || !ac(o)) {
    const i = oc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function ea(e, t, ...n) {
  return e[t] === void 0 ? null : Qi(e, t, ...n);
}
function Cr() {
  return null;
}
ea.isRequired = Qi;
Cr.isRequired = Cr;
const ta = process.env.NODE_ENV === "production" ? Cr : ea;
function na(e, t) {
  const n = k({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = k({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = k({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = na(o[s], i[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function et(e, t, n = void 0) {
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
const Ho = (e) => e, sc = () => {
  let e = Ho;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ho;
    }
  };
}, lc = sc(), ra = lc, oa = {
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
function qe(e, t, n = "Mui") {
  const r = oa[t];
  return r ? `${n}-${r}` : `${ra.generate(e)}-${t}`;
}
function it(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = qe(e, o, n);
  }), r;
}
function cc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function ia(e) {
  return typeof e == "string";
}
function en(e, t, n) {
  return e === void 0 || ia(e) ? t : k({}, t, {
    ownerState: k({}, t.ownerState, n)
  });
}
const uc = {
  disableDefaultClasses: !1
}, pc = /* @__PURE__ */ x.createContext(uc);
function dc(e) {
  const {
    disableDefaultClasses: t
  } = x.useContext(pc);
  return (n) => t ? "" : e(n);
}
function aa(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function fc(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Wo(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function hc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = Ee(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = k({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = k({}, n, o, r);
    return b.length > 0 && (g.className = b), Object.keys(v).length > 0 && (g.style = v), {
      props: g,
      internalRef: void 0
    };
  }
  const s = aa(k({}, o, r)), l = Wo(r), c = Wo(o), u = t(s), p = Ee(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = k({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), d = k({}, u, n, c, l);
  return p.length > 0 && (d.className = p), Object.keys(f).length > 0 && (d.style = f), {
    props: d,
    internalRef: u.ref
  };
}
const mc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function bt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = ue(e, mc), l = i ? {} : fc(r, o), {
    props: c,
    internalRef: u
  } = hc(k({}, s, {
    externalSlotProps: l
  })), p = Le(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return en(n, k({}, c, {
    ref: p
  }), o);
}
const sa = "base";
function gc(e) {
  return `${sa}--${e}`;
}
function bc(e, t) {
  return `${sa}-${e}-${t}`;
}
function la(e, t) {
  const n = oa[t];
  return n ? gc(n) : bc(e, t);
}
function vc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = la(e, r);
  }), n;
}
const yc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function wc(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function xc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Ec(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || xc(e));
}
function Tc(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(yc)).forEach((r, o) => {
    const i = wc(r);
    i === -1 || !Ec(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function kc() {
  return !0;
}
function Dn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Tc,
    isEnabled: s = kc,
    open: l
  } = e, c = x.useRef(!1), u = x.useRef(null), p = x.useRef(null), f = x.useRef(null), d = x.useRef(null), b = x.useRef(!1), v = x.useRef(null), g = Le(t.ref, v), m = x.useRef(null);
  x.useEffect(() => {
    !l || !v.current || (b.current = !n);
  }, [n, l]), x.useEffect(() => {
    if (!l || !v.current)
      return;
    const y = Te(v.current);
    return v.current.contains(y.activeElement) || (v.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), v.current.setAttribute("tabIndex", "-1")), b.current && v.current.focus()), () => {
      o || (f.current && f.current.focus && (c.current = !0, f.current.focus()), f.current = null);
    };
  }, [l]), x.useEffect(() => {
    if (!l || !v.current)
      return;
    const y = Te(v.current), w = (P) => {
      m.current = P, !(r || !s() || P.key !== "Tab") && y.activeElement === v.current && P.shiftKey && (c.current = !0, p.current && p.current.focus());
    }, h = () => {
      const P = v.current;
      if (P === null)
        return;
      if (!y.hasFocus() || !s() || c.current) {
        c.current = !1;
        return;
      }
      if (P.contains(y.activeElement) || r && y.activeElement !== u.current && y.activeElement !== p.current)
        return;
      if (y.activeElement !== d.current)
        d.current = null;
      else if (d.current !== null)
        return;
      if (!b.current)
        return;
      let B = [];
      if ((y.activeElement === u.current || y.activeElement === p.current) && (B = i(v.current)), B.length > 0) {
        var j, O;
        const N = !!((j = m.current) != null && j.shiftKey && ((O = m.current) == null ? void 0 : O.key) === "Tab"), R = B[0], L = B[B.length - 1];
        typeof R != "string" && typeof L != "string" && (N ? L.focus() : R.focus());
      } else
        P.focus();
    };
    y.addEventListener("focusin", h), y.addEventListener("keydown", w, !0);
    const C = setInterval(() => {
      y.activeElement && y.activeElement.tagName === "BODY" && h();
    }, 50);
    return () => {
      clearInterval(C), y.removeEventListener("focusin", h), y.removeEventListener("keydown", w, !0);
    };
  }, [n, r, o, s, l, i]);
  const E = (y) => {
    f.current === null && (f.current = y.relatedTarget), b.current = !0, d.current = y.target;
    const w = t.props.onFocus;
    w && w(y);
  }, M = (y) => {
    f.current === null && (f.current = y.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ pe(x.Fragment, {
    children: [/* @__PURE__ */ T("div", {
      tabIndex: l ? 0 : -1,
      onFocus: M,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ x.cloneElement(t, {
      ref: g,
      onFocus: E
    }), /* @__PURE__ */ T("div", {
      tabIndex: l ? 0 : -1,
      onFocus: M,
      ref: p,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Dn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: hn,
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
process.env.NODE_ENV !== "production" && (Dn["propTypes"] = qi(Dn.propTypes));
function Oc(e) {
  return typeof e == "function" ? e() : e;
}
const cn = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, l] = x.useState(null), c = Le(/* @__PURE__ */ x.isValidElement(r) ? r.ref : null, n);
  if (gt(() => {
    i || l(Oc(o) || document.body);
  }, [o, i]), gt(() => {
    if (s && !i)
      return An(n, s), () => {
        An(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ x.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ x.cloneElement(r, u);
    }
    return /* @__PURE__ */ T(x.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ T(x.Fragment, {
    children: s && /* @__PURE__ */ Fs.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (cn.propTypes = {
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
  container: a.oneOfType([Je, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool
});
process.env.NODE_ENV !== "production" && (cn["propTypes"] = qi(cn.propTypes));
function Sc(e) {
  const t = Te(e);
  return t.body === e ? _t(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function rn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function qo(e) {
  return parseInt(_t(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Cc(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Go(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1, c = !Cc(s);
    l && c && rn(s, o);
  });
}
function hr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Pc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Sc(r)) {
      const s = Zi(Te(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${qo(r) + s}px`;
      const l = Te(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${qo(c) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Te(r).body;
    else {
      const s = r.parentElement, l = _t(r);
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
function Nc(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Rc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && rn(t.modalRef, !1);
    const o = Nc(n);
    Go(n, t.mount, t.modalRef, o, !0);
    const i = hr(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = hr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Pc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = hr(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && rn(t.modalRef, n), Go(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && rn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function $c(e) {
  return typeof e == "function" ? e() : e;
}
function Mc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Ic = new Rc();
function _c(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Ic,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: p,
    rootRef: f
  } = e, d = x.useRef({}), b = x.useRef(null), v = x.useRef(null), g = Le(v, f), [m, E] = x.useState(!p), M = Mc(c);
  let y = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (y = !1);
  const w = () => Te(b.current), h = () => (d.current.modalRef = v.current, d.current.mount = b.current, d.current), C = () => {
    o.mount(h(), {
      disableScrollLock: r
    }), v.current && (v.current.scrollTop = 0);
  }, P = ln(() => {
    const I = $c(t) || w().body;
    o.add(h(), I), v.current && C();
  }), B = x.useCallback(() => o.isTopModal(h()), [o]), j = ln((I) => {
    b.current = I, I && (p && B() ? C() : v.current && rn(v.current, y));
  }), O = x.useCallback(() => {
    o.remove(h(), y);
  }, [y, o]);
  x.useEffect(() => () => {
    O();
  }, [O]), x.useEffect(() => {
    p ? P() : (!M || !i) && O();
  }, [p, O, M, i, P]);
  const N = (I) => (F) => {
    var Q;
    (Q = I.onKeyDown) == null || Q.call(I, F), !(F.key !== "Escape" || F.which === 229 || // Wait until IME is settled.
    !B()) && (n || (F.stopPropagation(), u && u(F, "escapeKeyDown")));
  }, R = (I) => (F) => {
    var Q;
    (Q = I.onClick) == null || Q.call(I, F), F.target === F.currentTarget && u && u(F, "backdropClick");
  };
  return {
    getRootProps: (I = {}) => {
      const F = aa(e);
      delete F.onTransitionEnter, delete F.onTransitionExited;
      const Q = k({}, F, I);
      return k({
        role: "presentation"
      }, Q, {
        onKeyDown: N(Q),
        ref: g
      });
    },
    getBackdropProps: (I = {}) => {
      const F = I;
      return k({
        "aria-hidden": !0
      }, F, {
        onClick: R(F),
        open: p
      });
    },
    getTransitionProps: () => {
      const I = () => {
        E(!1), s && s();
      }, F = () => {
        E(!0), l && l(), i && O();
      };
      return {
        onEnter: Or(I, c == null ? void 0 : c.props.onEnter),
        onExited: Or(F, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: g,
    portalRef: j,
    isTopModal: B,
    exited: m,
    hasTransition: M
  };
}
var Pe = "top", Fe = "bottom", Ve = "right", Ne = "left", zr = "auto", gn = [Pe, Fe, Ve, Ne], At = "start", un = "end", Ac = "clippingParents", ca = "viewport", Xt = "popper", Dc = "reference", Ko = /* @__PURE__ */ gn.reduce(function(e, t) {
  return e.concat([t + "-" + At, t + "-" + un]);
}, []), ua = /* @__PURE__ */ [].concat(gn, [zr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + At, t + "-" + un]);
}, []), jc = "beforeRead", Bc = "read", Lc = "afterRead", Fc = "beforeMain", Vc = "main", zc = "afterMain", Uc = "beforeWrite", Hc = "write", Wc = "afterWrite", qc = [jc, Bc, Lc, Fc, Vc, zc, Uc, Hc, Wc];
function We(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function _e(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function vt(e) {
  var t = _e(e).Element;
  return e instanceof t || e instanceof Element;
}
function Be(e) {
  var t = _e(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ur(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = _e(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Gc(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Be(i) || !We(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
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
      var o = t.elements[r], i = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = s.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !Be(o) || !We(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Xc = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Gc,
  effect: Kc,
  requires: ["computeStyles"]
};
function Ue(e) {
  return e.split("-")[0];
}
var ht = Math.max, jn = Math.min, Dt = Math.round;
function Pr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function pa() {
  return !/^((?!chrome|android).)*safari/i.test(Pr());
}
function jt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Be(e) && (o = e.offsetWidth > 0 && Dt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Dt(r.height) / e.offsetHeight || 1);
  var s = vt(e) ? _e(e) : window, l = s.visualViewport, c = !pa() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, p = (r.top + (c && l ? l.offsetTop : 0)) / i, f = r.width / o, d = r.height / i;
  return {
    width: f,
    height: d,
    top: p,
    right: u + f,
    bottom: p + d,
    left: u,
    x: u,
    y: p
  };
}
function Hr(e) {
  var t = jt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function da(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Ur(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ze(e) {
  return _e(e).getComputedStyle(e);
}
function Yc(e) {
  return ["table", "td", "th"].indexOf(We(e)) >= 0;
}
function at(e) {
  return ((vt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Wn(e) {
  return We(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Ur(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    at(e)
  );
}
function Xo(e) {
  return !Be(e) || // https://github.com/popperjs/popper-core/issues/837
  Ze(e).position === "fixed" ? null : e.offsetParent;
}
function Jc(e) {
  var t = /firefox/i.test(Pr()), n = /Trident/i.test(Pr());
  if (n && Be(e)) {
    var r = Ze(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Wn(e);
  for (Ur(o) && (o = o.host); Be(o) && ["html", "body"].indexOf(We(o)) < 0; ) {
    var i = Ze(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function bn(e) {
  for (var t = _e(e), n = Xo(e); n && Yc(n) && Ze(n).position === "static"; )
    n = Xo(n);
  return n && (We(n) === "html" || We(n) === "body" && Ze(n).position === "static") ? t : n || Jc(e) || t;
}
function Wr(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function on(e, t, n) {
  return ht(e, jn(t, n));
}
function Zc(e, t, n) {
  var r = on(e, t, n);
  return r > n ? n : r;
}
function fa() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ha(e) {
  return Object.assign({}, fa(), e);
}
function ma(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Qc = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, ha(typeof t != "number" ? t : ma(t, gn));
};
function eu(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Ue(n.placement), c = Wr(l), u = [Ne, Ve].indexOf(l) >= 0, p = u ? "height" : "width";
  if (!(!i || !s)) {
    var f = Qc(o.padding, n), d = Hr(i), b = c === "y" ? Pe : Ne, v = c === "y" ? Fe : Ve, g = n.rects.reference[p] + n.rects.reference[c] - s[c] - n.rects.popper[p], m = s[c] - n.rects.reference[c], E = bn(i), M = E ? c === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, y = g / 2 - m / 2, w = f[b], h = M - d[p] - f[v], C = M / 2 - d[p] / 2 + y, P = on(w, C, h), B = c;
    n.modifiersData[r] = (t = {}, t[B] = P, t.centerOffset = P - C, t);
  }
}
function tu(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || da(t.elements.popper, o) && (t.elements.arrow = o));
}
const nu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: eu,
  effect: tu,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Bt(e) {
  return e.split("-")[1];
}
var ru = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function ou(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Dt(n * o) / o || 0,
    y: Dt(r * o) / o || 0
  };
}
function Yo(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, p = e.roundOffsets, f = e.isFixed, d = s.x, b = d === void 0 ? 0 : d, v = s.y, g = v === void 0 ? 0 : v, m = typeof p == "function" ? p({
    x: b,
    y: g
  }) : {
    x: b,
    y: g
  };
  b = m.x, g = m.y;
  var E = s.hasOwnProperty("x"), M = s.hasOwnProperty("y"), y = Ne, w = Pe, h = window;
  if (u) {
    var C = bn(n), P = "clientHeight", B = "clientWidth";
    if (C === _e(n) && (C = at(n), Ze(C).position !== "static" && l === "absolute" && (P = "scrollHeight", B = "scrollWidth")), C = C, o === Pe || (o === Ne || o === Ve) && i === un) {
      w = Fe;
      var j = f && C === h && h.visualViewport ? h.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        C[P]
      );
      g -= j - r.height, g *= c ? 1 : -1;
    }
    if (o === Ne || (o === Pe || o === Fe) && i === un) {
      y = Ve;
      var O = f && C === h && h.visualViewport ? h.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        C[B]
      );
      b -= O - r.width, b *= c ? 1 : -1;
    }
  }
  var N = Object.assign({
    position: l
  }, u && ru), R = p === !0 ? ou({
    x: b,
    y: g
  }, _e(n)) : {
    x: b,
    y: g
  };
  if (b = R.x, g = R.y, c) {
    var L;
    return Object.assign({}, N, (L = {}, L[w] = M ? "0" : "", L[y] = E ? "0" : "", L.transform = (h.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + g + "px)" : "translate3d(" + b + "px, " + g + "px, 0)", L));
  }
  return Object.assign({}, N, (t = {}, t[w] = M ? g + "px" : "", t[y] = E ? b + "px" : "", t.transform = "", t));
}
function iu(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Ue(t.placement),
    variation: Bt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Yo(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Yo(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const au = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: iu,
  data: {}
};
var Sn = {
  passive: !0
};
function su(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = _e(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(p) {
    p.addEventListener("scroll", n.update, Sn);
  }), l && c.addEventListener("resize", n.update, Sn), function() {
    i && u.forEach(function(p) {
      p.removeEventListener("scroll", n.update, Sn);
    }), l && c.removeEventListener("resize", n.update, Sn);
  };
}
const lu = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: su,
  data: {}
};
var cu = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Rn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return cu[t];
  });
}
var uu = {
  start: "end",
  end: "start"
};
function Jo(e) {
  return e.replace(/start|end/g, function(t) {
    return uu[t];
  });
}
function qr(e) {
  var t = _e(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Gr(e) {
  return jt(at(e)).left + qr(e).scrollLeft;
}
function pu(e, t) {
  var n = _e(e), r = at(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    var u = pa();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: l + Gr(e),
    y: c
  };
}
function du(e) {
  var t, n = at(e), r = qr(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = ht(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = ht(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Gr(e), c = -r.scrollTop;
  return Ze(o || n).direction === "rtl" && (l += ht(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function Kr(e) {
  var t = Ze(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function ga(e) {
  return ["html", "body", "#document"].indexOf(We(e)) >= 0 ? e.ownerDocument.body : Be(e) && Kr(e) ? e : ga(Wn(e));
}
function an(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = ga(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = _e(r), s = o ? [i].concat(i.visualViewport || [], Kr(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(an(Wn(s)))
  );
}
function Nr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function fu(e, t) {
  var n = jt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Zo(e, t, n) {
  return t === ca ? Nr(pu(e, n)) : vt(t) ? fu(t, n) : Nr(du(at(e)));
}
function hu(e) {
  var t = an(Wn(e)), n = ["absolute", "fixed"].indexOf(Ze(e).position) >= 0, r = n && Be(e) ? bn(e) : e;
  return vt(r) ? t.filter(function(o) {
    return vt(o) && da(o, r) && We(o) !== "body";
  }) : [];
}
function mu(e, t, n, r) {
  var o = t === "clippingParents" ? hu(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], l = i.reduce(function(c, u) {
    var p = Zo(e, u, r);
    return c.top = ht(p.top, c.top), c.right = jn(p.right, c.right), c.bottom = jn(p.bottom, c.bottom), c.left = ht(p.left, c.left), c;
  }, Zo(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function ba(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ue(r) : null, i = r ? Bt(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Pe:
      c = {
        x: s,
        y: t.y - n.height
      };
      break;
    case Fe:
      c = {
        x: s,
        y: t.y + t.height
      };
      break;
    case Ve:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Ne:
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
  var u = o ? Wr(o) : null;
  if (u != null) {
    var p = u === "y" ? "height" : "width";
    switch (i) {
      case At:
        c[u] = c[u] - (t[p] / 2 - n[p] / 2);
        break;
      case un:
        c[u] = c[u] + (t[p] / 2 - n[p] / 2);
        break;
    }
  }
  return c;
}
function pn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? Ac : l, u = n.rootBoundary, p = u === void 0 ? ca : u, f = n.elementContext, d = f === void 0 ? Xt : f, b = n.altBoundary, v = b === void 0 ? !1 : b, g = n.padding, m = g === void 0 ? 0 : g, E = ha(typeof m != "number" ? m : ma(m, gn)), M = d === Xt ? Dc : Xt, y = e.rects.popper, w = e.elements[v ? M : d], h = mu(vt(w) ? w : w.contextElement || at(e.elements.popper), c, p, s), C = jt(e.elements.reference), P = ba({
    reference: C,
    element: y,
    strategy: "absolute",
    placement: o
  }), B = Nr(Object.assign({}, y, P)), j = d === Xt ? B : C, O = {
    top: h.top - j.top + E.top,
    bottom: j.bottom - h.bottom + E.bottom,
    left: h.left - j.left + E.left,
    right: j.right - h.right + E.right
  }, N = e.modifiersData.offset;
  if (d === Xt && N) {
    var R = N[o];
    Object.keys(O).forEach(function(L) {
      var V = [Ve, Fe].indexOf(L) >= 0 ? 1 : -1, D = [Pe, Fe].indexOf(L) >= 0 ? "y" : "x";
      O[L] += R[D] * V;
    });
  }
  return O;
}
function gu(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? ua : c, p = Bt(r), f = p ? l ? Ko : Ko.filter(function(v) {
    return Bt(v) === p;
  }) : gn, d = f.filter(function(v) {
    return u.indexOf(v) >= 0;
  });
  d.length === 0 && (d = f);
  var b = d.reduce(function(v, g) {
    return v[g] = pn(e, {
      placement: g,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[Ue(g)], v;
  }, {});
  return Object.keys(b).sort(function(v, g) {
    return b[v] - b[g];
  });
}
function bu(e) {
  if (Ue(e) === zr)
    return [];
  var t = Rn(e);
  return [Jo(e), t, Jo(t)];
}
function vu(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, u = n.padding, p = n.boundary, f = n.rootBoundary, d = n.altBoundary, b = n.flipVariations, v = b === void 0 ? !0 : b, g = n.allowedAutoPlacements, m = t.options.placement, E = Ue(m), M = E === m, y = c || (M || !v ? [Rn(m)] : bu(m)), w = [m].concat(y).reduce(function(z, H) {
      return z.concat(Ue(H) === zr ? gu(t, {
        placement: H,
        boundary: p,
        rootBoundary: f,
        padding: u,
        flipVariations: v,
        allowedAutoPlacements: g
      }) : H);
    }, []), h = t.rects.reference, C = t.rects.popper, P = /* @__PURE__ */ new Map(), B = !0, j = w[0], O = 0; O < w.length; O++) {
      var N = w[O], R = Ue(N), L = Bt(N) === At, V = [Pe, Fe].indexOf(R) >= 0, D = V ? "width" : "height", I = pn(t, {
        placement: N,
        boundary: p,
        rootBoundary: f,
        altBoundary: d,
        padding: u
      }), F = V ? L ? Ve : Ne : L ? Fe : Pe;
      h[D] > C[D] && (F = Rn(F));
      var Q = Rn(F), Z = [];
      if (i && Z.push(I[R] <= 0), l && Z.push(I[F] <= 0, I[Q] <= 0), Z.every(function(z) {
        return z;
      })) {
        j = N, B = !1;
        break;
      }
      P.set(N, Z);
    }
    if (B)
      for (var S = v ? 3 : 1, A = function(H) {
        var q = w.find(function(G) {
          var W = P.get(G);
          if (W)
            return W.slice(0, H).every(function(X) {
              return X;
            });
        });
        if (q)
          return j = q, "break";
      }, U = S; U > 0; U--) {
        var K = A(U);
        if (K === "break")
          break;
      }
    t.placement !== j && (t.modifiersData[r]._skip = !0, t.placement = j, t.reset = !0);
  }
}
const yu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: vu,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Qo(e, t, n) {
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
function ei(e) {
  return [Pe, Ve, Fe, Ne].some(function(t) {
    return e[t] >= 0;
  });
}
function wu(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = pn(t, {
    elementContext: "reference"
  }), l = pn(t, {
    altBoundary: !0
  }), c = Qo(s, r), u = Qo(l, o, i), p = ei(c), f = ei(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: p,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": f
  });
}
const xu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: wu
};
function Eu(e, t, n) {
  var r = Ue(e), o = [Ne, Pe].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], l = i[1];
  return s = s || 0, l = (l || 0) * o, [Ne, Ve].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Tu(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = ua.reduce(function(p, f) {
    return p[f] = Eu(f, t.rects, i), p;
  }, {}), l = s[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = s;
}
const ku = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Tu
};
function Ou(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = ba({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Su = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Ou,
  data: {}
};
function Cu(e) {
  return e === "x" ? "y" : "x";
}
function Pu(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, u = n.rootBoundary, p = n.altBoundary, f = n.padding, d = n.tether, b = d === void 0 ? !0 : d, v = n.tetherOffset, g = v === void 0 ? 0 : v, m = pn(t, {
    boundary: c,
    rootBoundary: u,
    padding: f,
    altBoundary: p
  }), E = Ue(t.placement), M = Bt(t.placement), y = !M, w = Wr(E), h = Cu(w), C = t.modifiersData.popperOffsets, P = t.rects.reference, B = t.rects.popper, j = typeof g == "function" ? g(Object.assign({}, t.rects, {
    placement: t.placement
  })) : g, O = typeof j == "number" ? {
    mainAxis: j,
    altAxis: j
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, j), N = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (C) {
    if (i) {
      var L, V = w === "y" ? Pe : Ne, D = w === "y" ? Fe : Ve, I = w === "y" ? "height" : "width", F = C[w], Q = F + m[V], Z = F - m[D], S = b ? -B[I] / 2 : 0, A = M === At ? P[I] : B[I], U = M === At ? -B[I] : -P[I], K = t.elements.arrow, z = b && K ? Hr(K) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : fa(), q = H[V], G = H[D], W = on(0, P[I], z[I]), X = y ? P[I] / 2 - S - W - q - O.mainAxis : A - W - q - O.mainAxis, Y = y ? -P[I] / 2 + S + W + G + O.mainAxis : U + W + G + O.mainAxis, ne = t.elements.arrow && bn(t.elements.arrow), _ = ne ? w === "y" ? ne.clientTop || 0 : ne.clientLeft || 0 : 0, J = (L = N == null ? void 0 : N[w]) != null ? L : 0, $ = F + X - J - _, re = F + Y - J, ve = on(b ? jn(Q, $) : Q, F, b ? ht(Z, re) : Z);
      C[w] = ve, R[w] = ve - F;
    }
    if (l) {
      var Oe, me = w === "x" ? Pe : Ne, lt = w === "x" ? Fe : Ve, Se = C[h], Ge = h === "y" ? "height" : "width", Re = Se + m[me], Ke = Se - m[lt], we = [Pe, Ne].indexOf(E) !== -1, wt = (Oe = N == null ? void 0 : N[h]) != null ? Oe : 0, ct = we ? Re : Se - P[Ge] - B[Ge] - wt + O.altAxis, zt = we ? Se + P[Ge] + B[Ge] - wt - O.altAxis : Ke, xn = b && we ? Zc(ct, Se, zt) : on(b ? ct : Re, Se, b ? zt : Ke);
      C[h] = xn, R[h] = xn - Se;
    }
    t.modifiersData[r] = R;
  }
}
const Nu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Pu,
  requiresIfExists: ["offset"]
};
function Ru(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function $u(e) {
  return e === _e(e) || !Be(e) ? qr(e) : Ru(e);
}
function Mu(e) {
  var t = e.getBoundingClientRect(), n = Dt(t.width) / e.offsetWidth || 1, r = Dt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Iu(e, t, n) {
  n === void 0 && (n = !1);
  var r = Be(t), o = Be(t) && Mu(t), i = at(t), s = jt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((We(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Kr(i)) && (l = $u(t)), Be(t) ? (c = jt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = Gr(i))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function _u(e) {
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
function Au(e) {
  var t = _u(e);
  return qc.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Du(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function ju(e) {
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
var ti = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ni() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Bu(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? ti : o;
  return function(l, c, u) {
    u === void 0 && (u = i);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ti, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], d = !1, b = {
      state: p,
      setOptions: function(E) {
        var M = typeof E == "function" ? E(p.options) : E;
        g(), p.options = Object.assign({}, i, p.options, M), p.scrollParents = {
          reference: vt(l) ? an(l) : l.contextElement ? an(l.contextElement) : [],
          popper: an(c)
        };
        var y = Au(ju([].concat(r, p.options.modifiers)));
        return p.orderedModifiers = y.filter(function(w) {
          return w.enabled;
        }), v(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!d) {
          var E = p.elements, M = E.reference, y = E.popper;
          if (ni(M, y)) {
            p.rects = {
              reference: Iu(M, bn(y), p.options.strategy === "fixed"),
              popper: Hr(y)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(O) {
              return p.modifiersData[O.name] = Object.assign({}, O.data);
            });
            for (var w = 0; w < p.orderedModifiers.length; w++) {
              if (p.reset === !0) {
                p.reset = !1, w = -1;
                continue;
              }
              var h = p.orderedModifiers[w], C = h.fn, P = h.options, B = P === void 0 ? {} : P, j = h.name;
              typeof C == "function" && (p = C({
                state: p,
                options: B,
                name: j,
                instance: b
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Du(function() {
        return new Promise(function(m) {
          b.forceUpdate(), m(p);
        });
      }),
      destroy: function() {
        g(), d = !0;
      }
    };
    if (!ni(l, c))
      return b;
    b.setOptions(u).then(function(m) {
      !d && u.onFirstUpdate && u.onFirstUpdate(m);
    });
    function v() {
      p.orderedModifiers.forEach(function(m) {
        var E = m.name, M = m.options, y = M === void 0 ? {} : M, w = m.effect;
        if (typeof w == "function") {
          var h = w({
            state: p,
            name: E,
            instance: b,
            options: y
          }), C = function() {
          };
          f.push(h || C);
        }
      });
    }
    function g() {
      f.forEach(function(m) {
        return m();
      }), f = [];
    }
    return b;
  };
}
var Lu = [lu, Su, au, Xc, ku, yu, Nu, nu, xu], Fu = /* @__PURE__ */ Bu({
  defaultModifiers: Lu
});
const va = "Popper";
function Vu(e) {
  return la(va, e);
}
vc(va, ["root"]);
const zu = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Uu = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Hu(e, t) {
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
function Bn(e) {
  return typeof e == "function" ? e() : e;
}
function qn(e) {
  return e.nodeType !== void 0;
}
function Wu(e) {
  return !qn(e);
}
const qu = () => et({
  root: ["root"]
}, dc(Vu)), Gu = {}, Ku = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: p,
    popperOptions: f,
    popperRef: d,
    slotProps: b = {},
    slots: v = {},
    TransitionProps: g
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, m = ue(t, zu), E = x.useRef(null), M = Le(E, n), y = x.useRef(null), w = Le(y, d), h = x.useRef(w);
  gt(() => {
    h.current = w;
  }, [w]), x.useImperativeHandle(d, () => y.current, []);
  const C = Hu(p, s), [P, B] = x.useState(C), [j, O] = x.useState(Bn(o));
  x.useEffect(() => {
    y.current && y.current.forceUpdate();
  }), x.useEffect(() => {
    o && O(Bn(o));
  }, [o]), gt(() => {
    if (!j || !u)
      return;
    const D = (Q) => {
      B(Q.placement);
    };
    if (process.env.NODE_ENV !== "production" && j && qn(j) && j.nodeType === 1) {
      const Q = j.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Q.top === 0 && Q.left === 0 && Q.right === 0 && Q.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let I = [{
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
    c != null && (I = I.concat(c)), f && f.modifiers != null && (I = I.concat(f.modifiers));
    const F = Fu(j, E.current, k({
      placement: C
    }, f, {
      modifiers: I
    }));
    return h.current(F), () => {
      F.destroy(), h.current(null);
    };
  }, [j, l, c, u, f, C]);
  const N = {
    placement: P
  };
  g !== null && (N.TransitionProps = g);
  const R = qu(), L = (r = v.root) != null ? r : "div", V = bt({
    elementType: L,
    externalSlotProps: b.root,
    externalForwardedProps: m,
    additionalProps: {
      role: "tooltip",
      ref: M
    },
    ownerState: t,
    className: R.root
  });
  return /* @__PURE__ */ T(L, k({}, V, {
    children: typeof i == "function" ? i(N) : i
  }));
}), ya = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: p,
    placement: f = "bottom",
    popperOptions: d = Gu,
    popperRef: b,
    style: v,
    transition: g = !1,
    slotProps: m = {},
    slots: E = {}
  } = t, M = ue(t, Uu), [y, w] = x.useState(!0), h = () => {
    w(!1);
  }, C = () => {
    w(!0);
  };
  if (!c && !p && (!g || y))
    return null;
  let P;
  if (i)
    P = i;
  else if (r) {
    const O = Bn(r);
    P = O && qn(O) ? Te(O).body : Te(null).body;
  }
  const B = !p && c && (!g || y) ? "none" : void 0, j = g ? {
    in: p,
    onEnter: h,
    onExited: C
  } : void 0;
  return /* @__PURE__ */ T(cn, {
    disablePortal: l,
    container: P,
    children: /* @__PURE__ */ T(Ku, k({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: g ? !y : p,
      placement: f,
      popperOptions: d,
      popperRef: b,
      slotProps: m,
      slots: E
    }, M, {
      style: k({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: B
      }, v),
      TransitionProps: j,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (ya.propTypes = {
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
  anchorEl: Vt(a.oneOfType([Je, a.object, a.func]), (e) => {
    if (e.open) {
      const t = Bn(e.anchorEl);
      if (t && qn(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Wu(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: a.oneOfType([Je, a.func]),
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
  popperRef: Vr,
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
const Xu = ["values", "unit", "step"], Yu = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => k({}, n, {
    [r.key]: r.val
  }), {});
};
function Ju(e) {
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
  } = e, o = ue(e, Xu), i = Yu(t), s = Object.keys(i);
  function l(d) {
    return `@media (min-width:${typeof t[d] == "number" ? t[d] : d}${n})`;
  }
  function c(d) {
    return `@media (max-width:${(typeof t[d] == "number" ? t[d] : d) - r / 100}${n})`;
  }
  function u(d, b) {
    const v = s.indexOf(b);
    return `@media (min-width:${typeof t[d] == "number" ? t[d] : d}${n}) and (max-width:${(v !== -1 && typeof t[s[v]] == "number" ? t[s[v]] : b) - r / 100}${n})`;
  }
  function p(d) {
    return s.indexOf(d) + 1 < s.length ? u(d, s[s.indexOf(d) + 1]) : l(d);
  }
  function f(d) {
    const b = s.indexOf(d);
    return b === 0 ? l(s[1]) : b === s.length - 1 ? c(s[b]) : u(d, s[s.indexOf(d) + 1]).replace("@media", "@media not all and");
  }
  return k({
    keys: s,
    values: i,
    up: l,
    down: c,
    between: u,
    only: p,
    not: f,
    unit: n
  }, o);
}
const Zu = {
  borderRadius: 4
}, Qu = Zu, ep = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, st = ep;
function sn(e, t) {
  return t ? Ye(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Xr = {
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
}, ri = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Xr[e]}px)`
};
function Qe(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || ri;
    return t.reduce((s, l, c) => (s[i.up(i.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || ri;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || Xr).indexOf(l) !== -1) {
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
function tp(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function np(e, t) {
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
function Ln(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = Gn(e, n) || r, t && (o = t(o, r, e)), o;
}
function be(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const l = s[t], c = s.theme, u = Gn(c, r) || {};
    return Qe(s, l, (f) => {
      let d = Ln(u, o, f);
      return f === d && typeof f == "string" && (d = Ln(u, o, `${t}${f === "default" ? "" : He(f)}`, f)), n === !1 ? d : {
        [n]: d
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: st
  } : {}, i.filterProps = [t], i;
}
function rp(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const op = {
  m: "margin",
  p: "padding"
}, ip = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, oi = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, ap = rp((e) => {
  if (e.length > 2)
    if (oi[e])
      e = oi[e];
    else
      return [e];
  const [t, n] = e.split(""), r = op[t], o = ip[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Kn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Xn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], sp = [...Kn, ...Xn];
function vn(e, t, n, r) {
  var o;
  const i = (o = Gn(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function wa(e) {
  return vn(e, "spacing", 8, "spacing");
}
function yn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function lp(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = yn(t, n), r), {});
}
function cp(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = ap(n), i = lp(o, r), s = e[n];
  return Qe(e, s, i);
}
function xa(e, t) {
  const n = wa(e.theme);
  return Object.keys(e).map((r) => cp(e, t, r, n)).reduce(sn, {});
}
function fe(e) {
  return xa(e, Kn);
}
fe.propTypes = process.env.NODE_ENV !== "production" ? Kn.reduce((e, t) => (e[t] = st, e), {}) : {};
fe.filterProps = Kn;
function he(e) {
  return xa(e, Xn);
}
he.propTypes = process.env.NODE_ENV !== "production" ? Xn.reduce((e, t) => (e[t] = st, e), {}) : {};
he.filterProps = Xn;
process.env.NODE_ENV !== "production" && sp.reduce((e, t) => (e[t] = st, e), {});
function up(e = 8) {
  if (e.mui)
    return e;
  const t = wa({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function Yn(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? sn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function De(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function ze(e, t) {
  return be({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const pp = ze("border", De), dp = ze("borderTop", De), fp = ze("borderRight", De), hp = ze("borderBottom", De), mp = ze("borderLeft", De), gp = ze("borderColor"), bp = ze("borderTopColor"), vp = ze("borderRightColor"), yp = ze("borderBottomColor"), wp = ze("borderLeftColor"), xp = ze("outline", De), Ep = ze("outlineColor"), Jn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = vn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: yn(t, r)
    });
    return Qe(e, e.borderRadius, n);
  }
  return null;
};
Jn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: st
} : {};
Jn.filterProps = ["borderRadius"];
Yn(pp, dp, fp, hp, mp, gp, bp, vp, yp, wp, Jn, xp, Ep);
const Zn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = vn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: yn(t, r)
    });
    return Qe(e, e.gap, n);
  }
  return null;
};
Zn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: st
} : {};
Zn.filterProps = ["gap"];
const Qn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = vn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: yn(t, r)
    });
    return Qe(e, e.columnGap, n);
  }
  return null;
};
Qn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: st
} : {};
Qn.filterProps = ["columnGap"];
const er = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = vn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: yn(t, r)
    });
    return Qe(e, e.rowGap, n);
  }
  return null;
};
er.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: st
} : {};
er.filterProps = ["rowGap"];
const Tp = be({
  prop: "gridColumn"
}), kp = be({
  prop: "gridRow"
}), Op = be({
  prop: "gridAutoFlow"
}), Sp = be({
  prop: "gridAutoColumns"
}), Cp = be({
  prop: "gridAutoRows"
}), Pp = be({
  prop: "gridTemplateColumns"
}), Np = be({
  prop: "gridTemplateRows"
}), Rp = be({
  prop: "gridTemplateAreas"
}), $p = be({
  prop: "gridArea"
});
Yn(Zn, Qn, er, Tp, kp, Op, Sp, Cp, Pp, Np, Rp, $p);
function Mt(e, t) {
  return t === "grey" ? t : e;
}
const Mp = be({
  prop: "color",
  themeKey: "palette",
  transform: Mt
}), Ip = be({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Mt
}), _p = be({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Mt
});
Yn(Mp, Ip, _p);
function Ie(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Ap = be({
  prop: "width",
  transform: Ie
}), Yr = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Xr[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Ie(n)
      };
    };
    return Qe(e, e.maxWidth, t);
  }
  return null;
};
Yr.filterProps = ["maxWidth"];
const Dp = be({
  prop: "minWidth",
  transform: Ie
}), jp = be({
  prop: "height",
  transform: Ie
}), Bp = be({
  prop: "maxHeight",
  transform: Ie
}), Lp = be({
  prop: "minHeight",
  transform: Ie
});
be({
  prop: "size",
  cssProperty: "width",
  transform: Ie
});
be({
  prop: "size",
  cssProperty: "height",
  transform: Ie
});
const Fp = be({
  prop: "boxSizing"
});
Yn(Ap, Yr, Dp, jp, Bp, Lp, Fp);
const Vp = {
  // borders
  border: {
    themeKey: "borders",
    transform: De
  },
  borderTop: {
    themeKey: "borders",
    transform: De
  },
  borderRight: {
    themeKey: "borders",
    transform: De
  },
  borderBottom: {
    themeKey: "borders",
    transform: De
  },
  borderLeft: {
    themeKey: "borders",
    transform: De
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
    transform: De
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Jn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Mt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Mt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Mt
  },
  // spacing
  p: {
    style: he
  },
  pt: {
    style: he
  },
  pr: {
    style: he
  },
  pb: {
    style: he
  },
  pl: {
    style: he
  },
  px: {
    style: he
  },
  py: {
    style: he
  },
  padding: {
    style: he
  },
  paddingTop: {
    style: he
  },
  paddingRight: {
    style: he
  },
  paddingBottom: {
    style: he
  },
  paddingLeft: {
    style: he
  },
  paddingX: {
    style: he
  },
  paddingY: {
    style: he
  },
  paddingInline: {
    style: he
  },
  paddingInlineStart: {
    style: he
  },
  paddingInlineEnd: {
    style: he
  },
  paddingBlock: {
    style: he
  },
  paddingBlockStart: {
    style: he
  },
  paddingBlockEnd: {
    style: he
  },
  m: {
    style: fe
  },
  mt: {
    style: fe
  },
  mr: {
    style: fe
  },
  mb: {
    style: fe
  },
  ml: {
    style: fe
  },
  mx: {
    style: fe
  },
  my: {
    style: fe
  },
  margin: {
    style: fe
  },
  marginTop: {
    style: fe
  },
  marginRight: {
    style: fe
  },
  marginBottom: {
    style: fe
  },
  marginLeft: {
    style: fe
  },
  marginX: {
    style: fe
  },
  marginY: {
    style: fe
  },
  marginInline: {
    style: fe
  },
  marginInlineStart: {
    style: fe
  },
  marginInlineEnd: {
    style: fe
  },
  marginBlock: {
    style: fe
  },
  marginBlockStart: {
    style: fe
  },
  marginBlockEnd: {
    style: fe
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
    style: Zn
  },
  rowGap: {
    style: er
  },
  columnGap: {
    style: Qn
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
    transform: Ie
  },
  maxWidth: {
    style: Yr
  },
  minWidth: {
    transform: Ie
  },
  height: {
    transform: Ie
  },
  maxHeight: {
    transform: Ie
  },
  minHeight: {
    transform: Ie
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
}, Jr = Vp;
function zp(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Up(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Hp() {
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
      themeKey: u,
      transform: p,
      style: f
    } = l;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const d = Gn(o, u) || {};
    return f ? f(s) : Qe(s, r, (v) => {
      let g = Ln(d, p, v);
      return v === g && typeof v == "string" && (g = Ln(d, p, `${n}${v === "default" ? "" : He(v)}`, v)), c === !1 ? g : {
        [c]: g
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
    const s = (r = i.unstable_sxConfig) != null ? r : Jr;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const p = tp(i.breakpoints), f = Object.keys(p);
      let d = p;
      return Object.keys(u).forEach((b) => {
        const v = Up(u[b], i);
        if (v != null)
          if (typeof v == "object")
            if (s[b])
              d = sn(d, e(b, v, i, s));
            else {
              const g = Qe({
                theme: i
              }, v, (m) => ({
                [b]: m
              }));
              zp(g, v) ? d[b] = t({
                sx: v,
                theme: i
              }) : d = sn(d, g);
            }
          else
            d = sn(d, e(b, v, i, s));
      }), np(f, d);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Ea = Hp();
Ea.filterProps = ["sx"];
const Zr = Ea;
function Wp(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const qp = ["breakpoints", "palette", "spacing", "shape"];
function Qr(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = ue(e, qp), l = Ju(n), c = up(o);
  let u = Ye({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: k({
      mode: "light"
    }, r),
    spacing: c,
    shape: k({}, Qu, i)
  }, s);
  return u.applyStyles = Wp, u = t.reduce((p, f) => Ye(p, f), u), u.unstable_sxConfig = k({}, Jr, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(f) {
    return Zr({
      sx: f,
      theme: this
    });
  }, u;
}
function Gp(e) {
  return Object.keys(e).length === 0;
}
function Ta(e = null) {
  const t = x.useContext(Bs);
  return !t || Gp(t) ? e : t;
}
const Kp = Qr();
function ka(e = Kp) {
  return Ta(e);
}
const Xp = ["ownerState"], Yp = ["variants"], Jp = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Zp(e) {
  return Object.keys(e).length === 0;
}
function Qp(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function $n(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const ed = Qr(), ii = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Cn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Zp(t) ? e : t[n] || t;
}
function td(e) {
  return e ? (t, n) => n[e] : null;
}
function Mn(e, t) {
  let {
    ownerState: n
  } = t, r = ue(t, Xp);
  const o = typeof e == "function" ? e(k({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Mn(i, k({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = ue(o, Yp);
    return i.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(k({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((p) => {
        (n == null ? void 0 : n[p]) !== c.props[p] && r[p] !== c.props[p] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(k({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function nd(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = ed,
    rootShouldForwardProp: r = $n,
    slotShouldForwardProp: o = $n
  } = e, i = (s) => Zr(k({}, s, {
    theme: Cn(k({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, l = {}) => {
    Ls(s, (h) => h.filter((C) => !(C != null && C.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: p,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = td(ii(u))
    } = l, b = ue(l, Jp), v = p !== void 0 ? p : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), g = f || !1;
    let m;
    process.env.NODE_ENV !== "production" && c && (m = `${c}-${ii(u || "Root")}`);
    let E = $n;
    u === "Root" || u === "root" ? E = r : u ? E = o : Qp(s) && (E = void 0);
    const M = js(s, k({
      shouldForwardProp: E,
      label: m
    }, b)), y = (h) => typeof h == "function" && h.__emotion_real !== h || dt(h) ? (C) => Mn(h, k({}, C, {
      theme: Cn({
        theme: C.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : h, w = (h, ...C) => {
      let P = y(h);
      const B = C ? C.map(y) : [];
      c && d && B.push((N) => {
        const R = Cn(k({}, N, {
          defaultTheme: n,
          themeId: t
        }));
        if (!R.components || !R.components[c] || !R.components[c].styleOverrides)
          return null;
        const L = R.components[c].styleOverrides, V = {};
        return Object.entries(L).forEach(([D, I]) => {
          V[D] = Mn(I, k({}, N, {
            theme: R
          }));
        }), d(N, V);
      }), c && !v && B.push((N) => {
        var R;
        const L = Cn(k({}, N, {
          defaultTheme: n,
          themeId: t
        })), V = L == null || (R = L.components) == null || (R = R[c]) == null ? void 0 : R.variants;
        return Mn({
          variants: V
        }, k({}, N, {
          theme: L
        }));
      }), g || B.push(i);
      const j = B.length - C.length;
      if (Array.isArray(h) && j > 0) {
        const N = new Array(j).fill("");
        P = [...h, ...N], P.raw = [...h.raw, ...N];
      }
      const O = M(P, ...B);
      if (process.env.NODE_ENV !== "production") {
        let N;
        c && (N = `${c}${He(u || "")}`), N === void 0 && (N = `Styled(${Fl(s)})`), O.displayName = N;
      }
      return s.muiName && (O.muiName = s.muiName), O;
    };
    return M.withConfig && (w.withConfig = M.withConfig), w;
  };
}
function rd(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : na(t.components[n].defaultProps, r);
}
function od({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = ka(n);
  return r && (o = o[r] || o), rd({
    theme: o,
    name: t,
    props: e
  });
}
function eo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), cc(e, t, n);
}
function id(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function yt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return yt(id(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : It(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : It(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function tr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function ad(e) {
  e = yt(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (u, p = (u + n / 30) % 12) => o - i * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), tr({
    type: l,
    values: c
  });
}
function ai(e) {
  e = yt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? yt(ad(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function si(e, t) {
  const n = ai(e), r = ai(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Fn(e, t) {
  return e = yt(e), t = eo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, tr(e);
}
function sd(e, t) {
  if (e = yt(e), t = eo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return tr(e);
}
function ld(e, t) {
  if (e = yt(e), t = eo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return tr(e);
}
function cd(e, t) {
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
const ud = {
  black: "#000",
  white: "#fff"
}, dn = ud, pd = {
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
}, dd = pd, fd = {
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
}, Et = fd, hd = {
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
}, Tt = hd, md = {
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
}, Yt = md, gd = {
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
}, kt = gd, bd = {
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
}, Ot = bd, vd = {
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
}, St = vd, yd = ["mode", "contrastThreshold", "tonalOffset"], li = {
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
    paper: dn.white,
    default: dn.white
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
}, mr = {
  text: {
    primary: dn.white,
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
    active: dn.white,
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
function ci(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = ld(e.main, o) : t === "dark" && (e.dark = sd(e.main, i)));
}
function wd(e = "light") {
  return e === "dark" ? {
    main: kt[200],
    light: kt[50],
    dark: kt[400]
  } : {
    main: kt[700],
    light: kt[400],
    dark: kt[800]
  };
}
function xd(e = "light") {
  return e === "dark" ? {
    main: Et[200],
    light: Et[50],
    dark: Et[400]
  } : {
    main: Et[500],
    light: Et[300],
    dark: Et[700]
  };
}
function Ed(e = "light") {
  return e === "dark" ? {
    main: Tt[500],
    light: Tt[300],
    dark: Tt[700]
  } : {
    main: Tt[700],
    light: Tt[400],
    dark: Tt[800]
  };
}
function Td(e = "light") {
  return e === "dark" ? {
    main: Ot[400],
    light: Ot[300],
    dark: Ot[700]
  } : {
    main: Ot[700],
    light: Ot[500],
    dark: Ot[900]
  };
}
function kd(e = "light") {
  return e === "dark" ? {
    main: St[400],
    light: St[300],
    dark: St[700]
  } : {
    main: St[800],
    light: St[500],
    dark: St[900]
  };
}
function Od(e = "light") {
  return e === "dark" ? {
    main: Yt[400],
    light: Yt[300],
    dark: Yt[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Yt[500],
    dark: Yt[900]
  };
}
function Sd(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = ue(e, yd), i = e.primary || wd(t), s = e.secondary || xd(t), l = e.error || Ed(t), c = e.info || Td(t), u = e.success || kd(t), p = e.warning || Od(t);
  function f(g) {
    const m = si(g, mr.text.primary) >= n ? mr.text.primary : li.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = si(g, m);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${m} on ${g}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return m;
  }
  const d = ({
    color: g,
    name: m,
    mainShade: E = 500,
    lightShade: M = 300,
    darkShade: y = 700
  }) => {
    if (g = k({}, g), !g.main && g[E] && (g.main = g[E]), !g.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : It(11, m ? ` (${m})` : "", E));
    if (typeof g.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : It(12, m ? ` (${m})` : "", JSON.stringify(g.main)));
    return ci(g, "light", M, r), ci(g, "dark", y, r), g.contrastText || (g.contrastText = f(g.main)), g;
  }, b = {
    dark: mr,
    light: li
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Ye(k({
    // A collection of common colors.
    common: k({}, dn),
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
      color: p,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: d({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: d({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: dd,
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
  }, b[t]), o);
}
const Cd = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Pd(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ui = {
  textTransform: "uppercase"
}, pi = '"Roboto", "Helvetica", "Arial", sans-serif';
function Nd(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = pi,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: p,
    pxToRem: f
  } = n, d = ue(n, Cd);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, v = f || ((E) => `${E / u * b}rem`), g = (E, M, y, w, h) => k({
    fontFamily: r,
    fontWeight: E,
    fontSize: v(M),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: y
  }, r === pi ? {
    letterSpacing: `${Pd(w / M)}em`
  } : {}, h, p), m = {
    h1: g(i, 96, 1.167, -1.5),
    h2: g(i, 60, 1.2, -0.5),
    h3: g(s, 48, 1.167, 0),
    h4: g(s, 34, 1.235, 0.25),
    h5: g(s, 24, 1.334, 0),
    h6: g(l, 20, 1.6, 0.15),
    subtitle1: g(s, 16, 1.75, 0.15),
    subtitle2: g(l, 14, 1.57, 0.1),
    body1: g(s, 16, 1.5, 0.15),
    body2: g(s, 14, 1.43, 0.15),
    button: g(l, 14, 1.75, 0.4, ui),
    caption: g(s, 12, 1.66, 0.4),
    overline: g(s, 12, 2.66, 1, ui),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Ye(k({
    htmlFontSize: u,
    pxToRem: v,
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
const Rd = 0.2, $d = 0.14, Md = 0.12;
function de(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Rd})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${$d})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Md})`].join(",");
}
const Id = ["none", de(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), de(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), de(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), de(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), de(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), de(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), de(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), de(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), de(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), de(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), de(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), de(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), de(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), de(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), de(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), de(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), de(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), de(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), de(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), de(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), de(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), de(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), de(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), de(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], _d = Id, Ad = ["duration", "easing", "delay"], Dd = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, jd = {
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
function di(e) {
  return `${Math.round(e)}ms`;
}
function Bd(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Ld(e) {
  const t = k({}, Dd, e.easing), n = k({}, jd, e.duration);
  return k({
    getAutoHeightDuration: Bd,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = ue(i, Ad);
      if (process.env.NODE_ENV !== "production") {
        const p = (d) => typeof d == "string", f = (d) => !isNaN(parseFloat(d));
        !p(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !p(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), p(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !p(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof s == "string" ? s : di(s)} ${l} ${typeof c == "string" ? c : di(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Fd = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Vd = Fd, zd = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Ud(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = ue(e, zd);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : It(18));
  const l = Sd(r), c = Qr(e);
  let u = Ye(c, {
    mixins: cd(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: _d.slice(),
    typography: Nd(l, i),
    transitions: Ld(o),
    zIndex: k({}, Vd)
  });
  if (u = Ye(u, s), u = t.reduce((p, f) => Ye(p, f), u), process.env.NODE_ENV !== "production") {
    const p = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (d, b) => {
      let v;
      for (v in d) {
        const g = d[v];
        if (p.indexOf(v) !== -1 && Object.keys(g).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const m = qe("", v);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(d, null, 2), "", `Instead, you need to use the '&.${m}' syntax:`, JSON.stringify({
              root: {
                [`&.${m}`]: g
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          d[v] = {};
        }
      }
    };
    Object.keys(u.components).forEach((d) => {
      const b = u.components[d].styleOverrides;
      b && d.indexOf("Mui") === 0 && f(b, d);
    });
  }
  return u.unstable_sxConfig = k({}, Jr, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(f) {
    return Zr({
      sx: f,
      theme: this
    });
  }, u;
}
const Hd = Ud(), to = Hd, no = "$$material", Oa = (e) => $n(e) && e !== "classes", Wd = nd({
  themeId: no,
  defaultTheme: to,
  rootShouldForwardProp: Oa
}), ke = Wd;
function wn() {
  const e = ka(to);
  return process.env.NODE_ENV !== "production" && x.useDebugValue(e), e[no] || e;
}
function tt({
  props: e,
  name: t
}) {
  return od({
    props: e,
    name: t,
    defaultTheme: to,
    themeId: no
  });
}
function Rr(e, t) {
  return Rr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Rr(e, t);
}
function qd(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Rr(e, t);
}
const fi = {
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
const Sa = $t.createContext(null);
var Kd = function(t) {
  return t.scrollTop;
}, tn = "unmounted", ut = "exited", pt = "entering", Rt = "entered", $r = "exiting", nt = /* @__PURE__ */ function(e) {
  qd(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = ut, i.appearStatus = pt) : c = Rt : r.unmountOnExit || r.mountOnEnter ? c = tn : c = ut, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === tn ? {
      status: ut
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== pt && s !== Rt && (i = pt) : (s === pt || s === Rt) && (i = $r);
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
      if (this.cancelNextCallback(), i === pt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : kn.findDOMNode(this);
          s && Kd(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ut && this.setState({
        status: tn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [kn.findDOMNode(this), l], u = c[0], p = c[1], f = this.getTimeouts(), d = l ? f.appear : f.enter;
    if (!o && !s || fi.disabled) {
      this.safeSetState({
        status: Rt
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, p), this.safeSetState({
      status: pt
    }, function() {
      i.props.onEntering(u, p), i.onTransitionEnd(d, function() {
        i.safeSetState({
          status: Rt
        }, function() {
          i.props.onEntered(u, p);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : kn.findDOMNode(this);
    if (!i || fi.disabled) {
      this.safeSetState({
        status: ut
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: $r
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: ut
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : kn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!s || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], u = c[0], p = c[1];
      this.props.addEndListener(u, p);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === tn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = ue(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ $t.createElement(Sa.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : $t.cloneElement($t.Children.only(s), l))
    );
  }, t;
}($t.Component);
nt.contextType = Sa;
nt.propTypes = process.env.NODE_ENV !== "production" ? {
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
function Ct() {
}
nt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Ct,
  onEntering: Ct,
  onEntered: Ct,
  onExit: Ct,
  onExiting: Ct,
  onExited: Ct
};
nt.UNMOUNTED = tn;
nt.EXITED = ut;
nt.ENTERING = pt;
nt.ENTERED = Rt;
nt.EXITING = $r;
const Ca = nt, Pa = (e) => e.scrollTop;
function Vn(e, t) {
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
const Xd = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Mr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Yd = {
  entering: {
    opacity: 1,
    transform: Mr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, gr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), ro = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: p,
    onExit: f,
    onExited: d,
    onExiting: b,
    style: v,
    timeout: g = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: m = Ca
  } = t, E = ue(t, Xd), M = Qt(), y = x.useRef(), w = wn(), h = x.useRef(null), C = Le(h, i.ref, n), P = (D) => (I) => {
    if (D) {
      const F = h.current;
      I === void 0 ? D(F) : D(F, I);
    }
  }, B = P(p), j = P((D, I) => {
    Pa(D);
    const {
      duration: F,
      delay: Q,
      easing: Z
    } = Vn({
      style: v,
      timeout: g,
      easing: s
    }, {
      mode: "enter"
    });
    let S;
    g === "auto" ? (S = w.transitions.getAutoHeightDuration(D.clientHeight), y.current = S) : S = F, D.style.transition = [w.transitions.create("opacity", {
      duration: S,
      delay: Q
    }), w.transitions.create("transform", {
      duration: gr ? S : S * 0.666,
      delay: Q,
      easing: Z
    })].join(","), c && c(D, I);
  }), O = P(u), N = P(b), R = P((D) => {
    const {
      duration: I,
      delay: F,
      easing: Q
    } = Vn({
      style: v,
      timeout: g,
      easing: s
    }, {
      mode: "exit"
    });
    let Z;
    g === "auto" ? (Z = w.transitions.getAutoHeightDuration(D.clientHeight), y.current = Z) : Z = I, D.style.transition = [w.transitions.create("opacity", {
      duration: Z,
      delay: F
    }), w.transitions.create("transform", {
      duration: gr ? Z : Z * 0.666,
      delay: gr ? F : F || Z * 0.333,
      easing: Q
    })].join(","), D.style.opacity = 0, D.style.transform = Mr(0.75), f && f(D);
  }), L = P(d);
  return /* @__PURE__ */ T(m, k({
    appear: o,
    in: l,
    nodeRef: h,
    onEnter: j,
    onEntered: O,
    onEntering: B,
    onExit: R,
    onExited: L,
    onExiting: N,
    addEndListener: (D) => {
      g === "auto" && M.start(y.current || 0, D), r && r(h.current, D);
    },
    timeout: g === "auto" ? null : g
  }, E, {
    children: (D, I) => /* @__PURE__ */ x.cloneElement(i, k({
      style: k({
        opacity: 0,
        transform: Mr(0.75),
        visibility: D === "exited" && !l ? "hidden" : void 0
      }, Yd[D], v, i.props.style),
      ref: C
    }, I))
  }));
});
process.env.NODE_ENV !== "production" && (ro.propTypes = {
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
  children: hn.isRequired,
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
ro.muiSupportAuto = !0;
const Ir = ro, Jd = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, hi = Jd, Zd = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Qd = ke(ya, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Na = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r;
  const o = Ta(), i = tt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: u,
    container: p,
    disablePortal: f,
    keepMounted: d,
    modifiers: b,
    open: v,
    placement: g,
    popperOptions: m,
    popperRef: E,
    transition: M,
    slots: y,
    slotProps: w
  } = i, h = ue(i, Zd), C = (r = y == null ? void 0 : y.root) != null ? r : c == null ? void 0 : c.Root, P = k({
    anchorEl: s,
    container: p,
    disablePortal: f,
    keepMounted: d,
    modifiers: b,
    open: v,
    placement: g,
    popperOptions: m,
    popperRef: E,
    transition: M
  }, h);
  return /* @__PURE__ */ T(Qd, k({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: C
    },
    slotProps: w ?? u
  }, P, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Na.propTypes = {
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
  anchorEl: a.oneOfType([Je, a.object, a.func]),
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
  container: a.oneOfType([Je, a.func]),
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
  popperRef: Vr,
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
const Ra = Na;
function ef(e) {
  return qe("MuiTooltip", e);
}
const tf = it("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ot = tf, nf = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function rf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const of = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${He(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return et(s, ef, t);
}, af = ke(Ra, {
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
  [`&[data-popper-placement*="bottom"] .${ot.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${ot.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${ot.arrow}`]: k({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ot.arrow}`]: k({}, t.isRtl ? {
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
})), sf = ke("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${He(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => k({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Fn(e.palette.grey[700], 0.92),
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
  lineHeight: `${rf(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${ot.popper}[data-popper-placement*="left"] &`]: k({
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
  [`.${ot.popper}[data-popper-placement*="right"] &`]: k({
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
  [`.${ot.popper}[data-popper-placement*="top"] &`]: k({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${ot.popper}[data-popper-placement*="bottom"] &`]: k({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), lf = ke("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Fn(e.palette.grey[700], 0.9),
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
let Pn = !1;
const mi = new mn();
let Jt = {
  x: 0,
  y: 0
};
function Nn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const $a = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i, s, l, c, u, p, f, d, b, v, g, m, E, M, y, w, h;
  const C = tt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: P = !1,
    children: B,
    components: j = {},
    componentsProps: O = {},
    describeChild: N = !1,
    disableFocusListener: R = !1,
    disableHoverListener: L = !1,
    disableInteractive: V = !1,
    disableTouchListener: D = !1,
    enterDelay: I = 100,
    enterNextDelay: F = 0,
    enterTouchDelay: Q = 700,
    followCursor: Z = !1,
    id: S,
    leaveDelay: A = 0,
    leaveTouchDelay: U = 1500,
    onClose: K,
    onOpen: z,
    open: H,
    placement: q = "bottom",
    PopperComponent: G,
    PopperProps: W = {},
    slotProps: X = {},
    slots: Y = {},
    title: ne,
    TransitionComponent: _ = Ir,
    TransitionProps: J
  } = C, $ = ue(C, nf), re = /* @__PURE__ */ x.isValidElement(B) ? B : /* @__PURE__ */ T("span", {
    children: B
  }), ve = wn(), Oe = ve.direction === "rtl", [me, lt] = x.useState(), [Se, Ge] = x.useState(null), Re = x.useRef(!1), Ke = V || Z, we = Qt(), wt = Qt(), ct = Qt(), zt = Qt(), [xn, so] = Yi({
    controlled: H,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Xe = xn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ee
    } = x.useRef(H !== void 0);
    x.useEffect(() => {
      me && me.disabled && !ee && ne !== "" && me.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ne, me, ee]);
  }
  const nr = Xi(S), Ut = x.useRef(), En = ln(() => {
    Ut.current !== void 0 && (document.body.style.WebkitUserSelect = Ut.current, Ut.current = void 0), zt.clear();
  });
  x.useEffect(() => En, [En]);
  const lo = (ee) => {
    mi.clear(), Pn = !0, so(!0), z && !Xe && z(ee);
  }, Tn = ln(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ee) => {
      mi.start(800 + A, () => {
        Pn = !1;
      }), so(!1), K && Xe && K(ee), we.start(ve.transitions.duration.shortest, () => {
        Re.current = !1;
      });
    }
  ), rr = (ee) => {
    Re.current && ee.type !== "touchstart" || (me && me.removeAttribute("title"), wt.clear(), ct.clear(), I || Pn && F ? wt.start(Pn ? F : I, () => {
      lo(ee);
    }) : lo(ee));
  }, co = (ee) => {
    wt.clear(), ct.start(A, () => {
      Tn(ee);
    });
  }, {
    isFocusVisibleRef: uo,
    onBlur: Xa,
    onFocus: Ya,
    ref: Ja
  } = Ji(), [, po] = x.useState(!1), fo = (ee) => {
    Xa(ee), uo.current === !1 && (po(!1), co(ee));
  }, ho = (ee) => {
    me || lt(ee.currentTarget), Ya(ee), uo.current === !0 && (po(!0), rr(ee));
  }, mo = (ee) => {
    Re.current = !0;
    const $e = re.props;
    $e.onTouchStart && $e.onTouchStart(ee);
  }, go = rr, bo = co, Za = (ee) => {
    mo(ee), ct.clear(), we.clear(), En(), Ut.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", zt.start(Q, () => {
      document.body.style.WebkitUserSelect = Ut.current, rr(ee);
    });
  }, Qa = (ee) => {
    re.props.onTouchEnd && re.props.onTouchEnd(ee), En(), ct.start(U, () => {
      Tn(ee);
    });
  };
  x.useEffect(() => {
    if (!Xe)
      return;
    function ee($e) {
      ($e.key === "Escape" || $e.key === "Esc") && Tn($e);
    }
    return document.addEventListener("keydown", ee), () => {
      document.removeEventListener("keydown", ee);
    };
  }, [Tn, Xe]);
  const es = Le(re.ref, Ja, lt, n);
  !ne && ne !== 0 && (Xe = !1);
  const or = x.useRef(), ts = (ee) => {
    const $e = re.props;
    $e.onMouseMove && $e.onMouseMove(ee), Jt = {
      x: ee.clientX,
      y: ee.clientY
    }, or.current && or.current.update();
  }, Ht = {}, ir = typeof ne == "string";
  N ? (Ht.title = !Xe && ir && !L ? ne : null, Ht["aria-describedby"] = Xe ? nr : null) : (Ht["aria-label"] = ir ? ne : null, Ht["aria-labelledby"] = Xe && !ir ? nr : null);
  const Ae = k({}, Ht, $, re.props, {
    className: Ee($.className, re.props.className),
    onTouchStart: mo,
    ref: es
  }, Z ? {
    onMouseMove: ts
  } : {});
  process.env.NODE_ENV !== "production" && (Ae["data-mui-internal-clone-element"] = !0, x.useEffect(() => {
    me && !me.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [me]));
  const Wt = {};
  D || (Ae.onTouchStart = Za, Ae.onTouchEnd = Qa), L || (Ae.onMouseOver = Nn(go, Ae.onMouseOver), Ae.onMouseLeave = Nn(bo, Ae.onMouseLeave), Ke || (Wt.onMouseOver = go, Wt.onMouseLeave = bo)), R || (Ae.onFocus = Nn(ho, Ae.onFocus), Ae.onBlur = Nn(fo, Ae.onBlur), Ke || (Wt.onFocus = ho, Wt.onBlur = fo)), process.env.NODE_ENV !== "production" && re.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${re.props.title}\` or the Tooltip component.`].join(`
`));
  const ns = x.useMemo(() => {
    var ee;
    let $e = [{
      name: "arrow",
      enabled: !!Se,
      options: {
        element: Se,
        padding: 4
      }
    }];
    return (ee = W.popperOptions) != null && ee.modifiers && ($e = $e.concat(W.popperOptions.modifiers)), k({}, W.popperOptions, {
      modifiers: $e
    });
  }, [Se, W]), qt = k({}, C, {
    isRtl: Oe,
    arrow: P,
    disableInteractive: Ke,
    placement: q,
    PopperComponentProp: G,
    touch: Re.current
  }), ar = of(qt), vo = (r = (o = Y.popper) != null ? o : j.Popper) != null ? r : af, yo = (i = (s = (l = Y.transition) != null ? l : j.Transition) != null ? s : _) != null ? i : Ir, wo = (c = (u = Y.tooltip) != null ? u : j.Tooltip) != null ? c : sf, xo = (p = (f = Y.arrow) != null ? f : j.Arrow) != null ? p : lf, rs = en(vo, k({}, W, (d = X.popper) != null ? d : O.popper, {
    className: Ee(ar.popper, W == null ? void 0 : W.className, (b = (v = X.popper) != null ? v : O.popper) == null ? void 0 : b.className)
  }), qt), os = en(yo, k({}, J, (g = X.transition) != null ? g : O.transition), qt), is = en(wo, k({}, (m = X.tooltip) != null ? m : O.tooltip, {
    className: Ee(ar.tooltip, (E = (M = X.tooltip) != null ? M : O.tooltip) == null ? void 0 : E.className)
  }), qt), as = en(xo, k({}, (y = X.arrow) != null ? y : O.arrow, {
    className: Ee(ar.arrow, (w = (h = X.arrow) != null ? h : O.arrow) == null ? void 0 : w.className)
  }), qt);
  return /* @__PURE__ */ pe(x.Fragment, {
    children: [/* @__PURE__ */ x.cloneElement(re, Ae), /* @__PURE__ */ T(vo, k({
      as: G ?? Ra,
      placement: q,
      anchorEl: Z ? {
        getBoundingClientRect: () => ({
          top: Jt.y,
          left: Jt.x,
          right: Jt.x,
          bottom: Jt.y,
          width: 0,
          height: 0
        })
      } : me,
      popperRef: or,
      open: me ? Xe : !1,
      id: nr,
      transition: !0
    }, Wt, rs, {
      popperOptions: ns,
      children: ({
        TransitionProps: ee
      }) => /* @__PURE__ */ T(yo, k({
        timeout: ve.transitions.duration.shorter
      }, ee, os, {
        children: /* @__PURE__ */ pe(wo, k({}, is, {
          children: [ne, P ? /* @__PURE__ */ T(xo, k({}, as, {
            ref: Ge
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && ($a.propTypes = {
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
  children: hn.isRequired,
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
const cf = $a;
var oo = {}, Ma = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ma);
var uf = Ma.exports, br = {};
function pf(e) {
  return qe("MuiSvgIcon", e);
}
it("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const df = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ff = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${He(t)}`, `fontSize${He(n)}`]
  };
  return et(o, pf, r);
}, hf = ke("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${He(n.color)}`], t[`fontSize${He(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, s, l, c, u, p, f, d, b, v;
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
      large: ((u = e.typography) == null || (p = u.pxToRem) == null ? void 0 : p.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (f = (d = (e.vars || e).palette) == null || (d = d[t.color]) == null ? void 0 : d.main) != null ? f : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[t.color]
  };
}), io = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = tt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: p = !1,
    titleAccess: f,
    viewBox: d = "0 0 24 24"
  } = r, b = ue(r, df), v = /* @__PURE__ */ x.isValidElement(o) && o.type === "svg", g = k({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: p,
    viewBox: d,
    hasSvgAsChild: v
  }), m = {};
  p || (m.viewBox = d);
  const E = ff(g);
  return /* @__PURE__ */ pe(hf, k({
    as: l,
    className: Ee(E.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, m, b, v && o.props, {
    ownerState: g,
    children: [v ? o.props.children : o, f ? /* @__PURE__ */ T("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (io.propTypes = {
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
io.muiName = "SvgIcon";
const gi = io;
function Ia(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ T(gi, k({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = gi.muiName, /* @__PURE__ */ x.memo(/* @__PURE__ */ x.forwardRef(n));
}
const mf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ra.configure(e);
  }
}, gf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: He,
  createChainedFunction: Or,
  createSvgIcon: Ia,
  debounce: Ki,
  deprecatedPropType: zl,
  isMuiElement: Ul,
  ownerDocument: Te,
  ownerWindow: _t,
  requirePropFactory: Hl,
  setRef: An,
  unstable_ClassNameGenerator: mf,
  unstable_useEnhancedEffect: gt,
  unstable_useId: Xi,
  unsupportedProp: Gl,
  useControlled: Yi,
  useEventCallback: ln,
  useForkRef: Le,
  useIsFocusVisible: Ji
}, Symbol.toStringTag, { value: "Module" })), bf = /* @__PURE__ */ xl(gf);
var bi;
function vf() {
  return bi || (bi = 1, function(e) {
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
  }(br)), br;
}
var yf = uf;
Object.defineProperty(oo, "__esModule", {
  value: !0
});
var _a = oo.default = void 0, wf = yf(vf()), xf = ss;
_a = oo.default = (0, wf.default)(/* @__PURE__ */ (0, xf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function vi(e, t, n) {
  return e ? /* @__PURE__ */ T(Ci, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ T("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Aa(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: i = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: u = !1,
    isDense: p = !0,
    isSubMenuParent: f = !1,
    hasDisabledGutters: d = !1,
    hasDivider: b = !1,
    focusVisibleClassName: v,
    id: g,
    children: m
  } = e, E = /* @__PURE__ */ T(
    Ss,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: p,
      disableGutters: d,
      divider: b,
      focusVisibleClassName: v,
      onClick: t,
      id: g,
      children: n ? /* @__PURE__ */ pe(Un, { children: [
        vi(i, n, !0),
        /* @__PURE__ */ T(Cs, { primary: n, inset: !i && o }),
        f ? /* @__PURE__ */ T(Ci, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ T(_a, {}) }) : vi(s, n, !1)
      ] }) : m
    }
  );
  return r ? /* @__PURE__ */ T(cf, { title: r, placement: "right", children: /* @__PURE__ */ T("div", { children: E }) }) : E;
}
function Da(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Ef(e) {
  const [t, n] = je(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (u) => {
    n(u.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let u = Da(i).filter((p) => "menuItem" in p.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (p) => "menuItem" in p.group && p.group.menuItem === r.id
    ), /* @__PURE__ */ T(ao, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ pe(Un, { children: [
    /* @__PURE__ */ T(Aa, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ T(
      Ps,
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
const Tf = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function ao(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = Lt(() => {
    const p = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Da(t).filter((v) => !("menuItem" in v.group))
    ), f = Object.values(p).sort(
      (v, g) => (v.group.order || 0) - (g.group.order || 0)
    ), d = [];
    f.forEach((v) => {
      Tf(v.id, t.items).forEach(
        (g) => d.push({ item: g, isLastItemInGroup: !1 })
      ), d.length > 0 && (d[d.length - 1].isLastItemInGroup = !0);
    }), d.length > 0 && (d[d.length - 1].isLastItemInGroup = !1);
    const b = d.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: d, allowForLeadingIcons: b };
  }, [o, t]), l = ({ item: p, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: p.label,
    tooltip: p.tooltip,
    iconPathBefore: "iconPathBefore" in p ? p.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in p ? p.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ T("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ T("div", { role: "menu", "aria-label": u, children: i.map((p, f) => {
    const { item: d } = p, b = l(p);
    if ("command" in d) {
      const v = d.group + f;
      return /* @__PURE__ */ T(
        Aa,
        {
          onClick: (g) => {
            n == null || n(g), r(d);
          },
          ...b
        },
        v
      );
    }
    return /* @__PURE__ */ T(
      Ef,
      {
        parentMenuItem: d,
        parentItemProps: b,
        ...e
      },
      u + d.id
    );
  }) }, u);
}
function kf(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ T(ao, { ...e, includedGroups: i });
}
function Of({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ pe(
    Pi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ T("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ T(Ns, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ T(
          kf,
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
function Sf({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = Lt(() => {
    const s = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, u = o[c];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) ? s.set(u.order, { id: c, metadata: u }) : console.warn(
        `Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ T(
    Pi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, l) => /* @__PURE__ */ T(
        Of,
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
const ja = /* @__PURE__ */ x.createContext({});
process.env.NODE_ENV !== "production" && (ja.displayName = "ListContext");
const Cf = ja;
function Pf(e) {
  return qe("MuiList", e);
}
it("MuiList", ["root", "padding", "dense", "subheader"]);
const Nf = ["children", "className", "component", "dense", "disablePadding", "subheader"], Rf = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return et({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Pf, t);
}, $f = ke("ul", {
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
})), Ba = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = tt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = r, p = ue(r, Nf), f = x.useMemo(() => ({
    dense: l
  }), [l]), d = k({}, r, {
    component: s,
    dense: l,
    disablePadding: c
  }), b = Rf(d);
  return /* @__PURE__ */ T(Cf.Provider, {
    value: f,
    children: /* @__PURE__ */ pe($f, k({
      as: s,
      className: Ee(b.root, i),
      ref: n,
      ownerState: d
    }, p, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ba.propTypes = {
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
const Mf = Ba, If = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function vr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function yi(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function La(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function Zt(e, t, n, r, o, i) {
  let s = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !La(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Fa = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: s,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: u = !1,
    onKeyDown: p,
    variant: f = "selectedMenu"
  } = t, d = ue(t, If), b = x.useRef(null), v = x.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  gt(() => {
    o && b.current.focus();
  }, [o]), x.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (y, w) => {
      const h = !b.current.style.width;
      if (y.clientHeight < b.current.clientHeight && h) {
        const C = `${Zi(Te(y))}px`;
        b.current.style[w.direction === "rtl" ? "paddingLeft" : "paddingRight"] = C, b.current.style.width = `calc(100% + ${C})`;
      }
      return b.current;
    }
  }), []);
  const g = (y) => {
    const w = b.current, h = y.key, C = Te(w).activeElement;
    if (h === "ArrowDown")
      y.preventDefault(), Zt(w, C, u, c, vr);
    else if (h === "ArrowUp")
      y.preventDefault(), Zt(w, C, u, c, yi);
    else if (h === "Home")
      y.preventDefault(), Zt(w, null, u, c, vr);
    else if (h === "End")
      y.preventDefault(), Zt(w, null, u, c, yi);
    else if (h.length === 1) {
      const P = v.current, B = h.toLowerCase(), j = performance.now();
      P.keys.length > 0 && (j - P.lastTime > 500 ? (P.keys = [], P.repeating = !0, P.previousKeyMatched = !0) : P.repeating && B !== P.keys[0] && (P.repeating = !1)), P.lastTime = j, P.keys.push(B);
      const O = C && !P.repeating && La(C, P);
      P.previousKeyMatched && (O || Zt(w, C, !1, c, vr, P)) ? y.preventDefault() : P.previousKeyMatched = !1;
    }
    p && p(y);
  }, m = Le(b, n);
  let E = -1;
  x.Children.forEach(s, (y, w) => {
    if (!/* @__PURE__ */ x.isValidElement(y)) {
      E === w && (E += 1, E >= s.length && (E = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && _n.isFragment(y) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), y.props.disabled || (f === "selectedMenu" && y.props.selected || E === -1) && (E = w), E === w && (y.props.disabled || y.props.muiSkipListHighlight || y.type.muiSkipListHighlight) && (E += 1, E >= s.length && (E = -1));
  });
  const M = x.Children.map(s, (y, w) => {
    if (w === E) {
      const h = {};
      return i && (h.autoFocus = !0), y.props.tabIndex === void 0 && f === "selectedMenu" && (h.tabIndex = 0), /* @__PURE__ */ x.cloneElement(y, h);
    }
    return y;
  });
  return /* @__PURE__ */ T(Mf, k({
    role: "menu",
    ref: m,
    className: l,
    onKeyDown: g,
    tabIndex: o ? 0 : -1
  }, d, {
    children: M
  }));
});
process.env.NODE_ENV !== "production" && (Fa.propTypes = {
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
const _f = Fa, Af = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Df = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Va = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = wn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: p,
    onEntered: f,
    onEntering: d,
    onExit: b,
    onExited: v,
    onExiting: g,
    style: m,
    timeout: E = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: M = Ca
  } = t, y = ue(t, Af), w = x.useRef(null), h = Le(w, l.ref, n), C = (V) => (D) => {
    if (V) {
      const I = w.current;
      D === void 0 ? V(I) : V(I, D);
    }
  }, P = C(d), B = C((V, D) => {
    Pa(V);
    const I = Vn({
      style: m,
      timeout: E,
      easing: c
    }, {
      mode: "enter"
    });
    V.style.webkitTransition = r.transitions.create("opacity", I), V.style.transition = r.transitions.create("opacity", I), p && p(V, D);
  }), j = C(f), O = C(g), N = C((V) => {
    const D = Vn({
      style: m,
      timeout: E,
      easing: c
    }, {
      mode: "exit"
    });
    V.style.webkitTransition = r.transitions.create("opacity", D), V.style.transition = r.transitions.create("opacity", D), b && b(V);
  }), R = C(v);
  return /* @__PURE__ */ T(M, k({
    appear: s,
    in: u,
    nodeRef: w,
    onEnter: B,
    onEntered: j,
    onEntering: P,
    onExit: N,
    onExited: R,
    onExiting: O,
    addEndListener: (V) => {
      i && i(w.current, V);
    },
    timeout: E
  }, y, {
    children: (V, D) => /* @__PURE__ */ x.cloneElement(l, k({
      style: k({
        opacity: 0,
        visibility: V === "exited" && !u ? "hidden" : void 0
      }, Df[V], m, l.props.style),
      ref: h
    }, D))
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
  children: hn.isRequired,
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
const jf = Va;
function Bf(e) {
  return qe("MuiBackdrop", e);
}
it("MuiBackdrop", ["root", "invisible"]);
const Lf = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Ff = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return et({
    root: ["root", n && "invisible"]
  }, Bf, t);
}, Vf = ke("div", {
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
})), za = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i;
  const s = tt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: p = {},
    componentsProps: f = {},
    invisible: d = !1,
    open: b,
    slotProps: v = {},
    slots: g = {},
    TransitionComponent: m = jf,
    transitionDuration: E
  } = s, M = ue(s, Lf), y = k({}, s, {
    component: u,
    invisible: d
  }), w = Ff(y), h = (r = v.root) != null ? r : f.root;
  return /* @__PURE__ */ T(m, k({
    in: b,
    timeout: E
  }, M, {
    children: /* @__PURE__ */ T(Vf, k({
      "aria-hidden": !0
    }, h, {
      as: (o = (i = g.root) != null ? i : p.Root) != null ? o : u,
      className: Ee(w.root, c, h == null ? void 0 : h.className),
      ownerState: k({}, y, h == null ? void 0 : h.ownerState),
      classes: w,
      ref: n,
      children: l
    }))
  }));
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
const zf = za;
function Uf(e) {
  return qe("MuiModal", e);
}
it("MuiModal", ["root", "hidden", "backdrop"]);
const Hf = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Wf = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return et({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, Uf, r);
}, qf = ke("div", {
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
})), Gf = ke(zf, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Ua = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i, s, l, c;
  const u = tt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: p = Gf,
    BackdropProps: f,
    className: d,
    closeAfterTransition: b = !1,
    children: v,
    container: g,
    component: m,
    components: E = {},
    componentsProps: M = {},
    disableAutoFocus: y = !1,
    disableEnforceFocus: w = !1,
    disableEscapeKeyDown: h = !1,
    disablePortal: C = !1,
    disableRestoreFocus: P = !1,
    disableScrollLock: B = !1,
    hideBackdrop: j = !1,
    keepMounted: O = !1,
    onBackdropClick: N,
    open: R,
    slotProps: L,
    slots: V
    // eslint-disable-next-line react/prop-types
  } = u, D = ue(u, Hf), I = k({}, u, {
    closeAfterTransition: b,
    disableAutoFocus: y,
    disableEnforceFocus: w,
    disableEscapeKeyDown: h,
    disablePortal: C,
    disableRestoreFocus: P,
    disableScrollLock: B,
    hideBackdrop: j,
    keepMounted: O
  }), {
    getRootProps: F,
    getBackdropProps: Q,
    getTransitionProps: Z,
    portalRef: S,
    isTopModal: A,
    exited: U,
    hasTransition: K
  } = _c(k({}, I, {
    rootRef: n
  })), z = k({}, I, {
    exited: U
  }), H = Wf(z), q = {};
  if (v.props.tabIndex === void 0 && (q.tabIndex = "-1"), K) {
    const {
      onEnter: J,
      onExited: $
    } = Z();
    q.onEnter = J, q.onExited = $;
  }
  const G = (r = (o = V == null ? void 0 : V.root) != null ? o : E.Root) != null ? r : qf, W = (i = (s = V == null ? void 0 : V.backdrop) != null ? s : E.Backdrop) != null ? i : p, X = (l = L == null ? void 0 : L.root) != null ? l : M.root, Y = (c = L == null ? void 0 : L.backdrop) != null ? c : M.backdrop, ne = bt({
    elementType: G,
    externalSlotProps: X,
    externalForwardedProps: D,
    getSlotProps: F,
    additionalProps: {
      ref: n,
      as: m
    },
    ownerState: z,
    className: Ee(d, X == null ? void 0 : X.className, H == null ? void 0 : H.root, !z.open && z.exited && (H == null ? void 0 : H.hidden))
  }), _ = bt({
    elementType: W,
    externalSlotProps: Y,
    additionalProps: f,
    getSlotProps: (J) => Q(k({}, J, {
      onClick: ($) => {
        N && N($), J != null && J.onClick && J.onClick($);
      }
    })),
    className: Ee(Y == null ? void 0 : Y.className, f == null ? void 0 : f.className, H == null ? void 0 : H.backdrop),
    ownerState: z
  });
  return !O && !R && (!K || U) ? null : /* @__PURE__ */ T(cn, {
    ref: S,
    container: g,
    disablePortal: C,
    children: /* @__PURE__ */ pe(G, k({}, ne, {
      children: [!j && p ? /* @__PURE__ */ T(W, k({}, _)) : null, /* @__PURE__ */ T(Dn, {
        disableEnforceFocus: w,
        disableAutoFocus: y,
        disableRestoreFocus: P,
        isEnabled: A,
        open: R,
        children: /* @__PURE__ */ x.cloneElement(v, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ua.propTypes = {
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
  children: hn.isRequired,
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
  container: a.oneOfType([Je, a.func]),
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
const Kf = Ua;
function Xf(e) {
  return qe("MuiPaper", e);
}
it("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Yf = ["className", "component", "elevation", "square", "variant"], Jf = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return et(i, Xf, o);
}, Zf = ke("div", {
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
    backgroundImage: `linear-gradient(${Fn("#fff", hi(t.elevation))}, ${Fn("#fff", hi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Ha = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = tt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = ue(r, Yf), p = k({}, r, {
    component: i,
    elevation: s,
    square: l,
    variant: c
  }), f = Jf(p);
  return process.env.NODE_ENV !== "production" && wn().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ T(Zf, k({
    as: i,
    ownerState: p,
    className: Ee(f.root, o),
    ref: n
  }, u));
});
process.env.NODE_ENV !== "production" && (Ha.propTypes = {
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
  elevation: Vt(ta, (e) => {
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
const Qf = Ha;
function eh(e) {
  return qe("MuiPopover", e);
}
it("MuiPopover", ["root", "paper"]);
const th = ["onEntering"], nh = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], rh = ["slotProps"];
function wi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function xi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function Ei(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function In(e) {
  return typeof e == "function" ? e() : e;
}
const oh = (e) => {
  const {
    classes: t
  } = e;
  return et({
    root: ["root"],
    paper: ["paper"]
  }, eh, t);
}, ih = ke(Kf, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Wa = ke(Qf, {
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
}), qa = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i;
  const s = tt({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: p,
    anchorReference: f = "anchorEl",
    children: d,
    className: b,
    container: v,
    elevation: g = 8,
    marginThreshold: m = 16,
    open: E,
    PaperProps: M = {},
    slots: y,
    slotProps: w,
    transformOrigin: h = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: C = Ir,
    transitionDuration: P = "auto",
    TransitionProps: {
      onEntering: B
    } = {},
    disableScrollLock: j = !1
  } = s, O = ue(s.TransitionProps, th), N = ue(s, nh), R = (r = w == null ? void 0 : w.paper) != null ? r : M, L = x.useRef(), V = Le(L, R.ref), D = k({}, s, {
    anchorOrigin: u,
    anchorReference: f,
    elevation: g,
    marginThreshold: m,
    externalPaperSlotProps: R,
    transformOrigin: h,
    TransitionComponent: C,
    transitionDuration: P,
    TransitionProps: O
  }), I = oh(D), F = x.useCallback(() => {
    if (f === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (p || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), p;
    const J = In(c), $ = J && J.nodeType === 1 ? J : Te(L.current).body, re = $.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ve = $.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ve.top === 0 && ve.left === 0 && ve.right === 0 && ve.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: re.top + wi(re, u.vertical),
      left: re.left + xi(re, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, p, f]), Q = x.useCallback((J) => ({
    vertical: wi(J, h.vertical),
    horizontal: xi(J, h.horizontal)
  }), [h.horizontal, h.vertical]), Z = x.useCallback((J) => {
    const $ = {
      width: J.offsetWidth,
      height: J.offsetHeight
    }, re = Q($);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Ei(re)
      };
    const ve = F();
    let Oe = ve.top - re.vertical, me = ve.left - re.horizontal;
    const lt = Oe + $.height, Se = me + $.width, Ge = _t(In(c)), Re = Ge.innerHeight - m, Ke = Ge.innerWidth - m;
    if (m !== null && Oe < m) {
      const we = Oe - m;
      Oe -= we, re.vertical += we;
    } else if (m !== null && lt > Re) {
      const we = lt - Re;
      Oe -= we, re.vertical += we;
    }
    if (process.env.NODE_ENV !== "production" && $.height > Re && $.height && Re && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${$.height - Re}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), m !== null && me < m) {
      const we = me - m;
      me -= we, re.horizontal += we;
    } else if (Se > Ke) {
      const we = Se - Ke;
      me -= we, re.horizontal += we;
    }
    return {
      top: `${Math.round(Oe)}px`,
      left: `${Math.round(me)}px`,
      transformOrigin: Ei(re)
    };
  }, [c, f, F, Q, m]), [S, A] = x.useState(E), U = x.useCallback(() => {
    const J = L.current;
    if (!J)
      return;
    const $ = Z(J);
    $.top !== null && (J.style.top = $.top), $.left !== null && (J.style.left = $.left), J.style.transformOrigin = $.transformOrigin, A(!0);
  }, [Z]);
  x.useEffect(() => (j && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, j, U]);
  const K = (J, $) => {
    B && B(J, $), U();
  }, z = () => {
    A(!1);
  };
  x.useEffect(() => {
    E && U();
  }), x.useImperativeHandle(l, () => E ? {
    updatePosition: () => {
      U();
    }
  } : null, [E, U]), x.useEffect(() => {
    if (!E)
      return;
    const J = Ki(() => {
      U();
    }), $ = _t(c);
    return $.addEventListener("resize", J), () => {
      J.clear(), $.removeEventListener("resize", J);
    };
  }, [c, E, U]);
  let H = P;
  P === "auto" && !C.muiSupportAuto && (H = void 0);
  const q = v || (c ? Te(In(c)).body : void 0), G = (o = y == null ? void 0 : y.root) != null ? o : ih, W = (i = y == null ? void 0 : y.paper) != null ? i : Wa, X = bt({
    elementType: W,
    externalSlotProps: k({}, R, {
      style: S ? R.style : k({}, R.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: g,
      ref: V
    },
    ownerState: D,
    className: Ee(I.paper, R == null ? void 0 : R.className)
  }), Y = bt({
    elementType: G,
    externalSlotProps: (w == null ? void 0 : w.root) || {},
    externalForwardedProps: N,
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
    className: Ee(I.root, b)
  }), {
    slotProps: ne
  } = Y, _ = ue(Y, rh);
  return /* @__PURE__ */ T(G, k({}, _, !ia(G) && {
    slotProps: ne,
    disableScrollLock: j
  }, {
    children: /* @__PURE__ */ T(C, k({
      appear: !0,
      in: E,
      onEntering: K,
      onExited: z,
      timeout: H
    }, O, {
      children: /* @__PURE__ */ T(W, k({}, X, {
        children: d
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (qa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Vr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Vt(a.oneOfType([Je, a.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = In(e.anchorEl);
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
  container: a.oneOfType([Je, a.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: a.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: ta,
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
    component: _l
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
const ah = qa;
function sh(e) {
  return qe("MuiMenu", e);
}
it("MuiMenu", ["root", "paper", "list"]);
const lh = ["onEntering"], ch = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], uh = {
  vertical: "top",
  horizontal: "right"
}, ph = {
  vertical: "top",
  horizontal: "left"
}, dh = (e) => {
  const {
    classes: t
  } = e;
  return et({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, sh, t);
}, fh = ke(ah, {
  shouldForwardProp: (e) => Oa(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), hh = ke(Wa, {
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
}), mh = ke(_f, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Ga = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o;
  const i = tt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: p = {},
    onClose: f,
    open: d,
    PaperProps: b = {},
    PopoverClasses: v,
    transitionDuration: g = "auto",
    TransitionProps: {
      onEntering: m
    } = {},
    variant: E = "selectedMenu",
    slots: M = {},
    slotProps: y = {}
  } = i, w = ue(i.TransitionProps, lh), h = ue(i, ch), C = wn(), P = C.direction === "rtl", B = k({}, i, {
    autoFocus: s,
    disableAutoFocusItem: u,
    MenuListProps: p,
    onEntering: m,
    PaperProps: b,
    transitionDuration: g,
    TransitionProps: w,
    variant: E
  }), j = dh(B), O = s && !u && d, N = x.useRef(null), R = (Z, S) => {
    N.current && N.current.adjustStyleForScrollbar(Z, C), m && m(Z, S);
  }, L = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), f && f(Z, "tabKeyDown"));
  };
  let V = -1;
  x.Children.map(l, (Z, S) => {
    /* @__PURE__ */ x.isValidElement(Z) && (process.env.NODE_ENV !== "production" && _n.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (E === "selectedMenu" && Z.props.selected || V === -1) && (V = S));
  });
  const D = (r = M.paper) != null ? r : hh, I = (o = y.paper) != null ? o : b, F = bt({
    elementType: M.root,
    externalSlotProps: y.root,
    ownerState: B,
    className: [j.root, c]
  }), Q = bt({
    elementType: D,
    externalSlotProps: I,
    ownerState: B,
    className: j.paper
  });
  return /* @__PURE__ */ T(fh, k({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: P ? "right" : "left"
    },
    transformOrigin: P ? uh : ph,
    slots: {
      paper: D,
      root: M.root
    },
    slotProps: {
      root: F,
      paper: Q
    },
    open: d,
    ref: n,
    transitionDuration: g,
    TransitionProps: k({
      onEntering: R
    }, w),
    ownerState: B
  }, h, {
    classes: v,
    children: /* @__PURE__ */ T(mh, k({
      onKeyDown: L,
      actions: N,
      autoFocus: s && (V === -1 || u),
      autoFocusItem: O,
      variant: E
    }, p, {
      className: Ee(j.list, p.className),
      children: l
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
  anchorEl: a.oneOfType([Je, a.func]),
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
const gh = Ga;
function Bh({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = $t.useState(void 0), s = xe(
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
  ), l = xe(() => {
    i(void 0);
  }, []), c = Lt(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = n == null ? void 0 : n.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ pe(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ T(
          gh,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ T(
              ao,
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
const bh = Ia(/* @__PURE__ */ T("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function vh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const _r = (e, t, n = {}) => {
  const r = ft(t);
  r.current = t;
  const o = ft(n);
  o.current = vh(o.current);
  const [i, s] = je(() => r.current), [l, c] = je(!0);
  return fn(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const p = await e();
        u && (s(() => p), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [i, l];
};
function yh({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, u] = je(!1), [p, f] = je(!1), d = xe(() => {
    c && u(!1), f(!1);
  }, [c]), b = xe((w) => {
    w.stopPropagation(), u((h) => {
      const C = !h;
      return C && w.shiftKey ? f(!0) : C || f(!1), C;
    });
  }, []), v = xe(
    (w) => (d(), r(w)),
    [r, d]
  ), [g, m] = je({ top: 1, left: 1 });
  fn(() => {
    if (c) {
      const w = o == null ? void 0 : o.current;
      if (w) {
        const h = w.getBoundingClientRect(), C = window.scrollY, P = window.scrollX, B = h.top + C + w.clientHeight, j = h.left + P;
        m({ top: B, left: j });
      }
    }
  }, [c, o]);
  const [E] = _r(
    xe(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [M] = _r(
    xe(async () => (e == null ? void 0 : e(!0)) ?? n ?? E, [e, n, E, c]),
    n ?? E
  ), y = p && M ? M : E;
  return /* @__PURE__ */ pe(Un, { children: [
    /* @__PURE__ */ T(
      Ni,
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
        children: l ?? /* @__PURE__ */ T(bh, {})
      }
    ),
    /* @__PURE__ */ T(
      Rs,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: d,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: g.top,
            left: g.left
          }
        },
        children: y ? /* @__PURE__ */ T(
          Sf,
          {
            className: i,
            id: `${s ?? ""} main menu`,
            commandHandler: v,
            multiColumnMenu: y
          }
        ) : void 0
      }
    )
  ] });
}
function Lh({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: s = "medium",
  className: l,
  onClick: c,
  children: u
}) {
  return /* @__PURE__ */ T(
    Ni,
    {
      id: e,
      disabled: n,
      edge: i,
      size: s,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: u
    }
  );
}
const wh = Si(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Ka = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ T(Ri.Root, { ref: n, className: ye(wh(), e), ...t }));
Ka.displayName = Ri.Root.displayName;
function zn({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  helperText: r,
  label: o,
  placeholder: i,
  isRequired: s = !1,
  className: l,
  defaultValue: c,
  value: u,
  onChange: p,
  onFocus: f,
  onBlur: d
}) {
  return /* @__PURE__ */ pe("div", { className: "pr-inline-grid pr-items-center pr-gap-1.5", children: [
    /* @__PURE__ */ T(
      Ka,
      {
        htmlFor: e,
        className: ye({
          "pr-text-red-600": n,
          "pr-hidden": !o
        }),
        children: `${o}${s ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ T(
      Lr,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: s,
        className: ye(l, { "pr-border-red-600": n }),
        defaultValue: c,
        value: u,
        onChange: p,
        onFocus: f,
        onBlur: d
      }
    ),
    /* @__PURE__ */ T("p", { className: ye({ "pr-hidden": !r }), children: r })
  ] });
}
let yr;
const wr = () => (yr || (yr = ce.allBookIds.map((e) => ({
  bookId: e,
  label: ce.bookIdToEnglishName(e)
}))), yr);
function Fh({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c, u) => {
    const f = { bookNum: ce.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(f);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, s = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = Lt(() => wr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ pe("span", { id: n, className: "pr-flex pr-place-items-center", children: [
    /* @__PURE__ */ T(
      Er,
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
    /* @__PURE__ */ T(
      xt,
      {
        onClick: () => r(Eo(e, -1)),
        isDisabled: e.bookNum <= cs,
        children: "<"
      }
    ),
    /* @__PURE__ */ T(
      xt,
      {
        onClick: () => r(Eo(e, 1)),
        isDisabled: e.bookNum >= wr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ T(
      zn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ T(
      xt,
      {
        onClick: () => t(To(e, -1)),
        isDisabled: e.chapterNum <= us,
        children: "<"
      }
    ),
    /* @__PURE__ */ T(
      xt,
      {
        onClick: () => t(To(e, 1)),
        isDisabled: e.chapterNum >= Oi(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ T(
      zn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ T(
      xt,
      {
        onClick: () => t(ko(e, -1)),
        isDisabled: e.verseNum <= ps,
        children: "<"
      }
    ),
    /* @__PURE__ */ T(xt, { onClick: () => t(ko(e, 1)), children: ">" })
  ] });
}
function Vh({ onSearch: e, placeholder: t }) {
  const [n, r] = je(""), o = (i) => {
    r(i), e(i);
  };
  return /* @__PURE__ */ T($s, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ T(
    zn,
    {
      className: "search-bar-input",
      placeholder: t,
      value: n,
      onChange: (i) => o(i.target.value)
    }
  ) });
}
function zh({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: s = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: u = "off",
  className: p,
  onChange: f,
  onChangeCommitted: d
}) {
  return /* @__PURE__ */ T(
    Ms,
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
      valueLabelDisplay: u,
      className: `papi-slider ${n} ${p ?? ""}`,
      onChange: f,
      onChangeCommitted: d
    }
  );
}
function Uh({
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
  return /* @__PURE__ */ T(
    Is,
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
function Hh({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ T(
    _s,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Ti({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return (
    // `as keyof R` reminds TypeScript of what it actually is
    // `as string` is just asserting that the input is a string because this is the default editor
    // used for all values. It will probably break on non-strings
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    /* @__PURE__ */ T(zn, { defaultValue: t[n.key], onChange: r })
  );
}
const xh = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ T(
  yl,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Wh({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: n,
  onColumnResize: r,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: u,
  enableSelectColumn: p,
  selectColumnWidth: f = 50,
  rowKeyGetter: d,
  rowHeight: b = 35,
  headerRowHeight: v = 35,
  selectedRows: g,
  onSelectedRowsChange: m,
  onRowsChange: E,
  onCellClick: M,
  onCellDoubleClick: y,
  onCellContextMenu: w,
  onCellKeyDown: h,
  direction: C = "ltr",
  enableVirtualization: P = !0,
  onCopy: B,
  onPaste: j,
  onScroll: O,
  className: N,
  "data-testid": R
}) {
  const L = Lt(() => {
    const V = e.map((D) => typeof D.editable == "function" ? {
      ...D,
      editable: (F) => !!D.editable(F),
      renderEditCell: D.renderEditCell || Ti
    } : D.editable && !D.renderEditCell ? { ...D, renderEditCell: Ti } : D.renderEditCell && !D.editable ? { ...D, editable: !1 } : D);
    return p ? [{ ...zs, minWidth: f }, ...V] : V;
  }, [e, p, f]);
  return /* @__PURE__ */ T(
    Vs,
    {
      columns: L,
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
      rows: u,
      rowKeyGetter: d,
      rowHeight: b,
      headerRowHeight: v,
      selectedRows: g,
      onSelectedRowsChange: m,
      onRowsChange: E,
      onCellClick: M,
      onCellDoubleClick: y,
      onCellContextMenu: w,
      onCellKeyDown: h,
      direction: C,
      enableVirtualization: P,
      onCopy: B,
      onPaste: j,
      onScroll: O,
      renderers: { renderCheckbox: xh },
      className: `papi-table ${N ?? "rdg-light"}`,
      "data-testid": R
    }
  );
}
function qh({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = ft(void 0);
  return /* @__PURE__ */ T("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ T(As, { position: "static", id: r, children: /* @__PURE__ */ pe(Ds, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ T(
      yh,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ T("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Gh = (e, t) => {
  fn(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, xr = () => !1, Kh = (e, t) => {
  const [n] = _r(
    xe(async () => {
      if (!e)
        return xr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    xr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  fn(() => () => {
    n !== xr && n();
  }, [n]);
};
function Eh(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Eh(`.papi-combo-box {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
}
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
.pr-top-1\\/2 {
    top: 50%;
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
.pr-h-9 {
    height: 2.25rem;
}
.pr-h-px {
    height: 1px;
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
.pr-min-w-\\[8rem\\] {
    min-width: 8rem;
}
.pr--translate-y-1\\/2 {
    --tw-translate-y: -50%;
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
.pr-self-stretch {
    align-self: stretch;
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
.pr-border-b-0 {
    border-bottom-width: 0px;
}
.pr-border-l-2 {
    border-left-width: 2px;
}
.pr-border-r-0 {
    border-right-width: 0px;
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
.pr-border-red-600 {
    --tw-border-opacity: 1;
    border-color: rgb(220 38 38 / var(--tw-border-opacity));
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
.pr-align-middle {
    vertical-align: middle;
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
.pr-text-destructive-foreground {
    color: hsl(var(--destructive-foreground));
}
.pr-text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity));
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
.hover\\:pr-bg-accent:hover {
    background-color: hsl(var(--accent));
}
.hover\\:pr-bg-destructive\\/90:hover {
    background-color: hsl(var(--destructive) / 0.9);
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
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
    --tw-bg-opacity: 1;
    background-color: rgb(254 243 199 / var(--tw-bg-opacity));
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
  Dh as BookChapterControl,
  xt as Button,
  jh as ChapterRangeSelector,
  yl as Checkbox,
  Er as ComboBox,
  Bh as ContextMenu,
  Sf as GridMenu,
  yh as HamburgerMenuButton,
  Lh as IconButton,
  Nt as LabelPosition,
  Aa as MenuItem,
  Fh as RefSelector,
  Vh as SearchBar,
  zh as Slider,
  Uh as Snackbar,
  Hh as Switch,
  Wh as Table,
  zn as TextField,
  qh as Toolbar,
  Gh as useEvent,
  Kh as useEventAsync,
  _r as usePromise
};
//# sourceMappingURL=index.js.map
