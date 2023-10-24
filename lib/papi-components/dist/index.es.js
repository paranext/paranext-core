import { jsx as S, jsxs as Ie, Fragment as zn } from "react/jsx-runtime";
import { Button as Vn, Autocomplete as Ln, TextField as fn, FormControlLabel as Ar, FormLabel as Fn, Checkbox as Hn, MenuItem as Un, Grid as pn, IconButton as hn, Paper as Jn, Slider as Gn, Snackbar as Kn, Switch as qn, AppBar as Wn, Toolbar as Xn, Drawer as Yn } from "@mui/material";
import * as Le from "react";
import { useMemo as yr, useState as Ke, useCallback as ar, useRef as Zn, useEffect as Qn } from "react";
import et, { SelectColumn as rt } from "react-data-grid";
import nt, { ThemeContext as tt, internal_processStyles as ot } from "@mui/styled-engine";
function Ee({
  id: e,
  isDisabled: r = !1,
  className: n,
  onClick: t,
  onContextMenu: o,
  children: a
}) {
  return /* @__PURE__ */ S(
    Vn,
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
function mr({
  id: e,
  title: r,
  isDisabled: n = !1,
  isClearable: t = !0,
  hasError: o = !1,
  isFullWidth: a = !1,
  width: s,
  options: u = [],
  className: c,
  value: i,
  onChange: l,
  onFocus: p,
  onBlur: d,
  getOptionLabel: v
}) {
  return /* @__PURE__ */ S(
    Ln,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !t,
      fullWidth: a,
      options: u,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: i,
      onChange: l,
      onFocus: p,
      onBlur: d,
      getOptionLabel: v,
      renderInput: (b) => /* @__PURE__ */ S(
        fn,
        {
          ...b,
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
function as({
  startChapter: e,
  endChapter: r,
  handleSelectStartChapter: n,
  handleSelectEndChapter: t,
  isDisabled: o,
  chapterCount: a
}) {
  const s = yr(
    () => Array.from({ length: a }, (i, l) => l + 1),
    [a]
  ), u = (i, l) => {
    n(l), l > r && t(l);
  }, c = (i, l) => {
    t(l), l < e && n(l);
  };
  return /* @__PURE__ */ Ie(zn, { children: [
    /* @__PURE__ */ S(
      Ar,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ S(
          mr,
          {
            onChange: (i, l) => u(i, l),
            className: "book-selection-chapter",
            isClearable: !1,
            options: s,
            getOptionLabel: (i) => i.toString(),
            value: e,
            isDisabled: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ S(
      Ar,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ S(
          mr,
          {
            onChange: (i, l) => c(i, l),
            className: "book-selection-chapter",
            isClearable: !1,
            options: s,
            getOptionLabel: (i) => i.toString(),
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
var $e = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))($e || {});
function at({
  id: e,
  isChecked: r,
  labelText: n = "",
  labelPosition: t = $e.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: s = !1,
  hasError: u = !1,
  className: c,
  onChange: i
}) {
  const l = /* @__PURE__ */ S(
    Hn,
    {
      id: e,
      checked: r,
      indeterminate: o,
      defaultChecked: a,
      disabled: s,
      className: `papi-checkbox ${u ? "error" : ""} ${c ?? ""}`,
      onChange: i
    }
  );
  let p;
  if (n) {
    const d = t === $e.Before || t === $e.Above, v = /* @__PURE__ */ S("span", { className: `papi-checkbox-label ${u ? "error" : ""} ${c ?? ""}`, children: n }), b = t === $e.Before || t === $e.After, h = b ? v : /* @__PURE__ */ S("div", { children: v }), f = b ? l : /* @__PURE__ */ S("div", { children: l });
    p = /* @__PURE__ */ Ie(
      Fn,
      {
        className: `papi-checkbox ${t.toString()}`,
        disabled: s,
        error: u,
        children: [
          d && h,
          f,
          !d && h
        ]
      }
    );
  } else
    p = l;
  return p;
}
function st(e) {
  const {
    onClick: r,
    name: n,
    hasAutoFocus: t = !1,
    className: o,
    isDense: a = !0,
    hasDisabledGutters: s = !1,
    hasDivider: u = !1,
    focusVisibleClassName: c,
    id: i,
    children: l
  } = e;
  return /* @__PURE__ */ S(
    Un,
    {
      autoFocus: t,
      className: o,
      dense: a,
      disableGutters: s,
      divider: u,
      focusVisibleClassName: c,
      onClick: r,
      id: i,
      children: n || l
    }
  );
}
function it({ commandHandler: e, name: r, className: n, items: t, id: o }) {
  return /* @__PURE__ */ Ie(pn, { id: o, item: !0, xs: "auto", className: `papi-menu-column ${n ?? ""}`, children: [
    /* @__PURE__ */ S("h3", { className: `papi-menu ${n ?? ""}`, children: r }),
    t.map((a, s) => /* @__PURE__ */ S(
      st,
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
function ct({ commandHandler: e, className: r, columns: n, id: t }) {
  return /* @__PURE__ */ S(
    pn,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${r ?? ""}`,
      columns: n.length,
      id: t,
      children: n.map((o, a) => /* @__PURE__ */ S(
        it,
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
function ss({
  id: e,
  label: r,
  isDisabled: n = !1,
  tooltip: t,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: s = "medium",
  className: u,
  onClick: c,
  children: i
}) {
  return /* @__PURE__ */ S(
    hn,
    {
      id: e,
      disabled: n,
      edge: a,
      size: s,
      "aria-label": r,
      title: o ? void 0 : t ?? r,
      className: `papi-icon-button ${u ?? ""}`,
      onClick: c,
      children: i
    }
  );
}
var lt = Object.defineProperty, ut = (e, r, n) => r in e ? lt(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[r] = n, $ = (e, r, n) => (ut(e, typeof r != "symbol" ? r + "" : r, n), n);
const xe = [
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
], vr = [
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
], mn = [
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
], Pr = kt();
function Be(e, r = !0) {
  return r && (e = e.toUpperCase()), e in Pr ? Pr[e] : 0;
}
function kr(e) {
  return Be(e) > 0;
}
function dt(e) {
  const r = typeof e == "string" ? Be(e) : e;
  return r >= 40 && r <= 66;
}
function ft(e) {
  return (typeof e == "string" ? Be(e) : e) <= 39;
}
function gn(e) {
  return e <= 66;
}
function pt(e) {
  const r = typeof e == "string" ? Be(e) : e;
  return vn(r) && !gn(r);
}
function* ht() {
  for (let e = 1; e <= xe.length; e++)
    yield e;
}
const mt = 1, bn = xe.length;
function gt() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function xr(e, r = "***") {
  const n = e - 1;
  return n < 0 || n >= xe.length ? r : xe[n];
}
function yn(e) {
  return e <= 0 || e > bn ? "******" : mn[e - 1];
}
function bt(e) {
  return yn(Be(e));
}
function vn(e) {
  const r = typeof e == "number" ? xr(e) : e;
  return kr(r) && !vr.includes(r);
}
function yt(e) {
  const r = typeof e == "number" ? xr(e) : e;
  return kr(r) && vr.includes(r);
}
function vt(e) {
  return mn[e - 1].includes("*obsolete*");
}
function kt() {
  const e = {};
  for (let r = 0; r < xe.length; r++)
    e[xe[r]] = r + 1;
  return e;
}
const pe = {
  allBookIds: xe,
  nonCanonicalIds: vr,
  bookIdToNumber: Be,
  isBookIdValid: kr,
  isBookNT: dt,
  isBookOT: ft,
  isBookOTNT: gn,
  isBookDC: pt,
  allBookNumbers: ht,
  firstBook: mt,
  lastBook: bn,
  extraBooks: gt,
  bookNumberToId: xr,
  bookNumberToEnglishName: yn,
  bookIdToEnglishName: bt,
  isCanonical: vn,
  isExtraMaterial: yt,
  isObsolete: vt
};
var be = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(be || {});
const ke = class {
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
let oe = ke;
$(oe, "Original", new ke(be.Original)), $(oe, "Septuagint", new ke(be.Septuagint)), $(oe, "Vulgate", new ke(be.Vulgate)), $(oe, "English", new ke(be.English)), $(oe, "RussianProtestant", new ke(be.RussianProtestant)), $(oe, "RussianOrthodox", new ke(be.RussianOrthodox));
function Mr(e, r) {
  const n = r[0];
  for (let t = 1; t < r.length; t++)
    e = e.split(r[t]).join(n);
  return e.split(n);
}
var kn = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(kn || {});
const O = class {
  constructor(r, n, t, o) {
    if ($(this, "firstChapter"), $(this, "lastChapter"), $(this, "lastVerse"), $(this, "hasSegmentsDefined"), $(this, "text"), $(this, "BBBCCCVVVS"), $(this, "longHashCode"), $(this, "versification"), $(this, "rtlMark", "‏"), $(this, "_bookNum", 0), $(this, "_chapterNum", 0), $(this, "_verseNum", 0), $(this, "_verse"), t == null && o == null)
      if (r != null && typeof r == "string") {
        const a = r, s = n != null && n instanceof oe ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (r != null && typeof r == "number") {
        const a = n != null && n instanceof oe ? n : void 0;
        this.setEmpty(a), this._verseNum = r % O.chapterDigitShifter, this._chapterNum = Math.floor(
          r % O.bookDigitShifter / O.chapterDigitShifter
        ), this._bookNum = Math.floor(r / O.bookDigitShifter);
      } else if (n == null)
        if (r != null && r instanceof O) {
          const a = r;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (r == null)
            return;
          const a = r instanceof oe ? r : O.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (r != null && n != null && t != null)
      if (typeof r == "string" && typeof n == "string" && typeof t == "string")
        this.setEmpty(o), this.updateInternal(r, n, t);
      else if (typeof r == "number" && typeof n == "number" && typeof t == "number")
        this._bookNum = r, this._chapterNum = n, this._verseNum = t, this.versification = o ?? O.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(r, n = O.defaultVersification) {
    const t = new O(n);
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
      return n = O.parse(r), { success: !0, verseRef: n };
    } catch (t) {
      if (t instanceof De)
        return n = new O(), { success: !1, verseRef: n };
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
    return r % O.bcvMaxValue * O.bookDigitShifter + (n >= 0 ? n % O.bcvMaxValue * O.chapterDigitShifter : 0) + (t >= 0 ? t % O.bcvMaxValue : 0);
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
      if (n = n * 10 + +t - +"0", n > O.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(O.verseRangeSeparator) || this._verse.includes(O.verseSequenceIndicator));
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
    const { success: n, vNum: t } = O.tryGetVerseNum(r);
    this._verse = n ? void 0 : r.replace(this.rtlMark, ""), this._verseNum = t, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = O.tryGetVerseNum(this._verse));
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
    return this.validateVerse(O.verseRangeSeparators, O.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return O.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return O.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
    if (t.length !== 2 || pe.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !O.isVerseParseable(t[1]))
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
    return new O(this);
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
  allVerses(r = !1, n = O.verseRangeSeparators, t = O.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = Mr(this._verse, t);
    for (const s of a.map((u) => Mr(u, n))) {
      const u = this.clone();
      u.verse = s[0];
      const c = u.verseNum;
      if (o.push(u), s.length > 1) {
        const i = this.clone();
        if (i.verse = s[1], !r)
          for (let l = c + 1; l < i.verseNum; l++) {
            const p = new O(
              this._bookNum,
              this._chapterNum,
              l,
              this.versification
            );
            this.isExcluded || o.push(p);
          }
        o.push(i);
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
  setEmpty(r = O.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = r;
  }
  updateInternal(r, n, t) {
    this.bookNum = pe.bookIdToNumber(r), this.chapter = n, this.verse = t;
  }
};
let fe = O;
$(fe, "defaultVersification", oe.English), $(fe, "verseRangeSeparator", "-"), $(fe, "verseSequenceIndicator", ","), $(fe, "verseRangeSeparators", [O.verseRangeSeparator]), $(fe, "verseSequenceIndicators", [O.verseSequenceIndicator]), $(fe, "chapterDigitShifter", 1e3), $(fe, "bookDigitShifter", O.chapterDigitShifter * O.chapterDigitShifter), $(fe, "bcvMaxValue", O.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
$(fe, "ValidStatusType", kn);
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
let sr;
const ir = () => (sr || (sr = pe.allBookIds.map((e) => ({
  bookId: e,
  label: pe.bookIdToEnglishName(e)
}))), sr), Sn = 1, xt = xn.length - 1, Nn = 1, En = 1, wn = (e) => {
  var r;
  return ((r = xn[e]) == null ? void 0 : r.chapters) ?? -1;
}, Ir = (e, r) => ({
  bookNum: Math.max(Sn, Math.min(e.bookNum + r, xt)),
  chapterNum: 1,
  verseNum: 1
}), Br = (e, r) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(Nn, e.chapterNum + r),
    wn(e.bookNum)
  ),
  verseNum: 1
}), Dr = (e, r) => ({
  ...e,
  verseNum: Math.max(En, e.verseNum + r)
});
function We({
  variant: e = "outlined",
  id: r,
  isDisabled: n = !1,
  hasError: t = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: u,
  isRequired: c = !1,
  className: i,
  defaultValue: l,
  value: p,
  onChange: d,
  onFocus: v,
  onBlur: b
}) {
  return /* @__PURE__ */ S(
    fn,
    {
      variant: e,
      id: r,
      disabled: n,
      error: t,
      fullWidth: o,
      helperText: a,
      label: s,
      placeholder: u,
      required: c,
      className: `papi-textfield ${i ?? ""}`,
      defaultValue: l,
      value: p,
      onChange: d,
      onFocus: v,
      onBlur: b
    }
  );
}
function cs({ scrRef: e, handleSubmit: r, id: n }) {
  const t = (c) => {
    r(c);
  }, o = (c, i) => {
    const p = { bookNum: pe.bookIdToNumber(i.bookId), chapterNum: 1, verseNum: 1 };
    t(p);
  }, a = (c) => {
    r({ ...e, chapterNum: +c.target.value });
  }, s = (c) => {
    r({ ...e, verseNum: +c.target.value });
  }, u = yr(() => ir()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ Ie("span", { id: n, children: [
    /* @__PURE__ */ S(
      mr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: u,
        options: ir(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ S(
      Ee,
      {
        onClick: () => t(Ir(e, -1)),
        isDisabled: e.bookNum <= Sn,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(
      Ee,
      {
        onClick: () => t(Ir(e, 1)),
        isDisabled: e.bookNum >= ir().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ S(
      We,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ S(
      Ee,
      {
        onClick: () => r(Br(e, -1)),
        isDisabled: e.chapterNum <= Nn,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(
      Ee,
      {
        onClick: () => r(Br(e, 1)),
        isDisabled: e.chapterNum >= wn(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ S(
      We,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ S(
      Ee,
      {
        onClick: () => r(Dr(e, -1)),
        isDisabled: e.verseNum <= En,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(Ee, { onClick: () => r(Dr(e, 1)), children: ">" })
  ] });
}
function ls({ onSearch: e, placeholder: r, isFullWidth: n }) {
  const [t, o] = Ke(""), a = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ S(Jn, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ S(
    We,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: r,
      value: t,
      onChange: (s) => a(s.target.value)
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
  showMarks: s = !1,
  defaultValue: u,
  value: c,
  valueLabelDisplay: i = "off",
  className: l,
  onChange: p,
  onChangeCommitted: d
}) {
  return /* @__PURE__ */ S(
    Gn,
    {
      id: e,
      disabled: r,
      orientation: n,
      min: t,
      max: o,
      step: a,
      marks: s,
      defaultValue: u,
      value: c,
      valueLabelDisplay: i,
      className: `papi-slider ${n} ${l ?? ""}`,
      onChange: p,
      onChangeCommitted: d
    }
  );
}
function ds({
  autoHideDuration: e = null,
  id: r,
  isOpen: n = !1,
  className: t,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: u
}) {
  const c = {
    action: (s == null ? void 0 : s.action) || u,
    message: s == null ? void 0 : s.message,
    className: t
  };
  return /* @__PURE__ */ S(
    Kn,
    {
      autoHideDuration: e,
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
  return /* @__PURE__ */ S(
    qn,
    {
      id: e,
      checked: r,
      disabled: n,
      className: `papi-switch ${t ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function jr({ onRowChange: e, row: r, column: n }) {
  const t = (o) => {
    e({ ...r, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ S(We, { defaultValue: r[n.key], onChange: t });
}
const St = ({ onChange: e, disabled: r, checked: n, ...t }) => /* @__PURE__ */ S(
  at,
  {
    ...t,
    isChecked: n,
    isDisabled: r,
    onChange: (a) => {
      e(a.target.checked, a.nativeEvent.shiftKey);
    }
  }
);
function ps({
  columns: e,
  sortColumns: r,
  onSortColumnsChange: n,
  onColumnResize: t,
  defaultColumnWidth: o,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: u = !0,
  defaultColumnResizable: c = !0,
  rows: i,
  enableSelectColumn: l,
  selectColumnWidth: p = 50,
  rowKeyGetter: d,
  rowHeight: v = 35,
  headerRowHeight: b = 35,
  selectedRows: h,
  onSelectedRowsChange: f,
  onRowsChange: N,
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
  const le = yr(() => {
    const Q = e.map((q) => typeof q.editable == "function" ? {
      ...q,
      editable: (se) => !!q.editable(se),
      renderEditCell: q.renderEditCell || jr
    } : q.editable && !q.renderEditCell ? { ...q, renderEditCell: jr } : q.renderEditCell && !q.editable ? { ...q, editable: !1 } : q);
    return l ? [{ ...rt, minWidth: p }, ...Q] : Q;
  }, [e, l, p]);
  return /* @__PURE__ */ S(
    et,
    {
      columns: le,
      defaultColumnOptions: {
        width: o,
        minWidth: a,
        maxWidth: s,
        sortable: u,
        resizable: c
      },
      sortColumns: r,
      onSortColumnsChange: n,
      onColumnResize: t,
      rows: i,
      rowKeyGetter: d,
      rowHeight: v,
      headerRowHeight: b,
      selectedRows: h,
      onSelectedRowsChange: f,
      onRowsChange: N,
      onCellClick: W,
      onCellDoubleClick: B,
      onCellContextMenu: R,
      onCellKeyDown: m,
      direction: X,
      enableVirtualization: ne,
      onCopy: ie,
      onPaste: ae,
      onScroll: D,
      renderers: { renderCheckbox: St },
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
function Tn(e) {
  if (!Re(e))
    return e;
  const r = {};
  return Object.keys(e).forEach((n) => {
    r[n] = Tn(e[n]);
  }), r;
}
function he(e, r, n = {
  clone: !0
}) {
  const t = n.clone ? A({}, e) : e;
  return Re(e) && Re(r) && Object.keys(r).forEach((o) => {
    o !== "__proto__" && (Re(r[o]) && o in e && Re(e[o]) ? t[o] = he(e[o], r[o], n) : n.clone ? t[o] = Re(r[o]) ? Tn(r[o]) : r[o] : t[o] = r[o]);
  }), t;
}
function Nt(e) {
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
var zr;
function Et() {
  if (zr)
    return z;
  zr = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, i = e ? Symbol.for("react.concurrent_mode") : 60111, l = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, N = e ? Symbol.for("react.responder") : 60118, W = e ? Symbol.for("react.scope") : 60119;
  function B(m) {
    if (typeof m == "object" && m !== null) {
      var X = m.$$typeof;
      switch (X) {
        case r:
          switch (m = m.type, m) {
            case c:
            case i:
            case t:
            case a:
            case o:
            case p:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case u:
                case l:
                case b:
                case v:
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
    return B(m) === i;
  }
  return z.AsyncMode = c, z.ConcurrentMode = i, z.ContextConsumer = u, z.ContextProvider = s, z.Element = r, z.ForwardRef = l, z.Fragment = t, z.Lazy = b, z.Memo = v, z.Portal = n, z.Profiler = a, z.StrictMode = o, z.Suspense = p, z.isAsyncMode = function(m) {
    return R(m) || B(m) === c;
  }, z.isConcurrentMode = R, z.isContextConsumer = function(m) {
    return B(m) === u;
  }, z.isContextProvider = function(m) {
    return B(m) === s;
  }, z.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === r;
  }, z.isForwardRef = function(m) {
    return B(m) === l;
  }, z.isFragment = function(m) {
    return B(m) === t;
  }, z.isLazy = function(m) {
    return B(m) === b;
  }, z.isMemo = function(m) {
    return B(m) === v;
  }, z.isPortal = function(m) {
    return B(m) === n;
  }, z.isProfiler = function(m) {
    return B(m) === a;
  }, z.isStrictMode = function(m) {
    return B(m) === o;
  }, z.isSuspense = function(m) {
    return B(m) === p;
  }, z.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === t || m === i || m === a || m === o || m === p || m === d || typeof m == "object" && m !== null && (m.$$typeof === b || m.$$typeof === v || m.$$typeof === s || m.$$typeof === u || m.$$typeof === l || m.$$typeof === f || m.$$typeof === N || m.$$typeof === W || m.$$typeof === h);
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
var Vr;
function wt() {
  return Vr || (Vr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, i = e ? Symbol.for("react.concurrent_mode") : 60111, l = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, N = e ? Symbol.for("react.responder") : 60118, W = e ? Symbol.for("react.scope") : 60119;
    function B(y) {
      return typeof y == "string" || typeof y == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      y === t || y === i || y === a || y === o || y === p || y === d || typeof y == "object" && y !== null && (y.$$typeof === b || y.$$typeof === v || y.$$typeof === s || y.$$typeof === u || y.$$typeof === l || y.$$typeof === f || y.$$typeof === N || y.$$typeof === W || y.$$typeof === h);
    }
    function R(y) {
      if (typeof y == "object" && y !== null) {
        var te = y.$$typeof;
        switch (te) {
          case r:
            var x = y.type;
            switch (x) {
              case c:
              case i:
              case t:
              case a:
              case o:
              case p:
                return x;
              default:
                var Ne = x && x.$$typeof;
                switch (Ne) {
                  case u:
                  case l:
                  case b:
                  case v:
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
    var m = c, X = i, ne = u, ie = s, ae = r, D = l, Y = t, ce = b, le = v, Q = n, q = a, ee = o, se = p, ve = !1;
    function Se(y) {
      return ve || (ve = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), g(y) || R(y) === c;
    }
    function g(y) {
      return R(y) === i;
    }
    function k(y) {
      return R(y) === u;
    }
    function _(y) {
      return R(y) === s;
    }
    function T(y) {
      return typeof y == "object" && y !== null && y.$$typeof === r;
    }
    function E(y) {
      return R(y) === l;
    }
    function P(y) {
      return R(y) === t;
    }
    function w(y) {
      return R(y) === b;
    }
    function C(y) {
      return R(y) === v;
    }
    function M(y) {
      return R(y) === n;
    }
    function j(y) {
      return R(y) === a;
    }
    function I(y) {
      return R(y) === o;
    }
    function Z(y) {
      return R(y) === p;
    }
    V.AsyncMode = m, V.ConcurrentMode = X, V.ContextConsumer = ne, V.ContextProvider = ie, V.Element = ae, V.ForwardRef = D, V.Fragment = Y, V.Lazy = ce, V.Memo = le, V.Portal = Q, V.Profiler = q, V.StrictMode = ee, V.Suspense = se, V.isAsyncMode = Se, V.isConcurrentMode = g, V.isContextConsumer = k, V.isContextProvider = _, V.isElement = T, V.isForwardRef = E, V.isFragment = P, V.isLazy = w, V.isMemo = C, V.isPortal = M, V.isProfiler = j, V.isStrictMode = I, V.isSuspense = Z, V.isValidElementType = B, V.typeOf = R;
  }()), V;
}
var Lr;
function Cn() {
  return Lr || (Lr = 1, process.env.NODE_ENV === "production" ? Ge.exports = Et() : Ge.exports = wt()), Ge.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var cr, Fr;
function Tt() {
  if (Fr)
    return cr;
  Fr = 1;
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
      for (var s = {}, u = 0; u < 10; u++)
        s["_" + String.fromCharCode(u)] = u;
      var c = Object.getOwnPropertyNames(s).map(function(l) {
        return s[l];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var i = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(l) {
        i[l] = l;
      }), Object.keys(Object.assign({}, i)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return cr = o() ? Object.assign : function(a, s) {
    for (var u, c = t(a), i, l = 1; l < arguments.length; l++) {
      u = Object(arguments[l]);
      for (var p in u)
        r.call(u, p) && (c[p] = u[p]);
      if (e) {
        i = e(u);
        for (var d = 0; d < i.length; d++)
          n.call(u, i[d]) && (c[i[d]] = u[i[d]]);
      }
    }
    return c;
  }, cr;
}
var lr, Hr;
function Sr() {
  if (Hr)
    return lr;
  Hr = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return lr = e, lr;
}
var ur, Ur;
function _n() {
  return Ur || (Ur = 1, ur = Function.call.bind(Object.prototype.hasOwnProperty)), ur;
}
var dr, Jr;
function Ct() {
  if (Jr)
    return dr;
  Jr = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = Sr(), n = {}, t = _n();
    e = function(a) {
      var s = "Warning: " + a;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(a, s, u, c, i) {
    if (process.env.NODE_ENV !== "production") {
      for (var l in a)
        if (t(a, l)) {
          var p;
          try {
            if (typeof a[l] != "function") {
              var d = Error(
                (c || "React class") + ": " + u + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            p = a[l](s, l, c, u, null, r);
          } catch (b) {
            p = b;
          }
          if (p && !(p instanceof Error) && e(
            (c || "React class") + ": type specification of " + u + " `" + l + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in n)) {
            n[p.message] = !0;
            var v = i ? i() : "";
            e(
              "Failed " + u + " type: " + p.message + (v ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, dr = o, dr;
}
var fr, Gr;
function _t() {
  if (Gr)
    return fr;
  Gr = 1;
  var e = Cn(), r = Tt(), n = Sr(), t = _n(), o = Ct(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(u) {
    var c = "Warning: " + u;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return fr = function(u, c) {
    var i = typeof Symbol == "function" && Symbol.iterator, l = "@@iterator";
    function p(g) {
      var k = g && (i && g[i] || g[l]);
      if (typeof k == "function")
        return k;
    }
    var d = "<<anonymous>>", v = {
      array: N("array"),
      bigint: N("bigint"),
      bool: N("boolean"),
      func: N("function"),
      number: N("number"),
      object: N("object"),
      string: N("string"),
      symbol: N("symbol"),
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
    function b(g, k) {
      return g === k ? g !== 0 || 1 / g === 1 / k : g !== g && k !== k;
    }
    function h(g, k) {
      this.message = g, this.data = k && typeof k == "object" ? k : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function f(g) {
      if (process.env.NODE_ENV !== "production")
        var k = {}, _ = 0;
      function T(P, w, C, M, j, I, Z) {
        if (M = M || d, I = I || C, Z !== n) {
          if (c) {
            var y = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw y.name = "Invariant Violation", y;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var te = M + ":" + C;
            !k[te] && // Avoid spamming the console because they are often not actionable except for lib authors
            _ < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + I + "` prop on `" + M + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), k[te] = !0, _++);
          }
        }
        return w[C] == null ? P ? w[C] === null ? new h("The " + j + " `" + I + "` is marked as required " + ("in `" + M + "`, but its value is `null`.")) : new h("The " + j + " `" + I + "` is marked as required in " + ("`" + M + "`, but its value is `undefined`.")) : null : g(w, C, M, j, I);
      }
      var E = T.bind(null, !1);
      return E.isRequired = T.bind(null, !0), E;
    }
    function N(g) {
      function k(_, T, E, P, w, C) {
        var M = _[T], j = ee(M);
        if (j !== g) {
          var I = se(M);
          return new h(
            "Invalid " + P + " `" + w + "` of type " + ("`" + I + "` supplied to `" + E + "`, expected ") + ("`" + g + "`."),
            { expectedType: g }
          );
        }
        return null;
      }
      return f(k);
    }
    function W() {
      return f(s);
    }
    function B(g) {
      function k(_, T, E, P, w) {
        if (typeof g != "function")
          return new h("Property `" + w + "` of component `" + E + "` has invalid PropType notation inside arrayOf.");
        var C = _[T];
        if (!Array.isArray(C)) {
          var M = ee(C);
          return new h("Invalid " + P + " `" + w + "` of type " + ("`" + M + "` supplied to `" + E + "`, expected an array."));
        }
        for (var j = 0; j < C.length; j++) {
          var I = g(C, j, E, P, w + "[" + j + "]", n);
          if (I instanceof Error)
            return I;
        }
        return null;
      }
      return f(k);
    }
    function R() {
      function g(k, _, T, E, P) {
        var w = k[_];
        if (!u(w)) {
          var C = ee(w);
          return new h("Invalid " + E + " `" + P + "` of type " + ("`" + C + "` supplied to `" + T + "`, expected a single ReactElement."));
        }
        return null;
      }
      return f(g);
    }
    function m() {
      function g(k, _, T, E, P) {
        var w = k[_];
        if (!e.isValidElementType(w)) {
          var C = ee(w);
          return new h("Invalid " + E + " `" + P + "` of type " + ("`" + C + "` supplied to `" + T + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return f(g);
    }
    function X(g) {
      function k(_, T, E, P, w) {
        if (!(_[T] instanceof g)) {
          var C = g.name || d, M = Se(_[T]);
          return new h("Invalid " + P + " `" + w + "` of type " + ("`" + M + "` supplied to `" + E + "`, expected ") + ("instance of `" + C + "`."));
        }
        return null;
      }
      return f(k);
    }
    function ne(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function k(_, T, E, P, w) {
        for (var C = _[T], M = 0; M < g.length; M++)
          if (b(C, g[M]))
            return null;
        var j = JSON.stringify(g, function(Z, y) {
          var te = se(y);
          return te === "symbol" ? String(y) : y;
        });
        return new h("Invalid " + P + " `" + w + "` of value `" + String(C) + "` " + ("supplied to `" + E + "`, expected one of " + j + "."));
      }
      return f(k);
    }
    function ie(g) {
      function k(_, T, E, P, w) {
        if (typeof g != "function")
          return new h("Property `" + w + "` of component `" + E + "` has invalid PropType notation inside objectOf.");
        var C = _[T], M = ee(C);
        if (M !== "object")
          return new h("Invalid " + P + " `" + w + "` of type " + ("`" + M + "` supplied to `" + E + "`, expected an object."));
        for (var j in C)
          if (t(C, j)) {
            var I = g(C, j, E, P, w + "." + j, n);
            if (I instanceof Error)
              return I;
          }
        return null;
      }
      return f(k);
    }
    function ae(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var k = 0; k < g.length; k++) {
        var _ = g[k];
        if (typeof _ != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ve(_) + " at index " + k + "."
          ), s;
      }
      function T(E, P, w, C, M) {
        for (var j = [], I = 0; I < g.length; I++) {
          var Z = g[I], y = Z(E, P, w, C, M, n);
          if (y == null)
            return null;
          y.data && t(y.data, "expectedType") && j.push(y.data.expectedType);
        }
        var te = j.length > 0 ? ", expected one of type [" + j.join(", ") + "]" : "";
        return new h("Invalid " + C + " `" + M + "` supplied to " + ("`" + w + "`" + te + "."));
      }
      return f(T);
    }
    function D() {
      function g(k, _, T, E, P) {
        return Q(k[_]) ? null : new h("Invalid " + E + " `" + P + "` supplied to " + ("`" + T + "`, expected a ReactNode."));
      }
      return f(g);
    }
    function Y(g, k, _, T, E) {
      return new h(
        (g || "React class") + ": " + k + " type `" + _ + "." + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + E + "`."
      );
    }
    function ce(g) {
      function k(_, T, E, P, w) {
        var C = _[T], M = ee(C);
        if (M !== "object")
          return new h("Invalid " + P + " `" + w + "` of type `" + M + "` " + ("supplied to `" + E + "`, expected `object`."));
        for (var j in g) {
          var I = g[j];
          if (typeof I != "function")
            return Y(E, P, w, j, se(I));
          var Z = I(C, j, E, P, w + "." + j, n);
          if (Z)
            return Z;
        }
        return null;
      }
      return f(k);
    }
    function le(g) {
      function k(_, T, E, P, w) {
        var C = _[T], M = ee(C);
        if (M !== "object")
          return new h("Invalid " + P + " `" + w + "` of type `" + M + "` " + ("supplied to `" + E + "`, expected `object`."));
        var j = r({}, _[T], g);
        for (var I in j) {
          var Z = g[I];
          if (t(g, I) && typeof Z != "function")
            return Y(E, P, w, I, se(Z));
          if (!Z)
            return new h(
              "Invalid " + P + " `" + w + "` key `" + I + "` supplied to `" + E + "`.\nBad object: " + JSON.stringify(_[T], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(g), null, "  ")
            );
          var y = Z(C, I, E, P, w + "." + I, n);
          if (y)
            return y;
        }
        return null;
      }
      return f(k);
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
          if (g === null || u(g))
            return !0;
          var k = p(g);
          if (k) {
            var _ = k.call(g), T;
            if (k !== g.entries) {
              for (; !(T = _.next()).done; )
                if (!Q(T.value))
                  return !1;
            } else
              for (; !(T = _.next()).done; ) {
                var E = T.value;
                if (E && !Q(E[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function q(g, k) {
      return g === "symbol" ? !0 : k ? k["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && k instanceof Symbol : !1;
    }
    function ee(g) {
      var k = typeof g;
      return Array.isArray(g) ? "array" : g instanceof RegExp ? "object" : q(k, g) ? "symbol" : k;
    }
    function se(g) {
      if (typeof g > "u" || g === null)
        return "" + g;
      var k = ee(g);
      if (k === "object") {
        if (g instanceof Date)
          return "date";
        if (g instanceof RegExp)
          return "regexp";
      }
      return k;
    }
    function ve(g) {
      var k = se(g);
      switch (k) {
        case "array":
        case "object":
          return "an " + k;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + k;
        default:
          return k;
      }
    }
    function Se(g) {
      return !g.constructor || !g.constructor.name ? d : g.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, fr;
}
var pr, Kr;
function Ot() {
  if (Kr)
    return pr;
  Kr = 1;
  var e = Sr();
  function r() {
  }
  function n() {
  }
  return n.resetWarningCache = r, pr = function() {
    function t(s, u, c, i, l, p) {
      if (p !== e) {
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
      checkPropTypes: n,
      resetWarningCache: r
    };
    return a.PropTypes = a, a;
  }, pr;
}
if (process.env.NODE_ENV !== "production") {
  var $t = Cn(), Rt = !0;
  gr.exports = _t()($t.isElement, Rt);
} else
  gr.exports = Ot()();
var At = gr.exports;
const U = /* @__PURE__ */ Nt(At);
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
var qr;
function Pt() {
  if (qr)
    return L;
  qr = 1;
  var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), u = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), i = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), b;
  b = Symbol.for("react.module.reference");
  function h(f) {
    if (typeof f == "object" && f !== null) {
      var N = f.$$typeof;
      switch (N) {
        case e:
          switch (f = f.type, f) {
            case n:
            case o:
            case t:
            case i:
            case l:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case u:
                case s:
                case c:
                case d:
                case p:
                case a:
                  return f;
                default:
                  return N;
              }
          }
        case r:
          return N;
      }
    }
  }
  return L.ContextConsumer = s, L.ContextProvider = a, L.Element = e, L.ForwardRef = c, L.Fragment = n, L.Lazy = d, L.Memo = p, L.Portal = r, L.Profiler = o, L.StrictMode = t, L.Suspense = i, L.SuspenseList = l, L.isAsyncMode = function() {
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
    return h(f) === c;
  }, L.isFragment = function(f) {
    return h(f) === n;
  }, L.isLazy = function(f) {
    return h(f) === d;
  }, L.isMemo = function(f) {
    return h(f) === p;
  }, L.isPortal = function(f) {
    return h(f) === r;
  }, L.isProfiler = function(f) {
    return h(f) === o;
  }, L.isStrictMode = function(f) {
    return h(f) === t;
  }, L.isSuspense = function(f) {
    return h(f) === i;
  }, L.isSuspenseList = function(f) {
    return h(f) === l;
  }, L.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === n || f === o || f === t || f === i || f === l || f === v || typeof f == "object" && f !== null && (f.$$typeof === d || f.$$typeof === p || f.$$typeof === a || f.$$typeof === s || f.$$typeof === c || f.$$typeof === b || f.getModuleId !== void 0);
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
var Wr;
function Mt() {
  return Wr || (Wr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), u = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), i = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), b = !1, h = !1, f = !1, N = !1, W = !1, B;
    B = Symbol.for("react.module.reference");
    function R(x) {
      return !!(typeof x == "string" || typeof x == "function" || x === n || x === o || W || x === t || x === i || x === l || N || x === v || b || h || f || typeof x == "object" && x !== null && (x.$$typeof === d || x.$$typeof === p || x.$$typeof === a || x.$$typeof === s || x.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      x.$$typeof === B || x.getModuleId !== void 0));
    }
    function m(x) {
      if (typeof x == "object" && x !== null) {
        var Ne = x.$$typeof;
        switch (Ne) {
          case e:
            var Je = x.type;
            switch (Je) {
              case n:
              case o:
              case t:
              case i:
              case l:
                return Je;
              default:
                var Rr = Je && Je.$$typeof;
                switch (Rr) {
                  case u:
                  case s:
                  case c:
                  case d:
                  case p:
                  case a:
                    return Rr;
                  default:
                    return Ne;
                }
            }
          case r:
            return Ne;
        }
      }
    }
    var X = s, ne = a, ie = e, ae = c, D = n, Y = d, ce = p, le = r, Q = o, q = t, ee = i, se = l, ve = !1, Se = !1;
    function g(x) {
      return ve || (ve = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function k(x) {
      return Se || (Se = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function _(x) {
      return m(x) === s;
    }
    function T(x) {
      return m(x) === a;
    }
    function E(x) {
      return typeof x == "object" && x !== null && x.$$typeof === e;
    }
    function P(x) {
      return m(x) === c;
    }
    function w(x) {
      return m(x) === n;
    }
    function C(x) {
      return m(x) === d;
    }
    function M(x) {
      return m(x) === p;
    }
    function j(x) {
      return m(x) === r;
    }
    function I(x) {
      return m(x) === o;
    }
    function Z(x) {
      return m(x) === t;
    }
    function y(x) {
      return m(x) === i;
    }
    function te(x) {
      return m(x) === l;
    }
    F.ContextConsumer = X, F.ContextProvider = ne, F.Element = ie, F.ForwardRef = ae, F.Fragment = D, F.Lazy = Y, F.Memo = ce, F.Portal = le, F.Profiler = Q, F.StrictMode = q, F.Suspense = ee, F.SuspenseList = se, F.isAsyncMode = g, F.isConcurrentMode = k, F.isContextConsumer = _, F.isContextProvider = T, F.isElement = E, F.isForwardRef = P, F.isFragment = w, F.isLazy = C, F.isMemo = M, F.isPortal = j, F.isProfiler = I, F.isStrictMode = Z, F.isSuspense = y, F.isSuspenseList = te, F.isValidElementType = R, F.typeOf = m;
  }()), F;
}
process.env.NODE_ENV === "production" ? br.exports = Pt() : br.exports = Mt();
var Xr = br.exports;
const It = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Bt(e) {
  const r = `${e}`.match(It);
  return r && r[1] || "";
}
function On(e, r = "") {
  return e.displayName || e.name || Bt(e) || r;
}
function Yr(e, r, n) {
  const t = On(r);
  return e.displayName || (t !== "" ? `${n}(${t})` : n);
}
function Dt(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return On(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Xr.ForwardRef:
          return Yr(e, e.render, "ForwardRef");
        case Xr.Memo:
          return Yr(e, e.type, "memo");
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
function $n(e, r) {
  const n = A({}, r);
  return Object.keys(e).forEach((t) => {
    if (t.toString().match(/^(components|slots)$/))
      n[t] = A({}, e[t], n[t]);
    else if (t.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[t] || {}, a = r[t];
      n[t] = {}, !a || !Object.keys(a) ? n[t] = o : !o || !Object.keys(o) ? n[t] = a : (n[t] = A({}, a), Object.keys(o).forEach((s) => {
        n[t][s] = $n(o[s], a[s]);
      }));
    } else
      n[t] === void 0 && (n[t] = e[t]);
  }), n;
}
function jt(e, r, n = void 0) {
  const t = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      t[o] = e[o].reduce((a, s) => {
        if (s) {
          const u = r(s);
          u !== "" && a.push(u), n && n[s] && a.push(n[s]);
        }
        return a;
      }, []).join(" ");
    }
  ), t;
}
const Zr = (e) => e, zt = () => {
  let e = Zr;
  return {
    configure(r) {
      e = r;
    },
    generate(r) {
      return e(r);
    },
    reset() {
      e = Zr;
    }
  };
}, Vt = zt(), Lt = Vt, Ft = {
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
function Nr(e, r, n = "Mui") {
  const t = Ft[r];
  return t ? `${n}-${t}` : `${Lt.generate(e)}-${r}`;
}
function Ht(e, r, n = "Mui") {
  const t = {};
  return r.forEach((o) => {
    t[o] = Nr(e, o, n);
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
function Rn(e) {
  var r, n, t = "";
  if (typeof e == "string" || typeof e == "number")
    t += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (r = 0; r < e.length; r++)
        e[r] && (n = Rn(e[r])) && (t && (t += " "), t += n);
    else
      for (r in e)
        e[r] && (t && (t += " "), t += r);
  return t;
}
function Ut() {
  for (var e, r, n = 0, t = ""; n < arguments.length; )
    (e = arguments[n++]) && (r = Rn(e)) && (t && (t += " "), t += r);
  return t;
}
const Jt = ["values", "unit", "step"], Gt = (e) => {
  const r = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return r.sort((n, t) => n.val - t.val), r.reduce((n, t) => A({}, n, {
    [t.key]: t.val
  }), {});
};
function Kt(e) {
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
  } = e, o = ge(e, Jt), a = Gt(r), s = Object.keys(a);
  function u(d) {
    return `@media (min-width:${typeof r[d] == "number" ? r[d] : d}${n})`;
  }
  function c(d) {
    return `@media (max-width:${(typeof r[d] == "number" ? r[d] : d) - t / 100}${n})`;
  }
  function i(d, v) {
    const b = s.indexOf(v);
    return `@media (min-width:${typeof r[d] == "number" ? r[d] : d}${n}) and (max-width:${(b !== -1 && typeof r[s[b]] == "number" ? r[s[b]] : v) - t / 100}${n})`;
  }
  function l(d) {
    return s.indexOf(d) + 1 < s.length ? i(d, s[s.indexOf(d) + 1]) : u(d);
  }
  function p(d) {
    const v = s.indexOf(d);
    return v === 0 ? u(s[1]) : v === s.length - 1 ? c(s[v]) : i(d, s[s.indexOf(d) + 1]).replace("@media", "@media not all and");
  }
  return A({
    keys: s,
    values: a,
    up: u,
    down: c,
    between: i,
    only: l,
    not: p,
    unit: n
  }, o);
}
const qt = {
  borderRadius: 4
}, Wt = qt, Xt = process.env.NODE_ENV !== "production" ? U.oneOfType([U.number, U.string, U.object, U.array]) : {}, ye = Xt;
function Ve(e, r) {
  return r ? he(e, r, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Er = {
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
}, Qr = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Er[e]}px)`
};
function me(e, r, n) {
  const t = e.theme || {};
  if (Array.isArray(r)) {
    const a = t.breakpoints || Qr;
    return r.reduce((s, u, c) => (s[a.up(a.keys[c])] = n(r[c]), s), {});
  }
  if (typeof r == "object") {
    const a = t.breakpoints || Qr;
    return Object.keys(r).reduce((s, u) => {
      if (Object.keys(a.values || Er).indexOf(u) !== -1) {
        const c = a.up(u);
        s[c] = n(r[u], u);
      } else {
        const c = u;
        s[c] = r[c];
      }
      return s;
    }, {});
  }
  return n(r);
}
function Yt(e = {}) {
  var r;
  return ((r = e.keys) == null ? void 0 : r.reduce((t, o) => {
    const a = e.up(o);
    return t[a] = {}, t;
  }, {})) || {};
}
function Zt(e, r) {
  return e.reduce((n, t) => {
    const o = n[t];
    return (!o || Object.keys(o).length === 0) && delete n[t], n;
  }, r);
}
function Ye(e, r, n = !0) {
  if (!r || typeof r != "string")
    return null;
  if (e && e.vars && n) {
    const t = `vars.${r}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (t != null)
      return t;
  }
  return r.split(".").reduce((t, o) => t && t[o] != null ? t[o] : null, e);
}
function Xe(e, r, n, t = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || t : o = Ye(e, n) || t, r && (o = r(o, t, e)), o;
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
    const u = s[r], c = s.theme, i = Ye(c, t) || {};
    return me(s, u, (p) => {
      let d = Xe(i, o, p);
      return p === d && typeof p == "string" && (d = Xe(i, o, `${r}${p === "default" ? "" : de(p)}`, p)), n === !1 ? d : {
        [n]: d
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [r]: ye
  } : {}, a.filterProps = [r], a;
}
function Qt(e) {
  const r = {};
  return (n) => (r[n] === void 0 && (r[n] = e(n)), r[n]);
}
const eo = {
  m: "margin",
  p: "padding"
}, ro = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, en = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, no = Qt((e) => {
  if (e.length > 2)
    if (en[e])
      e = en[e];
    else
      return [e];
  const [r, n] = e.split(""), t = eo[r], o = ro[n] || "";
  return Array.isArray(o) ? o.map((a) => t + a) : [t + o];
}), Ze = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Qe = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], to = [...Ze, ...Qe];
function He(e, r, n, t) {
  var o;
  const a = (o = Ye(e, r, !1)) != null ? o : n;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${t} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${r}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function An(e) {
  return He(e, "spacing", 8, "spacing");
}
function Ue(e, r) {
  if (typeof r == "string" || r == null)
    return r;
  const n = Math.abs(r), t = e(n);
  return r >= 0 ? t : typeof t == "number" ? -t : `-${t}`;
}
function oo(e, r) {
  return (n) => e.reduce((t, o) => (t[o] = Ue(r, n), t), {});
}
function ao(e, r, n, t) {
  if (r.indexOf(n) === -1)
    return null;
  const o = no(n), a = oo(o, t), s = e[n];
  return me(e, s, a);
}
function Pn(e, r) {
  const n = An(e.theme);
  return Object.keys(e).map((t) => ao(e, r, t, n)).reduce(Ve, {});
}
function G(e) {
  return Pn(e, Ze);
}
G.propTypes = process.env.NODE_ENV !== "production" ? Ze.reduce((e, r) => (e[r] = ye, e), {}) : {};
G.filterProps = Ze;
function K(e) {
  return Pn(e, Qe);
}
K.propTypes = process.env.NODE_ENV !== "production" ? Qe.reduce((e, r) => (e[r] = ye, e), {}) : {};
K.filterProps = Qe;
process.env.NODE_ENV !== "production" && to.reduce((e, r) => (e[r] = ye, e), {});
function so(e = 8) {
  if (e.mui)
    return e;
  const r = An({
    spacing: e
  }), n = (...t) => (process.env.NODE_ENV !== "production" && (t.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)), (t.length === 0 ? [1] : t).map((a) => {
    const s = r(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function er(...e) {
  const r = e.reduce((t, o) => (o.filterProps.forEach((a) => {
    t[a] = o;
  }), t), {}), n = (t) => Object.keys(t).reduce((o, a) => r[a] ? Ve(o, r[a](t)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((t, o) => Object.assign(t, o.propTypes), {}) : {}, n.filterProps = e.reduce((t, o) => t.concat(o.filterProps), []), n;
}
function ue(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
const io = H({
  prop: "border",
  themeKey: "borders",
  transform: ue
}), co = H({
  prop: "borderTop",
  themeKey: "borders",
  transform: ue
}), lo = H({
  prop: "borderRight",
  themeKey: "borders",
  transform: ue
}), uo = H({
  prop: "borderBottom",
  themeKey: "borders",
  transform: ue
}), fo = H({
  prop: "borderLeft",
  themeKey: "borders",
  transform: ue
}), po = H({
  prop: "borderColor",
  themeKey: "palette"
}), ho = H({
  prop: "borderTopColor",
  themeKey: "palette"
}), mo = H({
  prop: "borderRightColor",
  themeKey: "palette"
}), go = H({
  prop: "borderBottomColor",
  themeKey: "palette"
}), bo = H({
  prop: "borderLeftColor",
  themeKey: "palette"
}), rr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const r = He(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (t) => ({
      borderRadius: Ue(r, t)
    });
    return me(e, e.borderRadius, n);
  }
  return null;
};
rr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ye
} : {};
rr.filterProps = ["borderRadius"];
er(io, co, lo, uo, fo, po, ho, mo, go, bo, rr);
const nr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const r = He(e.theme, "spacing", 8, "gap"), n = (t) => ({
      gap: Ue(r, t)
    });
    return me(e, e.gap, n);
  }
  return null;
};
nr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ye
} : {};
nr.filterProps = ["gap"];
const tr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const r = He(e.theme, "spacing", 8, "columnGap"), n = (t) => ({
      columnGap: Ue(r, t)
    });
    return me(e, e.columnGap, n);
  }
  return null;
};
tr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ye
} : {};
tr.filterProps = ["columnGap"];
const or = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const r = He(e.theme, "spacing", 8, "rowGap"), n = (t) => ({
      rowGap: Ue(r, t)
    });
    return me(e, e.rowGap, n);
  }
  return null;
};
or.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ye
} : {};
or.filterProps = ["rowGap"];
const yo = H({
  prop: "gridColumn"
}), vo = H({
  prop: "gridRow"
}), ko = H({
  prop: "gridAutoFlow"
}), xo = H({
  prop: "gridAutoColumns"
}), So = H({
  prop: "gridAutoRows"
}), No = H({
  prop: "gridTemplateColumns"
}), Eo = H({
  prop: "gridTemplateRows"
}), wo = H({
  prop: "gridTemplateAreas"
}), To = H({
  prop: "gridArea"
});
er(nr, tr, or, yo, vo, ko, xo, So, No, Eo, wo, To);
function Ae(e, r) {
  return r === "grey" ? r : e;
}
const Co = H({
  prop: "color",
  themeKey: "palette",
  transform: Ae
}), _o = H({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ae
}), Oo = H({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ae
});
er(Co, _o, Oo);
function re(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const $o = H({
  prop: "width",
  transform: re
}), wr = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const r = (n) => {
      var t;
      return {
        maxWidth: ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null ? void 0 : t[n]) || Er[n] || re(n)
      };
    };
    return me(e, e.maxWidth, r);
  }
  return null;
};
wr.filterProps = ["maxWidth"];
const Ro = H({
  prop: "minWidth",
  transform: re
}), Ao = H({
  prop: "height",
  transform: re
}), Po = H({
  prop: "maxHeight",
  transform: re
}), Mo = H({
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
const Io = H({
  prop: "boxSizing"
});
er($o, wr, Ro, Ao, Po, Mo, Io);
const Bo = {
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
    style: rr
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
    style: nr
  },
  rowGap: {
    style: or
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
    transform: re
  },
  maxWidth: {
    style: wr
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
}, Tr = Bo;
function Do(...e) {
  const r = e.reduce((t, o) => t.concat(Object.keys(o)), []), n = new Set(r);
  return e.every((t) => n.size === Object.keys(t).length);
}
function jo(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function zo() {
  function e(n, t, o, a) {
    const s = {
      [n]: t,
      theme: o
    }, u = a[n];
    if (!u)
      return {
        [n]: t
      };
    const {
      cssProperty: c = n,
      themeKey: i,
      transform: l,
      style: p
    } = u;
    if (t == null)
      return null;
    if (i === "typography" && t === "inherit")
      return {
        [n]: t
      };
    const d = Ye(o, i) || {};
    return p ? p(s) : me(s, t, (b) => {
      let h = Xe(d, l, b);
      return b === h && typeof b == "string" && (h = Xe(d, l, `${n}${b === "default" ? "" : de(b)}`, b)), c === !1 ? h : {
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
    const s = (t = a.unstable_sxConfig) != null ? t : Tr;
    function u(c) {
      let i = c;
      if (typeof c == "function")
        i = c(a);
      else if (typeof c != "object")
        return c;
      if (!i)
        return null;
      const l = Yt(a.breakpoints), p = Object.keys(l);
      let d = l;
      return Object.keys(i).forEach((v) => {
        const b = jo(i[v], a);
        if (b != null)
          if (typeof b == "object")
            if (s[v])
              d = Ve(d, e(v, b, a, s));
            else {
              const h = me({
                theme: a
              }, b, (f) => ({
                [v]: f
              }));
              Do(h, b) ? d[v] = r({
                sx: b,
                theme: a
              }) : d = Ve(d, h);
            }
          else
            d = Ve(d, e(v, b, a, s));
      }), Zt(p, d);
    }
    return Array.isArray(o) ? o.map(u) : u(o);
  }
  return r;
}
const Mn = zo();
Mn.filterProps = ["sx"];
const Cr = Mn, Vo = ["breakpoints", "palette", "spacing", "shape"];
function _r(e = {}, ...r) {
  const {
    breakpoints: n = {},
    palette: t = {},
    spacing: o,
    shape: a = {}
  } = e, s = ge(e, Vo), u = Kt(n), c = so(o);
  let i = he({
    breakpoints: u,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: A({
      mode: "light"
    }, t),
    spacing: c,
    shape: A({}, Wt, a)
  }, s);
  return i = r.reduce((l, p) => he(l, p), i), i.unstable_sxConfig = A({}, Tr, s == null ? void 0 : s.unstable_sxConfig), i.unstable_sx = function(p) {
    return Cr({
      sx: p,
      theme: this
    });
  }, i;
}
function Lo(e) {
  return Object.keys(e).length === 0;
}
function Fo(e = null) {
  const r = Le.useContext(tt);
  return !r || Lo(r) ? e : r;
}
const Ho = _r();
function Uo(e = Ho) {
  return Fo(e);
}
const Jo = ["variant"];
function rn(e) {
  return e.length === 0;
}
function In(e) {
  const {
    variant: r
  } = e, n = ge(e, Jo);
  let t = r || "";
  return Object.keys(n).sort().forEach((o) => {
    o === "color" ? t += rn(t) ? e[o] : de(e[o]) : t += `${rn(t) ? o : de(o)}${de(e[o].toString())}`;
  }), t;
}
const Go = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Ko(e) {
  return Object.keys(e).length === 0;
}
function qo(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const Wo = (e, r) => r.components && r.components[e] && r.components[e].styleOverrides ? r.components[e].styleOverrides : null, Xo = (e, r) => {
  let n = [];
  r && r.components && r.components[e] && r.components[e].variants && (n = r.components[e].variants);
  const t = {};
  return n.forEach((o) => {
    const a = In(o.props);
    t[a] = o.style;
  }), t;
}, Yo = (e, r, n, t) => {
  var o;
  const {
    ownerState: a = {}
  } = e, s = [], u = n == null || (o = n.components) == null || (o = o[t]) == null ? void 0 : o.variants;
  return u && u.forEach((c) => {
    let i = !0;
    Object.keys(c.props).forEach((l) => {
      a[l] !== c.props[l] && e[l] !== c.props[l] && (i = !1);
    }), i && s.push(r[In(c.props)]);
  }), s;
};
function qe(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Zo = _r(), nn = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function je({
  defaultTheme: e,
  theme: r,
  themeId: n
}) {
  return Ko(r) ? e : r[n] || r;
}
function Qo(e) {
  return e ? (r, n) => n[e] : null;
}
function ea(e = {}) {
  const {
    themeId: r,
    defaultTheme: n = Zo,
    rootShouldForwardProp: t = qe,
    slotShouldForwardProp: o = qe
  } = e, a = (s) => Cr(A({}, s, {
    theme: je(A({}, s, {
      defaultTheme: n,
      themeId: r
    }))
  }));
  return a.__mui_systemSx = !0, (s, u = {}) => {
    ot(s, (R) => R.filter((m) => !(m != null && m.__mui_systemSx)));
    const {
      name: c,
      slot: i,
      skipVariantsResolver: l,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = Qo(nn(i))
    } = u, v = ge(u, Go), b = l !== void 0 ? l : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      i && i !== "Root" && i !== "root" || !1
    ), h = p || !1;
    let f;
    process.env.NODE_ENV !== "production" && c && (f = `${c}-${nn(i || "Root")}`);
    let N = qe;
    i === "Root" || i === "root" ? N = t : i ? N = o : qo(s) && (N = void 0);
    const W = nt(s, A({
      shouldForwardProp: N,
      label: f
    }, v)), B = (R, ...m) => {
      const X = m ? m.map((D) => typeof D == "function" && D.__emotion_real !== D ? (Y) => D(A({}, Y, {
        theme: je(A({}, Y, {
          defaultTheme: n,
          themeId: r
        }))
      })) : D) : [];
      let ne = R;
      c && d && X.push((D) => {
        const Y = je(A({}, D, {
          defaultTheme: n,
          themeId: r
        })), ce = Wo(c, Y);
        if (ce) {
          const le = {};
          return Object.entries(ce).forEach(([Q, q]) => {
            le[Q] = typeof q == "function" ? q(A({}, D, {
              theme: Y
            })) : q;
          }), d(D, le);
        }
        return null;
      }), c && !b && X.push((D) => {
        const Y = je(A({}, D, {
          defaultTheme: n,
          themeId: r
        }));
        return Yo(D, Xo(c, Y), Y, c);
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
        c && (D = `${c}${de(i || "")}`), D === void 0 && (D = `Styled(${Dt(s)})`), ae.displayName = D;
      }
      return s.muiName && (ae.muiName = s.muiName), ae;
    };
    return W.withConfig && (B.withConfig = W.withConfig), B;
  };
}
function ra(e) {
  const {
    theme: r,
    name: n,
    props: t
  } = e;
  return !r || !r.components || !r.components[n] || !r.components[n].defaultProps ? t : $n(r.components[n].defaultProps, t);
}
function na({
  props: e,
  name: r,
  defaultTheme: n,
  themeId: t
}) {
  let o = Uo(n);
  return t && (o = o[t] || o), ra({
    theme: o,
    name: r,
    props: e
  });
}
function Bn(e, r = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < r || e > n) && console.error(`MUI: The value provided ${e} is out of range [${r}, ${n}].`), Math.min(Math.max(r, e), n);
}
function ta(e) {
  e = e.slice(1);
  const r = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(r);
  return n && n[0].length === 1 && (n = n.map((t) => t + t)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((t, o) => o < 3 ? parseInt(t, 16) : Math.round(parseInt(t, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Me(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Me(ta(e));
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
function oa(e) {
  e = Me(e);
  const {
    values: r
  } = e, n = r[0], t = r[1] / 100, o = r[2] / 100, a = t * Math.min(o, 1 - o), s = (i, l = (i + n / 30) % 12) => o - a * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  let u = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (u += "a", c.push(r[3])), Or({
    type: u,
    values: c
  });
}
function tn(e) {
  e = Me(e);
  let r = e.type === "hsl" || e.type === "hsla" ? Me(oa(e)).values : e.values;
  return r = r.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3));
}
function on(e, r) {
  const n = tn(e), t = tn(r);
  return (Math.max(n, t) + 0.05) / (Math.min(n, t) + 0.05);
}
function aa(e, r) {
  if (e = Me(e), r = Bn(r), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - r;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - r;
  return Or(e);
}
function sa(e, r) {
  if (e = Me(e), r = Bn(r), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * r;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * r;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * r;
  return Or(e);
}
function ia(e, r) {
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
const ca = {
  black: "#000",
  white: "#fff"
}, Fe = ca, la = {
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
}, ua = la, da = {
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
}, we = da, fa = {
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
}, Te = fa, pa = {
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
}, ze = pa, ha = {
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
}, Ce = ha, ma = {
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
}, _e = ma, ga = {
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
}, Oe = ga, ba = ["mode", "contrastThreshold", "tonalOffset"], an = {
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
}, hr = {
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
function sn(e, r, n, t) {
  const o = t.light || t, a = t.dark || t * 1.5;
  e[r] || (e.hasOwnProperty(n) ? e[r] = e[n] : r === "light" ? e.light = sa(e.main, o) : r === "dark" && (e.dark = aa(e.main, a)));
}
function ya(e = "light") {
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
function va(e = "light") {
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
function ka(e = "light") {
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
    main: _e[400],
    light: _e[300],
    dark: _e[700]
  } : {
    main: _e[700],
    light: _e[500],
    dark: _e[900]
  };
}
function Sa(e = "light") {
  return e === "dark" ? {
    main: Oe[400],
    light: Oe[300],
    dark: Oe[700]
  } : {
    main: Oe[800],
    light: Oe[500],
    dark: Oe[900]
  };
}
function Na(e = "light") {
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
function Ea(e) {
  const {
    mode: r = "light",
    contrastThreshold: n = 3,
    tonalOffset: t = 0.2
  } = e, o = ge(e, ba), a = e.primary || ya(r), s = e.secondary || va(r), u = e.error || ka(r), c = e.info || xa(r), i = e.success || Sa(r), l = e.warning || Na(r);
  function p(h) {
    const f = on(h, hr.text.primary) >= n ? hr.text.primary : an.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const N = on(h, f);
      N < 3 && console.error([`MUI: The contrast ratio of ${N}:1 for ${f} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return f;
  }
  const d = ({
    color: h,
    name: f,
    mainShade: N = 500,
    lightShade: W = 300,
    darkShade: B = 700
  }) => {
    if (h = A({}, h), !h.main && h[N] && (h.main = h[N]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${f ? ` (${f})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${N}\` property.` : Pe(11, f ? ` (${f})` : "", N));
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
    return sn(h, "light", W, t), sn(h, "dark", B, t), h.contrastText || (h.contrastText = p(h.main)), h;
  }, v = {
    dark: hr,
    light: an
  };
  return process.env.NODE_ENV !== "production" && (v[r] || console.error(`MUI: The palette mode \`${r}\` is not supported.`)), he(A({
    // A collection of common colors.
    common: A({}, Fe),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: r,
    // The colors used to represent primary interface elements for a user.
    primary: d({
      color: a,
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
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: d({
      color: i,
      name: "success"
    }),
    // The grey colors.
    grey: ua,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: p,
    // Generate a rich color object.
    augmentColor: d,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: t
  }, v[r]), o);
}
const wa = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Ta(e) {
  return Math.round(e * 1e5) / 1e5;
}
const cn = {
  textTransform: "uppercase"
}, ln = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ca(e, r) {
  const n = typeof r == "function" ? r(e) : r, {
    fontFamily: t = ln,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: u = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: i = 16,
    // Apply the CSS properties to all the variants.
    allVariants: l,
    pxToRem: p
  } = n, d = ge(n, wa);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof i != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const v = o / 14, b = p || ((N) => `${N / i * v}rem`), h = (N, W, B, R, m) => A({
    fontFamily: t,
    fontWeight: N,
    fontSize: b(W),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: B
  }, t === ln ? {
    letterSpacing: `${Ta(R / W)}em`
  } : {}, m, l), f = {
    h1: h(a, 96, 1.167, -1.5),
    h2: h(a, 60, 1.2, -0.5),
    h3: h(s, 48, 1.167, 0),
    h4: h(s, 34, 1.235, 0.25),
    h5: h(s, 24, 1.334, 0),
    h6: h(u, 20, 1.6, 0.15),
    subtitle1: h(s, 16, 1.75, 0.15),
    subtitle2: h(u, 14, 1.57, 0.1),
    body1: h(s, 16, 1.5, 0.15),
    body2: h(s, 14, 1.43, 0.15),
    button: h(u, 14, 1.75, 0.4, cn),
    caption: h(s, 12, 1.66, 0.4),
    overline: h(s, 12, 2.66, 1, cn),
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
    htmlFontSize: i,
    pxToRem: b,
    fontFamily: t,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: s,
    fontWeightMedium: u,
    fontWeightBold: c
  }, f), d, {
    clone: !1
    // No need to clone deep
  });
}
const _a = 0.2, Oa = 0.14, $a = 0.12;
function J(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${_a})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Oa})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${$a})`].join(",");
}
const Ra = ["none", J(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), J(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), J(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), J(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), J(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), J(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), J(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), J(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), J(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), J(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), J(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), J(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), J(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), J(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), J(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), J(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), J(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), J(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), J(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), J(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), J(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), J(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), J(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), J(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Aa = Ra, Pa = ["duration", "easing", "delay"], Ma = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Ia = {
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
function un(e) {
  return `${Math.round(e)}ms`;
}
function Ba(e) {
  if (!e)
    return 0;
  const r = e / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function Da(e) {
  const r = A({}, Ma, e.easing), n = A({}, Ia, e.duration);
  return A({
    getAutoHeightDuration: Ba,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = n.standard,
        easing: u = r.easeInOut,
        delay: c = 0
      } = a, i = ge(a, Pa);
      if (process.env.NODE_ENV !== "production") {
        const l = (d) => typeof d == "string", p = (d) => !isNaN(parseFloat(d));
        !l(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !p(s) && !l(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), l(u) || console.error('MUI: Argument "easing" must be a string.'), !p(c) && !l(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(i).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(i).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((l) => `${l} ${typeof s == "string" ? s : un(s)} ${u} ${typeof c == "string" ? c : un(c)}`).join(",");
    }
  }, e, {
    easing: r,
    duration: n
  });
}
const ja = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, za = ja, Va = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function La(e = {}, ...r) {
  const {
    mixins: n = {},
    palette: t = {},
    transitions: o = {},
    typography: a = {}
  } = e, s = ge(e, Va);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Pe(18));
  const u = Ea(t), c = _r(e);
  let i = he(c, {
    mixins: ia(c.breakpoints, n),
    palette: u,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Aa.slice(),
    typography: Ca(u, a),
    transitions: Da(o),
    zIndex: A({}, za)
  });
  if (i = he(i, s), i = r.reduce((l, p) => he(l, p), i), process.env.NODE_ENV !== "production") {
    const l = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], p = (d, v) => {
      let b;
      for (b in d) {
        const h = d[b];
        if (l.indexOf(b) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const f = Nr("", b);
            console.error([`MUI: The \`${v}\` component increases the CSS specificity of the \`${b}\` internal state.`, "You can not override it like this: ", JSON.stringify(d, null, 2), "", `Instead, you need to use the '&.${f}' syntax:`, JSON.stringify({
              root: {
                [`&.${f}`]: h
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          d[b] = {};
        }
      }
    };
    Object.keys(i.components).forEach((d) => {
      const v = i.components[d].styleOverrides;
      v && d.indexOf("Mui") === 0 && p(v, d);
    });
  }
  return i.unstable_sxConfig = A({}, Tr, s == null ? void 0 : s.unstable_sxConfig), i.unstable_sx = function(p) {
    return Cr({
      sx: p,
      theme: this
    });
  }, i;
}
const Fa = La(), Dn = Fa, jn = "$$material";
function Ha({
  props: e,
  name: r
}) {
  return na({
    props: e,
    name: r,
    defaultTheme: Dn,
    themeId: jn
  });
}
const Ua = (e) => qe(e) && e !== "classes", Ja = ea({
  themeId: jn,
  defaultTheme: Dn,
  rootShouldForwardProp: Ua
}), Ga = Ja;
function Ka(e) {
  return Nr("MuiSvgIcon", e);
}
Ht("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const qa = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Wa = (e) => {
  const {
    color: r,
    fontSize: n,
    classes: t
  } = e, o = {
    root: ["root", r !== "inherit" && `color${de(r)}`, `fontSize${de(n)}`]
  };
  return jt(o, Ka, t);
}, Xa = Ga("svg", {
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
  var n, t, o, a, s, u, c, i, l, p, d, v, b;
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
      medium: ((u = e.typography) == null || (c = u.pxToRem) == null ? void 0 : c.call(u, 24)) || "1.5rem",
      large: ((i = e.typography) == null || (l = i.pxToRem) == null ? void 0 : l.call(i, 35)) || "2.1875rem"
    }[r.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (p = (d = (e.vars || e).palette) == null || (d = d[r.color]) == null ? void 0 : d.main) != null ? p : {
      action: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.active,
      disabled: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.disabled,
      inherit: void 0
    }[r.color]
  };
}), $r = /* @__PURE__ */ Le.forwardRef(function(r, n) {
  const t = Ha({
    props: r,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: s = "inherit",
    component: u = "svg",
    fontSize: c = "medium",
    htmlColor: i,
    inheritViewBox: l = !1,
    titleAccess: p,
    viewBox: d = "0 0 24 24"
  } = t, v = ge(t, qa), b = /* @__PURE__ */ Le.isValidElement(o) && o.type === "svg", h = A({}, t, {
    color: s,
    component: u,
    fontSize: c,
    instanceFontSize: r.fontSize,
    inheritViewBox: l,
    viewBox: d,
    hasSvgAsChild: b
  }), f = {};
  l || (f.viewBox = d);
  const N = Wa(h);
  return /* @__PURE__ */ Ie(Xa, A({
    as: u,
    className: Ut(N.root, a),
    focusable: "false",
    color: i,
    "aria-hidden": p ? void 0 : !0,
    role: p ? "img" : void 0,
    ref: n
  }, f, v, b && o.props, {
    ownerState: h,
    children: [b ? o.props.children : o, p ? /* @__PURE__ */ S("title", {
      children: p
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && ($r.propTypes = {
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
$r.muiName = "SvgIcon";
const dn = $r;
function Ya(e, r) {
  function n(t, o) {
    return /* @__PURE__ */ S(dn, A({
      "data-testid": `${r}Icon`,
      ref: o
    }, t, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${r}Icon`), n.muiName = dn.muiName, /* @__PURE__ */ Le.memo(/* @__PURE__ */ Le.forwardRef(n));
}
const Za = Ya(/* @__PURE__ */ S("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
}), "Menu");
function hs({
  menu: e,
  dataHandler: r,
  commandHandler: n,
  className: t,
  id: o,
  children: a
}) {
  const [s, u] = Ke(!1), [c, i] = Ke(!1), l = ar(() => {
    s && u(!1), i(!1);
  }, [s]), p = ar((N) => {
    N.stopPropagation(), u((W) => {
      const B = !W;
      return B && N.shiftKey ? i(!0) : B || i(!1), B;
    });
  }, []), d = Zn(null), [v, b] = Ke(0);
  Qn(() => {
    s && d.current && b(d.current.clientHeight);
  }, [s]);
  const h = ar(
    (N) => (l(), n(N)),
    [n, l]
  );
  let f = e;
  return !f && r && (f = r(c)), /* @__PURE__ */ S("div", { ref: d, style: { position: "relative" }, children: /* @__PURE__ */ S(Wn, { position: "static", id: o, children: /* @__PURE__ */ Ie(Xn, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    f ? /* @__PURE__ */ S(
      hn,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: p,
        children: /* @__PURE__ */ S(Za, {})
      }
    ) : null,
    a ? /* @__PURE__ */ S("div", { className: "papi-menu-children", children: a }) : null,
    f ? /* @__PURE__ */ S(
      Yn,
      {
        className: `papi-menu-drawer ${t ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: s,
        onClose: l,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: v
          }
        },
        children: /* @__PURE__ */ S(ct, { commandHandler: h, columns: f.columns })
      }
    ) : null
  ] }) }) });
}
function Qa(e, r = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), t = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), r === "top" && t ? n.insertBefore(o, t) : n.appendChild(o);
}
Qa(`.papi-multi-column-menu {
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
`, "top");
export {
  Ee as Button,
  as as ChapterRangeSelector,
  at as Checkbox,
  mr as ComboBox,
  ct as GridMenu,
  ss as IconButton,
  $e as LabelPosition,
  st as MenuItem,
  cs as RefSelector,
  ls as SearchBar,
  us as Slider,
  ds as Snackbar,
  fs as Switch,
  ps as Table,
  We as TextField,
  hs as Toolbar,
  wn as getChaptersForBook
};
//# sourceMappingURL=index.es.js.map
