import { jsx as S, jsxs as De, Fragment as Lr } from "react/jsx-runtime";
import { Button as Fr, Autocomplete as Ur, TextField as vr, FormControlLabel as Vn, FormLabel as Wr, Checkbox as Gr, MenuItem as qr, Grid as xr, IconButton as kr, Paper as Hr, Slider as Xr, Snackbar as Yr, Switch as Kr, AppBar as Jr, Toolbar as Zr, Drawer as Qr } from "@mui/material";
import * as Fe from "react";
import { useMemo as Tn, useState as Pe, useCallback as Xe, useRef as kn, useEffect as nn } from "react";
import { offsetBook as zn, FIRST_SCR_BOOK_NUM as et, offsetChapter as Ln, FIRST_SCR_CHAPTER_NUM as nt, getChaptersForBook as rt, offsetVerse as Fn, FIRST_SCR_VERSE_NUM as tt } from "platform-bible-utils";
import ot, { SelectColumn as it } from "react-data-grid";
import at, { ThemeContext as st, internal_processStyles as ct } from "@mui/styled-engine";
function Ce({
  id: e,
  isDisabled: n = !1,
  className: r,
  onClick: t,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ S(
    Fr,
    {
      id: e,
      disabled: n,
      className: `papi-button ${r ?? ""}`,
      onClick: t,
      onContextMenu: o,
      children: i
    }
  );
}
function Sn({
  id: e,
  title: n,
  isDisabled: r = !1,
  isClearable: t = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: a,
  options: l = [],
  className: c,
  value: s,
  onChange: u,
  onFocus: p,
  onBlur: d,
  getOptionLabel: v
}) {
  return /* @__PURE__ */ S(
    Ur,
    {
      id: e,
      disablePortal: !0,
      disabled: r,
      disableClearable: !t,
      fullWidth: i,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: s,
      onChange: u,
      onFocus: p,
      onBlur: d,
      getOptionLabel: v,
      renderInput: (b) => /* @__PURE__ */ S(
        vr,
        {
          ...b,
          error: o,
          fullWidth: i,
          disabled: r,
          label: n,
          style: { width: a }
        }
      )
    }
  );
}
function ha({
  startChapter: e,
  endChapter: n,
  handleSelectStartChapter: r,
  handleSelectEndChapter: t,
  isDisabled: o,
  chapterCount: i
}) {
  const a = Tn(
    () => Array.from({ length: i }, (s, u) => u + 1),
    [i]
  ), l = (s, u) => {
    r(u), u > n && t(u);
  }, c = (s, u) => {
    t(u), u < e && r(u);
  };
  return /* @__PURE__ */ De(Lr, { children: [
    /* @__PURE__ */ S(
      Vn,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ S(
          Sn,
          {
            onChange: (s, u) => l(s, u),
            className: "book-selection-chapter",
            isClearable: !1,
            options: a,
            getOptionLabel: (s) => s.toString(),
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
      Vn,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ S(
          Sn,
          {
            onChange: (s, u) => c(s, u),
            className: "book-selection-chapter",
            isClearable: !1,
            options: a,
            getOptionLabel: (s) => s.toString(),
            value: n,
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
var Ae = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Ae || {});
function lt({
  id: e,
  isChecked: n,
  labelText: r = "",
  labelPosition: t = Ae.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: l = !1,
  className: c,
  onChange: s
}) {
  const u = /* @__PURE__ */ S(
    Gr,
    {
      id: e,
      checked: n,
      indeterminate: o,
      defaultChecked: i,
      disabled: a,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: s
    }
  );
  let p;
  if (r) {
    const d = t === Ae.Before || t === Ae.Above, v = /* @__PURE__ */ S("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), b = t === Ae.Before || t === Ae.After, h = b ? v : /* @__PURE__ */ S("div", { children: v }), f = b ? u : /* @__PURE__ */ S("div", { children: u });
    p = /* @__PURE__ */ De(
      Wr,
      {
        className: `papi-checkbox ${t.toString()}`,
        disabled: a,
        error: l,
        children: [
          d && h,
          f,
          !d && h
        ]
      }
    );
  } else
    p = u;
  return p;
}
function ut(e) {
  const {
    onClick: n,
    name: r,
    hasAutoFocus: t = !1,
    className: o,
    isDense: i = !0,
    hasDisabledGutters: a = !1,
    hasDivider: l = !1,
    focusVisibleClassName: c,
    id: s,
    children: u
  } = e;
  return /* @__PURE__ */ S(
    qr,
    {
      autoFocus: t,
      className: o,
      dense: i,
      disableGutters: a,
      divider: l,
      focusVisibleClassName: c,
      onClick: n,
      id: s,
      children: r || u
    }
  );
}
function dt({ commandHandler: e, name: n, className: r, items: t, id: o }) {
  return /* @__PURE__ */ De(xr, { id: o, item: !0, xs: "auto", className: `papi-menu-column ${r ?? ""}`, children: [
    /* @__PURE__ */ S("h3", { className: `papi-menu ${r ?? ""}`, children: n }),
    t.map((i, a) => /* @__PURE__ */ S(
      ut,
      {
        className: `papi-menu-item ${i.className}`,
        onClick: () => {
          e(i);
        },
        ...i
      },
      a
    ))
  ] });
}
function ft({ commandHandler: e, className: n, columns: r, id: t }) {
  return /* @__PURE__ */ S(
    xr,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${n ?? ""}`,
      columns: r.length,
      id: t,
      children: r.map((o, i) => /* @__PURE__ */ S(
        dt,
        {
          commandHandler: e,
          name: o.name,
          className: n,
          items: o.items
        },
        i
      ))
    }
  );
}
function ma({
  id: e,
  label: n,
  isDisabled: r = !1,
  tooltip: t,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: a = "medium",
  className: l,
  onClick: c,
  children: s
}) {
  return /* @__PURE__ */ S(
    kr,
    {
      id: e,
      disabled: r,
      edge: i,
      size: a,
      "aria-label": n,
      title: o ? void 0 : t ?? n,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: s
    }
  );
}
var pt = Object.defineProperty, ht = (e, n, r) => n in e ? pt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, A = (e, n, r) => (ht(e, typeof n != "symbol" ? n + "" : n, r), r);
const Ee = [
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
], Cn = [
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
], Sr = [
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
], Un = wt();
function je(e, n = !0) {
  return n && (e = e.toUpperCase()), e in Un ? Un[e] : 0;
}
function _n(e) {
  return je(e) > 0;
}
function mt(e) {
  const n = typeof e == "string" ? je(e) : e;
  return n >= 40 && n <= 66;
}
function gt(e) {
  return (typeof e == "string" ? je(e) : e) <= 39;
}
function Er(e) {
  return e <= 66;
}
function bt(e) {
  const n = typeof e == "string" ? je(e) : e;
  return Cr(n) && !Er(n);
}
function* yt() {
  for (let e = 1; e <= Ee.length; e++)
    yield e;
}
const vt = 1, wr = Ee.length;
function xt() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function On(e, n = "***") {
  const r = e - 1;
  return r < 0 || r >= Ee.length ? n : Ee[r];
}
function Tr(e) {
  return e <= 0 || e > wr ? "******" : Sr[e - 1];
}
function kt(e) {
  return Tr(je(e));
}
function Cr(e) {
  const n = typeof e == "number" ? On(e) : e;
  return _n(n) && !Cn.includes(n);
}
function St(e) {
  const n = typeof e == "number" ? On(e) : e;
  return _n(n) && Cn.includes(n);
}
function Et(e) {
  return Sr[e - 1].includes("*obsolete*");
}
function wt() {
  const e = {};
  for (let n = 0; n < Ee.length; n++)
    e[Ee[n]] = n + 1;
  return e;
}
const me = {
  allBookIds: Ee,
  nonCanonicalIds: Cn,
  bookIdToNumber: je,
  isBookIdValid: _n,
  isBookNT: mt,
  isBookOT: gt,
  isBookOTNT: Er,
  isBookDC: bt,
  allBookNumbers: yt,
  firstBook: vt,
  lastBook: wr,
  extraBooks: xt,
  bookNumberToId: On,
  bookNumberToEnglishName: Tr,
  bookIdToEnglishName: kt,
  isCanonical: Cr,
  isExtraMaterial: St,
  isObsolete: Et
};
var ye = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(ye || {});
const Se = class {
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
let ae = Se;
A(ae, "Original", new Se(ye.Original)), A(ae, "Septuagint", new Se(ye.Septuagint)), A(ae, "Vulgate", new Se(ye.Vulgate)), A(ae, "English", new Se(ye.English)), A(ae, "RussianProtestant", new Se(ye.RussianProtestant)), A(ae, "RussianOrthodox", new Se(ye.RussianOrthodox));
function Wn(e, n) {
  const r = n[0];
  for (let t = 1; t < n.length; t++)
    e = e.split(n[t]).join(r);
  return e.split(r);
}
var _r = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(_r || {});
const R = class {
  constructor(n, r, t, o) {
    if (A(this, "firstChapter"), A(this, "lastChapter"), A(this, "lastVerse"), A(this, "hasSegmentsDefined"), A(this, "text"), A(this, "BBBCCCVVVS"), A(this, "longHashCode"), A(this, "versification"), A(this, "rtlMark", "‏"), A(this, "_bookNum", 0), A(this, "_chapterNum", 0), A(this, "_verseNum", 0), A(this, "_verse"), t == null && o == null)
      if (n != null && typeof n == "string") {
        const i = n, a = r != null && r instanceof ae ? r : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (n != null && typeof n == "number") {
        const i = r != null && r instanceof ae ? r : void 0;
        this.setEmpty(i), this._verseNum = n % R.chapterDigitShifter, this._chapterNum = Math.floor(
          n % R.bookDigitShifter / R.chapterDigitShifter
        ), this._bookNum = Math.floor(n / R.bookDigitShifter);
      } else if (r == null)
        if (n != null && n instanceof R) {
          const i = n;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (n == null)
            return;
          const i = n instanceof ae ? n : R.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (n != null && r != null && t != null)
      if (typeof n == "string" && typeof r == "string" && typeof t == "string")
        this.setEmpty(o), this.updateInternal(n, r, t);
      else if (typeof n == "number" && typeof r == "number" && typeof t == "number")
        this._bookNum = n, this._chapterNum = r, this._verseNum = t, this.versification = o ?? R.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(n, r = R.defaultVersification) {
    const t = new R(r);
    return t.parse(n), t;
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(n) {
    return n.length > 0 && "0123456789".includes(n[0]) && !n.endsWith(this.verseRangeSeparator) && !n.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(n) {
    let r;
    try {
      return r = R.parse(n), { success: !0, verseRef: r };
    } catch (t) {
      if (t instanceof Ve)
        return r = new R(), { success: !1, verseRef: r };
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
  static getBBBCCCVVV(n, r, t) {
    return n % R.bcvMaxValue * R.bookDigitShifter + (r >= 0 ? r % R.bcvMaxValue * R.chapterDigitShifter : 0) + (t >= 0 ? t % R.bcvMaxValue : 0);
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(n) {
    let r;
    if (!n)
      return r = -1, { success: !0, vNum: r };
    r = 0;
    let t;
    for (let o = 0; o < n.length; o++) {
      if (t = n[o], t < "0" || t > "9")
        return o === 0 && (r = -1), { success: !1, vNum: r };
      if (r = r * 10 + +t - +"0", r > R.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(R.verseRangeSeparator) || this._verse.includes(R.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return me.bookNumberToId(this.bookNum, "");
  }
  set book(n) {
    this.bookNum = me.bookIdToNumber(n);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(n) {
    const r = +n;
    this._chapterNum = Number.isInteger(r) ? r : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(n) {
    const { success: r, vNum: t } = R.tryGetVerseNum(n);
    this._verse = r ? void 0 : n.replace(this.rtlMark, ""), this._verseNum = t, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = R.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(n) {
    if (n <= 0 || n > me.lastBook)
      throw new Ve(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = n;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(n) {
    this.chapterNum = n;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(n) {
    this._verseNum = n;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var n;
    return (n = this.versification) == null ? void 0 : n.name;
  }
  set versificationStr(n) {
    this.versification = this.versification != null ? new ae(n) : void 0;
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
    return this.validateVerse(R.verseRangeSeparators, R.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return R.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return R.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
  parse(n) {
    if (n = n.replace(this.rtlMark, ""), n.includes("/")) {
      const i = n.split("/");
      if (n = i[0], i.length > 1)
        try {
          const a = +i[1].trim();
          this.versification = new ae(ye[a]);
        } catch {
          throw new Ve("Invalid reference : " + n);
        }
    }
    const r = n.trim().split(" ");
    if (r.length !== 2)
      throw new Ve("Invalid reference : " + n);
    const t = r[1].split(":"), o = +t[0];
    if (t.length !== 2 || me.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !R.isVerseParseable(t[1]))
      throw new Ve("Invalid reference : " + n);
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
    return new R(this);
  }
  toString() {
    const n = this.book;
    return n === "" ? "" : `${n} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - `VerseRef` to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(n) {
    return n._bookNum === this._bookNum && n._chapterNum === this._chapterNum && n._verseNum === this._verseNum && n._verse === this._verse && n.versification != null && this.versification != null && n.versification.equals(this.versification);
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
  allVerses(n = !1, r = R.verseRangeSeparators, t = R.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = Wn(this._verse, t);
    for (const a of i.map((l) => Wn(l, r))) {
      const l = this.clone();
      l.verse = a[0];
      const c = l.verseNum;
      if (o.push(l), a.length > 1) {
        const s = this.clone();
        if (s.verse = a[1], !n)
          for (let u = c + 1; u < s.verseNum; u++) {
            const p = new R(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || o.push(p);
          }
        o.push(s);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(n, r) {
    if (!this.verse)
      return this.internalValid;
    let t = 0;
    for (const o of this.allVerses(!0, n, r)) {
      const i = o.internalValid;
      if (i !== 0)
        return i;
      const a = o.BBBCCCVVV;
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > me.lastBook ? 2 : 0;
  }
  setEmpty(n = R.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = n;
  }
  updateInternal(n, r, t) {
    this.bookNum = me.bookIdToNumber(n), this.chapter = r, this.verse = t;
  }
};
let he = R;
A(he, "defaultVersification", ae.English), A(he, "verseRangeSeparator", "-"), A(he, "verseSequenceIndicator", ","), A(he, "verseRangeSeparators", [R.verseRangeSeparator]), A(he, "verseSequenceIndicators", [R.verseSequenceIndicator]), A(he, "chapterDigitShifter", 1e3), A(he, "bookDigitShifter", R.chapterDigitShifter * R.chapterDigitShifter), A(he, "bcvMaxValue", R.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
A(he, "ValidStatusType", _r);
class Ve extends Error {
}
function Je({
  variant: e = "outlined",
  id: n,
  isDisabled: r = !1,
  hasError: t = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: a,
  placeholder: l,
  isRequired: c = !1,
  className: s,
  defaultValue: u,
  value: p,
  onChange: d,
  onFocus: v,
  onBlur: b
}) {
  return /* @__PURE__ */ S(
    vr,
    {
      variant: e,
      id: n,
      disabled: r,
      error: t,
      fullWidth: o,
      helperText: i,
      label: a,
      placeholder: l,
      required: c,
      className: `papi-textfield ${s ?? ""}`,
      defaultValue: u,
      value: p,
      onChange: d,
      onFocus: v,
      onBlur: b
    }
  );
}
let dn;
const fn = () => (dn || (dn = me.allBookIds.map((e) => ({
  bookId: e,
  label: me.bookIdToEnglishName(e)
}))), dn);
function ba({ scrRef: e, handleSubmit: n, id: r }) {
  const t = (c) => {
    n(c);
  }, o = (c, s) => {
    const p = { bookNum: me.bookIdToNumber(s.bookId), chapterNum: 1, verseNum: 1 };
    t(p);
  }, i = (c) => {
    n({ ...e, chapterNum: +c.target.value });
  }, a = (c) => {
    n({ ...e, verseNum: +c.target.value });
  }, l = Tn(() => fn()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ De("span", { id: r, children: [
    /* @__PURE__ */ S(
      Sn,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: fn(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ S(
      Ce,
      {
        onClick: () => t(zn(e, -1)),
        isDisabled: e.bookNum <= et,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(
      Ce,
      {
        onClick: () => t(zn(e, 1)),
        isDisabled: e.bookNum >= fn().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ S(
      Je,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ S(
      Ce,
      {
        onClick: () => n(Ln(e, -1)),
        isDisabled: e.chapterNum <= nt,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(
      Ce,
      {
        onClick: () => n(Ln(e, 1)),
        isDisabled: e.chapterNum >= rt(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ S(
      Je,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ S(
      Ce,
      {
        onClick: () => n(Fn(e, -1)),
        isDisabled: e.verseNum <= tt,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(Ce, { onClick: () => n(Fn(e, 1)), children: ">" })
  ] });
}
function ya({ onSearch: e, placeholder: n, isFullWidth: r }) {
  const [t, o] = Pe(""), i = (a) => {
    o(a), e(a);
  };
  return /* @__PURE__ */ S(Hr, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ S(
    Je,
    {
      isFullWidth: r,
      className: "search-bar-input",
      placeholder: n,
      value: t,
      onChange: (a) => i(a.target.value)
    }
  ) });
}
function va({
  id: e,
  isDisabled: n = !1,
  orientation: r = "horizontal",
  min: t = 0,
  max: o = 100,
  step: i = 1,
  showMarks: a = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: s = "off",
  className: u,
  onChange: p,
  onChangeCommitted: d
}) {
  return /* @__PURE__ */ S(
    Xr,
    {
      id: e,
      disabled: n,
      orientation: r,
      min: t,
      max: o,
      step: i,
      marks: a,
      defaultValue: l,
      value: c,
      valueLabelDisplay: s,
      className: `papi-slider ${r} ${u ?? ""}`,
      onChange: p,
      onChangeCommitted: d
    }
  );
}
function xa({
  autoHideDuration: e = void 0,
  id: n,
  isOpen: r = !1,
  className: t,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: a,
  children: l
}) {
  const c = {
    action: (a == null ? void 0 : a.action) || l,
    message: a == null ? void 0 : a.message,
    className: t
  };
  return /* @__PURE__ */ S(
    Yr,
    {
      autoHideDuration: e ?? void 0,
      open: r,
      onClose: o,
      anchorOrigin: i,
      id: n,
      ContentProps: c
    }
  );
}
function ka({
  id: e,
  isChecked: n,
  isDisabled: r = !1,
  hasError: t = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ S(
    Kr,
    {
      id: e,
      checked: n,
      disabled: r,
      className: `papi-switch ${t ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Gn({ onRowChange: e, row: n, column: r }) {
  const t = (o) => {
    e({ ...n, [r.key]: o.target.value });
  };
  return /* @__PURE__ */ S(Je, { defaultValue: n[r.key], onChange: t });
}
const Tt = ({ onChange: e, disabled: n, checked: r, ...t }) => /* @__PURE__ */ S(
  lt,
  {
    ...t,
    isChecked: r,
    isDisabled: n,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Sa({
  columns: e,
  sortColumns: n,
  onSortColumnsChange: r,
  onColumnResize: t,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: a,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: s,
  enableSelectColumn: u,
  selectColumnWidth: p = 50,
  rowKeyGetter: d,
  rowHeight: v = 35,
  headerRowHeight: b = 35,
  selectedRows: h,
  onSelectedRowsChange: f,
  onRowsChange: E,
  onCellClick: K,
  onCellDoubleClick: D,
  onCellContextMenu: T,
  onCellKeyDown: m,
  direction: Q = "ltr",
  enableVirtualization: re = !0,
  onCopy: fe,
  onPaste: le,
  onScroll: C,
  className: G,
  id: Z
}) {
  const te = Tn(() => {
    const J = e.map((q) => typeof q.editable == "function" ? {
      ...q,
      editable: (ue) => !!q.editable(ue),
      renderEditCell: q.renderEditCell || Gn
    } : q.editable && !q.renderEditCell ? { ...q, renderEditCell: Gn } : q.renderEditCell && !q.editable ? { ...q, editable: !1 } : q);
    return u ? [{ ...it, minWidth: p }, ...J] : J;
  }, [e, u, p]);
  return /* @__PURE__ */ S(
    ot,
    {
      columns: te,
      defaultColumnOptions: {
        width: o,
        minWidth: i,
        maxWidth: a,
        sortable: l,
        resizable: c
      },
      sortColumns: n,
      onSortColumnsChange: r,
      onColumnResize: t,
      rows: s,
      rowKeyGetter: d,
      rowHeight: v,
      headerRowHeight: b,
      selectedRows: h,
      onSelectedRowsChange: f,
      onRowsChange: E,
      onCellClick: K,
      onCellDoubleClick: D,
      onCellContextMenu: T,
      onCellKeyDown: m,
      direction: Q,
      enableVirtualization: re,
      onCopy: fe,
      onPaste: le,
      onScroll: C,
      renderers: { renderCheckbox: Tt },
      className: G ?? "rdg-light",
      "data-testid": Z
    }
  );
}
function B() {
  return B = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var r = arguments[n];
      for (var t in r)
        Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
    }
    return e;
  }, B.apply(this, arguments);
}
function ve(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Or(e) {
  if (!ve(e))
    return e;
  const n = {};
  return Object.keys(e).forEach((r) => {
    n[r] = Or(e[r]);
  }), n;
}
function de(e, n, r = {
  clone: !0
}) {
  const t = r.clone ? B({}, e) : e;
  return ve(e) && ve(n) && Object.keys(n).forEach((o) => {
    o !== "__proto__" && (ve(n[o]) && o in e && ve(e[o]) ? t[o] = de(e[o], n[o], r) : r.clone ? t[o] = ve(n[o]) ? Or(n[o]) : n[o] : t[o] = n[o]);
  }), t;
}
function Ct(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var En = { exports: {} }, He = { exports: {} }, V = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qn;
function _t() {
  if (qn)
    return V;
  qn = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, K = e ? Symbol.for("react.scope") : 60119;
  function D(m) {
    if (typeof m == "object" && m !== null) {
      var Q = m.$$typeof;
      switch (Q) {
        case n:
          switch (m = m.type, m) {
            case c:
            case s:
            case t:
            case i:
            case o:
            case p:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case u:
                case b:
                case v:
                case a:
                  return m;
                default:
                  return Q;
              }
          }
        case r:
          return Q;
      }
    }
  }
  function T(m) {
    return D(m) === s;
  }
  return V.AsyncMode = c, V.ConcurrentMode = s, V.ContextConsumer = l, V.ContextProvider = a, V.Element = n, V.ForwardRef = u, V.Fragment = t, V.Lazy = b, V.Memo = v, V.Portal = r, V.Profiler = i, V.StrictMode = o, V.Suspense = p, V.isAsyncMode = function(m) {
    return T(m) || D(m) === c;
  }, V.isConcurrentMode = T, V.isContextConsumer = function(m) {
    return D(m) === l;
  }, V.isContextProvider = function(m) {
    return D(m) === a;
  }, V.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === n;
  }, V.isForwardRef = function(m) {
    return D(m) === u;
  }, V.isFragment = function(m) {
    return D(m) === t;
  }, V.isLazy = function(m) {
    return D(m) === b;
  }, V.isMemo = function(m) {
    return D(m) === v;
  }, V.isPortal = function(m) {
    return D(m) === r;
  }, V.isProfiler = function(m) {
    return D(m) === i;
  }, V.isStrictMode = function(m) {
    return D(m) === o;
  }, V.isSuspense = function(m) {
    return D(m) === p;
  }, V.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === t || m === s || m === i || m === o || m === p || m === d || typeof m == "object" && m !== null && (m.$$typeof === b || m.$$typeof === v || m.$$typeof === a || m.$$typeof === l || m.$$typeof === u || m.$$typeof === f || m.$$typeof === E || m.$$typeof === K || m.$$typeof === h);
  }, V.typeOf = D, V;
}
var z = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hn;
function Ot() {
  return Hn || (Hn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, K = e ? Symbol.for("react.scope") : 60119;
    function D(y) {
      return typeof y == "string" || typeof y == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      y === t || y === s || y === i || y === o || y === p || y === d || typeof y == "object" && y !== null && (y.$$typeof === b || y.$$typeof === v || y.$$typeof === a || y.$$typeof === l || y.$$typeof === u || y.$$typeof === f || y.$$typeof === E || y.$$typeof === K || y.$$typeof === h);
    }
    function T(y) {
      if (typeof y == "object" && y !== null) {
        var ie = y.$$typeof;
        switch (ie) {
          case n:
            var k = y.type;
            switch (k) {
              case c:
              case s:
              case t:
              case i:
              case o:
              case p:
                return k;
              default:
                var Te = k && k.$$typeof;
                switch (Te) {
                  case l:
                  case u:
                  case b:
                  case v:
                  case a:
                    return Te;
                  default:
                    return ie;
                }
            }
          case r:
            return ie;
        }
      }
    }
    var m = c, Q = s, re = l, fe = a, le = n, C = u, G = t, Z = b, te = v, J = r, q = i, ne = o, ue = p, ke = !1;
    function we(y) {
      return ke || (ke = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), g(y) || T(y) === c;
    }
    function g(y) {
      return T(y) === s;
    }
    function x(y) {
      return T(y) === l;
    }
    function N(y) {
      return T(y) === a;
    }
    function O(y) {
      return typeof y == "object" && y !== null && y.$$typeof === n;
    }
    function w(y) {
      return T(y) === u;
    }
    function P(y) {
      return T(y) === t;
    }
    function _(y) {
      return T(y) === b;
    }
    function $(y) {
      return T(y) === v;
    }
    function I(y) {
      return T(y) === r;
    }
    function j(y) {
      return T(y) === i;
    }
    function M(y) {
      return T(y) === o;
    }
    function ee(y) {
      return T(y) === p;
    }
    z.AsyncMode = m, z.ConcurrentMode = Q, z.ContextConsumer = re, z.ContextProvider = fe, z.Element = le, z.ForwardRef = C, z.Fragment = G, z.Lazy = Z, z.Memo = te, z.Portal = J, z.Profiler = q, z.StrictMode = ne, z.Suspense = ue, z.isAsyncMode = we, z.isConcurrentMode = g, z.isContextConsumer = x, z.isContextProvider = N, z.isElement = O, z.isForwardRef = w, z.isFragment = P, z.isLazy = _, z.isMemo = $, z.isPortal = I, z.isProfiler = j, z.isStrictMode = M, z.isSuspense = ee, z.isValidElementType = D, z.typeOf = T;
  }()), z;
}
var Xn;
function $r() {
  return Xn || (Xn = 1, process.env.NODE_ENV === "production" ? He.exports = _t() : He.exports = Ot()), He.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var pn, Yn;
function $t() {
  if (Yn)
    return pn;
  Yn = 1;
  var e = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function t(i) {
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
      for (var a = {}, l = 0; l < 10; l++)
        a["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(a).map(function(u) {
        return a[u];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var s = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        s[u] = u;
      }), Object.keys(Object.assign({}, s)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return pn = o() ? Object.assign : function(i, a) {
    for (var l, c = t(i), s, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var p in l)
        n.call(l, p) && (c[p] = l[p]);
      if (e) {
        s = e(l);
        for (var d = 0; d < s.length; d++)
          r.call(l, s[d]) && (c[s[d]] = l[s[d]]);
      }
    }
    return c;
  }, pn;
}
var hn, Kn;
function $n() {
  if (Kn)
    return hn;
  Kn = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return hn = e, hn;
}
var mn, Jn;
function Nr() {
  return Jn || (Jn = 1, mn = Function.call.bind(Object.prototype.hasOwnProperty)), mn;
}
var gn, Zn;
function Nt() {
  if (Zn)
    return gn;
  Zn = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var n = $n(), r = {}, t = Nr();
    e = function(i) {
      var a = "Warning: " + i;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {
      }
    };
  }
  function o(i, a, l, c, s) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in i)
        if (t(i, u)) {
          var p;
          try {
            if (typeof i[u] != "function") {
              var d = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            p = i[u](a, u, c, l, null, n);
          } catch (b) {
            p = b;
          }
          if (p && !(p instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in r)) {
            r[p.message] = !0;
            var v = s ? s() : "";
            e(
              "Failed " + l + " type: " + p.message + (v ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, gn = o, gn;
}
var bn, Qn;
function Rt() {
  if (Qn)
    return bn;
  Qn = 1;
  var e = $r(), n = $t(), r = $n(), t = Nr(), o = Nt(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(l) {
    var c = "Warning: " + l;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function a() {
    return null;
  }
  return bn = function(l, c) {
    var s = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function p(g) {
      var x = g && (s && g[s] || g[u]);
      if (typeof x == "function")
        return x;
    }
    var d = "<<anonymous>>", v = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: K(),
      arrayOf: D,
      element: T(),
      elementType: m(),
      instanceOf: Q,
      node: C(),
      objectOf: fe,
      oneOf: re,
      oneOfType: le,
      shape: Z,
      exact: te
    };
    function b(g, x) {
      return g === x ? g !== 0 || 1 / g === 1 / x : g !== g && x !== x;
    }
    function h(g, x) {
      this.message = g, this.data = x && typeof x == "object" ? x : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function f(g) {
      if (process.env.NODE_ENV !== "production")
        var x = {}, N = 0;
      function O(P, _, $, I, j, M, ee) {
        if (I = I || d, M = M || $, ee !== r) {
          if (c) {
            var y = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw y.name = "Invariant Violation", y;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ie = I + ":" + $;
            !x[ie] && // Avoid spamming the console because they are often not actionable except for lib authors
            N < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + M + "` prop on `" + I + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), x[ie] = !0, N++);
          }
        }
        return _[$] == null ? P ? _[$] === null ? new h("The " + j + " `" + M + "` is marked as required " + ("in `" + I + "`, but its value is `null`.")) : new h("The " + j + " `" + M + "` is marked as required in " + ("`" + I + "`, but its value is `undefined`.")) : null : g(_, $, I, j, M);
      }
      var w = O.bind(null, !1);
      return w.isRequired = O.bind(null, !0), w;
    }
    function E(g) {
      function x(N, O, w, P, _, $) {
        var I = N[O], j = ne(I);
        if (j !== g) {
          var M = ue(I);
          return new h(
            "Invalid " + P + " `" + _ + "` of type " + ("`" + M + "` supplied to `" + w + "`, expected ") + ("`" + g + "`."),
            { expectedType: g }
          );
        }
        return null;
      }
      return f(x);
    }
    function K() {
      return f(a);
    }
    function D(g) {
      function x(N, O, w, P, _) {
        if (typeof g != "function")
          return new h("Property `" + _ + "` of component `" + w + "` has invalid PropType notation inside arrayOf.");
        var $ = N[O];
        if (!Array.isArray($)) {
          var I = ne($);
          return new h("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + w + "`, expected an array."));
        }
        for (var j = 0; j < $.length; j++) {
          var M = g($, j, w, P, _ + "[" + j + "]", r);
          if (M instanceof Error)
            return M;
        }
        return null;
      }
      return f(x);
    }
    function T() {
      function g(x, N, O, w, P) {
        var _ = x[N];
        if (!l(_)) {
          var $ = ne(_);
          return new h("Invalid " + w + " `" + P + "` of type " + ("`" + $ + "` supplied to `" + O + "`, expected a single ReactElement."));
        }
        return null;
      }
      return f(g);
    }
    function m() {
      function g(x, N, O, w, P) {
        var _ = x[N];
        if (!e.isValidElementType(_)) {
          var $ = ne(_);
          return new h("Invalid " + w + " `" + P + "` of type " + ("`" + $ + "` supplied to `" + O + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return f(g);
    }
    function Q(g) {
      function x(N, O, w, P, _) {
        if (!(N[O] instanceof g)) {
          var $ = g.name || d, I = we(N[O]);
          return new h("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + w + "`, expected ") + ("instance of `" + $ + "`."));
        }
        return null;
      }
      return f(x);
    }
    function re(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function x(N, O, w, P, _) {
        for (var $ = N[O], I = 0; I < g.length; I++)
          if (b($, g[I]))
            return null;
        var j = JSON.stringify(g, function(ee, y) {
          var ie = ue(y);
          return ie === "symbol" ? String(y) : y;
        });
        return new h("Invalid " + P + " `" + _ + "` of value `" + String($) + "` " + ("supplied to `" + w + "`, expected one of " + j + "."));
      }
      return f(x);
    }
    function fe(g) {
      function x(N, O, w, P, _) {
        if (typeof g != "function")
          return new h("Property `" + _ + "` of component `" + w + "` has invalid PropType notation inside objectOf.");
        var $ = N[O], I = ne($);
        if (I !== "object")
          return new h("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + w + "`, expected an object."));
        for (var j in $)
          if (t($, j)) {
            var M = g($, j, w, P, _ + "." + j, r);
            if (M instanceof Error)
              return M;
          }
        return null;
      }
      return f(x);
    }
    function le(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var x = 0; x < g.length; x++) {
        var N = g[x];
        if (typeof N != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ke(N) + " at index " + x + "."
          ), a;
      }
      function O(w, P, _, $, I) {
        for (var j = [], M = 0; M < g.length; M++) {
          var ee = g[M], y = ee(w, P, _, $, I, r);
          if (y == null)
            return null;
          y.data && t(y.data, "expectedType") && j.push(y.data.expectedType);
        }
        var ie = j.length > 0 ? ", expected one of type [" + j.join(", ") + "]" : "";
        return new h("Invalid " + $ + " `" + I + "` supplied to " + ("`" + _ + "`" + ie + "."));
      }
      return f(O);
    }
    function C() {
      function g(x, N, O, w, P) {
        return J(x[N]) ? null : new h("Invalid " + w + " `" + P + "` supplied to " + ("`" + O + "`, expected a ReactNode."));
      }
      return f(g);
    }
    function G(g, x, N, O, w) {
      return new h(
        (g || "React class") + ": " + x + " type `" + N + "." + O + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + w + "`."
      );
    }
    function Z(g) {
      function x(N, O, w, P, _) {
        var $ = N[O], I = ne($);
        if (I !== "object")
          return new h("Invalid " + P + " `" + _ + "` of type `" + I + "` " + ("supplied to `" + w + "`, expected `object`."));
        for (var j in g) {
          var M = g[j];
          if (typeof M != "function")
            return G(w, P, _, j, ue(M));
          var ee = M($, j, w, P, _ + "." + j, r);
          if (ee)
            return ee;
        }
        return null;
      }
      return f(x);
    }
    function te(g) {
      function x(N, O, w, P, _) {
        var $ = N[O], I = ne($);
        if (I !== "object")
          return new h("Invalid " + P + " `" + _ + "` of type `" + I + "` " + ("supplied to `" + w + "`, expected `object`."));
        var j = n({}, N[O], g);
        for (var M in j) {
          var ee = g[M];
          if (t(g, M) && typeof ee != "function")
            return G(w, P, _, M, ue(ee));
          if (!ee)
            return new h(
              "Invalid " + P + " `" + _ + "` key `" + M + "` supplied to `" + w + "`.\nBad object: " + JSON.stringify(N[O], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(g), null, "  ")
            );
          var y = ee($, M, w, P, _ + "." + M, r);
          if (y)
            return y;
        }
        return null;
      }
      return f(x);
    }
    function J(g) {
      switch (typeof g) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !g;
        case "object":
          if (Array.isArray(g))
            return g.every(J);
          if (g === null || l(g))
            return !0;
          var x = p(g);
          if (x) {
            var N = x.call(g), O;
            if (x !== g.entries) {
              for (; !(O = N.next()).done; )
                if (!J(O.value))
                  return !1;
            } else
              for (; !(O = N.next()).done; ) {
                var w = O.value;
                if (w && !J(w[1]))
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
    function ne(g) {
      var x = typeof g;
      return Array.isArray(g) ? "array" : g instanceof RegExp ? "object" : q(x, g) ? "symbol" : x;
    }
    function ue(g) {
      if (typeof g > "u" || g === null)
        return "" + g;
      var x = ne(g);
      if (x === "object") {
        if (g instanceof Date)
          return "date";
        if (g instanceof RegExp)
          return "regexp";
      }
      return x;
    }
    function ke(g) {
      var x = ue(g);
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
    function we(g) {
      return !g.constructor || !g.constructor.name ? d : g.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, bn;
}
var yn, er;
function At() {
  if (er)
    return yn;
  er = 1;
  var e = $n();
  function n() {
  }
  function r() {
  }
  return r.resetWarningCache = n, yn = function() {
    function t(a, l, c, s, u, p) {
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
    var i = {
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
      checkPropTypes: r,
      resetWarningCache: n
    };
    return i.PropTypes = i, i;
  }, yn;
}
if (process.env.NODE_ENV !== "production") {
  var Pt = $r(), It = !0;
  En.exports = Rt()(Pt.isElement, It);
} else
  En.exports = At()();
var Mt = En.exports;
const U = /* @__PURE__ */ Ct(Mt);
function Me(e) {
  let n = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    n += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + n + " for the full message.";
}
var wn = { exports: {} }, L = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nr;
function Bt() {
  if (nr)
    return L;
  nr = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), b;
  b = Symbol.for("react.module.reference");
  function h(f) {
    if (typeof f == "object" && f !== null) {
      var E = f.$$typeof;
      switch (E) {
        case e:
          switch (f = f.type, f) {
            case r:
            case o:
            case t:
            case s:
            case u:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case l:
                case a:
                case c:
                case d:
                case p:
                case i:
                  return f;
                default:
                  return E;
              }
          }
        case n:
          return E;
      }
    }
  }
  return L.ContextConsumer = a, L.ContextProvider = i, L.Element = e, L.ForwardRef = c, L.Fragment = r, L.Lazy = d, L.Memo = p, L.Portal = n, L.Profiler = o, L.StrictMode = t, L.Suspense = s, L.SuspenseList = u, L.isAsyncMode = function() {
    return !1;
  }, L.isConcurrentMode = function() {
    return !1;
  }, L.isContextConsumer = function(f) {
    return h(f) === a;
  }, L.isContextProvider = function(f) {
    return h(f) === i;
  }, L.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === e;
  }, L.isForwardRef = function(f) {
    return h(f) === c;
  }, L.isFragment = function(f) {
    return h(f) === r;
  }, L.isLazy = function(f) {
    return h(f) === d;
  }, L.isMemo = function(f) {
    return h(f) === p;
  }, L.isPortal = function(f) {
    return h(f) === n;
  }, L.isProfiler = function(f) {
    return h(f) === o;
  }, L.isStrictMode = function(f) {
    return h(f) === t;
  }, L.isSuspense = function(f) {
    return h(f) === s;
  }, L.isSuspenseList = function(f) {
    return h(f) === u;
  }, L.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === r || f === o || f === t || f === s || f === u || f === v || typeof f == "object" && f !== null && (f.$$typeof === d || f.$$typeof === p || f.$$typeof === i || f.$$typeof === a || f.$$typeof === c || f.$$typeof === b || f.getModuleId !== void 0);
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
var rr;
function Dt() {
  return rr || (rr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), b = !1, h = !1, f = !1, E = !1, K = !1, D;
    D = Symbol.for("react.module.reference");
    function T(k) {
      return !!(typeof k == "string" || typeof k == "function" || k === r || k === o || K || k === t || k === s || k === u || E || k === v || b || h || f || typeof k == "object" && k !== null && (k.$$typeof === d || k.$$typeof === p || k.$$typeof === i || k.$$typeof === a || k.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      k.$$typeof === D || k.getModuleId !== void 0));
    }
    function m(k) {
      if (typeof k == "object" && k !== null) {
        var Te = k.$$typeof;
        switch (Te) {
          case e:
            var qe = k.type;
            switch (qe) {
              case r:
              case o:
              case t:
              case s:
              case u:
                return qe;
              default:
                var jn = qe && qe.$$typeof;
                switch (jn) {
                  case l:
                  case a:
                  case c:
                  case d:
                  case p:
                  case i:
                    return jn;
                  default:
                    return Te;
                }
            }
          case n:
            return Te;
        }
      }
    }
    var Q = a, re = i, fe = e, le = c, C = r, G = d, Z = p, te = n, J = o, q = t, ne = s, ue = u, ke = !1, we = !1;
    function g(k) {
      return ke || (ke = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function x(k) {
      return we || (we = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function N(k) {
      return m(k) === a;
    }
    function O(k) {
      return m(k) === i;
    }
    function w(k) {
      return typeof k == "object" && k !== null && k.$$typeof === e;
    }
    function P(k) {
      return m(k) === c;
    }
    function _(k) {
      return m(k) === r;
    }
    function $(k) {
      return m(k) === d;
    }
    function I(k) {
      return m(k) === p;
    }
    function j(k) {
      return m(k) === n;
    }
    function M(k) {
      return m(k) === o;
    }
    function ee(k) {
      return m(k) === t;
    }
    function y(k) {
      return m(k) === s;
    }
    function ie(k) {
      return m(k) === u;
    }
    F.ContextConsumer = Q, F.ContextProvider = re, F.Element = fe, F.ForwardRef = le, F.Fragment = C, F.Lazy = G, F.Memo = Z, F.Portal = te, F.Profiler = J, F.StrictMode = q, F.Suspense = ne, F.SuspenseList = ue, F.isAsyncMode = g, F.isConcurrentMode = x, F.isContextConsumer = N, F.isContextProvider = O, F.isElement = w, F.isForwardRef = P, F.isFragment = _, F.isLazy = $, F.isMemo = I, F.isPortal = j, F.isProfiler = M, F.isStrictMode = ee, F.isSuspense = y, F.isSuspenseList = ie, F.isValidElementType = T, F.typeOf = m;
  }()), F;
}
process.env.NODE_ENV === "production" ? wn.exports = Bt() : wn.exports = Dt();
var tr = wn.exports;
const jt = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Vt(e) {
  const n = `${e}`.match(jt);
  return n && n[1] || "";
}
function Rr(e, n = "") {
  return e.displayName || e.name || Vt(e) || n;
}
function or(e, n, r) {
  const t = Rr(n);
  return e.displayName || (t !== "" ? `${r}(${t})` : r);
}
function zt(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Rr(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case tr.ForwardRef:
          return or(e, e.render, "ForwardRef");
        case tr.Memo:
          return or(e, e.type, "memo");
        default:
          return;
      }
  }
}
function pe(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Me(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ar(e, n) {
  const r = B({}, n);
  return Object.keys(e).forEach((t) => {
    if (t.toString().match(/^(components|slots)$/))
      r[t] = B({}, e[t], r[t]);
    else if (t.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[t] || {}, i = n[t];
      r[t] = {}, !i || !Object.keys(i) ? r[t] = o : !o || !Object.keys(o) ? r[t] = i : (r[t] = B({}, i), Object.keys(o).forEach((a) => {
        r[t][a] = Ar(o[a], i[a]);
      }));
    } else
      r[t] === void 0 && (r[t] = e[t]);
  }), r;
}
function Lt(e, n, r = void 0) {
  const t = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      t[o] = e[o].reduce((i, a) => {
        if (a) {
          const l = n(a);
          l !== "" && i.push(l), r && r[a] && i.push(r[a]);
        }
        return i;
      }, []).join(" ");
    }
  ), t;
}
const ir = (e) => e, Ft = () => {
  let e = ir;
  return {
    configure(n) {
      e = n;
    },
    generate(n) {
      return e(n);
    },
    reset() {
      e = ir;
    }
  };
}, Ut = Ft(), Wt = Ut, Gt = {
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
function Nn(e, n, r = "Mui") {
  const t = Gt[n];
  return t ? `${r}-${t}` : `${Wt.generate(e)}-${n}`;
}
function qt(e, n, r = "Mui") {
  const t = {};
  return n.forEach((o) => {
    t[o] = Nn(e, o, r);
  }), t;
}
function Ht(e, n = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(n, Math.min(e, r));
}
function be(e, n) {
  if (e == null)
    return {};
  var r = {}, t = Object.keys(e), o, i;
  for (i = 0; i < t.length; i++)
    o = t[i], !(n.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function Pr(e) {
  var n, r, t = "";
  if (typeof e == "string" || typeof e == "number")
    t += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (n = 0; n < o; n++)
        e[n] && (r = Pr(e[n])) && (t && (t += " "), t += r);
    } else
      for (r in e)
        e[r] && (t && (t += " "), t += r);
  return t;
}
function Xt() {
  for (var e, n, r = 0, t = "", o = arguments.length; r < o; r++)
    (e = arguments[r]) && (n = Pr(e)) && (t && (t += " "), t += n);
  return t;
}
const Yt = ["values", "unit", "step"], Kt = (e) => {
  const n = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return n.sort((r, t) => r.val - t.val), n.reduce((r, t) => B({}, r, {
    [t.key]: t.val
  }), {});
};
function Jt(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: n = {
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
    unit: r = "px",
    step: t = 5
  } = e, o = be(e, Yt), i = Kt(n), a = Object.keys(i);
  function l(d) {
    return `@media (min-width:${typeof n[d] == "number" ? n[d] : d}${r})`;
  }
  function c(d) {
    return `@media (max-width:${(typeof n[d] == "number" ? n[d] : d) - t / 100}${r})`;
  }
  function s(d, v) {
    const b = a.indexOf(v);
    return `@media (min-width:${typeof n[d] == "number" ? n[d] : d}${r}) and (max-width:${(b !== -1 && typeof n[a[b]] == "number" ? n[a[b]] : v) - t / 100}${r})`;
  }
  function u(d) {
    return a.indexOf(d) + 1 < a.length ? s(d, a[a.indexOf(d) + 1]) : l(d);
  }
  function p(d) {
    const v = a.indexOf(d);
    return v === 0 ? l(a[1]) : v === a.length - 1 ? c(a[v]) : s(d, a[a.indexOf(d) + 1]).replace("@media", "@media not all and");
  }
  return B({
    keys: a,
    values: i,
    up: l,
    down: c,
    between: s,
    only: u,
    not: p,
    unit: r
  }, o);
}
const Zt = {
  borderRadius: 4
}, Qt = Zt, eo = process.env.NODE_ENV !== "production" ? U.oneOfType([U.number, U.string, U.object, U.array]) : {}, xe = eo;
function Le(e, n) {
  return n ? de(e, n, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Rn = {
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
}, ar = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Rn[e]}px)`
};
function ge(e, n, r) {
  const t = e.theme || {};
  if (Array.isArray(n)) {
    const i = t.breakpoints || ar;
    return n.reduce((a, l, c) => (a[i.up(i.keys[c])] = r(n[c]), a), {});
  }
  if (typeof n == "object") {
    const i = t.breakpoints || ar;
    return Object.keys(n).reduce((a, l) => {
      if (Object.keys(i.values || Rn).indexOf(l) !== -1) {
        const c = i.up(l);
        a[c] = r(n[l], l);
      } else {
        const c = l;
        a[c] = n[c];
      }
      return a;
    }, {});
  }
  return r(n);
}
function no(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((t, o) => {
    const i = e.up(o);
    return t[i] = {}, t;
  }, {})) || {};
}
function ro(e, n) {
  return e.reduce((r, t) => {
    const o = r[t];
    return (!o || Object.keys(o).length === 0) && delete r[t], r;
  }, n);
}
function rn(e, n, r = !0) {
  if (!n || typeof n != "string")
    return null;
  if (e && e.vars && r) {
    const t = `vars.${n}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (t != null)
      return t;
  }
  return n.split(".").reduce((t, o) => t && t[o] != null ? t[o] : null, e);
}
function Ze(e, n, r, t = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || t : o = rn(e, r) || t, n && (o = n(o, t, e)), o;
}
function Y(e) {
  const {
    prop: n,
    cssProperty: r = e.prop,
    themeKey: t,
    transform: o
  } = e, i = (a) => {
    if (a[n] == null)
      return null;
    const l = a[n], c = a.theme, s = rn(c, t) || {};
    return ge(a, l, (p) => {
      let d = Ze(s, o, p);
      return p === d && typeof p == "string" && (d = Ze(s, o, `${n}${p === "default" ? "" : pe(p)}`, p)), r === !1 ? d : {
        [r]: d
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [n]: xe
  } : {}, i.filterProps = [n], i;
}
function to(e) {
  const n = {};
  return (r) => (n[r] === void 0 && (n[r] = e(r)), n[r]);
}
const oo = {
  m: "margin",
  p: "padding"
}, io = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, sr = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, ao = to((e) => {
  if (e.length > 2)
    if (sr[e])
      e = sr[e];
    else
      return [e];
  const [n, r] = e.split(""), t = oo[n], o = io[r] || "";
  return Array.isArray(o) ? o.map((i) => t + i) : [t + o];
}), tn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], on = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], so = [...tn, ...on];
function We(e, n, r, t) {
  var o;
  const i = (o = rn(e, n, !1)) != null ? o : r;
  return typeof i == "number" ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && typeof a != "number" && console.error(`MUI: Expected ${t} argument to be a number or a string, got ${a}.`), i * a) : Array.isArray(i) ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))), i[a]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Ir(e) {
  return We(e, "spacing", 8, "spacing");
}
function Ge(e, n) {
  if (typeof n == "string" || n == null)
    return n;
  const r = Math.abs(n), t = e(r);
  return n >= 0 ? t : typeof t == "number" ? -t : `-${t}`;
}
function co(e, n) {
  return (r) => e.reduce((t, o) => (t[o] = Ge(n, r), t), {});
}
function lo(e, n, r, t) {
  if (n.indexOf(r) === -1)
    return null;
  const o = ao(r), i = co(o, t), a = e[r];
  return ge(e, a, i);
}
function Mr(e, n) {
  const r = Ir(e.theme);
  return Object.keys(e).map((t) => lo(e, n, t, r)).reduce(Le, {});
}
function H(e) {
  return Mr(e, tn);
}
H.propTypes = process.env.NODE_ENV !== "production" ? tn.reduce((e, n) => (e[n] = xe, e), {}) : {};
H.filterProps = tn;
function X(e) {
  return Mr(e, on);
}
X.propTypes = process.env.NODE_ENV !== "production" ? on.reduce((e, n) => (e[n] = xe, e), {}) : {};
X.filterProps = on;
process.env.NODE_ENV !== "production" && so.reduce((e, n) => (e[n] = xe, e), {});
function uo(e = 8) {
  if (e.mui)
    return e;
  const n = Ir({
    spacing: e
  }), r = (...t) => (process.env.NODE_ENV !== "production" && (t.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)), (t.length === 0 ? [1] : t).map((i) => {
    const a = n(i);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return r.mui = !0, r;
}
function an(...e) {
  const n = e.reduce((t, o) => (o.filterProps.forEach((i) => {
    t[i] = o;
  }), t), {}), r = (t) => Object.keys(t).reduce((o, i) => n[i] ? Le(o, n[i](t)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((t, o) => Object.assign(t, o.propTypes), {}) : {}, r.filterProps = e.reduce((t, o) => t.concat(o.filterProps), []), r;
}
function se(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function ce(e, n) {
  return Y({
    prop: e,
    themeKey: "borders",
    transform: n
  });
}
const fo = ce("border", se), po = ce("borderTop", se), ho = ce("borderRight", se), mo = ce("borderBottom", se), go = ce("borderLeft", se), bo = ce("borderColor"), yo = ce("borderTopColor"), vo = ce("borderRightColor"), xo = ce("borderBottomColor"), ko = ce("borderLeftColor"), So = ce("outline", se), Eo = ce("outlineColor"), sn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const n = We(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (t) => ({
      borderRadius: Ge(n, t)
    });
    return ge(e, e.borderRadius, r);
  }
  return null;
};
sn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: xe
} : {};
sn.filterProps = ["borderRadius"];
an(fo, po, ho, mo, go, bo, yo, vo, xo, ko, sn, So, Eo);
const cn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const n = We(e.theme, "spacing", 8, "gap"), r = (t) => ({
      gap: Ge(n, t)
    });
    return ge(e, e.gap, r);
  }
  return null;
};
cn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: xe
} : {};
cn.filterProps = ["gap"];
const ln = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const n = We(e.theme, "spacing", 8, "columnGap"), r = (t) => ({
      columnGap: Ge(n, t)
    });
    return ge(e, e.columnGap, r);
  }
  return null;
};
ln.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: xe
} : {};
ln.filterProps = ["columnGap"];
const un = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const n = We(e.theme, "spacing", 8, "rowGap"), r = (t) => ({
      rowGap: Ge(n, t)
    });
    return ge(e, e.rowGap, r);
  }
  return null;
};
un.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: xe
} : {};
un.filterProps = ["rowGap"];
const wo = Y({
  prop: "gridColumn"
}), To = Y({
  prop: "gridRow"
}), Co = Y({
  prop: "gridAutoFlow"
}), _o = Y({
  prop: "gridAutoColumns"
}), Oo = Y({
  prop: "gridAutoRows"
}), $o = Y({
  prop: "gridTemplateColumns"
}), No = Y({
  prop: "gridTemplateRows"
}), Ro = Y({
  prop: "gridTemplateAreas"
}), Ao = Y({
  prop: "gridArea"
});
an(cn, ln, un, wo, To, Co, _o, Oo, $o, No, Ro, Ao);
function Ie(e, n) {
  return n === "grey" ? n : e;
}
const Po = Y({
  prop: "color",
  themeKey: "palette",
  transform: Ie
}), Io = Y({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ie
}), Mo = Y({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ie
});
an(Po, Io, Mo);
function oe(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Bo = Y({
  prop: "width",
  transform: oe
}), An = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const n = (r) => {
      var t, o;
      const i = ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null ? void 0 : t[r]) || Rn[r];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: oe(r)
      };
    };
    return ge(e, e.maxWidth, n);
  }
  return null;
};
An.filterProps = ["maxWidth"];
const Do = Y({
  prop: "minWidth",
  transform: oe
}), jo = Y({
  prop: "height",
  transform: oe
}), Vo = Y({
  prop: "maxHeight",
  transform: oe
}), zo = Y({
  prop: "minHeight",
  transform: oe
});
Y({
  prop: "size",
  cssProperty: "width",
  transform: oe
});
Y({
  prop: "size",
  cssProperty: "height",
  transform: oe
});
const Lo = Y({
  prop: "boxSizing"
});
an(Bo, An, Do, jo, Vo, zo, Lo);
const Fo = {
  // borders
  border: {
    themeKey: "borders",
    transform: se
  },
  borderTop: {
    themeKey: "borders",
    transform: se
  },
  borderRight: {
    themeKey: "borders",
    transform: se
  },
  borderBottom: {
    themeKey: "borders",
    transform: se
  },
  borderLeft: {
    themeKey: "borders",
    transform: se
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
    transform: se
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: sn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Ie
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Ie
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Ie
  },
  // spacing
  p: {
    style: X
  },
  pt: {
    style: X
  },
  pr: {
    style: X
  },
  pb: {
    style: X
  },
  pl: {
    style: X
  },
  px: {
    style: X
  },
  py: {
    style: X
  },
  padding: {
    style: X
  },
  paddingTop: {
    style: X
  },
  paddingRight: {
    style: X
  },
  paddingBottom: {
    style: X
  },
  paddingLeft: {
    style: X
  },
  paddingX: {
    style: X
  },
  paddingY: {
    style: X
  },
  paddingInline: {
    style: X
  },
  paddingInlineStart: {
    style: X
  },
  paddingInlineEnd: {
    style: X
  },
  paddingBlock: {
    style: X
  },
  paddingBlockStart: {
    style: X
  },
  paddingBlockEnd: {
    style: X
  },
  m: {
    style: H
  },
  mt: {
    style: H
  },
  mr: {
    style: H
  },
  mb: {
    style: H
  },
  ml: {
    style: H
  },
  mx: {
    style: H
  },
  my: {
    style: H
  },
  margin: {
    style: H
  },
  marginTop: {
    style: H
  },
  marginRight: {
    style: H
  },
  marginBottom: {
    style: H
  },
  marginLeft: {
    style: H
  },
  marginX: {
    style: H
  },
  marginY: {
    style: H
  },
  marginInline: {
    style: H
  },
  marginInlineStart: {
    style: H
  },
  marginInlineEnd: {
    style: H
  },
  marginBlock: {
    style: H
  },
  marginBlockStart: {
    style: H
  },
  marginBlockEnd: {
    style: H
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
    style: cn
  },
  rowGap: {
    style: un
  },
  columnGap: {
    style: ln
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
    transform: oe
  },
  maxWidth: {
    style: An
  },
  minWidth: {
    transform: oe
  },
  height: {
    transform: oe
  },
  maxHeight: {
    transform: oe
  },
  minHeight: {
    transform: oe
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
}, Pn = Fo;
function Uo(...e) {
  const n = e.reduce((t, o) => t.concat(Object.keys(o)), []), r = new Set(n);
  return e.every((t) => r.size === Object.keys(t).length);
}
function Wo(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Go() {
  function e(r, t, o, i) {
    const a = {
      [r]: t,
      theme: o
    }, l = i[r];
    if (!l)
      return {
        [r]: t
      };
    const {
      cssProperty: c = r,
      themeKey: s,
      transform: u,
      style: p
    } = l;
    if (t == null)
      return null;
    if (s === "typography" && t === "inherit")
      return {
        [r]: t
      };
    const d = rn(o, s) || {};
    return p ? p(a) : ge(a, t, (b) => {
      let h = Ze(d, u, b);
      return b === h && typeof b == "string" && (h = Ze(d, u, `${r}${b === "default" ? "" : pe(b)}`, b)), c === !1 ? h : {
        [c]: h
      };
    });
  }
  function n(r) {
    var t;
    const {
      sx: o,
      theme: i = {}
    } = r || {};
    if (!o)
      return null;
    const a = (t = i.unstable_sxConfig) != null ? t : Pn;
    function l(c) {
      let s = c;
      if (typeof c == "function")
        s = c(i);
      else if (typeof c != "object")
        return c;
      if (!s)
        return null;
      const u = no(i.breakpoints), p = Object.keys(u);
      let d = u;
      return Object.keys(s).forEach((v) => {
        const b = Wo(s[v], i);
        if (b != null)
          if (typeof b == "object")
            if (a[v])
              d = Le(d, e(v, b, i, a));
            else {
              const h = ge({
                theme: i
              }, b, (f) => ({
                [v]: f
              }));
              Uo(h, b) ? d[v] = n({
                sx: b,
                theme: i
              }) : d = Le(d, h);
            }
          else
            d = Le(d, e(v, b, i, a));
      }), ro(p, d);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return n;
}
const Br = Go();
Br.filterProps = ["sx"];
const In = Br, qo = ["breakpoints", "palette", "spacing", "shape"];
function Mn(e = {}, ...n) {
  const {
    breakpoints: r = {},
    palette: t = {},
    spacing: o,
    shape: i = {}
  } = e, a = be(e, qo), l = Jt(r), c = uo(o);
  let s = de({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: B({
      mode: "light"
    }, t),
    spacing: c,
    shape: B({}, Qt, i)
  }, a);
  return s = n.reduce((u, p) => de(u, p), s), s.unstable_sxConfig = B({}, Pn, a == null ? void 0 : a.unstable_sxConfig), s.unstable_sx = function(p) {
    return In({
      sx: p,
      theme: this
    });
  }, s;
}
function Ho(e) {
  return Object.keys(e).length === 0;
}
function Xo(e = null) {
  const n = Fe.useContext(st);
  return !n || Ho(n) ? e : n;
}
const Yo = Mn();
function Ko(e = Yo) {
  return Xo(e);
}
const Jo = ["variant"];
function cr(e) {
  return e.length === 0;
}
function Dr(e) {
  const {
    variant: n
  } = e, r = be(e, Jo);
  let t = n || "";
  return Object.keys(r).sort().forEach((o) => {
    o === "color" ? t += cr(t) ? e[o] : pe(e[o]) : t += `${cr(t) ? o : pe(o)}${pe(e[o].toString())}`;
  }), t;
}
const Zo = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Qo(e) {
  return Object.keys(e).length === 0;
}
function ei(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const ni = (e, n) => n.components && n.components[e] && n.components[e].styleOverrides ? n.components[e].styleOverrides : null, Qe = (e) => {
  let n = 0;
  const r = {};
  return e && e.forEach((t) => {
    let o = "";
    typeof t.props == "function" ? (o = `callback${n}`, n += 1) : o = Dr(t.props), r[o] = t.style;
  }), r;
}, ri = (e, n) => {
  let r = [];
  return n && n.components && n.components[e] && n.components[e].variants && (r = n.components[e].variants), Qe(r);
}, en = (e, n, r) => {
  const {
    ownerState: t = {}
  } = e, o = [];
  let i = 0;
  return r && r.forEach((a) => {
    let l = !0;
    if (typeof a.props == "function") {
      const c = B({}, e, t);
      l = a.props(c);
    } else
      Object.keys(a.props).forEach((c) => {
        t[c] !== a.props[c] && e[c] !== a.props[c] && (l = !1);
      });
    l && (typeof a.props == "function" ? o.push(n[`callback${i}`]) : o.push(n[Dr(a.props)])), typeof a.props == "function" && (i += 1);
  }), o;
}, ti = (e, n, r, t) => {
  var o;
  const i = r == null || (o = r.components) == null || (o = o[t]) == null ? void 0 : o.variants;
  return en(e, n, i);
};
function Ye(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const oi = Mn(), lr = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Ke({
  defaultTheme: e,
  theme: n,
  themeId: r
}) {
  return Qo(n) ? e : n[r] || n;
}
function ii(e) {
  return e ? (n, r) => r[e] : null;
}
const ur = ({
  styledArg: e,
  props: n,
  defaultTheme: r,
  themeId: t
}) => {
  const o = e(B({}, n, {
    theme: Ke(B({}, n, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  let i;
  if (o && o.variants && (i = o.variants, delete o.variants), i) {
    const a = en(n, Qe(i), i);
    return [o, ...a];
  }
  return o;
};
function ai(e = {}) {
  const {
    themeId: n,
    defaultTheme: r = oi,
    rootShouldForwardProp: t = Ye,
    slotShouldForwardProp: o = Ye
  } = e, i = (a) => In(B({}, a, {
    theme: Ke(B({}, a, {
      defaultTheme: r,
      themeId: n
    }))
  }));
  return i.__mui_systemSx = !0, (a, l = {}) => {
    ct(a, (T) => T.filter((m) => !(m != null && m.__mui_systemSx)));
    const {
      name: c,
      slot: s,
      skipVariantsResolver: u,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = ii(lr(s))
    } = l, v = be(l, Zo), b = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      s && s !== "Root" && s !== "root" || !1
    ), h = p || !1;
    let f;
    process.env.NODE_ENV !== "production" && c && (f = `${c}-${lr(s || "Root")}`);
    let E = Ye;
    s === "Root" || s === "root" ? E = t : s ? E = o : ei(a) && (E = void 0);
    const K = at(a, B({
      shouldForwardProp: E,
      label: f
    }, v)), D = (T, ...m) => {
      const Q = m ? m.map((C) => {
        if (typeof C == "function" && C.__emotion_real !== C)
          return (G) => ur({
            styledArg: C,
            props: G,
            defaultTheme: r,
            themeId: n
          });
        if (ve(C)) {
          let G = C, Z;
          return C && C.variants && (Z = C.variants, delete G.variants, G = (te) => {
            let J = C;
            return en(te, Qe(Z), Z).forEach((ne) => {
              J = de(J, ne);
            }), J;
          }), G;
        }
        return C;
      }) : [];
      let re = T;
      if (ve(T)) {
        let C;
        T && T.variants && (C = T.variants, delete re.variants, re = (G) => {
          let Z = T;
          return en(G, Qe(C), C).forEach((J) => {
            Z = de(Z, J);
          }), Z;
        });
      } else
        typeof T == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        T.__emotion_real !== T && (re = (C) => ur({
          styledArg: T,
          props: C,
          defaultTheme: r,
          themeId: n
        }));
      c && d && Q.push((C) => {
        const G = Ke(B({}, C, {
          defaultTheme: r,
          themeId: n
        })), Z = ni(c, G);
        if (Z) {
          const te = {};
          return Object.entries(Z).forEach(([J, q]) => {
            te[J] = typeof q == "function" ? q(B({}, C, {
              theme: G
            })) : q;
          }), d(C, te);
        }
        return null;
      }), c && !b && Q.push((C) => {
        const G = Ke(B({}, C, {
          defaultTheme: r,
          themeId: n
        }));
        return ti(C, ri(c, G), G, c);
      }), h || Q.push(i);
      const fe = Q.length - m.length;
      if (Array.isArray(T) && fe > 0) {
        const C = new Array(fe).fill("");
        re = [...T, ...C], re.raw = [...T.raw, ...C];
      }
      const le = K(re, ...Q);
      if (process.env.NODE_ENV !== "production") {
        let C;
        c && (C = `${c}${pe(s || "")}`), C === void 0 && (C = `Styled(${zt(a)})`), le.displayName = C;
      }
      return a.muiName && (le.muiName = a.muiName), le;
    };
    return K.withConfig && (D.withConfig = K.withConfig), D;
  };
}
function si(e) {
  const {
    theme: n,
    name: r,
    props: t
  } = e;
  return !n || !n.components || !n.components[r] || !n.components[r].defaultProps ? t : Ar(n.components[r].defaultProps, t);
}
function ci({
  props: e,
  name: n,
  defaultTheme: r,
  themeId: t
}) {
  let o = Ko(r);
  return t && (o = o[t] || o), si({
    theme: o,
    name: n,
    props: e
  });
}
function jr(e, n = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < n || e > r) && console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`), Ht(e, n, r);
}
function li(e) {
  e = e.slice(1);
  const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(n);
  return r && r[0].length === 1 && (r = r.map((t) => t + t)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((t, o) => o < 3 ? parseInt(t, 16) : Math.round(parseInt(t, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Be(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Be(li(e));
  const n = e.indexOf("("), r = e.substring(0, n);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Me(9, e));
  let t = e.substring(n + 1, e.length - 1), o;
  if (r === "color") {
    if (t = t.split(" "), o = t.shift(), t.length === 4 && t[3].charAt(0) === "/" && (t[3] = t[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Me(10, o));
  } else
    t = t.split(",");
  return t = t.map((i) => parseFloat(i)), {
    type: r,
    values: t,
    colorSpace: o
  };
}
function Bn(e) {
  const {
    type: n,
    colorSpace: r
  } = e;
  let {
    values: t
  } = e;
  return n.indexOf("rgb") !== -1 ? t = t.map((o, i) => i < 3 ? parseInt(o, 10) : o) : n.indexOf("hsl") !== -1 && (t[1] = `${t[1]}%`, t[2] = `${t[2]}%`), n.indexOf("color") !== -1 ? t = `${r} ${t.join(" ")}` : t = `${t.join(", ")}`, `${n}(${t})`;
}
function ui(e) {
  e = Be(e);
  const {
    values: n
  } = e, r = n[0], t = n[1] / 100, o = n[2] / 100, i = t * Math.min(o, 1 - o), a = (s, u = (s + r / 30) % 12) => o - i * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(n[3])), Bn({
    type: l,
    values: c
  });
}
function dr(e) {
  e = Be(e);
  let n = e.type === "hsl" || e.type === "hsla" ? Be(ui(e)).values : e.values;
  return n = n.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3));
}
function fr(e, n) {
  const r = dr(e), t = dr(n);
  return (Math.max(r, t) + 0.05) / (Math.min(r, t) + 0.05);
}
function di(e, n) {
  if (e = Be(e), n = jr(n), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - n;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - n;
  return Bn(e);
}
function fi(e, n) {
  if (e = Be(e), n = jr(n), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * n;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * n;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * n;
  return Bn(e);
}
function pi(e, n) {
  return B({
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
  }, n);
}
const hi = {
  black: "#000",
  white: "#fff"
}, Ue = hi, mi = {
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
}, gi = mi, bi = {
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
}, _e = bi, yi = {
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
}, Oe = yi, vi = {
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
}, ze = vi, xi = {
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
}, $e = xi, ki = {
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
}, Ne = ki, Si = {
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
}, Re = Si, Ei = ["mode", "contrastThreshold", "tonalOffset"], pr = {
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
    paper: Ue.white,
    default: Ue.white
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
}, vn = {
  text: {
    primary: Ue.white,
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
    active: Ue.white,
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
function hr(e, n, r, t) {
  const o = t.light || t, i = t.dark || t * 1.5;
  e[n] || (e.hasOwnProperty(r) ? e[n] = e[r] : n === "light" ? e.light = fi(e.main, o) : n === "dark" && (e.dark = di(e.main, i)));
}
function wi(e = "light") {
  return e === "dark" ? {
    main: $e[200],
    light: $e[50],
    dark: $e[400]
  } : {
    main: $e[700],
    light: $e[400],
    dark: $e[800]
  };
}
function Ti(e = "light") {
  return e === "dark" ? {
    main: _e[200],
    light: _e[50],
    dark: _e[400]
  } : {
    main: _e[500],
    light: _e[300],
    dark: _e[700]
  };
}
function Ci(e = "light") {
  return e === "dark" ? {
    main: Oe[500],
    light: Oe[300],
    dark: Oe[700]
  } : {
    main: Oe[700],
    light: Oe[400],
    dark: Oe[800]
  };
}
function _i(e = "light") {
  return e === "dark" ? {
    main: Ne[400],
    light: Ne[300],
    dark: Ne[700]
  } : {
    main: Ne[700],
    light: Ne[500],
    dark: Ne[900]
  };
}
function Oi(e = "light") {
  return e === "dark" ? {
    main: Re[400],
    light: Re[300],
    dark: Re[700]
  } : {
    main: Re[800],
    light: Re[500],
    dark: Re[900]
  };
}
function $i(e = "light") {
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
function Ni(e) {
  const {
    mode: n = "light",
    contrastThreshold: r = 3,
    tonalOffset: t = 0.2
  } = e, o = be(e, Ei), i = e.primary || wi(n), a = e.secondary || Ti(n), l = e.error || Ci(n), c = e.info || _i(n), s = e.success || Oi(n), u = e.warning || $i(n);
  function p(h) {
    const f = fr(h, vn.text.primary) >= r ? vn.text.primary : pr.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = fr(h, f);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${f} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return f;
  }
  const d = ({
    color: h,
    name: f,
    mainShade: E = 500,
    lightShade: K = 300,
    darkShade: D = 700
  }) => {
    if (h = B({}, h), !h.main && h[E] && (h.main = h[E]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${f ? ` (${f})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : Me(11, f ? ` (${f})` : "", E));
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
} });` : Me(12, f ? ` (${f})` : "", JSON.stringify(h.main)));
    return hr(h, "light", K, t), hr(h, "dark", D, t), h.contrastText || (h.contrastText = p(h.main)), h;
  }, v = {
    dark: vn,
    light: pr
  };
  return process.env.NODE_ENV !== "production" && (v[n] || console.error(`MUI: The palette mode \`${n}\` is not supported.`)), de(B({
    // A collection of common colors.
    common: B({}, Ue),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: n,
    // The colors used to represent primary interface elements for a user.
    primary: d({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: d({
      color: a,
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
      color: s,
      name: "success"
    }),
    // The grey colors.
    grey: gi,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: p,
    // Generate a rich color object.
    augmentColor: d,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: t
  }, v[n]), o);
}
const Ri = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Ai(e) {
  return Math.round(e * 1e5) / 1e5;
}
const mr = {
  textTransform: "uppercase"
}, gr = '"Roboto", "Helvetica", "Arial", sans-serif';
function Pi(e, n) {
  const r = typeof n == "function" ? n(e) : n, {
    fontFamily: t = gr,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: a = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: s = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: p
  } = r, d = be(r, Ri);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof s != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const v = o / 14, b = p || ((E) => `${E / s * v}rem`), h = (E, K, D, T, m) => B({
    fontFamily: t,
    fontWeight: E,
    fontSize: b(K),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: D
  }, t === gr ? {
    letterSpacing: `${Ai(T / K)}em`
  } : {}, m, u), f = {
    h1: h(i, 96, 1.167, -1.5),
    h2: h(i, 60, 1.2, -0.5),
    h3: h(a, 48, 1.167, 0),
    h4: h(a, 34, 1.235, 0.25),
    h5: h(a, 24, 1.334, 0),
    h6: h(l, 20, 1.6, 0.15),
    subtitle1: h(a, 16, 1.75, 0.15),
    subtitle2: h(l, 14, 1.57, 0.1),
    body1: h(a, 16, 1.5, 0.15),
    body2: h(a, 14, 1.43, 0.15),
    button: h(l, 14, 1.75, 0.4, mr),
    caption: h(a, 12, 1.66, 0.4),
    overline: h(a, 12, 2.66, 1, mr),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return de(B({
    htmlFontSize: s,
    pxToRem: b,
    fontFamily: t,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: a,
    fontWeightMedium: l,
    fontWeightBold: c
  }, f), d, {
    clone: !1
    // No need to clone deep
  });
}
const Ii = 0.2, Mi = 0.14, Bi = 0.12;
function W(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ii})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Mi})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Bi})`].join(",");
}
const Di = ["none", W(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), W(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), W(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), W(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), W(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), W(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), W(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), W(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), W(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), W(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), W(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), W(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), W(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), W(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), W(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), W(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), W(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), W(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), W(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), W(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), W(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), W(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), W(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), W(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], ji = Di, Vi = ["duration", "easing", "delay"], zi = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Li = {
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
function br(e) {
  return `${Math.round(e)}ms`;
}
function Fi(e) {
  if (!e)
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function Ui(e) {
  const n = B({}, zi, e.easing), r = B({}, Li, e.duration);
  return B({
    getAutoHeightDuration: Fi,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = r.standard,
        easing: l = n.easeInOut,
        delay: c = 0
      } = i, s = be(i, Vi);
      if (process.env.NODE_ENV !== "production") {
        const u = (d) => typeof d == "string", p = (d) => !isNaN(parseFloat(d));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !p(a) && !u(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !p(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(s).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(s).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof a == "string" ? a : br(a)} ${l} ${typeof c == "string" ? c : br(c)}`).join(",");
    }
  }, e, {
    easing: n,
    duration: r
  });
}
const Wi = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Gi = Wi, qi = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Hi(e = {}, ...n) {
  const {
    mixins: r = {},
    palette: t = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = be(e, qi);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Me(18));
  const l = Ni(t), c = Mn(e);
  let s = de(c, {
    mixins: pi(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ji.slice(),
    typography: Pi(l, i),
    transitions: Ui(o),
    zIndex: B({}, Gi),
    applyDarkStyles(u) {
      return this.vars ? {
        [this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/, ":where($1)")]: u
      } : this.palette.mode === "dark" ? u : {};
    }
  });
  if (s = de(s, a), s = n.reduce((u, p) => de(u, p), s), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], p = (d, v) => {
      let b;
      for (b in d) {
        const h = d[b];
        if (u.indexOf(b) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const f = Nn("", b);
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
    Object.keys(s.components).forEach((d) => {
      const v = s.components[d].styleOverrides;
      v && d.indexOf("Mui") === 0 && p(v, d);
    });
  }
  return s.unstable_sxConfig = B({}, Pn, a == null ? void 0 : a.unstable_sxConfig), s.unstable_sx = function(p) {
    return In({
      sx: p,
      theme: this
    });
  }, s;
}
const Xi = Hi(), Vr = Xi, zr = "$$material";
function Yi({
  props: e,
  name: n
}) {
  return ci({
    props: e,
    name: n,
    defaultTheme: Vr,
    themeId: zr
  });
}
const Ki = (e) => Ye(e) && e !== "classes", Ji = ai({
  themeId: zr,
  defaultTheme: Vr,
  rootShouldForwardProp: Ki
}), Zi = Ji;
function Qi(e) {
  return Nn("MuiSvgIcon", e);
}
qt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const ea = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], na = (e) => {
  const {
    color: n,
    fontSize: r,
    classes: t
  } = e, o = {
    root: ["root", n !== "inherit" && `color${pe(n)}`, `fontSize${pe(r)}`]
  };
  return Lt(o, Qi, t);
}, ra = Zi("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: r
    } = e;
    return [n.root, r.color !== "inherit" && n[`color${pe(r.color)}`], n[`fontSize${pe(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var r, t, o, i, a, l, c, s, u, p, d, v, b;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: n.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (r = e.transitions) == null || (t = r.create) == null ? void 0 : t.call(r, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((i = e.typography) == null || (a = i.pxToRem) == null ? void 0 : a.call(i, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((s = e.typography) == null || (u = s.pxToRem) == null ? void 0 : u.call(s, 35)) || "2.1875rem"
    }[n.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (p = (d = (e.vars || e).palette) == null || (d = d[n.color]) == null ? void 0 : d.main) != null ? p : {
      action: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.active,
      disabled: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.disabled,
      inherit: void 0
    }[n.color]
  };
}), Dn = /* @__PURE__ */ Fe.forwardRef(function(n, r) {
  const t = Yi({
    props: n,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: a = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: s,
    inheritViewBox: u = !1,
    titleAccess: p,
    viewBox: d = "0 0 24 24"
  } = t, v = be(t, ea), b = /* @__PURE__ */ Fe.isValidElement(o) && o.type === "svg", h = B({}, t, {
    color: a,
    component: l,
    fontSize: c,
    instanceFontSize: n.fontSize,
    inheritViewBox: u,
    viewBox: d,
    hasSvgAsChild: b
  }), f = {};
  u || (f.viewBox = d);
  const E = na(h);
  return /* @__PURE__ */ De(ra, B({
    as: l,
    className: Xt(E.root, i),
    focusable: "false",
    color: s,
    "aria-hidden": p ? void 0 : !0,
    role: p ? "img" : void 0,
    ref: r
  }, f, v, b && o.props, {
    ownerState: h,
    children: [b ? o.props.children : o, p ? /* @__PURE__ */ S("title", {
      children: p
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Dn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
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
Dn.muiName = "SvgIcon";
const yr = Dn;
function ta(e, n) {
  function r(t, o) {
    return /* @__PURE__ */ S(yr, B({
      "data-testid": `${n}Icon`,
      ref: o
    }, t, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${n}Icon`), r.muiName = yr.muiName, /* @__PURE__ */ Fe.memo(/* @__PURE__ */ Fe.forwardRef(r));
}
const oa = ta(/* @__PURE__ */ S("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Ea({
  menu: e,
  dataHandler: n,
  commandHandler: r,
  className: t,
  id: o,
  children: i
}) {
  const [a, l] = Pe(!1), [c, s] = Pe(!1), u = Xe(() => {
    a && l(!1), s(!1);
  }, [a]), p = Xe((E) => {
    E.stopPropagation(), l((K) => {
      const D = !K;
      return D && E.shiftKey ? s(!0) : D || s(!1), D;
    });
  }, []), d = kn(void 0), [v, b] = Pe(0);
  nn(() => {
    a && d.current && b(d.current.clientHeight);
  }, [a]);
  const h = Xe(
    (E) => (u(), r(E)),
    [r, u]
  );
  let f = e;
  return !f && n && (f = n(c)), /* @__PURE__ */ S("div", { ref: d, style: { position: "relative" }, children: /* @__PURE__ */ S(Jr, { position: "static", id: o, children: /* @__PURE__ */ De(Zr, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    f ? /* @__PURE__ */ S(
      kr,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: p,
        children: /* @__PURE__ */ S(oa, {})
      }
    ) : void 0,
    i ? /* @__PURE__ */ S("div", { className: "papi-menu-children", children: i }) : void 0,
    f ? /* @__PURE__ */ S(
      Qr,
      {
        className: `papi-menu-drawer ${t ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: a,
        onClose: u,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: v
          }
        },
        children: /* @__PURE__ */ S(ft, { commandHandler: h, columns: f.columns })
      }
    ) : void 0
  ] }) }) });
}
const wa = (e, n) => {
  nn(() => {
    if (!e)
      return () => {
      };
    const r = e(n);
    return () => {
      r();
    };
  }, [e, n]);
};
function ia(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const aa = (e, n, r = {}) => {
  const t = kn(n);
  t.current = n;
  const o = kn(r);
  o.current = ia(o.current);
  const [i, a] = Pe(() => t.current), [l, c] = Pe(!0);
  return nn(() => {
    let s = !0;
    return c(!!e), (async () => {
      if (e) {
        const u = await e();
        s && (a(() => u), c(!1));
      }
    })(), () => {
      s = !1, o.current.preserveValue || a(() => t.current);
    };
  }, [e]), [i, l];
}, xn = () => !1, Ta = (e, n) => {
  const [r] = aa(
    Xe(async () => {
      if (!e)
        return xn;
      const t = await Promise.resolve(e(n));
      return async () => t();
    }, [n, e]),
    xn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  nn(() => () => {
    r !== xn && r();
  }, [r]);
};
function sa(e, n = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), t = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), n === "top" && t ? r.insertBefore(o, t) : r.appendChild(o);
}
sa(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
  Ce as Button,
  ha as ChapterRangeSelector,
  lt as Checkbox,
  Sn as ComboBox,
  ft as GridMenu,
  ma as IconButton,
  Ae as LabelPosition,
  ut as MenuItem,
  ba as RefSelector,
  ya as SearchBar,
  va as Slider,
  xa as Snackbar,
  ka as Switch,
  Sa as Table,
  Je as TextField,
  Ea as Toolbar,
  wa as useEvent,
  Ta as useEventAsync,
  aa as usePromise
};
//# sourceMappingURL=index.js.map
