import { jsx as r, jsxs as l, Fragment as dn } from "react/jsx-runtime";
import p, { forwardRef as Ee, createContext as lr, useContext as dr, useCallback as K, useState as j, useRef as q, useEffect as wt, useLayoutEffect as Qe, useMemo as et, Fragment as cn } from "react";
import { clsx as cr } from "clsx";
import { extendTailwindMerge as pr } from "tailwind-merge";
import { cva as ft } from "class-variance-authority";
import * as X from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ur } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Ve, Check as Ct, Circle as De, X as Oe, Search as pn, ChevronsUpDown as Me, FilterIcon as mr, ChevronDown as Zt, ChevronUp as hr, ArrowLeftIcon as fr, ChevronLeftIcon as gr, ChevronRightIcon as br, ArrowRightIcon as vr, Filter as xr, User as yr, Link as Nr, CircleHelp as kr, Star as Cr, CircleCheckIcon as _r, CircleXIcon as Sr, CircleHelpIcon as Rr, ArrowUpIcon as Tr, ArrowDownIcon as Er, ArrowUpDownIcon as Vr, PanelLeft as Dr, PanelRight as Or, ScrollText as Mr, ChevronLeft as zr, MenuIcon as Br, Menu as Pr, EllipsisVertical as Ar, LoaderCircle as Ir, Copy as jr } from "lucide-react";
import { formatScrRef as St, MODIFIER_KEYS as Xr, getChaptersForBook as Fr, NumberFormat as Gr, formatBytes as $r, deepEqual as ze, isString as me, compareScrRefs as ye, scrRefToBBBCCCVVV as he, getLocalizeKeyForScrollGroupId as P } from "platform-bible-utils";
import { Slot as Vt } from "@radix-ui/react-slot";
import * as un from "@radix-ui/react-label";
import * as Gt from "@radix-ui/react-radio-group";
import * as $t from "@radix-ui/react-popover";
import { Command as Z } from "cmdk";
import * as lt from "@radix-ui/react-dialog";
import { useReactTable as mn, getFilteredRowModel as Lr, getSortedRowModel as hn, getPaginationRowModel as Hr, getCoreRowModel as fn, flexRender as Xt, getGroupedRowModel as Yr, getExpandedRowModel as Ur } from "@tanstack/react-table";
import * as G from "@radix-ui/react-select";
import Kr from "markdown-to-jsx";
import * as Ne from "@radix-ui/react-checkbox";
import * as Qt from "@radix-ui/react-toggle-group";
import * as gn from "@radix-ui/react-toggle";
import * as bn from "@radix-ui/react-separator";
import * as Ht from "@radix-ui/react-tooltip";
import * as Q from "@radix-ui/react-tabs";
import * as F from "@radix-ui/react-menubar";
import { useHotkeys as qr } from "react-hotkeys-hook";
import * as Dt from "@radix-ui/react-avatar";
import { Drawer as ot } from "vaul";
import * as ke from "@radix-ui/react-progress";
import { Toaster as Jr } from "sonner";
import { toast as fi } from "sonner";
import * as jt from "@radix-ui/react-slider";
import * as Ce from "@radix-ui/react-switch";
const Wr = pr({ prefix: "tw-" });
function d(...t) {
  return Wr(cr(t));
}
const Ot = p.forwardRef(
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
Ot.displayName = "Input";
const Zr = Ee(
  ({
    handleSearch: t,
    handleKeyDown: e,
    handleOnClick: n,
    handleSubmit: a,
    className: o,
    ...s
  }, i) => /* @__PURE__ */ r(
    Ot,
    {
      ...s,
      type: "text",
      className: d(
        "tw-relative tw-box-border tw-min-w-0 tw-max-w-48 tw-flex-shrink tw-grow tw-basis-32 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",
        o
      ),
      onChange: (w) => t(w.target.value),
      onKeyDown: (w) => {
        w.key === "Enter" ? (a(), w.preventDefault()) : e(w);
      },
      onClick: n,
      ref: i
    }
  )
), Be = lr(void 0);
function st() {
  const t = dr(Be);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ct = ft("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Qr = "layoutDirection";
function U() {
  const t = localStorage.getItem(Qr);
  return t === "rtl" ? t : "ltr";
}
const Pe = X.Trigger, vn = X.Group, ta = X.Portal, ea = X.Sub, Rs = X.RadioGroup;
function te({ variant: t = "default", ...e }) {
  const n = p.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(Be.Provider, { value: n, children: /* @__PURE__ */ r(X.Root, { ...e }) });
}
const xn = p.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = st();
  return /* @__PURE__ */ l(
    X.SubTrigger,
    {
      ref: o,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        ct({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(Ve, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
xn.displayName = X.SubTrigger.displayName;
const yn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
yn.displayName = X.SubContent.displayName;
const Yt = p.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...a }, o) => {
  const s = U();
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
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
});
Yt.displayName = X.Content.displayName;
const Ae = p.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = U(), s = st();
  return /* @__PURE__ */ r(
    X.Item,
    {
      ref: a,
      className: d(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        ct({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: o
    }
  );
});
Ae.displayName = X.Item.displayName;
const Ie = p.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = st();
  return /* @__PURE__ */ l(
    X.CheckboxItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ct({ variant: s.variant })
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
Ie.displayName = X.CheckboxItem.displayName;
const Nn = p.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = st();
  return /* @__PURE__ */ l(
    X.RadioItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ct({ variant: o.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(De, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Nn.displayName = X.RadioItem.displayName;
const ee = p.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  X.Label,
  {
    ref: a,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
ee.displayName = X.Label.displayName;
const Ut = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ut.displayName = X.Separator.displayName;
function na({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
na.displayName = "DropdownMenuShortcut";
var ra = Object.defineProperty, aa = (t, e, n) => e in t ? ra(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, D = (t, e, n) => aa(t, typeof e != "symbol" ? e + "" : e, n);
const yt = [
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
], je = [
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
], kn = [
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
], tn = ma();
function Mt(t, e = !0) {
  return e && (t = t.toUpperCase()), t in tn ? tn[t] : 0;
}
function Xe(t) {
  return Mt(t) > 0;
}
function oa(t) {
  const e = typeof t == "string" ? Mt(t) : t;
  return e >= 40 && e <= 66;
}
function sa(t) {
  return (typeof t == "string" ? Mt(t) : t) <= 39;
}
function Cn(t) {
  return t <= 66;
}
function ia(t) {
  const e = typeof t == "string" ? Mt(t) : t;
  return Rn(e) && !Cn(e);
}
function* wa() {
  for (let t = 1; t <= yt.length; t++) yield t;
}
const la = 1, _n = yt.length;
function da() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Fe(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= yt.length ? e : yt[n];
}
function Sn(t) {
  return t <= 0 || t > _n ? "******" : kn[t - 1];
}
function ca(t) {
  return Sn(Mt(t));
}
function Rn(t) {
  const e = typeof t == "number" ? Fe(t) : t;
  return Xe(e) && !je.includes(e);
}
function pa(t) {
  const e = typeof t == "number" ? Fe(t) : t;
  return Xe(e) && je.includes(e);
}
function ua(t) {
  return kn[t - 1].includes("*obsolete*");
}
function ma() {
  const t = {};
  for (let e = 0; e < yt.length; e++)
    t[yt[e]] = e + 1;
  return t;
}
const B = {
  allBookIds: yt,
  nonCanonicalIds: je,
  bookIdToNumber: Mt,
  isBookIdValid: Xe,
  isBookNT: oa,
  isBookOT: sa,
  isBookOTNT: Cn,
  isBookDC: ia,
  allBookNumbers: wa,
  firstBook: la,
  lastBook: _n,
  extraBooks: da,
  bookNumberToId: Fe,
  bookNumberToEnglishName: Sn,
  bookIdToEnglishName: ca,
  isCanonical: Rn,
  isExtraMaterial: pa,
  isObsolete: ua
};
var it = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(it || {});
const tt = class {
  // private versInfo: Versification;
  constructor(e) {
    if (D(this, "name"), D(this, "fullPath"), D(this, "isPresent"), D(this, "hasVerseSegments"), D(this, "isCustomized"), D(this, "baseVersification"), D(this, "scriptureBooks"), D(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = it[e]) : (this._type = e, this.name = it[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
D(tt, "Original", new tt(it.Original)), D(tt, "Septuagint", new tt(it.Septuagint)), D(tt, "Vulgate", new tt(it.Vulgate)), D(tt, "English", new tt(it.English)), D(tt, "RussianProtestant", new tt(it.RussianProtestant)), D(tt, "RussianOrthodox", new tt(it.RussianOrthodox));
let vt = tt;
function en(t, e) {
  const n = e[0];
  for (let a = 1; a < e.length; a++)
    t = t.split(e[a]).join(n);
  return t.split(n);
}
var Tn = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Tn || {});
const W = class z {
  constructor(e, n, a, o) {
    if (D(this, "firstChapter"), D(this, "lastChapter"), D(this, "lastVerse"), D(this, "hasSegmentsDefined"), D(this, "text"), D(this, "BBBCCCVVVS"), D(this, "longHashCode"), D(this, "versification"), D(this, "rtlMark", "‏"), D(this, "_bookNum", 0), D(this, "_chapterNum", 0), D(this, "_verseNum", 0), D(this, "_verse"), a == null && o == null)
      if (e != null && typeof e == "string") {
        const s = e, i = n != null && n instanceof vt ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = n != null && n instanceof vt ? n : void 0;
        this.setEmpty(s), this._verseNum = e % z.chapterDigitShifter, this._chapterNum = Math.floor(
          e % z.bookDigitShifter / z.chapterDigitShifter
        ), this._bookNum = Math.floor(e / z.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof z) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
          const s = e instanceof vt ? e : z.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && a != null)
      if (typeof e == "string" && typeof n == "string" && typeof a == "string")
        this.setEmpty(o), this.updateInternal(e, n, a);
      else if (typeof e == "number" && typeof n == "number" && typeof a == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = a, this.versification = o ?? z.defaultVersification;
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
      return n = new z(e), { success: !0, verseRef: n };
    } catch (a) {
      if (a instanceof Pt)
        return n = new z(), { success: !1, verseRef: n };
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
    return e % z.bcvMaxValue * z.bookDigitShifter + (n >= 0 ? n % z.bcvMaxValue * z.chapterDigitShifter : 0) + (a >= 0 ? a % z.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: a, verseNum: o, verse: s, versificationStr: i } = e, w = s || o.toString();
    let c;
    return i && (c = new vt(i)), n ? new z(n, a.toString(), w, c) : new z();
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
      if (n = n * 10 + +a - 0, n > z.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(z.verseRangeSeparator) || this._verse.includes(z.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return B.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = B.bookIdToNumber(e);
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
    const { success: n, vNum: a } = z.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = a, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = z.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > B.lastBook)
      throw new Pt(
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
    this.versification = this.versification != null ? new vt(e) : void 0;
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
    return this.validateVerse(z.verseRangeSeparators, z.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return z.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return z.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new vt(it[i]);
        } catch {
          throw new Pt("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Pt("Invalid reference : " + e);
    const a = n[1].split(":"), o = +a[0];
    if (a.length !== 2 || B.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !z.isVerseParseable(a[1]))
      throw new Pt("Invalid reference : " + e);
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
    return new z(this);
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
    return e instanceof z ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = z.verseRangeSeparators, a = z.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], s = en(this._verse, a);
    for (const i of s.map((w) => en(w, n))) {
      const w = this.clone();
      w.verse = i[0];
      const c = w.verseNum;
      if (o.push(w), i.length > 1) {
        const u = this.clone();
        if (u.verse = i[1], !e)
          for (let f = c + 1; f < u.verseNum; f++) {
            const v = new z(
              this._bookNum,
              this._chapterNum,
              f,
              this.versification
            );
            this.isExcluded || o.push(v);
          }
        o.push(u);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > B.lastBook ? 2 : (B.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = z.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, a) {
    this.bookNum = B.bookIdToNumber(e), this.chapter = n, this.verse = a;
  }
};
D(W, "defaultVersification", vt.English), D(W, "verseRangeSeparator", "-"), D(W, "verseSequenceIndicator", ","), D(W, "verseRangeSeparators", [W.verseRangeSeparator]), D(W, "verseSequenceIndicators", [W.verseSequenceIndicator]), D(W, "chapterDigitShifter", 1e3), D(W, "bookDigitShifter", W.chapterDigitShifter * W.chapterDigitShifter), D(W, "bcvMaxValue", W.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
D(W, "ValidStatusType", Tn);
class Pt extends Error {
}
const ha = Ee(
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: a,
    handleKeyDown: o,
    bookType: s,
    children: i
  }, w) => /* @__PURE__ */ l(
    Ae,
    {
      ref: w,
      textValue: t,
      className: d(
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
      onFocus: a,
      onMouseMove: a,
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            className: d(
              "tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": n,
                "tw-border-s-red-200": s.toLowerCase() === "ot",
                "tw-border-s-purple-200": s.toLowerCase() === "nt",
                "tw-border-s-indigo-200": s.toLowerCase() === "dc"
              }
            ),
            children: B.bookIdToEnglishName(t)
          }
        ),
        n && /* @__PURE__ */ r("div", { children: i })
      ]
    },
    t
  )
);
function fa({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: n,
  highlightedChapter: a,
  handleHighlightedChapter: o
}) {
  const s = Array.from({ length: e }, (w, c) => c + 1), i = K(
    (w) => {
      o(w);
    },
    [o]
  );
  return /* @__PURE__ */ r("div", { className: d("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: s.map((w) => /* @__PURE__ */ r(
    "div",
    {
      className: d(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": w === n,
          "tw-bg-amber-200": w === a
        }
      ),
      onClick: (c) => {
        c.preventDefault(), c.stopPropagation(), t(w);
      },
      role: "button",
      onKeyDown: (c) => {
        c.key === "Enter" && t(w);
      },
      tabIndex: 0,
      onMouseMove: () => i(w),
      children: w
    },
    w
  )) });
}
const ga = 6, Ge = B.allBookIds.filter((t) => !B.isObsolete(B.bookIdToNumber(t))), En = Object.fromEntries(
  Ge.map((t) => [t, B.bookIdToEnglishName(t)])
), ba = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, nn = ["OT", "NT", "DC"], va = 96, Ft = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by space(s) and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon with a verse number (`:(\d+)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d+)$/i,
  // Same as BOOK_CHAPTER_VERSE, but extracts the book name/id from a reference
  EXTRACT_BOOK_FROM_REFERENCE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+\d+:\d+$/,
  // Same as BOOK_CHAPTER_VERSE, but extracts the book name/id and chapter number from a reference
  EXTRACT_BOOK_CHAPTER_FROM_REFERENCE: /^([^:\s]+(?:\s+[^:\s]+)*\s+\d+):\d+$/
}, xa = [
  Ft.BOOK_ONLY,
  // Matches book name/id
  Ft.BOOK_CHAPTER,
  // Matches book name/id followed by a chapter number
  Ft.BOOK_CHAPTER_VERSE
  // Matches book name/id followed by a chapter and verse number
], rn = /* @__PURE__ */ new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Enter"
]), ya = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])', At = (t) => Fr(B.bookIdToNumber(t));
function Na(t) {
  const e = Ge.find(
    (n) => En[n].toLowerCase() === t.toLowerCase()
  );
  if (e)
    return e;
}
function Es({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: a
}) {
  const o = U(), [s, i] = j(
    () => St(t, "English")
  ), [w, c] = j(""), [u, f] = j(t.book), [v, g] = j(t.chapterNum ?? 0), [h, k] = j(t.book), [R, N] = j(!1), [y, S] = j(R), C = q(void 0), M = q(void 0), $ = q(void 0), gt = K(
    (m) => {
      const V = a ? a() : Ge;
      return {
        OT: V.filter((x) => B.isBookOT(x)),
        NT: V.filter((x) => B.isBookNT(x)),
        DC: V.filter((x) => B.isBookDC(x))
      }[m].filter((x) => {
        const E = En[x].toLowerCase(), H = w.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return E.includes(H) || // Match book name
        x.toLowerCase().includes(H);
      });
    },
    [w, a]
    // Only recompute when relevant values change
  ), rt = (m) => {
    i(m), c(m);
  }, _ = q(!1), b = K(() => {
    i(St(t, "English")), c(""), f(t.book), k(t.book);
  }, [t]), I = K((m) => {
    if (_.current) {
      _.current = !1;
      return;
    }
    N(m);
  }, []), T = K(
    (m, V, x, E) => {
      if (g(t.book !== m ? 1 : t.chapterNum), V || At(m) === -1) {
        e({
          book: m,
          chapterNum: x ?? 1,
          verseNum: E ?? 1
        }), N(!1), c("");
        return;
      }
      f(u !== m ? m : ""), N(!V);
    },
    [e, t.book, t.chapterNum, u]
  ), nt = (m) => {
    m <= 0 || m > At(u) || T(u, !0, m);
  }, zt = K(() => {
    xa.forEach((m) => {
      const V = m.exec(w);
      if (V) {
        const [x, E = void 0, H = void 0] = V.slice(1), L = Na(x);
        (B.isBookIdValid(x) || L) && T(
          L ?? x,
          !0,
          E ? parseInt(E, 10) : 1,
          H ? parseInt(H, 10) : 1
        );
      }
    });
  }, [T, w]), Bt = K(
    (m) => {
      if (R ? m.key === "ArrowDown" || m.key === "Tab" && !m.shiftKey ? ($ != null && $.current ? $.current.focus() : M.current && M.current.focus(), m.preventDefault()) : m.key === "Escape" && document.activeElement === C.current && (N(!1), m.preventDefault(), m.stopPropagation()) : m.key !== "Tab" && N(!0), document.activeElement === C.current) {
        if (/^\d$/.test(m.key)) {
          const x = s.match(
            Ft.EXTRACT_BOOK_FROM_REFERENCE
          );
          if (x) {
            const H = `${x[1]} ${m.key}`;
            rt(H), m.preventDefault();
          }
        }
        if (m.key === ":") {
          const x = s.match(
            Ft.EXTRACT_BOOK_CHAPTER_FROM_REFERENCE
          );
          if (x) {
            const E = x[1], H = E.endsWith(":") ? `${E}` : `${E}:`;
            rt(H), m.preventDefault();
          }
        }
      }
    },
    [R, s]
  ), dt = K((m) => {
    if (!Xr.has(m.key)) {
      if (m.key === "Tab") {
        if (m.shiftKey)
          C.current.focus();
        else {
          const V = [
            ...document.querySelectorAll(ya)
          ].filter(
            (E) => {
              var H, L;
              return E instanceof HTMLElement && ((E.offsetWidth > 0 || E.offsetHeight > 0) && !((H = M.current) != null && H.contains(E)) && !((L = C.current) != null && L.contains(E)) || E === m.target);
            }
          ), x = m.target instanceof HTMLElement ? V.indexOf(m.target) : -1;
          x >= 0 ? V[(x + 1) % V.length].focus() : C.current.focus();
        }
        m.preventDefault(), m.stopPropagation();
        return;
      }
      m.stopPropagation(), C.current.focus(), C.current.dispatchEvent(new KeyboardEvent("keydown", { ...m, view: void 0 }));
    }
  }, []), J = K(
    (m) => {
      const { key: V } = m;
      rn.has(V) || (dt(m), m.preventDefault());
    },
    [dt]
  ), O = K(
    (m, V) => {
      const { key: x } = m;
      if (rn.has(x)) {
        if (h === u) {
          if (x === "Enter") {
            m.preventDefault(), T(u, !0, v);
            return;
          }
          const E = x === "ArrowRight" && !o || x === "ArrowRight" && o === "ltr" || x === "ArrowLeft" && o === "rtl", H = x === "ArrowLeft" && !o || x === "ArrowLeft" && o === "ltr" || x === "ArrowRight" && o === "rtl";
          let L = 0;
          if (E)
            if (v < At(h))
              L = 1;
            else {
              m.preventDefault();
              return;
            }
          else if (H)
            if (v > 1)
              L = -1;
            else {
              m.preventDefault();
              return;
            }
          else x === "ArrowDown" ? L = ga : x === "ArrowUp" && (L = -6);
          if (v + L <= 0 || v + L > At(h))
            g(0);
          else if (L !== 0) {
            g(v + L), m.preventDefault();
            return;
          }
        }
        if (V === 0 && x === "ArrowUp") {
          m.preventDefault(), C.current.focus();
          return;
        }
        return;
      }
      dt(m);
    },
    [
      o,
      h,
      v,
      dt,
      u,
      T
    ]
  );
  return wt(() => {
    u === h ? u === t.book ? g(t.chapterNum) : g(1) : g(0);
  }, [h, t.book, t.chapterNum, u]), wt(() => {
    b();
  }, [b]), wt(() => {
  }, [R, b]), Qe(() => {
    S(R);
  }, [R]), Qe(() => {
    const m = setTimeout(() => {
      var V, x;
      if (y && M.current && $.current) {
        const H = $.current.offsetTop - va;
        M.current.scrollTo({ top: H, behavior: "instant" }), C.current.focus();
      }
      !y && document.activeElement !== C.current && !((V = C.current) != null && V.contains(document.activeElement)) && document.activeElement !== M.current && !((x = M.current) != null && x.contains(document.activeElement)) && b();
    }, 10);
    return () => {
      clearTimeout(m);
    };
  }, [y, b]), /* @__PURE__ */ l(te, { modal: !1, open: R, onOpenChange: I, children: [
    /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ r(
      Zr,
      {
        ref: C,
        value: s,
        handleSearch: rt,
        handleKeyDown: Bt,
        handleOnClick: () => {
          f(t.book), k(t.book), g(t.chapterNum > 0 ? t.chapterNum : 0), N(!0), C.current.focus();
        },
        onFocus: () => {
          _.current = !0;
        },
        handleSubmit: zt,
        placeholder: St(t, "English"),
        className: n
      }
    ) }),
    /* @__PURE__ */ r(
      Yt,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        align: o === "ltr" ? "start" : "end",
        ref: M,
        onKeyDown: J,
        onFocus: (m) => {
          var V, x;
          !((V = C.current) != null && V.contains(m.relatedTarget)) && !((x = M.current) != null && x.contains(m.relatedTarget)) && C.current.select();
        },
        children: /* @__PURE__ */ r("div", { className: "rtl:tw-ps-2", children: nn.map((m, V) => {
          const x = gt(m);
          return x.length > 0 && /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ r(ee, { className: "tw-font-semibold tw-text-foreground/80", children: ba[m] }),
            x.map((E, H) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              ha,
              {
                bookId: E,
                handleSelectBook: () => T(E, !1),
                isSelected: u === E,
                handleHighlightBook: () => k(E),
                handleKeyDown: (L) => O(L, H),
                bookType: m,
                ref: (L) => {
                  u === E && ($.current = L);
                },
                children: /* @__PURE__ */ r(
                  fa,
                  {
                    handleSelectChapter: nt,
                    endChapter: At(E),
                    activeChapter: t.book === E ? t.chapterNum : 0,
                    highlightedChapter: v,
                    handleHighlightedChapter: (L) => {
                      g(L);
                    }
                  }
                )
              }
            ) }, E)),
            nn.length - 1 !== V ? /* @__PURE__ */ r(Ut, {}) : void 0
          ] }, m);
        }) })
      }
    )
  ] });
}
const ka = ft(
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
), A = p.forwardRef(
  ({ className: t, variant: e, size: n, asChild: a = !1, ...o }, s) => /* @__PURE__ */ r(a ? Vt : "button", { className: d(ka({ variant: e, size: n, className: t })), ref: s, ...o })
);
A.displayName = "Button";
const Ca = ft(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Y = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(un.Root, { ref: n, className: d("pr-twp", Ca(), t), ...e }));
Y.displayName = un.Root.displayName;
const $e = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ r(
    Gt.Root,
    {
      className: d("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: a
    }
  );
});
$e.displayName = Gt.Root.displayName;
const qt = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Gt.Item,
  {
    ref: n,
    className: d(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(Gt.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(De, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
qt.displayName = Gt.Item.displayName;
const Le = $t.Root, He = $t.Trigger, ne = p.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...a }, o) => {
  const s = U();
  return /* @__PURE__ */ r($t.Portal, { children: /* @__PURE__ */ r(
    $t.Content,
    {
      ref: o,
      align: e,
      sideOffset: n,
      className: d(
        "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a,
      dir: s
    }
  ) });
});
ne.displayName = $t.Content.displayName;
const _a = lt.Portal, Vn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Overlay,
  {
    ref: n,
    className: d(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Vn.displayName = lt.Overlay.displayName;
const Sa = p.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = U();
  return /* @__PURE__ */ l(_a, { children: [
    /* @__PURE__ */ r(Vn, {}),
    /* @__PURE__ */ l(
      lt.Content,
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
            lt.Close,
            {
              className: d(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Oe, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Sa.displayName = lt.Content.displayName;
const Ra = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Title,
  {
    ref: n,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Ra.displayName = lt.Title.displayName;
const Ta = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  lt.Description,
  {
    ref: n,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Ta.displayName = lt.Description.displayName;
const re = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Z,
  {
    ref: n,
    className: d(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
re.displayName = Z.displayName;
const ae = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ r(pn, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      Z.Input,
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
ae.displayName = Z.Input.displayName;
const oe = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Z.List,
  {
    ref: n,
    className: d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
oe.displayName = Z.List.displayName;
const se = p.forwardRef((t, e) => /* @__PURE__ */ r(Z.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
se.displayName = Z.Empty.displayName;
const Ye = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Z.Group,
  {
    ref: n,
    className: d(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Ye.displayName = Z.Group.displayName;
const Dn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Z.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Dn.displayName = Z.Separator.displayName;
const ie = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Z.Item,
  {
    ref: n,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
ie.displayName = Z.Item.displayName;
function Ea(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function _e({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: a,
  popoverContentClassName: o,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: w = Ea,
  icon: c = void 0,
  buttonPlaceholder: u = "",
  textPlaceholder: f = "",
  commandEmptyMessage: v = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: h = "start",
  isDisabled: k = !1,
  ...R
}) {
  const [N, y] = j(!1);
  return /* @__PURE__ */ l(Le, { open: N, onOpenChange: y, ...R, children: [
    /* @__PURE__ */ r(He, { asChild: !0, children: /* @__PURE__ */ l(
      A,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": N,
        id: t,
        className: d(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          a ?? n
        ),
        disabled: k,
        children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ r("div", { className: "tw-pe-2", children: c }),
            /* @__PURE__ */ r("span", { className: d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: s ? w(s) : u })
          ] }),
          /* @__PURE__ */ r(Me, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      ne,
      {
        align: h,
        className: d("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ l(re, { children: [
          /* @__PURE__ */ r(ae, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(se, { children: v }),
          /* @__PURE__ */ r(oe, { children: e.map((S) => /* @__PURE__ */ l(
            ie,
            {
              value: w(S),
              onSelect: () => {
                i(S), y(!1);
              },
              children: [
                /* @__PURE__ */ r(
                  Ct,
                  {
                    className: d("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !s || w(s) !== w(S)
                    })
                  }
                ),
                w(S)
              ]
            },
            w(S)
          )) })
        ] })
      }
    )
  ] });
}
function Va({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: a,
  isDisabled: o = !1,
  chapterCount: s
}) {
  const i = et(
    () => Array.from({ length: s }, (u, f) => f + 1),
    [s]
  );
  return /* @__PURE__ */ l(dn, { children: [
    /* @__PURE__ */ r(Y, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      _e,
      {
        isDisabled: o,
        onChange: (u) => {
          n(u), u > e && a(u);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (u) => u.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(Y, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      _e,
      {
        isDisabled: o,
        onChange: (u) => {
          a(u), u < t && n(u);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (u) => u.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Da = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Da || {});
const Vs = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), fe = (t, e) => t[e] ?? e;
function Ds({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: a,
  chapterCount: o,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: w,
  handleSelectStartChapter: c,
  localizedStrings: u
}) {
  const f = fe(u, "%webView_bookSelector_currentBook%"), v = fe(u, "%webView_bookSelector_choose%"), g = fe(u, "%webView_bookSelector_chooseBooks%"), [h, k] = j(
    "current book"
    /* CURRENT_BOOK */
  ), R = (N) => {
    k(N), t(N);
  };
  return /* @__PURE__ */ r(
    $e,
    {
      className: "pr-twp tw-flex",
      value: h,
      onValueChange: (N) => R(N),
      children: /* @__PURE__ */ l("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(qt, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(Y, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ r(Y, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Va,
            {
              isDisabled: h === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: w,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(qt, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(Y, { className: "tw-ms-1", children: g })
          ] }),
          /* @__PURE__ */ r(Y, { className: "tw-flex tw-items-center", children: a.map((N) => B.bookIdToEnglishName(N)).join(", ") }),
          /* @__PURE__ */ r(
            A,
            {
              disabled: h === "current book",
              onClick: () => n(),
              children: v
            }
          )
        ] })
      ] })
    }
  );
}
function Oa({ table: t }) {
  return /* @__PURE__ */ l(te, { children: [
    /* @__PURE__ */ r(ur, { asChild: !0, children: /* @__PURE__ */ l(A, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(mr, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ l(Yt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(ee, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Ut, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        Ie,
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
const Rt = G.Root, Ma = G.Group, Tt = G.Value, za = ft(
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
), Nt = p.forwardRef(({ className: t, children: e, size: n, ...a }, o) => {
  const s = U();
  return /* @__PURE__ */ l(
    G.Trigger,
    {
      className: d(za({ size: n, className: t })),
      ref: o,
      ...a,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(G.Icon, { asChild: !0, children: /* @__PURE__ */ r(Zt, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Nt.displayName = G.Trigger.displayName;
const On = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.ScrollUpButton,
  {
    ref: n,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(hr, { className: "tw-h-4 tw-w-4" })
  }
));
On.displayName = G.ScrollUpButton.displayName;
const Mn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.ScrollDownButton,
  {
    ref: n,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Zt, { className: "tw-h-4 tw-w-4" })
  }
));
Mn.displayName = G.ScrollDownButton.displayName;
const kt = p.forwardRef(({ className: t, children: e, position: n = "popper", ...a }, o) => {
  const s = U();
  return /* @__PURE__ */ r(G.Portal, { children: /* @__PURE__ */ l(
    G.Content,
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
        /* @__PURE__ */ r(On, {}),
        /* @__PURE__ */ r(
          G.Viewport,
          {
            className: d(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(Mn, {})
      ]
    }
  ) });
});
kt.displayName = G.Content.displayName;
const Ba = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.Label,
  {
    ref: n,
    className: d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Ba.displayName = G.Label.displayName;
const at = p.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ l(
  G.Item,
  {
    ref: a,
    className: d(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(G.ItemText, { children: e })
    ]
  }
));
at.displayName = G.Item.displayName;
const Pa = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Pa.displayName = G.Separator.displayName;
function Aa({ table: t }) {
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
        Rt,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(Nt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Tt, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(kt, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(at, { value: `${e}`, children: e }, e)) })
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
        A,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(fr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        A,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(gr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        A,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(br, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        A,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(vr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const we = p.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r("div", { className: d("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ r(
  "table",
  {
    ref: a,
    className: d("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
we.displayName = "Table";
const le = p.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r(
  "thead",
  {
    ref: a,
    className: d(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": e },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
le.displayName = "TableHeader";
const de = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: d("[&_tr:last-child]:tw-border-0", t), ...e }));
de.displayName = "TableBody";
const Ia = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Ia.displayName = "TableFooter";
const ht = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "tr",
    {
      ref: n,
      className: d(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        t
      ),
      ...e
    }
  )
);
ht.displayName = "TableRow";
const Lt = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
Lt.displayName = "TableHead";
const Et = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Et.displayName = "TableCell";
const ja = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: d("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
ja.displayName = "TableCaption";
function Xa({
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
  const [w, c] = j([]), [u, f] = j([]), [v, g] = j({}), [h, k] = j({}), R = mn({
    data: e,
    columns: t,
    getCoreRowModel: fn(),
    ...n && { getPaginationRowModel: Hr() },
    onSortingChange: c,
    getSortedRowModel: hn(),
    onColumnFiltersChange: f,
    getFilteredRowModel: Lr(),
    onColumnVisibilityChange: g,
    onRowSelectionChange: k,
    state: {
      sorting: w,
      columnFilters: u,
      columnVisibility: v,
      rowSelection: h
    }
  });
  return /* @__PURE__ */ l("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ r(Oa, { table: R }),
    /* @__PURE__ */ l(we, { stickyHeader: s, children: [
      /* @__PURE__ */ r(le, { stickyHeader: s, children: R.getHeaderGroups().map((y) => /* @__PURE__ */ r(ht, { children: y.headers.map((S) => /* @__PURE__ */ r(Lt, { children: S.isPlaceholder ? void 0 : Xt(S.column.columnDef.header, S.getContext()) }, S.id)) }, y.id)) }),
      /* @__PURE__ */ r(de, { children: (N = R.getRowModel().rows) != null && N.length ? R.getRowModel().rows.map((y) => /* @__PURE__ */ r(
        ht,
        {
          onClick: () => i(y, R),
          "data-state": y.getIsSelected() && "selected",
          children: y.getVisibleCells().map((S) => /* @__PURE__ */ r(Et, { children: Xt(S.column.columnDef.cell, S.getContext()) }, S.id))
        },
        y.id
      )) : /* @__PURE__ */ r(ht, { children: /* @__PURE__ */ r(Et, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        A,
        {
          variant: "outline",
          size: "sm",
          onClick: () => R.previousPage(),
          disabled: !R.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        A,
        {
          variant: "outline",
          size: "sm",
          onClick: () => R.nextPage(),
          disabled: !R.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && a && /* @__PURE__ */ r(Aa, { table: R })
  ] });
}
function Os({ id: t, markdown: e, className: n, anchorTarget: a }) {
  const o = et(
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
  return /* @__PURE__ */ r("div", { id: t, className: d("pr-twp", n), children: /* @__PURE__ */ r(Kr, { options: o, children: e }) });
}
var Fa = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Fa || {});
function Ms({ id: t, label: e, groups: n }) {
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ l(te, { children: [
    /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ l(A, { variant: "default", children: [
      /* @__PURE__ */ r(xr, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Zt, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(Yt, { children: n.map((a) => /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r(ee, { children: a.label }),
      /* @__PURE__ */ r(vn, { children: a.items.map((o) => /* @__PURE__ */ r("div", { children: o.itemType === 0 ? /* @__PURE__ */ r(Ie, { onClick: o.onClick, children: o.label }) : /* @__PURE__ */ r(Nn, { onClick: o.onClick, value: o.label, children: o.label }) }, o.label)) }),
      /* @__PURE__ */ r(Ut, {})
    ] }, a.label)) })
  ] }) });
}
function zs({ id: t, category: e, downloads: n, languages: a, moreInfoUrl: o }) {
  const s = new Gr("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((w, c) => w + c, 0)), i = () => {
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
            /* @__PURE__ */ r(yr, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: s })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: a.slice(0, 3).map((w) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: w.toUpperCase() }, w)) }),
          a.length > 3 && /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              onClick: () => i(),
              className: "tw-text-xs tw-text-foreground tw-underline",
              children: [
                "+",
                a.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(
              "a",
              {
                href: o,
                target: "_blank",
                rel: "noreferrer",
                className: "tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",
                children: "Website"
              }
            ),
            /* @__PURE__ */ r(Nr, { className: "tw-h-4 tw-w-4" })
          ] }),
          /* @__PURE__ */ l("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(
              "a",
              {
                href: "https://example.com",
                target: "_blank",
                rel: "noreferrer",
                className: "tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",
                children: "Support"
              }
            ),
            /* @__PURE__ */ r(kr, { className: "tw-h-4 tw-w-4" })
          ] })
        ] })
      ]
    }
  );
}
function Ga({ id: t, versionHistory: e }) {
  const [n, a] = j(!1), o = /* @__PURE__ */ new Date();
  function s(w) {
    const c = new Date(w), u = new Date(o.getTime() - c.getTime()), f = u.getUTCFullYear() - 1970, v = u.getUTCMonth(), g = u.getUTCDate() - 1;
    let h = "";
    return f > 0 ? h = `${f.toString()} year${f === 1 ? "" : "s"} ago` : v > 0 ? h = `${v.toString()} month${v === 1 ? "" : "s"} ago` : g === 0 ? h = "today" : h = `${g.toString()} day${g === 1 ? "" : "s"} ago`, h;
  }
  const i = Object.entries(e).sort((w, c) => c[0].localeCompare(w[0]));
  return /* @__PURE__ */ l("div", { id: t, children: [
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
        onClick: () => a(!n),
        className: "tw-text-xs tw-text-foreground tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function Bs({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: a,
  versionHistory: o
}) {
  const s = et(() => $r(n), [n]), w = ((c) => {
    const u = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((f) => u.of(f));
  })(a);
  return /* @__PURE__ */ r("div", { id: t, className: "tw-border-t tw-py-2", children: /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    /* @__PURE__ */ r(Ga, { versionHistory: o }),
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
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: w.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const $a = ft(
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
), Jt = p.forwardRef(
  ({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, className: d("pr-twp", $a({ variant: e }), t), ...n })
);
Jt.displayName = "Badge";
function La({
  entries: t,
  getEntriesCount: e = void 0,
  selected: n,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: s = "No entries found",
  customSelectedText: i,
  isDisabled: w = !1,
  sortSelected: c = !1,
  icon: u = void 0,
  className: f = void 0
}) {
  const [v, g] = j(!1), h = K(
    (N) => {
      var S;
      const y = (S = t.find((C) => C.label === N)) == null ? void 0 : S.value;
      y && a(
        n.includes(y) ? n.filter((C) => C !== y) : [...n, y]
      );
    },
    [t, n, a]
  ), k = () => i || o, R = et(() => {
    if (!c) return t;
    const N = t.filter((S) => S.starred).sort((S, C) => S.label.localeCompare(C.label)), y = t.filter((S) => !S.starred).sort((S, C) => {
      const M = n.includes(S.value), $ = n.includes(C.value);
      return M && !$ ? -1 : !M && $ ? 1 : S.label.localeCompare(C.label);
    });
    return [...N, ...y];
  }, [t, n, c]);
  return /* @__PURE__ */ r("div", { className: f, children: /* @__PURE__ */ l(Le, { open: v, onOpenChange: g, children: [
    /* @__PURE__ */ r(He, { asChild: !0, children: /* @__PURE__ */ l(
      A,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": v,
        className: d(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        disabled: w,
        children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: d({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ r("div", { className: "tw-font-normal", children: k() })
              }
            )
          ] }),
          /* @__PURE__ */ r(Me, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(ne, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ l(re, { children: [
      /* @__PURE__ */ r(ae, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ l(oe, { children: [
        /* @__PURE__ */ r(se, { children: s }),
        /* @__PURE__ */ r(Ye, { children: R.map((N) => {
          const y = e ? e(N) : void 0;
          return /* @__PURE__ */ l(
            ie,
            {
              value: N.label,
              onSelect: h,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                  Ct,
                  {
                    className: d(
                      "tw-h-4 tw-w-4",
                      n.includes(N.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ r("div", { className: "tw-w-4", children: N.starred && /* @__PURE__ */ r(Cr, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: N.label }),
                e && /* @__PURE__ */ r("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: y })
              ]
            },
            N.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function Ps({
  entries: t,
  getEntriesCount: e,
  selected: n,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: s,
  customSelectedText: i,
  isDisabled: w,
  sortSelected: c,
  icon: u,
  className: f,
  badgesPlaceholder: v
}) {
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      La,
      {
        entries: t,
        getEntriesCount: e,
        selected: n,
        onChange: a,
        placeholder: o,
        commandEmptyMessage: s,
        customSelectedText: i,
        isDisabled: w,
        sortSelected: c,
        icon: u,
        className: f
      }
    ),
    n.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((g) => {
      var h;
      return /* @__PURE__ */ l(Jt, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          A,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => a(n.filter((k) => k !== g)),
            children: /* @__PURE__ */ r(Oe, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (h = t.find((k) => k.value === g)) == null ? void 0 : h.label
      ] }, g);
    }) }) : /* @__PURE__ */ r(Y, { children: v })
  ] });
}
function Ha({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], s = et(() => {
    const i = [];
    return t.forEach((w) => {
      i.some((c) => ze(c, w)) || i.push(w);
    }), i;
  }, [t]);
  return /* @__PURE__ */ l(we, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(le, { stickyHeader: !0, children: /* @__PURE__ */ l(ht, { children: [
      /* @__PURE__ */ r(Lt, { children: a }),
      /* @__PURE__ */ r(Lt, { children: o })
    ] }) }),
    /* @__PURE__ */ r(de, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ l(
      ht,
      {
        onClick: () => {
          e(i.reference);
        },
        children: [
          /* @__PURE__ */ r(Et, { children: `${B.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ r(Et, { children: i.text })
        ]
      },
      `${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const Ue = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ne.Root,
  {
    ref: n,
    className: d(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      Ne.Indicator,
      {
        className: d("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Ue.displayName = Ne.Root.displayName;
const zn = ft(
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
), Ya = p.forwardRef(({ className: t, variant: e, size: n, ...a }, o) => /* @__PURE__ */ r(
  gn.Root,
  {
    ref: o,
    className: d(zn({ variant: e, size: n, className: t })),
    ...a
  }
));
Ya.displayName = gn.Root.displayName;
const Bn = p.createContext({
  size: "default",
  variant: "default"
}), Pn = p.forwardRef(({ className: t, variant: e, size: n, children: a, ...o }, s) => {
  const i = U();
  return /* @__PURE__ */ r(
    Qt.Root,
    {
      ref: s,
      className: d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: i,
      children: /* @__PURE__ */ r(
        Bn.Provider,
        {
          value: { variant: e, size: n },
          children: a
        }
      )
    }
  );
});
Pn.displayName = Qt.Root.displayName;
const Kt = p.forwardRef(({ className: t, children: e, variant: n, size: a, ...o }, s) => {
  const i = p.useContext(Bn);
  return /* @__PURE__ */ r(
    Qt.Item,
    {
      ref: s,
      className: d(
        zn({
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
Kt.displayName = Qt.Item.displayName;
const ce = (t) => t === "asc" ? /* @__PURE__ */ r(Tr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(Er, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Vr, { className: "tw-ms-2 tw-h-4 tw-w-4" }), As = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ l(A, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    ce(e.getIsSorted())
  ] })
}), Ua = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ l(A, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    ce(n.getIsSorted())
  ] })
}), Is = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ l(A, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    ce(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), ge = (t, e, n, a, o, s) => {
  let i = [...n];
  t.forEach((c) => {
    e === "approved" ? i.includes(c) || i.push(c) : i = i.filter((u) => u !== c);
  }), a(i);
  let w = [...o];
  t.forEach((c) => {
    e === "unapproved" ? w.includes(c) || w.push(c) : w = w.filter((u) => u !== c);
  }), s(w);
}, js = (t, e, n, a, o) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ l(A, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    t,
    ce(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), w = s.getValue("item");
    return /* @__PURE__ */ l(Pn, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
        Kt,
        {
          onClick: (c) => {
            c.stopPropagation(), ge(
              [w],
              "approved",
              e,
              n,
              a,
              o
            );
          },
          value: "approved",
          children: /* @__PURE__ */ r(_r, {})
        }
      ),
      /* @__PURE__ */ r(
        Kt,
        {
          onClick: (c) => {
            c.stopPropagation(), ge(
              [w],
              "unapproved",
              e,
              n,
              a,
              o
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ r(Sr, {})
        }
      ),
      /* @__PURE__ */ r(
        Kt,
        {
          onClick: (c) => {
            c.stopPropagation(), ge(
              [w],
              "unknown",
              e,
              n,
              a,
              o
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(Rr, {})
        }
      )
    ] });
  }
}), Xs = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Fs = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Gs = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Ka = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", $s = Object.freeze([
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
  let a = t;
  return e !== "all" && (a = a.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (a = a.filter((o) => o.items[0].includes(n))), a;
}, Ja = (t, e, n) => {
  const a = [];
  return t.forEach((o) => {
    const s = a.find(
      (i) => ze(
        i.items,
        me(o.inventoryText) ? [o.inventoryText] : o.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: o.verseRef,
        text: o.verse
      });
    else {
      const i = {
        items: me(o.inventoryText) ? [o.inventoryText] : o.inventoryText,
        count: 1,
        status: Ka(
          me(o.inventoryText) ? o.inventoryText : o.inventoryText[0],
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
}, pt = (t, e) => t[e] ?? e;
function Ls({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: a,
  approvedItems: o,
  unapprovedItems: s,
  scope: i,
  onScopeChange: w,
  columns: c
}) {
  const u = pt(n, "%webView_inventory_all%"), f = pt(n, "%webView_inventory_approved%"), v = pt(n, "%webView_inventory_unapproved%"), g = pt(n, "%webView_inventory_unknown%"), h = pt(n, "%webView_inventory_scope_currentBook%"), k = pt(n, "%webView_inventory_scope_chapter%"), R = pt(n, "%webView_inventory_filter_text%"), N = pt(
    n,
    "%webView_inventory_show_additional_items%"
  ), [y, S] = j(!1), [C, M] = j("all"), [$, gt] = j(""), [rt, _] = j([]), b = et(() => t.length === 0 ? [] : Ja(t, o, s), [t, o, s]), I = et(() => {
    if (y) return b;
    const O = [];
    return b.forEach((m) => {
      const V = m.items[0], x = O.find(
        (E) => E.items[0] === V
      );
      x ? (x.count += m.count, x.occurrences = x.occurrences.concat(m.occurrences)) : O.push({
        items: [V],
        count: m.count,
        occurrences: m.occurrences,
        status: m.status
      });
    }), O;
  }, [y, b]), T = et(() => qa(I, C, $), [I, C, $]), nt = et(() => {
    var V, x;
    if (!y) return c;
    const O = (V = a == null ? void 0 : a.tableHeaders) == null ? void 0 : V.length;
    if (!O) return c;
    const m = [];
    for (let E = 0; E < O; E++)
      m.push(
        Ua(
          ((x = a == null ? void 0 : a.tableHeaders) == null ? void 0 : x[E]) || "Additional Item",
          E + 1
        )
      );
    return [...m, ...c];
  }, [a == null ? void 0 : a.tableHeaders, c, y]);
  wt(() => {
    T.length === 0 ? _([]) : T.length === 1 && _(T[0].items);
  }, [T]);
  const zt = (O, m) => {
    m.setRowSelection(() => {
      const V = {};
      return V[O.index] = !0, V;
    }), _(O.original.items);
  }, Bt = (O) => {
    if (O === "book" || O === "chapter")
      w(O);
    else
      throw new Error(`Invalid scope value: ${O}`);
  }, dt = (O) => {
    if (O === "all" || O === "approved" || O === "unapproved" || O === "unknown")
      M(O);
    else
      throw new Error(`Invalid status filter value: ${O}`);
  }, J = et(() => {
    if (I.length === 0 || rt.length === 0) return [];
    const O = I.filter((m) => ze(
      y ? m.items : [m.items[0]],
      rt
    ));
    if (O.length > 1) throw new Error("Selected item is not unique");
    return O.length === 0 ? [] : O[0].occurrences;
  }, [rt, y, I]);
  return /* @__PURE__ */ l("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ l(
        Rt,
        {
          onValueChange: (O) => dt(O),
          defaultValue: C,
          children: [
            /* @__PURE__ */ r(Nt, { className: "tw-m-1", children: /* @__PURE__ */ r(Tt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ l(kt, { children: [
              /* @__PURE__ */ r(at, { value: "all", children: u }),
              /* @__PURE__ */ r(at, { value: "approved", children: f }),
              /* @__PURE__ */ r(at, { value: "unapproved", children: v }),
              /* @__PURE__ */ r(at, { value: "unknown", children: g })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l(Rt, { onValueChange: (O) => Bt(O), defaultValue: i, children: [
        /* @__PURE__ */ r(Nt, { className: "tw-m-1", children: /* @__PURE__ */ r(Tt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ l(kt, { children: [
          /* @__PURE__ */ r(at, { value: "book", children: h }),
          /* @__PURE__ */ r(at, { value: "chapter", children: k })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Ot,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: R,
          value: $,
          onChange: (O) => {
            gt(O.target.value);
          }
        }
      ),
      a && /* @__PURE__ */ l("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          Ue,
          {
            className: "tw-m-1",
            checked: y,
            onCheckedChange: (O) => {
              S(O);
            }
          }
        ),
        /* @__PURE__ */ r(Y, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (a == null ? void 0 : a.checkboxText) ?? N })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Xa,
      {
        columns: nt,
        data: T,
        onRowClickHandler: zt,
        stickyHeader: !0
      }
    ) }),
    J.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Ha,
      {
        occurrenceData: J,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const Ke = p.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...a }, o) => /* @__PURE__ */ r(
  bn.Root,
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
Ke.displayName = bn.Root.displayName;
function an({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const qe = Ht.Provider, Je = Ht.Root, We = Ht.Trigger, pe = p.forwardRef(({ className: t, sideOffset: e = 4, ...n }, a) => /* @__PURE__ */ r(
  Ht.Content,
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
pe.displayName = Ht.Content.displayName;
const Wa = "16rem", Za = "3rem", An = p.createContext(void 0);
function ue() {
  const t = p.useContext(An);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const In = p.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: a,
    style: o,
    children: s,
    side: i = "primary",
    ...w
  }, c) => {
    const [u, f] = p.useState(t), v = e ?? u, g = p.useCallback(
      (C) => {
        const M = typeof C == "function" ? C(v) : C;
        n ? n(M) : f(M);
      },
      [n, v]
    ), h = p.useCallback(() => g((C) => !C), [g]), k = v ? "expanded" : "collapsed", y = U() === "ltr" ? i : i === "primary" ? "secondary" : "primary", S = p.useMemo(
      () => ({
        state: k,
        open: v,
        setOpen: g,
        toggleSidebar: h,
        side: y
      }),
      [k, v, g, h, y]
    );
    return /* @__PURE__ */ r(An.Provider, { value: S, children: /* @__PURE__ */ r(qe, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Wa,
            "--sidebar-width-icon": Za,
            ...o
          }
        ),
        className: d(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          a
        ),
        ref: c,
        ...w,
        children: s
      }
    ) }) });
  }
);
In.displayName = "SidebarProvider";
const jn = p.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: a, ...o }, s) => {
  const i = ue();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: d(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: s,
      ...o,
      children: a
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
jn.displayName = "Sidebar";
const Qa = p.forwardRef(({ className: t, onClick: e, ...n }, a) => {
  const o = ue();
  return /* @__PURE__ */ l(
    A,
    {
      ref: a,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: d("tw-h-7 tw-w-7", t),
      onClick: (s) => {
        e == null || e(s), o.toggleSidebar();
      },
      ...n,
      children: [
        o.side === "primary" ? /* @__PURE__ */ r(Dr, {}) : /* @__PURE__ */ r(Or, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
Qa.displayName = "SidebarTrigger";
const to = p.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: a } = ue();
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
to.displayName = "SidebarRail";
const Xn = p.forwardRef(
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
Xn.displayName = "SidebarInset";
const eo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ot,
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
eo.displayName = "SidebarInput";
const no = p.forwardRef(
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
no.displayName = "SidebarHeader";
const ro = p.forwardRef(
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
ro.displayName = "SidebarFooter";
const ao = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ke,
  {
    ref: n,
    "data-sidebar": "separator",
    className: d("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
ao.displayName = "SidebarSeparator";
const Fn = p.forwardRef(
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
Fn.displayName = "SidebarContent";
const Se = p.forwardRef(
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
Se.displayName = "SidebarGroup";
const Re = p.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Vt : "div",
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
Re.displayName = "SidebarGroupLabel";
const oo = p.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Vt : "button",
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
oo.displayName = "SidebarGroupAction";
const Te = p.forwardRef(
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
Te.displayName = "SidebarGroupContent";
const Gn = p.forwardRef(
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
Gn.displayName = "SidebarMenu";
const $n = p.forwardRef(
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
$n.displayName = "SidebarMenuItem";
const so = ft(
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
), Ln = p.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: a = "default",
    tooltip: o,
    className: s,
    ...i
  }, w) => {
    const c = t ? Vt : "button", { state: u } = ue(), f = /* @__PURE__ */ r(
      c,
      {
        ref: w,
        "data-sidebar": "menu-button",
        "data-size": a,
        "data-active": e,
        className: d(so({ variant: n, size: a }), s),
        ...i
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ l(Je, { children: [
      /* @__PURE__ */ r(We, { asChild: !0, children: f }),
      /* @__PURE__ */ r(pe, { side: "right", align: "center", hidden: u !== "collapsed", ...o })
    ] })) : f;
  }
);
Ln.displayName = "SidebarMenuButton";
const io = p.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...a }, o) => /* @__PURE__ */ r(
  e ? Vt : "button",
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
io.displayName = "SidebarMenuAction";
const wo = p.forwardRef(
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
wo.displayName = "SidebarMenuBadge";
const lo = p.forwardRef(({ className: t, showIcon: e = !1, ...n }, a) => {
  const o = p.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: a,
      "data-sidebar": "menu-skeleton",
      className: d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(an, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          an,
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
lo.displayName = "SidebarMenuSkeleton";
const co = p.forwardRef(
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
co.displayName = "SidebarMenuSub";
const po = p.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
po.displayName = "SidebarMenuSubItem";
const uo = p.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: a, ...o }, s) => /* @__PURE__ */ r(
  t ? Vt : "a",
  {
    ref: s,
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
uo.displayName = "SidebarMenuSubButton";
function mo({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: a,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: w,
  className: c
}) {
  const u = K(
    (g, h) => {
      a(g, h);
    },
    [a]
  ), f = K(
    (g) => {
      const h = n.find((k) => k.projectId === g);
      return h ? h.projectName : g;
    },
    [n]
  ), v = K(
    (g) => !o.projectId && g === o.label,
    [o]
  );
  return /* @__PURE__ */ r(
    jn,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: d("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ l(Fn, { children: [
        /* @__PURE__ */ l(Se, { children: [
          /* @__PURE__ */ r(Re, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(Te, { children: /* @__PURE__ */ r(Gn, { children: Object.entries(e).map(([g, h]) => /* @__PURE__ */ r($n, { children: /* @__PURE__ */ r(
            Ln,
            {
              onClick: () => u(g),
              isActive: v(g),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: h })
            }
          ) }, g)) }) })
        ] }),
        /* @__PURE__ */ l(Se, { children: [
          /* @__PURE__ */ r(Re, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(Te, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            _e,
            {
              buttonVariant: "ghost",
              buttonClassName: d("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": o == null ? void 0 : o.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((g) => g.projectId),
              getOptionLabel: (g) => f(g),
              buttonPlaceholder: w,
              onChange: (g) => {
                const h = f(g);
                u(h, g);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Mr, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
function Hn({
  value: t,
  onSearch: e,
  placeholder: n,
  isFullWidth: a,
  className: o,
  isDisabled: s = !1
}) {
  const i = U();
  return /* @__PURE__ */ l("div", { className: d("tw-relative", { "tw-w-full": a }, o), children: [
    /* @__PURE__ */ r(
      pn,
      {
        className: d(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": i === "rtl" },
          { "tw-left-3": i === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ r(
      Ot,
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: n,
        value: t,
        onChange: (w) => e(w.target.value),
        disabled: s
      }
    ),
    t && /* @__PURE__ */ l(
      A,
      {
        variant: "ghost",
        size: "icon",
        className: d(
          "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
          { "tw-left-0": i === "rtl" },
          { "tw-right-0": i === "ltr" }
        ),
        onClick: () => {
          e("");
        },
        children: [
          /* @__PURE__ */ r(Oe, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
function Hs({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: a,
  handleSelectSidebarItem: o,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: w,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: u,
  buttonPlaceholderText: f
}) {
  return /* @__PURE__ */ l("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Hn,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: w,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ l(
      In,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            mo,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: o,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: u,
              buttonPlaceholderText: f
            }
          ),
          /* @__PURE__ */ r(Xn, { className: "tw-min-w-[215px]", children: a })
        ]
      }
    )
  ] });
}
const ut = "scrBook", ho = "scrRef", xt = "source", fo = "details", go = "Scripture Reference", bo = "Scripture Book", Yn = "Type", vo = "Details";
function xo(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (a) => `${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,
      id: ut,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? go,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? B.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === ut ? St(o.start) : void 0;
      },
      getGroupingValue: (a) => B.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => ye(a.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => St(a.start),
      id: ho,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : St(o.start);
      },
      sortingFn: (a, o) => ye(a.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (a) => a.source.displayName,
      id: xt,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Yn : void 0,
      cell: (a) => n || a.row.getIsGrouped() ? a.getValue() : void 0,
      getGroupingValue: (a) => a.source.id,
      sortingFn: (a, o) => a.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => a.detail,
      id: fo,
      header: (t == null ? void 0 : t.detailsColumnName) ?? vo,
      cell: (a) => a.getValue(),
      enableGrouping: !1
    }
  ];
}
const yo = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || ye(t.start, t.end) === 0 ? `${he(t.start)}+${e}` : `${he(t.start)}+${e}-${he(t.end)}+${n}`;
}, on = (t) => `${yo({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Ys({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: a,
  scriptureBookGroupName: o,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: w
}) {
  const [c, u] = j([]), [f, v] = j([{ id: ut, desc: !1 }]), [g, h] = j({}), k = et(
    () => t.flatMap((_) => _.data.map((b) => ({
      ...b,
      source: _.source
    }))),
    [t]
  ), R = et(
    () => xo(
      {
        scriptureReferenceColumnName: a,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [a, s, i, n]
  );
  wt(() => {
    c.includes(xt) ? v([
      { id: xt, desc: !1 },
      { id: ut, desc: !1 }
    ]) : v([{ id: ut, desc: !1 }]);
  }, [c]);
  const N = mn({
    data: k,
    columns: R,
    state: {
      grouping: c,
      sorting: f,
      rowSelection: g
    },
    onGroupingChange: u,
    onSortingChange: v,
    onRowSelectionChange: h,
    getExpandedRowModel: Ur(),
    getGroupedRowModel: Yr(),
    getCoreRowModel: fn(),
    getSortedRowModel: hn(),
    getRowId: on,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  wt(() => {
    if (w) {
      const _ = N.getSelectedRowModel().rowsById, b = Object.keys(_);
      if (b.length === 1) {
        const I = k.find((T) => on(T) === b[0]) || void 0;
        I && w(I);
      }
    }
  }, [g, k, w, N]);
  const y = o ?? bo, S = s ?? Yn, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [ut] },
    { label: `Group by ${S}`, value: [xt] },
    {
      label: `Group by ${y} and ${S}`,
      value: [ut, xt]
    },
    {
      label: `Group by ${S} and ${y}`,
      value: [xt, ut]
    }
  ], M = (_) => {
    u(JSON.parse(_));
  }, $ = (_, b) => {
    !_.getIsGrouped() && !_.getIsSelected() && _.getToggleSelectedHandler()(b);
  }, gt = (_, b) => _.getIsGrouped() ? "" : d("banded-row", b % 2 === 0 ? "even" : "odd"), rt = (_, b, I) => {
    if (!((_ == null ? void 0 : _.length) === 0 || b.depth < I.column.getGroupedIndex())) {
      if (b.getIsGrouped())
        switch (b.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (b.depth) {
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
      Rt,
      {
        value: JSON.stringify(c),
        onValueChange: (_) => {
          M(_);
        },
        children: [
          /* @__PURE__ */ r(Nt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Tt, {}) }),
          /* @__PURE__ */ r(kt, { position: "item-aligned", children: /* @__PURE__ */ r(Ma, { children: C.map((_) => /* @__PURE__ */ r(at, { value: JSON.stringify(_.value), children: _.label }, _.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ l(we, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(le, { children: N.getHeaderGroups().map((_) => /* @__PURE__ */ r(ht, { children: _.headers.filter((b) => b.column.columnDef.header).map((b) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(Lt, { colSpan: b.colSpan, className: "top-0 tw-sticky", children: b.isPlaceholder ? void 0 : /* @__PURE__ */ l("div", { children: [
          b.column.getCanGroup() ? /* @__PURE__ */ r(
            A,
            {
              variant: "ghost",
              title: `Toggle grouping by ${b.column.columnDef.header}`,
              onClick: b.column.getToggleGroupingHandler(),
              type: "button",
              children: b.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Xt(b.column.columnDef.header, b.getContext())
        ] }) }, b.id)
      )) }, _.id)) }),
      /* @__PURE__ */ r(de, { children: N.getRowModel().rows.map((_, b) => {
        const I = U();
        return /* @__PURE__ */ r(
          ht,
          {
            "data-state": _.getIsSelected() ? "selected" : "",
            className: d(gt(_, b)),
            onClick: (T) => $(_, T),
            children: _.getVisibleCells().map((T) => {
              if (!(T.getIsPlaceholder() || T.column.columnDef.enableGrouping && !T.getIsGrouped() && (T.column.columnDef.id !== xt || !n)))
                return /* @__PURE__ */ r(
                  Et,
                  {
                    className: d(
                      T.column.columnDef.id,
                      "tw-p-[1px]",
                      rt(c, _, T)
                    ),
                    children: T.getIsGrouped() ? /* @__PURE__ */ l(
                      A,
                      {
                        variant: "link",
                        onClick: _.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          _.getIsExpanded() && /* @__PURE__ */ r(Zt, {}),
                          !_.getIsExpanded() && (I === "ltr" ? /* @__PURE__ */ r(Ve, {}) : /* @__PURE__ */ r(zr, {})),
                          " ",
                          Xt(T.column.columnDef.cell, T.getContext()),
                          " (",
                          _.subRows.length,
                          ")"
                        ]
                      }
                    ) : Xt(T.column.columnDef.cell, T.getContext())
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
var mt = /* @__PURE__ */ ((t) => (t.OT = "OT", t.NT = "NT", t.DC = "DC", t.Extra = "Extra", t))(mt || {});
const No = (t, e, n, a, o) => {
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
}, ko = (t, e, n, a, o) => {
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
}, _t = (t) => {
  if (B.isBookOT(t)) return "OT";
  if (B.isBookNT(t)) return "NT";
  if (B.isBookDC(t)) return "DC";
  if (B.isExtraMaterial(t)) return "Extra";
  throw new Error(`Unknown section for book: ${t}`);
}, Ze = (t, e) => t.filter((n) => {
  try {
    return _t(n) === e;
  } catch {
    return !1;
  }
}), Un = (t, e, n) => Ze(t, e).every((a) => n.includes(a));
function Co({
  bookId: t,
  selectedBookIds: e,
  toggleBook: n,
  lastKeyEventShiftKey: a,
  localizedBookNames: o
}) {
  var w, c;
  const s = q(!1), i = q();
  return /* @__PURE__ */ l(
    ie,
    {
      value: t,
      className: "tw-flex tw-items-center",
      onSelect: () => {
        s.current || (n(t, a.current), a.current = !1), i.current && clearTimeout(i.current), i.current = setTimeout(() => {
          s.current = !1;
        }, 100);
      },
      onMouseDown: (u) => {
        u.preventDefault(), s.current = !0, n(t, u.shiftKey);
      },
      role: "option",
      "aria-selected": e.includes(t),
      "aria-label": `${B.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
      children: [
        /* @__PURE__ */ r(
          Ct,
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
                "tw-border-s-red-200": _t(t) === mt.OT,
                "tw-border-s-purple-200": _t(t) === mt.NT,
                "tw-border-s-indigo-200": _t(t) === mt.DC,
                "tw-border-s-yellow-200": _t(t) === mt.Extra
              }
            ),
            children: o && ((w = o.get(t)) == null ? void 0 : w.localizedName) || B.bookIdToEnglishName(t)
          }
        ),
        /* @__PURE__ */ r("span", { className: "tw-ml-2 tw-text-xs tw-text-muted-foreground", children: o && ((c = o.get(t)) == null ? void 0 : c.localizedId) || t.toLocaleUpperCase() })
      ]
    },
    t
  );
}
function _o({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: a,
  localizedStrings: o
}) {
  const s = Ze(e, t).length === 0, i = o["%scripture_section_ot_short%"], w = o["%scripture_section_nt_short%"], c = o["%scripture_section_dc_short%"], u = o["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    A,
    {
      variant: "outline",
      size: "sm",
      onClick: () => a(t),
      className: d(
        Un(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: ko(
        t,
        i,
        w,
        c,
        u
      )
    }
  );
}
const sn = 5, be = 6;
function So({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: a,
  localizedBookNames: o
}) {
  const s = a["%webView_book_selector_books_selected%"], i = a["%webView_book_selector_select_books%"], w = a["%webView_book_selector_search_books%"], c = a["%webView_book_selector_select_all%"], u = a["%webView_book_selector_clear_all%"], f = a["%webView_book_selector_no_book_found%"], v = a["%webView_book_selector_more%"], g = a["%scripture_section_ot_long%"], h = a["%scripture_section_nt_long%"], k = a["%scripture_section_dc_long%"], R = a["%scripture_section_extra_long%"], [N, y] = j(!1), S = q(void 0), C = q(!1);
  if (t.length !== B.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const M = et(() => B.allBookIds.filter(
    (b, I) => t[I] === "1" && !B.isObsolete(B.bookIdToNumber(b))
  ), [t]), $ = K(
    (b, I = !1) => {
      if (!I || !S.current) {
        n(
          e.includes(b) ? e.filter((J) => J !== b) : [...e, b]
        ), S.current = b;
        return;
      }
      const T = M.findIndex((J) => J === S.current), nt = M.findIndex((J) => J === b);
      if (T === -1 || nt === -1) return;
      const [zt, Bt] = [
        Math.min(T, nt),
        Math.max(T, nt)
      ], dt = M.slice(zt, Bt + 1).map((J) => J);
      n(
        e.includes(b) ? e.filter((J) => !dt.includes(J)) : [.../* @__PURE__ */ new Set([...e, ...dt])]
      );
    },
    [e, n, M]
  ), gt = K(
    (b) => {
      const I = Ze(M, b).map((T) => T);
      n(
        Un(M, b, e) ? e.filter((T) => !I.includes(T)) : [.../* @__PURE__ */ new Set([...e, ...I])]
      );
    },
    [e, n, M]
  ), rt = () => {
    n(M.map((b) => b));
  }, _ = () => {
    n([]);
  };
  return /* @__PURE__ */ l("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(mt).map((b) => /* @__PURE__ */ r(
      _o,
      {
        section: b,
        availableBookIds: M,
        selectedBookIds: e,
        onToggle: gt,
        localizedStrings: a
      },
      b
    )) }),
    /* @__PURE__ */ l(Le, { open: N, onOpenChange: y, children: [
      /* @__PURE__ */ r(He, { asChild: !0, children: /* @__PURE__ */ l(
        A,
        {
          variant: "outline",
          role: "combobox",
          "aria-expanded": N,
          className: "tw-max-w-64 tw-justify-between",
          children: [
            e.length > 0 ? `${s}: ${e.length}` : i,
            /* @__PURE__ */ r(Me, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ r(ne, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ l(
        re,
        {
          onKeyDown: (b) => {
            b.key === "Enter" && (C.current = b.shiftKey);
          },
          children: [
            /* @__PURE__ */ r(ae, { placeholder: w }),
            /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
              /* @__PURE__ */ r(A, { variant: "ghost", size: "sm", onClick: rt, children: c }),
              /* @__PURE__ */ r(A, { variant: "ghost", size: "sm", onClick: _, children: u })
            ] }),
            /* @__PURE__ */ l(oe, { children: [
              /* @__PURE__ */ r(se, { children: f }),
              Object.values(mt).map((b, I) => {
                const T = M.filter(
                  (nt) => _t(nt) === b
                );
                if (T.length !== 0)
                  return /* @__PURE__ */ l(cn, { children: [
                    /* @__PURE__ */ r(
                      Ye,
                      {
                        heading: No(
                          b,
                          g,
                          h,
                          k,
                          R
                        ),
                        children: T.map((nt) => /* @__PURE__ */ r(
                          Co,
                          {
                            bookId: nt,
                            selectedBookIds: e,
                            toggleBook: $,
                            lastKeyEventShiftKey: C,
                            localizedBookNames: o
                          },
                          nt
                        ))
                      }
                    ),
                    I < Object.values(mt).length - 1 && /* @__PURE__ */ r(Dn, {})
                  ] }, b);
              })
            ] })
          ]
        }
      ) })
    ] }),
    e.length > 0 && /* @__PURE__ */ l("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      e.slice(
        0,
        e.length === be ? be : sn
      ).map((b) => {
        var I;
        return /* @__PURE__ */ r(Jt, { className: "hover:tw-bg-secondary", variant: "secondary", children: o && ((I = o.get(b)) == null ? void 0 : I.localizedName) || B.bookIdToEnglishName(b) || b }, b);
      }),
      e.length > be && /* @__PURE__ */ r(
        Jt,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - sn} ${v}`
        }
      )
    ] })
  ] });
}
const Us = Object.freeze([
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
]), bt = (t, e) => t[e] ?? e;
function Ks({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: a,
  selectedBookIds: o,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: w
}) {
  const c = bt(
    i,
    "%webView_scope_selector_selected_text%"
  ), u = bt(
    i,
    "%webView_scope_selector_current_verse%"
  ), f = bt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), v = bt(i, "%webView_scope_selector_current_book%"), g = bt(i, "%webView_scope_selector_choose_books%"), h = bt(i, "%webView_scope_selector_scope%"), k = bt(i, "%webView_scope_selector_select_books%"), R = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: u, id: "scope-verse" },
    { value: "chapter", label: f, id: "scope-chapter" },
    { value: "book", label: v, id: "scope-book" },
    { value: "selectedBooks", label: g, id: "scope-selected" }
  ], N = e ? R.filter((y) => e.includes(y.value)) : R;
  return /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Y, { children: h }),
      /* @__PURE__ */ r(
        $e,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: N.map(({ value: y, label: S, id: C }) => /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(qt, { className: "tw-me-2", value: y, id: C }),
            /* @__PURE__ */ r(Y, { htmlFor: C, children: S })
          ] }, C))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Y, { children: k }),
      /* @__PURE__ */ r(
        So,
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
const ve = {
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
function qs({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: a = {},
  size: o,
  className: s
}) {
  const i = {
    ...ve,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([c, u]) => [
          c,
          c === u && c in ve ? ve[c] : u
        ]
      )
    )
  }, w = U();
  return /* @__PURE__ */ l(
    Rt,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(Nt, { size: o, className: d("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Tt,
          {
            placeholder: i[P(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          kt,
          {
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((c) => /* @__PURE__ */ r(at, { value: `${c}`, children: i[P(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function Js({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Ws({
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
function Zs({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ l("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(Ke, {}) : ""
  ] });
}
function Kn(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, a]) => "menuItem" in a && a.menuItem === e
  )) == null ? void 0 : n[0];
}
function Wt({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: d("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const qn = (t, e, n, a) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((w) => w.group === s).sort((w, c) => w.order - c.order).map((w) => /* @__PURE__ */ l(Je, { children: [
  /* @__PURE__ */ r(We, { asChild: !0, children: "command" in w ? /* @__PURE__ */ l(
    Ae,
    {
      onClick: () => {
        a(w);
      },
      children: [
        w.iconPathBefore && /* @__PURE__ */ r(Wt, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
        w.label,
        w.iconPathAfter && /* @__PURE__ */ r(Wt, { icon: w.iconPathAfter, menuLabel: w.label })
      ]
    },
    `dropdown-menu-item-${w.label}-${w.command}`
  ) : /* @__PURE__ */ l(ea, { children: [
    /* @__PURE__ */ r(xn, { children: w.label }),
    /* @__PURE__ */ r(ta, { children: /* @__PURE__ */ r(yn, { children: qn(
      t,
      e,
      Kn(t, w.id),
      a
    ) }) })
  ] }, `dropdown-menu-sub-${w.label}-${w.id}`) }),
  w.tooltip && /* @__PURE__ */ r(pe, { children: w.tooltip })
] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`))) : void 0;
function wn({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: a,
  className: o,
  variant: s,
  id: i
}) {
  return /* @__PURE__ */ l(te, { variant: s, children: [
    /* @__PURE__ */ r(Pe, { "aria-label": n, className: o, asChild: !0, id: i, children: /* @__PURE__ */ r(A, { variant: "ghost", size: "icon", children: a ?? /* @__PURE__ */ r(Br, {}) }) }),
    /* @__PURE__ */ r(Yt, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, u) => /* @__PURE__ */ l(cn, { children: [
      /* @__PURE__ */ r(vn, { children: /* @__PURE__ */ r(qe, { children: qn(e.groups, e.items, w, t) }) }),
      c < u.length - 1 && /* @__PURE__ */ r(Ut, {})
    ] }, w)) })
  ] });
}
function Qs({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: a,
  id: o,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: w,
  endAreaChildren: c
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      className: d(
        "tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-border tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar",
        s
      ),
      id: o,
      children: [
        n && /* @__PURE__ */ r(
          wn,
          {
            onSelectMenuItem: t,
            menuData: n,
            tabLabel: "Project",
            icon: /* @__PURE__ */ r(Pr, {}),
            className: "tw-h-full tw-w-8"
          }
        ),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: w }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
          a && /* @__PURE__ */ r(
            wn,
            {
              onSelectMenuItem: e,
              menuData: a,
              tabLabel: "View Info",
              icon: /* @__PURE__ */ r(Ar, {}),
              className: "tw-h-full"
            }
          ),
          c
        ] })
      ]
    }
  );
}
const Jn = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ r(
    Q.Root,
    {
      orientation: "vertical",
      ref: n,
      className: d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: a
    }
  );
});
Jn.displayName = Q.List.displayName;
const Wn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Q.List,
  {
    ref: n,
    className: d(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Wn.displayName = Q.List.displayName;
const Ro = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Q.Trigger,
  {
    ref: n,
    ...e,
    className: d(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Zn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Q.Content,
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
Zn.displayName = Q.Content.displayName;
function ti({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: a,
  headerTitle: o,
  searchClassName: s
}) {
  return /* @__PURE__ */ l("div", { className: "pr-twp", children: [
    /* @__PURE__ */ l("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ r("h1", { children: o }) : "",
      /* @__PURE__ */ r(
        Hn,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: a
        }
      )
    ] }),
    /* @__PURE__ */ l(Jn, { children: [
      /* @__PURE__ */ r(Wn, { children: t.map((i) => /* @__PURE__ */ r(Ro, { value: i.value, children: i.value }, i.key)) }),
      t.map((i) => /* @__PURE__ */ r(Zn, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
function To({ ...t }) {
  return /* @__PURE__ */ r(F.Menu, { ...t });
}
function Eo({ ...t }) {
  return /* @__PURE__ */ r(F.Sub, { "data-slot": "menubar-sub", ...t });
}
const Qn = p.forwardRef(({ className: t, variant: e = "default", ...n }, a) => {
  const o = p.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(Be.Provider, { value: o, children: /* @__PURE__ */ r(
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
Qn.displayName = F.Root.displayName;
const tr = p.forwardRef(({ className: t, ...e }, n) => {
  const a = st();
  return /* @__PURE__ */ r(
    F.Trigger,
    {
      ref: n,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        ct({ variant: a.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
tr.displayName = F.Trigger.displayName;
const er = p.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = st();
  return /* @__PURE__ */ l(
    F.SubTrigger,
    {
      ref: o,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        ct({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(Ve, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
er.displayName = F.SubTrigger.displayName;
const nr = p.forwardRef(({ className: t, ...e }, n) => {
  const a = st();
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
nr.displayName = F.SubContent.displayName;
const rr = p.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: a = 8, ...o }, s) => {
  const i = st();
  return /* @__PURE__ */ r(F.Portal, { children: /* @__PURE__ */ r(
    F.Content,
    {
      ref: s,
      align: e,
      alignOffset: n,
      sideOffset: a,
      className: d(
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
rr.displayName = F.Content.displayName;
const ar = p.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = st();
  return /* @__PURE__ */ r(
    F.Item,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        ct({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
ar.displayName = F.Item.displayName;
const Vo = p.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = st();
  return /* @__PURE__ */ l(
    F.CheckboxItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ct({ variant: s.variant, className: t }),
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
Vo.displayName = F.CheckboxItem.displayName;
const Do = p.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = st();
  return /* @__PURE__ */ l(
    F.RadioItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ct({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(F.ItemIndicator, { children: /* @__PURE__ */ r(De, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Do.displayName = F.RadioItem.displayName;
const Oo = p.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  F.Label,
  {
    ref: a,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Oo.displayName = F.Label.displayName;
const or = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  F.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
or.displayName = F.Separator.displayName;
const It = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var a;
      (a = t.current) == null || a.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, sr = (t, e, n, a) => {
  if (!n) return;
  const o = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return o.flatMap(([s], i) => {
    const w = e.filter((u) => u.group === s).sort((u, f) => u.order - f.order).map((u) => /* @__PURE__ */ l(Je, { children: [
      /* @__PURE__ */ r(We, { asChild: !0, children: "command" in u ? /* @__PURE__ */ l(
        ar,
        {
          onClick: () => {
            a(u);
          },
          children: [
            u.iconPathBefore && /* @__PURE__ */ r(Wt, { icon: u.iconPathBefore, menuLabel: u.label, leading: !0 }),
            u.label,
            u.iconPathAfter && /* @__PURE__ */ r(Wt, { icon: u.iconPathAfter, menuLabel: u.label })
          ]
        },
        `menubar-item-${u.label}-${u.command}`
      ) : /* @__PURE__ */ l(Eo, { children: [
        /* @__PURE__ */ r(er, { children: u.label }),
        /* @__PURE__ */ r(nr, { children: sr(
          t,
          e,
          Kn(t, u.id),
          a
        ) })
      ] }, `menubar-sub-${u.label}-${u.id}`) }),
      u.tooltip && /* @__PURE__ */ r(pe, { children: u.tooltip })
    ] }, `tooltip-${u.label}-${"command" in u ? u.command : u.id}`)), c = [...w];
    return w.length > 0 && i < o.length - 1 && c.push(/* @__PURE__ */ r(or, {}, `separator-${s}`)), c;
  });
};
function Mo({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: a
}) {
  const o = q(void 0), s = q(void 0), i = q(void 0), w = q(void 0), c = q(void 0), u = (f) => {
    switch (f) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return w;
      case "platform.help":
        return c;
      default:
        return;
    }
  };
  if (qr(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (f, v) => {
    var k, R, N, y;
    f.preventDefault();
    const g = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, h = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (v.hotkey) {
      case "alt":
        It(s, [g]);
        break;
      case "alt+p":
        (k = s.current) == null || k.focus(), It(s, [g, h]);
        break;
      case "alt+l":
        (R = i.current) == null || R.focus(), It(i, [g, h]);
        break;
      case "alt+n":
        (N = w.current) == null || N.focus(), It(w, [g, h]);
        break;
      case "alt+h":
        (y = c.current) == null || y.focus(), It(c, [g, h]);
        break;
    }
  }), wt(() => {
    if (!n || !o.current) return;
    const f = new MutationObserver((h) => {
      h.forEach((k) => {
        if (k.attributeName === "data-state" && k.target instanceof HTMLElement) {
          const R = k.target.getAttribute("data-state");
          n(R === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((h) => {
      f.observe(h, { attributes: !0 });
    }), () => f.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(Qn, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, f]) => typeof f == "object").sort(([, f], [, v]) => typeof f == "boolean" || typeof v == "boolean" ? 0 : f.order - v.order).map(([f, v]) => /* @__PURE__ */ l(To, { children: [
      /* @__PURE__ */ r(tr, { ref: u(f), children: typeof v == "object" && "label" in v && v.label }),
      /* @__PURE__ */ r(
        rr,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(qe, { children: sr(t.groups, t.items, f, e) })
        }
      )
    ] }, f)) });
}
function ei(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function ni({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: a,
  id: o,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: w,
  shouldUseAsAppDragArea: c,
  menubarVariant: u = "default"
}) {
  const f = q(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("tw-border tw-px-4 tw-text-foreground", a),
      ref: f,
      style: { position: "relative" },
      id: o,
      children: /* @__PURE__ */ l(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ l(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ r(
                    Mo,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: n,
                      variant: u
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: w
              }
            ) })
          ]
        }
      )
    }
  );
}
const zo = (t, e) => t[e] ?? e;
function ri({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: a,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: w
}) {
  const c = zo(
    i,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [u, f] = j(!1), v = (h) => {
    o && o(h), a && a([h, ...n.filter((k) => k !== h)]), s && n.find((k) => k === h) && s([...n.filter((k) => k !== h)]), f(!1);
  }, g = (h, k) => {
    var N, y, S, C, M, $;
    const R = k !== h ? ((y = (N = t[h]) == null ? void 0 : N.uiNames) == null ? void 0 : y[k]) ?? ((C = (S = t[h]) == null ? void 0 : S.uiNames) == null ? void 0 : C.en) : void 0;
    return R ? `${(M = t[h]) == null ? void 0 : M.autonym} (${R})` : ($ = t[h]) == null ? void 0 : $.autonym;
  };
  return /* @__PURE__ */ l("div", { className: d("pr-twp tw-max-w-sm", w), children: [
    /* @__PURE__ */ l(
      Rt,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: v,
        open: u,
        onOpenChange: (h) => f(h),
        children: [
          /* @__PURE__ */ r(Nt, { children: /* @__PURE__ */ r(Tt, {}) }),
          /* @__PURE__ */ r(
            kt,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((h) => /* @__PURE__ */ r(at, { value: h, children: g(h, e) }, h))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ l(dn, { children: [
      /* @__PURE__ */ r(Y, { className: "tw-ms-3", children: c }),
      /* @__PURE__ */ r("div", { className: "tw-ms-3", children: /* @__PURE__ */ l(Y, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((h) => g(h, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
function Bo({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(Y, { children: e(t) }) : n ? /* @__PURE__ */ r(Y, { children: n(t) }) : /* @__PURE__ */ r(Y, { children: t });
}
function ai({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: a,
  handleSelectListItem: o,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((w) => /* @__PURE__ */ l("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      Ue,
      {
        className: "tw-me-2 tw-align-middle",
        checked: a.includes(w),
        onCheckedChange: (c) => o(w, c)
      }
    ),
    /* @__PURE__ */ r(
      Bo,
      {
        item: w,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, w)) });
}
const Po = Ee(({ className: t, ...e }, n) => /* @__PURE__ */ r(Ir, { size: 35, className: d("tw-animate-spin", t), ...e, ref: n }));
Po.displayName = "Spinner";
function oi({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: a = !1,
  helperText: o,
  label: s,
  placeholder: i,
  isRequired: w = !1,
  className: c,
  defaultValue: u,
  value: f,
  onChange: v,
  onFocus: g,
  onBlur: h
}) {
  return /* @__PURE__ */ l("div", { className: d("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": a }), children: [
    /* @__PURE__ */ r(
      Y,
      {
        htmlFor: t,
        className: d({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${w ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      Ot,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: w,
        className: d(c, { "tw-border-red-600": n }),
        defaultValue: u,
        value: f,
        onChange: v,
        onFocus: g,
        onBlur: h
      }
    ),
    /* @__PURE__ */ r("p", { className: d({ "tw-hidden": !o }), children: o })
  ] });
}
const si = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), ln = (t, e) => t[e] ?? e;
function ii({ errorDetails: t, handleCopyNotify: e, localizedStrings: n }) {
  const a = ln(n, "%webView_error_dump_header%"), o = ln(n, "%webView_error_dump_info_message%");
  function s() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
      /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
        /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
        /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: o })
      ] }),
      /* @__PURE__ */ r(A, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s, children: /* @__PURE__ */ r(jr, {}) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
  ] });
}
const Ao = ft(
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
), Io = p.forwardRef(({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, role: "alert", className: d(Ao({ variant: e }), t), ...n }));
Io.displayName = "Alert";
const jo = p.forwardRef(
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
jo.displayName = "AlertTitle";
const Xo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Xo.displayName = "AlertDescription";
const Fo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Root,
  {
    ref: n,
    className: d(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Fo.displayName = Dt.Root.displayName;
const Go = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Image,
  {
    ref: n,
    className: d("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
Go.displayName = Dt.Image.displayName;
const $o = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Fallback,
  {
    ref: n,
    className: d(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
$o.displayName = Dt.Fallback.displayName;
const Lo = p.forwardRef(
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
Lo.displayName = "Card";
const Ho = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Ho.displayName = "CardHeader";
const Yo = p.forwardRef(
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
Yo.displayName = "CardTitle";
const Uo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: d("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Uo.displayName = "CardDescription";
const Ko = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Ko.displayName = "CardContent";
const qo = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
qo.displayName = "CardFooter";
const ir = p.createContext({
  direction: "bottom"
});
function Jo({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const a = p.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(ir.Provider, { value: a, children: /* @__PURE__ */ r(
    ot.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
Jo.displayName = "Drawer";
const wi = ot.Trigger, Wo = ot.Portal, li = ot.Close, wr = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Overlay,
  {
    ref: n,
    className: d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
wr.displayName = ot.Overlay.displayName;
const Zo = p.forwardRef(({ className: t, children: e, ...n }, a) => {
  const { direction: o = "bottom" } = p.useContext(ir), s = {
    bottom: "tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",
    top: "tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",
    left: "tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",
    right: "tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"
  }, i = {
    bottom: "tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    top: "tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    left: "tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",
    right: "tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"
  };
  return /* @__PURE__ */ l(Wo, { children: [
    /* @__PURE__ */ r(wr, {}),
    /* @__PURE__ */ l(
      ot.Content,
      {
        ref: a,
        className: d(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          o === "bottom" || o === "top" ? "tw-flex-col" : "tw-flex-row",
          s[o],
          t
        ),
        ...n,
        children: [
          (o === "bottom" || o === "right") && /* @__PURE__ */ r("div", { className: i[o] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: e }),
          (o === "top" || o === "left") && /* @__PURE__ */ r("div", { className: i[o] })
        ]
      }
    )
  ] });
});
Zo.displayName = "DrawerContent";
function Qo({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
Qo.displayName = "DrawerHeader";
function ts({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
ts.displayName = "DrawerFooter";
const es = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Title,
  {
    ref: n,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
es.displayName = ot.Title.displayName;
const ns = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Description,
  {
    ref: n,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
ns.displayName = ot.Description.displayName;
const rs = p.forwardRef(({ className: t, value: e, ...n }, a) => /* @__PURE__ */ r(
  ke.Root,
  {
    ref: a,
    className: d(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      ke.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
rs.displayName = ke.Root.displayName;
function di({ ...t }) {
  return /* @__PURE__ */ r(
    Jr,
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
const as = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ l(
    jt.Root,
    {
      ref: n,
      className: d(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: a,
      children: [
        /* @__PURE__ */ r(jt.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(jt.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(jt.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
as.displayName = jt.Root.displayName;
const os = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ r(
    Ce.Root,
    {
      className: d(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        Ce.Thumb,
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
os.displayName = Ce.Root.displayName;
const ci = Q.Root, ss = p.forwardRef(({ className: t, ...e }, n) => {
  const a = U();
  return /* @__PURE__ */ r(
    Q.List,
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
ss.displayName = Q.List.displayName;
const is = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Q.Trigger,
  {
    ref: n,
    className: d(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
is.displayName = Q.Trigger.displayName;
const ws = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Q.Content,
  {
    ref: n,
    className: d(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
ws.displayName = Q.Content.displayName;
const pi = (t, e) => {
  wt(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function ls(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const ds = (t, e, n = {}) => {
  const a = q(e);
  a.current = e;
  const o = q(n);
  o.current = ls(o.current);
  const [s, i] = j(() => a.current), [w, c] = j(!0);
  return wt(() => {
    let u = !0;
    return c(!!t), (async () => {
      if (t) {
        const f = await t();
        u && (i(() => f), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || i(() => a.current);
    };
  }, [t]), [s, w];
}, xe = () => !1, ui = (t, e) => {
  const [n] = ds(
    K(async () => {
      if (!t) return xe;
      const a = await Promise.resolve(t(e));
      return async () => a();
    }, [e, t]),
    xe,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  wt(() => () => {
    n !== xe && n();
  }, [n]);
};
function cs(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), a = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && a ? n.insertBefore(o, a) : n.appendChild(o);
}
cs(`.banded-row:hover {
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
.tw-box-content {
  box-sizing: content-box;
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
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
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
.tw-flex-shrink {
  flex-shrink: 1;
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
.tw-basis-32 {
  flex-basis: 8rem;
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
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
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
.tw-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity, 1));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity, 1));
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
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
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
`, "after-all");
export {
  Io as Alert,
  Xo as AlertDescription,
  jo as AlertTitle,
  Fo as Avatar,
  $o as AvatarFallback,
  Go as AvatarImage,
  Vs as BOOK_SELECTOR_STRING_KEYS,
  Jt as Badge,
  Es as BookChapterControl,
  Da as BookSelectionMode,
  Ds as BookSelector,
  A as Button,
  Lo as Card,
  Ko as CardContent,
  Uo as CardDescription,
  qo as CardFooter,
  Ho as CardHeader,
  Yo as CardTitle,
  Va as ChapterRangeSelector,
  Ue as Checkbox,
  ai as Checklist,
  _e as ComboBox,
  re as Command,
  se as CommandEmpty,
  Ye as CommandGroup,
  ae as CommandInput,
  ie as CommandItem,
  oe as CommandList,
  Xa as DataTable,
  Jo as Drawer,
  li as DrawerClose,
  Zo as DrawerContent,
  ns as DrawerDescription,
  ts as DrawerFooter,
  Qo as DrawerHeader,
  wr as DrawerOverlay,
  Wo as DrawerPortal,
  es as DrawerTitle,
  wi as DrawerTrigger,
  te as DropdownMenu,
  Ie as DropdownMenuCheckboxItem,
  Yt as DropdownMenuContent,
  vn as DropdownMenuGroup,
  Ae as DropdownMenuItem,
  Fa as DropdownMenuItemType,
  ee as DropdownMenuLabel,
  ta as DropdownMenuPortal,
  Rs as DropdownMenuRadioGroup,
  Nn as DropdownMenuRadioItem,
  Ut as DropdownMenuSeparator,
  na as DropdownMenuShortcut,
  ea as DropdownMenuSub,
  yn as DropdownMenuSubContent,
  xn as DropdownMenuSubTrigger,
  Pe as DropdownMenuTrigger,
  si as ERROR_DUMP_STRING_KEYS,
  ii as ErrorDump,
  Ps as Filter,
  Ms as FilterDropdown,
  Bs as Footer,
  $s as INVENTORY_STRING_KEYS,
  Ot as Input,
  Ls as Inventory,
  Y as Label,
  Os as MarkdownRenderer,
  zs as MoreInfo,
  La as MultiSelectComboBox,
  ti as NavigationContentSearch,
  Le as Popover,
  ne as PopoverContent,
  He as PopoverTrigger,
  rs as Progress,
  $e as RadioGroup,
  qt as RadioGroupItem,
  Us as SCOPE_SELECTOR_STRING_KEYS,
  Ks as ScopeSelector,
  Ys as ScriptureResultsViewer,
  qs as ScrollGroupSelector,
  Hn as SearchBar,
  Rt as Select,
  kt as SelectContent,
  Ma as SelectGroup,
  at as SelectItem,
  Ba as SelectLabel,
  Mn as SelectScrollDownButton,
  On as SelectScrollUpButton,
  Pa as SelectSeparator,
  Nt as SelectTrigger,
  Tt as SelectValue,
  Ke as Separator,
  Js as SettingsList,
  Zs as SettingsListHeader,
  Ws as SettingsListItem,
  mo as SettingsSidebar,
  Hs as SettingsSidebarContentSearch,
  an as Skeleton,
  as as Slider,
  di as Sonner,
  Po as Spinner,
  os as Switch,
  wn as TabDropdownMenu,
  Qs as TabToolbar,
  we as Table,
  de as TableBody,
  ja as TableCaption,
  Et as TableCell,
  Ia as TableFooter,
  Lt as TableHead,
  le as TableHeader,
  ht as TableRow,
  ci as Tabs,
  ws as TabsContent,
  ss as TabsList,
  is as TabsTrigger,
  oi as TextField,
  Pn as ToggleGroup,
  Kt as ToggleGroupItem,
  ni as Toolbar,
  Je as Tooltip,
  pe as TooltipContent,
  qe as TooltipProvider,
  We as TooltipTrigger,
  ri as UiLanguageSelector,
  Jn as VerticalTabs,
  Zn as VerticalTabsContent,
  Wn as VerticalTabsList,
  Ro as VerticalTabsTrigger,
  $a as badgeVariants,
  ka as buttonVariants,
  d as cn,
  Gs as getBookIdFromUSFM,
  Xs as getLinesFromUSFM,
  Fs as getNumberFromUSFM,
  Ka as getStatusForItem,
  ei as getToolbarOSReservedSpaceClassName,
  Is as inventoryCountColumn,
  As as inventoryItemColumn,
  js as inventoryStatusColumn,
  za as selectTriggerVariants,
  fi as sonner,
  pi as useEvent,
  ui as useEventAsync,
  ds as usePromise
};
//# sourceMappingURL=index.js.map
