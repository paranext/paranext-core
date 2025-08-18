import { jsx as r, jsxs as l, Fragment as te } from "react/jsx-runtime";
import u, { forwardRef as Ye, useRef as nt, useMemo as H, useCallback as $, useState as I, useLayoutEffect as fn, createContext as Ar, useContext as Pr, useEffect as Mt, Fragment as En } from "react";
import { Command as wt } from "cmdk";
import { X as Ue, Search as Vn, Check as Ct, ChevronsLeft as gn, ChevronsRight as bn, ChevronLeft as Ae, ChevronRight as At, ArrowLeft as Br, ArrowRight as jr, Circle as fe, ChevronsUpDown as Ke, FilterIcon as $r, ChevronDown as ge, ChevronUp as Xr, ArrowLeftIcon as Fr, ChevronLeftIcon as Gr, ChevronRightIcon as Lr, ArrowRightIcon as Hr, Copy as Yr, Filter as Ur, User as Kr, Link as qr, CircleHelp as Jr, Star as Wr, CircleCheckIcon as Zr, CircleXIcon as Qr, CircleHelpIcon as ta, ArrowUpIcon as ea, ArrowDownIcon as na, ArrowUpDownIcon as ra, PanelLeft as aa, PanelRight as oa, ScrollText as sa, MenuIcon as ia, Menu as wa, EllipsisVertical as la, LoaderCircle as da } from "lucide-react";
import { clsx as ca } from "clsx";
import { extendTailwindMerge as pa } from "tailwind-merge";
import * as ft from "@radix-ui/react-dialog";
import { getLocalizedBookName as zt, getLocalizedBookId as qe, Section as A, ALL_ENGLISH_BOOK_NAMES as Vt, doesBookMatchQuery as Je, getChaptersForBook as ua, ALL_BOOK_IDS as ma, getLocalizedSectionNames as Mn, getSectionLongName as Dn, formatScrRef as Wt, getSectionForBook as Zt, NumberFormat as ha, formatBytes as fa, deepEqual as We, isString as Te, compareScrRefs as Pe, scrRefToBBBCCCVVV as Ee, getSectionShortName as ga, getLocalizeKeyForScrollGroupId as z } from "platform-bible-utils";
import { Slot as Xt } from "@radix-ui/react-slot";
import { cva as _t } from "class-variance-authority";
import * as ee from "@radix-ui/react-popover";
import * as In from "@radix-ui/react-label";
import * as ne from "@radix-ui/react-radio-group";
import { useReactTable as On, getFilteredRowModel as ba, getSortedRowModel as zn, getPaginationRowModel as va, getCoreRowModel as An, flexRender as Qt, getGroupedRowModel as xa, getExpandedRowModel as ya } from "@tanstack/react-table";
import * as X from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Na } from "@radix-ui/react-dropdown-menu";
import * as K from "@radix-ui/react-select";
import ka from "markdown-to-jsx";
import * as Be from "@radix-ui/react-checkbox";
import * as be from "@radix-ui/react-toggle-group";
import * as Pn from "@radix-ui/react-toggle";
import * as Bn from "@radix-ui/react-separator";
import * as oe from "@radix-ui/react-tooltip";
import * as lt from "@radix-ui/react-tabs";
import * as F from "@radix-ui/react-menubar";
import { useHotkeys as Ca } from "react-hotkeys-hook";
import * as Ft from "@radix-ui/react-avatar";
import * as G from "@radix-ui/react-context-menu";
import { Drawer as pt } from "vaul";
import * as je from "@radix-ui/react-progress";
import { Toaster as _a } from "sonner";
import { toast as sw } from "sonner";
import * as Jt from "@radix-ui/react-slider";
import * as $e from "@radix-ui/react-switch";
const Sa = pa({ prefix: "tw-" });
function d(...t) {
  return Sa(ca(t));
}
const Ra = "layoutDirection";
function et() {
  const t = localStorage.getItem(Ra);
  return t === "rtl" ? t : "ltr";
}
const Ta = ft.Portal, jn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ft.Overlay,
  {
    ref: n,
    className: d(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
jn.displayName = ft.Overlay.displayName;
const Ea = u.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = et();
  return /* @__PURE__ */ l(Ta, { children: [
    /* @__PURE__ */ r(jn, {}),
    /* @__PURE__ */ l(
      ft.Content,
      {
        ref: a,
        className: d(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: o,
        children: [
          e,
          /* @__PURE__ */ l(
            ft.Close,
            {
              className: d(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Ue, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Ea.displayName = ft.Content.displayName;
const Va = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ft.Title,
  {
    ref: n,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Va.displayName = ft.Title.displayName;
const Ma = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ft.Description,
  {
    ref: n,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Ma.displayName = ft.Description.displayName;
const se = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt,
  {
    ref: n,
    className: d(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
se.displayName = wt.displayName;
const ie = u.forwardRef(({ className: t, ...e }, n) => {
  const a = et();
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ r(Vn, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      wt.Input,
      {
        ref: n,
        className: d(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
ie.displayName = wt.Input.displayName;
const we = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.List,
  {
    ref: n,
    className: d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
we.displayName = wt.List.displayName;
const ve = u.forwardRef((t, e) => /* @__PURE__ */ r(wt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
ve.displayName = wt.Empty.displayName;
const Pt = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Group,
  {
    ref: n,
    className: d(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Pt.displayName = wt.Group.displayName;
const $n = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
$n.displayName = wt.Separator.displayName;
const Gt = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Item,
  {
    ref: n,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
Gt.displayName = wt.Item.displayName;
var Da = Object.defineProperty, Ia = (t, e, n) => e in t ? Da(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, E = (t, e, n) => Ia(t, typeof e != "symbol" ? e + "" : e, n);
const Dt = [
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
], Ze = [
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
], Xn = [
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
], vn = Ga();
function Lt(t, e = !0) {
  return e && (t = t.toUpperCase()), t in vn ? vn[t] : 0;
}
function Qe(t) {
  return Lt(t) > 0;
}
function Oa(t) {
  const e = typeof t == "string" ? Lt(t) : t;
  return e >= 40 && e <= 66;
}
function za(t) {
  return (typeof t == "string" ? Lt(t) : t) <= 39;
}
function Fn(t) {
  return t <= 66;
}
function Aa(t) {
  const e = typeof t == "string" ? Lt(t) : t;
  return Hn(e) && !Fn(e);
}
function* Pa() {
  for (let t = 1; t <= Dt.length; t++) yield t;
}
const Ba = 1, Gn = Dt.length;
function ja() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function tn(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Dt.length ? e : Dt[n];
}
function Ln(t) {
  return t <= 0 || t > Gn ? "******" : Xn[t - 1];
}
function $a(t) {
  return Ln(Lt(t));
}
function Hn(t) {
  const e = typeof t == "number" ? tn(t) : t;
  return Qe(e) && !Ze.includes(e);
}
function Xa(t) {
  const e = typeof t == "number" ? tn(t) : t;
  return Qe(e) && Ze.includes(e);
}
function Fa(t) {
  return Xn[t - 1].includes("*obsolete*");
}
function Ga() {
  const t = {};
  for (let e = 0; e < Dt.length; e++)
    t[Dt[e]] = e + 1;
  return t;
}
const L = {
  allBookIds: Dt,
  nonCanonicalIds: Ze,
  bookIdToNumber: Lt,
  isBookIdValid: Qe,
  isBookNT: Oa,
  isBookOT: za,
  isBookOTNT: Fn,
  isBookDC: Aa,
  allBookNumbers: Pa,
  firstBook: Ba,
  lastBook: Gn,
  extraBooks: ja,
  bookNumberToId: tn,
  bookNumberToEnglishName: Ln,
  bookIdToEnglishName: $a,
  isCanonical: Hn,
  isExtraMaterial: Xa,
  isObsolete: Fa
};
var mt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(mt || {});
const dt = class {
  // private versInfo: Versification;
  constructor(e) {
    if (E(this, "name"), E(this, "fullPath"), E(this, "isPresent"), E(this, "hasVerseSegments"), E(this, "isCustomized"), E(this, "baseVersification"), E(this, "scriptureBooks"), E(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = mt[e]) : (this._type = e, this.name = mt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
E(dt, "Original", new dt(mt.Original)), E(dt, "Septuagint", new dt(mt.Septuagint)), E(dt, "Vulgate", new dt(mt.Vulgate)), E(dt, "English", new dt(mt.English)), E(dt, "RussianProtestant", new dt(mt.RussianProtestant)), E(dt, "RussianOrthodox", new dt(mt.RussianOrthodox));
let Tt = dt;
function xn(t, e) {
  const n = e[0];
  for (let a = 1; a < e.length; a++)
    t = t.split(e[a]).join(n);
  return t.split(n);
}
var Yn = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Yn || {});
const it = class V {
  constructor(e, n, a, o) {
    if (E(this, "firstChapter"), E(this, "lastChapter"), E(this, "lastVerse"), E(this, "hasSegmentsDefined"), E(this, "text"), E(this, "BBBCCCVVVS"), E(this, "longHashCode"), E(this, "versification"), E(this, "rtlMark", "‏"), E(this, "_bookNum", 0), E(this, "_chapterNum", 0), E(this, "_verseNum", 0), E(this, "_verse"), a == null && o == null)
      if (e != null && typeof e == "string") {
        const i = e, s = n != null && n instanceof Tt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (e != null && typeof e == "number") {
        const i = n != null && n instanceof Tt ? n : void 0;
        this.setEmpty(i), this._verseNum = e % V.chapterDigitShifter, this._chapterNum = Math.floor(
          e % V.bookDigitShifter / V.chapterDigitShifter
        ), this._bookNum = Math.floor(e / V.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof V) {
          const i = e;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (e == null) return;
          const i = e instanceof Tt ? e : V.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && a != null)
      if (typeof e == "string" && typeof n == "string" && typeof a == "string")
        this.setEmpty(o), this.updateInternal(e, n, a);
      else if (typeof e == "number" && typeof n == "number" && typeof a == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = a, this.versification = o ?? V.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
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
      return n = new V(e), { success: !0, verseRef: n };
    } catch (a) {
      if (a instanceof Kt)
        return n = new V(), { success: !1, verseRef: n };
      throw a;
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
  static getBBBCCCVVV(e, n, a) {
    return e % V.bcvMaxValue * V.bookDigitShifter + (n >= 0 ? n % V.bcvMaxValue * V.chapterDigitShifter : 0) + (a >= 0 ? a % V.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: a, verseNum: o, verse: i, versificationStr: s } = e, w = i || o.toString();
    let p;
    return s && (p = new Tt(s)), n ? new V(n, a.toString(), w, p) : new V();
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
    let a;
    for (let o = 0; o < e.length; o++) {
      if (a = e[o], a < "0" || a > "9")
        return o === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +a - 0, n > V.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(V.verseRangeSeparator) || this._verse.includes(V.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return L.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = L.bookIdToNumber(e);
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
    const { success: n, vNum: a } = V.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = a, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = V.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > L.lastBook)
      throw new Kt(
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
    this.versification = this.versification != null ? new Tt(e) : void 0;
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
    return this.validateVerse(V.verseRangeSeparators, V.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return V.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return V.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
      const i = e.split("/");
      if (e = i[0], i.length > 1)
        try {
          const s = +i[1].trim();
          this.versification = new Tt(mt[s]);
        } catch {
          throw new Kt("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Kt("Invalid reference : " + e);
    const a = n[1].split(":"), o = +a[0];
    if (a.length !== 2 || L.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !V.isVerseParseable(a[1]))
      throw new Kt("Invalid reference : " + e);
    this.updateInternal(n[0], a[0], a[1]);
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
    return new V(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let e = this.verse;
    (e === "" || e === this.verseNum.toString()) && (e = void 0);
    const n = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: e,
      versificationStr: this.versificationStr
    };
    return e || delete n.verse, n;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(e) {
    return e instanceof V ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = V.verseRangeSeparators, a = V.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = xn(this._verse, a);
    for (const s of i.map((w) => xn(w, n))) {
      const w = this.clone();
      w.verse = s[0];
      const p = w.verseNum;
      if (o.push(w), s.length > 1) {
        const c = this.clone();
        if (c.verse = s[1], !e)
          for (let m = p + 1; m < c.verseNum; m++) {
            const g = new V(
              this._bookNum,
              this._chapterNum,
              m,
              this.versification
            );
            this.isExcluded || o.push(g);
          }
        o.push(c);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let a = 0;
    for (const o of this.allVerses(!0, e, n)) {
      const i = o.internalValid;
      if (i !== 0)
        return i;
      const s = o.BBBCCCVVV;
      if (a > s)
        return 3;
      if (a === s)
        return 4;
      a = s;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > L.lastBook ? 2 : (L.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = V.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, a) {
    this.bookNum = L.bookIdToNumber(e), this.chapter = n, this.verse = a;
  }
};
E(it, "defaultVersification", Tt.English), E(it, "verseRangeSeparator", "-"), E(it, "verseSequenceIndicator", ","), E(it, "verseRangeSeparators", [it.verseRangeSeparator]), E(it, "verseSequenceIndicators", [it.verseSequenceIndicator]), E(it, "chapterDigitShifter", 1e3), E(it, "bookDigitShifter", it.chapterDigitShifter * it.chapterDigitShifter), E(it, "bcvMaxValue", it.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
E(it, "ValidStatusType", Yn);
class Kt extends Error {
}
const Un = Ye(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: a,
    section: o,
    className: i,
    showCheck: s = !1,
    localizedBookNames: w,
    commandValue: p
  }, c) => {
    const m = nt(!1), g = () => {
      m.current || n == null || n(t), setTimeout(() => {
        m.current = !1;
      }, 100);
    }, h = (v) => {
      m.current = !0, a ? a(v) : n == null || n(t);
    }, f = H(
      () => zt(t, w),
      [t, w]
    ), b = H(
      () => qe(t, w),
      [t, w]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: d(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": o === A.OT,
            "tw-border-s-purple-200": o === A.NT,
            "tw-border-s-indigo-200": o === A.DC,
            "tw-border-s-amber-200": o === A.Extra
          }
        ),
        children: /* @__PURE__ */ l(
          Gt,
          {
            ref: c,
            value: p || `${t} ${L.bookIdToEnglishName(t)}`,
            onSelect: g,
            onMouseDown: h,
            role: "option",
            "aria-selected": e,
            "aria-label": `${L.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ r(
                Ct,
                {
                  className: d(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    e ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: f }),
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: b })
            ]
          }
        )
      }
    );
  }
), La = _t(
  "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",
  {
    variants: {
      variant: {
        default: "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",
        destructive: "tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",
        outline: "tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",
        secondary: "tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
        ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground",
        link: "tw-text-primary tw-underline-offset-4 hover:tw-underline"
      },
      size: {
        default: "tw-h-10 tw-px-4 tw-py-2",
        sm: "tw-h-9 tw-rounded-md tw-px-3",
        lg: "tw-h-11 tw-rounded-md tw-px-8",
        icon: "tw-h-10 tw-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), D = u.forwardRef(
  ({ className: t, variant: e, size: n, asChild: a = !1, ...o }, i) => /* @__PURE__ */ r(a ? Xt : "button", { className: d(La({ variant: e, size: n, className: t })), ref: i, ...o })
);
D.displayName = "Button";
const le = ee.Root, de = ee.Trigger, Ht = u.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...a }, o) => {
  const i = et();
  return /* @__PURE__ */ r(ee.Portal, { children: /* @__PURE__ */ r(
    ee.Content,
    {
      ref: o,
      align: e,
      sideOffset: n,
      className: d(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-z-[250]",
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a,
      dir: i
    }
  ) });
});
Ht.displayName = ee.Content.displayName;
function Xe(t, e, n) {
  return `${t} ${Vt[t]}${e ? ` ${qe(t, e)} ${zt(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
const Ve = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ha = [
  Ve.BOOK_ONLY,
  Ve.BOOK_CHAPTER,
  Ve.BOOK_CHAPTER_VERSE
];
function yn(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function ht(t) {
  return ua(L.bookIdToNumber(t));
}
function Ya(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const a = Ha.reduce(
    (o, i) => {
      if (o) return o;
      const s = i.exec(t.trim());
      if (s) {
        const [w, p = void 0, c = void 0] = s.slice(1);
        let m;
        const g = e.filter((h) => Je(h, w, n));
        if (g.length === 1 && ([m] = g), !m && p) {
          if (L.isBookIdValid(w)) {
            const h = w.toUpperCase();
            e.includes(h) && (m = h);
          }
          if (!m && n) {
            const h = Array.from(n.entries()).find(
              ([, f]) => f.localizedId.toLowerCase() === w.toLowerCase()
            );
            h && e.includes(h[0]) && ([m] = h);
          }
        }
        if (!m && p) {
          const f = ((b) => Object.keys(Vt).find(
            (v) => Vt[v].toLowerCase() === b.toLowerCase()
          ))(w);
          if (f && e.includes(f) && (m = f), !m && n) {
            const b = Array.from(n.entries()).find(
              ([, v]) => v.localizedName.toLowerCase() === w.toLowerCase()
            );
            b && e.includes(b[0]) && ([m] = b);
          }
        }
        if (m) {
          let h = p ? parseInt(p, 10) : void 0;
          h && h > ht(m) && (h = Math.max(ht(m), 1));
          const f = c ? parseInt(c, 10) : void 0;
          return {
            book: m,
            chapterNum: h,
            verseNum: f
          };
        }
      }
    },
    void 0
  );
  if (a) return a;
}
function Ua(t, e, n, a) {
  const o = $(() => {
    if (t.chapterNum > 1)
      a({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const p = e.indexOf(t.book);
      if (p > 0) {
        const c = e[p - 1], m = Math.max(ht(c), 1);
        a({
          book: c,
          chapterNum: m,
          verseNum: 1
        });
      }
    }
  }, [t, e, a]), i = $(() => {
    const p = ht(t.book);
    if (t.chapterNum < p)
      a({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c < e.length - 1) {
        const m = e[c + 1];
        a({
          book: m,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, a]), s = $(() => {
    a({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, a]), w = $(() => {
    a({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, a]);
  return H(() => [
    {
      onClick: o,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? gn : bn
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Ae : At
    },
    {
      onClick: w,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? At : Ae
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === ht(t.book) || ht(t.book) === -1) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? bn : gn
    }
  ], [
    t,
    e,
    n,
    o,
    s,
    w,
    i
  ]);
}
function Nn({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: a,
  isChapterDimmed: o,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r("div", { className: d("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: ht(t) }, (s, w) => w + 1).map((s) => /* @__PURE__ */ r(
      Gt,
      {
        value: `${t} ${Vt[t] || ""} ${s}`,
        onSelect: () => n(s),
        ref: a(s),
        className: d(
          "tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",
          {
            "tw-bg-primary tw-text-primary-foreground": t === e.book && s === e.chapterNum
          },
          {
            "tw-bg-muted/50 tw-text-muted-foreground/50": (o == null ? void 0 : o(s)) ?? !1
          }
        ),
        children: s
      },
      s
    )) }) });
}
function ci({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: a,
  localizedBookNames: o,
  localizedStrings: i
}) {
  const s = et(), [w, p] = I(!1), [c, m] = I(""), [g, h] = I(""), [f, b] = I("books"), [v, x] = I(void 0), [C, y] = I(!1), M = nt(void 0), B = nt(void 0), W = nt(void 0), Y = nt(void 0), gt = nt({}), k = H(() => a ? a() : ma, [a]), T = H(() => ({
    [A.OT]: k.filter((O) => L.isBookOT(O)),
    [A.NT]: k.filter((O) => L.isBookNT(O)),
    [A.DC]: k.filter((O) => L.isBookDC(O)),
    [A.Extra]: k.filter((O) => L.extraBooks().includes(O))
  }), [k]), rt = H(() => Object.values(T).flat(), [T]), P = H(() => {
    if (!g.trim()) return T;
    const N = {
      [A.OT]: [],
      [A.NT]: [],
      [A.DC]: [],
      [A.Extra]: []
    };
    return [A.OT, A.NT, A.DC, A.Extra].forEach((J) => {
      N[J] = T[J].filter((at) => Je(at, g, o));
    }), N;
  }, [T, g, o]), _ = H(
    () => Ya(g, rt, o),
    [g, rt, o]
  ), Yt = $(() => {
    _ && (e({
      book: _.book,
      chapterNum: _.chapterNum ?? 1,
      verseNum: _.verseNum ?? 1
    }), p(!1), h(""), m(""));
  }, [e, _]), R = $(
    (N) => {
      if (ht(N) <= 1) {
        e({
          book: N,
          chapterNum: 1,
          verseNum: 1
        }), p(!1), h("");
        return;
      }
      x(N), b("chapters");
    },
    [e]
  ), tt = $(
    (N) => {
      const O = f === "chapters" ? v : _ == null ? void 0 : _.book;
      O && (e({
        book: O,
        chapterNum: N,
        verseNum: 1
      }), p(!1), b("books"), x(void 0), h(""));
    },
    [e, f, v, _]
  ), U = Ua(t, rt, s, e), j = $(() => {
    b("books"), x(void 0), setTimeout(() => {
      B.current && B.current.focus();
    }, 0);
  }, []), S = $(
    (N) => {
      if (!N && f === "chapters") {
        j();
        return;
      }
      p(N), N && (b("books"), x(void 0), h(""));
    },
    [f, j]
  ), { otLong: Z, ntLong: ot, dcLong: q, extraLong: bt } = Mn(i), Vr = $(
    (N) => Dn(N, Z, ot, q, bt),
    [Z, ot, q, bt]
  ), Mr = $(
    (N) => _ ? !!_.chapterNum && !N.toString().includes(_.chapterNum.toString()) : !1,
    [_]
  ), Dr = H(
    () => Wt(
      t,
      o ? zt(t.book, o) : "English"
    ),
    [t, o]
  ), mn = $((N) => (O) => {
    gt.current[N] = O;
  }, []), Ir = $((N) => {
    (N.key === "Home" || N.key === "End") && N.stopPropagation();
  }, []), Or = $(
    (N) => {
      if (N.ctrlKey) return;
      const { isLetter: O, isDigit: J } = yn(N.key);
      if (f === "chapters") {
        if (N.key === "Backspace") {
          N.preventDefault(), N.stopPropagation(), j();
          return;
        }
        if (O || J) {
          if (N.preventDefault(), N.stopPropagation(), b("books"), x(void 0), J && v) {
            const at = Vt[v];
            h(`${at} ${N.key}`);
          } else
            h(N.key);
          setTimeout(() => {
            B.current && B.current.focus();
          }, 0);
          return;
        }
      }
      if ((f === "chapters" || f === "books" && _) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(N.key)) {
        const at = f === "chapters" ? v : _ == null ? void 0 : _.book;
        if (!at) return;
        const st = (() => {
          if (!c) return 1;
          const Ut = c.match(/(\d+)$/);
          return Ut ? parseInt(Ut[1], 10) : 0;
        })(), St = ht(at);
        if (!St) return;
        let vt = st;
        const hn = 6;
        switch (N.key) {
          case "ArrowLeft":
            st !== 0 && (vt = st > 1 ? st - 1 : St);
            break;
          case "ArrowRight":
            st !== 0 && (vt = st < St ? st + 1 : 1);
            break;
          case "ArrowUp":
            vt = st === 0 ? St : Math.max(1, st - hn);
            break;
          case "ArrowDown":
            vt = st === 0 ? 1 : Math.min(St, st + hn);
            break;
          default:
            return;
        }
        vt !== st && (N.preventDefault(), N.stopPropagation(), m(Xe(at, o, vt)), setTimeout(() => {
          const Ut = gt.current[vt];
          Ut && Ut.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      f,
      _,
      j,
      v,
      c,
      o
    ]
  ), zr = $((N) => {
    if (N.shiftKey || N.key === "Tab" || N.key === " ") return;
    const { isLetter: O, isDigit: J } = yn(N.key);
    (O || J) && (N.preventDefault(), h((at) => at + N.key), B.current.focus(), y(!1));
  }, []);
  return fn(() => {
    const N = setTimeout(() => {
      if (w && f === "books" && W.current && Y.current) {
        const O = W.current, J = Y.current, at = J.offsetTop, st = O.clientHeight, St = J.clientHeight, vt = at - st / 2 + St / 2;
        O.scrollTo({
          top: Math.max(0, vt),
          behavior: "smooth"
        }), m(Xe(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(N);
    };
  }, [w, f, g, _, t.book]), fn(() => {
    if (f === "chapters" && v) {
      const N = v === t.book;
      setTimeout(() => {
        if (W.current)
          if (N) {
            const O = gt.current[t.chapterNum];
            O && O.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            W.current.scrollTo({ top: 0 });
        M.current && M.current.focus();
      }, 0);
    }
  }, [f, v, _, t.book, t.chapterNum]), /* @__PURE__ */ l(le, { open: w, onOpenChange: S, children: [
    /* @__PURE__ */ r(de, { asChild: !0, children: /* @__PURE__ */ r(
      D,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": w,
        className: d(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: Dr })
      }
    ) }),
    /* @__PURE__ */ r(Ht, { forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ l(
      se,
      {
        ref: M,
        onKeyDown: Or,
        loop: !0,
        value: c,
        onValueChange: m,
        shouldFilter: !1,
        children: [
          f === "books" ? /* @__PURE__ */ l("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ r(
              ie,
              {
                ref: B,
                value: g,
                onValueChange: h,
                onKeyDown: Ir,
                onFocus: () => y(!1)
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: U.map(({ onClick: N, disabled: O, title: J, icon: at }) => /* @__PURE__ */ r(
              D,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  y(!0), N();
                },
                disabled: O,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: J,
                onKeyDown: zr,
                children: /* @__PURE__ */ r(at, {})
              },
              J
            )) })
          ] }) : /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              D,
              {
                variant: "ghost",
                size: "sm",
                onClick: j,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: s === "ltr" ? /* @__PURE__ */ r(Br, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(jr, { className: "tw-h-4 tw-w-4" })
              }
            ),
            v && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: zt(v, o) })
          ] }),
          !C && /* @__PURE__ */ l(we, { ref: W, children: [
            f === "books" && /* @__PURE__ */ l(te, { children: [
              !_ && Object.entries(P).map(([N, O]) => {
                if (O.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Pt, { heading: Vr(N), children: O.map((J) => /* @__PURE__ */ r(
                      Un,
                      {
                        bookId: J,
                        onSelect: (at) => R(at),
                        section: Zt(J),
                        commandValue: `${J} ${Vt[J]}`,
                        ref: J === t.book ? Y : void 0,
                        localizedBookNames: o
                      },
                      J
                    )) }, N)
                  );
              }),
              _ && /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r(
                Gt,
                {
                  value: `${_.book} ${Vt[_.book]} ${_.chapterNum || ""}:${_.verseNum || ""})}`,
                  onSelect: Yt,
                  className: "tw-font-semibold tw-text-primary",
                  children: Wt(
                    {
                      book: _.book,
                      chapterNum: _.chapterNum ?? 1,
                      verseNum: _.verseNum ?? 1
                    },
                    o ? qe(_.book, o) : void 0
                  )
                },
                "top-match"
              ) }),
              _ && ht(_.book) > 1 && /* @__PURE__ */ l(te, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: zt(_.book, o) }),
                /* @__PURE__ */ r(
                  Nn,
                  {
                    bookId: _.book,
                    scrRef: t,
                    onChapterSelect: tt,
                    setChapterRef: mn,
                    isChapterDimmed: Mr,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            f === "chapters" && v && /* @__PURE__ */ r(
              Nn,
              {
                bookId: v,
                scrRef: t,
                onChapterSelect: tt,
                setChapterRef: mn,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const pi = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%"
]), Ka = _t(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Q = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(In.Root, { ref: n, className: d("pr-twp", Ka(), t), ...e }));
Q.displayName = In.Root.displayName;
const en = u.forwardRef(({ className: t, ...e }, n) => {
  const a = et();
  return /* @__PURE__ */ r(
    ne.Root,
    {
      className: d("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: a
    }
  );
});
en.displayName = ne.Root.displayName;
const ue = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ne.Item,
  {
    ref: n,
    className: d(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(ne.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(fe, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
ue.displayName = ne.Item.displayName;
function qa(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Fe({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: a,
  popoverContentClassName: o,
  value: i,
  onChange: s = () => {
  },
  getOptionLabel: w = qa,
  icon: p = void 0,
  buttonPlaceholder: c = "",
  textPlaceholder: m = "",
  commandEmptyMessage: g = "No option found",
  buttonVariant: h = "outline",
  alignDropDown: f = "start",
  isDisabled: b = !1,
  ...v
}) {
  const [x, C] = I(!1);
  return /* @__PURE__ */ l(le, { open: x, onOpenChange: C, ...v, children: [
    /* @__PURE__ */ r(de, { asChild: !0, children: /* @__PURE__ */ l(
      D,
      {
        variant: h,
        role: "combobox",
        "aria-expanded": x,
        id: t,
        className: d(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          a ?? n
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            p && /* @__PURE__ */ r("div", { className: "tw-pe-2", children: p }),
            /* @__PURE__ */ r("span", { className: d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: i ? w(i) : c })
          ] }),
          /* @__PURE__ */ r(Ke, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Ht,
      {
        align: f,
        className: d("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ l(se, { children: [
          /* @__PURE__ */ r(ie, { placeholder: m, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(ve, { children: g }),
          /* @__PURE__ */ r(we, { children: e.map((y) => /* @__PURE__ */ l(
            Gt,
            {
              value: w(y),
              onSelect: () => {
                s(y), C(!1);
              },
              children: [
                /* @__PURE__ */ r(
                  Ct,
                  {
                    className: d("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !i || w(i) !== w(y)
                    })
                  }
                ),
                w(y)
              ]
            },
            w(y)
          )) })
        ] })
      }
    )
  ] });
}
function Ja({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: a,
  isDisabled: o = !1,
  chapterCount: i
}) {
  const s = H(
    () => Array.from({ length: i }, (c, m) => m + 1),
    [i]
  );
  return /* @__PURE__ */ l(te, { children: [
    /* @__PURE__ */ r(Q, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      Fe,
      {
        isDisabled: o,
        onChange: (c) => {
          n(c), c > e && a(c);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(Q, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      Fe,
      {
        isDisabled: o,
        onChange: (c) => {
          a(c), c < t && n(c);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (c) => c.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Wa = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Wa || {});
const ui = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Me = (t, e) => t[e] ?? e;
function mi({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: a,
  chapterCount: o,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: w,
  handleSelectStartChapter: p,
  localizedStrings: c
}) {
  const m = Me(c, "%webView_bookSelector_currentBook%"), g = Me(c, "%webView_bookSelector_choose%"), h = Me(c, "%webView_bookSelector_chooseBooks%"), [f, b] = I(
    "current book"
    /* CURRENT_BOOK */
  ), v = (x) => {
    b(x), t(x);
  };
  return /* @__PURE__ */ r(
    en,
    {
      className: "pr-twp tw-flex",
      value: f,
      onValueChange: (x) => v(x),
      children: /* @__PURE__ */ l("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(ue, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(Q, { className: "tw-ms-1", children: m })
          ] }),
          /* @__PURE__ */ r(Q, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Ja,
            {
              isDisabled: f === "choose books",
              handleSelectStartChapter: p,
              handleSelectEndChapter: s,
              chapterCount: o,
              startChapter: w,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(ue, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(Q, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(Q, { className: "tw-flex tw-items-center", children: a.map((x) => L.bookIdToEnglishName(x)).join(", ") }),
          /* @__PURE__ */ r(
            D,
            {
              disabled: f === "current book",
              onClick: () => n(),
              children: g
            }
          )
        ] })
      ] })
    }
  );
}
const nn = Ar(void 0);
function ut() {
  const t = Pr(nn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const yt = _t("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Kn = X.Trigger, qn = X.Group, Za = X.Portal, Qa = X.Sub, to = X.RadioGroup;
function rn({ variant: t = "default", ...e }) {
  const n = u.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(nn.Provider, { value: n, children: /* @__PURE__ */ r(X.Root, { ...e }) });
}
const Jn = u.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const i = ut();
  return /* @__PURE__ */ l(
    X.SubTrigger,
    {
      ref: o,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        yt({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(At, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Jn.displayName = X.SubTrigger.displayName;
const Wn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.SubContent,
  {
    ref: n,
    className: d(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Wn.displayName = X.SubContent.displayName;
const xe = u.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...a }, o) => {
  const i = et();
  return /* @__PURE__ */ r(X.Portal, { children: /* @__PURE__ */ r(
    X.Content,
    {
      ref: o,
      sideOffset: e,
      className: d(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a,
      children: /* @__PURE__ */ r("div", { dir: i, children: n })
    }
  ) });
});
xe.displayName = X.Content.displayName;
const Zn = u.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = et(), i = ut();
  return /* @__PURE__ */ r(
    X.Item,
    {
      ref: a,
      className: d(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        yt({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: o
    }
  );
});
Zn.displayName = X.Item.displayName;
const an = u.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const i = ut();
  return /* @__PURE__ */ l(
    X.CheckboxItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        yt({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
an.displayName = X.CheckboxItem.displayName;
const Qn = u.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = ut();
  return /* @__PURE__ */ l(
    X.RadioItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        yt({ variant: o.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(fe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Qn.displayName = X.RadioItem.displayName;
const on = u.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  X.Label,
  {
    ref: a,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
on.displayName = X.Label.displayName;
const ye = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
ye.displayName = X.Separator.displayName;
function eo({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
eo.displayName = "DropdownMenuShortcut";
function no({ table: t }) {
  return /* @__PURE__ */ l(rn, { children: [
    /* @__PURE__ */ r(Na, { asChild: !0, children: /* @__PURE__ */ l(D, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r($r, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ l(xe, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(on, { children: "Toggle columns" }),
      /* @__PURE__ */ r(ye, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        an,
        {
          className: "tw-capitalize",
          checked: e.getIsVisible(),
          onCheckedChange: (n) => e.toggleVisibility(!!n),
          children: e.id
        },
        e.id
      ))
    ] })
  ] });
}
const Bt = K.Root, ro = K.Group, jt = K.Value, ao = _t(
  "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
  {
    variants: {
      size: {
        default: "tw-h-10 tw-px-4 tw-py-2",
        sm: "tw-h-8 tw-rounded-md tw-px-3",
        lg: "tw-h-11 tw-rounded-md tw-px-8",
        icon: "tw-h-10 tw-w-10"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
), It = u.forwardRef(({ className: t, children: e, size: n, ...a }, o) => {
  const i = et();
  return /* @__PURE__ */ l(
    K.Trigger,
    {
      className: d(ao({ size: n, className: t })),
      ref: o,
      ...a,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ r(K.Icon, { asChild: !0, children: /* @__PURE__ */ r(ge, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
It.displayName = K.Trigger.displayName;
const tr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  K.ScrollUpButton,
  {
    ref: n,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Xr, { className: "tw-h-4 tw-w-4" })
  }
));
tr.displayName = K.ScrollUpButton.displayName;
const er = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  K.ScrollDownButton,
  {
    ref: n,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(ge, { className: "tw-h-4 tw-w-4" })
  }
));
er.displayName = K.ScrollDownButton.displayName;
const Ot = u.forwardRef(({ className: t, children: e, position: n = "popper", ...a }, o) => {
  const i = et();
  return /* @__PURE__ */ r(K.Portal, { children: /* @__PURE__ */ l(
    K.Content,
    {
      ref: o,
      className: d(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...a,
      children: [
        /* @__PURE__ */ r(tr, {}),
        /* @__PURE__ */ r(
          K.Viewport,
          {
            className: d(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ r(er, {})
      ]
    }
  ) });
});
Ot.displayName = K.Content.displayName;
const oo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  K.Label,
  {
    ref: n,
    className: d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
oo.displayName = K.Label.displayName;
const ct = u.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ l(
  K.Item,
  {
    ref: a,
    className: d(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(K.ItemIndicator, { children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(K.ItemText, { children: e })
    ]
  }
));
ct.displayName = K.Item.displayName;
const so = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  K.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
so.displayName = K.Separator.displayName;
function io({ table: t }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ l("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ l(
        Bt,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(It, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(jt, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Ot, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(ct, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ l(
        D,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Fr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        D,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(Gr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        D,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(Lr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        D,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(Hr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const kn = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [contenteditable],
  tr:not([disabled])
`;
function wo(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function re(t, e) {
  const n = e ? `${kn}, ${e}` : kn;
  return Array.from(t.querySelectorAll(n)).filter(
    (a) => !a.hasAttribute("disabled") && !a.getAttribute("aria-hidden") && wo(a)
  );
}
const Ne = u.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => {
  const o = u.useRef(null);
  u.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), u.useEffect(() => {
    const s = o.current;
    if (!s) return;
    const w = () => {
      requestAnimationFrame(() => {
        re(s, '[tabindex]:not([tabindex="-1"])').forEach((m) => {
          m.setAttribute("tabindex", "-1");
        });
      });
    };
    w();
    const p = new MutationObserver(() => {
      w();
    });
    return p.observe(s, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      p.disconnect();
    };
  }, []);
  const i = (s) => {
    const { current: w } = o;
    if (w) {
      if (s.key === "ArrowDown") {
        s.preventDefault(), re(w)[0].focus();
        return;
      }
      s.key === " " && document.activeElement === w && s.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: d("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: i,
      ref: o,
      className: d(
        "tw-w-full tw-caption-bottom tw-text-sm tw-outline-none",
        // CUSTOM: Add outline-none to remove duplicate outline
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        // CUSTOM: Add focus styles
        t
      ),
      "aria-label": "Table",
      "aria-labelledby": "table-label",
      ...n
    }
  ) });
});
Ne.displayName = "Table";
const ke = u.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r(
  "thead",
  {
    ref: a,
    className: d(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": e
      },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
ke.displayName = "TableHeader";
const Ce = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: d("[&_tr:last-child]:tw-border-0", t), ...e }));
Ce.displayName = "TableBody";
const lo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
lo.displayName = "TableFooter";
function co(t) {
  u.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (a) => {
      if (e.contains(document.activeElement)) {
        if (a.key === "ArrowRight" || a.key === "ArrowLeft") {
          a.preventDefault(), a.stopPropagation();
          const o = t.current ? re(t.current) : [], i = o.indexOf(document.activeElement), s = a.key === "ArrowRight" ? i + 1 : i - 1;
          s >= 0 && s < o.length && o[s].focus();
        }
        a.key === "Escape" && (a.preventDefault(), e.focus()), (a.key === "ArrowDown" || a.key === "ArrowUp") && a.preventDefault();
      }
    };
    return e.addEventListener("keydown", n), () => {
      e.removeEventListener("keydown", n);
    };
  }, [t]);
}
function po(t, e, n) {
  let a;
  return n === "ArrowLeft" && e > 0 ? a = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (a = t[e + 1]), a ? (requestAnimationFrame(() => a.focus()), !0) : !1;
}
function uo(t, e, n) {
  let a;
  return n === "ArrowDown" && e < t.length - 1 ? a = t[e + 1] : n === "ArrowUp" && e > 0 && (a = t[e - 1]), a ? (requestAnimationFrame(() => a.focus()), !0) : !1;
}
const kt = u.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: a = !1, ...o }, i) => {
  const s = u.useRef(null);
  u.useEffect(() => {
    typeof i == "function" ? i(s.current) : i && "current" in i && (i.current = s.current);
  }, [i]), co(s);
  const w = u.useMemo(
    () => s.current ? re(s.current) : [],
    [s]
  ), p = u.useCallback(
    (m) => {
      const { current: g } = s;
      if (!g || !g.parentElement) return;
      const h = g.closest("table"), f = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        re(h).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], b = f.indexOf(g), v = w.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (m.key === "ArrowDown" || m.key === "ArrowUp")
        m.preventDefault(), uo(f, b, m.key);
      else if (m.key === "ArrowLeft" || m.key === "ArrowRight")
        m.preventDefault(), po(w, v, m.key);
      else if (m.key === "Escape") {
        m.preventDefault();
        const x = g.closest("table");
        x && x.focus();
      }
      e == null || e(m);
    },
    [s, w, e]
  ), c = u.useCallback(
    (m) => {
      a && (n == null || n(m));
    },
    [a, n]
  );
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: s,
      tabIndex: -1,
      onKeyDown: p,
      onFocus: c,
      className: d(
        // CUSTOM: Add focus styles and add tw-outline-none so there isn't a duplicate outline
        "tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50",
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        "data-[state=selected]:tw-bg-muted",
        t
      ),
      ...o
    }
  );
});
kt.displayName = "TableRow";
const ae = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: d(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
ae.displayName = "TableHead";
const $t = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
$t.displayName = "TableCell";
const mo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: d("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
mo.displayName = "TableCaption";
function ho({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: a = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  }
}) {
  var x;
  const [w, p] = I([]), [c, m] = I([]), [g, h] = I({}), [f, b] = I({}), v = On({
    data: e,
    columns: t,
    getCoreRowModel: An(),
    ...n && { getPaginationRowModel: va() },
    onSortingChange: p,
    getSortedRowModel: zn(),
    onColumnFiltersChange: m,
    getFilteredRowModel: ba(),
    onColumnVisibilityChange: h,
    onRowSelectionChange: b,
    state: {
      sorting: w,
      columnFilters: c,
      columnVisibility: g,
      rowSelection: f
    }
  });
  return /* @__PURE__ */ l("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ r(no, { table: v }),
    /* @__PURE__ */ l(Ne, { stickyHeader: i, children: [
      /* @__PURE__ */ r(ke, { stickyHeader: i, children: v.getHeaderGroups().map((C) => /* @__PURE__ */ r(kt, { children: C.headers.map((y) => /* @__PURE__ */ r(ae, { children: y.isPlaceholder ? void 0 : Qt(y.column.columnDef.header, y.getContext()) }, y.id)) }, C.id)) }),
      /* @__PURE__ */ r(Ce, { children: (x = v.getRowModel().rows) != null && x.length ? v.getRowModel().rows.map((C) => /* @__PURE__ */ r(
        kt,
        {
          onClick: () => s(C, v),
          "data-state": C.getIsSelected() && "selected",
          children: C.getVisibleCells().map((y) => /* @__PURE__ */ r($t, { children: Qt(y.column.columnDef.cell, y.getContext()) }, y.id))
        },
        C.id
      )) : /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ r($t, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        D,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.previousPage(),
          disabled: !v.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        D,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.nextPage(),
          disabled: !v.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && a && /* @__PURE__ */ r(io, { table: v })
  ] });
}
function hi({ id: t, markdown: e, className: n, anchorTarget: a }) {
  const o = H(
    () => ({
      overrides: {
        a: {
          props: {
            target: a
          }
        }
      }
    }),
    [a]
  );
  return /* @__PURE__ */ r("div", { id: t, className: d("pr-twp tw-prose", n), children: /* @__PURE__ */ r(ka, { options: o, children: e }) });
}
const fo = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Cn = (t, e) => t[e] ?? e;
function go({ errorDetails: t, handleCopyNotify: e, localizedStrings: n }) {
  const a = Cn(n, "%webView_error_dump_header%"), o = Cn(n, "%webView_error_dump_info_message%");
  function i() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
      /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
        /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
        /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: o })
      ] }),
      /* @__PURE__ */ r(D, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(Yr, {}) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
  ] });
}
const fi = Object.freeze([
  ...fo,
  "%webView_error_dump_copied_message%"
]);
function gi({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: a,
  className: o
}) {
  const [i, s] = I(!1), w = () => {
    s(!0), e && e();
  };
  return /* @__PURE__ */ l(le, { onOpenChange: (c) => {
    c || s(!1);
  }, children: [
    /* @__PURE__ */ r(de, { asChild: !0, children: a }),
    /* @__PURE__ */ l(Ht, { className: d("tw-min-w-80 tw-max-w-96", o), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(Q, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        go,
        {
          errorDetails: t,
          handleCopyNotify: w,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var bo = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(bo || {});
function bi({ id: t, label: e, groups: n }) {
  const [a, o] = I(
    Object.fromEntries(
      n.map(
        (c, m) => c.itemType === 0 ? [m, []] : void 0
      ).filter((c) => !!c)
    )
  ), [i, s] = I({}), w = (c, m) => {
    const g = !a[c][m];
    o((f) => (f[c][m] = g, { ...f }));
    const h = n[c].items[m];
    h.onUpdate(h.id, g);
  }, p = (c, m) => {
    s((h) => (h[c] = m, { ...h }));
    const g = n[c].items.find((h) => h.id === m);
    g ? g.onUpdate(m) : console.error(`Could not find dropdown radio item with id '${m}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ l(rn, { children: [
    /* @__PURE__ */ r(Kn, { asChild: !0, children: /* @__PURE__ */ l(D, { variant: "default", children: [
      /* @__PURE__ */ r(Ur, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(ge, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(xe, { children: n.map((c, m) => /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r(on, { children: c.label }),
      /* @__PURE__ */ r(qn, { children: c.itemType === 0 ? /* @__PURE__ */ r(te, { children: c.items.map((g, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        an,
        {
          checked: a[m][h],
          onCheckedChange: () => w(m, h),
          children: g.label
        }
      ) }, g.id)) }) : /* @__PURE__ */ r(
        to,
        {
          value: i[m],
          onValueChange: (g) => p(m, g),
          children: c.items.map((g) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Qn, { value: g.id, children: g.label }) }, g.id))
        }
      ) }),
      /* @__PURE__ */ r(ye, {})
    ] }, c.label)) })
  ] }) });
}
function vi({
  id: t,
  category: e,
  downloads: n,
  languages: a,
  moreInfoUrl: o,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: w
}) {
  const p = new ha("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((m, g) => m + g, 0)), c = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ l(
    "div",
    {
      id: t,
      className: "tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: e }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(Kr, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: a.slice(0, 3).map((m) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: m.toUpperCase() }, m)) }),
          a.length > 3 && /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              onClick: () => c(),
              className: "tw-text-xs tw-text-foreground tw-underline",
              children: [
                "+",
                a.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (o || s) && /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          o && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ l(
            D,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(qr, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ l(
            D,
            {
              onClick: () => w(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(Jr, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function vo({ id: t, versionHistory: e }) {
  const [n, a] = I(!1), o = /* @__PURE__ */ new Date();
  function i(w) {
    const p = new Date(w), c = new Date(o.getTime() - p.getTime()), m = c.getUTCFullYear() - 1970, g = c.getUTCMonth(), h = c.getUTCDate() - 1;
    let f = "";
    return m > 0 ? f = `${m.toString()} year${m === 1 ? "" : "s"} ago` : g > 0 ? f = `${g.toString()} month${g === 1 ? "" : "s"} ago` : h === 0 ? f = "today" : f = `${h.toString()} day${h === 1 ? "" : "s"} ago`, f;
  }
  const s = Object.entries(e).sort((w, p) => p[0].localeCompare(w[0]));
  return /* @__PURE__ */ l("div", { id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? s : s.slice(0, 5)).map((w) => /* @__PURE__ */ l("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: w[1].description }) }) }),
      /* @__PURE__ */ l("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ l("div", { children: [
          "Version ",
          w[0]
        ] }),
        /* @__PURE__ */ r("div", { children: i(w[1].date) })
      ] })
    ] }, w[0])) }),
    s.length > 5 && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => a(!n),
        className: "tw-text-xs tw-text-foreground tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function xi({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: a,
  versionHistory: o,
  currentVersion: i
}) {
  const s = H(() => fa(n), [n]), p = ((c) => {
    const m = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((g) => m.of(g));
  })(a);
  return /* @__PURE__ */ r("div", { id: t, className: "tw-border-t tw-py-2", children: /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(o).length > 0 && /* @__PURE__ */ r(vo, { versionHistory: o }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ l("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ l("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ l("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: p.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const xo = _t(
  "pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",
  {
    variants: {
      variant: {
        default: "tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",
        secondary: "tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
        muted: "tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",
        destructive: "tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",
        outline: "tw-border tw-text-foreground",
        blueIndicator: "tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",
        mutedIndicator: "tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",
        ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), me = u.forwardRef(
  ({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, className: d("pr-twp", xo({ variant: e }), t), ...n })
);
me.displayName = "Badge";
function yo({
  entries: t,
  getEntriesCount: e = void 0,
  selected: n,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: i = "No entries found",
  customSelectedText: s,
  isDisabled: w = !1,
  sortSelected: p = !1,
  icon: c = void 0,
  className: m = void 0
}) {
  const [g, h] = I(!1), f = $(
    (x) => {
      var y;
      const C = (y = t.find((M) => M.label === x)) == null ? void 0 : y.value;
      C && a(
        n.includes(C) ? n.filter((M) => M !== C) : [...n, C]
      );
    },
    [t, n, a]
  ), b = () => s || o, v = H(() => {
    if (!p) return t;
    const x = t.filter((y) => y.starred).sort((y, M) => y.label.localeCompare(M.label)), C = t.filter((y) => !y.starred).sort((y, M) => {
      const B = n.includes(y.value), W = n.includes(M.value);
      return B && !W ? -1 : !B && W ? 1 : y.label.localeCompare(M.label);
    });
    return [...x, ...C];
  }, [t, n, p]);
  return /* @__PURE__ */ r("div", { className: m, children: /* @__PURE__ */ l(le, { open: g, onOpenChange: h, children: [
    /* @__PURE__ */ r(de, { asChild: !0, children: /* @__PURE__ */ l(
      D,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": g,
        className: d(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        disabled: w,
        children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: c }) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: d({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ r("div", { className: "tw-font-normal", children: b() })
              }
            )
          ] }),
          /* @__PURE__ */ r(Ke, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Ht, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ l(se, { children: [
      /* @__PURE__ */ r(ie, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ l(we, { children: [
        /* @__PURE__ */ r(ve, { children: i }),
        /* @__PURE__ */ r(Pt, { children: v.map((x) => {
          const C = e ? e(x) : void 0;
          return /* @__PURE__ */ l(
            Gt,
            {
              value: x.label,
              onSelect: f,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                  Ct,
                  {
                    className: d(
                      "tw-h-4 tw-w-4",
                      n.includes(x.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ r("div", { className: "tw-w-4", children: x.starred && /* @__PURE__ */ r(Wr, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: x.label }),
                e && /* @__PURE__ */ r("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: C })
              ]
            },
            x.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function yi({
  entries: t,
  getEntriesCount: e,
  selected: n,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: i,
  customSelectedText: s,
  isDisabled: w,
  sortSelected: p,
  icon: c,
  className: m,
  badgesPlaceholder: g
}) {
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      yo,
      {
        entries: t,
        getEntriesCount: e,
        selected: n,
        onChange: a,
        placeholder: o,
        commandEmptyMessage: i,
        customSelectedText: s,
        isDisabled: w,
        sortSelected: p,
        icon: c,
        className: m
      }
    ),
    n.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((h) => {
      var f;
      return /* @__PURE__ */ l(me, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          D,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => a(n.filter((b) => b !== h)),
            children: /* @__PURE__ */ r(Ue, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (f = t.find((b) => b.value === h)) == null ? void 0 : f.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(Q, { children: g })
  ] });
}
function No({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], i = H(() => {
    const s = [];
    return t.forEach((w) => {
      s.some((p) => We(p, w)) || s.push(w);
    }), s;
  }, [t]);
  return /* @__PURE__ */ l(Ne, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(ke, { stickyHeader: !0, children: /* @__PURE__ */ l(kt, { children: [
      /* @__PURE__ */ r(ae, { children: a }),
      /* @__PURE__ */ r(ae, { children: o })
    ] }) }),
    /* @__PURE__ */ r(Ce, { children: i.length > 0 && i.map((s) => /* @__PURE__ */ l(
      kt,
      {
        onClick: () => {
          e(s.reference);
        },
        children: [
          /* @__PURE__ */ r($t, { children: `${L.bookIdToEnglishName(s.reference.book)} ${s.reference.chapterNum}:${s.reference.verseNum}` }),
          /* @__PURE__ */ r($t, { children: s.text })
        ]
      },
      `${s.reference.book} ${s.reference.chapterNum}:${s.reference.verseNum}-${s.text}`
    )) })
  ] });
}
const sn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Be.Root,
  {
    ref: n,
    className: d(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      Be.Indicator,
      {
        className: d("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
sn.displayName = Be.Root.displayName;
const ce = u.forwardRef(
  ({ className: t, type: e, ...n }, a) => /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: d(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: a,
      ...n
    }
  )
);
ce.displayName = "Input";
const nr = _t(
  "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",
  {
    variants: {
      variant: {
        default: "tw-bg-transparent",
        outline: "tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"
      },
      size: {
        default: "tw-h-10 tw-px-3",
        sm: "tw-h-9 tw-px-2.5",
        lg: "tw-h-11 tw-px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), ko = u.forwardRef(({ className: t, variant: e, size: n, ...a }, o) => /* @__PURE__ */ r(
  Pn.Root,
  {
    ref: o,
    className: d(nr({ variant: e, size: n, className: t })),
    ...a
  }
));
ko.displayName = Pn.Root.displayName;
const rr = u.createContext({
  size: "default",
  variant: "default"
}), ar = u.forwardRef(({ className: t, variant: e, size: n, children: a, ...o }, i) => {
  const s = et();
  return /* @__PURE__ */ r(
    be.Root,
    {
      ref: i,
      className: d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: s,
      children: /* @__PURE__ */ r(
        rr.Provider,
        {
          value: { variant: e, size: n },
          children: a
        }
      )
    }
  );
});
ar.displayName = be.Root.displayName;
const pe = u.forwardRef(({ className: t, children: e, variant: n, size: a, ...o }, i) => {
  const s = u.useContext(rr);
  return /* @__PURE__ */ r(
    be.Item,
    {
      ref: i,
      className: d(
        nr({
          variant: s.variant || n,
          size: s.size || a
        }),
        t
      ),
      ...o,
      children: e
    }
  );
});
pe.displayName = be.Item.displayName;
const _e = (t) => t === "asc" ? /* @__PURE__ */ r(ea, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(na, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(ra, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Ni = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ l(D, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    _e(e.getIsSorted())
  ] })
}), Co = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ l(D, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    _e(n.getIsSorted())
  ] })
}), ki = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ l(D, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    _e(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), De = (t, e, n, a, o, i) => {
  let s = [...n];
  t.forEach((p) => {
    e === "approved" ? s.includes(p) || s.push(p) : s = s.filter((c) => c !== p);
  }), a(s);
  let w = [...o];
  t.forEach((p) => {
    e === "unapproved" ? w.includes(p) || w.push(p) : w = w.filter((c) => c !== p);
  }), i(w);
}, Ci = (t, e, n, a, o) => ({
  accessorKey: "status",
  header: ({ column: i }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ l(D, { variant: "ghost", onClick: () => i.toggleSorting(void 0), children: [
    t,
    _e(i.getIsSorted())
  ] }) }),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), w = i.getValue("item");
    return /* @__PURE__ */ l(ar, { value: s, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
        pe,
        {
          onClick: (p) => {
            p.stopPropagation(), De(
              [w],
              "approved",
              e,
              n,
              a,
              o
            );
          },
          value: "approved",
          children: /* @__PURE__ */ r(Zr, {})
        }
      ),
      /* @__PURE__ */ r(
        pe,
        {
          onClick: (p) => {
            p.stopPropagation(), De(
              [w],
              "unapproved",
              e,
              n,
              a,
              o
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ r(Qr, {})
        }
      ),
      /* @__PURE__ */ r(
        pe,
        {
          onClick: (p) => {
            p.stopPropagation(), De(
              [w],
              "unknown",
              e,
              n,
              a,
              o
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(ta, {})
        }
      )
    ] });
  }
}), _i = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Si = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Ri = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, _o = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ti = Object.freeze([
  "%webView_inventory_all%",
  "%webView_inventory_approved%",
  "%webView_inventory_unapproved%",
  "%webView_inventory_unknown%",
  "%webView_inventory_scope_currentBook%",
  "%webView_inventory_scope_chapter%",
  "%webView_inventory_scope_verse%",
  "%webView_inventory_filter_text%",
  "%webView_inventory_show_additional_items%",
  "%webView_inventory_occurrences_table_header_reference%",
  "%webView_inventory_occurrences_table_header_occurrence%"
]), So = (t, e, n) => {
  let a = t;
  return e !== "all" && (a = a.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (a = a.filter((o) => o.items[0].includes(n))), a;
}, Ro = (t, e, n) => {
  const a = [];
  return t.forEach((o) => {
    const i = a.find(
      (s) => We(
        s.items,
        Te(o.inventoryText) ? [o.inventoryText] : o.inventoryText
      )
    );
    if (i)
      i.count += 1, i.occurrences.push({
        reference: o.verseRef,
        text: o.verse
      });
    else {
      const s = {
        items: Te(o.inventoryText) ? [o.inventoryText] : o.inventoryText,
        count: 1,
        status: _o(
          Te(o.inventoryText) ? o.inventoryText : o.inventoryText[0],
          e,
          n
        ),
        occurrences: [
          {
            reference: o.verseRef,
            text: o.verse
          }
        ]
      };
      a.push(s);
    }
  }), a;
}, xt = (t, e) => t[e] ?? e;
function Ei({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: a,
  approvedItems: o,
  unapprovedItems: i,
  scope: s,
  onScopeChange: w,
  columns: p
}) {
  const c = xt(n, "%webView_inventory_all%"), m = xt(n, "%webView_inventory_approved%"), g = xt(n, "%webView_inventory_unapproved%"), h = xt(n, "%webView_inventory_unknown%"), f = xt(n, "%webView_inventory_scope_currentBook%"), b = xt(n, "%webView_inventory_scope_chapter%"), v = xt(n, "%webView_inventory_scope_verse%"), x = xt(n, "%webView_inventory_filter_text%"), C = xt(
    n,
    "%webView_inventory_show_additional_items%"
  ), [y, M] = I(!1), [B, W] = I("all"), [Y, gt] = I(""), [k, T] = I([]), rt = H(() => t.length === 0 ? [] : Ro(t, o, i), [t, o, i]), P = H(() => {
    if (y) return rt;
    const S = [];
    return rt.forEach((Z) => {
      const ot = Z.items[0], q = S.find(
        (bt) => bt.items[0] === ot
      );
      q ? (q.count += Z.count, q.occurrences = q.occurrences.concat(Z.occurrences)) : S.push({
        items: [ot],
        count: Z.count,
        occurrences: Z.occurrences,
        status: Z.status
      });
    }), S;
  }, [y, rt]), _ = H(() => So(P, B, Y), [P, B, Y]), Yt = H(() => {
    var ot, q;
    if (!y) return p;
    const S = (ot = a == null ? void 0 : a.tableHeaders) == null ? void 0 : ot.length;
    if (!S) return p;
    const Z = [];
    for (let bt = 0; bt < S; bt++)
      Z.push(
        Co(
          ((q = a == null ? void 0 : a.tableHeaders) == null ? void 0 : q[bt]) || "Additional Item",
          bt + 1
        )
      );
    return [...Z, ...p];
  }, [a == null ? void 0 : a.tableHeaders, p, y]);
  Mt(() => {
    _.length === 0 ? T([]) : _.length === 1 && T(_[0].items);
  }, [_]);
  const R = (S, Z) => {
    Z.setRowSelection(() => {
      const ot = {};
      return ot[S.index] = !0, ot;
    }), T(S.original.items);
  }, tt = (S) => {
    if (S === "book" || S === "chapter" || S === "verse")
      w(S);
    else
      throw new Error(`Invalid scope value: ${S}`);
  }, U = (S) => {
    if (S === "all" || S === "approved" || S === "unapproved" || S === "unknown")
      W(S);
    else
      throw new Error(`Invalid status filter value: ${S}`);
  }, j = H(() => {
    if (P.length === 0 || k.length === 0) return [];
    const S = P.filter((Z) => We(
      y ? Z.items : [Z.items[0]],
      k
    ));
    if (S.length > 1) throw new Error("Selected item is not unique");
    return S.length === 0 ? [] : S[0].occurrences;
  }, [k, y, P]);
  return /* @__PURE__ */ l("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ l(
        Bt,
        {
          onValueChange: (S) => U(S),
          defaultValue: B,
          children: [
            /* @__PURE__ */ r(It, { className: "tw-m-1", children: /* @__PURE__ */ r(jt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ l(Ot, { children: [
              /* @__PURE__ */ r(ct, { value: "all", children: c }),
              /* @__PURE__ */ r(ct, { value: "approved", children: m }),
              /* @__PURE__ */ r(ct, { value: "unapproved", children: g }),
              /* @__PURE__ */ r(ct, { value: "unknown", children: h })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l(Bt, { onValueChange: (S) => tt(S), defaultValue: s, children: [
        /* @__PURE__ */ r(It, { className: "tw-m-1", children: /* @__PURE__ */ r(jt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ l(Ot, { children: [
          /* @__PURE__ */ r(ct, { value: "book", children: f }),
          /* @__PURE__ */ r(ct, { value: "chapter", children: b }),
          /* @__PURE__ */ r(ct, { value: "verse", children: v })
        ] })
      ] }),
      /* @__PURE__ */ r(
        ce,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: x,
          value: Y,
          onChange: (S) => {
            gt(S.target.value);
          }
        }
      ),
      a && /* @__PURE__ */ l("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          sn,
          {
            className: "tw-m-1",
            checked: y,
            onCheckedChange: (S) => {
              M(S);
            }
          }
        ),
        /* @__PURE__ */ r(Q, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (a == null ? void 0 : a.checkboxText) ?? C })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      ho,
      {
        columns: Yt,
        data: _,
        onRowClickHandler: R,
        stickyHeader: !0
      }
    ) }),
    j.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      No,
      {
        occurrenceData: j,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const wn = u.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...a }, o) => /* @__PURE__ */ r(
  Bn.Root,
  {
    ref: o,
    decorative: n,
    orientation: e,
    className: d(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...a
  }
));
wn.displayName = Bn.Root.displayName;
function _n({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const ln = oe.Provider, dn = oe.Root, cn = oe.Trigger, Se = u.forwardRef(({ className: t, sideOffset: e = 4, ...n }, a) => /* @__PURE__ */ r(
  oe.Content,
  {
    ref: a,
    sideOffset: e,
    className: d(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
Se.displayName = oe.Content.displayName;
const To = "16rem", Eo = "3rem", or = u.createContext(void 0);
function Re() {
  const t = u.useContext(or);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const sr = u.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: a,
    style: o,
    children: i,
    side: s = "primary",
    ...w
  }, p) => {
    const [c, m] = u.useState(t), g = e ?? c, h = u.useCallback(
      (M) => {
        const B = typeof M == "function" ? M(g) : M;
        n ? n(B) : m(B);
      },
      [n, g]
    ), f = u.useCallback(() => h((M) => !M), [h]), b = g ? "expanded" : "collapsed", C = et() === "ltr" ? s : s === "primary" ? "secondary" : "primary", y = u.useMemo(
      () => ({
        state: b,
        open: g,
        setOpen: h,
        toggleSidebar: f,
        side: C
      }),
      [b, g, h, f, C]
    );
    return /* @__PURE__ */ r(or.Provider, { value: y, children: /* @__PURE__ */ r(ln, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": To,
            "--sidebar-width-icon": Eo,
            ...o
          }
        ),
        className: d(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          a
        ),
        ref: p,
        ...w,
        children: i
      }
    ) }) });
  }
);
sr.displayName = "SidebarProvider";
const ir = u.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: a, ...o }, i) => {
  const s = Re();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: d(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: i,
      ...o,
      children: a
    }
  ) : /* @__PURE__ */ l(
    "div",
    {
      ref: i,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": s.state,
      "data-collapsible": s.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": s.side,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: d(
              "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=secondary]:tw-rotate-180",
              t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            className: d(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              s.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              n
            ),
            ...o,
            children: /* @__PURE__ */ r(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",
                children: a
              }
            )
          }
        )
      ]
    }
  );
});
ir.displayName = "Sidebar";
const Vo = u.forwardRef(({ className: t, onClick: e, ...n }, a) => {
  const o = Re();
  return /* @__PURE__ */ l(
    D,
    {
      ref: a,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: d("tw-h-7 tw-w-7", t),
      onClick: (i) => {
        e == null || e(i), o.toggleSidebar();
      },
      ...n,
      children: [
        o.side === "primary" ? /* @__PURE__ */ r(aa, {}) : /* @__PURE__ */ r(oa, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Vo.displayName = "SidebarTrigger";
const Mo = u.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: a } = Re();
    return /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        ref: n,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: a,
        title: "Toggle Sidebar",
        className: d(
          "tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex",
          "[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize",
          "[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize",
          "group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar",
          "[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2",
          "[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",
          t
        ),
        ...e
      }
    );
  }
);
Mo.displayName = "SidebarRail";
const wr = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: d(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
wr.displayName = "SidebarInset";
const Do = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ce,
  {
    ref: n,
    "data-sidebar": "input",
    className: d(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
Do.displayName = "SidebarInput";
const Io = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: d("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
Io.displayName = "SidebarHeader";
const Oo = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: d("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
Oo.displayName = "SidebarFooter";
const zo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wn,
  {
    ref: n,
    "data-sidebar": "separator",
    className: d("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
zo.displayName = "SidebarSeparator";
const lr = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: d(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
lr.displayName = "SidebarContent";
const Ge = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
Ge.displayName = "SidebarGroup";
const Le = u.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Xt : "div",
  {
    ref: a,
    "data-sidebar": "group-label",
    className: d(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
Le.displayName = "SidebarGroupLabel";
const Ao = u.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Xt : "button",
  {
    ref: a,
    "data-sidebar": "group-action",
    className: d(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
Ao.displayName = "SidebarGroupAction";
const He = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: d("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
He.displayName = "SidebarGroupContent";
const dr = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
dr.displayName = "SidebarMenu";
const cr = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: d("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
cr.displayName = "SidebarMenuItem";
const Po = _t(
  "tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
  {
    variants: {
      variant: {
        default: "hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",
        outline: "tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "tw-h-8 tw-text-sm",
        sm: "tw-h-7 tw-text-xs",
        lg: "tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), pr = u.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: a = "default",
    tooltip: o,
    className: i,
    ...s
  }, w) => {
    const p = t ? Xt : "button", { state: c } = Re(), m = /* @__PURE__ */ r(
      p,
      {
        ref: w,
        "data-sidebar": "menu-button",
        "data-size": a,
        "data-active": e,
        className: d(Po({ variant: n, size: a }), i),
        ...s
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ l(dn, { children: [
      /* @__PURE__ */ r(cn, { asChild: !0, children: m }),
      /* @__PURE__ */ r(Se, { side: "right", align: "center", hidden: c !== "collapsed", ...o })
    ] })) : m;
  }
);
pr.displayName = "SidebarMenuButton";
const Bo = u.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...a }, o) => /* @__PURE__ */ r(
  e ? Xt : "button",
  {
    ref: o,
    "data-sidebar": "menu-action",
    className: d(
      "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "tw-peer-data-[size=sm]/menu-button:top-1",
      "tw-peer-data-[size=default]/menu-button:top-1.5",
      "tw-peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:tw-hidden",
      n && "tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",
      t
    ),
    ...a
  }
));
Bo.displayName = "SidebarMenuAction";
const jo = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: d(
        "tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground",
        "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "tw-peer-data-[size=sm]/menu-button:top-1",
        "tw-peer-data-[size=default]/menu-button:top-1.5",
        "tw-peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
jo.displayName = "SidebarMenuBadge";
const $o = u.forwardRef(({ className: t, showIcon: e = !1, ...n }, a) => {
  const o = u.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: a,
      "data-sidebar": "menu-skeleton",
      className: d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(_n, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          _n,
          {
            className: "tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: (
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              {
                "--skeleton-width": o
              }
            )
          }
        )
      ]
    }
  );
});
$o.displayName = "SidebarMenuSkeleton";
const Xo = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: d(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
Xo.displayName = "SidebarMenuSub";
const Fo = u.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Fo.displayName = "SidebarMenuSubItem";
const Go = u.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: a, ...o }, i) => /* @__PURE__ */ r(
  t ? Xt : "a",
  {
    ref: i,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: d(
      "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
      "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
      e === "sm" && "tw-text-xs",
      e === "md" && "tw-text-sm",
      "group-data-[collapsible=icon]:tw-hidden",
      a
    ),
    ...o
  }
));
Go.displayName = "SidebarMenuSubButton";
function Lo({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: a,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: w,
  className: p
}) {
  const c = $(
    (h, f) => {
      a(h, f);
    },
    [a]
  ), m = $(
    (h) => {
      const f = n.find((b) => b.projectId === h);
      return f ? f.projectName : h;
    },
    [n]
  ), g = $(
    (h) => !o.projectId && h === o.label,
    [o]
  );
  return /* @__PURE__ */ r(
    ir,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: d("tw-w-96 tw-gap-2 tw-overflow-y-auto", p),
      children: /* @__PURE__ */ l(lr, { children: [
        /* @__PURE__ */ l(Ge, { children: [
          /* @__PURE__ */ r(Le, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(He, { children: /* @__PURE__ */ r(dr, { children: Object.entries(e).map(([h, f]) => /* @__PURE__ */ r(cr, { children: /* @__PURE__ */ r(
            pr,
            {
              onClick: () => c(h),
              isActive: g(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: f })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ l(Ge, { children: [
          /* @__PURE__ */ r(Le, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(He, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            Fe,
            {
              buttonVariant: "ghost",
              buttonClassName: d("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": o == null ? void 0 : o.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: m,
              buttonPlaceholder: w,
              onChange: (h) => {
                const f = m(h);
                c(f, h);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(sa, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const pn = Ye(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: a, className: o, isDisabled: i = !1 }, s) => {
    const w = et();
    return /* @__PURE__ */ l("div", { className: d("tw-relative", { "tw-w-full": a }, o), children: [
      /* @__PURE__ */ r(
        Vn,
        {
          className: d(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": w === "rtl" },
            { "tw-left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        ce,
        {
          ref: s,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (p) => e(p.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ l(
        D,
        {
          variant: "ghost",
          size: "icon",
          className: d(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": w === "rtl" },
            { "tw-right-0": w === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(Ue, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
pn.displayName = "SearchBar";
function Vi({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: a,
  handleSelectSidebarItem: o,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: w,
  extensionsSidebarGroupLabel: p,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: m
}) {
  return /* @__PURE__ */ l("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      pn,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: w,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ l(
      sr,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Lo,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: o,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: p,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: m
            }
          ),
          /* @__PURE__ */ r(wr, { className: "tw-min-w-[215px]", children: a })
        ]
      }
    )
  ] });
}
const Nt = "scrBook", Ho = "scrRef", Et = "source", Yo = "details", Uo = "Scripture Reference", Ko = "Scripture Book", ur = "Type", qo = "Details";
function Jo(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (a) => `${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,
      id: Nt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Uo,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? L.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === Nt ? Wt(o.start) : void 0;
      },
      getGroupingValue: (a) => L.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => Pe(a.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => Wt(a.start),
      id: Ho,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : Wt(o.start);
      },
      sortingFn: (a, o) => Pe(a.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (a) => a.source.displayName,
      id: Et,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? ur : void 0,
      cell: (a) => n || a.row.getIsGrouped() ? a.getValue() : void 0,
      getGroupingValue: (a) => a.source.id,
      sortingFn: (a, o) => a.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => a.detail,
      id: Yo,
      header: (t == null ? void 0 : t.detailsColumnName) ?? qo,
      cell: (a) => a.getValue(),
      enableGrouping: !1
    }
  ];
}
const Wo = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Pe(t.start, t.end) === 0 ? `${Ee(t.start)}+${e}` : `${Ee(t.start)}+${e}-${Ee(t.end)}+${n}`;
}, Sn = (t) => `${Wo({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Mi({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: a,
  scriptureBookGroupName: o,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: w
}) {
  const [p, c] = I([]), [m, g] = I([{ id: Nt, desc: !1 }]), [h, f] = I({}), b = H(
    () => t.flatMap((k) => k.data.map((T) => ({
      ...T,
      source: k.source
    }))),
    [t]
  ), v = H(
    () => Jo(
      {
        scriptureReferenceColumnName: a,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [a, i, s, n]
  );
  Mt(() => {
    p.includes(Et) ? g([
      { id: Et, desc: !1 },
      { id: Nt, desc: !1 }
    ]) : g([{ id: Nt, desc: !1 }]);
  }, [p]);
  const x = On({
    data: b,
    columns: v,
    state: {
      grouping: p,
      sorting: m,
      rowSelection: h
    },
    onGroupingChange: c,
    onSortingChange: g,
    onRowSelectionChange: f,
    getExpandedRowModel: ya(),
    getGroupedRowModel: xa(),
    getCoreRowModel: An(),
    getSortedRowModel: zn(),
    getRowId: Sn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Mt(() => {
    if (w) {
      const k = x.getSelectedRowModel().rowsById, T = Object.keys(k);
      if (T.length === 1) {
        const rt = b.find((P) => Sn(P) === T[0]) || void 0;
        rt && w(rt);
      }
    }
  }, [h, b, w, x]);
  const C = o ?? Ko, y = i ?? ur, M = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${C}`, value: [Nt] },
    { label: `Group by ${y}`, value: [Et] },
    {
      label: `Group by ${C} and ${y}`,
      value: [Nt, Et]
    },
    {
      label: `Group by ${y} and ${C}`,
      value: [Et, Nt]
    }
  ], B = (k) => {
    c(JSON.parse(k));
  }, W = (k, T) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(T);
  }, Y = (k, T) => k.getIsGrouped() ? "" : d("banded-row", T % 2 === 0 ? "even" : "odd"), gt = (k, T, rt) => {
    if (!((k == null ? void 0 : k.length) === 0 || T.depth < rt.column.getGroupedIndex())) {
      if (T.getIsGrouped())
        switch (T.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (T.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ l("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ l(
      Bt,
      {
        value: JSON.stringify(p),
        onValueChange: (k) => {
          B(k);
        },
        children: [
          /* @__PURE__ */ r(It, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(jt, {}) }),
          /* @__PURE__ */ r(Ot, { position: "item-aligned", children: /* @__PURE__ */ r(ro, { children: M.map((k) => /* @__PURE__ */ r(ct, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ l(Ne, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(ke, { children: x.getHeaderGroups().map((k) => /* @__PURE__ */ r(kt, { children: k.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(ae, { colSpan: T.colSpan, className: "top-0 tw-sticky", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ l("div", { children: [
          T.column.getCanGroup() ? /* @__PURE__ */ r(
            D,
            {
              variant: "ghost",
              title: `Toggle grouping by ${T.column.columnDef.header}`,
              onClick: T.column.getToggleGroupingHandler(),
              type: "button",
              children: T.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Qt(T.column.columnDef.header, T.getContext())
        ] }) }, T.id)
      )) }, k.id)) }),
      /* @__PURE__ */ r(Ce, { children: x.getRowModel().rows.map((k, T) => {
        const rt = et();
        return /* @__PURE__ */ r(
          kt,
          {
            "data-state": k.getIsSelected() ? "selected" : "",
            className: d(Y(k, T)),
            onClick: (P) => W(k, P),
            children: k.getVisibleCells().map((P) => {
              if (!(P.getIsPlaceholder() || P.column.columnDef.enableGrouping && !P.getIsGrouped() && (P.column.columnDef.id !== Et || !n)))
                return /* @__PURE__ */ r(
                  $t,
                  {
                    className: d(
                      P.column.columnDef.id,
                      "tw-p-[1px]",
                      gt(p, k, P)
                    ),
                    children: P.getIsGrouped() ? /* @__PURE__ */ l(
                      D,
                      {
                        variant: "link",
                        onClick: k.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          k.getIsExpanded() && /* @__PURE__ */ r(ge, {}),
                          !k.getIsExpanded() && (rt === "ltr" ? /* @__PURE__ */ r(At, {}) : /* @__PURE__ */ r(Ae, {})),
                          " ",
                          Qt(P.column.columnDef.cell, P.getContext()),
                          " (",
                          k.subRows.length,
                          ")"
                        ]
                      }
                    ) : Qt(P.column.columnDef.cell, P.getContext())
                  },
                  P.id
                );
            })
          },
          k.id
        );
      }) })
    ] })
  ] });
}
const un = (t, e) => t.filter((n) => {
  try {
    return Zt(n) === e;
  } catch {
    return !1;
  }
}), mr = (t, e, n) => un(t, e).every((a) => n.includes(a));
function Zo({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: a,
  localizedStrings: o
}) {
  const i = un(e, t).length === 0, s = o["%scripture_section_ot_short%"], w = o["%scripture_section_nt_short%"], p = o["%scripture_section_dc_short%"], c = o["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    D,
    {
      variant: "outline",
      size: "sm",
      onClick: () => a(t),
      className: d(
        mr(e, t, n) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: ga(
        t,
        s,
        w,
        p,
        c
      )
    }
  );
}
const Rn = 5, Ie = 6;
function Qo({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: a,
  localizedBookNames: o
}) {
  const i = a["%webView_book_selector_books_selected%"], s = a["%webView_book_selector_select_books%"], w = a["%webView_book_selector_search_books%"], p = a["%webView_book_selector_select_all%"], c = a["%webView_book_selector_clear_all%"], m = a["%webView_book_selector_no_book_found%"], g = a["%webView_book_selector_more%"], { otLong: h, ntLong: f, dcLong: b, extraLong: v } = Mn(a), [x, C] = I(!1), [y, M] = I(""), B = nt(void 0), W = nt(!1);
  if (t.length !== L.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const Y = H(() => L.allBookIds.filter(
    (R, tt) => t[tt] === "1" && !L.isObsolete(L.bookIdToNumber(R))
  ), [t]), gt = H(() => {
    if (!y.trim()) {
      const U = {
        [A.OT]: [],
        [A.NT]: [],
        [A.DC]: [],
        [A.Extra]: []
      };
      return Y.forEach((j) => {
        const S = Zt(j);
        U[S].push(j);
      }), U;
    }
    const R = Y.filter(
      (U) => Je(U, y, o)
    ), tt = {
      [A.OT]: [],
      [A.NT]: [],
      [A.DC]: [],
      [A.Extra]: []
    };
    return R.forEach((U) => {
      const j = Zt(U);
      tt[j].push(U);
    }), tt;
  }, [Y, y, o]), k = $(
    (R, tt = !1) => {
      if (!tt || !B.current) {
        n(
          e.includes(R) ? e.filter((q) => q !== R) : [...e, R]
        ), B.current = R;
        return;
      }
      const U = Y.findIndex((q) => q === B.current), j = Y.findIndex((q) => q === R);
      if (U === -1 || j === -1) return;
      const [S, Z] = [
        Math.min(U, j),
        Math.max(U, j)
      ], ot = Y.slice(S, Z + 1).map((q) => q);
      n(
        e.includes(R) ? e.filter((q) => !ot.includes(q)) : [.../* @__PURE__ */ new Set([...e, ...ot])]
      );
    },
    [e, n, Y]
  ), T = (R) => {
    k(R, W.current), W.current = !1;
  }, rt = (R, tt) => {
    R.preventDefault(), k(tt, R.shiftKey);
  }, P = $(
    (R) => {
      const tt = un(Y, R).map((U) => U);
      n(
        mr(Y, R, e) ? e.filter((U) => !tt.includes(U)) : [.../* @__PURE__ */ new Set([...e, ...tt])]
      );
    },
    [e, n, Y]
  ), _ = () => {
    n(Y.map((R) => R));
  }, Yt = () => {
    n([]);
  };
  return /* @__PURE__ */ l("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(A).map((R) => /* @__PURE__ */ r(
      Zo,
      {
        section: R,
        availableBookIds: Y,
        selectedBookIds: e,
        onToggle: P,
        localizedStrings: a
      },
      R
    )) }),
    /* @__PURE__ */ l(
      le,
      {
        open: x,
        onOpenChange: (R) => {
          C(R), R || M("");
        },
        children: [
          /* @__PURE__ */ r(de, { asChild: !0, children: /* @__PURE__ */ l(
            D,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": x,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ r(Ke, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Ht, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ l(
            se,
            {
              shouldFilter: !1,
              onKeyDown: (R) => {
                R.key === "Enter" && (W.current = R.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  ie,
                  {
                    placeholder: w,
                    value: y,
                    onValueChange: M
                  }
                ),
                /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(D, { variant: "ghost", size: "sm", onClick: _, children: p }),
                  /* @__PURE__ */ r(D, { variant: "ghost", size: "sm", onClick: Yt, children: c })
                ] }),
                /* @__PURE__ */ l(we, { children: [
                  /* @__PURE__ */ r(ve, { children: m }),
                  Object.values(A).map((R, tt) => {
                    const U = gt[R];
                    if (U.length !== 0)
                      return /* @__PURE__ */ l(En, { children: [
                        /* @__PURE__ */ r(
                          Pt,
                          {
                            heading: Dn(R, h, f, b, v),
                            children: U.map((j) => /* @__PURE__ */ r(
                              Un,
                              {
                                bookId: j,
                                isSelected: e.includes(j),
                                onSelect: () => T(j),
                                onMouseDown: (S) => rt(S, j),
                                section: Zt(j),
                                showCheck: !0,
                                localizedBookNames: o,
                                commandValue: Xe(j, o),
                                className: "tw-flex tw-items-center"
                              },
                              j
                            ))
                          }
                        ),
                        tt < Object.values(A).length - 1 && /* @__PURE__ */ r($n, {})
                      ] }, R);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    e.length > 0 && /* @__PURE__ */ l("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      e.slice(
        0,
        e.length === Ie ? Ie : Rn
      ).map((R) => /* @__PURE__ */ r(me, { className: "hover:tw-bg-secondary", variant: "secondary", children: zt(R, o) }, R)),
      e.length > Ie && /* @__PURE__ */ r(
        me,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - Rn} ${g}`
        }
      )
    ] })
  ] });
}
const Di = Object.freeze([
  "%webView_scope_selector_selected_text%",
  "%webView_scope_selector_current_verse%",
  "%webView_scope_selector_current_chapter%",
  "%webView_scope_selector_current_book%",
  "%webView_scope_selector_choose_books%",
  "%webView_scope_selector_scope%",
  "%webView_scope_selector_select_books%",
  "%webView_book_selector_books_selected%",
  "%webView_book_selector_select_books%",
  "%webView_book_selector_search_books%",
  "%webView_book_selector_select_all%",
  "%webView_book_selector_clear_all%",
  "%webView_book_selector_no_book_found%",
  "%webView_book_selector_more%",
  "%scripture_section_ot_long%",
  "%scripture_section_ot_short%",
  "%scripture_section_nt_long%",
  "%scripture_section_nt_short%",
  "%scripture_section_dc_long%",
  "%scripture_section_dc_short%",
  "%scripture_section_extra_long%",
  "%scripture_section_extra_short%"
]), Rt = (t, e) => t[e] ?? e;
function Ii({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: a,
  selectedBookIds: o,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: w
}) {
  const p = Rt(
    s,
    "%webView_scope_selector_selected_text%"
  ), c = Rt(
    s,
    "%webView_scope_selector_current_verse%"
  ), m = Rt(
    s,
    "%webView_scope_selector_current_chapter%"
  ), g = Rt(s, "%webView_scope_selector_current_book%"), h = Rt(s, "%webView_scope_selector_choose_books%"), f = Rt(s, "%webView_scope_selector_scope%"), b = Rt(s, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: p, id: "scope-selected-text" },
    { value: "verse", label: c, id: "scope-verse" },
    { value: "chapter", label: m, id: "scope-chapter" },
    { value: "book", label: g, id: "scope-book" },
    { value: "selectedBooks", label: h, id: "scope-selected" }
  ], x = e ? v.filter((C) => e.includes(C.value)) : v;
  return /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Q, { children: f }),
      /* @__PURE__ */ r(
        en,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: x.map(({ value: C, label: y, id: M }) => /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(ue, { className: "tw-me-2", value: C, id: M }),
            /* @__PURE__ */ r(Q, { htmlFor: M, children: y })
          ] }, M))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Q, { children: b }),
      /* @__PURE__ */ r(
        Qo,
        {
          availableBookInfo: a,
          selectedBookIds: o,
          onChangeSelectedBookIds: i,
          localizedStrings: s,
          localizedBookNames: w
        }
      )
    ] })
  ] });
}
const Oe = {
  [z("undefined")]: "Ø",
  [z(0)]: "A",
  [z(1)]: "B",
  [z(2)]: "C",
  [z(3)]: "D",
  [z(4)]: "E",
  [z(5)]: "F",
  [z(6)]: "G",
  [z(7)]: "H",
  [z(8)]: "I",
  [z(9)]: "J",
  [z(10)]: "K",
  [z(11)]: "L",
  [z(12)]: "M",
  [z(13)]: "N",
  [z(14)]: "O",
  [z(15)]: "P",
  [z(16)]: "Q",
  [z(17)]: "R",
  [z(18)]: "S",
  [z(19)]: "T",
  [z(20)]: "U",
  [z(21)]: "V",
  [z(22)]: "W",
  [z(23)]: "X",
  [z(24)]: "Y",
  [z(25)]: "Z"
};
function Oi({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: a = {},
  size: o = "sm",
  className: i
}) {
  const s = {
    ...Oe,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([p, c]) => [
          p,
          p === c && p in Oe ? Oe[p] : c
        ]
      )
    )
  }, w = et();
  return /* @__PURE__ */ l(
    Bt,
    {
      value: `${e}`,
      onValueChange: (p) => n(
        p === "undefined" ? void 0 : parseInt(p, 10)
      ),
      children: [
        /* @__PURE__ */ r(It, { size: o, className: d("pr-twp tw-w-auto", i), children: /* @__PURE__ */ r(
          jt,
          {
            placeholder: s[z(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Ot,
          {
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((p) => /* @__PURE__ */ r(ct, { value: `${p}`, children: s[z(p)] }, `${p}`))
          }
        )
      ]
    }
  );
}
function zi({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Ai({
  primary: t,
  secondary: e,
  children: n,
  isLoading: a = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    a ? /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function Pi({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ l("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(wn, {}) : ""
  ] });
}
function hr(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, a]) => "menuItem" in a && a.menuItem === e
  )) == null ? void 0 : n[0];
}
function he({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: d("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const fr = (t, e, n, a) => n ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === n || i === n
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((w) => w.group === i).sort((w, p) => w.order - p.order).map((w) => /* @__PURE__ */ l(dn, { children: [
  /* @__PURE__ */ r(cn, { asChild: !0, children: "command" in w ? /* @__PURE__ */ l(
    Zn,
    {
      onClick: () => {
        a(w);
      },
      children: [
        w.iconPathBefore && /* @__PURE__ */ r(he, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
        w.label,
        w.iconPathAfter && /* @__PURE__ */ r(he, { icon: w.iconPathAfter, menuLabel: w.label })
      ]
    },
    `dropdown-menu-item-${w.label}-${w.command}`
  ) : /* @__PURE__ */ l(Qa, { children: [
    /* @__PURE__ */ r(Jn, { children: w.label }),
    /* @__PURE__ */ r(Za, { children: /* @__PURE__ */ r(Wn, { children: fr(
      t,
      e,
      hr(t, w.id),
      a
    ) }) })
  ] }, `dropdown-menu-sub-${w.label}-${w.id}`) }),
  w.tooltip && /* @__PURE__ */ r(Se, { children: w.tooltip })
] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`))) : void 0;
function Tn({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: a,
  className: o,
  variant: i,
  id: s
}) {
  return /* @__PURE__ */ l(rn, { variant: i, children: [
    /* @__PURE__ */ r(Kn, { "aria-label": n, className: o, asChild: !0, id: s, children: /* @__PURE__ */ r(D, { variant: "ghost", size: "icon", children: a ?? /* @__PURE__ */ r(ia, {}) }) }),
    /* @__PURE__ */ r(xe, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, p]) => typeof w == "boolean" || typeof p == "boolean" ? 0 : w.order - p.order).map(([w], p, c) => /* @__PURE__ */ l(En, { children: [
      /* @__PURE__ */ r(qn, { children: /* @__PURE__ */ r(ln, { children: fr(e.groups, e.items, w, t) }) }),
      p < c.length - 1 && /* @__PURE__ */ r(ye, {})
    ] }, w)) })
  ] });
}
function Bi({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: a,
  id: o,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: w,
  endAreaChildren: p
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      className: d(
        "tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-start tw-justify-between tw-overflow-clip tw-border-b tw-border-border tw-text-foreground tw-@container/toolbar *:tw-p-2",
        i
      ),
      id: o,
      children: [
        n && // div wrapper gets padding instead of the button
        /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
          Tn,
          {
            onSelectMenuItem: t,
            menuData: n,
            tabLabel: "Project",
            icon: /* @__PURE__ */ r(wa, {}),
            className: "tw-h-8 tw-w-8"
          }
        ) }),
        s && /* @__PURE__ */ r("div", { className: "tw-flex tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: s }),
        w && /* @__PURE__ */ r("div", { className: "tw-flex tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: w }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
          a && // div wrapper gets padding instead of the button
          /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
            Tn,
            {
              onSelectMenuItem: e,
              menuData: a,
              tabLabel: "View Info",
              icon: /* @__PURE__ */ r(la, {}),
              className: "tw-h-8"
            }
          ) }),
          p
        ] })
      ]
    }
  );
}
const gr = u.forwardRef(({ className: t, ...e }, n) => {
  const a = et();
  return /* @__PURE__ */ r(
    lt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: a
    }
  );
});
gr.displayName = lt.List.displayName;
const br = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.List,
  {
    ref: n,
    className: d(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
br.displayName = lt.List.displayName;
const ts = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Trigger,
  {
    ref: n,
    ...e,
    className: d(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), vr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Content,
  {
    ref: n,
    className: d(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
vr.displayName = lt.Content.displayName;
function ji({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: a,
  headerTitle: o,
  searchClassName: i
}) {
  return /* @__PURE__ */ l("div", { className: "pr-twp", children: [
    /* @__PURE__ */ l("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ r("h1", { children: o }) : "",
      /* @__PURE__ */ r(
        pn,
        {
          className: i,
          value: e,
          onSearch: n,
          placeholder: a
        }
      )
    ] }),
    /* @__PURE__ */ l(gr, { children: [
      /* @__PURE__ */ r(br, { children: t.map((s) => /* @__PURE__ */ r(ts, { value: s.value, children: s.value }, s.key)) }),
      t.map((s) => /* @__PURE__ */ r(vr, { value: s.value, children: s.content }, s.key))
    ] })
  ] });
}
function es({ ...t }) {
  return /* @__PURE__ */ r(F.Menu, { ...t });
}
function ns({ ...t }) {
  return /* @__PURE__ */ r(F.Sub, { "data-slot": "menubar-sub", ...t });
}
const xr = u.forwardRef(({ className: t, variant: e = "default", ...n }, a) => {
  const o = u.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(nn.Provider, { value: o, children: /* @__PURE__ */ r(
    F.Root,
    {
      ref: a,
      className: d(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...n
    }
  ) });
});
xr.displayName = F.Root.displayName;
const yr = u.forwardRef(({ className: t, ...e }, n) => {
  const a = ut();
  return /* @__PURE__ */ r(
    F.Trigger,
    {
      ref: n,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        yt({ variant: a.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
yr.displayName = F.Trigger.displayName;
const Nr = u.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const i = ut();
  return /* @__PURE__ */ l(
    F.SubTrigger,
    {
      ref: o,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        yt({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(At, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Nr.displayName = F.SubTrigger.displayName;
const kr = u.forwardRef(({ className: t, ...e }, n) => {
  const a = ut();
  return /* @__PURE__ */ r(
    F.SubContent,
    {
      ref: n,
      className: d(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": a.variant === "muted"
        },
        t
      ),
      ...e
    }
  );
});
kr.displayName = F.SubContent.displayName;
const Cr = u.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: a = 8, ...o }, i) => {
  const s = ut();
  return /* @__PURE__ */ r(F.Portal, { children: /* @__PURE__ */ r(
    F.Content,
    {
      ref: i,
      align: e,
      alignOffset: n,
      sideOffset: a,
      className: d(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": s.variant === "muted"
        },
        t
      ),
      ...o
    }
  ) });
});
Cr.displayName = F.Content.displayName;
const _r = u.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = ut();
  return /* @__PURE__ */ r(
    F.Item,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        yt({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
_r.displayName = F.Item.displayName;
const rs = u.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const i = ut();
  return /* @__PURE__ */ l(
    F.CheckboxItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        yt({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(F.ItemIndicator, { children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
rs.displayName = F.CheckboxItem.displayName;
const as = u.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = ut();
  return /* @__PURE__ */ l(
    F.RadioItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        yt({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(F.ItemIndicator, { children: /* @__PURE__ */ r(fe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
as.displayName = F.RadioItem.displayName;
const os = u.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  F.Label,
  {
    ref: a,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
os.displayName = F.Label.displayName;
const Sr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  F.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Sr.displayName = F.Separator.displayName;
const qt = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var a;
      (a = t.current) == null || a.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Rr = (t, e, n, a) => {
  if (!n) return;
  const o = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === n || i === n
  ).sort(([, i], [, s]) => i.order - s.order);
  return o.flatMap(([i], s) => {
    const w = e.filter((c) => c.group === i).sort((c, m) => c.order - m.order).map((c) => /* @__PURE__ */ l(dn, { children: [
      /* @__PURE__ */ r(cn, { asChild: !0, children: "command" in c ? /* @__PURE__ */ l(
        _r,
        {
          onClick: () => {
            a(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(he, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(he, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ l(ns, { children: [
        /* @__PURE__ */ r(Nr, { children: c.label }),
        /* @__PURE__ */ r(kr, { children: Rr(
          t,
          e,
          hr(t, c.id),
          a
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(Se, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), p = [...w];
    return w.length > 0 && s < o.length - 1 && p.push(/* @__PURE__ */ r(Sr, {}, `separator-${i}`)), p;
  });
};
function ss({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: a
}) {
  const o = nt(void 0), i = nt(void 0), s = nt(void 0), w = nt(void 0), p = nt(void 0), c = (m) => {
    switch (m) {
      case "platform.app":
        return i;
      case "platform.window":
        return s;
      case "platform.layout":
        return w;
      case "platform.help":
        return p;
      default:
        return;
    }
  };
  if (Ca(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (m, g) => {
    var b, v, x, C;
    m.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, f = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (g.hotkey) {
      case "alt":
        qt(i, [h]);
        break;
      case "alt+p":
        (b = i.current) == null || b.focus(), qt(i, [h, f]);
        break;
      case "alt+l":
        (v = s.current) == null || v.focus(), qt(s, [h, f]);
        break;
      case "alt+n":
        (x = w.current) == null || x.focus(), qt(w, [h, f]);
        break;
      case "alt+h":
        (C = p.current) == null || C.focus(), qt(p, [h, f]);
        break;
    }
  }), Mt(() => {
    if (!n || !o.current) return;
    const m = new MutationObserver((f) => {
      f.forEach((b) => {
        if (b.attributeName === "data-state" && b.target instanceof HTMLElement) {
          const v = b.target.getAttribute("data-state");
          n(v === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((f) => {
      m.observe(f, { attributes: !0 });
    }), () => m.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(xr, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, m]) => typeof m == "object").sort(([, m], [, g]) => typeof m == "boolean" || typeof g == "boolean" ? 0 : m.order - g.order).map(([m, g]) => /* @__PURE__ */ l(es, { children: [
      /* @__PURE__ */ r(yr, { ref: c(m), children: typeof g == "object" && "label" in g && g.label }),
      /* @__PURE__ */ r(
        Cr,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(ln, { children: Rr(t.groups, t.items, m, e) })
        }
      )
    ] }, m)) });
}
function $i(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Xi({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: a,
  id: o,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: w,
  shouldUseAsAppDragArea: p,
  menubarVariant: c = "default"
}) {
  const m = nt(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("tw-border tw-px-4 tw-text-foreground", a),
      ref: m,
      style: { position: "relative" },
      id: o,
      children: /* @__PURE__ */ l(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: p ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ l(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: p ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ r(
                    ss,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: n,
                      variant: c
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: p ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: p ? { WebkitAppRegion: "no-drag" } : void 0,
                children: w
              }
            ) })
          ]
        }
      )
    }
  );
}
const is = (t, e) => t[e] ?? e;
function Fi({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: a,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: w
}) {
  const p = is(
    s,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [c, m] = I(!1), g = (f) => {
    o && o(f), a && a([f, ...n.filter((b) => b !== f)]), i && n.find((b) => b === f) && i([...n.filter((b) => b !== f)]), m(!1);
  }, h = (f, b) => {
    var x, C, y, M, B, W;
    const v = b !== f ? ((C = (x = t[f]) == null ? void 0 : x.uiNames) == null ? void 0 : C[b]) ?? ((M = (y = t[f]) == null ? void 0 : y.uiNames) == null ? void 0 : M.en) : void 0;
    return v ? `${(B = t[f]) == null ? void 0 : B.autonym} (${v})` : (W = t[f]) == null ? void 0 : W.autonym;
  };
  return /* @__PURE__ */ l("div", { className: d("pr-twp tw-max-w-sm", w), children: [
    /* @__PURE__ */ l(
      Bt,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: g,
        open: c,
        onOpenChange: (f) => m(f),
        children: [
          /* @__PURE__ */ r(It, { children: /* @__PURE__ */ r(jt, {}) }),
          /* @__PURE__ */ r(
            Ot,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((f) => /* @__PURE__ */ r(ct, { value: f, children: h(f, e) }, f))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ l(te, { children: [
      /* @__PURE__ */ r(Q, { className: "tw-ms-3", children: p }),
      /* @__PURE__ */ r("div", { className: "tw-ms-3", children: /* @__PURE__ */ l(Q, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((f) => h(f, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
function ws({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(Q, { children: e(t) }) : n ? /* @__PURE__ */ r(Q, { children: n(t) }) : /* @__PURE__ */ r(Q, { children: t });
}
function Gi({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: a,
  handleSelectListItem: o,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((w) => /* @__PURE__ */ l("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      sn,
      {
        className: "tw-me-2 tw-align-middle",
        checked: a.includes(w),
        onCheckedChange: (p) => o(w, p)
      }
    ),
    /* @__PURE__ */ r(
      ws,
      {
        item: w,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, w)) });
}
const ls = Ye(({ className: t, ...e }, n) => /* @__PURE__ */ r(da, { size: 35, className: d("tw-animate-spin", t), ...e, ref: n }));
ls.displayName = "Spinner";
function Li({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: a = !1,
  helperText: o,
  label: i,
  placeholder: s,
  isRequired: w = !1,
  className: p,
  defaultValue: c,
  value: m,
  onChange: g,
  onFocus: h,
  onBlur: f
}) {
  return /* @__PURE__ */ l("div", { className: d("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": a }), children: [
    /* @__PURE__ */ r(
      Q,
      {
        htmlFor: t,
        className: d({
          "tw-text-red-600": n,
          "tw-hidden": !i
        }),
        children: `${i}${w ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      ce,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: w,
        className: d(p, { "tw-border-red-600": n }),
        defaultValue: c,
        value: m,
        onChange: g,
        onFocus: h,
        onBlur: f
      }
    ),
    /* @__PURE__ */ r("p", { className: d({ "tw-hidden": !o }), children: o })
  ] });
}
const ds = _t(
  // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can use
  // images (or svgs from file) as icons
  // Implemented by TJ Couch
  // Approved by Alex Mercado
  // 20 February 2025
  "tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",
  {
    variants: {
      variant: {
        default: "tw-bg-background tw-text-foreground",
        destructive: (
          // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can
          // use images (or svgs from file) as icons
          // Implemented by TJ Couch
          // Approved by Alex Mercado
          // 20 February 2025
          "tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"
        )
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), cs = u.forwardRef(({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, role: "alert", className: d(ds({ variant: e }), t), ...n }));
cs.displayName = "Alert";
const ps = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ l(
    "h5",
    {
      ref: n,
      className: d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
ps.displayName = "AlertTitle";
const us = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
us.displayName = "AlertDescription";
const ms = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Root,
  {
    ref: n,
    className: d(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
ms.displayName = Ft.Root.displayName;
const hs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Image,
  {
    ref: n,
    className: d("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
hs.displayName = Ft.Image.displayName;
const fs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Fallback,
  {
    ref: n,
    className: d(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
fs.displayName = Ft.Fallback.displayName;
const gs = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
gs.displayName = "Card";
const bs = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
bs.displayName = "CardHeader";
const vs = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "h3",
    {
      ref: n,
      className: d(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
vs.displayName = "CardTitle";
const xs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: d("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
xs.displayName = "CardDescription";
const ys = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
ys.displayName = "CardContent";
const Ns = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Ns.displayName = "CardFooter";
const Hi = G.Root, Yi = G.Trigger, Ui = G.Group, Ki = G.Portal, qi = G.Sub, Ji = G.RadioGroup, ks = u.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => /* @__PURE__ */ l(
  G.SubTrigger,
  {
    ref: o,
    className: d(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      e && "tw-pl-8",
      t
    ),
    ...a,
    children: [
      n,
      /* @__PURE__ */ r(At, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
ks.displayName = G.SubTrigger.displayName;
const Cs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.SubContent,
  {
    ref: n,
    className: d(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Cs.displayName = G.SubContent.displayName;
const _s = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(G.Portal, { children: /* @__PURE__ */ r(
  G.Content,
  {
    ref: n,
    className: d(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
_s.displayName = G.Content.displayName;
const Ss = u.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  G.Item,
  {
    ref: a,
    className: d(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
Ss.displayName = G.Item.displayName;
const Rs = u.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => /* @__PURE__ */ l(
  G.CheckboxItem,
  {
    ref: o,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...a,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
Rs.displayName = G.CheckboxItem.displayName;
const Ts = u.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ l(
  G.RadioItem,
  {
    ref: a,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(fe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Ts.displayName = G.RadioItem.displayName;
const Es = u.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  G.Label,
  {
    ref: a,
    className: d(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
Es.displayName = G.Label.displayName;
const Vs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Vs.displayName = G.Separator.displayName;
function Ms({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: d("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Ms.displayName = "ContextMenuShortcut";
const Tr = u.createContext({
  direction: "bottom"
});
function Ds({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const a = u.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Tr.Provider, { value: a, children: /* @__PURE__ */ r(
    pt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
Ds.displayName = "Drawer";
const Wi = pt.Trigger, Is = pt.Portal, Zi = pt.Close, Er = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  pt.Overlay,
  {
    ref: n,
    className: d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Er.displayName = pt.Overlay.displayName;
const Os = u.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...a }, o) => {
  const { direction: i = "bottom" } = u.useContext(Tr), s = {
    bottom: "tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",
    top: "tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",
    left: "tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",
    right: "tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"
  }, w = {
    bottom: "tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    top: "tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    left: "tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",
    right: "tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"
  };
  return /* @__PURE__ */ l(Is, { children: [
    /* @__PURE__ */ r(Er, {}),
    /* @__PURE__ */ l(
      pt.Content,
      {
        ref: o,
        className: d(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          i === "bottom" || i === "top" ? "tw-flex-col" : "tw-flex-row",
          s[i],
          t
        ),
        ...a,
        children: [
          !n && (i === "bottom" || i === "right") && /* @__PURE__ */ r("div", { className: w[i] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: e }),
          !n && (i === "top" || i === "left") && /* @__PURE__ */ r("div", { className: w[i] })
        ]
      }
    )
  ] });
});
Os.displayName = "DrawerContent";
function zs({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
zs.displayName = "DrawerHeader";
function As({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
As.displayName = "DrawerFooter";
const Ps = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  pt.Title,
  {
    ref: n,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Ps.displayName = pt.Title.displayName;
const Bs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  pt.Description,
  {
    ref: n,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Bs.displayName = pt.Description.displayName;
const js = u.forwardRef(({ className: t, value: e, ...n }, a) => /* @__PURE__ */ r(
  je.Root,
  {
    ref: a,
    className: d(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      je.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
js.displayName = je.Root.displayName;
function Qi({ ...t }) {
  return /* @__PURE__ */ r(
    _a,
    {
      className: "tw-toaster tw-group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...t
    }
  );
}
const $s = u.forwardRef(({ className: t, ...e }, n) => {
  const a = et();
  return /* @__PURE__ */ l(
    Jt.Root,
    {
      ref: n,
      className: d(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: a,
      children: [
        /* @__PURE__ */ r(Jt.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Jt.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Jt.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
$s.displayName = Jt.Root.displayName;
const Xs = u.forwardRef(({ className: t, ...e }, n) => {
  const a = et();
  return /* @__PURE__ */ r(
    $e.Root,
    {
      className: d(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        $e.Thumb,
        {
          className: d(
            "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",
            {
              "data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0": a === "ltr"
            },
            {
              "data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0": a === "rtl"
            }
          )
        }
      )
    }
  );
});
Xs.displayName = $e.Root.displayName;
const tw = lt.Root, Fs = u.forwardRef(({ className: t, ...e }, n) => {
  const a = et();
  return /* @__PURE__ */ r(
    lt.List,
    {
      ref: n,
      className: d(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: a
    }
  );
});
Fs.displayName = lt.List.displayName;
const Gs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Trigger,
  {
    ref: n,
    className: d(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Gs.displayName = lt.Trigger.displayName;
const Ls = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Content,
  {
    ref: n,
    className: d(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Ls.displayName = lt.Content.displayName;
const Hs = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: d(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: n,
      ...e
    }
  )
);
Hs.displayName = "Textarea";
const ew = (t, e) => {
  Mt(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Ys(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Us = (t, e, n = {}) => {
  const a = nt(e);
  a.current = e;
  const o = nt(n);
  o.current = Ys(o.current);
  const [i, s] = I(() => a.current), [w, p] = I(!0);
  return Mt(() => {
    let c = !0;
    return p(!!t), (async () => {
      if (t) {
        const m = await t();
        c && (s(() => m), p(!1));
      }
    })(), () => {
      c = !1, o.current.preserveValue || s(() => a.current);
    };
  }, [t]), [i, w];
}, ze = () => !1, nw = (t, e) => {
  const [n] = Us(
    $(async () => {
      if (!t) return ze;
      const a = await Promise.resolve(t(e));
      return async () => a();
    }, [e, t]),
    ze,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Mt(() => () => {
    n !== ze && n();
  }, [n]);
}, rw = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: a
}) => {
  const o = nt(null), [i, s] = I(void 0), [w, p] = I(void 0), c = $(
    (h) => {
      s(h);
      const f = t.find((v) => v.id === h);
      f && (e == null || e(f));
      const b = document.getElementById(h);
      b && (b.scrollIntoView({ block: "center" }), b.focus()), o.current && o.current.setAttribute("aria-activedescendant", h);
    },
    [e, t]
  ), m = $(
    (h) => {
      const f = t.find((b) => b.id === h);
      f && (p((b) => b === h ? void 0 : h), n == null || n(f));
    },
    [n, t]
  ), g = $(
    (h) => {
      const f = t.findIndex((x) => x.id === i);
      let b = f;
      switch (h.key) {
        case "ArrowDown":
          b = Math.min(f + 1, t.length - 1), h.preventDefault();
          break;
        case "ArrowUp":
          b = Math.max(f - 1, 0), h.preventDefault();
          break;
        case "Home":
          b = 0, h.preventDefault();
          break;
        case "End":
          b = t.length - 1, h.preventDefault();
          break;
        case " ":
        case "Enter":
          i && m(i), h.preventDefault(), h.stopPropagation();
          return;
        default:
          h.key.length === 1 && !h.metaKey && !h.ctrlKey && !h.altKey && (a == null || a(h.key), h.preventDefault());
          return;
      }
      const v = t[b];
      v && c(v.id);
    },
    [t, c, i, m, a]
  );
  return {
    listboxRef: o,
    activeId: i,
    selectedId: w,
    handleKeyDown: g,
    focusOption: c
  };
};
function Ks(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), a = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && a ? n.insertBefore(o, a) : n.appendChild(o);
}
Ks(`.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
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
}/*
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
[hidden]:where(:not([hidden="until-found"])):where(.pr-twp,.pr-twp *) {
  display: none;
}
  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds tw-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /**
   * Theme colors and other CSS variable properties in Platform.Bible. These are applied in CSS
   * properties using \`hsl(var(--variableName))\` or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%; /* black */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%; /* black */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* black */
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* black */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* black */
    --sidebar-primary: 222.2 47.4% 11.2%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* black */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* black */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* black */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* black */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%;

    --sidebar-background: 222.2 84% 4.9%; /* black */
    --sidebar-foreground: 215 20.2% 65.1%;
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%;
    --sidebar-accent-foreground: 215 20.2% 65.1%;
    --sidebar-border: 217.2 32.6% 17.5%;
    --sidebar-ring: 212.7 26.8% 83.9%;
  }

  /* using color palette https://supercolorpalette.com/?scp=G0-hsl-99827A-E7DDD0-FEF4E7-FEFAF1-FFFFFF-D8E9E3-719892-07463D-0A433D-083030-041616-000000-85DBB8-F2F52E-CD3737 */
  .paratext-light {
    --background: 0 0% 100%; /* white */
    --foreground: 0 0% 0%; /* black */
    --muted: 33.9 32.4% 86.1%; /* paratext light brown */
    --muted-foreground: 15.5 13.2% 53.9%; /*paratext brown */
    --popover: 40 20% 98%; /* popover paratext */
    --popover-foreground: 0 0% 0%; /* black */
    --card: 0 0% 100%; /* white */
    --card-foreground: 0 0% 0%; /* black */
    --border: 220 13% 91%; /* border */
    --input: 161.3 26.7% 88.2%; /* paratext light green */
    --primary: 173.4 82.1% 15.3%; /* paratext dark green */
    --primary-foreground: 40 85.7% 97.3%; /* paratext sand */
    --secondary: 161.3 26.7% 88.2%; /* paratext light green */
    --secondary-foreground: 173.4 82.1% 15.3%; /* paratext dark green */
    --accent: 161.3 26.7% 88.2%; /* paratext light green */
    --accent-foreground: 173.4 82.1% 15.3%; /* paratext dark green */
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 15.5 13.2% 53.9%; /*paratext brown */

    --sidebar-background: 40 20% 98%; /* popover paratext */
    --sidebar-foreground: 12 10.95% 26.86%; /* dark brown */
    --sidebar-primary: 173.4 82.1% 15.3%; /* paratext dark green */
    --sidebar-primary-foreground: 40 85.7% 97.3%; /* paratext sand */
    --sidebar-accent: 33.9 32.4% 86.1%; /* paratext light brown */
    --sidebar-accent-foreground: 0 0% 0%; /* black */
    --sidebar-border: 220 13% 91%; /* border */
    --sidebar-ring: 15.5 13.2% 53.9%; /*paratext brown */
  }

  .paratext-dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --muted: 15.5 13.2% 53.9%;
    --muted-foreground: 33.9 32.4% 86.1%;
    --popover: 180 71.4% 5%;
    --popover-foreground: 0 0% 100%;
    --card: 0 0% 0%;
    --card-foreground: 0 0% 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
    --primary: 161.3 26.7% 88.2%;
    --primary-foreground: 173.4 82.1% 15.3%;
    --secondary: 180 71.4% 11%;
    --secondary-foreground: 161.3 26.7% 88.2%;
    --accent: 180 71.4% 11%;
    --accent-foreground: 161.3 26.7% 88.2%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;

    --sidebar-background: 180 71.4% 5%;
    --sidebar-foreground: 33.9 32.4% 86.1%;
    --sidebar-primary: 161.3 26.7% 88.2%;
    --sidebar-primary-foreground: 173.4 82.1% 15.3%;
    --sidebar-accent: 15.5 13.2% 53.9%;
    --sidebar-accent-foreground: 33.9 32.4% 86.1%;
    --sidebar-border: 220 13% 20%;
    --sidebar-ring: 15.5 13.2% 53.9%;
  }
  .pr-twp,
  .pr-twp * {
  border-color: hsl(var(--border));
  outline-color: hsl(var(--ring) / 0.5);
}

  /**
    * disabled because tslint does not like it, but it is the selector that's needed
    */
  /* stylelint-disable-next-line selector-no-qualifying-type */
  body.pr-twp {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
.tw-prose {
  color: var(--tw-prose-body);
  max-width: 65ch;
}
.tw-prose :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.tw-prose :where(a):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
.tw-prose :where(strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.tw-prose :where(a strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol[type="A"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="A" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="I"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="I" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="1"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
}
.tw-prose :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: disc;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  font-weight: 400;
  color: var(--tw-prose-counters);
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.tw-prose :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.25em;
}
.tw-prose :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}
.tw-prose :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-style: italic;
  color: var(--tw-prose-quotes);
  border-inline-start-width: 0.25rem;
  border-inline-start-color: var(--tw-prose-quote-borders);
  quotes: "0o201C""0o201D""0o2018""0o2019";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-inline-start: 1em;
}
.tw-prose :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: open-quote;
}
.tw-prose :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: close-quote;
}
.tw-prose :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.tw-prose :where(h1 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 900;
  color: inherit;
}
.tw-prose :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.tw-prose :where(h2 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 800;
  color: inherit;
}
.tw-prose :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.tw-prose :where(h3 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.5;
}
.tw-prose :where(h4 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-family: inherit;
  color: var(--tw-prose-kbd);
  box-shadow: 0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);
  font-size: 0.875em;
  border-radius: 0.3125rem;
  padding-top: 0.1875em;
  padding-inline-end: 0.375em;
  padding-bottom: 0.1875em;
  padding-inline-start: 0.375em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-code);
  font-weight: 600;
  font-size: 0.875em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: "\`";
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: "\`";
}
.tw-prose :where(a code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h1 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.tw-prose :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.tw-prose :where(h4 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-pre-code);
  background-color: var(--tw-prose-pre-bg);
  overflow-x: auto;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding-top: 0.8571429em;
  padding-inline-end: 1.1428571em;
  padding-bottom: 0.8571429em;
  padding-inline-start: 1.1428571em;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: inherit;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-prose :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  width: 100%;
  table-layout: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}
.tw-prose :where(thead):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-th-borders);
}
.tw-prose :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  vertical-align: bottom;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody tr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-td-borders);
}
.tw-prose :where(tbody tr:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 0;
}
.tw-prose :where(tbody td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: baseline;
}
.tw-prose :where(tfoot):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-top-width: 1px;
  border-top-color: var(--tw-prose-th-borders);
}
.tw-prose :where(tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: top;
}
.tw-prose :where(th, td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  text-align: start;
}
.tw-prose :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.tw-prose {
  --tw-prose-body: hsl(var(--foreground));
  --tw-prose-headings: hsl(var(--foreground));
  --tw-prose-lead: hsl(var(--muted-foreground));
  --tw-prose-links: hsl(var(--primary));
  --tw-prose-bold: hsl(var(--foreground));
  --tw-prose-counters: hsl(var(--muted-foreground));
  --tw-prose-bullets: hsl(var(--muted-foreground));
  --tw-prose-hr: hsl(var(--border));
  --tw-prose-quotes: hsl(var(--foreground));
  --tw-prose-quote-borders: hsl(var(--border));
  --tw-prose-captions: hsl(var(--muted-foreground));
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: hsl(var(--foreground));
  --tw-prose-pre-code: hsl(var(--muted-foreground));
  --tw-prose-pre-bg: hsl(var(--muted));
  --tw-prose-th-borders: hsl(var(--border));
  --tw-prose-td-borders: hsl(var(--border));
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-kbd: #fff;
  --tw-prose-invert-kbd-shadows: 255 255 255;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}
.tw-prose :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(.tw-prose > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(.tw-prose > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.5714286em;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(.tw-prose > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(.tw-prose > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-sr-only {
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
.tw-pointer-events-none {
  pointer-events: none;
}
.tw-fixed {
  position: fixed;
}
.tw-absolute {
  position: absolute;
}
.tw-relative {
  position: relative;
}
.tw-sticky {
  position: sticky;
}
.tw-inset-0 {
  inset: 0px;
}
.tw-inset-x-0 {
  left: 0px;
  right: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw-bottom-0 {
  bottom: 0px;
}
.tw-bottom-2 {
  bottom: 0.5rem;
}
.tw-left-0 {
  left: 0px;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-3 {
  left: 0.75rem;
}
.tw-left-4 {
  left: 1rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-0 {
  right: 0px;
}
.tw-right-1 {
  right: 0.25rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-start-2 {
  inset-inline-start: 0.5rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\.5 {
  top: 0.375rem;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-3\\.5 {
  top: 0.875rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[-1px\\] {
  top: -1px;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-20 {
  z-index: 20;
}
.tw-z-30 {
  z-index: 30;
}
.tw-z-50 {
  z-index: 50;
}
.tw-z-\\[1000\\] {
  z-index: 1000;
}
.tw-z-\\[250\\] {
  z-index: 250;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw-m-4 {
  margin: 1rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.tw-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.tw-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.tw-mx-3\\.5 {
  margin-left: 0.875rem;
  margin-right: 0.875rem;
}
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.tw-my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-24 {
  margin-bottom: 6rem;
}
.tw-mb-4 {
  margin-bottom: 1rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-24 {
  margin-left: 6rem;
}
.tw-ml-4 {
  margin-left: 1rem;
}
.tw-ml-auto {
  margin-left: auto;
}
.tw-mr-2 {
  margin-right: 0.5rem;
}
.tw-mr-24 {
  margin-right: 6rem;
}
.tw-mr-4 {
  margin-right: 1rem;
}
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-3 {
  margin-inline-start: 0.75rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
}
.tw-mt-1 {
  margin-top: 0.25rem;
}
.tw-mt-2 {
  margin-top: 0.5rem;
}
.tw-mt-24 {
  margin-top: 6rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-flex {
  display: flex;
}
.tw-inline-flex {
  display: inline-flex;
}
.tw-grid {
  display: grid;
}
.tw-inline-grid {
  display: inline-grid;
}
.tw-hidden {
  display: none;
}
.tw-aspect-square {
  aspect-ratio: 1 / 1;
}
.tw-size-4 {
  width: 1rem;
  height: 1rem;
}
.tw-h-1\\/2 {
  height: 50%;
}
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
}
.tw-h-14 {
  height: 3.5rem;
}
.tw-h-2 {
  height: 0.5rem;
}
.tw-h-2\\.5 {
  height: 0.625rem;
}
.tw-h-20 {
  height: 5rem;
}
.tw-h-24 {
  height: 6rem;
}
.tw-h-3 {
  height: 0.75rem;
}
.tw-h-3\\.5 {
  height: 0.875rem;
}
.tw-h-32 {
  height: 8rem;
}
.tw-h-4 {
  height: 1rem;
}
.tw-h-40 {
  height: 10rem;
}
.tw-h-5 {
  height: 1.25rem;
}
.tw-h-6 {
  height: 1.5rem;
}
.tw-h-7 {
  height: 1.75rem;
}
.tw-h-8 {
  height: 2rem;
}
.tw-h-9 {
  height: 2.25rem;
}
.tw-h-96 {
  height: 24rem;
}
.tw-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.tw-h-\\[100\\%\\] {
  height: 100%;
}
.tw-h-\\[100px\\] {
  height: 100px;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[405px\\] {
  height: 405px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-auto {
  height: auto;
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-h-screen {
  height: 100vh;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-5 {
  max-height: 1.25rem;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[--radix-context-menu-content-available-height\\] {
  max-height: var(--radix-context-menu-content-available-height);
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-\\[80px\\] {
  min-height: 80px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-0 {
  width: 0px;
}
.tw-w-1\\/2 {
  width: 50%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-14 {
  width: 3.5rem;
}
.tw-w-2 {
  width: 0.5rem;
}
.tw-w-2\\.5 {
  width: 0.625rem;
}
.tw-w-20 {
  width: 5rem;
}
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-64 {
  width: 16rem;
}
.tw-w-7 {
  width: 1.75rem;
}
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-80 {
  width: 20rem;
}
.tw-w-9 {
  width: 2.25rem;
}
.tw-w-9\\/12 {
  width: 75%;
}
.tw-w-96 {
  width: 24rem;
}
.tw-w-\\[--sidebar-width\\] {
  width: var(--sidebar-width);
}
.tw-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.tw-w-\\[100px\\] {
  width: 100px;
}
.tw-w-\\[116px\\] {
  width: 116px;
}
.tw-w-\\[124px\\] {
  width: 124px;
}
.tw-w-\\[150px\\] {
  width: 150px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[280px\\] {
  width: 280px;
}
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
}
.tw-w-\\[46px\\] {
  width: 46px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-auto {
  width: auto;
}
.tw-w-full {
  width: 100%;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-16 {
  min-width: 4rem;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-72 {
  min-width: 18rem;
}
.tw-min-w-80 {
  min-width: 20rem;
}
.tw-min-w-\\[12rem\\] {
  min-width: 12rem;
}
.tw-min-w-\\[140px\\] {
  min-width: 140px;
}
.tw-min-w-\\[215px\\] {
  min-width: 215px;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-96 {
  max-width: 24rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-\\[220px\\] {
  max-width: 220px;
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-max-w-md {
  max-width: 28rem;
}
.tw-max-w-none {
  max-width: none;
}
.tw-max-w-sm {
  max-width: 24rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
}
.tw-flex-shrink-0 {
  flex-shrink: 0;
}
.tw-shrink {
  flex-shrink: 1;
}
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-grow-\\[2\\] {
  flex-grow: 2;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
}
.tw-origin-\\[--radix-context-menu-content-transform-origin\\] {
  transform-origin: var(--radix-context-menu-content-transform-origin);
}
.tw--translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-px {
  --tw-translate-x: 1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-0 {
  --tw-scale-x: 0;
  --tw-scale-y: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes tw-pulse {

  50% {
    opacity: .5;
  }
}
.tw-animate-pulse {
  animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes tw-spin {

  to {
    transform: rotate(360deg);
  }
}
.tw-animate-spin {
  animation: tw-spin 1s linear infinite;
}
.tw-cursor-default {
  cursor: default;
}
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-resize {
  resize: both;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-columns-2 {
  columns: 2;
}
.tw-auto-rows-max {
  grid-auto-rows: max-content;
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-flex-row {
  flex-direction: row;
}
.tw-flex-row-reverse {
  flex-direction: row-reverse;
}
.tw-flex-col {
  flex-direction: column;
}
.tw-flex-col-reverse {
  flex-direction: column-reverse;
}
.tw-flex-wrap {
  flex-wrap: wrap;
}
.tw-items-start {
  align-items: flex-start;
}
.tw-items-end {
  align-items: flex-end;
}
.tw-items-center {
  align-items: center;
}
.tw-items-stretch {
  align-items: stretch;
}
.tw-justify-start {
  justify-content: flex-start;
}
.tw-justify-end {
  justify-content: flex-end;
}
.tw-justify-center {
  justify-content: center;
}
.tw-justify-between {
  justify-content: space-between;
}
.tw-gap-0\\.5 {
  gap: 0.125rem;
}
.tw-gap-1 {
  gap: 0.25rem;
}
.tw-gap-1\\.5 {
  gap: 0.375rem;
}
.tw-gap-2 {
  gap: 0.5rem;
}
.tw-gap-2\\.5 {
  gap: 0.625rem;
}
.tw-gap-3 {
  gap: 0.75rem;
}
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-8 {
  gap: 2rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.tw-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.tw-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-divide-x > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-x-reverse: 0;
  border-right-width: calc(1px * var(--tw-divide-x-reverse));
  border-left-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));
}
.tw-divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
}
.tw-overflow-clip {
  overflow: clip;
}
.tw-overflow-y-auto {
  overflow-y: auto;
}
.tw-overflow-x-hidden {
  overflow-x: hidden;
}
.tw-overflow-y-hidden {
  overflow-y: hidden;
}
.tw-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tw-text-ellipsis {
  text-overflow: ellipsis;
}
.tw-whitespace-normal {
  white-space: normal;
}
.tw-whitespace-nowrap {
  white-space: nowrap;
}
.tw-text-nowrap {
  text-wrap: nowrap;
}
.tw-text-balance {
  text-wrap: balance;
}
.tw-break-words {
  overflow-wrap: break-word;
}
.tw-rounded {
  border-radius: 0.25rem;
}
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.tw-rounded-none {
  border-radius: 0px;
}
.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.tw-rounded-xl {
  border-radius: 0.75rem;
}
.tw-rounded-b-\\[10px\\] {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-l-\\[10px\\] {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-r-\\[10px\\] {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.tw-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.tw-rounded-ee-none {
  border-end-end-radius: 0px;
}
.tw-rounded-se-md {
  border-start-end-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ss-none {
  border-start-start-radius: 0px;
}
.tw-border {
  border-width: 1px;
}
.tw-border-0 {
  border-width: 0px;
}
.tw-border-2 {
  border-width: 2px;
}
.tw-border-b {
  border-bottom-width: 1px;
}
.tw-border-b-0 {
  border-bottom-width: 0px;
}
.tw-border-e {
  border-inline-end-width: 1px;
}
.tw-border-e-0 {
  border-inline-end-width: 0px;
}
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-s-2 {
  border-inline-start-width: 2px;
}
.tw-border-t {
  border-top-width: 1px;
}
.tw-border-t-0 {
  border-top-width: 0px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-\\[\\#22ac32\\] {
  --tw-border-opacity: 1;
  border-color: rgb(34 172 50 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#df4744\\] {
  --tw-border-opacity: 1;
  border-color: rgb(223 71 68 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#e0a035\\] {
  --tw-border-opacity: 1;
  border-color: rgb(224 160 53 / var(--tw-border-opacity, 1));
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-border {
  border-color: hsl(var(--border));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-500 {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-s-amber-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(253 230 138 / var(--tw-border-opacity, 1));
}
.tw-border-s-indigo-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(199 210 254 / var(--tw-border-opacity, 1));
}
.tw-border-s-purple-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(233 213 255 / var(--tw-border-opacity, 1));
}
.tw-border-s-red-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.tw-bg-\\[\\#36c84b\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(54 200 75 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#f25450\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(242 84 80 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#fdbb40\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(253 187 64 / var(--tw-bg-opacity, 1));
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-card-foreground {
  background-color: hsl(var(--card-foreground));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-destructive-foreground {
  background-color: hsl(var(--destructive-foreground));
}
.tw-bg-foreground {
  background-color: hsl(var(--foreground));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted-foreground {
  background-color: hsl(var(--muted-foreground));
}
.tw-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-popover-foreground {
  background-color: hsl(var(--popover-foreground));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-red-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 242 242 / var(--tw-bg-opacity, 1));
}
.tw-bg-ring {
  background-color: hsl(var(--ring));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-secondary-foreground {
  background-color: hsl(var(--secondary-foreground));
}
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-accent {
  background-color: hsl(var(--sidebar-accent));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-bg-none {
  background-image: none;
}
.tw-fill-current {
  fill: currentColor;
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
}
.tw-p-3 {
  padding: 0.75rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
}
.tw-p-8 {
  padding: 2rem;
}
.tw-p-\\[1px\\] {
  padding: 1px;
}
.tw-px-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.tw-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.tw-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.tw-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.tw-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.tw-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.tw-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.tw-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.tw-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.tw-py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
}
.tw-py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.tw-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.tw-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.tw-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.tw-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.tw-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.tw-py-\\[1px\\] {
  padding-top: 1px;
  padding-bottom: 1px;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
}
.tw-pe-1 {
  padding-inline-end: 0.25rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pe-\\[calc\\(138px\\+1rem\\)\\] {
  padding-inline-end: calc(138px + 1rem);
}
.tw-pl-1 {
  padding-left: 0.25rem;
}
.tw-pl-3 {
  padding-left: 0.75rem;
}
.tw-pl-4 {
  padding-left: 1rem;
}
.tw-pl-5 {
  padding-left: 1.25rem;
}
.tw-pl-8 {
  padding-left: 2rem;
}
.tw-pr-0 {
  padding-right: 0px;
}
.tw-pr-2 {
  padding-right: 0.5rem;
}
.tw-pr-3 {
  padding-right: 0.75rem;
}
.tw-pr-4 {
  padding-right: 1rem;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
}
.tw-ps-3 {
  padding-inline-start: 0.75rem;
}
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-ps-9 {
  padding-inline-start: 2.25rem;
}
.tw-ps-\\[85px\\] {
  padding-inline-start: 85px;
}
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-4 {
  padding-top: 1rem;
}
.tw-text-left {
  text-align: left;
}
.tw-text-center {
  text-align: center;
}
.tw-text-right {
  text-align: right;
}
.tw-text-start {
  text-align: start;
}
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-5xl {
  font-size: 3rem;
  line-height: 1;
}
.tw-text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.tw-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.tw-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.tw-text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.tw-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.tw-font-bold {
  font-weight: 700;
}
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-uppercase {
  text-transform: uppercase;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-not-italic {
  font-style: normal;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-9 {
  line-height: 2.25rem;
}
.tw-leading-loose {
  line-height: 2;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-leading-tight {
  line-height: 1.25;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.tw-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.tw-text-current {
  color: currentColor;
}
.tw-text-destructive {
  color: hsl(var(--destructive));
}
.tw-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.tw-text-foreground {
  color: hsl(var(--foreground));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-text-muted-foreground\\/50 {
  color: hsl(var(--muted-foreground) / 0.5);
}
.tw-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.tw-text-primary {
  color: hsl(var(--primary));
}
.tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}
.tw-text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / 0.7);
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
}
.tw-underline-offset-4 {
  text-underline-offset: 4px;
}
.tw-opacity-0 {
  opacity: 0;
}
.tw-opacity-100 {
  opacity: 1;
}
.tw-opacity-50 {
  opacity: 0.5;
}
.tw-opacity-60 {
  opacity: 0.6;
}
.tw-opacity-70 {
  opacity: 0.7;
}
.tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\] {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.tw-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opa\\] {
  transition-property: margin,opa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\,height\\,padding\\] {
  transition-property: width,height,padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-duration-200 {
  transition-duration: 200ms;
}
.tw-duration-500 {
  transition-duration: 500ms;
}
.tw-ease-linear {
  transition-timing-function: linear;
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
.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-fade-in-80 {
  --tw-enter-opacity: 0.8;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-500 {
  animation-duration: 500ms;
}
.tw-ease-linear {
  animation-timing-function: linear;
}
.tw-\\@container\\/tab-toolbar-center {
  container-type: inline-size;
  container-name: tab-toolbar-center;
}
.tw-\\@container\\/tab-toolbar-end {
  container-type: inline-size;
  container-name: tab-toolbar-end;
}
.tw-\\@container\\/tab-toolbar-start {
  container-type: inline-size;
  container-name: tab-toolbar-start;
}
.tw-\\@container\\/toolbar {
  container-type: inline-size;
  container-name: toolbar;
}

/*
 * WARNING: These themes are also represented in paranext-core/src/shared/data/themes.data.json!
 * Please update in both locations
*/
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */
/* #endregion */

/* Note that the following region is from shadcn/ui's styles
 * https://ui.shadcn.com/docs/installation/manual#configure-styles but is scoped down to .pr-twp
 * because this is just a component library and should not apply its styles to the entire page.
 *
 * There is now a section in this library's README.md that explains how to apply these styles to the
 * entire page if desired.
 *
 * The template has the original shadcn/ui styles because it intentionally applies the styles to the
 * entire page. The same is true for Platform.Bible - see \`app.component.scss\`
 */
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css but with the difference of being scoped to .pr-twp here */
.\\*\\:tw-m-4 > * {
  margin: 1rem;
}
.\\*\\:tw-p-2 > * {
  padding: 0.5rem;
}
.file\\:tw-border-0::file-selector-button {
  border-width: 0px;
}
.file\\:tw-bg-transparent::file-selector-button {
  background-color: transparent;
}
.file\\:tw-text-sm::file-selector-button {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.file\\:tw-font-medium::file-selector-button {
  font-weight: 500;
}
.file\\:tw-text-foreground::file-selector-button {
  color: hsl(var(--foreground));
}
.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}
.after\\:tw-absolute::after {
  content: var(--tw-content);
  position: absolute;
}
.after\\:tw--inset-2::after {
  content: var(--tw-content);
  inset: -0.5rem;
}
.after\\:tw-inset-y-0::after {
  content: var(--tw-content);
  top: 0px;
  bottom: 0px;
}
.after\\:tw-left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}
.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:tw-bg-gray-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}
.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}
.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
}
.hover\\:tw-bg-primary\\/70:hover {
  background-color: hsl(var(--primary) / 0.7);
}
.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}
.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
.hover\\:tw-bg-red-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
}
.hover\\:tw-bg-secondary:hover {
  background-color: hsl(var(--secondary));
}
.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}
.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
}
.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}
.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}
.hover\\:tw-text-primary-foreground:hover {
  color: hsl(var(--primary-foreground));
}
.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}
.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}
.hover\\:tw-opacity-100:hover {
  opacity: 1;
}
.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
}
.focus\\:tw-relative:focus {
  position: relative;
}
.focus\\:tw-z-10:focus {
  z-index: 10;
}
.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}
.focus\\:tw-bg-muted:focus {
  background-color: hsl(var(--muted));
}
.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}
.focus\\:tw-text-foreground:focus {
  color: hsl(var(--foreground));
}
.focus\\:tw-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:tw-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:tw-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}
.focus\\:tw-ring-offset-1:focus {
  --tw-ring-offset-width: 1px;
}
.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.focus\\:tw-ring-offset-background:focus {
  --tw-ring-offset-color: hsl(var(--background));
}
.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus-visible\\:tw-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity, 1));
}
.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:tw-ring-sidebar-ring:focus-visible {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}
.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}
.active\\:tw-bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent));
}
.active\\:tw-text-sidebar-accent-foreground:active {
  color: hsl(var(--sidebar-accent-foreground));
}
.disabled\\:tw-pointer-events-none:disabled {
  pointer-events: none;
}
.disabled\\:tw-cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\\:tw-opacity-50:disabled {
  opacity: 0.5;
}
.tw-group:hover .group-hover\\:tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}
.has-\\[\\[data-variant\\=inset\\]\\]\\:tw-bg-sidebar:has([data-variant=inset]) {
  background-color: hsl(var(--sidebar-background));
}
.aria-disabled\\:tw-pointer-events-none[aria-disabled="true"] {
  pointer-events: none;
}
.aria-disabled\\:tw-opacity-50[aria-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-20px\\][data-state="checked"] {
  --tw-translate-x: -20px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:tw-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=on\\]\\:tw-bg-accent[data-state="on"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-muted[data-state="open"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}
.data-\\[active\\=true\\]\\:tw-font-medium[data-active="true"] {
  font-weight: 500;
}
.data-\\[active\\=true\\]\\:tw-text-sidebar-accent-foreground[data-active="true"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:tw-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state="on"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-accent-foreground[data-state="open"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-foreground[data-state="open"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=open\\]\\:tw-opacity-100[data-state="open"] {
  opacity: 1;
}
.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.data-\\[state\\=open\\]\\:tw-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state="open"] {
  --tw-enter-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:hover\\:tw-bg-sidebar-accent:hover[data-state="open"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[state\\=open\\]\\:hover\\:tw-text-sidebar-accent-foreground:hover[data-state="open"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  left: calc(var(--sidebar-width) * -1);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  right: calc(var(--sidebar-width) * -1);
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw--right-4 {
  right: -1rem;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-left-0 {
  left: 0px;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw--mt-8 {
  margin-top: -2rem;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-hidden {
  display: none;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[--sidebar-width-icon\\] {
  width: var(--sidebar-width-icon);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem + 2px);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-w-0 {
  width: 0px;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-overflow-hidden {
  overflow: hidden;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border {
  border-width: 1px;
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw-border-r {
  border-right-width: 1px;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-border-l {
  border-left-width: 1px;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-opacity-0 {
  opacity: 0;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-left-full::after {
  content: var(--tw-content);
  left: 100%;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}
.tw-peer[data-variant="inset"] ~ .peer-data-\\[variant\\=inset\\]\\:tw-min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\] {
  min-height: calc(100svh - 1rem);
}
@container (min-width: 24rem) {

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

  .\\@sm\\:tw-basis-auto {
    flex-basis: auto;
  }
}
@media (min-width: 640px) {

  .sm\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:tw-static {
    position: static;
  }

  .sm\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-table-cell {
    display: table-cell;
  }

  .sm\\:tw-hidden {
    display: none;
  }

  .sm\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-gap-4 {
    gap: 1rem;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-border-0 {
    border-width: 0px;
  }

  .sm\\:tw-bg-transparent {
    background-color: transparent;
  }

  .sm\\:tw-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:tw-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:tw-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:tw-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:tw-pl-14 {
    padding-left: 3.5rem;
  }

  .sm\\:tw-text-left {
    text-align: left;
  }

  .sm\\:tw-text-start {
    text-align: start;
  }
}
@media (min-width: 768px) {

  .md\\:tw-block {
    display: block;
  }

  .md\\:tw-inline {
    display: inline;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-table-cell {
    display: table-cell;
  }

  .md\\:tw-h-8 {
    height: 2rem;
  }

  .md\\:tw-w-8 {
    width: 2rem;
  }

  .md\\:tw-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:tw-grow-0 {
    flex-grow: 0;
  }

  .md\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:tw-gap-8 {
    gap: 2rem;
  }

  .md\\:tw-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .md\\:tw-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .md\\:tw-opacity-0 {
    opacity: 0;
  }

  .after\\:md\\:tw-hidden::after {
    content: var(--tw-content);
    display: none;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-m-2 {
    margin: 0.5rem;
  }

  .tw-peer[data-state="collapsed"][data-variant="inset"] ~ .md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-2 {
    margin-left: 0.5rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-0 {
    margin-left: 0px;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-rounded-xl {
    border-radius: 0.75rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}
@media (min-width: 1024px) {

  .lg\\:tw-sr-only {
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

  .lg\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}
@media (min-width: 1280px) {

  .xl\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:tw-whitespace-nowrap {
    white-space: nowrap;
  }
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.ltr\\:tw-left-2\\.5:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.625rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
.rtl\\:tw-right-2\\.5:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.625rem;
}
@media (prefers-color-scheme: dark) {

  .dark\\:tw--rotate-90 {
    --tw-rotate: -90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-rotate-0 {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}
.\\[\\&\\>img\\+div\\]\\:tw-translate-y-\\[-3px\\]>img+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>img\\]\\:tw-absolute>img {
  position: absolute;
}
.\\[\\&\\>img\\]\\:tw-left-4>img {
  left: 1rem;
}
.\\[\\&\\>img\\]\\:tw-top-4>img {
  top: 1rem;
}
.\\[\\&\\>img\\]\\:tw-text-destructive>img {
  color: hsl(var(--destructive));
}
.\\[\\&\\>img\\]\\:tw-text-foreground>img {
  color: hsl(var(--foreground));
}
.\\[\\&\\>img\\~\\*\\]\\:tw-pl-7>img~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>span\\:last-child\\]\\:tw-truncate>span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.\\[\\&\\>span\\]\\:tw-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.\\[\\&\\>svg\\+div\\]\\:tw-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>svg\\]\\:tw-absolute>svg {
  position: absolute;
}
.\\[\\&\\>svg\\]\\:tw-left-4>svg {
  left: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-top-4>svg {
  top: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-size-4>svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-shrink-0>svg {
  flex-shrink: 0;
}
.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}
.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
}
.\\[\\&\\>svg\\]\\:tw-text-sidebar-accent-foreground>svg {
  color: hsl(var(--sidebar-accent-foreground));
}
.\\[\\&\\>svg\\~\\*\\]\\:tw-pl-7>svg~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>tr\\]\\:last\\:tw-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-font-medium [cmdk-group-heading] {
  font-weight: 500;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}
.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:tw-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}
.\\[\\&_\\[cmdk-group\\]\\]\\:tw-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}
.\\[\\&_\\[cmdk-input\\]\\]\\:tw-h-12 [cmdk-input] {
  height: 3rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-h-5 [cmdk-item] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-w-5 [cmdk-item] svg {
  width: 1.25rem;
}
.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_svg\\]\\:tw-pointer-events-none svg {
  pointer-events: none;
}
.\\[\\&_svg\\]\\:tw-size-4 svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-shrink-0 svg {
  flex-shrink: 0;
}
.\\[\\&_tr\\:last-child\\]\\:tw-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:tw-border-b tr {
  border-bottom-width: 1px;
}
[data-side=primary][data-collapsible=offcanvas] .\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--right-2 {
  right: -0.5rem;
}
[data-side=primary][data-state=collapsed] .\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary][data-collapsible=offcanvas] .\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--left-2 {
  left: -0.5rem;
}
[data-side=secondary][data-state=collapsed] .\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
`, "after-all");
export {
  cs as Alert,
  us as AlertDescription,
  ps as AlertTitle,
  ms as Avatar,
  fs as AvatarFallback,
  hs as AvatarImage,
  pi as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  ui as BOOK_SELECTOR_STRING_KEYS,
  me as Badge,
  ci as BookChapterControl,
  Wa as BookSelectionMode,
  mi as BookSelector,
  D as Button,
  gs as Card,
  ys as CardContent,
  xs as CardDescription,
  Ns as CardFooter,
  bs as CardHeader,
  vs as CardTitle,
  Ja as ChapterRangeSelector,
  sn as Checkbox,
  Gi as Checklist,
  Fe as ComboBox,
  se as Command,
  ve as CommandEmpty,
  Pt as CommandGroup,
  ie as CommandInput,
  Gt as CommandItem,
  we as CommandList,
  Hi as ContextMenu,
  Rs as ContextMenuCheckboxItem,
  _s as ContextMenuContent,
  Ui as ContextMenuGroup,
  Ss as ContextMenuItem,
  Es as ContextMenuLabel,
  Ki as ContextMenuPortal,
  Ji as ContextMenuRadioGroup,
  Ts as ContextMenuRadioItem,
  Vs as ContextMenuSeparator,
  Ms as ContextMenuShortcut,
  qi as ContextMenuSub,
  Cs as ContextMenuSubContent,
  ks as ContextMenuSubTrigger,
  Yi as ContextMenuTrigger,
  ho as DataTable,
  Ds as Drawer,
  Zi as DrawerClose,
  Os as DrawerContent,
  Bs as DrawerDescription,
  As as DrawerFooter,
  zs as DrawerHeader,
  Er as DrawerOverlay,
  Is as DrawerPortal,
  Ps as DrawerTitle,
  Wi as DrawerTrigger,
  rn as DropdownMenu,
  an as DropdownMenuCheckboxItem,
  xe as DropdownMenuContent,
  qn as DropdownMenuGroup,
  Zn as DropdownMenuItem,
  bo as DropdownMenuItemType,
  on as DropdownMenuLabel,
  Za as DropdownMenuPortal,
  to as DropdownMenuRadioGroup,
  Qn as DropdownMenuRadioItem,
  ye as DropdownMenuSeparator,
  eo as DropdownMenuShortcut,
  Qa as DropdownMenuSub,
  Wn as DropdownMenuSubContent,
  Jn as DropdownMenuSubTrigger,
  Kn as DropdownMenuTrigger,
  fo as ERROR_DUMP_STRING_KEYS,
  fi as ERROR_POPOVER_STRING_KEYS,
  go as ErrorDump,
  gi as ErrorPopover,
  yi as Filter,
  bi as FilterDropdown,
  xi as Footer,
  Ti as INVENTORY_STRING_KEYS,
  ce as Input,
  Ei as Inventory,
  Q as Label,
  hi as MarkdownRenderer,
  vi as MoreInfo,
  yo as MultiSelectComboBox,
  ji as NavigationContentSearch,
  le as Popover,
  Ht as PopoverContent,
  de as PopoverTrigger,
  js as Progress,
  en as RadioGroup,
  ue as RadioGroupItem,
  Di as SCOPE_SELECTOR_STRING_KEYS,
  Ii as ScopeSelector,
  Mi as ScriptureResultsViewer,
  Oi as ScrollGroupSelector,
  pn as SearchBar,
  Bt as Select,
  Ot as SelectContent,
  ro as SelectGroup,
  ct as SelectItem,
  oo as SelectLabel,
  er as SelectScrollDownButton,
  tr as SelectScrollUpButton,
  so as SelectSeparator,
  It as SelectTrigger,
  jt as SelectValue,
  wn as Separator,
  zi as SettingsList,
  Pi as SettingsListHeader,
  Ai as SettingsListItem,
  Lo as SettingsSidebar,
  Vi as SettingsSidebarContentSearch,
  ir as Sidebar,
  lr as SidebarContent,
  Oo as SidebarFooter,
  Ge as SidebarGroup,
  Ao as SidebarGroupAction,
  He as SidebarGroupContent,
  Le as SidebarGroupLabel,
  Io as SidebarHeader,
  Do as SidebarInput,
  wr as SidebarInset,
  dr as SidebarMenu,
  Bo as SidebarMenuAction,
  jo as SidebarMenuBadge,
  pr as SidebarMenuButton,
  cr as SidebarMenuItem,
  $o as SidebarMenuSkeleton,
  Xo as SidebarMenuSub,
  Go as SidebarMenuSubButton,
  Fo as SidebarMenuSubItem,
  sr as SidebarProvider,
  Mo as SidebarRail,
  zo as SidebarSeparator,
  Vo as SidebarTrigger,
  _n as Skeleton,
  $s as Slider,
  Qi as Sonner,
  ls as Spinner,
  Xs as Switch,
  Tn as TabDropdownMenu,
  Bi as TabToolbar,
  Ne as Table,
  Ce as TableBody,
  mo as TableCaption,
  $t as TableCell,
  lo as TableFooter,
  ae as TableHead,
  ke as TableHeader,
  kt as TableRow,
  tw as Tabs,
  Ls as TabsContent,
  Fs as TabsList,
  Gs as TabsTrigger,
  Li as TextField,
  Hs as Textarea,
  ar as ToggleGroup,
  pe as ToggleGroupItem,
  Xi as Toolbar,
  dn as Tooltip,
  Se as TooltipContent,
  ln as TooltipProvider,
  cn as TooltipTrigger,
  Fi as UiLanguageSelector,
  gr as VerticalTabs,
  vr as VerticalTabsContent,
  br as VerticalTabsList,
  ts as VerticalTabsTrigger,
  xo as badgeVariants,
  La as buttonVariants,
  d as cn,
  Ri as getBookIdFromUSFM,
  _i as getLinesFromUSFM,
  Si as getNumberFromUSFM,
  _o as getStatusForItem,
  $i as getToolbarOSReservedSpaceClassName,
  ki as inventoryCountColumn,
  Ni as inventoryItemColumn,
  Ci as inventoryStatusColumn,
  ao as selectTriggerVariants,
  sw as sonner,
  ew as useEvent,
  nw as useEventAsync,
  rw as useListbox,
  Us as usePromise,
  Re as useSidebar
};
//# sourceMappingURL=index.js.map
