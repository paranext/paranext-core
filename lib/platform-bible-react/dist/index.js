import { jsx as r, jsxs as l, Fragment as Zt } from "react/jsx-runtime";
import p, { useCallback as F, useMemo as L, useState as I, useRef as U, useLayoutEffect as dn, createContext as Cr, useContext as _r, useEffect as Et, forwardRef as Cn, Fragment as _n } from "react";
import { Slot as Ft } from "@radix-ui/react-slot";
import { cva as Ct } from "class-variance-authority";
import { clsx as Sr } from "clsx";
import { extendTailwindMerge as Tr } from "tailwind-merge";
import { Command as tt } from "cmdk";
import { X as Xe, Search as Sn, ChevronsLeft as cn, ChevronsRight as pn, ChevronLeft as Ie, ChevronRight as At, ArrowLeft as Rr, ArrowRight as Er, Circle as he, ChevronsUpDown as He, Check as _t, FilterIcon as Vr, ChevronDown as fe, ChevronUp as Dr, ArrowLeftIcon as Mr, ChevronLeftIcon as zr, ChevronRightIcon as Or, ArrowRightIcon as Ir, Copy as Ar, Filter as Pr, User as Br, Link as jr, CircleHelp as $r, Star as Fr, CircleCheckIcon as Gr, CircleXIcon as Lr, CircleHelpIcon as Xr, ArrowUpIcon as Hr, ArrowDownIcon as Ur, ArrowUpDownIcon as Yr, PanelLeft as qr, PanelRight as Kr, ScrollText as Jr, MenuIcon as Wr, Menu as Zr, EllipsisVertical as Qr, LoaderCircle as to } from "lucide-react";
import * as ut from "@radix-ui/react-dialog";
import * as Qt from "@radix-ui/react-popover";
import { getChaptersForBook as eo, formatScrRef as Jt, NumberFormat as no, formatBytes as ro, getCurrentLocale as oo, deepEqual as Ue, isString as Te, compareScrRefs as Ae, scrRefToBBBCCCVVV as Re, getLocalizeKeyForScrollGroupId as P } from "platform-bible-utils";
import * as Tn from "@radix-ui/react-label";
import * as te from "@radix-ui/react-radio-group";
import { useReactTable as Rn, getFilteredRowModel as ao, getSortedRowModel as En, getPaginationRowModel as so, getCoreRowModel as Vn, flexRender as Wt, getGroupedRowModel as io, getExpandedRowModel as wo } from "@tanstack/react-table";
import * as B from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as lo } from "@radix-ui/react-dropdown-menu";
import * as G from "@radix-ui/react-select";
import co from "markdown-to-jsx";
import * as Pe from "@radix-ui/react-checkbox";
import * as ge from "@radix-ui/react-toggle-group";
import * as Dn from "@radix-ui/react-toggle";
import * as Mn from "@radix-ui/react-separator";
import * as re from "@radix-ui/react-tooltip";
import * as et from "@radix-ui/react-tabs";
import * as j from "@radix-ui/react-menubar";
import { useHotkeys as po } from "react-hotkeys-hook";
import * as Gt from "@radix-ui/react-avatar";
import * as $ from "@radix-ui/react-context-menu";
import { Drawer as wt } from "vaul";
import * as Be from "@radix-ui/react-progress";
import { Toaster as mo } from "sonner";
import { toast as Ji } from "sonner";
import * as Kt from "@radix-ui/react-slider";
import * as je from "@radix-ui/react-switch";
const uo = Tr({ prefix: "tw-" });
function d(...t) {
  return uo(Sr(t));
}
const ho = Ct(
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
), z = p.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, i) => /* @__PURE__ */ r(o ? Ft : "button", { className: d(ho({ variant: e, size: n, className: t })), ref: i, ...a })
);
z.displayName = "Button";
const fo = "layoutDirection";
function Y() {
  const t = localStorage.getItem(fo);
  return t === "rtl" ? t : "ltr";
}
const go = ut.Portal, zn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ut.Overlay,
  {
    ref: n,
    className: d(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
zn.displayName = ut.Overlay.displayName;
const bo = p.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Y();
  return /* @__PURE__ */ l(go, { children: [
    /* @__PURE__ */ r(zn, {}),
    /* @__PURE__ */ l(
      ut.Content,
      {
        ref: o,
        className: d(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: a,
        children: [
          e,
          /* @__PURE__ */ l(
            ut.Close,
            {
              className: d(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Xe, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
bo.displayName = ut.Content.displayName;
const vo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ut.Title,
  {
    ref: n,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
vo.displayName = ut.Title.displayName;
const xo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ut.Description,
  {
    ref: n,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
xo.displayName = ut.Description.displayName;
const oe = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tt,
  {
    ref: n,
    className: d(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
oe.displayName = tt.displayName;
const ae = p.forwardRef(({ className: t, ...e }, n) => {
  const o = Y();
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(Sn, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      tt.Input,
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
ae.displayName = tt.Input.displayName;
const se = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tt.List,
  {
    ref: n,
    className: d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
se.displayName = tt.List.displayName;
const be = p.forwardRef((t, e) => /* @__PURE__ */ r(tt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
be.displayName = tt.Empty.displayName;
const Pt = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tt.Group,
  {
    ref: n,
    className: d(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Pt.displayName = tt.Group.displayName;
const On = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tt.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
On.displayName = tt.Separator.displayName;
const Vt = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tt.Item,
  {
    ref: n,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
Vt.displayName = tt.Item.displayName;
const ie = Qt.Root, we = Qt.Trigger, Lt = p.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...o }, a) => {
  const i = Y();
  return /* @__PURE__ */ r(Qt.Portal, { children: /* @__PURE__ */ r(
    Qt.Content,
    {
      ref: a,
      align: e,
      sideOffset: n,
      className: d(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-z-[250]",
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      dir: i
    }
  ) });
});
Lt.displayName = Qt.Content.displayName;
var yo = Object.defineProperty, No = (t, e, n) => e in t ? yo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, R = (t, e, n) => No(t, typeof e != "symbol" ? e + "" : e, n);
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
], Ye = [
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
], In = [
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
], mn = Mo();
function Xt(t, e = !0) {
  return e && (t = t.toUpperCase()), t in mn ? mn[t] : 0;
}
function qe(t) {
  return Xt(t) > 0;
}
function ko(t) {
  const e = typeof t == "string" ? Xt(t) : t;
  return e >= 40 && e <= 66;
}
function Co(t) {
  return (typeof t == "string" ? Xt(t) : t) <= 39;
}
function An(t) {
  return t <= 66;
}
function _o(t) {
  const e = typeof t == "string" ? Xt(t) : t;
  return jn(e) && !An(e);
}
function* So() {
  for (let t = 1; t <= Dt.length; t++) yield t;
}
const To = 1, Pn = Dt.length;
function Ro() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Ke(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Dt.length ? e : Dt[n];
}
function Bn(t) {
  return t <= 0 || t > Pn ? "******" : In[t - 1];
}
function Eo(t) {
  return Bn(Xt(t));
}
function jn(t) {
  const e = typeof t == "number" ? Ke(t) : t;
  return qe(e) && !Ye.includes(e);
}
function Vo(t) {
  const e = typeof t == "number" ? Ke(t) : t;
  return qe(e) && Ye.includes(e);
}
function Do(t) {
  return In[t - 1].includes("*obsolete*");
}
function Mo() {
  const t = {};
  for (let e = 0; e < Dt.length; e++)
    t[Dt[e]] = e + 1;
  return t;
}
const M = {
  allBookIds: Dt,
  nonCanonicalIds: Ye,
  bookIdToNumber: Xt,
  isBookIdValid: qe,
  isBookNT: ko,
  isBookOT: Co,
  isBookOTNT: An,
  isBookDC: _o,
  allBookNumbers: So,
  firstBook: To,
  lastBook: Pn,
  extraBooks: Ro,
  bookNumberToId: Ke,
  bookNumberToEnglishName: Bn,
  bookIdToEnglishName: Eo,
  isCanonical: jn,
  isExtraMaterial: Vo,
  isObsolete: Do
};
var pt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(pt || {});
const ot = class {
  // private versInfo: Versification;
  constructor(e) {
    if (R(this, "name"), R(this, "fullPath"), R(this, "isPresent"), R(this, "hasVerseSegments"), R(this, "isCustomized"), R(this, "baseVersification"), R(this, "scriptureBooks"), R(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = pt[e]) : (this._type = e, this.name = pt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
R(ot, "Original", new ot(pt.Original)), R(ot, "Septuagint", new ot(pt.Septuagint)), R(ot, "Vulgate", new ot(pt.Vulgate)), R(ot, "English", new ot(pt.English)), R(ot, "RussianProtestant", new ot(pt.RussianProtestant)), R(ot, "RussianOrthodox", new ot(pt.RussianOrthodox));
let Tt = ot;
function un(t, e) {
  const n = e[0];
  for (let o = 1; o < e.length; o++)
    t = t.split(e[o]).join(n);
  return t.split(n);
}
var $n = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))($n || {});
const Q = class D {
  constructor(e, n, o, a) {
    if (R(this, "firstChapter"), R(this, "lastChapter"), R(this, "lastVerse"), R(this, "hasSegmentsDefined"), R(this, "text"), R(this, "BBBCCCVVVS"), R(this, "longHashCode"), R(this, "versification"), R(this, "rtlMark", "‏"), R(this, "_bookNum", 0), R(this, "_chapterNum", 0), R(this, "_verseNum", 0), R(this, "_verse"), o == null && a == null)
      if (e != null && typeof e == "string") {
        const i = e, s = n != null && n instanceof Tt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (e != null && typeof e == "number") {
        const i = n != null && n instanceof Tt ? n : void 0;
        this.setEmpty(i), this._verseNum = e % D.chapterDigitShifter, this._chapterNum = Math.floor(
          e % D.bookDigitShifter / D.chapterDigitShifter
        ), this._bookNum = Math.floor(e / D.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof D) {
          const i = e;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (e == null) return;
          const i = e instanceof Tt ? e : D.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && o != null)
      if (typeof e == "string" && typeof n == "string" && typeof o == "string")
        this.setEmpty(a), this.updateInternal(e, n, o);
      else if (typeof e == "number" && typeof n == "number" && typeof o == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = o, this.versification = a ?? D.defaultVersification;
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
      return n = new D(e), { success: !0, verseRef: n };
    } catch (o) {
      if (o instanceof Yt)
        return n = new D(), { success: !1, verseRef: n };
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
    return e % D.bcvMaxValue * D.bookDigitShifter + (n >= 0 ? n % D.bcvMaxValue * D.chapterDigitShifter : 0) + (o >= 0 ? o % D.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: o, verseNum: a, verse: i, versificationStr: s } = e, w = i || a.toString();
    let m;
    return s && (m = new Tt(s)), n ? new D(n, o.toString(), w, m) : new D();
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
      if (n = n * 10 + +o - 0, n > D.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(D.verseRangeSeparator) || this._verse.includes(D.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return M.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = M.bookIdToNumber(e);
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
    const { success: n, vNum: o } = D.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = o, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = D.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > M.lastBook)
      throw new Yt(
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
    return this.validateVerse(D.verseRangeSeparators, D.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return D.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return D.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new Tt(pt[s]);
        } catch {
          throw new Yt("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Yt("Invalid reference : " + e);
    const o = n[1].split(":"), a = +o[0];
    if (o.length !== 2 || M.bookIdToNumber(n[0]) === 0 || !Number.isInteger(a) || a < 0 || !D.isVerseParseable(o[1]))
      throw new Yt("Invalid reference : " + e);
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
    return new D(this);
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
    return e instanceof D ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = D.verseRangeSeparators, o = D.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const a = [], i = un(this._verse, o);
    for (const s of i.map((w) => un(w, n))) {
      const w = this.clone();
      w.verse = s[0];
      const m = w.verseNum;
      if (a.push(w), s.length > 1) {
        const c = this.clone();
        if (c.verse = s[1], !e)
          for (let u = m + 1; u < c.verseNum; u++) {
            const g = new D(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || a.push(g);
          }
        a.push(c);
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
      const i = a.internalValid;
      if (i !== 0)
        return i;
      const s = a.BBBCCCVVV;
      if (o > s)
        return 3;
      if (o === s)
        return 4;
      o = s;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > M.lastBook ? 2 : (M.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = D.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, o) {
    this.bookNum = M.bookIdToNumber(e), this.chapter = n, this.verse = o;
  }
};
R(Q, "defaultVersification", Tt.English), R(Q, "verseRangeSeparator", "-"), R(Q, "verseSequenceIndicator", ","), R(Q, "verseRangeSeparators", [Q.verseRangeSeparator]), R(Q, "verseSequenceIndicators", [Q.verseSequenceIndicator]), R(Q, "chapterDigitShifter", 1e3), R(Q, "bookDigitShifter", Q.chapterDigitShifter * Q.chapterDigitShifter), R(Q, "bcvMaxValue", Q.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
R(Q, "ValidStatusType", $n);
class Yt extends Error {
}
const Fn = M.allBookIds.filter(
  (t) => !M.isObsolete(M.bookIdToNumber(t))
), at = Object.fromEntries(
  Fn.map((t) => [t, M.bookIdToEnglishName(t)])
), zo = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon",
  Extra: "Extra"
}, Ee = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Oo = [
  Ee.BOOK_ONLY,
  Ee.BOOK_CHAPTER,
  Ee.BOOK_CHAPTER_VERSE
];
function hn(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function mt(t) {
  return eo(M.bookIdToNumber(t));
}
function Io(t, e) {
  if (!t.trim() || e.length === 0) return;
  const n = Oo.reduce(
    (o, a) => {
      if (o) return o;
      const i = a.exec(t.trim());
      if (i) {
        const [s, w = void 0, m = void 0] = i.slice(1);
        let c;
        const u = s.toLowerCase(), g = e.filter((h) => at[h].toLowerCase().includes(u) || h.toLowerCase().includes(u));
        if (g.length === 1 && ([c] = g), !c && w && M.isBookIdValid(s)) {
          const h = s.toUpperCase();
          e.includes(h) && (c = h);
        }
        if (!c && w) {
          const f = ((b) => Object.keys(at).find(
            (_) => at[_].toLowerCase() === b.toLowerCase()
          ))(s);
          f && e.includes(f) && (c = f);
        }
        if (c) {
          let h = w ? parseInt(w, 10) : void 0;
          h && h > mt(c) && (h = Math.max(mt(c), 1));
          const f = m ? parseInt(m, 10) : void 0;
          return {
            book: c,
            chapterNum: h,
            verseNum: f
          };
        }
      }
    },
    void 0
  );
  if (n) return n;
}
function fn(t, e) {
  return `${t} ${at[t]}${e ? ` ${e}` : ""}`;
}
function Ao(t, e, n, o) {
  const a = F(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const m = e.indexOf(t.book);
      if (m > 0) {
        const c = e[m - 1], u = Math.max(mt(c), 1);
        o({
          book: c,
          chapterNum: u,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = F(() => {
    const m = mt(t.book);
    if (t.chapterNum < m)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c < e.length - 1) {
        const u = e[c + 1];
        o({
          book: u,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = F(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), w = F(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return L(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? cn : pn
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Ie : At
    },
    {
      onClick: w,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? At : Ie
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === mt(t.book) || mt(t.book) === -1) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? pn : cn
    }
  ], [
    t,
    e,
    n,
    a,
    s,
    w,
    i
  ]);
}
function gn({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r("div", { className: d("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: mt(t) }, (s, w) => w + 1).map((s) => /* @__PURE__ */ r(
      Vt,
      {
        value: `${t} ${at[t] || ""} ${s}`,
        onSelect: () => n(s),
        ref: o(s),
        className: d(
          "tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",
          {
            "tw-bg-primary tw-text-primary-foreground": t === e.book && s === e.chapterNum
          },
          {
            "tw-bg-muted/50 tw-text-muted-foreground/50": (a == null ? void 0 : a(s)) ?? !1
          }
        ),
        children: s
      },
      s
    )) }) });
}
function ni({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o
}) {
  const a = Y(), [i, s] = I(!1), [w, m] = I(""), [c, u] = I(""), [g, h] = I("books"), [f, b] = I(void 0), [_, k] = I(!1), S = U(void 0), x = U(void 0), V = U(void 0), A = U(void 0), W = U({}), nt = L(() => o ? o() : Fn, [o]), it = L(() => ({
    OT: nt.filter((O) => M.isBookOT(O)),
    NT: nt.filter((O) => M.isBookNT(O)),
    DC: nt.filter((O) => M.isBookDC(O)),
    Extra: nt.filter((O) => M.extraBooks().includes(O))
  }), [nt]), C = L(() => Object.values(it).flat(), [it]), v = L(() => {
    if (!c.trim()) return it;
    const N = c.toLowerCase().trim(), O = { OT: [], NT: [], DC: [], Extra: [] };
    return ["OT", "NT", "DC", "Extra"].forEach((Z) => {
      O[Z] = it[Z].filter((K) => at[K].toLowerCase().includes(N) || K.toLowerCase().includes(N));
    }), O;
  }, [it, c]), y = L(
    () => Io(c, C),
    [c, C]
  ), E = F(() => {
    y && (e({
      book: y.book,
      chapterNum: y.chapterNum ?? 1,
      verseNum: y.verseNum ?? 1
    }), s(!1), u(""), m(""));
  }, [e, y]), J = F(
    (N) => {
      if (mt(N) <= 1) {
        e({
          book: N,
          chapterNum: 1,
          verseNum: 1
        }), s(!1), u("");
        return;
      }
      b(N), h("chapters");
    },
    [e]
  ), Ot = F(
    (N) => {
      const O = g === "chapters" ? f : y == null ? void 0 : y.book;
      O && (e({
        book: O,
        chapterNum: N,
        verseNum: 1
      }), s(!1), h("books"), b(void 0), u(""));
    },
    [e, g, f, y]
  ), Ht = Ao(t, C, a, e), dt = F(() => {
    h("books"), b(void 0), setTimeout(() => {
      x.current && x.current.focus();
    }, 0);
  }, []), rt = F(
    (N) => {
      if (!N && g === "chapters") {
        dt();
        return;
      }
      s(N), N && (h("books"), b(void 0), u(""));
    },
    [g, dt]
  ), de = F(
    (N) => y ? !!y.chapterNum && !N.toString().includes(y.chapterNum.toString()) : !1,
    [y]
  ), T = L(() => Jt(t, "English"), [t]), q = F((N) => (O) => {
    W.current[N] = O;
  }, []), ct = F((N) => {
    (N.key === "Home" || N.key === "End") && N.stopPropagation();
  }, []), ht = F(
    (N) => {
      if (N.ctrlKey) return;
      const { isLetter: O, isDigit: H } = hn(N.key);
      if (g === "chapters") {
        if (N.key === "Backspace") {
          N.preventDefault(), N.stopPropagation(), dt();
          return;
        }
        if (O || H) {
          if (N.preventDefault(), N.stopPropagation(), h("books"), b(void 0), H && f) {
            const Z = at[f];
            u(`${Z} ${N.key}`);
          } else
            u(N.key);
          setTimeout(() => {
            x.current && x.current.focus();
          }, 0);
          return;
        }
      }
      if ((g === "chapters" || g === "books" && y) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(N.key)) {
        const Z = g === "chapters" ? f : y == null ? void 0 : y.book;
        if (!Z) return;
        const K = (() => {
          if (!w) return 1;
          const Ut = w.match(/(\d+)$/);
          return Ut ? parseInt(Ut[1], 10) : 0;
        })(), xt = mt(Z);
        if (!xt) return;
        let ft = K;
        const ln = 6;
        switch (N.key) {
          case "ArrowLeft":
            K !== 0 && (ft = K > 1 ? K - 1 : xt);
            break;
          case "ArrowRight":
            K !== 0 && (ft = K < xt ? K + 1 : 1);
            break;
          case "ArrowUp":
            ft = K === 0 ? xt : Math.max(1, K - ln);
            break;
          case "ArrowDown":
            ft = K === 0 ? 1 : Math.min(xt, K + ln);
            break;
          default:
            return;
        }
        ft !== K && (N.preventDefault(), N.stopPropagation(), m(fn(Z, ft)), setTimeout(() => {
          const Ut = W.current[ft];
          Ut && Ut.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [g, y, dt, f, w]
  ), vt = F((N) => {
    if (N.shiftKey || N.key === "Tab" || N.key === " ") return;
    const { isLetter: O, isDigit: H } = hn(N.key);
    (O || H) && (N.preventDefault(), u((Z) => Z + N.key), x.current.focus(), k(!1));
  }, []);
  return dn(() => {
    const N = setTimeout(() => {
      if (i && g === "books" && V.current && A.current) {
        const O = V.current, H = A.current, Z = H.offsetTop, K = O.clientHeight, xt = H.clientHeight, ft = Z - K / 2 + xt / 2;
        O.scrollTo({
          top: Math.max(0, ft),
          behavior: "smooth"
        }), m(fn(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(N);
    };
  }, [i, g, c, y, t.book]), dn(() => {
    if (g === "chapters" && f) {
      const N = f === t.book;
      setTimeout(() => {
        if (V.current)
          if (N) {
            const O = W.current[t.chapterNum];
            O && O.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            V.current.scrollTo({ top: 0 });
        S.current && S.current.focus();
      }, 0);
    }
  }, [g, f, y, t.book, t.chapterNum]), /* @__PURE__ */ l(ie, { open: i, onOpenChange: rt, children: [
    /* @__PURE__ */ r(we, { asChild: !0, children: /* @__PURE__ */ r(
      z,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": i,
        className: d(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: T })
      }
    ) }),
    /* @__PURE__ */ r(Lt, { forceMount: !0, className: "tw-z-[250] tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ l(
      oe,
      {
        ref: S,
        onKeyDown: ht,
        loop: !0,
        value: w,
        onValueChange: m,
        shouldFilter: !1,
        children: [
          g === "books" ? /* @__PURE__ */ l("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ r(
              ae,
              {
                ref: x,
                value: c,
                onValueChange: u,
                onKeyDown: ct,
                onFocus: () => k(!1)
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: Ht.map(({ onClick: N, disabled: O, title: H, icon: Z }) => /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  k(!0), N();
                },
                disabled: O,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: H,
                onKeyDown: vt,
                children: /* @__PURE__ */ r(Z, {})
              },
              H
            )) })
          ] }) : /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: dt,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: a === "ltr" ? /* @__PURE__ */ r(Rr, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Er, { className: "tw-h-4 tw-w-4" })
              }
            ),
            /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: at[f || ""] || "" })
          ] }),
          !_ && /* @__PURE__ */ l(se, { ref: V, children: [
            g === "books" && /* @__PURE__ */ l(Zt, { children: [
              !y && Object.entries(v).map(([N, O]) => {
                if (O.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses BookType as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Pt, { heading: zo[N], children: O.map((H) => /* @__PURE__ */ r(
                      "div",
                      {
                        className: d(
                          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
                          {
                            "tw-border-s-red-200": N.toLowerCase() === "ot",
                            "tw-border-s-purple-200": N.toLowerCase() === "nt",
                            "tw-border-s-indigo-200": N.toLowerCase() === "dc",
                            "tw-border-s-amber-200": N.toLowerCase() === "extra"
                          }
                        ),
                        children: /* @__PURE__ */ r(
                          Vt,
                          {
                            value: `${H} ${at[H]}`,
                            onSelect: () => J(H),
                            ref: H === t.book ? A : void 0,
                            className: "tw-ms-1 tw-px-2",
                            children: at[H]
                          }
                        )
                      },
                      H
                    )) }, N)
                  );
              }),
              y && /* @__PURE__ */ r(Pt, { children: /* @__PURE__ */ r(
                Vt,
                {
                  value: `${y.book} ${at[y.book]} ${y.chapterNum || ""}:${y.verseNum || ""})}`,
                  onSelect: E,
                  className: "tw-font-semibold tw-text-primary",
                  children: Jt({
                    book: y.book,
                    chapterNum: y.chapterNum ?? 1,
                    verseNum: y.verseNum ?? 1
                  })
                },
                "top-match"
              ) }),
              y && mt(y.book) > 1 && /* @__PURE__ */ l(Zt, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: at[y.book] }),
                /* @__PURE__ */ r(
                  gn,
                  {
                    bookId: y.book,
                    scrRef: t,
                    onChapterSelect: Ot,
                    setChapterRef: q,
                    isChapterDimmed: de,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            g === "chapters" && f && /* @__PURE__ */ r(
              gn,
              {
                bookId: f,
                scrRef: t,
                onChapterSelect: Ot,
                setChapterRef: q,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Po = Ct(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), X = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Tn.Root, { ref: n, className: d("pr-twp", Po(), t), ...e }));
X.displayName = Tn.Root.displayName;
const Je = p.forwardRef(({ className: t, ...e }, n) => {
  const o = Y();
  return /* @__PURE__ */ r(
    te.Root,
    {
      className: d("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
Je.displayName = te.Root.displayName;
const pe = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  te.Item,
  {
    ref: n,
    className: d(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(te.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(he, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
pe.displayName = te.Item.displayName;
function Bo(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function $e({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  value: i,
  onChange: s = () => {
  },
  getOptionLabel: w = Bo,
  icon: m = void 0,
  buttonPlaceholder: c = "",
  textPlaceholder: u = "",
  commandEmptyMessage: g = "No option found",
  buttonVariant: h = "outline",
  alignDropDown: f = "start",
  isDisabled: b = !1,
  ..._
}) {
  const [k, S] = I(!1);
  return /* @__PURE__ */ l(ie, { open: k, onOpenChange: S, ..._, children: [
    /* @__PURE__ */ r(we, { asChild: !0, children: /* @__PURE__ */ l(
      z,
      {
        variant: h,
        role: "combobox",
        "aria-expanded": k,
        id: t,
        className: d(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            m && /* @__PURE__ */ r("div", { className: "tw-pe-2", children: m }),
            /* @__PURE__ */ r("span", { className: d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: i ? w(i) : c })
          ] }),
          /* @__PURE__ */ r(He, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Lt,
      {
        align: f,
        className: d("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ l(oe, { children: [
          /* @__PURE__ */ r(ae, { placeholder: u, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(be, { children: g }),
          /* @__PURE__ */ r(se, { children: e.map((x) => /* @__PURE__ */ l(
            Vt,
            {
              value: w(x),
              onSelect: () => {
                s(x), S(!1);
              },
              children: [
                /* @__PURE__ */ r(
                  _t,
                  {
                    className: d("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !i || w(i) !== w(x)
                    })
                  }
                ),
                w(x)
              ]
            },
            w(x)
          )) })
        ] })
      }
    )
  ] });
}
function jo({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: i
}) {
  const s = L(
    () => Array.from({ length: i }, (c, u) => u + 1),
    [i]
  );
  return /* @__PURE__ */ l(Zt, { children: [
    /* @__PURE__ */ r(X, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      $e,
      {
        isDisabled: a,
        onChange: (c) => {
          n(c), c > e && o(c);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(X, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      $e,
      {
        isDisabled: a,
        onChange: (c) => {
          o(c), c < t && n(c);
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
var $o = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))($o || {});
const ri = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ve = (t, e) => t[e] ?? e;
function oi({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: w,
  handleSelectStartChapter: m,
  localizedStrings: c
}) {
  const u = Ve(c, "%webView_bookSelector_currentBook%"), g = Ve(c, "%webView_bookSelector_choose%"), h = Ve(c, "%webView_bookSelector_chooseBooks%"), [f, b] = I(
    "current book"
    /* CURRENT_BOOK */
  ), _ = (k) => {
    b(k), t(k);
  };
  return /* @__PURE__ */ r(
    Je,
    {
      className: "pr-twp tw-flex",
      value: f,
      onValueChange: (k) => _(k),
      children: /* @__PURE__ */ l("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(pe, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(X, { className: "tw-ms-1", children: u })
          ] }),
          /* @__PURE__ */ r(X, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            jo,
            {
              isDisabled: f === "choose books",
              handleSelectStartChapter: m,
              handleSelectEndChapter: s,
              chapterCount: a,
              startChapter: w,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(pe, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(X, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(X, { className: "tw-flex tw-items-center", children: o.map((k) => M.bookIdToEnglishName(k)).join(", ") }),
          /* @__PURE__ */ r(
            z,
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
const We = Cr(void 0);
function lt() {
  const t = _r(We);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const bt = Ct("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Gn = B.Trigger, Ln = B.Group, Fo = B.Portal, Go = B.Sub, Lo = B.RadioGroup;
function Ze({ variant: t = "default", ...e }) {
  const n = p.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(We.Provider, { value: n, children: /* @__PURE__ */ r(B.Root, { ...e }) });
}
const Xn = p.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = lt();
  return /* @__PURE__ */ l(
    B.SubTrigger,
    {
      ref: a,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        bt({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(At, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Xn.displayName = B.SubTrigger.displayName;
const Hn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  B.SubContent,
  {
    ref: n,
    className: d(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Hn.displayName = B.SubContent.displayName;
const ve = p.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const i = Y();
  return /* @__PURE__ */ r(B.Portal, { children: /* @__PURE__ */ r(
    B.Content,
    {
      ref: a,
      sideOffset: e,
      className: d(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: i, children: n })
    }
  ) });
});
ve.displayName = B.Content.displayName;
const Un = p.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Y(), i = lt();
  return /* @__PURE__ */ r(
    B.Item,
    {
      ref: o,
      className: d(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        bt({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
Un.displayName = B.Item.displayName;
const Qe = p.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = lt();
  return /* @__PURE__ */ l(
    B.CheckboxItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        bt({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(B.ItemIndicator, { children: /* @__PURE__ */ r(_t, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Qe.displayName = B.CheckboxItem.displayName;
const Yn = p.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = lt();
  return /* @__PURE__ */ l(
    B.RadioItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        bt({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(B.ItemIndicator, { children: /* @__PURE__ */ r(he, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Yn.displayName = B.RadioItem.displayName;
const tn = p.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  B.Label,
  {
    ref: o,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
tn.displayName = B.Label.displayName;
const xe = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  B.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
xe.displayName = B.Separator.displayName;
function Xo({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Xo.displayName = "DropdownMenuShortcut";
function Ho({ table: t }) {
  return /* @__PURE__ */ l(Ze, { children: [
    /* @__PURE__ */ r(lo, { asChild: !0, children: /* @__PURE__ */ l(z, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Vr, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ l(ve, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(tn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(xe, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        Qe,
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
const Bt = G.Root, Uo = G.Group, jt = G.Value, Yo = Ct(
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
), Mt = p.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const i = Y();
  return /* @__PURE__ */ l(
    G.Trigger,
    {
      className: d(Yo({ size: n, className: t })),
      ref: a,
      ...o,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ r(G.Icon, { asChild: !0, children: /* @__PURE__ */ r(fe, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Mt.displayName = G.Trigger.displayName;
const qn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.ScrollUpButton,
  {
    ref: n,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Dr, { className: "tw-h-4 tw-w-4" })
  }
));
qn.displayName = G.ScrollUpButton.displayName;
const Kn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.ScrollDownButton,
  {
    ref: n,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(fe, { className: "tw-h-4 tw-w-4" })
  }
));
Kn.displayName = G.ScrollDownButton.displayName;
const zt = p.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const i = Y();
  return /* @__PURE__ */ r(G.Portal, { children: /* @__PURE__ */ l(
    G.Content,
    {
      ref: a,
      className: d(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...o,
      children: [
        /* @__PURE__ */ r(qn, {}),
        /* @__PURE__ */ r(
          G.Viewport,
          {
            className: d(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ r(Kn, {})
      ]
    }
  ) });
});
zt.displayName = G.Content.displayName;
const qo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.Label,
  {
    ref: n,
    className: d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
qo.displayName = G.Label.displayName;
const st = p.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ l(
  G.Item,
  {
    ref: o,
    className: d(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(_t, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(G.ItemText, { children: e })
    ]
  }
));
st.displayName = G.Item.displayName;
const Ko = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ko.displayName = G.Separator.displayName;
function Jo({ table: t }) {
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
            /* @__PURE__ */ r(Mt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(jt, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(zt, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(st, { value: `${e}`, children: e }, e)) })
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
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Mr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(zr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(Or, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(Ir, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const bn = `
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
function Wo(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function ee(t, e) {
  const n = e ? `${bn}, ${e}` : bn;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Wo(o)
  );
}
const ye = p.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = p.useRef(null);
  p.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), p.useEffect(() => {
    const s = a.current;
    if (!s) return;
    const w = () => {
      requestAnimationFrame(() => {
        ee(s, '[tabindex]:not([tabindex="-1"])').forEach((u) => {
          u.setAttribute("tabindex", "-1");
        });
      });
    };
    w();
    const m = new MutationObserver(() => {
      w();
    });
    return m.observe(s, {
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
  const i = (s) => {
    const { current: w } = a;
    if (w) {
      if (s.key === "ArrowDown") {
        s.preventDefault(), ee(w)[0].focus();
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
      ref: a,
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
ye.displayName = "Table";
const Ne = p.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
  "thead",
  {
    ref: o,
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
Ne.displayName = "TableHeader";
const ke = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: d("[&_tr:last-child]:tw-border-0", t), ...e }));
ke.displayName = "TableBody";
const Zo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Zo.displayName = "TableFooter";
function Qo(t) {
  p.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? ee(t.current) : [], i = a.indexOf(document.activeElement), s = o.key === "ArrowRight" ? i + 1 : i - 1;
          s >= 0 && s < a.length && a[s].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", n), () => {
      e.removeEventListener("keydown", n);
    };
  }, [t]);
}
function ta(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function ea(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const kt = p.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, i) => {
  const s = p.useRef(null);
  p.useEffect(() => {
    typeof i == "function" ? i(s.current) : i && "current" in i && (i.current = s.current);
  }, [i]), Qo(s);
  const w = p.useMemo(
    () => s.current ? ee(s.current) : [],
    [s]
  ), m = p.useCallback(
    (u) => {
      const { current: g } = s;
      if (!g || !g.parentElement) return;
      const h = g.closest("table"), f = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        ee(h).filter(
          (k) => k.tagName === "TR"
        )
      ) : [], b = f.indexOf(g), _ = w.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (u.key === "ArrowDown" || u.key === "ArrowUp")
        u.preventDefault(), ea(f, b, u.key);
      else if (u.key === "ArrowLeft" || u.key === "ArrowRight")
        u.preventDefault(), ta(w, _, u.key);
      else if (u.key === "Escape") {
        u.preventDefault();
        const k = g.closest("table");
        k && k.focus();
      }
      e == null || e(u);
    },
    [s, w, e]
  ), c = p.useCallback(
    (u) => {
      o && (n == null || n(u));
    },
    [o, n]
  );
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: s,
      tabIndex: -1,
      onKeyDown: m,
      onFocus: c,
      className: d(
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
kt.displayName = "TableRow";
const ne = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
ne.displayName = "TableHead";
const $t = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
$t.displayName = "TableCell";
const na = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: d("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
na.displayName = "TableCaption";
function ra({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  }
}) {
  var k;
  const [w, m] = I([]), [c, u] = I([]), [g, h] = I({}), [f, b] = I({}), _ = Rn({
    data: e,
    columns: t,
    getCoreRowModel: Vn(),
    ...n && { getPaginationRowModel: so() },
    onSortingChange: m,
    getSortedRowModel: En(),
    onColumnFiltersChange: u,
    getFilteredRowModel: ao(),
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
    a && /* @__PURE__ */ r(Ho, { table: _ }),
    /* @__PURE__ */ l(ye, { stickyHeader: i, children: [
      /* @__PURE__ */ r(Ne, { stickyHeader: i, children: _.getHeaderGroups().map((S) => /* @__PURE__ */ r(kt, { children: S.headers.map((x) => /* @__PURE__ */ r(ne, { children: x.isPlaceholder ? void 0 : Wt(x.column.columnDef.header, x.getContext()) }, x.id)) }, S.id)) }),
      /* @__PURE__ */ r(ke, { children: (k = _.getRowModel().rows) != null && k.length ? _.getRowModel().rows.map((S) => /* @__PURE__ */ r(
        kt,
        {
          onClick: () => s(S, _),
          "data-state": S.getIsSelected() && "selected",
          children: S.getVisibleCells().map((x) => /* @__PURE__ */ r($t, { children: Wt(x.column.columnDef.cell, x.getContext()) }, x.id))
        },
        S.id
      )) : /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ r($t, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.nextPage(),
          disabled: !_.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Jo, { table: _ })
  ] });
}
function ai({ id: t, markdown: e, className: n, anchorTarget: o }) {
  const a = L(
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
  return /* @__PURE__ */ r("div", { id: t, className: d("pr-twp tw-prose", n), children: /* @__PURE__ */ r(co, { options: a, children: e }) });
}
const oa = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), vn = (t, e) => t[e] ?? e;
function aa({ errorDetails: t, handleCopyNotify: e, localizedStrings: n }) {
  const o = vn(n, "%webView_error_dump_header%"), a = vn(n, "%webView_error_dump_info_message%");
  function i() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
      /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
        /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: o }),
        /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: a })
      ] }),
      /* @__PURE__ */ r(z, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(Ar, {}) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
  ] });
}
const si = Object.freeze([
  ...oa,
  "%webView_error_dump_copied_message%"
]);
function ii({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a
}) {
  const [i, s] = I(!1), w = () => {
    s(!0), e && e();
  };
  return /* @__PURE__ */ l(ie, { onOpenChange: (c) => {
    c || s(!1);
  }, children: [
    /* @__PURE__ */ r(we, { asChild: !0, children: o }),
    /* @__PURE__ */ l(Lt, { className: d("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(X, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        aa,
        {
          errorDetails: t,
          handleCopyNotify: w,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var sa = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(sa || {});
function wi({ id: t, label: e, groups: n }) {
  const [o, a] = I(
    Object.fromEntries(
      n.map(
        (c, u) => c.itemType === 0 ? [u, []] : void 0
      ).filter((c) => !!c)
    )
  ), [i, s] = I({}), w = (c, u) => {
    const g = !o[c][u];
    a((f) => (f[c][u] = g, { ...f }));
    const h = n[c].items[u];
    h.onUpdate(h.id, g);
  }, m = (c, u) => {
    s((h) => (h[c] = u, { ...h }));
    const g = n[c].items.find((h) => h.id === u);
    g ? g.onUpdate(u) : console.error(`Could not find dropdown radio item with id '${u}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ l(Ze, { children: [
    /* @__PURE__ */ r(Gn, { asChild: !0, children: /* @__PURE__ */ l(z, { variant: "default", children: [
      /* @__PURE__ */ r(Pr, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(fe, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(ve, { children: n.map((c, u) => /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r(tn, { children: c.label }),
      /* @__PURE__ */ r(Ln, { children: c.itemType === 0 ? /* @__PURE__ */ r(Zt, { children: c.items.map((g, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Qe,
        {
          checked: o[u][h],
          onCheckedChange: () => w(u, h),
          children: g.label
        }
      ) }, g.id)) }) : /* @__PURE__ */ r(
        Lo,
        {
          value: i[u],
          onValueChange: (g) => m(u, g),
          children: c.items.map((g) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Yn, { value: g.id, children: g.label }) }, g.id))
        }
      ) }),
      /* @__PURE__ */ r(xe, {})
    ] }, c.label)) })
  ] }) });
}
function li({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: w
}) {
  const m = new no("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((u, g) => u + g, 0)), c = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ l(
    "div",
    {
      id: t,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: e }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(Br, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: m })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((u) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: u.toUpperCase() }, u)) }),
          o.length > 3 && /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              onClick: () => c(),
              className: "tw-text-xs tw-text-foreground tw-underline",
              children: [
                "+",
                o.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (a || s) && /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ l(
            z,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(jr, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ l(
            z,
            {
              onClick: () => w(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r($r, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function ia({ id: t, versionHistory: e }) {
  const [n, o] = I(!1), a = /* @__PURE__ */ new Date();
  function i(w) {
    const m = new Date(w), c = new Date(a.getTime() - m.getTime()), u = c.getUTCFullYear() - 1970, g = c.getUTCMonth(), h = c.getUTCDate() - 1;
    let f = "";
    return u > 0 ? f = `${u.toString()} year${u === 1 ? "" : "s"} ago` : g > 0 ? f = `${g.toString()} month${g === 1 ? "" : "s"} ago` : h === 0 ? f = "today" : f = `${h.toString()} day${h === 1 ? "" : "s"} ago`, f;
  }
  const s = Object.entries(e).sort((w, m) => m[0].localeCompare(w[0]));
  return /* @__PURE__ */ l("div", { className: "pr-twp", id: t, children: [
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
        onClick: () => o(!n),
        className: "tw-text-xs tw-text-foreground tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function di({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: i
}) {
  const s = L(() => ro(n), [n]), m = ((c) => {
    const u = new Intl.DisplayNames(oo(), { type: "language" });
    return c.map((g) => u.of(g));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(ia, { versionHistory: a }),
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
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: m.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const wa = Ct(
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
), me = p.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: d("pr-twp", wa({ variant: e }), t), ...n })
);
me.displayName = "Badge";
function la({
  entries: t,
  getEntriesCount: e = void 0,
  selected: n,
  onChange: o,
  placeholder: a,
  commandEmptyMessage: i = "No entries found",
  customSelectedText: s,
  isDisabled: w = !1,
  sortSelected: m = !1,
  icon: c = void 0,
  className: u = void 0
}) {
  const [g, h] = I(!1), f = F(
    (k) => {
      var x;
      const S = (x = t.find((V) => V.label === k)) == null ? void 0 : x.value;
      S && o(
        n.includes(S) ? n.filter((V) => V !== S) : [...n, S]
      );
    },
    [t, n, o]
  ), b = () => s || a, _ = L(() => {
    if (!m) return t;
    const k = t.filter((x) => x.starred).sort((x, V) => x.label.localeCompare(V.label)), S = t.filter((x) => !x.starred).sort((x, V) => {
      const A = n.includes(x.value), W = n.includes(V.value);
      return A && !W ? -1 : !A && W ? 1 : x.label.localeCompare(V.label);
    });
    return [...k, ...S];
  }, [t, n, m]);
  return /* @__PURE__ */ r("div", { className: u, children: /* @__PURE__ */ l(ie, { open: g, onOpenChange: h, children: [
    /* @__PURE__ */ r(we, { asChild: !0, children: /* @__PURE__ */ l(
      z,
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
          /* @__PURE__ */ r(He, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Lt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ l(oe, { children: [
      /* @__PURE__ */ r(ae, { placeholder: `Search ${a.toLowerCase()}...` }),
      /* @__PURE__ */ l(se, { children: [
        /* @__PURE__ */ r(be, { children: i }),
        /* @__PURE__ */ r(Pt, { children: _.map((k) => {
          const S = e ? e(k) : void 0;
          return /* @__PURE__ */ l(
            Vt,
            {
              value: k.label,
              onSelect: f,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                  _t,
                  {
                    className: d(
                      "tw-h-4 tw-w-4",
                      n.includes(k.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ r("div", { className: "tw-w-4", children: k.starred && /* @__PURE__ */ r(Fr, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: k.label }),
                e && /* @__PURE__ */ r("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: S })
              ]
            },
            k.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function ci({
  entries: t,
  getEntriesCount: e,
  selected: n,
  onChange: o,
  placeholder: a,
  commandEmptyMessage: i,
  customSelectedText: s,
  isDisabled: w,
  sortSelected: m,
  icon: c,
  className: u,
  badgesPlaceholder: g
}) {
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      la,
      {
        entries: t,
        getEntriesCount: e,
        selected: n,
        onChange: o,
        placeholder: a,
        commandEmptyMessage: i,
        customSelectedText: s,
        isDisabled: w,
        sortSelected: m,
        icon: c,
        className: u
      }
    ),
    n.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((h) => {
      var f;
      return /* @__PURE__ */ l(me, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          z,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => o(n.filter((b) => b !== h)),
            children: /* @__PURE__ */ r(Xe, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (f = t.find((b) => b.value === h)) == null ? void 0 : f.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(X, { children: g })
  ] });
}
function da({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const o = n["%webView_inventory_occurrences_table_header_reference%"], a = n["%webView_inventory_occurrences_table_header_occurrence%"], i = L(() => {
    const s = [];
    return t.forEach((w) => {
      s.some((m) => Ue(m, w)) || s.push(w);
    }), s;
  }, [t]);
  return /* @__PURE__ */ l(ye, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Ne, { stickyHeader: !0, children: /* @__PURE__ */ l(kt, { children: [
      /* @__PURE__ */ r(ne, { children: o }),
      /* @__PURE__ */ r(ne, { children: a })
    ] }) }),
    /* @__PURE__ */ r(ke, { children: i.length > 0 && i.map((s) => /* @__PURE__ */ l(
      kt,
      {
        onClick: () => {
          e(s.reference);
        },
        children: [
          /* @__PURE__ */ r($t, { children: `${M.bookIdToEnglishName(s.reference.book)} ${s.reference.chapterNum}:${s.reference.verseNum}` }),
          /* @__PURE__ */ r($t, { children: s.text })
        ]
      },
      `${s.reference.book} ${s.reference.chapterNum}:${s.reference.verseNum}-${s.text}`
    )) })
  ] });
}
const en = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Pe.Root,
  {
    ref: n,
    className: d(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      Pe.Indicator,
      {
        className: d("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(_t, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
en.displayName = Pe.Root.displayName;
const le = p.forwardRef(
  ({ className: t, type: e, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: d(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: o,
      ...n
    }
  )
);
le.displayName = "Input";
const Jn = Ct(
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
), ca = p.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  Dn.Root,
  {
    ref: a,
    className: d(Jn({ variant: e, size: n, className: t })),
    ...o
  }
));
ca.displayName = Dn.Root.displayName;
const Wn = p.createContext({
  size: "default",
  variant: "default"
}), Zn = p.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, i) => {
  const s = Y();
  return /* @__PURE__ */ r(
    ge.Root,
    {
      ref: i,
      className: d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: s,
      children: /* @__PURE__ */ r(
        Wn.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
Zn.displayName = ge.Root.displayName;
const ce = p.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, i) => {
  const s = p.useContext(Wn);
  return /* @__PURE__ */ r(
    ge.Item,
    {
      ref: i,
      className: d(
        Jn({
          variant: s.variant || n,
          size: s.size || o
        }),
        t
      ),
      ...a,
      children: e
    }
  );
});
ce.displayName = ge.Item.displayName;
const Ce = (t) => t === "asc" ? /* @__PURE__ */ r(Hr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(Ur, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Yr, { className: "tw-ms-2 tw-h-4 tw-w-4" }), pi = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ l(z, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    Ce(e.getIsSorted())
  ] })
}), pa = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ l(z, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    Ce(n.getIsSorted())
  ] })
}), mi = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ l(z, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    Ce(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), De = (t, e, n, o, a, i) => {
  let s = [...n];
  t.forEach((m) => {
    e === "approved" ? s.includes(m) || s.push(m) : s = s.filter((c) => c !== m);
  }), o(s);
  let w = [...a];
  t.forEach((m) => {
    e === "unapproved" ? w.includes(m) || w.push(m) : w = w.filter((c) => c !== m);
  }), i(w);
}, ui = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ l(z, { variant: "ghost", onClick: () => i.toggleSorting(void 0), children: [
    t,
    Ce(i.getIsSorted())
  ] }) }),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), w = i.getValue("item");
    return /* @__PURE__ */ l(Zn, { value: s, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
        ce,
        {
          onClick: (m) => {
            m.stopPropagation(), De(
              [w],
              "approved",
              e,
              n,
              o,
              a
            );
          },
          value: "approved",
          children: /* @__PURE__ */ r(Gr, {})
        }
      ),
      /* @__PURE__ */ r(
        ce,
        {
          onClick: (m) => {
            m.stopPropagation(), De(
              [w],
              "unapproved",
              e,
              n,
              o,
              a
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ r(Lr, {})
        }
      ),
      /* @__PURE__ */ r(
        ce,
        {
          onClick: (m) => {
            m.stopPropagation(), De(
              [w],
              "unknown",
              e,
              n,
              o,
              a
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(Xr, {})
        }
      )
    ] });
  }
}), hi = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), fi = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, gi = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, ma = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", bi = Object.freeze([
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
]), ua = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, ha = (t, e, n) => {
  const o = [];
  return t.forEach((a) => {
    const i = o.find(
      (s) => Ue(
        s.items,
        Te(a.inventoryText) ? [a.inventoryText] : a.inventoryText
      )
    );
    if (i)
      i.count += 1, i.occurrences.push({
        reference: a.verseRef,
        text: a.verse
      });
    else {
      const s = {
        items: Te(a.inventoryText) ? [a.inventoryText] : a.inventoryText,
        count: 1,
        status: ma(
          Te(a.inventoryText) ? a.inventoryText : a.inventoryText[0],
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
      o.push(s);
    }
  }), o;
}, gt = (t, e) => t[e] ?? e;
function vi({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: i,
  scope: s,
  onScopeChange: w,
  columns: m
}) {
  const c = gt(n, "%webView_inventory_all%"), u = gt(n, "%webView_inventory_approved%"), g = gt(n, "%webView_inventory_unapproved%"), h = gt(n, "%webView_inventory_unknown%"), f = gt(n, "%webView_inventory_scope_currentBook%"), b = gt(n, "%webView_inventory_scope_chapter%"), _ = gt(n, "%webView_inventory_scope_verse%"), k = gt(n, "%webView_inventory_filter_text%"), S = gt(
    n,
    "%webView_inventory_show_additional_items%"
  ), [x, V] = I(!1), [A, W] = I("all"), [nt, it] = I(""), [C, v] = I([]), y = L(() => t.length === 0 ? [] : ha(t, a, i), [t, a, i]), E = L(() => {
    if (x) return y;
    const T = [];
    return y.forEach((q) => {
      const ct = q.items[0], ht = T.find(
        (vt) => vt.items[0] === ct
      );
      ht ? (ht.count += q.count, ht.occurrences = ht.occurrences.concat(q.occurrences)) : T.push({
        items: [ct],
        count: q.count,
        occurrences: q.occurrences,
        status: q.status
      });
    }), T;
  }, [x, y]), J = L(() => ua(E, A, nt), [E, A, nt]), Ot = L(() => {
    var ct, ht;
    if (!x) return m;
    const T = (ct = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ct.length;
    if (!T) return m;
    const q = [];
    for (let vt = 0; vt < T; vt++)
      q.push(
        pa(
          ((ht = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ht[vt]) || "Additional Item",
          vt + 1
        )
      );
    return [...q, ...m];
  }, [o == null ? void 0 : o.tableHeaders, m, x]);
  Et(() => {
    J.length === 0 ? v([]) : J.length === 1 && v(J[0].items);
  }, [J]);
  const Ht = (T, q) => {
    q.setRowSelection(() => {
      const ct = {};
      return ct[T.index] = !0, ct;
    }), v(T.original.items);
  }, dt = (T) => {
    if (T === "book" || T === "chapter" || T === "verse")
      w(T);
    else
      throw new Error(`Invalid scope value: ${T}`);
  }, rt = (T) => {
    if (T === "all" || T === "approved" || T === "unapproved" || T === "unknown")
      W(T);
    else
      throw new Error(`Invalid status filter value: ${T}`);
  }, de = L(() => {
    if (E.length === 0 || C.length === 0) return [];
    const T = E.filter((q) => Ue(
      x ? q.items : [q.items[0]],
      C
    ));
    if (T.length > 1) throw new Error("Selected item is not unique");
    return T.length === 0 ? [] : T[0].occurrences;
  }, [C, x, E]);
  return /* @__PURE__ */ l("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ l(
        Bt,
        {
          onValueChange: (T) => rt(T),
          defaultValue: A,
          children: [
            /* @__PURE__ */ r(Mt, { className: "tw-m-1", children: /* @__PURE__ */ r(jt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ l(zt, { children: [
              /* @__PURE__ */ r(st, { value: "all", children: c }),
              /* @__PURE__ */ r(st, { value: "approved", children: u }),
              /* @__PURE__ */ r(st, { value: "unapproved", children: g }),
              /* @__PURE__ */ r(st, { value: "unknown", children: h })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l(Bt, { onValueChange: (T) => dt(T), defaultValue: s, children: [
        /* @__PURE__ */ r(Mt, { className: "tw-m-1", children: /* @__PURE__ */ r(jt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ l(zt, { children: [
          /* @__PURE__ */ r(st, { value: "book", children: f }),
          /* @__PURE__ */ r(st, { value: "chapter", children: b }),
          /* @__PURE__ */ r(st, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ r(
        le,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: k,
          value: nt,
          onChange: (T) => {
            it(T.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ l("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          en,
          {
            className: "tw-m-1",
            checked: x,
            onCheckedChange: (T) => {
              V(T);
            }
          }
        ),
        /* @__PURE__ */ r(X, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? S })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      ra,
      {
        columns: Ot,
        data: J,
        onRowClickHandler: Ht,
        stickyHeader: !0
      }
    ) }),
    de.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      da,
      {
        occurrenceData: de,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const nn = p.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Mn.Root,
  {
    ref: a,
    decorative: n,
    orientation: e,
    className: d(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...o
  }
));
nn.displayName = Mn.Root.displayName;
function xn({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const rn = re.Provider, on = re.Root, an = re.Trigger, _e = p.forwardRef(({ className: t, sideOffset: e = 4, ...n }, o) => /* @__PURE__ */ r(
  re.Content,
  {
    ref: o,
    sideOffset: e,
    className: d(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
_e.displayName = re.Content.displayName;
const fa = "16rem", ga = "3rem", Qn = p.createContext(void 0);
function Se() {
  const t = p.useContext(Qn);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const tr = p.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: o,
    style: a,
    children: i,
    side: s = "primary",
    ...w
  }, m) => {
    const [c, u] = p.useState(t), g = e ?? c, h = p.useCallback(
      (V) => {
        const A = typeof V == "function" ? V(g) : V;
        n ? n(A) : u(A);
      },
      [n, g]
    ), f = p.useCallback(() => h((V) => !V), [h]), b = g ? "expanded" : "collapsed", S = Y() === "ltr" ? s : s === "primary" ? "secondary" : "primary", x = p.useMemo(
      () => ({
        state: b,
        open: g,
        setOpen: h,
        toggleSidebar: f,
        side: S
      }),
      [b, g, h, f, S]
    );
    return /* @__PURE__ */ r(Qn.Provider, { value: x, children: /* @__PURE__ */ r(rn, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": fa,
            "--sidebar-width-icon": ga,
            ...a
          }
        ),
        className: d(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          o
        ),
        ref: m,
        ...w,
        children: i
      }
    ) }) });
  }
);
tr.displayName = "SidebarProvider";
const er = p.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, i) => {
  const s = Se();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: d(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: i,
      ...a,
      children: o
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
er.displayName = "Sidebar";
const ba = p.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = Se();
  return /* @__PURE__ */ l(
    z,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: d("tw-h-7 tw-w-7", t),
      onClick: (i) => {
        e == null || e(i), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(qr, {}) : /* @__PURE__ */ r(Kr, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
ba.displayName = "SidebarTrigger";
const va = p.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = Se();
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
va.displayName = "SidebarRail";
const nr = p.forwardRef(
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
nr.displayName = "SidebarInset";
const xa = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  le,
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
xa.displayName = "SidebarInput";
const ya = p.forwardRef(
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
ya.displayName = "SidebarHeader";
const Na = p.forwardRef(
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
Na.displayName = "SidebarFooter";
const ka = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nn,
  {
    ref: n,
    "data-sidebar": "separator",
    className: d("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
ka.displayName = "SidebarSeparator";
const rr = p.forwardRef(
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
rr.displayName = "SidebarContent";
const Fe = p.forwardRef(
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
Fe.displayName = "SidebarGroup";
const Ge = p.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ft : "div",
  {
    ref: o,
    "data-sidebar": "group-label",
    className: d(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
Ge.displayName = "SidebarGroupLabel";
const Ca = p.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? Ft : "button",
  {
    ref: o,
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
Ca.displayName = "SidebarGroupAction";
const Le = p.forwardRef(
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
Le.displayName = "SidebarGroupContent";
const or = p.forwardRef(
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
or.displayName = "SidebarMenu";
const ar = p.forwardRef(
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
ar.displayName = "SidebarMenuItem";
const _a = Ct(
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
), sr = p.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: i,
    ...s
  }, w) => {
    const m = t ? Ft : "button", { state: c } = Se(), u = /* @__PURE__ */ r(
      m,
      {
        ref: w,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: d(_a({ variant: n, size: o }), i),
        ...s
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ l(on, { children: [
      /* @__PURE__ */ r(an, { asChild: !0, children: u }),
      /* @__PURE__ */ r(_e, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : u;
  }
);
sr.displayName = "SidebarMenuButton";
const Sa = p.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? Ft : "button",
  {
    ref: a,
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
    ...o
  }
));
Sa.displayName = "SidebarMenuAction";
const Ta = p.forwardRef(
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
Ta.displayName = "SidebarMenuBadge";
const Ra = p.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = p.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(xn, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          xn,
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
Ra.displayName = "SidebarMenuSkeleton";
const Ea = p.forwardRef(
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
Ea.displayName = "SidebarMenuSub";
const Va = p.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Va.displayName = "SidebarMenuSubItem";
const Da = p.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, i) => /* @__PURE__ */ r(
  t ? Ft : "a",
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
      o
    ),
    ...a
  }
));
Da.displayName = "SidebarMenuSubButton";
function Ma({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: w,
  className: m
}) {
  const c = F(
    (h, f) => {
      o(h, f);
    },
    [o]
  ), u = F(
    (h) => {
      const f = n.find((b) => b.projectId === h);
      return f ? f.projectName : h;
    },
    [n]
  ), g = F(
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    er,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: d("tw-w-96 tw-gap-2 tw-overflow-y-auto", m),
      children: /* @__PURE__ */ l(rr, { children: [
        /* @__PURE__ */ l(Fe, { children: [
          /* @__PURE__ */ r(Ge, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(Le, { children: /* @__PURE__ */ r(or, { children: Object.entries(e).map(([h, f]) => /* @__PURE__ */ r(ar, { children: /* @__PURE__ */ r(
            sr,
            {
              onClick: () => c(h),
              isActive: g(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: f })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ l(Fe, { children: [
          /* @__PURE__ */ r(Ge, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(Le, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            $e,
            {
              buttonVariant: "ghost",
              buttonClassName: d("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: u,
              buttonPlaceholder: w,
              onChange: (h) => {
                const f = u(h);
                c(f, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Jr, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const sn = Cn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: i = !1 }, s) => {
    const w = Y();
    return /* @__PURE__ */ l("div", { className: d("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        Sn,
        {
          className: d(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": w === "rtl" },
            { "tw-left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        le,
        {
          ref: s,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (m) => e(m.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ l(
        z,
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
            /* @__PURE__ */ r(Xe, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
sn.displayName = "SearchBar";
function xi({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: w,
  extensionsSidebarGroupLabel: m,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: u
}) {
  return /* @__PURE__ */ l("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      sn,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: w,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ l(
      tr,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Ma,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: m,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: u
            }
          ),
          /* @__PURE__ */ r(nr, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const yt = "scrBook", za = "scrRef", Rt = "source", Oa = "details", Ia = "Scripture Reference", Aa = "Scripture Book", ir = "Type", Pa = "Details";
function Ba(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: yt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Ia,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? M.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === yt ? Jt(a.start) : void 0;
      },
      getGroupingValue: (o) => M.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Ae(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Jt(o.start),
      id: za,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Jt(a.start);
      },
      sortingFn: (o, a) => Ae(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: Rt,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? ir : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Oa,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Pa,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const ja = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Ae(t.start, t.end) === 0 ? `${Re(t.start)}+${e}` : `${Re(t.start)}+${e}-${Re(t.end)}+${n}`;
}, yn = (t) => `${ja({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function yi({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: w
}) {
  const [m, c] = I([]), [u, g] = I([{ id: yt, desc: !1 }]), [h, f] = I({}), b = L(
    () => t.flatMap((C) => C.data.map((v) => ({
      ...v,
      source: C.source
    }))),
    [t]
  ), _ = L(
    () => Ba(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [o, i, s, n]
  );
  Et(() => {
    m.includes(Rt) ? g([
      { id: Rt, desc: !1 },
      { id: yt, desc: !1 }
    ]) : g([{ id: yt, desc: !1 }]);
  }, [m]);
  const k = Rn({
    data: b,
    columns: _,
    state: {
      grouping: m,
      sorting: u,
      rowSelection: h
    },
    onGroupingChange: c,
    onSortingChange: g,
    onRowSelectionChange: f,
    getExpandedRowModel: wo(),
    getGroupedRowModel: io(),
    getCoreRowModel: Vn(),
    getSortedRowModel: En(),
    getRowId: yn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Et(() => {
    if (w) {
      const C = k.getSelectedRowModel().rowsById, v = Object.keys(C);
      if (v.length === 1) {
        const y = b.find((E) => yn(E) === v[0]) || void 0;
        y && w(y);
      }
    }
  }, [h, b, w, k]);
  const S = a ?? Aa, x = i ?? ir, V = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${S}`, value: [yt] },
    { label: `Group by ${x}`, value: [Rt] },
    {
      label: `Group by ${S} and ${x}`,
      value: [yt, Rt]
    },
    {
      label: `Group by ${x} and ${S}`,
      value: [Rt, yt]
    }
  ], A = (C) => {
    c(JSON.parse(C));
  }, W = (C, v) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(v);
  }, nt = (C, v) => C.getIsGrouped() ? "" : d("banded-row", v % 2 === 0 ? "even" : "odd"), it = (C, v, y) => {
    if (!((C == null ? void 0 : C.length) === 0 || v.depth < y.column.getGroupedIndex())) {
      if (v.getIsGrouped())
        switch (v.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (v.depth) {
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
        value: JSON.stringify(m),
        onValueChange: (C) => {
          A(C);
        },
        children: [
          /* @__PURE__ */ r(Mt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(jt, {}) }),
          /* @__PURE__ */ r(zt, { position: "item-aligned", children: /* @__PURE__ */ r(Uo, { children: V.map((C) => /* @__PURE__ */ r(st, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ l(ye, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Ne, { children: k.getHeaderGroups().map((C) => /* @__PURE__ */ r(kt, { children: C.headers.filter((v) => v.column.columnDef.header).map((v) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(ne, { colSpan: v.colSpan, className: "top-0 tw-sticky", children: v.isPlaceholder ? void 0 : /* @__PURE__ */ l("div", { children: [
          v.column.getCanGroup() ? /* @__PURE__ */ r(
            z,
            {
              variant: "ghost",
              title: `Toggle grouping by ${v.column.columnDef.header}`,
              onClick: v.column.getToggleGroupingHandler(),
              type: "button",
              children: v.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Wt(v.column.columnDef.header, v.getContext())
        ] }) }, v.id)
      )) }, C.id)) }),
      /* @__PURE__ */ r(ke, { children: k.getRowModel().rows.map((C, v) => {
        const y = Y();
        return /* @__PURE__ */ r(
          kt,
          {
            "data-state": C.getIsSelected() ? "selected" : "",
            className: d(nt(C, v)),
            onClick: (E) => W(C, E),
            children: C.getVisibleCells().map((E) => {
              if (!(E.getIsPlaceholder() || E.column.columnDef.enableGrouping && !E.getIsGrouped() && (E.column.columnDef.id !== Rt || !n)))
                return /* @__PURE__ */ r(
                  $t,
                  {
                    className: d(
                      E.column.columnDef.id,
                      "tw-p-[1px]",
                      it(m, C, E)
                    ),
                    children: E.getIsGrouped() ? /* @__PURE__ */ l(
                      z,
                      {
                        variant: "link",
                        onClick: C.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          C.getIsExpanded() && /* @__PURE__ */ r(fe, {}),
                          !C.getIsExpanded() && (y === "ltr" ? /* @__PURE__ */ r(At, {}) : /* @__PURE__ */ r(Ie, {})),
                          " ",
                          Wt(E.column.columnDef.cell, E.getContext()),
                          " (",
                          C.subRows.length,
                          ")"
                        ]
                      }
                    ) : Wt(E.column.columnDef.cell, E.getContext())
                  },
                  E.id
                );
            })
          },
          C.id
        );
      }) })
    ] })
  ] });
}
var Nt = /* @__PURE__ */ ((t) => (t.OT = "OT", t.NT = "NT", t.DC = "DC", t.Extra = "Extra", t))(Nt || {});
const $a = (t, e, n, o, a) => {
  switch (t) {
    case "OT":
      return e ?? "Old Testament";
    case "NT":
      return n ?? "New Testament";
    case "DC":
      return o ?? "Deuterocanon";
    case "Extra":
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Fa = (t, e, n, o, a) => {
  switch (t) {
    case "OT":
      return e ?? "OT";
    case "NT":
      return n ?? "NT";
    case "DC":
      return o ?? "DC";
    case "Extra":
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, It = (t) => {
  if (M.isBookOT(t)) return "OT";
  if (M.isBookNT(t)) return "NT";
  if (M.isBookDC(t)) return "DC";
  if (M.isExtraMaterial(t)) return "Extra";
  throw new Error(`Unknown section for book: ${t}`);
}, wn = (t, e) => t.filter((n) => {
  try {
    return It(n) === e;
  } catch {
    return !1;
  }
}), wr = (t, e, n) => wn(t, e).every((o) => n.includes(o));
function Ga({
  bookId: t,
  selectedBookIds: e,
  toggleBook: n,
  lastKeyEventShiftKey: o,
  localizedBookNames: a
}) {
  var w, m;
  const i = U(!1), s = U();
  return /* @__PURE__ */ l(
    Vt,
    {
      value: t,
      className: "tw-flex tw-items-center",
      onSelect: () => {
        i.current || (n(t, o.current), o.current = !1), s.current && clearTimeout(s.current), s.current = setTimeout(() => {
          i.current = !1;
        }, 100);
      },
      onMouseDown: (c) => {
        c.preventDefault(), i.current = !0, n(t, c.shiftKey);
      },
      role: "option",
      "aria-selected": e.includes(t),
      "aria-label": `${M.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
      children: [
        /* @__PURE__ */ r(
          _t,
          {
            className: d(
              "tw-me-2 tw-h-4 tw-w-4",
              e.includes(t) ? "tw-opacity-100" : "tw-opacity-0"
            )
          }
        ),
        /* @__PURE__ */ r(
          "span",
          {
            className: d(
              "tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-border-s-red-200": It(t) === Nt.OT,
                "tw-border-s-purple-200": It(t) === Nt.NT,
                "tw-border-s-indigo-200": It(t) === Nt.DC,
                "tw-border-s-yellow-200": It(t) === Nt.Extra
              }
            ),
            children: a && ((w = a.get(t)) == null ? void 0 : w.localizedName) || M.bookIdToEnglishName(t)
          }
        ),
        /* @__PURE__ */ r("span", { className: "tw-ml-2 tw-text-xs tw-text-muted-foreground", children: a && ((m = a.get(t)) == null ? void 0 : m.localizedId) || t.toLocaleUpperCase() })
      ]
    },
    t
  );
}
function La({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const i = wn(e, t).length === 0, s = a["%scripture_section_ot_short%"], w = a["%scripture_section_nt_short%"], m = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    z,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: d(
        wr(e, t, n) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: Fa(
        t,
        s,
        w,
        m,
        c
      )
    }
  );
}
const Nn = 5, Me = 6;
function Xa({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], w = o["%webView_book_selector_search_books%"], m = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], u = o["%webView_book_selector_no_book_found%"], g = o["%webView_book_selector_more%"], h = o["%scripture_section_ot_long%"], f = o["%scripture_section_nt_long%"], b = o["%scripture_section_dc_long%"], _ = o["%scripture_section_extra_long%"], [k, S] = I(!1), x = U(void 0), V = U(!1);
  if (t.length !== M.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const A = L(() => M.allBookIds.filter(
    (v, y) => t[y] === "1" && !M.isObsolete(M.bookIdToNumber(v))
  ), [t]), W = F(
    (v, y = !1) => {
      if (!y || !x.current) {
        n(
          e.includes(v) ? e.filter((rt) => rt !== v) : [...e, v]
        ), x.current = v;
        return;
      }
      const E = A.findIndex((rt) => rt === x.current), J = A.findIndex((rt) => rt === v);
      if (E === -1 || J === -1) return;
      const [Ot, Ht] = [
        Math.min(E, J),
        Math.max(E, J)
      ], dt = A.slice(Ot, Ht + 1).map((rt) => rt);
      n(
        e.includes(v) ? e.filter((rt) => !dt.includes(rt)) : [.../* @__PURE__ */ new Set([...e, ...dt])]
      );
    },
    [e, n, A]
  ), nt = F(
    (v) => {
      const y = wn(A, v).map((E) => E);
      n(
        wr(A, v, e) ? e.filter((E) => !y.includes(E)) : [.../* @__PURE__ */ new Set([...e, ...y])]
      );
    },
    [e, n, A]
  ), it = () => {
    n(A.map((v) => v));
  }, C = () => {
    n([]);
  };
  return /* @__PURE__ */ l("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(Nt).map((v) => /* @__PURE__ */ r(
      La,
      {
        section: v,
        availableBookIds: A,
        selectedBookIds: e,
        onToggle: nt,
        localizedStrings: o
      },
      v
    )) }),
    /* @__PURE__ */ l(ie, { open: k, onOpenChange: S, children: [
      /* @__PURE__ */ r(we, { asChild: !0, children: /* @__PURE__ */ l(
        z,
        {
          variant: "outline",
          role: "combobox",
          "aria-expanded": k,
          className: "tw-max-w-64 tw-justify-between",
          children: [
            e.length > 0 ? `${i}: ${e.length}` : s,
            /* @__PURE__ */ r(He, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ r(Lt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ l(
        oe,
        {
          onKeyDown: (v) => {
            v.key === "Enter" && (V.current = v.shiftKey);
          },
          children: [
            /* @__PURE__ */ r(ae, { placeholder: w }),
            /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
              /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: it, children: m }),
              /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: C, children: c })
            ] }),
            /* @__PURE__ */ l(se, { children: [
              /* @__PURE__ */ r(be, { children: u }),
              Object.values(Nt).map((v, y) => {
                const E = A.filter(
                  (J) => It(J) === v
                );
                if (E.length !== 0)
                  return /* @__PURE__ */ l(_n, { children: [
                    /* @__PURE__ */ r(
                      Pt,
                      {
                        heading: $a(
                          v,
                          h,
                          f,
                          b,
                          _
                        ),
                        children: E.map((J) => /* @__PURE__ */ r(
                          Ga,
                          {
                            bookId: J,
                            selectedBookIds: e,
                            toggleBook: W,
                            lastKeyEventShiftKey: V,
                            localizedBookNames: a
                          },
                          J
                        ))
                      }
                    ),
                    y < Object.values(Nt).length - 1 && /* @__PURE__ */ r(On, {})
                  ] }, v);
              })
            ] })
          ]
        }
      ) })
    ] }),
    e.length > 0 && /* @__PURE__ */ l("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      e.slice(
        0,
        e.length === Me ? Me : Nn
      ).map((v) => {
        var y;
        return /* @__PURE__ */ r(me, { className: "hover:tw-bg-secondary", variant: "secondary", children: a && ((y = a.get(v)) == null ? void 0 : y.localizedName) || M.bookIdToEnglishName(v) || v }, v);
      }),
      e.length > Me && /* @__PURE__ */ r(
        me,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - Nn} ${g}`
        }
      )
    ] })
  ] });
}
const Ni = Object.freeze([
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
]), St = (t, e) => t[e] ?? e;
function ki({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: w
}) {
  const m = St(
    s,
    "%webView_scope_selector_selected_text%"
  ), c = St(
    s,
    "%webView_scope_selector_current_verse%"
  ), u = St(
    s,
    "%webView_scope_selector_current_chapter%"
  ), g = St(s, "%webView_scope_selector_current_book%"), h = St(s, "%webView_scope_selector_choose_books%"), f = St(s, "%webView_scope_selector_scope%"), b = St(s, "%webView_scope_selector_select_books%"), _ = [
    { value: "selectedText", label: m, id: "scope-selected-text" },
    { value: "verse", label: c, id: "scope-verse" },
    { value: "chapter", label: u, id: "scope-chapter" },
    { value: "book", label: g, id: "scope-book" },
    { value: "selectedBooks", label: h, id: "scope-selected" }
  ], k = e ? _.filter((S) => e.includes(S.value)) : _;
  return /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(X, { children: f }),
      /* @__PURE__ */ r(
        Je,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: k.map(({ value: S, label: x, id: V }) => /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(pe, { className: "tw-me-2", value: S, id: V }),
            /* @__PURE__ */ r(X, { htmlFor: V, children: x })
          ] }, V))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(X, { children: b }),
      /* @__PURE__ */ r(
        Xa,
        {
          availableBookInfo: o,
          selectedBookIds: a,
          onChangeSelectedBookIds: i,
          localizedStrings: s,
          localizedBookNames: w
        }
      )
    ] })
  ] });
}
const ze = {
  [P("undefined")]: "Ø",
  [P(0)]: "A",
  [P(1)]: "B",
  [P(2)]: "C",
  [P(3)]: "D",
  [P(4)]: "E",
  [P(5)]: "F",
  [P(6)]: "G",
  [P(7)]: "H",
  [P(8)]: "I",
  [P(9)]: "J",
  [P(10)]: "K",
  [P(11)]: "L",
  [P(12)]: "M",
  [P(13)]: "N",
  [P(14)]: "O",
  [P(15)]: "P",
  [P(16)]: "Q",
  [P(17)]: "R",
  [P(18)]: "S",
  [P(19)]: "T",
  [P(20)]: "U",
  [P(21)]: "V",
  [P(22)]: "W",
  [P(23)]: "X",
  [P(24)]: "Y",
  [P(25)]: "Z"
};
function Ci({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: i
}) {
  const s = {
    ...ze,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([m, c]) => [
          m,
          m === c && m in ze ? ze[m] : c
        ]
      )
    )
  }, w = Y();
  return /* @__PURE__ */ l(
    Bt,
    {
      value: `${e}`,
      onValueChange: (m) => n(
        m === "undefined" ? void 0 : parseInt(m, 10)
      ),
      children: [
        /* @__PURE__ */ r(Mt, { size: a, className: d("pr-twp tw-w-auto", i), children: /* @__PURE__ */ r(
          jt,
          {
            placeholder: s[P(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          zt,
          {
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((m) => /* @__PURE__ */ r(st, { value: `${m}`, children: s[P(m)] }, `${m}`))
          }
        )
      ]
    }
  );
}
function _i({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Si({
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
function Ti({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ l("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(nn, {}) : ""
  ] });
}
function lr(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function ue({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: d("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const dr = (t, e, n, o) => n ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === n || i === n
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((w) => w.group === i).sort((w, m) => w.order - m.order).map((w) => /* @__PURE__ */ l(on, { children: [
  /* @__PURE__ */ r(an, { asChild: !0, children: "command" in w ? /* @__PURE__ */ l(
    Un,
    {
      onClick: () => {
        o(w);
      },
      children: [
        w.iconPathBefore && /* @__PURE__ */ r(ue, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
        w.label,
        w.iconPathAfter && /* @__PURE__ */ r(ue, { icon: w.iconPathAfter, menuLabel: w.label })
      ]
    },
    `dropdown-menu-item-${w.label}-${w.command}`
  ) : /* @__PURE__ */ l(Go, { children: [
    /* @__PURE__ */ r(Xn, { children: w.label }),
    /* @__PURE__ */ r(Fo, { children: /* @__PURE__ */ r(Hn, { children: dr(
      t,
      e,
      lr(t, w.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${w.label}-${w.id}`) }),
  w.tooltip && /* @__PURE__ */ r(_e, { children: w.tooltip })
] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`))) : void 0;
function kn({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: i,
  id: s
}) {
  return /* @__PURE__ */ l(Ze, { variant: i, children: [
    /* @__PURE__ */ r(Gn, { "aria-label": n, className: a, asChild: !0, id: s, children: /* @__PURE__ */ r(z, { variant: "ghost", size: "icon", children: o ?? /* @__PURE__ */ r(Wr, {}) }) }),
    /* @__PURE__ */ r(ve, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, m]) => typeof w == "boolean" || typeof m == "boolean" ? 0 : w.order - m.order).map(([w], m, c) => /* @__PURE__ */ l(_n, { children: [
      /* @__PURE__ */ r(Ln, { children: /* @__PURE__ */ r(rn, { children: dr(e.groups, e.items, w, t) }) }),
      m < c.length - 1 && /* @__PURE__ */ r(xe, {})
    ] }, w)) })
  ] });
}
function Ri({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: w,
  endAreaChildren: m
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      className: d(
        "tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-start tw-justify-between tw-overflow-clip tw-border-b tw-border-border tw-text-foreground tw-@container/toolbar *:tw-p-2",
        i
      ),
      id: a,
      children: [
        n && // div wrapper gets padding instead of the button
        /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
          kn,
          {
            onSelectMenuItem: t,
            menuData: n,
            tabLabel: "Project",
            icon: /* @__PURE__ */ r(Zr, {}),
            className: "tw-h-8 tw-w-8"
          }
        ) }),
        s && /* @__PURE__ */ r("div", { className: "tw-flex tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: s }),
        w && /* @__PURE__ */ r("div", { className: "tw-flex tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: w }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
          o && // div wrapper gets padding instead of the button
          /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
            kn,
            {
              onSelectMenuItem: e,
              menuData: o,
              tabLabel: "View Info",
              icon: /* @__PURE__ */ r(Qr, {}),
              className: "tw-h-8"
            }
          ) }),
          m
        ] })
      ]
    }
  );
}
const cr = p.forwardRef(({ className: t, ...e }, n) => {
  const o = Y();
  return /* @__PURE__ */ r(
    et.Root,
    {
      orientation: "vertical",
      ref: n,
      className: d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
cr.displayName = et.List.displayName;
const pr = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  et.List,
  {
    ref: n,
    className: d(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
pr.displayName = et.List.displayName;
const Ha = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  et.Trigger,
  {
    ref: n,
    ...e,
    className: d(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), mr = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  et.Content,
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
mr.displayName = et.Content.displayName;
function Ei({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: i
}) {
  return /* @__PURE__ */ l("div", { className: "pr-twp", children: [
    /* @__PURE__ */ l("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        sn,
        {
          className: i,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ l(cr, { children: [
      /* @__PURE__ */ r(pr, { children: t.map((s) => /* @__PURE__ */ r(Ha, { value: s.value, children: s.value }, s.key)) }),
      t.map((s) => /* @__PURE__ */ r(mr, { value: s.value, children: s.content }, s.key))
    ] })
  ] });
}
function Ua({ ...t }) {
  return /* @__PURE__ */ r(j.Menu, { ...t });
}
function Ya({ ...t }) {
  return /* @__PURE__ */ r(j.Sub, { "data-slot": "menubar-sub", ...t });
}
const ur = p.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = p.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(We.Provider, { value: a, children: /* @__PURE__ */ r(
    j.Root,
    {
      ref: o,
      className: d(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...n
    }
  ) });
});
ur.displayName = j.Root.displayName;
const hr = p.forwardRef(({ className: t, ...e }, n) => {
  const o = lt();
  return /* @__PURE__ */ r(
    j.Trigger,
    {
      ref: n,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        bt({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
hr.displayName = j.Trigger.displayName;
const fr = p.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = lt();
  return /* @__PURE__ */ l(
    j.SubTrigger,
    {
      ref: a,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        bt({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(At, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
fr.displayName = j.SubTrigger.displayName;
const gr = p.forwardRef(({ className: t, ...e }, n) => {
  const o = lt();
  return /* @__PURE__ */ r(
    j.SubContent,
    {
      ref: n,
      className: d(
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
gr.displayName = j.SubContent.displayName;
const br = p.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, i) => {
  const s = lt();
  return /* @__PURE__ */ r(j.Portal, { children: /* @__PURE__ */ r(
    j.Content,
    {
      ref: i,
      align: e,
      alignOffset: n,
      sideOffset: o,
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
      ...a
    }
  ) });
});
br.displayName = j.Content.displayName;
const vr = p.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = lt();
  return /* @__PURE__ */ r(
    j.Item,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        bt({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
vr.displayName = j.Item.displayName;
const qa = p.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = lt();
  return /* @__PURE__ */ l(
    j.CheckboxItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        bt({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(j.ItemIndicator, { children: /* @__PURE__ */ r(_t, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
qa.displayName = j.CheckboxItem.displayName;
const Ka = p.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = lt();
  return /* @__PURE__ */ l(
    j.RadioItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        bt({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(j.ItemIndicator, { children: /* @__PURE__ */ r(he, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Ka.displayName = j.RadioItem.displayName;
const Ja = p.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  j.Label,
  {
    ref: o,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Ja.displayName = j.Label.displayName;
const xr = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  j.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
xr.displayName = j.Separator.displayName;
const qt = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, yr = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === n || i === n
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const w = e.filter((c) => c.group === i).sort((c, u) => c.order - u.order).map((c) => /* @__PURE__ */ l(on, { children: [
      /* @__PURE__ */ r(an, { asChild: !0, children: "command" in c ? /* @__PURE__ */ l(
        vr,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(ue, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(ue, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ l(Ya, { children: [
        /* @__PURE__ */ r(fr, { children: c.label }),
        /* @__PURE__ */ r(gr, { children: yr(
          t,
          e,
          lr(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(_e, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), m = [...w];
    return w.length > 0 && s < a.length - 1 && m.push(/* @__PURE__ */ r(xr, {}, `separator-${i}`)), m;
  });
};
function Wa({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = U(void 0), i = U(void 0), s = U(void 0), w = U(void 0), m = U(void 0), c = (u) => {
    switch (u) {
      case "platform.app":
        return i;
      case "platform.window":
        return s;
      case "platform.layout":
        return w;
      case "platform.help":
        return m;
      default:
        return;
    }
  };
  if (po(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (u, g) => {
    var b, _, k, S;
    u.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, f = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (g.hotkey) {
      case "alt":
        qt(i, [h]);
        break;
      case "alt+p":
        (b = i.current) == null || b.focus(), qt(i, [h, f]);
        break;
      case "alt+l":
        (_ = s.current) == null || _.focus(), qt(s, [h, f]);
        break;
      case "alt+n":
        (k = w.current) == null || k.focus(), qt(w, [h, f]);
        break;
      case "alt+h":
        (S = m.current) == null || S.focus(), qt(m, [h, f]);
        break;
    }
  }), Et(() => {
    if (!n || !a.current) return;
    const u = new MutationObserver((f) => {
      f.forEach((b) => {
        if (b.attributeName === "data-state" && b.target instanceof HTMLElement) {
          const _ = b.target.getAttribute("data-state");
          n(_ === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((f) => {
      u.observe(f, { attributes: !0 });
    }), () => u.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(ur, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, u]) => typeof u == "object").sort(([, u], [, g]) => typeof u == "boolean" || typeof g == "boolean" ? 0 : u.order - g.order).map(([u, g]) => /* @__PURE__ */ l(Ua, { children: [
      /* @__PURE__ */ r(hr, { ref: c(u), children: typeof g == "object" && "label" in g && g.label }),
      /* @__PURE__ */ r(
        br,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(rn, { children: yr(t.groups, t.items, u, e) })
        }
      )
    ] }, u)) });
}
function Vi(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Di({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: w,
  shouldUseAsAppDragArea: m,
  menubarVariant: c = "default"
}) {
  const u = U(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("tw-border tw-px-4 tw-text-foreground", o),
      ref: u,
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
                  s,
                  t && /* @__PURE__ */ r(
                    Wa,
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
                style: m ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
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
const Za = (t, e) => t[e] ?? e;
function Mi({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: w
}) {
  const m = Za(
    s,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [c, u] = I(!1), g = (f) => {
    a && a(f), o && o([f, ...n.filter((b) => b !== f)]), i && n.find((b) => b === f) && i([...n.filter((b) => b !== f)]), u(!1);
  }, h = (f, b) => {
    var k, S, x, V, A, W;
    const _ = b !== f ? ((S = (k = t[f]) == null ? void 0 : k.uiNames) == null ? void 0 : S[b]) ?? ((V = (x = t[f]) == null ? void 0 : x.uiNames) == null ? void 0 : V.en) : void 0;
    return _ ? `${(A = t[f]) == null ? void 0 : A.autonym} (${_})` : (W = t[f]) == null ? void 0 : W.autonym;
  };
  return /* @__PURE__ */ l("div", { className: d("pr-twp tw-max-w-sm", w), children: [
    /* @__PURE__ */ l(
      Bt,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: g,
        open: c,
        onOpenChange: (f) => u(f),
        children: [
          /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ r(jt, {}) }),
          /* @__PURE__ */ r(
            zt,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((f) => /* @__PURE__ */ r(st, { value: f, children: h(f, e) }, f))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ l(Zt, { children: [
      /* @__PURE__ */ r(X, { className: "tw-ms-3", children: m }),
      /* @__PURE__ */ r("div", { className: "tw-ms-3", children: /* @__PURE__ */ l(X, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((f) => h(f, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
function Qa({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(X, { children: e(t) }) : n ? /* @__PURE__ */ r(X, { children: n(t) }) : /* @__PURE__ */ r(X, { children: t });
}
function zi({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((w) => /* @__PURE__ */ l("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      en,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(w),
        onCheckedChange: (m) => a(w, m)
      }
    ),
    /* @__PURE__ */ r(
      Qa,
      {
        item: w,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, w)) });
}
const ts = Cn(({ className: t, ...e }, n) => /* @__PURE__ */ r(to, { size: 35, className: d("tw-animate-spin", t), ...e, ref: n }));
ts.displayName = "Spinner";
function Oi({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: i,
  placeholder: s,
  isRequired: w = !1,
  className: m,
  defaultValue: c,
  value: u,
  onChange: g,
  onFocus: h,
  onBlur: f
}) {
  return /* @__PURE__ */ l("div", { className: d("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      X,
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
      le,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: w,
        className: d(m, { "tw-border-red-600": n }),
        defaultValue: c,
        value: u,
        onChange: g,
        onFocus: h,
        onBlur: f
      }
    ),
    /* @__PURE__ */ r("p", { className: d({ "tw-hidden": !a }), children: a })
  ] });
}
const es = Ct(
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
), ns = p.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: d(
      // CUSTOM
      "pr-twp",
      es({ variant: e }),
      t
    ),
    ...n
  }
));
ns.displayName = "Alert";
const rs = p.forwardRef(
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
rs.displayName = "AlertTitle";
const os = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
os.displayName = "AlertDescription";
const as = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Gt.Root,
  {
    ref: n,
    className: d(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
as.displayName = Gt.Root.displayName;
const ss = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Gt.Image,
  {
    ref: n,
    className: d("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
ss.displayName = Gt.Image.displayName;
const is = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Gt.Fallback,
  {
    ref: n,
    className: d(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
is.displayName = Gt.Fallback.displayName;
const ws = p.forwardRef(
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
ws.displayName = "Card";
const ls = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
ls.displayName = "CardHeader";
const ds = p.forwardRef(
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
ds.displayName = "CardTitle";
const cs = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: d("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
cs.displayName = "CardDescription";
const ps = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
ps.displayName = "CardContent";
const ms = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
ms.displayName = "CardFooter";
const Ii = $.Root, Ai = $.Trigger, Pi = $.Group, Bi = $.Portal, ji = $.Sub, $i = $.RadioGroup, us = p.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ l(
  $.SubTrigger,
  {
    ref: a,
    className: d(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      e && "tw-pl-8",
      t
    ),
    ...o,
    children: [
      n,
      /* @__PURE__ */ r(At, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
us.displayName = $.SubTrigger.displayName;
const hs = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $.SubContent,
  {
    ref: n,
    className: d(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
hs.displayName = $.SubContent.displayName;
const fs = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r($.Portal, { children: /* @__PURE__ */ r(
  $.Content,
  {
    ref: n,
    className: d(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
fs.displayName = $.Content.displayName;
const gs = p.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  $.Item,
  {
    ref: o,
    className: d(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
gs.displayName = $.Item.displayName;
const bs = p.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ l(
  $.CheckboxItem,
  {
    ref: a,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r($.ItemIndicator, { children: /* @__PURE__ */ r(_t, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
bs.displayName = $.CheckboxItem.displayName;
const vs = p.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ l(
  $.RadioItem,
  {
    ref: o,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r($.ItemIndicator, { children: /* @__PURE__ */ r(he, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
vs.displayName = $.RadioItem.displayName;
const xs = p.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  $.Label,
  {
    ref: o,
    className: d(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
xs.displayName = $.Label.displayName;
const ys = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
ys.displayName = $.Separator.displayName;
function Ns({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: d("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
Ns.displayName = "ContextMenuShortcut";
const Nr = p.createContext({
  direction: "bottom"
});
function ks({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = p.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Nr.Provider, { value: o, children: /* @__PURE__ */ r(
    wt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
ks.displayName = "Drawer";
const Fi = wt.Trigger, Cs = wt.Portal, Gi = wt.Close, kr = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Overlay,
  {
    ref: n,
    className: d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
kr.displayName = wt.Overlay.displayName;
const _s = p.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: i = "bottom" } = p.useContext(Nr), s = {
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
  return /* @__PURE__ */ l(Cs, { children: [
    /* @__PURE__ */ r(kr, {}),
    /* @__PURE__ */ l(
      wt.Content,
      {
        ref: a,
        className: d(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          i === "bottom" || i === "top" ? "tw-flex-col" : "tw-flex-row",
          s[i],
          t
        ),
        ...o,
        children: [
          !n && (i === "bottom" || i === "right") && /* @__PURE__ */ r("div", { className: w[i] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: e }),
          !n && (i === "top" || i === "left") && /* @__PURE__ */ r("div", { className: w[i] })
        ]
      }
    )
  ] });
});
_s.displayName = "DrawerContent";
function Ss({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
Ss.displayName = "DrawerHeader";
function Ts({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
Ts.displayName = "DrawerFooter";
const Rs = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Title,
  {
    ref: n,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Rs.displayName = wt.Title.displayName;
const Es = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Description,
  {
    ref: n,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Es.displayName = wt.Description.displayName;
const Vs = p.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  Be.Root,
  {
    ref: o,
    className: d(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      Be.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
Vs.displayName = Be.Root.displayName;
function Li({ ...t }) {
  return /* @__PURE__ */ r(
    mo,
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
const Ds = p.forwardRef(({ className: t, ...e }, n) => {
  const o = Y();
  return /* @__PURE__ */ l(
    Kt.Root,
    {
      ref: n,
      className: d(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(Kt.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Kt.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Kt.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Ds.displayName = Kt.Root.displayName;
const Ms = p.forwardRef(({ className: t, ...e }, n) => {
  const o = Y();
  return /* @__PURE__ */ r(
    je.Root,
    {
      className: d(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        je.Thumb,
        {
          className: d(
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
Ms.displayName = je.Root.displayName;
const Xi = et.Root, zs = p.forwardRef(({ className: t, ...e }, n) => {
  const o = Y();
  return /* @__PURE__ */ r(
    et.List,
    {
      ref: n,
      className: d(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: o
    }
  );
});
zs.displayName = et.List.displayName;
const Os = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  et.Trigger,
  {
    ref: n,
    className: d(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Os.displayName = et.Trigger.displayName;
const Is = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  et.Content,
  {
    ref: n,
    className: d(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Is.displayName = et.Content.displayName;
const As = p.forwardRef(
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
As.displayName = "Textarea";
const Hi = (t, e) => {
  Et(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Ps(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Bs = (t, e, n = {}) => {
  const o = U(e);
  o.current = e;
  const a = U(n);
  a.current = Ps(a.current);
  const [i, s] = I(() => o.current), [w, m] = I(!0);
  return Et(() => {
    let c = !0;
    return m(!!t), (async () => {
      if (t) {
        const u = await t();
        c && (s(() => u), m(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, w];
}, Oe = () => !1, Ui = (t, e) => {
  const [n] = Bs(
    F(async () => {
      if (!t) return Oe;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Oe,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Et(() => () => {
    n !== Oe && n();
  }, [n]);
}, Yi = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = U(null), [i, s] = I(void 0), [w, m] = I(void 0), c = F(
    (h) => {
      s(h);
      const f = t.find((_) => _.id === h);
      f && (e == null || e(f));
      const b = document.getElementById(h);
      b && (b.scrollIntoView({ block: "center" }), b.focus()), a.current && a.current.setAttribute("aria-activedescendant", h);
    },
    [e, t]
  ), u = F(
    (h) => {
      const f = t.find((b) => b.id === h);
      f && (m((b) => b === h ? void 0 : h), n == null || n(f));
    },
    [n, t]
  ), g = F(
    (h) => {
      const f = t.findIndex((k) => k.id === i);
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
          i && u(i), h.preventDefault(), h.stopPropagation();
          return;
        default:
          h.key.length === 1 && !h.metaKey && !h.ctrlKey && !h.altKey && (o == null || o(h.key), h.preventDefault());
          return;
      }
      const _ = t[b];
      _ && c(_.id);
    },
    [t, c, i, u, o]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: w,
    handleKeyDown: g,
    focusOption: c
  };
};
function js(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
js(`*, ::before, ::after {
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
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
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
.tw-border-border {
  border-color: hsl(var(--border));
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
.tw-border-s-yellow-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 240 138 / var(--tw-border-opacity, 1));
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
.tw-ps-\\[85px\\] {
  padding-inline-start: 85px;
}
.tw-pt-0 {
  padding-top: 0px;
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
  ns as Alert,
  os as AlertDescription,
  rs as AlertTitle,
  as as Avatar,
  is as AvatarFallback,
  ss as AvatarImage,
  ri as BOOK_SELECTOR_STRING_KEYS,
  me as Badge,
  ni as BookChapterControl,
  $o as BookSelectionMode,
  oi as BookSelector,
  z as Button,
  ws as Card,
  ps as CardContent,
  cs as CardDescription,
  ms as CardFooter,
  ls as CardHeader,
  ds as CardTitle,
  jo as ChapterRangeSelector,
  en as Checkbox,
  zi as Checklist,
  $e as ComboBox,
  oe as Command,
  be as CommandEmpty,
  Pt as CommandGroup,
  ae as CommandInput,
  Vt as CommandItem,
  se as CommandList,
  Ii as ContextMenu,
  bs as ContextMenuCheckboxItem,
  fs as ContextMenuContent,
  Pi as ContextMenuGroup,
  gs as ContextMenuItem,
  xs as ContextMenuLabel,
  Bi as ContextMenuPortal,
  $i as ContextMenuRadioGroup,
  vs as ContextMenuRadioItem,
  ys as ContextMenuSeparator,
  Ns as ContextMenuShortcut,
  ji as ContextMenuSub,
  hs as ContextMenuSubContent,
  us as ContextMenuSubTrigger,
  Ai as ContextMenuTrigger,
  ra as DataTable,
  ks as Drawer,
  Gi as DrawerClose,
  _s as DrawerContent,
  Es as DrawerDescription,
  Ts as DrawerFooter,
  Ss as DrawerHeader,
  kr as DrawerOverlay,
  Cs as DrawerPortal,
  Rs as DrawerTitle,
  Fi as DrawerTrigger,
  Ze as DropdownMenu,
  Qe as DropdownMenuCheckboxItem,
  ve as DropdownMenuContent,
  Ln as DropdownMenuGroup,
  Un as DropdownMenuItem,
  sa as DropdownMenuItemType,
  tn as DropdownMenuLabel,
  Fo as DropdownMenuPortal,
  Lo as DropdownMenuRadioGroup,
  Yn as DropdownMenuRadioItem,
  xe as DropdownMenuSeparator,
  Xo as DropdownMenuShortcut,
  Go as DropdownMenuSub,
  Hn as DropdownMenuSubContent,
  Xn as DropdownMenuSubTrigger,
  Gn as DropdownMenuTrigger,
  oa as ERROR_DUMP_STRING_KEYS,
  si as ERROR_POPOVER_STRING_KEYS,
  aa as ErrorDump,
  ii as ErrorPopover,
  ci as Filter,
  wi as FilterDropdown,
  di as Footer,
  bi as INVENTORY_STRING_KEYS,
  le as Input,
  vi as Inventory,
  X as Label,
  ai as MarkdownRenderer,
  li as MoreInfo,
  la as MultiSelectComboBox,
  Ei as NavigationContentSearch,
  ie as Popover,
  Lt as PopoverContent,
  we as PopoverTrigger,
  Vs as Progress,
  Je as RadioGroup,
  pe as RadioGroupItem,
  Ni as SCOPE_SELECTOR_STRING_KEYS,
  ki as ScopeSelector,
  yi as ScriptureResultsViewer,
  Ci as ScrollGroupSelector,
  sn as SearchBar,
  Bt as Select,
  zt as SelectContent,
  Uo as SelectGroup,
  st as SelectItem,
  qo as SelectLabel,
  Kn as SelectScrollDownButton,
  qn as SelectScrollUpButton,
  Ko as SelectSeparator,
  Mt as SelectTrigger,
  jt as SelectValue,
  nn as Separator,
  _i as SettingsList,
  Ti as SettingsListHeader,
  Si as SettingsListItem,
  Ma as SettingsSidebar,
  xi as SettingsSidebarContentSearch,
  er as Sidebar,
  rr as SidebarContent,
  Na as SidebarFooter,
  Fe as SidebarGroup,
  Ca as SidebarGroupAction,
  Le as SidebarGroupContent,
  Ge as SidebarGroupLabel,
  ya as SidebarHeader,
  xa as SidebarInput,
  nr as SidebarInset,
  or as SidebarMenu,
  Sa as SidebarMenuAction,
  Ta as SidebarMenuBadge,
  sr as SidebarMenuButton,
  ar as SidebarMenuItem,
  Ra as SidebarMenuSkeleton,
  Ea as SidebarMenuSub,
  Da as SidebarMenuSubButton,
  Va as SidebarMenuSubItem,
  tr as SidebarProvider,
  va as SidebarRail,
  ka as SidebarSeparator,
  ba as SidebarTrigger,
  xn as Skeleton,
  Ds as Slider,
  Li as Sonner,
  ts as Spinner,
  Ms as Switch,
  kn as TabDropdownMenu,
  Ri as TabToolbar,
  ye as Table,
  ke as TableBody,
  na as TableCaption,
  $t as TableCell,
  Zo as TableFooter,
  ne as TableHead,
  Ne as TableHeader,
  kt as TableRow,
  Xi as Tabs,
  Is as TabsContent,
  zs as TabsList,
  Os as TabsTrigger,
  Oi as TextField,
  As as Textarea,
  Zn as ToggleGroup,
  ce as ToggleGroupItem,
  Di as Toolbar,
  on as Tooltip,
  _e as TooltipContent,
  rn as TooltipProvider,
  an as TooltipTrigger,
  Mi as UiLanguageSelector,
  cr as VerticalTabs,
  mr as VerticalTabsContent,
  pr as VerticalTabsList,
  Ha as VerticalTabsTrigger,
  wa as badgeVariants,
  ho as buttonVariants,
  d as cn,
  gi as getBookIdFromUSFM,
  hi as getLinesFromUSFM,
  fi as getNumberFromUSFM,
  ma as getStatusForItem,
  Vi as getToolbarOSReservedSpaceClassName,
  mi as inventoryCountColumn,
  pi as inventoryItemColumn,
  ui as inventoryStatusColumn,
  Yo as selectTriggerVariants,
  Ji as sonner,
  Hi as useEvent,
  Ui as useEventAsync,
  Yi as useListbox,
  Bs as usePromise,
  Se as useSidebar
};
//# sourceMappingURL=index.js.map
