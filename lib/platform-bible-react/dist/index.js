import ts, { jsxs as de, jsx as T, Fragment as Vn } from "react/jsx-runtime";
import * as E from "react";
import Rt, { forwardRef as wi, useCallback as Se, useState as Me, useRef as $t, useEffect as It, useLayoutEffect as ns, useMemo as Ft } from "react";
import { getChaptersForBook as xi, offsetBook as yo, FIRST_SCR_BOOK_NUM as rs, offsetChapter as wo, FIRST_SCR_CHAPTER_NUM as os, offsetVerse as xo, FIRST_SCR_VERSE_NUM as is } from "platform-bible-utils";
import * as ge from "@radix-ui/react-dropdown-menu";
import { ChevronRight as as, Check as ss, Circle as ls, History as cs, ArrowDownWideNarrow as us, Clock as ds, Bookmark as ps } from "lucide-react";
import we, { clsx as fs } from "clsx";
import { twMerge as hs } from "tailwind-merge";
import { Button as ms, Autocomplete as gs, TextField as Ei, FormControlLabel as Eo, FormLabel as bs, Checkbox as vs, MenuItem as ys, ListItemText as ws, ListItemIcon as Ti, Menu as xs, Grid as ki, List as Es, IconButton as Oi, Drawer as Ts, Paper as ks, Slider as Os, Snackbar as Ss, Switch as Cs, AppBar as Ps, Toolbar as Ns } from "@mui/material";
import Rs, { ThemeContext as $s, internal_processStyles as Ms } from "@mui/styled-engine";
import * as Is from "react-dom";
import En from "react-dom";
import _s, { SelectColumn as As } from "react-data-grid";
var Ds = Object.defineProperty, js = (e, t, n) => t in e ? Ds(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, te = (e, t, n) => (js(e, typeof t != "symbol" ? t + "" : t, n), n);
const ht = [
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
], Ir = [
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
], Si = [
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
], To = Gs();
function Vt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in To ? To[e] : 0;
}
function _r(e) {
  return Vt(e) > 0;
}
function Bs(e) {
  const t = typeof e == "string" ? Vt(e) : e;
  return t >= 40 && t <= 66;
}
function Ls(e) {
  return (typeof e == "string" ? Vt(e) : e) <= 39;
}
function Ci(e) {
  return e <= 66;
}
function Fs(e) {
  const t = typeof e == "string" ? Vt(e) : e;
  return Ri(t) && !Ci(t);
}
function* Vs() {
  for (let e = 1; e <= ht.length; e++)
    yield e;
}
const zs = 1, Pi = ht.length;
function Us() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Ar(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= ht.length ? t : ht[n];
}
function Ni(e) {
  return e <= 0 || e > Pi ? "******" : Si[e - 1];
}
function Hs(e) {
  return Ni(Vt(e));
}
function Ri(e) {
  const t = typeof e == "number" ? Ar(e) : e;
  return _r(t) && !Ir.includes(t);
}
function Ws(e) {
  const t = typeof e == "number" ? Ar(e) : e;
  return _r(t) && Ir.includes(t);
}
function qs(e) {
  return Si[e - 1].includes("*obsolete*");
}
function Gs() {
  const e = {};
  for (let t = 0; t < ht.length; t++)
    e[ht[t]] = t + 1;
  return e;
}
const ue = {
  allBookIds: ht,
  nonCanonicalIds: Ir,
  bookIdToNumber: Vt,
  isBookIdValid: _r,
  isBookNT: Bs,
  isBookOT: Ls,
  isBookOTNT: Ci,
  isBookDC: Fs,
  allBookNumbers: Vs,
  firstBook: zs,
  lastBook: Pi,
  extraBooks: Us,
  bookNumberToId: Ar,
  bookNumberToEnglishName: Ni,
  bookIdToEnglishName: Hs,
  isCanonical: Ri,
  isExtraMaterial: Ws,
  isObsolete: qs
};
var rt = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(rt || {});
const $e = class {
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
te($e, "Original", new $e(rt.Original)), te($e, "Septuagint", new $e(rt.Septuagint)), te($e, "Vulgate", new $e(rt.Vulgate)), te($e, "English", new $e(rt.English)), te($e, "RussianProtestant", new $e(rt.RussianProtestant)), te($e, "RussianOrthodox", new $e(rt.RussianOrthodox));
let Ct = $e;
function ko(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var $i = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))($i || {});
const Oe = class oe {
  constructor(t, n, r, o) {
    if (te(this, "firstChapter"), te(this, "lastChapter"), te(this, "lastVerse"), te(this, "hasSegmentsDefined"), te(this, "text"), te(this, "BBBCCCVVVS"), te(this, "longHashCode"), te(this, "versification"), te(this, "rtlMark", "‏"), te(this, "_bookNum", 0), te(this, "_chapterNum", 0), te(this, "_verseNum", 0), te(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof Ct ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof Ct ? n : void 0;
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
          const i = t instanceof Ct ? t : oe.defaultVersification;
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
      if (r instanceof Kt)
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
    this.versification = this.versification != null ? new Ct(t) : void 0;
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
          this.versification = new Ct(rt[s]);
        } catch {
          throw new Kt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Kt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ue.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(r[1]))
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
    const o = [], i = ko(this._verse, r);
    for (const s of i.map((l) => ko(l, n))) {
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ue.lastBook ? 2 : (ue.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = oe.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = ue.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
te(Oe, "defaultVersification", Ct.English), te(Oe, "verseRangeSeparator", "-"), te(Oe, "verseSequenceIndicator", ","), te(Oe, "verseRangeSeparators", [Oe.verseRangeSeparator]), te(Oe, "verseSequenceIndicators", [Oe.verseSequenceIndicator]), te(Oe, "chapterDigitShifter", 1e3), te(Oe, "bookDigitShifter", Oe.chapterDigitShifter * Oe.chapterDigitShifter), te(Oe, "bcvMaxValue", Oe.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
te(Oe, "ValidStatusType", $i);
class Kt extends Error {
}
function _e(...e) {
  return hs(fs(e));
}
const Ks = ge.Root, Xs = ge.Trigger, Ys = E.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ de(
  ge.SubTrigger,
  {
    ref: o,
    className: _e(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ T(as, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Ys.displayName = ge.SubTrigger.displayName;
const Js = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ T(
  ge.SubContent,
  {
    ref: n,
    className: _e(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Js.displayName = ge.SubContent.displayName;
const Mi = E.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ T(ge.Portal, { children: /* @__PURE__ */ T(
  ge.Content,
  {
    ref: r,
    sideOffset: t,
    className: _e(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Mi.displayName = ge.Content.displayName;
const Ii = E.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ T(
  ge.Item,
  {
    ref: r,
    className: _e(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
Ii.displayName = ge.Item.displayName;
const Zs = E.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ de(
  ge.CheckboxItem,
  {
    ref: o,
    className: _e(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ T("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ T(ge.ItemIndicator, { children: /* @__PURE__ */ T(ss, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Zs.displayName = ge.CheckboxItem.displayName;
const Qs = E.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ de(
  ge.RadioItem,
  {
    ref: r,
    className: _e(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ T("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ T(ge.ItemIndicator, { children: /* @__PURE__ */ T(ls, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Qs.displayName = ge.RadioItem.displayName;
const Dr = E.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ T(
  ge.Label,
  {
    ref: r,
    className: _e("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
Dr.displayName = ge.Label.displayName;
const _i = E.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ T(
  ge.Separator,
  {
    ref: n,
    className: _e("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
_i.displayName = ge.Separator.displayName;
const Ai = E.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ T(
    "input",
    {
      type: t,
      className: _e(
        "pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Ai.displayName = "Input";
const el = wi(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, ...r }, o) => /* @__PURE__ */ de("div", { className: "pr-relative", children: [
    /* @__PURE__ */ T(
      Ai,
      {
        ...r,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",
        onChange: (i) => e(i.target.value),
        onKeyDown: t,
        onClick: n,
        ref: o
      }
    ),
    /* @__PURE__ */ T(
      cs,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function tl({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  isHighlighted: r,
  highlightedChapter: o,
  handleHighlightedChapter: i
}) {
  const s = Array.from({ length: t }, (c, u) => u + 1), l = Se(
    (c) => {
      i(c), console.log("new highlighted chapter: ", c);
    },
    [i]
  );
  return console.log("Chapter select re-rendered. isHighlighted value: ", r), /* @__PURE__ */ T(
    "div",
    {
      className: _e("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch", {
        "pr-bg-amber-50": !r,
        "pr-bg-amber-100": r
      }),
      children: s.map((c) => /* @__PURE__ */ T(
        "div",
        {
          className: _e(
            "pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
            {
              "pr-font-semibold pr-text-amber-900": c === n,
              "pr-bg-amber-200": c === o
            }
          ),
          onClick: () => e(c),
          role: "button",
          onKeyDown: (u) => {
            u.key === "Enter" && e(c);
          },
          tabIndex: 0,
          onMouseMove: () => l(c),
          children: c
        },
        c
      ))
    }
  );
}
const nl = wi(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    // isHighlighted,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, l) => {
    const c = () => {
      console.log("book ", ue.bookIdToEnglishName(e), "has focus"), r();
    };
    return /* @__PURE__ */ de(
      Ii,
      {
        ref: n ? l : void 0,
        textValue: e,
        className: _e("pr-font-normal pr-text-slate-700", {
          // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
          "pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100": n
        }),
        onSelect: (d) => {
          d.preventDefault(), t();
        },
        onKeyDown: (d) => {
          o(d);
        },
        onFocus: c,
        onMouseMove: c,
        children: [
          /* @__PURE__ */ T(
            "span",
            {
              className: _e(
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
          n && /* @__PURE__ */ T("div", { children: s })
        ]
      },
      e
    );
  }
);
function rl({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ de(Dr, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ T("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ de("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ T(
        us,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ T(
        ds,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ T(
        ps,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const ol = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, il = ["OT", "NT", "DC"], al = 32 + 32 + 32;
function xh({ scrRef: e, handleSubmit: t }) {
  const { allBookIds: n } = ue, [r, o] = Me(""), [i, s] = Me(
    ue.bookNumberToId(e.bookNum)
  ), [l, c] = Me(0), [u, d] = Me(""), [f, p] = Me(!1), [b, v] = Me(f), g = $t(void 0), h = $t(void 0), x = $t(void 0), R = Se(
    (C) => ({
      OT: n.filter((_) => ue.isBookOT(_)),
      NT: n.filter((_) => ue.isBookNT(_)),
      DC: n.filter((_) => ue.isBookDC(_))
    })[C],
    [n]
  ), y = Se(
    (C) => R(C).filter(
      ($) => ue.bookIdToEnglishName($).toLowerCase().includes(r.toLowerCase()) || $.toLowerCase().includes(r.toLowerCase())
    ),
    [R, r]
  ), w = (C) => {
    o(C);
  }, m = Se((C) => xi(ue.bookIdToNumber(C)), []), S = (C) => {
    c(ue.bookNumberToId(e.bookNum) !== C ? 1 : e.chapterNum), s(i !== C ? C : ""), m(C) === -1 && (t({
      bookNum: ue.bookIdToNumber(C),
      chapterNum: 1,
      verseNum: 1
    }), p(!1), o(""));
  }, P = (C) => {
    C <= 0 || C > m(i) || (t({
      bookNum: ue.bookIdToNumber(i),
      chapterNum: C,
      verseNum: 1
    }), p(!1), o(""));
  }, B = Se((C) => {
    !C && document.activeElement === g.current ? p(!0) : p(C);
  }, []), j = Se(
    (C) => {
      f ? (C.key === "ArrowDown" || C.key === "ArrowUp") && (typeof x < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      x.current !== null ? x.current.focus() : typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null && h.current.focus(), C.preventDefault()) : p(!0);
    },
    [f]
  ), L = (C) => {
    console.log("content key down processed");
    const { key: $ } = C;
    $ === "ArrowRight" || $ === "ArrowLeft" || $ === "ArrowDown" || $ === "ArrowUp" || $ === "Enter" || g.current.focus();
  }, V = (C) => {
    const { key: $ } = C;
    if (u === i) {
      if ($ === "Enter") {
        P(l);
        return;
      }
      let _ = 0;
      if ($ === "ArrowRight")
        if (l < m(u))
          _ = 1;
        else {
          C.preventDefault();
          return;
        }
      else if ($ === "ArrowLeft")
        if (l > 1)
          _ = -1;
        else {
          C.preventDefault();
          return;
        }
      else
        $ === "ArrowDown" ? _ = 6 : $ === "ArrowUp" && (_ = -6);
      l + _ <= 0 || l + _ > m(u) ? c(0) : (c(l + _), C.preventDefault());
    }
  };
  return It(() => {
    i === u ? i === ue.bookNumberToId(e.bookNum) ? c(e.chapterNum) : c(1) : c(0);
  }, [u, e.bookNum, e.chapterNum, i]), It(() => {
    v(f);
  }, [f]), ns(() => {
    if (b && h.current && x.current) {
      const $ = x.current.offsetTop - al;
      h.current.scrollTo({ top: $, behavior: "instant" }), x.current.focus();
    }
  }, [b]), /* @__PURE__ */ T("div", { children: /* @__PURE__ */ de(Ks, { modal: !1, open: f, onOpenChange: B, children: [
    /* @__PURE__ */ T(Xs, { asChild: !0, children: /* @__PURE__ */ T(
      el,
      {
        ref: g,
        value: r,
        handleSearch: w,
        handleKeyDown: j,
        handleOnClick: () => {
          s(ue.bookNumberToId(e.bookNum)), c(e.chapterNum > 0 ? e.chapterNum : 0);
        },
        placeholder: `${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ de(
      Mi,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: L,
        align: "start",
        ref: h,
        children: [
          /* @__PURE__ */ T(
            rl,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          il.map(
            (C) => y(C).length > 0 && /* @__PURE__ */ de("div", { children: [
              /* @__PURE__ */ T(Dr, { className: "pr-font-semibold pr-text-slate-700", children: ol[C] }),
              y(C).map(($) => /* @__PURE__ */ T("div", { children: /* @__PURE__ */ T(
                nl,
                {
                  bookId: $,
                  handleSelectBook: () => S($),
                  isSelected: i === $,
                  handleHighlightBook: () => d($),
                  handleKeyDown: V,
                  bookType: C,
                  ref: x,
                  children: /* @__PURE__ */ T(
                    tl,
                    {
                      handleSelectChapter: P,
                      endChapter: m($),
                      activeChapter: e.bookNum === ue.bookIdToNumber($) ? e.chapterNum : 0,
                      isHighlighted: i === u,
                      highlightedChapter: l,
                      handleHighlightedChapter: (_) => {
                        c(_);
                      }
                    }
                  )
                }
              ) }, $)),
              C === "OT" || C === "NT" ? /* @__PURE__ */ T(_i, {}) : void 0
            ] }, C)
          )
        ]
      }
    )
  ] }) });
}
function wt({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ T(
    ms,
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
function wr({
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
  getOptionLabel: b
}) {
  return /* @__PURE__ */ T(
    gs,
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
      getOptionLabel: b,
      renderInput: (v) => /* @__PURE__ */ T(
        Ei,
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
function Eh({
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
  return /* @__PURE__ */ de(Vn, { children: [
    /* @__PURE__ */ T(
      Eo,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ T(
          wr,
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
      Eo,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ T(
          wr,
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
var Pt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Pt || {});
function sl({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Pt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const d = /* @__PURE__ */ T(
    vs,
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
    const p = r === Pt.Before || r === Pt.Above, b = /* @__PURE__ */ T("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), v = r === Pt.Before || r === Pt.After, g = v ? b : /* @__PURE__ */ T("div", { children: b }), h = v ? d : /* @__PURE__ */ T("div", { children: d });
    f = /* @__PURE__ */ de(
      bs,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: l,
        children: [
          p && g,
          h,
          !p && g
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
function ll(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function cl(e) {
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
var xr = { exports: {} }, Tn = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oo;
function ul() {
  if (Oo)
    return ie;
  Oo = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, R = e ? Symbol.for("react.scope") : 60119;
  function y(m) {
    if (typeof m == "object" && m !== null) {
      var S = m.$$typeof;
      switch (S) {
        case t:
          switch (m = m.type, m) {
            case c:
            case u:
            case r:
            case i:
            case o:
            case f:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case d:
                case v:
                case b:
                case s:
                  return m;
                default:
                  return S;
              }
          }
        case n:
          return S;
      }
    }
  }
  function w(m) {
    return y(m) === u;
  }
  return ie.AsyncMode = c, ie.ConcurrentMode = u, ie.ContextConsumer = l, ie.ContextProvider = s, ie.Element = t, ie.ForwardRef = d, ie.Fragment = r, ie.Lazy = v, ie.Memo = b, ie.Portal = n, ie.Profiler = i, ie.StrictMode = o, ie.Suspense = f, ie.isAsyncMode = function(m) {
    return w(m) || y(m) === c;
  }, ie.isConcurrentMode = w, ie.isContextConsumer = function(m) {
    return y(m) === l;
  }, ie.isContextProvider = function(m) {
    return y(m) === s;
  }, ie.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === t;
  }, ie.isForwardRef = function(m) {
    return y(m) === d;
  }, ie.isFragment = function(m) {
    return y(m) === r;
  }, ie.isLazy = function(m) {
    return y(m) === v;
  }, ie.isMemo = function(m) {
    return y(m) === b;
  }, ie.isPortal = function(m) {
    return y(m) === n;
  }, ie.isProfiler = function(m) {
    return y(m) === i;
  }, ie.isStrictMode = function(m) {
    return y(m) === o;
  }, ie.isSuspense = function(m) {
    return y(m) === f;
  }, ie.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === r || m === u || m === i || m === o || m === f || m === p || typeof m == "object" && m !== null && (m.$$typeof === v || m.$$typeof === b || m.$$typeof === s || m.$$typeof === l || m.$$typeof === d || m.$$typeof === h || m.$$typeof === x || m.$$typeof === R || m.$$typeof === g);
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
var So;
function dl() {
  return So || (So = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, R = e ? Symbol.for("react.scope") : 60119;
    function y(I) {
      return typeof I == "string" || typeof I == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      I === r || I === u || I === i || I === o || I === f || I === p || typeof I == "object" && I !== null && (I.$$typeof === v || I.$$typeof === b || I.$$typeof === s || I.$$typeof === l || I.$$typeof === d || I.$$typeof === h || I.$$typeof === x || I.$$typeof === R || I.$$typeof === g);
    }
    function w(I) {
      if (typeof I == "object" && I !== null) {
        var J = I.$$typeof;
        switch (J) {
          case t:
            var N = I.type;
            switch (N) {
              case c:
              case u:
              case r:
              case i:
              case o:
              case f:
                return N;
              default:
                var re = N && N.$$typeof;
                switch (re) {
                  case l:
                  case d:
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
    var m = c, S = u, P = l, B = s, j = t, L = d, V = r, C = v, $ = b, _ = n, D = i, M = o, F = f, Q = !1;
    function Z(I) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(I) || w(I) === c;
    }
    function O(I) {
      return w(I) === u;
    }
    function A(I) {
      return w(I) === l;
    }
    function U(I) {
      return w(I) === s;
    }
    function K(I) {
      return typeof I == "object" && I !== null && I.$$typeof === t;
    }
    function z(I) {
      return w(I) === d;
    }
    function H(I) {
      return w(I) === r;
    }
    function q(I) {
      return w(I) === v;
    }
    function G(I) {
      return w(I) === b;
    }
    function W(I) {
      return w(I) === n;
    }
    function X(I) {
      return w(I) === i;
    }
    function Y(I) {
      return w(I) === o;
    }
    function ne(I) {
      return w(I) === f;
    }
    ae.AsyncMode = m, ae.ConcurrentMode = S, ae.ContextConsumer = P, ae.ContextProvider = B, ae.Element = j, ae.ForwardRef = L, ae.Fragment = V, ae.Lazy = C, ae.Memo = $, ae.Portal = _, ae.Profiler = D, ae.StrictMode = M, ae.Suspense = F, ae.isAsyncMode = Z, ae.isConcurrentMode = O, ae.isContextConsumer = A, ae.isContextProvider = U, ae.isElement = K, ae.isForwardRef = z, ae.isFragment = H, ae.isLazy = q, ae.isMemo = G, ae.isPortal = W, ae.isProfiler = X, ae.isStrictMode = Y, ae.isSuspense = ne, ae.isValidElementType = y, ae.typeOf = w;
  }()), ae;
}
var Co;
function Di() {
  return Co || (Co = 1, process.env.NODE_ENV === "production" ? Tn.exports = ul() : Tn.exports = dl()), Tn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ir, Po;
function pl() {
  if (Po)
    return ir;
  Po = 1;
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
  return ir = o() ? Object.assign : function(i, s) {
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
  }, ir;
}
var ar, No;
function jr() {
  if (No)
    return ar;
  No = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ar = e, ar;
}
var sr, Ro;
function ji() {
  return Ro || (Ro = 1, sr = Function.call.bind(Object.prototype.hasOwnProperty)), sr;
}
var lr, $o;
function fl() {
  if ($o)
    return lr;
  $o = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = jr(), n = {}, r = ji();
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
          } catch (v) {
            f = v;
          }
          if (f && !(f instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
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
  }, lr = o, lr;
}
var cr, Mo;
function hl() {
  if (Mo)
    return cr;
  Mo = 1;
  var e = Di(), t = pl(), n = jr(), r = ji(), o = fl(), i = function() {
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
  return cr = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function f(O) {
      var A = O && (u && O[u] || O[d]);
      if (typeof A == "function")
        return A;
    }
    var p = "<<anonymous>>", b = {
      array: x("array"),
      bigint: x("bigint"),
      bool: x("boolean"),
      func: x("function"),
      number: x("number"),
      object: x("object"),
      string: x("string"),
      symbol: x("symbol"),
      any: R(),
      arrayOf: y,
      element: w(),
      elementType: m(),
      instanceOf: S,
      node: L(),
      objectOf: B,
      oneOf: P,
      oneOfType: j,
      shape: C,
      exact: $
    };
    function v(O, A) {
      return O === A ? O !== 0 || 1 / O === 1 / A : O !== O && A !== A;
    }
    function g(O, A) {
      this.message = O, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function h(O) {
      if (process.env.NODE_ENV !== "production")
        var A = {}, U = 0;
      function K(H, q, G, W, X, Y, ne) {
        if (W = W || p, Y = Y || G, ne !== n) {
          if (c) {
            var I = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw I.name = "Invariant Violation", I;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var J = W + ":" + G;
            !A[J] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Y + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[J] = !0, U++);
          }
        }
        return q[G] == null ? H ? q[G] === null ? new g("The " + X + " `" + Y + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new g("The " + X + " `" + Y + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : O(q, G, W, X, Y);
      }
      var z = K.bind(null, !1);
      return z.isRequired = K.bind(null, !0), z;
    }
    function x(O) {
      function A(U, K, z, H, q, G) {
        var W = U[K], X = M(W);
        if (X !== O) {
          var Y = F(W);
          return new g(
            "Invalid " + H + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return h(A);
    }
    function R() {
      return h(s);
    }
    function y(O) {
      function A(U, K, z, H, q) {
        if (typeof O != "function")
          return new g("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var G = U[K];
        if (!Array.isArray(G)) {
          var W = M(G);
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an array."));
        }
        for (var X = 0; X < G.length; X++) {
          var Y = O(G, X, z, H, q + "[" + X + "]", n);
          if (Y instanceof Error)
            return Y;
        }
        return null;
      }
      return h(A);
    }
    function w() {
      function O(A, U, K, z, H) {
        var q = A[U];
        if (!l(q)) {
          var G = M(q);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + G + "` supplied to `" + K + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(O);
    }
    function m() {
      function O(A, U, K, z, H) {
        var q = A[U];
        if (!e.isValidElementType(q)) {
          var G = M(q);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + G + "` supplied to `" + K + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(O);
    }
    function S(O) {
      function A(U, K, z, H, q) {
        if (!(U[K] instanceof O)) {
          var G = O.name || p, W = Z(U[K]);
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected ") + ("instance of `" + G + "`."));
        }
        return null;
      }
      return h(A);
    }
    function P(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function A(U, K, z, H, q) {
        for (var G = U[K], W = 0; W < O.length; W++)
          if (v(G, O[W]))
            return null;
        var X = JSON.stringify(O, function(ne, I) {
          var J = F(I);
          return J === "symbol" ? String(I) : I;
        });
        return new g("Invalid " + H + " `" + q + "` of value `" + String(G) + "` " + ("supplied to `" + z + "`, expected one of " + X + "."));
      }
      return h(A);
    }
    function B(O) {
      function A(U, K, z, H, q) {
        if (typeof O != "function")
          return new g("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var G = U[K], W = M(G);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an object."));
        for (var X in G)
          if (r(G, X)) {
            var Y = O(G, X, z, H, q + "." + X, n);
            if (Y instanceof Error)
              return Y;
          }
        return null;
      }
      return h(A);
    }
    function j(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var A = 0; A < O.length; A++) {
        var U = O[A];
        if (typeof U != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Q(U) + " at index " + A + "."
          ), s;
      }
      function K(z, H, q, G, W) {
        for (var X = [], Y = 0; Y < O.length; Y++) {
          var ne = O[Y], I = ne(z, H, q, G, W, n);
          if (I == null)
            return null;
          I.data && r(I.data, "expectedType") && X.push(I.data.expectedType);
        }
        var J = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new g("Invalid " + G + " `" + W + "` supplied to " + ("`" + q + "`" + J + "."));
      }
      return h(K);
    }
    function L() {
      function O(A, U, K, z, H) {
        return _(A[U]) ? null : new g("Invalid " + z + " `" + H + "` supplied to " + ("`" + K + "`, expected a ReactNode."));
      }
      return h(O);
    }
    function V(O, A, U, K, z) {
      return new g(
        (O || "React class") + ": " + A + " type `" + U + "." + K + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function C(O) {
      function A(U, K, z, H, q) {
        var G = U[K], W = M(G);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var X in O) {
          var Y = O[X];
          if (typeof Y != "function")
            return V(z, H, q, X, F(Y));
          var ne = Y(G, X, z, H, q + "." + X, n);
          if (ne)
            return ne;
        }
        return null;
      }
      return h(A);
    }
    function $(O) {
      function A(U, K, z, H, q) {
        var G = U[K], W = M(G);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        var X = t({}, U[K], O);
        for (var Y in X) {
          var ne = O[Y];
          if (r(O, Y) && typeof ne != "function")
            return V(z, H, q, Y, F(ne));
          if (!ne)
            return new g(
              "Invalid " + H + " `" + q + "` key `" + Y + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(U[K], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var I = ne(G, Y, z, H, q + "." + Y, n);
          if (I)
            return I;
        }
        return null;
      }
      return h(A);
    }
    function _(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(_);
          if (O === null || l(O))
            return !0;
          var A = f(O);
          if (A) {
            var U = A.call(O), K;
            if (A !== O.entries) {
              for (; !(K = U.next()).done; )
                if (!_(K.value))
                  return !1;
            } else
              for (; !(K = U.next()).done; ) {
                var z = K.value;
                if (z && !_(z[1]))
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
    function F(O) {
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
      var A = F(O);
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
      return !O.constructor || !O.constructor.name ? p : O.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, cr;
}
var ur, Io;
function ml() {
  if (Io)
    return ur;
  Io = 1;
  var e = jr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, ur = function() {
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
  }, ur;
}
if (process.env.NODE_ENV !== "production") {
  var gl = Di(), bl = !0;
  xr.exports = hl()(gl.isElement, bl);
} else
  xr.exports = ml()();
var vl = xr.exports;
const a = /* @__PURE__ */ ll(vl);
function zt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function pt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Bi(e) {
  if (!pt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Bi(e[n]);
  }), t;
}
function Ye(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? k({}, e) : e;
  return pt(e) && pt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (pt(t[o]) && o in e && pt(e[o]) ? r[o] = Ye(e[o], t[o], n) : n.clone ? r[o] = pt(t[o]) ? Bi(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function yl(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Li(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !yl(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Fi = zt(a.element, Li);
Fi.isRequired = zt(a.element.isRequired, Li);
const pn = Fi;
function wl(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function xl(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !wl(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const El = zt(a.elementType, xl), Tl = "exact-prop: ​";
function Vi(e) {
  return process.env.NODE_ENV === "production" ? e : k({}, e, {
    [Tl]: (t) => {
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
var Er = { exports: {} }, se = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _o;
function kl() {
  if (_o)
    return se;
  _o = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function g(h) {
    if (typeof h == "object" && h !== null) {
      var x = h.$$typeof;
      switch (x) {
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
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return se.ContextConsumer = s, se.ContextProvider = i, se.Element = e, se.ForwardRef = c, se.Fragment = n, se.Lazy = p, se.Memo = f, se.Portal = t, se.Profiler = o, se.StrictMode = r, se.Suspense = u, se.SuspenseList = d, se.isAsyncMode = function() {
    return !1;
  }, se.isConcurrentMode = function() {
    return !1;
  }, se.isContextConsumer = function(h) {
    return g(h) === s;
  }, se.isContextProvider = function(h) {
    return g(h) === i;
  }, se.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, se.isForwardRef = function(h) {
    return g(h) === c;
  }, se.isFragment = function(h) {
    return g(h) === n;
  }, se.isLazy = function(h) {
    return g(h) === p;
  }, se.isMemo = function(h) {
    return g(h) === f;
  }, se.isPortal = function(h) {
    return g(h) === t;
  }, se.isProfiler = function(h) {
    return g(h) === o;
  }, se.isStrictMode = function(h) {
    return g(h) === r;
  }, se.isSuspense = function(h) {
    return g(h) === u;
  }, se.isSuspenseList = function(h) {
    return g(h) === d;
  }, se.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === u || h === d || h === b || typeof h == "object" && h !== null && (h.$$typeof === p || h.$$typeof === f || h.$$typeof === i || h.$$typeof === s || h.$$typeof === c || h.$$typeof === v || h.getModuleId !== void 0);
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
var Ao;
function Ol() {
  return Ao || (Ao = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v = !1, g = !1, h = !1, x = !1, R = !1, y;
    y = Symbol.for("react.module.reference");
    function w(N) {
      return !!(typeof N == "string" || typeof N == "function" || N === n || N === o || R || N === r || N === u || N === d || x || N === b || v || g || h || typeof N == "object" && N !== null && (N.$$typeof === p || N.$$typeof === f || N.$$typeof === i || N.$$typeof === s || N.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      N.$$typeof === y || N.getModuleId !== void 0));
    }
    function m(N) {
      if (typeof N == "object" && N !== null) {
        var re = N.$$typeof;
        switch (re) {
          case e:
            var ve = N.type;
            switch (ve) {
              case n:
              case o:
              case r:
              case u:
              case d:
                return ve;
              default:
                var Te = ve && ve.$$typeof;
                switch (Te) {
                  case l:
                  case s:
                  case c:
                  case p:
                  case f:
                  case i:
                    return Te;
                  default:
                    return re;
                }
            }
          case t:
            return re;
        }
      }
    }
    var S = s, P = i, B = e, j = c, L = n, V = p, C = f, $ = t, _ = o, D = r, M = u, F = d, Q = !1, Z = !1;
    function O(N) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(N) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(N) {
      return m(N) === s;
    }
    function K(N) {
      return m(N) === i;
    }
    function z(N) {
      return typeof N == "object" && N !== null && N.$$typeof === e;
    }
    function H(N) {
      return m(N) === c;
    }
    function q(N) {
      return m(N) === n;
    }
    function G(N) {
      return m(N) === p;
    }
    function W(N) {
      return m(N) === f;
    }
    function X(N) {
      return m(N) === t;
    }
    function Y(N) {
      return m(N) === o;
    }
    function ne(N) {
      return m(N) === r;
    }
    function I(N) {
      return m(N) === u;
    }
    function J(N) {
      return m(N) === d;
    }
    le.ContextConsumer = S, le.ContextProvider = P, le.Element = B, le.ForwardRef = j, le.Fragment = L, le.Lazy = V, le.Memo = C, le.Portal = $, le.Profiler = _, le.StrictMode = D, le.Suspense = M, le.SuspenseList = F, le.isAsyncMode = O, le.isConcurrentMode = A, le.isContextConsumer = U, le.isContextProvider = K, le.isElement = z, le.isForwardRef = H, le.isFragment = q, le.isLazy = G, le.isMemo = W, le.isPortal = X, le.isProfiler = Y, le.isStrictMode = ne, le.isSuspense = I, le.isSuspenseList = J, le.isValidElementType = w, le.typeOf = m;
  }()), le;
}
process.env.NODE_ENV === "production" ? Er.exports = kl() : Er.exports = Ol();
var Mn = Er.exports;
const Sl = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Cl(e) {
  const t = `${e}`.match(Sl);
  return t && t[1] || "";
}
function zi(e, t = "") {
  return e.displayName || e.name || Cl(e) || t;
}
function Do(e, t, n) {
  const r = zi(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Pl(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return zi(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Mn.ForwardRef:
          return Do(e, e.render, "ForwardRef");
        case Mn.Memo:
          return Do(e, e.type, "memo");
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
const Nl = a.oneOfType([a.func, a.object]), Br = Nl;
function He(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : _t(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Tr(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Ui(e, t = 166) {
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
function Rl(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function $l(e, t) {
  var n, r;
  return /* @__PURE__ */ E.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function xe(e) {
  return e && e.ownerDocument || document;
}
function At(e) {
  return xe(e).defaultView || window;
}
function Ml(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? k({}, t.propTypes) : null;
  return (o) => (i, s, l, c, u, ...d) => {
    const f = u || s, p = n == null ? void 0 : n[f];
    if (p) {
      const b = p(i, s, l, c, u, ...d);
      if (b)
        return b;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function In(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Il = typeof window < "u" ? E.useLayoutEffect : E.useEffect, mt = Il;
let jo = 0;
function _l(e) {
  const [t, n] = E.useState(e), r = e || t;
  return E.useEffect(() => {
    t == null && (jo += 1, n(`mui-${jo}`));
  }, [t]), r;
}
const Bo = E["useId".toString()];
function Hi(e) {
  if (Bo !== void 0) {
    const t = Bo();
    return e ?? t;
  }
  return _l(e);
}
function Al(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function Wi({
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
      current: u
    } = E.useRef(t);
    E.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = E.useCallback((u) => {
    o || s(u);
  }, []);
  return [l, c];
}
function sn(e) {
  const t = E.useRef(e);
  return mt(() => {
    t.current = e;
  }), E.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Le(...e) {
  return E.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      In(n, t);
    });
  }, e);
}
const Lo = {};
function Dl(e, t) {
  const n = E.useRef(Lo);
  return n.current === Lo && (n.current = e(t)), n;
}
const jl = [];
function Bl(e) {
  E.useEffect(e, jl);
}
class fn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new fn();
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
  const e = Dl(fn.create).current;
  return Bl(e.disposeEffect), e;
}
let zn = !0, kr = !1;
const Ll = new fn(), Fl = {
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
function Vl(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Fl[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function zl(e) {
  e.metaKey || e.altKey || e.ctrlKey || (zn = !0);
}
function dr() {
  zn = !1;
}
function Ul() {
  this.visibilityState === "hidden" && kr && (zn = !0);
}
function Hl(e) {
  e.addEventListener("keydown", zl, !0), e.addEventListener("mousedown", dr, !0), e.addEventListener("pointerdown", dr, !0), e.addEventListener("touchstart", dr, !0), e.addEventListener("visibilitychange", Ul, !0);
}
function Wl(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return zn || Vl(t);
}
function qi() {
  const e = E.useCallback((o) => {
    o != null && Hl(o.ownerDocument);
  }, []), t = E.useRef(!1);
  function n() {
    return t.current ? (kr = !0, Ll.start(100, () => {
      kr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Wl(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Gi(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function ql(e) {
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
function Gl(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Kl = Number.isInteger || Gl;
function Ki(e, t, n, r) {
  const o = e[t];
  if (o == null || !Kl(o)) {
    const i = ql(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function Xi(e, t, ...n) {
  return e[t] === void 0 ? null : Ki(e, t, ...n);
}
function Or() {
  return null;
}
Xi.isRequired = Ki;
Or.isRequired = Or;
const Yi = process.env.NODE_ENV === "production" ? Or : Xi;
function Ji(e, t) {
  const n = k({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = k({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = k({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = Ji(o[s], i[s]);
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
const Fo = (e) => e, Xl = () => {
  let e = Fo;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Fo;
    }
  };
}, Yl = Xl(), Zi = Yl, Qi = {
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
  const r = Qi[t];
  return r ? `${n}-${r}` : `${Zi.generate(e)}-${t}`;
}
function it(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = qe(e, o, n);
  }), r;
}
function Jl(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function ea(e) {
  return typeof e == "string";
}
function en(e, t, n) {
  return e === void 0 || ea(e) ? t : k({}, t, {
    ownerState: k({}, t.ownerState, n)
  });
}
const Zl = {
  disableDefaultClasses: !1
}, Ql = /* @__PURE__ */ E.createContext(Zl);
function ec(e) {
  const {
    disableDefaultClasses: t
  } = E.useContext(Ql);
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
function tc(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Vo(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function nc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = we(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = k({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = k({}, n, o, r);
    return b.length > 0 && (g.className = b), Object.keys(v).length > 0 && (g.style = v), {
      props: g,
      internalRef: void 0
    };
  }
  const s = ta(k({}, o, r)), l = Vo(r), c = Vo(o), u = t(s), d = we(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = k({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), p = k({}, u, n, c, l);
  return d.length > 0 && (p.className = d), Object.keys(f).length > 0 && (p.style = f), {
    props: p,
    internalRef: u.ref
  };
}
const rc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function gt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = ce(e, rc), l = i ? {} : tc(r, o), {
    props: c,
    internalRef: u
  } = nc(k({}, s, {
    externalSlotProps: l
  })), d = Le(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return en(n, k({}, c, {
    ref: d
  }), o);
}
const na = "base";
function oc(e) {
  return `${na}--${e}`;
}
function ic(e, t) {
  return `${na}-${e}-${t}`;
}
function ra(e, t) {
  const n = Qi[t];
  return n ? oc(n) : ic(e, t);
}
function ac(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = ra(e, r);
  }), n;
}
const sc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function lc(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function cc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function uc(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || cc(e));
}
function dc(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(sc)).forEach((r, o) => {
    const i = lc(r);
    i === -1 || !uc(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function pc() {
  return !0;
}
function _n(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = dc,
    isEnabled: s = pc,
    open: l
  } = e, c = E.useRef(!1), u = E.useRef(null), d = E.useRef(null), f = E.useRef(null), p = E.useRef(null), b = E.useRef(!1), v = E.useRef(null), g = Le(t.ref, v), h = E.useRef(null);
  E.useEffect(() => {
    !l || !v.current || (b.current = !n);
  }, [n, l]), E.useEffect(() => {
    if (!l || !v.current)
      return;
    const y = xe(v.current);
    return v.current.contains(y.activeElement) || (v.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), v.current.setAttribute("tabIndex", "-1")), b.current && v.current.focus()), () => {
      o || (f.current && f.current.focus && (c.current = !0, f.current.focus()), f.current = null);
    };
  }, [l]), E.useEffect(() => {
    if (!l || !v.current)
      return;
    const y = xe(v.current), w = (P) => {
      h.current = P, !(r || !s() || P.key !== "Tab") && y.activeElement === v.current && P.shiftKey && (c.current = !0, d.current && d.current.focus());
    }, m = () => {
      const P = v.current;
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
      if (!b.current)
        return;
      let B = [];
      if ((y.activeElement === u.current || y.activeElement === d.current) && (B = i(v.current)), B.length > 0) {
        var j, L;
        const V = !!((j = h.current) != null && j.shiftKey && ((L = h.current) == null ? void 0 : L.key) === "Tab"), C = B[0], $ = B[B.length - 1];
        typeof C != "string" && typeof $ != "string" && (V ? $.focus() : C.focus());
      } else
        P.focus();
    };
    y.addEventListener("focusin", m), y.addEventListener("keydown", w, !0);
    const S = setInterval(() => {
      y.activeElement && y.activeElement.tagName === "BODY" && m();
    }, 50);
    return () => {
      clearInterval(S), y.removeEventListener("focusin", m), y.removeEventListener("keydown", w, !0);
    };
  }, [n, r, o, s, l, i]);
  const x = (y) => {
    f.current === null && (f.current = y.relatedTarget), b.current = !0, p.current = y.target;
    const w = t.props.onFocus;
    w && w(y);
  }, R = (y) => {
    f.current === null && (f.current = y.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ de(E.Fragment, {
    children: [/* @__PURE__ */ T("div", {
      tabIndex: l ? 0 : -1,
      onFocus: R,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ E.cloneElement(t, {
      ref: g,
      onFocus: x
    }), /* @__PURE__ */ T("div", {
      tabIndex: l ? 0 : -1,
      onFocus: R,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (_n.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: pn,
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
process.env.NODE_ENV !== "production" && (_n["propTypes"] = Vi(_n.propTypes));
function fc(e) {
  return typeof e == "function" ? e() : e;
}
const ln = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, l] = E.useState(null), c = Le(/* @__PURE__ */ E.isValidElement(r) ? r.ref : null, n);
  if (mt(() => {
    i || l(fc(o) || document.body);
  }, [o, i]), mt(() => {
    if (s && !i)
      return In(n, s), () => {
        In(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ E.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ E.cloneElement(r, u);
    }
    return /* @__PURE__ */ T(E.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ T(E.Fragment, {
    children: s && /* @__PURE__ */ Is.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (ln.propTypes = {
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
process.env.NODE_ENV !== "production" && (ln["propTypes"] = Vi(ln.propTypes));
function hc(e) {
  const t = xe(e);
  return t.body === e ? At(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function nn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function zo(e) {
  return parseInt(At(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function mc(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Uo(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1, c = !mc(s);
    l && c && nn(s, o);
  });
}
function pr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function gc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (hc(r)) {
      const s = Gi(xe(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${zo(r) + s}px`;
      const l = xe(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${zo(c) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = xe(r).body;
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
function bc(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class vc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && nn(t.modalRef, !1);
    const o = bc(n);
    Uo(n, t.mount, t.modalRef, o, !0);
    const i = pr(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = pr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = gc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = pr(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && nn(t.modalRef, n), Uo(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && nn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function yc(e) {
  return typeof e == "function" ? e() : e;
}
function wc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const xc = new vc();
function Ec(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = xc,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: d,
    rootRef: f
  } = e, p = E.useRef({}), b = E.useRef(null), v = E.useRef(null), g = Le(v, f), [h, x] = E.useState(!d), R = wc(c);
  let y = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (y = !1);
  const w = () => xe(b.current), m = () => (p.current.modalRef = v.current, p.current.mount = b.current, p.current), S = () => {
    o.mount(m(), {
      disableScrollLock: r
    }), v.current && (v.current.scrollTop = 0);
  }, P = sn(() => {
    const M = yc(t) || w().body;
    o.add(m(), M), v.current && S();
  }), B = E.useCallback(() => o.isTopModal(m()), [o]), j = sn((M) => {
    b.current = M, M && (d && B() ? S() : v.current && nn(v.current, y));
  }), L = E.useCallback(() => {
    o.remove(m(), y);
  }, [y, o]);
  E.useEffect(() => () => {
    L();
  }, [L]), E.useEffect(() => {
    d ? P() : (!R || !i) && L();
  }, [d, L, R, i, P]);
  const V = (M) => (F) => {
    var Q;
    (Q = M.onKeyDown) == null || Q.call(M, F), !(F.key !== "Escape" || F.which === 229 || // Wait until IME is settled.
    !B()) && (n || (F.stopPropagation(), u && u(F, "escapeKeyDown")));
  }, C = (M) => (F) => {
    var Q;
    (Q = M.onClick) == null || Q.call(M, F), F.target === F.currentTarget && u && u(F, "backdropClick");
  };
  return {
    getRootProps: (M = {}) => {
      const F = ta(e);
      delete F.onTransitionEnter, delete F.onTransitionExited;
      const Q = k({}, F, M);
      return k({
        role: "presentation"
      }, Q, {
        onKeyDown: V(Q),
        ref: g
      });
    },
    getBackdropProps: (M = {}) => {
      const F = M;
      return k({
        "aria-hidden": !0
      }, F, {
        onClick: C(F),
        open: d
      });
    },
    getTransitionProps: () => {
      const M = () => {
        x(!1), s && s();
      }, F = () => {
        x(!0), l && l(), i && L();
      };
      return {
        onEnter: Tr(M, c == null ? void 0 : c.props.onEnter),
        onExited: Tr(F, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: g,
    portalRef: j,
    isTopModal: B,
    exited: h,
    hasTransition: R
  };
}
var Ce = "top", Fe = "bottom", Ve = "right", Pe = "left", Lr = "auto", hn = [Ce, Fe, Ve, Pe], Dt = "start", cn = "end", Tc = "clippingParents", oa = "viewport", Xt = "popper", kc = "reference", Ho = /* @__PURE__ */ hn.reduce(function(e, t) {
  return e.concat([t + "-" + Dt, t + "-" + cn]);
}, []), ia = /* @__PURE__ */ [].concat(hn, [Lr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Dt, t + "-" + cn]);
}, []), Oc = "beforeRead", Sc = "read", Cc = "afterRead", Pc = "beforeMain", Nc = "main", Rc = "afterMain", $c = "beforeWrite", Mc = "write", Ic = "afterWrite", _c = [Oc, Sc, Cc, Pc, Nc, Rc, $c, Mc, Ic];
function We(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Ae(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function bt(e) {
  var t = Ae(e).Element;
  return e instanceof t || e instanceof Element;
}
function Be(e) {
  var t = Ae(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Fr(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Ae(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Ac(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Be(i) || !We(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function Dc(e) {
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
const jc = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Ac,
  effect: Dc,
  requires: ["computeStyles"]
};
function Ue(e) {
  return e.split("-")[0];
}
var ft = Math.max, An = Math.min, jt = Math.round;
function Sr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function aa() {
  return !/^((?!chrome|android).)*safari/i.test(Sr());
}
function Bt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Be(e) && (o = e.offsetWidth > 0 && jt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && jt(r.height) / e.offsetHeight || 1);
  var s = bt(e) ? Ae(e) : window, l = s.visualViewport, c = !aa() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, d = (r.top + (c && l ? l.offsetTop : 0)) / i, f = r.width / o, p = r.height / i;
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
function Vr(e) {
  var t = Bt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function sa(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Fr(n)) {
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
  return Ae(e).getComputedStyle(e);
}
function Bc(e) {
  return ["table", "td", "th"].indexOf(We(e)) >= 0;
}
function at(e) {
  return ((bt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Un(e) {
  return We(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Fr(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    at(e)
  );
}
function Wo(e) {
  return !Be(e) || // https://github.com/popperjs/popper-core/issues/837
  Ze(e).position === "fixed" ? null : e.offsetParent;
}
function Lc(e) {
  var t = /firefox/i.test(Sr()), n = /Trident/i.test(Sr());
  if (n && Be(e)) {
    var r = Ze(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Un(e);
  for (Fr(o) && (o = o.host); Be(o) && ["html", "body"].indexOf(We(o)) < 0; ) {
    var i = Ze(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function mn(e) {
  for (var t = Ae(e), n = Wo(e); n && Bc(n) && Ze(n).position === "static"; )
    n = Wo(n);
  return n && (We(n) === "html" || We(n) === "body" && Ze(n).position === "static") ? t : n || Lc(e) || t;
}
function zr(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function rn(e, t, n) {
  return ft(e, An(t, n));
}
function Fc(e, t, n) {
  var r = rn(e, t, n);
  return r > n ? n : r;
}
function la() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ca(e) {
  return Object.assign({}, la(), e);
}
function ua(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Vc = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, ca(typeof t != "number" ? t : ua(t, hn));
};
function zc(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Ue(n.placement), c = zr(l), u = [Pe, Ve].indexOf(l) >= 0, d = u ? "height" : "width";
  if (!(!i || !s)) {
    var f = Vc(o.padding, n), p = Vr(i), b = c === "y" ? Ce : Pe, v = c === "y" ? Fe : Ve, g = n.rects.reference[d] + n.rects.reference[c] - s[c] - n.rects.popper[d], h = s[c] - n.rects.reference[c], x = mn(i), R = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, y = g / 2 - h / 2, w = f[b], m = R - p[d] - f[v], S = R / 2 - p[d] / 2 + y, P = rn(w, S, m), B = c;
    n.modifiersData[r] = (t = {}, t[B] = P, t.centerOffset = P - S, t);
  }
}
function Uc(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || sa(t.elements.popper, o) && (t.elements.arrow = o));
}
const Hc = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: zc,
  effect: Uc,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Lt(e) {
  return e.split("-")[1];
}
var Wc = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function qc(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: jt(n * o) / o || 0,
    y: jt(r * o) / o || 0
  };
}
function qo(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, f = e.isFixed, p = s.x, b = p === void 0 ? 0 : p, v = s.y, g = v === void 0 ? 0 : v, h = typeof d == "function" ? d({
    x: b,
    y: g
  }) : {
    x: b,
    y: g
  };
  b = h.x, g = h.y;
  var x = s.hasOwnProperty("x"), R = s.hasOwnProperty("y"), y = Pe, w = Ce, m = window;
  if (u) {
    var S = mn(n), P = "clientHeight", B = "clientWidth";
    if (S === Ae(n) && (S = at(n), Ze(S).position !== "static" && l === "absolute" && (P = "scrollHeight", B = "scrollWidth")), S = S, o === Ce || (o === Pe || o === Ve) && i === cn) {
      w = Fe;
      var j = f && S === m && m.visualViewport ? m.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        S[P]
      );
      g -= j - r.height, g *= c ? 1 : -1;
    }
    if (o === Pe || (o === Ce || o === Fe) && i === cn) {
      y = Ve;
      var L = f && S === m && m.visualViewport ? m.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        S[B]
      );
      b -= L - r.width, b *= c ? 1 : -1;
    }
  }
  var V = Object.assign({
    position: l
  }, u && Wc), C = d === !0 ? qc({
    x: b,
    y: g
  }, Ae(n)) : {
    x: b,
    y: g
  };
  if (b = C.x, g = C.y, c) {
    var $;
    return Object.assign({}, V, ($ = {}, $[w] = R ? "0" : "", $[y] = x ? "0" : "", $.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + g + "px)" : "translate3d(" + b + "px, " + g + "px, 0)", $));
  }
  return Object.assign({}, V, (t = {}, t[w] = R ? g + "px" : "", t[y] = x ? b + "px" : "", t.transform = "", t));
}
function Gc(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Ue(t.placement),
    variation: Lt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, qo(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, qo(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Kc = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Gc,
  data: {}
};
var kn = {
  passive: !0
};
function Xc(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Ae(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, kn);
  }), l && c.addEventListener("resize", n.update, kn), function() {
    i && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, kn);
    }), l && c.removeEventListener("resize", n.update, kn);
  };
}
const Yc = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Xc,
  data: {}
};
var Jc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Pn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Jc[t];
  });
}
var Zc = {
  start: "end",
  end: "start"
};
function Go(e) {
  return e.replace(/start|end/g, function(t) {
    return Zc[t];
  });
}
function Ur(e) {
  var t = Ae(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Hr(e) {
  return Bt(at(e)).left + Ur(e).scrollLeft;
}
function Qc(e, t) {
  var n = Ae(e), r = at(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    var u = aa();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: l + Hr(e),
    y: c
  };
}
function eu(e) {
  var t, n = at(e), r = Ur(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = ft(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = ft(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Hr(e), c = -r.scrollTop;
  return Ze(o || n).direction === "rtl" && (l += ft(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function Wr(e) {
  var t = Ze(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function da(e) {
  return ["html", "body", "#document"].indexOf(We(e)) >= 0 ? e.ownerDocument.body : Be(e) && Wr(e) ? e : da(Un(e));
}
function on(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = da(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Ae(r), s = o ? [i].concat(i.visualViewport || [], Wr(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(on(Un(s)))
  );
}
function Cr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function tu(e, t) {
  var n = Bt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Ko(e, t, n) {
  return t === oa ? Cr(Qc(e, n)) : bt(t) ? tu(t, n) : Cr(eu(at(e)));
}
function nu(e) {
  var t = on(Un(e)), n = ["absolute", "fixed"].indexOf(Ze(e).position) >= 0, r = n && Be(e) ? mn(e) : e;
  return bt(r) ? t.filter(function(o) {
    return bt(o) && sa(o, r) && We(o) !== "body";
  }) : [];
}
function ru(e, t, n, r) {
  var o = t === "clippingParents" ? nu(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], l = i.reduce(function(c, u) {
    var d = Ko(e, u, r);
    return c.top = ft(d.top, c.top), c.right = An(d.right, c.right), c.bottom = An(d.bottom, c.bottom), c.left = ft(d.left, c.left), c;
  }, Ko(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function pa(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ue(r) : null, i = r ? Lt(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Ce:
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
    case Pe:
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
  var u = o ? zr(o) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (i) {
      case Dt:
        c[u] = c[u] - (t[d] / 2 - n[d] / 2);
        break;
      case cn:
        c[u] = c[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function un(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? Tc : l, u = n.rootBoundary, d = u === void 0 ? oa : u, f = n.elementContext, p = f === void 0 ? Xt : f, b = n.altBoundary, v = b === void 0 ? !1 : b, g = n.padding, h = g === void 0 ? 0 : g, x = ca(typeof h != "number" ? h : ua(h, hn)), R = p === Xt ? kc : Xt, y = e.rects.popper, w = e.elements[v ? R : p], m = ru(bt(w) ? w : w.contextElement || at(e.elements.popper), c, d, s), S = Bt(e.elements.reference), P = pa({
    reference: S,
    element: y,
    strategy: "absolute",
    placement: o
  }), B = Cr(Object.assign({}, y, P)), j = p === Xt ? B : S, L = {
    top: m.top - j.top + x.top,
    bottom: j.bottom - m.bottom + x.bottom,
    left: m.left - j.left + x.left,
    right: j.right - m.right + x.right
  }, V = e.modifiersData.offset;
  if (p === Xt && V) {
    var C = V[o];
    Object.keys(L).forEach(function($) {
      var _ = [Ve, Fe].indexOf($) >= 0 ? 1 : -1, D = [Ce, Fe].indexOf($) >= 0 ? "y" : "x";
      L[$] += C[D] * _;
    });
  }
  return L;
}
function ou(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? ia : c, d = Lt(r), f = d ? l ? Ho : Ho.filter(function(v) {
    return Lt(v) === d;
  }) : hn, p = f.filter(function(v) {
    return u.indexOf(v) >= 0;
  });
  p.length === 0 && (p = f);
  var b = p.reduce(function(v, g) {
    return v[g] = un(e, {
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
function iu(e) {
  if (Ue(e) === Lr)
    return [];
  var t = Pn(e);
  return [Go(e), t, Go(t)];
}
function au(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, u = n.padding, d = n.boundary, f = n.rootBoundary, p = n.altBoundary, b = n.flipVariations, v = b === void 0 ? !0 : b, g = n.allowedAutoPlacements, h = t.options.placement, x = Ue(h), R = x === h, y = c || (R || !v ? [Pn(h)] : iu(h)), w = [h].concat(y).reduce(function(z, H) {
      return z.concat(Ue(H) === Lr ? ou(t, {
        placement: H,
        boundary: d,
        rootBoundary: f,
        padding: u,
        flipVariations: v,
        allowedAutoPlacements: g
      }) : H);
    }, []), m = t.rects.reference, S = t.rects.popper, P = /* @__PURE__ */ new Map(), B = !0, j = w[0], L = 0; L < w.length; L++) {
      var V = w[L], C = Ue(V), $ = Lt(V) === Dt, _ = [Ce, Fe].indexOf(C) >= 0, D = _ ? "width" : "height", M = un(t, {
        placement: V,
        boundary: d,
        rootBoundary: f,
        altBoundary: p,
        padding: u
      }), F = _ ? $ ? Ve : Pe : $ ? Fe : Ce;
      m[D] > S[D] && (F = Pn(F));
      var Q = Pn(F), Z = [];
      if (i && Z.push(M[C] <= 0), l && Z.push(M[F] <= 0, M[Q] <= 0), Z.every(function(z) {
        return z;
      })) {
        j = V, B = !1;
        break;
      }
      P.set(V, Z);
    }
    if (B)
      for (var O = v ? 3 : 1, A = function(H) {
        var q = w.find(function(G) {
          var W = P.get(G);
          if (W)
            return W.slice(0, H).every(function(X) {
              return X;
            });
        });
        if (q)
          return j = q, "break";
      }, U = O; U > 0; U--) {
        var K = A(U);
        if (K === "break")
          break;
      }
    t.placement !== j && (t.modifiersData[r]._skip = !0, t.placement = j, t.reset = !0);
  }
}
const su = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: au,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Xo(e, t, n) {
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
function Yo(e) {
  return [Ce, Ve, Fe, Pe].some(function(t) {
    return e[t] >= 0;
  });
}
function lu(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = un(t, {
    elementContext: "reference"
  }), l = un(t, {
    altBoundary: !0
  }), c = Xo(s, r), u = Xo(l, o, i), d = Yo(c), f = Yo(u);
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
const cu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: lu
};
function uu(e, t, n) {
  var r = Ue(e), o = [Pe, Ce].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], l = i[1];
  return s = s || 0, l = (l || 0) * o, [Pe, Ve].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function du(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = ia.reduce(function(d, f) {
    return d[f] = uu(f, t.rects, i), d;
  }, {}), l = s[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = s;
}
const pu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: du
};
function fu(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = pa({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const hu = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: fu,
  data: {}
};
function mu(e) {
  return e === "x" ? "y" : "x";
}
function gu(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, u = n.rootBoundary, d = n.altBoundary, f = n.padding, p = n.tether, b = p === void 0 ? !0 : p, v = n.tetherOffset, g = v === void 0 ? 0 : v, h = un(t, {
    boundary: c,
    rootBoundary: u,
    padding: f,
    altBoundary: d
  }), x = Ue(t.placement), R = Lt(t.placement), y = !R, w = zr(x), m = mu(w), S = t.modifiersData.popperOffsets, P = t.rects.reference, B = t.rects.popper, j = typeof g == "function" ? g(Object.assign({}, t.rects, {
    placement: t.placement
  })) : g, L = typeof j == "number" ? {
    mainAxis: j,
    altAxis: j
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, j), V = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, C = {
    x: 0,
    y: 0
  };
  if (S) {
    if (i) {
      var $, _ = w === "y" ? Ce : Pe, D = w === "y" ? Fe : Ve, M = w === "y" ? "height" : "width", F = S[w], Q = F + h[_], Z = F - h[D], O = b ? -B[M] / 2 : 0, A = R === Dt ? P[M] : B[M], U = R === Dt ? -B[M] : -P[M], K = t.elements.arrow, z = b && K ? Vr(K) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : la(), q = H[_], G = H[D], W = rn(0, P[M], z[M]), X = y ? P[M] / 2 - O - W - q - L.mainAxis : A - W - q - L.mainAxis, Y = y ? -P[M] / 2 + O + W + G + L.mainAxis : U + W + G + L.mainAxis, ne = t.elements.arrow && mn(t.elements.arrow), I = ne ? w === "y" ? ne.clientTop || 0 : ne.clientLeft || 0 : 0, J = ($ = V == null ? void 0 : V[w]) != null ? $ : 0, N = F + X - J - I, re = F + Y - J, ve = rn(b ? An(Q, N) : Q, F, b ? ft(Z, re) : Z);
      S[w] = ve, C[w] = ve - F;
    }
    if (l) {
      var Te, me = w === "x" ? Ce : Pe, lt = w === "x" ? Fe : Ve, ke = S[m], Ge = m === "y" ? "height" : "width", Ne = ke + h[me], Ke = ke - h[lt], ye = [Ce, Pe].indexOf(x) !== -1, yt = (Te = V == null ? void 0 : V[m]) != null ? Te : 0, ct = ye ? Ne : ke - P[Ge] - B[Ge] - yt + L.altAxis, Ut = ye ? ke + P[Ge] + B[Ge] - yt - L.altAxis : Ke, yn = b && ye ? Fc(ct, ke, Ut) : rn(b ? ct : Ne, ke, b ? Ut : Ke);
      S[m] = yn, C[m] = yn - ke;
    }
    t.modifiersData[r] = C;
  }
}
const bu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: gu,
  requiresIfExists: ["offset"]
};
function vu(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function yu(e) {
  return e === Ae(e) || !Be(e) ? Ur(e) : vu(e);
}
function wu(e) {
  var t = e.getBoundingClientRect(), n = jt(t.width) / e.offsetWidth || 1, r = jt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function xu(e, t, n) {
  n === void 0 && (n = !1);
  var r = Be(t), o = Be(t) && wu(t), i = at(t), s = Bt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((We(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Wr(i)) && (l = yu(t)), Be(t) ? (c = Bt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = Hr(i))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Eu(e) {
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
function Tu(e) {
  var t = Eu(e);
  return _c.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function ku(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Ou(e) {
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
var Jo = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Zo() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Su(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? Jo : o;
  return function(l, c, u) {
    u === void 0 && (u = i);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Jo, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], p = !1, b = {
      state: d,
      setOptions: function(x) {
        var R = typeof x == "function" ? x(d.options) : x;
        g(), d.options = Object.assign({}, i, d.options, R), d.scrollParents = {
          reference: bt(l) ? on(l) : l.contextElement ? on(l.contextElement) : [],
          popper: on(c)
        };
        var y = Tu(Ou([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = y.filter(function(w) {
          return w.enabled;
        }), v(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var x = d.elements, R = x.reference, y = x.popper;
          if (Zo(R, y)) {
            d.rects = {
              reference: xu(R, mn(y), d.options.strategy === "fixed"),
              popper: Vr(y)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(L) {
              return d.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var w = 0; w < d.orderedModifiers.length; w++) {
              if (d.reset === !0) {
                d.reset = !1, w = -1;
                continue;
              }
              var m = d.orderedModifiers[w], S = m.fn, P = m.options, B = P === void 0 ? {} : P, j = m.name;
              typeof S == "function" && (d = S({
                state: d,
                options: B,
                name: j,
                instance: b
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: ku(function() {
        return new Promise(function(h) {
          b.forceUpdate(), h(d);
        });
      }),
      destroy: function() {
        g(), p = !0;
      }
    };
    if (!Zo(l, c))
      return b;
    b.setOptions(u).then(function(h) {
      !p && u.onFirstUpdate && u.onFirstUpdate(h);
    });
    function v() {
      d.orderedModifiers.forEach(function(h) {
        var x = h.name, R = h.options, y = R === void 0 ? {} : R, w = h.effect;
        if (typeof w == "function") {
          var m = w({
            state: d,
            name: x,
            instance: b,
            options: y
          }), S = function() {
          };
          f.push(m || S);
        }
      });
    }
    function g() {
      f.forEach(function(h) {
        return h();
      }), f = [];
    }
    return b;
  };
}
var Cu = [Yc, hu, Kc, jc, pu, su, bu, Hc, cu], Pu = /* @__PURE__ */ Su({
  defaultModifiers: Cu
});
const fa = "Popper";
function Nu(e) {
  return ra(fa, e);
}
ac(fa, ["root"]);
const Ru = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], $u = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Mu(e, t) {
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
function Dn(e) {
  return typeof e == "function" ? e() : e;
}
function Hn(e) {
  return e.nodeType !== void 0;
}
function Iu(e) {
  return !Hn(e);
}
const _u = () => et({
  root: ["root"]
}, ec(Nu)), Au = {}, Du = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
    slotProps: b = {},
    slots: v = {},
    TransitionProps: g
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, h = ce(t, Ru), x = E.useRef(null), R = Le(x, n), y = E.useRef(null), w = Le(y, p), m = E.useRef(w);
  mt(() => {
    m.current = w;
  }, [w]), E.useImperativeHandle(p, () => y.current, []);
  const S = Mu(d, s), [P, B] = E.useState(S), [j, L] = E.useState(Dn(o));
  E.useEffect(() => {
    y.current && y.current.forceUpdate();
  }), E.useEffect(() => {
    o && L(Dn(o));
  }, [o]), mt(() => {
    if (!j || !u)
      return;
    const D = (Q) => {
      B(Q.placement);
    };
    if (process.env.NODE_ENV !== "production" && j && Hn(j) && j.nodeType === 1) {
      const Q = j.getBoundingClientRect();
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
    const F = Pu(j, x.current, k({
      placement: S
    }, f, {
      modifiers: M
    }));
    return m.current(F), () => {
      F.destroy(), m.current(null);
    };
  }, [j, l, c, u, f, S]);
  const V = {
    placement: P
  };
  g !== null && (V.TransitionProps = g);
  const C = _u(), $ = (r = v.root) != null ? r : "div", _ = gt({
    elementType: $,
    externalSlotProps: b.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: R
    },
    ownerState: t,
    className: C.root
  });
  return /* @__PURE__ */ T($, k({}, _, {
    children: typeof i == "function" ? i(V) : i
  }));
}), ha = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
    popperOptions: p = Au,
    popperRef: b,
    style: v,
    transition: g = !1,
    slotProps: h = {},
    slots: x = {}
  } = t, R = ce(t, $u), [y, w] = E.useState(!0), m = () => {
    w(!1);
  }, S = () => {
    w(!0);
  };
  if (!c && !d && (!g || y))
    return null;
  let P;
  if (i)
    P = i;
  else if (r) {
    const L = Dn(r);
    P = L && Hn(L) ? xe(L).body : xe(null).body;
  }
  const B = !d && c && (!g || y) ? "none" : void 0, j = g ? {
    in: d,
    onEnter: m,
    onExited: S
  } : void 0;
  return /* @__PURE__ */ T(ln, {
    disablePortal: l,
    container: P,
    children: /* @__PURE__ */ T(Du, k({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: g ? !y : d,
      placement: f,
      popperOptions: p,
      popperRef: b,
      slotProps: h,
      slots: x
    }, R, {
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
  anchorEl: zt(a.oneOfType([Je, a.object, a.func]), (e) => {
    if (e.open) {
      const t = Dn(e.anchorEl);
      if (t && Hn(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Iu(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  popperRef: Br,
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
const ju = ["values", "unit", "step"], Bu = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => k({}, n, {
    [r.key]: r.val
  }), {});
};
function Lu(e) {
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
  } = e, o = ce(e, ju), i = Bu(t), s = Object.keys(i);
  function l(p) {
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n})`;
  }
  function c(p) {
    return `@media (max-width:${(typeof t[p] == "number" ? t[p] : p) - r / 100}${n})`;
  }
  function u(p, b) {
    const v = s.indexOf(b);
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n}) and (max-width:${(v !== -1 && typeof t[s[v]] == "number" ? t[s[v]] : b) - r / 100}${n})`;
  }
  function d(p) {
    return s.indexOf(p) + 1 < s.length ? u(p, s[s.indexOf(p) + 1]) : l(p);
  }
  function f(p) {
    const b = s.indexOf(p);
    return b === 0 ? l(s[1]) : b === s.length - 1 ? c(s[b]) : u(p, s[s.indexOf(p) + 1]).replace("@media", "@media not all and");
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
const Fu = {
  borderRadius: 4
}, Vu = Fu, zu = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, st = zu;
function an(e, t) {
  return t ? Ye(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const qr = {
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
}, Qo = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${qr[e]}px)`
};
function Qe(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Qo;
    return t.reduce((s, l, c) => (s[i.up(i.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || Qo;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || qr).indexOf(l) !== -1) {
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
function Uu(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function Hu(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function Wn(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function jn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = Wn(e, n) || r, t && (o = t(o, r, e)), o;
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
    const l = s[t], c = s.theme, u = Wn(c, r) || {};
    return Qe(s, l, (f) => {
      let p = jn(u, o, f);
      return f === p && typeof f == "string" && (p = jn(u, o, `${t}${f === "default" ? "" : He(f)}`, f)), n === !1 ? p : {
        [n]: p
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: st
  } : {}, i.filterProps = [t], i;
}
function Wu(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const qu = {
  m: "margin",
  p: "padding"
}, Gu = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, ei = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Ku = Wu((e) => {
  if (e.length > 2)
    if (ei[e])
      e = ei[e];
    else
      return [e];
  const [t, n] = e.split(""), r = qu[t], o = Gu[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), qn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Gn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Xu = [...qn, ...Gn];
function gn(e, t, n, r) {
  var o;
  const i = (o = Wn(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ma(e) {
  return gn(e, "spacing", 8, "spacing");
}
function bn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Yu(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = bn(t, n), r), {});
}
function Ju(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Ku(n), i = Yu(o, r), s = e[n];
  return Qe(e, s, i);
}
function ga(e, t) {
  const n = ma(e.theme);
  return Object.keys(e).map((r) => Ju(e, t, r, n)).reduce(an, {});
}
function fe(e) {
  return ga(e, qn);
}
fe.propTypes = process.env.NODE_ENV !== "production" ? qn.reduce((e, t) => (e[t] = st, e), {}) : {};
fe.filterProps = qn;
function he(e) {
  return ga(e, Gn);
}
he.propTypes = process.env.NODE_ENV !== "production" ? Gn.reduce((e, t) => (e[t] = st, e), {}) : {};
he.filterProps = Gn;
process.env.NODE_ENV !== "production" && Xu.reduce((e, t) => (e[t] = st, e), {});
function Zu(e = 8) {
  if (e.mui)
    return e;
  const t = ma({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function Kn(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? an(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function je(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function ze(e, t) {
  return be({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Qu = ze("border", je), ed = ze("borderTop", je), td = ze("borderRight", je), nd = ze("borderBottom", je), rd = ze("borderLeft", je), od = ze("borderColor"), id = ze("borderTopColor"), ad = ze("borderRightColor"), sd = ze("borderBottomColor"), ld = ze("borderLeftColor"), cd = ze("outline", je), ud = ze("outlineColor"), Xn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = gn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: bn(t, r)
    });
    return Qe(e, e.borderRadius, n);
  }
  return null;
};
Xn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: st
} : {};
Xn.filterProps = ["borderRadius"];
Kn(Qu, ed, td, nd, rd, od, id, ad, sd, ld, Xn, cd, ud);
const Yn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = gn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: bn(t, r)
    });
    return Qe(e, e.gap, n);
  }
  return null;
};
Yn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: st
} : {};
Yn.filterProps = ["gap"];
const Jn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = gn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: bn(t, r)
    });
    return Qe(e, e.columnGap, n);
  }
  return null;
};
Jn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: st
} : {};
Jn.filterProps = ["columnGap"];
const Zn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = gn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: bn(t, r)
    });
    return Qe(e, e.rowGap, n);
  }
  return null;
};
Zn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: st
} : {};
Zn.filterProps = ["rowGap"];
const dd = be({
  prop: "gridColumn"
}), pd = be({
  prop: "gridRow"
}), fd = be({
  prop: "gridAutoFlow"
}), hd = be({
  prop: "gridAutoColumns"
}), md = be({
  prop: "gridAutoRows"
}), gd = be({
  prop: "gridTemplateColumns"
}), bd = be({
  prop: "gridTemplateRows"
}), vd = be({
  prop: "gridTemplateAreas"
}), yd = be({
  prop: "gridArea"
});
Kn(Yn, Jn, Zn, dd, pd, fd, hd, md, gd, bd, vd, yd);
function Mt(e, t) {
  return t === "grey" ? t : e;
}
const wd = be({
  prop: "color",
  themeKey: "palette",
  transform: Mt
}), xd = be({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Mt
}), Ed = be({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Mt
});
Kn(wd, xd, Ed);
function Ie(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Td = be({
  prop: "width",
  transform: Ie
}), Gr = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || qr[n];
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
Gr.filterProps = ["maxWidth"];
const kd = be({
  prop: "minWidth",
  transform: Ie
}), Od = be({
  prop: "height",
  transform: Ie
}), Sd = be({
  prop: "maxHeight",
  transform: Ie
}), Cd = be({
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
const Pd = be({
  prop: "boxSizing"
});
Kn(Td, Gr, kd, Od, Sd, Cd, Pd);
const Nd = {
  // borders
  border: {
    themeKey: "borders",
    transform: je
  },
  borderTop: {
    themeKey: "borders",
    transform: je
  },
  borderRight: {
    themeKey: "borders",
    transform: je
  },
  borderBottom: {
    themeKey: "borders",
    transform: je
  },
  borderLeft: {
    themeKey: "borders",
    transform: je
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
    transform: je
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Xn
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
    style: Yn
  },
  rowGap: {
    style: Zn
  },
  columnGap: {
    style: Jn
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
    style: Gr
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
}, Kr = Nd;
function Rd(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function $d(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Md() {
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
    const p = Wn(o, u) || {};
    return f ? f(s) : Qe(s, r, (v) => {
      let g = jn(p, d, v);
      return v === g && typeof v == "string" && (g = jn(p, d, `${n}${v === "default" ? "" : He(v)}`, v)), c === !1 ? g : {
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
    const s = (r = i.unstable_sxConfig) != null ? r : Kr;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const d = Uu(i.breakpoints), f = Object.keys(d);
      let p = d;
      return Object.keys(u).forEach((b) => {
        const v = $d(u[b], i);
        if (v != null)
          if (typeof v == "object")
            if (s[b])
              p = an(p, e(b, v, i, s));
            else {
              const g = Qe({
                theme: i
              }, v, (h) => ({
                [b]: h
              }));
              Rd(g, v) ? p[b] = t({
                sx: v,
                theme: i
              }) : p = an(p, g);
            }
          else
            p = an(p, e(b, v, i, s));
      }), Hu(f, p);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const ba = Md();
ba.filterProps = ["sx"];
const Xr = ba;
function Id(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const _d = ["breakpoints", "palette", "spacing", "shape"];
function Yr(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = ce(e, _d), l = Lu(n), c = Zu(o);
  let u = Ye({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: k({
      mode: "light"
    }, r),
    spacing: c,
    shape: k({}, Vu, i)
  }, s);
  return u.applyStyles = Id, u = t.reduce((d, f) => Ye(d, f), u), u.unstable_sxConfig = k({}, Kr, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(f) {
    return Xr({
      sx: f,
      theme: this
    });
  }, u;
}
function Ad(e) {
  return Object.keys(e).length === 0;
}
function va(e = null) {
  const t = E.useContext($s);
  return !t || Ad(t) ? e : t;
}
const Dd = Yr();
function ya(e = Dd) {
  return va(e);
}
const jd = ["ownerState"], Bd = ["variants"], Ld = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Fd(e) {
  return Object.keys(e).length === 0;
}
function Vd(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Nn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const zd = Yr(), ti = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function On({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Fd(t) ? e : t[n] || t;
}
function Ud(e) {
  return e ? (t, n) => n[e] : null;
}
function Rn(e, t) {
  let {
    ownerState: n
  } = t, r = ce(t, jd);
  const o = typeof e == "function" ? e(k({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Rn(i, k({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = ce(o, Bd);
    return i.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(k({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((d) => {
        (n == null ? void 0 : n[d]) !== c.props[d] && r[d] !== c.props[d] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(k({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Hd(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = zd,
    rootShouldForwardProp: r = Nn,
    slotShouldForwardProp: o = Nn
  } = e, i = (s) => Xr(k({}, s, {
    theme: On(k({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, l = {}) => {
    Ms(s, (m) => m.filter((S) => !(S != null && S.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: d,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: p = Ud(ti(u))
    } = l, b = ce(l, Ld), v = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), g = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${ti(u || "Root")}`);
    let x = Nn;
    u === "Root" || u === "root" ? x = r : u ? x = o : Vd(s) && (x = void 0);
    const R = Rs(s, k({
      shouldForwardProp: x,
      label: h
    }, b)), y = (m) => typeof m == "function" && m.__emotion_real !== m || pt(m) ? (S) => Rn(m, k({}, S, {
      theme: On({
        theme: S.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : m, w = (m, ...S) => {
      let P = y(m);
      const B = S ? S.map(y) : [];
      c && p && B.push((V) => {
        const C = On(k({}, V, {
          defaultTheme: n,
          themeId: t
        }));
        if (!C.components || !C.components[c] || !C.components[c].styleOverrides)
          return null;
        const $ = C.components[c].styleOverrides, _ = {};
        return Object.entries($).forEach(([D, M]) => {
          _[D] = Rn(M, k({}, V, {
            theme: C
          }));
        }), p(V, _);
      }), c && !v && B.push((V) => {
        var C;
        const $ = On(k({}, V, {
          defaultTheme: n,
          themeId: t
        })), _ = $ == null || (C = $.components) == null || (C = C[c]) == null ? void 0 : C.variants;
        return Rn({
          variants: _
        }, k({}, V, {
          theme: $
        }));
      }), g || B.push(i);
      const j = B.length - S.length;
      if (Array.isArray(m) && j > 0) {
        const V = new Array(j).fill("");
        P = [...m, ...V], P.raw = [...m.raw, ...V];
      }
      const L = R(P, ...B);
      if (process.env.NODE_ENV !== "production") {
        let V;
        c && (V = `${c}${He(u || "")}`), V === void 0 && (V = `Styled(${Pl(s)})`), L.displayName = V;
      }
      return s.muiName && (L.muiName = s.muiName), L;
    };
    return R.withConfig && (w.withConfig = R.withConfig), w;
  };
}
function Wd(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Ji(t.components[n].defaultProps, r);
}
function qd({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = ya(n);
  return r && (o = o[r] || o), Wd({
    theme: o,
    name: t,
    props: e
  });
}
function Jr(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Jl(e, t, n);
}
function Gd(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function vt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return vt(Gd(e));
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
function Qn(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Kd(e) {
  e = vt(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (u, d = (u + n / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Qn({
    type: l,
    values: c
  });
}
function ni(e) {
  e = vt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? vt(Kd(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function ri(e, t) {
  const n = ni(e), r = ni(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Bn(e, t) {
  return e = vt(e), t = Jr(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Qn(e);
}
function Xd(e, t) {
  if (e = vt(e), t = Jr(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Qn(e);
}
function Yd(e, t) {
  if (e = vt(e), t = Jr(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Qn(e);
}
function Jd(e, t) {
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
const Zd = {
  black: "#000",
  white: "#fff"
}, dn = Zd, Qd = {
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
}, ep = Qd, tp = {
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
}, xt = tp, np = {
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
}, Et = np, rp = {
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
}, Yt = rp, op = {
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
}, Tt = op, ip = {
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
}, kt = ip, ap = {
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
}, Ot = ap, sp = ["mode", "contrastThreshold", "tonalOffset"], oi = {
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
}, fr = {
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
function ii(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Yd(e.main, o) : t === "dark" && (e.dark = Xd(e.main, i)));
}
function lp(e = "light") {
  return e === "dark" ? {
    main: Tt[200],
    light: Tt[50],
    dark: Tt[400]
  } : {
    main: Tt[700],
    light: Tt[400],
    dark: Tt[800]
  };
}
function cp(e = "light") {
  return e === "dark" ? {
    main: xt[200],
    light: xt[50],
    dark: xt[400]
  } : {
    main: xt[500],
    light: xt[300],
    dark: xt[700]
  };
}
function up(e = "light") {
  return e === "dark" ? {
    main: Et[500],
    light: Et[300],
    dark: Et[700]
  } : {
    main: Et[700],
    light: Et[400],
    dark: Et[800]
  };
}
function dp(e = "light") {
  return e === "dark" ? {
    main: kt[400],
    light: kt[300],
    dark: kt[700]
  } : {
    main: kt[700],
    light: kt[500],
    dark: kt[900]
  };
}
function pp(e = "light") {
  return e === "dark" ? {
    main: Ot[400],
    light: Ot[300],
    dark: Ot[700]
  } : {
    main: Ot[800],
    light: Ot[500],
    dark: Ot[900]
  };
}
function fp(e = "light") {
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
function hp(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = ce(e, sp), i = e.primary || lp(t), s = e.secondary || cp(t), l = e.error || up(t), c = e.info || dp(t), u = e.success || pp(t), d = e.warning || fp(t);
  function f(g) {
    const h = ri(g, fr.text.primary) >= n ? fr.text.primary : oi.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const x = ri(g, h);
      x < 3 && console.error([`MUI: The contrast ratio of ${x}:1 for ${h} on ${g}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const p = ({
    color: g,
    name: h,
    mainShade: x = 500,
    lightShade: R = 300,
    darkShade: y = 700
  }) => {
    if (g = k({}, g), !g.main && g[x] && (g.main = g[x]), !g.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.` : _t(11, h ? ` (${h})` : "", x));
    if (typeof g.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : _t(12, h ? ` (${h})` : "", JSON.stringify(g.main)));
    return ii(g, "light", R, r), ii(g, "dark", y, r), g.contrastText || (g.contrastText = f(g.main)), g;
  }, b = {
    dark: fr,
    light: oi
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Ye(k({
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
    grey: ep,
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
  }, b[t]), o);
}
const mp = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function gp(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ai = {
  textTransform: "uppercase"
}, si = '"Roboto", "Helvetica", "Arial", sans-serif';
function bp(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = si,
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
  } = n, p = ce(n, mp);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, v = f || ((x) => `${x / u * b}rem`), g = (x, R, y, w, m) => k({
    fontFamily: r,
    fontWeight: x,
    fontSize: v(R),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: y
  }, r === si ? {
    letterSpacing: `${gp(w / R)}em`
  } : {}, m, d), h = {
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
    button: g(l, 14, 1.75, 0.4, ai),
    caption: g(s, 12, 1.66, 0.4),
    overline: g(s, 12, 2.66, 1, ai),
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
  }, h), p, {
    clone: !1
    // No need to clone deep
  });
}
const vp = 0.2, yp = 0.14, wp = 0.12;
function pe(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${vp})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${yp})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${wp})`].join(",");
}
const xp = ["none", pe(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), pe(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), pe(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), pe(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), pe(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), pe(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), pe(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), pe(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), pe(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), pe(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), pe(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), pe(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), pe(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), pe(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), pe(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), pe(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), pe(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), pe(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), pe(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), pe(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), pe(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), pe(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), pe(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), pe(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ep = xp, Tp = ["duration", "easing", "delay"], kp = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Op = {
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
function li(e) {
  return `${Math.round(e)}ms`;
}
function Sp(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Cp(e) {
  const t = k({}, kp, e.easing), n = k({}, Op, e.duration);
  return k({
    getAutoHeightDuration: Sp,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = ce(i, Tp);
      if (process.env.NODE_ENV !== "production") {
        const d = (p) => typeof p == "string", f = (p) => !isNaN(parseFloat(p));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : li(s)} ${l} ${typeof c == "string" ? c : li(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Pp = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Np = Pp, Rp = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function $p(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = ce(e, Rp);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : _t(18));
  const l = hp(r), c = Yr(e);
  let u = Ye(c, {
    mixins: Jd(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ep.slice(),
    typography: bp(l, i),
    transitions: Cp(o),
    zIndex: k({}, Np)
  });
  if (u = Ye(u, s), u = t.reduce((d, f) => Ye(d, f), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (p, b) => {
      let v;
      for (v in p) {
        const g = p[v];
        if (d.indexOf(v) !== -1 && Object.keys(g).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = qe("", v);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(p, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: g
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          p[v] = {};
        }
      }
    };
    Object.keys(u.components).forEach((p) => {
      const b = u.components[p].styleOverrides;
      b && p.indexOf("Mui") === 0 && f(b, p);
    });
  }
  return u.unstable_sxConfig = k({}, Kr, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(f) {
    return Xr({
      sx: f,
      theme: this
    });
  }, u;
}
const Mp = $p(), Zr = Mp, Qr = "$$material", wa = (e) => Nn(e) && e !== "classes", Ip = Hd({
  themeId: Qr,
  defaultTheme: Zr,
  rootShouldForwardProp: wa
}), Ee = Ip;
function vn() {
  const e = ya(Zr);
  return process.env.NODE_ENV !== "production" && E.useDebugValue(e), e[Qr] || e;
}
function tt({
  props: e,
  name: t
}) {
  return qd({
    props: e,
    name: t,
    defaultTheme: Zr,
    themeId: Qr
  });
}
function Pr(e, t) {
  return Pr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Pr(e, t);
}
function _p(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Pr(e, t);
}
const ci = {
  disabled: !1
};
var Ap = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
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
const xa = Rt.createContext(null);
var Dp = function(t) {
  return t.scrollTop;
}, tn = "unmounted", ut = "exited", dt = "entering", Nt = "entered", Nr = "exiting", nt = /* @__PURE__ */ function(e) {
  _p(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = ut, i.appearStatus = dt) : c = Nt : r.unmountOnExit || r.mountOnEnter ? c = tn : c = ut, i.state = {
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
      this.props.in ? s !== dt && s !== Nt && (i = dt) : (s === dt || s === Nt) && (i = Nr);
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
      if (this.cancelNextCallback(), i === dt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : En.findDOMNode(this);
          s && Dp(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ut && this.setState({
        status: tn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [En.findDOMNode(this), l], u = c[0], d = c[1], f = this.getTimeouts(), p = l ? f.appear : f.enter;
    if (!o && !s || ci.disabled) {
      this.safeSetState({
        status: Nt
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: dt
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(p, function() {
        i.safeSetState({
          status: Nt
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : En.findDOMNode(this);
    if (!i || ci.disabled) {
      this.safeSetState({
        status: ut
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Nr
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : En.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === tn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = ce(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Rt.createElement(xa.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : Rt.cloneElement(Rt.Children.only(s), l))
    );
  }, t;
}(Rt.Component);
nt.contextType = xa;
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
    var n = Ap;
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
function St() {
}
nt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: St,
  onEntering: St,
  onEntered: St,
  onExit: St,
  onExiting: St,
  onExited: St
};
nt.UNMOUNTED = tn;
nt.EXITED = ut;
nt.ENTERING = dt;
nt.ENTERED = Nt;
nt.EXITING = Nr;
const Ea = nt, Ta = (e) => e.scrollTop;
function Ln(e, t) {
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
const jp = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Rr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Bp = {
  entering: {
    opacity: 1,
    transform: Rr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, hr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), eo = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
    onExiting: b,
    style: v,
    timeout: g = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = Ea
  } = t, x = ce(t, jp), R = Qt(), y = E.useRef(), w = vn(), m = E.useRef(null), S = Le(m, i.ref, n), P = (D) => (M) => {
    if (D) {
      const F = m.current;
      M === void 0 ? D(F) : D(F, M);
    }
  }, B = P(d), j = P((D, M) => {
    Ta(D);
    const {
      duration: F,
      delay: Q,
      easing: Z
    } = Ln({
      style: v,
      timeout: g,
      easing: s
    }, {
      mode: "enter"
    });
    let O;
    g === "auto" ? (O = w.transitions.getAutoHeightDuration(D.clientHeight), y.current = O) : O = F, D.style.transition = [w.transitions.create("opacity", {
      duration: O,
      delay: Q
    }), w.transitions.create("transform", {
      duration: hr ? O : O * 0.666,
      delay: Q,
      easing: Z
    })].join(","), c && c(D, M);
  }), L = P(u), V = P(b), C = P((D) => {
    const {
      duration: M,
      delay: F,
      easing: Q
    } = Ln({
      style: v,
      timeout: g,
      easing: s
    }, {
      mode: "exit"
    });
    let Z;
    g === "auto" ? (Z = w.transitions.getAutoHeightDuration(D.clientHeight), y.current = Z) : Z = M, D.style.transition = [w.transitions.create("opacity", {
      duration: Z,
      delay: F
    }), w.transitions.create("transform", {
      duration: hr ? Z : Z * 0.666,
      delay: hr ? F : F || Z * 0.333,
      easing: Q
    })].join(","), D.style.opacity = 0, D.style.transform = Rr(0.75), f && f(D);
  }), $ = P(p);
  return /* @__PURE__ */ T(h, k({
    appear: o,
    in: l,
    nodeRef: m,
    onEnter: j,
    onEntered: L,
    onEntering: B,
    onExit: C,
    onExited: $,
    onExiting: V,
    addEndListener: (D) => {
      g === "auto" && R.start(y.current || 0, D), r && r(m.current, D);
    },
    timeout: g === "auto" ? null : g
  }, x, {
    children: (D, M) => /* @__PURE__ */ E.cloneElement(i, k({
      style: k({
        opacity: 0,
        transform: Rr(0.75),
        visibility: D === "exited" && !l ? "hidden" : void 0
      }, Bp[D], v, i.props.style),
      ref: S
    }, M))
  }));
});
process.env.NODE_ENV !== "production" && (eo.propTypes = {
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
  children: pn.isRequired,
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
eo.muiSupportAuto = !0;
const $r = eo, Lp = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, ui = Lp, Fp = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Vp = Ee(ha, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ka = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r;
  const o = va(), i = tt({
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
    modifiers: b,
    open: v,
    placement: g,
    popperOptions: h,
    popperRef: x,
    transition: R,
    slots: y,
    slotProps: w
  } = i, m = ce(i, Fp), S = (r = y == null ? void 0 : y.root) != null ? r : c == null ? void 0 : c.Root, P = k({
    anchorEl: s,
    container: d,
    disablePortal: f,
    keepMounted: p,
    modifiers: b,
    open: v,
    placement: g,
    popperOptions: h,
    popperRef: x,
    transition: R
  }, m);
  return /* @__PURE__ */ T(Vp, k({
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
  popperRef: Br,
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
const Oa = ka;
function zp(e) {
  return qe("MuiTooltip", e);
}
const Up = it("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ot = Up, Hp = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Wp(e) {
  return Math.round(e * 1e5) / 1e5;
}
const qp = (e) => {
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
  return et(s, zp, t);
}, Gp = Ee(Oa, {
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
})), Kp = Ee("div", {
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
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Bn(e.palette.grey[700], 0.92),
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
  lineHeight: `${Wp(16 / 14)}em`,
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
})), Xp = Ee("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Bn(e.palette.grey[700], 0.9),
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
let Sn = !1;
const di = new fn();
let Jt = {
  x: 0,
  y: 0
};
function Cn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Sa = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i, s, l, c, u, d, f, p, b, v, g, h, x, R, y, w, m;
  const S = tt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: P = !1,
    children: B,
    components: j = {},
    componentsProps: L = {},
    describeChild: V = !1,
    disableFocusListener: C = !1,
    disableHoverListener: $ = !1,
    disableInteractive: _ = !1,
    disableTouchListener: D = !1,
    enterDelay: M = 100,
    enterNextDelay: F = 0,
    enterTouchDelay: Q = 700,
    followCursor: Z = !1,
    id: O,
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
    TransitionComponent: I = $r,
    TransitionProps: J
  } = S, N = ce(S, Hp), re = /* @__PURE__ */ E.isValidElement(B) ? B : /* @__PURE__ */ T("span", {
    children: B
  }), ve = vn(), Te = ve.direction === "rtl", [me, lt] = E.useState(), [ke, Ge] = E.useState(null), Ne = E.useRef(!1), Ke = _ || Z, ye = Qt(), yt = Qt(), ct = Qt(), Ut = Qt(), [yn, oo] = Wi({
    controlled: H,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Xe = yn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ee
    } = E.useRef(H !== void 0);
    E.useEffect(() => {
      me && me.disabled && !ee && ne !== "" && me.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ne, me, ee]);
  }
  const er = Hi(O), Ht = E.useRef(), wn = sn(() => {
    Ht.current !== void 0 && (document.body.style.WebkitUserSelect = Ht.current, Ht.current = void 0), Ut.clear();
  });
  E.useEffect(() => wn, [wn]);
  const io = (ee) => {
    di.clear(), Sn = !0, oo(!0), z && !Xe && z(ee);
  }, xn = sn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ee) => {
      di.start(800 + A, () => {
        Sn = !1;
      }), oo(!1), K && Xe && K(ee), ye.start(ve.transitions.duration.shortest, () => {
        Ne.current = !1;
      });
    }
  ), tr = (ee) => {
    Ne.current && ee.type !== "touchstart" || (me && me.removeAttribute("title"), yt.clear(), ct.clear(), M || Sn && F ? yt.start(Sn ? F : M, () => {
      io(ee);
    }) : io(ee));
  }, ao = (ee) => {
    yt.clear(), ct.start(A, () => {
      xn(ee);
    });
  }, {
    isFocusVisibleRef: so,
    onBlur: Ua,
    onFocus: Ha,
    ref: Wa
  } = qi(), [, lo] = E.useState(!1), co = (ee) => {
    Ua(ee), so.current === !1 && (lo(!1), ao(ee));
  }, uo = (ee) => {
    me || lt(ee.currentTarget), Ha(ee), so.current === !0 && (lo(!0), tr(ee));
  }, po = (ee) => {
    Ne.current = !0;
    const Re = re.props;
    Re.onTouchStart && Re.onTouchStart(ee);
  }, fo = tr, ho = ao, qa = (ee) => {
    po(ee), ct.clear(), ye.clear(), wn(), Ht.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Ut.start(Q, () => {
      document.body.style.WebkitUserSelect = Ht.current, tr(ee);
    });
  }, Ga = (ee) => {
    re.props.onTouchEnd && re.props.onTouchEnd(ee), wn(), ct.start(U, () => {
      xn(ee);
    });
  };
  E.useEffect(() => {
    if (!Xe)
      return;
    function ee(Re) {
      (Re.key === "Escape" || Re.key === "Esc") && xn(Re);
    }
    return document.addEventListener("keydown", ee), () => {
      document.removeEventListener("keydown", ee);
    };
  }, [xn, Xe]);
  const Ka = Le(re.ref, Wa, lt, n);
  !ne && ne !== 0 && (Xe = !1);
  const nr = E.useRef(), Xa = (ee) => {
    const Re = re.props;
    Re.onMouseMove && Re.onMouseMove(ee), Jt = {
      x: ee.clientX,
      y: ee.clientY
    }, nr.current && nr.current.update();
  }, Wt = {}, rr = typeof ne == "string";
  V ? (Wt.title = !Xe && rr && !$ ? ne : null, Wt["aria-describedby"] = Xe ? er : null) : (Wt["aria-label"] = rr ? ne : null, Wt["aria-labelledby"] = Xe && !rr ? er : null);
  const De = k({}, Wt, N, re.props, {
    className: we(N.className, re.props.className),
    onTouchStart: po,
    ref: Ka
  }, Z ? {
    onMouseMove: Xa
  } : {});
  process.env.NODE_ENV !== "production" && (De["data-mui-internal-clone-element"] = !0, E.useEffect(() => {
    me && !me.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [me]));
  const qt = {};
  D || (De.onTouchStart = qa, De.onTouchEnd = Ga), $ || (De.onMouseOver = Cn(fo, De.onMouseOver), De.onMouseLeave = Cn(ho, De.onMouseLeave), Ke || (qt.onMouseOver = fo, qt.onMouseLeave = ho)), C || (De.onFocus = Cn(uo, De.onFocus), De.onBlur = Cn(co, De.onBlur), Ke || (qt.onFocus = uo, qt.onBlur = co)), process.env.NODE_ENV !== "production" && re.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${re.props.title}\` or the Tooltip component.`].join(`
`));
  const Ya = E.useMemo(() => {
    var ee;
    let Re = [{
      name: "arrow",
      enabled: !!ke,
      options: {
        element: ke,
        padding: 4
      }
    }];
    return (ee = W.popperOptions) != null && ee.modifiers && (Re = Re.concat(W.popperOptions.modifiers)), k({}, W.popperOptions, {
      modifiers: Re
    });
  }, [ke, W]), Gt = k({}, S, {
    isRtl: Te,
    arrow: P,
    disableInteractive: Ke,
    placement: q,
    PopperComponentProp: G,
    touch: Ne.current
  }), or = qp(Gt), mo = (r = (o = Y.popper) != null ? o : j.Popper) != null ? r : Gp, go = (i = (s = (l = Y.transition) != null ? l : j.Transition) != null ? s : I) != null ? i : $r, bo = (c = (u = Y.tooltip) != null ? u : j.Tooltip) != null ? c : Kp, vo = (d = (f = Y.arrow) != null ? f : j.Arrow) != null ? d : Xp, Ja = en(mo, k({}, W, (p = X.popper) != null ? p : L.popper, {
    className: we(or.popper, W == null ? void 0 : W.className, (b = (v = X.popper) != null ? v : L.popper) == null ? void 0 : b.className)
  }), Gt), Za = en(go, k({}, J, (g = X.transition) != null ? g : L.transition), Gt), Qa = en(bo, k({}, (h = X.tooltip) != null ? h : L.tooltip, {
    className: we(or.tooltip, (x = (R = X.tooltip) != null ? R : L.tooltip) == null ? void 0 : x.className)
  }), Gt), es = en(vo, k({}, (y = X.arrow) != null ? y : L.arrow, {
    className: we(or.arrow, (w = (m = X.arrow) != null ? m : L.arrow) == null ? void 0 : w.className)
  }), Gt);
  return /* @__PURE__ */ de(E.Fragment, {
    children: [/* @__PURE__ */ E.cloneElement(re, De), /* @__PURE__ */ T(mo, k({
      as: G ?? Oa,
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
      popperRef: nr,
      open: me ? Xe : !1,
      id: er,
      transition: !0
    }, qt, Ja, {
      popperOptions: Ya,
      children: ({
        TransitionProps: ee
      }) => /* @__PURE__ */ T(go, k({
        timeout: ve.transitions.duration.shorter
      }, ee, Za, {
        children: /* @__PURE__ */ de(bo, k({}, Qa, {
          children: [ne, P ? /* @__PURE__ */ T(vo, k({}, es, {
            ref: Ge
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
  arrow: a.bool,
  /**
   * Tooltip reference element.
   */
  children: pn.isRequired,
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
const Yp = Sa;
var to = {}, Ca = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ca);
var Jp = Ca.exports, mr = {};
function Zp(e) {
  return qe("MuiSvgIcon", e);
}
it("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Qp = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ef = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${He(t)}`, `fontSize${He(n)}`]
  };
  return et(o, Zp, r);
}, tf = Ee("svg", {
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
  var n, r, o, i, s, l, c, u, d, f, p, b, v;
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
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[t.color]
  };
}), no = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
    inheritViewBox: d = !1,
    titleAccess: f,
    viewBox: p = "0 0 24 24"
  } = r, b = ce(r, Qp), v = /* @__PURE__ */ E.isValidElement(o) && o.type === "svg", g = k({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: p,
    hasSvgAsChild: v
  }), h = {};
  d || (h.viewBox = p);
  const x = ef(g);
  return /* @__PURE__ */ de(tf, k({
    as: l,
    className: we(x.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, h, b, v && o.props, {
    ownerState: g,
    children: [v ? o.props.children : o, f ? /* @__PURE__ */ T("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (no.propTypes = {
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
no.muiName = "SvgIcon";
const pi = no;
function Pa(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ T(pi, k({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = pi.muiName, /* @__PURE__ */ E.memo(/* @__PURE__ */ E.forwardRef(n));
}
const nf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Zi.configure(e);
  }
}, rf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: He,
  createChainedFunction: Tr,
  createSvgIcon: Pa,
  debounce: Ui,
  deprecatedPropType: Rl,
  isMuiElement: $l,
  ownerDocument: xe,
  ownerWindow: At,
  requirePropFactory: Ml,
  setRef: In,
  unstable_ClassNameGenerator: nf,
  unstable_useEnhancedEffect: mt,
  unstable_useId: Hi,
  unsupportedProp: Al,
  useControlled: Wi,
  useEventCallback: sn,
  useForkRef: Le,
  useIsFocusVisible: qi
}, Symbol.toStringTag, { value: "Module" })), of = /* @__PURE__ */ cl(rf);
var fi;
function af() {
  return fi || (fi = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = of;
  }(mr)), mr;
}
var sf = Jp;
Object.defineProperty(to, "__esModule", {
  value: !0
});
var Na = to.default = void 0, lf = sf(af()), cf = ts;
Na = to.default = (0, lf.default)(/* @__PURE__ */ (0, cf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function hi(e, t, n) {
  return e ? /* @__PURE__ */ T(Ti, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ T("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ra(e) {
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
    hasDivider: b = !1,
    focusVisibleClassName: v,
    id: g,
    children: h
  } = e, x = /* @__PURE__ */ T(
    ys,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: d,
      disableGutters: p,
      divider: b,
      focusVisibleClassName: v,
      onClick: t,
      id: g,
      children: n ? /* @__PURE__ */ de(Vn, { children: [
        hi(i, n, !0),
        /* @__PURE__ */ T(ws, { primary: n, inset: !i && o }),
        f ? /* @__PURE__ */ T(Ti, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ T(Na, {}) }) : hi(s, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ T(Yp, { title: r, placement: "right", children: /* @__PURE__ */ T("div", { children: x }) }) : x;
}
function $a(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function uf(e) {
  const [t, n] = Me(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (u) => {
    n(u.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let u = $a(i).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ T(ro, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ de(Vn, { children: [
    /* @__PURE__ */ T(Ra, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ T(
      xs,
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
const df = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function ro(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = Ft(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      $a(t).filter((v) => !("menuItem" in v.group))
    ), f = Object.values(d).sort(
      (v, g) => (v.group.order || 0) - (g.group.order || 0)
    ), p = [];
    f.forEach((v) => {
      df(v.id, t.items).forEach(
        (g) => p.push({ item: g, isLastItemInGroup: !1 })
      ), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !0);
    }), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !1);
    const b = p.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: p, allowForLeadingIcons: b };
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
    const { item: p } = d, b = l(d);
    if ("command" in p) {
      const v = p.group + f;
      return /* @__PURE__ */ T(
        Ra,
        {
          onClick: (g) => {
            n == null || n(g), r(p);
          },
          ...b
        },
        v
      );
    }
    return /* @__PURE__ */ T(
      uf,
      {
        parentMenuItem: p,
        parentItemProps: b,
        ...e
      },
      u + p.id
    );
  }) }, u);
}
function pf(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ T(ro, { ...e, includedGroups: i });
}
function ff({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ de(
    ki,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ T("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ T(Es, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ T(
          pf,
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
function hf({
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
    ki,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, l) => /* @__PURE__ */ T(
        ff,
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
const Ma = /* @__PURE__ */ E.createContext({});
process.env.NODE_ENV !== "production" && (Ma.displayName = "ListContext");
const mf = Ma;
function gf(e) {
  return qe("MuiList", e);
}
it("MuiList", ["root", "padding", "dense", "subheader"]);
const bf = ["children", "className", "component", "dense", "disablePadding", "subheader"], vf = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return et({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, gf, t);
}, yf = Ee("ul", {
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
})), Ia = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
  } = r, d = ce(r, bf), f = E.useMemo(() => ({
    dense: l
  }), [l]), p = k({}, r, {
    component: s,
    dense: l,
    disablePadding: c
  }), b = vf(p);
  return /* @__PURE__ */ T(mf.Provider, {
    value: f,
    children: /* @__PURE__ */ de(yf, k({
      as: s,
      className: we(b.root, i),
      ref: n,
      ownerState: p
    }, d, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ia.propTypes = {
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
const wf = Ia, xf = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function gr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function mi(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function _a(e, t) {
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
    if (!l.hasAttribute("tabindex") || !_a(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Aa = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
  } = t, p = ce(t, xf), b = E.useRef(null), v = E.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  mt(() => {
    o && b.current.focus();
  }, [o]), E.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (y, w) => {
      const m = !b.current.style.width;
      if (y.clientHeight < b.current.clientHeight && m) {
        const S = `${Gi(xe(y))}px`;
        b.current.style[w.direction === "rtl" ? "paddingLeft" : "paddingRight"] = S, b.current.style.width = `calc(100% + ${S})`;
      }
      return b.current;
    }
  }), []);
  const g = (y) => {
    const w = b.current, m = y.key, S = xe(w).activeElement;
    if (m === "ArrowDown")
      y.preventDefault(), Zt(w, S, u, c, gr);
    else if (m === "ArrowUp")
      y.preventDefault(), Zt(w, S, u, c, mi);
    else if (m === "Home")
      y.preventDefault(), Zt(w, null, u, c, gr);
    else if (m === "End")
      y.preventDefault(), Zt(w, null, u, c, mi);
    else if (m.length === 1) {
      const P = v.current, B = m.toLowerCase(), j = performance.now();
      P.keys.length > 0 && (j - P.lastTime > 500 ? (P.keys = [], P.repeating = !0, P.previousKeyMatched = !0) : P.repeating && B !== P.keys[0] && (P.repeating = !1)), P.lastTime = j, P.keys.push(B);
      const L = S && !P.repeating && _a(S, P);
      P.previousKeyMatched && (L || Zt(w, S, !1, c, gr, P)) ? y.preventDefault() : P.previousKeyMatched = !1;
    }
    d && d(y);
  }, h = Le(b, n);
  let x = -1;
  E.Children.forEach(s, (y, w) => {
    if (!/* @__PURE__ */ E.isValidElement(y)) {
      x === w && (x += 1, x >= s.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Mn.isFragment(y) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), y.props.disabled || (f === "selectedMenu" && y.props.selected || x === -1) && (x = w), x === w && (y.props.disabled || y.props.muiSkipListHighlight || y.type.muiSkipListHighlight) && (x += 1, x >= s.length && (x = -1));
  });
  const R = E.Children.map(s, (y, w) => {
    if (w === x) {
      const m = {};
      return i && (m.autoFocus = !0), y.props.tabIndex === void 0 && f === "selectedMenu" && (m.tabIndex = 0), /* @__PURE__ */ E.cloneElement(y, m);
    }
    return y;
  });
  return /* @__PURE__ */ T(wf, k({
    role: "menu",
    ref: h,
    className: l,
    onKeyDown: g,
    tabIndex: o ? 0 : -1
  }, p, {
    children: R
  }));
});
process.env.NODE_ENV !== "production" && (Aa.propTypes = {
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
const Ef = Aa, Tf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], kf = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Da = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const r = vn(), o = {
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
    onExit: b,
    onExited: v,
    onExiting: g,
    style: h,
    timeout: x = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: R = Ea
  } = t, y = ce(t, Tf), w = E.useRef(null), m = Le(w, l.ref, n), S = (_) => (D) => {
    if (_) {
      const M = w.current;
      D === void 0 ? _(M) : _(M, D);
    }
  }, P = S(p), B = S((_, D) => {
    Ta(_);
    const M = Ln({
      style: h,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    _.style.webkitTransition = r.transitions.create("opacity", M), _.style.transition = r.transitions.create("opacity", M), d && d(_, D);
  }), j = S(f), L = S(g), V = S((_) => {
    const D = Ln({
      style: h,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    _.style.webkitTransition = r.transitions.create("opacity", D), _.style.transition = r.transitions.create("opacity", D), b && b(_);
  }), C = S(v);
  return /* @__PURE__ */ T(R, k({
    appear: s,
    in: u,
    nodeRef: w,
    onEnter: B,
    onEntered: j,
    onEntering: P,
    onExit: V,
    onExited: C,
    onExiting: L,
    addEndListener: (_) => {
      i && i(w.current, _);
    },
    timeout: x
  }, y, {
    children: (_, D) => /* @__PURE__ */ E.cloneElement(l, k({
      style: k({
        opacity: 0,
        visibility: _ === "exited" && !u ? "hidden" : void 0
      }, kf[_], h, l.props.style),
      ref: m
    }, D))
  }));
});
process.env.NODE_ENV !== "production" && (Da.propTypes = {
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
  children: pn.isRequired,
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
const Of = Da;
function Sf(e) {
  return qe("MuiBackdrop", e);
}
it("MuiBackdrop", ["root", "invisible"]);
const Cf = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Pf = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return et({
    root: ["root", n && "invisible"]
  }, Sf, t);
}, Nf = Ee("div", {
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
})), ja = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i;
  const s = tt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: d = {},
    componentsProps: f = {},
    invisible: p = !1,
    open: b,
    slotProps: v = {},
    slots: g = {},
    TransitionComponent: h = Of,
    transitionDuration: x
  } = s, R = ce(s, Cf), y = k({}, s, {
    component: u,
    invisible: p
  }), w = Pf(y), m = (r = v.root) != null ? r : f.root;
  return /* @__PURE__ */ T(h, k({
    in: b,
    timeout: x
  }, R, {
    children: /* @__PURE__ */ T(Nf, k({
      "aria-hidden": !0
    }, m, {
      as: (o = (i = g.root) != null ? i : d.Root) != null ? o : u,
      className: we(w.root, c, m == null ? void 0 : m.className),
      ownerState: k({}, y, m == null ? void 0 : m.ownerState),
      classes: w,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ja.propTypes = {
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
const Rf = ja;
function $f(e) {
  return qe("MuiModal", e);
}
it("MuiModal", ["root", "hidden", "backdrop"]);
const Mf = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], If = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return et({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, $f, r);
}, _f = Ee("div", {
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
})), Af = Ee(Rf, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Ba = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o, i, s, l, c;
  const u = tt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = Af,
    BackdropProps: f,
    className: p,
    closeAfterTransition: b = !1,
    children: v,
    container: g,
    component: h,
    components: x = {},
    componentsProps: R = {},
    disableAutoFocus: y = !1,
    disableEnforceFocus: w = !1,
    disableEscapeKeyDown: m = !1,
    disablePortal: S = !1,
    disableRestoreFocus: P = !1,
    disableScrollLock: B = !1,
    hideBackdrop: j = !1,
    keepMounted: L = !1,
    onBackdropClick: V,
    open: C,
    slotProps: $,
    slots: _
    // eslint-disable-next-line react/prop-types
  } = u, D = ce(u, Mf), M = k({}, u, {
    closeAfterTransition: b,
    disableAutoFocus: y,
    disableEnforceFocus: w,
    disableEscapeKeyDown: m,
    disablePortal: S,
    disableRestoreFocus: P,
    disableScrollLock: B,
    hideBackdrop: j,
    keepMounted: L
  }), {
    getRootProps: F,
    getBackdropProps: Q,
    getTransitionProps: Z,
    portalRef: O,
    isTopModal: A,
    exited: U,
    hasTransition: K
  } = Ec(k({}, M, {
    rootRef: n
  })), z = k({}, M, {
    exited: U
  }), H = If(z), q = {};
  if (v.props.tabIndex === void 0 && (q.tabIndex = "-1"), K) {
    const {
      onEnter: J,
      onExited: N
    } = Z();
    q.onEnter = J, q.onExited = N;
  }
  const G = (r = (o = _ == null ? void 0 : _.root) != null ? o : x.Root) != null ? r : _f, W = (i = (s = _ == null ? void 0 : _.backdrop) != null ? s : x.Backdrop) != null ? i : d, X = (l = $ == null ? void 0 : $.root) != null ? l : R.root, Y = (c = $ == null ? void 0 : $.backdrop) != null ? c : R.backdrop, ne = gt({
    elementType: G,
    externalSlotProps: X,
    externalForwardedProps: D,
    getSlotProps: F,
    additionalProps: {
      ref: n,
      as: h
    },
    ownerState: z,
    className: we(p, X == null ? void 0 : X.className, H == null ? void 0 : H.root, !z.open && z.exited && (H == null ? void 0 : H.hidden))
  }), I = gt({
    elementType: W,
    externalSlotProps: Y,
    additionalProps: f,
    getSlotProps: (J) => Q(k({}, J, {
      onClick: (N) => {
        V && V(N), J != null && J.onClick && J.onClick(N);
      }
    })),
    className: we(Y == null ? void 0 : Y.className, f == null ? void 0 : f.className, H == null ? void 0 : H.backdrop),
    ownerState: z
  });
  return !L && !C && (!K || U) ? null : /* @__PURE__ */ T(ln, {
    ref: O,
    container: g,
    disablePortal: S,
    children: /* @__PURE__ */ de(G, k({}, ne, {
      children: [!j && d ? /* @__PURE__ */ T(W, k({}, I)) : null, /* @__PURE__ */ T(_n, {
        disableEnforceFocus: w,
        disableAutoFocus: y,
        disableRestoreFocus: P,
        isEnabled: A,
        open: C,
        children: /* @__PURE__ */ E.cloneElement(v, q)
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
  BackdropComponent: a.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: a.object,
  /**
   * A single child content element.
   */
  children: pn.isRequired,
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
const Df = Ba;
function jf(e) {
  return qe("MuiPaper", e);
}
it("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Bf = ["className", "component", "elevation", "square", "variant"], Lf = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return et(i, jf, o);
}, Ff = Ee("div", {
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
    backgroundImage: `linear-gradient(${Bn("#fff", ui(t.elevation))}, ${Bn("#fff", ui(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), La = /* @__PURE__ */ E.forwardRef(function(t, n) {
  const r = tt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = ce(r, Bf), d = k({}, r, {
    component: i,
    elevation: s,
    square: l,
    variant: c
  }), f = Lf(d);
  return process.env.NODE_ENV !== "production" && vn().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ T(Ff, k({
    as: i,
    ownerState: d,
    className: we(f.root, o),
    ref: n
  }, u));
});
process.env.NODE_ENV !== "production" && (La.propTypes = {
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
  elevation: zt(Yi, (e) => {
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
const Vf = La;
function zf(e) {
  return qe("MuiPopover", e);
}
it("MuiPopover", ["root", "paper"]);
const Uf = ["onEntering"], Hf = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Wf = ["slotProps"];
function gi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function bi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function vi(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function $n(e) {
  return typeof e == "function" ? e() : e;
}
const qf = (e) => {
  const {
    classes: t
  } = e;
  return et({
    root: ["root"],
    paper: ["paper"]
  }, zf, t);
}, Gf = Ee(Df, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Fa = Ee(Vf, {
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
}), Va = /* @__PURE__ */ E.forwardRef(function(t, n) {
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
    anchorPosition: d,
    anchorReference: f = "anchorEl",
    children: p,
    className: b,
    container: v,
    elevation: g = 8,
    marginThreshold: h = 16,
    open: x,
    PaperProps: R = {},
    slots: y,
    slotProps: w,
    transformOrigin: m = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: S = $r,
    transitionDuration: P = "auto",
    TransitionProps: {
      onEntering: B
    } = {},
    disableScrollLock: j = !1
  } = s, L = ce(s.TransitionProps, Uf), V = ce(s, Hf), C = (r = w == null ? void 0 : w.paper) != null ? r : R, $ = E.useRef(), _ = Le($, C.ref), D = k({}, s, {
    anchorOrigin: u,
    anchorReference: f,
    elevation: g,
    marginThreshold: h,
    externalPaperSlotProps: C,
    transformOrigin: m,
    TransitionComponent: S,
    transitionDuration: P,
    TransitionProps: L
  }), M = qf(D), F = E.useCallback(() => {
    if (f === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const J = $n(c), N = J && J.nodeType === 1 ? J : xe($.current).body, re = N.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ve = N.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ve.top === 0 && ve.left === 0 && ve.right === 0 && ve.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: re.top + gi(re, u.vertical),
      left: re.left + bi(re, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, d, f]), Q = E.useCallback((J) => ({
    vertical: gi(J, m.vertical),
    horizontal: bi(J, m.horizontal)
  }), [m.horizontal, m.vertical]), Z = E.useCallback((J) => {
    const N = {
      width: J.offsetWidth,
      height: J.offsetHeight
    }, re = Q(N);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: vi(re)
      };
    const ve = F();
    let Te = ve.top - re.vertical, me = ve.left - re.horizontal;
    const lt = Te + N.height, ke = me + N.width, Ge = At($n(c)), Ne = Ge.innerHeight - h, Ke = Ge.innerWidth - h;
    if (h !== null && Te < h) {
      const ye = Te - h;
      Te -= ye, re.vertical += ye;
    } else if (h !== null && lt > Ne) {
      const ye = lt - Ne;
      Te -= ye, re.vertical += ye;
    }
    if (process.env.NODE_ENV !== "production" && N.height > Ne && N.height && Ne && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${N.height - Ne}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), h !== null && me < h) {
      const ye = me - h;
      me -= ye, re.horizontal += ye;
    } else if (ke > Ke) {
      const ye = ke - Ke;
      me -= ye, re.horizontal += ye;
    }
    return {
      top: `${Math.round(Te)}px`,
      left: `${Math.round(me)}px`,
      transformOrigin: vi(re)
    };
  }, [c, f, F, Q, h]), [O, A] = E.useState(x), U = E.useCallback(() => {
    const J = $.current;
    if (!J)
      return;
    const N = Z(J);
    N.top !== null && (J.style.top = N.top), N.left !== null && (J.style.left = N.left), J.style.transformOrigin = N.transformOrigin, A(!0);
  }, [Z]);
  E.useEffect(() => (j && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, j, U]);
  const K = (J, N) => {
    B && B(J, N), U();
  }, z = () => {
    A(!1);
  };
  E.useEffect(() => {
    x && U();
  }), E.useImperativeHandle(l, () => x ? {
    updatePosition: () => {
      U();
    }
  } : null, [x, U]), E.useEffect(() => {
    if (!x)
      return;
    const J = Ui(() => {
      U();
    }), N = At(c);
    return N.addEventListener("resize", J), () => {
      J.clear(), N.removeEventListener("resize", J);
    };
  }, [c, x, U]);
  let H = P;
  P === "auto" && !S.muiSupportAuto && (H = void 0);
  const q = v || (c ? xe($n(c)).body : void 0), G = (o = y == null ? void 0 : y.root) != null ? o : Gf, W = (i = y == null ? void 0 : y.paper) != null ? i : Fa, X = gt({
    elementType: W,
    externalSlotProps: k({}, C, {
      style: O ? C.style : k({}, C.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: g,
      ref: _
    },
    ownerState: D,
    className: we(M.paper, C == null ? void 0 : C.className)
  }), Y = gt({
    elementType: G,
    externalSlotProps: (w == null ? void 0 : w.root) || {},
    externalForwardedProps: V,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: q,
      open: x
    },
    ownerState: D,
    className: we(M.root, b)
  }), {
    slotProps: ne
  } = Y, I = ce(Y, Wf);
  return /* @__PURE__ */ T(G, k({}, I, !ea(G) && {
    slotProps: ne,
    disableScrollLock: j
  }, {
    children: /* @__PURE__ */ T(S, k({
      appear: !0,
      in: x,
      onEntering: K,
      onExited: z,
      timeout: H
    }, L, {
      children: /* @__PURE__ */ T(W, k({}, X, {
        children: p
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Va.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Br,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: zt(a.oneOfType([Je, a.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = $n(e.anchorEl);
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
  elevation: Yi,
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
    component: El
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
const Kf = Va;
function Xf(e) {
  return qe("MuiMenu", e);
}
it("MuiMenu", ["root", "paper", "list"]);
const Yf = ["onEntering"], Jf = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Zf = {
  vertical: "top",
  horizontal: "right"
}, Qf = {
  vertical: "top",
  horizontal: "left"
}, eh = (e) => {
  const {
    classes: t
  } = e;
  return et({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Xf, t);
}, th = Ee(Kf, {
  shouldForwardProp: (e) => wa(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), nh = Ee(Fa, {
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
}), rh = Ee(Ef, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), za = /* @__PURE__ */ E.forwardRef(function(t, n) {
  var r, o;
  const i = tt({
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
    PaperProps: b = {},
    PopoverClasses: v,
    transitionDuration: g = "auto",
    TransitionProps: {
      onEntering: h
    } = {},
    variant: x = "selectedMenu",
    slots: R = {},
    slotProps: y = {}
  } = i, w = ce(i.TransitionProps, Yf), m = ce(i, Jf), S = vn(), P = S.direction === "rtl", B = k({}, i, {
    autoFocus: s,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: h,
    PaperProps: b,
    transitionDuration: g,
    TransitionProps: w,
    variant: x
  }), j = eh(B), L = s && !u && p, V = E.useRef(null), C = (Z, O) => {
    V.current && V.current.adjustStyleForScrollbar(Z, S), h && h(Z, O);
  }, $ = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), f && f(Z, "tabKeyDown"));
  };
  let _ = -1;
  E.Children.map(l, (Z, O) => {
    /* @__PURE__ */ E.isValidElement(Z) && (process.env.NODE_ENV !== "production" && Mn.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (x === "selectedMenu" && Z.props.selected || _ === -1) && (_ = O));
  });
  const D = (r = R.paper) != null ? r : nh, M = (o = y.paper) != null ? o : b, F = gt({
    elementType: R.root,
    externalSlotProps: y.root,
    ownerState: B,
    className: [j.root, c]
  }), Q = gt({
    elementType: D,
    externalSlotProps: M,
    ownerState: B,
    className: j.paper
  });
  return /* @__PURE__ */ T(th, k({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: P ? "right" : "left"
    },
    transformOrigin: P ? Zf : Qf,
    slots: {
      paper: D,
      root: R.root
    },
    slotProps: {
      root: F,
      paper: Q
    },
    open: p,
    ref: n,
    transitionDuration: g,
    TransitionProps: k({
      onEntering: C
    }, w),
    ownerState: B
  }, m, {
    classes: v,
    children: /* @__PURE__ */ T(rh, k({
      onKeyDown: $,
      actions: V,
      autoFocus: s && (_ === -1 || u),
      autoFocusItem: L,
      variant: x
    }, d, {
      className: we(j.list, d.className),
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
const oh = za;
function Th({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = Rt.useState(void 0), s = Se(
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
  ), l = Se(() => {
    i(void 0);
  }, []), c = Ft(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = n == null ? void 0 : n.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ de(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ T(
          oh,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ T(
              ro,
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
const ih = Pa(/* @__PURE__ */ T("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function ah(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Mr = (e, t, n = {}) => {
  const r = $t(t);
  r.current = t;
  const o = $t(n);
  o.current = ah(o.current);
  const [i, s] = Me(() => r.current), [l, c] = Me(!0);
  return It(() => {
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
};
function sh({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, u] = Me(!1), [d, f] = Me(!1), p = Se(() => {
    c && u(!1), f(!1);
  }, [c]), b = Se((w) => {
    w.stopPropagation(), u((m) => {
      const S = !m;
      return S && w.shiftKey ? f(!0) : S || f(!1), S;
    });
  }, []), v = Se(
    (w) => (p(), r(w)),
    [r, p]
  ), [g, h] = Me({ top: 1, left: 1 });
  It(() => {
    if (c) {
      const w = o == null ? void 0 : o.current;
      if (w) {
        const m = w.getBoundingClientRect(), S = window.scrollY, P = window.scrollX, B = m.top + S + w.clientHeight, j = m.left + P;
        h({ top: B, left: j });
      }
    }
  }, [c, o]);
  const [x] = Mr(
    Se(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [R] = Mr(
    Se(async () => (e == null ? void 0 : e(!0)) ?? n ?? x, [e, n, x, c]),
    n ?? x
  ), y = d && R ? R : x;
  return /* @__PURE__ */ de(Vn, { children: [
    /* @__PURE__ */ T(
      Oi,
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
        children: l ?? /* @__PURE__ */ T(ih, {})
      }
    ),
    /* @__PURE__ */ T(
      Ts,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: p,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: g.top,
            left: g.left
          }
        },
        children: y ? /* @__PURE__ */ T(
          hf,
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
function kh({
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
    Oi,
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
function Fn({
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
  onFocus: b,
  onBlur: v
}) {
  return /* @__PURE__ */ T(
    Ei,
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
      onFocus: b,
      onBlur: v
    }
  );
}
let br;
const vr = () => (br || (br = ue.allBookIds.map((e) => ({
  bookId: e,
  label: ue.bookIdToEnglishName(e)
}))), br);
function Oh({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c, u) => {
    const f = { bookNum: ue.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(f);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, s = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = Ft(() => vr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ de("span", { id: n, children: [
    /* @__PURE__ */ T(
      wr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: vr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ T(
      wt,
      {
        onClick: () => r(yo(e, -1)),
        isDisabled: e.bookNum <= rs,
        children: "<"
      }
    ),
    /* @__PURE__ */ T(
      wt,
      {
        onClick: () => r(yo(e, 1)),
        isDisabled: e.bookNum >= vr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ T(
      Fn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ T(
      wt,
      {
        onClick: () => t(wo(e, -1)),
        isDisabled: e.chapterNum <= os,
        children: "<"
      }
    ),
    /* @__PURE__ */ T(
      wt,
      {
        onClick: () => t(wo(e, 1)),
        isDisabled: e.chapterNum >= xi(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ T(
      Fn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ T(
      wt,
      {
        onClick: () => t(xo(e, -1)),
        isDisabled: e.verseNum <= is,
        children: "<"
      }
    ),
    /* @__PURE__ */ T(wt, { onClick: () => t(xo(e, 1)), children: ">" })
  ] });
}
function Sh({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = Me(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ T(ks, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ T(
    Fn,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  ) });
}
function Ch({
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
    Os,
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
function Ph({
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
    Ss,
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
function Nh({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ T(
    Cs,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function yi({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ T(Fn, { defaultValue: t[n.key], onChange: r });
}
const lh = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ T(
  sl,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Rh({
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
  rowHeight: b = 35,
  headerRowHeight: v = 35,
  selectedRows: g,
  onSelectedRowsChange: h,
  onRowsChange: x,
  onCellClick: R,
  onCellDoubleClick: y,
  onCellContextMenu: w,
  onCellKeyDown: m,
  direction: S = "ltr",
  enableVirtualization: P = !0,
  onCopy: B,
  onPaste: j,
  onScroll: L,
  className: V,
  "data-testid": C
}) {
  const $ = Ft(() => {
    const _ = e.map((D) => typeof D.editable == "function" ? {
      ...D,
      editable: (F) => !!D.editable(F),
      renderEditCell: D.renderEditCell || yi
    } : D.editable && !D.renderEditCell ? { ...D, renderEditCell: yi } : D.renderEditCell && !D.editable ? { ...D, editable: !1 } : D);
    return d ? [{ ...As, minWidth: f }, ..._] : _;
  }, [e, d, f]);
  return /* @__PURE__ */ T(
    _s,
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
      rows: u,
      rowKeyGetter: p,
      rowHeight: b,
      headerRowHeight: v,
      selectedRows: g,
      onSelectedRowsChange: h,
      onRowsChange: x,
      onCellClick: R,
      onCellDoubleClick: y,
      onCellContextMenu: w,
      onCellKeyDown: m,
      direction: S,
      enableVirtualization: P,
      onCopy: B,
      onPaste: j,
      onScroll: L,
      renderers: { renderCheckbox: lh },
      className: `papi-table ${V ?? "rdg-light"}`,
      "data-testid": C
    }
  );
}
function $h({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = $t(void 0);
  return /* @__PURE__ */ T("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ T(Ps, { position: "static", id: r, children: /* @__PURE__ */ de(Ns, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ T(
      sh,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ T("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Mh = (e, t) => {
  It(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, yr = () => !1, Ih = (e, t) => {
  const [n] = Mr(
    Se(async () => {
      if (!e)
        return yr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    yr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  It(() => () => {
    n !== yr && n();
  }, [n]);
};
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
.pr-text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
  xh as BookChapterControl,
  wt as Button,
  Eh as ChapterRangeSelector,
  sl as Checkbox,
  wr as ComboBox,
  Th as ContextMenu,
  hf as GridMenu,
  sh as HamburgerMenuButton,
  kh as IconButton,
  Pt as LabelPosition,
  Ra as MenuItem,
  Oh as RefSelector,
  Sh as SearchBar,
  Ch as Slider,
  Ph as Snackbar,
  Nh as Switch,
  Rh as Table,
  Fn as TextField,
  $h as Toolbar,
  Mh as useEvent,
  Ih as useEventAsync,
  Mr as usePromise
};
//# sourceMappingURL=index.js.map
