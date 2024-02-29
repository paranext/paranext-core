import { jsx as k, jsxs as De, Fragment as Fr } from "react/jsx-runtime";
import * as Me from "react";
import { useMemo as Cn, useState as Pe, useCallback as Xe, useRef as xn, useEffect as nn } from "react";
import { Slot as Lr } from "@radix-ui/react-slot";
import { cva as Ur } from "class-variance-authority";
import Wr, { clsx as Gr } from "clsx";
import { twMerge as Hr } from "tailwind-merge";
import { Autocomplete as qr, TextField as vr, FormControlLabel as jn, FormLabel as Xr, Checkbox as Yr, MenuItem as Kr, Grid as wr, IconButton as xr, Paper as Jr, Slider as Zr, Snackbar as Qr, Switch as et, AppBar as nt, Toolbar as rt, Drawer as tt } from "@mui/material";
import { offsetBook as Vn, FIRST_SCR_BOOK_NUM as ot, offsetChapter as Fn, FIRST_SCR_CHAPTER_NUM as it, getChaptersForBook as at, offsetVerse as Ln, FIRST_SCR_VERSE_NUM as st } from "platform-bible-utils";
import ct, { SelectColumn as lt } from "react-data-grid";
import ut, { ThemeContext as dt, internal_processStyles as ft } from "@mui/styled-engine";
function pt(...e) {
  return Hr(Gr(e));
}
const ht = Ur(
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
), kr = Me.forwardRef(
  ({ className: e, variant: n, size: r, asChild: t = !1, ...o }, i) => /* @__PURE__ */ k(t ? Lr : "button", { className: pt(ht({ variant: n, size: r, className: e })), ref: i, ...o })
);
kr.displayName = "Button";
function Te({
  id: e,
  isDisabled: n = !1,
  className: r,
  onClick: t,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ k(
    kr,
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
function kn({
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
  return /* @__PURE__ */ k(
    qr,
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
      renderInput: (b) => /* @__PURE__ */ k(
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
function Sa({
  startChapter: e,
  endChapter: n,
  handleSelectStartChapter: r,
  handleSelectEndChapter: t,
  isDisabled: o,
  chapterCount: i
}) {
  const a = Cn(
    () => Array.from({ length: i }, (s, u) => u + 1),
    [i]
  ), l = (s, u) => {
    r(u), u > n && t(u);
  }, c = (s, u) => {
    t(u), u < e && r(u);
  };
  return /* @__PURE__ */ De(Fr, { children: [
    /* @__PURE__ */ k(
      jn,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ k(
          kn,
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
    /* @__PURE__ */ k(
      jn,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ k(
          kn,
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
function gt({
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
  const u = /* @__PURE__ */ k(
    Yr,
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
    const d = t === Ae.Before || t === Ae.Above, v = /* @__PURE__ */ k("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), b = t === Ae.Before || t === Ae.After, h = b ? v : /* @__PURE__ */ k("div", { children: v }), f = b ? u : /* @__PURE__ */ k("div", { children: u });
    p = /* @__PURE__ */ De(
      Xr,
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
function mt(e) {
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
  return /* @__PURE__ */ k(
    Kr,
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
function bt({ commandHandler: e, name: n, className: r, items: t, id: o }) {
  return /* @__PURE__ */ De(wr, { id: o, item: !0, xs: "auto", className: `papi-menu-column ${r ?? ""}`, children: [
    /* @__PURE__ */ k("h3", { className: `papi-menu ${r ?? ""}`, children: n }),
    t.map((i, a) => /* @__PURE__ */ k(
      mt,
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
function yt({ commandHandler: e, className: n, columns: r, id: t }) {
  return /* @__PURE__ */ k(
    wr,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${n ?? ""}`,
      columns: r.length,
      id: t,
      children: r.map((o, i) => /* @__PURE__ */ k(
        bt,
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
function Ea({
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
  return /* @__PURE__ */ k(
    xr,
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
var vt = Object.defineProperty, wt = (e, n, r) => n in e ? vt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, A = (e, n, r) => (wt(e, typeof n != "symbol" ? n + "" : n, r), r);
const Se = [
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
], Tn = [
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
], Un = Rt();
function je(e, n = !0) {
  return n && (e = e.toUpperCase()), e in Un ? Un[e] : 0;
}
function _n(e) {
  return je(e) > 0;
}
function xt(e) {
  const n = typeof e == "string" ? je(e) : e;
  return n >= 40 && n <= 66;
}
function kt(e) {
  return (typeof e == "string" ? je(e) : e) <= 39;
}
function Er(e) {
  return e <= 66;
}
function St(e) {
  const n = typeof e == "string" ? je(e) : e;
  return _r(n) && !Er(n);
}
function* Et() {
  for (let e = 1; e <= Se.length; e++)
    yield e;
}
const Ct = 1, Cr = Se.length;
function Tt() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function On(e, n = "***") {
  const r = e - 1;
  return r < 0 || r >= Se.length ? n : Se[r];
}
function Tr(e) {
  return e <= 0 || e > Cr ? "******" : Sr[e - 1];
}
function _t(e) {
  return Tr(je(e));
}
function _r(e) {
  const n = typeof e == "number" ? On(e) : e;
  return _n(n) && !Tn.includes(n);
}
function Ot(e) {
  const n = typeof e == "number" ? On(e) : e;
  return _n(n) && Tn.includes(n);
}
function $t(e) {
  return Sr[e - 1].includes("*obsolete*");
}
function Rt() {
  const e = {};
  for (let n = 0; n < Se.length; n++)
    e[Se[n]] = n + 1;
  return e;
}
const ge = {
  allBookIds: Se,
  nonCanonicalIds: Tn,
  bookIdToNumber: je,
  isBookIdValid: _n,
  isBookNT: xt,
  isBookOT: kt,
  isBookOTNT: Er,
  isBookDC: St,
  allBookNumbers: Et,
  firstBook: Ct,
  lastBook: Cr,
  extraBooks: Tt,
  bookNumberToId: On,
  bookNumberToEnglishName: Tr,
  bookIdToEnglishName: _t,
  isCanonical: _r,
  isExtraMaterial: Ot,
  isObsolete: $t
};
var ye = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(ye || {});
const ke = class {
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
let ae = ke;
A(ae, "Original", new ke(ye.Original)), A(ae, "Septuagint", new ke(ye.Septuagint)), A(ae, "Vulgate", new ke(ye.Vulgate)), A(ae, "English", new ke(ye.English)), A(ae, "RussianProtestant", new ke(ye.RussianProtestant)), A(ae, "RussianOrthodox", new ke(ye.RussianOrthodox));
function Wn(e, n) {
  const r = n[0];
  for (let t = 1; t < n.length; t++)
    e = e.split(n[t]).join(r);
  return e.split(r);
}
var Or = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Or || {});
const N = class {
  constructor(e, n, r, t) {
    if (A(this, "firstChapter"), A(this, "lastChapter"), A(this, "lastVerse"), A(this, "hasSegmentsDefined"), A(this, "text"), A(this, "BBBCCCVVVS"), A(this, "longHashCode"), A(this, "versification"), A(this, "rtlMark", "‏"), A(this, "_bookNum", 0), A(this, "_chapterNum", 0), A(this, "_verseNum", 0), A(this, "_verse"), r == null && t == null)
      if (e != null && typeof e == "string") {
        const o = e, i = n != null && n instanceof ae ? n : void 0;
        this.setEmpty(i), this.parse(o);
      } else if (e != null && typeof e == "number") {
        const o = n != null && n instanceof ae ? n : void 0;
        this.setEmpty(o), this._verseNum = e % N.chapterDigitShifter, this._chapterNum = Math.floor(
          e % N.bookDigitShifter / N.chapterDigitShifter
        ), this._bookNum = Math.floor(e / N.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof N) {
          const o = e;
          this._bookNum = o.bookNum, this._chapterNum = o.chapterNum, this._verseNum = o.verseNum, this._verse = o.verse, this.versification = o.versification;
        } else {
          if (e == null)
            return;
          const o = e instanceof ae ? e : N.defaultVersification;
          this.setEmpty(o);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(t), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = t ?? N.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(e, n = N.defaultVersification) {
    const r = new N(n);
    return r.parse(e), r;
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
    let n;
    try {
      return n = N.parse(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Ve)
        return n = new N(), { success: !1, verseRef: n };
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
  static getBBBCCCVVV(e, n, r) {
    return e % N.bcvMaxValue * N.bookDigitShifter + (n >= 0 ? n % N.bcvMaxValue * N.chapterDigitShifter : 0) + (r >= 0 ? r % N.bcvMaxValue : 0);
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let n;
    if (!e)
      return n = -1, { success: !0, vNum: n };
    n = 0;
    let r;
    for (let t = 0; t < e.length; t++) {
      if (r = e[t], r < "0" || r > "9")
        return t === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +r - +"0", n > N.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(N.verseRangeSeparator) || this._verse.includes(N.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ge.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = ge.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const n = +e;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: n, vNum: r } = N.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = N.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > ge.lastBook)
      throw new Ve(
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
    this.versification = this.versification != null ? new ae(e) : void 0;
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
    return this.validateVerse(N.verseRangeSeparators, N.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return N.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return N.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          const i = +o[1].trim();
          this.versification = new ae(ye[i]);
        } catch {
          throw new Ve("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Ve("Invalid reference : " + e);
    const r = n[1].split(":"), t = +r[0];
    if (r.length !== 2 || ge.bookIdToNumber(n[0]) === 0 || !Number.isInteger(t) || t < 0 || !N.isVerseParseable(r[1]))
      throw new Ve("Invalid reference : " + e);
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
    return new N(this);
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
  allVerses(e = !1, n = N.verseRangeSeparators, r = N.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const t = [], o = Wn(this._verse, r);
    for (const i of o.map((a) => Wn(a, n))) {
      const a = this.clone();
      a.verse = i[0];
      const l = a.verseNum;
      if (t.push(a), i.length > 1) {
        const c = this.clone();
        if (c.verse = i[1], !e)
          for (let s = l + 1; s < c.verseNum; s++) {
            const u = new N(
              this._bookNum,
              this._chapterNum,
              s,
              this.versification
            );
            this.isExcluded || t.push(u);
          }
        t.push(c);
      }
    }
    return t;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let r = 0;
    for (const t of this.allVerses(!0, e, n)) {
      const o = t.internalValid;
      if (o !== 0)
        return o;
      const i = t.BBBCCCVVV;
      if (r > i)
        return 3;
      if (r === i)
        return 4;
      r = i;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ge.lastBook ? 2 : 0;
  }
  setEmpty(e = N.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = ge.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
let he = N;
A(he, "defaultVersification", ae.English), A(he, "verseRangeSeparator", "-"), A(he, "verseSequenceIndicator", ","), A(he, "verseRangeSeparators", [N.verseRangeSeparator]), A(he, "verseSequenceIndicators", [N.verseSequenceIndicator]), A(he, "chapterDigitShifter", 1e3), A(he, "bookDigitShifter", N.chapterDigitShifter * N.chapterDigitShifter), A(he, "bcvMaxValue", N.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
A(he, "ValidStatusType", Or);
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
  return /* @__PURE__ */ k(
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
const fn = () => (dn || (dn = ge.allBookIds.map((e) => ({
  bookId: e,
  label: ge.bookIdToEnglishName(e)
}))), dn);
function Ca({ scrRef: e, handleSubmit: n, id: r }) {
  const t = (c) => {
    n(c);
  }, o = (c, s) => {
    const p = { bookNum: ge.bookIdToNumber(s.bookId), chapterNum: 1, verseNum: 1 };
    t(p);
  }, i = (c) => {
    n({ ...e, chapterNum: +c.target.value });
  }, a = (c) => {
    n({ ...e, verseNum: +c.target.value });
  }, l = Cn(() => fn()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ De("span", { id: r, children: [
    /* @__PURE__ */ k(
      kn,
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
    /* @__PURE__ */ k(
      Te,
      {
        onClick: () => t(Vn(e, -1)),
        isDisabled: e.bookNum <= ot,
        children: "<"
      }
    ),
    /* @__PURE__ */ k(
      Te,
      {
        onClick: () => t(Vn(e, 1)),
        isDisabled: e.bookNum >= fn().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ k(
      Je,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ k(
      Te,
      {
        onClick: () => n(Fn(e, -1)),
        isDisabled: e.chapterNum <= it,
        children: "<"
      }
    ),
    /* @__PURE__ */ k(
      Te,
      {
        onClick: () => n(Fn(e, 1)),
        isDisabled: e.chapterNum >= at(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ k(
      Je,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: a
      }
    ),
    /* @__PURE__ */ k(
      Te,
      {
        onClick: () => n(Ln(e, -1)),
        isDisabled: e.verseNum <= st,
        children: "<"
      }
    ),
    /* @__PURE__ */ k(Te, { onClick: () => n(Ln(e, 1)), children: ">" })
  ] });
}
function Ta({ onSearch: e, placeholder: n, isFullWidth: r }) {
  const [t, o] = Pe(""), i = (a) => {
    o(a), e(a);
  };
  return /* @__PURE__ */ k(Jr, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ k(
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
function _a({
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
  return /* @__PURE__ */ k(
    Zr,
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
function Oa({
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
  return /* @__PURE__ */ k(
    Qr,
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
function $a({
  id: e,
  isChecked: n,
  isDisabled: r = !1,
  hasError: t = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ k(
    et,
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
  return /* @__PURE__ */ k(Je, { defaultValue: n[r.key], onChange: t });
}
const Nt = ({ onChange: e, disabled: n, checked: r, ...t }) => /* @__PURE__ */ k(
  gt,
  {
    ...t,
    isChecked: r,
    isDisabled: n,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Ra({
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
  onRowsChange: S,
  onCellClick: K,
  onCellDoubleClick: z,
  onCellContextMenu: C,
  onCellKeyDown: g,
  direction: Q = "ltr",
  enableVirtualization: re = !0,
  onCopy: fe,
  onPaste: le,
  onScroll: T,
  className: G,
  id: Z
}) {
  const te = Cn(() => {
    const J = e.map((H) => typeof H.editable == "function" ? {
      ...H,
      editable: (ue) => !!H.editable(ue),
      renderEditCell: H.renderEditCell || Gn
    } : H.editable && !H.renderEditCell ? { ...H, renderEditCell: Gn } : H.renderEditCell && !H.editable ? { ...H, editable: !1 } : H);
    return u ? [{ ...lt, minWidth: p }, ...J] : J;
  }, [e, u, p]);
  return /* @__PURE__ */ k(
    ct,
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
      onRowsChange: S,
      onCellClick: K,
      onCellDoubleClick: z,
      onCellContextMenu: C,
      onCellKeyDown: g,
      direction: Q,
      enableVirtualization: re,
      onCopy: fe,
      onPaste: le,
      onScroll: T,
      renderers: { renderCheckbox: Nt },
      className: G ?? "rdg-light",
      id: Z
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
function $r(e) {
  if (!ve(e))
    return e;
  const n = {};
  return Object.keys(e).forEach((r) => {
    n[r] = $r(e[r]);
  }), n;
}
function de(e, n, r = {
  clone: !0
}) {
  const t = r.clone ? B({}, e) : e;
  return ve(e) && ve(n) && Object.keys(n).forEach((o) => {
    o !== "__proto__" && (ve(n[o]) && o in e && ve(e[o]) ? t[o] = de(e[o], n[o], r) : r.clone ? t[o] = ve(n[o]) ? $r(n[o]) : n[o] : t[o] = n[o]);
  }), t;
}
function At(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Sn = { exports: {} }, qe = { exports: {} }, j = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hn;
function Pt() {
  if (Hn)
    return j;
  Hn = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, K = e ? Symbol.for("react.scope") : 60119;
  function z(g) {
    if (typeof g == "object" && g !== null) {
      var Q = g.$$typeof;
      switch (Q) {
        case n:
          switch (g = g.type, g) {
            case c:
            case s:
            case t:
            case i:
            case o:
            case p:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case l:
                case u:
                case b:
                case v:
                case a:
                  return g;
                default:
                  return Q;
              }
          }
        case r:
          return Q;
      }
    }
  }
  function C(g) {
    return z(g) === s;
  }
  return j.AsyncMode = c, j.ConcurrentMode = s, j.ContextConsumer = l, j.ContextProvider = a, j.Element = n, j.ForwardRef = u, j.Fragment = t, j.Lazy = b, j.Memo = v, j.Portal = r, j.Profiler = i, j.StrictMode = o, j.Suspense = p, j.isAsyncMode = function(g) {
    return C(g) || z(g) === c;
  }, j.isConcurrentMode = C, j.isContextConsumer = function(g) {
    return z(g) === l;
  }, j.isContextProvider = function(g) {
    return z(g) === a;
  }, j.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === n;
  }, j.isForwardRef = function(g) {
    return z(g) === u;
  }, j.isFragment = function(g) {
    return z(g) === t;
  }, j.isLazy = function(g) {
    return z(g) === b;
  }, j.isMemo = function(g) {
    return z(g) === v;
  }, j.isPortal = function(g) {
    return z(g) === r;
  }, j.isProfiler = function(g) {
    return z(g) === i;
  }, j.isStrictMode = function(g) {
    return z(g) === o;
  }, j.isSuspense = function(g) {
    return z(g) === p;
  }, j.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === t || g === s || g === i || g === o || g === p || g === d || typeof g == "object" && g !== null && (g.$$typeof === b || g.$$typeof === v || g.$$typeof === a || g.$$typeof === l || g.$$typeof === u || g.$$typeof === f || g.$$typeof === S || g.$$typeof === K || g.$$typeof === h);
  }, j.typeOf = z, j;
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
var qn;
function It() {
  return qn || (qn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, t = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, d = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, b = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, f = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, K = e ? Symbol.for("react.scope") : 60119;
    function z(y) {
      return typeof y == "string" || typeof y == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      y === t || y === s || y === i || y === o || y === p || y === d || typeof y == "object" && y !== null && (y.$$typeof === b || y.$$typeof === v || y.$$typeof === a || y.$$typeof === l || y.$$typeof === u || y.$$typeof === f || y.$$typeof === S || y.$$typeof === K || y.$$typeof === h);
    }
    function C(y) {
      if (typeof y == "object" && y !== null) {
        var ie = y.$$typeof;
        switch (ie) {
          case n:
            var x = y.type;
            switch (x) {
              case c:
              case s:
              case t:
              case i:
              case o:
              case p:
                return x;
              default:
                var Ce = x && x.$$typeof;
                switch (Ce) {
                  case l:
                  case u:
                  case b:
                  case v:
                  case a:
                    return Ce;
                  default:
                    return ie;
                }
            }
          case r:
            return ie;
        }
      }
    }
    var g = c, Q = s, re = l, fe = a, le = n, T = u, G = t, Z = b, te = v, J = r, H = i, ne = o, ue = p, xe = !1;
    function Ee(y) {
      return xe || (xe = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), m(y) || C(y) === c;
    }
    function m(y) {
      return C(y) === s;
    }
    function w(y) {
      return C(y) === l;
    }
    function R(y) {
      return C(y) === a;
    }
    function O(y) {
      return typeof y == "object" && y !== null && y.$$typeof === n;
    }
    function E(y) {
      return C(y) === u;
    }
    function P(y) {
      return C(y) === t;
    }
    function _(y) {
      return C(y) === b;
    }
    function $(y) {
      return C(y) === v;
    }
    function I(y) {
      return C(y) === r;
    }
    function D(y) {
      return C(y) === i;
    }
    function M(y) {
      return C(y) === o;
    }
    function ee(y) {
      return C(y) === p;
    }
    V.AsyncMode = g, V.ConcurrentMode = Q, V.ContextConsumer = re, V.ContextProvider = fe, V.Element = le, V.ForwardRef = T, V.Fragment = G, V.Lazy = Z, V.Memo = te, V.Portal = J, V.Profiler = H, V.StrictMode = ne, V.Suspense = ue, V.isAsyncMode = Ee, V.isConcurrentMode = m, V.isContextConsumer = w, V.isContextProvider = R, V.isElement = O, V.isForwardRef = E, V.isFragment = P, V.isLazy = _, V.isMemo = $, V.isPortal = I, V.isProfiler = D, V.isStrictMode = M, V.isSuspense = ee, V.isValidElementType = z, V.typeOf = C;
  }()), V;
}
var Xn;
function Rr() {
  return Xn || (Xn = 1, process.env.NODE_ENV === "production" ? qe.exports = Pt() : qe.exports = It()), qe.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var pn, Yn;
function Mt() {
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
var gn, Jn;
function Nr() {
  return Jn || (Jn = 1, gn = Function.call.bind(Object.prototype.hasOwnProperty)), gn;
}
var mn, Zn;
function Bt() {
  if (Zn)
    return mn;
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
  }, mn = o, mn;
}
var bn, Qn;
function zt() {
  if (Qn)
    return bn;
  Qn = 1;
  var e = Rr(), n = Mt(), r = $n(), t = Nr(), o = Bt(), i = function() {
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
    function p(m) {
      var w = m && (s && m[s] || m[u]);
      if (typeof w == "function")
        return w;
    }
    var d = "<<anonymous>>", v = {
      array: S("array"),
      bigint: S("bigint"),
      bool: S("boolean"),
      func: S("function"),
      number: S("number"),
      object: S("object"),
      string: S("string"),
      symbol: S("symbol"),
      any: K(),
      arrayOf: z,
      element: C(),
      elementType: g(),
      instanceOf: Q,
      node: T(),
      objectOf: fe,
      oneOf: re,
      oneOfType: le,
      shape: Z,
      exact: te
    };
    function b(m, w) {
      return m === w ? m !== 0 || 1 / m === 1 / w : m !== m && w !== w;
    }
    function h(m, w) {
      this.message = m, this.data = w && typeof w == "object" ? w : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function f(m) {
      if (process.env.NODE_ENV !== "production")
        var w = {}, R = 0;
      function O(P, _, $, I, D, M, ee) {
        if (I = I || d, M = M || $, ee !== r) {
          if (c) {
            var y = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw y.name = "Invariant Violation", y;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ie = I + ":" + $;
            !w[ie] && // Avoid spamming the console because they are often not actionable except for lib authors
            R < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + M + "` prop on `" + I + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), w[ie] = !0, R++);
          }
        }
        return _[$] == null ? P ? _[$] === null ? new h("The " + D + " `" + M + "` is marked as required " + ("in `" + I + "`, but its value is `null`.")) : new h("The " + D + " `" + M + "` is marked as required in " + ("`" + I + "`, but its value is `undefined`.")) : null : m(_, $, I, D, M);
      }
      var E = O.bind(null, !1);
      return E.isRequired = O.bind(null, !0), E;
    }
    function S(m) {
      function w(R, O, E, P, _, $) {
        var I = R[O], D = ne(I);
        if (D !== m) {
          var M = ue(I);
          return new h(
            "Invalid " + P + " `" + _ + "` of type " + ("`" + M + "` supplied to `" + E + "`, expected ") + ("`" + m + "`."),
            { expectedType: m }
          );
        }
        return null;
      }
      return f(w);
    }
    function K() {
      return f(a);
    }
    function z(m) {
      function w(R, O, E, P, _) {
        if (typeof m != "function")
          return new h("Property `" + _ + "` of component `" + E + "` has invalid PropType notation inside arrayOf.");
        var $ = R[O];
        if (!Array.isArray($)) {
          var I = ne($);
          return new h("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + E + "`, expected an array."));
        }
        for (var D = 0; D < $.length; D++) {
          var M = m($, D, E, P, _ + "[" + D + "]", r);
          if (M instanceof Error)
            return M;
        }
        return null;
      }
      return f(w);
    }
    function C() {
      function m(w, R, O, E, P) {
        var _ = w[R];
        if (!l(_)) {
          var $ = ne(_);
          return new h("Invalid " + E + " `" + P + "` of type " + ("`" + $ + "` supplied to `" + O + "`, expected a single ReactElement."));
        }
        return null;
      }
      return f(m);
    }
    function g() {
      function m(w, R, O, E, P) {
        var _ = w[R];
        if (!e.isValidElementType(_)) {
          var $ = ne(_);
          return new h("Invalid " + E + " `" + P + "` of type " + ("`" + $ + "` supplied to `" + O + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return f(m);
    }
    function Q(m) {
      function w(R, O, E, P, _) {
        if (!(R[O] instanceof m)) {
          var $ = m.name || d, I = Ee(R[O]);
          return new h("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + E + "`, expected ") + ("instance of `" + $ + "`."));
        }
        return null;
      }
      return f(w);
    }
    function re(m) {
      if (!Array.isArray(m))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function w(R, O, E, P, _) {
        for (var $ = R[O], I = 0; I < m.length; I++)
          if (b($, m[I]))
            return null;
        var D = JSON.stringify(m, function(ee, y) {
          var ie = ue(y);
          return ie === "symbol" ? String(y) : y;
        });
        return new h("Invalid " + P + " `" + _ + "` of value `" + String($) + "` " + ("supplied to `" + E + "`, expected one of " + D + "."));
      }
      return f(w);
    }
    function fe(m) {
      function w(R, O, E, P, _) {
        if (typeof m != "function")
          return new h("Property `" + _ + "` of component `" + E + "` has invalid PropType notation inside objectOf.");
        var $ = R[O], I = ne($);
        if (I !== "object")
          return new h("Invalid " + P + " `" + _ + "` of type " + ("`" + I + "` supplied to `" + E + "`, expected an object."));
        for (var D in $)
          if (t($, D)) {
            var M = m($, D, E, P, _ + "." + D, r);
            if (M instanceof Error)
              return M;
          }
        return null;
      }
      return f(w);
    }
    function le(m) {
      if (!Array.isArray(m))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var w = 0; w < m.length; w++) {
        var R = m[w];
        if (typeof R != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + xe(R) + " at index " + w + "."
          ), a;
      }
      function O(E, P, _, $, I) {
        for (var D = [], M = 0; M < m.length; M++) {
          var ee = m[M], y = ee(E, P, _, $, I, r);
          if (y == null)
            return null;
          y.data && t(y.data, "expectedType") && D.push(y.data.expectedType);
        }
        var ie = D.length > 0 ? ", expected one of type [" + D.join(", ") + "]" : "";
        return new h("Invalid " + $ + " `" + I + "` supplied to " + ("`" + _ + "`" + ie + "."));
      }
      return f(O);
    }
    function T() {
      function m(w, R, O, E, P) {
        return J(w[R]) ? null : new h("Invalid " + E + " `" + P + "` supplied to " + ("`" + O + "`, expected a ReactNode."));
      }
      return f(m);
    }
    function G(m, w, R, O, E) {
      return new h(
        (m || "React class") + ": " + w + " type `" + R + "." + O + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + E + "`."
      );
    }
    function Z(m) {
      function w(R, O, E, P, _) {
        var $ = R[O], I = ne($);
        if (I !== "object")
          return new h("Invalid " + P + " `" + _ + "` of type `" + I + "` " + ("supplied to `" + E + "`, expected `object`."));
        for (var D in m) {
          var M = m[D];
          if (typeof M != "function")
            return G(E, P, _, D, ue(M));
          var ee = M($, D, E, P, _ + "." + D, r);
          if (ee)
            return ee;
        }
        return null;
      }
      return f(w);
    }
    function te(m) {
      function w(R, O, E, P, _) {
        var $ = R[O], I = ne($);
        if (I !== "object")
          return new h("Invalid " + P + " `" + _ + "` of type `" + I + "` " + ("supplied to `" + E + "`, expected `object`."));
        var D = n({}, R[O], m);
        for (var M in D) {
          var ee = m[M];
          if (t(m, M) && typeof ee != "function")
            return G(E, P, _, M, ue(ee));
          if (!ee)
            return new h(
              "Invalid " + P + " `" + _ + "` key `" + M + "` supplied to `" + E + "`.\nBad object: " + JSON.stringify(R[O], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(m), null, "  ")
            );
          var y = ee($, M, E, P, _ + "." + M, r);
          if (y)
            return y;
        }
        return null;
      }
      return f(w);
    }
    function J(m) {
      switch (typeof m) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !m;
        case "object":
          if (Array.isArray(m))
            return m.every(J);
          if (m === null || l(m))
            return !0;
          var w = p(m);
          if (w) {
            var R = w.call(m), O;
            if (w !== m.entries) {
              for (; !(O = R.next()).done; )
                if (!J(O.value))
                  return !1;
            } else
              for (; !(O = R.next()).done; ) {
                var E = O.value;
                if (E && !J(E[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function H(m, w) {
      return m === "symbol" ? !0 : w ? w["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && w instanceof Symbol : !1;
    }
    function ne(m) {
      var w = typeof m;
      return Array.isArray(m) ? "array" : m instanceof RegExp ? "object" : H(w, m) ? "symbol" : w;
    }
    function ue(m) {
      if (typeof m > "u" || m === null)
        return "" + m;
      var w = ne(m);
      if (w === "object") {
        if (m instanceof Date)
          return "date";
        if (m instanceof RegExp)
          return "regexp";
      }
      return w;
    }
    function xe(m) {
      var w = ue(m);
      switch (w) {
        case "array":
        case "object":
          return "an " + w;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + w;
        default:
          return w;
      }
    }
    function Ee(m) {
      return !m.constructor || !m.constructor.name ? d : m.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, bn;
}
var yn, er;
function Dt() {
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
  var jt = Rr(), Vt = !0;
  Sn.exports = zt()(jt.isElement, Vt);
} else
  Sn.exports = Dt()();
var Ft = Sn.exports;
const U = /* @__PURE__ */ At(Ft);
function Be(e) {
  let n = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    n += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + n + " for the full message.";
}
var En = { exports: {} }, F = {};
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
function Lt() {
  if (nr)
    return F;
  nr = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), b;
  b = Symbol.for("react.module.reference");
  function h(f) {
    if (typeof f == "object" && f !== null) {
      var S = f.$$typeof;
      switch (S) {
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
                  return S;
              }
          }
        case n:
          return S;
      }
    }
  }
  return F.ContextConsumer = a, F.ContextProvider = i, F.Element = e, F.ForwardRef = c, F.Fragment = r, F.Lazy = d, F.Memo = p, F.Portal = n, F.Profiler = o, F.StrictMode = t, F.Suspense = s, F.SuspenseList = u, F.isAsyncMode = function() {
    return !1;
  }, F.isConcurrentMode = function() {
    return !1;
  }, F.isContextConsumer = function(f) {
    return h(f) === a;
  }, F.isContextProvider = function(f) {
    return h(f) === i;
  }, F.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === e;
  }, F.isForwardRef = function(f) {
    return h(f) === c;
  }, F.isFragment = function(f) {
    return h(f) === r;
  }, F.isLazy = function(f) {
    return h(f) === d;
  }, F.isMemo = function(f) {
    return h(f) === p;
  }, F.isPortal = function(f) {
    return h(f) === n;
  }, F.isProfiler = function(f) {
    return h(f) === o;
  }, F.isStrictMode = function(f) {
    return h(f) === t;
  }, F.isSuspense = function(f) {
    return h(f) === s;
  }, F.isSuspenseList = function(f) {
    return h(f) === u;
  }, F.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === r || f === o || f === t || f === s || f === u || f === v || typeof f == "object" && f !== null && (f.$$typeof === d || f.$$typeof === p || f.$$typeof === i || f.$$typeof === a || f.$$typeof === c || f.$$typeof === b || f.getModuleId !== void 0);
  }, F.typeOf = h, F;
}
var L = {};
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
function Ut() {
  return rr || (rr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), t = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), b = !1, h = !1, f = !1, S = !1, K = !1, z;
    z = Symbol.for("react.module.reference");
    function C(x) {
      return !!(typeof x == "string" || typeof x == "function" || x === r || x === o || K || x === t || x === s || x === u || S || x === v || b || h || f || typeof x == "object" && x !== null && (x.$$typeof === d || x.$$typeof === p || x.$$typeof === i || x.$$typeof === a || x.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      x.$$typeof === z || x.getModuleId !== void 0));
    }
    function g(x) {
      if (typeof x == "object" && x !== null) {
        var Ce = x.$$typeof;
        switch (Ce) {
          case e:
            var He = x.type;
            switch (He) {
              case r:
              case o:
              case t:
              case s:
              case u:
                return He;
              default:
                var Dn = He && He.$$typeof;
                switch (Dn) {
                  case l:
                  case a:
                  case c:
                  case d:
                  case p:
                  case i:
                    return Dn;
                  default:
                    return Ce;
                }
            }
          case n:
            return Ce;
        }
      }
    }
    var Q = a, re = i, fe = e, le = c, T = r, G = d, Z = p, te = n, J = o, H = t, ne = s, ue = u, xe = !1, Ee = !1;
    function m(x) {
      return xe || (xe = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function w(x) {
      return Ee || (Ee = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function R(x) {
      return g(x) === a;
    }
    function O(x) {
      return g(x) === i;
    }
    function E(x) {
      return typeof x == "object" && x !== null && x.$$typeof === e;
    }
    function P(x) {
      return g(x) === c;
    }
    function _(x) {
      return g(x) === r;
    }
    function $(x) {
      return g(x) === d;
    }
    function I(x) {
      return g(x) === p;
    }
    function D(x) {
      return g(x) === n;
    }
    function M(x) {
      return g(x) === o;
    }
    function ee(x) {
      return g(x) === t;
    }
    function y(x) {
      return g(x) === s;
    }
    function ie(x) {
      return g(x) === u;
    }
    L.ContextConsumer = Q, L.ContextProvider = re, L.Element = fe, L.ForwardRef = le, L.Fragment = T, L.Lazy = G, L.Memo = Z, L.Portal = te, L.Profiler = J, L.StrictMode = H, L.Suspense = ne, L.SuspenseList = ue, L.isAsyncMode = m, L.isConcurrentMode = w, L.isContextConsumer = R, L.isContextProvider = O, L.isElement = E, L.isForwardRef = P, L.isFragment = _, L.isLazy = $, L.isMemo = I, L.isPortal = D, L.isProfiler = M, L.isStrictMode = ee, L.isSuspense = y, L.isSuspenseList = ie, L.isValidElementType = C, L.typeOf = g;
  }()), L;
}
process.env.NODE_ENV === "production" ? En.exports = Lt() : En.exports = Ut();
var tr = En.exports;
const Wt = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Gt(e) {
  const n = `${e}`.match(Wt);
  return n && n[1] || "";
}
function Ar(e, n = "") {
  return e.displayName || e.name || Gt(e) || n;
}
function or(e, n, r) {
  const t = Ar(n);
  return e.displayName || (t !== "" ? `${r}(${t})` : r);
}
function Ht(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Ar(e, "Component");
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
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Be(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Pr(e, n) {
  const r = B({}, n);
  return Object.keys(e).forEach((t) => {
    if (t.toString().match(/^(components|slots)$/))
      r[t] = B({}, e[t], r[t]);
    else if (t.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[t] || {}, i = n[t];
      r[t] = {}, !i || !Object.keys(i) ? r[t] = o : !o || !Object.keys(o) ? r[t] = i : (r[t] = B({}, i), Object.keys(o).forEach((a) => {
        r[t][a] = Pr(o[a], i[a]);
      }));
    } else
      r[t] === void 0 && (r[t] = e[t]);
  }), r;
}
function qt(e, n, r = void 0) {
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
const ir = (e) => e, Xt = () => {
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
}, Yt = Xt(), Kt = Yt, Jt = {
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
function Rn(e, n, r = "Mui") {
  const t = Jt[n];
  return t ? `${r}-${t}` : `${Kt.generate(e)}-${n}`;
}
function Zt(e, n, r = "Mui") {
  const t = {};
  return n.forEach((o) => {
    t[o] = Rn(e, o, r);
  }), t;
}
function Qt(e, n = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
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
const eo = ["values", "unit", "step"], no = (e) => {
  const n = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return n.sort((r, t) => r.val - t.val), n.reduce((r, t) => B({}, r, {
    [t.key]: t.val
  }), {});
};
function ro(e) {
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
  } = e, o = be(e, eo), i = no(n), a = Object.keys(i);
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
const to = {
  borderRadius: 4
}, oo = to, io = process.env.NODE_ENV !== "production" ? U.oneOfType([U.number, U.string, U.object, U.array]) : {}, we = io;
function Le(e, n) {
  return n ? de(e, n, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Nn = {
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
  up: (e) => `@media (min-width:${Nn[e]}px)`
};
function me(e, n, r) {
  const t = e.theme || {};
  if (Array.isArray(n)) {
    const i = t.breakpoints || ar;
    return n.reduce((a, l, c) => (a[i.up(i.keys[c])] = r(n[c]), a), {});
  }
  if (typeof n == "object") {
    const i = t.breakpoints || ar;
    return Object.keys(n).reduce((a, l) => {
      if (Object.keys(i.values || Nn).indexOf(l) !== -1) {
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
function ao(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((t, o) => {
    const i = e.up(o);
    return t[i] = {}, t;
  }, {})) || {};
}
function so(e, n) {
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
    return me(a, l, (p) => {
      let d = Ze(s, o, p);
      return p === d && typeof p == "string" && (d = Ze(s, o, `${n}${p === "default" ? "" : pe(p)}`, p)), r === !1 ? d : {
        [r]: d
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [n]: we
  } : {}, i.filterProps = [n], i;
}
function co(e) {
  const n = {};
  return (r) => (n[r] === void 0 && (n[r] = e(r)), n[r]);
}
const lo = {
  m: "margin",
  p: "padding"
}, uo = {
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
}, fo = co((e) => {
  if (e.length > 2)
    if (sr[e])
      e = sr[e];
    else
      return [e];
  const [n, r] = e.split(""), t = lo[n], o = uo[r] || "";
  return Array.isArray(o) ? o.map((i) => t + i) : [t + o];
}), tn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], on = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], po = [...tn, ...on];
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
function ho(e, n) {
  return (r) => e.reduce((t, o) => (t[o] = Ge(n, r), t), {});
}
function go(e, n, r, t) {
  if (n.indexOf(r) === -1)
    return null;
  const o = fo(r), i = ho(o, t), a = e[r];
  return me(e, a, i);
}
function Mr(e, n) {
  const r = Ir(e.theme);
  return Object.keys(e).map((t) => go(e, n, t, r)).reduce(Le, {});
}
function q(e) {
  return Mr(e, tn);
}
q.propTypes = process.env.NODE_ENV !== "production" ? tn.reduce((e, n) => (e[n] = we, e), {}) : {};
q.filterProps = tn;
function X(e) {
  return Mr(e, on);
}
X.propTypes = process.env.NODE_ENV !== "production" ? on.reduce((e, n) => (e[n] = we, e), {}) : {};
X.filterProps = on;
process.env.NODE_ENV !== "production" && po.reduce((e, n) => (e[n] = we, e), {});
function mo(e = 8) {
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
const bo = ce("border", se), yo = ce("borderTop", se), vo = ce("borderRight", se), wo = ce("borderBottom", se), xo = ce("borderLeft", se), ko = ce("borderColor"), So = ce("borderTopColor"), Eo = ce("borderRightColor"), Co = ce("borderBottomColor"), To = ce("borderLeftColor"), _o = ce("outline", se), Oo = ce("outlineColor"), sn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const n = We(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (t) => ({
      borderRadius: Ge(n, t)
    });
    return me(e, e.borderRadius, r);
  }
  return null;
};
sn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: we
} : {};
sn.filterProps = ["borderRadius"];
an(bo, yo, vo, wo, xo, ko, So, Eo, Co, To, sn, _o, Oo);
const cn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const n = We(e.theme, "spacing", 8, "gap"), r = (t) => ({
      gap: Ge(n, t)
    });
    return me(e, e.gap, r);
  }
  return null;
};
cn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: we
} : {};
cn.filterProps = ["gap"];
const ln = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const n = We(e.theme, "spacing", 8, "columnGap"), r = (t) => ({
      columnGap: Ge(n, t)
    });
    return me(e, e.columnGap, r);
  }
  return null;
};
ln.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: we
} : {};
ln.filterProps = ["columnGap"];
const un = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const n = We(e.theme, "spacing", 8, "rowGap"), r = (t) => ({
      rowGap: Ge(n, t)
    });
    return me(e, e.rowGap, r);
  }
  return null;
};
un.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: we
} : {};
un.filterProps = ["rowGap"];
const $o = Y({
  prop: "gridColumn"
}), Ro = Y({
  prop: "gridRow"
}), No = Y({
  prop: "gridAutoFlow"
}), Ao = Y({
  prop: "gridAutoColumns"
}), Po = Y({
  prop: "gridAutoRows"
}), Io = Y({
  prop: "gridTemplateColumns"
}), Mo = Y({
  prop: "gridTemplateRows"
}), Bo = Y({
  prop: "gridTemplateAreas"
}), zo = Y({
  prop: "gridArea"
});
an(cn, ln, un, $o, Ro, No, Ao, Po, Io, Mo, Bo, zo);
function Ie(e, n) {
  return n === "grey" ? n : e;
}
const Do = Y({
  prop: "color",
  themeKey: "palette",
  transform: Ie
}), jo = Y({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ie
}), Vo = Y({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ie
});
an(Do, jo, Vo);
function oe(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Fo = Y({
  prop: "width",
  transform: oe
}), An = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const n = (r) => {
      var t, o;
      const i = ((t = e.theme) == null || (t = t.breakpoints) == null || (t = t.values) == null ? void 0 : t[r]) || Nn[r];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: oe(r)
      };
    };
    return me(e, e.maxWidth, n);
  }
  return null;
};
An.filterProps = ["maxWidth"];
const Lo = Y({
  prop: "minWidth",
  transform: oe
}), Uo = Y({
  prop: "height",
  transform: oe
}), Wo = Y({
  prop: "maxHeight",
  transform: oe
}), Go = Y({
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
const Ho = Y({
  prop: "boxSizing"
});
an(Fo, An, Lo, Uo, Wo, Go, Ho);
const qo = {
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
    style: q
  },
  mt: {
    style: q
  },
  mr: {
    style: q
  },
  mb: {
    style: q
  },
  ml: {
    style: q
  },
  mx: {
    style: q
  },
  my: {
    style: q
  },
  margin: {
    style: q
  },
  marginTop: {
    style: q
  },
  marginRight: {
    style: q
  },
  marginBottom: {
    style: q
  },
  marginLeft: {
    style: q
  },
  marginX: {
    style: q
  },
  marginY: {
    style: q
  },
  marginInline: {
    style: q
  },
  marginInlineStart: {
    style: q
  },
  marginInlineEnd: {
    style: q
  },
  marginBlock: {
    style: q
  },
  marginBlockStart: {
    style: q
  },
  marginBlockEnd: {
    style: q
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
}, Pn = qo;
function Xo(...e) {
  const n = e.reduce((t, o) => t.concat(Object.keys(o)), []), r = new Set(n);
  return e.every((t) => r.size === Object.keys(t).length);
}
function Yo(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Ko() {
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
    return p ? p(a) : me(a, t, (b) => {
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
      const u = ao(i.breakpoints), p = Object.keys(u);
      let d = u;
      return Object.keys(s).forEach((v) => {
        const b = Yo(s[v], i);
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
              Xo(h, b) ? d[v] = n({
                sx: b,
                theme: i
              }) : d = Le(d, h);
            }
          else
            d = Le(d, e(v, b, i, a));
      }), so(p, d);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return n;
}
const Br = Ko();
Br.filterProps = ["sx"];
const In = Br, Jo = ["breakpoints", "palette", "spacing", "shape"];
function Mn(e = {}, ...n) {
  const {
    breakpoints: r = {},
    palette: t = {},
    spacing: o,
    shape: i = {}
  } = e, a = be(e, Jo), l = ro(r), c = mo(o);
  let s = de({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: B({
      mode: "light"
    }, t),
    spacing: c,
    shape: B({}, oo, i)
  }, a);
  return s = n.reduce((u, p) => de(u, p), s), s.unstable_sxConfig = B({}, Pn, a == null ? void 0 : a.unstable_sxConfig), s.unstable_sx = function(p) {
    return In({
      sx: p,
      theme: this
    });
  }, s;
}
function Zo(e) {
  return Object.keys(e).length === 0;
}
function Qo(e = null) {
  const n = Me.useContext(dt);
  return !n || Zo(n) ? e : n;
}
const ei = Mn();
function ni(e = ei) {
  return Qo(e);
}
const ri = ["variant"];
function cr(e) {
  return e.length === 0;
}
function zr(e) {
  const {
    variant: n
  } = e, r = be(e, ri);
  let t = n || "";
  return Object.keys(r).sort().forEach((o) => {
    o === "color" ? t += cr(t) ? e[o] : pe(e[o]) : t += `${cr(t) ? o : pe(o)}${pe(e[o].toString())}`;
  }), t;
}
const ti = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function oi(e) {
  return Object.keys(e).length === 0;
}
function ii(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
const ai = (e, n) => n.components && n.components[e] && n.components[e].styleOverrides ? n.components[e].styleOverrides : null, Qe = (e) => {
  let n = 0;
  const r = {};
  return e && e.forEach((t) => {
    let o = "";
    typeof t.props == "function" ? (o = `callback${n}`, n += 1) : o = zr(t.props), r[o] = t.style;
  }), r;
}, si = (e, n) => {
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
    l && (typeof a.props == "function" ? o.push(n[`callback${i}`]) : o.push(n[zr(a.props)])), typeof a.props == "function" && (i += 1);
  }), o;
}, ci = (e, n, r, t) => {
  var o;
  const i = r == null || (o = r.components) == null || (o = o[t]) == null ? void 0 : o.variants;
  return en(e, n, i);
};
function Ye(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const li = Mn(), lr = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Ke({
  defaultTheme: e,
  theme: n,
  themeId: r
}) {
  return oi(n) ? e : n[r] || n;
}
function ui(e) {
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
function di(e = {}) {
  const {
    themeId: n,
    defaultTheme: r = li,
    rootShouldForwardProp: t = Ye,
    slotShouldForwardProp: o = Ye
  } = e, i = (a) => In(B({}, a, {
    theme: Ke(B({}, a, {
      defaultTheme: r,
      themeId: n
    }))
  }));
  return i.__mui_systemSx = !0, (a, l = {}) => {
    ft(a, (C) => C.filter((g) => !(g != null && g.__mui_systemSx)));
    const {
      name: c,
      slot: s,
      skipVariantsResolver: u,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: d = ui(lr(s))
    } = l, v = be(l, ti), b = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      s && s !== "Root" && s !== "root" || !1
    ), h = p || !1;
    let f;
    process.env.NODE_ENV !== "production" && c && (f = `${c}-${lr(s || "Root")}`);
    let S = Ye;
    s === "Root" || s === "root" ? S = t : s ? S = o : ii(a) && (S = void 0);
    const K = ut(a, B({
      shouldForwardProp: S,
      label: f
    }, v)), z = (C, ...g) => {
      const Q = g ? g.map((T) => {
        if (typeof T == "function" && T.__emotion_real !== T)
          return (G) => ur({
            styledArg: T,
            props: G,
            defaultTheme: r,
            themeId: n
          });
        if (ve(T)) {
          let G = T, Z;
          return T && T.variants && (Z = T.variants, delete G.variants, G = (te) => {
            let J = T;
            return en(te, Qe(Z), Z).forEach((ne) => {
              J = de(J, ne);
            }), J;
          }), G;
        }
        return T;
      }) : [];
      let re = C;
      if (ve(C)) {
        let T;
        C && C.variants && (T = C.variants, delete re.variants, re = (G) => {
          let Z = C;
          return en(G, Qe(T), T).forEach((J) => {
            Z = de(Z, J);
          }), Z;
        });
      } else
        typeof C == "function" && // On the server Emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        C.__emotion_real !== C && (re = (T) => ur({
          styledArg: C,
          props: T,
          defaultTheme: r,
          themeId: n
        }));
      c && d && Q.push((T) => {
        const G = Ke(B({}, T, {
          defaultTheme: r,
          themeId: n
        })), Z = ai(c, G);
        if (Z) {
          const te = {};
          return Object.entries(Z).forEach(([J, H]) => {
            te[J] = typeof H == "function" ? H(B({}, T, {
              theme: G
            })) : H;
          }), d(T, te);
        }
        return null;
      }), c && !b && Q.push((T) => {
        const G = Ke(B({}, T, {
          defaultTheme: r,
          themeId: n
        }));
        return ci(T, si(c, G), G, c);
      }), h || Q.push(i);
      const fe = Q.length - g.length;
      if (Array.isArray(C) && fe > 0) {
        const T = new Array(fe).fill("");
        re = [...C, ...T], re.raw = [...C.raw, ...T];
      }
      const le = K(re, ...Q);
      if (process.env.NODE_ENV !== "production") {
        let T;
        c && (T = `${c}${pe(s || "")}`), T === void 0 && (T = `Styled(${Ht(a)})`), le.displayName = T;
      }
      return a.muiName && (le.muiName = a.muiName), le;
    };
    return K.withConfig && (z.withConfig = K.withConfig), z;
  };
}
function fi(e) {
  const {
    theme: n,
    name: r,
    props: t
  } = e;
  return !n || !n.components || !n.components[r] || !n.components[r].defaultProps ? t : Pr(n.components[r].defaultProps, t);
}
function pi({
  props: e,
  name: n,
  defaultTheme: r,
  themeId: t
}) {
  let o = ni(r);
  return t && (o = o[t] || o), fi({
    theme: o,
    name: n,
    props: e
  });
}
function Dr(e, n = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < n || e > r) && console.error(`MUI: The value provided ${e} is out of range [${n}, ${r}].`), Qt(e, n, r);
}
function hi(e) {
  e = e.slice(1);
  const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(n);
  return r && r[0].length === 1 && (r = r.map((t) => t + t)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((t, o) => o < 3 ? parseInt(t, 16) : Math.round(parseInt(t, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function ze(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return ze(hi(e));
  const n = e.indexOf("("), r = e.substring(0, n);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Be(9, e));
  let t = e.substring(n + 1, e.length - 1), o;
  if (r === "color") {
    if (t = t.split(" "), o = t.shift(), t.length === 4 && t[3].charAt(0) === "/" && (t[3] = t[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Be(10, o));
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
function gi(e) {
  e = ze(e);
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
  e = ze(e);
  let n = e.type === "hsl" || e.type === "hsla" ? ze(gi(e)).values : e.values;
  return n = n.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3));
}
function fr(e, n) {
  const r = dr(e), t = dr(n);
  return (Math.max(r, t) + 0.05) / (Math.min(r, t) + 0.05);
}
function mi(e, n) {
  if (e = ze(e), n = Dr(n), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - n;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - n;
  return Bn(e);
}
function bi(e, n) {
  if (e = ze(e), n = Dr(n), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * n;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * n;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * n;
  return Bn(e);
}
function yi(e, n) {
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
const vi = {
  black: "#000",
  white: "#fff"
}, Ue = vi, wi = {
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
}, xi = wi, ki = {
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
}, _e = ki, Si = {
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
}, Oe = Si, Ei = {
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
}, Fe = Ei, Ci = {
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
}, $e = Ci, Ti = {
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
}, Re = Ti, _i = {
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
}, Ne = _i, Oi = ["mode", "contrastThreshold", "tonalOffset"], pr = {
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
  e[n] || (e.hasOwnProperty(r) ? e[n] = e[r] : n === "light" ? e.light = bi(e.main, o) : n === "dark" && (e.dark = mi(e.main, i)));
}
function $i(e = "light") {
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
function Ri(e = "light") {
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
function Ni(e = "light") {
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
function Ai(e = "light") {
  return e === "dark" ? {
    main: Re[400],
    light: Re[300],
    dark: Re[700]
  } : {
    main: Re[700],
    light: Re[500],
    dark: Re[900]
  };
}
function Pi(e = "light") {
  return e === "dark" ? {
    main: Ne[400],
    light: Ne[300],
    dark: Ne[700]
  } : {
    main: Ne[800],
    light: Ne[500],
    dark: Ne[900]
  };
}
function Ii(e = "light") {
  return e === "dark" ? {
    main: Fe[400],
    light: Fe[300],
    dark: Fe[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Fe[500],
    dark: Fe[900]
  };
}
function Mi(e) {
  const {
    mode: n = "light",
    contrastThreshold: r = 3,
    tonalOffset: t = 0.2
  } = e, o = be(e, Oi), i = e.primary || $i(n), a = e.secondary || Ri(n), l = e.error || Ni(n), c = e.info || Ai(n), s = e.success || Pi(n), u = e.warning || Ii(n);
  function p(h) {
    const f = fr(h, vn.text.primary) >= r ? vn.text.primary : pr.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const S = fr(h, f);
      S < 3 && console.error([`MUI: The contrast ratio of ${S}:1 for ${f} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return f;
  }
  const d = ({
    color: h,
    name: f,
    mainShade: S = 500,
    lightShade: K = 300,
    darkShade: z = 700
  }) => {
    if (h = B({}, h), !h.main && h[S] && (h.main = h[S]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${f ? ` (${f})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${S}\` property.` : Be(11, f ? ` (${f})` : "", S));
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
} });` : Be(12, f ? ` (${f})` : "", JSON.stringify(h.main)));
    return hr(h, "light", K, t), hr(h, "dark", z, t), h.contrastText || (h.contrastText = p(h.main)), h;
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
    grey: xi,
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
const Bi = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function zi(e) {
  return Math.round(e * 1e5) / 1e5;
}
const gr = {
  textTransform: "uppercase"
}, mr = '"Roboto", "Helvetica", "Arial", sans-serif';
function Di(e, n) {
  const r = typeof n == "function" ? n(e) : n, {
    fontFamily: t = mr,
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
  } = r, d = be(r, Bi);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof s != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const v = o / 14, b = p || ((S) => `${S / s * v}rem`), h = (S, K, z, C, g) => B({
    fontFamily: t,
    fontWeight: S,
    fontSize: b(K),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: z
  }, t === mr ? {
    letterSpacing: `${zi(C / K)}em`
  } : {}, g, u), f = {
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
    button: h(l, 14, 1.75, 0.4, gr),
    caption: h(a, 12, 1.66, 0.4),
    overline: h(a, 12, 2.66, 1, gr),
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
const ji = 0.2, Vi = 0.14, Fi = 0.12;
function W(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${ji})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Vi})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Fi})`].join(",");
}
const Li = ["none", W(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), W(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), W(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), W(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), W(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), W(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), W(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), W(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), W(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), W(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), W(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), W(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), W(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), W(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), W(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), W(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), W(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), W(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), W(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), W(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), W(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), W(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), W(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), W(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ui = Li, Wi = ["duration", "easing", "delay"], Gi = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Hi = {
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
function qi(e) {
  if (!e)
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function Xi(e) {
  const n = B({}, Gi, e.easing), r = B({}, Hi, e.duration);
  return B({
    getAutoHeightDuration: qi,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = r.standard,
        easing: l = n.easeInOut,
        delay: c = 0
      } = i, s = be(i, Wi);
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
const Yi = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Ki = Yi, Ji = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Zi(e = {}, ...n) {
  const {
    mixins: r = {},
    palette: t = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = be(e, Ji);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Be(18));
  const l = Mi(t), c = Mn(e);
  let s = de(c, {
    mixins: yi(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ui.slice(),
    typography: Di(l, i),
    transitions: Xi(o),
    zIndex: B({}, Ki),
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
            const f = Rn("", b);
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
const Qi = Zi(), jr = Qi, Vr = "$$material";
function ea({
  props: e,
  name: n
}) {
  return pi({
    props: e,
    name: n,
    defaultTheme: jr,
    themeId: Vr
  });
}
const na = (e) => Ye(e) && e !== "classes", ra = di({
  themeId: Vr,
  defaultTheme: jr,
  rootShouldForwardProp: na
}), ta = ra;
function oa(e) {
  return Rn("MuiSvgIcon", e);
}
Zt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const ia = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], aa = (e) => {
  const {
    color: n,
    fontSize: r,
    classes: t
  } = e, o = {
    root: ["root", n !== "inherit" && `color${pe(n)}`, `fontSize${pe(r)}`]
  };
  return qt(o, oa, t);
}, sa = ta("svg", {
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
}), zn = /* @__PURE__ */ Me.forwardRef(function(n, r) {
  const t = ea({
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
  } = t, v = be(t, ia), b = /* @__PURE__ */ Me.isValidElement(o) && o.type === "svg", h = B({}, t, {
    color: a,
    component: l,
    fontSize: c,
    instanceFontSize: n.fontSize,
    inheritViewBox: u,
    viewBox: d,
    hasSvgAsChild: b
  }), f = {};
  u || (f.viewBox = d);
  const S = aa(h);
  return /* @__PURE__ */ De(sa, B({
    as: l,
    className: Wr(S.root, i),
    focusable: "false",
    color: s,
    "aria-hidden": p ? void 0 : !0,
    role: p ? "img" : void 0,
    ref: r
  }, f, v, b && o.props, {
    ownerState: h,
    children: [b ? o.props.children : o, p ? /* @__PURE__ */ k("title", {
      children: p
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (zn.propTypes = {
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
zn.muiName = "SvgIcon";
const yr = zn;
function ca(e, n) {
  function r(t, o) {
    return /* @__PURE__ */ k(yr, B({
      "data-testid": `${n}Icon`,
      ref: o
    }, t, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${n}Icon`), r.muiName = yr.muiName, /* @__PURE__ */ Me.memo(/* @__PURE__ */ Me.forwardRef(r));
}
const la = ca(/* @__PURE__ */ k("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Na({
  menu: e,
  dataHandler: n,
  commandHandler: r,
  className: t,
  id: o,
  children: i
}) {
  const [a, l] = Pe(!1), [c, s] = Pe(!1), u = Xe(() => {
    a && l(!1), s(!1);
  }, [a]), p = Xe((S) => {
    S.stopPropagation(), l((K) => {
      const z = !K;
      return z && S.shiftKey ? s(!0) : z || s(!1), z;
    });
  }, []), d = xn(void 0), [v, b] = Pe(0);
  nn(() => {
    a && d.current && b(d.current.clientHeight);
  }, [a]);
  const h = Xe(
    (S) => (u(), r(S)),
    [r, u]
  );
  let f = e;
  return !f && n && (f = n(c)), /* @__PURE__ */ k("div", { ref: d, style: { position: "relative" }, children: /* @__PURE__ */ k(nt, { position: "static", id: o, children: /* @__PURE__ */ De(rt, { className: `papi-toolbar ${t ?? ""}`, variant: "dense", children: [
    f ? /* @__PURE__ */ k(
      xr,
      {
        edge: "start",
        className: `papi-menuButton ${t ?? ""}`,
        color: "inherit",
        "aria-label": "open drawer",
        onClick: p,
        children: /* @__PURE__ */ k(la, {})
      }
    ) : void 0,
    i ? /* @__PURE__ */ k("div", { className: "papi-menu-children", children: i }) : void 0,
    f ? /* @__PURE__ */ k(
      tt,
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
        children: /* @__PURE__ */ k(yt, { commandHandler: h, columns: f.columns })
      }
    ) : void 0
  ] }) }) });
}
const Aa = (e, n) => {
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
function ua(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const da = (e, n, r = {}) => {
  const t = xn(n);
  t.current = n;
  const o = xn(r);
  o.current = ua(o.current);
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
}, wn = () => !1, Pa = (e, n) => {
  const [r] = da(
    Xe(async () => {
      if (!e)
        return wn;
      const t = await Promise.resolve(e(n));
      return async () => t();
    }, [n, e]),
    wn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  nn(() => () => {
    r !== wn && r();
  }, [r]);
};
function fa(e, n = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), t = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), n === "top" && t ? r.insertBefore(o, t) : r.appendChild(o);
}
fa(`.papi-button {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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

.cd0kgiy7-0-0-beta-34 {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1
}

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
    .t1jijrjz7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      z-index: 1;
    }

    .t1jijrjz7-0-0-beta-34 > .cd0kgiy7-0-0-beta-34 {
      z-index: 2;
    }
    .t14bmecc7-0-0-beta-34 > .c1wupbe7-0-0-beta-34 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
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
.pr-inline-flex {
    display: inline-flex;
}
.pr-h-10 {
    height: 2.5rem;
}
.pr-h-11 {
    height: 2.75rem;
}
.pr-h-9 {
    height: 2.25rem;
}
.pr-w-10 {
    width: 2.5rem;
}
.pr-items-center {
    align-items: center;
}
.pr-justify-center {
    justify-content: center;
}
.pr-whitespace-nowrap {
    white-space: nowrap;
}
.pr-rounded-md {
    border-radius: calc(var(--radius) - 2px);
}
.pr-border {
    border-width: 1px;
}
.pr-border-input {
    border-color: hsl(var(--input));
}
.pr-bg-background {
    background-color: hsl(var(--background));
}
.pr-bg-destructive {
    background-color: hsl(var(--destructive));
}
.pr-bg-primary {
    background-color: hsl(var(--primary));
}
.pr-bg-secondary {
    background-color: hsl(var(--secondary));
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
.pr-py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
.pr-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.pr-font-medium {
    font-weight: 500;
}
.pr-text-destructive-foreground {
    color: hsl(var(--destructive-foreground));
}
.pr-text-primary {
    color: hsl(var(--primary));
}
.pr-text-primary-foreground {
    color: hsl(var(--primary-foreground));
}
.pr-text-secondary-foreground {
    color: hsl(var(--secondary-foreground));
}
.pr-underline-offset-4 {
    text-underline-offset: 4px;
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
.hover\\:pr-bg-accent:hover {
    background-color: hsl(var(--accent));
}
.hover\\:pr-bg-destructive\\/90:hover {
    background-color: hsl(var(--destructive) / 0.9);
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
.hover\\:pr-underline:hover {
    text-decoration-line: underline;
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
.focus-visible\\:pr-ring-ring:focus-visible {
    --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:pr-ring-offset-2:focus-visible {
    --tw-ring-offset-width: 2px;
}
.disabled\\:pr-pointer-events-none:disabled {
    pointer-events: none;
}
.disabled\\:pr-opacity-50:disabled {
    opacity: 0.5;
}`, "top");
export {
  Te as Button,
  Sa as ChapterRangeSelector,
  gt as Checkbox,
  kn as ComboBox,
  yt as GridMenu,
  Ea as IconButton,
  Ae as LabelPosition,
  mt as MenuItem,
  Ca as RefSelector,
  Ta as SearchBar,
  _a as Slider,
  Oa as Snackbar,
  $a as Switch,
  Ra as Table,
  Je as TextField,
  Na as Toolbar,
  Aa as useEvent,
  Pa as useEventAsync,
  da as usePromise
};
//# sourceMappingURL=index.js.map
