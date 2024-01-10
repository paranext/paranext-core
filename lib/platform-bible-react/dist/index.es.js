import { jsx as k, jsxs as He, Fragment as kn } from "react/jsx-runtime";
import { Button as Sn, Autocomplete as xn, TextField as zt, FormControlLabel as Yr, FormLabel as wn, Checkbox as Tn, MenuItem as Cn, Grid as Lt, IconButton as qt, Paper as On, Slider as _n, Snackbar as $n, Switch as Rn, AppBar as An, Toolbar as Pn, Drawer as Mn } from "@mui/material";
import * as rr from "react";
import { useMemo as Mr, useState as Le, useCallback as cr, useRef as In, useEffect as dr } from "react";
import Bn, { SelectColumn as Dn } from "react-data-grid";
import Vn, { ThemeContext as jn, internal_processStyles as zn } from "@mui/styled-engine";
function Pe({
  id: e,
  isDisabled: r = !1,
  className: t,
  onClick: n,
  onContextMenu: o,
  children: a
}) {
  return /* @__PURE__ */ k(
    Sn,
    {
      id: e,
      disabled: r,
      className: `papi-button ${t ?? ""}`,
      onClick: n,
      onContextMenu: o,
      children: a
    }
  );
}
function Rr({
  id: e,
  title: r,
  isDisabled: t = !1,
  isClearable: n = !0,
  hasError: o = !1,
  isFullWidth: a = !1,
  width: s,
  options: c = [],
  className: u,
  value: i,
  onChange: l,
  onFocus: d,
  onBlur: f,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ k(
    xn,
    {
      id: e,
      disablePortal: !0,
      disabled: t,
      disableClearable: !n,
      fullWidth: a,
      options: c,
      className: `papi-combo-box ${o ? "error" : ""} ${u ?? ""}`,
      value: i,
      onChange: l,
      onFocus: d,
      onBlur: f,
      getOptionLabel: b,
      renderInput: (y) => /* @__PURE__ */ k(
        zt,
        {
          ...y,
          error: o,
          fullWidth: a,
          disabled: t,
          label: r,
          style: { width: s }
        }
      )
    }
  );
}
function wi({
  startChapter: e,
  endChapter: r,
  handleSelectStartChapter: t,
  handleSelectEndChapter: n,
  isDisabled: o,
  chapterCount: a
}) {
  const s = Mr(
    () => Array.from({ length: a }, (i, l) => l + 1),
    [a]
  ), c = (i, l) => {
    t(l), l > r && n(l);
  }, u = (i, l) => {
    n(l), l < e && t(l);
  };
  return /* @__PURE__ */ He(kn, { children: [
    /* @__PURE__ */ k(
      Yr,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ k(
          Rr,
          {
            onChange: (i, l) => c(i, l),
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
    /* @__PURE__ */ k(
      Yr,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ k(
          Rr,
          {
            onChange: (i, l) => u(i, l),
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
var je = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(je || {});
function Ln({
  id: e,
  isChecked: r,
  labelText: t = "",
  labelPosition: n = je.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: s = !1,
  hasError: c = !1,
  className: u,
  onChange: i
}) {
  const l = /* @__PURE__ */ k(
    Tn,
    {
      id: e,
      checked: r,
      indeterminate: o,
      defaultChecked: a,
      disabled: s,
      className: `papi-checkbox ${c ? "error" : ""} ${u ?? ""}`,
      onChange: i
    }
  );
  let d;
  if (t) {
    const f = n === je.Before || n === je.Above, b = /* @__PURE__ */ k("span", { className: `papi-checkbox-label ${c ? "error" : ""} ${u ?? ""}`, children: t }), y = n === je.Before || n === je.After, h = y ? b : /* @__PURE__ */ k("div", { children: b }), p = y ? l : /* @__PURE__ */ k("div", { children: l });
    d = /* @__PURE__ */ He(
      wn,
      {
        className: `papi-checkbox ${n.toString()}`,
        disabled: s,
        error: c,
        children: [
          f && h,
          p,
          !f && h
        ]
      }
    );
  } else
    d = l;
  return d;
}
function qn(e) {
  const {
    onClick: r,
    name: t,
    hasAutoFocus: n = !1,
    className: o,
    isDense: a = !0,
    hasDisabledGutters: s = !1,
    hasDivider: c = !1,
    focusVisibleClassName: u,
    id: i,
    children: l
  } = e;
  return /* @__PURE__ */ k(
    Cn,
    {
      autoFocus: n,
      className: o,
      dense: a,
      disableGutters: s,
      divider: c,
      focusVisibleClassName: u,
      onClick: r,
      id: i,
      children: t || l
    }
  );
}
function Xn({ commandHandler: e, name: r, className: t, items: n, id: o }) {
  return /* @__PURE__ */ He(Lt, { id: o, item: !0, xs: "auto", className: `papi-menu-column ${t ?? ""}`, children: [
    /* @__PURE__ */ k("h3", { className: `papi-menu ${t ?? ""}`, children: r }),
    n.map((a, s) => /* @__PURE__ */ k(
      qn,
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
function Jn({ commandHandler: e, className: r, columns: t, id: n }) {
  return /* @__PURE__ */ k(
    Lt,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${r ?? ""}`,
      columns: t.length,
      id: n,
      children: t.map((o, a) => /* @__PURE__ */ k(
        Xn,
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
function Ti({
  id: e,
  label: r,
  isDisabled: t = !1,
  tooltip: n,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: s = "medium",
  className: c,
  onClick: u,
  children: i
}) {
  return /* @__PURE__ */ k(
    qt,
    {
      id: e,
      disabled: t,
      edge: a,
      size: s,
      "aria-label": r,
      title: o ? void 0 : n ?? r,
      className: `papi-icon-button ${c ?? ""}`,
      onClick: u,
      children: i
    }
  );
}
var Hn = Object.defineProperty, Gn = (e, r, t) => r in e ? Hn(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t, R = (e, r, t) => (Gn(e, typeof r != "symbol" ? r + "" : r, t), t);
const _e = [
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
], Xt = [
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
], Zr = to();
function Ge(e, r = !0) {
  return r && (e = e.toUpperCase()), e in Zr ? Zr[e] : 0;
}
function Br(e) {
  return Ge(e) > 0;
}
function Un(e) {
  const r = typeof e == "string" ? Ge(e) : e;
  return r >= 40 && r <= 66;
}
function Fn(e) {
  return (typeof e == "string" ? Ge(e) : e) <= 39;
}
function Jt(e) {
  return e <= 66;
}
function Kn(e) {
  const r = typeof e == "string" ? Ge(e) : e;
  return Ut(r) && !Jt(r);
}
function* Wn() {
  for (let e = 1; e <= _e.length; e++)
    yield e;
}
const Yn = 1, Ht = _e.length;
function Zn() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Dr(e, r = "***") {
  const t = e - 1;
  return t < 0 || t >= _e.length ? r : _e[t];
}
function Gt(e) {
  return e <= 0 || e > Ht ? "******" : Xt[e - 1];
}
function Qn(e) {
  return Gt(Ge(e));
}
function Ut(e) {
  const r = typeof e == "number" ? Dr(e) : e;
  return Br(r) && !Ir.includes(r);
}
function eo(e) {
  const r = typeof e == "number" ? Dr(e) : e;
  return Br(r) && Ir.includes(r);
}
function ro(e) {
  return Xt[e - 1].includes("*obsolete*");
}
function to() {
  const e = {};
  for (let r = 0; r < _e.length; r++)
    e[_e[r]] = r + 1;
  return e;
}
const Te = {
  allBookIds: _e,
  nonCanonicalIds: Ir,
  bookIdToNumber: Ge,
  isBookIdValid: Br,
  isBookNT: Un,
  isBookOT: Fn,
  isBookOTNT: Jt,
  isBookDC: Kn,
  allBookNumbers: Wn,
  firstBook: Yn,
  lastBook: Ht,
  extraBooks: Zn,
  bookNumberToId: Dr,
  bookNumberToEnglishName: Gt,
  bookIdToEnglishName: Qn,
  isCanonical: Ut,
  isExtraMaterial: eo,
  isObsolete: ro
};
var Ne = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ne || {});
const Ce = class {
  // private versInfo: Versification;
  constructor(e) {
    if (R(this, "name"), R(this, "fullPath"), R(this, "isPresent"), R(this, "hasVerseSegments"), R(this, "isCustomized"), R(this, "baseVersification"), R(this, "scriptureBooks"), R(this, "_type"), e != null)
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
let se = Ce;
R(se, "Original", new Ce(Ne.Original)), R(se, "Septuagint", new Ce(Ne.Septuagint)), R(se, "Vulgate", new Ce(Ne.Vulgate)), R(se, "English", new Ce(Ne.English)), R(se, "RussianProtestant", new Ce(Ne.RussianProtestant)), R(se, "RussianOrthodox", new Ce(Ne.RussianOrthodox));
function Qr(e, r) {
  const t = r[0];
  for (let n = 1; n < r.length; n++)
    e = e.split(r[n]).join(t);
  return e.split(t);
}
var Ft = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ft || {});
const _ = class {
  constructor(r, t, n, o) {
    if (R(this, "firstChapter"), R(this, "lastChapter"), R(this, "lastVerse"), R(this, "hasSegmentsDefined"), R(this, "text"), R(this, "BBBCCCVVVS"), R(this, "longHashCode"), R(this, "versification"), R(this, "rtlMark", "‏"), R(this, "_bookNum", 0), R(this, "_chapterNum", 0), R(this, "_verseNum", 0), R(this, "_verse"), n == null && o == null)
      if (r != null && typeof r == "string") {
        const a = r, s = t != null && t instanceof se ? t : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (r != null && typeof r == "number") {
        const a = t != null && t instanceof se ? t : void 0;
        this.setEmpty(a), this._verseNum = r % _.chapterDigitShifter, this._chapterNum = Math.floor(
          r % _.bookDigitShifter / _.chapterDigitShifter
        ), this._bookNum = Math.floor(r / _.bookDigitShifter);
      } else if (t == null)
        if (r != null && r instanceof _) {
          const a = r;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (r == null)
            return;
          const a = r instanceof se ? r : _.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (r != null && t != null && n != null)
      if (typeof r == "string" && typeof t == "string" && typeof n == "string")
        this.setEmpty(o), this.updateInternal(r, t, n);
      else if (typeof r == "number" && typeof t == "number" && typeof n == "number")
        this._bookNum = r, this._chapterNum = t, this._verseNum = n, this.versification = o ?? _.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(r, t = _.defaultVersification) {
    const n = new _(t);
    return n.parse(r), n;
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
    let t;
    try {
      return t = _.parse(r), { success: !0, verseRef: t };
    } catch (n) {
      if (n instanceof Ke)
        return t = new _(), { success: !1, verseRef: t };
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
  static getBBBCCCVVV(r, t, n) {
    return r % _.bcvMaxValue * _.bookDigitShifter + (t >= 0 ? t % _.bcvMaxValue * _.chapterDigitShifter : 0) + (n >= 0 ? n % _.bcvMaxValue : 0);
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(r) {
    let t;
    if (!r)
      return t = -1, { success: !0, vNum: t };
    t = 0;
    let n;
    for (let o = 0; o < r.length; o++) {
      if (n = r[o], n < "0" || n > "9")
        return o === 0 && (t = -1), { success: !1, vNum: t };
      if (t = t * 10 + +n - +"0", t > _.bcvMaxValue)
        return t = -1, { success: !1, vNum: t };
    }
    return { success: !0, vNum: t };
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
    return Te.bookNumberToId(this.bookNum, "");
  }
  set book(r) {
    this.bookNum = Te.bookIdToNumber(r);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(r) {
    const t = +r;
    this._chapterNum = Number.isInteger(t) ? t : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(r) {
    const { success: t, vNum: n } = _.tryGetVerseNum(r);
    this._verse = t ? void 0 : r.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = _.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(r) {
    if (r <= 0 || r > Te.lastBook)
      throw new Ke(
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
    this.versification = this.versification != null ? new se(r) : void 0;
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
          this.versification = new se(Ne[s]);
        } catch {
          throw new Ke("Invalid reference : " + r);
        }
    }
    const t = r.trim().split(" ");
    if (t.length !== 2)
      throw new Ke("Invalid reference : " + r);
    const n = t[1].split(":"), o = +n[0];
    if (n.length !== 2 || Te.bookIdToNumber(t[0]) === 0 || !Number.isInteger(o) || o < 0 || !_.isVerseParseable(n[1]))
      throw new Ke("Invalid reference : " + r);
    this.updateInternal(t[0], n[0], n[1]);
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
  allVerses(r = !1, t = _.verseRangeSeparators, n = _.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = Qr(this._verse, n);
    for (const s of a.map((c) => Qr(c, t))) {
      const c = this.clone();
      c.verse = s[0];
      const u = c.verseNum;
      if (o.push(c), s.length > 1) {
        const i = this.clone();
        if (i.verse = s[1], !r)
          for (let l = u + 1; l < i.verseNum; l++) {
            const d = new _(
              this._bookNum,
              this._chapterNum,
              l,
              this.versification
            );
            this.isExcluded || o.push(d);
          }
        o.push(i);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(r, t) {
    if (!this.verse)
      return this.internalValid;
    let n = 0;
    for (const o of this.allVerses(!0, r, t)) {
      const a = o.internalValid;
      if (a !== 0)
        return a;
      const s = o.BBBCCCVVV;
      if (n > s)
        return 3;
      if (n === s)
        return 4;
      n = s;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Te.lastBook ? 2 : 0;
  }
  setEmpty(r = _.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = r;
  }
  updateInternal(r, t, n) {
    this.bookNum = Te.bookIdToNumber(r), this.chapter = t, this.verse = n;
  }
};
let me = _;
R(me, "defaultVersification", se.English), R(me, "verseRangeSeparator", "-"), R(me, "verseSequenceIndicator", ","), R(me, "verseRangeSeparators", [_.verseRangeSeparator]), R(me, "verseSequenceIndicators", [_.verseSequenceIndicator]), R(me, "chapterDigitShifter", 1e3), R(me, "bookDigitShifter", _.chapterDigitShifter * _.chapterDigitShifter), R(me, "bcvMaxValue", _.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
R(me, "ValidStatusType", Ft);
class Ke extends Error {
}
var no = Object.defineProperty, oo = (e, r, t) => r in e ? no(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t, A = (e, r, t) => (oo(e, typeof r != "symbol" ? r + "" : r, t), t);
const $e = [
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
], Vr = [
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
], Kt = [
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
], et = mo();
function Ue(e, r = !0) {
  return r && (e = e.toUpperCase()), e in et ? et[e] : 0;
}
function jr(e) {
  return Ue(e) > 0;
}
function ao(e) {
  const r = typeof e == "string" ? Ue(e) : e;
  return r >= 40 && r <= 66;
}
function so(e) {
  return (typeof e == "string" ? Ue(e) : e) <= 39;
}
function Wt(e) {
  return e <= 66;
}
function io(e) {
  const r = typeof e == "string" ? Ue(e) : e;
  return Qt(r) && !Wt(r);
}
function* co() {
  for (let e = 1; e <= $e.length; e++)
    yield e;
}
const lo = 1, Yt = $e.length;
function uo() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function zr(e, r = "***") {
  const t = e - 1;
  return t < 0 || t >= $e.length ? r : $e[t];
}
function Zt(e) {
  return e <= 0 || e > Yt ? "******" : Kt[e - 1];
}
function fo(e) {
  return Zt(Ue(e));
}
function Qt(e) {
  const r = typeof e == "number" ? zr(e) : e;
  return jr(r) && !Vr.includes(r);
}
function po(e) {
  const r = typeof e == "number" ? zr(e) : e;
  return jr(r) && Vr.includes(r);
}
function ho(e) {
  return Kt[e - 1].includes("*obsolete*");
}
function mo() {
  const e = {};
  for (let r = 0; r < $e.length; r++)
    e[$e[r]] = r + 1;
  return e;
}
const Ee = {
  allBookIds: $e,
  nonCanonicalIds: Vr,
  bookIdToNumber: Ue,
  isBookIdValid: jr,
  isBookNT: ao,
  isBookOT: so,
  isBookOTNT: Wt,
  isBookDC: io,
  allBookNumbers: co,
  firstBook: lo,
  lastBook: Yt,
  extraBooks: uo,
  bookNumberToId: zr,
  bookNumberToEnglishName: Zt,
  bookIdToEnglishName: fo,
  isCanonical: Qt,
  isExtraMaterial: po,
  isObsolete: ho
};
var ke = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(ke || {});
const Oe = class {
  // private versInfo: Versification;
  constructor(e) {
    if (A(this, "name"), A(this, "fullPath"), A(this, "isPresent"), A(this, "hasVerseSegments"), A(this, "isCustomized"), A(this, "baseVersification"), A(this, "scriptureBooks"), A(this, "_type"), e != null)
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
let ie = Oe;
A(ie, "Original", new Oe(ke.Original)), A(ie, "Septuagint", new Oe(ke.Septuagint)), A(ie, "Vulgate", new Oe(ke.Vulgate)), A(ie, "English", new Oe(ke.English)), A(ie, "RussianProtestant", new Oe(ke.RussianProtestant)), A(ie, "RussianOrthodox", new Oe(ke.RussianOrthodox));
function rt(e, r) {
  const t = r[0];
  for (let n = 1; n < r.length; n++)
    e = e.split(r[n]).join(t);
  return e.split(t);
}
var en = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(en || {});
const $ = class {
  constructor(e, r, t, n) {
    if (A(this, "firstChapter"), A(this, "lastChapter"), A(this, "lastVerse"), A(this, "hasSegmentsDefined"), A(this, "text"), A(this, "BBBCCCVVVS"), A(this, "longHashCode"), A(this, "versification"), A(this, "rtlMark", "‏"), A(this, "_bookNum", 0), A(this, "_chapterNum", 0), A(this, "_verseNum", 0), A(this, "_verse"), t == null && n == null)
      if (e != null && typeof e == "string") {
        const o = e, a = r != null && r instanceof ie ? r : void 0;
        this.setEmpty(a), this.parse(o);
      } else if (e != null && typeof e == "number") {
        const o = r != null && r instanceof ie ? r : void 0;
        this.setEmpty(o), this._verseNum = e % $.chapterDigitShifter, this._chapterNum = Math.floor(
          e % $.bookDigitShifter / $.chapterDigitShifter
        ), this._bookNum = Math.floor(e / $.bookDigitShifter);
      } else if (r == null)
        if (e != null && e instanceof $) {
          const o = e;
          this._bookNum = o.bookNum, this._chapterNum = o.chapterNum, this._verseNum = o.verseNum, this._verse = o.verse, this.versification = o.versification;
        } else {
          if (e == null)
            return;
          const o = e instanceof ie ? e : $.defaultVersification;
          this.setEmpty(o);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && r != null && t != null)
      if (typeof e == "string" && typeof r == "string" && typeof t == "string")
        this.setEmpty(n), this.updateInternal(e, r, t);
      else if (typeof e == "number" && typeof r == "number" && typeof t == "number")
        this._bookNum = e, this._chapterNum = r, this._verseNum = t, this.versification = n ?? $.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, r = $.defaultVersification) {
    const t = new $(r);
    return t.parse(e), t;
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
      return r = $.parse(e), { success: !0, verseRef: r };
    } catch (t) {
      if (t instanceof We)
        return r = new $(), { success: !1, verseRef: r };
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
  static getBBBCCCVVV(e, r, t) {
    return e % $.bcvMaxValue * $.bookDigitShifter + (r >= 0 ? r % $.bcvMaxValue * $.chapterDigitShifter : 0) + (t >= 0 ? t % $.bcvMaxValue : 0);
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
    let t;
    for (let n = 0; n < e.length; n++) {
      if (t = e[n], t < "0" || t > "9")
        return n === 0 && (r = -1), { success: !1, vNum: r };
      if (r = r * 10 + +t - +"0", r > $.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes($.verseRangeSeparator) || this._verse.includes($.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return Ee.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = Ee.bookIdToNumber(e);
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
    const { success: r, vNum: t } = $.tryGetVerseNum(e);
    this._verse = r ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = t, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = $.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > Ee.lastBook)
      throw new We(
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
    this.versification = this.versification != null ? new ie(e) : void 0;
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
    return this.validateVerse($.verseRangeSeparators, $.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return $.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return $.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new ie(ke[a]);
        } catch {
          throw new We("Invalid reference : " + e);
        }
    }
    const r = e.trim().split(" ");
    if (r.length !== 2)
      throw new We("Invalid reference : " + e);
    const t = r[1].split(":"), n = +t[0];
    if (t.length !== 2 || Ee.bookIdToNumber(r[0]) === 0 || !Number.isInteger(n) || n < 0 || !$.isVerseParseable(t[1]))
      throw new We("Invalid reference : " + e);
    this.updateInternal(r[0], t[0], t[1]);
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
    return new $(this);
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
  allVerses(e = !1, r = $.verseRangeSeparators, t = $.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const n = [], o = rt(this._verse, t);
    for (const a of o.map((s) => rt(s, r))) {
      const s = this.clone();
      s.verse = a[0];
      const c = s.verseNum;
      if (n.push(s), a.length > 1) {
        const u = this.clone();
        if (u.verse = a[1], !e)
          for (let i = c + 1; i < u.verseNum; i++) {
            const l = new $(
              this._bookNum,
              this._chapterNum,
              i,
              this.versification
            );
            this.isExcluded || n.push(l);
          }
        n.push(u);
      }
    }
    return n;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, r) {
    if (!this.verse)
      return this.internalValid;
    let t = 0;
    for (const n of this.allVerses(!0, e, r)) {
      const o = n.internalValid;
      if (o !== 0)
        return o;
      const a = n.BBBCCCVVV;
      if (t > a)
        return 3;
      if (t === a)
        return 4;
      t = a;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > Ee.lastBook ? 2 : 0;
  }
  setEmpty(e = $.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, r, t) {
    this.bookNum = Ee.bookIdToNumber(e), this.chapter = r, this.verse = t;
  }
};
let ge = $;
A(ge, "defaultVersification", ie.English), A(ge, "verseRangeSeparator", "-"), A(ge, "verseSequenceIndicator", ","), A(ge, "verseRangeSeparators", [$.verseRangeSeparator]), A(ge, "verseSequenceIndicators", [$.verseSequenceIndicator]), A(ge, "chapterDigitShifter", 1e3), A(ge, "bookDigitShifter", $.chapterDigitShifter * $.chapterDigitShifter), A(ge, "bcvMaxValue", $.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
A(ge, "ValidStatusType", en);
class We extends Error {
}
const rn = [
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
let Er;
const kr = () => (Er || (Er = Ee.allBookIds.map((e) => ({
  bookId: e,
  label: Ee.bookIdToEnglishName(e)
}))), Er), tn = 1, go = rn.length - 1, nn = 1, on = 1, an = (e) => {
  var r;
  return ((r = rn[e]) == null ? void 0 : r.chapters) ?? -1;
}, tt = (e, r) => ({
  bookNum: Math.max(tn, Math.min(e.bookNum + r, go)),
  chapterNum: 1,
  verseNum: 1
}), nt = (e, r) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(nn, e.chapterNum + r),
    an(e.bookNum)
  ),
  verseNum: 1
}), ot = (e, r) => ({
  ...e,
  verseNum: Math.max(on, e.verseNum + r)
});
var bo = Object.getOwnPropertyNames, yo = Object.getOwnPropertySymbols, vo = Object.prototype.hasOwnProperty;
function at(e, r) {
  return function(t, n, o) {
    return e(t, n, o) && r(t, n, o);
  };
}
function sr(e) {
  return function(r, t, n) {
    if (!r || !t || typeof r != "object" || typeof t != "object")
      return e(r, t, n);
    var o = n.cache, a = o.get(r), s = o.get(t);
    if (a && s)
      return a === t && s === r;
    o.set(r, t), o.set(t, r);
    var c = e(r, t, n);
    return o.delete(r), o.delete(t), c;
  };
}
function st(e) {
  return bo(e).concat(yo(e));
}
var sn = Object.hasOwn || function(e, r) {
  return vo.call(e, r);
};
function Fe(e, r) {
  return e || r ? e === r : e === r || e !== e && r !== r;
}
var cn = "_owner", it = Object.getOwnPropertyDescriptor, ct = Object.keys;
function No(e, r, t) {
  var n = e.length;
  if (r.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!t.equals(e[n], r[n], n, n, e, r, t))
      return !1;
  return !0;
}
function Eo(e, r) {
  return Fe(e.getTime(), r.getTime());
}
function lt(e, r, t) {
  if (e.size !== r.size)
    return !1;
  for (var n = {}, o = e.entries(), a = 0, s, c; (s = o.next()) && !s.done; ) {
    for (var u = r.entries(), i = !1, l = 0; (c = u.next()) && !c.done; ) {
      var d = s.value, f = d[0], b = d[1], y = c.value, h = y[0], p = y[1];
      !i && !n[l] && (i = t.equals(f, h, a, l, e, r, t) && t.equals(b, p, f, h, e, r, t)) && (n[l] = !0), l++;
    }
    if (!i)
      return !1;
    a++;
  }
  return !0;
}
function ko(e, r, t) {
  var n = ct(e), o = n.length;
  if (ct(r).length !== o)
    return !1;
  for (var a; o-- > 0; )
    if (a = n[o], a === cn && (e.$$typeof || r.$$typeof) && e.$$typeof !== r.$$typeof || !sn(r, a) || !t.equals(e[a], r[a], a, a, e, r, t))
      return !1;
  return !0;
}
function Ye(e, r, t) {
  var n = st(e), o = n.length;
  if (st(r).length !== o)
    return !1;
  for (var a, s, c; o-- > 0; )
    if (a = n[o], a === cn && (e.$$typeof || r.$$typeof) && e.$$typeof !== r.$$typeof || !sn(r, a) || !t.equals(e[a], r[a], a, a, e, r, t) || (s = it(e, a), c = it(r, a), (s || c) && (!s || !c || s.configurable !== c.configurable || s.enumerable !== c.enumerable || s.writable !== c.writable)))
      return !1;
  return !0;
}
function So(e, r) {
  return Fe(e.valueOf(), r.valueOf());
}
function xo(e, r) {
  return e.source === r.source && e.flags === r.flags;
}
function ut(e, r, t) {
  if (e.size !== r.size)
    return !1;
  for (var n = {}, o = e.values(), a, s; (a = o.next()) && !a.done; ) {
    for (var c = r.values(), u = !1, i = 0; (s = c.next()) && !s.done; )
      !u && !n[i] && (u = t.equals(a.value, s.value, a.value, s.value, e, r, t)) && (n[i] = !0), i++;
    if (!u)
      return !1;
  }
  return !0;
}
function wo(e, r) {
  var t = e.length;
  if (r.length !== t)
    return !1;
  for (; t-- > 0; )
    if (e[t] !== r[t])
      return !1;
  return !0;
}
var To = "[object Arguments]", Co = "[object Boolean]", Oo = "[object Date]", _o = "[object Map]", $o = "[object Number]", Ro = "[object Object]", Ao = "[object RegExp]", Po = "[object Set]", Mo = "[object String]", Io = Array.isArray, ft = typeof ArrayBuffer == "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null, dt = Object.assign, Bo = Object.prototype.toString.call.bind(Object.prototype.toString);
function Do(e) {
  var r = e.areArraysEqual, t = e.areDatesEqual, n = e.areMapsEqual, o = e.areObjectsEqual, a = e.arePrimitiveWrappersEqual, s = e.areRegExpsEqual, c = e.areSetsEqual, u = e.areTypedArraysEqual;
  return function(i, l, d) {
    if (i === l)
      return !0;
    if (i == null || l == null || typeof i != "object" || typeof l != "object")
      return i !== i && l !== l;
    var f = i.constructor;
    if (f !== l.constructor)
      return !1;
    if (f === Object)
      return o(i, l, d);
    if (Io(i))
      return r(i, l, d);
    if (ft != null && ft(i))
      return u(i, l, d);
    if (f === Date)
      return t(i, l, d);
    if (f === RegExp)
      return s(i, l, d);
    if (f === Map)
      return n(i, l, d);
    if (f === Set)
      return c(i, l, d);
    var b = Bo(i);
    return b === Oo ? t(i, l, d) : b === Ao ? s(i, l, d) : b === _o ? n(i, l, d) : b === Po ? c(i, l, d) : b === Ro ? typeof i.then != "function" && typeof l.then != "function" && o(i, l, d) : b === To ? o(i, l, d) : b === Co || b === $o || b === Mo ? a(i, l, d) : !1;
  };
}
function Vo(e) {
  var r = e.circular, t = e.createCustomConfig, n = e.strict, o = {
    areArraysEqual: n ? Ye : No,
    areDatesEqual: Eo,
    areMapsEqual: n ? at(lt, Ye) : lt,
    areObjectsEqual: n ? Ye : ko,
    arePrimitiveWrappersEqual: So,
    areRegExpsEqual: xo,
    areSetsEqual: n ? at(ut, Ye) : ut,
    areTypedArraysEqual: n ? Ye : wo
  };
  if (t && (o = dt({}, o, t(o))), r) {
    var a = sr(o.areArraysEqual), s = sr(o.areMapsEqual), c = sr(o.areObjectsEqual), u = sr(o.areSetsEqual);
    o = dt({}, o, {
      areArraysEqual: a,
      areMapsEqual: s,
      areObjectsEqual: c,
      areSetsEqual: u
    });
  }
  return o;
}
function jo(e) {
  return function(r, t, n, o, a, s, c) {
    return e(r, t, c);
  };
}
function zo(e) {
  var r = e.circular, t = e.comparator, n = e.createState, o = e.equals, a = e.strict;
  if (n)
    return function(c, u) {
      var i = n(), l = i.cache, d = l === void 0 ? r ? /* @__PURE__ */ new WeakMap() : void 0 : l, f = i.meta;
      return t(c, u, {
        cache: d,
        equals: o,
        meta: f,
        strict: a
      });
    };
  if (r)
    return function(c, u) {
      return t(c, u, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: o,
        meta: void 0,
        strict: a
      });
    };
  var s = {
    cache: void 0,
    equals: o,
    meta: void 0,
    strict: a
  };
  return function(c, u) {
    return t(c, u, s);
  };
}
Se();
Se({ strict: !0 });
Se({ circular: !0 });
Se({
  circular: !0,
  strict: !0
});
Se({
  createInternalComparator: function() {
    return Fe;
  }
});
Se({
  strict: !0,
  createInternalComparator: function() {
    return Fe;
  }
});
Se({
  circular: !0,
  createInternalComparator: function() {
    return Fe;
  }
});
Se({
  circular: !0,
  createInternalComparator: function() {
    return Fe;
  },
  strict: !0
});
function Se(e) {
  e === void 0 && (e = {});
  var r = e.circular, t = r === void 0 ? !1 : r, n = e.createInternalComparator, o = e.createState, a = e.strict, s = a === void 0 ? !1 : a, c = Vo(e), u = Do(c), i = n ? n(u) : jo(u);
  return zo({ circular: t, comparator: u, createState: o, equals: i, strict: s });
}
function Lo(e, r = "top") {
  if (!e || typeof document > "u")
    return;
  const t = document.head || document.querySelector("head"), n = t.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), r === "top" && n ? t.insertBefore(o, n) : t.appendChild(o);
}
Lo("", "top");
function ur({
  variant: e = "outlined",
  id: r,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: c,
  isRequired: u = !1,
  className: i,
  defaultValue: l,
  value: d,
  onChange: f,
  onFocus: b,
  onBlur: y
}) {
  return /* @__PURE__ */ k(
    zt,
    {
      variant: e,
      id: r,
      disabled: t,
      error: n,
      fullWidth: o,
      helperText: a,
      label: s,
      placeholder: c,
      required: u,
      className: `papi-textfield ${i ?? ""}`,
      defaultValue: l,
      value: d,
      onChange: f,
      onFocus: b,
      onBlur: y
    }
  );
}
function Oi({ scrRef: e, handleSubmit: r, id: t }) {
  const n = (u) => {
    r(u);
  }, o = (u, i) => {
    const d = { bookNum: Te.bookIdToNumber(i.bookId), chapterNum: 1, verseNum: 1 };
    n(d);
  }, a = (u) => {
    r({ ...e, chapterNum: +u.target.value });
  }, s = (u) => {
    r({ ...e, verseNum: +u.target.value });
  }, c = Mr(() => kr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ He("span", { id: t, children: [
    /* @__PURE__ */ k(
      Rr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: c,
        options: kr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ k(
      Pe,
      {
        onClick: () => n(tt(e, -1)),
        isDisabled: e.bookNum <= tn,
        children: "<"
      }
    ),
    /* @__PURE__ */ k(
      Pe,
      {
        onClick: () => n(tt(e, 1)),
        isDisabled: e.bookNum >= kr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ k(
      ur,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ k(
      Pe,
      {
        onClick: () => r(nt(e, -1)),
        isDisabled: e.chapterNum <= nn,
        children: "<"
      }
    ),
    /* @__PURE__ */ k(
      Pe,
      {
        onClick: () => r(nt(e, 1)),
        isDisabled: e.chapterNum >= an(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ k(
      ur,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ k(
      Pe,
      {
        onClick: () => r(ot(e, -1)),
        isDisabled: e.verseNum <= on,
        children: "<"
      }
    ),
    /* @__PURE__ */ k(Pe, { onClick: () => r(ot(e, 1)), children: ">" })
  ] });
}
function _i({ onSearch: e, placeholder: r, isFullWidth: t }) {
  const [n, o] = Le(""), a = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ k(On, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ k(
    ur,
    {
      isFullWidth: t,
      className: "search-bar-input",
      placeholder: r,
      value: n,
      onChange: (s) => a(s.target.value)
    }
  ) });
}
function $i({
  id: e,
  isDisabled: r = !1,
  orientation: t = "horizontal",
  min: n = 0,
  max: o = 100,
  step: a = 1,
  showMarks: s = !1,
  defaultValue: c,
  value: u,
  valueLabelDisplay: i = "off",
  className: l,
  onChange: d,
  onChangeCommitted: f
}) {
  return /* @__PURE__ */ k(
    _n,
    {
      id: e,
      disabled: r,
      orientation: t,
      min: n,
      max: o,
      step: a,
      marks: s,
      defaultValue: c,
      value: u,
      valueLabelDisplay: i,
      className: `papi-slider ${t} ${l ?? ""}`,
      onChange: d,
      onChangeCommitted: f
    }
  );
}
function Ri({
  autoHideDuration: e = void 0,
  id: r,
  isOpen: t = !1,
  className: n,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: c
}) {
  const u = {
    action: (s == null ? void 0 : s.action) || c,
    message: s == null ? void 0 : s.message,
    className: n
  };
  return /* @__PURE__ */ k(
    $n,
    {
      autoHideDuration: e ?? void 0,
      open: t,
      onClose: o,
      anchorOrigin: a,
      id: r,
      ContentProps: u
    }
  );
}
function Ai({
  id: e,
  isChecked: r,
  isDisabled: t = !1,
  hasError: n = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ k(
    Rn,
    {
      id: e,
      checked: r,
      disabled: t,
      className: `papi-switch ${n ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function pt({ onRowChange: e, row: r, column: t }) {
  const n = (o) => {
    e({ ...r, [t.key]: o.target.value });
  };
  return /* @__PURE__ */ k(ur, { defaultValue: r[t.key], onChange: n });
}
const qo = ({ onChange: e, disabled: r, checked: t, ...n }) => /* @__PURE__ */ k(
  Ln,
  {
    ...n,
    isChecked: t,
    isDisabled: r,
    onChange: (a) => {
      e(a.target.checked, a.nativeEvent.shiftKey);
    }
  }
);
function Pi({
  columns: e,
  sortColumns: r,
  onSortColumnsChange: t,
  onColumnResize: n,
  defaultColumnWidth: o,
  defaultColumnMinWidth: a,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: c = !0,
  defaultColumnResizable: u = !0,
  rows: i,
  enableSelectColumn: l,
  selectColumnWidth: d = 50,
  rowKeyGetter: f,
  rowHeight: b = 35,
  headerRowHeight: y = 35,
  selectedRows: h,
  onSelectedRowsChange: p,
  onRowsChange: S,
  onCellClick: Y,
  onCellDoubleClick: V,
  onCellContextMenu: P,
  onCellKeyDown: m,
  direction: Z = "ltr",
  enableVirtualization: oe = !0,
  onCopy: ue,
  onPaste: ce,
  onScroll: j,
  className: Q,
  id: fe
}) {
  const de = Mr(() => {
    const re = e.map((W) => typeof W.editable == "function" ? {
      ...W,
      editable: (le) => !!W.editable(le),
      renderEditCell: W.renderEditCell || pt
    } : W.editable && !W.renderEditCell ? { ...W, renderEditCell: pt } : W.renderEditCell && !W.editable ? { ...W, editable: !1 } : W);
    return l ? [{ ...Dn, minWidth: d }, ...re] : re;
  }, [e, l, d]);
  return /* @__PURE__ */ k(
    Bn,
    {
      columns: de,
      defaultColumnOptions: {
        width: o,
        minWidth: a,
        maxWidth: s,
        sortable: c,
        resizable: u
      },
      sortColumns: r,
      onSortColumnsChange: t,
      onColumnResize: n,
      rows: i,
      rowKeyGetter: f,
      rowHeight: b,
      headerRowHeight: y,
      selectedRows: h,
      onSelectedRowsChange: p,
      onRowsChange: S,
      onCellClick: Y,
      onCellDoubleClick: V,
      onCellContextMenu: P,
      onCellKeyDown: m,
      direction: Z,
      enableVirtualization: oe,
      onCopy: ue,
      onPaste: ce,
      onScroll: j,
      renderers: { renderCheckbox: qo },
      className: Q ?? "rdg-light",
      id: fe
    }
  );
}
function M() {
  return M = Object.assign ? Object.assign.bind() : function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, M.apply(this, arguments);
}
function ze(e) {
  return e !== null && typeof e == "object" && e.constructor === Object;
}
function ln(e) {
  if (!ze(e))
    return e;
  const r = {};
  return Object.keys(e).forEach((t) => {
    r[t] = ln(e[t]);
  }), r;
}
function be(e, r, t = {
  clone: !0
}) {
  const n = t.clone ? M({}, e) : e;
  return ze(e) && ze(r) && Object.keys(r).forEach((o) => {
    o !== "__proto__" && (ze(r[o]) && o in e && ze(e[o]) ? n[o] = be(e[o], r[o], t) : t.clone ? n[o] = ze(r[o]) ? ln(r[o]) : r[o] : n[o] = r[o]);
  }), n;
}
function Xo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ar = { exports: {} }, ir = { exports: {} }, L = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ht;
function Jo() {
  if (ht)
    return L;
  ht = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, i = e ? Symbol.for("react.concurrent_mode") : 60111, l = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, p = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, Y = e ? Symbol.for("react.scope") : 60119;
  function V(m) {
    if (typeof m == "object" && m !== null) {
      var Z = m.$$typeof;
      switch (Z) {
        case r:
          switch (m = m.type, m) {
            case u:
            case i:
            case n:
            case a:
            case o:
            case d:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case c:
                case l:
                case y:
                case b:
                case s:
                  return m;
                default:
                  return Z;
              }
          }
        case t:
          return Z;
      }
    }
  }
  function P(m) {
    return V(m) === i;
  }
  return L.AsyncMode = u, L.ConcurrentMode = i, L.ContextConsumer = c, L.ContextProvider = s, L.Element = r, L.ForwardRef = l, L.Fragment = n, L.Lazy = y, L.Memo = b, L.Portal = t, L.Profiler = a, L.StrictMode = o, L.Suspense = d, L.isAsyncMode = function(m) {
    return P(m) || V(m) === u;
  }, L.isConcurrentMode = P, L.isContextConsumer = function(m) {
    return V(m) === c;
  }, L.isContextProvider = function(m) {
    return V(m) === s;
  }, L.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === r;
  }, L.isForwardRef = function(m) {
    return V(m) === l;
  }, L.isFragment = function(m) {
    return V(m) === n;
  }, L.isLazy = function(m) {
    return V(m) === y;
  }, L.isMemo = function(m) {
    return V(m) === b;
  }, L.isPortal = function(m) {
    return V(m) === t;
  }, L.isProfiler = function(m) {
    return V(m) === a;
  }, L.isStrictMode = function(m) {
    return V(m) === o;
  }, L.isSuspense = function(m) {
    return V(m) === d;
  }, L.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === n || m === i || m === a || m === o || m === d || m === f || typeof m == "object" && m !== null && (m.$$typeof === y || m.$$typeof === b || m.$$typeof === s || m.$$typeof === c || m.$$typeof === l || m.$$typeof === p || m.$$typeof === S || m.$$typeof === Y || m.$$typeof === h);
  }, L.typeOf = V, L;
}
var q = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mt;
function Ho() {
  return mt || (mt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, c = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, i = e ? Symbol.for("react.concurrent_mode") : 60111, l = e ? Symbol.for("react.forward_ref") : 60112, d = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, p = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, Y = e ? Symbol.for("react.scope") : 60119;
    function V(v) {
      return typeof v == "string" || typeof v == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      v === n || v === i || v === a || v === o || v === d || v === f || typeof v == "object" && v !== null && (v.$$typeof === y || v.$$typeof === b || v.$$typeof === s || v.$$typeof === c || v.$$typeof === l || v.$$typeof === p || v.$$typeof === S || v.$$typeof === Y || v.$$typeof === h);
    }
    function P(v) {
      if (typeof v == "object" && v !== null) {
        var ae = v.$$typeof;
        switch (ae) {
          case r:
            var E = v.type;
            switch (E) {
              case u:
              case i:
              case n:
              case a:
              case o:
              case d:
                return E;
              default:
                var Ae = E && E.$$typeof;
                switch (Ae) {
                  case c:
                  case l:
                  case y:
                  case b:
                  case s:
                    return Ae;
                  default:
                    return ae;
                }
            }
          case t:
            return ae;
        }
      }
    }
    var m = u, Z = i, oe = c, ue = s, ce = r, j = l, Q = n, fe = y, de = b, re = t, W = a, te = o, le = d, we = !1;
    function Re(v) {
      return we || (we = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), g(v) || P(v) === u;
    }
    function g(v) {
      return P(v) === i;
    }
    function N(v) {
      return P(v) === c;
    }
    function O(v) {
      return P(v) === s;
    }
    function T(v) {
      return typeof v == "object" && v !== null && v.$$typeof === r;
    }
    function x(v) {
      return P(v) === l;
    }
    function I(v) {
      return P(v) === n;
    }
    function w(v) {
      return P(v) === y;
    }
    function C(v) {
      return P(v) === b;
    }
    function B(v) {
      return P(v) === t;
    }
    function z(v) {
      return P(v) === a;
    }
    function D(v) {
      return P(v) === o;
    }
    function ee(v) {
      return P(v) === d;
    }
    q.AsyncMode = m, q.ConcurrentMode = Z, q.ContextConsumer = oe, q.ContextProvider = ue, q.Element = ce, q.ForwardRef = j, q.Fragment = Q, q.Lazy = fe, q.Memo = de, q.Portal = re, q.Profiler = W, q.StrictMode = te, q.Suspense = le, q.isAsyncMode = Re, q.isConcurrentMode = g, q.isContextConsumer = N, q.isContextProvider = O, q.isElement = T, q.isForwardRef = x, q.isFragment = I, q.isLazy = w, q.isMemo = C, q.isPortal = B, q.isProfiler = z, q.isStrictMode = D, q.isSuspense = ee, q.isValidElementType = V, q.typeOf = P;
  }()), q;
}
var gt;
function un() {
  return gt || (gt = 1, process.env.NODE_ENV === "production" ? ir.exports = Jo() : ir.exports = Ho()), ir.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Sr, bt;
function Go() {
  if (bt)
    return Sr;
  bt = 1;
  var e = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, t = Object.prototype.propertyIsEnumerable;
  function n(a) {
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
      for (var s = {}, c = 0; c < 10; c++)
        s["_" + String.fromCharCode(c)] = c;
      var u = Object.getOwnPropertyNames(s).map(function(l) {
        return s[l];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var i = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(l) {
        i[l] = l;
      }), Object.keys(Object.assign({}, i)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Sr = o() ? Object.assign : function(a, s) {
    for (var c, u = n(a), i, l = 1; l < arguments.length; l++) {
      c = Object(arguments[l]);
      for (var d in c)
        r.call(c, d) && (u[d] = c[d]);
      if (e) {
        i = e(c);
        for (var f = 0; f < i.length; f++)
          t.call(c, i[f]) && (u[i[f]] = c[i[f]]);
      }
    }
    return u;
  }, Sr;
}
var xr, yt;
function Lr() {
  if (yt)
    return xr;
  yt = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return xr = e, xr;
}
var wr, vt;
function fn() {
  return vt || (vt = 1, wr = Function.call.bind(Object.prototype.hasOwnProperty)), wr;
}
var Tr, Nt;
function Uo() {
  if (Nt)
    return Tr;
  Nt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = Lr(), t = {}, n = fn();
    e = function(a) {
      var s = "Warning: " + a;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(a, s, c, u, i) {
    if (process.env.NODE_ENV !== "production") {
      for (var l in a)
        if (n(a, l)) {
          var d;
          try {
            if (typeof a[l] != "function") {
              var f = Error(
                (u || "React class") + ": " + c + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            d = a[l](s, l, u, c, null, r);
          } catch (y) {
            d = y;
          }
          if (d && !(d instanceof Error) && e(
            (u || "React class") + ": type specification of " + c + " `" + l + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof d + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), d instanceof Error && !(d.message in t)) {
            t[d.message] = !0;
            var b = i ? i() : "";
            e(
              "Failed " + c + " type: " + d.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (t = {});
  }, Tr = o, Tr;
}
var Cr, Et;
function Fo() {
  if (Et)
    return Cr;
  Et = 1;
  var e = un(), r = Go(), t = Lr(), n = fn(), o = Uo(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(c) {
    var u = "Warning: " + c;
    typeof console < "u" && console.error(u);
    try {
      throw new Error(u);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return Cr = function(c, u) {
    var i = typeof Symbol == "function" && Symbol.iterator, l = "@@iterator";
    function d(g) {
      var N = g && (i && g[i] || g[l]);
      if (typeof N == "function")
        return N;
    }
    var f = "<<anonymous>>", b = {
      array: S("array"),
      bigint: S("bigint"),
      bool: S("boolean"),
      func: S("function"),
      number: S("number"),
      object: S("object"),
      string: S("string"),
      symbol: S("symbol"),
      any: Y(),
      arrayOf: V,
      element: P(),
      elementType: m(),
      instanceOf: Z,
      node: j(),
      objectOf: ue,
      oneOf: oe,
      oneOfType: ce,
      shape: fe,
      exact: de
    };
    function y(g, N) {
      return g === N ? g !== 0 || 1 / g === 1 / N : g !== g && N !== N;
    }
    function h(g, N) {
      this.message = g, this.data = N && typeof N == "object" ? N : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function p(g) {
      if (process.env.NODE_ENV !== "production")
        var N = {}, O = 0;
      function T(I, w, C, B, z, D, ee) {
        if (B = B || f, D = D || C, ee !== t) {
          if (u) {
            var v = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw v.name = "Invariant Violation", v;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ae = B + ":" + C;
            !N[ae] && // Avoid spamming the console because they are often not actionable except for lib authors
            O < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + D + "` prop on `" + B + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), N[ae] = !0, O++);
          }
        }
        return w[C] == null ? I ? w[C] === null ? new h("The " + z + " `" + D + "` is marked as required " + ("in `" + B + "`, but its value is `null`.")) : new h("The " + z + " `" + D + "` is marked as required in " + ("`" + B + "`, but its value is `undefined`.")) : null : g(w, C, B, z, D);
      }
      var x = T.bind(null, !1);
      return x.isRequired = T.bind(null, !0), x;
    }
    function S(g) {
      function N(O, T, x, I, w, C) {
        var B = O[T], z = te(B);
        if (z !== g) {
          var D = le(B);
          return new h(
            "Invalid " + I + " `" + w + "` of type " + ("`" + D + "` supplied to `" + x + "`, expected ") + ("`" + g + "`."),
            { expectedType: g }
          );
        }
        return null;
      }
      return p(N);
    }
    function Y() {
      return p(s);
    }
    function V(g) {
      function N(O, T, x, I, w) {
        if (typeof g != "function")
          return new h("Property `" + w + "` of component `" + x + "` has invalid PropType notation inside arrayOf.");
        var C = O[T];
        if (!Array.isArray(C)) {
          var B = te(C);
          return new h("Invalid " + I + " `" + w + "` of type " + ("`" + B + "` supplied to `" + x + "`, expected an array."));
        }
        for (var z = 0; z < C.length; z++) {
          var D = g(C, z, x, I, w + "[" + z + "]", t);
          if (D instanceof Error)
            return D;
        }
        return null;
      }
      return p(N);
    }
    function P() {
      function g(N, O, T, x, I) {
        var w = N[O];
        if (!c(w)) {
          var C = te(w);
          return new h("Invalid " + x + " `" + I + "` of type " + ("`" + C + "` supplied to `" + T + "`, expected a single ReactElement."));
        }
        return null;
      }
      return p(g);
    }
    function m() {
      function g(N, O, T, x, I) {
        var w = N[O];
        if (!e.isValidElementType(w)) {
          var C = te(w);
          return new h("Invalid " + x + " `" + I + "` of type " + ("`" + C + "` supplied to `" + T + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return p(g);
    }
    function Z(g) {
      function N(O, T, x, I, w) {
        if (!(O[T] instanceof g)) {
          var C = g.name || f, B = Re(O[T]);
          return new h("Invalid " + I + " `" + w + "` of type " + ("`" + B + "` supplied to `" + x + "`, expected ") + ("instance of `" + C + "`."));
        }
        return null;
      }
      return p(N);
    }
    function oe(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function N(O, T, x, I, w) {
        for (var C = O[T], B = 0; B < g.length; B++)
          if (y(C, g[B]))
            return null;
        var z = JSON.stringify(g, function(ee, v) {
          var ae = le(v);
          return ae === "symbol" ? String(v) : v;
        });
        return new h("Invalid " + I + " `" + w + "` of value `" + String(C) + "` " + ("supplied to `" + x + "`, expected one of " + z + "."));
      }
      return p(N);
    }
    function ue(g) {
      function N(O, T, x, I, w) {
        if (typeof g != "function")
          return new h("Property `" + w + "` of component `" + x + "` has invalid PropType notation inside objectOf.");
        var C = O[T], B = te(C);
        if (B !== "object")
          return new h("Invalid " + I + " `" + w + "` of type " + ("`" + B + "` supplied to `" + x + "`, expected an object."));
        for (var z in C)
          if (n(C, z)) {
            var D = g(C, z, x, I, w + "." + z, t);
            if (D instanceof Error)
              return D;
          }
        return null;
      }
      return p(N);
    }
    function ce(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var N = 0; N < g.length; N++) {
        var O = g[N];
        if (typeof O != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + we(O) + " at index " + N + "."
          ), s;
      }
      function T(x, I, w, C, B) {
        for (var z = [], D = 0; D < g.length; D++) {
          var ee = g[D], v = ee(x, I, w, C, B, t);
          if (v == null)
            return null;
          v.data && n(v.data, "expectedType") && z.push(v.data.expectedType);
        }
        var ae = z.length > 0 ? ", expected one of type [" + z.join(", ") + "]" : "";
        return new h("Invalid " + C + " `" + B + "` supplied to " + ("`" + w + "`" + ae + "."));
      }
      return p(T);
    }
    function j() {
      function g(N, O, T, x, I) {
        return re(N[O]) ? null : new h("Invalid " + x + " `" + I + "` supplied to " + ("`" + T + "`, expected a ReactNode."));
      }
      return p(g);
    }
    function Q(g, N, O, T, x) {
      return new h(
        (g || "React class") + ": " + N + " type `" + O + "." + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + x + "`."
      );
    }
    function fe(g) {
      function N(O, T, x, I, w) {
        var C = O[T], B = te(C);
        if (B !== "object")
          return new h("Invalid " + I + " `" + w + "` of type `" + B + "` " + ("supplied to `" + x + "`, expected `object`."));
        for (var z in g) {
          var D = g[z];
          if (typeof D != "function")
            return Q(x, I, w, z, le(D));
          var ee = D(C, z, x, I, w + "." + z, t);
          if (ee)
            return ee;
        }
        return null;
      }
      return p(N);
    }
    function de(g) {
      function N(O, T, x, I, w) {
        var C = O[T], B = te(C);
        if (B !== "object")
          return new h("Invalid " + I + " `" + w + "` of type `" + B + "` " + ("supplied to `" + x + "`, expected `object`."));
        var z = r({}, O[T], g);
        for (var D in z) {
          var ee = g[D];
          if (n(g, D) && typeof ee != "function")
            return Q(x, I, w, D, le(ee));
          if (!ee)
            return new h(
              "Invalid " + I + " `" + w + "` key `" + D + "` supplied to `" + x + "`.\nBad object: " + JSON.stringify(O[T], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(g), null, "  ")
            );
          var v = ee(C, D, x, I, w + "." + D, t);
          if (v)
            return v;
        }
        return null;
      }
      return p(N);
    }
    function re(g) {
      switch (typeof g) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !g;
        case "object":
          if (Array.isArray(g))
            return g.every(re);
          if (g === null || c(g))
            return !0;
          var N = d(g);
          if (N) {
            var O = N.call(g), T;
            if (N !== g.entries) {
              for (; !(T = O.next()).done; )
                if (!re(T.value))
                  return !1;
            } else
              for (; !(T = O.next()).done; ) {
                var x = T.value;
                if (x && !re(x[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function W(g, N) {
      return g === "symbol" ? !0 : N ? N["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && N instanceof Symbol : !1;
    }
    function te(g) {
      var N = typeof g;
      return Array.isArray(g) ? "array" : g instanceof RegExp ? "object" : W(N, g) ? "symbol" : N;
    }
    function le(g) {
      if (typeof g > "u" || g === null)
        return "" + g;
      var N = te(g);
      if (N === "object") {
        if (g instanceof Date)
          return "date";
        if (g instanceof RegExp)
          return "regexp";
      }
      return N;
    }
    function we(g) {
      var N = le(g);
      switch (N) {
        case "array":
        case "object":
          return "an " + N;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + N;
        default:
          return N;
      }
    }
    function Re(g) {
      return !g.constructor || !g.constructor.name ? f : g.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, Cr;
}
var Or, kt;
function Ko() {
  if (kt)
    return Or;
  kt = 1;
  var e = Lr();
  function r() {
  }
  function t() {
  }
  return t.resetWarningCache = r, Or = function() {
    function n(s, c, u, i, l, d) {
      if (d !== e) {
        var f = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw f.name = "Invariant Violation", f;
      }
    }
    n.isRequired = n;
    function o() {
      return n;
    }
    var a = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: o,
      element: n,
      elementType: n,
      instanceOf: o,
      node: n,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: t,
      resetWarningCache: r
    };
    return a.PropTypes = a, a;
  }, Or;
}
if (process.env.NODE_ENV !== "production") {
  var Wo = un(), Yo = !0;
  Ar.exports = Fo()(Wo.isElement, Yo);
} else
  Ar.exports = Ko()();
var Zo = Ar.exports;
const G = /* @__PURE__ */ Xo(Zo);
function Xe(e) {
  let r = "https://mui.com/production-error/?code=" + e;
  for (let t = 1; t < arguments.length; t += 1)
    r += "&args[]=" + encodeURIComponent(arguments[t]);
  return "Minified MUI error #" + e + "; visit " + r + " for the full message.";
}
var Pr = { exports: {} }, X = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var St;
function Qo() {
  if (St)
    return X;
  St = 1;
  var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), i = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function h(p) {
    if (typeof p == "object" && p !== null) {
      var S = p.$$typeof;
      switch (S) {
        case e:
          switch (p = p.type, p) {
            case t:
            case o:
            case n:
            case i:
            case l:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case c:
                case s:
                case u:
                case f:
                case d:
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
  return X.ContextConsumer = s, X.ContextProvider = a, X.Element = e, X.ForwardRef = u, X.Fragment = t, X.Lazy = f, X.Memo = d, X.Portal = r, X.Profiler = o, X.StrictMode = n, X.Suspense = i, X.SuspenseList = l, X.isAsyncMode = function() {
    return !1;
  }, X.isConcurrentMode = function() {
    return !1;
  }, X.isContextConsumer = function(p) {
    return h(p) === s;
  }, X.isContextProvider = function(p) {
    return h(p) === a;
  }, X.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === e;
  }, X.isForwardRef = function(p) {
    return h(p) === u;
  }, X.isFragment = function(p) {
    return h(p) === t;
  }, X.isLazy = function(p) {
    return h(p) === f;
  }, X.isMemo = function(p) {
    return h(p) === d;
  }, X.isPortal = function(p) {
    return h(p) === r;
  }, X.isProfiler = function(p) {
    return h(p) === o;
  }, X.isStrictMode = function(p) {
    return h(p) === n;
  }, X.isSuspense = function(p) {
    return h(p) === i;
  }, X.isSuspenseList = function(p) {
    return h(p) === l;
  }, X.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === t || p === o || p === n || p === i || p === l || p === b || typeof p == "object" && p !== null && (p.$$typeof === f || p.$$typeof === d || p.$$typeof === a || p.$$typeof === s || p.$$typeof === u || p.$$typeof === y || p.getModuleId !== void 0);
  }, X.typeOf = h, X;
}
var J = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xt;
function ea() {
  return xt || (xt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), i = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), y = !1, h = !1, p = !1, S = !1, Y = !1, V;
    V = Symbol.for("react.module.reference");
    function P(E) {
      return !!(typeof E == "string" || typeof E == "function" || E === t || E === o || Y || E === n || E === i || E === l || S || E === b || y || h || p || typeof E == "object" && E !== null && (E.$$typeof === f || E.$$typeof === d || E.$$typeof === a || E.$$typeof === s || E.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      E.$$typeof === V || E.getModuleId !== void 0));
    }
    function m(E) {
      if (typeof E == "object" && E !== null) {
        var Ae = E.$$typeof;
        switch (Ae) {
          case e:
            var ar = E.type;
            switch (ar) {
              case t:
              case o:
              case n:
              case i:
              case l:
                return ar;
              default:
                var Wr = ar && ar.$$typeof;
                switch (Wr) {
                  case c:
                  case s:
                  case u:
                  case f:
                  case d:
                  case a:
                    return Wr;
                  default:
                    return Ae;
                }
            }
          case r:
            return Ae;
        }
      }
    }
    var Z = s, oe = a, ue = e, ce = u, j = t, Q = f, fe = d, de = r, re = o, W = n, te = i, le = l, we = !1, Re = !1;
    function g(E) {
      return we || (we = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function N(E) {
      return Re || (Re = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function O(E) {
      return m(E) === s;
    }
    function T(E) {
      return m(E) === a;
    }
    function x(E) {
      return typeof E == "object" && E !== null && E.$$typeof === e;
    }
    function I(E) {
      return m(E) === u;
    }
    function w(E) {
      return m(E) === t;
    }
    function C(E) {
      return m(E) === f;
    }
    function B(E) {
      return m(E) === d;
    }
    function z(E) {
      return m(E) === r;
    }
    function D(E) {
      return m(E) === o;
    }
    function ee(E) {
      return m(E) === n;
    }
    function v(E) {
      return m(E) === i;
    }
    function ae(E) {
      return m(E) === l;
    }
    J.ContextConsumer = Z, J.ContextProvider = oe, J.Element = ue, J.ForwardRef = ce, J.Fragment = j, J.Lazy = Q, J.Memo = fe, J.Portal = de, J.Profiler = re, J.StrictMode = W, J.Suspense = te, J.SuspenseList = le, J.isAsyncMode = g, J.isConcurrentMode = N, J.isContextConsumer = O, J.isContextProvider = T, J.isElement = x, J.isForwardRef = I, J.isFragment = w, J.isLazy = C, J.isMemo = B, J.isPortal = z, J.isProfiler = D, J.isStrictMode = ee, J.isSuspense = v, J.isSuspenseList = ae, J.isValidElementType = P, J.typeOf = m;
  }()), J;
}
process.env.NODE_ENV === "production" ? Pr.exports = Qo() : Pr.exports = ea();
var wt = Pr.exports;
const ra = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function ta(e) {
  const r = `${e}`.match(ra);
  return r && r[1] || "";
}
function dn(e, r = "") {
  return e.displayName || e.name || ta(e) || r;
}
function Tt(e, r, t) {
  const n = dn(r);
  return e.displayName || (n !== "" ? `${t}(${n})` : t);
}
function na(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return dn(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case wt.ForwardRef:
          return Tt(e, e.render, "ForwardRef");
        case wt.Memo:
          return Tt(e, e.type, "memo");
        default:
          return;
      }
  }
}
function he(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Xe(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function pn(e, r) {
  const t = M({}, r);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      t[n] = M({}, e[n], t[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = r[n];
      t[n] = {}, !a || !Object.keys(a) ? t[n] = o : !o || !Object.keys(o) ? t[n] = a : (t[n] = M({}, a), Object.keys(o).forEach((s) => {
        t[n][s] = pn(o[s], a[s]);
      }));
    } else
      t[n] === void 0 && (t[n] = e[n]);
  }), t;
}
function oa(e, r, t = void 0) {
  const n = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      n[o] = e[o].reduce((a, s) => {
        if (s) {
          const c = r(s);
          c !== "" && a.push(c), t && t[s] && a.push(t[s]);
        }
        return a;
      }, []).join(" ");
    }
  ), n;
}
const Ct = (e) => e, aa = () => {
  let e = Ct;
  return {
    configure(r) {
      e = r;
    },
    generate(r) {
      return e(r);
    },
    reset() {
      e = Ct;
    }
  };
}, sa = aa(), ia = sa, ca = {
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
function qr(e, r, t = "Mui") {
  const n = ca[r];
  return n ? `${t}-${n}` : `${ia.generate(e)}-${r}`;
}
function la(e, r, t = "Mui") {
  const n = {};
  return r.forEach((o) => {
    n[o] = qr(e, o, t);
  }), n;
}
function ve(e, r) {
  if (e == null)
    return {};
  var t = {}, n = Object.keys(e), o, a;
  for (a = 0; a < n.length; a++)
    o = n[a], !(r.indexOf(o) >= 0) && (t[o] = e[o]);
  return t;
}
function hn(e) {
  var r, t, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (r = 0; r < e.length; r++)
        e[r] && (t = hn(e[r])) && (n && (n += " "), n += t);
    else
      for (r in e)
        e[r] && (n && (n += " "), n += r);
  return n;
}
function ua() {
  for (var e, r, t = 0, n = ""; t < arguments.length; )
    (e = arguments[t++]) && (r = hn(e)) && (n && (n += " "), n += r);
  return n;
}
const fa = ["values", "unit", "step"], da = (e) => {
  const r = Object.keys(e).map((t) => ({
    key: t,
    val: e[t]
  })) || [];
  return r.sort((t, n) => t.val - n.val), r.reduce((t, n) => M({}, t, {
    [n.key]: n.val
  }), {});
};
function pa(e) {
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
    unit: t = "px",
    step: n = 5
  } = e, o = ve(e, fa), a = da(r), s = Object.keys(a);
  function c(f) {
    return `@media (min-width:${typeof r[f] == "number" ? r[f] : f}${t})`;
  }
  function u(f) {
    return `@media (max-width:${(typeof r[f] == "number" ? r[f] : f) - n / 100}${t})`;
  }
  function i(f, b) {
    const y = s.indexOf(b);
    return `@media (min-width:${typeof r[f] == "number" ? r[f] : f}${t}) and (max-width:${(y !== -1 && typeof r[s[y]] == "number" ? r[s[y]] : b) - n / 100}${t})`;
  }
  function l(f) {
    return s.indexOf(f) + 1 < s.length ? i(f, s[s.indexOf(f) + 1]) : c(f);
  }
  function d(f) {
    const b = s.indexOf(f);
    return b === 0 ? c(s[1]) : b === s.length - 1 ? u(s[b]) : i(f, s[s.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  return M({
    keys: s,
    values: a,
    up: c,
    down: u,
    between: i,
    only: l,
    not: d,
    unit: t
  }, o);
}
const ha = {
  borderRadius: 4
}, ma = ha, ga = process.env.NODE_ENV !== "production" ? G.oneOfType([G.number, G.string, G.object, G.array]) : {}, xe = ga;
function er(e, r) {
  return r ? be(e, r, {
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
}, Ot = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Xr[e]}px)`
};
function ye(e, r, t) {
  const n = e.theme || {};
  if (Array.isArray(r)) {
    const a = n.breakpoints || Ot;
    return r.reduce((s, c, u) => (s[a.up(a.keys[u])] = t(r[u]), s), {});
  }
  if (typeof r == "object") {
    const a = n.breakpoints || Ot;
    return Object.keys(r).reduce((s, c) => {
      if (Object.keys(a.values || Xr).indexOf(c) !== -1) {
        const u = a.up(c);
        s[u] = t(r[c], c);
      } else {
        const u = c;
        s[u] = r[u];
      }
      return s;
    }, {});
  }
  return t(r);
}
function ba(e = {}) {
  var r;
  return ((r = e.keys) == null ? void 0 : r.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function ya(e, r) {
  return e.reduce((t, n) => {
    const o = t[n];
    return (!o || Object.keys(o).length === 0) && delete t[n], t;
  }, r);
}
function pr(e, r, t = !0) {
  if (!r || typeof r != "string")
    return null;
  if (e && e.vars && t) {
    const n = `vars.${r}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (n != null)
      return n;
  }
  return r.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function fr(e, r, t, n = t) {
  let o;
  return typeof e == "function" ? o = e(t) : Array.isArray(e) ? o = e[t] || n : o = pr(e, t) || n, r && (o = r(o, n, e)), o;
}
function H(e) {
  const {
    prop: r,
    cssProperty: t = e.prop,
    themeKey: n,
    transform: o
  } = e, a = (s) => {
    if (s[r] == null)
      return null;
    const c = s[r], u = s.theme, i = pr(u, n) || {};
    return ye(s, c, (d) => {
      let f = fr(i, o, d);
      return d === f && typeof d == "string" && (f = fr(i, o, `${r}${d === "default" ? "" : he(d)}`, d)), t === !1 ? f : {
        [t]: f
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [r]: xe
  } : {}, a.filterProps = [r], a;
}
function va(e) {
  const r = {};
  return (t) => (r[t] === void 0 && (r[t] = e(t)), r[t]);
}
const Na = {
  m: "margin",
  p: "padding"
}, Ea = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, _t = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, ka = va((e) => {
  if (e.length > 2)
    if (_t[e])
      e = _t[e];
    else
      return [e];
  const [r, t] = e.split(""), n = Na[r], o = Ea[t] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), hr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], mr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Sa = [...hr, ...mr];
function nr(e, r, t, n) {
  var o;
  const a = (o = pr(e, r, !1)) != null ? o : t;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${r}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function mn(e) {
  return nr(e, "spacing", 8, "spacing");
}
function or(e, r) {
  if (typeof r == "string" || r == null)
    return r;
  const t = Math.abs(r), n = e(t);
  return r >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function xa(e, r) {
  return (t) => e.reduce((n, o) => (n[o] = or(r, t), n), {});
}
function wa(e, r, t, n) {
  if (r.indexOf(t) === -1)
    return null;
  const o = ka(t), a = xa(o, n), s = e[t];
  return ye(e, s, a);
}
function gn(e, r) {
  const t = mn(e.theme);
  return Object.keys(e).map((n) => wa(e, r, n, t)).reduce(er, {});
}
function F(e) {
  return gn(e, hr);
}
F.propTypes = process.env.NODE_ENV !== "production" ? hr.reduce((e, r) => (e[r] = xe, e), {}) : {};
F.filterProps = hr;
function K(e) {
  return gn(e, mr);
}
K.propTypes = process.env.NODE_ENV !== "production" ? mr.reduce((e, r) => (e[r] = xe, e), {}) : {};
K.filterProps = mr;
process.env.NODE_ENV !== "production" && Sa.reduce((e, r) => (e[r] = xe, e), {});
function Ta(e = 8) {
  if (e.mui)
    return e;
  const r = mn({
    spacing: e
  }), t = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const s = r(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return t.mui = !0, t;
}
function gr(...e) {
  const r = e.reduce((n, o) => (o.filterProps.forEach((a) => {
    n[a] = o;
  }), n), {}), t = (n) => Object.keys(n).reduce((o, a) => r[a] ? er(o, r[a](n)) : o, {});
  return t.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, t.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), t;
}
function pe(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
const Ca = H({
  prop: "border",
  themeKey: "borders",
  transform: pe
}), Oa = H({
  prop: "borderTop",
  themeKey: "borders",
  transform: pe
}), _a = H({
  prop: "borderRight",
  themeKey: "borders",
  transform: pe
}), $a = H({
  prop: "borderBottom",
  themeKey: "borders",
  transform: pe
}), Ra = H({
  prop: "borderLeft",
  themeKey: "borders",
  transform: pe
}), Aa = H({
  prop: "borderColor",
  themeKey: "palette"
}), Pa = H({
  prop: "borderTopColor",
  themeKey: "palette"
}), Ma = H({
  prop: "borderRightColor",
  themeKey: "palette"
}), Ia = H({
  prop: "borderBottomColor",
  themeKey: "palette"
}), Ba = H({
  prop: "borderLeftColor",
  themeKey: "palette"
}), br = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const r = nr(e.theme, "shape.borderRadius", 4, "borderRadius"), t = (n) => ({
      borderRadius: or(r, n)
    });
    return ye(e, e.borderRadius, t);
  }
  return null;
};
br.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: xe
} : {};
br.filterProps = ["borderRadius"];
gr(Ca, Oa, _a, $a, Ra, Aa, Pa, Ma, Ia, Ba, br);
const yr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const r = nr(e.theme, "spacing", 8, "gap"), t = (n) => ({
      gap: or(r, n)
    });
    return ye(e, e.gap, t);
  }
  return null;
};
yr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: xe
} : {};
yr.filterProps = ["gap"];
const vr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const r = nr(e.theme, "spacing", 8, "columnGap"), t = (n) => ({
      columnGap: or(r, n)
    });
    return ye(e, e.columnGap, t);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: xe
} : {};
vr.filterProps = ["columnGap"];
const Nr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const r = nr(e.theme, "spacing", 8, "rowGap"), t = (n) => ({
      rowGap: or(r, n)
    });
    return ye(e, e.rowGap, t);
  }
  return null;
};
Nr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: xe
} : {};
Nr.filterProps = ["rowGap"];
const Da = H({
  prop: "gridColumn"
}), Va = H({
  prop: "gridRow"
}), ja = H({
  prop: "gridAutoFlow"
}), za = H({
  prop: "gridAutoColumns"
}), La = H({
  prop: "gridAutoRows"
}), qa = H({
  prop: "gridTemplateColumns"
}), Xa = H({
  prop: "gridTemplateRows"
}), Ja = H({
  prop: "gridTemplateAreas"
}), Ha = H({
  prop: "gridArea"
});
gr(yr, vr, Nr, Da, Va, ja, za, La, qa, Xa, Ja, Ha);
function qe(e, r) {
  return r === "grey" ? r : e;
}
const Ga = H({
  prop: "color",
  themeKey: "palette",
  transform: qe
}), Ua = H({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: qe
}), Fa = H({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: qe
});
gr(Ga, Ua, Fa);
function ne(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Ka = H({
  prop: "width",
  transform: ne
}), Jr = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const r = (t) => {
      var n;
      return {
        maxWidth: ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[t]) || Xr[t] || ne(t)
      };
    };
    return ye(e, e.maxWidth, r);
  }
  return null;
};
Jr.filterProps = ["maxWidth"];
const Wa = H({
  prop: "minWidth",
  transform: ne
}), Ya = H({
  prop: "height",
  transform: ne
}), Za = H({
  prop: "maxHeight",
  transform: ne
}), Qa = H({
  prop: "minHeight",
  transform: ne
});
H({
  prop: "size",
  cssProperty: "width",
  transform: ne
});
H({
  prop: "size",
  cssProperty: "height",
  transform: ne
});
const es = H({
  prop: "boxSizing"
});
gr(Ka, Jr, Wa, Ya, Za, Qa, es);
const rs = {
  // borders
  border: {
    themeKey: "borders",
    transform: pe
  },
  borderTop: {
    themeKey: "borders",
    transform: pe
  },
  borderRight: {
    themeKey: "borders",
    transform: pe
  },
  borderBottom: {
    themeKey: "borders",
    transform: pe
  },
  borderLeft: {
    themeKey: "borders",
    transform: pe
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
    style: br
  },
  // palette
  color: {
    themeKey: "palette",
    transform: qe
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: qe
  },
  backgroundColor: {
    themeKey: "palette",
    transform: qe
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
    style: F
  },
  mt: {
    style: F
  },
  mr: {
    style: F
  },
  mb: {
    style: F
  },
  ml: {
    style: F
  },
  mx: {
    style: F
  },
  my: {
    style: F
  },
  margin: {
    style: F
  },
  marginTop: {
    style: F
  },
  marginRight: {
    style: F
  },
  marginBottom: {
    style: F
  },
  marginLeft: {
    style: F
  },
  marginX: {
    style: F
  },
  marginY: {
    style: F
  },
  marginInline: {
    style: F
  },
  marginInlineStart: {
    style: F
  },
  marginInlineEnd: {
    style: F
  },
  marginBlock: {
    style: F
  },
  marginBlockStart: {
    style: F
  },
  marginBlockEnd: {
    style: F
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
    style: yr
  },
  rowGap: {
    style: Nr
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
    transform: ne
  },
  maxWidth: {
    style: Jr
  },
  minWidth: {
    transform: ne
  },
  height: {
    transform: ne
  },
  maxHeight: {
    transform: ne
  },
  minHeight: {
    transform: ne
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
}, Hr = rs;
function ts(...e) {
  const r = e.reduce((n, o) => n.concat(Object.keys(o)), []), t = new Set(r);
  return e.every((n) => t.size === Object.keys(n).length);
}
function ns(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function os() {
  function e(t, n, o, a) {
    const s = {
      [t]: n,
      theme: o
    }, c = a[t];
    if (!c)
      return {
        [t]: n
      };
    const {
      cssProperty: u = t,
      themeKey: i,
      transform: l,
      style: d
    } = c;
    if (n == null)
      return null;
    if (i === "typography" && n === "inherit")
      return {
        [t]: n
      };
    const f = pr(o, i) || {};
    return d ? d(s) : ye(s, n, (y) => {
      let h = fr(f, l, y);
      return y === h && typeof y == "string" && (h = fr(f, l, `${t}${y === "default" ? "" : he(y)}`, y)), u === !1 ? h : {
        [u]: h
      };
    });
  }
  function r(t) {
    var n;
    const {
      sx: o,
      theme: a = {}
    } = t || {};
    if (!o)
      return null;
    const s = (n = a.unstable_sxConfig) != null ? n : Hr;
    function c(u) {
      let i = u;
      if (typeof u == "function")
        i = u(a);
      else if (typeof u != "object")
        return u;
      if (!i)
        return null;
      const l = ba(a.breakpoints), d = Object.keys(l);
      let f = l;
      return Object.keys(i).forEach((b) => {
        const y = ns(i[b], a);
        if (y != null)
          if (typeof y == "object")
            if (s[b])
              f = er(f, e(b, y, a, s));
            else {
              const h = ye({
                theme: a
              }, y, (p) => ({
                [b]: p
              }));
              ts(h, y) ? f[b] = r({
                sx: y,
                theme: a
              }) : f = er(f, h);
            }
          else
            f = er(f, e(b, y, a, s));
      }), ya(d, f);
    }
    return Array.isArray(o) ? o.map(c) : c(o);
  }
  return r;
}
const bn = os();
bn.filterProps = ["sx"];
const Gr = bn, as = ["breakpoints", "palette", "spacing", "shape"];
function Ur(e = {}, ...r) {
  const {
    breakpoints: t = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, s = ve(e, as), c = pa(t), u = Ta(o);
  let i = be({
    breakpoints: c,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: M({
      mode: "light"
    }, n),
    spacing: u,
    shape: M({}, ma, a)
  }, s);
  return i = r.reduce((l, d) => be(l, d), i), i.unstable_sxConfig = M({}, Hr, s == null ? void 0 : s.unstable_sxConfig), i.unstable_sx = function(d) {
    return Gr({
      sx: d,
      theme: this
    });
  }, i;
}
function ss(e) {
  return Object.keys(e).length === 0;
}
function is(e = null) {
  const r = rr.useContext(jn);
  return !r || ss(r) ? e : r;
}
const cs = Ur();
function ls(e = cs) {
  return is(e);
}
const us = ["variant"];
function $t(e) {
  return e.length === 0;
}
function yn(e) {
  const {
    variant: r
  } = e, t = ve(e, us);
  let n = r || "";
  return Object.keys(t).sort().forEach((o) => {
    o === "color" ? n += $t(n) ? e[o] : he(e[o]) : n += `${$t(n) ? o : he(o)}${he(e[o].toString())}`;
  }), n;
}
const fs = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function ds(e) {
  return Object.keys(e).length === 0;
}
function ps(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const hs = (e, r) => r.components && r.components[e] && r.components[e].styleOverrides ? r.components[e].styleOverrides : null, ms = (e, r) => {
  let t = [];
  r && r.components && r.components[e] && r.components[e].variants && (t = r.components[e].variants);
  const n = {};
  return t.forEach((o) => {
    const a = yn(o.props);
    n[a] = o.style;
  }), n;
}, gs = (e, r, t, n) => {
  var o;
  const {
    ownerState: a = {}
  } = e, s = [], c = t == null || (o = t.components) == null || (o = o[n]) == null ? void 0 : o.variants;
  return c && c.forEach((u) => {
    let i = !0;
    Object.keys(u.props).forEach((l) => {
      a[l] !== u.props[l] && e[l] !== u.props[l] && (i = !1);
    }), i && s.push(r[yn(u.props)]);
  }), s;
};
function lr(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const bs = Ur(), Rt = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Ze({
  defaultTheme: e,
  theme: r,
  themeId: t
}) {
  return ds(r) ? e : r[t] || r;
}
function ys(e) {
  return e ? (r, t) => t[e] : null;
}
function vs(e = {}) {
  const {
    themeId: r,
    defaultTheme: t = bs,
    rootShouldForwardProp: n = lr,
    slotShouldForwardProp: o = lr
  } = e, a = (s) => Gr(M({}, s, {
    theme: Ze(M({}, s, {
      defaultTheme: t,
      themeId: r
    }))
  }));
  return a.__mui_systemSx = !0, (s, c = {}) => {
    zn(s, (P) => P.filter((m) => !(m != null && m.__mui_systemSx)));
    const {
      name: u,
      slot: i,
      skipVariantsResolver: l,
      skipSx: d,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = ys(Rt(i))
    } = c, b = ve(c, fs), y = l !== void 0 ? l : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      i && i !== "Root" && i !== "root" || !1
    ), h = d || !1;
    let p;
    process.env.NODE_ENV !== "production" && u && (p = `${u}-${Rt(i || "Root")}`);
    let S = lr;
    i === "Root" || i === "root" ? S = n : i ? S = o : ps(s) && (S = void 0);
    const Y = Vn(s, M({
      shouldForwardProp: S,
      label: p
    }, b)), V = (P, ...m) => {
      const Z = m ? m.map((j) => typeof j == "function" && j.__emotion_real !== j ? (Q) => j(M({}, Q, {
        theme: Ze(M({}, Q, {
          defaultTheme: t,
          themeId: r
        }))
      })) : j) : [];
      let oe = P;
      u && f && Z.push((j) => {
        const Q = Ze(M({}, j, {
          defaultTheme: t,
          themeId: r
        })), fe = hs(u, Q);
        if (fe) {
          const de = {};
          return Object.entries(fe).forEach(([re, W]) => {
            de[re] = typeof W == "function" ? W(M({}, j, {
              theme: Q
            })) : W;
          }), f(j, de);
        }
        return null;
      }), u && !y && Z.push((j) => {
        const Q = Ze(M({}, j, {
          defaultTheme: t,
          themeId: r
        }));
        return gs(j, ms(u, Q), Q, u);
      }), h || Z.push(a);
      const ue = Z.length - m.length;
      if (Array.isArray(P) && ue > 0) {
        const j = new Array(ue).fill("");
        oe = [...P, ...j], oe.raw = [...P.raw, ...j];
      } else
        typeof P == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        P.__emotion_real !== P && (oe = (j) => P(M({}, j, {
          theme: Ze(M({}, j, {
            defaultTheme: t,
            themeId: r
          }))
        })));
      const ce = Y(oe, ...Z);
      if (process.env.NODE_ENV !== "production") {
        let j;
        u && (j = `${u}${he(i || "")}`), j === void 0 && (j = `Styled(${na(s)})`), ce.displayName = j;
      }
      return s.muiName && (ce.muiName = s.muiName), ce;
    };
    return Y.withConfig && (V.withConfig = Y.withConfig), V;
  };
}
function Ns(e) {
  const {
    theme: r,
    name: t,
    props: n
  } = e;
  return !r || !r.components || !r.components[t] || !r.components[t].defaultProps ? n : pn(r.components[t].defaultProps, n);
}
function Es({
  props: e,
  name: r,
  defaultTheme: t,
  themeId: n
}) {
  let o = ls(t);
  return n && (o = o[n] || o), Ns({
    theme: o,
    name: r,
    props: e
  });
}
function vn(e, r = 0, t = 1) {
  return process.env.NODE_ENV !== "production" && (e < r || e > t) && console.error(`MUI: The value provided ${e} is out of range [${r}, ${t}].`), Math.min(Math.max(r, e), t);
}
function ks(e) {
  e = e.slice(1);
  const r = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let t = e.match(r);
  return t && t[0].length === 1 && (t = t.map((n) => n + n)), t ? `rgb${t.length === 4 ? "a" : ""}(${t.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Je(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Je(ks(e));
  const r = e.indexOf("("), t = e.substring(0, r);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(t) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Xe(9, e));
  let n = e.substring(r + 1, e.length - 1), o;
  if (t === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Xe(10, o));
  } else
    n = n.split(",");
  return n = n.map((a) => parseFloat(a)), {
    type: t,
    values: n,
    colorSpace: o
  };
}
function Fr(e) {
  const {
    type: r,
    colorSpace: t
  } = e;
  let {
    values: n
  } = e;
  return r.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : r.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), r.indexOf("color") !== -1 ? n = `${t} ${n.join(" ")}` : n = `${n.join(", ")}`, `${r}(${n})`;
}
function Ss(e) {
  e = Je(e);
  const {
    values: r
  } = e, t = r[0], n = r[1] / 100, o = r[2] / 100, a = n * Math.min(o, 1 - o), s = (i, l = (i + t / 30) % 12) => o - a * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  let c = "rgb";
  const u = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (c += "a", u.push(r[3])), Fr({
    type: c,
    values: u
  });
}
function At(e) {
  e = Je(e);
  let r = e.type === "hsl" || e.type === "hsla" ? Je(Ss(e)).values : e.values;
  return r = r.map((t) => (e.type !== "color" && (t /= 255), t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4)), Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3));
}
function Pt(e, r) {
  const t = At(e), n = At(r);
  return (Math.max(t, n) + 0.05) / (Math.min(t, n) + 0.05);
}
function xs(e, r) {
  if (e = Je(e), r = vn(r), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - r;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] *= 1 - r;
  return Fr(e);
}
function ws(e, r) {
  if (e = Je(e), r = vn(r), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * r;
  else if (e.type.indexOf("rgb") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] += (255 - e.values[t]) * r;
  else if (e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] += (1 - e.values[t]) * r;
  return Fr(e);
}
function Ts(e, r) {
  return M({
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
const Cs = {
  black: "#000",
  white: "#fff"
}, tr = Cs, Os = {
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
}, _s = Os, $s = {
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
}, Me = $s, Rs = {
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
}, Ie = Rs, As = {
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
}, Qe = As, Ps = {
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
}, Be = Ps, Ms = {
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
}, De = Ms, Is = {
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
}, Ve = Is, Bs = ["mode", "contrastThreshold", "tonalOffset"], Mt = {
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
    paper: tr.white,
    default: tr.white
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
}, _r = {
  text: {
    primary: tr.white,
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
    active: tr.white,
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
function It(e, r, t, n) {
  const o = n.light || n, a = n.dark || n * 1.5;
  e[r] || (e.hasOwnProperty(t) ? e[r] = e[t] : r === "light" ? e.light = ws(e.main, o) : r === "dark" && (e.dark = xs(e.main, a)));
}
function Ds(e = "light") {
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
function Vs(e = "light") {
  return e === "dark" ? {
    main: Me[200],
    light: Me[50],
    dark: Me[400]
  } : {
    main: Me[500],
    light: Me[300],
    dark: Me[700]
  };
}
function js(e = "light") {
  return e === "dark" ? {
    main: Ie[500],
    light: Ie[300],
    dark: Ie[700]
  } : {
    main: Ie[700],
    light: Ie[400],
    dark: Ie[800]
  };
}
function zs(e = "light") {
  return e === "dark" ? {
    main: De[400],
    light: De[300],
    dark: De[700]
  } : {
    main: De[700],
    light: De[500],
    dark: De[900]
  };
}
function Ls(e = "light") {
  return e === "dark" ? {
    main: Ve[400],
    light: Ve[300],
    dark: Ve[700]
  } : {
    main: Ve[800],
    light: Ve[500],
    dark: Ve[900]
  };
}
function qs(e = "light") {
  return e === "dark" ? {
    main: Qe[400],
    light: Qe[300],
    dark: Qe[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Qe[500],
    dark: Qe[900]
  };
}
function Xs(e) {
  const {
    mode: r = "light",
    contrastThreshold: t = 3,
    tonalOffset: n = 0.2
  } = e, o = ve(e, Bs), a = e.primary || Ds(r), s = e.secondary || Vs(r), c = e.error || js(r), u = e.info || zs(r), i = e.success || Ls(r), l = e.warning || qs(r);
  function d(h) {
    const p = Pt(h, _r.text.primary) >= t ? _r.text.primary : Mt.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const S = Pt(h, p);
      S < 3 && console.error([`MUI: The contrast ratio of ${S}:1 for ${p} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return p;
  }
  const f = ({
    color: h,
    name: p,
    mainShade: S = 500,
    lightShade: Y = 300,
    darkShade: V = 700
  }) => {
    if (h = M({}, h), !h.main && h[S] && (h.main = h[S]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${p ? ` (${p})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.` : Xe(11, p ? ` (${p})` : "", S));
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
} });` : Xe(12, p ? ` (${p})` : "", JSON.stringify(h.main)));
    return It(h, "light", Y, n), It(h, "dark", V, n), h.contrastText || (h.contrastText = d(h.main)), h;
  }, b = {
    dark: _r,
    light: Mt
  };
  return process.env.NODE_ENV !== "production" && (b[r] || console.error(`MUI: The palette mode \`${r}\` is not supported.`)), be(M({
    // A collection of common colors.
    common: M({}, tr),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: r,
    // The colors used to represent primary interface elements for a user.
    primary: f({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: f({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: f({
      color: c,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: f({
      color: l,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: f({
      color: u,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: f({
      color: i,
      name: "success"
    }),
    // The grey colors.
    grey: _s,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: t,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: d,
    // Generate a rich color object.
    augmentColor: f,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: n
  }, b[r]), o);
}
const Js = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Hs(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Bt = {
  textTransform: "uppercase"
}, Dt = '"Roboto", "Helvetica", "Arial", sans-serif';
function Gs(e, r) {
  const t = typeof r == "function" ? r(e) : r, {
    fontFamily: n = Dt,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: c = 500,
    fontWeightBold: u = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: i = 16,
    // Apply the CSS properties to all the variants.
    allVariants: l,
    pxToRem: d
  } = t, f = ve(t, Js);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof i != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, y = d || ((S) => `${S / i * b}rem`), h = (S, Y, V, P, m) => M({
    fontFamily: n,
    fontWeight: S,
    fontSize: y(Y),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: V
  }, n === Dt ? {
    letterSpacing: `${Hs(P / Y)}em`
  } : {}, m, l), p = {
    h1: h(a, 96, 1.167, -1.5),
    h2: h(a, 60, 1.2, -0.5),
    h3: h(s, 48, 1.167, 0),
    h4: h(s, 34, 1.235, 0.25),
    h5: h(s, 24, 1.334, 0),
    h6: h(c, 20, 1.6, 0.15),
    subtitle1: h(s, 16, 1.75, 0.15),
    subtitle2: h(c, 14, 1.57, 0.1),
    body1: h(s, 16, 1.5, 0.15),
    body2: h(s, 14, 1.43, 0.15),
    button: h(c, 14, 1.75, 0.4, Bt),
    caption: h(s, 12, 1.66, 0.4),
    overline: h(s, 12, 2.66, 1, Bt),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return be(M({
    htmlFontSize: i,
    pxToRem: y,
    fontFamily: n,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: s,
    fontWeightMedium: c,
    fontWeightBold: u
  }, p), f, {
    clone: !1
    // No need to clone deep
  });
}
const Us = 0.2, Fs = 0.14, Ks = 0.12;
function U(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Us})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Fs})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ks})`].join(",");
}
const Ws = ["none", U(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), U(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), U(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), U(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), U(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), U(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), U(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), U(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), U(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), U(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), U(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), U(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), U(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), U(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), U(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), U(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), U(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), U(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), U(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), U(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), U(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), U(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), U(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), U(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ys = Ws, Zs = ["duration", "easing", "delay"], Qs = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, ei = {
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
function Vt(e) {
  return `${Math.round(e)}ms`;
}
function ri(e) {
  if (!e)
    return 0;
  const r = e / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function ti(e) {
  const r = M({}, Qs, e.easing), t = M({}, ei, e.duration);
  return M({
    getAutoHeightDuration: ri,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = t.standard,
        easing: c = r.easeInOut,
        delay: u = 0
      } = a, i = ve(a, Zs);
      if (process.env.NODE_ENV !== "production") {
        const l = (f) => typeof f == "string", d = (f) => !isNaN(parseFloat(f));
        !l(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !d(s) && !l(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), l(c) || console.error('MUI: Argument "easing" must be a string.'), !d(u) && !l(u) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(i).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(i).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((l) => `${l} ${typeof s == "string" ? s : Vt(s)} ${c} ${typeof u == "string" ? u : Vt(u)}`).join(",");
    }
  }, e, {
    easing: r,
    duration: t
  });
}
const ni = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, oi = ni, ai = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function si(e = {}, ...r) {
  const {
    mixins: t = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, s = ve(e, ai);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Xe(18));
  const c = Xs(n), u = Ur(e);
  let i = be(u, {
    mixins: Ts(u.breakpoints, t),
    palette: c,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ys.slice(),
    typography: Gs(c, a),
    transitions: ti(o),
    zIndex: M({}, oi)
  });
  if (i = be(i, s), i = r.reduce((l, d) => be(l, d), i), process.env.NODE_ENV !== "production") {
    const l = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], d = (f, b) => {
      let y;
      for (y in f) {
        const h = f[y];
        if (l.indexOf(y) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const p = qr("", y);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${p}' syntax:`, JSON.stringify({
              root: {
                [`&.${p}`]: h
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          f[y] = {};
        }
      }
    };
    Object.keys(i.components).forEach((f) => {
      const b = i.components[f].styleOverrides;
      b && f.indexOf("Mui") === 0 && d(b, f);
    });
  }
  return i.unstable_sxConfig = M({}, Hr, s == null ? void 0 : s.unstable_sxConfig), i.unstable_sx = function(d) {
    return Gr({
      sx: d,
      theme: this
    });
  }, i;
}
const ii = si(), Nn = ii, En = "$$material";
function ci({
  props: e,
  name: r
}) {
  return Es({
    props: e,
    name: r,
    defaultTheme: Nn,
    themeId: En
  });
}
const li = (e) => lr(e) && e !== "classes", ui = vs({
  themeId: En,
  defaultTheme: Nn,
  rootShouldForwardProp: li
}), fi = ui;
function di(e) {
  return qr("MuiSvgIcon", e);
}
la("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const pi = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], hi = (e) => {
  const {
    color: r,
    fontSize: t,
    classes: n
  } = e, o = {
    root: ["root", r !== "inherit" && `color${he(r)}`, `fontSize${he(t)}`]
  };
  return oa(o, di, n);
}, mi = fi("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, r) => {
    const {
      ownerState: t
    } = e;
    return [r.root, t.color !== "inherit" && r[`color${he(t.color)}`], r[`fontSize${he(t.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: r
}) => {
  var t, n, o, a, s, c, u, i, l, d, f, b, y;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: r.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (t = e.transitions) == null || (n = t.create) == null ? void 0 : n.call(t, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((a = e.typography) == null || (s = a.pxToRem) == null ? void 0 : s.call(a, 20)) || "1.25rem",
      medium: ((c = e.typography) == null || (u = c.pxToRem) == null ? void 0 : u.call(c, 24)) || "1.5rem",
      large: ((i = e.typography) == null || (l = i.pxToRem) == null ? void 0 : l.call(i, 35)) || "2.1875rem"
    }[r.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (d = (f = (e.vars || e).palette) == null || (f = f[r.color]) == null ? void 0 : f.main) != null ? d : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (y = (e.vars || e).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[r.color]
  };
}), Kr = /* @__PURE__ */ rr.forwardRef(function(r, t) {
  const n = ci({
    props: r,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: s = "inherit",
    component: c = "svg",
    fontSize: u = "medium",
    htmlColor: i,
    inheritViewBox: l = !1,
    titleAccess: d,
    viewBox: f = "0 0 24 24"
  } = n, b = ve(n, pi), y = /* @__PURE__ */ rr.isValidElement(o) && o.type === "svg", h = M({}, n, {
    color: s,
    component: c,
    fontSize: u,
    instanceFontSize: r.fontSize,
    inheritViewBox: l,
    viewBox: f,
    hasSvgAsChild: y
  }), p = {};
  l || (p.viewBox = f);
  const S = hi(h);
  return /* @__PURE__ */ He(mi, M({
    as: c,
    className: ua(S.root, a),
    focusable: "false",
    color: i,
    "aria-hidden": d ? void 0 : !0,
    role: d ? "img" : void 0,
    ref: t
  }, p, b, y && o.props, {
    ownerState: h,
    children: [y ? o.props.children : o, d ? /* @__PURE__ */ k("title", {
      children: d
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Kr.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Node passed into the SVG element.
   */
  children: G.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: G.object,
  /**
   * @ignore
   */
  className: G.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: G.oneOfType([G.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), G.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: G.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: G.oneOfType([G.oneOf(["inherit", "large", "medium", "small"]), G.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: G.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: G.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: G.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: G.oneOfType([G.arrayOf(G.oneOfType([G.func, G.object, G.bool])), G.func, G.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: G.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: G.string
});
Kr.muiName = "SvgIcon";
const jt = Kr;
function gi(e, r) {
  function t(n, o) {
    return /* @__PURE__ */ k(jt, M({
      "data-testid": `${r}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (t.displayName = `${r}Icon`), t.muiName = jt.muiName, /* @__PURE__ */ rr.memo(/* @__PURE__ */ rr.forwardRef(t));
}
const bi = gi(/* @__PURE__ */ k("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
}), "Menu");
function Mi({
  menu: e,
  dataHandler: r,
  commandHandler: t,
  className: n,
  id: o,
  children: a
}) {
  const [s, c] = Le(!1), [u, i] = Le(!1), l = cr(() => {
    s && c(!1), i(!1);
  }, [s]), d = cr((S) => {
    S.stopPropagation(), c((Y) => {
      const V = !Y;
      return V && S.shiftKey ? i(!0) : V || i(!1), V;
    });
  }, []), f = In(null), [b, y] = Le(0);
  dr(() => {
    s && f.current && y(f.current.clientHeight);
  }, [s]);
  const h = cr(
    (S) => (l(), t(S)),
    [t, l]
  );
  let p = e;
  return !p && r && (p = r(u)), /* @__PURE__ */ k("div", { ref: f, style: { position: "relative" }, children: /* @__PURE__ */ k(An, { position: "static", id: o, children: /* @__PURE__ */ He(Pn, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    p ? /* @__PURE__ */ k(
      qt,
      {
        edge: "start",
        className: `papi-menuButton ${n ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: d,
        children: /* @__PURE__ */ k(bi, {})
      }
    ) : void 0,
    a ? /* @__PURE__ */ k("div", { className: "papi-menu-children", children: a }) : void 0,
    p ? /* @__PURE__ */ k(
      Mn,
      {
        className: `papi-menu-drawer ${n ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: s,
        onClose: l,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: b
          }
        },
        children: /* @__PURE__ */ k(Jn, { commandHandler: h, columns: p.columns })
      }
    ) : void 0
  ] }) }) });
}
const Ii = (e, r) => {
  dr(() => {
    if (!e)
      return () => {
      };
    const t = e(r);
    return () => {
      t();
    };
  }, [e, r]);
}, yi = (e, r, t = !0) => {
  const [n, o] = Le(() => r), [a, s] = Le(!0);
  return dr(() => {
    let c = !0;
    return s(!!e), (async () => {
      if (e) {
        const u = await e();
        c && (o(() => u), s(!1));
      }
    })(), () => {
      c = !1, t || o(() => r);
    };
  }, [e, r, t]), [n, a];
}, $r = () => !1, Bi = (e, r) => {
  const [t] = yi(
    cr(async () => {
      if (!e)
        return $r;
      const n = await Promise.resolve(e(r));
      return async () => n();
    }, [r, e]),
    $r,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    !1
  );
  dr(() => () => {
    t !== $r && t();
  }, [t]);
};
function vi(e, r = "top") {
  if (!e || typeof document > "u")
    return;
  const t = document.head || document.querySelector("head"), n = t.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), r === "top" && n ? t.insertBefore(o, n) : t.appendChild(o);
}
vi(`.papi-button {
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
.paratext {
  background-color: darkgreen;
  color: greenyellow;
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
`, "top");
export {
  Pe as Button,
  wi as ChapterRangeSelector,
  Ln as Checkbox,
  Rr as ComboBox,
  Jn as GridMenu,
  Ti as IconButton,
  je as LabelPosition,
  qn as MenuItem,
  Oi as RefSelector,
  _i as SearchBar,
  $i as Slider,
  Ri as Snackbar,
  Ai as Switch,
  Pi as Table,
  ur as TextField,
  Mi as Toolbar,
  Ii as useEvent,
  Bi as useEventAsync,
  yi as usePromise
};
//# sourceMappingURL=index.es.js.map
