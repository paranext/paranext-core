import Ps, { jsxs as fe, jsx as T, Fragment as zr } from "react/jsx-runtime";
import * as x from "react";
import bt, { forwardRef as Cs, useState as Je, useRef as Bn, useCallback as Ze, useMemo as Ft, useEffect as Xn } from "react";
import { getChaptersForBook as $i, offsetBook as Co, FIRST_SCR_BOOK_NUM as Rs, offsetChapter as Ro, FIRST_SCR_CHAPTER_NUM as Ns, offsetVerse as No, FIRST_SCR_VERSE_NUM as _s } from "platform-bible-utils";
import * as ge from "@radix-ui/react-dropdown-menu";
import { ChevronRight as $s, Check as Ms, Circle as Is, History as As, Tally1 as Ds } from "lucide-react";
import we, { clsx as js } from "clsx";
import { twMerge as Bs } from "tailwind-merge";
import { Button as Ls, Autocomplete as Fs, TextField as Mi, FormControlLabel as _o, FormLabel as Vs, Checkbox as zs, MenuItem as Us, ListItemText as qs, ListItemIcon as Ii, Menu as Ws, Grid as Ai, List as Hs, IconButton as Di, Paper as Gs, Slider as Ks, Snackbar as Xs, Switch as Ys, AppBar as Js, Toolbar as Zs, Drawer as Qs } from "@mui/material";
import ji, { ThemeContext as el } from "@mui/styled-engine";
import * as tl from "react-dom";
import Cn from "react-dom";
import nl, { SelectColumn as rl } from "react-data-grid";
var ol = Object.defineProperty, il = (e, t, n) => t in e ? ol(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, te = (e, t, n) => (il(e, typeof t != "symbol" ? t + "" : t, n), n);
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
], Ur = [
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
], Bi = [
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
], $o = ml();
function Vt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in $o ? $o[e] : 0;
}
function qr(e) {
  return Vt(e) > 0;
}
function al(e) {
  const t = typeof e == "string" ? Vt(e) : e;
  return t >= 40 && t <= 66;
}
function sl(e) {
  return (typeof e == "string" ? Vt(e) : e) <= 39;
}
function Li(e) {
  return e <= 66;
}
function ll(e) {
  const t = typeof e == "string" ? Vt(e) : e;
  return zi(t) && !Li(t);
}
function* cl() {
  for (let e = 1; e <= yt.length; e++)
    yield e;
}
const ul = 1, Fi = yt.length;
function dl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Wr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= yt.length ? t : yt[n];
}
function Vi(e) {
  return e <= 0 || e > Fi ? "******" : Bi[e - 1];
}
function pl(e) {
  return Vi(Vt(e));
}
function zi(e) {
  const t = typeof e == "number" ? Wr(e) : e;
  return qr(t) && !Ur.includes(t);
}
function fl(e) {
  const t = typeof e == "number" ? Wr(e) : e;
  return qr(t) && Ur.includes(t);
}
function hl(e) {
  return Bi[e - 1].includes("*obsolete*");
}
function ml() {
  const e = {};
  for (let t = 0; t < yt.length; t++)
    e[yt[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: yt,
  nonCanonicalIds: Ur,
  bookIdToNumber: Vt,
  isBookIdValid: qr,
  isBookNT: al,
  isBookOT: sl,
  isBookOTNT: Li,
  isBookDC: ll,
  allBookNumbers: cl,
  firstBook: ul,
  lastBook: Fi,
  extraBooks: dl,
  bookNumberToId: Wr,
  bookNumberToEnglishName: Vi,
  bookIdToEnglishName: pl,
  isCanonical: zi,
  isExtraMaterial: fl,
  isObsolete: hl
};
var at = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(at || {});
const _e = class {
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
te(_e, "Original", new _e(at.Original)), te(_e, "Septuagint", new _e(at.Septuagint)), te(_e, "Vulgate", new _e(at.Vulgate)), te(_e, "English", new _e(at.English)), te(_e, "RussianProtestant", new _e(at.RussianProtestant)), te(_e, "RussianOrthodox", new _e(at.RussianOrthodox));
let _t = _e;
function Mo(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Ui = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ui || {});
const Se = class oe {
  constructor(t, n, r, o) {
    if (te(this, "firstChapter"), te(this, "lastChapter"), te(this, "lastVerse"), te(this, "hasSegmentsDefined"), te(this, "text"), te(this, "BBBCCCVVVS"), te(this, "longHashCode"), te(this, "versification"), te(this, "rtlMark", "‏"), te(this, "_bookNum", 0), te(this, "_chapterNum", 0), te(this, "_verseNum", 0), te(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof _t ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof _t ? n : void 0;
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
          const i = t instanceof _t ? t : oe.defaultVersification;
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
      if (r instanceof Yt)
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
    if (t <= 0 || t > me.lastBook)
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
    this.versification = this.versification != null ? new _t(t) : void 0;
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
          this.versification = new _t(at[s]);
        } catch {
          throw new Yt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Yt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || me.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(r[1]))
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
    const o = [], i = Mo(this._verse, r);
    for (const s of i.map((l) => Mo(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const u = this.clone();
        if (u.verse = s[1], !t)
          for (let d = c + 1; d < u.verseNum; d++) {
            const f = new oe(
              this._bookNum,
              this._chapterNum,
              d,
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > me.lastBook ? 2 : (me.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = oe.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = me.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
te(Se, "defaultVersification", _t.English), te(Se, "verseRangeSeparator", "-"), te(Se, "verseSequenceIndicator", ","), te(Se, "verseRangeSeparators", [Se.verseRangeSeparator]), te(Se, "verseSequenceIndicators", [Se.verseSequenceIndicator]), te(Se, "chapterDigitShifter", 1e3), te(Se, "bookDigitShifter", Se.chapterDigitShifter * Se.chapterDigitShifter), te(Se, "bcvMaxValue", Se.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
te(Se, "ValidStatusType", Ui);
class Yt extends Error {
}
function nt(...e) {
  return Bs(js(e));
}
const gl = ge.Root, bl = ge.Trigger, vl = x.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ fe(
  ge.SubTrigger,
  {
    ref: o,
    className: nt(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ T($s, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
vl.displayName = ge.SubTrigger.displayName;
const yl = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ T(
  ge.SubContent,
  {
    ref: n,
    className: nt(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
yl.displayName = ge.SubContent.displayName;
const qi = x.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ T(ge.Portal, { children: /* @__PURE__ */ T(
  ge.Content,
  {
    ref: r,
    sideOffset: t,
    className: nt(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
qi.displayName = ge.Content.displayName;
const Wi = x.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ T(
  ge.Item,
  {
    ref: r,
    className: nt(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
Wi.displayName = ge.Item.displayName;
const xl = x.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ fe(
  ge.CheckboxItem,
  {
    ref: o,
    className: nt(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ T("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ T(ge.ItemIndicator, { children: /* @__PURE__ */ T(Ms, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
xl.displayName = ge.CheckboxItem.displayName;
const wl = x.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ fe(
  ge.RadioItem,
  {
    ref: r,
    className: nt(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ T("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ T(ge.ItemIndicator, { children: /* @__PURE__ */ T(Is, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
wl.displayName = ge.RadioItem.displayName;
const Hi = x.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ T(
  ge.Label,
  {
    ref: r,
    className: nt("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
Hi.displayName = ge.Label.displayName;
const Gi = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ T(
  ge.Separator,
  {
    ref: n,
    className: nt("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Gi.displayName = ge.Separator.displayName;
const Ki = x.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ T(
    "input",
    {
      type: t,
      className: nt(
        "pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Ki.displayName = "Input";
const El = Cs(
  ({ handleSearch: e, ...t }, n) => /* @__PURE__ */ fe("div", { className: "input-container", children: [
    /* @__PURE__ */ T(
      Ki,
      {
        ...t,
        type: "text",
        className: "book-chapter-input",
        onChange: (r) => e(r.target.value),
        ref: n
      }
    ),
    /* @__PURE__ */ T("div", { className: "history-icon-container", children: /* @__PURE__ */ T(
      As,
      {
        size: 16,
        onClick: () => {
          console.log("back in history");
        }
      }
    ) })
  ] })
);
function Tl({ endChapter: e, activeChapter: t, handleSelectChapter: n }) {
  const r = Array.from({ length: e }, (o, i) => i + 1);
  return /* @__PURE__ */ T("div", { className: "chapter-select", children: r.map((o) => (
    // When adding onClick to <div> get error: Visible, non-interactive elements with click handlers must have at least one keyboard listener.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    /* @__PURE__ */ T(
      "div",
      {
        className: `chapter ${o === t ? "active" : void 0}`,
        onClick: () => n(o),
        children: o
      },
      o
    )
  )) });
}
function Ol({
  bookId: e,
  handleSelectBook: t,
  isSelected: n,
  bookType: r,
  children: o
}) {
  return /* @__PURE__ */ fe("div", { children: [
    /* @__PURE__ */ T(
      Wi,
      {
        textValue: e,
        className: `menu-item ${n && "selected"}`,
        onSelect: (i) => {
          i.preventDefault(), t(e);
        },
        children: /* @__PURE__ */ fe("div", { children: [
          /* @__PURE__ */ T(Ds, { className: `book-color-label ${r.toLowerCase()}` }),
          me.bookIdToEnglishName(e)
        ] })
      },
      e
    ),
    n && o
  ] });
}
const kl = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Sl = ["OT", "NT", "DC"];
function wm({ scrRef: e, handleSubmit: t }) {
  const { allBookIds: n } = me, [r, o] = Je(""), [i, s] = Je(""), l = Bn(void 0), c = Ze(
    (g) => ({
      OT: n.filter((h) => me.isBookOT(h)),
      NT: n.filter((h) => me.isBookNT(h)),
      DC: n.filter((h) => me.isBookDC(h))
    })[g],
    [n]
  ), u = Ze(
    (g) => c(g).filter(
      (m) => me.bookIdToEnglishName(m).toLowerCase().includes(r.toLowerCase()) || m.toLowerCase().includes(r.toLowerCase())
    ),
    [c, r]
  ), d = (g) => {
    o(g);
  }, f = Ze((g) => $i(me.bookIdToNumber(g)), []), p = (g) => {
    s(i !== g ? g : ""), f(g) === -1 && t({
      bookNum: me.bookIdToNumber(g),
      chapterNum: 1,
      verseNum: 1
    });
  }, v = (g) => {
    t({
      bookNum: me.bookIdToNumber(i),
      chapterNum: g,
      verseNum: 1
    });
  };
  return /* @__PURE__ */ T("div", { children: /* @__PURE__ */ fe(gl, { children: [
    /* @__PURE__ */ T(bl, { asChild: !0, children: /* @__PURE__ */ T(
      El,
      {
        ref: l,
        value: r,
        handleSearch: d,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ T(qi, { className: "menu-content", children: Sl.map((g) => /* @__PURE__ */ fe("div", { children: [
      /* @__PURE__ */ T(Hi, { className: "menu-label", children: kl[g] }),
      u(g).map((m) => /* @__PURE__ */ T("div", { children: /* @__PURE__ */ T(
        Ol,
        {
          bookId: m,
          handleSelectBook: () => p(m),
          isSelected: i === m,
          bookType: g,
          children: /* @__PURE__ */ T(
            Tl,
            {
              handleSelectChapter: v,
              endChapter: f(m),
              activeChapter: e.bookNum === me.bookIdToNumber(m) ? e.chapterNum : 0
            }
          )
        }
      ) }, m)),
      g === "OT" || g === "NT" ? /* @__PURE__ */ T(Gi, {}) : void 0
    ] }, g)) })
  ] }) });
}
function Ot({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ T(
    Ls,
    {
      id: e,
      disabled: t,
      className: `papi-button ${n ?? ""}`,
      onClick: r,
      onContextMenu: o,
      children: i
    }
  );
}
function Rr({
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
  onChange: d,
  onFocus: f,
  onBlur: p,
  getOptionLabel: v
}) {
  return /* @__PURE__ */ T(
    Fs,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: u,
      onChange: d,
      onFocus: f,
      onBlur: p,
      getOptionLabel: v,
      renderInput: (g) => /* @__PURE__ */ T(
        Mi,
        {
          ...g,
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
function Em({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o,
  chapterCount: i
}) {
  const s = Ft(
    () => Array.from({ length: i }, (u, d) => d + 1),
    [i]
  ), l = (u, d) => {
    n(d), d > t && r(d);
  }, c = (u, d) => {
    r(d), d < e && n(d);
  };
  return /* @__PURE__ */ fe(zr, { children: [
    /* @__PURE__ */ T(
      _o,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ T(
          Rr,
          {
            onChange: (u, d) => l(u, d),
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
      _o,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ T(
          Rr,
          {
            onChange: (u, d) => c(u, d),
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
var $t = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))($t || {});
function Pl({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = $t.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const d = /* @__PURE__ */ T(
    zs,
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
    const p = r === $t.Before || r === $t.Above, v = /* @__PURE__ */ T("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), g = r === $t.Before || r === $t.After, m = g ? v : /* @__PURE__ */ T("div", { children: v }), h = g ? d : /* @__PURE__ */ T("div", { children: d });
    f = /* @__PURE__ */ fe(
      Vs,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: l,
        children: [
          p && m,
          h,
          !p && m
        ]
      }
    );
  } else
    f = d;
  return f;
}
function ce(e, t) {
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
function Cl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function ct(e) {
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
var Nr = { exports: {} }, Rn = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Io;
function Rl() {
  if (Io)
    return ie;
  Io = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, g = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, _ = e ? Symbol.for("react.scope") : 60119;
  function y(b) {
    if (typeof b == "object" && b !== null) {
      var S = b.$$typeof;
      switch (S) {
        case t:
          switch (b = b.type, b) {
            case c:
            case u:
            case r:
            case i:
            case o:
            case f:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case l:
                case d:
                case g:
                case v:
                case s:
                  return b;
                default:
                  return S;
              }
          }
        case n:
          return S;
      }
    }
  }
  function w(b) {
    return y(b) === u;
  }
  return ie.AsyncMode = c, ie.ConcurrentMode = u, ie.ContextConsumer = l, ie.ContextProvider = s, ie.Element = t, ie.ForwardRef = d, ie.Fragment = r, ie.Lazy = g, ie.Memo = v, ie.Portal = n, ie.Profiler = i, ie.StrictMode = o, ie.Suspense = f, ie.isAsyncMode = function(b) {
    return w(b) || y(b) === c;
  }, ie.isConcurrentMode = w, ie.isContextConsumer = function(b) {
    return y(b) === l;
  }, ie.isContextProvider = function(b) {
    return y(b) === s;
  }, ie.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, ie.isForwardRef = function(b) {
    return y(b) === d;
  }, ie.isFragment = function(b) {
    return y(b) === r;
  }, ie.isLazy = function(b) {
    return y(b) === g;
  }, ie.isMemo = function(b) {
    return y(b) === v;
  }, ie.isPortal = function(b) {
    return y(b) === n;
  }, ie.isProfiler = function(b) {
    return y(b) === i;
  }, ie.isStrictMode = function(b) {
    return y(b) === o;
  }, ie.isSuspense = function(b) {
    return y(b) === f;
  }, ie.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === u || b === i || b === o || b === f || b === p || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === v || b.$$typeof === s || b.$$typeof === l || b.$$typeof === d || b.$$typeof === h || b.$$typeof === E || b.$$typeof === _ || b.$$typeof === m);
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
var Ao;
function Nl() {
  return Ao || (Ao = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, g = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, _ = e ? Symbol.for("react.scope") : 60119;
    function y(N) {
      return typeof N == "string" || typeof N == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      N === r || N === u || N === i || N === o || N === f || N === p || typeof N == "object" && N !== null && (N.$$typeof === g || N.$$typeof === v || N.$$typeof === s || N.$$typeof === l || N.$$typeof === d || N.$$typeof === h || N.$$typeof === E || N.$$typeof === _ || N.$$typeof === m);
    }
    function w(N) {
      if (typeof N == "object" && N !== null) {
        var J = N.$$typeof;
        switch (J) {
          case t:
            var C = N.type;
            switch (C) {
              case c:
              case u:
              case r:
              case i:
              case o:
              case f:
                return C;
              default:
                var re = C && C.$$typeof;
                switch (re) {
                  case l:
                  case d:
                  case g:
                  case v:
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
    var b = c, S = u, P = l, D = s, A = t, I = d, B = r, z = g, G = v, L = n, M = i, R = o, j = f, Q = !1;
    function Z(N) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(N) || w(N) === c;
    }
    function O(N) {
      return w(N) === u;
    }
    function $(N) {
      return w(N) === l;
    }
    function V(N) {
      return w(N) === s;
    }
    function K(N) {
      return typeof N == "object" && N !== null && N.$$typeof === t;
    }
    function F(N) {
      return w(N) === d;
    }
    function U(N) {
      return w(N) === r;
    }
    function W(N) {
      return w(N) === g;
    }
    function H(N) {
      return w(N) === v;
    }
    function q(N) {
      return w(N) === n;
    }
    function X(N) {
      return w(N) === i;
    }
    function Y(N) {
      return w(N) === o;
    }
    function ne(N) {
      return w(N) === f;
    }
    ae.AsyncMode = b, ae.ConcurrentMode = S, ae.ContextConsumer = P, ae.ContextProvider = D, ae.Element = A, ae.ForwardRef = I, ae.Fragment = B, ae.Lazy = z, ae.Memo = G, ae.Portal = L, ae.Profiler = M, ae.StrictMode = R, ae.Suspense = j, ae.isAsyncMode = Z, ae.isConcurrentMode = O, ae.isContextConsumer = $, ae.isContextProvider = V, ae.isElement = K, ae.isForwardRef = F, ae.isFragment = U, ae.isLazy = W, ae.isMemo = H, ae.isPortal = q, ae.isProfiler = X, ae.isStrictMode = Y, ae.isSuspense = ne, ae.isValidElementType = y, ae.typeOf = w;
  }()), ae;
}
var Do;
function Xi() {
  return Do || (Do = 1, process.env.NODE_ENV === "production" ? Rn.exports = Rl() : Rn.exports = Nl()), Rn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var pr, jo;
function _l() {
  if (jo)
    return pr;
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
      var c = Object.getOwnPropertyNames(s).map(function(d) {
        return s[d];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        u[d] = d;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return pr = o() ? Object.assign : function(i, s) {
    for (var l, c = r(i), u, d = 1; d < arguments.length; d++) {
      l = Object(arguments[d]);
      for (var f in l)
        t.call(l, f) && (c[f] = l[f]);
      if (e) {
        u = e(l);
        for (var p = 0; p < u.length; p++)
          n.call(l, u[p]) && (c[u[p]] = l[u[p]]);
      }
    }
    return c;
  }, pr;
}
var fr, Bo;
function Hr() {
  if (Bo)
    return fr;
  Bo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return fr = e, fr;
}
var hr, Lo;
function Yi() {
  return Lo || (Lo = 1, hr = Function.call.bind(Object.prototype.hasOwnProperty)), hr;
}
var mr, Fo;
function $l() {
  if (Fo)
    return mr;
  Fo = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Hr(), n = {}, r = Yi();
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
      for (var d in i)
        if (r(i, d)) {
          var f;
          try {
            if (typeof i[d] != "function") {
              var p = Error(
                (c || "React class") + ": " + l + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw p.name = "Invariant Violation", p;
            }
            f = i[d](s, d, c, l, null, t);
          } catch (g) {
            f = g;
          }
          if (f && !(f instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in n)) {
            n[f.message] = !0;
            var v = u ? u() : "";
            e(
              "Failed " + l + " type: " + f.message + (v ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, mr = o, mr;
}
var gr, Vo;
function Ml() {
  if (Vo)
    return gr;
  Vo = 1;
  var e = Xi(), t = _l(), n = Hr(), r = Yi(), o = $l(), i = function() {
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
  return gr = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function f(O) {
      var $ = O && (u && O[u] || O[d]);
      if (typeof $ == "function")
        return $;
    }
    var p = "<<anonymous>>", v = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: _(),
      arrayOf: y,
      element: w(),
      elementType: b(),
      instanceOf: S,
      node: I(),
      objectOf: D,
      oneOf: P,
      oneOfType: A,
      shape: z,
      exact: G
    };
    function g(O, $) {
      return O === $ ? O !== 0 || 1 / O === 1 / $ : O !== O && $ !== $;
    }
    function m(O, $) {
      this.message = O, this.data = $ && typeof $ == "object" ? $ : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function h(O) {
      if (process.env.NODE_ENV !== "production")
        var $ = {}, V = 0;
      function K(U, W, H, q, X, Y, ne) {
        if (q = q || p, Y = Y || H, ne !== n) {
          if (c) {
            var N = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw N.name = "Invariant Violation", N;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var J = q + ":" + H;
            !$[J] && // Avoid spamming the console because they are often not actionable except for lib authors
            V < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Y + "` prop on `" + q + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), $[J] = !0, V++);
          }
        }
        return W[H] == null ? U ? W[H] === null ? new m("The " + X + " `" + Y + "` is marked as required " + ("in `" + q + "`, but its value is `null`.")) : new m("The " + X + " `" + Y + "` is marked as required in " + ("`" + q + "`, but its value is `undefined`.")) : null : O(W, H, q, X, Y);
      }
      var F = K.bind(null, !1);
      return F.isRequired = K.bind(null, !0), F;
    }
    function E(O) {
      function $(V, K, F, U, W, H) {
        var q = V[K], X = R(q);
        if (X !== O) {
          var Y = j(q);
          return new m(
            "Invalid " + U + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return h($);
    }
    function _() {
      return h(s);
    }
    function y(O) {
      function $(V, K, F, U, W) {
        if (typeof O != "function")
          return new m("Property `" + W + "` of component `" + F + "` has invalid PropType notation inside arrayOf.");
        var H = V[K];
        if (!Array.isArray(H)) {
          var q = R(H);
          return new m("Invalid " + U + " `" + W + "` of type " + ("`" + q + "` supplied to `" + F + "`, expected an array."));
        }
        for (var X = 0; X < H.length; X++) {
          var Y = O(H, X, F, U, W + "[" + X + "]", n);
          if (Y instanceof Error)
            return Y;
        }
        return null;
      }
      return h($);
    }
    function w() {
      function O($, V, K, F, U) {
        var W = $[V];
        if (!l(W)) {
          var H = R(W);
          return new m("Invalid " + F + " `" + U + "` of type " + ("`" + H + "` supplied to `" + K + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(O);
    }
    function b() {
      function O($, V, K, F, U) {
        var W = $[V];
        if (!e.isValidElementType(W)) {
          var H = R(W);
          return new m("Invalid " + F + " `" + U + "` of type " + ("`" + H + "` supplied to `" + K + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(O);
    }
    function S(O) {
      function $(V, K, F, U, W) {
        if (!(V[K] instanceof O)) {
          var H = O.name || p, q = Z(V[K]);
          return new m("Invalid " + U + " `" + W + "` of type " + ("`" + q + "` supplied to `" + F + "`, expected ") + ("instance of `" + H + "`."));
        }
        return null;
      }
      return h($);
    }
    function P(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function $(V, K, F, U, W) {
        for (var H = V[K], q = 0; q < O.length; q++)
          if (g(H, O[q]))
            return null;
        var X = JSON.stringify(O, function(ne, N) {
          var J = j(N);
          return J === "symbol" ? String(N) : N;
        });
        return new m("Invalid " + U + " `" + W + "` of value `" + String(H) + "` " + ("supplied to `" + F + "`, expected one of " + X + "."));
      }
      return h($);
    }
    function D(O) {
      function $(V, K, F, U, W) {
        if (typeof O != "function")
          return new m("Property `" + W + "` of component `" + F + "` has invalid PropType notation inside objectOf.");
        var H = V[K], q = R(H);
        if (q !== "object")
          return new m("Invalid " + U + " `" + W + "` of type " + ("`" + q + "` supplied to `" + F + "`, expected an object."));
        for (var X in H)
          if (r(H, X)) {
            var Y = O(H, X, F, U, W + "." + X, n);
            if (Y instanceof Error)
              return Y;
          }
        return null;
      }
      return h($);
    }
    function A(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var $ = 0; $ < O.length; $++) {
        var V = O[$];
        if (typeof V != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Q(V) + " at index " + $ + "."
          ), s;
      }
      function K(F, U, W, H, q) {
        for (var X = [], Y = 0; Y < O.length; Y++) {
          var ne = O[Y], N = ne(F, U, W, H, q, n);
          if (N == null)
            return null;
          N.data && r(N.data, "expectedType") && X.push(N.data.expectedType);
        }
        var J = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new m("Invalid " + H + " `" + q + "` supplied to " + ("`" + W + "`" + J + "."));
      }
      return h(K);
    }
    function I() {
      function O($, V, K, F, U) {
        return L($[V]) ? null : new m("Invalid " + F + " `" + U + "` supplied to " + ("`" + K + "`, expected a ReactNode."));
      }
      return h(O);
    }
    function B(O, $, V, K, F) {
      return new m(
        (O || "React class") + ": " + $ + " type `" + V + "." + K + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + F + "`."
      );
    }
    function z(O) {
      function $(V, K, F, U, W) {
        var H = V[K], q = R(H);
        if (q !== "object")
          return new m("Invalid " + U + " `" + W + "` of type `" + q + "` " + ("supplied to `" + F + "`, expected `object`."));
        for (var X in O) {
          var Y = O[X];
          if (typeof Y != "function")
            return B(F, U, W, X, j(Y));
          var ne = Y(H, X, F, U, W + "." + X, n);
          if (ne)
            return ne;
        }
        return null;
      }
      return h($);
    }
    function G(O) {
      function $(V, K, F, U, W) {
        var H = V[K], q = R(H);
        if (q !== "object")
          return new m("Invalid " + U + " `" + W + "` of type `" + q + "` " + ("supplied to `" + F + "`, expected `object`."));
        var X = t({}, V[K], O);
        for (var Y in X) {
          var ne = O[Y];
          if (r(O, Y) && typeof ne != "function")
            return B(F, U, W, Y, j(ne));
          if (!ne)
            return new m(
              "Invalid " + U + " `" + W + "` key `" + Y + "` supplied to `" + F + "`.\nBad object: " + JSON.stringify(V[K], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var N = ne(H, Y, F, U, W + "." + Y, n);
          if (N)
            return N;
        }
        return null;
      }
      return h($);
    }
    function L(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(L);
          if (O === null || l(O))
            return !0;
          var $ = f(O);
          if ($) {
            var V = $.call(O), K;
            if ($ !== O.entries) {
              for (; !(K = V.next()).done; )
                if (!L(K.value))
                  return !1;
            } else
              for (; !(K = V.next()).done; ) {
                var F = K.value;
                if (F && !L(F[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function M(O, $) {
      return O === "symbol" ? !0 : $ ? $["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && $ instanceof Symbol : !1;
    }
    function R(O) {
      var $ = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : M($, O) ? "symbol" : $;
    }
    function j(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var $ = R(O);
      if ($ === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return $;
    }
    function Q(O) {
      var $ = j(O);
      switch ($) {
        case "array":
        case "object":
          return "an " + $;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + $;
        default:
          return $;
      }
    }
    function Z(O) {
      return !O.constructor || !O.constructor.name ? p : O.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, gr;
}
var br, zo;
function Il() {
  if (zo)
    return br;
  zo = 1;
  var e = Hr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, br = function() {
    function r(s, l, c, u, d, f) {
      if (f !== e) {
        var p = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw p.name = "Invariant Violation", p;
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
  }, br;
}
if (process.env.NODE_ENV !== "production") {
  var Al = Xi(), Dl = !0;
  Nr.exports = Ml()(Al.isElement, Dl);
} else
  Nr.exports = Il()();
var jl = Nr.exports;
const a = /* @__PURE__ */ Cl(jl), Uo = {};
function Bl(e, t) {
  const n = x.useRef(Uo);
  return n.current === Uo && (n.current = e(t)), n;
}
const Ll = [];
function Fl(e) {
  x.useEffect(e, Ll);
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
function tn() {
  const e = Bl(mn.create).current;
  return Fl(e.disposeEffect), e;
}
function zt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function Vl(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Ji(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !Vl(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Zi = zt(a.element, Ji);
Zi.isRequired = zt(a.element.isRequired, Ji);
const gn = Zi;
function Qi(e) {
  return typeof e == "string";
}
function nn(e, t, n) {
  return e === void 0 || Qi(e) ? t : k({}, t, {
    ownerState: k({}, t.ownerState, n)
  });
}
const zl = {
  disableDefaultClasses: !1
}, ea = /* @__PURE__ */ x.createContext(zl);
process.env.NODE_ENV !== "production" && (ea.displayName = "ClassNameConfiguratorContext");
function Ul(e) {
  const {
    disableDefaultClasses: t
  } = x.useContext(ea);
  return (n) => t ? "" : e(n);
}
function ta(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function ql(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function st(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function na(e) {
  if (!st(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = na(e[n]);
  }), t;
}
function Ue(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? k({}, e) : e;
  return st(e) && st(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (st(t[o]) && o in e && st(e[o]) ? r[o] = Ue(e[o], t[o], n) : n.clone ? r[o] = st(t[o]) ? na(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
const Wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ue,
  isPlainObject: st
}, Symbol.toStringTag, { value: "Module" }));
function Hl(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Gl(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !Hl(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Kl = zt(a.elementType, Gl), Xl = "exact-prop: ​";
function ra(e) {
  return process.env.NODE_ENV === "production" ? e : k({}, e, {
    [Xl]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function cn(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
const Yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cn
}, Symbol.toStringTag, { value: "Module" }));
var _r = { exports: {} }, se = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qo;
function Jl() {
  if (qo)
    return se;
  qo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), g;
  g = Symbol.for("react.module.reference");
  function m(h) {
    if (typeof h == "object" && h !== null) {
      var E = h.$$typeof;
      switch (E) {
        case e:
          switch (h = h.type, h) {
            case n:
            case o:
            case r:
            case u:
            case d:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case s:
                case c:
                case p:
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
  return se.ContextConsumer = s, se.ContextProvider = i, se.Element = e, se.ForwardRef = c, se.Fragment = n, se.Lazy = p, se.Memo = f, se.Portal = t, se.Profiler = o, se.StrictMode = r, se.Suspense = u, se.SuspenseList = d, se.isAsyncMode = function() {
    return !1;
  }, se.isConcurrentMode = function() {
    return !1;
  }, se.isContextConsumer = function(h) {
    return m(h) === s;
  }, se.isContextProvider = function(h) {
    return m(h) === i;
  }, se.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, se.isForwardRef = function(h) {
    return m(h) === c;
  }, se.isFragment = function(h) {
    return m(h) === n;
  }, se.isLazy = function(h) {
    return m(h) === p;
  }, se.isMemo = function(h) {
    return m(h) === f;
  }, se.isPortal = function(h) {
    return m(h) === t;
  }, se.isProfiler = function(h) {
    return m(h) === o;
  }, se.isStrictMode = function(h) {
    return m(h) === r;
  }, se.isSuspense = function(h) {
    return m(h) === u;
  }, se.isSuspenseList = function(h) {
    return m(h) === d;
  }, se.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === u || h === d || h === v || typeof h == "object" && h !== null && (h.$$typeof === p || h.$$typeof === f || h.$$typeof === i || h.$$typeof === s || h.$$typeof === c || h.$$typeof === g || h.getModuleId !== void 0);
  }, se.typeOf = m, se;
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
var Wo;
function Zl() {
  return Wo || (Wo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), g = !1, m = !1, h = !1, E = !1, _ = !1, y;
    y = Symbol.for("react.module.reference");
    function w(C) {
      return !!(typeof C == "string" || typeof C == "function" || C === n || C === o || _ || C === r || C === u || C === d || E || C === v || g || m || h || typeof C == "object" && C !== null && (C.$$typeof === p || C.$$typeof === f || C.$$typeof === i || C.$$typeof === s || C.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      C.$$typeof === y || C.getModuleId !== void 0));
    }
    function b(C) {
      if (typeof C == "object" && C !== null) {
        var re = C.$$typeof;
        switch (re) {
          case e:
            var ye = C.type;
            switch (ye) {
              case n:
              case o:
              case r:
              case u:
              case d:
                return ye;
              default:
                var Oe = ye && ye.$$typeof;
                switch (Oe) {
                  case l:
                  case s:
                  case c:
                  case p:
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
    var S = s, P = i, D = e, A = c, I = n, B = p, z = f, G = t, L = o, M = r, R = u, j = d, Q = !1, Z = !1;
    function O(C) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function $(C) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function V(C) {
      return b(C) === s;
    }
    function K(C) {
      return b(C) === i;
    }
    function F(C) {
      return typeof C == "object" && C !== null && C.$$typeof === e;
    }
    function U(C) {
      return b(C) === c;
    }
    function W(C) {
      return b(C) === n;
    }
    function H(C) {
      return b(C) === p;
    }
    function q(C) {
      return b(C) === f;
    }
    function X(C) {
      return b(C) === t;
    }
    function Y(C) {
      return b(C) === o;
    }
    function ne(C) {
      return b(C) === r;
    }
    function N(C) {
      return b(C) === u;
    }
    function J(C) {
      return b(C) === d;
    }
    le.ContextConsumer = S, le.ContextProvider = P, le.Element = D, le.ForwardRef = A, le.Fragment = I, le.Lazy = B, le.Memo = z, le.Portal = G, le.Profiler = L, le.StrictMode = M, le.Suspense = R, le.SuspenseList = j, le.isAsyncMode = O, le.isConcurrentMode = $, le.isContextConsumer = V, le.isContextProvider = K, le.isElement = F, le.isForwardRef = U, le.isFragment = W, le.isLazy = H, le.isMemo = q, le.isPortal = X, le.isProfiler = Y, le.isStrictMode = ne, le.isSuspense = N, le.isSuspenseList = J, le.isValidElementType = w, le.typeOf = b;
  }()), le;
}
process.env.NODE_ENV === "production" ? _r.exports = Jl() : _r.exports = Zl();
var Ln = _r.exports;
const Ql = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function oa(e) {
  const t = `${e}`.match(Ql);
  return t && t[1] || "";
}
function ia(e, t = "") {
  return e.displayName || e.name || oa(e) || t;
}
function Ho(e, t, n) {
  const r = ia(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function ec(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ia(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ln.ForwardRef:
          return Ho(e, e.render, "ForwardRef");
        case Ln.Memo:
          return Ho(e, e.type, "memo");
        default:
          return;
      }
  }
}
const tc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ec,
  getFunctionName: oa
}, Symbol.toStringTag, { value: "Module" }));
function Qe(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const nc = a.oneOfType([a.func, a.object]), Gr = nc;
function We(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : cn(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const rc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: We
}, Symbol.toStringTag, { value: "Module" }));
function $r(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function aa(e, t = 166) {
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
function oc(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function ic(e, t) {
  var n, r;
  return /* @__PURE__ */ x.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Ee(e) {
  return e && e.ownerDocument || document;
}
function At(e) {
  return Ee(e).defaultView || window;
}
function ac(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? k({}, t.propTypes) : null;
  return (o) => (i, s, l, c, u, ...d) => {
    const f = u || s, p = n == null ? void 0 : n[f];
    if (p) {
      const v = p(i, s, l, c, u, ...d);
      if (v)
        return v;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Fn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const sc = typeof window < "u" ? x.useLayoutEffect : x.useEffect, xt = sc;
let Go = 0;
function lc(e) {
  const [t, n] = x.useState(e), r = e || t;
  return x.useEffect(() => {
    t == null && (Go += 1, n(`mui-${Go}`));
  }, [t]), r;
}
const Ko = x["useId".toString()];
function sa(e) {
  if (Ko !== void 0) {
    const t = Ko();
    return e ?? t;
  }
  return lc(e);
}
function cc(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function la({
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
function un(e) {
  const t = x.useRef(e);
  return xt(() => {
    t.current = e;
  }), x.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Be(...e) {
  return x.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Fn(n, t);
    });
  }, e);
}
let Yn = !0, Mr = !1;
const uc = new mn(), dc = {
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
function pc(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && dc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function fc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Yn = !0);
}
function vr() {
  Yn = !1;
}
function hc() {
  this.visibilityState === "hidden" && Mr && (Yn = !0);
}
function mc(e) {
  e.addEventListener("keydown", fc, !0), e.addEventListener("mousedown", vr, !0), e.addEventListener("pointerdown", vr, !0), e.addEventListener("touchstart", vr, !0), e.addEventListener("visibilitychange", hc, !0);
}
function gc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Yn || pc(t);
}
function ca() {
  const e = x.useCallback((o) => {
    o != null && mc(o.ownerDocument);
  }, []), t = x.useRef(!1);
  function n() {
    return t.current ? (Mr = !0, uc.start(100, () => {
      Mr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return gc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function ua(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function bc(e) {
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
function vc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const yc = Number.isInteger || vc;
function da(e, t, n, r) {
  const o = e[t];
  if (o == null || !yc(o)) {
    const i = bc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function pa(e, t, ...n) {
  return e[t] === void 0 ? null : da(e, t, ...n);
}
function Ir() {
  return null;
}
pa.isRequired = da;
Ir.isRequired = Ir;
const fa = process.env.NODE_ENV === "production" ? Ir : pa;
function ha(e, t) {
  const n = k({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = k({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = k({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = ha(o[s], i[s]);
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
const Xo = (e) => e, xc = () => {
  let e = Xo;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Xo;
    }
  };
}, wc = xc(), ma = wc, ga = {
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
  const r = ga[t];
  return r ? `${n}-${r}` : `${ma.generate(e)}-${t}`;
}
function ut(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Ge(e, o, n);
  }), r;
}
function Ec(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
const Tc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ec
}, Symbol.toStringTag, { value: "Module" }));
function Yo(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Oc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const v = we(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), g = k({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = k({}, n, o, r);
    return v.length > 0 && (m.className = v), Object.keys(g).length > 0 && (m.style = g), {
      props: m,
      internalRef: void 0
    };
  }
  const s = ta(k({}, o, r)), l = Yo(r), c = Yo(o), u = t(s), d = we(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = k({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), p = k({}, u, n, c, l);
  return d.length > 0 && (p.className = d), Object.keys(f).length > 0 && (p.style = f), {
    props: p,
    internalRef: u.ref
  };
}
const kc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function wt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = ce(e, kc), l = i ? {} : ql(r, o), {
    props: c,
    internalRef: u
  } = Oc(k({}, s, {
    externalSlotProps: l
  })), d = Be(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return nn(n, k({}, c, {
    ref: d
  }), o);
}
var be = {}, ba = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ba);
var Kr = ba.exports;
const Sc = /* @__PURE__ */ ct(Yl), Pc = /* @__PURE__ */ ct(Tc);
var va = Kr;
Object.defineProperty(be, "__esModule", {
  value: !0
});
var Vn = be.alpha = Ea;
be.blend = Lc;
be.colorChannel = void 0;
var Cc = be.darken = Yr;
be.decomposeColor = Le;
be.emphasize = Bc;
var Jo = be.getContrastRatio = Ic;
be.getLuminance = zn;
be.hexToRgb = ya;
be.hslToRgb = wa;
var Rc = be.lighten = Jr;
be.private_safeAlpha = Ac;
be.private_safeColorChannel = void 0;
be.private_safeDarken = Dc;
be.private_safeEmphasize = Ta;
be.private_safeLighten = jc;
be.recomposeColor = Ut;
be.rgbToHex = Mc;
var Zo = va(Sc), Nc = va(Pc);
function Xr(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), (0, Nc.default)(e, t, n);
}
function ya(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function _c(e) {
  const t = e.toString(16);
  return t.length === 1 ? `0${t}` : t;
}
function Le(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Le(ya(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : (0, Zo.default)(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : (0, Zo.default)(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
const xa = (e) => {
  const t = Le(e);
  return t.values.slice(0, 3).map((n, r) => t.type.indexOf("hsl") !== -1 && r !== 0 ? `${n}%` : n).join(" ");
};
be.colorChannel = xa;
const $c = (e, t) => {
  try {
    return xa(e);
  } catch {
    return t && process.env.NODE_ENV !== "production" && console.warn(t), e;
  }
};
be.private_safeColorChannel = $c;
function Ut(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Mc(e) {
  if (e.indexOf("#") === 0)
    return e;
  const {
    values: t
  } = Le(e);
  return `#${t.map((n, r) => _c(r === 3 ? Math.round(255 * n) : n)).join("")}`;
}
function wa(e) {
  e = Le(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (u, d = (u + n / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Ut({
    type: l,
    values: c
  });
}
function zn(e) {
  e = Le(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Le(wa(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ic(e, t) {
  const n = zn(e), r = zn(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Ea(e, t) {
  return e = Le(e), t = Xr(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Ut(e);
}
function Ac(e, t, n) {
  try {
    return Ea(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Yr(e, t) {
  if (e = Le(e), t = Xr(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Ut(e);
}
function Dc(e, t, n) {
  try {
    return Yr(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Jr(e, t) {
  if (e = Le(e), t = Xr(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Ut(e);
}
function jc(e, t, n) {
  try {
    return Jr(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Bc(e, t = 0.15) {
  return zn(e) > 0.5 ? Yr(e, t) : Jr(e, t);
}
function Ta(e, t, n) {
  try {
    return Ta(e, t);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
}
function Lc(e, t, n, r = 1) {
  const o = (c, u) => Math.round((c ** (1 / r) * (1 - n) + u ** (1 / r) * n) ** r), i = Le(e), s = Le(t), l = [o(i.values[0], s.values[0]), o(i.values[1], s.values[1]), o(i.values[2], s.values[2])];
  return Ut({
    type: "rgb",
    values: l
  });
}
var bn = {}, yr = { exports: {} }, Qo;
function Fc() {
  return Qo || (Qo = 1, function(e) {
    function t() {
      return e.exports = t = Object.assign ? Object.assign.bind() : function(n) {
        for (var r = 1; r < arguments.length; r++) {
          var o = arguments[r];
          for (var i in o)
            Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i]);
        }
        return n;
      }, e.exports.__esModule = !0, e.exports.default = e.exports, t.apply(this, arguments);
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  }(yr)), yr.exports;
}
var xr = { exports: {} }, ei;
function Vc() {
  return ei || (ei = 1, function(e) {
    function t(n, r) {
      if (n == null)
        return {};
      var o = {}, i = Object.keys(n), s, l;
      for (l = 0; l < i.length; l++)
        s = i[l], !(r.indexOf(s) >= 0) && (o[s] = n[s]);
      return o;
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  }(xr)), xr.exports;
}
const zc = /* @__PURE__ */ ct(Wl), Uc = /* @__PURE__ */ ct(rc), qc = /* @__PURE__ */ ct(tc), Wc = ["values", "unit", "step"], Hc = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => k({}, n, {
    [r.key]: r.val
  }), {});
};
function Oa(e) {
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
  } = e, o = ce(e, Wc), i = Hc(t), s = Object.keys(i);
  function l(p) {
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n})`;
  }
  function c(p) {
    return `@media (max-width:${(typeof t[p] == "number" ? t[p] : p) - r / 100}${n})`;
  }
  function u(p, v) {
    const g = s.indexOf(v);
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n}) and (max-width:${(g !== -1 && typeof t[s[g]] == "number" ? t[s[g]] : v) - r / 100}${n})`;
  }
  function d(p) {
    return s.indexOf(p) + 1 < s.length ? u(p, s[s.indexOf(p) + 1]) : l(p);
  }
  function f(p) {
    const v = s.indexOf(p);
    return v === 0 ? l(s[1]) : v === s.length - 1 ? c(s[v]) : u(p, s[s.indexOf(p) + 1]).replace("@media", "@media not all and");
  }
  return k({
    keys: s,
    values: i,
    up: l,
    down: c,
    between: u,
    only: d,
    not: f,
    unit: n
  }, o);
}
const Gc = {
  borderRadius: 4
}, Kc = Gc, Xc = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, dt = Xc;
function on(e, t) {
  return t ? Ue(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Zr = {
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
}, ti = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Zr[e]}px)`
};
function et(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || ti;
    return t.reduce((s, l, c) => (s[i.up(i.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || ti;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || Zr).indexOf(l) !== -1) {
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
function Yc(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function Jc(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function Jn(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Un(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = Jn(e, n) || r, t && (o = t(o, r, e)), o;
}
function ve(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const l = s[t], c = s.theme, u = Jn(c, r) || {};
    return et(s, l, (f) => {
      let p = Un(u, o, f);
      return f === p && typeof f == "string" && (p = Un(u, o, `${t}${f === "default" ? "" : We(f)}`, f)), n === !1 ? p : {
        [n]: p
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: dt
  } : {}, i.filterProps = [t], i;
}
function Zc(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const Qc = {
  m: "margin",
  p: "padding"
}, eu = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, ni = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, tu = Zc((e) => {
  if (e.length > 2)
    if (ni[e])
      e = ni[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Qc[t], o = eu[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Zn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Qn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], nu = [...Zn, ...Qn];
function vn(e, t, n, r) {
  var o;
  const i = (o = Jn(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ka(e) {
  return vn(e, "spacing", 8, "spacing");
}
function yn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function ru(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = yn(t, n), r), {});
}
function ou(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = tu(n), i = ru(o, r), s = e[n];
  return et(e, s, i);
}
function Sa(e, t) {
  const n = ka(e.theme);
  return Object.keys(e).map((r) => ou(e, t, r, n)).reduce(on, {});
}
function de(e) {
  return Sa(e, Zn);
}
de.propTypes = process.env.NODE_ENV !== "production" ? Zn.reduce((e, t) => (e[t] = dt, e), {}) : {};
de.filterProps = Zn;
function pe(e) {
  return Sa(e, Qn);
}
pe.propTypes = process.env.NODE_ENV !== "production" ? Qn.reduce((e, t) => (e[t] = dt, e), {}) : {};
pe.filterProps = Qn;
process.env.NODE_ENV !== "production" && nu.reduce((e, t) => (e[t] = dt, e), {});
function iu(e = 8) {
  if (e.mui)
    return e;
  const t = ka({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function er(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? on(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function De(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function ze(e, t) {
  return ve({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const au = ze("border", De), su = ze("borderTop", De), lu = ze("borderRight", De), cu = ze("borderBottom", De), uu = ze("borderLeft", De), du = ze("borderColor"), pu = ze("borderTopColor"), fu = ze("borderRightColor"), hu = ze("borderBottomColor"), mu = ze("borderLeftColor"), gu = ze("outline", De), bu = ze("outlineColor"), tr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = vn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: yn(t, r)
    });
    return et(e, e.borderRadius, n);
  }
  return null;
};
tr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: dt
} : {};
tr.filterProps = ["borderRadius"];
er(au, su, lu, cu, uu, du, pu, fu, hu, mu, tr, gu, bu);
const nr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = vn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: yn(t, r)
    });
    return et(e, e.gap, n);
  }
  return null;
};
nr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: dt
} : {};
nr.filterProps = ["gap"];
const rr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = vn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: yn(t, r)
    });
    return et(e, e.columnGap, n);
  }
  return null;
};
rr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: dt
} : {};
rr.filterProps = ["columnGap"];
const or = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = vn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: yn(t, r)
    });
    return et(e, e.rowGap, n);
  }
  return null;
};
or.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: dt
} : {};
or.filterProps = ["rowGap"];
const vu = ve({
  prop: "gridColumn"
}), yu = ve({
  prop: "gridRow"
}), xu = ve({
  prop: "gridAutoFlow"
}), wu = ve({
  prop: "gridAutoColumns"
}), Eu = ve({
  prop: "gridAutoRows"
}), Tu = ve({
  prop: "gridTemplateColumns"
}), Ou = ve({
  prop: "gridTemplateRows"
}), ku = ve({
  prop: "gridTemplateAreas"
}), Su = ve({
  prop: "gridArea"
});
er(nr, rr, or, vu, yu, xu, wu, Eu, Tu, Ou, ku, Su);
function It(e, t) {
  return t === "grey" ? t : e;
}
const Pu = ve({
  prop: "color",
  themeKey: "palette",
  transform: It
}), Cu = ve({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: It
}), Ru = ve({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: It
});
er(Pu, Cu, Ru);
function $e(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Nu = ve({
  prop: "width",
  transform: $e
}), Qr = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Zr[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: $e(n)
      };
    };
    return et(e, e.maxWidth, t);
  }
  return null;
};
Qr.filterProps = ["maxWidth"];
const _u = ve({
  prop: "minWidth",
  transform: $e
}), $u = ve({
  prop: "height",
  transform: $e
}), Mu = ve({
  prop: "maxHeight",
  transform: $e
}), Iu = ve({
  prop: "minHeight",
  transform: $e
});
ve({
  prop: "size",
  cssProperty: "width",
  transform: $e
});
ve({
  prop: "size",
  cssProperty: "height",
  transform: $e
});
const Au = ve({
  prop: "boxSizing"
});
er(Nu, Qr, _u, $u, Mu, Iu, Au);
const Du = {
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
    style: tr
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
    style: pe
  },
  pt: {
    style: pe
  },
  pr: {
    style: pe
  },
  pb: {
    style: pe
  },
  pl: {
    style: pe
  },
  px: {
    style: pe
  },
  py: {
    style: pe
  },
  padding: {
    style: pe
  },
  paddingTop: {
    style: pe
  },
  paddingRight: {
    style: pe
  },
  paddingBottom: {
    style: pe
  },
  paddingLeft: {
    style: pe
  },
  paddingX: {
    style: pe
  },
  paddingY: {
    style: pe
  },
  paddingInline: {
    style: pe
  },
  paddingInlineStart: {
    style: pe
  },
  paddingInlineEnd: {
    style: pe
  },
  paddingBlock: {
    style: pe
  },
  paddingBlockStart: {
    style: pe
  },
  paddingBlockEnd: {
    style: pe
  },
  m: {
    style: de
  },
  mt: {
    style: de
  },
  mr: {
    style: de
  },
  mb: {
    style: de
  },
  ml: {
    style: de
  },
  mx: {
    style: de
  },
  my: {
    style: de
  },
  margin: {
    style: de
  },
  marginTop: {
    style: de
  },
  marginRight: {
    style: de
  },
  marginBottom: {
    style: de
  },
  marginLeft: {
    style: de
  },
  marginX: {
    style: de
  },
  marginY: {
    style: de
  },
  marginInline: {
    style: de
  },
  marginInlineStart: {
    style: de
  },
  marginInlineEnd: {
    style: de
  },
  marginBlock: {
    style: de
  },
  marginBlockStart: {
    style: de
  },
  marginBlockEnd: {
    style: de
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
    style: nr
  },
  rowGap: {
    style: or
  },
  columnGap: {
    style: rr
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
    transform: $e
  },
  maxWidth: {
    style: Qr
  },
  minWidth: {
    transform: $e
  },
  height: {
    transform: $e
  },
  maxHeight: {
    transform: $e
  },
  minHeight: {
    transform: $e
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
}, xn = Du;
function ju(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Bu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Pa() {
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
      transform: d,
      style: f
    } = l;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const p = Jn(o, u) || {};
    return f ? f(s) : et(s, r, (g) => {
      let m = Un(p, d, g);
      return g === m && typeof g == "string" && (m = Un(p, d, `${n}${g === "default" ? "" : We(g)}`, g)), c === !1 ? m : {
        [c]: m
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
    const s = (r = i.unstable_sxConfig) != null ? r : xn;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const d = Yc(i.breakpoints), f = Object.keys(d);
      let p = d;
      return Object.keys(u).forEach((v) => {
        const g = Bu(u[v], i);
        if (g != null)
          if (typeof g == "object")
            if (s[v])
              p = on(p, e(v, g, i, s));
            else {
              const m = et({
                theme: i
              }, g, (h) => ({
                [v]: h
              }));
              ju(m, g) ? p[v] = t({
                sx: g,
                theme: i
              }) : p = on(p, m);
            }
          else
            p = on(p, e(v, g, i, s));
      }), Jc(f, p);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Ca = Pa();
Ca.filterProps = ["sx"];
const eo = Ca;
function Ra(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const Lu = ["breakpoints", "palette", "spacing", "shape"];
function to(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = ce(e, Lu), l = Oa(n), c = iu(o);
  let u = Ue({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: k({
      mode: "light"
    }, r),
    spacing: c,
    shape: k({}, Kc, i)
  }, s);
  return u.applyStyles = Ra, u = t.reduce((d, f) => Ue(d, f), u), u.unstable_sxConfig = k({}, xn, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(f) {
    return eo({
      sx: f,
      theme: this
    });
  }, u;
}
const Fu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: to,
  private_createBreakpoints: Oa,
  unstable_applyStyles: Ra
}, Symbol.toStringTag, { value: "Module" })), Vu = /* @__PURE__ */ ct(Fu), zu = ["sx"], Uu = (e) => {
  var t, n;
  const r = {
    systemProps: {},
    otherProps: {}
  }, o = (t = e == null || (n = e.theme) == null ? void 0 : n.unstable_sxConfig) != null ? t : xn;
  return Object.keys(e).forEach((i) => {
    o[i] ? r.systemProps[i] = e[i] : r.otherProps[i] = e[i];
  }), r;
};
function qu(e) {
  const {
    sx: t
  } = e, n = ce(e, zu), {
    systemProps: r,
    otherProps: o
  } = Uu(n);
  let i;
  return Array.isArray(t) ? i = [r, ...t] : typeof t == "function" ? i = (...s) => {
    const l = t(...s);
    return st(l) ? k({}, r, l) : r;
  } : i = k({}, r, t), k({}, o, {
    sx: i
  });
}
const Wu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eo,
  extendSxProp: qu,
  unstable_createStyleFunctionSx: Pa,
  unstable_defaultSxConfig: xn
}, Symbol.toStringTag, { value: "Module" })), Hu = /* @__PURE__ */ ct(Wu);
var qt = Kr;
Object.defineProperty(bn, "__esModule", {
  value: !0
});
var Gu = bn.default = ld, Ku = bn.shouldForwardProp = In;
bn.systemDefaultTheme = void 0;
var Ae = qt(Fc()), Ar = qt(Vc()), ri = rd(ji), Xu = zc, Yu = qt(Uc), Ju = qt(qc), Zu = qt(Vu), Qu = qt(Hu);
const ed = ["ownerState"], td = ["variants"], nd = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Na(e) {
  if (typeof WeakMap != "function")
    return null;
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  return (Na = function(r) {
    return r ? n : t;
  })(e);
}
function rd(e, t) {
  if (!t && e && e.__esModule)
    return e;
  if (e === null || typeof e != "object" && typeof e != "function")
    return { default: e };
  var n = Na(t);
  if (n && n.has(e))
    return n.get(e);
  var r = { __proto__: null }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in e)
    if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
      var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
      s && (s.get || s.set) ? Object.defineProperty(r, i, s) : r[i] = e[i];
    }
  return r.default = e, n && n.set(e, r), r;
}
function od(e) {
  return Object.keys(e).length === 0;
}
function id(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function In(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const ad = bn.systemDefaultTheme = (0, Zu.default)(), oi = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Nn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return od(t) ? e : t[n] || t;
}
function sd(e) {
  return e ? (t, n) => n[e] : null;
}
function An(e, t) {
  let {
    ownerState: n
  } = t, r = (0, Ar.default)(t, ed);
  const o = typeof e == "function" ? e((0, Ae.default)({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => An(i, (0, Ae.default)({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = (0, Ar.default)(o, td);
    return i.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props((0, Ae.default)({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((d) => {
        (n == null ? void 0 : n[d]) !== c.props[d] && r[d] !== c.props[d] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style((0, Ae.default)({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function ld(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = ad,
    rootShouldForwardProp: r = In,
    slotShouldForwardProp: o = In
  } = e, i = (s) => (0, Qu.default)((0, Ae.default)({}, s, {
    theme: Nn((0, Ae.default)({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, l = {}) => {
    (0, ri.internal_processStyles)(s, (b) => b.filter((S) => !(S != null && S.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: d,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: p = sd(oi(u))
    } = l, v = (0, Ar.default)(l, nd), g = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), m = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${oi(u || "Root")}`);
    let E = In;
    u === "Root" || u === "root" ? E = r : u ? E = o : id(s) && (E = void 0);
    const _ = (0, ri.default)(s, (0, Ae.default)({
      shouldForwardProp: E,
      label: h
    }, v)), y = (b) => typeof b == "function" && b.__emotion_real !== b || (0, Xu.isPlainObject)(b) ? (S) => An(b, (0, Ae.default)({}, S, {
      theme: Nn({
        theme: S.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : b, w = (b, ...S) => {
      let P = y(b);
      const D = S ? S.map(y) : [];
      c && p && D.push((B) => {
        const z = Nn((0, Ae.default)({}, B, {
          defaultTheme: n,
          themeId: t
        }));
        if (!z.components || !z.components[c] || !z.components[c].styleOverrides)
          return null;
        const G = z.components[c].styleOverrides, L = {};
        return Object.entries(G).forEach(([M, R]) => {
          L[M] = An(R, (0, Ae.default)({}, B, {
            theme: z
          }));
        }), p(B, L);
      }), c && !g && D.push((B) => {
        var z;
        const G = Nn((0, Ae.default)({}, B, {
          defaultTheme: n,
          themeId: t
        })), L = G == null || (z = G.components) == null || (z = z[c]) == null ? void 0 : z.variants;
        return An({
          variants: L
        }, (0, Ae.default)({}, B, {
          theme: G
        }));
      }), m || D.push(i);
      const A = D.length - S.length;
      if (Array.isArray(b) && A > 0) {
        const B = new Array(A).fill("");
        P = [...b, ...B], P.raw = [...b.raw, ...B];
      }
      const I = _(P, ...D);
      if (process.env.NODE_ENV !== "production") {
        let B;
        c && (B = `${c}${(0, Yu.default)(u || "")}`), B === void 0 && (B = `Styled(${(0, Ju.default)(s)})`), I.displayName = B;
      }
      return s.muiName && (I.muiName = s.muiName), I;
    };
    return _.withConfig && (w.withConfig = _.withConfig), w;
  };
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
}, dn = ud, dd = {
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
}, pd = dd, fd = {
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
}, kt = fd, hd = {
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
}, St = hd, md = {
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
}, Jt = md, gd = {
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
}, Pt = gd, bd = {
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
}, Ct = bd, vd = {
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
}, Rt = vd, yd = ["mode", "contrastThreshold", "tonalOffset"], ii = {
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
}, wr = {
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
function ai(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Rc(e.main, o) : t === "dark" && (e.dark = Cc(e.main, i)));
}
function xd(e = "light") {
  return e === "dark" ? {
    main: Pt[200],
    light: Pt[50],
    dark: Pt[400]
  } : {
    main: Pt[700],
    light: Pt[400],
    dark: Pt[800]
  };
}
function wd(e = "light") {
  return e === "dark" ? {
    main: kt[200],
    light: kt[50],
    dark: kt[400]
  } : {
    main: kt[500],
    light: kt[300],
    dark: kt[700]
  };
}
function Ed(e = "light") {
  return e === "dark" ? {
    main: St[500],
    light: St[300],
    dark: St[700]
  } : {
    main: St[700],
    light: St[400],
    dark: St[800]
  };
}
function Td(e = "light") {
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
function Od(e = "light") {
  return e === "dark" ? {
    main: Rt[400],
    light: Rt[300],
    dark: Rt[700]
  } : {
    main: Rt[800],
    light: Rt[500],
    dark: Rt[900]
  };
}
function kd(e = "light") {
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
function Sd(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = ce(e, yd), i = e.primary || xd(t), s = e.secondary || wd(t), l = e.error || Ed(t), c = e.info || Td(t), u = e.success || Od(t), d = e.warning || kd(t);
  function f(m) {
    const h = Jo(m, wr.text.primary) >= n ? wr.text.primary : ii.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = Jo(m, h);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${h} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const p = ({
    color: m,
    name: h,
    mainShade: E = 500,
    lightShade: _ = 300,
    darkShade: y = 700
  }) => {
    if (m = k({}, m), !m.main && m[E] && (m.main = m[E]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : cn(11, h ? ` (${h})` : "", E));
    if (typeof m.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : cn(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return ai(m, "light", _, r), ai(m, "dark", y, r), m.contrastText || (m.contrastText = f(m.main)), m;
  }, v = {
    dark: wr,
    light: ii
  };
  return process.env.NODE_ENV !== "production" && (v[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Ue(k({
    // A collection of common colors.
    common: k({}, dn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: p({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: p({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: p({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: p({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: p({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: p({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: pd,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: p,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, v[t]), o);
}
const Pd = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Cd(e) {
  return Math.round(e * 1e5) / 1e5;
}
const si = {
  textTransform: "uppercase"
}, li = '"Roboto", "Helvetica", "Arial", sans-serif';
function Rd(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = li,
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
    allVariants: d,
    pxToRem: f
  } = n, p = ce(n, Pd);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const v = o / 14, g = f || ((E) => `${E / u * v}rem`), m = (E, _, y, w, b) => k({
    fontFamily: r,
    fontWeight: E,
    fontSize: g(_),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: y
  }, r === li ? {
    letterSpacing: `${Cd(w / _)}em`
  } : {}, b, d), h = {
    h1: m(i, 96, 1.167, -1.5),
    h2: m(i, 60, 1.2, -0.5),
    h3: m(s, 48, 1.167, 0),
    h4: m(s, 34, 1.235, 0.25),
    h5: m(s, 24, 1.334, 0),
    h6: m(l, 20, 1.6, 0.15),
    subtitle1: m(s, 16, 1.75, 0.15),
    subtitle2: m(l, 14, 1.57, 0.1),
    body1: m(s, 16, 1.5, 0.15),
    body2: m(s, 14, 1.43, 0.15),
    button: m(l, 14, 1.75, 0.4, si),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, si),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Ue(k({
    htmlFontSize: u,
    pxToRem: g,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, h), p, {
    clone: !1
    // No need to clone deep
  });
}
const Nd = 0.2, _d = 0.14, $d = 0.12;
function ue(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Nd})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${_d})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${$d})`].join(",");
}
const Md = ["none", ue(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ue(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ue(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ue(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ue(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ue(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ue(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ue(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ue(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ue(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ue(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ue(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ue(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ue(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ue(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ue(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ue(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ue(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ue(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ue(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ue(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ue(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ue(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ue(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Id = Md, Ad = ["duration", "easing", "delay"], Dd = {
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
function ci(e) {
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
      } = i, u = ce(i, Ad);
      if (process.env.NODE_ENV !== "production") {
        const d = (p) => typeof p == "string", f = (p) => !isNaN(parseFloat(p));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : ci(s)} ${l} ${typeof c == "string" ? c : ci(c)}`).join(",");
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
  } = e, s = ce(e, zd);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : cn(18));
  const l = Sd(r), c = to(e);
  let u = Ue(c, {
    mixins: cd(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Id.slice(),
    typography: Rd(l, i),
    transitions: Ld(o),
    zIndex: k({}, Vd)
  });
  if (u = Ue(u, s), u = t.reduce((d, f) => Ue(d, f), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (p, v) => {
      let g;
      for (g in p) {
        const m = p[g];
        if (d.indexOf(g) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = Ge("", g);
            console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${g}\` internal state.`, "You can not override it like this: ", JSON.stringify(p, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          p[g] = {};
        }
      }
    };
    Object.keys(u.components).forEach((p) => {
      const v = u.components[p].styleOverrides;
      v && p.indexOf("Mui") === 0 && f(v, p);
    });
  }
  return u.unstable_sxConfig = k({}, xn, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(f) {
    return eo({
      sx: f,
      theme: this
    });
  }, u;
}
const qd = Ud(), no = qd, ro = "$$material", _a = (e) => Ku(e) && e !== "classes", Wd = Gu({
  themeId: ro,
  defaultTheme: no,
  rootShouldForwardProp: _a
}), Te = Wd;
function Hd(e) {
  return Object.keys(e).length === 0;
}
function Gd(e = null) {
  const t = x.useContext(el);
  return !t || Hd(t) ? e : t;
}
const Kd = to();
function $a(e = Kd) {
  return Gd(e);
}
function Xd(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : ha(t.components[n].defaultProps, r);
}
function Yd({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = $a(n);
  return r && (o = o[r] || o), Xd({
    theme: o,
    name: t,
    props: e
  });
}
function wn() {
  const e = $a(no);
  return process.env.NODE_ENV !== "production" && x.useDebugValue(e), e[ro] || e;
}
function ot({
  props: e,
  name: t
}) {
  return Yd({
    props: e,
    name: t,
    defaultTheme: no,
    themeId: ro
  });
}
function Dr(e, t) {
  return Dr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Dr(e, t);
}
function Jd(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Dr(e, t);
}
const ui = {
  disabled: !1
};
var Zd = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
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
const Ma = bt.createContext(null);
var Qd = function(t) {
  return t.scrollTop;
}, rn = "unmounted", mt = "exited", gt = "entering", Mt = "entered", jr = "exiting", it = /* @__PURE__ */ function(e) {
  Jd(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = mt, i.appearStatus = gt) : c = Mt : r.unmountOnExit || r.mountOnEnter ? c = rn : c = mt, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === rn ? {
      status: mt
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== gt && s !== Mt && (i = gt) : (s === gt || s === Mt) && (i = jr);
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
      if (this.cancelNextCallback(), i === gt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Cn.findDOMNode(this);
          s && Qd(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === mt && this.setState({
        status: rn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Cn.findDOMNode(this), l], u = c[0], d = c[1], f = this.getTimeouts(), p = l ? f.appear : f.enter;
    if (!o && !s || ui.disabled) {
      this.safeSetState({
        status: Mt
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: gt
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(p, function() {
        i.safeSetState({
          status: Mt
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Cn.findDOMNode(this);
    if (!i || ui.disabled) {
      this.safeSetState({
        status: mt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: jr
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: mt
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
      var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], u = c[0], d = c[1];
      this.props.addEndListener(u, d);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === rn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = ce(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ bt.createElement(Ma.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : bt.cloneElement(bt.Children.only(s), l))
    );
  }, t;
}(bt.Component);
it.contextType = Ma;
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
    var n = Zd;
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
function Nt() {
}
it.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Nt,
  onEntering: Nt,
  onEntered: Nt,
  onExit: Nt,
  onExiting: Nt,
  onExited: Nt
};
it.UNMOUNTED = rn;
it.EXITED = mt;
it.ENTERING = gt;
it.ENTERED = Mt;
it.EXITING = jr;
const Ia = it, Aa = (e) => e.scrollTop;
function qn(e, t) {
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
const ep = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Br(e) {
  return `scale(${e}, ${e ** 2})`;
}
const tp = {
  entering: {
    opacity: 1,
    transform: Br(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Er = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), oo = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: d,
    onExit: f,
    onExited: p,
    onExiting: v,
    style: g,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = Ia
  } = t, E = ce(t, ep), _ = tn(), y = x.useRef(), w = wn(), b = x.useRef(null), S = Be(b, i.ref, n), P = (M) => (R) => {
    if (M) {
      const j = b.current;
      R === void 0 ? M(j) : M(j, R);
    }
  }, D = P(d), A = P((M, R) => {
    Aa(M);
    const {
      duration: j,
      delay: Q,
      easing: Z
    } = qn({
      style: g,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let O;
    m === "auto" ? (O = w.transitions.getAutoHeightDuration(M.clientHeight), y.current = O) : O = j, M.style.transition = [w.transitions.create("opacity", {
      duration: O,
      delay: Q
    }), w.transitions.create("transform", {
      duration: Er ? O : O * 0.666,
      delay: Q,
      easing: Z
    })].join(","), c && c(M, R);
  }), I = P(u), B = P(v), z = P((M) => {
    const {
      duration: R,
      delay: j,
      easing: Q
    } = qn({
      style: g,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let Z;
    m === "auto" ? (Z = w.transitions.getAutoHeightDuration(M.clientHeight), y.current = Z) : Z = R, M.style.transition = [w.transitions.create("opacity", {
      duration: Z,
      delay: j
    }), w.transitions.create("transform", {
      duration: Er ? Z : Z * 0.666,
      delay: Er ? j : j || Z * 0.333,
      easing: Q
    })].join(","), M.style.opacity = 0, M.style.transform = Br(0.75), f && f(M);
  }), G = P(p);
  return /* @__PURE__ */ T(h, k({
    appear: o,
    in: l,
    nodeRef: b,
    onEnter: A,
    onEntered: I,
    onEntering: D,
    onExit: z,
    onExited: G,
    onExiting: B,
    addEndListener: (M) => {
      m === "auto" && _.start(y.current || 0, M), r && r(b.current, M);
    },
    timeout: m === "auto" ? null : m
  }, E, {
    children: (M, R) => /* @__PURE__ */ x.cloneElement(i, k({
      style: k({
        opacity: 0,
        transform: Br(0.75),
        visibility: M === "exited" && !l ? "hidden" : void 0
      }, tp[M], g, i.props.style),
      ref: S
    }, R))
  }));
});
process.env.NODE_ENV !== "production" && (oo.propTypes = {
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
oo.muiSupportAuto = !0;
const Lr = oo;
var Pe = "top", Fe = "bottom", Ve = "right", Ce = "left", io = "auto", En = [Pe, Fe, Ve, Ce], Dt = "start", pn = "end", np = "clippingParents", Da = "viewport", Zt = "popper", rp = "reference", di = /* @__PURE__ */ En.reduce(function(e, t) {
  return e.concat([t + "-" + Dt, t + "-" + pn]);
}, []), ja = /* @__PURE__ */ [].concat(En, [io]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Dt, t + "-" + pn]);
}, []), op = "beforeRead", ip = "read", ap = "afterRead", sp = "beforeMain", lp = "main", cp = "afterMain", up = "beforeWrite", dp = "write", pp = "afterWrite", fp = [op, ip, ap, sp, lp, cp, up, dp, pp];
function He(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Me(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Et(e) {
  var t = Me(e).Element;
  return e instanceof t || e instanceof Element;
}
function je(e) {
  var t = Me(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ao(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Me(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function hp(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !je(i) || !He(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function mp(e) {
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
      !je(o) || !He(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const gp = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: hp,
  effect: mp,
  requires: ["computeStyles"]
};
function qe(e) {
  return e.split("-")[0];
}
var vt = Math.max, Wn = Math.min, jt = Math.round;
function Fr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ba() {
  return !/^((?!chrome|android).)*safari/i.test(Fr());
}
function Bt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && je(e) && (o = e.offsetWidth > 0 && jt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && jt(r.height) / e.offsetHeight || 1);
  var s = Et(e) ? Me(e) : window, l = s.visualViewport, c = !Ba() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, d = (r.top + (c && l ? l.offsetTop : 0)) / i, f = r.width / o, p = r.height / i;
  return {
    width: f,
    height: p,
    top: d,
    right: u + f,
    bottom: d + p,
    left: u,
    x: u,
    y: d
  };
}
function so(e) {
  var t = Bt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function La(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && ao(n)) {
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
  return Me(e).getComputedStyle(e);
}
function bp(e) {
  return ["table", "td", "th"].indexOf(He(e)) >= 0;
}
function pt(e) {
  return ((Et(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function ir(e) {
  return He(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ao(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    pt(e)
  );
}
function pi(e) {
  return !je(e) || // https://github.com/popperjs/popper-core/issues/837
  tt(e).position === "fixed" ? null : e.offsetParent;
}
function vp(e) {
  var t = /firefox/i.test(Fr()), n = /Trident/i.test(Fr());
  if (n && je(e)) {
    var r = tt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = ir(e);
  for (ao(o) && (o = o.host); je(o) && ["html", "body"].indexOf(He(o)) < 0; ) {
    var i = tt(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Tn(e) {
  for (var t = Me(e), n = pi(e); n && bp(n) && tt(n).position === "static"; )
    n = pi(n);
  return n && (He(n) === "html" || He(n) === "body" && tt(n).position === "static") ? t : n || vp(e) || t;
}
function lo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function an(e, t, n) {
  return vt(e, Wn(t, n));
}
function yp(e, t, n) {
  var r = an(e, t, n);
  return r > n ? n : r;
}
function Fa() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Va(e) {
  return Object.assign({}, Fa(), e);
}
function za(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var xp = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Va(typeof t != "number" ? t : za(t, En));
};
function wp(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, l = qe(n.placement), c = lo(l), u = [Ce, Ve].indexOf(l) >= 0, d = u ? "height" : "width";
  if (!(!i || !s)) {
    var f = xp(o.padding, n), p = so(i), v = c === "y" ? Pe : Ce, g = c === "y" ? Fe : Ve, m = n.rects.reference[d] + n.rects.reference[c] - s[c] - n.rects.popper[d], h = s[c] - n.rects.reference[c], E = Tn(i), _ = E ? c === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, y = m / 2 - h / 2, w = f[v], b = _ - p[d] - f[g], S = _ / 2 - p[d] / 2 + y, P = an(w, S, b), D = c;
    n.modifiersData[r] = (t = {}, t[D] = P, t.centerOffset = P - S, t);
  }
}
function Ep(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || La(t.elements.popper, o) && (t.elements.arrow = o));
}
const Tp = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: wp,
  effect: Ep,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Lt(e) {
  return e.split("-")[1];
}
var Op = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function kp(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: jt(n * o) / o || 0,
    y: jt(r * o) / o || 0
  };
}
function fi(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, f = e.isFixed, p = s.x, v = p === void 0 ? 0 : p, g = s.y, m = g === void 0 ? 0 : g, h = typeof d == "function" ? d({
    x: v,
    y: m
  }) : {
    x: v,
    y: m
  };
  v = h.x, m = h.y;
  var E = s.hasOwnProperty("x"), _ = s.hasOwnProperty("y"), y = Ce, w = Pe, b = window;
  if (u) {
    var S = Tn(n), P = "clientHeight", D = "clientWidth";
    if (S === Me(n) && (S = pt(n), tt(S).position !== "static" && l === "absolute" && (P = "scrollHeight", D = "scrollWidth")), S = S, o === Pe || (o === Ce || o === Ve) && i === pn) {
      w = Fe;
      var A = f && S === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        S[P]
      );
      m -= A - r.height, m *= c ? 1 : -1;
    }
    if (o === Ce || (o === Pe || o === Fe) && i === pn) {
      y = Ve;
      var I = f && S === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        S[D]
      );
      v -= I - r.width, v *= c ? 1 : -1;
    }
  }
  var B = Object.assign({
    position: l
  }, u && Op), z = d === !0 ? kp({
    x: v,
    y: m
  }, Me(n)) : {
    x: v,
    y: m
  };
  if (v = z.x, m = z.y, c) {
    var G;
    return Object.assign({}, B, (G = {}, G[w] = _ ? "0" : "", G[y] = E ? "0" : "", G.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + m + "px)" : "translate3d(" + v + "px, " + m + "px, 0)", G));
  }
  return Object.assign({}, B, (t = {}, t[w] = _ ? m + "px" : "", t[y] = E ? v + "px" : "", t.transform = "", t));
}
function Sp(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: qe(t.placement),
    variation: Lt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, fi(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, fi(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Pp = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Sp,
  data: {}
};
var _n = {
  passive: !0
};
function Cp(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Me(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, _n);
  }), l && c.addEventListener("resize", n.update, _n), function() {
    i && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, _n);
    }), l && c.removeEventListener("resize", n.update, _n);
  };
}
const Rp = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Cp,
  data: {}
};
var Np = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Dn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Np[t];
  });
}
var _p = {
  start: "end",
  end: "start"
};
function hi(e) {
  return e.replace(/start|end/g, function(t) {
    return _p[t];
  });
}
function co(e) {
  var t = Me(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function uo(e) {
  return Bt(pt(e)).left + co(e).scrollLeft;
}
function $p(e, t) {
  var n = Me(e), r = pt(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    var u = Ba();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: l + uo(e),
    y: c
  };
}
function Mp(e) {
  var t, n = pt(e), r = co(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = vt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = vt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + uo(e), c = -r.scrollTop;
  return tt(o || n).direction === "rtl" && (l += vt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function po(e) {
  var t = tt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Ua(e) {
  return ["html", "body", "#document"].indexOf(He(e)) >= 0 ? e.ownerDocument.body : je(e) && po(e) ? e : Ua(ir(e));
}
function sn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Ua(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Me(r), s = o ? [i].concat(i.visualViewport || [], po(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(sn(ir(s)))
  );
}
function Vr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Ip(e, t) {
  var n = Bt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function mi(e, t, n) {
  return t === Da ? Vr($p(e, n)) : Et(t) ? Ip(t, n) : Vr(Mp(pt(e)));
}
function Ap(e) {
  var t = sn(ir(e)), n = ["absolute", "fixed"].indexOf(tt(e).position) >= 0, r = n && je(e) ? Tn(e) : e;
  return Et(r) ? t.filter(function(o) {
    return Et(o) && La(o, r) && He(o) !== "body";
  }) : [];
}
function Dp(e, t, n, r) {
  var o = t === "clippingParents" ? Ap(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], l = i.reduce(function(c, u) {
    var d = mi(e, u, r);
    return c.top = vt(d.top, c.top), c.right = Wn(d.right, c.right), c.bottom = Wn(d.bottom, c.bottom), c.left = vt(d.left, c.left), c;
  }, mi(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function qa(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? qe(r) : null, i = r ? Lt(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
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
    case Ce:
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
  var u = o ? lo(o) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (i) {
      case Dt:
        c[u] = c[u] - (t[d] / 2 - n[d] / 2);
        break;
      case pn:
        c[u] = c[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function fn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? np : l, u = n.rootBoundary, d = u === void 0 ? Da : u, f = n.elementContext, p = f === void 0 ? Zt : f, v = n.altBoundary, g = v === void 0 ? !1 : v, m = n.padding, h = m === void 0 ? 0 : m, E = Va(typeof h != "number" ? h : za(h, En)), _ = p === Zt ? rp : Zt, y = e.rects.popper, w = e.elements[g ? _ : p], b = Dp(Et(w) ? w : w.contextElement || pt(e.elements.popper), c, d, s), S = Bt(e.elements.reference), P = qa({
    reference: S,
    element: y,
    strategy: "absolute",
    placement: o
  }), D = Vr(Object.assign({}, y, P)), A = p === Zt ? D : S, I = {
    top: b.top - A.top + E.top,
    bottom: A.bottom - b.bottom + E.bottom,
    left: b.left - A.left + E.left,
    right: A.right - b.right + E.right
  }, B = e.modifiersData.offset;
  if (p === Zt && B) {
    var z = B[o];
    Object.keys(I).forEach(function(G) {
      var L = [Ve, Fe].indexOf(G) >= 0 ? 1 : -1, M = [Pe, Fe].indexOf(G) >= 0 ? "y" : "x";
      I[G] += z[M] * L;
    });
  }
  return I;
}
function jp(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? ja : c, d = Lt(r), f = d ? l ? di : di.filter(function(g) {
    return Lt(g) === d;
  }) : En, p = f.filter(function(g) {
    return u.indexOf(g) >= 0;
  });
  p.length === 0 && (p = f);
  var v = p.reduce(function(g, m) {
    return g[m] = fn(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[qe(m)], g;
  }, {});
  return Object.keys(v).sort(function(g, m) {
    return v[g] - v[m];
  });
}
function Bp(e) {
  if (qe(e) === io)
    return [];
  var t = Dn(e);
  return [hi(e), t, hi(t)];
}
function Lp(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, u = n.padding, d = n.boundary, f = n.rootBoundary, p = n.altBoundary, v = n.flipVariations, g = v === void 0 ? !0 : v, m = n.allowedAutoPlacements, h = t.options.placement, E = qe(h), _ = E === h, y = c || (_ || !g ? [Dn(h)] : Bp(h)), w = [h].concat(y).reduce(function(F, U) {
      return F.concat(qe(U) === io ? jp(t, {
        placement: U,
        boundary: d,
        rootBoundary: f,
        padding: u,
        flipVariations: g,
        allowedAutoPlacements: m
      }) : U);
    }, []), b = t.rects.reference, S = t.rects.popper, P = /* @__PURE__ */ new Map(), D = !0, A = w[0], I = 0; I < w.length; I++) {
      var B = w[I], z = qe(B), G = Lt(B) === Dt, L = [Pe, Fe].indexOf(z) >= 0, M = L ? "width" : "height", R = fn(t, {
        placement: B,
        boundary: d,
        rootBoundary: f,
        altBoundary: p,
        padding: u
      }), j = L ? G ? Ve : Ce : G ? Fe : Pe;
      b[M] > S[M] && (j = Dn(j));
      var Q = Dn(j), Z = [];
      if (i && Z.push(R[z] <= 0), l && Z.push(R[j] <= 0, R[Q] <= 0), Z.every(function(F) {
        return F;
      })) {
        A = B, D = !1;
        break;
      }
      P.set(B, Z);
    }
    if (D)
      for (var O = g ? 3 : 1, $ = function(U) {
        var W = w.find(function(H) {
          var q = P.get(H);
          if (q)
            return q.slice(0, U).every(function(X) {
              return X;
            });
        });
        if (W)
          return A = W, "break";
      }, V = O; V > 0; V--) {
        var K = $(V);
        if (K === "break")
          break;
      }
    t.placement !== A && (t.modifiersData[r]._skip = !0, t.placement = A, t.reset = !0);
  }
}
const Fp = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Lp,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function gi(e, t, n) {
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
function bi(e) {
  return [Pe, Ve, Fe, Ce].some(function(t) {
    return e[t] >= 0;
  });
}
function Vp(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = fn(t, {
    elementContext: "reference"
  }), l = fn(t, {
    altBoundary: !0
  }), c = gi(s, r), u = gi(l, o, i), d = bi(c), f = bi(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": f
  });
}
const zp = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Vp
};
function Up(e, t, n) {
  var r = qe(e), o = [Ce, Pe].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], l = i[1];
  return s = s || 0, l = (l || 0) * o, [Ce, Ve].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function qp(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = ja.reduce(function(d, f) {
    return d[f] = Up(f, t.rects, i), d;
  }, {}), l = s[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = s;
}
const Wp = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: qp
};
function Hp(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = qa({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Gp = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Hp,
  data: {}
};
function Kp(e) {
  return e === "x" ? "y" : "x";
}
function Xp(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, u = n.rootBoundary, d = n.altBoundary, f = n.padding, p = n.tether, v = p === void 0 ? !0 : p, g = n.tetherOffset, m = g === void 0 ? 0 : g, h = fn(t, {
    boundary: c,
    rootBoundary: u,
    padding: f,
    altBoundary: d
  }), E = qe(t.placement), _ = Lt(t.placement), y = !_, w = lo(E), b = Kp(w), S = t.modifiersData.popperOffsets, P = t.rects.reference, D = t.rects.popper, A = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, I = typeof A == "number" ? {
    mainAxis: A,
    altAxis: A
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, A), B = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, z = {
    x: 0,
    y: 0
  };
  if (S) {
    if (i) {
      var G, L = w === "y" ? Pe : Ce, M = w === "y" ? Fe : Ve, R = w === "y" ? "height" : "width", j = S[w], Q = j + h[L], Z = j - h[M], O = v ? -D[R] / 2 : 0, $ = _ === Dt ? P[R] : D[R], V = _ === Dt ? -D[R] : -P[R], K = t.elements.arrow, F = v && K ? so(K) : {
        width: 0,
        height: 0
      }, U = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Fa(), W = U[L], H = U[M], q = an(0, P[R], F[R]), X = y ? P[R] / 2 - O - q - W - I.mainAxis : $ - q - W - I.mainAxis, Y = y ? -P[R] / 2 + O + q + H + I.mainAxis : V + q + H + I.mainAxis, ne = t.elements.arrow && Tn(t.elements.arrow), N = ne ? w === "y" ? ne.clientTop || 0 : ne.clientLeft || 0 : 0, J = (G = B == null ? void 0 : B[w]) != null ? G : 0, C = j + X - J - N, re = j + Y - J, ye = an(v ? Wn(Q, C) : Q, j, v ? vt(Z, re) : Z);
      S[w] = ye, z[w] = ye - j;
    }
    if (l) {
      var Oe, he = w === "x" ? Pe : Ce, ft = w === "x" ? Fe : Ve, ke = S[b], Ke = b === "y" ? "height" : "width", Re = ke + h[he], Xe = ke - h[ft], xe = [Pe, Ce].indexOf(E) !== -1, Tt = (Oe = B == null ? void 0 : B[b]) != null ? Oe : 0, ht = xe ? Re : ke - P[Ke] - D[Ke] - Tt + I.altAxis, Wt = xe ? ke + P[Ke] + D[Ke] - Tt - I.altAxis : Xe, On = v && xe ? yp(ht, ke, Wt) : an(v ? ht : Re, ke, v ? Wt : Xe);
      S[b] = On, z[b] = On - ke;
    }
    t.modifiersData[r] = z;
  }
}
const Yp = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Xp,
  requiresIfExists: ["offset"]
};
function Jp(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Zp(e) {
  return e === Me(e) || !je(e) ? co(e) : Jp(e);
}
function Qp(e) {
  var t = e.getBoundingClientRect(), n = jt(t.width) / e.offsetWidth || 1, r = jt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function ef(e, t, n) {
  n === void 0 && (n = !1);
  var r = je(t), o = je(t) && Qp(t), i = pt(t), s = Bt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((He(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  po(i)) && (l = Zp(t)), je(t) ? (c = Bt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = uo(i))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function tf(e) {
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
function nf(e) {
  var t = tf(e);
  return fp.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function rf(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function of(e) {
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
var vi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function yi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function af(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? vi : o;
  return function(l, c, u) {
    u === void 0 && (u = i);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, vi, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], p = !1, v = {
      state: d,
      setOptions: function(E) {
        var _ = typeof E == "function" ? E(d.options) : E;
        m(), d.options = Object.assign({}, i, d.options, _), d.scrollParents = {
          reference: Et(l) ? sn(l) : l.contextElement ? sn(l.contextElement) : [],
          popper: sn(c)
        };
        var y = nf(of([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = y.filter(function(w) {
          return w.enabled;
        }), g(), v.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var E = d.elements, _ = E.reference, y = E.popper;
          if (yi(_, y)) {
            d.rects = {
              reference: ef(_, Tn(y), d.options.strategy === "fixed"),
              popper: so(y)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(I) {
              return d.modifiersData[I.name] = Object.assign({}, I.data);
            });
            for (var w = 0; w < d.orderedModifiers.length; w++) {
              if (d.reset === !0) {
                d.reset = !1, w = -1;
                continue;
              }
              var b = d.orderedModifiers[w], S = b.fn, P = b.options, D = P === void 0 ? {} : P, A = b.name;
              typeof S == "function" && (d = S({
                state: d,
                options: D,
                name: A,
                instance: v
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: rf(function() {
        return new Promise(function(h) {
          v.forceUpdate(), h(d);
        });
      }),
      destroy: function() {
        m(), p = !0;
      }
    };
    if (!yi(l, c))
      return v;
    v.setOptions(u).then(function(h) {
      !p && u.onFirstUpdate && u.onFirstUpdate(h);
    });
    function g() {
      d.orderedModifiers.forEach(function(h) {
        var E = h.name, _ = h.options, y = _ === void 0 ? {} : _, w = h.effect;
        if (typeof w == "function") {
          var b = w({
            state: d,
            name: E,
            instance: v,
            options: y
          }), S = function() {
          };
          f.push(b || S);
        }
      });
    }
    function m() {
      f.forEach(function(h) {
        return h();
      }), f = [];
    }
    return v;
  };
}
var sf = [Rp, Gp, Pp, gp, Wp, Fp, Yp, Tp, zp], lf = /* @__PURE__ */ af({
  defaultModifiers: sf
});
function cf(e) {
  return typeof e == "function" ? e() : e;
}
const hn = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, l] = x.useState(null), c = Be(/* @__PURE__ */ x.isValidElement(r) ? r.ref : null, n);
  if (xt(() => {
    i || l(cf(o) || document.body);
  }, [o, i]), xt(() => {
    if (s && !i)
      return Fn(n, s), () => {
        Fn(n, null);
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
    children: s && /* @__PURE__ */ tl.createPortal(r, s)
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
  container: a.oneOfType([Qe, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool
});
process.env.NODE_ENV !== "production" && (hn["propTypes"] = ra(hn.propTypes));
const Wa = "base";
function uf(e) {
  return `${Wa}--${e}`;
}
function df(e, t) {
  return `${Wa}-${e}-${t}`;
}
function Ha(e, t) {
  const n = ga[t];
  return n ? uf(n) : df(e, t);
}
function pf(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Ha(e, r);
  }), n;
}
const Ga = "Popper";
function ff(e) {
  return Ha(Ga, e);
}
pf(Ga, ["root"]);
const hf = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], mf = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function gf(e, t) {
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
function Hn(e) {
  return typeof e == "function" ? e() : e;
}
function ar(e) {
  return e.nodeType !== void 0;
}
function bf(e) {
  return !ar(e);
}
const vf = () => rt({
  root: ["root"]
}, Ul(ff)), yf = {}, xf = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: d,
    popperOptions: f,
    popperRef: p,
    slotProps: v = {},
    slots: g = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, h = ce(t, hf), E = x.useRef(null), _ = Be(E, n), y = x.useRef(null), w = Be(y, p), b = x.useRef(w);
  xt(() => {
    b.current = w;
  }, [w]), x.useImperativeHandle(p, () => y.current, []);
  const S = gf(d, s), [P, D] = x.useState(S), [A, I] = x.useState(Hn(o));
  x.useEffect(() => {
    y.current && y.current.forceUpdate();
  }), x.useEffect(() => {
    o && I(Hn(o));
  }, [o]), xt(() => {
    if (!A || !u)
      return;
    const M = (Q) => {
      D(Q.placement);
    };
    if (process.env.NODE_ENV !== "production" && A && ar(A) && A.nodeType === 1) {
      const Q = A.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Q.top === 0 && Q.left === 0 && Q.right === 0 && Q.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let R = [{
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
        M(Q);
      }
    }];
    c != null && (R = R.concat(c)), f && f.modifiers != null && (R = R.concat(f.modifiers));
    const j = lf(A, E.current, k({
      placement: S
    }, f, {
      modifiers: R
    }));
    return b.current(j), () => {
      j.destroy(), b.current(null);
    };
  }, [A, l, c, u, f, S]);
  const B = {
    placement: P
  };
  m !== null && (B.TransitionProps = m);
  const z = vf(), G = (r = g.root) != null ? r : "div", L = wt({
    elementType: G,
    externalSlotProps: v.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: _
    },
    ownerState: t,
    className: z.root
  });
  return /* @__PURE__ */ T(G, k({}, L, {
    children: typeof i == "function" ? i(B) : i
  }));
}), Ka = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: d,
    placement: f = "bottom",
    popperOptions: p = yf,
    popperRef: v,
    style: g,
    transition: m = !1,
    slotProps: h = {},
    slots: E = {}
  } = t, _ = ce(t, mf), [y, w] = x.useState(!0), b = () => {
    w(!1);
  }, S = () => {
    w(!0);
  };
  if (!c && !d && (!m || y))
    return null;
  let P;
  if (i)
    P = i;
  else if (r) {
    const I = Hn(r);
    P = I && ar(I) ? Ee(I).body : Ee(null).body;
  }
  const D = !d && c && (!m || y) ? "none" : void 0, A = m ? {
    in: d,
    onEnter: b,
    onExited: S
  } : void 0;
  return /* @__PURE__ */ T(hn, {
    disablePortal: l,
    container: P,
    children: /* @__PURE__ */ T(xf, k({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: m ? !y : d,
      placement: f,
      popperOptions: p,
      popperRef: v,
      slotProps: h,
      slots: E
    }, _, {
      style: k({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: D
      }, g),
      TransitionProps: A,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ka.propTypes = {
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
  anchorEl: zt(a.oneOfType([Qe, a.object, a.func]), (e) => {
    if (e.open) {
      const t = Hn(e.anchorEl);
      if (t && ar(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || bf(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: a.oneOfType([Qe, a.func]),
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
  popperRef: Gr,
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
var fo = {};
Object.defineProperty(fo, "__esModule", {
  value: !0
});
var Xa = fo.default = void 0, wf = Tf(bt), Ef = ji;
function Ya(e) {
  if (typeof WeakMap != "function")
    return null;
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  return (Ya = function(r) {
    return r ? n : t;
  })(e);
}
function Tf(e, t) {
  if (!t && e && e.__esModule)
    return e;
  if (e === null || typeof e != "object" && typeof e != "function")
    return { default: e };
  var n = Ya(t);
  if (n && n.has(e))
    return n.get(e);
  var r = { __proto__: null }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in e)
    if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
      var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
      s && (s.get || s.set) ? Object.defineProperty(r, i, s) : r[i] = e[i];
    }
  return r.default = e, n && n.set(e, r), r;
}
function Of(e) {
  return Object.keys(e).length === 0;
}
function kf(e = null) {
  const t = wf.useContext(Ef.ThemeContext);
  return !t || Of(t) ? e : t;
}
Xa = fo.default = kf;
const Sf = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, xi = Sf, Pf = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Cf = Te(Ka, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ja = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r;
  const o = Xa(), i = ot({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: u,
    container: d,
    disablePortal: f,
    keepMounted: p,
    modifiers: v,
    open: g,
    placement: m,
    popperOptions: h,
    popperRef: E,
    transition: _,
    slots: y,
    slotProps: w
  } = i, b = ce(i, Pf), S = (r = y == null ? void 0 : y.root) != null ? r : c == null ? void 0 : c.Root, P = k({
    anchorEl: s,
    container: d,
    disablePortal: f,
    keepMounted: p,
    modifiers: v,
    open: g,
    placement: m,
    popperOptions: h,
    popperRef: E,
    transition: _
  }, b);
  return /* @__PURE__ */ T(Cf, k({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: S
    },
    slotProps: w ?? u
  }, P, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Ja.propTypes = {
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
  anchorEl: a.oneOfType([Qe, a.object, a.func]),
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
  container: a.oneOfType([Qe, a.func]),
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
  popperRef: Gr,
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
const Za = Ja;
function Rf(e) {
  return Ge("MuiTooltip", e);
}
const Nf = ut("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), lt = Nf, _f = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function $f(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Mf = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${We(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return rt(s, Rf, t);
}, If = Te(Za, {
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
  [`&[data-popper-placement*="bottom"] .${lt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${lt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${lt.arrow}`]: k({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${lt.arrow}`]: k({}, t.isRtl ? {
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
})), Af = Te("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${We(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => k({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Vn(e.palette.grey[700], 0.92),
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
  lineHeight: `${$f(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${lt.popper}[data-popper-placement*="left"] &`]: k({
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
  [`.${lt.popper}[data-popper-placement*="right"] &`]: k({
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
  [`.${lt.popper}[data-popper-placement*="top"] &`]: k({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${lt.popper}[data-popper-placement*="bottom"] &`]: k({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), Df = Te("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Vn(e.palette.grey[700], 0.9),
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
let $n = !1;
const wi = new mn();
let Qt = {
  x: 0,
  y: 0
};
function Mn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Qa = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i, s, l, c, u, d, f, p, v, g, m, h, E, _, y, w, b;
  const S = ot({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: P = !1,
    children: D,
    components: A = {},
    componentsProps: I = {},
    describeChild: B = !1,
    disableFocusListener: z = !1,
    disableHoverListener: G = !1,
    disableInteractive: L = !1,
    disableTouchListener: M = !1,
    enterDelay: R = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: Q = 700,
    followCursor: Z = !1,
    id: O,
    leaveDelay: $ = 0,
    leaveTouchDelay: V = 1500,
    onClose: K,
    onOpen: F,
    open: U,
    placement: W = "bottom",
    PopperComponent: H,
    PopperProps: q = {},
    slotProps: X = {},
    slots: Y = {},
    title: ne,
    TransitionComponent: N = Lr,
    TransitionProps: J
  } = S, C = ce(S, _f), re = /* @__PURE__ */ x.isValidElement(D) ? D : /* @__PURE__ */ T("span", {
    children: D
  }), ye = wn(), Oe = ye.direction === "rtl", [he, ft] = x.useState(), [ke, Ke] = x.useState(null), Re = x.useRef(!1), Xe = L || Z, xe = tn(), Tt = tn(), ht = tn(), Wt = tn(), [On, bo] = la({
    controlled: U,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Ye = On;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ee
    } = x.useRef(U !== void 0);
    x.useEffect(() => {
      he && he.disabled && !ee && ne !== "" && he.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ne, he, ee]);
  }
  const sr = sa(O), Ht = x.useRef(), kn = un(() => {
    Ht.current !== void 0 && (document.body.style.WebkitUserSelect = Ht.current, Ht.current = void 0), Wt.clear();
  });
  x.useEffect(() => kn, [kn]);
  const vo = (ee) => {
    wi.clear(), $n = !0, bo(!0), F && !Ye && F(ee);
  }, Sn = un(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ee) => {
      wi.start(800 + $, () => {
        $n = !1;
      }), bo(!1), K && Ye && K(ee), xe.start(ye.transitions.duration.shortest, () => {
        Re.current = !1;
      });
    }
  ), Pn = (ee) => {
    Re.current && ee.type !== "touchstart" || (he && he.removeAttribute("title"), Tt.clear(), ht.clear(), R || $n && j ? Tt.start($n ? j : R, () => {
      vo(ee);
    }) : vo(ee));
  }, lr = (ee) => {
    Tt.clear(), ht.start($, () => {
      Sn(ee);
    });
  }, {
    isFocusVisibleRef: yo,
    onBlur: ms,
    onFocus: gs,
    ref: bs
  } = ca(), [, xo] = x.useState(!1), wo = (ee) => {
    ms(ee), yo.current === !1 && (xo(!1), lr(ee));
  }, Eo = (ee) => {
    he || ft(ee.currentTarget), gs(ee), yo.current === !0 && (xo(!0), Pn(ee));
  }, To = (ee) => {
    Re.current = !0;
    const Ne = re.props;
    Ne.onTouchStart && Ne.onTouchStart(ee);
  }, vs = (ee) => {
    To(ee), ht.clear(), xe.clear(), kn(), Ht.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Wt.start(Q, () => {
      document.body.style.WebkitUserSelect = Ht.current, Pn(ee);
    });
  }, ys = (ee) => {
    re.props.onTouchEnd && re.props.onTouchEnd(ee), kn(), ht.start(V, () => {
      Sn(ee);
    });
  };
  x.useEffect(() => {
    if (!Ye)
      return;
    function ee(Ne) {
      (Ne.key === "Escape" || Ne.key === "Esc") && Sn(Ne);
    }
    return document.addEventListener("keydown", ee), () => {
      document.removeEventListener("keydown", ee);
    };
  }, [Sn, Ye]);
  const xs = Be(re.ref, bs, ft, n);
  !ne && ne !== 0 && (Ye = !1);
  const cr = x.useRef(), ws = (ee) => {
    const Ne = re.props;
    Ne.onMouseMove && Ne.onMouseMove(ee), Qt = {
      x: ee.clientX,
      y: ee.clientY
    }, cr.current && cr.current.update();
  }, Gt = {}, ur = typeof ne == "string";
  B ? (Gt.title = !Ye && ur && !G ? ne : null, Gt["aria-describedby"] = Ye ? sr : null) : (Gt["aria-label"] = ur ? ne : null, Gt["aria-labelledby"] = Ye && !ur ? sr : null);
  const Ie = k({}, Gt, C, re.props, {
    className: we(C.className, re.props.className),
    onTouchStart: To,
    ref: xs
  }, Z ? {
    onMouseMove: ws
  } : {});
  process.env.NODE_ENV !== "production" && (Ie["data-mui-internal-clone-element"] = !0, x.useEffect(() => {
    he && !he.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [he]));
  const Kt = {};
  M || (Ie.onTouchStart = vs, Ie.onTouchEnd = ys), G || (Ie.onMouseOver = Mn(Pn, Ie.onMouseOver), Ie.onMouseLeave = Mn(lr, Ie.onMouseLeave), Xe || (Kt.onMouseOver = Pn, Kt.onMouseLeave = lr)), z || (Ie.onFocus = Mn(Eo, Ie.onFocus), Ie.onBlur = Mn(wo, Ie.onBlur), Xe || (Kt.onFocus = Eo, Kt.onBlur = wo)), process.env.NODE_ENV !== "production" && re.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${re.props.title}\` or the Tooltip component.`].join(`
`));
  const Es = x.useMemo(() => {
    var ee;
    let Ne = [{
      name: "arrow",
      enabled: !!ke,
      options: {
        element: ke,
        padding: 4
      }
    }];
    return (ee = q.popperOptions) != null && ee.modifiers && (Ne = Ne.concat(q.popperOptions.modifiers)), k({}, q.popperOptions, {
      modifiers: Ne
    });
  }, [ke, q]), Xt = k({}, S, {
    isRtl: Oe,
    arrow: P,
    disableInteractive: Xe,
    placement: W,
    PopperComponentProp: H,
    touch: Re.current
  }), dr = Mf(Xt), Oo = (r = (o = Y.popper) != null ? o : A.Popper) != null ? r : If, ko = (i = (s = (l = Y.transition) != null ? l : A.Transition) != null ? s : N) != null ? i : Lr, So = (c = (u = Y.tooltip) != null ? u : A.Tooltip) != null ? c : Af, Po = (d = (f = Y.arrow) != null ? f : A.Arrow) != null ? d : Df, Ts = nn(Oo, k({}, q, (p = X.popper) != null ? p : I.popper, {
    className: we(dr.popper, q == null ? void 0 : q.className, (v = (g = X.popper) != null ? g : I.popper) == null ? void 0 : v.className)
  }), Xt), Os = nn(ko, k({}, J, (m = X.transition) != null ? m : I.transition), Xt), ks = nn(So, k({}, (h = X.tooltip) != null ? h : I.tooltip, {
    className: we(dr.tooltip, (E = (_ = X.tooltip) != null ? _ : I.tooltip) == null ? void 0 : E.className)
  }), Xt), Ss = nn(Po, k({}, (y = X.arrow) != null ? y : I.arrow, {
    className: we(dr.arrow, (w = (b = X.arrow) != null ? b : I.arrow) == null ? void 0 : w.className)
  }), Xt);
  return /* @__PURE__ */ fe(x.Fragment, {
    children: [/* @__PURE__ */ x.cloneElement(re, Ie), /* @__PURE__ */ T(Oo, k({
      as: H ?? Za,
      placement: W,
      anchorEl: Z ? {
        getBoundingClientRect: () => ({
          top: Qt.y,
          left: Qt.x,
          right: Qt.x,
          bottom: Qt.y,
          width: 0,
          height: 0
        })
      } : he,
      popperRef: cr,
      open: he ? Ye : !1,
      id: sr,
      transition: !0
    }, Kt, Ts, {
      popperOptions: Es,
      children: ({
        TransitionProps: ee
      }) => /* @__PURE__ */ T(ko, k({
        timeout: ye.transitions.duration.shorter
      }, ee, Os, {
        children: /* @__PURE__ */ fe(So, k({}, ks, {
          children: [ne, P ? /* @__PURE__ */ T(Po, k({}, Ss, {
            ref: Ke
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Qa.propTypes = {
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: a.object
});
const jf = Qa;
var ho = {}, Tr = {};
function Bf(e) {
  return Ge("MuiSvgIcon", e);
}
ut("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Lf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Ff = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${We(t)}`, `fontSize${We(n)}`]
  };
  return rt(o, Bf, r);
}, Vf = Te("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${We(n.color)}`], t[`fontSize${We(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, s, l, c, u, d, f, p, v, g;
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
      large: ((u = e.typography) == null || (d = u.pxToRem) == null ? void 0 : d.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (f = (p = (e.vars || e).palette) == null || (p = p[t.color]) == null ? void 0 : p.main) != null ? f : {
      action: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.active,
      disabled: (g = (e.vars || e).palette) == null || (g = g.action) == null ? void 0 : g.disabled,
      inherit: void 0
    }[t.color]
  };
}), mo = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = ot({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: d = !1,
    titleAccess: f,
    viewBox: p = "0 0 24 24"
  } = r, v = ce(r, Lf), g = /* @__PURE__ */ x.isValidElement(o) && o.type === "svg", m = k({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: p,
    hasSvgAsChild: g
  }), h = {};
  d || (h.viewBox = p);
  const E = Ff(m);
  return /* @__PURE__ */ fe(Vf, k({
    as: l,
    className: we(E.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, h, v, g && o.props, {
    ownerState: m,
    children: [g ? o.props.children : o, f ? /* @__PURE__ */ T("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (mo.propTypes = {
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
mo.muiName = "SvgIcon";
const Ei = mo;
function es(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ T(Ei, k({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Ei.muiName, /* @__PURE__ */ x.memo(/* @__PURE__ */ x.forwardRef(n));
}
const zf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ma.configure(e);
  }
}, Uf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: We,
  createChainedFunction: $r,
  createSvgIcon: es,
  debounce: aa,
  deprecatedPropType: oc,
  isMuiElement: ic,
  ownerDocument: Ee,
  ownerWindow: At,
  requirePropFactory: ac,
  setRef: Fn,
  unstable_ClassNameGenerator: zf,
  unstable_useEnhancedEffect: xt,
  unstable_useId: sa,
  unsupportedProp: cc,
  useControlled: la,
  useEventCallback: un,
  useForkRef: Be,
  useIsFocusVisible: ca
}, Symbol.toStringTag, { value: "Module" })), qf = /* @__PURE__ */ ct(Uf);
var Ti;
function Wf() {
  return Ti || (Ti = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = qf;
  }(Tr)), Tr;
}
var Hf = Kr;
Object.defineProperty(ho, "__esModule", {
  value: !0
});
var ts = ho.default = void 0, Gf = Hf(Wf()), Kf = Ps;
ts = ho.default = (0, Gf.default)(/* @__PURE__ */ (0, Kf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Oi(e, t, n) {
  return e ? /* @__PURE__ */ T(Ii, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ T("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function ns(e) {
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
    isDense: d = !0,
    isSubMenuParent: f = !1,
    hasDisabledGutters: p = !1,
    hasDivider: v = !1,
    focusVisibleClassName: g,
    id: m,
    children: h
  } = e, E = /* @__PURE__ */ T(
    Us,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: d,
      disableGutters: p,
      divider: v,
      focusVisibleClassName: g,
      onClick: t,
      id: m,
      children: n ? /* @__PURE__ */ fe(zr, { children: [
        Oi(i, n, !0),
        /* @__PURE__ */ T(qs, { primary: n, inset: !i && o }),
        f ? /* @__PURE__ */ T(Ii, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ T(ts, {}) }) : Oi(s, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ T(jf, { title: r, placement: "right", children: /* @__PURE__ */ T("div", { children: E }) }) : E;
}
function rs(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Xf(e) {
  const [t, n] = Je(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (u) => {
    n(u.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let u = rs(i).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ T(go, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ fe(zr, { children: [
    /* @__PURE__ */ T(ns, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ T(
      Ws,
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
const Yf = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function go(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = Ft(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      rs(t).filter((g) => !("menuItem" in g.group))
    ), f = Object.values(d).sort(
      (g, m) => (g.group.order || 0) - (m.group.order || 0)
    ), p = [];
    f.forEach((g) => {
      Yf(g.id, t.items).forEach(
        (m) => p.push({ item: m, isLastItemInGroup: !1 })
      ), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !0);
    }), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !1);
    const v = p.some(
      (g) => "iconPathBefore" in g.item && g.item.iconPathBefore
    );
    return { items: p, allowForLeadingIcons: v };
  }, [o, t]), l = ({ item: d, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: d.label,
    tooltip: d.tooltip,
    iconPathBefore: "iconPathBefore" in d ? d.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in d ? d.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ T("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ T("div", { role: "menu", "aria-label": u, children: i.map((d, f) => {
    const { item: p } = d, v = l(d);
    if ("command" in p) {
      const g = p.group + f;
      return /* @__PURE__ */ T(
        ns,
        {
          onClick: (m) => {
            n == null || n(m), r(p);
          },
          ...v
        },
        g
      );
    }
    return /* @__PURE__ */ T(
      Xf,
      {
        parentMenuItem: p,
        parentItemProps: v,
        ...e
      },
      u + p.id
    );
  }) }, u);
}
function Jf(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ T(go, { ...e, includedGroups: i });
}
function Zf({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ fe(
    Ai,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ T("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ T(Hs, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ T(
          Jf,
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
function Qf({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = Ft(() => {
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
    Ai,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, l) => /* @__PURE__ */ T(
        Zf,
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
const os = /* @__PURE__ */ x.createContext({});
process.env.NODE_ENV !== "production" && (os.displayName = "ListContext");
const eh = os;
function th(e) {
  return Ge("MuiList", e);
}
ut("MuiList", ["root", "padding", "dense", "subheader"]);
const nh = ["children", "className", "component", "dense", "disablePadding", "subheader"], rh = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return rt({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, th, t);
}, oh = Te("ul", {
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
})), is = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = ot({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = r, d = ce(r, nh), f = x.useMemo(() => ({
    dense: l
  }), [l]), p = k({}, r, {
    component: s,
    dense: l,
    disablePadding: c
  }), v = rh(p);
  return /* @__PURE__ */ T(eh.Provider, {
    value: f,
    children: /* @__PURE__ */ fe(oh, k({
      as: s,
      className: we(v.root, i),
      ref: n,
      ownerState: p
    }, d, {
      children: [u, o]
    }))
  });
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
const ih = is, ah = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Or(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function ki(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function as(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function en(e, t, n, r, o, i) {
  let s = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !as(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const ss = /* @__PURE__ */ x.forwardRef(function(t, n) {
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
    onKeyDown: d,
    variant: f = "selectedMenu"
  } = t, p = ce(t, ah), v = x.useRef(null), g = x.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  xt(() => {
    o && v.current.focus();
  }, [o]), x.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (y, w) => {
      const b = !v.current.style.width;
      if (y.clientHeight < v.current.clientHeight && b) {
        const S = `${ua(Ee(y))}px`;
        v.current.style[w.direction === "rtl" ? "paddingLeft" : "paddingRight"] = S, v.current.style.width = `calc(100% + ${S})`;
      }
      return v.current;
    }
  }), []);
  const m = (y) => {
    const w = v.current, b = y.key, S = Ee(w).activeElement;
    if (b === "ArrowDown")
      y.preventDefault(), en(w, S, u, c, Or);
    else if (b === "ArrowUp")
      y.preventDefault(), en(w, S, u, c, ki);
    else if (b === "Home")
      y.preventDefault(), en(w, null, u, c, Or);
    else if (b === "End")
      y.preventDefault(), en(w, null, u, c, ki);
    else if (b.length === 1) {
      const P = g.current, D = b.toLowerCase(), A = performance.now();
      P.keys.length > 0 && (A - P.lastTime > 500 ? (P.keys = [], P.repeating = !0, P.previousKeyMatched = !0) : P.repeating && D !== P.keys[0] && (P.repeating = !1)), P.lastTime = A, P.keys.push(D);
      const I = S && !P.repeating && as(S, P);
      P.previousKeyMatched && (I || en(w, S, !1, c, Or, P)) ? y.preventDefault() : P.previousKeyMatched = !1;
    }
    d && d(y);
  }, h = Be(v, n);
  let E = -1;
  x.Children.forEach(s, (y, w) => {
    if (!/* @__PURE__ */ x.isValidElement(y)) {
      E === w && (E += 1, E >= s.length && (E = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Ln.isFragment(y) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), y.props.disabled || (f === "selectedMenu" && y.props.selected || E === -1) && (E = w), E === w && (y.props.disabled || y.props.muiSkipListHighlight || y.type.muiSkipListHighlight) && (E += 1, E >= s.length && (E = -1));
  });
  const _ = x.Children.map(s, (y, w) => {
    if (w === E) {
      const b = {};
      return i && (b.autoFocus = !0), y.props.tabIndex === void 0 && f === "selectedMenu" && (b.tabIndex = 0), /* @__PURE__ */ x.cloneElement(y, b);
    }
    return y;
  });
  return /* @__PURE__ */ T(ih, k({
    role: "menu",
    ref: h,
    className: l,
    onKeyDown: m,
    tabIndex: o ? 0 : -1
  }, p, {
    children: _
  }));
});
process.env.NODE_ENV !== "production" && (ss.propTypes = {
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
const sh = ss;
function lh(e) {
  const t = Ee(e);
  return t.body === e ? At(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function ln(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Si(e) {
  return parseInt(At(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function ch(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Pi(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1, c = !ch(s);
    l && c && ln(s, o);
  });
}
function kr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function uh(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (lh(r)) {
      const s = ua(Ee(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Si(r) + s}px`;
      const l = Ee(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${Si(c) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Ee(r).body;
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
function dh(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class ph {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && ln(t.modalRef, !1);
    const o = dh(n);
    Pi(n, t.mount, t.modalRef, o, !0);
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
    o.restore || (o.restore = uh(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = kr(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && ln(t.modalRef, n), Pi(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
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
function fh(e) {
  return typeof e == "function" ? e() : e;
}
function hh(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const mh = new ph();
function gh(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = mh,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: d,
    rootRef: f
  } = e, p = x.useRef({}), v = x.useRef(null), g = x.useRef(null), m = Be(g, f), [h, E] = x.useState(!d), _ = hh(c);
  let y = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (y = !1);
  const w = () => Ee(v.current), b = () => (p.current.modalRef = g.current, p.current.mount = v.current, p.current), S = () => {
    o.mount(b(), {
      disableScrollLock: r
    }), g.current && (g.current.scrollTop = 0);
  }, P = un(() => {
    const R = fh(t) || w().body;
    o.add(b(), R), g.current && S();
  }), D = x.useCallback(() => o.isTopModal(b()), [o]), A = un((R) => {
    v.current = R, R && (d && D() ? S() : g.current && ln(g.current, y));
  }), I = x.useCallback(() => {
    o.remove(b(), y);
  }, [y, o]);
  x.useEffect(() => () => {
    I();
  }, [I]), x.useEffect(() => {
    d ? P() : (!_ || !i) && I();
  }, [d, I, _, i, P]);
  const B = (R) => (j) => {
    var Q;
    (Q = R.onKeyDown) == null || Q.call(R, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !D()) && (n || (j.stopPropagation(), u && u(j, "escapeKeyDown")));
  }, z = (R) => (j) => {
    var Q;
    (Q = R.onClick) == null || Q.call(R, j), j.target === j.currentTarget && u && u(j, "backdropClick");
  };
  return {
    getRootProps: (R = {}) => {
      const j = ta(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const Q = k({}, j, R);
      return k({
        role: "presentation"
      }, Q, {
        onKeyDown: B(Q),
        ref: m
      });
    },
    getBackdropProps: (R = {}) => {
      const j = R;
      return k({
        "aria-hidden": !0
      }, j, {
        onClick: z(j),
        open: d
      });
    },
    getTransitionProps: () => {
      const R = () => {
        E(!1), s && s();
      }, j = () => {
        E(!0), l && l(), i && I();
      };
      return {
        onEnter: $r(R, c == null ? void 0 : c.props.onEnter),
        onExited: $r(j, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: m,
    portalRef: A,
    isTopModal: D,
    exited: h,
    hasTransition: _
  };
}
const bh = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function vh(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function yh(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function xh(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || yh(e));
}
function wh(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(bh)).forEach((r, o) => {
    const i = vh(r);
    i === -1 || !xh(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Eh() {
  return !0;
}
function Gn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = wh,
    isEnabled: s = Eh,
    open: l
  } = e, c = x.useRef(!1), u = x.useRef(null), d = x.useRef(null), f = x.useRef(null), p = x.useRef(null), v = x.useRef(!1), g = x.useRef(null), m = Be(t.ref, g), h = x.useRef(null);
  x.useEffect(() => {
    !l || !g.current || (v.current = !n);
  }, [n, l]), x.useEffect(() => {
    if (!l || !g.current)
      return;
    const y = Ee(g.current);
    return g.current.contains(y.activeElement) || (g.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), g.current.setAttribute("tabIndex", "-1")), v.current && g.current.focus()), () => {
      o || (f.current && f.current.focus && (c.current = !0, f.current.focus()), f.current = null);
    };
  }, [l]), x.useEffect(() => {
    if (!l || !g.current)
      return;
    const y = Ee(g.current), w = (P) => {
      h.current = P, !(r || !s() || P.key !== "Tab") && y.activeElement === g.current && P.shiftKey && (c.current = !0, d.current && d.current.focus());
    }, b = () => {
      const P = g.current;
      if (P === null)
        return;
      if (!y.hasFocus() || !s() || c.current) {
        c.current = !1;
        return;
      }
      if (P.contains(y.activeElement) || r && y.activeElement !== u.current && y.activeElement !== d.current)
        return;
      if (y.activeElement !== p.current)
        p.current = null;
      else if (p.current !== null)
        return;
      if (!v.current)
        return;
      let D = [];
      if ((y.activeElement === u.current || y.activeElement === d.current) && (D = i(g.current)), D.length > 0) {
        var A, I;
        const B = !!((A = h.current) != null && A.shiftKey && ((I = h.current) == null ? void 0 : I.key) === "Tab"), z = D[0], G = D[D.length - 1];
        typeof z != "string" && typeof G != "string" && (B ? G.focus() : z.focus());
      } else
        P.focus();
    };
    y.addEventListener("focusin", b), y.addEventListener("keydown", w, !0);
    const S = setInterval(() => {
      y.activeElement && y.activeElement.tagName === "BODY" && b();
    }, 50);
    return () => {
      clearInterval(S), y.removeEventListener("focusin", b), y.removeEventListener("keydown", w, !0);
    };
  }, [n, r, o, s, l, i]);
  const E = (y) => {
    f.current === null && (f.current = y.relatedTarget), v.current = !0, p.current = y.target;
    const w = t.props.onFocus;
    w && w(y);
  }, _ = (y) => {
    f.current === null && (f.current = y.relatedTarget), v.current = !0;
  };
  return /* @__PURE__ */ fe(x.Fragment, {
    children: [/* @__PURE__ */ T("div", {
      tabIndex: l ? 0 : -1,
      onFocus: _,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ x.cloneElement(t, {
      ref: m,
      onFocus: E
    }), /* @__PURE__ */ T("div", {
      tabIndex: l ? 0 : -1,
      onFocus: _,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Gn.propTypes = {
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
process.env.NODE_ENV !== "production" && (Gn["propTypes"] = ra(Gn.propTypes));
const Th = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Oh = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, ls = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = wn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: d,
    onEntered: f,
    onEntering: p,
    onExit: v,
    onExited: g,
    onExiting: m,
    style: h,
    timeout: E = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: _ = Ia
  } = t, y = ce(t, Th), w = x.useRef(null), b = Be(w, l.ref, n), S = (L) => (M) => {
    if (L) {
      const R = w.current;
      M === void 0 ? L(R) : L(R, M);
    }
  }, P = S(p), D = S((L, M) => {
    Aa(L);
    const R = qn({
      style: h,
      timeout: E,
      easing: c
    }, {
      mode: "enter"
    });
    L.style.webkitTransition = r.transitions.create("opacity", R), L.style.transition = r.transitions.create("opacity", R), d && d(L, M);
  }), A = S(f), I = S(m), B = S((L) => {
    const M = qn({
      style: h,
      timeout: E,
      easing: c
    }, {
      mode: "exit"
    });
    L.style.webkitTransition = r.transitions.create("opacity", M), L.style.transition = r.transitions.create("opacity", M), v && v(L);
  }), z = S(g);
  return /* @__PURE__ */ T(_, k({
    appear: s,
    in: u,
    nodeRef: w,
    onEnter: D,
    onEntered: A,
    onEntering: P,
    onExit: B,
    onExited: z,
    onExiting: I,
    addEndListener: (L) => {
      i && i(w.current, L);
    },
    timeout: E
  }, y, {
    children: (L, M) => /* @__PURE__ */ x.cloneElement(l, k({
      style: k({
        opacity: 0,
        visibility: L === "exited" && !u ? "hidden" : void 0
      }, Oh[L], h, l.props.style),
      ref: b
    }, M))
  }));
});
process.env.NODE_ENV !== "production" && (ls.propTypes = {
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
const kh = ls;
function Sh(e) {
  return Ge("MuiBackdrop", e);
}
ut("MuiBackdrop", ["root", "invisible"]);
const Ph = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Ch = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return rt({
    root: ["root", n && "invisible"]
  }, Sh, t);
}, Rh = Te("div", {
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
})), cs = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i;
  const s = ot({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: d = {},
    componentsProps: f = {},
    invisible: p = !1,
    open: v,
    slotProps: g = {},
    slots: m = {},
    TransitionComponent: h = kh,
    transitionDuration: E
  } = s, _ = ce(s, Ph), y = k({}, s, {
    component: u,
    invisible: p
  }), w = Ch(y), b = (r = g.root) != null ? r : f.root;
  return /* @__PURE__ */ T(h, k({
    in: v,
    timeout: E
  }, _, {
    children: /* @__PURE__ */ T(Rh, k({
      "aria-hidden": !0
    }, b, {
      as: (o = (i = m.root) != null ? i : d.Root) != null ? o : u,
      className: we(w.root, c, b == null ? void 0 : b.className),
      ownerState: k({}, y, b == null ? void 0 : b.ownerState),
      classes: w,
      ref: n,
      children: l
    }))
  }));
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
const Nh = cs;
function _h(e) {
  return Ge("MuiModal", e);
}
ut("MuiModal", ["root", "hidden", "backdrop"]);
const $h = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Mh = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return rt({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, _h, r);
}, Ih = Te("div", {
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
})), Ah = Te(Nh, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), us = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i, s, l, c;
  const u = ot({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = Ah,
    BackdropProps: f,
    className: p,
    closeAfterTransition: v = !1,
    children: g,
    container: m,
    component: h,
    components: E = {},
    componentsProps: _ = {},
    disableAutoFocus: y = !1,
    disableEnforceFocus: w = !1,
    disableEscapeKeyDown: b = !1,
    disablePortal: S = !1,
    disableRestoreFocus: P = !1,
    disableScrollLock: D = !1,
    hideBackdrop: A = !1,
    keepMounted: I = !1,
    onBackdropClick: B,
    open: z,
    slotProps: G,
    slots: L
    // eslint-disable-next-line react/prop-types
  } = u, M = ce(u, $h), R = k({}, u, {
    closeAfterTransition: v,
    disableAutoFocus: y,
    disableEnforceFocus: w,
    disableEscapeKeyDown: b,
    disablePortal: S,
    disableRestoreFocus: P,
    disableScrollLock: D,
    hideBackdrop: A,
    keepMounted: I
  }), {
    getRootProps: j,
    getBackdropProps: Q,
    getTransitionProps: Z,
    portalRef: O,
    isTopModal: $,
    exited: V,
    hasTransition: K
  } = gh(k({}, R, {
    rootRef: n
  })), F = k({}, R, {
    exited: V
  }), U = Mh(F), W = {};
  if (g.props.tabIndex === void 0 && (W.tabIndex = "-1"), K) {
    const {
      onEnter: J,
      onExited: C
    } = Z();
    W.onEnter = J, W.onExited = C;
  }
  const H = (r = (o = L == null ? void 0 : L.root) != null ? o : E.Root) != null ? r : Ih, q = (i = (s = L == null ? void 0 : L.backdrop) != null ? s : E.Backdrop) != null ? i : d, X = (l = G == null ? void 0 : G.root) != null ? l : _.root, Y = (c = G == null ? void 0 : G.backdrop) != null ? c : _.backdrop, ne = wt({
    elementType: H,
    externalSlotProps: X,
    externalForwardedProps: M,
    getSlotProps: j,
    additionalProps: {
      ref: n,
      as: h
    },
    ownerState: F,
    className: we(p, X == null ? void 0 : X.className, U == null ? void 0 : U.root, !F.open && F.exited && (U == null ? void 0 : U.hidden))
  }), N = wt({
    elementType: q,
    externalSlotProps: Y,
    additionalProps: f,
    getSlotProps: (J) => Q(k({}, J, {
      onClick: (C) => {
        B && B(C), J != null && J.onClick && J.onClick(C);
      }
    })),
    className: we(Y == null ? void 0 : Y.className, f == null ? void 0 : f.className, U == null ? void 0 : U.backdrop),
    ownerState: F
  });
  return !I && !z && (!K || V) ? null : /* @__PURE__ */ T(hn, {
    ref: O,
    container: m,
    disablePortal: S,
    children: /* @__PURE__ */ fe(H, k({}, ne, {
      children: [!A && d ? /* @__PURE__ */ T(q, k({}, N)) : null, /* @__PURE__ */ T(Gn, {
        disableEnforceFocus: w,
        disableAutoFocus: y,
        disableRestoreFocus: P,
        isEnabled: $,
        open: z,
        children: /* @__PURE__ */ x.cloneElement(g, W)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (us.propTypes = {
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
  container: a.oneOfType([Qe, a.func]),
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
const Dh = us;
function jh(e) {
  return Ge("MuiPaper", e);
}
ut("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Bh = ["className", "component", "elevation", "square", "variant"], Lh = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return rt(i, jh, o);
}, Fh = Te("div", {
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
    backgroundImage: `linear-gradient(${Vn("#fff", xi(t.elevation))}, ${Vn("#fff", xi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), ds = /* @__PURE__ */ x.forwardRef(function(t, n) {
  const r = ot({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = ce(r, Bh), d = k({}, r, {
    component: i,
    elevation: s,
    square: l,
    variant: c
  }), f = Lh(d);
  return process.env.NODE_ENV !== "production" && wn().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ T(Fh, k({
    as: i,
    ownerState: d,
    className: we(f.root, o),
    ref: n
  }, u));
});
process.env.NODE_ENV !== "production" && (ds.propTypes = {
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
  elevation: zt(fa, (e) => {
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
const Vh = ds;
function zh(e) {
  return Ge("MuiPopover", e);
}
ut("MuiPopover", ["root", "paper"]);
const Uh = ["onEntering"], qh = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Wh = ["slotProps"];
function Ci(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Ri(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function Ni(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function jn(e) {
  return typeof e == "function" ? e() : e;
}
const Hh = (e) => {
  const {
    classes: t
  } = e;
  return rt({
    root: ["root"],
    paper: ["paper"]
  }, zh, t);
}, Gh = Te(Dh, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ps = Te(Vh, {
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
}), fs = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o, i;
  const s = ot({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: d,
    anchorReference: f = "anchorEl",
    children: p,
    className: v,
    container: g,
    elevation: m = 8,
    marginThreshold: h = 16,
    open: E,
    PaperProps: _ = {},
    slots: y,
    slotProps: w,
    transformOrigin: b = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: S = Lr,
    transitionDuration: P = "auto",
    TransitionProps: {
      onEntering: D
    } = {},
    disableScrollLock: A = !1
  } = s, I = ce(s.TransitionProps, Uh), B = ce(s, qh), z = (r = w == null ? void 0 : w.paper) != null ? r : _, G = x.useRef(), L = Be(G, z.ref), M = k({}, s, {
    anchorOrigin: u,
    anchorReference: f,
    elevation: m,
    marginThreshold: h,
    externalPaperSlotProps: z,
    transformOrigin: b,
    TransitionComponent: S,
    transitionDuration: P,
    TransitionProps: I
  }), R = Hh(M), j = x.useCallback(() => {
    if (f === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const J = jn(c), C = J && J.nodeType === 1 ? J : Ee(G.current).body, re = C.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ye = C.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ye.top === 0 && ye.left === 0 && ye.right === 0 && ye.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: re.top + Ci(re, u.vertical),
      left: re.left + Ri(re, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, d, f]), Q = x.useCallback((J) => ({
    vertical: Ci(J, b.vertical),
    horizontal: Ri(J, b.horizontal)
  }), [b.horizontal, b.vertical]), Z = x.useCallback((J) => {
    const C = {
      width: J.offsetWidth,
      height: J.offsetHeight
    }, re = Q(C);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Ni(re)
      };
    const ye = j();
    let Oe = ye.top - re.vertical, he = ye.left - re.horizontal;
    const ft = Oe + C.height, ke = he + C.width, Ke = At(jn(c)), Re = Ke.innerHeight - h, Xe = Ke.innerWidth - h;
    if (h !== null && Oe < h) {
      const xe = Oe - h;
      Oe -= xe, re.vertical += xe;
    } else if (h !== null && ft > Re) {
      const xe = ft - Re;
      Oe -= xe, re.vertical += xe;
    }
    if (process.env.NODE_ENV !== "production" && C.height > Re && C.height && Re && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${C.height - Re}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), h !== null && he < h) {
      const xe = he - h;
      he -= xe, re.horizontal += xe;
    } else if (ke > Xe) {
      const xe = ke - Xe;
      he -= xe, re.horizontal += xe;
    }
    return {
      top: `${Math.round(Oe)}px`,
      left: `${Math.round(he)}px`,
      transformOrigin: Ni(re)
    };
  }, [c, f, j, Q, h]), [O, $] = x.useState(E), V = x.useCallback(() => {
    const J = G.current;
    if (!J)
      return;
    const C = Z(J);
    C.top !== null && (J.style.top = C.top), C.left !== null && (J.style.left = C.left), J.style.transformOrigin = C.transformOrigin, $(!0);
  }, [Z]);
  x.useEffect(() => (A && window.addEventListener("scroll", V), () => window.removeEventListener("scroll", V)), [c, A, V]);
  const K = (J, C) => {
    D && D(J, C), V();
  }, F = () => {
    $(!1);
  };
  x.useEffect(() => {
    E && V();
  }), x.useImperativeHandle(l, () => E ? {
    updatePosition: () => {
      V();
    }
  } : null, [E, V]), x.useEffect(() => {
    if (!E)
      return;
    const J = aa(() => {
      V();
    }), C = At(c);
    return C.addEventListener("resize", J), () => {
      J.clear(), C.removeEventListener("resize", J);
    };
  }, [c, E, V]);
  let U = P;
  P === "auto" && !S.muiSupportAuto && (U = void 0);
  const W = g || (c ? Ee(jn(c)).body : void 0), H = (o = y == null ? void 0 : y.root) != null ? o : Gh, q = (i = y == null ? void 0 : y.paper) != null ? i : ps, X = wt({
    elementType: q,
    externalSlotProps: k({}, z, {
      style: O ? z.style : k({}, z.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: m,
      ref: L
    },
    ownerState: M,
    className: we(R.paper, z == null ? void 0 : z.className)
  }), Y = wt({
    elementType: H,
    externalSlotProps: (w == null ? void 0 : w.root) || {},
    externalForwardedProps: B,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: W,
      open: E
    },
    ownerState: M,
    className: we(R.root, v)
  }), {
    slotProps: ne
  } = Y, N = ce(Y, Wh);
  return /* @__PURE__ */ T(H, k({}, N, !Qi(H) && {
    slotProps: ne,
    disableScrollLock: A
  }, {
    children: /* @__PURE__ */ T(S, k({
      appear: !0,
      in: E,
      onEntering: K,
      onExited: F,
      timeout: U
    }, I, {
      children: /* @__PURE__ */ T(q, k({}, X, {
        children: p
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (fs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Gr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: zt(a.oneOfType([Qe, a.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = jn(e.anchorEl);
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
  container: a.oneOfType([Qe, a.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: a.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: fa,
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
    component: Kl
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: a.object
});
const Kh = fs;
function Xh(e) {
  return Ge("MuiMenu", e);
}
ut("MuiMenu", ["root", "paper", "list"]);
const Yh = ["onEntering"], Jh = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Zh = {
  vertical: "top",
  horizontal: "right"
}, Qh = {
  vertical: "top",
  horizontal: "left"
}, em = (e) => {
  const {
    classes: t
  } = e;
  return rt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Xh, t);
}, tm = Te(Kh, {
  shouldForwardProp: (e) => _a(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), nm = Te(ps, {
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
}), rm = Te(sh, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), hs = /* @__PURE__ */ x.forwardRef(function(t, n) {
  var r, o;
  const i = ot({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: d = {},
    onClose: f,
    open: p,
    PaperProps: v = {},
    PopoverClasses: g,
    transitionDuration: m = "auto",
    TransitionProps: {
      onEntering: h
    } = {},
    variant: E = "selectedMenu",
    slots: _ = {},
    slotProps: y = {}
  } = i, w = ce(i.TransitionProps, Yh), b = ce(i, Jh), S = wn(), P = S.direction === "rtl", D = k({}, i, {
    autoFocus: s,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: h,
    PaperProps: v,
    transitionDuration: m,
    TransitionProps: w,
    variant: E
  }), A = em(D), I = s && !u && p, B = x.useRef(null), z = (Z, O) => {
    B.current && B.current.adjustStyleForScrollbar(Z, S), h && h(Z, O);
  }, G = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), f && f(Z, "tabKeyDown"));
  };
  let L = -1;
  x.Children.map(l, (Z, O) => {
    /* @__PURE__ */ x.isValidElement(Z) && (process.env.NODE_ENV !== "production" && Ln.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (E === "selectedMenu" && Z.props.selected || L === -1) && (L = O));
  });
  const M = (r = _.paper) != null ? r : nm, R = (o = y.paper) != null ? o : v, j = wt({
    elementType: _.root,
    externalSlotProps: y.root,
    ownerState: D,
    className: [A.root, c]
  }), Q = wt({
    elementType: M,
    externalSlotProps: R,
    ownerState: D,
    className: A.paper
  });
  return /* @__PURE__ */ T(tm, k({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: P ? "right" : "left"
    },
    transformOrigin: P ? Zh : Qh,
    slots: {
      paper: M,
      root: _.root
    },
    slotProps: {
      root: j,
      paper: Q
    },
    open: p,
    ref: n,
    transitionDuration: m,
    TransitionProps: k({
      onEntering: z
    }, w),
    ownerState: D
  }, b, {
    classes: g,
    children: /* @__PURE__ */ T(rm, k({
      onKeyDown: G,
      actions: B,
      autoFocus: s && (L === -1 || u),
      autoFocusItem: I,
      variant: E
    }, d, {
      className: we(A.list, d.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (hs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: a.oneOfType([Qe, a.func]),
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: a.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: a.oneOf(["menu", "selectedMenu"])
});
const om = hs;
function Tm({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = bt.useState(void 0), s = Ze(
    (d) => {
      d.preventDefault(), i(
        o === void 0 ? {
          mouseX: d.clientX + 2,
          mouseY: d.clientY - 6
        } : (
          // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          void 0
        )
      );
    },
    [o]
  ), l = Ze(() => {
    i(void 0);
  }, []), c = Ft(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = n == null ? void 0 : n.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ fe(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ T(
          om,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ T(
              go,
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
function Om({
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
    Di,
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
function Kn({
  variant: e = "outlined",
  id: t,
  isDisabled: n = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: s,
  placeholder: l,
  isRequired: c = !1,
  className: u,
  defaultValue: d,
  value: f,
  onChange: p,
  onFocus: v,
  onBlur: g
}) {
  return /* @__PURE__ */ T(
    Mi,
    {
      variant: e,
      id: t,
      disabled: n,
      error: r,
      fullWidth: o,
      helperText: i,
      label: s,
      placeholder: l,
      required: c,
      className: `papi-textfield ${u ?? ""}`,
      defaultValue: d,
      value: f,
      onChange: p,
      onFocus: v,
      onBlur: g
    }
  );
}
let Sr;
const Pr = () => (Sr || (Sr = me.allBookIds.map((e) => ({
  bookId: e,
  label: me.bookIdToEnglishName(e)
}))), Sr);
function km({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c, u) => {
    const f = { bookNum: me.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(f);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, s = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = Ft(() => Pr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ fe("span", { id: n, children: [
    /* @__PURE__ */ T(
      Rr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: Pr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ T(
      Ot,
      {
        onClick: () => r(Co(e, -1)),
        isDisabled: e.bookNum <= Rs,
        children: "<"
      }
    ),
    /* @__PURE__ */ T(
      Ot,
      {
        onClick: () => r(Co(e, 1)),
        isDisabled: e.bookNum >= Pr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ T(
      Kn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ T(
      Ot,
      {
        onClick: () => t(Ro(e, -1)),
        isDisabled: e.chapterNum <= Ns,
        children: "<"
      }
    ),
    /* @__PURE__ */ T(
      Ot,
      {
        onClick: () => t(Ro(e, 1)),
        isDisabled: e.chapterNum >= $i(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ T(
      Kn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ T(
      Ot,
      {
        onClick: () => t(No(e, -1)),
        isDisabled: e.verseNum <= _s,
        children: "<"
      }
    ),
    /* @__PURE__ */ T(Ot, { onClick: () => t(No(e, 1)), children: ">" })
  ] });
}
function Sm({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = Je(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ T(Gs, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ T(
    Kn,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  ) });
}
function Pm({
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
  className: d,
  onChange: f,
  onChangeCommitted: p
}) {
  return /* @__PURE__ */ T(
    Ks,
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
      className: `papi-slider ${n} ${d ?? ""}`,
      onChange: f,
      onChangeCommitted: p
    }
  );
}
function Cm({
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
    Xs,
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
function Rm({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ T(
    Ys,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function _i({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ T(Kn, { defaultValue: t[n.key], onChange: r });
}
const im = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ T(
  Pl,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Nm({
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
  enableSelectColumn: d,
  selectColumnWidth: f = 50,
  rowKeyGetter: p,
  rowHeight: v = 35,
  headerRowHeight: g = 35,
  selectedRows: m,
  onSelectedRowsChange: h,
  onRowsChange: E,
  onCellClick: _,
  onCellDoubleClick: y,
  onCellContextMenu: w,
  onCellKeyDown: b,
  direction: S = "ltr",
  enableVirtualization: P = !0,
  onCopy: D,
  onPaste: A,
  onScroll: I,
  className: B,
  "data-testid": z
}) {
  const G = Ft(() => {
    const L = e.map((M) => typeof M.editable == "function" ? {
      ...M,
      editable: (j) => !!M.editable(j),
      renderEditCell: M.renderEditCell || _i
    } : M.editable && !M.renderEditCell ? { ...M, renderEditCell: _i } : M.renderEditCell && !M.editable ? { ...M, editable: !1 } : M);
    return d ? [{ ...rl, minWidth: f }, ...L] : L;
  }, [e, d, f]);
  return /* @__PURE__ */ T(
    nl,
    {
      columns: G,
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
      rowKeyGetter: p,
      rowHeight: v,
      headerRowHeight: g,
      selectedRows: m,
      onSelectedRowsChange: h,
      onRowsChange: E,
      onCellClick: _,
      onCellDoubleClick: y,
      onCellContextMenu: w,
      onCellKeyDown: b,
      direction: S,
      enableVirtualization: P,
      onCopy: D,
      onPaste: A,
      onScroll: I,
      renderers: { renderCheckbox: im },
      className: `papi-table ${B ?? "rdg-light"}`,
      "data-testid": z
    }
  );
}
const am = es(/* @__PURE__ */ T("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function _m({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const [i, s] = Je(!1), [l, c] = Je(!1), u = Ze(() => {
    i && s(!1), c(!1);
  }, [i]), d = Ze((h) => {
    h.stopPropagation(), s((E) => {
      const _ = !E;
      return _ && h.shiftKey ? c(!0) : _ || c(!1), _;
    });
  }, []), f = Bn(void 0), [p, v] = Je(0);
  Xn(() => {
    i && f.current && v(f.current.clientHeight);
  }, [i]);
  const g = Ze(
    (h) => (u(), t(h)),
    [t, u]
  ), m = e == null ? void 0 : e(l);
  return /* @__PURE__ */ T("div", { ref: f, style: { position: "relative" }, children: /* @__PURE__ */ T(Js, { position: "static", id: r, children: /* @__PURE__ */ fe(Zs, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    m ? /* @__PURE__ */ T(
      Di,
      {
        edge: "start",
        className: `papi-menuButton ${n ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: d,
        children: /* @__PURE__ */ T(am, {})
      }
    ) : void 0,
    o ? /* @__PURE__ */ T("div", { className: "papi-menu-children", children: o }) : void 0,
    m ? /* @__PURE__ */ T(
      Qs,
      {
        className: `papi-menu-drawer ${n ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: i,
        onClose: u,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: p
          }
        },
        children: /* @__PURE__ */ T(
          Qf,
          {
            className: n,
            commandHandler: g,
            multiColumnMenu: m
          }
        )
      }
    ) : void 0
  ] }) }) });
}
const $m = (e, t) => {
  Xn(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
};
function sm(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const lm = (e, t, n = {}) => {
  const r = Bn(t);
  r.current = t;
  const o = Bn(n);
  o.current = sm(o.current);
  const [i, s] = Je(() => r.current), [l, c] = Je(!0);
  return Xn(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const d = await e();
        u && (s(() => d), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [i, l];
}, Cr = () => !1, Mm = (e, t) => {
  const [n] = lm(
    Ze(async () => {
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
  Xn(() => () => {
    n !== Cr && n();
  }, [n]);
};
function cm(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
cm(`.papi-button {
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
}body {
  font-family: Inter, sans-serif;
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  background-color: #fff;
}

.menu-content {
  width: 300px;
  height: 500px;
  overflow-y: auto;
}

.menu-label {
  color: #334155;
  font-weight: 600;
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

.input-container {
  position: relative;
  display: inline-block;
}

.book-chapter-input {
  width: 300px;
  height: 36px;
  padding: 8px 40px 8px 16px;
  color: #0f172a;
  background: #fff;
  border-radius: 6px;
  box-sizing: border-box;
}

.history-icon-container {
  position: absolute;
  top: 20px;
  transform: translateY(-50%);
  right: 16px;
  cursor: pointer;
}
.chapter-select {
  display: flex;
  padding: 0 8px 0 24px;
  align-items: flex-start;
  align-content: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  background: #FFFBEB;
}

.chapter {
  display: flex;
  width: 20px;
  height: 20px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #92400E;
  border-radius: 4px;
}

.chapter:hover {
  background: #FDE68A;
}

.active {
  background: #FDE68A;
  color: #78350F;
  font-weight: 600;
}
.menu-item {
  color: #334155;
}

.menu-item.selected {
  color: #78350F;
  background-color: #FFFBEB;
}

.book-color-label {
  height: 16px;
  width: 2px;
  margin-right: 10px;
}

.book-color-label.ot {
  background-color: #FCA5A5;
}

.book-color-label.nt {
  background-color: #E9D5FF;
}

.book-color-label.dc {
  background-color: #C7D2FE;
}
`, "top");
export {
  wm as BookChapterControl,
  Ot as Button,
  Em as ChapterRangeSelector,
  Pl as Checkbox,
  Rr as ComboBox,
  Tm as ContextMenu,
  Qf as GridMenu,
  Om as IconButton,
  $t as LabelPosition,
  ns as MenuItem,
  km as RefSelector,
  Sm as SearchBar,
  Pm as Slider,
  Cm as Snackbar,
  Rm as Switch,
  Nm as Table,
  Kn as TextField,
  _m as Toolbar,
  $m as useEvent,
  Mm as useEventAsync,
  lm as usePromise
};
//# sourceMappingURL=index.js.map
