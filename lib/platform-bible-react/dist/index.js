import { jsx as S, jsxs as Be, Fragment as Dr } from "react/jsx-runtime";
import { Button as jr, Autocomplete as zr, TextField as mr, FormControlLabel as Bn, FormLabel as Vr, Checkbox as Lr, MenuItem as Fr, Grid as gr, IconButton as br, Paper as Ur, Slider as Hr, Snackbar as qr, Switch as Gr, AppBar as Wr, Toolbar as Xr, Drawer as Kr } from "@mui/material";
import * as Fe from "react";
import { useMemo as Sn, useState as Ae, useCallback as Xe, useRef as yn, useEffect as Ze } from "react";
import { offsetBook as Dn, FIRST_SCR_BOOK_NUM as Yr, offsetChapter as jn, FIRST_SCR_CHAPTER_NUM as Jr, getChaptersForBook as Zr, offsetVerse as zn, FIRST_SCR_VERSE_NUM as Qr } from "platform-bible-utils";
import et, { SelectColumn as nt } from "react-data-grid";
import rt, { ThemeContext as tt, internal_processStyles as ot } from "@mui/styled-engine";
function we({
  id: e,
  isDisabled: n = !1,
  className: r,
  onClick: t,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ S(
    jr,
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
function vn({
  id: e,
  title: n,
  isDisabled: r = !1,
  isClearable: t = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: a,
  options: u = [],
  className: c,
  value: s,
  onChange: l,
  onFocus: p,
  onBlur: d,
  getOptionLabel: v
}) {
  return /* @__PURE__ */ S(
    zr,
    {
      id: e,
      disablePortal: !0,
      disabled: r,
      disableClearable: !t,
      fullWidth: i,
      options: u,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: s,
      onChange: l,
      onFocus: p,
      onBlur: d,
      getOptionLabel: v,
      renderInput: (b) => /* @__PURE__ */ S(
        mr,
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
function sa({
  startChapter: e,
  endChapter: n,
  handleSelectStartChapter: r,
  handleSelectEndChapter: t,
  isDisabled: o,
  chapterCount: i
}) {
  const a = Sn(
    () => Array.from({ length: i }, (s, l) => l + 1),
    [i]
  ), u = (s, l) => {
    r(l), l > n && t(l);
  }, c = (s, l) => {
    t(l), l < e && r(l);
  };
  return /* @__PURE__ */ Be(Dr, { children: [
    /* @__PURE__ */ S(
      Bn,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ S(
          vn,
          {
            onChange: (s, l) => u(s, l),
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
      Bn,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ S(
          vn,
          {
            onChange: (s, l) => c(s, l),
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
var Ne = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Ne || {});
function it({
  id: e,
  isChecked: n,
  labelText: r = "",
  labelPosition: t = Ne.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: u = !1,
  className: c,
  onChange: s
}) {
  const l = /* @__PURE__ */ S(
    Lr,
    {
      id: e,
      checked: n,
      indeterminate: o,
      defaultChecked: i,
      disabled: a,
      className: `papi-checkbox ${u ? "error" : ""} ${c ?? ""}`,
      onChange: s
    }
  );
  let p;
  if (r) {
    const d = t === Ne.Before || t === Ne.Above, v = /* @__PURE__ */ S("span", { className: `papi-checkbox-label ${u ? "error" : ""} ${c ?? ""}`, children: r }), b = t === Ne.Before || t === Ne.After, h = b ? v : /* @__PURE__ */ S("div", { children: v }), f = b ? l : /* @__PURE__ */ S("div", { children: l });
    p = /* @__PURE__ */ Be(
      Vr,
      {
        className: `papi-checkbox ${t.toString()}`,
        disabled: a,
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
function at(e) {
  const {
    onClick: n,
    name: r,
    hasAutoFocus: t = !1,
    className: o,
    isDense: i = !0,
    hasDisabledGutters: a = !1,
    hasDivider: u = !1,
    focusVisibleClassName: c,
    id: s,
    children: l
  } = e;
  return /* @__PURE__ */ S(
    Fr,
    {
      autoFocus: t,
      className: o,
      dense: i,
      disableGutters: a,
      divider: u,
      focusVisibleClassName: c,
      onClick: n,
      id: s,
      children: r || l
    }
  );
}
function st({ commandHandler: e, name: n, className: r, items: t, id: o }) {
  return /* @__PURE__ */ Be(gr, { id: o, item: !0, xs: "auto", className: `papi-menu-column ${r ?? ""}`, children: [
    /* @__PURE__ */ S("h3", { className: `papi-menu ${r ?? ""}`, children: n }),
    t.map((i, a) => /* @__PURE__ */ S(
      at,
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
function ct({ commandHandler: e, className: n, columns: r, id: t }) {
  return /* @__PURE__ */ S(
    gr,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${n ?? ""}`,
      columns: r.length,
      id: t,
      children: r.map((o, i) => /* @__PURE__ */ S(
        st,
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
function ca({
  id: e,
  label: n,
  isDisabled: r = !1,
  tooltip: t,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: a = "medium",
  className: u,
  onClick: c,
  children: s
}) {
  return /* @__PURE__ */ S(
    br,
    {
      id: e,
      disabled: r,
      edge: i,
      size: a,
      "aria-label": n,
      title: o ? void 0 : t ?? n,
      className: `papi-icon-button ${u ?? ""}`,
      onClick: c,
      children: s
    }
  );
}
var lt = Object.defineProperty, ut = (e, n, r) => n in e ? lt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, N = (e, n, r) => (ut(e, typeof n != "symbol" ? n + "" : n, r), r);
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
], En = [
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
], yr = [
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
], Vn = xt();
function De(e, n = !0) {
  return n && (e = e.toUpperCase()), e in Vn ? Vn[e] : 0;
}
function wn(e) {
  return De(e) > 0;
}
function dt(e) {
  const n = typeof e == "string" ? De(e) : e;
  return n >= 40 && n <= 66;
}
function ft(e) {
  return (typeof e == "string" ? De(e) : e) <= 39;
}
function vr(e) {
  return e <= 66;
}
function pt(e) {
  const n = typeof e == "string" ? De(e) : e;
  return Sr(n) && !vr(n);
}
function* ht() {
  for (let e = 1; e <= ke.length; e++)
    yield e;
}
const mt = 1, xr = ke.length;
function gt() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Tn(e, n = "***") {
  const r = e - 1;
  return r < 0 || r >= ke.length ? n : ke[r];
}
function kr(e) {
  return e <= 0 || e > xr ? "******" : yr[e - 1];
}
function bt(e) {
  return kr(De(e));
}
function Sr(e) {
  const n = typeof e == "number" ? Tn(e) : e;
  return wn(n) && !En.includes(n);
}
function yt(e) {
  const n = typeof e == "number" ? Tn(e) : e;
  return wn(n) && En.includes(n);
}
function vt(e) {
  return yr[e - 1].includes("*obsolete*");
}
function xt() {
  const e = {};
  for (let n = 0; n < ke.length; n++)
    e[ke[n]] = n + 1;
  return e;
}
const pe = {
  allBookIds: ke,
  nonCanonicalIds: En,
  bookIdToNumber: De,
  isBookIdValid: wn,
  isBookNT: dt,
  isBookOT: ft,
  isBookOTNT: vr,
  isBookDC: pt,
  allBookNumbers: ht,
  firstBook: mt,
  lastBook: xr,
  extraBooks: gt,
  bookNumberToId: Tn,
  bookNumberToEnglishName: kr,
  bookIdToEnglishName: bt,
  isCanonical: Sr,
  isExtraMaterial: yt,
  isObsolete: vt
};
var be = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(be || {});
const xe = class {
  // private versInfo: Versification;
  constructor(e) {
    if (N(this, "name"), N(this, "fullPath"), N(this, "isPresent"), N(this, "hasVerseSegments"), N(this, "isCustomized"), N(this, "baseVersification"), N(this, "scriptureBooks"), N(this, "_type"), e != null)
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
N(oe, "Original", new xe(be.Original)), N(oe, "Septuagint", new xe(be.Septuagint)), N(oe, "Vulgate", new xe(be.Vulgate)), N(oe, "English", new xe(be.English)), N(oe, "RussianProtestant", new xe(be.RussianProtestant)), N(oe, "RussianOrthodox", new xe(be.RussianOrthodox));
function Ln(e, n) {
  const r = n[0];
  for (let t = 1; t < n.length; t++)
    e = e.split(n[t]).join(r);
  return e.split(r);
}
var Er = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Er || {});
const $ = class {
  constructor(n, r, t, o) {
    if (N(this, "firstChapter"), N(this, "lastChapter"), N(this, "lastVerse"), N(this, "hasSegmentsDefined"), N(this, "text"), N(this, "BBBCCCVVVS"), N(this, "longHashCode"), N(this, "versification"), N(this, "rtlMark", "‏"), N(this, "_bookNum", 0), N(this, "_chapterNum", 0), N(this, "_verseNum", 0), N(this, "_verse"), t == null && o == null)
      if (n != null && typeof n == "string") {
        const i = n, a = r != null && r instanceof oe ? r : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (n != null && typeof n == "number") {
        const i = r != null && r instanceof oe ? r : void 0;
        this.setEmpty(i), this._verseNum = n % $.chapterDigitShifter, this._chapterNum = Math.floor(
          n % $.bookDigitShifter / $.chapterDigitShifter
        ), this._bookNum = Math.floor(n / $.bookDigitShifter);
      } else if (r == null)
        if (n != null && n instanceof $) {
          const i = n;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (n == null)
            return;
          const i = n instanceof oe ? n : $.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (n != null && r != null && t != null)
      if (typeof n == "string" && typeof r == "string" && typeof t == "string")
        this.setEmpty(o), this.updateInternal(n, r, t);
      else if (typeof n == "number" && typeof r == "number" && typeof t == "number")
        this._bookNum = n, this._chapterNum = r, this._verseNum = t, this.versification = o ?? $.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(n, r = $.defaultVersification) {
    const t = new $(r);
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
      return r = $.parse(n), { success: !0, verseRef: r };
    } catch (t) {
      if (t instanceof je)
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
  static getBBBCCCVVV(n, r, t) {
    return n % $.bcvMaxValue * $.bookDigitShifter + (r >= 0 ? r % $.bcvMaxValue * $.chapterDigitShifter : 0) + (t >= 0 ? t % $.bcvMaxValue : 0);
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
    return pe.bookNumberToId(this.bookNum, "");
  }
  set book(n) {
    this.bookNum = pe.bookIdToNumber(n);
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
    const { success: r, vNum: t } = $.tryGetVerseNum(n);
    this._verse = r ? void 0 : n.replace(this.rtlMark, ""), this._verseNum = t, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = $.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(n) {
    if (n <= 0 || n > pe.lastBook)
      throw new je(
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
    this.versification = this.versification != null ? new oe(n) : void 0;
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
  parse(n) {
    if (n = n.replace(this.rtlMark, ""), n.includes("/")) {
      const i = n.split("/");
      if (n = i[0], i.length > 1)
        try {
          const a = +i[1].trim();
          this.versification = new oe(be[a]);
        } catch {
          throw new je("Invalid reference : " + n);
        }
    }
    const r = n.trim().split(" ");
    if (r.length !== 2)
      throw new je("Invalid reference : " + n);
    const t = r[1].split(":"), o = +t[0];
    if (t.length !== 2 || pe.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !$.isVerseParseable(t[1]))
      throw new je("Invalid reference : " + n);
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
  allVerses(n = !1, r = $.verseRangeSeparators, t = $.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = Ln(this._verse, t);
    for (const a of i.map((u) => Ln(u, r))) {
      const u = this.clone();
      u.verse = a[0];
      const c = u.verseNum;
      if (o.push(u), a.length > 1) {
        const s = this.clone();
        if (s.verse = a[1], !n)
          for (let l = c + 1; l < s.verseNum; l++) {
            const p = new $(
              this._bookNum,
              this._chapterNum,
              l,
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > pe.lastBook ? 2 : 0;
  }
  setEmpty(n = $.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = n;
  }
  updateInternal(n, r, t) {
    this.bookNum = pe.bookIdToNumber(n), this.chapter = r, this.verse = t;
  }
};
let fe = $;
N(fe, "defaultVersification", oe.English), N(fe, "verseRangeSeparator", "-"), N(fe, "verseSequenceIndicator", ","), N(fe, "verseRangeSeparators", [$.verseRangeSeparator]), N(fe, "verseSequenceIndicators", [$.verseSequenceIndicator]), N(fe, "chapterDigitShifter", 1e3), N(fe, "bookDigitShifter", $.chapterDigitShifter * $.chapterDigitShifter), N(fe, "bcvMaxValue", $.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
N(fe, "ValidStatusType", Er);
class je extends Error {
}
function Ye({
  variant: e = "outlined",
  id: n,
  isDisabled: r = !1,
  hasError: t = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: a,
  placeholder: u,
  isRequired: c = !1,
  className: s,
  defaultValue: l,
  value: p,
  onChange: d,
  onFocus: v,
  onBlur: b
}) {
  return /* @__PURE__ */ S(
    mr,
    {
      variant: e,
      id: n,
      disabled: r,
      error: t,
      fullWidth: o,
      helperText: i,
      label: a,
      placeholder: u,
      required: c,
      className: `papi-textfield ${s ?? ""}`,
      defaultValue: l,
      value: p,
      onChange: d,
      onFocus: v,
      onBlur: b
    }
  );
}
let cn;
const ln = () => (cn || (cn = pe.allBookIds.map((e) => ({
  bookId: e,
  label: pe.bookIdToEnglishName(e)
}))), cn);
function ua({ scrRef: e, handleSubmit: n, id: r }) {
  const t = (c) => {
    n(c);
  }, o = (c, s) => {
    const p = { bookNum: pe.bookIdToNumber(s.bookId), chapterNum: 1, verseNum: 1 };
    t(p);
  }, i = (c) => {
    n({ ...e, chapterNum: +c.target.value });
  }, a = (c) => {
    n({ ...e, verseNum: +c.target.value });
  }, u = Sn(() => ln()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ Be("span", { id: r, children: [
    /* @__PURE__ */ S(
      vn,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: u,
        options: ln(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ S(
      we,
      {
        onClick: () => t(Dn(e, -1)),
        isDisabled: e.bookNum <= Yr,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(
      we,
      {
        onClick: () => t(Dn(e, 1)),
        isDisabled: e.bookNum >= ln().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ S(
      Ye,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ S(
      we,
      {
        onClick: () => n(jn(e, -1)),
        isDisabled: e.chapterNum <= Jr,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(
      we,
      {
        onClick: () => n(jn(e, 1)),
        isDisabled: e.chapterNum >= Zr(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ S(
      Ye,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ S(
      we,
      {
        onClick: () => n(zn(e, -1)),
        isDisabled: e.verseNum <= Qr,
        children: "<"
      }
    ),
    /* @__PURE__ */ S(we, { onClick: () => n(zn(e, 1)), children: ">" })
  ] });
}
function da({ onSearch: e, placeholder: n, isFullWidth: r }) {
  const [t, o] = Ae(""), i = (a) => {
    o(a), e(a);
  };
  return /* @__PURE__ */ S(Ur, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ S(
    Ye,
    {
      isFullWidth: r,
      className: "search-bar-input",
      placeholder: n,
      value: t,
      onChange: (a) => i(a.target.value)
    }
  ) });
}
function fa({
  id: e,
  isDisabled: n = !1,
  orientation: r = "horizontal",
  min: t = 0,
  max: o = 100,
  step: i = 1,
  showMarks: a = !1,
  defaultValue: u,
  value: c,
  valueLabelDisplay: s = "off",
  className: l,
  onChange: p,
  onChangeCommitted: d
}) {
  return /* @__PURE__ */ S(
    Hr,
    {
      id: e,
      disabled: n,
      orientation: r,
      min: t,
      max: o,
      step: i,
      marks: a,
      defaultValue: u,
      value: c,
      valueLabelDisplay: s,
      className: `papi-slider ${r} ${l ?? ""}`,
      onChange: p,
      onChangeCommitted: d
    }
  );
}
function pa({
  autoHideDuration: e = void 0,
  id: n,
  isOpen: r = !1,
  className: t,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: a,
  children: u
}) {
  const c = {
    action: (a == null ? void 0 : a.action) || u,
    message: a == null ? void 0 : a.message,
    className: t
  };
  return /* @__PURE__ */ S(
    qr,
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
function ha({
  id: e,
  isChecked: n,
  isDisabled: r = !1,
  hasError: t = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ S(
    Gr,
    {
      id: e,
      checked: n,
      disabled: r,
      className: `papi-switch ${t ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Fn({ onRowChange: e, row: n, column: r }) {
  const t = (o) => {
    e({ ...n, [r.key]: o.target.value });
  };
  return /* @__PURE__ */ S(Ye, { defaultValue: n[r.key], onChange: t });
}
const kt = ({ onChange: e, disabled: n, checked: r, ...t }) => /* @__PURE__ */ S(
  it,
  {
    ...t,
    isChecked: r,
    isDisabled: n,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function ma({
  columns: e,
  sortColumns: n,
  onSortColumnsChange: r,
  onColumnResize: t,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: a,
  defaultColumnSortable: u = !0,
  defaultColumnResizable: c = !0,
  rows: s,
  enableSelectColumn: l,
  selectColumnWidth: p = 50,
  rowKeyGetter: d,
  rowHeight: v = 35,
  headerRowHeight: b = 35,
  selectedRows: h,
  onSelectedRowsChange: f,
  onRowsChange: E,
  onCellClick: K,
  onCellDoubleClick: B,
  onCellContextMenu: R,
  onCellKeyDown: m,
  direction: Y = "ltr",
  enableVirtualization: re = !0,
  onCopy: se,
  onPaste: ie,
  onScroll: D,
  className: J,
  id: ce
}) {
  const le = Sn(() => {
    const Q = e.map((X) => typeof X.editable == "function" ? {
      ...X,
      editable: (ae) => !!X.editable(ae),
      renderEditCell: X.renderEditCell || Fn
    } : X.editable && !X.renderEditCell ? { ...X, renderEditCell: Fn } : X.renderEditCell && !X.editable ? { ...X, editable: !1 } : X);
    return l ? [{ ...nt, minWidth: p }, ...Q] : Q;
  }, [e, l, p]);
  return /* @__PURE__ */ S(
    et,
    {
      columns: le,
      defaultColumnOptions: {
        width: o,
        minWidth: i,
        maxWidth: a,
        sortable: u,
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
      onCellDoubleClick: B,
      onCellContextMenu: R,
      onCellKeyDown: m,
      direction: Y,
      enableVirtualization: re,
      onCopy: se,
      onPaste: ie,
      onScroll: D,
      renderers: { renderCheckbox: kt },
      className: J ?? "rdg-light",
      id: ce
    }
  );
}
function A() {
  return A = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var r = arguments[n];
      for (var t in r)
        Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
    }
    return e;
  }, A.apply(this, arguments);
}
function Re(e) {
  return e !== null && typeof e == "object" && e.constructor === Object;
}
function wr(e) {
  if (!Re(e))
    return e;
  const n = {};
  return Object.keys(e).forEach((r) => {
    n[r] = wr(e[r]);
  }), n;
}
function he(e, n, r = {
  clone: !0
}) {
  const t = r.clone ? A({}, e) : e;
  return Re(e) && Re(n) && Object.keys(n).forEach((o) => {
    o !== "__proto__" && (Re(n[o]) && o in e && Re(e[o]) ? t[o] = he(e[o], n[o], r) : r.clone ? t[o] = Re(n[o]) ? wr(n[o]) : n[o] : t[o] = n[o]);
  }), t;
}
function St(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var xn = { exports: {} }, We = { exports: {} }, z = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Un;
function Et() {
  if (Un)
    return z;
  Un = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, l = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, K = e ? Symbol.for("react.scope") : 60119;
  function B(m) {
    if (typeof m == "object" && m !== null) {
      var Y = m.$$typeof;
      switch (Y) {
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
                case u:
                case l:
                case b:
                case v:
                case a:
                  return m;
                default:
                  return Y;
              }
          }
        case r:
          return Y;
      }
    }
  }
  function R(m) {
    return B(m) === s;
  }
  return z.AsyncMode = c, z.ConcurrentMode = s, z.ContextConsumer = u, z.ContextProvider = a, z.Element = n, z.ForwardRef = l, z.Fragment = t, z.Lazy = b, z.Memo = v, z.Portal = r, z.Profiler = i, z.StrictMode = o, z.Suspense = p, z.isAsyncMode = function(m) {
    return R(m) || B(m) === c;
  }, z.isConcurrentMode = R, z.isContextConsumer = function(m) {
    return B(m) === u;
  }, z.isContextProvider = function(m) {
    return B(m) === a;
  }, z.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === n;
  }, z.isForwardRef = function(m) {
    return B(m) === l;
  }, z.isFragment = function(m) {
    return B(m) === t;
  }, z.isLazy = function(m) {
    return B(m) === b;
  }, z.isMemo = function(m) {
    return B(m) === v;
  }, z.isPortal = function(m) {
    return B(m) === r;
  }, z.isProfiler = function(m) {
    return B(m) === i;
  }, z.isStrictMode = function(m) {
    return B(m) === o;
  }, z.isSuspense = function(m) {
    return B(m) === p;
  }, z.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === t || m === s || m === i || m === o || m === p || m === d || typeof m == "object" && m !== null && (m.$$typeof === b || m.$$typeof === v || m.$$typeof === a || m.$$typeof === u || m.$$typeof === l || m.$$typeof === f || m.$$typeof === E || m.$$typeof === K || m.$$typeof === h);
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
var Hn;
function wt() {
  return Hn || (Hn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, l = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, K = e ? Symbol.for("react.scope") : 60119;
    function B(y) {
      return typeof y == "string" || typeof y == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      y === t || y === s || y === i || y === o || y === p || y === d || typeof y == "object" && y !== null && (y.$$typeof === b || y.$$typeof === v || y.$$typeof === a || y.$$typeof === u || y.$$typeof === l || y.$$typeof === f || y.$$typeof === E || y.$$typeof === K || y.$$typeof === h);
    }
    function R(y) {
      if (typeof y == "object" && y !== null) {
        var te = y.$$typeof;
        switch (te) {
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
                var Ee = k && k.$$typeof;
                switch (Ee) {
                  case u:
                  case l:
                  case b:
                  case v:
                  case a:
                    return Ee;
                  default:
                    return te;
                }
            }
          case r:
            return te;
        }
      }
    }
    var m = c, Y = s, re = u, se = a, ie = n, D = l, J = t, ce = b, le = v, Q = r, X = i, ee = o, ae = p, ve = !1;
    function Se(y) {
      return ve || (ve = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), g(y) || R(y) === c;
    }
    function g(y) {
      return R(y) === s;
    }
    function x(y) {
      return R(y) === u;
    }
    function O(y) {
      return R(y) === a;
    }
    function C(y) {
      return typeof y == "object" && y !== null && y.$$typeof === n;
    }
    function w(y) {
      return R(y) === l;
    }
    function P(y) {
      return R(y) === t;
    }
    function T(y) {
      return R(y) === b;
    }
    function _(y) {
      return R(y) === v;
    }
    function I(y) {
      return R(y) === r;
    }
    function j(y) {
      return R(y) === i;
    }
    function M(y) {
      return R(y) === o;
    }
    function Z(y) {
      return R(y) === p;
    }
    V.AsyncMode = m, V.ConcurrentMode = Y, V.ContextConsumer = re, V.ContextProvider = se, V.Element = ie, V.ForwardRef = D, V.Fragment = J, V.Lazy = ce, V.Memo = le, V.Portal = Q, V.Profiler = X, V.StrictMode = ee, V.Suspense = ae, V.isAsyncMode = Se, V.isConcurrentMode = g, V.isContextConsumer = x, V.isContextProvider = O, V.isElement = C, V.isForwardRef = w, V.isFragment = P, V.isLazy = T, V.isMemo = _, V.isPortal = I, V.isProfiler = j, V.isStrictMode = M, V.isSuspense = Z, V.isValidElementType = B, V.typeOf = R;
  }()), V;
}
var qn;
function Tr() {
  return qn || (qn = 1, process.env.NODE_ENV === "production" ? We.exports = Et() : We.exports = wt()), We.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var un, Gn;
function Tt() {
  if (Gn)
    return un;
  Gn = 1;
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
      for (var a = {}, u = 0; u < 10; u++)
        a["_" + String.fromCharCode(u)] = u;
      var c = Object.getOwnPropertyNames(a).map(function(l) {
        return a[l];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var s = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(l) {
        s[l] = l;
      }), Object.keys(Object.assign({}, s)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return un = o() ? Object.assign : function(i, a) {
    for (var u, c = t(i), s, l = 1; l < arguments.length; l++) {
      u = Object(arguments[l]);
      for (var p in u)
        n.call(u, p) && (c[p] = u[p]);
      if (e) {
        s = e(u);
        for (var d = 0; d < s.length; d++)
          r.call(u, s[d]) && (c[s[d]] = u[s[d]]);
      }
    }
    return c;
  }, un;
}
var dn, Wn;
function Cn() {
  if (Wn)
    return dn;
  Wn = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return dn = e, dn;
}
var fn, Xn;
function Cr() {
  return Xn || (Xn = 1, fn = Function.call.bind(Object.prototype.hasOwnProperty)), fn;
}
var pn, Kn;
function Ct() {
  if (Kn)
    return pn;
  Kn = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var n = Cn(), r = {}, t = Cr();
    e = function(i) {
      var a = "Warning: " + i;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {
      }
    };
  }
  function o(i, a, u, c, s) {
    if (process.env.NODE_ENV !== "production") {
      for (var l in i)
        if (t(i, l)) {
          var p;
          try {
            if (typeof i[l] != "function") {
              var d = Error(
                (c || "React class") + ": " + u + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            p = i[l](a, l, c, u, null, n);
          } catch (b) {
            p = b;
          }
          if (p && !(p instanceof Error) && e(
            (c || "React class") + ": type specification of " + u + " `" + l + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in r)) {
            r[p.message] = !0;
            var v = s ? s() : "";
            e(
              "Failed " + u + " type: " + p.message + (v ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, pn = o, pn;
}
var hn, Yn;
function _t() {
  if (Yn)
    return hn;
  Yn = 1;
  var e = Tr(), n = Tt(), r = Cn(), t = Cr(), o = Ct(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(u) {
    var c = "Warning: " + u;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function a() {
    return null;
  }
  return hn = function(u, c) {
    var s = typeof Symbol == "function" && Symbol.iterator, l = "@@iterator";
    function p(g) {
      var x = g && (s && g[s] || g[l]);
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
      arrayOf: B,
      element: R(),
      elementType: m(),
      instanceOf: Y,
      node: D(),
      objectOf: se,
      oneOf: re,
      oneOfType: ie,
      shape: ce,
      exact: le
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
        var x = {}, O = 0;
      function C(P, T, _, I, j, M, Z) {
        if (I = I || d, M = M || _, Z !== r) {
          if (c) {
            var y = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw y.name = "Invariant Violation", y;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var te = I + ":" + _;
            !x[te] && // Avoid spamming the console because they are often not actionable except for lib authors
            O < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + M + "` prop on `" + I + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), x[te] = !0, O++);
          }
        }
        return T[_] == null ? P ? T[_] === null ? new h("The " + j + " `" + M + "` is marked as required " + ("in `" + I + "`, but its value is `null`.")) : new h("The " + j + " `" + M + "` is marked as required in " + ("`" + I + "`, but its value is `undefined`.")) : null : g(T, _, I, j, M);
      }
      var w = C.bind(null, !1);
      return w.isRequired = C.bind(null, !0), w;
    }
    function E(g) {
      function x(O, C, w, P, T, _) {
        var I = O[C], j = ee(I);
        if (j !== g) {
          var M = ae(I);
          return new h(
            "Invalid " + P + " `" + T + "` of type " + ("`" + M + "` supplied to `" + w + "`, expected ") + ("`" + g + "`."),
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
    function B(g) {
      function x(O, C, w, P, T) {
        if (typeof g != "function")
          return new h("Property `" + T + "` of component `" + w + "` has invalid PropType notation inside arrayOf.");
        var _ = O[C];
        if (!Array.isArray(_)) {
          var I = ee(_);
          return new h("Invalid " + P + " `" + T + "` of type " + ("`" + I + "` supplied to `" + w + "`, expected an array."));
        }
        for (var j = 0; j < _.length; j++) {
          var M = g(_, j, w, P, T + "[" + j + "]", r);
          if (M instanceof Error)
            return M;
        }
        return null;
      }
      return f(x);
    }
    function R() {
      function g(x, O, C, w, P) {
        var T = x[O];
        if (!u(T)) {
          var _ = ee(T);
          return new h("Invalid " + w + " `" + P + "` of type " + ("`" + _ + "` supplied to `" + C + "`, expected a single ReactElement."));
        }
        return null;
      }
      return f(g);
    }
    function m() {
      function g(x, O, C, w, P) {
        var T = x[O];
        if (!e.isValidElementType(T)) {
          var _ = ee(T);
          return new h("Invalid " + w + " `" + P + "` of type " + ("`" + _ + "` supplied to `" + C + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return f(g);
    }
    function Y(g) {
      function x(O, C, w, P, T) {
        if (!(O[C] instanceof g)) {
          var _ = g.name || d, I = Se(O[C]);
          return new h("Invalid " + P + " `" + T + "` of type " + ("`" + I + "` supplied to `" + w + "`, expected ") + ("instance of `" + _ + "`."));
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
      function x(O, C, w, P, T) {
        for (var _ = O[C], I = 0; I < g.length; I++)
          if (b(_, g[I]))
            return null;
        var j = JSON.stringify(g, function(Z, y) {
          var te = ae(y);
          return te === "symbol" ? String(y) : y;
        });
        return new h("Invalid " + P + " `" + T + "` of value `" + String(_) + "` " + ("supplied to `" + w + "`, expected one of " + j + "."));
      }
      return f(x);
    }
    function se(g) {
      function x(O, C, w, P, T) {
        if (typeof g != "function")
          return new h("Property `" + T + "` of component `" + w + "` has invalid PropType notation inside objectOf.");
        var _ = O[C], I = ee(_);
        if (I !== "object")
          return new h("Invalid " + P + " `" + T + "` of type " + ("`" + I + "` supplied to `" + w + "`, expected an object."));
        for (var j in _)
          if (t(_, j)) {
            var M = g(_, j, w, P, T + "." + j, r);
            if (M instanceof Error)
              return M;
          }
        return null;
      }
      return f(x);
    }
    function ie(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var x = 0; x < g.length; x++) {
        var O = g[x];
        if (typeof O != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ve(O) + " at index " + x + "."
          ), a;
      }
      function C(w, P, T, _, I) {
        for (var j = [], M = 0; M < g.length; M++) {
          var Z = g[M], y = Z(w, P, T, _, I, r);
          if (y == null)
            return null;
          y.data && t(y.data, "expectedType") && j.push(y.data.expectedType);
        }
        var te = j.length > 0 ? ", expected one of type [" + j.join(", ") + "]" : "";
        return new h("Invalid " + _ + " `" + I + "` supplied to " + ("`" + T + "`" + te + "."));
      }
      return f(C);
    }
    function D() {
      function g(x, O, C, w, P) {
        return Q(x[O]) ? null : new h("Invalid " + w + " `" + P + "` supplied to " + ("`" + C + "`, expected a ReactNode."));
      }
      return f(g);
    }
    function J(g, x, O, C, w) {
      return new h(
        (g || "React class") + ": " + x + " type `" + O + "." + C + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + w + "`."
      );
    }
    function ce(g) {
      function x(O, C, w, P, T) {
        var _ = O[C], I = ee(_);
        if (I !== "object")
          return new h("Invalid " + P + " `" + T + "` of type `" + I + "` " + ("supplied to `" + w + "`, expected `object`."));
        for (var j in g) {
          var M = g[j];
          if (typeof M != "function")
            return J(w, P, T, j, ae(M));
          var Z = M(_, j, w, P, T + "." + j, r);
          if (Z)
            return Z;
        }
        return null;
      }
      return f(x);
    }
    function le(g) {
      function x(O, C, w, P, T) {
        var _ = O[C], I = ee(_);
        if (I !== "object")
          return new h("Invalid " + P + " `" + T + "` of type `" + I + "` " + ("supplied to `" + w + "`, expected `object`."));
        var j = n({}, O[C], g);
        for (var M in j) {
          var Z = g[M];
          if (t(g, M) && typeof Z != "function")
            return J(w, P, T, M, ae(Z));
          if (!Z)
            return new h(
              "Invalid " + P + " `" + T + "` key `" + M + "` supplied to `" + w + "`.\nBad object: " + JSON.stringify(O[C], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(g), null, "  ")
            );
          var y = Z(_, M, w, P, T + "." + M, r);
          if (y)
            return y;
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
          if (g === null || u(g))
            return !0;
          var x = p(g);
          if (x) {
            var O = x.call(g), C;
            if (x !== g.entries) {
              for (; !(C = O.next()).done; )
                if (!Q(C.value))
                  return !1;
            } else
              for (; !(C = O.next()).done; ) {
                var w = C.value;
                if (w && !Q(w[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function X(g, x) {
      return g === "symbol" ? !0 : x ? x["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && x instanceof Symbol : !1;
    }
    function ee(g) {
      var x = typeof g;
      return Array.isArray(g) ? "array" : g instanceof RegExp ? "object" : X(x, g) ? "symbol" : x;
    }
    function ae(g) {
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
      var x = ae(g);
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
      return !g.constructor || !g.constructor.name ? d : g.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, hn;
}
var mn, Jn;
function Ot() {
  if (Jn)
    return mn;
  Jn = 1;
  var e = Cn();
  function n() {
  }
  function r() {
  }
  return r.resetWarningCache = n, mn = function() {
    function t(a, u, c, s, l, p) {
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
  }, mn;
}
if (process.env.NODE_ENV !== "production") {
  var $t = Tr(), Nt = !0;
  xn.exports = _t()($t.isElement, Nt);
} else
  xn.exports = Ot()();
var Rt = xn.exports;
const H = /* @__PURE__ */ St(Rt);
function Ie(e) {
  let n = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    n += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + n + " for the full message.";
}
var kn = { exports: {} }, L = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zn;
function At() {
  if (Zn)
    return L;
  Zn = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), u = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), b;
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
            case l:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case u:
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
  return L.ContextConsumer = a, L.ContextProvider = i, L.Element = e, L.ForwardRef = c, L.Fragment = r, L.Lazy = d, L.Memo = p, L.Portal = n, L.Profiler = o, L.StrictMode = t, L.Suspense = s, L.SuspenseList = l, L.isAsyncMode = function() {
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
    return h(f) === l;
  }, L.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === r || f === o || f === t || f === s || f === l || f === v || typeof f == "object" && f !== null && (f.$$typeof === d || f.$$typeof === p || f.$$typeof === i || f.$$typeof === a || f.$$typeof === c || f.$$typeof === b || f.getModuleId !== void 0);
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
var Qn;
function Pt() {
  return Qn || (Qn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), u = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), b = !1, h = !1, f = !1, E = !1, K = !1, B;
    B = Symbol.for("react.module.reference");
    function R(k) {
      return !!(typeof k == "string" || typeof k == "function" || k === r || k === o || K || k === t || k === s || k === l || E || k === v || b || h || f || typeof k == "object" && k !== null && (k.$$typeof === d || k.$$typeof === p || k.$$typeof === i || k.$$typeof === a || k.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      k.$$typeof === B || k.getModuleId !== void 0));
    }
    function m(k) {
      if (typeof k == "object" && k !== null) {
        var Ee = k.$$typeof;
        switch (Ee) {
          case e:
            var Ge = k.type;
            switch (Ge) {
              case r:
              case o:
              case t:
              case s:
              case l:
                return Ge;
              default:
                var Mn = Ge && Ge.$$typeof;
                switch (Mn) {
                  case u:
                  case a:
                  case c:
                  case d:
                  case p:
                  case i:
                    return Mn;
                  default:
                    return Ee;
                }
            }
          case n:
            return Ee;
        }
      }
    }
    var Y = a, re = i, se = e, ie = c, D = r, J = d, ce = p, le = n, Q = o, X = t, ee = s, ae = l, ve = !1, Se = !1;
    function g(k) {
      return ve || (ve = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function x(k) {
      return Se || (Se = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function O(k) {
      return m(k) === a;
    }
    function C(k) {
      return m(k) === i;
    }
    function w(k) {
      return typeof k == "object" && k !== null && k.$$typeof === e;
    }
    function P(k) {
      return m(k) === c;
    }
    function T(k) {
      return m(k) === r;
    }
    function _(k) {
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
    function Z(k) {
      return m(k) === t;
    }
    function y(k) {
      return m(k) === s;
    }
    function te(k) {
      return m(k) === l;
    }
    F.ContextConsumer = Y, F.ContextProvider = re, F.Element = se, F.ForwardRef = ie, F.Fragment = D, F.Lazy = J, F.Memo = ce, F.Portal = le, F.Profiler = Q, F.StrictMode = X, F.Suspense = ee, F.SuspenseList = ae, F.isAsyncMode = g, F.isConcurrentMode = x, F.isContextConsumer = O, F.isContextProvider = C, F.isElement = w, F.isForwardRef = P, F.isFragment = T, F.isLazy = _, F.isMemo = I, F.isPortal = j, F.isProfiler = M, F.isStrictMode = Z, F.isSuspense = y, F.isSuspenseList = te, F.isValidElementType = R, F.typeOf = m;
  }()), F;
}
process.env.NODE_ENV === "production" ? kn.exports = At() : kn.exports = Pt();
var er = kn.exports;
const It = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Mt(e) {
  const n = `${e}`.match(It);
  return n && n[1] || "";
}
function _r(e, n = "") {
  return e.displayName || e.name || Mt(e) || n;
}
function nr(e, n, r) {
  const t = _r(n);
  return e.displayName || (t !== "" ? `${r}(${t})` : r);
}
function Bt(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return _r(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case er.ForwardRef:
          return nr(e, e.render, "ForwardRef");
        case er.Memo:
          return nr(e, e.type, "memo");
        default:
          return;
      }
  }
}
function de(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ie(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Or(e, n) {
  const r = A({}, n);
  return Object.keys(e).forEach((t) => {
    if (t.toString().match(/^(components|slots)$/))
      r[t] = A({}, e[t], r[t]);
    else if (t.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[t] || {}, i = n[t];
      r[t] = {}, !i || !Object.keys(i) ? r[t] = o : !o || !Object.keys(o) ? r[t] = i : (r[t] = A({}, i), Object.keys(o).forEach((a) => {
        r[t][a] = Or(o[a], i[a]);
      }));
    } else
      r[t] === void 0 && (r[t] = e[t]);
  }), r;
}
function Dt(e, n, r = void 0) {
  const t = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      t[o] = e[o].reduce((i, a) => {
        if (a) {
          const u = n(a);
          u !== "" && i.push(u), r && r[a] && i.push(r[a]);
        }
        return i;
      }, []).join(" ");
    }
  ), t;
}
const rr = (e) => e, jt = () => {
  let e = rr;
  return {
    configure(n) {
      e = n;
    },
    generate(n) {
      return e(n);
    },
    reset() {
      e = rr;
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
function _n(e, n, r = "Mui") {
  const t = Lt[n];
  return t ? `${r}-${t}` : `${Vt.generate(e)}-${n}`;
}
function Ft(e, n, r = "Mui") {
  const t = {};
  return n.forEach((o) => {
    t[o] = _n(e, o, r);
  }), t;
}
function ge(e, n) {
  if (e == null)
    return {};
  var r = {}, t = Object.keys(e), o, i;
  for (i = 0; i < t.length; i++)
    o = t[i], !(n.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function $r(e) {
  var n, r, t = "";
  if (typeof e == "string" || typeof e == "number")
    t += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (n = 0; n < e.length; n++)
        e[n] && (r = $r(e[n])) && (t && (t += " "), t += r);
    else
      for (n in e)
        e[n] && (t && (t += " "), t += n);
  return t;
}
function Ut() {
  for (var e, n, r = 0, t = ""; r < arguments.length; )
    (e = arguments[r++]) && (n = $r(e)) && (t && (t += " "), t += n);
  return t;
}
const Ht = ["values", "unit", "step"], qt = (e) => {
  const n = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return n.sort((r, t) => r.val - t.val), n.reduce((r, t) => A({}, r, {
    [t.key]: t.val
  }), {});
};
function Gt(e) {
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
  } = e, o = ge(e, Ht), i = qt(n), a = Object.keys(i);
  function u(d) {
    return `@media (min-width:${typeof n[d] == "number" ? n[d] : d}${r})`;
  }
  function c(d) {
    return `@media (max-width:${(typeof n[d] == "number" ? n[d] : d) - t / 100}${r})`;
  }
  function s(d, v) {
    const b = a.indexOf(v);
    return `@media (min-width:${typeof n[d] == "number" ? n[d] : d}${r}) and (max-width:${(b !== -1 && typeof n[a[b]] == "number" ? n[a[b]] : v) - t / 100}${r})`;
  }
  function l(d) {
    return a.indexOf(d) + 1 < a.length ? s(d, a[a.indexOf(d) + 1]) : u(d);
  }
  function p(d) {
    const v = a.indexOf(d);
    return v === 0 ? u(a[1]) : v === a.length - 1 ? c(a[v]) : s(d, a[a.indexOf(d) + 1]).replace("@media", "@media not all and");
  }
  return A({
    keys: a,
    values: i,
    up: u,
    down: c,
    between: s,
    only: l,
    not: p,
    unit: r
  }, o);
}
const Wt = {
  borderRadius: 4
}, Xt = Wt, Kt = process.env.NODE_ENV !== "production" ? H.oneOfType([H.number, H.string, H.object, H.array]) : {}, ye = Kt;
function Le(e, n) {
  return n ? he(e, n, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const On = {
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
}, tr = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${On[e]}px)`
};
function me(e, n, r) {
  const t = e.theme || {};
  if (Array.isArray(n)) {
    const i = t.breakpoints || tr;
    return n.reduce((a, u, c) => (a[i.up(i.keys[c])] = r(n[c]), a), {});
  }
  if (typeof n == "object") {
    const i = t.breakpoints || tr;
    return Object.keys(n).reduce((a, u) => {
      if (Object.keys(i.values || On).indexOf(u) !== -1) {
        const c = i.up(u);
        a[c] = r(n[u], u);
      } else {
        const c = u;
        a[c] = n[c];
      }
      return a;
    }, {});
  }
  return r(n);
}
function Yt(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((t, o) => {
    const i = e.up(o);
    return t[i] = {}, t;
  }, {})) || {};
}
function Jt(e, n) {
  return e.reduce((r, t) => {
    const o = r[t];
    return (!o || Object.keys(o).length === 0) && delete r[t], r;
  }, n);
}
function Qe(e, n, r = !0) {
  if (!n || typeof n != "string")
    return null;
  if (e && e.vars && r) {
    const t = `vars.${n}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (t != null)
      return t;
  }
  return n.split(".").reduce((t, o) => t && t[o] != null ? t[o] : null, e);
}
function Je(e, n, r, t = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || t : o = Qe(e, r) || t, n && (o = n(o, t, e)), o;
}
function U(e) {
  const {
    prop: n,
    cssProperty: r = e.prop,
    themeKey: t,
    transform: o
  } = e, i = (a) => {
    if (a[n] == null)
      return null;
    const u = a[n], c = a.theme, s = Qe(c, t) || {};
    return me(a, u, (p) => {
      let d = Je(s, o, p);
      return p === d && typeof p == "string" && (d = Je(s, o, `${n}${p === "default" ? "" : de(p)}`, p)), r === !1 ? d : {
        [r]: d
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [n]: ye
  } : {}, i.filterProps = [n], i;
}
function Zt(e) {
  const n = {};
  return (r) => (n[r] === void 0 && (n[r] = e(r)), n[r]);
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
}, or = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, no = Zt((e) => {
  if (e.length > 2)
    if (or[e])
      e = or[e];
    else
      return [e];
  const [n, r] = e.split(""), t = Qt[n], o = eo[r] || "";
  return Array.isArray(o) ? o.map((i) => t + i) : [t + o];
}), en = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], nn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], ro = [...en, ...nn];
function He(e, n, r, t) {
  var o;
  const i = (o = Qe(e, n, !1)) != null ? o : r;
  return typeof i == "number" ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && typeof a != "number" && console.error(`MUI: Expected ${t} argument to be a number or a string, got ${a}.`), i * a) : Array.isArray(i) ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))), i[a]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Nr(e) {
  return He(e, "spacing", 8, "spacing");
}
function qe(e, n) {
  if (typeof n == "string" || n == null)
    return n;
  const r = Math.abs(n), t = e(r);
  return n >= 0 ? t : typeof t == "number" ? -t : `-${t}`;
}
function to(e, n) {
  return (r) => e.reduce((t, o) => (t[o] = qe(n, r), t), {});
}
function oo(e, n, r, t) {
  if (n.indexOf(r) === -1)
    return null;
  const o = no(r), i = to(o, t), a = e[r];
  return me(e, a, i);
}
function Rr(e, n) {
  const r = Nr(e.theme);
  return Object.keys(e).map((t) => oo(e, n, t, r)).reduce(Le, {});
}
function G(e) {
  return Rr(e, en);
}
G.propTypes = process.env.NODE_ENV !== "production" ? en.reduce((e, n) => (e[n] = ye, e), {}) : {};
G.filterProps = en;
function W(e) {
  return Rr(e, nn);
}
W.propTypes = process.env.NODE_ENV !== "production" ? nn.reduce((e, n) => (e[n] = ye, e), {}) : {};
W.filterProps = nn;
process.env.NODE_ENV !== "production" && ro.reduce((e, n) => (e[n] = ye, e), {});
function io(e = 8) {
  if (e.mui)
    return e;
  const n = Nr({
    spacing: e
  }), r = (...t) => (process.env.NODE_ENV !== "production" && (t.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${t.length}`)), (t.length === 0 ? [1] : t).map((i) => {
    const a = n(i);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return r.mui = !0, r;
}
function rn(...e) {
  const n = e.reduce((t, o) => (o.filterProps.forEach((i) => {
    t[i] = o;
  }), t), {}), r = (t) => Object.keys(t).reduce((o, i) => n[i] ? Le(o, n[i](t)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((t, o) => Object.assign(t, o.propTypes), {}) : {}, r.filterProps = e.reduce((t, o) => t.concat(o.filterProps), []), r;
}
function ue(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
const ao = U({
  prop: "border",
  themeKey: "borders",
  transform: ue
}), so = U({
  prop: "borderTop",
  themeKey: "borders",
  transform: ue
}), co = U({
  prop: "borderRight",
  themeKey: "borders",
  transform: ue
}), lo = U({
  prop: "borderBottom",
  themeKey: "borders",
  transform: ue
}), uo = U({
  prop: "borderLeft",
  themeKey: "borders",
  transform: ue
}), fo = U({
  prop: "borderColor",
  themeKey: "palette"
}), po = U({
  prop: "borderTopColor",
  themeKey: "palette"
}), ho = U({
  prop: "borderRightColor",
  themeKey: "palette"
}), mo = U({
  prop: "borderBottomColor",
  themeKey: "palette"
}), go = U({
  prop: "borderLeftColor",
  themeKey: "palette"
}), tn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const n = He(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (t) => ({
      borderRadius: qe(n, t)
    });
    return me(e, e.borderRadius, r);
  }
  return null;
};
tn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ye
} : {};
tn.filterProps = ["borderRadius"];
rn(ao, so, co, lo, uo, fo, po, ho, mo, go, tn);
const on = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const n = He(e.theme, "spacing", 8, "gap"), r = (t) => ({
      gap: qe(n, t)
    });
    return me(e, e.gap, r);
  }
  return null;
};
on.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ye
} : {};
on.filterProps = ["gap"];
const an = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const n = He(e.theme, "spacing", 8, "columnGap"), r = (t) => ({
      columnGap: qe(n, t)
    });
    return me(e, e.columnGap, r);
  }
  return null;
};
an.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ye
} : {};
an.filterProps = ["columnGap"];
const sn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const n = He(e.theme, "spacing", 8, "rowGap"), r = (t) => ({
      rowGap: qe(n, t)
    });
    return me(e, e.rowGap, r);
  }
  return null;
};
sn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ye
} : {};
sn.filterProps = ["rowGap"];
const bo = U({
  prop: "gridColumn"
}), yo = U({
  prop: "gridRow"
}), vo = U({
  prop: "gridAutoFlow"
}), xo = U({
  prop: "gridAutoColumns"
}), ko = U({
  prop: "gridAutoRows"
}), So = U({
  prop: "gridTemplateColumns"
}), Eo = U({
  prop: "gridTemplateRows"
}), wo = U({
  prop: "gridTemplateAreas"
}), To = U({
  prop: "gridArea"
});
rn(on, an, sn, bo, yo, vo, xo, ko, So, Eo, wo, To);
function Pe(e, n) {
  return n === "grey" ? n : e;
}
const Co = U({
  prop: "color",
  themeKey: "palette",
  transform: Pe
}), _o = U({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Pe
}), Oo = U({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Pe
});
rn(Co, _o, Oo);
function ne(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const $o = U({
  prop: "width",
  transform: ne
}), $n = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const n = (r) => {
      var t;
      return {
        maxWidth: ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null ? void 0 : t[r]) || On[r] || ne(r)
      };
    };
    return me(e, e.maxWidth, n);
  }
  return null;
};
$n.filterProps = ["maxWidth"];
const No = U({
  prop: "minWidth",
  transform: ne
}), Ro = U({
  prop: "height",
  transform: ne
}), Ao = U({
  prop: "maxHeight",
  transform: ne
}), Po = U({
  prop: "minHeight",
  transform: ne
});
U({
  prop: "size",
  cssProperty: "width",
  transform: ne
});
U({
  prop: "size",
  cssProperty: "height",
  transform: ne
});
const Io = U({
  prop: "boxSizing"
});
rn($o, $n, No, Ro, Ao, Po, Io);
const Mo = {
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
    style: tn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Pe
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Pe
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Pe
  },
  // spacing
  p: {
    style: W
  },
  pt: {
    style: W
  },
  pr: {
    style: W
  },
  pb: {
    style: W
  },
  pl: {
    style: W
  },
  px: {
    style: W
  },
  py: {
    style: W
  },
  padding: {
    style: W
  },
  paddingTop: {
    style: W
  },
  paddingRight: {
    style: W
  },
  paddingBottom: {
    style: W
  },
  paddingLeft: {
    style: W
  },
  paddingX: {
    style: W
  },
  paddingY: {
    style: W
  },
  paddingInline: {
    style: W
  },
  paddingInlineStart: {
    style: W
  },
  paddingInlineEnd: {
    style: W
  },
  paddingBlock: {
    style: W
  },
  paddingBlockStart: {
    style: W
  },
  paddingBlockEnd: {
    style: W
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
    style: on
  },
  rowGap: {
    style: sn
  },
  columnGap: {
    style: an
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
    style: $n
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
}, Nn = Mo;
function Bo(...e) {
  const n = e.reduce((t, o) => t.concat(Object.keys(o)), []), r = new Set(n);
  return e.every((t) => r.size === Object.keys(t).length);
}
function Do(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function jo() {
  function e(r, t, o, i) {
    const a = {
      [r]: t,
      theme: o
    }, u = i[r];
    if (!u)
      return {
        [r]: t
      };
    const {
      cssProperty: c = r,
      themeKey: s,
      transform: l,
      style: p
    } = u;
    if (t == null)
      return null;
    if (s === "typography" && t === "inherit")
      return {
        [r]: t
      };
    const d = Qe(o, s) || {};
    return p ? p(a) : me(a, t, (b) => {
      let h = Je(d, l, b);
      return b === h && typeof b == "string" && (h = Je(d, l, `${r}${b === "default" ? "" : de(b)}`, b)), c === !1 ? h : {
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
    const a = (t = i.unstable_sxConfig) != null ? t : Nn;
    function u(c) {
      let s = c;
      if (typeof c == "function")
        s = c(i);
      else if (typeof c != "object")
        return c;
      if (!s)
        return null;
      const l = Yt(i.breakpoints), p = Object.keys(l);
      let d = l;
      return Object.keys(s).forEach((v) => {
        const b = Do(s[v], i);
        if (b != null)
          if (typeof b == "object")
            if (a[v])
              d = Le(d, e(v, b, i, a));
            else {
              const h = me({
                theme: i
              }, b, (f) => ({
                [v]: f
              }));
              Bo(h, b) ? d[v] = n({
                sx: b,
                theme: i
              }) : d = Le(d, h);
            }
          else
            d = Le(d, e(v, b, i, a));
      }), Jt(p, d);
    }
    return Array.isArray(o) ? o.map(u) : u(o);
  }
  return n;
}
const Ar = jo();
Ar.filterProps = ["sx"];
const Rn = Ar, zo = ["breakpoints", "palette", "spacing", "shape"];
function An(e = {}, ...n) {
  const {
    breakpoints: r = {},
    palette: t = {},
    spacing: o,
    shape: i = {}
  } = e, a = ge(e, zo), u = Gt(r), c = io(o);
  let s = he({
    breakpoints: u,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: A({
      mode: "light"
    }, t),
    spacing: c,
    shape: A({}, Xt, i)
  }, a);
  return s = n.reduce((l, p) => he(l, p), s), s.unstable_sxConfig = A({}, Nn, a == null ? void 0 : a.unstable_sxConfig), s.unstable_sx = function(p) {
    return Rn({
      sx: p,
      theme: this
    });
  }, s;
}
function Vo(e) {
  return Object.keys(e).length === 0;
}
function Lo(e = null) {
  const n = Fe.useContext(tt);
  return !n || Vo(n) ? e : n;
}
const Fo = An();
function Uo(e = Fo) {
  return Lo(e);
}
const Ho = ["variant"];
function ir(e) {
  return e.length === 0;
}
function Pr(e) {
  const {
    variant: n
  } = e, r = ge(e, Ho);
  let t = n || "";
  return Object.keys(r).sort().forEach((o) => {
    o === "color" ? t += ir(t) ? e[o] : de(e[o]) : t += `${ir(t) ? o : de(o)}${de(e[o].toString())}`;
  }), t;
}
const qo = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Go(e) {
  return Object.keys(e).length === 0;
}
function Wo(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const Xo = (e, n) => n.components && n.components[e] && n.components[e].styleOverrides ? n.components[e].styleOverrides : null, Ko = (e, n) => {
  let r = [];
  n && n.components && n.components[e] && n.components[e].variants && (r = n.components[e].variants);
  const t = {};
  return r.forEach((o) => {
    const i = Pr(o.props);
    t[i] = o.style;
  }), t;
}, Yo = (e, n, r, t) => {
  var o;
  const {
    ownerState: i = {}
  } = e, a = [], u = r == null || (o = r.components) == null || (o = o[t]) == null ? void 0 : o.variants;
  return u && u.forEach((c) => {
    let s = !0;
    Object.keys(c.props).forEach((l) => {
      i[l] !== c.props[l] && e[l] !== c.props[l] && (s = !1);
    }), s && a.push(n[Pr(c.props)]);
  }), a;
};
function Ke(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Jo = An(), ar = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function ze({
  defaultTheme: e,
  theme: n,
  themeId: r
}) {
  return Go(n) ? e : n[r] || n;
}
function Zo(e) {
  return e ? (n, r) => r[e] : null;
}
function Qo(e = {}) {
  const {
    themeId: n,
    defaultTheme: r = Jo,
    rootShouldForwardProp: t = Ke,
    slotShouldForwardProp: o = Ke
  } = e, i = (a) => Rn(A({}, a, {
    theme: ze(A({}, a, {
      defaultTheme: r,
      themeId: n
    }))
  }));
  return i.__mui_systemSx = !0, (a, u = {}) => {
    ot(a, (R) => R.filter((m) => !(m != null && m.__mui_systemSx)));
    const {
      name: c,
      slot: s,
      skipVariantsResolver: l,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = Zo(ar(s))
    } = u, v = ge(u, qo), b = l !== void 0 ? l : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      s && s !== "Root" && s !== "root" || !1
    ), h = p || !1;
    let f;
    process.env.NODE_ENV !== "production" && c && (f = `${c}-${ar(s || "Root")}`);
    let E = Ke;
    s === "Root" || s === "root" ? E = t : s ? E = o : Wo(a) && (E = void 0);
    const K = rt(a, A({
      shouldForwardProp: E,
      label: f
    }, v)), B = (R, ...m) => {
      const Y = m ? m.map((D) => typeof D == "function" && D.__emotion_real !== D ? (J) => D(A({}, J, {
        theme: ze(A({}, J, {
          defaultTheme: r,
          themeId: n
        }))
      })) : D) : [];
      let re = R;
      c && d && Y.push((D) => {
        const J = ze(A({}, D, {
          defaultTheme: r,
          themeId: n
        })), ce = Xo(c, J);
        if (ce) {
          const le = {};
          return Object.entries(ce).forEach(([Q, X]) => {
            le[Q] = typeof X == "function" ? X(A({}, D, {
              theme: J
            })) : X;
          }), d(D, le);
        }
        return null;
      }), c && !b && Y.push((D) => {
        const J = ze(A({}, D, {
          defaultTheme: r,
          themeId: n
        }));
        return Yo(D, Ko(c, J), J, c);
      }), h || Y.push(i);
      const se = Y.length - m.length;
      if (Array.isArray(R) && se > 0) {
        const D = new Array(se).fill("");
        re = [...R, ...D], re.raw = [...R.raw, ...D];
      } else
        typeof R == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        R.__emotion_real !== R && (re = (D) => R(A({}, D, {
          theme: ze(A({}, D, {
            defaultTheme: r,
            themeId: n
          }))
        })));
      const ie = K(re, ...Y);
      if (process.env.NODE_ENV !== "production") {
        let D;
        c && (D = `${c}${de(s || "")}`), D === void 0 && (D = `Styled(${Bt(a)})`), ie.displayName = D;
      }
      return a.muiName && (ie.muiName = a.muiName), ie;
    };
    return K.withConfig && (B.withConfig = K.withConfig), B;
  };
}
function ei(e) {
  const {
    theme: n,
    name: r,
    props: t
  } = e;
  return !n || !n.components || !n.components[r] || !n.components[r].defaultProps ? t : Or(n.components[r].defaultProps, t);
}
function ni({
  props: e,
  name: n,
  defaultTheme: r,
  themeId: t
}) {
  let o = Uo(r);
  return t && (o = o[t] || o), ei({
    theme: o,
    name: n,
    props: e
  });
}
function Ir(e, n = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < n || e > r) && console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`), Math.min(Math.max(n, e), r);
}
function ri(e) {
  e = e.slice(1);
  const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(n);
  return r && r[0].length === 1 && (r = r.map((t) => t + t)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((t, o) => o < 3 ? parseInt(t, 16) : Math.round(parseInt(t, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Me(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Me(ri(e));
  const n = e.indexOf("("), r = e.substring(0, n);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Ie(9, e));
  let t = e.substring(n + 1, e.length - 1), o;
  if (r === "color") {
    if (t = t.split(" "), o = t.shift(), t.length === 4 && t[3].charAt(0) === "/" && (t[3] = t[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Ie(10, o));
  } else
    t = t.split(",");
  return t = t.map((i) => parseFloat(i)), {
    type: r,
    values: t,
    colorSpace: o
  };
}
function Pn(e) {
  const {
    type: n,
    colorSpace: r
  } = e;
  let {
    values: t
  } = e;
  return n.indexOf("rgb") !== -1 ? t = t.map((o, i) => i < 3 ? parseInt(o, 10) : o) : n.indexOf("hsl") !== -1 && (t[1] = `${t[1]}%`, t[2] = `${t[2]}%`), n.indexOf("color") !== -1 ? t = `${r} ${t.join(" ")}` : t = `${t.join(", ")}`, `${n}(${t})`;
}
function ti(e) {
  e = Me(e);
  const {
    values: n
  } = e, r = n[0], t = n[1] / 100, o = n[2] / 100, i = t * Math.min(o, 1 - o), a = (s, l = (s + r / 30) % 12) => o - i * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  let u = "rgb";
  const c = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (u += "a", c.push(n[3])), Pn({
    type: u,
    values: c
  });
}
function sr(e) {
  e = Me(e);
  let n = e.type === "hsl" || e.type === "hsla" ? Me(ti(e)).values : e.values;
  return n = n.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3));
}
function cr(e, n) {
  const r = sr(e), t = sr(n);
  return (Math.max(r, t) + 0.05) / (Math.min(r, t) + 0.05);
}
function oi(e, n) {
  if (e = Me(e), n = Ir(n), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - n;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - n;
  return Pn(e);
}
function ii(e, n) {
  if (e = Me(e), n = Ir(n), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * n;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * n;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * n;
  return Pn(e);
}
function ai(e, n) {
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
  }, n);
}
const si = {
  black: "#000",
  white: "#fff"
}, Ue = si, ci = {
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
}, li = ci, ui = {
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
}, Te = ui, di = {
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
}, Ce = di, fi = {
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
}, Ve = fi, pi = {
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
}, _e = pi, hi = {
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
}, Oe = hi, mi = {
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
}, $e = mi, gi = ["mode", "contrastThreshold", "tonalOffset"], lr = {
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
}, gn = {
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
function ur(e, n, r, t) {
  const o = t.light || t, i = t.dark || t * 1.5;
  e[n] || (e.hasOwnProperty(r) ? e[n] = e[r] : n === "light" ? e.light = ii(e.main, o) : n === "dark" && (e.dark = oi(e.main, i)));
}
function bi(e = "light") {
  return e === "dark" ? {
    main: _e[200],
    light: _e[50],
    dark: _e[400]
  } : {
    main: _e[700],
    light: _e[400],
    dark: _e[800]
  };
}
function yi(e = "light") {
  return e === "dark" ? {
    main: Te[200],
    light: Te[50],
    dark: Te[400]
  } : {
    main: Te[500],
    light: Te[300],
    dark: Te[700]
  };
}
function vi(e = "light") {
  return e === "dark" ? {
    main: Ce[500],
    light: Ce[300],
    dark: Ce[700]
  } : {
    main: Ce[700],
    light: Ce[400],
    dark: Ce[800]
  };
}
function xi(e = "light") {
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
function ki(e = "light") {
  return e === "dark" ? {
    main: $e[400],
    light: $e[300],
    dark: $e[700]
  } : {
    main: $e[800],
    light: $e[500],
    dark: $e[900]
  };
}
function Si(e = "light") {
  return e === "dark" ? {
    main: Ve[400],
    light: Ve[300],
    dark: Ve[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Ve[500],
    dark: Ve[900]
  };
}
function Ei(e) {
  const {
    mode: n = "light",
    contrastThreshold: r = 3,
    tonalOffset: t = 0.2
  } = e, o = ge(e, gi), i = e.primary || bi(n), a = e.secondary || yi(n), u = e.error || vi(n), c = e.info || xi(n), s = e.success || ki(n), l = e.warning || Si(n);
  function p(h) {
    const f = cr(h, gn.text.primary) >= r ? gn.text.primary : lr.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = cr(h, f);
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
    darkShade: B = 700
  }) => {
    if (h = A({}, h), !h.main && h[E] && (h.main = h[E]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${f ? ` (${f})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : Ie(11, f ? ` (${f})` : "", E));
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
} });` : Ie(12, f ? ` (${f})` : "", JSON.stringify(h.main)));
    return ur(h, "light", K, t), ur(h, "dark", B, t), h.contrastText || (h.contrastText = p(h.main)), h;
  }, v = {
    dark: gn,
    light: lr
  };
  return process.env.NODE_ENV !== "production" && (v[n] || console.error(`MUI: The palette mode \`${n}\` is not supported.`)), he(A({
    // A collection of common colors.
    common: A({}, Ue),
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
      color: s,
      name: "success"
    }),
    // The grey colors.
    grey: li,
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
const wi = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Ti(e) {
  return Math.round(e * 1e5) / 1e5;
}
const dr = {
  textTransform: "uppercase"
}, fr = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ci(e, n) {
  const r = typeof n == "function" ? n(e) : n, {
    fontFamily: t = fr,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: a = 400,
    fontWeightMedium: u = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: s = 16,
    // Apply the CSS properties to all the variants.
    allVariants: l,
    pxToRem: p
  } = r, d = ge(r, wi);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof s != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const v = o / 14, b = p || ((E) => `${E / s * v}rem`), h = (E, K, B, R, m) => A({
    fontFamily: t,
    fontWeight: E,
    fontSize: b(K),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: B
  }, t === fr ? {
    letterSpacing: `${Ti(R / K)}em`
  } : {}, m, l), f = {
    h1: h(i, 96, 1.167, -1.5),
    h2: h(i, 60, 1.2, -0.5),
    h3: h(a, 48, 1.167, 0),
    h4: h(a, 34, 1.235, 0.25),
    h5: h(a, 24, 1.334, 0),
    h6: h(u, 20, 1.6, 0.15),
    subtitle1: h(a, 16, 1.75, 0.15),
    subtitle2: h(u, 14, 1.57, 0.1),
    body1: h(a, 16, 1.5, 0.15),
    body2: h(a, 14, 1.43, 0.15),
    button: h(u, 14, 1.75, 0.4, dr),
    caption: h(a, 12, 1.66, 0.4),
    overline: h(a, 12, 2.66, 1, dr),
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
    htmlFontSize: s,
    pxToRem: b,
    fontFamily: t,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: a,
    fontWeightMedium: u,
    fontWeightBold: c
  }, f), d, {
    clone: !1
    // No need to clone deep
  });
}
const _i = 0.2, Oi = 0.14, $i = 0.12;
function q(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${_i})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Oi})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${$i})`].join(",");
}
const Ni = ["none", q(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), q(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), q(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), q(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), q(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), q(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), q(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), q(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), q(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), q(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), q(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), q(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), q(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), q(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), q(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), q(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), q(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), q(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), q(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), q(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), q(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), q(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), q(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), q(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ri = Ni, Ai = ["duration", "easing", "delay"], Pi = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Ii = {
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
function pr(e) {
  return `${Math.round(e)}ms`;
}
function Mi(e) {
  if (!e)
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function Bi(e) {
  const n = A({}, Pi, e.easing), r = A({}, Ii, e.duration);
  return A({
    getAutoHeightDuration: Mi,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = r.standard,
        easing: u = n.easeInOut,
        delay: c = 0
      } = i, s = ge(i, Ai);
      if (process.env.NODE_ENV !== "production") {
        const l = (d) => typeof d == "string", p = (d) => !isNaN(parseFloat(d));
        !l(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !p(a) && !l(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), l(u) || console.error('MUI: Argument "easing" must be a string.'), !p(c) && !l(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(s).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(s).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((l) => `${l} ${typeof a == "string" ? a : pr(a)} ${u} ${typeof c == "string" ? c : pr(c)}`).join(",");
    }
  }, e, {
    easing: n,
    duration: r
  });
}
const Di = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, ji = Di, zi = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Vi(e = {}, ...n) {
  const {
    mixins: r = {},
    palette: t = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = ge(e, zi);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ie(18));
  const u = Ei(t), c = An(e);
  let s = he(c, {
    mixins: ai(c.breakpoints, r),
    palette: u,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ri.slice(),
    typography: Ci(u, i),
    transitions: Bi(o),
    zIndex: A({}, ji)
  });
  if (s = he(s, a), s = n.reduce((l, p) => he(l, p), s), process.env.NODE_ENV !== "production") {
    const l = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], p = (d, v) => {
      let b;
      for (b in d) {
        const h = d[b];
        if (l.indexOf(b) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const f = _n("", b);
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
  return s.unstable_sxConfig = A({}, Nn, a == null ? void 0 : a.unstable_sxConfig), s.unstable_sx = function(p) {
    return Rn({
      sx: p,
      theme: this
    });
  }, s;
}
const Li = Vi(), Mr = Li, Br = "$$material";
function Fi({
  props: e,
  name: n
}) {
  return ni({
    props: e,
    name: n,
    defaultTheme: Mr,
    themeId: Br
  });
}
const Ui = (e) => Ke(e) && e !== "classes", Hi = Qo({
  themeId: Br,
  defaultTheme: Mr,
  rootShouldForwardProp: Ui
}), qi = Hi;
function Gi(e) {
  return _n("MuiSvgIcon", e);
}
Ft("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Wi = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Xi = (e) => {
  const {
    color: n,
    fontSize: r,
    classes: t
  } = e, o = {
    root: ["root", n !== "inherit" && `color${de(n)}`, `fontSize${de(r)}`]
  };
  return Dt(o, Gi, t);
}, Ki = qi("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: r
    } = e;
    return [n.root, r.color !== "inherit" && n[`color${de(r.color)}`], n[`fontSize${de(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var r, t, o, i, a, u, c, s, l, p, d, v, b;
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
      medium: ((u = e.typography) == null || (c = u.pxToRem) == null ? void 0 : c.call(u, 24)) || "1.5rem",
      large: ((s = e.typography) == null || (l = s.pxToRem) == null ? void 0 : l.call(s, 35)) || "2.1875rem"
    }[n.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (p = (d = (e.vars || e).palette) == null || (d = d[n.color]) == null ? void 0 : d.main) != null ? p : {
      action: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.active,
      disabled: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.disabled,
      inherit: void 0
    }[n.color]
  };
}), In = /* @__PURE__ */ Fe.forwardRef(function(n, r) {
  const t = Fi({
    props: n,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: a = "inherit",
    component: u = "svg",
    fontSize: c = "medium",
    htmlColor: s,
    inheritViewBox: l = !1,
    titleAccess: p,
    viewBox: d = "0 0 24 24"
  } = t, v = ge(t, Wi), b = /* @__PURE__ */ Fe.isValidElement(o) && o.type === "svg", h = A({}, t, {
    color: a,
    component: u,
    fontSize: c,
    instanceFontSize: n.fontSize,
    inheritViewBox: l,
    viewBox: d,
    hasSvgAsChild: b
  }), f = {};
  l || (f.viewBox = d);
  const E = Xi(h);
  return /* @__PURE__ */ Be(Ki, A({
    as: u,
    className: Ut(E.root, i),
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
process.env.NODE_ENV !== "production" && (In.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Node passed into the SVG element.
   */
  children: H.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: H.object,
  /**
   * @ignore
   */
  className: H.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: H.oneOfType([H.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), H.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: H.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: H.oneOfType([H.oneOf(["inherit", "large", "medium", "small"]), H.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: H.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: H.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: H.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: H.oneOfType([H.arrayOf(H.oneOfType([H.func, H.object, H.bool])), H.func, H.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: H.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: H.string
});
In.muiName = "SvgIcon";
const hr = In;
function Yi(e, n) {
  function r(t, o) {
    return /* @__PURE__ */ S(hr, A({
      "data-testid": `${n}Icon`,
      ref: o
    }, t, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${n}Icon`), r.muiName = hr.muiName, /* @__PURE__ */ Fe.memo(/* @__PURE__ */ Fe.forwardRef(r));
}
const Ji = Yi(/* @__PURE__ */ S("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
}), "Menu");
function ga({
  menu: e,
  dataHandler: n,
  commandHandler: r,
  className: t,
  id: o,
  children: i
}) {
  const [a, u] = Ae(!1), [c, s] = Ae(!1), l = Xe(() => {
    a && u(!1), s(!1);
  }, [a]), p = Xe((E) => {
    E.stopPropagation(), u((K) => {
      const B = !K;
      return B && E.shiftKey ? s(!0) : B || s(!1), B;
    });
  }, []), d = yn(void 0), [v, b] = Ae(0);
  Ze(() => {
    a && d.current && b(d.current.clientHeight);
  }, [a]);
  const h = Xe(
    (E) => (l(), r(E)),
    [r, l]
  );
  let f = e;
  return !f && n && (f = n(c)), /* @__PURE__ */ S("div", { ref: d, style: { position: "relative" }, children: /* @__PURE__ */ S(Wr, { position: "static", id: o, children: /* @__PURE__ */ Be(Xr, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    f ? /* @__PURE__ */ S(
      br,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: p,
        children: /* @__PURE__ */ S(Ji, {})
      }
    ) : void 0,
    i ? /* @__PURE__ */ S("div", { className: "papi-menu-children", children: i }) : void 0,
    f ? /* @__PURE__ */ S(
      Kr,
      {
        className: `papi-menu-drawer ${t ?? ""}`,
        anchor: "left",
        variant: "persistent",
        open: a,
        onClose: l,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: v
          }
        },
        children: /* @__PURE__ */ S(ct, { commandHandler: h, columns: f.columns })
      }
    ) : void 0
  ] }) }) });
}
const ba = (e, n) => {
  Ze(() => {
    if (!e)
      return () => {
      };
    const r = e(n);
    return () => {
      r();
    };
  }, [e, n]);
};
function Zi(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Qi = (e, n, r = {}) => {
  const t = yn(n);
  t.current = n;
  const o = yn(r);
  o.current = Zi(o.current);
  const [i, a] = Ae(() => t.current), [u, c] = Ae(!0);
  return Ze(() => {
    let s = !0;
    return c(!!e), (async () => {
      if (e) {
        const l = await e();
        s && (a(() => l), c(!1));
      }
    })(), () => {
      s = !1, o.current.preserveValue || a(() => t.current);
    };
  }, [e]), [i, u];
}, bn = () => !1, ya = (e, n) => {
  const [r] = Qi(
    Xe(async () => {
      if (!e)
        return bn;
      const t = await Promise.resolve(e(n));
      return async () => t();
    }, [n, e]),
    bn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Ze(() => () => {
    r !== bn && r();
  }, [r]);
};
function ea(e, n = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), t = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), n === "top" && t ? r.insertBefore(o, t) : r.appendChild(o);
}
ea(`.papi-button {
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
.search-bar-paper {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.paratext {
  background-color: darkgreen;
  color: greenyellow;
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

`, "top");
export {
  we as Button,
  sa as ChapterRangeSelector,
  it as Checkbox,
  vn as ComboBox,
  ct as GridMenu,
  ca as IconButton,
  Ne as LabelPosition,
  at as MenuItem,
  ua as RefSelector,
  da as SearchBar,
  fa as Slider,
  pa as Snackbar,
  ha as Switch,
  ma as Table,
  Ye as TextField,
  ga as Toolbar,
  ba as useEvent,
  ya as useEventAsync,
  Qi as usePromise
};
//# sourceMappingURL=index.js.map
