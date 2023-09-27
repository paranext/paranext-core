import { jsx as E, jsxs as Ie, Fragment as jn } from "react/jsx-runtime";
import { Button as zn, Autocomplete as Vn, TextField as dn, FormControlLabel as Rr, FormLabel as Ln, Checkbox as Fn, MenuItem as Hn, Grid as fn, Slider as Un, Snackbar as Jn, Switch as Gn, AppBar as Kn, Toolbar as qn, IconButton as Wn, Drawer as Xn } from "@mui/material";
import * as Le from "react";
import { useMemo as pn, useState as tr, useCallback as or, useRef as Yn, useEffect as Zn } from "react";
import Qn, { SelectColumn as et } from "react-data-grid";
import rt, { ThemeContext as nt, internal_processStyles as tt } from "@mui/styled-engine";
function Ee({
  id: e,
  isDisabled: r = !1,
  className: n,
  onClick: t,
  onContextMenu: o,
  children: a
}) {
  return /* @__PURE__ */ E(
    zn,
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
function hr({
  id: e,
  title: r,
  isDisabled: n = !1,
  isClearable: t = !0,
  hasError: o = !1,
  isFullWidth: a = !1,
  width: s,
  options: l = [],
  className: i,
  value: c,
  onChange: d,
  onFocus: p,
  onBlur: u
}) {
  return /* @__PURE__ */ E(
    Vn,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !t,
      fullWidth: a,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${i ?? ""}`,
      value: c,
      onChange: d,
      onFocus: p,
      onBlur: u,
      renderInput: (y) => /* @__PURE__ */ E(
        dn,
        {
          ...y,
          error: o,
          fullWidth: a,
          disabled: n,
          label: r,
          style: { width: s }
        }
      )
    }
  );
}
function os({
  startChapter: e,
  endChapter: r,
  onChangeStartChapter: n,
  onChangeEndChapter: t,
  isDisabled: o,
  chapterCount: a
}) {
  let s;
  const l = Array.from({ length: a }, (p, u) => u + 1), i = () => (s || (s = l.map((p) => ({
    chapterNum: p,
    label: p.toString()
  }))), s), c = i()[e - 1], d = i()[r - 1];
  return /* @__PURE__ */ Ie(jn, { children: [
    /* @__PURE__ */ E(
      Rr,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ E(
          hr,
          {
            onChange: n,
            className: "book-selection-chapter",
            isClearable: !1,
            options: i(),
            value: c,
            isDisabled: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ E(
      Rr,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ E(
          hr,
          {
            onChange: t,
            className: "book-selection-chapter",
            isClearable: !1,
            options: i(),
            value: d,
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
var $e = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))($e || {});
function ot({
  id: e,
  isChecked: r,
  labelText: n = "",
  labelPosition: t = $e.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: s = !1,
  hasError: l = !1,
  className: i,
  onChange: c
}) {
  const d = /* @__PURE__ */ E(
    Fn,
    {
      id: e,
      checked: r,
      indeterminate: o,
      defaultChecked: a,
      disabled: s,
      className: `papi-checkbox ${l ? "error" : ""} ${i ?? ""}`,
      onChange: c
    }
  );
  let p;
  if (n) {
    const u = t === $e.Before || t === $e.Above, y = /* @__PURE__ */ E("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${i ?? ""}`, children: n }), v = t === $e.Before || t === $e.After, h = v ? y : /* @__PURE__ */ E("div", { children: y }), f = v ? d : /* @__PURE__ */ E("div", { children: d });
    p = /* @__PURE__ */ Ie(
      Ln,
      {
        className: `papi-checkbox ${t.toString()}`,
        disabled: s,
        error: l,
        children: [
          u && h,
          f,
          !u && h
        ]
      }
    );
  } else
    p = d;
  return p;
}
function at(e) {
  const {
    onClick: r,
    name: n,
    hasAutoFocus: t = !1,
    className: o,
    isDense: a = !0,
    hasDisabledGutters: s = !1,
    hasDivider: l = !1,
    focusVisibleClassName: i,
    id: c,
    children: d
  } = e;
  return /* @__PURE__ */ E(
    Hn,
    {
      autoFocus: t,
      className: o,
      dense: a,
      disableGutters: s,
      divider: l,
      focusVisibleClassName: i,
      onClick: r,
      id: c,
      children: n || d
    }
  );
}
function st({ commandHandler: e, name: r, className: n, items: t, id: o }) {
  return /* @__PURE__ */ Ie(fn, { id: o, item: !0, xs: "auto", className: `papi-menu-column ${n ?? ""}`, children: [
    /* @__PURE__ */ E("h3", { className: `papi-menu ${n ?? ""}`, children: r }),
    t.map((a, s) => /* @__PURE__ */ E(
      at,
      {
        className: `papi-menu-item ${a.className}`,
        onClick: () => {
          e(a);
        },
        ...a
      },
      s
    ))
  ] });
}
function it({ commandHandler: e, className: r, columns: n, id: t }) {
  return /* @__PURE__ */ E(
    fn,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${r ?? ""}`,
      columns: n.length,
      id: t,
      children: n.map((o, a) => /* @__PURE__ */ E(
        st,
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
var ct = Object.defineProperty, lt = (e, r, n) => r in e ? ct(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[r] = n, $ = (e, r, n) => (lt(e, typeof r != "symbol" ? r + "" : r, n), n);
const ke = [
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
], yr = [
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
], hn = [
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
], Ar = vt();
function Be(e, r = !0) {
  return r && (e = e.toUpperCase()), e in Ar ? Ar[e] : 0;
}
function vr(e) {
  return Be(e) > 0;
}
function ut(e) {
  const r = typeof e == "string" ? Be(e) : e;
  return r >= 40 && r <= 66;
}
function dt(e) {
  return (typeof e == "string" ? Be(e) : e) <= 39;
}
function mn(e) {
  return e <= 66;
}
function ft(e) {
  const r = typeof e == "string" ? Be(e) : e;
  return yn(r) && !mn(r);
}
function* pt() {
  for (let e = 1; e <= ke.length; e++)
    yield e;
}
const ht = 1, gn = ke.length;
function mt() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function xr(e, r = "***") {
  const n = e - 1;
  return n < 0 || n >= ke.length ? r : ke[n];
}
function bn(e) {
  return e <= 0 || e > gn ? "******" : hn[e - 1];
}
function gt(e) {
  return bn(Be(e));
}
function yn(e) {
  const r = typeof e == "number" ? xr(e) : e;
  return vr(r) && !yr.includes(r);
}
function bt(e) {
  const r = typeof e == "number" ? xr(e) : e;
  return vr(r) && yr.includes(r);
}
function yt(e) {
  return hn[e - 1].includes("*obsolete*");
}
function vt() {
  const e = {};
  for (let r = 0; r < ke.length; r++)
    e[ke[r]] = r + 1;
  return e;
}
const pe = {
  allBookIds: ke,
  nonCanonicalIds: yr,
  bookIdToNumber: Be,
  isBookIdValid: vr,
  isBookNT: ut,
  isBookOT: dt,
  isBookOTNT: mn,
  isBookDC: ft,
  allBookNumbers: pt,
  firstBook: ht,
  lastBook: gn,
  extraBooks: mt,
  bookNumberToId: xr,
  bookNumberToEnglishName: bn,
  bookIdToEnglishName: gt,
  isCanonical: yn,
  isExtraMaterial: bt,
  isObsolete: yt
};
var be = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(be || {});
const xe = class {
  // private versInfo: Versification;
  constructor(e) {
    if ($(this, "name"), $(this, "fullPath"), $(this, "isPresent"), $(this, "hasVerseSegments"), $(this, "isCustomized"), $(this, "baseVersification"), $(this, "scriptureBooks"), $(this, "_type"), e != null)
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
let oe = xe;
$(oe, "Original", new xe(be.Original)), $(oe, "Septuagint", new xe(be.Septuagint)), $(oe, "Vulgate", new xe(be.Vulgate)), $(oe, "English", new xe(be.English)), $(oe, "RussianProtestant", new xe(be.RussianProtestant)), $(oe, "RussianOrthodox", new xe(be.RussianOrthodox));
function Pr(e, r) {
  const n = r[0];
  for (let t = 1; t < r.length; t++)
    e = e.split(r[t]).join(n);
  return e.split(n);
}
var vn = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(vn || {});
const _ = class {
  constructor(r, n, t, o) {
    if ($(this, "firstChapter"), $(this, "lastChapter"), $(this, "lastVerse"), $(this, "hasSegmentsDefined"), $(this, "text"), $(this, "BBBCCCVVVS"), $(this, "longHashCode"), $(this, "versification"), $(this, "rtlMark", "‏"), $(this, "_bookNum", 0), $(this, "_chapterNum", 0), $(this, "_verseNum", 0), $(this, "_verse"), t == null && o == null)
      if (r != null && typeof r == "string") {
        const a = r, s = n != null && n instanceof oe ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (r != null && typeof r == "number") {
        const a = n != null && n instanceof oe ? n : void 0;
        this.setEmpty(a), this._verseNum = r % _.chapterDigitShifter, this._chapterNum = Math.floor(
          r % _.bookDigitShifter / _.chapterDigitShifter
        ), this._bookNum = Math.floor(r / _.bookDigitShifter);
      } else if (n == null)
        if (r != null && r instanceof _) {
          const a = r;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (r == null)
            return;
          const a = r instanceof oe ? r : _.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (r != null && n != null && t != null)
      if (typeof r == "string" && typeof n == "string" && typeof t == "string")
        this.setEmpty(o), this.updateInternal(r, n, t);
      else if (typeof r == "number" && typeof n == "number" && typeof t == "number")
        this._bookNum = r, this._chapterNum = n, this._verseNum = t, this.versification = o ?? _.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(r, n = _.defaultVersification) {
    const t = new _(n);
    return t.parse(r), t;
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(r) {
    return r.length > 0 && "0123456789".includes(r[0]) && !r.endsWith(this.verseRangeSeparator) && !r.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(r) {
    let n;
    try {
      return n = _.parse(r), { success: !0, verseRef: n };
    } catch (t) {
      if (t instanceof De)
        return n = new _(), { success: !1, verseRef: n };
      throw t;
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
  static getBBBCCCVVV(r, n, t) {
    return r % _.bcvMaxValue * _.bookDigitShifter + (n >= 0 ? n % _.bcvMaxValue * _.chapterDigitShifter : 0) + (t >= 0 ? t % _.bcvMaxValue : 0);
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(r) {
    let n;
    if (!r)
      return n = -1, { success: !0, vNum: n };
    n = 0;
    let t;
    for (let o = 0; o < r.length; o++) {
      if (t = r[o], t < "0" || t > "9")
        return o === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +t - +"0", n > _.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(_.verseRangeSeparator) || this._verse.includes(_.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return pe.bookNumberToId(this.bookNum, "");
  }
  set book(r) {
    this.bookNum = pe.bookIdToNumber(r);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(r) {
    const n = +r;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(r) {
    const { success: n, vNum: t } = _.tryGetVerseNum(r);
    this._verse = n ? void 0 : r.replace(this.rtlMark, ""), this._verseNum = t, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = _.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(r) {
    if (r <= 0 || r > pe.lastBook)
      throw new De(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = r;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(r) {
    this.chapterNum = r;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(r) {
    this._verseNum = r;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var r;
    return (r = this.versification) == null ? void 0 : r.name;
  }
  set versificationStr(r) {
    this.versification = this.versification != null ? new oe(r) : void 0;
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
    return this.validateVerse(_.verseRangeSeparators, _.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return _.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return _.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
  parse(r) {
    if (r = r.replace(this.rtlMark, ""), r.includes("/")) {
      const a = r.split("/");
      if (r = a[0], a.length > 1)
        try {
          const s = +a[1].trim();
          this.versification = new oe(be[s]);
        } catch {
          throw new De("Invalid reference : " + r);
        }
    }
    const n = r.trim().split(" ");
    if (n.length !== 2)
      throw new De("Invalid reference : " + r);
    const t = n[1].split(":"), o = +t[0];
    if (t.length !== 2 || pe.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !_.isVerseParseable(t[1]))
      throw new De("Invalid reference : " + r);
    this.updateInternal(n[0], t[0], t[1]);
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
    return new _(this);
  }
  toString() {
    const r = this.book;
    return r === "" ? "" : `${r} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - `VerseRef` to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(r) {
    return r._bookNum === this._bookNum && r._chapterNum === this._chapterNum && r._verseNum === this._verseNum && r._verse === this._verse && r.versification != null && this.versification != null && r.versification.equals(this.versification);
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
  allVerses(r = !1, n = _.verseRangeSeparators, t = _.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = Pr(this._verse, t);
    for (const s of a.map((l) => Pr(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const i = l.verseNum;
      if (o.push(l), s.length > 1) {
        const c = this.clone();
        if (c.verse = s[1], !r)
          for (let d = i + 1; d < c.verseNum; d++) {
            const p = new _(
              this._bookNum,
              this._chapterNum,
              d,
              this.versification
            );
            this.isExcluded || o.push(p);
          }
        o.push(c);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(r, n) {
    if (!this.verse)
      return this.internalValid;
    let t = 0;
    for (const o of this.allVerses(!0, r, n)) {
      const a = o.internalValid;
      if (a !== 0)
        return a;
      const s = o.BBBCCCVVV;
      if (t > s)
        return 3;
      if (t === s)
        return 4;
      t = s;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > pe.lastBook ? 2 : 0;
  }
  setEmpty(r = _.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = r;
  }
  updateInternal(r, n, t) {
    this.bookNum = pe.bookIdToNumber(r), this.chapter = n, this.verse = t;
  }
};
let fe = _;
$(fe, "defaultVersification", oe.English), $(fe, "verseRangeSeparator", "-"), $(fe, "verseSequenceIndicator", ","), $(fe, "verseRangeSeparators", [_.verseRangeSeparator]), $(fe, "verseSequenceIndicators", [_.verseSequenceIndicator]), $(fe, "chapterDigitShifter", 1e3), $(fe, "bookDigitShifter", _.chapterDigitShifter * _.chapterDigitShifter), $(fe, "bcvMaxValue", _.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
$(fe, "ValidStatusType", vn);
class De extends Error {
}
const xn = [
  { shortName: "ERR", fullNames: ["ERROR"], chapters: -1 },
  { shortName: "GEN", fullNames: ["Genesis"], chapters: 50 },
  { shortName: "EXO", fullNames: ["Exodus"], chapters: 40 },
  { shortName: "LEV", fullNames: ["Leviticus"], chapters: 27 },
  { shortName: "NUM", fullNames: ["Numbers"], chapters: 36 },
  { shortName: "DEU", fullNames: ["Deuteronomy"], chapters: 34 },
  { shortName: "JOS", fullNames: ["Joshua"], chapters: 24 },
  { shortName: "JDG", fullNames: ["Judges"], chapters: 21 },
  { shortName: "RUT", fullNames: ["Ruth"], chapters: 4 },
  { shortName: "1SA", fullNames: ["1 Samuel"], chapters: 31 },
  { shortName: "2SA", fullNames: ["2 Samuel"], chapters: 24 },
  { shortName: "1KI", fullNames: ["1 Kings"], chapters: 22 },
  { shortName: "2KI", fullNames: ["2 Kings"], chapters: 25 },
  { shortName: "1CH", fullNames: ["1 Chronicles"], chapters: 29 },
  { shortName: "2CH", fullNames: ["2 Chronicles"], chapters: 36 },
  { shortName: "EZR", fullNames: ["Ezra"], chapters: 10 },
  { shortName: "NEH", fullNames: ["Nehemiah"], chapters: 13 },
  { shortName: "EST", fullNames: ["Esther"], chapters: 10 },
  { shortName: "JOB", fullNames: ["Job"], chapters: 42 },
  { shortName: "PSA", fullNames: ["Psalm", "Psalms"], chapters: 150 },
  { shortName: "PRO", fullNames: ["Proverbs"], chapters: 31 },
  { shortName: "ECC", fullNames: ["Ecclesiastes"], chapters: 12 },
  { shortName: "SNG", fullNames: ["Song of Solomon", "Song of Songs"], chapters: 8 },
  { shortName: "ISA", fullNames: ["Isaiah"], chapters: 66 },
  { shortName: "JER", fullNames: ["Jeremiah"], chapters: 52 },
  { shortName: "LAM", fullNames: ["Lamentations"], chapters: 5 },
  { shortName: "EZK", fullNames: ["Ezekiel"], chapters: 48 },
  { shortName: "DAN", fullNames: ["Daniel"], chapters: 12 },
  { shortName: "HOS", fullNames: ["Hosea"], chapters: 14 },
  { shortName: "JOL", fullNames: ["Joel"], chapters: 3 },
  { shortName: "AMO", fullNames: ["Amos"], chapters: 9 },
  { shortName: "OBA", fullNames: ["Obadiah"], chapters: 1 },
  { shortName: "JON", fullNames: ["Jonah"], chapters: 4 },
  { shortName: "MIC", fullNames: ["Micah"], chapters: 7 },
  { shortName: "NAM", fullNames: ["Nahum"], chapters: 3 },
  { shortName: "HAB", fullNames: ["Habakkuk"], chapters: 3 },
  { shortName: "ZEP", fullNames: ["Zephaniah"], chapters: 3 },
  { shortName: "HAG", fullNames: ["Haggai"], chapters: 2 },
  { shortName: "ZEC", fullNames: ["Zechariah"], chapters: 14 },
  { shortName: "MAL", fullNames: ["Malachi"], chapters: 4 },
  { shortName: "MAT", fullNames: ["Matthew"], chapters: 28 },
  { shortName: "MRK", fullNames: ["Mark"], chapters: 16 },
  { shortName: "LUK", fullNames: ["Luke"], chapters: 24 },
  { shortName: "JHN", fullNames: ["John"], chapters: 21 },
  { shortName: "ACT", fullNames: ["Acts"], chapters: 28 },
  { shortName: "ROM", fullNames: ["Romans"], chapters: 16 },
  { shortName: "1CO", fullNames: ["1 Corinthians"], chapters: 16 },
  { shortName: "2CO", fullNames: ["2 Corinthians"], chapters: 13 },
  { shortName: "GAL", fullNames: ["Galatians"], chapters: 6 },
  { shortName: "EPH", fullNames: ["Ephesians"], chapters: 6 },
  { shortName: "PHP", fullNames: ["Philippians"], chapters: 4 },
  { shortName: "COL", fullNames: ["Colossians"], chapters: 4 },
  { shortName: "1TH", fullNames: ["1 Thessalonians"], chapters: 5 },
  { shortName: "2TH", fullNames: ["2 Thessalonians"], chapters: 3 },
  { shortName: "1TI", fullNames: ["1 Timothy"], chapters: 6 },
  { shortName: "2TI", fullNames: ["2 Timothy"], chapters: 4 },
  { shortName: "TIT", fullNames: ["Titus"], chapters: 3 },
  { shortName: "PHM", fullNames: ["Philemon"], chapters: 1 },
  { shortName: "HEB", fullNames: ["Hebrews"], chapters: 13 },
  { shortName: "JAS", fullNames: ["James"], chapters: 5 },
  { shortName: "1PE", fullNames: ["1 Peter"], chapters: 5 },
  { shortName: "2PE", fullNames: ["2 Peter"], chapters: 3 },
  { shortName: "1JN", fullNames: ["1 John"], chapters: 5 },
  { shortName: "2JN", fullNames: ["2 John"], chapters: 1 },
  { shortName: "3JN", fullNames: ["3 John"], chapters: 1 },
  { shortName: "JUD", fullNames: ["Jude"], chapters: 1 },
  { shortName: "REV", fullNames: ["Revelation"], chapters: 22 }
];
let ar;
const sr = () => (ar || (ar = pe.allBookIds.map((e) => ({
  bookId: e,
  label: pe.bookIdToEnglishName(e)
}))), ar), kn = 1, xt = xn.length - 1, Sn = 1, Nn = 1, En = (e) => {
  var r;
  return ((r = xn[e]) == null ? void 0 : r.chapters) ?? -1;
}, Mr = (e, r) => ({
  bookNum: Math.max(kn, Math.min(e.bookNum + r, xt)),
  chapterNum: 1,
  verseNum: 1
}), Ir = (e, r) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(Sn, e.chapterNum + r),
    En(e.bookNum)
  ),
  verseNum: 1
}), Br = (e, r) => ({
  ...e,
  verseNum: Math.max(Nn, e.verseNum + r)
});
function mr({
  variant: e = "outlined",
  id: r,
  isDisabled: n = !1,
  hasError: t = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: l,
  isRequired: i = !1,
  className: c,
  defaultValue: d,
  value: p,
  onChange: u,
  onFocus: y,
  onBlur: v
}) {
  return /* @__PURE__ */ E(
    dn,
    {
      variant: e,
      id: r,
      disabled: n,
      error: t,
      fullWidth: o,
      helperText: a,
      label: s,
      placeholder: l,
      required: i,
      className: `papi-textfield ${c ?? ""}`,
      defaultValue: d,
      value: p,
      onChange: u,
      onFocus: y,
      onBlur: v
    }
  );
}
function ss({ scrRef: e, handleSubmit: r, id: n }) {
  const t = (i) => {
    r(i);
  }, o = (i, c) => {
    const p = { bookNum: pe.bookIdToNumber(c.bookId), chapterNum: 1, verseNum: 1 };
    t(p);
  }, a = (i) => {
    r({ ...e, chapterNum: +i.target.value });
  }, s = (i) => {
    r({ ...e, verseNum: +i.target.value });
  }, l = pn(() => sr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ Ie("span", { id: n, children: [
    /* @__PURE__ */ E(
      hr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: sr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ E(
      Ee,
      {
        onClick: () => t(Mr(e, -1)),
        isDisabled: e.bookNum <= kn,
        children: "<"
      }
    ),
    /* @__PURE__ */ E(
      Ee,
      {
        onClick: () => t(Mr(e, 1)),
        isDisabled: e.bookNum >= sr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ E(
      mr,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ E(
      Ee,
      {
        onClick: () => r(Ir(e, -1)),
        isDisabled: e.chapterNum <= Sn,
        children: "<"
      }
    ),
    /* @__PURE__ */ E(
      Ee,
      {
        onClick: () => r(Ir(e, 1)),
        isDisabled: e.chapterNum >= En(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ E(
      mr,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ E(
      Ee,
      {
        onClick: () => r(Br(e, -1)),
        isDisabled: e.verseNum <= Nn,
        children: "<"
      }
    ),
    /* @__PURE__ */ E(Ee, { onClick: () => r(Br(e, 1)), children: ">" })
  ] });
}
function is({
  id: e,
  isDisabled: r = !1,
  orientation: n = "horizontal",
  min: t = 0,
  max: o = 100,
  step: a = 1,
  showMarks: s = !1,
  defaultValue: l,
  value: i,
  valueLabelDisplay: c = "off",
  className: d,
  onChange: p,
  onChangeCommitted: u
}) {
  return /* @__PURE__ */ E(
    Un,
    {
      id: e,
      disabled: r,
      orientation: n,
      min: t,
      max: o,
      step: a,
      marks: s,
      defaultValue: l,
      value: i,
      valueLabelDisplay: c,
      className: `papi-slider ${n} ${d ?? ""}`,
      onChange: p,
      onChangeCommitted: u
    }
  );
}
function cs({
  autoHideDuration: e = null,
  id: r,
  isOpen: n = !1,
  className: t,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: l
}) {
  const i = {
    action: (s == null ? void 0 : s.action) || l,
    message: s == null ? void 0 : s.message,
    className: t
  };
  return /* @__PURE__ */ E(
    Jn,
    {
      autoHideDuration: e,
      open: n,
      onClose: o,
      anchorOrigin: a,
      id: r,
      ContentProps: i
    }
  );
}
function ls({
  id: e,
  isChecked: r,
  isDisabled: n = !1,
  hasError: t = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ E(
    Gn,
    {
      id: e,
      checked: r,
      disabled: n,
      className: `papi-switch ${t ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function Dr({ onRowChange: e, row: r, column: n }) {
  const t = (o) => {
    e({ ...r, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ E(mr, { defaultValue: r[n.key], onChange: t });
}
const kt = ({ onChange: e, disabled: r, checked: n, ...t }) => /* @__PURE__ */ E(
  ot,
  {
    ...t,
    isChecked: n,
    isDisabled: r,
    onChange: (a) => {
      e(a.target.checked, a.nativeEvent.shiftKey);
    }
  }
);
function us({
  columns: e,
  sortColumns: r,
  onSortColumnsChange: n,
  onColumnResize: t,
  defaultColumnWidth: o,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: i = !0,
  rows: c,
  enableSelectColumn: d,
  selectColumnWidth: p = 50,
  rowKeyGetter: u,
  rowHeight: y = 35,
  headerRowHeight: v = 35,
  selectedRows: h,
  onSelectedRowsChange: f,
  onRowsChange: S,
  onCellClick: W,
  onCellDoubleClick: B,
  onCellContextMenu: R,
  onCellKeyDown: m,
  direction: X = "ltr",
  enableVirtualization: ne = !0,
  onCopy: ie,
  onPaste: ae,
  onScroll: D,
  className: Y,
  id: ce
}) {
  const le = pn(() => {
    const Q = e.map((q) => typeof q.editable == "function" ? {
      ...q,
      editable: (se) => !!q.editable(se),
      renderEditCell: q.renderEditCell || Dr
    } : q.editable && !q.renderEditCell ? { ...q, renderEditCell: Dr } : q.renderEditCell && !q.editable ? { ...q, editable: !1 } : q);
    return d ? [{ ...et, minWidth: p }, ...Q] : Q;
  }, [e, d, p]);
  return /* @__PURE__ */ E(
    Qn,
    {
      columns: le,
      defaultColumnOptions: {
        width: o,
        minWidth: a,
        maxWidth: s,
        sortable: l,
        resizable: i
      },
      sortColumns: r,
      onSortColumnsChange: n,
      onColumnResize: t,
      rows: c,
      rowKeyGetter: u,
      rowHeight: y,
      headerRowHeight: v,
      selectedRows: h,
      onSelectedRowsChange: f,
      onRowsChange: S,
      onCellClick: W,
      onCellDoubleClick: B,
      onCellContextMenu: R,
      onCellKeyDown: m,
      direction: X,
      enableVirtualization: ne,
      onCopy: ie,
      onPaste: ae,
      onScroll: D,
      renderers: { renderCheckbox: kt },
      className: Y ?? "rdg-light",
      id: ce
    }
  );
}
function A() {
  return A = Object.assign ? Object.assign.bind() : function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var n = arguments[r];
      for (var t in n)
        Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
    }
    return e;
  }, A.apply(this, arguments);
}
function Re(e) {
  return e !== null && typeof e == "object" && e.constructor === Object;
}
function wn(e) {
  if (!Re(e))
    return e;
  const r = {};
  return Object.keys(e).forEach((n) => {
    r[n] = wn(e[n]);
  }), r;
}
function he(e, r, n = {
  clone: !0
}) {
  const t = n.clone ? A({}, e) : e;
  return Re(e) && Re(r) && Object.keys(r).forEach((o) => {
    o !== "__proto__" && (Re(r[o]) && o in e && Re(e[o]) ? t[o] = he(e[o], r[o], n) : n.clone ? t[o] = Re(r[o]) ? wn(r[o]) : r[o] : t[o] = r[o]);
  }), t;
}
function St(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var gr = { exports: {} }, Ge = { exports: {} }, z = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jr;
function Nt() {
  if (jr)
    return z;
  jr = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, i = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, u = e ? Symbol.for("react.suspense_list") : 60120, y = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, W = e ? Symbol.for("react.scope") : 60119;
  function B(m) {
    if (typeof m == "object" && m !== null) {
      var X = m.$$typeof;
      switch (X) {
        case r:
          switch (m = m.type, m) {
            case i:
            case c:
            case t:
            case a:
            case o:
            case p:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case d:
                case v:
                case y:
                case s:
                  return m;
                default:
                  return X;
              }
          }
        case n:
          return X;
      }
    }
  }
  function R(m) {
    return B(m) === c;
  }
  return z.AsyncMode = i, z.ConcurrentMode = c, z.ContextConsumer = l, z.ContextProvider = s, z.Element = r, z.ForwardRef = d, z.Fragment = t, z.Lazy = v, z.Memo = y, z.Portal = n, z.Profiler = a, z.StrictMode = o, z.Suspense = p, z.isAsyncMode = function(m) {
    return R(m) || B(m) === i;
  }, z.isConcurrentMode = R, z.isContextConsumer = function(m) {
    return B(m) === l;
  }, z.isContextProvider = function(m) {
    return B(m) === s;
  }, z.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === r;
  }, z.isForwardRef = function(m) {
    return B(m) === d;
  }, z.isFragment = function(m) {
    return B(m) === t;
  }, z.isLazy = function(m) {
    return B(m) === v;
  }, z.isMemo = function(m) {
    return B(m) === y;
  }, z.isPortal = function(m) {
    return B(m) === n;
  }, z.isProfiler = function(m) {
    return B(m) === a;
  }, z.isStrictMode = function(m) {
    return B(m) === o;
  }, z.isSuspense = function(m) {
    return B(m) === p;
  }, z.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === t || m === c || m === a || m === o || m === p || m === u || typeof m == "object" && m !== null && (m.$$typeof === v || m.$$typeof === y || m.$$typeof === s || m.$$typeof === l || m.$$typeof === d || m.$$typeof === f || m.$$typeof === S || m.$$typeof === W || m.$$typeof === h);
  }, z.typeOf = B, z;
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
var zr;
function Et() {
  return zr || (zr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, i = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, u = e ? Symbol.for("react.suspense_list") : 60120, y = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, W = e ? Symbol.for("react.scope") : 60119;
    function B(b) {
      return typeof b == "string" || typeof b == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      b === t || b === c || b === a || b === o || b === p || b === u || typeof b == "object" && b !== null && (b.$$typeof === v || b.$$typeof === y || b.$$typeof === s || b.$$typeof === l || b.$$typeof === d || b.$$typeof === f || b.$$typeof === S || b.$$typeof === W || b.$$typeof === h);
    }
    function R(b) {
      if (typeof b == "object" && b !== null) {
        var te = b.$$typeof;
        switch (te) {
          case r:
            var k = b.type;
            switch (k) {
              case i:
              case c:
              case t:
              case a:
              case o:
              case p:
                return k;
              default:
                var Ne = k && k.$$typeof;
                switch (Ne) {
                  case l:
                  case d:
                  case v:
                  case y:
                  case s:
                    return Ne;
                  default:
                    return te;
                }
            }
          case n:
            return te;
        }
      }
    }
    var m = i, X = c, ne = l, ie = s, ae = r, D = d, Y = t, ce = v, le = y, Q = n, q = a, ee = o, se = p, ve = !1;
    function Se(b) {
      return ve || (ve = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), g(b) || R(b) === i;
    }
    function g(b) {
      return R(b) === c;
    }
    function x(b) {
      return R(b) === l;
    }
    function O(b) {
      return R(b) === s;
    }
    function T(b) {
      return typeof b == "object" && b !== null && b.$$typeof === r;
    }
    function N(b) {
      return R(b) === d;
    }
    function P(b) {
      return R(b) === t;
    }
    function w(b) {
      return R(b) === v;
    }
    function C(b) {
      return R(b) === y;
    }
    function M(b) {
      return R(b) === n;
    }
    function j(b) {
      return R(b) === a;
    }
    function I(b) {
      return R(b) === o;
    }
    function Z(b) {
      return R(b) === p;
    }
    V.AsyncMode = m, V.ConcurrentMode = X, V.ContextConsumer = ne, V.ContextProvider = ie, V.Element = ae, V.ForwardRef = D, V.Fragment = Y, V.Lazy = ce, V.Memo = le, V.Portal = Q, V.Profiler = q, V.StrictMode = ee, V.Suspense = se, V.isAsyncMode = Se, V.isConcurrentMode = g, V.isContextConsumer = x, V.isContextProvider = O, V.isElement = T, V.isForwardRef = N, V.isFragment = P, V.isLazy = w, V.isMemo = C, V.isPortal = M, V.isProfiler = j, V.isStrictMode = I, V.isSuspense = Z, V.isValidElementType = B, V.typeOf = R;
  }()), V;
}
var Vr;
function Tn() {
  return Vr || (Vr = 1, process.env.NODE_ENV === "production" ? Ge.exports = Nt() : Ge.exports = Et()), Ge.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ir, Lr;
function wt() {
  if (Lr)
    return ir;
  Lr = 1;
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
      for (var s = {}, l = 0; l < 10; l++)
        s["_" + String.fromCharCode(l)] = l;
      var i = Object.getOwnPropertyNames(s).map(function(d) {
        return s[d];
      });
      if (i.join("") !== "0123456789")
        return !1;
      var c = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        c[d] = d;
      }), Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ir = o() ? Object.assign : function(a, s) {
    for (var l, i = t(a), c, d = 1; d < arguments.length; d++) {
      l = Object(arguments[d]);
      for (var p in l)
        r.call(l, p) && (i[p] = l[p]);
      if (e) {
        c = e(l);
        for (var u = 0; u < c.length; u++)
          n.call(l, c[u]) && (i[c[u]] = l[c[u]]);
      }
    }
    return i;
  }, ir;
}
var cr, Fr;
function kr() {
  if (Fr)
    return cr;
  Fr = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return cr = e, cr;
}
var lr, Hr;
function Cn() {
  return Hr || (Hr = 1, lr = Function.call.bind(Object.prototype.hasOwnProperty)), lr;
}
var ur, Ur;
function Tt() {
  if (Ur)
    return ur;
  Ur = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = kr(), n = {}, t = Cn();
    e = function(a) {
      var s = "Warning: " + a;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(a, s, l, i, c) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in a)
        if (t(a, d)) {
          var p;
          try {
            if (typeof a[d] != "function") {
              var u = Error(
                (i || "React class") + ": " + l + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw u.name = "Invariant Violation", u;
            }
            p = a[d](s, d, i, l, null, r);
          } catch (v) {
            p = v;
          }
          if (p && !(p instanceof Error) && e(
            (i || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in n)) {
            n[p.message] = !0;
            var y = c ? c() : "";
            e(
              "Failed " + l + " type: " + p.message + (y ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, ur = o, ur;
}
var dr, Jr;
function Ct() {
  if (Jr)
    return dr;
  Jr = 1;
  var e = Tn(), r = wt(), n = kr(), t = Cn(), o = Tt(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(l) {
    var i = "Warning: " + l;
    typeof console < "u" && console.error(i);
    try {
      throw new Error(i);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return dr = function(l, i) {
    var c = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function p(g) {
      var x = g && (c && g[c] || g[d]);
      if (typeof x == "function")
        return x;
    }
    var u = "<<anonymous>>", y = {
      array: S("array"),
      bigint: S("bigint"),
      bool: S("boolean"),
      func: S("function"),
      number: S("number"),
      object: S("object"),
      string: S("string"),
      symbol: S("symbol"),
      any: W(),
      arrayOf: B,
      element: R(),
      elementType: m(),
      instanceOf: X,
      node: D(),
      objectOf: ie,
      oneOf: ne,
      oneOfType: ae,
      shape: ce,
      exact: le
    };
    function v(g, x) {
      return g === x ? g !== 0 || 1 / g === 1 / x : g !== g && x !== x;
    }
    function h(g, x) {
      this.message = g, this.data = x && typeof x == "object" ? x : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function f(g) {
      if (process.env.NODE_ENV !== "production")
        var x = {}, O = 0;
      function T(P, w, C, M, j, I, Z) {
        if (M = M || u, I = I || C, Z !== n) {
          if (i) {
            var b = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw b.name = "Invariant Violation", b;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var te = M + ":" + C;
            !x[te] && // Avoid spamming the console because they are often not actionable except for lib authors
            O < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + I + "` prop on `" + M + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), x[te] = !0, O++);
          }
        }
        return w[C] == null ? P ? w[C] === null ? new h("The " + j + " `" + I + "` is marked as required " + ("in `" + M + "`, but its value is `null`.")) : new h("The " + j + " `" + I + "` is marked as required in " + ("`" + M + "`, but its value is `undefined`.")) : null : g(w, C, M, j, I);
      }
      var N = T.bind(null, !1);
      return N.isRequired = T.bind(null, !0), N;
    }
    function S(g) {
      function x(O, T, N, P, w, C) {
        var M = O[T], j = ee(M);
        if (j !== g) {
          var I = se(M);
          return new h(
            "Invalid " + P + " `" + w + "` of type " + ("`" + I + "` supplied to `" + N + "`, expected ") + ("`" + g + "`."),
            { expectedType: g }
          );
        }
        return null;
      }
      return f(x);
    }
    function W() {
      return f(s);
    }
    function B(g) {
      function x(O, T, N, P, w) {
        if (typeof g != "function")
          return new h("Property `" + w + "` of component `" + N + "` has invalid PropType notation inside arrayOf.");
        var C = O[T];
        if (!Array.isArray(C)) {
          var M = ee(C);
          return new h("Invalid " + P + " `" + w + "` of type " + ("`" + M + "` supplied to `" + N + "`, expected an array."));
        }
        for (var j = 0; j < C.length; j++) {
          var I = g(C, j, N, P, w + "[" + j + "]", n);
          if (I instanceof Error)
            return I;
        }
        return null;
      }
      return f(x);
    }
    function R() {
      function g(x, O, T, N, P) {
        var w = x[O];
        if (!l(w)) {
          var C = ee(w);
          return new h("Invalid " + N + " `" + P + "` of type " + ("`" + C + "` supplied to `" + T + "`, expected a single ReactElement."));
        }
        return null;
      }
      return f(g);
    }
    function m() {
      function g(x, O, T, N, P) {
        var w = x[O];
        if (!e.isValidElementType(w)) {
          var C = ee(w);
          return new h("Invalid " + N + " `" + P + "` of type " + ("`" + C + "` supplied to `" + T + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return f(g);
    }
    function X(g) {
      function x(O, T, N, P, w) {
        if (!(O[T] instanceof g)) {
          var C = g.name || u, M = Se(O[T]);
          return new h("Invalid " + P + " `" + w + "` of type " + ("`" + M + "` supplied to `" + N + "`, expected ") + ("instance of `" + C + "`."));
        }
        return null;
      }
      return f(x);
    }
    function ne(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function x(O, T, N, P, w) {
        for (var C = O[T], M = 0; M < g.length; M++)
          if (v(C, g[M]))
            return null;
        var j = JSON.stringify(g, function(Z, b) {
          var te = se(b);
          return te === "symbol" ? String(b) : b;
        });
        return new h("Invalid " + P + " `" + w + "` of value `" + String(C) + "` " + ("supplied to `" + N + "`, expected one of " + j + "."));
      }
      return f(x);
    }
    function ie(g) {
      function x(O, T, N, P, w) {
        if (typeof g != "function")
          return new h("Property `" + w + "` of component `" + N + "` has invalid PropType notation inside objectOf.");
        var C = O[T], M = ee(C);
        if (M !== "object")
          return new h("Invalid " + P + " `" + w + "` of type " + ("`" + M + "` supplied to `" + N + "`, expected an object."));
        for (var j in C)
          if (t(C, j)) {
            var I = g(C, j, N, P, w + "." + j, n);
            if (I instanceof Error)
              return I;
          }
        return null;
      }
      return f(x);
    }
    function ae(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var x = 0; x < g.length; x++) {
        var O = g[x];
        if (typeof O != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ve(O) + " at index " + x + "."
          ), s;
      }
      function T(N, P, w, C, M) {
        for (var j = [], I = 0; I < g.length; I++) {
          var Z = g[I], b = Z(N, P, w, C, M, n);
          if (b == null)
            return null;
          b.data && t(b.data, "expectedType") && j.push(b.data.expectedType);
        }
        var te = j.length > 0 ? ", expected one of type [" + j.join(", ") + "]" : "";
        return new h("Invalid " + C + " `" + M + "` supplied to " + ("`" + w + "`" + te + "."));
      }
      return f(T);
    }
    function D() {
      function g(x, O, T, N, P) {
        return Q(x[O]) ? null : new h("Invalid " + N + " `" + P + "` supplied to " + ("`" + T + "`, expected a ReactNode."));
      }
      return f(g);
    }
    function Y(g, x, O, T, N) {
      return new h(
        (g || "React class") + ": " + x + " type `" + O + "." + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + N + "`."
      );
    }
    function ce(g) {
      function x(O, T, N, P, w) {
        var C = O[T], M = ee(C);
        if (M !== "object")
          return new h("Invalid " + P + " `" + w + "` of type `" + M + "` " + ("supplied to `" + N + "`, expected `object`."));
        for (var j in g) {
          var I = g[j];
          if (typeof I != "function")
            return Y(N, P, w, j, se(I));
          var Z = I(C, j, N, P, w + "." + j, n);
          if (Z)
            return Z;
        }
        return null;
      }
      return f(x);
    }
    function le(g) {
      function x(O, T, N, P, w) {
        var C = O[T], M = ee(C);
        if (M !== "object")
          return new h("Invalid " + P + " `" + w + "` of type `" + M + "` " + ("supplied to `" + N + "`, expected `object`."));
        var j = r({}, O[T], g);
        for (var I in j) {
          var Z = g[I];
          if (t(g, I) && typeof Z != "function")
            return Y(N, P, w, I, se(Z));
          if (!Z)
            return new h(
              "Invalid " + P + " `" + w + "` key `" + I + "` supplied to `" + N + "`.\nBad object: " + JSON.stringify(O[T], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(g), null, "  ")
            );
          var b = Z(C, I, N, P, w + "." + I, n);
          if (b)
            return b;
        }
        return null;
      }
      return f(x);
    }
    function Q(g) {
      switch (typeof g) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !g;
        case "object":
          if (Array.isArray(g))
            return g.every(Q);
          if (g === null || l(g))
            return !0;
          var x = p(g);
          if (x) {
            var O = x.call(g), T;
            if (x !== g.entries) {
              for (; !(T = O.next()).done; )
                if (!Q(T.value))
                  return !1;
            } else
              for (; !(T = O.next()).done; ) {
                var N = T.value;
                if (N && !Q(N[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function q(g, x) {
      return g === "symbol" ? !0 : x ? x["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && x instanceof Symbol : !1;
    }
    function ee(g) {
      var x = typeof g;
      return Array.isArray(g) ? "array" : g instanceof RegExp ? "object" : q(x, g) ? "symbol" : x;
    }
    function se(g) {
      if (typeof g > "u" || g === null)
        return "" + g;
      var x = ee(g);
      if (x === "object") {
        if (g instanceof Date)
          return "date";
        if (g instanceof RegExp)
          return "regexp";
      }
      return x;
    }
    function ve(g) {
      var x = se(g);
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
    function Se(g) {
      return !g.constructor || !g.constructor.name ? u : g.constructor.name;
    }
    return y.checkPropTypes = o, y.resetWarningCache = o.resetWarningCache, y.PropTypes = y, y;
  }, dr;
}
var fr, Gr;
function Ot() {
  if (Gr)
    return fr;
  Gr = 1;
  var e = kr();
  function r() {
  }
  function n() {
  }
  return n.resetWarningCache = r, fr = function() {
    function t(s, l, i, c, d, p) {
      if (p !== e) {
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
  }, fr;
}
if (process.env.NODE_ENV !== "production") {
  var _t = Tn(), $t = !0;
  gr.exports = Ct()(_t.isElement, $t);
} else
  gr.exports = Ot()();
var Rt = gr.exports;
const U = /* @__PURE__ */ St(Rt);
function Pe(e) {
  let r = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    r += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + r + " for the full message.";
}
var br = { exports: {} }, L = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kr;
function At() {
  if (Kr)
    return L;
  Kr = 1;
  var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), i = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function h(f) {
    if (typeof f == "object" && f !== null) {
      var S = f.$$typeof;
      switch (S) {
        case e:
          switch (f = f.type, f) {
            case n:
            case o:
            case t:
            case c:
            case d:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case l:
                case s:
                case i:
                case u:
                case p:
                case a:
                  return f;
                default:
                  return S;
              }
          }
        case r:
          return S;
      }
    }
  }
  return L.ContextConsumer = s, L.ContextProvider = a, L.Element = e, L.ForwardRef = i, L.Fragment = n, L.Lazy = u, L.Memo = p, L.Portal = r, L.Profiler = o, L.StrictMode = t, L.Suspense = c, L.SuspenseList = d, L.isAsyncMode = function() {
    return !1;
  }, L.isConcurrentMode = function() {
    return !1;
  }, L.isContextConsumer = function(f) {
    return h(f) === s;
  }, L.isContextProvider = function(f) {
    return h(f) === a;
  }, L.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === e;
  }, L.isForwardRef = function(f) {
    return h(f) === i;
  }, L.isFragment = function(f) {
    return h(f) === n;
  }, L.isLazy = function(f) {
    return h(f) === u;
  }, L.isMemo = function(f) {
    return h(f) === p;
  }, L.isPortal = function(f) {
    return h(f) === r;
  }, L.isProfiler = function(f) {
    return h(f) === o;
  }, L.isStrictMode = function(f) {
    return h(f) === t;
  }, L.isSuspense = function(f) {
    return h(f) === c;
  }, L.isSuspenseList = function(f) {
    return h(f) === d;
  }, L.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === n || f === o || f === t || f === c || f === d || f === y || typeof f == "object" && f !== null && (f.$$typeof === u || f.$$typeof === p || f.$$typeof === a || f.$$typeof === s || f.$$typeof === i || f.$$typeof === v || f.getModuleId !== void 0);
  }, L.typeOf = h, L;
}
var F = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qr;
function Pt() {
  return qr || (qr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), i = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), y = Symbol.for("react.offscreen"), v = !1, h = !1, f = !1, S = !1, W = !1, B;
    B = Symbol.for("react.module.reference");
    function R(k) {
      return !!(typeof k == "string" || typeof k == "function" || k === n || k === o || W || k === t || k === c || k === d || S || k === y || v || h || f || typeof k == "object" && k !== null && (k.$$typeof === u || k.$$typeof === p || k.$$typeof === a || k.$$typeof === s || k.$$typeof === i || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      k.$$typeof === B || k.getModuleId !== void 0));
    }
    function m(k) {
      if (typeof k == "object" && k !== null) {
        var Ne = k.$$typeof;
        switch (Ne) {
          case e:
            var Je = k.type;
            switch (Je) {
              case n:
              case o:
              case t:
              case c:
              case d:
                return Je;
              default:
                var $r = Je && Je.$$typeof;
                switch ($r) {
                  case l:
                  case s:
                  case i:
                  case u:
                  case p:
                  case a:
                    return $r;
                  default:
                    return Ne;
                }
            }
          case r:
            return Ne;
        }
      }
    }
    var X = s, ne = a, ie = e, ae = i, D = n, Y = u, ce = p, le = r, Q = o, q = t, ee = c, se = d, ve = !1, Se = !1;
    function g(k) {
      return ve || (ve = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function x(k) {
      return Se || (Se = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function O(k) {
      return m(k) === s;
    }
    function T(k) {
      return m(k) === a;
    }
    function N(k) {
      return typeof k == "object" && k !== null && k.$$typeof === e;
    }
    function P(k) {
      return m(k) === i;
    }
    function w(k) {
      return m(k) === n;
    }
    function C(k) {
      return m(k) === u;
    }
    function M(k) {
      return m(k) === p;
    }
    function j(k) {
      return m(k) === r;
    }
    function I(k) {
      return m(k) === o;
    }
    function Z(k) {
      return m(k) === t;
    }
    function b(k) {
      return m(k) === c;
    }
    function te(k) {
      return m(k) === d;
    }
    F.ContextConsumer = X, F.ContextProvider = ne, F.Element = ie, F.ForwardRef = ae, F.Fragment = D, F.Lazy = Y, F.Memo = ce, F.Portal = le, F.Profiler = Q, F.StrictMode = q, F.Suspense = ee, F.SuspenseList = se, F.isAsyncMode = g, F.isConcurrentMode = x, F.isContextConsumer = O, F.isContextProvider = T, F.isElement = N, F.isForwardRef = P, F.isFragment = w, F.isLazy = C, F.isMemo = M, F.isPortal = j, F.isProfiler = I, F.isStrictMode = Z, F.isSuspense = b, F.isSuspenseList = te, F.isValidElementType = R, F.typeOf = m;
  }()), F;
}
process.env.NODE_ENV === "production" ? br.exports = At() : br.exports = Pt();
var Wr = br.exports;
const Mt = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function It(e) {
  const r = `${e}`.match(Mt);
  return r && r[1] || "";
}
function On(e, r = "") {
  return e.displayName || e.name || It(e) || r;
}
function Xr(e, r, n) {
  const t = On(r);
  return e.displayName || (t !== "" ? `${n}(${t})` : n);
}
function Bt(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return On(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Wr.ForwardRef:
          return Xr(e, e.render, "ForwardRef");
        case Wr.Memo:
          return Xr(e, e.type, "memo");
        default:
          return;
      }
  }
}
function de(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Pe(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function _n(e, r) {
  const n = A({}, r);
  return Object.keys(e).forEach((t) => {
    if (t.toString().match(/^(components|slots)$/))
      n[t] = A({}, e[t], n[t]);
    else if (t.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[t] || {}, a = r[t];
      n[t] = {}, !a || !Object.keys(a) ? n[t] = o : !o || !Object.keys(o) ? n[t] = a : (n[t] = A({}, a), Object.keys(o).forEach((s) => {
        n[t][s] = _n(o[s], a[s]);
      }));
    } else
      n[t] === void 0 && (n[t] = e[t]);
  }), n;
}
function Dt(e, r, n = void 0) {
  const t = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      t[o] = e[o].reduce((a, s) => {
        if (s) {
          const l = r(s);
          l !== "" && a.push(l), n && n[s] && a.push(n[s]);
        }
        return a;
      }, []).join(" ");
    }
  ), t;
}
const Yr = (e) => e, jt = () => {
  let e = Yr;
  return {
    configure(r) {
      e = r;
    },
    generate(r) {
      return e(r);
    },
    reset() {
      e = Yr;
    }
  };
}, zt = jt(), Vt = zt, Lt = {
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
function Sr(e, r, n = "Mui") {
  const t = Lt[r];
  return t ? `${n}-${t}` : `${Vt.generate(e)}-${r}`;
}
function Ft(e, r, n = "Mui") {
  const t = {};
  return r.forEach((o) => {
    t[o] = Sr(e, o, n);
  }), t;
}
function ge(e, r) {
  if (e == null)
    return {};
  var n = {}, t = Object.keys(e), o, a;
  for (a = 0; a < t.length; a++)
    o = t[a], !(r.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function $n(e) {
  var r, n, t = "";
  if (typeof e == "string" || typeof e == "number")
    t += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (r = 0; r < e.length; r++)
        e[r] && (n = $n(e[r])) && (t && (t += " "), t += n);
    else
      for (r in e)
        e[r] && (t && (t += " "), t += r);
  return t;
}
function Ht() {
  for (var e, r, n = 0, t = ""; n < arguments.length; )
    (e = arguments[n++]) && (r = $n(e)) && (t && (t += " "), t += r);
  return t;
}
const Ut = ["values", "unit", "step"], Jt = (e) => {
  const r = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return r.sort((n, t) => n.val - t.val), r.reduce((n, t) => A({}, n, {
    [t.key]: t.val
  }), {});
};
function Gt(e) {
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
  } = e, o = ge(e, Ut), a = Jt(r), s = Object.keys(a);
  function l(u) {
    return `@media (min-width:${typeof r[u] == "number" ? r[u] : u}${n})`;
  }
  function i(u) {
    return `@media (max-width:${(typeof r[u] == "number" ? r[u] : u) - t / 100}${n})`;
  }
  function c(u, y) {
    const v = s.indexOf(y);
    return `@media (min-width:${typeof r[u] == "number" ? r[u] : u}${n}) and (max-width:${(v !== -1 && typeof r[s[v]] == "number" ? r[s[v]] : y) - t / 100}${n})`;
  }
  function d(u) {
    return s.indexOf(u) + 1 < s.length ? c(u, s[s.indexOf(u) + 1]) : l(u);
  }
  function p(u) {
    const y = s.indexOf(u);
    return y === 0 ? l(s[1]) : y === s.length - 1 ? i(s[y]) : c(u, s[s.indexOf(u) + 1]).replace("@media", "@media not all and");
  }
  return A({
    keys: s,
    values: a,
    up: l,
    down: i,
    between: c,
    only: d,
    not: p,
    unit: n
  }, o);
}
const Kt = {
  borderRadius: 4
}, qt = Kt, Wt = process.env.NODE_ENV !== "production" ? U.oneOfType([U.number, U.string, U.object, U.array]) : {}, ye = Wt;
function Ve(e, r) {
  return r ? he(e, r, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Nr = {
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
}, Zr = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Nr[e]}px)`
};
function me(e, r, n) {
  const t = e.theme || {};
  if (Array.isArray(r)) {
    const a = t.breakpoints || Zr;
    return r.reduce((s, l, i) => (s[a.up(a.keys[i])] = n(r[i]), s), {});
  }
  if (typeof r == "object") {
    const a = t.breakpoints || Zr;
    return Object.keys(r).reduce((s, l) => {
      if (Object.keys(a.values || Nr).indexOf(l) !== -1) {
        const i = a.up(l);
        s[i] = n(r[l], l);
      } else {
        const i = l;
        s[i] = r[i];
      }
      return s;
    }, {});
  }
  return n(r);
}
function Xt(e = {}) {
  var r;
  return ((r = e.keys) == null ? void 0 : r.reduce((t, o) => {
    const a = e.up(o);
    return t[a] = {}, t;
  }, {})) || {};
}
function Yt(e, r) {
  return e.reduce((n, t) => {
    const o = n[t];
    return (!o || Object.keys(o).length === 0) && delete n[t], n;
  }, r);
}
function We(e, r, n = !0) {
  if (!r || typeof r != "string")
    return null;
  if (e && e.vars && n) {
    const t = `vars.${r}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (t != null)
      return t;
  }
  return r.split(".").reduce((t, o) => t && t[o] != null ? t[o] : null, e);
}
function qe(e, r, n, t = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || t : o = We(e, n) || t, r && (o = r(o, t, e)), o;
}
function H(e) {
  const {
    prop: r,
    cssProperty: n = e.prop,
    themeKey: t,
    transform: o
  } = e, a = (s) => {
    if (s[r] == null)
      return null;
    const l = s[r], i = s.theme, c = We(i, t) || {};
    return me(s, l, (p) => {
      let u = qe(c, o, p);
      return p === u && typeof p == "string" && (u = qe(c, o, `${r}${p === "default" ? "" : de(p)}`, p)), n === !1 ? u : {
        [n]: u
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [r]: ye
  } : {}, a.filterProps = [r], a;
}
function Zt(e) {
  const r = {};
  return (n) => (r[n] === void 0 && (r[n] = e(n)), r[n]);
}
const Qt = {
  m: "margin",
  p: "padding"
}, eo = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Qr = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, ro = Zt((e) => {
  if (e.length > 2)
    if (Qr[e])
      e = Qr[e];
    else
      return [e];
  const [r, n] = e.split(""), t = Qt[r], o = eo[n] || "";
  return Array.isArray(o) ? o.map((a) => t + a) : [t + o];
}), Xe = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Ye = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], no = [...Xe, ...Ye];
function He(e, r, n, t) {
  var o;
  const a = (o = We(e, r, !1)) != null ? o : n;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${t} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${r}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Rn(e) {
  return He(e, "spacing", 8, "spacing");
}
function Ue(e, r) {
  if (typeof r == "string" || r == null)
    return r;
  const n = Math.abs(r), t = e(n);
  return r >= 0 ? t : typeof t == "number" ? -t : `-${t}`;
}
function to(e, r) {
  return (n) => e.reduce((t, o) => (t[o] = Ue(r, n), t), {});
}
function oo(e, r, n, t) {
  if (r.indexOf(n) === -1)
    return null;
  const o = ro(n), a = to(o, t), s = e[n];
  return me(e, s, a);
}
function An(e, r) {
  const n = Rn(e.theme);
  return Object.keys(e).map((t) => oo(e, r, t, n)).reduce(Ve, {});
}
function G(e) {
  return An(e, Xe);
}
G.propTypes = process.env.NODE_ENV !== "production" ? Xe.reduce((e, r) => (e[r] = ye, e), {}) : {};
G.filterProps = Xe;
function K(e) {
  return An(e, Ye);
}
K.propTypes = process.env.NODE_ENV !== "production" ? Ye.reduce((e, r) => (e[r] = ye, e), {}) : {};
K.filterProps = Ye;
process.env.NODE_ENV !== "production" && no.reduce((e, r) => (e[r] = ye, e), {});
function ao(e = 8) {
  if (e.mui)
    return e;
  const r = Rn({
    spacing: e
  }), n = (...t) => (process.env.NODE_ENV !== "production" && (t.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)), (t.length === 0 ? [1] : t).map((a) => {
    const s = r(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function Ze(...e) {
  const r = e.reduce((t, o) => (o.filterProps.forEach((a) => {
    t[a] = o;
  }), t), {}), n = (t) => Object.keys(t).reduce((o, a) => r[a] ? Ve(o, r[a](t)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((t, o) => Object.assign(t, o.propTypes), {}) : {}, n.filterProps = e.reduce((t, o) => t.concat(o.filterProps), []), n;
}
function ue(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
const so = H({
  prop: "border",
  themeKey: "borders",
  transform: ue
}), io = H({
  prop: "borderTop",
  themeKey: "borders",
  transform: ue
}), co = H({
  prop: "borderRight",
  themeKey: "borders",
  transform: ue
}), lo = H({
  prop: "borderBottom",
  themeKey: "borders",
  transform: ue
}), uo = H({
  prop: "borderLeft",
  themeKey: "borders",
  transform: ue
}), fo = H({
  prop: "borderColor",
  themeKey: "palette"
}), po = H({
  prop: "borderTopColor",
  themeKey: "palette"
}), ho = H({
  prop: "borderRightColor",
  themeKey: "palette"
}), mo = H({
  prop: "borderBottomColor",
  themeKey: "palette"
}), go = H({
  prop: "borderLeftColor",
  themeKey: "palette"
}), Qe = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const r = He(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (t) => ({
      borderRadius: Ue(r, t)
    });
    return me(e, e.borderRadius, n);
  }
  return null;
};
Qe.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ye
} : {};
Qe.filterProps = ["borderRadius"];
Ze(so, io, co, lo, uo, fo, po, ho, mo, go, Qe);
const er = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const r = He(e.theme, "spacing", 8, "gap"), n = (t) => ({
      gap: Ue(r, t)
    });
    return me(e, e.gap, n);
  }
  return null;
};
er.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ye
} : {};
er.filterProps = ["gap"];
const rr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const r = He(e.theme, "spacing", 8, "columnGap"), n = (t) => ({
      columnGap: Ue(r, t)
    });
    return me(e, e.columnGap, n);
  }
  return null;
};
rr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ye
} : {};
rr.filterProps = ["columnGap"];
const nr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const r = He(e.theme, "spacing", 8, "rowGap"), n = (t) => ({
      rowGap: Ue(r, t)
    });
    return me(e, e.rowGap, n);
  }
  return null;
};
nr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ye
} : {};
nr.filterProps = ["rowGap"];
const bo = H({
  prop: "gridColumn"
}), yo = H({
  prop: "gridRow"
}), vo = H({
  prop: "gridAutoFlow"
}), xo = H({
  prop: "gridAutoColumns"
}), ko = H({
  prop: "gridAutoRows"
}), So = H({
  prop: "gridTemplateColumns"
}), No = H({
  prop: "gridTemplateRows"
}), Eo = H({
  prop: "gridTemplateAreas"
}), wo = H({
  prop: "gridArea"
});
Ze(er, rr, nr, bo, yo, vo, xo, ko, So, No, Eo, wo);
function Ae(e, r) {
  return r === "grey" ? r : e;
}
const To = H({
  prop: "color",
  themeKey: "palette",
  transform: Ae
}), Co = H({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ae
}), Oo = H({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ae
});
Ze(To, Co, Oo);
function re(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const _o = H({
  prop: "width",
  transform: re
}), Er = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const r = (n) => {
      var t;
      return {
        maxWidth: ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null ? void 0 : t[n]) || Nr[n] || re(n)
      };
    };
    return me(e, e.maxWidth, r);
  }
  return null;
};
Er.filterProps = ["maxWidth"];
const $o = H({
  prop: "minWidth",
  transform: re
}), Ro = H({
  prop: "height",
  transform: re
}), Ao = H({
  prop: "maxHeight",
  transform: re
}), Po = H({
  prop: "minHeight",
  transform: re
});
H({
  prop: "size",
  cssProperty: "width",
  transform: re
});
H({
  prop: "size",
  cssProperty: "height",
  transform: re
});
const Mo = H({
  prop: "boxSizing"
});
Ze(_o, Er, $o, Ro, Ao, Po, Mo);
const Io = {
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
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Qe
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Ae
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Ae
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Ae
  },
  // spacing
  p: {
    style: K
  },
  pt: {
    style: K
  },
  pr: {
    style: K
  },
  pb: {
    style: K
  },
  pl: {
    style: K
  },
  px: {
    style: K
  },
  py: {
    style: K
  },
  padding: {
    style: K
  },
  paddingTop: {
    style: K
  },
  paddingRight: {
    style: K
  },
  paddingBottom: {
    style: K
  },
  paddingLeft: {
    style: K
  },
  paddingX: {
    style: K
  },
  paddingY: {
    style: K
  },
  paddingInline: {
    style: K
  },
  paddingInlineStart: {
    style: K
  },
  paddingInlineEnd: {
    style: K
  },
  paddingBlock: {
    style: K
  },
  paddingBlockStart: {
    style: K
  },
  paddingBlockEnd: {
    style: K
  },
  m: {
    style: G
  },
  mt: {
    style: G
  },
  mr: {
    style: G
  },
  mb: {
    style: G
  },
  ml: {
    style: G
  },
  mx: {
    style: G
  },
  my: {
    style: G
  },
  margin: {
    style: G
  },
  marginTop: {
    style: G
  },
  marginRight: {
    style: G
  },
  marginBottom: {
    style: G
  },
  marginLeft: {
    style: G
  },
  marginX: {
    style: G
  },
  marginY: {
    style: G
  },
  marginInline: {
    style: G
  },
  marginInlineStart: {
    style: G
  },
  marginInlineEnd: {
    style: G
  },
  marginBlock: {
    style: G
  },
  marginBlockStart: {
    style: G
  },
  marginBlockEnd: {
    style: G
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
    transform: re
  },
  maxWidth: {
    style: Er
  },
  minWidth: {
    transform: re
  },
  height: {
    transform: re
  },
  maxHeight: {
    transform: re
  },
  minHeight: {
    transform: re
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
}, wr = Io;
function Bo(...e) {
  const r = e.reduce((t, o) => t.concat(Object.keys(o)), []), n = new Set(r);
  return e.every((t) => n.size === Object.keys(t).length);
}
function Do(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function jo() {
  function e(n, t, o, a) {
    const s = {
      [n]: t,
      theme: o
    }, l = a[n];
    if (!l)
      return {
        [n]: t
      };
    const {
      cssProperty: i = n,
      themeKey: c,
      transform: d,
      style: p
    } = l;
    if (t == null)
      return null;
    if (c === "typography" && t === "inherit")
      return {
        [n]: t
      };
    const u = We(o, c) || {};
    return p ? p(s) : me(s, t, (v) => {
      let h = qe(u, d, v);
      return v === h && typeof v == "string" && (h = qe(u, d, `${n}${v === "default" ? "" : de(v)}`, v)), i === !1 ? h : {
        [i]: h
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
    const s = (t = a.unstable_sxConfig) != null ? t : wr;
    function l(i) {
      let c = i;
      if (typeof i == "function")
        c = i(a);
      else if (typeof i != "object")
        return i;
      if (!c)
        return null;
      const d = Xt(a.breakpoints), p = Object.keys(d);
      let u = d;
      return Object.keys(c).forEach((y) => {
        const v = Do(c[y], a);
        if (v != null)
          if (typeof v == "object")
            if (s[y])
              u = Ve(u, e(y, v, a, s));
            else {
              const h = me({
                theme: a
              }, v, (f) => ({
                [y]: f
              }));
              Bo(h, v) ? u[y] = r({
                sx: v,
                theme: a
              }) : u = Ve(u, h);
            }
          else
            u = Ve(u, e(y, v, a, s));
      }), Yt(p, u);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return r;
}
const Pn = jo();
Pn.filterProps = ["sx"];
const Tr = Pn, zo = ["breakpoints", "palette", "spacing", "shape"];
function Cr(e = {}, ...r) {
  const {
    breakpoints: n = {},
    palette: t = {},
    spacing: o,
    shape: a = {}
  } = e, s = ge(e, zo), l = Gt(n), i = ao(o);
  let c = he({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: A({
      mode: "light"
    }, t),
    spacing: i,
    shape: A({}, qt, a)
  }, s);
  return c = r.reduce((d, p) => he(d, p), c), c.unstable_sxConfig = A({}, wr, s == null ? void 0 : s.unstable_sxConfig), c.unstable_sx = function(p) {
    return Tr({
      sx: p,
      theme: this
    });
  }, c;
}
function Vo(e) {
  return Object.keys(e).length === 0;
}
function Lo(e = null) {
  const r = Le.useContext(nt);
  return !r || Vo(r) ? e : r;
}
const Fo = Cr();
function Ho(e = Fo) {
  return Lo(e);
}
const Uo = ["variant"];
function en(e) {
  return e.length === 0;
}
function Mn(e) {
  const {
    variant: r
  } = e, n = ge(e, Uo);
  let t = r || "";
  return Object.keys(n).sort().forEach((o) => {
    o === "color" ? t += en(t) ? e[o] : de(e[o]) : t += `${en(t) ? o : de(o)}${de(e[o].toString())}`;
  }), t;
}
const Jo = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Go(e) {
  return Object.keys(e).length === 0;
}
function Ko(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const qo = (e, r) => r.components && r.components[e] && r.components[e].styleOverrides ? r.components[e].styleOverrides : null, Wo = (e, r) => {
  let n = [];
  r && r.components && r.components[e] && r.components[e].variants && (n = r.components[e].variants);
  const t = {};
  return n.forEach((o) => {
    const a = Mn(o.props);
    t[a] = o.style;
  }), t;
}, Xo = (e, r, n, t) => {
  var o;
  const {
    ownerState: a = {}
  } = e, s = [], l = n == null || (o = n.components) == null || (o = o[t]) == null ? void 0 : o.variants;
  return l && l.forEach((i) => {
    let c = !0;
    Object.keys(i.props).forEach((d) => {
      a[d] !== i.props[d] && e[d] !== i.props[d] && (c = !1);
    }), c && s.push(r[Mn(i.props)]);
  }), s;
};
function Ke(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Yo = Cr(), rn = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function je({
  defaultTheme: e,
  theme: r,
  themeId: n
}) {
  return Go(r) ? e : r[n] || r;
}
function Zo(e) {
  return e ? (r, n) => n[e] : null;
}
function Qo(e = {}) {
  const {
    themeId: r,
    defaultTheme: n = Yo,
    rootShouldForwardProp: t = Ke,
    slotShouldForwardProp: o = Ke
  } = e, a = (s) => Tr(A({}, s, {
    theme: je(A({}, s, {
      defaultTheme: n,
      themeId: r
    }))
  }));
  return a.__mui_systemSx = !0, (s, l = {}) => {
    tt(s, (R) => R.filter((m) => !(m != null && m.__mui_systemSx)));
    const {
      name: i,
      slot: c,
      skipVariantsResolver: d,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: u = Zo(rn(c))
    } = l, y = ge(l, Jo), v = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      c && c !== "Root" && c !== "root" || !1
    ), h = p || !1;
    let f;
    process.env.NODE_ENV !== "production" && i && (f = `${i}-${rn(c || "Root")}`);
    let S = Ke;
    c === "Root" || c === "root" ? S = t : c ? S = o : Ko(s) && (S = void 0);
    const W = rt(s, A({
      shouldForwardProp: S,
      label: f
    }, y)), B = (R, ...m) => {
      const X = m ? m.map((D) => typeof D == "function" && D.__emotion_real !== D ? (Y) => D(A({}, Y, {
        theme: je(A({}, Y, {
          defaultTheme: n,
          themeId: r
        }))
      })) : D) : [];
      let ne = R;
      i && u && X.push((D) => {
        const Y = je(A({}, D, {
          defaultTheme: n,
          themeId: r
        })), ce = qo(i, Y);
        if (ce) {
          const le = {};
          return Object.entries(ce).forEach(([Q, q]) => {
            le[Q] = typeof q == "function" ? q(A({}, D, {
              theme: Y
            })) : q;
          }), u(D, le);
        }
        return null;
      }), i && !v && X.push((D) => {
        const Y = je(A({}, D, {
          defaultTheme: n,
          themeId: r
        }));
        return Xo(D, Wo(i, Y), Y, i);
      }), h || X.push(a);
      const ie = X.length - m.length;
      if (Array.isArray(R) && ie > 0) {
        const D = new Array(ie).fill("");
        ne = [...R, ...D], ne.raw = [...R.raw, ...D];
      } else
        typeof R == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        R.__emotion_real !== R && (ne = (D) => R(A({}, D, {
          theme: je(A({}, D, {
            defaultTheme: n,
            themeId: r
          }))
        })));
      const ae = W(ne, ...X);
      if (process.env.NODE_ENV !== "production") {
        let D;
        i && (D = `${i}${de(c || "")}`), D === void 0 && (D = `Styled(${Bt(s)})`), ae.displayName = D;
      }
      return s.muiName && (ae.muiName = s.muiName), ae;
    };
    return W.withConfig && (B.withConfig = W.withConfig), B;
  };
}
function ea(e) {
  const {
    theme: r,
    name: n,
    props: t
  } = e;
  return !r || !r.components || !r.components[n] || !r.components[n].defaultProps ? t : _n(r.components[n].defaultProps, t);
}
function ra({
  props: e,
  name: r,
  defaultTheme: n,
  themeId: t
}) {
  let o = Ho(n);
  return t && (o = o[t] || o), ea({
    theme: o,
    name: r,
    props: e
  });
}
function In(e, r = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < r || e > n) && console.error(`MUI: The value provided ${e} is out of range [${r}, ${n}].`), Math.min(Math.max(r, e), n);
}
function na(e) {
  e = e.slice(1);
  const r = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(r);
  return n && n[0].length === 1 && (n = n.map((t) => t + t)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((t, o) => o < 3 ? parseInt(t, 16) : Math.round(parseInt(t, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Me(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Me(na(e));
  const r = e.indexOf("("), n = e.substring(0, r);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Pe(9, e));
  let t = e.substring(r + 1, e.length - 1), o;
  if (n === "color") {
    if (t = t.split(" "), o = t.shift(), t.length === 4 && t[3].charAt(0) === "/" && (t[3] = t[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Pe(10, o));
  } else
    t = t.split(",");
  return t = t.map((a) => parseFloat(a)), {
    type: n,
    values: t,
    colorSpace: o
  };
}
function Or(e) {
  const {
    type: r,
    colorSpace: n
  } = e;
  let {
    values: t
  } = e;
  return r.indexOf("rgb") !== -1 ? t = t.map((o, a) => a < 3 ? parseInt(o, 10) : o) : r.indexOf("hsl") !== -1 && (t[1] = `${t[1]}%`, t[2] = `${t[2]}%`), r.indexOf("color") !== -1 ? t = `${n} ${t.join(" ")}` : t = `${t.join(", ")}`, `${r}(${t})`;
}
function ta(e) {
  e = Me(e);
  const {
    values: r
  } = e, n = r[0], t = r[1] / 100, o = r[2] / 100, a = t * Math.min(o, 1 - o), s = (c, d = (c + n / 30) % 12) => o - a * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const i = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", i.push(r[3])), Or({
    type: l,
    values: i
  });
}
function nn(e) {
  e = Me(e);
  let r = e.type === "hsl" || e.type === "hsla" ? Me(ta(e)).values : e.values;
  return r = r.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3));
}
function tn(e, r) {
  const n = nn(e), t = nn(r);
  return (Math.max(n, t) + 0.05) / (Math.min(n, t) + 0.05);
}
function oa(e, r) {
  if (e = Me(e), r = In(r), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - r;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - r;
  return Or(e);
}
function aa(e, r) {
  if (e = Me(e), r = In(r), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * r;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * r;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * r;
  return Or(e);
}
function sa(e, r) {
  return A({
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
const ia = {
  black: "#000",
  white: "#fff"
}, Fe = ia, ca = {
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
}, la = ca, ua = {
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
}, we = ua, da = {
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
}, Te = da, fa = {
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
}, ze = fa, pa = {
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
}, Ce = pa, ha = {
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
}, Oe = ha, ma = {
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
}, _e = ma, ga = ["mode", "contrastThreshold", "tonalOffset"], on = {
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
    paper: Fe.white,
    default: Fe.white
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
}, pr = {
  text: {
    primary: Fe.white,
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
    active: Fe.white,
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
function an(e, r, n, t) {
  const o = t.light || t, a = t.dark || t * 1.5;
  e[r] || (e.hasOwnProperty(n) ? e[r] = e[n] : r === "light" ? e.light = aa(e.main, o) : r === "dark" && (e.dark = oa(e.main, a)));
}
function ba(e = "light") {
  return e === "dark" ? {
    main: Ce[200],
    light: Ce[50],
    dark: Ce[400]
  } : {
    main: Ce[700],
    light: Ce[400],
    dark: Ce[800]
  };
}
function ya(e = "light") {
  return e === "dark" ? {
    main: we[200],
    light: we[50],
    dark: we[400]
  } : {
    main: we[500],
    light: we[300],
    dark: we[700]
  };
}
function va(e = "light") {
  return e === "dark" ? {
    main: Te[500],
    light: Te[300],
    dark: Te[700]
  } : {
    main: Te[700],
    light: Te[400],
    dark: Te[800]
  };
}
function xa(e = "light") {
  return e === "dark" ? {
    main: Oe[400],
    light: Oe[300],
    dark: Oe[700]
  } : {
    main: Oe[700],
    light: Oe[500],
    dark: Oe[900]
  };
}
function ka(e = "light") {
  return e === "dark" ? {
    main: _e[400],
    light: _e[300],
    dark: _e[700]
  } : {
    main: _e[800],
    light: _e[500],
    dark: _e[900]
  };
}
function Sa(e = "light") {
  return e === "dark" ? {
    main: ze[400],
    light: ze[300],
    dark: ze[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: ze[500],
    dark: ze[900]
  };
}
function Na(e) {
  const {
    mode: r = "light",
    contrastThreshold: n = 3,
    tonalOffset: t = 0.2
  } = e, o = ge(e, ga), a = e.primary || ba(r), s = e.secondary || ya(r), l = e.error || va(r), i = e.info || xa(r), c = e.success || ka(r), d = e.warning || Sa(r);
  function p(h) {
    const f = tn(h, pr.text.primary) >= n ? pr.text.primary : on.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const S = tn(h, f);
      S < 3 && console.error([`MUI: The contrast ratio of ${S}:1 for ${f} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return f;
  }
  const u = ({
    color: h,
    name: f,
    mainShade: S = 500,
    lightShade: W = 300,
    darkShade: B = 700
  }) => {
    if (h = A({}, h), !h.main && h[S] && (h.main = h[S]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${f ? ` (${f})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.` : Pe(11, f ? ` (${f})` : "", S));
    if (typeof h.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${f ? ` (${f})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Pe(12, f ? ` (${f})` : "", JSON.stringify(h.main)));
    return an(h, "light", W, t), an(h, "dark", B, t), h.contrastText || (h.contrastText = p(h.main)), h;
  }, y = {
    dark: pr,
    light: on
  };
  return process.env.NODE_ENV !== "production" && (y[r] || console.error(`MUI: The palette mode \`${r}\` is not supported.`)), he(A({
    // A collection of common colors.
    common: A({}, Fe),
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
      color: i,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: u({
      color: c,
      name: "success"
    }),
    // The grey colors.
    grey: la,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: p,
    // Generate a rich color object.
    augmentColor: u,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: t
  }, y[r]), o);
}
const Ea = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function wa(e) {
  return Math.round(e * 1e5) / 1e5;
}
const sn = {
  textTransform: "uppercase"
}, cn = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ta(e, r) {
  const n = typeof r == "function" ? r(e) : r, {
    fontFamily: t = cn,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: i = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: c = 16,
    // Apply the CSS properties to all the variants.
    allVariants: d,
    pxToRem: p
  } = n, u = ge(n, Ea);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof c != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const y = o / 14, v = p || ((S) => `${S / c * y}rem`), h = (S, W, B, R, m) => A({
    fontFamily: t,
    fontWeight: S,
    fontSize: v(W),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: B
  }, t === cn ? {
    letterSpacing: `${wa(R / W)}em`
  } : {}, m, d), f = {
    h1: h(a, 96, 1.167, -1.5),
    h2: h(a, 60, 1.2, -0.5),
    h3: h(s, 48, 1.167, 0),
    h4: h(s, 34, 1.235, 0.25),
    h5: h(s, 24, 1.334, 0),
    h6: h(l, 20, 1.6, 0.15),
    subtitle1: h(s, 16, 1.75, 0.15),
    subtitle2: h(l, 14, 1.57, 0.1),
    body1: h(s, 16, 1.5, 0.15),
    body2: h(s, 14, 1.43, 0.15),
    button: h(l, 14, 1.75, 0.4, sn),
    caption: h(s, 12, 1.66, 0.4),
    overline: h(s, 12, 2.66, 1, sn),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return he(A({
    htmlFontSize: c,
    pxToRem: v,
    fontFamily: t,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: i
  }, f), u, {
    clone: !1
    // No need to clone deep
  });
}
const Ca = 0.2, Oa = 0.14, _a = 0.12;
function J(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ca})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Oa})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${_a})`].join(",");
}
const $a = ["none", J(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), J(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), J(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), J(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), J(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), J(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), J(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), J(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), J(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), J(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), J(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), J(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), J(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), J(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), J(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), J(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), J(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), J(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), J(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), J(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), J(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), J(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), J(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), J(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ra = $a, Aa = ["duration", "easing", "delay"], Pa = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Ma = {
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
function ln(e) {
  return `${Math.round(e)}ms`;
}
function Ia(e) {
  if (!e)
    return 0;
  const r = e / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function Ba(e) {
  const r = A({}, Pa, e.easing), n = A({}, Ma, e.duration);
  return A({
    getAutoHeightDuration: Ia,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = n.standard,
        easing: l = r.easeInOut,
        delay: i = 0
      } = a, c = ge(a, Aa);
      if (process.env.NODE_ENV !== "production") {
        const d = (u) => typeof u == "string", p = (u) => !isNaN(parseFloat(u));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !p(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(l) || console.error('MUI: Argument "easing" must be a string.'), !p(i) && !d(i) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(c).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : ln(s)} ${l} ${typeof i == "string" ? i : ln(i)}`).join(",");
    }
  }, e, {
    easing: r,
    duration: n
  });
}
const Da = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, ja = Da, za = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Va(e = {}, ...r) {
  const {
    mixins: n = {},
    palette: t = {},
    transitions: o = {},
    typography: a = {}
  } = e, s = ge(e, za);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Pe(18));
  const l = Na(t), i = Cr(e);
  let c = he(i, {
    mixins: sa(i.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ra.slice(),
    typography: Ta(l, a),
    transitions: Ba(o),
    zIndex: A({}, ja)
  });
  if (c = he(c, s), c = r.reduce((d, p) => he(d, p), c), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], p = (u, y) => {
      let v;
      for (v in u) {
        const h = u[v];
        if (d.indexOf(v) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const f = Sr("", v);
            console.error([`MUI: The \`${y}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(u, null, 2), "", `Instead, you need to use the '&.${f}' syntax:`, JSON.stringify({
              root: {
                [`&.${f}`]: h
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          u[v] = {};
        }
      }
    };
    Object.keys(c.components).forEach((u) => {
      const y = c.components[u].styleOverrides;
      y && u.indexOf("Mui") === 0 && p(y, u);
    });
  }
  return c.unstable_sxConfig = A({}, wr, s == null ? void 0 : s.unstable_sxConfig), c.unstable_sx = function(p) {
    return Tr({
      sx: p,
      theme: this
    });
  }, c;
}
const La = Va(), Bn = La, Dn = "$$material";
function Fa({
  props: e,
  name: r
}) {
  return ra({
    props: e,
    name: r,
    defaultTheme: Bn,
    themeId: Dn
  });
}
const Ha = (e) => Ke(e) && e !== "classes", Ua = Qo({
  themeId: Dn,
  defaultTheme: Bn,
  rootShouldForwardProp: Ha
}), Ja = Ua;
function Ga(e) {
  return Sr("MuiSvgIcon", e);
}
Ft("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Ka = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], qa = (e) => {
  const {
    color: r,
    fontSize: n,
    classes: t
  } = e, o = {
    root: ["root", r !== "inherit" && `color${de(r)}`, `fontSize${de(n)}`]
  };
  return Dt(o, Ga, t);
}, Wa = Ja("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, r) => {
    const {
      ownerState: n
    } = e;
    return [r.root, n.color !== "inherit" && r[`color${de(n.color)}`], r[`fontSize${de(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: r
}) => {
  var n, t, o, a, s, l, i, c, d, p, u, y, v;
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
      small: ((a = e.typography) == null || (s = a.pxToRem) == null ? void 0 : s.call(a, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (i = l.pxToRem) == null ? void 0 : i.call(l, 24)) || "1.5rem",
      large: ((c = e.typography) == null || (d = c.pxToRem) == null ? void 0 : d.call(c, 35)) || "2.1875rem"
    }[r.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (p = (u = (e.vars || e).palette) == null || (u = u[r.color]) == null ? void 0 : u.main) != null ? p : {
      action: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[r.color]
  };
}), _r = /* @__PURE__ */ Le.forwardRef(function(r, n) {
  const t = Fa({
    props: r,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: s = "inherit",
    component: l = "svg",
    fontSize: i = "medium",
    htmlColor: c,
    inheritViewBox: d = !1,
    titleAccess: p,
    viewBox: u = "0 0 24 24"
  } = t, y = ge(t, Ka), v = /* @__PURE__ */ Le.isValidElement(o) && o.type === "svg", h = A({}, t, {
    color: s,
    component: l,
    fontSize: i,
    instanceFontSize: r.fontSize,
    inheritViewBox: d,
    viewBox: u,
    hasSvgAsChild: v
  }), f = {};
  d || (f.viewBox = u);
  const S = qa(h);
  return /* @__PURE__ */ Ie(Wa, A({
    as: l,
    className: Ht(S.root, a),
    focusable: "false",
    color: c,
    "aria-hidden": p ? void 0 : !0,
    role: p ? "img" : void 0,
    ref: n
  }, f, y, v && o.props, {
    ownerState: h,
    children: [v ? o.props.children : o, p ? /* @__PURE__ */ E("title", {
      children: p
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (_r.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Node passed into the SVG element.
   */
  children: U.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: U.object,
  /**
   * @ignore
   */
  className: U.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: U.oneOfType([U.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), U.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: U.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: U.oneOfType([U.oneOf(["inherit", "large", "medium", "small"]), U.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: U.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: U.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: U.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: U.oneOfType([U.arrayOf(U.oneOfType([U.func, U.object, U.bool])), U.func, U.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: U.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: U.string
});
_r.muiName = "SvgIcon";
const un = _r;
function Xa(e, r) {
  function n(t, o) {
    return /* @__PURE__ */ E(un, A({
      "data-testid": `${r}Icon`,
      ref: o
    }, t, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${r}Icon`), n.muiName = un.muiName, /* @__PURE__ */ Le.memo(/* @__PURE__ */ Le.forwardRef(n));
}
const Ya = Xa(/* @__PURE__ */ E("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
}), "Menu");
function ds({
  menu: e,
  dataHandler: r,
  commandHandler: n,
  className: t,
  id: o,
  children: a
}) {
  const [s, l] = tr(!1), [i, c] = tr(!1), d = or(() => {
    s && l(!1), c(!1);
  }, [s]), p = or((S) => {
    S.stopPropagation(), l((W) => {
      const B = !W;
      return B && S.shiftKey ? c(!0) : B || c(!1), B;
    });
  }, []), u = Yn(null), [y, v] = tr(0);
  Zn(() => {
    s && u.current && v(u.current.clientHeight);
  }, [s]);
  const h = or(
    (S) => (d(), n(S)),
    [n, d]
  );
  let f = e;
  return !f && r && (f = r(i)), /* @__PURE__ */ E("div", { ref: u, style: { position: "relative" }, children: /* @__PURE__ */ E(Kn, { position: "static", id: o, children: /* @__PURE__ */ Ie(qn, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    f ? /* @__PURE__ */ E(
      Wn,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: p,
        children: /* @__PURE__ */ E(Ya, {})
      }
    ) : null,
    a ? /* @__PURE__ */ E("div", { className: "papi-menu-children", children: a }) : null,
    f ? /* @__PURE__ */ E(
      Xn,
      {
        className: `papi-menu-drawer ${t ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: s,
        onClose: d,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: y
          }
        },
        children: /* @__PURE__ */ E(it, { commandHandler: h, columns: f.columns })
      }
    ) : null
  ] }) }) });
}
function Za(e, r = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), t = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), r === "top" && t ? n.insertBefore(o, t) : n.appendChild(o);
}
Za(`.papi-button {
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
  }

@layer rdg.Cell {

.cd0kgiy7-0-0-beta-34 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}
  }

@layer rdg.Cell {

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
  }

@layer rdg.FocusSink {
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
  }

@layer rdg.Cell {

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
  }

@layer rdg.SummaryRow {
    .t1jijrjz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
  }

@layer rdg.SummaryRow {
    .t14bmecc7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }

@layer rdg.SummaryRow {
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

.paratext {
  background-color: darkgreen;
  color: greenyellow;
}
.papi-toolbar {
  background-color: rgb(245, 245, 245);
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
`, "top");
export {
  Ee as Button,
  os as ChapterRangeSelection,
  ot as Checkbox,
  hr as ComboBox,
  it as GridMenu,
  $e as LabelPosition,
  at as MenuItem,
  ss as RefSelector,
  is as Slider,
  cs as Snackbar,
  ls as Switch,
  us as Table,
  mr as TextField,
  ds as Toolbar,
  En as getChaptersForBook
};
//# sourceMappingURL=index.es.js.map
