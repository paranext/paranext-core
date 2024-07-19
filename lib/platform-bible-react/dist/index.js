import yl, { jsxs as ie, jsx as w, Fragment as ar } from "react/jsx-runtime";
import * as R from "react";
import re, { forwardRef as gs, useCallback as Te, useState as Ce, useRef as Ot, useEffect as at, useLayoutEffect as ci, useMemo as Zt } from "react";
import { getChaptersForBook as ms, offsetBook as ui, FIRST_SCR_BOOK_NUM as xl, offsetChapter as di, FIRST_SCR_CHAPTER_NUM as Sl, offsetVerse as pi, FIRST_SCR_VERSE_NUM as Cl, compareScrRefs as Jr, scrRefToBBBCCCVVV as kr, formatScrRef as Tr } from "platform-bible-utils";
import * as he from "@radix-ui/react-dropdown-menu";
import { ChevronRight as El, Check as hs, Circle as Rl, History as kl, ArrowDownWideNarrow as Tl, Clock as Pl, Bookmark as Ol, ChevronDown as vs, ChevronUp as Nl } from "lucide-react";
import Pe, { clsx as $l } from "clsx";
import { extendTailwindMerge as _l } from "tailwind-merge";
import { Slot as Ml } from "@radix-ui/react-slot";
import { cva as wo } from "class-variance-authority";
import { Autocomplete as Il, TextField as Al, FormControlLabel as fi, FormLabel as Dl, Checkbox as Fl, MenuItem as Vl, ListItemText as Ll, ListItemIcon as bs, Menu as Bl, Grid as ws, List as jl, IconButton as ys, Drawer as zl, Slider as Hl, Snackbar as Gl, Switch as Ul, AppBar as ql, Toolbar as Wl } from "@mui/material";
import Xl, { ThemeContext as Yl, internal_processStyles as Kl } from "@mui/styled-engine";
import * as Jl from "react-dom";
import Ln from "react-dom";
import * as xs from "@radix-ui/react-label";
import * as ye from "@radix-ui/react-select";
import Zl, { SelectColumn as Ql } from "react-data-grid";
import * as De from "@radix-ui/react-tabs";
import * as gn from "@radix-ui/react-slider";
import * as Zr from "@radix-ui/react-switch";
var ec = Object.defineProperty, tc = (e, t, n) => t in e ? ec(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, se = (e, t, n) => tc(e, typeof t != "symbol" ? t + "" : t, n);
const $t = [
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
], yo = [
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
], Ss = [
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
], gi = dc();
function Qt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in gi ? gi[e] : 0;
}
function xo(e) {
  return Qt(e) > 0;
}
function nc(e) {
  const t = typeof e == "string" ? Qt(e) : e;
  return t >= 40 && t <= 66;
}
function rc(e) {
  return (typeof e == "string" ? Qt(e) : e) <= 39;
}
function Cs(e) {
  return e <= 66;
}
function oc(e) {
  const t = typeof e == "string" ? Qt(e) : e;
  return ks(t) && !Cs(t);
}
function* ic() {
  for (let e = 1; e <= $t.length; e++)
    yield e;
}
const sc = 1, Es = $t.length;
function ac() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function So(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= $t.length ? t : $t[n];
}
function Rs(e) {
  return e <= 0 || e > Es ? "******" : Ss[e - 1];
}
function lc(e) {
  return Rs(Qt(e));
}
function ks(e) {
  const t = typeof e == "number" ? So(e) : e;
  return xo(t) && !yo.includes(t);
}
function cc(e) {
  const t = typeof e == "number" ? So(e) : e;
  return xo(t) && yo.includes(t);
}
function uc(e) {
  return Ss[e - 1].includes("*obsolete*");
}
function dc() {
  const e = {};
  for (let t = 0; t < $t.length; t++)
    e[$t[t]] = t + 1;
  return e;
}
const ue = {
  allBookIds: $t,
  nonCanonicalIds: yo,
  bookIdToNumber: Qt,
  isBookIdValid: xo,
  isBookNT: nc,
  isBookOT: rc,
  isBookOTNT: Cs,
  isBookDC: oc,
  allBookNumbers: ic,
  firstBook: sc,
  lastBook: Es,
  extraBooks: ac,
  bookNumberToId: So,
  bookNumberToEnglishName: Rs,
  bookIdToEnglishName: lc,
  isCanonical: ks,
  isExtraMaterial: cc,
  isObsolete: uc
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
let Et = Le;
function mi(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Ts = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ts || {});
const Me = class ce {
  constructor(t, n, r, o) {
    if (se(this, "firstChapter"), se(this, "lastChapter"), se(this, "lastVerse"), se(this, "hasSegmentsDefined"), se(this, "text"), se(this, "BBBCCCVVVS"), se(this, "longHashCode"), se(this, "versification"), se(this, "rtlMark", "‏"), se(this, "_bookNum", 0), se(this, "_chapterNum", 0), se(this, "_verseNum", 0), se(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof Et ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof Et ? n : void 0;
        this.setEmpty(i), this._verseNum = t % ce.chapterDigitShifter, this._chapterNum = Math.floor(
          t % ce.bookDigitShifter / ce.chapterDigitShifter
        ), this._bookNum = Math.floor(t / ce.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof ce) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null)
            return;
          const i = t instanceof Et ? t : ce.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? ce.defaultVersification;
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
      return n = new ce(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof an)
        return n = new ce(), { success: !1, verseRef: n };
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
    return t % ce.bcvMaxValue * ce.bookDigitShifter + (n >= 0 ? n % ce.bcvMaxValue * ce.chapterDigitShifter : 0) + (r >= 0 ? r % ce.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: o, verse: i, versificationStr: s } = t, a = i || o.toString();
    let c;
    return s && (c = new Et(s)), n ? new ce(n, r.toString(), a, c) : new ce();
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
      if (n = n * 10 + +r - 0, n > ce.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(ce.verseRangeSeparator) || this._verse.includes(ce.verseSequenceIndicator));
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
    const { success: n, vNum: r } = ce.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ce.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > ue.lastBook)
      throw new an(
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
    this.versification = this.versification != null ? new Et(t) : void 0;
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
    return this.validateVerse(ce.verseRangeSeparators, ce.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return ce.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return ce.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new Et(Je[s]);
        } catch {
          throw new an("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new an("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ue.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ce.isVerseParseable(r[1]))
      throw new an("Invalid reference : " + t);
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
    return new ce(this);
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
    return t instanceof ce ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, n = ce.verseRangeSeparators, r = ce.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = mi(this._verse, r);
    for (const s of i.map((a) => mi(a, n))) {
      const a = this.clone();
      a.verse = s[0];
      const c = a.verseNum;
      if (o.push(a), s.length > 1) {
        const u = this.clone();
        if (u.verse = s[1], !t)
          for (let d = c + 1; d < u.verseNum; d++) {
            const g = new ce(
              this._bookNum,
              this._chapterNum,
              d,
              this.versification
            );
            this.isExcluded || o.push(g);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ue.lastBook ? 2 : (ue.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = ce.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = ue.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
se(Me, "defaultVersification", Et.English), se(Me, "verseRangeSeparator", "-"), se(Me, "verseSequenceIndicator", ","), se(Me, "verseRangeSeparators", [Me.verseRangeSeparator]), se(Me, "verseSequenceIndicators", [Me.verseSequenceIndicator]), se(Me, "chapterDigitShifter", 1e3), se(Me, "bookDigitShifter", Me.chapterDigitShifter * Me.chapterDigitShifter), se(Me, "bcvMaxValue", Me.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
se(Me, "ValidStatusType", Ts);
class an extends Error {
}
const pc = _l({ prefix: "pr-" });
function G(...e) {
  return pc($l(e));
}
const fc = he.Root, gc = he.Trigger, bv = he.Group, wv = he.Portal, yv = he.Sub, xv = he.RadioGroup, mc = re.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ ie(
  he.SubTrigger,
  {
    ref: o,
    className: G(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ w(El, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
mc.displayName = he.SubTrigger.displayName;
const hc = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  he.SubContent,
  {
    ref: n,
    className: G(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
hc.displayName = he.SubContent.displayName;
const Ps = re.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ w(he.Portal, { children: /* @__PURE__ */ w(
  he.Content,
  {
    ref: r,
    sideOffset: t,
    className: G(
      /* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Ps.displayName = he.Content.displayName;
const Os = re.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ w(
  he.Item,
  {
    ref: r,
    className: G(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
Os.displayName = he.Item.displayName;
const vc = re.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ ie(
  he.CheckboxItem,
  {
    ref: o,
    className: G(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ w("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ w(he.ItemIndicator, { children: /* @__PURE__ */ w(hs, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
vc.displayName = he.CheckboxItem.displayName;
const bc = re.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ie(
  he.RadioItem,
  {
    ref: r,
    className: G(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ w("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ w(he.ItemIndicator, { children: /* @__PURE__ */ w(Rl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
bc.displayName = he.RadioItem.displayName;
const Co = re.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ w(
  he.Label,
  {
    ref: r,
    className: G("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
Co.displayName = he.Label.displayName;
const Ns = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  he.Separator,
  {
    ref: n,
    className: G("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Ns.displayName = he.Separator.displayName;
function wc({ className: e, ...t }) {
  return /* @__PURE__ */ w(
    "span",
    {
      className: G("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
wc.displayName = "DropdownMenuShortcut";
const Eo = re.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ w(
    "input",
    {
      type: t,
      className: G(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Eo.displayName = "Input";
const yc = gs(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ ie("div", { className: "pr-relative", children: [
    /* @__PURE__ */ w(
      Eo,
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
    /* @__PURE__ */ w(
      kl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function xc({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (a, c) => c + 1), s = Te(
    (a) => {
      o(a);
    },
    [o]
  );
  return /* @__PURE__ */ w("div", { className: G("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((a) => /* @__PURE__ */ w(
    "div",
    {
      className: G(
        "pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
        {
          "pr-font-semibold pr-text-amber-900": a === n,
          "pr-bg-amber-200": a === r
        }
      ),
      onClick: (c) => {
        c.preventDefault(), c.stopPropagation(), e(a);
      },
      role: "button",
      onKeyDown: (c) => {
        c.key === "Enter" && e(a);
      },
      tabIndex: 0,
      onMouseMove: () => s(a),
      children: a
    },
    a
  )) });
}
const Sc = gs(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, a) => /* @__PURE__ */ ie(
    Os,
    {
      ref: a,
      textValue: e,
      className: G("pr-font-normal pr-text-slate-700", {
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
        /* @__PURE__ */ w(
          "span",
          {
            className: G(
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
        n && /* @__PURE__ */ w("div", { children: s })
      ]
    },
    e
  )
);
function Cc({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ ie(Co, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ w("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ ie("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ w(
        Tl,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ w(
        Pl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ w(
        Ol,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const bn = ue.allBookIds, Ec = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, hi = ["OT", "NT", "DC"], Rc = 32 + 32 + 32, kc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Tc = (e) => ({
  OT: bn.filter((n) => ue.isBookOT(n)),
  NT: bn.filter((n) => ue.isBookNT(n)),
  DC: bn.filter((n) => ue.isBookDC(n))
})[e], ln = (e) => ms(ue.bookIdToNumber(e));
function Pc() {
  return bn.map((t) => ue.bookIdToEnglishName(t));
}
function Oc(e) {
  return Pc().includes(e);
}
function Nc(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Oc(t))
    return bn.find((r) => ue.bookIdToEnglishName(r) === t);
}
function Sv({ scrRef: e, handleSubmit: t }) {
  const [n, r] = Ce(""), [o, i] = Ce(
    ue.bookNumberToId(e.bookNum)
  ), [s, a] = Ce(e.chapterNum ?? 0), [c, u] = Ce(
    ue.bookNumberToId(e.bookNum)
  ), [d, g] = Ce(!1), [p, f] = Ce(d), h = Ot(void 0), m = Ot(void 0), v = Ot(void 0), y = Te(
    (C) => Tc(C).filter((k) => {
      const N = ue.bookIdToEnglishName(k).toLowerCase(), B = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return N.includes(B) || // Match book name
      k.toLowerCase().includes(B);
    }),
    [n]
  ), P = (C) => {
    r(C);
  }, x = Ot(!1), S = Te((C) => {
    if (x.current) {
      x.current = !1;
      return;
    }
    g(C);
  }, []), b = Te(
    (C, k, N, B) => {
      if (a(
        ue.bookNumberToId(e.bookNum) !== C ? 1 : e.chapterNum
      ), k || ln(C) === -1) {
        t({
          bookNum: ue.bookIdToNumber(C),
          chapterNum: N || 1,
          verseNum: B || 1
        }), g(!1), r("");
        return;
      }
      i(o !== C ? C : ""), g(!k);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), E = (C) => {
    C <= 0 || C > ln(o) || b(o, !0, C);
  }, $ = Te(() => {
    kc.forEach((C) => {
      const k = n.match(C);
      if (k) {
        const [N, B = void 0, V = void 0] = k.slice(1), M = Nc(N);
        (ue.isBookIdValid(N) || M) && b(
          M ?? N,
          !0,
          B ? parseInt(B, 10) : 1,
          V ? parseInt(V, 10) : 1
        );
      }
    });
  }, [b, n]), I = Te(
    (C) => {
      d ? (C.key === "ArrowDown" || C.key === "ArrowUp") && (typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null ? v.current.focus() : typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null && m.current.focus(), C.preventDefault()) : g(!0);
    },
    [d]
  ), A = (C) => {
    const { key: k } = C;
    k === "ArrowRight" || k === "ArrowLeft" || k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: k })), h.current.focus());
  }, L = (C) => {
    const { key: k } = C;
    if (c === o) {
      if (k === "Enter") {
        C.preventDefault(), b(o, !0, s);
        return;
      }
      let N = 0;
      if (k === "ArrowRight")
        if (s < ln(c))
          N = 1;
        else {
          C.preventDefault();
          return;
        }
      else if (k === "ArrowLeft")
        if (s > 1)
          N = -1;
        else {
          C.preventDefault();
          return;
        }
      else
        k === "ArrowDown" ? N = 6 : k === "ArrowUp" && (N = -6);
      s + N <= 0 || s + N > ln(c) ? a(0) : N !== 0 && (a(s + N), C.preventDefault());
    }
  };
  return at(() => {
    o === c ? o === ue.bookNumberToId(e.bookNum) ? a(e.chapterNum) : a(1) : a(0);
  }, [c, e.bookNum, e.chapterNum, o]), ci(() => {
    f(d);
  }, [d]), ci(() => {
    const C = setTimeout(() => {
      if (p && m.current && v.current) {
        const N = v.current.offsetTop - Rc;
        m.current.scrollTo({ top: N, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(C);
    };
  }, [p]), /* @__PURE__ */ w("div", { className: "pr-flex", children: /* @__PURE__ */ ie(fc, { modal: !1, open: d, onOpenChange: S, children: [
    /* @__PURE__ */ w(gc, { asChild: !0, children: /* @__PURE__ */ w(
      yc,
      {
        ref: h,
        value: n,
        handleSearch: P,
        handleKeyDown: I,
        handleOnClick: () => {
          i(ue.bookNumberToId(e.bookNum)), u(ue.bookNumberToId(e.bookNum)), a(e.chapterNum > 0 ? e.chapterNum : 0), g(!0), h.current.focus();
        },
        onFocus: () => {
          x.current = !0;
        },
        handleSubmit: $,
        placeholder: `${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ ie(
      Ps,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: A,
        align: "start",
        ref: m,
        children: [
          /* @__PURE__ */ w(
            Cc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          hi.map(
            (C, k) => y(C).length > 0 && /* @__PURE__ */ ie("div", { children: [
              /* @__PURE__ */ w(Co, { className: "pr-font-semibold pr-text-slate-700", children: Ec[C] }),
              y(C).map((N) => /* @__PURE__ */ w("div", { children: /* @__PURE__ */ w(
                Sc,
                {
                  bookId: N,
                  handleSelectBook: () => b(N, !1),
                  isSelected: o === N,
                  handleHighlightBook: () => u(N),
                  handleKeyDown: L,
                  bookType: C,
                  ref: (B) => {
                    o === N && (v.current = B);
                  },
                  children: /* @__PURE__ */ w(
                    xc,
                    {
                      handleSelectChapter: E,
                      endChapter: ln(N),
                      activeChapter: e.bookNum === ue.bookIdToNumber(N) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (B) => {
                        a(B);
                      }
                    }
                  )
                }
              ) }, N)),
              hi.length - 1 !== k ? /* @__PURE__ */ w(Ns, {}) : void 0
            ] }, C)
          )
        ]
      }
    )
  ] }) });
}
const $c = wo(
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
), st = re.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ w(r ? Ml : "button", { className: G($c({ variant: t, size: n, className: e })), ref: i, ...o })
);
st.displayName = "Button";
function Qr({
  id: e,
  title: t,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: s,
  options: a = [],
  className: c,
  value: u,
  onChange: d,
  onFocus: g,
  onBlur: p,
  getOptionLabel: f
}) {
  return /* @__PURE__ */ w(
    Il,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: a,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: u,
      onChange: d,
      onFocus: g,
      onBlur: p,
      getOptionLabel: f,
      renderInput: (h) => /* @__PURE__ */ w(
        Al,
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
function Cv({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, i] = Ce(1), [s, a] = Ce(r), [c, u] = Ce(
    Array.from({ length: r }, (p, f) => f + 1)
  );
  at(() => {
    i(1), e(1), a(r), t(r), u(Array.from({ length: r }, (p, f) => f + 1));
  }, [r, t, e]);
  const d = (p, f) => {
    i(f), e(f), f > s && (a(f), t(f));
  }, g = (p, f) => {
    a(f), t(f), f < o && (i(f), e(f));
  };
  return /* @__PURE__ */ ie(ar, { children: [
    /* @__PURE__ */ w(
      fi,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ w(
          Qr,
          {
            onChange: (p, f) => d(p, f),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (p) => p.toString(),
            value: o,
            isDisabled: n
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ w(
      fi,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ w(
          Qr,
          {
            onChange: (p, f) => g(p, f),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (p) => p.toString(),
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
var Ht = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Ht || {});
function $s({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Ht.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: a = !1,
  className: c,
  onChange: u
}) {
  const d = /* @__PURE__ */ w(
    Fl,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: i,
      disabled: s,
      className: `papi-checkbox ${a ? "error" : ""} ${c ?? ""}`,
      onChange: u
    }
  );
  let g;
  if (n) {
    const p = r === Ht.Before || r === Ht.Above, f = /* @__PURE__ */ w("span", { className: `papi-checkbox-label ${a ? "error" : ""} ${c ?? ""}`, children: n }), h = r === Ht.Before || r === Ht.After, m = h ? f : /* @__PURE__ */ w("div", { children: f }), v = h ? d : /* @__PURE__ */ w("div", { children: d });
    g = /* @__PURE__ */ ie(
      Dl,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: a,
        children: [
          p && m,
          v,
          !p && m
        ]
      }
    );
  } else
    g = d;
  return g;
}
function Ev({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s
}) {
  return /* @__PURE__ */ ie("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ w("legend", { children: n }),
    r.map((a) => /* @__PURE__ */ w(
      $s,
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
function me(e, t) {
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
function _c(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Mc(e) {
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
var eo = { exports: {} }, Bn = { exports: {} }, de = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vi;
function Ic() {
  if (vi)
    return de;
  vi = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, P = e ? Symbol.for("react.scope") : 60119;
  function x(b) {
    if (typeof b == "object" && b !== null) {
      var E = b.$$typeof;
      switch (E) {
        case t:
          switch (b = b.type, b) {
            case c:
            case u:
            case r:
            case i:
            case o:
            case g:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case a:
                case d:
                case h:
                case f:
                case s:
                  return b;
                default:
                  return E;
              }
          }
        case n:
          return E;
      }
    }
  }
  function S(b) {
    return x(b) === u;
  }
  return de.AsyncMode = c, de.ConcurrentMode = u, de.ContextConsumer = a, de.ContextProvider = s, de.Element = t, de.ForwardRef = d, de.Fragment = r, de.Lazy = h, de.Memo = f, de.Portal = n, de.Profiler = i, de.StrictMode = o, de.Suspense = g, de.isAsyncMode = function(b) {
    return S(b) || x(b) === c;
  }, de.isConcurrentMode = S, de.isContextConsumer = function(b) {
    return x(b) === a;
  }, de.isContextProvider = function(b) {
    return x(b) === s;
  }, de.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, de.isForwardRef = function(b) {
    return x(b) === d;
  }, de.isFragment = function(b) {
    return x(b) === r;
  }, de.isLazy = function(b) {
    return x(b) === h;
  }, de.isMemo = function(b) {
    return x(b) === f;
  }, de.isPortal = function(b) {
    return x(b) === n;
  }, de.isProfiler = function(b) {
    return x(b) === i;
  }, de.isStrictMode = function(b) {
    return x(b) === o;
  }, de.isSuspense = function(b) {
    return x(b) === g;
  }, de.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === u || b === i || b === o || b === g || b === p || typeof b == "object" && b !== null && (b.$$typeof === h || b.$$typeof === f || b.$$typeof === s || b.$$typeof === a || b.$$typeof === d || b.$$typeof === v || b.$$typeof === y || b.$$typeof === P || b.$$typeof === m);
  }, de.typeOf = x, de;
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
var bi;
function Ac() {
  return bi || (bi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, P = e ? Symbol.for("react.scope") : 60119;
    function x(D) {
      return typeof D == "string" || typeof D == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      D === r || D === u || D === i || D === o || D === g || D === p || typeof D == "object" && D !== null && (D.$$typeof === h || D.$$typeof === f || D.$$typeof === s || D.$$typeof === a || D.$$typeof === d || D.$$typeof === v || D.$$typeof === y || D.$$typeof === P || D.$$typeof === m);
    }
    function S(D) {
      if (typeof D == "object" && D !== null) {
        var ee = D.$$typeof;
        switch (ee) {
          case t:
            var _ = D.type;
            switch (_) {
              case c:
              case u:
              case r:
              case i:
              case o:
              case g:
                return _;
              default:
                var le = _ && _.$$typeof;
                switch (le) {
                  case a:
                  case d:
                  case h:
                  case f:
                  case s:
                    return le;
                  default:
                    return ee;
                }
            }
          case n:
            return ee;
        }
      }
    }
    var b = c, E = u, $ = a, I = s, A = t, L = d, C = r, k = h, N = f, B = n, V = i, M = o, j = g, ne = !1;
    function te(D) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(D) || S(D) === c;
    }
    function O(D) {
      return S(D) === u;
    }
    function F(D) {
      return S(D) === a;
    }
    function H(D) {
      return S(D) === s;
    }
    function Y(D) {
      return typeof D == "object" && D !== null && D.$$typeof === t;
    }
    function z(D) {
      return S(D) === d;
    }
    function U(D) {
      return S(D) === r;
    }
    function W(D) {
      return S(D) === h;
    }
    function X(D) {
      return S(D) === f;
    }
    function q(D) {
      return S(D) === n;
    }
    function K(D) {
      return S(D) === i;
    }
    function Q(D) {
      return S(D) === o;
    }
    function ae(D) {
      return S(D) === g;
    }
    pe.AsyncMode = b, pe.ConcurrentMode = E, pe.ContextConsumer = $, pe.ContextProvider = I, pe.Element = A, pe.ForwardRef = L, pe.Fragment = C, pe.Lazy = k, pe.Memo = N, pe.Portal = B, pe.Profiler = V, pe.StrictMode = M, pe.Suspense = j, pe.isAsyncMode = te, pe.isConcurrentMode = O, pe.isContextConsumer = F, pe.isContextProvider = H, pe.isElement = Y, pe.isForwardRef = z, pe.isFragment = U, pe.isLazy = W, pe.isMemo = X, pe.isPortal = q, pe.isProfiler = K, pe.isStrictMode = Q, pe.isSuspense = ae, pe.isValidElementType = x, pe.typeOf = S;
  }()), pe;
}
var wi;
function _s() {
  return wi || (wi = 1, process.env.NODE_ENV === "production" ? Bn.exports = Ic() : Bn.exports = Ac()), Bn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Pr, yi;
function Dc() {
  if (yi)
    return Pr;
  yi = 1;
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
  return Pr = o() ? Object.assign : function(i, s) {
    for (var a, c = r(i), u, d = 1; d < arguments.length; d++) {
      a = Object(arguments[d]);
      for (var g in a)
        t.call(a, g) && (c[g] = a[g]);
      if (e) {
        u = e(a);
        for (var p = 0; p < u.length; p++)
          n.call(a, u[p]) && (c[u[p]] = a[u[p]]);
      }
    }
    return c;
  }, Pr;
}
var Or, xi;
function Ro() {
  if (xi)
    return Or;
  xi = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Or = e, Or;
}
var Nr, Si;
function Ms() {
  return Si || (Si = 1, Nr = Function.call.bind(Object.prototype.hasOwnProperty)), Nr;
}
var $r, Ci;
function Fc() {
  if (Ci)
    return $r;
  Ci = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Ro(), n = {}, r = Ms();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(i, s, a, c, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in i)
        if (r(i, d)) {
          var g;
          try {
            if (typeof i[d] != "function") {
              var p = Error(
                (c || "React class") + ": " + a + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw p.name = "Invariant Violation", p;
            }
            g = i[d](s, d, c, a, null, t);
          } catch (h) {
            g = h;
          }
          if (g && !(g instanceof Error) && e(
            (c || "React class") + ": type specification of " + a + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof g + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), g instanceof Error && !(g.message in n)) {
            n[g.message] = !0;
            var f = u ? u() : "";
            e(
              "Failed " + a + " type: " + g.message + (f ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, $r = o, $r;
}
var _r, Ei;
function Vc() {
  if (Ei)
    return _r;
  Ei = 1;
  var e = _s(), t = Dc(), n = Ro(), r = Ms(), o = Fc(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(a) {
    var c = "Warning: " + a;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return _r = function(a, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function g(O) {
      var F = O && (u && O[u] || O[d]);
      if (typeof F == "function")
        return F;
    }
    var p = "<<anonymous>>", f = {
      array: y("array"),
      bigint: y("bigint"),
      bool: y("boolean"),
      func: y("function"),
      number: y("number"),
      object: y("object"),
      string: y("string"),
      symbol: y("symbol"),
      any: P(),
      arrayOf: x,
      element: S(),
      elementType: b(),
      instanceOf: E,
      node: L(),
      objectOf: I,
      oneOf: $,
      oneOfType: A,
      shape: k,
      exact: N
    };
    function h(O, F) {
      return O === F ? O !== 0 || 1 / O === 1 / F : O !== O && F !== F;
    }
    function m(O, F) {
      this.message = O, this.data = F && typeof F == "object" ? F : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function v(O) {
      if (process.env.NODE_ENV !== "production")
        var F = {}, H = 0;
      function Y(U, W, X, q, K, Q, ae) {
        if (q = q || p, Q = Q || X, ae !== n) {
          if (c) {
            var D = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw D.name = "Invariant Violation", D;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ee = q + ":" + X;
            !F[ee] && // Avoid spamming the console because they are often not actionable except for lib authors
            H < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Q + "` prop on `" + q + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), F[ee] = !0, H++);
          }
        }
        return W[X] == null ? U ? W[X] === null ? new m("The " + K + " `" + Q + "` is marked as required " + ("in `" + q + "`, but its value is `null`.")) : new m("The " + K + " `" + Q + "` is marked as required in " + ("`" + q + "`, but its value is `undefined`.")) : null : O(W, X, q, K, Q);
      }
      var z = Y.bind(null, !1);
      return z.isRequired = Y.bind(null, !0), z;
    }
    function y(O) {
      function F(H, Y, z, U, W, X) {
        var q = H[Y], K = M(q);
        if (K !== O) {
          var Q = j(q);
          return new m(
            "Invalid " + U + " `" + W + "` of type " + ("`" + Q + "` supplied to `" + z + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return v(F);
    }
    function P() {
      return v(s);
    }
    function x(O) {
      function F(H, Y, z, U, W) {
        if (typeof O != "function")
          return new m("Property `" + W + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var X = H[Y];
        if (!Array.isArray(X)) {
          var q = M(X);
          return new m("Invalid " + U + " `" + W + "` of type " + ("`" + q + "` supplied to `" + z + "`, expected an array."));
        }
        for (var K = 0; K < X.length; K++) {
          var Q = O(X, K, z, U, W + "[" + K + "]", n);
          if (Q instanceof Error)
            return Q;
        }
        return null;
      }
      return v(F);
    }
    function S() {
      function O(F, H, Y, z, U) {
        var W = F[H];
        if (!a(W)) {
          var X = M(W);
          return new m("Invalid " + z + " `" + U + "` of type " + ("`" + X + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return v(O);
    }
    function b() {
      function O(F, H, Y, z, U) {
        var W = F[H];
        if (!e.isValidElementType(W)) {
          var X = M(W);
          return new m("Invalid " + z + " `" + U + "` of type " + ("`" + X + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return v(O);
    }
    function E(O) {
      function F(H, Y, z, U, W) {
        if (!(H[Y] instanceof O)) {
          var X = O.name || p, q = te(H[Y]);
          return new m("Invalid " + U + " `" + W + "` of type " + ("`" + q + "` supplied to `" + z + "`, expected ") + ("instance of `" + X + "`."));
        }
        return null;
      }
      return v(F);
    }
    function $(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function F(H, Y, z, U, W) {
        for (var X = H[Y], q = 0; q < O.length; q++)
          if (h(X, O[q]))
            return null;
        var K = JSON.stringify(O, function(ae, D) {
          var ee = j(D);
          return ee === "symbol" ? String(D) : D;
        });
        return new m("Invalid " + U + " `" + W + "` of value `" + String(X) + "` " + ("supplied to `" + z + "`, expected one of " + K + "."));
      }
      return v(F);
    }
    function I(O) {
      function F(H, Y, z, U, W) {
        if (typeof O != "function")
          return new m("Property `" + W + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var X = H[Y], q = M(X);
        if (q !== "object")
          return new m("Invalid " + U + " `" + W + "` of type " + ("`" + q + "` supplied to `" + z + "`, expected an object."));
        for (var K in X)
          if (r(X, K)) {
            var Q = O(X, K, z, U, W + "." + K, n);
            if (Q instanceof Error)
              return Q;
          }
        return null;
      }
      return v(F);
    }
    function A(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var F = 0; F < O.length; F++) {
        var H = O[F];
        if (typeof H != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ne(H) + " at index " + F + "."
          ), s;
      }
      function Y(z, U, W, X, q) {
        for (var K = [], Q = 0; Q < O.length; Q++) {
          var ae = O[Q], D = ae(z, U, W, X, q, n);
          if (D == null)
            return null;
          D.data && r(D.data, "expectedType") && K.push(D.data.expectedType);
        }
        var ee = K.length > 0 ? ", expected one of type [" + K.join(", ") + "]" : "";
        return new m("Invalid " + X + " `" + q + "` supplied to " + ("`" + W + "`" + ee + "."));
      }
      return v(Y);
    }
    function L() {
      function O(F, H, Y, z, U) {
        return B(F[H]) ? null : new m("Invalid " + z + " `" + U + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return v(O);
    }
    function C(O, F, H, Y, z) {
      return new m(
        (O || "React class") + ": " + F + " type `" + H + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function k(O) {
      function F(H, Y, z, U, W) {
        var X = H[Y], q = M(X);
        if (q !== "object")
          return new m("Invalid " + U + " `" + W + "` of type `" + q + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var K in O) {
          var Q = O[K];
          if (typeof Q != "function")
            return C(z, U, W, K, j(Q));
          var ae = Q(X, K, z, U, W + "." + K, n);
          if (ae)
            return ae;
        }
        return null;
      }
      return v(F);
    }
    function N(O) {
      function F(H, Y, z, U, W) {
        var X = H[Y], q = M(X);
        if (q !== "object")
          return new m("Invalid " + U + " `" + W + "` of type `" + q + "` " + ("supplied to `" + z + "`, expected `object`."));
        var K = t({}, H[Y], O);
        for (var Q in K) {
          var ae = O[Q];
          if (r(O, Q) && typeof ae != "function")
            return C(z, U, W, Q, j(ae));
          if (!ae)
            return new m(
              "Invalid " + U + " `" + W + "` key `" + Q + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(H[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var D = ae(X, Q, z, U, W + "." + Q, n);
          if (D)
            return D;
        }
        return null;
      }
      return v(F);
    }
    function B(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(B);
          if (O === null || a(O))
            return !0;
          var F = g(O);
          if (F) {
            var H = F.call(O), Y;
            if (F !== O.entries) {
              for (; !(Y = H.next()).done; )
                if (!B(Y.value))
                  return !1;
            } else
              for (; !(Y = H.next()).done; ) {
                var z = Y.value;
                if (z && !B(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function V(O, F) {
      return O === "symbol" ? !0 : F ? F["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && F instanceof Symbol : !1;
    }
    function M(O) {
      var F = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : V(F, O) ? "symbol" : F;
    }
    function j(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var F = M(O);
      if (F === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return F;
    }
    function ne(O) {
      var F = j(O);
      switch (F) {
        case "array":
        case "object":
          return "an " + F;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + F;
        default:
          return F;
      }
    }
    function te(O) {
      return !O.constructor || !O.constructor.name ? p : O.constructor.name;
    }
    return f.checkPropTypes = o, f.resetWarningCache = o.resetWarningCache, f.PropTypes = f, f;
  }, _r;
}
var Mr, Ri;
function Lc() {
  if (Ri)
    return Mr;
  Ri = 1;
  var e = Ro();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Mr = function() {
    function r(s, a, c, u, d, g) {
      if (g !== e) {
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
  }, Mr;
}
if (process.env.NODE_ENV !== "production") {
  var Bc = _s(), jc = !0;
  eo.exports = Vc()(Bc.isElement, jc);
} else
  eo.exports = Lc()();
var zc = eo.exports;
const l = /* @__PURE__ */ _c(zc);
function en(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function Pt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Is(e) {
  if (!Pt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Is(e[n]);
  }), t;
}
function lt(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? T({}, e) : e;
  return Pt(e) && Pt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Pt(t[o]) && o in e && Pt(e[o]) ? r[o] = lt(e[o], t[o], n) : n.clone ? r[o] = Pt(t[o]) ? Is(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function Hc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function As(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  const c = i.type;
  return typeof c == "function" && !Hc(c) && (a = "Did you accidentally use a plain function component for an element instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Ds = en(l.element, As);
Ds.isRequired = en(l.element.isRequired, As);
const On = Ds;
function Gc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Uc(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  return typeof i == "function" && !Gc(i) && (a = "Did you accidentally provide a plain function component instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const qc = en(l.elementType, Uc), Wc = "exact-prop: ​";
function Fs(e) {
  return process.env.NODE_ENV === "production" ? e : T({}, e, {
    [Wc]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function qt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var to = { exports: {} }, fe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ki;
function Xc() {
  if (ki)
    return fe;
  ki = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), h;
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
            case u:
            case d:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case a:
                case s:
                case c:
                case p:
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
  return fe.ContextConsumer = s, fe.ContextProvider = i, fe.Element = e, fe.ForwardRef = c, fe.Fragment = n, fe.Lazy = p, fe.Memo = g, fe.Portal = t, fe.Profiler = o, fe.StrictMode = r, fe.Suspense = u, fe.SuspenseList = d, fe.isAsyncMode = function() {
    return !1;
  }, fe.isConcurrentMode = function() {
    return !1;
  }, fe.isContextConsumer = function(v) {
    return m(v) === s;
  }, fe.isContextProvider = function(v) {
    return m(v) === i;
  }, fe.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, fe.isForwardRef = function(v) {
    return m(v) === c;
  }, fe.isFragment = function(v) {
    return m(v) === n;
  }, fe.isLazy = function(v) {
    return m(v) === p;
  }, fe.isMemo = function(v) {
    return m(v) === g;
  }, fe.isPortal = function(v) {
    return m(v) === t;
  }, fe.isProfiler = function(v) {
    return m(v) === o;
  }, fe.isStrictMode = function(v) {
    return m(v) === r;
  }, fe.isSuspense = function(v) {
    return m(v) === u;
  }, fe.isSuspenseList = function(v) {
    return m(v) === d;
  }, fe.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === n || v === o || v === r || v === u || v === d || v === f || typeof v == "object" && v !== null && (v.$$typeof === p || v.$$typeof === g || v.$$typeof === i || v.$$typeof === s || v.$$typeof === c || v.$$typeof === h || v.getModuleId !== void 0);
  }, fe.typeOf = m, fe;
}
var ge = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ti;
function Yc() {
  return Ti || (Ti = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), h = !1, m = !1, v = !1, y = !1, P = !1, x;
    x = Symbol.for("react.module.reference");
    function S(_) {
      return !!(typeof _ == "string" || typeof _ == "function" || _ === n || _ === o || P || _ === r || _ === u || _ === d || y || _ === f || h || m || v || typeof _ == "object" && _ !== null && (_.$$typeof === p || _.$$typeof === g || _.$$typeof === i || _.$$typeof === s || _.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      _.$$typeof === x || _.getModuleId !== void 0));
    }
    function b(_) {
      if (typeof _ == "object" && _ !== null) {
        var le = _.$$typeof;
        switch (le) {
          case e:
            var Ee = _.type;
            switch (Ee) {
              case n:
              case o:
              case r:
              case u:
              case d:
                return Ee;
              default:
                var $e = Ee && Ee.$$typeof;
                switch ($e) {
                  case a:
                  case s:
                  case c:
                  case p:
                  case g:
                  case i:
                    return $e;
                  default:
                    return le;
                }
            }
          case t:
            return le;
        }
      }
    }
    var E = s, $ = i, I = e, A = c, L = n, C = p, k = g, N = t, B = o, V = r, M = u, j = d, ne = !1, te = !1;
    function O(_) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function F(_) {
      return te || (te = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function H(_) {
      return b(_) === s;
    }
    function Y(_) {
      return b(_) === i;
    }
    function z(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === e;
    }
    function U(_) {
      return b(_) === c;
    }
    function W(_) {
      return b(_) === n;
    }
    function X(_) {
      return b(_) === p;
    }
    function q(_) {
      return b(_) === g;
    }
    function K(_) {
      return b(_) === t;
    }
    function Q(_) {
      return b(_) === o;
    }
    function ae(_) {
      return b(_) === r;
    }
    function D(_) {
      return b(_) === u;
    }
    function ee(_) {
      return b(_) === d;
    }
    ge.ContextConsumer = E, ge.ContextProvider = $, ge.Element = I, ge.ForwardRef = A, ge.Fragment = L, ge.Lazy = C, ge.Memo = k, ge.Portal = N, ge.Profiler = B, ge.StrictMode = V, ge.Suspense = M, ge.SuspenseList = j, ge.isAsyncMode = O, ge.isConcurrentMode = F, ge.isContextConsumer = H, ge.isContextProvider = Y, ge.isElement = z, ge.isForwardRef = U, ge.isFragment = W, ge.isLazy = X, ge.isMemo = q, ge.isPortal = K, ge.isProfiler = Q, ge.isStrictMode = ae, ge.isSuspense = D, ge.isSuspenseList = ee, ge.isValidElementType = S, ge.typeOf = b;
  }()), ge;
}
process.env.NODE_ENV === "production" ? to.exports = Xc() : to.exports = Yc();
var Zn = to.exports;
const Kc = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Jc(e) {
  const t = `${e}`.match(Kc);
  return t && t[1] || "";
}
function Vs(e, t = "") {
  return e.displayName || e.name || Jc(e) || t;
}
function Pi(e, t, n) {
  const r = Vs(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Zc(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Vs(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Zn.ForwardRef:
          return Pi(e, e.render, "ForwardRef");
        case Zn.Memo:
          return Pi(e, e.type, "memo");
        default:
          return;
      }
  }
}
function ct(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Qc = l.oneOfType([l.func, l.object]), ko = Qc;
function Qe(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : qt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function no(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Ls(e, t = 166) {
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
function eu(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const a = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${a}\` is deprecated. ${t}`) : null;
  };
}
function tu(e, t) {
  var n, r;
  return /* @__PURE__ */ R.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Oe(e) {
  return e && e.ownerDocument || document;
}
function Wt(e) {
  return Oe(e).defaultView || window;
}
function nu(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? T({}, t.propTypes) : null;
  return (o) => (i, s, a, c, u, ...d) => {
    const g = u || s, p = n == null ? void 0 : n[g];
    if (p) {
      const f = p(i, s, a, c, u, ...d);
      if (f)
        return f;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${g}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Qn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const ru = typeof window < "u" ? R.useLayoutEffect : R.useEffect, _t = ru;
let Oi = 0;
function ou(e) {
  const [t, n] = R.useState(e), r = e || t;
  return R.useEffect(() => {
    t == null && (Oi += 1, n(`mui-${Oi}`));
  }, [t]), r;
}
const Ni = R["useId".toString()];
function Bs(e) {
  if (Ni !== void 0) {
    const t = Ni();
    return e ?? t;
  }
  return ou(e);
}
function iu(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function js({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = R.useRef(e !== void 0), [i, s] = R.useState(t), a = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    R.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: u
    } = R.useRef(t);
    R.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = R.useCallback((u) => {
    o || s(u);
  }, []);
  return [a, c];
}
function En(e) {
  const t = R.useRef(e);
  return _t(() => {
    t.current = e;
  }), R.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function qe(...e) {
  return R.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Qn(n, t);
    });
  }, e);
}
const $i = {};
function su(e, t) {
  const n = R.useRef($i);
  return n.current === $i && (n.current = e(t)), n;
}
const au = [];
function lu(e) {
  R.useEffect(e, au);
}
class Nn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Nn();
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
function mn() {
  const e = su(Nn.create).current;
  return lu(e.disposeEffect), e;
}
let lr = !0, ro = !1;
const cu = new Nn(), uu = {
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
function du(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && uu[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function pu(e) {
  e.metaKey || e.altKey || e.ctrlKey || (lr = !0);
}
function Ir() {
  lr = !1;
}
function fu() {
  this.visibilityState === "hidden" && ro && (lr = !0);
}
function gu(e) {
  e.addEventListener("keydown", pu, !0), e.addEventListener("mousedown", Ir, !0), e.addEventListener("pointerdown", Ir, !0), e.addEventListener("touchstart", Ir, !0), e.addEventListener("visibilitychange", fu, !0);
}
function mu(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return lr || du(t);
}
function zs() {
  const e = R.useCallback((o) => {
    o != null && gu(o.ownerDocument);
  }, []), t = R.useRef(!1);
  function n() {
    return t.current ? (ro = !0, cu.start(100, () => {
      ro = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return mu(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Hs(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function hu(e) {
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
function vu(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const bu = Number.isInteger || vu;
function Gs(e, t, n, r) {
  const o = e[t];
  if (o == null || !bu(o)) {
    const i = hu(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function Us(e, t, ...n) {
  return e[t] === void 0 ? null : Gs(e, t, ...n);
}
function oo() {
  return null;
}
Us.isRequired = Gs;
oo.isRequired = oo;
const qs = process.env.NODE_ENV === "production" ? oo : Us;
function Ws(e, t) {
  const n = T({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = T({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = T({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = Ws(o[s], i[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function pt(e, t, n = void 0) {
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
const _i = (e) => e, wu = () => {
  let e = _i;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = _i;
    }
  };
}, yu = wu(), Xs = yu, Ys = {
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
  const r = Ys[t];
  return r ? `${n}-${r}` : `${Xs.generate(e)}-${t}`;
}
function wt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = tt(e, o, n);
  }), r;
}
function xu(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function Ks(e) {
  return typeof e == "string";
}
function hn(e, t, n) {
  return e === void 0 || Ks(e) ? t : T({}, t, {
    ownerState: T({}, t.ownerState, n)
  });
}
const Su = {
  disableDefaultClasses: !1
}, Cu = /* @__PURE__ */ R.createContext(Su);
function Eu(e) {
  const {
    disableDefaultClasses: t
  } = R.useContext(Cu);
  return (n) => t ? "" : e(n);
}
function Js(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Ru(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Mi(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function ku(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const f = Pe(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), h = T({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = T({}, n, o, r);
    return f.length > 0 && (m.className = f), Object.keys(h).length > 0 && (m.style = h), {
      props: m,
      internalRef: void 0
    };
  }
  const s = Js(T({}, o, r)), a = Mi(r), c = Mi(o), u = t(s), d = Pe(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), g = T({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), p = T({}, u, n, c, a);
  return d.length > 0 && (p.className = d), Object.keys(g).length > 0 && (p.style = g), {
    props: p,
    internalRef: u.ref
  };
}
const Tu = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Mt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = me(e, Tu), a = i ? {} : Ru(r, o), {
    props: c,
    internalRef: u
  } = ku(T({}, s, {
    externalSlotProps: a
  })), d = qe(u, a == null ? void 0 : a.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return hn(n, T({}, c, {
    ref: d
  }), o);
}
const Zs = "base";
function Pu(e) {
  return `${Zs}--${e}`;
}
function Ou(e, t) {
  return `${Zs}-${e}-${t}`;
}
function Qs(e, t) {
  const n = Ys[t];
  return n ? Pu(n) : Ou(e, t);
}
function Nu(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Qs(e, r);
  }), n;
}
const $u = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function _u(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Mu(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Iu(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Mu(e));
}
function Au(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll($u)).forEach((r, o) => {
    const i = _u(r);
    i === -1 || !Iu(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Du() {
  return !0;
}
function er(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Au,
    isEnabled: s = Du,
    open: a
  } = e, c = R.useRef(!1), u = R.useRef(null), d = R.useRef(null), g = R.useRef(null), p = R.useRef(null), f = R.useRef(!1), h = R.useRef(null), m = qe(t.ref, h), v = R.useRef(null);
  R.useEffect(() => {
    !a || !h.current || (f.current = !n);
  }, [n, a]), R.useEffect(() => {
    if (!a || !h.current)
      return;
    const x = Oe(h.current);
    return h.current.contains(x.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), f.current && h.current.focus()), () => {
      o || (g.current && g.current.focus && (c.current = !0, g.current.focus()), g.current = null);
    };
  }, [a]), R.useEffect(() => {
    if (!a || !h.current)
      return;
    const x = Oe(h.current), S = ($) => {
      v.current = $, !(r || !s() || $.key !== "Tab") && x.activeElement === h.current && $.shiftKey && (c.current = !0, d.current && d.current.focus());
    }, b = () => {
      const $ = h.current;
      if ($ === null)
        return;
      if (!x.hasFocus() || !s() || c.current) {
        c.current = !1;
        return;
      }
      if ($.contains(x.activeElement) || r && x.activeElement !== u.current && x.activeElement !== d.current)
        return;
      if (x.activeElement !== p.current)
        p.current = null;
      else if (p.current !== null)
        return;
      if (!f.current)
        return;
      let I = [];
      if ((x.activeElement === u.current || x.activeElement === d.current) && (I = i(h.current)), I.length > 0) {
        var A, L;
        const C = !!((A = v.current) != null && A.shiftKey && ((L = v.current) == null ? void 0 : L.key) === "Tab"), k = I[0], N = I[I.length - 1];
        typeof k != "string" && typeof N != "string" && (C ? N.focus() : k.focus());
      } else
        $.focus();
    };
    x.addEventListener("focusin", b), x.addEventListener("keydown", S, !0);
    const E = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && b();
    }, 50);
    return () => {
      clearInterval(E), x.removeEventListener("focusin", b), x.removeEventListener("keydown", S, !0);
    };
  }, [n, r, o, s, a, i]);
  const y = (x) => {
    g.current === null && (g.current = x.relatedTarget), f.current = !0, p.current = x.target;
    const S = t.props.onFocus;
    S && S(x);
  }, P = (x) => {
    g.current === null && (g.current = x.relatedTarget), f.current = !0;
  };
  return /* @__PURE__ */ ie(R.Fragment, {
    children: [/* @__PURE__ */ w("div", {
      tabIndex: a ? 0 : -1,
      onFocus: P,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ R.cloneElement(t, {
      ref: m,
      onFocus: y
    }), /* @__PURE__ */ w("div", {
      tabIndex: a ? 0 : -1,
      onFocus: P,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (er.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: On,
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
process.env.NODE_ENV !== "production" && (er["propTypes"] = Fs(er.propTypes));
function Fu(e) {
  return typeof e == "function" ? e() : e;
}
const Rn = /* @__PURE__ */ R.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, a] = R.useState(null), c = qe(/* @__PURE__ */ R.isValidElement(r) ? r.ref : null, n);
  if (_t(() => {
    i || a(Fu(o) || document.body);
  }, [o, i]), _t(() => {
    if (s && !i)
      return Qn(n, s), () => {
        Qn(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ R.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ R.cloneElement(r, u);
    }
    return /* @__PURE__ */ w(R.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ w(R.Fragment, {
    children: s && /* @__PURE__ */ Jl.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (Rn.propTypes = {
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
  container: l.oneOfType([ct, l.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: l.bool
});
process.env.NODE_ENV !== "production" && (Rn["propTypes"] = Fs(Rn.propTypes));
function Vu(e) {
  const t = Oe(e);
  return t.body === e ? Wt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function wn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Ii(e) {
  return parseInt(Wt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Lu(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Ai(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const a = i.indexOf(s) === -1, c = !Lu(s);
    a && c && wn(s, o);
  });
}
function Ar(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Bu(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Vu(r)) {
      const s = Hs(Oe(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Ii(r) + s}px`;
      const a = Oe(r).querySelectorAll(".mui-fixed");
      [].forEach.call(a, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${Ii(c) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Oe(r).body;
    else {
      const s = r.parentElement, a = Wt(r);
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
function ju(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class zu {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && wn(t.modalRef, !1);
    const o = ju(n);
    Ai(n, t.mount, t.modalRef, o, !0);
    const i = Ar(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Ar(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Bu(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Ar(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && wn(t.modalRef, n), Ai(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && wn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Hu(e) {
  return typeof e == "function" ? e() : e;
}
function Gu(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Uu = new zu();
function qu(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Uu,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: a,
    children: c,
    onClose: u,
    open: d,
    rootRef: g
  } = e, p = R.useRef({}), f = R.useRef(null), h = R.useRef(null), m = qe(h, g), [v, y] = R.useState(!d), P = Gu(c);
  let x = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (x = !1);
  const S = () => Oe(f.current), b = () => (p.current.modalRef = h.current, p.current.mount = f.current, p.current), E = () => {
    o.mount(b(), {
      disableScrollLock: r
    }), h.current && (h.current.scrollTop = 0);
  }, $ = En(() => {
    const M = Hu(t) || S().body;
    o.add(b(), M), h.current && E();
  }), I = R.useCallback(() => o.isTopModal(b()), [o]), A = En((M) => {
    f.current = M, M && (d && I() ? E() : h.current && wn(h.current, x));
  }), L = R.useCallback(() => {
    o.remove(b(), x);
  }, [x, o]);
  R.useEffect(() => () => {
    L();
  }, [L]), R.useEffect(() => {
    d ? $() : (!P || !i) && L();
  }, [d, L, P, i, $]);
  const C = (M) => (j) => {
    var ne;
    (ne = M.onKeyDown) == null || ne.call(M, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !I()) && (n || (j.stopPropagation(), u && u(j, "escapeKeyDown")));
  }, k = (M) => (j) => {
    var ne;
    (ne = M.onClick) == null || ne.call(M, j), j.target === j.currentTarget && u && u(j, "backdropClick");
  };
  return {
    getRootProps: (M = {}) => {
      const j = Js(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const ne = T({}, j, M);
      return T({
        role: "presentation"
      }, ne, {
        onKeyDown: C(ne),
        ref: m
      });
    },
    getBackdropProps: (M = {}) => {
      const j = M;
      return T({
        "aria-hidden": !0
      }, j, {
        onClick: k(j),
        open: d
      });
    },
    getTransitionProps: () => {
      const M = () => {
        y(!1), s && s();
      }, j = () => {
        y(!0), a && a(), i && L();
      };
      return {
        onEnter: no(M, c == null ? void 0 : c.props.onEnter),
        onExited: no(j, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: m,
    portalRef: A,
    isTopModal: I,
    exited: v,
    hasTransition: P
  };
}
var Ie = "top", We = "bottom", Xe = "right", Ae = "left", To = "auto", $n = [Ie, We, Xe, Ae], Xt = "start", kn = "end", Wu = "clippingParents", ea = "viewport", cn = "popper", Xu = "reference", Di = /* @__PURE__ */ $n.reduce(function(e, t) {
  return e.concat([t + "-" + Xt, t + "-" + kn]);
}, []), ta = /* @__PURE__ */ [].concat($n, [To]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Xt, t + "-" + kn]);
}, []), Yu = "beforeRead", Ku = "read", Ju = "afterRead", Zu = "beforeMain", Qu = "main", ed = "afterMain", td = "beforeWrite", nd = "write", rd = "afterWrite", od = [Yu, Ku, Ju, Zu, Qu, ed, td, nd, rd];
function et(e) {
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
function It(e) {
  var t = je(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ue(e) {
  var t = je(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Po(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = je(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function id(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Ue(i) || !et(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var a = o[s];
      a === !1 ? i.removeAttribute(s) : i.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function sd(e) {
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
      var o = t.elements[r], i = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), a = s.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !Ue(o) || !et(o) || (Object.assign(o.style, a), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const ad = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: id,
  effect: sd,
  requires: ["computeStyles"]
};
function Ze(e) {
  return e.split("-")[0];
}
var Nt = Math.max, tr = Math.min, Yt = Math.round;
function io() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function na() {
  return !/^((?!chrome|android).)*safari/i.test(io());
}
function Kt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Ue(e) && (o = e.offsetWidth > 0 && Yt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Yt(r.height) / e.offsetHeight || 1);
  var s = It(e) ? je(e) : window, a = s.visualViewport, c = !na() && n, u = (r.left + (c && a ? a.offsetLeft : 0)) / o, d = (r.top + (c && a ? a.offsetTop : 0)) / i, g = r.width / o, p = r.height / i;
  return {
    width: g,
    height: p,
    top: d,
    right: u + g,
    bottom: d + p,
    left: u,
    x: u,
    y: d
  };
}
function Oo(e) {
  var t = Kt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function ra(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Po(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function ut(e) {
  return je(e).getComputedStyle(e);
}
function ld(e) {
  return ["table", "td", "th"].indexOf(et(e)) >= 0;
}
function yt(e) {
  return ((It(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function cr(e) {
  return et(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Po(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    yt(e)
  );
}
function Fi(e) {
  return !Ue(e) || // https://github.com/popperjs/popper-core/issues/837
  ut(e).position === "fixed" ? null : e.offsetParent;
}
function cd(e) {
  var t = /firefox/i.test(io()), n = /Trident/i.test(io());
  if (n && Ue(e)) {
    var r = ut(e);
    if (r.position === "fixed")
      return null;
  }
  var o = cr(e);
  for (Po(o) && (o = o.host); Ue(o) && ["html", "body"].indexOf(et(o)) < 0; ) {
    var i = ut(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function _n(e) {
  for (var t = je(e), n = Fi(e); n && ld(n) && ut(n).position === "static"; )
    n = Fi(n);
  return n && (et(n) === "html" || et(n) === "body" && ut(n).position === "static") ? t : n || cd(e) || t;
}
function No(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function yn(e, t, n) {
  return Nt(e, tr(t, n));
}
function ud(e, t, n) {
  var r = yn(e, t, n);
  return r > n ? n : r;
}
function oa() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ia(e) {
  return Object.assign({}, oa(), e);
}
function sa(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var dd = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, ia(typeof t != "number" ? t : sa(t, $n));
};
function pd(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, a = Ze(n.placement), c = No(a), u = [Ae, Xe].indexOf(a) >= 0, d = u ? "height" : "width";
  if (!(!i || !s)) {
    var g = dd(o.padding, n), p = Oo(i), f = c === "y" ? Ie : Ae, h = c === "y" ? We : Xe, m = n.rects.reference[d] + n.rects.reference[c] - s[c] - n.rects.popper[d], v = s[c] - n.rects.reference[c], y = _n(i), P = y ? c === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, x = m / 2 - v / 2, S = g[f], b = P - p[d] - g[h], E = P / 2 - p[d] / 2 + x, $ = yn(S, E, b), I = c;
    n.modifiersData[r] = (t = {}, t[I] = $, t.centerOffset = $ - E, t);
  }
}
function fd(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ra(t.elements.popper, o) && (t.elements.arrow = o));
}
const gd = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: pd,
  effect: fd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Jt(e) {
  return e.split("-")[1];
}
var md = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function hd(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Yt(n * o) / o || 0,
    y: Yt(r * o) / o || 0
  };
}
function Vi(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, a = e.position, c = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, g = e.isFixed, p = s.x, f = p === void 0 ? 0 : p, h = s.y, m = h === void 0 ? 0 : h, v = typeof d == "function" ? d({
    x: f,
    y: m
  }) : {
    x: f,
    y: m
  };
  f = v.x, m = v.y;
  var y = s.hasOwnProperty("x"), P = s.hasOwnProperty("y"), x = Ae, S = Ie, b = window;
  if (u) {
    var E = _n(n), $ = "clientHeight", I = "clientWidth";
    if (E === je(n) && (E = yt(n), ut(E).position !== "static" && a === "absolute" && ($ = "scrollHeight", I = "scrollWidth")), E = E, o === Ie || (o === Ae || o === Xe) && i === kn) {
      S = We;
      var A = g && E === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        E[$]
      );
      m -= A - r.height, m *= c ? 1 : -1;
    }
    if (o === Ae || (o === Ie || o === We) && i === kn) {
      x = Xe;
      var L = g && E === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        E[I]
      );
      f -= L - r.width, f *= c ? 1 : -1;
    }
  }
  var C = Object.assign({
    position: a
  }, u && md), k = d === !0 ? hd({
    x: f,
    y: m
  }, je(n)) : {
    x: f,
    y: m
  };
  if (f = k.x, m = k.y, c) {
    var N;
    return Object.assign({}, C, (N = {}, N[S] = P ? "0" : "", N[x] = y ? "0" : "", N.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + m + "px)" : "translate3d(" + f + "px, " + m + "px, 0)", N));
  }
  return Object.assign({}, C, (t = {}, t[S] = P ? m + "px" : "", t[x] = y ? f + "px" : "", t.transform = "", t));
}
function vd(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, a = n.roundOffsets, c = a === void 0 ? !0 : a, u = {
    placement: Ze(t.placement),
    variation: Jt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Vi(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Vi(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const bd = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: vd,
  data: {}
};
var jn = {
  passive: !0
};
function wd(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, a = s === void 0 ? !0 : s, c = je(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, jn);
  }), a && c.addEventListener("resize", n.update, jn), function() {
    i && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, jn);
    }), a && c.removeEventListener("resize", n.update, jn);
  };
}
const yd = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: wd,
  data: {}
};
var xd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Xn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return xd[t];
  });
}
var Sd = {
  start: "end",
  end: "start"
};
function Li(e) {
  return e.replace(/start|end/g, function(t) {
    return Sd[t];
  });
}
function $o(e) {
  var t = je(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function _o(e) {
  return Kt(yt(e)).left + $o(e).scrollLeft;
}
function Cd(e, t) {
  var n = je(e), r = yt(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, a = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    var u = na();
    (u || !u && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a + _o(e),
    y: c
  };
}
function Ed(e) {
  var t, n = yt(e), r = $o(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = Nt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Nt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), a = -r.scrollLeft + _o(e), c = -r.scrollTop;
  return ut(o || n).direction === "rtl" && (a += Nt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: a,
    y: c
  };
}
function Mo(e) {
  var t = ut(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function aa(e) {
  return ["html", "body", "#document"].indexOf(et(e)) >= 0 ? e.ownerDocument.body : Ue(e) && Mo(e) ? e : aa(cr(e));
}
function xn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = aa(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = je(r), s = o ? [i].concat(i.visualViewport || [], Mo(r) ? r : []) : r, a = t.concat(s);
  return o ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(xn(cr(s)))
  );
}
function so(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Rd(e, t) {
  var n = Kt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Bi(e, t, n) {
  return t === ea ? so(Cd(e, n)) : It(t) ? Rd(t, n) : so(Ed(yt(e)));
}
function kd(e) {
  var t = xn(cr(e)), n = ["absolute", "fixed"].indexOf(ut(e).position) >= 0, r = n && Ue(e) ? _n(e) : e;
  return It(r) ? t.filter(function(o) {
    return It(o) && ra(o, r) && et(o) !== "body";
  }) : [];
}
function Td(e, t, n, r) {
  var o = t === "clippingParents" ? kd(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], a = i.reduce(function(c, u) {
    var d = Bi(e, u, r);
    return c.top = Nt(d.top, c.top), c.right = tr(d.right, c.right), c.bottom = tr(d.bottom, c.bottom), c.left = Nt(d.left, c.left), c;
  }, Bi(e, s, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function la(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ze(r) : null, i = r ? Jt(r) : null, s = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Ie:
      c = {
        x: s,
        y: t.y - n.height
      };
      break;
    case We:
      c = {
        x: s,
        y: t.y + t.height
      };
      break;
    case Xe:
      c = {
        x: t.x + t.width,
        y: a
      };
      break;
    case Ae:
      c = {
        x: t.x - n.width,
        y: a
      };
      break;
    default:
      c = {
        x: t.x,
        y: t.y
      };
  }
  var u = o ? No(o) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (i) {
      case Xt:
        c[u] = c[u] - (t[d] / 2 - n[d] / 2);
        break;
      case kn:
        c[u] = c[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function Tn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, a = n.boundary, c = a === void 0 ? Wu : a, u = n.rootBoundary, d = u === void 0 ? ea : u, g = n.elementContext, p = g === void 0 ? cn : g, f = n.altBoundary, h = f === void 0 ? !1 : f, m = n.padding, v = m === void 0 ? 0 : m, y = ia(typeof v != "number" ? v : sa(v, $n)), P = p === cn ? Xu : cn, x = e.rects.popper, S = e.elements[h ? P : p], b = Td(It(S) ? S : S.contextElement || yt(e.elements.popper), c, d, s), E = Kt(e.elements.reference), $ = la({
    reference: E,
    element: x,
    strategy: "absolute",
    placement: o
  }), I = so(Object.assign({}, x, $)), A = p === cn ? I : E, L = {
    top: b.top - A.top + y.top,
    bottom: A.bottom - b.bottom + y.bottom,
    left: b.left - A.left + y.left,
    right: A.right - b.right + y.right
  }, C = e.modifiersData.offset;
  if (p === cn && C) {
    var k = C[o];
    Object.keys(L).forEach(function(N) {
      var B = [Xe, We].indexOf(N) >= 0 ? 1 : -1, V = [Ie, We].indexOf(N) >= 0 ? "y" : "x";
      L[N] += k[V] * B;
    });
  }
  return L;
}
function Pd(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, a = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? ta : c, d = Jt(r), g = d ? a ? Di : Di.filter(function(h) {
    return Jt(h) === d;
  }) : $n, p = g.filter(function(h) {
    return u.indexOf(h) >= 0;
  });
  p.length === 0 && (p = g);
  var f = p.reduce(function(h, m) {
    return h[m] = Tn(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[Ze(m)], h;
  }, {});
  return Object.keys(f).sort(function(h, m) {
    return f[h] - f[m];
  });
}
function Od(e) {
  if (Ze(e) === To)
    return [];
  var t = Xn(e);
  return [Li(e), t, Li(t)];
}
function Nd(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !0 : s, c = n.fallbackPlacements, u = n.padding, d = n.boundary, g = n.rootBoundary, p = n.altBoundary, f = n.flipVariations, h = f === void 0 ? !0 : f, m = n.allowedAutoPlacements, v = t.options.placement, y = Ze(v), P = y === v, x = c || (P || !h ? [Xn(v)] : Od(v)), S = [v].concat(x).reduce(function(z, U) {
      return z.concat(Ze(U) === To ? Pd(t, {
        placement: U,
        boundary: d,
        rootBoundary: g,
        padding: u,
        flipVariations: h,
        allowedAutoPlacements: m
      }) : U);
    }, []), b = t.rects.reference, E = t.rects.popper, $ = /* @__PURE__ */ new Map(), I = !0, A = S[0], L = 0; L < S.length; L++) {
      var C = S[L], k = Ze(C), N = Jt(C) === Xt, B = [Ie, We].indexOf(k) >= 0, V = B ? "width" : "height", M = Tn(t, {
        placement: C,
        boundary: d,
        rootBoundary: g,
        altBoundary: p,
        padding: u
      }), j = B ? N ? Xe : Ae : N ? We : Ie;
      b[V] > E[V] && (j = Xn(j));
      var ne = Xn(j), te = [];
      if (i && te.push(M[k] <= 0), a && te.push(M[j] <= 0, M[ne] <= 0), te.every(function(z) {
        return z;
      })) {
        A = C, I = !1;
        break;
      }
      $.set(C, te);
    }
    if (I)
      for (var O = h ? 3 : 1, F = function(U) {
        var W = S.find(function(X) {
          var q = $.get(X);
          if (q)
            return q.slice(0, U).every(function(K) {
              return K;
            });
        });
        if (W)
          return A = W, "break";
      }, H = O; H > 0; H--) {
        var Y = F(H);
        if (Y === "break")
          break;
      }
    t.placement !== A && (t.modifiersData[r]._skip = !0, t.placement = A, t.reset = !0);
  }
}
const $d = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Nd,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ji(e, t, n) {
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
function zi(e) {
  return [Ie, Xe, We, Ae].some(function(t) {
    return e[t] >= 0;
  });
}
function _d(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = Tn(t, {
    elementContext: "reference"
  }), a = Tn(t, {
    altBoundary: !0
  }), c = ji(s, r), u = ji(a, o, i), d = zi(c), g = zi(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: g
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": g
  });
}
const Md = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: _d
};
function Id(e, t, n) {
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
function Ad(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = ta.reduce(function(d, g) {
    return d[g] = Id(g, t.rects, i), d;
  }, {}), a = s[t.placement], c = a.x, u = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = s;
}
const Dd = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ad
};
function Fd(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = la({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Vd = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Fd,
  data: {}
};
function Ld(e) {
  return e === "x" ? "y" : "x";
}
function Bd(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !1 : s, c = n.boundary, u = n.rootBoundary, d = n.altBoundary, g = n.padding, p = n.tether, f = p === void 0 ? !0 : p, h = n.tetherOffset, m = h === void 0 ? 0 : h, v = Tn(t, {
    boundary: c,
    rootBoundary: u,
    padding: g,
    altBoundary: d
  }), y = Ze(t.placement), P = Jt(t.placement), x = !P, S = No(y), b = Ld(S), E = t.modifiersData.popperOffsets, $ = t.rects.reference, I = t.rects.popper, A = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, L = typeof A == "number" ? {
    mainAxis: A,
    altAxis: A
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, A), C = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, k = {
    x: 0,
    y: 0
  };
  if (E) {
    if (i) {
      var N, B = S === "y" ? Ie : Ae, V = S === "y" ? We : Xe, M = S === "y" ? "height" : "width", j = E[S], ne = j + v[B], te = j - v[V], O = f ? -I[M] / 2 : 0, F = P === Xt ? $[M] : I[M], H = P === Xt ? -I[M] : -$[M], Y = t.elements.arrow, z = f && Y ? Oo(Y) : {
        width: 0,
        height: 0
      }, U = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : oa(), W = U[B], X = U[V], q = yn(0, $[M], z[M]), K = x ? $[M] / 2 - O - q - W - L.mainAxis : F - q - W - L.mainAxis, Q = x ? -$[M] / 2 + O + q + X + L.mainAxis : H + q + X + L.mainAxis, ae = t.elements.arrow && _n(t.elements.arrow), D = ae ? S === "y" ? ae.clientTop || 0 : ae.clientLeft || 0 : 0, ee = (N = C == null ? void 0 : C[S]) != null ? N : 0, _ = j + K - ee - D, le = j + Q - ee, Ee = yn(f ? tr(ne, _) : ne, j, f ? Nt(te, le) : te);
      E[S] = Ee, k[S] = Ee - j;
    }
    if (a) {
      var $e, xe = S === "x" ? Ie : Ae, St = S === "x" ? We : Xe, _e = E[b], nt = b === "y" ? "height" : "width", Fe = _e + v[xe], rt = _e - v[St], Re = [Ie, Ae].indexOf(y) !== -1, Dt = ($e = C == null ? void 0 : C[b]) != null ? $e : 0, Ct = Re ? Fe : _e - $[nt] - I[nt] - Dt + L.altAxis, tn = Re ? _e + $[nt] + I[nt] - Dt - L.altAxis : rt, Dn = f && Re ? ud(Ct, _e, tn) : yn(f ? Ct : Fe, _e, f ? tn : rt);
      E[b] = Dn, k[b] = Dn - _e;
    }
    t.modifiersData[r] = k;
  }
}
const jd = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Bd,
  requiresIfExists: ["offset"]
};
function zd(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Hd(e) {
  return e === je(e) || !Ue(e) ? $o(e) : zd(e);
}
function Gd(e) {
  var t = e.getBoundingClientRect(), n = Yt(t.width) / e.offsetWidth || 1, r = Yt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Ud(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ue(t), o = Ue(t) && Gd(t), i = yt(t), s = Kt(e, o, n), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((et(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Mo(i)) && (a = Hd(t)), Ue(t) ? (c = Kt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = _o(i))), {
    x: s.left + a.scrollLeft - c.x,
    y: s.top + a.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function qd(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function(a) {
      if (!n.has(a)) {
        var c = t.get(a);
        c && o(c);
      }
    }), r.push(i);
  }
  return e.forEach(function(i) {
    n.has(i.name) || o(i);
  }), r;
}
function Wd(e) {
  var t = qd(e);
  return od.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Xd(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Yd(e) {
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
var Hi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Gi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Kd(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? Hi : o;
  return function(a, c, u) {
    u === void 0 && (u = i);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Hi, i),
      modifiersData: {},
      elements: {
        reference: a,
        popper: c
      },
      attributes: {},
      styles: {}
    }, g = [], p = !1, f = {
      state: d,
      setOptions: function(y) {
        var P = typeof y == "function" ? y(d.options) : y;
        m(), d.options = Object.assign({}, i, d.options, P), d.scrollParents = {
          reference: It(a) ? xn(a) : a.contextElement ? xn(a.contextElement) : [],
          popper: xn(c)
        };
        var x = Wd(Yd([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = x.filter(function(S) {
          return S.enabled;
        }), h(), f.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var y = d.elements, P = y.reference, x = y.popper;
          if (Gi(P, x)) {
            d.rects = {
              reference: Ud(P, _n(x), d.options.strategy === "fixed"),
              popper: Oo(x)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(L) {
              return d.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var S = 0; S < d.orderedModifiers.length; S++) {
              if (d.reset === !0) {
                d.reset = !1, S = -1;
                continue;
              }
              var b = d.orderedModifiers[S], E = b.fn, $ = b.options, I = $ === void 0 ? {} : $, A = b.name;
              typeof E == "function" && (d = E({
                state: d,
                options: I,
                name: A,
                instance: f
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Xd(function() {
        return new Promise(function(v) {
          f.forceUpdate(), v(d);
        });
      }),
      destroy: function() {
        m(), p = !0;
      }
    };
    if (!Gi(a, c))
      return f;
    f.setOptions(u).then(function(v) {
      !p && u.onFirstUpdate && u.onFirstUpdate(v);
    });
    function h() {
      d.orderedModifiers.forEach(function(v) {
        var y = v.name, P = v.options, x = P === void 0 ? {} : P, S = v.effect;
        if (typeof S == "function") {
          var b = S({
            state: d,
            name: y,
            instance: f,
            options: x
          }), E = function() {
          };
          g.push(b || E);
        }
      });
    }
    function m() {
      g.forEach(function(v) {
        return v();
      }), g = [];
    }
    return f;
  };
}
var Jd = [yd, Vd, bd, ad, Dd, $d, jd, gd, Md], Zd = /* @__PURE__ */ Kd({
  defaultModifiers: Jd
});
const ca = "Popper";
function Qd(e) {
  return Qs(ca, e);
}
Nu(ca, ["root"]);
const ep = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], tp = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function np(e, t) {
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
function nr(e) {
  return typeof e == "function" ? e() : e;
}
function ur(e) {
  return e.nodeType !== void 0;
}
function rp(e) {
  return !ur(e);
}
const op = () => pt({
  root: ["root"]
}, Eu(Qd)), ip = {}, sp = /* @__PURE__ */ R.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: a,
    modifiers: c,
    open: u,
    placement: d,
    popperOptions: g,
    popperRef: p,
    slotProps: f = {},
    slots: h = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, v = me(t, ep), y = R.useRef(null), P = qe(y, n), x = R.useRef(null), S = qe(x, p), b = R.useRef(S);
  _t(() => {
    b.current = S;
  }, [S]), R.useImperativeHandle(p, () => x.current, []);
  const E = np(d, s), [$, I] = R.useState(E), [A, L] = R.useState(nr(o));
  R.useEffect(() => {
    x.current && x.current.forceUpdate();
  }), R.useEffect(() => {
    o && L(nr(o));
  }, [o]), _t(() => {
    if (!A || !u)
      return;
    const V = (ne) => {
      I(ne.placement);
    };
    if (process.env.NODE_ENV !== "production" && A && ur(A) && A.nodeType === 1) {
      const ne = A.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ne.top === 0 && ne.left === 0 && ne.right === 0 && ne.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let M = [{
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
        V(ne);
      }
    }];
    c != null && (M = M.concat(c)), g && g.modifiers != null && (M = M.concat(g.modifiers));
    const j = Zd(A, y.current, T({
      placement: E
    }, g, {
      modifiers: M
    }));
    return b.current(j), () => {
      j.destroy(), b.current(null);
    };
  }, [A, a, c, u, g, E]);
  const C = {
    placement: $
  };
  m !== null && (C.TransitionProps = m);
  const k = op(), N = (r = h.root) != null ? r : "div", B = Mt({
    elementType: N,
    externalSlotProps: f.root,
    externalForwardedProps: v,
    additionalProps: {
      role: "tooltip",
      ref: P
    },
    ownerState: t,
    className: k.root
  });
  return /* @__PURE__ */ w(N, T({}, B, {
    children: typeof i == "function" ? i(C) : i
  }));
}), ua = /* @__PURE__ */ R.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: a = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: d,
    placement: g = "bottom",
    popperOptions: p = ip,
    popperRef: f,
    style: h,
    transition: m = !1,
    slotProps: v = {},
    slots: y = {}
  } = t, P = me(t, tp), [x, S] = R.useState(!0), b = () => {
    S(!1);
  }, E = () => {
    S(!0);
  };
  if (!c && !d && (!m || x))
    return null;
  let $;
  if (i)
    $ = i;
  else if (r) {
    const L = nr(r);
    $ = L && ur(L) ? Oe(L).body : Oe(null).body;
  }
  const I = !d && c && (!m || x) ? "none" : void 0, A = m ? {
    in: d,
    onEnter: b,
    onExited: E
  } : void 0;
  return /* @__PURE__ */ w(Rn, {
    disablePortal: a,
    container: $,
    children: /* @__PURE__ */ w(sp, T({
      anchorEl: r,
      direction: s,
      disablePortal: a,
      modifiers: u,
      ref: n,
      open: m ? !x : d,
      placement: g,
      popperOptions: p,
      popperRef: f,
      slotProps: v,
      slots: y
    }, P, {
      style: T({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: I
      }, h),
      TransitionProps: A,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (ua.propTypes = {
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
  anchorEl: en(l.oneOfType([ct, l.object, l.func]), (e) => {
    if (e.open) {
      const t = nr(e.anchorEl);
      if (t && ur(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || rp(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: l.oneOfType([ct, l.func]),
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
  popperRef: ko,
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
const ap = ["values", "unit", "step"], lp = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => T({}, n, {
    [r.key]: r.val
  }), {});
};
function cp(e) {
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
  } = e, o = me(e, ap), i = lp(t), s = Object.keys(i);
  function a(p) {
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n})`;
  }
  function c(p) {
    return `@media (max-width:${(typeof t[p] == "number" ? t[p] : p) - r / 100}${n})`;
  }
  function u(p, f) {
    const h = s.indexOf(f);
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n}) and (max-width:${(h !== -1 && typeof t[s[h]] == "number" ? t[s[h]] : f) - r / 100}${n})`;
  }
  function d(p) {
    return s.indexOf(p) + 1 < s.length ? u(p, s[s.indexOf(p) + 1]) : a(p);
  }
  function g(p) {
    const f = s.indexOf(p);
    return f === 0 ? a(s[1]) : f === s.length - 1 ? c(s[f]) : u(p, s[s.indexOf(p) + 1]).replace("@media", "@media not all and");
  }
  return T({
    keys: s,
    values: i,
    up: a,
    down: c,
    between: u,
    only: d,
    not: g,
    unit: n
  }, o);
}
const up = {
  borderRadius: 4
}, dp = up, pp = process.env.NODE_ENV !== "production" ? l.oneOfType([l.number, l.string, l.object, l.array]) : {}, xt = pp;
function Sn(e, t) {
  return t ? lt(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Io = {
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
}, Ui = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Io[e]}px)`
};
function dt(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Ui;
    return t.reduce((s, a, c) => (s[i.up(i.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || Ui;
    return Object.keys(t).reduce((s, a) => {
      if (Object.keys(i.values || Io).indexOf(a) !== -1) {
        const c = i.up(a);
        s[c] = n(t[a], a);
      } else {
        const c = a;
        s[c] = t[c];
      }
      return s;
    }, {});
  }
  return n(t);
}
function fp(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function gp(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function dr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function rr(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = dr(e, n) || r, t && (o = t(o, r, e)), o;
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
    const a = s[t], c = s.theme, u = dr(c, r) || {};
    return dt(s, a, (g) => {
      let p = rr(u, o, g);
      return g === p && typeof g == "string" && (p = rr(u, o, `${t}${g === "default" ? "" : Qe(g)}`, g)), n === !1 ? p : {
        [n]: p
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: xt
  } : {}, i.filterProps = [t], i;
}
function mp(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const hp = {
  m: "margin",
  p: "padding"
}, vp = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, qi = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, bp = mp((e) => {
  if (e.length > 2)
    if (qi[e])
      e = qi[e];
    else
      return [e];
  const [t, n] = e.split(""), r = hp[t], o = vp[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), pr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], fr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], wp = [...pr, ...fr];
function Mn(e, t, n, r) {
  var o;
  const i = (o = dr(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function da(e) {
  return Mn(e, "spacing", 8, "spacing");
}
function In(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function yp(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = In(t, n), r), {});
}
function xp(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = bp(n), i = yp(o, r), s = e[n];
  return dt(e, s, i);
}
function pa(e, t) {
  const n = da(e.theme);
  return Object.keys(e).map((r) => xp(e, t, r, n)).reduce(Sn, {});
}
function be(e) {
  return pa(e, pr);
}
be.propTypes = process.env.NODE_ENV !== "production" ? pr.reduce((e, t) => (e[t] = xt, e), {}) : {};
be.filterProps = pr;
function we(e) {
  return pa(e, fr);
}
we.propTypes = process.env.NODE_ENV !== "production" ? fr.reduce((e, t) => (e[t] = xt, e), {}) : {};
we.filterProps = fr;
process.env.NODE_ENV !== "production" && wp.reduce((e, t) => (e[t] = xt, e), {});
function Sp(e = 8) {
  if (e.mui)
    return e;
  const t = da({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function gr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? Sn(o, t[i](r)) : o, {});
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
const Cp = Ye("border", Ge), Ep = Ye("borderTop", Ge), Rp = Ye("borderRight", Ge), kp = Ye("borderBottom", Ge), Tp = Ye("borderLeft", Ge), Pp = Ye("borderColor"), Op = Ye("borderTopColor"), Np = Ye("borderRightColor"), $p = Ye("borderBottomColor"), _p = Ye("borderLeftColor"), Mp = Ye("outline", Ge), Ip = Ye("outlineColor"), mr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Mn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: In(t, r)
    });
    return dt(e, e.borderRadius, n);
  }
  return null;
};
mr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: xt
} : {};
mr.filterProps = ["borderRadius"];
gr(Cp, Ep, Rp, kp, Tp, Pp, Op, Np, $p, _p, mr, Mp, Ip);
const hr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Mn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: In(t, r)
    });
    return dt(e, e.gap, n);
  }
  return null;
};
hr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: xt
} : {};
hr.filterProps = ["gap"];
const vr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Mn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: In(t, r)
    });
    return dt(e, e.columnGap, n);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: xt
} : {};
vr.filterProps = ["columnGap"];
const br = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Mn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: In(t, r)
    });
    return dt(e, e.rowGap, n);
  }
  return null;
};
br.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: xt
} : {};
br.filterProps = ["rowGap"];
const Ap = Se({
  prop: "gridColumn"
}), Dp = Se({
  prop: "gridRow"
}), Fp = Se({
  prop: "gridAutoFlow"
}), Vp = Se({
  prop: "gridAutoColumns"
}), Lp = Se({
  prop: "gridAutoRows"
}), Bp = Se({
  prop: "gridTemplateColumns"
}), jp = Se({
  prop: "gridTemplateRows"
}), zp = Se({
  prop: "gridTemplateAreas"
}), Hp = Se({
  prop: "gridArea"
});
gr(hr, vr, br, Ap, Dp, Fp, Vp, Lp, Bp, jp, zp, Hp);
function Ut(e, t) {
  return t === "grey" ? t : e;
}
const Gp = Se({
  prop: "color",
  themeKey: "palette",
  transform: Ut
}), Up = Se({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ut
}), qp = Se({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ut
});
gr(Gp, Up, qp);
function Be(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Wp = Se({
  prop: "width",
  transform: Be
}), Ao = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Io[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Be(n)
      };
    };
    return dt(e, e.maxWidth, t);
  }
  return null;
};
Ao.filterProps = ["maxWidth"];
const Xp = Se({
  prop: "minWidth",
  transform: Be
}), Yp = Se({
  prop: "height",
  transform: Be
}), Kp = Se({
  prop: "maxHeight",
  transform: Be
}), Jp = Se({
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
const Zp = Se({
  prop: "boxSizing"
});
gr(Wp, Ao, Xp, Yp, Kp, Jp, Zp);
const Qp = {
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
    style: mr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Ut
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Ut
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Ut
  },
  // spacing
  p: {
    style: we
  },
  pt: {
    style: we
  },
  pr: {
    style: we
  },
  pb: {
    style: we
  },
  pl: {
    style: we
  },
  px: {
    style: we
  },
  py: {
    style: we
  },
  padding: {
    style: we
  },
  paddingTop: {
    style: we
  },
  paddingRight: {
    style: we
  },
  paddingBottom: {
    style: we
  },
  paddingLeft: {
    style: we
  },
  paddingX: {
    style: we
  },
  paddingY: {
    style: we
  },
  paddingInline: {
    style: we
  },
  paddingInlineStart: {
    style: we
  },
  paddingInlineEnd: {
    style: we
  },
  paddingBlock: {
    style: we
  },
  paddingBlockStart: {
    style: we
  },
  paddingBlockEnd: {
    style: we
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
    style: hr
  },
  rowGap: {
    style: br
  },
  columnGap: {
    style: vr
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
    style: Ao
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
}, Do = Qp;
function ef(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function tf(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function nf() {
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
      cssProperty: c = n,
      themeKey: u,
      transform: d,
      style: g
    } = a;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const p = dr(o, u) || {};
    return g ? g(s) : dt(s, r, (h) => {
      let m = rr(p, d, h);
      return h === m && typeof h == "string" && (m = rr(p, d, `${n}${h === "default" ? "" : Qe(h)}`, h)), c === !1 ? m : {
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
    const s = (r = i.unstable_sxConfig) != null ? r : Do;
    function a(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const d = fp(i.breakpoints), g = Object.keys(d);
      let p = d;
      return Object.keys(u).forEach((f) => {
        const h = tf(u[f], i);
        if (h != null)
          if (typeof h == "object")
            if (s[f])
              p = Sn(p, e(f, h, i, s));
            else {
              const m = dt({
                theme: i
              }, h, (v) => ({
                [f]: v
              }));
              ef(m, h) ? p[f] = t({
                sx: h,
                theme: i
              }) : p = Sn(p, m);
            }
          else
            p = Sn(p, e(f, h, i, s));
      }), gp(g, p);
    }
    return Array.isArray(o) ? o.map(a) : a(o);
  }
  return t;
}
const fa = nf();
fa.filterProps = ["sx"];
const Fo = fa;
function rf(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const of = ["breakpoints", "palette", "spacing", "shape"];
function Vo(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = me(e, of), a = cp(n), c = Sp(o);
  let u = lt({
    breakpoints: a,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: T({
      mode: "light"
    }, r),
    spacing: c,
    shape: T({}, dp, i)
  }, s);
  return u.applyStyles = rf, u = t.reduce((d, g) => lt(d, g), u), u.unstable_sxConfig = T({}, Do, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(g) {
    return Fo({
      sx: g,
      theme: this
    });
  }, u;
}
function sf(e) {
  return Object.keys(e).length === 0;
}
function ga(e = null) {
  const t = R.useContext(Yl);
  return !t || sf(t) ? e : t;
}
const af = Vo();
function ma(e = af) {
  return ga(e);
}
const lf = ["ownerState"], cf = ["variants"], uf = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function df(e) {
  return Object.keys(e).length === 0;
}
function pf(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Yn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const ff = Vo(), Wi = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function zn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return df(t) ? e : t[n] || t;
}
function gf(e) {
  return e ? (t, n) => n[e] : null;
}
function Kn(e, t) {
  let {
    ownerState: n
  } = t, r = me(t, lf);
  const o = typeof e == "function" ? e(T({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Kn(i, T({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let a = me(o, cf);
    return i.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(T({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((d) => {
        (n == null ? void 0 : n[d]) !== c.props[d] && r[d] !== c.props[d] && (u = !1);
      }), u && (Array.isArray(a) || (a = [a]), a.push(typeof c.style == "function" ? c.style(T({
        ownerState: n
      }, r, n)) : c.style));
    }), a;
  }
  return o;
}
function mf(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = ff,
    rootShouldForwardProp: r = Yn,
    slotShouldForwardProp: o = Yn
  } = e, i = (s) => Fo(T({}, s, {
    theme: zn(T({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, a = {}) => {
    Kl(s, (b) => b.filter((E) => !(E != null && E.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: d,
      skipSx: g,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: p = gf(Wi(u))
    } = a, f = me(a, uf), h = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), m = g || !1;
    let v;
    process.env.NODE_ENV !== "production" && c && (v = `${c}-${Wi(u || "Root")}`);
    let y = Yn;
    u === "Root" || u === "root" ? y = r : u ? y = o : pf(s) && (y = void 0);
    const P = Xl(s, T({
      shouldForwardProp: y,
      label: v
    }, f)), x = (b) => typeof b == "function" && b.__emotion_real !== b || Pt(b) ? (E) => Kn(b, T({}, E, {
      theme: zn({
        theme: E.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : b, S = (b, ...E) => {
      let $ = x(b);
      const I = E ? E.map(x) : [];
      c && p && I.push((C) => {
        const k = zn(T({}, C, {
          defaultTheme: n,
          themeId: t
        }));
        if (!k.components || !k.components[c] || !k.components[c].styleOverrides)
          return null;
        const N = k.components[c].styleOverrides, B = {};
        return Object.entries(N).forEach(([V, M]) => {
          B[V] = Kn(M, T({}, C, {
            theme: k
          }));
        }), p(C, B);
      }), c && !h && I.push((C) => {
        var k;
        const N = zn(T({}, C, {
          defaultTheme: n,
          themeId: t
        })), B = N == null || (k = N.components) == null || (k = k[c]) == null ? void 0 : k.variants;
        return Kn({
          variants: B
        }, T({}, C, {
          theme: N
        }));
      }), m || I.push(i);
      const A = I.length - E.length;
      if (Array.isArray(b) && A > 0) {
        const C = new Array(A).fill("");
        $ = [...b, ...C], $.raw = [...b.raw, ...C];
      }
      const L = P($, ...I);
      if (process.env.NODE_ENV !== "production") {
        let C;
        c && (C = `${c}${Qe(u || "")}`), C === void 0 && (C = `Styled(${Zc(s)})`), L.displayName = C;
      }
      return s.muiName && (L.muiName = s.muiName), L;
    };
    return P.withConfig && (S.withConfig = P.withConfig), S;
  };
}
function hf(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Ws(t.components[n].defaultProps, r);
}
function vf({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = ma(n);
  return r && (o = o[r] || o), hf({
    theme: o,
    name: t,
    props: e
  });
}
function Lo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), xu(e, t, n);
}
function bf(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function At(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return At(bf(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : qt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : qt(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function wr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function wf(e) {
  e = At(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (u, d = (u + n / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let a = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (a += "a", c.push(t[3])), wr({
    type: a,
    values: c
  });
}
function Xi(e) {
  e = At(e);
  let t = e.type === "hsl" || e.type === "hsla" ? At(wf(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Yi(e, t) {
  const n = Xi(e), r = Xi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function or(e, t) {
  return e = At(e), t = Lo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, wr(e);
}
function yf(e, t) {
  if (e = At(e), t = Lo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return wr(e);
}
function xf(e, t) {
  if (e = At(e), t = Lo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return wr(e);
}
function Sf(e, t) {
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
const Cf = {
  black: "#000",
  white: "#fff"
}, Pn = Cf, Ef = {
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
}, Rf = Ef, kf = {
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
}, Ft = kf, Tf = {
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
}, Vt = Tf, Pf = {
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
}, un = Pf, Of = {
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
}, Lt = Of, Nf = {
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
}, Bt = Nf, $f = {
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
}, jt = $f, _f = ["mode", "contrastThreshold", "tonalOffset"], Ki = {
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
    paper: Pn.white,
    default: Pn.white
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
}, Dr = {
  text: {
    primary: Pn.white,
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
    active: Pn.white,
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
function Ji(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = xf(e.main, o) : t === "dark" && (e.dark = yf(e.main, i)));
}
function Mf(e = "light") {
  return e === "dark" ? {
    main: Lt[200],
    light: Lt[50],
    dark: Lt[400]
  } : {
    main: Lt[700],
    light: Lt[400],
    dark: Lt[800]
  };
}
function If(e = "light") {
  return e === "dark" ? {
    main: Ft[200],
    light: Ft[50],
    dark: Ft[400]
  } : {
    main: Ft[500],
    light: Ft[300],
    dark: Ft[700]
  };
}
function Af(e = "light") {
  return e === "dark" ? {
    main: Vt[500],
    light: Vt[300],
    dark: Vt[700]
  } : {
    main: Vt[700],
    light: Vt[400],
    dark: Vt[800]
  };
}
function Df(e = "light") {
  return e === "dark" ? {
    main: Bt[400],
    light: Bt[300],
    dark: Bt[700]
  } : {
    main: Bt[700],
    light: Bt[500],
    dark: Bt[900]
  };
}
function Ff(e = "light") {
  return e === "dark" ? {
    main: jt[400],
    light: jt[300],
    dark: jt[700]
  } : {
    main: jt[800],
    light: jt[500],
    dark: jt[900]
  };
}
function Vf(e = "light") {
  return e === "dark" ? {
    main: un[400],
    light: un[300],
    dark: un[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: un[500],
    dark: un[900]
  };
}
function Lf(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = me(e, _f), i = e.primary || Mf(t), s = e.secondary || If(t), a = e.error || Af(t), c = e.info || Df(t), u = e.success || Ff(t), d = e.warning || Vf(t);
  function g(m) {
    const v = Yi(m, Dr.text.primary) >= n ? Dr.text.primary : Ki.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const y = Yi(m, v);
      y < 3 && console.error([`MUI: The contrast ratio of ${y}:1 for ${v} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return v;
  }
  const p = ({
    color: m,
    name: v,
    mainShade: y = 500,
    lightShade: P = 300,
    darkShade: x = 700
  }) => {
    if (m = T({}, m), !m.main && m[y] && (m.main = m[y]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.` : qt(11, v ? ` (${v})` : "", y));
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
} });` : qt(12, v ? ` (${v})` : "", JSON.stringify(m.main)));
    return Ji(m, "light", P, r), Ji(m, "dark", x, r), m.contrastText || (m.contrastText = g(m.main)), m;
  }, f = {
    dark: Dr,
    light: Ki
  };
  return process.env.NODE_ENV !== "production" && (f[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), lt(T({
    // A collection of common colors.
    common: T({}, Pn),
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
      color: a,
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
    grey: Rf,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: g,
    // Generate a rich color object.
    augmentColor: p,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, f[t]), o);
}
const Bf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function jf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Zi = {
  textTransform: "uppercase"
}, Qi = '"Roboto", "Helvetica", "Arial", sans-serif';
function zf(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Qi,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: a = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: d,
    pxToRem: g
  } = n, p = me(n, Bf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const f = o / 14, h = g || ((y) => `${y / u * f}rem`), m = (y, P, x, S, b) => T({
    fontFamily: r,
    fontWeight: y,
    fontSize: h(P),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: x
  }, r === Qi ? {
    letterSpacing: `${jf(S / P)}em`
  } : {}, b, d), v = {
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
    button: m(a, 14, 1.75, 0.4, Zi),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, Zi),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return lt(T({
    htmlFontSize: u,
    pxToRem: h,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: a,
    fontWeightBold: c
  }, v), p, {
    clone: !1
    // No need to clone deep
  });
}
const Hf = 0.2, Gf = 0.14, Uf = 0.12;
function ve(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Hf})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Gf})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Uf})`].join(",");
}
const qf = ["none", ve(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ve(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ve(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ve(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ve(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ve(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ve(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ve(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ve(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ve(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ve(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ve(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ve(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ve(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ve(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ve(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ve(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ve(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ve(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ve(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ve(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ve(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ve(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ve(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Wf = qf, Xf = ["duration", "easing", "delay"], Yf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Kf = {
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
function es(e) {
  return `${Math.round(e)}ms`;
}
function Jf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Zf(e) {
  const t = T({}, Yf, e.easing), n = T({}, Kf, e.duration);
  return T({
    getAutoHeightDuration: Jf,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: a = t.easeInOut,
        delay: c = 0
      } = i, u = me(i, Xf);
      if (process.env.NODE_ENV !== "production") {
        const d = (p) => typeof p == "string", g = (p) => !isNaN(parseFloat(p));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !g(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(a) || console.error('MUI: Argument "easing" must be a string.'), !g(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : es(s)} ${a} ${typeof c == "string" ? c : es(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Qf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, eg = Qf, tg = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function ng(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = me(e, tg);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : qt(18));
  const a = Lf(r), c = Vo(e);
  let u = lt(c, {
    mixins: Sf(c.breakpoints, n),
    palette: a,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Wf.slice(),
    typography: zf(a, i),
    transitions: Zf(o),
    zIndex: T({}, eg)
  });
  if (u = lt(u, s), u = t.reduce((d, g) => lt(d, g), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], g = (p, f) => {
      let h;
      for (h in p) {
        const m = p[h];
        if (d.indexOf(h) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const v = tt("", h);
            console.error([`MUI: The \`${f}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(p, null, 2), "", `Instead, you need to use the '&.${v}' syntax:`, JSON.stringify({
              root: {
                [`&.${v}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          p[h] = {};
        }
      }
    };
    Object.keys(u.components).forEach((p) => {
      const f = u.components[p].styleOverrides;
      f && p.indexOf("Mui") === 0 && g(f, p);
    });
  }
  return u.unstable_sxConfig = T({}, Do, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(g) {
    return Fo({
      sx: g,
      theme: this
    });
  }, u;
}
const rg = ng(), Bo = rg, jo = "$$material", ha = (e) => Yn(e) && e !== "classes", og = mf({
  themeId: jo,
  defaultTheme: Bo,
  rootShouldForwardProp: ha
}), Ne = og;
function An() {
  const e = ma(Bo);
  return process.env.NODE_ENV !== "production" && R.useDebugValue(e), e[jo] || e;
}
function ft({
  props: e,
  name: t
}) {
  return vf({
    props: e,
    name: t,
    defaultTheme: Bo,
    themeId: jo
  });
}
function ao(e, t) {
  return ao = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, ao(e, t);
}
function ig(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, ao(e, t);
}
const ts = {
  disabled: !1
};
var sg = process.env.NODE_ENV !== "production" ? l.oneOfType([l.number, l.shape({
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
const va = re.createContext(null);
var ag = function(t) {
  return t.scrollTop;
}, vn = "unmounted", Rt = "exited", kt = "entering", Gt = "entered", lo = "exiting", gt = /* @__PURE__ */ function(e) {
  ig(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, a = s && !s.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? a ? (c = Rt, i.appearStatus = kt) : c = Gt : r.unmountOnExit || r.mountOnEnter ? c = vn : c = Rt, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === vn ? {
      status: Rt
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== kt && s !== Gt && (i = kt) : (s === kt || s === Gt) && (i = lo);
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
      if (this.cancelNextCallback(), i === kt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Ln.findDOMNode(this);
          s && ag(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Rt && this.setState({
        status: vn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, a = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [a] : [Ln.findDOMNode(this), a], u = c[0], d = c[1], g = this.getTimeouts(), p = a ? g.appear : g.enter;
    if (!o && !s || ts.disabled) {
      this.safeSetState({
        status: Gt
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: kt
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(p, function() {
        i.safeSetState({
          status: Gt
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), a = this.props.nodeRef ? void 0 : Ln.findDOMNode(this);
    if (!i || ts.disabled) {
      this.safeSetState({
        status: Rt
      }, function() {
        o.props.onExited(a);
      });
      return;
    }
    this.props.onExit(a), this.safeSetState({
      status: lo
    }, function() {
      o.props.onExiting(a), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: Rt
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Ln.findDOMNode(this), a = o == null && !this.props.addEndListener;
    if (!s || a) {
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
    if (o === vn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var a = me(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ re.createElement(va.Provider, {
        value: null
      }, typeof s == "function" ? s(o, a) : re.cloneElement(re.Children.only(s), a))
    );
  }, t;
}(re.Component);
gt.contextType = va;
gt.propTypes = process.env.NODE_ENV !== "production" ? {
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
    var n = sg;
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
function zt() {
}
gt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: zt,
  onEntering: zt,
  onEntered: zt,
  onExit: zt,
  onExiting: zt,
  onExited: zt
};
gt.UNMOUNTED = vn;
gt.EXITED = Rt;
gt.ENTERING = kt;
gt.ENTERED = Gt;
gt.EXITING = lo;
const ba = gt, wa = (e) => e.scrollTop;
function ir(e, t) {
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
const lg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function co(e) {
  return `scale(${e}, ${e ** 2})`;
}
const cg = {
  entering: {
    opacity: 1,
    transform: co(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Fr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), zo = /* @__PURE__ */ R.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: a,
    onEnter: c,
    onEntered: u,
    onEntering: d,
    onExit: g,
    onExited: p,
    onExiting: f,
    style: h,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: v = ba
  } = t, y = me(t, lg), P = mn(), x = R.useRef(), S = An(), b = R.useRef(null), E = qe(b, i.ref, n), $ = (V) => (M) => {
    if (V) {
      const j = b.current;
      M === void 0 ? V(j) : V(j, M);
    }
  }, I = $(d), A = $((V, M) => {
    wa(V);
    const {
      duration: j,
      delay: ne,
      easing: te
    } = ir({
      style: h,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let O;
    m === "auto" ? (O = S.transitions.getAutoHeightDuration(V.clientHeight), x.current = O) : O = j, V.style.transition = [S.transitions.create("opacity", {
      duration: O,
      delay: ne
    }), S.transitions.create("transform", {
      duration: Fr ? O : O * 0.666,
      delay: ne,
      easing: te
    })].join(","), c && c(V, M);
  }), L = $(u), C = $(f), k = $((V) => {
    const {
      duration: M,
      delay: j,
      easing: ne
    } = ir({
      style: h,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let te;
    m === "auto" ? (te = S.transitions.getAutoHeightDuration(V.clientHeight), x.current = te) : te = M, V.style.transition = [S.transitions.create("opacity", {
      duration: te,
      delay: j
    }), S.transitions.create("transform", {
      duration: Fr ? te : te * 0.666,
      delay: Fr ? j : j || te * 0.333,
      easing: ne
    })].join(","), V.style.opacity = 0, V.style.transform = co(0.75), g && g(V);
  }), N = $(p);
  return /* @__PURE__ */ w(v, T({
    appear: o,
    in: a,
    nodeRef: b,
    onEnter: A,
    onEntered: L,
    onEntering: I,
    onExit: k,
    onExited: N,
    onExiting: C,
    addEndListener: (V) => {
      m === "auto" && P.start(x.current || 0, V), r && r(b.current, V);
    },
    timeout: m === "auto" ? null : m
  }, y, {
    children: (V, M) => /* @__PURE__ */ R.cloneElement(i, T({
      style: T({
        opacity: 0,
        transform: co(0.75),
        visibility: V === "exited" && !a ? "hidden" : void 0
      }, cg[V], h, i.props.style),
      ref: E
    }, M))
  }));
});
process.env.NODE_ENV !== "production" && (zo.propTypes = {
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
  children: On.isRequired,
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
zo.muiSupportAuto = !0;
const uo = zo, ug = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, ns = ug, dg = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], pg = Ne(ua, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ya = /* @__PURE__ */ R.forwardRef(function(t, n) {
  var r;
  const o = ga(), i = ft({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: a,
    components: c,
    componentsProps: u,
    container: d,
    disablePortal: g,
    keepMounted: p,
    modifiers: f,
    open: h,
    placement: m,
    popperOptions: v,
    popperRef: y,
    transition: P,
    slots: x,
    slotProps: S
  } = i, b = me(i, dg), E = (r = x == null ? void 0 : x.root) != null ? r : c == null ? void 0 : c.Root, $ = T({
    anchorEl: s,
    container: d,
    disablePortal: g,
    keepMounted: p,
    modifiers: f,
    open: h,
    placement: m,
    popperOptions: v,
    popperRef: y,
    transition: P
  }, b);
  return /* @__PURE__ */ w(pg, T({
    as: a,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: E
    },
    slotProps: S ?? u
  }, $, {
    ref: n
  }));
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
  anchorEl: l.oneOfType([ct, l.object, l.func]),
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
  container: l.oneOfType([ct, l.func]),
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
  popperRef: ko,
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
const xa = ya;
function fg(e) {
  return tt("MuiTooltip", e);
}
const gg = wt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ht = gg, mg = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function hg(e) {
  return Math.round(e * 1e5) / 1e5;
}
const vg = (e) => {
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
  return pt(s, fg, t);
}, bg = Ne(xa, {
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
  [`&[data-popper-placement*="bottom"] .${ht.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${ht.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${ht.arrow}`]: T({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ht.arrow}`]: T({}, t.isRtl ? {
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
})), wg = Ne("div", {
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
}) => T({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : or(e.palette.grey[700], 0.92),
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
  lineHeight: `${hg(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${ht.popper}[data-popper-placement*="left"] &`]: T({
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
  [`.${ht.popper}[data-popper-placement*="right"] &`]: T({
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
  [`.${ht.popper}[data-popper-placement*="top"] &`]: T({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${ht.popper}[data-popper-placement*="bottom"] &`]: T({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), yg = Ne("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : or(e.palette.grey[700], 0.9),
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
let Hn = !1;
const rs = new Nn();
let dn = {
  x: 0,
  y: 0
};
function Gn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Sa = /* @__PURE__ */ R.forwardRef(function(t, n) {
  var r, o, i, s, a, c, u, d, g, p, f, h, m, v, y, P, x, S, b;
  const E = ft({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: $ = !1,
    children: I,
    components: A = {},
    componentsProps: L = {},
    describeChild: C = !1,
    disableFocusListener: k = !1,
    disableHoverListener: N = !1,
    disableInteractive: B = !1,
    disableTouchListener: V = !1,
    enterDelay: M = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: ne = 700,
    followCursor: te = !1,
    id: O,
    leaveDelay: F = 0,
    leaveTouchDelay: H = 1500,
    onClose: Y,
    onOpen: z,
    open: U,
    placement: W = "bottom",
    PopperComponent: X,
    PopperProps: q = {},
    slotProps: K = {},
    slots: Q = {},
    title: ae,
    TransitionComponent: D = uo,
    TransitionProps: ee
  } = E, _ = me(E, mg), le = /* @__PURE__ */ R.isValidElement(I) ? I : /* @__PURE__ */ w("span", {
    children: I
  }), Ee = An(), $e = Ee.direction === "rtl", [xe, St] = R.useState(), [_e, nt] = R.useState(null), Fe = R.useRef(!1), rt = B || te, Re = mn(), Dt = mn(), Ct = mn(), tn = mn(), [Dn, Yo] = js({
    controlled: U,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let ot = Dn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: oe
    } = R.useRef(U !== void 0);
    R.useEffect(() => {
      xe && xe.disabled && !oe && ae !== "" && xe.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ae, xe, oe]);
  }
  const xr = Bs(O), nn = R.useRef(), Fn = En(() => {
    nn.current !== void 0 && (document.body.style.WebkitUserSelect = nn.current, nn.current = void 0), tn.clear();
  });
  R.useEffect(() => Fn, [Fn]);
  const Ko = (oe) => {
    rs.clear(), Hn = !0, Yo(!0), z && !ot && z(oe);
  }, Vn = En(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (oe) => {
      rs.start(800 + F, () => {
        Hn = !1;
      }), Yo(!1), Y && ot && Y(oe), Re.start(Ee.transitions.duration.shortest, () => {
        Fe.current = !1;
      });
    }
  ), Sr = (oe) => {
    Fe.current && oe.type !== "touchstart" || (xe && xe.removeAttribute("title"), Dt.clear(), Ct.clear(), M || Hn && j ? Dt.start(Hn ? j : M, () => {
      Ko(oe);
    }) : Ko(oe));
  }, Jo = (oe) => {
    Dt.clear(), Ct.start(F, () => {
      Vn(oe);
    });
  }, {
    isFocusVisibleRef: Zo,
    onBlur: ll,
    onFocus: cl,
    ref: ul
  } = zs(), [, Qo] = R.useState(!1), ei = (oe) => {
    ll(oe), Zo.current === !1 && (Qo(!1), Jo(oe));
  }, ti = (oe) => {
    xe || St(oe.currentTarget), cl(oe), Zo.current === !0 && (Qo(!0), Sr(oe));
  }, ni = (oe) => {
    Fe.current = !0;
    const Ve = le.props;
    Ve.onTouchStart && Ve.onTouchStart(oe);
  }, ri = Sr, oi = Jo, dl = (oe) => {
    ni(oe), Ct.clear(), Re.clear(), Fn(), nn.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", tn.start(ne, () => {
      document.body.style.WebkitUserSelect = nn.current, Sr(oe);
    });
  }, pl = (oe) => {
    le.props.onTouchEnd && le.props.onTouchEnd(oe), Fn(), Ct.start(H, () => {
      Vn(oe);
    });
  };
  R.useEffect(() => {
    if (!ot)
      return;
    function oe(Ve) {
      (Ve.key === "Escape" || Ve.key === "Esc") && Vn(Ve);
    }
    return document.addEventListener("keydown", oe), () => {
      document.removeEventListener("keydown", oe);
    };
  }, [Vn, ot]);
  const fl = qe(le.ref, ul, St, n);
  !ae && ae !== 0 && (ot = !1);
  const Cr = R.useRef(), gl = (oe) => {
    const Ve = le.props;
    Ve.onMouseMove && Ve.onMouseMove(oe), dn = {
      x: oe.clientX,
      y: oe.clientY
    }, Cr.current && Cr.current.update();
  }, rn = {}, Er = typeof ae == "string";
  C ? (rn.title = !ot && Er && !N ? ae : null, rn["aria-describedby"] = ot ? xr : null) : (rn["aria-label"] = Er ? ae : null, rn["aria-labelledby"] = ot && !Er ? xr : null);
  const He = T({}, rn, _, le.props, {
    className: Pe(_.className, le.props.className),
    onTouchStart: ni,
    ref: fl
  }, te ? {
    onMouseMove: gl
  } : {});
  process.env.NODE_ENV !== "production" && (He["data-mui-internal-clone-element"] = !0, R.useEffect(() => {
    xe && !xe.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [xe]));
  const on = {};
  V || (He.onTouchStart = dl, He.onTouchEnd = pl), N || (He.onMouseOver = Gn(ri, He.onMouseOver), He.onMouseLeave = Gn(oi, He.onMouseLeave), rt || (on.onMouseOver = ri, on.onMouseLeave = oi)), k || (He.onFocus = Gn(ti, He.onFocus), He.onBlur = Gn(ei, He.onBlur), rt || (on.onFocus = ti, on.onBlur = ei)), process.env.NODE_ENV !== "production" && le.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${le.props.title}\` or the Tooltip component.`].join(`
`));
  const ml = R.useMemo(() => {
    var oe;
    let Ve = [{
      name: "arrow",
      enabled: !!_e,
      options: {
        element: _e,
        padding: 4
      }
    }];
    return (oe = q.popperOptions) != null && oe.modifiers && (Ve = Ve.concat(q.popperOptions.modifiers)), T({}, q.popperOptions, {
      modifiers: Ve
    });
  }, [_e, q]), sn = T({}, E, {
    isRtl: $e,
    arrow: $,
    disableInteractive: rt,
    placement: W,
    PopperComponentProp: X,
    touch: Fe.current
  }), Rr = vg(sn), ii = (r = (o = Q.popper) != null ? o : A.Popper) != null ? r : bg, si = (i = (s = (a = Q.transition) != null ? a : A.Transition) != null ? s : D) != null ? i : uo, ai = (c = (u = Q.tooltip) != null ? u : A.Tooltip) != null ? c : wg, li = (d = (g = Q.arrow) != null ? g : A.Arrow) != null ? d : yg, hl = hn(ii, T({}, q, (p = K.popper) != null ? p : L.popper, {
    className: Pe(Rr.popper, q == null ? void 0 : q.className, (f = (h = K.popper) != null ? h : L.popper) == null ? void 0 : f.className)
  }), sn), vl = hn(si, T({}, ee, (m = K.transition) != null ? m : L.transition), sn), bl = hn(ai, T({}, (v = K.tooltip) != null ? v : L.tooltip, {
    className: Pe(Rr.tooltip, (y = (P = K.tooltip) != null ? P : L.tooltip) == null ? void 0 : y.className)
  }), sn), wl = hn(li, T({}, (x = K.arrow) != null ? x : L.arrow, {
    className: Pe(Rr.arrow, (S = (b = K.arrow) != null ? b : L.arrow) == null ? void 0 : S.className)
  }), sn);
  return /* @__PURE__ */ ie(R.Fragment, {
    children: [/* @__PURE__ */ R.cloneElement(le, He), /* @__PURE__ */ w(ii, T({
      as: X ?? xa,
      placement: W,
      anchorEl: te ? {
        getBoundingClientRect: () => ({
          top: dn.y,
          left: dn.x,
          right: dn.x,
          bottom: dn.y,
          width: 0,
          height: 0
        })
      } : xe,
      popperRef: Cr,
      open: xe ? ot : !1,
      id: xr,
      transition: !0
    }, on, hl, {
      popperOptions: ml,
      children: ({
        TransitionProps: oe
      }) => /* @__PURE__ */ w(si, T({
        timeout: Ee.transitions.duration.shorter
      }, oe, vl, {
        children: /* @__PURE__ */ ie(ai, T({}, bl, {
          children: [ae, $ ? /* @__PURE__ */ w(li, T({}, wl, {
            ref: nt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Sa.propTypes = {
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
  children: On.isRequired,
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
const xg = Sa;
var Ho = {}, Ca = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ca);
var Sg = Ca.exports, Vr = {};
function Cg(e) {
  return tt("MuiSvgIcon", e);
}
wt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Eg = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Rg = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Qe(t)}`, `fontSize${Qe(n)}`]
  };
  return pt(o, Cg, r);
}, kg = Ne("svg", {
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
  var n, r, o, i, s, a, c, u, d, g, p, f, h;
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
      medium: ((a = e.typography) == null || (c = a.pxToRem) == null ? void 0 : c.call(a, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (d = u.pxToRem) == null ? void 0 : d.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (g = (p = (e.vars || e).palette) == null || (p = p[t.color]) == null ? void 0 : p.main) != null ? g : {
      action: (f = (e.vars || e).palette) == null || (f = f.action) == null ? void 0 : f.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Go = /* @__PURE__ */ R.forwardRef(function(t, n) {
  const r = ft({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: a = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: d = !1,
    titleAccess: g,
    viewBox: p = "0 0 24 24"
  } = r, f = me(r, Eg), h = /* @__PURE__ */ R.isValidElement(o) && o.type === "svg", m = T({}, r, {
    color: s,
    component: a,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: p,
    hasSvgAsChild: h
  }), v = {};
  d || (v.viewBox = p);
  const y = Rg(m);
  return /* @__PURE__ */ ie(kg, T({
    as: a,
    className: Pe(y.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": g ? void 0 : !0,
    role: g ? "img" : void 0,
    ref: n
  }, v, f, h && o.props, {
    ownerState: m,
    children: [h ? o.props.children : o, g ? /* @__PURE__ */ w("title", {
      children: g
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Go.propTypes = {
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
Go.muiName = "SvgIcon";
const os = Go;
function Ea(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ w(os, T({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = os.muiName, /* @__PURE__ */ R.memo(/* @__PURE__ */ R.forwardRef(n));
}
const Tg = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Xs.configure(e);
  }
}, Pg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Qe,
  createChainedFunction: no,
  createSvgIcon: Ea,
  debounce: Ls,
  deprecatedPropType: eu,
  isMuiElement: tu,
  ownerDocument: Oe,
  ownerWindow: Wt,
  requirePropFactory: nu,
  setRef: Qn,
  unstable_ClassNameGenerator: Tg,
  unstable_useEnhancedEffect: _t,
  unstable_useId: Bs,
  unsupportedProp: iu,
  useControlled: js,
  useEventCallback: En,
  useForkRef: qe,
  useIsFocusVisible: zs
}, Symbol.toStringTag, { value: "Module" })), Og = /* @__PURE__ */ Mc(Pg);
var is;
function Ng() {
  return is || (is = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Og;
  }(Vr)), Vr;
}
var $g = Sg;
Object.defineProperty(Ho, "__esModule", {
  value: !0
});
var Ra = Ho.default = void 0, _g = $g(Ng()), Mg = yl;
Ra = Ho.default = (0, _g.default)(/* @__PURE__ */ (0, Mg.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function ss(e, t, n) {
  return e ? /* @__PURE__ */ w(bs, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ w("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function ka(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: i = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: a = !1,
    className: c,
    isDisabled: u = !1,
    isDense: d = !0,
    isSubMenuParent: g = !1,
    hasDisabledGutters: p = !1,
    hasDivider: f = !1,
    focusVisibleClassName: h,
    id: m,
    children: v
  } = e, y = /* @__PURE__ */ w(
    Vl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: a,
      className: c,
      disabled: u,
      dense: d,
      disableGutters: p,
      divider: f,
      focusVisibleClassName: h,
      onClick: t,
      id: m,
      children: n ? /* @__PURE__ */ ie(ar, { children: [
        ss(i, n, !0),
        /* @__PURE__ */ w(Ll, { primary: n, inset: !i && o }),
        g ? /* @__PURE__ */ w(bs, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ w(Ra, {}) }) : ss(s, n, !1)
      ] }) : v
    }
  );
  return r ? /* @__PURE__ */ w(xg, { title: r, placement: "right", children: /* @__PURE__ */ w("div", { children: y }) }) : y;
}
function Ta(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Ig(e) {
  const [t, n] = Ce(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (u) => {
    n(u.currentTarget);
  }, a = () => {
    n(void 0);
  }, c = () => {
    let u = Ta(i).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ w(Uo, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ ie(ar, { children: [
    /* @__PURE__ */ w(ka, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ w(
      Bl,
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
        children: c()
      },
      r.id
    )
  ] });
}
const Ag = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function Uo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = Zt(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ta(t).filter((h) => !("menuItem" in h.group))
    ), g = Object.values(d).sort(
      (h, m) => (h.group.order || 0) - (m.group.order || 0)
    ), p = [];
    g.forEach((h) => {
      Ag(h.id, t.items).forEach(
        (m) => p.push({ item: m, isLastItemInGroup: !1 })
      ), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !0);
    }), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !1);
    const f = p.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: p, allowForLeadingIcons: f };
  }, [o, t]), a = ({ item: d, isLastItemInGroup: g }) => ({
    className: "papi-menu-item",
    label: d.label,
    tooltip: d.tooltip,
    iconPathBefore: "iconPathBefore" in d ? d.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in d ? d.iconPathAfter : void 0,
    hasDivider: g,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ w("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ w("div", { role: "menu", "aria-label": u, children: i.map((d, g) => {
    const { item: p } = d, f = a(d);
    if ("command" in p) {
      const h = p.group + g;
      return /* @__PURE__ */ w(
        ka,
        {
          onClick: (m) => {
            n == null || n(m), r(p);
          },
          ...f
        },
        h
      );
    }
    return /* @__PURE__ */ w(
      Ig,
      {
        parentMenuItem: p,
        parentItemProps: f,
        ...e
      },
      u + p.id
    );
  }) }, u);
}
function Dg(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, a]) => ({ id: s, group: a })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ w(Uo, { ...e, includedGroups: i });
}
function Fg({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ ie(
    ws,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ w("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ w(jl, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ w(
          Dg,
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
function Vg({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = Zt(() => {
    const s = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((a) => {
      if (a === "isExtensible")
        return;
      const c = a, u = o[c];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) ? s.set(u.order, { id: c, metadata: u }) : console.warn(
        `Property ${a} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((a, c) => (a.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ w(
    ws,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, a) => /* @__PURE__ */ w(
        Fg,
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
const Pa = /* @__PURE__ */ R.createContext({});
process.env.NODE_ENV !== "production" && (Pa.displayName = "ListContext");
const Lg = Pa;
function Bg(e) {
  return tt("MuiList", e);
}
wt("MuiList", ["root", "padding", "dense", "subheader"]);
const jg = ["children", "className", "component", "dense", "disablePadding", "subheader"], zg = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return pt({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Bg, t);
}, Hg = Ne("ul", {
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
})), Oa = /* @__PURE__ */ R.forwardRef(function(t, n) {
  const r = ft({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: a = !1,
    disablePadding: c = !1,
    subheader: u
  } = r, d = me(r, jg), g = R.useMemo(() => ({
    dense: a
  }), [a]), p = T({}, r, {
    component: s,
    dense: a,
    disablePadding: c
  }), f = zg(p);
  return /* @__PURE__ */ w(Lg.Provider, {
    value: g,
    children: /* @__PURE__ */ ie(Hg, T({
      as: s,
      className: Pe(f.root, i),
      ref: n,
      ownerState: p
    }, d, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Oa.propTypes = {
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
const Gg = Oa, Ug = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Lr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function as(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Na(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function pn(e, t, n, r, o, i) {
  let s = !1, a = o(e, t, t ? n : !1);
  for (; a; ) {
    if (a === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const c = r ? !1 : a.disabled || a.getAttribute("aria-disabled") === "true";
    if (!a.hasAttribute("tabindex") || !Na(a, i) || c)
      a = o(e, a, n);
    else
      return a.focus(), !0;
  }
  return !1;
}
const $a = /* @__PURE__ */ R.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: s,
    className: a,
    disabledItemsFocusable: c = !1,
    disableListWrap: u = !1,
    onKeyDown: d,
    variant: g = "selectedMenu"
  } = t, p = me(t, Ug), f = R.useRef(null), h = R.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  _t(() => {
    o && f.current.focus();
  }, [o]), R.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (x, S) => {
      const b = !f.current.style.width;
      if (x.clientHeight < f.current.clientHeight && b) {
        const E = `${Hs(Oe(x))}px`;
        f.current.style[S.direction === "rtl" ? "paddingLeft" : "paddingRight"] = E, f.current.style.width = `calc(100% + ${E})`;
      }
      return f.current;
    }
  }), []);
  const m = (x) => {
    const S = f.current, b = x.key, E = Oe(S).activeElement;
    if (b === "ArrowDown")
      x.preventDefault(), pn(S, E, u, c, Lr);
    else if (b === "ArrowUp")
      x.preventDefault(), pn(S, E, u, c, as);
    else if (b === "Home")
      x.preventDefault(), pn(S, null, u, c, Lr);
    else if (b === "End")
      x.preventDefault(), pn(S, null, u, c, as);
    else if (b.length === 1) {
      const $ = h.current, I = b.toLowerCase(), A = performance.now();
      $.keys.length > 0 && (A - $.lastTime > 500 ? ($.keys = [], $.repeating = !0, $.previousKeyMatched = !0) : $.repeating && I !== $.keys[0] && ($.repeating = !1)), $.lastTime = A, $.keys.push(I);
      const L = E && !$.repeating && Na(E, $);
      $.previousKeyMatched && (L || pn(S, E, !1, c, Lr, $)) ? x.preventDefault() : $.previousKeyMatched = !1;
    }
    d && d(x);
  }, v = qe(f, n);
  let y = -1;
  R.Children.forEach(s, (x, S) => {
    if (!/* @__PURE__ */ R.isValidElement(x)) {
      y === S && (y += 1, y >= s.length && (y = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Zn.isFragment(x) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), x.props.disabled || (g === "selectedMenu" && x.props.selected || y === -1) && (y = S), y === S && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (y += 1, y >= s.length && (y = -1));
  });
  const P = R.Children.map(s, (x, S) => {
    if (S === y) {
      const b = {};
      return i && (b.autoFocus = !0), x.props.tabIndex === void 0 && g === "selectedMenu" && (b.tabIndex = 0), /* @__PURE__ */ R.cloneElement(x, b);
    }
    return x;
  });
  return /* @__PURE__ */ w(Gg, T({
    role: "menu",
    ref: v,
    className: a,
    onKeyDown: m,
    tabIndex: o ? 0 : -1
  }, p, {
    children: P
  }));
});
process.env.NODE_ENV !== "production" && ($a.propTypes = {
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
const qg = $a, Wg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Xg = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, _a = /* @__PURE__ */ R.forwardRef(function(t, n) {
  const r = An(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: a,
    easing: c,
    in: u,
    onEnter: d,
    onEntered: g,
    onEntering: p,
    onExit: f,
    onExited: h,
    onExiting: m,
    style: v,
    timeout: y = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: P = ba
  } = t, x = me(t, Wg), S = R.useRef(null), b = qe(S, a.ref, n), E = (B) => (V) => {
    if (B) {
      const M = S.current;
      V === void 0 ? B(M) : B(M, V);
    }
  }, $ = E(p), I = E((B, V) => {
    wa(B);
    const M = ir({
      style: v,
      timeout: y,
      easing: c
    }, {
      mode: "enter"
    });
    B.style.webkitTransition = r.transitions.create("opacity", M), B.style.transition = r.transitions.create("opacity", M), d && d(B, V);
  }), A = E(g), L = E(m), C = E((B) => {
    const V = ir({
      style: v,
      timeout: y,
      easing: c
    }, {
      mode: "exit"
    });
    B.style.webkitTransition = r.transitions.create("opacity", V), B.style.transition = r.transitions.create("opacity", V), f && f(B);
  }), k = E(h);
  return /* @__PURE__ */ w(P, T({
    appear: s,
    in: u,
    nodeRef: S,
    onEnter: I,
    onEntered: A,
    onEntering: $,
    onExit: C,
    onExited: k,
    onExiting: L,
    addEndListener: (B) => {
      i && i(S.current, B);
    },
    timeout: y
  }, x, {
    children: (B, V) => /* @__PURE__ */ R.cloneElement(a, T({
      style: T({
        opacity: 0,
        visibility: B === "exited" && !u ? "hidden" : void 0
      }, Xg[B], v, a.props.style),
      ref: b
    }, V))
  }));
});
process.env.NODE_ENV !== "production" && (_a.propTypes = {
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
  children: On.isRequired,
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
const Yg = _a;
function Kg(e) {
  return tt("MuiBackdrop", e);
}
wt("MuiBackdrop", ["root", "invisible"]);
const Jg = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Zg = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return pt({
    root: ["root", n && "invisible"]
  }, Kg, t);
}, Qg = Ne("div", {
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
})), Ma = /* @__PURE__ */ R.forwardRef(function(t, n) {
  var r, o, i;
  const s = ft({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: a,
    className: c,
    component: u = "div",
    components: d = {},
    componentsProps: g = {},
    invisible: p = !1,
    open: f,
    slotProps: h = {},
    slots: m = {},
    TransitionComponent: v = Yg,
    transitionDuration: y
  } = s, P = me(s, Jg), x = T({}, s, {
    component: u,
    invisible: p
  }), S = Zg(x), b = (r = h.root) != null ? r : g.root;
  return /* @__PURE__ */ w(v, T({
    in: f,
    timeout: y
  }, P, {
    children: /* @__PURE__ */ w(Qg, T({
      "aria-hidden": !0
    }, b, {
      as: (o = (i = m.root) != null ? i : d.Root) != null ? o : u,
      className: Pe(S.root, c, b == null ? void 0 : b.className),
      ownerState: T({}, x, b == null ? void 0 : b.ownerState),
      classes: S,
      ref: n,
      children: a
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ma.propTypes = {
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
const em = Ma;
function tm(e) {
  return tt("MuiModal", e);
}
wt("MuiModal", ["root", "hidden", "backdrop"]);
const nm = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], rm = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return pt({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, tm, r);
}, om = Ne("div", {
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
})), im = Ne(em, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Ia = /* @__PURE__ */ R.forwardRef(function(t, n) {
  var r, o, i, s, a, c;
  const u = ft({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = im,
    BackdropProps: g,
    className: p,
    closeAfterTransition: f = !1,
    children: h,
    container: m,
    component: v,
    components: y = {},
    componentsProps: P = {},
    disableAutoFocus: x = !1,
    disableEnforceFocus: S = !1,
    disableEscapeKeyDown: b = !1,
    disablePortal: E = !1,
    disableRestoreFocus: $ = !1,
    disableScrollLock: I = !1,
    hideBackdrop: A = !1,
    keepMounted: L = !1,
    onBackdropClick: C,
    open: k,
    slotProps: N,
    slots: B
    // eslint-disable-next-line react/prop-types
  } = u, V = me(u, nm), M = T({}, u, {
    closeAfterTransition: f,
    disableAutoFocus: x,
    disableEnforceFocus: S,
    disableEscapeKeyDown: b,
    disablePortal: E,
    disableRestoreFocus: $,
    disableScrollLock: I,
    hideBackdrop: A,
    keepMounted: L
  }), {
    getRootProps: j,
    getBackdropProps: ne,
    getTransitionProps: te,
    portalRef: O,
    isTopModal: F,
    exited: H,
    hasTransition: Y
  } = qu(T({}, M, {
    rootRef: n
  })), z = T({}, M, {
    exited: H
  }), U = rm(z), W = {};
  if (h.props.tabIndex === void 0 && (W.tabIndex = "-1"), Y) {
    const {
      onEnter: ee,
      onExited: _
    } = te();
    W.onEnter = ee, W.onExited = _;
  }
  const X = (r = (o = B == null ? void 0 : B.root) != null ? o : y.Root) != null ? r : om, q = (i = (s = B == null ? void 0 : B.backdrop) != null ? s : y.Backdrop) != null ? i : d, K = (a = N == null ? void 0 : N.root) != null ? a : P.root, Q = (c = N == null ? void 0 : N.backdrop) != null ? c : P.backdrop, ae = Mt({
    elementType: X,
    externalSlotProps: K,
    externalForwardedProps: V,
    getSlotProps: j,
    additionalProps: {
      ref: n,
      as: v
    },
    ownerState: z,
    className: Pe(p, K == null ? void 0 : K.className, U == null ? void 0 : U.root, !z.open && z.exited && (U == null ? void 0 : U.hidden))
  }), D = Mt({
    elementType: q,
    externalSlotProps: Q,
    additionalProps: g,
    getSlotProps: (ee) => ne(T({}, ee, {
      onClick: (_) => {
        C && C(_), ee != null && ee.onClick && ee.onClick(_);
      }
    })),
    className: Pe(Q == null ? void 0 : Q.className, g == null ? void 0 : g.className, U == null ? void 0 : U.backdrop),
    ownerState: z
  });
  return !L && !k && (!Y || H) ? null : /* @__PURE__ */ w(Rn, {
    ref: O,
    container: m,
    disablePortal: E,
    children: /* @__PURE__ */ ie(X, T({}, ae, {
      children: [!A && d ? /* @__PURE__ */ w(q, T({}, D)) : null, /* @__PURE__ */ w(er, {
        disableEnforceFocus: S,
        disableAutoFocus: x,
        disableRestoreFocus: $,
        isEnabled: F,
        open: k,
        children: /* @__PURE__ */ R.cloneElement(h, W)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ia.propTypes = {
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
  children: On.isRequired,
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
  container: l.oneOfType([ct, l.func]),
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
const sm = Ia;
function am(e) {
  return tt("MuiPaper", e);
}
wt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const lm = ["className", "component", "elevation", "square", "variant"], cm = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return pt(i, am, o);
}, um = Ne("div", {
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
    backgroundImage: `linear-gradient(${or("#fff", ns(t.elevation))}, ${or("#fff", ns(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Aa = /* @__PURE__ */ R.forwardRef(function(t, n) {
  const r = ft({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: a = !1,
    variant: c = "elevation"
  } = r, u = me(r, lm), d = T({}, r, {
    component: i,
    elevation: s,
    square: a,
    variant: c
  }), g = cm(d);
  return process.env.NODE_ENV !== "production" && An().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ w(um, T({
    as: i,
    ownerState: d,
    className: Pe(g.root, o),
    ref: n
  }, u));
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
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: en(qs, (e) => {
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
const dm = Aa;
function pm(e) {
  return tt("MuiPopover", e);
}
wt("MuiPopover", ["root", "paper"]);
const fm = ["onEntering"], gm = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], mm = ["slotProps"];
function ls(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function cs(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function us(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Jn(e) {
  return typeof e == "function" ? e() : e;
}
const hm = (e) => {
  const {
    classes: t
  } = e;
  return pt({
    root: ["root"],
    paper: ["paper"]
  }, pm, t);
}, vm = Ne(sm, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Da = Ne(dm, {
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
}), Fa = /* @__PURE__ */ R.forwardRef(function(t, n) {
  var r, o, i;
  const s = ft({
    props: t,
    name: "MuiPopover"
  }), {
    action: a,
    anchorEl: c,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: d,
    anchorReference: g = "anchorEl",
    children: p,
    className: f,
    container: h,
    elevation: m = 8,
    marginThreshold: v = 16,
    open: y,
    PaperProps: P = {},
    slots: x,
    slotProps: S,
    transformOrigin: b = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: E = uo,
    transitionDuration: $ = "auto",
    TransitionProps: {
      onEntering: I
    } = {},
    disableScrollLock: A = !1
  } = s, L = me(s.TransitionProps, fm), C = me(s, gm), k = (r = S == null ? void 0 : S.paper) != null ? r : P, N = R.useRef(), B = qe(N, k.ref), V = T({}, s, {
    anchorOrigin: u,
    anchorReference: g,
    elevation: m,
    marginThreshold: v,
    externalPaperSlotProps: k,
    transformOrigin: b,
    TransitionComponent: E,
    transitionDuration: $,
    TransitionProps: L
  }), M = hm(V), j = R.useCallback(() => {
    if (g === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const ee = Jn(c), _ = ee && ee.nodeType === 1 ? ee : Oe(N.current).body, le = _.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Ee = _.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Ee.top === 0 && Ee.left === 0 && Ee.right === 0 && Ee.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: le.top + ls(le, u.vertical),
      left: le.left + cs(le, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, d, g]), ne = R.useCallback((ee) => ({
    vertical: ls(ee, b.vertical),
    horizontal: cs(ee, b.horizontal)
  }), [b.horizontal, b.vertical]), te = R.useCallback((ee) => {
    const _ = {
      width: ee.offsetWidth,
      height: ee.offsetHeight
    }, le = ne(_);
    if (g === "none")
      return {
        top: null,
        left: null,
        transformOrigin: us(le)
      };
    const Ee = j();
    let $e = Ee.top - le.vertical, xe = Ee.left - le.horizontal;
    const St = $e + _.height, _e = xe + _.width, nt = Wt(Jn(c)), Fe = nt.innerHeight - v, rt = nt.innerWidth - v;
    if (v !== null && $e < v) {
      const Re = $e - v;
      $e -= Re, le.vertical += Re;
    } else if (v !== null && St > Fe) {
      const Re = St - Fe;
      $e -= Re, le.vertical += Re;
    }
    if (process.env.NODE_ENV !== "production" && _.height > Fe && _.height && Fe && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${_.height - Fe}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), v !== null && xe < v) {
      const Re = xe - v;
      xe -= Re, le.horizontal += Re;
    } else if (_e > rt) {
      const Re = _e - rt;
      xe -= Re, le.horizontal += Re;
    }
    return {
      top: `${Math.round($e)}px`,
      left: `${Math.round(xe)}px`,
      transformOrigin: us(le)
    };
  }, [c, g, j, ne, v]), [O, F] = R.useState(y), H = R.useCallback(() => {
    const ee = N.current;
    if (!ee)
      return;
    const _ = te(ee);
    _.top !== null && (ee.style.top = _.top), _.left !== null && (ee.style.left = _.left), ee.style.transformOrigin = _.transformOrigin, F(!0);
  }, [te]);
  R.useEffect(() => (A && window.addEventListener("scroll", H), () => window.removeEventListener("scroll", H)), [c, A, H]);
  const Y = (ee, _) => {
    I && I(ee, _), H();
  }, z = () => {
    F(!1);
  };
  R.useEffect(() => {
    y && H();
  }), R.useImperativeHandle(a, () => y ? {
    updatePosition: () => {
      H();
    }
  } : null, [y, H]), R.useEffect(() => {
    if (!y)
      return;
    const ee = Ls(() => {
      H();
    }), _ = Wt(c);
    return _.addEventListener("resize", ee), () => {
      ee.clear(), _.removeEventListener("resize", ee);
    };
  }, [c, y, H]);
  let U = $;
  $ === "auto" && !E.muiSupportAuto && (U = void 0);
  const W = h || (c ? Oe(Jn(c)).body : void 0), X = (o = x == null ? void 0 : x.root) != null ? o : vm, q = (i = x == null ? void 0 : x.paper) != null ? i : Da, K = Mt({
    elementType: q,
    externalSlotProps: T({}, k, {
      style: O ? k.style : T({}, k.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: m,
      ref: B
    },
    ownerState: V,
    className: Pe(M.paper, k == null ? void 0 : k.className)
  }), Q = Mt({
    elementType: X,
    externalSlotProps: (S == null ? void 0 : S.root) || {},
    externalForwardedProps: C,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: W,
      open: y
    },
    ownerState: V,
    className: Pe(M.root, f)
  }), {
    slotProps: ae
  } = Q, D = me(Q, mm);
  return /* @__PURE__ */ w(X, T({}, D, !Ks(X) && {
    slotProps: ae,
    disableScrollLock: A
  }, {
    children: /* @__PURE__ */ w(E, T({
      appear: !0,
      in: y,
      onEntering: Y,
      onExited: z,
      timeout: U
    }, L, {
      children: /* @__PURE__ */ w(q, T({}, K, {
        children: p
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Fa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: ko,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: en(l.oneOfType([ct, l.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Jn(e.anchorEl);
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
  container: l.oneOfType([ct, l.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: l.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: qs,
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
    component: qc
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
const bm = Fa;
function wm(e) {
  return tt("MuiMenu", e);
}
wt("MuiMenu", ["root", "paper", "list"]);
const ym = ["onEntering"], xm = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Sm = {
  vertical: "top",
  horizontal: "right"
}, Cm = {
  vertical: "top",
  horizontal: "left"
}, Em = (e) => {
  const {
    classes: t
  } = e;
  return pt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, wm, t);
}, Rm = Ne(bm, {
  shouldForwardProp: (e) => ha(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), km = Ne(Da, {
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
}), Tm = Ne(qg, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Va = /* @__PURE__ */ R.forwardRef(function(t, n) {
  var r, o;
  const i = ft({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: a,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: d = {},
    onClose: g,
    open: p,
    PaperProps: f = {},
    PopoverClasses: h,
    transitionDuration: m = "auto",
    TransitionProps: {
      onEntering: v
    } = {},
    variant: y = "selectedMenu",
    slots: P = {},
    slotProps: x = {}
  } = i, S = me(i.TransitionProps, ym), b = me(i, xm), E = An(), $ = E.direction === "rtl", I = T({}, i, {
    autoFocus: s,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: v,
    PaperProps: f,
    transitionDuration: m,
    TransitionProps: S,
    variant: y
  }), A = Em(I), L = s && !u && p, C = R.useRef(null), k = (te, O) => {
    C.current && C.current.adjustStyleForScrollbar(te, E), v && v(te, O);
  }, N = (te) => {
    te.key === "Tab" && (te.preventDefault(), g && g(te, "tabKeyDown"));
  };
  let B = -1;
  R.Children.map(a, (te, O) => {
    /* @__PURE__ */ R.isValidElement(te) && (process.env.NODE_ENV !== "production" && Zn.isFragment(te) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), te.props.disabled || (y === "selectedMenu" && te.props.selected || B === -1) && (B = O));
  });
  const V = (r = P.paper) != null ? r : km, M = (o = x.paper) != null ? o : f, j = Mt({
    elementType: P.root,
    externalSlotProps: x.root,
    ownerState: I,
    className: [A.root, c]
  }), ne = Mt({
    elementType: V,
    externalSlotProps: M,
    ownerState: I,
    className: A.paper
  });
  return /* @__PURE__ */ w(Rm, T({
    onClose: g,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: $ ? "right" : "left"
    },
    transformOrigin: $ ? Sm : Cm,
    slots: {
      paper: V,
      root: P.root
    },
    slotProps: {
      root: j,
      paper: ne
    },
    open: p,
    ref: n,
    transitionDuration: m,
    TransitionProps: T({
      onEntering: k
    }, S),
    ownerState: I
  }, b, {
    classes: h,
    children: /* @__PURE__ */ w(Tm, T({
      onKeyDown: N,
      actions: C,
      autoFocus: s && (B === -1 || u),
      autoFocusItem: L,
      variant: y
    }, d, {
      className: Pe(A.list, d.className),
      children: a
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Va.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: l.oneOfType([ct, l.func]),
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
const Pm = Va;
function Rv({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = re.useState(void 0), s = Te(
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
  ), a = Te(() => {
    i(void 0);
  }, []), c = Zt(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = n == null ? void 0 : n.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ ie(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ w(
          Pm,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: a,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ w(
              Uo,
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
const Om = Ea(/* @__PURE__ */ w("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Nm(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const po = (e, t, n = {}) => {
  const r = Ot(t);
  r.current = t;
  const o = Ot(n);
  o.current = Nm(o.current);
  const [i, s] = Ce(() => r.current), [a, c] = Ce(!0);
  return at(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const d = await e();
        u && (s(() => d), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [i, a];
};
function $m({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: a
}) {
  const [c, u] = Ce(!1), [d, g] = Ce(!1), p = Te(() => {
    c && u(!1), g(!1);
  }, [c]), f = Te((S) => {
    S.stopPropagation(), u((b) => {
      const E = !b;
      return E && S.shiftKey ? g(!0) : E || g(!1), E;
    });
  }, []), h = Te(
    (S) => (p(), r(S)),
    [r, p]
  ), [m, v] = Ce({ top: 1, left: 1 });
  at(() => {
    if (c) {
      const S = o == null ? void 0 : o.current;
      if (S) {
        const b = S.getBoundingClientRect(), E = window.scrollY, $ = window.scrollX, I = b.top + E + S.clientHeight, A = b.left + $;
        v({ top: I, left: A });
      }
    }
  }, [c, o]);
  const [y] = po(
    Te(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [P] = po(
    Te(async () => (e == null ? void 0 : e(!0)) ?? n ?? y, [e, n, y, c]),
    n ?? y
  ), x = d && P ? P : y;
  return /* @__PURE__ */ ie(ar, { children: [
    /* @__PURE__ */ w(
      ys,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${i ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: f,
        children: a ?? /* @__PURE__ */ w(Om, {})
      }
    ),
    /* @__PURE__ */ w(
      zl,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: p,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: m.top,
            left: m.left
          }
        },
        children: x ? /* @__PURE__ */ w(
          Vg,
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
function kv({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: s = "medium",
  className: a,
  onClick: c,
  children: u
}) {
  return /* @__PURE__ */ w(
    ys,
    {
      id: e,
      disabled: n,
      edge: i,
      size: s,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${a ?? ""}`,
      onClick: c,
      children: u
    }
  );
}
const _m = wo(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), La = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(xs.Root, { ref: n, className: G(_m(), e), ...t }));
La.displayName = xs.Root.displayName;
function sr({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: i,
  placeholder: s,
  isRequired: a = !1,
  className: c,
  defaultValue: u,
  value: d,
  onChange: g,
  onFocus: p,
  onBlur: f
}) {
  return /* @__PURE__ */ ie("div", { className: G("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ w(
      La,
      {
        htmlFor: e,
        className: G({
          "pr-text-red-600": n,
          "pr-hidden": !i
        }),
        children: `${i}${a ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ w(
      Eo,
      {
        id: e,
        disabled: t,
        placeholder: s,
        required: a,
        className: G(c, { "pr-border-red-600": n }),
        defaultValue: u,
        value: d,
        onChange: g,
        onFocus: p,
        onBlur: f
      }
    ),
    /* @__PURE__ */ w("p", { className: G({ "pr-hidden": !o }), children: o })
  ] });
}
let Br;
const jr = () => (Br || (Br = ue.allBookIds.map((e) => ({
  bookId: e,
  label: ue.bookIdToEnglishName(e)
}))), Br);
function Tv({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c, u) => {
    const g = { bookNum: ue.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(g);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, s = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, a = Zt(() => jr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ ie("span", { id: n, className: "pr-flex pr-place-items-center", children: [
    /* @__PURE__ */ w(
      Qr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: a,
        options: jr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ w(
      st,
      {
        onClick: () => r(ui(e, -1)),
        disabled: e.bookNum <= xl,
        children: "<"
      }
    ),
    /* @__PURE__ */ w(
      st,
      {
        onClick: () => r(ui(e, 1)),
        disabled: e.bookNum >= jr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ w(
      sr,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ w(
      st,
      {
        onClick: () => t(di(e, -1)),
        disabled: e.chapterNum <= Sl,
        children: "<"
      }
    ),
    /* @__PURE__ */ w(
      st,
      {
        onClick: () => t(di(e, 1)),
        disabled: e.chapterNum >= ms(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ w(
      sr,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ w(
      st,
      {
        onClick: () => t(pi(e, -1)),
        disabled: e.verseNum <= Cl,
        children: "<"
      }
    ),
    /* @__PURE__ */ w(st, { onClick: () => t(pi(e, 1)), children: ">" })
  ] });
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
function vt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ze(e, t) {
  return (n) => {
    t.setState((r) => ({
      ...r,
      [e]: vt(n, r[e])
    }));
  };
}
function yr(e) {
  return e instanceof Function;
}
function Mm(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function Ba(e, t) {
  const n = [], r = (o) => {
    o.forEach((i) => {
      n.push(i);
      const s = t(i);
      s != null && s.length && r(s);
    });
  };
  return r(e), n;
}
function J(e, t, n) {
  let r = [], o;
  return (i) => {
    let s;
    n.key && n.debug && (s = Date.now());
    const a = e(i);
    if (!(a.length !== r.length || a.some((d, g) => r[g] !== d)))
      return o;
    r = a;
    let u;
    if (n.key && n.debug && (u = Date.now()), o = t(...a), n == null || n.onChange == null || n.onChange(o), n.key && n.debug && n != null && n.debug()) {
      const d = Math.round((Date.now() - s) * 100) / 100, g = Math.round((Date.now() - u) * 100) / 100, p = g / 16, f = (h, m) => {
        for (h = String(h); h.length < m; )
          h = " " + h;
        return h;
      };
      console.info(`%c⏱ ${f(g, 5)} /${f(d, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * p, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
    }
    return o;
  };
}
function Z(e, t, n, r) {
  return {
    debug: () => {
      var o;
      return (o = e == null ? void 0 : e.debugAll) != null ? o : e[t];
    },
    key: process.env.NODE_ENV === "development" && n,
    onChange: r
  };
}
function Im(e, t, n, r) {
  const o = () => {
    var s;
    return (s = i.getValue()) != null ? s : e.options.renderFallbackValue;
  }, i = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: o,
    getContext: J(() => [e, n, t, i], (s, a, c, u) => ({
      table: s,
      column: a,
      row: c,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), Z(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((s) => {
    s.createCell == null || s.createCell(i, n, t, e);
  }, {}), i;
}
function Am(e, t, n, r) {
  var o, i;
  const a = {
    ...e._getDefaultColumnDef(),
    ...t
  }, c = a.accessorKey;
  let u = (o = (i = a.id) != null ? i : c ? c.replace(".", "_") : void 0) != null ? o : typeof a.header == "string" ? a.header : void 0, d;
  if (a.accessorFn ? d = a.accessorFn : c && (c.includes(".") ? d = (p) => {
    let f = p;
    for (const m of c.split(".")) {
      var h;
      f = (h = f) == null ? void 0 : h[m], process.env.NODE_ENV !== "production" && f === void 0 && console.warn(`"${m}" in deeply nested key "${c}" returned undefined.`);
    }
    return f;
  } : d = (p) => p[a.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(a.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let g = {
    id: `${String(u)}`,
    accessorFn: d,
    parent: r,
    depth: n,
    columnDef: a,
    columns: [],
    getFlatColumns: J(() => [!0], () => {
      var p;
      return [g, ...(p = g.columns) == null ? void 0 : p.flatMap((f) => f.getFlatColumns())];
    }, Z(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: J(() => [e._getOrderColumnsFn()], (p) => {
      var f;
      if ((f = g.columns) != null && f.length) {
        let h = g.columns.flatMap((m) => m.getLeafColumns());
        return p(h);
      }
      return [g];
    }, Z(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const p of e._features)
    p.createColumn == null || p.createColumn(g, e);
  return g;
}
const ke = "debugHeaders";
function ds(e, t, n) {
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
      const s = [], a = (c) => {
        c.subHeaders && c.subHeaders.length && c.subHeaders.map(a), s.push(c);
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
const Dm = {
  createTable: (e) => {
    e.getHeaderGroups = J(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, s;
      const a = (i = r == null ? void 0 : r.map((g) => n.find((p) => p.id === g)).filter(Boolean)) != null ? i : [], c = (s = o == null ? void 0 : o.map((g) => n.find((p) => p.id === g)).filter(Boolean)) != null ? s : [], u = n.filter((g) => !(r != null && r.includes(g.id)) && !(o != null && o.includes(g.id)));
      return Un(t, [...a, ...u, ...c], e);
    }, Z(e.options, ke, "getHeaderGroups")), e.getCenterHeaderGroups = J(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), Un(t, n, e, "center")), Z(e.options, ke, "getCenterHeaderGroups")), e.getLeftHeaderGroups = J(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return Un(t, i, e, "left");
    }, Z(e.options, ke, "getLeftHeaderGroups")), e.getRightHeaderGroups = J(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return Un(t, i, e, "right");
    }, Z(e.options, ke, "getRightHeaderGroups")), e.getFooterGroups = J(() => [e.getHeaderGroups()], (t) => [...t].reverse(), Z(e.options, ke, "getFooterGroups")), e.getLeftFooterGroups = J(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), Z(e.options, ke, "getLeftFooterGroups")), e.getCenterFooterGroups = J(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), Z(e.options, ke, "getCenterFooterGroups")), e.getRightFooterGroups = J(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), Z(e.options, ke, "getRightFooterGroups")), e.getFlatHeaders = J(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Z(e.options, ke, "getFlatHeaders")), e.getLeftFlatHeaders = J(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Z(e.options, ke, "getLeftFlatHeaders")), e.getCenterFlatHeaders = J(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Z(e.options, ke, "getCenterFlatHeaders")), e.getRightFlatHeaders = J(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), Z(e.options, ke, "getRightFlatHeaders")), e.getCenterLeafHeaders = J(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), Z(e.options, ke, "getCenterLeafHeaders")), e.getLeftLeafHeaders = J(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), Z(e.options, ke, "getLeftLeafHeaders")), e.getRightLeafHeaders = J(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), Z(e.options, ke, "getRightLeafHeaders")), e.getLeafHeaders = J(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var o, i, s, a, c, u;
      return [...(o = (i = t[0]) == null ? void 0 : i.headers) != null ? o : [], ...(s = (a = n[0]) == null ? void 0 : a.headers) != null ? s : [], ...(c = (u = r[0]) == null ? void 0 : u.headers) != null ? c : []].map((d) => d.getLeafHeaders()).flat();
    }, Z(e.options, ke, "getLeafHeaders"));
  }
};
function Un(e, t, n, r) {
  var o, i;
  let s = 0;
  const a = function(p, f) {
    f === void 0 && (f = 1), s = Math.max(s, f), p.filter((h) => h.getIsVisible()).forEach((h) => {
      var m;
      (m = h.columns) != null && m.length && a(h.columns, f + 1);
    }, 0);
  };
  a(e);
  let c = [];
  const u = (p, f) => {
    const h = {
      depth: f,
      id: [r, `${f}`].filter(Boolean).join("_"),
      headers: []
    }, m = [];
    p.forEach((v) => {
      const y = [...m].reverse()[0], P = v.column.depth === h.depth;
      let x, S = !1;
      if (P && v.column.parent ? x = v.column.parent : (x = v.column, S = !0), y && (y == null ? void 0 : y.column) === x)
        y.subHeaders.push(v);
      else {
        const b = ds(n, x, {
          id: [r, f, x.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: S,
          placeholderId: S ? `${m.filter((E) => E.column === x).length}` : void 0,
          depth: f,
          index: m.length
        });
        b.subHeaders.push(v), m.push(b);
      }
      h.headers.push(v), v.headerGroup = h;
    }), c.push(h), f > 0 && u(m, f - 1);
  }, d = t.map((p, f) => ds(n, p, {
    depth: s,
    index: f
  }));
  u(d, s - 1), c.reverse();
  const g = (p) => p.filter((h) => h.column.getIsVisible()).map((h) => {
    let m = 0, v = 0, y = [0];
    h.subHeaders && h.subHeaders.length ? (y = [], g(h.subHeaders).forEach((x) => {
      let {
        colSpan: S,
        rowSpan: b
      } = x;
      m += S, y.push(b);
    })) : m = 1;
    const P = Math.min(...y);
    return v = v + P, h.colSpan = m, h.rowSpan = v, {
      colSpan: m,
      rowSpan: v
    };
  });
  return g((o = (i = c[0]) == null ? void 0 : i.headers) != null ? o : []), c;
}
const ja = (e, t, n, r, o, i, s) => {
  let a = {
    id: t,
    index: r,
    original: n,
    depth: o,
    parentId: s,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (c) => {
      if (a._valuesCache.hasOwnProperty(c))
        return a._valuesCache[c];
      const u = e.getColumn(c);
      if (u != null && u.accessorFn)
        return a._valuesCache[c] = u.accessorFn(a.original, r), a._valuesCache[c];
    },
    getUniqueValues: (c) => {
      if (a._uniqueValuesCache.hasOwnProperty(c))
        return a._uniqueValuesCache[c];
      const u = e.getColumn(c);
      if (u != null && u.accessorFn)
        return u.columnDef.getUniqueValues ? (a._uniqueValuesCache[c] = u.columnDef.getUniqueValues(a.original, r), a._uniqueValuesCache[c]) : (a._uniqueValuesCache[c] = [a.getValue(c)], a._uniqueValuesCache[c]);
    },
    renderValue: (c) => {
      var u;
      return (u = a.getValue(c)) != null ? u : e.options.renderFallbackValue;
    },
    subRows: i ?? [],
    getLeafRows: () => Ba(a.subRows, (c) => c.subRows),
    getParentRow: () => a.parentId ? e.getRow(a.parentId, !0) : void 0,
    getParentRows: () => {
      let c = [], u = a;
      for (; ; ) {
        const d = u.getParentRow();
        if (!d)
          break;
        c.push(d), u = d;
      }
      return c.reverse();
    },
    getAllCells: J(() => [e.getAllLeafColumns()], (c) => c.map((u) => Im(e, a, u, u.id)), Z(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: J(() => [a.getAllCells()], (c) => c.reduce((u, d) => (u[d.column.id] = d, u), {}), Z(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let c = 0; c < e._features.length; c++) {
    const u = e._features[c];
    u == null || u.createRow == null || u.createRow(a, e);
  }
  return a;
}, Fm = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, za = (e, t, n) => {
  var r;
  const o = n.toLowerCase();
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null || (r = r.toLowerCase()) == null) && r.includes(o));
};
za.autoRemove = (e) => Ke(e);
const Ha = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
Ha.autoRemove = (e) => Ke(e);
const Ga = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
Ga.autoRemove = (e) => Ke(e);
const Ua = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
Ua.autoRemove = (e) => Ke(e) || !(e != null && e.length);
const qa = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
qa.autoRemove = (e) => Ke(e) || !(e != null && e.length);
const Wa = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Wa.autoRemove = (e) => Ke(e) || !(e != null && e.length);
const Xa = (e, t, n) => e.getValue(t) === n;
Xa.autoRemove = (e) => Ke(e);
const Ya = (e, t, n) => e.getValue(t) == n;
Ya.autoRemove = (e) => Ke(e);
const qo = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
qo.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, s = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > s) {
    const a = i;
    i = s, s = a;
  }
  return [i, s];
};
qo.autoRemove = (e) => Ke(e) || Ke(e[0]) && Ke(e[1]);
const it = {
  includesString: za,
  includesStringSensitive: Ha,
  equalsString: Ga,
  arrIncludes: Ua,
  arrIncludesAll: qa,
  arrIncludesSome: Wa,
  equals: Xa,
  weakEquals: Ya,
  inNumberRange: qo
};
function Ke(e) {
  return e == null || e === "";
}
const Vm = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: ze("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      return typeof r == "string" ? it.includesString : typeof r == "number" ? it.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? it.equals : Array.isArray(r) ? it.arrIncludes : it.weakEquals;
    }, e.getFilterFn = () => {
      var n, r;
      return yr(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
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
        const o = e.getFilterFn(), i = r == null ? void 0 : r.find((d) => d.id === e.id), s = vt(n, i ? i.value : void 0);
        if (ps(o, s, e)) {
          var a;
          return (a = r == null ? void 0 : r.filter((d) => d.id !== e.id)) != null ? a : [];
        }
        const c = {
          id: e.id,
          value: s
        };
        if (i) {
          var u;
          return (u = r == null ? void 0 : r.map((d) => d.id === e.id ? c : d)) != null ? u : [];
        }
        return r != null && r.length ? [...r, c] : [c];
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
        return (i = vt(t, o)) == null ? void 0 : i.filter((s) => {
          const a = n.find((c) => c.id === s.id);
          if (a) {
            const c = a.getFilterFn();
            if (ps(c, s.value, a))
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
function ps(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const Lm = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), Bm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, jm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, zm = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const s = i.getValue(e);
    s != null && (r === void 0 ? s >= s && (r = o = s) : (r > s && (r = s), o < s && (o = s)));
  }), [r, o];
}, Hm = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n)
    return r / n;
}, Gm = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!Mm(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, s) => i - s);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, Um = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), qm = (e, t) => new Set(t.map((n) => n.getValue(e))).size, Wm = (e, t) => t.length, zr = {
  sum: Lm,
  min: Bm,
  max: jm,
  extent: zm,
  mean: Hm,
  median: Gm,
  unique: Um,
  uniqueCount: qm,
  count: Wm
}, Xm = {
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
    onGroupingChange: ze("grouping", e),
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
        return zr.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return zr.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return yr(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : zr[e.columnDef.aggregationFn];
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
function Ym(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((s) => s.id === i)).filter(Boolean), ...r];
}
const Km = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: ze("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = J((n) => [Cn(t, n)], (n) => n.findIndex((r) => r.id === e.id), Z(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = Cn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const o = Cn(t, n);
      return ((r = o[o.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = J(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (o) => {
      let i = [];
      if (!(t != null && t.length))
        i = o;
      else {
        const s = [...t], a = [...o];
        for (; a.length && s.length; ) {
          const c = s.shift(), u = a.findIndex((d) => d.id === c);
          u > -1 && i.push(a.splice(u, 1)[0]);
        }
        i = [...i, ...a];
      }
      return Ym(i, n, r);
    }, Z(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Hr = () => ({
  left: [],
  right: []
}), Jm = {
  getInitialState: (e) => ({
    columnPinning: Hr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: ze("columnPinning", e)
  }),
  createColumn: (e, t) => {
    e.pin = (n) => {
      const r = e.getLeafColumns().map((o) => o.id).filter(Boolean);
      t.setColumnPinning((o) => {
        var i, s;
        if (n === "right") {
          var a, c;
          return {
            left: ((a = o == null ? void 0 : o.left) != null ? a : []).filter((g) => !(r != null && r.includes(g))),
            right: [...((c = o == null ? void 0 : o.right) != null ? c : []).filter((g) => !(r != null && r.includes(g))), ...r]
          };
        }
        if (n === "left") {
          var u, d;
          return {
            left: [...((u = o == null ? void 0 : o.left) != null ? u : []).filter((g) => !(r != null && r.includes(g))), ...r],
            right: ((d = o == null ? void 0 : o.right) != null ? d : []).filter((g) => !(r != null && r.includes(g)))
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
    e.getCenterVisibleCells = J(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return n.filter((s) => !i.includes(s.column.id));
    }, Z(t.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = J(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, r) => (r ?? []).map((i) => n.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), Z(t.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = J(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((i) => n.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), Z(t.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, r;
      return e.setColumnPinning(t ? Hr() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : Hr());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const r = e.getState().columnPinning;
      if (!t) {
        var o, i;
        return !!((o = r.left) != null && o.length || (i = r.right) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e.getLeftLeafColumns = J(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), Z(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = J(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), Z(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = J(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const o = [...n ?? [], ...r ?? []];
      return t.filter((i) => !o.includes(i.id));
    }, Z(e.options, "debugColumns", "getCenterLeafColumns"));
  }
}, qn = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Gr = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Zm = {
  getDefaultColumnDef: () => qn,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Gr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: ze("columnSizing", e),
    onColumnSizingInfoChange: ze("columnSizingInfo", e)
  }),
  createColumn: (e, t) => {
    e.getSize = () => {
      var n, r, o;
      const i = t.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : qn.minSize, (r = i ?? e.columnDef.size) != null ? r : qn.size), (o = e.columnDef.maxSize) != null ? o : qn.maxSize);
    }, e.getStart = J((n) => [n, Cn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((o, i) => o + i.getSize(), 0), Z(t.options, "debugColumns", "getStart")), e.getAfter = J((n) => [n, Cn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((o, i) => o + i.getSize(), 0), Z(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!r || !o || (i.persist == null || i.persist(), Ur(i) && i.touches && i.touches.length > 1))
          return;
        const s = e.getSize(), a = e ? e.getLeafHeaders().map((y) => [y.column.id, y.column.getSize()]) : [[r.id, r.getSize()]], c = Ur(i) ? Math.round(i.touches[0].clientX) : i.clientX, u = {}, d = (y, P) => {
          typeof P == "number" && (t.setColumnSizingInfo((x) => {
            var S, b;
            const E = t.options.columnResizeDirection === "rtl" ? -1 : 1, $ = (P - ((S = x == null ? void 0 : x.startOffset) != null ? S : 0)) * E, I = Math.max($ / ((b = x == null ? void 0 : x.startSize) != null ? b : 0), -0.999999);
            return x.columnSizingStart.forEach((A) => {
              let [L, C] = A;
              u[L] = Math.round(Math.max(C + C * I, 0) * 100) / 100;
            }), {
              ...x,
              deltaOffset: $,
              deltaPercentage: I
            };
          }), (t.options.columnResizeMode === "onChange" || y === "end") && t.setColumnSizing((x) => ({
            ...x,
            ...u
          })));
        }, g = (y) => d("move", y), p = (y) => {
          d("end", y), t.setColumnSizingInfo((P) => ({
            ...P,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, f = n || typeof document < "u" ? document : null, h = {
          moveHandler: (y) => g(y.clientX),
          upHandler: (y) => {
            f == null || f.removeEventListener("mousemove", h.moveHandler), f == null || f.removeEventListener("mouseup", h.upHandler), p(y.clientX);
          }
        }, m = {
          moveHandler: (y) => (y.cancelable && (y.preventDefault(), y.stopPropagation()), g(y.touches[0].clientX), !1),
          upHandler: (y) => {
            var P;
            f == null || f.removeEventListener("touchmove", m.moveHandler), f == null || f.removeEventListener("touchend", m.upHandler), y.cancelable && (y.preventDefault(), y.stopPropagation()), p((P = y.touches[0]) == null ? void 0 : P.clientX);
          }
        }, v = Qm() ? {
          passive: !1
        } : !1;
        Ur(i) ? (f == null || f.addEventListener("touchmove", m.moveHandler, v), f == null || f.addEventListener("touchend", m.upHandler, v)) : (f == null || f.addEventListener("mousemove", h.moveHandler, v), f == null || f.addEventListener("mouseup", h.upHandler, v)), t.setColumnSizingInfo((y) => ({
          ...y,
          startOffset: c,
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
      e.setColumnSizingInfo(t ? Gr() : (n = e.initialState.columnSizingInfo) != null ? n : Gr());
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
let Wn = null;
function Qm() {
  if (typeof Wn == "boolean")
    return Wn;
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
  return Wn = e, Wn;
}
function Ur(e) {
  return e.type === "touchstart";
}
const eh = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: ze("columnVisibility", e)
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
    e._getAllVisibleCells = J(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), Z(t.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = J(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, o) => [...n, ...r, ...o], Z(t.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const t = (n, r) => J(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), Z(e.options, "debugColumns", n));
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
function Cn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const th = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, nh = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: ze("globalFilter", e),
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
      return yr(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : it[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, rh = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: ze("expanded", e),
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
            ...c
          } = s;
          return c;
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
}, fo = 0, go = 10, qr = () => ({
  pageIndex: fo,
  pageSize: go
}), oh = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...qr(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: ze("pagination", e)
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
      const o = (i) => vt(r, i);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(o);
    }, e.resetPagination = (r) => {
      var o;
      e.setPagination(r ? qr() : (o = e.initialState.pagination) != null ? o : qr());
    }, e.setPageIndex = (r) => {
      e.setPagination((o) => {
        let i = vt(r, o.pageIndex);
        const s = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return i = Math.max(0, Math.min(i, s)), {
          ...o,
          pageIndex: i
        };
      });
    }, e.resetPageIndex = (r) => {
      var o, i;
      e.setPageIndex(r ? fo : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : fo);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? go : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : go);
    }, e.setPageSize = (r) => {
      e.setPagination((o) => {
        const i = Math.max(1, vt(r, o.pageSize)), s = o.pageSize * o.pageIndex, a = Math.floor(s / i);
        return {
          ...o,
          pageIndex: a,
          pageSize: i
        };
      });
    }, e.setPageCount = (r) => e.setPagination((o) => {
      var i;
      let s = vt(r, (i = e.options.pageCount) != null ? i : -1);
      return typeof s == "number" && (s = Math.max(-1, s)), {
        ...o,
        pageCount: s
      };
    }), e.getPageOptions = J(() => [e.getPageCount()], (r) => {
      let o = [];
      return r && r > 0 && (o = [...new Array(r)].fill(null).map((i, s) => s)), o;
    }, Z(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
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
}, Wr = () => ({
  top: [],
  bottom: []
}), ih = {
  getInitialState: (e) => ({
    rowPinning: Wr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: ze("rowPinning", e)
  }),
  createRow: (e, t) => {
    e.pin = (n, r, o) => {
      const i = r ? e.getLeafRows().map((c) => {
        let {
          id: u
        } = c;
        return u;
      }) : [], s = o ? e.getParentRows().map((c) => {
        let {
          id: u
        } = c;
        return u;
      }) : [], a = /* @__PURE__ */ new Set([...s, e.id, ...i]);
      t.setRowPinning((c) => {
        var u, d;
        if (n === "bottom") {
          var g, p;
          return {
            top: ((g = c == null ? void 0 : c.top) != null ? g : []).filter((m) => !(a != null && a.has(m))),
            bottom: [...((p = c == null ? void 0 : c.bottom) != null ? p : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)]
          };
        }
        if (n === "top") {
          var f, h;
          return {
            top: [...((f = c == null ? void 0 : c.top) != null ? f : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)],
            bottom: ((h = c == null ? void 0 : c.bottom) != null ? h : []).filter((m) => !(a != null && a.has(m)))
          };
        }
        return {
          top: ((u = c == null ? void 0 : c.top) != null ? u : []).filter((m) => !(a != null && a.has(m))),
          bottom: ((d = c == null ? void 0 : c.bottom) != null ? d : []).filter((m) => !(a != null && a.has(m)))
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
      const i = (n = t._getPinnedRows(o)) == null ? void 0 : n.map((s) => {
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
      return e.setRowPinning(t ? Wr() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : Wr());
    }, e.getIsSomeRowsPinned = (t) => {
      var n;
      const r = e.getState().rowPinning;
      if (!t) {
        var o, i;
        return !!((o = r.top) != null && o.length || (i = r.bottom) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e._getPinnedRows = J((t) => [e.getRowModel().rows, e.getState().rowPinning[t], t], (t, n, r) => {
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
    }, Z(e.options, "debugRows", "_getPinnedRows")), e.getTopRows = () => e._getPinnedRows("top"), e.getBottomRows = () => e._getPinnedRows("bottom"), e.getCenterRows = J(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const o = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((i) => !o.has(i.id));
    }, Z(e.options, "debugRows", "getCenterRows"));
  }
}, sh = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: ze("rowSelection", e),
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
        mo(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = J(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? Xr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Z(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = J(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? Xr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Z(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = J(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? Xr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, Z(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
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
        return mo(a, e.id, n, (s = r == null ? void 0 : r.selectChildren) != null ? s : !0, t), a;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return Wo(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return ho(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return ho(e, n) === "all";
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
}, mo = (e, t, n, r, o) => {
  var i;
  const s = o.getRow(t, !0);
  n ? (s.getCanMultiSelect() || Object.keys(e).forEach((a) => delete e[a]), s.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = s.subRows) != null && i.length && s.getCanSelectSubRows() && s.subRows.forEach((a) => mo(e, a.id, n, r, o));
};
function Xr(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(s, a) {
    return s.map((c) => {
      var u;
      const d = Wo(c, n);
      if (d && (r.push(c), o[c.id] = c), (u = c.subRows) != null && u.length && (c = {
        ...c,
        subRows: i(c.subRows)
      }), d)
        return c;
    }).filter(Boolean);
  };
  return {
    rows: i(t.rows),
    flatRows: r,
    rowsById: o
  };
}
function Wo(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function ho(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length))
    return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((s) => {
    if (!(i && !o) && (s.getCanSelect() && (Wo(s, t) ? i = !0 : o = !1), s.subRows && s.subRows.length)) {
      const a = ho(s, t);
      a === "all" ? i = !0 : (a === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const vo = /([0-9]+)/gm, ah = (e, t, n) => Ka(bt(e.getValue(n)).toLowerCase(), bt(t.getValue(n)).toLowerCase()), lh = (e, t, n) => Ka(bt(e.getValue(n)), bt(t.getValue(n))), ch = (e, t, n) => Xo(bt(e.getValue(n)).toLowerCase(), bt(t.getValue(n)).toLowerCase()), uh = (e, t, n) => Xo(bt(e.getValue(n)), bt(t.getValue(n))), dh = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, ph = (e, t, n) => Xo(e.getValue(n), t.getValue(n));
function Xo(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function bt(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Ka(e, t) {
  const n = e.split(vo).filter(Boolean), r = t.split(vo).filter(Boolean);
  for (; n.length && r.length; ) {
    const o = n.shift(), i = r.shift(), s = parseInt(o, 10), a = parseInt(i, 10), c = [s, a].sort();
    if (isNaN(c[0])) {
      if (o > i)
        return 1;
      if (i > o)
        return -1;
      continue;
    }
    if (isNaN(c[1]))
      return isNaN(s) ? -1 : 1;
    if (s > a)
      return 1;
    if (a > s)
      return -1;
  }
  return n.length - r.length;
}
const fn = {
  alphanumeric: ah,
  alphanumericCaseSensitive: lh,
  text: ch,
  textCaseSensitive: uh,
  datetime: dh,
  basic: ph
}, fh = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: ze("sorting", e),
    isMultiSortEvent: (t) => t.shiftKey
  }),
  createColumn: (e, t) => {
    e.getAutoSortingFn = () => {
      const n = t.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const o of n) {
        const i = o == null ? void 0 : o.getValue(e.id);
        if (Object.prototype.toString.call(i) === "[object Date]")
          return fn.datetime;
        if (typeof i == "string" && (r = !0, i.split(vo).length > 1))
          return fn.alphanumeric;
      }
      return r ? fn.text : fn.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return yr(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : fn[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, r) => {
      const o = e.getNextSortingOrder(), i = typeof n < "u" && n !== null;
      t.setSorting((s) => {
        const a = s == null ? void 0 : s.find((f) => f.id === e.id), c = s == null ? void 0 : s.findIndex((f) => f.id === e.id);
        let u = [], d, g = i ? n : o === "desc";
        if (s != null && s.length && e.getCanMultiSort() && r ? a ? d = "toggle" : d = "add" : s != null && s.length && c !== s.length - 1 ? d = "replace" : a ? d = "toggle" : d = "replace", d === "toggle" && (i || o || (d = "remove")), d === "add") {
          var p;
          u = [...s, {
            id: e.id,
            desc: g
          }], u.splice(0, u.length - ((p = t.options.maxMultiSortColCount) != null ? p : Number.MAX_SAFE_INTEGER));
        } else
          d === "toggle" ? u = s.map((f) => f.id === e.id ? {
            ...f,
            desc: g
          } : f) : d === "remove" ? u = s.filter((f) => f.id !== e.id) : u = [{
            id: e.id,
            desc: g
          }];
        return u;
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
}, gh = [
  Dm,
  eh,
  Km,
  Jm,
  Fm,
  Vm,
  th,
  //depends on ColumnFaceting
  nh,
  //depends on ColumnFiltering
  fh,
  Xm,
  //depends on RowSorting
  rh,
  oh,
  ih,
  sh,
  Zm
];
function mh(e) {
  var t, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const r = [...gh, ...(t = e._features) != null ? t : []];
  let o = {
    _features: r
  };
  const i = o._features.reduce((p, f) => Object.assign(p, f.getDefaultOptions == null ? void 0 : f.getDefaultOptions(o)), {}), s = (p) => o.options.mergeOptions ? o.options.mergeOptions(i, p) : {
    ...i,
    ...p
  };
  let c = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  o._features.forEach((p) => {
    var f;
    c = (f = p.getInitialState == null ? void 0 : p.getInitialState(c)) != null ? f : c;
  });
  const u = [];
  let d = !1;
  const g = {
    _features: r,
    options: {
      ...i,
      ...e
    },
    initialState: c,
    _queue: (p) => {
      u.push(p), d || (d = !0, Promise.resolve().then(() => {
        for (; u.length; )
          u.shift()();
        d = !1;
      }).catch((f) => setTimeout(() => {
        throw f;
      })));
    },
    reset: () => {
      o.setState(o.initialState);
    },
    setOptions: (p) => {
      const f = vt(p, o.options);
      o.options = s(f);
    },
    getState: () => o.options.state,
    setState: (p) => {
      o.options.onStateChange == null || o.options.onStateChange(p);
    },
    _getRowId: (p, f, h) => {
      var m;
      return (m = o.options.getRowId == null ? void 0 : o.options.getRowId(p, f, h)) != null ? m : `${h ? [h.id, f].join(".") : f}`;
    },
    getCoreRowModel: () => (o._getCoreRowModel || (o._getCoreRowModel = o.options.getCoreRowModel(o)), o._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => o.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (p, f) => {
      let h = (f ? o.getPrePaginationRowModel() : o.getRowModel()).rowsById[p];
      if (!h && (h = o.getCoreRowModel().rowsById[p], !h))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${p}`) : new Error();
      return h;
    },
    _getDefaultColumnDef: J(() => [o.options.defaultColumn], (p) => {
      var f;
      return p = (f = p) != null ? f : {}, {
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
        ...p
      };
    }, Z(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: J(() => [o._getColumnDefs()], (p) => {
      const f = function(h, m, v) {
        return v === void 0 && (v = 0), h.map((y) => {
          const P = Am(o, y, v, m), x = y;
          return P.columns = x.columns ? f(x.columns, P, v + 1) : [], P;
        });
      };
      return f(p);
    }, Z(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: J(() => [o.getAllColumns()], (p) => p.flatMap((f) => f.getFlatColumns()), Z(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: J(() => [o.getAllFlatColumns()], (p) => p.reduce((f, h) => (f[h.id] = h, f), {}), Z(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: J(() => [o.getAllColumns(), o._getOrderColumnsFn()], (p, f) => {
      let h = p.flatMap((m) => m.getLeafColumns());
      return f(h);
    }, Z(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (p) => {
      const f = o._getAllFlatColumnsById()[p];
      return process.env.NODE_ENV !== "production" && !f && console.error(`[Table] Column with id '${p}' does not exist.`), f;
    }
  };
  Object.assign(o, g);
  for (let p = 0; p < o._features.length; p++) {
    const f = o._features[p];
    f == null || f.createTable == null || f.createTable(o);
  }
  return o;
}
function hh() {
  return (e) => J(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, s) {
      i === void 0 && (i = 0);
      const a = [];
      for (let u = 0; u < o.length; u++) {
        const d = ja(e, e._getRowId(o[u], u, s), o[u], u, i, void 0, s == null ? void 0 : s.id);
        if (n.flatRows.push(d), n.rowsById[d.id] = d, a.push(d), e.options.getSubRows) {
          var c;
          d.originalSubRows = e.options.getSubRows(o[u], u), (c = d.originalSubRows) != null && c.length && (d.subRows = r(d.originalSubRows, i + 1, d));
        }
      }
      return a;
    };
    return n.rows = r(t), n;
  }, Z(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function vh() {
  return (e) => J(() => [e.getState().expanded, e.getPreExpandedRowModel(), e.options.paginateExpandedRows], (t, n, r) => !n.rows.length || t !== !0 && !Object.keys(t ?? {}).length || !r ? n : bh(n), Z(e.options, "debugTable", "getExpandedRowModel"));
}
function bh(e) {
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
function wh() {
  return (e) => J(() => [e.getState().grouping, e.getPreGroupedRowModel()], (t, n) => {
    if (!n.rows.length || !t.length)
      return n;
    const r = t.filter((c) => e.getColumn(c)), o = [], i = {}, s = function(c, u, d) {
      if (u === void 0 && (u = 0), u >= r.length)
        return c.map((h) => (h.depth = u, o.push(h), i[h.id] = h, h.subRows && (h.subRows = s(h.subRows, u + 1, h.id)), h));
      const g = r[u], p = yh(c, g);
      return Array.from(p.entries()).map((h, m) => {
        let [v, y] = h, P = `${g}:${v}`;
        P = d ? `${d}>${P}` : P;
        const x = s(y, u + 1, P), S = u ? Ba(y, (E) => E.subRows) : y, b = ja(e, P, S[0].original, m, u, void 0, d);
        return Object.assign(b, {
          groupingColumnId: g,
          groupingValue: v,
          subRows: x,
          leafRows: S,
          getValue: (E) => {
            if (r.includes(E)) {
              if (b._valuesCache.hasOwnProperty(E))
                return b._valuesCache[E];
              if (y[0]) {
                var $;
                b._valuesCache[E] = ($ = y[0].getValue(E)) != null ? $ : void 0;
              }
              return b._valuesCache[E];
            }
            if (b._groupingValuesCache.hasOwnProperty(E))
              return b._groupingValuesCache[E];
            const I = e.getColumn(E), A = I == null ? void 0 : I.getAggregationFn();
            if (A)
              return b._groupingValuesCache[E] = A(E, S, y), b._groupingValuesCache[E];
          }
        }), x.forEach((E) => {
          o.push(E), i[E.id] = E;
        }), b;
      });
    }, a = s(n.rows, 0);
    return a.forEach((c) => {
      o.push(c), i[c.id] = c;
    }), {
      rows: a,
      flatRows: o,
      rowsById: i
    };
  }, Z(e.options, "debugTable", "getGroupedRowModel", () => {
    e._queue(() => {
      e._autoResetExpanded(), e._autoResetPageIndex();
    });
  }));
}
function yh(e, t) {
  const n = /* @__PURE__ */ new Map();
  return e.reduce((r, o) => {
    const i = `${o.getGroupingValue(t)}`, s = r.get(i);
    return s ? s.push(o) : r.set(i, [o]), r;
  }, n);
}
function xh() {
  return (e) => J(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
    if (!n.rows.length || !(t != null && t.length))
      return n;
    const r = e.getState().sorting, o = [], i = r.filter((c) => {
      var u;
      return (u = e.getColumn(c.id)) == null ? void 0 : u.getCanSort();
    }), s = {};
    i.forEach((c) => {
      const u = e.getColumn(c.id);
      u && (s[c.id] = {
        sortUndefined: u.columnDef.sortUndefined,
        invertSorting: u.columnDef.invertSorting,
        sortingFn: u.getSortingFn()
      });
    });
    const a = (c) => {
      const u = c.map((d) => ({
        ...d
      }));
      return u.sort((d, g) => {
        for (let f = 0; f < i.length; f += 1) {
          var p;
          const h = i[f], m = s[h.id], v = m.sortUndefined, y = (p = h == null ? void 0 : h.desc) != null ? p : !1;
          let P = 0;
          if (v) {
            const x = d.getValue(h.id), S = g.getValue(h.id), b = x === void 0, E = S === void 0;
            if (b || E) {
              if (v === "first")
                return b ? -1 : 1;
              if (v === "last")
                return b ? 1 : -1;
              P = b && E ? 0 : b ? v : -v;
            }
          }
          if (P === 0 && (P = m.sortingFn(d, g, h.id)), P !== 0)
            return y && (P *= -1), m.invertSorting && (P *= -1), P;
        }
        return d.index - g.index;
      }), u.forEach((d) => {
        var g;
        o.push(d), (g = d.subRows) != null && g.length && (d.subRows = a(d.subRows));
      }), u;
    };
    return {
      rows: a(n.rows),
      flatRows: o,
      rowsById: n.rowsById
    };
  }, Z(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
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
function Yr(e, t) {
  return e ? Sh(e) ? /* @__PURE__ */ R.createElement(e, t) : e : null;
}
function Sh(e) {
  return Ch(e) || typeof e == "function" || Eh(e);
}
function Ch(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function Eh(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function Rh(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = R.useState(() => ({
    current: mh(t)
  })), [r, o] = R.useState(() => n.current.initialState);
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
const kh = ye.Root, Th = ye.Group, Ph = ye.Value, Ja = R.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ie(
  ye.Trigger,
  {
    ref: r,
    className: G(
      /* The default installed version of SelectTrigger included pr-w-full, but UX (Alex) says that's not desirable. */
      "pr-flex pr-h-10 pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ w(ye.Icon, { asChild: !0, children: /* @__PURE__ */ w(vs, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Ja.displayName = ye.Trigger.displayName;
const Za = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ye.ScrollUpButton,
  {
    ref: n,
    className: G("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ w(Nl, { className: "pr-h-4 pr-w-4" })
  }
));
Za.displayName = ye.ScrollUpButton.displayName;
const Qa = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ye.ScrollDownButton,
  {
    ref: n,
    className: G("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ w(vs, { className: "pr-h-4 pr-w-4" })
  }
));
Qa.displayName = ye.ScrollDownButton.displayName;
const el = R.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ w(ye.Portal, { children: /* @__PURE__ */ ie(
  ye.Content,
  {
    ref: o,
    className: G(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ w(Za, {}),
      /* @__PURE__ */ w(
        ye.Viewport,
        {
          className: G(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ w(Qa, {})
    ]
  }
) }));
el.displayName = ye.Content.displayName;
const Oh = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ye.Label,
  {
    ref: n,
    className: G("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Oh.displayName = ye.Label.displayName;
const tl = R.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ie(
  ye.Item,
  {
    ref: r,
    className: G(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ w("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ w(ye.ItemIndicator, { children: /* @__PURE__ */ w(hs, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ w(ye.ItemText, { children: t })
    ]
  }
));
tl.displayName = ye.Item.displayName;
const Nh = R.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ye.Separator,
  {
    ref: n,
    className: G("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Nh.displayName = ye.Separator.displayName;
const nl = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ w(
    "table",
    {
      ref: n,
      className: G("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
nl.displayName = "Table";
const rl = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w("thead", { ref: n, className: G("[&_tr]:pr-border-b", e), ...t }));
rl.displayName = "TableHeader";
const ol = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w("tbody", { ref: n, className: G("[&_tr:last-child]:pr-border-0", e), ...t }));
ol.displayName = "TableBody";
const $h = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  "tfoot",
  {
    ref: n,
    className: G("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
$h.displayName = "TableFooter";
const bo = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w(
    "tr",
    {
      ref: n,
      className: G(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
bo.displayName = "TableRow";
const il = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  "th",
  {
    ref: n,
    className: G(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
il.displayName = "TableHead";
const sl = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  "td",
  {
    ref: n,
    className: G("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
sl.displayName = "TableCell";
const _h = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  "caption",
  {
    ref: n,
    className: G("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
_h.displayName = "TableCaption";
const mt = "scrBook", Mh = "scrRef", Tt = "source", Ih = "details", Ah = "Scripture Reference", Dh = "Scripture Book", al = "Type", Fh = "Details";
function Vh(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${ue.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: mt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Ah,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? ue.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === mt ? Tr(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Jr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Tr(r.start),
      id: Mh,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Tr(o.start);
      },
      sortingFn: (r, o) => Jr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: Tt,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? al : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Ih,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Fh,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
function Pv({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: a
}) {
  const [c, u] = Ce([]), [d, g] = Ce([{ id: mt, desc: !1 }]), [p, f] = Ce(() => e.flatMap((C) => {
    const k = C.source;
    return C.data.map((N) => ({
      ...N,
      source: k
    }));
  })), [h, m] = Ce({});
  at(() => {
    f(() => e.flatMap((C) => {
      const k = C.source;
      return C.data.map((N) => ({
        ...N,
        source: k
      }));
    }));
  }, [e]);
  const v = Zt(
    () => Vh(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [r, i, s, n]
  );
  at(() => {
    c.includes(Tt) ? g([
      { id: Tt, desc: !1 },
      { id: mt, desc: !1 }
    ]) : g([{ id: mt, desc: !1 }]);
  }, [c]);
  const y = Te(
    (C, k) => !k || Jr(C, k) === 0 ? `${kr(C)}` : `${kr(C)}-${kr(k)}`,
    []
  ), P = Te(
    (C) => `${y(C.start, C.end)} ${C.source} ${C.detail}`,
    [y]
  ), x = Rh({
    data: p,
    columns: v,
    state: {
      grouping: c,
      sorting: d,
      rowSelection: h
    },
    onGroupingChange: u,
    onSortingChange: g,
    onRowSelectionChange: m,
    getExpandedRowModel: vh(),
    getGroupedRowModel: wh(),
    getCoreRowModel: hh(),
    getSortedRowModel: xh(),
    getRowId: P,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  at(() => {
    if (a) {
      const C = x.getSelectedRowModel().rowsById, k = Object.keys(C);
      if (k.length === 1) {
        const N = p.find((B) => P(B) === k[0]) || void 0;
        N && a(N);
      }
    }
  }, [h, p, P, a, x]);
  const S = o ?? Dh, b = i ?? al, E = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${S}`, value: [mt] },
    { label: `Group by ${b}`, value: [Tt] },
    {
      label: `Group by ${S} and ${b}`,
      value: [mt, Tt]
    },
    {
      label: `Group by ${b} and ${S}`,
      value: [Tt, mt]
    }
  ], $ = (C) => {
    u(JSON.parse(C));
  }, I = (C, k) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(k);
  }, A = (C, k) => C.getIsGrouped() ? "" : G("banded-row", k % 2 === 0 ? "even" : "odd"), L = (C, k, N) => {
    if (!((C == null ? void 0 : C.length) === 0 || k.depth < N.column.getGroupedIndex())) {
      if (k.getIsGrouped())
        switch (k.depth) {
          case 1:
            return "pr-ps-4";
          default:
            return;
        }
      switch (k.depth) {
        case 1:
          return "pr-ps-8";
        case 2:
          return "pr-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ ie("div", { className: "pr-twp pr-w-full", children: [
    !t && /* @__PURE__ */ ie(
      kh,
      {
        value: JSON.stringify(c),
        onValueChange: (C) => {
          $(C);
        },
        children: [
          /* @__PURE__ */ w(Ja, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ w(Ph, {}) }),
          /* @__PURE__ */ w(el, { position: "item-aligned", children: /* @__PURE__ */ w(Th, { children: E.map((C) => /* @__PURE__ */ w(tl, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ ie(nl, { className: "pr-p-0", children: [
      t && /* @__PURE__ */ w(rl, { children: x.getHeaderGroups().map((C) => /* @__PURE__ */ w(bo, { children: C.headers.filter((k) => k.column.columnDef.header).map((k) => /* @__PURE__ */ w(il, { colSpan: k.colSpan, children: k.isPlaceholder ? void 0 : /* @__PURE__ */ ie("div", { children: [
        k.column.getCanGroup() ? /* @__PURE__ */ w(
          st,
          {
            variant: "ghost",
            title: `Toggle grouping by ${k.column.columnDef.header}`,
            onClick: k.column.getToggleGroupingHandler(),
            type: "button",
            children: k.column.getIsGrouped() ? `🛑(${k.column.getGroupedIndex()}) ` : "👊 "
          }
        ) : void 0,
        " ",
        Yr(k.column.columnDef.header, k.getContext())
      ] }) }, k.id)) }, C.id)) }),
      /* @__PURE__ */ w(ol, { children: x.getRowModel().rows.map((C, k) => /* @__PURE__ */ w(
        bo,
        {
          "data-state": C.getIsSelected() ? "selected" : "",
          className: G(A(C, k)),
          onClick: (N) => I(C, N),
          children: C.getVisibleCells().map((N) => {
            if (!(N.getIsPlaceholder() || N.column.columnDef.enableGrouping && !N.getIsGrouped() && (N.column.columnDef.id !== Tt || !n)))
              return /* @__PURE__ */ w(
                sl,
                {
                  className: G(
                    N.column.columnDef.id,
                    "pr-p-[1px]",
                    L(c, C, N)
                  ),
                  children: (() => N.getIsGrouped() ? /* @__PURE__ */ ie(
                    st,
                    {
                      variant: "ghost",
                      onClick: C.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        C.getIsExpanded() ? "👇" : "👉",
                        " ",
                        Yr(N.column.columnDef.cell, N.getContext()),
                        " (",
                        C.subRows.length,
                        ")"
                      ]
                    }
                  ) : Yr(N.column.columnDef.cell, N.getContext()))()
                },
                N.id
              );
          })
        },
        C.id
      )) })
    ] })
  ] });
}
function Ov({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = Ce(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ w(
    sr,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  );
}
function Nv({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: s = !1,
  defaultValue: a,
  value: c,
  valueLabelDisplay: u = "off",
  className: d,
  onChange: g,
  onChangeCommitted: p
}) {
  return /* @__PURE__ */ w(
    Hl,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: i,
      marks: s,
      defaultValue: a,
      value: c,
      valueLabelDisplay: u,
      className: `papi-slider ${n} ${d ?? ""}`,
      onChange: g,
      onChangeCommitted: p
    }
  );
}
function $v({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: a
}) {
  const c = {
    action: (s == null ? void 0 : s.action) || a,
    message: s == null ? void 0 : s.message,
    className: r
  };
  return /* @__PURE__ */ w(
    Gl,
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
function _v({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ w(
    Ul,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function fs({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return (
    // `as keyof R` reminds TypeScript of what it actually is
    // `as string` is just asserting that the input is a string because this is the default editor
    // used for all values. It will probably break on non-strings
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    /* @__PURE__ */ w(sr, { defaultValue: t[n.key], onChange: r })
  );
}
const Lh = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ w(
  $s,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Mv({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: n,
  onColumnResize: r,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: a = !0,
  defaultColumnResizable: c = !0,
  rows: u,
  enableSelectColumn: d,
  selectColumnWidth: g = 50,
  rowKeyGetter: p,
  rowHeight: f = 35,
  headerRowHeight: h = 35,
  selectedRows: m,
  onSelectedRowsChange: v,
  onRowsChange: y,
  onCellClick: P,
  onCellDoubleClick: x,
  onCellContextMenu: S,
  onCellKeyDown: b,
  direction: E = "ltr",
  enableVirtualization: $ = !0,
  onCopy: I,
  onPaste: A,
  onScroll: L,
  className: C,
  "data-testid": k
}) {
  const N = Zt(() => {
    const B = e.map((V) => typeof V.editable == "function" ? {
      ...V,
      editable: (j) => !!V.editable(j),
      renderEditCell: V.renderEditCell || fs
    } : V.editable && !V.renderEditCell ? { ...V, renderEditCell: fs } : V.renderEditCell && !V.editable ? { ...V, editable: !1 } : V);
    return d ? [{ ...Ql, minWidth: g }, ...B] : B;
  }, [e, d, g]);
  return /* @__PURE__ */ w(
    Zl,
    {
      columns: N,
      defaultColumnOptions: {
        width: o,
        minWidth: i,
        maxWidth: s,
        sortable: a,
        resizable: c
      },
      sortColumns: t,
      onSortColumnsChange: n,
      onColumnResize: r,
      rows: u,
      rowKeyGetter: p,
      rowHeight: f,
      headerRowHeight: h,
      selectedRows: m,
      onSelectedRowsChange: v,
      onRowsChange: y,
      onCellClick: P,
      onCellDoubleClick: x,
      onCellContextMenu: S,
      onCellKeyDown: b,
      direction: E,
      enableVirtualization: $,
      onCopy: I,
      onPaste: A,
      onScroll: L,
      renderers: { renderCheckbox: Lh },
      className: `papi-table ${C ?? "rdg-light"}`,
      "data-testid": k
    }
  );
}
function Iv({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = Ot(void 0);
  return /* @__PURE__ */ w("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ w(ql, { position: "static", id: r, children: /* @__PURE__ */ ie(Wl, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ w(
      $m,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ w("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Av = (e, t) => {
  at(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Kr = () => !1, Dv = (e, t) => {
  const [n] = po(
    Te(async () => {
      if (!e)
        return Kr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Kr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  at(() => () => {
    n !== Kr && n();
  }, [n]);
}, Fv = De.Root, Bh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  De.List,
  {
    ref: n,
    className: G(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Bh.displayName = De.List.displayName;
const jh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  De.Trigger,
  {
    ref: n,
    className: G(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
jh.displayName = De.Trigger.displayName;
const zh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  De.Content,
  {
    ref: n,
    className: G(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
zh.displayName = De.Content.displayName;
const Hh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  De.Root,
  {
    orientation: "vertical",
    ref: n,
    className: G("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Hh.displayName = De.List.displayName;
const Gh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  De.List,
  {
    ref: n,
    className: G(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Gh.displayName = De.List.displayName;
const Vv = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  De.Trigger,
  {
    ref: n,
    ...t,
    className: G(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Uh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  De.Content,
  {
    ref: n,
    className: G(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Uh.displayName = De.Content.displayName;
const qh = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w(
    "div",
    {
      ref: n,
      className: G(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
qh.displayName = "Card";
const Wh = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w(
    "div",
    {
      ref: n,
      className: G("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
Wh.displayName = "CardHeader";
const Xh = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w(
    "h3",
    {
      ref: n,
      className: G("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
Xh.displayName = "CardTitle";
const Yh = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w("p", { ref: n, className: G("pr-text-sm pr-text-muted-foreground", e), ...t }));
Yh.displayName = "CardDescription";
const Kh = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w("div", { ref: n, className: G("pr-p-6 pr-pt-0", e), ...t })
);
Kh.displayName = "CardContent";
const Jh = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w("div", { ref: n, className: G("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
Jh.displayName = "CardFooter";
const Zh = wo(
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
), Qh = re.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ w("div", { ref: r, role: "alert", className: G(Zh({ variant: t }), e), ...n }));
Qh.displayName = "Alert";
const ev = re.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ ie(
    "h5",
    {
      ref: n,
      className: G("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
ev.displayName = "AlertTitle";
const tv = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w("div", { ref: n, className: G("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
tv.displayName = "AlertDescription";
const nv = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ ie(
  gn.Root,
  {
    ref: n,
    className: G(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ w(gn.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ w(gn.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ w(gn.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
nv.displayName = gn.Root.displayName;
const rv = re.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  Zr.Root,
  {
    className: G(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ w(
      Zr.Thumb,
      {
        className: G(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
rv.displayName = Zr.Root.displayName;
function ov(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
ov(`.search-bar-paper {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
}
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
.pr-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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
.pr-h-14 {
  height: 3.5rem;
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
.pr-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.pr-max-w-64 {
  max-width: 16rem;
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
.pr-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity));
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
.pr-p-\\[1px\\] {
  padding: 1px;
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
.pr-ps-12 {
  padding-inline-start: 3rem;
}
.pr-ps-4 {
  padding-inline-start: 1rem;
}
.pr-ps-8 {
  padding-inline-start: 2rem;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
  Qh as Alert,
  tv as AlertDescription,
  ev as AlertTitle,
  Sv as BookChapterControl,
  st as Button,
  qh as Card,
  Kh as CardContent,
  Yh as CardDescription,
  Jh as CardFooter,
  Wh as CardHeader,
  Xh as CardTitle,
  Cv as ChapterRangeSelector,
  $s as Checkbox,
  Ev as Checklist,
  Qr as ComboBox,
  Rv as ContextMenu,
  fc as DropdownMenu,
  vc as DropdownMenuCheckboxItem,
  Ps as DropdownMenuContent,
  bv as DropdownMenuGroup,
  Os as DropdownMenuItem,
  Co as DropdownMenuLabel,
  wv as DropdownMenuPortal,
  xv as DropdownMenuRadioGroup,
  bc as DropdownMenuRadioItem,
  Ns as DropdownMenuSeparator,
  wc as DropdownMenuShortcut,
  yv as DropdownMenuSub,
  hc as DropdownMenuSubContent,
  mc as DropdownMenuSubTrigger,
  gc as DropdownMenuTrigger,
  Vg as GridMenu,
  $m as HamburgerMenuButton,
  kv as IconButton,
  Eo as Input,
  La as Label,
  Ht as LabelPosition,
  ka as MenuItem,
  Tv as RefSelector,
  Pv as ScriptureResultsViewer,
  Ov as SearchBar,
  nv as ShadCnSlider,
  rv as ShadCnSwitch,
  Nv as Slider,
  $v as Snackbar,
  _v as Switch,
  Mv as Table,
  Fv as Tabs,
  zh as TabsContent,
  Bh as TabsList,
  jh as TabsTrigger,
  sr as TextField,
  Iv as Toolbar,
  Hh as VerticalTabs,
  Uh as VerticalTabsContent,
  Gh as VerticalTabsList,
  Vv as VerticalTabsTrigger,
  $c as buttonVariants,
  Av as useEvent,
  Dv as useEventAsync,
  po as usePromise
};
//# sourceMappingURL=index.js.map
