import cl, { jsx as i, jsxs as y, Fragment as de } from "react/jsx-runtime";
import * as B from "react";
import T, { forwardRef as lr, useCallback as Pt, useState as st, useRef as ke, useEffect as te, useLayoutEffect as ua, useMemo as Tt } from "react";
import { History as dl, ChevronRight as ui, Check as Cn, Circle as pi, ArrowDownWideNarrow as ul, Clock as pl, Bookmark as wl, X as po, Search as wi, ChevronsUpDown as wo, FilterIcon as fl, ChevronDown as On, ChevronUp as fi, ArrowLeftIcon as ml, ChevronLeftIcon as hl, ChevronRightIcon as gl, ArrowRightIcon as bl, CircleCheckIcon as vl, CircleXIcon as yl, CircleHelpIcon as xl, ArrowUpIcon as Nl, ArrowDownIcon as kl, ArrowUpDownIcon as El, Star as Tl, PanelLeft as Sl, PanelRight as Cl, ChevronLeft as Ol, LoaderCircle as Rl, Download as _l, Filter as Pl, User as $l, Link as Il, CircleHelp as Al, BookOpen as pa, Shapes as Ml, Globe as Dl, Ellipsis as Bl } from "lucide-react";
import Ee, { clsx as jl } from "clsx";
import { extendTailwindMerge as Vl } from "tailwind-merge";
import * as ht from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as zl } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Ll, deepEqual as fo, substring as Fl, formatScrRef as Pr, compareScrRefs as Yr, scrRefToBBBCCCVVV as $r, getLocalizeKeyForScrollGroupId as ft, NumberFormat as Ul, formatBytes as Gl, getErrorMessage as Xl } from "platform-bible-utils";
import { Slot as Je } from "@radix-ui/react-slot";
import { cva as Ze } from "class-variance-authority";
import * as mi from "@radix-ui/react-label";
import * as xn from "@radix-ui/react-radio-group";
import * as Nn from "@radix-ui/react-popover";
import { Command as Dt } from "cmdk";
import * as ee from "@radix-ui/react-dialog";
import { useReactTable as hi, getCoreRowModel as gi, getPaginationRowModel as Hl, getSortedRowModel as bi, getFilteredRowModel as Yl, flexRender as hn, getExpandedRowModel as Wl, getGroupedRowModel as ql } from "@tanstack/react-table";
import * as yt from "@radix-ui/react-select";
import * as Wr from "@radix-ui/react-checkbox";
import * as cr from "@radix-ui/react-toggle-group";
import * as vi from "@radix-ui/react-toggle";
import * as Bt from "@radix-ui/react-tabs";
import * as yi from "@radix-ui/react-separator";
import * as Rn from "@radix-ui/react-tooltip";
import Kl, { ThemeContext as Jl, internal_processStyles as Zl } from "@mui/styled-engine";
import { MenuItem as Ql, ListItemText as tc, ListItemIcon as xi, Menu as ec, Grid as Ni, List as nc, IconButton as ki, Drawer as rc, AppBar as oc, Toolbar as ac } from "@mui/material";
import * as ic from "react-dom";
import Xn from "react-dom";
import { Toaster as sc } from "sonner";
import { toast as og } from "sonner";
import * as pn from "@radix-ui/react-slider";
import * as qr from "@radix-ui/react-switch";
import lc from "markdown-to-jsx";
const cc = Vl({ prefix: "tw-" });
function k(...t) {
  return cc(jl(t));
}
const Qe = T.forwardRef(
  ({ className: t, type: e, ...n }, r) => /* @__PURE__ */ i(
    "input",
    {
      type: e,
      className: k(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: r,
      ...n
    }
  )
);
Qe.displayName = "Input";
const dc = "layoutDirection";
function St() {
  const t = localStorage.getItem(dc);
  return t === "rtl" ? t : "ltr";
}
const uc = lr(
  ({ handleSearch: t, handleKeyDown: e, handleOnClick: n, handleSubmit: r, ...o }, a) => {
    const s = St();
    return /* @__PURE__ */ y("div", { className: "tw-relative", children: [
      /* @__PURE__ */ i(
        Qe,
        {
          ...o,
          type: "text",
          className: k(
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
      /* @__PURE__ */ i(
        dl,
        {
          className: k(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",
            { "tw-right-3": s === "ltr" },
            { "tw-left-3 tw-right-auto": s === "rtl" }
          ),
          onClick: () => {
            console.log("back in history");
          }
        }
      )
    ] });
  }
), dr = ht.Root, mo = ht.Trigger, pc = ht.Group, gh = ht.Portal, bh = ht.Sub, vh = ht.RadioGroup, wc = T.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => /* @__PURE__ */ y(
  ht.SubTrigger,
  {
    ref: o,
    className: k(
      "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
      e && "tw-pl-8",
      t
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ i(ui, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
wc.displayName = ht.SubTrigger.displayName;
const fc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  ht.SubContent,
  {
    ref: n,
    className: k(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
fc.displayName = ht.SubContent.displayName;
const _n = T.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...r }, o) => {
  const a = St();
  return /* @__PURE__ */ i(ht.Portal, { children: /* @__PURE__ */ i(
    ht.Content,
    {
      ref: o,
      sideOffset: e,
      className: k(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...r,
      children: /* @__PURE__ */ i("div", { dir: a, children: n })
    }
  ) });
});
_n.displayName = ht.Content.displayName;
const er = T.forwardRef(({ className: t, inset: e, ...n }, r) => {
  const o = St();
  return /* @__PURE__ */ i(
    ht.Item,
    {
      ref: r,
      className: k(
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
er.displayName = ht.Item.displayName;
const ho = T.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => /* @__PURE__ */ y(
  ht.CheckboxItem,
  {
    ref: o,
    className: k(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ i(ht.ItemIndicator, { children: /* @__PURE__ */ i(Cn, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
ho.displayName = ht.CheckboxItem.displayName;
const Ei = T.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ y(
  ht.RadioItem,
  {
    ref: r,
    className: k(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ i(ht.ItemIndicator, { children: /* @__PURE__ */ i(pi, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Ei.displayName = ht.RadioItem.displayName;
const Pn = T.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ i(
  ht.Label,
  {
    ref: r,
    className: k("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Pn.displayName = ht.Label.displayName;
const $n = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  ht.Separator,
  {
    ref: n,
    className: k("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
$n.displayName = ht.Separator.displayName;
function mc({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: k("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
mc.displayName = "DropdownMenuShortcut";
var hc = Object.defineProperty, gc = (t, e, n) => e in t ? hc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, rt = (t, e, n) => gc(t, typeof e != "symbol" ? e + "" : e, n);
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
], Ti = [
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
], wa = Cc();
function tn(t, e = !0) {
  return e && (t = t.toUpperCase()), t in wa ? wa[t] : 0;
}
function bo(t) {
  return tn(t) > 0;
}
function bc(t) {
  const e = typeof t == "string" ? tn(t) : t;
  return e >= 40 && e <= 66;
}
function vc(t) {
  return (typeof t == "string" ? tn(t) : t) <= 39;
}
function Si(t) {
  return t <= 66;
}
function yc(t) {
  const e = typeof t == "string" ? tn(t) : t;
  return Ri(e) && !Si(e);
}
function* xc() {
  for (let t = 1; t <= Se.length; t++)
    yield t;
}
const Nc = 1, Ci = Se.length;
function kc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function vo(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Se.length ? e : Se[n];
}
function Oi(t) {
  return t <= 0 || t > Ci ? "******" : Ti[t - 1];
}
function Ec(t) {
  return Oi(tn(t));
}
function Ri(t) {
  const e = typeof t == "number" ? vo(t) : t;
  return bo(e) && !go.includes(e);
}
function Tc(t) {
  const e = typeof t == "number" ? vo(t) : t;
  return bo(e) && go.includes(e);
}
function Sc(t) {
  return Ti[t - 1].includes("*obsolete*");
}
function Cc() {
  const t = {};
  for (let e = 0; e < Se.length; e++)
    t[Se[e]] = e + 1;
  return t;
}
const ct = {
  allBookIds: Se,
  nonCanonicalIds: go,
  bookIdToNumber: tn,
  isBookIdValid: bo,
  isBookNT: bc,
  isBookOT: vc,
  isBookOTNT: Si,
  isBookDC: yc,
  allBookNumbers: xc,
  firstBook: Nc,
  lastBook: Ci,
  extraBooks: kc,
  bookNumberToId: vo,
  bookNumberToEnglishName: Oi,
  bookIdToEnglishName: Ec,
  isCanonical: Ri,
  isExtraMaterial: Tc,
  isObsolete: Sc
};
var Jt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(Jt || {});
const Vt = class {
  // private versInfo: Versification;
  constructor(e) {
    if (rt(this, "name"), rt(this, "fullPath"), rt(this, "isPresent"), rt(this, "hasVerseSegments"), rt(this, "isCustomized"), rt(this, "baseVersification"), rt(this, "scriptureBooks"), rt(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = Jt[e]) : (this._type = e, this.name = Jt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
rt(Vt, "Original", new Vt(Jt.Original)), rt(Vt, "Septuagint", new Vt(Jt.Septuagint)), rt(Vt, "Vulgate", new Vt(Jt.Vulgate)), rt(Vt, "English", new Vt(Jt.English)), rt(Vt, "RussianProtestant", new Vt(Jt.RussianProtestant)), rt(Vt, "RussianOrthodox", new Vt(Jt.RussianOrthodox));
let be = Vt;
function fa(t, e) {
  const n = e[0];
  for (let r = 1; r < e.length; r++)
    t = t.split(e[r]).join(n);
  return t.split(n);
}
var _i = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(_i || {});
const It = class it {
  constructor(e, n, r, o) {
    if (rt(this, "firstChapter"), rt(this, "lastChapter"), rt(this, "lastVerse"), rt(this, "hasSegmentsDefined"), rt(this, "text"), rt(this, "BBBCCCVVVS"), rt(this, "longHashCode"), rt(this, "versification"), rt(this, "rtlMark", "‏"), rt(this, "_bookNum", 0), rt(this, "_chapterNum", 0), rt(this, "_verseNum", 0), rt(this, "_verse"), r == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, s = n != null && n instanceof be ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = n != null && n instanceof be ? n : void 0;
        this.setEmpty(a), this._verseNum = e % it.chapterDigitShifter, this._chapterNum = Math.floor(
          e % it.bookDigitShifter / it.chapterDigitShifter
        ), this._bookNum = Math.floor(e / it.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof it) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null)
            return;
          const a = e instanceof be ? e : it.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = o ?? it.defaultVersification;
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
      return n = new it(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof sn)
        return n = new it(), { success: !1, verseRef: n };
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
    return e % it.bcvMaxValue * it.bookDigitShifter + (n >= 0 ? n % it.bcvMaxValue * it.chapterDigitShifter : 0) + (r >= 0 ? r % it.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: s } = e, l = a || o.toString();
    let c;
    return s && (c = new be(s)), n ? new it(n, r.toString(), l, c) : new it();
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
      if (n = n * 10 + +r - 0, n > it.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(it.verseRangeSeparator) || this._verse.includes(it.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ct.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = ct.bookIdToNumber(e);
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
    const { success: n, vNum: r } = it.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = it.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > ct.lastBook)
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
    this.versification = this.versification != null ? new be(e) : void 0;
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
    return this.validateVerse(it.verseRangeSeparators, it.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return it.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return it.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new be(Jt[s]);
        } catch {
          throw new sn("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new sn("Invalid reference : " + e);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ct.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !it.isVerseParseable(r[1]))
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
    return new it(this);
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
    return e instanceof it ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = it.verseRangeSeparators, r = it.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = fa(this._verse, r);
    for (const s of a.map((l) => fa(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const d = this.clone();
        if (d.verse = s[1], !e)
          for (let u = c + 1; u < d.verseNum; u++) {
            const f = new it(
              this._bookNum,
              this._chapterNum,
              u,
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ct.lastBook ? 2 : (ct.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = it.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = ct.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
rt(It, "defaultVersification", be.English), rt(It, "verseRangeSeparator", "-"), rt(It, "verseSequenceIndicator", ","), rt(It, "verseRangeSeparators", [It.verseRangeSeparator]), rt(It, "verseSequenceIndicators", [It.verseSequenceIndicator]), rt(It, "chapterDigitShifter", 1e3), rt(It, "bookDigitShifter", It.chapterDigitShifter * It.chapterDigitShifter), rt(It, "bcvMaxValue", It.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
rt(It, "ValidStatusType", _i);
class sn extends Error {
}
const Oc = lr(
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: s
  }, l) => /* @__PURE__ */ y(
    er,
    {
      ref: l,
      textValue: t,
      className: k(
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
            className: k(
              "tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": n,
                "tw-border-s-red-200": a.toLowerCase() === "ot",
                "tw-border-s-purple-200": a.toLowerCase() === "nt",
                "tw-border-s-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: ct.bookIdToEnglishName(t)
          }
        ),
        n && /* @__PURE__ */ i("div", { children: s })
      ]
    },
    t
  )
);
function Rc({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: e }, (l, c) => c + 1), s = Pt(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ i("div", { className: k("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: a.map((l) => /* @__PURE__ */ i(
    "div",
    {
      className: k(
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
function _c({ handleSort: t, handleLocationHistory: e, handleBookmarks: n }) {
  return /* @__PURE__ */ y(Pn, { className: "tw-flex tw-justify-between", children: [
    /* @__PURE__ */ i("p", { className: "tw-inline-block tw-align-middle", children: "Go To" }),
    /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ i(
        ul,
        {
          onClick: t,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ i(
        pl,
        {
          onClick: e,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ i(
        wl,
        {
          onClick: n,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      )
    ] })
  ] });
}
const gn = ct.allBookIds, Pc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ma = ["OT", "NT", "DC"], $c = 32 + 32 + 32, Ic = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Ac = (t) => ({
  OT: gn.filter((n) => ct.isBookOT(n)),
  NT: gn.filter((n) => ct.isBookNT(n)),
  DC: gn.filter((n) => ct.isBookDC(n))
})[t], ln = (t) => Ll(ct.bookIdToNumber(t));
function Mc() {
  return gn.map((e) => ct.bookIdToEnglishName(e));
}
function Dc(t) {
  return Mc().includes(t);
}
function Bc(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Dc(e))
    return gn.find((r) => ct.bookIdToEnglishName(r) === e);
}
function xh({ scrRef: t, handleSubmit: e }) {
  const n = St(), [r, o] = st(""), [a, s] = st(
    ct.bookNumberToId(t.bookNum)
  ), [l, c] = st(t.chapterNum ?? 0), [d, u] = st(
    ct.bookNumberToId(t.bookNum)
  ), [f, w] = st(!1), [g, v] = st(f), m = ke(void 0), h = ke(void 0), N = ke(void 0), S = Pt(
    (A) => Ac(A).filter((M) => {
      const Y = ct.bookIdToEnglishName(M).toLowerCase(), U = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return Y.includes(U) || // Match book name
      M.toLowerCase().includes(U);
    }),
    [r]
  ), C = (A) => {
    o(A);
  }, E = ke(!1), b = Pt((A) => {
    if (E.current) {
      E.current = !1;
      return;
    }
    w(A);
  }, []), P = Pt(
    (A, M, Y, U) => {
      if (c(
        ct.bookNumberToId(t.bookNum) !== A ? 1 : t.chapterNum
      ), M || ln(A) === -1) {
        e({
          bookNum: ct.bookIdToNumber(A),
          chapterNum: Y || 1,
          verseNum: U || 1
        }), w(!1), o("");
        return;
      }
      s(a !== A ? A : ""), w(!M);
    },
    [e, t.bookNum, t.chapterNum, a]
  ), L = (A) => {
    A <= 0 || A > ln(a) || P(a, !0, A);
  }, _ = Pt(() => {
    Ic.forEach((A) => {
      const M = r.match(A);
      if (M) {
        const [Y, U = void 0, V = void 0] = M.slice(1), tt = Bc(Y);
        (ct.isBookIdValid(Y) || tt) && P(
          tt ?? Y,
          !0,
          U ? parseInt(U, 10) : 1,
          V ? parseInt(V, 10) : 1
        );
      }
    });
  }, [P, r]), $ = Pt(
    (A) => {
      f ? (A.key === "ArrowDown" || A.key === "ArrowUp") && (typeof N < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      N.current !== null ? N.current.focus() : typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null && h.current.focus(), A.preventDefault()) : w(!0);
    },
    [f]
  ), F = (A) => {
    const { key: M } = A;
    M === "ArrowRight" || M === "ArrowLeft" || M === "ArrowDown" || M === "ArrowUp" || M === "Enter" || (m.current.dispatchEvent(new KeyboardEvent("keydown", { key: M })), m.current.focus());
  }, D = (A) => {
    const { key: M } = A;
    if (d === a) {
      if (M === "Enter") {
        A.preventDefault(), P(a, !0, l);
        return;
      }
      const Y = M === "ArrowRight" && !n || M === "ArrowRight" && n === "ltr" || M === "ArrowLeft" && n === "rtl", U = M === "ArrowLeft" && !n || M === "ArrowLeft" && n === "ltr" || M === "ArrowRight" && n === "rtl";
      let V = 0;
      if (Y)
        if (l < ln(d))
          V = 1;
        else {
          A.preventDefault();
          return;
        }
      else if (U)
        if (l > 1)
          V = -1;
        else {
          A.preventDefault();
          return;
        }
      else
        M === "ArrowDown" ? V = 6 : M === "ArrowUp" && (V = -6);
      l + V <= 0 || l + V > ln(d) ? c(0) : V !== 0 && (c(l + V), A.preventDefault());
    }
  };
  return te(() => {
    a === d ? a === ct.bookNumberToId(t.bookNum) ? c(t.chapterNum) : c(1) : c(0);
  }, [d, t.bookNum, t.chapterNum, a]), ua(() => {
    v(f);
  }, [f]), ua(() => {
    const A = setTimeout(() => {
      if (g && h.current && N.current) {
        const Y = N.current.offsetTop - $c;
        h.current.scrollTo({ top: Y, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(A);
    };
  }, [g]), /* @__PURE__ */ i("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ y(dr, { modal: !1, open: f, onOpenChange: b, children: [
    /* @__PURE__ */ i(mo, { asChild: !0, children: /* @__PURE__ */ i(
      uc,
      {
        ref: m,
        value: r,
        handleSearch: C,
        handleKeyDown: $,
        handleOnClick: () => {
          s(ct.bookNumberToId(t.bookNum)), u(ct.bookNumberToId(t.bookNum)), c(t.chapterNum > 0 ? t.chapterNum : 0), w(!0), m.current.focus();
        },
        onFocus: () => {
          E.current = !0;
        },
        handleSubmit: _,
        placeholder: `${ct.bookNumberToEnglishName(t.bookNum)} ${t.chapterNum}:${t.verseNum}`
      }
    ) }),
    /* @__PURE__ */ i(
      _n,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: F,
        align: n === "ltr" ? "start" : "end",
        ref: h,
        children: /* @__PURE__ */ y("div", { className: "rtl:tw-ps-2", children: [
          /* @__PURE__ */ i(
            _c,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ma.map(
            (A, M) => S(A).length > 0 && /* @__PURE__ */ y("div", { children: [
              /* @__PURE__ */ i(Pn, { className: "tw-font-semibold tw-text-foreground/80", children: Pc[A] }),
              S(A).map((Y) => /* @__PURE__ */ i("div", { children: /* @__PURE__ */ i(
                Oc,
                {
                  bookId: Y,
                  handleSelectBook: () => P(Y, !1),
                  isSelected: a === Y,
                  handleHighlightBook: () => u(Y),
                  handleKeyDown: D,
                  bookType: A,
                  ref: (U) => {
                    a === Y && (N.current = U);
                  },
                  children: /* @__PURE__ */ i(
                    Rc,
                    {
                      handleSelectChapter: L,
                      endChapter: ln(Y),
                      activeChapter: t.bookNum === ct.bookIdToNumber(Y) ? t.chapterNum : 0,
                      highlightedChapter: l,
                      handleHighlightedChapter: (U) => {
                        c(U);
                      }
                    }
                  )
                }
              ) }, Y)),
              ma.length - 1 !== M ? /* @__PURE__ */ i($n, {}) : void 0
            ] }, A)
          )
        ] })
      }
    )
  ] }) });
}
const jc = Ze(
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
), mt = T.forwardRef(
  ({ className: t, variant: e, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ i(r ? Je : "button", { className: k(jc({ variant: e, size: n, className: t })), ref: a, ...o })
);
mt.displayName = "Button";
const Vc = Ze(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Ct = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(mi.Root, { ref: n, className: k("pr-twp", Vc(), t), ...e }));
Ct.displayName = mi.Root.displayName;
const Pi = T.forwardRef(({ className: t, ...e }, n) => {
  const r = St();
  return /* @__PURE__ */ i(
    xn.Root,
    {
      className: k("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: r
    }
  );
});
Pi.displayName = xn.Root.displayName;
const Kr = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  xn.Item,
  {
    ref: n,
    className: k(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ i(xn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i(pi, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Kr.displayName = xn.Item.displayName;
const $i = Nn.Root, Ii = Nn.Trigger, yo = T.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...r }, o) => {
  const a = St();
  return /* @__PURE__ */ i(Nn.Portal, { children: /* @__PURE__ */ i(
    Nn.Content,
    {
      ref: o,
      align: e,
      sideOffset: n,
      className: k(
        "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...r,
      dir: a
    }
  ) });
});
yo.displayName = Nn.Content.displayName;
const zc = ee.Portal, Ai = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  ee.Overlay,
  {
    ref: n,
    className: k(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Ai.displayName = ee.Overlay.displayName;
const Lc = T.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = St();
  return /* @__PURE__ */ y(zc, { children: [
    /* @__PURE__ */ i(Ai, {}),
    /* @__PURE__ */ y(
      ee.Content,
      {
        ref: r,
        className: k(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: o,
        children: [
          e,
          /* @__PURE__ */ y(
            ee.Close,
            {
              className: k(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ i(po, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Lc.displayName = ee.Content.displayName;
const Fc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  ee.Title,
  {
    ref: n,
    className: k("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Fc.displayName = ee.Title.displayName;
const Uc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  ee.Description,
  {
    ref: n,
    className: k("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Uc.displayName = ee.Description.displayName;
const xo = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt,
  {
    ref: n,
    className: k(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
xo.displayName = Dt.displayName;
const No = T.forwardRef(({ className: t, ...e }, n) => {
  const r = St();
  return /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: r, children: [
    /* @__PURE__ */ i(wi, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ i(
      Dt.Input,
      {
        ref: n,
        className: k(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
No.displayName = Dt.Input.displayName;
const ko = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.List,
  {
    ref: n,
    className: k("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ko.displayName = Dt.List.displayName;
const Eo = T.forwardRef((t, e) => /* @__PURE__ */ i(Dt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Eo.displayName = Dt.Empty.displayName;
const Mi = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.Group,
  {
    ref: n,
    className: k(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Mi.displayName = Dt.Group.displayName;
const Gc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.Separator,
  {
    ref: n,
    className: k("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Gc.displayName = Dt.Separator.displayName;
const To = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.Item,
  {
    ref: n,
    className: k(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
To.displayName = Dt.Item.displayName;
function Xc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Jr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: r,
  popoverContentClassName: o,
  value: a,
  onChange: s = () => {
  },
  getOptionLabel: l = Xc,
  icon: c = void 0,
  buttonPlaceholder: d = "",
  textPlaceholder: u = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: w = "outline",
  alignDropDown: g = "start",
  isDisabled: v = !1,
  ...m
}) {
  const [h, N] = st(!1);
  return /* @__PURE__ */ y($i, { open: h, onOpenChange: N, ...m, children: [
    /* @__PURE__ */ i(Ii, { asChild: !0, children: /* @__PURE__ */ y(
      mt,
      {
        variant: w,
        role: "combobox",
        "aria-expanded": h,
        id: t,
        className: k(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          r ?? n
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ i("div", { className: "tw-pe-2", children: c }),
            /* @__PURE__ */ i("span", { className: "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: a ? l(a) : d })
          ] }),
          /* @__PURE__ */ i(wo, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      yo,
      {
        align: g,
        className: k("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ y(xo, { children: [
          /* @__PURE__ */ i(No, { placeholder: u, className: "tw-text-inherit" }),
          /* @__PURE__ */ i(Eo, { children: f }),
          /* @__PURE__ */ i(ko, { children: e.map((S) => /* @__PURE__ */ y(
            To,
            {
              value: l(S),
              onSelect: () => {
                s(S), N(!1);
              },
              children: [
                /* @__PURE__ */ i(
                  Cn,
                  {
                    className: k("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !a || l(a) !== l(S)
                    })
                  }
                ),
                l(S)
              ]
            },
            l(S)
          )) })
        ] })
      }
    )
  ] });
}
function Hc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const s = Tt(
    () => Array.from({ length: a }, (d, u) => u + 1),
    [a]
  );
  return /* @__PURE__ */ y(de, { children: [
    /* @__PURE__ */ i(Ct, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ i(
      Jr,
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
    /* @__PURE__ */ i(Ct, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ i(
      Jr,
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
var Yc = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Yc || {});
const Nh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ir = (t, e) => t[e] ?? e;
function kh({
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
  const u = Ir(d, "%webView_bookSelector_currentBook%"), f = Ir(d, "%webView_bookSelector_choose%"), w = Ir(d, "%webView_bookSelector_chooseBooks%"), [g, v] = st(
    "current book"
    /* CURRENT_BOOK */
  ), m = (h) => {
    v(h), t(h);
  };
  return /* @__PURE__ */ i(
    Pi,
    {
      className: "pr-twp tw-flex",
      value: g,
      onValueChange: (h) => m(h),
      children: /* @__PURE__ */ y("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ y("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(Kr, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ i(Ct, { className: "tw-ms-1", children: u })
          ] }),
          /* @__PURE__ */ i(Ct, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ i(
            Hc,
            {
              isDisabled: g === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: s,
              chapterCount: o,
              startChapter: l,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ y("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(Kr, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ i(Ct, { className: "tw-ms-1", children: w })
          ] }),
          /* @__PURE__ */ i(Ct, { className: "tw-flex tw-items-center", children: r.map((h) => ct.bookIdToEnglishName(h)).join(", ") }),
          /* @__PURE__ */ i(
            mt,
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
function Wc({ table: t }) {
  return /* @__PURE__ */ y(dr, { children: [
    /* @__PURE__ */ i(zl, { asChild: !0, children: /* @__PURE__ */ y(mt, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ i(fl, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ y(_n, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ i(Pn, { children: "Toggle columns" }),
      /* @__PURE__ */ i($n, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ i(
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
const Ue = yt.Root, qc = yt.Group, Ge = yt.Value, Ce = T.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = St();
  return /* @__PURE__ */ y(
    yt.Trigger,
    {
      ref: r,
      className: k(
        "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
        t
      ),
      ...n,
      dir: o,
      children: [
        e,
        /* @__PURE__ */ i(yt.Icon, { asChild: !0, children: /* @__PURE__ */ i(On, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Ce.displayName = yt.Trigger.displayName;
const Di = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.ScrollUpButton,
  {
    ref: n,
    className: k("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ i(fi, { className: "tw-h-4 tw-w-4" })
  }
));
Di.displayName = yt.ScrollUpButton.displayName;
const Bi = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.ScrollDownButton,
  {
    ref: n,
    className: k("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ i(On, { className: "tw-h-4 tw-w-4" })
  }
));
Bi.displayName = yt.ScrollDownButton.displayName;
const Oe = T.forwardRef(({ className: t, children: e, position: n = "popper", ...r }, o) => {
  const a = St();
  return /* @__PURE__ */ i(yt.Portal, { children: /* @__PURE__ */ y(
    yt.Content,
    {
      ref: o,
      className: k(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ i(Di, {}),
        /* @__PURE__ */ i(
          yt.Viewport,
          {
            className: k(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ i("div", { dir: a, children: e })
          }
        ),
        /* @__PURE__ */ i(Bi, {})
      ]
    }
  ) });
});
Oe.displayName = yt.Content.displayName;
const Kc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.Label,
  {
    ref: n,
    className: k("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Kc.displayName = yt.Label.displayName;
const Gt = T.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ y(
  yt.Item,
  {
    ref: r,
    className: k(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(yt.ItemIndicator, { children: /* @__PURE__ */ i(Cn, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ i(yt.ItemText, { children: e })
    ]
  }
));
Gt.displayName = yt.Item.displayName;
const Jc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.Separator,
  {
    ref: n,
    className: k("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Jc.displayName = yt.Separator.displayName;
function Zc({ table: t }) {
  return /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ y("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ i("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ y(
        Ue,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ i(Ce, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ i(Ge, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ i(Oe, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ i(Gt, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ y("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ y(
        mt,
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
      /* @__PURE__ */ y(
        mt,
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
      /* @__PURE__ */ y(
        mt,
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
      /* @__PURE__ */ y(
        mt,
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
const In = T.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ i("div", { className: k("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ i(
  "table",
  {
    ref: r,
    className: k("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
In.displayName = "Table";
const An = T.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ i(
  "thead",
  {
    ref: r,
    className: k(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": e },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
An.displayName = "TableHeader";
const Mn = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: k("[&_tr:last-child]:tw-border-0", t), ...e }));
Mn.displayName = "TableBody";
const Qc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "tfoot",
  {
    ref: n,
    className: k("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Qc.displayName = "TableFooter";
const Zt = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "tr",
    {
      ref: n,
      className: k(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        t
      ),
      ...e
    }
  )
);
Zt.displayName = "TableRow";
const fe = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "th",
  {
    ref: n,
    className: k(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
fe.displayName = "TableHead";
const zt = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: k("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
zt.displayName = "TableCell";
const td = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "caption",
  {
    ref: n,
    className: k("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
td.displayName = "TableCaption";
function ed({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: s = () => {
  }
}) {
  var h;
  const [l, c] = st([]), [d, u] = st([]), [f, w] = st({}), [g, v] = st({}), m = hi({
    data: e,
    columns: t,
    getCoreRowModel: gi(),
    ...n && { getPaginationRowModel: Hl() },
    onSortingChange: c,
    getSortedRowModel: bi(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Yl(),
    onColumnVisibilityChange: w,
    onRowSelectionChange: v,
    state: {
      sorting: l,
      columnFilters: d,
      columnVisibility: f,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ y("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ i(Wc, { table: m }),
    /* @__PURE__ */ y(In, { stickyHeader: a, children: [
      /* @__PURE__ */ i(An, { stickyHeader: a, children: m.getHeaderGroups().map((N) => /* @__PURE__ */ i(Zt, { children: N.headers.map((S) => /* @__PURE__ */ i(fe, { children: S.isPlaceholder ? void 0 : hn(S.column.columnDef.header, S.getContext()) }, S.id)) }, N.id)) }),
      /* @__PURE__ */ i(Mn, { children: (h = m.getRowModel().rows) != null && h.length ? m.getRowModel().rows.map((N) => /* @__PURE__ */ i(
        Zt,
        {
          onClick: () => s(N, m),
          "data-state": N.getIsSelected() && "selected",
          children: N.getVisibleCells().map((S) => /* @__PURE__ */ i(zt, { children: hn(S.column.columnDef.cell, S.getContext()) }, S.id))
        },
        N.id
      )) : /* @__PURE__ */ i(Zt, { children: /* @__PURE__ */ i(zt, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ i(
        mt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.previousPage(),
          disabled: !m.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ i(
        mt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.nextPage(),
          disabled: !m.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ i(Zc, { table: m })
  ] });
}
function nd({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], a = Tt(() => {
    const s = [];
    return t.forEach((l) => {
      s.some((c) => fo(c, l)) || s.push(l);
    }), s;
  }, [t]);
  return /* @__PURE__ */ y(In, { stickyHeader: !0, children: [
    /* @__PURE__ */ i(An, { stickyHeader: !0, children: /* @__PURE__ */ y(Zt, { children: [
      /* @__PURE__ */ i(fe, { children: r }),
      /* @__PURE__ */ i(fe, { children: o })
    ] }) }),
    /* @__PURE__ */ i(Mn, { children: a.length > 0 && a.map((s) => /* @__PURE__ */ y(
      Zt,
      {
        onClick: () => {
          e(s.reference);
        },
        children: [
          /* @__PURE__ */ i(zt, { children: `${ct.bookNumberToEnglishName(s.reference.bookNum)} ${s.reference.chapterNum}:${s.reference.verseNum}` }),
          /* @__PURE__ */ i(zt, { children: s.text })
        ]
      },
      `${s.reference.bookNum} ${s.reference.chapterNum}:${s.reference.verseNum}-${s.text}`
    )) })
  ] });
}
const So = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Wr.Root,
  {
    ref: n,
    className: k(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ i(
      Wr.Indicator,
      {
        className: k("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ i(Cn, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
So.displayName = Wr.Root.displayName;
const rd = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), ha = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, od = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? ct.bookIdToNumber(e[1]) : 0;
}, ad = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", ji = Ze(
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
), id = T.forwardRef(({ className: t, variant: e, size: n, ...r }, o) => /* @__PURE__ */ i(
  vi.Root,
  {
    ref: o,
    className: k(ji({ variant: e, size: n, className: t })),
    ...r
  }
));
id.displayName = vi.Root.displayName;
const Vi = T.createContext({
  size: "default",
  variant: "default"
}), zi = T.forwardRef(({ className: t, variant: e, size: n, children: r, ...o }, a) => {
  const s = St();
  return /* @__PURE__ */ i(
    cr.Root,
    {
      ref: a,
      className: k("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: s,
      children: /* @__PURE__ */ i(
        Vi.Provider,
        {
          value: { variant: e, size: n },
          children: r
        }
      )
    }
  );
});
zi.displayName = cr.Root.displayName;
const Jn = T.forwardRef(({ className: t, children: e, variant: n, size: r, ...o }, a) => {
  const s = T.useContext(Vi);
  return /* @__PURE__ */ i(
    cr.Item,
    {
      ref: a,
      className: k(
        ji({
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
Jn.displayName = cr.Item.displayName;
const ur = (t) => t === "asc" ? /* @__PURE__ */ i(Nl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ i(kl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ i(El, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Eh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ y(mt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    ur(e.getIsSorted())
  ] })
}), sd = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ y(mt, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    ur(n.getIsSorted())
  ] })
}), Th = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ y(mt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    ur(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Ar = (t, e, n, r, o, a) => {
  let s = [...n];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((d) => d !== c);
  }), r(s);
  let l = [...o];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), a(l);
}, Sh = (t, e, n, r, o) => ({
  accessorKey: "status",
  header: ({ column: a }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ y(mt, { variant: "ghost", onClick: () => a.toggleSorting(void 0), children: [
    t,
    ur(a.getIsSorted())
  ] }) }),
  cell: ({ row: a }) => {
    const s = a.getValue("status"), l = a.getValue("item");
    return /* @__PURE__ */ y(zi, { value: s, variant: "outline", type: "single", children: [
      /* @__PURE__ */ i(
        Jn,
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
          children: /* @__PURE__ */ i(vl, {})
        }
      ),
      /* @__PURE__ */ i(
        Jn,
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
          children: /* @__PURE__ */ i(yl, {})
        }
      ),
      /* @__PURE__ */ i(
        Jn,
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
          children: /* @__PURE__ */ i(xl, {})
        }
      )
    ] });
  }
}), Ch = Object.freeze([
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
]), ld = (t, e, n) => {
  let r = t;
  return e !== "all" && (r = r.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.items[0].includes(n))), r;
}, cd = (t, e, n, r, o) => {
  if (!t)
    return [];
  const a = [];
  let s = e.bookNum, l = e.chapterNum, c = e.verseNum;
  return rd(t).forEach((u) => {
    u.startsWith("\\id") && (s = od(u), l = 0, c = 0), u.startsWith("\\c") && (l = ha(u), c = 0), u.startsWith("\\v") && (c = ha(u), l === 0 && (l = e.chapterNum));
    let f = o.exec(u) ?? void 0;
    for (; f; ) {
      const w = [];
      f.forEach((h) => w.push(h));
      const g = f.index, v = a.find((h) => fo(h.items, w)), m = {
        reference: {
          bookNum: s !== void 0 ? s : -1,
          chapterNum: l !== void 0 ? l : -1,
          verseNum: c !== void 0 ? c : -1
        },
        text: Fl(u, Math.max(0, g - 25), Math.min(g + 25, u.length))
      };
      if (v)
        v.count += 1, v.occurrences.push(m);
      else {
        const h = {
          items: w,
          count: 1,
          status: ad(w[0], n, r),
          occurrences: [m]
        };
        a.push(h);
      }
      f = o.exec(u) ?? void 0;
    }
  }), a;
}, ie = (t, e) => t[e] ?? e;
function Oh({
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
  columns: u
}) {
  const f = ie(n, "%webView_inventory_all%"), w = ie(n, "%webView_inventory_approved%"), g = ie(n, "%webView_inventory_unapproved%"), v = ie(n, "%webView_inventory_unknown%"), m = ie(n, "%webView_inventory_scope_currentBook%"), h = ie(n, "%webView_inventory_scope_chapter%"), N = ie(n, "%webView_inventory_scope_verse%"), S = ie(n, "%webView_inventory_filter_text%"), C = ie(
    n,
    "%webView_inventory_show_additional_items%"
  ), [E, b] = st(!1), [P, L] = st("all"), [_, $] = st(""), [F, D] = st([]), A = Tt(() => l ? r instanceof RegExp ? cd(
    l,
    t,
    a,
    s,
    r
  ) : r(l, t, a, s) : [], [l, r, t, a, s]), M = Tt(() => {
    if (E)
      return A;
    const x = [];
    return A.forEach((O) => {
      const G = O.items[0], X = x.find(
        (z) => z.items[0] === G
      );
      X ? (X.count += O.count, X.occurrences = X.occurrences.concat(O.occurrences)) : x.push({
        items: [G],
        count: O.count,
        occurrences: O.occurrences,
        status: O.status
      });
    }), x;
  }, [E, A]), Y = Tt(() => ld(M, P, _), [M, P, _]), U = Tt(() => {
    var G, X;
    if (!E)
      return u;
    const x = (G = o == null ? void 0 : o.tableHeaders) == null ? void 0 : G.length;
    if (!x)
      return u;
    const O = [];
    for (let z = 0; z < x; z++)
      O.push(
        sd(
          ((X = o == null ? void 0 : o.tableHeaders) == null ? void 0 : X[z]) || "Additional Item",
          z + 1
        )
      );
    return [...O, ...u];
  }, [o == null ? void 0 : o.tableHeaders, u, E]);
  te(() => {
    D([]);
  }, [Y]);
  const V = (x, O) => {
    O.setRowSelection(() => {
      const G = {};
      return G[x.index] = !0, G;
    }), D(x.original.items);
  }, tt = (x) => {
    if (x === "book" || x === "chapter" || x === "verse")
      d(x);
    else
      throw new Error(`Invalid scope value: ${x}`);
  }, ot = (x) => {
    if (x === "all" || x === "approved" || x === "unapproved" || x === "unknown")
      L(x);
    else
      throw new Error(`Invalid status filter value: ${x}`);
  }, at = Tt(() => {
    if (M.length === 0 || F.length === 0)
      return [];
    const x = M.filter((O) => fo(
      E ? O.items : [O.items[0]],
      F
    ));
    if (x.length > 1)
      throw new Error("Selected item is not unique");
    return x[0].occurrences;
  }, [F, E, M]);
  return /* @__PURE__ */ y("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ y("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ y(
        Ue,
        {
          onValueChange: (x) => ot(x),
          defaultValue: P,
          children: [
            /* @__PURE__ */ i(Ce, { className: "tw-m-1", children: /* @__PURE__ */ i(Ge, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ y(Oe, { children: [
              /* @__PURE__ */ i(Gt, { value: "all", children: f }),
              /* @__PURE__ */ i(Gt, { value: "approved", children: w }),
              /* @__PURE__ */ i(Gt, { value: "unapproved", children: g }),
              /* @__PURE__ */ i(Gt, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ y(Ue, { onValueChange: (x) => tt(x), defaultValue: c, children: [
        /* @__PURE__ */ i(Ce, { className: "tw-m-1", children: /* @__PURE__ */ i(Ge, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ y(Oe, { children: [
          /* @__PURE__ */ i(Gt, { value: "book", children: m }),
          /* @__PURE__ */ i(Gt, { value: "chapter", children: h }),
          /* @__PURE__ */ i(Gt, { value: "verse", children: N })
        ] })
      ] }),
      /* @__PURE__ */ i(
        Qe,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: S,
          value: _,
          onChange: (x) => {
            $(x.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ y("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ i(
          So,
          {
            className: "tw-m-1",
            checked: E,
            onCheckedChange: (x) => {
              D([]), b(x);
            }
          }
        ),
        /* @__PURE__ */ i(Ct, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? C })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      ed,
      {
        columns: U,
        data: Y,
        onRowClickHandler: V,
        stickyHeader: !0
      }
    ) }),
    at.length > 0 && /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      nd,
      {
        occurrenceData: at,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
function dd({
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
  const [u, f] = st(!1), w = Pt(
    (m) => {
      var N;
      const h = (N = t.find((S) => S.label === m)) == null ? void 0 : N.value;
      h && r(
        n.includes(h) ? n.filter((S) => S !== h) : [...n, h]
      );
    },
    [t, n, r]
  ), g = () => s || o, v = Tt(() => {
    if (!l)
      return t;
    const m = t.filter((N) => N.starred).sort((N, S) => N.label.localeCompare(S.label)), h = t.filter((N) => !N.starred).sort((N, S) => {
      const C = n.includes(N.value), E = n.includes(S.value);
      return C && !E ? -1 : !C && E ? 1 : N.label.localeCompare(S.label);
    });
    return [...m, ...h];
  }, [t, n, l]);
  return /* @__PURE__ */ i("div", { className: d, children: /* @__PURE__ */ y($i, { open: u, onOpenChange: f, children: [
    /* @__PURE__ */ i(Ii, { asChild: !0, children: /* @__PURE__ */ y(
      mt,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": u,
        className: k(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        children: [
          /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ i("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ i("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: c }) }),
            /* @__PURE__ */ i(
              "div",
              {
                className: k({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ i("div", { className: "tw-font-normal", children: g() })
              }
            )
          ] }),
          /* @__PURE__ */ i(wo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(yo, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ y(xo, { children: [
      /* @__PURE__ */ i(No, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ y(ko, { children: [
        /* @__PURE__ */ i(Eo, { children: a }),
        /* @__PURE__ */ i(Mi, { children: v.map((m) => {
          const h = e ? e(m) : void 0;
          return /* @__PURE__ */ y(
            To,
            {
              value: m.label,
              onSelect: w,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ i("div", { className: "w-4", children: /* @__PURE__ */ i(
                  Cn,
                  {
                    className: k(
                      "tw-h-4 tw-w-4",
                      n.includes(m.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ i("div", { className: "tw-w-4", children: m.starred && /* @__PURE__ */ i(Tl, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ i("div", { className: "tw-flex-grow", children: m.label }),
                e && /* @__PURE__ */ i("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: h })
              ]
            },
            m.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function Co({
  onSearch: t,
  placeholder: e,
  isFullWidth: n,
  className: r
}) {
  const [o, a] = st(""), s = (c) => {
    a(c), t(c);
  }, l = St();
  return /* @__PURE__ */ y("div", { className: k("tw-relative", { "tw-w-full": n }, r), children: [
    /* @__PURE__ */ i(
      wi,
      {
        className: k(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": l === "rtl" },
          { "tw-left-3": l === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ i(
      Qe,
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: e,
        value: o,
        onChange: (c) => s(c.target.value)
      }
    ),
    o && /* @__PURE__ */ y(
      mt,
      {
        variant: "ghost",
        size: "icon",
        className: k(
          "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
          { "tw-left-0": l === "rtl" },
          { "tw-right-0": l === "ltr" }
        ),
        onClick: () => {
          s("");
        },
        children: [
          /* @__PURE__ */ i(po, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
const Li = T.forwardRef(({ className: t, ...e }, n) => {
  const r = St();
  return /* @__PURE__ */ i(
    Bt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: k("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: r
    }
  );
});
Li.displayName = Bt.List.displayName;
const Fi = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Bt.List,
  {
    ref: n,
    className: k(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Fi.displayName = Bt.List.displayName;
const ud = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Bt.Trigger,
  {
    ref: n,
    ...e,
    className: k(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Ui = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Bt.Content,
  {
    ref: n,
    className: k(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Ui.displayName = Bt.Content.displayName;
function Rh({
  tabList: t,
  onSearch: e,
  searchPlaceholder: n,
  headerTitle: r,
  searchClassName: o
}) {
  return /* @__PURE__ */ y("div", { className: "pr-twp", children: [
    /* @__PURE__ */ y("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      r ? /* @__PURE__ */ i("h1", { children: r }) : "",
      /* @__PURE__ */ i(
        Co,
        {
          className: o,
          onSearch: e,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ y(Li, { children: [
      /* @__PURE__ */ i(Fi, { children: t.map((a) => /* @__PURE__ */ i(ud, { value: a.value, children: a.value }, a.key)) }),
      t.map((a) => /* @__PURE__ */ i(Ui, { value: a.value, children: a.content }, a.key))
    ] })
  ] });
}
const Oo = T.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ i(
  yi.Root,
  {
    ref: o,
    decorative: n,
    orientation: e,
    className: k(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...r
  }
));
Oo.displayName = yi.Root.displayName;
function ga({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: k("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const pd = Rn.Provider, wd = Rn.Root, fd = Rn.Trigger, Gi = T.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ i(
  Rn.Content,
  {
    ref: r,
    sideOffset: e,
    className: k(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
Gi.displayName = Rn.Content.displayName;
const md = "16rem", hd = "3rem", Xi = T.createContext(void 0);
function pr() {
  const t = T.useContext(Xi);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Hi = T.forwardRef(
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
    const [d, u] = T.useState(t), f = e ?? d, w = T.useCallback(
      (C) => {
        const E = typeof C == "function" ? C(f) : C;
        n ? n(E) : u(E);
      },
      [n, f]
    ), g = T.useCallback(() => w((C) => !C), [w]), v = f ? "expanded" : "collapsed", N = St() === "ltr" ? s : s === "primary" ? "secondary" : "primary", S = T.useMemo(
      () => ({
        state: v,
        open: f,
        setOpen: w,
        toggleSidebar: g,
        side: N
      }),
      [v, f, w, g, N]
    );
    return /* @__PURE__ */ i(Xi.Provider, { value: S, children: /* @__PURE__ */ i(pd, { delayDuration: 0, children: /* @__PURE__ */ i(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": md,
            "--sidebar-width-icon": hd,
            ...o
          }
        ),
        className: k(
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
const Yi = T.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: r, ...o }, a) => {
  const s = pr();
  return e === "none" ? /* @__PURE__ */ i(
    "div",
    {
      className: k(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: a,
      ...o,
      children: r
    }
  ) : /* @__PURE__ */ y(
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
            className: k(
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
            className: k(
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
Yi.displayName = "Sidebar";
const gd = T.forwardRef(({ className: t, onClick: e, ...n }, r) => {
  const o = pr();
  return /* @__PURE__ */ y(
    mt,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: k("tw-h-7 tw-w-7", t),
      onClick: (a) => {
        e == null || e(a), o.toggleSidebar();
      },
      ...n,
      children: [
        o.side === "primary" ? /* @__PURE__ */ i(Sl, {}) : /* @__PURE__ */ i(Cl, {}),
        /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
gd.displayName = "SidebarTrigger";
const bd = T.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: r } = pr();
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
        className: k(
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
bd.displayName = "SidebarRail";
const Wi = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "main",
    {
      ref: n,
      className: k(
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
const vd = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Qe,
  {
    ref: n,
    "data-sidebar": "input",
    className: k(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
vd.displayName = "SidebarInput";
const yd = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: k("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
yd.displayName = "SidebarHeader";
const xd = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: k("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
xd.displayName = "SidebarFooter";
const Nd = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Oo,
  {
    ref: n,
    "data-sidebar": "separator",
    className: k("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
Nd.displayName = "SidebarSeparator";
const qi = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: k(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
qi.displayName = "SidebarContent";
const Zr = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: k("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
Zr.displayName = "SidebarGroup";
const Qr = T.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
  e ? Je : "div",
  {
    ref: r,
    "data-sidebar": "group-label",
    className: k(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
Qr.displayName = "SidebarGroupLabel";
const kd = T.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
  e ? Je : "button",
  {
    ref: r,
    "data-sidebar": "group-action",
    className: k(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
kd.displayName = "SidebarGroupAction";
const to = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: k("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
to.displayName = "SidebarGroupContent";
const Ki = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: k("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
Ki.displayName = "SidebarMenu";
const Ji = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: k("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
Ji.displayName = "SidebarMenuItem";
const Ed = Ze(
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
), Zi = T.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: o,
    className: a,
    ...s
  }, l) => {
    const c = t ? Je : "button", { state: d } = pr(), u = /* @__PURE__ */ i(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": e,
        className: k(Ed({ variant: n, size: r }), a),
        ...s
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ y(wd, { children: [
      /* @__PURE__ */ i(fd, { asChild: !0, children: u }),
      /* @__PURE__ */ i(Gi, { side: "right", align: "center", hidden: d !== "collapsed", ...o })
    ] })) : u;
  }
);
Zi.displayName = "SidebarMenuButton";
const Td = T.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...r }, o) => /* @__PURE__ */ i(
  e ? Je : "button",
  {
    ref: o,
    "data-sidebar": "menu-action",
    className: k(
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
Td.displayName = "SidebarMenuAction";
const Sd = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: k(
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
Sd.displayName = "SidebarMenuBadge";
const Cd = T.forwardRef(({ className: t, showIcon: e = !1, ...n }, r) => {
  const o = T.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ y(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: k("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ i(ga, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ i(
          ga,
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
Cd.displayName = "SidebarMenuSkeleton";
const Od = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: k(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
Od.displayName = "SidebarMenuSub";
const Rd = T.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ i("li", { ref: e, ...t })
);
Rd.displayName = "SidebarMenuSubItem";
const _d = T.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: r, ...o }, a) => /* @__PURE__ */ i(
  t ? Je : "a",
  {
    ref: a,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: k(
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
_d.displayName = "SidebarMenuSubButton";
function Pd({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: r,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: a,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l
}) {
  const c = Pt(
    (f, w) => {
      r(f, w);
    },
    [r]
  ), d = Pt(
    (f) => {
      const w = n.find((g) => g.projectId === f);
      return w ? w.projectName : f;
    },
    [n]
  ), u = Pt(
    (f) => !o.projectId && f === o.label,
    [o]
  );
  return /* @__PURE__ */ i(
    Yi,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: "tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",
      children: /* @__PURE__ */ y(qi, { children: [
        /* @__PURE__ */ y(Zr, { children: [
          /* @__PURE__ */ i(Qr, { className: "tw-text-sm tw-text-gray-400", children: a }),
          /* @__PURE__ */ i(to, { children: /* @__PURE__ */ i(Ki, { children: e.map((f) => /* @__PURE__ */ i(Ji, { children: /* @__PURE__ */ i(
            Zi,
            {
              className: k(
                "tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",
                { "tw-bg-white tw-text-gray-900 tw-shadow-sm": u(f) }
              ),
              onClick: () => c(f),
              isActive: u(f),
              children: /* @__PURE__ */ i("span", { className: "tw-pl-3", children: f })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ y(Zr, { children: [
          /* @__PURE__ */ i(Qr, { className: "tw-text-sm tw-text-gray-400", children: s }),
          /* @__PURE__ */ i(to, { className: "tw-pl-3", children: /* @__PURE__ */ i(
            Jr,
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
function _h({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  onSearch: s,
  extensionsSidebarGroupLabel: l,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: d
}) {
  return /* @__PURE__ */ y("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3", children: [
    /* @__PURE__ */ i("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ i(
      Co,
      {
        className: "tw-w-9/12",
        onSearch: s,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ y(Hi, { id: t, className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto", children: [
      /* @__PURE__ */ i(
        Pd,
        {
          extensionLabels: e,
          projectInfo: n,
          handleSelectSidebarItem: o,
          selectedSidebarItem: a,
          extensionsSidebarGroupLabel: l,
          projectsSidebarGroupLabel: c,
          buttonPlaceholderText: d
        }
      ),
      /* @__PURE__ */ i(Wi, { className: "tw-overflow-y-auto", children: r })
    ] })
  ] });
}
const pe = "scrBook", $d = "scrRef", ve = "source", Id = "details", Ad = "Scripture Reference", Md = "Scripture Book", Qi = "Type", Dd = "Details";
function Bd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (r) => `${ct.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: pe,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Ad,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? ct.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === pe ? Pr(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Yr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Pr(r.start),
      id: $d,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Pr(o.start);
      },
      sortingFn: (r, o) => Yr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: ve,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Qi : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Id,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Dd,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const jd = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Yr(t.start, t.end) === 0 ? `${$r(t.start)}+${e}` : `${$r(t.start)}+${e}-${$r(t.end)}+${n}`;
}, ba = (t) => `${jd({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Ph({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: s,
  onRowSelected: l
}) {
  const [c, d] = st([]), [u, f] = st([{ id: pe, desc: !1 }]), [w, g] = st({}), v = Tt(
    () => t.flatMap((_) => _.data.map(($) => ({
      ...$,
      source: _.source
    }))),
    [t]
  ), m = Tt(
    () => Bd(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: s
      },
      n
    ),
    [r, a, s, n]
  );
  te(() => {
    c.includes(ve) ? f([
      { id: ve, desc: !1 },
      { id: pe, desc: !1 }
    ]) : f([{ id: pe, desc: !1 }]);
  }, [c]);
  const h = hi({
    data: v,
    columns: m,
    state: {
      grouping: c,
      sorting: u,
      rowSelection: w
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: Wl(),
    getGroupedRowModel: ql(),
    getCoreRowModel: gi(),
    getSortedRowModel: bi(),
    getRowId: ba,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  te(() => {
    if (l) {
      const _ = h.getSelectedRowModel().rowsById, $ = Object.keys(_);
      if ($.length === 1) {
        const F = v.find((D) => ba(D) === $[0]) || void 0;
        F && l(F);
      }
    }
  }, [w, v, l, h]);
  const N = o ?? Md, S = a ?? Qi, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${N}`, value: [pe] },
    { label: `Group by ${S}`, value: [ve] },
    {
      label: `Group by ${N} and ${S}`,
      value: [pe, ve]
    },
    {
      label: `Group by ${S} and ${N}`,
      value: [ve, pe]
    }
  ], E = (_) => {
    d(JSON.parse(_));
  }, b = (_, $) => {
    !_.getIsGrouped() && !_.getIsSelected() && _.getToggleSelectedHandler()($);
  }, P = (_, $) => _.getIsGrouped() ? "" : k("banded-row", $ % 2 === 0 ? "even" : "odd"), L = (_, $, F) => {
    if (!((_ == null ? void 0 : _.length) === 0 || $.depth < F.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ y("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ y(
      Ue,
      {
        value: JSON.stringify(c),
        onValueChange: (_) => {
          E(_);
        },
        children: [
          /* @__PURE__ */ i(Ce, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ i(Ge, {}) }),
          /* @__PURE__ */ i(Oe, { position: "item-aligned", children: /* @__PURE__ */ i(qc, { children: C.map((_) => /* @__PURE__ */ i(Gt, { value: JSON.stringify(_.value), children: _.label }, _.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ y(In, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ i(An, { children: h.getHeaderGroups().map((_) => /* @__PURE__ */ i(Zt, { children: _.headers.filter(($) => $.column.columnDef.header).map(($) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ i(fe, { colSpan: $.colSpan, className: "top-0 tw-sticky", children: $.isPlaceholder ? void 0 : /* @__PURE__ */ y("div", { children: [
          $.column.getCanGroup() ? /* @__PURE__ */ i(
            mt,
            {
              variant: "ghost",
              title: `Toggle grouping by ${$.column.columnDef.header}`,
              onClick: $.column.getToggleGroupingHandler(),
              type: "button",
              children: $.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          hn($.column.columnDef.header, $.getContext())
        ] }) }, $.id)
      )) }, _.id)) }),
      /* @__PURE__ */ i(Mn, { children: h.getRowModel().rows.map((_, $) => {
        const F = St();
        return /* @__PURE__ */ i(
          Zt,
          {
            "data-state": _.getIsSelected() ? "selected" : "",
            className: k(P(_, $)),
            onClick: (D) => b(_, D),
            children: _.getVisibleCells().map((D) => {
              if (!(D.getIsPlaceholder() || D.column.columnDef.enableGrouping && !D.getIsGrouped() && (D.column.columnDef.id !== ve || !n)))
                return /* @__PURE__ */ i(
                  zt,
                  {
                    className: k(
                      D.column.columnDef.id,
                      "tw-p-[1px]",
                      L(c, _, D)
                    ),
                    children: (() => D.getIsGrouped() ? /* @__PURE__ */ y(
                      mt,
                      {
                        variant: "link",
                        onClick: _.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          _.getIsExpanded() && /* @__PURE__ */ i(On, {}),
                          !_.getIsExpanded() && (F === "ltr" ? /* @__PURE__ */ i(ui, {}) : /* @__PURE__ */ i(Ol, {})),
                          " ",
                          hn(D.column.columnDef.cell, D.getContext()),
                          " (",
                          _.subRows.length,
                          ")"
                        ]
                      }
                    ) : hn(D.column.columnDef.cell, D.getContext()))()
                  },
                  D.id
                );
            })
          },
          _.id
        );
      }) })
    ] })
  ] });
}
const Mr = {
  [ft("undefined")]: "Ø",
  [ft(0)]: "A",
  [ft(1)]: "B",
  [ft(2)]: "C",
  [ft(3)]: "D",
  [ft(4)]: "E",
  [ft(5)]: "F",
  [ft(6)]: "G",
  [ft(7)]: "H",
  [ft(8)]: "I",
  [ft(9)]: "J",
  [ft(10)]: "K",
  [ft(11)]: "L",
  [ft(12)]: "M",
  [ft(13)]: "N",
  [ft(14)]: "O",
  [ft(15)]: "P",
  [ft(16)]: "Q",
  [ft(17)]: "R",
  [ft(18)]: "S",
  [ft(19)]: "T",
  [ft(20)]: "U",
  [ft(21)]: "V",
  [ft(22)]: "W",
  [ft(23)]: "X",
  [ft(24)]: "Y",
  [ft(25)]: "Z"
};
function $h({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: r = {}
}) {
  const o = {
    ...Mr,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([s, l]) => [
          s,
          s === l && s in Mr ? Mr[s] : l
        ]
      )
    )
  }, a = St();
  return /* @__PURE__ */ y(
    Ue,
    {
      value: `${e}`,
      onValueChange: (s) => n(
        s === "undefined" ? void 0 : parseInt(s, 10)
      ),
      children: [
        /* @__PURE__ */ i(Ce, { className: "pr-twp tw-w-auto", children: /* @__PURE__ */ i(
          Ge,
          {
            placeholder: o[ft(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ i(
          Oe,
          {
            align: a === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((s) => /* @__PURE__ */ i(Gt, { value: `${s}`, children: o[ft(s)] }, `${s}`))
          }
        )
      ]
    }
  );
}
function Ih({ children: t }) {
  return /* @__PURE__ */ i("div", { className: "pr-twp tw-grid", children: t });
}
function Ah({
  primary: t,
  secondary: e,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ y("div", { children: [
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ i("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ i("div", { children: n })
  ] });
}
function Mh({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ y("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ y("div", { children: [
      /* @__PURE__ */ i("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ i(Oo, {}) : ""
  ] });
}
function Dh({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ i("div", { id: t, className: e, children: n.map((s) => /* @__PURE__ */ y("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ i(
      So,
      {
        className: "tw-me-2 tw-align-middle",
        checked: r.includes(s),
        onCheckedChange: (l) => o(s, l)
      }
    ),
    /* @__PURE__ */ i(Ct, { children: a ? a(s) : s })
  ] }, s)) });
}
function Vd(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function zd(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else
    n = {};
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
var Ro = {}, ts = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(ts);
var Ld = ts.exports, Dr = {};
function _o(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return t(...r) || e(...r);
  };
}
function I() {
  return I = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, I.apply(this, arguments);
}
function Ne(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function es(t) {
  if (!Ne(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((n) => {
    e[n] = es(t[n]);
  }), e;
}
function se(t, e, n = {
  clone: !0
}) {
  const r = n.clone ? I({}, t) : t;
  return Ne(t) && Ne(e) && Object.keys(e).forEach((o) => {
    o !== "__proto__" && (Ne(e[o]) && o in t && Ne(t[o]) ? r[o] = se(t[o], e[o], n) : n.clone ? r[o] = Ne(e[o]) ? es(e[o]) : e[o] : r[o] = e[o]);
  }), r;
}
var eo = { exports: {} }, Hn = { exports: {} }, dt = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var va;
function Fd() {
  if (va)
    return dt;
  va = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, v = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, N = t ? Symbol.for("react.responder") : 60118, S = t ? Symbol.for("react.scope") : 60119;
  function C(b) {
    if (typeof b == "object" && b !== null) {
      var P = b.$$typeof;
      switch (P) {
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
                case u:
                case v:
                case g:
                case s:
                  return b;
                default:
                  return P;
              }
          }
        case n:
          return P;
      }
    }
  }
  function E(b) {
    return C(b) === d;
  }
  return dt.AsyncMode = c, dt.ConcurrentMode = d, dt.ContextConsumer = l, dt.ContextProvider = s, dt.Element = e, dt.ForwardRef = u, dt.Fragment = r, dt.Lazy = v, dt.Memo = g, dt.Portal = n, dt.Profiler = a, dt.StrictMode = o, dt.Suspense = f, dt.isAsyncMode = function(b) {
    return E(b) || C(b) === c;
  }, dt.isConcurrentMode = E, dt.isContextConsumer = function(b) {
    return C(b) === l;
  }, dt.isContextProvider = function(b) {
    return C(b) === s;
  }, dt.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === e;
  }, dt.isForwardRef = function(b) {
    return C(b) === u;
  }, dt.isFragment = function(b) {
    return C(b) === r;
  }, dt.isLazy = function(b) {
    return C(b) === v;
  }, dt.isMemo = function(b) {
    return C(b) === g;
  }, dt.isPortal = function(b) {
    return C(b) === n;
  }, dt.isProfiler = function(b) {
    return C(b) === a;
  }, dt.isStrictMode = function(b) {
    return C(b) === o;
  }, dt.isSuspense = function(b) {
    return C(b) === f;
  }, dt.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === d || b === a || b === o || b === f || b === w || typeof b == "object" && b !== null && (b.$$typeof === v || b.$$typeof === g || b.$$typeof === s || b.$$typeof === l || b.$$typeof === u || b.$$typeof === h || b.$$typeof === N || b.$$typeof === S || b.$$typeof === m);
  }, dt.typeOf = C, dt;
}
var ut = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ya;
function Ud() {
  return ya || (ya = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, v = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, N = t ? Symbol.for("react.responder") : 60118, S = t ? Symbol.for("react.scope") : 60119;
    function C(R) {
      return typeof R == "string" || typeof R == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      R === r || R === d || R === a || R === o || R === f || R === w || typeof R == "object" && R !== null && (R.$$typeof === v || R.$$typeof === g || R.$$typeof === s || R.$$typeof === l || R.$$typeof === u || R.$$typeof === h || R.$$typeof === N || R.$$typeof === S || R.$$typeof === m);
    }
    function E(R) {
      if (typeof R == "object" && R !== null) {
        var Et = R.$$typeof;
        switch (Et) {
          case e:
            var j = R.type;
            switch (j) {
              case c:
              case d:
              case r:
              case a:
              case o:
              case f:
                return j;
              default:
                var xt = j && j.$$typeof;
                switch (xt) {
                  case l:
                  case u:
                  case v:
                  case g:
                  case s:
                    return xt;
                  default:
                    return Et;
                }
            }
          case n:
            return Et;
        }
      }
    }
    var b = c, P = d, L = l, _ = s, $ = e, F = u, D = r, A = v, M = g, Y = n, U = a, V = o, tt = f, ot = !1;
    function at(R) {
      return ot || (ot = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), x(R) || E(R) === c;
    }
    function x(R) {
      return E(R) === d;
    }
    function O(R) {
      return E(R) === l;
    }
    function G(R) {
      return E(R) === s;
    }
    function X(R) {
      return typeof R == "object" && R !== null && R.$$typeof === e;
    }
    function z(R) {
      return E(R) === u;
    }
    function q(R) {
      return E(R) === r;
    }
    function W(R) {
      return E(R) === v;
    }
    function K(R) {
      return E(R) === g;
    }
    function H(R) {
      return E(R) === n;
    }
    function Z(R) {
      return E(R) === a;
    }
    function Q(R) {
      return E(R) === o;
    }
    function lt(R) {
      return E(R) === f;
    }
    ut.AsyncMode = b, ut.ConcurrentMode = P, ut.ContextConsumer = L, ut.ContextProvider = _, ut.Element = $, ut.ForwardRef = F, ut.Fragment = D, ut.Lazy = A, ut.Memo = M, ut.Portal = Y, ut.Profiler = U, ut.StrictMode = V, ut.Suspense = tt, ut.isAsyncMode = at, ut.isConcurrentMode = x, ut.isContextConsumer = O, ut.isContextProvider = G, ut.isElement = X, ut.isForwardRef = z, ut.isFragment = q, ut.isLazy = W, ut.isMemo = K, ut.isPortal = H, ut.isProfiler = Z, ut.isStrictMode = Q, ut.isSuspense = lt, ut.isValidElementType = C, ut.typeOf = E;
  }()), ut;
}
var xa;
function ns() {
  return xa || (xa = 1, process.env.NODE_ENV === "production" ? Hn.exports = Fd() : Hn.exports = Ud()), Hn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Br, Na;
function Gd() {
  if (Na)
    return Br;
  Na = 1;
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
      var c = Object.getOwnPropertyNames(s).map(function(u) {
        return s[u];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var d = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        d[u] = u;
      }), Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Br = o() ? Object.assign : function(a, s) {
    for (var l, c = r(a), d, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
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
var jr, ka;
function Po() {
  if (ka)
    return jr;
  ka = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return jr = t, jr;
}
var Vr, Ea;
function rs() {
  return Ea || (Ea = 1, Vr = Function.call.bind(Object.prototype.hasOwnProperty)), Vr;
}
var zr, Ta;
function Xd() {
  if (Ta)
    return zr;
  Ta = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = Po(), n = {}, r = rs();
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
      for (var u in a)
        if (r(a, u)) {
          var f;
          try {
            if (typeof a[u] != "function") {
              var w = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw w.name = "Invariant Violation", w;
            }
            f = a[u](s, u, c, l, null, e);
          } catch (v) {
            f = v;
          }
          if (f && !(f instanceof Error) && t(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
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
  }, zr = o, zr;
}
var Lr, Sa;
function Hd() {
  if (Sa)
    return Lr;
  Sa = 1;
  var t = ns(), e = Gd(), n = Po(), r = rs(), o = Xd(), a = function() {
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
  return Lr = function(l, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function f(x) {
      var O = x && (d && x[d] || x[u]);
      if (typeof O == "function")
        return O;
    }
    var w = "<<anonymous>>", g = {
      array: N("array"),
      bigint: N("bigint"),
      bool: N("boolean"),
      func: N("function"),
      number: N("number"),
      object: N("object"),
      string: N("string"),
      symbol: N("symbol"),
      any: S(),
      arrayOf: C,
      element: E(),
      elementType: b(),
      instanceOf: P,
      node: F(),
      objectOf: _,
      oneOf: L,
      oneOfType: $,
      shape: A,
      exact: M
    };
    function v(x, O) {
      return x === O ? x !== 0 || 1 / x === 1 / O : x !== x && O !== O;
    }
    function m(x, O) {
      this.message = x, this.data = O && typeof O == "object" ? O : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function h(x) {
      if (process.env.NODE_ENV !== "production")
        var O = {}, G = 0;
      function X(q, W, K, H, Z, Q, lt) {
        if (H = H || w, Q = Q || K, lt !== n) {
          if (c) {
            var R = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw R.name = "Invariant Violation", R;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Et = H + ":" + K;
            !O[Et] && // Avoid spamming the console because they are often not actionable except for lib authors
            G < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + Q + "` prop on `" + H + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), O[Et] = !0, G++);
          }
        }
        return W[K] == null ? q ? W[K] === null ? new m("The " + Z + " `" + Q + "` is marked as required " + ("in `" + H + "`, but its value is `null`.")) : new m("The " + Z + " `" + Q + "` is marked as required in " + ("`" + H + "`, but its value is `undefined`.")) : null : x(W, K, H, Z, Q);
      }
      var z = X.bind(null, !1);
      return z.isRequired = X.bind(null, !0), z;
    }
    function N(x) {
      function O(G, X, z, q, W, K) {
        var H = G[X], Z = V(H);
        if (Z !== x) {
          var Q = tt(H);
          return new m(
            "Invalid " + q + " `" + W + "` of type " + ("`" + Q + "` supplied to `" + z + "`, expected ") + ("`" + x + "`."),
            { expectedType: x }
          );
        }
        return null;
      }
      return h(O);
    }
    function S() {
      return h(s);
    }
    function C(x) {
      function O(G, X, z, q, W) {
        if (typeof x != "function")
          return new m("Property `" + W + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var K = G[X];
        if (!Array.isArray(K)) {
          var H = V(K);
          return new m("Invalid " + q + " `" + W + "` of type " + ("`" + H + "` supplied to `" + z + "`, expected an array."));
        }
        for (var Z = 0; Z < K.length; Z++) {
          var Q = x(K, Z, z, q, W + "[" + Z + "]", n);
          if (Q instanceof Error)
            return Q;
        }
        return null;
      }
      return h(O);
    }
    function E() {
      function x(O, G, X, z, q) {
        var W = O[G];
        if (!l(W)) {
          var K = V(W);
          return new m("Invalid " + z + " `" + q + "` of type " + ("`" + K + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(x);
    }
    function b() {
      function x(O, G, X, z, q) {
        var W = O[G];
        if (!t.isValidElementType(W)) {
          var K = V(W);
          return new m("Invalid " + z + " `" + q + "` of type " + ("`" + K + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(x);
    }
    function P(x) {
      function O(G, X, z, q, W) {
        if (!(G[X] instanceof x)) {
          var K = x.name || w, H = at(G[X]);
          return new m("Invalid " + q + " `" + W + "` of type " + ("`" + H + "` supplied to `" + z + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return h(O);
    }
    function L(x) {
      if (!Array.isArray(x))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function O(G, X, z, q, W) {
        for (var K = G[X], H = 0; H < x.length; H++)
          if (v(K, x[H]))
            return null;
        var Z = JSON.stringify(x, function(lt, R) {
          var Et = tt(R);
          return Et === "symbol" ? String(R) : R;
        });
        return new m("Invalid " + q + " `" + W + "` of value `" + String(K) + "` " + ("supplied to `" + z + "`, expected one of " + Z + "."));
      }
      return h(O);
    }
    function _(x) {
      function O(G, X, z, q, W) {
        if (typeof x != "function")
          return new m("Property `" + W + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var K = G[X], H = V(K);
        if (H !== "object")
          return new m("Invalid " + q + " `" + W + "` of type " + ("`" + H + "` supplied to `" + z + "`, expected an object."));
        for (var Z in K)
          if (r(K, Z)) {
            var Q = x(K, Z, z, q, W + "." + Z, n);
            if (Q instanceof Error)
              return Q;
          }
        return null;
      }
      return h(O);
    }
    function $(x) {
      if (!Array.isArray(x))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var O = 0; O < x.length; O++) {
        var G = x[O];
        if (typeof G != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ot(G) + " at index " + O + "."
          ), s;
      }
      function X(z, q, W, K, H) {
        for (var Z = [], Q = 0; Q < x.length; Q++) {
          var lt = x[Q], R = lt(z, q, W, K, H, n);
          if (R == null)
            return null;
          R.data && r(R.data, "expectedType") && Z.push(R.data.expectedType);
        }
        var Et = Z.length > 0 ? ", expected one of type [" + Z.join(", ") + "]" : "";
        return new m("Invalid " + K + " `" + H + "` supplied to " + ("`" + W + "`" + Et + "."));
      }
      return h(X);
    }
    function F() {
      function x(O, G, X, z, q) {
        return Y(O[G]) ? null : new m("Invalid " + z + " `" + q + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return h(x);
    }
    function D(x, O, G, X, z) {
      return new m(
        (x || "React class") + ": " + O + " type `" + G + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function A(x) {
      function O(G, X, z, q, W) {
        var K = G[X], H = V(K);
        if (H !== "object")
          return new m("Invalid " + q + " `" + W + "` of type `" + H + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var Z in x) {
          var Q = x[Z];
          if (typeof Q != "function")
            return D(z, q, W, Z, tt(Q));
          var lt = Q(K, Z, z, q, W + "." + Z, n);
          if (lt)
            return lt;
        }
        return null;
      }
      return h(O);
    }
    function M(x) {
      function O(G, X, z, q, W) {
        var K = G[X], H = V(K);
        if (H !== "object")
          return new m("Invalid " + q + " `" + W + "` of type `" + H + "` " + ("supplied to `" + z + "`, expected `object`."));
        var Z = e({}, G[X], x);
        for (var Q in Z) {
          var lt = x[Q];
          if (r(x, Q) && typeof lt != "function")
            return D(z, q, W, Q, tt(lt));
          if (!lt)
            return new m(
              "Invalid " + q + " `" + W + "` key `" + Q + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(G[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(x), null, "  ")
            );
          var R = lt(K, Q, z, q, W + "." + Q, n);
          if (R)
            return R;
        }
        return null;
      }
      return h(O);
    }
    function Y(x) {
      switch (typeof x) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !x;
        case "object":
          if (Array.isArray(x))
            return x.every(Y);
          if (x === null || l(x))
            return !0;
          var O = f(x);
          if (O) {
            var G = O.call(x), X;
            if (O !== x.entries) {
              for (; !(X = G.next()).done; )
                if (!Y(X.value))
                  return !1;
            } else
              for (; !(X = G.next()).done; ) {
                var z = X.value;
                if (z && !Y(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function U(x, O) {
      return x === "symbol" ? !0 : O ? O["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && O instanceof Symbol : !1;
    }
    function V(x) {
      var O = typeof x;
      return Array.isArray(x) ? "array" : x instanceof RegExp ? "object" : U(O, x) ? "symbol" : O;
    }
    function tt(x) {
      if (typeof x > "u" || x === null)
        return "" + x;
      var O = V(x);
      if (O === "object") {
        if (x instanceof Date)
          return "date";
        if (x instanceof RegExp)
          return "regexp";
      }
      return O;
    }
    function ot(x) {
      var O = tt(x);
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
    function at(x) {
      return !x.constructor || !x.constructor.name ? w : x.constructor.name;
    }
    return g.checkPropTypes = o, g.resetWarningCache = o.resetWarningCache, g.PropTypes = g, g;
  }, Lr;
}
var Fr, Ca;
function Yd() {
  if (Ca)
    return Fr;
  Ca = 1;
  var t = Po();
  function e() {
  }
  function n() {
  }
  return n.resetWarningCache = e, Fr = function() {
    function r(s, l, c, d, u, f) {
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
  }, Fr;
}
if (process.env.NODE_ENV !== "production") {
  var Wd = ns(), qd = !0;
  eo.exports = Hd()(Wd.isElement, qd);
} else
  eo.exports = Yd()();
var Kd = eo.exports;
const p = /* @__PURE__ */ Vd(Kd);
function Jd(t) {
  const {
    prototype: e = {}
  } = t;
  return !!e.isReactComponent;
}
function os(t, e, n, r, o) {
  const a = t[e], s = o || e;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Jd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const as = _o(p.element, os);
as.isRequired = _o(p.element.isRequired, os);
const is = as, Zd = "exact-prop: ​";
function Qd(t) {
  return process.env.NODE_ENV === "production" ? t : I({}, t, {
    [Zd]: (e) => {
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
var no = { exports: {} }, pt = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oa;
function tu() {
  if (Oa)
    return pt;
  Oa = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function m(h) {
    if (typeof h == "object" && h !== null) {
      var N = h.$$typeof;
      switch (N) {
        case t:
          switch (h = h.type, h) {
            case n:
            case o:
            case r:
            case d:
            case u:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case s:
                case c:
                case w:
                case f:
                case a:
                  return h;
                default:
                  return N;
              }
          }
        case e:
          return N;
      }
    }
  }
  return pt.ContextConsumer = s, pt.ContextProvider = a, pt.Element = t, pt.ForwardRef = c, pt.Fragment = n, pt.Lazy = w, pt.Memo = f, pt.Portal = e, pt.Profiler = o, pt.StrictMode = r, pt.Suspense = d, pt.SuspenseList = u, pt.isAsyncMode = function() {
    return !1;
  }, pt.isConcurrentMode = function() {
    return !1;
  }, pt.isContextConsumer = function(h) {
    return m(h) === s;
  }, pt.isContextProvider = function(h) {
    return m(h) === a;
  }, pt.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, pt.isForwardRef = function(h) {
    return m(h) === c;
  }, pt.isFragment = function(h) {
    return m(h) === n;
  }, pt.isLazy = function(h) {
    return m(h) === w;
  }, pt.isMemo = function(h) {
    return m(h) === f;
  }, pt.isPortal = function(h) {
    return m(h) === e;
  }, pt.isProfiler = function(h) {
    return m(h) === o;
  }, pt.isStrictMode = function(h) {
    return m(h) === r;
  }, pt.isSuspense = function(h) {
    return m(h) === d;
  }, pt.isSuspenseList = function(h) {
    return m(h) === u;
  }, pt.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === d || h === u || h === g || typeof h == "object" && h !== null && (h.$$typeof === w || h.$$typeof === f || h.$$typeof === a || h.$$typeof === s || h.$$typeof === c || h.$$typeof === v || h.getModuleId !== void 0);
  }, pt.typeOf = m, pt;
}
var wt = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ra;
function eu() {
  return Ra || (Ra = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), v = !1, m = !1, h = !1, N = !1, S = !1, C;
    C = Symbol.for("react.module.reference");
    function E(j) {
      return !!(typeof j == "string" || typeof j == "function" || j === n || j === o || S || j === r || j === d || j === u || N || j === g || v || m || h || typeof j == "object" && j !== null && (j.$$typeof === w || j.$$typeof === f || j.$$typeof === a || j.$$typeof === s || j.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      j.$$typeof === C || j.getModuleId !== void 0));
    }
    function b(j) {
      if (typeof j == "object" && j !== null) {
        var xt = j.$$typeof;
        switch (xt) {
          case t:
            var Ot = j.type;
            switch (Ot) {
              case n:
              case o:
              case r:
              case d:
              case u:
                return Ot;
              default:
                var oe = Ot && Ot.$$typeof;
                switch (oe) {
                  case l:
                  case s:
                  case c:
                  case w:
                  case f:
                  case a:
                    return oe;
                  default:
                    return xt;
                }
            }
          case e:
            return xt;
        }
      }
    }
    var P = s, L = a, _ = t, $ = c, F = n, D = w, A = f, M = e, Y = o, U = r, V = d, tt = u, ot = !1, at = !1;
    function x(j) {
      return ot || (ot = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function O(j) {
      return at || (at = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function G(j) {
      return b(j) === s;
    }
    function X(j) {
      return b(j) === a;
    }
    function z(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function q(j) {
      return b(j) === c;
    }
    function W(j) {
      return b(j) === n;
    }
    function K(j) {
      return b(j) === w;
    }
    function H(j) {
      return b(j) === f;
    }
    function Z(j) {
      return b(j) === e;
    }
    function Q(j) {
      return b(j) === o;
    }
    function lt(j) {
      return b(j) === r;
    }
    function R(j) {
      return b(j) === d;
    }
    function Et(j) {
      return b(j) === u;
    }
    wt.ContextConsumer = P, wt.ContextProvider = L, wt.Element = _, wt.ForwardRef = $, wt.Fragment = F, wt.Lazy = D, wt.Memo = A, wt.Portal = M, wt.Profiler = Y, wt.StrictMode = U, wt.Suspense = V, wt.SuspenseList = tt, wt.isAsyncMode = x, wt.isConcurrentMode = O, wt.isContextConsumer = G, wt.isContextProvider = X, wt.isElement = z, wt.isForwardRef = q, wt.isFragment = W, wt.isLazy = K, wt.isMemo = H, wt.isPortal = Z, wt.isProfiler = Q, wt.isStrictMode = lt, wt.isSuspense = R, wt.isSuspenseList = Et, wt.isValidElementType = E, wt.typeOf = b;
  }()), wt;
}
process.env.NODE_ENV === "production" ? no.exports = tu() : no.exports = eu();
var _a = no.exports;
const nu = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function ru(t) {
  const e = `${t}`.match(nu);
  return e && e[1] || "";
}
function ss(t, e = "") {
  return t.displayName || t.name || ru(t) || e;
}
function Pa(t, e, n) {
  const r = ss(e);
  return t.displayName || (r !== "" ? `${n}(${r})` : n);
}
function ou(t) {
  if (t != null) {
    if (typeof t == "string")
      return t;
    if (typeof t == "function")
      return ss(t, "Component");
    if (typeof t == "object")
      switch (t.$$typeof) {
        case _a.ForwardRef:
          return Pa(t, t.render, "ForwardRef");
        case _a.Memo:
          return Pa(t, t.type, "memo");
        default:
          return;
      }
  }
}
function kn(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = t[e], s = o || e;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const au = p.oneOfType([p.func, p.object]), ls = au;
function ne(t) {
  if (typeof t != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Xe(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function iu(...t) {
  return t.reduce((e, n) => n == null ? e : function(...o) {
    e.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function su(t, e = 166) {
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
function lu(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${e}`) : null;
  };
}
function cu(t, e) {
  var n, r;
  return /* @__PURE__ */ B.isValidElement(t) && e.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = t.type.muiName) != null ? n : (r = t.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function nr(t) {
  return t && t.ownerDocument || document;
}
function du(t) {
  return nr(t).defaultView || window;
}
function uu(t, e) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = e ? I({}, e.propTypes) : null;
  return (o) => (a, s, l, c, d, ...u) => {
    const f = d || s, w = n == null ? void 0 : n[f];
    if (w) {
      const g = w(a, s, l, c, d, ...u);
      if (g)
        return g;
    }
    return typeof a[s] < "u" && !a[o] ? new Error(`The prop \`${f}\` of \`${t}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function rr(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
const pu = typeof window < "u" ? B.useLayoutEffect : B.useEffect, He = pu;
let $a = 0;
function wu(t) {
  const [e, n] = B.useState(t), r = t || e;
  return B.useEffect(() => {
    e == null && ($a += 1, n(`mui-${$a}`));
  }, [e]), r;
}
const Ia = B["useId".toString()];
function cs(t) {
  if (Ia !== void 0) {
    const e = Ia();
    return t ?? e;
  }
  return wu(t);
}
function fu(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || e;
  return typeof t[e] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function ds({
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
function ro(t) {
  const e = B.useRef(t);
  return He(() => {
    e.current = t;
  }), B.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, e.current)(...n)
  )).current;
}
function Re(...t) {
  return B.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
      rr(n, e);
    });
  }, t);
}
const Aa = {};
function mu(t, e) {
  const n = B.useRef(Aa);
  return n.current === Aa && (n.current = t(e)), n;
}
const hu = [];
function gu(t) {
  B.useEffect(t, hu);
}
class Dn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Dn();
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
function wn() {
  const t = mu(Dn.create).current;
  return gu(t.disposeEffect), t;
}
let wr = !0, oo = !1;
const bu = new Dn(), vu = {
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
function yu(t) {
  const {
    type: e,
    tagName: n
  } = t;
  return !!(n === "INPUT" && vu[e] && !t.readOnly || n === "TEXTAREA" && !t.readOnly || t.isContentEditable);
}
function xu(t) {
  t.metaKey || t.altKey || t.ctrlKey || (wr = !0);
}
function Ur() {
  wr = !1;
}
function Nu() {
  this.visibilityState === "hidden" && oo && (wr = !0);
}
function ku(t) {
  t.addEventListener("keydown", xu, !0), t.addEventListener("mousedown", Ur, !0), t.addEventListener("pointerdown", Ur, !0), t.addEventListener("touchstart", Ur, !0), t.addEventListener("visibilitychange", Nu, !0);
}
function Eu(t) {
  const {
    target: e
  } = t;
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return wr || yu(e);
}
function us() {
  const t = B.useCallback((o) => {
    o != null && ku(o.ownerDocument);
  }, []), e = B.useRef(!1);
  function n() {
    return e.current ? (oo = !0, bu.start(100, () => {
      oo = !1;
    }), e.current = !1, !0) : !1;
  }
  function r(o) {
    return Eu(o) ? (e.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: e,
    onFocus: r,
    onBlur: n,
    ref: t
  };
}
function ps(t, e) {
  const n = I({}, e);
  return Object.keys(t).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = I({}, t[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = t[r] || {}, a = e[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = I({}, a), Object.keys(o).forEach((s) => {
        n[r][s] = ps(o[s], a[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = t[r]);
  }), n;
}
function $o(t, e, n = void 0) {
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
const Ma = (t) => t, Tu = () => {
  let t = Ma;
  return {
    configure(e) {
      t = e;
    },
    generate(e) {
      return t(e);
    },
    reset() {
      t = Ma;
    }
  };
}, Su = Tu(), ws = Su, fs = {
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
  const r = fs[e];
  return r ? `${n}-${r}` : `${ws.generate(t)}-${e}`;
}
function ms(t, e, n = "Mui") {
  const r = {};
  return e.forEach((o) => {
    r[o] = fr(t, o, n);
  }), r;
}
function Cu(t, e = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(e, Math.min(t, n));
}
function Rt(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(e.indexOf(o) >= 0) && (n[o] = t[o]);
  return n;
}
const Ou = ["values", "unit", "step"], Ru = (t) => {
  const e = Object.keys(t).map((n) => ({
    key: n,
    val: t[n]
  })) || [];
  return e.sort((n, r) => n.val - r.val), e.reduce((n, r) => I({}, n, {
    [r.key]: r.val
  }), {});
};
function _u(t) {
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
  } = t, o = Rt(t, Ou), a = Ru(e), s = Object.keys(a);
  function l(w) {
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n})`;
  }
  function c(w) {
    return `@media (max-width:${(typeof e[w] == "number" ? e[w] : w) - r / 100}${n})`;
  }
  function d(w, g) {
    const v = s.indexOf(g);
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n}) and (max-width:${(v !== -1 && typeof e[s[v]] == "number" ? e[s[v]] : g) - r / 100}${n})`;
  }
  function u(w) {
    return s.indexOf(w) + 1 < s.length ? d(w, s[s.indexOf(w) + 1]) : l(w);
  }
  function f(w) {
    const g = s.indexOf(w);
    return g === 0 ? l(s[1]) : g === s.length - 1 ? c(s[g]) : d(w, s[s.indexOf(w) + 1]).replace("@media", "@media not all and");
  }
  return I({
    keys: s,
    values: a,
    up: l,
    down: c,
    between: d,
    only: u,
    not: f,
    unit: n
  }, o);
}
const Pu = {
  borderRadius: 4
}, $u = Pu, Iu = process.env.NODE_ENV !== "production" ? p.oneOfType([p.number, p.string, p.object, p.array]) : {}, me = Iu;
function bn(t, e) {
  return e ? se(t, e, {
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
}, Da = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (t) => `@media (min-width:${Io[t]}px)`
};
function le(t, e, n) {
  const r = t.theme || {};
  if (Array.isArray(e)) {
    const a = r.breakpoints || Da;
    return e.reduce((s, l, c) => (s[a.up(a.keys[c])] = n(e[c]), s), {});
  }
  if (typeof e == "object") {
    const a = r.breakpoints || Da;
    return Object.keys(e).reduce((s, l) => {
      if (Object.keys(a.values || Io).indexOf(l) !== -1) {
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
function Au(t = {}) {
  var e;
  return ((e = t.keys) == null ? void 0 : e.reduce((r, o) => {
    const a = t.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function Mu(t, e) {
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
function or(t, e, n, r = n) {
  let o;
  return typeof t == "function" ? o = t(n) : Array.isArray(t) ? o = t[n] || r : o = mr(t, n) || r, e && (o = e(o, r, t)), o;
}
function kt(t) {
  const {
    prop: e,
    cssProperty: n = t.prop,
    themeKey: r,
    transform: o
  } = t, a = (s) => {
    if (s[e] == null)
      return null;
    const l = s[e], c = s.theme, d = mr(c, r) || {};
    return le(s, l, (f) => {
      let w = or(d, o, f);
      return f === w && typeof f == "string" && (w = or(d, o, `${e}${f === "default" ? "" : ne(f)}`, f)), n === !1 ? w : {
        [n]: w
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [e]: me
  } : {}, a.filterProps = [e], a;
}
function Du(t) {
  const e = {};
  return (n) => (e[n] === void 0 && (e[n] = t(n)), e[n]);
}
const Bu = {
  m: "margin",
  p: "padding"
}, ju = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ba = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Vu = Du((t) => {
  if (t.length > 2)
    if (Ba[t])
      t = Ba[t];
    else
      return [t];
  const [e, n] = t.split(""), r = Bu[e], o = ju[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), hr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], gr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], zu = [...hr, ...gr];
function Bn(t, e, n, r) {
  var o;
  const a = (o = mr(t, e, !1)) != null ? o : n;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${e}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${e}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${e}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function hs(t) {
  return Bn(t, "spacing", 8, "spacing");
}
function jn(t, e) {
  if (typeof e == "string" || e == null)
    return e;
  const n = Math.abs(e), r = t(n);
  return e >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Lu(t, e) {
  return (n) => t.reduce((r, o) => (r[o] = jn(e, n), r), {});
}
function Fu(t, e, n, r) {
  if (e.indexOf(n) === -1)
    return null;
  const o = Vu(n), a = Lu(o, r), s = t[n];
  return le(t, s, a);
}
function gs(t, e) {
  const n = hs(t.theme);
  return Object.keys(t).map((r) => Fu(t, e, r, n)).reduce(bn, {});
}
function bt(t) {
  return gs(t, hr);
}
bt.propTypes = process.env.NODE_ENV !== "production" ? hr.reduce((t, e) => (t[e] = me, t), {}) : {};
bt.filterProps = hr;
function vt(t) {
  return gs(t, gr);
}
vt.propTypes = process.env.NODE_ENV !== "production" ? gr.reduce((t, e) => (t[e] = me, t), {}) : {};
vt.filterProps = gr;
process.env.NODE_ENV !== "production" && zu.reduce((t, e) => (t[e] = me, t), {});
function Uu(t = 8) {
  if (t.mui)
    return t;
  const e = hs({
    spacing: t
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const s = e(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function br(...t) {
  const e = t.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => e[a] ? bn(o, e[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? t.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = t.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Xt(t) {
  return typeof t != "number" ? t : `${t}px solid`;
}
function qt(t, e) {
  return kt({
    prop: t,
    themeKey: "borders",
    transform: e
  });
}
const Gu = qt("border", Xt), Xu = qt("borderTop", Xt), Hu = qt("borderRight", Xt), Yu = qt("borderBottom", Xt), Wu = qt("borderLeft", Xt), qu = qt("borderColor"), Ku = qt("borderTopColor"), Ju = qt("borderRightColor"), Zu = qt("borderBottomColor"), Qu = qt("borderLeftColor"), tp = qt("outline", Xt), ep = qt("outlineColor"), vr = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = Bn(t.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: jn(e, r)
    });
    return le(t, t.borderRadius, n);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: me
} : {};
vr.filterProps = ["borderRadius"];
br(Gu, Xu, Hu, Yu, Wu, qu, Ku, Ju, Zu, Qu, vr, tp, ep);
const yr = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = Bn(t.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: jn(e, r)
    });
    return le(t, t.gap, n);
  }
  return null;
};
yr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: me
} : {};
yr.filterProps = ["gap"];
const xr = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = Bn(t.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: jn(e, r)
    });
    return le(t, t.columnGap, n);
  }
  return null;
};
xr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: me
} : {};
xr.filterProps = ["columnGap"];
const Nr = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = Bn(t.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: jn(e, r)
    });
    return le(t, t.rowGap, n);
  }
  return null;
};
Nr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: me
} : {};
Nr.filterProps = ["rowGap"];
const np = kt({
  prop: "gridColumn"
}), rp = kt({
  prop: "gridRow"
}), op = kt({
  prop: "gridAutoFlow"
}), ap = kt({
  prop: "gridAutoColumns"
}), ip = kt({
  prop: "gridAutoRows"
}), sp = kt({
  prop: "gridTemplateColumns"
}), lp = kt({
  prop: "gridTemplateRows"
}), cp = kt({
  prop: "gridTemplateAreas"
}), dp = kt({
  prop: "gridArea"
});
br(yr, xr, Nr, np, rp, op, ap, ip, sp, lp, cp, dp);
function Fe(t, e) {
  return e === "grey" ? e : t;
}
const up = kt({
  prop: "color",
  themeKey: "palette",
  transform: Fe
}), pp = kt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Fe
}), wp = kt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Fe
});
br(up, pp, wp);
function Lt(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const fp = kt({
  prop: "width",
  transform: Lt
}), Ao = (t) => {
  if (t.maxWidth !== void 0 && t.maxWidth !== null) {
    const e = (n) => {
      var r, o;
      const a = ((r = t.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Io[n];
      return a ? ((o = t.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${t.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Lt(n)
      };
    };
    return le(t, t.maxWidth, e);
  }
  return null;
};
Ao.filterProps = ["maxWidth"];
const mp = kt({
  prop: "minWidth",
  transform: Lt
}), hp = kt({
  prop: "height",
  transform: Lt
}), gp = kt({
  prop: "maxHeight",
  transform: Lt
}), bp = kt({
  prop: "minHeight",
  transform: Lt
});
kt({
  prop: "size",
  cssProperty: "width",
  transform: Lt
});
kt({
  prop: "size",
  cssProperty: "height",
  transform: Lt
});
const vp = kt({
  prop: "boxSizing"
});
br(fp, Ao, mp, hp, gp, bp, vp);
const yp = {
  // borders
  border: {
    themeKey: "borders",
    transform: Xt
  },
  borderTop: {
    themeKey: "borders",
    transform: Xt
  },
  borderRight: {
    themeKey: "borders",
    transform: Xt
  },
  borderBottom: {
    themeKey: "borders",
    transform: Xt
  },
  borderLeft: {
    themeKey: "borders",
    transform: Xt
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
    transform: Xt
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
    style: vt
  },
  pt: {
    style: vt
  },
  pr: {
    style: vt
  },
  pb: {
    style: vt
  },
  pl: {
    style: vt
  },
  px: {
    style: vt
  },
  py: {
    style: vt
  },
  padding: {
    style: vt
  },
  paddingTop: {
    style: vt
  },
  paddingRight: {
    style: vt
  },
  paddingBottom: {
    style: vt
  },
  paddingLeft: {
    style: vt
  },
  paddingX: {
    style: vt
  },
  paddingY: {
    style: vt
  },
  paddingInline: {
    style: vt
  },
  paddingInlineStart: {
    style: vt
  },
  paddingInlineEnd: {
    style: vt
  },
  paddingBlock: {
    style: vt
  },
  paddingBlockStart: {
    style: vt
  },
  paddingBlockEnd: {
    style: vt
  },
  m: {
    style: bt
  },
  mt: {
    style: bt
  },
  mr: {
    style: bt
  },
  mb: {
    style: bt
  },
  ml: {
    style: bt
  },
  mx: {
    style: bt
  },
  my: {
    style: bt
  },
  margin: {
    style: bt
  },
  marginTop: {
    style: bt
  },
  marginRight: {
    style: bt
  },
  marginBottom: {
    style: bt
  },
  marginLeft: {
    style: bt
  },
  marginX: {
    style: bt
  },
  marginY: {
    style: bt
  },
  marginInline: {
    style: bt
  },
  marginInlineStart: {
    style: bt
  },
  marginInlineEnd: {
    style: bt
  },
  marginBlock: {
    style: bt
  },
  marginBlockStart: {
    style: bt
  },
  marginBlockEnd: {
    style: bt
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
    transform: Lt
  },
  maxWidth: {
    style: Ao
  },
  minWidth: {
    transform: Lt
  },
  height: {
    transform: Lt
  },
  maxHeight: {
    transform: Lt
  },
  minHeight: {
    transform: Lt
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
}, Mo = yp;
function xp(...t) {
  const e = t.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(e);
  return t.every((r) => n.size === Object.keys(r).length);
}
function Np(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function kp() {
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
      transform: u,
      style: f
    } = l;
    if (r == null)
      return null;
    if (d === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const w = mr(o, d) || {};
    return f ? f(s) : le(s, r, (v) => {
      let m = or(w, u, v);
      return v === m && typeof v == "string" && (m = or(w, u, `${n}${v === "default" ? "" : ne(v)}`, v)), c === !1 ? m : {
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
    const s = (r = a.unstable_sxConfig) != null ? r : Mo;
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const u = Au(a.breakpoints), f = Object.keys(u);
      let w = u;
      return Object.keys(d).forEach((g) => {
        const v = Np(d[g], a);
        if (v != null)
          if (typeof v == "object")
            if (s[g])
              w = bn(w, t(g, v, a, s));
            else {
              const m = le({
                theme: a
              }, v, (h) => ({
                [g]: h
              }));
              xp(m, v) ? w[g] = e({
                sx: v,
                theme: a
              }) : w = bn(w, m);
            }
          else
            w = bn(w, t(g, v, a, s));
      }), Mu(f, w);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return e;
}
const bs = kp();
bs.filterProps = ["sx"];
const Do = bs;
function Ep(t, e) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(t).replace(/(\[[^\]]+\])/, "*:where($1)")]: e
  } : n.palette.mode === t ? e : {};
}
const Tp = ["breakpoints", "palette", "spacing", "shape"];
function Bo(t = {}, ...e) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = t, s = Rt(t, Tp), l = _u(n), c = Uu(o);
  let d = se({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: I({
      mode: "light"
    }, r),
    spacing: c,
    shape: I({}, $u, a)
  }, s);
  return d.applyStyles = Ep, d = e.reduce((u, f) => se(u, f), d), d.unstable_sxConfig = I({}, Mo, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(f) {
    return Do({
      sx: f,
      theme: this
    });
  }, d;
}
function Sp(t) {
  return Object.keys(t).length === 0;
}
function vs(t = null) {
  const e = B.useContext(Jl);
  return !e || Sp(e) ? t : e;
}
const Cp = Bo();
function ys(t = Cp) {
  return vs(t);
}
const Op = ["ownerState"], Rp = ["variants"], _p = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Pp(t) {
  return Object.keys(t).length === 0;
}
function $p(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96;
}
function Zn(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const Ip = Bo(), ja = (t) => t && t.charAt(0).toLowerCase() + t.slice(1);
function Yn({
  defaultTheme: t,
  theme: e,
  themeId: n
}) {
  return Pp(e) ? t : e[n] || e;
}
function Ap(t) {
  return t ? (e, n) => n[t] : null;
}
function Qn(t, e) {
  let {
    ownerState: n
  } = e, r = Rt(e, Op);
  const o = typeof t == "function" ? t(I({
    ownerState: n
  }, r)) : t;
  if (Array.isArray(o))
    return o.flatMap((a) => Qn(a, I({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = Rt(o, Rp);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props(I({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((u) => {
        (n == null ? void 0 : n[u]) !== c.props[u] && r[u] !== c.props[u] && (d = !1);
      }), d && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(I({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Mp(t = {}) {
  const {
    themeId: e,
    defaultTheme: n = Ip,
    rootShouldForwardProp: r = Zn,
    slotShouldForwardProp: o = Zn
  } = t, a = (s) => Do(I({}, s, {
    theme: Yn(I({}, s, {
      defaultTheme: n,
      themeId: e
    }))
  }));
  return a.__mui_systemSx = !0, (s, l = {}) => {
    Zl(s, (b) => b.filter((P) => !(P != null && P.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: u,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: w = Ap(ja(d))
    } = l, g = Rt(l, _p), v = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), m = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${ja(d || "Root")}`);
    let N = Zn;
    d === "Root" || d === "root" ? N = r : d ? N = o : $p(s) && (N = void 0);
    const S = Kl(s, I({
      shouldForwardProp: N,
      label: h
    }, g)), C = (b) => typeof b == "function" && b.__emotion_real !== b || Ne(b) ? (P) => Qn(b, I({}, P, {
      theme: Yn({
        theme: P.theme,
        defaultTheme: n,
        themeId: e
      })
    })) : b, E = (b, ...P) => {
      let L = C(b);
      const _ = P ? P.map(C) : [];
      c && w && _.push((D) => {
        const A = Yn(I({}, D, {
          defaultTheme: n,
          themeId: e
        }));
        if (!A.components || !A.components[c] || !A.components[c].styleOverrides)
          return null;
        const M = A.components[c].styleOverrides, Y = {};
        return Object.entries(M).forEach(([U, V]) => {
          Y[U] = Qn(V, I({}, D, {
            theme: A
          }));
        }), w(D, Y);
      }), c && !v && _.push((D) => {
        var A;
        const M = Yn(I({}, D, {
          defaultTheme: n,
          themeId: e
        })), Y = M == null || (A = M.components) == null || (A = A[c]) == null ? void 0 : A.variants;
        return Qn({
          variants: Y
        }, I({}, D, {
          theme: M
        }));
      }), m || _.push(a);
      const $ = _.length - P.length;
      if (Array.isArray(b) && $ > 0) {
        const D = new Array($).fill("");
        L = [...b, ...D], L.raw = [...b.raw, ...D];
      }
      const F = S(L, ..._);
      if (process.env.NODE_ENV !== "production") {
        let D;
        c && (D = `${c}${ne(d || "")}`), D === void 0 && (D = `Styled(${ou(s)})`), F.displayName = D;
      }
      return s.muiName && (F.muiName = s.muiName), F;
    };
    return S.withConfig && (E.withConfig = S.withConfig), E;
  };
}
function Dp(t) {
  const {
    theme: e,
    name: n,
    props: r
  } = t;
  return !e || !e.components || !e.components[n] || !e.components[n].defaultProps ? r : ps(e.components[n].defaultProps, r);
}
function Bp({
  props: t,
  name: e,
  defaultTheme: n,
  themeId: r
}) {
  let o = ys(n);
  return r && (o = o[r] || o), Dp({
    theme: o,
    name: e,
    props: t
  });
}
function jo(t, e = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (t < e || t > n) && console.error(`MUI: The value provided ${t} is out of range [${e}, ${n}].`), Cu(t, e, n);
}
function jp(t) {
  t = t.slice(1);
  const e = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let n = t.match(e);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function _e(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return _e(jp(t));
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
function kr(t) {
  const {
    type: e,
    colorSpace: n
  } = t;
  let {
    values: r
  } = t;
  return e.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : e.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), e.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${e}(${r})`;
}
function Vp(t) {
  t = _e(t);
  const {
    values: e
  } = t, n = e[0], r = e[1] / 100, o = e[2] / 100, a = r * Math.min(o, 1 - o), s = (d, u = (d + n / 30) % 12) => o - a * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return t.type === "hsla" && (l += "a", c.push(e[3])), kr({
    type: l,
    values: c
  });
}
function Va(t) {
  t = _e(t);
  let e = t.type === "hsl" || t.type === "hsla" ? _e(Vp(t)).values : t.values;
  return e = e.map((n) => (t.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function za(t, e) {
  const n = Va(t), r = Va(e);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function xs(t, e) {
  return t = _e(t), e = jo(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, kr(t);
}
function zp(t, e) {
  if (t = _e(t), e = jo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] *= 1 - e;
  else if (t.type.indexOf("rgb") !== -1 || t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] *= 1 - e;
  return kr(t);
}
function Lp(t, e) {
  if (t = _e(t), e = jo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (255 - t.values[n]) * e;
  else if (t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (1 - t.values[n]) * e;
  return kr(t);
}
function Fp(t, e) {
  return I({
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
const Up = {
  black: "#000",
  white: "#fff"
}, En = Up, Gp = {
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
}, Xp = Gp, Hp = {
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
}, Me = Hp, Yp = {
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
}, De = Yp, Wp = {
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
}, cn = Wp, qp = {
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
}, Be = qp, Kp = {
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
}, je = Kp, Jp = {
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
}, Ve = Jp, Zp = ["mode", "contrastThreshold", "tonalOffset"], La = {
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
    paper: En.white,
    default: En.white
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
}, Gr = {
  text: {
    primary: En.white,
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
    active: En.white,
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
function Fa(t, e, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(n) ? t[e] = t[n] : e === "light" ? t.light = Lp(t.main, o) : e === "dark" && (t.dark = zp(t.main, a)));
}
function Qp(t = "light") {
  return t === "dark" ? {
    main: Be[200],
    light: Be[50],
    dark: Be[400]
  } : {
    main: Be[700],
    light: Be[400],
    dark: Be[800]
  };
}
function tw(t = "light") {
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
function ew(t = "light") {
  return t === "dark" ? {
    main: De[500],
    light: De[300],
    dark: De[700]
  } : {
    main: De[700],
    light: De[400],
    dark: De[800]
  };
}
function nw(t = "light") {
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
function rw(t = "light") {
  return t === "dark" ? {
    main: Ve[400],
    light: Ve[300],
    dark: Ve[700]
  } : {
    main: Ve[800],
    light: Ve[500],
    dark: Ve[900]
  };
}
function ow(t = "light") {
  return t === "dark" ? {
    main: cn[400],
    light: cn[300],
    dark: cn[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: cn[500],
    dark: cn[900]
  };
}
function aw(t) {
  const {
    mode: e = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = t, o = Rt(t, Zp), a = t.primary || Qp(e), s = t.secondary || tw(e), l = t.error || ew(e), c = t.info || nw(e), d = t.success || rw(e), u = t.warning || ow(e);
  function f(m) {
    const h = za(m, Gr.text.primary) >= n ? Gr.text.primary : La.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const N = za(m, h);
      N < 3 && console.error([`MUI: The contrast ratio of ${N}:1 for ${h} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const w = ({
    color: m,
    name: h,
    mainShade: N = 500,
    lightShade: S = 300,
    darkShade: C = 700
  }) => {
    if (m = I({}, m), !m.main && m[N] && (m.main = m[N]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${N}\` property.` : Xe(11, h ? ` (${h})` : "", N));
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
} });` : Xe(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return Fa(m, "light", S, r), Fa(m, "dark", C, r), m.contrastText || (m.contrastText = f(m.main)), m;
  }, g = {
    dark: Gr,
    light: La
  };
  return process.env.NODE_ENV !== "production" && (g[e] || console.error(`MUI: The palette mode \`${e}\` is not supported.`)), se(I({
    // A collection of common colors.
    common: I({}, En),
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
      color: u,
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
    grey: Xp,
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
const iw = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function sw(t) {
  return Math.round(t * 1e5) / 1e5;
}
const Ua = {
  textTransform: "uppercase"
}, Ga = '"Roboto", "Helvetica", "Arial", sans-serif';
function lw(t, e) {
  const n = typeof e == "function" ? e(t) : e, {
    fontFamily: r = Ga,
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
    allVariants: u,
    pxToRem: f
  } = n, w = Rt(n, iw);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const g = o / 14, v = f || ((N) => `${N / d * g}rem`), m = (N, S, C, E, b) => I({
    fontFamily: r,
    fontWeight: N,
    fontSize: v(S),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: C
  }, r === Ga ? {
    letterSpacing: `${sw(E / S)}em`
  } : {}, b, u), h = {
    h1: m(a, 96, 1.167, -1.5),
    h2: m(a, 60, 1.2, -0.5),
    h3: m(s, 48, 1.167, 0),
    h4: m(s, 34, 1.235, 0.25),
    h5: m(s, 24, 1.334, 0),
    h6: m(l, 20, 1.6, 0.15),
    subtitle1: m(s, 16, 1.75, 0.15),
    subtitle2: m(l, 14, 1.57, 0.1),
    body1: m(s, 16, 1.5, 0.15),
    body2: m(s, 14, 1.43, 0.15),
    button: m(l, 14, 1.75, 0.4, Ua),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, Ua),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return se(I({
    htmlFontSize: d,
    pxToRem: v,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, h), w, {
    clone: !1
    // No need to clone deep
  });
}
const cw = 0.2, dw = 0.14, uw = 0.12;
function gt(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${cw})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${dw})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${uw})`].join(",");
}
const pw = ["none", gt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), gt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), gt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), gt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), gt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), gt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), gt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), gt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), gt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), gt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), gt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), gt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), gt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), gt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), gt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), gt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), gt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), gt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), gt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), gt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), gt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), gt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), gt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), gt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], ww = pw, fw = ["duration", "easing", "delay"], mw = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, hw = {
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
function Xa(t) {
  return `${Math.round(t)}ms`;
}
function gw(t) {
  if (!t)
    return 0;
  const e = t / 36;
  return Math.round((4 + 15 * e ** 0.25 + e / 5) * 10);
}
function bw(t) {
  const e = I({}, mw, t.easing), n = I({}, hw, t.duration);
  return I({
    getAutoHeightDuration: gw,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = n.standard,
        easing: l = e.easeInOut,
        delay: c = 0
      } = a, d = Rt(a, fw);
      if (process.env.NODE_ENV !== "production") {
        const u = (w) => typeof w == "string", f = (w) => !isNaN(parseFloat(w));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : Xa(s)} ${l} ${typeof c == "string" ? c : Xa(c)}`).join(",");
    }
  }, t, {
    easing: e,
    duration: n
  });
}
const vw = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, yw = vw, xw = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Nw(t = {}, ...e) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = t, s = Rt(t, xw);
  if (t.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Xe(18));
  const l = aw(r), c = Bo(t);
  let d = se(c, {
    mixins: Fp(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ww.slice(),
    typography: lw(l, a),
    transitions: bw(o),
    zIndex: I({}, yw)
  });
  if (d = se(d, s), d = e.reduce((u, f) => se(u, f), d), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (w, g) => {
      let v;
      for (v in w) {
        const m = w[v];
        if (u.indexOf(v) !== -1 && Object.keys(m).length > 0) {
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
  return d.unstable_sxConfig = I({}, Mo, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(f) {
    return Do({
      sx: f,
      theme: this
    });
  }, d;
}
const kw = Nw(), Vo = kw, zo = "$$material";
function Lo({
  props: t,
  name: e
}) {
  return Bp({
    props: t,
    name: e,
    defaultTheme: Vo,
    themeId: zo
  });
}
const Ew = (t) => Zn(t) && t !== "classes", Tw = Mp({
  themeId: zo,
  defaultTheme: Vo,
  rootShouldForwardProp: Ew
}), Vn = Tw;
function Sw(t) {
  return fr("MuiSvgIcon", t);
}
ms("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Cw = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Ow = (t) => {
  const {
    color: e,
    fontSize: n,
    classes: r
  } = t, o = {
    root: ["root", e !== "inherit" && `color${ne(e)}`, `fontSize${ne(n)}`]
  };
  return $o(o, Sw, r);
}, Rw = Vn("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.root, n.color !== "inherit" && e[`color${ne(n.color)}`], e[`fontSize${ne(n.fontSize)}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => {
  var n, r, o, a, s, l, c, d, u, f, w, g, v;
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
      large: ((d = t.typography) == null || (u = d.pxToRem) == null ? void 0 : u.call(d, 35)) || "2.1875rem"
    }[e.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (f = (w = (t.vars || t).palette) == null || (w = w[e.color]) == null ? void 0 : w.main) != null ? f : {
      action: (g = (t.vars || t).palette) == null || (g = g.action) == null ? void 0 : g.active,
      disabled: (v = (t.vars || t).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[e.color]
  };
}), Fo = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const r = Lo({
    props: e,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: s = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: d,
    inheritViewBox: u = !1,
    titleAccess: f,
    viewBox: w = "0 0 24 24"
  } = r, g = Rt(r, Cw), v = /* @__PURE__ */ B.isValidElement(o) && o.type === "svg", m = I({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: e.fontSize,
    inheritViewBox: u,
    viewBox: w,
    hasSvgAsChild: v
  }), h = {};
  u || (h.viewBox = w);
  const N = Ow(m);
  return /* @__PURE__ */ y(Rw, I({
    as: l,
    className: Ee(N.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, h, g, v && o.props, {
    ownerState: m,
    children: [v ? o.props.children : o, f ? /* @__PURE__ */ i("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Fo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: p.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: p.object,
  /**
   * @ignore
   */
  className: p.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: p.oneOfType([p.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), p.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: p.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: p.oneOfType([p.oneOf(["inherit", "large", "medium", "small"]), p.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: p.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: p.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: p.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: p.oneOfType([p.arrayOf(p.oneOfType([p.func, p.object, p.bool])), p.func, p.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: p.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: p.string
});
Fo.muiName = "SvgIcon";
const Ha = Fo;
function Ns(t, e) {
  function n(r, o) {
    return /* @__PURE__ */ i(Ha, I({
      "data-testid": `${e}Icon`,
      ref: o
    }, r, {
      children: t
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${e}Icon`), n.muiName = Ha.muiName, /* @__PURE__ */ B.memo(/* @__PURE__ */ B.forwardRef(n));
}
const _w = {
  configure: (t) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ws.configure(t);
  }
}, Pw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: ne,
  createChainedFunction: iu,
  createSvgIcon: Ns,
  debounce: su,
  deprecatedPropType: lu,
  isMuiElement: cu,
  ownerDocument: nr,
  ownerWindow: du,
  requirePropFactory: uu,
  setRef: rr,
  unstable_ClassNameGenerator: _w,
  unstable_useEnhancedEffect: He,
  unstable_useId: cs,
  unsupportedProp: fu,
  useControlled: ds,
  useEventCallback: ro,
  useForkRef: Re,
  useIsFocusVisible: us
}, Symbol.toStringTag, { value: "Module" })), $w = /* @__PURE__ */ zd(Pw);
var Ya;
function Iw() {
  return Ya || (Ya = 1, function(t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function() {
        return e.createSvgIcon;
      }
    });
    var e = $w;
  }(Dr)), Dr;
}
var Aw = Ld;
Object.defineProperty(Ro, "__esModule", {
  value: !0
});
var ks = Ro.default = void 0, Mw = Aw(Iw()), Dw = cl;
ks = Ro.default = (0, Mw.default)(/* @__PURE__ */ (0, Dw.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Bw(t) {
  return typeof t == "string";
}
function fn(t, e, n) {
  return t === void 0 || Bw(t) ? e : I({}, e, {
    ownerState: I({}, e.ownerState, n)
  });
}
const jw = {
  disableDefaultClasses: !1
}, Vw = /* @__PURE__ */ B.createContext(jw);
function zw(t) {
  const {
    disableDefaultClasses: e
  } = B.useContext(Vw);
  return (n) => e ? "" : t(n);
}
function Lw(t, e = []) {
  if (t === void 0)
    return {};
  const n = {};
  return Object.keys(t).filter((r) => r.match(/^on[A-Z]/) && typeof t[r] == "function" && !e.includes(r)).forEach((r) => {
    n[r] = t[r];
  }), n;
}
function Fw(t, e, n) {
  return typeof t == "function" ? t(e, n) : t;
}
function Wa(t) {
  if (t === void 0)
    return {};
  const e = {};
  return Object.keys(t).filter((n) => !(n.match(/^on[A-Z]/) && typeof t[n] == "function")).forEach((n) => {
    e[n] = t[n];
  }), e;
}
function Uw(t) {
  const {
    getSlotProps: e,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = t;
  if (!e) {
    const g = Ee(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = I({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = I({}, n, o, r);
    return g.length > 0 && (m.className = g), Object.keys(v).length > 0 && (m.style = v), {
      props: m,
      internalRef: void 0
    };
  }
  const s = Lw(I({}, o, r)), l = Wa(r), c = Wa(o), d = e(s), u = Ee(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = I({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = I({}, d, n, c, l);
  return u.length > 0 && (w.className = u), Object.keys(f).length > 0 && (w.style = f), {
    props: w,
    internalRef: d.ref
  };
}
const Gw = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Xw(t) {
  var e;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = t, s = Rt(t, Gw), l = a ? {} : Fw(r, o), {
    props: c,
    internalRef: d
  } = Uw(I({}, s, {
    externalSlotProps: l
  })), u = Re(d, l == null ? void 0 : l.ref, (e = t.additionalProps) == null ? void 0 : e.ref);
  return fn(n, I({}, c, {
    ref: u
  }), o);
}
const Es = "base";
function Hw(t) {
  return `${Es}--${t}`;
}
function Yw(t, e) {
  return `${Es}-${t}-${e}`;
}
function Ts(t, e) {
  const n = fs[e];
  return n ? Hw(n) : Yw(t, e);
}
function Ww(t, e) {
  const n = {};
  return e.forEach((r) => {
    n[r] = Ts(t, r);
  }), n;
}
function qw(t) {
  return typeof t == "function" ? t() : t;
}
const ar = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = e, [s, l] = B.useState(null), c = Re(/* @__PURE__ */ B.isValidElement(r) ? r.ref : null, n);
  if (He(() => {
    a || l(qw(o) || document.body);
  }, [o, a]), He(() => {
    if (s && !a)
      return rr(n, s), () => {
        rr(n, null);
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
    children: s && /* @__PURE__ */ ic.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (ar.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: p.node,
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
  container: p.oneOfType([kn, p.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: p.bool
});
process.env.NODE_ENV !== "production" && (ar["propTypes"] = Qd(ar.propTypes));
var At = "top", Yt = "bottom", Wt = "right", Mt = "left", Uo = "auto", zn = [At, Yt, Wt, Mt], Ye = "start", Tn = "end", Kw = "clippingParents", Ss = "viewport", dn = "popper", Jw = "reference", qa = /* @__PURE__ */ zn.reduce(function(t, e) {
  return t.concat([e + "-" + Ye, e + "-" + Tn]);
}, []), Cs = /* @__PURE__ */ [].concat(zn, [Uo]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Ye, e + "-" + Tn]);
}, []), Zw = "beforeRead", Qw = "read", tf = "afterRead", ef = "beforeMain", nf = "main", rf = "afterMain", of = "beforeWrite", af = "write", sf = "afterWrite", lf = [Zw, Qw, tf, ef, nf, rf, of, af, sf];
function re(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Ft(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Pe(t) {
  var e = Ft(t).Element;
  return t instanceof e || t instanceof Element;
}
function Ht(t) {
  var e = Ft(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Go(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Ft(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function cf(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, o = e.attributes[n] || {}, a = e.elements[n];
    !Ht(a) || !re(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function df(t) {
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
      !Ht(o) || !re(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const uf = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: cf,
  effect: df,
  requires: ["computeStyles"]
};
function Qt(t) {
  return t.split("-")[0];
}
var Te = Math.max, ir = Math.min, We = Math.round;
function ao() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Os() {
  return !/^((?!chrome|android).)*safari/i.test(ao());
}
function qe(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var r = t.getBoundingClientRect(), o = 1, a = 1;
  e && Ht(t) && (o = t.offsetWidth > 0 && We(r.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && We(r.height) / t.offsetHeight || 1);
  var s = Pe(t) ? Ft(t) : window, l = s.visualViewport, c = !Os() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, u = (r.top + (c && l ? l.offsetTop : 0)) / a, f = r.width / o, w = r.height / a;
  return {
    width: f,
    height: w,
    top: u,
    right: d + f,
    bottom: u + w,
    left: d,
    x: d,
    y: u
  };
}
function Xo(t) {
  var e = qe(t), n = t.offsetWidth, r = t.offsetHeight;
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: n,
    height: r
  };
}
function Rs(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Go(n)) {
    var r = e;
    do {
      if (r && t.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function ce(t) {
  return Ft(t).getComputedStyle(t);
}
function pf(t) {
  return ["table", "td", "th"].indexOf(re(t)) >= 0;
}
function he(t) {
  return ((Pe(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function Er(t) {
  return re(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Go(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    he(t)
  );
}
function Ka(t) {
  return !Ht(t) || // https://github.com/popperjs/popper-core/issues/837
  ce(t).position === "fixed" ? null : t.offsetParent;
}
function wf(t) {
  var e = /firefox/i.test(ao()), n = /Trident/i.test(ao());
  if (n && Ht(t)) {
    var r = ce(t);
    if (r.position === "fixed")
      return null;
  }
  var o = Er(t);
  for (Go(o) && (o = o.host); Ht(o) && ["html", "body"].indexOf(re(o)) < 0; ) {
    var a = ce(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Ln(t) {
  for (var e = Ft(t), n = Ka(t); n && pf(n) && ce(n).position === "static"; )
    n = Ka(n);
  return n && (re(n) === "html" || re(n) === "body" && ce(n).position === "static") ? e : n || wf(t) || e;
}
function Ho(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function vn(t, e, n) {
  return Te(t, ir(e, n));
}
function ff(t, e, n) {
  var r = vn(t, e, n);
  return r > n ? n : r;
}
function _s() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ps(t) {
  return Object.assign({}, _s(), t);
}
function $s(t, e) {
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
var mf = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, Ps(typeof e != "number" ? e : $s(e, zn));
};
function hf(t) {
  var e, n = t.state, r = t.name, o = t.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Qt(n.placement), c = Ho(l), d = [Mt, Wt].indexOf(l) >= 0, u = d ? "height" : "width";
  if (!(!a || !s)) {
    var f = mf(o.padding, n), w = Xo(a), g = c === "y" ? At : Mt, v = c === "y" ? Yt : Wt, m = n.rects.reference[u] + n.rects.reference[c] - s[c] - n.rects.popper[u], h = s[c] - n.rects.reference[c], N = Ln(a), S = N ? c === "y" ? N.clientHeight || 0 : N.clientWidth || 0 : 0, C = m / 2 - h / 2, E = f[g], b = S - w[u] - f[v], P = S / 2 - w[u] / 2 + C, L = vn(E, P, b), _ = c;
    n.modifiersData[r] = (e = {}, e[_] = L, e.centerOffset = L - P, e);
  }
}
function gf(t) {
  var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || Rs(e.elements.popper, o) && (e.elements.arrow = o));
}
const bf = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: hf,
  effect: gf,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ke(t) {
  return t.split("-")[1];
}
var vf = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function yf(t, e) {
  var n = t.x, r = t.y, o = e.devicePixelRatio || 1;
  return {
    x: We(n * o) / o || 0,
    y: We(r * o) / o || 0
  };
}
function Ja(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, a = t.variation, s = t.offsets, l = t.position, c = t.gpuAcceleration, d = t.adaptive, u = t.roundOffsets, f = t.isFixed, w = s.x, g = w === void 0 ? 0 : w, v = s.y, m = v === void 0 ? 0 : v, h = typeof u == "function" ? u({
    x: g,
    y: m
  }) : {
    x: g,
    y: m
  };
  g = h.x, m = h.y;
  var N = s.hasOwnProperty("x"), S = s.hasOwnProperty("y"), C = Mt, E = At, b = window;
  if (d) {
    var P = Ln(n), L = "clientHeight", _ = "clientWidth";
    if (P === Ft(n) && (P = he(n), ce(P).position !== "static" && l === "absolute" && (L = "scrollHeight", _ = "scrollWidth")), P = P, o === At || (o === Mt || o === Wt) && a === Tn) {
      E = Yt;
      var $ = f && P === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        P[L]
      );
      m -= $ - r.height, m *= c ? 1 : -1;
    }
    if (o === Mt || (o === At || o === Yt) && a === Tn) {
      C = Wt;
      var F = f && P === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        P[_]
      );
      g -= F - r.width, g *= c ? 1 : -1;
    }
  }
  var D = Object.assign({
    position: l
  }, d && vf), A = u === !0 ? yf({
    x: g,
    y: m
  }, Ft(n)) : {
    x: g,
    y: m
  };
  if (g = A.x, m = A.y, c) {
    var M;
    return Object.assign({}, D, (M = {}, M[E] = S ? "0" : "", M[C] = N ? "0" : "", M.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + m + "px)" : "translate3d(" + g + "px, " + m + "px, 0)", M));
  }
  return Object.assign({}, D, (e = {}, e[E] = S ? m + "px" : "", e[C] = N ? g + "px" : "", e.transform = "", e));
}
function xf(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: Qt(e.placement),
    variation: Ke(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Ja(Object.assign({}, d, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Ja(Object.assign({}, d, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Nf = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: xf,
  data: {}
};
var Wn = {
  passive: !0
};
function kf(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Ft(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && d.forEach(function(u) {
    u.addEventListener("scroll", n.update, Wn);
  }), l && c.addEventListener("resize", n.update, Wn), function() {
    a && d.forEach(function(u) {
      u.removeEventListener("scroll", n.update, Wn);
    }), l && c.removeEventListener("resize", n.update, Wn);
  };
}
const Ef = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: kf,
  data: {}
};
var Tf = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function tr(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Tf[e];
  });
}
var Sf = {
  start: "end",
  end: "start"
};
function Za(t) {
  return t.replace(/start|end/g, function(e) {
    return Sf[e];
  });
}
function Yo(t) {
  var e = Ft(t), n = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Wo(t) {
  return qe(he(t)).left + Yo(t).scrollLeft;
}
function Cf(t, e) {
  var n = Ft(t), r = he(t), o = n.visualViewport, a = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    var d = Os();
    (d || !d && e === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: l + Wo(t),
    y: c
  };
}
function Of(t) {
  var e, n = he(t), r = Yo(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = Te(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Te(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Wo(t), c = -r.scrollTop;
  return ce(o || n).direction === "rtl" && (l += Te(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: l,
    y: c
  };
}
function qo(t) {
  var e = ce(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Is(t) {
  return ["html", "body", "#document"].indexOf(re(t)) >= 0 ? t.ownerDocument.body : Ht(t) && qo(t) ? t : Is(Er(t));
}
function yn(t, e) {
  var n;
  e === void 0 && (e = []);
  var r = Is(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), a = Ft(r), s = o ? [a].concat(a.visualViewport || [], qo(r) ? r : []) : r, l = e.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(yn(Er(s)))
  );
}
function io(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Rf(t, e) {
  var n = qe(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Qa(t, e, n) {
  return e === Ss ? io(Cf(t, n)) : Pe(e) ? Rf(e, n) : io(Of(he(t)));
}
function _f(t) {
  var e = yn(Er(t)), n = ["absolute", "fixed"].indexOf(ce(t).position) >= 0, r = n && Ht(t) ? Ln(t) : t;
  return Pe(r) ? e.filter(function(o) {
    return Pe(o) && Rs(o, r) && re(o) !== "body";
  }) : [];
}
function Pf(t, e, n, r) {
  var o = e === "clippingParents" ? _f(t) : [].concat(e), a = [].concat(o, [n]), s = a[0], l = a.reduce(function(c, d) {
    var u = Qa(t, d, r);
    return c.top = Te(u.top, c.top), c.right = ir(u.right, c.right), c.bottom = ir(u.bottom, c.bottom), c.left = Te(u.left, c.left), c;
  }, Qa(t, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function As(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? Qt(r) : null, a = r ? Ke(r) : null, s = e.x + e.width / 2 - n.width / 2, l = e.y + e.height / 2 - n.height / 2, c;
  switch (o) {
    case At:
      c = {
        x: s,
        y: e.y - n.height
      };
      break;
    case Yt:
      c = {
        x: s,
        y: e.y + e.height
      };
      break;
    case Wt:
      c = {
        x: e.x + e.width,
        y: l
      };
      break;
    case Mt:
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
  var d = o ? Ho(o) : null;
  if (d != null) {
    var u = d === "y" ? "height" : "width";
    switch (a) {
      case Ye:
        c[d] = c[d] - (e[u] / 2 - n[u] / 2);
        break;
      case Tn:
        c[d] = c[d] + (e[u] / 2 - n[u] / 2);
        break;
    }
  }
  return c;
}
function Sn(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, a = n.strategy, s = a === void 0 ? t.strategy : a, l = n.boundary, c = l === void 0 ? Kw : l, d = n.rootBoundary, u = d === void 0 ? Ss : d, f = n.elementContext, w = f === void 0 ? dn : f, g = n.altBoundary, v = g === void 0 ? !1 : g, m = n.padding, h = m === void 0 ? 0 : m, N = Ps(typeof h != "number" ? h : $s(h, zn)), S = w === dn ? Jw : dn, C = t.rects.popper, E = t.elements[v ? S : w], b = Pf(Pe(E) ? E : E.contextElement || he(t.elements.popper), c, u, s), P = qe(t.elements.reference), L = As({
    reference: P,
    element: C,
    strategy: "absolute",
    placement: o
  }), _ = io(Object.assign({}, C, L)), $ = w === dn ? _ : P, F = {
    top: b.top - $.top + N.top,
    bottom: $.bottom - b.bottom + N.bottom,
    left: b.left - $.left + N.left,
    right: $.right - b.right + N.right
  }, D = t.modifiersData.offset;
  if (w === dn && D) {
    var A = D[o];
    Object.keys(F).forEach(function(M) {
      var Y = [Wt, Yt].indexOf(M) >= 0 ? 1 : -1, U = [At, Yt].indexOf(M) >= 0 ? "y" : "x";
      F[M] += A[U] * Y;
    });
  }
  return F;
}
function $f(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? Cs : c, u = Ke(r), f = u ? l ? qa : qa.filter(function(v) {
    return Ke(v) === u;
  }) : zn, w = f.filter(function(v) {
    return d.indexOf(v) >= 0;
  });
  w.length === 0 && (w = f);
  var g = w.reduce(function(v, m) {
    return v[m] = Sn(t, {
      placement: m,
      boundary: o,
      rootBoundary: a,
      padding: s
    })[Qt(m)], v;
  }, {});
  return Object.keys(g).sort(function(v, m) {
    return g[v] - g[m];
  });
}
function If(t) {
  if (Qt(t) === Uo)
    return [];
  var e = tr(t);
  return [Za(t), e, Za(e)];
}
function Af(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, d = n.padding, u = n.boundary, f = n.rootBoundary, w = n.altBoundary, g = n.flipVariations, v = g === void 0 ? !0 : g, m = n.allowedAutoPlacements, h = e.options.placement, N = Qt(h), S = N === h, C = c || (S || !v ? [tr(h)] : If(h)), E = [h].concat(C).reduce(function(z, q) {
      return z.concat(Qt(q) === Uo ? $f(e, {
        placement: q,
        boundary: u,
        rootBoundary: f,
        padding: d,
        flipVariations: v,
        allowedAutoPlacements: m
      }) : q);
    }, []), b = e.rects.reference, P = e.rects.popper, L = /* @__PURE__ */ new Map(), _ = !0, $ = E[0], F = 0; F < E.length; F++) {
      var D = E[F], A = Qt(D), M = Ke(D) === Ye, Y = [At, Yt].indexOf(A) >= 0, U = Y ? "width" : "height", V = Sn(e, {
        placement: D,
        boundary: u,
        rootBoundary: f,
        altBoundary: w,
        padding: d
      }), tt = Y ? M ? Wt : Mt : M ? Yt : At;
      b[U] > P[U] && (tt = tr(tt));
      var ot = tr(tt), at = [];
      if (a && at.push(V[A] <= 0), l && at.push(V[tt] <= 0, V[ot] <= 0), at.every(function(z) {
        return z;
      })) {
        $ = D, _ = !1;
        break;
      }
      L.set(D, at);
    }
    if (_)
      for (var x = v ? 3 : 1, O = function(q) {
        var W = E.find(function(K) {
          var H = L.get(K);
          if (H)
            return H.slice(0, q).every(function(Z) {
              return Z;
            });
        });
        if (W)
          return $ = W, "break";
      }, G = x; G > 0; G--) {
        var X = O(G);
        if (X === "break")
          break;
      }
    e.placement !== $ && (e.modifiersData[r]._skip = !0, e.placement = $, e.reset = !0);
  }
}
const Mf = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Af,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ti(t, e, n) {
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
function ei(t) {
  return [At, Wt, Yt, Mt].some(function(e) {
    return t[e] >= 0;
  });
}
function Df(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, s = Sn(e, {
    elementContext: "reference"
  }), l = Sn(e, {
    altBoundary: !0
  }), c = ti(s, r), d = ti(l, o, a), u = ei(c), f = ei(d);
  e.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: u,
    hasPopperEscaped: f
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": f
  });
}
const Bf = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Df
};
function jf(t, e, n) {
  var r = Qt(t), o = [Mt, At].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, e, {
    placement: t
  })) : n, s = a[0], l = a[1];
  return s = s || 0, l = (l || 0) * o, [Mt, Wt].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Vf(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = Cs.reduce(function(u, f) {
    return u[f] = jf(f, e.rects, a), u;
  }, {}), l = s[e.placement], c = l.x, d = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += d), e.modifiersData[r] = s;
}
const zf = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Vf
};
function Lf(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = As({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Ff = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Lf,
  data: {}
};
function Uf(t) {
  return t === "x" ? "y" : "x";
}
function Gf(t) {
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, d = n.rootBoundary, u = n.altBoundary, f = n.padding, w = n.tether, g = w === void 0 ? !0 : w, v = n.tetherOffset, m = v === void 0 ? 0 : v, h = Sn(e, {
    boundary: c,
    rootBoundary: d,
    padding: f,
    altBoundary: u
  }), N = Qt(e.placement), S = Ke(e.placement), C = !S, E = Ho(N), b = Uf(E), P = e.modifiersData.popperOffsets, L = e.rects.reference, _ = e.rects.popper, $ = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, F = typeof $ == "number" ? {
    mainAxis: $,
    altAxis: $
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, $), D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, A = {
    x: 0,
    y: 0
  };
  if (P) {
    if (a) {
      var M, Y = E === "y" ? At : Mt, U = E === "y" ? Yt : Wt, V = E === "y" ? "height" : "width", tt = P[E], ot = tt + h[Y], at = tt - h[U], x = g ? -_[V] / 2 : 0, O = S === Ye ? L[V] : _[V], G = S === Ye ? -_[V] : -L[V], X = e.elements.arrow, z = g && X ? Xo(X) : {
        width: 0,
        height: 0
      }, q = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : _s(), W = q[Y], K = q[U], H = vn(0, L[V], z[V]), Z = C ? L[V] / 2 - x - H - W - F.mainAxis : O - H - W - F.mainAxis, Q = C ? -L[V] / 2 + x + H + K + F.mainAxis : G + H + K + F.mainAxis, lt = e.elements.arrow && Ln(e.elements.arrow), R = lt ? E === "y" ? lt.clientTop || 0 : lt.clientLeft || 0 : 0, Et = (M = D == null ? void 0 : D[E]) != null ? M : 0, j = tt + Z - Et - R, xt = tt + Q - Et, Ot = vn(g ? ir(ot, j) : ot, tt, g ? Te(at, xt) : at);
      P[E] = Ot, A[E] = Ot - tt;
    }
    if (l) {
      var oe, _t = E === "x" ? At : Mt, J = E === "x" ? Yt : Wt, nt = P[b], Nt = b === "y" ? "height" : "width", $t = nt + h[_t], Kt = nt - h[J], Ie = [At, Mt].indexOf(N) !== -1, Ae = (oe = D == null ? void 0 : D[b]) != null ? oe : 0, ge = Ie ? $t : nt - L[Nt] - _[Nt] - Ae + F.altAxis, en = Ie ? nt + L[Nt] + _[Nt] - Ae - F.altAxis : Kt, Fn = g && Ie ? ff(ge, nt, en) : vn(g ? ge : $t, nt, g ? en : Kt);
      P[b] = Fn, A[b] = Fn - nt;
    }
    e.modifiersData[r] = A;
  }
}
const Xf = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Gf,
  requiresIfExists: ["offset"]
};
function Hf(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function Yf(t) {
  return t === Ft(t) || !Ht(t) ? Yo(t) : Hf(t);
}
function Wf(t) {
  var e = t.getBoundingClientRect(), n = We(e.width) / t.offsetWidth || 1, r = We(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function qf(t, e, n) {
  n === void 0 && (n = !1);
  var r = Ht(e), o = Ht(e) && Wf(e), a = he(e), s = qe(t, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((re(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  qo(a)) && (l = Yf(e)), Ht(e) ? (c = qe(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : a && (c.x = Wo(a))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Kf(t) {
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
function Jf(t) {
  var e = Kf(t);
  return lf.reduce(function(n, r) {
    return n.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Zf(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function Qf(t) {
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
var ni = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ri() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function tm(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, a = o === void 0 ? ni : o;
  return function(l, c, d) {
    d === void 0 && (d = a);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ni, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], w = !1, g = {
      state: u,
      setOptions: function(N) {
        var S = typeof N == "function" ? N(u.options) : N;
        m(), u.options = Object.assign({}, a, u.options, S), u.scrollParents = {
          reference: Pe(l) ? yn(l) : l.contextElement ? yn(l.contextElement) : [],
          popper: yn(c)
        };
        var C = Jf(Qf([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = C.filter(function(E) {
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
          var N = u.elements, S = N.reference, C = N.popper;
          if (ri(S, C)) {
            u.rects = {
              reference: qf(S, Ln(C), u.options.strategy === "fixed"),
              popper: Xo(C)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(F) {
              return u.modifiersData[F.name] = Object.assign({}, F.data);
            });
            for (var E = 0; E < u.orderedModifiers.length; E++) {
              if (u.reset === !0) {
                u.reset = !1, E = -1;
                continue;
              }
              var b = u.orderedModifiers[E], P = b.fn, L = b.options, _ = L === void 0 ? {} : L, $ = b.name;
              typeof P == "function" && (u = P({
                state: u,
                options: _,
                name: $,
                instance: g
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Zf(function() {
        return new Promise(function(h) {
          g.forceUpdate(), h(u);
        });
      }),
      destroy: function() {
        m(), w = !0;
      }
    };
    if (!ri(l, c))
      return g;
    g.setOptions(d).then(function(h) {
      !w && d.onFirstUpdate && d.onFirstUpdate(h);
    });
    function v() {
      u.orderedModifiers.forEach(function(h) {
        var N = h.name, S = h.options, C = S === void 0 ? {} : S, E = h.effect;
        if (typeof E == "function") {
          var b = E({
            state: u,
            name: N,
            instance: g,
            options: C
          }), P = function() {
          };
          f.push(b || P);
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
var em = [Ef, Ff, Nf, uf, zf, Mf, Xf, bf, Bf], nm = /* @__PURE__ */ tm({
  defaultModifiers: em
});
const Ms = "Popper";
function rm(t) {
  return Ts(Ms, t);
}
Ww(Ms, ["root"]);
const om = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], am = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function im(t, e) {
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
function sr(t) {
  return typeof t == "function" ? t() : t;
}
function Tr(t) {
  return t.nodeType !== void 0;
}
function sm(t) {
  return !Tr(t);
}
const lm = () => $o({
  root: ["root"]
}, zw(rm)), cm = {}, dm = /* @__PURE__ */ B.forwardRef(function(e, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: d,
    placement: u,
    popperOptions: f,
    popperRef: w,
    slotProps: g = {},
    slots: v = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = e, h = Rt(e, om), N = B.useRef(null), S = Re(N, n), C = B.useRef(null), E = Re(C, w), b = B.useRef(E);
  He(() => {
    b.current = E;
  }, [E]), B.useImperativeHandle(w, () => C.current, []);
  const P = im(u, s), [L, _] = B.useState(P), [$, F] = B.useState(sr(o));
  B.useEffect(() => {
    C.current && C.current.forceUpdate();
  }), B.useEffect(() => {
    o && F(sr(o));
  }, [o]), He(() => {
    if (!$ || !d)
      return;
    const U = (ot) => {
      _(ot.placement);
    };
    if (process.env.NODE_ENV !== "production" && $ && Tr($) && $.nodeType === 1) {
      const ot = $.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ot.top === 0 && ot.left === 0 && ot.right === 0 && ot.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let V = [{
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
        state: ot
      }) => {
        U(ot);
      }
    }];
    c != null && (V = V.concat(c)), f && f.modifiers != null && (V = V.concat(f.modifiers));
    const tt = nm($, N.current, I({
      placement: P
    }, f, {
      modifiers: V
    }));
    return b.current(tt), () => {
      tt.destroy(), b.current(null);
    };
  }, [$, l, c, d, f, P]);
  const D = {
    placement: L
  };
  m !== null && (D.TransitionProps = m);
  const A = lm(), M = (r = v.root) != null ? r : "div", Y = Xw({
    elementType: M,
    externalSlotProps: g.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: S
    },
    ownerState: e,
    className: A.root
  });
  return /* @__PURE__ */ i(M, I({}, Y, {
    children: typeof a == "function" ? a(D) : a
  }));
}), Ds = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: d,
    open: u,
    placement: f = "bottom",
    popperOptions: w = cm,
    popperRef: g,
    style: v,
    transition: m = !1,
    slotProps: h = {},
    slots: N = {}
  } = e, S = Rt(e, am), [C, E] = B.useState(!0), b = () => {
    E(!1);
  }, P = () => {
    E(!0);
  };
  if (!c && !u && (!m || C))
    return null;
  let L;
  if (a)
    L = a;
  else if (r) {
    const F = sr(r);
    L = F && Tr(F) ? nr(F).body : nr(null).body;
  }
  const _ = !u && c && (!m || C) ? "none" : void 0, $ = m ? {
    in: u,
    onEnter: b,
    onExited: P
  } : void 0;
  return /* @__PURE__ */ i(ar, {
    disablePortal: l,
    container: L,
    children: /* @__PURE__ */ i(dm, I({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: d,
      ref: n,
      open: m ? !C : u,
      placement: f,
      popperOptions: w,
      popperRef: g,
      slotProps: h,
      slots: N
    }, S, {
      style: I({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: _
      }, v),
      TransitionProps: $,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ds.propTypes = {
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
  anchorEl: _o(p.oneOfType([kn, p.object, p.func]), (t) => {
    if (t.open) {
      const e = sr(t.anchorEl);
      if (e && Tr(e) && e.nodeType === 1) {
        const n = e.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!e || typeof e.getBoundingClientRect != "function" || sm(e) && e.contextElement != null && e.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: p.oneOfType([p.node, p.func]),
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
  container: p.oneOfType([kn, p.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: p.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: p.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: p.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: p.arrayOf(p.shape({
    data: p.object,
    effect: p.func,
    enabled: p.bool,
    fn: p.func,
    name: p.any,
    options: p.object,
    phase: p.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: p.arrayOf(p.string),
    requiresIfExists: p.arrayOf(p.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: p.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: p.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: p.shape({
    modifiers: p.array,
    onFirstUpdate: p.func,
    placement: p.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: p.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: ls,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: p.shape({
    root: p.oneOfType([p.func, p.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: p.shape({
    root: p.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: p.bool
});
function Bs() {
  const t = ys(Vo);
  return process.env.NODE_ENV !== "production" && B.useDebugValue(t), t[zo] || t;
}
function so(t, e) {
  return so = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, so(t, e);
}
function um(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, so(t, e);
}
const oi = {
  disabled: !1
};
var pm = process.env.NODE_ENV !== "production" ? p.oneOfType([p.number, p.shape({
  enter: p.number,
  exit: p.number,
  appear: p.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && p.oneOfType([p.string, p.shape({
  enter: p.string,
  exit: p.string,
  active: p.string
}), p.shape({
  enter: p.string,
  enterDone: p.string,
  enterActive: p.string,
  exit: p.string,
  exitDone: p.string,
  exitActive: p.string
})]);
const js = T.createContext(null);
var wm = function(e) {
  return e.scrollTop;
}, mn = "unmounted", ye = "exited", xe = "entering", Le = "entered", lo = "exiting", ue = /* @__PURE__ */ function(t) {
  um(e, t);
  function e(r, o) {
    var a;
    a = t.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = ye, a.appearStatus = xe) : c = Le : r.unmountOnExit || r.mountOnEnter ? c = mn : c = ye, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  e.getDerivedStateFromProps = function(o, a) {
    var s = o.in;
    return s && a.status === mn ? {
      status: ye
    } : null;
  };
  var n = e.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== xe && s !== Le && (a = xe) : (s === xe || s === Le) && (a = lo);
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
      if (this.cancelNextCallback(), a === xe) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Xn.findDOMNode(this);
          s && wm(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ye && this.setState({
        status: mn
      });
  }, n.performEnter = function(o) {
    var a = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Xn.findDOMNode(this), l], d = c[0], u = c[1], f = this.getTimeouts(), w = l ? f.appear : f.enter;
    if (!o && !s || oi.disabled) {
      this.safeSetState({
        status: Le
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, u), this.safeSetState({
      status: xe
    }, function() {
      a.props.onEntering(d, u), a.onTransitionEnd(w, function() {
        a.safeSetState({
          status: Le
        }, function() {
          a.props.onEntered(d, u);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Xn.findDOMNode(this);
    if (!a || oi.disabled) {
      this.safeSetState({
        status: ye
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: lo
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: ye
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Xn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!s || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], d = c[0], u = c[1];
      this.props.addEndListener(d, u);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === mn)
      return null;
    var a = this.props, s = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = Rt(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ T.createElement(js.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : T.cloneElement(T.Children.only(s), l))
    );
  }, e;
}(T.Component);
ue.contextType = js;
ue.propTypes = process.env.NODE_ENV !== "production" ? {
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
  nodeRef: p.shape({
    current: typeof Element > "u" ? p.any : function(t, e, n, r, o, a) {
      var s = t[e];
      return p.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(t, e, n, r, o, a);
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
  children: p.oneOfType([p.func.isRequired, p.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: p.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: p.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: p.bool,
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
  appear: p.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: p.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: p.bool,
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
    var n = pm;
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
  addEndListener: p.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: p.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: p.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: p.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: p.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: p.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: p.func
} : {};
function ze() {
}
ue.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: ze,
  onEntering: ze,
  onEntered: ze,
  onExit: ze,
  onExiting: ze,
  onExited: ze
};
ue.UNMOUNTED = mn;
ue.EXITED = ye;
ue.ENTERING = xe;
ue.ENTERED = Le;
ue.EXITING = lo;
const fm = ue, mm = (t) => t.scrollTop;
function ai(t, e) {
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
const hm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function co(t) {
  return `scale(${t}, ${t ** 2})`;
}
const gm = {
  entering: {
    opacity: 1,
    transform: co(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Xr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Ko = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: d,
    onEntering: u,
    onExit: f,
    onExited: w,
    onExiting: g,
    style: v,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = fm
  } = e, N = Rt(e, hm), S = wn(), C = B.useRef(), E = Bs(), b = B.useRef(null), P = Re(b, a.ref, n), L = (U) => (V) => {
    if (U) {
      const tt = b.current;
      V === void 0 ? U(tt) : U(tt, V);
    }
  }, _ = L(u), $ = L((U, V) => {
    mm(U);
    const {
      duration: tt,
      delay: ot,
      easing: at
    } = ai({
      style: v,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let x;
    m === "auto" ? (x = E.transitions.getAutoHeightDuration(U.clientHeight), C.current = x) : x = tt, U.style.transition = [E.transitions.create("opacity", {
      duration: x,
      delay: ot
    }), E.transitions.create("transform", {
      duration: Xr ? x : x * 0.666,
      delay: ot,
      easing: at
    })].join(","), c && c(U, V);
  }), F = L(d), D = L(g), A = L((U) => {
    const {
      duration: V,
      delay: tt,
      easing: ot
    } = ai({
      style: v,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let at;
    m === "auto" ? (at = E.transitions.getAutoHeightDuration(U.clientHeight), C.current = at) : at = V, U.style.transition = [E.transitions.create("opacity", {
      duration: at,
      delay: tt
    }), E.transitions.create("transform", {
      duration: Xr ? at : at * 0.666,
      delay: Xr ? tt : tt || at * 0.333,
      easing: ot
    })].join(","), U.style.opacity = 0, U.style.transform = co(0.75), f && f(U);
  }), M = L(w);
  return /* @__PURE__ */ i(h, I({
    appear: o,
    in: l,
    nodeRef: b,
    onEnter: $,
    onEntered: F,
    onEntering: _,
    onExit: A,
    onExited: M,
    onExiting: D,
    addEndListener: (U) => {
      m === "auto" && S.start(C.current || 0, U), r && r(b.current, U);
    },
    timeout: m === "auto" ? null : m
  }, N, {
    children: (U, V) => /* @__PURE__ */ B.cloneElement(a, I({
      style: I({
        opacity: 0,
        transform: co(0.75),
        visibility: U === "exited" && !l ? "hidden" : void 0
      }, gm[U], v, a.props.style),
      ref: P
    }, V))
  }));
});
process.env.NODE_ENV !== "production" && (Ko.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: p.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: p.bool,
  /**
   * A single child content element.
   */
  children: is.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: p.oneOfType([p.shape({
    enter: p.string,
    exit: p.string
  }), p.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: p.bool,
  /**
   * @ignore
   */
  onEnter: p.func,
  /**
   * @ignore
   */
  onEntered: p.func,
  /**
   * @ignore
   */
  onEntering: p.func,
  /**
   * @ignore
   */
  onExit: p.func,
  /**
   * @ignore
   */
  onExited: p.func,
  /**
   * @ignore
   */
  onExiting: p.func,
  /**
   * @ignore
   */
  style: p.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: p.oneOfType([p.oneOf(["auto"]), p.number, p.shape({
    appear: p.number,
    enter: p.number,
    exit: p.number
  })])
});
Ko.muiSupportAuto = !0;
const ii = Ko, bm = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], vm = Vn(Ds, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (t, e) => e.root
})({}), Vs = /* @__PURE__ */ B.forwardRef(function(e, n) {
  var r;
  const o = vs(), a = Lo({
    props: e,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: d,
    container: u,
    disablePortal: f,
    keepMounted: w,
    modifiers: g,
    open: v,
    placement: m,
    popperOptions: h,
    popperRef: N,
    transition: S,
    slots: C,
    slotProps: E
  } = a, b = Rt(a, bm), P = (r = C == null ? void 0 : C.root) != null ? r : c == null ? void 0 : c.Root, L = I({
    anchorEl: s,
    container: u,
    disablePortal: f,
    keepMounted: w,
    modifiers: g,
    open: v,
    placement: m,
    popperOptions: h,
    popperRef: N,
    transition: S
  }, b);
  return /* @__PURE__ */ i(vm, I({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: P
    },
    slotProps: E ?? d
  }, L, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Vs.propTypes = {
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
  anchorEl: p.oneOfType([kn, p.object, p.func]),
  /**
   * Popper render function or node.
   */
  children: p.oneOfType([p.node, p.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: p.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: p.shape({
    Root: p.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: p.shape({
    root: p.oneOfType([p.func, p.object])
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
  container: p.oneOfType([kn, p.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: p.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: p.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: p.arrayOf(p.shape({
    data: p.object,
    effect: p.func,
    enabled: p.bool,
    fn: p.func,
    name: p.any,
    options: p.object,
    phase: p.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: p.arrayOf(p.string),
    requiresIfExists: p.arrayOf(p.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: p.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: p.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: p.shape({
    modifiers: p.array,
    onFirstUpdate: p.func,
    placement: p.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: p.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: ls,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: p.shape({
    root: p.oneOfType([p.func, p.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: p.shape({
    root: p.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: p.oneOfType([p.arrayOf(p.oneOfType([p.func, p.object, p.bool])), p.func, p.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: p.bool
});
const zs = Vs;
function ym(t) {
  return fr("MuiTooltip", t);
}
const xm = ms("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), we = xm, Nm = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function km(t) {
  return Math.round(t * 1e5) / 1e5;
}
const Em = (t) => {
  const {
    classes: e,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = t, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${ne(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return $o(s, ym, e);
}, Tm = Vn(zs, {
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
}) => I({
  zIndex: (t.vars || t).zIndex.tooltip,
  pointerEvents: "none"
}, !e.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, e.arrow && {
  [`&[data-popper-placement*="bottom"] .${we.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${we.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${we.arrow}`]: I({}, e.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${we.arrow}`]: I({}, e.isRtl ? {
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
})), Sm = Vn("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.tooltip, n.touch && e.touch, n.arrow && e.tooltipArrow, e[`tooltipPlacement${ne(n.placement.split("-")[0])}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => I({
  backgroundColor: t.vars ? t.vars.palette.Tooltip.bg : xs(t.palette.grey[700], 0.92),
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
  lineHeight: `${km(16 / 14)}em`,
  fontWeight: t.typography.fontWeightRegular
}, {
  [`.${we.popper}[data-popper-placement*="left"] &`]: I({
    transformOrigin: "right center"
  }, e.isRtl ? I({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  }) : I({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  })),
  [`.${we.popper}[data-popper-placement*="right"] &`]: I({
    transformOrigin: "left center"
  }, e.isRtl ? I({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  }) : I({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  })),
  [`.${we.popper}[data-popper-placement*="top"] &`]: I({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, e.touch && {
    marginBottom: "24px"
  }),
  [`.${we.popper}[data-popper-placement*="bottom"] &`]: I({
    transformOrigin: "center top",
    marginTop: "14px"
  }, e.touch && {
    marginTop: "24px"
  })
})), Cm = Vn("span", {
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
  color: t.vars ? t.vars.palette.Tooltip.bg : xs(t.palette.grey[700], 0.9),
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
const si = new Dn();
let un = {
  x: 0,
  y: 0
};
function Kn(t, e) {
  return (n) => {
    e && e(n), t(n);
  };
}
const Ls = /* @__PURE__ */ B.forwardRef(function(e, n) {
  var r, o, a, s, l, c, d, u, f, w, g, v, m, h, N, S, C, E, b;
  const P = Lo({
    props: e,
    name: "MuiTooltip"
  }), {
    arrow: L = !1,
    children: _,
    components: $ = {},
    componentsProps: F = {},
    describeChild: D = !1,
    disableFocusListener: A = !1,
    disableHoverListener: M = !1,
    disableInteractive: Y = !1,
    disableTouchListener: U = !1,
    enterDelay: V = 100,
    enterNextDelay: tt = 0,
    enterTouchDelay: ot = 700,
    followCursor: at = !1,
    id: x,
    leaveDelay: O = 0,
    leaveTouchDelay: G = 1500,
    onClose: X,
    onOpen: z,
    open: q,
    placement: W = "bottom",
    PopperComponent: K,
    PopperProps: H = {},
    slotProps: Z = {},
    slots: Q = {},
    title: lt,
    TransitionComponent: R = ii,
    TransitionProps: Et
  } = P, j = Rt(P, Nm), xt = /* @__PURE__ */ B.isValidElement(_) ? _ : /* @__PURE__ */ i("span", {
    children: _
  }), Ot = Bs(), oe = Ot.direction === "rtl", [_t, J] = B.useState(), [nt, Nt] = B.useState(null), $t = B.useRef(!1), Kt = Y || at, Ie = wn(), Ae = wn(), ge = wn(), en = wn(), [Fn, Jo] = ds({
    controlled: q,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let ae = Fn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: et
    } = B.useRef(q !== void 0);
    B.useEffect(() => {
      _t && _t.disabled && !et && lt !== "" && _t.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [lt, _t, et]);
  }
  const Sr = cs(x), nn = B.useRef(), Un = ro(() => {
    nn.current !== void 0 && (document.body.style.WebkitUserSelect = nn.current, nn.current = void 0), en.clear();
  });
  B.useEffect(() => Un, [Un]);
  const Zo = (et) => {
    si.clear(), qn = !0, Jo(!0), z && !ae && z(et);
  }, Gn = ro(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (et) => {
      si.start(800 + O, () => {
        qn = !1;
      }), Jo(!1), X && ae && X(et), Ie.start(Ot.transitions.duration.shortest, () => {
        $t.current = !1;
      });
    }
  ), Cr = (et) => {
    $t.current && et.type !== "touchstart" || (_t && _t.removeAttribute("title"), Ae.clear(), ge.clear(), V || qn && tt ? Ae.start(qn ? tt : V, () => {
      Zo(et);
    }) : Zo(et));
  }, Qo = (et) => {
    Ae.clear(), ge.start(O, () => {
      Gn(et);
    });
  }, {
    isFocusVisibleRef: ta,
    onBlur: Js,
    onFocus: Zs,
    ref: Qs
  } = us(), [, ea] = B.useState(!1), na = (et) => {
    Js(et), ta.current === !1 && (ea(!1), Qo(et));
  }, ra = (et) => {
    _t || J(et.currentTarget), Zs(et), ta.current === !0 && (ea(!0), Cr(et));
  }, oa = (et) => {
    $t.current = !0;
    const jt = xt.props;
    jt.onTouchStart && jt.onTouchStart(et);
  }, aa = Cr, ia = Qo, tl = (et) => {
    oa(et), ge.clear(), Ie.clear(), Un(), nn.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", en.start(ot, () => {
      document.body.style.WebkitUserSelect = nn.current, Cr(et);
    });
  }, el = (et) => {
    xt.props.onTouchEnd && xt.props.onTouchEnd(et), Un(), ge.start(G, () => {
      Gn(et);
    });
  };
  B.useEffect(() => {
    if (!ae)
      return;
    function et(jt) {
      (jt.key === "Escape" || jt.key === "Esc") && Gn(jt);
    }
    return document.addEventListener("keydown", et), () => {
      document.removeEventListener("keydown", et);
    };
  }, [Gn, ae]);
  const nl = Re(xt.ref, Qs, J, n);
  !lt && lt !== 0 && (ae = !1);
  const Or = B.useRef(), rl = (et) => {
    const jt = xt.props;
    jt.onMouseMove && jt.onMouseMove(et), un = {
      x: et.clientX,
      y: et.clientY
    }, Or.current && Or.current.update();
  }, rn = {}, Rr = typeof lt == "string";
  D ? (rn.title = !ae && Rr && !M ? lt : null, rn["aria-describedby"] = ae ? Sr : null) : (rn["aria-label"] = Rr ? lt : null, rn["aria-labelledby"] = ae && !Rr ? Sr : null);
  const Ut = I({}, rn, j, xt.props, {
    className: Ee(j.className, xt.props.className),
    onTouchStart: oa,
    ref: nl
  }, at ? {
    onMouseMove: rl
  } : {});
  process.env.NODE_ENV !== "production" && (Ut["data-mui-internal-clone-element"] = !0, B.useEffect(() => {
    _t && !_t.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [_t]));
  const on = {};
  U || (Ut.onTouchStart = tl, Ut.onTouchEnd = el), M || (Ut.onMouseOver = Kn(aa, Ut.onMouseOver), Ut.onMouseLeave = Kn(ia, Ut.onMouseLeave), Kt || (on.onMouseOver = aa, on.onMouseLeave = ia)), A || (Ut.onFocus = Kn(ra, Ut.onFocus), Ut.onBlur = Kn(na, Ut.onBlur), Kt || (on.onFocus = ra, on.onBlur = na)), process.env.NODE_ENV !== "production" && xt.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${xt.props.title}\` or the Tooltip component.`].join(`
`));
  const ol = B.useMemo(() => {
    var et;
    let jt = [{
      name: "arrow",
      enabled: !!nt,
      options: {
        element: nt,
        padding: 4
      }
    }];
    return (et = H.popperOptions) != null && et.modifiers && (jt = jt.concat(H.popperOptions.modifiers)), I({}, H.popperOptions, {
      modifiers: jt
    });
  }, [nt, H]), an = I({}, P, {
    isRtl: oe,
    arrow: L,
    disableInteractive: Kt,
    placement: W,
    PopperComponentProp: K,
    touch: $t.current
  }), _r = Em(an), sa = (r = (o = Q.popper) != null ? o : $.Popper) != null ? r : Tm, la = (a = (s = (l = Q.transition) != null ? l : $.Transition) != null ? s : R) != null ? a : ii, ca = (c = (d = Q.tooltip) != null ? d : $.Tooltip) != null ? c : Sm, da = (u = (f = Q.arrow) != null ? f : $.Arrow) != null ? u : Cm, al = fn(sa, I({}, H, (w = Z.popper) != null ? w : F.popper, {
    className: Ee(_r.popper, H == null ? void 0 : H.className, (g = (v = Z.popper) != null ? v : F.popper) == null ? void 0 : g.className)
  }), an), il = fn(la, I({}, Et, (m = Z.transition) != null ? m : F.transition), an), sl = fn(ca, I({}, (h = Z.tooltip) != null ? h : F.tooltip, {
    className: Ee(_r.tooltip, (N = (S = Z.tooltip) != null ? S : F.tooltip) == null ? void 0 : N.className)
  }), an), ll = fn(da, I({}, (C = Z.arrow) != null ? C : F.arrow, {
    className: Ee(_r.arrow, (E = (b = Z.arrow) != null ? b : F.arrow) == null ? void 0 : E.className)
  }), an);
  return /* @__PURE__ */ y(B.Fragment, {
    children: [/* @__PURE__ */ B.cloneElement(xt, Ut), /* @__PURE__ */ i(sa, I({
      as: K ?? zs,
      placement: W,
      anchorEl: at ? {
        getBoundingClientRect: () => ({
          top: un.y,
          left: un.x,
          right: un.x,
          bottom: un.y,
          width: 0,
          height: 0
        })
      } : _t,
      popperRef: Or,
      open: _t ? ae : !1,
      id: Sr,
      transition: !0
    }, on, al, {
      popperOptions: ol,
      children: ({
        TransitionProps: et
      }) => /* @__PURE__ */ i(la, I({
        timeout: Ot.transitions.duration.shorter
      }, et, il, {
        children: /* @__PURE__ */ y(ca, I({}, sl, {
          children: [lt, L ? /* @__PURE__ */ i(da, I({}, ll, {
            ref: Nt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Ls.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: p.bool,
  /**
   * Tooltip reference element.
   */
  children: is.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: p.object,
  /**
   * @ignore
   */
  className: p.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: p.shape({
    Arrow: p.elementType,
    Popper: p.elementType,
    Tooltip: p.elementType,
    Transition: p.elementType
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
  componentsProps: p.shape({
    arrow: p.object,
    popper: p.object,
    tooltip: p.object,
    transition: p.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: p.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: p.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: p.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: p.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: p.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: p.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: p.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: p.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: p.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: p.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: p.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: p.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: p.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: p.func,
  /**
   * If `true`, the component is shown.
   */
  open: p.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: p.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: p.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: p.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: p.shape({
    arrow: p.object,
    popper: p.object,
    tooltip: p.object,
    transition: p.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: p.shape({
    arrow: p.elementType,
    popper: p.elementType,
    tooltip: p.elementType,
    transition: p.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: p.oneOfType([p.arrayOf(p.oneOfType([p.func, p.object, p.bool])), p.func, p.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: p.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: p.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: p.object
});
const Om = Ls;
function li(t, e, n) {
  return t ? /* @__PURE__ */ i(xi, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ i("img", { src: t, alt: `${n ? "Leading" : "Trailing"} icon for ${e}` }) }) : void 0;
}
function Fs(t) {
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
    isDense: u = !0,
    isSubMenuParent: f = !1,
    hasDisabledGutters: w = !1,
    hasDivider: g = !1,
    focusVisibleClassName: v,
    id: m,
    children: h
  } = t, N = /* @__PURE__ */ i(
    Ql,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: d,
      dense: u,
      disableGutters: w,
      divider: g,
      focusVisibleClassName: v,
      onClick: e,
      id: m,
      children: n ? /* @__PURE__ */ y(de, { children: [
        li(a, n, !0),
        /* @__PURE__ */ i(tc, { primary: n, inset: !a && o }),
        f ? /* @__PURE__ */ i(xi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ i(ks, {}) }) : li(s, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ i(Om, { title: r, placement: "right", children: /* @__PURE__ */ i("div", { children: N }) }) : N;
}
function Us(t) {
  return Object.entries(t.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Rm(t) {
  const [e, n] = st(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = t, s = (d) => {
    n(d.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let d = Us(a).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === r.id
    ), /* @__PURE__ */ i(Gs, { ...t, includedGroups: d });
  };
  return /* @__PURE__ */ y(de, { children: [
    /* @__PURE__ */ i(Fs, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ i(
      ec,
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
const _m = (t, e) => e.filter((o) => o.group === t).sort((o, a) => (o.order || 0) - (a.order || 0));
function Gs(t) {
  const { menuDefinition: e, onClick: n, commandHandler: r, includedGroups: o } = t, { items: a, allowForLeadingIcons: s } = Tt(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Us(e).filter((v) => !("menuItem" in v.group))
    ), f = Object.values(u).sort(
      (v, m) => (v.group.order || 0) - (m.group.order || 0)
    ), w = [];
    f.forEach((v) => {
      _m(v.id, e.items).forEach(
        (m) => w.push({ item: m, isLastItemInGroup: !1 })
      ), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !0);
    }), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !1);
    const g = w.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: w, allowForLeadingIcons: g };
  }, [o, e]), l = ({ item: u, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: u.label,
    tooltip: u.tooltip,
    iconPathBefore: "iconPathBefore" in u ? u.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in u ? u.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ i("div", {});
  const d = c.item.group;
  return /* @__PURE__ */ i("div", { role: "menu", "aria-label": d, children: a.map((u, f) => {
    const { item: w } = u, g = l(u);
    if ("command" in w) {
      const v = w.group + f;
      return /* @__PURE__ */ i(
        Fs,
        {
          onClick: (m) => {
            n == null || n(m), r(w);
          },
          ...g
        },
        v
      );
    }
    return /* @__PURE__ */ i(
      Rm,
      {
        parentMenuItem: w,
        parentItemProps: g,
        ...t
      },
      d + w.id
    );
  }) }, d);
}
function Pm(t) {
  const { menuDefinition: e, columnId: n } = t;
  let a = Object.entries(e.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in e && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  e.columns[n] && (a = a.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ i(Gs, { ...t, includedGroups: a });
}
function $m({
  commandHandler: t,
  menuDefinition: e,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ y(
    Ni,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ i("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ i(nc, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ i(
          Pm,
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
function Im({
  commandHandler: t,
  className: e,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = Tt(() => {
    const s = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, d = o[c];
      typeof d == "object" && typeof d.order == "number" && !Number.isNaN(d.order) ? s.set(d.order, { id: c, metadata: d }) : console.warn(
        `Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ i(
    Ni,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${e ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((s, l) => /* @__PURE__ */ i(
        $m,
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
function Am(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const uo = (t, e, n = {}) => {
  const r = ke(e);
  r.current = e;
  const o = ke(n);
  o.current = Am(o.current);
  const [a, s] = st(() => r.current), [l, c] = st(!0);
  return te(() => {
    let d = !0;
    return c(!!t), (async () => {
      if (t) {
        const u = await t();
        d && (s(() => u), c(!1));
      }
    })(), () => {
      d = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [t]), [a, l];
}, Mm = Ns(/* @__PURE__ */ i("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Dm({
  menuProvider: t,
  normalMenu: e,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, d] = st(!1), [u, f] = st(!1), w = Pt(() => {
    c && d(!1), f(!1);
  }, [c]), g = Pt((E) => {
    E.stopPropagation(), d((b) => {
      const P = !b;
      return P && E.shiftKey ? f(!0) : P || f(!1), P;
    });
  }, []), v = Pt(
    (E) => (w(), r(E)),
    [r, w]
  ), [m, h] = st({ top: 1, left: 1 });
  te(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const b = E.getBoundingClientRect(), P = window.scrollY, L = window.scrollX, _ = b.top + P + E.clientHeight, $ = b.left + L;
        h({ top: _, left: $ });
      }
    }
  }, [c, o]);
  const [N] = uo(
    Pt(async () => (t == null ? void 0 : t(!1)) ?? e, [t, e, c]),
    e
  ), [S] = uo(
    Pt(async () => (t == null ? void 0 : t(!0)) ?? n ?? N, [t, n, N, c]),
    n ?? N
  ), C = u && S ? S : N;
  return /* @__PURE__ */ y(de, { children: [
    /* @__PURE__ */ i(
      ki,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: g,
        children: l ?? /* @__PURE__ */ i(Mm, {})
      }
    ),
    /* @__PURE__ */ i(
      rc,
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
        children: C ? /* @__PURE__ */ i(
          Im,
          {
            className: a,
            id: `${s ?? ""} main menu`,
            commandHandler: v,
            multiColumnMenu: C
          }
        ) : void 0
      }
    )
  ] });
}
function Bh({
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
    ki,
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
const $e = lr(({ className: t, ...e }, n) => /* @__PURE__ */ i(Rl, { size: 35, className: k("tw-animate-spin", t), ...e, ref: n }));
$e.displayName = "Spinner";
function jh({
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
  value: u,
  onChange: f,
  onFocus: w,
  onBlur: g
}) {
  return /* @__PURE__ */ y("div", { className: k("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ i(
      Ct,
      {
        htmlFor: t,
        className: k({
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
        className: k(c, { "tw-border-red-600": n }),
        defaultValue: d,
        value: u,
        onChange: f,
        onFocus: w,
        onBlur: g
      }
    ),
    /* @__PURE__ */ i("p", { className: k({ "tw-hidden": !o }), children: o })
  ] });
}
function Vh({
  menuProvider: t,
  commandHandler: e,
  className: n,
  id: r,
  children: o
}) {
  const a = ke(void 0);
  return /* @__PURE__ */ i("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ i(oc, { position: "static", id: r, children: /* @__PURE__ */ y(
    ac,
    {
      className: k("tw-bg-muted tw-text-muted-foreground", n),
      variant: "dense",
      children: [
        t ? /* @__PURE__ */ i(
          Dm,
          {
            commandHandler: e,
            containerRef: a,
            menuProvider: t
          }
        ) : void 0,
        o ? /* @__PURE__ */ i("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const Bm = Ze(
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
), jm = T.forwardRef(({ className: t, variant: e, ...n }, r) => /* @__PURE__ */ i("div", { ref: r, role: "alert", className: k(Bm({ variant: e }), t), ...n }));
jm.displayName = "Alert";
const Vm = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ y(
    "h5",
    {
      ref: n,
      className: k("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
Vm.displayName = "AlertTitle";
const zm = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: k("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
zm.displayName = "AlertDescription";
const Lm = Ze(
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
function Fm({ className: t, variant: e, ...n }) {
  return /* @__PURE__ */ i("div", { className: k("pr-twp", Lm({ variant: e }), t), ...n });
}
const Xs = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: k(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
Xs.displayName = "Card";
const Hs = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: k("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Hs.displayName = "CardHeader";
const Ys = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "h3",
    {
      ref: n,
      className: k(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
Ys.displayName = "CardTitle";
const Ws = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("p", { ref: n, className: k("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Ws.displayName = "CardDescription";
const qs = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: k("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
qs.displayName = "CardContent";
const Ks = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: k("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Ks.displayName = "CardFooter";
function zh({ ...t }) {
  return /* @__PURE__ */ i(
    sc,
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
const Um = T.forwardRef(({ className: t, ...e }, n) => {
  const r = St();
  return /* @__PURE__ */ y(
    pn.Root,
    {
      ref: n,
      className: k(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: r,
      children: [
        /* @__PURE__ */ i(pn.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ i(pn.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ i(pn.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Um.displayName = pn.Root.displayName;
const Gm = T.forwardRef(({ className: t, ...e }, n) => {
  const r = St();
  return /* @__PURE__ */ i(
    qr.Root,
    {
      className: k(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ i(
        qr.Thumb,
        {
          className: k(
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
Gm.displayName = qr.Root.displayName;
const Lh = Bt.Root, Xm = T.forwardRef(({ className: t, ...e }, n) => {
  const r = St();
  return /* @__PURE__ */ i(
    Bt.List,
    {
      ref: n,
      className: k(
        "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: r
    }
  );
});
Xm.displayName = Bt.List.displayName;
const Hm = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Bt.Trigger,
  {
    ref: n,
    className: k(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Hm.displayName = Bt.Trigger.displayName;
const Ym = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Bt.Content,
  {
    ref: n,
    className: k(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Ym.displayName = Bt.Content.displayName;
function Fh({
  isInstalling: t,
  handleClick: e,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ i(
    mt,
    {
      className: k(
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
      children: t ? /* @__PURE__ */ i($e, { size: 15 }) : /* @__PURE__ */ y(de, { children: [
        /* @__PURE__ */ i(_l, { size: 25, className: k("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function Uh({
  isEnabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    mt,
    {
      className: k(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ y(de, { children: [
        /* @__PURE__ */ i($e, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Gh({
  isDisabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    mt,
    {
      className: k(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ y(de, { children: [
        /* @__PURE__ */ i($e, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function Xh({
  isUpdating: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    mt,
    {
      className: k(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ y(de, { children: [
        /* @__PURE__ */ i($e, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function Hh({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: r
}) {
  const o = Tt(
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
  return /* @__PURE__ */ i("div", { id: t, className: k("pr-twp tw-prose", n), children: /* @__PURE__ */ i(lc, { options: o, children: e }) });
}
const Wm = lr((t, e) => /* @__PURE__ */ y(
  mt,
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
      /* @__PURE__ */ i(Pl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ i(
        On,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var qm = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(qm || {});
function Yh({ id: t, groups: e }) {
  return /* @__PURE__ */ i("div", { id: t, children: /* @__PURE__ */ y(dr, { children: [
    /* @__PURE__ */ i(mo, { asChild: !0, children: /* @__PURE__ */ i(Wm, {}) }),
    /* @__PURE__ */ i(_n, { children: e.map((n) => /* @__PURE__ */ y("div", { children: [
      /* @__PURE__ */ i(Pn, { children: n.label }),
      /* @__PURE__ */ i(pc, { children: n.items.map((r) => /* @__PURE__ */ i("div", { children: r.itemType === 0 ? /* @__PURE__ */ i(ho, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ i(Ei, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ i($n, {})
    ] }, n.label)) })
  ] }) });
}
function Wh({ id: t, message: e }) {
  return /* @__PURE__ */ i("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ i("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function qh({
  id: t,
  category: e,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new Ul("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((l, c) => l + c, 0)), s = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ y(
    "div",
    {
      id: t,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: e }) }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ i($l, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((l) => /* @__PURE__ */ i(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          r.length > 3 && /* @__PURE__ */ y(
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
        /* @__PURE__ */ y("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ y(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ i(Il, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ y(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ i(Al, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Km({ id: t, versionHistory: e }) {
  const [n, r] = st(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), d = new Date(o.getTime() - c.getTime()), u = d.getUTCFullYear() - 1970, f = d.getUTCMonth(), w = d.getUTCDate() - 1;
    let g = "";
    return u > 0 ? g = `${u.toString()} year${u === 1 ? "" : "s"} ago` : f > 0 ? g = `${f.toString()} month${f === 1 ? "" : "s"} ago` : w === 0 ? g = "today" : g = `${w.toString()} day${w === 1 ? "" : "s"} ago`, g;
  }
  const s = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ y("div", { id: t, children: [
    /* @__PURE__ */ i("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ i("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ y("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ i("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ i("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ i("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ y("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ y("div", { children: [
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
function Kh({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = Tt(() => Gl(n), [n]), l = ((c) => {
    const d = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((u) => d.of(u));
  })(r);
  return /* @__PURE__ */ i("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ y("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ i(Km, { versionHistory: o }),
    /* @__PURE__ */ i("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ y("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ i("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ y("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ y("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ i("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ y("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function ci({
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
  badgesPlaceholder: u
}) {
  return /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ i(
      dd,
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
      return /* @__PURE__ */ y(Fm, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ i(
          mt,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => r(n.filter((g) => g !== f)),
            children: /* @__PURE__ */ i(po, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (w = t.find((g) => g.value === f)) == null ? void 0 : w.label
      ] }, f);
    }) }) : /* @__PURE__ */ i(Ct, { children: u })
  ] });
}
const Jh = [
  "%resources_action%",
  "%resources_any%",
  "%resources_dialog_subtitle%",
  "%resources_dialog_title%",
  "%resources_filterBy%",
  "%resources_filterInput%",
  "%resources_fullName%",
  "%resources_get%",
  "%resources_installed%",
  "%resources_language%",
  "%resources_languages%",
  "%resources_loadingResources%",
  "%resources_noResults%",
  "%resources_open%",
  "%resources_remove%",
  "%resources_results%",
  "%resources_showing%",
  "%resources_size%",
  "%resources_type%",
  "%resources_types%",
  "%resources_type_DBL%",
  "%resources_type_ER%",
  "%resources_type_SLR%",
  "%resources_type_XR%",
  "%resources_type_unknown%",
  "%resources_update%"
], Jm = (t, e) => {
  const n = Array.from(
    new Set(
      t.map((s) => s.bestLanguageName)
    )
  ), r = new Set(
    t.filter((s) => s.installed).map((s) => s.bestLanguageName)
  ), o = new Set(e.concat(Array.from(r)));
  return n.sort((s, l) => {
    const c = o.has(s), d = o.has(l);
    return c && d ? s.localeCompare(l) : c ? -1 : d ? 1 : s.localeCompare(l);
  }).map((s) => ({ label: s, value: s, starred: r.has(s) }));
}, di = (t, e, n) => /* @__PURE__ */ i(
  mt,
  {
    className: "tw-bg-muted",
    variant: "ghost",
    onClick: () => n(t.dblEntryUid, "install"),
    children: e
  }
), Zm = (t, e, n, r, o, a) => e.includes(t.dblEntryUid) ? /* @__PURE__ */ i(mt, { className: "tw-bg-muted", variant: "ghost", children: /* @__PURE__ */ i($e, { className: "tw-h-5 tw-py-[1px]" }) }) : t.installed ? t.updateAvailable ? di(t, r, a) : /* @__PURE__ */ i(Ct, { className: "tw-my-2 tw-flex tw-h-6 tw-items-center", children: o }) : di(t, n, a);
function Zh({
  localizedStrings: t,
  resources: e,
  isLoadingResources: n,
  selectedTypes: r,
  setSelectedTypes: o,
  selectedLanguages: a,
  setSelectedLanguages: s,
  openResource: l,
  installResource: c,
  uninstallResource: d,
  className: u
}) {
  const f = t["%resources_action%"], w = t["%resources_any%"], g = t["%resources_dialog_subtitle%"], v = t["%resources_dialog_title%"], m = t["%resources_filterInput%"], h = t["%resources_filterBy%"], N = t["%resources_fullName%"], S = t["%resources_get%"], C = t["%resources_installed%"], E = t["%resources_language%"], b = t["%resources_languages%"], P = t["%resources_loadingResources%"], L = t["%resources_noResults%"], _ = t["%resources_open%"], $ = t["%resources_remove%"], F = t["%resources_results%"], D = t["%resources_showing%"], A = t["%resources_size%"], M = t["%resources_type%"], Y = t["%resources_types%"], U = t["%resources_type_DBL%"], V = t["%resources_type_ER%"], tt = t["%resources_type_SLR%"], ot = t["%resources_type_XR%"], at = t["%resources_type_unknown%"], x = t["%resources_update%"], [O, G] = st(!1);
  te(() => {
    if (!O) {
      if (a.length > 0) {
        G(!0);
        return;
      }
      e.length > 0 && a.length === 0 && (s(
        Array.from(
          new Set(
            e.filter((J) => J.installed === !0).map((J) => J.bestLanguageName)
          )
        )
      ), G(!0));
    }
  }, [e, a.length, s, O, G]);
  const [X, z] = st([]), q = (J, nt) => {
    if (!c || !d)
      return;
    const Nt = {
      dblEntryUid: J,
      action: nt === "install" ? "installing" : "removing"
    };
    z((Kt) => [...Kt, Nt]), (nt === "install" ? c : d)(J).catch((Kt) => {
      console.debug(Xl(Kt));
    });
  };
  te(() => {
    z(
      (J) => J.filter((nt) => {
        const Nt = e.find(($t) => $t.dblEntryUid === nt.dblEntryUid);
        return Nt ? !(nt.action === "installing" && Nt.installed || nt.action === "removing" && !Nt.installed) : !0;
      })
    );
  }, [e]);
  const [W, K] = st(""), H = Tt(() => e.filter((J) => {
    const nt = W.toLowerCase();
    return J.displayName.toLowerCase().includes(nt) || J.fullName.toLowerCase().includes(nt) || J.bestLanguageName.toLowerCase().includes(nt);
  }), [e, W]), Z = Tt(() => [
    { value: "DBLResource", label: U },
    { value: "EnhancedResource", label: V },
    { value: "SourceLanguageResource", label: tt },
    { value: "XmlResource", label: ot }
  ], [U, V, tt, ot]), Q = Tt(() => r.length === 0 ? H : H.filter((J) => r.includes(J.type)), [H, r]), lt = Tt(() => a.length === 0 ? Q : Q.filter((J) => a.includes(J.bestLanguageName)), [a, Q]), [R, Et] = st({
    key: "bestLanguageName",
    direction: "ascending"
  }), j = Tt(() => [...lt].sort((J, nt) => {
    let Nt, $t;
    return R.key === "action" ? (Nt = (J.installed ? 10 : 0) + (J.updateAvailable ? 1 : 0), $t = (nt.installed ? 10 : 0) + (nt.updateAvailable ? 1 : 0)) : (Nt = J[R.key], $t = nt[R.key]), Nt < $t ? R.direction === "ascending" ? -1 : 1 : Nt > $t ? R.direction === "ascending" ? 1 : -1 : 0;
  }), [R.direction, R.key, lt]), xt = (J) => {
    const nt = { key: J, direction: "ascending" };
    R.key === J && R.direction === "ascending" && (nt.direction = "descending"), Et(nt);
  }, Ot = (J, nt) => /* @__PURE__ */ i(fe, { onClick: () => xt(J), children: /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center", children: [
    /* @__PURE__ */ i("div", { className: "tw-font-normal", children: nt }),
    R.key !== J && /* @__PURE__ */ i(wo, { className: "tw-pl-1", size: 16 }),
    R.key === J && (R.direction === "ascending" ? /* @__PURE__ */ i(fi, { className: "tw-pl-1", size: 16 }) : /* @__PURE__ */ i(On, { className: "tw-pl-1", size: 16 }))
  ] }) }), oe = (J) => e.filter((nt) => nt.type === J.value).length ?? 0, _t = (J) => e.filter((nt) => nt.bestLanguageName === J.value).length ?? 0;
  return /* @__PURE__ */ i("div", { className: u, children: /* @__PURE__ */ y(Xs, { className: "tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0", children: [
    /* @__PURE__ */ i(Hs, { className: "tw-flex-shrink-0", children: /* @__PURE__ */ y("div", { className: "tw-flex", children: [
      /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-pr-4", children: [
        /* @__PURE__ */ i(pa, { size: 36, className: "tw-me-4" }),
        /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ i(Ys, { children: v }),
          /* @__PURE__ */ i(Ws, { className: "tw-mt-1", children: g }),
          /* @__PURE__ */ i(
            Co,
            {
              className: "tw-min-w-72",
              onSearch: K,
              placeholder: m
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-gap-1", children: [
        /* @__PURE__ */ i(Ct, { className: "tw-mb-2 tw-text-muted-foreground", children: h }),
        /* @__PURE__ */ i(
          ci,
          {
            entries: Z,
            getEntriesCount: oe,
            selected: r,
            onChange: o,
            placeholder: Y,
            icon: /* @__PURE__ */ i(Ml, {}),
            badgesPlaceholder: w
          }
        ),
        /* @__PURE__ */ i(
          ci,
          {
            entries: Jm(e, a),
            getEntriesCount: _t,
            selected: a,
            onChange: s,
            placeholder: b,
            sortSelected: !0,
            icon: /* @__PURE__ */ i(Dl, {}),
            badgesPlaceholder: w
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ i(qs, { className: "tw-flex-grow tw-overflow-auto", children: n || !e ? /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-2", children: [
      /* @__PURE__ */ i(Ct, { children: P }),
      /* @__PURE__ */ i($e, {})
    ] }) : /* @__PURE__ */ i("div", { children: j.length === 0 ? /* @__PURE__ */ i("div", { className: "tw-m-4 tw-flex tw-justify-center", children: /* @__PURE__ */ i(Ct, { children: L }) }) : /* @__PURE__ */ y(In, { stickyHeader: !0, children: [
      /* @__PURE__ */ i(An, { className: "tw-bg-none", stickyHeader: !0, children: /* @__PURE__ */ y(Zt, { children: [
        /* @__PURE__ */ i(fe, {}),
        /* @__PURE__ */ i(fe, {}),
        Ot("fullName", N),
        Ot("bestLanguageName", E),
        Ot("type", M),
        Ot("size", A),
        Ot("action", f)
      ] }) }),
      /* @__PURE__ */ i(Mn, { children: j.map((J) => {
        var nt;
        return /* @__PURE__ */ y(Zt, { children: [
          /* @__PURE__ */ i(zt, { children: /* @__PURE__ */ i(pa, { className: "tw-pr-0", size: 18 }) }),
          /* @__PURE__ */ i(zt, { children: J.displayName }),
          /* @__PURE__ */ i(zt, { className: "tw-font-medium", children: J.fullName }),
          /* @__PURE__ */ i(zt, { children: J.bestLanguageName }),
          /* @__PURE__ */ i(zt, { children: ((nt = Z.find((Nt) => Nt.value === J.type)) == null ? void 0 : nt.label) ?? at }),
          /* @__PURE__ */ i(zt, { children: J.size }),
          /* @__PURE__ */ i(zt, { children: /* @__PURE__ */ y("div", { className: "tw-flex tw-justify-between", children: [
            Zm(
              J,
              X.map((Nt) => Nt.dblEntryUid),
              S,
              x,
              C,
              q
            ),
            J.installed && /* @__PURE__ */ y(dr, { children: [
              /* @__PURE__ */ i(mo, { asChild: !0, children: /* @__PURE__ */ i(mt, { variant: "ghost", children: /* @__PURE__ */ i(Bl, { className: "tw-w-4" }) }) }),
              /* @__PURE__ */ y(_n, { align: "start", children: [
                /* @__PURE__ */ i(
                  er,
                  {
                    onClick: () => l(J.projectId),
                    children: /* @__PURE__ */ i("span", { children: _ })
                  }
                ),
                /* @__PURE__ */ i($n, {}),
                /* @__PURE__ */ i(
                  er,
                  {
                    onClick: () => q(J.dblEntryUid, "remove"),
                    children: /* @__PURE__ */ i("span", { children: $ })
                  }
                )
              ] })
            ] })
          ] }) })
        ] }, J.displayName + J.fullName);
      }) })
    ] }) }) }),
    /* @__PURE__ */ i(Ks, { className: "tw-flex-shrink-0 tw-justify-center tw-border-t tw-p-4", children: j.length > 0 && /* @__PURE__ */ i(Ct, { className: "tw-font-normal", children: `${D} ${j.length} ${F}` }) })
  ] }) });
}
const Qm = (t, e) => t[e] ?? e;
function Qh({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: r,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: a,
  localizedStrings: s,
  className: l
}) {
  const c = Qm(
    s,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [d, u] = st(!1), f = (g) => {
    o && o(g), r && r([g, ...n.filter((v) => v !== g)]), a && n.find((v) => v === g) && a([...n.filter((v) => v !== g)]), u(!1);
  }, w = (g, v) => {
    var h, N, S, C, E, b;
    const m = v !== g ? ((N = (h = t[g]) == null ? void 0 : h.uiNames) == null ? void 0 : N[v]) ?? ((C = (S = t[g]) == null ? void 0 : S.uiNames) == null ? void 0 : C.en) : void 0;
    return m ? `${(E = t[g]) == null ? void 0 : E.autonym} (${m})` : (b = t[g]) == null ? void 0 : b.autonym;
  };
  return /* @__PURE__ */ y("div", { className: k("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ y(
      Ue,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (g) => u(g),
        children: [
          /* @__PURE__ */ i(Ce, { children: /* @__PURE__ */ i(Ge, {}) }),
          /* @__PURE__ */ i(
            Oe,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((g) => /* @__PURE__ */ i(Gt, { value: g, children: w(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ y(de, { children: [
      /* @__PURE__ */ i(Ct, { className: "tw-ms-3", children: c }),
      /* @__PURE__ */ i("div", { className: "tw-ms-3", children: /* @__PURE__ */ y(Ct, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((g) => w(g, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
const tg = (t, e) => {
  te(() => {
    if (!t)
      return () => {
      };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
}, Hr = () => !1, eg = (t, e) => {
  const [n] = uo(
    Pt(async () => {
      if (!t)
        return Hr;
      const r = await Promise.resolve(t(e));
      return async () => r();
    }, [e, t]),
    Hr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  te(() => () => {
    n !== Hr && n();
  }, [n]);
};
function th(t, e = "top") {
  if (!t || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
th(`*, ::before, ::after {
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
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-toolbar-children {
  padding: 10px;
  display: flex;
  gap: 8px;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
`, "top");
export {
  jm as Alert,
  zm as AlertDescription,
  Vm as AlertTitle,
  Nh as BOOK_SELECTOR_STRING_KEYS,
  Fm as Badge,
  xh as BookChapterControl,
  Yc as BookSelectionMode,
  kh as BookSelector,
  mt as Button,
  Xs as Card,
  qs as CardContent,
  Ws as CardDescription,
  Ks as CardFooter,
  Hs as CardHeader,
  Ys as CardTitle,
  Hc as ChapterRangeSelector,
  So as Checkbox,
  Dh as Checklist,
  Jr as ComboBox,
  ed as DataTable,
  Gh as DisableButton,
  dr as DropdownMenu,
  ho as DropdownMenuCheckboxItem,
  _n as DropdownMenuContent,
  pc as DropdownMenuGroup,
  er as DropdownMenuItem,
  qm as DropdownMenuItemType,
  Pn as DropdownMenuLabel,
  gh as DropdownMenuPortal,
  vh as DropdownMenuRadioGroup,
  Ei as DropdownMenuRadioItem,
  $n as DropdownMenuSeparator,
  mc as DropdownMenuShortcut,
  bh as DropdownMenuSub,
  fc as DropdownMenuSubContent,
  wc as DropdownMenuSubTrigger,
  mo as DropdownMenuTrigger,
  Uh as EnableButton,
  Jh as FILTERABLE_RESOURCE_LIST_STRING_KEYS,
  ci as Filter,
  Wm as FilterButton,
  Yh as FilterDropdown,
  Zh as FilterableResourceList,
  Kh as Footer,
  Im as GridMenu,
  Dm as HamburgerMenuButton,
  Ch as INVENTORY_STRING_KEYS,
  Bh as IconButton,
  Qe as Input,
  Fh as InstallButton,
  Oh as Inventory,
  Ct as Label,
  Hh as MarkdownRenderer,
  Fs as MenuItem,
  qh as MoreInfo,
  dd as MultiSelectComboBox,
  Rh as NavigationContentSearch,
  Wh as NoExtensionsFound,
  Pi as RadioGroup,
  Kr as RadioGroupItem,
  Ph as ScriptureResultsViewer,
  $h as ScrollGroupSelector,
  Co as SearchBar,
  Ue as Select,
  Oe as SelectContent,
  qc as SelectGroup,
  Gt as SelectItem,
  Kc as SelectLabel,
  Bi as SelectScrollDownButton,
  Di as SelectScrollUpButton,
  Jc as SelectSeparator,
  Ce as SelectTrigger,
  Ge as SelectValue,
  Oo as Separator,
  Ih as SettingsList,
  Mh as SettingsListHeader,
  Ah as SettingsListItem,
  Pd as SettingsSidebar,
  _h as SettingsSidebarContentSearch,
  Um as Slider,
  zh as Sonner,
  $e as Spinner,
  Gm as Switch,
  In as Table,
  Mn as TableBody,
  td as TableCaption,
  zt as TableCell,
  Qc as TableFooter,
  fe as TableHead,
  An as TableHeader,
  Zt as TableRow,
  Lh as Tabs,
  Ym as TabsContent,
  Xm as TabsList,
  Hm as TabsTrigger,
  jh as TextField,
  zi as ToggleGroup,
  Jn as ToggleGroupItem,
  Vh as Toolbar,
  Qh as UiLanguageSelector,
  Xh as UpdateButton,
  Km as VersionHistory,
  Li as VerticalTabs,
  Ui as VerticalTabsContent,
  Fi as VerticalTabsList,
  ud as VerticalTabsTrigger,
  Lm as badgeVariants,
  jc as buttonVariants,
  k as cn,
  od as getBookNumFromId,
  rd as getLinesFromUSFM,
  ha as getNumberFromUSFM,
  ad as getStatusForItem,
  Th as inventoryCountColumn,
  Eh as inventoryItemColumn,
  Sh as inventoryStatusColumn,
  og as sonner,
  tg as useEvent,
  eg as useEventAsync,
  uo as usePromise
};
//# sourceMappingURL=index.js.map
