import xs, { jsxs as re, jsx as y, Fragment as Xn } from "react/jsx-runtime";
import * as E from "react";
import he, { forwardRef as $i, useCallback as Pe, useState as Ee, useRef as bt, useEffect as zt, useLayoutEffect as So, useMemo as bn } from "react";
import { getChaptersForBook as Mi, offsetBook as Po, FIRST_SCR_BOOK_NUM as Es, offsetChapter as Ro, FIRST_SCR_CHAPTER_NUM as ks, offsetVerse as $o, FIRST_SCR_VERSE_NUM as Ts } from "platform-bible-utils";
import * as fe from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Os, Check as Ii, Circle as Ns, History as Cs, ArrowDownWideNarrow as Ss, Clock as Ps, Bookmark as Rs, X as $s, Search as Ms, ChevronsUpDown as Is } from "lucide-react";
import ke, { clsx as _s } from "clsx";
import { twMerge as As } from "tailwind-merge";
import { Slot as Ds } from "@radix-ui/react-slot";
import { cva as _i } from "class-variance-authority";
import { FormControlLabel as Mo, FormLabel as js, Checkbox as Bs, MenuItem as Ls, ListItemText as Fs, ListItemIcon as Ai, Menu as Vs, Grid as Di, List as zs, IconButton as ji, Drawer as Us, Slider as Hs, Snackbar as Ws, Switch as qs, AppBar as Xs, Toolbar as Ys } from "@mui/material";
import * as un from "@radix-ui/react-popover";
import { Command as Me } from "cmdk";
import * as Xe from "@radix-ui/react-dialog";
import Gs, { ThemeContext as Ks, internal_processStyles as Js } from "@mui/styled-engine";
import * as Zs from "react-dom";
import Sn from "react-dom";
import * as Bi from "@radix-ui/react-label";
import Qs, { SelectColumn as el } from "react-data-grid";
import * as Ie from "@radix-ui/react-tabs";
var tl = Object.defineProperty, nl = (e, t, n) => t in e ? tl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ne = (e, t, n) => (nl(e, typeof t != "symbol" ? t + "" : t, n), n);
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
], Li = [
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
], Io = dl();
function Ut(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Io ? Io[e] : 0;
}
function Fr(e) {
  return Ut(e) > 0;
}
function rl(e) {
  const t = typeof e == "string" ? Ut(e) : e;
  return t >= 40 && t <= 66;
}
function ol(e) {
  return (typeof e == "string" ? Ut(e) : e) <= 39;
}
function Fi(e) {
  return e <= 66;
}
function il(e) {
  const t = typeof e == "string" ? Ut(e) : e;
  return Ui(t) && !Fi(t);
}
function* al() {
  for (let e = 1; e <= yt.length; e++)
    yield e;
}
const sl = 1, Vi = yt.length;
function ll() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Vr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= yt.length ? t : yt[n];
}
function zi(e) {
  return e <= 0 || e > Vi ? "******" : Li[e - 1];
}
function cl(e) {
  return zi(Ut(e));
}
function Ui(e) {
  const t = typeof e == "number" ? Vr(e) : e;
  return Fr(t) && !Lr.includes(t);
}
function pl(e) {
  const t = typeof e == "number" ? Vr(e) : e;
  return Fr(t) && Lr.includes(t);
}
function ul(e) {
  return Li[e - 1].includes("*obsolete*");
}
function dl() {
  const e = {};
  for (let t = 0; t < yt.length; t++)
    e[yt[t]] = t + 1;
  return e;
}
const ue = {
  allBookIds: yt,
  nonCanonicalIds: Lr,
  bookIdToNumber: Ut,
  isBookIdValid: Fr,
  isBookNT: rl,
  isBookOT: ol,
  isBookOTNT: Fi,
  isBookDC: il,
  allBookNumbers: al,
  firstBook: sl,
  lastBook: Vi,
  extraBooks: ll,
  bookNumberToId: Vr,
  bookNumberToEnglishName: zi,
  bookIdToEnglishName: cl,
  isCanonical: Ui,
  isExtraMaterial: pl,
  isObsolete: ul
};
var st = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(st || {});
const De = class {
  // private versInfo: Versification;
  constructor(t) {
    if (ne(this, "name"), ne(this, "fullPath"), ne(this, "isPresent"), ne(this, "hasVerseSegments"), ne(this, "isCustomized"), ne(this, "baseVersification"), ne(this, "scriptureBooks"), ne(this, "_type"), t != null)
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
ne(De, "Original", new De(st.Original)), ne(De, "Septuagint", new De(st.Septuagint)), ne(De, "Vulgate", new De(st.Vulgate)), ne(De, "English", new De(st.English)), ne(De, "RussianProtestant", new De(st.RussianProtestant)), ne(De, "RussianOrthodox", new De(st.RussianOrthodox));
let Mt = De;
function _o(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Hi = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Hi || {});
const Se = class ae {
  constructor(t, n, r, o) {
    if (ne(this, "firstChapter"), ne(this, "lastChapter"), ne(this, "lastVerse"), ne(this, "hasSegmentsDefined"), ne(this, "text"), ne(this, "BBBCCCVVVS"), ne(this, "longHashCode"), ne(this, "versification"), ne(this, "rtlMark", "‏"), ne(this, "_bookNum", 0), ne(this, "_chapterNum", 0), ne(this, "_verseNum", 0), ne(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof Mt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof Mt ? n : void 0;
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
          const i = t instanceof Mt ? t : ae.defaultVersification;
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
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(t, n = ae.defaultVersification) {
    const r = new ae(n);
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
      return n = ae.parse(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Kt)
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
      if (n = n * 10 + +r - +"0", n > ae.bcvMaxValue)
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
      throw new Kt(
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
    this.versification = this.versification != null ? new Mt(t) : void 0;
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
          this.versification = new Mt(st[s]);
        } catch {
          throw new Kt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Kt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ue.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ae.isVerseParseable(r[1]))
      throw new Kt("Invalid reference : " + t);
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
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(t) {
    return t instanceof ae ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && t.versification != null && this.versification != null && t.versification.equals(this.versification) : !1;
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
    const o = [], i = _o(this._verse, r);
    for (const s of i.map((l) => _o(l, n))) {
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
ne(Se, "defaultVersification", Mt.English), ne(Se, "verseRangeSeparator", "-"), ne(Se, "verseSequenceIndicator", ","), ne(Se, "verseRangeSeparators", [Se.verseRangeSeparator]), ne(Se, "verseSequenceIndicators", [Se.verseSequenceIndicator]), ne(Se, "chapterDigitShifter", 1e3), ne(Se, "bookDigitShifter", Se.chapterDigitShifter * Se.chapterDigitShifter), ne(Se, "bcvMaxValue", Se.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
ne(Se, "ValidStatusType", Hi);
class Kt extends Error {
}
function ee(...e) {
  return As(_s(e));
}
const fl = fe.Root, ml = fe.Trigger, ph = fe.Group, uh = fe.Portal, dh = fe.Sub, fh = fe.RadioGroup, hl = he.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ re(
  fe.SubTrigger,
  {
    ref: o,
    className: ee(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ y(Os, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
hl.displayName = fe.SubTrigger.displayName;
const gl = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  fe.SubContent,
  {
    ref: n,
    className: ee(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
gl.displayName = fe.SubContent.displayName;
const Wi = he.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ y(fe.Portal, { children: /* @__PURE__ */ y(
  fe.Content,
  {
    ref: r,
    sideOffset: t,
    className: ee(
      /* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Wi.displayName = fe.Content.displayName;
const qi = he.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ y(
  fe.Item,
  {
    ref: r,
    className: ee(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
qi.displayName = fe.Item.displayName;
const bl = he.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ re(
  fe.CheckboxItem,
  {
    ref: o,
    className: ee(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(fe.ItemIndicator, { children: /* @__PURE__ */ y(Ii, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
bl.displayName = fe.CheckboxItem.displayName;
const vl = he.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ re(
  fe.RadioItem,
  {
    ref: r,
    className: ee(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(fe.ItemIndicator, { children: /* @__PURE__ */ y(Ns, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
vl.displayName = fe.RadioItem.displayName;
const zr = he.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ y(
  fe.Label,
  {
    ref: r,
    className: ee("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
zr.displayName = fe.Label.displayName;
const Xi = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  fe.Separator,
  {
    ref: n,
    className: ee("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Xi.displayName = fe.Separator.displayName;
function yl({ className: e, ...t }) {
  return /* @__PURE__ */ y(
    "span",
    {
      className: ee("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
yl.displayName = "DropdownMenuShortcut";
const Ur = he.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ y(
    "input",
    {
      type: t,
      className: ee(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Ur.displayName = "Input";
const wl = $i(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ re("div", { className: "pr-relative", children: [
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
      Cs,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function xl({
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
  return /* @__PURE__ */ y("div", { className: ee("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((l) => /* @__PURE__ */ y(
    "div",
    {
      className: ee(
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
const El = $i(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, l) => /* @__PURE__ */ re(
    qi,
    {
      ref: l,
      textValue: e,
      className: ee("pr-font-normal pr-text-slate-700", {
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
            className: ee(
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
function kl({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ re(zr, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ y("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ re("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ y(
        Ss,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ y(
        Ps,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ y(
        Rs,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const an = ue.allBookIds, Tl = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Ao = ["OT", "NT", "DC"], Ol = 32 + 32 + 32, Nl = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Cl = (e) => ({
  OT: an.filter((n) => ue.isBookOT(n)),
  NT: an.filter((n) => ue.isBookNT(n)),
  DC: an.filter((n) => ue.isBookDC(n))
})[e], Jt = (e) => Mi(ue.bookIdToNumber(e));
function Sl() {
  return an.map((t) => ue.bookIdToEnglishName(t));
}
function Pl(e) {
  return Sl().includes(e);
}
function Rl(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Pl(t))
    return an.find((r) => ue.bookIdToEnglishName(r) === t);
}
function mh({ scrRef: e, handleSubmit: t }) {
  const [n, r] = Ee(""), [o, i] = Ee(
    ue.bookNumberToId(e.bookNum)
  ), [s, l] = Ee(e.chapterNum ?? 0), [c, p] = Ee(
    ue.bookNumberToId(e.bookNum)
  ), [u, f] = Ee(!1), [d, b] = Ee(u), v = bt(void 0), g = bt(void 0), m = bt(void 0), k = Pe(
    (C) => Cl(C).filter((R) => {
      const $ = ue.bookIdToEnglishName(R).toLowerCase(), j = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return $.includes(j) || // Match book name
      R.toLowerCase().includes(j);
    }),
    [n]
  ), I = (C) => {
    r(C);
  }, w = bt(!1), x = Pe((C) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    f(C);
  }, []), h = Pe(
    (C, R, $, j) => {
      if (l(
        ue.bookNumberToId(e.bookNum) !== C ? 1 : e.chapterNum
      ), R || Jt(C) === -1) {
        t({
          bookNum: ue.bookIdToNumber(C),
          chapterNum: $ || 1,
          verseNum: j || 1
        }), f(!1), r("");
        return;
      }
      i(o !== C ? C : ""), f(!R);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), N = (C) => {
    C <= 0 || C > Jt(o) || h(o, !0, C);
  }, S = Pe(() => {
    Nl.forEach((C) => {
      const R = n.match(C);
      if (R) {
        const [$, j = void 0, D = void 0] = R.slice(1), M = Rl($);
        (ue.isBookIdValid($) || M) && h(
          M ?? $,
          !0,
          j ? parseInt(j, 10) : 1,
          D ? parseInt(D, 10) : 1
        );
      }
    });
  }, [h, n]), L = Pe(
    (C) => {
      u ? (C.key === "ArrowDown" || C.key === "ArrowUp") && (typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null ? m.current.focus() : typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null && g.current.focus(), C.preventDefault()) : f(!0);
    },
    [u]
  ), B = (C) => {
    const { key: R } = C;
    R === "ArrowRight" || R === "ArrowLeft" || R === "ArrowDown" || R === "ArrowUp" || R === "Enter" || (v.current.dispatchEvent(new KeyboardEvent("keydown", { key: R })), v.current.focus());
  }, F = (C) => {
    const { key: R } = C;
    if (c === o) {
      if (R === "Enter") {
        C.preventDefault(), h(o, !0, s);
        return;
      }
      let $ = 0;
      if (R === "ArrowRight")
        if (s < Jt(c))
          $ = 1;
        else {
          C.preventDefault();
          return;
        }
      else if (R === "ArrowLeft")
        if (s > 1)
          $ = -1;
        else {
          C.preventDefault();
          return;
        }
      else
        R === "ArrowDown" ? $ = 6 : R === "ArrowUp" && ($ = -6);
      s + $ <= 0 || s + $ > Jt(c) ? l(0) : $ !== 0 && (l(s + $), C.preventDefault());
    }
  };
  return zt(() => {
    o === c ? o === ue.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), So(() => {
    b(u);
  }, [u]), So(() => {
    const C = setTimeout(() => {
      if (d && g.current && m.current) {
        const $ = m.current.offsetTop - Ol;
        g.current.scrollTo({ top: $, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(C);
    };
  }, [d]), /* @__PURE__ */ y("div", { className: "pr-flex", children: /* @__PURE__ */ re(fl, { modal: !1, open: u, onOpenChange: x, children: [
    /* @__PURE__ */ y(ml, { asChild: !0, children: /* @__PURE__ */ y(
      wl,
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
        handleSubmit: S,
        placeholder: `${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ re(
      Wi,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: B,
        align: "start",
        ref: g,
        children: [
          /* @__PURE__ */ y(
            kl,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          Ao.map(
            (C, R) => k(C).length > 0 && /* @__PURE__ */ re("div", { children: [
              /* @__PURE__ */ y(zr, { className: "pr-font-semibold pr-text-slate-700", children: Tl[C] }),
              k(C).map(($) => /* @__PURE__ */ y("div", { children: /* @__PURE__ */ y(
                El,
                {
                  bookId: $,
                  handleSelectBook: () => h($, !1),
                  isSelected: o === $,
                  handleHighlightBook: () => p($),
                  handleKeyDown: F,
                  bookType: C,
                  ref: (j) => {
                    o === $ && (m.current = j);
                  },
                  children: /* @__PURE__ */ y(
                    xl,
                    {
                      handleSelectChapter: N,
                      endChapter: Jt($),
                      activeChapter: e.bookNum === ue.bookIdToNumber($) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (j) => {
                        l(j);
                      }
                    }
                  )
                }
              ) }, $)),
              Ao.length - 1 !== R ? /* @__PURE__ */ y(Xi, {}) : void 0
            ] }, C)
          )
        ]
      }
    )
  ] }) });
}
const $l = _i(
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
), Hr = he.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ y(r ? Ds : "button", { className: ee($l({ variant: t, size: n, className: e })), ref: i, ...o })
);
Hr.displayName = "Button";
function Ot({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ y(
    Hr,
    {
      id: e,
      disabled: t,
      className: ee("papi-button", n),
      onClick: r,
      onContextMenu: o,
      children: i
    }
  );
}
const Ml = un.Root, Il = un.Trigger, Yi = E.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ y(un.Portal, { children: /* @__PURE__ */ y(
  un.Content,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: ee(
      "pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
Yi.displayName = un.Content.displayName;
const _l = Xe.Portal, Gi = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Xe.Overlay,
  {
    ref: n,
    className: ee(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...t
  }
));
Gi.displayName = Xe.Overlay.displayName;
const Al = E.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ re(_l, { children: [
  /* @__PURE__ */ y(Gi, {}),
  /* @__PURE__ */ re(
    Xe.Content,
    {
      ref: r,
      className: ee(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ re(Xe.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ y($s, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ y("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Al.displayName = Xe.Content.displayName;
const Dl = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Xe.Title,
  {
    ref: n,
    className: ee("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
Dl.displayName = Xe.Title.displayName;
const jl = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Xe.Description,
  {
    ref: n,
    className: ee("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
jl.displayName = Xe.Description.displayName;
const Ki = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me,
  {
    ref: n,
    className: ee(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...t
  }
));
Ki.displayName = Me.displayName;
const Ji = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ re("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ y(Ms, { className: "pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ y(
    Me.Input,
    {
      ref: n,
      className: ee(
        "pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
Ji.displayName = Me.Input.displayName;
const Zi = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.List,
  {
    ref: n,
    className: ee("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
Zi.displayName = Me.List.displayName;
const Qi = E.forwardRef((e, t) => /* @__PURE__ */ y(Me.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
Qi.displayName = Me.Empty.displayName;
const Bl = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.Group,
  {
    ref: n,
    className: ee(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Bl.displayName = Me.Group.displayName;
const Ll = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.Separator,
  {
    ref: n,
    className: ee("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
Ll.displayName = Me.Separator.displayName;
const ea = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Me.Item,
  {
    ref: n,
    className: ee(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...t
  }
));
ea.displayName = Me.Item.displayName;
function Fl(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function Nr({
  id: e,
  options: t = [],
  className: n,
  value: r,
  onChange: o = () => {
  },
  getOptionLabel: i = Fl,
  buttonPlaceholder: s = "",
  textPlaceholder: l = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: p = "outline"
}) {
  const [u, f] = Ee(!1);
  return /* @__PURE__ */ re(Ml, { open: u, onOpenChange: f, children: [
    /* @__PURE__ */ y(Il, { asChild: !0, children: /* @__PURE__ */ re(
      Hr,
      {
        variant: p,
        role: "combobox",
        "aria-expanded": u,
        id: e,
        className: ee("pr-w-[200px] pr-justify-between", n),
        children: [
          r ? i(r) : s,
          /* @__PURE__ */ y(Is, { className: "pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ y(Yi, { className: "pr-w-[200px] pr-p-0", children: /* @__PURE__ */ re(Ki, { children: [
      /* @__PURE__ */ y(Ji, { placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ y(Qi, { children: c }),
      /* @__PURE__ */ y(Zi, { children: t.map((d) => /* @__PURE__ */ re(
        ea,
        {
          value: i(d),
          onSelect: () => {
            o(d), f(!1);
          },
          children: [
            /* @__PURE__ */ y(
              Ii,
              {
                className: ee("pr-mr-2 pr-h-4 pr-w-4", {
                  "pr-opacity-0": !r || i(r) !== i(d)
                })
              }
            ),
            i(d)
          ]
        },
        i(d)
      )) })
    ] }) })
  ] });
}
function hh({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, i] = Ee(1), [s, l] = Ee(r), [c, p] = Ee(
    Array.from({ length: r }, (d, b) => b + 1)
  );
  return zt(() => {
    i(1), e(1), l(r), t(r), p(Array.from({ length: r }, (d, b) => b + 1));
  }, [r, t, e]), /* @__PURE__ */ re(Xn, { children: [
    /* @__PURE__ */ y(
      Mo,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ y(
          Nr,
          {
            onChange: (d) => {
              i(d), e(d), d > s && (l(d), t(d));
            },
            className: "book-selection-chapter",
            options: c,
            getOptionLabel: (d) => d.toString(),
            value: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ y(
      Mo,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ y(
          Nr,
          {
            onChange: (d) => {
              l(d), t(d), d < o && (i(d), e(d));
            },
            className: "book-selection-chapter",
            options: c,
            getOptionLabel: (d) => d.toString(),
            value: s
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
function ta({
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
  const u = /* @__PURE__ */ y(
    Bs,
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
    const d = r === It.Before || r === It.Above, b = /* @__PURE__ */ y("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), v = r === It.Before || r === It.After, g = v ? b : /* @__PURE__ */ y("div", { children: b }), m = v ? u : /* @__PURE__ */ y("div", { children: u });
    f = /* @__PURE__ */ re(
      js,
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
    f = u;
  return f;
}
function gh({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s
}) {
  return /* @__PURE__ */ re("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ y("legend", { children: n }),
    r.map((l) => /* @__PURE__ */ y(
      ta,
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
function de(e, t) {
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
function Vl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function zl(e) {
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
var Cr = { exports: {} }, Pn = { exports: {} }, se = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Do;
function Ul() {
  if (Do)
    return se;
  Do = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, k = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
  function w(h) {
    if (typeof h == "object" && h !== null) {
      var N = h.$$typeof;
      switch (N) {
        case t:
          switch (h = h.type, h) {
            case c:
            case p:
            case r:
            case i:
            case o:
            case f:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case u:
                case v:
                case b:
                case s:
                  return h;
                default:
                  return N;
              }
          }
        case n:
          return N;
      }
    }
  }
  function x(h) {
    return w(h) === p;
  }
  return se.AsyncMode = c, se.ConcurrentMode = p, se.ContextConsumer = l, se.ContextProvider = s, se.Element = t, se.ForwardRef = u, se.Fragment = r, se.Lazy = v, se.Memo = b, se.Portal = n, se.Profiler = i, se.StrictMode = o, se.Suspense = f, se.isAsyncMode = function(h) {
    return x(h) || w(h) === c;
  }, se.isConcurrentMode = x, se.isContextConsumer = function(h) {
    return w(h) === l;
  }, se.isContextProvider = function(h) {
    return w(h) === s;
  }, se.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, se.isForwardRef = function(h) {
    return w(h) === u;
  }, se.isFragment = function(h) {
    return w(h) === r;
  }, se.isLazy = function(h) {
    return w(h) === v;
  }, se.isMemo = function(h) {
    return w(h) === b;
  }, se.isPortal = function(h) {
    return w(h) === n;
  }, se.isProfiler = function(h) {
    return w(h) === i;
  }, se.isStrictMode = function(h) {
    return w(h) === o;
  }, se.isSuspense = function(h) {
    return w(h) === f;
  }, se.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === r || h === p || h === i || h === o || h === f || h === d || typeof h == "object" && h !== null && (h.$$typeof === v || h.$$typeof === b || h.$$typeof === s || h.$$typeof === l || h.$$typeof === u || h.$$typeof === m || h.$$typeof === k || h.$$typeof === I || h.$$typeof === g);
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
var jo;
function Hl() {
  return jo || (jo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, k = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
    function w(_) {
      return typeof _ == "string" || typeof _ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      _ === r || _ === p || _ === i || _ === o || _ === f || _ === d || typeof _ == "object" && _ !== null && (_.$$typeof === v || _.$$typeof === b || _.$$typeof === s || _.$$typeof === l || _.$$typeof === u || _.$$typeof === m || _.$$typeof === k || _.$$typeof === I || _.$$typeof === g);
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
                  case b:
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
    var h = c, N = p, S = l, L = s, B = t, F = u, C = r, R = v, $ = b, j = n, D = i, M = o, V = f, Q = !1;
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
      return x(_) === b;
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
    le.AsyncMode = h, le.ConcurrentMode = N, le.ContextConsumer = S, le.ContextProvider = L, le.Element = B, le.ForwardRef = F, le.Fragment = C, le.Lazy = R, le.Memo = $, le.Portal = j, le.Profiler = D, le.StrictMode = M, le.Suspense = V, le.isAsyncMode = Z, le.isConcurrentMode = O, le.isContextConsumer = A, le.isContextProvider = U, le.isElement = Y, le.isForwardRef = z, le.isFragment = H, le.isLazy = q, le.isMemo = X, le.isPortal = W, le.isProfiler = G, le.isStrictMode = K, le.isSuspense = oe, le.isValidElementType = w, le.typeOf = x;
  }()), le;
}
var Bo;
function na() {
  return Bo || (Bo = 1, process.env.NODE_ENV === "production" ? Pn.exports = Ul() : Pn.exports = Hl()), Pn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ur, Lo;
function Wl() {
  if (Lo)
    return ur;
  Lo = 1;
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
  return ur = o() ? Object.assign : function(i, s) {
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
  }, ur;
}
var dr, Fo;
function Wr() {
  if (Fo)
    return dr;
  Fo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return dr = e, dr;
}
var fr, Vo;
function ra() {
  return Vo || (Vo = 1, fr = Function.call.bind(Object.prototype.hasOwnProperty)), fr;
}
var mr, zo;
function ql() {
  if (zo)
    return mr;
  zo = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Wr(), n = {}, r = ra();
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
            var b = p ? p() : "";
            e(
              "Failed " + l + " type: " + f.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, mr = o, mr;
}
var hr, Uo;
function Xl() {
  if (Uo)
    return hr;
  Uo = 1;
  var e = na(), t = Wl(), n = Wr(), r = ra(), o = ql(), i = function() {
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
  return hr = function(l, c) {
    var p = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function f(O) {
      var A = O && (p && O[p] || O[u]);
      if (typeof A == "function")
        return A;
    }
    var d = "<<anonymous>>", b = {
      array: k("array"),
      bigint: k("bigint"),
      bool: k("boolean"),
      func: k("function"),
      number: k("number"),
      object: k("object"),
      string: k("string"),
      symbol: k("symbol"),
      any: I(),
      arrayOf: w,
      element: x(),
      elementType: h(),
      instanceOf: N,
      node: F(),
      objectOf: L,
      oneOf: S,
      oneOfType: B,
      shape: R,
      exact: $
    };
    function v(O, A) {
      return O === A ? O !== 0 || 1 / O === 1 / A : O !== O && A !== A;
    }
    function g(O, A) {
      this.message = O, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function m(O) {
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
        return q[X] == null ? H ? q[X] === null ? new g("The " + G + " `" + K + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new g("The " + G + " `" + K + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : O(q, X, W, G, K);
      }
      var z = Y.bind(null, !1);
      return z.isRequired = Y.bind(null, !0), z;
    }
    function k(O) {
      function A(U, Y, z, H, q, X) {
        var W = U[Y], G = M(W);
        if (G !== O) {
          var K = V(W);
          return new g(
            "Invalid " + H + " `" + q + "` of type " + ("`" + K + "` supplied to `" + z + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return m(A);
    }
    function I() {
      return m(s);
    }
    function w(O) {
      function A(U, Y, z, H, q) {
        if (typeof O != "function")
          return new g("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var X = U[Y];
        if (!Array.isArray(X)) {
          var W = M(X);
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an array."));
        }
        for (var G = 0; G < X.length; G++) {
          var K = O(X, G, z, H, q + "[" + G + "]", n);
          if (K instanceof Error)
            return K;
        }
        return null;
      }
      return m(A);
    }
    function x() {
      function O(A, U, Y, z, H) {
        var q = A[U];
        if (!l(q)) {
          var X = M(q);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + X + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(O);
    }
    function h() {
      function O(A, U, Y, z, H) {
        var q = A[U];
        if (!e.isValidElementType(q)) {
          var X = M(q);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + X + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(O);
    }
    function N(O) {
      function A(U, Y, z, H, q) {
        if (!(U[Y] instanceof O)) {
          var X = O.name || d, W = Z(U[Y]);
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected ") + ("instance of `" + X + "`."));
        }
        return null;
      }
      return m(A);
    }
    function S(O) {
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
        return new g("Invalid " + H + " `" + q + "` of value `" + String(X) + "` " + ("supplied to `" + z + "`, expected one of " + G + "."));
      }
      return m(A);
    }
    function L(O) {
      function A(U, Y, z, H, q) {
        if (typeof O != "function")
          return new g("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var X = U[Y], W = M(X);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an object."));
        for (var G in X)
          if (r(X, G)) {
            var K = O(X, G, z, H, q + "." + G, n);
            if (K instanceof Error)
              return K;
          }
        return null;
      }
      return m(A);
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
        return new g("Invalid " + X + " `" + W + "` supplied to " + ("`" + q + "`" + J + "."));
      }
      return m(Y);
    }
    function F() {
      function O(A, U, Y, z, H) {
        return j(A[U]) ? null : new g("Invalid " + z + " `" + H + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return m(O);
    }
    function C(O, A, U, Y, z) {
      return new g(
        (O || "React class") + ": " + A + " type `" + U + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function R(O) {
      function A(U, Y, z, H, q) {
        var X = U[Y], W = M(X);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var G in O) {
          var K = O[G];
          if (typeof K != "function")
            return C(z, H, q, G, V(K));
          var oe = K(X, G, z, H, q + "." + G, n);
          if (oe)
            return oe;
        }
        return null;
      }
      return m(A);
    }
    function $(O) {
      function A(U, Y, z, H, q) {
        var X = U[Y], W = M(X);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        var G = t({}, U[Y], O);
        for (var K in G) {
          var oe = O[K];
          if (r(O, K) && typeof oe != "function")
            return C(z, H, q, K, V(oe));
          if (!oe)
            return new g(
              "Invalid " + H + " `" + q + "` key `" + K + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(U[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var _ = oe(X, K, z, H, q + "." + K, n);
          if (_)
            return _;
        }
        return null;
      }
      return m(A);
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
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, hr;
}
var gr, Ho;
function Yl() {
  if (Ho)
    return gr;
  Ho = 1;
  var e = Wr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, gr = function() {
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
  }, gr;
}
if (process.env.NODE_ENV !== "production") {
  var Gl = na(), Kl = !0;
  Cr.exports = Xl()(Gl.isElement, Kl);
} else
  Cr.exports = Yl()();
var Jl = Cr.exports;
const a = /* @__PURE__ */ Vl(Jl);
function Ht(e, t) {
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
function oa(e) {
  if (!gt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = oa(e[n]);
  }), t;
}
function et(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? T({}, e) : e;
  return gt(e) && gt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (gt(t[o]) && o in e && gt(e[o]) ? r[o] = et(e[o], t[o], n) : n.clone ? r[o] = gt(t[o]) ? oa(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function Zl(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ia(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !Zl(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const aa = Ht(a.element, ia);
aa.isRequired = Ht(a.element.isRequired, ia);
const vn = aa;
function Ql(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ec(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !Ql(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const tc = Ht(a.elementType, ec), nc = "exact-prop: ​";
function sa(e) {
  return process.env.NODE_ENV === "production" ? e : T({}, e, {
    [nc]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Dt(e) {
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
var Wo;
function rc() {
  if (Wo)
    return ce;
  Wo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function g(m) {
    if (typeof m == "object" && m !== null) {
      var k = m.$$typeof;
      switch (k) {
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
                case f:
                case i:
                  return m;
                default:
                  return k;
              }
          }
        case t:
          return k;
      }
    }
  }
  return ce.ContextConsumer = s, ce.ContextProvider = i, ce.Element = e, ce.ForwardRef = c, ce.Fragment = n, ce.Lazy = d, ce.Memo = f, ce.Portal = t, ce.Profiler = o, ce.StrictMode = r, ce.Suspense = p, ce.SuspenseList = u, ce.isAsyncMode = function() {
    return !1;
  }, ce.isConcurrentMode = function() {
    return !1;
  }, ce.isContextConsumer = function(m) {
    return g(m) === s;
  }, ce.isContextProvider = function(m) {
    return g(m) === i;
  }, ce.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, ce.isForwardRef = function(m) {
    return g(m) === c;
  }, ce.isFragment = function(m) {
    return g(m) === n;
  }, ce.isLazy = function(m) {
    return g(m) === d;
  }, ce.isMemo = function(m) {
    return g(m) === f;
  }, ce.isPortal = function(m) {
    return g(m) === t;
  }, ce.isProfiler = function(m) {
    return g(m) === o;
  }, ce.isStrictMode = function(m) {
    return g(m) === r;
  }, ce.isSuspense = function(m) {
    return g(m) === p;
  }, ce.isSuspenseList = function(m) {
    return g(m) === u;
  }, ce.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === n || m === o || m === r || m === p || m === u || m === b || typeof m == "object" && m !== null && (m.$$typeof === d || m.$$typeof === f || m.$$typeof === i || m.$$typeof === s || m.$$typeof === c || m.$$typeof === v || m.getModuleId !== void 0);
  }, ce.typeOf = g, ce;
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
var qo;
function oc() {
  return qo || (qo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v = !1, g = !1, m = !1, k = !1, I = !1, w;
    w = Symbol.for("react.module.reference");
    function x(P) {
      return !!(typeof P == "string" || typeof P == "function" || P === n || P === o || I || P === r || P === p || P === u || k || P === b || v || g || m || typeof P == "object" && P !== null && (P.$$typeof === d || P.$$typeof === f || P.$$typeof === i || P.$$typeof === s || P.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      P.$$typeof === w || P.getModuleId !== void 0));
    }
    function h(P) {
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
    var N = s, S = i, L = e, B = c, F = n, C = d, R = f, $ = t, j = o, D = r, M = p, V = u, Q = !1, Z = !1;
    function O(P) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(P) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(P) {
      return h(P) === s;
    }
    function Y(P) {
      return h(P) === i;
    }
    function z(P) {
      return typeof P == "object" && P !== null && P.$$typeof === e;
    }
    function H(P) {
      return h(P) === c;
    }
    function q(P) {
      return h(P) === n;
    }
    function X(P) {
      return h(P) === d;
    }
    function W(P) {
      return h(P) === f;
    }
    function G(P) {
      return h(P) === t;
    }
    function K(P) {
      return h(P) === o;
    }
    function oe(P) {
      return h(P) === r;
    }
    function _(P) {
      return h(P) === p;
    }
    function J(P) {
      return h(P) === u;
    }
    pe.ContextConsumer = N, pe.ContextProvider = S, pe.Element = L, pe.ForwardRef = B, pe.Fragment = F, pe.Lazy = C, pe.Memo = R, pe.Portal = $, pe.Profiler = j, pe.StrictMode = D, pe.Suspense = M, pe.SuspenseList = V, pe.isAsyncMode = O, pe.isConcurrentMode = A, pe.isContextConsumer = U, pe.isContextProvider = Y, pe.isElement = z, pe.isForwardRef = H, pe.isFragment = q, pe.isLazy = X, pe.isMemo = W, pe.isPortal = G, pe.isProfiler = K, pe.isStrictMode = oe, pe.isSuspense = _, pe.isSuspenseList = J, pe.isValidElementType = x, pe.typeOf = h;
  }()), pe;
}
process.env.NODE_ENV === "production" ? Sr.exports = rc() : Sr.exports = oc();
var Bn = Sr.exports;
const ic = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function ac(e) {
  const t = `${e}`.match(ic);
  return t && t[1] || "";
}
function la(e, t = "") {
  return e.displayName || e.name || ac(e) || t;
}
function Xo(e, t, n) {
  const r = la(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function sc(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return la(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Bn.ForwardRef:
          return Xo(e, e.render, "ForwardRef");
        case Bn.Memo:
          return Xo(e, e.type, "memo");
        default:
          return;
      }
  }
}
function tt(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const lc = a.oneOfType([a.func, a.object]), qr = lc;
function Ye(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Dt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Pr(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function ca(e, t = 166) {
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
function cc(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function pc(e, t) {
  var n, r;
  return /* @__PURE__ */ E.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Te(e) {
  return e && e.ownerDocument || document;
}
function jt(e) {
  return Te(e).defaultView || window;
}
function uc(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? T({}, t.propTypes) : null;
  return (o) => (i, s, l, c, p, ...u) => {
    const f = p || s, d = n == null ? void 0 : n[f];
    if (d) {
      const b = d(i, s, l, c, p, ...u);
      if (b)
        return b;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Ln(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const dc = typeof window < "u" ? E.useLayoutEffect : E.useEffect, wt = dc;
let Yo = 0;
function fc(e) {
  const [t, n] = E.useState(e), r = e || t;
  return E.useEffect(() => {
    t == null && (Yo += 1, n(`mui-${Yo}`));
  }, [t]), r;
}
const Go = E["useId".toString()];
function pa(e) {
  if (Go !== void 0) {
    const t = Go();
    return e ?? t;
  }
  return fc(e);
}
function mc(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function ua({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = E.useRef(e !== void 0), [i, s] = E.useState(t), l = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    E.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: p
    } = E.useRef(t);
    E.useEffect(() => {
      !o && p !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = E.useCallback((p) => {
    o || s(p);
  }, []);
  return [l, c];
}
function dn(e) {
  const t = E.useRef(e);
  return wt(() => {
    t.current = e;
  }), E.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function ze(...e) {
  return E.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Ln(n, t);
    });
  }, e);
}
const Ko = {};
function hc(e, t) {
  const n = E.useRef(Ko);
  return n.current === Ko && (n.current = e(t)), n;
}
const gc = [];
function bc(e) {
  E.useEffect(e, gc);
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
function nn() {
  const e = hc(yn.create).current;
  return bc(e.disposeEffect), e;
}
let Yn = !0, Rr = !1;
const vc = new yn(), yc = {
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
function wc(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && yc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function xc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Yn = !0);
}
function br() {
  Yn = !1;
}
function Ec() {
  this.visibilityState === "hidden" && Rr && (Yn = !0);
}
function kc(e) {
  e.addEventListener("keydown", xc, !0), e.addEventListener("mousedown", br, !0), e.addEventListener("pointerdown", br, !0), e.addEventListener("touchstart", br, !0), e.addEventListener("visibilitychange", Ec, !0);
}
function Tc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Yn || wc(t);
}
function da() {
  const e = E.useCallback((o) => {
    o != null && kc(o.ownerDocument);
  }, []), t = E.useRef(!1);
  function n() {
    return t.current ? (Rr = !0, vc.start(100, () => {
      Rr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Tc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function fa(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Oc(e) {
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
function Nc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Cc = Number.isInteger || Nc;
function ma(e, t, n, r) {
  const o = e[t];
  if (o == null || !Cc(o)) {
    const i = Oc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function ha(e, t, ...n) {
  return e[t] === void 0 ? null : ma(e, t, ...n);
}
function $r() {
  return null;
}
ha.isRequired = ma;
$r.isRequired = $r;
const ga = process.env.NODE_ENV === "production" ? $r : ha;
function ba(e, t) {
  const n = T({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = T({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = T({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = ba(o[s], i[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function ot(e, t, n = void 0) {
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
const Jo = (e) => e, Sc = () => {
  let e = Jo;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Jo;
    }
  };
}, Pc = Sc(), va = Pc, ya = {
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
function Ke(e, t, n = "Mui") {
  const r = ya[t];
  return r ? `${n}-${r}` : `${va.generate(e)}-${t}`;
}
function ct(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Ke(e, o, n);
  }), r;
}
function Rc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function wa(e) {
  return typeof e == "string";
}
function rn(e, t, n) {
  return e === void 0 || wa(e) ? t : T({}, t, {
    ownerState: T({}, t.ownerState, n)
  });
}
const $c = {
  disableDefaultClasses: !1
}, Mc = /* @__PURE__ */ E.createContext($c);
function Ic(e) {
  const {
    disableDefaultClasses: t
  } = E.useContext(Mc);
  return (n) => t ? "" : e(n);
}
function xa(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function _c(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Zo(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Ac(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = ke(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = T({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = T({}, n, o, r);
    return b.length > 0 && (g.className = b), Object.keys(v).length > 0 && (g.style = v), {
      props: g,
      internalRef: void 0
    };
  }
  const s = xa(T({}, o, r)), l = Zo(r), c = Zo(o), p = t(s), u = ke(p == null ? void 0 : p.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = T({}, p == null ? void 0 : p.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), d = T({}, p, n, c, l);
  return u.length > 0 && (d.className = u), Object.keys(f).length > 0 && (d.style = f), {
    props: d,
    internalRef: p.ref
  };
}
const Dc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function xt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = de(e, Dc), l = i ? {} : _c(r, o), {
    props: c,
    internalRef: p
  } = Ac(T({}, s, {
    externalSlotProps: l
  })), u = ze(p, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return rn(n, T({}, c, {
    ref: u
  }), o);
}
const Ea = "base";
function jc(e) {
  return `${Ea}--${e}`;
}
function Bc(e, t) {
  return `${Ea}-${e}-${t}`;
}
function ka(e, t) {
  const n = ya[t];
  return n ? jc(n) : Bc(e, t);
}
function Lc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = ka(e, r);
  }), n;
}
const Fc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Vc(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function zc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Uc(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || zc(e));
}
function Hc(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Fc)).forEach((r, o) => {
    const i = Vc(r);
    i === -1 || !Uc(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Wc() {
  return !0;
}
function Fn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Hc,
    isEnabled: s = Wc,
    open: l
  } = e, c = E.useRef(!1), p = E.useRef(null), u = E.useRef(null), f = E.useRef(null), d = E.useRef(null), b = E.useRef(!1), v = E.useRef(null), g = ze(t.ref, v), m = E.useRef(null);
  E.useEffect(() => {
    !l || !v.current || (b.current = !n);
  }, [n, l]), E.useEffect(() => {
    if (!l || !v.current)
      return;
    const w = Te(v.current);
    return v.current.contains(w.activeElement) || (v.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), v.current.setAttribute("tabIndex", "-1")), b.current && v.current.focus()), () => {
      o || (f.current && f.current.focus && (c.current = !0, f.current.focus()), f.current = null);
    };
  }, [l]), E.useEffect(() => {
    if (!l || !v.current)
      return;
    const w = Te(v.current), x = (S) => {
      m.current = S, !(r || !s() || S.key !== "Tab") && w.activeElement === v.current && S.shiftKey && (c.current = !0, u.current && u.current.focus());
    }, h = () => {
      const S = v.current;
      if (S === null)
        return;
      if (!w.hasFocus() || !s() || c.current) {
        c.current = !1;
        return;
      }
      if (S.contains(w.activeElement) || r && w.activeElement !== p.current && w.activeElement !== u.current)
        return;
      if (w.activeElement !== d.current)
        d.current = null;
      else if (d.current !== null)
        return;
      if (!b.current)
        return;
      let L = [];
      if ((w.activeElement === p.current || w.activeElement === u.current) && (L = i(v.current)), L.length > 0) {
        var B, F;
        const C = !!((B = m.current) != null && B.shiftKey && ((F = m.current) == null ? void 0 : F.key) === "Tab"), R = L[0], $ = L[L.length - 1];
        typeof R != "string" && typeof $ != "string" && (C ? $.focus() : R.focus());
      } else
        S.focus();
    };
    w.addEventListener("focusin", h), w.addEventListener("keydown", x, !0);
    const N = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && h();
    }, 50);
    return () => {
      clearInterval(N), w.removeEventListener("focusin", h), w.removeEventListener("keydown", x, !0);
    };
  }, [n, r, o, s, l, i]);
  const k = (w) => {
    f.current === null && (f.current = w.relatedTarget), b.current = !0, d.current = w.target;
    const x = t.props.onFocus;
    x && x(w);
  }, I = (w) => {
    f.current === null && (f.current = w.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ re(E.Fragment, {
    children: [/* @__PURE__ */ y("div", {
      tabIndex: l ? 0 : -1,
      onFocus: I,
      ref: p,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ E.cloneElement(t, {
      ref: g,
      onFocus: k
    }), /* @__PURE__ */ y("div", {
      tabIndex: l ? 0 : -1,
      onFocus: I,
      ref: u,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Fn.propTypes = {
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
process.env.NODE_ENV !== "production" && (Fn["propTypes"] = sa(Fn.propTypes));
function qc(e) {
  return typeof e == "function" ? e() : e;
}
const fn = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, l] = E.useState(null), c = ze(/* @__PURE__ */ E.isValidElement(r) ? r.ref : null, n);
  if (wt(() => {
    i || l(qc(o) || document.body);
  }, [o, i]), wt(() => {
    if (s && !i)
      return Ln(n, s), () => {
        Ln(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ E.isValidElement(r)) {
      const p = {
        ref: c
      };
      return /* @__PURE__ */ E.cloneElement(r, p);
    }
    return /* @__PURE__ */ y(E.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ y(E.Fragment, {
    children: s && /* @__PURE__ */ Zs.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (fn.propTypes = {
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
  container: a.oneOfType([tt, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool
});
process.env.NODE_ENV !== "production" && (fn["propTypes"] = sa(fn.propTypes));
function Xc(e) {
  const t = Te(e);
  return t.body === e ? jt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function sn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Qo(e) {
  return parseInt(jt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Yc(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function ei(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1, c = !Yc(s);
    l && c && sn(s, o);
  });
}
function vr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Gc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Xc(r)) {
      const s = fa(Te(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Qo(r) + s}px`;
      const l = Te(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${Qo(c) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Te(r).body;
    else {
      const s = r.parentElement, l = jt(r);
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
function Kc(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Jc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && sn(t.modalRef, !1);
    const o = Kc(n);
    ei(n, t.mount, t.modalRef, o, !0);
    const i = vr(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = vr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Gc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = vr(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && sn(t.modalRef, n), ei(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && sn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Zc(e) {
  return typeof e == "function" ? e() : e;
}
function Qc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const ep = new Jc();
function tp(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = ep,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: p,
    open: u,
    rootRef: f
  } = e, d = E.useRef({}), b = E.useRef(null), v = E.useRef(null), g = ze(v, f), [m, k] = E.useState(!u), I = Qc(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const x = () => Te(b.current), h = () => (d.current.modalRef = v.current, d.current.mount = b.current, d.current), N = () => {
    o.mount(h(), {
      disableScrollLock: r
    }), v.current && (v.current.scrollTop = 0);
  }, S = dn(() => {
    const M = Zc(t) || x().body;
    o.add(h(), M), v.current && N();
  }), L = E.useCallback(() => o.isTopModal(h()), [o]), B = dn((M) => {
    b.current = M, M && (u && L() ? N() : v.current && sn(v.current, w));
  }), F = E.useCallback(() => {
    o.remove(h(), w);
  }, [w, o]);
  E.useEffect(() => () => {
    F();
  }, [F]), E.useEffect(() => {
    u ? S() : (!I || !i) && F();
  }, [u, F, I, i, S]);
  const C = (M) => (V) => {
    var Q;
    (Q = M.onKeyDown) == null || Q.call(M, V), !(V.key !== "Escape" || V.which === 229 || // Wait until IME is settled.
    !L()) && (n || (V.stopPropagation(), p && p(V, "escapeKeyDown")));
  }, R = (M) => (V) => {
    var Q;
    (Q = M.onClick) == null || Q.call(M, V), V.target === V.currentTarget && p && p(V, "backdropClick");
  };
  return {
    getRootProps: (M = {}) => {
      const V = xa(e);
      delete V.onTransitionEnter, delete V.onTransitionExited;
      const Q = T({}, V, M);
      return T({
        role: "presentation"
      }, Q, {
        onKeyDown: C(Q),
        ref: g
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
        k(!1), s && s();
      }, V = () => {
        k(!0), l && l(), i && F();
      };
      return {
        onEnter: Pr(M, c == null ? void 0 : c.props.onEnter),
        onExited: Pr(V, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: g,
    portalRef: B,
    isTopModal: L,
    exited: m,
    hasTransition: I
  };
}
var Re = "top", Ue = "bottom", He = "right", $e = "left", Xr = "auto", wn = [Re, Ue, He, $e], Bt = "start", mn = "end", np = "clippingParents", Ta = "viewport", Zt = "popper", rp = "reference", ti = /* @__PURE__ */ wn.reduce(function(e, t) {
  return e.concat([t + "-" + Bt, t + "-" + mn]);
}, []), Oa = /* @__PURE__ */ [].concat(wn, [Xr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Bt, t + "-" + mn]);
}, []), op = "beforeRead", ip = "read", ap = "afterRead", sp = "beforeMain", lp = "main", cp = "afterMain", pp = "beforeWrite", up = "write", dp = "afterWrite", fp = [op, ip, ap, sp, lp, cp, pp, up, dp];
function Ge(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Be(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Et(e) {
  var t = Be(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ve(e) {
  var t = Be(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Yr(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Be(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function mp(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Ve(i) || !Ge(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function hp(e) {
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
      !Ve(o) || !Ge(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const gp = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: mp,
  effect: hp,
  requires: ["computeStyles"]
};
function qe(e) {
  return e.split("-")[0];
}
var vt = Math.max, Vn = Math.min, Lt = Math.round;
function Mr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Na() {
  return !/^((?!chrome|android).)*safari/i.test(Mr());
}
function Ft(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Ve(e) && (o = e.offsetWidth > 0 && Lt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Lt(r.height) / e.offsetHeight || 1);
  var s = Et(e) ? Be(e) : window, l = s.visualViewport, c = !Na() && n, p = (r.left + (c && l ? l.offsetLeft : 0)) / o, u = (r.top + (c && l ? l.offsetTop : 0)) / i, f = r.width / o, d = r.height / i;
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
function Gr(e) {
  var t = Ft(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Ca(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Yr(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function nt(e) {
  return Be(e).getComputedStyle(e);
}
function bp(e) {
  return ["table", "td", "th"].indexOf(Ge(e)) >= 0;
}
function pt(e) {
  return ((Et(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Gn(e) {
  return Ge(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Yr(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    pt(e)
  );
}
function ni(e) {
  return !Ve(e) || // https://github.com/popperjs/popper-core/issues/837
  nt(e).position === "fixed" ? null : e.offsetParent;
}
function vp(e) {
  var t = /firefox/i.test(Mr()), n = /Trident/i.test(Mr());
  if (n && Ve(e)) {
    var r = nt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Gn(e);
  for (Yr(o) && (o = o.host); Ve(o) && ["html", "body"].indexOf(Ge(o)) < 0; ) {
    var i = nt(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function xn(e) {
  for (var t = Be(e), n = ni(e); n && bp(n) && nt(n).position === "static"; )
    n = ni(n);
  return n && (Ge(n) === "html" || Ge(n) === "body" && nt(n).position === "static") ? t : n || vp(e) || t;
}
function Kr(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function ln(e, t, n) {
  return vt(e, Vn(t, n));
}
function yp(e, t, n) {
  var r = ln(e, t, n);
  return r > n ? n : r;
}
function Sa() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Pa(e) {
  return Object.assign({}, Sa(), e);
}
function Ra(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var wp = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Pa(typeof t != "number" ? t : Ra(t, wn));
};
function xp(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, l = qe(n.placement), c = Kr(l), p = [$e, He].indexOf(l) >= 0, u = p ? "height" : "width";
  if (!(!i || !s)) {
    var f = wp(o.padding, n), d = Gr(i), b = c === "y" ? Re : $e, v = c === "y" ? Ue : He, g = n.rects.reference[u] + n.rects.reference[c] - s[c] - n.rects.popper[u], m = s[c] - n.rects.reference[c], k = xn(i), I = k ? c === "y" ? k.clientHeight || 0 : k.clientWidth || 0 : 0, w = g / 2 - m / 2, x = f[b], h = I - d[u] - f[v], N = I / 2 - d[u] / 2 + w, S = ln(x, N, h), L = c;
    n.modifiersData[r] = (t = {}, t[L] = S, t.centerOffset = S - N, t);
  }
}
function Ep(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Ca(t.elements.popper, o) && (t.elements.arrow = o));
}
const kp = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: xp,
  effect: Ep,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Vt(e) {
  return e.split("-")[1];
}
var Tp = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Op(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Lt(n * o) / o || 0,
    y: Lt(r * o) / o || 0
  };
}
function ri(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, p = e.adaptive, u = e.roundOffsets, f = e.isFixed, d = s.x, b = d === void 0 ? 0 : d, v = s.y, g = v === void 0 ? 0 : v, m = typeof u == "function" ? u({
    x: b,
    y: g
  }) : {
    x: b,
    y: g
  };
  b = m.x, g = m.y;
  var k = s.hasOwnProperty("x"), I = s.hasOwnProperty("y"), w = $e, x = Re, h = window;
  if (p) {
    var N = xn(n), S = "clientHeight", L = "clientWidth";
    if (N === Be(n) && (N = pt(n), nt(N).position !== "static" && l === "absolute" && (S = "scrollHeight", L = "scrollWidth")), N = N, o === Re || (o === $e || o === He) && i === mn) {
      x = Ue;
      var B = f && N === h && h.visualViewport ? h.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        N[S]
      );
      g -= B - r.height, g *= c ? 1 : -1;
    }
    if (o === $e || (o === Re || o === Ue) && i === mn) {
      w = He;
      var F = f && N === h && h.visualViewport ? h.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        N[L]
      );
      b -= F - r.width, b *= c ? 1 : -1;
    }
  }
  var C = Object.assign({
    position: l
  }, p && Tp), R = u === !0 ? Op({
    x: b,
    y: g
  }, Be(n)) : {
    x: b,
    y: g
  };
  if (b = R.x, g = R.y, c) {
    var $;
    return Object.assign({}, C, ($ = {}, $[x] = I ? "0" : "", $[w] = k ? "0" : "", $.transform = (h.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + g + "px)" : "translate3d(" + b + "px, " + g + "px, 0)", $));
  }
  return Object.assign({}, C, (t = {}, t[x] = I ? g + "px" : "", t[w] = k ? b + "px" : "", t.transform = "", t));
}
function Np(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, p = {
    placement: qe(t.placement),
    variation: Vt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ri(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ri(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Cp = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Np,
  data: {}
};
var Rn = {
  passive: !0
};
function Sp(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Be(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && p.forEach(function(u) {
    u.addEventListener("scroll", n.update, Rn);
  }), l && c.addEventListener("resize", n.update, Rn), function() {
    i && p.forEach(function(u) {
      u.removeEventListener("scroll", n.update, Rn);
    }), l && c.removeEventListener("resize", n.update, Rn);
  };
}
const Pp = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Sp,
  data: {}
};
var Rp = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function _n(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Rp[t];
  });
}
var $p = {
  start: "end",
  end: "start"
};
function oi(e) {
  return e.replace(/start|end/g, function(t) {
    return $p[t];
  });
}
function Jr(e) {
  var t = Be(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Zr(e) {
  return Ft(pt(e)).left + Jr(e).scrollLeft;
}
function Mp(e, t) {
  var n = Be(e), r = pt(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    var p = Na();
    (p || !p && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: l + Zr(e),
    y: c
  };
}
function Ip(e) {
  var t, n = pt(e), r = Jr(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = vt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = vt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Zr(e), c = -r.scrollTop;
  return nt(o || n).direction === "rtl" && (l += vt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function Qr(e) {
  var t = nt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function $a(e) {
  return ["html", "body", "#document"].indexOf(Ge(e)) >= 0 ? e.ownerDocument.body : Ve(e) && Qr(e) ? e : $a(Gn(e));
}
function cn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = $a(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Be(r), s = o ? [i].concat(i.visualViewport || [], Qr(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(cn(Gn(s)))
  );
}
function Ir(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function _p(e, t) {
  var n = Ft(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ii(e, t, n) {
  return t === Ta ? Ir(Mp(e, n)) : Et(t) ? _p(t, n) : Ir(Ip(pt(e)));
}
function Ap(e) {
  var t = cn(Gn(e)), n = ["absolute", "fixed"].indexOf(nt(e).position) >= 0, r = n && Ve(e) ? xn(e) : e;
  return Et(r) ? t.filter(function(o) {
    return Et(o) && Ca(o, r) && Ge(o) !== "body";
  }) : [];
}
function Dp(e, t, n, r) {
  var o = t === "clippingParents" ? Ap(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], l = i.reduce(function(c, p) {
    var u = ii(e, p, r);
    return c.top = vt(u.top, c.top), c.right = Vn(u.right, c.right), c.bottom = Vn(u.bottom, c.bottom), c.left = vt(u.left, c.left), c;
  }, ii(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Ma(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? qe(r) : null, i = r ? Vt(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Re:
      c = {
        x: s,
        y: t.y - n.height
      };
      break;
    case Ue:
      c = {
        x: s,
        y: t.y + t.height
      };
      break;
    case He:
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
  var p = o ? Kr(o) : null;
  if (p != null) {
    var u = p === "y" ? "height" : "width";
    switch (i) {
      case Bt:
        c[p] = c[p] - (t[u] / 2 - n[u] / 2);
        break;
      case mn:
        c[p] = c[p] + (t[u] / 2 - n[u] / 2);
        break;
    }
  }
  return c;
}
function hn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? np : l, p = n.rootBoundary, u = p === void 0 ? Ta : p, f = n.elementContext, d = f === void 0 ? Zt : f, b = n.altBoundary, v = b === void 0 ? !1 : b, g = n.padding, m = g === void 0 ? 0 : g, k = Pa(typeof m != "number" ? m : Ra(m, wn)), I = d === Zt ? rp : Zt, w = e.rects.popper, x = e.elements[v ? I : d], h = Dp(Et(x) ? x : x.contextElement || pt(e.elements.popper), c, u, s), N = Ft(e.elements.reference), S = Ma({
    reference: N,
    element: w,
    strategy: "absolute",
    placement: o
  }), L = Ir(Object.assign({}, w, S)), B = d === Zt ? L : N, F = {
    top: h.top - B.top + k.top,
    bottom: B.bottom - h.bottom + k.bottom,
    left: h.left - B.left + k.left,
    right: B.right - h.right + k.right
  }, C = e.modifiersData.offset;
  if (d === Zt && C) {
    var R = C[o];
    Object.keys(F).forEach(function($) {
      var j = [He, Ue].indexOf($) >= 0 ? 1 : -1, D = [Re, Ue].indexOf($) >= 0 ? "y" : "x";
      F[$] += R[D] * j;
    });
  }
  return F;
}
function jp(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, p = c === void 0 ? Oa : c, u = Vt(r), f = u ? l ? ti : ti.filter(function(v) {
    return Vt(v) === u;
  }) : wn, d = f.filter(function(v) {
    return p.indexOf(v) >= 0;
  });
  d.length === 0 && (d = f);
  var b = d.reduce(function(v, g) {
    return v[g] = hn(e, {
      placement: g,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[qe(g)], v;
  }, {});
  return Object.keys(b).sort(function(v, g) {
    return b[v] - b[g];
  });
}
function Bp(e) {
  if (qe(e) === Xr)
    return [];
  var t = _n(e);
  return [oi(e), t, oi(t)];
}
function Lp(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, p = n.padding, u = n.boundary, f = n.rootBoundary, d = n.altBoundary, b = n.flipVariations, v = b === void 0 ? !0 : b, g = n.allowedAutoPlacements, m = t.options.placement, k = qe(m), I = k === m, w = c || (I || !v ? [_n(m)] : Bp(m)), x = [m].concat(w).reduce(function(z, H) {
      return z.concat(qe(H) === Xr ? jp(t, {
        placement: H,
        boundary: u,
        rootBoundary: f,
        padding: p,
        flipVariations: v,
        allowedAutoPlacements: g
      }) : H);
    }, []), h = t.rects.reference, N = t.rects.popper, S = /* @__PURE__ */ new Map(), L = !0, B = x[0], F = 0; F < x.length; F++) {
      var C = x[F], R = qe(C), $ = Vt(C) === Bt, j = [Re, Ue].indexOf(R) >= 0, D = j ? "width" : "height", M = hn(t, {
        placement: C,
        boundary: u,
        rootBoundary: f,
        altBoundary: d,
        padding: p
      }), V = j ? $ ? He : $e : $ ? Ue : Re;
      h[D] > N[D] && (V = _n(V));
      var Q = _n(V), Z = [];
      if (i && Z.push(M[R] <= 0), l && Z.push(M[V] <= 0, M[Q] <= 0), Z.every(function(z) {
        return z;
      })) {
        B = C, L = !1;
        break;
      }
      S.set(C, Z);
    }
    if (L)
      for (var O = v ? 3 : 1, A = function(H) {
        var q = x.find(function(X) {
          var W = S.get(X);
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
function ai(e, t, n) {
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
function si(e) {
  return [Re, He, Ue, $e].some(function(t) {
    return e[t] >= 0;
  });
}
function Vp(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = hn(t, {
    elementContext: "reference"
  }), l = hn(t, {
    altBoundary: !0
  }), c = ai(s, r), p = ai(l, o, i), u = si(c), f = si(p);
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
const zp = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Vp
};
function Up(e, t, n) {
  var r = qe(e), o = [$e, Re].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], l = i[1];
  return s = s || 0, l = (l || 0) * o, [$e, He].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Hp(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = Oa.reduce(function(u, f) {
    return u[f] = Up(f, t.rects, i), u;
  }, {}), l = s[t.placement], c = l.x, p = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += p), t.modifiersData[r] = s;
}
const Wp = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Hp
};
function qp(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Ma({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Xp = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: qp,
  data: {}
};
function Yp(e) {
  return e === "x" ? "y" : "x";
}
function Gp(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, p = n.rootBoundary, u = n.altBoundary, f = n.padding, d = n.tether, b = d === void 0 ? !0 : d, v = n.tetherOffset, g = v === void 0 ? 0 : v, m = hn(t, {
    boundary: c,
    rootBoundary: p,
    padding: f,
    altBoundary: u
  }), k = qe(t.placement), I = Vt(t.placement), w = !I, x = Kr(k), h = Yp(x), N = t.modifiersData.popperOffsets, S = t.rects.reference, L = t.rects.popper, B = typeof g == "function" ? g(Object.assign({}, t.rects, {
    placement: t.placement
  })) : g, F = typeof B == "number" ? {
    mainAxis: B,
    altAxis: B
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, B), C = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (N) {
    if (i) {
      var $, j = x === "y" ? Re : $e, D = x === "y" ? Ue : He, M = x === "y" ? "height" : "width", V = N[x], Q = V + m[j], Z = V - m[D], O = b ? -L[M] / 2 : 0, A = I === Bt ? S[M] : L[M], U = I === Bt ? -L[M] : -S[M], Y = t.elements.arrow, z = b && Y ? Gr(Y) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Sa(), q = H[j], X = H[D], W = ln(0, S[M], z[M]), G = w ? S[M] / 2 - O - W - q - F.mainAxis : A - W - q - F.mainAxis, K = w ? -S[M] / 2 + O + W + X + F.mainAxis : U + W + X + F.mainAxis, oe = t.elements.arrow && xn(t.elements.arrow), _ = oe ? x === "y" ? oe.clientTop || 0 : oe.clientLeft || 0 : 0, J = ($ = C == null ? void 0 : C[x]) != null ? $ : 0, P = V + G - J - _, ie = V + K - J, we = ln(b ? Vn(Q, P) : Q, V, b ? vt(Z, ie) : Z);
      N[x] = we, R[x] = we - V;
    }
    if (l) {
      var Ne, ve = x === "x" ? Re : $e, dt = x === "x" ? Ue : He, Ce = N[h], Je = h === "y" ? "height" : "width", _e = Ce + m[ve], Ze = Ce - m[dt], xe = [Re, $e].indexOf(k) !== -1, Tt = (Ne = C == null ? void 0 : C[h]) != null ? Ne : 0, ft = xe ? _e : Ce - S[Je] - L[Je] - Tt + F.altAxis, Wt = xe ? Ce + S[Je] + L[Je] - Tt - F.altAxis : Ze, On = b && xe ? yp(ft, Ce, Wt) : ln(b ? ft : _e, Ce, b ? Wt : Ze);
      N[h] = On, R[h] = On - Ce;
    }
    t.modifiersData[r] = R;
  }
}
const Kp = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Gp,
  requiresIfExists: ["offset"]
};
function Jp(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Zp(e) {
  return e === Be(e) || !Ve(e) ? Jr(e) : Jp(e);
}
function Qp(e) {
  var t = e.getBoundingClientRect(), n = Lt(t.width) / e.offsetWidth || 1, r = Lt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function eu(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ve(t), o = Ve(t) && Qp(t), i = pt(t), s = Ft(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Ge(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Qr(i)) && (l = Zp(t)), Ve(t) ? (c = Ft(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = Zr(i))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function tu(e) {
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
function nu(e) {
  var t = tu(e);
  return fp.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function ru(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function ou(e) {
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
var li = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ci() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function iu(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? li : o;
  return function(l, c, p) {
    p === void 0 && (p = i);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, li, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], d = !1, b = {
      state: u,
      setOptions: function(k) {
        var I = typeof k == "function" ? k(u.options) : k;
        g(), u.options = Object.assign({}, i, u.options, I), u.scrollParents = {
          reference: Et(l) ? cn(l) : l.contextElement ? cn(l.contextElement) : [],
          popper: cn(c)
        };
        var w = nu(ou([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = w.filter(function(x) {
          return x.enabled;
        }), v(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!d) {
          var k = u.elements, I = k.reference, w = k.popper;
          if (ci(I, w)) {
            u.rects = {
              reference: eu(I, xn(w), u.options.strategy === "fixed"),
              popper: Gr(w)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(F) {
              return u.modifiersData[F.name] = Object.assign({}, F.data);
            });
            for (var x = 0; x < u.orderedModifiers.length; x++) {
              if (u.reset === !0) {
                u.reset = !1, x = -1;
                continue;
              }
              var h = u.orderedModifiers[x], N = h.fn, S = h.options, L = S === void 0 ? {} : S, B = h.name;
              typeof N == "function" && (u = N({
                state: u,
                options: L,
                name: B,
                instance: b
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: ru(function() {
        return new Promise(function(m) {
          b.forceUpdate(), m(u);
        });
      }),
      destroy: function() {
        g(), d = !0;
      }
    };
    if (!ci(l, c))
      return b;
    b.setOptions(p).then(function(m) {
      !d && p.onFirstUpdate && p.onFirstUpdate(m);
    });
    function v() {
      u.orderedModifiers.forEach(function(m) {
        var k = m.name, I = m.options, w = I === void 0 ? {} : I, x = m.effect;
        if (typeof x == "function") {
          var h = x({
            state: u,
            name: k,
            instance: b,
            options: w
          }), N = function() {
          };
          f.push(h || N);
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
var au = [Pp, Xp, Cp, gp, Wp, Fp, Kp, kp, zp], su = /* @__PURE__ */ iu({
  defaultModifiers: au
});
const Ia = "Popper";
function lu(e) {
  return ka(Ia, e);
}
Lc(Ia, ["root"]);
const cu = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], pu = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function uu(e, t) {
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
function zn(e) {
  return typeof e == "function" ? e() : e;
}
function Kn(e) {
  return e.nodeType !== void 0;
}
function du(e) {
  return !Kn(e);
}
const fu = () => ot({
  root: ["root"]
}, Ic(lu)), mu = {}, hu = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
    slotProps: b = {},
    slots: v = {},
    TransitionProps: g
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, m = de(t, cu), k = E.useRef(null), I = ze(k, n), w = E.useRef(null), x = ze(w, d), h = E.useRef(x);
  wt(() => {
    h.current = x;
  }, [x]), E.useImperativeHandle(d, () => w.current, []);
  const N = uu(u, s), [S, L] = E.useState(N), [B, F] = E.useState(zn(o));
  E.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), E.useEffect(() => {
    o && F(zn(o));
  }, [o]), wt(() => {
    if (!B || !p)
      return;
    const D = (Q) => {
      L(Q.placement);
    };
    if (process.env.NODE_ENV !== "production" && B && Kn(B) && B.nodeType === 1) {
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
    const V = su(B, k.current, T({
      placement: N
    }, f, {
      modifiers: M
    }));
    return h.current(V), () => {
      V.destroy(), h.current(null);
    };
  }, [B, l, c, p, f, N]);
  const C = {
    placement: S
  };
  g !== null && (C.TransitionProps = g);
  const R = fu(), $ = (r = v.root) != null ? r : "div", j = xt({
    elementType: $,
    externalSlotProps: b.root,
    externalForwardedProps: m,
    additionalProps: {
      role: "tooltip",
      ref: I
    },
    ownerState: t,
    className: R.root
  });
  return /* @__PURE__ */ y($, T({}, j, {
    children: typeof i == "function" ? i(C) : i
  }));
}), _a = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
    popperOptions: d = mu,
    popperRef: b,
    style: v,
    transition: g = !1,
    slotProps: m = {},
    slots: k = {}
  } = t, I = de(t, pu), [w, x] = E.useState(!0), h = () => {
    x(!1);
  }, N = () => {
    x(!0);
  };
  if (!c && !u && (!g || w))
    return null;
  let S;
  if (i)
    S = i;
  else if (r) {
    const F = zn(r);
    S = F && Kn(F) ? Te(F).body : Te(null).body;
  }
  const L = !u && c && (!g || w) ? "none" : void 0, B = g ? {
    in: u,
    onEnter: h,
    onExited: N
  } : void 0;
  return /* @__PURE__ */ y(fn, {
    disablePortal: l,
    container: S,
    children: /* @__PURE__ */ y(hu, T({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: p,
      ref: n,
      open: g ? !w : u,
      placement: f,
      popperOptions: d,
      popperRef: b,
      slotProps: m,
      slots: k
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
process.env.NODE_ENV !== "production" && (_a.propTypes = {
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
  anchorEl: Ht(a.oneOfType([tt, a.object, a.func]), (e) => {
    if (e.open) {
      const t = zn(e.anchorEl);
      if (t && Kn(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || du(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: a.oneOfType([tt, a.func]),
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
  popperRef: qr,
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
const gu = ["values", "unit", "step"], bu = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => T({}, n, {
    [r.key]: r.val
  }), {});
};
function vu(e) {
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
  } = e, o = de(e, gu), i = bu(t), s = Object.keys(i);
  function l(d) {
    return `@media (min-width:${typeof t[d] == "number" ? t[d] : d}${n})`;
  }
  function c(d) {
    return `@media (max-width:${(typeof t[d] == "number" ? t[d] : d) - r / 100}${n})`;
  }
  function p(d, b) {
    const v = s.indexOf(b);
    return `@media (min-width:${typeof t[d] == "number" ? t[d] : d}${n}) and (max-width:${(v !== -1 && typeof t[s[v]] == "number" ? t[s[v]] : b) - r / 100}${n})`;
  }
  function u(d) {
    return s.indexOf(d) + 1 < s.length ? p(d, s[s.indexOf(d) + 1]) : l(d);
  }
  function f(d) {
    const b = s.indexOf(d);
    return b === 0 ? l(s[1]) : b === s.length - 1 ? c(s[b]) : p(d, s[s.indexOf(d) + 1]).replace("@media", "@media not all and");
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
const yu = {
  borderRadius: 4
}, wu = yu, xu = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, ut = xu;
function pn(e, t) {
  return t ? et(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const eo = {
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
}, pi = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${eo[e]}px)`
};
function rt(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || pi;
    return t.reduce((s, l, c) => (s[i.up(i.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || pi;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || eo).indexOf(l) !== -1) {
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
function Eu(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function ku(e, t) {
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
function ye(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const l = s[t], c = s.theme, p = Jn(c, r) || {};
    return rt(s, l, (f) => {
      let d = Un(p, o, f);
      return f === d && typeof f == "string" && (d = Un(p, o, `${t}${f === "default" ? "" : Ye(f)}`, f)), n === !1 ? d : {
        [n]: d
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: ut
  } : {}, i.filterProps = [t], i;
}
function Tu(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const Ou = {
  m: "margin",
  p: "padding"
}, Nu = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, ui = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Cu = Tu((e) => {
  if (e.length > 2)
    if (ui[e])
      e = ui[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Ou[t], o = Nu[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Zn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Qn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Su = [...Zn, ...Qn];
function En(e, t, n, r) {
  var o;
  const i = (o = Jn(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Aa(e) {
  return En(e, "spacing", 8, "spacing");
}
function kn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Pu(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = kn(t, n), r), {});
}
function Ru(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Cu(n), i = Pu(o, r), s = e[n];
  return rt(e, s, i);
}
function Da(e, t) {
  const n = Aa(e.theme);
  return Object.keys(e).map((r) => Ru(e, t, r, n)).reduce(pn, {});
}
function ge(e) {
  return Da(e, Zn);
}
ge.propTypes = process.env.NODE_ENV !== "production" ? Zn.reduce((e, t) => (e[t] = ut, e), {}) : {};
ge.filterProps = Zn;
function be(e) {
  return Da(e, Qn);
}
be.propTypes = process.env.NODE_ENV !== "production" ? Qn.reduce((e, t) => (e[t] = ut, e), {}) : {};
be.filterProps = Qn;
process.env.NODE_ENV !== "production" && Su.reduce((e, t) => (e[t] = ut, e), {});
function $u(e = 8) {
  if (e.mui)
    return e;
  const t = Aa({
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
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? pn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Fe(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function We(e, t) {
  return ye({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Mu = We("border", Fe), Iu = We("borderTop", Fe), _u = We("borderRight", Fe), Au = We("borderBottom", Fe), Du = We("borderLeft", Fe), ju = We("borderColor"), Bu = We("borderTopColor"), Lu = We("borderRightColor"), Fu = We("borderBottomColor"), Vu = We("borderLeftColor"), zu = We("outline", Fe), Uu = We("outlineColor"), tr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = En(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: kn(t, r)
    });
    return rt(e, e.borderRadius, n);
  }
  return null;
};
tr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ut
} : {};
tr.filterProps = ["borderRadius"];
er(Mu, Iu, _u, Au, Du, ju, Bu, Lu, Fu, Vu, tr, zu, Uu);
const nr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = En(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: kn(t, r)
    });
    return rt(e, e.gap, n);
  }
  return null;
};
nr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ut
} : {};
nr.filterProps = ["gap"];
const rr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = En(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: kn(t, r)
    });
    return rt(e, e.columnGap, n);
  }
  return null;
};
rr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ut
} : {};
rr.filterProps = ["columnGap"];
const or = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = En(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: kn(t, r)
    });
    return rt(e, e.rowGap, n);
  }
  return null;
};
or.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ut
} : {};
or.filterProps = ["rowGap"];
const Hu = ye({
  prop: "gridColumn"
}), Wu = ye({
  prop: "gridRow"
}), qu = ye({
  prop: "gridAutoFlow"
}), Xu = ye({
  prop: "gridAutoColumns"
}), Yu = ye({
  prop: "gridAutoRows"
}), Gu = ye({
  prop: "gridTemplateColumns"
}), Ku = ye({
  prop: "gridTemplateRows"
}), Ju = ye({
  prop: "gridTemplateAreas"
}), Zu = ye({
  prop: "gridArea"
});
er(nr, rr, or, Hu, Wu, qu, Xu, Yu, Gu, Ku, Ju, Zu);
function At(e, t) {
  return t === "grey" ? t : e;
}
const Qu = ye({
  prop: "color",
  themeKey: "palette",
  transform: At
}), ed = ye({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: At
}), td = ye({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: At
});
er(Qu, ed, td);
function je(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const nd = ye({
  prop: "width",
  transform: je
}), to = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || eo[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: je(n)
      };
    };
    return rt(e, e.maxWidth, t);
  }
  return null;
};
to.filterProps = ["maxWidth"];
const rd = ye({
  prop: "minWidth",
  transform: je
}), od = ye({
  prop: "height",
  transform: je
}), id = ye({
  prop: "maxHeight",
  transform: je
}), ad = ye({
  prop: "minHeight",
  transform: je
});
ye({
  prop: "size",
  cssProperty: "width",
  transform: je
});
ye({
  prop: "size",
  cssProperty: "height",
  transform: je
});
const sd = ye({
  prop: "boxSizing"
});
er(nd, to, rd, od, id, ad, sd);
const ld = {
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
    style: tr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: At
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: At
  },
  backgroundColor: {
    themeKey: "palette",
    transform: At
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
    transform: je
  },
  maxWidth: {
    style: to
  },
  minWidth: {
    transform: je
  },
  height: {
    transform: je
  },
  maxHeight: {
    transform: je
  },
  minHeight: {
    transform: je
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
}, no = ld;
function cd(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function pd(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ud() {
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
    const d = Jn(o, p) || {};
    return f ? f(s) : rt(s, r, (v) => {
      let g = Un(d, u, v);
      return v === g && typeof v == "string" && (g = Un(d, u, `${n}${v === "default" ? "" : Ye(v)}`, v)), c === !1 ? g : {
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
    const s = (r = i.unstable_sxConfig) != null ? r : no;
    function l(c) {
      let p = c;
      if (typeof c == "function")
        p = c(i);
      else if (typeof c != "object")
        return c;
      if (!p)
        return null;
      const u = Eu(i.breakpoints), f = Object.keys(u);
      let d = u;
      return Object.keys(p).forEach((b) => {
        const v = pd(p[b], i);
        if (v != null)
          if (typeof v == "object")
            if (s[b])
              d = pn(d, e(b, v, i, s));
            else {
              const g = rt({
                theme: i
              }, v, (m) => ({
                [b]: m
              }));
              cd(g, v) ? d[b] = t({
                sx: v,
                theme: i
              }) : d = pn(d, g);
            }
          else
            d = pn(d, e(b, v, i, s));
      }), ku(f, d);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const ja = ud();
ja.filterProps = ["sx"];
const ro = ja;
function dd(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const fd = ["breakpoints", "palette", "spacing", "shape"];
function oo(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = de(e, fd), l = vu(n), c = $u(o);
  let p = et({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: T({
      mode: "light"
    }, r),
    spacing: c,
    shape: T({}, wu, i)
  }, s);
  return p.applyStyles = dd, p = t.reduce((u, f) => et(u, f), p), p.unstable_sxConfig = T({}, no, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(f) {
    return ro({
      sx: f,
      theme: this
    });
  }, p;
}
function md(e) {
  return Object.keys(e).length === 0;
}
function Ba(e = null) {
  const t = E.useContext(Ks);
  return !t || md(t) ? e : t;
}
const hd = oo();
function La(e = hd) {
  return Ba(e);
}
const gd = ["ownerState"], bd = ["variants"], vd = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function yd(e) {
  return Object.keys(e).length === 0;
}
function wd(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function An(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const xd = oo(), di = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function $n({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return yd(t) ? e : t[n] || t;
}
function Ed(e) {
  return e ? (t, n) => n[e] : null;
}
function Dn(e, t) {
  let {
    ownerState: n
  } = t, r = de(t, gd);
  const o = typeof e == "function" ? e(T({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Dn(i, T({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = de(o, bd);
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
function kd(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = xd,
    rootShouldForwardProp: r = An,
    slotShouldForwardProp: o = An
  } = e, i = (s) => ro(T({}, s, {
    theme: $n(T({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, l = {}) => {
    Js(s, (h) => h.filter((N) => !(N != null && N.__mui_systemSx)));
    const {
      name: c,
      slot: p,
      skipVariantsResolver: u,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = Ed(di(p))
    } = l, b = de(l, vd), v = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      p && p !== "Root" && p !== "root" || !1
    ), g = f || !1;
    let m;
    process.env.NODE_ENV !== "production" && c && (m = `${c}-${di(p || "Root")}`);
    let k = An;
    p === "Root" || p === "root" ? k = r : p ? k = o : wd(s) && (k = void 0);
    const I = Gs(s, T({
      shouldForwardProp: k,
      label: m
    }, b)), w = (h) => typeof h == "function" && h.__emotion_real !== h || gt(h) ? (N) => Dn(h, T({}, N, {
      theme: $n({
        theme: N.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : h, x = (h, ...N) => {
      let S = w(h);
      const L = N ? N.map(w) : [];
      c && d && L.push((C) => {
        const R = $n(T({}, C, {
          defaultTheme: n,
          themeId: t
        }));
        if (!R.components || !R.components[c] || !R.components[c].styleOverrides)
          return null;
        const $ = R.components[c].styleOverrides, j = {};
        return Object.entries($).forEach(([D, M]) => {
          j[D] = Dn(M, T({}, C, {
            theme: R
          }));
        }), d(C, j);
      }), c && !v && L.push((C) => {
        var R;
        const $ = $n(T({}, C, {
          defaultTheme: n,
          themeId: t
        })), j = $ == null || (R = $.components) == null || (R = R[c]) == null ? void 0 : R.variants;
        return Dn({
          variants: j
        }, T({}, C, {
          theme: $
        }));
      }), g || L.push(i);
      const B = L.length - N.length;
      if (Array.isArray(h) && B > 0) {
        const C = new Array(B).fill("");
        S = [...h, ...C], S.raw = [...h.raw, ...C];
      }
      const F = I(S, ...L);
      if (process.env.NODE_ENV !== "production") {
        let C;
        c && (C = `${c}${Ye(p || "")}`), C === void 0 && (C = `Styled(${sc(s)})`), F.displayName = C;
      }
      return s.muiName && (F.muiName = s.muiName), F;
    };
    return I.withConfig && (x.withConfig = I.withConfig), x;
  };
}
function Td(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : ba(t.components[n].defaultProps, r);
}
function Od({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = La(n);
  return r && (o = o[r] || o), Td({
    theme: o,
    name: t,
    props: e
  });
}
function io(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Rc(e, t, n);
}
function Nd(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function kt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return kt(Nd(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Dt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Dt(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function ir(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Cd(e) {
  e = kt(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (p, u = (p + n / 30) % 12) => o - i * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), ir({
    type: l,
    values: c
  });
}
function fi(e) {
  e = kt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? kt(Cd(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function mi(e, t) {
  const n = fi(e), r = fi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Hn(e, t) {
  return e = kt(e), t = io(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, ir(e);
}
function Sd(e, t) {
  if (e = kt(e), t = io(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return ir(e);
}
function Pd(e, t) {
  if (e = kt(e), t = io(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return ir(e);
}
function Rd(e, t) {
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
const $d = {
  black: "#000",
  white: "#fff"
}, gn = $d, Md = {
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
}, Id = Md, _d = {
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
}, Nt = _d, Ad = {
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
}, Ct = Ad, Dd = {
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
}, Qt = Dd, jd = {
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
}, St = jd, Bd = {
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
}, Pt = Bd, Ld = {
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
}, Rt = Ld, Fd = ["mode", "contrastThreshold", "tonalOffset"], hi = {
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
    paper: gn.white,
    default: gn.white
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
}, yr = {
  text: {
    primary: gn.white,
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
    active: gn.white,
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
function gi(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Pd(e.main, o) : t === "dark" && (e.dark = Sd(e.main, i)));
}
function Vd(e = "light") {
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
function zd(e = "light") {
  return e === "dark" ? {
    main: Nt[200],
    light: Nt[50],
    dark: Nt[400]
  } : {
    main: Nt[500],
    light: Nt[300],
    dark: Nt[700]
  };
}
function Ud(e = "light") {
  return e === "dark" ? {
    main: Ct[500],
    light: Ct[300],
    dark: Ct[700]
  } : {
    main: Ct[700],
    light: Ct[400],
    dark: Ct[800]
  };
}
function Hd(e = "light") {
  return e === "dark" ? {
    main: Pt[400],
    light: Pt[300],
    dark: Pt[700]
  } : {
    main: Pt[700],
    light: Pt[500],
    dark: Pt[900]
  };
}
function Wd(e = "light") {
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
function qd(e = "light") {
  return e === "dark" ? {
    main: Qt[400],
    light: Qt[300],
    dark: Qt[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Qt[500],
    dark: Qt[900]
  };
}
function Xd(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = de(e, Fd), i = e.primary || Vd(t), s = e.secondary || zd(t), l = e.error || Ud(t), c = e.info || Hd(t), p = e.success || Wd(t), u = e.warning || qd(t);
  function f(g) {
    const m = mi(g, yr.text.primary) >= n ? yr.text.primary : hi.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const k = mi(g, m);
      k < 3 && console.error([`MUI: The contrast ratio of ${k}:1 for ${m} on ${g}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return m;
  }
  const d = ({
    color: g,
    name: m,
    mainShade: k = 500,
    lightShade: I = 300,
    darkShade: w = 700
  }) => {
    if (g = T({}, g), !g.main && g[k] && (g.main = g[k]), !g.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.` : Dt(11, m ? ` (${m})` : "", k));
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
} });` : Dt(12, m ? ` (${m})` : "", JSON.stringify(g.main)));
    return gi(g, "light", I, r), gi(g, "dark", w, r), g.contrastText || (g.contrastText = f(g.main)), g;
  }, b = {
    dark: yr,
    light: hi
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), et(T({
    // A collection of common colors.
    common: T({}, gn),
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
    grey: Id,
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
const Yd = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Gd(e) {
  return Math.round(e * 1e5) / 1e5;
}
const bi = {
  textTransform: "uppercase"
}, vi = '"Roboto", "Helvetica", "Arial", sans-serif';
function Kd(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = vi,
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
  } = n, d = de(n, Yd);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof p != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, v = f || ((k) => `${k / p * b}rem`), g = (k, I, w, x, h) => T({
    fontFamily: r,
    fontWeight: k,
    fontSize: v(I),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, r === vi ? {
    letterSpacing: `${Gd(x / I)}em`
  } : {}, h, u), m = {
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
    button: g(l, 14, 1.75, 0.4, bi),
    caption: g(s, 12, 1.66, 0.4),
    overline: g(s, 12, 2.66, 1, bi),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return et(T({
    htmlFontSize: p,
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
const Jd = 0.2, Zd = 0.14, Qd = 0.12;
function me(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Jd})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Zd})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Qd})`].join(",");
}
const ef = ["none", me(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), me(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), me(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), me(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), me(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), me(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), me(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), me(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), me(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), me(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), me(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), me(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), me(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), me(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), me(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), me(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), me(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), me(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), me(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), me(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), me(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), me(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), me(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), me(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], tf = ef, nf = ["duration", "easing", "delay"], rf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, of = {
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
function yi(e) {
  return `${Math.round(e)}ms`;
}
function af(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function sf(e) {
  const t = T({}, rf, e.easing), n = T({}, of, e.duration);
  return T({
    getAutoHeightDuration: af,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, p = de(i, nf);
      if (process.env.NODE_ENV !== "production") {
        const u = (d) => typeof d == "string", f = (d) => !isNaN(parseFloat(d));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(p).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : yi(s)} ${l} ${typeof c == "string" ? c : yi(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const lf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, cf = lf, pf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function uf(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = de(e, pf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Dt(18));
  const l = Xd(r), c = oo(e);
  let p = et(c, {
    mixins: Rd(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: tf.slice(),
    typography: Kd(l, i),
    transitions: sf(o),
    zIndex: T({}, cf)
  });
  if (p = et(p, s), p = t.reduce((u, f) => et(u, f), p), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (d, b) => {
      let v;
      for (v in d) {
        const g = d[v];
        if (u.indexOf(v) !== -1 && Object.keys(g).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const m = Ke("", v);
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
    Object.keys(p.components).forEach((d) => {
      const b = p.components[d].styleOverrides;
      b && d.indexOf("Mui") === 0 && f(b, d);
    });
  }
  return p.unstable_sxConfig = T({}, no, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(f) {
    return ro({
      sx: f,
      theme: this
    });
  }, p;
}
const df = uf(), ao = df, so = "$$material", Fa = (e) => An(e) && e !== "classes", ff = kd({
  themeId: so,
  defaultTheme: ao,
  rootShouldForwardProp: Fa
}), Oe = ff;
function Tn() {
  const e = La(ao);
  return process.env.NODE_ENV !== "production" && E.useDebugValue(e), e[so] || e;
}
function it({
  props: e,
  name: t
}) {
  return Od({
    props: e,
    name: t,
    defaultTheme: ao,
    themeId: so
  });
}
function _r(e, t) {
  return _r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, _r(e, t);
}
function mf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, _r(e, t);
}
const wi = {
  disabled: !1
};
var hf = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
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
const Va = he.createContext(null);
var gf = function(t) {
  return t.scrollTop;
}, on = "unmounted", mt = "exited", ht = "entering", _t = "entered", Ar = "exiting", at = /* @__PURE__ */ function(e) {
  mf(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = mt, i.appearStatus = ht) : c = _t : r.unmountOnExit || r.mountOnEnter ? c = on : c = mt, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === on ? {
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
      this.props.in ? s !== ht && s !== _t && (i = ht) : (s === ht || s === _t) && (i = Ar);
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
      if (this.cancelNextCallback(), i === ht) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Sn.findDOMNode(this);
          s && gf(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === mt && this.setState({
        status: on
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Sn.findDOMNode(this), l], p = c[0], u = c[1], f = this.getTimeouts(), d = l ? f.appear : f.enter;
    if (!o && !s || wi.disabled) {
      this.safeSetState({
        status: _t
      }, function() {
        i.props.onEntered(p);
      });
      return;
    }
    this.props.onEnter(p, u), this.safeSetState({
      status: ht
    }, function() {
      i.props.onEntering(p, u), i.onTransitionEnd(d, function() {
        i.safeSetState({
          status: _t
        }, function() {
          i.props.onEntered(p, u);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Sn.findDOMNode(this);
    if (!i || wi.disabled) {
      this.safeSetState({
        status: mt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Ar
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Sn.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === on)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = de(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ he.createElement(Va.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : he.cloneElement(he.Children.only(s), l))
    );
  }, t;
}(he.Component);
at.contextType = Va;
at.propTypes = process.env.NODE_ENV !== "production" ? {
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
    var n = hf;
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
function $t() {
}
at.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: $t,
  onEntering: $t,
  onEntered: $t,
  onExit: $t,
  onExiting: $t,
  onExited: $t
};
at.UNMOUNTED = on;
at.EXITED = mt;
at.ENTERING = ht;
at.ENTERED = _t;
at.EXITING = Ar;
const za = at, Ua = (e) => e.scrollTop;
function Wn(e, t) {
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
const bf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Dr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const vf = {
  entering: {
    opacity: 1,
    transform: Dr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, wr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), lo = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
    onExiting: b,
    style: v,
    timeout: g = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: m = za
  } = t, k = de(t, bf), I = nn(), w = E.useRef(), x = Tn(), h = E.useRef(null), N = ze(h, i.ref, n), S = (D) => (M) => {
    if (D) {
      const V = h.current;
      M === void 0 ? D(V) : D(V, M);
    }
  }, L = S(u), B = S((D, M) => {
    Ua(D);
    const {
      duration: V,
      delay: Q,
      easing: Z
    } = Wn({
      style: v,
      timeout: g,
      easing: s
    }, {
      mode: "enter"
    });
    let O;
    g === "auto" ? (O = x.transitions.getAutoHeightDuration(D.clientHeight), w.current = O) : O = V, D.style.transition = [x.transitions.create("opacity", {
      duration: O,
      delay: Q
    }), x.transitions.create("transform", {
      duration: wr ? O : O * 0.666,
      delay: Q,
      easing: Z
    })].join(","), c && c(D, M);
  }), F = S(p), C = S(b), R = S((D) => {
    const {
      duration: M,
      delay: V,
      easing: Q
    } = Wn({
      style: v,
      timeout: g,
      easing: s
    }, {
      mode: "exit"
    });
    let Z;
    g === "auto" ? (Z = x.transitions.getAutoHeightDuration(D.clientHeight), w.current = Z) : Z = M, D.style.transition = [x.transitions.create("opacity", {
      duration: Z,
      delay: V
    }), x.transitions.create("transform", {
      duration: wr ? Z : Z * 0.666,
      delay: wr ? V : V || Z * 0.333,
      easing: Q
    })].join(","), D.style.opacity = 0, D.style.transform = Dr(0.75), f && f(D);
  }), $ = S(d);
  return /* @__PURE__ */ y(m, T({
    appear: o,
    in: l,
    nodeRef: h,
    onEnter: B,
    onEntered: F,
    onEntering: L,
    onExit: R,
    onExited: $,
    onExiting: C,
    addEndListener: (D) => {
      g === "auto" && I.start(w.current || 0, D), r && r(h.current, D);
    },
    timeout: g === "auto" ? null : g
  }, k, {
    children: (D, M) => /* @__PURE__ */ E.cloneElement(i, T({
      style: T({
        opacity: 0,
        transform: Dr(0.75),
        visibility: D === "exited" && !l ? "hidden" : void 0
      }, vf[D], v, i.props.style),
      ref: N
    }, M))
  }));
});
process.env.NODE_ENV !== "production" && (lo.propTypes = {
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
lo.muiSupportAuto = !0;
const jr = lo, yf = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, xi = yf, wf = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], xf = Oe(_a, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ha = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r;
  const o = Ba(), i = it({
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
    modifiers: b,
    open: v,
    placement: g,
    popperOptions: m,
    popperRef: k,
    transition: I,
    slots: w,
    slotProps: x
  } = i, h = de(i, wf), N = (r = w == null ? void 0 : w.root) != null ? r : c == null ? void 0 : c.Root, S = T({
    anchorEl: s,
    container: u,
    disablePortal: f,
    keepMounted: d,
    modifiers: b,
    open: v,
    placement: g,
    popperOptions: m,
    popperRef: k,
    transition: I
  }, h);
  return /* @__PURE__ */ y(xf, T({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: N
    },
    slotProps: x ?? p
  }, S, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Ha.propTypes = {
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
  anchorEl: a.oneOfType([tt, a.object, a.func]),
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
  container: a.oneOfType([tt, a.func]),
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
  popperRef: qr,
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
const Wa = Ha;
function Ef(e) {
  return Ke("MuiTooltip", e);
}
const kf = ct("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), lt = kf, Tf = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Of(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Nf = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ye(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return ot(s, Ef, t);
}, Cf = Oe(Wa, {
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
  [`&[data-popper-placement*="right"] .${lt.arrow}`]: T({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${lt.arrow}`]: T({}, t.isRtl ? {
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
})), Sf = Oe("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Ye(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => T({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Hn(e.palette.grey[700], 0.92),
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
  lineHeight: `${Of(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${lt.popper}[data-popper-placement*="left"] &`]: T({
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
  [`.${lt.popper}[data-popper-placement*="right"] &`]: T({
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
  [`.${lt.popper}[data-popper-placement*="top"] &`]: T({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${lt.popper}[data-popper-placement*="bottom"] &`]: T({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), Pf = Oe("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Hn(e.palette.grey[700], 0.9),
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
const Ei = new yn();
let en = {
  x: 0,
  y: 0
};
function In(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const qa = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i, s, l, c, p, u, f, d, b, v, g, m, k, I, w, x, h;
  const N = it({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: S = !1,
    children: L,
    components: B = {},
    componentsProps: F = {},
    describeChild: C = !1,
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
    TransitionComponent: _ = jr,
    TransitionProps: J
  } = N, P = de(N, Tf), ie = /* @__PURE__ */ E.isValidElement(L) ? L : /* @__PURE__ */ y("span", {
    children: L
  }), we = Tn(), Ne = we.direction === "rtl", [ve, dt] = E.useState(), [Ce, Je] = E.useState(null), _e = E.useRef(!1), Ze = j || Z, xe = nn(), Tt = nn(), ft = nn(), Wt = nn(), [On, mo] = ua({
    controlled: H,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Qe = On;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: te
    } = E.useRef(H !== void 0);
    E.useEffect(() => {
      ve && ve.disabled && !te && oe !== "" && ve.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [oe, ve, te]);
  }
  const ar = pa(O), qt = E.useRef(), Nn = dn(() => {
    qt.current !== void 0 && (document.body.style.WebkitUserSelect = qt.current, qt.current = void 0), Wt.clear();
  });
  E.useEffect(() => Nn, [Nn]);
  const ho = (te) => {
    Ei.clear(), Mn = !0, mo(!0), z && !Qe && z(te);
  }, Cn = dn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (te) => {
      Ei.start(800 + A, () => {
        Mn = !1;
      }), mo(!1), Y && Qe && Y(te), xe.start(we.transitions.duration.shortest, () => {
        _e.current = !1;
      });
    }
  ), sr = (te) => {
    _e.current && te.type !== "touchstart" || (ve && ve.removeAttribute("title"), Tt.clear(), ft.clear(), M || Mn && V ? Tt.start(Mn ? V : M, () => {
      ho(te);
    }) : ho(te));
  }, go = (te) => {
    Tt.clear(), ft.start(A, () => {
      Cn(te);
    });
  }, {
    isFocusVisibleRef: bo,
    onBlur: cs,
    onFocus: ps,
    ref: us
  } = da(), [, vo] = E.useState(!1), yo = (te) => {
    cs(te), bo.current === !1 && (vo(!1), go(te));
  }, wo = (te) => {
    ve || dt(te.currentTarget), ps(te), bo.current === !0 && (vo(!0), sr(te));
  }, xo = (te) => {
    _e.current = !0;
    const Ae = ie.props;
    Ae.onTouchStart && Ae.onTouchStart(te);
  }, Eo = sr, ko = go, ds = (te) => {
    xo(te), ft.clear(), xe.clear(), Nn(), qt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Wt.start(Q, () => {
      document.body.style.WebkitUserSelect = qt.current, sr(te);
    });
  }, fs = (te) => {
    ie.props.onTouchEnd && ie.props.onTouchEnd(te), Nn(), ft.start(U, () => {
      Cn(te);
    });
  };
  E.useEffect(() => {
    if (!Qe)
      return;
    function te(Ae) {
      (Ae.key === "Escape" || Ae.key === "Esc") && Cn(Ae);
    }
    return document.addEventListener("keydown", te), () => {
      document.removeEventListener("keydown", te);
    };
  }, [Cn, Qe]);
  const ms = ze(ie.ref, us, dt, n);
  !oe && oe !== 0 && (Qe = !1);
  const lr = E.useRef(), hs = (te) => {
    const Ae = ie.props;
    Ae.onMouseMove && Ae.onMouseMove(te), en = {
      x: te.clientX,
      y: te.clientY
    }, lr.current && lr.current.update();
  }, Xt = {}, cr = typeof oe == "string";
  C ? (Xt.title = !Qe && cr && !$ ? oe : null, Xt["aria-describedby"] = Qe ? ar : null) : (Xt["aria-label"] = cr ? oe : null, Xt["aria-labelledby"] = Qe && !cr ? ar : null);
  const Le = T({}, Xt, P, ie.props, {
    className: ke(P.className, ie.props.className),
    onTouchStart: xo,
    ref: ms
  }, Z ? {
    onMouseMove: hs
  } : {});
  process.env.NODE_ENV !== "production" && (Le["data-mui-internal-clone-element"] = !0, E.useEffect(() => {
    ve && !ve.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [ve]));
  const Yt = {};
  D || (Le.onTouchStart = ds, Le.onTouchEnd = fs), $ || (Le.onMouseOver = In(Eo, Le.onMouseOver), Le.onMouseLeave = In(ko, Le.onMouseLeave), Ze || (Yt.onMouseOver = Eo, Yt.onMouseLeave = ko)), R || (Le.onFocus = In(wo, Le.onFocus), Le.onBlur = In(yo, Le.onBlur), Ze || (Yt.onFocus = wo, Yt.onBlur = yo)), process.env.NODE_ENV !== "production" && ie.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));
  const gs = E.useMemo(() => {
    var te;
    let Ae = [{
      name: "arrow",
      enabled: !!Ce,
      options: {
        element: Ce,
        padding: 4
      }
    }];
    return (te = W.popperOptions) != null && te.modifiers && (Ae = Ae.concat(W.popperOptions.modifiers)), T({}, W.popperOptions, {
      modifiers: Ae
    });
  }, [Ce, W]), Gt = T({}, N, {
    isRtl: Ne,
    arrow: S,
    disableInteractive: Ze,
    placement: q,
    PopperComponentProp: X,
    touch: _e.current
  }), pr = Nf(Gt), To = (r = (o = K.popper) != null ? o : B.Popper) != null ? r : Cf, Oo = (i = (s = (l = K.transition) != null ? l : B.Transition) != null ? s : _) != null ? i : jr, No = (c = (p = K.tooltip) != null ? p : B.Tooltip) != null ? c : Sf, Co = (u = (f = K.arrow) != null ? f : B.Arrow) != null ? u : Pf, bs = rn(To, T({}, W, (d = G.popper) != null ? d : F.popper, {
    className: ke(pr.popper, W == null ? void 0 : W.className, (b = (v = G.popper) != null ? v : F.popper) == null ? void 0 : b.className)
  }), Gt), vs = rn(Oo, T({}, J, (g = G.transition) != null ? g : F.transition), Gt), ys = rn(No, T({}, (m = G.tooltip) != null ? m : F.tooltip, {
    className: ke(pr.tooltip, (k = (I = G.tooltip) != null ? I : F.tooltip) == null ? void 0 : k.className)
  }), Gt), ws = rn(Co, T({}, (w = G.arrow) != null ? w : F.arrow, {
    className: ke(pr.arrow, (x = (h = G.arrow) != null ? h : F.arrow) == null ? void 0 : x.className)
  }), Gt);
  return /* @__PURE__ */ re(E.Fragment, {
    children: [/* @__PURE__ */ E.cloneElement(ie, Le), /* @__PURE__ */ y(To, T({
      as: X ?? Wa,
      placement: q,
      anchorEl: Z ? {
        getBoundingClientRect: () => ({
          top: en.y,
          left: en.x,
          right: en.x,
          bottom: en.y,
          width: 0,
          height: 0
        })
      } : ve,
      popperRef: lr,
      open: ve ? Qe : !1,
      id: ar,
      transition: !0
    }, Yt, bs, {
      popperOptions: gs,
      children: ({
        TransitionProps: te
      }) => /* @__PURE__ */ y(Oo, T({
        timeout: we.transitions.duration.shorter
      }, te, vs, {
        children: /* @__PURE__ */ re(No, T({}, ys, {
          children: [oe, S ? /* @__PURE__ */ y(Co, T({}, ws, {
            ref: Je
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (qa.propTypes = {
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
const Rf = qa;
var co = {}, Xa = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Xa);
var $f = Xa.exports, xr = {};
function Mf(e) {
  return Ke("MuiSvgIcon", e);
}
ct("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const If = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], _f = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ye(t)}`, `fontSize${Ye(n)}`]
  };
  return ot(o, Mf, r);
}, Af = Oe("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Ye(n.color)}`], t[`fontSize${Ye(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, s, l, c, p, u, f, d, b, v;
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
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[t.color]
  };
}), po = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const r = it({
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
  } = r, b = de(r, If), v = /* @__PURE__ */ E.isValidElement(o) && o.type === "svg", g = T({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: u,
    viewBox: d,
    hasSvgAsChild: v
  }), m = {};
  u || (m.viewBox = d);
  const k = _f(g);
  return /* @__PURE__ */ re(Af, T({
    as: l,
    className: ke(k.root, i),
    focusable: "false",
    color: p,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, m, b, v && o.props, {
    ownerState: g,
    children: [v ? o.props.children : o, f ? /* @__PURE__ */ y("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (po.propTypes = {
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
po.muiName = "SvgIcon";
const ki = po;
function Ya(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ y(ki, T({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = ki.muiName, /* @__PURE__ */ E.memo(/* @__PURE__ */ E.forwardRef(n));
}
const Df = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), va.configure(e);
  }
}, jf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ye,
  createChainedFunction: Pr,
  createSvgIcon: Ya,
  debounce: ca,
  deprecatedPropType: cc,
  isMuiElement: pc,
  ownerDocument: Te,
  ownerWindow: jt,
  requirePropFactory: uc,
  setRef: Ln,
  unstable_ClassNameGenerator: Df,
  unstable_useEnhancedEffect: wt,
  unstable_useId: pa,
  unsupportedProp: mc,
  useControlled: ua,
  useEventCallback: dn,
  useForkRef: ze,
  useIsFocusVisible: da
}, Symbol.toStringTag, { value: "Module" })), Bf = /* @__PURE__ */ zl(jf);
var Ti;
function Lf() {
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
    var t = Bf;
  }(xr)), xr;
}
var Ff = $f;
Object.defineProperty(co, "__esModule", {
  value: !0
});
var Ga = co.default = void 0, Vf = Ff(Lf()), zf = xs;
Ga = co.default = (0, Vf.default)(/* @__PURE__ */ (0, zf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Oi(e, t, n) {
  return e ? /* @__PURE__ */ y(Ai, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ y("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ka(e) {
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
    hasDivider: b = !1,
    focusVisibleClassName: v,
    id: g,
    children: m
  } = e, k = /* @__PURE__ */ y(
    Ls,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: p,
      dense: u,
      disableGutters: d,
      divider: b,
      focusVisibleClassName: v,
      onClick: t,
      id: g,
      children: n ? /* @__PURE__ */ re(Xn, { children: [
        Oi(i, n, !0),
        /* @__PURE__ */ y(Fs, { primary: n, inset: !i && o }),
        f ? /* @__PURE__ */ y(Ai, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ y(Ga, {}) }) : Oi(s, n, !1)
      ] }) : m
    }
  );
  return r ? /* @__PURE__ */ y(Rf, { title: r, placement: "right", children: /* @__PURE__ */ y("div", { children: k }) }) : k;
}
function Ja(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Uf(e) {
  const [t, n] = Ee(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (p) => {
    n(p.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let p = Ja(i).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return p = p.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === r.id
    ), /* @__PURE__ */ y(uo, { ...e, includedGroups: p });
  };
  return /* @__PURE__ */ re(Xn, { children: [
    /* @__PURE__ */ y(Ka, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ y(
      Vs,
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
const Hf = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function uo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = bn(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ja(t).filter((v) => !("menuItem" in v.group))
    ), f = Object.values(u).sort(
      (v, g) => (v.group.order || 0) - (g.group.order || 0)
    ), d = [];
    f.forEach((v) => {
      Hf(v.id, t.items).forEach(
        (g) => d.push({ item: g, isLastItemInGroup: !1 })
      ), d.length > 0 && (d[d.length - 1].isLastItemInGroup = !0);
    }), d.length > 0 && (d[d.length - 1].isLastItemInGroup = !1);
    const b = d.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: d, allowForLeadingIcons: b };
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
    const { item: d } = u, b = l(u);
    if ("command" in d) {
      const v = d.group + f;
      return /* @__PURE__ */ y(
        Ka,
        {
          onClick: (g) => {
            n == null || n(g), r(d);
          },
          ...b
        },
        v
      );
    }
    return /* @__PURE__ */ y(
      Uf,
      {
        parentMenuItem: d,
        parentItemProps: b,
        ...e
      },
      p + d.id
    );
  }) }, p);
}
function Wf(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ y(uo, { ...e, includedGroups: i });
}
function qf({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ re(
    Di,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ y("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ y(zs, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ y(
          Wf,
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
function Xf({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = bn(() => {
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
    Di,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, l) => /* @__PURE__ */ y(
        qf,
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
const Za = /* @__PURE__ */ E.createContext({});
process.env.NODE_ENV !== "production" && (Za.displayName = "ListContext");
const Yf = Za;
function Gf(e) {
  return Ke("MuiList", e);
}
ct("MuiList", ["root", "padding", "dense", "subheader"]);
const Kf = ["children", "className", "component", "dense", "disablePadding", "subheader"], Jf = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return ot({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Gf, t);
}, Zf = Oe("ul", {
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
})), Qa = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const r = it({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: p
  } = r, u = de(r, Kf), f = E.useMemo(() => ({
    dense: l
  }), [l]), d = T({}, r, {
    component: s,
    dense: l,
    disablePadding: c
  }), b = Jf(d);
  return /* @__PURE__ */ y(Yf.Provider, {
    value: f,
    children: /* @__PURE__ */ re(Zf, T({
      as: s,
      className: ke(b.root, i),
      ref: n,
      ownerState: d
    }, u, {
      children: [p, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Qa.propTypes = {
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
const Qf = Qa, em = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Er(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function Ni(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function es(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function tn(e, t, n, r, o, i) {
  let s = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !es(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const ts = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
  } = t, d = de(t, em), b = E.useRef(null), v = E.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  wt(() => {
    o && b.current.focus();
  }, [o]), E.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (w, x) => {
      const h = !b.current.style.width;
      if (w.clientHeight < b.current.clientHeight && h) {
        const N = `${fa(Te(w))}px`;
        b.current.style[x.direction === "rtl" ? "paddingLeft" : "paddingRight"] = N, b.current.style.width = `calc(100% + ${N})`;
      }
      return b.current;
    }
  }), []);
  const g = (w) => {
    const x = b.current, h = w.key, N = Te(x).activeElement;
    if (h === "ArrowDown")
      w.preventDefault(), tn(x, N, p, c, Er);
    else if (h === "ArrowUp")
      w.preventDefault(), tn(x, N, p, c, Ni);
    else if (h === "Home")
      w.preventDefault(), tn(x, null, p, c, Er);
    else if (h === "End")
      w.preventDefault(), tn(x, null, p, c, Ni);
    else if (h.length === 1) {
      const S = v.current, L = h.toLowerCase(), B = performance.now();
      S.keys.length > 0 && (B - S.lastTime > 500 ? (S.keys = [], S.repeating = !0, S.previousKeyMatched = !0) : S.repeating && L !== S.keys[0] && (S.repeating = !1)), S.lastTime = B, S.keys.push(L);
      const F = N && !S.repeating && es(N, S);
      S.previousKeyMatched && (F || tn(x, N, !1, c, Er, S)) ? w.preventDefault() : S.previousKeyMatched = !1;
    }
    u && u(w);
  }, m = ze(b, n);
  let k = -1;
  E.Children.forEach(s, (w, x) => {
    if (!/* @__PURE__ */ E.isValidElement(w)) {
      k === x && (k += 1, k >= s.length && (k = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Bn.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (f === "selectedMenu" && w.props.selected || k === -1) && (k = x), k === x && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (k += 1, k >= s.length && (k = -1));
  });
  const I = E.Children.map(s, (w, x) => {
    if (x === k) {
      const h = {};
      return i && (h.autoFocus = !0), w.props.tabIndex === void 0 && f === "selectedMenu" && (h.tabIndex = 0), /* @__PURE__ */ E.cloneElement(w, h);
    }
    return w;
  });
  return /* @__PURE__ */ y(Qf, T({
    role: "menu",
    ref: m,
    className: l,
    onKeyDown: g,
    tabIndex: o ? 0 : -1
  }, d, {
    children: I
  }));
});
process.env.NODE_ENV !== "production" && (ts.propTypes = {
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
const tm = ts, nm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], rm = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, ns = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const r = Tn(), o = {
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
    onExit: b,
    onExited: v,
    onExiting: g,
    style: m,
    timeout: k = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: I = za
  } = t, w = de(t, nm), x = E.useRef(null), h = ze(x, l.ref, n), N = (j) => (D) => {
    if (j) {
      const M = x.current;
      D === void 0 ? j(M) : j(M, D);
    }
  }, S = N(d), L = N((j, D) => {
    Ua(j);
    const M = Wn({
      style: m,
      timeout: k,
      easing: c
    }, {
      mode: "enter"
    });
    j.style.webkitTransition = r.transitions.create("opacity", M), j.style.transition = r.transitions.create("opacity", M), u && u(j, D);
  }), B = N(f), F = N(g), C = N((j) => {
    const D = Wn({
      style: m,
      timeout: k,
      easing: c
    }, {
      mode: "exit"
    });
    j.style.webkitTransition = r.transitions.create("opacity", D), j.style.transition = r.transitions.create("opacity", D), b && b(j);
  }), R = N(v);
  return /* @__PURE__ */ y(I, T({
    appear: s,
    in: p,
    nodeRef: x,
    onEnter: L,
    onEntered: B,
    onEntering: S,
    onExit: C,
    onExited: R,
    onExiting: F,
    addEndListener: (j) => {
      i && i(x.current, j);
    },
    timeout: k
  }, w, {
    children: (j, D) => /* @__PURE__ */ E.cloneElement(l, T({
      style: T({
        opacity: 0,
        visibility: j === "exited" && !p ? "hidden" : void 0
      }, rm[j], m, l.props.style),
      ref: h
    }, D))
  }));
});
process.env.NODE_ENV !== "production" && (ns.propTypes = {
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
const om = ns;
function im(e) {
  return Ke("MuiBackdrop", e);
}
ct("MuiBackdrop", ["root", "invisible"]);
const am = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], sm = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return ot({
    root: ["root", n && "invisible"]
  }, im, t);
}, lm = Oe("div", {
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
})), rs = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i;
  const s = it({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: p = "div",
    components: u = {},
    componentsProps: f = {},
    invisible: d = !1,
    open: b,
    slotProps: v = {},
    slots: g = {},
    TransitionComponent: m = om,
    transitionDuration: k
  } = s, I = de(s, am), w = T({}, s, {
    component: p,
    invisible: d
  }), x = sm(w), h = (r = v.root) != null ? r : f.root;
  return /* @__PURE__ */ y(m, T({
    in: b,
    timeout: k
  }, I, {
    children: /* @__PURE__ */ y(lm, T({
      "aria-hidden": !0
    }, h, {
      as: (o = (i = g.root) != null ? i : u.Root) != null ? o : p,
      className: ke(x.root, c, h == null ? void 0 : h.className),
      ownerState: T({}, w, h == null ? void 0 : h.ownerState),
      classes: x,
      ref: n,
      children: l
    }))
  }));
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
const cm = rs;
function pm(e) {
  return Ke("MuiModal", e);
}
ct("MuiModal", ["root", "hidden", "backdrop"]);
const um = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], dm = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return ot({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, pm, r);
}, fm = Oe("div", {
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
})), mm = Oe(cm, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), os = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i, s, l, c;
  const p = it({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: u = mm,
    BackdropProps: f,
    className: d,
    closeAfterTransition: b = !1,
    children: v,
    container: g,
    component: m,
    components: k = {},
    componentsProps: I = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: x = !1,
    disableEscapeKeyDown: h = !1,
    disablePortal: N = !1,
    disableRestoreFocus: S = !1,
    disableScrollLock: L = !1,
    hideBackdrop: B = !1,
    keepMounted: F = !1,
    onBackdropClick: C,
    open: R,
    slotProps: $,
    slots: j
    // eslint-disable-next-line react/prop-types
  } = p, D = de(p, um), M = T({}, p, {
    closeAfterTransition: b,
    disableAutoFocus: w,
    disableEnforceFocus: x,
    disableEscapeKeyDown: h,
    disablePortal: N,
    disableRestoreFocus: S,
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
  } = tp(T({}, M, {
    rootRef: n
  })), z = T({}, M, {
    exited: U
  }), H = dm(z), q = {};
  if (v.props.tabIndex === void 0 && (q.tabIndex = "-1"), Y) {
    const {
      onEnter: J,
      onExited: P
    } = Z();
    q.onEnter = J, q.onExited = P;
  }
  const X = (r = (o = j == null ? void 0 : j.root) != null ? o : k.Root) != null ? r : fm, W = (i = (s = j == null ? void 0 : j.backdrop) != null ? s : k.Backdrop) != null ? i : u, G = (l = $ == null ? void 0 : $.root) != null ? l : I.root, K = (c = $ == null ? void 0 : $.backdrop) != null ? c : I.backdrop, oe = xt({
    elementType: X,
    externalSlotProps: G,
    externalForwardedProps: D,
    getSlotProps: V,
    additionalProps: {
      ref: n,
      as: m
    },
    ownerState: z,
    className: ke(d, G == null ? void 0 : G.className, H == null ? void 0 : H.root, !z.open && z.exited && (H == null ? void 0 : H.hidden))
  }), _ = xt({
    elementType: W,
    externalSlotProps: K,
    additionalProps: f,
    getSlotProps: (J) => Q(T({}, J, {
      onClick: (P) => {
        C && C(P), J != null && J.onClick && J.onClick(P);
      }
    })),
    className: ke(K == null ? void 0 : K.className, f == null ? void 0 : f.className, H == null ? void 0 : H.backdrop),
    ownerState: z
  });
  return !F && !R && (!Y || U) ? null : /* @__PURE__ */ y(fn, {
    ref: O,
    container: g,
    disablePortal: N,
    children: /* @__PURE__ */ re(X, T({}, oe, {
      children: [!B && u ? /* @__PURE__ */ y(W, T({}, _)) : null, /* @__PURE__ */ y(Fn, {
        disableEnforceFocus: x,
        disableAutoFocus: w,
        disableRestoreFocus: S,
        isEnabled: A,
        open: R,
        children: /* @__PURE__ */ E.cloneElement(v, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (os.propTypes = {
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
  container: a.oneOfType([tt, a.func]),
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
const hm = os;
function gm(e) {
  return Ke("MuiPaper", e);
}
ct("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const bm = ["className", "component", "elevation", "square", "variant"], vm = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return ot(i, gm, o);
}, ym = Oe("div", {
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
    backgroundImage: `linear-gradient(${Hn("#fff", xi(t.elevation))}, ${Hn("#fff", xi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), is = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const r = it({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, p = de(r, bm), u = T({}, r, {
    component: i,
    elevation: s,
    square: l,
    variant: c
  }), f = vm(u);
  return process.env.NODE_ENV !== "production" && Tn().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ y(ym, T({
    as: i,
    ownerState: u,
    className: ke(f.root, o),
    ref: n
  }, p));
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
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Ht(ga, (e) => {
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
const wm = is;
function xm(e) {
  return Ke("MuiPopover", e);
}
ct("MuiPopover", ["root", "paper"]);
const Em = ["onEntering"], km = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Tm = ["slotProps"];
function Ci(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Si(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function Pi(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function jn(e) {
  return typeof e == "function" ? e() : e;
}
const Om = (e) => {
  const {
    classes: t
  } = e;
  return ot({
    root: ["root"],
    paper: ["paper"]
  }, xm, t);
}, Nm = Oe(hm, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), as = Oe(wm, {
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
}), ss = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i;
  const s = it({
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
    className: b,
    container: v,
    elevation: g = 8,
    marginThreshold: m = 16,
    open: k,
    PaperProps: I = {},
    slots: w,
    slotProps: x,
    transformOrigin: h = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: N = jr,
    transitionDuration: S = "auto",
    TransitionProps: {
      onEntering: L
    } = {},
    disableScrollLock: B = !1
  } = s, F = de(s.TransitionProps, Em), C = de(s, km), R = (r = x == null ? void 0 : x.paper) != null ? r : I, $ = E.useRef(), j = ze($, R.ref), D = T({}, s, {
    anchorOrigin: p,
    anchorReference: f,
    elevation: g,
    marginThreshold: m,
    externalPaperSlotProps: R,
    transformOrigin: h,
    TransitionComponent: N,
    transitionDuration: S,
    TransitionProps: F
  }), M = Om(D), V = E.useCallback(() => {
    if (f === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (u || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), u;
    const J = jn(c), P = J && J.nodeType === 1 ? J : Te($.current).body, ie = P.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const we = P.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && we.top === 0 && we.left === 0 && we.right === 0 && we.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: ie.top + Ci(ie, p.vertical),
      left: ie.left + Si(ie, p.horizontal)
    };
  }, [c, p.horizontal, p.vertical, u, f]), Q = E.useCallback((J) => ({
    vertical: Ci(J, h.vertical),
    horizontal: Si(J, h.horizontal)
  }), [h.horizontal, h.vertical]), Z = E.useCallback((J) => {
    const P = {
      width: J.offsetWidth,
      height: J.offsetHeight
    }, ie = Q(P);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Pi(ie)
      };
    const we = V();
    let Ne = we.top - ie.vertical, ve = we.left - ie.horizontal;
    const dt = Ne + P.height, Ce = ve + P.width, Je = jt(jn(c)), _e = Je.innerHeight - m, Ze = Je.innerWidth - m;
    if (m !== null && Ne < m) {
      const xe = Ne - m;
      Ne -= xe, ie.vertical += xe;
    } else if (m !== null && dt > _e) {
      const xe = dt - _e;
      Ne -= xe, ie.vertical += xe;
    }
    if (process.env.NODE_ENV !== "production" && P.height > _e && P.height && _e && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${P.height - _e}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), m !== null && ve < m) {
      const xe = ve - m;
      ve -= xe, ie.horizontal += xe;
    } else if (Ce > Ze) {
      const xe = Ce - Ze;
      ve -= xe, ie.horizontal += xe;
    }
    return {
      top: `${Math.round(Ne)}px`,
      left: `${Math.round(ve)}px`,
      transformOrigin: Pi(ie)
    };
  }, [c, f, V, Q, m]), [O, A] = E.useState(k), U = E.useCallback(() => {
    const J = $.current;
    if (!J)
      return;
    const P = Z(J);
    P.top !== null && (J.style.top = P.top), P.left !== null && (J.style.left = P.left), J.style.transformOrigin = P.transformOrigin, A(!0);
  }, [Z]);
  E.useEffect(() => (B && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, B, U]);
  const Y = (J, P) => {
    L && L(J, P), U();
  }, z = () => {
    A(!1);
  };
  E.useEffect(() => {
    k && U();
  }), E.useImperativeHandle(l, () => k ? {
    updatePosition: () => {
      U();
    }
  } : null, [k, U]), E.useEffect(() => {
    if (!k)
      return;
    const J = ca(() => {
      U();
    }), P = jt(c);
    return P.addEventListener("resize", J), () => {
      J.clear(), P.removeEventListener("resize", J);
    };
  }, [c, k, U]);
  let H = S;
  S === "auto" && !N.muiSupportAuto && (H = void 0);
  const q = v || (c ? Te(jn(c)).body : void 0), X = (o = w == null ? void 0 : w.root) != null ? o : Nm, W = (i = w == null ? void 0 : w.paper) != null ? i : as, G = xt({
    elementType: W,
    externalSlotProps: T({}, R, {
      style: O ? R.style : T({}, R.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: g,
      ref: j
    },
    ownerState: D,
    className: ke(M.paper, R == null ? void 0 : R.className)
  }), K = xt({
    elementType: X,
    externalSlotProps: (x == null ? void 0 : x.root) || {},
    externalForwardedProps: C,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: q,
      open: k
    },
    ownerState: D,
    className: ke(M.root, b)
  }), {
    slotProps: oe
  } = K, _ = de(K, Tm);
  return /* @__PURE__ */ y(X, T({}, _, !wa(X) && {
    slotProps: oe,
    disableScrollLock: B
  }, {
    children: /* @__PURE__ */ y(N, T({
      appear: !0,
      in: k,
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
process.env.NODE_ENV !== "production" && (ss.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: qr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Ht(a.oneOfType([tt, a.func]), (e) => {
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
  container: a.oneOfType([tt, a.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: a.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: ga,
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
    component: tc
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
const Cm = ss;
function Sm(e) {
  return Ke("MuiMenu", e);
}
ct("MuiMenu", ["root", "paper", "list"]);
const Pm = ["onEntering"], Rm = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], $m = {
  vertical: "top",
  horizontal: "right"
}, Mm = {
  vertical: "top",
  horizontal: "left"
}, Im = (e) => {
  const {
    classes: t
  } = e;
  return ot({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Sm, t);
}, _m = Oe(Cm, {
  shouldForwardProp: (e) => Fa(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Am = Oe(as, {
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
}), Dm = Oe(tm, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), ls = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o;
  const i = it({
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
    PaperProps: b = {},
    PopoverClasses: v,
    transitionDuration: g = "auto",
    TransitionProps: {
      onEntering: m
    } = {},
    variant: k = "selectedMenu",
    slots: I = {},
    slotProps: w = {}
  } = i, x = de(i.TransitionProps, Pm), h = de(i, Rm), N = Tn(), S = N.direction === "rtl", L = T({}, i, {
    autoFocus: s,
    disableAutoFocusItem: p,
    MenuListProps: u,
    onEntering: m,
    PaperProps: b,
    transitionDuration: g,
    TransitionProps: x,
    variant: k
  }), B = Im(L), F = s && !p && d, C = E.useRef(null), R = (Z, O) => {
    C.current && C.current.adjustStyleForScrollbar(Z, N), m && m(Z, O);
  }, $ = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), f && f(Z, "tabKeyDown"));
  };
  let j = -1;
  E.Children.map(l, (Z, O) => {
    /* @__PURE__ */ E.isValidElement(Z) && (process.env.NODE_ENV !== "production" && Bn.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (k === "selectedMenu" && Z.props.selected || j === -1) && (j = O));
  });
  const D = (r = I.paper) != null ? r : Am, M = (o = w.paper) != null ? o : b, V = xt({
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
  return /* @__PURE__ */ y(_m, T({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: S ? "right" : "left"
    },
    transformOrigin: S ? $m : Mm,
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
    transitionDuration: g,
    TransitionProps: T({
      onEntering: R
    }, x),
    ownerState: L
  }, h, {
    classes: v,
    children: /* @__PURE__ */ y(Dm, T({
      onKeyDown: $,
      actions: C,
      autoFocus: s && (j === -1 || p),
      autoFocusItem: F,
      variant: k
    }, u, {
      className: ke(B.list, u.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ls.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: a.oneOfType([tt, a.func]),
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
const jm = ls;
function bh({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var p;
  const [o, i] = he.useState(void 0), s = Pe(
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
  }, []), c = bn(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((p = n == null ? void 0 : n.items) == null ? void 0 : p.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ re(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ y(
          jm,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ y(
              uo,
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
const Bm = Ya(/* @__PURE__ */ y("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Lm(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Br = (e, t, n = {}) => {
  const r = bt(t);
  r.current = t;
  const o = bt(n);
  o.current = Lm(o.current);
  const [i, s] = Ee(() => r.current), [l, c] = Ee(!0);
  return zt(() => {
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
function Fm({
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
  }, [c]), b = Pe((x) => {
    x.stopPropagation(), p((h) => {
      const N = !h;
      return N && x.shiftKey ? f(!0) : N || f(!1), N;
    });
  }, []), v = Pe(
    (x) => (d(), r(x)),
    [r, d]
  ), [g, m] = Ee({ top: 1, left: 1 });
  zt(() => {
    if (c) {
      const x = o == null ? void 0 : o.current;
      if (x) {
        const h = x.getBoundingClientRect(), N = window.scrollY, S = window.scrollX, L = h.top + N + x.clientHeight, B = h.left + S;
        m({ top: L, left: B });
      }
    }
  }, [c, o]);
  const [k] = Br(
    Pe(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [I] = Br(
    Pe(async () => (e == null ? void 0 : e(!0)) ?? n ?? k, [e, n, k, c]),
    n ?? k
  ), w = u && I ? I : k;
  return /* @__PURE__ */ re(Xn, { children: [
    /* @__PURE__ */ y(
      ji,
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
        children: l ?? /* @__PURE__ */ y(Bm, {})
      }
    ),
    /* @__PURE__ */ y(
      Us,
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
        children: w ? /* @__PURE__ */ y(
          Xf,
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
function vh({
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
    ji,
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
const Vm = _i(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), fo = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(Bi.Root, { ref: n, className: ee(Vm(), e), ...t }));
fo.displayName = Bi.Root.displayName;
function qn({
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
  onBlur: b
}) {
  return /* @__PURE__ */ re("div", { className: ee("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ y(
      fo,
      {
        htmlFor: e,
        className: ee({
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
        className: ee(c, { "pr-border-red-600": n }),
        defaultValue: p,
        value: u,
        onChange: f,
        onFocus: d,
        onBlur: b
      }
    ),
    /* @__PURE__ */ y("p", { className: ee({ "pr-hidden": !o }), children: o })
  ] });
}
let kr;
const Tr = () => (kr || (kr = ue.allBookIds.map((e) => ({
  bookId: e,
  label: ue.bookIdToEnglishName(e)
}))), kr);
function yh({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c) => {
    const u = { bookNum: ue.bookIdToNumber(c.bookId), chapterNum: 1, verseNum: 1 };
    r(u);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, s = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = bn(() => Tr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ re("span", { id: n, className: "pr-flex pr-place-items-center", children: [
    /* @__PURE__ */ re("div", { className: "pr-inline-grid pr-items-center pr-gap-1.5", children: [
      /* @__PURE__ */ y(fo, { children: "Book" }),
      /* @__PURE__ */ y(Nr, { value: l, options: Tr(), onChange: o })
    ] }),
    /* @__PURE__ */ y(
      Ot,
      {
        onClick: () => r(Po(e, -1)),
        isDisabled: e.bookNum <= Es,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(
      Ot,
      {
        onClick: () => r(Po(e, 1)),
        isDisabled: e.bookNum >= Tr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ y(
      qn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ y(
      Ot,
      {
        onClick: () => t(Ro(e, -1)),
        isDisabled: e.chapterNum <= ks,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(
      Ot,
      {
        onClick: () => t(Ro(e, 1)),
        isDisabled: e.chapterNum >= Mi(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ y(
      qn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ y(
      Ot,
      {
        onClick: () => t($o(e, -1)),
        isDisabled: e.verseNum <= Ts,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(Ot, { onClick: () => t($o(e, 1)), children: ">" })
  ] });
}
function wh({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = Ee(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ y(
    qn,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  );
}
function xh({
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
    Hs,
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
function Eh({
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
    Ws,
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
function kh({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ y(
    qs,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Ri({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return (
    // `as keyof R` reminds TypeScript of what it actually is
    // `as string` is just asserting that the input is a string because this is the default editor
    // used for all values. It will probably break on non-strings
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    /* @__PURE__ */ y(qn, { defaultValue: t[n.key], onChange: r })
  );
}
const zm = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ y(
  ta,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Th({
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
  rowHeight: b = 35,
  headerRowHeight: v = 35,
  selectedRows: g,
  onSelectedRowsChange: m,
  onRowsChange: k,
  onCellClick: I,
  onCellDoubleClick: w,
  onCellContextMenu: x,
  onCellKeyDown: h,
  direction: N = "ltr",
  enableVirtualization: S = !0,
  onCopy: L,
  onPaste: B,
  onScroll: F,
  className: C,
  "data-testid": R
}) {
  const $ = bn(() => {
    const j = e.map((D) => typeof D.editable == "function" ? {
      ...D,
      editable: (V) => !!D.editable(V),
      renderEditCell: D.renderEditCell || Ri
    } : D.editable && !D.renderEditCell ? { ...D, renderEditCell: Ri } : D.renderEditCell && !D.editable ? { ...D, editable: !1 } : D);
    return u ? [{ ...el, minWidth: f }, ...j] : j;
  }, [e, u, f]);
  return /* @__PURE__ */ y(
    Qs,
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
      rowHeight: b,
      headerRowHeight: v,
      selectedRows: g,
      onSelectedRowsChange: m,
      onRowsChange: k,
      onCellClick: I,
      onCellDoubleClick: w,
      onCellContextMenu: x,
      onCellKeyDown: h,
      direction: N,
      enableVirtualization: S,
      onCopy: L,
      onPaste: B,
      onScroll: F,
      renderers: { renderCheckbox: zm },
      className: `papi-table ${C ?? "rdg-light"}`,
      "data-testid": R
    }
  );
}
function Oh({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = bt(void 0);
  return /* @__PURE__ */ y("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ y(Xs, { position: "static", id: r, children: /* @__PURE__ */ re(Ys, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ y(
      Fm,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ y("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Nh = (e, t) => {
  zt(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Or = () => !1, Ch = (e, t) => {
  const [n] = Br(
    Pe(async () => {
      if (!e)
        return Or;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Or,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  zt(() => () => {
    n !== Or && n();
  }, [n]);
}, Sh = Ie.Root, Um = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Ie.List,
  {
    ref: n,
    className: ee(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Um.displayName = Ie.List.displayName;
const Hm = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Ie.Trigger,
  {
    ref: n,
    className: ee(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
Hm.displayName = Ie.Trigger.displayName;
const Wm = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Ie.Content,
  {
    ref: n,
    className: ee(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Wm.displayName = Ie.Content.displayName;
const qm = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Ie.Root,
  {
    orientation: "vertical",
    ref: n,
    className: ee("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
qm.displayName = Ie.List.displayName;
const Xm = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Ie.List,
  {
    ref: n,
    className: ee(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Xm.displayName = Ie.List.displayName;
const Ph = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Ie.Trigger,
  {
    ref: n,
    ...t,
    className: ee(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Ym = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  Ie.Content,
  {
    ref: n,
    className: ee(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Ym.displayName = Ie.Content.displayName;
function Gm(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Gm(`.papi-button {
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
.pr-inset-0 {
  inset: 0px;
}
.pr-left-2 {
  left: 0.5rem;
}
.pr-left-\\[50\\%\\] {
  left: 50%;
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
.pr-top-\\[50\\%\\] {
  top: 50%;
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
.pr-grid {
  display: grid;
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
.pr-max-h-\\[300px\\] {
  max-height: 300px;
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
.pr-w-72 {
  width: 18rem;
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
.pr-w-\\[200px\\] {
  width: 200px;
}
.pr-w-full {
  width: 100%;
}
.pr-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.pr-max-w-lg {
  max-width: 32rem;
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
.pr-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-translate-y-\\[-50\\%\\] {
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
.pr-flex-col {
  flex-direction: column;
}
.pr-flex-col-reverse {
  flex-direction: column-reverse;
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
.pr-gap-4 {
  gap: 1rem;
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
.pr-overflow-x-hidden {
  overflow-x: hidden;
}
.pr-whitespace-nowrap {
  white-space: nowrap;
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
.pr-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.pr-bg-border {
  background-color: hsl(var(--border));
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
.pr-bg-transparent {
  background-color: transparent;
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
.pr-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.pr-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
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
.pr-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
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
.pr-opacity-0 {
  opacity: 0;
}
.pr-opacity-50 {
  opacity: 0.5;
}
.pr-opacity-60 {
  opacity: 0.6;
}
.pr-opacity-70 {
  opacity: 0.7;
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
.pr-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-duration-200 {
  transition-duration: 200ms;
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
.pr-duration-200 {
  animation-duration: 200ms;
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
.hover\\:pr-opacity-100:hover {
  opacity: 1;
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
.data-\\[disabled\\=true\\]\\:pr-pointer-events-none[data-disabled=true] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.data-\\[selected\\=true\\]\\:pr-bg-accent[data-selected=true] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:pr-bg-background[data-state=active] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=selected\\]\\:pr-bg-muted[data-state=selected] {
  background-color: hsl(var(--muted));
}
.data-\\[selected\\=true\\]\\:pr-text-accent-foreground[data-selected=true] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=open\\]\\:pr-text-muted-foreground[data-state=open] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:pr-opacity-50[data-disabled=true] {
  opacity: 0.5;
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
.data-\\[state\\=closed\\]\\:pr-slide-out-to-left-1\\/2[data-state=closed] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:pr-slide-out-to-top-\\[48\\%\\][data-state=closed] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-left-1\\/2[data-state=open] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-top-\\[48\\%\\][data-state=open] {
  --tw-enter-translate-y: -48%;
}
@media (min-width: 640px) {

  .sm\\:pr-flex-row {
    flex-direction: row;
  }

  .sm\\:pr-justify-end {
    justify-content: flex-end;
  }

  .sm\\:pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:pr-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:pr-text-left {
    text-align: left;
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
.\\[\\&\\>tr\\]\\:last\\:pr-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-font-medium [cmdk-group-heading] {
  font-weight: 500;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}
.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pr-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}
.\\[\\&_\\[cmdk-group\\]\\]\\:pr-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:pr-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:pr-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}
.\\[\\&_\\[cmdk-input\\]\\]\\:pr-h-12 [cmdk-input] {
  height: 3rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:pr-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:pr-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:pr-h-5 [cmdk-item] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:pr-w-5 [cmdk-item] svg {
  width: 1.25rem;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
  mh as BookChapterControl,
  Ot as Button,
  hh as ChapterRangeSelector,
  ta as Checkbox,
  gh as Checklist,
  Nr as ComboBox,
  bh as ContextMenu,
  fl as DropdownMenu,
  bl as DropdownMenuCheckboxItem,
  Wi as DropdownMenuContent,
  ph as DropdownMenuGroup,
  qi as DropdownMenuItem,
  zr as DropdownMenuLabel,
  uh as DropdownMenuPortal,
  fh as DropdownMenuRadioGroup,
  vl as DropdownMenuRadioItem,
  Xi as DropdownMenuSeparator,
  yl as DropdownMenuShortcut,
  dh as DropdownMenuSub,
  gl as DropdownMenuSubContent,
  hl as DropdownMenuSubTrigger,
  ml as DropdownMenuTrigger,
  Xf as GridMenu,
  Fm as HamburgerMenuButton,
  vh as IconButton,
  Ur as Input,
  It as LabelPosition,
  Ka as MenuItem,
  yh as RefSelector,
  wh as SearchBar,
  xh as Slider,
  Eh as Snackbar,
  kh as Switch,
  Th as Table,
  Sh as Tabs,
  Wm as TabsContent,
  Um as TabsList,
  Hm as TabsTrigger,
  qn as TextField,
  Oh as Toolbar,
  qm as VerticalTabs,
  Ym as VerticalTabsContent,
  Xm as VerticalTabsList,
  Ph as VerticalTabsTrigger,
  Nh as useEvent,
  Ch as useEventAsync,
  Br as usePromise
};
//# sourceMappingURL=index.js.map
