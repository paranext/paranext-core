import cl, { jsx as i, jsxs as N, Fragment as ae } from "react/jsx-runtime";
import * as B from "react";
import E, { forwardRef as lr, useCallback as St, useState as ut, useRef as Ft, useEffect as ne, useLayoutEffect as ha, useMemo as Rt } from "react";
import ye, { clsx as dl } from "clsx";
import { extendTailwindMerge as pl } from "tailwind-merge";
import * as ft from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ul } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as bo, Check as Je, Circle as vo, X as yo, Search as mi, ChevronsUpDown as hi, FilterIcon as wl, ChevronDown as cr, ChevronUp as fl, ArrowLeftIcon as ml, ChevronLeftIcon as hl, ChevronRightIcon as gl, ArrowRightIcon as bl, LoaderCircle as vl, Download as yl, Filter as xl, User as Nl, Link as kl, CircleHelp as El, Star as Sl, CircleCheckIcon as Tl, CircleXIcon as Cl, CircleHelpIcon as Rl, ArrowUpIcon as Ol, ArrowDownIcon as _l, ArrowUpDownIcon as Pl, PanelLeft as Il, PanelRight as $l, ScrollText as Ml, ChevronLeft as Al } from "lucide-react";
import { getChaptersForBook as Dl, NumberFormat as jl, formatBytes as Bl, deepEqual as xo, substring as Vl, formatScrRef as Br, compareScrRefs as eo, scrRefToBBBCCCVVV as Vr, getLocalizeKeyForScrollGroupId as pt } from "platform-bible-utils";
import { Slot as Ze } from "@radix-ui/react-slot";
import { cva as Re } from "class-variance-authority";
import * as gi from "@radix-ui/react-label";
import * as Nn from "@radix-ui/react-radio-group";
import * as kn from "@radix-ui/react-popover";
import { Command as Pt } from "cmdk";
import * as Kt from "@radix-ui/react-dialog";
import { useReactTable as bi, getFilteredRowModel as zl, getSortedRowModel as vi, getPaginationRowModel as Fl, getCoreRowModel as yi, flexRender as bn, getGroupedRowModel as Ll, getExpandedRowModel as Gl } from "@tanstack/react-table";
import * as vt from "@radix-ui/react-select";
import Ul from "markdown-to-jsx";
import * as no from "@radix-ui/react-checkbox";
import * as dr from "@radix-ui/react-toggle-group";
import * as xi from "@radix-ui/react-toggle";
import * as Ni from "@radix-ui/react-separator";
import * as On from "@radix-ui/react-tooltip";
import * as It from "@radix-ui/react-tabs";
import * as mt from "@radix-ui/react-menubar";
import { useHotkeys as Xl } from "react-hotkeys-hook";
import Yl, { ThemeContext as Hl, internal_processStyles as ql } from "@mui/styled-engine";
import { MenuItem as Wl, ListItemText as Kl, ListItemIcon as ki, Menu as Jl, Grid as Ei, List as Zl, IconButton as Si, Drawer as Ql } from "@mui/material";
import * as tc from "react-dom";
import Ln from "react-dom";
import { Toaster as ec } from "sonner";
import { toast as zh } from "sonner";
import * as fn from "@radix-ui/react-slider";
import * as ro from "@radix-ui/react-switch";
const nc = pl({ prefix: "tw-" });
function y(...t) {
  return nc(dl(t));
}
const Qe = E.forwardRef(
  ({ className: t, type: e, ...n }, r) => /* @__PURE__ */ i(
    "input",
    {
      type: e,
      className: y(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: r,
      ...n
    }
  )
);
Qe.displayName = "Input";
const rc = lr(
  ({
    handleSearch: t,
    handleKeyDown: e,
    handleOnClick: n,
    handleSubmit: r,
    className: o,
    ...a
  }, s) => /* @__PURE__ */ i("div", { className: "tw-relative", children: /* @__PURE__ */ i(
    Qe,
    {
      ...a,
      type: "text",
      className: y(
        "tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",
        o
      ),
      onChange: (l) => t(l.target.value),
      onKeyDown: (l) => {
        l.key === "Enter" && r(), e(l);
      },
      onClick: n,
      ref: s
    }
  ) })
), oc = "layoutDirection";
function Nt() {
  const t = localStorage.getItem(oc);
  return t === "rtl" ? t : "ltr";
}
const No = ft.Root, Ti = ft.Trigger, ac = ft.Group, Zm = ft.Portal, Qm = ft.Sub, th = ft.RadioGroup, ic = E.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => /* @__PURE__ */ N(
  ft.SubTrigger,
  {
    ref: o,
    className: y(
      "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
      e && "tw-pl-8",
      t
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ i(bo, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
ic.displayName = ft.SubTrigger.displayName;
const sc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  ft.SubContent,
  {
    ref: n,
    className: y(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
sc.displayName = ft.SubContent.displayName;
const pr = E.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...r }, o) => {
  const a = Nt();
  return /* @__PURE__ */ i(ft.Portal, { children: /* @__PURE__ */ i(
    ft.Content,
    {
      ref: o,
      sideOffset: e,
      className: y(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...r,
      children: /* @__PURE__ */ i("div", { dir: a, children: n })
    }
  ) });
});
pr.displayName = ft.Content.displayName;
const Ci = E.forwardRef(({ className: t, inset: e, ...n }, r) => {
  const o = Nt();
  return /* @__PURE__ */ i(
    ft.Item,
    {
      ref: r,
      className: y(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t
      ),
      ...n,
      dir: o
    }
  );
});
Ci.displayName = ft.Item.displayName;
const ko = E.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => /* @__PURE__ */ N(
  ft.CheckboxItem,
  {
    ref: o,
    className: y(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ i(ft.ItemIndicator, { children: /* @__PURE__ */ i(Je, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
ko.displayName = ft.CheckboxItem.displayName;
const Ri = E.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ N(
  ft.RadioItem,
  {
    ref: r,
    className: y(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ i(ft.ItemIndicator, { children: /* @__PURE__ */ i(vo, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Ri.displayName = ft.RadioItem.displayName;
const ur = E.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ i(
  ft.Label,
  {
    ref: r,
    className: y("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
ur.displayName = ft.Label.displayName;
const wr = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  ft.Separator,
  {
    ref: n,
    className: y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
wr.displayName = ft.Separator.displayName;
function lc({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: y("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
lc.displayName = "DropdownMenuShortcut";
var cc = Object.defineProperty, dc = (t, e, n) => e in t ? cc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, nt = (t, e, n) => dc(t, typeof e != "symbol" ? e + "" : e, n);
const Ne = [
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
], Eo = [
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
], Oi = [
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
], ga = yc();
function tn(t, e = !0) {
  return e && (t = t.toUpperCase()), t in ga ? ga[t] : 0;
}
function So(t) {
  return tn(t) > 0;
}
function pc(t) {
  const e = typeof t == "string" ? tn(t) : t;
  return e >= 40 && e <= 66;
}
function uc(t) {
  return (typeof t == "string" ? tn(t) : t) <= 39;
}
function _i(t) {
  return t <= 66;
}
function wc(t) {
  const e = typeof t == "string" ? tn(t) : t;
  return $i(e) && !_i(e);
}
function* fc() {
  for (let t = 1; t <= Ne.length; t++) yield t;
}
const mc = 1, Pi = Ne.length;
function hc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function To(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Ne.length ? e : Ne[n];
}
function Ii(t) {
  return t <= 0 || t > Pi ? "******" : Oi[t - 1];
}
function gc(t) {
  return Ii(tn(t));
}
function $i(t) {
  const e = typeof t == "number" ? To(t) : t;
  return So(e) && !Eo.includes(e);
}
function bc(t) {
  const e = typeof t == "number" ? To(t) : t;
  return So(e) && Eo.includes(e);
}
function vc(t) {
  return Oi[t - 1].includes("*obsolete*");
}
function yc() {
  const t = {};
  for (let e = 0; e < Ne.length; e++)
    t[Ne[e]] = e + 1;
  return t;
}
const at = {
  allBookIds: Ne,
  nonCanonicalIds: Eo,
  bookIdToNumber: tn,
  isBookIdValid: So,
  isBookNT: pc,
  isBookOT: uc,
  isBookOTNT: _i,
  isBookDC: wc,
  allBookNumbers: fc,
  firstBook: mc,
  lastBook: Pi,
  extraBooks: hc,
  bookNumberToId: To,
  bookNumberToEnglishName: Ii,
  bookIdToEnglishName: gc,
  isCanonical: $i,
  isExtraMaterial: bc,
  isObsolete: vc
};
var qt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(qt || {});
const Mt = class {
  // private versInfo: Versification;
  constructor(e) {
    if (nt(this, "name"), nt(this, "fullPath"), nt(this, "isPresent"), nt(this, "hasVerseSegments"), nt(this, "isCustomized"), nt(this, "baseVersification"), nt(this, "scriptureBooks"), nt(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = qt[e]) : (this._type = e, this.name = qt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
nt(Mt, "Original", new Mt(qt.Original)), nt(Mt, "Septuagint", new Mt(qt.Septuagint)), nt(Mt, "Vulgate", new Mt(qt.Vulgate)), nt(Mt, "English", new Mt(qt.English)), nt(Mt, "RussianProtestant", new Mt(qt.RussianProtestant)), nt(Mt, "RussianOrthodox", new Mt(qt.RussianOrthodox));
let me = Mt;
function ba(t, e) {
  const n = e[0];
  for (let r = 1; r < e.length; r++)
    t = t.split(e[r]).join(n);
  return t.split(n);
}
var Mi = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Mi || {});
const Ct = class ot {
  constructor(e, n, r, o) {
    if (nt(this, "firstChapter"), nt(this, "lastChapter"), nt(this, "lastVerse"), nt(this, "hasSegmentsDefined"), nt(this, "text"), nt(this, "BBBCCCVVVS"), nt(this, "longHashCode"), nt(this, "versification"), nt(this, "rtlMark", "‏"), nt(this, "_bookNum", 0), nt(this, "_chapterNum", 0), nt(this, "_verseNum", 0), nt(this, "_verse"), r == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, s = n != null && n instanceof me ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = n != null && n instanceof me ? n : void 0;
        this.setEmpty(a), this._verseNum = e % ot.chapterDigitShifter, this._chapterNum = Math.floor(
          e % ot.bookDigitShifter / ot.chapterDigitShifter
        ), this._bookNum = Math.floor(e / ot.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof ot) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null) return;
          const a = e instanceof me ? e : ot.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = o ?? ot.defaultVersification;
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
      return n = new ot(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof sn)
        return n = new ot(), { success: !1, verseRef: n };
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
    return e % ot.bcvMaxValue * ot.bookDigitShifter + (n >= 0 ? n % ot.bcvMaxValue * ot.chapterDigitShifter : 0) + (r >= 0 ? r % ot.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: s } = e, l = a || o.toString();
    let c;
    return s && (c = new me(s)), n ? new ot(n, r.toString(), l, c) : new ot();
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
    for (let o = 0; o < e.length; o++) {
      if (r = e[o], r < "0" || r > "9")
        return o === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +r - 0, n > ot.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(ot.verseRangeSeparator) || this._verse.includes(ot.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return at.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = at.bookIdToNumber(e);
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
    const { success: n, vNum: r } = ot.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ot.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > at.lastBook)
      throw new sn(
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
    this.versification = this.versification != null ? new me(e) : void 0;
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
    return this.validateVerse(ot.verseRangeSeparators, ot.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return ot.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return ot.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
      const a = e.split("/");
      if (e = a[0], a.length > 1)
        try {
          const s = +a[1].trim();
          this.versification = new me(qt[s]);
        } catch {
          throw new sn("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new sn("Invalid reference : " + e);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || at.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ot.isVerseParseable(r[1]))
      throw new sn("Invalid reference : " + e);
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
    return new ot(this);
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
    return e instanceof ot ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = ot.verseRangeSeparators, r = ot.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = ba(this._verse, r);
    for (const s of a.map((l) => ba(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const d = this.clone();
        if (d.verse = s[1], !e)
          for (let p = c + 1; p < d.verseNum; p++) {
            const f = new ot(
              this._bookNum,
              this._chapterNum,
              p,
              this.versification
            );
            this.isExcluded || o.push(f);
          }
        o.push(d);
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
    let r = 0;
    for (const o of this.allVerses(!0, e, n)) {
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > at.lastBook ? 2 : (at.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = ot.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = at.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
nt(Ct, "defaultVersification", me.English), nt(Ct, "verseRangeSeparator", "-"), nt(Ct, "verseSequenceIndicator", ","), nt(Ct, "verseRangeSeparators", [Ct.verseRangeSeparator]), nt(Ct, "verseSequenceIndicators", [Ct.verseSequenceIndicator]), nt(Ct, "chapterDigitShifter", 1e3), nt(Ct, "bookDigitShifter", Ct.chapterDigitShifter * Ct.chapterDigitShifter), nt(Ct, "bcvMaxValue", Ct.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
nt(Ct, "ValidStatusType", Mi);
class sn extends Error {
}
const xc = lr(
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: s
  }, l) => /* @__PURE__ */ N(
    Ci,
    {
      ref: l,
      textValue: t,
      className: y(
        "tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",
        {
          // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
          "tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100": n
        }
      ),
      onSelect: (c) => {
        c.preventDefault(), e();
      },
      onKeyDown: (c) => {
        o(c);
      },
      onFocus: r,
      onMouseMove: r,
      children: [
        /* @__PURE__ */ i(
          "span",
          {
            className: y(
              "tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": n,
                "tw-border-s-red-200": a.toLowerCase() === "ot",
                "tw-border-s-purple-200": a.toLowerCase() === "nt",
                "tw-border-s-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: at.bookIdToEnglishName(t)
          }
        ),
        n && /* @__PURE__ */ i("div", { children: s })
      ]
    },
    t
  )
);
function Nc({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: e }, (l, c) => c + 1), s = St(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ i("div", { className: y("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: a.map((l) => /* @__PURE__ */ i(
    "div",
    {
      className: y(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": l === n,
          "tw-bg-amber-200": l === r
        }
      ),
      onClick: (c) => {
        c.preventDefault(), c.stopPropagation(), t(l);
      },
      role: "button",
      onKeyDown: (c) => {
        c.key === "Enter" && t(l);
      },
      tabIndex: 0,
      onMouseMove: () => s(l),
      children: l
    },
    l
  )) });
}
const Co = at.allBookIds.filter((t) => !at.isObsolete(at.bookIdToNumber(t))), kc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, va = ["OT", "NT", "DC"], Ec = 96, Sc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], ln = (t) => Dl(at.bookIdToNumber(t));
function Tc() {
  return Co.map((e) => at.bookIdToEnglishName(e));
}
function Cc(t) {
  return Tc().includes(t);
}
function Rc(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Cc(e))
    return Co.find((r) => at.bookIdToEnglishName(r) === e);
}
function nh({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: r
}) {
  const o = Nt(), [a, s] = ut(""), [l, c] = ut(
    at.bookNumberToId(t.bookNum)
  ), [d, p] = ut(t.chapterNum ?? 0), [f, w] = ut(
    at.bookNumberToId(t.bookNum)
  ), [m, b] = ut(!1), [h, g] = ut(m), k = Ft(void 0), T = Ft(void 0), C = Ft(void 0), S = St(
    (j) => {
      const M = r ? r() : Co;
      return {
        OT: M.filter((A) => at.isBookOT(A)),
        NT: M.filter((A) => at.isBookNT(A)),
        DC: M.filter((A) => at.isBookDC(A))
      }[j].filter((A) => {
        const G = at.bookIdToEnglishName(A).toLowerCase(), H = a.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return G.includes(H) || // Match book name
        A.toLowerCase().includes(H);
      });
    },
    [a, r]
    // Only recompute when relevant values change
  ), v = (j) => {
    s(j);
  }, P = Ft(!1), F = St((j) => {
    if (P.current) {
      P.current = !1;
      return;
    }
    b(j);
  }, []), R = St(
    (j, M, A, G) => {
      if (p(
        at.bookNumberToId(t.bookNum) !== j ? 1 : t.chapterNum
      ), M || ln(j) === -1) {
        e({
          bookNum: at.bookIdToNumber(j),
          chapterNum: A || 1,
          verseNum: G || 1
        }), b(!1), s("");
        return;
      }
      c(l !== j ? j : ""), b(!M);
    },
    [e, t.bookNum, t.chapterNum, l]
  ), I = (j) => {
    j <= 0 || j > ln(l) || R(l, !0, j);
  }, L = St(() => {
    Sc.forEach((j) => {
      const M = a.match(j);
      if (M) {
        const [A, G = void 0, H = void 0] = M.slice(1), rt = Rc(A);
        (at.isBookIdValid(A) || rt) && R(
          rt ?? A,
          !0,
          G ? parseInt(G, 10) : 1,
          H ? parseInt(H, 10) : 1
        );
      }
    });
  }, [R, a]), D = St(
    (j) => {
      m ? (j.key === "ArrowDown" || j.key === "ArrowUp") && (typeof C < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      C.current !== null ? C.current.focus() : typeof T < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      T.current !== null && T.current.focus(), j.preventDefault()) : b(!0);
    },
    [m]
  ), tt = (j) => {
    const { key: M } = j;
    M === "ArrowRight" || M === "ArrowLeft" || M === "ArrowDown" || M === "ArrowUp" || M === "Enter" || (k.current.dispatchEvent(new KeyboardEvent("keydown", { key: M })), k.current.focus());
  }, J = (j) => {
    const { key: M } = j;
    if (f === l) {
      if (M === "Enter") {
        j.preventDefault(), R(l, !0, d);
        return;
      }
      const A = M === "ArrowRight" && !o || M === "ArrowRight" && o === "ltr" || M === "ArrowLeft" && o === "rtl", G = M === "ArrowLeft" && !o || M === "ArrowLeft" && o === "ltr" || M === "ArrowRight" && o === "rtl";
      let H = 0;
      if (A)
        if (d < ln(f))
          H = 1;
        else {
          j.preventDefault();
          return;
        }
      else if (G)
        if (d > 1)
          H = -1;
        else {
          j.preventDefault();
          return;
        }
      else M === "ArrowDown" ? H = 6 : M === "ArrowUp" && (H = -6);
      d + H <= 0 || d + H > ln(f) ? p(0) : H !== 0 && (p(d + H), j.preventDefault());
    }
  };
  return ne(() => {
    l === f ? l === at.bookNumberToId(t.bookNum) ? p(t.chapterNum) : p(1) : p(0);
  }, [f, t.bookNum, t.chapterNum, l]), ha(() => {
    g(m);
  }, [m]), ha(() => {
    const j = setTimeout(() => {
      if (h && T.current && C.current) {
        const A = C.current.offsetTop - Ec;
        T.current.scrollTo({ top: A, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(j);
    };
  }, [h]), /* @__PURE__ */ i("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ N(No, { modal: !1, open: m, onOpenChange: F, children: [
    /* @__PURE__ */ i(Ti, { asChild: !0, children: /* @__PURE__ */ i(
      rc,
      {
        ref: k,
        value: a,
        handleSearch: v,
        handleKeyDown: D,
        handleOnClick: () => {
          c(at.bookNumberToId(t.bookNum)), w(at.bookNumberToId(t.bookNum)), p(t.chapterNum > 0 ? t.chapterNum : 0), b(!0), k.current.focus();
        },
        onFocus: () => {
          P.current = !0;
        },
        handleSubmit: L,
        placeholder: `${at.bookNumberToEnglishName(t.bookNum)} ${t.chapterNum}:${t.verseNum}`,
        className: n
      }
    ) }),
    /* @__PURE__ */ i(
      pr,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: tt,
        align: o === "ltr" ? "start" : "end",
        ref: T,
        children: /* @__PURE__ */ i("div", { className: "rtl:tw-ps-2", children: va.map((j, M) => {
          const A = S(j);
          return A.length > 0 && /* @__PURE__ */ N("div", { children: [
            /* @__PURE__ */ i(ur, { className: "tw-font-semibold tw-text-foreground/80", children: kc[j] }),
            A.map((G) => /* @__PURE__ */ i("div", { children: /* @__PURE__ */ i(
              xc,
              {
                bookId: G,
                handleSelectBook: () => R(G, !1),
                isSelected: l === G,
                handleHighlightBook: () => w(G),
                handleKeyDown: J,
                bookType: j,
                ref: (H) => {
                  l === G && (C.current = H);
                },
                children: /* @__PURE__ */ i(
                  Nc,
                  {
                    handleSelectChapter: I,
                    endChapter: ln(G),
                    activeChapter: t.bookNum === at.bookIdToNumber(G) ? t.chapterNum : 0,
                    highlightedChapter: d,
                    handleHighlightedChapter: (H) => {
                      p(H);
                    }
                  }
                )
              }
            ) }, G)),
            va.length - 1 !== M ? /* @__PURE__ */ i(wr, {}) : void 0
          ] }, j);
        }) })
      }
    )
  ] }) });
}
const Oc = Re(
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
), wt = E.forwardRef(
  ({ className: t, variant: e, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ i(r ? Ze : "button", { className: y(Oc({ variant: e, size: n, className: t })), ref: a, ...o })
);
wt.displayName = "Button";
const _c = Re(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Dt = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(gi.Root, { ref: n, className: y("pr-twp", _c(), t), ...e }));
Dt.displayName = gi.Root.displayName;
const Ai = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Nt();
  return /* @__PURE__ */ i(
    Nn.Root,
    {
      className: y("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: r
    }
  );
});
Ai.displayName = Nn.Root.displayName;
const oo = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Nn.Item,
  {
    ref: n,
    className: y(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ i(Nn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i(vo, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
oo.displayName = Nn.Item.displayName;
const Di = kn.Root, ji = kn.Trigger, Ro = E.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...r }, o) => {
  const a = Nt();
  return /* @__PURE__ */ i(kn.Portal, { children: /* @__PURE__ */ i(
    kn.Content,
    {
      ref: o,
      align: e,
      sideOffset: n,
      className: y(
        "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...r,
      dir: a
    }
  ) });
});
Ro.displayName = kn.Content.displayName;
const Pc = Kt.Portal, Bi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Kt.Overlay,
  {
    ref: n,
    className: y(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Bi.displayName = Kt.Overlay.displayName;
const Ic = E.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = Nt();
  return /* @__PURE__ */ N(Pc, { children: [
    /* @__PURE__ */ i(Bi, {}),
    /* @__PURE__ */ N(
      Kt.Content,
      {
        ref: r,
        className: y(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: o,
        children: [
          e,
          /* @__PURE__ */ N(
            Kt.Close,
            {
              className: y(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ i(yo, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Ic.displayName = Kt.Content.displayName;
const $c = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Kt.Title,
  {
    ref: n,
    className: y("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
$c.displayName = Kt.Title.displayName;
const Mc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Kt.Description,
  {
    ref: n,
    className: y("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Mc.displayName = Kt.Description.displayName;
const Oo = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Pt,
  {
    ref: n,
    className: y(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
Oo.displayName = Pt.displayName;
const _o = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Nt();
  return /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: r, children: [
    /* @__PURE__ */ i(mi, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ i(
      Pt.Input,
      {
        ref: n,
        className: y(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
_o.displayName = Pt.Input.displayName;
const Po = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Pt.List,
  {
    ref: n,
    className: y("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
Po.displayName = Pt.List.displayName;
const Io = E.forwardRef((t, e) => /* @__PURE__ */ i(Pt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Io.displayName = Pt.Empty.displayName;
const Vi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Pt.Group,
  {
    ref: n,
    className: y(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Vi.displayName = Pt.Group.displayName;
const Ac = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Pt.Separator,
  {
    ref: n,
    className: y("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Ac.displayName = Pt.Separator.displayName;
const $o = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Pt.Item,
  {
    ref: n,
    className: y(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
$o.displayName = Pt.Item.displayName;
function Dc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function ao({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: r,
  popoverContentClassName: o,
  value: a,
  onChange: s = () => {
  },
  getOptionLabel: l = Dc,
  icon: c = void 0,
  buttonPlaceholder: d = "",
  textPlaceholder: p = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: w = "outline",
  alignDropDown: m = "start",
  isDisabled: b = !1,
  ...h
}) {
  const [g, k] = ut(!1);
  return /* @__PURE__ */ N(Di, { open: g, onOpenChange: k, ...h, children: [
    /* @__PURE__ */ i(ji, { asChild: !0, children: /* @__PURE__ */ N(
      wt,
      {
        variant: w,
        role: "combobox",
        "aria-expanded": g,
        id: t,
        className: y(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          r ?? n
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ N("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ i("div", { className: "tw-pe-2", children: c }),
            /* @__PURE__ */ i(
              "span",
              {
                className: y(
                  "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",
                  // Placeholder text should be muted-foreground
                  // This condition was added as requested by UX
                  {
                    "tw-text-muted-foreground": !a
                  }
                ),
                children: a ? l(a) : d
              }
            )
          ] }),
          /* @__PURE__ */ i(hi, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      Ro,
      {
        align: m,
        className: y("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ N(Oo, { children: [
          /* @__PURE__ */ i(_o, { placeholder: p, className: "tw-text-inherit" }),
          /* @__PURE__ */ i(Io, { children: f }),
          /* @__PURE__ */ i(Po, { children: e.map((T) => /* @__PURE__ */ N(
            $o,
            {
              value: l(T),
              onSelect: () => {
                s(T), k(!1);
              },
              children: [
                /* @__PURE__ */ i(
                  Je,
                  {
                    className: y("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !a || l(a) !== l(T)
                    })
                  }
                ),
                l(T)
              ]
            },
            l(T)
          )) })
        ] })
      }
    )
  ] });
}
function jc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const s = Rt(
    () => Array.from({ length: a }, (d, p) => p + 1),
    [a]
  );
  return /* @__PURE__ */ N(ae, { children: [
    /* @__PURE__ */ i(Dt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ i(
      ao,
      {
        isDisabled: o,
        onChange: (d) => {
          n(d), d > e && r(d);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ i(Dt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ i(
      ao,
      {
        isDisabled: o,
        onChange: (d) => {
          r(d), d < t && n(d);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Bc = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Bc || {});
const rh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), zr = (t, e) => t[e] ?? e;
function oh({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: d
}) {
  const p = zr(d, "%webView_bookSelector_currentBook%"), f = zr(d, "%webView_bookSelector_choose%"), w = zr(d, "%webView_bookSelector_chooseBooks%"), [m, b] = ut(
    "current book"
    /* CURRENT_BOOK */
  ), h = (g) => {
    b(g), t(g);
  };
  return /* @__PURE__ */ i(
    Ai,
    {
      className: "pr-twp tw-flex",
      value: m,
      onValueChange: (g) => h(g),
      children: /* @__PURE__ */ N("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ N("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(oo, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ i(Dt, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ i(Dt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ i(
            jc,
            {
              isDisabled: m === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: s,
              chapterCount: o,
              startChapter: l,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ N("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(oo, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ i(Dt, { className: "tw-ms-1", children: w })
          ] }),
          /* @__PURE__ */ i(Dt, { className: "tw-flex tw-items-center", children: r.map((g) => at.bookIdToEnglishName(g)).join(", ") }),
          /* @__PURE__ */ i(
            wt,
            {
              disabled: m === "current book",
              onClick: () => n(),
              children: f
            }
          )
        ] })
      ] })
    }
  );
}
function Vc({ table: t }) {
  return /* @__PURE__ */ N(No, { children: [
    /* @__PURE__ */ i(ul, { asChild: !0, children: /* @__PURE__ */ N(wt, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ i(wl, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ N(pr, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ i(ur, { children: "Toggle columns" }),
      /* @__PURE__ */ i(wr, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ i(
        ko,
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
const Le = vt.Root, zc = vt.Group, Ge = vt.Value, ke = E.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = Nt();
  return /* @__PURE__ */ N(
    vt.Trigger,
    {
      ref: r,
      className: y(
        "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
        t
      ),
      ...n,
      dir: o,
      children: [
        e,
        /* @__PURE__ */ i(vt.Icon, { asChild: !0, children: /* @__PURE__ */ i(cr, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
ke.displayName = vt.Trigger.displayName;
const zi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  vt.ScrollUpButton,
  {
    ref: n,
    className: y("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ i(fl, { className: "tw-h-4 tw-w-4" })
  }
));
zi.displayName = vt.ScrollUpButton.displayName;
const Fi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  vt.ScrollDownButton,
  {
    ref: n,
    className: y("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ i(cr, { className: "tw-h-4 tw-w-4" })
  }
));
Fi.displayName = vt.ScrollDownButton.displayName;
const Ee = E.forwardRef(({ className: t, children: e, position: n = "popper", ...r }, o) => {
  const a = Nt();
  return /* @__PURE__ */ i(vt.Portal, { children: /* @__PURE__ */ N(
    vt.Content,
    {
      ref: o,
      className: y(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ i(zi, {}),
        /* @__PURE__ */ i(
          vt.Viewport,
          {
            className: y(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ i("div", { dir: a, children: e })
          }
        ),
        /* @__PURE__ */ i(Fi, {})
      ]
    }
  ) });
});
Ee.displayName = vt.Content.displayName;
const Fc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  vt.Label,
  {
    ref: n,
    className: y("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Fc.displayName = vt.Label.displayName;
const Vt = E.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ N(
  vt.Item,
  {
    ref: r,
    className: y(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(vt.ItemIndicator, { children: /* @__PURE__ */ i(Je, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ i(vt.ItemText, { children: e })
    ]
  }
));
Vt.displayName = vt.Item.displayName;
const Lc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  vt.Separator,
  {
    ref: n,
    className: y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Lc.displayName = vt.Separator.displayName;
function Gc({ table: t }) {
  return /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ N("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ i("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ N(
        Le,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ i(ke, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ i(Ge, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ i(Ee, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ i(Vt, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ N("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ N(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ i(ml, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ N(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ i(hl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ N(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ i(gl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ N(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ i(bl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const fr = E.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ i("div", { className: y("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ i(
  "table",
  {
    ref: r,
    className: y("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
fr.displayName = "Table";
const mr = E.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ i(
  "thead",
  {
    ref: r,
    className: y(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": e },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
mr.displayName = "TableHeader";
const hr = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: y("[&_tr:last-child]:tw-border-0", t), ...e }));
hr.displayName = "TableBody";
const Uc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "tfoot",
  {
    ref: n,
    className: y("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Uc.displayName = "TableFooter";
const ce = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "tr",
    {
      ref: n,
      className: y(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        t
      ),
      ...e
    }
  )
);
ce.displayName = "TableRow";
const En = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "th",
  {
    ref: n,
    className: y(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
En.displayName = "TableHead";
const Ue = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: y("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Ue.displayName = "TableCell";
const Xc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "caption",
  {
    ref: n,
    className: y("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Xc.displayName = "TableCaption";
function Yc({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: s = () => {
  }
}) {
  var g;
  const [l, c] = ut([]), [d, p] = ut([]), [f, w] = ut({}), [m, b] = ut({}), h = bi({
    data: e,
    columns: t,
    getCoreRowModel: yi(),
    ...n && { getPaginationRowModel: Fl() },
    onSortingChange: c,
    getSortedRowModel: vi(),
    onColumnFiltersChange: p,
    getFilteredRowModel: zl(),
    onColumnVisibilityChange: w,
    onRowSelectionChange: b,
    state: {
      sorting: l,
      columnFilters: d,
      columnVisibility: f,
      rowSelection: m
    }
  });
  return /* @__PURE__ */ N("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ i(Vc, { table: h }),
    /* @__PURE__ */ N(fr, { stickyHeader: a, children: [
      /* @__PURE__ */ i(mr, { stickyHeader: a, children: h.getHeaderGroups().map((k) => /* @__PURE__ */ i(ce, { children: k.headers.map((T) => /* @__PURE__ */ i(En, { children: T.isPlaceholder ? void 0 : bn(T.column.columnDef.header, T.getContext()) }, T.id)) }, k.id)) }),
      /* @__PURE__ */ i(hr, { children: (g = h.getRowModel().rows) != null && g.length ? h.getRowModel().rows.map((k) => /* @__PURE__ */ i(
        ce,
        {
          onClick: () => s(k, h),
          "data-state": k.getIsSelected() && "selected",
          children: k.getVisibleCells().map((T) => /* @__PURE__ */ i(Ue, { children: bn(T.column.columnDef.cell, T.getContext()) }, T.id))
        },
        k.id
      )) : /* @__PURE__ */ i(ce, { children: /* @__PURE__ */ i(Ue, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ i(
        wt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.previousPage(),
          disabled: !h.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ i(
        wt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.nextPage(),
          disabled: !h.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ i(Gc, { table: h })
  ] });
}
const _n = lr(({ className: t, ...e }, n) => /* @__PURE__ */ i(vl, { size: 35, className: y("tw-animate-spin", t), ...e, ref: n }));
_n.displayName = "Spinner";
function ah({
  isInstalling: t,
  handleClick: e,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ i(
    wt,
    {
      className: y(
        "tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t,
          "tw-bg-blue-600": !t,
          "tw-bg-white tw-text-blue-600 hover:tw-text-white": !n,
          "tw-w-20": n
        },
        r
      ),
      onClick: e,
      ...o,
      children: t ? /* @__PURE__ */ i(_n, { size: 15 }) : /* @__PURE__ */ N(ae, { children: [
        /* @__PURE__ */ i(yl, { size: 25, className: y("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function ih({
  isEnabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    wt,
    {
      className: y(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ N(ae, { children: [
        /* @__PURE__ */ i(_n, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function sh({
  isDisabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    wt,
    {
      className: y(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ N(ae, { children: [
        /* @__PURE__ */ i(_n, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function lh({
  isUpdating: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    wt,
    {
      className: y(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ N(ae, { children: [
        /* @__PURE__ */ i(_n, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function ch({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: r
}) {
  const o = Rt(
    () => ({
      overrides: {
        a: {
          props: {
            target: r
          }
        }
      }
    }),
    [r]
  );
  return /* @__PURE__ */ i("div", { id: t, className: y("pr-twp tw-prose", n), children: /* @__PURE__ */ i(Ul, { options: o, children: e }) });
}
const Hc = lr((t, e) => /* @__PURE__ */ N(
  wt,
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
      /* @__PURE__ */ i(xl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ i(
        cr,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var qc = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(qc || {});
function dh({ id: t, groups: e }) {
  return /* @__PURE__ */ i("div", { id: t, children: /* @__PURE__ */ N(No, { children: [
    /* @__PURE__ */ i(Ti, { asChild: !0, children: /* @__PURE__ */ i(Hc, {}) }),
    /* @__PURE__ */ i(pr, { children: e.map((n) => /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ i(ur, { children: n.label }),
      /* @__PURE__ */ i(ac, { children: n.items.map((r) => /* @__PURE__ */ i("div", { children: r.itemType === 0 ? /* @__PURE__ */ i(ko, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ i(Ri, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ i(wr, {})
    ] }, n.label)) })
  ] }) });
}
function ph({ id: t, message: e }) {
  return /* @__PURE__ */ i("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ i("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function uh({
  id: t,
  category: e,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new jl("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((l, c) => l + c, 0)), s = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ N(
    "div",
    {
      id: t,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ N("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: e }) }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ N("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ i(Nl, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ N("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((l) => /* @__PURE__ */ i(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          r.length > 3 && /* @__PURE__ */ N(
            "button",
            {
              type: "button",
              onClick: () => s(),
              className: "tw-text-xs tw-text-gray-500 tw-underline",
              children: [
                "+",
                r.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ N("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ N(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ i(kl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ N(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ i(El, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Wc({ id: t, versionHistory: e }) {
  const [n, r] = ut(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), d = new Date(o.getTime() - c.getTime()), p = d.getUTCFullYear() - 1970, f = d.getUTCMonth(), w = d.getUTCDate() - 1;
    let m = "";
    return p > 0 ? m = `${p.toString()} year${p === 1 ? "" : "s"} ago` : f > 0 ? m = `${f.toString()} month${f === 1 ? "" : "s"} ago` : w === 0 ? m = "today" : m = `${w.toString()} day${w === 1 ? "" : "s"} ago`, m;
  }
  const s = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ N("div", { id: t, children: [
    /* @__PURE__ */ i("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ i("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ N("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ i("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ i("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ i("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ N("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ N("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ i("div", { children: a(l[1].date) })
      ] })
    ] }, l[0])) }),
    s.length > 5 && /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => r(!n),
        className: "tw-text-xs tw-text-gray-500 tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function wh({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = Rt(() => Bl(n), [n]), l = ((c) => {
    const d = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((p) => d.of(p));
  })(r);
  return /* @__PURE__ */ i("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ N("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ i(Wc, { versionHistory: o }),
    /* @__PURE__ */ i("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ N("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ i("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ N("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ N("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ i("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ N("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const Kc = Re(
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
        mutedIndicator: "tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Jc({ className: t, variant: e, ...n }) {
  return /* @__PURE__ */ i("div", { className: y("pr-twp", Kc({ variant: e }), t), ...n });
}
function Zc({
  entries: t,
  getEntriesCount: e = void 0,
  selected: n,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: a = "No entries found",
  customSelectedText: s,
  sortSelected: l = !1,
  icon: c = void 0,
  className: d = void 0
}) {
  const [p, f] = ut(!1), w = St(
    (h) => {
      var k;
      const g = (k = t.find((T) => T.label === h)) == null ? void 0 : k.value;
      g && r(
        n.includes(g) ? n.filter((T) => T !== g) : [...n, g]
      );
    },
    [t, n, r]
  ), m = () => s || o, b = Rt(() => {
    if (!l) return t;
    const h = t.filter((k) => k.starred).sort((k, T) => k.label.localeCompare(T.label)), g = t.filter((k) => !k.starred).sort((k, T) => {
      const C = n.includes(k.value), S = n.includes(T.value);
      return C && !S ? -1 : !C && S ? 1 : k.label.localeCompare(T.label);
    });
    return [...h, ...g];
  }, [t, n, l]);
  return /* @__PURE__ */ i("div", { className: d, children: /* @__PURE__ */ N(Di, { open: p, onOpenChange: f, children: [
    /* @__PURE__ */ i(ji, { asChild: !0, children: /* @__PURE__ */ N(
      wt,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": p,
        className: y(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        children: [
          /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ i("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ i("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: c }) }),
            /* @__PURE__ */ i(
              "div",
              {
                className: y({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ i("div", { className: "tw-font-normal", children: m() })
              }
            )
          ] }),
          /* @__PURE__ */ i(hi, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Ro, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ N(Oo, { children: [
      /* @__PURE__ */ i(_o, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ N(Po, { children: [
        /* @__PURE__ */ i(Io, { children: a }),
        /* @__PURE__ */ i(Vi, { children: b.map((h) => {
          const g = e ? e(h) : void 0;
          return /* @__PURE__ */ N(
            $o,
            {
              value: h.label,
              onSelect: w,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ i("div", { className: "w-4", children: /* @__PURE__ */ i(
                  Je,
                  {
                    className: y(
                      "tw-h-4 tw-w-4",
                      n.includes(h.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ i("div", { className: "tw-w-4", children: h.starred && /* @__PURE__ */ i(Sl, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ i("div", { className: "tw-flex-grow", children: h.label }),
                e && /* @__PURE__ */ i("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: g })
              ]
            },
            h.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function fh({
  entries: t,
  getEntriesCount: e,
  selected: n,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  sortSelected: l,
  icon: c,
  className: d,
  badgesPlaceholder: p
}) {
  return /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ i(
      Zc,
      {
        entries: t,
        getEntriesCount: e,
        selected: n,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        sortSelected: l,
        icon: c,
        className: d
      }
    ),
    n.length > 0 ? /* @__PURE__ */ i("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((f) => {
      var w;
      return /* @__PURE__ */ N(Jc, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ i(
          wt,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => r(n.filter((m) => m !== f)),
            children: /* @__PURE__ */ i(yo, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (w = t.find((m) => m.value === f)) == null ? void 0 : w.label
      ] }, f);
    }) }) : /* @__PURE__ */ i(Dt, { children: p })
  ] });
}
function Qc({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], a = Rt(() => {
    const s = [];
    return t.forEach((l) => {
      s.some((c) => xo(c, l)) || s.push(l);
    }), s;
  }, [t]);
  return /* @__PURE__ */ N(fr, { stickyHeader: !0, children: [
    /* @__PURE__ */ i(mr, { stickyHeader: !0, children: /* @__PURE__ */ N(ce, { children: [
      /* @__PURE__ */ i(En, { children: r }),
      /* @__PURE__ */ i(En, { children: o })
    ] }) }),
    /* @__PURE__ */ i(hr, { children: a.length > 0 && a.map((s) => /* @__PURE__ */ N(
      ce,
      {
        onClick: () => {
          e(s.reference);
        },
        children: [
          /* @__PURE__ */ i(Ue, { children: `${at.bookNumberToEnglishName(s.reference.bookNum)} ${s.reference.chapterNum}:${s.reference.verseNum}` }),
          /* @__PURE__ */ i(Ue, { children: s.text })
        ]
      },
      `${s.reference.bookNum} ${s.reference.chapterNum}:${s.reference.verseNum}-${s.text}`
    )) })
  ] });
}
const Mo = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  no.Root,
  {
    ref: n,
    className: y(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ i(
      no.Indicator,
      {
        className: y("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ i(Je, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Mo.displayName = no.Root.displayName;
const td = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), ya = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, ed = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? at.bookIdToNumber(e[1]) : 0;
}, nd = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Li = Re(
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
), rd = E.forwardRef(({ className: t, variant: e, size: n, ...r }, o) => /* @__PURE__ */ i(
  xi.Root,
  {
    ref: o,
    className: y(Li({ variant: e, size: n, className: t })),
    ...r
  }
));
rd.displayName = xi.Root.displayName;
const Gi = E.createContext({
  size: "default",
  variant: "default"
}), Ui = E.forwardRef(({ className: t, variant: e, size: n, children: r, ...o }, a) => {
  const s = Nt();
  return /* @__PURE__ */ i(
    dr.Root,
    {
      ref: a,
      className: y("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: s,
      children: /* @__PURE__ */ i(
        Gi.Provider,
        {
          value: { variant: e, size: n },
          children: r
        }
      )
    }
  );
});
Ui.displayName = dr.Root.displayName;
const Kn = E.forwardRef(({ className: t, children: e, variant: n, size: r, ...o }, a) => {
  const s = E.useContext(Gi);
  return /* @__PURE__ */ i(
    dr.Item,
    {
      ref: a,
      className: y(
        Li({
          variant: s.variant || n,
          size: s.size || r
        }),
        t
      ),
      ...o,
      children: e
    }
  );
});
Kn.displayName = dr.Item.displayName;
const gr = (t) => t === "asc" ? /* @__PURE__ */ i(Ol, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ i(_l, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ i(Pl, { className: "tw-ms-2 tw-h-4 tw-w-4" }), mh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ N(wt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    gr(e.getIsSorted())
  ] })
}), od = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ N(wt, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    gr(n.getIsSorted())
  ] })
}), hh = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ N(wt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    gr(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Fr = (t, e, n, r, o, a) => {
  let s = [...n];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((d) => d !== c);
  }), r(s);
  let l = [...o];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), a(l);
}, gh = (t, e, n, r, o) => ({
  accessorKey: "status",
  header: ({ column: a }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ N(wt, { variant: "ghost", onClick: () => a.toggleSorting(void 0), children: [
    t,
    gr(a.getIsSorted())
  ] }) }),
  cell: ({ row: a }) => {
    const s = a.getValue("status"), l = a.getValue("item");
    return /* @__PURE__ */ N(Ui, { value: s, variant: "outline", type: "single", children: [
      /* @__PURE__ */ i(
        Kn,
        {
          onClick: () => Fr(
            [l],
            "approved",
            e,
            n,
            r,
            o
          ),
          value: "approved",
          children: /* @__PURE__ */ i(Tl, {})
        }
      ),
      /* @__PURE__ */ i(
        Kn,
        {
          onClick: () => Fr(
            [l],
            "unapproved",
            e,
            n,
            r,
            o
          ),
          value: "unapproved",
          children: /* @__PURE__ */ i(Cl, {})
        }
      ),
      /* @__PURE__ */ i(
        Kn,
        {
          onClick: () => Fr(
            [l],
            "unknown",
            e,
            n,
            r,
            o
          ),
          value: "unknown",
          children: /* @__PURE__ */ i(Rl, {})
        }
      )
    ] });
  }
}), bh = Object.freeze([
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
]), ad = (t, e, n) => {
  let r = t;
  return e !== "all" && (r = r.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.items[0].includes(n))), r;
}, id = (t, e, n, r, o) => {
  if (!t) return [];
  const a = [];
  let s = e.bookNum, l = e.chapterNum, c = e.verseNum;
  return td(t).forEach((p) => {
    p.startsWith("\\id") && (s = ed(p), l = 0, c = 0), p.startsWith("\\c") && (l = ya(p), c = 0), p.startsWith("\\v") && (c = ya(p), l === 0 && (l = e.chapterNum));
    let f = o.exec(p) ?? void 0;
    for (; f; ) {
      const w = [];
      f.forEach((g) => w.push(g));
      const m = f.index, b = a.find((g) => xo(g.items, w)), h = {
        reference: {
          bookNum: s !== void 0 ? s : -1,
          chapterNum: l !== void 0 ? l : -1,
          verseNum: c !== void 0 ? c : -1
        },
        text: Vl(p, Math.max(0, m - 25), Math.min(m + 25, p.length))
      };
      if (b)
        b.count += 1, b.occurrences.push(h);
      else {
        const g = {
          items: w,
          count: 1,
          status: nd(w[0], n, r),
          occurrences: [h]
        };
        a.push(g);
      }
      f = o.exec(p) ?? void 0;
    }
  }), a;
}, te = (t, e) => t[e] ?? e;
function vh({
  scriptureReference: t,
  setScriptureReference: e,
  localizedStrings: n,
  extractItems: r,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  text: l,
  scope: c,
  onScopeChange: d,
  columns: p
}) {
  const f = te(n, "%webView_inventory_all%"), w = te(n, "%webView_inventory_approved%"), m = te(n, "%webView_inventory_unapproved%"), b = te(n, "%webView_inventory_unknown%"), h = te(n, "%webView_inventory_scope_currentBook%"), g = te(n, "%webView_inventory_scope_chapter%"), k = te(n, "%webView_inventory_scope_verse%"), T = te(n, "%webView_inventory_filter_text%"), C = te(
    n,
    "%webView_inventory_show_additional_items%"
  ), [S, v] = ut(!1), [P, F] = ut("all"), [R, I] = ut(""), [L, D] = ut([]), tt = Rt(() => l ? r instanceof RegExp ? id(
    l,
    t,
    a,
    s,
    r
  ) : r(l, t, a, s) : [], [l, r, t, a, s]), J = Rt(() => {
    if (S) return tt;
    const x = [];
    return tt.forEach((O) => {
      const U = O.items[0], X = x.find(
        (z) => z.items[0] === U
      );
      X ? (X.count += O.count, X.occurrences = X.occurrences.concat(O.occurrences)) : x.push({
        items: [U],
        count: O.count,
        occurrences: O.occurrences,
        status: O.status
      });
    }), x;
  }, [S, tt]), j = Rt(() => ad(J, P, R), [J, P, R]), M = Rt(() => {
    var U, X;
    if (!S) return p;
    const x = (U = o == null ? void 0 : o.tableHeaders) == null ? void 0 : U.length;
    if (!x) return p;
    const O = [];
    for (let z = 0; z < x; z++)
      O.push(
        od(
          ((X = o == null ? void 0 : o.tableHeaders) == null ? void 0 : X[z]) || "Additional Item",
          z + 1
        )
      );
    return [...O, ...p];
  }, [o == null ? void 0 : o.tableHeaders, p, S]);
  ne(() => {
    D([]);
  }, [j]);
  const A = (x, O) => {
    O.setRowSelection(() => {
      const U = {};
      return U[x.index] = !0, U;
    }), D(x.original.items);
  }, G = (x) => {
    if (x === "book" || x === "chapter" || x === "verse")
      d(x);
    else
      throw new Error(`Invalid scope value: ${x}`);
  }, H = (x) => {
    if (x === "all" || x === "approved" || x === "unapproved" || x === "unknown")
      F(x);
    else
      throw new Error(`Invalid status filter value: ${x}`);
  }, rt = Rt(() => {
    if (J.length === 0 || L.length === 0) return [];
    const x = J.filter((O) => xo(
      S ? O.items : [O.items[0]],
      L
    ));
    if (x.length > 1) throw new Error("Selected item is not unique");
    return x[0].occurrences;
  }, [L, S, J]);
  return /* @__PURE__ */ N("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ N("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ N(
        Le,
        {
          onValueChange: (x) => H(x),
          defaultValue: P,
          children: [
            /* @__PURE__ */ i(ke, { className: "tw-m-1", children: /* @__PURE__ */ i(Ge, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ N(Ee, { children: [
              /* @__PURE__ */ i(Vt, { value: "all", children: f }),
              /* @__PURE__ */ i(Vt, { value: "approved", children: w }),
              /* @__PURE__ */ i(Vt, { value: "unapproved", children: m }),
              /* @__PURE__ */ i(Vt, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ N(Le, { onValueChange: (x) => G(x), defaultValue: c, children: [
        /* @__PURE__ */ i(ke, { className: "tw-m-1", children: /* @__PURE__ */ i(Ge, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ N(Ee, { children: [
          /* @__PURE__ */ i(Vt, { value: "book", children: h }),
          /* @__PURE__ */ i(Vt, { value: "chapter", children: g }),
          /* @__PURE__ */ i(Vt, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ i(
        Qe,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: T,
          value: R,
          onChange: (x) => {
            I(x.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ N("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ i(
          Mo,
          {
            className: "tw-m-1",
            checked: S,
            onCheckedChange: (x) => {
              D([]), v(x);
            }
          }
        ),
        /* @__PURE__ */ i(Dt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? C })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      Yc,
      {
        columns: M,
        data: j,
        onRowClickHandler: A,
        stickyHeader: !0
      }
    ) }),
    rt.length > 0 && /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      Qc,
      {
        occurrenceData: rt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const Ao = E.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ i(
  Ni.Root,
  {
    ref: o,
    decorative: n,
    orientation: e,
    className: y(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...r
  }
));
Ao.displayName = Ni.Root.displayName;
function xa({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: y("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const sd = On.Provider, ld = On.Root, cd = On.Trigger, Xi = E.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ i(
  On.Content,
  {
    ref: r,
    sideOffset: e,
    className: y(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
Xi.displayName = On.Content.displayName;
const dd = "16rem", pd = "3rem", Yi = E.createContext(void 0);
function br() {
  const t = E.useContext(Yi);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Hi = E.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: r,
    style: o,
    children: a,
    side: s = "primary",
    ...l
  }, c) => {
    const [d, p] = E.useState(t), f = e ?? d, w = E.useCallback(
      (C) => {
        const S = typeof C == "function" ? C(f) : C;
        n ? n(S) : p(S);
      },
      [n, f]
    ), m = E.useCallback(() => w((C) => !C), [w]), b = f ? "expanded" : "collapsed", k = Nt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", T = E.useMemo(
      () => ({
        state: b,
        open: f,
        setOpen: w,
        toggleSidebar: m,
        side: k
      }),
      [b, f, w, m, k]
    );
    return /* @__PURE__ */ i(Yi.Provider, { value: T, children: /* @__PURE__ */ i(sd, { delayDuration: 0, children: /* @__PURE__ */ i(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": dd,
            "--sidebar-width-icon": pd,
            ...o
          }
        ),
        className: y(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          r
        ),
        ref: c,
        ...l,
        children: a
      }
    ) }) });
  }
);
Hi.displayName = "SidebarProvider";
const qi = E.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: r, ...o }, a) => {
  const s = br();
  return e === "none" ? /* @__PURE__ */ i(
    "div",
    {
      className: y(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: a,
      ...o,
      children: r
    }
  ) : /* @__PURE__ */ N(
    "div",
    {
      ref: a,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": s.state,
      "data-collapsible": s.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": s.side,
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: y(
              "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=secondary]:tw-rotate-180",
              t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ i(
          "div",
          {
            className: y(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              s.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              n
            ),
            ...o,
            children: /* @__PURE__ */ i(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",
                children: r
              }
            )
          }
        )
      ]
    }
  );
});
qi.displayName = "Sidebar";
const ud = E.forwardRef(({ className: t, onClick: e, ...n }, r) => {
  const o = br();
  return /* @__PURE__ */ N(
    wt,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: y("tw-h-7 tw-w-7", t),
      onClick: (a) => {
        e == null || e(a), o.toggleSidebar();
      },
      ...n,
      children: [
        o.side === "primary" ? /* @__PURE__ */ i(Il, {}) : /* @__PURE__ */ i($l, {}),
        /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
ud.displayName = "SidebarTrigger";
const wd = E.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: r } = br();
    return /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        ref: n,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: r,
        title: "Toggle Sidebar",
        className: y(
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
wd.displayName = "SidebarRail";
const Wi = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "main",
    {
      ref: n,
      className: y(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
Wi.displayName = "SidebarInset";
const fd = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Qe,
  {
    ref: n,
    "data-sidebar": "input",
    className: y(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
fd.displayName = "SidebarInput";
const md = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: y("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
md.displayName = "SidebarHeader";
const hd = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: y("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
hd.displayName = "SidebarFooter";
const gd = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Ao,
  {
    ref: n,
    "data-sidebar": "separator",
    className: y("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
gd.displayName = "SidebarSeparator";
const Ki = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: y(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
Ki.displayName = "SidebarContent";
const io = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: y("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
io.displayName = "SidebarGroup";
const so = E.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
  e ? Ze : "div",
  {
    ref: r,
    "data-sidebar": "group-label",
    className: y(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
so.displayName = "SidebarGroupLabel";
const bd = E.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
  e ? Ze : "button",
  {
    ref: r,
    "data-sidebar": "group-action",
    className: y(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
bd.displayName = "SidebarGroupAction";
const lo = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: y("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
lo.displayName = "SidebarGroupContent";
const Ji = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: y("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
Ji.displayName = "SidebarMenu";
const Zi = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: y("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
Zi.displayName = "SidebarMenuItem";
const vd = Re(
  // CUSTOM: Removed data-[active=true]:tw-bg-sidebar-accent
  "tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
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
), Qi = E.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: o,
    className: a,
    ...s
  }, l) => {
    const c = t ? Ze : "button", { state: d } = br(), p = /* @__PURE__ */ i(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": e,
        className: y(vd({ variant: n, size: r }), a),
        ...s
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ N(ld, { children: [
      /* @__PURE__ */ i(cd, { asChild: !0, children: p }),
      /* @__PURE__ */ i(Xi, { side: "right", align: "center", hidden: d !== "collapsed", ...o })
    ] })) : p;
  }
);
Qi.displayName = "SidebarMenuButton";
const yd = E.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...r }, o) => /* @__PURE__ */ i(
  e ? Ze : "button",
  {
    ref: o,
    "data-sidebar": "menu-action",
    className: y(
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
    ...r
  }
));
yd.displayName = "SidebarMenuAction";
const xd = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: y(
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
xd.displayName = "SidebarMenuBadge";
const Nd = E.forwardRef(({ className: t, showIcon: e = !1, ...n }, r) => {
  const o = E.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ N(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: y("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ i(xa, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ i(
          xa,
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
Nd.displayName = "SidebarMenuSkeleton";
const kd = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: y(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
kd.displayName = "SidebarMenuSub";
const Ed = E.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ i("li", { ref: e, ...t })
);
Ed.displayName = "SidebarMenuSubItem";
const Sd = E.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: r, ...o }, a) => /* @__PURE__ */ i(
  t ? Ze : "a",
  {
    ref: a,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: y(
      "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
      "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
      e === "sm" && "tw-text-xs",
      e === "md" && "tw-text-sm",
      "group-data-[collapsible=icon]:tw-hidden",
      r
    ),
    ...o
  }
));
Sd.displayName = "SidebarMenuSubButton";
function Td({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: r,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: a,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l,
  className: c
}) {
  const d = St(
    (w, m) => {
      r(w, m);
    },
    [r]
  ), p = St(
    (w) => {
      const m = n.find((b) => b.projectId === w);
      return m ? m.projectName : w;
    },
    [n]
  ), f = St(
    (w) => !o.projectId && w === o.label,
    [o]
  );
  return /* @__PURE__ */ i(
    qi,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: y("tw-w-96 tw-gap-2 tw-overflow-y-auto tw-bg-muted/50", c),
      children: /* @__PURE__ */ N(Ki, { children: [
        /* @__PURE__ */ N(io, { children: [
          /* @__PURE__ */ i(so, { className: "tw-text-sm tw-text-gray-400", children: a }),
          /* @__PURE__ */ i(lo, { children: /* @__PURE__ */ i(Ji, { children: Object.entries(e).map(([w, m]) => /* @__PURE__ */ i(Zi, { children: /* @__PURE__ */ i(
            Qi,
            {
              className: y(
                "tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",
                { "tw-bg-white tw-text-gray-900 tw-shadow-sm": f(w) }
              ),
              onClick: () => d(w),
              isActive: f(w),
              children: /* @__PURE__ */ i("span", { className: "tw-pl-3", children: m })
            }
          ) }, w)) }) })
        ] }),
        /* @__PURE__ */ N(io, { children: [
          /* @__PURE__ */ i(so, { className: "tw-text-sm tw-text-gray-400", children: s }),
          /* @__PURE__ */ i(lo, { className: "tw-pl-3", children: /* @__PURE__ */ i(
            ao,
            {
              buttonVariant: o != null && o.projectId ? "outline" : "ghost",
              buttonClassName: "tw-w-full",
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((w) => w.projectId),
              getOptionLabel: (w) => p(w),
              buttonPlaceholder: l,
              onChange: (w) => {
                const m = p(w);
                d(m, w);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0,
              icon: /* @__PURE__ */ i(Ml, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
function ts({
  value: t,
  onSearch: e,
  placeholder: n,
  isFullWidth: r,
  className: o
}) {
  const a = Nt();
  return /* @__PURE__ */ N("div", { className: y("tw-relative", { "tw-w-full": r }, o), children: [
    /* @__PURE__ */ i(
      mi,
      {
        className: y(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": a === "rtl" },
          { "tw-left-3": a === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ i(
      Qe,
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: n,
        value: t,
        onChange: (s) => e(s.target.value)
      }
    ),
    t && /* @__PURE__ */ N(
      wt,
      {
        variant: "ghost",
        size: "icon",
        className: y(
          "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
          { "tw-left-0": a === "rtl" },
          { "tw-right-0": a === "ltr" }
        ),
        onClick: () => {
          e("");
        },
        children: [
          /* @__PURE__ */ i(yo, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
function yh({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  searchValue: s,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: d,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ N("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ i("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ i(
      ts,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ N(
      Hi,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t-2 tw-border-muted",
        children: [
          /* @__PURE__ */ i(
            Td,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e-2 tw-border-muted",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: o,
              selectedSidebarItem: a,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: d,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ i(Wi, { className: "tw-min-w-[215px]", children: r })
        ]
      }
    )
  ] });
}
const se = "scrBook", Cd = "scrRef", he = "source", Rd = "details", Od = "Scripture Reference", _d = "Scripture Book", es = "Type", Pd = "Details";
function Id(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (r) => `${at.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: se,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Od,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? at.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === se ? Br(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => eo(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Br(r.start),
      id: Cd,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Br(o.start);
      },
      sortingFn: (r, o) => eo(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: he,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? es : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Rd,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Pd,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const $d = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || eo(t.start, t.end) === 0 ? `${Vr(t.start)}+${e}` : `${Vr(t.start)}+${e}-${Vr(t.end)}+${n}`;
}, Na = (t) => `${$d({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function xh({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: s,
  onRowSelected: l
}) {
  const [c, d] = ut([]), [p, f] = ut([{ id: se, desc: !1 }]), [w, m] = ut({}), b = Rt(
    () => t.flatMap((R) => R.data.map((I) => ({
      ...I,
      source: R.source
    }))),
    [t]
  ), h = Rt(
    () => Id(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: s
      },
      n
    ),
    [r, a, s, n]
  );
  ne(() => {
    c.includes(he) ? f([
      { id: he, desc: !1 },
      { id: se, desc: !1 }
    ]) : f([{ id: se, desc: !1 }]);
  }, [c]);
  const g = bi({
    data: b,
    columns: h,
    state: {
      grouping: c,
      sorting: p,
      rowSelection: w
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: m,
    getExpandedRowModel: Gl(),
    getGroupedRowModel: Ll(),
    getCoreRowModel: yi(),
    getSortedRowModel: vi(),
    getRowId: Na,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  ne(() => {
    if (l) {
      const R = g.getSelectedRowModel().rowsById, I = Object.keys(R);
      if (I.length === 1) {
        const L = b.find((D) => Na(D) === I[0]) || void 0;
        L && l(L);
      }
    }
  }, [w, b, l, g]);
  const k = o ?? _d, T = a ?? es, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [se] },
    { label: `Group by ${T}`, value: [he] },
    {
      label: `Group by ${k} and ${T}`,
      value: [se, he]
    },
    {
      label: `Group by ${T} and ${k}`,
      value: [he, se]
    }
  ], S = (R) => {
    d(JSON.parse(R));
  }, v = (R, I) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(I);
  }, P = (R, I) => R.getIsGrouped() ? "" : y("banded-row", I % 2 === 0 ? "even" : "odd"), F = (R, I, L) => {
    if (!((R == null ? void 0 : R.length) === 0 || I.depth < L.column.getGroupedIndex())) {
      if (I.getIsGrouped())
        switch (I.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (I.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ N("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ N(
      Le,
      {
        value: JSON.stringify(c),
        onValueChange: (R) => {
          S(R);
        },
        children: [
          /* @__PURE__ */ i(ke, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ i(Ge, {}) }),
          /* @__PURE__ */ i(Ee, { position: "item-aligned", children: /* @__PURE__ */ i(zc, { children: C.map((R) => /* @__PURE__ */ i(Vt, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ N(fr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ i(mr, { children: g.getHeaderGroups().map((R) => /* @__PURE__ */ i(ce, { children: R.headers.filter((I) => I.column.columnDef.header).map((I) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ i(En, { colSpan: I.colSpan, className: "top-0 tw-sticky", children: I.isPlaceholder ? void 0 : /* @__PURE__ */ N("div", { children: [
          I.column.getCanGroup() ? /* @__PURE__ */ i(
            wt,
            {
              variant: "ghost",
              title: `Toggle grouping by ${I.column.columnDef.header}`,
              onClick: I.column.getToggleGroupingHandler(),
              type: "button",
              children: I.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          bn(I.column.columnDef.header, I.getContext())
        ] }) }, I.id)
      )) }, R.id)) }),
      /* @__PURE__ */ i(hr, { children: g.getRowModel().rows.map((R, I) => {
        const L = Nt();
        return /* @__PURE__ */ i(
          ce,
          {
            "data-state": R.getIsSelected() ? "selected" : "",
            className: y(P(R, I)),
            onClick: (D) => v(R, D),
            children: R.getVisibleCells().map((D) => {
              if (!(D.getIsPlaceholder() || D.column.columnDef.enableGrouping && !D.getIsGrouped() && (D.column.columnDef.id !== he || !n)))
                return /* @__PURE__ */ i(
                  Ue,
                  {
                    className: y(
                      D.column.columnDef.id,
                      "tw-p-[1px]",
                      F(c, R, D)
                    ),
                    children: D.getIsGrouped() ? /* @__PURE__ */ N(
                      wt,
                      {
                        variant: "link",
                        onClick: R.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          R.getIsExpanded() && /* @__PURE__ */ i(cr, {}),
                          !R.getIsExpanded() && (L === "ltr" ? /* @__PURE__ */ i(bo, {}) : /* @__PURE__ */ i(Al, {})),
                          " ",
                          bn(D.column.columnDef.cell, D.getContext()),
                          " (",
                          R.subRows.length,
                          ")"
                        ]
                      }
                    ) : bn(D.column.columnDef.cell, D.getContext())
                  },
                  D.id
                );
            })
          },
          R.id
        );
      }) })
    ] })
  ] });
}
const Lr = {
  [pt("undefined")]: "Ø",
  [pt(0)]: "A",
  [pt(1)]: "B",
  [pt(2)]: "C",
  [pt(3)]: "D",
  [pt(4)]: "E",
  [pt(5)]: "F",
  [pt(6)]: "G",
  [pt(7)]: "H",
  [pt(8)]: "I",
  [pt(9)]: "J",
  [pt(10)]: "K",
  [pt(11)]: "L",
  [pt(12)]: "M",
  [pt(13)]: "N",
  [pt(14)]: "O",
  [pt(15)]: "P",
  [pt(16)]: "Q",
  [pt(17)]: "R",
  [pt(18)]: "S",
  [pt(19)]: "T",
  [pt(20)]: "U",
  [pt(21)]: "V",
  [pt(22)]: "W",
  [pt(23)]: "X",
  [pt(24)]: "Y",
  [pt(25)]: "Z"
};
function Nh({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: r = {},
  className: o
}) {
  const a = {
    ...Lr,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([l, c]) => [
          l,
          l === c && l in Lr ? Lr[l] : c
        ]
      )
    )
  }, s = Nt();
  return /* @__PURE__ */ N(
    Le,
    {
      value: `${e}`,
      onValueChange: (l) => n(
        l === "undefined" ? void 0 : parseInt(l, 10)
      ),
      children: [
        /* @__PURE__ */ i(ke, { className: y("pr-twp tw-w-auto", o), children: /* @__PURE__ */ i(
          Ge,
          {
            placeholder: a[pt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ i(
          Ee,
          {
            align: s === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((l) => /* @__PURE__ */ i(Vt, { value: `${l}`, children: a[pt(l)] }, `${l}`))
          }
        )
      ]
    }
  );
}
function kh({ children: t }) {
  return /* @__PURE__ */ i("div", { className: "pr-twp tw-grid", children: t });
}
function Eh({
  primary: t,
  secondary: e,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ i("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ i("div", { children: n })
  ] });
}
function Sh({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ N("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ i("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ i(Ao, {}) : ""
  ] });
}
const ns = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Nt();
  return /* @__PURE__ */ i(
    It.Root,
    {
      orientation: "vertical",
      ref: n,
      className: y("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: r
    }
  );
});
ns.displayName = It.List.displayName;
const rs = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.List,
  {
    ref: n,
    className: y(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
rs.displayName = It.List.displayName;
const Md = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Trigger,
  {
    ref: n,
    ...e,
    className: y(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), os = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Content,
  {
    ref: n,
    className: y(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
os.displayName = It.Content.displayName;
function Th({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: r,
  headerTitle: o,
  searchClassName: a
}) {
  return /* @__PURE__ */ N("div", { className: "pr-twp", children: [
    /* @__PURE__ */ N("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ i("h1", { children: o }) : "",
      /* @__PURE__ */ i(
        ts,
        {
          className: a,
          value: e,
          onSearch: n,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ N(ns, { children: [
      /* @__PURE__ */ i(rs, { children: t.map((s) => /* @__PURE__ */ i(Md, { value: s.value, children: s.value }, s.key)) }),
      t.map((s) => /* @__PURE__ */ i(os, { value: s.value, children: s.content }, s.key))
    ] })
  ] });
}
const as = E.createContext(void 0);
function Oe() {
  const t = E.useContext(as);
  if (!t)
    throw new Error("useContext must be used within a MenubarProvider.");
  return t;
}
const Pn = Re("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function Ad({ ...t }) {
  return /* @__PURE__ */ i(mt.Menu, { ...t });
}
function Dd({ ...t }) {
  return /* @__PURE__ */ i(mt.Sub, { "data-slot": "menubar-sub", ...t });
}
const is = E.forwardRef(({ className: t, variant: e = "default", ...n }, r) => {
  const o = E.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ i(as.Provider, { value: o, children: /* @__PURE__ */ i(
    mt.Root,
    {
      ref: r,
      className: y(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...n
    }
  ) });
});
is.displayName = mt.Root.displayName;
const ss = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Oe();
  return /* @__PURE__ */ i(
    mt.Trigger,
    {
      ref: n,
      className: y(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        Pn({ variant: r.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
ss.displayName = mt.Trigger.displayName;
const ls = E.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => {
  const a = Oe();
  return /* @__PURE__ */ N(
    mt.SubTrigger,
    {
      ref: o,
      className: y(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        Pn({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ i(bo, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
ls.displayName = mt.SubTrigger.displayName;
const cs = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Oe();
  return /* @__PURE__ */ i(
    mt.SubContent,
    {
      ref: n,
      className: y(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": r.variant === "muted"
        },
        t
      ),
      ...e
    }
  );
});
cs.displayName = mt.SubContent.displayName;
const ds = E.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: r = 8, ...o }, a) => {
  const s = Oe();
  return /* @__PURE__ */ i(mt.Portal, { children: /* @__PURE__ */ i(
    mt.Content,
    {
      ref: a,
      align: e,
      alignOffset: n,
      sideOffset: r,
      className: y(
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
ds.displayName = mt.Content.displayName;
const ps = E.forwardRef(({ className: t, inset: e, ...n }, r) => {
  const o = Oe();
  return /* @__PURE__ */ i(
    mt.Item,
    {
      ref: r,
      className: y(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        Pn({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
ps.displayName = mt.Item.displayName;
const jd = E.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => {
  const a = Oe();
  return /* @__PURE__ */ N(
    mt.CheckboxItem,
    {
      ref: o,
      className: y(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Pn({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(mt.ItemIndicator, { children: /* @__PURE__ */ i(Je, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
jd.displayName = mt.CheckboxItem.displayName;
const Bd = E.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = Oe();
  return /* @__PURE__ */ N(
    mt.RadioItem,
    {
      ref: r,
      className: y(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Pn({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(mt.ItemIndicator, { children: /* @__PURE__ */ i(vo, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Bd.displayName = mt.RadioItem.displayName;
const Vd = E.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ i(
  mt.Label,
  {
    ref: r,
    className: y("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Vd.displayName = mt.Label.displayName;
const us = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  mt.Separator,
  {
    ref: n,
    className: y("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
us.displayName = mt.Separator.displayName;
const cn = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var r;
      (r = t.current) == null || r.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, zd = (t, e) => {
  var n;
  return (n = Object.entries(t).find(
    ([, r]) => "menuItem" in r && r.menuItem === e
  )) == null ? void 0 : n[0];
}, ws = (t, e, n, r) => {
  if (!n) return;
  const o = Object.entries(t).filter(
    ([a, s]) => "column" in s && s.column === n || a === n
  ).sort(([, a], [, s]) => a.order - s.order);
  return o.flatMap(([a], s) => {
    const l = e.filter((d) => d.group === a).sort((d, p) => d.order - p.order).map(
      (d) => "command" in d ? /* @__PURE__ */ i(
        ps,
        {
          onClick: () => {
            r(d);
          },
          children: d.label
        },
        d.command
      ) : /* @__PURE__ */ N(Dd, { children: [
        /* @__PURE__ */ i(ls, { children: d.label }),
        /* @__PURE__ */ i(cs, { children: ws(
          t,
          e,
          zd(t, d.id),
          r
        ) })
      ] }, d.id)
    ), c = [...l];
    return l.length > 0 && s < o.length - 1 && c.push(/* @__PURE__ */ i(us, {}, `${a}-separator`)), c;
  });
};
function Fd({
  menuData: t,
  commandHandler: e,
  onOpenChange: n,
  variant: r
}) {
  const o = Ft(void 0), a = Ft(void 0), s = Ft(void 0), l = Ft(void 0), c = Ft(void 0), d = (p) => {
    switch (p) {
      case "platform.project":
        return a;
      case "platform.window":
        return s;
      case "platform.layout":
        return l;
      case "platform.help":
        return c;
      default:
        return;
    }
  };
  if (Xl(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, f) => {
    var b, h, g, k;
    p.preventDefault();
    const w = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, m = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
      case "alt":
        cn(a, [w]);
        break;
      case "alt+p":
        (b = a.current) == null || b.focus(), cn(a, [w, m]);
        break;
      case "alt+l":
        (h = s.current) == null || h.focus(), cn(s, [w, m]);
        break;
      case "alt+n":
        (g = l.current) == null || g.focus(), cn(l, [w, m]);
        break;
      case "alt+h":
        (k = c.current) == null || k.focus(), cn(c, [w, m]);
        break;
    }
  }), ne(() => {
    if (!n || !o.current) return;
    const p = new MutationObserver((m) => {
      m.forEach((b) => {
        if (b.attributeName === "data-state" && b.target instanceof HTMLElement) {
          const h = b.target.getAttribute("data-state");
          n(h === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((m) => {
      p.observe(m, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ i(is, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: r, children: Object.entries(t.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, f]) => typeof p == "boolean" || typeof f == "boolean" ? 0 : p.order - f.order).map(([p, f]) => /* @__PURE__ */ N(Ad, { children: [
      /* @__PURE__ */ i(ss, { ref: d(p), children: typeof f == "object" && "label" in f && f.label }),
      /* @__PURE__ */ i(ds, { children: ws(t.groups, t.items, p, e) })
    ] }, p)) });
}
function Ch(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Rh({
  menuData: t,
  onOpenChange: e,
  commandHandler: n,
  className: r,
  id: o,
  children: a,
  appMenuAreaChildren: s,
  configAreaChildren: l,
  shouldUseAsAppDragArea: c,
  menubarVariant: d = "default"
}) {
  const p = Ft(void 0);
  return /* @__PURE__ */ i(
    "div",
    {
      className: y("tw-border tw-px-4 tw-text-foreground", r),
      ref: p,
      style: { position: "relative" },
      id: o,
      children: /* @__PURE__ */ N(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ i("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ N(
              "div",
              {
                className: "tw-flex tw-items-center",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ i(
                    Fd,
                    {
                      menuData: t,
                      onOpenChange: e,
                      commandHandler: n,
                      variant: d
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ i(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: a
              }
            ),
            /* @__PURE__ */ i("div", { className: "tw-flex tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ i(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: l
              }
            ) })
          ]
        }
      )
    }
  );
}
const Ld = (t, e) => t[e] ?? e;
function Oh({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: r,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: a,
  localizedStrings: s,
  className: l
}) {
  const c = Ld(
    s,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [d, p] = ut(!1), f = (m) => {
    o && o(m), r && r([m, ...n.filter((b) => b !== m)]), a && n.find((b) => b === m) && a([...n.filter((b) => b !== m)]), p(!1);
  }, w = (m, b) => {
    var g, k, T, C, S, v;
    const h = b !== m ? ((k = (g = t[m]) == null ? void 0 : g.uiNames) == null ? void 0 : k[b]) ?? ((C = (T = t[m]) == null ? void 0 : T.uiNames) == null ? void 0 : C.en) : void 0;
    return h ? `${(S = t[m]) == null ? void 0 : S.autonym} (${h})` : (v = t[m]) == null ? void 0 : v.autonym;
  };
  return /* @__PURE__ */ N("div", { className: y("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ N(
      Le,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (m) => p(m),
        children: [
          /* @__PURE__ */ i(ke, { children: /* @__PURE__ */ i(Ge, {}) }),
          /* @__PURE__ */ i(
            Ee,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((m) => /* @__PURE__ */ i(Vt, { value: m, children: w(m, e) }, m))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ N(ae, { children: [
      /* @__PURE__ */ i(Dt, { className: "tw-ms-3", children: c }),
      /* @__PURE__ */ i("div", { className: "tw-ms-3", children: /* @__PURE__ */ N(Dt, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((m) => w(m, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
function _h({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ i("div", { id: t, className: e, children: n.map((s) => /* @__PURE__ */ N("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ i(
      Mo,
      {
        className: "tw-me-2 tw-align-middle",
        checked: r.includes(s),
        onCheckedChange: (l) => o(s, l)
      }
    ),
    /* @__PURE__ */ i(Dt, { children: a ? a(s) : s })
  ] }, s)) });
}
function fs(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Gd(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
var dn = {}, Gr = { exports: {} }, ka;
function Ud() {
  return ka || (ka = 1, function(t) {
    function e(n) {
      return n && n.__esModule ? n : {
        default: n
      };
    }
    t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
  }(Gr)), Gr.exports;
}
var Ur = {};
function Do(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return t(...r) || e(...r);
  };
}
function _() {
  return _ = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, _.apply(null, arguments);
}
function ve(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function ms(t) {
  if (!ve(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((n) => {
    e[n] = ms(t[n]);
  }), e;
}
function ee(t, e, n = {
  clone: !0
}) {
  const r = n.clone ? _({}, t) : t;
  return ve(t) && ve(e) && Object.keys(e).forEach((o) => {
    o !== "__proto__" && (ve(e[o]) && o in t && ve(t[o]) ? r[o] = ee(t[o], e[o], n) : n.clone ? r[o] = ve(e[o]) ? ms(e[o]) : e[o] : r[o] = e[o]);
  }), r;
}
var Gn = { exports: {} }, Un = { exports: {} }, it = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ea;
function Xd() {
  if (Ea) return it;
  Ea = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, p = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, b = t ? Symbol.for("react.lazy") : 60116, h = t ? Symbol.for("react.block") : 60121, g = t ? Symbol.for("react.fundamental") : 60117, k = t ? Symbol.for("react.responder") : 60118, T = t ? Symbol.for("react.scope") : 60119;
  function C(v) {
    if (typeof v == "object" && v !== null) {
      var P = v.$$typeof;
      switch (P) {
        case e:
          switch (v = v.type, v) {
            case c:
            case d:
            case r:
            case a:
            case o:
            case f:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case l:
                case p:
                case b:
                case m:
                case s:
                  return v;
                default:
                  return P;
              }
          }
        case n:
          return P;
      }
    }
  }
  function S(v) {
    return C(v) === d;
  }
  return it.AsyncMode = c, it.ConcurrentMode = d, it.ContextConsumer = l, it.ContextProvider = s, it.Element = e, it.ForwardRef = p, it.Fragment = r, it.Lazy = b, it.Memo = m, it.Portal = n, it.Profiler = a, it.StrictMode = o, it.Suspense = f, it.isAsyncMode = function(v) {
    return S(v) || C(v) === c;
  }, it.isConcurrentMode = S, it.isContextConsumer = function(v) {
    return C(v) === l;
  }, it.isContextProvider = function(v) {
    return C(v) === s;
  }, it.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, it.isForwardRef = function(v) {
    return C(v) === p;
  }, it.isFragment = function(v) {
    return C(v) === r;
  }, it.isLazy = function(v) {
    return C(v) === b;
  }, it.isMemo = function(v) {
    return C(v) === m;
  }, it.isPortal = function(v) {
    return C(v) === n;
  }, it.isProfiler = function(v) {
    return C(v) === a;
  }, it.isStrictMode = function(v) {
    return C(v) === o;
  }, it.isSuspense = function(v) {
    return C(v) === f;
  }, it.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === d || v === a || v === o || v === f || v === w || typeof v == "object" && v !== null && (v.$$typeof === b || v.$$typeof === m || v.$$typeof === s || v.$$typeof === l || v.$$typeof === p || v.$$typeof === g || v.$$typeof === k || v.$$typeof === T || v.$$typeof === h);
  }, it.typeOf = C, it;
}
var st = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sa;
function Yd() {
  return Sa || (Sa = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, p = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, b = t ? Symbol.for("react.lazy") : 60116, h = t ? Symbol.for("react.block") : 60121, g = t ? Symbol.for("react.fundamental") : 60117, k = t ? Symbol.for("react.responder") : 60118, T = t ? Symbol.for("react.scope") : 60119;
    function C($) {
      return typeof $ == "string" || typeof $ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      $ === r || $ === d || $ === a || $ === o || $ === f || $ === w || typeof $ == "object" && $ !== null && ($.$$typeof === b || $.$$typeof === m || $.$$typeof === s || $.$$typeof === l || $.$$typeof === p || $.$$typeof === g || $.$$typeof === k || $.$$typeof === T || $.$$typeof === h);
    }
    function S($) {
      if (typeof $ == "object" && $ !== null) {
        var kt = $.$$typeof;
        switch (kt) {
          case e:
            var V = $.type;
            switch (V) {
              case c:
              case d:
              case r:
              case a:
              case o:
              case f:
                return V;
              default:
                var xt = V && V.$$typeof;
                switch (xt) {
                  case l:
                  case p:
                  case b:
                  case m:
                  case s:
                    return xt;
                  default:
                    return kt;
                }
            }
          case n:
            return kt;
        }
      }
    }
    var v = c, P = d, F = l, R = s, I = e, L = p, D = r, tt = b, J = m, j = n, M = a, A = o, G = f, H = !1;
    function rt($) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), x($) || S($) === c;
    }
    function x($) {
      return S($) === d;
    }
    function O($) {
      return S($) === l;
    }
    function U($) {
      return S($) === s;
    }
    function X($) {
      return typeof $ == "object" && $ !== null && $.$$typeof === e;
    }
    function z($) {
      return S($) === p;
    }
    function K($) {
      return S($) === r;
    }
    function q($) {
      return S($) === b;
    }
    function W($) {
      return S($) === m;
    }
    function Y($) {
      return S($) === n;
    }
    function Z($) {
      return S($) === a;
    }
    function Q($) {
      return S($) === o;
    }
    function dt($) {
      return S($) === f;
    }
    st.AsyncMode = v, st.ConcurrentMode = P, st.ContextConsumer = F, st.ContextProvider = R, st.Element = I, st.ForwardRef = L, st.Fragment = D, st.Lazy = tt, st.Memo = J, st.Portal = j, st.Profiler = M, st.StrictMode = A, st.Suspense = G, st.isAsyncMode = rt, st.isConcurrentMode = x, st.isContextConsumer = O, st.isContextProvider = U, st.isElement = X, st.isForwardRef = z, st.isFragment = K, st.isLazy = q, st.isMemo = W, st.isPortal = Y, st.isProfiler = Z, st.isStrictMode = Q, st.isSuspense = dt, st.isValidElementType = C, st.typeOf = S;
  }()), st;
}
var Ta;
function hs() {
  return Ta || (Ta = 1, process.env.NODE_ENV === "production" ? Un.exports = Xd() : Un.exports = Yd()), Un.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Xr, Ca;
function Hd() {
  if (Ca) return Xr;
  Ca = 1;
  var t = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
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
      var c = Object.getOwnPropertyNames(s).map(function(p) {
        return s[p];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var d = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(p) {
        d[p] = p;
      }), Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Xr = o() ? Object.assign : function(a, s) {
    for (var l, c = r(a), d, p = 1; p < arguments.length; p++) {
      l = Object(arguments[p]);
      for (var f in l)
        e.call(l, f) && (c[f] = l[f]);
      if (t) {
        d = t(l);
        for (var w = 0; w < d.length; w++)
          n.call(l, d[w]) && (c[d[w]] = l[d[w]]);
      }
    }
    return c;
  }, Xr;
}
var Yr, Ra;
function jo() {
  if (Ra) return Yr;
  Ra = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Yr = t, Yr;
}
var Hr, Oa;
function gs() {
  return Oa || (Oa = 1, Hr = Function.call.bind(Object.prototype.hasOwnProperty)), Hr;
}
var qr, _a;
function qd() {
  if (_a) return qr;
  _a = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = /* @__PURE__ */ jo(), n = {}, r = /* @__PURE__ */ gs();
    t = function(a) {
      var s = "Warning: " + a;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(a, s, l, c, d) {
    if (process.env.NODE_ENV !== "production") {
      for (var p in a)
        if (r(a, p)) {
          var f;
          try {
            if (typeof a[p] != "function") {
              var w = Error(
                (c || "React class") + ": " + l + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw w.name = "Invariant Violation", w;
            }
            f = a[p](s, p, c, l, null, e);
          } catch (b) {
            f = b;
          }
          if (f && !(f instanceof Error) && t(
            (c || "React class") + ": type specification of " + l + " `" + p + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in n)) {
            n[f.message] = !0;
            var m = d ? d() : "";
            t(
              "Failed " + l + " type: " + f.message + (m ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, qr = o, qr;
}
var Wr, Pa;
function Wd() {
  if (Pa) return Wr;
  Pa = 1;
  var t = hs(), e = Hd(), n = /* @__PURE__ */ jo(), r = /* @__PURE__ */ gs(), o = /* @__PURE__ */ qd(), a = function() {
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
  return Wr = function(l, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, p = "@@iterator";
    function f(x) {
      var O = x && (d && x[d] || x[p]);
      if (typeof O == "function")
        return O;
    }
    var w = "<<anonymous>>", m = {
      array: k("array"),
      bigint: k("bigint"),
      bool: k("boolean"),
      func: k("function"),
      number: k("number"),
      object: k("object"),
      string: k("string"),
      symbol: k("symbol"),
      any: T(),
      arrayOf: C,
      element: S(),
      elementType: v(),
      instanceOf: P,
      node: L(),
      objectOf: R,
      oneOf: F,
      oneOfType: I,
      shape: tt,
      exact: J
    };
    function b(x, O) {
      return x === O ? x !== 0 || 1 / x === 1 / O : x !== x && O !== O;
    }
    function h(x, O) {
      this.message = x, this.data = O && typeof O == "object" ? O : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function g(x) {
      if (process.env.NODE_ENV !== "production")
        var O = {}, U = 0;
      function X(K, q, W, Y, Z, Q, dt) {
        if (Y = Y || w, Q = Q || W, dt !== n) {
          if (c) {
            var $ = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw $.name = "Invariant Violation", $;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var kt = Y + ":" + W;
            !O[kt] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + Q + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), O[kt] = !0, U++);
          }
        }
        return q[W] == null ? K ? q[W] === null ? new h("The " + Z + " `" + Q + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new h("The " + Z + " `" + Q + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : x(q, W, Y, Z, Q);
      }
      var z = X.bind(null, !1);
      return z.isRequired = X.bind(null, !0), z;
    }
    function k(x) {
      function O(U, X, z, K, q, W) {
        var Y = U[X], Z = A(Y);
        if (Z !== x) {
          var Q = G(Y);
          return new h(
            "Invalid " + K + " `" + q + "` of type " + ("`" + Q + "` supplied to `" + z + "`, expected ") + ("`" + x + "`."),
            { expectedType: x }
          );
        }
        return null;
      }
      return g(O);
    }
    function T() {
      return g(s);
    }
    function C(x) {
      function O(U, X, z, K, q) {
        if (typeof x != "function")
          return new h("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var W = U[X];
        if (!Array.isArray(W)) {
          var Y = A(W);
          return new h("Invalid " + K + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected an array."));
        }
        for (var Z = 0; Z < W.length; Z++) {
          var Q = x(W, Z, z, K, q + "[" + Z + "]", n);
          if (Q instanceof Error)
            return Q;
        }
        return null;
      }
      return g(O);
    }
    function S() {
      function x(O, U, X, z, K) {
        var q = O[U];
        if (!l(q)) {
          var W = A(q);
          return new h("Invalid " + z + " `" + K + "` of type " + ("`" + W + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return g(x);
    }
    function v() {
      function x(O, U, X, z, K) {
        var q = O[U];
        if (!t.isValidElementType(q)) {
          var W = A(q);
          return new h("Invalid " + z + " `" + K + "` of type " + ("`" + W + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return g(x);
    }
    function P(x) {
      function O(U, X, z, K, q) {
        if (!(U[X] instanceof x)) {
          var W = x.name || w, Y = rt(U[X]);
          return new h("Invalid " + K + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected ") + ("instance of `" + W + "`."));
        }
        return null;
      }
      return g(O);
    }
    function F(x) {
      if (!Array.isArray(x))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function O(U, X, z, K, q) {
        for (var W = U[X], Y = 0; Y < x.length; Y++)
          if (b(W, x[Y]))
            return null;
        var Z = JSON.stringify(x, function(dt, $) {
          var kt = G($);
          return kt === "symbol" ? String($) : $;
        });
        return new h("Invalid " + K + " `" + q + "` of value `" + String(W) + "` " + ("supplied to `" + z + "`, expected one of " + Z + "."));
      }
      return g(O);
    }
    function R(x) {
      function O(U, X, z, K, q) {
        if (typeof x != "function")
          return new h("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var W = U[X], Y = A(W);
        if (Y !== "object")
          return new h("Invalid " + K + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected an object."));
        for (var Z in W)
          if (r(W, Z)) {
            var Q = x(W, Z, z, K, q + "." + Z, n);
            if (Q instanceof Error)
              return Q;
          }
        return null;
      }
      return g(O);
    }
    function I(x) {
      if (!Array.isArray(x))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var O = 0; O < x.length; O++) {
        var U = x[O];
        if (typeof U != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + H(U) + " at index " + O + "."
          ), s;
      }
      function X(z, K, q, W, Y) {
        for (var Z = [], Q = 0; Q < x.length; Q++) {
          var dt = x[Q], $ = dt(z, K, q, W, Y, n);
          if ($ == null)
            return null;
          $.data && r($.data, "expectedType") && Z.push($.data.expectedType);
        }
        var kt = Z.length > 0 ? ", expected one of type [" + Z.join(", ") + "]" : "";
        return new h("Invalid " + W + " `" + Y + "` supplied to " + ("`" + q + "`" + kt + "."));
      }
      return g(X);
    }
    function L() {
      function x(O, U, X, z, K) {
        return j(O[U]) ? null : new h("Invalid " + z + " `" + K + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return g(x);
    }
    function D(x, O, U, X, z) {
      return new h(
        (x || "React class") + ": " + O + " type `" + U + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function tt(x) {
      function O(U, X, z, K, q) {
        var W = U[X], Y = A(W);
        if (Y !== "object")
          return new h("Invalid " + K + " `" + q + "` of type `" + Y + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var Z in x) {
          var Q = x[Z];
          if (typeof Q != "function")
            return D(z, K, q, Z, G(Q));
          var dt = Q(W, Z, z, K, q + "." + Z, n);
          if (dt)
            return dt;
        }
        return null;
      }
      return g(O);
    }
    function J(x) {
      function O(U, X, z, K, q) {
        var W = U[X], Y = A(W);
        if (Y !== "object")
          return new h("Invalid " + K + " `" + q + "` of type `" + Y + "` " + ("supplied to `" + z + "`, expected `object`."));
        var Z = e({}, U[X], x);
        for (var Q in Z) {
          var dt = x[Q];
          if (r(x, Q) && typeof dt != "function")
            return D(z, K, q, Q, G(dt));
          if (!dt)
            return new h(
              "Invalid " + K + " `" + q + "` key `" + Q + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(U[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(x), null, "  ")
            );
          var $ = dt(W, Q, z, K, q + "." + Q, n);
          if ($)
            return $;
        }
        return null;
      }
      return g(O);
    }
    function j(x) {
      switch (typeof x) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !x;
        case "object":
          if (Array.isArray(x))
            return x.every(j);
          if (x === null || l(x))
            return !0;
          var O = f(x);
          if (O) {
            var U = O.call(x), X;
            if (O !== x.entries) {
              for (; !(X = U.next()).done; )
                if (!j(X.value))
                  return !1;
            } else
              for (; !(X = U.next()).done; ) {
                var z = X.value;
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
    function M(x, O) {
      return x === "symbol" ? !0 : O ? O["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && O instanceof Symbol : !1;
    }
    function A(x) {
      var O = typeof x;
      return Array.isArray(x) ? "array" : x instanceof RegExp ? "object" : M(O, x) ? "symbol" : O;
    }
    function G(x) {
      if (typeof x > "u" || x === null)
        return "" + x;
      var O = A(x);
      if (O === "object") {
        if (x instanceof Date)
          return "date";
        if (x instanceof RegExp)
          return "regexp";
      }
      return O;
    }
    function H(x) {
      var O = G(x);
      switch (O) {
        case "array":
        case "object":
          return "an " + O;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + O;
        default:
          return O;
      }
    }
    function rt(x) {
      return !x.constructor || !x.constructor.name ? w : x.constructor.name;
    }
    return m.checkPropTypes = o, m.resetWarningCache = o.resetWarningCache, m.PropTypes = m, m;
  }, Wr;
}
var Kr, Ia;
function Kd() {
  if (Ia) return Kr;
  Ia = 1;
  var t = /* @__PURE__ */ jo();
  function e() {
  }
  function n() {
  }
  return n.resetWarningCache = e, Kr = function() {
    function r(s, l, c, d, p, f) {
      if (f !== t) {
        var w = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw w.name = "Invariant Violation", w;
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
      resetWarningCache: e
    };
    return a.PropTypes = a, a;
  }, Kr;
}
var $a;
function Jd() {
  if ($a) return Gn.exports;
  if ($a = 1, process.env.NODE_ENV !== "production") {
    var t = hs(), e = !0;
    Gn.exports = /* @__PURE__ */ Wd()(t.isElement, e);
  } else
    Gn.exports = /* @__PURE__ */ Kd()();
  return Gn.exports;
}
var Zd = /* @__PURE__ */ Jd();
const u = /* @__PURE__ */ fs(Zd);
function Qd(t) {
  const {
    prototype: e = {}
  } = t;
  return !!e.isReactComponent;
}
function bs(t, e, n, r, o) {
  const a = t[e], s = o || e;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Qd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Bo = Do(u.element, bs);
Bo.isRequired = Do(u.element.isRequired, bs);
const tp = "exact-prop: ​";
function ep(t) {
  return process.env.NODE_ENV === "production" ? t : _({}, t, {
    [tp]: (e) => {
      const n = Object.keys(e).filter((r) => !t.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Xe(t) {
  let e = "https://mui.com/production-error/?code=" + t;
  for (let n = 1; n < arguments.length; n += 1)
    e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + t + "; visit " + e + " for the full message.";
}
var Xn = { exports: {} }, lt = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ma;
function np() {
  if (Ma) return lt;
  Ma = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), b;
  b = Symbol.for("react.module.reference");
  function h(g) {
    if (typeof g == "object" && g !== null) {
      var k = g.$$typeof;
      switch (k) {
        case t:
          switch (g = g.type, g) {
            case n:
            case o:
            case r:
            case d:
            case p:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case l:
                case s:
                case c:
                case w:
                case f:
                case a:
                  return g;
                default:
                  return k;
              }
          }
        case e:
          return k;
      }
    }
  }
  return lt.ContextConsumer = s, lt.ContextProvider = a, lt.Element = t, lt.ForwardRef = c, lt.Fragment = n, lt.Lazy = w, lt.Memo = f, lt.Portal = e, lt.Profiler = o, lt.StrictMode = r, lt.Suspense = d, lt.SuspenseList = p, lt.isAsyncMode = function() {
    return !1;
  }, lt.isConcurrentMode = function() {
    return !1;
  }, lt.isContextConsumer = function(g) {
    return h(g) === s;
  }, lt.isContextProvider = function(g) {
    return h(g) === a;
  }, lt.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === t;
  }, lt.isForwardRef = function(g) {
    return h(g) === c;
  }, lt.isFragment = function(g) {
    return h(g) === n;
  }, lt.isLazy = function(g) {
    return h(g) === w;
  }, lt.isMemo = function(g) {
    return h(g) === f;
  }, lt.isPortal = function(g) {
    return h(g) === e;
  }, lt.isProfiler = function(g) {
    return h(g) === o;
  }, lt.isStrictMode = function(g) {
    return h(g) === r;
  }, lt.isSuspense = function(g) {
    return h(g) === d;
  }, lt.isSuspenseList = function(g) {
    return h(g) === p;
  }, lt.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === n || g === o || g === r || g === d || g === p || g === m || typeof g == "object" && g !== null && (g.$$typeof === w || g.$$typeof === f || g.$$typeof === a || g.$$typeof === s || g.$$typeof === c || g.$$typeof === b || g.getModuleId !== void 0);
  }, lt.typeOf = h, lt;
}
var ct = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Aa;
function rp() {
  return Aa || (Aa = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), b = !1, h = !1, g = !1, k = !1, T = !1, C;
    C = Symbol.for("react.module.reference");
    function S(V) {
      return !!(typeof V == "string" || typeof V == "function" || V === n || V === o || T || V === r || V === d || V === p || k || V === m || b || h || g || typeof V == "object" && V !== null && (V.$$typeof === w || V.$$typeof === f || V.$$typeof === a || V.$$typeof === s || V.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      V.$$typeof === C || V.getModuleId !== void 0));
    }
    function v(V) {
      if (typeof V == "object" && V !== null) {
        var xt = V.$$typeof;
        switch (xt) {
          case t:
            var Yt = V.type;
            switch (Yt) {
              case n:
              case o:
              case r:
              case d:
              case p:
                return Yt;
              default:
                var ue = Yt && Yt.$$typeof;
                switch (ue) {
                  case l:
                  case s:
                  case c:
                  case w:
                  case f:
                  case a:
                    return ue;
                  default:
                    return xt;
                }
            }
          case e:
            return xt;
        }
      }
    }
    var P = s, F = a, R = t, I = c, L = n, D = w, tt = f, J = e, j = o, M = r, A = d, G = p, H = !1, rt = !1;
    function x(V) {
      return H || (H = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function O(V) {
      return rt || (rt = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(V) {
      return v(V) === s;
    }
    function X(V) {
      return v(V) === a;
    }
    function z(V) {
      return typeof V == "object" && V !== null && V.$$typeof === t;
    }
    function K(V) {
      return v(V) === c;
    }
    function q(V) {
      return v(V) === n;
    }
    function W(V) {
      return v(V) === w;
    }
    function Y(V) {
      return v(V) === f;
    }
    function Z(V) {
      return v(V) === e;
    }
    function Q(V) {
      return v(V) === o;
    }
    function dt(V) {
      return v(V) === r;
    }
    function $(V) {
      return v(V) === d;
    }
    function kt(V) {
      return v(V) === p;
    }
    ct.ContextConsumer = P, ct.ContextProvider = F, ct.Element = R, ct.ForwardRef = I, ct.Fragment = L, ct.Lazy = D, ct.Memo = tt, ct.Portal = J, ct.Profiler = j, ct.StrictMode = M, ct.Suspense = A, ct.SuspenseList = G, ct.isAsyncMode = x, ct.isConcurrentMode = O, ct.isContextConsumer = U, ct.isContextProvider = X, ct.isElement = z, ct.isForwardRef = K, ct.isFragment = q, ct.isLazy = W, ct.isMemo = Y, ct.isPortal = Z, ct.isProfiler = Q, ct.isStrictMode = dt, ct.isSuspense = $, ct.isSuspenseList = kt, ct.isValidElementType = S, ct.typeOf = v;
  }()), ct;
}
var Da;
function op() {
  return Da || (Da = 1, process.env.NODE_ENV === "production" ? Xn.exports = np() : Xn.exports = rp()), Xn.exports;
}
var ja = op();
const ap = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function ip(t) {
  const e = `${t}`.match(ap);
  return e && e[1] || "";
}
function vs(t, e = "") {
  return t.displayName || t.name || ip(t) || e;
}
function Ba(t, e, n) {
  const r = vs(e);
  return t.displayName || (r !== "" ? `${n}(${r})` : n);
}
function sp(t) {
  if (t != null) {
    if (typeof t == "string")
      return t;
    if (typeof t == "function")
      return vs(t, "Component");
    if (typeof t == "object")
      switch (t.$$typeof) {
        case ja.ForwardRef:
          return Ba(t, t.render, "ForwardRef");
        case ja.Memo:
          return Ba(t, t.type, "memo");
        default:
          return;
      }
  }
}
function Sn(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = t[e], s = o || e;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const ys = u.oneOfType([u.func, u.object]);
function Jt(t) {
  if (typeof t != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Xe(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function lp(...t) {
  return t.reduce((e, n) => n == null ? e : function(...o) {
    e.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function cp(t, e = 166) {
  let n;
  function r(...o) {
    const a = () => {
      t.apply(this, o);
    };
    clearTimeout(n), n = setTimeout(a, e);
  }
  return r.clear = () => {
    clearTimeout(n);
  }, r;
}
function dp(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${e}`) : null;
  };
}
function pp(t, e) {
  var n, r;
  return /* @__PURE__ */ B.isValidElement(t) && e.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = t.type.muiName) != null ? n : (r = t.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function tr(t) {
  return t && t.ownerDocument || document;
}
function up(t) {
  return tr(t).defaultView || window;
}
function wp(t, e) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = e ? _({}, e.propTypes) : null;
  return (o) => (a, s, l, c, d, ...p) => {
    const f = d || s, w = n == null ? void 0 : n[f];
    if (w) {
      const m = w(a, s, l, c, d, ...p);
      if (m)
        return m;
    }
    return typeof a[s] < "u" && !a[o] ? new Error(`The prop \`${f}\` of \`${t}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function er(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
const Ye = typeof window < "u" ? B.useLayoutEffect : B.useEffect;
let Va = 0;
function fp(t) {
  const [e, n] = B.useState(t), r = t || e;
  return B.useEffect(() => {
    e == null && (Va += 1, n(`mui-${Va}`));
  }, [e]), r;
}
const za = B.useId;
function xs(t) {
  if (za !== void 0) {
    const e = za();
    return t ?? e;
  }
  return fp(t);
}
function mp(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || e;
  return typeof t[e] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function Ns({
  controlled: t,
  default: e,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = B.useRef(t !== void 0), [a, s] = B.useState(e), l = o ? t : a;
  if (process.env.NODE_ENV !== "production") {
    B.useEffect(() => {
      o !== (t !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, t]);
    const {
      current: d
    } = B.useRef(e);
    B.useEffect(() => {
      !o && d !== e && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(e)]);
  }
  const c = B.useCallback((d) => {
    o || s(d);
  }, []);
  return [l, c];
}
function co(t) {
  const e = B.useRef(t);
  return Ye(() => {
    e.current = t;
  }), B.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, e.current)(...n)
  )).current;
}
function Se(...t) {
  return B.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
      er(n, e);
    });
  }, t);
}
const Fa = {};
function hp(t, e) {
  const n = B.useRef(Fa);
  return n.current === Fa && (n.current = t(e)), n;
}
const gp = [];
function bp(t) {
  B.useEffect(t, gp);
}
class In {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new In();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(e, n) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, n();
    }, e);
  }
}
function mn() {
  const t = hp(In.create).current;
  return bp(t.disposeEffect), t;
}
let vr = !0, po = !1;
const vp = new In(), yp = {
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
function xp(t) {
  const {
    type: e,
    tagName: n
  } = t;
  return !!(n === "INPUT" && yp[e] && !t.readOnly || n === "TEXTAREA" && !t.readOnly || t.isContentEditable);
}
function Np(t) {
  t.metaKey || t.altKey || t.ctrlKey || (vr = !0);
}
function Jr() {
  vr = !1;
}
function kp() {
  this.visibilityState === "hidden" && po && (vr = !0);
}
function Ep(t) {
  t.addEventListener("keydown", Np, !0), t.addEventListener("mousedown", Jr, !0), t.addEventListener("pointerdown", Jr, !0), t.addEventListener("touchstart", Jr, !0), t.addEventListener("visibilitychange", kp, !0);
}
function Sp(t) {
  const {
    target: e
  } = t;
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return vr || xp(e);
}
function ks() {
  const t = B.useCallback((o) => {
    o != null && Ep(o.ownerDocument);
  }, []), e = B.useRef(!1);
  function n() {
    return e.current ? (po = !0, vp.start(100, () => {
      po = !1;
    }), e.current = !1, !0) : !1;
  }
  function r(o) {
    return Sp(o) ? (e.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: e,
    onFocus: r,
    onBlur: n,
    ref: t
  };
}
function Es(t, e) {
  const n = _({}, e);
  return Object.keys(t).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = _({}, t[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = t[r] || {}, a = e[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = _({}, a), Object.keys(o).forEach((s) => {
        n[r][s] = Es(o[s], a[s]);
      }));
    } else n[r] === void 0 && (n[r] = t[r]);
  }), n;
}
function Vo(t, e, n = void 0) {
  const r = {};
  return Object.keys(t).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = t[o].reduce((a, s) => {
        if (s) {
          const l = e(s);
          l !== "" && a.push(l), n && n[s] && a.push(n[s]);
        }
        return a;
      }, []).join(" ");
    }
  ), r;
}
const La = (t) => t, Tp = () => {
  let t = La;
  return {
    configure(e) {
      t = e;
    },
    generate(e) {
      return t(e);
    },
    reset() {
      t = La;
    }
  };
}, Ss = Tp(), Ts = {
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
function yr(t, e, n = "Mui") {
  const r = Ts[e];
  return r ? `${n}-${r}` : `${Ss.generate(t)}-${e}`;
}
function Cs(t, e, n = "Mui") {
  const r = {};
  return e.forEach((o) => {
    r[o] = yr(t, o, n);
  }), r;
}
function Cp(t, e = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(e, Math.min(t, n));
}
function Et(t, e) {
  if (t == null) return {};
  var n = {};
  for (var r in t) if ({}.hasOwnProperty.call(t, r)) {
    if (e.indexOf(r) !== -1) continue;
    n[r] = t[r];
  }
  return n;
}
const Rp = ["values", "unit", "step"], Op = (t) => {
  const e = Object.keys(t).map((n) => ({
    key: n,
    val: t[n]
  })) || [];
  return e.sort((n, r) => n.val - r.val), e.reduce((n, r) => _({}, n, {
    [r.key]: r.val
  }), {});
};
function _p(t) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: e = {
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
  } = t, o = Et(t, Rp), a = Op(e), s = Object.keys(a);
  function l(w) {
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n})`;
  }
  function c(w) {
    return `@media (max-width:${(typeof e[w] == "number" ? e[w] : w) - r / 100}${n})`;
  }
  function d(w, m) {
    const b = s.indexOf(m);
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n}) and (max-width:${(b !== -1 && typeof e[s[b]] == "number" ? e[s[b]] : m) - r / 100}${n})`;
  }
  function p(w) {
    return s.indexOf(w) + 1 < s.length ? d(w, s[s.indexOf(w) + 1]) : l(w);
  }
  function f(w) {
    const m = s.indexOf(w);
    return m === 0 ? l(s[1]) : m === s.length - 1 ? c(s[m]) : d(w, s[s.indexOf(w) + 1]).replace("@media", "@media not all and");
  }
  return _({
    keys: s,
    values: a,
    up: l,
    down: c,
    between: d,
    only: p,
    not: f,
    unit: n
  }, o);
}
const Pp = {
  borderRadius: 4
}, de = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.string, u.object, u.array]) : {};
function vn(t, e) {
  return e ? ee(t, e, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : t;
}
const zo = {
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
}, Ga = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (t) => `@media (min-width:${zo[t]}px)`
};
function re(t, e, n) {
  const r = t.theme || {};
  if (Array.isArray(e)) {
    const a = r.breakpoints || Ga;
    return e.reduce((s, l, c) => (s[a.up(a.keys[c])] = n(e[c]), s), {});
  }
  if (typeof e == "object") {
    const a = r.breakpoints || Ga;
    return Object.keys(e).reduce((s, l) => {
      if (Object.keys(a.values || zo).indexOf(l) !== -1) {
        const c = a.up(l);
        s[c] = n(e[l], l);
      } else {
        const c = l;
        s[c] = e[c];
      }
      return s;
    }, {});
  }
  return n(e);
}
function Ip(t = {}) {
  var e;
  return ((e = t.keys) == null ? void 0 : e.reduce((r, o) => {
    const a = t.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function $p(t, e) {
  return t.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, e);
}
function xr(t, e, n = !0) {
  if (!e || typeof e != "string")
    return null;
  if (t && t.vars && n) {
    const r = `vars.${e}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, t);
    if (r != null)
      return r;
  }
  return e.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, t);
}
function nr(t, e, n, r = n) {
  let o;
  return typeof t == "function" ? o = t(n) : Array.isArray(t) ? o = t[n] || r : o = xr(t, n) || r, e && (o = e(o, r, t)), o;
}
function yt(t) {
  const {
    prop: e,
    cssProperty: n = t.prop,
    themeKey: r,
    transform: o
  } = t, a = (s) => {
    if (s[e] == null)
      return null;
    const l = s[e], c = s.theme, d = xr(c, r) || {};
    return re(s, l, (f) => {
      let w = nr(d, o, f);
      return f === w && typeof f == "string" && (w = nr(d, o, `${e}${f === "default" ? "" : Jt(f)}`, f)), n === !1 ? w : {
        [n]: w
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [e]: de
  } : {}, a.filterProps = [e], a;
}
function Mp(t) {
  const e = {};
  return (n) => (e[n] === void 0 && (e[n] = t(n)), e[n]);
}
const Ap = {
  m: "margin",
  p: "padding"
}, Dp = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ua = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, jp = Mp((t) => {
  if (t.length > 2)
    if (Ua[t])
      t = Ua[t];
    else
      return [t];
  const [e, n] = t.split(""), r = Ap[e], o = Dp[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), Nr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], kr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Bp = [...Nr, ...kr];
function $n(t, e, n, r) {
  var o;
  const a = (o = xr(t, e, !1)) != null ? o : n;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${e}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${e}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${e}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Rs(t) {
  return $n(t, "spacing", 8, "spacing");
}
function Mn(t, e) {
  if (typeof e == "string" || e == null)
    return e;
  const n = Math.abs(e), r = t(n);
  return e >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Vp(t, e) {
  return (n) => t.reduce((r, o) => (r[o] = Mn(e, n), r), {});
}
function zp(t, e, n, r) {
  if (e.indexOf(n) === -1)
    return null;
  const o = jp(n), a = Vp(o, r), s = t[n];
  return re(t, s, a);
}
function Os(t, e) {
  const n = Rs(t.theme);
  return Object.keys(t).map((r) => zp(t, e, r, n)).reduce(vn, {});
}
function gt(t) {
  return Os(t, Nr);
}
gt.propTypes = process.env.NODE_ENV !== "production" ? Nr.reduce((t, e) => (t[e] = de, t), {}) : {};
gt.filterProps = Nr;
function bt(t) {
  return Os(t, kr);
}
bt.propTypes = process.env.NODE_ENV !== "production" ? kr.reduce((t, e) => (t[e] = de, t), {}) : {};
bt.filterProps = kr;
process.env.NODE_ENV !== "production" && Bp.reduce((t, e) => (t[e] = de, t), {});
function Fp(t = 8) {
  if (t.mui)
    return t;
  const e = Rs({
    spacing: t
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const s = e(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function Er(...t) {
  const e = t.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => e[a] ? vn(o, e[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? t.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = t.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function zt(t) {
  return typeof t != "number" ? t : `${t}px solid`;
}
function Xt(t, e) {
  return yt({
    prop: t,
    themeKey: "borders",
    transform: e
  });
}
const Lp = Xt("border", zt), Gp = Xt("borderTop", zt), Up = Xt("borderRight", zt), Xp = Xt("borderBottom", zt), Yp = Xt("borderLeft", zt), Hp = Xt("borderColor"), qp = Xt("borderTopColor"), Wp = Xt("borderRightColor"), Kp = Xt("borderBottomColor"), Jp = Xt("borderLeftColor"), Zp = Xt("outline", zt), Qp = Xt("outlineColor"), Sr = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = $n(t.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Mn(e, r)
    });
    return re(t, t.borderRadius, n);
  }
  return null;
};
Sr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: de
} : {};
Sr.filterProps = ["borderRadius"];
Er(Lp, Gp, Up, Xp, Yp, Hp, qp, Wp, Kp, Jp, Sr, Zp, Qp);
const Tr = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = $n(t.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Mn(e, r)
    });
    return re(t, t.gap, n);
  }
  return null;
};
Tr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: de
} : {};
Tr.filterProps = ["gap"];
const Cr = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = $n(t.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Mn(e, r)
    });
    return re(t, t.columnGap, n);
  }
  return null;
};
Cr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: de
} : {};
Cr.filterProps = ["columnGap"];
const Rr = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = $n(t.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Mn(e, r)
    });
    return re(t, t.rowGap, n);
  }
  return null;
};
Rr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: de
} : {};
Rr.filterProps = ["rowGap"];
const tu = yt({
  prop: "gridColumn"
}), eu = yt({
  prop: "gridRow"
}), nu = yt({
  prop: "gridAutoFlow"
}), ru = yt({
  prop: "gridAutoColumns"
}), ou = yt({
  prop: "gridAutoRows"
}), au = yt({
  prop: "gridTemplateColumns"
}), iu = yt({
  prop: "gridTemplateRows"
}), su = yt({
  prop: "gridTemplateAreas"
}), lu = yt({
  prop: "gridArea"
});
Er(Tr, Cr, Rr, tu, eu, nu, ru, ou, au, iu, su, lu);
function Fe(t, e) {
  return e === "grey" ? e : t;
}
const cu = yt({
  prop: "color",
  themeKey: "palette",
  transform: Fe
}), du = yt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Fe
}), pu = yt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Fe
});
Er(cu, du, pu);
function At(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const uu = yt({
  prop: "width",
  transform: At
}), Fo = (t) => {
  if (t.maxWidth !== void 0 && t.maxWidth !== null) {
    const e = (n) => {
      var r, o;
      const a = ((r = t.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || zo[n];
      return a ? ((o = t.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${t.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: At(n)
      };
    };
    return re(t, t.maxWidth, e);
  }
  return null;
};
Fo.filterProps = ["maxWidth"];
const wu = yt({
  prop: "minWidth",
  transform: At
}), fu = yt({
  prop: "height",
  transform: At
}), mu = yt({
  prop: "maxHeight",
  transform: At
}), hu = yt({
  prop: "minHeight",
  transform: At
});
yt({
  prop: "size",
  cssProperty: "width",
  transform: At
});
yt({
  prop: "size",
  cssProperty: "height",
  transform: At
});
const gu = yt({
  prop: "boxSizing"
});
Er(uu, Fo, wu, fu, mu, hu, gu);
const Lo = {
  // borders
  border: {
    themeKey: "borders",
    transform: zt
  },
  borderTop: {
    themeKey: "borders",
    transform: zt
  },
  borderRight: {
    themeKey: "borders",
    transform: zt
  },
  borderBottom: {
    themeKey: "borders",
    transform: zt
  },
  borderLeft: {
    themeKey: "borders",
    transform: zt
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
    transform: zt
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Sr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Fe
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Fe
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Fe
  },
  // spacing
  p: {
    style: bt
  },
  pt: {
    style: bt
  },
  pr: {
    style: bt
  },
  pb: {
    style: bt
  },
  pl: {
    style: bt
  },
  px: {
    style: bt
  },
  py: {
    style: bt
  },
  padding: {
    style: bt
  },
  paddingTop: {
    style: bt
  },
  paddingRight: {
    style: bt
  },
  paddingBottom: {
    style: bt
  },
  paddingLeft: {
    style: bt
  },
  paddingX: {
    style: bt
  },
  paddingY: {
    style: bt
  },
  paddingInline: {
    style: bt
  },
  paddingInlineStart: {
    style: bt
  },
  paddingInlineEnd: {
    style: bt
  },
  paddingBlock: {
    style: bt
  },
  paddingBlockStart: {
    style: bt
  },
  paddingBlockEnd: {
    style: bt
  },
  m: {
    style: gt
  },
  mt: {
    style: gt
  },
  mr: {
    style: gt
  },
  mb: {
    style: gt
  },
  ml: {
    style: gt
  },
  mx: {
    style: gt
  },
  my: {
    style: gt
  },
  margin: {
    style: gt
  },
  marginTop: {
    style: gt
  },
  marginRight: {
    style: gt
  },
  marginBottom: {
    style: gt
  },
  marginLeft: {
    style: gt
  },
  marginX: {
    style: gt
  },
  marginY: {
    style: gt
  },
  marginInline: {
    style: gt
  },
  marginInlineStart: {
    style: gt
  },
  marginInlineEnd: {
    style: gt
  },
  marginBlock: {
    style: gt
  },
  marginBlockStart: {
    style: gt
  },
  marginBlockEnd: {
    style: gt
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (t) => ({
      "@media print": {
        display: t
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
    style: Tr
  },
  rowGap: {
    style: Rr
  },
  columnGap: {
    style: Cr
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
    transform: At
  },
  maxWidth: {
    style: Fo
  },
  minWidth: {
    transform: At
  },
  height: {
    transform: At
  },
  maxHeight: {
    transform: At
  },
  minHeight: {
    transform: At
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
};
function bu(...t) {
  const e = t.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(e);
  return t.every((r) => n.size === Object.keys(r).length);
}
function vu(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function yu() {
  function t(n, r, o, a) {
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
      themeKey: d,
      transform: p,
      style: f
    } = l;
    if (r == null)
      return null;
    if (d === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const w = xr(o, d) || {};
    return f ? f(s) : re(s, r, (b) => {
      let h = nr(w, p, b);
      return b === h && typeof b == "string" && (h = nr(w, p, `${n}${b === "default" ? "" : Jt(b)}`, b)), c === !1 ? h : {
        [c]: h
      };
    });
  }
  function e(n) {
    var r;
    const {
      sx: o,
      theme: a = {}
    } = n || {};
    if (!o)
      return null;
    const s = (r = a.unstable_sxConfig) != null ? r : Lo;
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const p = Ip(a.breakpoints), f = Object.keys(p);
      let w = p;
      return Object.keys(d).forEach((m) => {
        const b = vu(d[m], a);
        if (b != null)
          if (typeof b == "object")
            if (s[m])
              w = vn(w, t(m, b, a, s));
            else {
              const h = re({
                theme: a
              }, b, (g) => ({
                [m]: g
              }));
              bu(h, b) ? w[m] = e({
                sx: b,
                theme: a
              }) : w = vn(w, h);
            }
          else
            w = vn(w, t(m, b, a, s));
      }), $p(f, w);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return e;
}
const Or = yu();
Or.filterProps = ["sx"];
function xu(t, e) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(t).replace(/(\[[^\]]+\])/, "*:where($1)")]: e
  } : n.palette.mode === t ? e : {};
}
const Nu = ["breakpoints", "palette", "spacing", "shape"];
function Go(t = {}, ...e) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = t, s = Et(t, Nu), l = _p(n), c = Fp(o);
  let d = ee({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: _({
      mode: "light"
    }, r),
    spacing: c,
    shape: _({}, Pp, a)
  }, s);
  return d.applyStyles = xu, d = e.reduce((p, f) => ee(p, f), d), d.unstable_sxConfig = _({}, Lo, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(f) {
    return Or({
      sx: f,
      theme: this
    });
  }, d;
}
function ku(t) {
  return Object.keys(t).length === 0;
}
function _s(t = null) {
  const e = B.useContext(Hl);
  return !e || ku(e) ? t : e;
}
const Eu = Go();
function Ps(t = Eu) {
  return _s(t);
}
const Su = ["ownerState"], Tu = ["variants"], Cu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Ru(t) {
  return Object.keys(t).length === 0;
}
function Ou(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96;
}
function Jn(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const _u = Go(), Xa = (t) => t && t.charAt(0).toLowerCase() + t.slice(1);
function Yn({
  defaultTheme: t,
  theme: e,
  themeId: n
}) {
  return Ru(e) ? t : e[n] || e;
}
function Pu(t) {
  return t ? (e, n) => n[t] : null;
}
function Zn(t, e) {
  let {
    ownerState: n
  } = e, r = Et(e, Su);
  const o = typeof t == "function" ? t(_({
    ownerState: n
  }, r)) : t;
  if (Array.isArray(o))
    return o.flatMap((a) => Zn(a, _({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = Et(o, Tu);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props(_({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((p) => {
        (n == null ? void 0 : n[p]) !== c.props[p] && r[p] !== c.props[p] && (d = !1);
      }), d && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(_({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Iu(t = {}) {
  const {
    themeId: e,
    defaultTheme: n = _u,
    rootShouldForwardProp: r = Jn,
    slotShouldForwardProp: o = Jn
  } = t, a = (s) => Or(_({}, s, {
    theme: Yn(_({}, s, {
      defaultTheme: n,
      themeId: e
    }))
  }));
  return a.__mui_systemSx = !0, (s, l = {}) => {
    ql(s, (v) => v.filter((P) => !(P != null && P.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: p,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: w = Pu(Xa(d))
    } = l, m = Et(l, Cu), b = p !== void 0 ? p : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), h = f || !1;
    let g;
    process.env.NODE_ENV !== "production" && c && (g = `${c}-${Xa(d || "Root")}`);
    let k = Jn;
    d === "Root" || d === "root" ? k = r : d ? k = o : Ou(s) && (k = void 0);
    const T = Yl(s, _({
      shouldForwardProp: k,
      label: g
    }, m)), C = (v) => typeof v == "function" && v.__emotion_real !== v || ve(v) ? (P) => Zn(v, _({}, P, {
      theme: Yn({
        theme: P.theme,
        defaultTheme: n,
        themeId: e
      })
    })) : v, S = (v, ...P) => {
      let F = C(v);
      const R = P ? P.map(C) : [];
      c && w && R.push((D) => {
        const tt = Yn(_({}, D, {
          defaultTheme: n,
          themeId: e
        }));
        if (!tt.components || !tt.components[c] || !tt.components[c].styleOverrides)
          return null;
        const J = tt.components[c].styleOverrides, j = {};
        return Object.entries(J).forEach(([M, A]) => {
          j[M] = Zn(A, _({}, D, {
            theme: tt
          }));
        }), w(D, j);
      }), c && !b && R.push((D) => {
        var tt;
        const J = Yn(_({}, D, {
          defaultTheme: n,
          themeId: e
        })), j = J == null || (tt = J.components) == null || (tt = tt[c]) == null ? void 0 : tt.variants;
        return Zn({
          variants: j
        }, _({}, D, {
          theme: J
        }));
      }), h || R.push(a);
      const I = R.length - P.length;
      if (Array.isArray(v) && I > 0) {
        const D = new Array(I).fill("");
        F = [...v, ...D], F.raw = [...v.raw, ...D];
      }
      const L = T(F, ...R);
      if (process.env.NODE_ENV !== "production") {
        let D;
        c && (D = `${c}${Jt(d || "")}`), D === void 0 && (D = `Styled(${sp(s)})`), L.displayName = D;
      }
      return s.muiName && (L.muiName = s.muiName), L;
    };
    return T.withConfig && (S.withConfig = T.withConfig), S;
  };
}
function $u(t) {
  const {
    theme: e,
    name: n,
    props: r
  } = t;
  return !e || !e.components || !e.components[n] || !e.components[n].defaultProps ? r : Es(e.components[n].defaultProps, r);
}
function Mu({
  props: t,
  name: e,
  defaultTheme: n,
  themeId: r
}) {
  let o = Ps(n);
  return o = o[r] || o, $u({
    theme: o,
    name: e,
    props: t
  });
}
function Uo(t, e = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (t < e || t > n) && console.error(`MUI: The value provided ${t} is out of range [${e}, ${n}].`), Cp(t, e, n);
}
function Au(t) {
  t = t.slice(1);
  const e = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let n = t.match(e);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Te(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return Te(Au(t));
  const e = t.indexOf("("), n = t.substring(0, e);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${t}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Xe(9, t));
  let r = t.substring(e + 1, t.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Xe(10, o));
  } else
    r = r.split(",");
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function _r(t) {
  const {
    type: e,
    colorSpace: n
  } = t;
  let {
    values: r
  } = t;
  return e.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : e.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), e.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${e}(${r})`;
}
function Du(t) {
  t = Te(t);
  const {
    values: e
  } = t, n = e[0], r = e[1] / 100, o = e[2] / 100, a = r * Math.min(o, 1 - o), s = (d, p = (d + n / 30) % 12) => o - a * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return t.type === "hsla" && (l += "a", c.push(e[3])), _r({
    type: l,
    values: c
  });
}
function Ya(t) {
  t = Te(t);
  let e = t.type === "hsl" || t.type === "hsla" ? Te(Du(t)).values : t.values;
  return e = e.map((n) => (t.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function Ha(t, e) {
  const n = Ya(t), r = Ya(e);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Is(t, e) {
  return t = Te(t), e = Uo(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, _r(t);
}
function ju(t, e) {
  if (t = Te(t), e = Uo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] *= 1 - e;
  else if (t.type.indexOf("rgb") !== -1 || t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] *= 1 - e;
  return _r(t);
}
function Bu(t, e) {
  if (t = Te(t), e = Uo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (255 - t.values[n]) * e;
  else if (t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (1 - t.values[n]) * e;
  return _r(t);
}
function Vu(t, e) {
  return _({
    toolbar: {
      minHeight: 56,
      [t.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [t.up("sm")]: {
        minHeight: 64
      }
    }
  }, e);
}
const Tn = {
  black: "#000",
  white: "#fff"
}, zu = {
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
}, Me = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, Ae = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, pn = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, De = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, je = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, Be = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
}, Fu = ["mode", "contrastThreshold", "tonalOffset"], qa = {
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
    paper: Tn.white,
    default: Tn.white
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
}, Zr = {
  text: {
    primary: Tn.white,
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
    active: Tn.white,
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
function Wa(t, e, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(n) ? t[e] = t[n] : e === "light" ? t.light = Bu(t.main, o) : e === "dark" && (t.dark = ju(t.main, a)));
}
function Lu(t = "light") {
  return t === "dark" ? {
    main: De[200],
    light: De[50],
    dark: De[400]
  } : {
    main: De[700],
    light: De[400],
    dark: De[800]
  };
}
function Gu(t = "light") {
  return t === "dark" ? {
    main: Me[200],
    light: Me[50],
    dark: Me[400]
  } : {
    main: Me[500],
    light: Me[300],
    dark: Me[700]
  };
}
function Uu(t = "light") {
  return t === "dark" ? {
    main: Ae[500],
    light: Ae[300],
    dark: Ae[700]
  } : {
    main: Ae[700],
    light: Ae[400],
    dark: Ae[800]
  };
}
function Xu(t = "light") {
  return t === "dark" ? {
    main: je[400],
    light: je[300],
    dark: je[700]
  } : {
    main: je[700],
    light: je[500],
    dark: je[900]
  };
}
function Yu(t = "light") {
  return t === "dark" ? {
    main: Be[400],
    light: Be[300],
    dark: Be[700]
  } : {
    main: Be[800],
    light: Be[500],
    dark: Be[900]
  };
}
function Hu(t = "light") {
  return t === "dark" ? {
    main: pn[400],
    light: pn[300],
    dark: pn[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: pn[500],
    dark: pn[900]
  };
}
function qu(t) {
  const {
    mode: e = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = t, o = Et(t, Fu), a = t.primary || Lu(e), s = t.secondary || Gu(e), l = t.error || Uu(e), c = t.info || Xu(e), d = t.success || Yu(e), p = t.warning || Hu(e);
  function f(h) {
    const g = Ha(h, Zr.text.primary) >= n ? Zr.text.primary : qa.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const k = Ha(h, g);
      k < 3 && console.error([`MUI: The contrast ratio of ${k}:1 for ${g} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return g;
  }
  const w = ({
    color: h,
    name: g,
    mainShade: k = 500,
    lightShade: T = 300,
    darkShade: C = 700
  }) => {
    if (h = _({}, h), !h.main && h[k] && (h.main = h[k]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.` : Xe(11, g ? ` (${g})` : "", k));
    if (typeof h.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Xe(12, g ? ` (${g})` : "", JSON.stringify(h.main)));
    return Wa(h, "light", T, r), Wa(h, "dark", C, r), h.contrastText || (h.contrastText = f(h.main)), h;
  }, m = {
    dark: Zr,
    light: qa
  };
  return process.env.NODE_ENV !== "production" && (m[e] || console.error(`MUI: The palette mode \`${e}\` is not supported.`)), ee(_({
    // A collection of common colors.
    common: _({}, Tn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: e,
    // The colors used to represent primary interface elements for a user.
    primary: w({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: w({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: w({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: w({
      color: p,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: w({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: w({
      color: d,
      name: "success"
    }),
    // The grey colors.
    grey: zu,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: w,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, m[e]), o);
}
const Wu = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Ku(t) {
  return Math.round(t * 1e5) / 1e5;
}
const Ka = {
  textTransform: "uppercase"
}, Ja = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ju(t, e) {
  const n = typeof e == "function" ? e(t) : e, {
    fontFamily: r = Ja,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: d = 16,
    // Apply the CSS properties to all the variants.
    allVariants: p,
    pxToRem: f
  } = n, w = Et(n, Wu);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const m = o / 14, b = f || ((k) => `${k / d * m}rem`), h = (k, T, C, S, v) => _({
    fontFamily: r,
    fontWeight: k,
    fontSize: b(T),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: C
  }, r === Ja ? {
    letterSpacing: `${Ku(S / T)}em`
  } : {}, v, p), g = {
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
    button: h(l, 14, 1.75, 0.4, Ka),
    caption: h(s, 12, 1.66, 0.4),
    overline: h(s, 12, 2.66, 1, Ka),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return ee(_({
    htmlFontSize: d,
    pxToRem: b,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, g), w, {
    clone: !1
    // No need to clone deep
  });
}
const Zu = 0.2, Qu = 0.14, tw = 0.12;
function ht(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${Zu})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${Qu})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${tw})`].join(",");
}
const ew = ["none", ht(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ht(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ht(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ht(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ht(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ht(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ht(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ht(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ht(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ht(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ht(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ht(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ht(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ht(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ht(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ht(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ht(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ht(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ht(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ht(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ht(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ht(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ht(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ht(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], nw = ["duration", "easing", "delay"], rw = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, ow = {
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
function Za(t) {
  return `${Math.round(t)}ms`;
}
function aw(t) {
  if (!t)
    return 0;
  const e = t / 36;
  return Math.round((4 + 15 * e ** 0.25 + e / 5) * 10);
}
function iw(t) {
  const e = _({}, rw, t.easing), n = _({}, ow, t.duration);
  return _({
    getAutoHeightDuration: aw,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = n.standard,
        easing: l = e.easeInOut,
        delay: c = 0
      } = a, d = Et(a, nw);
      if (process.env.NODE_ENV !== "production") {
        const p = (w) => typeof w == "string", f = (w) => !isNaN(parseFloat(w));
        !p(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !p(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), p(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !p(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof s == "string" ? s : Za(s)} ${l} ${typeof c == "string" ? c : Za(c)}`).join(",");
    }
  }, t, {
    easing: e,
    duration: n
  });
}
const sw = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, lw = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function cw(t = {}, ...e) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = t, s = Et(t, lw);
  if (t.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Xe(18));
  const l = qu(r), c = Go(t);
  let d = ee(c, {
    mixins: Vu(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ew.slice(),
    typography: Ju(l, a),
    transitions: iw(o),
    zIndex: _({}, sw)
  });
  if (d = ee(d, s), d = e.reduce((p, f) => ee(p, f), d), process.env.NODE_ENV !== "production") {
    const p = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (w, m) => {
      let b;
      for (b in w) {
        const h = w[b];
        if (p.indexOf(b) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const g = yr("", b);
            console.error([`MUI: The \`${m}\` component increases the CSS specificity of the \`${b}\` internal state.`, "You can not override it like this: ", JSON.stringify(w, null, 2), "", `Instead, you need to use the '&.${g}' syntax:`, JSON.stringify({
              root: {
                [`&.${g}`]: h
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          w[b] = {};
        }
      }
    };
    Object.keys(d.components).forEach((w) => {
      const m = d.components[w].styleOverrides;
      m && w.indexOf("Mui") === 0 && f(m, w);
    });
  }
  return d.unstable_sxConfig = _({}, Lo, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(f) {
    return Or({
      sx: f,
      theme: this
    });
  }, d;
}
const Xo = cw(), Yo = "$$material";
function Ho({
  props: t,
  name: e
}) {
  return Mu({
    props: t,
    name: e,
    defaultTheme: Xo,
    themeId: Yo
  });
}
const dw = (t) => Jn(t) && t !== "classes", An = Iu({
  themeId: Yo,
  defaultTheme: Xo,
  rootShouldForwardProp: dw
});
function pw(t) {
  return yr("MuiSvgIcon", t);
}
Cs("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const uw = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ww = (t) => {
  const {
    color: e,
    fontSize: n,
    classes: r
  } = t, o = {
    root: ["root", e !== "inherit" && `color${Jt(e)}`, `fontSize${Jt(n)}`]
  };
  return Vo(o, pw, r);
}, fw = An("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.root, n.color !== "inherit" && e[`color${Jt(n.color)}`], e[`fontSize${Jt(n.fontSize)}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => {
  var n, r, o, a, s, l, c, d, p, f, w, m, b;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: e.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (n = t.transitions) == null || (r = n.create) == null ? void 0 : r.call(n, "fill", {
      duration: (o = t.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((a = t.typography) == null || (s = a.pxToRem) == null ? void 0 : s.call(a, 20)) || "1.25rem",
      medium: ((l = t.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((d = t.typography) == null || (p = d.pxToRem) == null ? void 0 : p.call(d, 35)) || "2.1875rem"
    }[e.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (f = (w = (t.vars || t).palette) == null || (w = w[e.color]) == null ? void 0 : w.main) != null ? f : {
      action: (m = (t.vars || t).palette) == null || (m = m.action) == null ? void 0 : m.active,
      disabled: (b = (t.vars || t).palette) == null || (b = b.action) == null ? void 0 : b.disabled,
      inherit: void 0
    }[e.color]
  };
}), rr = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const r = Ho({
    props: e,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: s = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: d,
    inheritViewBox: p = !1,
    titleAccess: f,
    viewBox: w = "0 0 24 24"
  } = r, m = Et(r, uw), b = /* @__PURE__ */ B.isValidElement(o) && o.type === "svg", h = _({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: e.fontSize,
    inheritViewBox: p,
    viewBox: w,
    hasSvgAsChild: b
  }), g = {};
  p || (g.viewBox = w);
  const k = ww(h);
  return /* @__PURE__ */ N(fw, _({
    as: l,
    className: ye(k.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, g, m, b && o.props, {
    ownerState: h,
    children: [b ? o.props.children : o, f ? /* @__PURE__ */ i("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (rr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: u.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: u.oneOfType([u.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), u.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: u.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: u.oneOfType([u.oneOf(["inherit", "large", "medium", "small"]), u.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: u.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: u.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: u.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: u.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: u.string
});
rr.muiName = "SvgIcon";
function $s(t, e) {
  function n(r, o) {
    return /* @__PURE__ */ i(rr, _({
      "data-testid": `${e}Icon`,
      ref: o
    }, r, {
      children: t
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${e}Icon`), n.muiName = rr.muiName, /* @__PURE__ */ B.memo(/* @__PURE__ */ B.forwardRef(n));
}
const mw = {
  configure: (t) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Ss.configure(t);
  }
}, hw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Jt,
  createChainedFunction: lp,
  createSvgIcon: $s,
  debounce: cp,
  deprecatedPropType: dp,
  isMuiElement: pp,
  ownerDocument: tr,
  ownerWindow: up,
  requirePropFactory: wp,
  setRef: er,
  unstable_ClassNameGenerator: mw,
  unstable_useEnhancedEffect: Ye,
  unstable_useId: xs,
  unsupportedProp: mp,
  useControlled: Ns,
  useEventCallback: co,
  useForkRef: Se,
  useIsFocusVisible: ks
}, Symbol.toStringTag, { value: "Module" })), gw = /* @__PURE__ */ Gd(hw);
var Qa;
function bw() {
  return Qa || (Qa = 1, function(t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function() {
        return e.createSvgIcon;
      }
    });
    var e = gw;
  }(Ur)), Ur;
}
var ti;
function vw() {
  if (ti) return dn;
  ti = 1;
  var t = Ud();
  Object.defineProperty(dn, "__esModule", {
    value: !0
  }), dn.default = void 0;
  var e = t(/* @__PURE__ */ bw()), n = cl;
  return dn.default = (0, e.default)(/* @__PURE__ */ (0, n.jsx)("path", {
    d: "m10 17 5-5-5-5z"
  }), "ArrowRight"), dn;
}
var yw = /* @__PURE__ */ vw();
const xw = /* @__PURE__ */ fs(yw);
function Nw(t) {
  return typeof t == "string";
}
function hn(t, e, n) {
  return t === void 0 || Nw(t) ? e : _({}, e, {
    ownerState: _({}, e.ownerState, n)
  });
}
const kw = {
  disableDefaultClasses: !1
}, Ew = /* @__PURE__ */ B.createContext(kw);
function Sw(t) {
  const {
    disableDefaultClasses: e
  } = B.useContext(Ew);
  return (n) => e ? "" : t(n);
}
function Tw(t, e = []) {
  if (t === void 0)
    return {};
  const n = {};
  return Object.keys(t).filter((r) => r.match(/^on[A-Z]/) && typeof t[r] == "function" && !e.includes(r)).forEach((r) => {
    n[r] = t[r];
  }), n;
}
function Cw(t, e, n) {
  return typeof t == "function" ? t(e, n) : t;
}
function ei(t) {
  if (t === void 0)
    return {};
  const e = {};
  return Object.keys(t).filter((n) => !(n.match(/^on[A-Z]/) && typeof t[n] == "function")).forEach((n) => {
    e[n] = t[n];
  }), e;
}
function Rw(t) {
  const {
    getSlotProps: e,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = t;
  if (!e) {
    const m = ye(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), b = _({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), h = _({}, n, o, r);
    return m.length > 0 && (h.className = m), Object.keys(b).length > 0 && (h.style = b), {
      props: h,
      internalRef: void 0
    };
  }
  const s = Tw(_({}, o, r)), l = ei(r), c = ei(o), d = e(s), p = ye(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = _({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = _({}, d, n, c, l);
  return p.length > 0 && (w.className = p), Object.keys(f).length > 0 && (w.style = f), {
    props: w,
    internalRef: d.ref
  };
}
const Ow = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function _w(t) {
  var e;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = t, s = Et(t, Ow), l = a ? {} : Cw(r, o), {
    props: c,
    internalRef: d
  } = Rw(_({}, s, {
    externalSlotProps: l
  })), p = Se(d, l == null ? void 0 : l.ref, (e = t.additionalProps) == null ? void 0 : e.ref);
  return hn(n, _({}, c, {
    ref: p
  }), o);
}
const Ms = "base";
function Pw(t) {
  return `${Ms}--${t}`;
}
function Iw(t, e) {
  return `${Ms}-${t}-${e}`;
}
function $w(t, e) {
  const n = Ts[e];
  return n ? Pw(n) : Iw(t, e);
}
function Mw(t) {
  return typeof t == "function" ? t() : t;
}
const or = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = e, [s, l] = B.useState(null), c = Se(/* @__PURE__ */ B.isValidElement(r) ? r.ref : null, n);
  if (Ye(() => {
    a || l(Mw(o) || document.body);
  }, [o, a]), Ye(() => {
    if (s && !a)
      return er(n, s), () => {
        er(n, null);
      };
  }, [n, s, a]), a) {
    if (/* @__PURE__ */ B.isValidElement(r)) {
      const d = {
        ref: c
      };
      return /* @__PURE__ */ B.cloneElement(r, d);
    }
    return /* @__PURE__ */ i(B.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ i(B.Fragment, {
    children: s && /* @__PURE__ */ tc.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (or.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: u.node,
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
  container: u.oneOfType([Sn, u.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool
});
process.env.NODE_ENV !== "production" && (or.propTypes = ep(or.propTypes));
var Ot = "top", Gt = "bottom", Ut = "right", _t = "left", qo = "auto", Dn = [Ot, Gt, Ut, _t], He = "start", Cn = "end", Aw = "clippingParents", As = "viewport", un = "popper", Dw = "reference", ni = /* @__PURE__ */ Dn.reduce(function(t, e) {
  return t.concat([e + "-" + He, e + "-" + Cn]);
}, []), Ds = /* @__PURE__ */ [].concat(Dn, [qo]).reduce(function(t, e) {
  return t.concat([e, e + "-" + He, e + "-" + Cn]);
}, []), jw = "beforeRead", Bw = "read", Vw = "afterRead", zw = "beforeMain", Fw = "main", Lw = "afterMain", Gw = "beforeWrite", Uw = "write", Xw = "afterWrite", Yw = [jw, Bw, Vw, zw, Fw, Lw, Gw, Uw, Xw];
function Zt(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function jt(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Ce(t) {
  var e = jt(t).Element;
  return t instanceof e || t instanceof Element;
}
function Lt(t) {
  var e = jt(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Wo(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = jt(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Hw(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, o = e.attributes[n] || {}, a = e.elements[n];
    !Lt(a) || !Zt(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function qw(t) {
  var e = t.state, n = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var o = e.elements[r], a = e.attributes[r] || {}, s = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : n[r]), l = s.reduce(function(c, d) {
        return c[d] = "", c;
      }, {});
      !Lt(o) || !Zt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Ww = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Hw,
  effect: qw,
  requires: ["computeStyles"]
};
function Wt(t) {
  return t.split("-")[0];
}
var xe = Math.max, ar = Math.min, qe = Math.round;
function uo() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function js() {
  return !/^((?!chrome|android).)*safari/i.test(uo());
}
function We(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var r = t.getBoundingClientRect(), o = 1, a = 1;
  e && Lt(t) && (o = t.offsetWidth > 0 && qe(r.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && qe(r.height) / t.offsetHeight || 1);
  var s = Ce(t) ? jt(t) : window, l = s.visualViewport, c = !js() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, p = (r.top + (c && l ? l.offsetTop : 0)) / a, f = r.width / o, w = r.height / a;
  return {
    width: f,
    height: w,
    top: p,
    right: d + f,
    bottom: p + w,
    left: d,
    x: d,
    y: p
  };
}
function Ko(t) {
  var e = We(t), n = t.offsetWidth, r = t.offsetHeight;
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: n,
    height: r
  };
}
function Bs(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Wo(n)) {
    var r = e;
    do {
      if (r && t.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function oe(t) {
  return jt(t).getComputedStyle(t);
}
function Kw(t) {
  return ["table", "td", "th"].indexOf(Zt(t)) >= 0;
}
function pe(t) {
  return ((Ce(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function Pr(t) {
  return Zt(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Wo(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    pe(t)
  );
}
function ri(t) {
  return !Lt(t) || // https://github.com/popperjs/popper-core/issues/837
  oe(t).position === "fixed" ? null : t.offsetParent;
}
function Jw(t) {
  var e = /firefox/i.test(uo()), n = /Trident/i.test(uo());
  if (n && Lt(t)) {
    var r = oe(t);
    if (r.position === "fixed")
      return null;
  }
  var o = Pr(t);
  for (Wo(o) && (o = o.host); Lt(o) && ["html", "body"].indexOf(Zt(o)) < 0; ) {
    var a = oe(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function jn(t) {
  for (var e = jt(t), n = ri(t); n && Kw(n) && oe(n).position === "static"; )
    n = ri(n);
  return n && (Zt(n) === "html" || Zt(n) === "body" && oe(n).position === "static") ? e : n || Jw(t) || e;
}
function Jo(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function yn(t, e, n) {
  return xe(t, ar(e, n));
}
function Zw(t, e, n) {
  var r = yn(t, e, n);
  return r > n ? n : r;
}
function Vs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function zs(t) {
  return Object.assign({}, Vs(), t);
}
function Fs(t, e) {
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
var Qw = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, zs(typeof e != "number" ? e : Fs(e, Dn));
};
function tf(t) {
  var e, n = t.state, r = t.name, o = t.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Wt(n.placement), c = Jo(l), d = [_t, Ut].indexOf(l) >= 0, p = d ? "height" : "width";
  if (!(!a || !s)) {
    var f = Qw(o.padding, n), w = Ko(a), m = c === "y" ? Ot : _t, b = c === "y" ? Gt : Ut, h = n.rects.reference[p] + n.rects.reference[c] - s[c] - n.rects.popper[p], g = s[c] - n.rects.reference[c], k = jn(a), T = k ? c === "y" ? k.clientHeight || 0 : k.clientWidth || 0 : 0, C = h / 2 - g / 2, S = f[m], v = T - w[p] - f[b], P = T / 2 - w[p] / 2 + C, F = yn(S, P, v), R = c;
    n.modifiersData[r] = (e = {}, e[R] = F, e.centerOffset = F - P, e);
  }
}
function ef(t) {
  var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || Bs(e.elements.popper, o) && (e.elements.arrow = o));
}
const nf = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: tf,
  effect: ef,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ke(t) {
  return t.split("-")[1];
}
var rf = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function of(t, e) {
  var n = t.x, r = t.y, o = e.devicePixelRatio || 1;
  return {
    x: qe(n * o) / o || 0,
    y: qe(r * o) / o || 0
  };
}
function oi(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, a = t.variation, s = t.offsets, l = t.position, c = t.gpuAcceleration, d = t.adaptive, p = t.roundOffsets, f = t.isFixed, w = s.x, m = w === void 0 ? 0 : w, b = s.y, h = b === void 0 ? 0 : b, g = typeof p == "function" ? p({
    x: m,
    y: h
  }) : {
    x: m,
    y: h
  };
  m = g.x, h = g.y;
  var k = s.hasOwnProperty("x"), T = s.hasOwnProperty("y"), C = _t, S = Ot, v = window;
  if (d) {
    var P = jn(n), F = "clientHeight", R = "clientWidth";
    if (P === jt(n) && (P = pe(n), oe(P).position !== "static" && l === "absolute" && (F = "scrollHeight", R = "scrollWidth")), P = P, o === Ot || (o === _t || o === Ut) && a === Cn) {
      S = Gt;
      var I = f && P === v && v.visualViewport ? v.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        P[F]
      );
      h -= I - r.height, h *= c ? 1 : -1;
    }
    if (o === _t || (o === Ot || o === Gt) && a === Cn) {
      C = Ut;
      var L = f && P === v && v.visualViewport ? v.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        P[R]
      );
      m -= L - r.width, m *= c ? 1 : -1;
    }
  }
  var D = Object.assign({
    position: l
  }, d && rf), tt = p === !0 ? of({
    x: m,
    y: h
  }, jt(n)) : {
    x: m,
    y: h
  };
  if (m = tt.x, h = tt.y, c) {
    var J;
    return Object.assign({}, D, (J = {}, J[S] = T ? "0" : "", J[C] = k ? "0" : "", J.transform = (v.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + h + "px)" : "translate3d(" + m + "px, " + h + "px, 0)", J));
  }
  return Object.assign({}, D, (e = {}, e[S] = T ? h + "px" : "", e[C] = k ? m + "px" : "", e.transform = "", e));
}
function af(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: Wt(e.placement),
    variation: Ke(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, oi(Object.assign({}, d, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, oi(Object.assign({}, d, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const sf = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: af,
  data: {}
};
var Hn = {
  passive: !0
};
function lf(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = jt(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && d.forEach(function(p) {
    p.addEventListener("scroll", n.update, Hn);
  }), l && c.addEventListener("resize", n.update, Hn), function() {
    a && d.forEach(function(p) {
      p.removeEventListener("scroll", n.update, Hn);
    }), l && c.removeEventListener("resize", n.update, Hn);
  };
}
const cf = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: lf,
  data: {}
};
var df = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Qn(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return df[e];
  });
}
var pf = {
  start: "end",
  end: "start"
};
function ai(t) {
  return t.replace(/start|end/g, function(e) {
    return pf[e];
  });
}
function Zo(t) {
  var e = jt(t), n = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Qo(t) {
  return We(pe(t)).left + Zo(t).scrollLeft;
}
function uf(t, e) {
  var n = jt(t), r = pe(t), o = n.visualViewport, a = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    var d = js();
    (d || !d && e === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: l + Qo(t),
    y: c
  };
}
function wf(t) {
  var e, n = pe(t), r = Zo(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = xe(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = xe(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Qo(t), c = -r.scrollTop;
  return oe(o || n).direction === "rtl" && (l += xe(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: l,
    y: c
  };
}
function ta(t) {
  var e = oe(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Ls(t) {
  return ["html", "body", "#document"].indexOf(Zt(t)) >= 0 ? t.ownerDocument.body : Lt(t) && ta(t) ? t : Ls(Pr(t));
}
function xn(t, e) {
  var n;
  e === void 0 && (e = []);
  var r = Ls(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), a = jt(r), s = o ? [a].concat(a.visualViewport || [], ta(r) ? r : []) : r, l = e.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(xn(Pr(s)))
  );
}
function wo(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function ff(t, e) {
  var n = We(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ii(t, e, n) {
  return e === As ? wo(uf(t, n)) : Ce(e) ? ff(e, n) : wo(wf(pe(t)));
}
function mf(t) {
  var e = xn(Pr(t)), n = ["absolute", "fixed"].indexOf(oe(t).position) >= 0, r = n && Lt(t) ? jn(t) : t;
  return Ce(r) ? e.filter(function(o) {
    return Ce(o) && Bs(o, r) && Zt(o) !== "body";
  }) : [];
}
function hf(t, e, n, r) {
  var o = e === "clippingParents" ? mf(t) : [].concat(e), a = [].concat(o, [n]), s = a[0], l = a.reduce(function(c, d) {
    var p = ii(t, d, r);
    return c.top = xe(p.top, c.top), c.right = ar(p.right, c.right), c.bottom = ar(p.bottom, c.bottom), c.left = xe(p.left, c.left), c;
  }, ii(t, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Gs(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? Wt(r) : null, a = r ? Ke(r) : null, s = e.x + e.width / 2 - n.width / 2, l = e.y + e.height / 2 - n.height / 2, c;
  switch (o) {
    case Ot:
      c = {
        x: s,
        y: e.y - n.height
      };
      break;
    case Gt:
      c = {
        x: s,
        y: e.y + e.height
      };
      break;
    case Ut:
      c = {
        x: e.x + e.width,
        y: l
      };
      break;
    case _t:
      c = {
        x: e.x - n.width,
        y: l
      };
      break;
    default:
      c = {
        x: e.x,
        y: e.y
      };
  }
  var d = o ? Jo(o) : null;
  if (d != null) {
    var p = d === "y" ? "height" : "width";
    switch (a) {
      case He:
        c[d] = c[d] - (e[p] / 2 - n[p] / 2);
        break;
      case Cn:
        c[d] = c[d] + (e[p] / 2 - n[p] / 2);
        break;
    }
  }
  return c;
}
function Rn(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, a = n.strategy, s = a === void 0 ? t.strategy : a, l = n.boundary, c = l === void 0 ? Aw : l, d = n.rootBoundary, p = d === void 0 ? As : d, f = n.elementContext, w = f === void 0 ? un : f, m = n.altBoundary, b = m === void 0 ? !1 : m, h = n.padding, g = h === void 0 ? 0 : h, k = zs(typeof g != "number" ? g : Fs(g, Dn)), T = w === un ? Dw : un, C = t.rects.popper, S = t.elements[b ? T : w], v = hf(Ce(S) ? S : S.contextElement || pe(t.elements.popper), c, p, s), P = We(t.elements.reference), F = Gs({
    reference: P,
    element: C,
    placement: o
  }), R = wo(Object.assign({}, C, F)), I = w === un ? R : P, L = {
    top: v.top - I.top + k.top,
    bottom: I.bottom - v.bottom + k.bottom,
    left: v.left - I.left + k.left,
    right: I.right - v.right + k.right
  }, D = t.modifiersData.offset;
  if (w === un && D) {
    var tt = D[o];
    Object.keys(L).forEach(function(J) {
      var j = [Ut, Gt].indexOf(J) >= 0 ? 1 : -1, M = [Ot, Gt].indexOf(J) >= 0 ? "y" : "x";
      L[J] += tt[M] * j;
    });
  }
  return L;
}
function gf(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? Ds : c, p = Ke(r), f = p ? l ? ni : ni.filter(function(b) {
    return Ke(b) === p;
  }) : Dn, w = f.filter(function(b) {
    return d.indexOf(b) >= 0;
  });
  w.length === 0 && (w = f);
  var m = w.reduce(function(b, h) {
    return b[h] = Rn(t, {
      placement: h,
      boundary: o,
      rootBoundary: a,
      padding: s
    })[Wt(h)], b;
  }, {});
  return Object.keys(m).sort(function(b, h) {
    return m[b] - m[h];
  });
}
function bf(t) {
  if (Wt(t) === qo)
    return [];
  var e = Qn(t);
  return [ai(t), e, ai(e)];
}
function vf(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, d = n.padding, p = n.boundary, f = n.rootBoundary, w = n.altBoundary, m = n.flipVariations, b = m === void 0 ? !0 : m, h = n.allowedAutoPlacements, g = e.options.placement, k = Wt(g), T = k === g, C = c || (T || !b ? [Qn(g)] : bf(g)), S = [g].concat(C).reduce(function(z, K) {
      return z.concat(Wt(K) === qo ? gf(e, {
        placement: K,
        boundary: p,
        rootBoundary: f,
        padding: d,
        flipVariations: b,
        allowedAutoPlacements: h
      }) : K);
    }, []), v = e.rects.reference, P = e.rects.popper, F = /* @__PURE__ */ new Map(), R = !0, I = S[0], L = 0; L < S.length; L++) {
      var D = S[L], tt = Wt(D), J = Ke(D) === He, j = [Ot, Gt].indexOf(tt) >= 0, M = j ? "width" : "height", A = Rn(e, {
        placement: D,
        boundary: p,
        rootBoundary: f,
        altBoundary: w,
        padding: d
      }), G = j ? J ? Ut : _t : J ? Gt : Ot;
      v[M] > P[M] && (G = Qn(G));
      var H = Qn(G), rt = [];
      if (a && rt.push(A[tt] <= 0), l && rt.push(A[G] <= 0, A[H] <= 0), rt.every(function(z) {
        return z;
      })) {
        I = D, R = !1;
        break;
      }
      F.set(D, rt);
    }
    if (R)
      for (var x = b ? 3 : 1, O = function(K) {
        var q = S.find(function(W) {
          var Y = F.get(W);
          if (Y)
            return Y.slice(0, K).every(function(Z) {
              return Z;
            });
        });
        if (q)
          return I = q, "break";
      }, U = x; U > 0; U--) {
        var X = O(U);
        if (X === "break") break;
      }
    e.placement !== I && (e.modifiersData[r]._skip = !0, e.placement = I, e.reset = !0);
  }
}
const yf = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: vf,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function si(t, e, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - n.y,
    right: t.right - e.width + n.x,
    bottom: t.bottom - e.height + n.y,
    left: t.left - e.width - n.x
  };
}
function li(t) {
  return [Ot, Ut, Gt, _t].some(function(e) {
    return t[e] >= 0;
  });
}
function xf(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, s = Rn(e, {
    elementContext: "reference"
  }), l = Rn(e, {
    altBoundary: !0
  }), c = si(s, r), d = si(l, o, a), p = li(c), f = li(d);
  e.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: p,
    hasPopperEscaped: f
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": f
  });
}
const Nf = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: xf
};
function kf(t, e, n) {
  var r = Wt(t), o = [_t, Ot].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, e, {
    placement: t
  })) : n, s = a[0], l = a[1];
  return s = s || 0, l = (l || 0) * o, [_t, Ut].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Ef(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = Ds.reduce(function(p, f) {
    return p[f] = kf(f, e.rects, a), p;
  }, {}), l = s[e.placement], c = l.x, d = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += d), e.modifiersData[r] = s;
}
const Sf = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ef
};
function Tf(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = Gs({
    reference: e.rects.reference,
    element: e.rects.popper,
    placement: e.placement
  });
}
const Cf = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Tf,
  data: {}
};
function Rf(t) {
  return t === "x" ? "y" : "x";
}
function Of(t) {
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, d = n.rootBoundary, p = n.altBoundary, f = n.padding, w = n.tether, m = w === void 0 ? !0 : w, b = n.tetherOffset, h = b === void 0 ? 0 : b, g = Rn(e, {
    boundary: c,
    rootBoundary: d,
    padding: f,
    altBoundary: p
  }), k = Wt(e.placement), T = Ke(e.placement), C = !T, S = Jo(k), v = Rf(S), P = e.modifiersData.popperOffsets, F = e.rects.reference, R = e.rects.popper, I = typeof h == "function" ? h(Object.assign({}, e.rects, {
    placement: e.placement
  })) : h, L = typeof I == "number" ? {
    mainAxis: I,
    altAxis: I
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, I), D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, tt = {
    x: 0,
    y: 0
  };
  if (P) {
    if (a) {
      var J, j = S === "y" ? Ot : _t, M = S === "y" ? Gt : Ut, A = S === "y" ? "height" : "width", G = P[S], H = G + g[j], rt = G - g[M], x = m ? -R[A] / 2 : 0, O = T === He ? F[A] : R[A], U = T === He ? -R[A] : -F[A], X = e.elements.arrow, z = m && X ? Ko(X) : {
        width: 0,
        height: 0
      }, K = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Vs(), q = K[j], W = K[M], Y = yn(0, F[A], z[A]), Z = C ? F[A] / 2 - x - Y - q - L.mainAxis : O - Y - q - L.mainAxis, Q = C ? -F[A] / 2 + x + Y + W + L.mainAxis : U + Y + W + L.mainAxis, dt = e.elements.arrow && jn(e.elements.arrow), $ = dt ? S === "y" ? dt.clientTop || 0 : dt.clientLeft || 0 : 0, kt = (J = D == null ? void 0 : D[S]) != null ? J : 0, V = G + Z - kt - $, xt = G + Q - kt, Yt = yn(m ? ar(H, V) : H, G, m ? xe(rt, xt) : rt);
      P[S] = Yt, tt[S] = Yt - G;
    }
    if (l) {
      var ue, Tt = S === "x" ? Ot : _t, Bn = S === "x" ? Gt : Ut, Ht = P[v], _e = v === "y" ? "height" : "width", we = Ht + g[Tt], Pe = Ht - g[Bn], Ie = [Ot, _t].indexOf(k) !== -1, $e = (ue = D == null ? void 0 : D[v]) != null ? ue : 0, fe = Ie ? we : Ht - F[_e] - R[_e] - $e + L.altAxis, en = Ie ? Ht + F[_e] + R[_e] - $e - L.altAxis : Pe, Vn = m && Ie ? Zw(fe, Ht, en) : yn(m ? fe : we, Ht, m ? en : Pe);
      P[v] = Vn, tt[v] = Vn - Ht;
    }
    e.modifiersData[r] = tt;
  }
}
const _f = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Of,
  requiresIfExists: ["offset"]
};
function Pf(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function If(t) {
  return t === jt(t) || !Lt(t) ? Zo(t) : Pf(t);
}
function $f(t) {
  var e = t.getBoundingClientRect(), n = qe(e.width) / t.offsetWidth || 1, r = qe(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Mf(t, e, n) {
  n === void 0 && (n = !1);
  var r = Lt(e), o = Lt(e) && $f(e), a = pe(e), s = We(t, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Zt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  ta(a)) && (l = If(e)), Lt(e) ? (c = We(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : a && (c.x = Qo(a))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Af(t) {
  var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  t.forEach(function(a) {
    e.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function(l) {
      if (!n.has(l)) {
        var c = e.get(l);
        c && o(c);
      }
    }), r.push(a);
  }
  return t.forEach(function(a) {
    n.has(a.name) || o(a);
  }), r;
}
function Df(t) {
  var e = Af(t);
  return Yw.reduce(function(n, r) {
    return n.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function jf(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function Bf(t) {
  var e = t.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, {
      options: Object.assign({}, o.options, r.options),
      data: Object.assign({}, o.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(e).map(function(n) {
    return e[n];
  });
}
var ci = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function di() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Vf(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, a = o === void 0 ? ci : o;
  return function(l, c, d) {
    d === void 0 && (d = a);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ci, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], w = !1, m = {
      state: p,
      setOptions: function(k) {
        var T = typeof k == "function" ? k(p.options) : k;
        h(), p.options = Object.assign({}, a, p.options, T), p.scrollParents = {
          reference: Ce(l) ? xn(l) : l.contextElement ? xn(l.contextElement) : [],
          popper: xn(c)
        };
        var C = Df(Bf([].concat(r, p.options.modifiers)));
        return p.orderedModifiers = C.filter(function(S) {
          return S.enabled;
        }), b(), m.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var k = p.elements, T = k.reference, C = k.popper;
          if (di(T, C)) {
            p.rects = {
              reference: Mf(T, jn(C), p.options.strategy === "fixed"),
              popper: Ko(C)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(L) {
              return p.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var S = 0; S < p.orderedModifiers.length; S++) {
              if (p.reset === !0) {
                p.reset = !1, S = -1;
                continue;
              }
              var v = p.orderedModifiers[S], P = v.fn, F = v.options, R = F === void 0 ? {} : F, I = v.name;
              typeof P == "function" && (p = P({
                state: p,
                options: R,
                name: I,
                instance: m
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: jf(function() {
        return new Promise(function(g) {
          m.forceUpdate(), g(p);
        });
      }),
      destroy: function() {
        h(), w = !0;
      }
    };
    if (!di(l, c))
      return m;
    m.setOptions(d).then(function(g) {
      !w && d.onFirstUpdate && d.onFirstUpdate(g);
    });
    function b() {
      p.orderedModifiers.forEach(function(g) {
        var k = g.name, T = g.options, C = T === void 0 ? {} : T, S = g.effect;
        if (typeof S == "function") {
          var v = S({
            state: p,
            name: k,
            instance: m,
            options: C
          }), P = function() {
          };
          f.push(v || P);
        }
      });
    }
    function h() {
      f.forEach(function(g) {
        return g();
      }), f = [];
    }
    return m;
  };
}
var zf = [cf, Cf, sf, Ww, Sf, yf, _f, nf, Nf], Ff = /* @__PURE__ */ Vf({
  defaultModifiers: zf
});
const Lf = "Popper";
function Gf(t) {
  return $w(Lf, t);
}
const Uf = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Xf = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Yf(t, e) {
  if (e === "ltr")
    return t;
  switch (t) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return t;
  }
}
function ir(t) {
  return typeof t == "function" ? t() : t;
}
function Ir(t) {
  return t.nodeType !== void 0;
}
function Hf(t) {
  return !Ir(t);
}
const qf = () => Vo({
  root: ["root"]
}, Sw(Gf)), Wf = {}, Kf = /* @__PURE__ */ B.forwardRef(function(e, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: d,
    placement: p,
    popperOptions: f,
    popperRef: w,
    slotProps: m = {},
    slots: b = {},
    TransitionProps: h
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = e, g = Et(e, Uf), k = B.useRef(null), T = Se(k, n), C = B.useRef(null), S = Se(C, w), v = B.useRef(S);
  Ye(() => {
    v.current = S;
  }, [S]), B.useImperativeHandle(w, () => C.current, []);
  const P = Yf(p, s), [F, R] = B.useState(P), [I, L] = B.useState(ir(o));
  B.useEffect(() => {
    C.current && C.current.forceUpdate();
  }), B.useEffect(() => {
    o && L(ir(o));
  }, [o]), Ye(() => {
    if (!I || !d)
      return;
    const M = (H) => {
      R(H.placement);
    };
    if (process.env.NODE_ENV !== "production" && I && Ir(I) && I.nodeType === 1) {
      const H = I.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && H.top === 0 && H.left === 0 && H.right === 0 && H.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let A = [{
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
        state: H
      }) => {
        M(H);
      }
    }];
    c != null && (A = A.concat(c)), f && f.modifiers != null && (A = A.concat(f.modifiers));
    const G = Ff(I, k.current, _({
      placement: P
    }, f, {
      modifiers: A
    }));
    return v.current(G), () => {
      G.destroy(), v.current(null);
    };
  }, [I, l, c, d, f, P]);
  const D = {
    placement: F
  };
  h !== null && (D.TransitionProps = h);
  const tt = qf(), J = (r = b.root) != null ? r : "div", j = _w({
    elementType: J,
    externalSlotProps: m.root,
    externalForwardedProps: g,
    additionalProps: {
      role: "tooltip",
      ref: T
    },
    ownerState: e,
    className: tt.root
  });
  return /* @__PURE__ */ i(J, _({}, j, {
    children: typeof a == "function" ? a(D) : a
  }));
}), Us = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: d,
    open: p,
    placement: f = "bottom",
    popperOptions: w = Wf,
    popperRef: m,
    style: b,
    transition: h = !1,
    slotProps: g = {},
    slots: k = {}
  } = e, T = Et(e, Xf), [C, S] = B.useState(!0), v = () => {
    S(!1);
  }, P = () => {
    S(!0);
  };
  if (!c && !p && (!h || C))
    return null;
  let F;
  if (a)
    F = a;
  else if (r) {
    const L = ir(r);
    F = L && Ir(L) ? tr(L).body : tr(null).body;
  }
  const R = !p && c && (!h || C) ? "none" : void 0, I = h ? {
    in: p,
    onEnter: v,
    onExited: P
  } : void 0;
  return /* @__PURE__ */ i(or, {
    disablePortal: l,
    container: F,
    children: /* @__PURE__ */ i(Kf, _({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: d,
      ref: n,
      open: h ? !C : p,
      placement: f,
      popperOptions: w,
      popperRef: m,
      slotProps: g,
      slots: k
    }, T, {
      style: _({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: R
      }, b),
      TransitionProps: I,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Us.propTypes = {
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
  anchorEl: Do(u.oneOfType([Sn, u.object, u.func]), (t) => {
    if (t.open) {
      const e = ir(t.anchorEl);
      if (e && Ir(e) && e.nodeType === 1) {
        const n = e.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!e || typeof e.getBoundingClientRect != "function" || Hf(e) && e.contextElement != null && e.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: u.oneOfType([u.node, u.func]),
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
  container: u.oneOfType([Sn, u.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: u.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: u.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: u.arrayOf(u.shape({
    data: u.object,
    effect: u.func,
    enabled: u.bool,
    fn: u.func,
    name: u.any,
    options: u.object,
    phase: u.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: u.arrayOf(u.string),
    requiresIfExists: u.arrayOf(u.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: u.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: u.shape({
    modifiers: u.array,
    onFirstUpdate: u.func,
    placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: u.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: ys,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: u.shape({
    root: u.oneOfType([u.func, u.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: u.shape({
    root: u.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: u.bool
});
function Xs() {
  const t = Ps(Xo);
  return process.env.NODE_ENV !== "production" && B.useDebugValue(t), t[Yo] || t;
}
function fo(t, e) {
  return fo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, r) {
    return n.__proto__ = r, n;
  }, fo(t, e);
}
function Jf(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, fo(t, e);
}
const pi = {
  disabled: !1
};
var Zf = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.shape({
  enter: u.number,
  exit: u.number,
  appear: u.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && u.oneOfType([u.string, u.shape({
  enter: u.string,
  exit: u.string,
  active: u.string
}), u.shape({
  enter: u.string,
  enterDone: u.string,
  enterActive: u.string,
  exit: u.string,
  exitDone: u.string,
  exitActive: u.string
})]);
const Ys = E.createContext(null);
var Qf = function(e) {
  return e.scrollTop;
}, gn = "unmounted", ge = "exited", be = "entering", ze = "entered", mo = "exiting", ie = /* @__PURE__ */ function(t) {
  Jf(e, t);
  function e(r, o) {
    var a;
    a = t.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = ge, a.appearStatus = be) : c = ze : r.unmountOnExit || r.mountOnEnter ? c = gn : c = ge, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  e.getDerivedStateFromProps = function(o, a) {
    var s = o.in;
    return s && a.status === gn ? {
      status: ge
    } : null;
  };
  var n = e.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== be && s !== ze && (a = be) : (s === be || s === ze) && (a = mo);
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
      if (this.cancelNextCallback(), a === be) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Ln.findDOMNode(this);
          s && Qf(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === ge && this.setState({
      status: gn
    });
  }, n.performEnter = function(o) {
    var a = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Ln.findDOMNode(this), l], d = c[0], p = c[1], f = this.getTimeouts(), w = l ? f.appear : f.enter;
    if (!o && !s || pi.disabled) {
      this.safeSetState({
        status: ze
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, p), this.safeSetState({
      status: be
    }, function() {
      a.props.onEntering(d, p), a.onTransitionEnd(w, function() {
        a.safeSetState({
          status: ze
        }, function() {
          a.props.onEntered(d, p);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Ln.findDOMNode(this);
    if (!a || pi.disabled) {
      this.safeSetState({
        status: ge
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: mo
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: ge
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Ln.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!s || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], d = c[0], p = c[1];
      this.props.addEndListener(d, p);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === gn)
      return null;
    var a = this.props, s = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = Et(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ E.createElement(Ys.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : E.cloneElement(E.Children.only(s), l))
    );
  }, e;
}(E.Component);
ie.contextType = Ys;
ie.propTypes = process.env.NODE_ENV !== "production" ? {
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
  nodeRef: u.shape({
    current: typeof Element > "u" ? u.any : function(t, e, n, r, o, a) {
      var s = t[e];
      return u.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(t, e, n, r, o, a);
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
  children: u.oneOfType([u.func.isRequired, u.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: u.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: u.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: u.bool,
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
  appear: u.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: u.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: u.bool,
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
  timeout: function(e) {
    var n = Zf;
    e.addEndListener || (n = n.isRequired);
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
      o[a - 1] = arguments[a];
    return n.apply(void 0, [e].concat(o));
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
  addEndListener: u.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: u.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: u.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: u.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: u.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: u.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: u.func
} : {};
function Ve() {
}
ie.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Ve,
  onEntering: Ve,
  onEntered: Ve,
  onExit: Ve,
  onExiting: Ve,
  onExited: Ve
};
ie.UNMOUNTED = gn;
ie.EXITED = ge;
ie.ENTERING = be;
ie.ENTERED = ze;
ie.EXITING = mo;
const tm = (t) => t.scrollTop;
function ui(t, e) {
  var n, r;
  const {
    timeout: o,
    easing: a,
    style: s = {}
  } = t;
  return {
    duration: (n = s.transitionDuration) != null ? n : typeof o == "number" ? o : o[e.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == "object" ? a[e.mode] : a,
    delay: s.transitionDelay
  };
}
const em = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function ho(t) {
  return `scale(${t}, ${t ** 2})`;
}
const nm = {
  entering: {
    opacity: 1,
    transform: ho(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Qr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), sr = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: d,
    onEntering: p,
    onExit: f,
    onExited: w,
    onExiting: m,
    style: b,
    timeout: h = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: g = ie
  } = e, k = Et(e, em), T = mn(), C = B.useRef(), S = Xs(), v = B.useRef(null), P = Se(v, a.ref, n), F = (M) => (A) => {
    if (M) {
      const G = v.current;
      A === void 0 ? M(G) : M(G, A);
    }
  }, R = F(p), I = F((M, A) => {
    tm(M);
    const {
      duration: G,
      delay: H,
      easing: rt
    } = ui({
      style: b,
      timeout: h,
      easing: s
    }, {
      mode: "enter"
    });
    let x;
    h === "auto" ? (x = S.transitions.getAutoHeightDuration(M.clientHeight), C.current = x) : x = G, M.style.transition = [S.transitions.create("opacity", {
      duration: x,
      delay: H
    }), S.transitions.create("transform", {
      duration: Qr ? x : x * 0.666,
      delay: H,
      easing: rt
    })].join(","), c && c(M, A);
  }), L = F(d), D = F(m), tt = F((M) => {
    const {
      duration: A,
      delay: G,
      easing: H
    } = ui({
      style: b,
      timeout: h,
      easing: s
    }, {
      mode: "exit"
    });
    let rt;
    h === "auto" ? (rt = S.transitions.getAutoHeightDuration(M.clientHeight), C.current = rt) : rt = A, M.style.transition = [S.transitions.create("opacity", {
      duration: rt,
      delay: G
    }), S.transitions.create("transform", {
      duration: Qr ? rt : rt * 0.666,
      delay: Qr ? G : G || rt * 0.333,
      easing: H
    })].join(","), M.style.opacity = 0, M.style.transform = ho(0.75), f && f(M);
  }), J = F(w);
  return /* @__PURE__ */ i(g, _({
    appear: o,
    in: l,
    nodeRef: v,
    onEnter: I,
    onEntered: L,
    onEntering: R,
    onExit: tt,
    onExited: J,
    onExiting: D,
    addEndListener: (M) => {
      h === "auto" && T.start(C.current || 0, M), r && r(v.current, M);
    },
    timeout: h === "auto" ? null : h
  }, k, {
    children: (M, A) => /* @__PURE__ */ B.cloneElement(a, _({
      style: _({
        opacity: 0,
        transform: ho(0.75),
        visibility: M === "exited" && !l ? "hidden" : void 0
      }, nm[M], b, a.props.style),
      ref: P
    }, A))
  }));
});
process.env.NODE_ENV !== "production" && (sr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: u.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: u.bool,
  /**
   * A single child content element.
   */
  children: Bo.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: u.oneOfType([u.shape({
    enter: u.string,
    exit: u.string
  }), u.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: u.bool,
  /**
   * @ignore
   */
  onEnter: u.func,
  /**
   * @ignore
   */
  onEntered: u.func,
  /**
   * @ignore
   */
  onEntering: u.func,
  /**
   * @ignore
   */
  onExit: u.func,
  /**
   * @ignore
   */
  onExited: u.func,
  /**
   * @ignore
   */
  onExiting: u.func,
  /**
   * @ignore
   */
  style: u.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: u.oneOfType([u.oneOf(["auto"]), u.number, u.shape({
    appear: u.number,
    enter: u.number,
    exit: u.number
  })])
});
sr.muiSupportAuto = !0;
const rm = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], om = An(Us, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (t, e) => e.root
})({}), ea = /* @__PURE__ */ B.forwardRef(function(e, n) {
  var r;
  const o = _s(), a = Ho({
    props: e,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: d,
    container: p,
    disablePortal: f,
    keepMounted: w,
    modifiers: m,
    open: b,
    placement: h,
    popperOptions: g,
    popperRef: k,
    transition: T,
    slots: C,
    slotProps: S
  } = a, v = Et(a, rm), P = (r = C == null ? void 0 : C.root) != null ? r : c == null ? void 0 : c.Root, F = _({
    anchorEl: s,
    container: p,
    disablePortal: f,
    keepMounted: w,
    modifiers: m,
    open: b,
    placement: h,
    popperOptions: g,
    popperRef: k,
    transition: T
  }, v);
  return /* @__PURE__ */ i(om, _({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: P
    },
    slotProps: S ?? d
  }, F, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (ea.propTypes = {
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
  anchorEl: u.oneOfType([Sn, u.object, u.func]),
  /**
   * Popper render function or node.
   */
  children: u.oneOfType([u.node, u.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: u.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: u.shape({
    Root: u.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: u.shape({
    root: u.oneOfType([u.func, u.object])
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
  container: u.oneOfType([Sn, u.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: u.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: u.arrayOf(u.shape({
    data: u.object,
    effect: u.func,
    enabled: u.bool,
    fn: u.func,
    name: u.any,
    options: u.object,
    phase: u.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: u.arrayOf(u.string),
    requiresIfExists: u.arrayOf(u.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: u.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: u.shape({
    modifiers: u.array,
    onFirstUpdate: u.func,
    placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: u.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: ys,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: u.shape({
    root: u.oneOfType([u.func, u.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: u.shape({
    root: u.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: u.bool
});
function am(t) {
  return yr("MuiTooltip", t);
}
const le = Cs("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), im = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function sm(t) {
  return Math.round(t * 1e5) / 1e5;
}
const lm = (t) => {
  const {
    classes: e,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = t, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Jt(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Vo(s, am, e);
}, cm = An(ea, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.popper, !n.disableInteractive && e.popperInteractive, n.arrow && e.popperArrow, !n.open && e.popperClose];
  }
})(({
  theme: t,
  ownerState: e,
  open: n
}) => _({
  zIndex: (t.vars || t).zIndex.tooltip,
  pointerEvents: "none"
}, !e.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, e.arrow && {
  [`&[data-popper-placement*="bottom"] .${le.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${le.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${le.arrow}`]: _({}, e.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${le.arrow}`]: _({}, e.isRtl ? {
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
})), dm = An("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.tooltip, n.touch && e.touch, n.arrow && e.tooltipArrow, e[`tooltipPlacement${Jt(n.placement.split("-")[0])}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => _({
  backgroundColor: t.vars ? t.vars.palette.Tooltip.bg : Is(t.palette.grey[700], 0.92),
  borderRadius: (t.vars || t).shape.borderRadius,
  color: (t.vars || t).palette.common.white,
  fontFamily: t.typography.fontFamily,
  padding: "4px 8px",
  fontSize: t.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: t.typography.fontWeightMedium
}, e.arrow && {
  position: "relative",
  margin: 0
}, e.touch && {
  padding: "8px 16px",
  fontSize: t.typography.pxToRem(14),
  lineHeight: `${sm(16 / 14)}em`,
  fontWeight: t.typography.fontWeightRegular
}, {
  [`.${le.popper}[data-popper-placement*="left"] &`]: _({
    transformOrigin: "right center"
  }, e.isRtl ? _({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  }) : _({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  })),
  [`.${le.popper}[data-popper-placement*="right"] &`]: _({
    transformOrigin: "left center"
  }, e.isRtl ? _({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  }) : _({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  })),
  [`.${le.popper}[data-popper-placement*="top"] &`]: _({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, e.touch && {
    marginBottom: "24px"
  }),
  [`.${le.popper}[data-popper-placement*="bottom"] &`]: _({
    transformOrigin: "center top",
    marginTop: "14px"
  }, e.touch && {
    marginTop: "24px"
  })
})), pm = An("span", {
  name: "MuiTooltip",
  slot: "Arrow",
  overridesResolver: (t, e) => e.arrow
})(({
  theme: t
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: t.vars ? t.vars.palette.Tooltip.bg : Is(t.palette.grey[700], 0.9),
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
let qn = !1;
const wi = new In();
let wn = {
  x: 0,
  y: 0
};
function Wn(t, e) {
  return (n) => {
    e && e(n), t(n);
  };
}
const Hs = /* @__PURE__ */ B.forwardRef(function(e, n) {
  var r, o, a, s, l, c, d, p, f, w, m, b, h, g, k, T, C, S, v;
  const P = Ho({
    props: e,
    name: "MuiTooltip"
  }), {
    arrow: F = !1,
    children: R,
    components: I = {},
    componentsProps: L = {},
    describeChild: D = !1,
    disableFocusListener: tt = !1,
    disableHoverListener: J = !1,
    disableInteractive: j = !1,
    disableTouchListener: M = !1,
    enterDelay: A = 100,
    enterNextDelay: G = 0,
    enterTouchDelay: H = 700,
    followCursor: rt = !1,
    id: x,
    leaveDelay: O = 0,
    leaveTouchDelay: U = 1500,
    onClose: X,
    onOpen: z,
    open: K,
    placement: q = "bottom",
    PopperComponent: W,
    PopperProps: Y = {},
    slotProps: Z = {},
    slots: Q = {},
    title: dt,
    TransitionComponent: $ = sr,
    TransitionProps: kt
  } = P, V = Et(P, im), xt = /* @__PURE__ */ B.isValidElement(R) ? R : /* @__PURE__ */ i("span", {
    children: R
  }), Yt = Xs(), ue = Yt.direction === "rtl", [Tt, Bn] = B.useState(), [Ht, _e] = B.useState(null), we = B.useRef(!1), Pe = j || rt, Ie = mn(), $e = mn(), fe = mn(), en = mn(), [Vn, na] = Ns({
    controlled: K,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Qt = Vn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: et
    } = B.useRef(K !== void 0);
    B.useEffect(() => {
      Tt && Tt.disabled && !et && dt !== "" && Tt.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [dt, Tt, et]);
  }
  const $r = xs(x), nn = B.useRef(), zn = co(() => {
    nn.current !== void 0 && (document.body.style.WebkitUserSelect = nn.current, nn.current = void 0), en.clear();
  });
  B.useEffect(() => zn, [zn]);
  const ra = (et) => {
    wi.clear(), qn = !0, na(!0), z && !Qt && z(et);
  }, Fn = co(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (et) => {
      wi.start(800 + O, () => {
        qn = !1;
      }), na(!1), X && Qt && X(et), Ie.start(Yt.transitions.duration.shortest, () => {
        we.current = !1;
      });
    }
  ), Mr = (et) => {
    we.current && et.type !== "touchstart" || (Tt && Tt.removeAttribute("title"), $e.clear(), fe.clear(), A || qn && G ? $e.start(qn ? G : A, () => {
      ra(et);
    }) : ra(et));
  }, oa = (et) => {
    $e.clear(), fe.start(O, () => {
      Fn(et);
    });
  }, {
    isFocusVisibleRef: aa,
    onBlur: Js,
    onFocus: Zs,
    ref: Qs
  } = ks(), [, ia] = B.useState(!1), sa = (et) => {
    Js(et), aa.current === !1 && (ia(!1), oa(et));
  }, la = (et) => {
    Tt || Bn(et.currentTarget), Zs(et), aa.current === !0 && (ia(!0), Mr(et));
  }, ca = (et) => {
    we.current = !0;
    const $t = xt.props;
    $t.onTouchStart && $t.onTouchStart(et);
  }, da = Mr, pa = oa, tl = (et) => {
    ca(et), fe.clear(), Ie.clear(), zn(), nn.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", en.start(H, () => {
      document.body.style.WebkitUserSelect = nn.current, Mr(et);
    });
  }, el = (et) => {
    xt.props.onTouchEnd && xt.props.onTouchEnd(et), zn(), fe.start(U, () => {
      Fn(et);
    });
  };
  B.useEffect(() => {
    if (!Qt)
      return;
    function et($t) {
      ($t.key === "Escape" || $t.key === "Esc") && Fn($t);
    }
    return document.addEventListener("keydown", et), () => {
      document.removeEventListener("keydown", et);
    };
  }, [Fn, Qt]);
  const nl = Se(xt.ref, Qs, Bn, n);
  !dt && dt !== 0 && (Qt = !1);
  const Ar = B.useRef(), rl = (et) => {
    const $t = xt.props;
    $t.onMouseMove && $t.onMouseMove(et), wn = {
      x: et.clientX,
      y: et.clientY
    }, Ar.current && Ar.current.update();
  }, rn = {}, Dr = typeof dt == "string";
  D ? (rn.title = !Qt && Dr && !J ? dt : null, rn["aria-describedby"] = Qt ? $r : null) : (rn["aria-label"] = Dr ? dt : null, rn["aria-labelledby"] = Qt && !Dr ? $r : null);
  const Bt = _({}, rn, V, xt.props, {
    className: ye(V.className, xt.props.className),
    onTouchStart: ca,
    ref: nl
  }, rt ? {
    onMouseMove: rl
  } : {});
  process.env.NODE_ENV !== "production" && (Bt["data-mui-internal-clone-element"] = !0, B.useEffect(() => {
    Tt && !Tt.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Tt]));
  const on = {};
  M || (Bt.onTouchStart = tl, Bt.onTouchEnd = el), J || (Bt.onMouseOver = Wn(da, Bt.onMouseOver), Bt.onMouseLeave = Wn(pa, Bt.onMouseLeave), Pe || (on.onMouseOver = da, on.onMouseLeave = pa)), tt || (Bt.onFocus = Wn(la, Bt.onFocus), Bt.onBlur = Wn(sa, Bt.onBlur), Pe || (on.onFocus = la, on.onBlur = sa)), process.env.NODE_ENV !== "production" && xt.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${xt.props.title}\` or the Tooltip component.`].join(`
`));
  const ol = B.useMemo(() => {
    var et;
    let $t = [{
      name: "arrow",
      enabled: !!Ht,
      options: {
        element: Ht,
        padding: 4
      }
    }];
    return (et = Y.popperOptions) != null && et.modifiers && ($t = $t.concat(Y.popperOptions.modifiers)), _({}, Y.popperOptions, {
      modifiers: $t
    });
  }, [Ht, Y]), an = _({}, P, {
    isRtl: ue,
    arrow: F,
    disableInteractive: Pe,
    placement: q,
    PopperComponentProp: W,
    touch: we.current
  }), jr = lm(an), ua = (r = (o = Q.popper) != null ? o : I.Popper) != null ? r : cm, wa = (a = (s = (l = Q.transition) != null ? l : I.Transition) != null ? s : $) != null ? a : sr, fa = (c = (d = Q.tooltip) != null ? d : I.Tooltip) != null ? c : dm, ma = (p = (f = Q.arrow) != null ? f : I.Arrow) != null ? p : pm, al = hn(ua, _({}, Y, (w = Z.popper) != null ? w : L.popper, {
    className: ye(jr.popper, Y == null ? void 0 : Y.className, (m = (b = Z.popper) != null ? b : L.popper) == null ? void 0 : m.className)
  }), an), il = hn(wa, _({}, kt, (h = Z.transition) != null ? h : L.transition), an), sl = hn(fa, _({}, (g = Z.tooltip) != null ? g : L.tooltip, {
    className: ye(jr.tooltip, (k = (T = Z.tooltip) != null ? T : L.tooltip) == null ? void 0 : k.className)
  }), an), ll = hn(ma, _({}, (C = Z.arrow) != null ? C : L.arrow, {
    className: ye(jr.arrow, (S = (v = Z.arrow) != null ? v : L.arrow) == null ? void 0 : S.className)
  }), an);
  return /* @__PURE__ */ N(B.Fragment, {
    children: [/* @__PURE__ */ B.cloneElement(xt, Bt), /* @__PURE__ */ i(ua, _({
      as: W ?? ea,
      placement: q,
      anchorEl: rt ? {
        getBoundingClientRect: () => ({
          top: wn.y,
          left: wn.x,
          right: wn.x,
          bottom: wn.y,
          width: 0,
          height: 0
        })
      } : Tt,
      popperRef: Ar,
      open: Tt ? Qt : !1,
      id: $r,
      transition: !0
    }, on, al, {
      popperOptions: ol,
      children: ({
        TransitionProps: et
      }) => /* @__PURE__ */ i(wa, _({
        timeout: Yt.transitions.duration.shorter
      }, et, il, {
        children: /* @__PURE__ */ N(fa, _({}, sl, {
          children: [dt, F ? /* @__PURE__ */ i(ma, _({}, ll, {
            ref: _e
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Hs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: u.bool,
  /**
   * Tooltip reference element.
   */
  children: Bo.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: u.shape({
    Arrow: u.elementType,
    Popper: u.elementType,
    Tooltip: u.elementType,
    Transition: u.elementType
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
  componentsProps: u.shape({
    arrow: u.object,
    popper: u.object,
    tooltip: u.object,
    transition: u.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: u.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: u.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: u.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: u.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: u.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: u.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: u.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: u.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: u.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: u.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: u.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: u.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: u.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: u.func,
  /**
   * If `true`, the component is shown.
   */
  open: u.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: u.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: u.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: u.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: u.shape({
    arrow: u.object,
    popper: u.object,
    tooltip: u.object,
    transition: u.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: u.shape({
    arrow: u.elementType,
    popper: u.elementType,
    tooltip: u.elementType,
    transition: u.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: u.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: u.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: u.object
});
function fi(t, e, n) {
  return t ? /* @__PURE__ */ i(ki, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ i("img", { src: t, alt: `${n ? "Leading" : "Trailing"} icon for ${e}` }) }) : void 0;
}
function qs(t) {
  const {
    onClick: e,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: d = !1,
    isDense: p = !0,
    isSubMenuParent: f = !1,
    hasDisabledGutters: w = !1,
    hasDivider: m = !1,
    focusVisibleClassName: b,
    id: h,
    children: g
  } = t, k = /* @__PURE__ */ i(
    Wl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: d,
      dense: p,
      disableGutters: w,
      divider: m,
      focusVisibleClassName: b,
      onClick: e,
      id: h,
      children: n ? /* @__PURE__ */ N(ae, { children: [
        fi(a, n, !0),
        /* @__PURE__ */ i(Kl, { primary: n, inset: !a && o }),
        f ? /* @__PURE__ */ i(ki, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ i(xw, {}) }) : fi(s, n, !1)
      ] }) : g
    }
  );
  return r ? /* @__PURE__ */ i(Hs, { title: r, placement: "right", children: /* @__PURE__ */ i("div", { children: k }) }) : k;
}
function Ws(t) {
  return Object.entries(t.groups).map(([n, r]) => ({ id: n, group: r }));
}
function um(t) {
  const [e, n] = ut(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = t, s = (d) => {
    n(d.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let d = Ws(a).filter((p) => "menuItem" in p.group);
    if (!(r != null && r.id)) throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (p) => "menuItem" in p.group && p.group.menuItem === r.id
    ), /* @__PURE__ */ i(Ks, { ...t, includedGroups: d });
  };
  return /* @__PURE__ */ N(ae, { children: [
    /* @__PURE__ */ i(qs, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ i(
      Jl,
      {
        anchorEl: e,
        open: !!e,
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
const wm = (t, e) => e.filter((o) => o.group === t).sort((o, a) => (o.order || 0) - (a.order || 0));
function Ks(t) {
  const { menuDefinition: e, onClick: n, commandHandler: r, includedGroups: o } = t, { items: a, allowForLeadingIcons: s } = Rt(() => {
    const p = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ws(e).filter((b) => !("menuItem" in b.group))
    ), f = Object.values(p).sort(
      (b, h) => (b.group.order || 0) - (h.group.order || 0)
    ), w = [];
    f.forEach((b) => {
      wm(b.id, e.items).forEach(
        (h) => w.push({ item: h, isLastItemInGroup: !1 })
      ), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !0);
    }), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !1);
    const m = w.some(
      (b) => "iconPathBefore" in b.item && b.item.iconPathBefore
    );
    return { items: w, allowForLeadingIcons: m };
  }, [o, e]), l = ({ item: p, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: p.label,
    tooltip: p.tooltip,
    iconPathBefore: "iconPathBefore" in p ? p.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in p ? p.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = a;
  if (!c) return /* @__PURE__ */ i("div", {});
  const d = c.item.group;
  return /* @__PURE__ */ i("div", { role: "menu", "aria-label": d, children: a.map((p, f) => {
    const { item: w } = p, m = l(p);
    if ("command" in w) {
      const b = w.group + f;
      return /* @__PURE__ */ i(
        qs,
        {
          onClick: (h) => {
            n == null || n(h), r(w);
          },
          ...m
        },
        b
      );
    }
    return /* @__PURE__ */ i(
      um,
      {
        parentMenuItem: w,
        parentItemProps: m,
        ...t
      },
      d + w.id
    );
  }) }, d);
}
function fm(t) {
  const { menuDefinition: e, columnId: n } = t;
  let a = Object.entries(e.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in e && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  e.columns[n] && (a = a.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ i(Ks, { ...t, includedGroups: a });
}
function mm({
  commandHandler: t,
  menuDefinition: e,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ N(
    Ei,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ i("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ i(Zl, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ i(
          fm,
          {
            commandHandler: t,
            menuDefinition: e,
            columnId: n,
            onClick: o
          }
        ) })
      ]
    }
  );
}
function hm({
  commandHandler: t,
  className: e,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = Rt(() => {
    const s = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible") return;
      const c = l, d = o[c];
      typeof d == "object" && typeof d.order == "number" && !Number.isNaN(d.order) ? s.set(d.order, { id: c, metadata: d }) : console.warn(
        `Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ i(
    Ei,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${e ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((s, l) => /* @__PURE__ */ i(
        mm,
        {
          commandHandler: t,
          menuDefinition: n,
          ...s,
          className: e
        },
        l
      ))
    }
  );
}
function gm(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const go = (t, e, n = {}) => {
  const r = Ft(e);
  r.current = e;
  const o = Ft(n);
  o.current = gm(o.current);
  const [a, s] = ut(() => r.current), [l, c] = ut(!0);
  return ne(() => {
    let d = !0;
    return c(!!t), (async () => {
      if (t) {
        const p = await t();
        d && (s(() => p), c(!1));
      }
    })(), () => {
      d = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [t]), [a, l];
}, bm = $s(/* @__PURE__ */ i("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Ph({
  menuProvider: t,
  normalMenu: e,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, d] = ut(!1), [p, f] = ut(!1), w = St(() => {
    c && d(!1), f(!1);
  }, [c]), m = St((S) => {
    S.stopPropagation(), d((v) => {
      const P = !v;
      return P && S.shiftKey ? f(!0) : P || f(!1), P;
    });
  }, []), b = St(
    (S) => (w(), r(S)),
    [r, w]
  ), [h, g] = ut({ top: 1, left: 1 });
  ne(() => {
    if (c) {
      const S = o == null ? void 0 : o.current;
      if (S) {
        const v = S.getBoundingClientRect(), P = window.scrollY, F = window.scrollX, R = v.top + P + S.clientHeight, I = v.left + F;
        g({ top: R, left: I });
      }
    }
  }, [c, o]);
  const [k] = go(
    St(async () => (t == null ? void 0 : t(!1)) ?? e, [t, e, c]),
    e
  ), [T] = go(
    St(async () => (t == null ? void 0 : t(!0)) ?? n ?? k, [t, n, k, c]),
    n ?? k
  ), C = p && T ? T : k;
  return /* @__PURE__ */ N(ae, { children: [
    /* @__PURE__ */ i(
      Si,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: m,
        children: l ?? /* @__PURE__ */ i(bm, {})
      }
    ),
    /* @__PURE__ */ i(
      Ql,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: w,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: h.top,
            left: h.left
          }
        },
        children: C ? /* @__PURE__ */ i(
          hm,
          {
            className: a,
            id: `${s ?? ""} main menu`,
            commandHandler: b,
            multiColumnMenu: C
          }
        ) : void 0
      }
    )
  ] });
}
function Ih({
  id: t,
  label: e,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: s = "medium",
  className: l,
  onClick: c,
  children: d
}) {
  return /* @__PURE__ */ i(
    Si,
    {
      id: t,
      disabled: n,
      edge: a,
      size: s,
      "aria-label": e,
      title: o ? void 0 : r ?? e,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: d
    }
  );
}
function $h({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: a,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: d,
  value: p,
  onChange: f,
  onFocus: w,
  onBlur: m
}) {
  return /* @__PURE__ */ N("div", { className: y("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ i(
      Dt,
      {
        htmlFor: t,
        className: y({
          "tw-text-red-600": n,
          "tw-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ i(
      Qe,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: y(c, { "tw-border-red-600": n }),
        defaultValue: d,
        value: p,
        onChange: f,
        onFocus: w,
        onBlur: m
      }
    ),
    /* @__PURE__ */ i("p", { className: y({ "tw-hidden": !o }), children: o })
  ] });
}
const vm = Re(
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
), ym = E.forwardRef(({ className: t, variant: e, ...n }, r) => /* @__PURE__ */ i("div", { ref: r, role: "alert", className: y(vm({ variant: e }), t), ...n }));
ym.displayName = "Alert";
const xm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ N(
    "h5",
    {
      ref: n,
      className: y("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
xm.displayName = "AlertTitle";
const Nm = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: y("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Nm.displayName = "AlertDescription";
const km = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: y(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
km.displayName = "Card";
const Em = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: y("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Em.displayName = "CardHeader";
const Sm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "h3",
    {
      ref: n,
      className: y(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
Sm.displayName = "CardTitle";
const Tm = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("p", { ref: n, className: y("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Tm.displayName = "CardDescription";
const Cm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: y("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Cm.displayName = "CardContent";
const Rm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: y("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Rm.displayName = "CardFooter";
function Mh({ ...t }) {
  return /* @__PURE__ */ i(
    ec,
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
const Om = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Nt();
  return /* @__PURE__ */ N(
    fn.Root,
    {
      ref: n,
      className: y(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: r,
      children: [
        /* @__PURE__ */ i(fn.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ i(fn.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ i(fn.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Om.displayName = fn.Root.displayName;
const _m = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Nt();
  return /* @__PURE__ */ i(
    ro.Root,
    {
      className: y(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ i(
        ro.Thumb,
        {
          className: y(
            "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",
            {
              "data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0": r === "ltr"
            },
            {
              "data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0": r === "rtl"
            }
          )
        }
      )
    }
  );
});
_m.displayName = ro.Root.displayName;
const Ah = It.Root, Pm = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Nt();
  return /* @__PURE__ */ i(
    It.List,
    {
      ref: n,
      className: y(
        "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: r
    }
  );
});
Pm.displayName = It.List.displayName;
const Im = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Trigger,
  {
    ref: n,
    className: y(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Im.displayName = It.Trigger.displayName;
const $m = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Content,
  {
    ref: n,
    className: y(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
$m.displayName = It.Content.displayName;
const Dh = (t, e) => {
  ne(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
}, to = () => !1, jh = (t, e) => {
  const [n] = go(
    St(async () => {
      if (!t) return to;
      const r = await Promise.resolve(t(e));
      return async () => r();
    }, [e, t]),
    to,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  ne(() => () => {
    n !== to && n();
  }, [n]);
};
function Mm(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Mm(`*, ::before, ::after {
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

  /*
   * Theme colors in Platform.Bible. These are applied in CSS properties using \`hsl(var(--varName))\`
   * or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's
   * [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 210 20% 98%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 90%;
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
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
    --muted: 33.9 32.4% 86.1%;
    --muted-foreground: 15.5 13.2% 53.9%;
    --popover: 40 20% 98%;
    --popover-foreground: 0 0% 0%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;
    --border: 220 13% 91%;
    --input: 161.3 26.7% 88.2%;
    --primary: 173.4 82.1% 15.3%;
    --primary-foreground: 40 85.7% 97.3%;
    --secondary: 161.3 26.7% 88.2%;
    --secondary-foreground: 173.4 82.1% 15.3%;
    --accent: 161.3 26.7% 88.2%;
    --accent-foreground: 173.4 82.1% 15.3%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
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
  }
  * {
  border-color: hsl(var(--border));
}

  body {
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
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4b5563;
  --tw-prose-links: #111827;
  --tw-prose-bold: #111827;
  --tw-prose-counters: #6b7280;
  --tw-prose-bullets: #d1d5db;
  --tw-prose-hr: #e5e7eb;
  --tw-prose-quotes: #111827;
  --tw-prose-quote-borders: #e5e7eb;
  --tw-prose-captions: #6b7280;
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: #111827;
  --tw-prose-pre-code: #e5e7eb;
  --tw-prose-pre-bg: #1f2937;
  --tw-prose-th-borders: #d1d5db;
  --tw-prose-td-borders: #e5e7eb;
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
.tw-inset-y-0 {
  top: 0px;
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
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-20 {
  margin-bottom: 5rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
}
.tw-ml-1 {
  margin-left: 0.25rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
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
.tw-mt-20 {
  margin-top: 5rem;
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
.tw-box-content {
  box-sizing: content-box;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-inline {
  display: inline;
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
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-min-h-0 {
  min-height: 0px;
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
.tw-w-1\\/3 {
  width: 33.333333%;
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
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-72 {
  min-width: 18rem;
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
.tw-max-w-64 {
  max-width: 16rem;
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
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
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
.tw-cursor-not-allowed {
  cursor: not-allowed;
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
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-flex-row {
  flex-direction: row;
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
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
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
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
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
.tw-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
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
.tw-border-e-2 {
  border-inline-end-width: 2px;
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
.tw-border-t-2 {
  border-top-width: 2px;
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
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-muted {
  border-color: hsl(var(--muted));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
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
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));
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
.tw-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
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
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
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
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
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
.tw-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity, 1));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity, 1));
}
.tw-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity, 1));
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
.tw-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
}
.tw-text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
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
.tw-text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
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
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity, 1));
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
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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
.tw-duration-300 {
  transition-duration: 300ms;
}
.tw-duration-500 {
  transition-duration: 500ms;
}
.tw-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-300 {
  animation-duration: 300ms;
}
.tw-duration-500 {
  animation-duration: 500ms;
}
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  animation-timing-function: linear;
}

/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */

/* #endregion */

.\\*\\:tw-m-4 > * {
  margin: 1rem;
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

.hover\\:tw-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity, 1));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
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

.hover\\:tw-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
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

.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}

.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
}

.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}

.hover\\:tw-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}

.hover\\:tw-text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
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

.hover\\:tw-shadow-sm:hover {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
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

.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
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

.active\\:tw-bg-white:active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
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

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
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

.rtl\\:tw-ps-2:where([dir="rtl"], [dir="rtl"] *) {
  padding-inline-start: 0.5rem;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
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
`, "top");
export {
  ym as Alert,
  Nm as AlertDescription,
  xm as AlertTitle,
  rh as BOOK_SELECTOR_STRING_KEYS,
  Jc as Badge,
  nh as BookChapterControl,
  Bc as BookSelectionMode,
  oh as BookSelector,
  wt as Button,
  km as Card,
  Cm as CardContent,
  Tm as CardDescription,
  Rm as CardFooter,
  Em as CardHeader,
  Sm as CardTitle,
  jc as ChapterRangeSelector,
  Mo as Checkbox,
  _h as Checklist,
  ao as ComboBox,
  Yc as DataTable,
  sh as DisableButton,
  No as DropdownMenu,
  ko as DropdownMenuCheckboxItem,
  pr as DropdownMenuContent,
  ac as DropdownMenuGroup,
  Ci as DropdownMenuItem,
  qc as DropdownMenuItemType,
  ur as DropdownMenuLabel,
  Zm as DropdownMenuPortal,
  th as DropdownMenuRadioGroup,
  Ri as DropdownMenuRadioItem,
  wr as DropdownMenuSeparator,
  lc as DropdownMenuShortcut,
  Qm as DropdownMenuSub,
  sc as DropdownMenuSubContent,
  ic as DropdownMenuSubTrigger,
  Ti as DropdownMenuTrigger,
  ih as EnableButton,
  fh as Filter,
  Hc as FilterButton,
  dh as FilterDropdown,
  wh as Footer,
  hm as GridMenu,
  Ph as HamburgerMenuButton,
  bh as INVENTORY_STRING_KEYS,
  Ih as IconButton,
  Qe as Input,
  ah as InstallButton,
  vh as Inventory,
  Dt as Label,
  ch as MarkdownRenderer,
  qs as MenuItem,
  uh as MoreInfo,
  Zc as MultiSelectComboBox,
  Th as NavigationContentSearch,
  ph as NoExtensionsFound,
  Di as Popover,
  Ro as PopoverContent,
  ji as PopoverTrigger,
  Ai as RadioGroup,
  oo as RadioGroupItem,
  xh as ScriptureResultsViewer,
  Nh as ScrollGroupSelector,
  ts as SearchBar,
  Le as Select,
  Ee as SelectContent,
  zc as SelectGroup,
  Vt as SelectItem,
  Fc as SelectLabel,
  Fi as SelectScrollDownButton,
  zi as SelectScrollUpButton,
  Lc as SelectSeparator,
  ke as SelectTrigger,
  Ge as SelectValue,
  Ao as Separator,
  kh as SettingsList,
  Sh as SettingsListHeader,
  Eh as SettingsListItem,
  Td as SettingsSidebar,
  yh as SettingsSidebarContentSearch,
  Om as Slider,
  Mh as Sonner,
  _n as Spinner,
  _m as Switch,
  fr as Table,
  hr as TableBody,
  Xc as TableCaption,
  Ue as TableCell,
  Uc as TableFooter,
  En as TableHead,
  mr as TableHeader,
  ce as TableRow,
  Ah as Tabs,
  $m as TabsContent,
  Pm as TabsList,
  Im as TabsTrigger,
  $h as TextField,
  Ui as ToggleGroup,
  Kn as ToggleGroupItem,
  Rh as Toolbar,
  ld as Tooltip,
  Xi as TooltipContent,
  sd as TooltipProvider,
  cd as TooltipTrigger,
  Oh as UiLanguageSelector,
  lh as UpdateButton,
  Wc as VersionHistory,
  ns as VerticalTabs,
  os as VerticalTabsContent,
  rs as VerticalTabsList,
  Md as VerticalTabsTrigger,
  Kc as badgeVariants,
  Oc as buttonVariants,
  y as cn,
  ed as getBookNumFromId,
  td as getLinesFromUSFM,
  ya as getNumberFromUSFM,
  nd as getStatusForItem,
  Ch as getToolbarOSReservedSpaceClassName,
  hh as inventoryCountColumn,
  mh as inventoryItemColumn,
  gh as inventoryStatusColumn,
  zh as sonner,
  Dh as useEvent,
  jh as useEventAsync,
  go as usePromise
};
//# sourceMappingURL=index.js.map
