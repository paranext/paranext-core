import Hs, { jsx as s, jsxs as x, Fragment as ne } from "react/jsx-runtime";
import * as j from "react";
import S, { forwardRef as rr, useCallback as Et, useState as ut, useRef as be, useEffect as se, useLayoutEffect as ca, useMemo as Ct } from "react";
import { History as Ys, ChevronRight as oi, Check as Sn, Circle as ai, ArrowDownWideNarrow as Ws, Clock as qs, Bookmark as Ks, X as wo, Search as ii, ChevronsUpDown as si, FilterIcon as Js, ChevronDown as or, ChevronUp as Zs, ArrowLeftIcon as Qs, ChevronLeftIcon as tl, ChevronRightIcon as el, ArrowRightIcon as nl, CircleCheckIcon as rl, CircleXIcon as ol, CircleHelpIcon as al, ArrowUpIcon as il, ArrowDownIcon as sl, ArrowUpDownIcon as ll, Star as cl, PanelLeft as dl, PanelRight as pl, ChevronLeft as ul, LoaderCircle as wl, Download as fl, Filter as ml, User as hl, Link as gl, CircleHelp as bl } from "lucide-react";
import ve, { clsx as vl } from "clsx";
import { extendTailwindMerge as yl } from "tailwind-merge";
import * as ft from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as xl } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Nl, deepEqual as fo, substring as kl, formatScrRef as $r, compareScrRefs as Wr, scrRefToBBBCCCVVV as Ir, getLocalizeKeyForScrollGroupId as pt, NumberFormat as El, formatBytes as Sl } from "platform-bible-utils";
import { Slot as We } from "@radix-ui/react-slot";
import { cva as qe } from "class-variance-authority";
import * as li from "@radix-ui/react-label";
import * as bn from "@radix-ui/react-radio-group";
import * as vn from "@radix-ui/react-popover";
import { Command as _t } from "cmdk";
import * as Wt from "@radix-ui/react-dialog";
import { useReactTable as ci, getFilteredRowModel as Tl, getSortedRowModel as di, getPaginationRowModel as Cl, getCoreRowModel as pi, flexRender as wn, getGroupedRowModel as Ol, getExpandedRowModel as Rl } from "@tanstack/react-table";
import * as bt from "@radix-ui/react-select";
import * as qr from "@radix-ui/react-checkbox";
import * as ar from "@radix-ui/react-toggle-group";
import * as ui from "@radix-ui/react-toggle";
import * as Pt from "@radix-ui/react-tabs";
import * as wi from "@radix-ui/react-separator";
import * as Tn from "@radix-ui/react-tooltip";
import _l, { ThemeContext as Pl, internal_processStyles as $l } from "@mui/styled-engine";
import { MenuItem as Il, ListItemText as Ml, ListItemIcon as fi, Menu as Al, Grid as mi, List as Dl, IconButton as hi, Drawer as jl, AppBar as Bl, Toolbar as Vl } from "@mui/material";
import * as zl from "react-dom";
import Vn from "react-dom";
import { Toaster as Fl } from "sonner";
import { toast as xh } from "sonner";
import * as cn from "@radix-ui/react-slider";
import * as Kr from "@radix-ui/react-switch";
import Ll from "markdown-to-jsx";
const Gl = yl({ prefix: "tw-" });
function N(...t) {
  return Gl(vl(t));
}
const Ke = S.forwardRef(
  ({ className: t, type: e, ...n }, r) => /* @__PURE__ */ s(
    "input",
    {
      type: e,
      className: N(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: r,
      ...n
    }
  )
);
Ke.displayName = "Input";
const Ul = "layoutDirection";
function xt() {
  const t = localStorage.getItem(Ul);
  return t === "rtl" ? t : "ltr";
}
const Xl = rr(
  ({ handleSearch: t, handleKeyDown: e, handleOnClick: n, handleSubmit: r, ...o }, a) => {
    const i = xt();
    return /* @__PURE__ */ x("div", { className: "tw-relative", children: [
      /* @__PURE__ */ s(
        Ke,
        {
          ...o,
          type: "text",
          className: N(
            "tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-9 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none"
          ),
          onChange: (l) => t(l.target.value),
          onKeyDown: (l) => {
            l.key === "Enter" && r(), e(l);
          },
          onClick: n,
          ref: a
        }
      ),
      /* @__PURE__ */ s(
        Ys,
        {
          className: N(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",
            { "tw-right-3": i === "ltr" },
            { "tw-left-3 tw-right-auto": i === "rtl" }
          ),
          onClick: () => {
            console.log("back in history");
          }
        }
      )
    ] });
  }
), mo = ft.Root, gi = ft.Trigger, Hl = ft.Group, Am = ft.Portal, Dm = ft.Sub, jm = ft.RadioGroup, Yl = S.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => /* @__PURE__ */ x(
  ft.SubTrigger,
  {
    ref: o,
    className: N(
      "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
      e && "tw-pl-8",
      t
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ s(oi, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Yl.displayName = ft.SubTrigger.displayName;
const Wl = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  ft.SubContent,
  {
    ref: n,
    className: N(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Wl.displayName = ft.SubContent.displayName;
const ir = S.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...r }, o) => {
  const a = xt();
  return /* @__PURE__ */ s(ft.Portal, { children: /* @__PURE__ */ s(
    ft.Content,
    {
      ref: o,
      sideOffset: e,
      className: N(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...r,
      children: /* @__PURE__ */ s("div", { dir: a, children: n })
    }
  ) });
});
ir.displayName = ft.Content.displayName;
const bi = S.forwardRef(({ className: t, inset: e, ...n }, r) => {
  const o = xt();
  return /* @__PURE__ */ s(
    ft.Item,
    {
      ref: r,
      className: N(
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
bi.displayName = ft.Item.displayName;
const ho = S.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => /* @__PURE__ */ x(
  ft.CheckboxItem,
  {
    ref: o,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ s(ft.ItemIndicator, { children: /* @__PURE__ */ s(Sn, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
ho.displayName = ft.CheckboxItem.displayName;
const vi = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ x(
  ft.RadioItem,
  {
    ref: r,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ s(ft.ItemIndicator, { children: /* @__PURE__ */ s(ai, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
vi.displayName = ft.RadioItem.displayName;
const Cn = S.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ s(
  ft.Label,
  {
    ref: r,
    className: N("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Cn.displayName = ft.Label.displayName;
const sr = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  ft.Separator,
  {
    ref: n,
    className: N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
sr.displayName = ft.Separator.displayName;
function ql({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "span",
    {
      className: N("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
ql.displayName = "DropdownMenuShortcut";
var Kl = Object.defineProperty, Jl = (t, e, n) => e in t ? Kl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, et = (t, e, n) => Jl(t, typeof e != "symbol" ? e + "" : e, n);
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
], go = [
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
], yi = [
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
], da = sc();
function Je(t, e = !0) {
  return e && (t = t.toUpperCase()), t in da ? da[t] : 0;
}
function bo(t) {
  return Je(t) > 0;
}
function Zl(t) {
  const e = typeof t == "string" ? Je(t) : t;
  return e >= 40 && e <= 66;
}
function Ql(t) {
  return (typeof t == "string" ? Je(t) : t) <= 39;
}
function xi(t) {
  return t <= 66;
}
function tc(t) {
  const e = typeof t == "string" ? Je(t) : t;
  return Ei(e) && !xi(e);
}
function* ec() {
  for (let t = 1; t <= xe.length; t++) yield t;
}
const nc = 1, Ni = xe.length;
function rc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function vo(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= xe.length ? e : xe[n];
}
function ki(t) {
  return t <= 0 || t > Ni ? "******" : yi[t - 1];
}
function oc(t) {
  return ki(Je(t));
}
function Ei(t) {
  const e = typeof t == "number" ? vo(t) : t;
  return bo(e) && !go.includes(e);
}
function ac(t) {
  const e = typeof t == "number" ? vo(t) : t;
  return bo(e) && go.includes(e);
}
function ic(t) {
  return yi[t - 1].includes("*obsolete*");
}
function sc() {
  const t = {};
  for (let e = 0; e < xe.length; e++)
    t[xe[e]] = e + 1;
  return t;
}
const ot = {
  allBookIds: xe,
  nonCanonicalIds: go,
  bookIdToNumber: Je,
  isBookIdValid: bo,
  isBookNT: Zl,
  isBookOT: Ql,
  isBookOTNT: xi,
  isBookDC: tc,
  allBookNumbers: ec,
  firstBook: nc,
  lastBook: Ni,
  extraBooks: rc,
  bookNumberToId: vo,
  bookNumberToEnglishName: ki,
  bookIdToEnglishName: oc,
  isCanonical: Ei,
  isExtraMaterial: ac,
  isObsolete: ic
};
var Ht = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(Ht || {});
const It = class {
  // private versInfo: Versification;
  constructor(e) {
    if (et(this, "name"), et(this, "fullPath"), et(this, "isPresent"), et(this, "hasVerseSegments"), et(this, "isCustomized"), et(this, "baseVersification"), et(this, "scriptureBooks"), et(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = Ht[e]) : (this._type = e, this.name = Ht[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
et(It, "Original", new It(Ht.Original)), et(It, "Septuagint", new It(Ht.Septuagint)), et(It, "Vulgate", new It(Ht.Vulgate)), et(It, "English", new It(Ht.English)), et(It, "RussianProtestant", new It(Ht.RussianProtestant)), et(It, "RussianOrthodox", new It(Ht.RussianOrthodox));
let we = It;
function pa(t, e) {
  const n = e[0];
  for (let r = 1; r < e.length; r++)
    t = t.split(e[r]).join(n);
  return t.split(n);
}
var Si = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Si || {});
const Tt = class nt {
  constructor(e, n, r, o) {
    if (et(this, "firstChapter"), et(this, "lastChapter"), et(this, "lastVerse"), et(this, "hasSegmentsDefined"), et(this, "text"), et(this, "BBBCCCVVVS"), et(this, "longHashCode"), et(this, "versification"), et(this, "rtlMark", "‏"), et(this, "_bookNum", 0), et(this, "_chapterNum", 0), et(this, "_verseNum", 0), et(this, "_verse"), r == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, i = n != null && n instanceof we ? n : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = n != null && n instanceof we ? n : void 0;
        this.setEmpty(a), this._verseNum = e % nt.chapterDigitShifter, this._chapterNum = Math.floor(
          e % nt.bookDigitShifter / nt.chapterDigitShifter
        ), this._bookNum = Math.floor(e / nt.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof nt) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null) return;
          const a = e instanceof we ? e : nt.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = o ?? nt.defaultVersification;
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
      return n = new nt(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof rn)
        return n = new nt(), { success: !1, verseRef: n };
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
    return e % nt.bcvMaxValue * nt.bookDigitShifter + (n >= 0 ? n % nt.bcvMaxValue * nt.chapterDigitShifter : 0) + (r >= 0 ? r % nt.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: i } = e, l = a || o.toString();
    let c;
    return i && (c = new we(i)), n ? new nt(n, r.toString(), l, c) : new nt();
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
      if (n = n * 10 + +r - 0, n > nt.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(nt.verseRangeSeparator) || this._verse.includes(nt.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ot.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = ot.bookIdToNumber(e);
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
    const { success: n, vNum: r } = nt.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = nt.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > ot.lastBook)
      throw new rn(
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
    this.versification = this.versification != null ? new we(e) : void 0;
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
    return this.validateVerse(nt.verseRangeSeparators, nt.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return nt.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return nt.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          const i = +a[1].trim();
          this.versification = new we(Ht[i]);
        } catch {
          throw new rn("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new rn("Invalid reference : " + e);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ot.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !nt.isVerseParseable(r[1]))
      throw new rn("Invalid reference : " + e);
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
    return new nt(this);
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
    return e instanceof nt ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = nt.verseRangeSeparators, r = nt.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = pa(this._verse, r);
    for (const i of a.map((l) => pa(l, n))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const d = this.clone();
        if (d.verse = i[1], !e)
          for (let p = c + 1; p < d.verseNum; p++) {
            const f = new nt(
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
      const i = o.BBBCCCVVV;
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ot.lastBook ? 2 : (ot.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = nt.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = ot.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
et(Tt, "defaultVersification", we.English), et(Tt, "verseRangeSeparator", "-"), et(Tt, "verseSequenceIndicator", ","), et(Tt, "verseRangeSeparators", [Tt.verseRangeSeparator]), et(Tt, "verseSequenceIndicators", [Tt.verseSequenceIndicator]), et(Tt, "chapterDigitShifter", 1e3), et(Tt, "bookDigitShifter", Tt.chapterDigitShifter * Tt.chapterDigitShifter), et(Tt, "bcvMaxValue", Tt.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
et(Tt, "ValidStatusType", Si);
class rn extends Error {
}
const lc = rr(
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ x(
    bi,
    {
      ref: l,
      textValue: t,
      className: N(
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
        /* @__PURE__ */ s(
          "span",
          {
            className: N(
              "tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": n,
                "tw-border-s-red-200": a.toLowerCase() === "ot",
                "tw-border-s-purple-200": a.toLowerCase() === "nt",
                "tw-border-s-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: ot.bookIdToEnglishName(t)
          }
        ),
        n && /* @__PURE__ */ s("div", { children: i })
      ]
    },
    t
  )
);
function cc({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: e }, (l, c) => c + 1), i = Et(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ s("div", { className: N("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: a.map((l) => /* @__PURE__ */ s(
    "div",
    {
      className: N(
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
      onMouseMove: () => i(l),
      children: l
    },
    l
  )) });
}
function dc({ handleSort: t, handleLocationHistory: e, handleBookmarks: n }) {
  return /* @__PURE__ */ x(Cn, { className: "tw-flex tw-justify-between", children: [
    /* @__PURE__ */ s("p", { className: "tw-inline-block tw-align-middle", children: "Go To" }),
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ s(
        Ws,
        {
          onClick: t,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ s(
        qs,
        {
          onClick: e,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ s(
        Ks,
        {
          onClick: n,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      )
    ] })
  ] });
}
const fn = ot.allBookIds, pc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ua = ["OT", "NT", "DC"], uc = 96, wc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], fc = (t) => ({
  OT: fn.filter((n) => ot.isBookOT(n)),
  NT: fn.filter((n) => ot.isBookNT(n)),
  DC: fn.filter((n) => ot.isBookDC(n))
})[t], on = (t) => Nl(ot.bookIdToNumber(t));
function mc() {
  return fn.map((e) => ot.bookIdToEnglishName(e));
}
function hc(t) {
  return mc().includes(t);
}
function gc(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (hc(e))
    return fn.find((r) => ot.bookIdToEnglishName(r) === e);
}
function Vm({ scrRef: t, handleSubmit: e }) {
  const n = xt(), [r, o] = ut(""), [a, i] = ut(
    ot.bookNumberToId(t.bookNum)
  ), [l, c] = ut(t.chapterNum ?? 0), [d, p] = ut(
    ot.bookNumberToId(t.bookNum)
  ), [f, w] = ut(!1), [g, v] = ut(f), m = be(void 0), h = be(void 0), k = be(void 0), T = Et(
    (I) => fc(I).filter((A) => {
      const H = ot.bookIdToEnglishName(A).toLowerCase(), G = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return H.includes(G) || // Match book name
      A.toLowerCase().includes(G);
    }),
    [r]
  ), C = (I) => {
    o(I);
  }, E = be(!1), b = Et((I) => {
    if (E.current) {
      E.current = !1;
      return;
    }
    w(I);
  }, []), _ = Et(
    (I, A, H, G) => {
      if (c(
        ot.bookNumberToId(t.bookNum) !== I ? 1 : t.chapterNum
      ), A || on(I) === -1) {
        e({
          bookNum: ot.bookIdToNumber(I),
          chapterNum: H || 1,
          verseNum: G || 1
        }), w(!1), o("");
        return;
      }
      i(a !== I ? I : ""), w(!A);
    },
    [e, t.bookNum, t.chapterNum, a]
  ), F = (I) => {
    I <= 0 || I > on(a) || _(a, !0, I);
  }, R = Et(() => {
    wc.forEach((I) => {
      const A = r.match(I);
      if (A) {
        const [H, G = void 0, B = void 0] = A.slice(1), Z = gc(H);
        (ot.isBookIdValid(H) || Z) && _(
          Z ?? H,
          !0,
          G ? parseInt(G, 10) : 1,
          B ? parseInt(B, 10) : 1
        );
      }
    });
  }, [_, r]), $ = Et(
    (I) => {
      f ? (I.key === "ArrowDown" || I.key === "ArrowUp") && (typeof k < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      k.current !== null ? k.current.focus() : typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null && h.current.focus(), I.preventDefault()) : w(!0);
    },
    [f]
  ), L = (I) => {
    const { key: A } = I;
    A === "ArrowRight" || A === "ArrowLeft" || A === "ArrowDown" || A === "ArrowUp" || A === "Enter" || (m.current.dispatchEvent(new KeyboardEvent("keydown", { key: A })), m.current.focus());
  }, D = (I) => {
    const { key: A } = I;
    if (d === a) {
      if (A === "Enter") {
        I.preventDefault(), _(a, !0, l);
        return;
      }
      const H = A === "ArrowRight" && !n || A === "ArrowRight" && n === "ltr" || A === "ArrowLeft" && n === "rtl", G = A === "ArrowLeft" && !n || A === "ArrowLeft" && n === "ltr" || A === "ArrowRight" && n === "rtl";
      let B = 0;
      if (H)
        if (l < on(d))
          B = 1;
        else {
          I.preventDefault();
          return;
        }
      else if (G)
        if (l > 1)
          B = -1;
        else {
          I.preventDefault();
          return;
        }
      else A === "ArrowDown" ? B = 6 : A === "ArrowUp" && (B = -6);
      l + B <= 0 || l + B > on(d) ? c(0) : B !== 0 && (c(l + B), I.preventDefault());
    }
  };
  return se(() => {
    a === d ? a === ot.bookNumberToId(t.bookNum) ? c(t.chapterNum) : c(1) : c(0);
  }, [d, t.bookNum, t.chapterNum, a]), ca(() => {
    v(f);
  }, [f]), ca(() => {
    const I = setTimeout(() => {
      if (g && h.current && k.current) {
        const H = k.current.offsetTop - uc;
        h.current.scrollTo({ top: H, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(I);
    };
  }, [g]), /* @__PURE__ */ s("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ x(mo, { modal: !1, open: f, onOpenChange: b, children: [
    /* @__PURE__ */ s(gi, { asChild: !0, children: /* @__PURE__ */ s(
      Xl,
      {
        ref: m,
        value: r,
        handleSearch: C,
        handleKeyDown: $,
        handleOnClick: () => {
          i(ot.bookNumberToId(t.bookNum)), p(ot.bookNumberToId(t.bookNum)), c(t.chapterNum > 0 ? t.chapterNum : 0), w(!0), m.current.focus();
        },
        onFocus: () => {
          E.current = !0;
        },
        handleSubmit: R,
        placeholder: `${ot.bookNumberToEnglishName(t.bookNum)} ${t.chapterNum}:${t.verseNum}`
      }
    ) }),
    /* @__PURE__ */ s(
      ir,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: L,
        align: n === "ltr" ? "start" : "end",
        ref: h,
        children: /* @__PURE__ */ x("div", { className: "rtl:tw-ps-2", children: [
          /* @__PURE__ */ s(
            dc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ua.map(
            (I, A) => T(I).length > 0 && /* @__PURE__ */ x("div", { children: [
              /* @__PURE__ */ s(Cn, { className: "tw-font-semibold tw-text-foreground/80", children: pc[I] }),
              T(I).map((H) => /* @__PURE__ */ s("div", { children: /* @__PURE__ */ s(
                lc,
                {
                  bookId: H,
                  handleSelectBook: () => _(H, !1),
                  isSelected: a === H,
                  handleHighlightBook: () => p(H),
                  handleKeyDown: D,
                  bookType: I,
                  ref: (G) => {
                    a === H && (k.current = G);
                  },
                  children: /* @__PURE__ */ s(
                    cc,
                    {
                      handleSelectChapter: F,
                      endChapter: on(H),
                      activeChapter: t.bookNum === ot.bookIdToNumber(H) ? t.chapterNum : 0,
                      highlightedChapter: l,
                      handleHighlightedChapter: (G) => {
                        c(G);
                      }
                    }
                  )
                }
              ) }, H)),
              ua.length - 1 !== A ? /* @__PURE__ */ s(sr, {}) : void 0
            ] }, I)
          )
        ] })
      }
    )
  ] }) });
}
const bc = qe(
  "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",
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
), wt = S.forwardRef(
  ({ className: t, variant: e, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ s(r ? We : "button", { className: N(bc({ variant: e, size: n, className: t })), ref: a, ...o })
);
wt.displayName = "Button";
const vc = qe(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), At = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(li.Root, { ref: n, className: N("pr-twp", vc(), t), ...e }));
At.displayName = li.Root.displayName;
const Ti = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ s(
    bn.Root,
    {
      className: N("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: r
    }
  );
});
Ti.displayName = bn.Root.displayName;
const Jr = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bn.Item,
  {
    ref: n,
    className: N(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ s(bn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ s(ai, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Jr.displayName = bn.Item.displayName;
const Ci = vn.Root, Oi = vn.Trigger, yo = S.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...r }, o) => {
  const a = xt();
  return /* @__PURE__ */ s(vn.Portal, { children: /* @__PURE__ */ s(
    vn.Content,
    {
      ref: o,
      align: e,
      sideOffset: n,
      className: N(
        "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...r,
      dir: a
    }
  ) });
});
yo.displayName = vn.Content.displayName;
const yc = Wt.Portal, Ri = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Wt.Overlay,
  {
    ref: n,
    className: N(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Ri.displayName = Wt.Overlay.displayName;
const xc = S.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = xt();
  return /* @__PURE__ */ x(yc, { children: [
    /* @__PURE__ */ s(Ri, {}),
    /* @__PURE__ */ x(
      Wt.Content,
      {
        ref: r,
        className: N(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: o,
        children: [
          e,
          /* @__PURE__ */ x(
            Wt.Close,
            {
              className: N(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ s(wo, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
xc.displayName = Wt.Content.displayName;
const Nc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Wt.Title,
  {
    ref: n,
    className: N("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Nc.displayName = Wt.Title.displayName;
const kc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Wt.Description,
  {
    ref: n,
    className: N("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
kc.displayName = Wt.Description.displayName;
const xo = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t,
  {
    ref: n,
    className: N(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
xo.displayName = _t.displayName;
const No = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: r, children: [
    /* @__PURE__ */ s(ii, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ s(
      _t.Input,
      {
        ref: n,
        className: N(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
No.displayName = _t.Input.displayName;
const ko = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.List,
  {
    ref: n,
    className: N("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ko.displayName = _t.List.displayName;
const Eo = S.forwardRef((t, e) => /* @__PURE__ */ s(_t.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Eo.displayName = _t.Empty.displayName;
const _i = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Group,
  {
    ref: n,
    className: N(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
_i.displayName = _t.Group.displayName;
const Ec = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Separator,
  {
    ref: n,
    className: N("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Ec.displayName = _t.Separator.displayName;
const So = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Item,
  {
    ref: n,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
So.displayName = _t.Item.displayName;
function Sc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Zr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: r,
  popoverContentClassName: o,
  value: a,
  onChange: i = () => {
  },
  getOptionLabel: l = Sc,
  icon: c = void 0,
  buttonPlaceholder: d = "",
  textPlaceholder: p = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: w = "outline",
  alignDropDown: g = "start",
  isDisabled: v = !1,
  ...m
}) {
  const [h, k] = ut(!1);
  return /* @__PURE__ */ x(Ci, { open: h, onOpenChange: k, ...m, children: [
    /* @__PURE__ */ s(Oi, { asChild: !0, children: /* @__PURE__ */ x(
      wt,
      {
        variant: w,
        role: "combobox",
        "aria-expanded": h,
        id: t,
        className: N(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          r ?? n
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ s("div", { className: "tw-pe-2", children: c }),
            /* @__PURE__ */ s("span", { className: "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: a ? l(a) : d })
          ] }),
          /* @__PURE__ */ s(si, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ s(
      yo,
      {
        align: g,
        className: N("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ x(xo, { children: [
          /* @__PURE__ */ s(No, { placeholder: p, className: "tw-text-inherit" }),
          /* @__PURE__ */ s(Eo, { children: f }),
          /* @__PURE__ */ s(ko, { children: e.map((T) => /* @__PURE__ */ x(
            So,
            {
              value: l(T),
              onSelect: () => {
                i(T), k(!1);
              },
              children: [
                /* @__PURE__ */ s(
                  Sn,
                  {
                    className: N("tw-me-2 tw-h-4 tw-w-4", {
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
function Tc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const i = Ct(
    () => Array.from({ length: a }, (d, p) => p + 1),
    [a]
  );
  return /* @__PURE__ */ x(ne, { children: [
    /* @__PURE__ */ s(At, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ s(
      Zr,
      {
        isDisabled: o,
        onChange: (d) => {
          n(d), d > e && r(d);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ s(At, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ s(
      Zr,
      {
        isDisabled: o,
        onChange: (d) => {
          r(d), d < t && n(d);
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
var Cc = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Cc || {});
const zm = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Mr = (t, e) => t[e] ?? e;
function Fm({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: d
}) {
  const p = Mr(d, "%webView_bookSelector_currentBook%"), f = Mr(d, "%webView_bookSelector_choose%"), w = Mr(d, "%webView_bookSelector_chooseBooks%"), [g, v] = ut(
    "current book"
    /* CURRENT_BOOK */
  ), m = (h) => {
    v(h), t(h);
  };
  return /* @__PURE__ */ s(
    Ti,
    {
      className: "pr-twp tw-flex",
      value: g,
      onValueChange: (h) => m(h),
      children: /* @__PURE__ */ x("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ x("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ s(Jr, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ s(At, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ s(At, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ s(
            Tc,
            {
              isDisabled: g === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: l,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ x("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ s(Jr, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ s(At, { className: "tw-ms-1", children: w })
          ] }),
          /* @__PURE__ */ s(At, { className: "tw-flex tw-items-center", children: r.map((h) => ot.bookIdToEnglishName(h)).join(", ") }),
          /* @__PURE__ */ s(
            wt,
            {
              disabled: g === "current book",
              onClick: () => n(),
              children: f
            }
          )
        ] })
      ] })
    }
  );
}
function Oc({ table: t }) {
  return /* @__PURE__ */ x(mo, { children: [
    /* @__PURE__ */ s(xl, { asChild: !0, children: /* @__PURE__ */ x(wt, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ s(Js, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ x(ir, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ s(Cn, { children: "Toggle columns" }),
      /* @__PURE__ */ s(sr, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ s(
        ho,
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
const Ve = bt.Root, Rc = bt.Group, ze = bt.Value, Ne = S.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = xt();
  return /* @__PURE__ */ x(
    bt.Trigger,
    {
      ref: r,
      className: N(
        "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
        t
      ),
      ...n,
      dir: o,
      children: [
        e,
        /* @__PURE__ */ s(bt.Icon, { asChild: !0, children: /* @__PURE__ */ s(or, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Ne.displayName = bt.Trigger.displayName;
const Pi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.ScrollUpButton,
  {
    ref: n,
    className: N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ s(Zs, { className: "tw-h-4 tw-w-4" })
  }
));
Pi.displayName = bt.ScrollUpButton.displayName;
const $i = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.ScrollDownButton,
  {
    ref: n,
    className: N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ s(or, { className: "tw-h-4 tw-w-4" })
  }
));
$i.displayName = bt.ScrollDownButton.displayName;
const ke = S.forwardRef(({ className: t, children: e, position: n = "popper", ...r }, o) => {
  const a = xt();
  return /* @__PURE__ */ s(bt.Portal, { children: /* @__PURE__ */ x(
    bt.Content,
    {
      ref: o,
      className: N(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ s(Pi, {}),
        /* @__PURE__ */ s(
          bt.Viewport,
          {
            className: N(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ s("div", { dir: a, children: e })
          }
        ),
        /* @__PURE__ */ s($i, {})
      ]
    }
  ) });
});
ke.displayName = bt.Content.displayName;
const _c = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.Label,
  {
    ref: n,
    className: N("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
_c.displayName = bt.Label.displayName;
const Bt = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ x(
  bt.Item,
  {
    ref: r,
    className: N(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ s(bt.ItemIndicator, { children: /* @__PURE__ */ s(Sn, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ s(bt.ItemText, { children: e })
    ]
  }
));
Bt.displayName = bt.Item.displayName;
const Pc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.Separator,
  {
    ref: n,
    className: N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Pc.displayName = bt.Separator.displayName;
function $c({ table: t }) {
  return /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ x("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ s("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ x(
        Ve,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ s(Ne, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ s(ze, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ s(ke, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ s(Bt, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ x("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ x(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ s(Qs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ x(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ s(tl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ x(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ s(el, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ x(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ s(nl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const lr = S.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ s("div", { className: N("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ s(
  "table",
  {
    ref: r,
    className: N("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
lr.displayName = "Table";
const cr = S.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ s(
  "thead",
  {
    ref: r,
    className: N(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": e },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
cr.displayName = "TableHeader";
const dr = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s("tbody", { ref: n, className: N("[&_tr:last-child]:tw-border-0", t), ...e }));
dr.displayName = "TableBody";
const Ic = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  "tfoot",
  {
    ref: n,
    className: N("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Ic.displayName = "TableFooter";
const ie = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "tr",
    {
      ref: n,
      className: N(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        t
      ),
      ...e
    }
  )
);
ie.displayName = "TableRow";
const yn = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  "th",
  {
    ref: n,
    className: N(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
yn.displayName = "TableHead";
const Fe = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  "td",
  {
    ref: n,
    className: N("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Fe.displayName = "TableCell";
const Mc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  "caption",
  {
    ref: n,
    className: N("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Mc.displayName = "TableCaption";
function Ac({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var h;
  const [l, c] = ut([]), [d, p] = ut([]), [f, w] = ut({}), [g, v] = ut({}), m = ci({
    data: e,
    columns: t,
    getCoreRowModel: pi(),
    ...n && { getPaginationRowModel: Cl() },
    onSortingChange: c,
    getSortedRowModel: di(),
    onColumnFiltersChange: p,
    getFilteredRowModel: Tl(),
    onColumnVisibilityChange: w,
    onRowSelectionChange: v,
    state: {
      sorting: l,
      columnFilters: d,
      columnVisibility: f,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ x("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ s(Oc, { table: m }),
    /* @__PURE__ */ x(lr, { stickyHeader: a, children: [
      /* @__PURE__ */ s(cr, { stickyHeader: a, children: m.getHeaderGroups().map((k) => /* @__PURE__ */ s(ie, { children: k.headers.map((T) => /* @__PURE__ */ s(yn, { children: T.isPlaceholder ? void 0 : wn(T.column.columnDef.header, T.getContext()) }, T.id)) }, k.id)) }),
      /* @__PURE__ */ s(dr, { children: (h = m.getRowModel().rows) != null && h.length ? m.getRowModel().rows.map((k) => /* @__PURE__ */ s(
        ie,
        {
          onClick: () => i(k, m),
          "data-state": k.getIsSelected() && "selected",
          children: k.getVisibleCells().map((T) => /* @__PURE__ */ s(Fe, { children: wn(T.column.columnDef.cell, T.getContext()) }, T.id))
        },
        k.id
      )) : /* @__PURE__ */ s(ie, { children: /* @__PURE__ */ s(Fe, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ s(
        wt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.previousPage(),
          disabled: !m.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ s(
        wt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.nextPage(),
          disabled: !m.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ s($c, { table: m })
  ] });
}
function Dc({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], a = Ct(() => {
    const i = [];
    return t.forEach((l) => {
      i.some((c) => fo(c, l)) || i.push(l);
    }), i;
  }, [t]);
  return /* @__PURE__ */ x(lr, { stickyHeader: !0, children: [
    /* @__PURE__ */ s(cr, { stickyHeader: !0, children: /* @__PURE__ */ x(ie, { children: [
      /* @__PURE__ */ s(yn, { children: r }),
      /* @__PURE__ */ s(yn, { children: o })
    ] }) }),
    /* @__PURE__ */ s(dr, { children: a.length > 0 && a.map((i) => /* @__PURE__ */ x(
      ie,
      {
        onClick: () => {
          e(i.reference);
        },
        children: [
          /* @__PURE__ */ s(Fe, { children: `${ot.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ s(Fe, { children: i.text })
        ]
      },
      `${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const To = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  qr.Root,
  {
    ref: n,
    className: N(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ s(
      qr.Indicator,
      {
        className: N("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ s(Sn, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
To.displayName = qr.Root.displayName;
const jc = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), wa = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Bc = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? ot.bookIdToNumber(e[1]) : 0;
}, Vc = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ii = qe(
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
), zc = S.forwardRef(({ className: t, variant: e, size: n, ...r }, o) => /* @__PURE__ */ s(
  ui.Root,
  {
    ref: o,
    className: N(Ii({ variant: e, size: n, className: t })),
    ...r
  }
));
zc.displayName = ui.Root.displayName;
const Mi = S.createContext({
  size: "default",
  variant: "default"
}), Ai = S.forwardRef(({ className: t, variant: e, size: n, children: r, ...o }, a) => {
  const i = xt();
  return /* @__PURE__ */ s(
    ar.Root,
    {
      ref: a,
      className: N("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: i,
      children: /* @__PURE__ */ s(
        Mi.Provider,
        {
          value: { variant: e, size: n },
          children: r
        }
      )
    }
  );
});
Ai.displayName = ar.Root.displayName;
const Xn = S.forwardRef(({ className: t, children: e, variant: n, size: r, ...o }, a) => {
  const i = S.useContext(Mi);
  return /* @__PURE__ */ s(
    ar.Item,
    {
      ref: a,
      className: N(
        Ii({
          variant: i.variant || n,
          size: i.size || r
        }),
        t
      ),
      ...o,
      children: e
    }
  );
});
Xn.displayName = ar.Item.displayName;
const pr = (t) => t === "asc" ? /* @__PURE__ */ s(il, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ s(sl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ s(ll, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Lm = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ x(wt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    pr(e.getIsSorted())
  ] })
}), Fc = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ x(wt, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    pr(n.getIsSorted())
  ] })
}), Gm = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ x(wt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    pr(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Ar = (t, e, n, r, o, a) => {
  let i = [...n];
  t.forEach((c) => {
    e === "approved" ? i.includes(c) || i.push(c) : i = i.filter((d) => d !== c);
  }), r(i);
  let l = [...o];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), a(l);
}, Um = (t, e, n, r, o) => ({
  accessorKey: "status",
  header: ({ column: a }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ x(wt, { variant: "ghost", onClick: () => a.toggleSorting(void 0), children: [
    t,
    pr(a.getIsSorted())
  ] }) }),
  cell: ({ row: a }) => {
    const i = a.getValue("status"), l = a.getValue("item");
    return /* @__PURE__ */ x(Ai, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ s(
        Xn,
        {
          onClick: () => Ar(
            [l],
            "approved",
            e,
            n,
            r,
            o
          ),
          value: "approved",
          children: /* @__PURE__ */ s(rl, {})
        }
      ),
      /* @__PURE__ */ s(
        Xn,
        {
          onClick: () => Ar(
            [l],
            "unapproved",
            e,
            n,
            r,
            o
          ),
          value: "unapproved",
          children: /* @__PURE__ */ s(ol, {})
        }
      ),
      /* @__PURE__ */ s(
        Xn,
        {
          onClick: () => Ar(
            [l],
            "unknown",
            e,
            n,
            r,
            o
          ),
          value: "unknown",
          children: /* @__PURE__ */ s(al, {})
        }
      )
    ] });
  }
}), Xm = Object.freeze([
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
]), Lc = (t, e, n) => {
  let r = t;
  return e !== "all" && (r = r.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.items[0].includes(n))), r;
}, Gc = (t, e, n, r, o) => {
  if (!t) return [];
  const a = [];
  let i = e.bookNum, l = e.chapterNum, c = e.verseNum;
  return jc(t).forEach((p) => {
    p.startsWith("\\id") && (i = Bc(p), l = 0, c = 0), p.startsWith("\\c") && (l = wa(p), c = 0), p.startsWith("\\v") && (c = wa(p), l === 0 && (l = e.chapterNum));
    let f = o.exec(p) ?? void 0;
    for (; f; ) {
      const w = [];
      f.forEach((h) => w.push(h));
      const g = f.index, v = a.find((h) => fo(h.items, w)), m = {
        reference: {
          bookNum: i !== void 0 ? i : -1,
          chapterNum: l !== void 0 ? l : -1,
          verseNum: c !== void 0 ? c : -1
        },
        text: kl(p, Math.max(0, g - 25), Math.min(g + 25, p.length))
      };
      if (v)
        v.count += 1, v.occurrences.push(m);
      else {
        const h = {
          items: w,
          count: 1,
          status: Vc(w[0], n, r),
          occurrences: [m]
        };
        a.push(h);
      }
      f = o.exec(p) ?? void 0;
    }
  }), a;
}, Zt = (t, e) => t[e] ?? e;
function Hm({
  scriptureReference: t,
  setScriptureReference: e,
  localizedStrings: n,
  extractItems: r,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: i,
  text: l,
  scope: c,
  onScopeChange: d,
  columns: p
}) {
  const f = Zt(n, "%webView_inventory_all%"), w = Zt(n, "%webView_inventory_approved%"), g = Zt(n, "%webView_inventory_unapproved%"), v = Zt(n, "%webView_inventory_unknown%"), m = Zt(n, "%webView_inventory_scope_currentBook%"), h = Zt(n, "%webView_inventory_scope_chapter%"), k = Zt(n, "%webView_inventory_scope_verse%"), T = Zt(n, "%webView_inventory_filter_text%"), C = Zt(
    n,
    "%webView_inventory_show_additional_items%"
  ), [E, b] = ut(!1), [_, F] = ut("all"), [R, $] = ut(""), [L, D] = ut([]), I = Ct(() => l ? r instanceof RegExp ? Gc(
    l,
    t,
    a,
    i,
    r
  ) : r(l, t, a, i) : [], [l, r, t, a, i]), A = Ct(() => {
    if (E) return I;
    const y = [];
    return I.forEach((O) => {
      const U = O.items[0], X = y.find(
        (z) => z.items[0] === U
      );
      X ? (X.count += O.count, X.occurrences = X.occurrences.concat(O.occurrences)) : y.push({
        items: [U],
        count: O.count,
        occurrences: O.occurrences,
        status: O.status
      });
    }), y;
  }, [E, I]), H = Ct(() => Lc(A, _, R), [A, _, R]), G = Ct(() => {
    var U, X;
    if (!E) return p;
    const y = (U = o == null ? void 0 : o.tableHeaders) == null ? void 0 : U.length;
    if (!y) return p;
    const O = [];
    for (let z = 0; z < y; z++)
      O.push(
        Fc(
          ((X = o == null ? void 0 : o.tableHeaders) == null ? void 0 : X[z]) || "Additional Item",
          z + 1
        )
      );
    return [...O, ...p];
  }, [o == null ? void 0 : o.tableHeaders, p, E]);
  se(() => {
    D([]);
  }, [H]);
  const B = (y, O) => {
    O.setRowSelection(() => {
      const U = {};
      return U[y.index] = !0, U;
    }), D(y.original.items);
  }, Z = (y) => {
    if (y === "book" || y === "chapter" || y === "verse")
      d(y);
    else
      throw new Error(`Invalid scope value: ${y}`);
  }, at = (y) => {
    if (y === "all" || y === "approved" || y === "unapproved" || y === "unknown")
      F(y);
    else
      throw new Error(`Invalid status filter value: ${y}`);
  }, rt = Ct(() => {
    if (A.length === 0 || L.length === 0) return [];
    const y = A.filter((O) => fo(
      E ? O.items : [O.items[0]],
      L
    ));
    if (y.length > 1) throw new Error("Selected item is not unique");
    return y[0].occurrences;
  }, [L, E, A]);
  return /* @__PURE__ */ x("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ x(
        Ve,
        {
          onValueChange: (y) => at(y),
          defaultValue: _,
          children: [
            /* @__PURE__ */ s(Ne, { className: "tw-m-1", children: /* @__PURE__ */ s(ze, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ x(ke, { children: [
              /* @__PURE__ */ s(Bt, { value: "all", children: f }),
              /* @__PURE__ */ s(Bt, { value: "approved", children: w }),
              /* @__PURE__ */ s(Bt, { value: "unapproved", children: g }),
              /* @__PURE__ */ s(Bt, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ x(Ve, { onValueChange: (y) => Z(y), defaultValue: c, children: [
        /* @__PURE__ */ s(Ne, { className: "tw-m-1", children: /* @__PURE__ */ s(ze, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ x(ke, { children: [
          /* @__PURE__ */ s(Bt, { value: "book", children: m }),
          /* @__PURE__ */ s(Bt, { value: "chapter", children: h }),
          /* @__PURE__ */ s(Bt, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ s(
        Ke,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: T,
          value: R,
          onChange: (y) => {
            $(y.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ x("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ s(
          To,
          {
            className: "tw-m-1",
            checked: E,
            onCheckedChange: (y) => {
              D([]), b(y);
            }
          }
        ),
        /* @__PURE__ */ s(At, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? C })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ s(
      Ac,
      {
        columns: G,
        data: H,
        onRowClickHandler: B,
        stickyHeader: !0
      }
    ) }),
    rt.length > 0 && /* @__PURE__ */ s("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ s(
      Dc,
      {
        occurrenceData: rt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
function Uc({
  entries: t,
  getEntriesCount: e = void 0,
  selected: n,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: a = "No entries found",
  customSelectedText: i,
  sortSelected: l = !1,
  icon: c = void 0,
  className: d = void 0
}) {
  const [p, f] = ut(!1), w = Et(
    (m) => {
      var k;
      const h = (k = t.find((T) => T.label === m)) == null ? void 0 : k.value;
      h && r(
        n.includes(h) ? n.filter((T) => T !== h) : [...n, h]
      );
    },
    [t, n, r]
  ), g = () => i || o, v = Ct(() => {
    if (!l) return t;
    const m = t.filter((k) => k.starred).sort((k, T) => k.label.localeCompare(T.label)), h = t.filter((k) => !k.starred).sort((k, T) => {
      const C = n.includes(k.value), E = n.includes(T.value);
      return C && !E ? -1 : !C && E ? 1 : k.label.localeCompare(T.label);
    });
    return [...m, ...h];
  }, [t, n, l]);
  return /* @__PURE__ */ s("div", { className: d, children: /* @__PURE__ */ x(Ci, { open: p, onOpenChange: f, children: [
    /* @__PURE__ */ s(Oi, { asChild: !0, children: /* @__PURE__ */ x(
      wt,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": p,
        className: N(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ s("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ s("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: c }) }),
            /* @__PURE__ */ s(
              "div",
              {
                className: N({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ s("div", { className: "tw-font-normal", children: g() })
              }
            )
          ] }),
          /* @__PURE__ */ s(si, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ s(yo, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ x(xo, { children: [
      /* @__PURE__ */ s(No, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ x(ko, { children: [
        /* @__PURE__ */ s(Eo, { children: a }),
        /* @__PURE__ */ s(_i, { children: v.map((m) => {
          const h = e ? e(m) : void 0;
          return /* @__PURE__ */ x(
            So,
            {
              value: m.label,
              onSelect: w,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ s("div", { className: "w-4", children: /* @__PURE__ */ s(
                  Sn,
                  {
                    className: N(
                      "tw-h-4 tw-w-4",
                      n.includes(m.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ s("div", { className: "tw-w-4", children: m.starred && /* @__PURE__ */ s(cl, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ s("div", { className: "tw-flex-grow", children: m.label }),
                e && /* @__PURE__ */ s("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: h })
              ]
            },
            m.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function Di({
  value: t,
  onSearch: e,
  placeholder: n,
  isFullWidth: r,
  className: o
}) {
  const a = xt();
  return /* @__PURE__ */ x("div", { className: N("tw-relative", { "tw-w-full": r }, o), children: [
    /* @__PURE__ */ s(
      ii,
      {
        className: N(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": a === "rtl" },
          { "tw-left-3": a === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ s(
      Ke,
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: n,
        value: t,
        onChange: (i) => e(i.target.value)
      }
    ),
    t && /* @__PURE__ */ x(
      wt,
      {
        variant: "ghost",
        size: "icon",
        className: N(
          "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
          { "tw-left-0": a === "rtl" },
          { "tw-right-0": a === "ltr" }
        ),
        onClick: () => {
          e("");
        },
        children: [
          /* @__PURE__ */ s(wo, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
const ji = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ s(
    Pt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: N("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: r
    }
  );
});
ji.displayName = Pt.List.displayName;
const Bi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Pt.List,
  {
    ref: n,
    className: N(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Bi.displayName = Pt.List.displayName;
const Xc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Pt.Trigger,
  {
    ref: n,
    ...e,
    className: N(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Vi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Pt.Content,
  {
    ref: n,
    className: N(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Vi.displayName = Pt.Content.displayName;
function Ym({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: r,
  headerTitle: o,
  searchClassName: a
}) {
  return /* @__PURE__ */ x("div", { className: "pr-twp", children: [
    /* @__PURE__ */ x("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ s("h1", { children: o }) : "",
      /* @__PURE__ */ s(
        Di,
        {
          className: a,
          value: e,
          onSearch: n,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ x(ji, { children: [
      /* @__PURE__ */ s(Bi, { children: t.map((i) => /* @__PURE__ */ s(Xc, { value: i.value, children: i.value }, i.key)) }),
      t.map((i) => /* @__PURE__ */ s(Vi, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const Co = S.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ s(
  wi.Root,
  {
    ref: o,
    decorative: n,
    orientation: e,
    className: N(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...r
  }
));
Co.displayName = wi.Root.displayName;
function fa({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      className: N("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const Hc = Tn.Provider, Yc = Tn.Root, Wc = Tn.Trigger, zi = S.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ s(
  Tn.Content,
  {
    ref: r,
    sideOffset: e,
    className: N(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
zi.displayName = Tn.Content.displayName;
const qc = "16rem", Kc = "3rem", Fi = S.createContext(void 0);
function ur() {
  const t = S.useContext(Fi);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Li = S.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: r,
    style: o,
    children: a,
    side: i = "primary",
    ...l
  }, c) => {
    const [d, p] = S.useState(t), f = e ?? d, w = S.useCallback(
      (C) => {
        const E = typeof C == "function" ? C(f) : C;
        n ? n(E) : p(E);
      },
      [n, f]
    ), g = S.useCallback(() => w((C) => !C), [w]), v = f ? "expanded" : "collapsed", k = xt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", T = S.useMemo(
      () => ({
        state: v,
        open: f,
        setOpen: w,
        toggleSidebar: g,
        side: k
      }),
      [v, f, w, g, k]
    );
    return /* @__PURE__ */ s(Fi.Provider, { value: T, children: /* @__PURE__ */ s(Hc, { delayDuration: 0, children: /* @__PURE__ */ s(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": qc,
            "--sidebar-width-icon": Kc,
            ...o
          }
        ),
        className: N(
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
Li.displayName = "SidebarProvider";
const Gi = S.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: r, ...o }, a) => {
  const i = ur();
  return e === "none" ? /* @__PURE__ */ s(
    "div",
    {
      className: N(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: a,
      ...o,
      children: r
    }
  ) : /* @__PURE__ */ x(
    "div",
    {
      ref: a,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": i.state,
      "data-collapsible": i.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": i.side,
      children: [
        /* @__PURE__ */ s(
          "div",
          {
            className: N(
              "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=secondary]:tw-rotate-180",
              t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ s(
          "div",
          {
            className: N(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              i.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              n
            ),
            ...o,
            children: /* @__PURE__ */ s(
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
Gi.displayName = "Sidebar";
const Jc = S.forwardRef(({ className: t, onClick: e, ...n }, r) => {
  const o = ur();
  return /* @__PURE__ */ x(
    wt,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: N("tw-h-7 tw-w-7", t),
      onClick: (a) => {
        e == null || e(a), o.toggleSidebar();
      },
      ...n,
      children: [
        o.side === "primary" ? /* @__PURE__ */ s(dl, {}) : /* @__PURE__ */ s(pl, {}),
        /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Jc.displayName = "SidebarTrigger";
const Zc = S.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: r } = ur();
    return /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        ref: n,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: r,
        title: "Toggle Sidebar",
        className: N(
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
Zc.displayName = "SidebarRail";
const Ui = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "main",
    {
      ref: n,
      className: N(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
Ui.displayName = "SidebarInset";
const Qc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Ke,
  {
    ref: n,
    "data-sidebar": "input",
    className: N(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
Qc.displayName = "SidebarInput";
const td = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: N("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
td.displayName = "SidebarHeader";
const ed = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: N("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
ed.displayName = "SidebarFooter";
const nd = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Co,
  {
    ref: n,
    "data-sidebar": "separator",
    className: N("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
nd.displayName = "SidebarSeparator";
const Xi = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: N(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
Xi.displayName = "SidebarContent";
const Qr = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: N("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
Qr.displayName = "SidebarGroup";
const to = S.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ s(
  e ? We : "div",
  {
    ref: r,
    "data-sidebar": "group-label",
    className: N(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
to.displayName = "SidebarGroupLabel";
const rd = S.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ s(
  e ? We : "button",
  {
    ref: r,
    "data-sidebar": "group-action",
    className: N(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
rd.displayName = "SidebarGroupAction";
const eo = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: N("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
eo.displayName = "SidebarGroupContent";
const Hi = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: N("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
Hi.displayName = "SidebarMenu";
const Yi = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: N("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
Yi.displayName = "SidebarMenuItem";
const od = qe(
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
), Wi = S.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: o,
    className: a,
    ...i
  }, l) => {
    const c = t ? We : "button", { state: d } = ur(), p = /* @__PURE__ */ s(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": e,
        className: N(od({ variant: n, size: r }), a),
        ...i
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ x(Yc, { children: [
      /* @__PURE__ */ s(Wc, { asChild: !0, children: p }),
      /* @__PURE__ */ s(zi, { side: "right", align: "center", hidden: d !== "collapsed", ...o })
    ] })) : p;
  }
);
Wi.displayName = "SidebarMenuButton";
const ad = S.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...r }, o) => /* @__PURE__ */ s(
  e ? We : "button",
  {
    ref: o,
    "data-sidebar": "menu-action",
    className: N(
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
ad.displayName = "SidebarMenuAction";
const id = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: N(
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
id.displayName = "SidebarMenuBadge";
const sd = S.forwardRef(({ className: t, showIcon: e = !1, ...n }, r) => {
  const o = S.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ x(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: N("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ s(fa, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ s(
          fa,
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
sd.displayName = "SidebarMenuSkeleton";
const ld = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: N(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
ld.displayName = "SidebarMenuSub";
const cd = S.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ s("li", { ref: e, ...t })
);
cd.displayName = "SidebarMenuSubItem";
const dd = S.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: r, ...o }, a) => /* @__PURE__ */ s(
  t ? We : "a",
  {
    ref: a,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: N(
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
dd.displayName = "SidebarMenuSubButton";
function pd({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: r,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: a,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l
}) {
  const c = Et(
    (f, w) => {
      r(f, w);
    },
    [r]
  ), d = Et(
    (f) => {
      const w = n.find((g) => g.projectId === f);
      return w ? w.projectName : f;
    },
    [n]
  ), p = Et(
    (f) => !o.projectId && f === o.label,
    [o]
  );
  return /* @__PURE__ */ s(
    Gi,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: "tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",
      children: /* @__PURE__ */ x(Xi, { children: [
        /* @__PURE__ */ x(Qr, { children: [
          /* @__PURE__ */ s(to, { className: "tw-text-sm tw-text-gray-400", children: a }),
          /* @__PURE__ */ s(eo, { children: /* @__PURE__ */ s(Hi, { children: e.map((f) => /* @__PURE__ */ s(Yi, { children: /* @__PURE__ */ s(
            Wi,
            {
              className: N(
                "tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",
                { "tw-bg-white tw-text-gray-900 tw-shadow-sm": p(f) }
              ),
              onClick: () => c(f),
              isActive: p(f),
              children: /* @__PURE__ */ s("span", { className: "tw-pl-3", children: f })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ x(Qr, { children: [
          /* @__PURE__ */ s(to, { className: "tw-text-sm tw-text-gray-400", children: i }),
          /* @__PURE__ */ s(eo, { className: "tw-pl-3", children: /* @__PURE__ */ s(
            Zr,
            {
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: (f) => d(f),
              buttonPlaceholder: l,
              onChange: (f) => {
                const w = d(f);
                c(w, f);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0
            }
          ) })
        ] })
      ] })
    }
  );
}
function Wm({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: d,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ x("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3", children: [
    /* @__PURE__ */ s("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ s(
      Di,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ x(Li, { id: t, className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto", children: [
      /* @__PURE__ */ s(
        pd,
        {
          extensionLabels: e,
          projectInfo: n,
          handleSelectSidebarItem: o,
          selectedSidebarItem: a,
          extensionsSidebarGroupLabel: c,
          projectsSidebarGroupLabel: d,
          buttonPlaceholderText: p
        }
      ),
      /* @__PURE__ */ s(Ui, { className: "tw-overflow-y-auto", children: r })
    ] })
  ] });
}
const oe = "scrBook", ud = "scrRef", fe = "source", wd = "details", fd = "Scripture Reference", md = "Scripture Book", qi = "Type", hd = "Details";
function gd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (r) => `${ot.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: oe,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? fd,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? ot.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === oe ? $r(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Wr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => $r(r.start),
      id: ud,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : $r(o.start);
      },
      sortingFn: (r, o) => Wr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: fe,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? qi : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: wd,
      header: (t == null ? void 0 : t.detailsColumnName) ?? hd,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const bd = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Wr(t.start, t.end) === 0 ? `${Ir(t.start)}+${e}` : `${Ir(t.start)}+${e}-${Ir(t.end)}+${n}`;
}, ma = (t) => `${bd({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function qm({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l
}) {
  const [c, d] = ut([]), [p, f] = ut([{ id: oe, desc: !1 }]), [w, g] = ut({}), v = Ct(
    () => t.flatMap((R) => R.data.map(($) => ({
      ...$,
      source: R.source
    }))),
    [t]
  ), m = Ct(
    () => gd(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: i
      },
      n
    ),
    [r, a, i, n]
  );
  se(() => {
    c.includes(fe) ? f([
      { id: fe, desc: !1 },
      { id: oe, desc: !1 }
    ]) : f([{ id: oe, desc: !1 }]);
  }, [c]);
  const h = ci({
    data: v,
    columns: m,
    state: {
      grouping: c,
      sorting: p,
      rowSelection: w
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: Rl(),
    getGroupedRowModel: Ol(),
    getCoreRowModel: pi(),
    getSortedRowModel: di(),
    getRowId: ma,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  se(() => {
    if (l) {
      const R = h.getSelectedRowModel().rowsById, $ = Object.keys(R);
      if ($.length === 1) {
        const L = v.find((D) => ma(D) === $[0]) || void 0;
        L && l(L);
      }
    }
  }, [w, v, l, h]);
  const k = o ?? md, T = a ?? qi, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [oe] },
    { label: `Group by ${T}`, value: [fe] },
    {
      label: `Group by ${k} and ${T}`,
      value: [oe, fe]
    },
    {
      label: `Group by ${T} and ${k}`,
      value: [fe, oe]
    }
  ], E = (R) => {
    d(JSON.parse(R));
  }, b = (R, $) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()($);
  }, _ = (R, $) => R.getIsGrouped() ? "" : N("banded-row", $ % 2 === 0 ? "even" : "odd"), F = (R, $, L) => {
    if (!((R == null ? void 0 : R.length) === 0 || $.depth < L.column.getGroupedIndex())) {
      if ($.getIsGrouped())
        switch ($.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch ($.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ x("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ x(
      Ve,
      {
        value: JSON.stringify(c),
        onValueChange: (R) => {
          E(R);
        },
        children: [
          /* @__PURE__ */ s(Ne, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ s(ze, {}) }),
          /* @__PURE__ */ s(ke, { position: "item-aligned", children: /* @__PURE__ */ s(Rc, { children: C.map((R) => /* @__PURE__ */ s(Bt, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ x(lr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ s(cr, { children: h.getHeaderGroups().map((R) => /* @__PURE__ */ s(ie, { children: R.headers.filter(($) => $.column.columnDef.header).map(($) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ s(yn, { colSpan: $.colSpan, className: "top-0 tw-sticky", children: $.isPlaceholder ? void 0 : /* @__PURE__ */ x("div", { children: [
          $.column.getCanGroup() ? /* @__PURE__ */ s(
            wt,
            {
              variant: "ghost",
              title: `Toggle grouping by ${$.column.columnDef.header}`,
              onClick: $.column.getToggleGroupingHandler(),
              type: "button",
              children: $.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          wn($.column.columnDef.header, $.getContext())
        ] }) }, $.id)
      )) }, R.id)) }),
      /* @__PURE__ */ s(dr, { children: h.getRowModel().rows.map((R, $) => {
        const L = xt();
        return /* @__PURE__ */ s(
          ie,
          {
            "data-state": R.getIsSelected() ? "selected" : "",
            className: N(_(R, $)),
            onClick: (D) => b(R, D),
            children: R.getVisibleCells().map((D) => {
              if (!(D.getIsPlaceholder() || D.column.columnDef.enableGrouping && !D.getIsGrouped() && (D.column.columnDef.id !== fe || !n)))
                return /* @__PURE__ */ s(
                  Fe,
                  {
                    className: N(
                      D.column.columnDef.id,
                      "tw-p-[1px]",
                      F(c, R, D)
                    ),
                    children: D.getIsGrouped() ? /* @__PURE__ */ x(
                      wt,
                      {
                        variant: "link",
                        onClick: R.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          R.getIsExpanded() && /* @__PURE__ */ s(or, {}),
                          !R.getIsExpanded() && (L === "ltr" ? /* @__PURE__ */ s(oi, {}) : /* @__PURE__ */ s(ul, {})),
                          " ",
                          wn(D.column.columnDef.cell, D.getContext()),
                          " (",
                          R.subRows.length,
                          ")"
                        ]
                      }
                    ) : wn(D.column.columnDef.cell, D.getContext())
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
const Dr = {
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
function Km({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: r = {}
}) {
  const o = {
    ...Dr,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([i, l]) => [
          i,
          i === l && i in Dr ? Dr[i] : l
        ]
      )
    )
  }, a = xt();
  return /* @__PURE__ */ x(
    Ve,
    {
      value: `${e}`,
      onValueChange: (i) => n(
        i === "undefined" ? void 0 : parseInt(i, 10)
      ),
      children: [
        /* @__PURE__ */ s(Ne, { className: "pr-twp tw-w-auto", children: /* @__PURE__ */ s(
          ze,
          {
            placeholder: o[pt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ s(
          ke,
          {
            align: a === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((i) => /* @__PURE__ */ s(Bt, { value: `${i}`, children: o[pt(i)] }, `${i}`))
          }
        )
      ]
    }
  );
}
function Jm({ children: t }) {
  return /* @__PURE__ */ s("div", { className: "pr-twp tw-grid", children: t });
}
function Zm({
  primary: t,
  secondary: e,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ s("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ s("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ s("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ s("div", { children: n })
  ] });
}
function Qm({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ x("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ s("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ s("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ s(Co, {}) : ""
  ] });
}
function th({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ s("div", { id: t, className: e, children: n.map((i) => /* @__PURE__ */ x("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ s(
      To,
      {
        className: "tw-me-2 tw-align-middle",
        checked: r.includes(i),
        onCheckedChange: (l) => o(i, l)
      }
    ),
    /* @__PURE__ */ s(At, { children: a ? a(i) : i })
  ] }, i)) });
}
function vd(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function yd(t) {
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
var Oo = {}, Ki = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Ki);
var xd = Ki.exports, jr = {};
function Ro(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return t(...r) || e(...r);
  };
}
function P() {
  return P = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, P.apply(this, arguments);
}
function ge(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function Ji(t) {
  if (!ge(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((n) => {
    e[n] = Ji(t[n]);
  }), e;
}
function Qt(t, e, n = {
  clone: !0
}) {
  const r = n.clone ? P({}, t) : t;
  return ge(t) && ge(e) && Object.keys(e).forEach((o) => {
    o !== "__proto__" && (ge(e[o]) && o in t && ge(t[o]) ? r[o] = Qt(t[o], e[o], n) : n.clone ? r[o] = ge(e[o]) ? Ji(e[o]) : e[o] : r[o] = e[o]);
  }), r;
}
var no = { exports: {} }, zn = { exports: {} }, it = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ha;
function Nd() {
  if (ha) return it;
  ha = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, i = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, p = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, v = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, k = t ? Symbol.for("react.responder") : 60118, T = t ? Symbol.for("react.scope") : 60119;
  function C(b) {
    if (typeof b == "object" && b !== null) {
      var _ = b.$$typeof;
      switch (_) {
        case e:
          switch (b = b.type, b) {
            case c:
            case d:
            case r:
            case a:
            case o:
            case f:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case l:
                case p:
                case v:
                case g:
                case i:
                  return b;
                default:
                  return _;
              }
          }
        case n:
          return _;
      }
    }
  }
  function E(b) {
    return C(b) === d;
  }
  return it.AsyncMode = c, it.ConcurrentMode = d, it.ContextConsumer = l, it.ContextProvider = i, it.Element = e, it.ForwardRef = p, it.Fragment = r, it.Lazy = v, it.Memo = g, it.Portal = n, it.Profiler = a, it.StrictMode = o, it.Suspense = f, it.isAsyncMode = function(b) {
    return E(b) || C(b) === c;
  }, it.isConcurrentMode = E, it.isContextConsumer = function(b) {
    return C(b) === l;
  }, it.isContextProvider = function(b) {
    return C(b) === i;
  }, it.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === e;
  }, it.isForwardRef = function(b) {
    return C(b) === p;
  }, it.isFragment = function(b) {
    return C(b) === r;
  }, it.isLazy = function(b) {
    return C(b) === v;
  }, it.isMemo = function(b) {
    return C(b) === g;
  }, it.isPortal = function(b) {
    return C(b) === n;
  }, it.isProfiler = function(b) {
    return C(b) === a;
  }, it.isStrictMode = function(b) {
    return C(b) === o;
  }, it.isSuspense = function(b) {
    return C(b) === f;
  }, it.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === d || b === a || b === o || b === f || b === w || typeof b == "object" && b !== null && (b.$$typeof === v || b.$$typeof === g || b.$$typeof === i || b.$$typeof === l || b.$$typeof === p || b.$$typeof === h || b.$$typeof === k || b.$$typeof === T || b.$$typeof === m);
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
var ga;
function kd() {
  return ga || (ga = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, i = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, p = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, v = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, k = t ? Symbol.for("react.responder") : 60118, T = t ? Symbol.for("react.scope") : 60119;
    function C(M) {
      return typeof M == "string" || typeof M == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      M === r || M === d || M === a || M === o || M === f || M === w || typeof M == "object" && M !== null && (M.$$typeof === v || M.$$typeof === g || M.$$typeof === i || M.$$typeof === l || M.$$typeof === p || M.$$typeof === h || M.$$typeof === k || M.$$typeof === T || M.$$typeof === m);
    }
    function E(M) {
      if (typeof M == "object" && M !== null) {
        var Nt = M.$$typeof;
        switch (Nt) {
          case e:
            var V = M.type;
            switch (V) {
              case c:
              case d:
              case r:
              case a:
              case o:
              case f:
                return V;
              default:
                var yt = V && V.$$typeof;
                switch (yt) {
                  case l:
                  case p:
                  case v:
                  case g:
                  case i:
                    return yt;
                  default:
                    return Nt;
                }
            }
          case n:
            return Nt;
        }
      }
    }
    var b = c, _ = d, F = l, R = i, $ = e, L = p, D = r, I = v, A = g, H = n, G = a, B = o, Z = f, at = !1;
    function rt(M) {
      return at || (at = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), y(M) || E(M) === c;
    }
    function y(M) {
      return E(M) === d;
    }
    function O(M) {
      return E(M) === l;
    }
    function U(M) {
      return E(M) === i;
    }
    function X(M) {
      return typeof M == "object" && M !== null && M.$$typeof === e;
    }
    function z(M) {
      return E(M) === p;
    }
    function K(M) {
      return E(M) === r;
    }
    function W(M) {
      return E(M) === v;
    }
    function q(M) {
      return E(M) === g;
    }
    function Y(M) {
      return E(M) === n;
    }
    function J(M) {
      return E(M) === a;
    }
    function Q(M) {
      return E(M) === o;
    }
    function dt(M) {
      return E(M) === f;
    }
    st.AsyncMode = b, st.ConcurrentMode = _, st.ContextConsumer = F, st.ContextProvider = R, st.Element = $, st.ForwardRef = L, st.Fragment = D, st.Lazy = I, st.Memo = A, st.Portal = H, st.Profiler = G, st.StrictMode = B, st.Suspense = Z, st.isAsyncMode = rt, st.isConcurrentMode = y, st.isContextConsumer = O, st.isContextProvider = U, st.isElement = X, st.isForwardRef = z, st.isFragment = K, st.isLazy = W, st.isMemo = q, st.isPortal = Y, st.isProfiler = J, st.isStrictMode = Q, st.isSuspense = dt, st.isValidElementType = C, st.typeOf = E;
  }()), st;
}
var ba;
function Zi() {
  return ba || (ba = 1, process.env.NODE_ENV === "production" ? zn.exports = Nd() : zn.exports = kd()), zn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Br, va;
function Ed() {
  if (va) return Br;
  va = 1;
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
      for (var i = {}, l = 0; l < 10; l++)
        i["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(i).map(function(p) {
        return i[p];
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
  return Br = o() ? Object.assign : function(a, i) {
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
  }, Br;
}
var Vr, ya;
function _o() {
  if (ya) return Vr;
  ya = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Vr = t, Vr;
}
var zr, xa;
function Qi() {
  return xa || (xa = 1, zr = Function.call.bind(Object.prototype.hasOwnProperty)), zr;
}
var Fr, Na;
function Sd() {
  if (Na) return Fr;
  Na = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = _o(), n = {}, r = Qi();
    t = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, l, c, d) {
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
            f = a[p](i, p, c, l, null, e);
          } catch (v) {
            f = v;
          }
          if (f && !(f instanceof Error) && t(
            (c || "React class") + ": type specification of " + l + " `" + p + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in n)) {
            n[f.message] = !0;
            var g = d ? d() : "";
            t(
              "Failed " + l + " type: " + f.message + (g ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Fr = o, Fr;
}
var Lr, ka;
function Td() {
  if (ka) return Lr;
  ka = 1;
  var t = Zi(), e = Ed(), n = _o(), r = Qi(), o = Sd(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(l) {
    var c = "Warning: " + l;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function i() {
    return null;
  }
  return Lr = function(l, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, p = "@@iterator";
    function f(y) {
      var O = y && (d && y[d] || y[p]);
      if (typeof O == "function")
        return O;
    }
    var w = "<<anonymous>>", g = {
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
      element: E(),
      elementType: b(),
      instanceOf: _,
      node: L(),
      objectOf: R,
      oneOf: F,
      oneOfType: $,
      shape: I,
      exact: A
    };
    function v(y, O) {
      return y === O ? y !== 0 || 1 / y === 1 / O : y !== y && O !== O;
    }
    function m(y, O) {
      this.message = y, this.data = O && typeof O == "object" ? O : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function h(y) {
      if (process.env.NODE_ENV !== "production")
        var O = {}, U = 0;
      function X(K, W, q, Y, J, Q, dt) {
        if (Y = Y || w, Q = Q || q, dt !== n) {
          if (c) {
            var M = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw M.name = "Invariant Violation", M;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Nt = Y + ":" + q;
            !O[Nt] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + Q + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), O[Nt] = !0, U++);
          }
        }
        return W[q] == null ? K ? W[q] === null ? new m("The " + J + " `" + Q + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new m("The " + J + " `" + Q + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : y(W, q, Y, J, Q);
      }
      var z = X.bind(null, !1);
      return z.isRequired = X.bind(null, !0), z;
    }
    function k(y) {
      function O(U, X, z, K, W, q) {
        var Y = U[X], J = B(Y);
        if (J !== y) {
          var Q = Z(Y);
          return new m(
            "Invalid " + K + " `" + W + "` of type " + ("`" + Q + "` supplied to `" + z + "`, expected ") + ("`" + y + "`."),
            { expectedType: y }
          );
        }
        return null;
      }
      return h(O);
    }
    function T() {
      return h(i);
    }
    function C(y) {
      function O(U, X, z, K, W) {
        if (typeof y != "function")
          return new m("Property `" + W + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var q = U[X];
        if (!Array.isArray(q)) {
          var Y = B(q);
          return new m("Invalid " + K + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected an array."));
        }
        for (var J = 0; J < q.length; J++) {
          var Q = y(q, J, z, K, W + "[" + J + "]", n);
          if (Q instanceof Error)
            return Q;
        }
        return null;
      }
      return h(O);
    }
    function E() {
      function y(O, U, X, z, K) {
        var W = O[U];
        if (!l(W)) {
          var q = B(W);
          return new m("Invalid " + z + " `" + K + "` of type " + ("`" + q + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(y);
    }
    function b() {
      function y(O, U, X, z, K) {
        var W = O[U];
        if (!t.isValidElementType(W)) {
          var q = B(W);
          return new m("Invalid " + z + " `" + K + "` of type " + ("`" + q + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(y);
    }
    function _(y) {
      function O(U, X, z, K, W) {
        if (!(U[X] instanceof y)) {
          var q = y.name || w, Y = rt(U[X]);
          return new m("Invalid " + K + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected ") + ("instance of `" + q + "`."));
        }
        return null;
      }
      return h(O);
    }
    function F(y) {
      if (!Array.isArray(y))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function O(U, X, z, K, W) {
        for (var q = U[X], Y = 0; Y < y.length; Y++)
          if (v(q, y[Y]))
            return null;
        var J = JSON.stringify(y, function(dt, M) {
          var Nt = Z(M);
          return Nt === "symbol" ? String(M) : M;
        });
        return new m("Invalid " + K + " `" + W + "` of value `" + String(q) + "` " + ("supplied to `" + z + "`, expected one of " + J + "."));
      }
      return h(O);
    }
    function R(y) {
      function O(U, X, z, K, W) {
        if (typeof y != "function")
          return new m("Property `" + W + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var q = U[X], Y = B(q);
        if (Y !== "object")
          return new m("Invalid " + K + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected an object."));
        for (var J in q)
          if (r(q, J)) {
            var Q = y(q, J, z, K, W + "." + J, n);
            if (Q instanceof Error)
              return Q;
          }
        return null;
      }
      return h(O);
    }
    function $(y) {
      if (!Array.isArray(y))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var O = 0; O < y.length; O++) {
        var U = y[O];
        if (typeof U != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + at(U) + " at index " + O + "."
          ), i;
      }
      function X(z, K, W, q, Y) {
        for (var J = [], Q = 0; Q < y.length; Q++) {
          var dt = y[Q], M = dt(z, K, W, q, Y, n);
          if (M == null)
            return null;
          M.data && r(M.data, "expectedType") && J.push(M.data.expectedType);
        }
        var Nt = J.length > 0 ? ", expected one of type [" + J.join(", ") + "]" : "";
        return new m("Invalid " + q + " `" + Y + "` supplied to " + ("`" + W + "`" + Nt + "."));
      }
      return h(X);
    }
    function L() {
      function y(O, U, X, z, K) {
        return H(O[U]) ? null : new m("Invalid " + z + " `" + K + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return h(y);
    }
    function D(y, O, U, X, z) {
      return new m(
        (y || "React class") + ": " + O + " type `" + U + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function I(y) {
      function O(U, X, z, K, W) {
        var q = U[X], Y = B(q);
        if (Y !== "object")
          return new m("Invalid " + K + " `" + W + "` of type `" + Y + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var J in y) {
          var Q = y[J];
          if (typeof Q != "function")
            return D(z, K, W, J, Z(Q));
          var dt = Q(q, J, z, K, W + "." + J, n);
          if (dt)
            return dt;
        }
        return null;
      }
      return h(O);
    }
    function A(y) {
      function O(U, X, z, K, W) {
        var q = U[X], Y = B(q);
        if (Y !== "object")
          return new m("Invalid " + K + " `" + W + "` of type `" + Y + "` " + ("supplied to `" + z + "`, expected `object`."));
        var J = e({}, U[X], y);
        for (var Q in J) {
          var dt = y[Q];
          if (r(y, Q) && typeof dt != "function")
            return D(z, K, W, Q, Z(dt));
          if (!dt)
            return new m(
              "Invalid " + K + " `" + W + "` key `" + Q + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(U[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(y), null, "  ")
            );
          var M = dt(q, Q, z, K, W + "." + Q, n);
          if (M)
            return M;
        }
        return null;
      }
      return h(O);
    }
    function H(y) {
      switch (typeof y) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !y;
        case "object":
          if (Array.isArray(y))
            return y.every(H);
          if (y === null || l(y))
            return !0;
          var O = f(y);
          if (O) {
            var U = O.call(y), X;
            if (O !== y.entries) {
              for (; !(X = U.next()).done; )
                if (!H(X.value))
                  return !1;
            } else
              for (; !(X = U.next()).done; ) {
                var z = X.value;
                if (z && !H(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function G(y, O) {
      return y === "symbol" ? !0 : O ? O["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && O instanceof Symbol : !1;
    }
    function B(y) {
      var O = typeof y;
      return Array.isArray(y) ? "array" : y instanceof RegExp ? "object" : G(O, y) ? "symbol" : O;
    }
    function Z(y) {
      if (typeof y > "u" || y === null)
        return "" + y;
      var O = B(y);
      if (O === "object") {
        if (y instanceof Date)
          return "date";
        if (y instanceof RegExp)
          return "regexp";
      }
      return O;
    }
    function at(y) {
      var O = Z(y);
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
    function rt(y) {
      return !y.constructor || !y.constructor.name ? w : y.constructor.name;
    }
    return g.checkPropTypes = o, g.resetWarningCache = o.resetWarningCache, g.PropTypes = g, g;
  }, Lr;
}
var Gr, Ea;
function Cd() {
  if (Ea) return Gr;
  Ea = 1;
  var t = _o();
  function e() {
  }
  function n() {
  }
  return n.resetWarningCache = e, Gr = function() {
    function r(i, l, c, d, p, f) {
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
  }, Gr;
}
if (process.env.NODE_ENV !== "production") {
  var Od = Zi(), Rd = !0;
  no.exports = Td()(Od.isElement, Rd);
} else
  no.exports = Cd()();
var _d = no.exports;
const u = /* @__PURE__ */ vd(_d);
function Pd(t) {
  const {
    prototype: e = {}
  } = t;
  return !!e.isReactComponent;
}
function ts(t, e, n, r, o) {
  const a = t[e], i = o || e;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Pd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Po = Ro(u.element, ts);
Po.isRequired = Ro(u.element.isRequired, ts);
const $d = "exact-prop: ​";
function Id(t) {
  return process.env.NODE_ENV === "production" ? t : P({}, t, {
    [$d]: (e) => {
      const n = Object.keys(e).filter((r) => !t.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Le(t) {
  let e = "https://mui.com/production-error/?code=" + t;
  for (let n = 1; n < arguments.length; n += 1)
    e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + t + "; visit " + e + " for the full message.";
}
var ro = { exports: {} }, lt = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sa;
function Md() {
  if (Sa) return lt;
  Sa = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function m(h) {
    if (typeof h == "object" && h !== null) {
      var k = h.$$typeof;
      switch (k) {
        case t:
          switch (h = h.type, h) {
            case n:
            case o:
            case r:
            case d:
            case p:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case i:
                case c:
                case w:
                case f:
                case a:
                  return h;
                default:
                  return k;
              }
          }
        case e:
          return k;
      }
    }
  }
  return lt.ContextConsumer = i, lt.ContextProvider = a, lt.Element = t, lt.ForwardRef = c, lt.Fragment = n, lt.Lazy = w, lt.Memo = f, lt.Portal = e, lt.Profiler = o, lt.StrictMode = r, lt.Suspense = d, lt.SuspenseList = p, lt.isAsyncMode = function() {
    return !1;
  }, lt.isConcurrentMode = function() {
    return !1;
  }, lt.isContextConsumer = function(h) {
    return m(h) === i;
  }, lt.isContextProvider = function(h) {
    return m(h) === a;
  }, lt.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, lt.isForwardRef = function(h) {
    return m(h) === c;
  }, lt.isFragment = function(h) {
    return m(h) === n;
  }, lt.isLazy = function(h) {
    return m(h) === w;
  }, lt.isMemo = function(h) {
    return m(h) === f;
  }, lt.isPortal = function(h) {
    return m(h) === e;
  }, lt.isProfiler = function(h) {
    return m(h) === o;
  }, lt.isStrictMode = function(h) {
    return m(h) === r;
  }, lt.isSuspense = function(h) {
    return m(h) === d;
  }, lt.isSuspenseList = function(h) {
    return m(h) === p;
  }, lt.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === d || h === p || h === g || typeof h == "object" && h !== null && (h.$$typeof === w || h.$$typeof === f || h.$$typeof === a || h.$$typeof === i || h.$$typeof === c || h.$$typeof === v || h.getModuleId !== void 0);
  }, lt.typeOf = m, lt;
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
var Ta;
function Ad() {
  return Ta || (Ta = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), v = !1, m = !1, h = !1, k = !1, T = !1, C;
    C = Symbol.for("react.module.reference");
    function E(V) {
      return !!(typeof V == "string" || typeof V == "function" || V === n || V === o || T || V === r || V === d || V === p || k || V === g || v || m || h || typeof V == "object" && V !== null && (V.$$typeof === w || V.$$typeof === f || V.$$typeof === a || V.$$typeof === i || V.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      V.$$typeof === C || V.getModuleId !== void 0));
    }
    function b(V) {
      if (typeof V == "object" && V !== null) {
        var yt = V.$$typeof;
        switch (yt) {
          case t:
            var Ut = V.type;
            switch (Ut) {
              case n:
              case o:
              case r:
              case d:
              case p:
                return Ut;
              default:
                var de = Ut && Ut.$$typeof;
                switch (de) {
                  case l:
                  case i:
                  case c:
                  case w:
                  case f:
                  case a:
                    return de;
                  default:
                    return yt;
                }
            }
          case e:
            return yt;
        }
      }
    }
    var _ = i, F = a, R = t, $ = c, L = n, D = w, I = f, A = e, H = o, G = r, B = d, Z = p, at = !1, rt = !1;
    function y(V) {
      return at || (at = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function O(V) {
      return rt || (rt = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(V) {
      return b(V) === i;
    }
    function X(V) {
      return b(V) === a;
    }
    function z(V) {
      return typeof V == "object" && V !== null && V.$$typeof === t;
    }
    function K(V) {
      return b(V) === c;
    }
    function W(V) {
      return b(V) === n;
    }
    function q(V) {
      return b(V) === w;
    }
    function Y(V) {
      return b(V) === f;
    }
    function J(V) {
      return b(V) === e;
    }
    function Q(V) {
      return b(V) === o;
    }
    function dt(V) {
      return b(V) === r;
    }
    function M(V) {
      return b(V) === d;
    }
    function Nt(V) {
      return b(V) === p;
    }
    ct.ContextConsumer = _, ct.ContextProvider = F, ct.Element = R, ct.ForwardRef = $, ct.Fragment = L, ct.Lazy = D, ct.Memo = I, ct.Portal = A, ct.Profiler = H, ct.StrictMode = G, ct.Suspense = B, ct.SuspenseList = Z, ct.isAsyncMode = y, ct.isConcurrentMode = O, ct.isContextConsumer = U, ct.isContextProvider = X, ct.isElement = z, ct.isForwardRef = K, ct.isFragment = W, ct.isLazy = q, ct.isMemo = Y, ct.isPortal = J, ct.isProfiler = Q, ct.isStrictMode = dt, ct.isSuspense = M, ct.isSuspenseList = Nt, ct.isValidElementType = E, ct.typeOf = b;
  }()), ct;
}
process.env.NODE_ENV === "production" ? ro.exports = Md() : ro.exports = Ad();
var Ca = ro.exports;
const Dd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function jd(t) {
  const e = `${t}`.match(Dd);
  return e && e[1] || "";
}
function es(t, e = "") {
  return t.displayName || t.name || jd(t) || e;
}
function Oa(t, e, n) {
  const r = es(e);
  return t.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Bd(t) {
  if (t != null) {
    if (typeof t == "string")
      return t;
    if (typeof t == "function")
      return es(t, "Component");
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Ca.ForwardRef:
          return Oa(t, t.render, "ForwardRef");
        case Ca.Memo:
          return Oa(t, t.type, "memo");
        default:
          return;
      }
  }
}
function xn(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = t[e], i = o || e;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const ns = u.oneOfType([u.func, u.object]);
function qt(t) {
  if (typeof t != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Le(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Vd(...t) {
  return t.reduce((e, n) => n == null ? e : function(...o) {
    e.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function zd(t, e = 166) {
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
function Fd(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${e}`) : null;
  };
}
function Ld(t, e) {
  var n, r;
  return /* @__PURE__ */ j.isValidElement(t) && e.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = t.type.muiName) != null ? n : (r = t.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function qn(t) {
  return t && t.ownerDocument || document;
}
function Gd(t) {
  return qn(t).defaultView || window;
}
function Ud(t, e) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = e ? P({}, e.propTypes) : null;
  return (o) => (a, i, l, c, d, ...p) => {
    const f = d || i, w = n == null ? void 0 : n[f];
    if (w) {
      const g = w(a, i, l, c, d, ...p);
      if (g)
        return g;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${f}\` of \`${t}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Kn(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
const Ge = typeof window < "u" ? j.useLayoutEffect : j.useEffect;
let Ra = 0;
function Xd(t) {
  const [e, n] = j.useState(t), r = t || e;
  return j.useEffect(() => {
    e == null && (Ra += 1, n(`mui-${Ra}`));
  }, [e]), r;
}
const _a = j.useId;
function rs(t) {
  if (_a !== void 0) {
    const e = _a();
    return t ?? e;
  }
  return Xd(t);
}
function Hd(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || e;
  return typeof t[e] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function os({
  controlled: t,
  default: e,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = j.useRef(t !== void 0), [a, i] = j.useState(e), l = o ? t : a;
  if (process.env.NODE_ENV !== "production") {
    j.useEffect(() => {
      o !== (t !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, t]);
    const {
      current: d
    } = j.useRef(e);
    j.useEffect(() => {
      !o && d !== e && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(e)]);
  }
  const c = j.useCallback((d) => {
    o || i(d);
  }, []);
  return [l, c];
}
function oo(t) {
  const e = j.useRef(t);
  return Ge(() => {
    e.current = t;
  }), j.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, e.current)(...n)
  )).current;
}
function Ee(...t) {
  return j.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
      Kn(n, e);
    });
  }, t);
}
const Pa = {};
function Yd(t, e) {
  const n = j.useRef(Pa);
  return n.current === Pa && (n.current = t(e)), n;
}
const Wd = [];
function qd(t) {
  j.useEffect(t, Wd);
}
class On {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new On();
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
function dn() {
  const t = Yd(On.create).current;
  return qd(t.disposeEffect), t;
}
let wr = !0, ao = !1;
const Kd = new On(), Jd = {
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
function Zd(t) {
  const {
    type: e,
    tagName: n
  } = t;
  return !!(n === "INPUT" && Jd[e] && !t.readOnly || n === "TEXTAREA" && !t.readOnly || t.isContentEditable);
}
function Qd(t) {
  t.metaKey || t.altKey || t.ctrlKey || (wr = !0);
}
function Ur() {
  wr = !1;
}
function tp() {
  this.visibilityState === "hidden" && ao && (wr = !0);
}
function ep(t) {
  t.addEventListener("keydown", Qd, !0), t.addEventListener("mousedown", Ur, !0), t.addEventListener("pointerdown", Ur, !0), t.addEventListener("touchstart", Ur, !0), t.addEventListener("visibilitychange", tp, !0);
}
function np(t) {
  const {
    target: e
  } = t;
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return wr || Zd(e);
}
function as() {
  const t = j.useCallback((o) => {
    o != null && ep(o.ownerDocument);
  }, []), e = j.useRef(!1);
  function n() {
    return e.current ? (ao = !0, Kd.start(100, () => {
      ao = !1;
    }), e.current = !1, !0) : !1;
  }
  function r(o) {
    return np(o) ? (e.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: e,
    onFocus: r,
    onBlur: n,
    ref: t
  };
}
function is(t, e) {
  const n = P({}, e);
  return Object.keys(t).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = P({}, t[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = t[r] || {}, a = e[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = P({}, a), Object.keys(o).forEach((i) => {
        n[r][i] = is(o[i], a[i]);
      }));
    } else n[r] === void 0 && (n[r] = t[r]);
  }), n;
}
function $o(t, e, n = void 0) {
  const r = {};
  return Object.keys(t).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = t[o].reduce((a, i) => {
        if (i) {
          const l = e(i);
          l !== "" && a.push(l), n && n[i] && a.push(n[i]);
        }
        return a;
      }, []).join(" ");
    }
  ), r;
}
const $a = (t) => t, rp = () => {
  let t = $a;
  return {
    configure(e) {
      t = e;
    },
    generate(e) {
      return t(e);
    },
    reset() {
      t = $a;
    }
  };
}, ss = rp(), ls = {
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
function fr(t, e, n = "Mui") {
  const r = ls[e];
  return r ? `${n}-${r}` : `${ss.generate(t)}-${e}`;
}
function cs(t, e, n = "Mui") {
  const r = {};
  return e.forEach((o) => {
    r[o] = fr(t, o, n);
  }), r;
}
function op(t, e = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(e, Math.min(t, n));
}
function kt(t, e) {
  if (t == null) return {};
  var n = {}, r = Object.keys(t), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(e.indexOf(o) >= 0) && (n[o] = t[o]);
  return n;
}
const ap = ["values", "unit", "step"], ip = (t) => {
  const e = Object.keys(t).map((n) => ({
    key: n,
    val: t[n]
  })) || [];
  return e.sort((n, r) => n.val - r.val), e.reduce((n, r) => P({}, n, {
    [r.key]: r.val
  }), {});
};
function sp(t) {
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
  } = t, o = kt(t, ap), a = ip(e), i = Object.keys(a);
  function l(w) {
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n})`;
  }
  function c(w) {
    return `@media (max-width:${(typeof e[w] == "number" ? e[w] : w) - r / 100}${n})`;
  }
  function d(w, g) {
    const v = i.indexOf(g);
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n}) and (max-width:${(v !== -1 && typeof e[i[v]] == "number" ? e[i[v]] : g) - r / 100}${n})`;
  }
  function p(w) {
    return i.indexOf(w) + 1 < i.length ? d(w, i[i.indexOf(w) + 1]) : l(w);
  }
  function f(w) {
    const g = i.indexOf(w);
    return g === 0 ? l(i[1]) : g === i.length - 1 ? c(i[g]) : d(w, i[i.indexOf(w) + 1]).replace("@media", "@media not all and");
  }
  return P({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: d,
    only: p,
    not: f,
    unit: n
  }, o);
}
const lp = {
  borderRadius: 4
}, le = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.string, u.object, u.array]) : {};
function mn(t, e) {
  return e ? Qt(t, e, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : t;
}
const Io = {
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
}, Ia = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (t) => `@media (min-width:${Io[t]}px)`
};
function te(t, e, n) {
  const r = t.theme || {};
  if (Array.isArray(e)) {
    const a = r.breakpoints || Ia;
    return e.reduce((i, l, c) => (i[a.up(a.keys[c])] = n(e[c]), i), {});
  }
  if (typeof e == "object") {
    const a = r.breakpoints || Ia;
    return Object.keys(e).reduce((i, l) => {
      if (Object.keys(a.values || Io).indexOf(l) !== -1) {
        const c = a.up(l);
        i[c] = n(e[l], l);
      } else {
        const c = l;
        i[c] = e[c];
      }
      return i;
    }, {});
  }
  return n(e);
}
function cp(t = {}) {
  var e;
  return ((e = t.keys) == null ? void 0 : e.reduce((r, o) => {
    const a = t.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function dp(t, e) {
  return t.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, e);
}
function mr(t, e, n = !0) {
  if (!e || typeof e != "string")
    return null;
  if (t && t.vars && n) {
    const r = `vars.${e}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, t);
    if (r != null)
      return r;
  }
  return e.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, t);
}
function Jn(t, e, n, r = n) {
  let o;
  return typeof t == "function" ? o = t(n) : Array.isArray(t) ? o = t[n] || r : o = mr(t, n) || r, e && (o = e(o, r, t)), o;
}
function vt(t) {
  const {
    prop: e,
    cssProperty: n = t.prop,
    themeKey: r,
    transform: o
  } = t, a = (i) => {
    if (i[e] == null)
      return null;
    const l = i[e], c = i.theme, d = mr(c, r) || {};
    return te(i, l, (f) => {
      let w = Jn(d, o, f);
      return f === w && typeof f == "string" && (w = Jn(d, o, `${e}${f === "default" ? "" : qt(f)}`, f)), n === !1 ? w : {
        [n]: w
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [e]: le
  } : {}, a.filterProps = [e], a;
}
function pp(t) {
  const e = {};
  return (n) => (e[n] === void 0 && (e[n] = t(n)), e[n]);
}
const up = {
  m: "margin",
  p: "padding"
}, wp = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ma = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, fp = pp((t) => {
  if (t.length > 2)
    if (Ma[t])
      t = Ma[t];
    else
      return [t];
  const [e, n] = t.split(""), r = up[e], o = wp[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), hr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], gr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], mp = [...hr, ...gr];
function Rn(t, e, n, r) {
  var o;
  const a = (o = mr(t, e, !1)) != null ? o : n;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${e}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${e}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${e}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ds(t) {
  return Rn(t, "spacing", 8, "spacing");
}
function _n(t, e) {
  if (typeof e == "string" || e == null)
    return e;
  const n = Math.abs(e), r = t(n);
  return e >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function hp(t, e) {
  return (n) => t.reduce((r, o) => (r[o] = _n(e, n), r), {});
}
function gp(t, e, n, r) {
  if (e.indexOf(n) === -1)
    return null;
  const o = fp(n), a = hp(o, r), i = t[n];
  return te(t, i, a);
}
function ps(t, e) {
  const n = ds(t.theme);
  return Object.keys(t).map((r) => gp(t, e, r, n)).reduce(mn, {});
}
function ht(t) {
  return ps(t, hr);
}
ht.propTypes = process.env.NODE_ENV !== "production" ? hr.reduce((t, e) => (t[e] = le, t), {}) : {};
ht.filterProps = hr;
function gt(t) {
  return ps(t, gr);
}
gt.propTypes = process.env.NODE_ENV !== "production" ? gr.reduce((t, e) => (t[e] = le, t), {}) : {};
gt.filterProps = gr;
process.env.NODE_ENV !== "production" && mp.reduce((t, e) => (t[e] = le, t), {});
function bp(t = 8) {
  if (t.mui)
    return t;
  const e = ds({
    spacing: t
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const i = e(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return n.mui = !0, n;
}
function br(...t) {
  const e = t.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => e[a] ? mn(o, e[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? t.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = t.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Vt(t) {
  return typeof t != "number" ? t : `${t}px solid`;
}
function Gt(t, e) {
  return vt({
    prop: t,
    themeKey: "borders",
    transform: e
  });
}
const vp = Gt("border", Vt), yp = Gt("borderTop", Vt), xp = Gt("borderRight", Vt), Np = Gt("borderBottom", Vt), kp = Gt("borderLeft", Vt), Ep = Gt("borderColor"), Sp = Gt("borderTopColor"), Tp = Gt("borderRightColor"), Cp = Gt("borderBottomColor"), Op = Gt("borderLeftColor"), Rp = Gt("outline", Vt), _p = Gt("outlineColor"), vr = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = Rn(t.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: _n(e, r)
    });
    return te(t, t.borderRadius, n);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: le
} : {};
vr.filterProps = ["borderRadius"];
br(vp, yp, xp, Np, kp, Ep, Sp, Tp, Cp, Op, vr, Rp, _p);
const yr = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = Rn(t.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: _n(e, r)
    });
    return te(t, t.gap, n);
  }
  return null;
};
yr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: le
} : {};
yr.filterProps = ["gap"];
const xr = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = Rn(t.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: _n(e, r)
    });
    return te(t, t.columnGap, n);
  }
  return null;
};
xr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: le
} : {};
xr.filterProps = ["columnGap"];
const Nr = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = Rn(t.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: _n(e, r)
    });
    return te(t, t.rowGap, n);
  }
  return null;
};
Nr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: le
} : {};
Nr.filterProps = ["rowGap"];
const Pp = vt({
  prop: "gridColumn"
}), $p = vt({
  prop: "gridRow"
}), Ip = vt({
  prop: "gridAutoFlow"
}), Mp = vt({
  prop: "gridAutoColumns"
}), Ap = vt({
  prop: "gridAutoRows"
}), Dp = vt({
  prop: "gridTemplateColumns"
}), jp = vt({
  prop: "gridTemplateRows"
}), Bp = vt({
  prop: "gridTemplateAreas"
}), Vp = vt({
  prop: "gridArea"
});
br(yr, xr, Nr, Pp, $p, Ip, Mp, Ap, Dp, jp, Bp, Vp);
function Be(t, e) {
  return e === "grey" ? e : t;
}
const zp = vt({
  prop: "color",
  themeKey: "palette",
  transform: Be
}), Fp = vt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Be
}), Lp = vt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Be
});
br(zp, Fp, Lp);
function Mt(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const Gp = vt({
  prop: "width",
  transform: Mt
}), Mo = (t) => {
  if (t.maxWidth !== void 0 && t.maxWidth !== null) {
    const e = (n) => {
      var r, o;
      const a = ((r = t.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Io[n];
      return a ? ((o = t.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${t.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Mt(n)
      };
    };
    return te(t, t.maxWidth, e);
  }
  return null;
};
Mo.filterProps = ["maxWidth"];
const Up = vt({
  prop: "minWidth",
  transform: Mt
}), Xp = vt({
  prop: "height",
  transform: Mt
}), Hp = vt({
  prop: "maxHeight",
  transform: Mt
}), Yp = vt({
  prop: "minHeight",
  transform: Mt
});
vt({
  prop: "size",
  cssProperty: "width",
  transform: Mt
});
vt({
  prop: "size",
  cssProperty: "height",
  transform: Mt
});
const Wp = vt({
  prop: "boxSizing"
});
br(Gp, Mo, Up, Xp, Hp, Yp, Wp);
const Ao = {
  // borders
  border: {
    themeKey: "borders",
    transform: Vt
  },
  borderTop: {
    themeKey: "borders",
    transform: Vt
  },
  borderRight: {
    themeKey: "borders",
    transform: Vt
  },
  borderBottom: {
    themeKey: "borders",
    transform: Vt
  },
  borderLeft: {
    themeKey: "borders",
    transform: Vt
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
    transform: Vt
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: vr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Be
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Be
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Be
  },
  // spacing
  p: {
    style: gt
  },
  pt: {
    style: gt
  },
  pr: {
    style: gt
  },
  pb: {
    style: gt
  },
  pl: {
    style: gt
  },
  px: {
    style: gt
  },
  py: {
    style: gt
  },
  padding: {
    style: gt
  },
  paddingTop: {
    style: gt
  },
  paddingRight: {
    style: gt
  },
  paddingBottom: {
    style: gt
  },
  paddingLeft: {
    style: gt
  },
  paddingX: {
    style: gt
  },
  paddingY: {
    style: gt
  },
  paddingInline: {
    style: gt
  },
  paddingInlineStart: {
    style: gt
  },
  paddingInlineEnd: {
    style: gt
  },
  paddingBlock: {
    style: gt
  },
  paddingBlockStart: {
    style: gt
  },
  paddingBlockEnd: {
    style: gt
  },
  m: {
    style: ht
  },
  mt: {
    style: ht
  },
  mr: {
    style: ht
  },
  mb: {
    style: ht
  },
  ml: {
    style: ht
  },
  mx: {
    style: ht
  },
  my: {
    style: ht
  },
  margin: {
    style: ht
  },
  marginTop: {
    style: ht
  },
  marginRight: {
    style: ht
  },
  marginBottom: {
    style: ht
  },
  marginLeft: {
    style: ht
  },
  marginX: {
    style: ht
  },
  marginY: {
    style: ht
  },
  marginInline: {
    style: ht
  },
  marginInlineStart: {
    style: ht
  },
  marginInlineEnd: {
    style: ht
  },
  marginBlock: {
    style: ht
  },
  marginBlockStart: {
    style: ht
  },
  marginBlockEnd: {
    style: ht
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
    style: yr
  },
  rowGap: {
    style: Nr
  },
  columnGap: {
    style: xr
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
    transform: Mt
  },
  maxWidth: {
    style: Mo
  },
  minWidth: {
    transform: Mt
  },
  height: {
    transform: Mt
  },
  maxHeight: {
    transform: Mt
  },
  minHeight: {
    transform: Mt
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
function qp(...t) {
  const e = t.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(e);
  return t.every((r) => n.size === Object.keys(r).length);
}
function Kp(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Jp() {
  function t(n, r, o, a) {
    const i = {
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
    const w = mr(o, d) || {};
    return f ? f(i) : te(i, r, (v) => {
      let m = Jn(w, p, v);
      return v === m && typeof v == "string" && (m = Jn(w, p, `${n}${v === "default" ? "" : qt(v)}`, v)), c === !1 ? m : {
        [c]: m
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
    const i = (r = a.unstable_sxConfig) != null ? r : Ao;
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const p = cp(a.breakpoints), f = Object.keys(p);
      let w = p;
      return Object.keys(d).forEach((g) => {
        const v = Kp(d[g], a);
        if (v != null)
          if (typeof v == "object")
            if (i[g])
              w = mn(w, t(g, v, a, i));
            else {
              const m = te({
                theme: a
              }, v, (h) => ({
                [g]: h
              }));
              qp(m, v) ? w[g] = e({
                sx: v,
                theme: a
              }) : w = mn(w, m);
            }
          else
            w = mn(w, t(g, v, a, i));
      }), dp(f, w);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return e;
}
const kr = Jp();
kr.filterProps = ["sx"];
function Zp(t, e) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(t).replace(/(\[[^\]]+\])/, "*:where($1)")]: e
  } : n.palette.mode === t ? e : {};
}
const Qp = ["breakpoints", "palette", "spacing", "shape"];
function Do(t = {}, ...e) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = t, i = kt(t, Qp), l = sp(n), c = bp(o);
  let d = Qt({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: P({
      mode: "light"
    }, r),
    spacing: c,
    shape: P({}, lp, a)
  }, i);
  return d.applyStyles = Zp, d = e.reduce((p, f) => Qt(p, f), d), d.unstable_sxConfig = P({}, Ao, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(f) {
    return kr({
      sx: f,
      theme: this
    });
  }, d;
}
function tu(t) {
  return Object.keys(t).length === 0;
}
function us(t = null) {
  const e = j.useContext(Pl);
  return !e || tu(e) ? t : e;
}
const eu = Do();
function ws(t = eu) {
  return us(t);
}
const nu = ["ownerState"], ru = ["variants"], ou = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function au(t) {
  return Object.keys(t).length === 0;
}
function iu(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96;
}
function Hn(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const su = Do(), Aa = (t) => t && t.charAt(0).toLowerCase() + t.slice(1);
function Fn({
  defaultTheme: t,
  theme: e,
  themeId: n
}) {
  return au(e) ? t : e[n] || e;
}
function lu(t) {
  return t ? (e, n) => n[t] : null;
}
function Yn(t, e) {
  let {
    ownerState: n
  } = e, r = kt(e, nu);
  const o = typeof t == "function" ? t(P({
    ownerState: n
  }, r)) : t;
  if (Array.isArray(o))
    return o.flatMap((a) => Yn(a, P({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = kt(o, ru);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props(P({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((p) => {
        (n == null ? void 0 : n[p]) !== c.props[p] && r[p] !== c.props[p] && (d = !1);
      }), d && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(P({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function cu(t = {}) {
  const {
    themeId: e,
    defaultTheme: n = su,
    rootShouldForwardProp: r = Hn,
    slotShouldForwardProp: o = Hn
  } = t, a = (i) => kr(P({}, i, {
    theme: Fn(P({}, i, {
      defaultTheme: n,
      themeId: e
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    $l(i, (b) => b.filter((_) => !(_ != null && _.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: p,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: w = lu(Aa(d))
    } = l, g = kt(l, ou), v = p !== void 0 ? p : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), m = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${Aa(d || "Root")}`);
    let k = Hn;
    d === "Root" || d === "root" ? k = r : d ? k = o : iu(i) && (k = void 0);
    const T = _l(i, P({
      shouldForwardProp: k,
      label: h
    }, g)), C = (b) => typeof b == "function" && b.__emotion_real !== b || ge(b) ? (_) => Yn(b, P({}, _, {
      theme: Fn({
        theme: _.theme,
        defaultTheme: n,
        themeId: e
      })
    })) : b, E = (b, ..._) => {
      let F = C(b);
      const R = _ ? _.map(C) : [];
      c && w && R.push((D) => {
        const I = Fn(P({}, D, {
          defaultTheme: n,
          themeId: e
        }));
        if (!I.components || !I.components[c] || !I.components[c].styleOverrides)
          return null;
        const A = I.components[c].styleOverrides, H = {};
        return Object.entries(A).forEach(([G, B]) => {
          H[G] = Yn(B, P({}, D, {
            theme: I
          }));
        }), w(D, H);
      }), c && !v && R.push((D) => {
        var I;
        const A = Fn(P({}, D, {
          defaultTheme: n,
          themeId: e
        })), H = A == null || (I = A.components) == null || (I = I[c]) == null ? void 0 : I.variants;
        return Yn({
          variants: H
        }, P({}, D, {
          theme: A
        }));
      }), m || R.push(a);
      const $ = R.length - _.length;
      if (Array.isArray(b) && $ > 0) {
        const D = new Array($).fill("");
        F = [...b, ...D], F.raw = [...b.raw, ...D];
      }
      const L = T(F, ...R);
      if (process.env.NODE_ENV !== "production") {
        let D;
        c && (D = `${c}${qt(d || "")}`), D === void 0 && (D = `Styled(${Bd(i)})`), L.displayName = D;
      }
      return i.muiName && (L.muiName = i.muiName), L;
    };
    return T.withConfig && (E.withConfig = T.withConfig), E;
  };
}
function du(t) {
  const {
    theme: e,
    name: n,
    props: r
  } = t;
  return !e || !e.components || !e.components[n] || !e.components[n].defaultProps ? r : is(e.components[n].defaultProps, r);
}
function pu({
  props: t,
  name: e,
  defaultTheme: n,
  themeId: r
}) {
  let o = ws(n);
  return o = o[r] || o, du({
    theme: o,
    name: e,
    props: t
  });
}
function jo(t, e = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (t < e || t > n) && console.error(`MUI: The value provided ${t} is out of range [${e}, ${n}].`), op(t, e, n);
}
function uu(t) {
  t = t.slice(1);
  const e = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let n = t.match(e);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Se(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return Se(uu(t));
  const e = t.indexOf("("), n = t.substring(0, e);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${t}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Le(9, t));
  let r = t.substring(e + 1, t.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Le(10, o));
  } else
    r = r.split(",");
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function Er(t) {
  const {
    type: e,
    colorSpace: n
  } = t;
  let {
    values: r
  } = t;
  return e.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : e.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), e.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${e}(${r})`;
}
function wu(t) {
  t = Se(t);
  const {
    values: e
  } = t, n = e[0], r = e[1] / 100, o = e[2] / 100, a = r * Math.min(o, 1 - o), i = (d, p = (d + n / 30) % 12) => o - a * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return t.type === "hsla" && (l += "a", c.push(e[3])), Er({
    type: l,
    values: c
  });
}
function Da(t) {
  t = Se(t);
  let e = t.type === "hsl" || t.type === "hsla" ? Se(wu(t)).values : t.values;
  return e = e.map((n) => (t.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function ja(t, e) {
  const n = Da(t), r = Da(e);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function fs(t, e) {
  return t = Se(t), e = jo(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, Er(t);
}
function fu(t, e) {
  if (t = Se(t), e = jo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] *= 1 - e;
  else if (t.type.indexOf("rgb") !== -1 || t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] *= 1 - e;
  return Er(t);
}
function mu(t, e) {
  if (t = Se(t), e = jo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (255 - t.values[n]) * e;
  else if (t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (1 - t.values[n]) * e;
  return Er(t);
}
function hu(t, e) {
  return P({
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
const Nn = {
  black: "#000",
  white: "#fff"
}, gu = {
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
}, Pe = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, $e = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, an = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, Ie = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, Me = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, Ae = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
}, bu = ["mode", "contrastThreshold", "tonalOffset"], Ba = {
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
    paper: Nn.white,
    default: Nn.white
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
}, Xr = {
  text: {
    primary: Nn.white,
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
    active: Nn.white,
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
function Va(t, e, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(n) ? t[e] = t[n] : e === "light" ? t.light = mu(t.main, o) : e === "dark" && (t.dark = fu(t.main, a)));
}
function vu(t = "light") {
  return t === "dark" ? {
    main: Ie[200],
    light: Ie[50],
    dark: Ie[400]
  } : {
    main: Ie[700],
    light: Ie[400],
    dark: Ie[800]
  };
}
function yu(t = "light") {
  return t === "dark" ? {
    main: Pe[200],
    light: Pe[50],
    dark: Pe[400]
  } : {
    main: Pe[500],
    light: Pe[300],
    dark: Pe[700]
  };
}
function xu(t = "light") {
  return t === "dark" ? {
    main: $e[500],
    light: $e[300],
    dark: $e[700]
  } : {
    main: $e[700],
    light: $e[400],
    dark: $e[800]
  };
}
function Nu(t = "light") {
  return t === "dark" ? {
    main: Me[400],
    light: Me[300],
    dark: Me[700]
  } : {
    main: Me[700],
    light: Me[500],
    dark: Me[900]
  };
}
function ku(t = "light") {
  return t === "dark" ? {
    main: Ae[400],
    light: Ae[300],
    dark: Ae[700]
  } : {
    main: Ae[800],
    light: Ae[500],
    dark: Ae[900]
  };
}
function Eu(t = "light") {
  return t === "dark" ? {
    main: an[400],
    light: an[300],
    dark: an[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: an[500],
    dark: an[900]
  };
}
function Su(t) {
  const {
    mode: e = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = t, o = kt(t, bu), a = t.primary || vu(e), i = t.secondary || yu(e), l = t.error || xu(e), c = t.info || Nu(e), d = t.success || ku(e), p = t.warning || Eu(e);
  function f(m) {
    const h = ja(m, Xr.text.primary) >= n ? Xr.text.primary : Ba.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const k = ja(m, h);
      k < 3 && console.error([`MUI: The contrast ratio of ${k}:1 for ${h} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const w = ({
    color: m,
    name: h,
    mainShade: k = 500,
    lightShade: T = 300,
    darkShade: C = 700
  }) => {
    if (m = P({}, m), !m.main && m[k] && (m.main = m[k]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.` : Le(11, h ? ` (${h})` : "", k));
    if (typeof m.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Le(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return Va(m, "light", T, r), Va(m, "dark", C, r), m.contrastText || (m.contrastText = f(m.main)), m;
  }, g = {
    dark: Xr,
    light: Ba
  };
  return process.env.NODE_ENV !== "production" && (g[e] || console.error(`MUI: The palette mode \`${e}\` is not supported.`)), Qt(P({
    // A collection of common colors.
    common: P({}, Nn),
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
      color: i,
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
    grey: gu,
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
  }, g[e]), o);
}
const Tu = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Cu(t) {
  return Math.round(t * 1e5) / 1e5;
}
const za = {
  textTransform: "uppercase"
}, Fa = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ou(t, e) {
  const n = typeof e == "function" ? e(t) : e, {
    fontFamily: r = Fa,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: d = 16,
    // Apply the CSS properties to all the variants.
    allVariants: p,
    pxToRem: f
  } = n, w = kt(n, Tu);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const g = o / 14, v = f || ((k) => `${k / d * g}rem`), m = (k, T, C, E, b) => P({
    fontFamily: r,
    fontWeight: k,
    fontSize: v(T),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: C
  }, r === Fa ? {
    letterSpacing: `${Cu(E / T)}em`
  } : {}, b, p), h = {
    h1: m(a, 96, 1.167, -1.5),
    h2: m(a, 60, 1.2, -0.5),
    h3: m(i, 48, 1.167, 0),
    h4: m(i, 34, 1.235, 0.25),
    h5: m(i, 24, 1.334, 0),
    h6: m(l, 20, 1.6, 0.15),
    subtitle1: m(i, 16, 1.75, 0.15),
    subtitle2: m(l, 14, 1.57, 0.1),
    body1: m(i, 16, 1.5, 0.15),
    body2: m(i, 14, 1.43, 0.15),
    button: m(l, 14, 1.75, 0.4, za),
    caption: m(i, 12, 1.66, 0.4),
    overline: m(i, 12, 2.66, 1, za),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Qt(P({
    htmlFontSize: d,
    pxToRem: v,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: l,
    fontWeightBold: c
  }, h), w, {
    clone: !1
    // No need to clone deep
  });
}
const Ru = 0.2, _u = 0.14, Pu = 0.12;
function mt(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${Ru})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${_u})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${Pu})`].join(",");
}
const $u = ["none", mt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), mt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), mt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), mt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), mt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), mt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), mt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), mt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), mt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), mt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), mt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), mt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), mt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), mt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), mt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), mt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), mt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), mt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), mt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), mt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), mt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), mt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), mt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), mt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Iu = ["duration", "easing", "delay"], Mu = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Au = {
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
function La(t) {
  return `${Math.round(t)}ms`;
}
function Du(t) {
  if (!t)
    return 0;
  const e = t / 36;
  return Math.round((4 + 15 * e ** 0.25 + e / 5) * 10);
}
function ju(t) {
  const e = P({}, Mu, t.easing), n = P({}, Au, t.duration);
  return P({
    getAutoHeightDuration: Du,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = n.standard,
        easing: l = e.easeInOut,
        delay: c = 0
      } = a, d = kt(a, Iu);
      if (process.env.NODE_ENV !== "production") {
        const p = (w) => typeof w == "string", f = (w) => !isNaN(parseFloat(w));
        !p(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(i) && !p(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), p(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !p(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof i == "string" ? i : La(i)} ${l} ${typeof c == "string" ? c : La(c)}`).join(",");
    }
  }, t, {
    easing: e,
    duration: n
  });
}
const Bu = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Vu = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function zu(t = {}, ...e) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = t, i = kt(t, Vu);
  if (t.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Le(18));
  const l = Su(r), c = Do(t);
  let d = Qt(c, {
    mixins: hu(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: $u.slice(),
    typography: Ou(l, a),
    transitions: ju(o),
    zIndex: P({}, Bu)
  });
  if (d = Qt(d, i), d = e.reduce((p, f) => Qt(p, f), d), process.env.NODE_ENV !== "production") {
    const p = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (w, g) => {
      let v;
      for (v in w) {
        const m = w[v];
        if (p.indexOf(v) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = fr("", v);
            console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(w, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          w[v] = {};
        }
      }
    };
    Object.keys(d.components).forEach((w) => {
      const g = d.components[w].styleOverrides;
      g && w.indexOf("Mui") === 0 && f(g, w);
    });
  }
  return d.unstable_sxConfig = P({}, Ao, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(f) {
    return kr({
      sx: f,
      theme: this
    });
  }, d;
}
const Bo = zu(), Vo = "$$material";
function zo({
  props: t,
  name: e
}) {
  return pu({
    props: t,
    name: e,
    defaultTheme: Bo,
    themeId: Vo
  });
}
const Fu = (t) => Hn(t) && t !== "classes", Pn = cu({
  themeId: Vo,
  defaultTheme: Bo,
  rootShouldForwardProp: Fu
});
function Lu(t) {
  return fr("MuiSvgIcon", t);
}
cs("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Gu = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Uu = (t) => {
  const {
    color: e,
    fontSize: n,
    classes: r
  } = t, o = {
    root: ["root", e !== "inherit" && `color${qt(e)}`, `fontSize${qt(n)}`]
  };
  return $o(o, Lu, r);
}, Xu = Pn("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.root, n.color !== "inherit" && e[`color${qt(n.color)}`], e[`fontSize${qt(n.fontSize)}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => {
  var n, r, o, a, i, l, c, d, p, f, w, g, v;
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
      small: ((a = t.typography) == null || (i = a.pxToRem) == null ? void 0 : i.call(a, 20)) || "1.25rem",
      medium: ((l = t.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((d = t.typography) == null || (p = d.pxToRem) == null ? void 0 : p.call(d, 35)) || "2.1875rem"
    }[e.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (f = (w = (t.vars || t).palette) == null || (w = w[e.color]) == null ? void 0 : w.main) != null ? f : {
      action: (g = (t.vars || t).palette) == null || (g = g.action) == null ? void 0 : g.active,
      disabled: (v = (t.vars || t).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[e.color]
  };
}), Zn = /* @__PURE__ */ j.forwardRef(function(e, n) {
  const r = zo({
    props: e,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: d,
    inheritViewBox: p = !1,
    titleAccess: f,
    viewBox: w = "0 0 24 24"
  } = r, g = kt(r, Gu), v = /* @__PURE__ */ j.isValidElement(o) && o.type === "svg", m = P({}, r, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: e.fontSize,
    inheritViewBox: p,
    viewBox: w,
    hasSvgAsChild: v
  }), h = {};
  p || (h.viewBox = w);
  const k = Uu(m);
  return /* @__PURE__ */ x(Xu, P({
    as: l,
    className: ve(k.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, h, g, v && o.props, {
    ownerState: m,
    children: [v ? o.props.children : o, f ? /* @__PURE__ */ s("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Zn.propTypes = {
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
Zn.muiName = "SvgIcon";
function ms(t, e) {
  function n(r, o) {
    return /* @__PURE__ */ s(Zn, P({
      "data-testid": `${e}Icon`,
      ref: o
    }, r, {
      children: t
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${e}Icon`), n.muiName = Zn.muiName, /* @__PURE__ */ j.memo(/* @__PURE__ */ j.forwardRef(n));
}
const Hu = {
  configure: (t) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ss.configure(t);
  }
}, Yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: qt,
  createChainedFunction: Vd,
  createSvgIcon: ms,
  debounce: zd,
  deprecatedPropType: Fd,
  isMuiElement: Ld,
  ownerDocument: qn,
  ownerWindow: Gd,
  requirePropFactory: Ud,
  setRef: Kn,
  unstable_ClassNameGenerator: Hu,
  unstable_useEnhancedEffect: Ge,
  unstable_useId: rs,
  unsupportedProp: Hd,
  useControlled: os,
  useEventCallback: oo,
  useForkRef: Ee,
  useIsFocusVisible: as
}, Symbol.toStringTag, { value: "Module" })), Wu = /* @__PURE__ */ yd(Yu);
var Ga;
function qu() {
  return Ga || (Ga = 1, function(t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function() {
        return e.createSvgIcon;
      }
    });
    var e = Wu;
  }(jr)), jr;
}
var Ku = xd;
Object.defineProperty(Oo, "__esModule", {
  value: !0
});
var hs = Oo.default = void 0, Ju = Ku(qu()), Zu = Hs;
hs = Oo.default = (0, Ju.default)(/* @__PURE__ */ (0, Zu.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Qu(t) {
  return typeof t == "string";
}
function pn(t, e, n) {
  return t === void 0 || Qu(t) ? e : P({}, e, {
    ownerState: P({}, e.ownerState, n)
  });
}
const tw = {
  disableDefaultClasses: !1
}, ew = /* @__PURE__ */ j.createContext(tw);
function nw(t) {
  const {
    disableDefaultClasses: e
  } = j.useContext(ew);
  return (n) => e ? "" : t(n);
}
function rw(t, e = []) {
  if (t === void 0)
    return {};
  const n = {};
  return Object.keys(t).filter((r) => r.match(/^on[A-Z]/) && typeof t[r] == "function" && !e.includes(r)).forEach((r) => {
    n[r] = t[r];
  }), n;
}
function ow(t, e, n) {
  return typeof t == "function" ? t(e, n) : t;
}
function Ua(t) {
  if (t === void 0)
    return {};
  const e = {};
  return Object.keys(t).filter((n) => !(n.match(/^on[A-Z]/) && typeof t[n] == "function")).forEach((n) => {
    e[n] = t[n];
  }), e;
}
function aw(t) {
  const {
    getSlotProps: e,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = t;
  if (!e) {
    const g = ve(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = P({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = P({}, n, o, r);
    return g.length > 0 && (m.className = g), Object.keys(v).length > 0 && (m.style = v), {
      props: m,
      internalRef: void 0
    };
  }
  const i = rw(P({}, o, r)), l = Ua(r), c = Ua(o), d = e(i), p = ve(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = P({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = P({}, d, n, c, l);
  return p.length > 0 && (w.className = p), Object.keys(f).length > 0 && (w.style = f), {
    props: w,
    internalRef: d.ref
  };
}
const iw = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function sw(t) {
  var e;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = t, i = kt(t, iw), l = a ? {} : ow(r, o), {
    props: c,
    internalRef: d
  } = aw(P({}, i, {
    externalSlotProps: l
  })), p = Ee(d, l == null ? void 0 : l.ref, (e = t.additionalProps) == null ? void 0 : e.ref);
  return pn(n, P({}, c, {
    ref: p
  }), o);
}
const gs = "base";
function lw(t) {
  return `${gs}--${t}`;
}
function cw(t, e) {
  return `${gs}-${t}-${e}`;
}
function dw(t, e) {
  const n = ls[e];
  return n ? lw(n) : cw(t, e);
}
function pw(t) {
  return typeof t == "function" ? t() : t;
}
const Qn = /* @__PURE__ */ j.forwardRef(function(e, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = e, [i, l] = j.useState(null), c = Ee(/* @__PURE__ */ j.isValidElement(r) ? r.ref : null, n);
  if (Ge(() => {
    a || l(pw(o) || document.body);
  }, [o, a]), Ge(() => {
    if (i && !a)
      return Kn(n, i), () => {
        Kn(n, null);
      };
  }, [n, i, a]), a) {
    if (/* @__PURE__ */ j.isValidElement(r)) {
      const d = {
        ref: c
      };
      return /* @__PURE__ */ j.cloneElement(r, d);
    }
    return /* @__PURE__ */ s(j.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ s(j.Fragment, {
    children: i && /* @__PURE__ */ zl.createPortal(r, i)
  });
});
process.env.NODE_ENV !== "production" && (Qn.propTypes = {
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
  container: u.oneOfType([xn, u.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool
});
process.env.NODE_ENV !== "production" && (Qn.propTypes = Id(Qn.propTypes));
var Ot = "top", Ft = "bottom", Lt = "right", Rt = "left", Fo = "auto", $n = [Ot, Ft, Lt, Rt], Ue = "start", kn = "end", uw = "clippingParents", bs = "viewport", sn = "popper", ww = "reference", Xa = /* @__PURE__ */ $n.reduce(function(t, e) {
  return t.concat([e + "-" + Ue, e + "-" + kn]);
}, []), vs = /* @__PURE__ */ [].concat($n, [Fo]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Ue, e + "-" + kn]);
}, []), fw = "beforeRead", mw = "read", hw = "afterRead", gw = "beforeMain", bw = "main", vw = "afterMain", yw = "beforeWrite", xw = "write", Nw = "afterWrite", kw = [fw, mw, hw, gw, bw, vw, yw, xw, Nw];
function Kt(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Dt(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Te(t) {
  var e = Dt(t).Element;
  return t instanceof e || t instanceof Element;
}
function zt(t) {
  var e = Dt(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Lo(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Dt(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Ew(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, o = e.attributes[n] || {}, a = e.elements[n];
    !zt(a) || !Kt(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function Sw(t) {
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
      var o = e.elements[r], a = e.attributes[r] || {}, i = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : n[r]), l = i.reduce(function(c, d) {
        return c[d] = "", c;
      }, {});
      !zt(o) || !Kt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Tw = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Ew,
  effect: Sw,
  requires: ["computeStyles"]
};
function Yt(t) {
  return t.split("-")[0];
}
var ye = Math.max, tr = Math.min, Xe = Math.round;
function io() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function ys() {
  return !/^((?!chrome|android).)*safari/i.test(io());
}
function He(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var r = t.getBoundingClientRect(), o = 1, a = 1;
  e && zt(t) && (o = t.offsetWidth > 0 && Xe(r.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && Xe(r.height) / t.offsetHeight || 1);
  var i = Te(t) ? Dt(t) : window, l = i.visualViewport, c = !ys() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, p = (r.top + (c && l ? l.offsetTop : 0)) / a, f = r.width / o, w = r.height / a;
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
function Go(t) {
  var e = He(t), n = t.offsetWidth, r = t.offsetHeight;
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: n,
    height: r
  };
}
function xs(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Lo(n)) {
    var r = e;
    do {
      if (r && t.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function ee(t) {
  return Dt(t).getComputedStyle(t);
}
function Cw(t) {
  return ["table", "td", "th"].indexOf(Kt(t)) >= 0;
}
function ce(t) {
  return ((Te(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function Sr(t) {
  return Kt(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Lo(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ce(t)
  );
}
function Ha(t) {
  return !zt(t) || // https://github.com/popperjs/popper-core/issues/837
  ee(t).position === "fixed" ? null : t.offsetParent;
}
function Ow(t) {
  var e = /firefox/i.test(io()), n = /Trident/i.test(io());
  if (n && zt(t)) {
    var r = ee(t);
    if (r.position === "fixed")
      return null;
  }
  var o = Sr(t);
  for (Lo(o) && (o = o.host); zt(o) && ["html", "body"].indexOf(Kt(o)) < 0; ) {
    var a = ee(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function In(t) {
  for (var e = Dt(t), n = Ha(t); n && Cw(n) && ee(n).position === "static"; )
    n = Ha(n);
  return n && (Kt(n) === "html" || Kt(n) === "body" && ee(n).position === "static") ? e : n || Ow(t) || e;
}
function Uo(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function hn(t, e, n) {
  return ye(t, tr(e, n));
}
function Rw(t, e, n) {
  var r = hn(t, e, n);
  return r > n ? n : r;
}
function Ns() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ks(t) {
  return Object.assign({}, Ns(), t);
}
function Es(t, e) {
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
var _w = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, ks(typeof e != "number" ? e : Es(e, $n));
};
function Pw(t) {
  var e, n = t.state, r = t.name, o = t.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, l = Yt(n.placement), c = Uo(l), d = [Rt, Lt].indexOf(l) >= 0, p = d ? "height" : "width";
  if (!(!a || !i)) {
    var f = _w(o.padding, n), w = Go(a), g = c === "y" ? Ot : Rt, v = c === "y" ? Ft : Lt, m = n.rects.reference[p] + n.rects.reference[c] - i[c] - n.rects.popper[p], h = i[c] - n.rects.reference[c], k = In(a), T = k ? c === "y" ? k.clientHeight || 0 : k.clientWidth || 0 : 0, C = m / 2 - h / 2, E = f[g], b = T - w[p] - f[v], _ = T / 2 - w[p] / 2 + C, F = hn(E, _, b), R = c;
    n.modifiersData[r] = (e = {}, e[R] = F, e.centerOffset = F - _, e);
  }
}
function $w(t) {
  var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || xs(e.elements.popper, o) && (e.elements.arrow = o));
}
const Iw = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Pw,
  effect: $w,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ye(t) {
  return t.split("-")[1];
}
var Mw = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Aw(t, e) {
  var n = t.x, r = t.y, o = e.devicePixelRatio || 1;
  return {
    x: Xe(n * o) / o || 0,
    y: Xe(r * o) / o || 0
  };
}
function Ya(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, a = t.variation, i = t.offsets, l = t.position, c = t.gpuAcceleration, d = t.adaptive, p = t.roundOffsets, f = t.isFixed, w = i.x, g = w === void 0 ? 0 : w, v = i.y, m = v === void 0 ? 0 : v, h = typeof p == "function" ? p({
    x: g,
    y: m
  }) : {
    x: g,
    y: m
  };
  g = h.x, m = h.y;
  var k = i.hasOwnProperty("x"), T = i.hasOwnProperty("y"), C = Rt, E = Ot, b = window;
  if (d) {
    var _ = In(n), F = "clientHeight", R = "clientWidth";
    if (_ === Dt(n) && (_ = ce(n), ee(_).position !== "static" && l === "absolute" && (F = "scrollHeight", R = "scrollWidth")), _ = _, o === Ot || (o === Rt || o === Lt) && a === kn) {
      E = Ft;
      var $ = f && _ === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        _[F]
      );
      m -= $ - r.height, m *= c ? 1 : -1;
    }
    if (o === Rt || (o === Ot || o === Ft) && a === kn) {
      C = Lt;
      var L = f && _ === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        _[R]
      );
      g -= L - r.width, g *= c ? 1 : -1;
    }
  }
  var D = Object.assign({
    position: l
  }, d && Mw), I = p === !0 ? Aw({
    x: g,
    y: m
  }, Dt(n)) : {
    x: g,
    y: m
  };
  if (g = I.x, m = I.y, c) {
    var A;
    return Object.assign({}, D, (A = {}, A[E] = T ? "0" : "", A[C] = k ? "0" : "", A.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + m + "px)" : "translate3d(" + g + "px, " + m + "px, 0)", A));
  }
  return Object.assign({}, D, (e = {}, e[E] = T ? m + "px" : "", e[C] = k ? g + "px" : "", e.transform = "", e));
}
function Dw(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, i = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: Yt(e.placement),
    variation: Ye(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Ya(Object.assign({}, d, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Ya(Object.assign({}, d, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const jw = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Dw,
  data: {}
};
var Ln = {
  passive: !0
};
function Bw(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, a = o === void 0 ? !0 : o, i = r.resize, l = i === void 0 ? !0 : i, c = Dt(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && d.forEach(function(p) {
    p.addEventListener("scroll", n.update, Ln);
  }), l && c.addEventListener("resize", n.update, Ln), function() {
    a && d.forEach(function(p) {
      p.removeEventListener("scroll", n.update, Ln);
    }), l && c.removeEventListener("resize", n.update, Ln);
  };
}
const Vw = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Bw,
  data: {}
};
var zw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Wn(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return zw[e];
  });
}
var Fw = {
  start: "end",
  end: "start"
};
function Wa(t) {
  return t.replace(/start|end/g, function(e) {
    return Fw[e];
  });
}
function Xo(t) {
  var e = Dt(t), n = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Ho(t) {
  return He(ce(t)).left + Xo(t).scrollLeft;
}
function Lw(t, e) {
  var n = Dt(t), r = ce(t), o = n.visualViewport, a = r.clientWidth, i = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var d = ys();
    (d || !d && e === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + Ho(t),
    y: c
  };
}
function Gw(t) {
  var e, n = ce(t), r = Xo(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = ye(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = ye(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Ho(t), c = -r.scrollTop;
  return ee(o || n).direction === "rtl" && (l += ye(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function Yo(t) {
  var e = ee(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Ss(t) {
  return ["html", "body", "#document"].indexOf(Kt(t)) >= 0 ? t.ownerDocument.body : zt(t) && Yo(t) ? t : Ss(Sr(t));
}
function gn(t, e) {
  var n;
  e === void 0 && (e = []);
  var r = Ss(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), a = Dt(r), i = o ? [a].concat(a.visualViewport || [], Yo(r) ? r : []) : r, l = e.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(gn(Sr(i)))
  );
}
function so(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Uw(t, e) {
  var n = He(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function qa(t, e, n) {
  return e === bs ? so(Lw(t, n)) : Te(e) ? Uw(e, n) : so(Gw(ce(t)));
}
function Xw(t) {
  var e = gn(Sr(t)), n = ["absolute", "fixed"].indexOf(ee(t).position) >= 0, r = n && zt(t) ? In(t) : t;
  return Te(r) ? e.filter(function(o) {
    return Te(o) && xs(o, r) && Kt(o) !== "body";
  }) : [];
}
function Hw(t, e, n, r) {
  var o = e === "clippingParents" ? Xw(t) : [].concat(e), a = [].concat(o, [n]), i = a[0], l = a.reduce(function(c, d) {
    var p = qa(t, d, r);
    return c.top = ye(p.top, c.top), c.right = tr(p.right, c.right), c.bottom = tr(p.bottom, c.bottom), c.left = ye(p.left, c.left), c;
  }, qa(t, i, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Ts(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? Yt(r) : null, a = r ? Ye(r) : null, i = e.x + e.width / 2 - n.width / 2, l = e.y + e.height / 2 - n.height / 2, c;
  switch (o) {
    case Ot:
      c = {
        x: i,
        y: e.y - n.height
      };
      break;
    case Ft:
      c = {
        x: i,
        y: e.y + e.height
      };
      break;
    case Lt:
      c = {
        x: e.x + e.width,
        y: l
      };
      break;
    case Rt:
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
  var d = o ? Uo(o) : null;
  if (d != null) {
    var p = d === "y" ? "height" : "width";
    switch (a) {
      case Ue:
        c[d] = c[d] - (e[p] / 2 - n[p] / 2);
        break;
      case kn:
        c[d] = c[d] + (e[p] / 2 - n[p] / 2);
        break;
    }
  }
  return c;
}
function En(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, a = n.strategy, i = a === void 0 ? t.strategy : a, l = n.boundary, c = l === void 0 ? uw : l, d = n.rootBoundary, p = d === void 0 ? bs : d, f = n.elementContext, w = f === void 0 ? sn : f, g = n.altBoundary, v = g === void 0 ? !1 : g, m = n.padding, h = m === void 0 ? 0 : m, k = ks(typeof h != "number" ? h : Es(h, $n)), T = w === sn ? ww : sn, C = t.rects.popper, E = t.elements[v ? T : w], b = Hw(Te(E) ? E : E.contextElement || ce(t.elements.popper), c, p, i), _ = He(t.elements.reference), F = Ts({
    reference: _,
    element: C,
    placement: o
  }), R = so(Object.assign({}, C, F)), $ = w === sn ? R : _, L = {
    top: b.top - $.top + k.top,
    bottom: $.bottom - b.bottom + k.bottom,
    left: b.left - $.left + k.left,
    right: $.right - b.right + k.right
  }, D = t.modifiersData.offset;
  if (w === sn && D) {
    var I = D[o];
    Object.keys(L).forEach(function(A) {
      var H = [Lt, Ft].indexOf(A) >= 0 ? 1 : -1, G = [Ot, Ft].indexOf(A) >= 0 ? "y" : "x";
      L[A] += I[G] * H;
    });
  }
  return L;
}
function Yw(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, a = n.rootBoundary, i = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? vs : c, p = Ye(r), f = p ? l ? Xa : Xa.filter(function(v) {
    return Ye(v) === p;
  }) : $n, w = f.filter(function(v) {
    return d.indexOf(v) >= 0;
  });
  w.length === 0 && (w = f);
  var g = w.reduce(function(v, m) {
    return v[m] = En(t, {
      placement: m,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[Yt(m)], v;
  }, {});
  return Object.keys(g).sort(function(v, m) {
    return g[v] - g[m];
  });
}
function Ww(t) {
  if (Yt(t) === Fo)
    return [];
  var e = Wn(t);
  return [Wa(t), e, Wa(e)];
}
function qw(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !0 : i, c = n.fallbackPlacements, d = n.padding, p = n.boundary, f = n.rootBoundary, w = n.altBoundary, g = n.flipVariations, v = g === void 0 ? !0 : g, m = n.allowedAutoPlacements, h = e.options.placement, k = Yt(h), T = k === h, C = c || (T || !v ? [Wn(h)] : Ww(h)), E = [h].concat(C).reduce(function(z, K) {
      return z.concat(Yt(K) === Fo ? Yw(e, {
        placement: K,
        boundary: p,
        rootBoundary: f,
        padding: d,
        flipVariations: v,
        allowedAutoPlacements: m
      }) : K);
    }, []), b = e.rects.reference, _ = e.rects.popper, F = /* @__PURE__ */ new Map(), R = !0, $ = E[0], L = 0; L < E.length; L++) {
      var D = E[L], I = Yt(D), A = Ye(D) === Ue, H = [Ot, Ft].indexOf(I) >= 0, G = H ? "width" : "height", B = En(e, {
        placement: D,
        boundary: p,
        rootBoundary: f,
        altBoundary: w,
        padding: d
      }), Z = H ? A ? Lt : Rt : A ? Ft : Ot;
      b[G] > _[G] && (Z = Wn(Z));
      var at = Wn(Z), rt = [];
      if (a && rt.push(B[I] <= 0), l && rt.push(B[Z] <= 0, B[at] <= 0), rt.every(function(z) {
        return z;
      })) {
        $ = D, R = !1;
        break;
      }
      F.set(D, rt);
    }
    if (R)
      for (var y = v ? 3 : 1, O = function(K) {
        var W = E.find(function(q) {
          var Y = F.get(q);
          if (Y)
            return Y.slice(0, K).every(function(J) {
              return J;
            });
        });
        if (W)
          return $ = W, "break";
      }, U = y; U > 0; U--) {
        var X = O(U);
        if (X === "break") break;
      }
    e.placement !== $ && (e.modifiersData[r]._skip = !0, e.placement = $, e.reset = !0);
  }
}
const Kw = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: qw,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ka(t, e, n) {
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
function Ja(t) {
  return [Ot, Lt, Ft, Rt].some(function(e) {
    return t[e] >= 0;
  });
}
function Jw(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, i = En(e, {
    elementContext: "reference"
  }), l = En(e, {
    altBoundary: !0
  }), c = Ka(i, r), d = Ka(l, o, a), p = Ja(c), f = Ja(d);
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
const Zw = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Jw
};
function Qw(t, e, n) {
  var r = Yt(t), o = [Rt, Ot].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, e, {
    placement: t
  })) : n, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Rt, Lt].indexOf(r) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function tf(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, a = o === void 0 ? [0, 0] : o, i = vs.reduce(function(p, f) {
    return p[f] = Qw(f, e.rects, a), p;
  }, {}), l = i[e.placement], c = l.x, d = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += d), e.modifiersData[r] = i;
}
const ef = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: tf
};
function nf(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = Ts({
    reference: e.rects.reference,
    element: e.rects.popper,
    placement: e.placement
  });
}
const rf = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: nf,
  data: {}
};
function of(t) {
  return t === "x" ? "y" : "x";
}
function af(t) {
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !1 : i, c = n.boundary, d = n.rootBoundary, p = n.altBoundary, f = n.padding, w = n.tether, g = w === void 0 ? !0 : w, v = n.tetherOffset, m = v === void 0 ? 0 : v, h = En(e, {
    boundary: c,
    rootBoundary: d,
    padding: f,
    altBoundary: p
  }), k = Yt(e.placement), T = Ye(e.placement), C = !T, E = Uo(k), b = of(E), _ = e.modifiersData.popperOffsets, F = e.rects.reference, R = e.rects.popper, $ = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, L = typeof $ == "number" ? {
    mainAxis: $,
    altAxis: $
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, $), D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, I = {
    x: 0,
    y: 0
  };
  if (_) {
    if (a) {
      var A, H = E === "y" ? Ot : Rt, G = E === "y" ? Ft : Lt, B = E === "y" ? "height" : "width", Z = _[E], at = Z + h[H], rt = Z - h[G], y = g ? -R[B] / 2 : 0, O = T === Ue ? F[B] : R[B], U = T === Ue ? -R[B] : -F[B], X = e.elements.arrow, z = g && X ? Go(X) : {
        width: 0,
        height: 0
      }, K = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Ns(), W = K[H], q = K[G], Y = hn(0, F[B], z[B]), J = C ? F[B] / 2 - y - Y - W - L.mainAxis : O - Y - W - L.mainAxis, Q = C ? -F[B] / 2 + y + Y + q + L.mainAxis : U + Y + q + L.mainAxis, dt = e.elements.arrow && In(e.elements.arrow), M = dt ? E === "y" ? dt.clientTop || 0 : dt.clientLeft || 0 : 0, Nt = (A = D == null ? void 0 : D[E]) != null ? A : 0, V = Z + J - Nt - M, yt = Z + Q - Nt, Ut = hn(g ? tr(at, V) : at, Z, g ? ye(rt, yt) : rt);
      _[E] = Ut, I[E] = Ut - Z;
    }
    if (l) {
      var de, St = E === "x" ? Ot : Rt, An = E === "x" ? Ft : Lt, Xt = _[b], Ce = b === "y" ? "height" : "width", pe = Xt + h[St], Oe = Xt - h[An], Re = [Ot, Rt].indexOf(k) !== -1, _e = (de = D == null ? void 0 : D[b]) != null ? de : 0, ue = Re ? pe : Xt - F[Ce] - R[Ce] - _e + L.altAxis, Ze = Re ? Xt + F[Ce] + R[Ce] - _e - L.altAxis : Oe, Dn = g && Re ? Rw(ue, Xt, Ze) : hn(g ? ue : pe, Xt, g ? Ze : Oe);
      _[b] = Dn, I[b] = Dn - Xt;
    }
    e.modifiersData[r] = I;
  }
}
const sf = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: af,
  requiresIfExists: ["offset"]
};
function lf(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function cf(t) {
  return t === Dt(t) || !zt(t) ? Xo(t) : lf(t);
}
function df(t) {
  var e = t.getBoundingClientRect(), n = Xe(e.width) / t.offsetWidth || 1, r = Xe(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function pf(t, e, n) {
  n === void 0 && (n = !1);
  var r = zt(e), o = zt(e) && df(e), a = ce(e), i = He(t, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Kt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Yo(a)) && (l = cf(e)), zt(e) ? (c = He(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : a && (c.x = Ho(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function uf(t) {
  var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  t.forEach(function(a) {
    e.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(l) {
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
function wf(t) {
  var e = uf(t);
  return kw.reduce(function(n, r) {
    return n.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function ff(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function mf(t) {
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
var Za = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Qa() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function hf(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, a = o === void 0 ? Za : o;
  return function(l, c, d) {
    d === void 0 && (d = a);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Za, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], w = !1, g = {
      state: p,
      setOptions: function(k) {
        var T = typeof k == "function" ? k(p.options) : k;
        m(), p.options = Object.assign({}, a, p.options, T), p.scrollParents = {
          reference: Te(l) ? gn(l) : l.contextElement ? gn(l.contextElement) : [],
          popper: gn(c)
        };
        var C = wf(mf([].concat(r, p.options.modifiers)));
        return p.orderedModifiers = C.filter(function(E) {
          return E.enabled;
        }), v(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var k = p.elements, T = k.reference, C = k.popper;
          if (Qa(T, C)) {
            p.rects = {
              reference: pf(T, In(C), p.options.strategy === "fixed"),
              popper: Go(C)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(L) {
              return p.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var E = 0; E < p.orderedModifiers.length; E++) {
              if (p.reset === !0) {
                p.reset = !1, E = -1;
                continue;
              }
              var b = p.orderedModifiers[E], _ = b.fn, F = b.options, R = F === void 0 ? {} : F, $ = b.name;
              typeof _ == "function" && (p = _({
                state: p,
                options: R,
                name: $,
                instance: g
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: ff(function() {
        return new Promise(function(h) {
          g.forceUpdate(), h(p);
        });
      }),
      destroy: function() {
        m(), w = !0;
      }
    };
    if (!Qa(l, c))
      return g;
    g.setOptions(d).then(function(h) {
      !w && d.onFirstUpdate && d.onFirstUpdate(h);
    });
    function v() {
      p.orderedModifiers.forEach(function(h) {
        var k = h.name, T = h.options, C = T === void 0 ? {} : T, E = h.effect;
        if (typeof E == "function") {
          var b = E({
            state: p,
            name: k,
            instance: g,
            options: C
          }), _ = function() {
          };
          f.push(b || _);
        }
      });
    }
    function m() {
      f.forEach(function(h) {
        return h();
      }), f = [];
    }
    return g;
  };
}
var gf = [Vw, rf, jw, Tw, ef, Kw, sf, Iw, Zw], bf = /* @__PURE__ */ hf({
  defaultModifiers: gf
});
const vf = "Popper";
function yf(t) {
  return dw(vf, t);
}
const xf = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Nf = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function kf(t, e) {
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
function er(t) {
  return typeof t == "function" ? t() : t;
}
function Tr(t) {
  return t.nodeType !== void 0;
}
function Ef(t) {
  return !Tr(t);
}
const Sf = () => $o({
  root: ["root"]
}, nw(yf)), Tf = {}, Cf = /* @__PURE__ */ j.forwardRef(function(e, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: l,
    modifiers: c,
    open: d,
    placement: p,
    popperOptions: f,
    popperRef: w,
    slotProps: g = {},
    slots: v = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = e, h = kt(e, xf), k = j.useRef(null), T = Ee(k, n), C = j.useRef(null), E = Ee(C, w), b = j.useRef(E);
  Ge(() => {
    b.current = E;
  }, [E]), j.useImperativeHandle(w, () => C.current, []);
  const _ = kf(p, i), [F, R] = j.useState(_), [$, L] = j.useState(er(o));
  j.useEffect(() => {
    C.current && C.current.forceUpdate();
  }), j.useEffect(() => {
    o && L(er(o));
  }, [o]), Ge(() => {
    if (!$ || !d)
      return;
    const G = (at) => {
      R(at.placement);
    };
    if (process.env.NODE_ENV !== "production" && $ && Tr($) && $.nodeType === 1) {
      const at = $.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && at.top === 0 && at.left === 0 && at.right === 0 && at.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let B = [{
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
        state: at
      }) => {
        G(at);
      }
    }];
    c != null && (B = B.concat(c)), f && f.modifiers != null && (B = B.concat(f.modifiers));
    const Z = bf($, k.current, P({
      placement: _
    }, f, {
      modifiers: B
    }));
    return b.current(Z), () => {
      Z.destroy(), b.current(null);
    };
  }, [$, l, c, d, f, _]);
  const D = {
    placement: F
  };
  m !== null && (D.TransitionProps = m);
  const I = Sf(), A = (r = v.root) != null ? r : "div", H = sw({
    elementType: A,
    externalSlotProps: g.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: T
    },
    ownerState: e,
    className: I.root
  });
  return /* @__PURE__ */ s(A, P({}, H, {
    children: typeof a == "function" ? a(D) : a
  }));
}), Cs = /* @__PURE__ */ j.forwardRef(function(e, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: d,
    open: p,
    placement: f = "bottom",
    popperOptions: w = Tf,
    popperRef: g,
    style: v,
    transition: m = !1,
    slotProps: h = {},
    slots: k = {}
  } = e, T = kt(e, Nf), [C, E] = j.useState(!0), b = () => {
    E(!1);
  }, _ = () => {
    E(!0);
  };
  if (!c && !p && (!m || C))
    return null;
  let F;
  if (a)
    F = a;
  else if (r) {
    const L = er(r);
    F = L && Tr(L) ? qn(L).body : qn(null).body;
  }
  const R = !p && c && (!m || C) ? "none" : void 0, $ = m ? {
    in: p,
    onEnter: b,
    onExited: _
  } : void 0;
  return /* @__PURE__ */ s(Qn, {
    disablePortal: l,
    container: F,
    children: /* @__PURE__ */ s(Cf, P({
      anchorEl: r,
      direction: i,
      disablePortal: l,
      modifiers: d,
      ref: n,
      open: m ? !C : p,
      placement: f,
      popperOptions: w,
      popperRef: g,
      slotProps: h,
      slots: k
    }, T, {
      style: P({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: R
      }, v),
      TransitionProps: $,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Cs.propTypes = {
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
  anchorEl: Ro(u.oneOfType([xn, u.object, u.func]), (t) => {
    if (t.open) {
      const e = er(t.anchorEl);
      if (e && Tr(e) && e.nodeType === 1) {
        const n = e.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!e || typeof e.getBoundingClientRect != "function" || Ef(e) && e.contextElement != null && e.contextElement.nodeType !== 1)
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
  container: u.oneOfType([xn, u.func]),
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
  popperRef: ns,
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
function Os() {
  const t = ws(Bo);
  return process.env.NODE_ENV !== "production" && j.useDebugValue(t), t[Vo] || t;
}
function lo(t, e) {
  return lo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, lo(t, e);
}
function Of(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, lo(t, e);
}
const ti = {
  disabled: !1
};
var Rf = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.shape({
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
const Rs = S.createContext(null);
var _f = function(e) {
  return e.scrollTop;
}, un = "unmounted", me = "exited", he = "entering", je = "entered", co = "exiting", re = /* @__PURE__ */ function(t) {
  Of(e, t);
  function e(r, o) {
    var a;
    a = t.call(this, r, o) || this;
    var i = o, l = i && !i.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = me, a.appearStatus = he) : c = je : r.unmountOnExit || r.mountOnEnter ? c = un : c = me, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  e.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === un ? {
      status: me
    } : null;
  };
  var n = e.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== he && i !== je && (a = he) : (i === he || i === je) && (a = co);
    }
    this.updateStatus(!1, a);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, a, i, l;
    return a = i = l = o, o != null && typeof o != "number" && (a = o.exit, i = o.enter, l = o.appear !== void 0 ? o.appear : i), {
      exit: a,
      enter: i,
      appear: l
    };
  }, n.updateStatus = function(o, a) {
    if (o === void 0 && (o = !1), a !== null)
      if (this.cancelNextCallback(), a === he) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : Vn.findDOMNode(this);
          i && _f(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === me && this.setState({
      status: un
    });
  }, n.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Vn.findDOMNode(this), l], d = c[0], p = c[1], f = this.getTimeouts(), w = l ? f.appear : f.enter;
    if (!o && !i || ti.disabled) {
      this.safeSetState({
        status: je
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, p), this.safeSetState({
      status: he
    }, function() {
      a.props.onEntering(d, p), a.onTransitionEnd(w, function() {
        a.safeSetState({
          status: je
        }, function() {
          a.props.onEntered(d, p);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Vn.findDOMNode(this);
    if (!a || ti.disabled) {
      this.safeSetState({
        status: me
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: co
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(i.exit, function() {
        o.safeSetState({
          status: me
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
    var a = this, i = !0;
    return this.nextCallback = function(l) {
      i && (i = !1, a.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      i = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, a) {
    this.setNextCallback(a);
    var i = this.props.nodeRef ? this.props.nodeRef.current : Vn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!i || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], d = c[0], p = c[1];
      this.props.addEndListener(d, p);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === un)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = kt(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ S.createElement(Rs.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : S.cloneElement(S.Children.only(i), l))
    );
  }, e;
}(S.Component);
re.contextType = Rs;
re.propTypes = process.env.NODE_ENV !== "production" ? {
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
      var i = t[e];
      return u.instanceOf(i && "ownerDocument" in i ? i.ownerDocument.defaultView.Element : Element)(t, e, n, r, o, a);
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
    var n = Rf;
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
function De() {
}
re.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: De,
  onEntering: De,
  onEntered: De,
  onExit: De,
  onExiting: De,
  onExited: De
};
re.UNMOUNTED = un;
re.EXITED = me;
re.ENTERING = he;
re.ENTERED = je;
re.EXITING = co;
const Pf = (t) => t.scrollTop;
function ei(t, e) {
  var n, r;
  const {
    timeout: o,
    easing: a,
    style: i = {}
  } = t;
  return {
    duration: (n = i.transitionDuration) != null ? n : typeof o == "number" ? o : o[e.mode] || 0,
    easing: (r = i.transitionTimingFunction) != null ? r : typeof a == "object" ? a[e.mode] : a,
    delay: i.transitionDelay
  };
}
const $f = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function po(t) {
  return `scale(${t}, ${t ** 2})`;
}
const If = {
  entering: {
    opacity: 1,
    transform: po(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Hr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), nr = /* @__PURE__ */ j.forwardRef(function(e, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: i,
    in: l,
    onEnter: c,
    onEntered: d,
    onEntering: p,
    onExit: f,
    onExited: w,
    onExiting: g,
    style: v,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = re
  } = e, k = kt(e, $f), T = dn(), C = j.useRef(), E = Os(), b = j.useRef(null), _ = Ee(b, a.ref, n), F = (G) => (B) => {
    if (G) {
      const Z = b.current;
      B === void 0 ? G(Z) : G(Z, B);
    }
  }, R = F(p), $ = F((G, B) => {
    Pf(G);
    const {
      duration: Z,
      delay: at,
      easing: rt
    } = ei({
      style: v,
      timeout: m,
      easing: i
    }, {
      mode: "enter"
    });
    let y;
    m === "auto" ? (y = E.transitions.getAutoHeightDuration(G.clientHeight), C.current = y) : y = Z, G.style.transition = [E.transitions.create("opacity", {
      duration: y,
      delay: at
    }), E.transitions.create("transform", {
      duration: Hr ? y : y * 0.666,
      delay: at,
      easing: rt
    })].join(","), c && c(G, B);
  }), L = F(d), D = F(g), I = F((G) => {
    const {
      duration: B,
      delay: Z,
      easing: at
    } = ei({
      style: v,
      timeout: m,
      easing: i
    }, {
      mode: "exit"
    });
    let rt;
    m === "auto" ? (rt = E.transitions.getAutoHeightDuration(G.clientHeight), C.current = rt) : rt = B, G.style.transition = [E.transitions.create("opacity", {
      duration: rt,
      delay: Z
    }), E.transitions.create("transform", {
      duration: Hr ? rt : rt * 0.666,
      delay: Hr ? Z : Z || rt * 0.333,
      easing: at
    })].join(","), G.style.opacity = 0, G.style.transform = po(0.75), f && f(G);
  }), A = F(w);
  return /* @__PURE__ */ s(h, P({
    appear: o,
    in: l,
    nodeRef: b,
    onEnter: $,
    onEntered: L,
    onEntering: R,
    onExit: I,
    onExited: A,
    onExiting: D,
    addEndListener: (G) => {
      m === "auto" && T.start(C.current || 0, G), r && r(b.current, G);
    },
    timeout: m === "auto" ? null : m
  }, k, {
    children: (G, B) => /* @__PURE__ */ j.cloneElement(a, P({
      style: P({
        opacity: 0,
        transform: po(0.75),
        visibility: G === "exited" && !l ? "hidden" : void 0
      }, If[G], v, a.props.style),
      ref: _
    }, B))
  }));
});
process.env.NODE_ENV !== "production" && (nr.propTypes = {
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
  children: Po.isRequired,
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
nr.muiSupportAuto = !0;
const Mf = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Af = Pn(Cs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (t, e) => e.root
})({}), Wo = /* @__PURE__ */ j.forwardRef(function(e, n) {
  var r;
  const o = us(), a = zo({
    props: e,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: l,
    components: c,
    componentsProps: d,
    container: p,
    disablePortal: f,
    keepMounted: w,
    modifiers: g,
    open: v,
    placement: m,
    popperOptions: h,
    popperRef: k,
    transition: T,
    slots: C,
    slotProps: E
  } = a, b = kt(a, Mf), _ = (r = C == null ? void 0 : C.root) != null ? r : c == null ? void 0 : c.Root, F = P({
    anchorEl: i,
    container: p,
    disablePortal: f,
    keepMounted: w,
    modifiers: g,
    open: v,
    placement: m,
    popperOptions: h,
    popperRef: k,
    transition: T
  }, b);
  return /* @__PURE__ */ s(Af, P({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: _
    },
    slotProps: E ?? d
  }, F, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Wo.propTypes = {
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
  anchorEl: u.oneOfType([xn, u.object, u.func]),
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
  container: u.oneOfType([xn, u.func]),
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
  popperRef: ns,
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
function Df(t) {
  return fr("MuiTooltip", t);
}
const ae = cs("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), jf = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Bf(t) {
  return Math.round(t * 1e5) / 1e5;
}
const Vf = (t) => {
  const {
    classes: e,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = t, i = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${qt(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return $o(i, Df, e);
}, zf = Pn(Wo, {
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
}) => P({
  zIndex: (t.vars || t).zIndex.tooltip,
  pointerEvents: "none"
}, !e.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, e.arrow && {
  [`&[data-popper-placement*="bottom"] .${ae.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${ae.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${ae.arrow}`]: P({}, e.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ae.arrow}`]: P({}, e.isRtl ? {
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
})), Ff = Pn("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.tooltip, n.touch && e.touch, n.arrow && e.tooltipArrow, e[`tooltipPlacement${qt(n.placement.split("-")[0])}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => P({
  backgroundColor: t.vars ? t.vars.palette.Tooltip.bg : fs(t.palette.grey[700], 0.92),
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
  lineHeight: `${Bf(16 / 14)}em`,
  fontWeight: t.typography.fontWeightRegular
}, {
  [`.${ae.popper}[data-popper-placement*="left"] &`]: P({
    transformOrigin: "right center"
  }, e.isRtl ? P({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  }) : P({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  })),
  [`.${ae.popper}[data-popper-placement*="right"] &`]: P({
    transformOrigin: "left center"
  }, e.isRtl ? P({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  }) : P({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  })),
  [`.${ae.popper}[data-popper-placement*="top"] &`]: P({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, e.touch && {
    marginBottom: "24px"
  }),
  [`.${ae.popper}[data-popper-placement*="bottom"] &`]: P({
    transformOrigin: "center top",
    marginTop: "14px"
  }, e.touch && {
    marginTop: "24px"
  })
})), Lf = Pn("span", {
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
  color: t.vars ? t.vars.palette.Tooltip.bg : fs(t.palette.grey[700], 0.9),
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
let Gn = !1;
const ni = new On();
let ln = {
  x: 0,
  y: 0
};
function Un(t, e) {
  return (n) => {
    e && e(n), t(n);
  };
}
const _s = /* @__PURE__ */ j.forwardRef(function(e, n) {
  var r, o, a, i, l, c, d, p, f, w, g, v, m, h, k, T, C, E, b;
  const _ = zo({
    props: e,
    name: "MuiTooltip"
  }), {
    arrow: F = !1,
    children: R,
    components: $ = {},
    componentsProps: L = {},
    describeChild: D = !1,
    disableFocusListener: I = !1,
    disableHoverListener: A = !1,
    disableInteractive: H = !1,
    disableTouchListener: G = !1,
    enterDelay: B = 100,
    enterNextDelay: Z = 0,
    enterTouchDelay: at = 700,
    followCursor: rt = !1,
    id: y,
    leaveDelay: O = 0,
    leaveTouchDelay: U = 1500,
    onClose: X,
    onOpen: z,
    open: K,
    placement: W = "bottom",
    PopperComponent: q,
    PopperProps: Y = {},
    slotProps: J = {},
    slots: Q = {},
    title: dt,
    TransitionComponent: M = nr,
    TransitionProps: Nt
  } = _, V = kt(_, jf), yt = /* @__PURE__ */ j.isValidElement(R) ? R : /* @__PURE__ */ s("span", {
    children: R
  }), Ut = Os(), de = Ut.direction === "rtl", [St, An] = j.useState(), [Xt, Ce] = j.useState(null), pe = j.useRef(!1), Oe = H || rt, Re = dn(), _e = dn(), ue = dn(), Ze = dn(), [Dn, qo] = os({
    controlled: K,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Jt = Dn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: tt
    } = j.useRef(K !== void 0);
    j.useEffect(() => {
      St && St.disabled && !tt && dt !== "" && St.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [dt, St, tt]);
  }
  const Cr = rs(y), Qe = j.useRef(), jn = oo(() => {
    Qe.current !== void 0 && (document.body.style.WebkitUserSelect = Qe.current, Qe.current = void 0), Ze.clear();
  });
  j.useEffect(() => jn, [jn]);
  const Ko = (tt) => {
    ni.clear(), Gn = !0, qo(!0), z && !Jt && z(tt);
  }, Bn = oo(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (tt) => {
      ni.start(800 + O, () => {
        Gn = !1;
      }), qo(!1), X && Jt && X(tt), Re.start(Ut.transitions.duration.shortest, () => {
        pe.current = !1;
      });
    }
  ), Or = (tt) => {
    pe.current && tt.type !== "touchstart" || (St && St.removeAttribute("title"), _e.clear(), ue.clear(), B || Gn && Z ? _e.start(Gn ? Z : B, () => {
      Ko(tt);
    }) : Ko(tt));
  }, Jo = (tt) => {
    _e.clear(), ue.start(O, () => {
      Bn(tt);
    });
  }, {
    isFocusVisibleRef: Zo,
    onBlur: Ms,
    onFocus: As,
    ref: Ds
  } = as(), [, Qo] = j.useState(!1), ta = (tt) => {
    Ms(tt), Zo.current === !1 && (Qo(!1), Jo(tt));
  }, ea = (tt) => {
    St || An(tt.currentTarget), As(tt), Zo.current === !0 && (Qo(!0), Or(tt));
  }, na = (tt) => {
    pe.current = !0;
    const $t = yt.props;
    $t.onTouchStart && $t.onTouchStart(tt);
  }, ra = Or, oa = Jo, js = (tt) => {
    na(tt), ue.clear(), Re.clear(), jn(), Qe.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Ze.start(at, () => {
      document.body.style.WebkitUserSelect = Qe.current, Or(tt);
    });
  }, Bs = (tt) => {
    yt.props.onTouchEnd && yt.props.onTouchEnd(tt), jn(), ue.start(U, () => {
      Bn(tt);
    });
  };
  j.useEffect(() => {
    if (!Jt)
      return;
    function tt($t) {
      ($t.key === "Escape" || $t.key === "Esc") && Bn($t);
    }
    return document.addEventListener("keydown", tt), () => {
      document.removeEventListener("keydown", tt);
    };
  }, [Bn, Jt]);
  const Vs = Ee(yt.ref, Ds, An, n);
  !dt && dt !== 0 && (Jt = !1);
  const Rr = j.useRef(), zs = (tt) => {
    const $t = yt.props;
    $t.onMouseMove && $t.onMouseMove(tt), ln = {
      x: tt.clientX,
      y: tt.clientY
    }, Rr.current && Rr.current.update();
  }, tn = {}, _r = typeof dt == "string";
  D ? (tn.title = !Jt && _r && !A ? dt : null, tn["aria-describedby"] = Jt ? Cr : null) : (tn["aria-label"] = _r ? dt : null, tn["aria-labelledby"] = Jt && !_r ? Cr : null);
  const jt = P({}, tn, V, yt.props, {
    className: ve(V.className, yt.props.className),
    onTouchStart: na,
    ref: Vs
  }, rt ? {
    onMouseMove: zs
  } : {});
  process.env.NODE_ENV !== "production" && (jt["data-mui-internal-clone-element"] = !0, j.useEffect(() => {
    St && !St.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [St]));
  const en = {};
  G || (jt.onTouchStart = js, jt.onTouchEnd = Bs), A || (jt.onMouseOver = Un(ra, jt.onMouseOver), jt.onMouseLeave = Un(oa, jt.onMouseLeave), Oe || (en.onMouseOver = ra, en.onMouseLeave = oa)), I || (jt.onFocus = Un(ea, jt.onFocus), jt.onBlur = Un(ta, jt.onBlur), Oe || (en.onFocus = ea, en.onBlur = ta)), process.env.NODE_ENV !== "production" && yt.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${yt.props.title}\` or the Tooltip component.`].join(`
`));
  const Fs = j.useMemo(() => {
    var tt;
    let $t = [{
      name: "arrow",
      enabled: !!Xt,
      options: {
        element: Xt,
        padding: 4
      }
    }];
    return (tt = Y.popperOptions) != null && tt.modifiers && ($t = $t.concat(Y.popperOptions.modifiers)), P({}, Y.popperOptions, {
      modifiers: $t
    });
  }, [Xt, Y]), nn = P({}, _, {
    isRtl: de,
    arrow: F,
    disableInteractive: Oe,
    placement: W,
    PopperComponentProp: q,
    touch: pe.current
  }), Pr = Vf(nn), aa = (r = (o = Q.popper) != null ? o : $.Popper) != null ? r : zf, ia = (a = (i = (l = Q.transition) != null ? l : $.Transition) != null ? i : M) != null ? a : nr, sa = (c = (d = Q.tooltip) != null ? d : $.Tooltip) != null ? c : Ff, la = (p = (f = Q.arrow) != null ? f : $.Arrow) != null ? p : Lf, Ls = pn(aa, P({}, Y, (w = J.popper) != null ? w : L.popper, {
    className: ve(Pr.popper, Y == null ? void 0 : Y.className, (g = (v = J.popper) != null ? v : L.popper) == null ? void 0 : g.className)
  }), nn), Gs = pn(ia, P({}, Nt, (m = J.transition) != null ? m : L.transition), nn), Us = pn(sa, P({}, (h = J.tooltip) != null ? h : L.tooltip, {
    className: ve(Pr.tooltip, (k = (T = J.tooltip) != null ? T : L.tooltip) == null ? void 0 : k.className)
  }), nn), Xs = pn(la, P({}, (C = J.arrow) != null ? C : L.arrow, {
    className: ve(Pr.arrow, (E = (b = J.arrow) != null ? b : L.arrow) == null ? void 0 : E.className)
  }), nn);
  return /* @__PURE__ */ x(j.Fragment, {
    children: [/* @__PURE__ */ j.cloneElement(yt, jt), /* @__PURE__ */ s(aa, P({
      as: q ?? Wo,
      placement: W,
      anchorEl: rt ? {
        getBoundingClientRect: () => ({
          top: ln.y,
          left: ln.x,
          right: ln.x,
          bottom: ln.y,
          width: 0,
          height: 0
        })
      } : St,
      popperRef: Rr,
      open: St ? Jt : !1,
      id: Cr,
      transition: !0
    }, en, Ls, {
      popperOptions: Fs,
      children: ({
        TransitionProps: tt
      }) => /* @__PURE__ */ s(ia, P({
        timeout: Ut.transitions.duration.shorter
      }, tt, Gs, {
        children: /* @__PURE__ */ x(sa, P({}, Us, {
          children: [dt, F ? /* @__PURE__ */ s(la, P({}, Xs, {
            ref: Ce
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (_s.propTypes = {
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
  children: Po.isRequired,
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
function ri(t, e, n) {
  return t ? /* @__PURE__ */ s(fi, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ s("img", { src: t, alt: `${n ? "Leading" : "Trailing"} icon for ${e}` }) }) : void 0;
}
function Ps(t) {
  const {
    onClick: e,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: d = !1,
    isDense: p = !0,
    isSubMenuParent: f = !1,
    hasDisabledGutters: w = !1,
    hasDivider: g = !1,
    focusVisibleClassName: v,
    id: m,
    children: h
  } = t, k = /* @__PURE__ */ s(
    Il,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: d,
      dense: p,
      disableGutters: w,
      divider: g,
      focusVisibleClassName: v,
      onClick: e,
      id: m,
      children: n ? /* @__PURE__ */ x(ne, { children: [
        ri(a, n, !0),
        /* @__PURE__ */ s(Ml, { primary: n, inset: !a && o }),
        f ? /* @__PURE__ */ s(fi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ s(hs, {}) }) : ri(i, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ s(_s, { title: r, placement: "right", children: /* @__PURE__ */ s("div", { children: k }) }) : k;
}
function $s(t) {
  return Object.entries(t.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Gf(t) {
  const [e, n] = ut(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = t, i = (d) => {
    n(d.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let d = $s(a).filter((p) => "menuItem" in p.group);
    if (!(r != null && r.id)) throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (p) => "menuItem" in p.group && p.group.menuItem === r.id
    ), /* @__PURE__ */ s(Is, { ...t, includedGroups: d });
  };
  return /* @__PURE__ */ x(ne, { children: [
    /* @__PURE__ */ s(Ps, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ s(
      Al,
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
const Uf = (t, e) => e.filter((o) => o.group === t).sort((o, a) => (o.order || 0) - (a.order || 0));
function Is(t) {
  const { menuDefinition: e, onClick: n, commandHandler: r, includedGroups: o } = t, { items: a, allowForLeadingIcons: i } = Ct(() => {
    const p = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      $s(e).filter((v) => !("menuItem" in v.group))
    ), f = Object.values(p).sort(
      (v, m) => (v.group.order || 0) - (m.group.order || 0)
    ), w = [];
    f.forEach((v) => {
      Uf(v.id, e.items).forEach(
        (m) => w.push({ item: m, isLastItemInGroup: !1 })
      ), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !0);
    }), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !1);
    const g = w.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: w, allowForLeadingIcons: g };
  }, [o, e]), l = ({ item: p, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: p.label,
    tooltip: p.tooltip,
    iconPathBefore: "iconPathBefore" in p ? p.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in p ? p.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: i
  }), [c] = a;
  if (!c) return /* @__PURE__ */ s("div", {});
  const d = c.item.group;
  return /* @__PURE__ */ s("div", { role: "menu", "aria-label": d, children: a.map((p, f) => {
    const { item: w } = p, g = l(p);
    if ("command" in w) {
      const v = w.group + f;
      return /* @__PURE__ */ s(
        Ps,
        {
          onClick: (m) => {
            n == null || n(m), r(w);
          },
          ...g
        },
        v
      );
    }
    return /* @__PURE__ */ s(
      Gf,
      {
        parentMenuItem: w,
        parentItemProps: g,
        ...t
      },
      d + w.id
    );
  }) }, d);
}
function Xf(t) {
  const { menuDefinition: e, columnId: n } = t;
  let a = Object.entries(e.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return n && "columns" in e && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  e.columns[n] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === n
  )), /* @__PURE__ */ s(Is, { ...t, includedGroups: a });
}
function Hf({
  commandHandler: t,
  menuDefinition: e,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ x(
    mi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ s("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ s(Dl, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ s(
          Xf,
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
function Yf({
  commandHandler: t,
  className: e,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = Ct(() => {
    const i = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible") return;
      const c = l, d = o[c];
      typeof d == "object" && typeof d.order == "number" && !Number.isNaN(d.order) ? i.set(d.order, { id: c, metadata: d }) : console.warn(
        `Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(i.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ s(
    mi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${e ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((i, l) => /* @__PURE__ */ s(
        Hf,
        {
          commandHandler: t,
          menuDefinition: n,
          ...i,
          className: e
        },
        l
      ))
    }
  );
}
function Wf(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const uo = (t, e, n = {}) => {
  const r = be(e);
  r.current = e;
  const o = be(n);
  o.current = Wf(o.current);
  const [a, i] = ut(() => r.current), [l, c] = ut(!0);
  return se(() => {
    let d = !0;
    return c(!!t), (async () => {
      if (t) {
        const p = await t();
        d && (i(() => p), c(!1));
      }
    })(), () => {
      d = !1, o.current.preserveValue || i(() => r.current);
    };
  }, [t]), [a, l];
}, qf = ms(/* @__PURE__ */ s("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Kf({
  menuProvider: t,
  normalMenu: e,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, d] = ut(!1), [p, f] = ut(!1), w = Et(() => {
    c && d(!1), f(!1);
  }, [c]), g = Et((E) => {
    E.stopPropagation(), d((b) => {
      const _ = !b;
      return _ && E.shiftKey ? f(!0) : _ || f(!1), _;
    });
  }, []), v = Et(
    (E) => (w(), r(E)),
    [r, w]
  ), [m, h] = ut({ top: 1, left: 1 });
  se(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const b = E.getBoundingClientRect(), _ = window.scrollY, F = window.scrollX, R = b.top + _ + E.clientHeight, $ = b.left + F;
        h({ top: R, left: $ });
      }
    }
  }, [c, o]);
  const [k] = uo(
    Et(async () => (t == null ? void 0 : t(!1)) ?? e, [t, e, c]),
    e
  ), [T] = uo(
    Et(async () => (t == null ? void 0 : t(!0)) ?? n ?? k, [t, n, k, c]),
    n ?? k
  ), C = p && T ? T : k;
  return /* @__PURE__ */ x(ne, { children: [
    /* @__PURE__ */ s(
      hi,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${i ?? ""} menu button`,
        onClick: g,
        children: l ?? /* @__PURE__ */ s(qf, {})
      }
    ),
    /* @__PURE__ */ s(
      jl,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: w,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: m.top,
            left: m.left
          }
        },
        children: C ? /* @__PURE__ */ s(
          Yf,
          {
            className: a,
            id: `${i ?? ""} main menu`,
            commandHandler: v,
            multiColumnMenu: C
          }
        ) : void 0
      }
    )
  ] });
}
function eh({
  id: t,
  label: e,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: c,
  children: d
}) {
  return /* @__PURE__ */ s(
    hi,
    {
      id: t,
      disabled: n,
      edge: a,
      size: i,
      "aria-label": e,
      title: o ? void 0 : r ?? e,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: d
    }
  );
}
const Mn = rr(({ className: t, ...e }, n) => /* @__PURE__ */ s(wl, { size: 35, className: N("tw-animate-spin", t), ...e, ref: n }));
Mn.displayName = "Spinner";
function nh({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: d,
  value: p,
  onChange: f,
  onFocus: w,
  onBlur: g
}) {
  return /* @__PURE__ */ x("div", { className: N("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ s(
      At,
      {
        htmlFor: t,
        className: N({
          "tw-text-red-600": n,
          "tw-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ s(
      Ke,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
        className: N(c, { "tw-border-red-600": n }),
        defaultValue: d,
        value: p,
        onChange: f,
        onFocus: w,
        onBlur: g
      }
    ),
    /* @__PURE__ */ s("p", { className: N({ "tw-hidden": !o }), children: o })
  ] });
}
function rh({
  menuProvider: t,
  commandHandler: e,
  className: n,
  id: r,
  children: o
}) {
  const a = be(void 0);
  return /* @__PURE__ */ s("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ s(Bl, { position: "static", id: r, children: /* @__PURE__ */ x(
    Vl,
    {
      className: N("tw-bg-muted tw-text-muted-foreground", n),
      variant: "dense",
      children: [
        t ? /* @__PURE__ */ s(
          Kf,
          {
            commandHandler: e,
            containerRef: a,
            menuProvider: t
          }
        ) : void 0,
        o ? /* @__PURE__ */ s("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const Jf = qe(
  "tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",
  {
    variants: {
      variant: {
        default: "tw-bg-background tw-text-foreground",
        destructive: "tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Zf = S.forwardRef(({ className: t, variant: e, ...n }, r) => /* @__PURE__ */ s("div", { ref: r, role: "alert", className: N(Jf({ variant: e }), t), ...n }));
Zf.displayName = "Alert";
const Qf = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ x(
    "h5",
    {
      ref: n,
      className: N("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
Qf.displayName = "AlertTitle";
const tm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s("div", { ref: n, className: N("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
tm.displayName = "AlertDescription";
const em = qe(
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
function nm({ className: t, variant: e, ...n }) {
  return /* @__PURE__ */ s("div", { className: N("pr-twp", em({ variant: e }), t), ...n });
}
const rm = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      className: N(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
rm.displayName = "Card";
const om = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      className: N("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
om.displayName = "CardHeader";
const am = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "h3",
    {
      ref: n,
      className: N(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
am.displayName = "CardTitle";
const im = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s("p", { ref: n, className: N("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
im.displayName = "CardDescription";
const sm = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s("div", { ref: n, className: N("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
sm.displayName = "CardContent";
const lm = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      className: N("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
lm.displayName = "CardFooter";
function oh({ ...t }) {
  return /* @__PURE__ */ s(
    Fl,
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
const cm = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ x(
    cn.Root,
    {
      ref: n,
      className: N(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: r,
      children: [
        /* @__PURE__ */ s(cn.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ s(cn.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ s(cn.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
cm.displayName = cn.Root.displayName;
const dm = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ s(
    Kr.Root,
    {
      className: N(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ s(
        Kr.Thumb,
        {
          className: N(
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
dm.displayName = Kr.Root.displayName;
const ah = Pt.Root, pm = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ s(
    Pt.List,
    {
      ref: n,
      className: N(
        "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: r
    }
  );
});
pm.displayName = Pt.List.displayName;
const um = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Pt.Trigger,
  {
    ref: n,
    className: N(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
um.displayName = Pt.Trigger.displayName;
const wm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Pt.Content,
  {
    ref: n,
    className: N(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
wm.displayName = Pt.Content.displayName;
function ih({
  isInstalling: t,
  handleClick: e,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ s(
    wt,
    {
      className: N(
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
      children: t ? /* @__PURE__ */ s(Mn, { size: 15 }) : /* @__PURE__ */ x(ne, { children: [
        /* @__PURE__ */ s(fl, { size: 25, className: N("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function sh({
  isEnabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ s(
    wt,
    {
      className: N(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ x(ne, { children: [
        /* @__PURE__ */ s(Mn, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function lh({
  isDisabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ s(
    wt,
    {
      className: N(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ x(ne, { children: [
        /* @__PURE__ */ s(Mn, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function ch({
  isUpdating: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ s(
    wt,
    {
      className: N(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ x(ne, { children: [
        /* @__PURE__ */ s(Mn, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function dh({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: r
}) {
  const o = Ct(
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
  return /* @__PURE__ */ s("div", { id: t, className: N("pr-twp tw-prose", n), children: /* @__PURE__ */ s(Ll, { options: o, children: e }) });
}
const fm = rr((t, e) => /* @__PURE__ */ x(
  wt,
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
      /* @__PURE__ */ s(ml, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ s(
        or,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var mm = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(mm || {});
function ph({ id: t, groups: e }) {
  return /* @__PURE__ */ s("div", { id: t, children: /* @__PURE__ */ x(mo, { children: [
    /* @__PURE__ */ s(gi, { asChild: !0, children: /* @__PURE__ */ s(fm, {}) }),
    /* @__PURE__ */ s(ir, { children: e.map((n) => /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ s(Cn, { children: n.label }),
      /* @__PURE__ */ s(Hl, { children: n.items.map((r) => /* @__PURE__ */ s("div", { children: r.itemType === 0 ? /* @__PURE__ */ s(ho, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ s(vi, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ s(sr, {})
    ] }, n.label)) })
  ] }) });
}
function uh({ id: t, message: e }) {
  return /* @__PURE__ */ s("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ s("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ s("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function wh({
  id: t,
  category: e,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new El("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((l, c) => l + c, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ x(
    "div",
    {
      id: t,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ s("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: e }) }),
          /* @__PURE__ */ s("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ s(hl, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ s("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ s("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((l) => /* @__PURE__ */ s(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          r.length > 3 && /* @__PURE__ */ x(
            "button",
            {
              type: "button",
              onClick: () => i(),
              className: "tw-text-xs tw-text-gray-500 tw-underline",
              children: [
                "+",
                r.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ x("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ x(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ s(gl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ x(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ s(bl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function hm({ id: t, versionHistory: e }) {
  const [n, r] = ut(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), d = new Date(o.getTime() - c.getTime()), p = d.getUTCFullYear() - 1970, f = d.getUTCMonth(), w = d.getUTCDate() - 1;
    let g = "";
    return p > 0 ? g = `${p.toString()} year${p === 1 ? "" : "s"} ago` : f > 0 ? g = `${f.toString()} month${f === 1 ? "" : "s"} ago` : w === 0 ? g = "today" : g = `${w.toString()} day${w === 1 ? "" : "s"} ago`, g;
  }
  const i = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ x("div", { id: t, children: [
    /* @__PURE__ */ s("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ s("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ x("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ s("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ s("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ s("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ x("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ x("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ s("div", { children: a(l[1].date) })
      ] })
    ] }, l[0])) }),
    i.length > 5 && /* @__PURE__ */ s(
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
function fh({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = Ct(() => Sl(n), [n]), l = ((c) => {
    const d = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((p) => d.of(p));
  })(r);
  return /* @__PURE__ */ s("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ x("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ s(hm, { versionHistory: o }),
    /* @__PURE__ */ s("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ x("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ s("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ x("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ x("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ s("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ s("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ x("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ s("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function mh({
  entries: t,
  getEntriesCount: e,
  selected: n,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: i,
  sortSelected: l,
  icon: c,
  className: d,
  badgesPlaceholder: p
}) {
  return /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ s(
      Uc,
      {
        entries: t,
        getEntriesCount: e,
        selected: n,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: i,
        sortSelected: l,
        icon: c,
        className: d
      }
    ),
    n.length > 0 ? /* @__PURE__ */ s("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((f) => {
      var w;
      return /* @__PURE__ */ x(nm, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ s(
          wt,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => r(n.filter((g) => g !== f)),
            children: /* @__PURE__ */ s(wo, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (w = t.find((g) => g.value === f)) == null ? void 0 : w.label
      ] }, f);
    }) }) : /* @__PURE__ */ s(At, { children: p })
  ] });
}
const gm = (t, e) => t[e] ?? e;
function hh({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: r,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: a,
  localizedStrings: i,
  className: l
}) {
  const c = gm(
    i,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [d, p] = ut(!1), f = (g) => {
    o && o(g), r && r([g, ...n.filter((v) => v !== g)]), a && n.find((v) => v === g) && a([...n.filter((v) => v !== g)]), p(!1);
  }, w = (g, v) => {
    var h, k, T, C, E, b;
    const m = v !== g ? ((k = (h = t[g]) == null ? void 0 : h.uiNames) == null ? void 0 : k[v]) ?? ((C = (T = t[g]) == null ? void 0 : T.uiNames) == null ? void 0 : C.en) : void 0;
    return m ? `${(E = t[g]) == null ? void 0 : E.autonym} (${m})` : (b = t[g]) == null ? void 0 : b.autonym;
  };
  return /* @__PURE__ */ x("div", { className: N("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ x(
      Ve,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (g) => p(g),
        children: [
          /* @__PURE__ */ s(Ne, { children: /* @__PURE__ */ s(ze, {}) }),
          /* @__PURE__ */ s(
            ke,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((g) => /* @__PURE__ */ s(Bt, { value: g, children: w(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ x(ne, { children: [
      /* @__PURE__ */ s(At, { className: "tw-ms-3", children: c }),
      /* @__PURE__ */ s("div", { className: "tw-ms-3", children: /* @__PURE__ */ x(At, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((g) => w(g, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
const gh = (t, e) => {
  se(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
}, Yr = () => !1, bh = (t, e) => {
  const [n] = uo(
    Et(async () => {
      if (!t) return Yr;
      const r = await Promise.resolve(t(e));
      return async () => r();
    }, [e, t]),
    Yr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  se(() => () => {
    n !== Yr && n();
  }, [n]);
};
function bm(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
bm(`*, ::before, ::after {
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

    --popover: 0 0% 100%;
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
    --popover: 0 0% 100%;
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
.tw-right-auto {
  right: auto;
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
.tw-max-w-lg {
  max-width: 32rem;
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
.tw-bg-slate-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(241 245 249 / var(--tw-bg-opacity, 1));
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
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-ps-9 {
  padding-inline-start: 2.25rem;
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

.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-toolbar-children {
  padding: 10px;
  display: flex;
  gap: 8px;
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
`, "top");
export {
  Zf as Alert,
  tm as AlertDescription,
  Qf as AlertTitle,
  zm as BOOK_SELECTOR_STRING_KEYS,
  nm as Badge,
  Vm as BookChapterControl,
  Cc as BookSelectionMode,
  Fm as BookSelector,
  wt as Button,
  rm as Card,
  sm as CardContent,
  im as CardDescription,
  lm as CardFooter,
  om as CardHeader,
  am as CardTitle,
  Tc as ChapterRangeSelector,
  To as Checkbox,
  th as Checklist,
  Zr as ComboBox,
  Ac as DataTable,
  lh as DisableButton,
  mo as DropdownMenu,
  ho as DropdownMenuCheckboxItem,
  ir as DropdownMenuContent,
  Hl as DropdownMenuGroup,
  bi as DropdownMenuItem,
  mm as DropdownMenuItemType,
  Cn as DropdownMenuLabel,
  Am as DropdownMenuPortal,
  jm as DropdownMenuRadioGroup,
  vi as DropdownMenuRadioItem,
  sr as DropdownMenuSeparator,
  ql as DropdownMenuShortcut,
  Dm as DropdownMenuSub,
  Wl as DropdownMenuSubContent,
  Yl as DropdownMenuSubTrigger,
  gi as DropdownMenuTrigger,
  sh as EnableButton,
  mh as Filter,
  fm as FilterButton,
  ph as FilterDropdown,
  fh as Footer,
  Yf as GridMenu,
  Kf as HamburgerMenuButton,
  Xm as INVENTORY_STRING_KEYS,
  eh as IconButton,
  Ke as Input,
  ih as InstallButton,
  Hm as Inventory,
  At as Label,
  dh as MarkdownRenderer,
  Ps as MenuItem,
  wh as MoreInfo,
  Uc as MultiSelectComboBox,
  Ym as NavigationContentSearch,
  uh as NoExtensionsFound,
  Ci as Popover,
  yo as PopoverContent,
  Oi as PopoverTrigger,
  Ti as RadioGroup,
  Jr as RadioGroupItem,
  qm as ScriptureResultsViewer,
  Km as ScrollGroupSelector,
  Di as SearchBar,
  Ve as Select,
  ke as SelectContent,
  Rc as SelectGroup,
  Bt as SelectItem,
  _c as SelectLabel,
  $i as SelectScrollDownButton,
  Pi as SelectScrollUpButton,
  Pc as SelectSeparator,
  Ne as SelectTrigger,
  ze as SelectValue,
  Co as Separator,
  Jm as SettingsList,
  Qm as SettingsListHeader,
  Zm as SettingsListItem,
  pd as SettingsSidebar,
  Wm as SettingsSidebarContentSearch,
  cm as Slider,
  oh as Sonner,
  Mn as Spinner,
  dm as Switch,
  lr as Table,
  dr as TableBody,
  Mc as TableCaption,
  Fe as TableCell,
  Ic as TableFooter,
  yn as TableHead,
  cr as TableHeader,
  ie as TableRow,
  ah as Tabs,
  wm as TabsContent,
  pm as TabsList,
  um as TabsTrigger,
  nh as TextField,
  Ai as ToggleGroup,
  Xn as ToggleGroupItem,
  rh as Toolbar,
  hh as UiLanguageSelector,
  ch as UpdateButton,
  hm as VersionHistory,
  ji as VerticalTabs,
  Vi as VerticalTabsContent,
  Bi as VerticalTabsList,
  Xc as VerticalTabsTrigger,
  em as badgeVariants,
  bc as buttonVariants,
  N as cn,
  Bc as getBookNumFromId,
  jc as getLinesFromUSFM,
  wa as getNumberFromUSFM,
  Vc as getStatusForItem,
  Gm as inventoryCountColumn,
  Lm as inventoryItemColumn,
  Um as inventoryStatusColumn,
  xh as sonner,
  gh as useEvent,
  bh as useEventAsync,
  uo as usePromise
};
//# sourceMappingURL=index.js.map
