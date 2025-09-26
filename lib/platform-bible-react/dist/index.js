import { jsx as r, jsxs as l, Fragment as bt } from "react/jsx-runtime";
import u, { forwardRef as Qe, useRef as rt, useMemo as H, useState as A, useCallback as L, useLayoutEffect as Rn, createContext as Yr, useContext as qr, useEffect as It, Fragment as Ln } from "react";
import { Command as lt } from "cmdk";
import { X as tn, Search as Bn, Check as Rt, Clock as Tn, ChevronsLeft as En, ChevronsRight as Vn, ChevronLeft as je, ChevronRight as Ft, ArrowLeft as Jr, ArrowRight as Wr, Circle as ve, ChevronsUpDown as en, FilterIcon as Zr, ChevronDown as xe, ChevronUp as Qr, ArrowLeftIcon as to, ChevronLeftIcon as eo, ChevronRightIcon as no, ArrowRightIcon as ro, Copy as oo, Filter as ao, User as so, Link as io, CircleHelp as wo, Star as lo, AlertCircle as Le, CircleCheckIcon as co, CircleXIcon as po, CircleHelpIcon as mo, ArrowUpIcon as uo, ArrowDownIcon as ho, ArrowUpDownIcon as fo, PanelLeft as go, PanelRight as bo, ScrollText as vo, MenuIcon as xo, Menu as yo, EllipsisVertical as No, MoreHorizontal as ko, LoaderCircle as Co } from "lucide-react";
import { clsx as _o } from "clsx";
import { extendTailwindMerge as So } from "tailwind-merge";
import * as xt from "@radix-ui/react-dialog";
import { includes as ue, Section as D, getChaptersForBook as Ro, formatScrRef as Bt, getSectionForBook as oe, NumberFormat as To, formatBytes as Eo, getCurrentLocale as Vo, getFormatCallerFunction as Mo, deepEqual as nn, isString as Me, compareScrRefs as Be, scrRefToBBBCCCVVV as De, getLocalizeKeyForScrollGroupId as z } from "platform-bible-utils";
import { Slot as Kt } from "@radix-ui/react-slot";
import { cva as Tt } from "class-variance-authority";
import * as se from "@radix-ui/react-popover";
import * as Gn from "@radix-ui/react-label";
import * as ie from "@radix-ui/react-radio-group";
import { useReactTable as Fn, getFilteredRowModel as Do, getSortedRowModel as Xn, getPaginationRowModel as Oo, getCoreRowModel as Hn, flexRender as ae, getGroupedRowModel as Io, getExpandedRowModel as Ao } from "@tanstack/react-table";
import * as G from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Po } from "@radix-ui/react-dropdown-menu";
import * as K from "@radix-ui/react-select";
import zo from "markdown-to-jsx";
import * as Ge from "@radix-ui/react-checkbox";
import * as ye from "@radix-ui/react-toggle-group";
import * as Un from "@radix-ui/react-toggle";
import * as Kn from "@radix-ui/react-separator";
import * as de from "@radix-ui/react-tooltip";
import * as dt from "@radix-ui/react-tabs";
import * as F from "@radix-ui/react-menubar";
import { useHotkeys as $o } from "react-hotkeys-hook";
import * as Yt from "@radix-ui/react-avatar";
import * as X from "@radix-ui/react-context-menu";
import { Drawer as ut } from "vaul";
import * as Fe from "@radix-ui/react-progress";
import { Toaster as jo } from "sonner";
import { toast as Rw } from "sonner";
import * as re from "@radix-ui/react-slider";
import * as Xe from "@radix-ui/react-switch";
const Lo = So({ prefix: "tw-" });
function c(...t) {
  return Lo(_o(t));
}
const Bo = "layoutDirection";
function nt() {
  const t = localStorage.getItem(Bo);
  return t === "rtl" ? t : "ltr";
}
const Go = xt.Portal, Yn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  xt.Overlay,
  {
    ref: n,
    className: c(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Yn.displayName = xt.Overlay.displayName;
const Fo = u.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = nt();
  return /* @__PURE__ */ l(Go, { children: [
    /* @__PURE__ */ r(Yn, {}),
    /* @__PURE__ */ l(
      xt.Content,
      {
        ref: o,
        className: c(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: a,
        children: [
          e,
          /* @__PURE__ */ l(
            xt.Close,
            {
              className: c(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(tn, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Fo.displayName = xt.Content.displayName;
const Xo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  xt.Title,
  {
    ref: n,
    className: c("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Xo.displayName = xt.Title.displayName;
const Ho = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  xt.Description,
  {
    ref: n,
    className: c("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Ho.displayName = xt.Description.displayName;
const qt = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt,
  {
    ref: n,
    className: c(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
qt.displayName = lt.displayName;
const ce = u.forwardRef(({ className: t, ...e }, n) => {
  const o = nt();
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(Bn, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      lt.Input,
      {
        ref: n,
        className: c(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
ce.displayName = lt.Input.displayName;
const Jt = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.List,
  {
    ref: n,
    className: c("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
Jt.displayName = lt.List.displayName;
const Ne = u.forwardRef((t, e) => /* @__PURE__ */ r(lt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Ne.displayName = lt.Empty.displayName;
const At = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Group,
  {
    ref: n,
    className: c(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
At.displayName = lt.Group.displayName;
const qn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Separator,
  {
    ref: n,
    className: c("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
qn.displayName = lt.Separator.displayName;
const jt = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Item,
  {
    ref: n,
    className: c(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
jt.displayName = lt.Item.displayName;
var Uo = Object.defineProperty, Ko = (t, e, n) => e in t ? Uo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, V = (t, e, n) => Ko(t, typeof e != "symbol" ? e + "" : e, n);
const Pt = [
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
], rn = [
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
], Jn = [
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
], Mn = ra();
function Wt(t, e = !0) {
  return e && (t = t.toUpperCase()), t in Mn ? Mn[t] : 0;
}
function on(t) {
  return Wt(t) > 0;
}
function Yo(t) {
  const e = typeof t == "string" ? Wt(t) : t;
  return e >= 40 && e <= 66;
}
function qo(t) {
  return (typeof t == "string" ? Wt(t) : t) <= 39;
}
function Wn(t) {
  return t <= 66;
}
function Jo(t) {
  const e = typeof t == "string" ? Wt(t) : t;
  return tr(e) && !Wn(e);
}
function* Wo() {
  for (let t = 1; t <= Pt.length; t++) yield t;
}
const Zo = 1, Zn = Pt.length;
function Qo() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function an(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Pt.length ? e : Pt[n];
}
function Qn(t) {
  return t <= 0 || t > Zn ? "******" : Jn[t - 1];
}
function ta(t) {
  return Qn(Wt(t));
}
function tr(t) {
  const e = typeof t == "number" ? an(t) : t;
  return on(e) && !rn.includes(e);
}
function ea(t) {
  const e = typeof t == "number" ? an(t) : t;
  return on(e) && rn.includes(e);
}
function na(t) {
  return Jn[t - 1].includes("*obsolete*");
}
function ra() {
  const t = {};
  for (let e = 0; e < Pt.length; e++)
    t[Pt[e]] = e + 1;
  return t;
}
const $ = {
  allBookIds: Pt,
  nonCanonicalIds: rn,
  bookIdToNumber: Wt,
  isBookIdValid: on,
  isBookNT: Yo,
  isBookOT: qo,
  isBookOTNT: Wn,
  isBookDC: Jo,
  allBookNumbers: Wo,
  firstBook: Zo,
  lastBook: Zn,
  extraBooks: Qo,
  bookNumberToId: an,
  bookNumberToEnglishName: Qn,
  bookIdToEnglishName: ta,
  isCanonical: tr,
  isExtraMaterial: ea,
  isObsolete: na
};
var gt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(gt || {});
const pt = class {
  // private versInfo: Versification;
  constructor(e) {
    if (V(this, "name"), V(this, "fullPath"), V(this, "isPresent"), V(this, "hasVerseSegments"), V(this, "isCustomized"), V(this, "baseVersification"), V(this, "scriptureBooks"), V(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = gt[e]) : (this._type = e, this.name = gt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
V(pt, "Original", new pt(gt.Original)), V(pt, "Septuagint", new pt(gt.Septuagint)), V(pt, "Vulgate", new pt(gt.Vulgate)), V(pt, "English", new pt(gt.English)), V(pt, "RussianProtestant", new pt(gt.RussianProtestant)), V(pt, "RussianOrthodox", new pt(gt.RussianOrthodox));
let Mt = pt;
function Dn(t, e) {
  const n = e[0];
  for (let o = 1; o < e.length; o++)
    t = t.split(e[o]).join(n);
  return t.split(n);
}
var er = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(er || {});
const wt = class I {
  constructor(e, n, o, a) {
    if (V(this, "firstChapter"), V(this, "lastChapter"), V(this, "lastVerse"), V(this, "hasSegmentsDefined"), V(this, "text"), V(this, "BBBCCCVVVS"), V(this, "longHashCode"), V(this, "versification"), V(this, "rtlMark", "‏"), V(this, "_bookNum", 0), V(this, "_chapterNum", 0), V(this, "_verseNum", 0), V(this, "_verse"), o == null && a == null)
      if (e != null && typeof e == "string") {
        const s = e, i = n != null && n instanceof Mt ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = n != null && n instanceof Mt ? n : void 0;
        this.setEmpty(s), this._verseNum = e % I.chapterDigitShifter, this._chapterNum = Math.floor(
          e % I.bookDigitShifter / I.chapterDigitShifter
        ), this._bookNum = Math.floor(e / I.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof I) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
          const s = e instanceof Mt ? e : I.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && o != null)
      if (typeof e == "string" && typeof n == "string" && typeof o == "string")
        this.setEmpty(a), this.updateInternal(e, n, o);
      else if (typeof e == "number" && typeof n == "number" && typeof o == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = o, this.versification = a ?? I.defaultVersification;
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
      return n = new I(e), { success: !0, verseRef: n };
    } catch (o) {
      if (o instanceof ee)
        return n = new I(), { success: !1, verseRef: n };
      throw o;
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
  static getBBBCCCVVV(e, n, o) {
    return e % I.bcvMaxValue * I.bookDigitShifter + (n >= 0 ? n % I.bcvMaxValue * I.chapterDigitShifter : 0) + (o >= 0 ? o % I.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: o, verseNum: a, verse: s, versificationStr: i } = e, w = s || a.toString();
    let m;
    return i && (m = new Mt(i)), n ? new I(n, o.toString(), w, m) : new I();
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
    let o;
    for (let a = 0; a < e.length; a++) {
      if (o = e[a], o < "0" || o > "9")
        return a === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +o - 0, n > I.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(I.verseRangeSeparator) || this._verse.includes(I.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return $.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = $.bookIdToNumber(e);
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
    const { success: n, vNum: o } = I.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = o, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = I.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > $.lastBook)
      throw new ee(
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
    this.versification = this.versification != null ? new Mt(e) : void 0;
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
    return this.validateVerse(I.verseRangeSeparators, I.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return I.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return I.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
      const s = e.split("/");
      if (e = s[0], s.length > 1)
        try {
          const i = +s[1].trim();
          this.versification = new Mt(gt[i]);
        } catch {
          throw new ee("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new ee("Invalid reference : " + e);
    const o = n[1].split(":"), a = +o[0];
    if (o.length !== 2 || $.bookIdToNumber(n[0]) === 0 || !Number.isInteger(a) || a < 0 || !I.isVerseParseable(o[1]))
      throw new ee("Invalid reference : " + e);
    this.updateInternal(n[0], o[0], o[1]);
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
    return new I(this);
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
    return e instanceof I ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = I.verseRangeSeparators, o = I.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const a = [], s = Dn(this._verse, o);
    for (const i of s.map((w) => Dn(w, n))) {
      const w = this.clone();
      w.verse = i[0];
      const m = w.verseNum;
      if (a.push(w), i.length > 1) {
        const d = this.clone();
        if (d.verse = i[1], !e)
          for (let p = m + 1; p < d.verseNum; p++) {
            const g = new I(
              this._bookNum,
              this._chapterNum,
              p,
              this.versification
            );
            this.isExcluded || a.push(g);
          }
        a.push(d);
      }
    }
    return a;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let o = 0;
    for (const a of this.allVerses(!0, e, n)) {
      const s = a.internalValid;
      if (s !== 0)
        return s;
      const i = a.BBBCCCVVV;
      if (o > i)
        return 3;
      if (o === i)
        return 4;
      o = i;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > $.lastBook ? 2 : ($.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = I.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, o) {
    this.bookNum = $.bookIdToNumber(e), this.chapter = n, this.verse = o;
  }
};
V(wt, "defaultVersification", Mt.English), V(wt, "verseRangeSeparator", "-"), V(wt, "verseSequenceIndicator", ","), V(wt, "verseRangeSeparators", [wt.verseRangeSeparator]), V(wt, "verseSequenceIndicators", [wt.verseSequenceIndicator]), V(wt, "chapterDigitShifter", 1e3), V(wt, "bookDigitShifter", wt.chapterDigitShifter * wt.chapterDigitShifter), V(wt, "bcvMaxValue", wt.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
V(wt, "ValidStatusType", er);
class ee extends Error {
}
const nr = (t, e, n, o, a) => {
  switch (t) {
    case D.OT:
      return e ?? "Old Testament";
    case D.NT:
      return n ?? "New Testament";
    case D.DC:
      return o ?? "Deuterocanon";
    case D.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, oa = (t, e, n, o, a) => {
  switch (t) {
    case D.OT:
      return e ?? "OT";
    case D.NT:
      return n ?? "NT";
    case D.DC:
      return o ?? "DC";
    case D.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Gt(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? $.bookIdToEnglishName(t);
}
function sn(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const rr = $.allBookIds.filter(
  (t) => !$.isObsolete($.bookIdToNumber(t))
), Ot = Object.fromEntries(
  rr.map((t) => [t, $.bookIdToEnglishName(t)])
);
function wn(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = $.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(ue(a.toLowerCase(), o) || ue(t.toLowerCase(), o) || (s ? ue(s.localizedName.toLowerCase(), o) || ue(s.localizedId.toLowerCase(), o) : !1));
}
const or = Qe(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: w,
    commandValue: m
  }, d) => {
    const p = rt(!1), g = () => {
      p.current || n == null || n(t), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, h = (y) => {
      p.current = !0, o ? o(y) : n == null || n(t);
    }, f = H(
      () => Gt(t, w),
      [t, w]
    ), b = H(
      () => sn(t, w),
      [t, w]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: c(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === D.OT,
            "tw-border-s-purple-200": a === D.NT,
            "tw-border-s-indigo-200": a === D.DC,
            "tw-border-s-amber-200": a === D.Extra
          }
        ),
        children: /* @__PURE__ */ l(
          jt,
          {
            ref: d,
            value: m || `${t} ${$.bookIdToEnglishName(t)}`,
            onSelect: g,
            onMouseDown: h,
            role: "option",
            "aria-selected": e,
            "aria-label": `${$.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ r(
                Rt,
                {
                  className: c(
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
), aa = Tt(
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
), M = u.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? Kt : "button", { className: c(aa({ variant: e, size: n, className: t })), ref: s, ...a })
);
M.displayName = "Button";
const Zt = se.Root, Qt = se.Trigger, Lt = u.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...o }, a) => {
  const s = nt();
  return /* @__PURE__ */ r(se.Portal, { children: /* @__PURE__ */ r(
    se.Content,
    {
      ref: a,
      align: e,
      sideOffset: n,
      className: c(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-z-[250]",
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      dir: s
    }
  ) });
});
Lt.displayName = se.Content.displayName;
function He(t, e, n) {
  return `${t} ${Ot[t]}${e ? ` ${sn(t, e)} ${Gt(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function sa({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (w) => String(w),
  getItemKey: o = (w) => String(w),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i
}) {
  const [w, m] = A(!1);
  if (t.length === 0)
    return;
  const d = (p) => {
    e(p), m(!1);
  };
  return /* @__PURE__ */ l(Zt, { open: w, onOpenChange: m, children: [
    /* @__PURE__ */ r(Qt, { asChild: !0, children: /* @__PURE__ */ r(
      M,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
        "aria-label": a,
        children: /* @__PURE__ */ r(Tn, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Lt, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(qt, { children: /* @__PURE__ */ r(Jt, { children: /* @__PURE__ */ r(At, { heading: s, children: t.map((p) => /* @__PURE__ */ l(
      jt,
      {
        onSelect: () => d(p),
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(Tn, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(p) })
        ]
      },
      o(p)
    )) }) }) }) })
  ] });
}
function Ti(t, e, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = t.filter(
      (w) => !n(w, a)
    ), i = [a, ...s.slice(0, o - 1)];
    e(i);
  };
}
const Oe = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, ia = [
  Oe.BOOK_ONLY,
  Oe.BOOK_CHAPTER,
  Oe.BOOK_CHAPTER_VERSE
];
function On(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function vt(t) {
  return Ro($.bookIdToNumber(t));
}
function wa(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = ia.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(t.trim());
      if (i) {
        const [w, m = void 0, d = void 0] = i.slice(1);
        let p;
        const g = e.filter((h) => wn(h, w, n));
        if (g.length === 1 && ([p] = g), !p && m) {
          if ($.isBookIdValid(w)) {
            const h = w.toUpperCase();
            e.includes(h) && (p = h);
          }
          if (!p && n) {
            const h = Array.from(n.entries()).find(
              ([, f]) => f.localizedId.toLowerCase() === w.toLowerCase()
            );
            h && e.includes(h[0]) && ([p] = h);
          }
        }
        if (!p && m) {
          const f = ((b) => Object.keys(Ot).find(
            (y) => Ot[y].toLowerCase() === b.toLowerCase()
          ))(w);
          if (f && e.includes(f) && (p = f), !p && n) {
            const b = Array.from(n.entries()).find(
              ([, y]) => y.localizedName.toLowerCase() === w.toLowerCase()
            );
            b && e.includes(b[0]) && ([p] = b);
          }
        }
        if (p) {
          let h = m ? parseInt(m, 10) : void 0;
          h && h > vt(p) && (h = Math.max(vt(p), 1));
          const f = d ? parseInt(d, 10) : void 0;
          return {
            book: p,
            chapterNum: h,
            verseNum: f
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function la(t, e, n, o) {
  const a = L(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const m = e.indexOf(t.book);
      if (m > 0) {
        const d = e[m - 1], p = Math.max(vt(d), 1);
        o({
          book: d,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = L(() => {
    const m = vt(t.book);
    if (t.chapterNum < m)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const d = e.indexOf(t.book);
      if (d < e.length - 1) {
        const p = e[d + 1];
        o({
          book: p,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = L(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), w = L(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return H(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? En : Vn
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? je : Ft
    },
    {
      onClick: w,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Ft : je
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === vt(t.book) || vt(t.book) === -1) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Vn : En
    }
  ], [
    t,
    e,
    n,
    a,
    i,
    w,
    s
  ]);
}
function In({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: s
}) {
  if (t)
    return /* @__PURE__ */ r(At, { children: /* @__PURE__ */ r("div", { className: c("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: vt(t) }, (i, w) => w + 1).map((i) => /* @__PURE__ */ r(
      jt,
      {
        value: `${t} ${Ot[t] || ""} ${i}`,
        onSelect: () => n(i),
        ref: o(i),
        className: c(
          "tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",
          {
            "tw-bg-primary tw-text-primary-foreground": t === e.book && i === e.chapterNum
          },
          {
            "tw-bg-muted/50 tw-text-muted-foreground/50": (a == null ? void 0 : a(i)) ?? !1
          }
        ),
        children: i
      },
      i
    )) }) });
}
function Ei({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: w,
  id: m
}) {
  const d = nt(), [p, g] = A(!1), [h, f] = A(""), [b, y] = A(""), [v, O] = A("books"), [C, R] = A(void 0), [Y, et] = A(!1), B = rt(void 0), ot = rt(void 0), at = rt(void 0), _ = rt(void 0), k = rt({}), j = L(
    (x) => {
      e(x), w && w(x);
    },
    [e, w]
  ), T = H(() => o ? o() : rr, [o]), U = H(() => ({
    [D.OT]: T.filter((P) => $.isBookOT(P)),
    [D.NT]: T.filter((P) => $.isBookNT(P)),
    [D.DC]: T.filter((P) => $.isBookDC(P)),
    [D.Extra]: T.filter((P) => $.extraBooks().includes(P))
  }), [T]), S = H(() => Object.values(U).flat(), [U]), q = H(() => {
    if (!b.trim()) return U;
    const x = {
      [D.OT]: [],
      [D.NT]: [],
      [D.DC]: [],
      [D.Extra]: []
    };
    return [D.OT, D.NT, D.DC, D.Extra].forEach((Z) => {
      x[Z] = U[Z].filter((st) => wn(st, b, a));
    }), x;
  }, [U, b, a]), N = H(
    () => wa(b, S, a),
    [b, S, a]
  ), J = L(() => {
    N && (j({
      book: N.book,
      chapterNum: N.chapterNum ?? 1,
      verseNum: N.verseNum ?? 1
    }), g(!1), y(""), f(""));
  }, [j, N]), ft = L(
    (x) => {
      if (vt(x) <= 1) {
        j({
          book: x,
          chapterNum: 1,
          verseNum: 1
        }), g(!1), y("");
        return;
      }
      R(x), O("chapters");
    },
    [j]
  ), E = L(
    (x) => {
      const P = v === "chapters" ? C : N == null ? void 0 : N.book;
      P && (j({
        book: P,
        chapterNum: x,
        verseNum: 1
      }), g(!1), O("books"), R(void 0), y(""));
    },
    [j, v, C, N]
  ), Q = L(
    (x) => {
      j(x), g(!1), y("");
    },
    [j]
  ), W = la(t, S, d, e), ct = L(() => {
    O("books"), R(void 0), setTimeout(() => {
      ot.current && ot.current.focus();
    }, 0);
  }, []), Ct = L(
    (x) => {
      if (!x && v === "chapters") {
        ct();
        return;
      }
      g(x), x && (O("books"), R(void 0), y(""));
    },
    [v, ct]
  ), { otLong: yn, ntLong: Nn, dcLong: kn, extraLong: Cn } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, Gr = L(
    (x) => nr(x, yn, Nn, kn, Cn),
    [yn, Nn, kn, Cn]
  ), Fr = L(
    (x) => N ? !!N.chapterNum && !x.toString().includes(N.chapterNum.toString()) : !1,
    [N]
  ), Xr = H(
    () => Bt(
      t,
      a ? Gt(t.book, a) : "English"
    ),
    [t, a]
  ), _n = L((x) => (P) => {
    k.current[x] = P;
  }, []), Hr = L((x) => {
    (x.key === "Home" || x.key === "End") && x.stopPropagation();
  }, []), Ur = L(
    (x) => {
      if (x.ctrlKey) return;
      const { isLetter: P, isDigit: Z } = On(x.key);
      if (v === "chapters") {
        if (x.key === "Backspace") {
          x.preventDefault(), x.stopPropagation(), ct();
          return;
        }
        if (P || Z) {
          if (x.preventDefault(), x.stopPropagation(), O("books"), R(void 0), Z && C) {
            const st = Ot[C];
            y(`${st} ${x.key}`);
          } else
            y(x.key);
          setTimeout(() => {
            ot.current && ot.current.focus();
          }, 0);
          return;
        }
      }
      if ((v === "chapters" || v === "books" && N) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(x.key)) {
        const st = v === "chapters" ? C : N == null ? void 0 : N.book;
        if (!st) return;
        const it = (() => {
          if (!h) return 1;
          const te = h.match(/(\d+)$/);
          return te ? parseInt(te[1], 10) : 0;
        })(), Et = vt(st);
        if (!Et) return;
        let yt = it;
        const Sn = 6;
        switch (x.key) {
          case "ArrowLeft":
            it !== 0 && (yt = it > 1 ? it - 1 : Et);
            break;
          case "ArrowRight":
            it !== 0 && (yt = it < Et ? it + 1 : 1);
            break;
          case "ArrowUp":
            yt = it === 0 ? Et : Math.max(1, it - Sn);
            break;
          case "ArrowDown":
            yt = it === 0 ? 1 : Math.min(Et, it + Sn);
            break;
          default:
            return;
        }
        yt !== it && (x.preventDefault(), x.stopPropagation(), f(He(st, a, yt)), setTimeout(() => {
          const te = k.current[yt];
          te && te.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      v,
      N,
      ct,
      C,
      h,
      a
    ]
  ), Kr = L((x) => {
    if (x.shiftKey || x.key === "Tab" || x.key === " ") return;
    const { isLetter: P, isDigit: Z } = On(x.key);
    (P || Z) && (x.preventDefault(), y((st) => st + x.key), ot.current.focus(), et(!1));
  }, []);
  return Rn(() => {
    const x = setTimeout(() => {
      if (p && v === "books" && at.current && _.current) {
        const P = at.current, Z = _.current, st = Z.offsetTop, it = P.clientHeight, Et = Z.clientHeight, yt = st - it / 2 + Et / 2;
        P.scrollTo({
          top: Math.max(0, yt),
          behavior: "smooth"
        }), f(He(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(x);
    };
  }, [p, v, b, N, t.book]), Rn(() => {
    if (v === "chapters" && C) {
      const x = C === t.book;
      setTimeout(() => {
        if (at.current)
          if (x) {
            const P = k.current[t.chapterNum];
            P && P.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            at.current.scrollTo({ top: 0 });
        B.current && B.current.focus();
      }, 0);
    }
  }, [v, C, N, t.book, t.chapterNum]), /* @__PURE__ */ l(Zt, { open: p, onOpenChange: Ct, children: [
    /* @__PURE__ */ r(Qt, { asChild: !0, children: /* @__PURE__ */ r(
      M,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": p,
        className: c(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: Xr })
      }
    ) }),
    /* @__PURE__ */ r(Lt, { id: m, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ l(
      qt,
      {
        ref: B,
        onKeyDown: Ur,
        loop: !0,
        value: h,
        onValueChange: f,
        shouldFilter: !1,
        children: [
          v === "books" ? /* @__PURE__ */ l("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ l("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                ce,
                {
                  ref: ot,
                  value: b,
                  onValueChange: y,
                  onKeyDown: Hr,
                  onFocus: () => et(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ r(
                sa,
                {
                  recentSearches: i,
                  onSearchItemSelect: Q,
                  renderItem: (x) => Bt(x, "English"),
                  getItemKey: (x) => `${x.book}-${x.chapterNum}-${x.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: W.map(({ onClick: x, disabled: P, title: Z, icon: st }) => /* @__PURE__ */ r(
              M,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  et(!0), x();
                },
                disabled: P,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: Z,
                onKeyDown: Kr,
                children: /* @__PURE__ */ r(st, {})
              },
              Z
            )) })
          ] }) : /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              M,
              {
                variant: "ghost",
                size: "sm",
                onClick: ct,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: d === "ltr" ? /* @__PURE__ */ r(Jr, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Wr, { className: "tw-h-4 tw-w-4" })
              }
            ),
            C && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Gt(C, a) })
          ] }),
          !Y && /* @__PURE__ */ l(Jt, { ref: at, children: [
            v === "books" && /* @__PURE__ */ l(bt, { children: [
              !N && Object.entries(q).map(([x, P]) => {
                if (P.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(At, { heading: Gr(x), children: P.map((Z) => /* @__PURE__ */ r(
                      or,
                      {
                        bookId: Z,
                        onSelect: (st) => ft(st),
                        section: oe(Z),
                        commandValue: `${Z} ${Ot[Z]}`,
                        ref: Z === t.book ? _ : void 0,
                        localizedBookNames: a
                      },
                      Z
                    )) }, x)
                  );
              }),
              N && /* @__PURE__ */ r(At, { children: /* @__PURE__ */ r(
                jt,
                {
                  value: `${N.book} ${Ot[N.book]} ${N.chapterNum || ""}:${N.verseNum || ""})}`,
                  onSelect: J,
                  className: "tw-font-semibold tw-text-primary",
                  children: Bt(
                    {
                      book: N.book,
                      chapterNum: N.chapterNum ?? 1,
                      verseNum: N.verseNum ?? 1
                    },
                    a ? sn(N.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              N && vt(N.book) > 1 && /* @__PURE__ */ l(bt, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Gt(N.book, a) }),
                /* @__PURE__ */ r(
                  In,
                  {
                    bookId: N.book,
                    scrRef: t,
                    onChapterSelect: E,
                    setChapterRef: _n,
                    isChapterDimmed: Fr,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            v === "chapters" && C && /* @__PURE__ */ r(
              In,
              {
                bookId: C,
                scrRef: t,
                onChapterSelect: E,
                setChapterRef: _n,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Vi = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), da = Tt(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), tt = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Gn.Root, { ref: n, className: c("pr-twp", da(), t), ...e }));
tt.displayName = Gn.Root.displayName;
const ln = u.forwardRef(({ className: t, ...e }, n) => {
  const o = nt();
  return /* @__PURE__ */ r(
    ie.Root,
    {
      className: c("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
ln.displayName = ie.Root.displayName;
const fe = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ie.Item,
  {
    ref: n,
    className: c(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(ie.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ve, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
fe.displayName = ie.Item.displayName;
function ca(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Ue({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: w = ca,
  icon: m = void 0,
  buttonPlaceholder: d = "",
  textPlaceholder: p = "",
  commandEmptyMessage: g = "No option found",
  buttonVariant: h = "outline",
  alignDropDown: f = "start",
  isDisabled: b = !1,
  ...y
}) {
  const [v, O] = A(!1);
  return /* @__PURE__ */ l(Zt, { open: v, onOpenChange: O, ...y, children: [
    /* @__PURE__ */ r(Qt, { asChild: !0, children: /* @__PURE__ */ l(
      M,
      {
        variant: h,
        role: "combobox",
        "aria-expanded": v,
        id: t,
        className: c(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            m && /* @__PURE__ */ r("div", { className: "tw-pe-2", children: m }),
            /* @__PURE__ */ r("span", { className: c("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: s ? w(s) : d })
          ] }),
          /* @__PURE__ */ r(en, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Lt,
      {
        align: f,
        className: c("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ l(qt, { children: [
          /* @__PURE__ */ r(ce, { placeholder: p, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(Ne, { children: g }),
          /* @__PURE__ */ r(Jt, { children: e.map((C) => /* @__PURE__ */ l(
            jt,
            {
              value: w(C),
              onSelect: () => {
                i(C), O(!1);
              },
              children: [
                /* @__PURE__ */ r(
                  Rt,
                  {
                    className: c("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !s || w(s) !== w(C)
                    })
                  }
                ),
                w(C)
              ]
            },
            w(C)
          )) })
        ] })
      }
    )
  ] });
}
function pa({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = H(
    () => Array.from({ length: s }, (d, p) => p + 1),
    [s]
  );
  return /* @__PURE__ */ l(bt, { children: [
    /* @__PURE__ */ r(tt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      Ue,
      {
        isDisabled: a,
        onChange: (d) => {
          n(d), d > e && o(d);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(tt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      Ue,
      {
        isDisabled: a,
        onChange: (d) => {
          o(d), d < t && n(d);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var ma = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(ma || {});
const Mi = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ie = (t, e) => t[e] ?? e;
function Di({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: w,
  handleSelectStartChapter: m,
  localizedStrings: d
}) {
  const p = Ie(d, "%webView_bookSelector_currentBook%"), g = Ie(d, "%webView_bookSelector_choose%"), h = Ie(d, "%webView_bookSelector_chooseBooks%"), [f, b] = A(
    "current book"
    /* CURRENT_BOOK */
  ), y = (v) => {
    b(v), t(v);
  };
  return /* @__PURE__ */ r(
    ln,
    {
      className: "pr-twp tw-flex",
      value: f,
      onValueChange: (v) => y(v),
      children: /* @__PURE__ */ l("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(fe, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(tt, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(tt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            pa,
            {
              isDisabled: f === "choose books",
              handleSelectStartChapter: m,
              handleSelectEndChapter: i,
              chapterCount: a,
              startChapter: w,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(fe, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(tt, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(tt, { className: "tw-flex tw-items-center", children: o.map((v) => $.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ r(
            M,
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
const dn = Yr(void 0);
function ht() {
  const t = qr(dn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const kt = Tt("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), cn = G.Trigger, ar = G.Group, ua = G.Portal, ha = G.Sub, fa = G.RadioGroup;
function ke({ variant: t = "default", ...e }) {
  const n = u.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(dn.Provider, { value: n, children: /* @__PURE__ */ r(G.Root, { ...e }) });
}
const sr = u.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = ht();
  return /* @__PURE__ */ l(
    G.SubTrigger,
    {
      ref: a,
      className: c(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        kt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Ft, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
sr.displayName = G.SubTrigger.displayName;
const ir = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.SubContent,
  {
    ref: n,
    className: c(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
ir.displayName = G.SubContent.displayName;
const pe = u.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const s = nt();
  return /* @__PURE__ */ r(G.Portal, { children: /* @__PURE__ */ r(
    G.Content,
    {
      ref: a,
      sideOffset: e,
      className: c(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
});
pe.displayName = G.Content.displayName;
const wr = u.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = nt(), s = ht();
  return /* @__PURE__ */ r(
    G.Item,
    {
      ref: o,
      className: c(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        kt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
wr.displayName = G.Item.displayName;
const pn = u.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = ht();
  return /* @__PURE__ */ l(
    G.CheckboxItem,
    {
      ref: a,
      className: c(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        kt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
pn.displayName = G.CheckboxItem.displayName;
const lr = u.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = ht();
  return /* @__PURE__ */ l(
    G.RadioItem,
    {
      ref: o,
      className: c(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        kt({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(ve, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
lr.displayName = G.RadioItem.displayName;
const mn = u.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  G.Label,
  {
    ref: o,
    className: c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
mn.displayName = G.Label.displayName;
const Ce = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.Separator,
  {
    ref: n,
    className: c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ce.displayName = G.Separator.displayName;
function ga({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: c("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
ga.displayName = "DropdownMenuShortcut";
function ba({ table: t }) {
  return /* @__PURE__ */ l(ke, { children: [
    /* @__PURE__ */ r(Po, { asChild: !0, children: /* @__PURE__ */ l(M, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Zr, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ l(pe, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(mn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Ce, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        pn,
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
const Xt = K.Root, va = K.Group, Ht = K.Value, xa = Tt(
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
), zt = u.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const s = nt();
  return /* @__PURE__ */ l(
    K.Trigger,
    {
      className: c(xa({ size: n, className: t })),
      ref: a,
      ...o,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(K.Icon, { asChild: !0, children: /* @__PURE__ */ r(xe, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
zt.displayName = K.Trigger.displayName;
const dr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  K.ScrollUpButton,
  {
    ref: n,
    className: c("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Qr, { className: "tw-h-4 tw-w-4" })
  }
));
dr.displayName = K.ScrollUpButton.displayName;
const cr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  K.ScrollDownButton,
  {
    ref: n,
    className: c("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(xe, { className: "tw-h-4 tw-w-4" })
  }
));
cr.displayName = K.ScrollDownButton.displayName;
const $t = u.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const s = nt();
  return /* @__PURE__ */ r(K.Portal, { children: /* @__PURE__ */ l(
    K.Content,
    {
      ref: a,
      className: c(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...o,
      children: [
        /* @__PURE__ */ r(dr, {}),
        /* @__PURE__ */ r(
          K.Viewport,
          {
            className: c(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(cr, {})
      ]
    }
  ) });
});
$t.displayName = K.Content.displayName;
const ya = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  K.Label,
  {
    ref: n,
    className: c("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
ya.displayName = K.Label.displayName;
const mt = u.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ l(
  K.Item,
  {
    ref: o,
    className: c(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(K.ItemIndicator, { children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(K.ItemText, { children: e })
    ]
  }
));
mt.displayName = K.Item.displayName;
const Na = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  K.Separator,
  {
    ref: n,
    className: c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Na.displayName = K.Separator.displayName;
function ka({ table: t }) {
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
        Xt,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(zt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Ht, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r($t, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(mt, { value: `${e}`, children: e }, e)) })
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
        M,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(to, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        M,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(eo, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        M,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(no, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        M,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(ro, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const An = `
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
function Ca(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function we(t, e) {
  const n = e ? `${An}, ${e}` : An;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Ca(o)
  );
}
const _e = u.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = u.useRef(null);
  u.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), u.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const w = () => {
      requestAnimationFrame(() => {
        we(i, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
        });
      });
    };
    w();
    const m = new MutationObserver(() => {
      w();
    });
    return m.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      m.disconnect();
    };
  }, []);
  const s = (i) => {
    const { current: w } = a;
    if (w) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), we(w)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === w && i.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: c("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: s,
      ref: a,
      className: c(
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
_e.displayName = "Table";
const Se = u.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
  "thead",
  {
    ref: o,
    className: c(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": e
      },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
Se.displayName = "TableHeader";
const Re = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: c("[&_tr:last-child]:tw-border-0", t), ...e }));
Re.displayName = "TableBody";
const _a = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: c("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
_a.displayName = "TableFooter";
function Sa(t) {
  u.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? we(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < a.length && a[i].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", n), () => {
      e.removeEventListener("keydown", n);
    };
  }, [t]);
}
function Ra(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Ta(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const St = u.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = u.useRef(null);
  u.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), Sa(i);
  const w = u.useMemo(
    () => i.current ? we(i.current) : [],
    [i]
  ), m = u.useCallback(
    (p) => {
      const { current: g } = i;
      if (!g || !g.parentElement) return;
      const h = g.closest("table"), f = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        we(h).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], b = f.indexOf(g), y = w.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), Ta(f, b, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), Ra(w, y, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const v = g.closest("table");
        v && v.focus();
      }
      e == null || e(p);
    },
    [i, w, e]
  ), d = u.useCallback(
    (p) => {
      o && (n == null || n(p));
    },
    [o, n]
  );
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: i,
      tabIndex: -1,
      onKeyDown: m,
      onFocus: d,
      className: c(
        // CUSTOM: Add focus styles and add tw-outline-none so there isn't a duplicate outline
        "tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50",
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        "data-[state=selected]:tw-bg-muted",
        t
      ),
      ...a
    }
  );
});
St.displayName = "TableRow";
const le = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: c(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
le.displayName = "TableHead";
const Ut = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: c("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Ut.displayName = "TableCell";
const Ea = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: c("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Ea.displayName = "TableCaption";
function Va({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: w
}) {
  var O;
  const [m, d] = A([]), [p, g] = A([]), [h, f] = A({}), [b, y] = A({}), v = Fn({
    data: e,
    columns: t,
    getCoreRowModel: Hn(),
    ...n && { getPaginationRowModel: Oo() },
    onSortingChange: d,
    getSortedRowModel: Xn(),
    onColumnFiltersChange: g,
    getFilteredRowModel: Do(),
    onColumnVisibilityChange: f,
    onRowSelectionChange: y,
    state: {
      sorting: m,
      columnFilters: p,
      columnVisibility: h,
      rowSelection: b
    }
  });
  return /* @__PURE__ */ l("div", { className: "pr-twp", id: w, children: [
    a && /* @__PURE__ */ r(ba, { table: v }),
    /* @__PURE__ */ l(_e, { stickyHeader: s, children: [
      /* @__PURE__ */ r(Se, { stickyHeader: s, children: v.getHeaderGroups().map((C) => /* @__PURE__ */ r(St, { children: C.headers.map((R) => /* @__PURE__ */ r(le, { children: R.isPlaceholder ? void 0 : ae(R.column.columnDef.header, R.getContext()) }, R.id)) }, C.id)) }),
      /* @__PURE__ */ r(Re, { children: (O = v.getRowModel().rows) != null && O.length ? v.getRowModel().rows.map((C) => /* @__PURE__ */ r(
        St,
        {
          onClick: () => i(C, v),
          "data-state": C.getIsSelected() && "selected",
          children: C.getVisibleCells().map((R) => /* @__PURE__ */ r(Ut, { children: ae(R.column.columnDef.cell, R.getContext()) }, R.id))
        },
        C.id
      )) : /* @__PURE__ */ r(St, { children: /* @__PURE__ */ r(Ut, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        M,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.previousPage(),
          disabled: !v.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        M,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.nextPage(),
          disabled: !v.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(ka, { table: v })
  ] });
}
function Oi({ id: t, markdown: e, className: n, anchorTarget: o }) {
  const a = H(
    () => ({
      overrides: {
        a: {
          props: {
            target: o
          }
        }
      }
    }),
    [o]
  );
  return /* @__PURE__ */ r("div", { id: t, className: c("pr-twp tw-prose", n), children: /* @__PURE__ */ r(zo, { options: a, children: e }) });
}
const Ma = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), Pn = (t, e) => t[e] ?? e;
function Da({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = Pn(n, "%webView_error_dump_header%"), s = Pn(n, "%webView_error_dump_info_message%");
  function i() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ l(
    "div",
    {
      id: o,
      className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",
      children: [
        /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
          /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
            /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
            /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ r(M, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(oo, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const Ii = Object.freeze([
  ...Ma,
  "%webView_error_dump_copied_message%"
]);
function Ai({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: s
}) {
  const [i, w] = A(!1), m = () => {
    w(!0), e && e();
  };
  return /* @__PURE__ */ l(Zt, { onOpenChange: (p) => {
    p || w(!1);
  }, children: [
    /* @__PURE__ */ r(Qt, { asChild: !0, children: o }),
    /* @__PURE__ */ l(Lt, { id: s, className: c("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(tt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Da,
        {
          errorDetails: t,
          handleCopyNotify: m,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Oa = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Oa || {});
function Pi({ id: t, label: e, groups: n }) {
  const [o, a] = A(
    Object.fromEntries(
      n.map(
        (d, p) => d.itemType === 0 ? [p, []] : void 0
      ).filter((d) => !!d)
    )
  ), [s, i] = A({}), w = (d, p) => {
    const g = !o[d][p];
    a((f) => (f[d][p] = g, { ...f }));
    const h = n[d].items[p];
    h.onUpdate(h.id, g);
  }, m = (d, p) => {
    i((h) => (h[d] = p, { ...h }));
    const g = n[d].items.find((h) => h.id === p);
    g ? g.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ l(ke, { children: [
    /* @__PURE__ */ r(cn, { asChild: !0, children: /* @__PURE__ */ l(M, { variant: "default", children: [
      /* @__PURE__ */ r(ao, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(xe, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(pe, { children: n.map((d, p) => /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r(mn, { children: d.label }),
      /* @__PURE__ */ r(ar, { children: d.itemType === 0 ? /* @__PURE__ */ r(bt, { children: d.items.map((g, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        pn,
        {
          checked: o[p][h],
          onCheckedChange: () => w(p, h),
          children: g.label
        }
      ) }, g.id)) }) : /* @__PURE__ */ r(
        fa,
        {
          value: s[p],
          onValueChange: (g) => m(p, g),
          children: d.items.map((g) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(lr, { value: g.id, children: g.label }) }, g.id))
        }
      ) }),
      /* @__PURE__ */ r(Ce, {})
    ] }, d.label)) })
  ] }) });
}
function zi({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: w
}) {
  const m = new To("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, g) => p + g, 0)), d = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ l(
    "div",
    {
      id: t,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        e && /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: e }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(so, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: m })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((p) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p.toUpperCase() }, p)) }),
          o.length > 3 && /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              onClick: () => d(),
              className: "tw-text-xs tw-text-foreground tw-underline",
              children: [
                "+",
                o.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (a || i) && /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ l(
            M,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(io, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ l(
            M,
            {
              onClick: () => w(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(wo, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Ia({ id: t, versionHistory: e }) {
  const [n, o] = A(!1), a = /* @__PURE__ */ new Date();
  function s(w) {
    const m = new Date(w), d = new Date(a.getTime() - m.getTime()), p = d.getUTCFullYear() - 1970, g = d.getUTCMonth(), h = d.getUTCDate() - 1;
    let f = "";
    return p > 0 ? f = `${p.toString()} year${p === 1 ? "" : "s"} ago` : g > 0 ? f = `${g.toString()} month${g === 1 ? "" : "s"} ago` : h === 0 ? f = "today" : f = `${h.toString()} day${h === 1 ? "" : "s"} ago`, f;
  }
  const i = Object.entries(e).sort((w, m) => m[0].localeCompare(w[0]));
  return /* @__PURE__ */ l("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? i : i.slice(0, 5)).map((w) => /* @__PURE__ */ l("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: w[1].description }) }) }),
      /* @__PURE__ */ l("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ l("div", { children: [
          "Version ",
          w[0]
        ] }),
        /* @__PURE__ */ r("div", { children: s(w[1].date) })
      ] })
    ] }, w[0])) }),
    i.length > 5 && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => o(!n),
        className: "tw-text-xs tw-text-foreground tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function $i({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = H(() => Eo(n), [n]), m = ((d) => {
    const p = new Intl.DisplayNames(Vo(), { type: "language" });
    return d.map((g) => p.of(g));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(Ia, { versionHistory: a }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ l("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ l("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ l("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: m.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const Aa = Tt(
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
), ge = u.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: c("pr-twp", Aa({ variant: e }), t), ...n })
);
ge.displayName = "Badge";
function Pa({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: w = "No entries found",
  customSelectedText: m,
  isOpen: d = void 0,
  onOpenChange: p = void 0,
  isDisabled: g = !1,
  sortSelected: h = !1,
  icon: f = void 0,
  className: b = void 0,
  variant: y = "ghost",
  id: v
}) {
  const [O, C] = A(!1), R = L(
    (k) => {
      var T;
      const j = (T = t.find((U) => U.label === k)) == null ? void 0 : T.value;
      j && n(
        e.includes(j) ? e.filter((U) => U !== j) : [...e, j]
      );
    },
    [t, e, n]
  ), Y = () => m || o, et = H(() => {
    if (!h) return t;
    const k = t.filter((T) => T.starred).sort((T, U) => T.label.localeCompare(U.label)), j = t.filter((T) => !T.starred).sort((T, U) => {
      const S = e.includes(T.value), q = e.includes(U.value);
      return S && !q ? -1 : !S && q ? 1 : T.label.localeCompare(U.label);
    });
    return [...k, ...j];
  }, [t, e, h]), B = () => {
    n(t.map((k) => k.value));
  }, ot = () => {
    n([]);
  }, at = d ?? O;
  return /* @__PURE__ */ r("div", { id: v, className: b, children: /* @__PURE__ */ l(Zt, { open: at, onOpenChange: p ?? C, children: [
    /* @__PURE__ */ r(Qt, { asChild: !0, children: /* @__PURE__ */ l(
      M,
      {
        variant: y,
        role: "combobox",
        "aria-expanded": at,
        className: c(
          "tw-w-full tw-justify-between",
          e.length > 0 && e.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        disabled: g,
        children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            f && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: f }) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: c({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": e.length === 0 || e.length === t.length
                }),
                children: /* @__PURE__ */ r("div", { className: "tw-font-normal", children: Y() })
              }
            )
          ] }),
          /* @__PURE__ */ r(en, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Lt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ l(qt, { children: [
      /* @__PURE__ */ r(ce, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(M, { variant: "ghost", size: "sm", onClick: B, children: s }),
        /* @__PURE__ */ r(M, { variant: "ghost", size: "sm", onClick: ot, children: i })
      ] }),
      /* @__PURE__ */ l(Jt, { children: [
        /* @__PURE__ */ r(Ne, { children: w }),
        /* @__PURE__ */ r(At, { children: et.map((k) => /* @__PURE__ */ l(
          jt,
          {
            value: k.label,
            onSelect: R,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Rt,
                {
                  className: c(
                    "tw-h-4 tw-w-4",
                    e.includes(k.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              k.starred && /* @__PURE__ */ r(lo, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: k.label }),
              k.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: k.secondaryLabel })
            ]
          },
          k.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function ji({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: w,
  icon: m,
  className: d,
  badgesPlaceholder: p,
  id: g
}) {
  return /* @__PURE__ */ l("div", { id: g, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Pa,
      {
        entries: t,
        selected: e,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: w,
        icon: m,
        className: d
      }
    ),
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((h) => {
      var f;
      return /* @__PURE__ */ l(ge, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          M,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((b) => b !== h)),
            children: /* @__PURE__ */ r(tn, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (f = t.find((b) => b.value === h)) == null ? void 0 : f.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(tt, { children: p })
  ] });
}
const Ke = c("marker", "marker-visible'}");
function Ye(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((s) => {
      let i = a.join("-");
      if (typeof s == "string") {
        if (i += `-${s.slice(0, 10)}`, o) {
          const w = c(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: w, children: s }, i);
        }
        return /* @__PURE__ */ l(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(Le, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Le, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return i += `-${s.marker ?? "unknown"}`, za(s, i, n, [
        ...a,
        t ?? "unknown"
      ]);
    });
}
function za(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ l("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: Ke, children: `\\${a} ` }) : /* @__PURE__ */ r(
      Le,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Ye(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function $a({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, s = a !== t.caller;
  let i, w = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([i, ...w] = t.content);
  const m = o ? /* @__PURE__ */ r("span", { className: Ke, children: `\\${t.marker} ` }) : void 0, d = o ? /* @__PURE__ */ r("span", { className: Ke, children: ` \\${t.marker}*` }) : void 0, p = /* @__PURE__ */ l(bt, { children: [
    a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
    // specific class name in case styling is needed.
    /* @__PURE__ */ l("span", { className: c("note-caller", { formatted: s }), children: [
      a,
      " "
    ] }),
    i && /* @__PURE__ */ l(bt, { children: [
      Ye(t.marker, [i], o, !1),
      " "
    ] })
  ] });
  return /* @__PURE__ */ l(bt, { children: [
    /* @__PURE__ */ l(
      "div",
      {
        className: c(
          "textual-note-header tw-text-nowrap",
          e === "horizontal" ? "horizontal tw-table-cell tw-pr-1" : "vertical",
          // REVIEW: Checking with UX to see if they actually want different padding when markers are shown, as seen in Figma design
          o ? "tw-pr-[10px]" : "tw-pr-[22px]"
        ),
        children: [
          m,
          p
        ]
      }
    ),
    /* @__PURE__ */ r(
      "div",
      {
        className: c(
          "textual-note-body",
          e === "horizontal" ? "horizontal tw-table-cell" : "vertical"
        ),
        children: w && w.length > 0 && /* @__PURE__ */ l(bt, { children: [
          Ye(t.marker, w, o, !0),
          d
        ] })
      }
    )
  ] });
}
const pr = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: c(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
pr.displayName = "Card";
const ja = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: c("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
ja.displayName = "CardHeader";
const La = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "h3",
    {
      ref: n,
      className: c(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
La.displayName = "CardTitle";
const Ba = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: c("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Ba.displayName = "CardDescription";
const Ga = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: c("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Ga.displayName = "CardContent";
const Fa = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: c("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Fa.displayName = "CardFooter";
const Xa = (t, e) => t[e] ?? e;
function Li({
  className: t,
  footnotes: e,
  layout: n = "horizontal",
  listId: o,
  selectedFootnote: a,
  showMarkers: s = !0,
  suppressFormatting: i = !1,
  formatCaller: w,
  onFootnoteSelected: m,
  localizedStrings: d
}) {
  const p = d ? Xa(d, "%webView_footnoteList_header%") : "Footnotes", g = w ?? Mo(e, void 0), h = (f) => {
    m && m(f);
  };
  return /* @__PURE__ */ l(bt, { children: [
    n === "vertical" && /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-font-semibold", children: p }),
    /* @__PURE__ */ r(
      "div",
      {
        role: "listbox",
        "aria-label": "Footnotes",
        className: c(
          n === "horizontal" ? "tw-table tw-border-collapse" : "tw-flex tw-flex-col tw-gap-1",
          !i && "formatted-font",
          t
        ),
        children: e.map((f, b) => {
          const y = f === a, v = `${o}-${b}`;
          return /* @__PURE__ */ r(
            pr,
            {
              role: "option",
              "aria-selected": y,
              "data-marker": f.marker,
              className: c(
                m && "tw-cursor-pointer",
                "tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none",
                y && "tw-bg-muted/70",
                n === "horizontal" ? "horizontal tw-table-row" : "vertical tw-block tw-px-1 tw-py-0 tw-text-sm"
              ),
              onClick: () => h(f),
              children: /* @__PURE__ */ r(
                $a,
                {
                  footnote: f,
                  layout: n,
                  formatCaller: () => g(f.caller, b),
                  showMarkers: s
                }
              )
            },
            v
          );
        })
      }
    )
  ] });
}
function Ha({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const o = n["%webView_inventory_occurrences_table_header_reference%"], a = n["%webView_inventory_occurrences_table_header_occurrence%"], s = H(() => {
    const i = [];
    return t.forEach((w) => {
      i.some((m) => nn(m, w)) || i.push(w);
    }), i;
  }, [t]);
  return /* @__PURE__ */ l(_e, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Se, { stickyHeader: !0, children: /* @__PURE__ */ l(St, { children: [
      /* @__PURE__ */ r(le, { children: o }),
      /* @__PURE__ */ r(le, { children: a })
    ] }) }),
    /* @__PURE__ */ r(Re, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ l(
      St,
      {
        onClick: () => {
          e(i.reference);
        },
        children: [
          /* @__PURE__ */ r(Ut, { children: `${$.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ r(Ut, { children: i.text })
        ]
      },
      `${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const un = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ge.Root,
  {
    ref: n,
    className: c(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      Ge.Indicator,
      {
        className: c("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
un.displayName = Ge.Root.displayName;
const me = u.forwardRef(
  ({ className: t, type: e, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: c(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: o,
      ...n
    }
  )
);
me.displayName = "Input";
const mr = Tt(
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
), Ua = u.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Un.Root,
  {
    ref: a,
    className: c(mr({ variant: e, size: n, className: t })),
    ...o
  }
));
Ua.displayName = Un.Root.displayName;
const ur = u.createContext({
  size: "default",
  variant: "default"
}), hr = u.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, s) => {
  const i = nt();
  return /* @__PURE__ */ r(
    ye.Root,
    {
      ref: s,
      className: c("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        ur.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
hr.displayName = ye.Root.displayName;
const he = u.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, s) => {
  const i = u.useContext(ur);
  return /* @__PURE__ */ r(
    ye.Item,
    {
      ref: s,
      className: c(
        mr({
          variant: i.variant || n,
          size: i.size || o
        }),
        t
      ),
      ...a,
      children: e
    }
  );
});
he.displayName = ye.Item.displayName;
const Te = (t) => t === "asc" ? /* @__PURE__ */ r(uo, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(ho, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(fo, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Bi = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ l(M, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    Te(e.getIsSorted())
  ] })
}), Ka = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ l(M, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    Te(n.getIsSorted())
  ] })
}), Gi = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ l(M, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    Te(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Ae = (t, e, n, o, a, s) => {
  let i = [...n];
  t.forEach((m) => {
    e === "approved" ? i.includes(m) || i.push(m) : i = i.filter((d) => d !== m);
  }), o(i);
  let w = [...a];
  t.forEach((m) => {
    e === "unapproved" ? w.includes(m) || w.push(m) : w = w.filter((d) => d !== m);
  }), s(w);
}, Fi = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ l(M, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    t,
    Te(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), w = s.getValue("item");
    return /* @__PURE__ */ l(hr, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
        he,
        {
          onClick: (m) => {
            m.stopPropagation(), Ae(
              [w],
              "approved",
              e,
              n,
              o,
              a
            );
          },
          value: "approved",
          children: /* @__PURE__ */ r(co, {})
        }
      ),
      /* @__PURE__ */ r(
        he,
        {
          onClick: (m) => {
            m.stopPropagation(), Ae(
              [w],
              "unapproved",
              e,
              n,
              o,
              a
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ r(po, {})
        }
      ),
      /* @__PURE__ */ r(
        he,
        {
          onClick: (m) => {
            m.stopPropagation(), Ae(
              [w],
              "unknown",
              e,
              n,
              o,
              a
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(mo, {})
        }
      )
    ] });
  }
}), Xi = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Hi = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Ui = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Ya = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ki = Object.freeze([
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
]), qa = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, Ja = (t, e, n) => {
  const o = [];
  return t.forEach((a) => {
    const s = o.find(
      (i) => nn(
        i.items,
        Me(a.inventoryText) ? [a.inventoryText] : a.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: a.verseRef,
        text: a.verse
      });
    else {
      const i = {
        items: Me(a.inventoryText) ? [a.inventoryText] : a.inventoryText,
        count: 1,
        status: Ya(
          Me(a.inventoryText) ? a.inventoryText : a.inventoryText[0],
          e,
          n
        ),
        occurrences: [
          {
            reference: a.verseRef,
            text: a.verse
          }
        ]
      };
      o.push(i);
    }
  }), o;
}, Nt = (t, e) => t[e] ?? e;
function Yi({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: w,
  columns: m,
  id: d
}) {
  const p = Nt(n, "%webView_inventory_all%"), g = Nt(n, "%webView_inventory_approved%"), h = Nt(n, "%webView_inventory_unapproved%"), f = Nt(n, "%webView_inventory_unknown%"), b = Nt(n, "%webView_inventory_scope_currentBook%"), y = Nt(n, "%webView_inventory_scope_chapter%"), v = Nt(n, "%webView_inventory_scope_verse%"), O = Nt(n, "%webView_inventory_filter_text%"), C = Nt(
    n,
    "%webView_inventory_show_additional_items%"
  ), [R, Y] = A(!1), [et, B] = A("all"), [ot, at] = A(""), [_, k] = A([]), j = H(() => t.length === 0 ? [] : Ja(t, a, s), [t, a, s]), T = H(() => {
    if (R) return j;
    const E = [];
    return j.forEach((Q) => {
      const W = Q.items[0], ct = E.find(
        (Ct) => Ct.items[0] === W
      );
      ct ? (ct.count += Q.count, ct.occurrences = ct.occurrences.concat(Q.occurrences)) : E.push({
        items: [W],
        count: Q.count,
        occurrences: Q.occurrences,
        status: Q.status
      });
    }), E;
  }, [R, j]), U = H(() => qa(T, et, ot), [T, et, ot]), S = H(() => {
    var W, ct;
    if (!R) return m;
    const E = (W = o == null ? void 0 : o.tableHeaders) == null ? void 0 : W.length;
    if (!E) return m;
    const Q = [];
    for (let Ct = 0; Ct < E; Ct++)
      Q.push(
        Ka(
          ((ct = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ct[Ct]) || "Additional Item",
          Ct + 1
        )
      );
    return [...Q, ...m];
  }, [o == null ? void 0 : o.tableHeaders, m, R]);
  It(() => {
    U.length === 0 ? k([]) : U.length === 1 && k(U[0].items);
  }, [U]);
  const q = (E, Q) => {
    Q.setRowSelection(() => {
      const W = {};
      return W[E.index] = !0, W;
    }), k(E.original.items);
  }, N = (E) => {
    if (E === "book" || E === "chapter" || E === "verse")
      w(E);
    else
      throw new Error(`Invalid scope value: ${E}`);
  }, J = (E) => {
    if (E === "all" || E === "approved" || E === "unapproved" || E === "unknown")
      B(E);
    else
      throw new Error(`Invalid status filter value: ${E}`);
  }, ft = H(() => {
    if (T.length === 0 || _.length === 0) return [];
    const E = T.filter((Q) => nn(
      R ? Q.items : [Q.items[0]],
      _
    ));
    if (E.length > 1) throw new Error("Selected item is not unique");
    return E.length === 0 ? [] : E[0].occurrences;
  }, [_, R, T]);
  return /* @__PURE__ */ l("div", { id: d, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ l(
        Xt,
        {
          onValueChange: (E) => J(E),
          defaultValue: et,
          children: [
            /* @__PURE__ */ r(zt, { className: "tw-m-1", children: /* @__PURE__ */ r(Ht, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ l($t, { children: [
              /* @__PURE__ */ r(mt, { value: "all", children: p }),
              /* @__PURE__ */ r(mt, { value: "approved", children: g }),
              /* @__PURE__ */ r(mt, { value: "unapproved", children: h }),
              /* @__PURE__ */ r(mt, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l(Xt, { onValueChange: (E) => N(E), defaultValue: i, children: [
        /* @__PURE__ */ r(zt, { className: "tw-m-1", children: /* @__PURE__ */ r(Ht, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ l($t, { children: [
          /* @__PURE__ */ r(mt, { value: "book", children: b }),
          /* @__PURE__ */ r(mt, { value: "chapter", children: y }),
          /* @__PURE__ */ r(mt, { value: "verse", children: v })
        ] })
      ] }),
      /* @__PURE__ */ r(
        me,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: O,
          value: ot,
          onChange: (E) => {
            at(E.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ l("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          un,
          {
            className: "tw-m-1",
            checked: R,
            onCheckedChange: (E) => {
              Y(E);
            }
          }
        ),
        /* @__PURE__ */ r(tt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? C })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Va,
      {
        columns: S,
        data: U,
        onRowClickHandler: q,
        stickyHeader: !0
      }
    ) }),
    ft.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Ha,
      {
        occurrenceData: ft,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const hn = u.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Kn.Root,
  {
    ref: a,
    decorative: n,
    orientation: e,
    className: c(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...o
  }
));
hn.displayName = Kn.Root.displayName;
function zn({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: c("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const fn = de.Provider, gn = de.Root, bn = de.Trigger, Ee = u.forwardRef(({ className: t, sideOffset: e = 4, ...n }, o) => /* @__PURE__ */ r(
  de.Content,
  {
    ref: o,
    sideOffset: e,
    className: c(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
Ee.displayName = de.Content.displayName;
const Wa = "16rem", Za = "3rem", fr = u.createContext(void 0);
function Ve() {
  const t = u.useContext(fr);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const gr = u.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: o,
    style: a,
    children: s,
    side: i = "primary",
    ...w
  }, m) => {
    const [d, p] = u.useState(t), g = e ?? d, h = u.useCallback(
      (R) => {
        const Y = typeof R == "function" ? R(g) : R;
        n ? n(Y) : p(Y);
      },
      [n, g]
    ), f = u.useCallback(() => h((R) => !R), [h]), b = g ? "expanded" : "collapsed", O = nt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", C = u.useMemo(
      () => ({
        state: b,
        open: g,
        setOpen: h,
        toggleSidebar: f,
        side: O
      }),
      [b, g, h, f, O]
    );
    return /* @__PURE__ */ r(fr.Provider, { value: C, children: /* @__PURE__ */ r(fn, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Wa,
            "--sidebar-width-icon": Za,
            ...a
          }
        ),
        className: c(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          o
        ),
        ref: m,
        ...w,
        children: s
      }
    ) }) });
  }
);
gr.displayName = "SidebarProvider";
const br = u.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = Ve();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: c(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: s,
      ...a,
      children: o
    }
  ) : /* @__PURE__ */ l(
    "div",
    {
      ref: s,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": i.state,
      "data-collapsible": i.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": i.side,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: c(
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
            className: c(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              i.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              n
            ),
            ...a,
            children: /* @__PURE__ */ r(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",
                children: o
              }
            )
          }
        )
      ]
    }
  );
});
br.displayName = "Sidebar";
const Qa = u.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = Ve();
  return /* @__PURE__ */ l(
    M,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: c("tw-h-7 tw-w-7", t),
      onClick: (s) => {
        e == null || e(s), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(go, {}) : /* @__PURE__ */ r(bo, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Qa.displayName = "SidebarTrigger";
const ts = u.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = Ve();
    return /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        ref: n,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: o,
        title: "Toggle Sidebar",
        className: c(
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
ts.displayName = "SidebarRail";
const vr = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: c(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
vr.displayName = "SidebarInset";
const es = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  me,
  {
    ref: n,
    "data-sidebar": "input",
    className: c(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
es.displayName = "SidebarInput";
const ns = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: c("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
ns.displayName = "SidebarHeader";
const rs = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: c("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
rs.displayName = "SidebarFooter";
const os = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  hn,
  {
    ref: n,
    "data-sidebar": "separator",
    className: c("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
os.displayName = "SidebarSeparator";
const xr = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: c(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
xr.displayName = "SidebarContent";
const qe = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: c("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
qe.displayName = "SidebarGroup";
const Je = u.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Kt : "div",
  {
    ref: o,
    "data-sidebar": "group-label",
    className: c(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
Je.displayName = "SidebarGroupLabel";
const as = u.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Kt : "button",
  {
    ref: o,
    "data-sidebar": "group-action",
    className: c(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
as.displayName = "SidebarGroupAction";
const We = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: c("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
We.displayName = "SidebarGroupContent";
const yr = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: c("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
yr.displayName = "SidebarMenu";
const Nr = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: c("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
Nr.displayName = "SidebarMenuItem";
const ss = Tt(
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
), kr = u.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, w) => {
    const m = t ? Kt : "button", { state: d } = Ve(), p = /* @__PURE__ */ r(
      m,
      {
        ref: w,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: c(ss({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ l(gn, { children: [
      /* @__PURE__ */ r(bn, { asChild: !0, children: p }),
      /* @__PURE__ */ r(Ee, { side: "right", align: "center", hidden: d !== "collapsed", ...a })
    ] })) : p;
  }
);
kr.displayName = "SidebarMenuButton";
const is = u.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Kt : "button",
  {
    ref: a,
    "data-sidebar": "menu-action",
    className: c(
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
    ...o
  }
));
is.displayName = "SidebarMenuAction";
const ws = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: c(
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
ws.displayName = "SidebarMenuBadge";
const ls = u.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = u.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: c("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(zn, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          zn,
          {
            className: "tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: (
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              {
                "--skeleton-width": a
              }
            )
          }
        )
      ]
    }
  );
});
ls.displayName = "SidebarMenuSkeleton";
const ds = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: c(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
ds.displayName = "SidebarMenuSub";
const cs = u.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
cs.displayName = "SidebarMenuSubItem";
const ps = u.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  t ? Kt : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: c(
      "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
      "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
      e === "sm" && "tw-text-xs",
      e === "md" && "tw-text-sm",
      "group-data-[collapsible=icon]:tw-hidden",
      o
    ),
    ...a
  }
));
ps.displayName = "SidebarMenuSubButton";
function ms({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: w,
  className: m
}) {
  const d = L(
    (h, f) => {
      o(h, f);
    },
    [o]
  ), p = L(
    (h) => {
      const f = n.find((b) => b.projectId === h);
      return f ? f.projectName : h;
    },
    [n]
  ), g = L(
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    br,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: c("tw-w-96 tw-gap-2 tw-overflow-y-auto", m),
      children: /* @__PURE__ */ l(xr, { children: [
        /* @__PURE__ */ l(qe, { children: [
          /* @__PURE__ */ r(Je, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(We, { children: /* @__PURE__ */ r(yr, { children: Object.entries(e).map(([h, f]) => /* @__PURE__ */ r(Nr, { children: /* @__PURE__ */ r(
            kr,
            {
              onClick: () => d(h),
              isActive: g(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: f })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ l(qe, { children: [
          /* @__PURE__ */ r(Je, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(We, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            Ue,
            {
              buttonVariant: "ghost",
              buttonClassName: c("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: p,
              buttonPlaceholder: w,
              onChange: (h) => {
                const f = p(h);
                d(f, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(vo, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const vn = Qe(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, w) => {
    const m = nt();
    return /* @__PURE__ */ l("div", { id: i, className: c("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        Bn,
        {
          className: c(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": m === "rtl" },
            { "tw-left-3": m === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        me,
        {
          ref: w,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (d) => e(d.target.value),
          disabled: s
        }
      ),
      t && /* @__PURE__ */ l(
        M,
        {
          variant: "ghost",
          size: "icon",
          className: c(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": m === "rtl" },
            { "tw-right-0": m === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(tn, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
vn.displayName = "SearchBar";
function qi({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: w,
  extensionsSidebarGroupLabel: m,
  projectsSidebarGroupLabel: d,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ l("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      vn,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: w,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ l(
      gr,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            ms,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: m,
              projectsSidebarGroupLabel: d,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ r(vr, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const _t = "scrBook", us = "scrRef", Dt = "source", hs = "details", fs = "Scripture Reference", gs = "Scripture Book", Cr = "Type", bs = "Details";
function vs(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: _t,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? fs,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? $.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === _t ? Bt(a.start) : void 0;
      },
      getGroupingValue: (o) => $.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Be(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Bt(o.start),
      id: us,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Bt(a.start);
      },
      sortingFn: (o, a) => Be(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Dt,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Cr : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: hs,
      header: (t == null ? void 0 : t.detailsColumnName) ?? bs,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const xs = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Be(t.start, t.end) === 0 ? `${De(t.start)}+${e}` : `${De(t.start)}+${e}-${De(t.end)}+${n}`;
}, $n = (t) => `${xs({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Ji({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: w,
  id: m
}) {
  const [d, p] = A([]), [g, h] = A([{ id: _t, desc: !1 }]), [f, b] = A({}), y = H(
    () => t.flatMap((_) => _.data.map((k) => ({
      ...k,
      source: _.source
    }))),
    [t]
  ), v = H(
    () => vs(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [o, s, i, n]
  );
  It(() => {
    d.includes(Dt) ? h([
      { id: Dt, desc: !1 },
      { id: _t, desc: !1 }
    ]) : h([{ id: _t, desc: !1 }]);
  }, [d]);
  const O = Fn({
    data: y,
    columns: v,
    state: {
      grouping: d,
      sorting: g,
      rowSelection: f
    },
    onGroupingChange: p,
    onSortingChange: h,
    onRowSelectionChange: b,
    getExpandedRowModel: Ao(),
    getGroupedRowModel: Io(),
    getCoreRowModel: Hn(),
    getSortedRowModel: Xn(),
    getRowId: $n,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  It(() => {
    if (w) {
      const _ = O.getSelectedRowModel().rowsById, k = Object.keys(_);
      if (k.length === 1) {
        const j = y.find((T) => $n(T) === k[0]) || void 0;
        j && w(j);
      }
    }
  }, [f, y, w, O]);
  const C = a ?? gs, R = s ?? Cr, Y = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${C}`, value: [_t] },
    { label: `Group by ${R}`, value: [Dt] },
    {
      label: `Group by ${C} and ${R}`,
      value: [_t, Dt]
    },
    {
      label: `Group by ${R} and ${C}`,
      value: [Dt, _t]
    }
  ], et = (_) => {
    p(JSON.parse(_));
  }, B = (_, k) => {
    !_.getIsGrouped() && !_.getIsSelected() && _.getToggleSelectedHandler()(k);
  }, ot = (_, k) => _.getIsGrouped() ? "" : c("banded-row", k % 2 === 0 ? "even" : "odd"), at = (_, k, j) => {
    if (!((_ == null ? void 0 : _.length) === 0 || k.depth < j.column.getGroupedIndex())) {
      if (k.getIsGrouped())
        switch (k.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (k.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ l("div", { id: m, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ l(
      Xt,
      {
        value: JSON.stringify(d),
        onValueChange: (_) => {
          et(_);
        },
        children: [
          /* @__PURE__ */ r(zt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Ht, {}) }),
          /* @__PURE__ */ r($t, { position: "item-aligned", children: /* @__PURE__ */ r(va, { children: Y.map((_) => /* @__PURE__ */ r(mt, { value: JSON.stringify(_.value), children: _.label }, _.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ l(_e, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Se, { children: O.getHeaderGroups().map((_) => /* @__PURE__ */ r(St, { children: _.headers.filter((k) => k.column.columnDef.header).map((k) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(le, { colSpan: k.colSpan, className: "top-0 tw-sticky", children: k.isPlaceholder ? void 0 : /* @__PURE__ */ l("div", { children: [
          k.column.getCanGroup() ? /* @__PURE__ */ r(
            M,
            {
              variant: "ghost",
              title: `Toggle grouping by ${k.column.columnDef.header}`,
              onClick: k.column.getToggleGroupingHandler(),
              type: "button",
              children: k.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          ae(k.column.columnDef.header, k.getContext())
        ] }) }, k.id)
      )) }, _.id)) }),
      /* @__PURE__ */ r(Re, { children: O.getRowModel().rows.map((_, k) => {
        const j = nt();
        return /* @__PURE__ */ r(
          St,
          {
            "data-state": _.getIsSelected() ? "selected" : "",
            className: c(ot(_, k)),
            onClick: (T) => B(_, T),
            children: _.getVisibleCells().map((T) => {
              if (!(T.getIsPlaceholder() || T.column.columnDef.enableGrouping && !T.getIsGrouped() && (T.column.columnDef.id !== Dt || !n)))
                return /* @__PURE__ */ r(
                  Ut,
                  {
                    className: c(
                      T.column.columnDef.id,
                      "tw-p-[1px]",
                      at(d, _, T)
                    ),
                    children: T.getIsGrouped() ? /* @__PURE__ */ l(
                      M,
                      {
                        variant: "link",
                        onClick: _.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          _.getIsExpanded() && /* @__PURE__ */ r(xe, {}),
                          !_.getIsExpanded() && (j === "ltr" ? /* @__PURE__ */ r(Ft, {}) : /* @__PURE__ */ r(je, {})),
                          " ",
                          ae(T.column.columnDef.cell, T.getContext()),
                          " (",
                          _.subRows.length,
                          ")"
                        ]
                      }
                    ) : ae(T.column.columnDef.cell, T.getContext())
                  },
                  T.id
                );
            })
          },
          _.id
        );
      }) })
    ] })
  ] });
}
const xn = (t, e) => t.filter((n) => {
  try {
    return oe(n) === e;
  } catch {
    return !1;
  }
}), _r = (t, e, n) => xn(t, e).every((o) => n.includes(o));
function ys({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = xn(e, t).length === 0, i = a["%scripture_section_ot_short%"], w = a["%scripture_section_nt_short%"], m = a["%scripture_section_dc_short%"], d = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    M,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: c(
        _r(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: oa(
        t,
        i,
        w,
        m,
        d
      )
    }
  );
}
const jn = 5, Pe = 6;
function Ns({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], w = o["%webView_book_selector_search_books%"], m = o["%webView_book_selector_select_all%"], d = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], g = o["%webView_book_selector_more%"], { otLong: h, ntLong: f, dcLong: b, extraLong: y } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, O] = A(!1), [C, R] = A(""), Y = rt(void 0), et = rt(!1);
  if (t.length !== $.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const B = H(() => $.allBookIds.filter(
    (S, q) => t[q] === "1" && !$.isObsolete($.bookIdToNumber(S))
  ), [t]), ot = H(() => {
    if (!C.trim()) {
      const N = {
        [D.OT]: [],
        [D.NT]: [],
        [D.DC]: [],
        [D.Extra]: []
      };
      return B.forEach((J) => {
        const ft = oe(J);
        N[ft].push(J);
      }), N;
    }
    const S = B.filter(
      (N) => wn(N, C, a)
    ), q = {
      [D.OT]: [],
      [D.NT]: [],
      [D.DC]: [],
      [D.Extra]: []
    };
    return S.forEach((N) => {
      const J = oe(N);
      q[J].push(N);
    }), q;
  }, [B, C, a]), at = L(
    (S, q = !1) => {
      if (!q || !Y.current) {
        n(
          e.includes(S) ? e.filter((W) => W !== S) : [...e, S]
        ), Y.current = S;
        return;
      }
      const N = B.findIndex((W) => W === Y.current), J = B.findIndex((W) => W === S);
      if (N === -1 || J === -1) return;
      const [ft, E] = [
        Math.min(N, J),
        Math.max(N, J)
      ], Q = B.slice(ft, E + 1).map((W) => W);
      n(
        e.includes(S) ? e.filter((W) => !Q.includes(W)) : [.../* @__PURE__ */ new Set([...e, ...Q])]
      );
    },
    [e, n, B]
  ), _ = (S) => {
    at(S, et.current), et.current = !1;
  }, k = (S, q) => {
    S.preventDefault(), at(q, S.shiftKey);
  }, j = L(
    (S) => {
      const q = xn(B, S).map((N) => N);
      n(
        _r(B, S, e) ? e.filter((N) => !q.includes(N)) : [.../* @__PURE__ */ new Set([...e, ...q])]
      );
    },
    [e, n, B]
  ), T = () => {
    n(B.map((S) => S));
  }, U = () => {
    n([]);
  };
  return /* @__PURE__ */ l("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(D).map((S) => /* @__PURE__ */ r(
      ys,
      {
        section: S,
        availableBookIds: B,
        selectedBookIds: e,
        onToggle: j,
        localizedStrings: o
      },
      S
    )) }),
    /* @__PURE__ */ l(
      Zt,
      {
        open: v,
        onOpenChange: (S) => {
          O(S), S || R("");
        },
        children: [
          /* @__PURE__ */ r(Qt, { asChild: !0, children: /* @__PURE__ */ l(
            M,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : i,
                /* @__PURE__ */ r(en, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Lt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ l(
            qt,
            {
              shouldFilter: !1,
              onKeyDown: (S) => {
                S.key === "Enter" && (et.current = S.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  ce,
                  {
                    placeholder: w,
                    value: C,
                    onValueChange: R
                  }
                ),
                /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(M, { variant: "ghost", size: "sm", onClick: T, children: m }),
                  /* @__PURE__ */ r(M, { variant: "ghost", size: "sm", onClick: U, children: d })
                ] }),
                /* @__PURE__ */ l(Jt, { children: [
                  /* @__PURE__ */ r(Ne, { children: p }),
                  Object.values(D).map((S, q) => {
                    const N = ot[S];
                    if (N.length !== 0)
                      return /* @__PURE__ */ l(Ln, { children: [
                        /* @__PURE__ */ r(
                          At,
                          {
                            heading: nr(S, h, f, b, y),
                            children: N.map((J) => /* @__PURE__ */ r(
                              or,
                              {
                                bookId: J,
                                isSelected: e.includes(J),
                                onSelect: () => _(J),
                                onMouseDown: (ft) => k(ft, J),
                                section: oe(J),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: He(J, a),
                                className: "tw-flex tw-items-center"
                              },
                              J
                            ))
                          }
                        ),
                        q < Object.values(D).length - 1 && /* @__PURE__ */ r(qn, {})
                      ] }, S);
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
        e.length === Pe ? Pe : jn
      ).map((S) => /* @__PURE__ */ r(ge, { className: "hover:tw-bg-secondary", variant: "secondary", children: Gt(S, a) }, S)),
      e.length > Pe && /* @__PURE__ */ r(
        ge,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - jn} ${g}`
        }
      )
    ] })
  ] });
}
const Wi = Object.freeze([
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
]), Vt = (t, e) => t[e] ?? e;
function Zi({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: w,
  id: m
}) {
  const d = Vt(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = Vt(
    i,
    "%webView_scope_selector_current_verse%"
  ), g = Vt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), h = Vt(i, "%webView_scope_selector_current_book%"), f = Vt(i, "%webView_scope_selector_choose_books%"), b = Vt(i, "%webView_scope_selector_scope%"), y = Vt(i, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: d, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: g, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: f, id: "scope-selected" }
  ], O = e ? v.filter((C) => e.includes(C.value)) : v;
  return /* @__PURE__ */ l("div", { id: m, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(tt, { children: b }),
      /* @__PURE__ */ r(
        ln,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: O.map(({ value: C, label: R, id: Y }) => /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(fe, { className: "tw-me-2", value: C, id: Y }),
            /* @__PURE__ */ r(tt, { htmlFor: Y, children: R })
          ] }, Y))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(tt, { children: y }),
      /* @__PURE__ */ r(
        Ns,
        {
          availableBookInfo: o,
          selectedBookIds: a,
          onChangeSelectedBookIds: s,
          localizedStrings: i,
          localizedBookNames: w
        }
      )
    ] })
  ] });
}
const ze = {
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
function Qi({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const w = {
    ...ze,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([d, p]) => [
          d,
          d === p && d in ze ? ze[d] : p
        ]
      )
    )
  }, m = nt();
  return /* @__PURE__ */ l(
    Xt,
    {
      value: `${e}`,
      onValueChange: (d) => n(
        d === "undefined" ? void 0 : parseInt(d, 10)
      ),
      children: [
        /* @__PURE__ */ r(zt, { size: a, className: c("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Ht,
          {
            placeholder: w[z(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          $t,
          {
            id: i,
            align: m === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((d) => /* @__PURE__ */ r(mt, { value: `${d}`, children: w[z(d)] }, `${d}`))
          }
        )
      ]
    }
  );
}
function tw({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function ew({
  primary: t,
  secondary: e,
  children: n,
  isLoading: o = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: a }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function nw({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ l("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(hn, {}) : ""
  ] });
}
function Sr(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function be({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: c("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Rr = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((w) => w.group === s).sort((w, m) => w.order - m.order).map((w) => /* @__PURE__ */ l(gn, { children: [
  /* @__PURE__ */ r(bn, { asChild: !0, children: "command" in w ? /* @__PURE__ */ l(
    wr,
    {
      onClick: () => {
        o(w);
      },
      children: [
        w.iconPathBefore && /* @__PURE__ */ r(be, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
        w.label,
        w.iconPathAfter && /* @__PURE__ */ r(be, { icon: w.iconPathAfter, menuLabel: w.label })
      ]
    },
    `dropdown-menu-item-${w.label}-${w.command}`
  ) : /* @__PURE__ */ l(ha, { children: [
    /* @__PURE__ */ r(sr, { children: w.label }),
    /* @__PURE__ */ r(ua, { children: /* @__PURE__ */ r(ir, { children: Rr(
      t,
      e,
      Sr(t, w.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${w.label}-${w.id}`) }),
  w.tooltip && /* @__PURE__ */ r(Ee, { children: w.tooltip })
] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`))) : void 0;
function Ze({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: w
}) {
  return /* @__PURE__ */ l(ke, { variant: s, children: [
    /* @__PURE__ */ r(cn, { "aria-label": n, className: a, asChild: !0, id: w, children: /* @__PURE__ */ r(M, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(xo, {}) }) }),
    /* @__PURE__ */ r(pe, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, m]) => typeof m == "object").sort(([, m], [, d]) => typeof m == "boolean" || typeof d == "boolean" ? 0 : m.order - d.order).map(([m], d, p) => /* @__PURE__ */ l(Ln, { children: [
      /* @__PURE__ */ r(ar, { children: /* @__PURE__ */ r(fn, { children: Rr(e.groups, e.items, m, t) }) }),
      d < p.length - 1 && /* @__PURE__ */ r(Ce, {})
    ] }, m)) })
  ] });
}
const Tr = u.forwardRef(
  ({ id: t, className: e, children: n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: `tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,
      id: t,
      children: n
    }
  )
);
function rw({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: w,
  endAreaChildren: m,
  menuButtonIcon: d
}) {
  return /* @__PURE__ */ l(Tr, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      Ze,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: d ?? /* @__PURE__ */ r(yo, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
    w && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: w }),
    /* @__PURE__ */ l("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
      o && /* @__PURE__ */ r(
        Ze,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(No, {}),
          className: "tw-h-full"
        }
      ),
      m
    ] })
  ] });
}
function ow({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(Tr, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    Ze,
    {
      onSelectMenuItem: t,
      menuData: e,
      tabLabel: "Project",
      icon: a,
      className: `tw-pointer-events-auto tw-shadow-lg ${o}`,
      buttonVariant: "outline"
    }
  ) });
}
const Er = u.forwardRef(({ className: t, ...e }, n) => {
  const o = nt();
  return /* @__PURE__ */ r(
    dt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: c("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Er.displayName = dt.List.displayName;
const Vr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.List,
  {
    ref: n,
    className: c(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Vr.displayName = dt.List.displayName;
const ks = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Trigger,
  {
    ref: n,
    ...e,
    className: c(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Mr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Content,
  {
    ref: n,
    className: c(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Mr.displayName = dt.Content.displayName;
function aw({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: s,
  id: i
}) {
  return /* @__PURE__ */ l("div", { id: i, className: "pr-twp", children: [
    /* @__PURE__ */ l("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        vn,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ l(Er, { children: [
      /* @__PURE__ */ r(Vr, { children: t.map((w) => /* @__PURE__ */ r(ks, { value: w.value, children: w.value }, w.key)) }),
      t.map((w) => /* @__PURE__ */ r(Mr, { value: w.value, children: w.content }, w.key))
    ] })
  ] });
}
function Cs({ ...t }) {
  return /* @__PURE__ */ r(F.Menu, { ...t });
}
function _s({ ...t }) {
  return /* @__PURE__ */ r(F.Sub, { "data-slot": "menubar-sub", ...t });
}
const Dr = u.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = u.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(dn.Provider, { value: a, children: /* @__PURE__ */ r(
    F.Root,
    {
      ref: o,
      className: c(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...n
    }
  ) });
});
Dr.displayName = F.Root.displayName;
const Or = u.forwardRef(({ className: t, ...e }, n) => {
  const o = ht();
  return /* @__PURE__ */ r(
    F.Trigger,
    {
      ref: n,
      className: c(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        kt({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
Or.displayName = F.Trigger.displayName;
const Ir = u.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const s = ht();
  return /* @__PURE__ */ l(
    F.SubTrigger,
    {
      ref: a,
      className: c(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        kt({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Ft, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Ir.displayName = F.SubTrigger.displayName;
const Ar = u.forwardRef(({ className: t, ...e }, n) => {
  const o = ht();
  return /* @__PURE__ */ r(
    F.SubContent,
    {
      ref: n,
      className: c(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": o.variant === "muted"
        },
        t
      ),
      ...e
    }
  );
});
Ar.displayName = F.SubContent.displayName;
const Pr = u.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = ht();
  return /* @__PURE__ */ r(F.Portal, { children: /* @__PURE__ */ r(
    F.Content,
    {
      ref: s,
      align: e,
      alignOffset: n,
      sideOffset: o,
      className: c(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": i.variant === "muted"
        },
        t
      ),
      ...a
    }
  ) });
});
Pr.displayName = F.Content.displayName;
const zr = u.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = ht();
  return /* @__PURE__ */ r(
    F.Item,
    {
      ref: o,
      className: c(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        kt({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
zr.displayName = F.Item.displayName;
const Ss = u.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const s = ht();
  return /* @__PURE__ */ l(
    F.CheckboxItem,
    {
      ref: a,
      className: c(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        kt({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(F.ItemIndicator, { children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Ss.displayName = F.CheckboxItem.displayName;
const Rs = u.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = ht();
  return /* @__PURE__ */ l(
    F.RadioItem,
    {
      ref: o,
      className: c(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        kt({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(F.ItemIndicator, { children: /* @__PURE__ */ r(ve, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Rs.displayName = F.RadioItem.displayName;
const Ts = u.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  F.Label,
  {
    ref: o,
    className: c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Ts.displayName = F.Label.displayName;
const $r = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  F.Separator,
  {
    ref: n,
    className: c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
$r.displayName = F.Separator.displayName;
const ne = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, jr = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const w = e.filter((d) => d.group === s).sort((d, p) => d.order - p.order).map((d) => /* @__PURE__ */ l(gn, { children: [
      /* @__PURE__ */ r(bn, { asChild: !0, children: "command" in d ? /* @__PURE__ */ l(
        zr,
        {
          onClick: () => {
            o(d);
          },
          children: [
            d.iconPathBefore && /* @__PURE__ */ r(be, { icon: d.iconPathBefore, menuLabel: d.label, leading: !0 }),
            d.label,
            d.iconPathAfter && /* @__PURE__ */ r(be, { icon: d.iconPathAfter, menuLabel: d.label })
          ]
        },
        `menubar-item-${d.label}-${d.command}`
      ) : /* @__PURE__ */ l(_s, { children: [
        /* @__PURE__ */ r(Ir, { children: d.label }),
        /* @__PURE__ */ r(Ar, { children: jr(
          t,
          e,
          Sr(t, d.id),
          o
        ) })
      ] }, `menubar-sub-${d.label}-${d.id}`) }),
      d.tooltip && /* @__PURE__ */ r(Ee, { children: d.tooltip })
    ] }, `tooltip-${d.label}-${"command" in d ? d.command : d.id}`)), m = [...w];
    return w.length > 0 && i < a.length - 1 && m.push(/* @__PURE__ */ r($r, {}, `separator-${s}`)), m;
  });
};
function Es({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = rt(void 0), s = rt(void 0), i = rt(void 0), w = rt(void 0), m = rt(void 0), d = (p) => {
    switch (p) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return w;
      case "platform.help":
        return m;
      default:
        return;
    }
  };
  if ($o(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, g) => {
    var b, y, v, O;
    p.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, f = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (g.hotkey) {
      case "alt":
        ne(s, [h]);
        break;
      case "alt+p":
        (b = s.current) == null || b.focus(), ne(s, [h, f]);
        break;
      case "alt+l":
        (y = i.current) == null || y.focus(), ne(i, [h, f]);
        break;
      case "alt+n":
        (v = w.current) == null || v.focus(), ne(w, [h, f]);
        break;
      case "alt+h":
        (O = m.current) == null || O.focus(), ne(m, [h, f]);
        break;
    }
  }), It(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((f) => {
      f.forEach((b) => {
        if (b.attributeName === "data-state" && b.target instanceof HTMLElement) {
          const y = b.target.getAttribute("data-state");
          n(y === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((f) => {
      p.observe(f, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(Dr, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, g]) => typeof p == "boolean" || typeof g == "boolean" ? 0 : p.order - g.order).map(([p, g]) => /* @__PURE__ */ l(Cs, { children: [
      /* @__PURE__ */ r(Or, { ref: d(p), children: typeof g == "object" && "label" in g && g.label }),
      /* @__PURE__ */ r(
        Pr,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(fn, { children: jr(t.groups, t.items, p, e) })
        }
      )
    ] }, p)) });
}
function sw(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function iw({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: w,
  shouldUseAsAppDragArea: m,
  menubarVariant: d = "default"
}) {
  const p = rt(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: c("tw-border tw-px-4 tw-text-foreground", o),
      ref: p,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ l(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: m ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ l(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: m ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ r(
                    Es,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: n,
                      variant: d
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: m ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: m ? { WebkitAppRegion: "no-drag" } : void 0,
                children: w
              }
            ) })
          ]
        }
      )
    }
  );
}
const Vs = (t, e) => t[e] ?? e;
function ww({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: w,
  id: m
}) {
  const d = Vs(
    i,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [p, g] = A(!1), h = (b) => {
    a && a(b), o && o([b, ...n.filter((y) => y !== b)]), s && n.find((y) => y === b) && s([...n.filter((y) => y !== b)]), g(!1);
  }, f = (b, y) => {
    var O, C, R, Y, et, B;
    const v = y !== b ? ((C = (O = t[b]) == null ? void 0 : O.uiNames) == null ? void 0 : C[y]) ?? ((Y = (R = t[b]) == null ? void 0 : R.uiNames) == null ? void 0 : Y.en) : void 0;
    return v ? `${(et = t[b]) == null ? void 0 : et.autonym} (${v})` : (B = t[b]) == null ? void 0 : B.autonym;
  };
  return /* @__PURE__ */ l("div", { id: m, className: c("pr-twp tw-max-w-sm", w), children: [
    /* @__PURE__ */ l(
      Xt,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: p,
        onOpenChange: (b) => g(b),
        children: [
          /* @__PURE__ */ r(zt, { children: /* @__PURE__ */ r(Ht, {}) }),
          /* @__PURE__ */ r(
            $t,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((b) => /* @__PURE__ */ r(mt, { value: b, children: f(b, e) }, b))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ l(bt, { children: [
      /* @__PURE__ */ r(tt, { className: "tw-ms-3", children: d }),
      /* @__PURE__ */ r("div", { className: "tw-ms-3", children: /* @__PURE__ */ l(tt, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((b) => f(b, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
function Ms({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(tt, { children: e(t) }) : n ? /* @__PURE__ */ r(tt, { children: n(t) }) : /* @__PURE__ */ r(tt, { children: t });
}
function lw({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((w) => /* @__PURE__ */ l("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      un,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(w),
        onCheckedChange: (m) => a(w, m)
      }
    ),
    /* @__PURE__ */ r(
      Ms,
      {
        item: w,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, w)) });
}
function dw({
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: s,
  children: i,
  dropdownContent: w,
  additionalSelectedContent: m,
  accentColor: d
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      hidden: a,
      onClick: n,
      onKeyDown: (g) => {
        (g.key === "Enter" || g.key === " ") && (g.preventDefault(), n());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: c(
        "tw-relative tw-min-w-36 tw-cursor-pointer tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": o && !e },
        { "tw-bg-accent": e },
        { "tw-bg-transparent": !e },
        s
      ),
      children: [
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: i }),
            e && w && /* @__PURE__ */ l(ke, { children: [
              /* @__PURE__ */ r(cn, { className: c(d && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(M, { className: "tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(ko, {}) }) }),
              /* @__PURE__ */ r(pe, { align: "end", children: w })
            ] })
          ] }),
          e && m && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: m })
        ] }),
        d && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${d}`
          }
        )
      ]
    },
    t
  );
}
const Ds = Qe(({ className: t, ...e }, n) => /* @__PURE__ */ r(Co, { size: 35, className: c("tw-animate-spin", t), ...e, ref: n }));
Ds.displayName = "Spinner";
function cw({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: w = !1,
  className: m,
  defaultValue: d,
  value: p,
  onChange: g,
  onFocus: h,
  onBlur: f
}) {
  return /* @__PURE__ */ l("div", { className: c("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      tt,
      {
        htmlFor: t,
        className: c({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${w ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      me,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: w,
        className: c(m, { "tw-border-red-600": n }),
        defaultValue: d,
        value: p,
        onChange: g,
        onFocus: h,
        onBlur: f
      }
    ),
    /* @__PURE__ */ r("p", { className: c({ "tw-hidden": !a }), children: a })
  ] });
}
const Os = Tt(
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
), Is = u.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: c(
      // CUSTOM
      "pr-twp",
      Os({ variant: e }),
      t
    ),
    ...n
  }
));
Is.displayName = "Alert";
const As = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ l(
    "h5",
    {
      ref: n,
      className: c("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
As.displayName = "AlertTitle";
const Ps = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: c("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Ps.displayName = "AlertDescription";
const zs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Root,
  {
    ref: n,
    className: c(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
zs.displayName = Yt.Root.displayName;
const $s = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Image,
  {
    ref: n,
    className: c("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
$s.displayName = Yt.Image.displayName;
const js = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Yt.Fallback,
  {
    ref: n,
    className: c(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
js.displayName = Yt.Fallback.displayName;
const pw = X.Root, mw = X.Trigger, uw = X.Group, hw = X.Portal, fw = X.Sub, gw = X.RadioGroup, Ls = u.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ l(
  X.SubTrigger,
  {
    ref: a,
    className: c(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      e && "tw-pl-8",
      t
    ),
    ...o,
    children: [
      n,
      /* @__PURE__ */ r(Ft, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Ls.displayName = X.SubTrigger.displayName;
const Bs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.SubContent,
  {
    ref: n,
    className: c(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Bs.displayName = X.SubContent.displayName;
const Gs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(X.Portal, { children: /* @__PURE__ */ r(
  X.Content,
  {
    ref: n,
    className: c(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
Gs.displayName = X.Content.displayName;
const Fs = u.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  X.Item,
  {
    ref: o,
    className: c(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
Fs.displayName = X.Item.displayName;
const Xs = u.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ l(
  X.CheckboxItem,
  {
    ref: a,
    className: c(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
Xs.displayName = X.CheckboxItem.displayName;
const Hs = u.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ l(
  X.RadioItem,
  {
    ref: o,
    className: c(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(ve, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Hs.displayName = X.RadioItem.displayName;
const Us = u.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  X.Label,
  {
    ref: o,
    className: c(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
Us.displayName = X.Label.displayName;
const Ks = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.Separator,
  {
    ref: n,
    className: c("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Ks.displayName = X.Separator.displayName;
function Ys({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: c("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Ys.displayName = "ContextMenuShortcut";
const Lr = u.createContext({
  direction: "bottom"
});
function qs({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = u.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Lr.Provider, { value: o, children: /* @__PURE__ */ r(
    ut.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
qs.displayName = "Drawer";
const bw = ut.Trigger, Js = ut.Portal, vw = ut.Close, Br = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ut.Overlay,
  {
    ref: n,
    className: c("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Br.displayName = ut.Overlay.displayName;
const Ws = u.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = u.useContext(Lr), i = {
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
  return /* @__PURE__ */ l(Js, { children: [
    /* @__PURE__ */ r(Br, {}),
    /* @__PURE__ */ l(
      ut.Content,
      {
        ref: a,
        className: c(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          s === "bottom" || s === "top" ? "tw-flex-col" : "tw-flex-row",
          i[s],
          t
        ),
        ...o,
        children: [
          !n && (s === "bottom" || s === "right") && /* @__PURE__ */ r("div", { className: w[s] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: e }),
          !n && (s === "top" || s === "left") && /* @__PURE__ */ r("div", { className: w[s] })
        ]
      }
    )
  ] });
});
Ws.displayName = "DrawerContent";
function Zs({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: c("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
Zs.displayName = "DrawerHeader";
function Qs({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: c("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
Qs.displayName = "DrawerFooter";
const ti = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ut.Title,
  {
    ref: n,
    className: c("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
ti.displayName = ut.Title.displayName;
const ei = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ut.Description,
  {
    ref: n,
    className: c("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
ei.displayName = ut.Description.displayName;
const ni = u.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  Fe.Root,
  {
    ref: o,
    className: c(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      Fe.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
ni.displayName = Fe.Root.displayName;
function xw({ ...t }) {
  return /* @__PURE__ */ r(
    jo,
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
const ri = u.forwardRef(({ className: t, ...e }, n) => {
  const o = nt();
  return /* @__PURE__ */ l(
    re.Root,
    {
      ref: n,
      className: c(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(re.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(re.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(re.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
ri.displayName = re.Root.displayName;
const oi = u.forwardRef(({ className: t, ...e }, n) => {
  const o = nt();
  return /* @__PURE__ */ r(
    Xe.Root,
    {
      className: c(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        Xe.Thumb,
        {
          className: c(
            "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",
            {
              "data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0": o === "ltr"
            },
            {
              "data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0": o === "rtl"
            }
          )
        }
      )
    }
  );
});
oi.displayName = Xe.Root.displayName;
const yw = dt.Root, ai = u.forwardRef(({ className: t, ...e }, n) => {
  const o = nt();
  return /* @__PURE__ */ r(
    dt.List,
    {
      ref: n,
      className: c(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: o
    }
  );
});
ai.displayName = dt.List.displayName;
const si = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Trigger,
  {
    ref: n,
    className: c(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
si.displayName = dt.Trigger.displayName;
const ii = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Content,
  {
    ref: n,
    className: c(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
ii.displayName = dt.Content.displayName;
const wi = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: c(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: n,
      ...e
    }
  )
);
wi.displayName = "Textarea";
const Nw = (t, e) => {
  It(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function li(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const di = (t, e, n = {}) => {
  const o = rt(e);
  o.current = e;
  const a = rt(n);
  a.current = li(a.current);
  const [s, i] = A(() => o.current), [w, m] = A(!0);
  return It(() => {
    let d = !0;
    return m(!!t), (async () => {
      if (t) {
        const p = await t();
        d && (i(() => p), m(!1));
      }
    })(), () => {
      d = !1, a.current.preserveValue || i(() => o.current);
    };
  }, [t]), [s, w];
}, $e = () => !1, kw = (t, e) => {
  const [n] = di(
    L(async () => {
      if (!t) return $e;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    $e,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  It(() => () => {
    n !== $e && n();
  }, [n]);
}, Cw = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = rt(null), [s, i] = A(void 0), [w, m] = A(void 0), d = L(
    (h) => {
      i(h);
      const f = t.find((y) => y.id === h);
      f && (e == null || e(f));
      const b = document.getElementById(h);
      b && (b.scrollIntoView({ block: "center" }), b.focus()), a.current && a.current.setAttribute("aria-activedescendant", h);
    },
    [e, t]
  ), p = L(
    (h) => {
      const f = t.find((b) => b.id === h);
      f && (m((b) => b === h ? void 0 : h), n == null || n(f));
    },
    [n, t]
  ), g = L(
    (h) => {
      const f = t.findIndex((v) => v.id === s);
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
          s && p(s), h.preventDefault(), h.stopPropagation();
          return;
        default:
          h.key.length === 1 && !h.metaKey && !h.ctrlKey && !h.altKey && (o == null || o(h.key), h.preventDefault());
          return;
      }
      const y = t[b];
      y && d(y.id);
    },
    [t, d, s, p, o]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: w,
    handleKeyDown: g,
    focusOption: d
  };
};
function ci(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
ci(`*, ::before, ::after {
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
  /* ["Slate" base theme by shadcn/ui](https://ui.shadcn.com/docs/theming#slate) */
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

  /* Palette built in https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74 based on "Caffeine" theme*/
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
.tw-prose-sm {
  font-size: 0.875rem;
  line-height: 1.7142857;
}
.tw-prose-sm :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  line-height: 1.5555556;
  margin-top: 0.8888889em;
  margin-bottom: 0.8888889em;
}
.tw-prose-sm :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
  padding-inline-start: 1.1111111em;
}
.tw-prose-sm :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 2.1428571em;
  margin-top: 0;
  margin-bottom: 0.8em;
  line-height: 1.2;
}
.tw-prose-sm :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.4285714em;
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  line-height: 1.4;
}
.tw-prose-sm :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  margin-top: 1.5555556em;
  margin-bottom: 0.4444444em;
  line-height: 1.5555556;
}
.tw-prose-sm :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.4285714em;
  margin-bottom: 0.5714286em;
  line-height: 1.4285714;
}
.tw-prose-sm :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  border-radius: 0.3125rem;
  padding-top: 0.1428571em;
  padding-inline-end: 0.3571429em;
  padding-bottom: 0.1428571em;
  padding-inline-start: 0.3571429em;
}
.tw-prose-sm :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
}
.tw-prose-sm :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.9em;
}
.tw-prose-sm :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8888889em;
}
.tw-prose-sm :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.6666667;
  margin-top: 1.6666667em;
  margin-bottom: 1.6666667em;
  border-radius: 0.25rem;
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  margin-bottom: 0.2857143em;
}
.tw-prose-sm :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2.8571429em;
  margin-bottom: 2.8571429em;
}
.tw-prose-sm :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.5;
}
.tw-prose-sm :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.3333333;
  margin-top: 0.6666667em;
}
.tw-prose-sm :where(.tw-prose-sm > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(.tw-prose-sm > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
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
.tw-pointer-events-auto {
  pointer-events: auto;
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
.tw-col-span-3 {
  grid-column: span 3 / span 3;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
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
.tw-me-1 {
  margin-inline-end: 0.25rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
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
.tw-mr-1 {
  margin-right: 0.25rem;
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
.tw-mt-6 {
  margin-top: 1.5rem;
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
.tw-table {
  display: table;
}
.tw-table-cell {
  display: table-cell;
}
.tw-table-row {
  display: table-row;
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
.tw-h-64 {
  height: 16rem;
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
.tw-h-\\[100px\\] {
  height: 100px;
}
.tw-h-\\[1px\\] {
  height: 1px;
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
.tw-max-h-\\[96\\%\\] {
  max-height: 96%;
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
.tw-w-1\\/2 {
  width: 50%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-12 {
  width: 3rem;
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
.tw-w-24 {
  width: 6rem;
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
.tw-w-32 {
  width: 8rem;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-4\\/5 {
  width: 80%;
}
.tw-w-4\\/6 {
  width: 66.666667%;
}
.tw-w-48 {
  width: 12rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-5\\/6 {
  width: 83.333333%;
}
.tw-w-56 {
  width: 14rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-60 {
  width: 15rem;
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
.tw-w-\\[180px\\] {
  width: 180px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[250px\\] {
  width: 250px;
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
.tw-w-\\[500px\\] {
  width: 500px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[600px\\] {
  width: 600px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-auto {
  width: auto;
}
.tw-w-fit {
  width: fit-content;
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
.tw-min-w-36 {
  min-width: 9rem;
}
.tw-min-w-5 {
  min-width: 1.25rem;
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
.tw-max-w-2xl {
  max-width: 42rem;
}
.tw-max-w-3xl {
  max-width: 48rem;
}
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-4xl {
  max-width: 56rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-6xl {
  max-width: 72rem;
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
.tw-max-w-full {
  max-width: 100%;
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
.tw-border-collapse {
  border-collapse: collapse;
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
.tw-list-inside {
  list-style-position: inside;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.tw-grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
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
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-6 {
  gap: 1.5rem;
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
.tw-space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
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
.tw-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-space-y-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(2rem * var(--tw-space-y-reverse));
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
.tw-rounded-r-xl {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
.tw-border-l-4 {
  border-left-width: 4px;
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
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-400 {
  --tw-border-opacity: 1;
  border-color: rgb(96 165 250 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-300 {
  --tw-border-opacity: 1;
  border-color: rgb(252 165 165 / var(--tw-border-opacity, 1));
}
.tw-border-red-400 {
  --tw-border-opacity: 1;
  border-color: rgb(248 113 113 / var(--tw-border-opacity, 1));
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
.tw-border-yellow-400 {
  --tw-border-opacity: 1;
  border-color: rgb(250 204 21 / var(--tw-border-opacity, 1));
}
.tw-border-yellow-500 {
  --tw-border-opacity: 1;
  border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));
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
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-muted\\/70 {
  background-color: hsl(var(--muted) / 0.7);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-orange-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 237 213 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-purple-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
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
.tw-bg-yellow-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 252 232 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-fill-current {
  fill: currentColor;
}
.tw-fill-destructive {
  fill: hsl(var(--destructive));
}
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
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
.tw-py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.\\!tw-pr-10 {
  padding-right: 2.5rem !important;
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
.tw-pr-1 {
  padding-right: 0.25rem;
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
.tw-pr-\\[10px\\] {
  padding-right: 10px;
}
.tw-pr-\\[22px\\] {
  padding-right: 22px;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
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
.tw-pt-2 {
  padding-top: 0.5rem;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-6 {
  padding-top: 1.5rem;
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
.tw-capitalize {
  text-transform: capitalize;
}
.tw-italic {
  font-style: italic;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
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
.tw-text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.tw-text-blue-800 {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
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
.tw-text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.tw-text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
}
.tw-text-green-700 {
  --tw-text-opacity: 1;
  color: rgb(21 128 61 / var(--tw-text-opacity, 1));
}
.tw-text-green-800 {
  --tw-text-opacity: 1;
  color: rgb(22 101 52 / var(--tw-text-opacity, 1));
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
.tw-text-orange-800 {
  --tw-text-opacity: 1;
  color: rgb(154 52 18 / var(--tw-text-opacity, 1));
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
.tw-text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity, 1));
}
.tw-text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity, 1));
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
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgb(250 204 21 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-600 {
  --tw-text-opacity: 1;
  color: rgb(202 138 4 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-700 {
  --tw-text-opacity: 1;
  color: rgb(161 98 7 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
}
.tw-decoration-destructive {
  text-decoration-color: hsl(var(--destructive));
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
.hover\\:tw-bg-blue-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}
.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
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
.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}
.hover\\:tw-opacity-100:hover {
  opacity: 1;
}
.hover\\:tw-opacity-80:hover {
  opacity: 0.8;
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

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
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

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
@media (prefers-color-scheme: dark) {

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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
`, "after-all");
export {
  Is as Alert,
  Ps as AlertDescription,
  As as AlertTitle,
  zs as Avatar,
  js as AvatarFallback,
  $s as AvatarImage,
  Vi as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Mi as BOOK_SELECTOR_STRING_KEYS,
  ge as Badge,
  Ei as BookChapterControl,
  ma as BookSelectionMode,
  Di as BookSelector,
  M as Button,
  pr as Card,
  Ga as CardContent,
  Ba as CardDescription,
  Fa as CardFooter,
  ja as CardHeader,
  La as CardTitle,
  pa as ChapterRangeSelector,
  un as Checkbox,
  lw as Checklist,
  Ue as ComboBox,
  qt as Command,
  Ne as CommandEmpty,
  At as CommandGroup,
  ce as CommandInput,
  jt as CommandItem,
  Jt as CommandList,
  pw as ContextMenu,
  Xs as ContextMenuCheckboxItem,
  Gs as ContextMenuContent,
  uw as ContextMenuGroup,
  Fs as ContextMenuItem,
  Us as ContextMenuLabel,
  hw as ContextMenuPortal,
  gw as ContextMenuRadioGroup,
  Hs as ContextMenuRadioItem,
  Ks as ContextMenuSeparator,
  Ys as ContextMenuShortcut,
  fw as ContextMenuSub,
  Bs as ContextMenuSubContent,
  Ls as ContextMenuSubTrigger,
  mw as ContextMenuTrigger,
  Va as DataTable,
  qs as Drawer,
  vw as DrawerClose,
  Ws as DrawerContent,
  ei as DrawerDescription,
  Qs as DrawerFooter,
  Zs as DrawerHeader,
  Br as DrawerOverlay,
  Js as DrawerPortal,
  ti as DrawerTitle,
  bw as DrawerTrigger,
  ke as DropdownMenu,
  pn as DropdownMenuCheckboxItem,
  pe as DropdownMenuContent,
  ar as DropdownMenuGroup,
  wr as DropdownMenuItem,
  Oa as DropdownMenuItemType,
  mn as DropdownMenuLabel,
  ua as DropdownMenuPortal,
  fa as DropdownMenuRadioGroup,
  lr as DropdownMenuRadioItem,
  Ce as DropdownMenuSeparator,
  ga as DropdownMenuShortcut,
  ha as DropdownMenuSub,
  ir as DropdownMenuSubContent,
  sr as DropdownMenuSubTrigger,
  cn as DropdownMenuTrigger,
  Ma as ERROR_DUMP_STRING_KEYS,
  Ii as ERROR_POPOVER_STRING_KEYS,
  Da as ErrorDump,
  Ai as ErrorPopover,
  ji as Filter,
  Pi as FilterDropdown,
  $i as Footer,
  $a as FootnoteItem,
  Li as FootnoteList,
  Ki as INVENTORY_STRING_KEYS,
  me as Input,
  Yi as Inventory,
  tt as Label,
  Oi as MarkdownRenderer,
  zi as MoreInfo,
  Pa as MultiSelectComboBox,
  aw as NavigationContentSearch,
  Zt as Popover,
  Lt as PopoverContent,
  Qt as PopoverTrigger,
  ni as Progress,
  ln as RadioGroup,
  fe as RadioGroupItem,
  sa as RecentSearches,
  dw as ResultsCard,
  Wi as SCOPE_SELECTOR_STRING_KEYS,
  Zi as ScopeSelector,
  Ji as ScriptureResultsViewer,
  Qi as ScrollGroupSelector,
  vn as SearchBar,
  Xt as Select,
  $t as SelectContent,
  va as SelectGroup,
  mt as SelectItem,
  ya as SelectLabel,
  cr as SelectScrollDownButton,
  dr as SelectScrollUpButton,
  Na as SelectSeparator,
  zt as SelectTrigger,
  Ht as SelectValue,
  hn as Separator,
  tw as SettingsList,
  nw as SettingsListHeader,
  ew as SettingsListItem,
  ms as SettingsSidebar,
  qi as SettingsSidebarContentSearch,
  br as Sidebar,
  xr as SidebarContent,
  rs as SidebarFooter,
  qe as SidebarGroup,
  as as SidebarGroupAction,
  We as SidebarGroupContent,
  Je as SidebarGroupLabel,
  ns as SidebarHeader,
  es as SidebarInput,
  vr as SidebarInset,
  yr as SidebarMenu,
  is as SidebarMenuAction,
  ws as SidebarMenuBadge,
  kr as SidebarMenuButton,
  Nr as SidebarMenuItem,
  ls as SidebarMenuSkeleton,
  ds as SidebarMenuSub,
  ps as SidebarMenuSubButton,
  cs as SidebarMenuSubItem,
  gr as SidebarProvider,
  ts as SidebarRail,
  os as SidebarSeparator,
  Qa as SidebarTrigger,
  zn as Skeleton,
  ri as Slider,
  xw as Sonner,
  Ds as Spinner,
  oi as Switch,
  Ze as TabDropdownMenu,
  ow as TabFloatingMenu,
  rw as TabToolbar,
  _e as Table,
  Re as TableBody,
  Ea as TableCaption,
  Ut as TableCell,
  _a as TableFooter,
  le as TableHead,
  Se as TableHeader,
  St as TableRow,
  yw as Tabs,
  ii as TabsContent,
  ai as TabsList,
  si as TabsTrigger,
  cw as TextField,
  wi as Textarea,
  hr as ToggleGroup,
  he as ToggleGroupItem,
  iw as Toolbar,
  gn as Tooltip,
  Ee as TooltipContent,
  fn as TooltipProvider,
  bn as TooltipTrigger,
  ww as UiLanguageSelector,
  Er as VerticalTabs,
  Mr as VerticalTabsContent,
  Vr as VerticalTabsList,
  ks as VerticalTabsTrigger,
  Aa as badgeVariants,
  aa as buttonVariants,
  c as cn,
  Ui as getBookIdFromUSFM,
  Xi as getLinesFromUSFM,
  Hi as getNumberFromUSFM,
  Ya as getStatusForItem,
  sw as getToolbarOSReservedSpaceClassName,
  Gi as inventoryCountColumn,
  Bi as inventoryItemColumn,
  Fi as inventoryStatusColumn,
  xa as selectTriggerVariants,
  Rw as sonner,
  Nw as useEvent,
  kw as useEventAsync,
  Cw as useListbox,
  di as usePromise,
  Ti as useRecentSearches,
  Ve as useSidebar
};
//# sourceMappingURL=index.js.map
