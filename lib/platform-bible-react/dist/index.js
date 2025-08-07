import { jsx as r, jsxs as d, Fragment as Kt } from "react/jsx-runtime";
import p, { useCallback as F, useMemo as L, useState as A, useRef as H, useLayoutEffect as sn, createContext as xr, useContext as yr, useEffect as St, forwardRef as xn, Fragment as yn } from "react";
import { Slot as Bt } from "@radix-ui/react-slot";
import { cva as xt } from "class-variance-authority";
import { clsx as Nr } from "clsx";
import { extendTailwindMerge as kr } from "tailwind-merge";
import { Command as tt } from "cmdk";
import { X as Xe, Search as Nn, ChevronsLeft as wn, ChevronsRight as ln, ChevronLeft as De, ChevronRight as zt, ArrowLeft as Cr, Circle as pe, ChevronsUpDown as Fe, Check as yt, FilterIcon as _r, ChevronDown as ue, ChevronUp as Sr, ArrowLeftIcon as Tr, ChevronLeftIcon as Rr, ChevronRightIcon as Er, ArrowRightIcon as Vr, Copy as Mr, Filter as Dr, User as zr, Link as Or, CircleHelp as Ir, Star as Ar, CircleCheckIcon as Pr, CircleXIcon as Br, CircleHelpIcon as jr, ArrowUpIcon as $r, ArrowDownIcon as Xr, ArrowUpDownIcon as Fr, PanelLeft as Gr, PanelRight as Lr, ScrollText as Hr, MenuIcon as Yr, Menu as Ur, EllipsisVertical as qr, LoaderCircle as Jr } from "lucide-react";
import * as ct from "@radix-ui/react-dialog";
import * as Wt from "@radix-ui/react-popover";
import { getChaptersForBook as Kr, formatScrRef as qt, NumberFormat as Wr, formatBytes as Zr, deepEqual as Ge, isString as Ce, compareScrRefs as ze, scrRefToBBBCCCVVV as _e, getLocalizeKeyForScrollGroupId as I } from "platform-bible-utils";
import * as kn from "@radix-ui/react-label";
import * as Zt from "@radix-ui/react-radio-group";
import { useReactTable as Cn, getFilteredRowModel as Qr, getSortedRowModel as _n, getPaginationRowModel as ta, getCoreRowModel as Sn, flexRender as Jt, getGroupedRowModel as ea, getExpandedRowModel as na } from "@tanstack/react-table";
import * as P from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ra } from "@radix-ui/react-dropdown-menu";
import * as G from "@radix-ui/react-select";
import aa from "markdown-to-jsx";
import * as Oe from "@radix-ui/react-checkbox";
import * as me from "@radix-ui/react-toggle-group";
import * as Tn from "@radix-ui/react-toggle";
import * as Rn from "@radix-ui/react-separator";
import * as ee from "@radix-ui/react-tooltip";
import * as et from "@radix-ui/react-tabs";
import * as B from "@radix-ui/react-menubar";
import { useHotkeys as oa } from "react-hotkeys-hook";
import * as jt from "@radix-ui/react-avatar";
import * as j from "@radix-ui/react-context-menu";
import { Drawer as it } from "vaul";
import * as Ie from "@radix-ui/react-progress";
import { Toaster as sa } from "sonner";
import { toast as Gi } from "sonner";
import * as Ut from "@radix-ui/react-slider";
import * as Ae from "@radix-ui/react-switch";
const ia = kr({ prefix: "tw-" });
function l(...t) {
  return ia(Nr(t));
}
const wa = xt(
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
  ({ className: t, variant: e, size: n, asChild: a = !1, ...o }, s) => /* @__PURE__ */ r(a ? Bt : "button", { className: l(wa({ variant: e, size: n, className: t })), ref: s, ...o })
);
z.displayName = "Button";
const la = "layoutDirection";
function U() {
  const t = localStorage.getItem(la);
  return t === "rtl" ? t : "ltr";
}
const da = ct.Portal, En = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.Overlay,
  {
    ref: n,
    className: l(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
En.displayName = ct.Overlay.displayName;
const ca = p.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = U();
  return /* @__PURE__ */ d(da, { children: [
    /* @__PURE__ */ r(En, {}),
    /* @__PURE__ */ d(
      ct.Content,
      {
        ref: a,
        className: l(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: o,
        children: [
          e,
          /* @__PURE__ */ d(
            ct.Close,
            {
              className: l(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
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
ca.displayName = ct.Content.displayName;
const pa = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.Title,
  {
    ref: n,
    className: l("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
pa.displayName = ct.Title.displayName;
const ua = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.Description,
  {
    ref: n,
    className: l("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
ua.displayName = ct.Description.displayName;
const ne = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tt,
  {
    ref: n,
    className: l(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
ne.displayName = tt.displayName;
const re = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ r(Nn, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      tt.Input,
      {
        ref: n,
        className: l(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
re.displayName = tt.Input.displayName;
const ae = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tt.List,
  {
    ref: n,
    className: l("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ae.displayName = tt.List.displayName;
const he = p.forwardRef((t, e) => /* @__PURE__ */ r(tt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
he.displayName = tt.Empty.displayName;
const Ot = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tt.Group,
  {
    ref: n,
    className: l(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Ot.displayName = tt.Group.displayName;
const Vn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tt.Separator,
  {
    ref: n,
    className: l("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Vn.displayName = tt.Separator.displayName;
const Tt = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  tt.Item,
  {
    ref: n,
    className: l(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
Tt.displayName = tt.Item.displayName;
const oe = Wt.Root, se = Wt.Trigger, $t = p.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...a }, o) => {
  const s = U();
  return /* @__PURE__ */ r(Wt.Portal, { children: /* @__PURE__ */ r(
    Wt.Content,
    {
      ref: o,
      align: e,
      sideOffset: n,
      className: l(
        "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a,
      dir: s
    }
  ) });
});
$t.displayName = Wt.Content.displayName;
var ma = Object.defineProperty, ha = (t, e, n) => e in t ? ma(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, E = (t, e, n) => ha(t, typeof e != "symbol" ? e + "" : e, n);
const Rt = [
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
], Le = [
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
], Mn = [
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
], dn = _a();
function Xt(t, e = !0) {
  return e && (t = t.toUpperCase()), t in dn ? dn[t] : 0;
}
function He(t) {
  return Xt(t) > 0;
}
function fa(t) {
  const e = typeof t == "string" ? Xt(t) : t;
  return e >= 40 && e <= 66;
}
function ga(t) {
  return (typeof t == "string" ? Xt(t) : t) <= 39;
}
function Dn(t) {
  return t <= 66;
}
function ba(t) {
  const e = typeof t == "string" ? Xt(t) : t;
  return In(e) && !Dn(e);
}
function* va() {
  for (let t = 1; t <= Rt.length; t++) yield t;
}
const xa = 1, zn = Rt.length;
function ya() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Ye(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Rt.length ? e : Rt[n];
}
function On(t) {
  return t <= 0 || t > zn ? "******" : Mn[t - 1];
}
function Na(t) {
  return On(Xt(t));
}
function In(t) {
  const e = typeof t == "number" ? Ye(t) : t;
  return He(e) && !Le.includes(e);
}
function ka(t) {
  const e = typeof t == "number" ? Ye(t) : t;
  return He(e) && Le.includes(e);
}
function Ca(t) {
  return Mn[t - 1].includes("*obsolete*");
}
function _a() {
  const t = {};
  for (let e = 0; e < Rt.length; e++)
    t[Rt[e]] = e + 1;
  return t;
}
const D = {
  allBookIds: Rt,
  nonCanonicalIds: Le,
  bookIdToNumber: Xt,
  isBookIdValid: He,
  isBookNT: fa,
  isBookOT: ga,
  isBookOTNT: Dn,
  isBookDC: ba,
  allBookNumbers: va,
  firstBook: xa,
  lastBook: zn,
  extraBooks: ya,
  bookNumberToId: Ye,
  bookNumberToEnglishName: On,
  bookIdToEnglishName: Na,
  isCanonical: In,
  isExtraMaterial: ka,
  isObsolete: Ca
};
var lt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(lt || {});
const rt = class {
  // private versInfo: Versification;
  constructor(e) {
    if (E(this, "name"), E(this, "fullPath"), E(this, "isPresent"), E(this, "hasVerseSegments"), E(this, "isCustomized"), E(this, "baseVersification"), E(this, "scriptureBooks"), E(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = lt[e]) : (this._type = e, this.name = lt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
E(rt, "Original", new rt(lt.Original)), E(rt, "Septuagint", new rt(lt.Septuagint)), E(rt, "Vulgate", new rt(lt.Vulgate)), E(rt, "English", new rt(lt.English)), E(rt, "RussianProtestant", new rt(lt.RussianProtestant)), E(rt, "RussianOrthodox", new rt(lt.RussianOrthodox));
let Ct = rt;
function cn(t, e) {
  const n = e[0];
  for (let a = 1; a < e.length; a++)
    t = t.split(e[a]).join(n);
  return t.split(n);
}
var An = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(An || {});
const Q = class V {
  constructor(e, n, a, o) {
    if (E(this, "firstChapter"), E(this, "lastChapter"), E(this, "lastVerse"), E(this, "hasSegmentsDefined"), E(this, "text"), E(this, "BBBCCCVVVS"), E(this, "longHashCode"), E(this, "versification"), E(this, "rtlMark", "‏"), E(this, "_bookNum", 0), E(this, "_chapterNum", 0), E(this, "_verseNum", 0), E(this, "_verse"), a == null && o == null)
      if (e != null && typeof e == "string") {
        const s = e, i = n != null && n instanceof Ct ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = n != null && n instanceof Ct ? n : void 0;
        this.setEmpty(s), this._verseNum = e % V.chapterDigitShifter, this._chapterNum = Math.floor(
          e % V.bookDigitShifter / V.chapterDigitShifter
        ), this._bookNum = Math.floor(e / V.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof V) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
          const s = e instanceof Ct ? e : V.defaultVersification;
          this.setEmpty(s);
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
      if (a instanceof Ht)
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
    const { book: n, chapterNum: a, verseNum: o, verse: s, versificationStr: i } = e, w = s || o.toString();
    let u;
    return i && (u = new Ct(i)), n ? new V(n, a.toString(), w, u) : new V();
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
    return D.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = D.bookIdToNumber(e);
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
    if (e <= 0 || e > D.lastBook)
      throw new Ht(
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
    this.versification = this.versification != null ? new Ct(e) : void 0;
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
      const s = e.split("/");
      if (e = s[0], s.length > 1)
        try {
          const i = +s[1].trim();
          this.versification = new Ct(lt[i]);
        } catch {
          throw new Ht("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Ht("Invalid reference : " + e);
    const a = n[1].split(":"), o = +a[0];
    if (a.length !== 2 || D.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !V.isVerseParseable(a[1]))
      throw new Ht("Invalid reference : " + e);
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
    const o = [], s = cn(this._verse, a);
    for (const i of s.map((w) => cn(w, n))) {
      const w = this.clone();
      w.verse = i[0];
      const u = w.verseNum;
      if (o.push(w), i.length > 1) {
        const c = this.clone();
        if (c.verse = i[1], !e)
          for (let m = u + 1; m < c.verseNum; m++) {
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
      const s = o.internalValid;
      if (s !== 0)
        return s;
      const i = o.BBBCCCVVV;
      if (a > i)
        return 3;
      if (a === i)
        return 4;
      a = i;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > D.lastBook ? 2 : (D.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = V.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, a) {
    this.bookNum = D.bookIdToNumber(e), this.chapter = n, this.verse = a;
  }
};
E(Q, "defaultVersification", Ct.English), E(Q, "verseRangeSeparator", "-"), E(Q, "verseSequenceIndicator", ","), E(Q, "verseRangeSeparators", [Q.verseRangeSeparator]), E(Q, "verseSequenceIndicators", [Q.verseSequenceIndicator]), E(Q, "chapterDigitShifter", 1e3), E(Q, "bookDigitShifter", Q.chapterDigitShifter * Q.chapterDigitShifter), E(Q, "bcvMaxValue", Q.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
E(Q, "ValidStatusType", An);
class Ht extends Error {
}
const Pn = D.allBookIds.filter(
  (t) => !D.isObsolete(D.bookIdToNumber(t))
), at = Object.fromEntries(
  Pn.map((t) => [t, D.bookIdToEnglishName(t)])
), Sa = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon",
  Extra: "Extra"
}, Se = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ta = [
  Se.BOOK_ONLY,
  Se.BOOK_CHAPTER,
  Se.BOOK_CHAPTER_VERSE
];
function dt(t) {
  return Kr(D.bookIdToNumber(t));
}
function Ra(t, e) {
  if (!t.trim() || e.length === 0) return;
  const n = Ta.reduce(
    (a, o) => {
      if (a) return a;
      const s = o.exec(t.trim());
      if (s) {
        const [i, w = void 0, u = void 0] = s.slice(1);
        let c;
        const g = ((h) => Object.keys(at).find(
          (f) => at[f].toLowerCase() === h.toLowerCase()
        ))(i);
        if (g && e.includes(g) && (c = g), !c && D.isBookIdValid(i)) {
          const h = i.toUpperCase();
          e.includes(h) && (c = h);
        }
        if (!c) {
          const h = i.toLowerCase(), f = e.filter((v) => at[v].toLowerCase().includes(h) || v.toLowerCase().includes(h));
          f.length === 1 && ([c] = f);
        }
        if (c) {
          let h = w ? parseInt(w, 10) : void 0;
          h && h > dt(c) && (h = Math.max(dt(c), 1));
          const f = u ? parseInt(u, 10) : void 0;
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
function pn(t, e) {
  return `${t} ${at[t]}${e ? ` ${e}` : ""}`;
}
function Ea(t, e, n, a) {
  const o = F(() => {
    if (t.chapterNum > 1)
      a({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const u = e.indexOf(t.book);
      if (u > 0) {
        const c = e[u - 1], m = Math.max(dt(c), 1);
        a({
          book: c,
          chapterNum: m,
          verseNum: 1
        });
      }
    }
  }, [t, e, a]), s = F(() => {
    const u = dt(t.book);
    if (t.chapterNum < u)
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
  }, [t, e, a]), i = F(() => {
    a({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, a]), w = F(() => {
    a({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, a]);
  return L(() => [
    {
      onClick: o,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? wn : ln
    },
    {
      onClick: i,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? De : zt
    },
    {
      onClick: w,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? zt : De
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === dt(t.book) || dt(t.book) === -1) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? ln : wn
    }
  ], [
    t,
    e,
    n,
    o,
    i,
    w,
    s
  ]);
}
function un({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: a,
  isChapterDimmed: o,
  className: s
}) {
  if (t)
    return /* @__PURE__ */ r(Ot, { children: /* @__PURE__ */ r("div", { className: l("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: dt(t) }, (i, w) => w + 1).map((i) => /* @__PURE__ */ r(
      Tt,
      {
        value: `${t} ${at[t] || ""} ${i}`,
        onSelect: () => n(i),
        ref: a(i),
        className: l(
          "tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",
          {
            "tw-bg-primary tw-text-primary-foreground": t === e.book && i === e.chapterNum
          },
          {
            "tw-bg-muted/50 tw-text-muted-foreground/50": (o == null ? void 0 : o(i)) ?? !1
          }
        ),
        children: i
      },
      i
    )) }) });
}
function Js({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: a
}) {
  const o = U(), [s, i] = A(!1), [w, u] = A(""), [c, m] = A(""), [g, h] = A("books"), [f, v] = A(void 0), C = H(void 0), N = H(void 0), _ = H(void 0), k = H(void 0), M = H({}), O = L(() => a ? a() : Pn, [a]), q = L(() => ({
    OT: O.filter((S) => D.isBookOT(S)),
    NT: O.filter((S) => D.isBookNT(S)),
    DC: O.filter((S) => D.isBookDC(S)),
    Extra: O.filter((S) => D.extraBooks().includes(S))
  }), [O]), st = L(() => Object.values(q).flat(), [q]), Nt = L(() => {
    if (!c.trim()) return q;
    const y = c.toLowerCase(), S = { OT: [], NT: [], DC: [], Extra: [] };
    return ["OT", "NT", "DC", "Extra"].forEach((Z) => {
      S[Z] = q[Z].filter((J) => at[J].toLowerCase().includes(y) || J.toLowerCase().includes(y));
    }), S;
  }, [q, c]), b = L(
    () => Ra(c, st),
    [c, st]
  ), x = F(() => {
    b && (e({
      book: b.book,
      chapterNum: b.chapterNum ?? 1,
      verseNum: b.verseNum ?? 1
    }), i(!1), m(""), u(""));
  }, [e, b]), $ = F(
    (y) => {
      if (dt(y) <= 1) {
        e({
          book: y,
          chapterNum: 1,
          verseNum: 1
        }), i(!1), m("");
        return;
      }
      v(y), h("chapters");
    },
    [e]
  ), T = F(
    (y) => {
      const S = g === "chapters" ? f : b == null ? void 0 : b.book;
      S && (e({
        book: S,
        chapterNum: y,
        verseNum: 1
      }), i(!1), h("books"), v(void 0), m(""));
    },
    [e, g, f, b]
  ), K = Ea(t, st, o, e), pt = F(() => {
    h("books"), v(void 0), setTimeout(() => {
      N.current && N.current.focus();
    }, 0);
  }, []), Ft = F(
    (y) => {
      if (!y && g === "chapters") {
        pt();
        return;
      }
      i(y), y && (h("books"), v(void 0), m(""));
    },
    [g, pt]
  ), Mt = F(
    (y) => b ? !!b.chapterNum && !y.toString().includes(b.chapterNum.toString()) : !1,
    [b]
  ), nt = L(() => qt(t, "English"), [t]), Gt = F((y) => (S) => {
    M.current[y] = S;
  }, []), R = F((y) => {
    (y.key === "Home" || y.key === "End") && y.stopPropagation();
  }, []), W = F(
    (y) => {
      if (y.ctrlKey) return;
      const S = /^[a-zA-Z]$/.test(y.key), X = /^[0-9]$/.test(y.key);
      if (g === "chapters") {
        if (y.key === "Backspace") {
          y.preventDefault(), y.stopPropagation(), pt();
          return;
        }
        if (S || X) {
          if (y.preventDefault(), y.stopPropagation(), h("books"), v(void 0), X && f) {
            const Z = at[f];
            m(`${Z} ${y.key}`);
          } else
            m(y.key);
          setTimeout(() => {
            N.current && N.current.focus();
          }, 0);
          return;
        }
      }
      if (g === "books" && (S || X)) {
        y.preventDefault(), y.stopPropagation(), m((Z) => Z + y.key), setTimeout(() => {
          N.current && N.current.focus();
        }, 0);
        return;
      }
      if ((g === "chapters" || g === "books" && b) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(y.key)) {
        const Z = g === "chapters" ? f : b == null ? void 0 : b.book;
        if (!Z) return;
        const J = (() => {
          if (!w) return 1;
          const Lt = w.match(/(\d+)$/);
          return Lt ? parseInt(Lt[1], 10) : 0;
        })(), ft = dt(Z);
        if (!ft) return;
        let ut = J;
        const on = 6;
        switch (y.key) {
          case "ArrowLeft":
            J !== 0 && (ut = J > 1 ? J - 1 : ft);
            break;
          case "ArrowRight":
            J !== 0 && (ut = J < ft ? J + 1 : 1);
            break;
          case "ArrowUp":
            ut = J === 0 ? ft : Math.max(1, J - on);
            break;
          case "ArrowDown":
            ut = J === 0 ? 1 : Math.min(ft, J + on);
            break;
          default:
            return;
        }
        ut !== J && (y.preventDefault(), y.stopPropagation(), u(pn(Z, ut)), setTimeout(() => {
          const Lt = M.current[ut];
          Lt && Lt.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [g, b, pt, f, w]
  );
  return sn(() => {
    const y = setTimeout(() => {
      if (s && g === "books" && _.current && k.current) {
        const S = _.current, X = k.current, Z = X.offsetTop, J = S.clientHeight, ft = X.clientHeight, ut = Z - J / 2 + ft / 2;
        S.scrollTo({
          top: Math.max(0, ut),
          behavior: "smooth"
        }), u(pn(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(y);
    };
  }, [s, g, c, b, t.book]), sn(() => {
    if (g === "chapters" && f) {
      const y = f === t.book;
      setTimeout(() => {
        if (_.current)
          if (y) {
            const S = M.current[t.chapterNum];
            S && S.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            _.current.scrollTo({ top: 0 });
        C.current && C.current.focus();
      }, 0);
    }
  }, [g, f, b, t.book, t.chapterNum]), /* @__PURE__ */ d(oe, { open: s, onOpenChange: Ft, children: [
    /* @__PURE__ */ r(se, { asChild: !0, children: /* @__PURE__ */ r(
      z,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": s,
        className: l("tw-h-8 tw-min-w-48", n),
        children: nt
      }
    ) }),
    /* @__PURE__ */ r($t, { forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ d(
      ne,
      {
        ref: C,
        onKeyDown: W,
        loop: !0,
        value: w,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          g === "books" ? /* @__PURE__ */ d("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ r(
              re,
              {
                ref: N,
                value: c,
                onValueChange: m,
                onKeyDown: R
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: K.map(({ onClick: y, disabled: S, title: X, icon: Z }) => /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: y,
                disabled: S,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: X,
                children: /* @__PURE__ */ r(Z, {})
              },
              X
            )) })
          ] }) : /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              z,
              {
                variant: "ghost",
                size: "sm",
                onClick: pt,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: /* @__PURE__ */ r(Cr, { className: "tw-h-4 tw-w-4" })
              }
            ),
            /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: at[f || ""] || "" })
          ] }),
          /* @__PURE__ */ d(ae, { ref: _, children: [
            g === "books" && /* @__PURE__ */ d(Kt, { children: [
              !b && Object.entries(Nt).map(([y, S]) => {
                if (S.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses BookType as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Ot, { heading: Sa[y], children: S.map((X) => /* @__PURE__ */ r(
                      "div",
                      {
                        className: l(
                          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
                          {
                            "tw-border-s-red-200": y.toLowerCase() === "ot",
                            "tw-border-s-purple-200": y.toLowerCase() === "nt",
                            "tw-border-s-indigo-200": y.toLowerCase() === "dc",
                            "tw-border-s-amber-200": y.toLowerCase() === "extra"
                          }
                        ),
                        children: /* @__PURE__ */ r(
                          Tt,
                          {
                            value: `${X} ${at[X]}`,
                            onSelect: () => $(X),
                            ref: X === t.book ? k : void 0,
                            className: "tw-ms-1 tw-px-2",
                            children: at[X]
                          }
                        )
                      },
                      X
                    )) }, y)
                  );
              }),
              b && /* @__PURE__ */ r(Ot, { children: /* @__PURE__ */ r(
                Tt,
                {
                  value: `${b.book} ${at[b.book]} ${b.chapterNum || ""}:${b.verseNum || ""})}`,
                  onSelect: x,
                  className: "tw-font-semibold tw-text-primary",
                  children: qt({
                    book: b.book,
                    chapterNum: b.chapterNum ?? 1,
                    verseNum: b.verseNum ?? 1
                  })
                },
                "top-match"
              ) }),
              b && dt(b.book) > 1 && /* @__PURE__ */ d(Kt, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: at[b.book] }),
                /* @__PURE__ */ r(
                  un,
                  {
                    bookId: b.book,
                    scrRef: t,
                    onChapterSelect: T,
                    setChapterRef: Gt,
                    isChapterDimmed: Mt,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            g === "chapters" && f && /* @__PURE__ */ r(
              un,
              {
                bookId: f,
                scrRef: t,
                onChapterSelect: T,
                setChapterRef: Gt,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Va = xt(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Y = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(kn.Root, { ref: n, className: l("pr-twp", Va(), t), ...e }));
Y.displayName = kn.Root.displayName;
const Ue = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ r(
    Zt.Root,
    {
      className: l("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: a
    }
  );
});
Ue.displayName = Zt.Root.displayName;
const le = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Zt.Item,
  {
    ref: n,
    className: l(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(Zt.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(pe, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
le.displayName = Zt.Item.displayName;
function Ma(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Pe({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: a,
  popoverContentClassName: o,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: w = Ma,
  icon: u = void 0,
  buttonPlaceholder: c = "",
  textPlaceholder: m = "",
  commandEmptyMessage: g = "No option found",
  buttonVariant: h = "outline",
  alignDropDown: f = "start",
  isDisabled: v = !1,
  ...C
}) {
  const [N, _] = A(!1);
  return /* @__PURE__ */ d(oe, { open: N, onOpenChange: _, ...C, children: [
    /* @__PURE__ */ r(se, { asChild: !0, children: /* @__PURE__ */ d(
      z,
      {
        variant: h,
        role: "combobox",
        "aria-expanded": N,
        id: t,
        className: l(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          a ?? n
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-pe-2", children: u }),
            /* @__PURE__ */ r("span", { className: l("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: s ? w(s) : c })
          ] }),
          /* @__PURE__ */ r(Fe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      $t,
      {
        align: f,
        className: l("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ d(ne, { children: [
          /* @__PURE__ */ r(re, { placeholder: m, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(he, { children: g }),
          /* @__PURE__ */ r(ae, { children: e.map((k) => /* @__PURE__ */ d(
            Tt,
            {
              value: w(k),
              onSelect: () => {
                i(k), _(!1);
              },
              children: [
                /* @__PURE__ */ r(
                  yt,
                  {
                    className: l("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !s || w(s) !== w(k)
                    })
                  }
                ),
                w(k)
              ]
            },
            w(k)
          )) })
        ] })
      }
    )
  ] });
}
function Da({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: a,
  isDisabled: o = !1,
  chapterCount: s
}) {
  const i = L(
    () => Array.from({ length: s }, (c, m) => m + 1),
    [s]
  );
  return /* @__PURE__ */ d(Kt, { children: [
    /* @__PURE__ */ r(Y, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      Pe,
      {
        isDisabled: o,
        onChange: (c) => {
          n(c), c > e && a(c);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(Y, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      Pe,
      {
        isDisabled: o,
        onChange: (c) => {
          a(c), c < t && n(c);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (c) => c.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var za = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(za || {});
const Ks = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Te = (t, e) => t[e] ?? e;
function Ws({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: a,
  chapterCount: o,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: w,
  handleSelectStartChapter: u,
  localizedStrings: c
}) {
  const m = Te(c, "%webView_bookSelector_currentBook%"), g = Te(c, "%webView_bookSelector_choose%"), h = Te(c, "%webView_bookSelector_chooseBooks%"), [f, v] = A(
    "current book"
    /* CURRENT_BOOK */
  ), C = (N) => {
    v(N), t(N);
  };
  return /* @__PURE__ */ r(
    Ue,
    {
      className: "pr-twp tw-flex",
      value: f,
      onValueChange: (N) => C(N),
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(le, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(Y, { className: "tw-ms-1", children: m })
          ] }),
          /* @__PURE__ */ r(Y, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Da,
            {
              isDisabled: f === "choose books",
              handleSelectStartChapter: u,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: w,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(le, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(Y, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(Y, { className: "tw-flex tw-items-center", children: a.map((N) => D.bookIdToEnglishName(N)).join(", ") }),
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
const qe = xr(void 0);
function wt() {
  const t = yr(qe);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ht = xt("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Bn = P.Trigger, jn = P.Group, Oa = P.Portal, Ia = P.Sub, Aa = P.RadioGroup;
function Je({ variant: t = "default", ...e }) {
  const n = p.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(qe.Provider, { value: n, children: /* @__PURE__ */ r(P.Root, { ...e }) });
}
const $n = p.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = wt();
  return /* @__PURE__ */ d(
    P.SubTrigger,
    {
      ref: o,
      className: l(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        ht({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(zt, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
$n.displayName = P.SubTrigger.displayName;
const Xn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  P.SubContent,
  {
    ref: n,
    className: l(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
Xn.displayName = P.SubContent.displayName;
const fe = p.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...a }, o) => {
  const s = U();
  return /* @__PURE__ */ r(P.Portal, { children: /* @__PURE__ */ r(
    P.Content,
    {
      ref: o,
      sideOffset: e,
      className: l(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a,
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
});
fe.displayName = P.Content.displayName;
const Fn = p.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = U(), s = wt();
  return /* @__PURE__ */ r(
    P.Item,
    {
      ref: a,
      className: l(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        ht({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: o
    }
  );
});
Fn.displayName = P.Item.displayName;
const Ke = p.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = wt();
  return /* @__PURE__ */ d(
    P.CheckboxItem,
    {
      ref: o,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ht({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(P.ItemIndicator, { children: /* @__PURE__ */ r(yt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Ke.displayName = P.CheckboxItem.displayName;
const Gn = p.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = wt();
  return /* @__PURE__ */ d(
    P.RadioItem,
    {
      ref: a,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ht({ variant: o.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(P.ItemIndicator, { children: /* @__PURE__ */ r(pe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Gn.displayName = P.RadioItem.displayName;
const We = p.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  P.Label,
  {
    ref: a,
    className: l("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
We.displayName = P.Label.displayName;
const ge = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  P.Separator,
  {
    ref: n,
    className: l("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
ge.displayName = P.Separator.displayName;
function Pa({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: l("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Pa.displayName = "DropdownMenuShortcut";
function Ba({ table: t }) {
  return /* @__PURE__ */ d(Je, { children: [
    /* @__PURE__ */ r(ra, { asChild: !0, children: /* @__PURE__ */ d(z, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(_r, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(fe, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(We, { children: "Toggle columns" }),
      /* @__PURE__ */ r(ge, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        Ke,
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
const It = G.Root, ja = G.Group, At = G.Value, $a = xt(
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
), Et = p.forwardRef(({ className: t, children: e, size: n, ...a }, o) => {
  const s = U();
  return /* @__PURE__ */ d(
    G.Trigger,
    {
      className: l($a({ size: n, className: t })),
      ref: o,
      ...a,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(G.Icon, { asChild: !0, children: /* @__PURE__ */ r(ue, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Et.displayName = G.Trigger.displayName;
const Ln = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.ScrollUpButton,
  {
    ref: n,
    className: l("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Sr, { className: "tw-h-4 tw-w-4" })
  }
));
Ln.displayName = G.ScrollUpButton.displayName;
const Hn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.ScrollDownButton,
  {
    ref: n,
    className: l("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(ue, { className: "tw-h-4 tw-w-4" })
  }
));
Hn.displayName = G.ScrollDownButton.displayName;
const Vt = p.forwardRef(({ className: t, children: e, position: n = "popper", ...a }, o) => {
  const s = U();
  return /* @__PURE__ */ r(G.Portal, { children: /* @__PURE__ */ d(
    G.Content,
    {
      ref: o,
      className: l(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...a,
      children: [
        /* @__PURE__ */ r(Ln, {}),
        /* @__PURE__ */ r(
          G.Viewport,
          {
            className: l(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(Hn, {})
      ]
    }
  ) });
});
Vt.displayName = G.Content.displayName;
const Xa = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.Label,
  {
    ref: n,
    className: l("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Xa.displayName = G.Label.displayName;
const ot = p.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ d(
  G.Item,
  {
    ref: a,
    className: l(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(yt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(G.ItemText, { children: e })
    ]
  }
));
ot.displayName = G.Item.displayName;
const Fa = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.Separator,
  {
    ref: n,
    className: l("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Fa.displayName = G.Separator.displayName;
function Ga({ table: t }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ d(
        It,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(Et, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(At, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Vt, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(ot, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ d(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Tr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(Rr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(Er, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        z,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(Vr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const mn = `
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
function La(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Qt(t, e) {
  const n = e ? `${mn}, ${e}` : mn;
  return Array.from(t.querySelectorAll(n)).filter(
    (a) => !a.hasAttribute("disabled") && !a.getAttribute("aria-hidden") && La(a)
  );
}
const be = p.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => {
  const o = p.useRef(null);
  p.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), p.useEffect(() => {
    const i = o.current;
    if (!i) return;
    const w = () => {
      requestAnimationFrame(() => {
        Qt(i, '[tabindex]:not([tabindex="-1"])').forEach((m) => {
          m.setAttribute("tabindex", "-1");
        });
      });
    };
    w();
    const u = new MutationObserver(() => {
      w();
    });
    return u.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      u.disconnect();
    };
  }, []);
  const s = (i) => {
    const { current: w } = o;
    if (w) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), Qt(w)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === w && i.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: l("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: s,
      ref: o,
      className: l(
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
be.displayName = "Table";
const ve = p.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r(
  "thead",
  {
    ref: a,
    className: l(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": e
      },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
ve.displayName = "TableHeader";
const xe = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: l("[&_tr:last-child]:tw-border-0", t), ...e }));
xe.displayName = "TableBody";
const Ha = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: l("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Ha.displayName = "TableFooter";
function Ya(t) {
  p.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (a) => {
      if (e.contains(document.activeElement)) {
        if (a.key === "ArrowRight" || a.key === "ArrowLeft") {
          a.preventDefault(), a.stopPropagation();
          const o = t.current ? Qt(t.current) : [], s = o.indexOf(document.activeElement), i = a.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < o.length && o[i].focus();
        }
        a.key === "Escape" && (a.preventDefault(), e.focus()), (a.key === "ArrowDown" || a.key === "ArrowUp") && a.preventDefault();
      }
    };
    return e.addEventListener("keydown", n), () => {
      e.removeEventListener("keydown", n);
    };
  }, [t]);
}
function Ua(t, e, n) {
  let a;
  return n === "ArrowLeft" && e > 0 ? a = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (a = t[e + 1]), a ? (requestAnimationFrame(() => a.focus()), !0) : !1;
}
function qa(t, e, n) {
  let a;
  return n === "ArrowDown" && e < t.length - 1 ? a = t[e + 1] : n === "ArrowUp" && e > 0 && (a = t[e - 1]), a ? (requestAnimationFrame(() => a.focus()), !0) : !1;
}
const vt = p.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: a = !1, ...o }, s) => {
  const i = p.useRef(null);
  p.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), Ya(i);
  const w = p.useMemo(
    () => i.current ? Qt(i.current) : [],
    [i]
  ), u = p.useCallback(
    (m) => {
      const { current: g } = i;
      if (!g || !g.parentElement) return;
      const h = g.closest("table"), f = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Qt(h).filter(
          (N) => N.tagName === "TR"
        )
      ) : [], v = f.indexOf(g), C = w.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (m.key === "ArrowDown" || m.key === "ArrowUp")
        m.preventDefault(), qa(f, v, m.key);
      else if (m.key === "ArrowLeft" || m.key === "ArrowRight")
        m.preventDefault(), Ua(w, C, m.key);
      else if (m.key === "Escape") {
        m.preventDefault();
        const N = g.closest("table");
        N && N.focus();
      }
      e == null || e(m);
    },
    [i, w, e]
  ), c = p.useCallback(
    (m) => {
      a && (n == null || n(m));
    },
    [a, n]
  );
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: i,
      tabIndex: -1,
      onKeyDown: u,
      onFocus: c,
      className: l(
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
vt.displayName = "TableRow";
const te = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: l(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
te.displayName = "TableHead";
const Pt = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: l("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Pt.displayName = "TableCell";
const Ja = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: l("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Ja.displayName = "TableCaption";
function Ka({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: a = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var N;
  const [w, u] = A([]), [c, m] = A([]), [g, h] = A({}), [f, v] = A({}), C = Cn({
    data: e,
    columns: t,
    getCoreRowModel: Sn(),
    ...n && { getPaginationRowModel: ta() },
    onSortingChange: u,
    getSortedRowModel: _n(),
    onColumnFiltersChange: m,
    getFilteredRowModel: Qr(),
    onColumnVisibilityChange: h,
    onRowSelectionChange: v,
    state: {
      sorting: w,
      columnFilters: c,
      columnVisibility: g,
      rowSelection: f
    }
  });
  return /* @__PURE__ */ d("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ r(Ba, { table: C }),
    /* @__PURE__ */ d(be, { stickyHeader: s, children: [
      /* @__PURE__ */ r(ve, { stickyHeader: s, children: C.getHeaderGroups().map((_) => /* @__PURE__ */ r(vt, { children: _.headers.map((k) => /* @__PURE__ */ r(te, { children: k.isPlaceholder ? void 0 : Jt(k.column.columnDef.header, k.getContext()) }, k.id)) }, _.id)) }),
      /* @__PURE__ */ r(xe, { children: (N = C.getRowModel().rows) != null && N.length ? C.getRowModel().rows.map((_) => /* @__PURE__ */ r(
        vt,
        {
          onClick: () => i(_, C),
          "data-state": _.getIsSelected() && "selected",
          children: _.getVisibleCells().map((k) => /* @__PURE__ */ r(Pt, { children: Jt(k.column.columnDef.cell, k.getContext()) }, k.id))
        },
        _.id
      )) : /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r(Pt, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => C.previousPage(),
          disabled: !C.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        z,
        {
          variant: "outline",
          size: "sm",
          onClick: () => C.nextPage(),
          disabled: !C.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && a && /* @__PURE__ */ r(Ga, { table: C })
  ] });
}
function Zs({ id: t, markdown: e, className: n, anchorTarget: a }) {
  const o = L(
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
  return /* @__PURE__ */ r("div", { id: t, className: l("pr-twp tw-prose", n), children: /* @__PURE__ */ r(aa, { options: o, children: e }) });
}
const Qs = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), hn = (t, e) => t[e] ?? e;
function Wa({ errorDetails: t, handleCopyNotify: e, localizedStrings: n }) {
  const a = hn(n, "%webView_error_dump_header%"), o = hn(n, "%webView_error_dump_info_message%");
  function s() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
      /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
        /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
        /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: o })
      ] }),
      /* @__PURE__ */ r(z, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ r(Mr, {}) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
  ] });
}
function ti({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: a,
  className: o
}) {
  return /* @__PURE__ */ d(oe, { children: [
    /* @__PURE__ */ r(se, { children: a }),
    /* @__PURE__ */ r($t, { className: l("tw-min-w-80 tw-max-w-96", o), children: /* @__PURE__ */ r(
      Wa,
      {
        errorDetails: t,
        handleCopyNotify: e,
        localizedStrings: n
      }
    ) })
  ] });
}
var Za = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Za || {});
function ei({ id: t, label: e, groups: n }) {
  const [a, o] = A(
    Object.fromEntries(
      n.map(
        (c, m) => c.itemType === 0 ? [m, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, i] = A({}), w = (c, m) => {
    const g = !a[c][m];
    o((f) => (f[c][m] = g, { ...f }));
    const h = n[c].items[m];
    h.onUpdate(h.id, g);
  }, u = (c, m) => {
    i((h) => (h[c] = m, { ...h }));
    const g = n[c].items.find((h) => h.id === m);
    g ? g.onUpdate(m) : console.error(`Could not find dropdown radio item with id '${m}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ d(Je, { children: [
    /* @__PURE__ */ r(Bn, { asChild: !0, children: /* @__PURE__ */ d(z, { variant: "default", children: [
      /* @__PURE__ */ r(Dr, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(ue, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(fe, { children: n.map((c, m) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(We, { children: c.label }),
      /* @__PURE__ */ r(jn, { children: c.itemType === 0 ? /* @__PURE__ */ r(Kt, { children: c.items.map((g, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Ke,
        {
          checked: a[m][h],
          onCheckedChange: () => w(m, h),
          children: g.label
        }
      ) }, g.id)) }) : /* @__PURE__ */ r(
        Aa,
        {
          value: s[m],
          onValueChange: (g) => u(m, g),
          children: c.items.map((g) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(Gn, { value: g.id, children: g.label }) }, g.id))
        }
      ) }),
      /* @__PURE__ */ r(ge, {})
    ] }, c.label)) })
  ] }) });
}
function ni({
  id: t,
  category: e,
  downloads: n,
  languages: a,
  moreInfoUrl: o,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: w
}) {
  const u = new Wr("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((m, g) => m + g, 0)), c = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ d(
    "div",
    {
      id: t,
      className: "tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: e }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(zr, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: u })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: a.slice(0, 3).map((m) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: m.toUpperCase() }, m)) }),
          a.length > 3 && /* @__PURE__ */ d(
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
        (o || i) && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          o && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            z,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Or, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            z,
            {
              onClick: () => w(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(Ir, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Qa({ id: t, versionHistory: e }) {
  const [n, a] = A(!1), o = /* @__PURE__ */ new Date();
  function s(w) {
    const u = new Date(w), c = new Date(o.getTime() - u.getTime()), m = c.getUTCFullYear() - 1970, g = c.getUTCMonth(), h = c.getUTCDate() - 1;
    let f = "";
    return m > 0 ? f = `${m.toString()} year${m === 1 ? "" : "s"} ago` : g > 0 ? f = `${g.toString()} month${g === 1 ? "" : "s"} ago` : h === 0 ? f = "today" : f = `${h.toString()} day${h === 1 ? "" : "s"} ago`, f;
  }
  const i = Object.entries(e).sort((w, u) => u[0].localeCompare(w[0]));
  return /* @__PURE__ */ d("div", { id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? i : i.slice(0, 5)).map((w) => /* @__PURE__ */ d("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: w[1].description }) }) }),
      /* @__PURE__ */ d("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ d("div", { children: [
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
        onClick: () => a(!n),
        className: "tw-text-xs tw-text-foreground tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function ri({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: a,
  versionHistory: o
}) {
  const s = L(() => Zr(n), [n]), w = ((u) => {
    const c = new Intl.DisplayNames(navigator.language, { type: "language" });
    return u.map((m) => c.of(m));
  })(a);
  return /* @__PURE__ */ r("div", { id: t, className: "tw-border-t tw-py-2", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    /* @__PURE__ */ r(Qa, { versionHistory: o }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: w.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const to = xt(
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
), de = p.forwardRef(
  ({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, className: l("pr-twp", to({ variant: e }), t), ...n })
);
de.displayName = "Badge";
function eo({
  entries: t,
  getEntriesCount: e = void 0,
  selected: n,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: s = "No entries found",
  customSelectedText: i,
  isDisabled: w = !1,
  sortSelected: u = !1,
  icon: c = void 0,
  className: m = void 0
}) {
  const [g, h] = A(!1), f = F(
    (N) => {
      var k;
      const _ = (k = t.find((M) => M.label === N)) == null ? void 0 : k.value;
      _ && a(
        n.includes(_) ? n.filter((M) => M !== _) : [...n, _]
      );
    },
    [t, n, a]
  ), v = () => i || o, C = L(() => {
    if (!u) return t;
    const N = t.filter((k) => k.starred).sort((k, M) => k.label.localeCompare(M.label)), _ = t.filter((k) => !k.starred).sort((k, M) => {
      const O = n.includes(k.value), q = n.includes(M.value);
      return O && !q ? -1 : !O && q ? 1 : k.label.localeCompare(M.label);
    });
    return [...N, ..._];
  }, [t, n, u]);
  return /* @__PURE__ */ r("div", { className: m, children: /* @__PURE__ */ d(oe, { open: g, onOpenChange: h, children: [
    /* @__PURE__ */ r(se, { asChild: !0, children: /* @__PURE__ */ d(
      z,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": g,
        className: l(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        disabled: w,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: c }) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: l({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ r("div", { className: "tw-font-normal", children: v() })
              }
            )
          ] }),
          /* @__PURE__ */ r(Fe, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r($t, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(ne, { children: [
      /* @__PURE__ */ r(re, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ d(ae, { children: [
        /* @__PURE__ */ r(he, { children: s }),
        /* @__PURE__ */ r(Ot, { children: C.map((N) => {
          const _ = e ? e(N) : void 0;
          return /* @__PURE__ */ d(
            Tt,
            {
              value: N.label,
              onSelect: f,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                  yt,
                  {
                    className: l(
                      "tw-h-4 tw-w-4",
                      n.includes(N.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ r("div", { className: "tw-w-4", children: N.starred && /* @__PURE__ */ r(Ar, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: N.label }),
                e && /* @__PURE__ */ r("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: _ })
              ]
            },
            N.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function ai({
  entries: t,
  getEntriesCount: e,
  selected: n,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: s,
  customSelectedText: i,
  isDisabled: w,
  sortSelected: u,
  icon: c,
  className: m,
  badgesPlaceholder: g
}) {
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      eo,
      {
        entries: t,
        getEntriesCount: e,
        selected: n,
        onChange: a,
        placeholder: o,
        commandEmptyMessage: s,
        customSelectedText: i,
        isDisabled: w,
        sortSelected: u,
        icon: c,
        className: m
      }
    ),
    n.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((h) => {
      var f;
      return /* @__PURE__ */ d(de, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          z,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => a(n.filter((v) => v !== h)),
            children: /* @__PURE__ */ r(Xe, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (f = t.find((v) => v.value === h)) == null ? void 0 : f.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(Y, { children: g })
  ] });
}
function no({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], s = L(() => {
    const i = [];
    return t.forEach((w) => {
      i.some((u) => Ge(u, w)) || i.push(w);
    }), i;
  }, [t]);
  return /* @__PURE__ */ d(be, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(ve, { stickyHeader: !0, children: /* @__PURE__ */ d(vt, { children: [
      /* @__PURE__ */ r(te, { children: a }),
      /* @__PURE__ */ r(te, { children: o })
    ] }) }),
    /* @__PURE__ */ r(xe, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ d(
      vt,
      {
        onClick: () => {
          e(i.reference);
        },
        children: [
          /* @__PURE__ */ r(Pt, { children: `${D.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ r(Pt, { children: i.text })
        ]
      },
      `${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const Ze = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Oe.Root,
  {
    ref: n,
    className: l(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      Oe.Indicator,
      {
        className: l("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(yt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Ze.displayName = Oe.Root.displayName;
const ie = p.forwardRef(
  ({ className: t, type: e, ...n }, a) => /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: l(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: a,
      ...n
    }
  )
);
ie.displayName = "Input";
const Yn = xt(
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
), ro = p.forwardRef(({ className: t, variant: e, size: n, ...a }, o) => /* @__PURE__ */ r(
  Tn.Root,
  {
    ref: o,
    className: l(Yn({ variant: e, size: n, className: t })),
    ...a
  }
));
ro.displayName = Tn.Root.displayName;
const Un = p.createContext({
  size: "default",
  variant: "default"
}), qn = p.forwardRef(({ className: t, variant: e, size: n, children: a, ...o }, s) => {
  const i = U();
  return /* @__PURE__ */ r(
    me.Root,
    {
      ref: s,
      className: l("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: i,
      children: /* @__PURE__ */ r(
        Un.Provider,
        {
          value: { variant: e, size: n },
          children: a
        }
      )
    }
  );
});
qn.displayName = me.Root.displayName;
const we = p.forwardRef(({ className: t, children: e, variant: n, size: a, ...o }, s) => {
  const i = p.useContext(Un);
  return /* @__PURE__ */ r(
    me.Item,
    {
      ref: s,
      className: l(
        Yn({
          variant: i.variant || n,
          size: i.size || a
        }),
        t
      ),
      ...o,
      children: e
    }
  );
});
we.displayName = me.Item.displayName;
const ye = (t) => t === "asc" ? /* @__PURE__ */ r($r, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(Xr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Fr, { className: "tw-ms-2 tw-h-4 tw-w-4" }), oi = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ d(z, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    ye(e.getIsSorted())
  ] })
}), ao = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ d(z, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    ye(n.getIsSorted())
  ] })
}), si = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ d(z, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    ye(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Re = (t, e, n, a, o, s) => {
  let i = [...n];
  t.forEach((u) => {
    e === "approved" ? i.includes(u) || i.push(u) : i = i.filter((c) => c !== u);
  }), a(i);
  let w = [...o];
  t.forEach((u) => {
    e === "unapproved" ? w.includes(u) || w.push(u) : w = w.filter((c) => c !== u);
  }), s(w);
}, ii = (t, e, n, a, o) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ d(z, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    t,
    ye(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), w = s.getValue("item");
    return /* @__PURE__ */ d(qn, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
        we,
        {
          onClick: (u) => {
            u.stopPropagation(), Re(
              [w],
              "approved",
              e,
              n,
              a,
              o
            );
          },
          value: "approved",
          children: /* @__PURE__ */ r(Pr, {})
        }
      ),
      /* @__PURE__ */ r(
        we,
        {
          onClick: (u) => {
            u.stopPropagation(), Re(
              [w],
              "unapproved",
              e,
              n,
              a,
              o
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ r(Br, {})
        }
      ),
      /* @__PURE__ */ r(
        we,
        {
          onClick: (u) => {
            u.stopPropagation(), Re(
              [w],
              "unknown",
              e,
              n,
              a,
              o
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(jr, {})
        }
      )
    ] });
  }
}), wi = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), li = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, di = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, oo = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", ci = Object.freeze([
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
]), so = (t, e, n) => {
  let a = t;
  return e !== "all" && (a = a.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (a = a.filter((o) => o.items[0].includes(n))), a;
}, io = (t, e, n) => {
  const a = [];
  return t.forEach((o) => {
    const s = a.find(
      (i) => Ge(
        i.items,
        Ce(o.inventoryText) ? [o.inventoryText] : o.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: o.verseRef,
        text: o.verse
      });
    else {
      const i = {
        items: Ce(o.inventoryText) ? [o.inventoryText] : o.inventoryText,
        count: 1,
        status: oo(
          Ce(o.inventoryText) ? o.inventoryText : o.inventoryText[0],
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
      a.push(i);
    }
  }), a;
}, mt = (t, e) => t[e] ?? e;
function pi({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: a,
  approvedItems: o,
  unapprovedItems: s,
  scope: i,
  onScopeChange: w,
  columns: u
}) {
  const c = mt(n, "%webView_inventory_all%"), m = mt(n, "%webView_inventory_approved%"), g = mt(n, "%webView_inventory_unapproved%"), h = mt(n, "%webView_inventory_unknown%"), f = mt(n, "%webView_inventory_scope_currentBook%"), v = mt(n, "%webView_inventory_scope_chapter%"), C = mt(n, "%webView_inventory_scope_verse%"), N = mt(n, "%webView_inventory_filter_text%"), _ = mt(
    n,
    "%webView_inventory_show_additional_items%"
  ), [k, M] = A(!1), [O, q] = A("all"), [st, Nt] = A(""), [b, x] = A([]), $ = L(() => t.length === 0 ? [] : io(t, o, s), [t, o, s]), T = L(() => {
    if (k) return $;
    const R = [];
    return $.forEach((W) => {
      const y = W.items[0], S = R.find(
        (X) => X.items[0] === y
      );
      S ? (S.count += W.count, S.occurrences = S.occurrences.concat(W.occurrences)) : R.push({
        items: [y],
        count: W.count,
        occurrences: W.occurrences,
        status: W.status
      });
    }), R;
  }, [k, $]), K = L(() => so(T, O, st), [T, O, st]), pt = L(() => {
    var y, S;
    if (!k) return u;
    const R = (y = a == null ? void 0 : a.tableHeaders) == null ? void 0 : y.length;
    if (!R) return u;
    const W = [];
    for (let X = 0; X < R; X++)
      W.push(
        ao(
          ((S = a == null ? void 0 : a.tableHeaders) == null ? void 0 : S[X]) || "Additional Item",
          X + 1
        )
      );
    return [...W, ...u];
  }, [a == null ? void 0 : a.tableHeaders, u, k]);
  St(() => {
    K.length === 0 ? x([]) : K.length === 1 && x(K[0].items);
  }, [K]);
  const Ft = (R, W) => {
    W.setRowSelection(() => {
      const y = {};
      return y[R.index] = !0, y;
    }), x(R.original.items);
  }, Mt = (R) => {
    if (R === "book" || R === "chapter" || R === "verse")
      w(R);
    else
      throw new Error(`Invalid scope value: ${R}`);
  }, nt = (R) => {
    if (R === "all" || R === "approved" || R === "unapproved" || R === "unknown")
      q(R);
    else
      throw new Error(`Invalid status filter value: ${R}`);
  }, Gt = L(() => {
    if (T.length === 0 || b.length === 0) return [];
    const R = T.filter((W) => Ge(
      k ? W.items : [W.items[0]],
      b
    ));
    if (R.length > 1) throw new Error("Selected item is not unique");
    return R.length === 0 ? [] : R[0].occurrences;
  }, [b, k, T]);
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        It,
        {
          onValueChange: (R) => nt(R),
          defaultValue: O,
          children: [
            /* @__PURE__ */ r(Et, { className: "tw-m-1", children: /* @__PURE__ */ r(At, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(Vt, { children: [
              /* @__PURE__ */ r(ot, { value: "all", children: c }),
              /* @__PURE__ */ r(ot, { value: "approved", children: m }),
              /* @__PURE__ */ r(ot, { value: "unapproved", children: g }),
              /* @__PURE__ */ r(ot, { value: "unknown", children: h })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d(It, { onValueChange: (R) => Mt(R), defaultValue: i, children: [
        /* @__PURE__ */ r(Et, { className: "tw-m-1", children: /* @__PURE__ */ r(At, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(Vt, { children: [
          /* @__PURE__ */ r(ot, { value: "book", children: f }),
          /* @__PURE__ */ r(ot, { value: "chapter", children: v }),
          /* @__PURE__ */ r(ot, { value: "verse", children: C })
        ] })
      ] }),
      /* @__PURE__ */ r(
        ie,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: N,
          value: st,
          onChange: (R) => {
            Nt(R.target.value);
          }
        }
      ),
      a && /* @__PURE__ */ d("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          Ze,
          {
            className: "tw-m-1",
            checked: k,
            onCheckedChange: (R) => {
              M(R);
            }
          }
        ),
        /* @__PURE__ */ r(Y, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (a == null ? void 0 : a.checkboxText) ?? _ })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Ka,
      {
        columns: pt,
        data: K,
        onRowClickHandler: Ft,
        stickyHeader: !0
      }
    ) }),
    Gt.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      no,
      {
        occurrenceData: Gt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const Qe = p.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...a }, o) => /* @__PURE__ */ r(
  Rn.Root,
  {
    ref: o,
    decorative: n,
    orientation: e,
    className: l(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...a
  }
));
Qe.displayName = Rn.Root.displayName;
function fn({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: l("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const tn = ee.Provider, en = ee.Root, nn = ee.Trigger, Ne = p.forwardRef(({ className: t, sideOffset: e = 4, ...n }, a) => /* @__PURE__ */ r(
  ee.Content,
  {
    ref: a,
    sideOffset: e,
    className: l(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
Ne.displayName = ee.Content.displayName;
const wo = "16rem", lo = "3rem", Jn = p.createContext(void 0);
function ke() {
  const t = p.useContext(Jn);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Kn = p.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: a,
    style: o,
    children: s,
    side: i = "primary",
    ...w
  }, u) => {
    const [c, m] = p.useState(t), g = e ?? c, h = p.useCallback(
      (M) => {
        const O = typeof M == "function" ? M(g) : M;
        n ? n(O) : m(O);
      },
      [n, g]
    ), f = p.useCallback(() => h((M) => !M), [h]), v = g ? "expanded" : "collapsed", _ = U() === "ltr" ? i : i === "primary" ? "secondary" : "primary", k = p.useMemo(
      () => ({
        state: v,
        open: g,
        setOpen: h,
        toggleSidebar: f,
        side: _
      }),
      [v, g, h, f, _]
    );
    return /* @__PURE__ */ r(Jn.Provider, { value: k, children: /* @__PURE__ */ r(tn, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": wo,
            "--sidebar-width-icon": lo,
            ...o
          }
        ),
        className: l(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          a
        ),
        ref: u,
        ...w,
        children: s
      }
    ) }) });
  }
);
Kn.displayName = "SidebarProvider";
const Wn = p.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: a, ...o }, s) => {
  const i = ke();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: l(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: s,
      ...o,
      children: a
    }
  ) : /* @__PURE__ */ d(
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
            className: l(
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
            className: l(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              i.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
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
Wn.displayName = "Sidebar";
const co = p.forwardRef(({ className: t, onClick: e, ...n }, a) => {
  const o = ke();
  return /* @__PURE__ */ d(
    z,
    {
      ref: a,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: l("tw-h-7 tw-w-7", t),
      onClick: (s) => {
        e == null || e(s), o.toggleSidebar();
      },
      ...n,
      children: [
        o.side === "primary" ? /* @__PURE__ */ r(Gr, {}) : /* @__PURE__ */ r(Lr, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
co.displayName = "SidebarTrigger";
const po = p.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: a } = ke();
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
        className: l(
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
po.displayName = "SidebarRail";
const Zn = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: l(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
Zn.displayName = "SidebarInset";
const uo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ie,
  {
    ref: n,
    "data-sidebar": "input",
    className: l(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
uo.displayName = "SidebarInput";
const mo = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: l("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
mo.displayName = "SidebarHeader";
const ho = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: l("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
ho.displayName = "SidebarFooter";
const fo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Qe,
  {
    ref: n,
    "data-sidebar": "separator",
    className: l("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
fo.displayName = "SidebarSeparator";
const Qn = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: l(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
Qn.displayName = "SidebarContent";
const Be = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: l("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
Be.displayName = "SidebarGroup";
const je = p.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Bt : "div",
  {
    ref: a,
    "data-sidebar": "group-label",
    className: l(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
je.displayName = "SidebarGroupLabel";
const go = p.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Bt : "button",
  {
    ref: a,
    "data-sidebar": "group-action",
    className: l(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
go.displayName = "SidebarGroupAction";
const $e = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: l("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
$e.displayName = "SidebarGroupContent";
const tr = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: l("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
tr.displayName = "SidebarMenu";
const er = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: l("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
er.displayName = "SidebarMenuItem";
const bo = xt(
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
), nr = p.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: a = "default",
    tooltip: o,
    className: s,
    ...i
  }, w) => {
    const u = t ? Bt : "button", { state: c } = ke(), m = /* @__PURE__ */ r(
      u,
      {
        ref: w,
        "data-sidebar": "menu-button",
        "data-size": a,
        "data-active": e,
        className: l(bo({ variant: n, size: a }), s),
        ...i
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ d(en, { children: [
      /* @__PURE__ */ r(nn, { asChild: !0, children: m }),
      /* @__PURE__ */ r(Ne, { side: "right", align: "center", hidden: c !== "collapsed", ...o })
    ] })) : m;
  }
);
nr.displayName = "SidebarMenuButton";
const vo = p.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...a }, o) => /* @__PURE__ */ r(
  e ? Bt : "button",
  {
    ref: o,
    "data-sidebar": "menu-action",
    className: l(
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
vo.displayName = "SidebarMenuAction";
const xo = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: l(
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
xo.displayName = "SidebarMenuBadge";
const yo = p.forwardRef(({ className: t, showIcon: e = !1, ...n }, a) => {
  const o = p.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
    "div",
    {
      ref: a,
      "data-sidebar": "menu-skeleton",
      className: l("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(fn, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          fn,
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
yo.displayName = "SidebarMenuSkeleton";
const No = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: l(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
No.displayName = "SidebarMenuSub";
const ko = p.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
ko.displayName = "SidebarMenuSubItem";
const Co = p.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: a, ...o }, s) => /* @__PURE__ */ r(
  t ? Bt : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: l(
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
Co.displayName = "SidebarMenuSubButton";
function _o({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: a,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: w,
  className: u
}) {
  const c = F(
    (h, f) => {
      a(h, f);
    },
    [a]
  ), m = F(
    (h) => {
      const f = n.find((v) => v.projectId === h);
      return f ? f.projectName : h;
    },
    [n]
  ), g = F(
    (h) => !o.projectId && h === o.label,
    [o]
  );
  return /* @__PURE__ */ r(
    Wn,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: l("tw-w-96 tw-gap-2 tw-overflow-y-auto", u),
      children: /* @__PURE__ */ d(Qn, { children: [
        /* @__PURE__ */ d(Be, { children: [
          /* @__PURE__ */ r(je, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r($e, { children: /* @__PURE__ */ r(tr, { children: Object.entries(e).map(([h, f]) => /* @__PURE__ */ r(er, { children: /* @__PURE__ */ r(
            nr,
            {
              onClick: () => c(h),
              isActive: g(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: f })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ d(Be, { children: [
          /* @__PURE__ */ r(je, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r($e, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            Pe,
            {
              buttonVariant: "ghost",
              buttonClassName: l("tw-w-full", {
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
              icon: /* @__PURE__ */ r(Hr, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const rn = xn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: a, className: o, isDisabled: s = !1 }, i) => {
    const w = U();
    return /* @__PURE__ */ d("div", { className: l("tw-relative", { "tw-w-full": a }, o), children: [
      /* @__PURE__ */ r(
        Nn,
        {
          className: l(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": w === "rtl" },
            { "tw-left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        ie,
        {
          ref: i,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (u) => e(u.target.value),
          disabled: s
        }
      ),
      t && /* @__PURE__ */ d(
        z,
        {
          variant: "ghost",
          size: "icon",
          className: l(
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
rn.displayName = "SearchBar";
function ui({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: a,
  handleSelectSidebarItem: o,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: w,
  extensionsSidebarGroupLabel: u,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: m
}) {
  return /* @__PURE__ */ d("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      rn,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: w,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ d(
      Kn,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            _o,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: o,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: u,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: m
            }
          ),
          /* @__PURE__ */ r(Zn, { className: "tw-min-w-[215px]", children: a })
        ]
      }
    )
  ] });
}
const gt = "scrBook", So = "scrRef", _t = "source", To = "details", Ro = "Scripture Reference", Eo = "Scripture Book", rr = "Type", Vo = "Details";
function Mo(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (a) => `${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,
      id: gt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Ro,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? D.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === gt ? qt(o.start) : void 0;
      },
      getGroupingValue: (a) => D.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => ze(a.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => qt(a.start),
      id: So,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : qt(o.start);
      },
      sortingFn: (a, o) => ze(a.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (a) => a.source.displayName,
      id: _t,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? rr : void 0,
      cell: (a) => n || a.row.getIsGrouped() ? a.getValue() : void 0,
      getGroupingValue: (a) => a.source.id,
      sortingFn: (a, o) => a.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => a.detail,
      id: To,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Vo,
      cell: (a) => a.getValue(),
      enableGrouping: !1
    }
  ];
}
const Do = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || ze(t.start, t.end) === 0 ? `${_e(t.start)}+${e}` : `${_e(t.start)}+${e}-${_e(t.end)}+${n}`;
}, gn = (t) => `${Do({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function mi({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: a,
  scriptureBookGroupName: o,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: w
}) {
  const [u, c] = A([]), [m, g] = A([{ id: gt, desc: !1 }]), [h, f] = A({}), v = L(
    () => t.flatMap((b) => b.data.map((x) => ({
      ...x,
      source: b.source
    }))),
    [t]
  ), C = L(
    () => Mo(
      {
        scriptureReferenceColumnName: a,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [a, s, i, n]
  );
  St(() => {
    u.includes(_t) ? g([
      { id: _t, desc: !1 },
      { id: gt, desc: !1 }
    ]) : g([{ id: gt, desc: !1 }]);
  }, [u]);
  const N = Cn({
    data: v,
    columns: C,
    state: {
      grouping: u,
      sorting: m,
      rowSelection: h
    },
    onGroupingChange: c,
    onSortingChange: g,
    onRowSelectionChange: f,
    getExpandedRowModel: na(),
    getGroupedRowModel: ea(),
    getCoreRowModel: Sn(),
    getSortedRowModel: _n(),
    getRowId: gn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  St(() => {
    if (w) {
      const b = N.getSelectedRowModel().rowsById, x = Object.keys(b);
      if (x.length === 1) {
        const $ = v.find((T) => gn(T) === x[0]) || void 0;
        $ && w($);
      }
    }
  }, [h, v, w, N]);
  const _ = o ?? Eo, k = s ?? rr, M = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${_}`, value: [gt] },
    { label: `Group by ${k}`, value: [_t] },
    {
      label: `Group by ${_} and ${k}`,
      value: [gt, _t]
    },
    {
      label: `Group by ${k} and ${_}`,
      value: [_t, gt]
    }
  ], O = (b) => {
    c(JSON.parse(b));
  }, q = (b, x) => {
    !b.getIsGrouped() && !b.getIsSelected() && b.getToggleSelectedHandler()(x);
  }, st = (b, x) => b.getIsGrouped() ? "" : l("banded-row", x % 2 === 0 ? "even" : "odd"), Nt = (b, x, $) => {
    if (!((b == null ? void 0 : b.length) === 0 || x.depth < $.column.getGroupedIndex())) {
      if (x.getIsGrouped())
        switch (x.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (x.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ d(
      It,
      {
        value: JSON.stringify(u),
        onValueChange: (b) => {
          O(b);
        },
        children: [
          /* @__PURE__ */ r(Et, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(At, {}) }),
          /* @__PURE__ */ r(Vt, { position: "item-aligned", children: /* @__PURE__ */ r(ja, { children: M.map((b) => /* @__PURE__ */ r(ot, { value: JSON.stringify(b.value), children: b.label }, b.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(be, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(ve, { children: N.getHeaderGroups().map((b) => /* @__PURE__ */ r(vt, { children: b.headers.filter((x) => x.column.columnDef.header).map((x) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(te, { colSpan: x.colSpan, className: "top-0 tw-sticky", children: x.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
          x.column.getCanGroup() ? /* @__PURE__ */ r(
            z,
            {
              variant: "ghost",
              title: `Toggle grouping by ${x.column.columnDef.header}`,
              onClick: x.column.getToggleGroupingHandler(),
              type: "button",
              children: x.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Jt(x.column.columnDef.header, x.getContext())
        ] }) }, x.id)
      )) }, b.id)) }),
      /* @__PURE__ */ r(xe, { children: N.getRowModel().rows.map((b, x) => {
        const $ = U();
        return /* @__PURE__ */ r(
          vt,
          {
            "data-state": b.getIsSelected() ? "selected" : "",
            className: l(st(b, x)),
            onClick: (T) => q(b, T),
            children: b.getVisibleCells().map((T) => {
              if (!(T.getIsPlaceholder() || T.column.columnDef.enableGrouping && !T.getIsGrouped() && (T.column.columnDef.id !== _t || !n)))
                return /* @__PURE__ */ r(
                  Pt,
                  {
                    className: l(
                      T.column.columnDef.id,
                      "tw-p-[1px]",
                      Nt(u, b, T)
                    ),
                    children: T.getIsGrouped() ? /* @__PURE__ */ d(
                      z,
                      {
                        variant: "link",
                        onClick: b.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          b.getIsExpanded() && /* @__PURE__ */ r(ue, {}),
                          !b.getIsExpanded() && ($ === "ltr" ? /* @__PURE__ */ r(zt, {}) : /* @__PURE__ */ r(De, {})),
                          " ",
                          Jt(T.column.columnDef.cell, T.getContext()),
                          " (",
                          b.subRows.length,
                          ")"
                        ]
                      }
                    ) : Jt(T.column.columnDef.cell, T.getContext())
                  },
                  T.id
                );
            })
          },
          b.id
        );
      }) })
    ] })
  ] });
}
var bt = /* @__PURE__ */ ((t) => (t.OT = "OT", t.NT = "NT", t.DC = "DC", t.Extra = "Extra", t))(bt || {});
const zo = (t, e, n, a, o) => {
  switch (t) {
    case "OT":
      return e ?? "Old Testament";
    case "NT":
      return n ?? "New Testament";
    case "DC":
      return a ?? "Deuterocanon";
    case "Extra":
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Oo = (t, e, n, a, o) => {
  switch (t) {
    case "OT":
      return e ?? "OT";
    case "NT":
      return n ?? "NT";
    case "DC":
      return a ?? "DC";
    case "Extra":
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Dt = (t) => {
  if (D.isBookOT(t)) return "OT";
  if (D.isBookNT(t)) return "NT";
  if (D.isBookDC(t)) return "DC";
  if (D.isExtraMaterial(t)) return "Extra";
  throw new Error(`Unknown section for book: ${t}`);
}, an = (t, e) => t.filter((n) => {
  try {
    return Dt(n) === e;
  } catch {
    return !1;
  }
}), ar = (t, e, n) => an(t, e).every((a) => n.includes(a));
function Io({
  bookId: t,
  selectedBookIds: e,
  toggleBook: n,
  lastKeyEventShiftKey: a,
  localizedBookNames: o
}) {
  var w, u;
  const s = H(!1), i = H();
  return /* @__PURE__ */ d(
    Tt,
    {
      value: t,
      className: "tw-flex tw-items-center",
      onSelect: () => {
        s.current || (n(t, a.current), a.current = !1), i.current && clearTimeout(i.current), i.current = setTimeout(() => {
          s.current = !1;
        }, 100);
      },
      onMouseDown: (c) => {
        c.preventDefault(), s.current = !0, n(t, c.shiftKey);
      },
      role: "option",
      "aria-selected": e.includes(t),
      "aria-label": `${D.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
      children: [
        /* @__PURE__ */ r(
          yt,
          {
            className: l(
              "tw-me-2 tw-h-4 tw-w-4",
              e.includes(t) ? "tw-opacity-100" : "tw-opacity-0"
            )
          }
        ),
        /* @__PURE__ */ r(
          "span",
          {
            className: l(
              "tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-border-s-red-200": Dt(t) === bt.OT,
                "tw-border-s-purple-200": Dt(t) === bt.NT,
                "tw-border-s-indigo-200": Dt(t) === bt.DC,
                "tw-border-s-yellow-200": Dt(t) === bt.Extra
              }
            ),
            children: o && ((w = o.get(t)) == null ? void 0 : w.localizedName) || D.bookIdToEnglishName(t)
          }
        ),
        /* @__PURE__ */ r("span", { className: "tw-ml-2 tw-text-xs tw-text-muted-foreground", children: o && ((u = o.get(t)) == null ? void 0 : u.localizedId) || t.toLocaleUpperCase() })
      ]
    },
    t
  );
}
function Ao({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: a,
  localizedStrings: o
}) {
  const s = an(e, t).length === 0, i = o["%scripture_section_ot_short%"], w = o["%scripture_section_nt_short%"], u = o["%scripture_section_dc_short%"], c = o["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    z,
    {
      variant: "outline",
      size: "sm",
      onClick: () => a(t),
      className: l(
        ar(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: Oo(
        t,
        i,
        w,
        u,
        c
      )
    }
  );
}
const bn = 5, Ee = 6;
function Po({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: a,
  localizedBookNames: o
}) {
  const s = a["%webView_book_selector_books_selected%"], i = a["%webView_book_selector_select_books%"], w = a["%webView_book_selector_search_books%"], u = a["%webView_book_selector_select_all%"], c = a["%webView_book_selector_clear_all%"], m = a["%webView_book_selector_no_book_found%"], g = a["%webView_book_selector_more%"], h = a["%scripture_section_ot_long%"], f = a["%scripture_section_nt_long%"], v = a["%scripture_section_dc_long%"], C = a["%scripture_section_extra_long%"], [N, _] = A(!1), k = H(void 0), M = H(!1);
  if (t.length !== D.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const O = L(() => D.allBookIds.filter(
    (x, $) => t[$] === "1" && !D.isObsolete(D.bookIdToNumber(x))
  ), [t]), q = F(
    (x, $ = !1) => {
      if (!$ || !k.current) {
        n(
          e.includes(x) ? e.filter((nt) => nt !== x) : [...e, x]
        ), k.current = x;
        return;
      }
      const T = O.findIndex((nt) => nt === k.current), K = O.findIndex((nt) => nt === x);
      if (T === -1 || K === -1) return;
      const [pt, Ft] = [
        Math.min(T, K),
        Math.max(T, K)
      ], Mt = O.slice(pt, Ft + 1).map((nt) => nt);
      n(
        e.includes(x) ? e.filter((nt) => !Mt.includes(nt)) : [.../* @__PURE__ */ new Set([...e, ...Mt])]
      );
    },
    [e, n, O]
  ), st = F(
    (x) => {
      const $ = an(O, x).map((T) => T);
      n(
        ar(O, x, e) ? e.filter((T) => !$.includes(T)) : [.../* @__PURE__ */ new Set([...e, ...$])]
      );
    },
    [e, n, O]
  ), Nt = () => {
    n(O.map((x) => x));
  }, b = () => {
    n([]);
  };
  return /* @__PURE__ */ d("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(bt).map((x) => /* @__PURE__ */ r(
      Ao,
      {
        section: x,
        availableBookIds: O,
        selectedBookIds: e,
        onToggle: st,
        localizedStrings: a
      },
      x
    )) }),
    /* @__PURE__ */ d(oe, { open: N, onOpenChange: _, children: [
      /* @__PURE__ */ r(se, { asChild: !0, children: /* @__PURE__ */ d(
        z,
        {
          variant: "outline",
          role: "combobox",
          "aria-expanded": N,
          className: "tw-max-w-64 tw-justify-between",
          children: [
            e.length > 0 ? `${s}: ${e.length}` : i,
            /* @__PURE__ */ r(Fe, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ r($t, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ d(
        ne,
        {
          onKeyDown: (x) => {
            x.key === "Enter" && (M.current = x.shiftKey);
          },
          children: [
            /* @__PURE__ */ r(re, { placeholder: w }),
            /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
              /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: Nt, children: u }),
              /* @__PURE__ */ r(z, { variant: "ghost", size: "sm", onClick: b, children: c })
            ] }),
            /* @__PURE__ */ d(ae, { children: [
              /* @__PURE__ */ r(he, { children: m }),
              Object.values(bt).map((x, $) => {
                const T = O.filter(
                  (K) => Dt(K) === x
                );
                if (T.length !== 0)
                  return /* @__PURE__ */ d(yn, { children: [
                    /* @__PURE__ */ r(
                      Ot,
                      {
                        heading: zo(
                          x,
                          h,
                          f,
                          v,
                          C
                        ),
                        children: T.map((K) => /* @__PURE__ */ r(
                          Io,
                          {
                            bookId: K,
                            selectedBookIds: e,
                            toggleBook: q,
                            lastKeyEventShiftKey: M,
                            localizedBookNames: o
                          },
                          K
                        ))
                      }
                    ),
                    $ < Object.values(bt).length - 1 && /* @__PURE__ */ r(Vn, {})
                  ] }, x);
              })
            ] })
          ]
        }
      ) })
    ] }),
    e.length > 0 && /* @__PURE__ */ d("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      e.slice(
        0,
        e.length === Ee ? Ee : bn
      ).map((x) => {
        var $;
        return /* @__PURE__ */ r(de, { className: "hover:tw-bg-secondary", variant: "secondary", children: o && (($ = o.get(x)) == null ? void 0 : $.localizedName) || D.bookIdToEnglishName(x) || x }, x);
      }),
      e.length > Ee && /* @__PURE__ */ r(
        de,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - bn} ${g}`
        }
      )
    ] })
  ] });
}
const hi = Object.freeze([
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
]), kt = (t, e) => t[e] ?? e;
function fi({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: a,
  selectedBookIds: o,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: w
}) {
  const u = kt(
    i,
    "%webView_scope_selector_selected_text%"
  ), c = kt(
    i,
    "%webView_scope_selector_current_verse%"
  ), m = kt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), g = kt(i, "%webView_scope_selector_current_book%"), h = kt(i, "%webView_scope_selector_choose_books%"), f = kt(i, "%webView_scope_selector_scope%"), v = kt(i, "%webView_scope_selector_select_books%"), C = [
    { value: "selectedText", label: u, id: "scope-selected-text" },
    { value: "verse", label: c, id: "scope-verse" },
    { value: "chapter", label: m, id: "scope-chapter" },
    { value: "book", label: g, id: "scope-book" },
    { value: "selectedBooks", label: h, id: "scope-selected" }
  ], N = e ? C.filter((_) => e.includes(_.value)) : C;
  return /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Y, { children: f }),
      /* @__PURE__ */ r(
        Ue,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: N.map(({ value: _, label: k, id: M }) => /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(le, { className: "tw-me-2", value: _, id: M }),
            /* @__PURE__ */ r(Y, { htmlFor: M, children: k })
          ] }, M))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Y, { children: v }),
      /* @__PURE__ */ r(
        Po,
        {
          availableBookInfo: a,
          selectedBookIds: o,
          onChangeSelectedBookIds: s,
          localizedStrings: i,
          localizedBookNames: w
        }
      )
    ] })
  ] });
}
const Ve = {
  [I("undefined")]: "Ø",
  [I(0)]: "A",
  [I(1)]: "B",
  [I(2)]: "C",
  [I(3)]: "D",
  [I(4)]: "E",
  [I(5)]: "F",
  [I(6)]: "G",
  [I(7)]: "H",
  [I(8)]: "I",
  [I(9)]: "J",
  [I(10)]: "K",
  [I(11)]: "L",
  [I(12)]: "M",
  [I(13)]: "N",
  [I(14)]: "O",
  [I(15)]: "P",
  [I(16)]: "Q",
  [I(17)]: "R",
  [I(18)]: "S",
  [I(19)]: "T",
  [I(20)]: "U",
  [I(21)]: "V",
  [I(22)]: "W",
  [I(23)]: "X",
  [I(24)]: "Y",
  [I(25)]: "Z"
};
function gi({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: a = {},
  size: o = "sm",
  className: s
}) {
  const i = {
    ...Ve,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([u, c]) => [
          u,
          u === c && u in Ve ? Ve[u] : c
        ]
      )
    )
  }, w = U();
  return /* @__PURE__ */ d(
    It,
    {
      value: `${e}`,
      onValueChange: (u) => n(
        u === "undefined" ? void 0 : parseInt(u, 10)
      ),
      children: [
        /* @__PURE__ */ r(Et, { size: o, className: l("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          At,
          {
            placeholder: i[I(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Vt,
          {
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((u) => /* @__PURE__ */ r(ot, { value: `${u}`, children: i[I(u)] }, `${u}`))
          }
        )
      ]
    }
  );
}
function bi({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function vi({
  primary: t,
  secondary: e,
  children: n,
  isLoading: a = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    a ? /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function xi({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(Qe, {}) : ""
  ] });
}
function or(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, a]) => "menuItem" in a && a.menuItem === e
  )) == null ? void 0 : n[0];
}
function ce({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: l("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const sr = (t, e, n, a) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((w) => w.group === s).sort((w, u) => w.order - u.order).map((w) => /* @__PURE__ */ d(en, { children: [
  /* @__PURE__ */ r(nn, { asChild: !0, children: "command" in w ? /* @__PURE__ */ d(
    Fn,
    {
      onClick: () => {
        a(w);
      },
      children: [
        w.iconPathBefore && /* @__PURE__ */ r(ce, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
        w.label,
        w.iconPathAfter && /* @__PURE__ */ r(ce, { icon: w.iconPathAfter, menuLabel: w.label })
      ]
    },
    `dropdown-menu-item-${w.label}-${w.command}`
  ) : /* @__PURE__ */ d(Ia, { children: [
    /* @__PURE__ */ r($n, { children: w.label }),
    /* @__PURE__ */ r(Oa, { children: /* @__PURE__ */ r(Xn, { children: sr(
      t,
      e,
      or(t, w.id),
      a
    ) }) })
  ] }, `dropdown-menu-sub-${w.label}-${w.id}`) }),
  w.tooltip && /* @__PURE__ */ r(Ne, { children: w.tooltip })
] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`))) : void 0;
function vn({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: a,
  className: o,
  variant: s,
  id: i
}) {
  return /* @__PURE__ */ d(Je, { variant: s, children: [
    /* @__PURE__ */ r(Bn, { "aria-label": n, className: o, asChild: !0, id: i, children: /* @__PURE__ */ r(z, { variant: "ghost", size: "icon", children: a ?? /* @__PURE__ */ r(Yr, {}) }) }),
    /* @__PURE__ */ r(fe, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, u]) => typeof w == "boolean" || typeof u == "boolean" ? 0 : w.order - u.order).map(([w], u, c) => /* @__PURE__ */ d(yn, { children: [
      /* @__PURE__ */ r(jn, { children: /* @__PURE__ */ r(tn, { children: sr(e.groups, e.items, w, t) }) }),
      u < c.length - 1 && /* @__PURE__ */ r(ge, {})
    ] }, w)) })
  ] });
}
function yi({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: a,
  id: o,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: w,
  endAreaChildren: u
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      className: l(
        "tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-start tw-justify-between tw-overflow-clip tw-border-b tw-border-border tw-text-foreground tw-@container/toolbar *:tw-p-2",
        s
      ),
      id: o,
      children: [
        n && // div wrapper gets padding instead of the button
        /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
          vn,
          {
            onSelectMenuItem: t,
            menuData: n,
            tabLabel: "Project",
            icon: /* @__PURE__ */ r(Ur, {}),
            className: "tw-h-8 tw-w-8"
          }
        ) }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: w }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
          a && // div wrapper gets padding instead of the button
          /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
            vn,
            {
              onSelectMenuItem: e,
              menuData: a,
              tabLabel: "View Info",
              icon: /* @__PURE__ */ r(qr, {}),
              className: "tw-h-8"
            }
          ) }),
          u
        ] })
      ]
    }
  );
}
const ir = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ r(
    et.Root,
    {
      orientation: "vertical",
      ref: n,
      className: l("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: a
    }
  );
});
ir.displayName = et.List.displayName;
const wr = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  et.List,
  {
    ref: n,
    className: l(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
wr.displayName = et.List.displayName;
const Bo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  et.Trigger,
  {
    ref: n,
    ...e,
    className: l(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), lr = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  et.Content,
  {
    ref: n,
    className: l(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
lr.displayName = et.Content.displayName;
function Ni({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: a,
  headerTitle: o,
  searchClassName: s
}) {
  return /* @__PURE__ */ d("div", { className: "pr-twp", children: [
    /* @__PURE__ */ d("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ r("h1", { children: o }) : "",
      /* @__PURE__ */ r(
        rn,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: a
        }
      )
    ] }),
    /* @__PURE__ */ d(ir, { children: [
      /* @__PURE__ */ r(wr, { children: t.map((i) => /* @__PURE__ */ r(Bo, { value: i.value, children: i.value }, i.key)) }),
      t.map((i) => /* @__PURE__ */ r(lr, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
function jo({ ...t }) {
  return /* @__PURE__ */ r(B.Menu, { ...t });
}
function $o({ ...t }) {
  return /* @__PURE__ */ r(B.Sub, { "data-slot": "menubar-sub", ...t });
}
const dr = p.forwardRef(({ className: t, variant: e = "default", ...n }, a) => {
  const o = p.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(qe.Provider, { value: o, children: /* @__PURE__ */ r(
    B.Root,
    {
      ref: a,
      className: l(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...n
    }
  ) });
});
dr.displayName = B.Root.displayName;
const cr = p.forwardRef(({ className: t, ...e }, n) => {
  const a = wt();
  return /* @__PURE__ */ r(
    B.Trigger,
    {
      ref: n,
      className: l(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        ht({ variant: a.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
cr.displayName = B.Trigger.displayName;
const pr = p.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = wt();
  return /* @__PURE__ */ d(
    B.SubTrigger,
    {
      ref: o,
      className: l(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        ht({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(zt, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
pr.displayName = B.SubTrigger.displayName;
const ur = p.forwardRef(({ className: t, ...e }, n) => {
  const a = wt();
  return /* @__PURE__ */ r(
    B.SubContent,
    {
      ref: n,
      className: l(
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
ur.displayName = B.SubContent.displayName;
const mr = p.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: a = 8, ...o }, s) => {
  const i = wt();
  return /* @__PURE__ */ r(B.Portal, { children: /* @__PURE__ */ r(
    B.Content,
    {
      ref: s,
      align: e,
      alignOffset: n,
      sideOffset: a,
      className: l(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": i.variant === "muted"
        },
        t
      ),
      ...o
    }
  ) });
});
mr.displayName = B.Content.displayName;
const hr = p.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = wt();
  return /* @__PURE__ */ r(
    B.Item,
    {
      ref: a,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        ht({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
hr.displayName = B.Item.displayName;
const Xo = p.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = wt();
  return /* @__PURE__ */ d(
    B.CheckboxItem,
    {
      ref: o,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ht({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(B.ItemIndicator, { children: /* @__PURE__ */ r(yt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Xo.displayName = B.CheckboxItem.displayName;
const Fo = p.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = wt();
  return /* @__PURE__ */ d(
    B.RadioItem,
    {
      ref: a,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ht({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(B.ItemIndicator, { children: /* @__PURE__ */ r(pe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Fo.displayName = B.RadioItem.displayName;
const Go = p.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  B.Label,
  {
    ref: a,
    className: l("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Go.displayName = B.Label.displayName;
const fr = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  B.Separator,
  {
    ref: n,
    className: l("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
fr.displayName = B.Separator.displayName;
const Yt = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var a;
      (a = t.current) == null || a.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, gr = (t, e, n, a) => {
  if (!n) return;
  const o = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return o.flatMap(([s], i) => {
    const w = e.filter((c) => c.group === s).sort((c, m) => c.order - m.order).map((c) => /* @__PURE__ */ d(en, { children: [
      /* @__PURE__ */ r(nn, { asChild: !0, children: "command" in c ? /* @__PURE__ */ d(
        hr,
        {
          onClick: () => {
            a(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(ce, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(ce, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ d($o, { children: [
        /* @__PURE__ */ r(pr, { children: c.label }),
        /* @__PURE__ */ r(ur, { children: gr(
          t,
          e,
          or(t, c.id),
          a
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(Ne, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), u = [...w];
    return w.length > 0 && i < o.length - 1 && u.push(/* @__PURE__ */ r(fr, {}, `separator-${s}`)), u;
  });
};
function Lo({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: a
}) {
  const o = H(void 0), s = H(void 0), i = H(void 0), w = H(void 0), u = H(void 0), c = (m) => {
    switch (m) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return w;
      case "platform.help":
        return u;
      default:
        return;
    }
  };
  if (oa(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (m, g) => {
    var v, C, N, _;
    m.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, f = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (g.hotkey) {
      case "alt":
        Yt(s, [h]);
        break;
      case "alt+p":
        (v = s.current) == null || v.focus(), Yt(s, [h, f]);
        break;
      case "alt+l":
        (C = i.current) == null || C.focus(), Yt(i, [h, f]);
        break;
      case "alt+n":
        (N = w.current) == null || N.focus(), Yt(w, [h, f]);
        break;
      case "alt+h":
        (_ = u.current) == null || _.focus(), Yt(u, [h, f]);
        break;
    }
  }), St(() => {
    if (!n || !o.current) return;
    const m = new MutationObserver((f) => {
      f.forEach((v) => {
        if (v.attributeName === "data-state" && v.target instanceof HTMLElement) {
          const C = v.target.getAttribute("data-state");
          n(C === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((f) => {
      m.observe(f, { attributes: !0 });
    }), () => m.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(dr, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, m]) => typeof m == "object").sort(([, m], [, g]) => typeof m == "boolean" || typeof g == "boolean" ? 0 : m.order - g.order).map(([m, g]) => /* @__PURE__ */ d(jo, { children: [
      /* @__PURE__ */ r(cr, { ref: c(m), children: typeof g == "object" && "label" in g && g.label }),
      /* @__PURE__ */ r(
        mr,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(tn, { children: gr(t.groups, t.items, m, e) })
        }
      )
    ] }, m)) });
}
function ki(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Ci({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: a,
  id: o,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: w,
  shouldUseAsAppDragArea: u,
  menubarVariant: c = "default"
}) {
  const m = H(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: l("tw-border tw-px-4 tw-text-foreground", a),
      ref: m,
      style: { position: "relative" },
      id: o,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: u ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: u ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ r(
                    Lo,
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
                style: u ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: u ? { WebkitAppRegion: "no-drag" } : void 0,
                children: w
              }
            ) })
          ]
        }
      )
    }
  );
}
const Ho = (t, e) => t[e] ?? e;
function _i({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: a,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: w
}) {
  const u = Ho(
    i,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [c, m] = A(!1), g = (f) => {
    o && o(f), a && a([f, ...n.filter((v) => v !== f)]), s && n.find((v) => v === f) && s([...n.filter((v) => v !== f)]), m(!1);
  }, h = (f, v) => {
    var N, _, k, M, O, q;
    const C = v !== f ? ((_ = (N = t[f]) == null ? void 0 : N.uiNames) == null ? void 0 : _[v]) ?? ((M = (k = t[f]) == null ? void 0 : k.uiNames) == null ? void 0 : M.en) : void 0;
    return C ? `${(O = t[f]) == null ? void 0 : O.autonym} (${C})` : (q = t[f]) == null ? void 0 : q.autonym;
  };
  return /* @__PURE__ */ d("div", { className: l("pr-twp tw-max-w-sm", w), children: [
    /* @__PURE__ */ d(
      It,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: g,
        open: c,
        onOpenChange: (f) => m(f),
        children: [
          /* @__PURE__ */ r(Et, { children: /* @__PURE__ */ r(At, {}) }),
          /* @__PURE__ */ r(
            Vt,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((f) => /* @__PURE__ */ r(ot, { value: f, children: h(f, e) }, f))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ d(Kt, { children: [
      /* @__PURE__ */ r(Y, { className: "tw-ms-3", children: u }),
      /* @__PURE__ */ r("div", { className: "tw-ms-3", children: /* @__PURE__ */ d(Y, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((f) => h(f, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
function Yo({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(Y, { children: e(t) }) : n ? /* @__PURE__ */ r(Y, { children: n(t) }) : /* @__PURE__ */ r(Y, { children: t });
}
function Si({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: a,
  handleSelectListItem: o,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((w) => /* @__PURE__ */ d("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      Ze,
      {
        className: "tw-me-2 tw-align-middle",
        checked: a.includes(w),
        onCheckedChange: (u) => o(w, u)
      }
    ),
    /* @__PURE__ */ r(
      Yo,
      {
        item: w,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, w)) });
}
const Uo = xn(({ className: t, ...e }, n) => /* @__PURE__ */ r(Jr, { size: 35, className: l("tw-animate-spin", t), ...e, ref: n }));
Uo.displayName = "Spinner";
function Ti({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: a = !1,
  helperText: o,
  label: s,
  placeholder: i,
  isRequired: w = !1,
  className: u,
  defaultValue: c,
  value: m,
  onChange: g,
  onFocus: h,
  onBlur: f
}) {
  return /* @__PURE__ */ d("div", { className: l("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": a }), children: [
    /* @__PURE__ */ r(
      Y,
      {
        htmlFor: t,
        className: l({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${w ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      ie,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: w,
        className: l(u, { "tw-border-red-600": n }),
        defaultValue: c,
        value: m,
        onChange: g,
        onFocus: h,
        onBlur: f
      }
    ),
    /* @__PURE__ */ r("p", { className: l({ "tw-hidden": !o }), children: o })
  ] });
}
const qo = xt(
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
), Jo = p.forwardRef(({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, role: "alert", className: l(qo({ variant: e }), t), ...n }));
Jo.displayName = "Alert";
const Ko = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ d(
    "h5",
    {
      ref: n,
      className: l("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
Ko.displayName = "AlertTitle";
const Wo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: l("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Wo.displayName = "AlertDescription";
const Zo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  jt.Root,
  {
    ref: n,
    className: l(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Zo.displayName = jt.Root.displayName;
const Qo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  jt.Image,
  {
    ref: n,
    className: l("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
Qo.displayName = jt.Image.displayName;
const ts = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  jt.Fallback,
  {
    ref: n,
    className: l(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
ts.displayName = jt.Fallback.displayName;
const es = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: l(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
es.displayName = "Card";
const ns = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: l("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
ns.displayName = "CardHeader";
const rs = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "h3",
    {
      ref: n,
      className: l(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
rs.displayName = "CardTitle";
const as = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: l("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
as.displayName = "CardDescription";
const os = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: l("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
os.displayName = "CardContent";
const ss = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: l("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
ss.displayName = "CardFooter";
const Ri = j.Root, Ei = j.Trigger, Vi = j.Group, Mi = j.Portal, Di = j.Sub, zi = j.RadioGroup, is = p.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => /* @__PURE__ */ d(
  j.SubTrigger,
  {
    ref: o,
    className: l(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      e && "tw-pl-8",
      t
    ),
    ...a,
    children: [
      n,
      /* @__PURE__ */ r(zt, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
is.displayName = j.SubTrigger.displayName;
const ws = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  j.SubContent,
  {
    ref: n,
    className: l(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
ws.displayName = j.SubContent.displayName;
const ls = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(j.Portal, { children: /* @__PURE__ */ r(
  j.Content,
  {
    ref: n,
    className: l(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
ls.displayName = j.Content.displayName;
const ds = p.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  j.Item,
  {
    ref: a,
    className: l(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
ds.displayName = j.Item.displayName;
const cs = p.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => /* @__PURE__ */ d(
  j.CheckboxItem,
  {
    ref: o,
    className: l(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...a,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(j.ItemIndicator, { children: /* @__PURE__ */ r(yt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
cs.displayName = j.CheckboxItem.displayName;
const ps = p.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ d(
  j.RadioItem,
  {
    ref: a,
    className: l(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(j.ItemIndicator, { children: /* @__PURE__ */ r(pe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
ps.displayName = j.RadioItem.displayName;
const us = p.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  j.Label,
  {
    ref: a,
    className: l(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
us.displayName = j.Label.displayName;
const ms = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  j.Separator,
  {
    ref: n,
    className: l("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
ms.displayName = j.Separator.displayName;
function hs({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: l("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
hs.displayName = "ContextMenuShortcut";
const br = p.createContext({
  direction: "bottom"
});
function fs({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const a = p.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(br.Provider, { value: a, children: /* @__PURE__ */ r(
    it.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
fs.displayName = "Drawer";
const Oi = it.Trigger, gs = it.Portal, Ii = it.Close, vr = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  it.Overlay,
  {
    ref: n,
    className: l("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
vr.displayName = it.Overlay.displayName;
const bs = p.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...a }, o) => {
  const { direction: s = "bottom" } = p.useContext(br), i = {
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
  return /* @__PURE__ */ d(gs, { children: [
    /* @__PURE__ */ r(vr, {}),
    /* @__PURE__ */ d(
      it.Content,
      {
        ref: o,
        className: l(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          s === "bottom" || s === "top" ? "tw-flex-col" : "tw-flex-row",
          i[s],
          t
        ),
        ...a,
        children: [
          !n && (s === "bottom" || s === "right") && /* @__PURE__ */ r("div", { className: w[s] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: e }),
          !n && (s === "top" || s === "left") && /* @__PURE__ */ r("div", { className: w[s] })
        ]
      }
    )
  ] });
});
bs.displayName = "DrawerContent";
function vs({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: l("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
vs.displayName = "DrawerHeader";
function xs({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: l("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
xs.displayName = "DrawerFooter";
const ys = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  it.Title,
  {
    ref: n,
    className: l("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
ys.displayName = it.Title.displayName;
const Ns = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  it.Description,
  {
    ref: n,
    className: l("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Ns.displayName = it.Description.displayName;
const ks = p.forwardRef(({ className: t, value: e, ...n }, a) => /* @__PURE__ */ r(
  Ie.Root,
  {
    ref: a,
    className: l(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      Ie.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
ks.displayName = Ie.Root.displayName;
function Ai({ ...t }) {
  return /* @__PURE__ */ r(
    sa,
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
const Cs = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ d(
    Ut.Root,
    {
      ref: n,
      className: l(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: a,
      children: [
        /* @__PURE__ */ r(Ut.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Ut.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Ut.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Cs.displayName = Ut.Root.displayName;
const _s = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ r(
    Ae.Root,
    {
      className: l(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        Ae.Thumb,
        {
          className: l(
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
_s.displayName = Ae.Root.displayName;
const Pi = et.Root, Ss = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ r(
    et.List,
    {
      ref: n,
      className: l(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: a
    }
  );
});
Ss.displayName = et.List.displayName;
const Ts = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  et.Trigger,
  {
    ref: n,
    className: l(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Ts.displayName = et.Trigger.displayName;
const Rs = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  et.Content,
  {
    ref: n,
    className: l(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Rs.displayName = et.Content.displayName;
const Es = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: l(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: n,
      ...e
    }
  )
);
Es.displayName = "Textarea";
const Bi = (t, e) => {
  St(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Vs(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Ms = (t, e, n = {}) => {
  const a = H(e);
  a.current = e;
  const o = H(n);
  o.current = Vs(o.current);
  const [s, i] = A(() => a.current), [w, u] = A(!0);
  return St(() => {
    let c = !0;
    return u(!!t), (async () => {
      if (t) {
        const m = await t();
        c && (i(() => m), u(!1));
      }
    })(), () => {
      c = !1, o.current.preserveValue || i(() => a.current);
    };
  }, [t]), [s, w];
}, Me = () => !1, ji = (t, e) => {
  const [n] = Ms(
    F(async () => {
      if (!t) return Me;
      const a = await Promise.resolve(t(e));
      return async () => a();
    }, [e, t]),
    Me,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  St(() => () => {
    n !== Me && n();
  }, [n]);
}, $i = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: a
}) => {
  const o = H(null), [s, i] = A(void 0), [w, u] = A(void 0), c = F(
    (h) => {
      i(h);
      const f = t.find((C) => C.id === h);
      f && (e == null || e(f));
      const v = document.getElementById(h);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), o.current && o.current.setAttribute("aria-activedescendant", h);
    },
    [e, t]
  ), m = F(
    (h) => {
      const f = t.find((v) => v.id === h);
      f && (u((v) => v === h ? void 0 : h), n == null || n(f));
    },
    [n, t]
  ), g = F(
    (h) => {
      const f = t.findIndex((N) => N.id === s);
      let v = f;
      switch (h.key) {
        case "ArrowDown":
          v = Math.min(f + 1, t.length - 1), h.preventDefault();
          break;
        case "ArrowUp":
          v = Math.max(f - 1, 0), h.preventDefault();
          break;
        case "Home":
          v = 0, h.preventDefault();
          break;
        case "End":
          v = t.length - 1, h.preventDefault();
          break;
        case " ":
        case "Enter":
          s && m(s), h.preventDefault(), h.stopPropagation();
          return;
        default:
          h.key.length === 1 && !h.metaKey && !h.ctrlKey && !h.altKey && (a == null || a(h.key), h.preventDefault());
          return;
      }
      const C = t[v];
      C && c(C.id);
    },
    [t, c, s, m, a]
  );
  return {
    listboxRef: o,
    activeId: s,
    selectedId: w,
    handleKeyDown: g,
    focusOption: c
  };
};
function Ds(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), a = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && a ? n.insertBefore(o, a) : n.appendChild(o);
}
Ds(`.banded-row:hover {
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
.tw-min-w-48 {
  min-width: 12rem;
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
.tw-border-s-yellow-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 240 138 / var(--tw-border-opacity, 1));
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
  Jo as Alert,
  Wo as AlertDescription,
  Ko as AlertTitle,
  Zo as Avatar,
  ts as AvatarFallback,
  Qo as AvatarImage,
  Ks as BOOK_SELECTOR_STRING_KEYS,
  de as Badge,
  Js as BookChapterControl,
  za as BookSelectionMode,
  Ws as BookSelector,
  z as Button,
  es as Card,
  os as CardContent,
  as as CardDescription,
  ss as CardFooter,
  ns as CardHeader,
  rs as CardTitle,
  Da as ChapterRangeSelector,
  Ze as Checkbox,
  Si as Checklist,
  Pe as ComboBox,
  ne as Command,
  he as CommandEmpty,
  Ot as CommandGroup,
  re as CommandInput,
  Tt as CommandItem,
  ae as CommandList,
  Ri as ContextMenu,
  cs as ContextMenuCheckboxItem,
  ls as ContextMenuContent,
  Vi as ContextMenuGroup,
  ds as ContextMenuItem,
  us as ContextMenuLabel,
  Mi as ContextMenuPortal,
  zi as ContextMenuRadioGroup,
  ps as ContextMenuRadioItem,
  ms as ContextMenuSeparator,
  hs as ContextMenuShortcut,
  Di as ContextMenuSub,
  ws as ContextMenuSubContent,
  is as ContextMenuSubTrigger,
  Ei as ContextMenuTrigger,
  Ka as DataTable,
  fs as Drawer,
  Ii as DrawerClose,
  bs as DrawerContent,
  Ns as DrawerDescription,
  xs as DrawerFooter,
  vs as DrawerHeader,
  vr as DrawerOverlay,
  gs as DrawerPortal,
  ys as DrawerTitle,
  Oi as DrawerTrigger,
  Je as DropdownMenu,
  Ke as DropdownMenuCheckboxItem,
  fe as DropdownMenuContent,
  jn as DropdownMenuGroup,
  Fn as DropdownMenuItem,
  Za as DropdownMenuItemType,
  We as DropdownMenuLabel,
  Oa as DropdownMenuPortal,
  Aa as DropdownMenuRadioGroup,
  Gn as DropdownMenuRadioItem,
  ge as DropdownMenuSeparator,
  Pa as DropdownMenuShortcut,
  Ia as DropdownMenuSub,
  Xn as DropdownMenuSubContent,
  $n as DropdownMenuSubTrigger,
  Bn as DropdownMenuTrigger,
  Qs as ERROR_DUMP_STRING_KEYS,
  Wa as ErrorDump,
  ti as ErrorPopover,
  ai as Filter,
  ei as FilterDropdown,
  ri as Footer,
  ci as INVENTORY_STRING_KEYS,
  ie as Input,
  pi as Inventory,
  Y as Label,
  Zs as MarkdownRenderer,
  ni as MoreInfo,
  eo as MultiSelectComboBox,
  Ni as NavigationContentSearch,
  oe as Popover,
  $t as PopoverContent,
  se as PopoverTrigger,
  ks as Progress,
  Ue as RadioGroup,
  le as RadioGroupItem,
  hi as SCOPE_SELECTOR_STRING_KEYS,
  fi as ScopeSelector,
  mi as ScriptureResultsViewer,
  gi as ScrollGroupSelector,
  rn as SearchBar,
  It as Select,
  Vt as SelectContent,
  ja as SelectGroup,
  ot as SelectItem,
  Xa as SelectLabel,
  Hn as SelectScrollDownButton,
  Ln as SelectScrollUpButton,
  Fa as SelectSeparator,
  Et as SelectTrigger,
  At as SelectValue,
  Qe as Separator,
  bi as SettingsList,
  xi as SettingsListHeader,
  vi as SettingsListItem,
  _o as SettingsSidebar,
  ui as SettingsSidebarContentSearch,
  Wn as Sidebar,
  Qn as SidebarContent,
  ho as SidebarFooter,
  Be as SidebarGroup,
  go as SidebarGroupAction,
  $e as SidebarGroupContent,
  je as SidebarGroupLabel,
  mo as SidebarHeader,
  uo as SidebarInput,
  Zn as SidebarInset,
  tr as SidebarMenu,
  vo as SidebarMenuAction,
  xo as SidebarMenuBadge,
  nr as SidebarMenuButton,
  er as SidebarMenuItem,
  yo as SidebarMenuSkeleton,
  No as SidebarMenuSub,
  Co as SidebarMenuSubButton,
  ko as SidebarMenuSubItem,
  Kn as SidebarProvider,
  po as SidebarRail,
  fo as SidebarSeparator,
  co as SidebarTrigger,
  fn as Skeleton,
  Cs as Slider,
  Ai as Sonner,
  Uo as Spinner,
  _s as Switch,
  vn as TabDropdownMenu,
  yi as TabToolbar,
  be as Table,
  xe as TableBody,
  Ja as TableCaption,
  Pt as TableCell,
  Ha as TableFooter,
  te as TableHead,
  ve as TableHeader,
  vt as TableRow,
  Pi as Tabs,
  Rs as TabsContent,
  Ss as TabsList,
  Ts as TabsTrigger,
  Ti as TextField,
  Es as Textarea,
  qn as ToggleGroup,
  we as ToggleGroupItem,
  Ci as Toolbar,
  en as Tooltip,
  Ne as TooltipContent,
  tn as TooltipProvider,
  nn as TooltipTrigger,
  _i as UiLanguageSelector,
  ir as VerticalTabs,
  lr as VerticalTabsContent,
  wr as VerticalTabsList,
  Bo as VerticalTabsTrigger,
  to as badgeVariants,
  wa as buttonVariants,
  l as cn,
  di as getBookIdFromUSFM,
  wi as getLinesFromUSFM,
  li as getNumberFromUSFM,
  oo as getStatusForItem,
  ki as getToolbarOSReservedSpaceClassName,
  si as inventoryCountColumn,
  oi as inventoryItemColumn,
  ii as inventoryStatusColumn,
  $a as selectTriggerVariants,
  Gi as sonner,
  Bi as useEvent,
  ji as useEventAsync,
  $i as useListbox,
  Ms as usePromise,
  ke as useSidebar
};
//# sourceMappingURL=index.js.map
