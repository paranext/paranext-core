import Es, { jsxs as re, jsx as b, Fragment as Yn } from "react/jsx-runtime";
import * as k from "react";
import Z, { forwardRef as _a, useCallback as Pe, useState as Ee, useRef as yt, useEffect as zt, useLayoutEffect as Ro, useMemo as vn } from "react";
import { getChaptersForBook as Ia, offsetBook as $o, FIRST_SCR_BOOK_NUM as ks, offsetChapter as Mo, FIRST_SCR_CHAPTER_NUM as Ts, offsetVerse as _o, FIRST_SCR_VERSE_NUM as Ns } from "platform-bible-utils";
import * as me from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Os, Check as Aa, Circle as Cs, History as Ss, ArrowDownWideNarrow as Ps, Clock as Rs, Bookmark as $s, X as Ms, Search as _s, ChevronsUpDown as Is } from "lucide-react";
import ke, { clsx as As } from "clsx";
import { extendTailwindMerge as Ds } from "tailwind-merge";
import { Slot as js } from "@radix-ui/react-slot";
import { cva as Vr } from "class-variance-authority";
import { FormControlLabel as Io, FormLabel as Bs, Checkbox as Ls, MenuItem as Fs, ListItemText as Vs, ListItemIcon as Da, Menu as zs, Grid as ja, List as Us, IconButton as Ba, Drawer as Hs, Slider as Ws, Snackbar as qs, Switch as Xs, AppBar as Ys, Toolbar as Gs } from "@mui/material";
import * as un from "@radix-ui/react-popover";
import { Command as Me } from "cmdk";
import * as Ye from "@radix-ui/react-dialog";
import Ks, { ThemeContext as Js, internal_processStyles as Zs } from "@mui/styled-engine";
import * as Qs from "react-dom";
import Pn from "react-dom";
import * as La from "@radix-ui/react-label";
import el, { SelectColumn as tl } from "react-data-grid";
import * as _e from "@radix-ui/react-tabs";
import * as nn from "@radix-ui/react-slider";
import * as Cr from "@radix-ui/react-switch";
var nl = Object.defineProperty, rl = (e, t, n) => t in e ? nl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oe = (e, t, n) => rl(e, typeof t != "symbol" ? t + "" : t, n);
const xt = [
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
], zr = [
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
], Fa = [
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
], Ao = fl();
function Ut(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Ao ? Ao[e] : 0;
}
function Ur(e) {
  return Ut(e) > 0;
}
function ol(e) {
  const t = typeof e == "string" ? Ut(e) : e;
  return t >= 40 && t <= 66;
}
function al(e) {
  return (typeof e == "string" ? Ut(e) : e) <= 39;
}
function Va(e) {
  return e <= 66;
}
function il(e) {
  const t = typeof e == "string" ? Ut(e) : e;
  return Ha(t) && !Va(t);
}
function* sl() {
  for (let e = 1; e <= xt.length; e++)
    yield e;
}
const ll = 1, za = xt.length;
function cl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Hr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= xt.length ? t : xt[n];
}
function Ua(e) {
  return e <= 0 || e > za ? "******" : Fa[e - 1];
}
function pl(e) {
  return Ua(Ut(e));
}
function Ha(e) {
  const t = typeof e == "number" ? Hr(e) : e;
  return Ur(t) && !zr.includes(t);
}
function dl(e) {
  const t = typeof e == "number" ? Hr(e) : e;
  return Ur(t) && zr.includes(t);
}
function ul(e) {
  return Fa[e - 1].includes("*obsolete*");
}
function fl() {
  const e = {};
  for (let t = 0; t < xt.length; t++)
    e[xt[t]] = t + 1;
  return e;
}
const ue = {
  allBookIds: xt,
  nonCanonicalIds: zr,
  bookIdToNumber: Ut,
  isBookIdValid: Ur,
  isBookNT: ol,
  isBookOT: al,
  isBookOTNT: Va,
  isBookDC: il,
  allBookNumbers: sl,
  firstBook: ll,
  lastBook: za,
  extraBooks: cl,
  bookNumberToId: Hr,
  bookNumberToEnglishName: Ua,
  bookIdToEnglishName: pl,
  isCanonical: Ha,
  isExtraMaterial: dl,
  isObsolete: ul
};
var qe = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(qe || {});
const De = class {
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
oe(De, "Original", new De(qe.Original)), oe(De, "Septuagint", new De(qe.Septuagint)), oe(De, "Vulgate", new De(qe.Vulgate)), oe(De, "English", new De(qe.English)), oe(De, "RussianProtestant", new De(qe.RussianProtestant)), oe(De, "RussianOrthodox", new De(qe.RussianOrthodox));
let ht = De;
function Do(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Wa = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Wa || {});
const Se = class se {
  constructor(t, n, r, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, s = n != null && n instanceof ht ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = n != null && n instanceof ht ? n : void 0;
        this.setEmpty(a), this._verseNum = t % se.chapterDigitShifter, this._chapterNum = Math.floor(
          t % se.bookDigitShifter / se.chapterDigitShifter
        ), this._bookNum = Math.floor(t / se.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof se) {
          const a = t;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (t == null)
            return;
          const a = t instanceof ht ? t : se.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? se.defaultVersification;
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
      return n = new se(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Kt)
        return n = new se(), { success: !1, verseRef: n };
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
    return t % se.bcvMaxValue * se.bookDigitShifter + (n >= 0 ? n % se.bcvMaxValue * se.chapterDigitShifter : 0) + (r >= 0 ? r % se.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: s } = t, l = a || o.toString();
    let c;
    return s && (c = new ht(s)), n ? new se(n, r.toString(), l, c) : new se();
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
      if (n = n * 10 + +r - 0, n > se.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(se.verseRangeSeparator) || this._verse.includes(se.verseSequenceIndicator));
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
    const { success: n, vNum: r } = se.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = se.tryGetVerseNum(this._verse));
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
    this.versification = this.versification != null ? new ht(t) : void 0;
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
          this.versification = new ht(qe[s]);
        } catch {
          throw new Kt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Kt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ue.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !se.isVerseParseable(r[1]))
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
  allVerses(t = !1, n = se.verseRangeSeparators, r = se.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = Do(this._verse, r);
    for (const s of a.map((l) => Do(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const p = this.clone();
        if (p.verse = s[1], !t)
          for (let d = c + 1; d < p.verseNum; d++) {
            const f = new se(
              this._bookNum,
              this._chapterNum,
              d,
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
      const a = o.internalValid;
      if (a !== 0)
        return a;
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
  setEmpty(t = se.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = ue.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
oe(Se, "defaultVersification", ht.English), oe(Se, "verseRangeSeparator", "-"), oe(Se, "verseSequenceIndicator", ","), oe(Se, "verseRangeSeparators", [Se.verseRangeSeparator]), oe(Se, "verseSequenceIndicators", [Se.verseSequenceIndicator]), oe(Se, "chapterDigitShifter", 1e3), oe(Se, "bookDigitShifter", Se.chapterDigitShifter * Se.chapterDigitShifter), oe(Se, "bcvMaxValue", Se.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(Se, "ValidStatusType", Wa);
class Kt extends Error {
}
const ml = Ds({ prefix: "pr-" });
function Y(...e) {
  return ml(As(e));
}
const hl = me.Root, gl = me.Trigger, Th = me.Group, Nh = me.Portal, Oh = me.Sub, Ch = me.RadioGroup, bl = Z.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ re(
  me.SubTrigger,
  {
    ref: o,
    className: Y(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ b(Os, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
bl.displayName = me.SubTrigger.displayName;
const vl = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  me.SubContent,
  {
    ref: n,
    className: Y(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
vl.displayName = me.SubContent.displayName;
const qa = Z.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ b(me.Portal, { children: /* @__PURE__ */ b(
  me.Content,
  {
    ref: r,
    sideOffset: t,
    className: Y(
      /* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
qa.displayName = me.Content.displayName;
const Xa = Z.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ b(
  me.Item,
  {
    ref: r,
    className: Y(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
Xa.displayName = me.Item.displayName;
const yl = Z.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ re(
  me.CheckboxItem,
  {
    ref: o,
    className: Y(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ b("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ b(me.ItemIndicator, { children: /* @__PURE__ */ b(Aa, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
yl.displayName = me.CheckboxItem.displayName;
const wl = Z.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ re(
  me.RadioItem,
  {
    ref: r,
    className: Y(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ b("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ b(me.ItemIndicator, { children: /* @__PURE__ */ b(Cs, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
wl.displayName = me.RadioItem.displayName;
const Wr = Z.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ b(
  me.Label,
  {
    ref: r,
    className: Y("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
Wr.displayName = me.Label.displayName;
const Ya = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  me.Separator,
  {
    ref: n,
    className: Y("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Ya.displayName = me.Separator.displayName;
function xl({ className: e, ...t }) {
  return /* @__PURE__ */ b(
    "span",
    {
      className: Y("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
xl.displayName = "DropdownMenuShortcut";
const qr = Z.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ b(
    "input",
    {
      type: t,
      className: Y(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
qr.displayName = "Input";
const El = _a(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, a) => /* @__PURE__ */ re("div", { className: "pr-relative", children: [
    /* @__PURE__ */ b(
      qr,
      {
        ...o,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",
        onChange: (s) => e(s.target.value),
        onKeyDown: (s) => {
          s.key === "Enter" && r(), t(s);
        },
        onClick: n,
        ref: a
      }
    ),
    /* @__PURE__ */ b(
      Ss,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function kl({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (l, c) => c + 1), s = Pe(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ b("div", { className: Y("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ b(
    "div",
    {
      className: Y(
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
const Tl = _a(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: s
  }, l) => /* @__PURE__ */ re(
    Xa,
    {
      ref: l,
      textValue: e,
      className: Y("pr-font-normal pr-text-slate-700", {
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
        /* @__PURE__ */ b(
          "span",
          {
            className: Y(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": a.toLowerCase() === "ot",
                "pr-border-l-purple-200": a.toLowerCase() === "nt",
                "pr-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: ue.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ b("div", { children: s })
      ]
    },
    e
  )
);
function Nl({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ re(Wr, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ b("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ re("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ b(
        Ps,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ b(
        Rs,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ b(
        $s,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const sn = ue.allBookIds, Ol = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, jo = ["OT", "NT", "DC"], Cl = 32 + 32 + 32, Sl = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Pl = (e) => ({
  OT: sn.filter((n) => ue.isBookOT(n)),
  NT: sn.filter((n) => ue.isBookNT(n)),
  DC: sn.filter((n) => ue.isBookDC(n))
})[e], Jt = (e) => Ia(ue.bookIdToNumber(e));
function Rl() {
  return sn.map((t) => ue.bookIdToEnglishName(t));
}
function $l(e) {
  return Rl().includes(e);
}
function Ml(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if ($l(t))
    return sn.find((r) => ue.bookIdToEnglishName(r) === t);
}
function Sh({ scrRef: e, handleSubmit: t }) {
  const [n, r] = Ee(""), [o, a] = Ee(
    ue.bookNumberToId(e.bookNum)
  ), [s, l] = Ee(e.chapterNum ?? 0), [c, p] = Ee(
    ue.bookNumberToId(e.bookNum)
  ), [d, f] = Ee(!1), [u, v] = Ee(d), y = yt(void 0), g = yt(void 0), m = yt(void 0), E = Pe(
    (C) => Pl(C).filter((R) => {
      const $ = ue.bookIdToEnglishName(R).toLowerCase(), j = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return $.includes(j) || // Match book name
      R.toLowerCase().includes(j);
    }),
    [n]
  ), _ = (C) => {
    r(C);
  }, w = yt(!1), x = Pe((C) => {
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
      a(o !== C ? C : ""), f(!R);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), O = (C) => {
    C <= 0 || C > Jt(o) || h(o, !0, C);
  }, S = Pe(() => {
    Sl.forEach((C) => {
      const R = n.match(C);
      if (R) {
        const [$, j = void 0, D = void 0] = R.slice(1), M = Ml($);
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
      d ? (C.key === "ArrowDown" || C.key === "ArrowUp") && (typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null ? m.current.focus() : typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null && g.current.focus(), C.preventDefault()) : f(!0);
    },
    [d]
  ), B = (C) => {
    const { key: R } = C;
    R === "ArrowRight" || R === "ArrowLeft" || R === "ArrowDown" || R === "ArrowUp" || R === "Enter" || (y.current.dispatchEvent(new KeyboardEvent("keydown", { key: R })), y.current.focus());
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
  }, [c, e.bookNum, e.chapterNum, o]), Ro(() => {
    v(d);
  }, [d]), Ro(() => {
    const C = setTimeout(() => {
      if (u && g.current && m.current) {
        const $ = m.current.offsetTop - Cl;
        g.current.scrollTo({ top: $, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(C);
    };
  }, [u]), /* @__PURE__ */ b("div", { className: "pr-flex", children: /* @__PURE__ */ re(hl, { modal: !1, open: d, onOpenChange: x, children: [
    /* @__PURE__ */ b(gl, { asChild: !0, children: /* @__PURE__ */ b(
      El,
      {
        ref: y,
        value: n,
        handleSearch: _,
        handleKeyDown: L,
        handleOnClick: () => {
          a(ue.bookNumberToId(e.bookNum)), p(ue.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), f(!0), y.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: S,
        placeholder: `${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ re(
      qa,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: B,
        align: "start",
        ref: g,
        children: [
          /* @__PURE__ */ b(
            Nl,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          jo.map(
            (C, R) => E(C).length > 0 && /* @__PURE__ */ re("div", { children: [
              /* @__PURE__ */ b(Wr, { className: "pr-font-semibold pr-text-slate-700", children: Ol[C] }),
              E(C).map(($) => /* @__PURE__ */ b("div", { children: /* @__PURE__ */ b(
                Tl,
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
                  children: /* @__PURE__ */ b(
                    kl,
                    {
                      handleSelectChapter: O,
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
              jo.length - 1 !== R ? /* @__PURE__ */ b(Ya, {}) : void 0
            ] }, C)
          )
        ]
      }
    )
  ] }) });
}
const _l = Vr(
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
), lt = Z.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ b(r ? js : "button", { className: Y(_l({ variant: t, size: n, className: e })), ref: a, ...o })
);
lt.displayName = "Button";
const Il = un.Root, Al = un.Trigger, Ga = Z.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ b(un.Portal, { children: /* @__PURE__ */ b(
  un.Content,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: Y(
      "pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
Ga.displayName = un.Content.displayName;
const Dl = Ye.Portal, Ka = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Ye.Overlay,
  {
    ref: n,
    className: Y(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...t
  }
));
Ka.displayName = Ye.Overlay.displayName;
const jl = Z.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ re(Dl, { children: [
  /* @__PURE__ */ b(Ka, {}),
  /* @__PURE__ */ re(
    Ye.Content,
    {
      ref: r,
      className: Y(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ re(Ye.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ b(Ms, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ b("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
jl.displayName = Ye.Content.displayName;
const Bl = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Ye.Title,
  {
    ref: n,
    className: Y("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
Bl.displayName = Ye.Title.displayName;
const Ll = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Ye.Description,
  {
    ref: n,
    className: Y("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Ll.displayName = Ye.Description.displayName;
const Ja = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Me,
  {
    ref: n,
    className: Y(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...t
  }
));
Ja.displayName = Me.displayName;
const Za = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ re("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ b(_s, { className: "pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ b(
    Me.Input,
    {
      ref: n,
      className: Y(
        "pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
Za.displayName = Me.Input.displayName;
const Qa = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Me.List,
  {
    ref: n,
    className: Y("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
Qa.displayName = Me.List.displayName;
const ei = Z.forwardRef((e, t) => /* @__PURE__ */ b(Me.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
ei.displayName = Me.Empty.displayName;
const Fl = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Me.Group,
  {
    ref: n,
    className: Y(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Fl.displayName = Me.Group.displayName;
const Vl = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Me.Separator,
  {
    ref: n,
    className: Y("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
Vl.displayName = Me.Separator.displayName;
const ti = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Me.Item,
  {
    ref: n,
    className: Y(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...t
  }
));
ti.displayName = Me.Item.displayName;
function zl(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function Sr({
  id: e,
  options: t = [],
  className: n,
  value: r,
  onChange: o = () => {
  },
  getOptionLabel: a = zl,
  buttonPlaceholder: s = "",
  textPlaceholder: l = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: p = "outline"
}) {
  const [d, f] = Ee(!1);
  return /* @__PURE__ */ re(Il, { open: d, onOpenChange: f, children: [
    /* @__PURE__ */ b(Al, { asChild: !0, children: /* @__PURE__ */ re(
      lt,
      {
        variant: p,
        role: "combobox",
        "aria-expanded": d,
        id: e,
        className: Y("pr-w-[200px] pr-justify-between", n),
        children: [
          r ? a(r) : s,
          /* @__PURE__ */ b(Is, { className: "pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ b(Ga, { className: "pr-w-[200px] pr-p-0", children: /* @__PURE__ */ re(Ja, { children: [
      /* @__PURE__ */ b(Za, { placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ b(ei, { children: c }),
      /* @__PURE__ */ b(Qa, { children: t.map((u) => /* @__PURE__ */ re(
        ti,
        {
          value: a(u),
          onSelect: () => {
            o(u), f(!1);
          },
          children: [
            /* @__PURE__ */ b(
              Aa,
              {
                className: Y("pr-mr-2 pr-h-4 pr-w-4", {
                  "pr-opacity-0": !r || a(r) !== a(u)
                })
              }
            ),
            a(u)
          ]
        },
        a(u)
      )) })
    ] }) })
  ] });
}
function Ph({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, a] = Ee(1), [s, l] = Ee(r), [c, p] = Ee(
    Array.from({ length: r }, (u, v) => v + 1)
  );
  return zt(() => {
    a(1), e(1), l(r), t(r), p(Array.from({ length: r }, (u, v) => v + 1));
  }, [r, t, e]), /* @__PURE__ */ re(Yn, { children: [
    /* @__PURE__ */ b(
      Io,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ b(
          Sr,
          {
            onChange: (u) => {
              a(u), e(u), u > s && (l(u), t(u));
            },
            className: "book-selection-chapter",
            options: c,
            getOptionLabel: (u) => u.toString(),
            value: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ b(
      Io,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ b(
          Sr,
          {
            onChange: (u) => {
              l(u), t(u), u < o && (a(u), e(u));
            },
            className: "book-selection-chapter",
            options: c,
            getOptionLabel: (u) => u.toString(),
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
var _t = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(_t || {});
function ni({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = _t.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: s = !1,
  hasError: l = !1,
  className: c,
  onChange: p
}) {
  const d = /* @__PURE__ */ b(
    Ls,
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
  let f;
  if (n) {
    const u = r === _t.Before || r === _t.Above, v = /* @__PURE__ */ b("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), y = r === _t.Before || r === _t.After, g = y ? v : /* @__PURE__ */ b("div", { children: v }), m = y ? d : /* @__PURE__ */ b("div", { children: d });
    f = /* @__PURE__ */ re(
      Bs,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: l,
        children: [
          u && g,
          m,
          !u && g
        ]
      }
    );
  } else
    f = d;
  return f;
}
function Rh({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: s
}) {
  return /* @__PURE__ */ re("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ b("legend", { children: n }),
    r.map((l) => /* @__PURE__ */ b(
      ni,
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
  var n = {}, r = Object.keys(e), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
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
function Ul(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Hl(e) {
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
var Pr = { exports: {} }, Rn = { exports: {} }, le = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bo;
function Wl() {
  if (Bo)
    return le;
  Bo = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, u = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, _ = e ? Symbol.for("react.scope") : 60119;
  function w(h) {
    if (typeof h == "object" && h !== null) {
      var O = h.$$typeof;
      switch (O) {
        case t:
          switch (h = h.type, h) {
            case c:
            case p:
            case r:
            case a:
            case o:
            case f:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case d:
                case y:
                case v:
                case s:
                  return h;
                default:
                  return O;
              }
          }
        case n:
          return O;
      }
    }
  }
  function x(h) {
    return w(h) === p;
  }
  return le.AsyncMode = c, le.ConcurrentMode = p, le.ContextConsumer = l, le.ContextProvider = s, le.Element = t, le.ForwardRef = d, le.Fragment = r, le.Lazy = y, le.Memo = v, le.Portal = n, le.Profiler = a, le.StrictMode = o, le.Suspense = f, le.isAsyncMode = function(h) {
    return x(h) || w(h) === c;
  }, le.isConcurrentMode = x, le.isContextConsumer = function(h) {
    return w(h) === l;
  }, le.isContextProvider = function(h) {
    return w(h) === s;
  }, le.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, le.isForwardRef = function(h) {
    return w(h) === d;
  }, le.isFragment = function(h) {
    return w(h) === r;
  }, le.isLazy = function(h) {
    return w(h) === y;
  }, le.isMemo = function(h) {
    return w(h) === v;
  }, le.isPortal = function(h) {
    return w(h) === n;
  }, le.isProfiler = function(h) {
    return w(h) === a;
  }, le.isStrictMode = function(h) {
    return w(h) === o;
  }, le.isSuspense = function(h) {
    return w(h) === f;
  }, le.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === r || h === p || h === a || h === o || h === f || h === u || typeof h == "object" && h !== null && (h.$$typeof === y || h.$$typeof === v || h.$$typeof === s || h.$$typeof === l || h.$$typeof === d || h.$$typeof === m || h.$$typeof === E || h.$$typeof === _ || h.$$typeof === g);
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
var Lo;
function ql() {
  return Lo || (Lo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, u = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, _ = e ? Symbol.for("react.scope") : 60119;
    function w(I) {
      return typeof I == "string" || typeof I == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      I === r || I === p || I === a || I === o || I === f || I === u || typeof I == "object" && I !== null && (I.$$typeof === y || I.$$typeof === v || I.$$typeof === s || I.$$typeof === l || I.$$typeof === d || I.$$typeof === m || I.$$typeof === E || I.$$typeof === _ || I.$$typeof === g);
    }
    function x(I) {
      if (typeof I == "object" && I !== null) {
        var Q = I.$$typeof;
        switch (Q) {
          case t:
            var P = I.type;
            switch (P) {
              case c:
              case p:
              case r:
              case a:
              case o:
              case f:
                return P;
              default:
                var ie = P && P.$$typeof;
                switch (ie) {
                  case l:
                  case d:
                  case y:
                  case v:
                  case s:
                    return ie;
                  default:
                    return Q;
                }
            }
          case n:
            return Q;
        }
      }
    }
    var h = c, O = p, S = l, L = s, B = t, F = d, C = r, R = y, $ = v, j = n, D = a, M = o, V = f, te = !1;
    function ee(I) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), N(I) || x(I) === c;
    }
    function N(I) {
      return x(I) === p;
    }
    function A(I) {
      return x(I) === l;
    }
    function U(I) {
      return x(I) === s;
    }
    function G(I) {
      return typeof I == "object" && I !== null && I.$$typeof === t;
    }
    function z(I) {
      return x(I) === d;
    }
    function H(I) {
      return x(I) === r;
    }
    function q(I) {
      return x(I) === y;
    }
    function X(I) {
      return x(I) === v;
    }
    function W(I) {
      return x(I) === n;
    }
    function K(I) {
      return x(I) === a;
    }
    function J(I) {
      return x(I) === o;
    }
    function ae(I) {
      return x(I) === f;
    }
    ce.AsyncMode = h, ce.ConcurrentMode = O, ce.ContextConsumer = S, ce.ContextProvider = L, ce.Element = B, ce.ForwardRef = F, ce.Fragment = C, ce.Lazy = R, ce.Memo = $, ce.Portal = j, ce.Profiler = D, ce.StrictMode = M, ce.Suspense = V, ce.isAsyncMode = ee, ce.isConcurrentMode = N, ce.isContextConsumer = A, ce.isContextProvider = U, ce.isElement = G, ce.isForwardRef = z, ce.isFragment = H, ce.isLazy = q, ce.isMemo = X, ce.isPortal = W, ce.isProfiler = K, ce.isStrictMode = J, ce.isSuspense = ae, ce.isValidElementType = w, ce.typeOf = x;
  }()), ce;
}
var Fo;
function ri() {
  return Fo || (Fo = 1, process.env.NODE_ENV === "production" ? Rn.exports = Wl() : Rn.exports = ql()), Rn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ur, Vo;
function Xl() {
  if (Vo)
    return ur;
  Vo = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(a) {
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
      var c = Object.getOwnPropertyNames(s).map(function(d) {
        return s[d];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var p = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        p[d] = d;
      }), Object.keys(Object.assign({}, p)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ur = o() ? Object.assign : function(a, s) {
    for (var l, c = r(a), p, d = 1; d < arguments.length; d++) {
      l = Object(arguments[d]);
      for (var f in l)
        t.call(l, f) && (c[f] = l[f]);
      if (e) {
        p = e(l);
        for (var u = 0; u < p.length; u++)
          n.call(l, p[u]) && (c[p[u]] = l[p[u]]);
      }
    }
    return c;
  }, ur;
}
var fr, zo;
function Xr() {
  if (zo)
    return fr;
  zo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return fr = e, fr;
}
var mr, Uo;
function oi() {
  return Uo || (Uo = 1, mr = Function.call.bind(Object.prototype.hasOwnProperty)), mr;
}
var hr, Ho;
function Yl() {
  if (Ho)
    return hr;
  Ho = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Xr(), n = {}, r = oi();
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
      for (var d in a)
        if (r(a, d)) {
          var f;
          try {
            if (typeof a[d] != "function") {
              var u = Error(
                (c || "React class") + ": " + l + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw u.name = "Invariant Violation", u;
            }
            f = a[d](s, d, c, l, null, t);
          } catch (y) {
            f = y;
          }
          if (f && !(f instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in n)) {
            n[f.message] = !0;
            var v = p ? p() : "";
            e(
              "Failed " + l + " type: " + f.message + (v ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, hr = o, hr;
}
var gr, Wo;
function Gl() {
  if (Wo)
    return gr;
  Wo = 1;
  var e = ri(), t = Xl(), n = Xr(), r = oi(), o = Yl(), a = function() {
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
  return gr = function(l, c) {
    var p = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function f(N) {
      var A = N && (p && N[p] || N[d]);
      if (typeof A == "function")
        return A;
    }
    var u = "<<anonymous>>", v = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: _(),
      arrayOf: w,
      element: x(),
      elementType: h(),
      instanceOf: O,
      node: F(),
      objectOf: L,
      oneOf: S,
      oneOfType: B,
      shape: R,
      exact: $
    };
    function y(N, A) {
      return N === A ? N !== 0 || 1 / N === 1 / A : N !== N && A !== A;
    }
    function g(N, A) {
      this.message = N, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function m(N) {
      if (process.env.NODE_ENV !== "production")
        var A = {}, U = 0;
      function G(H, q, X, W, K, J, ae) {
        if (W = W || u, J = J || X, ae !== n) {
          if (c) {
            var I = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw I.name = "Invariant Violation", I;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Q = W + ":" + X;
            !A[Q] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + J + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[Q] = !0, U++);
          }
        }
        return q[X] == null ? H ? q[X] === null ? new g("The " + K + " `" + J + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new g("The " + K + " `" + J + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : N(q, X, W, K, J);
      }
      var z = G.bind(null, !1);
      return z.isRequired = G.bind(null, !0), z;
    }
    function E(N) {
      function A(U, G, z, H, q, X) {
        var W = U[G], K = M(W);
        if (K !== N) {
          var J = V(W);
          return new g(
            "Invalid " + H + " `" + q + "` of type " + ("`" + J + "` supplied to `" + z + "`, expected ") + ("`" + N + "`."),
            { expectedType: N }
          );
        }
        return null;
      }
      return m(A);
    }
    function _() {
      return m(s);
    }
    function w(N) {
      function A(U, G, z, H, q) {
        if (typeof N != "function")
          return new g("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var X = U[G];
        if (!Array.isArray(X)) {
          var W = M(X);
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an array."));
        }
        for (var K = 0; K < X.length; K++) {
          var J = N(X, K, z, H, q + "[" + K + "]", n);
          if (J instanceof Error)
            return J;
        }
        return null;
      }
      return m(A);
    }
    function x() {
      function N(A, U, G, z, H) {
        var q = A[U];
        if (!l(q)) {
          var X = M(q);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + X + "` supplied to `" + G + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(N);
    }
    function h() {
      function N(A, U, G, z, H) {
        var q = A[U];
        if (!e.isValidElementType(q)) {
          var X = M(q);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + X + "` supplied to `" + G + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(N);
    }
    function O(N) {
      function A(U, G, z, H, q) {
        if (!(U[G] instanceof N)) {
          var X = N.name || u, W = ee(U[G]);
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected ") + ("instance of `" + X + "`."));
        }
        return null;
      }
      return m(A);
    }
    function S(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function A(U, G, z, H, q) {
        for (var X = U[G], W = 0; W < N.length; W++)
          if (y(X, N[W]))
            return null;
        var K = JSON.stringify(N, function(ae, I) {
          var Q = V(I);
          return Q === "symbol" ? String(I) : I;
        });
        return new g("Invalid " + H + " `" + q + "` of value `" + String(X) + "` " + ("supplied to `" + z + "`, expected one of " + K + "."));
      }
      return m(A);
    }
    function L(N) {
      function A(U, G, z, H, q) {
        if (typeof N != "function")
          return new g("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var X = U[G], W = M(X);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an object."));
        for (var K in X)
          if (r(X, K)) {
            var J = N(X, K, z, H, q + "." + K, n);
            if (J instanceof Error)
              return J;
          }
        return null;
      }
      return m(A);
    }
    function B(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var A = 0; A < N.length; A++) {
        var U = N[A];
        if (typeof U != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + te(U) + " at index " + A + "."
          ), s;
      }
      function G(z, H, q, X, W) {
        for (var K = [], J = 0; J < N.length; J++) {
          var ae = N[J], I = ae(z, H, q, X, W, n);
          if (I == null)
            return null;
          I.data && r(I.data, "expectedType") && K.push(I.data.expectedType);
        }
        var Q = K.length > 0 ? ", expected one of type [" + K.join(", ") + "]" : "";
        return new g("Invalid " + X + " `" + W + "` supplied to " + ("`" + q + "`" + Q + "."));
      }
      return m(G);
    }
    function F() {
      function N(A, U, G, z, H) {
        return j(A[U]) ? null : new g("Invalid " + z + " `" + H + "` supplied to " + ("`" + G + "`, expected a ReactNode."));
      }
      return m(N);
    }
    function C(N, A, U, G, z) {
      return new g(
        (N || "React class") + ": " + A + " type `" + U + "." + G + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function R(N) {
      function A(U, G, z, H, q) {
        var X = U[G], W = M(X);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var K in N) {
          var J = N[K];
          if (typeof J != "function")
            return C(z, H, q, K, V(J));
          var ae = J(X, K, z, H, q + "." + K, n);
          if (ae)
            return ae;
        }
        return null;
      }
      return m(A);
    }
    function $(N) {
      function A(U, G, z, H, q) {
        var X = U[G], W = M(X);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        var K = t({}, U[G], N);
        for (var J in K) {
          var ae = N[J];
          if (r(N, J) && typeof ae != "function")
            return C(z, H, q, J, V(ae));
          if (!ae)
            return new g(
              "Invalid " + H + " `" + q + "` key `" + J + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(U[G], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(N), null, "  ")
            );
          var I = ae(X, J, z, H, q + "." + J, n);
          if (I)
            return I;
        }
        return null;
      }
      return m(A);
    }
    function j(N) {
      switch (typeof N) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !N;
        case "object":
          if (Array.isArray(N))
            return N.every(j);
          if (N === null || l(N))
            return !0;
          var A = f(N);
          if (A) {
            var U = A.call(N), G;
            if (A !== N.entries) {
              for (; !(G = U.next()).done; )
                if (!j(G.value))
                  return !1;
            } else
              for (; !(G = U.next()).done; ) {
                var z = G.value;
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
    function D(N, A) {
      return N === "symbol" ? !0 : A ? A["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && A instanceof Symbol : !1;
    }
    function M(N) {
      var A = typeof N;
      return Array.isArray(N) ? "array" : N instanceof RegExp ? "object" : D(A, N) ? "symbol" : A;
    }
    function V(N) {
      if (typeof N > "u" || N === null)
        return "" + N;
      var A = M(N);
      if (A === "object") {
        if (N instanceof Date)
          return "date";
        if (N instanceof RegExp)
          return "regexp";
      }
      return A;
    }
    function te(N) {
      var A = V(N);
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
    function ee(N) {
      return !N.constructor || !N.constructor.name ? u : N.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, gr;
}
var br, qo;
function Kl() {
  if (qo)
    return br;
  qo = 1;
  var e = Xr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, br = function() {
    function r(s, l, c, p, d, f) {
      if (f !== e) {
        var u = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw u.name = "Invariant Violation", u;
      }
    }
    r.isRequired = r;
    function o() {
      return r;
    }
    var a = {
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
    return a.PropTypes = a, a;
  }, br;
}
if (process.env.NODE_ENV !== "production") {
  var Jl = ri(), Zl = !0;
  Pr.exports = Gl()(Jl.isElement, Zl);
} else
  Pr.exports = Kl()();
var Ql = Pr.exports;
const i = /* @__PURE__ */ Ul(Ql);
function Ht(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function vt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function ai(e) {
  if (!vt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = ai(e[n]);
  }), t;
}
function tt(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? T({}, e) : e;
  return vt(e) && vt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (vt(t[o]) && o in e && vt(e[o]) ? r[o] = tt(e[o], t[o], n) : n.clone ? r[o] = vt(t[o]) ? ai(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function ec(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ii(e, t, n, r, o) {
  const a = e[t], s = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !ec(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const si = Ht(i.element, ii);
si.isRequired = Ht(i.element.isRequired, ii);
const yn = si;
function tc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function nc(e, t, n, r, o) {
  const a = e[t], s = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !tc(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const rc = Ht(i.elementType, nc), oc = "exact-prop: ​";
function li(e) {
  return process.env.NODE_ENV === "production" ? e : T({}, e, {
    [oc]: (t) => {
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
var Rr = { exports: {} }, pe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xo;
function ac() {
  if (Xo)
    return pe;
  Xo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function g(m) {
    if (typeof m == "object" && m !== null) {
      var E = m.$$typeof;
      switch (E) {
        case e:
          switch (m = m.type, m) {
            case n:
            case o:
            case r:
            case p:
            case d:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case s:
                case c:
                case u:
                case f:
                case a:
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
  return pe.ContextConsumer = s, pe.ContextProvider = a, pe.Element = e, pe.ForwardRef = c, pe.Fragment = n, pe.Lazy = u, pe.Memo = f, pe.Portal = t, pe.Profiler = o, pe.StrictMode = r, pe.Suspense = p, pe.SuspenseList = d, pe.isAsyncMode = function() {
    return !1;
  }, pe.isConcurrentMode = function() {
    return !1;
  }, pe.isContextConsumer = function(m) {
    return g(m) === s;
  }, pe.isContextProvider = function(m) {
    return g(m) === a;
  }, pe.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, pe.isForwardRef = function(m) {
    return g(m) === c;
  }, pe.isFragment = function(m) {
    return g(m) === n;
  }, pe.isLazy = function(m) {
    return g(m) === u;
  }, pe.isMemo = function(m) {
    return g(m) === f;
  }, pe.isPortal = function(m) {
    return g(m) === t;
  }, pe.isProfiler = function(m) {
    return g(m) === o;
  }, pe.isStrictMode = function(m) {
    return g(m) === r;
  }, pe.isSuspense = function(m) {
    return g(m) === p;
  }, pe.isSuspenseList = function(m) {
    return g(m) === d;
  }, pe.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === n || m === o || m === r || m === p || m === d || m === v || typeof m == "object" && m !== null && (m.$$typeof === u || m.$$typeof === f || m.$$typeof === a || m.$$typeof === s || m.$$typeof === c || m.$$typeof === y || m.getModuleId !== void 0);
  }, pe.typeOf = g, pe;
}
var de = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yo;
function ic() {
  return Yo || (Yo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), y = !1, g = !1, m = !1, E = !1, _ = !1, w;
    w = Symbol.for("react.module.reference");
    function x(P) {
      return !!(typeof P == "string" || typeof P == "function" || P === n || P === o || _ || P === r || P === p || P === d || E || P === v || y || g || m || typeof P == "object" && P !== null && (P.$$typeof === u || P.$$typeof === f || P.$$typeof === a || P.$$typeof === s || P.$$typeof === c || // This needs to include all possible module reference object
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
              case d:
                return we;
              default:
                var Oe = we && we.$$typeof;
                switch (Oe) {
                  case l:
                  case s:
                  case c:
                  case u:
                  case f:
                  case a:
                    return Oe;
                  default:
                    return ie;
                }
            }
          case t:
            return ie;
        }
      }
    }
    var O = s, S = a, L = e, B = c, F = n, C = u, R = f, $ = t, j = o, D = r, M = p, V = d, te = !1, ee = !1;
    function N(P) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(P) {
      return ee || (ee = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(P) {
      return h(P) === s;
    }
    function G(P) {
      return h(P) === a;
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
      return h(P) === u;
    }
    function W(P) {
      return h(P) === f;
    }
    function K(P) {
      return h(P) === t;
    }
    function J(P) {
      return h(P) === o;
    }
    function ae(P) {
      return h(P) === r;
    }
    function I(P) {
      return h(P) === p;
    }
    function Q(P) {
      return h(P) === d;
    }
    de.ContextConsumer = O, de.ContextProvider = S, de.Element = L, de.ForwardRef = B, de.Fragment = F, de.Lazy = C, de.Memo = R, de.Portal = $, de.Profiler = j, de.StrictMode = D, de.Suspense = M, de.SuspenseList = V, de.isAsyncMode = N, de.isConcurrentMode = A, de.isContextConsumer = U, de.isContextProvider = G, de.isElement = z, de.isForwardRef = H, de.isFragment = q, de.isLazy = X, de.isMemo = W, de.isPortal = K, de.isProfiler = J, de.isStrictMode = ae, de.isSuspense = I, de.isSuspenseList = Q, de.isValidElementType = x, de.typeOf = h;
  }()), de;
}
process.env.NODE_ENV === "production" ? Rr.exports = ac() : Rr.exports = ic();
var Ln = Rr.exports;
const sc = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function lc(e) {
  const t = `${e}`.match(sc);
  return t && t[1] || "";
}
function ci(e, t = "") {
  return e.displayName || e.name || lc(e) || t;
}
function Go(e, t, n) {
  const r = ci(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function cc(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ci(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ln.ForwardRef:
          return Go(e, e.render, "ForwardRef");
        case Ln.Memo:
          return Go(e, e.type, "memo");
        default:
          return;
      }
  }
}
function nt(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], s = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const pc = i.oneOfType([i.func, i.object]), Yr = pc;
function Ge(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Dt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function $r(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function pi(e, t = 166) {
  let n;
  function r(...o) {
    const a = () => {
      e.apply(this, o);
    };
    clearTimeout(n), n = setTimeout(a, t);
  }
  return r.clear = () => {
    clearTimeout(n);
  }, r;
}
function dc(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function uc(e, t) {
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
function jt(e) {
  return Te(e).defaultView || window;
}
function fc(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? T({}, t.propTypes) : null;
  return (o) => (a, s, l, c, p, ...d) => {
    const f = p || s, u = n == null ? void 0 : n[f];
    if (u) {
      const v = u(a, s, l, c, p, ...d);
      if (v)
        return v;
    }
    return typeof a[s] < "u" && !a[o] ? new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Fn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const mc = typeof window < "u" ? k.useLayoutEffect : k.useEffect, Et = mc;
let Ko = 0;
function hc(e) {
  const [t, n] = k.useState(e), r = e || t;
  return k.useEffect(() => {
    t == null && (Ko += 1, n(`mui-${Ko}`));
  }, [t]), r;
}
const Jo = k["useId".toString()];
function di(e) {
  if (Jo !== void 0) {
    const t = Jo();
    return e ?? t;
  }
  return hc(e);
}
function gc(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function ui({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = k.useRef(e !== void 0), [a, s] = k.useState(t), l = o ? e : a;
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
function fn(e) {
  const t = k.useRef(e);
  return Et(() => {
    t.current = e;
  }), k.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function ze(...e) {
  return k.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Fn(n, t);
    });
  }, e);
}
const Zo = {};
function bc(e, t) {
  const n = k.useRef(Zo);
  return n.current === Zo && (n.current = e(t)), n;
}
const vc = [];
function yc(e) {
  k.useEffect(e, vc);
}
class wn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new wn();
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
function rn() {
  const e = bc(wn.create).current;
  return yc(e.disposeEffect), e;
}
let Gn = !0, Mr = !1;
const wc = new wn(), xc = {
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
function Ec(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && xc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function kc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Gn = !0);
}
function vr() {
  Gn = !1;
}
function Tc() {
  this.visibilityState === "hidden" && Mr && (Gn = !0);
}
function Nc(e) {
  e.addEventListener("keydown", kc, !0), e.addEventListener("mousedown", vr, !0), e.addEventListener("pointerdown", vr, !0), e.addEventListener("touchstart", vr, !0), e.addEventListener("visibilitychange", Tc, !0);
}
function Oc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Gn || Ec(t);
}
function fi() {
  const e = k.useCallback((o) => {
    o != null && Nc(o.ownerDocument);
  }, []), t = k.useRef(!1);
  function n() {
    return t.current ? (Mr = !0, wc.start(100, () => {
      Mr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Oc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function mi(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Cc(e) {
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
function Sc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Pc = Number.isInteger || Sc;
function hi(e, t, n, r) {
  const o = e[t];
  if (o == null || !Pc(o)) {
    const a = Cc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function gi(e, t, ...n) {
  return e[t] === void 0 ? null : hi(e, t, ...n);
}
function _r() {
  return null;
}
gi.isRequired = hi;
_r.isRequired = _r;
const bi = process.env.NODE_ENV === "production" ? _r : gi;
function vi(e, t) {
  const n = T({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = T({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, a = t[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = T({}, a), Object.keys(o).forEach((s) => {
        n[r][s] = vi(o[s], a[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function at(e, t, n = void 0) {
  const r = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = e[o].reduce((a, s) => {
        if (s) {
          const l = t(s);
          l !== "" && a.push(l), n && n[s] && a.push(n[s]);
        }
        return a;
      }, []).join(" ");
    }
  ), r;
}
const Qo = (e) => e, Rc = () => {
  let e = Qo;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Qo;
    }
  };
}, $c = Rc(), yi = $c, wi = {
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
function Je(e, t, n = "Mui") {
  const r = wi[t];
  return r ? `${n}-${r}` : `${yi.generate(e)}-${t}`;
}
function pt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Je(e, o, n);
  }), r;
}
function Mc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function xi(e) {
  return typeof e == "string";
}
function on(e, t, n) {
  return e === void 0 || xi(e) ? t : T({}, t, {
    ownerState: T({}, t.ownerState, n)
  });
}
const _c = {
  disableDefaultClasses: !1
}, Ic = /* @__PURE__ */ k.createContext(_c);
function Ac(e) {
  const {
    disableDefaultClasses: t
  } = k.useContext(Ic);
  return (n) => t ? "" : e(n);
}
function Ei(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Dc(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function ea(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function jc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const v = ke(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), y = T({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = T({}, n, o, r);
    return v.length > 0 && (g.className = v), Object.keys(y).length > 0 && (g.style = y), {
      props: g,
      internalRef: void 0
    };
  }
  const s = Ei(T({}, o, r)), l = ea(r), c = ea(o), p = t(s), d = ke(p == null ? void 0 : p.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = T({}, p == null ? void 0 : p.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), u = T({}, p, n, c, l);
  return d.length > 0 && (u.className = d), Object.keys(f).length > 0 && (u.style = f), {
    props: u,
    internalRef: p.ref
  };
}
const Bc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function kt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, s = fe(e, Bc), l = a ? {} : Dc(r, o), {
    props: c,
    internalRef: p
  } = jc(T({}, s, {
    externalSlotProps: l
  })), d = ze(p, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return on(n, T({}, c, {
    ref: d
  }), o);
}
const ki = "base";
function Lc(e) {
  return `${ki}--${e}`;
}
function Fc(e, t) {
  return `${ki}-${e}-${t}`;
}
function Ti(e, t) {
  const n = wi[t];
  return n ? Lc(n) : Fc(e, t);
}
function Vc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Ti(e, r);
  }), n;
}
const zc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Uc(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Hc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Wc(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Hc(e));
}
function qc(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(zc)).forEach((r, o) => {
    const a = Uc(r);
    a === -1 || !Wc(r) || (a === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: a,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Xc() {
  return !0;
}
function Vn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = qc,
    isEnabled: s = Xc,
    open: l
  } = e, c = k.useRef(!1), p = k.useRef(null), d = k.useRef(null), f = k.useRef(null), u = k.useRef(null), v = k.useRef(!1), y = k.useRef(null), g = ze(t.ref, y), m = k.useRef(null);
  k.useEffect(() => {
    !l || !y.current || (v.current = !n);
  }, [n, l]), k.useEffect(() => {
    if (!l || !y.current)
      return;
    const w = Te(y.current);
    return y.current.contains(w.activeElement) || (y.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), y.current.setAttribute("tabIndex", "-1")), v.current && y.current.focus()), () => {
      o || (f.current && f.current.focus && (c.current = !0, f.current.focus()), f.current = null);
    };
  }, [l]), k.useEffect(() => {
    if (!l || !y.current)
      return;
    const w = Te(y.current), x = (S) => {
      m.current = S, !(r || !s() || S.key !== "Tab") && w.activeElement === y.current && S.shiftKey && (c.current = !0, d.current && d.current.focus());
    }, h = () => {
      const S = y.current;
      if (S === null)
        return;
      if (!w.hasFocus() || !s() || c.current) {
        c.current = !1;
        return;
      }
      if (S.contains(w.activeElement) || r && w.activeElement !== p.current && w.activeElement !== d.current)
        return;
      if (w.activeElement !== u.current)
        u.current = null;
      else if (u.current !== null)
        return;
      if (!v.current)
        return;
      let L = [];
      if ((w.activeElement === p.current || w.activeElement === d.current) && (L = a(y.current)), L.length > 0) {
        var B, F;
        const C = !!((B = m.current) != null && B.shiftKey && ((F = m.current) == null ? void 0 : F.key) === "Tab"), R = L[0], $ = L[L.length - 1];
        typeof R != "string" && typeof $ != "string" && (C ? $.focus() : R.focus());
      } else
        S.focus();
    };
    w.addEventListener("focusin", h), w.addEventListener("keydown", x, !0);
    const O = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && h();
    }, 50);
    return () => {
      clearInterval(O), w.removeEventListener("focusin", h), w.removeEventListener("keydown", x, !0);
    };
  }, [n, r, o, s, l, a]);
  const E = (w) => {
    f.current === null && (f.current = w.relatedTarget), v.current = !0, u.current = w.target;
    const x = t.props.onFocus;
    x && x(w);
  }, _ = (w) => {
    f.current === null && (f.current = w.relatedTarget), v.current = !0;
  };
  return /* @__PURE__ */ re(k.Fragment, {
    children: [/* @__PURE__ */ b("div", {
      tabIndex: l ? 0 : -1,
      onFocus: _,
      ref: p,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ k.cloneElement(t, {
      ref: g,
      onFocus: E
    }), /* @__PURE__ */ b("div", {
      tabIndex: l ? 0 : -1,
      onFocus: _,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Vn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: yn,
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
process.env.NODE_ENV !== "production" && (Vn["propTypes"] = li(Vn.propTypes));
function Yc(e) {
  return typeof e == "function" ? e() : e;
}
const mn = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = t, [s, l] = k.useState(null), c = ze(/* @__PURE__ */ k.isValidElement(r) ? r.ref : null, n);
  if (Et(() => {
    a || l(Yc(o) || document.body);
  }, [o, a]), Et(() => {
    if (s && !a)
      return Fn(n, s), () => {
        Fn(n, null);
      };
  }, [n, s, a]), a) {
    if (/* @__PURE__ */ k.isValidElement(r)) {
      const p = {
        ref: c
      };
      return /* @__PURE__ */ k.cloneElement(r, p);
    }
    return /* @__PURE__ */ b(k.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ b(k.Fragment, {
    children: s && /* @__PURE__ */ Qs.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (mn.propTypes = {
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
  container: i.oneOfType([nt, i.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: i.bool
});
process.env.NODE_ENV !== "production" && (mn["propTypes"] = li(mn.propTypes));
function Gc(e) {
  const t = Te(e);
  return t.body === e ? jt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function ln(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function ta(e) {
  return parseInt(jt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Kc(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function na(e, t, n, r, o) {
  const a = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const l = a.indexOf(s) === -1, c = !Kc(s);
    l && c && ln(s, o);
  });
}
function yr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Jc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Gc(r)) {
      const s = mi(Te(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${ta(r) + s}px`;
      const l = Te(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${ta(c) + s}px`;
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment)
      a = Te(r).body;
    else {
      const s = r.parentElement, l = jt(r);
      a = (s == null ? void 0 : s.nodeName) === "HTML" && l.getComputedStyle(s).overflowY === "scroll" ? s : r;
    }
    n.push({
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
    n.forEach(({
      value: a,
      el: s,
      property: l
    }) => {
      a ? s.style.setProperty(l, a) : s.style.removeProperty(l);
    });
  };
}
function Zc(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Qc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && ln(t.modalRef, !1);
    const o = Zc(n);
    na(n, t.mount, t.modalRef, o, !0);
    const a = yr(this.containers, (s) => s.container === n);
    return a !== -1 ? (this.containers[a].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = yr(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Jc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = yr(this.containers, (s) => s.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && ln(t.modalRef, n), na(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = a.modals[a.modals.length - 1];
      s.modalRef && ln(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function ep(e) {
  return typeof e == "function" ? e() : e;
}
function tp(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const np = new Qc();
function rp(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = np,
    closeAfterTransition: a = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: p,
    open: d,
    rootRef: f
  } = e, u = k.useRef({}), v = k.useRef(null), y = k.useRef(null), g = ze(y, f), [m, E] = k.useState(!d), _ = tp(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const x = () => Te(v.current), h = () => (u.current.modalRef = y.current, u.current.mount = v.current, u.current), O = () => {
    o.mount(h(), {
      disableScrollLock: r
    }), y.current && (y.current.scrollTop = 0);
  }, S = fn(() => {
    const M = ep(t) || x().body;
    o.add(h(), M), y.current && O();
  }), L = k.useCallback(() => o.isTopModal(h()), [o]), B = fn((M) => {
    v.current = M, M && (d && L() ? O() : y.current && ln(y.current, w));
  }), F = k.useCallback(() => {
    o.remove(h(), w);
  }, [w, o]);
  k.useEffect(() => () => {
    F();
  }, [F]), k.useEffect(() => {
    d ? S() : (!_ || !a) && F();
  }, [d, F, _, a, S]);
  const C = (M) => (V) => {
    var te;
    (te = M.onKeyDown) == null || te.call(M, V), !(V.key !== "Escape" || V.which === 229 || // Wait until IME is settled.
    !L()) && (n || (V.stopPropagation(), p && p(V, "escapeKeyDown")));
  }, R = (M) => (V) => {
    var te;
    (te = M.onClick) == null || te.call(M, V), V.target === V.currentTarget && p && p(V, "backdropClick");
  };
  return {
    getRootProps: (M = {}) => {
      const V = Ei(e);
      delete V.onTransitionEnter, delete V.onTransitionExited;
      const te = T({}, V, M);
      return T({
        role: "presentation"
      }, te, {
        onKeyDown: C(te),
        ref: g
      });
    },
    getBackdropProps: (M = {}) => {
      const V = M;
      return T({
        "aria-hidden": !0
      }, V, {
        onClick: R(V),
        open: d
      });
    },
    getTransitionProps: () => {
      const M = () => {
        E(!1), s && s();
      }, V = () => {
        E(!0), l && l(), a && F();
      };
      return {
        onEnter: $r(M, c == null ? void 0 : c.props.onEnter),
        onExited: $r(V, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: g,
    portalRef: B,
    isTopModal: L,
    exited: m,
    hasTransition: _
  };
}
var Re = "top", Ue = "bottom", He = "right", $e = "left", Gr = "auto", xn = [Re, Ue, He, $e], Bt = "start", hn = "end", op = "clippingParents", Ni = "viewport", Zt = "popper", ap = "reference", ra = /* @__PURE__ */ xn.reduce(function(e, t) {
  return e.concat([t + "-" + Bt, t + "-" + hn]);
}, []), Oi = /* @__PURE__ */ [].concat(xn, [Gr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Bt, t + "-" + hn]);
}, []), ip = "beforeRead", sp = "read", lp = "afterRead", cp = "beforeMain", pp = "main", dp = "afterMain", up = "beforeWrite", fp = "write", mp = "afterWrite", hp = [ip, sp, lp, cp, pp, dp, up, fp, mp];
function Ke(e) {
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
function Tt(e) {
  var t = Be(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ve(e) {
  var t = Be(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Kr(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Be(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function gp(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, a = t.elements[n];
    !Ve(a) || !Ke(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function bp(e) {
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
      var o = t.elements[r], a = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = s.reduce(function(c, p) {
        return c[p] = "", c;
      }, {});
      !Ve(o) || !Ke(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const vp = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: gp,
  effect: bp,
  requires: ["computeStyles"]
};
function Xe(e) {
  return e.split("-")[0];
}
var wt = Math.max, zn = Math.min, Lt = Math.round;
function Ir() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ci() {
  return !/^((?!chrome|android).)*safari/i.test(Ir());
}
function Ft(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, a = 1;
  t && Ve(e) && (o = e.offsetWidth > 0 && Lt(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Lt(r.height) / e.offsetHeight || 1);
  var s = Tt(e) ? Be(e) : window, l = s.visualViewport, c = !Ci() && n, p = (r.left + (c && l ? l.offsetLeft : 0)) / o, d = (r.top + (c && l ? l.offsetTop : 0)) / a, f = r.width / o, u = r.height / a;
  return {
    width: f,
    height: u,
    top: d,
    right: p + f,
    bottom: d + u,
    left: p,
    x: p,
    y: d
  };
}
function Jr(e) {
  var t = Ft(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Si(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Kr(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function rt(e) {
  return Be(e).getComputedStyle(e);
}
function yp(e) {
  return ["table", "td", "th"].indexOf(Ke(e)) >= 0;
}
function dt(e) {
  return ((Tt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Kn(e) {
  return Ke(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Kr(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    dt(e)
  );
}
function oa(e) {
  return !Ve(e) || // https://github.com/popperjs/popper-core/issues/837
  rt(e).position === "fixed" ? null : e.offsetParent;
}
function wp(e) {
  var t = /firefox/i.test(Ir()), n = /Trident/i.test(Ir());
  if (n && Ve(e)) {
    var r = rt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Kn(e);
  for (Kr(o) && (o = o.host); Ve(o) && ["html", "body"].indexOf(Ke(o)) < 0; ) {
    var a = rt(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function En(e) {
  for (var t = Be(e), n = oa(e); n && yp(n) && rt(n).position === "static"; )
    n = oa(n);
  return n && (Ke(n) === "html" || Ke(n) === "body" && rt(n).position === "static") ? t : n || wp(e) || t;
}
function Zr(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function cn(e, t, n) {
  return wt(e, zn(t, n));
}
function xp(e, t, n) {
  var r = cn(e, t, n);
  return r > n ? n : r;
}
function Pi() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ri(e) {
  return Object.assign({}, Pi(), e);
}
function $i(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Ep = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Ri(typeof t != "number" ? t : $i(t, xn));
};
function kp(e) {
  var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Xe(n.placement), c = Zr(l), p = [$e, He].indexOf(l) >= 0, d = p ? "height" : "width";
  if (!(!a || !s)) {
    var f = Ep(o.padding, n), u = Jr(a), v = c === "y" ? Re : $e, y = c === "y" ? Ue : He, g = n.rects.reference[d] + n.rects.reference[c] - s[c] - n.rects.popper[d], m = s[c] - n.rects.reference[c], E = En(a), _ = E ? c === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, w = g / 2 - m / 2, x = f[v], h = _ - u[d] - f[y], O = _ / 2 - u[d] / 2 + w, S = cn(x, O, h), L = c;
    n.modifiersData[r] = (t = {}, t[L] = S, t.centerOffset = S - O, t);
  }
}
function Tp(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Si(t.elements.popper, o) && (t.elements.arrow = o));
}
const Np = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: kp,
  effect: Tp,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Vt(e) {
  return e.split("-")[1];
}
var Op = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Cp(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Lt(n * o) / o || 0,
    y: Lt(r * o) / o || 0
  };
}
function aa(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, p = e.adaptive, d = e.roundOffsets, f = e.isFixed, u = s.x, v = u === void 0 ? 0 : u, y = s.y, g = y === void 0 ? 0 : y, m = typeof d == "function" ? d({
    x: v,
    y: g
  }) : {
    x: v,
    y: g
  };
  v = m.x, g = m.y;
  var E = s.hasOwnProperty("x"), _ = s.hasOwnProperty("y"), w = $e, x = Re, h = window;
  if (p) {
    var O = En(n), S = "clientHeight", L = "clientWidth";
    if (O === Be(n) && (O = dt(n), rt(O).position !== "static" && l === "absolute" && (S = "scrollHeight", L = "scrollWidth")), O = O, o === Re || (o === $e || o === He) && a === hn) {
      x = Ue;
      var B = f && O === h && h.visualViewport ? h.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        O[S]
      );
      g -= B - r.height, g *= c ? 1 : -1;
    }
    if (o === $e || (o === Re || o === Ue) && a === hn) {
      w = He;
      var F = f && O === h && h.visualViewport ? h.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        O[L]
      );
      v -= F - r.width, v *= c ? 1 : -1;
    }
  }
  var C = Object.assign({
    position: l
  }, p && Op), R = d === !0 ? Cp({
    x: v,
    y: g
  }, Be(n)) : {
    x: v,
    y: g
  };
  if (v = R.x, g = R.y, c) {
    var $;
    return Object.assign({}, C, ($ = {}, $[x] = _ ? "0" : "", $[w] = E ? "0" : "", $.transform = (h.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + g + "px)" : "translate3d(" + v + "px, " + g + "px, 0)", $));
  }
  return Object.assign({}, C, (t = {}, t[x] = _ ? g + "px" : "", t[w] = E ? v + "px" : "", t.transform = "", t));
}
function Sp(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, p = {
    placement: Xe(t.placement),
    variation: Vt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, aa(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, aa(Object.assign({}, p, {
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
var $n = {
  passive: !0
};
function Rp(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Be(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && p.forEach(function(d) {
    d.addEventListener("scroll", n.update, $n);
  }), l && c.addEventListener("resize", n.update, $n), function() {
    a && p.forEach(function(d) {
      d.removeEventListener("scroll", n.update, $n);
    }), l && c.removeEventListener("resize", n.update, $n);
  };
}
const $p = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Rp,
  data: {}
};
var Mp = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function An(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Mp[t];
  });
}
var _p = {
  start: "end",
  end: "start"
};
function ia(e) {
  return e.replace(/start|end/g, function(t) {
    return _p[t];
  });
}
function Qr(e) {
  var t = Be(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function eo(e) {
  return Ft(dt(e)).left + Qr(e).scrollLeft;
}
function Ip(e, t) {
  var n = Be(e), r = dt(e), o = n.visualViewport, a = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    var p = Ci();
    (p || !p && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: l + eo(e),
    y: c
  };
}
function Ap(e) {
  var t, n = dt(e), r = Qr(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = wt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = wt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + eo(e), c = -r.scrollTop;
  return rt(o || n).direction === "rtl" && (l += wt(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: l,
    y: c
  };
}
function to(e) {
  var t = rt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Mi(e) {
  return ["html", "body", "#document"].indexOf(Ke(e)) >= 0 ? e.ownerDocument.body : Ve(e) && to(e) ? e : Mi(Kn(e));
}
function pn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Mi(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = Be(r), s = o ? [a].concat(a.visualViewport || [], to(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(pn(Kn(s)))
  );
}
function Ar(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Dp(e, t) {
  var n = Ft(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function sa(e, t, n) {
  return t === Ni ? Ar(Ip(e, n)) : Tt(t) ? Dp(t, n) : Ar(Ap(dt(e)));
}
function jp(e) {
  var t = pn(Kn(e)), n = ["absolute", "fixed"].indexOf(rt(e).position) >= 0, r = n && Ve(e) ? En(e) : e;
  return Tt(r) ? t.filter(function(o) {
    return Tt(o) && Si(o, r) && Ke(o) !== "body";
  }) : [];
}
function Bp(e, t, n, r) {
  var o = t === "clippingParents" ? jp(e) : [].concat(t), a = [].concat(o, [n]), s = a[0], l = a.reduce(function(c, p) {
    var d = sa(e, p, r);
    return c.top = wt(d.top, c.top), c.right = zn(d.right, c.right), c.bottom = zn(d.bottom, c.bottom), c.left = wt(d.left, c.left), c;
  }, sa(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function _i(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Xe(r) : null, a = r ? Vt(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
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
  var p = o ? Zr(o) : null;
  if (p != null) {
    var d = p === "y" ? "height" : "width";
    switch (a) {
      case Bt:
        c[p] = c[p] - (t[d] / 2 - n[d] / 2);
        break;
      case hn:
        c[p] = c[p] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function gn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, a = n.strategy, s = a === void 0 ? e.strategy : a, l = n.boundary, c = l === void 0 ? op : l, p = n.rootBoundary, d = p === void 0 ? Ni : p, f = n.elementContext, u = f === void 0 ? Zt : f, v = n.altBoundary, y = v === void 0 ? !1 : v, g = n.padding, m = g === void 0 ? 0 : g, E = Ri(typeof m != "number" ? m : $i(m, xn)), _ = u === Zt ? ap : Zt, w = e.rects.popper, x = e.elements[y ? _ : u], h = Bp(Tt(x) ? x : x.contextElement || dt(e.elements.popper), c, d, s), O = Ft(e.elements.reference), S = _i({
    reference: O,
    element: w,
    strategy: "absolute",
    placement: o
  }), L = Ar(Object.assign({}, w, S)), B = u === Zt ? L : O, F = {
    top: h.top - B.top + E.top,
    bottom: B.bottom - h.bottom + E.bottom,
    left: h.left - B.left + E.left,
    right: B.right - h.right + E.right
  }, C = e.modifiersData.offset;
  if (u === Zt && C) {
    var R = C[o];
    Object.keys(F).forEach(function($) {
      var j = [He, Ue].indexOf($) >= 0 ? 1 : -1, D = [Re, Ue].indexOf($) >= 0 ? "y" : "x";
      F[$] += R[D] * j;
    });
  }
  return F;
}
function Lp(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, p = c === void 0 ? Oi : c, d = Vt(r), f = d ? l ? ra : ra.filter(function(y) {
    return Vt(y) === d;
  }) : xn, u = f.filter(function(y) {
    return p.indexOf(y) >= 0;
  });
  u.length === 0 && (u = f);
  var v = u.reduce(function(y, g) {
    return y[g] = gn(e, {
      placement: g,
      boundary: o,
      rootBoundary: a,
      padding: s
    })[Xe(g)], y;
  }, {});
  return Object.keys(v).sort(function(y, g) {
    return v[y] - v[g];
  });
}
function Fp(e) {
  if (Xe(e) === Gr)
    return [];
  var t = An(e);
  return [ia(e), t, ia(t)];
}
function Vp(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, p = n.padding, d = n.boundary, f = n.rootBoundary, u = n.altBoundary, v = n.flipVariations, y = v === void 0 ? !0 : v, g = n.allowedAutoPlacements, m = t.options.placement, E = Xe(m), _ = E === m, w = c || (_ || !y ? [An(m)] : Fp(m)), x = [m].concat(w).reduce(function(z, H) {
      return z.concat(Xe(H) === Gr ? Lp(t, {
        placement: H,
        boundary: d,
        rootBoundary: f,
        padding: p,
        flipVariations: y,
        allowedAutoPlacements: g
      }) : H);
    }, []), h = t.rects.reference, O = t.rects.popper, S = /* @__PURE__ */ new Map(), L = !0, B = x[0], F = 0; F < x.length; F++) {
      var C = x[F], R = Xe(C), $ = Vt(C) === Bt, j = [Re, Ue].indexOf(R) >= 0, D = j ? "width" : "height", M = gn(t, {
        placement: C,
        boundary: d,
        rootBoundary: f,
        altBoundary: u,
        padding: p
      }), V = j ? $ ? He : $e : $ ? Ue : Re;
      h[D] > O[D] && (V = An(V));
      var te = An(V), ee = [];
      if (a && ee.push(M[R] <= 0), l && ee.push(M[V] <= 0, M[te] <= 0), ee.every(function(z) {
        return z;
      })) {
        B = C, L = !1;
        break;
      }
      S.set(C, ee);
    }
    if (L)
      for (var N = y ? 3 : 1, A = function(H) {
        var q = x.find(function(X) {
          var W = S.get(X);
          if (W)
            return W.slice(0, H).every(function(K) {
              return K;
            });
        });
        if (q)
          return B = q, "break";
      }, U = N; U > 0; U--) {
        var G = A(U);
        if (G === "break")
          break;
      }
    t.placement !== B && (t.modifiersData[r]._skip = !0, t.placement = B, t.reset = !0);
  }
}
const zp = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Vp,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function la(e, t, n) {
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
function ca(e) {
  return [Re, He, Ue, $e].some(function(t) {
    return e[t] >= 0;
  });
}
function Up(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, s = gn(t, {
    elementContext: "reference"
  }), l = gn(t, {
    altBoundary: !0
  }), c = la(s, r), p = la(l, o, a), d = ca(c), f = ca(p);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: p,
    isReferenceHidden: d,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": f
  });
}
const Hp = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Up
};
function Wp(e, t, n) {
  var r = Xe(e), o = [$e, Re].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = a[0], l = a[1];
  return s = s || 0, l = (l || 0) * o, [$e, He].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function qp(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = Oi.reduce(function(d, f) {
    return d[f] = Wp(f, t.rects, a), d;
  }, {}), l = s[t.placement], c = l.x, p = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += p), t.modifiersData[r] = s;
}
const Xp = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: qp
};
function Yp(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = _i({
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
  fn: Yp,
  data: {}
};
function Kp(e) {
  return e === "x" ? "y" : "x";
}
function Jp(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, p = n.rootBoundary, d = n.altBoundary, f = n.padding, u = n.tether, v = u === void 0 ? !0 : u, y = n.tetherOffset, g = y === void 0 ? 0 : y, m = gn(t, {
    boundary: c,
    rootBoundary: p,
    padding: f,
    altBoundary: d
  }), E = Xe(t.placement), _ = Vt(t.placement), w = !_, x = Zr(E), h = Kp(x), O = t.modifiersData.popperOffsets, S = t.rects.reference, L = t.rects.popper, B = typeof g == "function" ? g(Object.assign({}, t.rects, {
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
  if (O) {
    if (a) {
      var $, j = x === "y" ? Re : $e, D = x === "y" ? Ue : He, M = x === "y" ? "height" : "width", V = O[x], te = V + m[j], ee = V - m[D], N = v ? -L[M] / 2 : 0, A = _ === Bt ? S[M] : L[M], U = _ === Bt ? -L[M] : -S[M], G = t.elements.arrow, z = v && G ? Jr(G) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Pi(), q = H[j], X = H[D], W = cn(0, S[M], z[M]), K = w ? S[M] / 2 - N - W - q - F.mainAxis : A - W - q - F.mainAxis, J = w ? -S[M] / 2 + N + W + X + F.mainAxis : U + W + X + F.mainAxis, ae = t.elements.arrow && En(t.elements.arrow), I = ae ? x === "y" ? ae.clientTop || 0 : ae.clientLeft || 0 : 0, Q = ($ = C == null ? void 0 : C[x]) != null ? $ : 0, P = V + K - Q - I, ie = V + J - Q, we = cn(v ? zn(te, P) : te, V, v ? wt(ee, ie) : ee);
      O[x] = we, R[x] = we - V;
    }
    if (l) {
      var Oe, ve = x === "x" ? Re : $e, ft = x === "x" ? Ue : He, Ce = O[h], Ze = h === "y" ? "height" : "width", Ie = Ce + m[ve], Qe = Ce - m[ft], xe = [Re, $e].indexOf(E) !== -1, Ot = (Oe = C == null ? void 0 : C[h]) != null ? Oe : 0, mt = xe ? Ie : Ce - S[Ze] - L[Ze] - Ot + F.altAxis, Wt = xe ? Ce + S[Ze] + L[Ze] - Ot - F.altAxis : Qe, On = v && xe ? xp(mt, Ce, Wt) : cn(v ? mt : Ie, Ce, v ? Wt : Qe);
      O[h] = On, R[h] = On - Ce;
    }
    t.modifiersData[r] = R;
  }
}
const Zp = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Jp,
  requiresIfExists: ["offset"]
};
function Qp(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function ed(e) {
  return e === Be(e) || !Ve(e) ? Qr(e) : Qp(e);
}
function td(e) {
  var t = e.getBoundingClientRect(), n = Lt(t.width) / e.offsetWidth || 1, r = Lt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function nd(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ve(t), o = Ve(t) && td(t), a = dt(t), s = Ft(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Ke(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  to(a)) && (l = ed(t)), Ve(t) ? (c = Ft(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = eo(a))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function rd(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function(l) {
      if (!n.has(l)) {
        var c = t.get(l);
        c && o(c);
      }
    }), r.push(a);
  }
  return e.forEach(function(a) {
    n.has(a.name) || o(a);
  }), r;
}
function od(e) {
  var t = rd(e);
  return hp.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function ad(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function id(e) {
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
var pa = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function da() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function sd(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, a = o === void 0 ? pa : o;
  return function(l, c, p) {
    p === void 0 && (p = a);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, pa, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], u = !1, v = {
      state: d,
      setOptions: function(E) {
        var _ = typeof E == "function" ? E(d.options) : E;
        g(), d.options = Object.assign({}, a, d.options, _), d.scrollParents = {
          reference: Tt(l) ? pn(l) : l.contextElement ? pn(l.contextElement) : [],
          popper: pn(c)
        };
        var w = od(id([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = w.filter(function(x) {
          return x.enabled;
        }), y(), v.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!u) {
          var E = d.elements, _ = E.reference, w = E.popper;
          if (da(_, w)) {
            d.rects = {
              reference: nd(_, En(w), d.options.strategy === "fixed"),
              popper: Jr(w)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(F) {
              return d.modifiersData[F.name] = Object.assign({}, F.data);
            });
            for (var x = 0; x < d.orderedModifiers.length; x++) {
              if (d.reset === !0) {
                d.reset = !1, x = -1;
                continue;
              }
              var h = d.orderedModifiers[x], O = h.fn, S = h.options, L = S === void 0 ? {} : S, B = h.name;
              typeof O == "function" && (d = O({
                state: d,
                options: L,
                name: B,
                instance: v
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: ad(function() {
        return new Promise(function(m) {
          v.forceUpdate(), m(d);
        });
      }),
      destroy: function() {
        g(), u = !0;
      }
    };
    if (!da(l, c))
      return v;
    v.setOptions(p).then(function(m) {
      !u && p.onFirstUpdate && p.onFirstUpdate(m);
    });
    function y() {
      d.orderedModifiers.forEach(function(m) {
        var E = m.name, _ = m.options, w = _ === void 0 ? {} : _, x = m.effect;
        if (typeof x == "function") {
          var h = x({
            state: d,
            name: E,
            instance: v,
            options: w
          }), O = function() {
          };
          f.push(h || O);
        }
      });
    }
    function g() {
      f.forEach(function(m) {
        return m();
      }), f = [];
    }
    return v;
  };
}
var ld = [$p, Gp, Pp, vp, Xp, zp, Zp, Np, Hp], cd = /* @__PURE__ */ sd({
  defaultModifiers: ld
});
const Ii = "Popper";
function pd(e) {
  return Ti(Ii, e);
}
Vc(Ii, ["root"]);
const dd = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], ud = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function fd(e, t) {
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
function Un(e) {
  return typeof e == "function" ? e() : e;
}
function Jn(e) {
  return e.nodeType !== void 0;
}
function md(e) {
  return !Jn(e);
}
const hd = () => at({
  root: ["root"]
}, Ac(pd)), gd = {}, bd = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: p,
    placement: d,
    popperOptions: f,
    popperRef: u,
    slotProps: v = {},
    slots: y = {},
    TransitionProps: g
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, m = fe(t, dd), E = k.useRef(null), _ = ze(E, n), w = k.useRef(null), x = ze(w, u), h = k.useRef(x);
  Et(() => {
    h.current = x;
  }, [x]), k.useImperativeHandle(u, () => w.current, []);
  const O = fd(d, s), [S, L] = k.useState(O), [B, F] = k.useState(Un(o));
  k.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), k.useEffect(() => {
    o && F(Un(o));
  }, [o]), Et(() => {
    if (!B || !p)
      return;
    const D = (te) => {
      L(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && B && Jn(B) && B.nodeType === 1) {
      const te = B.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && te.top === 0 && te.left === 0 && te.right === 0 && te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: te
      }) => {
        D(te);
      }
    }];
    c != null && (M = M.concat(c)), f && f.modifiers != null && (M = M.concat(f.modifiers));
    const V = cd(B, E.current, T({
      placement: O
    }, f, {
      modifiers: M
    }));
    return h.current(V), () => {
      V.destroy(), h.current(null);
    };
  }, [B, l, c, p, f, O]);
  const C = {
    placement: S
  };
  g !== null && (C.TransitionProps = g);
  const R = hd(), $ = (r = y.root) != null ? r : "div", j = kt({
    elementType: $,
    externalSlotProps: v.root,
    externalForwardedProps: m,
    additionalProps: {
      role: "tooltip",
      ref: _
    },
    ownerState: t,
    className: R.root
  });
  return /* @__PURE__ */ b($, T({}, j, {
    children: typeof a == "function" ? a(C) : a
  }));
}), Ai = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: p,
    open: d,
    placement: f = "bottom",
    popperOptions: u = gd,
    popperRef: v,
    style: y,
    transition: g = !1,
    slotProps: m = {},
    slots: E = {}
  } = t, _ = fe(t, ud), [w, x] = k.useState(!0), h = () => {
    x(!1);
  }, O = () => {
    x(!0);
  };
  if (!c && !d && (!g || w))
    return null;
  let S;
  if (a)
    S = a;
  else if (r) {
    const F = Un(r);
    S = F && Jn(F) ? Te(F).body : Te(null).body;
  }
  const L = !d && c && (!g || w) ? "none" : void 0, B = g ? {
    in: d,
    onEnter: h,
    onExited: O
  } : void 0;
  return /* @__PURE__ */ b(mn, {
    disablePortal: l,
    container: S,
    children: /* @__PURE__ */ b(bd, T({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: p,
      ref: n,
      open: g ? !w : d,
      placement: f,
      popperOptions: u,
      popperRef: v,
      slotProps: m,
      slots: E
    }, _, {
      style: T({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: L
      }, y),
      TransitionProps: B,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ai.propTypes = {
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
  anchorEl: Ht(i.oneOfType([nt, i.object, i.func]), (e) => {
    if (e.open) {
      const t = Un(e.anchorEl);
      if (t && Jn(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || md(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: i.oneOfType([nt, i.func]),
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
  popperRef: Yr,
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
const vd = ["values", "unit", "step"], yd = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => T({}, n, {
    [r.key]: r.val
  }), {});
};
function wd(e) {
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
  } = e, o = fe(e, vd), a = yd(t), s = Object.keys(a);
  function l(u) {
    return `@media (min-width:${typeof t[u] == "number" ? t[u] : u}${n})`;
  }
  function c(u) {
    return `@media (max-width:${(typeof t[u] == "number" ? t[u] : u) - r / 100}${n})`;
  }
  function p(u, v) {
    const y = s.indexOf(v);
    return `@media (min-width:${typeof t[u] == "number" ? t[u] : u}${n}) and (max-width:${(y !== -1 && typeof t[s[y]] == "number" ? t[s[y]] : v) - r / 100}${n})`;
  }
  function d(u) {
    return s.indexOf(u) + 1 < s.length ? p(u, s[s.indexOf(u) + 1]) : l(u);
  }
  function f(u) {
    const v = s.indexOf(u);
    return v === 0 ? l(s[1]) : v === s.length - 1 ? c(s[v]) : p(u, s[s.indexOf(u) + 1]).replace("@media", "@media not all and");
  }
  return T({
    keys: s,
    values: a,
    up: l,
    down: c,
    between: p,
    only: d,
    not: f,
    unit: n
  }, o);
}
const xd = {
  borderRadius: 4
}, Ed = xd, kd = process.env.NODE_ENV !== "production" ? i.oneOfType([i.number, i.string, i.object, i.array]) : {}, ut = kd;
function dn(e, t) {
  return t ? tt(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const no = {
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
}, ua = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${no[e]}px)`
};
function ot(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || ua;
    return t.reduce((s, l, c) => (s[a.up(a.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const a = r.breakpoints || ua;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || no).indexOf(l) !== -1) {
        const c = a.up(l);
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
function Td(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const a = e.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function Nd(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function Zn(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Hn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = Zn(e, n) || r, t && (o = t(o, r, e)), o;
}
function ye(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, a = (s) => {
    if (s[t] == null)
      return null;
    const l = s[t], c = s.theme, p = Zn(c, r) || {};
    return ot(s, l, (f) => {
      let u = Hn(p, o, f);
      return f === u && typeof f == "string" && (u = Hn(p, o, `${t}${f === "default" ? "" : Ge(f)}`, f)), n === !1 ? u : {
        [n]: u
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: ut
  } : {}, a.filterProps = [t], a;
}
function Od(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const Cd = {
  m: "margin",
  p: "padding"
}, Sd = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, fa = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Pd = Od((e) => {
  if (e.length > 2)
    if (fa[e])
      e = fa[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Cd[t], o = Sd[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), Qn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], er = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Rd = [...Qn, ...er];
function kn(e, t, n, r) {
  var o;
  const a = (o = Zn(e, t, !1)) != null ? o : n;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Di(e) {
  return kn(e, "spacing", 8, "spacing");
}
function Tn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function $d(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = Tn(t, n), r), {});
}
function Md(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Pd(n), a = $d(o, r), s = e[n];
  return ot(e, s, a);
}
function ji(e, t) {
  const n = Di(e.theme);
  return Object.keys(e).map((r) => Md(e, t, r, n)).reduce(dn, {});
}
function ge(e) {
  return ji(e, Qn);
}
ge.propTypes = process.env.NODE_ENV !== "production" ? Qn.reduce((e, t) => (e[t] = ut, e), {}) : {};
ge.filterProps = Qn;
function be(e) {
  return ji(e, er);
}
be.propTypes = process.env.NODE_ENV !== "production" ? er.reduce((e, t) => (e[t] = ut, e), {}) : {};
be.filterProps = er;
process.env.NODE_ENV !== "production" && Rd.reduce((e, t) => (e[t] = ut, e), {});
function _d(e = 8) {
  if (e.mui)
    return e;
  const t = Di({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const s = t(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function tr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => t[a] ? dn(o, t[a](r)) : o, {});
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
const Id = We("border", Fe), Ad = We("borderTop", Fe), Dd = We("borderRight", Fe), jd = We("borderBottom", Fe), Bd = We("borderLeft", Fe), Ld = We("borderColor"), Fd = We("borderTopColor"), Vd = We("borderRightColor"), zd = We("borderBottomColor"), Ud = We("borderLeftColor"), Hd = We("outline", Fe), Wd = We("outlineColor"), nr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = kn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Tn(t, r)
    });
    return ot(e, e.borderRadius, n);
  }
  return null;
};
nr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ut
} : {};
nr.filterProps = ["borderRadius"];
tr(Id, Ad, Dd, jd, Bd, Ld, Fd, Vd, zd, Ud, nr, Hd, Wd);
const rr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = kn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Tn(t, r)
    });
    return ot(e, e.gap, n);
  }
  return null;
};
rr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ut
} : {};
rr.filterProps = ["gap"];
const or = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = kn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Tn(t, r)
    });
    return ot(e, e.columnGap, n);
  }
  return null;
};
or.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ut
} : {};
or.filterProps = ["columnGap"];
const ar = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = kn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Tn(t, r)
    });
    return ot(e, e.rowGap, n);
  }
  return null;
};
ar.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ut
} : {};
ar.filterProps = ["rowGap"];
const qd = ye({
  prop: "gridColumn"
}), Xd = ye({
  prop: "gridRow"
}), Yd = ye({
  prop: "gridAutoFlow"
}), Gd = ye({
  prop: "gridAutoColumns"
}), Kd = ye({
  prop: "gridAutoRows"
}), Jd = ye({
  prop: "gridTemplateColumns"
}), Zd = ye({
  prop: "gridTemplateRows"
}), Qd = ye({
  prop: "gridTemplateAreas"
}), eu = ye({
  prop: "gridArea"
});
tr(rr, or, ar, qd, Xd, Yd, Gd, Kd, Jd, Zd, Qd, eu);
function At(e, t) {
  return t === "grey" ? t : e;
}
const tu = ye({
  prop: "color",
  themeKey: "palette",
  transform: At
}), nu = ye({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: At
}), ru = ye({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: At
});
tr(tu, nu, ru);
function je(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const ou = ye({
  prop: "width",
  transform: je
}), ro = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const a = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || no[n];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: je(n)
      };
    };
    return ot(e, e.maxWidth, t);
  }
  return null;
};
ro.filterProps = ["maxWidth"];
const au = ye({
  prop: "minWidth",
  transform: je
}), iu = ye({
  prop: "height",
  transform: je
}), su = ye({
  prop: "maxHeight",
  transform: je
}), lu = ye({
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
const cu = ye({
  prop: "boxSizing"
});
tr(ou, ro, au, iu, su, lu, cu);
const pu = {
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
    style: nr
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
    style: rr
  },
  rowGap: {
    style: ar
  },
  columnGap: {
    style: or
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
    style: ro
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
}, oo = pu;
function du(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function uu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function fu() {
  function e(n, r, o, a) {
    const s = {
      [n]: r,
      theme: o
    }, l = a[n];
    if (!l)
      return {
        [n]: r
      };
    const {
      cssProperty: c = n,
      themeKey: p,
      transform: d,
      style: f
    } = l;
    if (r == null)
      return null;
    if (p === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const u = Zn(o, p) || {};
    return f ? f(s) : ot(s, r, (y) => {
      let g = Hn(u, d, y);
      return y === g && typeof y == "string" && (g = Hn(u, d, `${n}${y === "default" ? "" : Ge(y)}`, y)), c === !1 ? g : {
        [c]: g
      };
    });
  }
  function t(n) {
    var r;
    const {
      sx: o,
      theme: a = {}
    } = n || {};
    if (!o)
      return null;
    const s = (r = a.unstable_sxConfig) != null ? r : oo;
    function l(c) {
      let p = c;
      if (typeof c == "function")
        p = c(a);
      else if (typeof c != "object")
        return c;
      if (!p)
        return null;
      const d = Td(a.breakpoints), f = Object.keys(d);
      let u = d;
      return Object.keys(p).forEach((v) => {
        const y = uu(p[v], a);
        if (y != null)
          if (typeof y == "object")
            if (s[v])
              u = dn(u, e(v, y, a, s));
            else {
              const g = ot({
                theme: a
              }, y, (m) => ({
                [v]: m
              }));
              du(g, y) ? u[v] = t({
                sx: y,
                theme: a
              }) : u = dn(u, g);
            }
          else
            u = dn(u, e(v, y, a, s));
      }), Nd(f, u);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Bi = fu();
Bi.filterProps = ["sx"];
const ao = Bi;
function mu(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const hu = ["breakpoints", "palette", "spacing", "shape"];
function io(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = e, s = fe(e, hu), l = wd(n), c = _d(o);
  let p = tt({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: T({
      mode: "light"
    }, r),
    spacing: c,
    shape: T({}, Ed, a)
  }, s);
  return p.applyStyles = mu, p = t.reduce((d, f) => tt(d, f), p), p.unstable_sxConfig = T({}, oo, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(f) {
    return ao({
      sx: f,
      theme: this
    });
  }, p;
}
function gu(e) {
  return Object.keys(e).length === 0;
}
function Li(e = null) {
  const t = k.useContext(Js);
  return !t || gu(t) ? e : t;
}
const bu = io();
function Fi(e = bu) {
  return Li(e);
}
const vu = ["ownerState"], yu = ["variants"], wu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function xu(e) {
  return Object.keys(e).length === 0;
}
function Eu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Dn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const ku = io(), ma = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Mn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return xu(t) ? e : t[n] || t;
}
function Tu(e) {
  return e ? (t, n) => n[e] : null;
}
function jn(e, t) {
  let {
    ownerState: n
  } = t, r = fe(t, vu);
  const o = typeof e == "function" ? e(T({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => jn(a, T({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = fe(o, yu);
    return a.forEach((c) => {
      let p = !0;
      typeof c.props == "function" ? p = c.props(T({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((d) => {
        (n == null ? void 0 : n[d]) !== c.props[d] && r[d] !== c.props[d] && (p = !1);
      }), p && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(T({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Nu(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = ku,
    rootShouldForwardProp: r = Dn,
    slotShouldForwardProp: o = Dn
  } = e, a = (s) => ao(T({}, s, {
    theme: Mn(T({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (s, l = {}) => {
    Zs(s, (h) => h.filter((O) => !(O != null && O.__mui_systemSx)));
    const {
      name: c,
      slot: p,
      skipVariantsResolver: d,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: u = Tu(ma(p))
    } = l, v = fe(l, wu), y = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      p && p !== "Root" && p !== "root" || !1
    ), g = f || !1;
    let m;
    process.env.NODE_ENV !== "production" && c && (m = `${c}-${ma(p || "Root")}`);
    let E = Dn;
    p === "Root" || p === "root" ? E = r : p ? E = o : Eu(s) && (E = void 0);
    const _ = Ks(s, T({
      shouldForwardProp: E,
      label: m
    }, v)), w = (h) => typeof h == "function" && h.__emotion_real !== h || vt(h) ? (O) => jn(h, T({}, O, {
      theme: Mn({
        theme: O.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : h, x = (h, ...O) => {
      let S = w(h);
      const L = O ? O.map(w) : [];
      c && u && L.push((C) => {
        const R = Mn(T({}, C, {
          defaultTheme: n,
          themeId: t
        }));
        if (!R.components || !R.components[c] || !R.components[c].styleOverrides)
          return null;
        const $ = R.components[c].styleOverrides, j = {};
        return Object.entries($).forEach(([D, M]) => {
          j[D] = jn(M, T({}, C, {
            theme: R
          }));
        }), u(C, j);
      }), c && !y && L.push((C) => {
        var R;
        const $ = Mn(T({}, C, {
          defaultTheme: n,
          themeId: t
        })), j = $ == null || (R = $.components) == null || (R = R[c]) == null ? void 0 : R.variants;
        return jn({
          variants: j
        }, T({}, C, {
          theme: $
        }));
      }), g || L.push(a);
      const B = L.length - O.length;
      if (Array.isArray(h) && B > 0) {
        const C = new Array(B).fill("");
        S = [...h, ...C], S.raw = [...h.raw, ...C];
      }
      const F = _(S, ...L);
      if (process.env.NODE_ENV !== "production") {
        let C;
        c && (C = `${c}${Ge(p || "")}`), C === void 0 && (C = `Styled(${cc(s)})`), F.displayName = C;
      }
      return s.muiName && (F.muiName = s.muiName), F;
    };
    return _.withConfig && (x.withConfig = _.withConfig), x;
  };
}
function Ou(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : vi(t.components[n].defaultProps, r);
}
function Cu({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = Fi(n);
  return r && (o = o[r] || o), Ou({
    theme: o,
    name: t,
    props: e
  });
}
function so(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Mc(e, t, n);
}
function Su(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Nt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Nt(Su(e));
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
  return r = r.map((a) => parseFloat(a)), {
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
  return t.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Pu(e) {
  e = Nt(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, a = r * Math.min(o, 1 - o), s = (p, d = (p + n / 30) % 12) => o - a * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), ir({
    type: l,
    values: c
  });
}
function ha(e) {
  e = Nt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Nt(Pu(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function ga(e, t) {
  const n = ha(e), r = ha(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Wn(e, t) {
  return e = Nt(e), t = so(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, ir(e);
}
function Ru(e, t) {
  if (e = Nt(e), t = so(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return ir(e);
}
function $u(e, t) {
  if (e = Nt(e), t = so(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return ir(e);
}
function Mu(e, t) {
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
const _u = {
  black: "#000",
  white: "#fff"
}, bn = _u, Iu = {
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
}, Au = Iu, Du = {
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
}, Ct = Du, ju = {
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
}, St = ju, Bu = {
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
}, Qt = Bu, Lu = {
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
}, Pt = Lu, Fu = {
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
}, Rt = Fu, Vu = {
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
}, $t = Vu, zu = ["mode", "contrastThreshold", "tonalOffset"], ba = {
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
    paper: bn.white,
    default: bn.white
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
    primary: bn.white,
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
    active: bn.white,
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
function va(e, t, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = $u(e.main, o) : t === "dark" && (e.dark = Ru(e.main, a)));
}
function Uu(e = "light") {
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
function Hu(e = "light") {
  return e === "dark" ? {
    main: Ct[200],
    light: Ct[50],
    dark: Ct[400]
  } : {
    main: Ct[500],
    light: Ct[300],
    dark: Ct[700]
  };
}
function Wu(e = "light") {
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
function qu(e = "light") {
  return e === "dark" ? {
    main: Rt[400],
    light: Rt[300],
    dark: Rt[700]
  } : {
    main: Rt[700],
    light: Rt[500],
    dark: Rt[900]
  };
}
function Xu(e = "light") {
  return e === "dark" ? {
    main: $t[400],
    light: $t[300],
    dark: $t[700]
  } : {
    main: $t[800],
    light: $t[500],
    dark: $t[900]
  };
}
function Yu(e = "light") {
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
function Gu(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = fe(e, zu), a = e.primary || Uu(t), s = e.secondary || Hu(t), l = e.error || Wu(t), c = e.info || qu(t), p = e.success || Xu(t), d = e.warning || Yu(t);
  function f(g) {
    const m = ga(g, wr.text.primary) >= n ? wr.text.primary : ba.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = ga(g, m);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${m} on ${g}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return m;
  }
  const u = ({
    color: g,
    name: m,
    mainShade: E = 500,
    lightShade: _ = 300,
    darkShade: w = 700
  }) => {
    if (g = T({}, g), !g.main && g[E] && (g.main = g[E]), !g.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : Dt(11, m ? ` (${m})` : "", E));
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
    return va(g, "light", _, r), va(g, "dark", w, r), g.contrastText || (g.contrastText = f(g.main)), g;
  }, v = {
    dark: wr,
    light: ba
  };
  return process.env.NODE_ENV !== "production" && (v[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), tt(T({
    // A collection of common colors.
    common: T({}, bn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: u({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: u({
      color: s,
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
      color: p,
      name: "success"
    }),
    // The grey colors.
    grey: Au,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: u,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, v[t]), o);
}
const Ku = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Ju(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ya = {
  textTransform: "uppercase"
}, wa = '"Roboto", "Helvetica", "Arial", sans-serif';
function Zu(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = wa,
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
    allVariants: d,
    pxToRem: f
  } = n, u = fe(n, Ku);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof p != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const v = o / 14, y = f || ((E) => `${E / p * v}rem`), g = (E, _, w, x, h) => T({
    fontFamily: r,
    fontWeight: E,
    fontSize: y(_),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, r === wa ? {
    letterSpacing: `${Ju(x / _)}em`
  } : {}, h, d), m = {
    h1: g(a, 96, 1.167, -1.5),
    h2: g(a, 60, 1.2, -0.5),
    h3: g(s, 48, 1.167, 0),
    h4: g(s, 34, 1.235, 0.25),
    h5: g(s, 24, 1.334, 0),
    h6: g(l, 20, 1.6, 0.15),
    subtitle1: g(s, 16, 1.75, 0.15),
    subtitle2: g(l, 14, 1.57, 0.1),
    body1: g(s, 16, 1.5, 0.15),
    body2: g(s, 14, 1.43, 0.15),
    button: g(l, 14, 1.75, 0.4, ya),
    caption: g(s, 12, 1.66, 0.4),
    overline: g(s, 12, 2.66, 1, ya),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return tt(T({
    htmlFontSize: p,
    pxToRem: y,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, m), u, {
    clone: !1
    // No need to clone deep
  });
}
const Qu = 0.2, ef = 0.14, tf = 0.12;
function he(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Qu})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ef})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${tf})`].join(",");
}
const nf = ["none", he(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), he(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), he(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), he(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), he(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), he(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), he(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), he(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), he(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), he(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), he(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), he(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), he(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), he(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), he(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), he(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), he(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), he(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), he(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), he(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), he(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), he(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), he(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), he(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], rf = nf, of = ["duration", "easing", "delay"], af = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, sf = {
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
function xa(e) {
  return `${Math.round(e)}ms`;
}
function lf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function cf(e) {
  const t = T({}, af, e.easing), n = T({}, sf, e.duration);
  return T({
    getAutoHeightDuration: lf,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, p = fe(a, of);
      if (process.env.NODE_ENV !== "production") {
        const d = (u) => typeof u == "string", f = (u) => !isNaN(parseFloat(u));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(p).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : xa(s)} ${l} ${typeof c == "string" ? c : xa(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const pf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, df = pf, uf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function ff(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = e, s = fe(e, uf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Dt(18));
  const l = Gu(r), c = io(e);
  let p = tt(c, {
    mixins: Mu(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: rf.slice(),
    typography: Zu(l, a),
    transitions: cf(o),
    zIndex: T({}, df)
  });
  if (p = tt(p, s), p = t.reduce((d, f) => tt(d, f), p), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (u, v) => {
      let y;
      for (y in u) {
        const g = u[y];
        if (d.indexOf(y) !== -1 && Object.keys(g).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const m = Je("", y);
            console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(u, null, 2), "", `Instead, you need to use the '&.${m}' syntax:`, JSON.stringify({
              root: {
                [`&.${m}`]: g
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          u[y] = {};
        }
      }
    };
    Object.keys(p.components).forEach((u) => {
      const v = p.components[u].styleOverrides;
      v && u.indexOf("Mui") === 0 && f(v, u);
    });
  }
  return p.unstable_sxConfig = T({}, oo, s == null ? void 0 : s.unstable_sxConfig), p.unstable_sx = function(f) {
    return ao({
      sx: f,
      theme: this
    });
  }, p;
}
const mf = ff(), lo = mf, co = "$$material", Vi = (e) => Dn(e) && e !== "classes", hf = Nu({
  themeId: co,
  defaultTheme: lo,
  rootShouldForwardProp: Vi
}), Ne = hf;
function Nn() {
  const e = Fi(lo);
  return process.env.NODE_ENV !== "production" && k.useDebugValue(e), e[co] || e;
}
function it({
  props: e,
  name: t
}) {
  return Cu({
    props: e,
    name: t,
    defaultTheme: lo,
    themeId: co
  });
}
function Dr(e, t) {
  return Dr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Dr(e, t);
}
function gf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Dr(e, t);
}
const Ea = {
  disabled: !1
};
var bf = process.env.NODE_ENV !== "production" ? i.oneOfType([i.number, i.shape({
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
const zi = Z.createContext(null);
var vf = function(t) {
  return t.scrollTop;
}, an = "unmounted", gt = "exited", bt = "entering", It = "entered", jr = "exiting", st = /* @__PURE__ */ function(e) {
  gf(t, e);
  function t(r, o) {
    var a;
    a = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = gt, a.appearStatus = bt) : c = It : r.unmountOnExit || r.mountOnEnter ? c = an : c = gt, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var s = o.in;
    return s && a.status === an ? {
      status: gt
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== bt && s !== It && (a = bt) : (s === bt || s === It) && (a = jr);
    }
    this.updateStatus(!1, a);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, a, s, l;
    return a = s = l = o, o != null && typeof o != "number" && (a = o.exit, s = o.enter, l = o.appear !== void 0 ? o.appear : s), {
      exit: a,
      enter: s,
      appear: l
    };
  }, n.updateStatus = function(o, a) {
    if (o === void 0 && (o = !1), a !== null)
      if (this.cancelNextCallback(), a === bt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Pn.findDOMNode(this);
          s && vf(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === gt && this.setState({
        status: an
      });
  }, n.performEnter = function(o) {
    var a = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Pn.findDOMNode(this), l], p = c[0], d = c[1], f = this.getTimeouts(), u = l ? f.appear : f.enter;
    if (!o && !s || Ea.disabled) {
      this.safeSetState({
        status: It
      }, function() {
        a.props.onEntered(p);
      });
      return;
    }
    this.props.onEnter(p, d), this.safeSetState({
      status: bt
    }, function() {
      a.props.onEntering(p, d), a.onTransitionEnd(u, function() {
        a.safeSetState({
          status: It
        }, function() {
          a.props.onEntered(p, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Pn.findDOMNode(this);
    if (!a || Ea.disabled) {
      this.safeSetState({
        status: gt
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
          status: gt
        }, function() {
          o.props.onExited(l);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(o, a) {
    a = this.setNextCallback(a), this.setState(o, a);
  }, n.setNextCallback = function(o) {
    var a = this, s = !0;
    return this.nextCallback = function(l) {
      s && (s = !1, a.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      s = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, a) {
    this.setNextCallback(a);
    var s = this.props.nodeRef ? this.props.nodeRef.current : Pn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!s || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], p = c[0], d = c[1];
      this.props.addEndListener(p, d);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === an)
      return null;
    var a = this.props, s = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = fe(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Z.createElement(zi.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : Z.cloneElement(Z.Children.only(s), l))
    );
  }, t;
}(Z.Component);
st.contextType = zi;
st.propTypes = process.env.NODE_ENV !== "production" ? {
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
    current: typeof Element > "u" ? i.any : function(e, t, n, r, o, a) {
      var s = e[t];
      return i.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, a);
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
    var n = bf;
    t.addEndListener || (n = n.isRequired);
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
      o[a - 1] = arguments[a];
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
st.defaultProps = {
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
st.UNMOUNTED = an;
st.EXITED = gt;
st.ENTERING = bt;
st.ENTERED = It;
st.EXITING = jr;
const Ui = st, Hi = (e) => e.scrollTop;
function qn(e, t) {
  var n, r;
  const {
    timeout: o,
    easing: a,
    style: s = {}
  } = e;
  return {
    duration: (n = s.transitionDuration) != null ? n : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == "object" ? a[t.mode] : a,
    delay: s.transitionDelay
  };
}
const yf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Br(e) {
  return `scale(${e}, ${e ** 2})`;
}
const wf = {
  entering: {
    opacity: 1,
    transform: Br(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, xr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), po = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: p,
    onEntering: d,
    onExit: f,
    onExited: u,
    onExiting: v,
    style: y,
    timeout: g = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: m = Ui
  } = t, E = fe(t, yf), _ = rn(), w = k.useRef(), x = Nn(), h = k.useRef(null), O = ze(h, a.ref, n), S = (D) => (M) => {
    if (D) {
      const V = h.current;
      M === void 0 ? D(V) : D(V, M);
    }
  }, L = S(d), B = S((D, M) => {
    Hi(D);
    const {
      duration: V,
      delay: te,
      easing: ee
    } = qn({
      style: y,
      timeout: g,
      easing: s
    }, {
      mode: "enter"
    });
    let N;
    g === "auto" ? (N = x.transitions.getAutoHeightDuration(D.clientHeight), w.current = N) : N = V, D.style.transition = [x.transitions.create("opacity", {
      duration: N,
      delay: te
    }), x.transitions.create("transform", {
      duration: xr ? N : N * 0.666,
      delay: te,
      easing: ee
    })].join(","), c && c(D, M);
  }), F = S(p), C = S(v), R = S((D) => {
    const {
      duration: M,
      delay: V,
      easing: te
    } = qn({
      style: y,
      timeout: g,
      easing: s
    }, {
      mode: "exit"
    });
    let ee;
    g === "auto" ? (ee = x.transitions.getAutoHeightDuration(D.clientHeight), w.current = ee) : ee = M, D.style.transition = [x.transitions.create("opacity", {
      duration: ee,
      delay: V
    }), x.transitions.create("transform", {
      duration: xr ? ee : ee * 0.666,
      delay: xr ? V : V || ee * 0.333,
      easing: te
    })].join(","), D.style.opacity = 0, D.style.transform = Br(0.75), f && f(D);
  }), $ = S(u);
  return /* @__PURE__ */ b(m, T({
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
      g === "auto" && _.start(w.current || 0, D), r && r(h.current, D);
    },
    timeout: g === "auto" ? null : g
  }, E, {
    children: (D, M) => /* @__PURE__ */ k.cloneElement(a, T({
      style: T({
        opacity: 0,
        transform: Br(0.75),
        visibility: D === "exited" && !l ? "hidden" : void 0
      }, wf[D], y, a.props.style),
      ref: O
    }, M))
  }));
});
process.env.NODE_ENV !== "production" && (po.propTypes = {
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
  children: yn.isRequired,
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
po.muiSupportAuto = !0;
const Lr = po, xf = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, ka = xf, Ef = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], kf = Ne(Ai, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Wi = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r;
  const o = Li(), a = it({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: p,
    container: d,
    disablePortal: f,
    keepMounted: u,
    modifiers: v,
    open: y,
    placement: g,
    popperOptions: m,
    popperRef: E,
    transition: _,
    slots: w,
    slotProps: x
  } = a, h = fe(a, Ef), O = (r = w == null ? void 0 : w.root) != null ? r : c == null ? void 0 : c.Root, S = T({
    anchorEl: s,
    container: d,
    disablePortal: f,
    keepMounted: u,
    modifiers: v,
    open: y,
    placement: g,
    popperOptions: m,
    popperRef: E,
    transition: _
  }, h);
  return /* @__PURE__ */ b(kf, T({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: O
    },
    slotProps: x ?? p
  }, S, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Wi.propTypes = {
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
  anchorEl: i.oneOfType([nt, i.object, i.func]),
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
  container: i.oneOfType([nt, i.func]),
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
  popperRef: Yr,
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
const qi = Wi;
function Tf(e) {
  return Je("MuiTooltip", e);
}
const Nf = pt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ct = Nf, Of = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Cf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Sf = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ge(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return at(s, Tf, t);
}, Pf = Ne(qi, {
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
  [`&[data-popper-placement*="bottom"] .${ct.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${ct.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${ct.arrow}`]: T({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ct.arrow}`]: T({}, t.isRtl ? {
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
})), Rf = Ne("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Ge(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => T({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Wn(e.palette.grey[700], 0.92),
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
  lineHeight: `${Cf(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${ct.popper}[data-popper-placement*="left"] &`]: T({
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
  [`.${ct.popper}[data-popper-placement*="right"] &`]: T({
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
  [`.${ct.popper}[data-popper-placement*="top"] &`]: T({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${ct.popper}[data-popper-placement*="bottom"] &`]: T({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), $f = Ne("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Wn(e.palette.grey[700], 0.9),
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
let _n = !1;
const Ta = new wn();
let en = {
  x: 0,
  y: 0
};
function In(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Xi = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, a, s, l, c, p, d, f, u, v, y, g, m, E, _, w, x, h;
  const O = it({
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
    enterTouchDelay: te = 700,
    followCursor: ee = !1,
    id: N,
    leaveDelay: A = 0,
    leaveTouchDelay: U = 1500,
    onClose: G,
    onOpen: z,
    open: H,
    placement: q = "bottom",
    PopperComponent: X,
    PopperProps: W = {},
    slotProps: K = {},
    slots: J = {},
    title: ae,
    TransitionComponent: I = Lr,
    TransitionProps: Q
  } = O, P = fe(O, Of), ie = /* @__PURE__ */ k.isValidElement(L) ? L : /* @__PURE__ */ b("span", {
    children: L
  }), we = Nn(), Oe = we.direction === "rtl", [ve, ft] = k.useState(), [Ce, Ze] = k.useState(null), Ie = k.useRef(!1), Qe = j || ee, xe = rn(), Ot = rn(), mt = rn(), Wt = rn(), [On, go] = ui({
    controlled: H,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let et = On;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = k.useRef(H !== void 0);
    k.useEffect(() => {
      ve && ve.disabled && !ne && ae !== "" && ve.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ae, ve, ne]);
  }
  const sr = di(N), qt = k.useRef(), Cn = fn(() => {
    qt.current !== void 0 && (document.body.style.WebkitUserSelect = qt.current, qt.current = void 0), Wt.clear();
  });
  k.useEffect(() => Cn, [Cn]);
  const bo = (ne) => {
    Ta.clear(), _n = !0, go(!0), z && !et && z(ne);
  }, Sn = fn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      Ta.start(800 + A, () => {
        _n = !1;
      }), go(!1), G && et && G(ne), xe.start(we.transitions.duration.shortest, () => {
        Ie.current = !1;
      });
    }
  ), lr = (ne) => {
    Ie.current && ne.type !== "touchstart" || (ve && ve.removeAttribute("title"), Ot.clear(), mt.clear(), M || _n && V ? Ot.start(_n ? V : M, () => {
      bo(ne);
    }) : bo(ne));
  }, vo = (ne) => {
    Ot.clear(), mt.start(A, () => {
      Sn(ne);
    });
  }, {
    isFocusVisibleRef: yo,
    onBlur: ps,
    onFocus: ds,
    ref: us
  } = fi(), [, wo] = k.useState(!1), xo = (ne) => {
    ps(ne), yo.current === !1 && (wo(!1), vo(ne));
  }, Eo = (ne) => {
    ve || ft(ne.currentTarget), ds(ne), yo.current === !0 && (wo(!0), lr(ne));
  }, ko = (ne) => {
    Ie.current = !0;
    const Ae = ie.props;
    Ae.onTouchStart && Ae.onTouchStart(ne);
  }, To = lr, No = vo, fs = (ne) => {
    ko(ne), mt.clear(), xe.clear(), Cn(), qt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Wt.start(te, () => {
      document.body.style.WebkitUserSelect = qt.current, lr(ne);
    });
  }, ms = (ne) => {
    ie.props.onTouchEnd && ie.props.onTouchEnd(ne), Cn(), mt.start(U, () => {
      Sn(ne);
    });
  };
  k.useEffect(() => {
    if (!et)
      return;
    function ne(Ae) {
      (Ae.key === "Escape" || Ae.key === "Esc") && Sn(Ae);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [Sn, et]);
  const hs = ze(ie.ref, us, ft, n);
  !ae && ae !== 0 && (et = !1);
  const cr = k.useRef(), gs = (ne) => {
    const Ae = ie.props;
    Ae.onMouseMove && Ae.onMouseMove(ne), en = {
      x: ne.clientX,
      y: ne.clientY
    }, cr.current && cr.current.update();
  }, Xt = {}, pr = typeof ae == "string";
  C ? (Xt.title = !et && pr && !$ ? ae : null, Xt["aria-describedby"] = et ? sr : null) : (Xt["aria-label"] = pr ? ae : null, Xt["aria-labelledby"] = et && !pr ? sr : null);
  const Le = T({}, Xt, P, ie.props, {
    className: ke(P.className, ie.props.className),
    onTouchStart: ko,
    ref: hs
  }, ee ? {
    onMouseMove: gs
  } : {});
  process.env.NODE_ENV !== "production" && (Le["data-mui-internal-clone-element"] = !0, k.useEffect(() => {
    ve && !ve.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [ve]));
  const Yt = {};
  D || (Le.onTouchStart = fs, Le.onTouchEnd = ms), $ || (Le.onMouseOver = In(To, Le.onMouseOver), Le.onMouseLeave = In(No, Le.onMouseLeave), Qe || (Yt.onMouseOver = To, Yt.onMouseLeave = No)), R || (Le.onFocus = In(Eo, Le.onFocus), Le.onBlur = In(xo, Le.onBlur), Qe || (Yt.onFocus = Eo, Yt.onBlur = xo)), process.env.NODE_ENV !== "production" && ie.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${ie.props.title}\` or the Tooltip component.`].join(`
`));
  const bs = k.useMemo(() => {
    var ne;
    let Ae = [{
      name: "arrow",
      enabled: !!Ce,
      options: {
        element: Ce,
        padding: 4
      }
    }];
    return (ne = W.popperOptions) != null && ne.modifiers && (Ae = Ae.concat(W.popperOptions.modifiers)), T({}, W.popperOptions, {
      modifiers: Ae
    });
  }, [Ce, W]), Gt = T({}, O, {
    isRtl: Oe,
    arrow: S,
    disableInteractive: Qe,
    placement: q,
    PopperComponentProp: X,
    touch: Ie.current
  }), dr = Sf(Gt), Oo = (r = (o = J.popper) != null ? o : B.Popper) != null ? r : Pf, Co = (a = (s = (l = J.transition) != null ? l : B.Transition) != null ? s : I) != null ? a : Lr, So = (c = (p = J.tooltip) != null ? p : B.Tooltip) != null ? c : Rf, Po = (d = (f = J.arrow) != null ? f : B.Arrow) != null ? d : $f, vs = on(Oo, T({}, W, (u = K.popper) != null ? u : F.popper, {
    className: ke(dr.popper, W == null ? void 0 : W.className, (v = (y = K.popper) != null ? y : F.popper) == null ? void 0 : v.className)
  }), Gt), ys = on(Co, T({}, Q, (g = K.transition) != null ? g : F.transition), Gt), ws = on(So, T({}, (m = K.tooltip) != null ? m : F.tooltip, {
    className: ke(dr.tooltip, (E = (_ = K.tooltip) != null ? _ : F.tooltip) == null ? void 0 : E.className)
  }), Gt), xs = on(Po, T({}, (w = K.arrow) != null ? w : F.arrow, {
    className: ke(dr.arrow, (x = (h = K.arrow) != null ? h : F.arrow) == null ? void 0 : x.className)
  }), Gt);
  return /* @__PURE__ */ re(k.Fragment, {
    children: [/* @__PURE__ */ k.cloneElement(ie, Le), /* @__PURE__ */ b(Oo, T({
      as: X ?? qi,
      placement: q,
      anchorEl: ee ? {
        getBoundingClientRect: () => ({
          top: en.y,
          left: en.x,
          right: en.x,
          bottom: en.y,
          width: 0,
          height: 0
        })
      } : ve,
      popperRef: cr,
      open: ve ? et : !1,
      id: sr,
      transition: !0
    }, Yt, vs, {
      popperOptions: bs,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ b(Co, T({
        timeout: we.transitions.duration.shorter
      }, ne, ys, {
        children: /* @__PURE__ */ re(So, T({}, ws, {
          children: [ae, S ? /* @__PURE__ */ b(Po, T({}, xs, {
            ref: Ze
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Xi.propTypes = {
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
  children: yn.isRequired,
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
const Mf = Xi;
var uo = {}, Yi = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Yi);
var _f = Yi.exports, Er = {};
function If(e) {
  return Je("MuiSvgIcon", e);
}
pt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Af = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Df = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ge(t)}`, `fontSize${Ge(n)}`]
  };
  return at(o, If, r);
}, jf = Ne("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Ge(n.color)}`], t[`fontSize${Ge(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, a, s, l, c, p, d, f, u, v, y;
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
      small: ((a = e.typography) == null || (s = a.pxToRem) == null ? void 0 : s.call(a, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((p = e.typography) == null || (d = p.pxToRem) == null ? void 0 : d.call(p, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (f = (u = (e.vars || e).palette) == null || (u = u[t.color]) == null ? void 0 : u.main) != null ? f : {
      action: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.active,
      disabled: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[t.color]
  };
}), fo = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = it({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: s = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: p,
    inheritViewBox: d = !1,
    titleAccess: f,
    viewBox: u = "0 0 24 24"
  } = r, v = fe(r, Af), y = /* @__PURE__ */ k.isValidElement(o) && o.type === "svg", g = T({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: u,
    hasSvgAsChild: y
  }), m = {};
  d || (m.viewBox = u);
  const E = Df(g);
  return /* @__PURE__ */ re(jf, T({
    as: l,
    className: ke(E.root, a),
    focusable: "false",
    color: p,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, m, v, y && o.props, {
    ownerState: g,
    children: [y ? o.props.children : o, f ? /* @__PURE__ */ b("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (fo.propTypes = {
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
fo.muiName = "SvgIcon";
const Na = fo;
function Gi(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ b(Na, T({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Na.muiName, /* @__PURE__ */ k.memo(/* @__PURE__ */ k.forwardRef(n));
}
const Bf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), yi.configure(e);
  }
}, Lf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ge,
  createChainedFunction: $r,
  createSvgIcon: Gi,
  debounce: pi,
  deprecatedPropType: dc,
  isMuiElement: uc,
  ownerDocument: Te,
  ownerWindow: jt,
  requirePropFactory: fc,
  setRef: Fn,
  unstable_ClassNameGenerator: Bf,
  unstable_useEnhancedEffect: Et,
  unstable_useId: di,
  unsupportedProp: gc,
  useControlled: ui,
  useEventCallback: fn,
  useForkRef: ze,
  useIsFocusVisible: fi
}, Symbol.toStringTag, { value: "Module" })), Ff = /* @__PURE__ */ Hl(Lf);
var Oa;
function Vf() {
  return Oa || (Oa = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Ff;
  }(Er)), Er;
}
var zf = _f;
Object.defineProperty(uo, "__esModule", {
  value: !0
});
var Ki = uo.default = void 0, Uf = zf(Vf()), Hf = Es;
Ki = uo.default = (0, Uf.default)(/* @__PURE__ */ (0, Hf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Ca(e, t, n) {
  return e ? /* @__PURE__ */ b(Da, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ b("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ji(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: p = !1,
    isDense: d = !0,
    isSubMenuParent: f = !1,
    hasDisabledGutters: u = !1,
    hasDivider: v = !1,
    focusVisibleClassName: y,
    id: g,
    children: m
  } = e, E = /* @__PURE__ */ b(
    Fs,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: p,
      dense: d,
      disableGutters: u,
      divider: v,
      focusVisibleClassName: y,
      onClick: t,
      id: g,
      children: n ? /* @__PURE__ */ re(Yn, { children: [
        Ca(a, n, !0),
        /* @__PURE__ */ b(Vs, { primary: n, inset: !a && o }),
        f ? /* @__PURE__ */ b(Da, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ b(Ki, {}) }) : Ca(s, n, !1)
      ] }) : m
    }
  );
  return r ? /* @__PURE__ */ b(Mf, { title: r, placement: "right", children: /* @__PURE__ */ b("div", { children: E }) }) : E;
}
function Zi(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Wf(e) {
  const [t, n] = Ee(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = e, s = (p) => {
    n(p.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let p = Zi(a).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return p = p.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ b(mo, { ...e, includedGroups: p });
  };
  return /* @__PURE__ */ re(Yn, { children: [
    /* @__PURE__ */ b(Ji, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ b(
      zs,
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
const qf = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function mo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: a, allowForLeadingIcons: s } = vn(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Zi(t).filter((y) => !("menuItem" in y.group))
    ), f = Object.values(d).sort(
      (y, g) => (y.group.order || 0) - (g.group.order || 0)
    ), u = [];
    f.forEach((y) => {
      qf(y.id, t.items).forEach(
        (g) => u.push({ item: g, isLastItemInGroup: !1 })
      ), u.length > 0 && (u[u.length - 1].isLastItemInGroup = !0);
    }), u.length > 0 && (u[u.length - 1].isLastItemInGroup = !1);
    const v = u.some(
      (y) => "iconPathBefore" in y.item && y.item.iconPathBefore
    );
    return { items: u, allowForLeadingIcons: v };
  }, [o, t]), l = ({ item: d, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: d.label,
    tooltip: d.tooltip,
    iconPathBefore: "iconPathBefore" in d ? d.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in d ? d.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ b("div", {});
  const p = c.item.group;
  return /* @__PURE__ */ b("div", { role: "menu", "aria-label": p, children: a.map((d, f) => {
    const { item: u } = d, v = l(d);
    if ("command" in u) {
      const y = u.group + f;
      return /* @__PURE__ */ b(
        Ji,
        {
          onClick: (g) => {
            n == null || n(g), r(u);
          },
          ...v
        },
        y
      );
    }
    return /* @__PURE__ */ b(
      Wf,
      {
        parentMenuItem: u,
        parentItemProps: v,
        ...e
      },
      p + u.id
    );
  }) }, p);
}
function Xf(e) {
  const { menuDefinition: t, columnId: n } = e;
  let a = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (a = a.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ b(mo, { ...e, includedGroups: a });
}
function Yf({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ re(
    ja,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ b("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ b(Us, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ b(
          Xf,
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
function Gf({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = vn(() => {
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
  return /* @__PURE__ */ b(
    ja,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((s, l) => /* @__PURE__ */ b(
        Yf,
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
const Qi = /* @__PURE__ */ k.createContext({});
process.env.NODE_ENV !== "production" && (Qi.displayName = "ListContext");
const Kf = Qi;
function Jf(e) {
  return Je("MuiList", e);
}
pt("MuiList", ["root", "padding", "dense", "subheader"]);
const Zf = ["children", "className", "component", "dense", "disablePadding", "subheader"], Qf = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return at({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Jf, t);
}, em = Ne("ul", {
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
})), es = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = it({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: s = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: p
  } = r, d = fe(r, Zf), f = k.useMemo(() => ({
    dense: l
  }), [l]), u = T({}, r, {
    component: s,
    dense: l,
    disablePadding: c
  }), v = Qf(u);
  return /* @__PURE__ */ b(Kf.Provider, {
    value: f,
    children: /* @__PURE__ */ re(em, T({
      as: s,
      className: ke(v.root, a),
      ref: n,
      ownerState: u
    }, d, {
      children: [p, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (es.propTypes = {
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
const tm = es, nm = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function kr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function Sa(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function ts(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function tn(e, t, n, r, o, a) {
  let s = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !ts(l, a) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const ns = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: a = !1,
    children: s,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: p = !1,
    onKeyDown: d,
    variant: f = "selectedMenu"
  } = t, u = fe(t, nm), v = k.useRef(null), y = k.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Et(() => {
    o && v.current.focus();
  }, [o]), k.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (w, x) => {
      const h = !v.current.style.width;
      if (w.clientHeight < v.current.clientHeight && h) {
        const O = `${mi(Te(w))}px`;
        v.current.style[x.direction === "rtl" ? "paddingLeft" : "paddingRight"] = O, v.current.style.width = `calc(100% + ${O})`;
      }
      return v.current;
    }
  }), []);
  const g = (w) => {
    const x = v.current, h = w.key, O = Te(x).activeElement;
    if (h === "ArrowDown")
      w.preventDefault(), tn(x, O, p, c, kr);
    else if (h === "ArrowUp")
      w.preventDefault(), tn(x, O, p, c, Sa);
    else if (h === "Home")
      w.preventDefault(), tn(x, null, p, c, kr);
    else if (h === "End")
      w.preventDefault(), tn(x, null, p, c, Sa);
    else if (h.length === 1) {
      const S = y.current, L = h.toLowerCase(), B = performance.now();
      S.keys.length > 0 && (B - S.lastTime > 500 ? (S.keys = [], S.repeating = !0, S.previousKeyMatched = !0) : S.repeating && L !== S.keys[0] && (S.repeating = !1)), S.lastTime = B, S.keys.push(L);
      const F = O && !S.repeating && ts(O, S);
      S.previousKeyMatched && (F || tn(x, O, !1, c, kr, S)) ? w.preventDefault() : S.previousKeyMatched = !1;
    }
    d && d(w);
  }, m = ze(v, n);
  let E = -1;
  k.Children.forEach(s, (w, x) => {
    if (!/* @__PURE__ */ k.isValidElement(w)) {
      E === x && (E += 1, E >= s.length && (E = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Ln.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (f === "selectedMenu" && w.props.selected || E === -1) && (E = x), E === x && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (E += 1, E >= s.length && (E = -1));
  });
  const _ = k.Children.map(s, (w, x) => {
    if (x === E) {
      const h = {};
      return a && (h.autoFocus = !0), w.props.tabIndex === void 0 && f === "selectedMenu" && (h.tabIndex = 0), /* @__PURE__ */ k.cloneElement(w, h);
    }
    return w;
  });
  return /* @__PURE__ */ b(tm, T({
    role: "menu",
    ref: m,
    className: l,
    onKeyDown: g,
    tabIndex: o ? 0 : -1
  }, u, {
    children: _
  }));
});
process.env.NODE_ENV !== "production" && (ns.propTypes = {
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
const rm = ns, om = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], am = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, rs = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = Nn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: a,
    appear: s = !0,
    children: l,
    easing: c,
    in: p,
    onEnter: d,
    onEntered: f,
    onEntering: u,
    onExit: v,
    onExited: y,
    onExiting: g,
    style: m,
    timeout: E = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: _ = Ui
  } = t, w = fe(t, om), x = k.useRef(null), h = ze(x, l.ref, n), O = (j) => (D) => {
    if (j) {
      const M = x.current;
      D === void 0 ? j(M) : j(M, D);
    }
  }, S = O(u), L = O((j, D) => {
    Hi(j);
    const M = qn({
      style: m,
      timeout: E,
      easing: c
    }, {
      mode: "enter"
    });
    j.style.webkitTransition = r.transitions.create("opacity", M), j.style.transition = r.transitions.create("opacity", M), d && d(j, D);
  }), B = O(f), F = O(g), C = O((j) => {
    const D = qn({
      style: m,
      timeout: E,
      easing: c
    }, {
      mode: "exit"
    });
    j.style.webkitTransition = r.transitions.create("opacity", D), j.style.transition = r.transitions.create("opacity", D), v && v(j);
  }), R = O(y);
  return /* @__PURE__ */ b(_, T({
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
      a && a(x.current, j);
    },
    timeout: E
  }, w, {
    children: (j, D) => /* @__PURE__ */ k.cloneElement(l, T({
      style: T({
        opacity: 0,
        visibility: j === "exited" && !p ? "hidden" : void 0
      }, am[j], m, l.props.style),
      ref: h
    }, D))
  }));
});
process.env.NODE_ENV !== "production" && (rs.propTypes = {
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
  children: yn.isRequired,
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
const im = rs;
function sm(e) {
  return Je("MuiBackdrop", e);
}
pt("MuiBackdrop", ["root", "invisible"]);
const lm = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], cm = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return at({
    root: ["root", n && "invisible"]
  }, sm, t);
}, pm = Ne("div", {
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
})), os = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, a;
  const s = it({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: p = "div",
    components: d = {},
    componentsProps: f = {},
    invisible: u = !1,
    open: v,
    slotProps: y = {},
    slots: g = {},
    TransitionComponent: m = im,
    transitionDuration: E
  } = s, _ = fe(s, lm), w = T({}, s, {
    component: p,
    invisible: u
  }), x = cm(w), h = (r = y.root) != null ? r : f.root;
  return /* @__PURE__ */ b(m, T({
    in: v,
    timeout: E
  }, _, {
    children: /* @__PURE__ */ b(pm, T({
      "aria-hidden": !0
    }, h, {
      as: (o = (a = g.root) != null ? a : d.Root) != null ? o : p,
      className: ke(x.root, c, h == null ? void 0 : h.className),
      ownerState: T({}, w, h == null ? void 0 : h.ownerState),
      classes: x,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (os.propTypes = {
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
const dm = os;
function um(e) {
  return Je("MuiModal", e);
}
pt("MuiModal", ["root", "hidden", "backdrop"]);
const fm = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], mm = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return at({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, um, r);
}, hm = Ne("div", {
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
})), gm = Ne(dm, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), as = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, a, s, l, c;
  const p = it({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = gm,
    BackdropProps: f,
    className: u,
    closeAfterTransition: v = !1,
    children: y,
    container: g,
    component: m,
    components: E = {},
    componentsProps: _ = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: x = !1,
    disableEscapeKeyDown: h = !1,
    disablePortal: O = !1,
    disableRestoreFocus: S = !1,
    disableScrollLock: L = !1,
    hideBackdrop: B = !1,
    keepMounted: F = !1,
    onBackdropClick: C,
    open: R,
    slotProps: $,
    slots: j
    // eslint-disable-next-line react/prop-types
  } = p, D = fe(p, fm), M = T({}, p, {
    closeAfterTransition: v,
    disableAutoFocus: w,
    disableEnforceFocus: x,
    disableEscapeKeyDown: h,
    disablePortal: O,
    disableRestoreFocus: S,
    disableScrollLock: L,
    hideBackdrop: B,
    keepMounted: F
  }), {
    getRootProps: V,
    getBackdropProps: te,
    getTransitionProps: ee,
    portalRef: N,
    isTopModal: A,
    exited: U,
    hasTransition: G
  } = rp(T({}, M, {
    rootRef: n
  })), z = T({}, M, {
    exited: U
  }), H = mm(z), q = {};
  if (y.props.tabIndex === void 0 && (q.tabIndex = "-1"), G) {
    const {
      onEnter: Q,
      onExited: P
    } = ee();
    q.onEnter = Q, q.onExited = P;
  }
  const X = (r = (o = j == null ? void 0 : j.root) != null ? o : E.Root) != null ? r : hm, W = (a = (s = j == null ? void 0 : j.backdrop) != null ? s : E.Backdrop) != null ? a : d, K = (l = $ == null ? void 0 : $.root) != null ? l : _.root, J = (c = $ == null ? void 0 : $.backdrop) != null ? c : _.backdrop, ae = kt({
    elementType: X,
    externalSlotProps: K,
    externalForwardedProps: D,
    getSlotProps: V,
    additionalProps: {
      ref: n,
      as: m
    },
    ownerState: z,
    className: ke(u, K == null ? void 0 : K.className, H == null ? void 0 : H.root, !z.open && z.exited && (H == null ? void 0 : H.hidden))
  }), I = kt({
    elementType: W,
    externalSlotProps: J,
    additionalProps: f,
    getSlotProps: (Q) => te(T({}, Q, {
      onClick: (P) => {
        C && C(P), Q != null && Q.onClick && Q.onClick(P);
      }
    })),
    className: ke(J == null ? void 0 : J.className, f == null ? void 0 : f.className, H == null ? void 0 : H.backdrop),
    ownerState: z
  });
  return !F && !R && (!G || U) ? null : /* @__PURE__ */ b(mn, {
    ref: N,
    container: g,
    disablePortal: O,
    children: /* @__PURE__ */ re(X, T({}, ae, {
      children: [!B && d ? /* @__PURE__ */ b(W, T({}, I)) : null, /* @__PURE__ */ b(Vn, {
        disableEnforceFocus: x,
        disableAutoFocus: w,
        disableRestoreFocus: S,
        isEnabled: A,
        open: R,
        children: /* @__PURE__ */ k.cloneElement(y, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (as.propTypes = {
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
  children: yn.isRequired,
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
  container: i.oneOfType([nt, i.func]),
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
const bm = as;
function vm(e) {
  return Je("MuiPaper", e);
}
pt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const ym = ["className", "component", "elevation", "square", "variant"], wm = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, a = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return at(a, vm, o);
}, xm = Ne("div", {
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
    backgroundImage: `linear-gradient(${Wn("#fff", ka(t.elevation))}, ${Wn("#fff", ka(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), is = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = it({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, p = fe(r, ym), d = T({}, r, {
    component: a,
    elevation: s,
    square: l,
    variant: c
  }), f = wm(d);
  return process.env.NODE_ENV !== "production" && Nn().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ b(xm, T({
    as: a,
    ownerState: d,
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
  elevation: Ht(bi, (e) => {
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
const Em = is;
function km(e) {
  return Je("MuiPopover", e);
}
pt("MuiPopover", ["root", "paper"]);
const Tm = ["onEntering"], Nm = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Om = ["slotProps"];
function Pa(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Ra(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function $a(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Bn(e) {
  return typeof e == "function" ? e() : e;
}
const Cm = (e) => {
  const {
    classes: t
  } = e;
  return at({
    root: ["root"],
    paper: ["paper"]
  }, km, t);
}, Sm = Ne(bm, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ss = Ne(Em, {
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
}), ls = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, a;
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
    anchorPosition: d,
    anchorReference: f = "anchorEl",
    children: u,
    className: v,
    container: y,
    elevation: g = 8,
    marginThreshold: m = 16,
    open: E,
    PaperProps: _ = {},
    slots: w,
    slotProps: x,
    transformOrigin: h = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: O = Lr,
    transitionDuration: S = "auto",
    TransitionProps: {
      onEntering: L
    } = {},
    disableScrollLock: B = !1
  } = s, F = fe(s.TransitionProps, Tm), C = fe(s, Nm), R = (r = x == null ? void 0 : x.paper) != null ? r : _, $ = k.useRef(), j = ze($, R.ref), D = T({}, s, {
    anchorOrigin: p,
    anchorReference: f,
    elevation: g,
    marginThreshold: m,
    externalPaperSlotProps: R,
    transformOrigin: h,
    TransitionComponent: O,
    transitionDuration: S,
    TransitionProps: F
  }), M = Cm(D), V = k.useCallback(() => {
    if (f === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const Q = Bn(c), P = Q && Q.nodeType === 1 ? Q : Te($.current).body, ie = P.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const we = P.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && we.top === 0 && we.left === 0 && we.right === 0 && we.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: ie.top + Pa(ie, p.vertical),
      left: ie.left + Ra(ie, p.horizontal)
    };
  }, [c, p.horizontal, p.vertical, d, f]), te = k.useCallback((Q) => ({
    vertical: Pa(Q, h.vertical),
    horizontal: Ra(Q, h.horizontal)
  }), [h.horizontal, h.vertical]), ee = k.useCallback((Q) => {
    const P = {
      width: Q.offsetWidth,
      height: Q.offsetHeight
    }, ie = te(P);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: $a(ie)
      };
    const we = V();
    let Oe = we.top - ie.vertical, ve = we.left - ie.horizontal;
    const ft = Oe + P.height, Ce = ve + P.width, Ze = jt(Bn(c)), Ie = Ze.innerHeight - m, Qe = Ze.innerWidth - m;
    if (m !== null && Oe < m) {
      const xe = Oe - m;
      Oe -= xe, ie.vertical += xe;
    } else if (m !== null && ft > Ie) {
      const xe = ft - Ie;
      Oe -= xe, ie.vertical += xe;
    }
    if (process.env.NODE_ENV !== "production" && P.height > Ie && P.height && Ie && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${P.height - Ie}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), m !== null && ve < m) {
      const xe = ve - m;
      ve -= xe, ie.horizontal += xe;
    } else if (Ce > Qe) {
      const xe = Ce - Qe;
      ve -= xe, ie.horizontal += xe;
    }
    return {
      top: `${Math.round(Oe)}px`,
      left: `${Math.round(ve)}px`,
      transformOrigin: $a(ie)
    };
  }, [c, f, V, te, m]), [N, A] = k.useState(E), U = k.useCallback(() => {
    const Q = $.current;
    if (!Q)
      return;
    const P = ee(Q);
    P.top !== null && (Q.style.top = P.top), P.left !== null && (Q.style.left = P.left), Q.style.transformOrigin = P.transformOrigin, A(!0);
  }, [ee]);
  k.useEffect(() => (B && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, B, U]);
  const G = (Q, P) => {
    L && L(Q, P), U();
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
    const Q = pi(() => {
      U();
    }), P = jt(c);
    return P.addEventListener("resize", Q), () => {
      Q.clear(), P.removeEventListener("resize", Q);
    };
  }, [c, E, U]);
  let H = S;
  S === "auto" && !O.muiSupportAuto && (H = void 0);
  const q = y || (c ? Te(Bn(c)).body : void 0), X = (o = w == null ? void 0 : w.root) != null ? o : Sm, W = (a = w == null ? void 0 : w.paper) != null ? a : ss, K = kt({
    elementType: W,
    externalSlotProps: T({}, R, {
      style: N ? R.style : T({}, R.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: g,
      ref: j
    },
    ownerState: D,
    className: ke(M.paper, R == null ? void 0 : R.className)
  }), J = kt({
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
      open: E
    },
    ownerState: D,
    className: ke(M.root, v)
  }), {
    slotProps: ae
  } = J, I = fe(J, Om);
  return /* @__PURE__ */ b(X, T({}, I, !xi(X) && {
    slotProps: ae,
    disableScrollLock: B
  }, {
    children: /* @__PURE__ */ b(O, T({
      appear: !0,
      in: E,
      onEntering: G,
      onExited: z,
      timeout: H
    }, F, {
      children: /* @__PURE__ */ b(W, T({}, K, {
        children: u
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ls.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Yr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Ht(i.oneOfType([nt, i.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Bn(e.anchorEl);
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
  container: i.oneOfType([nt, i.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: i.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: bi,
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
    component: rc
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
const Pm = ls;
function Rm(e) {
  return Je("MuiMenu", e);
}
pt("MuiMenu", ["root", "paper", "list"]);
const $m = ["onEntering"], Mm = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], _m = {
  vertical: "top",
  horizontal: "right"
}, Im = {
  vertical: "top",
  horizontal: "left"
}, Am = (e) => {
  const {
    classes: t
  } = e;
  return at({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Rm, t);
}, Dm = Ne(Pm, {
  shouldForwardProp: (e) => Vi(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), jm = Ne(ss, {
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
}), Bm = Ne(rm, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), cs = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o;
  const a = it({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: l,
    className: c,
    disableAutoFocusItem: p = !1,
    MenuListProps: d = {},
    onClose: f,
    open: u,
    PaperProps: v = {},
    PopoverClasses: y,
    transitionDuration: g = "auto",
    TransitionProps: {
      onEntering: m
    } = {},
    variant: E = "selectedMenu",
    slots: _ = {},
    slotProps: w = {}
  } = a, x = fe(a.TransitionProps, $m), h = fe(a, Mm), O = Nn(), S = O.direction === "rtl", L = T({}, a, {
    autoFocus: s,
    disableAutoFocusItem: p,
    MenuListProps: d,
    onEntering: m,
    PaperProps: v,
    transitionDuration: g,
    TransitionProps: x,
    variant: E
  }), B = Am(L), F = s && !p && u, C = k.useRef(null), R = (ee, N) => {
    C.current && C.current.adjustStyleForScrollbar(ee, O), m && m(ee, N);
  }, $ = (ee) => {
    ee.key === "Tab" && (ee.preventDefault(), f && f(ee, "tabKeyDown"));
  };
  let j = -1;
  k.Children.map(l, (ee, N) => {
    /* @__PURE__ */ k.isValidElement(ee) && (process.env.NODE_ENV !== "production" && Ln.isFragment(ee) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), ee.props.disabled || (E === "selectedMenu" && ee.props.selected || j === -1) && (j = N));
  });
  const D = (r = _.paper) != null ? r : jm, M = (o = w.paper) != null ? o : v, V = kt({
    elementType: _.root,
    externalSlotProps: w.root,
    ownerState: L,
    className: [B.root, c]
  }), te = kt({
    elementType: D,
    externalSlotProps: M,
    ownerState: L,
    className: B.paper
  });
  return /* @__PURE__ */ b(Dm, T({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: S ? "right" : "left"
    },
    transformOrigin: S ? _m : Im,
    slots: {
      paper: D,
      root: _.root
    },
    slotProps: {
      root: V,
      paper: te
    },
    open: u,
    ref: n,
    transitionDuration: g,
    TransitionProps: T({
      onEntering: R
    }, x),
    ownerState: L
  }, h, {
    classes: y,
    children: /* @__PURE__ */ b(Bm, T({
      onKeyDown: $,
      actions: C,
      autoFocus: s && (j === -1 || p),
      autoFocusItem: F,
      variant: E
    }, d, {
      className: ke(B.list, d.className),
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
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: i.oneOfType([nt, i.func]),
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
const Lm = cs;
function $h({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var p;
  const [o, a] = Z.useState(void 0), s = Pe(
    (d) => {
      d.preventDefault(), a(
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
  ), l = Pe(() => {
    a(void 0);
  }, []), c = vn(() => {
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
        /* @__PURE__ */ b(
          Lm,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ b(
              mo,
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
const Fm = Gi(/* @__PURE__ */ b("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Vm(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Fr = (e, t, n = {}) => {
  const r = yt(t);
  r.current = t;
  const o = yt(n);
  o.current = Vm(o.current);
  const [a, s] = Ee(() => r.current), [l, c] = Ee(!0);
  return zt(() => {
    let p = !0;
    return c(!!e), (async () => {
      if (e) {
        const d = await e();
        p && (s(() => d), c(!1));
      }
    })(), () => {
      p = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [a, l];
};
function zm({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, p] = Ee(!1), [d, f] = Ee(!1), u = Pe(() => {
    c && p(!1), f(!1);
  }, [c]), v = Pe((x) => {
    x.stopPropagation(), p((h) => {
      const O = !h;
      return O && x.shiftKey ? f(!0) : O || f(!1), O;
    });
  }, []), y = Pe(
    (x) => (u(), r(x)),
    [r, u]
  ), [g, m] = Ee({ top: 1, left: 1 });
  zt(() => {
    if (c) {
      const x = o == null ? void 0 : o.current;
      if (x) {
        const h = x.getBoundingClientRect(), O = window.scrollY, S = window.scrollX, L = h.top + O + x.clientHeight, B = h.left + S;
        m({ top: L, left: B });
      }
    }
  }, [c, o]);
  const [E] = Fr(
    Pe(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [_] = Fr(
    Pe(async () => (e == null ? void 0 : e(!0)) ?? n ?? E, [e, n, E, c]),
    n ?? E
  ), w = d && _ ? _ : E;
  return /* @__PURE__ */ re(Yn, { children: [
    /* @__PURE__ */ b(
      Ba,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: v,
        children: l ?? /* @__PURE__ */ b(Fm, {})
      }
    ),
    /* @__PURE__ */ b(
      Hs,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: u,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: g.top,
            left: g.left
          }
        },
        children: w ? /* @__PURE__ */ b(
          Gf,
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
function Mh({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: s = "medium",
  className: l,
  onClick: c,
  children: p
}) {
  return /* @__PURE__ */ b(
    Ba,
    {
      id: e,
      disabled: n,
      edge: a,
      size: s,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: p
    }
  );
}
const Um = Vr(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), ho = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(La.Root, { ref: n, className: Y(Um(), e), ...t }));
ho.displayName = La.Root.displayName;
function Xn({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: a,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: p,
  value: d,
  onChange: f,
  onFocus: u,
  onBlur: v
}) {
  return /* @__PURE__ */ re("div", { className: Y("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ b(
      ho,
      {
        htmlFor: e,
        className: Y({
          "pr-text-red-600": n,
          "pr-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ b(
      qr,
      {
        id: e,
        disabled: t,
        placeholder: s,
        required: l,
        className: Y(c, { "pr-border-red-600": n }),
        defaultValue: p,
        value: d,
        onChange: f,
        onFocus: u,
        onBlur: v
      }
    ),
    /* @__PURE__ */ b("p", { className: Y({ "pr-hidden": !o }), children: o })
  ] });
}
let Tr;
const Nr = () => (Tr || (Tr = ue.allBookIds.map((e) => ({
  bookId: e,
  label: ue.bookIdToEnglishName(e)
}))), Tr);
function _h({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c) => {
    const d = { bookNum: ue.bookIdToNumber(c.bookId), chapterNum: 1, verseNum: 1 };
    r(d);
  }, a = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, s = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = vn(() => Nr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ re("span", { id: n, className: "pr-flex pr-place-items-center", children: [
    /* @__PURE__ */ re("div", { className: "pr-inline-grid pr-items-center pr-gap-1.5", children: [
      /* @__PURE__ */ b(ho, { children: "Book" }),
      /* @__PURE__ */ b(Sr, { value: l, options: Nr(), onChange: o })
    ] }),
    /* @__PURE__ */ b(
      lt,
      {
        onClick: () => r($o(e, -1)),
        disabled: e.bookNum <= ks,
        children: "<"
      }
    ),
    /* @__PURE__ */ b(
      lt,
      {
        onClick: () => r($o(e, 1)),
        disabled: e.bookNum >= Nr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ b(
      Xn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ b(
      lt,
      {
        onClick: () => t(Mo(e, -1)),
        disabled: e.chapterNum <= Ts,
        children: "<"
      }
    ),
    /* @__PURE__ */ b(
      lt,
      {
        onClick: () => t(Mo(e, 1)),
        disabled: e.chapterNum >= Ia(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ b(
      Xn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ b(
      lt,
      {
        onClick: () => t(_o(e, -1)),
        disabled: e.verseNum <= Ns,
        children: "<"
      }
    ),
    /* @__PURE__ */ b(lt, { onClick: () => t(_o(e, 1)), children: ">" })
  ] });
}
function Ih({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = Ee(""), a = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ b(
    Xn,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => a(s.target.value)
    }
  );
}
function Ah({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: a = 1,
  showMarks: s = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: p = "off",
  className: d,
  onChange: f,
  onChangeCommitted: u
}) {
  return /* @__PURE__ */ b(
    Ws,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: a,
      marks: s,
      defaultValue: l,
      value: c,
      valueLabelDisplay: p,
      className: `papi-slider ${n} ${d ?? ""}`,
      onChange: f,
      onChangeCommitted: u
    }
  );
}
function Dh({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: l
}) {
  const c = {
    action: (s == null ? void 0 : s.action) || l,
    message: s == null ? void 0 : s.message,
    className: r
  };
  return /* @__PURE__ */ b(
    qs,
    {
      autoHideDuration: e ?? void 0,
      open: n,
      onClose: o,
      anchorOrigin: a,
      id: t,
      ContentProps: c
    }
  );
}
function jh({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ b(
    Xs,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function Ma({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return (
    // `as keyof R` reminds TypeScript of what it actually is
    // `as string` is just asserting that the input is a string because this is the default editor
    // used for all values. It will probably break on non-strings
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    /* @__PURE__ */ b(Xn, { defaultValue: t[n.key], onChange: r })
  );
}
const Hm = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ b(
  ni,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (a) => {
      e(a.target.checked, a.nativeEvent.shiftKey);
    }
  }
);
function Bh({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: n,
  onColumnResize: r,
  defaultColumnWidth: o,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: p,
  enableSelectColumn: d,
  selectColumnWidth: f = 50,
  rowKeyGetter: u,
  rowHeight: v = 35,
  headerRowHeight: y = 35,
  selectedRows: g,
  onSelectedRowsChange: m,
  onRowsChange: E,
  onCellClick: _,
  onCellDoubleClick: w,
  onCellContextMenu: x,
  onCellKeyDown: h,
  direction: O = "ltr",
  enableVirtualization: S = !0,
  onCopy: L,
  onPaste: B,
  onScroll: F,
  className: C,
  "data-testid": R
}) {
  const $ = vn(() => {
    const j = e.map((D) => typeof D.editable == "function" ? {
      ...D,
      editable: (V) => !!D.editable(V),
      renderEditCell: D.renderEditCell || Ma
    } : D.editable && !D.renderEditCell ? { ...D, renderEditCell: Ma } : D.renderEditCell && !D.editable ? { ...D, editable: !1 } : D);
    return d ? [{ ...tl, minWidth: f }, ...j] : j;
  }, [e, d, f]);
  return /* @__PURE__ */ b(
    el,
    {
      columns: $,
      defaultColumnOptions: {
        width: o,
        minWidth: a,
        maxWidth: s,
        sortable: l,
        resizable: c
      },
      sortColumns: t,
      onSortColumnsChange: n,
      onColumnResize: r,
      rows: p,
      rowKeyGetter: u,
      rowHeight: v,
      headerRowHeight: y,
      selectedRows: g,
      onSelectedRowsChange: m,
      onRowsChange: E,
      onCellClick: _,
      onCellDoubleClick: w,
      onCellContextMenu: x,
      onCellKeyDown: h,
      direction: O,
      enableVirtualization: S,
      onCopy: L,
      onPaste: B,
      onScroll: F,
      renderers: { renderCheckbox: Hm },
      className: `papi-table ${C ?? "rdg-light"}`,
      "data-testid": R
    }
  );
}
function Lh({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const a = yt(void 0);
  return /* @__PURE__ */ b("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ b(Ys, { position: "static", id: r, children: /* @__PURE__ */ re(Gs, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ b(
      zm,
      {
        commandHandler: t,
        containerRef: a,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ b("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Fh = (e, t) => {
  zt(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Or = () => !1, Vh = (e, t) => {
  const [n] = Fr(
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
}, zh = _e.Root, Wm = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  _e.List,
  {
    ref: n,
    className: Y(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Wm.displayName = _e.List.displayName;
const qm = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  _e.Trigger,
  {
    ref: n,
    className: Y(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
qm.displayName = _e.Trigger.displayName;
const Xm = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  _e.Content,
  {
    ref: n,
    className: Y(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Xm.displayName = _e.Content.displayName;
const Ym = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  _e.Root,
  {
    orientation: "vertical",
    ref: n,
    className: Y("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Ym.displayName = _e.List.displayName;
const Gm = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  _e.List,
  {
    ref: n,
    className: Y(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Gm.displayName = _e.List.displayName;
const Uh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  _e.Trigger,
  {
    ref: n,
    ...t,
    className: Y(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Km = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  _e.Content,
  {
    ref: n,
    className: Y(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Km.displayName = _e.Content.displayName;
const Jm = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ b(
    "div",
    {
      ref: n,
      className: Y(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
Jm.displayName = "Card";
const Zm = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ b(
    "div",
    {
      ref: n,
      className: Y("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
Zm.displayName = "CardHeader";
const Qm = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ b(
    "h3",
    {
      ref: n,
      className: Y("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
Qm.displayName = "CardTitle";
const eh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b("p", { ref: n, className: Y("pr-text-sm pr-text-muted-foreground", e), ...t }));
eh.displayName = "CardDescription";
const th = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ b("div", { ref: n, className: Y("pr-p-6 pr-pt-0", e), ...t })
);
th.displayName = "CardContent";
const nh = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ b("div", { ref: n, className: Y("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
nh.displayName = "CardFooter";
const rh = Vr(
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
), oh = Z.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ b("div", { ref: r, role: "alert", className: Y(rh({ variant: t }), e), ...n }));
oh.displayName = "Alert";
const ah = Z.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ re(
    "h5",
    {
      ref: n,
      className: Y("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
ah.displayName = "AlertTitle";
const ih = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b("div", { ref: n, className: Y("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
ih.displayName = "AlertDescription";
const sh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ re(
  nn.Root,
  {
    ref: n,
    className: Y(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ b(nn.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ b(nn.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ b(nn.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
sh.displayName = nn.Root.displayName;
const lh = Z.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ b(
  Cr.Root,
  {
    className: Y(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ b(
      Cr.Thumb,
      {
        className: Y(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
lh.displayName = Cr.Root.displayName;
function ch(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
ch(`.papi-checkbox {
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
.pr-h-full {
  height: 100%;
}
.pr-h-px {
  height: 1px;
}
.pr-max-h-\\[300px\\] {
  max-height: 300px;
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
.pr-max-w-64 {
  max-width: 16rem;
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
.pr-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
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
.pr-pt-0 {
  padding-top: 0px;
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
.pr-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-transition-transform {
  transition-property: transform;
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
.data-\\[disabled\\=true\\]\\:pr-pointer-events-none[data-disabled=true] {
  pointer-events: none;
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
.data-\\[selected\\=true\\]\\:pr-bg-accent[data-selected=true] {
  background-color: hsl(var(--accent));
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
.\\[\\&_p\\]\\:pr-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
  oh as Alert,
  ih as AlertDescription,
  ah as AlertTitle,
  Sh as BookChapterControl,
  lt as Button,
  Jm as Card,
  th as CardContent,
  eh as CardDescription,
  nh as CardFooter,
  Zm as CardHeader,
  Qm as CardTitle,
  Ph as ChapterRangeSelector,
  ni as Checkbox,
  Rh as Checklist,
  Sr as ComboBox,
  $h as ContextMenu,
  hl as DropdownMenu,
  yl as DropdownMenuCheckboxItem,
  qa as DropdownMenuContent,
  Th as DropdownMenuGroup,
  Xa as DropdownMenuItem,
  Wr as DropdownMenuLabel,
  Nh as DropdownMenuPortal,
  Ch as DropdownMenuRadioGroup,
  wl as DropdownMenuRadioItem,
  Ya as DropdownMenuSeparator,
  xl as DropdownMenuShortcut,
  Oh as DropdownMenuSub,
  vl as DropdownMenuSubContent,
  bl as DropdownMenuSubTrigger,
  gl as DropdownMenuTrigger,
  Gf as GridMenu,
  zm as HamburgerMenuButton,
  Mh as IconButton,
  qr as Input,
  _t as LabelPosition,
  Ji as MenuItem,
  _h as RefSelector,
  Ih as SearchBar,
  sh as ShadCnSlider,
  lh as ShadCnSwitch,
  Ah as Slider,
  Dh as Snackbar,
  jh as Switch,
  Bh as Table,
  zh as Tabs,
  Xm as TabsContent,
  Wm as TabsList,
  qm as TabsTrigger,
  Xn as TextField,
  Lh as Toolbar,
  Ym as VerticalTabs,
  Km as VerticalTabsContent,
  Gm as VerticalTabsList,
  Uh as VerticalTabsTrigger,
  _l as buttonVariants,
  Fh as useEvent,
  Vh as useEventAsync,
  Fr as usePromise
};
//# sourceMappingURL=index.js.map
